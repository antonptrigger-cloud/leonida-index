# SEO

Canonical host: `https://www.leonidaviceguide.com` (the bare domain 308-redirects to www).

## Where things live
- `src/lib/seo/site.ts`: the route registry. Every indexable page has a title, description, breadcrumb label, schema kind, and sitemap priority/frequency here. `metaFor(path)` builds the page's Next.js metadata (canonical, OpenGraph, Twitter).
- `src/lib/seo/jsonld.tsx`: JSON-LD. The root layout emits Organization + WebSite (with a SearchAction to `/map?q=`). `<PageSchema path>` adds Article / NewsArticle / HowTo / CollectionPage / WebPage (and a BreadcrumbList unless the page renders `<Breadcrumbs>`, see below).
- `src/app/sitemap.ts`, `src/app/news-sitemap.xml/route.ts` and `src/app/robots.ts`: generated from the registry. Routes marked `noindex` (e.g. `/map/admin`) are excluded from the sitemap and get a `noindex, nofollow` meta tag. `/api/` and `/map/admin` are disallowed in robots.txt.
- `src/app/opengraph-image.tsx`: the 1200x630 share image (original art, Bebas Neue under the OFL in `src/assets/fonts`).
- `src/app/icon.svg`, `apple-icon.png`, `favicon.ico`, `public/icon-*.png`, `src/app/manifest.ts`: icons and the web manifest.

## Adding a page
1. Add an entry to `ROUTES` in `src/lib/seo/site.ts`.
2. In the page: `export const metadata = metaFor("/your/path");`, then render `<PageSchema path="/your/path" breadcrumbs={false} />` and `<Breadcrumbs path="/your/path" />` (the breadcrumb component emits its own BreadcrumbList; pages that don't use it can leave `breadcrumbs` at its default).
3. On articles, guides and profiles also render `<Related path="/your/path" />`.
4. The sitemap picks it up automatically. Run `npm run seo:audit` to check it.

## Google Search Console
- Preferred: a **Domain** property verified with a DNS TXT record at the DNS host (currently Porkbun).
- Alternative: a **URL-prefix** property for `https://www.leonidaviceguide.com/` using the HTML tag. Set `GOOGLE_SITE_VERIFICATION` in Vercel (Production) to the tag's `content` value and redeploy.
- Then submit `https://www.leonidaviceguide.com/sitemap.xml` under Sitemaps.

## Mission guides

Mission guides live in `src/lib/guides/missions.ts`. Each entry becomes a static page at
`/guides/missions/<slug>` and gets a ROUTES entry automatically (title, description, Article
JSON-LD, breadcrumb, sitemap with `lastModified` = `LAST_VERIFIED`). To add a mission, append
to `MISSIONS`; there is no need to edit `site.ts`. Bump `LAST_VERIFIED` when guides are re-checked.

Content rules: wording is our own; facts backed by one walkthrough use `status: "reported"`
(facts) or `reported: true` (tips); story beats go in `objectives` / `spoiler`, which render
behind a blur-to-reveal.

## Internal linking, breadcrumbs and FAQ

- `src/components/Breadcrumbs.tsx`: visible trail (Home / Section / Page) and BreadcrumbList JSON-LD, both from `crumbsFor(path)` so they cannot disagree. Used on guides, missions, news, characters, secrets, tools, about and sources (not on `/map/*`, which another team owns; those pages still emit BreadcrumbList JSON-LD via `<PageSchema>`).
- `src/components/Related.tsx` + `src/lib/seo/related.ts`: a "Related on Leonida Vice Guide" block on every news story, mission, guide, database and character page. Items are tagged from data we already have: characters mentioned (aliases such as "Lucia", "Cal"), map regions mentioned (Vice City, Keys, ...), topic keywords (police, cars, editions, ...) and character `relationships`. Scoring is IDF-weighted so ubiquitous names count less. Selection mixes sections: two from the page's own section, then the best character, map, guide and news match, then the strongest leftovers; with no matches it falls back to the latest in-section items. Spoiler-bearing copy (objectives, `spoiler`, tips) is never scanned, and missions show no teaser in the block. `/map` is always offered if no region page matched. Mission pages always get `/guides/missions` first. News stories get the guides listed for them in `NEWS_GUIDES` (hand-curated, because a story's words rarely name the guide a reader needs next), else the best topic match, else the guides hub. Characters only appear when actually named (or located, from a map page). Add a new news story to `NEWS_GUIDES`; `seo:audit` warns if you forget. To tune matching, edit `ALIASES`, `LOCATIONS` and `TOPICS` at the top of `related.ts`.
- `src/components/Faq.tsx`: renders a visible Q&A list and the matching FAQPage JSON-LD from one array. Missions, characters and news items accept an optional `faq: { question, answer }[]` field; `<Faq>` renders nothing when it is absent. Only add questions the page really answers. No FAQ content has been written yet.

## Metadata rules (checked by `npm run seo:audit`)

- Every indexable route needs a unique title and description, a breadcrumb label, and a date (`updated`, or `published`) on every page outside `/map`.
- Descriptions must be 120-160 characters.
- `metaFor()` appends " | Leonida Vice Guide" unless that would push the title past 60 characters (`MAX_BRANDED_TITLE`); then the page title is shown on its own (the brand stays in `og:site_name`). Rendered titles must stay at 60 characters or fewer.
- Canonical is each route's own clean path (lowercase, no trailing slash, no query); the audit fails otherwise.
- Content pages (article, news, how-to, profile) need at least `MIN_LINKS` (4) related links; mission pages must link to `/guides/missions`; news articles must link to at least one guide.
- Every `page.tsx` under `src/app` must have a `ROUTES` entry (or a dynamic prefix with entries), which is also what puts it in the sitemap.
- Related links must point at registered, indexable routes and never at the page itself. Every content page must render `<Related>` (directly, or through `NewsLayout` / `ReferencePage`).
- Open Graph article times (`publishedTime` / `modifiedTime`) are set for news, articles and how-tos that have dates.

