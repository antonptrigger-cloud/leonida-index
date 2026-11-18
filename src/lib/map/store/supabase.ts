import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Comment, Leaderboard, Pin, PinStatus, VoteResult } from "../types";
import type { MapStore, StoreResult } from "./types";

/**
 * Supabase adapter. Uses the service-role key, server-side only. RLS is on
 * for every table with no public policies, so the anon key can't read or
 * write anything directly: all access goes through Next.js route handlers.
 */

interface PinRow {
  id: string;
  status: PinStatus;
  type: Pin["type"];
  name: string;
  description: string;
  region: string | null;
  occupant: string | null;
  x: number;
  y: number;
  gamer_tag: string;
  is_seed: boolean;
  /** Missing until supabase/migrations/20261118000400_pin_types_and_source.sql is applied. */
  source?: "official" | "community" | "gtadb" | null;
  approximate: boolean;
  spoiler: boolean;
  up_count: number;
  down_count: number;
  needs_review: boolean;
  review_reason: string | null;
  merged_into: string | null;
  created_at: string;
  reviewed_at: string | null;
}

interface CommentRow {
  id: string;
  pin_id: string;
  gamer_tag: string;
  body: string;
  like_count: number;
  created_at: string;
}

const BASE_COLUMNS =
  "id,status,type,name,description,region,occupant,x,y,gamer_tag,is_seed,approximate,spoiler,up_count,down_count,needs_review,review_reason,merged_into,created_at,reviewed_at";

/** `source` only exists after the 20261118000400 migration; select it only when the column is there. */
const WITH_SOURCE_COLUMNS = `${BASE_COLUMNS},source`;
const isMissingSourceColumn = (message: string | undefined) => /\bsource\b/i.test(message ?? "") && /column|schema cache|does not exist/i.test(message ?? "");

function toPin(r: PinRow): Pin {
  return {
    id: r.id,
    status: r.status,
    type: r.type,
    name: r.name,
    description: r.description,
    region: r.region,
    occupant: r.occupant,
    x: Number(r.x),
    y: Number(r.y),
    gamerTag: r.gamer_tag,
    isSeed: r.is_seed,
    source: r.source === "official" || r.source === "community" || r.source === "gtadb" ? r.source : r.is_seed ? "official" : "community",
    approximate: r.approximate,
    spoiler: r.spoiler,
    upCount: r.up_count,
    downCount: r.down_count,
    needsReview: r.needs_review,
    reviewReason: r.review_reason,
    mergedInto: r.merged_into,
    createdAt: r.created_at,
    reviewedAt: r.reviewed_at,
  };
}

function toComment(r: CommentRow): Comment {
  return { id: r.id, pinId: r.pin_id, gamerTag: r.gamer_tag, body: r.body, likeCount: r.like_count, createdAt: r.created_at };
}

const PATCH_COLUMNS: Partial<Record<keyof Pin, keyof PinRow>> = {
  status: "status",
  type: "type",
  name: "name",
  description: "description",
  region: "region",
  occupant: "occupant",
  x: "x",
  y: "y",
  approximate: "approximate",
  spoiler: "spoiler",
  needsReview: "needs_review",
  reviewReason: "review_reason",
  mergedInto: "merged_into",
  reviewedAt: "reviewed_at",
};

/** Maps a Postgres `raise exception 'CODE:detail'` from our RPCs to a store error. */
function rpcError<T>(message: string | undefined): StoreResult<T> {
  const m = message ?? "";
  if (m.includes("RATE_LIMITED")) {
    const minutes = Number(m.split("RATE_LIMITED:")[1]);
    return { ok: false, error: "rate_limited", retryAfterMinutes: Number.isFinite(minutes) ? minutes : undefined };
  }
  if (m.includes("NOT_FOUND")) return { ok: false, error: "not_found" };
  if (m.includes("INVALID")) return { ok: false, error: "invalid" };
  throw new Error(`Supabase error: ${m}`);
}

