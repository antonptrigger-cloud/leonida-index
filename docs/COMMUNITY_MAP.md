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

## 6. Swapping the base map

The base image is `public/map/leonida-base.jpg`, an illustrative fan map (not the in-game geography).
To replace it, add the new image to `public/map/` and update `BASE_MAP` (url, width, height) in
`src/lib/map/config.ts`. Pins are stored in image pixel coordinates (x from the left, y from the top), so a
different layout means re-placing pins (edit `x`/`y` in the admin API or in `src/lib/map/seed-pins.json`).
Also update `MAP_WIDTH_KM` so the 50 m duplicate radius stays meaningful. Regenerate the seed SQL with
`node scripts/gen-seed-sql.mjs`.
