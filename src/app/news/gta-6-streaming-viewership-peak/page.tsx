import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-streaming-viewership-peak";
export const metadata = metaFor(newsPath(SLUG));

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
    <NewsLayout slug={SLUG} kicker="News · Streamers" title="GTA 6 streams peak above 6M viewers" source="NextCounts, luciastream, BBC">
      <Lede>
        Third-party tracker NextCounts puts the combined peak for GTA 6 streams across Twitch, Kick and YouTube at 7.4 million concurrent viewers, recorded
        at 15:59 UTC on 18 Nov (01:59 AEST on 19 Nov). A second tracker, luciastream, recorded a lower combined peak of 6.4 million at 15:26 UTC. Both peaks came
        before the US and Canada unlock scheduled for 15:00 AEST on 19 Nov. At about 16:00 AEST the trackers showed about 2.5 to 3.4 million. These are tracker
        figures, not platform figures, and every figure below carries the time it was recorded.
      </Lede>

      <H2>Recorded peaks</H2>
      <DataTable head={["Platforms", "Peak concurrent viewers", "Tracker", "When recorded"]} rows={PEAKS} minWidth="34rem" />
      <p className="text-xs text-muted">
        The two trackers sample differently, so their peaks do not match. NextCounts says its chart uses hourly samples and adds the platforms only where each
        has a sample for that hour; luciastream says its peak is its highest one-minute reading.
      </p>

      <H2>Latest reading, after the US unlock</H2>
      <DataTable head={["Tracker", "Combined viewers", "Split", "When (19 Nov)"]} rows={NOW} minWidth="34rem" />
      <Bullets>
        <li>
          <Lead>Why the trackers differ:</Lead> the biggest gap is YouTube. NextCounts notes that YouTube rounds each game&rsquo;s live total, so that part of its count moves in steps (
          <Ext href="https://nextcounts.com/games/grand-theft-auto-vi">NextCounts</Ext>). luciastream says each platform lets it discover live channels to a different depth (
          <Ext href="https://luciastream.com/press/">luciastream</Ext>).
        </li>
        <li>
          <Lead>Biggest single stream:</Lead> luciastream lists HoneyMad on Twitch as its top stream for the day, at 642,053 viewers (luciastream public data, read 16:02 AEST, 19 Nov).
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
        Want the launch streams themselves? See <Link href={newsPath("gta-6-launch-streams-schedule")} className="text-pink underline underline-offset-2">who went live</Link>, and check the{" "}
        <Link href={newsPath("gta-6-ps5-update-patches-servers")} className="text-pink underline underline-offset-2">server status tracker</Link> if your own game will not connect.
      </p>

      <Callout title="How to read these numbers" tone="unconfirmed">
        <p>
          These are third-party trackers, not platform statements. By luciastream&rsquo;s own explanation, its total adds up the viewers each platform reports for every live GTA stream,
          so someone watching two streams counts twice. Peaks are single one-minute readings. We have not seen Twitch, Kick or YouTube publish a figure, so we are not calling this
          an official record.
        </p>
      </Callout>

      <Sources>
        <Source href="https://www.bbc.com/news/live/c60rkg21dl22t" label="BBC News live page" kind="News" />
        <Source href="https://nextcounts.com/games/grand-theft-auto-vi" label="NextCounts: GTA VI live viewers (page updated 06:00 UTC, 19 Nov; read 16:01 AEST)" kind="Third-party tracker" />
        <Source href="https://luciastream.com/press/" label="luciastream: GTA streaming data (public JSON read 16:02 AEST, 19 Nov)" kind="Third-party tracker" />
      </Sources>
    </NewsLayout>
  );
}
