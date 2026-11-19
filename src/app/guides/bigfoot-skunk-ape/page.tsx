import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { Spoiler } from "@/components/guides/Spoiler";
import { SourcesList } from "@/components/guides/MissionBits";
import { BIGFOOT_FAQ, BIGFOOT_SOURCES, BIGFOOT_VERIFIED, BIGFOOT_VERIFIED_LABEL } from "@/lib/guides/bigfoot";

export const metadata = metaFor("/guides/bigfoot-skunk-ape");

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

export default function BigfootGuide() {
  return (
    <article>
      <PageSchema path="/guides/bigfoot-skunk-ape" breadcrumbs={false} />
      <Breadcrumbs path="/guides/bigfoot-skunk-ape" />
      <PageHeader
        backdrop="boat"
        kicker="Guide · Free-roam sighting, Kirk's quests and the tree effigies"
        title="Where to Find Bigfoot (the Skunk Ape) in GTA 6"
        verified={BIGFOOT_VERIFIED_LABEL}
        source="GamesRadar+, GameSpot, Polygon, PowerPyx"
      />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              Bigfoot was a rumour in GTA San Andreas and had cameos in GTA 5. In GTA 6 it&apos;s a real part of the game. Leonida&apos;s version is the Skunk Ape, and you can meet it two ways: a free-roam sighting in the swamps, and a three-part side questline for a man named Kirk. This guide covers where to look, how to start Kirk&apos;s quests, and how to get through the effigy search without wandering the mangroves for an hour.
            </p>
            <p>
              <strong className="text-turq">Confirmed</strong> means at least two main outlets say so. <strong className="text-orange">Reported</strong> means one outlet does, or the outlets disagree, and we name them. What happens in the last part of Kirk&apos;s line stays blurred until you ask for it.
            </p>
          </div>

          <section aria-labelledby="quick" className="mt-16x">
            <H2 id="quick">Quick answers</H2>
            <Bullets>
              <B>
                <strong className="text-ink">Is Bigfoot in GTA 6?</strong> Yes, as the Skunk Ape. GamesRadar+, GameSpot, Polygon and PowerPyx all describe it<C />.
              </B>
              <B>
                <strong className="text-ink">When can I find it?</strong> GameRant says you can go as soon as you finish the first mission<R />. PowerPyx says Kirk&apos;s first quest is a Chapter 1 side mission<R />.
              </B>
              <B>
                <strong className="text-ink">Can I kill it?</strong> Not in the free-roam sighting. GameRant says it outruns you and bullets don&apos;t hurt it<R />.
              </B>
            </Bullets>
          </section>

          <section aria-labelledby="sighting" className="mt-16x">
            <H2 id="sighting">The free-roam Skunk Ape sighting</H2>
            <p className="mt-4x max-w-2xl text-ink-2">
              GamesRadar+ and GameRant describe the same encounter<R />.
            </p>
            <Steps>
              <li>
                <strong className="text-ink">Head to the swamps.</strong> GameRant places the sighting south of Cottonmouth Lake, across from Jason&apos;s Key Lento starting area. GameSpot lists the location as Gullet Marsh. GamesRadar+ says every clip it saw shows it at a dirt road intersection. Check our <A href="/map">interactive map</A> for those areas.
              </li>
              <li>
                <strong className="text-ink">Look for a creature feeding on a deer.</strong> GamesRadar+ and GameRant both say it&apos;s at a deer carcass.
              </li>
              <li>
                <strong className="text-ink">Give chase into the woods.</strong> It runs off. GameRant says you can&apos;t catch it and your bullets don&apos;t hurt it.
              </li>
              <li>
                <strong className="text-ink">Find the effigy.</strong> Deeper in the trees there&apos;s a figure of a person tied to a tree. GamesRadar+ and GameRant both mention it.
              </li>
              <li>
                <strong className="text-ink">Inspect it.</strong> You fall unconscious. GamesRadar+ says you wake back where you first saw the creature, and GameRant says you end up back at your vehicle.
              </li>
            </Steps>
            <p className="mt-4x max-w-2xl text-ink-2">
              GameSpot lists its own Bigfoot entry at Gullet Marsh and calls it unmissable thanks to a particular mission<R />. No outlet has said whether that mission encounter and the free-roam sighting are the same thing, so treat them as separate until that&apos;s confirmed.
            </p>
          </section>

          <section aria-labelledby="start" className="mt-16x">
            <H2 id="start">Kirk&apos;s questline: how to start it</H2>
            <p className="mt-4x max-w-2xl text-ink-2">
              Kirk&apos;s quests are a Strangers &amp; Freaks strand with three parts. Polygon says you head into the Pelican Valley swamps three times, and PowerPyx lists the same three quests<C />.
            </p>
            <Steps>
              <li>
                <strong className="text-ink">Find a Skunk Ape flyer.</strong> Polygon says they&apos;re fairly common in shopping areas and suggests Shrimp &amp; Save in Key Lento<R />. PowerPyx found one at Skeeter&apos;s bar in Hamlet<R />. A flyer starts the quest<C />.
              </li>
              <li>
                <strong className="text-ink">Read it.</strong> That saves Kirk&apos;s number to your phone<C />.
              </li>
              <li>
                <strong className="text-ink">Call Kirk from your contacts.</strong> The quest is then marked in the swamps of Mariana County<C />.
              </li>
              <li>
                <strong className="text-ink">Go at night.</strong> PowerPyx says the first part can only be started at night and suggests sleeping in your bed to skip ahead<R />.
              </li>
            </Steps>
          </section>

          <section aria-labelledby="part1" className="mt-16x">
            <H2 id="part1">Part 1: Search for the Skunk Ape</H2>
            <p className="mt-4x max-w-2xl text-ink-2">
              A follow-and-search mission, per PowerPyx<R />.
            </p>
            <Steps>
              <li>Meet Kirk at his truck in the swamps and follow him into the woods.</li>
              <li>Equip the flashlight from the weapon wheel so you can see. PowerPyx puts it in the bottom-right slot.</li>
              <li>When you get a circular search area, check the feeding site on the ground in the middle and the claw marks on a tree just east of centre.</li>
              <li>Chase the creature when Kirk spots it. You won&apos;t catch it.</li>
              <li>Inspect the effigy at the edge of the woods, then run back towards Kirk&apos;s truck when a huge wild boar appears next to it.</li>
            </Steps>
            <p className="mt-4x max-w-2xl text-ink-2">
              <strong className="text-ink">Reward:</strong> $1,000 from Kirk<R />.
            </p>
          </section>

          <section aria-labelledby="part2" className="mt-16x">
            <H2 id="part2">Part 2: Search for Tree Effigies</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                Kirk texts you some time after part one and marks a large search area in Pelican Valley. PowerPyx says the wait can be long, so carry on with other missions<R />.
              </p>
              <p>
                <strong className="text-ink">Get an airboat first.</strong> Polygon recommends driving to Thorpe Adventures in the north-west of the area and swapping your car for an airboat there. A dinghy or jet ski may also work, but it calls the airboat by far the best way across the swamp<R />.
              </p>
              <p>
                <strong className="text-ink">Where the three effigies are</strong> (Polygon&apos;s descriptions)<R />:
              </p>
            </div>
            <Steps>
              <li>Just south of Thorpe Adventures.</li>
              <li>On a solitary patch of woodland between the waterways.</li>
              <li>In the south, at the end of a long, narrow strip of trees.</li>
            </Steps>
            <p className="mt-4x max-w-2xl text-ink-2">
              PowerPyx says you can inspect them in any order and the quest completes on its own after the third. It lists no reward for this part<R />.
            </p>
          </section>

          <section aria-labelledby="part3" className="mt-16x">
            <H2 id="part3">Part 3: Kirk&apos;s final hunt</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                This part comes later in the story. Once you&apos;ve finished part two, Kirk texts you a few days later, and PowerPyx says the timing varies<R />. It&apos;s night only<R />. How it unlocks, what it pays and how it ends are covered below, so they stay blurred until you ask for them.
              </p>
            </div>
            <div className="mt-4x max-w-2xl">
              <Spoiler label="part 3: requirements, rewards and outcome">
                <div className="space-y-3x text-ink-2">
                  <p>
                    PowerPyx calls this quest &ldquo;Help Kirk Find Mr. Mangrove&rdquo;. It can only be played as Lucia, and PowerPyx says she becomes playable in Chapter 2, so the quest won&apos;t trigger in Chapter 1<R />.
                  </p>
                  <p>
                    Kirk takes you up in his helicopter and gives you a unique tranquilizer rifle variant, the Mister Mangrove Laird 350, which you keep. The hunt ends with a choice. PowerPyx says only shooting the creature at the end pays Kirk&apos;s $10,000. The other choices pay nothing extra. Every outcome completes the quest and counts as a Strangers &amp; Freaks strand<R />.
                  </p>
                </div>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="unlock" className="mt-16x">
            <H2 id="unlock">What you unlock</H2>
            <Bullets>
              <B>
                $1,000 for part one<R />. PowerPyx lists no reward for part two<R />.
              </B>
              <B>
                Part three has its own rewards, covered in the blurred section above<R />.
              </B>
              <B>
                Progress towards the Strangers &amp; Freaks trophy: PowerPyx lists Kirk&apos;s questline as one that counts<R />. See our <A href="/guides/strangers-and-freaks">Strangers &amp; Freaks guide</A>.
              </B>
            </Bullets>
          </section>

          <section aria-labelledby="tips" className="mt-16x">
            <H2 id="tips">Tips</H2>
            <Bullets>
              <B>
                <strong className="text-ink">Grab a flyer early.</strong> Parts one and two are Chapter 1 side missions, and the last part opens later, so starting early gets the first two out of the way<R />.
              </B>
              <B>
                <strong className="text-ink">Sleep to skip to night.</strong> PowerPyx says parts one and three only run after dark<R />.
              </B>
              <B>
                <strong className="text-ink">Keep a manual save before the last part.</strong> That lets you retry it if you want a different outcome. See our <A href="/guides/saving">saving guide</A>.
              </B>
              <B>
                <strong className="text-ink">Don&apos;t waste ammo on the free-roam sighting.</strong> GameRant says it can&apos;t be hurt there<R />.
              </B>
              <B>
                <strong className="text-ink">Use an airboat for the effigies.</strong> Polygon says it&apos;s by far the best way across the swamp<R />.
              </B>
            </Bullets>
          </section>

          <Faq items={BIGFOOT_FAQ} />

          <SourcesList sources={BIGFOOT_SOURCES} verified={{ iso: BIGFOOT_VERIFIED, label: BIGFOOT_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">The short version</h2>
            <p className="mt-4x text-sm text-ink-2">
              Bigfoot is the Skunk Ape. Read a flyer, call Kirk and head into the Pelican Valley swamps at night. There are three parts, and an airboat helps with the effigy search.
            </p>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">
              Confirmed needs two main outlets. A claim from a single outlet is attributed to it and marked Reported, and where outlets disagree on a location we show each one.
            </p>
          </div>
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">More guides</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              <li><A href="/guides/strangers-and-freaks">Strangers &amp; Freaks</A></li>
              <li><A href="/guides/activities">Activities</A></li>
              <li><A href="/guides/switch-characters">Switching characters</A></li>
              <li><A href="/guides/saving">How to save</A></li>
              <li><A href="/guides/trophies">Trophy list</A></li>
              <li><A href="/map">Interactive map</A></li>
              <li><A href="/news">GTA 6 news</A></li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/bigfoot-skunk-ape" />
    </article>
  );
}
