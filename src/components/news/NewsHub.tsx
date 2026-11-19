import { Fragment } from "react";
import Link from "next/link";
import "./news-hub.css";
import { categoryMeta, clock, shortDate, updatedLabel, type Accent, type IndexEntry, type NewsCategory } from "@/lib/news/hub";

/*
 * Building blocks for the /news index ("newsroom wire" look): ticker, jump bar, lead card, top-story list,
 * live-tracker cards, archive with CSS-only topic filter. Self-contained (own `nh-` classes, no client JS) so it can
 * be unified with the /guides hub components later. All server components.
 */

/** Numbered section heading, same pattern as the homepage and /guides hub ("01 / kicker / big title"). */
export function NewsSectionTitle({ id, num, kicker, title, children }: { id: string; num: string; kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8x flex flex-col gap-4x md:mb-10x md:flex-row md:items-end md:justify-between">
      <div className="vc-section-title">
        <span data-num aria-hidden>
          {num}
        </span>
        <div>
          <p className="vc-kicker">{kicker}</p>
          <h2 id={id} className="vc-heading mt-2x text-[clamp(2.6rem,6.5vw,4.75rem)]">
            {title}
          </h2>
        </div>
      </div>
      {children ? <p className="max-w-[36ch] text-sm leading-relaxed text-muted md:text-right">{children}</p> : null}
    </div>
  );
}

/** Scrolling headline strip. Purely decorative (aria-hidden, not focusable): every headline is also a real link below. */
export function Ticker({ items }: { items: { label: string; text: string }[] }) {
  if (!items.length) return null;
  const run = (hidden: boolean) => (
    <ul className="nh-ticker__run" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <li key={`${t.text}-${i}`}>
          <b>{t.label}</b> {t.text}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="nh-ticker" aria-hidden>
      <span className="nh-ticker__tag">
        <i /> Latest
      </span>
      <div className="nh-ticker__track">
        <div className="nh-ticker__belt">
          {run(false)}
          {run(true)}
        </div>
      </div>
    </div>
  );
}

export function NewsJump({ items }: { items: { id: string; num: string; label: string; accent: Accent }[] }) {
  return (
    <nav className="nh-jump" aria-label="Jump to a section">
      <ul>
        {items.map((n) => (
          <li key={n.id}>
            <a href={`#${n.id}`} className="nh-jump__chip" data-accent={n.accent}>
              <span aria-hidden>{n.num}</span> {n.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Pill({ category, label }: { category: NewsCategory; label?: string }) {
  const c = categoryMeta(category);
  return (
    <span className="nh-pill" data-accent={c.accent}>
      {label ?? c.label}
    </span>
  );
}

/** Big "Latest" card. The art panel is a CSS colour-bar test card showing the publish time. */
export function LeadCard({ item }: { item: IndexEntry }) {
  const c = categoryMeta(item.category);
  return (
    <Link href={item.href} className="nh-lead" data-accent={c.accent}>
      <span className="nh-lead__body">
        <span className="nh-lead__art" aria-hidden>
          <span className="nh-bars" />
          <span className="nh-lead__clock">
            <em>Posted</em>
            <strong>{clock(item.published)}</strong>
            <small>AEST · {shortDate(item.published)}</small>
          </span>
          <span className="nh-lead__badge">Latest</span>
        </span>
        <span className="nh-lead__copy">
          <span className="nh-lead__meta">
            <Pill category={item.category} label={item.tag} />
            <time dateTime={item.published}>
              {shortDate(item.published)} · {clock(item.published)} AEST
            </time>
          </span>
          <span className="vc-display nh-lead__title">{item.title}</span>
          <span className="nh-lead__desc">{item.description}</span>
          <span className="nh-go">
            Read the report <span aria-hidden>→</span>
          </span>
        </span>
      </span>
    </Link>
  );
}

/** Numbered secondary stories beside the lead card. */
export function TopList({ items, startAt = 2 }: { items: IndexEntry[]; startAt?: number }) {
  return (
    <ol className="nh-top">
      {items.map((n, i) => {
        const c = categoryMeta(n.category);
        return (
          <li key={n.href}>
            <Link href={n.href} className="nh-top__row" data-accent={c.accent}>
              <span className="nh-top__num" aria-hidden>
                {String(i + startAt).padStart(2, "0")}
              </span>
              <span className="nh-top__text">
                <span className="nh-top__meta">
                  <Pill category={n.category} label={n.tag} />
                  <time dateTime={n.published}>
                    {shortDate(n.published)} · {clock(n.published)}
                  </time>
                </span>
                <span className="vc-display nh-top__title">{n.title}</span>
                <span className="nh-top__teaser">{n.teaser}</span>
              </span>
              <span className="nh-top__arrow" aria-hidden>
                →
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

/** Live/evergreen tracker cards with an "Updated HH:MM AEST" badge. `now` decides "today" vs a dated label. */
export function LiveStrip({ items, now }: { items: IndexEntry[]; now: Date }) {
  return (
    <ul className="nh-live">
      {items.map((n) => {
        const c = categoryMeta(n.category);
        return (
          <li key={n.href}>
            <Link href={n.href} className="nh-live__card" data-accent={c.accent}>
              <span className="nh-live__body">
                <span className="nh-live__strip">
                  <span className="nh-live__on">
                    <i aria-hidden /> Live
                  </span>
                  <span>{n.tag}</span>
                </span>
                <span className="vc-display nh-live__title">{n.crumb}</span>
                <span className="nh-live__teaser">{n.teaser}</span>
                <span className="nh-live__foot">
                  <time className="nh-badge" dateTime={n.updated}>
                    {updatedLabel(n.updated, now)}
                  </time>
                  <span className="nh-go">
                    Open <span aria-hidden>→</span>
                  </span>
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Archive: dense dated rows grouped Today / This week / Earlier, with topic chips.
 * The filter is CSS only (radio inputs + :has in news-hub.css), so it works with no JavaScript.
 */
export function Archive({
  groups,
  counts,
  total,
}: {
  groups: { id: string; label: string; items: IndexEntry[] }[];
  counts: { id: NewsCategory; label: string; accent: Accent; count: number }[];
  total: number;
}) {
  return (
    <div className="nh-archive">
      <fieldset className="nh-filter">
        <legend className="sr-only">Filter the archive by topic</legend>
        <input type="radio" name="nh-topic" id="nh-f-all" className="nh-filter__input" defaultChecked />
        <label htmlFor="nh-f-all" className="nh-chip" data-accent="pink">
          All <span>{total}</span>
        </label>
        {counts.map((c) => (
          <Fragment key={c.id}>
            <input type="radio" name="nh-topic" id={`nh-f-${c.id}`} className="nh-filter__input" />
            <label htmlFor={`nh-f-${c.id}`} className="nh-chip" data-accent={c.accent}>
              {c.label} <span>{c.count}</span>
            </label>
          </Fragment>
        ))}
      </fieldset>

      {groups.map((g) => (
        <section key={g.id} className="nh-group" aria-labelledby={`nh-g-${g.id}`}>
          <h3 id={`nh-g-${g.id}`} className="nh-group__title">
            {g.label}
          </h3>
          <ul>
            {g.items.map((n) => {
              const c = categoryMeta(n.category);
              return (
                <li key={n.href} data-cat={n.category}>
                  <Link href={n.href} className="nh-row" data-accent={c.accent}>
                    <time className="nh-row__date" dateTime={n.published}>
                      {shortDate(n.published)}
                    </time>
                    <Pill category={n.category} label={n.tag} />
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
        </section>
      ))}
    </div>
  );
}
