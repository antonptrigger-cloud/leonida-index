import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-streaming-viewership-peak";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const SC_RECAP = "https://streamscharts.com/news/gta-6-day1-recap";
const SC_X_PEAK = "https://x.com/StreamsCharts/status/2123408702220992617";
const SC_X_HOURS = "https://x.com/StreamsCharts/status/2123452504167833655";
const VARIETY = "https://variety.com/2026/gaming/news/gta-6-launch-livestream-internet-traffic-records-1236953145/";

// Streams Charts day-one recap (published 19 Nov 2026) and Streams Charts X posts, read 04:58-05:05 AEST, 20 Nov 2026.
// Platform peaks are Streams Charts' preliminary figures as reported by Variety (19 Nov, 7:09 a.m. PT = 01:09 AEST 20 Nov).
const DAY1: React.ReactNode[][] = [
  ["Peak concurrent viewers, all tracked platforms", "7.91 million", <Ext key="r" href={SC_RECAP}>Streams Charts recap</Ext>],
  ["Twitch peak", "3.31 million", <Ext key="v1" href={SC_RECAP}>Streams Charts recap</Ext>],
  ["YouTube peak", "3.22 million", <Ext key="v2" href={SC_RECAP}>Streams Charts recap</Ext>],
  ["Kick peak", "1.50 million", <Ext key="v3" href={SC_RECAP}>Streams Charts recap</Ext>],
  ["Hours watched, first 24 hours", "125.47 million", <Ext key="r2" href={SC_RECAP}>Streams Charts recap</Ext>],
  ["Hours watched by platform", "Twitch 52.3M (41.7%), YouTube 44M (35.1%), Kick 27.8M (22.1%)", <Ext key="x" href={SC_X_HOURS}>@StreamsCharts, 16:25 UTC 19 Nov (02:25 AEST 20 Nov)</Ext>],
];

// Readings 19 Nov 2026: NextCounts page updated 06:00:07 UTC (read 16:01 AEST); luciastream public JSON at 06:01-06:02 UTC (read 16:02 AEST).
const PEAKS: string[][] = [
  ["Twitch + Kick + YouTube", "7,397,262 (combined recorded peak)", "NextCounts", "15:59 UTC, 18 Nov (01:59 AEST, 19 Nov)"],
  ["Twitch + Kick + YouTube", "6,412,309 (its recorded peak)", "luciastream", "15:26 UTC, 18 Nov (01:26 AEST, 19 Nov)"],
  ["Twitch alone", "3,343,379", "NextCounts", "23:06 UTC, 18 Nov (09:06 AEST, 19 Nov)"],
  ["YouTube alone", "3,094,231", "NextCounts", "15:10 UTC, 18 Nov (01:10 AEST, 19 Nov)"],
  ["Kick alone", "1,462,371", "NextCounts", "16:35 UTC, 18 Nov (02:35 AEST, 19 Nov)"],
];

