import Link from "next/link";
import "./news-hub.css";
import { HubGrid } from "@/components/hub/HubGrid";
import { categoryMeta, clock, shortDate, updatedLabel, type IndexEntry, type NewsCategory } from "@/lib/news/hub";

/*
 * Building blocks for the /news index: lead card (official screenshot), top-story list, live-tracker
 * cards and the dated archive. Search, topic chips and sort are in NewsBrowser. Section titles, the jump bar and the card grid come from the shared
 * src/components/hub/ set (so /guides and /news match); everything here is news-specific (`nh-` classes, no client JS).
 * The page wrapper needs both `gh-hub` (shared accent vars, section rhythm) and `nh-hub`.
 */

function Pill({ category, label }: { category: NewsCategory; label?: string }) {
  const c = categoryMeta(category);
  return (
    <span className="nh-pill" data-accent={c.accent}>
      {label ?? c.label}
    </span>
  );
}

/** Official screenshot per topic for the lead card (files in /public/backgrounds, with -md and -sm sizes). */
const LEAD_ART: Record<NewsCategory, { file: string; alt: string }> = {
  launch: { file: "official-marina", alt: "Vice City marina and skyline" },
  servers: { file: "official-sunset", alt: "Vice City at dusk" },
  reviews: { file: "official-keys", alt: "A seaplane over the Leonida Keys" },
  sales: { file: "official-marina", alt: "Vice City marina and skyline" },
  events: { file: "official-sunset", alt: "Vice City at dusk" },
  streamers: { file: "official-sunset", alt: "Vice City at dusk" },
  platforms: { file: "official-keys", alt: "A seaplane over the Leonida Keys" },
  music: { file: "official-sunset", alt: "Vice City at dusk" },
  glitches: { file: "official-swamp", alt: "The Grassrivers from the air" },
  traffic: { file: "official-swamp", alt: "The Grassrivers from the air" },
};

/** Big "Latest" card: official screenshot on top, then the headline. */
export function LeadCard({ item }: { item: IndexEntry }) {
  const c = categoryMeta(item.category);
  const art = LEAD_ART[item.category] ?? LEAD_ART.launch;
  const base = `/backgrounds/${art.file}`;
  return (
    <Link href={item.href} className="nh-lead" data-accent={c.accent}>
      <span className="nh-lead__body">
        <span className="nh-lead__art">
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized static WebP set */}
          <img
            src={`${base}-md.webp`}
            srcSet={`${base}-sm.webp 720w, ${base}-md.webp 1080w, ${base}.webp 1600w`}
            sizes="(min-width: 1152px) 660px, (min-width: 768px) 58vw, 100vw"
            width={1080}
            height={608}
            alt=""
            loading="lazy"
            decoding="async"
            className="nh-lead__img"
          />
          <span className="nh-lead__badge">Latest</span>
          <span className="nh-lead__credit">© Rockstar Games</span>
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
    <HubGrid count={items.length}>
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
    </HubGrid>
  );
}

/** Archive: dense dated rows grouped Today / This week / Earlier. Search and topic filters live in NewsBrowser. */
export function Archive({ groups }: { groups: { id: string; label: string; items: IndexEntry[] }[] }) {
  return (
    <div className="nh-archive">
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
                    <Pill category={n.category} />
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
