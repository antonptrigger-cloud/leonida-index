"use client";

import { useCallback, useEffect, useState } from "react";
import { LIMITS, PIN_TYPES } from "@/lib/map/config";
import type { Comment, PublicPin } from "@/lib/map/types";
import { getLikedComments, getMyVote, getSavedGamerTag, getVoterId, saveGamerTag, setLikedComment, setMyVote } from "./local";

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
    <div className="flex flex-col gap-4" data-testid="pin-details">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-xs uppercase tracking-[0.2em]" style={{ color: type.color }}>
            {type.label.replace(/s$/, "")}
            {pin.region && pin.type !== "region" ? <span className="text-[#9a958c]"> · {pin.region}</span> : null}
          </p>
          <h2 className="text-xl font-semibold tracking-tight">{pin.name}</h2>
        </div>
        <button onClick={onClose} className="text-sm text-[#9a958c] hover:text-[#ff2d7b]" aria-label="Close details">
          ✕
        </button>
      </div>

      {pin.approximate ? (
        <p className="rounded border border-[#2a2a2e] px-2 py-1 text-xs text-[#ffd36b]">Approximate position: confirm in game.</p>
      ) : null}

      <p className="whitespace-pre-line text-sm text-[#cfc9be]">{pin.description}</p>

      {pin.occupant ? (
        <p className="text-sm text-[#cfc9be]">
          <span className="text-[#9a958c]">Who/what is there: </span>
          {pin.occupant}
        </p>
      ) : null}

      <p className="text-xs text-[#9a958c]" data-testid="first-marked">
        First marked by <span className="font-medium text-[#f4f1ea]">{pin.gamerTag}</span>
      </p>

      <div className="flex items-center gap-2" data-testid="votes">
        <button
          onClick={() => vote(1)}
          disabled={!online || busy}
          aria-pressed={myVote === 1}
          className={`rounded-md border px-3 py-1.5 text-sm disabled:opacity-50 ${myVote === 1 ? "border-[#3bb273] bg-[#3bb273]/15" : "border-[#2a2a2e] hover:border-[#3bb273]"}`}
        >
          👍 <span data-testid="up-count">{pin.upCount}</span>
        </button>
        <button
          onClick={() => vote(-1)}
          disabled={!online || busy}
          aria-pressed={myVote === -1}
          className={`rounded-md border px-3 py-1.5 text-sm disabled:opacity-50 ${myVote === -1 ? "border-[#ff2d7b] bg-[#ff2d7b]/15" : "border-[#2a2a2e] hover:border-[#ff2d7b]"}`}
        >
          👎 <span data-testid="down-count">{pin.downCount}</span>
        </button>
        <span className="text-xs text-[#9a958c]">Is this pin accurate?</span>
      </div>
      {error ? <p className="text-xs text-[#ff2d7b]">{error}</p> : null}

      <section className="border-t border-[#2a2a2e] pt-4">
        <h3 className="mb-2 text-sm uppercase tracking-widest text-[#ffd36b]">Comments</h3>
        {!online ? (
          <p className="text-xs text-[#9a958c]">Comments are offline right now.</p>
        ) : comments === null ? (
          <p className="text-xs text-[#9a958c]">Loading…</p>
        ) : comments.length === 0 ? (
          <p className="text-xs text-[#9a958c]">No comments yet.</p>
        ) : (
          <ul className="mb-3 flex max-h-64 flex-col gap-2 overflow-y-auto" data-testid="comments">
            {comments.map((c) => (
              <li key={c.id} className="rounded-md border border-[#2a2a2e] bg-[#0b0b0c] p-2 text-sm">
                <div className="mb-1 flex items-center justify-between text-xs text-[#9a958c]">
                  <span className="font-medium text-[#f4f1ea]">{c.gamerTag}</span>
                  <button
                    onClick={() => like(c)}
                    aria-pressed={liked.has(c.id)}
                    className={`rounded px-1.5 ${liked.has(c.id) ? "text-[#ff2d7b]" : "hover:text-[#ff2d7b]"}`}
                    data-testid="comment-like"
                  >
                    ♥ {c.likeCount}
                  </button>
                </div>
                <p className="whitespace-pre-line break-words text-[#cfc9be]">{c.body}</p>
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
              className="rounded-md border border-[#2a2a2e] bg-[#0b0b0c] px-2 py-1.5 text-sm outline-none focus:border-[#ffd36b]"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={LIMITS.commentMax}
              rows={2}
              placeholder="Add a short comment"
              aria-label="Comment"
              className="rounded-md border border-[#2a2a2e] bg-[#0b0b0c] px-2 py-1.5 text-sm outline-none focus:border-[#ffd36b]"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9a958c]">
                {body.length}/{LIMITS.commentMax}
              </span>
              <button type="submit" className="rounded-md bg-[#f4f1ea] px-3 py-1.5 text-sm font-medium text-[#0b0b0c] hover:bg-[#ffd36b]">
                Post
              </button>
            </div>
            {commentError ? <p className="text-xs text-[#ff2d7b]">{commentError}</p> : null}
          </form>
        ) : null}
      </section>
    </div>
  );
}
