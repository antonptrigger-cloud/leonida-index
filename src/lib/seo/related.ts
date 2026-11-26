/**
 * Related-content engine for internal linking.
 *
 * Every indexable article, guide, character, news story and map region becomes an item
 * with a set of tags derived from data we already have (names, teasers, keywords,
 * character relationships, ROUTES descriptions). Tags are:
 *   char:<slug>   a profiled character is mentioned
 *   loc:<slug>    a map region is mentioned (slug = its /map/<slug> page)
 *   topic:<name>  a topic keyword (police, cars, editions, ...)
 *
 * Page text is only scanned from copy that is visible by default (titles, teasers,
 * intros, summaries), never from spoiler-gated fields.
 *
 * Scoring is IDF-weighted, so a tag shared by almost everything (e.g. "Lucia") counts
 * for less than a rare one. `relatedFor(path)` mixes sections: two from the page's own
 * section, then the best character / map / guide / news match, then the strongest
 * leftovers, and falls back to the latest in-section items. It never links to itself and
 * only returns routes registered (and indexable) in ROUTES. No map files are imported.
 */
import { MISSIONS, missionPath } from "@/lib/guides/missions";
import { NEWS, newsPath } from "@/lib/news/articles";
import { CHARACTERS, characterPath } from "@/lib/characters/characters";
import { cardAllowed, introChapter } from "@/lib/spoiler-characters";
import { CAST_PATH } from "@/lib/characters/cast";
import { REFERENCE_PAGES } from "@/lib/database/reference";
import { ROUTES } from "./site";

export type Section = "map" | "guide" | "news" | "character";

export interface RelatedItem {
  href: string;
  /** Link text. */
  title: string;
  /** Small label above the title, e.g. "Mission guide". */
  label: string;
  section: Section;
  /** One safe line (omitted for spoiler-adjacent sections). */
  blurb?: string;
}

interface Item extends RelatedItem {
  /** Slug of the profile this item is the card for (character items only). */
  charSlug?: string;
  /** Section hubs are never ranked; they are pinned by explicit rules in relatedFor(). */
  hub?: boolean;
  tags: Set<string>;
  /** Sortable recency (ISO string); newer sorts first. */
  date: string;
}

/** Map regions (their pages live under /map; this file only links to them). */
const LOCATIONS: { slug: string; re: RegExp }[] = [
  { slug: "vice-city", re: /\bVice City\b/i },
  { slug: "leonida-keys", re: /\b(Leonida )?Keys\b/ },
  { slug: "grassrivers", re: /\bGrassrivers?\b/i },
  { slug: "port-gellhorn", re: /\bPort Gellhorn\b/i },
  { slug: "ambrosia", re: /\bAmbrosia\b/i },
  { slug: "mount-kalaga", re: /\b(Mount )?Kalaga\b/i },
];

/** Names a character is referred to by in prose. Case-sensitive, word-bounded. */
const ALIASES: Record<string, string[]> = {
  "lucia-caminos": ["Lucia"],
  "jason-duval": ["Jason"],
  "cal-hampton": ["Cal Hampton", "Cal"],
  "brian-heder": ["Brian Heder", "Brian"],
  "boobie-ike": ["Boobie Ike", "Boobie"],
  "dre-quan-priest": ["Dre'Quan", "Dre\u2019Quan"],
  "raul-bautista": ["Raul"],
  "real-dimez": ["Real Dimez"],
  lori: ["Lori"],
  kenton: ["Kenton"],
  moses: ["Moses"],
  randy: ["Randy"],
  dunk: ["Dunk"],
  tyrone: ["Tyrone"],
};

