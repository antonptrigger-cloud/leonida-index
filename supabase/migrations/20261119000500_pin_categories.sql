-- Leonida Vice Guide: vendor / shop / service categories for pins.
-- NOT YET APPLIED to any database. Apply it after 20261118000400_pin_types_and_source.sql (it relies on the `source` column).
-- The app works without it: store/supabase.ts selects `category` only when the column exists, a submission without the
-- p_category parameter is retried, and seed pins always carry their category from src/lib/map/seed-pins.json.
-- Until it is applied, community-submitted categories are NOT saved (the pin is still saved, without a category).
-- Idempotent: safe to re-run.

-- 1. Category column. NULL = not a categorised vendor / service.
alter table public.pins add column if not exists category text;
alter table public.pins drop constraint if exists pins_category_check;
alter table public.pins add constraint pins_category_check
  check (category is null or category in ('gas', 'convenience', 'clothing', 'weapons', 'barber-tattoo', 'vehicles', 'market', 'bank', 'services', 'bar-club', 'transport', 'safehouse'));
create index if not exists pins_category_idx on public.pins (category) where category is not null;

-- 2. Submissions may carry a category. The old 11-argument function is dropped so the name can't be called ambiguously.
drop function if exists public.submit_location(text, text, text, text, text, double precision, double precision, text, boolean, text, integer);
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
  p_window_minutes integer default 60,
  p_category text default null
) returns public.pins
language plpgsql
set search_path = public
as $$
declare
  v_last timestamptz;
  v_row public.pins;
begin
  if p_type not in ('landmark', 'shop', 'property', 'activity', 'secret', 'collectible', 'quest', 'other') then
    raise exception 'INVALID: type';
  end if;
  if p_category is not null and p_category not in ('gas', 'convenience', 'clothing', 'weapons', 'barber-tattoo', 'vehicles', 'market', 'bank', 'services', 'bar-club', 'transport', 'safehouse') then
    raise exception 'INVALID: category';
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

  insert into public.pins (status, type, name, description, region, occupant, x, y, gamer_tag, spoiler, ip_hash, source, category)
  values ('pending', p_type, btrim(p_name), btrim(p_description), p_region, p_occupant, p_x, p_y, btrim(p_gamer_tag),
          coalesce(p_spoiler, false), p_ip_hash, 'community', p_category)
  returning * into v_row;
  return v_row;
end;
$$;

-- Same privileges as before: only the service role (the Next.js route handlers) may call it.
revoke execute on function public.submit_location(text, text, text, text, text, double precision, double precision, text, boolean, text, integer, text) from public, anon, authenticated;
grant execute on function public.submit_location(text, text, text, text, text, double precision, double precision, text, boolean, text, integer, text) to service_role;

