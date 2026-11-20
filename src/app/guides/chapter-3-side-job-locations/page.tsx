import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { Spoiler } from "@/components/guides/Spoiler";
import { SourcesList, SpoilerWarning } from "@/components/guides/MissionBits";
import {
  SIDEJOBS_FAQ,
  SIDEJOBS_PATH,
  SIDEJOBS_ROWS,
  SIDEJOBS_SOURCES,
  SIDEJOBS_VERIFIED,
  SIDEJOBS_VERIFIED_LABEL,
} from "@/lib/guides/sidejobs";

export const metadata = metaFor(SIDEJOBS_PATH);

const R = () => (
  <span className="ml-1x whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-orange" title="One outlet's report, or outlets that disagree. Not confirmed by Rockstar or by a second main outlet.">
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
const Bullets = ({ children }: { children: React.ReactNode }) => <ul className="mt-4x flex max-w-2xl flex-col gap-3x">{children}</ul>;
const B = ({ children }: { children: React.ReactNode }) => <li className="vc-bar text-ink-2">{children}</li>;

export default function SideJobLocations() {
  return (
    <article>
      <PageSchema path={SIDEJOBS_PATH} breadcrumbs={false} />
      <Breadcrumbs path={SIDEJOBS_PATH} />
      <PageHeader
        backdrop="boat"
        kicker="Guide · Chapter 3 side job"
        title="Chapter 3 Side Job Locations and Pay in GTA 6"
        verified={SIDEJOBS_VERIFIED_LABEL}
        source="PowerPyx, Push Square, PC Gamer"
      />

      <SpoilerWarning>
        This guide covers a Chapter 3 side job. Its name, the people involved and the district-by-district list stay blurred until you reveal them.
      </SpoilerWarning>

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              This isn&apos;t one linear mission. It&apos;s a hunt: a set of hidden sites spread around the city that you find and wreck one at a time, with a cash payment for each. PowerPyx says it opens straight after Chapter 3, Mission 8, and that the sites stay available after the story, so there&apos;s no rush. This guide explains how the search areas work, how to clear a site without getting caught in the blast, and what each one pays. The location list is blurred because it&apos;s tied to the story.
            </p>
            <p>
              <strong className="text-orange">Reported</strong> means one outlet says so and we name it. Everything here about the sites comes from PowerPyx alone.
            </p>
          </div>

          <section aria-labelledby="order" className="mt-16x">
            <H2 id="order">Is it a story mission?</H2>
            <p className="mt-4x max-w-2xl text-ink-2">
              Outlets disagree<R />. Push Square lists it as Chapter 3 #9 of its story missions. PC Gamer&apos;s list has no such entry and puts a different mission at #9. PowerPyx files it as a side questline, not a main mission. It lists it among its Strangers &amp; Freaks questlines but marks it as not counting toward the Strangers &amp; Freaks trophy. We treat it as a side job, so it isn&apos;t part of the numbered mission chain on our <A href="/guides/missions">missions hub</A>. You can read the mission that opens it in our <A href="/guides/missions/chapter-3-mission-8">Chapter 3 Mission 8 guide</A>.
            </p>
          </section>

          <section aria-labelledby="quick" className="mt-16x">
            <H2 id="quick">Quick answers</H2>
            <Bullets>
              <B>
                <strong className="text-ink">How many sites?</strong> PowerPyx says 14, but it describes only 13, so our list has 13<R />.
              </B>
              <B>
                <strong className="text-ink">How much does each pay?</strong> $2,000 or $2,500 a site<R />. The 13 described sites add up to $30,500, which is our own sum of PowerPyx&apos;s figures.
              </B>
              <B>
                <strong className="text-ink">Can I miss any?</strong> PowerPyx says they&apos;re not missable and can still be cleared in free roam after the story<R />.
              </B>
            </Bullets>
          </section>

          <section aria-labelledby="how" className="mt-16x">
            <H2 id="how">How it works</H2>
            <p className="mt-4x max-w-2xl text-ink-2">
              All of this comes from PowerPyx<R />.
            </p>
            <Bullets>
              <B>
                <strong className="text-ink">Search areas.</strong> Each site shows on the map as a purple search area rather than an exact marker. Inside it, look for the building the pink gas is coming from.
              </B>
              <B>
                <strong className="text-ink">Getting locations.</strong> Your contacts in the questline can give you locations, and keep giving you more over time if you ask. You don&apos;t have to wait: you can go to the places yourself and clear them without being told first.
              </B>
              <B>
                <strong className="text-ink">Clearing a site.</strong> Destroy the equipment inside with fire or explosives. PowerPyx says most sites have propane or gas canisters you can shoot, or you can throw a molotov into the main room through the doorway from outside.
              </B>
              <B>
                <strong className="text-ink">People inside.</strong> Some sites have workers who normally attack on sight. If you manage to hold one up, they sometimes give you another location.
              </B>
              <B>
                <strong className="text-ink">Pay.</strong> $2,000 or $2,500 per site, paid to you by in-game payment (BuckMe) after you destroy a site.
              </B>
              <B>
                <strong className="text-ink">Tracking.</strong> There&apos;s no in-game way to check which sites you&apos;ve cleared. A cleared site stays destroyed and the building generally looks burnt when you go back.
              </B>
              <B>
                <strong className="text-ink">No deadline.</strong> PowerPyx says the sites are not missable and can still be destroyed in free roam after the story.
              </B>
            </Bullets>
          </section>

          <section aria-labelledby="story" className="mt-16x">
            <H2 id="story">Name, premise and where it starts</H2>
            <div className="mt-4x">
              <Spoiler label="Name, premise and where it starts">
                <div className="max-w-2xl space-y-3x text-ink-2">
                  <p>
                    PowerPyx lists this as Take Out Kitty Litter (Kitty Litter Labs), part of Tyrone&apos;s side questline, and says finding and destroying the labs is required for that questline<R />. Push Square lists &ldquo;Kitty Litter Labs&rdquo; at Chapter 3 #9. PC Gamer has no labs entry and lists Car Services at #9.
                  </p>
                  <p>
                    Chapter 3, Mission 8 (Here, Kitty Kitty) furthers the Kitty Litter storyline. PowerPyx says that after it you are prompted to destroy the labs where Kitty Litter is made while finding out where it originates, and that the first lab you are prompted to destroy comes straight after that mission<R />.
                  </p>
                  <p>
                    Once you have destroyed enough labs and gathered enough information, PowerPyx says you are prompted to start a follow-up mission in which you help destroy the main lab<R />.
                  </p>
                </div>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="locations" className="mt-16x">
            <H2 id="locations">All reported site locations</H2>
            <p className="mt-4x max-w-2xl text-ink-2">
              PowerPyx says there are 14 sites but describes only 13. Our list follows those 13, grouped by district, in our own words. The in-game map shows each one as a search area<R />.
            </p>
            <div className="mt-4x">
              <Spoiler label="Site locations by district">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[40rem] text-left text-sm text-ink-2">
                    <thead>
                      <tr className="text-xs uppercase tracking-[0.15em] text-muted">
                        <th className="py-2x pr-4x">District</th>
                        <th className="py-2x pr-4x">Where to look</th>
                        <th className="py-2x pr-4x">Pay</th>
                        <th className="py-2x">Watch out for</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SIDEJOBS_ROWS.map((r) => (
                        <tr key={r.where} className="border-t border-pink/20 align-top">
                          <td className="py-2x pr-4x font-semibold text-ink">{r.where}</td>
                          <td className="py-2x pr-4x">{r.look}</td>
                          <td className="py-2x pr-4x whitespace-nowrap">{r.pay}</td>
                          <td className="py-2x">{r.watch}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3x text-sm text-muted">
                  The 13 listed payments add up to $30,500. That total is our own sum of PowerPyx&apos;s figures, not a number from PowerPyx. The 14th site isn&apos;t described yet. <R />
                </p>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="tips" className="mt-16x">
            <H2 id="tips">Tips</H2>
            <Bullets>
              <B>
                <strong className="text-ink">Bring fire or explosives.</strong> PowerPyx says canisters inside most sites do the job, and a molotov thrown from the doorway works too<R />. Carrying a few molotovs as a backup is our own suggestion.
              </B>
              <B>
                <strong className="text-ink">Hang back at the door.</strong> PowerPyx warns that at a few sites the people inside can set the place alight as soon as you break in or shoot them, so give it a moment before you go through<R />.
              </B>
              <B>
                <strong className="text-ink">Question before you burn.</strong> PowerPyx says workers you hold up sometimes give you another location<R />.
              </B>
              <B>
                <strong className="text-ink">Don&apos;t wait on your contacts.</strong> PowerPyx says you can go and clear sites without being given the location first<R />.
              </B>
              <B>
                <strong className="text-ink">Keep your own checklist.</strong> The game doesn&apos;t track cleared sites, according to PowerPyx<R />, so keeping your own note of the ones you&apos;ve done is our own suggestion.
              </B>
              <B>
                <strong className="text-ink">No need to rush.</strong> PowerPyx says the sites stay available after the story<R />. Our <A href="/guides/money">money guide</A> has other ways to earn.
              </B>
            </Bullets>
          </section>

          <Faq items={SIDEJOBS_FAQ} />

          <SourcesList
            sources={SIDEJOBS_SOURCES}
            blurLinks
            blurLabel="source links (the web addresses name story content)"
            verified={{ iso: SIDEJOBS_VERIFIED, label: SIDEJOBS_VERIFIED_LABEL }}
          />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">The short version</h2>
            <p className="mt-4x text-sm text-ink-2">
              Hidden sites, found through purple search areas on the map. Destroy each one with fire or explosives for $2,000 or $2,500. PowerPyx describes 13 of its 14 sites.
            </p>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">
              Confirmed needs two main outlets. A claim from a single outlet is attributed to it and marked Reported, and where outlets disagree we show each one.
            </p>
          </div>
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">More guides</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              <li><A href="/guides/missions">Missions in order</A></li>
              <li><A href="/guides/missions/chapter-3-mission-8">Chapter 3 Mission 8</A></li>
              <li><A href="/guides/strangers-and-freaks">Strangers &amp; Freaks</A></li>
              <li><A href="/guides/money">Making money</A></li>
              <li><A href="/guides/collectibles">Collectibles</A></li>
              <li><A href="/map">Interactive map</A></li>
              <li><A href="/news">GTA 6 news</A></li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path={SIDEJOBS_PATH} />
    </article>
  );
}
