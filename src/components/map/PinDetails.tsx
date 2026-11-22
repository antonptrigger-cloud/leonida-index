"use client";

import { useCallback, useEffect, useState } from "react";
import { CATEGORIES } from "@/lib/map/categories";
import { LIMITS, PIN_TYPES, typeSingular } from "@/lib/map/config";
import type { Comment, PublicPin } from "@/lib/map/types";
import { getLikedComments, getMyVote, getSavedGamerTag, getVoterId, saveGamerTag, setLikedComment, setMyVote } from "./local";
import { ShareButtons } from "@/components/ShareButtons";
import { SITE } from "@/lib/seo/site";

export function PinDetails({
  pin,
  online,
  onClose,
  onCounts,
}: {
  pin: PublicPin;
  online: boolean;
  onClose: () => void;
  onCounts: (id: string, up: number, down: number) => void;
}) {
  const [myVote, setVote] = useState<-1 | 0 | 1>(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [tag, setTag] = useState("");
  const [body, setBody] = useState("");
  const [commentError, setCommentError] = useState<string | null>(null);

  const loadComments = useCallback(async () => {
    if (!online) return;
    try {
      const res = await fetch(`/api/map/pins/${encodeURIComponent(pin.id)}/comments`, { cache: "no-store" });
      const data = (await res.json()) as { comments: Comment[] };
      setComments(data.comments ?? []);
    } catch {
      setComments([]);
    }
  }, [pin.id, online]);

  useEffect(() => {
    // Sync browser-local state for this pin (localStorage is only available client-side).
    /* eslint-disable react-hooks/set-state-in-effect */
    setVote(getMyVote(pin.id));
    setLiked(getLikedComments());
    setTag((t) => t || getSavedGamerTag());
    setError(null);
    setComments(null);
    /* eslint-enable react-hooks/set-state-in-effect */
    void loadComments();
  }, [pin.id, loadComments]);

  async function vote(value: -1 | 1) {
    if (!online || busy) return;
    const next = myVote === value ? 0 : value;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/map/pins/${encodeURIComponent(pin.id)}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voterId: getVoterId(), value: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Vote failed");
      setVote(next);
      setMyVote(pin.id, next);
      onCounts(pin.id, data.upCount, data.downCount);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Vote failed");
    } finally {
      setBusy(false);
    }
  }

  async function postComment(e: React.FormEvent) {
    e.preventDefault();
    setCommentError(null);
    const t = tag.trim();
    const b = body.trim();
    if (t.length < LIMITS.gamerTagMin) return setCommentError("Add your gamer tag.");
    if (b.length < 2) return setCommentError("Write something first.");
    if (b.length > LIMITS.commentMax) return setCommentError(`Keep it under ${LIMITS.commentMax} characters.`);
    const res = await fetch(`/api/map/pins/${encodeURIComponent(pin.id)}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gamerTag: t, body: b }),
    });
    const data = await res.json();
    if (!res.ok) return setCommentError(data.error ?? "Could not post comment");
    saveGamerTag(t);
    setBody("");
    setComments((c) => [...(c ?? []), data.comment]);
  }

  async function like(c: Comment) {
    const res = await fetch(`/api/map/comments/${encodeURIComponent(c.id)}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ voterId: getVoterId() }),
    });
    if (!res.ok) return;
    const data = (await res.json()) as { likeCount: number; liked: boolean };
    setLikedComment(c.id, data.liked);
    setLiked(getLikedComments());
    setComments((list) => (list ?? []).map((x) => (x.id === c.id ? { ...x, likeCount: data.likeCount } : x)));
  }

  const type = PIN_TYPES[pin.type];

  return (
    <div className="flex flex-col gap-4x" data-testid="pin-details">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mb-2x text-[0.65rem] font-bold uppercase tracking-[0.32em]" style={{ color: type.color }}>
            {typeSingular(pin.type)}
            {pin.category ? <span className="text-ink-2" data-testid="pin-category"> · {CATEGORIES[pin.category].label}</span> : null}
            {pin.region && pin.type !== "region" ? <span className="text-muted"> · {pin.region}</span> : null}
          </p>
          <h2 className="vc-heading pr-6x text-[3rem]">{pin.name}</h2>
        </div>
        <button onClick={onClose} className="text-sm text-muted hover:text-pink" aria-label="Close details">
          ✕
        </button>
      </div>

      {pin.source === "gtadb" ? (
        <p className="border-l-2 border-blue bg-blue/10 px-3x py-1x text-xs text-blue" data-testid="gtadb-badge">
          Community research, not named by Rockstar. Landmark data from{" "}
          <a href="https://map.gtadb.org" target="_blank" rel="noopener" className="underline">
            GTADB.org
          </a>{" "}
          (<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener" className="underline">CC BY 4.0</a>).
        </p>
      ) : null}

      {pin.source === "official" ? (
        <p className="border-l-2 border-turq bg-turq/10 px-3x py-1x text-xs text-turq" data-testid="official-badge">
          ✓ Named by Rockstar. Source is in the description below.
        </p>
      ) : null}

      {pin.approximate ? (
        <p className="border-l-2 border-orange bg-orange/10 px-3x py-1x text-xs text-orange">Approximate position: confirm in game.</p>
      ) : null}

      <p className="whitespace-pre-line text-sm text-ink-2">{pin.description}</p>

      {pin.occupant ? (
        <p className="text-sm text-ink-2">
          <span className="text-muted">Who/what is there: </span>
          {pin.occupant}
        </p>
      ) : null}

      <ShareButtons
        title={pin.name}
        url={`${SITE.url}/map?pin=${encodeURIComponent(pin.id)}`}
        compact
        copyTestId="copy-link"
        copyLabel="Copy link to this pin"
      />

      <p className="text-xs text-muted" data-testid="first-marked">
        First marked by <span className="font-medium text-ink">{pin.gamerTag}</span>
      </p>

      <div className="flex items-center gap-2" data-testid="votes">
        <button
          onClick={() => vote(1)}
          disabled={!online || busy}
          aria-pressed={myVote === 1}
          className="vc-chip text-sm disabled:opacity-50"
          style={{ ["--chip" as string]: "#3bb273" }}
        >
          👍 <span data-testid="up-count">{pin.upCount}</span>
        </button>
        <button
          onClick={() => vote(-1)}
          disabled={!online || busy}
          aria-pressed={myVote === -1}
          className="vc-chip text-sm disabled:opacity-50"
        >
          👎 <span data-testid="down-count">{pin.downCount}</span>
        </button>
        <span className="text-xs text-muted">Is this pin accurate?</span>
      </div>
      {error ? <p className="text-xs text-pink">{error}</p> : null}

      <section className="border-t border-pink/20 pt-4x">
        <h3 className="vc-display mb-3x text-[1.6rem] leading-none text-ink">Comments</h3>
        {!online ? (
          <p className="text-xs text-muted">Comments are offline right now.</p>
        ) : comments === null ? (
          <p className="text-xs text-muted">Loading…</p>
        ) : comments.length === 0 ? (
          <p className="text-xs text-muted">No comments yet.</p>
        ) : (
          <ul className="mb-3 flex max-h-64 flex-col gap-2 overflow-y-auto" data-testid="comments">
            {comments.map((c) => (
              <li key={c.id} className="border-l-2 border-pink/40 bg-[#0c0a10] px-3x py-2x text-sm">
                <div className="mb-1 flex items-center justify-between text-xs text-muted">
                  <span className="font-medium text-ink">{c.gamerTag}</span>
                  <button
                    onClick={() => like(c)}
                    aria-pressed={liked.has(c.id)}
                    className={`rounded px-1.5 ${liked.has(c.id) ? "text-pink" : "hover:text-pink"}`}
                    data-testid="comment-like"
                  >
                    ♥ {c.likeCount}
                  </button>
                </div>
                <p className="whitespace-pre-line break-words text-ink-2">{c.body}</p>
              </li>
            ))}
          </ul>
        )}
        {online ? (
          <form onSubmit={postComment} className="flex flex-col gap-2">
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              maxLength={LIMITS.gamerTagMax}
              placeholder="Gamer tag"
              aria-label="Gamer tag"
              className="w-full border border-pink/25 bg-[#0c0a10] px-3x py-2x text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-blue"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={LIMITS.commentMax}
              rows={2}
              placeholder="Add a short comment"
              aria-label="Comment"
              className="rounded-md border border-line bg-bg px-2 py-1.5 text-sm outline-none focus:border-blue"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">
                {body.length}/{LIMITS.commentMax}
              </span>
              <button type="submit" className="vc-btn">
                Post
              </button>
            </div>
            {commentError ? <p className="text-xs text-pink">{commentError}</p> : null}
          </form>
        ) : null}
      </section>
    </div>
  );
}
