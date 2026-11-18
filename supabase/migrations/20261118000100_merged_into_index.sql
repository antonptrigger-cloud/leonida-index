-- Advisor fix: cover the pins.merged_into foreign key with an index.
create index if not exists pins_merged_into_idx on public.pins (merged_into) where merged_into is not null;
