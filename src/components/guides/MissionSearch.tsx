"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { HIDDEN_MISSION_LABEL, matchMissions, type MissionSearchItem } from "@/lib/guides/mission-search";

export function MissionSearch({ items }: { items: MissionSearchItem[] }) {
  const inputId = useId();
  const listId = useId();
  const statusId = useId();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const activeRef = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => matchMissions(items, query), [items, query]);
  const searching = query.trim().length > 0;

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  const clear = () => {
    setQuery("");
    setActive(0);
    inputRef.current?.focus();
  };

  const openActive = () => {
    const item = results[active] ?? results[0];
    if (item?.href) router.push(item.href);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searching) openActive();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      if (query) {
        e.preventDefault();
        clear();
      }
      return;
    }
    if (!searching || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(results.length - 1);
    }
  };

  const activeId = searching && results[active] ? `${listId}-${results[active].id}` : undefined;
  const status = !searching
    ? ""
    : results.length === 0
      ? "No missions match"
      : `${results.length} ${results.length === 1 ? "mission" : "missions"} found`;

  return (
    <div className="vc-mission-search">
      <form role="search" onSubmit={onSubmit}>
        <label htmlFor={inputId} className="block text-sm font-semibold text-ink">
          Search missions
        </label>
        <div className="vc-mission-search__field mt-3x">
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Name, or ch3 m22"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="search"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={searching}
            aria-controls={listId}
            aria-activedescendant={activeId}
            aria-describedby={statusId}
            className="vc-mission-search__input"
          />
          {query ? (
            <button type="button" className="vc-chip vc-mission-search__clear" onClick={clear} aria-label="Clear search">
              Clear
            </button>
          ) : null}
        </div>
      </form>

      <div id={statusId} className="sr-only" aria-live="polite">
        {status}
      </div>

      <div id={listId} className="mt-4x" hidden={!searching}>
        {searching && results.length === 0 ? (
          <p className="text-ink-2" role="status">
            No missions match &ldquo;{query.trim()}&rdquo;. Try a name, or a chapter and number such as &ldquo;ch3 m22&rdquo;.
          </p>
        ) : null}
        {searching && results.length > 0 ? (
          <>
            <p className="mb-3x text-sm text-muted" aria-hidden>
              {status}
            </p>
            <ul role="listbox" aria-label="Matching missions" className="flex flex-col border-t border-pink/20">
              {results.map((item, i) => {
                const selected = i === active;
                const meta = (
                  <span className="mt-1x block text-[0.8rem] text-muted">
                    Chapter {item.chapter}, mission {item.chapterOrder}
                    {item.optional ? <span className="text-faint"> · optional per PowerPyx</span> : null}
                    {item.name == null ? <span className="text-faint"> · {HIDDEN_MISSION_LABEL}</span> : null}
                    {item.href ? null : <span className="text-faint"> · Guide coming soon</span>}
                    <span className="text-faint"> · overall {item.overall}</span>
                  </span>
                );
                const title = (
                  <span className="vc-display block text-[1.75rem] leading-none text-ink">{item.displayName}</span>
                );
                const num = <span className="vc-index-row__num">{String(item.chapterOrder).padStart(2, "0")}</span>;
                const className = `vc-index-row${selected ? " vc-mission-search__option--active" : ""}${item.href ? "" : " !cursor-default"}`;
                return (
                  <li
                    key={item.id}
                    id={`${listId}-${item.id}`}
                    role="option"
                    aria-selected={selected}
                    aria-disabled={!item.href}
                    ref={selected ? (el) => { activeRef.current = el; } : undefined}
                  >
                    {item.href ? (
                      <Link href={item.href} className={className} tabIndex={-1} onMouseEnter={() => setActive(i)}>
                        {num}
                        <span className="relative">
                          {title}
                          {meta}
                        </span>
                        <span className="vc-index-row__arrow relative text-xl" aria-hidden>
                          →
                        </span>
                      </Link>
                    ) : (
                      <div className={className} onMouseEnter={() => setActive(i)}>
                        {num}
                        <span className="relative">
                          {title}
                          {meta}
                        </span>
                        <span aria-hidden />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
}
