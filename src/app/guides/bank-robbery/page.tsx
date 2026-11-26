import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { Spoiler } from "@/components/guides/Spoiler";
import { SourcesList, SpoilerWarning } from "@/components/guides/MissionBits";
import { CreditImage } from "@/components/guides/CreditImage";
import { BANKS, BANK_FAQ, BANK_SOURCES, BANK_VERIFIED, BANK_VERIFIED_LABEL, type BankJob } from "@/lib/guides/bank-robbery";

export const metadata = metaFor("/guides/bank-robbery");

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

const H3 = ({ children }: { children: React.ReactNode }) => <h3 className="mt-8x text-xl font-bold text-ink">{children}</h3>;

const small = BANKS.filter((b) => b.type === "small");
const vaults = BANKS.filter((b) => b.type === "vault");
const pinned = BANKS.filter((b) => b.pin).length;

function BankTable({ rows, caption }: { rows: BankJob[]; caption: string }) {
  return (
    <div className="mt-6x overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm text-ink-2">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-white/15 text-xs uppercase tracking-[0.14em] text-faint">
            <th scope="col" className="py-2x pr-3x">#</th>
            <th scope="col" className="py-2x pr-3x">Bank</th>
            <th scope="col" className="py-2x pr-3x">Area</th>
            <th scope="col" className="py-2x pr-3x">Take</th>
            <th scope="col" className="py-2x pr-3x">Security</th>
            <th scope="col" className="py-2x">Map</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((b) => (
            <tr key={b.n} id={`bank-${b.n}`} className="border-b border-white/5 align-top">
              <td className="py-2x pr-3x text-faint">{b.n}</td>
              <td className="py-2x pr-3x font-semibold text-ink">{b.name}</td>
              <td className="py-2x pr-3x">
                {b.area}
                <span className="block text-xs text-faint">{b.county}</span>
              </td>
              <td className="py-2x pr-3x whitespace-nowrap">{b.take}</td>
              <td className="py-2x pr-3x">{b.security ?? <span className="text-faint">Not listed</span>}</td>
              <td className="py-2x whitespace-nowrap">
                {b.pin ? <A href={`/map?pin=${b.pin}`}>Map pin</A> : <span className="text-faint" title="We could not confirm the exact spot yet">Not pinned yet</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BankRobberyGuide() {
  return (
    <article>
      <PageSchema path="/guides/bank-robbery" breadcrumbs={false} />
      <Breadcrumbs path="/guides/bank-robbery" />
      <PageHeader
        backdrop="skyline"
        kicker="Guide · Robberies"
        title="GTA 6 Bank Robbery Guide"
        verified={BANK_VERIFIED_LABEL}
        source="PowerPyx, GTABase, GameSpot, PC Gamer"
      />

      <SpoilerWarning>
        Bank names, districts, payouts and tactics are in the open. The story missions that unlock bank jobs, and the characters
        involved, sit behind the spoiler blur.
      </SpoilerWarning>

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              There are <strong className="text-ink">22 banks</strong> you can rob in Leonida: <strong className="text-ink">14 small banks</strong> with a
              cash drawer and a safe, and <strong className="text-ink">8 large banks</strong> that also have a vault, according to PowerPyx and GTABase
              <R />. Small jobs pay a reported $5,000 to $45,000 in marked bills. Vaults pay $65,000 to $205,000 and are the best money in the game.
            </p>
            <p>
              Below: how bank jobs work, the gear to bring, how to get into a vault, where safe codes turn up, how to get out, and every bank with its
              payout and security. {pinned} of the 22 are pinned on our <A href="/map?cats=bank">interactive map</A>.
            </p>
          </div>

          <CreditImage
            src="/secrets/money-store-job.webp"
            alt="Official Grand Theft Auto VI screenshot of Jason and Lucia in masks holding up a store"
            width={1600}
            height={900}
          />

          <section aria-labelledby="quick" className="mt-16x">
            <H2 id="quick">The quick answer</H2>
            <div className="vc-bar mt-4x max-w-2xl text-ink-2">
              Small banks open around the middle of the story. Hit one by grabbing the <strong className="text-ink">cash drawer</strong> and the{" "}
              <strong className="text-ink">safe</strong>. Both count towards the job. Vaults open near the end. You can&apos;t crack them: you follow a{" "}
              <strong className="text-ink">security van</strong> to a big bank and walk in behind the guard while he has the vault open. That gets you an
              instant <strong className="text-ink">four-star</strong> wanted level, so park a fast getaway vehicle by the exit first (PowerPyx, GameSpot,
              PC Gamer)<R />.
            </div>
          </section>

          <section aria-labelledby="how" className="mt-16x">
            <H2 id="how">How bank jobs work</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                Bank cash comes out as <strong className="text-ink">marked bills</strong>, not spendable money. You need a{" "}
                <strong className="text-ink">Dye Pack Jammer</strong> to fence them, and you get one from the story mission that opens up small banks
                (PowerPyx)<R />.
              </p>
              <p>
                Once that&apos;s done, uncovering the map marks banks automatically with a green bank icon. Open <strong className="text-ink">Map</strong>{" "}
                &gt; <strong className="text-ink">Robberies</strong> (the money bag) &gt; <strong className="text-ink">Bank Jobs</strong> to list them. Dark
                green means unfinished, bright green means done, and hovering an icon shows which parts you&apos;ve looted (PowerPyx)<R />.
              </p>
              <p>
                All 22 banks count towards 100% completion. Robbing <strong className="text-ink">5 vaults and escaping</strong> unlocks the{" "}
                <A href="/guides/trophies">Maximum Withdrawal</A> trophy (PowerPyx)<R />.
              </p>
              <Spoiler label="which missions unlock bank jobs">
                <p>
                  PowerPyx says small banks open after the Chapter 3 main mission <strong className="text-ink">Credit Check</strong> (meeting Raul&apos;s
                  crew), which also gives you the Dye Pack Jammer. Vaults open after the Chapter 4 optional mission{" "}
                  <strong className="text-ink">That&apos;s Where The Money Is…</strong> (wait at the cafe), which appears at the very end of Chapter 4
                  and walks you through your first vault job<R />.
                </p>
              </Spoiler>
            </div>
          </section>

          <section aria-labelledby="gear" className="mt-16x">
            <H2 id="gear">What to bring</H2>
            <ul className="mt-4x max-w-2xl list-disc space-y-2x pl-6x text-ink-2">
              <li>
                <strong className="text-ink">Dye Pack Jammer</strong>, so the marked bills can be fenced (PowerPyx)<R />.
              </li>
              <li>
                <strong className="text-ink">Snap Gun</strong> for quiet doors and lockboxes. PC Gamer says you earn it from Yasmani&apos;s fence jobs<R />.
              </li>
              <li>
                <strong className="text-ink">Explosives</strong> for the reinforced door. GameSpot says one of a bank&apos;s two back entrances usually
                needs blowing open<R />. A grenade or sticky bomb also opens every deposit box in a vault at once (PC Gamer)<R />.
              </li>
              <li>
                <strong className="text-ink">A suppressed gun</strong>. PC Gamer says gunshots make staff and customers panic, set off the alarm or run
                outside and call the cops<R />.
              </li>
              <li>
                <strong className="text-ink">A getaway vehicle</strong> parked by the exit, ideally a fast motorcycle to cut through traffic (PowerPyx)
                <R />.
              </li>
              <li>
                <strong className="text-ink">A partner</strong>. GameSpot says you can hand full stash bags to them when there&apos;s more cash than you
                can carry<R />. See <A href="/guides/switch-characters">switching characters</A>.
              </li>
            </ul>
          </section>

          <section aria-labelledby="small" className="mt-16x">
            <H2 id="small">How to rob a small bank</H2>
            <ol className="mt-4x max-w-2xl list-decimal space-y-3x pl-6x text-ink-2">
              <li>
                <strong className="text-ink">Case it first.</strong> GameSpot walks in unarmed and checks the map to learn the layout. Most banks have a
                back door and a side entrance<R />.
              </li>
              <li>
                <strong className="text-ink">Pick your way in.</strong> GameSpot says one door is usually reinforced and needs an explosive. The other
                opens with the Snap Gun, and PC Gamer says the Snap Gun keeps the alarm quiet<R />.
              </li>
              <li>
                <strong className="text-ink">Deal with cameras and guards.</strong> GameSpot says banks have armed guards. Take down the cameras, then
                find the alarm and disable it before you go for the money<R />.
              </li>
              <li>
                <strong className="text-ink">Find the safe code.</strong> Check sticky notes, computer screens and downed guards. Focus Mode helps you
                spot it (GameSpot)<R />.
              </li>
              <li>
                <strong className="text-ink">Loot the drawer and the safe.</strong> You need both for the job to count as done (PowerPyx)<R />.
              </li>
              <li>
                <strong className="text-ink">Leave by the back and change your look.</strong> GameSpot says the cops get alerted once you leave no
                matter what. Change clothes or appearance, then put distance between you and the bank<R />.
              </li>
            </ol>
          </section>

          <section aria-labelledby="vault" className="mt-16x">
            <H2 id="vault">How to rob a bank vault</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                GameSpot and PC Gamer agree that you can&apos;t pick, crack or blow open a vault. Only the guard from an armoured{" "}
                <strong className="text-ink">security van</strong> opens one, when he carries a cash delivery inside. The vault then stays open for a
                short time<R />.
              </p>
            </div>
            <ol className="mt-4x max-w-2xl list-decimal space-y-3x pl-6x text-ink-2">
              <li>
                <strong className="text-ink">Find a van.</strong> You can spot one while driving. The reliable way is Yasmani, the fence: after his
                earlier jobs (robbing two Payday Loans stores), he sells a tip for <strong className="text-ink">$10,000</strong>. PC Gamer says that
                marks two vans on your map as pink icons (PowerPyx, PC Gamer)<R />.
              </li>
              <li>
                <strong className="text-ink">Tail it at a distance</strong> until it parks outside a bank, then pull over nearby (GameSpot)<R />.
              </li>
              <li>
                <strong className="text-ink">Follow the courier in.</strong> He carries a briefcase. GameSpot suggests going in without a visible gun on
                your back. PC Gamer says he may use the front door, a side entrance or a roll-up door at the back, and may leave doors unlocked behind
                him<R />.
              </li>
              <li>
                <strong className="text-ink">Wait until he&apos;s deep inside.</strong> Give him a few seconds to reach the vault and open it, then start
                the robbery (PC Gamer, GameSpot)<R />.
              </li>
              <li>
                <strong className="text-ink">Get to the back.</strong> Blow the door he went through or find one the Snap Gun opens. Expect more guards
                and staff to subdue on the way (PC Gamer)<R />.
              </li>
              <li>
                <strong className="text-ink">Clear the vault.</strong> Subdue the courier, grab the marked bills on the cart, and crack deposit boxes
                if there&apos;s time (GameSpot, PC Gamer)<R />.
              </li>
              <li>
                <strong className="text-ink">Run.</strong> The vault alarm means an instant four-star wanted level (see below).
              </li>
            </ol>
            <p className="mt-4x max-w-2xl text-ink-2">
              GameSpot found it very hard to hit a vault without setting off the alarm, so plan for a loud exit<R />.
            </p>
          </section>

          <section aria-labelledby="codes" className="mt-16x">
            <H2 id="codes">Safe codes</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                <strong className="text-ink">There are no fixed bank safe codes.</strong> GameSpot found they&apos;re randomised across playthroughs and
                change even when you rob the same place twice, so codes posted online won&apos;t work for you<R />. That&apos;s why we don&apos;t list any.
              </p>
              <p>
                Look for the code on sticky notes, on computer screens, or on a guard you&apos;ve taken down. If you can&apos;t find it, GameSpot says
                smaller safes can be picked and lockboxes snapped open<R />.
              </p>
            </div>
          </section>

          <section aria-labelledby="cops" className="mt-16x">
            <H2 id="cops">Guards, alarms and the police</H2>
            <div className="mt-4x max-w-2xl space-y-4x text-ink-2">
              <p>
                <strong className="text-ink">Guards.</strong> GameSpot says banks have armed guards. PC Gamer says to expect multiple guards and staff
                on the way to a vault<R />. No reliable source has published how many guards each bank has or what they carry, so we haven&apos;t
                guessed. GTABase&apos;s security rating (Low, Medium or High, in the table below) is the best guide to how hard a branch is.
              </p>
              <p>
                <strong className="text-ink">Alarms.</strong> Gunfire, panicking staff and cameras can all trip it. Silenced weapons buy you time (PC
                Gamer)<R />.
              </p>
              <p>
                <strong className="text-ink">Wanted level.</strong> A vault job means <strong className="text-ink">four stars</strong> straight away.
                PC Gamer says that brings SWAT trucks, roadblocks and helicopters (PowerPyx, PC Gamer)<R />. GameSpot says the cops surround every
                entrance once things go loud, so the closer your car, the better<R />.
              </p>
              <p>
                <strong className="text-ink">Response time.</strong> No reliable source has timed it yet, so we don&apos;t print a number. Assume
                they&apos;re close.
              </p>
              <p>
                <strong className="text-ink">Getting away.</strong> PowerPyx suggests a fast motorcycle, then switching vehicles so you&apos;re no longer
                recognised. GameSpot adds a change of clothes or appearance<R />. Our <A href="/guides/wanted">wanted system guide</A> covers breaking
                line of sight and hollow stars.
              </p>
            </div>
          </section>

          <section aria-labelledby="banks" className="mt-16x">
            <H2 id="banks">All 22 bank locations</H2>
            <p className="mt-4x max-w-2xl text-ink-2">
              Numbered as PowerPyx lists them. Takes are reported ranges in marked bills, printed the same by PowerPyx and GTABase. Neither says how
              it measured them, so treat them as a guide to which banks pay more<R />. Security ratings are from GTABase.
            </p>

            <H3>Small banks (14)</H3>
            <BankTable rows={small} caption="GTA 6 small banks: area, take and security" />

            <H3>Large banks with vaults (8)</H3>
            <BankTable rows={vaults} caption="GTA 6 bank vaults: area, take and security" />

            <div className="vc-card mt-8x max-w-2xl p-6x text-sm text-ink-2">
              <h3 className="vc-kicker">About the map pins</h3>
              <p className="mt-3x">
                Each pin comes from the bank&apos;s published in-game coordinates (GTABase&apos;s markers, via the Open GTA 6 Map dataset). We
                checked each one against the district its source names. Seven also match a bank building in GTADB.org&apos;s independent landmark data. Pins are
                approximate on our map, to within about a block.
              </p>
              <p className="mt-3x">
                <strong className="text-ink">Lombank Bayside isn&apos;t pinned yet.</strong> Its published point sits where Stockyard, Crosstown
                and Bayside meet, so we can&apos;t confirm the building. Ocean Beach has three Lombanks, two Fleecas and two Shorefronts, so check
                the payout in the pin to tell them apart.
              </p>
              <p className="mt-3x">
                <A href="/map?cats=bank">Show every bank on the map</A>
              </p>
            </div>
          </section>

          <section aria-labelledby="first" className="mt-16x">
            <H2 id="first">Which bank to hit first</H2>
            <ul className="mt-4x max-w-2xl list-disc space-y-2x pl-6x text-ink-2">
              <li>
                <strong className="text-ink">Easiest:</strong> Shorefront, Ocean Beach (#12), the only bank GTABase rates Low security. It pays
                $5,000–$15,000.
              </li>
              <li>
                <strong className="text-ink">Best small bank:</strong> Lombank, Bayside (#8). It shares the top small-bank range ($15,000–$45,000) with
                Lombank Ocean Beach and Druthers State Bank, but it&apos;s rated Medium, not High.
              </li>
              <li>
                <strong className="text-ink">Biggest vaults:</strong> Lombank Downtown (#17) and Lombank Ocean Beach (#19), both $135,000–$205,000 and
                both High security.
              </li>
              <li>
                <strong className="text-ink">Softest vault:</strong> the second Lombank in Ocean Beach (#21), the only vault rated Medium, at
                $75,000–$135,000.
              </li>
              <li>
                <strong className="text-ink">Farthest out:</strong> Gibson Brothers Bank in Capri, Druthers State Bank in Belville and Shorefront in
                Ambrosia. They&apos;re out of the way, so plan your fence run.
              </li>
            </ul>
          </section>

          <section aria-labelledby="unknown" className="mt-16x">
            <H2 id="unknown">Not confirmed yet</H2>
            <p className="mt-4x max-w-2xl text-ink-2">
              We only print what a reliable source states. Not published yet: how many guards each bank has and what they carry, police response
              times, the entrances at each individual bank, and whether the vault van timings follow a schedule. We&apos;ll add them as they&apos;re
              confirmed.
            </p>
          </section>

          <Faq items={BANK_FAQ} />
          <SourcesList sources={BANK_SOURCES} verified={{ iso: BANK_VERIFIED, label: BANK_VERIFIED_LABEL }} />
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">At a glance</h2>
            <ul className="mt-4x flex flex-col gap-3x text-sm text-ink-2">
              <li>
                <strong className="text-ink">22 banks:</strong> 14 small, 8 with vaults (PowerPyx, GTABase).
              </li>
              <li>
                <strong className="text-ink">Small bank:</strong> cash drawer + safe, $5k–$45k.
              </li>
              <li>
                <strong className="text-ink">Vault:</strong> follow a security van in, $65k–$205k.
              </li>
              <li>
                <strong className="text-ink">Vault heat:</strong> instant 4 stars.
              </li>
              <li>
                <strong className="text-ink">Safe codes:</strong> random each time.
              </li>
              <li>
                <strong className="text-ink">Trophy:</strong> 5 vaults for Maximum Withdrawal.
              </li>
            </ul>
            <p className="mt-4x text-sm">
              <A href="/map?cats=bank">Open the bank map</A>
            </p>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">
              Figures are <strong className="text-orange">Reported</strong> and credited. We don&apos;t print guessed safe codes, guard counts or
              response times, and we only pin a bank when its spot is confirmed.
            </p>
          </div>
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">More guides</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              <li>
                <A href="/guides/money">Money guide</A>
              </li>
              <li>
                <A href="/guides/wanted">Wanted system</A>
              </li>
              <li>
                <A href="/guides/weapons">Weapons</A>
              </li>
              <li>
                <A href="/guides/trophies">Trophies</A>
              </li>
              <li>
                <A href="/map?cats=bank">Bank map</A>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <Related path="/guides/bank-robbery" />
    </article>
  );
}
