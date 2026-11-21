/**
 * Client-safe mission-hub search helpers.
 * The index is built on the server from story.ts / missions.ts and passed to the
 * search box as slim props, so the client bundle does not import the walkthrough data.
 */
import { MISSIONS, missionChapter, missionChapterOrder, missionPath, type Mission } from "@/lib/guides/missions";
import { STORY_CHAPTERS, chapterStart, type StoryMission } from "@/lib/guides/story";

export const HIDDEN_MISSION_LABEL = "Hidden (major spoiler)";

const compact = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, "");
/** Word form: "What's in the Bag?" and "what in the bag" both match. */
const normalizeVariants = (t: string): string[] => {
  const base = t.toLowerCase();
  const strip = (s: string) => s.replace(/[^a-z0-9]+/g, " ").trim();
  return [...new Set([
    strip(base.replace(/['’]/g, "")),
    strip(base.replace(/['’]s\b/g, "").replace(/['’]/g, "")),
  ].filter(Boolean))];
};
const normalize = (t: string) => normalizeVariants(t)[0] ?? "";

/** Same matching the missions hub uses to pair a Story Recap row with a walkthrough page. */
export function guideForStoryMission(t: StoryMission, chapterNumber: number, index: number): Mission | undefined {
  const byName = t.title
    ? MISSIONS.find((x) => !x.hidden && compact(x.name) === compact(t.title as string))
    : undefined;
  if (byName) return byName;
  if (!t.title || chapterNumber > 1) {
    return MISSIONS.find(
      (x) => x.hidden && missionChapter(x) === chapterNumber && missionChapterOrder(x) === index + 1,
    );
  }
  return undefined;
}

export interface MissionSearchItem {
  id: string;
  chapter: number;
  chapterOrder: number;
  overall: number;
  /** Story Recap name, or null when the name itself is a major spoiler. */
  name: string | null;
  displayName: string;
  href: string | null;
  optional: boolean;
}

export function buildMissionSearchIndex(): MissionSearchItem[] {
  const items: MissionSearchItem[] = [];
  for (const chapter of STORY_CHAPTERS) {
    const start = chapterStart(chapter.number);
    chapter.missions.forEach((mission, i) => {
      const guide = guideForStoryMission(mission, chapter.number, i);
      const hiddenName = mission.title == null;
      items.push({
        id: `${chapter.number}-${i + 1}`,
        chapter: chapter.number,
        chapterOrder: i + 1,
        overall: start + i,
        name: mission.title,
        displayName: hiddenName ? (guide?.name ?? `Chapter ${chapter.number}, Mission ${i + 1}`) : (mission.title as string),
        href: guide ? missionPath(guide.slug) : null,
        optional: Boolean(mission.optional),
      });
    });
  }
  return items;
}

export interface ParsedMissionQuery {
  raw: string;
  normalized: string;
  chapter?: number;
  mission?: number;
}

/**
 * Pull a chapter and/or mission number out of queries like
 * "chapter 3 mission 22", "ch3 m22", "c3m22", "ch 3", "mission 22".
 * Name searches fall through with only `normalized` set.
 */
export function parseMissionQuery(query: string): ParsedMissionQuery {
  const raw = query.trim();
  const normalized = normalize(raw);
  const both = normalized.match(/^(?:chapter|ch|c)\s*(\d+)\s*(?:mission|m)\s*(\d+)$/);
  if (both) return { raw, normalized, chapter: Number(both[1]), mission: Number(both[2]) };
  const chapterOnly = normalized.match(/^(?:chapter|ch)\s*(\d+)$/);
  if (chapterOnly) return { raw, normalized, chapter: Number(chapterOnly[1]) };
  const missionOnly = normalized.match(/^(?:mission|m)\s*(\d+)$/);
  if (missionOnly) return { raw, normalized, mission: Number(missionOnly[1]) };
  return { raw, normalized };
}

function aliasesFor(item: MissionSearchItem): string[] {
  const { chapter, chapterOrder, overall, displayName, name } = item;
  return [
    displayName,
    name ?? "",
    `chapter ${chapter} mission ${chapterOrder}`,
    `ch${chapter} m${chapterOrder}`,
    `ch ${chapter} m ${chapterOrder}`,
    `c${chapter}m${chapterOrder}`,
    `overall ${overall}`,
  ].filter(Boolean);
}

export function matchMissions(items: readonly MissionSearchItem[], query: string): MissionSearchItem[] {
  const parsed = parseMissionQuery(query);
  if (!parsed.normalized) return [];

  if (parsed.chapter != null && parsed.mission != null) {
    return items.filter((it) => it.chapter === parsed.chapter && it.chapterOrder === parsed.mission);
  }
  if (parsed.chapter != null) {
    return items.filter((it) => it.chapter === parsed.chapter);
  }
  if (parsed.mission != null) {
    return items.filter((it) => it.chapterOrder === parsed.mission);
  }

  const needles = normalizeVariants(parsed.raw).filter((n) => n.length >= 2);
  if (needles.length === 0) return [];

  const scored: { item: MissionSearchItem; score: number }[] = [];

  for (const item of items) {
    let score = -1;
    for (const alias of aliasesFor(item)) {
      const wordForms = normalizeVariants(alias);
      const tight = compact(alias);
      if (!wordForms.length && !tight) continue;
      for (const needle of needles) {
        const needleCompact = compact(needle);
        if (wordForms.includes(needle) || tight === needleCompact) score = Math.max(score, 3);
        else if (wordForms.some((w) => w.startsWith(needle)) || tight.startsWith(needleCompact)) score = Math.max(score, 2);
        else if (wordForms.some((w) => w.includes(needle)) || tight.includes(needleCompact)) score = Math.max(score, 1);
      }
    }
    if (score >= 0) scored.push({ item, score });
  }

  scored.sort((a, b) => b.score - a.score || a.item.overall - b.item.overall);
  return scored.map((s) => s.item);
}
