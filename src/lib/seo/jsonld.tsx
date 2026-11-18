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

export interface FaqItem {
  question: string;
  /** Plain text. It must match the answer rendered on the page. */
  answer: string;
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
        logo: { "@type": "ImageObject", url: `${SITE.url}/icon-512.png`, width: 512, height: 512 },
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

/** BreadcrumbList for a path. Built from the same trail the visible <Breadcrumbs> renders. */
export function breadcrumbSchema(path: string): Json | null {
  const crumbs = crumbsFor(path);
  if (crumbs.length < 2) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.url })),
  };
}

/** FAQPage JSON-LD. Only call it with questions that are also rendered on the page (see <Faq>). */
export function faqSchema(items: FaqItem[]): Json | null {
  const valid = items.filter((i) => i.question.trim() && i.answer.trim());
  if (!valid.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: valid.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}

/** Per-page JSON-LD: BreadcrumbList for nested pages, plus Article / HowTo / ProfilePage / CollectionPage where it fits. */
export function pageGraph(path: string, opts: { breadcrumbs?: boolean } = {}): Json[] {
  const r = ROUTES[path];
  if (!r || r.noindex) return [];
  const url = absoluteUrl(path);
  const out: Json[] = [];
  const crumb = opts.breadcrumbs === false ? null : breadcrumbSchema(path);
  if (crumb) out.push(crumb);
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
  if (r.kind === "news") {
    out.push({
      ...common,
      "@type": "NewsArticle",
      "@id": `${url}#article`,
      headline: r.title.slice(0, 110),
      image: { "@type": "ImageObject", url: image, width: 1200, height: 630 },
      datePublished: r.published,
      dateModified: r.updated ?? r.published,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: { "@type": "Organization", name: SITE.name, url: SITE.url },
      publisher: {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE.name,
        url: SITE.url,
        logo: { "@type": "ImageObject", url: `${SITE.url}/icon-512.png`, width: 512, height: 512 },
      },
      about: {
        "@type": "VideoGame",
        name: "Grand Theft Auto VI",
        publisher: { "@type": "Organization", name: "Rockstar Games" },
        gamePlatform: ["PlayStation 5", "Xbox Series X|S"],
      },
      ...(r.keywords?.length ? { keywords: r.keywords.join(", ") } : {}),
      ...(r.citations?.length ? { citation: r.citations } : {}),
    });
  }
  if (r.kind === "profile") {
    // A profile page about one fictional character (or duo). `Person` for individuals,
    // `Thing` for groups; the description always says the subject is fictional.
    out.push({
      ...common,
      "@type": "ProfilePage",
      mainEntity: {
        "@type": r.profileType ?? "Person",
        "@id": `${url}#character`,
        name: r.crumb,
        description: `${r.crumb}, a fictional character in Grand Theft Auto VI`,
        url,
        subjectOf: { "@type": "VideoGame", name: "Grand Theft Auto VI", publisher: { "@type": "Organization", name: "Rockstar Games" } },
      },
    });
  }
  if (!r.kind || r.kind === "page") {
    const { headline: _h, author: _a, mainEntityOfPage: _m, ...rest } = common;
    void _h; void _a; void _m;
    out.push({
      ...rest,
      "@type": path === "/about" ? "AboutPage" : "WebPage",
      ...(path === "/" ? { about: { "@type": "VideoGame", name: "Grand Theft Auto VI" } } : {}),
    });
  }
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
export function PageSchema({ path, breadcrumbs = true }: { path: string; /** Set false when the page renders <Breadcrumbs>, which emits its own BreadcrumbList. */ breadcrumbs?: boolean }) {
  const data = pageGraph(path, { breadcrumbs });
  return data.length ? <JsonLd data={data} /> : null;
}
