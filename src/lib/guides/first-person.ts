/**
 * Data for /guides/first-person. QC'd 19 Nov 2026 by re-reading every cited page.
 * Rules for this page:
 * - Confirmed = two main outlets (or Rockstar). Reported = one outlet, or outlets that disagree, always named.
 * - No full first-person mode: Push Square, GamesRadar+ and PowerPyx (Confirmed).
 * - Inspect input CONFLICT: GamesRadar+ says hold L2/LT and click L3 + R3. Push Square says hold L2 then press R3. PowerPyx says hold L2 + R3 / LT + Right Stick.
 *   Two outlets agree on R3 alone, but GamesRadar+ differs, so the input is shown per outlet. Standing still and not being able to walk: Push Square and PowerPyx.
 *   GamesRadar+ adds it only works "in certain moments, such as when talking to NPCs or when looking through scoped weapons", which neither other outlet says.
 * - Scoped aiming: hold L2 and press R3 on a scoped gun: Push Square, GamesRadar+ and PowerPyx (Confirmed). Buying an optic at a gun shop: Push Square (Ammu-Nation,
 *   Attachments > Optics) and PowerPyx (any gun store). Strafing while scoped, and pressing R3 each time: Push Square only.
 * - Driving CONFLICT: Push Square and GamesRadar+ say you can't drive in first person. PowerPyx alone says first person works while driving with the phone out (D-pad Up).
 *   Kept, attributed and flagged as unconfirmed and contradicted.
 * - Push Square only (Reported): R2 zoom, three vehicle camera angles (hold Down, Square), Cinematic mode (hold Down, Options) and Circle auto-drive to a waypoint, story moments
 *   that briefly switch perspective. These are PlayStation button names. GamesRadar+ only (Reported): no first-person cheat.
 * - Not used: PowerPyx and GamesRadar+ speculation about a future first-person mode (they disagree). No story beats named. No banned sources.
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const FIRSTPERSON_PUBLISHED = "2026-11-19";
/** Last edit, ISO 8601 with offset (Brisbane). Drives sitemap lastmod and dateModified. */
export const FIRSTPERSON_VERIFIED = "2026-11-20T19:08:24+10:00";
export const FIRSTPERSON_VERIFIED_LABEL = "20 Nov 2026";

export const FIRSTPERSON_FAQ: { question: string; answer: string }[] = [
  {
    question: "Does GTA 6 have a first-person mode?",
    answer:
      "No. Push Square, GamesRadar+ and PowerPyx all say you can't play the whole game in first person (Confirmed). What you get is a stationary inspect view and first-person aiming through a scope.",
  },
  {
    question: "How do I go first person in GTA 6?",
    answer:
      "Stand still, hold L2 (LT on Xbox) and press R3, the right stick click, according to Push Square and PowerPyx. GamesRadar+ says to click L3 and R3 together while holding the trigger, so the outlets differ. You can't walk in this view.",
  },
  {
    question: "Can you drive in first person in GTA 6?",
    answer:
      "Push Square and GamesRadar+ say no (Confirmed). PowerPyx alone says you can drive in first person while your phone is out, which the other two don't mention, so treat it as unconfirmed.",
  },
  {
    question: "How do I aim down sights in first person?",
    answer:
      "Fit an optic to your gun, then aim with L2 / LT and press R3 to look through the scope. Push Square, GamesRadar+ and PowerPyx all describe this (Confirmed). Push Square says to buy optics at an Ammu-Nation, and PowerPyx says any gun store.",
  },
  {
    question: "Is there a cheat for first person?",
    answer: "GamesRadar+ says it checked and found no GTA 6 cheat that turns on first person (Reported). No other outlet has reported one.",
  },
];

export const FIRSTPERSON_SOURCES = [
  {
    label: "Push Square: GTA 6: How to Go First-Person",
    url: "https://www.pushsquare.com/guides/gta-6-how-to-go-first-person",
    used: "No first-person mode, the inspect view and R2 zoom, scoped aiming, no first-person driving, the three vehicle cameras and Cinematic mode",
  },
  {
    label: "GamesRadar+: Does GTA 6 have a first person mode? (19 Nov 2026)",
    url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-first-person-mode-explained/",
    used: "No dedicated mode, its different L2 + L3 + R3 input, scoped aiming, no first-person driving, and no first-person cheat",
  },
  {
    label: "PowerPyx: GTA 6 How to Play in First-Person View (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-how-to-play-in-first-person-view/",
    used: "The L2 + R3 inspect input, scoped aiming, buying optics at a gun store, and the phone-out driving claim only it makes",
  },
];
