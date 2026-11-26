/**
 * Data for /guides/bank-robbery. Checked 26 Nov 2026 against the cited pages.
 *
 * Rules: every figure is Reported and attributed. Nothing is invented: no fixed safe codes (GameSpot found them
 * randomised), no guard counts and no police response times, because no reliable source publishes them per bank.
 * Bank list, order and take ranges: PowerPyx (numbering) and GTABase (same ranges; security ratings).
 *
 * Map pins: only banks with published in-game coordinates whose district matches the source's description.
 * Coordinates: GTABase markers via the Open GTA 6 Map dataset (fbritoferreira/gta6, CC BY 4.0). Seven are also matched
 * by a named GTADB.org landmark within 20 m (CC BY 4.0). Lombank Bayside is not pinned: its published point sits on the
 * Stockyard / Crosstown / Bayside boundary, so we can't confirm it. Conversion to our map: local affine fit, see
 * docs/DATA_CREDITS.md. Pins are approximate (about a block).
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const BANK_PUBLISHED = "2026-11-26";
export const BANK_VERIFIED = "2026-11-26";
export const BANK_VERIFIED_LABEL = "26 Nov 2026";

export type BankType = "small" | "vault";

export interface BankJob {
  /** PowerPyx's number (#1-22). */
  n: number;
  name: string;
  area: string;
  county: string;
  type: BankType;
  /** Reported take range in marked bills (PowerPyx and GTABase print the same ranges). */
  take: string;
  /** GTABase security rating; null where GTABase doesn't list one. */
  security: "Low" | "Medium" | "High" | null;
  /** Map pin id, or null when we couldn't verify the spot. */
  pin: string | null;
  /** Published in-game X, Y (GTABase marker via Open GTA 6 Map). */
  game: [number, number];
  /** Matching GTADB.org landmark record, when one exists. */
  gtadb: string | null;
}

export const BANKS: BankJob[] = [
  { n: 1, name: "Fleeca", area: "Key Lento", county: "Mariana County", type: "small", take: "$5,000–$20,000", security: "Medium", pin: "seed-bank-01-fleeca-key-lento", game: [-2684, -6154], gtadb: "L3267" },
  { n: 2, name: "Shorefront", area: "Watson Bay", county: "Mariana County", type: "small", take: "$5,000–$20,000", security: "Medium", pin: "seed-bank-02-shorefront-watson-bay", game: [-5059, -3274], gtadb: null },
  { n: 3, name: "Gibson Brothers Bank", area: "Capri", county: "Mariana County", type: "small", take: "$10,000–$30,000", security: "High", pin: "seed-bank-03-gibson-brothers-capri", game: [-6934, 273], gtadb: "L2842" },
  { n: 4, name: "Lombank", area: "Peacock Bay", county: "Vice-Dale County", type: "small", take: "$5,000–$20,000", security: "Medium", pin: "seed-bank-04-lombank-peacock-bay", game: [-1312, -1802], gtadb: null },
  { n: 5, name: "Fleeca", area: "Peacock Bay", county: "Vice-Dale County", type: "small", take: "$5,000–$20,000", security: "High", pin: "seed-bank-05-fleeca-peacock-bay", game: [-1260, -1699], gtadb: null },
  { n: 6, name: "Shorefront", area: "Downtown", county: "Vice-Dale County", type: "small", take: "$5,000–$15,000", security: "Medium", pin: "seed-bank-06-shorefront-downtown", game: [-755, -227], gtadb: null },
  { n: 7, name: "Shorefront", area: "Rockridge", county: "Vice-Dale County", type: "small", take: "$5,000–$20,000", security: "Medium", pin: "seed-bank-07-shorefront-rockridge", game: [-1350, 804], gtadb: "L1102" },
  { n: 8, name: "Lombank", area: "Bayside", county: "Vice-Dale County", type: "small", take: "$15,000–$45,000", security: "Medium", pin: null, game: [-346, 1616], gtadb: null },
  { n: 9, name: "Fleeca", area: "Washington Beach", county: "Vice-Dale County", type: "small", take: "$10,000–$30,000", security: null, pin: "gtadb-L1786", game: [1510, 1815], gtadb: "L1786" },
  { n: 10, name: "Lombank", area: "Ocean Beach", county: "Vice-Dale County", type: "small", take: "$15,000–$45,000", security: "High", pin: "seed-bank-10-lombank-ocean-beach", game: [1760, 1319], gtadb: "L470" },
  { n: 11, name: "Fleeca", area: "Ocean Beach", county: "Vice-Dale County", type: "small", take: "$5,000–$15,000", security: "Medium", pin: "seed-bank-11-fleeca-ocean-beach", game: [1808, 509], gtadb: null },
  { n: 12, name: "Shorefront", area: "Ocean Beach", county: "Vice-Dale County", type: "small", take: "$5,000–$15,000", security: "Low", pin: "seed-bank-12-shorefront-ocean-beach", game: [1626, 234], gtadb: null },
  { n: 13, name: "Druthers State Bank", area: "Belville", county: "Leonard County", type: "small", take: "$15,000–$45,000", security: "High", pin: "seed-bank-13-druthers-belville", game: [-1389, 2807], gtadb: null },
  { n: 14, name: "Shorefront", area: "Ambrosia", county: "Kelly County", type: "small", take: "$5,000–$15,000", security: "Medium", pin: "seed-bank-14-shorefront-ambrosia", game: [-2758, 4378], gtadb: null },
  { n: 15, name: "Fleeca", area: "VCIA", county: "Vice-Dale County", type: "vault", take: "$100,000–$150,000", security: "High", pin: "seed-bank-15-fleeca-vcia", game: [-1721, -489], gtadb: null },
  { n: 16, name: "Fleeca", area: "Tequesta", county: "Vice-Dale County", type: "vault", take: "$65,000–$110,000", security: "High", pin: "seed-bank-16-fleeca-tequesta", game: [-937, -1101], gtadb: null },
  { n: 17, name: "Lombank", area: "Downtown", county: "Vice-Dale County", type: "vault", take: "$135,000–$205,000", security: "High", pin: "seed-bank-17-lombank-downtown", game: [-579, -313], gtadb: null },
  { n: 18, name: "Fleeca", area: "Downtown", county: "Vice-Dale County", type: "vault", take: "$100,000–$150,000", security: "High", pin: "seed-bank-18-fleeca-downtown", game: [-717, -176], gtadb: null },
  { n: 19, name: "Lombank", area: "Ocean Beach", county: "Vice-Dale County", type: "vault", take: "$135,000–$205,000", security: "High", pin: "seed-bank-19-lombank-ocean-beach", game: [1661, 32], gtadb: "L2155" },
  { n: 20, name: "Fleeca", area: "Ocean Beach", county: "Vice-Dale County", type: "vault", take: "$75,000–$135,000", security: null, pin: "seed-bank-20-fleeca-ocean-beach", game: [1696, 51], gtadb: "L2150" },
  { n: 21, name: "Lombank", area: "Ocean Beach", county: "Vice-Dale County", type: "vault", take: "$75,000–$135,000", security: "Medium", pin: "seed-bank-21-lombank-ocean-beach", game: [1418, 355], gtadb: null },
  { n: 22, name: "Shorefront", area: "Ocean Beach", county: "Vice-Dale County", type: "vault", take: "$95,000–$140,000", security: "High", pin: "seed-bank-22-shorefront-ocean-beach", game: [1776, 1146], gtadb: null },
];

