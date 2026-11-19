/**
 * Data for /guides/strangers-and-freaks. QC'd 19 Nov 2026.
 * Trophy text: PC Gamer, GamesRadar+, TrueTrophies, TrueAchievements (Confirmed).
 * Which questlines count: PowerPyx plus IndiaTimes agree on Kirk, Kyle and Yago counting and on Andy,
 * Billy and Tyrone not counting. IndiaTimes is outside the usual outlet list but is the only second
 * source for this specific claim, so it is cited for it and flagged on the page.
 * Held back: Pilot Pete (PowerPyx only among established outlets), plus Shirley, Yasmani and Eddie
 * Acosta "not counting" (PowerPyx only), and every reward figure (secondary sites only).
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const SF_VERIFIED = "2026-11-19";
export const SF_VERIFIED_LABEL = "19 Nov 2026";

export interface Questline {
  who: string;
  chapter: string;
  /** Plain-words notes from PowerPyx unless stated. */
  notes: string;
}

export const COUNTING: Questline[] = [
  { who: "Kirk", chapter: "Chapter 1", notes: "Three errands. The first is night only, and the last is Lucia only and night only. PowerPyx says it can start in Chapter 1 but can't be finished until Chapter 2." },
  { who: "Kyle", chapter: "Chapter 2", notes: "Three errands, starting with a visit to a farm." },
  { who: "Yago", chapter: "Chapter 3", notes: "Four errands, mostly Jason only. One race is time-sensitive and can be missed (PowerPyx and Push Square)." },
];

export const NOT_COUNTING: Questline[] = [
  { who: "Andy", chapter: "Chapter 3", notes: "Lucia only. Finishing it earns the Road to Rehabilitation trophy instead." },
  { who: "Billy", chapter: "Chapter 2", notes: "Finishing it earns The Lone Rider trophy instead." },
  { who: "Tyrone", chapter: "Chapter 3", notes: "Finishing it earns Spin On This! instead." },
];

export const SF_FAQ: { question: string; answer: string }[] = [
  {
    question: "How many Strangers & Freaks do I need?",
    answer:
      "Eight. The trophy asks you to complete 8 mission strands for strangers across Leonida, and PC Gamer, GamesRadar+, TrueTrophies and TrueAchievements print the same text (Confirmed).",
  },
  {
    question: "Do all side characters count toward the trophy?",
    answer:
      "No. PowerPyx and IndiaTimes both say only some questlines count. Several characters, such as Andy, Billy and Tyrone, have their own trophy but don't move the Strangers & Freaks counter (Reported).",
  },
  {
    question: "How do I know which ones counted?",
    answer:
      "Check your trophy progress before and after the last mission of a questline. PowerPyx says this is the only reliable way, because the game doesn't list which strands count (Reported).",
  },
  {
    question: "Can I finish them after the story?",
    answer: "Yes. PowerPyx and IndiaTimes both say the trophy-related questlines stay available in free roam after the story (Reported).",
  },
  {
    question: "Is this list complete?",
    answer:
      "No. Three of the eight qualifying strands are confirmed by two outlets so far. PowerPyx names one more that we're holding until a second main outlet matches it, so four or five remain unknown.",
  },
  {
    question: "Does Kenton's questline count?",
    answer:
      "Kenton has his own trophy, This Was No Boat Accident. Neither PowerPyx nor IndiaTimes says it moves the Strangers & Freaks counter, so check your progress when you finish it.",
  },
];

export const SF_SOURCES = [
  {
    label: "PowerPyx: GTA 6 all Strangers & Freaks side missions (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-all-strangers-freaks-side-missions/",
    used: "Which questlines count, chapters, night and character limits, how to track, availability after the story",
  },
  {
    label: "IndiaTimes: GTA 6 stranger missions guide (18 Nov 2026)",
    url: "https://www.indiatimes.com/game-guides/gta-6-stranger-missions-guide-all-7-confirmed-characters-side-activities-and-achievements-explained/articleshow/135967097.html",
    used: "Second source that Kirk, Kyle and Yago count and Andy, Billy and Tyrone don't (not on our usual outlet list)",
  },
  {
    label: "Push Square: GTA 6 chapters and story missions",
    url: "https://www.pushsquare.com/guides/gta-6-chapters-and-story-missions",
    used: "Confirms the side questlines exist and that one of Yago's races is time-sensitive",
  },
  {
    label: "PC Gamer: GTA 6 achievement list (18 Nov 2026)",
    url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-achievements-list/",
    used: "Trophy text for Strangers & Freaks and the character trophies",
  },
  {
    label: "GamesRadar+: the complete GTA 6 trophy and achievement list (18 Nov 2026)",
    url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-trophy-achievement-list/",
    used: "Same trophy text",
  },
  {
    label: "TrueTrophies: Grand Theft Auto VI trophy list",
    url: "https://www.truetrophies.com/news/grand-theft-auto-vi-playstation-trophies",
    used: "Third check on the Strangers & Freaks trophy text",
  },
];
