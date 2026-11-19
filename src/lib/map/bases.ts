import legacyManifest from "./base-map.json";
import artManifest from "./base-art.json";
import artPositions from "./art-pin-positions.json";
import officialManifest from "./base-official.json";
import officialPositions from "./official-pin-positions.json";
import { officialToPin, pinToOfficial } from "./official-transform";
import { artToPin, pinToArt } from "./pin-transform";
import type { TileManifest } from "./config";

/**
 * Swappable base maps. Every base is its own tile pyramid + manifest (scripts/map-tiles.mjs --id <id>)
 * plus a rule for turning stored pin coordinates into that base's source pixels.
 *
 * Stored pin coordinates never change: they live in the legacy 1168x784 "pin space" (see COORD_SPACE in
 * config.ts). A base only describes how to draw them. The official Rockstar map is the default base (scripts/official/,
 * docs/OFFICIAL_MAP.md); a future replacement is added the same way. Nothing in Supabase moves.
 */
export type BaseId = "official" | "art" | "legacy";
export const BASE_IDS: BaseId[] = ["official", "art", "legacy"];
/** The base shown by default: Rockstar's official map. `?base=art` shows the custom art, `?base=legacy` the old placeholder. */
export const DEFAULT_BASE: BaseId = "official";

export interface BaseMap {
  id: BaseId;
  label: string;
  tiles: TileManifest;
  attribution: string;
  /** Small chip on the map that explains the base is a stand-in (see BaseNote in LeafletMap.tsx). */
  note: { chip: string; title: string; body: string };
  /** True when the image has place names painted into it (region chips are then offset below them). */
  bakedLabels: boolean;
  /** Optional box (source pixels) around the land and region labels. Narrow screens start framed on it instead of the whole image. */
  startBox?: { x0: number; y0: number; x1: number; y1: number };
  pinToSource(pin: { id?: string; x: number; y: number }): { sx: number; sy: number };
  sourceToPin(sx: number, sy: number): { x: number; y: number };
}

const GTADB_CREDIT =
  'Some landmark data: <a href="https://map.gtadb.org" target="_blank" rel="noopener">GTADB.org</a> (<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>)';

const legacy: BaseMap = {
  id: "legacy",
  label: "Old placeholder map",
  tiles: legacyManifest as TileManifest,
  attribution: `Illustrative placeholder map (not the in-game geography) · ${GTADB_CREDIT}`,
  note: {
    chip: "Placeholder map",
    title: "Old placeholder map",
    body: "This is the original placeholder illustration, not the in-game geography. Pin positions are approximate. Rockstar’s official map is now the default base.",
  },
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

/**
 * Soft zoom cap for the art base. Its real detail ends around z4 (z5 inside Vice City); z6 shows one source pixel per screen pixel
 * and anything above is the same pixels enlarged. We allow half a level past z6 (enough for the z6+ pin names to fit), not the
 * generic extra full level, so nobody zooms into mush. The tile pyramid itself is unchanged.
 */
export const ART_MAX_ZOOM = 6.5;

const positions = artPositions as unknown as Record<string, [number, number]>;
const art: BaseMap = {
  id: "art",
  label: "Custom art",
  tiles: { ...(artManifest as TileManifest), maxZoom: Math.min((artManifest as TileManifest).maxZoom, ART_MAX_ZOOM) },
  attribution: `Illustrative AI-made map art, not the in-game geography · ${GTADB_CREDIT}`,
  note: {
    chip: "Illustrative base map",
    title: "Illustrative base map",
    body: "This map picture is a stand-in illustration, not the in-game geography, so streets, coastlines and distances are only loosely right and fine detail is soft. Pins and labels are placed by district and marked approximate. It will be replaced by Rockstar’s official map when that is published.",
  },
  bakedLabels: false,
  // Land mask extent (x 64..1084, y 76..1541 of the 1200x1648 art) plus room for the region chips, x6 composite scale.
  startBox: { x0: 20 * 6, y0: 40 * 6, x1: 1140 * 6, y1: 1580 * 6 },
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

const officialFixed = officialPositions as unknown as Record<string, [number, number]>;
const official: BaseMap = {
  id: "official",
  label: "Official map (Rockstar)",
  tiles: officialManifest as TileManifest,
  attribution: `Map © Rockstar Games (<a href="https://www.rockstargames.com/VI/downloads" target="_blank" rel="noopener">Leonida Map &amp; Cover Art Poster</a>) · ${GTADB_CREDIT}`,
  note: {
    chip: "Official Rockstar map",
    title: "Official Rockstar map",
    body: "This is Rockstar’s official Leonida map poster (Map © Rockstar Games). Names printed on it are exact. Pins for places the poster does not print are placed by district and marked approximate, and the pins of places it does print sit at the printed label.",
  },
  // The poster has its own place names printed in, so region chips hang below them and our labels only fill in where the print is too small to read.
  bakedLabels: true,
  // Land and islands (without the legend, seal and title in the sea), official source pixels.
  startBox: { x0: 380, y0: 420, x1: 5120, y1: 7080 },
  pinToSource({ id, x, y }) {
    const fixed = id ? officialFixed[id] : undefined;
    if (fixed) return { sx: fixed[0], sy: fixed[1] };
    const [sx, sy] = pinToOfficial(x, y);
    return { sx, sy };
  },
  sourceToPin(sx, sy) {
    const [x, y] = officialToPin(sx, sy);
    return { x, y };
  },
};

export const BASES: Record<BaseId, BaseMap> = { official, art, legacy };
export const isBaseId = (v: unknown): v is BaseId => v === "official" || v === "art" || v === "legacy";
