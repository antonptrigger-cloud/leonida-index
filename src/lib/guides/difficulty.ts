/**
 * Data for /guides/difficulty. QC'd 20 Nov 2026 by re-reading every cited page.
 * Rules for this page:
 * - Confirmed = two main outlets (or Rockstar). Reported = one main outlet, or any non-main outlet, always named.
 * - Main outlets used: GameSpot, Push Square, PC Gamer. Game8 and Gfinity are not on our main list: they only corroborate the toggles and are never the sole source.
 * - "No difficulty levels": GameSpot ("no difficulty options to choose from") and Push Square (tips guide: "doesn't have traditional difficulty options"; news: Rockstar
 *   "never deals in difficulty levels") agree. Confirmed. The meta says "no difficulty levels", not "no Easy mode", because Push Square's headline calls the two toggles an
 *   easy mode, and GameSpot doesn't mention the toggles at all.
 * - Aim settings can be adjusted: GameSpot and Push Square. Confirmed.
 * - Cheats unlock after the story: GameSpot and PC Gamer. Confirmed.
 * - Reported (Push Square only, news piece and tips guide count as one outlet): the two toggles, their place at Settings > Gameplay (options 24 and 25), what each does,
 *   the on-screen warning, the "not invincible" test, the Settings steps (Options > Settings, so step 1 is Reported), the list of other accessibility options and the Classic control scheme.
 * - Trophies: only Push Square says the toggles don't disable trophies or alter the story. Reported and hedged. Our live cheats guide (GamesRadar+ and Push Square) says cheats do switch trophies off.
 * - Wording difference: Push Square's news piece says Accessible Combat lowers enemy health and enemy damage to you. Its tips guide says you take less damage and enemies take more.
 *   We say enemies go down faster and hit you less hard, and don't pick one mechanic.
 * - Cut: "no difficulty menu later on" and "nothing when you start a new game" (not stated), the Xbox button name, "toggles are available from the start" (not stated).
 * - No story spoilers. No banned sources.
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const DIFFICULTY_PUBLISHED = "2026-11-20T01:12:00+10:00";
/** Last edit, ISO 8601 with offset (Brisbane). Drives sitemap lastmod and dateModified. */
export const DIFFICULTY_VERIFIED = "2026-11-20T01:12:00+10:00";
export const DIFFICULTY_VERIFIED_LABEL = "20 Nov 2026";

export const DIFFICULTY_FAQ: { question: string; answer: string }[] = [
  {
    question: "Does GTA 6 have an easy mode?",
    answer:
      "There are no difficulty levels (GameSpot and Push Square, Confirmed). Push Square says two accessibility toggles, Accessible Combat and Reduced Vehicle Damage, amount to an easy mode (Reported).",
  },
  {
    question: "Where are the easier settings?",
    answer: "Push Square says to press Options, then go to Settings > Gameplay and scroll to the bottom, to options 24 and 25 (Reported).",
  },
  {
    question: "What does Accessible Combat do?",
    answer: "Push Square says it makes enemies easier to beat and reduces the damage you take, but doesn't make you invincible (Reported). You still need cover in firefights.",
  },
  {
    question: "Do these settings disable trophies?",
    answer:
      "Push Square says they don't disable trophies or change the story, but no second main outlet says so yet, so treat it as unconfirmed (Reported). Cheats are different: our cheats guide says trophies and saving are switched off while one is active.",
  },
  {
    question: "Can you make GTA 6 harder?",
    answer: "There is no hard mode. GameSpot says you can adjust the aiming settings, and that cheats unlock after the campaign and can make life easier or harder (Confirmed for the aim settings and the cheat unlock).",
  },
];

export const DIFFICULTY_SOURCES = [
  {
    label: "GameSpot: What are the GTA 6 difficulty options?",
    url: "https://www.gamespot.com/articles/what-are-the-gta-6-difficulty-options/",
    used: "No difficulty options, adjustable aiming, cheats unlock after the campaign",
  },
  {
    label: "Push Square: GTA 6 has an easy mode buried in its accessibility options",
    url: "https://www.pushsquare.com/news/2026/11/gta-6-has-an-easy-mode-buried-in-an-impressive-range-of-accessibility-options",
    used: "The two toggles and what they do, the warning, the not-invincible test, the trophies line, other accessibility options",
  },
  {
    label: "Push Square: GTA 6 tips and tricks you need to know",
    url: "https://www.pushsquare.com/guides/gta-6-tips-and-tricks-you-need-to-know",
    used: "Menu path (Options > Settings > Gameplay, options 24 and 25), the Classic control scheme, stealth takedowns, BuckMe banking",
  },
  {
    label: "PC Gamer: all GTA 6 cheats and how to unlock them",
    url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-cheats-list/",
    used: "Cheats unlock only after the main story, and using one blocks saving",
  },
  {
    label: "Game8 and Gfinity (corroboration only, not relied on alone)",
    url: "https://www.gfinityesports.com/article/gta-6-how-to-change-difficulty-settings",
    used: "Both list the same two toggles and say there are no difficulty levels",
  },
];
