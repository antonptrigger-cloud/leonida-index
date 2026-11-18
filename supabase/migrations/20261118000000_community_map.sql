-- Leonida Vice Guide: community map
-- Run once in the Supabase SQL editor (or with `supabase db push`).
--
-- Security model: RLS is enabled on every table and there are NO policies,
-- so the public anon key cannot read or write anything. The Next.js route
-- handlers use the service-role key (server-side only), which bypasses RLS.
-- The RPC functions below are only executable by service_role.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------- tables

create table if not exists public.pins (
  id            text primary key default gen_random_uuid()::text,
  status        text not null default 'pending'
                check (status in ('pending', 'approved', 'rejected', 'merged', 'hidden')),
  type          text not null
                check (type in ('region', 'landmark', 'secret', 'collectible', 'quest', 'other')),
  name          text not null check (char_length(name) between 1 and 80),
  description   text not null check (char_length(description) <= 1000),
  region        text check (region is null or char_length(region) <= 40),
  occupant      text check (occupant is null or char_length(occupant) <= 160),
  x             double precision not null check (x >= 0),
  y             double precision not null check (y >= 0),
  gamer_tag     text not null check (char_length(gamer_tag) between 1 and 32),
  gamer_tag_lc  text generated always as (lower(gamer_tag)) stored,
  is_seed       boolean not null default false,
  approximate   boolean not null default false,
  spoiler       boolean not null default false,
  up_count      integer not null default 0,
  down_count    integer not null default 0,
  needs_review  boolean not null default false,
  review_reason text,
  merged_into   text references public.pins (id) on delete set null,
  ip_hash       text,
  created_at    timestamptz not null default now(),
  reviewed_at   timestamptz
);

create index if not exists pins_status_idx on public.pins (status);
create index if not exists pins_tag_created_idx on public.pins (gamer_tag_lc, created_at desc);
create index if not exists pins_needs_review_idx on public.pins (needs_review) where needs_review;

create table if not exists public.votes (
  pin_id     text not null references public.pins (id) on delete cascade,
  voter_id   text not null check (voter_id ~ '^[A-Za-z0-9_-]{8,64}$'),
  value      smallint not null check (value in (-1, 1)),
  ip_hash    text,
  created_at timestamptz not null default now(),
  primary key (pin_id, voter_id)
);
create index if not exists votes_ip_idx on public.votes (ip_hash, created_at desc);

create table if not exists public.comments (
  id         uuid primary key default gen_random_uuid(),
  pin_id     text not null references public.pins (id) on delete cascade,
  gamer_tag  text not null check (char_length(gamer_tag) between 1 and 32),
  body       text not null check (char_length(body) between 1 and 280),
  like_count integer not null default 0,
  hidden     boolean not null default false,
  ip_hash    text,
  created_at timestamptz not null default now()
);
create index if not exists comments_pin_idx on public.comments (pin_id, created_at);
create index if not exists comments_ip_idx on public.comments (ip_hash, created_at desc);

create table if not exists public.comment_likes (
  comment_id uuid not null references public.comments (id) on delete cascade,
  voter_id   text not null check (voter_id ~ '^[A-Za-z0-9_-]{8,64}$'),
  ip_hash    text,
  created_at timestamptz not null default now(),
  primary key (comment_id, voter_id)
);
create index if not exists comment_likes_ip_idx on public.comment_likes (ip_hash, created_at desc);

-- ---------------------------------------------------------------- RLS: on, no public policies

alter table public.pins          enable row level security;
alter table public.votes         enable row level security;
alter table public.comments      enable row level security;
alter table public.comment_likes enable row level security;

revoke all on public.pins, public.votes, public.comments, public.comment_likes from anon, authenticated;
-- Newer Supabase projects don't grant table privileges to the API roles by default.
grant select, insert, update, delete on public.pins, public.votes, public.comments, public.comment_likes to service_role;

-- ---------------------------------------------------------------- functions

-- Insert a pending submission. One per gamer tag (case-insensitive) per window.
create or replace function public.submit_location(
  p_type text,
  p_name text,
  p_description text,
  p_region text,
  p_occupant text,
  p_x double precision,
  p_y double precision,
  p_gamer_tag text,
  p_spoiler boolean,
  p_ip_hash text,
  p_window_minutes integer default 60
) returns public.pins
language plpgsql
set search_path = public
as $$
declare
  v_last timestamptz;
  v_row public.pins;
