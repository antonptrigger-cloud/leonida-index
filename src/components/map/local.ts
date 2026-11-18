"use client";

/** Browser-local identity for votes and likes (no accounts). */

const VOTER_KEY = "lvg_voter_id";
const VOTES_KEY = "lvg_votes";
const LIKES_KEY = "lvg_comment_likes";
const TAG_KEY = "lvg_gamer_tag";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked */
  }
}

export function getVoterId(): string {
  let id = read<string | null>(VOTER_KEY, null);
  if (!id || !/^[A-Za-z0-9_-]{8,64}$/.test(id)) {
    id = crypto.randomUUID().replace(/-/g, "");
    write(VOTER_KEY, id);
  }
  return id;
}

export function getMyVote(pinId: string): -1 | 0 | 1 {
  return read<Record<string, -1 | 1>>(VOTES_KEY, {})[pinId] ?? 0;
}

export function setMyVote(pinId: string, value: -1 | 0 | 1) {
  const all = read<Record<string, -1 | 1>>(VOTES_KEY, {});
  if (value === 0) delete all[pinId];
  else all[pinId] = value;
  write(VOTES_KEY, all);
}

export function getLikedComments(): Set<string> {
  return new Set(read<string[]>(LIKES_KEY, []));
}

export function setLikedComment(id: string, liked: boolean) {
  const s = getLikedComments();
  if (liked) s.add(id);
  else s.delete(id);
  write(LIKES_KEY, [...s]);
}

export function getSavedGamerTag(): string {
  return read<string>(TAG_KEY, "");
}

export function saveGamerTag(tag: string) {
  write(TAG_KEY, tag);
}
