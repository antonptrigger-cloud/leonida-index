import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { Spoiler } from "@/components/guides/Spoiler";
import { SourcesList } from "@/components/guides/MissionBits";
import {
  GARAGES,
  GARAGES_FAQ,
  GARAGES_SOURCES,
  GARAGES_VERIFIED,
  GARAGES_VERIFIED_LABEL,
  MATCHING,
  TOTAL_GAMESPOT,
  TOTAL_POWERPYX,
  fmtPrice,
  usd,
} from "@/lib/guides/garages";

export const metadata = metaFor("/guides/garages");

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
const TH = "py-2x pr-4x text-xs font-bold uppercase tracking-[0.14em] text-muted";

export default function GaragesGuide() {
  const conflicts = GARAGES.length - MATCHING;
  return (
    <article>
      <PageSchema path="/guides/garages" breadcrumbs={false} />
      <Breadcrumbs path="/guides/garages" />
      <PageHeader
        backdrop="boat"
        kicker="Guide · Prices, locations and vehicle slots"
        title="GTA 6 Garages: Every Location, Price and How to Buy One"
        verified={GARAGES_VERIFIED_LABEL}
        source="PowerPyx, GameSpot, GamesRadar+"
      />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              Stealing a nice car in Leonida is easy. Keeping it is the hard part. Garages are how you hold on to more than a couple of vehicles in GTA 6: each one adds parking you can fill with registered cars, and buying the full set is also a trophy.
            </p>
            <p>
              This page covers when garages open up, what each one costs, roughly where to find them, and where the two guides that have counted them so far disagree. <strong className="text-turq">Confirmed</strong> means at least two main outlets say so. <strong className="text-orange">Reported</strong> means one outlet does, or the outlets disagree, and we name them.
            </p>
          </div>

          <section aria-labelledby="when" className="mt-16x">
            <H2 id="when">When can you buy garages?</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                <strong className="text-ink">Not at the start.</strong> PowerPyx and GameSpot both put garages in a later stretch of the story, once a mechanic starts registering cars for you<C />. GameSpot puts that at roughly 30% of the way through<R />.
              </p>
              <p>
                PowerPyx says a short while later a new phone app, <strong className="text-ink">Vice City Real Estate</strong>, is installed and sells every purchasable garage<R />. GameSpot also mentions the app, and says you can buy a garage by walking up to it instead<R />.
              </p>
              <Spoiler label="the mission behind the app">
                <p className="max-w-2xl text-ink-2">
                  PowerPyx ties the app to the Chapter 2 mission <strong className="text-ink">Daily Driver</strong> (steal the Crawler for Moses), and says finishing it also hands you a free garage in Port Gellhorn<R />.
                </p>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="how" className="mt-16x">
            <H2 id="how">How to buy a garage, step by step</H2>
            <Steps>
              <li>
                <strong className="text-ink">Play on until a mechanic is registering cars for you.</strong> Garages aren&apos;t available before that<C />.
              </li>
              <li>
                <strong className="text-ink">Wait for the phone notification that Vice City Real Estate is installed.</strong> PowerPyx describes it arriving shortly after a car job<R />.
              </li>
              <li>
                <strong className="text-ink">Open the app and pick a garage you can afford.</strong> Prices run from {usd(4000)} to {usd(40000)}<C />.
              </li>
              <li>
                <strong className="text-ink">Or drive to a garage and buy it there.</strong> GameSpot says this works too<R />.
              </li>
              <li>
                <strong className="text-ink">Register a car at the mechanic&apos;s shop and park it.</strong> PowerPyx says each garage spot lets you register one more vehicle<R />. What you can register, and when, is on our <A href="/database/vehicles">vehicles database</A>.
              </li>
            </Steps>
          </section>

          <section aria-labelledby="prices" className="mt-16x">
            <H2 id="prices">All 8 purchasable garages and prices</H2>
            <p className="mt-2x max-w-2xl text-sm text-muted">
              {MATCHING} of the {GARAGES.length} prices match between PowerPyx and GameSpot<C />. The other {conflicts} don&apos;t, so both figures are shown<R />. PowerPyx says each of these holds one vehicle<R />. Areas are GameSpot&apos;s location notes alone, so they are Reported. Check them on our <A href="/map">interactive map</A>.
            </p>
            <div className="mt-4x overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse text-left text-sm text-ink-2">
                <thead>
                  <tr className="border-b border-pink/20">
                    <th className={TH}>Garage</th>
                    <th className={TH}>Price</th>
                    <th className={TH}>Area (GameSpot)</th>
                  </tr>
                </thead>
                <tbody>
                  {GARAGES.map((g) => (
                    <tr key={g.name} className="border-b border-pink/10 align-top">
                      <td className="py-2x pr-4x font-semibold text-ink">{g.name}</td>
                      <td className="py-2x pr-4x">
                        {fmtPrice(g)}
                        {g.powerpyx === g.gamespot ? <C /> : <R />}
                      </td>
                      <td className="py-2x pr-4x">
                        {g.area}
                        <R />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4x max-w-2xl text-ink-2">
              <strong className="text-ink">Total cost:</strong> PowerPyx puts all eight at <strong className="text-ink">{usd(TOTAL_POWERPYX)}</strong>, which is what its own prices add up to<R />. With GameSpot&apos;s two higher prices the same eight come to {usd(TOTAL_GAMESPOT)} (our arithmetic)<R />. Budget for the higher figure until the conflict is settled. Spelling differs too: GameSpot prints &ldquo;Mitchel&rdquo;, and we use PowerPyx&apos;s &ldquo;Mitchell&rdquo;.
            </p>
          </section>

          <section aria-labelledby="free" className="mt-16x">
            <H2 id="free">Free garages from the story</H2>
            <Bullets>
              <B>
                <strong className="text-ink">Port Gellhorn Station Garage.</strong> A mechanic gives it to you as part of the main story, and GameSpot places it north of his auto shop<C />.
              </B>
              <B>
                <strong className="text-ink">Paradise Garage.</strong> GameSpot says Ultimate Edition owners get it free in north-eastern Watson Bay, and that it stores the &rsquo;67 Vapid Dominator Buggy<R />. PowerPyx doesn&apos;t list it.
              </B>
              <B>
                <strong className="text-ink">Three more story garages.</strong> PowerPyx lists three further garages with two or three parking spots each that unlock automatically later in the story<R />. GameSpot separately describes a story garage in Ocean Beach that adds two owned-vehicle slots roughly midway through the game, but doesn&apos;t name it<R />.
              </B>
            </Bullets>
            <div className="mt-4x max-w-2xl">
              <Spoiler label="the later story garages">
                <p className="max-w-2xl text-ink-2">
                  PowerPyx lists <strong className="text-ink">Thompson Court Garage</strong> (2 spots) after the Chapter 4 mission <strong className="text-ink">Company Cars</strong>, and both the <strong className="text-ink">NE 15th Street Garage</strong> (2 spots) and the <strong className="text-ink">Pegassi Residences Garage</strong> (3 spots) after the Chapter 5 mission <strong className="text-ink">Operation Savage Glory</strong><R />. GameSpot says a woman named Valentina sets you up with the Ocean Beach garage, and that Wyman hands over the Paradise Garage<R />.
                </p>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="slots" className="mt-16x">
            <H2 id="slots">How many garages and vehicle slots are there?</H2>
            <p className="mt-2x max-w-2xl text-sm text-muted">The outlets count differently and neither explains the gap, so treat every total below as Reported.</p>
            <Bullets>
              <B>
                <strong className="text-ink">PowerPyx:</strong> 12 garages, 8 to buy and 4 from the story, for up to 18 vehicle slots (16 garage spots plus 2 personal vehicles left parked outside). It says you begin with one garage slot, and that when your slots are full you must sell a car to make room<R />. Its 12 doesn&apos;t include the Ultimate Edition&apos;s Paradise Garage.
              </B>
              <B>
                <strong className="text-ink">GameSpot:</strong> 10 garages it found that you can buy or earn, including Paradise Garage but not the later story garages PowerPyx names. It says you start with four owned-vehicle slots (Jason and Lucia can each own a car), that buying every garage nearly triples that, and that with the full story you can have over a dozen<R />.
              </B>
              <B>
                GameSpot also mentions garages that only appear on the map when the game stores a vehicle for you. You can&apos;t buy those<R />.
              </B>
              <B>
                Our <A href="/database/vehicles">vehicles database</A> carries both starting-slot figures, one from each outlet.
              </B>
            </Bullets>
          </section>

          <section aria-labelledby="unlock" className="mt-16x">
            <H2 id="unlock">What you unlock</H2>
            <Bullets>
              <B>
                <strong className="text-ink">More owned-vehicle slots,</strong> so you can register and keep more stolen cars<C />.
              </B>
              <B>
                <strong className="text-ink">The Little Boxes trophy.</strong> Its in-game wording is &ldquo;Purchase all garage properties&rdquo;, and it is a normal visible trophy, not a hidden one (TrueTrophies, GamesRadar+). GamesRadar+ counts 8 garages and PowerPyx says it means the 8 you buy<C />. PowerPyx also says the free story garages don&apos;t count<R />. See the full <A href="/guides/trophies">trophy list and platinum roadmap</A>.
              </B>
            </Bullets>
          </section>

          <section aria-labelledby="tips" className="mt-16x">
            <H2 id="tips">Tips</H2>
            <Bullets>
              <B>
                <strong className="text-ink">Going for Little Boxes?</strong> All eight purchasable garages count, so the order is up to you. The cheapest are Mitchell Auto Center, Persistence Road and 7th Avenue, and the dearest is Atlantic Court at {usd(40000)}.
              </B>
              <B>
                <strong className="text-ink">Buy near where you play.</strong> Going by GameSpot&apos;s notes, 7th Avenue (by the airport) and Atlantic Court (Ocean Beach) sit on the Vice City side, while Mitchell, Store &lsquo;N&rsquo; Bolt and Wyatt Motors are out in Kelly County and Ambrosia<R />. Compare them on the <A href="/map">map</A>.
              </B>
              <B>
                <strong className="text-ink">Don&apos;t blow your cash early.</strong> Garages are optional and the story hands you free ones later<R />. Our <A href="/guides/money">money guide</A> covers ways to fund them.
              </B>
              <B>
                <strong className="text-ink">Check what&apos;s stored.</strong> GameSpot says your personal vehicles show in the Scooter Bros app, and that the mechanic&apos;s shop or any Pay &lsquo;n&rsquo; Spray shows the cars you have stored<R />.
              </B>
              <B>
                Still collecting cars to fill them? See <A href="/guides/stealing-cars">how stealing cars works</A>.
              </B>
            </Bullets>
          </section>

          <Faq items={GARAGES_FAQ} />

          <SourcesList sources={GARAGES_SOURCES} verified={{ iso: GARAGES_VERIFIED, label: GARAGES_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">The short version</h2>
            <p className="mt-4x text-sm text-ink-2">
              Eight garages to buy, from {usd(4000)} to {usd(40000)}, about {usd(TOTAL_POWERPYX)} to {usd(TOTAL_GAMESPOT)} for the set depending on the outlet. They open partway through the story, and buying all eight earns Little Boxes.
            </p>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">
              Confirmed needs two main outlets. A claim from a single outlet is attributed to it and marked Reported, and where outlets disagree we show both figures.
            </p>
          </div>
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">More guides</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              <li><A href="/database/vehicles">Vehicles database</A></li>
              <li><A href="/guides/stealing-cars">Stealing cars</A></li>
              <li><A href="/guides/money">Money guide</A></li>
              <li><A href="/guides/trophies">Trophies and platinum</A></li>
              <li><A href="/map">Interactive map</A></li>
              <li><A href="/news">GTA 6 news</A></li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/garages" />
    </article>
  );
}
