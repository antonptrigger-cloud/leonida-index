import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { Spoiler } from "@/components/guides/Spoiler";
import { SourcesList } from "@/components/guides/MissionBits";
import { SAVING_FAQ, SAVING_SOURCES, SAVING_VERIFIED, SAVING_VERIFIED_LABEL } from "@/lib/guides/saving";

export const metadata = metaFor("/guides/saving");

const R = () => (
  <span className="ml-1x whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-orange" title="One outlet's report. Not confirmed by Rockstar or by a second main outlet.">
    Reported
  </span>
);
const C = () => (
  <span className="ml-1x whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-turq" title="Described by two or more main outlets.">
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
const Steps = ({ children }: { children: React.ReactNode }) => (
  <ol className="mt-4x flex max-w-2xl list-decimal flex-col gap-3x pl-6x text-ink-2 marker:font-bold marker:text-pink">{children}</ol>
);
const Bullets = ({ children }: { children: React.ReactNode }) => <ul className="mt-4x flex max-w-2xl flex-col gap-3x">{children}</ul>;
const B = ({ children }: { children: React.ReactNode }) => <li className="vc-bar text-ink-2">{children}</li>;

export default function SavingGuide() {
  return (
    <article>
      <PageSchema path="/guides/saving" breadcrumbs={false} />
      <Breadcrumbs path="/guides/saving" />
      <PageHeader
        backdrop="boat"
        kicker="Guide · Manual saves, the autosave and your slots"
        title="How to Save in GTA 6"
        verified={SAVING_VERIFIED_LABEL}
        source="PowerPyx, PC Gamer, GamesRadar+, GameSpot, IGN"
      />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              GTA 6 doesn&apos;t let you replay a story mission once it&apos;s done, so your save files are the only way back to an earlier point in the story. That makes it worth knowing how saving works before you sink hours into Leonida.
            </p>
            <p>
              This page covers how to make a manual save, what the autosave does and doesn&apos;t protect, when the game blocks saving, and a simple way to spread your slots across the five chapters. <strong className="text-turq">Confirmed</strong> means at least two main outlets say so. <strong className="text-orange">Reported</strong> means one outlet does, and we name it.
            </p>
          </div>

          <section aria-labelledby="manual" className="mt-16x">
            <H2 id="manual">How to save manually</H2>
            <Steps>
              <li>
                <strong className="text-ink">Get out of any active mission.</strong> Saving is greyed out while a mission is running. PowerPyx says it is usually greyed out, and GameSpot says you can&apos;t save while actively doing one<C />.
              </li>
              <li>
                <strong className="text-ink">Open the pause menu.</strong> PowerPyx names the Options button on PS5 and the Menu button on Xbox Series X|S. GamesRadar+ and GameRant call it Start, so use whichever opens the pause menu on your pad<C />.
              </li>
              <li>
                <strong className="text-ink">Select Game.</strong> This tab holds both saving and loading (PowerPyx, PC Gamer, GamesRadar+)<C />.
              </li>
              <li>
                <strong className="text-ink">Choose Save Game and pick a slot.</strong> GamesRadar+ says you can overwrite any slot, so use an empty one to keep everything you already have<R />.
              </li>
              <li>Let the save finish before you quit to the menu or close the game.</li>
            </Steps>
            <p className="mt-4x max-w-2xl text-ink-2">
              To load, go back to the same Game tab and choose Load Game (PC Gamer). GameRant says the list offers both the autosave and your manual saves<R />. Outside missions you can save pretty much whenever you like (PowerPyx, GamesRadar+, GameSpot)<C />.
            </p>
          </section>

          <section aria-labelledby="slots" className="mt-16x">
            <H2 id="slots">How many save slots are there?</H2>
            <p className="mt-4x max-w-2xl text-ink-2">
              There are <strong className="text-ink">15 manual save slots</strong> (PowerPyx, PC Gamer, GamesRadar+, GameSpot)<C />. The game also keeps one autosave, and outlets disagree on where it lives:
            </p>
            <div className="mt-4x grid max-w-2xl gap-4x sm:grid-cols-2">
              <div className="vc-card p-5x">
                <h3 className="vc-kicker">GamesRadar+</h3>
                <p className="mt-3x text-sm text-ink-2">The autosave is a &ldquo;secret 16th slot&rdquo; reserved just for it, so all 15 manual slots stay yours<R />.</p>
              </div>
              <div className="vc-card p-5x [border-left-color:#00d4ff]">
                <h3 className="vc-kicker">GameSpot</h3>
                <p className="mt-3x text-sm text-ink-2">The autosave takes up one of your save slots, which would leave 14 for manual saves<R />.</p>
              </div>
            </div>
            <p className="mt-4x max-w-2xl text-sm text-muted">
              PowerPyx lists 15 manual slots and one autosave without saying which way it works. We haven&apos;t seen this settled. To be safe, plan around 14 or 15 manual slots and check your own Load Game screen.
            </p>
          </section>

          <section aria-labelledby="autosave" className="mt-16x">
            <H2 id="autosave">How the autosave works</H2>
            <Bullets>
              <B>
                <strong className="text-ink">Only one autosave exists</strong> (PowerPyx, GamesRadar+, GameSpot)<C />. GameSpot adds that each autosave overwrites the previous one, so it only ever holds your latest progress<R />.
              </B>
              <B>
                <strong className="text-ink">When it triggers:</strong> GamesRadar+ says after missions, after being wasted or busted, and after major open-world encounters<R />.
              </B>
              <B>
                <strong className="text-ink">Loading an older manual save also replaces the autosave</strong>, according to PowerPyx<R />. If you load an old file by mistake, your latest autosave may be gone.
              </B>
            </Bullets>
            <p className="mt-4x max-w-2xl text-ink-2">In short, the autosave is crash protection, not a way back. Real checkpoints belong in manual slots.</p>
          </section>

          <section aria-labelledby="blocked" className="mt-16x">
            <H2 id="blocked">When you can&apos;t save</H2>
            <Bullets>
              <B>
                <strong className="text-ink">During missions</strong> (PowerPyx, GameSpot)<C />. If one is going badly, GameSpot says the in-mission menu offers retry, quit and restart<R />.
              </B>
              <B>
                <strong className="text-ink">After using a cheat.</strong> GamesRadar+ and PC Gamer say any cheat switches saving off until you quit and reload<C />. Cheats only open up after the story, so you won&apos;t hit this early. See our <A href="/guides/cheats">cheats guide</A>.
              </B>
              <B>
                <strong className="text-ink">During the opening.</strong> GameRant reports that manual saving stays off until the opening sequence is over and you&apos;re free to roam<R />. PowerPyx and GamesRadar+ don&apos;t mention this limit, so treat it as one outlet&apos;s claim.
              </B>
            </Bullets>
          </section>

          <section aria-labelledby="plan" className="mt-16x">
            <H2 id="plan">A slot plan for the whole story</H2>
            <p className="mt-4x max-w-2xl text-ink-2">
              PowerPyx and GamesRadar+ both suggest a save at the start and end of each chapter, and PC Gamer suggests at least one at the start of each chapter<C />. With five chapters, that uses 10 slots and leaves 5 spare. A plan built on that advice:
            </p>
            <Bullets>
              <B>
                <strong className="text-ink">Slots 1 to 10:</strong> the start and end of Chapters 1 to 5. Don&apos;t overwrite these.
              </B>
              <B>
                <strong className="text-ink">Slots 11 to 15:</strong> rotate through them after each mission, so a recent fallback is always close. PowerPyx recommends alternating slots after every mission<R />.
              </B>
              <B>
                <strong className="text-ink">Before a big heist:</strong> GameSpot says to use a slot ahead of high-stakes jobs so you can replay from that point if it goes wrong<R />.
              </B>
              <B>
                <strong className="text-ink">Before Tourist Trap:</strong> VGC and PowerPyx both say starting it locks you into the last missions of Chapter 1 with no free-roam until Chapter 2<C />. Finish any Chapter 1 free-roam business first. See the <A href="/guides/missions/tourist-trap">Tourist Trap guide</A>.
              </B>
              <B>
                <strong className="text-ink">Early in the game:</strong> GameSpot warns that one set of tasks near the start can&apos;t be redone once you&apos;ve moved on, and suggests saving ahead of it<R />. The detail is behind the blur.
                <div className="mt-3x">
                  <Spoiler label="the early house tasks">
                    <p className="max-w-2xl text-ink-2">
                      GameSpot says that if Jason doesn&apos;t finish the tasks to renovate the house before he picks up Lucia, he won&apos;t get another chance once she&apos;s home. It says completing them directly affects the strength of the couple&apos;s relationship, so a save before them lets you go back and do them all<R />.
                    </p>
                  </Spoiler>
                </div>
              </B>
            </Bullets>
          </section>

          <section aria-labelledby="tips" className="mt-16x">
            <H2 id="tips">Tips</H2>
            <Bullets>
              <B>Check what a slot holds before you overwrite it, so you don&apos;t wipe a chapter checkpoint by accident.</B>
              <B>Keep a clean story file separate from any file you plan to use for cheats after the credits, since cheats turn saving off. That one is our own suggestion.</B>
              <B>
                If you missed something in a finished mission, the only fix is loading a manual save from before it. PowerPyx, GamesRadar+, GameSpot and IGN all say there&apos;s no replay menu<C />.
              </B>
              <B>
                Planning your first hours? Our <A href="/guides/beginner">beginner guide</A> and the <A href="/guides/switch-characters">character switching guide</A> cover the rest of the basics.
              </B>
            </Bullets>
          </section>

          <Faq items={SAVING_FAQ} />

          <SourcesList sources={SAVING_SOURCES} verified={{ iso: SAVING_VERIFIED, label: SAVING_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">The short version</h2>
            <p className="mt-4x text-sm text-ink-2">Pause menu, Game, Save Game, pick a slot. 15 manual slots, one autosave, and no saving mid-mission or after a cheat.</p>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">
              Confirmed needs two main outlets. A claim from a single outlet is attributed to it and marked Reported, and where outlets disagree we show both versions.
            </p>
          </div>
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">More guides</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              <li><A href="/guides/beginner">Beginner guide</A></li>
              <li><A href="/guides/switch-characters">Switching characters</A></li>
              <li><A href="/guides/missions">All missions in order</A></li>
              <li><A href="/guides/cheats">Cheats</A></li>
              <li><A href="/map">Interactive map</A></li>
              <li><A href="/news">GTA 6 news</A></li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/saving" />
    </article>
  );
}
