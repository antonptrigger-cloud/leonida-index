import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { SourcesList } from "@/components/guides/MissionBits";
import { CLOTHES_FAQ, CLOTHES_SOURCES, CLOTHES_VERIFIED, CLOTHES_VERIFIED_LABEL } from "@/lib/guides/change-clothes";

export const metadata = metaFor("/guides/change-clothes");

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

export default function ChangeClothesGuide() {
  return (
    <article>
      <PageSchema path="/guides/change-clothes" breadcrumbs={false} />
      <Breadcrumbs path="/guides/change-clothes" />
      <PageHeader
        backdrop="boat"
        kicker="Guide · Wardrobe, trunk outfits and quick changes"
        title="How to Change Clothes and Save Outfits in GTA 6"
        verified={CLOTHES_VERIFIED_LABEL}
        source="VGC, GamesRadar+, Polygon"
      />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              What Jason and Lucia wear matters more in GTA 6 than in earlier games. VGC says your outfit is tied to how hard the police come after you, so a quick change can help you shake a wanted level. This guide covers where you can change, how to load spare outfits into your personal vehicle, and the small accessory swaps for when you have no time to get home.
            </p>
            <p>
              <strong className="text-turq">Confirmed</strong> means at least two main outlets say so. <strong className="text-orange">Reported</strong> means one outlet does, or the outlets differ, and we name them. ScreenRant isn&apos;t one of our main outlets, so we only use it to back up a main outlet.
            </p>
          </div>

          <section aria-labelledby="where" className="mt-16x">
            <H2 id="where">Where you can change clothes</H2>
            <div className="mt-4x overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse text-left text-sm text-ink-2">
                <thead>
                  <tr className="border-b border-pink/20">
                    <th className={TH}>Place</th>
                    <th className={TH}>What you can do</th>
                    <th className={TH}>Source</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-pink/10 align-top">
                    <td className="py-2x pr-4x font-semibold text-ink">Safehouse wardrobe</td>
                    <td className="py-2x pr-4x">Change into anything you own, and choose which outfits go in your car trunk.</td>
                    <td className="py-2x pr-4x">VGC, Polygon<C /></td>
                  </tr>
                  <tr className="border-b border-pink/10 align-top">
                    <td className="py-2x pr-4x font-semibold text-ink">Your personal vehicle&apos;s trunk</td>
                    <td className="py-2x pr-4x">Swap into an outfit you stored there earlier.</td>
                    <td className="py-2x pr-4x">VGC, Polygon, GamesRadar+<C /></td>
                  </tr>
                  <tr className="border-b border-pink/10 align-top">
                    <td className="py-2x pr-4x font-semibold text-ink">Clothing store or gym changing room</td>
                    <td className="py-2x pr-4x">Change into any clothes you own, not only what the shop sells, and add outfits to the trunk. Polygon says the rooms are usually at the back.</td>
                    <td className="py-2x pr-4x">Polygon<R /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                Clothes you buy or get from missions end up in your safehouse collection (VGC)<R />. One catch from VGC: a piece you take off a pedestrian or an enemy, such as a hat, isn&apos;t saved until you get back to the safehouse<R />.
              </p>
            </div>
          </section>

          <section aria-labelledby="save" className="mt-16x">
            <H2 id="save">How to save an outfit to your trunk</H2>
            <Steps>
              <li>
                <strong className="text-ink">Go to your safehouse wardrobe.</strong> Polygon says a store or gym changing room works too<R />.
              </li>
              <li>
                <strong className="text-ink">Pick the look you want to carry</strong> and choose the option to add it to the trunk from the outfit menu.
              </li>
              <li>
                <strong className="text-ink">Repeat for any other outfits you want on hand.</strong>
              </li>
            </Steps>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                <strong className="text-ink">It isn&apos;t automatic.</strong> VGC says buying new clothes doesn&apos;t put them in the trunk, and you have to save them from the safehouse menu. Polygon likewise says to add outfits to the trunk at a wardrobe or changing room before a job<C />.
              </p>
              <p>
                <strong className="text-ink">How many fit?</strong> Polygon says up to 10 sets, five per character. ScreenRant also says five outfits but doesn&apos;t say per character. VGC and GamesRadar+ give no number, so plan around a small number of looks<R />.
              </p>
            </div>
          </section>

          <section aria-labelledby="car" className="mt-16x">
            <H2 id="car">How to change outfits at your car</H2>
            <Steps>
              <li>
                <strong className="text-ink">Walk to the trunk of your personal vehicle and press Triangle / Y</strong> to open it (GamesRadar+)<R />.
              </li>
              <li>
                <strong className="text-ink">Hold L1 / LB when prompted</strong> to open your loadout (GamesRadar+)<R />.
              </li>
              <li>
                <strong className="text-ink">Press R1 / RB to switch from the Weapons tab to the Items tab.</strong> GamesRadar+ lists an Outfits slot there, next to masks, headwear and eyewear<R />.
              </li>
              <li>
                <strong className="text-ink">Pick one of your saved outfits.</strong> Polygon words the path as loadout, then items, then a saved outfit at the bottom right<C />.
              </li>
            </Steps>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                GamesRadar+ says the same loadout also handles longarms you&apos;ve stored in the trunk<R />. See our <A href="/database/weapons">weapons database</A> for the guns we&apos;ve confirmed.
              </p>
              <p>
                <strong className="text-ink">No car nearby?</strong> Polygon and Push Square both say the Scooter Bros app can deliver your vehicle for a fee that depends on distance and damage<C />. Polygon puts that at a few hundred dollars<R />. Once an outfit is in the trunk, Polygon says you can grab it from any car you own. Our <A href="/guides/garages">garages guide</A> covers vehicle storage.
              </p>
            </div>
          </section>

          <section aria-labelledby="quick" className="mt-16x">
            <H2 id="quick">Quick changes without a wardrobe</H2>
            <Bullets>
              <B>
                <strong className="text-ink">Hats and glasses.</strong> Polygon says to toggle eyewear and headwear from the item wheel. Put them on to look different, or take them off if you wore them during the crime<R />.
              </B>
              <B>
                <strong className="text-ink">Masks.</strong> Polygon advises masking up before a crime and removing the mask afterwards, not the other way round, since putting one on after the fact can look suspicious<R />.
              </B>
              <B>
                <strong className="text-ink">Hair, tattoos and makeup.</strong> Polygon says salons and tattoo shops change Jason&apos;s facial hair and Lucia&apos;s makeup, and notes that a visit takes longer than a hat swap, so it is better for style than for escaping. ScreenRant also mentions barbers<R />.
              </B>
            </Bullets>
          </section>

          <section aria-labelledby="stores" className="mt-16x">
            <H2 id="stores">Finding clothing stores</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                Open the map and look for a T-shirt icon. The outlets disagree on its colour: Polygon calls it pink and ScreenRant calls it black<R />. Polygon adds a blue weight icon for gyms, and says the map legend has a Style section that filters stores by type, such as sportswear or formal, plus hair and beauty and tattoo shops<R />. Check the <A href="/map">interactive map</A> for areas you&apos;ve unlocked.
              </p>
            </div>
          </section>

          <section aria-labelledby="tips" className="mt-16x">
            <H2 id="tips">Tips</H2>
            <Bullets>
              <B>
                <strong className="text-ink">Keep a plain spare outfit in the trunk</strong> before any job that could draw a wanted level. VGC calls an outfit change the quickest way to lower your wanted level<R />.
              </B>
              <B>
                <strong className="text-ink">Change clothes and vehicle together after a getaway.</strong> Our <A href="/guides/wanted">wanted system guide</A> explains what the police track.
              </B>
              <B>
                <strong className="text-ink">Go home now and then</strong> to save any hats or items you picked up in the world, since VGC says they aren&apos;t saved until you do<R />.
              </B>
              <B>
                <strong className="text-ink">Save a keeper to the trunk straight away,</strong> so you don&apos;t forget. That one is our own suggestion.
              </B>
            </Bullets>
          </section>

          <Faq items={CLOTHES_FAQ} />

          <SourcesList sources={CLOTHES_SOURCES} verified={{ iso: CLOTHES_VERIFIED, label: CLOTHES_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">The short version</h2>
            <p className="mt-4x text-sm text-ink-2">
              Save spare outfits to your trunk from the safehouse wardrobe, then swap from the trunk loadout&apos;s Items tab. New clothes don&apos;t go in the trunk on their own.
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
              <li><A href="/guides/wanted">Wanted system</A></li>
              <li><A href="/guides/garages">Garages</A></li>
              <li><A href="/guides/fast-travel">Fast travel</A></li>
              <li><A href="/guides/beginner">Beginner guide</A></li>
              <li><A href="/map">Interactive map</A></li>
              <li><A href="/news">GTA 6 news</A></li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/change-clothes" />
    </article>
  );
}
