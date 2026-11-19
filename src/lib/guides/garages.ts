/**
 * Data for /guides/garages. QC'd 19 Nov 2026 by re-reading every cited page.
 * Rules for this page:
 * - Confirmed = two main outlets (or Rockstar). Reported = one outlet, or outlets that disagree, always named.
 * - Prices: PowerPyx and GameSpot agree on six of the eight purchasable garages. Persistence Road and Vela Rota Drive differ, so both
 *   figures are shown and the totals are shown both ways. The $167,900 total is our own sum of GameSpot's two higher prices (worded that way).
 * - Locations are GameSpot only (PowerPyx gives names, prices and parking spots, no area notes), so they are Reported.
 * - Slots: PowerPyx ("1 garage slot initially", max 18) and GameSpot ("four owned vehicle slots", "over a dozen" at the top end) do not agree and
 *   neither explains the gap. Both are shown. The "one garage slot" line on /database/vehicles is PowerPyx's, now shown next to GameSpot's.
 * - Garage totals: PowerPyx 12 (8 bought + 4 story, no Paradise Garage). GameSpot 10 (includes Paradise Garage, omits the later story garages).
 * - Little Boxes is NOT a hidden trophy: TrueTrophies, GamesRadar+ and PlayStationTrophies.org all print the name and "Purchase all garage
 *   properties", and our /guides/trophies page already lists it among the visible trophies. It stays visible here.
 * - Late-story mission and garage names (Chapter 4 and 5) and Wyman and Valentina stay inside <Spoiler> blocks. The vehicles database
 *   keeps Wyman and the Pegassi Residences building behind a blur too, so this page does the same.
 * - Not used: the Shore Court garage (DLC pack) and safehouses, which only secondary and fan sites cover. No banned sources.
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const GARAGES_PUBLISHED = "2026-11-19";
/** Last edit, ISO 8601 with offset (Brisbane). Drives sitemap lastmod and dateModified. */
export const GARAGES_VERIFIED = "2026-11-19T20:15:00+10:00";
export const GARAGES_VERIFIED_LABEL = "19 Nov 2026";

export interface Garage {
  name: string;
  /** PowerPyx's price. */
  powerpyx: number;
  /** GameSpot's price. */
  gamespot: number;
  /** GameSpot's location note, paraphrased. */
  area: string;
}

/** The eight garages bought through the phone app, in PowerPyx's order. */
export const GARAGES: Garage[] = [
  { name: "Mitchell Auto Center", powerpyx: 4000, gamespot: 4000, area: "Central Kelly County, east of Port Gellhorn" },
  { name: "7th Avenue Garage", powerpyx: 12000, gamespot: 12000, area: "East of Vice City International Airport, in south Vice-Dale County" },
  { name: "Vela Rota Drive Garage", powerpyx: 24000, gamespot: 30000, area: "The middle of Capri" },
  { name: "Persistence Road Garage", powerpyx: 7600, gamespot: 9500, area: "Western Bellville, in southern Leonard County north of Vice City" },
  { name: "Wyatt Motors", powerpyx: 21600, gamespot: 21600, area: "Central Ambrosia, next to the Pay 'n' Spray" },
  { name: "Bonita Court Garage", powerpyx: 34000, gamespot: 34000, area: "The centre of Washington Island" },
  { name: "Atlantic Court Garage", powerpyx: 40000, gamespot: 40000, area: "Ocean Beach, south of the Y Hotel" },
  { name: "Store 'N' Bolt", powerpyx: 16800, gamespot: 16800, area: "Northern Ambrosia, near the large monument" },
];

const sum = (f: (g: Garage) => number) => GARAGES.reduce((n, g) => n + f(g), 0);
/** PowerPyx's own figure is $160,000, which its eight prices add up to. */
export const TOTAL_POWERPYX = sum((g) => g.powerpyx);
/** Our arithmetic on GameSpot's eight prices. */
export const TOTAL_GAMESPOT = sum((g) => g.gamespot);
export const MATCHING = GARAGES.filter((g) => g.powerpyx === g.gamespot).length;

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
export const fmtPrice = (g: Garage) => (g.powerpyx === g.gamespot ? usd(g.powerpyx) : `${usd(g.powerpyx)} (PowerPyx) / ${usd(g.gamespot)} (GameSpot)`);

