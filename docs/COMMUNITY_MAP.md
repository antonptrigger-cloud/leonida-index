# Community map

`/map` is an interactive Leaflet map of Leonida. Players drop pins, a moderator
approves them, and approved pins go live with "First marked by <gamer tag>".

| Route | What it is |
|---|---|
| `/map` | The map: filters, search, spoiler toggle, pin details, votes, comments, "Submit a location" |
| `/map/leaderboard` | Most approved submissions and most "first marked" pins |
| `/map/admin` | Moderator queue (password protected, not indexed) |
| `/api/map/*` | JSON API used by the pages and by a moderation bot |

## 1. Set up Supabase (free tier)

1. Create a project at <https://supabase.com>.
2. Open **SQL Editor**, paste the files in `supabase/migrations/` in name order and run them
   (or `supabase db push` with the Supabase CLI). They're idempotent, so re-running is safe.
   They create:
   - `pins`: every submission and live pin, with a `status` of `pending`, `approved`, `rejected`, `merged` or `hidden`
   - `votes`: one row per (pin, browser voter id)
   - `comments` and `comment_likes`
   - RPC functions `submit_location`, `cast_vote`, `add_comment`, `toggle_comment_like`, `map_leaderboard`
   - the 14 official seed pins (six regions plus approximate landmarks)
3. Security: RLS is **on** for every table with **no policies**, so the public anon key can't read or
   write anything. All reads and writes go through the Next.js route handlers using the secret
   (service_role) key on the server. The RPCs are only executable by `service_role`. The Supabase
   security advisor will list "RLS enabled, no policy" as INFO for the four tables. That's expected.

## 2. Environment variables

Set these in `.env.local` for local dev and in **Vercel → Project → Settings → Environment Variables**
(Production and Preview), then redeploy:

| Name | Value |
|---|---|
| `SUPABASE_URL` (or `NEXT_PUBLIC_SUPABASE_URL`) | Project URL, e.g. `https://xxxx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret / service_role key. Server only, never `NEXT_PUBLIC_` |
| `MOD_PASSWORD` | Password for `/map/admin` |
| `MOD_SESSION_SECRET` | Random 32+ character string (`openssl rand -hex 32`) |
| `MOD_API_TOKEN` | Optional bearer token for a bot (falls back to `MOD_PASSWORD`) |

Without the Supabase variables the site still builds. `/map` shows the seed pins read-only with a
"submissions are offline" notice, so preview deploys never break.

## 3. Local development

```bash
npm ci
npm run dev        # no Supabase vars -> in-memory store (resets on restart)
npm run lint && npm run typecheck && npm run build
```

Set `MOD_PASSWORD` (and optionally `MOD_SESSION_SECRET`) in `.env.local` to try `/map/admin` locally.
Add the Supabase vars to `.env.local` to run against the real database instead.

## 4. How moderation works

- **Submit:** type, name, description (20+ characters), optional region and "who/what is there", and
  gamer tag (required). Validated in the browser and again on the server. Saved as `pending`, so not
  public. **One submission per gamer tag per hour** (case-insensitive), enforced in the
  `submit_location` database function.
- **Queue (`/map/admin`):** sign in with `MOD_PASSWORD` (12-hour httpOnly signed cookie). Each pending
  pin shows a mini map, its details and:
  - **Possible duplicate**: within `DUPLICATE_RADIUS_M` (50 m) of another pin *and* a name similarity
    of at least `DUPLICATE_NAME_SIMILARITY` (normalised Levenshtein, or one name containing the other).
    **Merge into it** marks the submission as a confirmation of the existing pin: it counts toward the
    submitter's "approved" total but not "first marked".
  - **Hold**: description under 20 characters or a missing required field. Approve is disabled until
    you fix it with **Edit**.
  - **Approve / Reject / Edit** (Edit can also **Save & approve**).
- **Community flags:** when a live pin reaches 5 or more 👎 and 👎 ≥ 4× 👍, it's flagged and shows up
  under "Flagged by the community". It stays live; nothing is auto-deleted. **Keep** clears the flag;
  **Unpublish** hides it (rows are kept and can be sent back to the queue).
- **Votes:** one per browser (random id in localStorage plus a unique (pin, voter) row in the database),
  with a light per-IP limit (IPs are stored only as salted hashes). Clicking the same vote again removes it.
- **Comments:** up to 280 characters, gamer tag required, can be liked (one like per browser).
- All user text is cleaned (control characters and `<` `>` stripped) and rendered as plain text, never HTML.

Tunables live in `src/lib/map/config.ts` (radius, similarity, flag rule, rate limits, length limits).

## 5. Bot API

Send `Authorization: Bearer <MOD_API_TOKEN>` (or the moderator cookie).

```bash
# Pending queue with duplicate flags and issues, plus community-flagged pins
curl -H "Authorization: Bearer $MOD_API_TOKEN" https://SITE/api/map/admin/queue

