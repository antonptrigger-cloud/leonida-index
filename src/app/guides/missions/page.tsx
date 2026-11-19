import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { Spoiler } from "@/components/guides/Spoiler";
import { SourcesList, SpoilerWarning } from "@/components/guides/MissionBits";
import { MISSIONS, ORDER_NOTE, missionPath, type Mission } from "@/lib/guides/missions";
import {
  HUB_FAQ,
  HUB_SOURCES,
  HUB_VERIFIED,
  HUB_VERIFIED_LABEL,
  STORY_CHAPTERS,
  PCGAMER_TOTAL,
  STORY_TOTAL,
  chapterStart,
  type StoryMission,
} from "@/lib/guides/story";

export const metadata = metaFor("/guides/missions");

const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, "");
const guideFor = (t: StoryMission): Mission | undefined =>
  t.title ? MISSIONS.find((x) => norm(x.name) === norm(t.title as string)) : undefined;

/** Heist rows that link to /guides/heists (they render inside the chapter spoiler blur). */
const HEIST_ROWS = new Set(["thecartelheist", "hiddencharges", "companyproperty", "vciatakedown"]);
const isHeist = (t: StoryMission) => Boolean(t.title) && HEIST_ROWS.has(norm(t.title as string));

const HIDDEN_LABEL = "Hidden (major spoiler)";

function ChapterList({ chapterNumber }: { chapterNumber: number }) {
  const chapter = STORY_CHAPTERS.find((c) => c.number === chapterNumber)!;
  const start = chapterStart(chapterNumber);
  return (
    <ol className="flex flex-col border-t border-pink/20">
      {chapter.missions.map((mission, i) => {
        const guide = guideFor(mission);
        const num = (
          <span className="vc-index-row__num">{String(i + 1).padStart(2, "0")}</span>
        );
        const overall = <span className="text-faint"> · overall {start + i}</span>;
        if (guide) {
          return (
            <li key={`${chapterNumber}-${i}`}>
              <Link href={missionPath(guide.slug)} className="vc-index-row">
                {num}
                <span className="relative">
                  <span className="vc-display block text-[1.75rem] leading-none text-ink">{guide.name}</span>
                  <span className="mt-1x block text-[0.8rem] text-muted">
                    {guide.teaser}
                    {guide.startLabel ? <span className="text-faint"> · starts as &ldquo;{guide.startLabel}&rdquo;</span> : null}
                    {overall}
                  </span>
                </span>
                <span className="vc-index-row__arrow relative text-xl" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          );
        }
        return (
          <li key={`${chapterNumber}-${i}`} className="vc-index-row !cursor-default">
            {num}
            <span className="relative">
              <span className="vc-display block text-[1.75rem] leading-none text-ink">{mission.title ?? HIDDEN_LABEL}</span>
              <span className="mt-1x block text-[0.8rem] text-muted">
                {isHeist(mission) ? (
                  <Link href="/guides/heists" className="text-orange hover:text-pink">
                    Heist guide
                  </Link>
                ) : (
                  "Guide coming"
                )}
                {mission.optional ? <span className="text-faint"> · optional per PowerPyx</span> : null}
                {overall}
              </span>
            </span>
            <span aria-hidden />
          </li>
        );
      })}
    </ol>
  );
}