export function createSupabaseStore(url: string, serviceRoleKey: string): MapStore {
  const sb: SupabaseClient = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // null = not probed yet; false = the column is missing (migration not applied), so stop asking for it.
  let hasSource: boolean | null = null;
  const columns = () => (hasSource === false ? BASE_COLUMNS : WITH_SOURCE_COLUMNS);
  /** Runs a pins query, retrying once without `source` when the migration hasn't been applied yet. */
  async function withColumns<T>(run: (cols: string) => PromiseLike<{ data: T | null; error: { message: string } | null }>): Promise<T | null> {
    let res = await run(columns());
    if (res.error && hasSource !== false && isMissingSourceColumn(res.error.message)) {
      hasSource = false;
      res = await run(BASE_COLUMNS);
    } else if (!res.error && hasSource === null) {
      hasSource = true;
    }
    if (res.error) throw new Error(res.error.message);
    return res.data;
  }

  return {
    kind: "supabase",

    async listPins(statuses) {
      const data = await withColumns((cols) => sb.from("pins").select(cols).in("status", statuses).order("created_at").limit(5000));
      return ((data ?? []) as unknown as PinRow[]).map(toPin);
    },

    async getPin(id) {
      const data = await withColumns((cols) => sb.from("pins").select(cols).eq("id", id).maybeSingle());
      return data ? toPin(data as unknown as PinRow) : null;
    },

    async createSubmission(input, ipHash, windowMinutes) {
      const { data, error } = await sb.rpc("submit_location", {
        p_type: input.type,
        p_name: input.name,
        p_description: input.description,
        p_region: input.region,
        p_occupant: input.occupant,
        p_x: input.x,
        p_y: input.y,
        p_gamer_tag: input.gamerTag,
        p_spoiler: input.spoiler,
        p_ip_hash: ipHash,
        p_window_minutes: windowMinutes,
      });
      if (error) return rpcError(error.message);
      return { ok: true, value: toPin(data as PinRow) };
    },

    async updatePin(id, patch) {
      const row: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(patch)) {
        const col = PATCH_COLUMNS[k as keyof Pin];
        if (col) row[col] = v;
      }
      const data = await withColumns((cols) => sb.from("pins").update(row).eq("id", id).select(cols).maybeSingle());
      return data ? toPin(data as unknown as PinRow) : null;
    },

    async vote(pinId, voterId, value, ipHash, limit, flag) {
      const { data, error } = await sb.rpc("cast_vote", {
        p_pin_id: pinId,
        p_voter_id: voterId,
        p_value: value,
        p_ip_hash: ipHash,
        p_ip_max: limit.max,
        p_ip_window_minutes: limit.windowMinutes,
        p_flag_min_down: flag.minDown,
        p_flag_ratio: flag.ratio,
      });
      if (error) return rpcError(error.message);
      return { ok: true, value: data as VoteResult };
    },

    async listComments(pinId) {
      const { data, error } = await sb
        .from("comments")
        .select("id,pin_id,gamer_tag,body,like_count,created_at")
        .eq("pin_id", pinId)
        .eq("hidden", false)
        .order("created_at")
        .limit(200);
      if (error) throw new Error(error.message);
      return (data as CommentRow[]).map(toComment);
    },

    async addComment(pinId, gamerTag, body, ipHash, limit) {
      const { data, error } = await sb.rpc("add_comment", {
        p_pin_id: pinId,
        p_gamer_tag: gamerTag,
        p_body: body,
        p_ip_hash: ipHash,
        p_ip_max: limit.max,
        p_ip_window_minutes: limit.windowMinutes,
      });
      if (error) return rpcError(error.message);
      return { ok: true, value: toComment(data as CommentRow) };
    },

    async toggleCommentLike(commentId, voterId, ipHash, limit) {
      const { data, error } = await sb.rpc("toggle_comment_like", {
        p_comment_id: commentId,
        p_voter_id: voterId,
        p_ip_hash: ipHash,
        p_ip_max: limit.max,
        p_ip_window_minutes: limit.windowMinutes,
      });
      if (error) return rpcError(error.message);
      return { ok: true, value: data as { likeCount: number; liked: boolean } };
    },

    async leaderboard(limit) {
      const { data, error } = await sb.rpc("map_leaderboard", { p_limit: limit });
      if (error) throw new Error(error.message);
      return data as Leaderboard;
    },
  };
}
