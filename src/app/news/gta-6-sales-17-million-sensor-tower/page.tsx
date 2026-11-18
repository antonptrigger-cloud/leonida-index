import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-sales-17-million-sensor-tower";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

// Snapshot figures. Each row: figure, who estimated it, who reported it, as-of time.
const ROWS: React.ReactNode[][] = [
  ["Over 17 million copies, more than $1.65 billion", "Sensor Tower (estimate)", <Ext key="r" href="https://www.investing.com/news/stock-market-news/gamers-get-ready-to-enter-vice-city-as-grand-theft-auto-vi-begins-globalrollout-5035485">Reuters, via Investing.com</Ext>, "\u201cSo far\u201d, Reuters dispatch datelined Sydney, 19 Nov"],
  ["Roughly 17.1 million units", "Sensor Tower tracker (estimate)", <Ext key="c" href="https://www.cnbc.com/2026/11/18/gta-vi-publisher-take-two-jumps-as-gamers-relish-blockbuster-release.html">CNBC</Ext>, "Early Wednesday 18 Nov, US time"],
  ["$1.1 billion pre-order revenue on 11.3 million copies", "Sensor Tower", <Ext key="s" href="https://sensortower.com/blog/gta-vi-breaks-record-greater-than-1b-pre-order-or-sensor-tower-report">Sensor Tower blog</Ext>, "As of 10 Nov, PS and Xbox worldwide"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Sales" title="GTA 6 sales: 17 million copies, estimated" source="Reuters, CNBC, Sensor Tower">
      <Lede>
        Analytics firm Sensor Tower estimates GTA 6 has sold more than 17 million copies for over $1.65 billion, Reuters reports. These are third-party estimates, not
        official numbers: Rockstar and Take-Two had not published a GTA 6 sales figure in anything we found as of 09:05 AEST on 19 Nov. The game is still unlocking region by region,
        so the count will keep moving.
      </Lede>

      <H2>The estimates so far</H2>
      <DataTable head={["Figure", "Estimated by", "Reported by", "As of"]} rows={ROWS} minWidth="38rem" />
      <Bullets>
        <li>
          <Lead>Reuters:</Lead> &ldquo;Analytics firm Sensor Tower estimated that so far over 17 million copies have been sold for more than $1.65 billion&rdquo; (
          <Ext href="https://www.investing.com/news/stock-market-news/gamers-get-ready-to-enter-vice-city-as-grand-theft-auto-vi-begins-globalrollout-5035485">Reuters, via Investing.com</Ext>).
        </li>
        <li>
          <Lead>CNBC:</Lead> a Sensor Tower tracker put sales at roughly 17.1 million units as of early Wednesday, &ldquo;far exceeding pre-order volumes of all the biggest game releases in recent history&rdquo; (
          <Ext href="https://www.cnbc.com/2026/11/18/gta-vi-publisher-take-two-jumps-as-gamers-relish-blockbuster-release.html">CNBC</Ext>).
        </li>
        <li>
          <Lead>Earlier snapshot:</Lead> Sensor Tower&rsquo;s own report put pre-order revenue at $1.1 billion on 11.3 million copies across PlayStation and Xbox as of 10 November, which it calls the largest pre-launch total on record (
          <Ext href="https://sensortower.com/blog/gta-vi-breaks-record-greater-than-1b-pre-order-or-sensor-tower-report">Sensor Tower</Ext>). Its public sales tracker page did not show a figure we could read.
        </li>
      </Bullets>

      <H2>What Take-Two has said</H2>
      <p>
        Take-Two&rsquo;s last official word came with its results on 9 November, when CEO Strauss Zelnick said GTA VI was ten days away &ldquo;with pre-orders continuing to reach unprecedented levels&rdquo;. The company kept its fiscal 2027 net bookings outlook at $8.0 to $8.2 billion (
        <Ext href="https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/take-two-interactive-software-inc-reports-results-fiscal-4/">Take-Two</Ext>). It gave no unit count.
      </p>

      <H2>Wall Street reaction</H2>
      <Bullets>
        <li>
          <Lead>Shares:</Lead> CNBC says Take-Two shares jumped more than 6% in premarket trading on 18 Nov (US time). Reuters says strong reviews helped push the US shares up 6.5% on Wednesday afternoon in New York.
        </li>
        <li>
          <Lead>Forecasts (brokerages, not sales):</Lead> per CNBC, Wells Fargo now expects GTA VI to sell about 65 million units in Take-Two&rsquo;s fiscal year to March, up from 35 million, partly on expectations of a possible PC release early in 2027.
          Oppenheimer estimates about $1.85 billion in gross revenue in the first three days, against the $1 billion CNBC says GTA V recorded. PC is not announced; see our <Link href={newsPath("gta-6-pc-release-status")} className={L}>PC release status</Link>.
        </li>
      </Bullets>

      <Callout title="How to read these numbers" tone="unconfirmed">
        <p>
          Sensor Tower&rsquo;s figures are estimates from an independent analytics firm, not totals from Rockstar, Take-Two, Sony or Microsoft. Reuters calls them copies sold, and Sensor Tower&rsquo;s earlier snapshots were pre-orders, which can be cancelled. CNBC dates its 17.1 million figure to early Wednesday US time, before the first regions unlocked, so we expect most of it is pre-orders. That is our inference, not something the outlets say.
          We will add an official figure here when Rockstar or Take-Two publishes one.
        </p>
      </Callout>

      <p>
        Still deciding? Compare the editions with our <Link href="/tools/edition-compare" className={L}>edition comparison</Link> and the <Link href={newsPath("gta-6-preload-editions-pricing")} className={L}>preload, editions and pricing</Link> guide, or start with the <Link href="/guides/beginner" className={L}>beginner guide</Link>.
      </p>

      <Sources>
        <Source href="https://www.investing.com/news/stock-market-news/gamers-get-ready-to-enter-vice-city-as-grand-theft-auto-vi-begins-globalrollout-5035485" label="Reuters (Aditya Soni, Cordelia Hsu), via Investing.com, 19 Nov 2026" kind="News agency" />
        <Source href="https://www.cnbc.com/2026/11/18/gta-vi-publisher-take-two-jumps-as-gamers-relish-blockbuster-release.html" label="CNBC, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://sensortower.com/blog/gta-vi-breaks-record-greater-than-1b-pre-order-or-sensor-tower-report" label="Sensor Tower: GTA VI pre-orders break $1B" kind="Analytics firm" />
        <Source href="https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/take-two-interactive-software-inc-reports-results-fiscal-4/" label="Take-Two Q2 FY2027 results, 9 Nov 2026" kind="Official, publisher" />
      </Sources>
    </NewsLayout>
  );
}
