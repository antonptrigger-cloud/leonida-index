import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-sales-17-million-sensor-tower";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

// Snapshot figures. Each row: figure, who estimated it, who reported it, as-of time.
const ROWS: React.ReactNode[][] = [
  ["24.58 million units via pre-purchases and launch-day sales, about $2.36 billion gross revenue (PS5: 18.44 million, $1.77 billion; Xbox Series X|S: 6.15 million, $588 million)", "Sensor Tower tracker (estimate)", <Ext key="g2" href="https://www.gamespot.com/articles/gta-6-has-sold-almost-8-million-copies-so-far-and-ps5-is-dominating-the-split-of-course/">GameSpot</Ext>, "Reported 19 Nov, 4:19 p.m. PST (10:19 AEST, 20 Nov)"],
  ["24.59 million units, over $2.36 billion; 75% on PlayStation", "Sensor Tower (estimate). Deadline names it for the $2.36 billion only", <Ext key="d" href="https://deadline.com/2026/11/gta-6-sales-launch-day-surge-videogame-1237229514/">Deadline</Ext>, "Reported 19 Nov (US time), \u201cless than 24 hours\u201d after launch"],
  ["19.05 million units, about $1.84 billion gross revenue (PS5: 14.23 million, $1.38 billion; Xbox Series X|S: 4.82 million, $464 million)", "Sensor Tower tracker (estimate)", <Ext key="g" href="https://www.gamespot.com/articles/gta-6-has-sold-almost-8-million-copies-so-far-and-ps5-is-dominating-the-split-of-course/">GameSpot</Ext>, "Reported 19 Nov, 5:06 a.m. PST (23:06 AEST); GameSpot has since updated the same article to the 24.58 million figure, so the link no longer shows this one"],
  ["Over 17 million copies, more than $1.65 billion", "Sensor Tower (estimate)", <Ext key="r" href="https://www.investing.com/news/stock-market-news/gamers-get-ready-to-enter-vice-city-as-grand-theft-auto-vi-begins-globalrollout-5035485">Reuters, via Investing.com</Ext>, "\u201cSo far\u201d, Reuters dispatch datelined Sydney, 19 Nov"],
  ["Roughly 17.1 million units", "Sensor Tower tracker (estimate)", <Ext key="c" href="https://www.cnbc.com/2026/11/18/gta-vi-publisher-take-two-jumps-as-gamers-relish-blockbuster-release.html">CNBC</Ext>, "Early Wednesday 18 Nov, US time"],
  ["$1.1 billion pre-order revenue on 11.3 million copies", "Sensor Tower", <Ext key="s" href="https://sensortower.com/blog/gta-vi-breaks-record-greater-than-1b-pre-order-or-sensor-tower-report">Sensor Tower blog</Ext>, "As of 10 Nov, PS and Xbox worldwide"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Sales" title="GTA 6 sales: 24.6 million copies, estimated" source="GameSpot, Deadline, Reuters, CNBC, Sensor Tower">
      <Lede>
        Sensor Tower now estimates GTA 6 at 24.58 million units and about $2.36 billion in gross revenue across pre-purchases and launch-day sales, GameSpot reports, up from the 19.05 million units and
        $1.84 billion it estimated earlier on 19 November. PS5 makes up about 75% of the units. These are third-party estimates, not official numbers, but GameSpot reports that Take-Two CEO
        Strauss Zelnick said on TBPN that the company is going to share official sales data soon. Rockstar and Take-Two had not published a GTA 6 sales figure in anything we found as of 11:05 AEST on 20 Nov.
      </Lede>

      <H2>The estimates so far</H2>
      <DataTable head={["Figure", "Estimated by", "Reported by", "As of"]} rows={ROWS} minWidth="38rem" />
      <Bullets>
        <li>
          <Lead>GameSpot (latest):</Lead> Sensor Tower has updated its tracker again: GTA 6 &ldquo;reached 24.58 million total units via pre-purchases and copies sold at launch today&rdquo;, about $2.36 billion in gross revenue. GameSpot gives the split as 18.44 million units and $1.77 billion on PS5 against 6.15 million and $588 million on Xbox Series X|S, and notes that Sensor Tower had projected as many as 25 million total pre-purchases by launch (
          <Ext href="https://www.gamespot.com/articles/gta-6-has-sold-almost-8-million-copies-so-far-and-ps5-is-dominating-the-split-of-course/">GameSpot</Ext>, 19 Nov, 4:19 p.m. PST).
        </li>
        <li>
          <Lead>Deadline:</Lead> says GTA VI has made more than $2.36 billion &ldquo;less than 24 hours&rdquo; after launch, according to Sensor Tower. It separately says the game has sold 24.59 million units, 75% of them on PlayStation, without naming a source for that line (GameSpot, citing Sensor Tower, has 24.58 million and the same 75% split). Sensor Tower SVP of Video Game Insights Karl Kontus told Deadline that GTA VI became &ldquo;2026&rsquo;s best-selling game based on pre-orders alone, with total pre-order revenue exceeding $2 billion through launch day&rdquo; (
          <Ext href="https://deadline.com/2026/11/gta-6-sales-launch-day-surge-videogame-1237229514/">Deadline</Ext>).
        </li>
        <li>
          <Lead>GameSpot (earlier version of the same article, 19 Nov):</Lead> Sensor Tower &ldquo;has updated its GTA 6 sales tracker&rdquo;, putting the game at 19.05 million total units &ldquo;via pre-purchases&rdquo;, about $1.84 billion in gross revenue. GameSpot gives the split as 14.23 million units and $1.38 billion on PS5 against 4.82 million and $464 million on Xbox Series X|S (
          <Ext href="https://www.gamespot.com/articles/gta-6-has-sold-almost-8-million-copies-so-far-and-ps5-is-dominating-the-split-of-course/">GameSpot</Ext>).{" "}
          <Ext href="https://gamingbolt.com/grand-theft-auto-6-nears-20-million-units-sold-and-2-billion-revenue-per-analyst-firm">GamingBolt</Ext> reports the same figures as of 19 November.
        </li>
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
        GameSpot reports that CEO Strauss Zelnick said on TBPN on 19 November (US time) that Take-Two is going to share official GTA 6 sales data soon. GameSpot gives no date (
        <Ext href="https://www.gamespot.com/articles/gta-6-has-sold-almost-8-million-copies-so-far-and-ps5-is-dominating-the-split-of-course/">GameSpot</Ext>).
      </p>
      <p>
        Before that, Take-Two&rsquo;s last official word came with its results on 9 November, when CEO Strauss Zelnick said GTA VI was ten days away &ldquo;with pre-orders continuing to reach unprecedented levels&rdquo;. The company kept its fiscal 2027 net bookings outlook at $8.0 to $8.2 billion (
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
          Sensor Tower&rsquo;s figures are estimates from an independent analytics firm, not totals from Rockstar, Take-Two, Sony or Microsoft. Reuters calls them copies sold, and Sensor Tower&rsquo;s earlier snapshots were pre-orders, which can be cancelled. GameSpot described the 19.05 million figure as units &ldquo;via pre-purchases&rdquo;, and the 24.58 million figure as pre-purchases plus copies sold at launch, without splitting the two. CNBC dates its 17.1 million figure to early Wednesday US time, before the first regions unlocked, so we expect most of it is pre-orders. That is our inference, not something the outlets say.
          GameSpot reports Take-Two says official data is coming soon; we will add it here when Rockstar or Take-Two publishes it.
        </p>
      </Callout>

      <p>
        Still deciding? Compare the editions with our <Link href="/tools/edition-compare" className={L}>edition comparison</Link> and the <Link href={newsPath("gta-6-preload-editions-pricing")} className={L}>preload, editions and pricing</Link> guide, or start with the <Link href="/guides/beginner" className={L}>beginner guide</Link>.
      </p>

      <Sources>
        <Source href="https://www.gamespot.com/articles/gta-6-has-sold-almost-8-million-copies-so-far-and-ps5-is-dominating-the-split-of-course/" label="GameSpot (Eddie Makuch), 19 Nov 2026, updated 4:19 p.m. PST" kind="Reputable outlet" />
        <Source href="https://deadline.com/2026/11/gta-6-sales-launch-day-surge-videogame-1237229514/" label="Deadline (Dominic Patten), 19 Nov 2026" kind="Reputable outlet" />
        <Source href="https://gamingbolt.com/grand-theft-auto-6-nears-20-million-units-sold-and-2-billion-revenue-per-analyst-firm" label="GamingBolt, 19 Nov 2026" kind="News outlet" />
        <Source href="https://www.investing.com/news/stock-market-news/gamers-get-ready-to-enter-vice-city-as-grand-theft-auto-vi-begins-globalrollout-5035485" label="Reuters (Aditya Soni, Cordelia Hsu), via Investing.com, 19 Nov 2026" kind="News agency" />
        <Source href="https://www.cnbc.com/2026/11/18/gta-vi-publisher-take-two-jumps-as-gamers-relish-blockbuster-release.html" label="CNBC, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://sensortower.com/blog/gta-vi-breaks-record-greater-than-1b-pre-order-or-sensor-tower-report" label="Sensor Tower: GTA VI pre-orders break $1B" kind="Analytics firm" />
        <Source href="https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/take-two-interactive-software-inc-reports-results-fiscal-4/" label="Take-Two Q2 FY2027 results, 9 Nov 2026" kind="Official, publisher" />
      </Sources>
    </NewsLayout>
  );
}
