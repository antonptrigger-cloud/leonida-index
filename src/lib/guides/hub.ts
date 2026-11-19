/**
 * Data for the /guides hub.
 *
 * The hub is built from ROUTES (src/lib/seo/site.ts): every indexable `/guides/<slug>` page is a card, so a new
 * guide appears here as soon as it is registered there. `HUB_META` only adds hub-specific copy (short title,
 * one-line blurb, category tag, accent colour and section). A guide without an entry falls back to its ROUTES
 * crumb/description and lands in the "Systems & activities" section with a generic "Guide" tag.
 */
import { ROUTES } from "@/lib/seo/site";

export type Accent = "pink" | "orange" | "turq" | "blue";
export type HubSectionId = "start" | "money" | "systems";

export interface HubGuide {
  href: string;
  title: string;
  blurb: string;
  tag: string;
  accent: Accent;
  section: HubSectionId;
}

interface HubMeta {
  title: string;
  blurb: string;
  tag: string;
  accent: Accent;
  section: HubSectionId;
}

const HUB_META: Record<string, HubMeta> = {
  "/guides/missions": { title: "All missions in order", blurb: "Every story mission across five chapters, with spoilers kept behind a blur.", tag: "Walkthrough", accent: "pink", section: "start" },
  "/guides/beginner": { title: "Beginner guide", blurb: "Your first hours: Lucia and Jason, swapping mid-job, and why to explore.", tag: "Basics", accent: "blue", section: "start" },
  "/guides/saving": { title: "How to save", blurb: "Save slots, the autosave, when saving is blocked and a slot plan for every chapter.", tag: "Basics", accent: "blue", section: "start" },
  "/guides/switch-characters": { title: "Switching characters", blurb: "When Jason and Lucia can swap, the button combo, and partner commands.", tag: "Basics", accent: "blue", section: "start" },
  "/guides/money": { title: "Money guide", blurb: "The fastest ways to earn cash at every stage of the story.", tag: "Money", accent: "orange", section: "money" },
  "/guides/cheats": { title: "Cheats & codes", blurb: "Cheats unlock after the story. How to enter them and the codes so far.", tag: "Cheats", accent: "orange", section: "money" },
  "/guides/trophies": { title: "Trophies & platinum", blurb: "All 55 trophies explained, plus a roadmap to the platinum.", tag: "Trophies", accent: "orange", section: "money" },
  "/guides/collectibles": { title: "Collectibles", blurb: "Card sets, WAiNK scans and which ones the 100% needs.", tag: "Collectibles", accent: "orange", section: "money" },
  "/guides/wanted": { title: "Wanted system", blurb: "Six stars, witnesses, hollow stars and how to lose the cops.", tag: "Systems", accent: "turq", section: "systems" },
  "/guides/stealing-cars": { title: "Stealing cars", blurb: "Hot-wire the old ones, clone keys for the new ones.", tag: "Systems", accent: "turq", section: "systems" },
  "/guides/fast-travel": { title: "Fast travel", blurb: "RydeMe, taxis and public transport, what skipping a ride costs, and where outlets differ.", tag: "Systems", accent: "turq", section: "systems" },
  "/guides/garages": { title: "Garages", blurb: "Every garage, its price and area, and how slots work. Both outlets' figures shown.", tag: "Systems", accent: "turq", section: "systems" },
  "/guides/activities": { title: "Activities", blurb: "Diving, jet skis, fishing, hoops, mini golf and the rest.", tag: "Activities", accent: "turq", section: "systems" },
  "/guides/map-size": { title: "Map size", blurb: "Rockstar's size comparisons, one outlet's 175 km² measurement and timed crossings.", tag: "Map", accent: "turq", section: "systems" },
  "/guides/strangers-and-freaks": { title: "Strangers & Freaks", blurb: "Which side-mission questlines count, and when they open.", tag: "Side missions", accent: "turq", section: "systems" },
};

/** Display order inside each section. Anything not listed follows in registry order. */
const ORDER = Object.keys(HUB_META);

const GUIDE_PATH = /^\/guides\/[a-z0-9-]+$/;

function firstSentence(text: string, max = 96): string {
  const s = text.split(/(?<=[.!?])\s/)[0] ?? text;
  return s.length <= max ? s : `${s.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

/** Every indexable guide page registered in ROUTES, in hub order. */
export function hubGuides(): HubGuide[] {
  const found = Object.entries(ROUTES)
    .filter(([path, r]) => GUIDE_PATH.test(path) && !r.noindex)
    .map(([path, r]): HubGuide => {
      const meta = HUB_META[path];
      return meta
        ? { href: path, ...meta }
        : { href: path, title: r.crumb, blurb: firstSentence(r.description), tag: "Guide", accent: "blue", section: "systems" };
    });
  const rank = (href: string) => {
    const i = ORDER.indexOf(href);
    return i === -1 ? ORDER.length : i;
  };
  return found.sort((a, b) => rank(a.href) - rank(b.href));
}

export const HUB_SECTIONS: { id: HubSectionId; num: string; label: string; kicker: string; title: string; blurb: string }[] = [
  { id: "start", num: "01", label: "Start here", kicker: "Start here", title: "The case files", blurb: "New to Leonida? Read these first." },
  { id: "money", num: "03", label: "Money & progression", kicker: "Progression", title: "Money & progression", blurb: "Cash, cheats, trophies and the 100%." },
  { id: "systems", num: "04", label: "Systems & activities", kicker: "How it works", title: "Systems & activities", blurb: "The rules of the road, and what to do off the mission marker." },
];

/** Featured card in "Start here", and the numbered list beside it (only entries that exist are shown). */
export const START_FEATURE = "/guides/missions";
export const START_SIDE = ["/guides/beginner", "/guides/saving", "/guides/switch-characters", "/guides/money", "/guides/cheats", "/guides/trophies"];
