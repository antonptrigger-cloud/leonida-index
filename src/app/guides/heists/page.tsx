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
  AIRPORT_PREP,
  AIRPORT_PREP_POWERPYX_ONLY,
  BANK_PREP,
  HEIST_FAQ,
  HEIST_SOURCES,
  HEIST_VERIFIED,
  HEIST_VERIFIED_LABEL,
  type PrepMission,
} from "@/lib/guides/heists";

export const metadata = metaFor("/guides/heists");

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
const One = () => (
  <span className="ml-1x whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted" title="Only PowerPyx has published this so far.">
    One outlet
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

function PrepList({ rows }: { rows: PrepMission[] }) {
  return (
    <ol className="flex flex-col border-t border-pink/20">
      {rows.map((r, i) => (
        <li key={r.name} className="flex flex-col gap-1x border-b border-pink/10 py-3x sm:flex-row sm:items-baseline sm:gap-4x">
          <span className="vc-index-row__num w-10 shrink-0">{String(i + 1).padStart(2, "0")}</span>
          <span className="vc-display w-64 shrink-0 text-2xl leading-none text-ink">{r.name}</span>
          <span className="text-sm text-ink-2">
            {r.note}
            {r.backing === "powerpyx" ? <One /> : null}
          </span>
        </li>
      ))}
    </ol>
  );
}

export default function HeistsGuide() {
  return (
    <article>
      <PageSchema path="/guides/heists" breadcrumbs={false} />
      <Breadcrumbs path="/guides/heists" />
      <PageHeader
        backdrop="boat"
        kicker="Guide · Heist prep and what's confirmed"
        title="GTA 6 Heists"
        verified={HEIST_VERIFIED_LABEL}
        source="PowerPyx, PC Gamer, Push Square"
      />

      <SpoilerWarning>
        Heist and mission names, the prep list and the trophy details are behind the spoiler blur. They cover mid and late story missions but not how any job ends.
      </SpoilerWarning>

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              GTA 6 is built around big crew jobs, and each one is set up by a run of smaller prep missions. What&apos;s less clear is what that prep actually changes.
            </p>
            <p>
              This guide is deliberately short. Outlets have only just started covering the jobs, and PowerPyx is the only one with a full route. So we list what two or more outlets agree on, mark everything else as one outlet&apos;s report, and link out to PowerPyx for the step-by-step.
            </p>
          </div>

          <section aria-labelledby="quick" className="mt-16x">
            <H2 id="quick">The quick answer</H2>
            <ul className="mt-4x flex max-w-2xl flex-col gap-3x">
              <li className="vc-bar text-ink-2">
                The big jobs sit in the second half of the story, and PC Gamer, Push Square and GamesRadar+ list them in the same positions<R />
              </li>
              <li className="vc-bar text-ink-2">
                Each big job has its own trophy, and several outlets print the same trophy text. Trophy names are secret, so they sit behind the blur<C />
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Prep can matter.</strong> PowerPyx reports that doing one early prep mission well gives you more time in the first job. No second outlet has confirmed it yet<R /><One />
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">You can&apos;t replay story missions.</strong> PowerPyx and Push Square both say so, and Push Square recommends a manual save at the start of each chapter<R />
              </li>
            </ul>
          </section>

          <section aria-labelledby="bank" className="mt-16x">
            <H2 id="bank">The first job: prep missions</H2>
            <p className="mt-2x max-w-2xl text-sm text-muted">
              Behind the blur because it names missions. The mission names and order match PC Gamer and Push Square. Which missions are prep is PowerPyx&apos;s tagging, apart from the two PC Gamer describes as prep itself.
            </p>
            <div className="mt-4x">
              <Spoiler label="first-job prep missions">
                <PrepList rows={BANK_PREP} />
                <p className="mt-4x text-sm text-ink-2">
                  <strong className="text-ink">The one to take seriously:</strong> PowerPyx says the cargo you protect in Company Property decides how many charges you can plant in Hidden Charges, and that the number of charges you plant sets your time limit in the job. Its walkthrough says planting all three gives just under 11 minutes<R /><One />.
                </p>
                <p className="mt-3x text-sm text-ink-2">
                  PowerPyx also says planting the charges is quicker if you switch between both characters, and that the West tower site is guarded by workers who report trespassers straight away<R /><One />.
                </p>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="job" className="mt-16x">
            <H2 id="job">What to expect from the first job</H2>
            <div className="mt-4x">
              <Spoiler label="first-job summary">
                <ul className="flex max-w-2xl flex-col gap-3x text-ink-2">
                  <li className="vc-bar">
                    Both characters take part, and the game swaps between Jason and Lucia during the job. PC Gamer lists them together, and PowerPyx describes the swaps<R />.
                  </li>
                  <li className="vc-bar">
                    PowerPyx says it unlocks once the other Chapter 3 story missions are done (it closes the chapter), and that you can go straight into the next chapter afterwards<R /><One />.
                  </li>
                  <li className="vc-bar">
                    PowerPyx says it&apos;s a long one, with a vault-cracking stage that plays like the practice in Safe Word, then a hold-out and a chase. It also suggests bringing a mid-range weapon rather than a shotgun for the police wave<R /><One />.
                  </li>
                  <li className="vc-bar">
                    PowerPyx lists the reward as $120,000. Treat that as unconfirmed until a second outlet or the game&apos;s own numbers back it up<R /><One />.
                  </li>
                </ul>
                <p className="mt-4x max-w-2xl text-sm text-muted">
                  We&apos;re not rewriting PowerPyx&apos;s route. For the full step-by-step, read{" "}
                  <a href="https://www.powerpyx.com/gta-6-the-cartel-heist-walkthrough/" className="text-orange hover:text-pink" target="_blank" rel="noopener noreferrer">
                    their walkthrough
                  </a>
                  .
                </p>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="airport" className="mt-16x">
            <H2 id="airport">The second job: what&apos;s confirmed</H2>
            <p className="mt-2x max-w-2xl text-sm text-muted">
              No outlet has published a full route for this one yet, so there is no walkthrough here, only the mission names.
            </p>
            <div className="mt-4x flex flex-col gap-6x">
              <Spoiler label="second-job prep missions">
                <p className="mb-3x max-w-2xl text-sm text-ink-2">
                  PowerPyx tags these ten as prep. PC Gamer and Push Square list each one by the same name, in the same order, with the job itself after them<R />.
                </p>
                <PrepList rows={AIRPORT_PREP} />
                <p className="mt-4x max-w-2xl text-sm text-ink-2">
                  PowerPyx also tags {AIRPORT_PREP_POWERPYX_ONLY.join(", ")} as part of this job. PC Gamer and Push Square don&apos;t list those<R /><One />.
                </p>
                <p className="mt-3x max-w-2xl text-sm text-ink-2">
                  PowerPyx describes the job as an airport heist. Push Square&apos;s summary of Too Much Baggage, which mentions airport baggage handling, fits that<R />. PowerPyx places Headliners just before the job, while PC Gamer and Push Square list it earlier in the chapter, so the exact order isn&apos;t settled.
                </p>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="trophies" className="mt-16x">
            <H2 id="trophies">Trophies</H2>
            <div className="mt-4x">
              <Spoiler label="the two heist trophies">
                <ul className="flex max-w-2xl flex-col gap-3x text-ink-2">
                  <li className="vc-bar"><strong className="text-ink">Break the Bank</strong> (Bronze): finish the first job (Chapter 3)<C /></li>
                  <li className="vc-bar"><strong className="text-ink">Hi-Jacked</strong> (Bronze): finish the second job (Chapter 4)<C /></li>
                </ul>
                <p className="mt-3x max-w-2xl text-sm text-ink-2">
                  Both are awarded for finishing the story mission itself. See the <A href="/guides/trophies">full trophy list and platinum roadmap</A>.
                </p>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="tips" className="mt-16x">
            <H2 id="tips">Before you start</H2>
            <ul className="mt-4x flex max-w-2xl flex-col gap-4x">
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Save by hand at each chapter start.</strong> Story missions can&apos;t be replayed (PowerPyx, Push Square), so it&apos;s your only way back<R />.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Check your loadout.</strong> Pick weapons you&apos;re comfortable with at mid range before you trigger a job. That one is our own advice, not from a source.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Looking for the full order?</strong> Our <A href="/guides/missions">missions list</A> has every chapter, and the <A href="/guides/money">money guide</A> covers earning outside the story.
              </li>
            </ul>
          </section>

          <Faq items={HEIST_FAQ} />

          <SourcesList sources={HEIST_SOURCES} verified={{ iso: HEIST_VERIFIED, label: HEIST_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">At a glance</h2>
            <p className="mt-4x text-sm text-ink-2">Each big job has its own trophy. Prep can affect the first one. No replays, so save by hand.</p>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">
              A claim is Reported only when an outlet says it. Lines only PowerPyx has published are marked &ldquo;One outlet&rdquo; and kept short.
            </p>
          </div>
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">More guides</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              <li><A href="/guides/missions">All missions in order</A></li>
              <li><A href="/guides/trophies">Trophy list and platinum roadmap</A></li>
              <li><A href="/guides/money">Money guide</A></li>
              <li><A href="/guides/strangers-and-freaks">Strangers &amp; Freaks</A></li>
              <li><A href="/guides/wanted">Wanted system</A></li>
              <li><A href="/news">Latest news</A></li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/heists" />
    </article>
  );
}