begin
  if p_type not in ('landmark', 'secret', 'collectible', 'quest', 'other') then
    raise exception 'INVALID: type';
  end if;
  if char_length(btrim(coalesce(p_description, ''))) < 20 then
    raise exception 'INVALID: description';
  end if;
  if char_length(btrim(coalesce(p_name, ''))) < 3 or char_length(btrim(coalesce(p_gamer_tag, ''))) < 2 then
    raise exception 'INVALID: required field';
  end if;

  -- Serialise submissions per gamer tag so two parallel requests can't both pass the check.
  perform pg_advisory_xact_lock(hashtext('lvg-submit:' || lower(p_gamer_tag)));

  select max(created_at) into v_last
  from public.pins
  where gamer_tag_lc = lower(p_gamer_tag)
    and not is_seed
    and created_at > now() - make_interval(mins => p_window_minutes);

  if v_last is not null then
    raise exception 'RATE_LIMITED:%',
      greatest(1, ceil(extract(epoch from (v_last + make_interval(mins => p_window_minutes) - now())) / 60))::int;
  end if;

  insert into public.pins (status, type, name, description, region, occupant, x, y, gamer_tag, spoiler, ip_hash)
  values ('pending', p_type, btrim(p_name), btrim(p_description), p_region, p_occupant, p_x, p_y, btrim(p_gamer_tag),
          coalesce(p_spoiler, false), p_ip_hash)
  returning * into v_row;
  return v_row;
end;
$$;

-- Set (1 / -1) or clear (0) a vote; recount; flag for re-review when the downvote rule trips.
create or replace function public.cast_vote(
  p_pin_id text,
  p_voter_id text,
  p_value integer,
  p_ip_hash text,
  p_ip_max integer,
  p_ip_window_minutes integer,
  p_flag_min_down integer,
  p_flag_ratio integer
) returns json
language plpgsql
set search_path = public
as $$
declare
  v_pin public.pins;
  v_up integer;
  v_down integer;
  v_recent integer;
begin
  select * into v_pin from public.pins where id = p_pin_id for update;
  if not found or v_pin.status <> 'approved' then
    raise exception 'NOT_FOUND';
  end if;

  select count(*) into v_recent from public.votes
  where ip_hash = p_ip_hash and created_at > now() - make_interval(mins => p_ip_window_minutes);
  if v_recent >= p_ip_max then
    raise exception 'RATE_LIMITED';
  end if;

  if p_value = 0 then
    delete from public.votes where pin_id = p_pin_id and voter_id = p_voter_id;
  elsif p_value in (-1, 1) then
    insert into public.votes (pin_id, voter_id, value, ip_hash)
    values (p_pin_id, p_voter_id, p_value, p_ip_hash)
    on conflict (pin_id, voter_id) do update
      set value = excluded.value, ip_hash = excluded.ip_hash, created_at = now();
  else
    raise exception 'INVALID: value';
  end if;

  select count(*) filter (where value = 1), count(*) filter (where value = -1)
  into v_up, v_down
  from public.votes where pin_id = p_pin_id;

  update public.pins
  set up_count = v_up,
      down_count = v_down,
      needs_review = needs_review or (v_down >= p_flag_min_down and v_down >= p_flag_ratio * v_up),
      review_reason = case
        when not needs_review and v_down >= p_flag_min_down and v_down >= p_flag_ratio * v_up
          then 'Community downvotes'
        else review_reason
      end
  where id = p_pin_id
  returning * into v_pin;

  return json_build_object('upCount', v_up, 'downCount', v_down, 'myVote', p_value, 'needsReview', v_pin.needs_review);
end;
$$;

create or replace function public.add_comment(
  p_pin_id text,
  p_gamer_tag text,
  p_body text,
  p_ip_hash text,
  p_ip_max integer,
  p_ip_window_minutes integer
) returns public.comments
language plpgsql
set search_path = public
as $$
declare
  v_recent integer;
  v_row public.comments;
begin
  if not exists (select 1 from public.pins where id = p_pin_id and status = 'approved') then
    raise exception 'NOT_FOUND';
  end if;
  select count(*) into v_recent from public.comments
  where ip_hash = p_ip_hash and created_at > now() - make_interval(mins => p_ip_window_minutes);
  if v_recent >= p_ip_max then
    raise exception 'RATE_LIMITED';
  end if;
  insert into public.comments (pin_id, gamer_tag, body, ip_hash)
  values (p_pin_id, btrim(p_gamer_tag), btrim(p_body), p_ip_hash)
  returning * into v_row;
  return v_row;
