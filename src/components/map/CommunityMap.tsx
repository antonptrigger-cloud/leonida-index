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
  loading: () => <div className="flex h-full items-center justify-center text-sm text-muted">Loading map…</div>,
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

const card = "vc-glass";

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

export function CommunityMap({
  initialPins,
  online,
  initialQuery = "",
}: {
  initialPins: PublicPin[];
  online: boolean;
  /** From /map?q=… (WebSite SearchAction target). */
  initialQuery?: string;
}) {
  useHeaderOffset();
  const [pins, setPins] = useState<PublicPin[]>(initialPins);
  const [enabled, setEnabled] = useState<Set<PinType>>(new Set(TYPE_KEYS));
  const [query, setQuery] = useState(initialQuery);
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

      {/* Controls: submit (desktop), search, spoilers, filters */}
      <div className={`${card} vc-glass--cut absolute left-2x right-2x top-2x z-[1000] flex flex-col gap-3x p-3x sm:left-3x sm:right-auto sm:top-3x sm:w-[440px] sm:p-4x`}>
        <h2 className="sr-only">Map controls</h2>
        <div className="hidden items-center justify-between gap-4x sm:flex">
          <div className="leading-none">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.32em] text-turq">Community map</p>
            <p className="vc-display mt-1x text-[1.9rem] leading-[0.85] text-ink">Leonida</p>
          </div>
          <button
            onClick={submitting ? endSubmit : startSubmit}
            disabled={!online}
            title={online ? undefined : "Submissions are offline"}
            className="vc-cta mr-1x shrink-0 text-[1.2rem]"
          >
            <span aria-hidden className="text-[1.35rem] leading-none">{submitting ? "×" : "+"}</span>
            {submitting ? "Cancel submission" : "Submit a location"}
          </button>
        </div>
        <label className="group flex items-center gap-2x border-b border-pink/35 pb-1x focus-within:border-blue">
          <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-pink-2" aria-hidden>
            <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search places, regions, gamer tags…"
            aria-label="Search pins"
            className="min-w-0 flex-1 bg-transparent py-1x text-sm text-ink outline-none placeholder:text-faint"
          />
        </label>
        <div className="flex flex-wrap items-center gap-x-3x gap-y-2x pl-1x">
          <label className="vc-chip cursor-pointer" style={{ ["--chip" as string]: "#ff8c42" }}>
            <input type="checkbox" checked={showSpoilers} onChange={(e) => setShowSpoilers(e.target.checked)} className="accent-pink" />
            Show spoilers
          </label>
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            className="vc-chip sm:hidden"
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
            className="vc-chip"
            style={{ ["--chip" as string]: "#00d4ff" }}
          >
            Pins ({visible.length})
          </button>
          <Link href="/map/leaderboard" className="vc-display ml-auto text-[0.95rem] tracking-[0.08em] text-muted transition-colors hover:text-pink-2">
            Leaderboard →
          </Link>
        </div>
        <div className={`${filtersOpen ? "flex" : "hidden"} flex-wrap gap-x-3x gap-y-2x pl-1x sm:flex`} role="group" aria-label="Filter by type">
          {TYPE_KEYS.map((t) => (
            <button
              key={t}
              onClick={() => toggleType(t)}
              aria-pressed={enabled.has(t)}
              className={`vc-chip ${enabled.has(t) ? "" : "line-through"}`}
              style={{ ["--chip" as string]: PIN_TYPES[t].color }}
            >
              <span className="inline-block h-2 w-2 rotate-45" style={{ background: PIN_TYPES[t].color, opacity: enabled.has(t) ? 1 : 0.35 }} />
              {PIN_TYPES[t].label}
              <span className="text-muted">{counts[t] ?? 0}</span>
            </button>
          ))}
        </div>
        {!online ? (
          <p className="border-l-2 border-orange bg-orange/10 px-3x py-1x text-xs text-orange" data-testid="offline-notice">
            Community submissions are offline right now. You can still browse the official pins.
          </p>
        ) : null}
      </div>

      {/* Mobile: the main action sits at thumb height. */}
      {!panelMode || panelMode === "list" ? (
        <div className="absolute bottom-10x left-4x z-[1000] sm:hidden">
          <button
            onClick={submitting ? endSubmit : startSubmit}
            disabled={!online}
            title={online ? undefined : "Submissions are offline"}
            className="vc-cta vc-cta--xl"
          >
            <span aria-hidden className="text-[1.5rem] leading-none">{submitting ? "×" : "+"}</span>
            {submitting ? "Cancel submission" : "Submit a location"}
          </button>
        </div>
      ) : null}

      {submitting && !draft ? (
        <div className="vc-chip vc-chip--on pointer-events-none absolute inset-x-0 bottom-[6.5rem] z-[900] mx-auto w-fit text-orange sm:bottom-10x" style={{ ["--chip" as string]: "#ff8c42" }}>
          Tap the map to drop your pin
        </div>
      ) : null}

      {/* Side panel (desktop) / bottom sheet (mobile) */}
      {panelMode ? (
        <aside
          className={`${card} vc-panel absolute inset-x-0 bottom-0 z-[1000] max-h-[62%] overflow-y-auto p-gutter pt-6x sm:inset-x-auto sm:bottom-10x sm:right-3x sm:top-3x sm:max-h-none sm:w-[360px]`}
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
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.32em] text-turq">{q ? "Search" : "On the map"}</p>
                  <h2 className="vc-heading mb-2x mt-1x text-[2.6rem]">{q ? "Results" : "Pins"}</h2>
                  <p className="text-xs text-muted">
                    {visible.length} shown. Click a pin for details{online ? ", votes and comments" : ""}.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setListOpen(false);
                    setQuery("");
                  }}
                  className="text-sm text-muted hover:text-pink"
                  aria-label="Close list"
                >
                  ✕
                </button>
              </div>
              <ul className="flex flex-col gap-1 text-sm" data-testid="pin-list">
                {visible.map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => focus(p)}
                      className="flex w-full items-center gap-3x border-l-2 border-transparent px-2x py-1x text-left transition-[padding,border-color,background] duration-200 hover:border-pink hover:bg-pink/10 hover:pl-3x"
                    >
                      <span className="inline-block h-2 w-2 shrink-0 rotate-45" style={{ background: PIN_TYPES[p.type].color }} />
                      <span className="truncate">{p.name}</span>
                      {p.approximate ? <span className="ml-auto text-[10px] text-faint">approx.</span> : null}
                    </button>
                  </li>
                ))}
                {visible.length === 0 ? <li className="text-xs text-muted">Nothing matches.</li> : null}
              </ul>
              {online ? (
                <div className="border-t border-pink/20 pt-4x">
                  <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-turq">Top markers</h2>
                    <Link href="/map/leaderboard" className="text-xs text-muted hover:text-pink">
                      Leaderboard →
                    </Link>
                  </div>
                  {leaders && leaders.length ? (
                    <ol className="flex flex-col gap-1 text-sm">
                      {leaders.slice(0, 5).map((l, i) => (
                        <li key={l.gamerTag} className="flex justify-between">
                          <span>
                            <span className="vc-display mr-2x text-[1.05rem] text-blue">{String(i + 1).padStart(2, "0")}</span>
                            {l.gamerTag}
                          </span>
                          <span className="text-muted">{l.count}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-xs text-muted">No community pins yet. Be the first to mark a spot.</p>
                  )}
                </div>
              ) : null}
              <div className="border-t border-pink/20 pt-4x">
                <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-turq">Region guides</h2>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  {REGION_PAGES.map((r) => (
                    <Link key={r.slug} href={`/map/${r.slug}`} className="vc-display border-l-2 border-pink/30 px-2x py-1x text-[1.05rem] tracking-[0.05em] text-ink-2 transition-[border-color,color,padding] duration-200 hover:border-pink hover:pl-3x hover:text-pink-2">
                      {r.name}
                    </Link>
                  ))}
                </div>
                <p className="mt-3 text-xs text-faint">
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