const TOPICS: { name: string; re: RegExp }[] = [
  { name: "police", re: /\b(wanted|police|cops?|hollow stars?)\b/i },
  { name: "cars", re: /\b(steal(ing)?|hot-?wir\w+|key cloner|cars?)\b/i },
  { name: "editions", re: /\b(editions?|ultimate|standard|pre-?order|price|pricing|preload)\b/i },
  { name: "reviews", re: /\b(reviews?|metacritic)\b/i },
  { name: "streaming", re: /\b(streamers?|streams?|streaming|viewership|twitch)\b/i },
  { name: "console", re: /\b(PS5|PlayStation|Xbox|update|patch(es)?|servers?)\b/i },
  { name: "launch", re: /\b(unlock|launch|release|countdown|midnight)\b/i },
  { name: "activities", re: /\b(fishing|diving|dive|scuba|jet skis?|activities|basketball|mini golf|wildlife)\b/i },
  { name: "secrets", re: /\b(secrets?|easter eggs?)\b/i },
  { name: "money", re: /\b(money|cash|payouts?|vaults?|heists?)\b/i },
  { name: "cheats", re: /\b(cheats?)\b/i },
  { name: "trophies", re: /\b(trophy|trophies|platinum|achievements?)\b/i },
  { name: "collectibles", re: /\b(collectibles?|card sets?|WAiNK)\b/i },
  { name: "story", re: /\b(missions?|walkthroughs?|chapters?)\b/i },
  { name: "online", re: /\b(online|multiplayer|co-?op)\b/i },
  { name: "pc", re: /\b(PC|Steam|Game Pass|cloud)\b/ },
  { name: "sales", re: /\b(sales?|sold|million|revenue|units)\b/i },
  { name: "traffic", re: /\b(traffic|NBN|DE-CIX|bandwidth)\b/i },
  { name: "music", re: /\b(album|tracklist|soundtrack)\b/i },
  { name: "glitches", re: /\b(glitch(?:es)?|first-person)\b/i },
  { name: "nightlife", re: /\b(strip clubs?|private dances?|NINE1NINE|Cabaret)\b/i },
  { name: "weapons", re: /\b(weapons?|guns?|Ammu-Nation|loadouts?|sidearms?|longarms?)\b/i },
];

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const ALIAS_RES = Object.entries(ALIASES).map(([slug, names]) => ({
  slug,
  re: new RegExp(`(?<![\\w])(${names.map(esc).join("|")})(?![\\w])`),
}));

function tagsFromText(text: string): Set<string> {
  const tags = new Set<string>();
  for (const { slug, re } of ALIAS_RES) if (re.test(text)) tags.add(`char:${slug}`);
  for (const { slug, re } of LOCATIONS) if (re.test(text)) tags.add(`loc:${slug}`);
  for (const { name, re } of TOPICS) if (re.test(text)) tags.add(`topic:${name}`);
  return tags;
}

const MAP_LABEL: Record<string, string> = {
  "/map": "Interactive map",
};

