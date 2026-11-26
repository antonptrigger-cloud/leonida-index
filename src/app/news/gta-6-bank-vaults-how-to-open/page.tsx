import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, Ext, H2, Lead, Lede, NewsLayout, Source, Sources, Steps } from "@/components/news/NewsBits";
import { Spoiler } from "@/components/guides/Spoiler";

const SLUG = "gta-6-bank-vaults-how-to-open";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const GS = "https://www.gamespot.com/articles/how-to-break-into-bank-vaults-in-gta-6/";
const PCG = "https://www.pcgamer.com/games/grand-theft-auto/gta-6-vault-how-to-open/";
const PP = "https://www.powerpyx.com/gta-6-grand-theft-auto-vi-trophy-guide-roadmap/";
const IGN = "https://www.ign.com/articles/gta-6-breaking-down-the-cleanest-bank-robbery-weve-seen-so-far";

// Sourcing (read 26 Nov 2026, 13:40-13:50 AEST):
// - Payouts, van counts and map-icon colour are not agreed. Each figure is attributed to the page that printed it.
// - Chapter and mission unlocks sit behind a spoiler toggle. Visible copy stays free of story beats.
// - No bank-robbery guide page exists on main yet; internal links go to the money, wanted and trophies guides.
// - Skipped: Mobalytics, GameRant payout tables, and fan-wiki bank lists.

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Money" title="How to open bank vaults in GTA 6" source="GameSpot, PC Gamer, PowerPyx, IGN">
      <Lede>
        The biggest scores in Grand Theft Auto VI sit behind vault doors you cannot crack yourself. Guides published on 25 November (US time) by GameSpot and PC Gamer, plus PowerPyx&rsquo;s trophy roadmap and an IGN write-up of a clean downtown run, all describe the same core trick: you wait for an armored van to arrive, then slip in while the driver opens the vault.
        Payouts and a few details of the setup are not agreed. Unlock timing sits behind a spoiler toggle. There is no bank-robbery guide on this site yet; until that lands, use the <Link href="/guides/money" className={L}>money guide</Link> and the links below.
      </Lede>

      <H2>The method the outlets agree on</H2>
      <p>
        GameSpot and PC Gamer both say the large vault doors are effectively impenetrable. You cannot type in a safe code or use a lockpick or drill to open them during a normal open-world bank job, even if you have already used those tools on smaller safes (<Ext href={GS}>GameSpot</Ext>, <Ext href={PCG}>PC Gamer</Ext>).
      </p>
      <p>
        The way in is an armored security van. Follow it until it parks at a bank, wait for a guard to carry a briefcase inside, and give them time to open the vault. Then find that vault in the back of the building and take the marked bills off the cart. PC Gamer says only the van driver can open the door. IGN describes the same van-tail method, and notes the vans are green and white (<Ext href={IGN}>IGN</Ext>).
      </p>
      <Steps>
        <li>Spot a van in the world, or pay for a tip that marks one on the map (all four outlets mention a $10,000 tip from the fence Yasmani).</li>
        <li>Tail the van without committing crimes around it. GameSpot says a crime nearby makes the driver speed off.</li>
        <li>Once it parks, follow the guard inside and wait until they have actually reached the vault, not just the lobby (<Ext href={PCG}>PC Gamer</Ext>).</li>
        <li>Start the robbery, get to the open vault, and grab the marked bills. Safe-deposit boxes, front cash drawers and office safes are extra, if you have time.</li>
      </Steps>
      <p>
        PC Gamer and PowerPyx both say you should bring Jason and Lucia. There is more cash than one person can carry, and you can hand a bag to your partner. GameSpot says a two-person stick-up is the practical way to rob the floor as well as the vault, though one character can still sneak to the vault alone.
      </p>

      <H2>What it pays, and where the figures differ</H2>
      <p>
        No outlet offers an official Rockstar payout table. These are reported takes from guides and one streamed run:
      </p>
      <Bullets>
        <li>
          <Lead>PC Gamer:</Lead> well over $100,000 in a single job if you open the vault and the safe-deposit boxes, described as &ldquo;potentially $100,000 or more in bills and valuables.&rdquo;
        </li>
        <li>
          <Lead>GameSpot:</Lead> a full vault cart of marked bills sells to Yasmani for about $80,000 to $100,000, and cleaning out the safe and cashier drawers adds about $25,000 to $50,000. GameSpot says Yasmani pays the most for marked bills.
        </li>
        <li>
          <Lead>PowerPyx:</Lead> up to $205,000 per bank, and it calls vault jobs the best endgame money method (<Ext href={PP}>PowerPyx</Ext>).
        </li>
        <li>
          <Lead>IGN, on one run:</Lead> streamer Sway&rsquo;s downtown Lombank job reached $122,000 before a character swap, then $160,000 once both bags were full. A later Sway video, quoted by IGN, claims all eight major banks can pay $125,000 to $200,000 each, in under two minutes. That range is Sway&rsquo;s claim as reported by IGN, not an IGN test.
        </li>
      </Bullets>
      <Callout title="Figures are reported, not official" tone="unconfirmed">
        <p>
          Treat the spread as reported ranges, not a single confirmed payout. A vault take, a fence sale and a streamed two-character run are not the same measurement.
        </p>
      </Callout>

      <H2>Eight big banks, and a few disputed details</H2>
      <p>
        PowerPyx, PC Gamer and IGN all put the number of large bank jobs at eight. PC Gamer says you can find them under &ldquo;Big Bank Jobs&rdquo; in the Robberies category on the map, and places four in Ocean Beach, two downtown, one in Tequesta and one at Vice City International Airport. IGN&rsquo;s example job is the downtown Lombank. For 100% completion, PowerPyx says you need all eight; its Maximum Withdrawal trophy only needs five successful vault escapes.
      </p>
      <p>
        Two setup details are disputed. GameSpot and PowerPyx say Yasmani&rsquo;s tip marks vans with a purple map icon; PC Gamer says the icons are pink. PC Gamer also says a $10,000 tip marks two vans; the other three outlets describe the tip as pointing you to a van, singular. We are not choosing a side.
      </p>
      <p>
        On the way out, PowerPyx and PC Gamer say an alarm means an immediate four-star wanted level. IGN&rsquo;s writer says that, as far as they know, bagging a couple of bundles of marked bills always trips the alarm, because big banks use cloud cameras you cannot wipe. PC Gamer agrees those cameras cannot be destroyed as footage, and suggests shooting the cameras with a silenced pistol, entering through a back door or roller door when you can, and parking a getaway vehicle before you go in. IGN describes Sway leaving through the same garage, taking off masks, changing clothes and walking past the first officers on the scene; PowerPyx suggests a fast motorcycle, then a vehicle swap. See the <Link href="/guides/wanted" className={L}>wanted system guide</Link> for how stars and disguises work, and the <Link href="/guides/trophies" className={L}>trophies guide</Link> if you are chasing Maximum Withdrawal.
      </p>

      <H2>When vault jobs unlock</H2>
      <p>
        All four outlets place full vault robberies later in the story. The exact chapter, mission name and earlier bank rules are behind the toggle, because they give away progress beats.
      </p>
      <Spoiler label="chapter and mission unlock details">
        <Bullets>
          <li>
            IGN says the van-tip method is not available until Chapter 4, and that you cannot successfully rob banks at all until partway through Chapter 3, once you can cash marked bills. It adds that without that step you end up dyed, as Lucia can in the prologue.
          </li>
          <li>
            GameSpot says you can rob pawn shops and jewelry stores earlier, and that after you receive the Dye Pack Jammer from Karim you can hit big banks for marked bills. It also says vault jobs wait until Chapter 4, and that you meet Yasmani in Chapter 3 through Boobie.
          </li>
          <li>
            PC Gamer says Yasmani starts selling tips in Chapter 3 (jewelry and ATM jobs, and the snap gun), and that only in Chapter 4, after you have finished his earlier work, does he offer the $10,000 van tip. It notes that learning to drill a vault in a Chapter 3 story mission still does not let you open open-world vault doors yourself.
          </li>
          <li>
            PowerPyx is the most specific: finish the Chapter 4 optional mission &ldquo;That&rsquo;s Where The Money Is&hellip; (Wait at the Cafe).&rdquo; It is marked from story progress and walks you through the first vault job. After that, Yasmani (a fence unlocked in Chapter 3) sells van tips, but only once you have done his earlier jobs, which PowerPyx lists as robbing two payday-loan shops.
          </li>
        </Bullets>
        <p className="mt-3x">
          Those unlock conditions are not worded the same way. GameSpot talks about Chapter 4 as the start of bank robbery; IGN splits mid-Chapter 3 banks from Chapter 4 van tips; PowerPyx ties vaults to one optional Chapter 4 mission. We are reporting each page as written.
        </p>
      </Spoiler>

      <Sources>
        <Source href={GS} label="GameSpot (Joey Carr): How To Open Bank Vaults In GTA 6, 25 Nov 2026, 12:27 PT / 26 Nov 2026, 06:27 AEST (read 26 Nov 2026, 13:41 AEST)" kind="News outlet" />
        <Source href={PCG} label="PC Gamer (Christopher Livingston): GTA 6 vault: How to open them during big bank jobs, 25 Nov 2026 (read 26 Nov 2026, 13:42 AEST)" kind="News outlet" />
        <Source href={PP} label="PowerPyx: GTA 6 (Grand Theft Auto VI) Trophy Guide & Roadmap, Maximum Withdrawal and A Classic Blitz Play (read 26 Nov 2026, 13:47 AEST)" kind="News outlet" />
        <Source href={IGN} label="IGN (Simon Cardy): GTA 6: Breaking Down The Cleanest Bank Robbery We've Seen So Far, updated 25 Nov 2026, 17:08 UTC / 26 Nov 2026, 03:08 AEST (read 26 Nov 2026, 13:48 AEST)" kind="News outlet" />
      </Sources>
    </NewsLayout>
  );
}
