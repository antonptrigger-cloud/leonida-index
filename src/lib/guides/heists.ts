/**
 * Data for /guides/heists. QC'd 19 Nov 2026.
 *
 * What two established outlets back:
 * - Mission names, chapter placement and order: PC Gamer, Push Square and GamesRadar+ agree on The Cartel Heist
 *   closing Chapter 3 and VCIA Takedown sitting late in Chapter 4.
 * - Short summaries: PC Gamer and Push Square (own wording below).
 * - Trophy text: GamesRadar+, TrueTrophies and TrueAchievements (secret trophies, so blurred).
 * - No story-mission replay and manual saves at chapter starts: PowerPyx and Push Square.
 *
 * PowerPyx only (no second established outlet has covered the heist yet): which missions are tagged as heist
 * prep, the cargo-to-charges-to-timer link, the roughly 11-minute timer, the $120,000 reward, and how the job plays.
 * Those lines are attributed to PowerPyx and kept short on purpose. Tech4gamers is not used.
 *
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const HEIST_VERIFIED = "2026-11-19";
export const HEIST_VERIFIED_LABEL = "19 Nov 2026";

export interface PrepMission {
  name: string;
  note: string;
  /** "both" = listed by PC Gamer and Push Square. "powerpyx" = only PowerPyx lists or tags it. */
  backing: "both" | "powerpyx";
}

/** Chapter 3 missions PowerPyx tags as prep for the bank job, in the order PC Gamer and Push Square list them. */
export const BANK_PREP: PrepMission[] = [
  { name: "Sinfrontera National Bank", note: "Scoping out the target. PC Gamer's summary calls it heist prep.", backing: "both" },
  { name: "Security Expert", note: "Meeting Nicole, the crew's safe specialist.", backing: "both" },
  { name: "Heist Planning", note: "PowerPyx lists this between Security Expert and Company Property. PC Gamer and Push Square don't list it.", backing: "powerpyx" },
  { name: "Company Property", note: "A weapons shipment run. PowerPyx says your result here feeds into Hidden Charges.", backing: "both" },
  { name: "The Missing Link", note: "A Lucia-led mission that PowerPyx tags as prep.", backing: "both" },
  { name: "Safe Word", note: "Lucia learns a new skill. PowerPyx says the heist's vault stage is a harder version of it.", backing: "both" },
  { name: "Hidden Charges", note: "PC Gamer calls it prep work. PowerPyx says it sets your time limit.", backing: "both" },
];

/** Chapter 4 missions PowerPyx tags as prep for the airport job. Names below are in both PC Gamer's and Push Square's lists. */
export const AIRPORT_PREP: PrepMission[] = [
  { name: "Making Gainz", note: "Lucia gets to know a new contact.", backing: "both" },
  { name: "Too Much Baggage", note: "Jason takes a job handling baggage.", backing: "both" },
  { name: "Cash Injections", note: "Lucia does a favour for an associate.", backing: "both" },
  { name: "Amateur Hour", note: "Lucia helps someone sort out a problem.", backing: "both" },
  { name: "Dirty Work", note: "Jason and Lucia build new connections.", backing: "both" },
  { name: "Power Play", note: "Jason gathers intel.", backing: "both" },
  { name: "Close Surveillance", note: "Jason works with a spy drone.", backing: "both" },
  { name: "Delivery Method", note: "Jason goes undercover.", backing: "both" },
  { name: "Team Building", note: "Lucia has to prove herself.", backing: "both" },
  { name: "Fully Catered", note: "Jason and Lucia steal a vehicle. Push Square's list puts it right before the job itself.", backing: "both" },
];

/** Tagged by PowerPyx only. Neither PC Gamer nor Push Square lists them. */
export const AIRPORT_PREP_POWERPYX_ONLY = ["Blood Sweat and Gear", "Call Nate", "Nate Will Be in Touch", "Heist Plans in Place"];

export const HEIST_FAQ: { question: string; answer: string }[] = [
  {
    question: "Do heist prep missions matter in GTA 6?",
    answer:
      "Some may. PowerPyx reports that how well you do one early prep mission changes how much time you get when the first big job starts. That is a single-source claim, and the details are behind the spoiler blur on this page (Reported).",
  },
  {
    question: "Do I play as Jason or Lucia in a heist?",
    answer:
      "Both. PC Gamer's mission summary lists Jason and Lucia together for the first big job, and PowerPyx says the game swaps you between them during it (Reported).",
  },
  {
    question: "Can I replay a heist if I want a better result?",
    answer:
      "Not directly. PowerPyx and Push Square both say story missions can't be replayed. Push Square suggests a manual save at the start of each chapter, using Options, then Game, then Save Game (Reported).",
  },
  {
    question: "Can I keep playing after the story ends?",
    answer:
      "Yes. Push Square says you can carry on in Leonida after the story, though the game warns you several times before the point of no return (Reported).",
  },
  {
    question: "Does this page have a full heist walkthrough?",
    answer:
      "No. Only PowerPyx has published a full route so far, and we don't want to copy it. We link to it, and we'll add more here once a second established outlet covers the jobs.",
  },
  {
    question: "Where do the heists sit in the story?",
    answer:
      "In the second half. Our spoiler-blurred missions list shows exactly where, and PC Gamer, Push Square and GamesRadar+ list them in the same positions (Reported).",
  },
];

export const HEIST_SOURCES = [
  {
    label: "PowerPyx: GTA 6 The Cartel Heist walkthrough (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-the-cartel-heist-walkthrough/",
    used: "The bank job: reward, timer, how it plays. Only outlet with a full route, so attributed throughout",
  },
  {
    label: "PowerPyx: GTA 6 Hidden Charges walkthrough (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-hidden-charges-walkthrough/",
    used: "Cargo, charges and time limit link",
  },
  {
    label: "PowerPyx: GTA 6 full walkthrough, all missions (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-full-walkthrough-all-missions/",
    used: "Which missions are tagged as heist prep, chapter order, no mission replay",
  },
  {
    label: "PC Gamer: GTA 6 mission list (18 Nov 2026)",
    url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-mission-list/",
    used: "Mission names, order and one-line summaries for Chapters 3 and 4",
  },
  {
    label: "Push Square: GTA 6 chapters and story missions",
    url: "https://www.pushsquare.com/guides/gta-6-chapters-and-story-missions",
    used: "Second check on mission names and order, no replays, manual saves, playing after the story",
  },
  {
    label: "GamesRadar+: GTA 6 mission list",
    url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-mission-list/",
    used: "Third check that the first job closes Chapter 3",
  },
  {
    label: "GamesRadar+: the complete GTA 6 trophy and achievement list (18 Nov 2026)",
    url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-trophy-achievement-list/",
    used: "Trophy text for both heist trophies",
  },
  {
    label: "TrueTrophies: Grand Theft Auto VI trophy list",
    url: "https://www.truetrophies.com/news/grand-theft-auto-vi-playstation-trophies",
    used: "Second check on the trophy text and that these trophies are secret",
  },
];