function buildItems(): Item[] {
  const items: Item[] = [];

  // Missions: scan only visible-by-default copy.
  for (const m of MISSIONS) {
    const text = [m.name, m.teaser, ...m.intro, ...m.facts.map((f) => `${f.label} ${f.value}`)].join(" ");
    items.push({
      href: missionPath(m.slug),
      title: m.name,
      label: `Mission guide ${String(m.order).padStart(2, "0")}`,
      section: "guide",
      blurb: "Step-by-step walkthrough. Story details stay blurred until you reveal them.",
      tags: tagsFromText(text),
      date: "2026-11-18",
    });
  }

  // Static guides and tools: from their registry copy.
  const GUIDE_PATHS = ["/guides/beginner", "/guides/wanted", "/guides/stealing-cars", "/guides/activities", "/guides/money", "/guides/cheats", "/guides/trophies", "/guides/collectibles", "/guides/strangers-and-freaks", "/guides/bigfoot-skunk-ape", "/guides/secret-vehicles", "/guides/chapter-3-side-job-locations", "/guides/map-size", "/guides/fast-travel", "/guides/garages", "/guides/saving", "/guides/switch-characters", "/guides/change-clothes", "/guides/first-person", "/guides/relationship", "/guides/difficulty", "/guides/strip-clubs", "/guides/weapons", "/tools/edition-compare"];
  for (const href of GUIDE_PATHS) {
    const r = ROUTES[href];
    if (!r) continue;
    items.push({
      href,
      title: r.crumb,
      label: href.startsWith("/tools") ? "Tool" : "Guide",
      section: "guide",
      blurb: r.description,
      tags: tagsFromText(`${r.title} ${r.description}`),
      date: r.updated ?? "2026-11-18",
    });
  }

  // Secrets hub and entries. Same section as guides so they share related slots.
  const SECRET_PATHS = ["/secrets", "/secrets/ufo", "/secrets/skunk-ape", "/secrets/easter-eggs", "/secrets/strip-clubs", "/secrets/money", "/secrets/collectibles", "/secrets/hidden-locations"];
  for (const href of SECRET_PATHS) {
    const r = ROUTES[href];
    if (!r || r.noindex) continue;
    items.push({
      href,
      title: r.crumb,
      label: href === "/secrets" ? "Secrets hub" : "Secrets",
      section: "guide",
      blurb: r.description,
      tags: tagsFromText(`${r.title} ${r.description}`),
      date: r.updated ?? "2026-11-22",
      hub: href === "/secrets",
    });
  }

  // News: title, description, teaser, tag and keywords.
  for (const n of NEWS) {
    items.push({
      href: newsPath(n.slug),
      title: n.crumb,
      label: `News · ${n.tag}`,
      section: "news",
      blurb: n.teaser,
      tags: tagsFromText([n.title, n.description, n.teaser, n.tag, ...n.keywords].join(" ")),
      date: n.published,
    });
  }
  const rd = ROUTES["/news/release-date"];
  if (rd) {
    items.push({
      href: "/news/release-date",
      title: rd.crumb,
      label: "News · Reference",
      section: "news",
      blurb: rd.description,
      tags: tagsFromText(`${rd.title} ${rd.description}`),
      date: "2026-11-01",
    });
  }

  // Characters: own tag, relationships, and locations/topics from non-spoiler copy.
  for (const c of CHARACTERS) {
    const tags = tagsFromText([c.summary, ...c.background, ...c.facts.map((f) => `${f.label} ${f.value}`)].join(" "));
    // Strip incidental character mentions, then add the explicit identity + relationship tags.
    for (const t of [...tags]) if (t.startsWith("char:")) tags.delete(t);
    tags.add(`char:${c.slug}`);
    for (const rel of c.relationships) if (rel.slug) tags.add(`char:${rel.slug}`);
    items.push({
      href: characterPath(c.slug),
      title: c.name,
      label: `Character · ${c.role}`,
      section: "character",
      blurb: c.summary,
      charSlug: c.slug,
      tags,
      date: "2026-11-18",
    });
  }

  // Cast evidence page: about the people behind Lucia, Jason and Brian.
  const cast = ROUTES[CAST_PATH];
  if (cast) {
    const tags = tagsFromText(`${cast.title} ${cast.description}`);
    for (const slug of ["lucia-caminos", "jason-duval", "brian-heder"]) tags.add(`char:${slug}`);
    items.push({
      href: CAST_PATH,
      title: cast.crumb,
      label: "Character · Cast",
      section: "character",
      blurb: cast.description,
      tags,
      date: "2026-11-18",
    });
  }

  // Database reference pages (vehicles, weapons, radio): from their registry copy.
  for (const page of REFERENCE_PAGES) {
    const r = ROUTES[page.path];
    if (!r) continue;
    items.push({
      href: page.path,
      title: r.crumb,
      label: "Database",
      section: "guide",
      blurb: r.description,
      tags: tagsFromText(`${r.title} ${r.description}`),
      date: r.updated ?? "2026-11-18",
    });
  }

  // Section hubs, pinned by rule (see relatedFor): all missions for mission pages, all guides for news.
  items.push(
    { href: "/guides/missions", title: "All missions in order", label: "Walkthrough hub", section: "guide", blurb: "Every story mission in order, with walkthroughs as they go live.", hub: true, tags: new Set(), date: "" },
    { href: "/guides", title: "All guides", label: "Guides hub", section: "guide", blurb: "Missions, money, trophies, the wanted system and more.", hub: true, tags: new Set(), date: "" },
  );

  // Map pages: linked to, never modified. Tagged with their own region.
  for (const [href, r] of Object.entries(ROUTES)) {
    if (!href.startsWith("/map") || r.noindex || href === "/map/leaderboard") continue;
    const slug = href.split("/")[2];
    const tags = tagsFromText(r.description);
    tags.add(slug ? `loc:${slug}` : "topic:secrets");
    items.push({
      href,
      title: r.crumb,
      label: MAP_LABEL[href] ?? "Map",
      section: "map",
      blurb: r.description,
      tags,
      date: "2026-11-18",
    });
  }
  return items;
}

let cache: { items: Item[]; idf: Map<string, number> } | undefined;
function index() {
  if (cache) return cache;
  const items = buildItems();
  const df = new Map<string, number>();
  for (const it of items) for (const t of it.tags) df.set(t, (df.get(t) ?? 0) + 1);
  const idf = new Map<string, number>();
  for (const [t, n] of df) idf.set(t, Math.log(1 + items.length / n));
  cache = { items, idf };
  return cache;
}

/** Locations and characters are the strongest signals; topics are weaker. */
const WEIGHT = { char: 1.5, loc: 1.5, topic: 1 } as const;