export const BANK_FAQ: { question: string; answer: string }[] = [
  {
    question: "How many banks can you rob in GTA 6?",
    answer:
      "22, according to PowerPyx and GTABase: 14 small banks and 8 large banks with a vault. Small banks have a cash drawer and a safe. Large banks add a vault. Seven of the 22 are in Ocean Beach.",
  },
  {
    question: "Are there fixed safe codes for GTA 6 banks?",
    answer:
      "No. GameSpot says safe codes are randomised: a code that worked for one player won't work for you, and it changes even if you rob the same place twice. Look for the code on sticky notes, computer screens or a guard you've taken down. Smaller safes can be picked if you can't find it.",
  },
  {
    question: "Can you blow open or crack a bank vault?",
    answer:
      "No. GameSpot and PC Gamer both say vaults can't be picked, cracked or blown open. The only way in is to follow a security van to a large bank and wait for its guard to open the vault for his delivery.",
  },
  {
    question: "What wanted level do you get for robbing a bank vault?",
    answer:
      "Four stars straight away, according to PowerPyx and PC Gamer. PC Gamer says that brings SWAT trucks, roadblocks and helicopters.",
  },
  {
    question: "Which bank pays the most in GTA 6?",
    answer:
      "The high-security Lombank vaults in Downtown and Ocean Beach, at a reported $135,000 to $205,000 each (PowerPyx, GTABase). Among small banks, Lombank Bayside, Lombank Ocean Beach and Druthers State Bank top out at $45,000.",
  },
  {
    question: "How long until the police arrive at a GTA 6 bank?",
    answer:
      "No reliable source has published a response time, and we haven't timed one ourselves, so we don't print a number. GameSpot says the cops are alerted the moment you leave, and that they surround every entrance once things get loud.",
  },
];

export const BANK_SOURCES = [
  {
    label: "PowerPyx: GTA 6 All Bank Jobs Locations (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-all-bank-jobs-locations-bank-vaults/",
    used: "The 22 banks and their numbering, counties, take ranges, unlock missions, cash drawer and safe rule, map filter, Yasmani's $10,000 tips, instant four stars, motorcycle getaway",
  },
  {
    label: "GTABase: All GTA 6 Bank Locations interactive map",
    url: "https://www.gtabase.com/gta-6/map/?feature=bank",
    used: "Area names, security ratings, teller or vault robbery type, same take ranges, SW 4th Street for the Washington Beach Fleeca, in-game marker positions",
  },
  {
    label: "GameSpot: GTA 6 Safe Codes And Robberies Guide",
    url: "https://www.gamespot.com/articles/gta-6-safe-codes-and-robberies-guide/",
    used: "Randomised safe codes, where codes turn up, picking and snapping, alarms and cameras, back and side doors (one reinforced), vault timing, partner stash bags, getaway and appearance change",
  },
  {
    label: "GameSpot: How To Open Bank Vaults In GTA 6",
    url: "https://www.gamespot.com/articles/how-to-break-into-bank-vaults-in-gta-6/",
    used: "Vaults only opened by the security van courier, following him inside, marked bills on a cart, deposit boxes",
  },
  {
    label: "PC Gamer: GTA 6 vault, how to open them",
    url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-vault-how-to-open/",
    used: "Yasmani's van tip (pink icons), courier routes (front, side or roll-up door), snap gun and explosives, silenced weapons, panicking staff, four stars with SWAT, roadblocks and helicopters",
  },
  {
    label: "Open GTA 6 Map dataset (fbritoferreira/gta6, CC BY 4.0)",
    url: "https://github.com/fbritoferreira/gta6",
    used: "In-game coordinates for all 22 bank markers, used to place our map pins",
  },
  {
    label: "GTADB.org landmark data (CC BY 4.0)",
    url: "https://github.com/rolux/gtadb.org",
    used: "Independent match for seven bank buildings (Key Lento, Capri, Rockridge, Washington Beach and three in Ocean Beach)",
  },
];
