import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { SourcesList } from "@/components/guides/MissionBits";
import {
  CROSSINGS,
  MAPSIZE_FAQ,
  MAPSIZE_SOURCES,
  MAPSIZE_VERIFIED,
  MAPSIZE_VERIFIED_LABEL,
  ROCKSTAR_CLAIMS,
} from "@/lib/guides/map-size";

export const metadata = metaFor("/guides/map-size");

const R = () => (
  <span className="ml-1x whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-orange" title="One outlet's figure or test. Not confirmed by Rockstar.">
    Reported
  </span>
);
const C = () => (
  <span className="ml-1x whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-turq" title="A Rockstar comparison carried by two main outlets.">
    Confirmed
  </span>
);
const E = () => (
  <span className="ml-1x whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-pink" title="Our own arithmetic on a published figure. Not from any outlet or from Rockstar.">
    Our estimate
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

export default function MapSizeGuide() {
  return (
    <article>
      <PageSchema path="/guides/map-size" breadcrumbs={false} />
      <Breadcrumbs path="/guides/map-size" />
      <PageHeader
        backdrop="boat"
        kicker="Guide · Rockstar's comparisons and the measured numbers"
        title="GTA 6 Map Size"
        verified={MAPSIZE_VERIFIED_LABEL}
        source="PowerPyx, Kotaku, GameSpot, VGC, PC Gamer, GamesRadar+"
      />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              Everyone wants to know how big Leonida is, and the honest answer is that it depends on who is measuring and what they count. Rockstar has only ever described the world by comparing it with its older games. Since launch, one guide site has put a number on the in-game map and one outlet has timed how long it takes to cross.
            </p>
            <p>
              This page sets each figure side by side and says where it came from. It has no story or mission details. <strong className="text-turq">Confirmed</strong> means a Rockstar comparison carried by two main outlets. <strong className="text-orange">Reported</strong> means a single outlet&apos;s own figure or test.
            </p>
          </div>

          <section aria-labelledby="quick" className="mt-16x">
            <H2 id="quick">The short answer</H2>
            <ul className="mt-4x flex max-w-2xl flex-col gap-3x">
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Rockstar&apos;s comparisons:</strong> about twice GTA V&apos;s map, three times RDR2&apos;s playable area, and a total landmass close to GTA IV, GTA V and RDR2 combined<C />
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Measured in the released game:</strong> PowerPyx gives about 175 km² (67.5 sq mi), roughly 16 km tall by 10.9 km wide, with around 35% of it water<R />
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Timed crossing:</strong> Kotaku drove the highways from the southern tip to the northern edge in 10 min 53 s<R />
              </li>
            </ul>
          </section>

          <section aria-labelledby="rockstar" className="mt-16x">
            <H2 id="rockstar">What Rockstar has said</H2>
            <p className="mt-2x max-w-2xl text-sm text-muted">
              Rockstar hasn&apos;t published an area in square kilometres or miles in anything we could find. These are comparisons, relayed by outlets.
            </p>
            <div className="mt-4x overflow-x-auto">
              <table className="w-full min-w-[40rem] border-collapse text-left text-sm text-ink-2">
                <thead>
                  <tr className="border-b border-pink/20">
                    <th className={TH}>Claim</th>
                    <th className={TH}>Who said it</th>
                    <th className={TH}>Carried by</th>
                    <th className={TH}>Label</th>
                  </tr>
                </thead>
                <tbody>
                  {ROCKSTAR_CLAIMS.map((c) => (
                    <tr key={c.claim} className="border-b border-pink/10 align-top">
                      <td className="py-2x pr-4x font-semibold text-ink">{c.claim}</td>
                      <td className="py-2x pr-4x">{c.from}</td>
                      <td className="py-2x pr-4x text-xs text-muted">{c.outlets}</td>
                      <td className="py-2x pr-4x">{c.status === "confirmed" ? <C /> : <R />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3x max-w-2xl text-sm text-muted">
              None of these says whether sea, the waters around the Keys or airspace is counted, so read them as Rockstar&apos;s shorthand for scale rather than a measurement.
            </p>
          </section>

          <section aria-labelledby="measured" className="mt-16x">
            <H2 id="measured">What outlets have measured since launch</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                <strong className="text-ink">PowerPyx: about 175 km².</strong> In its full world-map post (18 Nov), PowerPyx lists the whole map at 175 km², or 67.5 square miles, which it describes as 16 km high by 10.9 km wide. It says the map is roughly 35% water and 65% land, and doesn&apos;t explain how it measured<R />.
              </p>
              <p>
                <strong className="text-ink">Our own arithmetic.</strong> 16 km × 10.9 km comes to about 174 km², so PowerPyx&apos;s total looks like the full rectangle around the map, sea included. Applying its own 65% land share to 175 km² gives roughly 113 to 114 km² of land. That land figure is our estimate, not something PowerPyx or any other outlet publishes, and it is only as good as PowerPyx&apos;s starting numbers<E />.
              </p>
              <p>
                We found no separate area measurement of the released map at PC Gamer, IGN, GameSpot, GamesRadar+, Push Square or VGC when we checked, so 175 km² rests on PowerPyx alone for now.
              </p>
            </div>

            <h3 className="vc-display mt-8x text-2xl text-ink">Kotaku&apos;s timed crossings<R /></h3>
            <p className="mt-2x max-w-2xl text-sm text-muted">
              Zack Zwiezen crossed from the southernmost reachable land to the far north (18 Nov). Other routes and faster cars will give other times.
            </p>
            <div className="mt-4x overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse text-left text-sm text-ink-2">
                <thead>
                  <tr className="border-b border-pink/20">
                    <th className={TH}>How</th>
                    <th className={TH}>Time</th>
                    <th className={TH}>Kotaku&apos;s note</th>
                  </tr>
                </thead>
                <tbody>
                  {CROSSINGS.map((c) => (
                    <tr key={c.how} className="border-b border-pink/10 align-top">
                      <td className="py-2x pr-4x font-semibold text-ink">{c.how}</td>
                      <td className="py-2x pr-4x whitespace-nowrap">{c.time}</td>
                      <td className="py-2x pr-4x text-xs text-muted">{c.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3x max-w-2xl text-sm text-muted">
              Kotaku says Jason and Lucia have a stamina bar and move a little slower than GTA V&apos;s leads, which stretches the on-foot times compared with GTA V.
            </p>
          </section>

          <section aria-labelledby="why" className="mt-16x">
            <H2 id="why">Why the numbers don&apos;t line up</H2>
            <ol className="mt-4x flex max-w-2xl list-decimal flex-col gap-3x pl-6x text-ink-2 marker:font-bold marker:text-pink">
              <li>
                <strong className="text-ink">They measure different things.</strong> &ldquo;Twice GTA V&rdquo; is a ratio. 175 km² is a full map frame with a lot of sea in it. A land-only figure will always be smaller.
              </li>
              <li>
                <strong className="text-ink">The baselines vary.</strong> Published sizes for GTA V and RDR2 depend on whether water counts, so any &ldquo;times bigger&rdquo; sum is only as solid as the number it starts from.
              </li>
              <li>
                <strong className="text-ink">Size isn&apos;t density.</strong> Rockstar keeps pointing to interiors and detail rather than area. Kotaku makes the same point: the crossing times don&apos;t capture the buildings, underwater spots and wilderness off the main roads<R />.
              </li>
            </ol>
          </section>

          <section aria-labelledby="check" className="mt-16x">
            <H2 id="check">How to get a feel for it yourself</H2>
            <ol className="mt-4x flex max-w-2xl list-decimal flex-col gap-3x pl-6x text-ink-2 marker:font-bold marker:text-pink">
              <li>Open the in-game map and zoom all the way out to see Leonida from the Keys in the south to the far north.</li>
              <li>Rockstar has now released a printable map of Leonida: the <a href="https://www.rockstargames.com/VI/downloads" className="text-orange hover:text-pink" target="_blank" rel="noopener">Leonida Map &amp; Cover Art Poster</a> on its downloads page, listed as the official game map (checked 20 Nov). Its legend includes a scale bar, but we haven&apos;t used it to work out an area, and we still haven&apos;t found an area figure in km² or miles from Rockstar. This page will be updated if one turns up.</li>
              <li>To see the official map with places pinned on it, use our <A href="/map">interactive map</A>, which now uses Rockstar&apos;s poster as its base. Map © Rockstar Games.</li>
              <li>To compare with GTA V, time a highway drive from the southern tip to the northern edge in a fast car, and set it against Kotaku&apos;s 10 min 53 s.</li>
            </ol>
          </section>

          <section aria-labelledby="tips" className="mt-16x">
            <H2 id="tips">Tips</H2>
            <ul className="mt-4x flex max-w-2xl flex-col gap-4x">
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Fly the long hauls.</strong> On Kotaku&apos;s test a prop plane crossed in roughly half the highway driving time<R />.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Expect roads at first on a trip north.</strong> Kotaku says the southern islands are linked by highway and he had to stick to them for the first stretch on foot<R />.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Sprinting runs out.</strong> Kotaku says the stamina bar limits full-speed running, so long trips on foot are slow<R />.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Exploring for collectibles?</strong> Our <A href="/guides/collectibles">collectibles guide</A> shows which ones the trophies actually need.
              </li>
            </ul>
          </section>

          <Faq items={MAPSIZE_FAQ} />

          <SourcesList sources={MAPSIZE_SOURCES} verified={{ iso: MAPSIZE_VERIFIED, label: MAPSIZE_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">The numbers that matter</h2>
            <p className="mt-4x text-sm text-ink-2">About 2× GTA V and 3× RDR2 (Rockstar). About 175 km² including water (PowerPyx). 10 min 53 s to drive south to north (Kotaku).</p>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">
              A Rockstar comparison is Confirmed only when two main outlets carry it. Measurements and tests from one outlet are attributed to it and marked Reported. Our own arithmetic is marked as ours.
            </p>
          </div>
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">More guides</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              <li><A href="/guides/collectibles">Collectibles</A></li>
              <li><A href="/guides/activities">Activities</A></li>
              <li><A href="/guides/missions">All missions in order</A></li>
              <li><A href="/map">Interactive map</A></li>
              <li><A href="/news">GTA 6 news</A></li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/map-size" />
    </article>
  );
}
