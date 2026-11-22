import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { SourcesList, SpoilerWarning } from "@/components/guides/MissionBits";
import { CreditImage } from "@/components/guides/CreditImage";
import { WEAPONS_FAQ, WEAPONS_SOURCES, WEAPONS_VERIFIED, WEAPONS_VERIFIED_LABEL } from "@/lib/guides/weapons";

export const metadata = metaFor("/guides/weapons");

const R = () => (
  <span className="ml-1x whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-orange" title="Reported by outlets after launch. Not confirmed by Rockstar or in-game.">
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

const Steps = ({ children }: { children: React.ReactNode }) => (
  <ol className="mt-4x flex max-w-2xl list-decimal flex-col gap-3x pl-6x text-ink-2 marker:font-bold marker:text-pink">{children}</ol>
);

export default function WeaponsGuide() {
  return (
    <article>
      <PageSchema path="/guides/weapons" breadcrumbs={false} />
      <Breadcrumbs path="/guides/weapons" />
      <PageHeader
        backdrop="boat"
        kicker="Guide · Guns and loadouts"
        title="GTA 6 Weapons Guide"
        verified={WEAPONS_VERIFIED_LABEL}
        source="GameSpot, GamesRadar+, PowerPyx"
      />

      <SpoilerWarning>
        This guide covers shops, loadouts and default guns in the open. It does not list secret or legendary weapon locations.
      </SpoilerWarning>

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              Picking up a gun in GTA 6 is not the same as owning it. GameSpot and GamesRadar+ both say the weapons system was reworked: a firearm can vanish after a mission, after you sleep, or after you are busted, unless you have actually saved it
              <R />. The reliable path is to buy from an Ammu-Nation store, stow longarms in a vehicle you own, and recover anything missing from a weapons locker.
            </p>
            <p>
              GameSpot counts <strong className="text-ink">34 standard guns</strong> you can find or buy, before unique or legendary variants
              <R />. This page stays with shops, ownership and those default guns. We are not mapping secret weapon spots.
            </p>
          </div>

          <CreditImage
            src="/guides/weapons-jason-rifle.webp"
            alt="Official Grand Theft Auto VI screenshot of Jason Duval aiming a rifle over Vice City at night"
            width={1600}
            height={900}
          />

          <section aria-labelledby="quick" className="mt-16x">
            <H2 id="quick">The quick answer</H2>
            <div className="vc-bar mt-4x max-w-2xl text-ink-2">
              Buy the gun at Ammu-Nation if you want to keep it. GamesRadar+ says a purchase — with pocket cash or a BuckMe account — gives a copy to <strong className="text-ink">both Jason and Lucia</strong>, though each character still has to equip and modify their own
              <R />. Stow longarms in the trunk of a <strong className="text-ink">personal</strong> vehicle, and use the tall green locker if something disappears from your loadout.
            </div>
          </section>

          <section aria-labelledby="own" className="mt-16x">
            <H2 id="own">How to actually keep a gun</H2>
            <Steps>
              <li>
                Buy it at an Ammu-Nation store and choose to equip it. GameSpot says that is the safest way to add a default pistol, SMG, rifle, shotgun or sniper to your loadout
                <R />.
              </li>
              <li>
                Stow longarms in the trunk of a vehicle you own. GameSpot says opening the trunk gives a “Stow Longarms” option, and that guns left in a car you do not own usually disappear when that car is gone
                <R />.
              </li>
              <li>
                If a gun vanishes from your loadout, go to a weapons locker. GameSpot describes a tall green locker at every Ammu-Nation, and says some purchased garages have one too. GamesRadar+ says most stores have a locker, but not the pawn-shop variants
                <R />. See our <A href="/guides/garages">garages guide</A> for property lockers.
              </li>
              <li>
                Open <strong className="text-ink">Manage Weapons</strong>, pick the class, then check <strong className="text-ink">Variants</strong> (Triangle/Y on GameSpot’s account). GameSpot says a “lost” gun is often sitting there, and X/A equips it
                <R />.
              </li>
              <li>
                Do not count on looted “unowned” guns. GamesRadar+ says weapons dropped by enemies or found in the world cannot be modified, cannot be recovered if you lose them, and are gone if you are wasted or busted
                <R />. The exception is unique variants, below.
              </li>
            </Steps>
          </section>

          <section aria-labelledby="stores" className="mt-16x">
            <H2 id="stores">Ammu-Nation stores and stock</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                PowerPyx counts <strong className="text-ink">24</strong> gun stores, marked with an orange gun icon once you clear the fog. Filter them under <strong className="text-ink">Map &gt; Ammu-Nations</strong>
                <R />. Hovering a pin shows the stock type: Limited, Standard, Hunting or Expanded. Expanded stores carry the widest range, including LMGs, sniper rifles, grenade launchers and rocket launchers
                <R />.
              </p>
              <p>
                The first shop most players see is <strong className="text-ink">Chuck&apos;s Tackle &amp; Shot</strong> in the Leonida Keys, which PowerPyx tags as Limited
                <R />. GamesRadar+ says most stores start with a small selection, and that stock expands globally as you buy more guns. It also describes premium stores with a wider range and exclusive cosmetics
                <R />.
              </p>
              <p>
                PowerPyx says each store sells at least one unique weapon variant (sometimes more). Those variants are tracked in the progress menu, but are not required for the 100% checklist
                <R />. Pins can also show extra features: clothes, a weapons locker, or fishing rods.
              </p>
            </div>
            <div className="mt-6x max-w-2xl overflow-x-auto text-sm text-ink-2">
              <table className="w-full border-collapse text-left">
                <caption className="mb-2x text-left text-xs uppercase tracking-[0.18em] text-faint">PowerPyx’s 24 stores, by county (Reported)</caption>
                <thead>
                  <tr className="border-b border-ink/20">
                    <th className="py-2x pr-3x font-bold text-ink">County</th>
                    <th className="py-2x font-bold text-ink">Stores (type)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-ink/10">
                    <td className="py-2x pr-3x align-top">Mariana</td>
                    <td className="py-2x">Barrage Gun Supply (Standard), Chuck&apos;s Tackle &amp; Shot (Limited), Guns Aplenty! (Hunting), Richardson Hunting Supplies (Standard), Woodhatch (Expanded)</td>
                  </tr>
                  <tr className="border-b border-ink/10">
                    <td className="py-2x pr-3x align-top">Vice-Dale</td>
                    <td className="py-2x">Big Shots, Phil&apos;s Ammu-Nation, Black Eagle, Iron &amp; Oak, Prestige Firearms (all Expanded); Hamlet Traders, Tequesta Guns &amp; Ammo, Vice City Firearms, Martez Empenos, Jackson Firearms, Vice City Gun &amp; Pawn, Pawn &amp; Gun – Crosstown, Quickscope, Zenon&apos;s Pawn Shop (Standard)</td>
                  </tr>
                  <tr className="border-b border-ink/10">
                    <td className="py-2x pr-3x align-top">Leonard</td>
                    <td className="py-2x">Tactical Outlet Guns (Standard)</td>
                  </tr>
                  <tr className="border-b border-ink/10">
                    <td className="py-2x pr-3x align-top">Kelly</td>
                    <td className="py-2x">Pawn &amp; Gun – Port Gellhorn, Gellhorn Outfitters, Biff&apos;s Gun Supply (Standard)</td>
                  </tr>
                  <tr>
                    <td className="py-2x pr-3x align-top">Lummox</td>
                    <td className="py-2x">Rusty Willis Jr. Hunting Supplies (Hunting)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="unique" className="mt-16x">
            <H2 id="unique">Unique variants, without the secret map</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                GamesRadar+ says unique weapon variants show a <strong className="text-ink">golden gun icon</strong> on the minimap, usually at special spots and illegal-operation hideouts. Once acquired they are permanently unlocked for both characters, even if you never bought the base gun, but they cannot be modified
                <R />. GameSpot describes the same gold-icon “legendary” weapons in compounds
                <R />.
              </p>
              <p>
                GamesRadar+ says that in the locker, a gold icon in the corner means a unique variant is available; Triangle/Y opens a sub-menu to equip it, or to switch back to your own modified version if you own the base gun
                <R />. We are not listing those hiding spots here.
              </p>
            </div>
          </section>

          <section aria-labelledby="best" className="mt-16x">
            <H2 id="best">GameSpot’s recommended default loadout</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                You carry two sidearms and two longarms at a time, according to GameSpot. Sidearms do not show on your character, so there is no downside to keeping both slots filled
                <R />. These picks are GameSpot’s, for default guns only, and they are <span className="font-bold uppercase tracking-[0.18em] text-orange">Reported</span>.
              </p>
            </div>
            <ul className="mt-4x flex max-w-2xl flex-col gap-4x">
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Sidearm 1:</strong> Girardi ES9, which GameSpot calls the best pistol for stats and handling
                <R />.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Sidearm 2:</strong> a Hawk &amp; Little revolver for damage. GameSpot advises skipping sidearm SMGs, which take too many shots at most ranges
                <R />.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Longarm 1:</strong> the Duke 556 assault rifle, “the most consistent and the easiest to control.” The ADB FRA is its runner-up once you add mods
                <R />.
              </li>
              <li className="vc-bar text-ink-2">
                <strong className="text-ink">Longarm 2:</strong> a shotgun or a sniper. For shotguns, GameSpot likes the semi-auto Girardi AZ1200, or the Shrewsbury Drifter for raw damage. For snipers, the Fairview FF-50 is its best overall, and the Fairview FF-SR is the one for maximum range
                <R />.
              </li>
            </ul>
            <p className="mt-4x max-w-2xl text-ink-2">
              GameSpot notes that a legendary unique you find in the world is often better than a base gun, and that early on almost any weapon will do until you can upgrade
              <R />. If you need cash for a shopping trip, see the <A href="/guides/money">money guide</A>.
            </p>
          </section>

          <Faq items={WEAPONS_FAQ} />
          <SourcesList sources={WEAPONS_SOURCES} verified={{ iso: WEAPONS_VERIFIED, label: WEAPONS_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">What to do first</h2>
            <p className="mt-4x text-sm text-ink-2">
              Buy, don’t just loot. Stow longarms in a car you own. If a gun disappears, check the green locker and the Variants tab before you assume it is gone.
            </p>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">
              Store counts come from PowerPyx, ownership rules from GamesRadar+, and the recommended loadout from GameSpot. Where GameSpot and GamesRadar+ disagree on lockers (every store vs most stores, not pawn shops), we give both.
            </p>
          </div>
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">More guides</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              <li>
                <A href="/guides/money">Money guide</A>
              </li>
              <li>
                <A href="/guides/garages">Garages</A>
              </li>
              <li>
                <A href="/guides/wanted">Wanted system</A>
              </li>
              <li>
                <A href="/guides/beginner">Beginner guide</A>
              </li>
              <li>
                <A href="/map">Interactive map</A>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/weapons" />
    </article>
  );
}
