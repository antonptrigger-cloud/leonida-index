# SEO

Canonical host: `https://www.leonidaviceguide.com` (the bare domain 308-redirects to www).

## Where things live
- `src/lib/seo/site.ts`: the route registry. Every indexable page has a title, description, breadcrumb label, schema kind, and sitemap priority/frequency here. `metaFor(path)` builds the page's Next.js metadata (canonical, OpenGraph, Twitter).
- `src/lib/seo/jsonld.tsx`: JSON-LD. The root layout emits Organization + WebSite (with a SearchAction to `/map?q=`). `<PageSchema path>` adds Article / NewsArticle / HowTo / ProfilePage / CollectionPage / WebPage (and a BreadcrumbList unless the page renders `<Breadcrumbs>`, see below).
- `src/app/sitemap.ts` and `src/app/robots.ts`: generated from the registry. Routes marked `noindex` (e.g. `/map/admin`) are excluded from the sitemap and get a `noindex, nofollow` meta tag. `/api/` and `/map/admin` are disallowed in robots.txt.
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
- `src/components/Related.tsx` + `src/lib/seo/related.ts`: a "Related on Leonida Vice Guide" block on every news story, mission, static guide, edition compare and character page. Items are tagged from data we already have: characters mentioned (aliases such as "Lucia", "Cal"), map regions mentioned (Vice City, Keys, ...), topic keywords (police, cars, editions, ...) and character `relationships`. Scoring is IDF-weighted so ubiquitous names count less. Selection mixes sections: two from the page's own section, then the best character, map, guide and news match, then the strongest leftovers; with no matches it falls back to the latest in-section items. Spoiler-bearing copy (objectives, `spoiler`, tips) is never scanned, and missions show no teaser in the block. `/map` is always offered if no region page matched. To tune matching, edit `ALIASES`, `LOCATIONS` and `TOPICS` at the top of `related.ts`.
- `src/components/Faq.tsx`: renders a visible Q&A list and the matching FAQPage JSON-LD from one array. Missions, characters and news items accept an optional `faq: { question, answer }[]` field; `<Faq>` renders nothing when it is absent. Only add questions the page really answers. No FAQ content has been written yet.

## Metadata rules (checked by `npm run seo:audit`)

- Every indexable route needs a unique title and description, a breadcrumb label, and (for news) published/updated dates.
- Descriptions must be 160 characters or fewer (warning under 70).
- `metaFor()` appends " | Leonida Vice Guide" unless that would push the title past 62 characters; then the page title is shown on its own (the brand stays in `og:site_name`). Page titles themselves must stay at 62 characters or fewer.
- Every `page.tsx` under `src/app` must have a `ROUTES` entry (or a dynamic prefix with entries), which is also what puts it in the sitemap.
- Related links must point at registered, indexable routes and never at the page itself.
- Open Graph article times (`publishedTime` / `modifiedTime`) are set for news, articles and how-tos that have dates.

## Structured data per page type

| Page | JSON-LD |
| --- | --- |
| All pages | Organization + WebSite (root layout). The SearchAction targets `/map?q=`, which is a map-location search, not a whole-site search; remove it if that is a concern. |
| Home | WebPage |
| News stories | NewsArticle (+ citations, keywords), BreadcrumbList |
| Mission guides, activities, beginner, edition compare, release date | Article, BreadcrumbList |
| Wanted, stealing cars | HowTo, BreadcrumbList |
| Characters | ProfilePage whose mainEntity is a `Person` (`Thing` for the Real Dimez duo), described as a fictional GTA VI character; BreadcrumbList |
| Section indexes (guides, missions, news, characters, secrets, map) | CollectionPage, BreadcrumbList |
| About | AboutPage, BreadcrumbList |
| Any page with `faq` data | FAQPage (from `<Faq>`) |

## Sitemap and robots

The sitemap lists every non-`noindex` entry in `ROUTES` (map, guides, missions, news, characters, secrets, tools, sources, about). `lastModified` comes from each route's `updated` (the news index uses the newest story's `updated`; the guides index uses `LAST_VERIFIED`); map pages use the newest approved pin. `robots.txt` allows everything except `/map/admin` and `/api/`, and links the sitemap.
