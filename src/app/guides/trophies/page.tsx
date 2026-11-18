import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { Spoiler } from "@/components/guides/Spoiler";
import { SourcesList, SpoilerWarning } from "@/components/guides/MissionBits";
import {
  SECRET_OTHER,
  STORY,
  TROPHY_FAQ,
  TROPHY_SOURCES,
  TROPHIES_VERIFIED,
  TROPHIES_VERIFIED_LABEL,
  VISIBLE,
  type Trophy,
} from "@/lib/guides/trophies";
import { missionPath } from "@/lib/guides/missions";

export const metadata = metaFor("/guides/trophies");

const R = () => (
  <span className="ml-1x whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-orange" title="Reported by outlets. Rockstar hasn't published the list itself.">
    Reported
  </span>
);
const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-orange hover:text-pink">
    {children}
  </Link>
);
const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="vc-display text-3xl text-ink">
    {children}
  </h2>
);
const TH = "py-2x pr-4x text-xs font-normal uppercase tracking-[0.18em] text-muted";
const GRADE_CLASS: Record<string, string> = {
  Platinum: "text-turq",
  Gold: "text-orange",
  Silver: "text-ink",
  Bronze: "text-muted",
};

function TrophyTable({ rows }: { rows: Trophy[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left text-sm text-ink-2">
        <thead>
          <tr className="border-b border-pink/20">
            <th className={TH}>Trophy</th>
            <th className={TH}>Grade</th>
            <th className={TH}>What it needs</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.name} className="border-b border-pink/10 align-top">
              <td className="py-2x pr-4x font-semibold text-ink">
                {t.guide ? <Link href={missionPath(t.guide)} className="text-orange hover:text-pink">{t.name}</Link> : t.name}
              </td>
              <td className={`py-2x pr-4x font-semibold ${GRADE_CLASS[t.grade]}`}>{t.grade}</td>
              <td className="py-2x pr-4x">{t.how}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TrophyGuide() {
  const secret = STORY.length + SECRET_OTHER.length;
  return (
    <article>
      <PageSchema path="/guides/trophies" breadcrumbs={false} />
      <Breadcrumbs path="/guides/trophies" />
      <PageHeader
        backdrop="boat"
        kicker="Guide · Trophies and achievements"
        title="GTA 6 Trophy List"
        verified={TROPHIES_VERIFIED_LABEL}
        source="TrueTrophies, TrueAchievements, GamesRadar+"
      />

      <SpoilerWarning>
        The {secret} secret trophies are named after story events, missions and characters, so they sit behind the spoiler blur. The visible list and the roadmap are spoiler-light.
      </SpoilerWarning>

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              GTA 6 has a full trophy list on PS5 and a matching achievement list on Xbox. The platinum is earned by getting everything else, and most of the work is the 100% completion gold plus a handful of collection-style trophies. The trick is to tick things off as you play instead of leaving them for after the credits.
            </p>
            <p>
              Rockstar hasn&apos;t published the list itself, so names, grades and counts are <strong className="text-orange">Reported</strong> from TrueTrophies, TrueAchievements and GamesRadar+, which agree with each other. Requirements below are in our own words.
            </p>
          </div>

          <section aria-labelledby="glance" className="mt-16x">
            <H2 id="glance">At a glance</H2>
            <ul className="mt-4x flex max-w-2xl flex-col gap-3x">
              <li className="vc-bar text-ink-2"><strong className="text-ink">55 trophies:</strong> 46 bronze, 6 silver, 2 gold and 1 platinum<R /></li>
              <li className="vc-bar text-ink-2"><strong className="text-ink">Platinum:</strong> Vice Got a Price!, for earning every other trophy<R /></li>
              <li className="vc-bar text-ink-2"><strong className="text-ink">Secret:</strong> TrueTrophies says {secret} of the 55 are hidden until you earn them<R /></li>
              <li className="vc-bar text-ink-2"><strong className="text-ink">Offline:</strong> TrueAchievements flags every achievement as offline and single player<R /></li>
              <li className="vc-bar text-ink-2"><strong className="text-ink">Xbox:</strong> the same 55 achievements, worth 1,000 Gamerscore<R /></li>
              <li className="vc-bar text-ink-2"><strong className="text-ink">Cheats:</strong> using one switches trophies off for the session. See our <A href="/guides/cheats">cheats guide</A><R /></li>
            </ul>
          </section>

          <section aria-labelledby="visible" className="mt-16x">
            <H2 id="visible">The visible trophies</H2>
            <p className="mt-2x max-w-2xl text-sm text-muted">
              These {VISIBLE.length} show their names on PlayStation before you earn them. Totals in brackets come from GamesRadar+.
            </p>
            <div className="mt-4x">
              <TrophyTable rows={VISIBLE} />
            </div>
          </section>

          <section aria-labelledby="secret" className="mt-16x">
            <H2 id="secret">Secret trophies ({secret})</H2>
            <p className="mt-2x max-w-2xl text-sm text-muted">
              Story trophies come first, then side-character, activity and cryptic ones. Some have vague descriptions that the community is still working out, and we only add method details once outlets agree.
            </p>
            <div className="mt-4x flex flex-col gap-6x">
              <Spoiler label="story trophies">
                <TrophyTable rows={STORY} />
              </Spoiler>
              <Spoiler label="other secret trophies">
                <TrophyTable rows={SECRET_OTHER} />
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="roadmap" className="mt-16x">
            <H2 id="roadmap">Platinum roadmap</H2>
            <p className="mt-2x max-w-2xl text-sm text-muted">Our suggested order, built from the trophy requirements. It isn&apos;t an official route.</p>
            <ol className="mt-4x flex max-w-2xl list-decimal flex-col gap-3x pl-6x text-ink-2 marker:font-bold marker:text-pink">
              <li>
                <strong className="text-ink">Play the story at your own pace.</strong> About a dozen of the secret trophies come straight from story progress. Our <A href="/guides/missions">missions in order</A> list shows where you are.
              </li>
              <li>
                <strong className="text-ink">Collect as you travel.</strong> WAiNK at 100 locations, 3 card sets, 100 vehicles discovered, every meditation spot and 250 stunts are slow to clean up at the end. Check our <A href="/map">map</A> for verified spots.
              </li>
              <li>
                <strong className="text-ink">Do partner trophies together.</strong> <em>Hot Together</em> and <em>Retail Therapy</em> need your partner with you, so tick them off whenever you can free-roam as a pair.
              </li>
              <li>
                <strong className="text-ink">Finish stranger strands as they appear.</strong> You need 8 for <em>Strangers &amp; Freaks</em>, and several side characters have their own final-mission trophies.
              </li>
              <li>
                <strong className="text-ink">Let money trophies come naturally.</strong> Shop and jewelry robberies, an armored truck, 5 bank vaults, laundering marked bills, spending and garages all pay well anyway. See our <A href="/guides/money">money guide</A>.
              </li>
              <li>
                <strong className="text-ink">Then chase 100%.</strong> Work through shooting ranges, races, drone races and the challenge list for <em>A Long Road</em>, and mop up the secret trophies last.
              </li>
              <li>
                <strong className="text-ink">Keep a cheat-free save.</strong> Cheats unlock after the story and are tempting, but they switch trophies off while active<R />.
              </li>
            </ol>
          </section>

          <section aria-labelledby="tips" className="mt-16x">
            <H2 id="tips">Tips</H2>
            <ul className="mt-4x flex max-w-2xl flex-col gap-4x">
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Shooting ranges do double duty.</strong> Gold medals count toward <em>The Shootist</em>, and range medals also unlock several ammo cheats in our <A href="/guides/cheats">cheats guide</A>.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Make a backup save before big choices.</strong> One secret trophy counts choices you make, so it is worth being able to go back.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Check your progress counts.</strong> Stunts, challenges and races are big numbers, so look at the totals now and then rather than grinding blind. See our <A href="/guides/activities">activities guide</A>.
              </li>
            </ul>
          </section>

          <Faq items={TROPHY_FAQ} />

          <SourcesList sources={TROPHY_SOURCES} verified={{ iso: TROPHIES_VERIFIED, label: TROPHIES_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">The platinum</h2>
            <p className="mt-4x text-sm text-ink-2">Vice Got a Price! comes from earning all 54 other trophies.</p>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">
              Count, names and the platinum are checked against two trophy sites, and grades and requirements against GamesRadar+. Everything stays <strong className="text-orange">Reported</strong> until Rockstar publishes the list.
            </p>
          </div>
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">More guides</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              <li><A href="/guides/cheats">Cheats</A></li>
              <li><A href="/guides/money">Money guide</A></li>
              <li><A href="/guides/missions">All missions in order</A></li>
              <li><A href="/guides/activities">Activities</A></li>
              <li><A href="/map">Interactive map</A></li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/trophies" />
    </article>
  );
}
