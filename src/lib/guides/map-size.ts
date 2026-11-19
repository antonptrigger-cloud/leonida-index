/**
 * Data for /guides/map-size. QC'd 19 Nov 2026 by re-reading every cited page.
 * Rules for this page:
 * - Confirmed = a Rockstar comparison carried by two main outlets. Reported = one outlet's own figure or test.
 * - Rockstar has not published an area in km² or miles in any source we found. The only km² figure is PowerPyx's.
 * - The land-only figure on the page (about 113 to 114 km²) is our own arithmetic on PowerPyx's numbers and is worded that way.
 * - Rockstar's printable Leonida map is NOT claimed to be out: rockstargames.com/VI/downloads showed no map at the time of checking.
 * - Pre-launch fan reconstructions and secondary-site sums are not used. No story or mission details on this page.
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const MAPSIZE_PUBLISHED = "2026-11-19";
/** Last edit, ISO 8601 with offset (Brisbane). Drives sitemap lastmod and dateModified. */
export const MAPSIZE_VERIFIED = "2026-11-19T12:17:59+10:00";
export const MAPSIZE_VERIFIED_LABEL = "19 Nov 2026";

export interface SizeClaim {
  claim: string;
  /** Who said it, and how it reached us. */
  from: string;
  /** Outlets that carry it. */
  outlets: string;
  status: "confirmed" | "reported";
}

/** Comparisons Rockstar gave the press. None of them is a measurement. */
export const ROCKSTAR_CLAIMS: SizeClaim[] = [
  {
    claim: "The whole map is three times the size of Red Dead Redemption 2's playable area",
    from: "Rockstar, in a New York Times piece (27 Aug 2026)",
    outlets: "GameSpot and GamesRadar+; VGC and GameSpot (Oct) repeat the ratio",
    status: "confirmed",
  },
  {
    claim: "The map is roughly twice the size of GTA V's",
    from: "Rob Nelson of Rockstar, speaking to YouTuber TGG (VGC); \"according to Rockstar\" (GameSpot, 29 Oct)",
    outlets: "VGC and GameSpot",
    status: "confirmed",
  },
  {
    claim: "Total landmass is nearly as big as the playable maps of GTA IV, GTA V and RDR2 put together",
    from: "Rockstar, to Edge magazine",
    outlets: "GameSpot and PC Gamer (PC Gamer words it as Vice City and its surrounding areas)",
    status: "confirmed",
  },
  {
    claim: "\"An order of magnitude more interiors\" than any earlier Rockstar game",
    from: "Aaron Garbut of Rockstar North, to Edge magazine",
    outlets: "GameSpot and PC Gamer",
    status: "confirmed",
  },
  {
    claim: "Vice City alone is twice the size of Los Santos, and eleven times Los Santos once its suburbs are counted",
    from: "Rob Nelson, relayed by TGG",
    outlets: "VGC only",
    status: "reported",
  },
];

/** Kotaku's timed south-to-north crossings (18 Nov 2026). */
export const CROSSINGS: { how: string; time: string; note?: string }[] = [
  { how: "Walking", time: "3 h 21 min 20 s", note: "Small detours around gators and cliffs" },
  { how: "Running and sprinting", time: "about 1 h 41 min", note: "GTA V takes about 30 minutes, per Kotaku" },
  { how: "Driving the highways at top speed", time: "10 min 53 s", note: "Mid-range sedan, ignoring speed limits. A fast GTA V run is about 8 minutes, per Kotaku" },
  { how: "Flying a prop plane", time: "5 min 51 s", note: "Southernmost to northernmost land" },
];

export const MAPSIZE_FAQ: { question: string; answer: string }[] = [
  {
    question: "How big is the GTA 6 map in square kilometres?",
    answer:
      "Rockstar hasn't published an area. PowerPyx measures the released map at about 175 km² (67.5 square miles), water included. That is one outlet's figure, so treat it as Reported.",
  },
  {
    question: "Is the GTA 6 map bigger than GTA 5's?",
    answer:
      "Yes, by Rockstar's account. VGC quotes Rockstar's Rob Nelson putting it at about twice the size of GTA V's, and GameSpot reports the same comparison from Rockstar (Confirmed).",
  },
  {
    question: "How long does it take to drive across the GTA 6 map?",
    answer:
      "Kotaku timed a highway drive from the south end to the north end at 10 minutes 53 seconds, flat out in a mid-range sedan. That is a single test on one route, so it is Reported.",
  },
  {
    question: "How much of the GTA 6 map is water?",
    answer: "PowerPyx says roughly 35% water and 65% land. No other outlet we checked gives a split (Reported).",
  },
];

export const MAPSIZE_SOURCES = [
  {
    label: "PowerPyx: GTA 6 Full World Map Revealed (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-full-world-map-revealed/",
    used: "The 175 km² total, 16 km by 10.9 km, 67.5 sq mi and the 35% water and 65% land split",
  },
  {
    label: "Kotaku: It Took Me Over Three Hours To Walk Across GTA 6's Massive Map (18 Nov 2026)",
    url: "https://kotaku.com/it-took-me-over-three-hours-to-walk-across-gta-6s-massive-map-2000755572",
    used: "Walking, running, driving and flying crossing times, plus the GTA V comparison times and the stamina note",
  },
  {
    label: "GameSpot: GTA 6 Map Is 3X Bigger Than Red Dead Redemption 2's (27 Aug 2026)",
    url: "https://www.gamespot.com/articles/gta-6-map-is-3x-bigger-than-red-dead-redemption-2s/",
    used: "Rockstar's three-times-RDR2 comparison via the New York Times",
  },
  {
    label: "GamesRadar+: The GTA 6 map is 3 times bigger than Red Dead Redemption 2's (27 Aug 2026)",
    url: "https://www.gamesradar.com/games/grand-theft-auto/the-gta-6-map-is-3-times-bigger-than-red-dead-redemption-2s/",
    used: "Second outlet for the three-times-RDR2 comparison",
  },
  {
    label: "VGC: Grand Theft Auto 6's map is three times bigger than Red Dead Redemption 2 (28 Aug 2026)",
    url: "https://www.videogameschronicle.com/news/grand-theft-auto-6s-map-is-three-times-bigger-than-red-dead-redemption-2/",
    used: "Twice GTA V and three times RDR2 from Rockstar's Rob Nelson via TGG, and the Vice City comparisons",
  },
  {
    label: "GameSpot: GTA 6's Landmass Is Nearly As Big As GTA 4, GTA 5, And Red Dead Redemption 2 Combined (29 Oct 2026)",
    url: "https://www.gamespot.com/articles/gta-6s-landmass-is-nearly-as-big-as-gta-4-gta-5-and-red-dead-redemption-2-combined/",
    used: "The combined-landmass claim and the interiors quote, both from Edge; repeats twice GTA V",
  },
  {
    label: "PC Gamer: GTA 6's map is almost as big as Rockstar's last 3 games combined (29 Oct 2026)",
    url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6s-map-is-almost-as-big-as-rockstars-last-3-games-combined-contains-an-order-of-magnitude-more-interiors/",
    used: "Second outlet for the combined-size claim and the interiors quote",
  },
];
