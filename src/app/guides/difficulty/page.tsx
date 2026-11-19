import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { SourcesList } from "@/components/guides/MissionBits";
import { DIFFICULTY_FAQ, DIFFICULTY_SOURCES, DIFFICULTY_VERIFIED, DIFFICULTY_VERIFIED_LABEL } from "@/lib/guides/difficulty";

export const metadata = metaFor("/guides/difficulty");

const R = () => (
  <span className="ml-1x whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-orange" title="One outlet's report, or outlets that disagree. Not confirmed by Rockstar or by a second main outlet.">
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

export default function DifficultyGuide() {
  return (
    <article>
      <PageSchema path="/guides/difficulty" breadcrumbs={false} />
      <Breadcrumbs path="/guides/difficulty" />
      <PageHeader
        backdrop="boat"
        kicker="Guide · Difficulty, accessibility toggles and aim settings"
        title="GTA 6 Difficulty Settings and Easy Mode Explained"
        verified={DIFFICULTY_VERIFIED_LABEL}
        source="GameSpot, Push Square, PC Gamer"
      />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              If you&apos;ve hit a wall in a gunfight or keep wrecking your getaway car, the first thing you&apos;ll look for is a difficulty slider. GTA 6 doesn&apos;t have one. That doesn&apos;t mean you&apos;re stuck with one way to play, though. There are a couple of settings that take the edge off combat and driving, and some aiming options that change how forgiving shootouts feel. This page covers what exists, where to find it and what each option does.
            </p>
            <p>
              <strong className="text-turq">Confirmed</strong> means at least two main outlets say so. <strong className="text-orange">Reported</strong> means one outlet does, and we name it. Most of the menu detail here comes from Push Square alone, so it is Reported. This page has no story spoilers.
            </p>
          </div>

          <section aria-labelledby="modes" className="mt-16x">
            <H2 id="modes">Does GTA 6 have difficulty modes?</H2>
            <Bullets>
              <B>
                <strong className="text-ink">No difficulty levels.</strong> GameSpot says there are no difficulty options to choose from, and Push Square says GTA 6 doesn&apos;t have traditional difficulty options and that Rockstar never deals in difficulty levels. GameSpot adds that it continues Rockstar&apos;s habit of one set difficulty for the main campaign<C />.
              </B>
              <B>
                <strong className="text-ink">You can still adjust aiming.</strong> GameSpot says the aiming controls can be set to your preference, and Push Square mentions adjustable aim assist and lock-on options<C />.
              </B>
              <B>
                <strong className="text-ink">Two toggles act like an easy mode.</strong> Push Square found Accessible Combat and Reduced Vehicle Damage in the accessibility options and says that together they amount to an easy mode. GameSpot doesn&apos;t mention them<R />.
              </B>
              <B>
                <strong className="text-ink">Cheats unlock after the story.</strong> GameSpot and PC Gamer both say you need to finish the campaign first. GameSpot says they can make life easier or harder<C />. See our <A href="/guides/cheats">cheats guide</A>.
              </B>
            </Bullets>
          </section>

          <section aria-labelledby="easier" className="mt-16x">
            <H2 id="easier">How to make GTA 6 easier</H2>
            <Steps>
              <li>
                <strong className="text-ink">Open the settings.</strong> Push Square says to press Options and choose Settings<R />.
              </li>
              <li>
                <strong className="text-ink">Go to Gameplay.</strong> Push Square says the two toggles sit at the bottom of the Gameplay list, as options 24 and 25<R />.
              </li>
              <li>
                <strong className="text-ink">Turn on Accessible Combat.</strong> Push Square says it makes firefights easier by weakening enemies and cutting the damage you take. Its news piece and its tips guide word the exact mechanic a little differently<R />. Game8 and Gfinity, which we only use to back up a main outlet, describe the same toggle.
              </li>
              <li>
                <strong className="text-ink">Turn on Reduced Vehicle Damage.</strong> Push Square says your car takes less damage in crashes and fights, so it is less likely to become hard to control or blow up<R />.
              </li>
              <li>
                <strong className="text-ink">Read the warning.</strong> Push Square says the game warns that turning these on changes the balance and experience of play<R />.
              </li>
              <li>
                <strong className="text-ink">Tune your aiming.</strong> Aim settings can be adjusted (GameSpot and Push Square)<C />. Push Square says there are several aim assist and lock-on options<R />.
              </li>
              <li>
                <strong className="text-ink">Play a firefight and adjust.</strong> Push Square tested both toggles and says they don&apos;t make you invincible. You still need cover, but fights are noticeably easier. Switch them off again if it feels too easy<R />.
              </li>
            </Steps>
          </section>

          <section aria-labelledby="other" className="mt-16x">
            <H2 id="other">Other settings that help</H2>
            <p className="mt-4x max-w-2xl text-ink-2">Push Square&apos;s look at the accessibility menu lists more options that make the game less demanding<R />:</p>
            <Bullets>
              <B>
                <strong className="text-ink">Button press help.</strong> Taps and holds can be customised so they are less tiring.
              </B>
              <B>
                <strong className="text-ink">Simplified minigames.</strong> A toggle that makes minigame controls less complex.
              </B>
              <B>
                <strong className="text-ink">Controller layouts.</strong> Several ways to change the layout. Push Square&apos;s tips guide says you can swap the new Default scheme for Classic, the GTA 5 style, under Settings &gt; Control Scheme.
              </B>
              <B>
                <strong className="text-ink">Visual options.</strong> Low vision settings, a one-toggle brightness option and a high contrast mode.
              </B>
            </Bullets>
          </section>

          <section aria-labelledby="trophies" className="mt-16x">
            <H2 id="trophies">Do these settings disable trophies?</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                Push Square says turning on Accessible Combat or Reduced Vehicle Damage doesn&apos;t disable trophies and doesn&apos;t change the story<R />. We haven&apos;t found a second main outlet or Rockstar saying the same, so treat it as unconfirmed. If trophies matter to you, read the in-game warning before you confirm.
              </p>
              <p>
                Cheats are a different case. Our <A href="/guides/cheats">cheats guide</A> cites GamesRadar+ and Push Square for trophies being switched off while a cheat is active, and PC Gamer says you can&apos;t save once you use one<R />. Check the <A href="/guides/trophies">trophy list</A> for what you are chasing.
              </p>
            </div>
          </section>

          <section aria-labelledby="unlock" className="mt-16x">
            <H2 id="unlock">Do I have to unlock anything?</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                Push Square gives no unlock requirement for the two toggles or the aim options, and shows them in the standard settings menus<R />. Cheats are the exception, since GameSpot and PC Gamer say they only open up after the campaign<C />.
              </p>
            </div>
          </section>

          <section aria-labelledby="tips" className="mt-16x">
            <H2 id="tips">Tips</H2>
            <Bullets>
              <B>
                <strong className="text-ink">Try the aim settings first.</strong> If only the shootouts are giving you trouble, more aim assist may be enough without changing the game&apos;s balance. That is our own suggestion.
              </B>
              <B>
                <strong className="text-ink">Use the toggles one fight at a time.</strong> They are plain settings, so you can switch them on for a tough job and off afterwards.
              </B>
              <B>
                <strong className="text-ink">Pair Reduced Vehicle Damage with car-heavy work.</strong> Long drives and chases are less punishing when your car shrugs off crashes. Our <A href="/guides/stealing-cars">stealing cars guide</A> explains how those jobs work.
              </B>
              <B>
                <strong className="text-ink">Don&apos;t confuse this with cheats.</strong> Cheats block saving while active, but Push Square says the accessibility toggles don&apos;t disable trophies<R />.
              </B>
              <B>
                <strong className="text-ink">Use stealth and bank your cash.</strong> Push Square says to grab enemies with R2 to knock them out without killing them, and to put wallet cash into your BuckMe account so you don&apos;t lose it if you&apos;re Busted or Wasted<R />. See our <A href="/guides/beginner">beginner guide</A> and <A href="/guides/wanted">wanted system guide</A>.
              </B>
            </Bullets>
          </section>

          <Faq items={DIFFICULTY_FAQ} />

          <SourcesList sources={DIFFICULTY_SOURCES} verified={{ iso: DIFFICULTY_VERIFIED, label: DIFFICULTY_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">The short version</h2>
            <p className="mt-4x text-sm text-ink-2">
              No difficulty levels, but you can adjust aiming. Push Square found two toggles, Accessible Combat and Reduced Vehicle Damage, in Settings &gt; Gameplay. Cheats only unlock after the story.
            </p>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">
              Confirmed needs two main outlets. The toggles and menu paths come from Push Square alone, so they are marked Reported. Game8 and Gfinity only back up a main outlet.
            </p>
          </div>
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">More guides</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              <li><A href="/guides/beginner">Beginner guide</A></li>
              <li><A href="/guides/cheats">Cheats</A></li>
              <li><A href="/guides/trophies">Trophy list</A></li>
              <li><A href="/guides/wanted">Wanted system</A></li>
              <li><A href="/guides/stealing-cars">Stealing cars</A></li>
              <li><A href="/news">GTA 6 news</A></li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/difficulty" />
    </article>
  );
}
