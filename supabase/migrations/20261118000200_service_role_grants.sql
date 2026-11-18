-- Newer Supabase projects don't grant table privileges to service_role automatically.
-- (Also included in the init migration; this file brings already-migrated databases in line.)
grant select, insert, update, delete on public.pins, public.votes, public.comments, public.comment_likes to service_role;
