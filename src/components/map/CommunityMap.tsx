"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BASES, BASE_IDS, DEFAULT_BASE, isBaseId, type BaseId } from "@/lib/map/bases";
import { PIN_TYPES, REGIONS, SOURCE_LABELS, typeSingular, type PinType } from "@/lib/map/config";
import { NO_FILTERS, regionSlug as slug, type InitialFilters } from "@/lib/map/filters";
import type { LeaderboardEntry, PublicPin } from "@/lib/map/types";
import { CATEGORIES, CATEGORY_GROUPS, CATEGORY_IDS, categorySearchText, type PinCategory } from "@/lib/map/categories";
import { categoryGlyphSvg, glyphSvg } from "./glyphs";
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
  initialFilters = NO_FILTERS,
  breadcrumb,
}: {
  initialPins: PublicPin[];
  online: boolean;
  /** From the /map URL. `q` is the WebSite SearchAction target (/map?q=…). */
  initialFilters?: InitialFilters;
  /** Visible breadcrumb (server-rendered with its JSON-LD), shown as a small first line of the floating controls card, so it overlays the map without taking layout space. */
  breadcrumb?: React.ReactNode;
}) {
  useHeaderOffset();
  const [pins, setPins] = useState<PublicPin[]>(initialPins);
  const [enabled, setEnabled] = useState<Set<PinType>>(new Set(initialFilters.types ?? TYPE_KEYS));
  const [query, setQuery] = useState(initialFilters.q);
  const [showSpoilers, setShowSpoilers] = useState(initialFilters.spoilers);
  const [officialOnly, setOfficialOnly] = useState(initialFilters.official);
  const [region, setRegion] = useState<string | null>(initialFilters.region);
  const [cats, setCats] = useState<Set<PinCategory>>(new Set(initialFilters.cats));
  const [baseId, setBaseId] = useState<BaseId>(initialFilters.base ?? DEFAULT_BASE);
  const deepPin = initialPins.find((p) => p.id === initialFilters.pin) ?? null;
  const [selectedId, setSelectedId] = useState<string | null>(deepPin?.id ?? null);
  const [submitting, setSubmitting] = useState(false);
  const [draft, setDraft] = useState<{ x: number; y: number } | null>(null);
  const [flyTarget, setFlyTarget] = useState<{ id?: string; x: number; y: number; key: number } | null>(deepPin ? { id: deepPin.id, x: deepPin.x, y: deepPin.y, key: 1 } : null);
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

  const q = query.trim().toLowerCase();
  const matchesQuery = useCallback(
    (p: PublicPin) => !q || [p.name, p.description, p.region ?? "", p.occupant ?? "", p.gamerTag, categorySearchText(p.category)].some((v) => v.toLowerCase().includes(q)),
    [q],
  );
  /** Everything except the type and category chips, so each chip's count reflects what it would add. */
  const base = useMemo(
    () =>
      pins.filter(
        (p) => (showSpoilers || !p.spoiler) && (!officialOnly || p.source === "official") && (!region || p.region === region) && matchesQuery(p),
      ),
    [pins, showSpoilers, officialOnly, region, matchesQuery],
  );
  const counts = useMemo(() => {
    const c: Partial<Record<PinType, number>> = {};
    for (const p of base) c[p.type] = (c[p.type] ?? 0) + 1;
    return c;
  }, [base]);
  const catCounts = useMemo(() => {
    const c: Partial<Record<PinCategory, number>> = {};
    for (const p of base) if (p.category && enabled.has(p.type)) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, [base, enabled]);
  const visible = useMemo(() => base.filter((p) => enabled.has(p.type) && (cats.size === 0 || (!!p.category && cats.has(p.category)))), [base, enabled, cats]);
  const filtering = !!q || officialOnly || !!region || enabled.size < TYPE_KEYS.length || cats.size > 0;
  const activeFilterCount = cats.size + (officialOnly ? 1 : 0) + (region ? 1 : 0) + (enabled.size < TYPE_KEYS.length ? 1 : 0) + (showSpoilers ? 1 : 0);

  const selected = pins.find((p) => p.id === selectedId) ?? null;

  // Keep the URL shareable: filters and the open pin live in the query string (replaceState: no history spam).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const set = (k: string, v: string | null) => (v ? params.set(k, v) : params.delete(k));
    set("q", query.trim() || null);
    set("types", enabled.size < TYPE_KEYS.length ? TYPE_KEYS.filter((t) => enabled.has(t)).join(",") : null);
    set("cats", cats.size ? CATEGORY_IDS.filter((c) => cats.has(c)).join(",") : null);
    set("official", officialOnly ? "1" : null);
    set("region", region ? slug(region) : null);
    set("spoilers", showSpoilers ? "1" : null);
    set("pin", selectedId);
    set("base", baseId === DEFAULT_BASE ? null : baseId);
    const qs = params.toString();
    const url = `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`;
    if (url !== `${window.location.pathname}${window.location.search}${window.location.hash}`) window.history.replaceState(null, "", url);
  }, [query, enabled, cats, officialOnly, region, showSpoilers, selectedId, baseId]);

  const select = useCallback(
    (id: string) => {
      if (submitting) return;
      setSelectedId(id);
    },
    [submitting],
  );

  function focus(p: PublicPin) {
    setSelectedId(p.id);
    setFlyTarget((prev) => ({ id: p.id, x: p.x, y: p.y, key: (prev?.key ?? 0) + 1 }));
  }

  function toggleType(t: PinType) {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }

  function toggleCat(c: PinCategory) {
    setCats((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
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

  const mapPins = useMemo(() => (selected && !visible.includes(selected) ? [...visible, selected] : visible), [visible, selected]);
  const listRef = useRef<HTMLUListElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const focusResult = (index: number) => {
    const items = listRef.current?.querySelectorAll<HTMLButtonElement>("button[data-result]");
    items?.[Math.max(0, Math.min(index, items.length - 1))]?.focus();
  };

  const panelMode: "submit" | "details" | "list" | null = submitting ? "submit" : selected ? "details" : listOpen || q ? "list" : null;

  return (
    <div data-map-host className="lvg-fullmap fixed inset-x-0 bottom-0 z-30" style={{ top: "var(--lvg-header-h, 49px)", background: BASES[baseId].tiles.background }}>
      <div className="absolute inset-0" data-testid="map">
        <LeafletMap
          baseId={baseId}
          pins={mapPins}
          selectedId={selectedId}
          onSelect={select}
          dropMode={submitting}
          draft={draft}
          onDraftChange={setDraft}
          flyTarget={flyTarget}
          showCoords={showCoords}
          showAllPlaces={filtering || !!selected}
        />
      </div>

      {/* Controls: submit (desktop), search, spoilers, filters */}
      <div data-map-ui className={`${card} vc-glass--cut absolute left-2x right-2x top-2x z-[1000] flex flex-col gap-3x p-3x sm:left-3x sm:right-auto sm:top-3x sm:w-[440px] sm:p-4x`}>
        {breadcrumb ? <div className="lvg-crumb -mb-1x">{breadcrumb}</div> : null}
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
        <div className="flex items-center gap-2x">
          <label className="group flex min-w-0 flex-1 items-center gap-2x border-b border-pink/35 pb-1x focus-within:border-blue">
            <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-pink-2" aria-hidden>
              <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || (e.key === "Enter" && visible.length)) {
                  e.preventDefault();
                  setSelectedId(null);
                  setListOpen(true);
                  // Wait for the list to render, then move focus into it.
                  requestAnimationFrame(() => focusResult(0));
                } else if (e.key === "Escape") {
                  setQuery("");
                }
              }}
              placeholder="Search places, regions, gamer tags…"
              aria-label="Search pins"
              className="min-w-0 flex-1 bg-transparent py-1x text-sm text-ink outline-none placeholder:text-faint"
            />
          </label>
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            aria-controls="map-filters"
            className="vc-chip shrink-0 sm:hidden"
          >
            Filters{activeFilterCount ? ` (${activeFilterCount})` : ""}
          </button>
          <button
            onClick={() => {
              setSelectedId(null);
              setSubmitting(false);
              setListOpen((v) => !v || !!selected);
            }}
            aria-expanded={panelMode === "list"}
            className="vc-chip shrink-0"
            style={{ ["--chip" as string]: "#00d4ff" }}
          >
            Pins ({visible.length})
          </button>
        </div>
        <div id="map-filters" className={`${filtersOpen ? "flex" : "hidden"} flex-col gap-3x sm:flex`}>
          <div className="flex flex-wrap items-center gap-x-3x gap-y-2x pl-1x">
            <label className="vc-chip cursor-pointer" style={{ ["--chip" as string]: "#00e5cc" }} title="Only places Rockstar has named itself">
              <input type="checkbox" checked={officialOnly} onChange={(e) => setOfficialOnly(e.target.checked)} className="accent-pink" />
              Official only
            </label>
            <label className="vc-chip cursor-pointer" style={{ ["--chip" as string]: "#ff8c42" }}>
              <input type="checkbox" checked={showSpoilers} onChange={(e) => setShowSpoilers(e.target.checked)} className="accent-pink" />
              Show spoilers
            </label>
            <label className="vc-chip" title="Switch the base map. Pin data is the same either way.">
              <span className="sr-only">Base map</span>
              <select
                value={baseId}
                onChange={(e) => isBaseId(e.target.value) && setBaseId(e.target.value)}
                aria-label="Base map"
                className="max-w-[9.5rem] cursor-pointer bg-transparent text-inherit outline-none"
                data-testid="base-select"
              >
                {BASE_IDS.map((id) => (
                  <option key={id} value={id} className="bg-card">
                    {BASES[id].label}
                  </option>
                ))}
              </select>
            </label>
            <label className="vc-chip">
              <span className="sr-only">Region</span>
              <select
                value={region ?? ""}
                onChange={(e) => setRegion(e.target.value || null)}
                aria-label="Filter by region"
                className="max-w-[9.5rem] cursor-pointer bg-transparent text-inherit outline-none"
              >
                <option value="" className="bg-card">All regions</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r} className="bg-card">
                    {r}
                  </option>
                ))}
              </select>
            </label>
            {filtering || showSpoilers ? (
              <button
                onClick={() => {
                  setEnabled(new Set(TYPE_KEYS));
                  setCats(new Set());
                  setOfficialOnly(false);
                  setRegion(null);
                  setShowSpoilers(false);
                  setQuery("");
                }}
                className="text-xs text-muted underline-offset-2 hover:text-pink-2 hover:underline"
              >
                Reset
              </button>
            ) : null}
            <Link href="/map/leaderboard" className="vc-display ml-auto text-[0.95rem] tracking-[0.08em] text-muted transition-colors hover:text-pink-2">
              Leaderboard →
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-3x gap-y-2x pl-1x" role="group" aria-label="Filter by type">
            {TYPE_KEYS.filter((t) => (counts[t] ?? 0) > 0 || !enabled.has(t)).map((t) => {
              const n = counts[t] ?? 0;
              return (
                <button
                  key={t}
                  onClick={() => toggleType(t)}
                  aria-pressed={enabled.has(t)}
                  className={`vc-chip ${enabled.has(t) ? "" : "line-through"}`}
                  style={{ ["--chip" as string]: PIN_TYPES[t].color }}
                >
                  <span
                    className="inline-flex h-3.5 w-3.5 items-center justify-center"
                    style={{ opacity: enabled.has(t) ? 1 : 0.4 }}
                    dangerouslySetInnerHTML={{ __html: glyphSvg(t, PIN_TYPES[t].color, 14) }}
                  />
                  {PIN_TYPES[t].label}
                  <span className="text-muted">{n}</span>
                </button>
              );
            })}
          </div>
          <details className="pl-1x" open={cats.size > 0 || undefined} data-testid="category-filters">
            <summary className="cursor-pointer select-none text-xs uppercase tracking-[0.18em] text-muted hover:text-pink-2">
              Vendors &amp; services{cats.size ? ` (${cats.size})` : ""}
            </summary>
            <div className="mt-2x flex max-h-[11rem] flex-col gap-2x overflow-y-auto pr-1x" role="group" aria-label="Filter by vendor category">
              {CATEGORY_GROUPS.map((g) => {
                const ids = CATEGORY_IDS.filter((c) => CATEGORIES[c].group === g.id && ((catCounts[c] ?? 0) > 0 || cats.has(c)));
                if (!ids.length) return null;
                return (
                  <div key={g.id} className="flex flex-wrap items-center gap-x-2x gap-y-1x">
                    <span className="w-full text-[0.62rem] uppercase tracking-[0.2em] text-faint">{g.label}</span>
                    {ids.map((c) => (
                      <button key={c} onClick={() => toggleCat(c)} aria-pressed={cats.has(c)} data-cat={c} className={`vc-chip ${cats.has(c) ? "vc-chip--on" : ""}`} style={{ ["--chip" as string]: "#00e5cc" }}>
                        <span className="inline-flex h-3.5 w-3.5 items-center justify-center" dangerouslySetInnerHTML={{ __html: categoryGlyphSvg(c, "#00e5cc", 14) }} />
                        {CATEGORIES[c].short}
                        <span className="text-muted">{catCounts[c] ?? 0}</span>
                      </button>
                    ))}
                  </div>
                );
              })}
              {Object.keys(catCounts).length === 0 && cats.size === 0 ? <p className="text-xs text-muted">No categorised places match the current filters.</p> : null}
            </div>
          </details>
        </div>
        {!online ? (
          <p className="border-l-2 border-orange bg-orange/10 px-3x py-1x text-xs text-orange" data-testid="offline-notice">
            Community submissions are offline right now. You can still browse the official pins.
          </p>
        ) : null}
      </div>

      {/* Mobile: the main action sits at thumb height. */}
      {!panelMode || panelMode === "list" ? (
        <div data-map-ui className="absolute bottom-[5.25rem] left-4x z-[1000] sm:hidden">
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
            <PinDetails key={selected.id} pin={selected} online={online} onClose={() => setSelectedId(null)} onCounts={onCounts} />
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
              <ul
                ref={listRef}
                className="flex flex-col gap-1 text-sm"
                data-testid="pin-list"
                aria-label="Pins on the map"
                onKeyDown={(e) => {
                  const items = [...(listRef.current?.querySelectorAll<HTMLButtonElement>("button[data-result]") ?? [])];
                  const i = items.indexOf(document.activeElement as HTMLButtonElement);
                  if (i < 0) return;
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    items[Math.min(i + 1, items.length - 1)]?.focus();
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    if (i === 0) searchRef.current?.focus();
                    else items[i - 1]?.focus();
                  } else if (e.key === "Home") {
                    e.preventDefault();
                    items[0]?.focus();
                  } else if (e.key === "End") {
                    e.preventDefault();
                    items[items.length - 1]?.focus();
                  }
                }}
              >
                {visible.map((p) => (
                  <li key={p.id}>
                    <button
                      data-result
                      onClick={() => focus(p)}
                      className="flex w-full items-center gap-3x border-l-2 border-transparent px-2x py-1x text-left transition-[padding,border-color,background] duration-200 hover:border-pink hover:bg-pink/10 hover:pl-3x focus-visible:border-pink focus-visible:bg-pink/10 focus-visible:outline-none"
                    >
                      <span
                        className="inline-flex h-4 w-4 shrink-0 items-center justify-center"
                        aria-hidden
                        dangerouslySetInnerHTML={{ __html: p.category ? categoryGlyphSvg(p.category, PIN_TYPES[p.type].color, 15) : glyphSvg(p.type, PIN_TYPES[p.type].color, 15) }}
                      />
                      <span className="truncate">{p.name}</span>
                      {p.category ? <span className="shrink-0 text-[10px] text-muted" data-testid="result-category">{CATEGORIES[p.category].short}</span> : null}
                      <span className="sr-only">{`, ${p.category ? CATEGORIES[p.category].short : typeSingular(p.type)}`}</span>
                      <span className="ml-auto flex shrink-0 items-center gap-2x text-[10px] text-faint">
                        {p.source === "official" ? <span className="text-turq" title="Named by Rockstar">✓ official</span> : null}
                        {p.source === "gtadb" ? <span title={SOURCE_LABELS.gtadb}>GTADB</span> : null}
                        {p.approximate ? <span>approx.</span> : null}
                      </span>
                    </button>
                  </li>
                ))}
                {visible.length === 0 ? <li className="text-xs text-muted">Nothing matches. Try clearing a filter.</li> : null}
              </ul>
              <p className="text-[11px] leading-relaxed text-faint">
                <span className="text-turq">✓</span> named by Rockstar · dashed outline = approximate position · solid outline = confirmed position
              </p>
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