export default function MissionsIndex() {
  const withGuides = MISSIONS.length;
  return (
    <div>
      <PageSchema path="/guides/missions" breadcrumbs={false} />
      <Breadcrumbs path="/guides/missions" />
      <PageHeader
        backdrop="boat"
        kicker={`Mission guides · ${STORY_CHAPTERS.length} chapters · ${STORY_TOTAL} story missions`}
        title="GTA 6 Missions in Order"
        verified={HUB_VERIFIED_LABEL}
        source="PC Gamer, Press Start, VGC, PowerPyx"
      />

      <SpoilerWarning>
        Chapter 1 mission titles are visible. Chapters 2 to 5 sit behind the spoiler blur, and three missions are hidden outright because their names alone give away major story moments.
      </SpoilerWarning>

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="lg:col-span-8">
          <section aria-labelledby="intro">
            <h2 id="intro" className="sr-only">Overview</h2>
            <div className="max-w-2xl space-y-4x text-lg text-ink-2">
              <p>
                The in-game mission log only shows what you have already reached, so it is easy to lose track of how far through GTA 6 you are. This page lists every main story mission in the order you meet them, chapter by chapter, and links to our full walkthrough for each one as it is finished.
              </p>
              <p>
                Press Start counts <strong className="text-ink">{STORY_TOTAL} story missions across five chapters</strong>, taken from the in-game Story Recap. PC Gamer&apos;s list totals {PCGAMER_TOTAL}, so treat the count as <strong className="text-orange">Reported</strong>. We flag the differences inside the affected chapters.
              </p>
            </div>
          </section>

          <section aria-labelledby="how" className="mt-16x">
            <h2 id="how" className="vc-display text-3xl text-ink">How to use this list</h2>
            <ol className="mt-4x flex max-w-2xl list-decimal flex-col gap-3x pl-6x text-ink-2 marker:font-bold marker:text-pink">
              <li>Check the title of the mission you just finished in your phone or pause menu.</li>
              <li>Find it in the chapter lists below. The big number is its place inside the chapter, and the overall number is its place in the whole story.</li>
              <li>To work out what is left, count the rest of your chapter, then add the totals of every later chapter from the table below.</li>
              <li>Linked titles open a full walkthrough. Rows that say &ldquo;Guide coming&rdquo; are filled in as each walkthrough is verified.</li>
            </ol>
          </section>

          <section aria-labelledby="glance" className="mt-16x">
            <h2 id="glance" className="vc-display text-3xl text-ink">Chapters at a glance</h2>
            <div className="mt-4x overflow-x-auto">
              <table className="w-full max-w-2xl border-collapse text-left text-ink-2">
                <thead>
                  <tr className="border-b border-pink/20 text-xs uppercase tracking-[0.18em] text-muted">
                    <th className="py-2x pr-4x font-normal">Chapter</th>
                    <th className="py-2x pr-4x font-normal">Missions</th>
                    <th className="py-2x font-normal">Overall numbers</th>
                  </tr>
                </thead>
                <tbody>
                  {STORY_CHAPTERS.map((c) => (
                    <tr key={c.number} className="border-b border-pink/10">
                      <td className="py-2x pr-4x">
                        {c.number}
                        {c.number === 1 ? <span className="text-ink">: {c.name}</span> : <span className="text-faint"> (name behind the blur)</span>}
                      </td>
                      <td className="py-2x pr-4x">{c.missions.length}</td>
                      <td className="py-2x">
                        {chapterStart(c.number)}–{chapterStart(c.number) + c.missions.length - 1}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-2x pr-4x font-semibold text-ink">Total</td>
                    <td className="py-2x pr-4x font-semibold text-ink">{STORY_TOTAL}</td>
                    <td className="py-2x">1–{STORY_TOTAL}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3x max-w-2xl text-sm text-muted">
              <span className="text-orange">Reported</span>: counts come from outlet lists, not Rockstar. Side missions and Strangers &amp; Freaks quests are not included.
            </p>
          </section>

          <section aria-labelledby="ch1" className="mt-16x">
            <h2 id="ch1" className="vc-display text-3xl text-ink">
              Chapter 1: {STORY_CHAPTERS[0].name} ({STORY_CHAPTERS[0].missions.length} missions)
            </h2>
            <p className="mt-2x max-w-2xl text-sm text-muted">
              Walkthroughs are live for missions 1 to {withGuides}. The rest follow as we verify them.
            </p>
            <div className="mt-6x">
              <ChapterList chapterNumber={1} />
            </div>
          </section>

          {STORY_CHAPTERS.filter((c) => c.number > 1).map((c) => (
            <section key={c.number} aria-labelledby={`ch${c.number}`} className="mt-16x">
              <h2 id={`ch${c.number}`} className="vc-display text-3xl text-ink">
                Chapter {c.number} ({c.missions.length} missions, overall {chapterStart(c.number)}–{chapterStart(c.number) + c.missions.length - 1})
              </h2>
              <div className="mt-4x">
                <Spoiler label={`Chapter ${c.number} missions`}>
                  <p className="mb-4x vc-display text-2xl text-pink">{c.name}</p>
                  <ChapterList chapterNumber={c.number} />
                  {c.note ? <p className="mt-4x max-w-2xl text-sm text-muted">{c.note}</p> : null}
                </Spoiler>
              </div>
            </section>
          ))}

          <section aria-labelledby="tips" className="mt-16x">
            <h2 id="tips" className="vc-display text-3xl text-ink">Tips</h2>
            <ul className="mt-4x flex max-w-2xl flex-col gap-4x">
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Don&apos;t grind cash in Chapter 1.</strong> PowerPyx says the money you hold at the end of the chapter doesn&apos;t carry into the next one. Our <Link href="/guides/money" className="text-orange hover:text-pink">money guide</Link> has the details.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Keep a manual save before each chapter.</strong> PowerPyx says GTA 6 has no mission replay.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">The list isn&apos;t strict.</strong> {ORDER_NOTE}
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Find mission starts on the map.</strong> Story markers and activities are pinned on our{" "}
                <Link href="/map" className="text-orange hover:text-pink">interactive map</Link>.
              </li>
            </ul>
          </section>

          <Faq items={HUB_FAQ} />

          <SourcesList sources={HUB_SOURCES} verified={{ iso: HUB_VERIFIED, label: HUB_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">Mission order</h2>
            <p className="mt-4x text-sm text-ink-2">{ORDER_NOTE}</p>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">
              Mission names are facts, but the order and counts come from outlet lists. We use PC Gamer, Press Start and VGC, and mark anything the lists disagree on as <strong className="text-orange">Reported</strong>.
            </p>
            <p className="mt-3x text-xs text-muted">
              Last verified <time dateTime={HUB_VERIFIED}>{HUB_VERIFIED_LABEL}</time>.
            </p>
          </div>
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">More guides</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              <li><Link href="/guides/money" className="text-orange hover:text-pink">Money guide</Link></li>
              <li><Link href="/guides/beginner" className="text-orange hover:text-pink">Beginner guide</Link></li>
              <li><Link href="/guides/wanted" className="text-orange hover:text-pink">Wanted system</Link></li>
              <li><Link href="/guides/stealing-cars" className="text-orange hover:text-pink">Stealing cars</Link></li>
              <li><Link href="/news" className="text-orange hover:text-pink">GTA 6 news</Link></li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/missions" />
    </div>
  );
}
