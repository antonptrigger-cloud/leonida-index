/**
 * Data for /guides/money. QC'd 19 Nov 2026 against the three cited pages.
 * Rules: every figure is labelled Reported and attributed. Where outlets disagree we give the
 * range. Claims that only one outlet makes are worded as that outlet's report.
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const MONEY_VERIFIED = "2026-11-19";
export const MONEY_VERIFIED_LABEL = "19 Nov 2026";

export const MONEY_FAQ: { question: string; answer: string }[] = [
  {
    question: "What's the fastest way to make money in GTA 6?",
    answer:
      "PowerPyx reports that large bank vault robberies, unlocked late in the story, pay up to $205,000 each (Reported). Before that, stolen cars, hideouts and store jobs are the best options, and which one pays most changes as the story moves on.",
  },
  {
    question: "Should I save money in Chapter 1?",
    answer:
      "No. PowerPyx says money you carry at the end of Chapter 1 is lost, so there is no point farming it. Spend it on gear or repairs you want, and play the story (Reported).",
  },
  {
    question: "Can I rob stores early in the game?",
    answer:
      "Yes. PowerPyx lists store hold-ups, gang hideouts and races as the early earners. GameSpot also points to hideouts, which it says pay almost as soon as you hand the goods to a dealer (Reported).",
  },
  {
    question: "Is treasure diving worth it?",
    answer:
      "It depends how much time you have. GameSpot says Kenton eventually pays tens of thousands of dollars if you find every piece at each dive spot, while PC Gamer calls diving mildly lucrative but very time-consuming (Reported).",
  },
  {
    question: "Do small stores and pawn shops pay well?",
    answer:
      "Not compared with the bigger targets, according to GameSpot. It says small pawn shops are often not worth the trouble, and the better money is in higher-end stores and big banks (Reported).",
  },
];

export const MONEY_SOURCES = [
  {
    label: "PowerPyx: GTA 6 money guide, how to get money fast (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-money-guide-how-to-get-money-fast/",
    used: "Chapter-by-chapter methods, car jobs, jewelry, Pay 'n' Spray and fence payouts, vault robberies",
  },
  {
    label: "GameSpot: Best ways to make money fast in GTA 6 (18 Nov 2026)",
    url: "https://www.gamespot.com/articles/best-ways-to-make-money-fast-in-gta-6/",
    used: "Kenton's dives, gang hideouts, fence contracts, Pay 'n' Spray, rent money in Port Gellhorn",
  },
  {
    label: "PC Gamer: GTA 6, the fastest ways to make money (18 Nov 2026)",
    url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-how-to-make-money/",
    used: "Car-job payouts and cooldown, back-door store jobs, fences, diving",
  },
];
