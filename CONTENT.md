# Content inventory (as of 22 Nov 2026, main @ 16928f1)

Single list of live, indexable pages. The `/news` and `/guides` hubs are built from `src/lib/news/articles.ts` and `src/lib/seo/site.ts` (`HUB_META` in `src/lib/guides/hub.ts` only adds card copy). Mission walkthroughs are listed on `/guides/missions`, not row-by-row here.

type | path | title | notes
--- | --- | --- | ---
page | / | Home | live
map | /map | Leonida community map | live; region pages under `/map/<region>`
map | /map/leaderboard | Map leaderboard | live
map | /map/vice-city | Vice City | live
map | /map/leonida-keys | Leonida Keys | live
map | /map/grassrivers | Grassrivers | live
map | /map/port-gellhorn | Port Gellhorn | live
map | /map/ambrosia | Ambrosia | live
map | /map/mount-kalaga | Mount Kalaga | live
guide | /guides | Guides hub | live; sections: Start here, Story missions, Money & progression, Systems & activities
guide | /guides/missions | All missions in order | live; individual walkthroughs at `/guides/missions/<slug>`
guide | /guides/beginner | Beginner | live
guide | /guides/saving | How to save | live
guide | /guides/switch-characters | Switching characters | live
guide | /guides/first-person | First-person view | live
guide | /guides/relationship | Relationship levels | live
guide | /guides/difficulty | Difficulty settings | live
guide | /guides/money | Money guide | live
guide | /guides/cheats | Cheats & codes | live
guide | /guides/trophies | Trophies & platinum | live
guide | /guides/collectibles | Collectibles | live
guide | /guides/wanted | Wanted system | live
guide | /guides/stealing-cars | Stealing cars | live
guide | /guides/fast-travel | Fast travel | live
guide | /guides/change-clothes | Change clothes | live
guide | /guides/garages | Garages | live
guide | /guides/activities | Activities | live
guide | /guides/map-size | Map size | live
guide | /guides/secret-vehicles | Secret vehicles | live
guide | /guides/bigfoot-skunk-ape | Bigfoot & Skunk Ape | live
guide | /guides/chapter-3-side-job-locations | Chapter 3 side job locations | live
guide | /guides/strangers-and-freaks | Strangers & Freaks | live
guide | /guides/strip-clubs | Strip clubs | live; locations and prices (overlaps `/secrets/strip-clubs`)
guide | /guides/weapons | Weapons | live; shops and saving
tool | /tools/edition-compare | Editions | live
meta | /sources | Sources | live
news | /news | News hub | live; categories: Launch, Servers & patches, Reviews, Sales, Events, Streamers, Platforms & PC, Music, Glitches, Traffic records
news | /news/release-date | Release date, platforms & price | live; reference page (also in the archive)
news | /news/gta-6-live-new-zealand-launch-report | Live in New Zealand | live
news | /news/gta-6-reviews-metacritic-99 | GTA 6 reviews | live tracker
news | /news/gta-6-ps5-update-patches-servers | Server status & known issues | live tracker
news | /news/gta-6-release-countdown | Release time by region | live (not a tracker strip item unless `live: true`)
news | /news/gta-6-confirmed-so-far | What is confirmed | live
news | /news/gta-6-preload-editions-pricing | Preload and editions | live
news | /news/gta-6-festival-set-times-heat-night | Festival set times | live
news | /news/gta-6-sales-17-million-sensor-tower | Sales estimate | live
news | /news/gta-6-age-rating | Age rating | live
news | /news/gta-6-gta-plus-story-perks | GTA+ perks | live
news | /news/gta-6-nbn-australia-traffic-record | NBN traffic record | live; News category: Traffic records
news | /news/gta-6-internet-traffic-record-de-cix | DE-CIX traffic record | live; News category: Traffic records
news | /news/gta-6-game-awards-nominations | Game Awards nominations | live
news | /news/gta-6-no-prostitutes-rockstar | Rockstar statement on sex workers | live
news | /news/gta-6-army-reenlistment-four-day-pass | Army reenlistment pass | live (in NEWS)
news | /news/gta-6-the-album-tracklist | GTA 6: The Album | live; News category: Music
news | /news/gta-6-first-person-glitch | First-person glitch | live; News category: Glitches
news | /news/gta-6-bank-vaults-how-to-open | GTA 6 bank vaults | draft 26 Nov 13:40 AEST; awaiting owner approval
news | /news/gta-6-vice-city-portal-easter-egg | Vice City portal easter egg | draft 26 Nov 13:40 AEST; awaiting owner approval
news | /news/gta-6-mario-luigi-hats-easter-egg | Mario and Luigi hats | draft 26 Nov 13:40 AEST; awaiting owner approval
news | /news/n3on-new-zealand-gta-6-stream | N3ON NZ stream | live
news | /news/gta-6-streaming-viewership-peak | Stream viewership peak | live
news | /news/gta-6-launch-streams-schedule | Launch streams schedule | live
news | /news/streamers-new-zealand-trick-warnings | Streamers and the NZ trick | live
news | /news/gta-6-performance-ps5-pro-xbox | Performance: PS5, PS5 Pro & Xbox | live
news | /news/gta-6-pc-release-status | PC release status | live
news | /news/gta-6-online-release-date | GTA 6 Online | live
news | /news/gta-6-game-pass-ps-plus-cloud | Game Pass, PS Plus, cloud | live
news | /news/gta-6-file-size-time-to-beat | File size and time to beat | live
db | /database/* | Characters, locations, vehicles, weapons, radio, gangs | live; character work is a separate track
page | /secrets | Secrets & Easter eggs | live; hub plus the pages below
page | /secrets/ufo | UFO encounter | live
page | /secrets/skunk-ape | Skunk Ape | live
page | /secrets/easter-eggs | Easter eggs | live
page | /secrets/strip-clubs | Strip clubs | live (overlaps `/guides/strip-clubs`)
page | /secrets/money | Money secrets | live
page | /secrets/collectibles | Collectibles | live
page | /secrets/hidden-locations | Hidden locations | live
page | /about | About | live

## Reorg notes (22 Nov 2026)

- No thin news or guide URLs were merged. Each news slug has a distinct search intent (for example `/news/release-date` is the reference card; `/news/gta-6-release-countdown` is regional unlock times). Merging them would need redirects and would risk SEO, so they stay separate.
- The two launch-week traffic-record pieces stay as two URLs (NBN vs DE-CIX are different primary sources) and now share a **Traffic records** filter on `/news`.
- The album and first-person-glitch pieces no longer sit in the catch-all Launch filter.
- Unused default Next.js SVGs (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`) were removed; nothing in the app referenced them.
- Repo-hosted article assets were already WebP at modest sizes. There is no 10GB payload in the GitHub repo, Vercel project, or Supabase project (see the PR body for measured numbers). Map source JPEGs under `assets/map/` are kept: they are inputs for `map:tiles`, not leftover article photos.
- Git history was not rewritten. Supabase Storage is empty; nothing was deleted there.
- After merging today's approved map, secrets, character, polish and guide PRs, this inventory keeps the reorganised news categories and adds the new live `/guides/strip-clubs`, `/guides/weapons` and `/secrets/*` pages. `/secrets` is no longer an empty noindex placeholder.
