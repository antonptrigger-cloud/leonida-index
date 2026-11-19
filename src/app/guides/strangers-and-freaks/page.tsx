import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { Spoiler } from "@/components/guides/Spoiler";
import { SourcesList, SpoilerWarning } from "@/components/guides/MissionBits";
import { COUNTING, NOT_COUNTING, SF_FAQ, SF_SOURCES, SF_VERIFIED, SF_VERIFIED_LABEL, type Questline } from "@/lib/guides/strangers";

export const metadata = metaFor("/guides/strangers-and-freaks");

const R = () => (
  <span className="ml-1x whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-orange" title="Reported by outlets after launch. Not confirmed by Rockstar.">
    Reported
  </span>
);
const C = () => (
  <span className="ml-1x whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-turq" title="In-game trophy text, printed identically by several outlets.">
    Confirmed
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

function QuestTable({ rows, counts }: { rows: Questline[]; counts: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left text-sm text-ink-2">
        <thead>
          <tr className="border-b border-pink/20">
            <th className={TH}>Character</th>
            <th className={TH}>First opens</th>
            <th className={TH}>Counts?</th>
            <th className={TH}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.who} className="border-b border-pink/10 align-top">
              <td className="py-2x pr-4x font-semibold text-ink">{r.who}</td>
              <td className="py-2x pr-4x">{r.chapter}</td>
              <td className={`py-2x pr-4x font-semibold ${counts ? "text-turq" : "text-muted"}`}>{counts ? "Yes" : "No"}</td>
              <td className="py-2x pr-4x">{r.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function StrangersGuide() {
  return (
    <article>
      <PageSchema path="/guides/strangers-and-freaks" breadcrumbs={false} />
      <Breadcrumbs path="/guides/strangers-and-freaks" />
      <PageHeader
        backdrop="boat"
        kicker="Guide · Which side missions count"
        title="GTA 6 Strangers & Freaks"
        verified={SF_VERIFIED_LABEL}
        source="PowerPyx, IndiaTimes (not a main outlet), Push Square"
      />

      <SpoilerWarning>
        This page names side characters and roughly when their questlines open. The chapter-by-chapter notes are behind the spoiler blur. It doesn&apos;t describe main-story events.
      </SpoilerWarning>

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              Strangers &amp; Freaks is GTA&apos;s name for its oddball side missions, and in GTA 6 it&apos;s also a silver trophy. The rule sounds simple: finish eight stranger questlines. The catch is that plenty of side characters with their own storylines don&apos;t add to the counter.
            </p>
            <p>
              <strong className="text-orange">This list is incomplete.</strong> Only three of the eight qualifying strands are matched by two outlets so far (one of them not a main outlet), and we&apos;d rather show that than guess the rest.
            </p>
          </div>

          <section aria-labelledby="quick" className="mt-16x">
            <H2 id="quick">The quick answer</H2>
            <ul className="mt-4x flex max-w-2xl flex-col gap-3x">
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Strangers &amp; Freaks</strong> (Silver): complete 8 mission strands for strangers across Leonida<C />
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Counts:</strong> Kirk, Kyle and Yago. PowerPyx and IndiaTimes (not a main outlet) agree<R />
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Doesn&apos;t count:</strong> Andy, Billy and Tyrone. PowerPyx and IndiaTimes (not a main outlet) agree, and each has its own trophy instead<R />
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Still unknown:</strong> five more strands are needed. PowerPyx names one we&apos;re holding until a second main outlet confirms it, so the full list isn&apos;t known yet.
              </li>
            </ul>
          </section>

          <section aria-labelledby="track" className="mt-16x">
            <H2 id="track">How to track it</H2>
            <ol className="mt-4x flex max-w-2xl list-decimal flex-col gap-3x pl-6x text-ink-2 marker:font-bold marker:text-pink">
              <li>
                <strong className="text-ink">Check the counter first.</strong> PowerPyx says the game doesn&apos;t list which strands count, so look at the trophy&apos;s progress before and after the last mission of a questline. If the number goes up, it counted<R />.
              </li>
              <li>
                <strong className="text-ink">Play as the right character.</strong> PowerPyx says some errands lock to Jason or Lucia, and some only run at night<R />.
              </li>
              <li>
                <strong className="text-ink">Be patient between steps.</strong> PowerPyx says the next errand can take weeks of in-game time to arrive by phone. Keep playing other content and the next marker will appear<R />.
              </li>
              <li>
                <strong className="text-ink">Don&apos;t rush to finish before the credits.</strong> PowerPyx and IndiaTimes (not a main outlet) both say the trophy-related questlines stay available in free roam after the story<R />.
              </li>
              <li>
                <strong className="text-ink">Do the time-sensitive errand promptly.</strong> PowerPyx and Push Square both flag one of Yago&apos;s races as time-sensitive<R />.
              </li>
            </ol>
          </section>

          <section aria-labelledby="by" className="mt-16x">
            <H2 id="by">Questlines by chapter</H2>
            <p className="mt-2x max-w-2xl text-sm text-muted">
              Behind the blur because it names side missions and chapters. Counting status is matched by PowerPyx and IndiaTimes (not a main outlet). Chapters and notes are PowerPyx only.
            </p>
            <div className="mt-4x flex flex-col gap-6x">
              <Spoiler label="questlines that count">
                <QuestTable rows={COUNTING} counts />
              </Spoiler>
              <Spoiler label="questlines that don't count">
                <QuestTable rows={NOT_COUNTING} counts={false} />
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="tips" className="mt-16x">
            <H2 id="tips">Tips</H2>
            <ul className="mt-4x flex max-w-2xl flex-col gap-4x">
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Do the other characters anyway.</strong> Andy, Billy, Tyrone and others have their own trophies, so they&apos;re worth finishing. Just don&apos;t expect the Strangers &amp; Freaks counter to move. See our <A href="/guides/trophies">trophy list and roadmap</A>.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Missable errands don&apos;t break it.</strong> PowerPyx says missable side jobs don&apos;t count toward trophies, so missing one won&apos;t cost you this trophy<R />.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Pair it with collecting.</strong> Our <A href="/guides/collectibles">collectibles guide</A> covers the other long-tail trophies, and our <A href="/map">map</A> helps you plan a route.
              </li>
            </ul>
          </section>

          <Faq items={SF_FAQ} />

          <SourcesList sources={SF_SOURCES} verified={{ iso: SF_VERIFIED, label: SF_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">At a glance</h2>
            <p className="mt-4x text-sm text-ink-2">8 strands needed. 3 confirmed so far. The game won&apos;t tell you which ones count, so watch the trophy counter.</p>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">
              A questline is listed only when PowerPyx and a second outlet agree. We left out rewards because only secondary sites list them.
            </p>
          </div>
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">More guides</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              <li><A href="/guides/trophies">Trophy list and platinum roadmap</A></li>
              <li><A href="/guides/collectibles">Collectibles</A></li>
              <li><A href="/guides/missions">All missions in order</A></li>
              <li><A href="/guides/money">Money guide</A></li>
              <li><A href="/map">Interactive map</A></li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/strangers-and-freaks" />
    </article>
  );
}
