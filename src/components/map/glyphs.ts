import type { PinCategory } from "@/lib/map/categories";
import { PIN_TYPES, type PinSource, type PinType } from "@/lib/map/config";

/**
 * Our own glyphs (24x24 grid), drawn for this site. No third-party icon sets.
 * `fill` glyphs are solid shapes, `stroke` glyphs are outlines.
 */
const GLYPHS: Record<string, { d: string; mode: "fill" | "stroke" }> = {
  landmark: { d: "M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z", mode: "fill" },
  shop: { d: "M5.5 8.5h13l-1 11.5h-11zM9 8.5V7a3 3 0 016 0v1.5", mode: "stroke" },
  property: { d: "M3.5 11.5L12 4l8.5 7.5V20h-5.5v-5.5h-6V20H3.5z", mode: "fill" },
  activity: { d: "M13.5 2.5L5 13.5h5.8L9.8 21.5 19 10h-6z", mode: "fill" },
  secret: { d: "M12 3.5a4.5 4.5 0 00-2 8.5L8.8 20.5h6.4L14 12a4.5 4.5 0 00-2-8.5z", mode: "fill" },
  collectible: { d: "M12 3l7.5 6.2L12 21 4.5 9.2z", mode: "fill" },
  quest: { d: "M10.4 3h3.2l-.7 10h-1.8zM12 15.6a1.9 1.9 0 110 3.8 1.9 1.9 0 010-3.8z", mode: "fill" },
  other: { d: "M12 7a5 5 0 100 10 5 5 0 000-10z", mode: "fill" },
  region: { d: "M12 3l9 9-9 9-9-9z", mode: "fill" },
};

/** Vendor / service category glyphs (outlines on the same 24x24 grid). */
const CATEGORY_GLYPHS: Record<PinCategory, string> = {
  gas: "M6 20V6a2 2 0 012-2h5a2 2 0 012 2v14M5 20h10M8.5 7.5h4v4h-4zM15 9h2.2a1.8 1.8 0 011.8 1.8V16a1.5 1.5 0 003 0V9l-2.5-2.5",
  convenience: "M3.5 9.5h17l-1.8 9.5H5.3zM8 9.5l3-5M16 9.5l-3-5",
  clothing: "M8.5 4L3.5 7l2 4 2.5-1.2V20h8V9.8l2.5 1.2 2-4-5-3a3.5 3.5 0 01-7 0z",
  weapons: "M12 5a7 7 0 100 14 7 7 0 000-14zM12 2v5M12 17v5M2 12h5M17 12h5",
  "barber-tattoo": "M6 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM6 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM8 6.8l12 10.4M8 17.2L20 6.8",
  vehicles: "M4 15.5V12l2-4.5h12L20 12v3.5M3 15.5h18V18H3zM7 18v1.5M17 18v1.5M5.5 12h13",
  market: "M3.5 9L5 4.5h14L20.5 9M3.5 9a2.8 2.8 0 005.5 0 2.8 2.8 0 005.5 0 2.8 2.8 0 005.5 0M5 11.5V20h14v-8.5",
  bank: "M12 3a9 9 0 100 18 9 9 0 000-18zM14.8 9.2c-.6-.8-1.6-1.2-2.8-1.2-1.6 0-2.8.8-2.8 2 0 3 5.8 1.6 5.8 4.2 0 1.2-1.2 2-2.9 2-1.2 0-2.3-.5-3-1.4M12 6.5V8M12 16v1.5",
  services: "M12 3l7.5 3v5.5c0 4.5-3.1 8-7.5 9.5-4.4-1.5-7.5-5-7.5-9.5V6zM12 8.5v6M9 11.5h6",
  "bar-club": "M4 4.5h16L12 13zM12 13v7M8 20h8",
  transport: "M5.5 4h13A1.5 1.5 0 0120 5.5V17H4V5.5A1.5 1.5 0 015.5 4zM4 11h16M7 17v2.5M17 17v2.5M7.5 14h.01M16.5 14h.01",
  safehouse: "M8 16a4 4 0 110-8 4 4 0 010 8zM11.5 12H21M17.5 12v3M21 12v2.5",
};

export function categoryGlyphSvg(category: PinCategory, color = "currentColor", size = 14): string {
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" focusable="false"><path d="${CATEGORY_GLYPHS[category]}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

export function glyphSvg(type: PinType, color = "currentColor", size = 14): string {
  const g = GLYPHS[PIN_TYPES[type]?.glyph ?? "other"] ?? GLYPHS.other;
  const paint =
    g.mode === "fill"
      ? `fill="${color}"`
      : `fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"`;
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" focusable="false"><path d="${g.d}" ${paint}/></svg>`;
}

const DROP = "M16 41C16 41 3.5 26.5 3.5 15.5a12.5 12.5 0 0125 0C28.5 26.5 16 41 16 41z";

/**
 * Teardrop map marker with the type glyph inside. Static markup only: colours come from config and
 * user text never goes into the HTML.
 *  - solid light outline = confirmed position; dashed outline + softer fill = approximate position
 *  - small turquoise tick = officially named by Rockstar
 *  - the glyph is the vendor category's when the pin has one
 */
export function markerHtml(type: PinType, opts: { approximate: boolean; source: PinSource; category?: PinCategory | null }): string {
  const color = PIN_TYPES[type]?.color ?? "#ffd36b";
  const outline = opts.approximate
    ? `stroke="#f5f3f7" stroke-width="1.8" stroke-dasharray="3.2 2.4" fill-opacity="0.82"`
    : `stroke="#f5f3f7" stroke-width="2"`;
  const badge =
    opts.source === "official"
      ? `<circle cx="26" cy="6.5" r="5.5" fill="#00e5cc" stroke="#0a0a0b" stroke-width="1.6"/><path d="M23.4 6.6l2 2 3.3-3.8" fill="none" stroke="#0a0a0b" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`
      : "";
  // A category glyph replaces the type glyph inside the same teardrop (the colour still says which type it is).
  const inner = opts.category ? categoryGlyphSvg(opts.category, "#0a0a0b", 14) : glyphSvg(type, "#0a0a0b", 14);
  const g = inner.replace("<svg ", '<svg x="9" y="8.5" ');
  return `<svg viewBox="0 0 32 42" width="32" height="42" aria-hidden="true" focusable="false"><path d="${DROP}" fill="${color}" ${outline}/>${g}${badge}</svg>`;
}