const NOW: string[][] = [
  ["NextCounts", "3,444,936", "Twitch 1,225,405 (123,748 channels), Kick 1,160,356, YouTube 1,059,175", "06:00 UTC (16:00 AEST)"],
  ["luciastream", "2,452,709 (8,118 channels)", "Kick 1,011,623, Twitch 998,682, YouTube 442,404", "06:02 UTC (16:02 AEST)"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Streamers" title="GTA 6 streams peak at 7.9M viewers" source="Streams Charts, Variety, NextCounts, luciastream, BBC">
      <Lede>
        Analytics firm Streams Charts says GTA 6 peaked at 7.91 million concurrent viewers across livestreaming platforms in its first 24 hours, with 125.47 million hours watched. It calls
        that more than 4.5 times the previous record holder, Valorant&rsquo;s 1.74 million (<Ext href={SC_RECAP}>Streams Charts</Ext>). Other trackers recorded lower combined peaks,
        because each one counts differently. These are tracker figures, not platform figures, and every figure below carries its source and when it was recorded or reported.
      </Lede>

      <H2>Day one, by Streams Charts</H2>
      <DataTable head={["Measure", "Figure", "Source"]} rows={DAY1} minWidth="34rem" />
      <p className="text-xs text-muted">
        Streams Charts tracks Twitch, YouTube and Kick, plus the Korean platforms CHZZK and SOOP, which it says added 667K and 661K hours watched. Variety, which reported the same platform peaks, calls them
        preliminary. Each platform peak is that platform&rsquo;s own high, so the three do not add up to the combined peak. We did not see a time for the 7.91 million peak in what we read;
        Streams Charts posted &ldquo;Global peak: 7.9 MILLION&rdquo; when the worldwide rollout finished, at 13:31 UTC on 19 Nov (23:31 AEST) (<Ext href={SC_X_PEAK}>@StreamsCharts</Ext>).
      </p>
      <Bullets>
        <li>
          <Lead>Records:</Lead> Streams Charts says GTA 6 is now the most popular game ever on Twitch and Kick, sits second among YouTube titles, and set a one-day record
          for hours watched by a single game on both Twitch and Kick (<Ext href={SC_RECAP}>Streams Charts</Ext>). Variety reports, per Streams Charts, that it passed League of Legends
          for the highest peak in Twitch history (<Ext href={VARIETY}>Variety</Ext>).
        </li>
        <li>
          <Lead>What Twitch said:</Lead> per data Twitch gave Variety before 1 p.m. ET on 18 Nov, GTA 6 streams broke Valorant&rsquo;s 2020 record of 1.7 million concurrent viewers within
          the first six hours of availability in New Zealand, and overall Twitch viewership was up 111% on the previous week (<Ext href={VARIETY}>Variety</Ext>).
        </li>
        <li>
          <Lead>Top streamers, day one:</Lead> by hours watched, Streams Charts ranks IShowSpeed first (4.47 million across YouTube and Twitch), then TheBurntPeanut (3.89 million) and
          alanzoka (3.11 million, all on Twitch). By peak, combining multistreams, IlloJuan led at 562K, and Windah Basudara&rsquo;s first GTA 6 broadcast hit 392.5K, his channel&rsquo;s
          biggest stream (<Ext href={SC_RECAP}>Streams Charts</Ext>).
        </li>
      </Bullets>

      <H2>Other trackers: recorded peaks</H2>
      <DataTable head={["Platforms", "Peak concurrent viewers", "Tracker", "When recorded"]} rows={PEAKS} minWidth="34rem" />
      <p className="text-xs text-muted">
        The two trackers sample differently, so their peaks do not match. NextCounts says its chart uses hourly samples and adds the platforms only where each
        has a sample for that hour; luciastream says its peak is its highest one-minute reading. Both peaks came before the US and Canada unlock at 15:00 AEST on 19 Nov.
      </p>

      <H2>Snapshot after the US unlock</H2>
      <DataTable head={["Tracker", "Combined viewers", "Split", "When (19 Nov)"]} rows={NOW} minWidth="34rem" />
      <Bullets>
        <li>
          <Lead>Why the trackers differ:</Lead> the biggest gap is YouTube. NextCounts notes that YouTube rounds each game&rsquo;s live total, so that part of its count moves in steps (
          <Ext href="https://nextcounts.com/games/grand-theft-auto-vi">NextCounts</Ext>). luciastream says each platform lets it discover live channels to a different depth (
          <Ext href="https://luciastream.com/press/">luciastream</Ext>). Streams Charts also counts CHZZK and SOOP.
        </li>
        <li>
          <Lead>Biggest single stream:</Lead> luciastream lists HoneyMad on Twitch as its top stream for the day, at 642,053 viewers (luciastream public data, read 16:02 AEST, 19 Nov).
          Streams Charts&rsquo; top peak, IlloJuan&rsquo;s 562K, combines his streams across platforms, so the two lists are not measuring the same thing.
        </li>
        <li>
          <Lead>BBC:</Lead> its live page reported more than 2.4 million people watching gamers play GTA 6 on Twitch at 12:00 GMT on 18 Nov (22:00 AEST) (
          <Ext href="https://www.bbc.com/news/live/c60rkg21dl22t">BBC News</Ext>).
        </li>
        <li>
          <Lead>Earlier snapshot:</Lead> at about 23:10 AEST on 18 Nov, two hours after the New Zealand unlock, luciastream showed 4,205,792 across all three platforms and NextCounts
          showed 3,688,850 across Twitch and Kick. Both were overtaken later that night.
        </li>
        <li>
          <Lead>Comparison:</Lead> luciastream says the highest GTA V peak it recorded was 992,344 concurrent viewers, at 19:21 UTC on 27 Aug 2026, across the same three
          platforms (<Ext href="https://luciastream.com/press/">luciastream</Ext>).
        </li>
      </Bullets>

      <p>
        Want the launch streams themselves? See <Link href={newsPath("gta-6-launch-streams-schedule")} className={L}>who went live</Link>. The launch also set download records:
        see the <Link href={newsPath("gta-6-nbn-australia-traffic-record")} className={L}>NBN record in Australia</Link>, and check the{" "}
        <Link href={newsPath("gta-6-ps5-update-patches-servers")} className={L}>server status tracker</Link> if your own game will not connect.
      </p>

      <Callout title="How to read these numbers" tone="unconfirmed">
        <p>
          These are third-party trackers, not platform statements. By luciastream&rsquo;s own explanation, its total adds up the viewers each platform reports for every live GTA stream,
          so someone watching two streams counts twice. Streams Charts, NextCounts and luciastream each count differently, so their peaks will not match. Twitch confirmed to Variety
          that the Valorant record fell, but we have not seen Twitch, Kick or YouTube publish their own GTA 6 peak figure, so the 7.91 million is Streams Charts&rsquo; number, not an official one.
        </p>
      </Callout>

      <Sources>
        <Source href={SC_RECAP} label="Streams Charts (Ravi Iyer): GTA 6's first 24 hours, viewership records and top streamers, 19 Nov 2026 (read 05:00 AEST, 20 Nov)" kind="Analytics firm" />
        <Source href={SC_X_PEAK} label="@StreamsCharts: worldwide rollout complete, global peak 7.9M, 13:31 UTC 19 Nov" kind="Analytics firm, X post" />
        <Source href={SC_X_HOURS} label="@StreamsCharts: 125.4M hours watched in first 24 hours, platform breakdown, 16:25 UTC 19 Nov" kind="Analytics firm, X post" />
        <Source href={VARIETY} label="Variety (Jennifer Maas): GTA 6 launch breaks internet usage records; livestreams hit nearly 8 million, 19 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.bbc.com/news/live/c60rkg21dl22t" label="BBC News live page" kind="News" />
        <Source href="https://nextcounts.com/games/grand-theft-auto-vi" label="NextCounts: GTA VI live viewers (page updated 06:00 UTC, 19 Nov; read 16:01 AEST)" kind="Third-party tracker" />
        <Source href="https://luciastream.com/press/" label="luciastream: GTA streaming data (public JSON read 16:02 AEST, 19 Nov)" kind="Third-party tracker" />
      </Sources>
    </NewsLayout>
  );
}
