/**
 * Metadata audit for the route registry (src/lib/seo/site.ts).
 * Run: npx tsx scripts/seo-audit.ts   (exits 1 on errors; warnings do not fail)
 *
 * Errors: missing/duplicate titles or descriptions, descriptions over 160 chars,
 * indexable routes with no breadcrumb label, news without dates.
 * Also: descriptions 120-160 chars, rendered titles <= 60 chars, canonical = the route's own clean path,
 * a lastmod date (updated or published) on every non-map page, related-link minimums (>= MIN_LINKS per
 * content page, missions link to /guides/missions, news links to a guide), a <Related> block on every
 * content page, and a valid IndexNow key file.
 *
 * Needs a running build for rendered-HTML checks (FAQ/breadcrumb/canonical in the DOM): `npm run seo:verify`.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { MAX_BRANDED_TITLE, ROUTES, SITE, lastModifiedOf, metaFor, ogImagePath } from "../src/lib/seo/site";
import { MIN_LINKS, NEWS_GUIDES, relatedFor } from "../src/lib/seo/related";

const errors: string[] = [];
const warns: string[] = [];
const titles = new Map<string, string>();
const descs = new Map<string, string>();

for (const [path, r] of Object.entries(ROUTES)) {
  if (r.noindex) continue;
  if (!r.title?.trim()) errors.push(`${path}: missing title`);
  if (!r.description?.trim()) errors.push(`${path}: missing description`);
  if (!r.crumb?.trim()) errors.push(`${path}: missing breadcrumb label`);
  if (r.description && r.description.length > 160) errors.push(`${path}: description is ${r.description.length} chars (max 160)`);
  if (r.description && r.description.length < 120) errors.push(`${path}: description is only ${r.description.length} chars (min 120)`);
  const branded = `${r.title} | ${SITE.name}`;
  const full = r.absoluteTitle || branded.length > MAX_BRANDED_TITLE ? r.title : branded; // mirrors metaFor()
  if (full.length > 60) errors.push(`${path}: rendered title is ${full.length} chars: "${full}"`);
  const dt = titles.get(full);
  if (dt) errors.push(`${path}: duplicate title with ${dt}`);
  titles.set(full, path);
  const dd = descs.get(r.description);
  if (dd) errors.push(`${path}: duplicate description with ${dd}`);
  descs.set(r.description, path);
  if (r.kind === "news" && (!r.published || !r.updated)) errors.push(`${path}: news without published/updated`);
  if (r.kind === "howto" && !r.steps?.length) errors.push(`${path}: howto without steps`);
}

const isoLike = /^\d{4}-\d{2}-\d{2}(T[\d:.]+(Z|[+-]\d{2}:\d{2}))?$/;
const CONTENT_KINDS = new Set(["article", "news", "howto", "profile"]);

for (const [path, r] of Object.entries(ROUTES)) {
  if (r.noindex) continue;
  // Canonical: Next resolves this against metadataBase, so it must be our own clean path.
  const canonical = metaFor(path).alternates?.canonical;
  if (canonical !== path) errors.push(`${path}: canonical is ${String(canonical)}, expected ${path}`);
  if (path !== "/" && !/^\/[a-z0-9][a-z0-9/-]*[a-z0-9]$/.test(path)) errors.push(`${path}: path should be lowercase, hyphenated, with no trailing slash`);
  // lastmod: every non-map page needs its own date. The home page derives its date from the others.
  const lm = lastModifiedOf(r);
  if (!path.startsWith("/map") && path !== "/") {
    if (!lm) errors.push(`${path}: no updated/published date, so the sitemap cannot give it an accurate lastmod`);
    else if (!isoLike.test(lm) || Number.isNaN(Date.parse(lm))) errors.push(`${path}: date "${lm}" is not ISO 8601`);
    if (r.updated && r.published && Date.parse(r.updated) < Date.parse(r.published)) errors.push(`${path}: updated is before published`);
  }
  // Generated share image only for guides and news.
  const og = ogImagePath(path);
  if ((path.startsWith("/guides") || path.startsWith("/news")) && !og) errors.push(`${path}: no generated share image`);
  if (og && !og.endsWith(".png")) errors.push(`${path}: share image path should end in .png`);
}

// Related links: minimums, mission -> missions hub, news -> a guide.
for (const [path, r] of Object.entries(ROUTES)) {
  if (r.noindex || path.startsWith("/map") || !r.kind || !CONTENT_KINDS.has(r.kind)) continue;
  const rel = relatedFor(path);
  if (rel.length < MIN_LINKS) errors.push(`${path}: only ${rel.length} related links (min ${MIN_LINKS})`);
  if (path.startsWith("/guides/missions/") && !rel.some((l) => l.href === "/guides/missions")) errors.push(`${path}: mission page does not link to /guides/missions`);
  if (path.startsWith("/news/") && !rel.some((l) => l.href.startsWith("/guides") || l.href.startsWith("/tools"))) errors.push(`${path}: news article links to no guide`);
}
for (const [news, guides] of Object.entries(NEWS_GUIDES)) {
  if (!ROUTES[news]) errors.push(`NEWS_GUIDES: ${news} is not a registered route`);
  for (const g of guides) if (!ROUTES[g] || ROUTES[g].noindex) errors.push(`NEWS_GUIDES: ${news} -> ${g} is not an indexable route`);
}

// Every news story should be curated in NEWS_GUIDES (falls back to the guides hub otherwise).
for (const [path, r] of Object.entries(ROUTES)) if (r.kind === "news" && !NEWS_GUIDES[path]) warns.push(`${path}: not in NEWS_GUIDES (will link to the guides hub only)`);

// IndexNow key file: public/<32 hex>.txt containing exactly its own name.
const keyFiles = readdirSync(join(process.cwd(), "public")).filter((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (keyFiles.length !== 1) errors.push(`IndexNow: expected exactly one public/<32-hex>.txt key file, found ${keyFiles.length}`);
else if (readFileSync(join(process.cwd(), "public", keyFiles[0]), "utf8").trim() !== keyFiles[0].replace(/\.txt$/, "")) errors.push(`IndexNow: public/${keyFiles[0]} must contain its own file name`);

// Every related link must point at a registered, indexable route.
for (const path of Object.keys(ROUTES)) {
  for (const rel of relatedFor(path)) {
    const t = ROUTES[rel.href];
    if (!t || t.noindex) errors.push(`${path}: related link ${rel.href} is not an indexable route`);
    if (rel.href === path) errors.push(`${path}: links to itself`);
  }
}

// Every page.tsx under src/app must have a registry entry (so it gets metadata, JSON-LD and a sitemap row).
function pageFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return name === "api" ? [] : pageFiles(full);
    return name === "page.tsx" ? [full] : [];
  });
}
const appDir = join(process.cwd(), "src/app");
for (const file of pageFiles(appDir)) {
  const route = "/" + relative(appDir, file).replace(/\/?page\.tsx$/, "").split("\\").join("/");
  const path = route === "/" || route === "/." ? "/" : route.replace(/\/$/, "");
  if (path.includes("[")) {
    const prefix = path.slice(0, path.indexOf("[")); // e.g. /guides/missions/
    if (!Object.keys(ROUTES).some((k) => k.startsWith(prefix))) errors.push(`${path}: dynamic route has no registry entries`);
  } else if (!ROUTES[path]) errors.push(`${path}: page exists but has no entry in ROUTES (missing from sitemap and metadata)`);
}

// Content pages must render the shared <Related> block (directly or through a layout that does).
const RELATED_WRAPPERS = new Map<string, boolean>();
const wrapperRenders = (file: string) => {
  if (!RELATED_WRAPPERS.has(file)) RELATED_WRAPPERS.set(file, existsSync(file) && readFileSync(file, "utf8").includes("<Related"));
  return RELATED_WRAPPERS.get(file)!;
};
const WRAPPERS: Record<string, string> = {
  NewsLayout: join(process.cwd(), "src/components/news/NewsBits.tsx"),
  ReferencePage: join(process.cwd(), "src/components/database/ReferencePage.tsx"),
};
for (const file of pageFiles(appDir)) {
  const route = "/" + relative(appDir, file).replace(/\/?page\.tsx$/, "").split("\\").join("/");
  const entries = route.includes("[")
    ? Object.entries(ROUTES).filter(([k]) => k.startsWith(route.slice(0, route.indexOf("["))) && k.split("/").length === route.split("/").length)
    : ROUTES[route] ? [[route, ROUTES[route]] as const] : [];
  if (!entries.some(([, r]) => !r.noindex && r.kind && CONTENT_KINDS.has(r.kind))) continue;
  if (route.startsWith("/map")) continue;
  const src = readFileSync(file, "utf8");
  const ok = src.includes("<Related") || Object.entries(WRAPPERS).some(([name, f]) => src.includes(`<${name}`) && wrapperRenders(f));
  if (!ok) errors.push(`${route}: content page does not render <Related> (directly or via NewsLayout/ReferencePage)`);
}

for (const w of warns) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);
console.log(`${Object.keys(ROUTES).length} routes checked: ${errors.length} errors, ${warns.length} warnings`);
process.exit(errors.length ? 1 : 0);
