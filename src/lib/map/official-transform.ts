import data from "./art-to-official.json";
import { artToPin, pinToArt } from "./pin-transform";

/**
 * Pin space (what Supabase stores) <-> pixels of the official Rockstar poster base.
 *
 *   pin --(pin-transform.ts)--> custom-art px --(affine, art-to-official.json)--> official px
 *
 * The affine map is fitted by scripts/official/build_official_transform.py from places printed on the poster and islands that
 * exist on both pictures; the report (RMS) is stored in art-to-official.json. Seed pins that the poster prints by name do not
 * use it: they have fixed positions (official-pin-positions.json) at the printed label. See docs/OFFICIAL_MAP.md.
 */
const [[a, b], [c, d], [e, f]] = data.matrix as [[number, number], [number, number], [number, number]];
const det = a * d - b * c;

/** Pin space -> official poster source pixels. */
export function pinToOfficial(x: number, y: number): [number, number] {
  const [ax, ay] = pinToArt(x, y);
  return [ax * a + ay * c + e, ax * b + ay * d + f];
}

/** Official poster source pixels -> pin space. */
export function officialToPin(sx: number, sy: number): [number, number] {
  const px = sx - e;
  const py = sy - f;
  const ax = (px * d - py * c) / det;
  const ay = (-px * b + py * a) / det;
  return artToPin(ax, ay);
}
