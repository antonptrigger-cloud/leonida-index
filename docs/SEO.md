# SEO

Canonical host: `https://www.leonidaviceguide.com` (the bare domain 308-redirects to www).

## Where things live
- `src/lib/seo/site.ts`: the route registry. Every indexable page has a title, description, breadcrumb label, schema kind, and sitemap priority/frequency here. `metaFor(path)` builds the page's Next.js metadata (canonical, OpenGraph, Twitter).
- `src/lib/seo/jsonld.tsx`: JSON-LD. The root layout emits Organization + WebSite (with a SearchAction to `/map?q=`). `<PageSchema path>` adds BreadcrumbList plus Article / HowTo / CollectionPage.
- `src/app/sitemap.ts` and `src/app/robots.ts`: generated from the registry. Routes marked `noindex` (e.g. `/map/admin`) are excluded from the sitemap and get a `noindex, nofollow` meta tag. `/api/` and `/map/admin` are disallowed in robots.txt.
- `src/app/opengraph-image.tsx`: the 1200x630 share image (original art, Bebas Neue under the OFL in `src/assets/fonts`).
- `src/app/icon.svg`, `apple-icon.png`, `favicon.ico`, `public/icon-*.png`, `src/app/manifest.ts`: icons and the web manifest.

## Adding a page
1. Add an entry to `ROUTES` in `src/lib/seo/site.ts`.
2. In the page: `export const metadata = metaFor("/your/path");` and render `<PageSchema path="/your/path" />`.
3. The sitemap picks it up automatically.

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
