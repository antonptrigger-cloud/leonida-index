-- Pin x/y live in a fixed coordinate space that is mapped onto the current base map through a
-- calibration (src/lib/map/base-map.json). After a base-map swap, places outside the old framing
-- can have negative coordinates, so drop the non-negative checks. Bounds are validated in the app
-- against the current base image instead.
alter table public.pins drop constraint if exists pins_x_check;
alter table public.pins drop constraint if exists pins_y_check;
alter table public.pins add constraint pins_x_finite check (x > -100000 and x < 100000) not valid;
alter table public.pins add constraint pins_y_finite check (y > -100000 and y < 100000) not valid;
