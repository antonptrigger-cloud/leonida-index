#!/usr/bin/env node
/**
 * Rendered-page SEO checks against a running server (run `npm run build && npm start` first).
 *   npm run seo:verify                      checks http://localhost:3000
 *   npm run seo:verify -- http://localhost:3917
 *
 * Reads /sitemap.xml and, for every URL in it (host rewritten to the server), checks the HTML a crawler sees:
 * one <title>, one description (120-160), one canonical equal to the sitemap URL, one <h1>, valid JSON-LD,
 * BreadcrumbList that matches the visible breadcrumb trail, FAQPage that matches the visible Q&A,
 * Article/NewsArticle dates and image, and generated share images for guides and news (fetched, must be PNG).
 * Also checks robots.txt, news-sitemap.xml and the IndexNow key file.
 */
import { readdirSync } from "node:fs";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const errors = [];
const err = (url, msg) => errors.push(`${url}: ${msg}`);

const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
const norm = (s) => decode(s).replace(/\s+/g, " ").trim();
const visibleText = (html) => norm(html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " "));
const attr = (tag, name) => new RegExp(`${name}="([^"]*)"`).exec(tag)?.[1];
const metaContent = (html, key, val) => {
  const tags = html.match(/<meta [^>]*>/g) ?? [];
  return tags.filter((t) => attr(t, key) === val).map((t) => decode(attr(t, "content") ?? ""));
};

async function get(path) {
  const res = await fetch(base + path, { redirect: "manual" });
  return { res, text: res.headers.get("content-type")?.includes("image") ? "" : await res.text() };
}

const sm = await get("/sitemap.xml");
if (sm.res.status !== 200) throw new Error(`sitemap.xml returned ${sm.res.status}`);
const urls = [...sm.text.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
  loc: /<loc>([^<]+)<\/loc>/.exec(m[1])[1],
  lastmod: /<lastmod>([^<]+)<\/lastmod>/.exec(m[1])?.[1],
}));
let checked = 0;

