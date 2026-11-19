import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { Spoiler } from "@/components/guides/Spoiler";
import { SourcesList } from "@/components/guides/MissionBits";
import { SWITCH_FAQ, SWITCH_SOURCES, SWITCH_VERIFIED, SWITCH_VERIFIED_LABEL } from "@/lib/guides/switching";

export const metadata = metaFor("/guides/switch-characters");

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

export default function SwitchCharactersGuide() {
  return (
    <article>
      <PageSchema path="/guides/switch-characters" breadcrumbs={false} />
      <Breadcrumbs path="/guides/switch-characters" />
      <PageHeader
        backdrop="boat"
        kicker="Guide · Jason, Lucia and your partner"
        title="Switching Characters in GTA 6"
        verified={SWITCH_VERIFIED_LABEL}
        source="PowerPyx, GamesRadar+, VGC, GameSpot"
      />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              Jason and Lucia are both playable, but GTA 6 doesn&apos;t hand you the switch straight away. For a good stretch of the story you&apos;re mostly locked to one of them. This page covers when free switching opens up, which buttons do it, what a greyed-out portrait means, and the partner commands that make the pair more useful.
            </p>
            <p>
              <strong className="text-turq">Confirmed</strong> means at least two main outlets say so. <strong className="text-orange">Reported</strong> means one outlet does, and we name it. Outlets disagree on the button, so we show both versions.
            </p>
          </div>

          <section aria-labelledby="when" className="mt-16x">
            <H2 id="when">When can you switch characters?</H2>
            <Bullets>
              <B>
                <strong className="text-ink">Chapter 1:</strong> no free switching. Story missions sometimes put you in the other character&apos;s shoes, but you go back afterwards (PowerPyx, VGC)<C />.
              </B>
              <B>
                <strong className="text-ink">Free switching opens in Chapter 2</strong> (PowerPyx, GamesRadar+, VGC)<C />.
              </B>
              <B>
                <strong className="text-ink">The exact point isn&apos;t settled.</strong> GameSpot&apos;s rough guide is about 30% of the way through the main story, and it says the figure shifts with the side missions you&apos;ve done<R />. GamesRadar+ only says a certain milestone in Chapter 2. PowerPyx names a specific mission, which is behind the blur below.
              </B>
            </Bullets>
            <div className="mt-4x max-w-2xl">
              <Spoiler label="the unlock point and the story reason">
                <div className="space-y-3x text-ink-2">
                  <p>
                    PowerPyx says you unlock the switch in Chapter 2, after the main mission <strong className="text-ink">Coffee Break</strong><R />. It is the only outlet we found that names the mission. See our <Link href="/guides/missions/chapter-2-mission-9" className="text-pink underline underline-offset-2">Chapter 2, Mission 9 guide</Link>.
                  </p>
                  <p>
                    VGC explains the delay through the story: Lucia starts the game in jail and is on parole after the mission Day Release, so you can&apos;t roam the open world as her yet. It says the first time you roam freely as her is after Chapter 1 ends<R />.
                  </p>
                </div>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="how" className="mt-16x">
            <H2 id="how">How to switch, step by step</H2>
            <Steps>
              <li>
                <strong className="text-ink">Reach the unlock in Chapter 2</strong> (see above).
              </li>
              <li>
                <strong className="text-ink">Make sure you&apos;re in free roam,</strong> not inside a mission.
              </li>
              <li>
                <strong className="text-ink">Hold right on the D-pad</strong> to open the partner menu (PowerPyx, GamesRadar+, VGC)<C />.
              </li>
              <li>
                <strong className="text-ink">Press R1 on PS5 or RB on Xbox</strong> to swap (PowerPyx, GamesRadar+)<C />.
              </li>
              <li>
                <strong className="text-ink">Want to team up instead?</strong> Press Triangle or Y in the same menu to have your partner meet you (PowerPyx, GamesRadar+)<C />.
              </li>
            </Steps>
            <div className="vc-card mt-6x max-w-2xl p-5x [border-left-color:#00d4ff]">
              <h3 className="vc-kicker">Sources disagree on the button</h3>
              <p className="mt-3x text-sm text-ink-2">
                GameSpot says to just press L1/LB at any time<R />. PowerPyx and GamesRadar+ say hold right on the D-pad, then R1/RB, and VGC only says to press right on the D-pad. We lead with the two that agree. If the combo doesn&apos;t respond, try GameSpot&apos;s button and check your controls menu.
              </p>
            </div>
          </section>

          <section aria-labelledby="grey" className="mt-16x">
            <H2 id="grey">Why is the other character greyed out?</H2>
            <Bullets>
              <B>
                <strong className="text-ink">They&apos;re busy or unavailable.</strong> A darkened or greyed-out portrait means you can&apos;t switch yet. Keep checking back (GamesRadar+, VGC)<C />.
              </B>
              <B>
                <strong className="text-ink">You&apos;re at home.</strong> PowerPyx says the other character can be greyed out at your home, and that you can usually switch once you step outside<R />.
              </B>
              <B>
                <strong className="text-ink">You just swapped.</strong> VGC says the character you left sometimes calls a RydeMe and goes, which can grey out the menu for a while<R />.
              </B>
            </Bullets>
          </section>

          <section aria-labelledby="solo" className="mt-16x">
            <H2 id="solo">Missions that need one character</H2>
            <p className="mt-4x max-w-2xl text-ink-2">
              Some missions are solo jobs for Jason or Lucia. PowerPyx says the mission&apos;s map icon shows which, and GamesRadar+ says a J or an L on the marker means it must be played solo<C />. GameSpot says most other missions can be played as either character, and that the game occasionally switches you automatically when the story calls for it<R />.
            </p>
          </section>

          <section aria-labelledby="partner" className="mt-16x">
            <H2 id="partner">Partner commands worth knowing</H2>
            <p className="mt-2x max-w-2xl text-sm text-muted">All of these come from GamesRadar+, so treat them as Reported.</p>
            <Bullets>
              <B>
                <strong className="text-ink">Check in.</strong> Message your partner on WhatUp: hold right on the D-pad, then Triangle or Y when a blue icon shows, or go through the phone. Regular check-ins help your relationship<R />.
              </B>
              <B>
                <strong className="text-ink">Let them drive.</strong> Near your own vehicle, hold right on the D-pad to ask your partner to drive, then set a map destination<R />.
              </B>
              <B>
                <strong className="text-ink">Split up.</strong> Hold right on the D-pad to send your partner off at any point in free roam, though some missions restrict it. See our <A href="/guides/wanted">wanted level guide</A> for how that helps with the police<R />.
              </B>
              <B>
                <strong className="text-ink">Swap seats mid-chase.</strong> Switching characters while you drive puts you in control of the passenger<R />.
              </B>
              <B>
                <strong className="text-ink">Robberies.</strong> Ask your partner to wait in the car or come in as backup. Each character can carry two stash bags and can throw them to the other<R />.
              </B>
            </Bullets>
          </section>

          <section aria-labelledby="tips" className="mt-16x">
            <H2 id="tips">Tips</H2>
            <Bullets>
              <B>If D-pad right does nothing, you&apos;re probably before the Chapter 2 unlock or inside a mission.</B>
              <B>
                Answer your partner&apos;s WhatUp messages after you split up. GamesRadar+ says ignoring them hurts your relationship<R />.
              </B>
              <B>
                Make a manual save before you start experimenting with solo missions. See <A href="/guides/saving">how to save</A>.
              </B>
            </Bullets>
          </section>

          <Faq items={SWITCH_FAQ} />

          <SourcesList sources={SWITCH_SOURCES} verified={{ iso: SWITCH_VERIFIED, label: SWITCH_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">The short version</h2>
            <p className="mt-4x text-sm text-ink-2">Free switching opens in Chapter 2. Hold right on the D-pad, then R1/RB (GameSpot says L1/LB). Triangle/Y in the same menu meets up.</p>
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
              <li><A href="/guides/saving">How to save</A></li>
              <li><A href="/guides/wanted">Wanted system</A></li>
              <li><A href="/guides/missions">All missions in order</A></li>
              <li><A href="/map">Interactive map</A></li>
              <li><A href="/news">GTA 6 news</A></li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/switch-characters" />
    </article>
  );
}
