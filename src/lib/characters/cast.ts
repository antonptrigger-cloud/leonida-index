/**
 * GTA 6 cast evidence page (/database/characters/cast).
 *
 * This page is about real people, so it is deliberately conservative:
 * - "Confirmed" means Rockstar, or the person themselves in a first-party source, says it.
 * - "Reported" means established outlets say it but no official statement names that exact fact.
 * - "To be confirmed" means we have nothing solid. Rumoured actors are never named.
 * - Nothing here is negative or speculative about any person.
 * Rockstar published official credits at https://www.rockstargames.com/VI/credits after launch
 * on 19 November 2026. This page lists the characters we have profiles for. It does not repeat
 * the rest of the credits list, which includes later-story names.
 *
 * This file must not import from src/lib/seo (site.ts imports it).
 */
import type { CharSourceId } from "./characters";

export const CAST_PATH = "/database/characters/cast";
export const CAST_TITLE = "GTA 6 Cast: Who Voices Lucia and Jason?";
export const CAST_DESCRIPTION =
  "Who voices Lucia and Jason in GTA 6? Official credits name Manni L. Perez as Lucia and Dylan Rourke as Jason, plus the rest of our profiled cast.";
export const CAST_VERIFIED = "2026-11-22";
export const CAST_VERIFIED_LABEL = "22 Nov 2026";

export type CastStatus = "confirmed" | "reported" | "tbc";

export interface CastRow {
  character: string;
  /** Slug of a profile on this site, when there is one. */
  slug?: string;
  person: string;
  /** Is this person credited on / involved in the game? */
  involvement: { status: CastStatus; text: string };
  /** Does a source link this person to this character? */
  role: { status: CastStatus; text: string };
  evidence: string;
}

export const CAST_ROWS: CastRow[] = [
  {
    character: "Lucia Caminos",
    slug: "lucia-caminos",
    person: "Manni L. Perez",
    involvement: { status: "confirmed", text: "Listed in Rockstar's official credits" },
    role: { status: "confirmed", text: "Lucia Caminos" },
    evidence:
      "Rockstar's official credits, checked on 22 November 2026, list Manni L. Perez as Lucia Caminos. She was also a 2026 Game Awards Best Performance nominee for Grand Theft Auto VI.",
  },
  {
    character: "Jason Duval",
    slug: "jason-duval",
    person: "Dylan Rourke",
    involvement: { status: "confirmed", text: "Listed in Rockstar's official credits" },
    role: { status: "confirmed", text: "Jason Duval" },
    evidence: "Rockstar's official credits, checked on 22 November 2026, list Dylan Rourke as Jason Duval.",
  },
  {
    character: "Cal Hampton",
    slug: "cal-hampton",
    person: "Bobby Moynihan",
    involvement: { status: "confirmed", text: "Listed in Rockstar's official credits" },
    role: { status: "confirmed", text: "Cal, in the official credits" },
    evidence:
      "Rockstar's official credits list Bobby Moynihan as Cal. The People profile uses the full name Cal Hampton.",
  },
  {
    character: "Brian Heder",
    slug: "brian-heder",
    person: "Stephen Root",
    involvement: { status: "confirmed", text: "Listed in Rockstar's official credits" },
    role: { status: "confirmed", text: "Brian Heder" },
    evidence:
      "Rockstar's official credits list Stephen Root as Brian Heder. Root had already said, in his own words to AP in September 2026, that he is in the game.",
  },
  {
    character: "Lori Heder",
    slug: "lori",
    person: "Orlagh Cassidy",
    involvement: { status: "confirmed", text: "Listed in Rockstar's official credits" },
    role: { status: "confirmed", text: "Lori Heder" },
    evidence:
      "Rockstar's official credits list Orlagh Cassidy as Lori Heder. Brian's People profile had used only the name Lori.",
  },
  {
    character: "Boobie Ike",
    slug: "boobie-ike",
    person: "Mike Forbs",
    involvement: { status: "confirmed", text: "Listed in Rockstar's official credits" },
    role: { status: "confirmed", text: "Boobie Ike" },
    evidence: "Rockstar's official credits list Mike Forbs as Boobie Ike.",
  },
  {
    character: "Dre'Quan Priest",
    slug: "dre-quan-priest",
    person: "Naiqui Macabroad",
    involvement: { status: "confirmed", text: "Listed in Rockstar's official credits" },
    role: { status: "confirmed", text: "Dre'Quan, in the official credits" },
    evidence:
      "Rockstar's official credits list Naiqui Macabroad as Dre'Quan. The People profile uses the full name Dre'Quan Priest.",
  },
  {
    character: "Bae-Luxe",
    slug: "real-dimez",
    person: "Hood Brat",
    involvement: { status: "confirmed", text: "Listed in Rockstar's official credits" },
    role: { status: "confirmed", text: "Bae-Luxe" },
    evidence: "Rockstar's official credits list Hood Brat as Bae-Luxe, one half of Real Dimez.",
  },
  {
    character: "Roxy Rashad",
    slug: "real-dimez",
    person: "Krissy Celess",
    involvement: { status: "confirmed", text: "Listed in Rockstar's official credits" },
    role: { status: "confirmed", text: "Roxy Rashad" },
    evidence:
      "Rockstar's official credits list Krissy Celess as Roxy Rashad. The People profile names her Roxy, one half of Real Dimez.",
  },
  {
    character: "Raul Bautista",
    slug: "raul-bautista",
    person: "Manny Perez",
    involvement: { status: "confirmed", text: "Listed in Rockstar's official credits" },
    role: { status: "confirmed", text: "Raul Bautista" },
    evidence: "Rockstar's official credits list Manny Perez as Raul Bautista.",
  },
  {
    character: "DWNPLY",
    slug: "dwnply",
    person: "Denzel Curry",
    involvement: { status: "confirmed", text: "Listed in Rockstar's official credits" },
    role: { status: "confirmed", text: "DWNPLY" },
    evidence:
      "Rockstar's official credits list Denzel Curry as DWNPLY. The Real Dimez People profile names DWNPLY as the local rapper on an early hit single.",
  },
];