end;
$$;

create or replace function public.toggle_comment_like(
  p_comment_id uuid,
  p_voter_id text,
  p_ip_hash text,
  p_ip_max integer,
  p_ip_window_minutes integer
) returns json
language plpgsql
set search_path = public
as $$
declare
  v_recent integer;
  v_liked boolean;
  v_count integer;
begin
  perform 1 from public.comments where id = p_comment_id and not hidden for update;
  if not found then
    raise exception 'NOT_FOUND';
  end if;
  select count(*) into v_recent from public.comment_likes
  where ip_hash = p_ip_hash and created_at > now() - make_interval(mins => p_ip_window_minutes);
  if v_recent >= p_ip_max then
    raise exception 'RATE_LIMITED';
  end if;

  delete from public.comment_likes where comment_id = p_comment_id and voter_id = p_voter_id;
  if found then
    v_liked := false;
  else
    insert into public.comment_likes (comment_id, voter_id, ip_hash) values (p_comment_id, p_voter_id, p_ip_hash);
    v_liked := true;
  end if;

  select count(*) into v_count from public.comment_likes where comment_id = p_comment_id;
  update public.comments set like_count = v_count where id = p_comment_id;
  return json_build_object('likeCount', v_count, 'liked', v_liked);
end;
$$;

-- approved = submissions a moderator accepted (approved or merged into an existing pin)
-- firstMarked = new pins that went live under that gamer tag
create or replace function public.map_leaderboard(p_limit integer default 25)
returns json
language sql
stable
set search_path = public
as $$
  with community as (
    select gamer_tag, gamer_tag_lc, status, created_at from public.pins where not is_seed
  ),
  approved as (
    select (array_agg(gamer_tag order by created_at desc))[1] as "gamerTag", count(*)::int as count
    from community where status in ('approved', 'merged')
    group by gamer_tag_lc
    order by count desc, 1
    limit p_limit
  ),
  first_marked as (
    select (array_agg(gamer_tag order by created_at desc))[1] as "gamerTag", count(*)::int as count
    from community where status = 'approved'
    group by gamer_tag_lc
    order by count desc, 1
    limit p_limit
  )
  select json_build_object(
    'approved', coalesce((select json_agg(a) from approved a), '[]'::json),
    'firstMarked', coalesce((select json_agg(f) from first_marked f), '[]'::json)
  );
$$;

revoke execute on function public.submit_location(text, text, text, text, text, double precision, double precision, text, boolean, text, integer) from public, anon, authenticated;
revoke execute on function public.cast_vote(text, text, integer, text, integer, integer, integer, integer) from public, anon, authenticated;
revoke execute on function public.add_comment(text, text, text, text, integer, integer) from public, anon, authenticated;
revoke execute on function public.toggle_comment_like(uuid, text, text, integer, integer) from public, anon, authenticated;
revoke execute on function public.map_leaderboard(integer) from public, anon, authenticated;

grant execute on function public.submit_location(text, text, text, text, text, double precision, double precision, text, boolean, text, integer) to service_role;
grant execute on function public.cast_vote(text, text, integer, text, integer, integer, integer, integer) to service_role;
grant execute on function public.add_comment(text, text, text, text, integer, integer) to service_role;
grant execute on function public.toggle_comment_like(uuid, text, text, integer, integer) to service_role;
grant execute on function public.map_leaderboard(integer) to service_role;

