import { BASES, DEFAULT_BASE, type BaseId } from "./bases";
import { COORD_SPACE } from "./config";

/** Pin coordinates (COORD_SPACE) -> source-image pixels of a base map (default base unless given). */
export function toSource(x: number, y: number, base: BaseId = DEFAULT_BASE, id?: string): { sx: number; sy: number } {
  return BASES[base].pinToSource({ id, x, y });
}

/** Source-image pixels of a base map -> pin coordinates. */
export function fromSource(sx: number, sy: number, base: BaseId = DEFAULT_BASE): { x: number; y: number } {
  return BASES[base].sourceToPin(sx, sy);
}

/** True when a pin lies inside the canonical pin space. Both bases cover it fully (the art transform maps the frame corners to the art corners). */
export function onBaseMap(x: number, y: number): boolean {
  return Number.isFinite(x) && Number.isFinite(y) && x >= 0 && y >= 0 && x <= COORD_SPACE.width && y <= COORD_SPACE.height;
}
