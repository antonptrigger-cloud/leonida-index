/**
 * Data layer for the /news index: derives categories, the lead story, top stories, live trackers
 * and the dated Archive from NEWS. Nothing here is hand-listed per article, so a new entry in
 * articles.ts lands in the right place without edits (see the optional fields on NewsItem).
 */
import { NEWS, newsPath, type NewsCategory, type NewsItem } from "./articles";

export type { NewsCategory };
export type Accent = "pink" | "orange" | "turq" | "blue" | "cobalt" | "violet" | "cream";

export const CATEGORIES: { id: NewsCategory; label: string; accent: Accent }[] = [
  { id: "launch", label: "Launch", accent: "pink" },
  { id: "servers", label: "Servers & patches", accent: "turq" },
  { id: "reviews", label: "Reviews", accent: "orange" },
  { id: "sales", label: "Sales", accent: "cream" },
  { id: "events", label: "Events", accent: "blue" },
  { id: "streamers", label: "Streamers", accent: "violet" },
  { id: "platforms", label: "Platforms & PC", accent: "cobalt" },
  { id: "music", label: "Music", accent: "pink" },
  { id: "glitches", label: "Glitches", accent: "turq" },
  { id: "traffic", label: "Traffic records", accent: "orange" },
];

/** Default category from the article's `tag`. Unknown tags fall back to "launch". */
const TAG_CATEGORY: Record<string, NewsCategory> = {
  "launch night": "launch",
  countdown: "launch",
  explainer: "launch",
  online: "launch",
  "live tracker": "servers",
  patches: "servers",
  servers: "servers",
  reviews: "reviews",
  sales: "sales",
  "launch events": "events",
  events: "events",
  streamers: "streamers",
  platforms: "platforms",
  performance: "platforms",
  guide: "platforms",
  music: "music",
  album: "music",
  glitches: "glitches",
  glitch: "glitches",
  traffic: "traffic",
};

export const categoryOf = (n: NewsItem): NewsCategory => n.category ?? TAG_CATEGORY[n.tag.toLowerCase()] ?? "launch";
export const categoryMeta = (id: NewsCategory) => CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];

/** Reference pages that live under /news but are not in NEWS. */
export const REFERENCE_PAGES = [
  {
    href: "/news/release-date",
    crumb: "Release date and platforms",
    teaser: "Reference: 19 November, PS5 and Xbox Series X|S, preload and price.",
    tag: "Reference",
    category: "platforms" as NewsCategory,
    updated: "2026-11-18T22:35:00+10:00",
  },
];

export interface IndexEntry {
  href: string;
  crumb: string;
  title: string;
  teaser: string;
  description: string;
  tag: string;
  category: NewsCategory;
  published: string;
  updated: string;
  live: boolean;
}

const entry = (n: NewsItem): IndexEntry => ({
  href: newsPath(n.slug),
  crumb: n.crumb,
  title: n.title,
  teaser: n.teaser,
  description: n.description,
  tag: n.tag,
  category: categoryOf(n),
  published: n.published,
  updated: n.updated,
  live: Boolean(n.live),
});

const ms = (iso: string) => new Date(iso).getTime();
/** Newest first. Array order breaks ties, so newer entries added near the top win. */
const byPublishedDesc = (a: NewsItem, b: NewsItem) => ms(b.published) - ms(a.published);

export const TOP_STORY_COUNT = 3;

export type ArchiveGroupId = "today" | "week" | "earlier";
export const GROUP_LABEL: Record<ArchiveGroupId, string> = { today: "Today", week: "This week", earlier: "Earlier" };

/** Calendar day in Brisbane time as YYYY-MM-DD (en-CA formats ISO style). */
const dayKey = (d: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Brisbane" }).format(d);

export function groupFor(updatedOrPublished: string, now: Date): ArchiveGroupId {
  const today = dayKey(now);
  const day = dayKey(new Date(updatedOrPublished));
  if (day === today) return "today";
  const diffDays = Math.round((ms(`${today}T00:00:00+10:00`) - ms(`${day}T00:00:00+10:00`)) / 86_400_000);
  return diffDays < 7 ? "week" : "earlier";
}

export function buildNewsIndex(now: Date = new Date()) {
  const stories = NEWS.filter((n) => !n.live && !n.archived).sort(byPublishedDesc);
  const lead = stories[0];
  const rest = stories.slice(1);
  // Pinned stories first (newest first), then the newest of the rest, up to TOP_STORY_COUNT.
  const top = [...rest.filter((n) => n.pinned), ...rest.filter((n) => !n.pinned)].slice(0, TOP_STORY_COUNT);
  const live = NEWS.filter((n) => n.live).sort((a, b) => ms(b.updated) - ms(a.updated));

  const shown = new Set([lead, ...top, ...live].filter(Boolean).map((n) => n.slug));
  const archive = NEWS.filter((n) => !shown.has(n.slug)).sort(byPublishedDesc).map(entry);
  for (const r of REFERENCE_PAGES) {
    archive.push({ href: r.href, crumb: r.crumb, title: r.crumb, teaser: r.teaser, description: r.teaser, tag: r.tag, category: r.category, published: r.updated, updated: r.updated, live: false });
  }
  archive.sort((a, b) => ms(b.published) - ms(a.published));

  const groups = (["today", "week", "earlier"] as ArchiveGroupId[])
    .map((id) => ({ id, label: GROUP_LABEL[id], items: archive.filter((e) => groupFor(e.published, now) === id) }))
    .filter((g) => g.items.length);

  const archiveCounts = CATEGORIES.map((c) => ({ ...c, count: archive.filter((e) => e.category === c.id).length })).filter((c) => c.count > 0);

  const latestUpdate = NEWS.map((n) => n.updated).sort().at(-1) ?? "";

  return {
    lead: lead ? entry(lead) : undefined,
    top: top.map(entry),
    live: live.map(entry),
    groups,
    archiveCounts,
    archiveTotal: archive.length,
    total: NEWS.length + REFERENCE_PAGES.length,
    latestUpdate,
  };
}

const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Australia/Brisbane" });
const dayMonth = new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", timeZone: "Australia/Brisbane" });

/** "09:08" in Brisbane time. */
export const clock = (iso: string) => time.format(new Date(iso));
/** "19 Nov". */
export const shortDate = (iso: string) => dayMonth.format(new Date(iso));
/** "Updated 09:08 AEST" today, "Updated 18 Nov 23:50 AEST" otherwise. */
export function updatedLabel(iso: string, now: Date): string {
  return groupFor(iso, now) === "today" ? `Updated ${clock(iso)} AEST` : `Updated ${shortDate(iso)} ${clock(iso)} AEST`;
}
