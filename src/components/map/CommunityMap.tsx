"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PIN_TYPES, TILES, type PinType } from "@/lib/map/config";
import type { LeaderboardEntry, PublicPin } from "@/lib/map/types";
import { PinDetails } from "./PinDetails";
import { SubmitForm } from "./SubmitForm";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center text-sm text-[#9a958c]">Loading map…</div>,
});

const TYPE_KEYS = Object.keys(PIN_TYPES) as PinType[];

const REGION_PAGES = [
  { slug: "vice-city", name: "Vice City" },
  { slug: "leonida-keys", name: "Leonida Keys" },
  { slug: "grassrivers", name: "Grassrivers" },
  { slug: "port-gellhorn", name: "Port Gellhorn" },
  { slug: "ambrosia", name: "Ambrosia" },
  { slug: "mount-kalaga", name: "Mount Kalaga" },
];

const card = "rounded-xl border border-[#2a2a2e] bg-[#0b0b0c]/90 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur";

/** Keeps the full-window map flush under the (possibly wrapping) site header. */
function useHeaderOffset() {
  useEffect(() => {
    const header = document.querySelector("body > header");
    if (!header) return;
    const set = () => document.documentElement.style.setProperty("--lvg-header-h", `${header.getBoundingClientRect().height}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);
}

export function CommunityMap({ initialPins, online }: { initialPins: PublicPin[]; online: boolean }) {
  useHeaderOffset();
  const [pins, setPins] = useState<PublicPin[]>(initialPins);
  const [enabled, setEnabled] = useState<Set<PinType>>(new Set(TYPE_KEYS));
  const [query, setQuery] = useState("");
  const [showSpoilers, setShowSpoilers] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [draft, setDraft] = useState<{ x: number; y: number } | null>(null);
  const [flyTarget, setFlyTarget] = useState<{ x: number; y: number; key: number } | null>(null);
  const [leaders, setLeaders] = useState<LeaderboardEntry[] | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [showCoords, setShowCoords] = useState(false);

  useEffect(() => {
    // Calibration helper for moderators: /map?coords=1
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowCoords(new URLSearchParams(window.location.search).get("coords") === "1");
  }, []);

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
    setListOpen(false);
    setSubmitting(true);
  }

  function endSubmit() {
    setSubmitting(false);
    setDraft(null);
  }

  const onCounts = useCallback((id: string, up: number, down: number) => {
    setPins((list) => list.map((p) => (p.id === id ? { ...p, upCount: up, downCount: down } : p)));
  }, []);

  const panelMode: "submit" | "details" | "list" | null = submitting ? "submit" : selected ? "details" : listOpen || q ? "list" : null;

  return (
    <div className="lvg-fullmap fixed inset-x-0 bottom-0 z-30" style={{ top: "var(--lvg-header-h, 49px)", background: TILES.background }}>
      <div className="absolute inset-0" data-testid="map">
        <LeafletMap
          pins={visible}
          selectedId={selectedId}
          onSelect={select}
          dropMode={submitting}
          draft={draft}
          onDraftChange={setDraft}
          flyTarget={flyTarget}
          showCoords={showCoords}
        />
      </div>

      {/* Controls: search, submit, spoilers, filters */}
      <div className={`${card} absolute left-2 right-2 top-2 z-[1000] flex flex-col gap-2 p-2 sm:left-3 sm:right-auto sm:top-3 sm:w-[440px] sm:p-3`}>
        <div className="flex items-center gap-2">
          <h1 className="sr-only">Leonida community map</h1>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search places, regions, gamer tags…"
            aria-label="Search pins"
            className="min-w-0 flex-1 rounded-md border border-[#2a2a2e] bg-[#161618] px-3 py-2 text-sm outline-none focus:border-[#ffd36b]"
          />
          <button
            onClick={submitting ? endSubmit : startSubmit}
            disabled={!online}
            title={online ? undefined : "Submissions are offline"}
            className="shrink-0 rounded-md bg-[#ff2d7b] px-3 py-2 text-sm font-semibold text-white hover:bg-[#ff4f92] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "Cancel submission" : "Submit a location"}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <label className="flex cursor-pointer items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#161618] px-2 py-1 text-[#cfc9be]">
            <input type="checkbox" checked={showSpoilers} onChange={(e) => setShowSpoilers(e.target.checked)} className="accent-[#ff2d7b]" />
            Show spoilers
          </label>
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            className="rounded-md border border-[#2a2a2e] bg-[#161618] px-2 py-1 text-[#cfc9be] sm:hidden"
          >
            Filters {enabled.size < TYPE_KEYS.length ? `(${enabled.size}/${TYPE_KEYS.length})` : ""}
          </button>
          <button
            onClick={() => {
              setSelectedId(null);
              setSubmitting(false);
              setListOpen((v) => !v || !!selected);
            }}
            aria-expanded={panelMode === "list"}
            className="rounded-md border border-[#2a2a2e] bg-[#161618] px-2 py-1 text-[#cfc9be] hover:border-[#ffd36b]"
          >
            Pins ({visible.length})
          </button>
          <Link href="/map/leaderboard" className="ml-auto text-[#9a958c] hover:text-[#ff2d7b]">
            Leaderboard →
          </Link>
        </div>
        <div className={`${filtersOpen ? "flex" : "hidden"} flex-wrap gap-1.5 sm:flex`} role="group" aria-label="Filter by type">
          {TYPE_KEYS.map((t) => (
            <button
              key={t}
              onClick={() => toggleType(t)}
              aria-pressed={enabled.has(t)}
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs ${enabled.has(t) ? "border-[#2a2a2e] bg-[#161618] text-[#f4f1ea]" : "border-[#2a2a2e] text-[#6f6b64] line-through"}`}
            >
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: PIN_TYPES[t].color, opacity: enabled.has(t) ? 1 : 0.35 }} />
              {PIN_TYPES[t].label}
              <span className="text-[#9a958c]">{counts[t] ?? 0}</span>
            </button>
          ))}
        </div>
        {!online ? (
          <p className="rounded-md border border-[#ffd36b]/40 bg-[#ffd36b]/10 px-2 py-1 text-xs text-[#ffd36b]" data-testid="offline-notice">
            Community submissions are offline right now. You can still browse the official pins.
          </p>
        ) : null}
      </div>

      {submitting && !draft ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-10 z-[900] mx-auto w-fit rounded-full bg-[#0b0b0c]/90 px-4 py-1.5 text-xs text-[#ffd36b]">
          Tap the map to drop your pin
        </div>
      ) : null}

      {/* Side panel (desktop) / bottom sheet (mobile) */}
      {panelMode ? (
        <aside
          className={`${card} absolute inset-x-0 bottom-0 z-[1000] max-h-[62%] overflow-y-auto rounded-b-none p-4 sm:inset-x-auto sm:bottom-12 sm:right-3 sm:top-3 sm:max-h-none sm:w-[340px] sm:rounded-b-xl`}
          data-testid="panel"
        >
          {panelMode === "submit" ? (
            <SubmitForm draft={draft} onCancel={endSubmit} onDone={endSubmit} />
          ) : panelMode === "details" && selected ? (
            <PinDetails pin={selected} online={online} onClose={() => setSelectedId(null)} onCounts={onCounts} />
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="mb-1 text-sm uppercase tracking-widest text-[#ffd36b]">{q ? "Results" : "Pins"}</h2>
                  <p className="text-xs text-[#9a958c]">
                    {visible.length} shown. Click a pin for details{online ? ", votes and comments" : ""}.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setListOpen(false);
                    setQuery("");
                  }}
                  className="text-sm text-[#9a958c] hover:text-[#ff2d7b]"
                  aria-label="Close list"
                >
                  ✕
                </button>
              </div>
              <ul className="flex flex-col gap-1 text-sm" data-testid="pin-list">
                {visible.map((p) => (
                  <li key={p.id}>
                    <button onClick={() => focus(p)} className="flex w-full items-center gap-2 rounded px-2 py-1 text-left hover:bg-[#161618]">
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
              <div className="border-t border-[#2a2a2e] pt-4">
                <h2 className="mb-2 text-sm uppercase tracking-widest text-[#ffd36b]">Region guides</h2>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  {REGION_PAGES.map((r) => (
                    <Link key={r.slug} href={`/map/${r.slug}`} className="rounded px-2 py-1 text-[#cfc9be] hover:bg-[#161618] hover:text-[#ff2d7b]">
                      {r.name}
                    </Link>
                  ))}
                </div>
                <p className="mt-3 text-xs text-[#6f6b64]">
                  The base map is an illustration. Pins marked “approx.” are best guesses until they&apos;re confirmed in game.
                </p>
              </div>
            </div>
          )}
        </aside>
      ) : null}
    </div>
  );
}
