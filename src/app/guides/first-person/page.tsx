import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { SourcesList } from "@/components/guides/MissionBits";
import { FIRSTPERSON_FAQ, FIRSTPERSON_SOURCES, FIRSTPERSON_VERIFIED, FIRSTPERSON_VERIFIED_LABEL } from "@/lib/guides/first-person";

export const metadata = metaFor("/guides/first-person");

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

export default function FirstPersonGuide() {
  return (
    <article>
      <PageSchema path="/guides/first-person" breadcrumbs={false} />
      <Breadcrumbs path="/guides/first-person" />
      <PageHeader
        backdrop="boat"
        kicker="Guide · Inspect view, scoped aiming and driving cameras"
        title="GTA 6 First-Person Mode: How to Use First-Person View"
        verified={FIRSTPERSON_VERIFIED_LABEL}
        source="Push Square, GamesRadar+, PowerPyx"
      />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              If you&apos;re coming from GTA 5 and looking for the first-person toggle, it isn&apos;t there. GTA 6 has no mode that lets you walk, drive and play missions from Jason&apos;s or Lucia&apos;s eyes. What it does have is a few first-person views that work in specific situations. This page covers what each one does, the buttons, and where the outlets disagree.
            </p>
            <p>
              <strong className="text-turq">Confirmed</strong> means at least two main outlets say so. <strong className="text-orange">Reported</strong> means one outlet does, or the outlets disagree, and we name them. Button names are PlayStation first, with Xbox where an outlet gives it.
            </p>
          </div>

          <section aria-labelledby="is-there" className="mt-16x">
            <H2 id="is-there">Is there a first-person mode?</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                <strong className="text-ink">No.</strong> Push Square, GamesRadar+ and PowerPyx all say you can&apos;t play the whole game in first person<C />.
              </p>
              <p>
                Push Square says a few moments in the story briefly switch perspective for a closer feel, but it isn&apos;t a toggle and you can&apos;t trigger it<R />. GamesRadar+ says it checked and found no cheat that turns first person on. See our <A href="/guides/cheats">cheats and codes guide</A> for the codes that do exist<R />.
              </p>
            </div>
          </section>

          <section aria-labelledby="inspect" className="mt-16x">
            <H2 id="inspect">1. Inspect view (standing still)</H2>
            <Steps>
              <li>
                <strong className="text-ink">Stop moving.</strong> Push Square and PowerPyx both describe it as a standing-still view<C />.
              </li>
              <li>
                <strong className="text-ink">Hold L2 (LT on Xbox) and press R3,</strong> the right stick click (Push Square and PowerPyx). GamesRadar+ says to hold the trigger and click L3 and R3 together<R />.
              </li>
              <li>
                <strong className="text-ink">Look around with the right stick.</strong> Push Square says R2 zooms in further on what you&apos;re looking at<R />.
              </li>
              <li>
                <strong className="text-ink">Release L2 to go back to third person.</strong> Push Square says you must keep it held to stay in this view<R />.
              </li>
            </Steps>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                You can&apos;t walk in this view. Your body stays put<C />. Push Square likes it for reading signs and posters or checking shop shelves<R />.
              </p>
              <p>
                <strong className="text-ink">The inputs differ.</strong> Two outlets say L2 + R3 and GamesRadar+ says L2 + L3 + R3. If R3 alone doesn&apos;t work for you, trying both sticks while holding the trigger is a reasonable next step. That tip is ours. GamesRadar+ also says the view only works in certain moments, such as when talking to NPCs or looking through a scope, which Push Square and PowerPyx don&apos;t say<R />.
              </p>
            </div>
          </section>

          <section aria-labelledby="scope" className="mt-16x">
            <H2 id="scope">2. First-person aiming with a scope</H2>
            <Steps>
              <li>
                <strong className="text-ink">Buy an optic for your gun.</strong> Push Square points to an Ammu-Nation, under Attachments, then Optics, in the weapon modification screen. PowerPyx says any gun store<C />.
              </li>
              <li>
                <strong className="text-ink">Equip the weapon and hold L2 / LT to aim.</strong>
              </li>
              <li>
                <strong className="text-ink">Press R3 to look down the sight.</strong> Push Square, GamesRadar+ and PowerPyx all give this<C />.
              </li>
              <li>
                <strong className="text-ink">Press R3 again or release L2 to return to normal aiming.</strong> That is Push Square&apos;s description<R />.
              </li>
            </Steps>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                Push Square says you can still move and strafe while looking down the sight, and that you need to press R3 each time you start aiming again<R />. Our <A href="/database/weapons">weapons database</A> lists the guns and Ammu-Nation details we&apos;ve confirmed.
              </p>
            </div>
          </section>

          <section aria-labelledby="driving" className="mt-16x">
            <H2 id="driving">3. Driving: no first-person cockpit</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                <strong className="text-ink">Push Square and GamesRadar+ both say you can&apos;t drive in first person</strong><C />.
              </p>
              <p>
                <strong className="text-ink">PowerPyx disagrees.</strong> It says that if you pull out your phone with D-pad Up while driving, you can drive in first person, but only with the phone out. The other two outlets don&apos;t mention it, so treat it as unconfirmed and contradicted<R />.
              </p>
            </div>
          </section>

          <section aria-labelledby="camera" className="mt-16x">
            <H2 id="camera">Changing the vehicle camera</H2>
            <Bullets>
              <B>
                <strong className="text-ink">Camera distance.</strong> Push Square says there are three vehicle camera angles. Hold Down on the D-pad and use Square to pick one, which sets how far behind the car the camera sits<R />.
              </B>
              <B>
                <strong className="text-ink">Cinematic mode.</strong> Push Square says holding Down and pressing Options in a car switches to a cinematic camera, and that holding Circle in that mode makes your character drive to your selected waypoint on their own<R />.
              </B>
            </Bullets>
          </section>

          <section aria-labelledby="tips" className="mt-16x">
            <H2 id="tips">Tips</H2>
            <Bullets>
              <B>
                <strong className="text-ink">Use the inspect view to read signs and spot details</strong> before you case a store or an area. Push Square likes it for exactly that.
              </B>
              <B>
                <strong className="text-ink">Fit an optic to your main gun early</strong> so scoped aiming is ready when you need it. That is our own suggestion.
              </B>
              <B>
                <strong className="text-ink">Don&apos;t rely on the phone trick</strong> for driving. Only PowerPyx reports it.
              </B>
              <B>
                <strong className="text-ink">Long drive ahead?</strong> Cinematic mode with auto-drive (Push Square, Reported) is a hands-off option, though it doesn&apos;t skip the trip. For paid skipping, see our <A href="/guides/fast-travel">fast travel guide</A>. New here? Start with the <A href="/guides/beginner">beginner guide</A>.
              </B>
            </Bullets>
          </section>

          <Faq items={FIRSTPERSON_FAQ} />

          <SourcesList sources={FIRSTPERSON_SOURCES} verified={{ iso: FIRSTPERSON_VERIFIED, label: FIRSTPERSON_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">The short version</h2>
            <p className="mt-4x text-sm text-ink-2">
              No full first-person mode. Stand still and hold L2 + R3 for an inspect view, or aim a scoped gun and press R3. You can&apos;t drive in first person, though one outlet disagrees.
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
              <li><A href="/guides/switch-characters">Switching characters</A></li>
              <li><A href="/guides/cheats">Cheats</A></li>
              <li><A href="/guides/fast-travel">Fast travel</A></li>
              <li><A href="/database/weapons">Weapons database</A></li>
              <li><A href="/news">GTA 6 news</A></li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/first-person" />
    </article>
  );
}
