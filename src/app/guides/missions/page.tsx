import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { SpoilerWarning } from "@/components/guides/MissionBits";
import { CHAPTER, LAST_VERIFIED, LAST_VERIFIED_LABEL, MISSIONS, ORDER_NOTE, missionPath } from "@/lib/guides/missions";

export const metadata = metaFor("/guides/missions");

export default function MissionsIndex() {
  return (
    <div>
      <PageSchema path="/guides/missions" />
      <nav aria-label="Breadcrumb" className="mb-6x text-xs text-muted">
        <Link href="/guides" className="hover:text-pink">Guides</Link>
        <span aria-hidden> / </span>
        <span className="text-ink-2">Missions</span>
      </nav>
      <PageHeader
        backdrop="boat"
        kicker={`Mission guides · Chapter ${CHAPTER.number}`}
        title={CHAPTER.name}
        verified={`${LAST_VERIFIED_LABEL} (pre-launch)`}
        source="PC Gamer, Press Start, PowerPyx"
      />

      <SpoilerWarning>
        Mission names and one-line premises below are light story spoilers. Each guide keeps its objectives and story notes blurred until you reveal them.
      </SpoilerWarning>

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="max-w-2xl text-lg text-ink-2">
            The first ten missions of Chapter {CHAPTER.number}, from Lucia&apos;s Prologue to Jason and Cal&apos;s night in. Guides for Coming Home onward are on the way.
          </p>
          <ol className="mt-10x flex flex-col border-t border-pink/20">
            {MISSIONS.map((m) => (
              <li key={m.slug}>
                <Link href={missionPath(m.slug)} className="vc-index-row">
                  <span className="vc-index-row__num">{String(m.order).padStart(2, "0")}</span>
                  <span className="relative">
                    <span className="vc-display block text-[1.75rem] leading-none text-ink">{m.name}</span>
                    <span className="mt-1x block text-[0.8rem] text-muted">
                      {m.teaser}
                      {m.startLabel ? <span className="text-faint"> · starts as &ldquo;{m.startLabel}&rdquo;</span> : null}
                    </span>
                  </span>
                  <span className="vc-index-row__arrow relative text-xl" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">Mission order</h2>
            <p className="mt-4x text-sm text-ink-2">{ORDER_NOTE}</p>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">
              Mission names and premises are checked against at least two outlets. Quest givers, rewards and steps from a single walkthrough are marked <strong className="text-orange">Reported</strong> until we confirm them in-game.
            </p>
            <p className="mt-3x text-xs text-muted">
              Last verified <time dateTime={LAST_VERIFIED}>{LAST_VERIFIED_LABEL}</time>, before launch.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