-- 3. Seed pins with a category: places Rockstar has officially named (see docs/DATA_CREDITS.md). Existing rows only get their category.
-- BEGIN GENERATED SEED (scripts/gen-category-sql.mjs)
insert into public.pins (id, status, type, name, description, region, x, y, gamer_tag, is_seed, approximate, source, category, created_at, reviewed_at)
values
  ('seed-brians-marina', 'approved', 'landmark', 'Brian''s Marina', 'Lit marina sign seen in an official Keys screenshot; fits Brian Heder''s boat yard. Pin position is approximate.', 'Leonida Keys', 684, 673, 'Leonida Vice Guide', true, true, 'official', 'transport', '2026-11-19T00:00:00Z', '2026-11-19T00:00:00Z'),
  ('seed-rusty-anchor', 'approved', 'landmark', 'The Rusty Anchor', 'Bar on a lit wooden pier in the Keys, reachable by boat, from an official screenshot. Pin position is approximate.', 'Leonida Keys', 479, 656, 'Leonida Vice Guide', true, true, 'official', 'bar-club', '2026-11-19T00:00:00Z', '2026-11-19T00:00:00Z'),
  ('seed-tisha-wocka', 'approved', 'shop', 'Tisha-Wocka Flea Market', 'Vice City flea market selling bootleg brands. Pin position is approximate. Source: rockstargames.com/VI, Vice City description.', 'Vice City', 838, 439, 'Leonida Vice Guide', true, true, 'official', 'market', '2026-11-19T00:00:00Z', '2026-11-19T00:00:00Z'),
  ('seed-one-eyed-willies', 'approved', 'shop', 'One-Eyed Willie''s Mod Shop', 'Mod shop in Lake Leonida specialising in off-road modifications and hand-painted automotive artistry; only open for business with the Ultimate Edition. Placed on the lake shore as a guess. Source: rockstargames.com/VI, Ultimate Edition.', null, 639, 285, 'Leonida Vice Guide', true, true, 'official', 'vehicles', '2026-11-19T00:00:00Z', '2026-11-19T00:00:00Z'),
  ('seed-shore-court-garage', 'approved', 'property', 'Shore Court Garage', 'Personal garage with a weapon locker, a stone''s throw from the sands of Ocean Beach (Shore Drive). Pin position is approximate. Source: rockstargames.com/VI, Vintage Vice City Pack.', 'Vice City', 952, 411, 'Leonida Vice Guide', true, true, 'official', 'safehouse', '2026-11-19T00:00:00Z', '2026-11-19T00:00:00Z'),
  ('seed-electric-fang-tattoo', 'approved', 'shop', 'Electric Fang Tattoo Parlor', 'Stockyard''s most iconic ink bar, with over 50 signature tattoos for both Jason and Lucia, all designed by the artist collective FAILE. Only open for business with the Ultimate Edition. Pin position is approximate (placed in Stockyard; direction from GTADB record L1482, CC BY 4.0). Source: rockstargames.com/VI, Ultimate Edition.', 'Vice City', 790.8, 357.2, 'Leonida Vice Guide', true, true, 'official', 'barber-tattoo', '2026-11-19T00:00:00Z', '2026-11-19T00:00:00Z'),
  ('seed-stock-305', 'approved', 'shop', 'Stock 305 Clothing Store', 'Stockyard''s premier destination for elevated streetwear: unique and exclusive looks for Jason and Lucia. Only open for business with the Ultimate Edition. Pin position is approximate (placed in Stockyard; direction from GTADB record L1488, CC BY 4.0). Source: rockstargames.com/VI, Ultimate Edition.', 'Vice City', 819.2, 345.8, 'Leonida Vice Guide', true, true, 'official', 'clothing', '2026-11-19T00:00:00Z', '2026-11-19T00:00:00Z'),
  ('seed-ptt-youngins', 'approved', 'shop', 'PTT YOUNGIN$ Illegal Goods Store', 'The compound of one of Southside Vice City''s loudest and most socially active gangs: raid it and escape safely to score special items and distinct contraband. Pin position is approximate (placed in Southside; direction from GTADB record L1491, CC BY 4.0). Source: rockstargames.com/VI, Ultimate Edition.', 'Vice City', 718.5, 496.1, 'Leonida Vice Guide', true, true, 'official', 'market', '2026-11-19T00:00:00Z', '2026-11-19T00:00:00Z'),
  ('seed-paradise-garage', 'approved', 'property', 'Paradise Garage', 'Garage in Watson Bay with a weapon locker and a secure place to deposit stolen goods to be fenced; the Mud Club monster off-roader can be stored here (Ultimate Edition). Pin position is approximate (placed on the south-west coast; direction from GTADB record L1495, CC BY 4.0). Source: rockstargames.com/VI, Ultimate Edition.', null, 515.1, 542.1, 'Leonida Vice Guide', true, true, 'official', 'safehouse', '2026-11-19T00:00:00Z', '2026-11-19T00:00:00Z')
on conflict (id) do update set category = excluded.category;
-- END GENERATED SEED