## Structured data per page type

| Page | JSON-LD |
| --- | --- |
| All pages | Organization + WebSite (root layout). The SearchAction targets `/map?q=`, which is a map-location search, not a whole-site search; remove it if that is a concern. |
| Home | WebPage |
| News stories | NewsArticle (+ citations, keywords), BreadcrumbList |
| Mission guides, activities, beginner, edition compare, release date | Article, BreadcrumbList |
| Wanted, stealing cars | HowTo, BreadcrumbList |
| Characters | Article about a `Thing`, described as a fictional GTA VI character (deliberately not ProfilePage/Person, which would present fictional characters as real people); BreadcrumbList |
| Cast (`/database/characters/cast`) | Article about the game (not a character profile, because it covers real people), FAQPage, BreadcrumbList. Never state a performer's role as fact unless Rockstar or the performer says it; otherwise label it Reported with its source. |
| Section indexes (guides, missions, news, characters, secrets, map) | CollectionPage, BreadcrumbList |
| About | AboutPage, BreadcrumbList |
| Any page with `faq` data | FAQPage (from `<Faq>`) |

## Sitemap and robots

The sitemap lists every non-`noindex` entry in `ROUTES` (map, guides, missions, news, database hub and reference pages for characters, vehicles, weapons and radio, tools, sources, about; `/secrets` is `noindex` and omitted until it has real content).

`lastmod` is each route's own `updated`, falling back to `published` (`lastModifiedOf()` in `site.ts`). Nothing is invented: a route with neither date fails `npm run seo:audit`, except the home page (newest `updated` of any non-map page) and `/map*` (newest approved pin; omitted if the store is offline). **When you edit a page, bump its `updated`** (news: the article's `updated`; evergreen guides: the `*_VERIFIED` constant or the route's `updated`).

`robots.txt` allows everything except `/map/admin` and `/api/`, and lists two sitemaps: `/sitemap.xml` and `/news-sitemap.xml`.

### Google News sitemap (`/news-sitemap.xml`)
`src/app/news-sitemap.xml/route.ts` lists `NEWS` stories whose `published` time is within the last 48 hours (newest first, max 1000), with `news:publication` name "Leonida Vice Guide", language `en`, `news:publication_date` and `news:title`. It regenerates at most every 5 minutes, so the window moves without a redeploy, and goes empty when nothing is fresh (that is normal). Evergreen reference pages with no publication time are deliberately not listed. Submit it once in Search Console (Sitemaps); Google Publisher Center is optional.

## Share images (`/og/...`)
Guides, missions and news (including their hubs) get a generated 1200x630 image at `/og/<route>.png` (`src/app/og/[...path]/route.tsx`, renderer in `src/lib/seo/og.tsx`). The text comes only from `ROUTES` (title) and the news `tag`; the route returns 404 for anything not registered, so it cannot be used to render arbitrary text. Art is original (gradient, striped sun, Bebas Neue under the OFL); no Rockstar or third-party assets. `metaFor()` uses it for `og:image` and `twitter:image`, and `pageGraph()` for the JSON-LD `image`. Other pages keep `/opengraph-image`. Add a new section by extending `OG_SECTIONS` in `site.ts`.

## IndexNow (Bing, Yandex and others)
- Key file: `public/144a9d347090329abb161b0f3b27a18e.txt` (served at `https://www.leonidaviceguide.com/144a9d347090329abb161b0f3b27a18e.txt`). The key is public by design; it only proves we control the host. To rotate, generate a new 32-hex key, rename the file and put the same text inside; the script and `seo:audit` find it automatically (or set `INDEXNOW_KEY`).
- Ping after a deploy: `npm run indexnow -- /news/some-story /guides/money` (paths or full `www` URLs), `npm run indexnow -- --sitemap --since 24h` (URLs whose sitemap `lastmod` is newer than 24h or an ISO time), `--sitemap --all`, or `--news` (everything in `news-sitemap.xml`). Add `--dry-run` to print what would be sent. `--sitemap-url <url|file>` reads another sitemap, e.g. a preview.
- It POSTs once to `https://api.indexnow.org/indexnow` with host `www.leonidaviceguide.com`. A 200 or 202 means accepted, not indexed. Only pages that really changed should be sent; do not re-submit the whole site repeatedly.
- Google does not use IndexNow. Use Search Console URL Inspection and the sitemaps for Google.

## Checks
- `npm run seo:audit` (source level, no build needed): titles, descriptions, canonicals, dates, related-link minimums, `<Related>` on content pages, every page in `ROUTES`, IndexNow key file.
- `npm run seo:verify [-- http://localhost:3000]` (against a running `npm start`): fetches every sitemap URL and checks the HTML crawlers see: one title, description 120-160, one canonical equal to the sitemap URL, one `<h1>`, valid JSON-LD, BreadcrumbList matching the visible trail, FAQPage questions and answers visible on the page, Article dates and image, generated share images load as PNG, `robots.txt`, `news-sitemap.xml` and the key file.

## Database reference pages

`/database` is the hub. `/database/vehicles`, `/database/weapons` and `/database/radio-stations` are driven by `src/lib/database/reference.ts` (one `RefPage` each: SEO title and description, sections, blurred spoiler list, FAQ, sources) and rendered by `components/database/ReferencePage.tsx`. `ROUTES` and the related-links engine read the same list, so adding a page there registers it everywhere. Totals are attributed to the outlet that gave them ("PowerPyx counts...") and labelled Reported; story-linked unlocks go in the `spoiler` list only.
