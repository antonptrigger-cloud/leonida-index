#!/usr/bin/env node
// Builds a deep-zoom tile pyramid for the community map from one big image.
//
//   npm run map:tiles -- path/to/source.png [--id legacy|art|official] [--background "#04182f"] [--quality 82] [--keep-calibration]
//
// Output for --id legacy (default, the original placeholder map):
//   public/map/tiles/{z}/{x}/{y}.webp   256px tiles, z = 0 .. maxNativeZoom
//   public/map/base-preview.webp        downscaled copy (admin mini maps)
//   src/lib/map/base-map.json           manifest the map reads (sizes, zooms, URL template, calibration)
// Output for --id art (the owner's custom art, see docs/CUSTOM_MAP_ART.md):
//   public/map/art/{z}/{x}/{y}.webp, public/map/art-preview.webp, src/lib/map/base-art.json
// Output for --id official (Rockstar's official map poster, see docs/OFFICIAL_MAP.md):
//   public/map/official/{z}/{x}/{y}.webp, public/map/official-preview.webp, src/lib/map/base-official.json
// Each base is a separate pyramid + manifest, so bases can be added, swapped or removed independently (src/lib/map/bases.ts).
//
// maxNativeZoom is the level where the image is shown at 1 source pixel per screen pixel.
// The map allows MAX_OVERZOOM extra levels above that, then caps zoom so it never goes mushy.
//
// Pins are stored in a fixed coordinate space (COORD_SPACE in src/lib/map/config.ts, 1168x784).
// "calibration" maps those coordinates to source pixels: srcX = a*x + b, srcY = c*y + d.
// By default it's a plain scale (assumes the new image has the same framing as the old one).
// If the framing differs, run `npm run map:calibrate` afterwards (see docs/COMMUNITY_MAP.md).

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const TILE = 256;
const MAX_OVERZOOM = 1;
const COORD_SPACE = { width: 1168, height: 784 }; // keep in sync with src/lib/map/config.ts

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};
const flag = (name) => args.includes(`--${name}`);
const VALUE_OPTS = ["--background", "--quality", "--id"];
const source = args.find((a, i) => !a.startsWith("--") && !(i > 0 && VALUE_OPTS.includes(args[i - 1])));
if (!source || !existsSync(source)) {
  console.error("Usage: npm run map:tiles -- path/to/source.png [--background \"#04182f\"] [--quality 82] [--keep-calibration]");
  process.exit(1);
}
const baseId = opt("id", "legacy");
const LAYOUT = {
  legacy: { dir: "public/map/tiles", url: "/map/tiles", preview: "public/map/base-preview.webp", previewUrl: "/map/base-preview.webp", manifest: "src/lib/map/base-map.json" },
  art: { dir: "public/map/art", url: "/map/art", preview: "public/map/art-preview.webp", previewUrl: "/map/art-preview.webp", manifest: "src/lib/map/base-art.json" },
  official: { dir: "public/map/official", url: "/map/official", preview: "public/map/official-preview.webp", previewUrl: "/map/official-preview.webp", manifest: "src/lib/map/base-official.json" },
}[baseId];
if (!LAYOUT) {
  console.error(`Unknown --id ${baseId} (legacy | art | official). Add a layout entry here and in src/lib/map/bases.ts for new bases.`);
  process.exit(1);
}
const background = opt("background", "#04182f");
const quality = Number(opt("quality", "82"));

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const outDir = path.join(root, LAYOUT.dir);
const manifestPath = path.join(root, LAYOUT.manifest);

sharp.cache(false);
const input = readFileSync(source);
const meta = await sharp(input, { limitInputPixels: false }).metadata();
const srcW = meta.width;
const srcH = meta.height;
if (!srcW || !srcH) throw new Error("Could not read image size");

const maxNativeZoom = Math.max(0, Math.ceil(Math.log2(Math.max(srcW, srcH) / TILE)));
const version = createHash("sha1").update(input).digest("hex").slice(0, 10);

console.log(`Source ${srcW}x${srcH} -> zoom 0..${maxNativeZoom} (+${MAX_OVERZOOM} overzoom)`);
rmSync(outDir, { recursive: true, force: true });

let tiles = 0;
let bytes = 0;
for (let z = 0; z <= maxNativeZoom; z++) {
  const scale = 2 ** (z - maxNativeZoom);
  const w = Math.max(1, Math.round(srcW * scale));
  const h = Math.max(1, Math.round(srcH * scale));
  const level = await sharp(input, { limitInputPixels: false })
    .resize(w, h, { kernel: "lanczos3" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const cols = Math.ceil(w / TILE);
  const rows = Math.ceil(h / TILE);
  for (let x = 0; x < cols; x++) {
    mkdirSync(path.join(outDir, String(z), String(x)), { recursive: true });
    for (let y = 0; y < rows; y++) {
      const left = x * TILE;
      const top = y * TILE;
      const tw = Math.min(TILE, w - left);
      const th = Math.min(TILE, h - top);
      const buf = await sharp(level.data, { raw: level.info })
        .extract({ left, top, width: tw, height: th })
        .extend({ right: TILE - tw, bottom: TILE - th, background })
        .webp({ quality, effort: 5 })
        .toBuffer();
      writeFileSync(path.join(outDir, String(z), String(x), `${y}.webp`), buf);
      tiles++;
      bytes += buf.length;
    }
  }
  console.log(`  z${z}: ${w}x${h}, ${cols}x${rows} tiles`);
}

// Preview for admin mini maps (max 1600px on the long side).
const previewScale = Math.min(1, 1600 / Math.max(srcW, srcH));
const preview = await sharp(input, { limitInputPixels: false })
  .resize(Math.round(srcW * previewScale), Math.round(srcH * previewScale), { kernel: "lanczos3" })
  .webp({ quality: 80 })
  .toBuffer();
writeFileSync(path.join(root, LAYOUT.preview), preview);

let calibration = {
  a: srcW / COORD_SPACE.width,
  b: 0,
  c: srcH / COORD_SPACE.height,
  d: 0,
};
if (baseId === "art" || baseId === "official") {
  // The art base does not use a linear calibration: pins go through the control-point transform in
  // src/lib/map/pin-transform.ts (art) or official-transform.ts (official), which output source pixels directly.
  calibration = { a: 1, b: 0, c: 1, d: 0 };
} else if (flag("keep-calibration") && existsSync(manifestPath)) {
  calibration = JSON.parse(readFileSync(manifestPath, "utf8")).calibration ?? calibration;
}

const manifest = {
  source: path.basename(source),
  width: srcW,
  height: srcH,
  tileSize: TILE,
  minNativeZoom: 0,
  maxNativeZoom,
  maxZoom: maxNativeZoom + MAX_OVERZOOM,
  urlTemplate: `${LAYOUT.url}/{z}/{x}/{y}.webp?v=${version}`,
  preview: { url: `${LAYOUT.previewUrl}?v=${version}`, width: Math.round(srcW * previewScale), height: Math.round(srcH * previewScale) },
  background,
  calibration,
  generatedAt: new Date().toISOString(),
};
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Wrote ${tiles} tiles (${(bytes / 1024).toFixed(0)} KB) and ${path.relative(root, manifestPath)}`);
