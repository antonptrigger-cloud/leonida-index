import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { Spoiler } from "@/components/guides/Spoiler";
import { SourcesList } from "@/components/guides/MissionBits";
import { FASTTRAVEL_FAQ, FASTTRAVEL_SOURCES, FASTTRAVEL_VERIFIED, FASTTRAVEL_VERIFIED_LABEL } from "@/lib/guides/fast-travel";

export const metadata = metaFor("/guides/fast-travel");

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

export default function FastTravelGuide() {
  return (
    <article>
      <PageSchema path="/guides/fast-travel" breadcrumbs={false} />
      <Breadcrumbs path="/guides/fast-travel" />
      <PageHeader
        backdrop="boat"
        kicker="Guide · RydeMe, taxis and public transport"
        title="GTA 6 Fast Travel: RydeMe, Taxis and Skipping Rides"
        verified={FASTTRAVEL_VERIFIED_LABEL}
        source="VGC, GamesRadar+, Push Square"
      />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              Leonida is huge, and there is no free teleport on the map. What GTA 6 gives you instead are paid rides you can skip: the RydeMe app, a taxi number and public transport. This page explains how each one works, what skipping costs and when it&apos;s cheaper to drive.
            </p>
            <p>
              <strong className="text-turq">Confirmed</strong> means at least two main outlets say so. <strong className="text-orange">Reported</strong> means one outlet does, or the outlets disagree, and we name them.
            </p>
          </div>

          <section aria-labelledby="is-there" className="mt-16x">
            <H2 id="is-there">Is there fast travel in GTA 6?</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                <strong className="text-ink">Not in the classic sense.</strong> Push Square says there is no traditional fast travel, and VGC calls RydeMe the only way to traditionally fast travel<C />. In practice you book a ride and then pay extra to skip the journey, which drops you at your destination straight away.
              </p>
              <p>
                GamesRadar+ counts three paid options: Paradise Taxi, RydeMe, and buses and trains<R />.
              </p>
            </div>
          </section>

          <section aria-labelledby="unlock" className="mt-16x">
            <H2 id="unlock">How to unlock RydeMe</H2>
            <Bullets>
              <B>
                <strong className="text-ink">You need a BuckMe account first.</strong> VGC says the app requires a bank account and is added to your phone automatically once you have one. GamesRadar+ says RydeMe fares are taken from your BuckMe account<C />. Our <A href="/guides/missions/buck-me">Buck Me mission guide</A> covers how you get it.
              </B>
              <B>
                <strong className="text-ink">When exactly? The outlets disagree.</strong> VGC says RydeMe unlocks during the Chapter 1 mission Buck Me, since that is where you get the bank account. GamesRadar+ puts RydeMe in a later chapter. Push Square doesn&apos;t date the app, but says the BuckMe bank unlocks as part of Chapter 1<R />. If it isn&apos;t on your phone after Buck Me, keep playing the story.
              </B>
            </Bullets>
            <div className="mt-4x max-w-2xl">
              <Spoiler label="GamesRadar+'s later unlock date">
                <p className="max-w-2xl text-ink-2">
                  GamesRadar+ says you are given access to RydeMe in <strong className="text-ink">Chapter 2</strong><R />.
                </p>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="how" className="mt-16x">
            <H2 id="how">How to fast travel with RydeMe, step by step</H2>
            <Steps>
              <li>
                <strong className="text-ink">Have a destination ready.</strong> Push Square says you need an active waypoint, which you can pick inside the app or in advance on the map (Touch Pad on PS5)<R />.
              </li>
              <li>
                <strong className="text-ink">Open your phone with Up on the D-pad and choose RydeMe.</strong> VGC, Push Square and GamesRadar+ all describe this<C />.
              </li>
              <li>
                <strong className="text-ink">Pick where to go.</strong> VGC lists your current safehouse, your map marker, or a new destination chosen on the map. GamesRadar+ names the safehouse and a custom destination<C />.
              </li>
              <li>
                <strong className="text-ink">Book the ride.</strong> Watch the minimap, which shows where the driver is if they don&apos;t pull up in front of you (VGC and Push Square)<C />.
              </li>
              <li>
                <strong className="text-ink">Get in.</strong> You can sit back and ride there in real time.
              </li>
              <li>
                <strong className="text-ink">Or skip the trip.</strong> Hold L2 / LT to focus on the driver, then use Triangle / Y to skip and arrive at once (Push Square and GamesRadar+). Push Square words it as holding Triangle<C />.
              </li>
            </Steps>
          </section>

          <section aria-labelledby="cost" className="mt-16x">
            <H2 id="cost">How much does skipping cost?</H2>
            <Bullets>
              <B>
                <strong className="text-ink">$100 extra.</strong> VGC, GamesRadar+ and Push Square all give $100 for skipping, on top of the normal fare<C />.
              </B>
              <B>
                <strong className="text-ink">Longer trips cost more.</strong> Push Square says longer journeys cost more than short ones, but calls fast travelling this way relatively inexpensive overall<R />.
              </B>
              <B>
                <strong className="text-ink">A discount comes later.</strong> GamesRadar+ says a BuckMe Premium account you can sign up for further into the story includes 20% off RydeMe journeys<R />.
              </B>
            </Bullets>
            <div className="mt-4x max-w-2xl">
              <Spoiler label="when BuckMe Premium opens">
                <p className="max-w-2xl text-ink-2">
                  GamesRadar+ says the chance to sign up for BuckMe Premium arrives in <strong className="text-ink">Chapter 3</strong><R />.
                </p>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="other" className="mt-16x">
            <H2 id="other">Other ways to get around quickly</H2>
            <Bullets>
              <B>
                <strong className="text-ink">Paradise Taxi.</strong> GamesRadar+ says a story mission early in Chapter 1 gives you the taxi&apos;s number, which you can call from Contacts on your phone. It takes pocket cash rather than your bank balance, and you can skip the ride the same way for an extra $100<R />. That makes it the option to try before you have a BuckMe account, as long as you&apos;re carrying cash.
              </B>
              <B>
                <strong className="text-ink">Buses and trains.</strong> These don&apos;t come on demand. You wait at a stop or station, board, set a destination on the route and can hold Triangle / Y to skip the trip (GamesRadar+)<R />.
              </B>
              <B>
                <strong className="text-ink">Finding what&apos;s close.</strong> Hold Down on the D-pad. GamesRadar+ says it shows nearby stops, and Push Square says it shows nearby shops, waypoints and story missions that you can set a GPS route to with R3<C />.
              </B>
              <B>
                <strong className="text-ink">Calling your own car to you.</strong> Push Square says the Scooter Bros app delivers one of your cars to a nearby spot, for a fee based on the distance and the car&apos;s condition<R />. That isn&apos;t fast travel, but it saves the walk back.
              </B>
            </Bullets>
          </section>

          <section aria-labelledby="tips" className="mt-16x">
            <H2 id="tips">Tips</H2>
            <Bullets>
              <B>
                <strong className="text-ink">Mind cash versus bank money.</strong> RydeMe charges your BuckMe account and Paradise Taxi takes pocket cash (GamesRadar+)<R />. If one won&apos;t go through, try the other. That second part is our own suggestion.
              </B>
              <B>
                <strong className="text-ink">Remote spots can cancel your ride.</strong> VGC says RydeMe cancels the booking if a car can&apos;t reach you<R />. Walk to a road first.
              </B>
              <B>
                <strong className="text-ink">Short hops are cheaper by car.</strong> Skipping always adds money, so driving yourself is the free option for nearby jobs. Our <A href="/guides/stealing-cars">stealing cars guide</A> covers getting a ride fast, and our <A href="/guides/money">money guide</A> covers earning the fare.
              </B>
              <B>
                <strong className="text-ink">Plan routes on the map.</strong> The <A href="/map">interactive map</A> helps you pick a waypoint before you book. New to Leonida? Start with our <A href="/guides/beginner">beginner guide</A>.
              </B>
            </Bullets>
          </section>

          <Faq items={FASTTRAVEL_FAQ} />

          <SourcesList sources={FASTTRAVEL_SOURCES} verified={{ iso: FASTTRAVEL_VERIFIED, label: FASTTRAVEL_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">The short version</h2>
            <p className="mt-4x text-sm text-ink-2">
              No free teleport. Book a RydeMe, hold L2 / LT on the driver and skip the ride for $100 extra. Paradise Taxi takes cash, and buses and trains can be skipped too.
            </p>
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
              <li><A href="/guides/missions/buck-me">Buck Me mission guide</A></li>
              <li><A href="/guides/money">Money guide</A></li>
              <li><A href="/guides/stealing-cars">Stealing cars</A></li>
              <li><A href="/map">Interactive map</A></li>
              <li><A href="/news">GTA 6 news</A></li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/fast-travel" />
    </article>
  );
}
