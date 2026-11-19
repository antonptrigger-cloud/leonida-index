/**
 * Data for /guides/bigfoot-skunk-ape. QC'd 20 Nov 2026 by re-reading every cited page.
 * Rules for this page:
 * - Confirmed = two main outlets (or Rockstar). Reported = one outlet, or outlets that disagree, always named.
 * - Confirmed: Bigfoot (the Skunk Ape) is in the game (GamesRadar+, GameSpot, Polygon, PowerPyx); a flyer plus a call to Kirk starts his questline
 *   (Polygon, PowerPyx); the line has three parts (Polygon, PowerPyx).
 * - Free-roam sighting location CONFLICT: GameRant says south of Cottonmouth Lake, GameSpot says Gullet Marsh, GamesRadar+ says a dirt road intersection.
 *   Each is credited and no single spot is stated as fact. GameRant is secondary, so what only it says is Reported and attributed.
 * - PowerPyx only: night-only parts, the $1,000 reward, the flashlight slot, search-area steps, the effigies' any-order auto-complete, the part 3 details.
 *   Polygon only: Shrimp & Save flyer spot, the "second trip is solo" line, the airboat tip and the effigy descriptions.
 * - Part 3 (its name, chapter, character gate, rifle, choice and payout) sits inside a spoiler block. Title, meta, H1, slug, FAQ and schema are neutral.
 * - Not used: the part 3 ending details beyond the payout, the separate UFO encounter, any secret trophy name, IndiaTimes, banned sources.
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const BIGFOOT_PUBLISHED = "2026-11-20T02:05:00+10:00";
/** Last edit, ISO 8601 with offset (Brisbane). Drives sitemap lastmod and dateModified. */
export const BIGFOOT_VERIFIED = "2026-11-20T02:05:00+10:00";
export const BIGFOOT_VERIFIED_LABEL = "20 Nov 2026";

export const BIGFOOT_FAQ: { question: string; answer: string }[] = [
  {
    question: "Is Bigfoot in GTA 6?",
    answer: "Yes. Leonida's version is called the Skunk Ape, and GamesRadar+, GameSpot, Polygon and PowerPyx all describe it (Confirmed). You can see it in a free-roam sighting and in Kirk's side quests.",
  },
  {
    question: "Where is Bigfoot in GTA 6?",
    answer:
      "In the swamps, but the outlets name different spots. GameRant puts the free-roam sighting south of Cottonmouth Lake, GameSpot lists Gullet Marsh and GamesRadar+ says a dirt road intersection. Kirk's quests send you into the Pelican Valley swamps in Mariana County (Polygon, PowerPyx).",
  },
  {
    question: "How do I start the Skunk Ape quest?",
    answer: "Read a Skunk Ape flyer to save Kirk's number, then call him from your phone contacts. Polygon and PowerPyx both describe this (Confirmed).",
  },
  {
    question: "Where are the tree effigies?",
    answer: "Polygon says one is just south of Thorpe Adventures, one is on a lone patch of woodland between waterways and one is at the south end of a long, narrow strip of trees (Reported).",
  },
  {
    question: "Can you kill Bigfoot in GTA 6?",
    answer: "Not during the free-roam sighting, according to GameRant, which says it can't be caught and bullets don't hurt it (Reported).",
  },
  {
    question: "Does Kirk's quest count for Strangers & Freaks?",
    answer: "PowerPyx lists Kirk's questline among the strands that count toward the trophy (Reported). See our Strangers & Freaks guide for the full picture.",
  },
];

export const BIGFOOT_SOURCES = [
  {
    label: "GamesRadar+: GTA 6 Bigfoot sightings are already ramping up (18 Nov 2026)",
    url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-bigfoot-sightings-are-already-ramping-up-as-rockstar-honors-a-22-year-old-grand-theft-auto-legend/",
    used: "That Bigfoot is in the game, the deer-carcass sighting at a dirt road intersection, the effigy and waking up where you started",
  },
  {
    label: "GameSpot: GTA 6 Easter Eggs Are Everywhere, But These Are The Best Ones (18 Nov 2026)",
    url: "https://www.gamespot.com/articles/gta-6-easter-eggs-list-and-locations/",
    used: "Its Bigfoot entry, listed at Gullet Marsh and tied to a mission it calls unmissable",
  },
  {
    label: "Polygon: Where to find the tree effigies for the Skunk Ape mission in GTA 6 (19 Nov 2026)",
    url: "https://www.polygon.com/gta-6-skunk-ape-tree-effigies-locations-where-to-find/",
    used: "Starting the quest from a flyer and a call, the three trips, the airboat tip and the three effigy descriptions",
  },
  {
    label: "PowerPyx: GTA 6 Search for the Skunk Ape Walkthrough (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-search-for-the-skunk-ape-walkthrough/",
    used: "The first part: Chapter 1, night only, the Hamlet flyer, the steps and the $1,000 reward",
  },
  {
    label: "PowerPyx: GTA 6 Search for Tree Effigies Locations Walkthrough (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-search-for-tree-effigies-locations-walkthrough/",
    used: "The second part: the wait for Kirk's text, three effigies in any order, no reward",
  },
  {
    label: "PowerPyx: Kirk's final quest walkthrough (18 Nov 2026, contains spoilers)",
    url: "https://www.powerpyx.com/gta-6-help-kirk-find-mr-mangrove-walkthrough/",
    used: "The third part: its unlock rules, rewards and the trophy strand (details kept inside the spoiler block)",
  },
  {
    label: "GameRant: Where to Find Bigfoot in GTA 6 (18 Nov 2026), secondary, not relied on alone",
    url: "https://gamerant.com/gta-6-bigfoot-location-where-to-find/",
    used: "The south-of-Cottonmouth-Lake location, available after the first mission, and that it can't be caught or shot in free roam",
  },
];