function score(a: Item, b: Item, idf: Map<string, number>): number {
  let s = 0;
  for (const t of a.tags) {
    if (!b.tags.has(t)) continue;
    s += (idf.get(t) ?? 1) * WEIGHT[t.split(":")[0] as keyof typeof WEIGHT];
  }
  return s;
}

/**
 * Guides a news story should send readers to, in order. Set by hand because a story's own words
 * rarely name the guide a reader needs next. Stories not listed fall back to the best topic match,
 * then to the guides hub. Keys are /news/<slug> paths; values must be registered guide routes
 * (checked by `npm run seo:audit`).
 */
export const NEWS_GUIDES: Record<string, string[]> = {
  "/news/gta-6-live-new-zealand-launch-report": ["/guides/beginner", "/guides/missions"],
  "/news/gta-6-reviews-metacritic-99": ["/guides/missions", "/guides/beginner"],
  "/news/gta-6-ps5-update-patches-servers": ["/guides/beginner"],
  "/news/gta-6-release-countdown": ["/guides/beginner", "/guides/missions"],
  "/news/gta-6-confirmed-so-far": ["/guides/beginner", "/guides/wanted", "/guides/activities"],
  "/news/gta-6-preload-editions-pricing": ["/tools/edition-compare", "/guides/beginner"],
  "/news/release-date": ["/tools/edition-compare", "/guides/beginner"],
  "/news/n3on-new-zealand-gta-6-stream": ["/guides/missions", "/guides/beginner"],
  "/news/gta-6-streaming-viewership-peak": ["/guides/missions", "/guides/beginner"],
  "/news/gta-6-launch-streams-schedule": ["/guides/missions", "/guides/beginner"],
  "/news/streamers-new-zealand-trick-warnings": ["/guides/beginner", "/guides/missions"],
  "/news/gta-6-performance-ps5-pro-xbox": ["/guides/beginner"],
  "/news/gta-6-pc-release-status": ["/guides/beginner"],
  "/news/gta-6-game-pass-ps-plus-cloud": ["/guides/beginner"],
  "/news/gta-6-file-size-time-to-beat": ["/guides/missions", "/guides/trophies", "/guides/beginner"],
  "/news/gta-6-online-release-date": ["/guides/missions", "/guides/beginner"],
  "/news/gta-6-festival-set-times-heat-night": ["/guides/beginner", "/guides/activities"],
  "/news/gta-6-sales-17-million-sensor-tower": ["/guides/beginner", "/guides/missions"],
  "/news/gta-6-age-rating": ["/guides/beginner", "/tools/edition-compare"],
  "/news/gta-6-gta-plus-story-perks": ["/guides/money", "/tools/edition-compare"],
  "/news/gta-6-nbn-australia-traffic-record": ["/guides/beginner", "/tools/edition-compare"],
  "/news/gta-6-internet-traffic-record-de-cix": ["/guides/beginner", "/tools/edition-compare"],
  "/news/gta-6-game-awards-nominations": ["/database/characters/cast", "/guides/beginner"],
  "/news/gta-6-no-prostitutes-rockstar": ["/guides/relationship", "/guides/strip-clubs", "/guides/wanted"],
  "/news/gta-6-army-reenlistment-four-day-pass": ["/database/characters/jason-duval", "/guides/beginner", "/guides/missions"],
  "/news/gta-6-the-album-tracklist": ["/database/radio-stations", "/guides/beginner", "/guides/activities"],
  "/news/gta-6-first-person-glitch": ["/guides/first-person", "/guides/saving", "/guides/beginner"],
  "/news/gta-6-bank-vaults-how-to-open": ["/guides/money", "/guides/wanted", "/guides/trophies"],
  "/news/gta-6-vice-city-portal-easter-egg": ["/guides/beginner", "/guides/cheats", "/guides/secret-vehicles"],
  "/news/gta-6-mario-luigi-hats-easter-egg": ["/guides/change-clothes", "/guides/beginner", "/guides/secret-vehicles"],
};

/** Fewest related links a content page may end up with (also enforced by `npm run seo:audit`). */
export const MIN_LINKS = 4;

const SECTION_ORDER: Section[] = ["character", "map", "guide", "news"];

/** Drop internal scoring fields. Missions get a generic blurb, never their teasers (light spoilers). */
const strip = ({ tags: _t, date: _d, hub: _h, ...rest }: Item): RelatedItem => {
  void _t; void _d; void _h;
  return rest;
};

