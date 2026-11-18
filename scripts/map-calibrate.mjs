#!/usr/bin/env node
// Fits the pin-coordinate -> source-pixel calibration from two reference points, so existing
// pins line up on a new base map whose framing differs from the old one.
//
//   npm run map:calibrate -- "x1,y1=sx1,sy1" "x2,y2=sx2,sy2"
//
// x,y   = a pin's stored coordinates (shown in the map's ?coords=1 overlay as "pin")
// sx,sy = where that same place is on the NEW image, in source pixels (shown as "src")
// Pick two points far apart (e.g. a landmark in the NW and one in the SE).
// Writes the result into src/lib/map/base-map.json. Use --dry-run to only print it.

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const manifestPath = path.join(root, "src/lib/map/base-map.json");
const pairs = process.argv.slice(2).filter((a) => a.includes("="));
if (pairs.length !== 2) {
  console.error('Usage: npm run map:calibrate -- "x1,y1=sx1,sy1" "x2,y2=sx2,sy2" [--dry-run]');
  process.exit(1);
}
const parse = (s) => {
  const [l, r] = s.split("=");
  const [x, y] = l.split(",").map(Number);
  const [sx, sy] = r.split(",").map(Number);
  if ([x, y, sx, sy].some((n) => !Number.isFinite(n))) throw new Error(`Bad pair: ${s}`);
  return { x, y, sx, sy };
};
const [p, q] = pairs.map(parse);
if (p.x === q.x || p.y === q.y) throw new Error("The two points need different x AND different y values.");
const a = (q.sx - p.sx) / (q.x - p.x);
const b = p.sx - a * p.x;
const c = (q.sy - p.sy) / (q.y - p.y);
const d = p.sy - c * p.y;
const calibration = { a, b, c, d };
console.log("calibration:", calibration);
if (!process.argv.includes("--dry-run")) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  manifest.calibration = calibration;
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`Updated ${path.relative(root, manifestPath)}`);
}
