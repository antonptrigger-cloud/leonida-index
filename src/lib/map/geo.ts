import { TILES } from "./config";

/** Pin coordinates (COORD_SPACE) -> source-image pixels of the current base map. */
export function toSource(x: number, y: number): { sx: number; sy: number } {
  const { a, b, c, d } = TILES.calibration;
  return { sx: a * x + b, sy: c * y + d };
}

/** Source-image pixels -> pin coordinates. */
export function fromSource(sx: number, sy: number): { x: number; y: number } {
  const { a, b, c, d } = TILES.calibration;
  return { x: (sx - b) / a, y: (sy - d) / c };
}

/** True when a pin lands on the current base image. */
export function onBaseMap(x: number, y: number): boolean {
  const { sx, sy } = toSource(x, y);
  return sx >= 0 && sy >= 0 && sx <= TILES.width && sy <= TILES.height;
}
