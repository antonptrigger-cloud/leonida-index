"use client";

import { useMemo, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import type { NewsCategory, SearchEntry } from "@/lib/news/hub";

/*
 * Search box, topic chips and sort for /news. State lives in the URL (?q=&cat=&sort=oldest) so a filtered view
 * can be shared. With no filter the curated page (latest, live trackers, archive) renders as normal, straight from
 * the server HTML; as soon as a filter is set it is swapped for a flat, sorted results list. No extra requests:
 * every entry is already in the page.
 */

type Cat = { id: NewsCategory; label: string; accent: string; count: number };

const EVENT = "nh:url";
const subscribe = (cb: () => void) => {
  window.addEventListener("popstate", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("popstate", cb);
    window.removeEventListener(EVENT, cb);
  };
};
const getSearch = () => window.location.search;
const getServerSearch = () => "";

function setParams(patch: Record<string, string | null>) {
  const p = new URLSearchParams(window.location.search);
  for (const [k, v] of Object.entries(patch)) {
    if (v) p.set(k, v);
    else p.delete(k);
  }
  const qs = p.toString();
  window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
  window.dispatchEvent(new Event(EVENT));
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2018\u2019']/g, "");

const day = new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", timeZone: "Australia/Brisbane" });

export function NewsBrowser({ entries, categories, children }: { entries: SearchEntry[]; categories: Cat[]; children: ReactNode }) {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const params = new URLSearchParams(search);
  const q = params.get("q") ?? "";
  const catParam = params.get("cat");
  const cat = categories.some((c) => c.id === catParam) ? (catParam as NewsCategory) : null;
  const oldest = params.get("sort") === "oldest";
  const active = Boolean(q.trim() || cat || oldest);

  const haystacks = useMemo(
    () => entries.map((e) => norm([e.title, e.crumb, e.teaser, e.description, e.tag, categories.find((c) => c.id === e.category)?.label ?? "", ...e.keywords].join(" "))),
    [entries, categories],
  );

  const results = useMemo(() => {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    const list = entries.filter((e, i) => (!cat || e.category === cat) && terms.every((t) => haystacks[i].includes(t)));
    return oldest ? [...list].reverse() : list;
  }, [entries, haystacks, q, cat, oldest]);

  const catLabel = cat ? categories.find((c) => c.id === cat)?.label : null;

  return (
    <>
      <div className="nb-bar" role="search" aria-label="Search and filter news">
        <div className="nb-bar__row">
          <label className="nb-search">
            <span className="sr-only">Search news</span>
            <svg aria-hidden viewBox="0 0 20 20" width="16" height="16">
              <circle cx="8.5" cy="8.5" r="5.75" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(e) => setParams({ q: e.target.value || null })}
              placeholder="Search news: reviews, PC, servers…"
              autoComplete="off"
              enterKeyHint="search"
            />
          </label>
          <label className="nb-sort">
            <span className="sr-only">Sort</span>
            <select value={oldest ? "oldest" : "newest"} onChange={(e) => setParams({ sort: e.target.value === "oldest" ? "oldest" : null })}>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </label>
        </div>
        <div className="nb-chips" role="group" aria-label="Filter by topic">
          <button type="button" className="nh-chip" data-accent="pink" aria-pressed={!cat} onClick={() => setParams({ cat: null })}>
            All <span>{entries.length}</span>
          </button>
          {categories.map((c) => (
            <button key={c.id} type="button" className="nh-chip" data-accent={c.accent} aria-pressed={cat === c.id} onClick={() => setParams({ cat: cat === c.id ? null : c.id })}>
              {c.label} <span>{c.count}</span>
            </button>
          ))}
        </div>
      </div>

      {active ? (
        <section className="nb-results" aria-labelledby="nb-results-title" aria-live="polite">
          <div className="nb-results__head">
            <h2 id="nb-results-title" className="vc-display text-3xl text-ink md:text-4xl">
              {results.length} {results.length === 1 ? "story" : "stories"}
              {q.trim() ? <> for &ldquo;{q.trim()}&rdquo;</> : null}
              {catLabel ? <> in {catLabel}</> : null}
            </h2>
            <button type="button" className="nb-reset" onClick={() => setParams({ q: null, cat: null, sort: null })}>
              Clear filters
            </button>
          </div>
          {results.length ? (
            <ul className="nb-list">
              {results.map((n) => {
                const c = categories.find((x) => x.id === n.category);
                return (
                  <li key={n.href}>
                    <Link href={n.href} className="nh-row" data-accent={c?.accent ?? "pink"}>
                      <time className="nh-row__date" dateTime={n.published}>
                        {day.format(new Date(n.published))}
                      </time>
                      <span className="nh-pill" data-accent={c?.accent ?? "pink"}>
                        {c?.label ?? n.tag}
                      </span>
                      <span className="nh-row__text">
                        <span className="nh-row__title">{n.title}</span>
                        <span className="nh-row__teaser">{n.teaser}</span>
                      </span>
                      <span className="nh-row__arrow" aria-hidden>
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="nb-empty">
              Nothing matches yet. Try a shorter word, another topic, or{" "}
              <button type="button" className="nb-reset nb-reset--inline" onClick={() => setParams({ q: null, cat: null, sort: null })}>
                show everything
              </button>
              .
            </p>
          )}
        </section>
      ) : (
        children
      )}
    </>
  );
}
