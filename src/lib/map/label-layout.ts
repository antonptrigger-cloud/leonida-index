/** Screen-space collision helpers for map labels (pure, unit-testable). */
export interface Rect {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

/** Rough text width in px for the map label fonts (display face is narrow; body face is wider). */
export function textWidth(text: string, fontPx: number, opts: { spacingEm?: number; display?: boolean } = {}): number {
  const { spacingEm = 0, display = false } = opts;
  const glyph = display ? 0.5 : 0.56;
  return Math.ceil(text.length * fontPx * (glyph + spacingEm));
}

export const overlaps = (a: Rect, b: Rect, pad = 0) => a.x0 < b.x1 + pad && a.x1 > b.x0 - pad && a.y0 < b.y1 + pad && a.y1 > b.y0 - pad;

/** A set of taken screen rectangles. `tryPlace` adds the rectangle only when it is free. */
export class Occupancy {
  private rects: Rect[] = [];
  reserve(r: Rect) {
    this.rects.push(r);
  }
  isFree(r: Rect, pad = 2) {
    return !this.rects.some((o) => overlaps(r, o, pad));
  }
  tryPlace(r: Rect, pad = 2) {
    if (!this.isFree(r, pad)) return false;
    this.rects.push(r);
    return true;
  }
}