/** Up to `limit` related links for a registered path, mixed across sections. */
export function relatedFor(path: string, limit = 6): RelatedItem[] {
  const { items, idf } = index();
  const self = items.find((i) => i.href === path);
  if (!self) return [];

  // A character card is "related" only when the page itself names that character, or, from a map page,
  // when the character is located in that region. The card's own relationship tags (char:jason-duval on
  // every side-quest profile) must not count: they made any page that mentions Jason or Lucia eligible
  // for every character whose profile lists them as a relationship.
  const names = (a: Item, b: Item) => !!b.charSlug && a.tags.has(`char:${b.charSlug}`);
  const sharesLoc = (a: Item, b: Item) => [...a.tags].some((t) => t.startsWith("loc:") && b.tags.has(t));
  // Used for the cast card only. Profile pages list every allowed card and rank them by relationship tags.
  const sharesChar = (a: Item, b: Item) => [...a.tags].some((t) => t.startsWith("char:") && b.tags.has(t));
  // Spoiler safety: a page may only show cards for characters introduced in its own chapter or earlier.
  // Mission pages use their chapter, a profile page uses the profile's intro chapter, everything else is Chapter 1.
  const selfMission = MISSIONS.find((m) => missionPath(m.slug) === path);
  const selfChar = self.section === "character" ? self.charSlug : undefined;
  const pageChapter = selfMission ? (selfMission.chapter ?? 1) : selfChar ? introChapter(selfChar) : 1;
  // Hidden Chapter 2 mission pages never link to character cards: a card's summary can name Chapter 2 places or people.
  const selfHidden = !!selfMission?.hidden;
  const eligible = (i: Item) => {
    if (i.section !== "character") return true;
    if (selfHidden) return false;
    // The cast page has no single character: keep the original rule (shares a lead or Brian with the page).
    if (!i.charSlug) return self.section === "map" || self.section === "character" || sharesChar(self, i);
    if (!cardAllowed(i.charSlug, pageChapter, selfChar)) return false;
    if (self.section === "map") return sharesLoc(self, i);
    if (self.section === "character") return true;
    return names(self, i);
  };

  const ranked = items
    .filter((i) => i.href !== path && !i.hub && eligible(i))
    .map((i) => ({ item: i, score: score(self, i, idf) }))
    .sort((a, b) => b.score - a.score || (a.item.date < b.item.date ? 1 : -1));

  const picked: Item[] = [];
  const has = (i: Item) => picked.includes(i);
  const count = (s: Section) => picked.filter((p) => p.section === s).length;
  const add = (i: Item | undefined, cap = 3) => {
    if (i && !has(i) && picked.length < limit && count(i.section) < cap) picked.push(i);
  };

  const hub = (href: string) => items.find((i) => i.href === href); // any item by href (hubs included)
  const isMission = path.startsWith("/guides/missions/");
  // 0) Mission pages always link back to the full walkthrough.
  if (isMission) add(hub("/guides/missions"));
  // 0c) Secret entries always link back to the secrets hub.
  if (path.startsWith("/secrets/")) add(hub("/secrets"));
  // 0b) News links to the guides it points readers at.
  for (const g of NEWS_GUIDES[path] ?? []) add(hub(g));
  // 1) Own section: best two matches (falls back to latest, via the date tie-break).
  for (const r of ranked.filter((r) => r.item.section === self.section).slice(0, 2)) add(r.item);
  // 2) Best match from every other section, when it shares at least one tag.
  for (const s of SECTION_ORDER) {
    if (s === self.section) continue;
    add(ranked.find((r) => r.item.section === s && r.score > 0)?.item);
  }
  // 3) Strongest remaining matches.
  for (const r of ranked) if (r.score > 0) add(r.item);
  // 4) Fallback: latest in the same section, then latest anywhere.
  for (const r of ranked.filter((r) => r.item.section === self.section)) add(r.item);
  // Last resort, only to reach a useful minimum: the newest items anywhere.
  for (const r of ranked) if (picked.length < MIN_LINKS) add(r.item, limit);

  // News should point readers at a guide. If no guide matched, offer the guides hub.
  if (self.section === "news" && !picked.some((p) => p.section === "guide")) {
    const guides = hub("/guides");
    if (guides) {
      if (picked.length >= limit) picked.pop();
      picked.push(guides);
    }
  }

  // Always offer the interactive map from content pages that did not match a region.
  if (self.section !== "map" && !picked.some((p) => p.section === "map")) {
    const map = items.find((i) => i.href === "/map");
    if (map) {
      if (picked.length >= limit) picked.pop();
      picked.push(map);
    }
  }
  return picked.map((i) => strip(i));
}

