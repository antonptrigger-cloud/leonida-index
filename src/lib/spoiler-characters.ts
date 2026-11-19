/**
 * Which character cards are safe to show where. Pure data and helpers: must not import from src/lib/seo
 * (src/lib/characters/characters.ts and the SEO registry both read it).
 *
 * Intro chapter = the chapter in which PowerPyx/GameSpot say the character is first met or first starts a
 * quest. Anything not listed is treated as Chapter 1: Rockstar-profiled characters (their names and
 * profiles were public before launch) and the Chapter 1 characters Kenton, Kirk and Donnie.
 * A character we cannot confirm as Chapter 1 belongs in this table, not outside it.
 */
export const CHARACTER_INTRO_CHAPTER: Record<string, number> = {
  moses: 2, // PowerPyx: Moses (Take A Vehicle to Moses), 31st main mission, Chapter 2
  dunk: 2, // PowerPyx: Slam Dunk, 37th main mission, Chapter 2
  kyle: 2, // PowerPyx: Check Out McKittrick Farm, Chapter 2
  billy: 2, // PowerPyx: Thrillbillies, Chapter 2
  bret: 2, // PowerPyx: Veteran Hunted (Meet Bret), Chapter 2
  randy: 3, // PowerPyx: about halfway through Chapter 3
  tyrone: 3, // PowerPyx Strangers & Freaks list: Chapter 3
  yago: 3, // PowerPyx: Join a Street Race, Chapter 3
  andy: 3, // PowerPyx: Climbing the Cellerichain, Chapter 3
  "pilot-pete": 4, // PowerPyx: The Last Mile, Chapter 4
};

/**
 * Characters whose name is also the title of a Chapter 2+ story mission ("Moses (Take A Vehicle to Moses)",
 * "Slam Dunk"). Their names stay out of visible text, metas, FAQs and JSON-LD on every other page; these
 * neutral phrases stand in. Their own profile pages and each other's are unchanged.
 */
export const NAME_IS_SPOILER: Record<string, string> = {
  moses: "a Port Gellhorn mechanic",
  dunk: "a Port Gellhorn dealer",
};

export const introChapter = (slug: string): number => CHARACTER_INTRO_CHAPTER[slug] ?? 1;

/**
 * May the card or link for `slug` appear on a page of chapter `pageChapter`?
 * `pageSlug` is the character whose own profile page this is, if any.
 * - A card never shows before the chapter the character is introduced in.
 * - A name-is-spoiler character shows only on its own page and on the other name-is-spoiler profile.
 */
export function cardAllowed(slug: string, pageChapter: number, pageSlug?: string): boolean {
  if (introChapter(slug) > pageChapter) return false;
  if (slug in NAME_IS_SPOILER && !(pageSlug && pageSlug in NAME_IS_SPOILER)) return false;
  return true;
}
