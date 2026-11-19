import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-launch-streams-schedule";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

// Live status read from Twitch at 12:59 AEST, 19 Nov 2026 (channel uptime); refresh if the page is updated again.
const ROWS: React.ReactNode[][] = [
  ["Kai Cenat", "8 PM ET, Wed 18 Nov", "11:00 AEST, Thu 19 Nov", "Live on Twitch from about 23:00 AEST, Wed 18 Nov (approximate, from Twitch uptime). Still live at about 13:00 AEST, 19 Nov", "His own X post; Twitch"],
  ["IShowSpeed", "9 PM (ET per Tech Times), Wed 18 Nov", "12:00 AEST, Thu 19 Nov", "Live on Twitch from about 23:18 AEST, Wed 18 Nov (approximate, from Twitch uptime). Still live at about 13:00 AEST, 19 Nov", "His own X post; Twitch"],
  ["YouTube 24-hour stream", "Pre-show 11 PM ET Wed 18 Nov; main stream midnight ET", "Pre-show 14:00 AEST; main stream 15:00 AEST, Thu 19 Nov", "Not started when we checked at 13:00 AEST", "YouTube Blog"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Streamers" title="GTA 6 launch streams: who goes live" source="Kai Cenat and IShowSpeed on X, Tech Times, Sportskeeda">
      <Lede>
        Kai Cenat and IShowSpeed were both live on Twitch with GTA 6 when we checked at about 13:00 AEST on 19 Nov, far earlier than the evening start times they had posted (8 PM ET and 9 PM ET on 18 Nov, which is 11:00 and 12:00 AEST on 19 Nov). Twitch uptime puts Kai Cenat&rsquo;s start at about
        23:00 AEST on 18 Nov and IShowSpeed&rsquo;s at about 23:18 AEST, roughly 12 hours before those posted times (approximate). YouTube&rsquo;s official 24-hour broadcast is still to come, with a pre-show at 14:00 AEST and the main stream at 15:00 AEST.
      </Lede>

      <H2>Announced times and what happened</H2>
      <DataTable head={["Stream", "Announced (ET)", "Announced (Brisbane)", "What happened", "Source"]} rows={ROWS} minWidth="44rem" />
      <p className="text-xs text-muted">
        ET is UTC-5 on these dates. Brisbane is UTC+10 all year. Go-live times are worked back from each channel&rsquo;s Twitch uptime at about 13:00 AEST, so treat them as approximate. We have not seen either streamer explain the earlier start.
      </p>

      <H2>What each source says</H2>
      <Bullets>
        <li>
          <Lead>Kai Cenat:</Lead> his Twitch stream, titled &ldquo;PLAYING GTA 6 FOR THE FIRST TIME&rdquo;, was live when we checked at 12:59 AEST (<Ext href="https://www.twitch.tv/kaicenat">Twitch</Ext>). His own X post had said &ldquo;GTA 6 FULL PLAY THROUGH, NOVEMBER 18TH 8PM EST&rdquo; (
          <Ext href="https://x.com/KaiCenat/status/2122427634743214114">@KaiCenat</Ext>). Sportskeeda said the broadcast would be on his YouTube and Twitch channels (
          <Ext href="https://www.sportskeeda.com/us/streamers/news-kai-cenat-s-gta-6-marathon-livestream-date-time-livestream-link">Sportskeeda</Ext>). Tech Times reported he planned to marathon from the start.
        </li>
        <li>
          <Lead>IShowSpeed:</Lead> his Twitch stream was live when we checked at 12:59 AEST (<Ext href="https://www.twitch.tv/ishowspeed">Twitch</Ext>). His own X post had said &ldquo;LIVE PLAYING GTA 6 NOV 18 AT 9PM&rdquo; with no time zone (
          <Ext href="https://x.com/ishowspeedsui/status/2122463228987129932">@ishowspeedsui</Ext>). Tech Times read that as 9 PM ET and reported roughly 10 to 12 hours a day after that rather than one marathon, with
          outlets differing on the exact length. Before launch it said no report named his platform (
          <Ext href="https://www.techtimes.com/articles/330968/20261117/ishowspeed-gta-6-stream-starts-3-hours-before-us-unlock-plans-10-12-hour-days-no-marathon.htm">Tech Times</Ext>).
        </li>
        <li>
          <Lead>YouTube:</Lead> YouTube&rsquo;s own blog says the 24-hour stream starts at 12 AM ET on 19 Nov on youtube.com/youtube, after a pre-show hosted by RDCWorld from 11 PM ET on 18 Nov, and wraps with on-the-ground coverage from Miami. It names Caylus, Zhong and Kat, Jelly, Rivers, Jake Baldino and Cinna among the creators (
          <Ext href="https://blog.youtube/news-and-events/youtube-rockstar-games-gta-vi-launch/">YouTube Blog</Ext>). Tech Times reports 31 creators in total.
        </li>
        <li>
          <Lead>Others:</Lead> Tech Times, citing The Loadout, lists Ludwig (nonstop, with a viewer code every hour), Michou (French-language Twitch, start time zone not given) and CORE
          streamers including Clix (from a Miami house). Tech Times also lists DDG&rsquo;s first marathon, on Kick.
        </li>
      </Bullets>

      <H2>How big the streams got</H2>
      <p>
        Kompas, citing a Streams Charts post, reports that Indonesia&rsquo;s Windah Basudara had the highest GTA 6 peak so far with 392,505 concurrent viewers on YouTube, ahead of IShowSpeed with 371,840, also on YouTube (
        <Ext href="https://tekno.kompas.com/read/2026/11/19/09050067/windah-basudara-jadi-streamer-gta-6-paling-banyak-ditonton-lampaui-ishowspeed">Kompas, in Indonesian, 19 Nov</Ext>). These are Streams Charts figures relayed by Kompas, and we could not open the original post. We have not found a Streams Charts peak figure for Kai Cenat. Overall launch numbers are in our{" "}
        <Link href={newsPath("gta-6-streaming-viewership-peak")} className={L}>streaming viewership tracker</Link>.
      </p>

      <Callout title="Unconfirmed" tone="unconfirmed">
        <p>
          BBC reports GTA 6 unlocks at midnight local time around the world. By our release-time page, New Zealand unlocked at 21:00 AEST and Queensland at 23:00 AEST on 18 Nov, so the game
          was already out in parts of the world when both streams went live. Neither streamer has said where or how they are playing, and no report we have read explains it. We
          are not guessing. See our <Link href={newsPath("gta-6-live-new-zealand-launch-report")} className={L}>launch report</Link> for how regional unlocks work.
        </p>
      </Callout>

      <H2>Spoiler note</H2>
      <p>
        Kai Cenat told fans to stay off social media at launch. Sportskeeda quotes him from the end of his earlier marathon through the five previous GTA games: he said it &ldquo;is gonna get bad&rdquo; for spoilers and asked viewers to stay
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
        <Source href="https://www.twitch.tv/kaicenat" label="Kai Cenat on Twitch (live status read 12:59 AEST, 19 Nov 2026)" kind="Primary (streamer's own channel)" />
        <Source href="https://www.twitch.tv/ishowspeed" label="IShowSpeed on Twitch (live status read 12:59 AEST, 19 Nov 2026)" kind="Primary (streamer's own channel)" />
        <Source href="https://blog.youtube/news-and-events/youtube-rockstar-games-gta-vi-launch/" label="YouTube Blog: 24-hour GTA VI launch livestream" kind="Official, platform" />
        <Source href="https://tekno.kompas.com/read/2026/11/19/09050067/windah-basudara-jadi-streamer-gta-6-paling-banyak-ditonton-lampaui-ishowspeed" label="Kompas, citing Streams Charts: GTA 6 peak viewers, 19 Nov 2026 (in Indonesian)" kind="Reputable outlet" />
      </Sources>
    </NewsLayout>
  );
}