export const CAST_SHORT_ANSWER: { status: CastStatus; text: string }[] = [
  { status: "confirmed", text: "Rockstar published official Grand Theft Auto VI credits after launch, at rockstargames.com/VI/credits." },
  { status: "confirmed", text: "Those credits list Manni L. Perez as Lucia Caminos and Dylan Rourke as Jason Duval." },
  { status: "confirmed", text: "Stephen Root is listed as Brian Heder, and Bobby Moynihan as Cal." },
  { status: "confirmed", text: "The same credits name performers for the other official People-profile characters, plus Lori Heder and DWNPLY." },
  { status: "confirmed", text: "Names and performers for the contacts and side-quest characters we already profile are on each of those profile pages, taken from the same credits." },
];

export const CAST_FAQ: { question: string; answer: string }[] = [
  {
    question: "Who plays Lucia Caminos in GTA 6?",
    answer:
      "Manni L. Perez. Rockstar's official credits, checked on 22 November 2026, list her as Lucia Caminos. She was also a 2026 Game Awards Best Performance nominee for Grand Theft Auto VI.",
  },
  {
    question: "Who plays Jason Duval in GTA 6?",
    answer: "Dylan Rourke. Rockstar's official credits, checked on 22 November 2026, list him as Jason Duval.",
  },
  {
    question: "Is Stephen Root in GTA 6?",
    answer:
      "Yes. Rockstar's official credits list him as Brian Heder. He had also told AP in September 2026 that fans would see him in the game.",
  },
  {
    question: "Has Rockstar published a GTA 6 voice cast list?",
    answer:
      "Yes. After launch, Rockstar published official credits at rockstargames.com/VI/credits. This page covers the characters we have profiles for and does not repeat the rest of that list.",
  },
];

/** Sources shown on the cast page, in reading order. */
export const CAST_SOURCE_IDS: CharSourceId[] = [
  "rockstar-credits",
  "rockstar-profiles",
  "rockstar-home",
  "tga-best-performance",
  "polygon-perez",
  "ap-root",
  "gamespot-root",
  "polygon-root",
];
