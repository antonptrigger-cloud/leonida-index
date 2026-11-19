/**
 * Data for /guides/relationship. QC'd 19 Nov 2026 by re-reading every cited page.
 * Rules for this page:
 * - Confirmed = two main outlets (or Rockstar). Reported = one main outlet, or outlets that differ, always named.
 * - Main outlets used: VGC, PC Gamer, Polygon and GameSpot. Polygon-only lines are Reported.
 * - The four level names are listed identically by VGC, PC Gamer and Polygon, and GameSpot confirms a four-level system with level four as the max
 *   (it only names "Crazy In Love"). Polygon alone describes the heart icons.
 * - Checking the level: VGC and Polygon say the Jason and Lucia menu. VGC also gives the touch pad and a D-pad-right shortcut, but in another line
 *   says the same D-pad input sends a check-in text, so the shortcut is cut and the touch pad route is Reported.
 * - Starting level: Polygon and GameSpot say the Chapter 1 errands and repairs start the pair at Crazy in Love. Polygon alone says skipping them gives
 *   Partners in Crime. VGC's house guide says skipping the repairs leaves the meter much lower, and that the repairs can't be done once Lucia is out.
 * - Spoiler blur: VGC alone says a low meter costs dialogue, some mission options and one ending, and that one scripted story moment drops the
 *   meter one level. These are Reported and only appear inside the blur. PC Gamer says it doesn't yet know how a 1/4 run differs.
 * - Intimate scenes: PC Gamer and GameSpot both mention non-interactive scenes at higher levels. We keep one neutral line, with no triggers and no detail.
 * - Cut: VGC's D-pad-right line (self-contradictory), PC Gamer's scene triggers, GameSpot's scene section, and the strip club lines.
 * - No banned sources. No standalone Jason's house page (the Coming Home mission page already covers the repairs).
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const RELATIONSHIP_PUBLISHED = "2026-11-19";
/** Last edit, ISO 8601 with offset (Brisbane). Drives sitemap lastmod and dateModified. */
export const RELATIONSHIP_VERIFIED = "2026-11-19T23:20:00+10:00";
export const RELATIONSHIP_VERIFIED_LABEL = "19 Nov 2026";

export const RELATIONSHIP_FAQ: { question: string; answer: string }[] = [
  {
    question: "How many relationship levels are there in GTA 6?",
    answer: "Four: Running on Empty (1/4), Partners in Crime (2/4), Crazy in Love (3/4) and Hot Together (4/4). VGC, PC Gamer and Polygon list the same names, and GameSpot also describes four levels (Confirmed).",
  },
  {
    question: "How do I check Jason and Lucia's relationship level?",
    answer: "Open the Jason and Lucia menu. VGC and Polygon both say your current level is shown there (Confirmed). Polygon says it appears as a heart icon at the bottom of the screen (Reported).",
  },
  {
    question: "What is the fastest way to raise the relationship?",
    answer: "Do missions together, hold hands when prompted, use the kiss and hug prompts, reply to texts and go to bed at the same time. Two or more of VGC, PC Gamer, Polygon and GameSpot list each of these (Confirmed).",
  },
  {
    question: "Can Jason and Lucia break up for good?",
    answer: "No. VGC and Polygon both say you can't fully break them up. You can let the romance fade until they act like platonic partners (Confirmed).",
  },
  {
    question: "Does it matter if I play mostly as one character?",
    answer: "Yes. VGC and PC Gamer both say not to ignore your partner for long, and PC Gamer says Rockstar's advice is to play both sides of the relationship. Neglect lowers the meter (Confirmed).",
  },
];

export const RELATIONSHIP_SOURCES = [
  {
    label: "VGC: Jason & Lucia relationship levels explained",
    url: "https://www.videogameschronicle.com/guide/gta-6-jason-lucia-relationship-levels-explained-how-to-improve-jason-and-lucias-relationship/",
    used: "Four level names, the Jason and Lucia menu, the touch pad route, affection actions, neglect, the blurred story effects",
  },
  {
    label: "PC Gamer: GTA 6 romance guide",
    url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-romance-jason-lucia/",
    used: "Four levels, the heart pop-up and chime, the long list of heart actions, what costs hearts, playing both roles",
  },
  {
    label: "Polygon: How romance works in GTA 6",
    url: "https://www.polygon.com/gta-6-romance-guide-how-to-improve-relationship-level-grand-theft-auto/",
    used: "Four levels and their heart icons, the menu, how to raise and lose hearts, the Chapter 1 head start",
  },
  {
    label: "GameSpot: GTA 6 romance guide",
    url: "https://www.gamespot.com/articles/gta-6-romance-relationships/",
    used: "Four-level system, hold-hands and prompt inputs, the Chapter 1 errands and Crazy in Love start, missable errands",
  },
  {
    label: "VGC: Jason's house, how to fix all projects",
    url: "https://www.videogameschronicle.com/guide/gta-6-jasons-house-how-to-fix-all-projects-around-jasons-house/",
    used: "The house repairs can't be done once Lucia is free, and skipping them lowers the starting meter",
  },
];
