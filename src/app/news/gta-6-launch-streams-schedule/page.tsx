import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-launch-streams-schedule";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const ROWS: React.ReactNode[][] = [
  ["Kai Cenat", "8 PM ET, Wed 18 Nov", "11:00 AEST, Thu 19 Nov", "Kai Cenat's own X post; Sportskeeda"],
  ["IShowSpeed", "9 PM (ET per Tech Times), Wed 18 Nov", "12:00 AEST, Thu 19 Nov", "IShowSpeed's own X post; Tech Times (platform not named)"],
  ["YouTube 24-hour stream", "Midnight ET, Thu 19 Nov", "15:00 AEST, Thu 19 Nov", "Tech Times"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Streamers" title="GTA 6 launch streams: who goes live" source="Kai Cenat and IShowSpeed on X, Tech Times, Sportskeeda">
      <Lede>
        Two of the biggest names in streaming plan to start GTA 6 before the US unlock, and YouTube is running a 24-hour broadcast from midnight ET. Here is who is going live, and
        when, in ET and Brisbane time.
      </Lede>

      <H2>Start times</H2>
      <DataTable head={["Stream", "Start (ET)", "Start (Brisbane)", "Source"]} rows={ROWS} minWidth="36rem" />
      <p className="text-xs text-muted">ET is UTC-5 on these dates. Brisbane is UTC+10 all year. These are announced times and can change.</p>

      <H2>What each source says</H2>
      <Bullets>
        <li>
          <Lead>Kai Cenat:</Lead> his own X post says &ldquo;GTA 6 FULL PLAY THROUGH, NOVEMBER 18TH 8PM EST&rdquo; (
          <Ext href="https://x.com/KaiCenat/status/2122427634743214114">@KaiCenat</Ext>). Sportskeeda says the broadcast will be on his YouTube and Twitch channels (
          <Ext href="https://www.sportskeeda.com/us/streamers/news-kai-cenat-s-gta-6-marathon-livestream-date-time-livestream-link">Sportskeeda</Ext>). Tech Times reports he plans to marathon from the start.
        </li>
        <li>
          <Lead>IShowSpeed:</Lead> his own X post says &ldquo;LIVE PLAYING GTA 6 NOV 18 AT 9PM&rdquo; with no time zone (
          <Ext href="https://x.com/ishowspeedsui/status/2122463228987129932">@ishowspeedsui</Ext>). Tech Times reads that as 9 PM ET and reports roughly 10 to 12 hours a day after that rather than one marathon, with
          outlets differing on the exact length. It says no report names his platform (
          <Ext href="https://www.techtimes.com/articles/330968/20261117/ishowspeed-gta-6-stream-starts-3-hours-before-us-unlock-plans-10-12-hour-days-no-marathon.htm">Tech Times</Ext>).
        </li>
        <li>
          <Lead>YouTube:</Lead> Tech Times reports an official 24-hour main stream starting at midnight ET on youtube.com/youtube, featuring 31 creators, with a pre-show at 11 PM ET.
        </li>
        <li>
          <Lead>Others:</Lead> Tech Times, citing The Loadout, lists Ludwig (nonstop, with a viewer code every hour), Michou (French-language Twitch, start time zone not given) and CORE
          streamers including Clix (from a Miami house). Tech Times also lists DDG&rsquo;s first marathon, on Kick.
        </li>
      </Bullets>

      <Callout title="Unconfirmed" tone="unconfirmed">
        <p>
          BBC reports GTA 6 unlocks at midnight local time around the world. Tech Times, citing store-listing timestamps, says the game would already be live in places such as the UK by
          7 PM ET, so a start at 8 or 9 PM ET does not by itself mean anything unusual. It also says no report explains how Speed will be playing, and we have not seen either streamer say. We
          are not guessing. See our <Link href={newsPath("gta-6-live-new-zealand-launch-report")} className={L}>launch report</Link> for how regional unlocks work.
        </p>
      </Callout>

      <H2>Spoiler note</H2>
      <p>
        Kai Cenat has told fans to stay off social media at launch. Sportskeeda quotes him from the end of his earlier marathon through the five previous GTA games: he said it &ldquo;is gonna get bad&rdquo; for spoilers and asked viewers to stay
        off Twitter and TikTok. We do not discuss story or missions on this page.
      </p>

      <H2>Posts</H2>
      <p>
        Kai Cenat&rsquo;s and IShowSpeed&rsquo;s start times come from their own posts, each a short promo video: <Ext href="https://x.com/KaiCenat/status/2122427634743214114">@KaiCenat</Ext> (3 minutes) and{" "}
        <Ext href="https://x.com/ishowspeedsui/status/2122463228987129932">@ishowspeedsui</Ext> (48 seconds). We link them and do not embed or describe them.
      </p>

      <Sources>
        <Source href="https://x.com/KaiCenat/status/2122427634743214114" label="@KaiCenat on X: stream announcement" kind="Primary (streamer's own post)" />
        <Source href="https://www.sportskeeda.com/us/streamers/news-kai-cenat-s-gta-6-marathon-livestream-date-time-livestream-link" label="Sportskeeda" kind="News" />
        <Source href="https://www.techtimes.com/articles/330968/20261117/ishowspeed-gta-6-stream-starts-3-hours-before-us-unlock-plans-10-12-hour-days-no-marathon.htm" label="Tech Times" kind="News" />
        <Source href="https://x.com/ishowspeedsui/status/2122463228987129932" label="@ishowspeedsui on X: stream announcement" kind="Primary (streamer's own post)" />
      </Sources>
    </NewsLayout>
  );
}
