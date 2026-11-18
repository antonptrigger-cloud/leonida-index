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
 */
export function markerHtml(type: PinType, opts: { approximate: boolean; source: PinSource }): string {
  const color = PIN_TYPES[type]?.color ?? "#ffd36b";
  const outline = opts.approximate
    ? `stroke="#f5f3f7" stroke-width="1.8" stroke-dasharray="3.2 2.4" fill-opacity="0.82"`
    : `stroke="#f5f3f7" stroke-width="2"`;
  const badge =
    opts.source === "official"
      ? `<circle cx="26" cy="6.5" r="5.5" fill="#00e5cc" stroke="#0a0a0b" stroke-width="1.6"/><path d="M23.4 6.6l2 2 3.3-3.8" fill="none" stroke="#0a0a0b" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`
      : "";
  const g = glyphSvg(type, "#0a0a0b", 14).replace("<svg ", '<svg x="9" y="8.5" ');
  return `<svg viewBox="0 0 32 42" width="32" height="42" aria-hidden="true" focusable="false"><path d="${DROP}" fill="${color}" ${outline}/>${g}${badge}</svg>`;
}
