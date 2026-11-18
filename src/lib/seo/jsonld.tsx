import { ROUTES, SITE, absoluteUrl, crumbsFor } from "./site";

type Json = Record<string, unknown>;

/** Renders schema.org JSON-LD. `<` is escaped so content can never close the script tag. */
export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export function siteGraph(): Json {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE.name,
        url: SITE.url,
        logo: { "@type": "ImageObject", url: `${SITE.url}/icon.svg`, width: 512, height: 512 },
        description: "Independent GTA 6 fan site. Not affiliated with Rockstar Games or Take-Two Interactive.",
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE.url,
        name: SITE.name,
        alternateName: ["Leonida Vice Guide", "leonidaviceguide.com"],
        description: SITE.description,
        inLanguage: "en",
        publisher: { "@id": ORG_ID },
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${SITE.url}/map?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

/** Per-page JSON-LD: BreadcrumbList for nested pages, plus Article / HowTo / CollectionPage where it fits. */
export function pageGraph(path: string): Json[] {
  const r = ROUTES[path];
  if (!r || r.noindex) return [];
  const url = absoluteUrl(path);
  const out: Json[] = [];
  const crumbs = crumbsFor(path);
  if (crumbs.length > 1) {
    out.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.url })),
    });
  }
  const image = `${SITE.url}/opengraph-image`;
  const common = {
    "@context": "https://schema.org",
    url,
    name: r.title,
    headline: r.title.slice(0, 110),
    description: r.description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    author: { "@id": ORG_ID },
    image,
    dateModified: r.updated ?? SITE.updated,
    ...(r.published ? { datePublished: r.published } : {}),
    mainEntityOfPage: url,
  };
  if (r.kind === "article") out.push({ ...common, "@type": "Article", about: "Grand Theft Auto VI" });
  if (r.kind === "howto" && r.steps) {
    out.push({
      ...common,
      "@type": "HowTo",
      step: r.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text })),
    });
  }
  if (r.kind === "collection") {
    const { headline: _h, author: _a, dateModified: _d, mainEntityOfPage: _m, ...rest } = common;
    void _h; void _a; void _d; void _m;
    out.push({ ...rest, "@type": "CollectionPage" });
  }
  return out;
}

/** Drop-in for a page: emits that page's JSON-LD. */
export function PageSchema({ path }: { path: string }) {
  const data = pageGraph(path);
  return data.length ? <JsonLd data={data} /> : null;
}
