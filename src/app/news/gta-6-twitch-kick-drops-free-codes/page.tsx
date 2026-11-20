import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-twitch-kick-drops-free-codes";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const TWITCH_BLOG = "https://blog.twitch.tv/en/2026/11/17/the-wait-is-over-gtavi-is-live/";
const GAMESPOT = "https://www.gamespot.com/articles/gta-6-twitch-drops/";
const KICK_HELP = "https://help.kick.com/en/articles/18357299-sunset-reward-case-claim-a-free-copy-of-gta-vi-on-kick";
const KICK_PRESS = "https://about.kick.com/news-and-press/13-sunset-reward-case";
const DEXERTO = "https://www.dexerto.com/gta/kick-and-twitch-are-giving-away-thousands-of-gta-6-codes-to-viewers-before-launch-3428151/";

// Sourcing (all read 20 Nov 2026, 22:10-22:16 AEST):
// - Twitch blog "The wait is over. GTAVI is LIVE", 17 Nov 2026: campaign from 3 AM PT / 6 AM ET on 18 Nov (21:00 AEST 18 Nov) to 30 Nov; codes claim deadline 7 Dec 11:59 PM PST (17:59 AEST 8 Dec).
// - GameSpot (Darryn Bonthuys), 18 Nov 2026 3:00 AM PST: same rewards, plus Prime subs don't count, plus the "Drops Enabled" search steps. GameSpot also says the
//   code details "have not been revealed yet" (at its writing); Twitch's blog describes surprise drops with a notification, so we use Twitch's wording.
// - Kick Help Center (undated, "updated over a week ago") and Kick press post 12 Nov 2026: 180 minutes of live content unlocks a Sunset Reward Case.
//   Neither Kick page gives a code count or an end date. Dexerto (Zackerie Fairfax, 13 Nov) says Kick's terms list 10,000 codes and an end of 7 Dec: label unconfirmed here.
// - Twitch and Kick both state the campaigns are not affiliated with Rockstar Games / Take-Two; nothing here is attributed to Rockstar.
// - Latest @Twitch campaign post we saw: 18 Nov (03:19 UTC); none changed the dates.

