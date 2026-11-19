import { NEWS, newsPath } from "@/lib/news/articles";
import { SITE, absoluteUrl } from "@/lib/seo/site";

/**
 * Google News sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap
 * Lists news stories published in the last 48 hours (Google ignores older ones), newest first, max 1000.
 * Evergreen reference pages with no publication time (e.g. /news/release-date) are not listed.
 * Re-generated at most every 5 minutes, so the 48-hour window keeps moving without a redeploy.
 */
export const revalidate = 300;

const WINDOW_MS = 48 * 60 * 60 * 1000;
const MAX_URLS = 1000;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export function GET() {
  const now = Date.now();
  const recent = NEWS.map((n) => ({ n, t: new Date(n.published).getTime() }))
    .filter(({ t }) => Number.isFinite(t) && t <= now && now - t <= WINDOW_MS)
    .sort((a, b) => b.t - a.t)
    .slice(0, MAX_URLS);

  const body = recent
    .map(
      ({ n, t }) => `  <url>
    <loc>${esc(absoluteUrl(newsPath(n.slug)))}</loc>
    <news:news>
      <news:publication>
        <news:name>${esc(SITE.name)}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(t).toISOString()}</news:publication_date>
      <news:title>${esc(n.title)}</news:title>
    </news:news>
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${body}
</urlset>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
  });
}
