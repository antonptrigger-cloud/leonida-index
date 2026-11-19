import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { Spoiler } from "@/components/guides/Spoiler";
import { SourcesList, SpoilerWarning } from "@/components/guides/MissionBits";
import { MONEY_FAQ, MONEY_SOURCES, MONEY_VERIFIED, MONEY_VERIFIED_LABEL } from "@/lib/guides/money";
import { characterPath } from "@/lib/characters/characters";

export const metadata = metaFor("/guides/money");

const R = () => (
  <span className="ml-1x whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-orange" title="Reported by outlets after launch. Not confirmed by Rockstar or in-game.">
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

const Steps = ({ children }: { children: React.ReactNode }) => (
  <ol className="mt-4x flex max-w-2xl list-decimal flex-col gap-3x pl-6x text-ink-2 marker:font-bold marker:text-pink">{children}</ol>
);

export default function MoneyGuide() {
  return (
    <article>
      <PageSchema path="/guides/money" breadcrumbs={false} />
      <Breadcrumbs path="/guides/money" />
      <PageHeader
        backdrop="boat"
        kicker="Guide · Fastest ways to earn cash"
        title="GTA 6 Money Guide"
        verified={MONEY_VERIFIED_LABEL}
        source="PowerPyx, GameSpot, PC Gamer"
      />

      <SpoilerWarning>
        This guide names story chapters, a few characters and the types of jobs that open up later. Everything past Chapter 1 is behind the spoiler blur.
      </SpoilerWarning>

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              Money in GTA 6 isn&apos;t one grind you can repeat all game. The best earner changes as the story moves on, because each chapter hands you new buyers, new tools and new kinds of targets. The smart plan is to know what is worth doing right now, and save the big grinds for when they pay.
            </p>
            <p>
              Everything below comes from what GameSpot, PowerPyx and PC Gamer reported in launch week. Rockstar hasn&apos;t published payouts, so every figure is <strong className="text-orange">Reported</strong>, and where outlets disagree we give the range.
            </p>
          </div>

          <section aria-labelledby="quick" className="mt-16x">
            <H2 id="quick">The quick answer</H2>
            <div className="vc-bar mt-4x max-w-2xl text-ink-2">
              PowerPyx reports that <strong className="text-ink">large bank vault robberies</strong> are the biggest earner, at up to <strong className="text-ink">$205,000</strong> each, but they only unlock late in the story<R />. Until then, stolen cars are the steadiest money, with jewelry and other high-end store jobs on top once they open up. The best method at each stage is below.
            </div>
          </section>

          <section aria-labelledby="ch1" className="mt-16x">
            <H2 id="ch1">Chapter 1: play the story, don&apos;t grind</H2>
            <Steps>
              <li>
                Stick to the story. PowerPyx says farming cash in Chapter 1 is pointless, because you lose what you are carrying when the chapter ends<R />.
              </li>
              <li>
                If you want some spending money on the way, PowerPyx lists store hold-ups, gang hideouts (yellow icons on the map) and race wins as the early earners<R />. See our <A href="/guides/activities">activities guide</A> for what else is out there.
              </li>
              <li>Spend freely on clothes, weapons or repairs you actually want before the chapter ends.</li>
              <li>
                Jason can start earning from Kenton&apos;s treasure dives after <A href="/guides/missions/island-dreams">Island Dreams</A>. GameSpot says completing every piece at a dive spot can add up to tens of thousands of dollars over time, while PC Gamer calls diving fun but very time-consuming<R />. Kenton has a profile in our <A href={characterPath("kenton")}>character database</A>.
              </li>
            </Steps>
          </section>

          <section aria-labelledby="ch2" className="mt-16x">
            <H2 id="ch2">Chapter 2: car theft and small jobs</H2>
            <div className="mt-4x">
              <Spoiler label="Chapter 2 money">
                <div className="max-w-2xl space-y-4x text-ink-2">
                  <p>
                    Chapter 2 starts with Lucia, who has no money, in Port Gellhorn. GameSpot says the story soon needs her to find a couple of thousand dollars for motel rent, and its advice is to rob the small stores marked with green icons on the map, sell cars to Moses and mug people at gunpoint<R />.
                  </p>
                  <p>
                    Once you finish the story mission <strong className="text-ink">Moses</strong>, PC Gamer says he gives you a slim jim and buys stolen cars, which it calls probably the best way to turn a quick profit at this stage<R />. See his <A href={characterPath("moses")}>character profile</A>.
                  </p>
                </div>
                <Steps>
                  <li>
                    Look for older, low-profile cars. PC Gamer says that is what Moses wants, and he often tells you where to find them<R />. PowerPyx adds that he only accepts cars without trackers<R />.
                  </li>
                  <li>
                    Deliver and collect. Payouts vary by car and by outlet: PowerPyx says $1,000 or more is typical, PC Gamer says one to a few thousand dollars, and GameSpot says often upwards of $10,000. PC Gamer&apos;s overall range for car theft is $1,000 to $20,000 depending on the make, model and fence<R />.
                  </li>
                  <li>
                    Don&apos;t expect to sell back to back. PC Gamer says that after he buys a car you can&apos;t sell him another for a while<R />.
                  </li>
                </Steps>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="ch3" className="mt-16x">
            <H2 id="ch3">Chapter 3: robberies and car sales</H2>
            <div className="mt-4x">
              <Spoiler label="Chapter 3 money">
                <Steps>
                  <li>
                    <strong className="text-ink">Jewelry and high-end stores.</strong> PowerPyx says jewelry robberies open early in Chapter 3 and pay $10,000 to $25,000 per store, with a fence called Yasmani paying well for the haul. PC Gamer puts back-door store jobs at $6,000 to $15,000<R />. Both mention opening the back-room safe. GameSpot says small shops are rarely worth it, and the better targets are the high-end stores in richer areas such as Capri, Ocean Beach and downtown Vice City<R />.
                  </li>
                  <li>
                    <strong className="text-ink">Pay &apos;n&apos; Spray sales.</strong> PowerPyx says that from early in Chapter 3 you can sell cars with standard trackers at any Pay &apos;n&apos; Spray, for around $4,000 or more for a good one. GameSpot agrees that these shops pay more for newer cars, and says they won&apos;t take cars with a high-end tracker<R />.
                  </li>
                  <li>
                    <strong className="text-ink">Randy&apos;s wish list.</strong> The mission <strong className="text-ink">Steal the Zorrusso for Randy</strong> introduces Randy and a key cloner for modern cars. PowerPyx says it then unlocks a wish list of 18 high-end cars, with deliveries in perfect condition usually paying $30,000 or more. GameSpot also says a car in decent condition earns a bigger payout<R />. See his <A href={characterPath("randy")}>character profile</A>.
                  </li>
                </Steps>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="hideouts" className="mt-16x">
            <H2 id="hideouts">Throughout the game: gang hideouts</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                GameSpot says yellow icons across the map mark rival gang hideouts, each labelled with the gang, its security level and the possible score. Hideouts have a dozen or two enemies, plus goods, cash and sometimes vehicles or weapons you can sell. It says the dealers there pay almost instantly<R />. PC Gamer agrees that a stronghold pays a lot, usually in narcotics, but warns of a big gunfight or a long stealth run<R />.
              </p>
            </div>
          </section>

          <section aria-labelledby="late" className="mt-16x">
            <H2 id="late">Late game: big robberies</H2>
            <div className="mt-4x">
              <Spoiler label="late-game bank vaults">
                <Steps>
                  <li>
                    PowerPyx says bank vault robberies open at the end of Chapter 4 through an optional mission called <strong className="text-ink">That&apos;s Where The Money Is…</strong>, shortly before the story&apos;s final stretch<R />.
                  </li>
                  <li>
                    The method it describes: follow a security van until it stops at a bank, then slip into the vault while the guard has it open<R />.
                  </li>
                  <li>
                    Large banks pay up to about $205,000 for around five minutes of work, and the robbery instantly gives you a four-star wanted level<R />. PowerPyx suggests a fast motorcycle to cut through traffic, then swapping to another vehicle so you&apos;re harder to recognise. Our <A href="/guides/wanted">wanted system guide</A> explains how to lose the cops.
                  </li>
                  <li>
                    GameSpot notes that the bigger banks and higher-end stores open up around the halfway point of the story, once you are working with an actual robbery crew, and mentions Dye Pack Jammers for handling marked bills<R />.
                  </li>
                </Steps>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="tips" className="mt-16x">
            <H2 id="tips">Tips</H2>
            <ul className="mt-4x flex max-w-2xl flex-col gap-4x">
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Check a car before you steal it.</strong> Know its age, value and tracker before you drive it to a buyer who might refuse it. Our <A href="/guides/stealing-cars">stealing cars guide</A> covers hot-wiring and theft tools.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Keep high-end cars in good shape.</strong> GameSpot says Randy pays a bigger bonus when cars arrive in decent condition<R />.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Match the job to the stage.</strong> Small robberies that are fine early pay far less once better options open, so move up as the story does.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Plan your escape.</strong> The bigger the take, the more heat you get. See the <A href="/guides/wanted">wanted guide</A> before a big job.
              </li>
            </ul>
          </section>

          <Faq items={MONEY_FAQ} />

          <SourcesList sources={MONEY_SOURCES} verified={{ iso: MONEY_VERIFIED, label: MONEY_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">What opens up when</h2>
            <p className="mt-4x text-sm text-ink-2">
              Each chapter adds a new earner. Chapters 2 and 3 add car buyers, and jewelry and high-end store jobs, and bank vaults come late. The details sit behind the spoiler blur.
            </p>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">
              We cross-check payouts against more than one outlet and name who said what. Figures are <strong className="text-orange">Reported</strong> until we can confirm them in-game.
            </p>
          </div>
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">More guides</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              <li><A href="/guides/missions">All missions in order</A></li>
              <li><A href="/guides/stealing-cars">Stealing cars</A></li>
              <li><A href="/guides/wanted">Wanted system</A></li>
              <li><A href="/guides/activities">Activities</A></li>
              <li><A href="/map">Interactive map</A></li>
              <li><A href="/news">GTA 6 news</A></li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/money" />
    </article>
  );
}