const TWITCH_ROWS: React.ReactNode[][] = [
  ["Bling Badge Collection", "Six chat badges: watch GTA VI streamers for one hour on each of six different days between 18 and 30 Nov. One hour a day earns one badge.", <Ext key="a" href={TWITCH_BLOG}>Twitch</Ext>],
  ["Heist Collection", "Subscribe to GTA VI streamers in the GTA VI category: one random badge and emote combo per sub, three subs for all three. GameSpot says Prime subs don\u2019t count.", <span key="b"><Ext href={TWITCH_BLOG}>Twitch</Ext>, <Ext href={GAMESPOT}>GameSpot</Ext></span>],
  ["Heist Train badges", "Contribute to a completed Hype Train level on any GTA VI streamer\u2019s channel between 18 and 30 Nov.", <Ext key="c" href={TWITCH_BLOG}>Twitch</Ext>],
  ["Golden Iguana badge", "Earn every emote and badge in the Bling Badge and Heist Collections.", <Ext key="d" href={TWITCH_BLOG}>Twitch</Ext>],
  ["Ultimate Edition game codes", "Surprise drops to viewers daily from launch through 30 Nov. Twitch notifies you; claim in Drops and Rewards by 7 Dec, 11:59 PM PST (17:59 AEST, 8 Dec).", <Ext key="e" href={TWITCH_BLOG}>Twitch</Ext>],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Streamers" title="GTA 6 free codes: Twitch and Kick drops" source="Twitch, Kick, GameSpot, Dexerto">
      <Lede>
        You don&rsquo;t have to be the one playing to get something out of GTA 6. Twitch and Kick are both rewarding viewers who watch GTA 6 streams, with chat badges and emotes on Twitch and
        a chance at a free GTA 6 Ultimate Edition code on both. Here is how each campaign works, the dates, and the fine print.
      </Lede>

      <H2>Twitch: badges, emotes and surprise codes</H2>
      <p>
        Twitch says its GTA VI rewards started at 3 AM PT on 18 Nov, which is 21:00 AEST that evening, and run through 30 Nov (<Ext href={TWITCH_BLOG}>Twitch</Ext>).
        GameSpot&rsquo;s walkthrough says these are Twitch-exclusive rewards, not items inside GTA 6 (<Ext href={GAMESPOT}>GameSpot</Ext>).
      </p>
      <DataTable head={["Reward", "How you earn it", "Source"]} rows={TWITCH_ROWS} minWidth="34rem" />
      <Bullets>
        <li>
          <Lead>Finding a drops-enabled stream:</Lead> GameSpot says to search for GTA 6, add the &ldquo;Drops Enabled&rdquo; tag under live channels, and pick a channel; eligible channels show a
          &ldquo;Drops enabled&rdquo; message at the top of chat (<Ext href={GAMESPOT}>GameSpot</Ext>).
        </li>
        <li>
          <Lead>The codes are not guaranteed:</Lead> Twitch says code availability is limited by platform and region (<Ext href={TWITCH_BLOG}>Twitch</Ext>). Dexerto reported on 13 Nov that Twitch had not said how many codes there are (<Ext href={DEXERTO}>Dexerto</Ext>).
        </li>
      </Bullets>

      <H2>Kick: the Sunset Reward Case</H2>
      <Bullets>
        <li>
          <Lead>How it works:</Lead> log in to Kick and watch 180 minutes of any live content to unlock a Sunset Reward Case, then open it for a chance at an Ultimate Edition code for Xbox or PS5. The watch requirement resets daily, so you can unlock a new case each day (<Ext href={KICK_HELP}>Kick Help Center</Ext>).
        </li>
        <li>
          <Lead>No guarantee:</Lead> Kick says winning isn&rsquo;t guaranteed and that copies are limited, and its press post says the case has &ldquo;thousands of copies&rdquo; of GTA VI. New users can open a free case after finishing onboarding (<Ext href={KICK_HELP}>Kick Help Center</Ext>, <Ext href={KICK_PRESS}>Kick</Ext>).
        </li>
        <li>
          <Lead>Platform rules:</Lead> Xbox codes are global and limited to Xbox Series X|S. For PS5, the country you pick has to match your PSN account, not where you are right now (<Ext href={KICK_HELP}>Kick Help Center</Ext>).
        </li>
        <li>
          <Lead>When codes arrive:</Lead> Kick says codes will not be issued before 19 Nov and may be issued later, once available and your eligibility is verified. They show up on your Drops and Rewards page (<Ext href={KICK_HELP}>Kick Help Center</Ext>).
        </li>
        <li>
          <Lead>Reported, not on Kick&rsquo;s pages:</Lead> Dexerto says Kick&rsquo;s terms list 10,000 codes and a campaign that runs to 7 Dec (<Ext href={DEXERTO}>Dexerto</Ext>). Kick&rsquo;s help page and press post do not state either figure, so treat them as unconfirmed.
        </li>
      </Bullets>

      <H2>Before you enter</H2>
      <p>
        Both platforms say they are not affiliated with Rockstar Games or Take-Two. These are stream-platform promotions, so the codes come from Twitch and Kick, not from Rockstar. Redeem them on the Xbox or PlayStation account you want to play on.
        Twitch says you claim a code in your Drops and Rewards inventory, and Kick says codes show up on your Drops and Rewards page. <strong>Our advice:</strong> treat any offer that asks you to pay, or to claim a code somewhere else, with suspicion, because that is not what either platform describes. If you already own the game, our{" "}
        <Link href={newsPath("gta-6-preload-editions-pricing")} className={L}>editions and pricing guide</Link> explains what the Ultimate Edition includes.
      </p>
      <p>
        Want to see what the audience looks like? The{" "}
        <Link href={newsPath("gta-6-streaming-viewership-peak")} className={L}>launch streaming records</Link> and{" "}
        <Link href={newsPath("gta-6-launch-streams-schedule")} className={L}>who went live</Link> pages have the numbers and the names.
      </p>

      <Callout title="What is not confirmed" tone="unconfirmed">
        <p>
          Twitch has not said how many codes it is giving away, and neither platform guarantees a code. GameSpot&rsquo;s 18 Nov walkthrough said details on how to receive a code had not been revealed at that point; Twitch&rsquo;s own post says
          codes arrive by surprise drop with a notification. The 10,000-code count and the 7 Dec end date for Kick come from Dexerto only. Campaign terms can change, so check the platform pages before you spend hours watching.
        </p>
      </Callout>

      <Sources>
        <Source href={TWITCH_BLOG} label="Twitch blog: The wait is over. GTAVI is LIVE, 17 Nov 2026 (read 22:12 AEST, 20 Nov)" kind="Official" />
        <Source href={GAMESPOT} label="GameSpot (Darryn Bonthuys): GTA 6 Twitch Drops Are Live, Here's How To Get Your Free Rewards, 18 Nov 2026 (read 22:12 AEST, 20 Nov)" kind="News outlet" />
        <Source href={KICK_HELP} label="Kick Help Center: Sunset Reward Case, claim a free copy of GTA VI on KICK (read 22:13 AEST, 20 Nov)" kind="Official" />
        <Source href={KICK_PRESS} label="Kick news and press: Sunset Reward Case, 12 Nov 2026 (read 22:13 AEST, 20 Nov)" kind="Official" />
        <Source href={DEXERTO} label="Dexerto (Zackerie Fairfax): Kick and Twitch are giving away thousands of GTA 6 codes, 13 Nov 2026 (read 22:13 AEST, 20 Nov)" kind="News outlet" />
      </Sources>
    </NewsLayout>
  );
}
