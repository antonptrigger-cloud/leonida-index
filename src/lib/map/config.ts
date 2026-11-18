/**
 * Community map configuration. Everything you might want to tweak lives here.
 */

/**
 * Base map image. To swap the map later (e.g. for Rockstar's official
 * printable map or your own survey), drop a new image in /public/map and
 * update url/width/height below. Pin coordinates are stored in image pixels
 * (x from the left, y from the top), so if the new image has a different
 * size or layout you will need to re-place pins.
 */
export const BASE_MAP = {
  url: "/map/leonida-base.jpg",
  width: 1168,
  height: 784,
  attribution: "Illustrative fan map of Leonida (not the in-game geography)",
} as const;

/**
 * Approximate real-world width the base image represents, in kilometres.
 * Used to turn pixel distances into metres for the duplicate check.
 * The current image is an illustration, so this is a rough guess: adjust it
 * once a real, to-scale map is in place.
 */
export const MAP_WIDTH_KM = 12;
export const METRES_PER_PIXEL = (MAP_WIDTH_KM * 1000) / BASE_MAP.width;

/** A pending pin is flagged as a possible duplicate when it is within this
 * many metres of another pin AND its name is at least this similar (0..1). */
export const DUPLICATE_RADIUS_M = 50;
export const DUPLICATE_NAME_SIMILARITY = 0.6;

/** Community flag rule: re-review when downvotes >= MIN and downvotes >= RATIO x upvotes. */
export const FLAG_MIN_DOWNVOTES = 5;
export const FLAG_DOWN_UP_RATIO = 4;

/** Submission rate limit: one submission per gamer tag per window. */
export const SUBMISSION_WINDOW_MINUTES = 60;

/** Light per-IP limits (hashed IPs only, never stored raw). */
export const VOTE_IP_LIMIT = { max: 60, windowMinutes: 10 };
export const COMMENT_IP_LIMIT = { max: 10, windowMinutes: 10 };

export const LIMITS = {
  nameMin: 3,
  nameMax: 80,
  descriptionMin: 20,
  descriptionMax: 1000,
  occupantMax: 160,
  gamerTagMin: 2,
  gamerTagMax: 32,
  commentMax: 280,
} as const;

export const SEED_AUTHOR = "Leonida Vice Guide";

export const SUBMIT_TYPES = ["landmark", "secret", "collectible", "quest", "other"] as const;
export type SubmitType = (typeof SUBMIT_TYPES)[number];
export type PinType = SubmitType | "region";

export const PIN_TYPES: Record<PinType, { label: string; color: string }> = {
  region: { label: "Regions", color: "#ff2d7b" },
  landmark: { label: "Landmarks", color: "#4c9be8" },
  secret: { label: "Secrets", color: "#a663cc" },
  collectible: { label: "Collectibles", color: "#ff8c42" },
  quest: { label: "Quests", color: "#3bb273" },
  other: { label: "Other", color: "#ffd36b" },
};

export const REGIONS = [
  "Vice City",
  "Leonida Keys",
  "Grassrivers",
  "Port Gellhorn",
  "Ambrosia",
  "Mount Kalaga",
] as const;
