/**
 * Data for /guides/switch-characters. QC'd 19 Nov 2026 by re-reading every cited page.
 * Rules for this page:
 * - Confirmed = two main outlets. Reported = one main outlet, always named.
 * - The switch button is disputed. PowerPyx and GamesRadar+ say hold D-pad right, then R1/RB; GameSpot says press L1/LB at any
 *   time; VGC only says press right on the D-pad. We lead with the majority and show GameSpot's version.
 * - The exact unlock point is not settled: PowerPyx says after the mission Coffee Break, GameSpot says about 30% of the story,
 *   GamesRadar+ says "a certain milestone in Chapter 2". Both single-outlet figures are Reported.
 * - Chapter 2 mission names are spoilers on this site (blurred on the missions hub), so Coffee Break and the story reasons for the
 *   delay are only inside the spoiler block. Titles, meta, FAQ and schema are spoiler-free.
 * - Cut from the draft: "PowerPyx says Chapter 2 is mainly Lucia while Jason recovers" (not on the PowerPyx page), and the
 *   claim that splitting up pulls police away (GamesRadar+ only says you can split up). The GamesRadar+ "hold left" sentence
 *   looks like a typo and is not used.
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const SWITCH_PUBLISHED = "2026-11-19";
/** Last edit, ISO 8601 with offset (Brisbane). Drives sitemap lastmod and dateModified. */
export const SWITCH_VERIFIED = "2026-11-20T07:08:00+10:00";
export const SWITCH_VERIFIED_LABEL = "20 Nov 2026";

export const SWITCH_STEPS: { name: string; text: string }[] = [
  { name: "Reach the unlock", text: "Free switching opens partway through Chapter 2. Before that the other character is not available in the open world." },
  { name: "Be in free roam", text: "Make sure you are in the open world and not inside a mission." },
  { name: "Open the partner menu", text: "Hold right on the D-pad." },
  { name: "Swap", text: "Press R1 on PS5 or RB on Xbox. GameSpot says L1/LB instead, so try that if the first does not respond." },
  { name: "Or meet up", text: "In the same menu, press Triangle or Y to have your partner meet you." },
];

export const SWITCH_FAQ: { question: string; answer: string }[] = [
  {
    question: "When can you switch characters in GTA 6?",
    answer:
      "Partway through Chapter 2. PowerPyx, GamesRadar+ and VGC all put free switching in Chapter 2 (Confirmed). GameSpot's rough guide is about 30% of the way through the main story, and it says the percentage shifts with the side missions you've done (Reported).",
  },
  {
    question: "What button switches characters?",
    answer:
      "PowerPyx and GamesRadar+ say hold right on the D-pad, then press R1 on PS5 or RB on Xbox (Confirmed). GameSpot says press L1/LB at any time, which doesn't match, so try that if the D-pad combo doesn't respond.",
  },
  {
    question: "Why can't I switch to the other character?",
    answer:
      "You may be before the Chapter 2 unlock, or in a mission. GamesRadar+ and VGC say a darkened or greyed-out character means they're busy or unavailable (Confirmed). PowerPyx says the other character can be greyed out while you're at home, and that stepping outside usually fixes it (Reported).",
  },
  {
    question: "Can I play every mission as either character?",
    answer:
      "Not always. PowerPyx and GamesRadar+ say some missions must be played as one character and mark which on the map (Confirmed). GameSpot adds that most other missions can be played as either, and that the game occasionally switches you automatically when the story needs it (Reported).",
  },
  {
    question: "How do I meet up with my partner?",
    answer:
      "Hold right on the D-pad and press Triangle or Y (PowerPyx and GamesRadar+, Confirmed). GamesRadar+ says you can also call them from the Contacts app on your phone.",
  },
];

export const SWITCH_SOURCES = [
  {
    label: "PowerPyx: GTA 6 How to Switch Between Playing as Lucia & Jason",
    url: "https://www.powerpyx.com/gta-6-how-to-switch-between-playing-as-lucia-jason/",
    used: "Chapter 1 limits, the Chapter 2 unlock and the mission it follows, hold D-pad right and R1/RB, meeting up, the greyed-out portrait at home and the map icon for solo missions",
  },
  {
    label: "GamesRadar+: How to switch characters in GTA 6 (19 Nov 2026)",
    url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-switch-characters-command/",
    used: "Chapter 2 milestone, D-pad right and R1/RB, busy partner, J and L map markers, WhatUp check-ins, letting your partner drive, seat swaps in a chase, robberies and stash bags",
  },
  {
    label: "VGC: How to change characters in GTA 6",
    url: "https://www.videogameschronicle.com/guide/how-to-change-characters-in-gta-6/",
    used: "Free switching after Chapter 1, pressing right on the D-pad, greyed-out characters, the RydeMe note and the story reasons for the delay",
  },
  {
    label: "GameSpot: How To Switch Between Jason And Lucia In GTA 6 (18 Nov 2026)",
    url: "https://www.gamespot.com/articles/how-to-switch-between-jason-and-lucia-in-gta-6/",
    used: "The disagreeing L1/LB button, the roughly 30% unlock point, solo and joint missions, and automatic switches in missions",
  },
];
