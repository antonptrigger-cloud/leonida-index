import gtadbData from "./gtadb-pins.json";
import seedData from "./seed-pins.json";
import { SEED_AUTHOR, type PinSource, type PinType } from "./config";
import type { Pin } from "./types";

interface SeedRow {
  id: string;
  type: PinType;
  name: string;
  region: string | null;
  x: number;
  y: number;
  approximate: boolean;
  description: string;
  /** Defaults to "official": every seed pin is a place Rockstar itself has named. */
  source?: PinSource;
}

const SEED_CREATED_AT = "2026-11-18T00:00:00.000Z";

/** Official pins (named by Rockstar) plus the GTADB-imported landmarks. Shown even when the database is offline. */
export const SEED_PINS: Pin[] = [...(seedData as SeedRow[]), ...(gtadbData as SeedRow[])].map((s) => ({
  id: s.id,
  status: "approved",
  type: s.type,
  name: s.name,
  description: s.description,
  region: s.region,
  occupant: null,
  x: s.x,
  y: s.y,
  gamerTag: SEED_AUTHOR,
  isSeed: true,
  source: s.source ?? "official",
  approximate: s.approximate,
  spoiler: false,
  upCount: 0,
  downCount: 0,
  needsReview: false,
  reviewReason: null,
  mergedInto: null,
  createdAt: SEED_CREATED_AT,
  reviewedAt: SEED_CREATED_AT,
}));
