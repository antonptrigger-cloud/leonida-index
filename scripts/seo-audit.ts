/**
 * Metadata audit for the route registry (src/lib/seo/site.ts).
 * Run: npx tsx scripts/seo-audit.ts   (exits 1 on errors; warnings do not fail)
 *
 * Errors: missing/duplicate titles or descriptions, descriptions over 160 chars,
 * indexable routes with no breadcrumb label, news without dates.
 * Warnings: description under 70 chars.
 */
import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { MAX_BRANDED_TITLE, ROUTES, SITE } from "../src/lib/seo/site";
import { relatedFor } from "../src/lib/seo/related";

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
  if (r.description && r.description.length < 70) warns.push(`${path}: description is only ${r.description.length} chars`);
  const branded = `${r.title} | ${SITE.name}`;
  const full = r.absoluteTitle || branded.length > MAX_BRANDED_TITLE ? r.title : branded; // mirrors metaFor()
  if (full.length > 62) errors.push(`${path}: rendered title is ${full.length} chars: "${full}"`);
  const dt = titles.get(full);
  if (dt) errors.push(`${path}: duplicate title with ${dt}`);
  titles.set(full, path);
  const dd = descs.get(r.description);
  if (dd) errors.push(`${path}: duplicate description with ${dd}`);
  descs.set(r.description, path);
  if (r.kind === "news" && (!r.published || !r.updated)) errors.push(`${path}: news without published/updated`);
  if (r.kind === "howto" && !r.steps?.length) errors.push(`${path}: howto without steps`);
}

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

for (const w of warns) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);
console.log(`${Object.keys(ROUTES).length} routes checked: ${errors.length} errors, ${warns.length} warnings`);
process.exit(errors.length ? 1 : 0);