# Approve / reject / edit / merge / clear_flag / hide / restore
curl -X POST -H "Authorization: Bearer $MOD_API_TOKEN" -H "Content-Type: application/json" \
  -d '{"action":"approve"}' https://SITE/api/map/admin/pins/<id>
curl ... -d '{"action":"edit","name":"Better name","description":"..."}' ...
curl ... -d '{"action":"merge","into":"<live pin id>"}' ...
```

Public endpoints: `GET /api/map/pins`, `POST /api/map/submissions`, `POST /api/map/pins/<id>/vote`,
`GET|POST /api/map/pins/<id>/comments`, `POST /api/map/comments/<id>/like`, `GET /api/map/leaderboard`.

## 6. The base map: deep-zoom tiles, and swapping in a new map

> The default base is now Rockstar's official map poster (`src/lib/map/bases.ts`, `docs/OFFICIAL_MAP.md`); the custom art
> (`?base=art`, `docs/CUSTOM_MAP_ART.md`) and the legacy placeholder (`?base=legacy`) stay selectable. The steps below describe the
> legacy base's pyramid and calibration.

`/map` is a deep-zoom tiled map (Leaflet `CRS.Simple` plus a tile layer), not one stretched image. It fills the
window below the header, starts filled edge to edge, and zooms smoothly (wheel, pinch, + / -). The "whole map"
button (bottom right) zooms out to the full map. Tiles are only drawn up to the source's native resolution plus
one overzoom step, so it never shows a blurry upscale beyond that.

- Source image: `assets/map/` (not served directly).
- Tiles: `public/map/tiles/{z}/{x}/{y}.webp` (256 px, generated, committed).
- Manifest: `src/lib/map/base-map.json` (size, zoom levels, tile URL with a cache-busting version, preview, calibration).
- Preview (admin mini maps): `public/map/base-preview.webp`.

The current source is the illustrative fan map `assets/map/leonida-base.jpg` (1168x784, not the in-game
geography). It gives native zoom levels 0 to 3 and a max zoom of 4. That is 29 tiles, about 250 KB. The source
resolution limits the detail: a large official map automatically gets more zoom levels.

### Swapping in the official map (about 5 minutes)

1. **Check the licence.** Use only an image Rockstar has published officially (or one you have the rights to),
   never leaked material, and keep any credit they ask for. Update the attribution in
   `src/lib/map/config.ts` (`BASE_MAP.attribution`).
2. **Add the file.** Save the largest clean version (PNG or JPG) as e.g. `assets/map/leonida-official.png`.
3. **Generate tiles:**
   ```bash
   npm run map:tiles -- assets/map/leonida-official.png
   # options: --background "#04182f" (colour behind the edges)  --quality 82 (webp)  --keep-calibration
   ```
   This replaces `public/map/tiles/`, the preview and `base-map.json`, and prints the zoom levels and tile size.
   `maxNativeZoom = ceil(log2(longest side / 256))`, with one extra overzoom level.

   | Source (longest side, 3:2 map) | Native zooms | Approx. tiles | Approx. size |
   | --- | --- | --- | --- |
   | 1,168 px (current) | 0 to 3 | 29 | 0.25 MB |
   | 4,096 px | 0 to 4 | ~240 | ~6 MB |
   | 8,192 px | 0 to 5 | ~950 | ~25 MB |
   | 16,384 px | 0 to 6 | ~3,700 | ~90 MB |

   Up to about 8k fits comfortably in the repo and on Vercel. For larger maps, downscale to 8192 px first, or move
   the tiles to object storage and point `urlTemplate` in the manifest there.
4. **Check pin alignment.** Run `npm run dev` and open `/map?coords=1`. The readout (bottom left) shows the pin
   coordinates under the cursor (`pin x, y`), the source pixel (`src`) and the zoom.
   - By default, a new map is assumed to show the same area as the old one (the old 1168x784 frame stretched
     over the new image), so existing pins scale with it.
   - **If the new map is framed differently but shows the same places**, calibrate with two well-separated
     landmarks. For each, take its old pin coordinates (from the pin list, the bot API, or `?coords=1` before the
     swap) and the source pixel of the same spot on the new map (from `?coords=1` after the swap). Then run:
     ```bash
     npm run map:calibrate -- "x1,y1=sx1,sy1" "x2,y2=sx2,sy2"     # add --dry-run to preview
     # e.g. npm run map:calibrate -- "712,312=5120,2210" "176,329=1090,2330"
     ```
     This fits the scale and offset into `base-map.json`. No database change is needed, because pins keep their
     stored coordinates. Re-running `map:tiles` keeps the calibration only with `--keep-calibration`.
   - **If the new map's geography is different** (for example, the official map replaces our illustrative one),
     the seed region pins need moving, not calibrating. Hover each place with `?coords=1`, read `pin x, y`, and
     update it with the admin bot API `edit` action (`{"action":"edit","x":...,"y":...}`) or in the Supabase
     table editor. Also update `src/lib/map/seed-pins.json` and regenerate the seed SQL with
     `node scripts/gen-seed-sql.mjs` so fresh installs match.
5. **Fix the scale.** Set `MAP_WIDTH_KM` in `src/lib/map/config.ts` to the real width of the area covered by the
   original 1168 px frame, so the 50 m duplicate radius stays meaningful.
6. **Ship it.** Run `npm run lint && npm run typecheck && npm run build`, commit `assets/map/`,
   `public/map/tiles/`, `public/map/base-preview.webp` and `src/lib/map/base-map.json`, and push. Vercel redeploys.
   The tile URL carries a content hash, so browsers pick up the new tiles straight away.

Pins may sit outside the old frame (negative coordinates) after calibration. The
`20261118000300_calibrated_coords` migration removes the old non-negative checks, and the app accepts any point
that lands on the current base image.

## Map v2 additions (pin types, sources, filters)

- **Types:** `landmark`, `shop`, `property`, `activity`, `secret`, `collectible`, `quest`, `other` (+ `region`, seed-only). Glyphs are our own SVGs in `src/components/map/glyphs.ts`.
- **`source`:** `official` (named by Rockstar), `community` (player-marked), `gtadb` (imported, CC BY 4.0, see [DATA_CREDITS.md](DATA_CREDITS.md)).
  The migration `supabase/migrations/20261118000400_pin_types_and_source.sql` adds the column, the new types and the extra seed pins.
  Until it is applied the app still works: `source` is only selected when the column exists, new submissions of the new types are
  rejected by the old RPC, and the seed pins always come from `seed-pins.json` / `gtadb-pins.json`.
- **Pin style:** solid outline = confirmed position, dashed outline = approximate, turquoise tick = named by Rockstar.
  Region pins are label chips below the baked-in labels. Non-region pins appear once you zoom in and cluster.
- **URL state:** `/map?q=&types=shop,landmark&official=1&region=vice-city&spoilers=1&pin=<id>`.
- **Location search:** the search box on `/map` looks up live pins by name (and description, region, occupant, gamer tag or category) plus region, district, county, city, place, water and island labels already in the code (`labels.json` / `official-labels.json`). Picking a pin flies to it, highlights it and opens its details. Picking a label with no pin drops a temporary highlighted marker (client-side only, never written to the database) and opens a short popup. The dropdown is a keyboard-accessible combobox with an empty state.
- **Seed lists:** `src/lib/map/seed-pins.json` (official; each description ends with its Rockstar source) and
  `src/lib/map/gtadb-pins.json` (generated by `scripts/import-gtadb.mjs`).
