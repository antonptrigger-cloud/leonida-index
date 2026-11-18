/**
 * GTA 6 cast evidence page (/database/characters/cast).
 *
 * This page is about real people, so it is deliberately conservative:
 * - "Confirmed" means Rockstar, or the person themselves in a first-party source, says it.
 * - "Reported" means established outlets say it but no official statement names that exact fact.
 * - "To be confirmed" means we have nothing solid. Rumoured actors are never named.
 * - Nothing here is negative or speculative about any person.
 * Rockstar has published no cast list as of 18 Nov 2026. Recheck against the end credits after launch.
 *
 * This file must not import from src/lib/seo (site.ts imports it).
 */
import type { CharSourceId } from "./characters";

export const CAST_PATH = "/database/characters/cast";
export const CAST_TITLE = "GTA 6 Cast: Who Voices Lucia and Jason?";
export const CAST_DESCRIPTION =
  "Who voices Lucia and Jason in GTA 6? What is confirmed, what is only reported and what Rockstar has not said, with sources and a last-checked date.";
export const CAST_VERIFIED = "2026-11-18";
export const CAST_VERIFIED_LABEL = "18 Nov 2026";

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
    involvement: { status: "confirmed", text: "Listed by The Game Awards for GTA VI" },
    role: { status: "reported", text: "Lucia, per press reports" },
    evidence:
      "The Game Awards lists Perez as a Best Performance nominee for Grand Theft Auto VI. The listing names the game, not a character. Polygon says it all but confirms Lucia, and VICE notes she has not technically been confirmed in the role.",
  },
  {
    character: "Brian Heder",
    slug: "brian-heder",
    person: "Stephen Root",
    involvement: { status: "confirmed", text: "Says on camera he is in the game" },
    role: { status: "reported", text: "Brian, per GameSpot and Polygon" },
    evidence:
      "Root told AP he is in the game. He did not name his character in that clip. GameSpot and Polygon both report that he plays Brian Heder. Rockstar has not announced it.",
  },
  {
    character: "Jason Duval",
    slug: "jason-duval",
    person: "Not named",
    involvement: { status: "tbc", text: "No performer named" },
    role: { status: "tbc", text: "To be confirmed" },
    evidence: "Neither Rockstar nor any performer has named Jason's actor in a source we trust. We do not repeat rumours.",
  },
  {
    character: "Every other role",
    person: "Not named",
    involvement: { status: "tbc", text: "No performers named" },
    role: { status: "tbc", text: "To be confirmed" },
    evidence: "Rockstar's Only in Leonida page lists no performers for any character.",
  },
];

export const CAST_SHORT_ANSWER: { status: CastStatus; text: string }[] = [
  { status: "confirmed", text: "Rockstar's Only in Leonida page lists no voice cast." },
  { status: "confirmed", text: "Manni L. Perez is a 2026 Game Awards Best Performance nominee for Grand Theft Auto VI." },
  { status: "reported", text: "Press reports read that nomination as her playing Lucia Caminos. The listing itself does not name the character." },
  { status: "confirmed", text: "Stephen Root says, in his own words, that he is in the game." },
  { status: "reported", text: "GameSpot and Polygon report that his part is Brian Heder. Root did not name the part in his clip." },
  { status: "tbc", text: "Jason Duval's performer has not been named." },
];

export const CAST_FAQ: { question: string; answer: string }[] = [
  {
    question: "Who plays Lucia Caminos in GTA 6?",
    answer:
      "Manni L. Perez is the performer linked to Lucia. The Game Awards lists her as a Best Performance nominee for Grand Theft Auto VI, but that listing does not name a character and Rockstar has not announced the role, so we label the Lucia link Reported.",
  },
  {
    question: "Who plays Jason Duval in GTA 6?",
    answer:
      "Not confirmed. Rockstar has not named Jason's performer, and no performer has said so in a source we trust. We mark it To be confirmed until the credits or Rockstar say otherwise.",
  },
  {
    question: "Is Stephen Root in GTA 6?",
    answer:
      "Yes, by his own account. He told AP in September 2026 that fans would see him in the game. He did not name his character in that clip. GameSpot and Polygon report that he plays Brian Heder, so we label the Brian link Reported.",
  },
  {
    question: "Has Rockstar published a GTA 6 voice cast list?",
    answer:
      "Not on the Rockstar pages we checked on 18 November 2026. We have not been able to check the finished game's end credits, which is where a full cast list is most likely to appear.",
  },
];

/** Sources shown on the cast page, in reading order. */
export const CAST_SOURCE_IDS: CharSourceId[] = [
  "rockstar-profiles",
  "rockstar-home",
  "tga-best-performance",
  "verge-perez",
  "polygon-perez",
  "vice-perez",
  "ap-root",
  "gamespot-root",
  "polygon-root",
];
