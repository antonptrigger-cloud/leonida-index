import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-streaming-viewership-peak";
export const metadata = metaFor(newsPath(SLUG));

const ROWS: string[][] = [
  ["Twitch + Kick + YouTube", "4,205,792 (also its all-time peak)", "luciastream", "Peak timestamped 11:06 UTC (21:06 AEST); shown on its live page at 23:10 AEST"],
  ["Twitch + Kick", "3,688,850", "NextCounts", "23:08 AEST"],
  ["Twitch alone", "2,413,733 (12,072 channels)", "NextCounts", "23:08 AEST"],
  ["Kick alone", "1,275,117", "NextCounts", "23:08 AEST"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Streamers" title="GTA 6 streams top 4M viewers" source="BBC, NextCounts, luciastream">
      <Lede>
        About two hours after New Zealand unlocked GTA 6, third-party trackers show more than 4 million concurrent viewers across GTA streams on Twitch, Kick and YouTube. The US has
        not unlocked yet, so these figures are likely to move. All figures were checked at about 23:10 AEST on 18 Nov.
      </Lede>

      <H2>The numbers</H2>
      <DataTable head={["Platforms", "Concurrent viewers", "Tracker", "When (AEST, 18 Nov)"]} rows={ROWS} minWidth="34rem" />
      <Bullets>
        <li>
          <Lead>BBC:</Lead> its live page reported more than 2.4 million people watching gamers play GTA 6 on Twitch at 12:00 GMT (22:00 AEST) (
          <Ext href="https://www.bbc.com/news/live/c60rkg21dl22t">BBC News</Ext>).
        </li>
        <li>
          <Lead>Peaks today:</Lead> NextCounts records a Twitch peak of 2,506,576 and a Kick peak of 1,287,565 for 18 Nov, and a highest combined hourly sample of 3,753,219 over 48 hours (<Ext href="https://nextcounts.com/games/grand-theft-auto-vi">NextCounts</Ext>).
        </li>
        <li>
          <Lead>Comparison:</Lead> luciastream says the highest GTA V peak it recorded was 992,344 concurrent viewers on 27 Aug 2026, across the same three platforms. Its reading
          covers 3,869 live channels, split about 2.11 million on Twitch, 1.06 million on Kick and 1.03 million on YouTube (<Ext href="https://luciastream.com/press/">luciastream</Ext>).
        </li>
      </Bullets>

      <Callout title="How to read these numbers" tone="unconfirmed">
        <p>
          These are third-party trackers, not platform statements. By luciastream&rsquo;s own explanation, its total adds up the viewers each platform reports for every live GTA stream,
          so someone watching two streams counts twice. Peaks are single one-minute readings. We have not seen Twitch, Kick or YouTube publish a figure, so we are not calling this
          an official record.
        </p>
      </Callout>

      <Sources>
        <Source href="https://www.bbc.com/news/live/c60rkg21dl22t" label="BBC News live page" kind="News" />
        <Source href="https://nextcounts.com/games/grand-theft-auto-vi" label="NextCounts: GTA VI live viewers" kind="Third-party tracker" />
        <Source href="https://luciastream.com/press/" label="luciastream: GTA streaming data" kind="Third-party tracker" />
      </Sources>
    </NewsLayout>
  );
}
