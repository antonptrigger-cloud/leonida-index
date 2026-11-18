// Imports a curated, district-placed subset of GTADB's community landmark data into src/lib/map/gtadb-pins.json.
//
//   node scripts/import-gtadb.mjs                # fetch the pinned upstream revision
//   node scripts/import-gtadb.mjs --file path/to/landmarks.json
//
// DATA LICENCE: landmark data from https://github.com/rolux/gtadb.org (map/data/6/landmarks.json),
// "GTA VI Landmarks Data (CC BY 4.0)", https://map.gtadb.org, https://creativecommons.org/licenses/by/4.0/.
// We use ONLY landmark names, categories and relative positions. We do NOT use GTADB's map tiles, photos or
// any other image assets. Changes made: filtered to a small named subset, mapped onto our own types,
// and repositioned (see below). Credit is shown in the map attribution, on every imported pin, in /sources
// and in docs/DATA_CREDITS.md.
//
// POSITIONS ARE APPROXIMATE. GTADB coordinates live in the pixel space of their own map. We compared six
// shared reference points (region centres) against our base image and the best affine fit is off by ~85 px
// RMS (about 7% of the map width), which is more than the width of Vice City on our image. So there is no
// sound global mapping and we do not pretend there is. Instead each district is placed by itself: the
// district's 5th-95th percentile bounding box in GTADB space is stretched onto a hand-picked box on our
// image (y flipped, GTADB's y points north). This keeps the layout inside a district (which street comes
// before which) but not the distances between districts. Every imported pin is marked approximate.
import { readFileSync, writeFileSync } from "node:fs";

const REV = "8b1dc4f0619d8760fd87881c396225c147f4d738"; // rolux/gtadb.org, 2026-11-18
const URL_ = `https://raw.githubusercontent.com/rolux/gtadb.org/${REV}/map/data/6/landmarks.json`;
const OUT = new URL("../src/lib/map/gtadb-pins.json", import.meta.url);

/** Districts we place. `box` is [cx, cy, w, h] on our 1168x784 base image; `uniform` keeps the aspect ratio. */
const GROUPS = [
  { key: "vice-city", match: (p) => p.at(-1) === "Vice City", region: "Vice City", box: [815, 365, 210, 200], uniform: true, cap: 22 },
  { key: "ocean-beach", match: (p) => p.at(-1) === "Vice Beach", region: "Vice City", box: [978, 372, 26, 250], uniform: false, cap: 14 },
  { key: "port-gellhorn", match: (p) => p.at(-1) === "Port Gellhorn", region: "Port Gellhorn", box: [225, 368, 215, 185], uniform: true, cap: 14 },
];

const SKIP_STATUS = new Set(["unconfirmed", "demolished", "closed", "may-not-exist", "//may-not-exist", "construction", "reused", "mirrored"]);
const GENERIC = /^(bus stop|park|riverbank|boardwalk|bridge|parking|lifeguard tower|beach volleyball|gas station|tunnel|dock|pier|road|street|alley|pool|tennis court|car wash)\b|\?|\bsign$/i;

const TYPE_BY_CATEGORY = [
  ["hotel", "landmark"],
  ["restaurant", "shop"],
  ["retail", "shop"],
  ["leisure", "activity"],
  ["events", "activity"],
  ["residential", "property"],
  ["landmark", "landmark"],
  ["enterable", "landmark"],
];

function pickType(cats) {
  for (const [c, t] of TYPE_BY_CATEGORY) if (cats.includes(c)) return t;
  return null;
}

const pct = (arr, q) => {
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.max(0, Math.round(q * (s.length - 1))))];
};

const fileArg = process.argv.indexOf("--file");
const raw = fileArg > 0 ? readFileSync(process.argv[fileArg + 1], "utf8") : await (await fetch(URL_)).text();
const data = JSON.parse(raw);
const entries = Object.entries(data).filter(([, v]) => Array.isArray(v[1]) && v[1].length === 2);

