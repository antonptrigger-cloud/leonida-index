import type { PinType, SubmitType } from "./config";

export type PinStatus = "pending" | "approved" | "rejected" | "merged" | "hidden";

export interface Pin {
  id: string;
  status: PinStatus;
  type: PinType;
  name: string;
  description: string;
  region: string | null;
  occupant: string | null;
  /** Image pixel coordinates: x from the left, y from the top. */
  x: number;
  y: number;
  gamerTag: string;
  isSeed: boolean;
  approximate: boolean;
  spoiler: boolean;
  upCount: number;
  downCount: number;
  needsReview: boolean;
  reviewReason: string | null;
  mergedInto: string | null;
  createdAt: string;
  reviewedAt: string | null;
}

/** What the public API returns for a live pin. */
export type PublicPin = Pick<
  Pin,
  | "id"
  | "type"
  | "name"
  | "description"
  | "region"
  | "occupant"
  | "x"
  | "y"
  | "gamerTag"
  | "isSeed"
  | "approximate"
  | "spoiler"
  | "upCount"
  | "downCount"
  | "createdAt"
>;

export interface SubmissionInput {
  type: SubmitType;
  name: string;
  description: string;
  region: string | null;
  occupant: string | null;
  gamerTag: string;
  spoiler: boolean;
  x: number;
  y: number;
}

export interface PinEdit {
  type?: PinType;
  name?: string;
  description?: string;
  region?: string | null;
  occupant?: string | null;
  spoiler?: boolean;
  approximate?: boolean;
  x?: number;
  y?: number;
}

export interface Comment {
  id: string;
  pinId: string;
  gamerTag: string;
  body: string;
  likeCount: number;
  createdAt: string;
}

export interface VoteResult {
  upCount: number;
  downCount: number;
  myVote: -1 | 0 | 1;
  needsReview: boolean;
}

export interface LeaderboardEntry {
  gamerTag: string;
  count: number;
}

export interface Leaderboard {
  approved: LeaderboardEntry[];
  firstMarked: LeaderboardEntry[];
}

export function toPublicPin(p: Pin): PublicPin {
  return {
    id: p.id,
    type: p.type,
    name: p.name,
    description: p.description,
    region: p.region,
    occupant: p.occupant,
    x: p.x,
    y: p.y,
    gamerTag: p.gamerTag,
    isSeed: p.isSeed,
    approximate: p.approximate,
    spoiler: p.spoiler,
    upCount: p.upCount,
    downCount: p.downCount,
    createdAt: p.createdAt,
  };
}