for (const { loc, lastmod } of urls) {
  const path = new URL(loc).pathname;
  const { res, text: html } = await get(path);
  checked++;
  if (res.status !== 200) { err(path, `status ${res.status}`); continue; }
  if (lastmod && Number.isNaN(Date.parse(lastmod))) err(path, `bad sitemap lastmod ${lastmod}`);

  const titles = html.match(/<title>[\s\S]*?<\/title>/g) ?? [];
  if (titles.length !== 1) err(path, `${titles.length} <title> tags`);
  else if (norm(titles[0].replace(/<\/?title>/g, "")).length > 60 && !path.startsWith("/map")) err(path, `title is ${norm(titles[0].replace(/<\/?title>/g, "")).length} chars`);
  const desc = metaContent(html, "name", "description");
  if (desc.length !== 1) err(path, `${desc.length} meta descriptions`);
  else if (desc[0].length < 120 || desc[0].length > 160) err(path, `description is ${desc[0].length} chars`);
  const canon = (html.match(/<link [^>]*rel="canonical"[^>]*>/g) ?? []).map((t) => attr(t, "href"));
  if (canon.length !== 1) err(path, `${canon.length} canonical links`);
  else if (canon[0] !== loc) err(path, `canonical ${canon[0]} != sitemap url ${loc}`);
  if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) err(path, `${(html.match(/<h1[\s>]/g) ?? []).length} <h1> elements`);
  const robotsMeta = metaContent(html, "name", "robots").join(",");
  if (/noindex/.test(robotsMeta)) err(path, "is in the sitemap but has noindex");

  const ogImg = metaContent(html, "property", "og:image");
  const twImg = metaContent(html, "name", "twitter:image");
  if (!ogImg.length || !twImg.length) err(path, "missing og:image or twitter:image");
  if (/^\/(guides|news)(\/|$)/.test(path)) {
    for (const u of [...ogImg, ...twImg]) {
      if (!u.includes("/og/guides") && !u.includes("/og/news")) err(path, `share image is not the generated one: ${u}`);
    }
    if (ogImg[0]) {
      const img = await fetch(base + new URL(ogImg[0]).pathname);
      if (img.status !== 200 || !img.headers.get("content-type")?.includes("image/png")) err(path, `share image ${ogImg[0]} -> ${img.status} ${img.headers.get("content-type")}`);
    }
  }

  // JSON-LD
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const nodes = [];
  for (const b of blocks) {
    try {
      const d = JSON.parse(b);
      nodes.push(...(Array.isArray(d) ? d : d["@graph"] ?? [d]));
    } catch { err(path, "invalid JSON-LD"); }
  }
  const ofType = (t) => nodes.filter((n) => n["@type"] === t);
  const text = visibleText(html);

  const crumbs = ofType("BreadcrumbList");
  const navMatch = /<nav aria-label="Breadcrumb"[\s\S]*?<\/nav>/.exec(html);
  if (crumbs.length > 1) err(path, `${crumbs.length} BreadcrumbList blocks`);
  if (path !== "/" && !path.startsWith("/map") && crumbs.length !== 1) err(path, `${crumbs.length} BreadcrumbList blocks`);
  if (crumbs[0]) {
    const items = crumbs[0].itemListElement ?? [];
    items.forEach((it, i) => {
      if (it.position !== i + 1) err(path, `breadcrumb position ${it.position} at index ${i}`);
      if (!it.name || !/^https:\/\/www\.leonidaviceguide\.com/.test(it.item ?? "")) err(path, `bad breadcrumb item ${JSON.stringify(it)}`);
    });
    if (items.at(-1)?.item !== loc) err(path, `last breadcrumb ${items.at(-1)?.item} != page ${loc}`);
    if (navMatch) {
      const visible = [...navMatch[0].matchAll(/<li[\s\S]*?<\/li>/g)].map((m) => norm(m[0].replace(/<[^>]+>/g, " ")).replace(/\s*\/$/, ""));
      const ld = items.map((it) => it.name);
      if (JSON.stringify(visible) !== JSON.stringify(ld)) err(path, `breadcrumb mismatch: visible ${JSON.stringify(visible)} vs JSON-LD ${JSON.stringify(ld)}`);
    } else if (!path.startsWith("/map")) err(path, "BreadcrumbList without a visible breadcrumb nav");
  }

  const faqs = ofType("FAQPage");
  if (faqs.length > 1) err(path, `${faqs.length} FAQPage blocks`);
  for (const f of faqs) {
    const qs = f.mainEntity ?? [];
    for (const q of qs) {
      if (!text.includes(norm(q.name))) err(path, `FAQ question not visible: "${q.name.slice(0, 60)}"`);
      if (!text.includes(norm(q.acceptedAnswer?.text ?? ""))) err(path, `FAQ answer not visible for: "${q.name.slice(0, 60)}"`);
    }
    const dts = (html.match(/<dt[\s>]/g) ?? []).length;
    if (dts < qs.length) err(path, `FAQPage has ${qs.length} questions but only ${dts} visible <dt>`);
  }

  for (const n of [...ofType("Article"), ...ofType("NewsArticle")]) {
    if ((n.headline ?? "").length === 0 || n.headline.length > 110) err(path, `headline length ${n.headline?.length}`);
    for (const k of ["datePublished", "dateModified"]) if (n[k] && Number.isNaN(Date.parse(n[k]))) err(path, `${k} ${n[k]} is not a date`);
    const img = typeof n.image === "string" ? n.image : n.image?.url;
    if (!/^https:\/\//.test(img ?? "")) err(path, "Article image is not an absolute URL");
    if (/^\/(guides|news)(\/|$)/.test(path) && !img?.includes("/og/")) err(path, `Article image is not the generated share image: ${img}`);
  }
}

// robots.txt, news sitemap, IndexNow key
const robots = (await get("/robots.txt")).text;
for (const s of ["sitemap.xml", "news-sitemap.xml"]) if (!robots.includes(`Sitemap: https://www.leonidaviceguide.com/${s}`)) err("/robots.txt", `missing Sitemap: ${s}`);
const ns = await get("/news-sitemap.xml");
if (ns.res.status !== 200 || !ns.res.headers.get("content-type")?.includes("xml")) err("/news-sitemap.xml", `status ${ns.res.status} ${ns.res.headers.get("content-type")}`);
else {
  if (!ns.text.includes('xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"')) err("/news-sitemap.xml", "missing news namespace");
  const entries = [...ns.text.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  if (entries.length > 1000) err("/news-sitemap.xml", "more than 1000 URLs");
  for (const e of entries) {
    const when = /<news:publication_date>([^<]+)</.exec(e)?.[1];
    if (!when || Date.now() - Date.parse(when) > 48 * 3600e3) err("/news-sitemap.xml", `entry older than 48h or missing date: ${when}`);
    if (!/<news:name>Leonida Vice Guide<\/news:name>/.test(e) || !/<news:language>en<\/news:language>/.test(e) || !/<news:title>[^<]+<\/news:title>/.test(e)) err("/news-sitemap.xml", "entry missing publication name/language/title");
  }
  console.log(`news-sitemap.xml: ${entries.length} entr${entries.length === 1 ? "y" : "ies"} in the last 48h`);
}
const keyFile = readdirSync("public").find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
const key = await get(`/${keyFile}`);
if (key.res.status !== 200 || key.text.trim() !== keyFile.replace(".txt", "")) err(`/${keyFile}`, `IndexNow key not served correctly (${key.res.status})`);

for (const e of errors) console.error(`ERROR ${e}`);
console.log(`${checked} pages verified at ${base}: ${errors.length} errors`);
process.exit(errors.length ? 1 : 0);