export const GARAGES_FAQ: { question: string; answer: string }[] = [
  {
    question: "When can you buy garages in GTA 6?",
    answer:
      "Not at the start. PowerPyx and GameSpot both place garages in the Port Gellhorn stretch of the story, once the mechanic Moses starts registering cars for you (Confirmed). GameSpot puts that at about 30% of the way through. PowerPyx says a Vice City Real Estate app arrives on your phone a short while later and sells every purchasable garage (Reported).",
  },
  {
    question: "How much do all the GTA 6 garages cost?",
    answer:
      "PowerPyx says $160,000 for all eight purchasable garages. GameSpot prices two of them higher (Persistence Road at $9,500 and Vela Rota Drive at $30,000), which our arithmetic makes $167,900. The other six prices match.",
  },
  {
    question: "What is the cheapest garage in GTA 6?",
    answer: "Mitchell Auto Center in central Kelly County, at $4,000. PowerPyx and GameSpot print the same price (Confirmed).",
  },
  {
    question: "How many garages and vehicle slots are there?",
    answer:
      "PowerPyx counts 12 garages (8 you buy and 4 from the story) and up to 18 vehicle slots, but says you start with one. GameSpot lists 10 garages and says you start with four owned-vehicle slots. The two outlets count differently, so every total is Reported.",
  },
  {
    question: "Is there a trophy for buying garages?",
    answer:
      "Yes. Little Boxes (bronze, 15 Gamerscore) asks you to purchase all garage properties. It is not a hidden trophy: TrueTrophies and GamesRadar+ both list its name. GamesRadar+ counts 8 garages and PowerPyx says it means the 8 you buy (Confirmed).",
  },
  {
    question: "Do the free story garages count for Little Boxes?",
    answer: "PowerPyx says no. Only the 8 garages bought through the Vice City Real Estate app count toward it. No second outlet says either way yet, so this is Reported.",
  },
];

export const GARAGES_SOURCES = [
  {
    label: "PowerPyx: GTA 6 All Garage Locations (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-all-garage-locations/",
    used: "The 12-garage count, the eight purchase prices and the $160,000 total, parking spots per garage, the 18-slot maximum, the Vice City Real Estate app, and what unlocks the story garages",
  },
  {
    label: "GameSpot: All Garage Locations And Prices In GTA 6 (Joey Carr, 18 Nov 2026)",
    url: "https://www.gamespot.com/articles/all-garage-locations-and-prices-in-gta-6/",
    used: "The 10-garage count, its prices (including the two that differ from PowerPyx), every location note, the free Port Gellhorn and Paradise garages, and the map-only storage garages",
  },
  {
    label: "GameSpot: How To Own More Cars And Other Vehicles In GTA 6 (Joey Carr, 18 Nov 2026)",
    url: "https://www.gamespot.com/articles/how-to-own-more-cars-and-other-vehicles-in-gta-6/",
    used: "The roughly 30% mark, four starting owned-vehicle slots, buying every garage nearly tripling them, the story garage in Ocean Beach, and the Scooter Bros app",
  },
  {
    label: "PowerPyx: GTA 6 How to Get New Personal Car",
    url: "https://www.powerpyx.com/gta-6-how-to-get-new-personal-car/",
    used: "Registering at Moses's garage, and the one starting garage slot that our vehicles database also cites",
  },
  {
    label: "GamesRadar+: Complete GTA 6 Trophy and Achievement list",
    url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-trophy-achievement-list/",
    used: "Little Boxes: its wording, 15 Gamerscore, the count of 8, and that it is not marked as hidden",
  },
  {
    label: "TrueTrophies: Grand Theft Auto VI PlayStation trophies",
    url: "https://www.truetrophies.com/news/grand-theft-auto-vi-playstation-trophies",
    used: "Little Boxes is printed by name, while the hidden trophies show as \"Hidden Trophy\"",
  },
];
