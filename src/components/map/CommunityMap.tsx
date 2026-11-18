"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PIN_TYPES, type PinType } from "@/lib/map/config";
import type { LeaderboardEntry, PublicPin } from "@/lib/map/types";
import { PinDetails } from "./PinDetails";
import { SubmitForm } from "./SubmitForm";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center text-sm text-[#9a958c]">Loading map…</div>,
});

const TYPE_KEYS = Object.keys(PIN_TYPES) as PinType[];

export function CommunityMap({ initialPins, online }: { initialPins: PublicPin[]; online: boolean }) {
  const [pins, setPins] = useState<PublicPin[]>(initialPins);
  const [enabled, setEnabled] = useState<Set<PinType>>(new Set(TYPE_KEYS));
  const [query, setQuery] = useState("");
  const [showSpoilers, setShowSpoilers] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [draft, setDraft] = useState<{ x: number; y: number } | null>(null);
  const [flyTarget, setFlyTarget] = useState<{ x: number; y: number; key: number } | null>(null);
  const [leaders, setLeaders] = useState<LeaderboardEntry[] | null>(null);

  useEffect(() => {
    if (!online) return;
    fetch("/api/map/leaderboard", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setLeaders(d.firstMarked ?? []))
      .catch(() => setLeaders([]));
  }, [online]);

  const counts = useMemo(() => {
    const c: Partial<Record<PinType, number>> = {};
    for (const p of pins) if (showSpoilers || !p.spoiler) c[p.type] = (c[p.type] ?? 0) + 1;
    return c;
  }, [pins, showSpoilers]);

  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      pins.filter(
        (p) =>
          enabled.has(p.type) &&
          (showSpoilers || !p.spoiler) &&
          (!q || [p.name, p.description, p.region ?? "", p.occupant ?? "", p.gamerTag].some((s) => s.toLowerCase().includes(q))),
      ),
    [pins, enabled, showSpoilers, q],
  );

  const selected = pins.find((p) => p.id === selectedId) ?? null;

  const select = useCallback(
    (id: string) => {
      if (submitting) return;
      setSelectedId(id);
    },
    [submitting],
  );

  function focus(p: PublicPin) {
    setSelectedId(p.id);
    setFlyTarget((prev) => ({ x: p.x, y: p.y, key: (prev?.key ?? 0) + 1 }));
  }

  function toggleType(t: PinType) {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }

  function startSubmit() {
    setSelectedId(null);
    setDraft(null);
    setSubmitting(true);
  }

  function endSubmit() {
    setSubmitting(false);
    setDraft(null);
  }

  const onCounts = useCallback((id: string, up: number, down: number) => {
    setPins((list) => list.map((p) => (p.id === id ? { ...p, upCount: up, downCount: down } : p)));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {!online ? (
        <p className="rounded-lg border border-[#ffd36b]/40 bg-[#ffd36b]/10 px-3 py-2 text-sm text-[#ffd36b]" data-testid="offline-notice">
          Community submissions are offline right now. You can still browse the official pins.
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search places, regions, gamer tags…"
          aria-label="Search pins"
          className="min-w-[220px] flex-1 rounded-md border border-[#2a2a2e] bg-[#161618] px-3 py-2 text-sm outline-none focus:border-[#ffd36b]"
        />
        <label className="flex cursor-pointer items-center gap-2 rounded-md border border-[#2a2a2e] bg-[#161618] px-3 py-2 text-sm text-[#cfc9be]">
          <input type="checkbox" checked={showSpoilers} onChange={(e) => setShowSpoilers(e.target.checked)} className="accent-[#ff2d7b]" />
          Show spoilers
        </label>
        <button
          onClick={submitting ? endSubmit : startSubmit}
          disabled={!online}
          title={online ? undefined : "Submissions are offline"}
          className="rounded-md bg-[#ff2d7b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ff4f92] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? "Cancel submission" : "Submit a location"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
        {TYPE_KEYS.map((t) => (
          <button
            key={t}
            onClick={() => toggleType(t)}
            aria-pressed={enabled.has(t)}
            className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${enabled.has(t) ? "border-[#2a2a2e] bg-[#161618] text-[#f4f1ea]" : "border-[#2a2a2e] text-[#6f6b64] line-through"}`}
          >
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: PIN_TYPES[t].color, opacity: enabled.has(t) ? 1 : 0.35 }} />
            {PIN_TYPES[t].label}
            <span className="text-[#9a958c]">{counts[t] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="relative h-[70vh] min-h-[420px] overflow-hidden rounded-lg border border-[#2a2a2e] bg-[#0b0b0c]" data-testid="map">
          <LeafletMap
            pins={visible}
            selectedId={selectedId}
            onSelect={select}
            dropMode={submitting}
            draft={draft}
            onDraftChange={setDraft}
            flyTarget={flyTarget}
          />
          {submitting && !draft ? (
            <div className="pointer-events-none absolute inset-x-0 top-3 z-[500] mx-auto w-fit rounded-full bg-[#0b0b0c]/90 px-4 py-1.5 text-xs text-[#ffd36b]">
              Click the map to drop your pin
            </div>
          ) : null}
        </div>

        <aside className="rounded-lg border border-[#2a2a2e] bg-[#161618] p-4 lg:max-h-[70vh] lg:overflow-y-auto">
          {submitting ? (
            <SubmitForm draft={draft} onCancel={endSubmit} onDone={endSubmit} />
          ) : selected ? (
            <PinDetails pin={selected} online={online} onClose={() => setSelectedId(null)} onCounts={onCounts} />
          ) : (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="mb-1 text-sm uppercase tracking-widest text-[#ffd36b]">{q ? "Results" : "Pins"}</h2>
                <p className="text-xs text-[#9a958c]">
                  {visible.length} shown. Click a pin for details{online ? ", votes and comments" : ""}.
                </p>
              </div>
              <ul className="flex max-h-72 flex-col gap-1 overflow-y-auto text-sm" data-testid="pin-list">
                {visible.map((p) => (
                  <li key={p.id}>
                    <button onClick={() => focus(p)} className="flex w-full items-center gap-2 rounded px-2 py-1 text-left hover:bg-[#0b0b0c]">
                      <span className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ background: PIN_TYPES[p.type].color }} />
                      <span className="truncate">{p.name}</span>
                      {p.approximate ? <span className="ml-auto text-[10px] text-[#6f6b64]">approx.</span> : null}
                    </button>
                  </li>
                ))}
                {visible.length === 0 ? <li className="text-xs text-[#9a958c]">Nothing matches.</li> : null}
              </ul>
              {online ? (
                <div className="border-t border-[#2a2a2e] pt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-sm uppercase tracking-widest text-[#ffd36b]">Top markers</h2>
                    <Link href="/map/leaderboard" className="text-xs text-[#9a958c] hover:text-[#ff2d7b]">
                      Leaderboard →
                    </Link>
                  </div>
                  {leaders && leaders.length ? (
                    <ol className="flex flex-col gap-1 text-sm">
                      {leaders.slice(0, 5).map((l, i) => (
                        <li key={l.gamerTag} className="flex justify-between">
                          <span>
                            <span className="mr-2 text-[#6f6b64]">{i + 1}.</span>
                            {l.gamerTag}
                          </span>
                          <span className="text-[#9a958c]">{l.count}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-xs text-[#9a958c]">No community pins yet. Be the first to mark a spot.</p>
                  )}
                </div>
              ) : null}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