const out = [];
for (const g of GROUPS) {
  const inGroup = entries.filter(([, v]) => g.match(v[0].split(",").map((s) => s.trim())));
  const xs = inGroup.map(([, v]) => v[1][0]);
  const ys = inGroup.map(([, v]) => v[1][1]);
  const [x0, x1, y0, y1] = [pct(xs, 0.05), pct(xs, 0.95), pct(ys, 0.05), pct(ys, 0.95)];
  const [cx, cy, bw, bh] = g.box;
  const sx = bw / Math.max(1, x1 - x0);
  const sy = bh / Math.max(1, y1 - y0);
  const place = ([x, y]) => {
    const kx = g.uniform ? Math.min(sx, sy) : sx;
    const ky = g.uniform ? Math.min(sx, sy) : sy;
    const px = cx + (x - (x0 + x1) / 2) * kx;
    const py = cy - (y - (y0 + y1) / 2) * ky; // GTADB y points north, ours points down
    return [Math.round(Math.min(cx + bw / 2, Math.max(cx - bw / 2, px)) * 10) / 10, Math.round(Math.min(cy + bh / 2, Math.max(cy - bh / 2, py)) * 10) / 10];
  };

  const seenNames = new Set();
  const byType = new Map();
  for (const [id, v] of inGroup) {
    const parts = v[0].split(",").map((s) => s.trim());
    const name = parts[0].replace(/\?$/, "").trim();
    const cats = v[6] ?? [];
    if (!name || name.startsWith("?") || name.length < 3 || GENERIC.test(name)) continue;
    if (cats.some((c) => SKIP_STATUS.has(c))) continue;
    const type = pickType(cats);
    if (!type || seenNames.has(name.toLowerCase())) continue;
    seenNames.add(name.toLowerCase());
    const area = parts.slice(1, -1).join(", ");
    const [x, y] = place(v[1]);
    const row = { id: `gtadb-${id}`, type, name, region: g.region, x, y, approximate: true, source: "gtadb", area, categories: cats.filter((c) => !/^(l\d|\/\/|#)/.test(c)) };
    byType.set(type, [...(byType.get(type) ?? []), row]);
  }
  // Round-robin across types so one category doesn't take the whole cap.
  const picked = [];
  const queues = [...byType.values()];
  while (picked.length < g.cap && queues.some((q) => q.length)) for (const q of queues) if (q.length && picked.length < g.cap) picked.push(q.shift());
  out.push(...picked);
}

// Places Rockstar has officially named stay labelled official in seed-pins.json: drop GTADB duplicates of those.
const seeds = JSON.parse(readFileSync(new URL("../src/lib/map/seed-pins.json", import.meta.url), "utf8"));
const officialNames = new Set(seeds.map((s) => s.name.toLowerCase()));
const final = out.filter((p) => !officialNames.has(p.name.toLowerCase()));

const LABEL = { shop: "Shop or restaurant", activity: "Leisure or event venue", property: "Residential building", landmark: "Landmark" };
const rows = final
  .sort((a, b) => a.id.localeCompare(b.id, "en", { numeric: true }))
  .map((p) => ({
    id: p.id,
    type: p.type,
    name: p.name,
    region: p.region,
    x: p.x,
    y: p.y,
    approximate: true,
    source: "gtadb",
    description: `${LABEL[p.type]}${p.area ? ` in ${p.area}` : ""}, from community research. Position is approximate (placed by district, not by exact coordinates). Source: GTADB.org landmark data, record ${p.id.replace("gtadb-", "")} (CC BY 4.0), map.gtadb.org.`,
  }));
writeFileSync(OUT, `${JSON.stringify(rows, null, 2)}\n`);
console.log(`Wrote ${rows.length} pins to src/lib/map/gtadb-pins.json (upstream ${REV.slice(0, 7)})`);
for (const g of GROUPS) console.log(`  ${g.key}: ${rows.filter((r) => r.region === g.region).length}`);
