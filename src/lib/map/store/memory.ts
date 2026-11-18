import { randomUUID } from "node:crypto";
import { SEED_PINS } from "../seed";
import type { Comment, Leaderboard, LeaderboardEntry, Pin, PinStatus } from "../types";
import type { MapStore } from "./types";

/**
 * Dev-only in-memory adapter. Data lives in the Node process and resets on
 * restart. Never used in production builds (see store/index.ts).
 */
interface MemoryDb {
  pins: Map<string, Pin>;
  votes: Map<string, { value: -1 | 1; ipHash: string; at: number }>; // key pinId|voterId
  comments: Map<string, Comment & { ipHash: string }>;
  likes: Map<string, { ipHash: string; at: number }>; // key commentId|voterId
}

const g = globalThis as unknown as { __lvgMapMemoryDb?: MemoryDb };

function db(): MemoryDb {
  if (!g.__lvgMapMemoryDb) {
    g.__lvgMapMemoryDb = {
      pins: new Map(SEED_PINS.map((p) => [p.id, { ...p }])),
      votes: new Map(),
      comments: new Map(),
      likes: new Map(),
    };
  }
  return g.__lvgMapMemoryDb;
}

const minutesAgo = (m: number) => Date.now() - m * 60_000;

function rankBy(pins: Pin[]): LeaderboardEntry[] {
  const counts = new Map<string, LeaderboardEntry>();
  for (const p of pins) {
    const key = p.gamerTag.toLowerCase();
    const e = counts.get(key) ?? { gamerTag: p.gamerTag, count: 0 };
    e.count += 1;
    counts.set(key, e);
  }
  return [...counts.values()].sort((a, b) => b.count - a.count || a.gamerTag.localeCompare(b.gamerTag));
}

export const memoryStore: MapStore = {
  kind: "memory",

  async listPins(statuses: PinStatus[]) {
    return [...db().pins.values()].filter((p) => statuses.includes(p.status)).map((p) => ({ ...p }));
  },

  async getPin(id) {
    const p = db().pins.get(id);
    return p ? { ...p } : null;
  },

  async createSubmission(input, ipHash, windowMinutes) {
    const tag = input.gamerTag.toLowerCase();
    const recent = [...db().pins.values()]
      .filter((p) => !p.isSeed && p.gamerTag.toLowerCase() === tag && Date.parse(p.createdAt) > minutesAgo(windowMinutes))
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    if (recent.length) {
      const retry = Math.ceil((Date.parse(recent[0].createdAt) + windowMinutes * 60_000 - Date.now()) / 60_000);
      return { ok: false, error: "rate_limited", retryAfterMinutes: Math.max(1, retry) };
    }
    void ipHash;
    const pin: Pin = {
      id: randomUUID(),
      status: "pending",
      ...input,
      isSeed: false,
      approximate: false,
      upCount: 0,
      downCount: 0,
      needsReview: false,
      reviewReason: null,
      mergedInto: null,
      createdAt: new Date().toISOString(),
      reviewedAt: null,
    };
    db().pins.set(pin.id, pin);
    return { ok: true, value: { ...pin } };
  },

  async updatePin(id, patch) {
    const p = db().pins.get(id);
    if (!p) return null;
    const next = { ...p, ...patch, id: p.id };
    db().pins.set(id, next);
    return { ...next };
  },

  async vote(pinId, voterId, value, ipHash, limit, flag) {
    const d = db();
    const pin = d.pins.get(pinId);
    if (!pin || pin.status !== "approved") return { ok: false, error: "not_found" };
    const recentByIp = [...d.votes.values()].filter((v) => v.ipHash === ipHash && v.at > minutesAgo(limit.windowMinutes)).length;
    if (recentByIp >= limit.max) return { ok: false, error: "rate_limited" };
    const key = `${pinId}|${voterId}`;
    if (value === 0) d.votes.delete(key);
    else d.votes.set(key, { value, ipHash, at: Date.now() });
    let up = 0;
    let down = 0;
    for (const [k, v] of d.votes) {
      if (!k.startsWith(`${pinId}|`)) continue;
      if (v.value === 1) up++;
      else down++;
    }
    const trips = down >= flag.minDown && down >= flag.ratio * up;
    pin.upCount = up;
    pin.downCount = down;
    if (trips && !pin.needsReview) {
      pin.needsReview = true;
      pin.reviewReason = "Community downvotes";
    }
    return { ok: true, value: { upCount: up, downCount: down, myVote: value, needsReview: pin.needsReview } };
  },

  async listComments(pinId) {
    return [...db().comments.values()]
      .filter((c) => c.pinId === pinId)
      .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
      .map(({ ipHash: _ip, ...c }) => {
        void _ip;
        return c;
      });
  },

  async addComment(pinId, gamerTag, body, ipHash, limit) {
    const d = db();
    const pin = d.pins.get(pinId);
    if (!pin || pin.status !== "approved") return { ok: false, error: "not_found" };
    const recent = [...d.comments.values()].filter((c) => c.ipHash === ipHash && Date.parse(c.createdAt) > minutesAgo(limit.windowMinutes));
    if (recent.length >= limit.max) return { ok: false, error: "rate_limited" };
    const c = { id: randomUUID(), pinId, gamerTag, body, likeCount: 0, createdAt: new Date().toISOString(), ipHash };
    d.comments.set(c.id, c);
    const { ipHash: _ip, ...pub } = c;
    void _ip;
    return { ok: true, value: pub };
  },

  async toggleCommentLike(commentId, voterId, ipHash, limit) {
    const d = db();
    const c = d.comments.get(commentId);
    if (!c) return { ok: false, error: "not_found" };
    const recent = [...d.likes.values()].filter((l) => l.ipHash === ipHash && l.at > minutesAgo(limit.windowMinutes)).length;
    if (recent >= limit.max) return { ok: false, error: "rate_limited" };
    const key = `${commentId}|${voterId}`;
    let liked: boolean;
    if (d.likes.has(key)) {
      d.likes.delete(key);
      liked = false;
    } else {
      d.likes.set(key, { ipHash, at: Date.now() });
      liked = true;
    }
    c.likeCount = [...d.likes.keys()].filter((k) => k.startsWith(`${commentId}|`)).length;
    return { ok: true, value: { likeCount: c.likeCount, liked } };
  },

  async leaderboard(limit): Promise<Leaderboard> {
    const pins = [...db().pins.values()].filter((p) => !p.isSeed);
    return {
      approved: rankBy(pins.filter((p) => p.status === "approved" || p.status === "merged")).slice(0, limit),
      firstMarked: rankBy(pins.filter((p) => p.status === "approved")).slice(0, limit),
    };
  },
};
