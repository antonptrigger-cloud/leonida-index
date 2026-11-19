import legacyManifest from "./base-map.json";
import artManifest from "./base-art.json";
import artPositions from "./art-pin-positions.json";
import { artToPin, pinToArt } from "./pin-transform";
import type { TileManifest } from "./config";

/**
 * Swappable base maps. Every base is its own tile pyramid + manifest (scripts/map-tiles.mjs --id <id>)
 * plus a rule for turning stored pin coordinates into that base's source pixels.
 *
 * Stored pin coordinates never change: they live in the legacy 1168x784 "pin space" (see COORD_SPACE in
 * config.ts). A base only describes how to draw them. To add Rockstar's official map later: generate its
 * tiles, add an entry here with the control points for it, and set DEFAULT_BASE. Nothing in Supabase moves.
 */
export type BaseId = "art" | "legacy";
export const BASE_IDS: BaseId[] = ["art", "legacy"];
/** The base shown by default. `?base=legacy` switches to the old placeholder. */
export const DEFAULT_BASE: BaseId = "art";

export interface BaseMap {
  id: BaseId;
  label: string;
  tiles: TileManifest;
  attribution: string;
  /** True when the image has place names painted into it (region chips are then offset below them). */
  bakedLabels: boolean;
  pinToSource(pin: { id?: string; x: number; y: number }): { sx: number; sy: number };
  sourceToPin(sx: number, sy: number): { x: number; y: number };
}

const GTADB_CREDIT =
  'Some landmark data: <a href="https://map.gtadb.org" target="_blank" rel="noopener">GTADB.org</a> (<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>)';

const legacy: BaseMap = {
  id: "legacy",
  label: "Old placeholder map",
  tiles: legacyManifest as TileManifest,
  attribution: `Illustrative placeholder map (not the in-game geography) until Rockstar’s official map · ${GTADB_CREDIT}`,
  bakedLabels: true,
  pinToSource({ x, y }) {
    const { a, b, c, d } = legacyManifest.calibration;
    return { sx: a * x + b, sy: c * y + d };
  },
  sourceToPin(sx, sy) {
    const { a, b, c, d } = legacyManifest.calibration;
    return { x: (sx - b) / a, y: (sy - d) / c };
  },
};

const positions = artPositions as unknown as Record<string, [number, number]>;
const art: BaseMap = {
  id: "art",
  label: "Custom art",
  tiles: artManifest as TileManifest,
  attribution: `Illustrative AI-made map art, not the in-game geography · ${GTADB_CREDIT}`,
  bakedLabels: false,
  pinToSource({ id, x, y }) {
    const fixed = id ? positions[id] : undefined;
    if (fixed) return { sx: fixed[0], sy: fixed[1] };
    const [sx, sy] = pinToArt(x, y);
    return { sx, sy };
  },
  sourceToPin(sx, sy) {
    const [x, y] = artToPin(sx, sy);
    return { x, y };
  },
};

export const BASES: Record<BaseId, BaseMap> = { art, legacy };
export const isBaseId = (v: unknown): v is BaseId => v === "art" || v === "legacy";
