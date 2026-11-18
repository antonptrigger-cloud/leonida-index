import type { Comment, Leaderboard, Pin, PinStatus, SubmissionInput, VoteResult } from "../types";

export type StoreResult<T> = { ok: true; value: T } | { ok: false; error: "rate_limited" | "not_found" | "invalid"; retryAfterMinutes?: number };

export interface IpLimit {
  max: number;
  windowMinutes: number;
}

/** One data interface, two adapters: Supabase (production) and in-memory (local dev/tests). */
export interface MapStore {
  readonly kind: "supabase" | "memory";
  listPins(statuses: PinStatus[]): Promise<Pin[]>;
  getPin(id: string): Promise<Pin | null>;
  /** Saves a pending pin. Enforces one submission per gamer tag (case-insensitive) per window. */
  createSubmission(input: SubmissionInput, ipHash: string, windowMinutes: number): Promise<StoreResult<Pin>>;
  updatePin(id: string, patch: Partial<Pin>): Promise<Pin | null>;
  /** value 1 / -1 sets the vote, 0 removes it. Re-flags the pin when the downvote rule trips. */
  vote(
    pinId: string,
    voterId: string,
    value: -1 | 0 | 1,
    ipHash: string,
    limit: IpLimit,
    flag: { minDown: number; ratio: number },
  ): Promise<StoreResult<VoteResult>>;
  listComments(pinId: string): Promise<Comment[]>;
  addComment(pinId: string, gamerTag: string, body: string, ipHash: string, limit: IpLimit): Promise<StoreResult<Comment>>;
  toggleCommentLike(
    commentId: string,
    voterId: string,
    ipHash: string,
    limit: IpLimit,
  ): Promise<StoreResult<{ likeCount: number; liked: boolean }>>;
  leaderboard(limit: number): Promise<Leaderboard>;
}
