#!/usr/bin/env node
/**
 * IndexNow: tell Bing, Yandex and other participating engines that URLs changed.
 * https://www.indexnow.org/documentation
 *
 * The key is public by design: it lives at public/<key>.txt and is served at
 * https://www.leonidaviceguide.com/<key>.txt so engines can verify we own the host.
 *
 * Usage (from the repo root):
 *   npm run indexnow -- /news/some-story /guides/money          submit these paths (or full URLs)
 *   npm run indexnow -- --sitemap --since 24h                   URLs in the live sitemap changed in the last 24h
 *   npm run indexnow -- --sitemap --since 2026-11-19T00:00:00Z  ... or since a timestamp
 *   npm run indexnow -- --sitemap --all                         every URL in the sitemap
 *   npm run indexnow -- --news                                  every URL in news-sitemap.xml (last 48h of stories)
 *   add --dry-run to print the request without sending it
 *   --sitemap-url <url> reads another sitemap (e.g. a preview deployment or file) instead of production
 *
 * Only URLs on www.leonidaviceguide.com are accepted. Each run is one POST; up to 10,000 URLs per request.
 * A 200 or 202 response means accepted (202 = key validation pending), not "indexed".
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HOST = "www.leonidaviceguide.com";
const ORIGIN = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function findKey() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY.trim();
  const files = readdirSync(join(root, "public")).filter((f) => /^[a-f0-9]{32}\.txt$/.test(f));
  if (files.length !== 1) throw new Error(`Expected exactly one public/<32-hex>.txt key file, found ${files.length}`);
  const key = files[0].replace(/\.txt$/, "");
  const body = readFileSync(join(root, "public", files[0]), "utf8").trim();
  if (body !== key) throw new Error(`public/${files[0]} must contain exactly its own file name (the key)`);
  return key;
}

function parseSince(v) {
  const m = /^(\d+)([hd])$/.exec(v);
  if (m) return Date.now() - Number(m[1]) * (m[2] === "h" ? 3_600_000 : 86_400_000);
  const t = Date.parse(v);
  if (Number.isNaN(t)) throw new Error(`Cannot read --since "${v}" (use 24h, 3d or an ISO timestamp)`);
  return t;
}

async function readSitemap(url) {
  const xml = url.startsWith("http") ? await (await fetch(url)).text() : readFileSync(url, "utf8");
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    loc: /<loc>([^<]+)<\/loc>/.exec(m[1])?.[1]?.trim(),
    lastmod: /<lastmod>([^<]+)<\/lastmod>/.exec(m[1])?.[1]?.trim(),
  })).filter((u) => u.loc);
}

function normalise(u) {
  const url = new URL(u.startsWith("/") ? ORIGIN + u : u);
  if (url.host !== HOST) throw new Error(`Refusing ${u}: IndexNow URLs must be on ${HOST}`);
  url.hash = "";
  return url.toString().replace(/^(https:\/\/[^/]+)\/$/, "$1");
}

async function main() {
  const args = process.argv.slice(2);
  const flag = (n) => args.includes(n);
  const opt = (n) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
  const valueFlags = new Set(["--since", "--sitemap-url"]);
  const positional = args.filter((a, i) => !a.startsWith("--") && !valueFlags.has(args[i - 1]));
  let urls = positional.map(normalise);

  if (flag("--sitemap") || flag("--news")) {
    const src = opt("--sitemap-url") ?? `${ORIGIN}/${flag("--news") ? "news-sitemap.xml" : "sitemap.xml"}`;
    const entries = await readSitemap(src);
    const since = flag("--all") || flag("--news") ? 0 : parseSince(opt("--since") ?? "24h");
    // Entries with no lastmod cannot be shown to have changed, so only --all includes them.
    const picked = entries.filter((e) => (since === 0 ? true : e.lastmod && Date.parse(e.lastmod) >= since));
    urls.push(...picked.map((e) => normalise(e.loc.replace(/^https?:\/\/[^/]+/, ORIGIN))));
  }
  urls = [...new Set(urls)];
  if (!urls.length) {
    console.log("No URLs to submit.");
    return;
  }
  if (urls.length > 10000) throw new Error("IndexNow accepts at most 10,000 URLs per request");

  const key = findKey();
  const payload = { host: HOST, key, keyLocation: `${ORIGIN}/${key}.txt`, urlList: urls };
  console.log(`${urls.length} URL(s):\n  ${urls.join("\n  ")}`);
  if (flag("--dry-run")) {
    console.log(`\nDry run. Would POST to ${ENDPOINT}:\n${JSON.stringify({ ...payload, urlList: `[${urls.length} urls]` }, null, 2)}`);
    return;
  }
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  console.log(`IndexNow responded ${res.status} ${res.statusText}`);
  if (![200, 202].includes(res.status)) {
    console.error((await res.text()).slice(0, 500));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
