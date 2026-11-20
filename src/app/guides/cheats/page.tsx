import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { SourcesList } from "@/components/guides/MissionBits";
import {
  CHEATS_FAQ,
  CHEATS_SOURCES,
  CHEATS_VERIFIED,
  CHEATS_VERIFIED_LABEL,
  CODES,
  OTHER_CHALLENGES,
  arrows,
} from "@/lib/guides/cheats";

export const metadata = metaFor("/guides/cheats");

const R = () => (
  <span className="ml-1x whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-orange" title="Reported by outlets after launch. Not confirmed by Rockstar.">
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

export default function CheatsGuide() {
  return (
    <article>
      <PageSchema path="/guides/cheats" breadcrumbs={false} />
      <Breadcrumbs path="/guides/cheats" />
      <PageHeader
        backdrop="boat"
        kicker="Guide · How to unlock them, and the codes so far"
        title="GTA 6 Cheats"
        verified={CHEATS_VERIFIED_LABEL}
        source="PC Gamer, GameSpot, GamesRadar+, Push Square"
      />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              If you are used to typing a code on day one in older GTA games, GTA 6 will surprise you. Cheats are back, but as a reward for finishing the game rather than a shortcut through it. Outlets that tested them in launch week report two gates: beat the story, then clear a separate challenge for each cheat.
            </p>
            <p>
              Rockstar hasn&apos;t published a cheats list, so everything here is <strong className="text-orange">Reported</strong>. We only list a code when at least two of PC Gamer, GameSpot, GamesRadar+ and Push Square print the same input, and we leave out the rest for now. This page doesn&apos;t describe any story events.
            </p>
          </div>

          <section aria-labelledby="quick" className="mt-16x">
            <H2 id="quick">The quick answer</H2>
            <ul className="mt-4x flex max-w-2xl flex-col gap-3x">
              <li className="vc-bar text-ink-2">Cheats do nothing until you have finished the main story. PC Gamer and GameSpot both tested earlier saves to check<R /></li>
              <li className="vc-bar text-ink-2">Each cheat then has its own unlock challenge, and challenges you have already completed count<R /></li>
              <li className="vc-bar text-ink-2">Using a cheat switches off saving and trophies until you reload<R /></li>
              <li className="vc-bar text-ink-2">GamesRadar+ and Push Square count 61 cheats in total<R /></li>
            </ul>
          </section>

          <section aria-labelledby="how" className="mt-16x">
            <H2 id="how">How to unlock and enter cheats</H2>
            <ol className="mt-4x flex max-w-2xl list-decimal flex-col gap-3x pl-6x text-ink-2 marker:font-bold marker:text-pink">
              <li>
                <strong className="text-ink">Finish the story.</strong> Our <A href="/guides/missions">missions in order</A> list tracks where you are.
              </li>
              <li>
                <strong className="text-ink">Check the Progress tab.</strong> GamesRadar+ says to open the menu with the touchpad or Menu button, press R1/RB to reach Progress, and look for the new Cheats option. Push Square adds that the tab stays hidden until you have unlocked at least one cheat<R />.
              </li>
              <li>
                <strong className="text-ink">Clear each cheat&apos;s challenge.</strong> The tables below list what each one asks for.
              </li>
              <li>
                <strong className="text-ink">Make a separate save first.</strong> You can&apos;t save once a cheat is on, so Push Square suggests creating a dedicated save file for cheating.
              </li>
              <li>
                <strong className="text-ink">Enter the code.</strong> In free roam, press Up on the D-pad to bring up your phone, hold L1 and R1 (LB and RB on Xbox), then press the D-pad sequence<R />. Push Square says a notification confirms it worked.
              </li>
              <li>
                <strong className="text-ink">To go back to normal,</strong> restart or reload a save made without cheats. Push Square says that turns trophies back on<R />.
              </li>
            </ol>
          </section>

          <section aria-labelledby="codes" className="mt-16x">
            <H2 id="codes">Codes confirmed by two or more outlets</H2>
            <p className="mt-2x max-w-2xl text-sm text-muted">
              Arrows are D-pad directions. <span className="text-orange">Reported</span>: &ldquo;Seen in&rdquo; names the outlets that print the same input. Codes in the same family share an opening, so enter them slowly.
            </p>
            <div className="mt-4x overflow-x-auto">
              <table className="w-full min-w-[40rem] border-collapse text-left text-sm text-ink-2">
                <thead>
                  <tr className="border-b border-pink/20">
                    <th className={TH}>Cheat</th>
                    <th className={TH}>What it does</th>
                    <th className={TH}>Unlock</th>
                    <th className={TH}>Code</th>
                  </tr>
                </thead>
                <tbody>
                  {CODES.map((c) => (
                    <tr key={c.name} className="border-b border-pink/10 align-top">
                      <td className="py-2x pr-4x font-semibold text-ink">{c.name}</td>
                      <td className="py-2x pr-4x">{c.effect}</td>
                      <td className="py-2x pr-4x">{c.unlock}</td>
                      <td className="py-2x pr-4x">
                        <span className="whitespace-nowrap font-mono text-base text-ink" aria-label={c.code.split("").map((x) => ({ U: "up", D: "down", L: "left", R: "right" })[x]).join(", ")}>
                          {arrows(c.code)}
                        </span>
                        <span className="mt-1x block text-xs text-muted">Seen in {c.seen}</span>
                        {c.note ? <span className="mt-1x block text-xs text-faint">{c.note}</span> : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="challenges" className="mt-16x">
            <H2 id="challenges">Unlock challenges for the other cheats</H2>
            <p className="mt-2x max-w-2xl text-sm text-muted">
              Outlets agree on these challenges, but two of them haven&apos;t printed the button codes yet, so we&apos;ve left those out. <span className="text-orange">Reported</span>.
            </p>
            <div className="mt-6x flex flex-col gap-8x">
              {OTHER_CHALLENGES.map((g) => (
                <div key={g.title}>
                  <h3 className="vc-kicker">{g.title}</h3>
                  <ul className="mt-3x grid gap-x-8x gap-y-2x text-sm text-ink-2 sm:grid-cols-2">
                    {g.items.map(([name, how]) => (
                      <li key={name} className="vc-bar">
                        <strong className="text-ink">{name}:</strong> {how}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="tips" className="mt-16x">
            <H2 id="tips">Tips</H2>
            <ul className="mt-4x flex max-w-2xl flex-col gap-4x">
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Keep a clean save.</strong> Cheat on a copy so you never lose progress toward the <A href="/guides/trophies">trophy list</A>, since trophies are disabled while a cheat is on<R />.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Shooting range medals feed three cheats.</strong> Max Ammo, Infinite Ammo and No Reload all count medals, so do the ranges once, properly.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Many challenges overlap with exploring.</strong> Our <A href="/map">interactive map</A> and <A href="/guides/activities">activities guide</A> help with collectibles, races and stunts.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Want it easier before the credits?</strong> Cheats only unlock after the story, so see our <A href="/guides/difficulty">difficulty settings guide</A> for the settings that can ease things in the meantime.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Want a jet before the credits?</strong> Cheat-spawned vehicles only come after the story. Our <A href="/guides/secret-vehicles">secret vehicles guide</A> shows where main outlets say the Lazer, free planes and other rare vehicles sit in the open world.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Cash cheat vs earning it.</strong> The $250,000 cheat is a one-off, so see our <A href="/guides/money">money guide</A> for ways to earn properly.
              </li>
            </ul>
          </section>

          <Faq items={CHEATS_FAQ} />

          <SourcesList sources={CHEATS_SOURCES} verified={{ iso: CHEATS_VERIFIED, label: CHEATS_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">Good to know</h2>
            <p className="mt-4x text-sm text-ink-2">
              Cheats are locked behind the story and a challenge per cheat. Saving and trophies stay off while one is active.
            </p>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">
              Codes appear only when two established outlets print the same input. Anything single-source is held back until it is matched.
            </p>
          </div>
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">More guides</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              <li><A href="/guides/trophies">Trophy list and platinum roadmap</A></li>
              <li><A href="/guides/money">Money guide</A></li>
              <li><A href="/guides/missions">All missions in order</A></li>
              <li><A href="/guides/wanted">Wanted system</A></li>
              <li><A href="/guides/secret-vehicles">Secret vehicles</A></li>
              <li><A href="/news">GTA 6 news</A></li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/cheats" />
    </article>
  );
}
