"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from "react";
import { SEARCH_RESULT_LIMIT, type SearchHit } from "@/lib/map/search";

function Highlight({ text, q }: { text: string; q: string }) {
  const needle = q.trim();
  const i = needle ? text.toLowerCase().indexOf(needle.toLowerCase()) : -1;
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="lvg-search__mark">{text.slice(i, i + needle.length)}</mark>
      {text.slice(i + needle.length)}
    </>
  );
}

export function MapSearch({
  query,
  onQueryChange,
  hits,
  total,
  onPick,
  inputRef,
  trailing,
}: {
  query: string;
  onQueryChange: (q: string) => void;
  hits: SearchHit[];
  total: number;
  onPick: (hit: SearchHit) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  /** Filters / Pins buttons, kept on the same row as the field so the list can sit below both. */
  trailing?: ReactNode;
}) {
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const q = query.trim();
  const showList = open && q.length > 0;
  const current = hits.length ? Math.min(active, hits.length - 1) : 0;
  const activeId = showList && hits[current] ? `${listId}-${hits[current].id}` : undefined;

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function pick(hit: SearchHit) {
    onPick(hit);
    setOpen(false);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!showList) {
        setOpen(true);
        return;
      }
      if (hits.length) setActive((i) => Math.min(i + 1, hits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (showList) setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Home" && showList && hits.length) {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End" && showList && hits.length) {
      e.preventDefault();
      setActive(hits.length - 1);
    } else if (e.key === "Enter") {
      if (showList && hits[current]) {
        e.preventDefault();
        pick(hits[current]);
      } else if (showList && hits[0]) {
        e.preventDefault();
        pick(hits[0]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      if (showList) setOpen(false);
      else onQueryChange("");
    }
  }

  const status =
    !q || !showList
      ? ""
      : total === 0
        ? `No places match “${q}”.`
        : total > hits.length
          ? `${total} places. Showing the first ${hits.length}.`
          : `${total} place${total === 1 ? "" : "s"}.`;

  return (
    <div ref={wrapRef} className="lvg-search flex min-w-0 flex-col gap-2x" data-testid="map-search">
      <div className="flex items-center gap-2x">
      <label className="group flex min-w-0 flex-1 items-center gap-2x border-b border-pink/35 pb-1x focus-within:border-blue">
        <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-pink-2" aria-hidden>
          <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          value={query}
          onChange={(e) => {
            onQueryChange(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search places, regions, districts…"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Search places and regions"
          aria-autocomplete="list"
          aria-expanded={showList}
          aria-controls={listId}
          aria-activedescendant={activeId}
          aria-haspopup="listbox"
          className="min-w-0 flex-1 bg-transparent py-1x text-sm text-ink outline-none placeholder:text-faint"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              onQueryChange("");
              setOpen(false);
              inputRef.current?.focus();
            }}
            className="shrink-0 px-1x text-sm text-muted hover:text-pink"
            aria-label="Clear search"
          >
            ✕
          </button>
        ) : null}
      </label>
      {trailing}
      </div>
      <div className="sr-only" role="status" aria-live="polite">
        {status}
      </div>
      {showList ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Search results"
          data-testid="map-search-results"
          className="lvg-search__list max-h-[min(16.5rem,42vh)] overflow-y-auto"
        >
          {hits.length === 0 ? (
            <li role="presentation" className="lvg-search__empty" data-testid="map-search-empty">
              No places match “{q}”. Try a pin, region or district name.
            </li>
          ) : (
            <>
              {hits.map((hit, i) => (
                <li key={hit.id} role="presentation">
                  <button
                    type="button"
                    role="option"
                    id={`${listId}-${hit.id}`}
                    aria-selected={i === current}
                    data-result={hit.kind}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => pick(hit)}
                    className={`lvg-search__option ${i === current ? "lvg-search__option--active" : ""}`}
                  >
                    <span className="min-w-0 truncate">
                      <Highlight text={hit.name} q={q} />
                    </span>
                    <span className="ml-auto shrink-0 text-[10px] text-faint">{hit.subtitle}</span>
                  </button>
                </li>
              ))}
              {total > hits.length ? (
                <li role="presentation" className="lvg-search__more">
                  Showing {hits.length} of {total}. Keep typing to narrow it down
                  {total > SEARCH_RESULT_LIMIT ? ", or open Pins for the full list" : ""}.
                </li>
              ) : null}
            </>
          )}
        </ul>
      ) : null}
    </div>
  );
}
