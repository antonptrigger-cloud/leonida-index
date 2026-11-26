import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { Spoiler } from "@/components/guides/Spoiler";
import { SourcesList } from "@/components/guides/MissionBits";
import { namesStory } from "@/lib/spoiler-sources";
import {
  AIRCRAFT,
  JOBS,
  PARKED,
  SECRETVEH_FAQ,
  SECRETVEH_SOURCES,
  SECRETVEH_VERIFIED,
  SECRETVEH_VERIFIED_LABEL,
  STARTER,
  SV_COUNTS,
  WYMAN_CARS,
  type VehicleRow,
} from "@/lib/guides/secret-vehicles";

export const metadata = metaFor("/guides/secret-vehicles");

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
const Bullets = ({ children }: { children: React.ReactNode }) => <ul className="mt-4x flex max-w-2xl flex-col gap-3x">{children}</ul>;
const B = ({ children }: { children: React.ReactNode }) => <li className="vc-bar text-ink-2">{children}</li>;
const TH = "py-2x pr-4x text-xs font-bold uppercase tracking-[0.18em] text-muted";

function VehicleTable({ caption, rows }: { caption: string; rows: VehicleRow[] }) {
  return (
    <div className="mt-4x overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm text-ink-2">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-pink/20">
            <th className={TH}>Vehicle</th>
            <th className={TH}>Where</th>
            <th className={TH}>Label</th>
            <th className={TH}>What to know</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.vehicle} className="border-b border-pink/10 align-top">
              <td className="py-2x pr-4x font-semibold text-ink">{r.vehicle}</td>
              <td className="py-2x pr-4x">{r.where}</td>
              <td className="py-2x pr-4x">
                {r.label === "confirmed" ? <C /> : <R />}
                <span className="block text-xs text-muted">{r.by}</span>
              </td>
              <td className="py-2x pr-4x">{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const hiddenSources = SECRETVEH_SOURCES.filter((s) => s.spoiler || namesStory(s.label, s.url, s.used));
const openSources = SECRETVEH_SOURCES.filter((s) => !hiddenSources.includes(s));

export default function SecretVehiclesGuide() {
  return (
    <article>
      <PageSchema path="/guides/secret-vehicles" breadcrumbs={false} />
      <Breadcrumbs path="/guides/secret-vehicles" />
      <PageHeader
        backdrop="boat"
        kicker="Guide · Jets, planes, sports cars and Ultimate Edition rides"
        title="GTA 6 Secret Vehicles: Where to Find Rare Cars and Jets"
        verified={SECRETVEH_VERIFIED_LABEL}
        source="PC Gamer, GameSpot, PowerPyx, Push Square"
      />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <section aria-labelledby="quick">
            <H2 id="quick">Quick answers</H2>
            <Bullets>
              <B>
                <strong className="text-ink">Where&apos;s the jet?</strong>{" "}
                <A href="/map?pin=seed-mile-zero-air-station">Mile Zero Air Station</A>, in the far south-west corner of the map, west of Key Lento<C />.
              </B>
              <B>
                <strong className="text-ink">Where are the free planes?</strong>{" "}
                GameSpot points to <A href="/map?pin=seed-wild-hog-point">Wild Hog Point</A>, west of Port Gellhorn, and PowerPyx to open airstrips<R />.
              </B>
              <B>
                <strong className="text-ink">Is anything kept in a hidden garage?</strong> Not according to our sources. The jets are on a guarded base and the free planes sit at open airfields.
              </B>
              <B>
                <strong className="text-ink">Are the sports cars guaranteed to be there?</strong> No. Push Square found them at set times of day, and says its own list is a work in progress<R />.
              </B>
              <B>
                <strong className="text-ink">Is this every secret vehicle?</strong> No outlet has a full list. PowerPyx counts 557 vehicles in the game<R />.
              </B>
            </Bullets>
          </section>

          <div className="mt-10x max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              GTA 6 keeps some of its best vehicles in plain sight: a combat jet behind a guarded fence, free planes on airstrips, and sports cars parked where a patient thief can find them. This guide lists only vehicles that at least one of our main outlets places on the map: {SV_COUNTS.total} so far, with a location or a way to get each one.
            </p>
            <p>
              <strong className="text-turq">Confirmed</strong> means at least two main outlets say so. <strong className="text-orange">Reported</strong> means one main outlet does, and we name it. Vehicles we couldn&apos;t verify aren&apos;t listed. Several cars here are tied to the story, so those sit inside blurred sections until you ask for them.
            </p>
          </div>

          <section aria-labelledby="aircraft" className="mt-16x">
            <H2 id="aircraft">Jets, tanks and planes</H2>
            <VehicleTable caption="Aircraft and military vehicles" rows={AIRCRAFT} />
            <p className="mt-4x max-w-2xl text-ink-2">
              The Lazer and Rhino can also be spawned by cheat after the story. PowerPyx says the Lazer needs every challenge done and the Rhino every survival challenge<R />. Using a cheat switches off trophies and saving. See our <A href="/guides/cheats">cheats guide</A>.
            </p>
          </section>

          <section aria-labelledby="starter" className="mt-16x">
            <H2 id="starter">Ultimate Edition starter vehicles</H2>
            <VehicleTable caption="Ultimate Edition vehicles at Jason's house" rows={STARTER} />
            <p className="mt-4x max-w-2xl text-ink-2">
              Both turn up in Chapter 1 and are covered in our <A href="/database/vehicles">vehicles database</A>, which also lists what the editions change.
            </p>
          </section>

          <section aria-labelledby="parked" className="mt-16x">
            <H2 id="parked">Sports cars parked around Leonida</H2>
            <p className="mt-4x max-w-2xl text-ink-2">
              These are single-outlet finds from Push Square, which says its list is still a work in progress. Times are Push Square&apos;s in-game times, so a car may not be there at other hours. Check the streets on our <A href="/map">interactive map</A>.
            </p>
            <VehicleTable caption="Sports cars Push Square found parked around Leonida" rows={PARKED} />
            <div className="mt-4x max-w-2xl">
              <Spoiler label="the story behind these sports cars">
                <div className="space-y-3x text-ink-2">
                  <p>
                    These ten are on a delivery list run by <strong className="text-ink">Randy</strong>, a vehicle fence in Balsero who opens up in Chapter 3. You take them with the <strong className="text-ink">Key Cloner</strong>, which you get during the Chapter 3 mission <strong className="text-ink">Clonin&apos; Keys, Makin&apos; GS (Steal the Zorrusso for Randy)</strong>. PowerPyx says the list can be finished after the story, and that a car delivered in good condition pays more<R />.
                  </p>
                  <ul className="flex flex-col gap-2x">
                    <li>
                      <strong className="text-ink">List size depends on who you ask.</strong> Push Square counts 22 cars, and says it has found 10 so far. PowerPyx&apos;s trophy guide counts 16 and its money guide 18. Don&apos;t treat any of them as complete<R />.
                    </li>
                    <li>
                      <strong className="text-ink">Trackers.</strong> Push Square says the Infernus, Mamba GT and Paragon carry trackers, so keep your speed up on the way to Randy<R />. PowerPyx says the mission car has an advanced tracker, shown by a red icon that fills if you drive too slowly and greys out near Randy&apos;s showroom<R />.
                    </li>
                    <li>
                      <strong className="text-ink">Mamba GT.</strong> Push Square says it wasn&apos;t on the original list and gets added by a later mission (¡Dale Mamba!) once you&apos;ve delivered some cars. You also need the key from a bowl behind the sofa, which you can reach with the Snap Gun<R />. PowerPyx separately lists a &rsquo;64 Mamba GT among Wyman&apos;s cars (below), so don&apos;t assume they&apos;re the same car.
                    </li>
                    <li>
                      <strong className="text-ink">Toros.</strong> The residential building is the Pegassi Residences (Push Square). The same building holds the Ultimate Edition Cheetah late in the story<R />.
                    </li>
                    <li>
                      <strong className="text-ink">Granforma Zorrusso.</strong> It&apos;s the first car on the list and comes from the mission itself. PowerPyx puts it on the ground level, east side, of the walled parking garage at the Hathaway Apartments in Ocean Beach, and says you can climb the wall<R />. PC Gamer also names the Zorrusso mission, so the car is confirmed to exist, but the location is one outlet&apos;s.
                    </li>
                  </ul>
                </div>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="jobs" className="mt-16x">
            <H2 id="jobs">Cars tied to the early story</H2>
            <p className="mt-4x max-w-2xl text-ink-2">
              A run of stolen-car jobs sends you to named cars around Kelly County and nearby. Because they&apos;re tied to the story, everything about them stays blurred until you reveal it.
            </p>
            <div className="mt-4x max-w-2xl">
              <Spoiler label="the early-story car jobs">
                <div className="space-y-3x text-ink-2">
                  <p>
                    <strong className="text-ink">Moses</strong>, a mechanic in Port Gellhorn, sends you after cars from the Chapter 2 mission <strong className="text-ink">Moses (Take A Vehicle to Moses)</strong>. PowerPyx and Push Square agree on every car below, so each is <strong className="text-turq">Confirmed</strong>. Cars go back to his shop. PowerPyx says each pays a fixed reward plus a bonus for good condition, and that delivering them all unlocks a gift<R />.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[34rem] border-collapse text-left text-sm text-ink-2">
                      <caption className="sr-only">Moses&apos; stolen-car jobs</caption>
                      <thead>
                        <tr className="border-b border-pink/20">
                          <th className={TH}>Car</th>
                          <th className={TH}>Where</th>
                          <th className={TH}>What to know</th>
                        </tr>
                      </thead>
                      <tbody>
                        {JOBS.map((j) => (
                          <tr key={j.car} className="border-b border-pink/10 align-top">
                            <td className="py-2x pr-4x font-semibold text-ink">{j.car}</td>
                            <td className="py-2x pr-4x">{j.where}</td>
                            <td className="py-2x pr-4x">{j.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p>
                    Push Square counts seven jobs including the Crawler. PowerPyx counts the Crawler and six follow-ups. They name the same seven cars.
                  </p>
                </div>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="ue-story" className="mt-16x">
            <H2 id="ue-story">Ultimate Edition vehicles unlocked through the story</H2>
            <div className="mt-4x max-w-2xl">
              <Spoiler label="the story-unlocked Ultimate Edition vehicles">
                <ul className="flex flex-col gap-3x text-ink-2">
                  <li>
                    <strong className="text-ink">&rsquo;67 Vapid Dominator Buggy.</strong> Claimed in Chapter 2 through <strong className="text-ink">Wyman</strong>. GameSpot says you visit the Mud Club track with him. PowerPyx says it&apos;s inside a garage in Grassrivers, Mariana County, marked with a purple icon shortly after a Chapter 2 mission. It then goes into your garages<C />.
                  </li>
                  <li>
                    <strong className="text-ink">&rsquo;55 Vapid Stanier.</strong> PowerPyx says it&apos;s parked on a roadside in Ocean Beach, with a purple icon after a Chapter 3 mission. GameSpot&apos;s Ultimate Edition guide doesn&apos;t mention it<R />.
                  </li>
                  <li>
                    <strong className="text-ink">&rsquo;95 Grotti Cheetah.</strong> Chapter 5. PowerPyx says it&apos;s in the Pegassi Residences underground parking, left of the lobby entrance. GameSpot agrees it unlocks through that building<C />.
                  </li>
                  <li>
                    <strong className="text-ink">Shitzu Squalo.</strong> A custom boat with a weapons crate, docked at Washington Beach and only available in Chapter 4 (GameSpot, PowerPyx)<C />.
                  </li>
                  <li>
                    <strong className="text-ink">Wyman&apos;s rebuild cars.</strong> After the buggy, PowerPyx says a Wyman questline unlocks {WYMAN_CARS.join(", ")}. GameSpot confirms Wyman asks you to bring abandoned classic cars to restore<R />. Neither says where the wrecks are, so we give no locations.
                  </li>
                </ul>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="tips" className="mt-16x">
            <H2 id="tips">Tips</H2>
            <Bullets>
              <B>
                <strong className="text-ink">Save by hand before you go for a jet.</strong> Mile Zero starts a fight quickly, and PowerPyx says there&apos;s no mission replay and recommends manual saves<R />. See our <A href="/guides/saving">saving guide</A>.
              </B>
              <B>
                <strong className="text-ink">Use the crop-dusters for free flying.</strong> PowerPyx says the faster jets carry advanced trackers that send fighter jets after you<R />.
              </B>
              <B>
                <strong className="text-ink">Stay low and out of restricted airspace</strong> in the Wild Hog Point planes. GameSpot says restricted airspace is a quick route to a six-star wanted level<R />. See our <A href="/guides/wanted">wanted system guide</A> for how to shake the police.
              </B>
              <B>
                <strong className="text-ink">Don&apos;t count on a parked car being there at every hour.</strong> Push Square&apos;s times are in-game times, so come back at a different time of day if one is missing<R />.
              </B>
              <B>
                <strong className="text-ink">Need somewhere to keep a car you take?</strong> Our <A href="/guides/garages">garages guide</A> covers prices and slots, and our <A href="/guides/stealing-cars">stealing cars guide</A> covers the theft side.
              </B>
            </Bullets>
          </section>

          <Faq items={SECRETVEH_FAQ} />

          <SourcesList sources={openSources} verified={{ iso: SECRETVEH_VERIFIED, label: SECRETVEH_VERIFIED_LABEL }} />
          {hiddenSources.length > 0 ? (
            <div className="mt-6x max-w-2xl">
              <Spoiler label="more sources (the titles and addresses name story people and missions)">
                <ol className="flex flex-col gap-3x text-sm">
                  {hiddenSources.map((s) => (
                    <li key={s.url} className="vc-bar">
                      <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="text-blue hover:text-pink">
                        {s.label}
                      </a>
                      <span className="block text-xs text-muted">{s.used}</span>
                    </li>
                  ))}
                </ol>
              </Spoiler>
            </div>
          ) : null}
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">The short version</h2>
            <p className="mt-4x text-sm text-ink-2">
              The Lazer jet is at Mile Zero Air Station, free planes sit at open airstrips, and ten sports cars have been found parked around Vice City and nearby. {SV_COUNTS.confirmed} vehicles here are Confirmed and {SV_COUNTS.reported} are Reported.
            </p>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">
              Confirmed needs two main outlets. A claim from a single outlet is attributed to it and marked Reported. A vehicle no main outlet locates isn&apos;t listed.
            </p>
          </div>
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">More guides</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              <li><A href="/database/vehicles">Vehicles database</A></li>
              <li><A href="/guides/stealing-cars">Stealing cars</A></li>
              <li><A href="/guides/garages">Garages</A></li>
              <li><A href="/guides/cheats">Cheats and codes</A></li>
              <li><A href="/guides/wanted">Wanted system</A></li>
              <li><A href="/map">Interactive map</A></li>
              <li><A href="/news">GTA 6 news</A></li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/secret-vehicles" />
    </article>
  );
}