-- ---------------------------------------------------------------- seed pins
-- BEGIN GENERATED SEED (scripts/gen-seed-sql.mjs)
-- Seed pins (official region and landmark names). Generated by scripts/gen-seed-sql.mjs.
-- Safe to re-run: existing rows (including moderator edits) are left alone.
insert into public.pins (id, status, type, name, description, region, x, y, gamer_tag, is_seed, approximate, created_at, reviewed_at)
values
  ('seed-vice-city', 'approved', 'region', 'Vice City', 'The Miami-inspired heart of Leonida: art deco hotels, beaches, the port and the densest streets in the state. Rockstar calls it the sun and fun capital of America.', 'Vice City', 860, 354, 'Leonida Vice Guide', true, false, '2026-11-18T00:00:00Z', '2026-11-18T00:00:00Z'),
  ('seed-leonida-keys', 'approved', 'region', 'Leonida Keys', 'Tropical archipelago off the south coast. Easy-going island life next to beautiful and dangerous waters: boats, beach bars and scuba diving.', 'Leonida Keys', 586, 693, 'Leonida Vice Guide', true, false, '2026-11-18T00:00:00Z', '2026-11-18T00:00:00Z'),
  ('seed-grassrivers', 'approved', 'region', 'Grassrivers', 'A primordial expanse of wetlands and mangroves. Gators, airboats, deadlier predators and weirder discoveries, according to Rockstar.', 'Grassrivers', 590, 502, 'Leonida Vice Guide', true, false, '2026-11-18T00:00:00Z', '2026-11-18T00:00:00Z'),
  ('seed-port-gellhorn', 'approved', 'region', 'Port Gellhorn', 'A faded, once-popular vacation spot on the west coast: cheap motels, shut-down attractions and empty strip malls. Good dirt bike country.', 'Port Gellhorn', 233, 348, 'Leonida Vice Guide', true, false, '2026-11-18T00:00:00Z', '2026-11-18T00:00:00Z'),
  ('seed-ambrosia', 'approved', 'region', 'Ambrosia', 'Inland Leonida: industry and old-school values. Home of the Allied Crystal sugar refinery and a local biker gang.', 'Ambrosia', 568, 342, 'Leonida Vice Guide', true, false, '2026-11-18T00:00:00Z', '2026-11-18T00:00:00Z'),
  ('seed-mount-kalaga', 'approved', 'region', 'Mount Kalaga', 'Mount Kalaga National Park, a national landmark up against the northern border. Hunting, fishing and off-road trails.', 'Mount Kalaga', 573, 86, 'Leonida Vice Guide', true, false, '2026-11-18T00:00:00Z', '2026-11-18T00:00:00Z'),
  ('seed-ocean-beach', 'approved', 'landmark', 'Ocean Beach', 'Pastel art deco hotels and white sand on the Vice City beachfront. Named on the official site; pin position is approximate.', 'Vice City', 975, 393, 'Leonida Vice Guide', true, true, '2026-11-18T00:00:00Z', '2026-11-18T00:00:00Z'),
  ('seed-washington-beach', 'approved', 'landmark', 'Washington Beach', 'Vice City beach with a boat dock, named in official screenshot captions. Pin position is approximate.', 'Vice City', 969, 479, 'Leonida Vice Guide', true, true, '2026-11-18T00:00:00Z', '2026-11-18T00:00:00Z'),
  ('seed-little-cuba', 'approved', 'landmark', 'Little Cuba', 'Vice City neighbourhood known for its panaderias, named on the official site. Pin position is approximate.', 'Vice City', 798, 411, 'Leonida Vice Guide', true, true, '2026-11-18T00:00:00Z', '2026-11-18T00:00:00Z'),
  ('seed-vc-port', 'approved', 'landmark', 'VC Port', 'The cruise ship capital of the world, per Rockstar. Docks on the Vice City waterfront. Pin position is approximate.', 'Vice City', 844, 462, 'Leonida Vice Guide', true, true, '2026-11-18T00:00:00Z', '2026-11-18T00:00:00Z'),
  ('seed-allied-crystal', 'approved', 'landmark', 'Allied Crystal sugar refinery', 'Industrial sugar refinery in Ambrosia, named on the official site. Pin position is approximate.', 'Ambrosia', 536, 376, 'Leonida Vice Guide', true, true, '2026-11-18T00:00:00Z', '2026-11-18T00:00:00Z'),
  ('seed-lake-leonida', 'approved', 'landmark', 'Lake Leonida', 'Named in Ultimate Edition material (an off-road mod shop is there). Placed on the big inland lake as a guess.', null, 610, 268, 'Leonida Vice Guide', true, true, '2026-11-18T00:00:00Z', '2026-11-18T00:00:00Z'),
  ('seed-brians-marina', 'approved', 'landmark', 'Brian''s Marina', 'Lit marina sign seen in an official Keys screenshot; fits Brian Heder''s boat yard. Pin position is approximate.', 'Leonida Keys', 684, 673, 'Leonida Vice Guide', true, true, '2026-11-18T00:00:00Z', '2026-11-18T00:00:00Z'),
  ('seed-rusty-anchor', 'approved', 'landmark', 'The Rusty Anchor', 'Bar on a lit wooden pier in the Keys, reachable by boat, from an official screenshot. Pin position is approximate.', 'Leonida Keys', 479, 656, 'Leonida Vice Guide', true, true, '2026-11-18T00:00:00Z', '2026-11-18T00:00:00Z')
on conflict (id) do nothing;
-- END GENERATED SEED
