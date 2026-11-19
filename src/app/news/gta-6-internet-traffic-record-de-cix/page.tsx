import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-internet-traffic-record-de-cix";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const DECIX = "https://www.de-cix.net/en/about-de-cix/media/press-releases/gta-vi-global-data-traffic-hits-record-breaking-high";
const VARIETY = "https://variety.com/2026/gaming/news/gta-6-launch-livestream-internet-traffic-records-1236953145/";

// All figures are from the DE-CIX press release of 19 Nov 2026 (read 05:00 AEST, 20 Nov). CET to AEST: +9 hours.
const RECORDS: string[][] = [
  ["All DE-CIX exchanges, worldwide", "33.03Tbps (new record)", "20:20 CET, Wed 18 Nov (05:20 AEST, 19 Nov)"],
  ["All DE-CIX exchanges, worldwide", "33.01Tbps (previous record)", "10 Nov, as pre-downloads began"],
  ["DE-CIX Frankfurt", "22.15Tbps", "Wed evening, 18 Nov: just below its record"],
  ["DE-CIX Frankfurt", "22.30Tbps (its record)", "10 Nov, as pre-downloads began"],
];

const AROUND: string[][] = [
  ["Dallas", "2.66Tbps (10 Nov), 2.68Tbps (12 Nov), 2.87Tbps (18 Nov)", "New records each time"],
  ["Chicago", "1.22Tbps", "Record on 10 Nov; also listed as above average on 18 Nov"],
  ["Phoenix", "196.45Gbps", "Record on 10 Nov"],
  ["Mexico", "416Gbps", "Record on 11 Nov"],
  ["New York", "2.44Tbps", "Above average, Wed evening 18 Nov"],
  ["Madrid", "1.43Tbps", "Above average, Wed evening 18 Nov"],
  ["Dubai", "1.25Tbps", "Above average, Wed evening 18 Nov"],
  ["Singapore", "627Gbps", "Above average, Wed evening 18 Nov"],
  ["Lisbon", "79.9Gbps", "Above average, Wed evening 18 Nov"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Launch" title="DE-CIX&rsquo;s record traffic around the GTA 6 launch, explained" source="DE-CIX, Variety">
      <Lede>
        Internet exchange operator DE-CIX says traffic across its exchanges worldwide hit a record 33.03 terabits per second at 20:20 CET on 18 November (05:20 AEST, 19 Nov), around the GTA 6
        launch. That is a record for DE-CIX&rsquo;s own network, not a reading of the whole internet, and it beat the 33.01Tbps DE-CIX set when pre-downloads opened on 10 November
        by just 0.02Tbps (<Ext href={DECIX}>DE-CIX</Ext>). Here is what was measured and what it means.
      </Lede>

      <H2>The record, in numbers</H2>
      <DataTable head={["Where", "Peak", "When"]} rows={RECORDS} minWidth="32rem" />
      <Bullets>
        <li>
          <Lead>Launch week overall:</Lead> DE-CIX says traffic around the launch was 25% higher than in a typical week at the start of 2026, and the 10 November records were about
          20% up on the start of the year (<Ext href={DECIX}>DE-CIX</Ext>).
        </li>
        <li>
          <Lead>Frankfurt:</Lead> DE-CIX calls it Europe&rsquo;s largest internet exchange, with more than 1,100 networks connected. It says the 22.30Tbps pre-download peak was about
          13 complete GTA 6 downloads every second, based on a download of about 210GB.
        </li>
        <li>
          <Lead>Timing:</Lead> 20:20 CET on 18 November was about three hours and 40 minutes before GTA 6 unlocked in Central Europe, according to our{" "}
          <Link href={newsPath("gta-6-release-countdown")} className={L}>unlock times</Link>, and after New Zealand and Australia had already unlocked. DE-CIX does not say
          what share of the traffic was GTA 6 itself.
        </li>
        <li>
          <Lead>What DE-CIX said:</Lead> CTO Dr. Thomas King said &ldquo;the launch of GTA VI clearly demonstrates the scale that major digital events like this have now reached&rdquo;, and
          that DE-CIX designs its network so utilisation does not exceed 75% (<Ext href={DECIX}>DE-CIX</Ext>).
        </li>
      </Bullets>

      <H2>Around the world</H2>
      <p>DE-CIX also listed these peaks at its other exchanges, during pre-downloads and on launch eve (<Ext href={DECIX}>DE-CIX</Ext>):</p>
      <DataTable head={["Exchange", "Peak", "Note"]} rows={AROUND} minWidth="30rem" />

      <Callout title="Did GTA 6 break the internet?" tone="note">
        <p>
          No outage is reported in the DE-CIX release. The 33.03Tbps is the combined traffic across DE-CIX&rsquo;s exchanges, the hubs where networks swap traffic directly, so it is one
          operator&rsquo;s record, not a total for all internet use. Variety&rsquo;s headline calls it an &ldquo;internet usage&rdquo; record and quotes the same DE-CIX figure (
          <Ext href={VARIETY}>Variety</Ext>). Australia&rsquo;s NBN reported its own record that night, measured on a different network, so the two numbers should not be compared directly:
          see our <Link href={newsPath("gta-6-nbn-australia-traffic-record")} className={L}>NBN record story</Link>.
        </p>
      </Callout>

      <p>
        Still downloading? DE-CIX notes that about 210GB takes more than nine hours on a 50Mbps connection under ideal conditions. Our{" "}
        <Link href={newsPath("gta-6-file-size-time-to-beat")} className={L}>file size guide</Link> has the PS5 and Xbox sizes, and the{" "}
        <Link href={newsPath("gta-6-ps5-update-patches-servers")} className={L}>live server status tracker</Link> shows whether PSN or Xbox Live are having trouble.
        DE-CIX&rsquo;s release also cites Sensor Tower&rsquo;s pre-order estimate; for the latest sales estimates see{" "}
        <Link href={newsPath("gta-6-sales-17-million-sensor-tower")} className={L}>GTA 6 sales so far</Link>.
      </p>

      <Sources>
        <Source href={DECIX} label="DE-CIX press release: GTA VI, global data traffic hits record-breaking high, 19 Nov 2026 (read 05:00 AEST, 20 Nov)" kind="Primary (exchange operator)" />
        <Source href={VARIETY} label="Variety (Jennifer Maas): GTA 6 launch breaks internet usage records, 19 Nov 2026" kind="Reputable outlet" />
      </Sources>
    </NewsLayout>
  );
}
