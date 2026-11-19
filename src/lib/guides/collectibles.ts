/**
 * Data for /guides/collectibles. QC'd 19 Nov 2026 against PowerPyx (Progress Database, card sets and
 * WAiNK pages), Push Square (card sets, WAiNK landmarks) and the trophy text from PC Gamer,
 * GamesRadar+, TrueTrophies and TrueAchievements.
 * Rules: card set sizes are matched by PowerPyx and Push Square; everything else is attributed to the
 * outlet that says it. Mobalytics and All Things How are not used.
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const COLLECT_VERIFIED = "2026-11-19";
export const COLLECT_VERIFIED_LABEL = "19 Nov 2026";

export const CARD_SETS: [string, number][] = [
  ["Vice City Flamingos", 24],
  ["Vice City Narcos", 24],
  ["Vice City Manatees", 24],
  ["Vice City Club De Fútbol", 30],
  ["Liberty City Swingers", 24],
  ["Liberty City Penetrators", 24],
  ["Liberty City Wrath", 24],
  ["Los Santos Corkers", 24],
  ["Los Santos Panic", 24],
  ["Los Santos Pounders", 24],
  ["Backyard Wrestling", 12],
  ["America's Next Top Hooker", 24],
  ["Delights Dancers", 18],
  ["Jack of Hearts Dancers", 36],
  ["Nine1Nine Dancers", 36],
  ["The Legends of Ratface", 36],
  ["Right Wing: America's Hero", 36],
  ["Ed Comics Universe", 36],
];

export const CARD_TOTAL = CARD_SETS.reduce((n, [, c]) => n + c, 0);

export const COLLECT_FAQ: { question: string; answer: string }[] = [
  {
    question: "How many collectible cards are there in GTA 6?",
    answer:
      "480 cards in 18 sets, according to PowerPyx. Push Square lists the same 18 sets and the same size for each one (Reported).",
  },
  {
    question: "How many card sets do I need for the trophy?",
    answer:
      "Three. The Don't Touch My Deck trophy asks for 3 complete collectible card sets, and PC Gamer, GamesRadar+, TrueTrophies and TrueAchievements all print the same text (Confirmed).",
  },
  {
    question: "How many WAiNK scans do I need?",
    answer:
      "100. The You WAiNKer! trophy asks for WAiNK scans at 100 locations. PowerPyx says the same 100 are needed for the 100% completion checklist (Reported).",
  },
  {
    question: "Do I need every collectible for 100% completion?",
    answer:
      "No. PowerPyx says the 100% checklist only needs certain categories in part, such as 15 of the 18 card sets and 100 WAiNK scans (Reported).",
  },
  {
    question: "Can I sell collectible cards?",
    answer:
      "Yes. PowerPyx and Push Square both say pawn shops buy cards and that selling one doesn't remove it from your Collections log. Push Square adds that not every pawn shop deals in cards (Reported).",
  },
  {
    question: "Are any collectibles missable?",
    answer:
      "Push Square says it will flag any card that turns out to be missable. We haven't seen one confirmed yet, and we'll update this page if that changes.",
  },
];

export const COLLECT_SOURCES = [
  {
    label: "PowerPyx: GTA 6 collectible guide, Progress Database (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-collectible-guide-progress-database/",
    used: "Category totals, card set sizes, WAiNK groups, meditation spots, cocaine flamingos, Progress menu",
  },
  {
    label: "PowerPyx: GTA 6 all collectible card sets (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-all-collectible-card-sets-locations/",
    used: "Card sets, 3 sets for the trophy, 15 sets for 100%, selling, colour variants",
  },
  {
    label: "PowerPyx: GTA 6 all WAiNK scan locations (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-all-waink-scan-locations/",
    used: "WAiNK groups, 100 scans for the trophy and 100%, scan cues, street art not counting",
  },
  {
    label: "Push Square: GTA 6 collectible card locations",
    url: "https://www.pushsquare.com/guides/gta-6-collectible-card-locations",
    used: "Second check on all 18 sets and sizes, selling, Progress menu path, random yellow containers",
  },
  {
    label: "Push Square: GTA 6 WAiNK landmark locations",
    url: "https://www.pushsquare.com/guides/gta-6-waink-landmark-locations",
    used: "Second check on 31 landmarks, scan controls, Progress menu path",
  },
  {
    label: "PC Gamer: GTA 6 achievement list (18 Nov 2026)",
    url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-achievements-list/",
    used: "Trophy text for Don't Touch My Deck, You WAiNKer!, Positive Mental Attitude and Whip It Good",
  },
  {
    label: "GamesRadar+: the complete GTA 6 trophy and achievement list (18 Nov 2026)",
    url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-trophy-achievement-list/",
    used: "Same trophy text, and 18 meditation spots",
  },
  {
    label: "TrueTrophies: Grand Theft Auto VI trophy list",
    url: "https://www.truetrophies.com/news/grand-theft-auto-vi-playstation-trophies",
    used: "Third check on the visible trophy names and text",
  },
];
