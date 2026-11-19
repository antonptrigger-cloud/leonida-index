import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { SourcesList } from "@/components/guides/MissionBits";
import {
  CARD_SETS,
  CARD_TOTAL,
  COLLECT_FAQ,
  COLLECT_SOURCES,
  COLLECT_VERIFIED,
  COLLECT_VERIFIED_LABEL,
} from "@/lib/guides/collectibles";

export const metadata = metaFor("/guides/collectibles");

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

const TYPES: { type: string; total: string; link: React.ReactNode; who: string }[] = [
  { type: "Collectible cards", total: `${CARD_TOTAL} cards in 18 sets`, link: <>Don&apos;t Touch My Deck: finish 3 sets. 100% needs 15 sets.</>, who: "PowerPyx; Push Square matches the sets" },
  { type: "WAiNK Landmarks", total: "31", link: <>Counts toward the 100 scans for You WAiNKer!</>, who: "PowerPyx and Push Square" },
  { type: "WAiNK Curiosities", total: "35", link: <>Counts toward the 100</>, who: "PowerPyx" },
  { type: "WAiNK Sculptures", total: "23", link: <>Counts toward the 100</>, who: "PowerPyx" },
  { type: "No Flusher Tags", total: "23", link: <>Counts toward the 100</>, who: "PowerPyx" },
  { type: "Meditation spots", total: "18", link: <>Positive Mental Attitude: meditate at every spot</>, who: "PowerPyx and GamesRadar+" },
  { type: "Cocaine flamingos", total: "125", link: <>No trophy found. Destroying 50 unlocks a spawn cheat</>, who: "PowerPyx; cheat from PC Gamer, GameSpot, GamesRadar+" },
  { type: "Vehicles to discover", total: "557 in the Progress database", link: <>Whip It Good: discover 100 vehicles</>, who: "PowerPyx" },
  { type: "AHOL Street Art and 1010 Murals", total: "112 and 5", link: <>Do not count toward the 100 WAiNK scans</>, who: "PowerPyx" },
];

