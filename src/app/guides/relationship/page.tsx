import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { SourcesList } from "@/components/guides/MissionBits";
import { Spoiler } from "@/components/guides/Spoiler";
import { RELATIONSHIP_FAQ, RELATIONSHIP_SOURCES, RELATIONSHIP_VERIFIED, RELATIONSHIP_VERIFIED_LABEL } from "@/lib/guides/relationship";

export const metadata = metaFor("/guides/relationship");

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

export default function RelationshipGuide() {
  return (
    <article>
      <PageSchema path="/guides/relationship" breadcrumbs={false} />
      <Breadcrumbs path="/guides/relationship" />
      <PageHeader
        backdrop="boat"
        kicker="Guide · Levels, heart actions and what costs hearts"
        title="GTA 6 Relationship Levels: How to Raise Jason & Lucia's Bond"
        verified={RELATIONSHIP_VERIFIED_LABEL}
        source="VGC, PC Gamer, Polygon, GameSpot"
      />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              Jason and Lucia share a relationship meter, and how you play moves it up or down. You can&apos;t break them up for good, but you can let the romance fade until they are just business partners. This guide covers the four levels, how to check where you stand, the everyday actions that add hearts and the things that cost you.
            </p>
            <p>
              <strong className="text-turq">Confirmed</strong> means at least two main outlets say so. <strong className="text-orange">Reported</strong> means one outlet does, or the outlets differ, and we name them. One short section about story effects is blurred.
            </p>
          </div>

          <section aria-labelledby="levels" className="mt-16x">
            <H2 id="levels">The four relationship levels</H2>
            <p className="mt-4x max-w-2xl text-ink-2">
              VGC, PC Gamer and Polygon list the same four levels, and GameSpot also describes a four-level system with level four as the maximum<C />.
            </p>
            <div className="mt-4x overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse text-left text-sm text-ink-2">
                <thead>
                  <tr className="border-b border-pink/20">
                    <th className={TH}>Level</th>
                    <th className={TH}>Name</th>
                    <th className={TH}>What it means (Polygon)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-pink/10 align-top">
                    <td className="py-2x pr-4x">1/4</td>
                    <td className="py-2x pr-4x font-semibold text-ink">Running on Empty</td>
                    <td className="py-2x pr-4x">Platonic partners. Grey broken heart.</td>
                  </tr>
                  <tr className="border-b border-pink/10 align-top">
                    <td className="py-2x pr-4x">2/4</td>
                    <td className="py-2x pr-4x font-semibold text-ink">Partners in Crime</td>
                    <td className="py-2x pr-4x">More platonic than romantic. Pink and grey broken heart.</td>
                  </tr>
                  <tr className="border-b border-pink/10 align-top">
                    <td className="py-2x pr-4x">3/4</td>
                    <td className="py-2x pr-4x font-semibold text-ink">Crazy in Love</td>
                    <td className="py-2x pr-4x">A couple in love. Pink heart.</td>
                  </tr>
                  <tr className="border-b border-pink/10 align-top">
                    <td className="py-2x pr-4x">4/4</td>
                    <td className="py-2x pr-4x font-semibold text-ink">Hot Together</td>
                    <td className="py-2x pr-4x">The maximum. Burning heart.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3x max-w-2xl text-sm text-muted">
              The level names and numbers are Confirmed. The descriptions and icons are Polygon&apos;s<R />.
            </p>
          </section>

          <section aria-labelledby="check" className="mt-16x">
            <H2 id="check">How to check your relationship level</H2>
            <Steps>
              <li>
                <strong className="text-ink">Open the Jason and Lucia menu.</strong> VGC and Polygon both say your current level is shown there<C />. Polygon says it is the heart icon at the bottom of the screen<R />.
              </li>
              <li>
                <strong className="text-ink">On PlayStation, VGC says to press the touch pad</strong> and use the bumpers to move across to that tab<R />.
              </li>
              <li>
                <strong className="text-ink">Watch the right side of the screen while you play.</strong> PC Gamer and Polygon both say a heart pops up there whenever an action helps the relationship, and PC Gamer adds a chime<C />.
              </li>
            </Steps>
          </section>

          <section aria-labelledby="start" className="mt-16x">
            <H2 id="start">How your starting level is set</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                Your starting level depends on the optional prep you do in Chapter 1 before Lucia comes home. Polygon and GameSpot both say that fixing up Jason&apos;s house and finishing the optional errands puts the couple at <strong className="text-ink">Crazy in Love</strong> once they are together<C />. Polygon says skipping them leaves you at <strong className="text-ink">Partners in Crime</strong><R />.
              </p>
              <p>
                You can&apos;t go back. GameSpot says the errands disappear once you pick Lucia up, and VGC&apos;s house guide says the repairs can&apos;t be done after that, and that skipping them leaves the starting meter much lower<C />. Our <A href="/guides/missions/coming-home">Coming Home walkthrough</A> lists the errands and repairs.
              </p>
            </div>
          </section>

          <section aria-labelledby="raise" className="mt-16x">
            <H2 id="raise">How to raise your relationship</H2>
            <Steps>
              <li>
                <strong className="text-ink">Play missions as a pair.</strong> VGC and Polygon both say missions together count for a lot, so bring your partner unless the mission is solo<C />.
              </li>
              <li>
                <strong className="text-ink">Hold hands when you walk together.</strong> All four outlets list it. VGC and GameSpot give R2 / RT when the prompt shows<C />.
              </li>
              <li>
                <strong className="text-ink">Use the affection prompts.</strong> Kiss, hug, greet and talk when the heart or talk prompts appear (VGC, PC Gamer, Polygon and GameSpot). GameSpot says holding L2 / LT shows which prompts are available<C />.
              </li>
              <li>
                <strong className="text-ink">Reply to texts and check in.</strong> VGC and PC Gamer both list it, and Polygon says ignoring texts and calls hurts<C />.
              </li>
              <li>
                <strong className="text-ink">Go to bed together.</strong> Sleeping at the same time instead of turning in alone helps (VGC, PC Gamer and GameSpot)<C />.
              </li>
              <li>
                <strong className="text-ink">Do activities side by side.</strong> VGC names pool, working out and basketball, and PC Gamer names minigolf and scuba diving. Polygon lists activities in general<C />. See our <A href="/guides/activities">activities guide</A> for what is available.
              </li>
              <li>
                <strong className="text-ink">Treat your partner.</strong> Buy food or a drink while you are out and hand it over (PC Gamer and Polygon)<C />.
              </li>
              <li>
                <strong className="text-ink">Pull off crimes together.</strong> Successful joint crimes add hearts (PC Gamer, Polygon and VGC)<C />. VGC also counts escaping the police together<R />.
              </li>
            </Steps>
            <h3 className="vc-display mt-8x text-2xl text-ink">More actions, reported by one outlet</h3>
            <Bullets>
              <B>
                Putting money into your Buck Me savings account (PC Gamer)<R />. Our <A href="/guides/money">money guide</A> covers ways to earn it.
              </B>
              <B>
                Choosing &ldquo;Go Out&rdquo; when you are both at home, dancing at a club, getting your hair done together and complimenting a new look (PC Gamer)<R />. See <A href="/guides/change-clothes">how to change clothes</A>.
              </B>
              <B>
                Buying accessories for each other while you are both in the store (PC Gamer)<R />.
              </B>
              <B>
                Sending selfies, texting goodnight when you are away from home, opening the car door for your partner and skydiving together (PC Gamer)<R />.
              </B>
              <B>
                Driving around together (GameSpot)<R />.
              </B>
            </Bullets>
          </section>

          <section aria-labelledby="lower" className="mt-16x">
            <H2 id="lower">What lowers your relationship</H2>
            <Bullets>
              <B>
                <strong className="text-ink">Neglect.</strong> Leaving your partner alone for long stretches drags the meter down (VGC, PC Gamer and Polygon)<C />.
              </B>
              <B>
                <strong className="text-ink">Failing a joint mission</strong> (PC Gamer)<R />.
              </B>
              <B>
                <strong className="text-ink">Mission choices your partner disagrees with</strong>, now and then (PC Gamer)<R />.
              </B>
              <B>
                <strong className="text-ink">Hitting them with your car</strong> (PC Gamer)<R />.
              </B>
              <B>
                <strong className="text-ink">Brushing them off.</strong> Polygon says turning down a meet-up, not replying, skipping nights at home or standing them up all hurt<R />.
              </B>
            </Bullets>
            <p className="mt-4x max-w-2xl text-ink-2">
              PC Gamer says losing hearts didn&apos;t happen often in its playthrough, and VGC says the game warns you when you are not spending enough time together<R />.
            </p>
          </section>

          <section aria-labelledby="tips" className="mt-16x">
            <H2 id="tips">Tips</H2>
            <Bullets>
              <B>
                <strong className="text-ink">Play both characters.</strong> PC Gamer says Rockstar&apos;s advice is to look after the relationship from both sides, and VGC says the key is not to ignore either one for too long<C />.
              </B>
              <B>
                <strong className="text-ink">Solo missions are fine.</strong> VGC and PC Gamer both say each character has missions they do alone, so check in by text and switch back now and then<C />. Our <A href="/guides/switch-characters">switching characters guide</A> shows how.
              </B>
              <B>
                <strong className="text-ink">Do the Chapter 1 errands and repairs before Lucia comes home.</strong> They are the easiest early boost and you can&apos;t come back for them.
              </B>
              <B>
                <strong className="text-ink">If you hit the bottom, small gestures help.</strong> VGC says acts of affection rebuild the meter quickly at the lowest level<R />.
              </B>
              <B>
                <strong className="text-ink">A few slips won&apos;t undo you.</strong> Polygon says once you reach Hot Together, a few mistakes won&apos;t ruin things<R />.
              </B>
              <B>
                <strong className="text-ink">Want strictly business?</strong> GameSpot and Polygon both say doing activities alone and staying quiet around your partner pushes them apart. One of GameSpot&apos;s players found it &ldquo;way harder to make them platonic&rdquo;<R />.
              </B>
            </Bullets>
          </section>

          <section aria-labelledby="unlock" className="mt-16x">
            <H2 id="unlock">What a higher level changes</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                There is no single reward for maxing the meter. Polygon says the level changes how Jason and Lucia act around each other, with more kisses, hugs and compliments when they are in love<R />. PC Gamer and GameSpot both say higher levels can bring non-interactive intimate scenes that you can&apos;t trigger on demand<C />.
              </p>
              <p className="text-sm text-muted">The bit below covers story effects, so it stays blurred until you ask for it.</p>
            </div>
            <div className="mt-4x max-w-2xl">
              <Spoiler label="story effects of a low relationship">
                <p className="text-ink-2">
                  VGC says a low relationship costs you some dialogue and some mission options, and locks you out of one of the game&apos;s endings. VGC also says one point in the story drops the meter by one level automatically, and that it is easy to win back. No second main outlet covers either point, and PC Gamer says it doesn&apos;t yet know how a 1/4 run differs from a 4/4 one<R />.
                </p>
              </Spoiler>
            </div>
          </section>

          <Faq items={RELATIONSHIP_FAQ} />

          <SourcesList sources={RELATIONSHIP_SOURCES} verified={{ iso: RELATIONSHIP_VERIFIED, label: RELATIONSHIP_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">The short version</h2>
            <p className="mt-4x text-sm text-ink-2">
              Four levels, from Running on Empty to Hot Together. Check them in the Jason and Lucia menu. Missions together, hand-holding, texts and sleeping at the same time add hearts. Neglect costs them.
            </p>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">
              Confirmed needs two main outlets. A claim from a single outlet is attributed to it and marked Reported, and where outlets differ we show both versions.
            </p>
          </div>
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">More guides</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              <li><A href="/guides/missions/coming-home">Coming Home walkthrough</A></li>
              <li><A href="/guides/missions/day-release">Day Release walkthrough</A></li>
              <li><A href="/guides/switch-characters">Switching characters</A></li>
              <li><A href="/guides/activities">Activities</A></li>
              <li><A href="/guides/change-clothes">Change clothes</A></li>
              <li><A href="/map">Interactive map</A></li>
              <li><A href="/news">GTA 6 news</A></li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/relationship" />
    </article>
  );
}
