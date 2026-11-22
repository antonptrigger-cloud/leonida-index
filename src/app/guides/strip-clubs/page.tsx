import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { Spoiler } from "@/components/guides/Spoiler";
import { SourcesList, SpoilerWarning } from "@/components/guides/MissionBits";
import { CreditImage } from "@/components/guides/CreditImage";
import { STRIP_FAQ, STRIP_SOURCES, STRIP_VERIFIED, STRIP_VERIFIED_LABEL } from "@/lib/guides/strip-clubs";

export const metadata = metaFor("/guides/strip-clubs");

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

export default function StripClubsGuide() {
  return (
    <article>
      <PageSchema path="/guides/strip-clubs" breadcrumbs={false} />
      <Breadcrumbs path="/guides/strip-clubs" />
      <PageHeader
        backdrop="pier"
        kicker="Guide · Nightlife"
        title="GTA 6 Strip Clubs"
        verified={STRIP_VERIFIED_LABEL}
        source="PC Gamer, Polygon, GamesRadar+, GameSpot, PowerPyx"
      />

      <SpoilerWarning>
        This guide names the three clubs, their districts and prices in the open. Story visits and character names sit behind the spoiler blur. GamesRadar+ and Polygon say Jack of Hearts opens in Chapter 3; that timing is in the open text, without mission names.
      </SpoilerWarning>

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              There are three strip clubs in Leonida, according to PC Gamer, GameSpot, GamesRadar+, Polygon and PowerPyx: <strong className="text-ink">NINE1NINE</strong>, <strong className="text-ink">Delights Cabaret</strong> and <strong className="text-ink">Jack of Hearts</strong>
              <R />. Two you can walk into early. The third stays locked until later in the story.
            </p>
            <p>
              On the in-game map, Polygon and PowerPyx both say to open the legend, go to <strong className="text-ink">Activities</strong>, then <strong className="text-ink">Clubs</strong>
              <R />. That list also includes ordinary pubs and dance halls, such as The Rusty Anchor. Polygon says a venue with strippers usually says so in its description. PowerPyx also lists The Vault in Vice City as a nightclub, not a strip club.
            </p>
          </div>

          <CreditImage
            src="/guides/strip-clubs-nine1nine.webp"
            alt="Official Grand Theft Auto VI screenshot of a dancer in a Vice City club as cash falls around her"
            width={1600}
            height={900}
          />

          <section aria-labelledby="quick" className="mt-16x">
            <H2 id="quick">The quick answer</H2>
            <div className="vc-bar mt-4x max-w-2xl text-ink-2">
              Start at <strong className="text-ink">NINE1NINE</strong> in Downtown Vice City, next to The Vault. GamesRadar+ says it is the closest of the three to the house in Key Lento, about five miles away, and sits just south of the overpass
              <R />. A private dance there is <strong className="text-ink">$300</strong>, plus a $50 tip, according to PC Gamer and Polygon
              <R />. Delights Cabaret in Port Gellhorn is the cheap option if you are willing to drive. Jack of Hearts, further north in Crosstown, is the expensive one — and it does not open right away.
            </div>
          </section>

          <section aria-labelledby="nine" className="mt-16x">
            <H2 id="nine">NINE1NINE, Downtown Vice City</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                PC Gamer, GameSpot, GamesRadar+ and Polygon all place NINE1NINE in <strong className="text-ink">Downtown Vice City</strong>, next door to The Vault
                <R />. Polygon pins it on NE 7th Street, southeast of the big interchange. GamesRadar+ puts it in the north of Downtown, just south of the overpass. PowerPyx disagrees on the district and files it in <strong className="text-ink">Crosstown</strong>
                <R />. We follow the Downtown placement, which matches the majority and our live map pin.
              </p>
              <p>
                PC Gamer calls it the classiest and priciest of the clubs you can enter early: drinking, club dancing and private dances, at <strong className="text-ink">$300</strong> for a dance and a <strong className="text-ink">$50</strong> tip
                <R />. To get there from the Keys, it says to take Route 1 toward Hamlet, merge onto Route 97 and head north into Downtown; the clubs sit just to the right of the big western interchange
                <R />. You can open it on our map at <A href="/map?pin=gtadb-L190">NINE1NINE (live pin)</A>.
              </p>
              <p>
                For a private dance, PC Gamer says you greet the dancer and use the interaction prompt, same as older GTA games, and that this club also has a person by the private-room entrance who can set one up
                <R />. Polygon says you find a counter, choose “private dance”, and tip during the performance. It also says Lucia can pay for a dance, not only Jason
                <R />.
              </p>
            </div>
          </section>

          <section aria-labelledby="delights" className="mt-16x">
            <H2 id="delights">Delights Cabaret, Port Gellhorn</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                This is the one club outside Vice City. GamesRadar+ and PowerPyx put it in central Port Gellhorn. GameSpot describes it as the highway strip in western Kelly County. Polygon puts it on the corner of the I-404 and Glenwood Ave, just southeast of Dunk&apos;s trailer
                <R />.
              </p>
              <p>
                It is the cheap, rougher option. PC Gamer lists drinking, private dances, stage dances and pool, at <strong className="text-ink">$40</strong> for a private dance, a <strong className="text-ink">$10</strong> tip and a <strong className="text-ink">$5</strong> stage tip
                <R />. GamesRadar+ agrees it is much cheaper than NINE1NINE, but does not publish a price.
              </p>
              <p>
                Polygon disagrees on the main activity: it says you can watch the dancers at Delights, but <strong className="text-ink">you cannot order a private dance there</strong>, only at NINE1NINE and Jack of Hearts
                <R />. GameSpot, by contrast, says private dances can be bought at all three clubs, each at a different price, without giving the figures
                <R />. We report both sides until we can confirm it in-game.
              </p>
              <p>
                PC Gamer&apos;s drive from the Keys: Route 1 to Hamlet, northwest on Route 82 toward Capri, then 103 onto the 404, past the airport toward Port Gellhorn, a right into town, and the Delights billboard on your left
                <R />. That club is not on our public map yet; a pin is ready in a separate draft and will appear once it is approved.
              </p>
            </div>
          </section>

          <section aria-labelledby="jack" className="mt-16x">
            <H2 id="jack">Jack of Hearts, Crosstown</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                GamesRadar+ and PowerPyx place Jack of Hearts at the north end of Crosstown. PC Gamer says it is directly north of NINE1NINE. Polygon describes a small shopping area on Mirimar Dr, just northwest of three tall skyscrapers near the bridge. GameSpot says it is up the road from NINE1NINE
                <R />.
              </p>
              <p>
                You cannot walk in on day one. <strong className="text-ink">GamesRadar+ says it is locked behind a Chapter 3 story mission. Polygon says it unlocks at the start of Chapter 3.</strong> PC Gamer was turned away on an early visit and assumed Chapter 3, but it had not been inside and listed no prices
                <R />.
              </p>
              <p>
                Polygon is the outlet that publishes a price: a private dance costs <strong className="text-ink">$1,000</strong>, the most expensive of the three
                <R />. GameSpot says you can only buy a private dance here at certain times, “likely due to the story,” and does not give a figure
                <R />. Like Delights, this club is not on the live map yet.
              </p>
            </div>
            <div className="mt-4x">
              <Spoiler label="story role (Chapter 3 and later)">
                <p className="max-w-2xl text-ink-2">
                  GameSpot says Jack of Hearts plays a critical role in the story and that you visit it several times to meet characters including Boobie Ike, Dre&apos;Quan Priest and the Dimez. It describes the club as a pared-down NINE1NINE, with more than one floor and a large main room
                  <R />. GameSpot also says Delights Cabaret is owned by a character named Frankie, and that the story takes you there more than once
                  <R />. We are not naming the missions.
                </p>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="rules" className="mt-16x">
            <H2 id="rules">Cash, tips and what you can actually do</H2>
            <ul className="mt-4x flex max-w-2xl flex-col gap-4x">
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Bring cash.</strong> Polygon says the starting price and the tips are cash only, and that you should use a club ATM (BuckMe) if your pockets are empty
                <R />. GameSpot also flags ATMs inside and says you need cash on you
                <R />.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Drinks and dancing.</strong> Polygon says bar drinks give temporary stat boosts, and that holding R2/RT makes your character dance. If Jason and Lucia dance together, it can improve their relationship
                <R />. See our <A href="/guides/relationship">relationship guide</A>.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Making it rain.</strong> GameSpot says you can throw singles from the main stage at any of the three clubs, and that nothing special happens when you do
                <R />.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">A private dance will not wreck the relationship on its own.</strong> Polygon says you may get a message from your partner asking where you are; if you reply honestly and still spend time together, the relationship holds. Ignoring messages is what does the damage
                <R />.
              </li>
            </ul>
          </section>

          <Faq items={STRIP_FAQ} />
          <SourcesList sources={STRIP_SOURCES} verified={{ iso: STRIP_VERIFIED, label: STRIP_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">At a glance</h2>
            <ul className="mt-4x flex flex-col gap-3x text-sm text-ink-2">
              <li>
                <strong className="text-ink">NINE1NINE</strong> — Downtown Vice City, next to The Vault. $300 + $50 tip (PC Gamer, Polygon). Open early. <A href="/map?pin=gtadb-L190">Map pin</A>
              </li>
              <li>
                <strong className="text-ink">Delights Cabaret</strong> — Port Gellhorn. $40 according to PC Gamer; Polygon says no private dance. Open early.
              </li>
              <li>
                <strong className="text-ink">Jack of Hearts</strong> — North Crosstown. $1,000 according to Polygon. Opens in Chapter 3 (GamesRadar+, Polygon).
              </li>
            </ul>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">
              Prices and districts are <strong className="text-orange">Reported</strong>. Where PC Gamer, Polygon, GameSpot, GamesRadar+ or PowerPyx disagree, we print both sides instead of picking a winner.
            </p>
          </div>
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">More guides</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              <li>
                <A href="/guides/money">Money guide</A>
              </li>
              <li>
                <A href="/guides/relationship">Relationship levels</A>
              </li>
              <li>
                <A href="/guides/activities">Activities</A>
              </li>
              <li>
                <A href="/news/gta-6-no-prostitutes-rockstar">Rockstar on sex workers</A>
              </li>
              <li>
                <A href="/map">Interactive map</A>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/strip-clubs" />
    </article>
  );
}