export default function CollectiblesGuide() {
  return (
    <article>
      <PageSchema path="/guides/collectibles" breadcrumbs={false} />
      <Breadcrumbs path="/guides/collectibles" />
      <PageHeader
        backdrop="boat"
        kicker="Guide · Card sets, WAiNK scans and what counts"
        title="GTA 6 Collectibles"
        verified={COLLECT_VERIFIED_LABEL}
        source="PowerPyx, Push Square, PC Gamer, GamesRadar+"
      />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              Leonida is packed with things to pick up, scan and tick off, and the numbers can feel overwhelming in launch week. The good news is that you don&apos;t need all of them. Only a few categories feed the trophies, and the game keeps a running tally for you.
            </p>
            <p>
              This guide covers each collectible type, how many there are, and which ones the trophies and the 100% checklist actually ask for. For pins, use our <A href="/map">interactive map</A>. There are no story spoilers here. Trophy text is <strong className="text-turq">Confirmed</strong> and everything else is <strong className="text-orange">Reported</strong>, because Rockstar hasn&apos;t published a collectibles list.
            </p>
          </div>

          <section aria-labelledby="quick" className="mt-16x">
            <H2 id="quick">The quick answer</H2>
            <ul className="mt-4x flex max-w-2xl flex-col gap-3x">
              <li className="vc-bar text-ink-2">There are <strong className="text-ink">18 card sets with {CARD_TOTAL} cards</strong>. PowerPyx and Push Square list the same sets and sizes<R /></li>
              <li className="vc-bar text-ink-2">The trophies need <strong className="text-ink">3 full card sets</strong> and <strong className="text-ink">WAiNK scans at 100 locations</strong><C /></li>
              <li className="vc-bar text-ink-2">PowerPyx says the 100% checklist needs <strong className="text-ink">15 of the 18 sets</strong> and the same 100 WAiNK scans<R /></li>
              <li className="vc-bar text-ink-2">PowerPyx counts around 3,000 entries in the Progress database once you include vehicles, animals and weapons, so don&apos;t panic at the big number<R /></li>
            </ul>
          </section>

          <section aria-labelledby="types" className="mt-16x">
            <H2 id="types">Collectible types at a glance</H2>
            <div className="mt-4x overflow-x-auto">
              <table className="w-full min-w-[40rem] border-collapse text-left text-sm text-ink-2">
                <thead>
                  <tr className="border-b border-pink/20">
                    <th className={TH}>Type</th>
                    <th className={TH}>Total</th>
                    <th className={TH}>What it counts for</th>
                    <th className={TH}>Reported by</th>
                  </tr>
                </thead>
                <tbody>
                  {TYPES.map((t) => (
                    <tr key={t.type} className="border-b border-pink/10 align-top">
                      <td className="py-2x pr-4x font-semibold text-ink">{t.type}</td>
                      <td className="py-2x pr-4x">{t.total}</td>
                      <td className="py-2x pr-4x">{t.link}</td>
                      <td className="py-2x pr-4x text-xs text-muted">{t.who}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3x max-w-2xl text-sm text-muted">
              PowerPyx lists five WAiNK groups. The fifth is still unknown, so the four totals above add up to 112, more than the 100 you need. Push Square confirms the 31 landmarks.
            </p>
          </section>

          <section aria-labelledby="sets" className="mt-16x">
            <H2 id="sets">The 18 card sets</H2>
            <p className="mt-2x max-w-2xl text-sm text-muted">
              PowerPyx and Push Square match on every name and size. <span className="text-orange">Reported</span>.
            </p>
            <ol className="mt-4x grid max-w-3xl gap-x-8x gap-y-2x text-ink-2 sm:grid-cols-2">
              {CARD_SETS.map(([name, count]) => (
                <li key={name} className="vc-bar flex justify-between gap-4x">
                  <span>{name}</span>
                  <span className="text-muted">{count}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4x max-w-2xl text-ink-2">
              <strong className="text-ink">Quickest route to the trophy:</strong> the smallest sets are Backyard Wrestling (12) and Delights Dancers (18), so those two plus any 24-card set come to 54 cards.
            </p>
          </section>

          <section aria-labelledby="how" className="mt-16x">
            <H2 id="how">How to collect efficiently</H2>
            <ol className="mt-4x flex max-w-2xl list-decimal flex-col gap-3x pl-6x text-ink-2 marker:font-bold marker:text-pink">
              <li>
                <strong className="text-ink">Open your tracker.</strong> Push Square says to press the touchpad, then go to Progress, Collections. PowerPyx says some sub-categories only appear after you find your first item in them<R />.
              </li>
              <li>
                <strong className="text-ink">Know where cards hide.</strong> PowerPyx says indoor cards are usually on surfaces or stuck to walls, and outdoor ones are in yellow phone boxes on walls or in tool boxes. Push Square adds that random cards can turn up in yellow containers, and those aren&apos;t listed in guides<R />.
              </li>
              <li>
                <strong className="text-ink">Watch for colour variants.</strong> PowerPyx says some cards come in several colours, such as bronze, silver and gold, and each colour counts as its own card for the set. A repeat of a card you already have doesn&apos;t count twice<R />.
              </li>
              <li>
                <strong className="text-ink">Listen for WAiNK cues.</strong> PowerPyx says you get a vibration, a sound and an on-screen notice when a scan is near. Push Square says to hold Up on the D-pad to open the WAiNK app and scan with R1<R />.
              </li>
              <li>
                <strong className="text-ink">Don&apos;t count street art.</strong> PowerPyx says AHOL Street Art and 1010 Murals are scanned the same way but have their own menus and don&apos;t count toward the 100 WAiNK scans<R />.
              </li>
              <li>
                <strong className="text-ink">Sweep one area at a time</strong> and use the <A href="/map">map</A> to plan a route, then save by hand after a good haul.
              </li>
            </ol>
          </section>

          <section aria-labelledby="tips" className="mt-16x">
            <H2 id="tips">Tips</H2>
            <ul className="mt-4x flex max-w-2xl flex-col gap-4x">
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Sell cards without losing progress.</strong> PowerPyx and Push Square say pawn shops buy cards and a sold card stays in your Collections log. PowerPyx says values run from $20 to over $1,000 depending on rarity. Push Square says to check which pawn shops deal in cards<R />. See our <A href="/guides/money">money guide</A> for other earners.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">You can&apos;t buy cards.</strong> PowerPyx says they can only be picked up, so the supply is fixed<R />.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Chase the trophies together.</strong> Our <A href="/guides/trophies">trophy list and roadmap</A> shows where collectibles fit, and the <A href="/guides/strangers-and-freaks">Strangers &amp; Freaks guide</A> covers the side-mission trophy.
              </li>
            </ul>
          </section>

          <section aria-labelledby="unlock" className="mt-16x">
            <H2 id="unlock">What the trophies ask for</H2>
            <ul className="mt-4x flex max-w-2xl flex-col gap-3x text-ink-2">
              <li className="vc-bar"><strong className="text-ink">Don&apos;t Touch My Deck</strong> (Silver): complete 3 collectible card sets<C /></li>
              <li className="vc-bar"><strong className="text-ink">You WAiNKer!</strong> (Silver): WAiNK scans at 100 locations<C /></li>
              <li className="vc-bar"><strong className="text-ink">Positive Mental Attitude</strong> (Bronze): meditate at every spot across Leonida<C /></li>
              <li className="vc-bar"><strong className="text-ink">Whip It Good</strong> (Bronze): discover 100 vehicles<C /></li>
              <li className="vc-bar"><strong className="text-ink">A Long Road</strong> (Gold): reach 100% completion. PowerPyx says that needs at least 15 complete card sets (at least 372 cards) and the 100 scans<R /></li>
            </ul>
          </section>

          <Faq items={COLLECT_FAQ} />

          <SourcesList sources={COLLECT_SOURCES} verified={{ iso: COLLECT_VERIFIED, label: COLLECT_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">The numbers that matter</h2>
            <p className="mt-4x text-sm text-ink-2">3 card sets, 100 WAiNK scans, every meditation spot and 100 vehicles cover the four collection trophies.</p>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">
              Trophy text is checked against several outlets. Totals come from PowerPyx and, where available, Push Square. Anything one outlet only says is attributed to it.
            </p>
          </div>
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">More guides</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              <li><A href="/guides/trophies">Trophy list and platinum roadmap</A></li>
              <li><A href="/guides/strangers-and-freaks">Strangers &amp; Freaks</A></li>
              <li><A href="/guides/money">Money guide</A></li>
              <li><A href="/guides/cheats">Cheats</A></li>
              <li><A href="/guides/activities">Activities</A></li>
              <li><A href="/map">Interactive map</A></li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/collectibles" />
    </article>
  );
}
