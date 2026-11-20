import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-army-reenlistment-four-day-pass";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const TP = "https://taskandpurpose.com/culture/army-reenlistment-gta-vi/";
const TP_AUG = "https://taskandpurpose.com/news/army-reenlistment-gta/";
const AXIOS = "https://www.axios.com/2026/11/19/gta-6-deal-perks-bonus-army";
const ROCKSTAR = "https://www.rockstargames.com/VI/only-in-leonida";
const POLY = "https://www.polygon.com/gta-6-us-army-soldiers-reenlist-four-day-weekend/";

// Sourcing (read 20 Nov 2026, 10:02-10:06 AEST):
// - 43 of 130 and the Tomko quote: Army spokesperson to Axios. 43 also in Task & Purpose ("According to the Army").
// - Aug 1 - Nov 14 window, memo signed by Lt. Col. Ryan Hodgson, and 20 of 130 at the time: Task & Purpose, August article.
// - Soldier quotes (Smith, Wolfer) are Task & Purpose interviews; Polygon re-reports them and is tagged News outlet.
// - Skipped: the fan theory about Jason's tattoo/Ranger unit (speculation), a soldier's family details (personal),
//   and NBC's live-blog line on "130 members of the 3rd Infantry Division" (looser wording than the Army's figure).
// - The August T&P image caption says "8th Engineer Battalion"; its body and every other source say 9th, so we use 9th.

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Viral" title="43 soldiers signed up for the Army's GTA 6 reenlistment pass" source="Army statements via Axios + Task & Purpose">
      <Lede>
        Some players booked leave for Grand Theft Auto VI. Some soldiers at Fort Stewart, Georgia signed up for two to six more years in the US Army. The Army says 43 of the 130 eligible soldiers in the 3rd Infantry Division&rsquo;s 9th Brigade Engineer Battalion took a reenlistment perk that gave them a four-day pass for the game&rsquo;s 19 November launch.
        Here is how the deal worked, who came up with it and what the Army says about it.
      </Lede>

      <H2>The numbers</H2>
      <Bullets>
        <li>
          <Lead>43 of 130:</Lead> Lt. Col. Angel Tomko, a 3rd Infantry Division spokesperson, told Axios that 43 of the 130 eligible soldiers chose the four-day pass as part of their reenlistment (<Ext href={AXIOS}>Axios</Ext>). Task & Purpose also reports 43, citing the Army (<Ext href={TP}>Task & Purpose</Ext>), and Polygon repeats the figure from Task & Purpose (<Ext href={POLY}>Polygon</Ext>).
        </li>
        <li>
          <Lead>20 by August:</Lead> When Task & Purpose first reported the offer on 18 August, Army officials said 20 of the 130 eligible soldiers had signed up as of the Monday before (<Ext href={TP_AUG}>Task & Purpose</Ext>). Axios, citing AP, puts the same 20 at the end of August (<Ext href={AXIOS}>Axios</Ext>), so the timing of that earlier figure differs between outlets.
        </li>
        <li>
          <Lead>Two to six years:</Lead> To get the pass, soldiers had to reenlist for at least two and up to six more years (<Ext href={AXIOS}>Axios</Ext>).
        </li>
      </Bullets>

      <H2>How the deal worked</H2>
      <p>
        According to a memo signed by battalion commander Lt. Col. Ryan Hodgson, soldiers in the unit who reenlisted between 1 August and 14 November 2026 got a &ldquo;special 4-day pass&rdquo; designated to coincide with the release of GTA VI, with the exact dates worked out with their chain of command (<Ext href={TP_AUG}>Task & Purpose</Ext>).
        Tomko told Axios the pass came on top of the Army&rsquo;s standard reenlistment incentives, not instead of them. Axios, citing the Army, says one soldier received more than $60,000 in bonuses under those standard incentives as well as the GTA pass, and does not name him (<Ext href={AXIOS}>Axios</Ext>).
      </p>
      <p>
        Task & Purpose profiles Sgt. Jamire Smith, a combat engineer who signed on for six more years. It reports his reenlistment came with a $60,000 bonus because the Army wanted to keep the skills he gained driving heavy breaching vehicles, and that he had been in the process of leaving the Army. His plans for the weekend: &ldquo;I&rsquo;m all campaign. I&rsquo;m all about the heist&rdquo; (<Ext href={TP}>Task & Purpose</Ext>).
      </p>

      <H2>Whose idea it was</H2>
      <p>
        Staff Sgt. Brittany Wolfer, the battalion&rsquo;s career counselor, pitched the perk to her command. She told Task & Purpose she got the idea from Sgt. Maj. Celeste R. Spencer, a senior Army career counselor who floated a GTA weekend in a TikTok video about retention incentives. Wolfer called it an &ldquo;eye grabber&rdquo; and said &ldquo;it&rsquo;s not supposed to be the deciding factor&rdquo;, but a way to show soldiers that senior leaders see what they care about (<Ext href={TP}>Task & Purpose</Ext>).
      </p>
      <p>
        Wolfer does not get the four-day pass herself. She also had a request for Rockstar: put Rocky the Bulldog, the 3rd Infantry Division&rsquo;s mascot, in the game (<Ext href={TP}>Task & Purpose</Ext>).
      </p>

      <H2>What the Army says</H2>
      <p>
        &ldquo;The excitement from this incentive has sparked positive conversations amongst Soldiers to discuss the continuation of their service in the Army,&rdquo; Tomko told Axios (<Ext href={AXIOS}>Axios</Ext>). Neither the Army nor the outlets say how many of the 43 would have reenlisted anyway, and Task & Purpose notes the soldiers it spoke to already had other reasons to sign up.
      </p>

      <H2>The Army link inside the game</H2>
      <p>
        There is a small in-game connection too. Rockstar&rsquo;s official description of <Link href="/database/characters/jason-duval" className={L}>Jason Duval</Link> says that after &ldquo;a stint in the Army&rdquo; he found himself in the Keys working for local drug runners (<Ext href={ROCKSTAR}>Rockstar Games</Ext>, also quoted by Task & Purpose). If you are one of the soldiers with four days to fill, our <Link href="/guides/beginner" className={L}>GTA 6 beginner guide</Link> is the place to start, and <Link href={newsPath("gta-6-file-size-time-to-beat")} className={L}>GTA 6 file size and time to beat</Link> has the story length that VGC and GameSpot report.
      </p>

      <Sources>
        <Source href={ROCKSTAR} label="Rockstar Games: Only in Leonida, Jason Duval (read 20 Nov 2026, 10:06 AEST)" kind="Official, for the line about Jason" />
        <Source href={AXIOS} label="Axios (Herb Scribner): Here's how many soldiers took the Army's GTA VI deal, 19 Nov 2026, with Army statements (read 20 Nov 2026, 10:04 AEST)" kind="News outlet, primary for the Army figures" />
        <Source href={TP} label="Task & Purpose (Patty Nieberg): 43 soldiers signed up to play 'GTA VI' in exchange for more service, 18 Nov 2026 (read 20 Nov 2026, 10:04 AEST)" kind="News outlet, original report" />
        <Source href={TP_AUG} label="Task & Purpose (Patty Nieberg): Army unit offers soldiers time off for 'GTA 6' debut if they reenlist, 18 Aug 2026 (read 20 Nov 2026, 10:03 AEST)" kind="News outlet" />
        <Source href={POLY} label="Polygon (Sam Hill): GTA 6 gamble to get Army soldiers to reenlist actually worked, 19 Nov 2026 (read 20 Nov 2026, 10:02 AEST)" kind="News outlet" />
      </Sources>
    </NewsLayout>
  );
}
