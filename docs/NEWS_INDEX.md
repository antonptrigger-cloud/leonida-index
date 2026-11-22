# /news index: how articles are placed

The `/news` page is built entirely from `NEWS` in `src/lib/news/articles.ts` (logic in `src/lib/news/hub.ts`, UI in `src/components/news/`). Nothing is hand-listed per article. A new article with only the required fields lands in the right place automatically.

## Layout

1. **Latest**: the newest non-live, non-archived article by `published` (big card), plus the next 3 "top stories" (pinned ones first, then newest).
2. **Live trackers**: every article with `live: true`, newest `updated` first, each with an "Updated HH:MM AEST" badge from `updated`.
3. **Archive**: everything else (plus reference pages such as `/news/release-date`), newest first, grouped **Today / This week / Earlier** (Brisbane calendar days, recalculated every 10 minutes by ISR) with CSS-only topic chips.

## Optional `NewsItem` fields (all have defaults)

| Field | Default | Effect |
| --- | --- | --- |
| `category` | derived from `tag` (`TAG_CATEGORY` in `hub.ts`; unknown tags fall back to `launch`) | Topic chip and accent colour. One of `launch`, `servers`, `reviews`, `sales`, `events`, `streamers`, `platforms`, `music`, `glitches`, `traffic`. |
| `live` | `false` | Show in the Live trackers strip (server tracker, reviews, release countdown) instead of the story lists. |
| `pinned` | `false` | Keep among the top stories after it stops being the newest. |
| `archived` | `false` | Send straight to the Archive, even if it is new (superseded or pre-launch pieces). |

Set `updated` whenever a fact changes: it drives the "Updated" badge and the page's sitemap `lastmod`.

## Adding a category

Add it to `NewsCategory` (articles.ts), `CATEGORIES` and `TAG_CATEGORY` (hub.ts), and add one `#nh-f-<id>` line to each of the two filter selector blocks at the bottom of the Archive section in `src/components/news/news-hub.css` (the filter is radio inputs plus `:has()`, no JavaScript). Accent colours: pink, orange, turq, blue (shared hub.css) or cobalt, violet, cream (news-hub.css).
