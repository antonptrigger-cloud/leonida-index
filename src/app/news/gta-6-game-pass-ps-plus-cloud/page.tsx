import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-game-pass-ps-plus-cloud";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const ROWS: React.ReactNode[][] = [
  ["Xbox Game Pass", "No", "Xbox: \u201CGrand Theft Auto VI must be purchased separately.\u201D"],
  ["PlayStation Plus", "Not listed", "Not in Sony's November Game Catalog announcement (our reading of the post)"],
  ["Xbox Cloud Gaming", "Yes, once you buy the game", "Xbox One and Series X|S, from 1 AM ET on 19 Nov, Series S graphics"],
  ["PlayStation cloud streaming", "Not announced", "GameSpot: cloud streaming won't be available on PlayStation consoles"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Platforms" title="Is GTA 6 on Game Pass, PS Plus or Cloud?" source="Xbox Wire, PlayStation Blog, GameSpot">
      <Lede>
        GTA 6 is a separate purchase on both platforms. Xbox says so outright, and Sony&rsquo;s November PlayStation Plus lineup does not include it. On Xbox you can also stream it through Xbox Cloud Gaming, including on Xbox One, once you own it.
      </Lede>

      <DataTable head={["Service", "Includes GTA 6?", "What the source says"]} rows={ROWS} minWidth="34rem" />

      <H2>Game Pass</H2>
      <Bullets>
        <li>
          <Lead>Official:</Lead> Xbox&rsquo;s announcement ends with &ldquo;Grand Theft Auto VI must be purchased separately&rdquo; (<Ext href="https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/">Xbox Wire</Ext>).
        </li>
        <li>
          Beebom reports that Rockstar has never launched a major game on Game Pass, and that GTA V and Red Dead Redemption 2 joined years after release (<Ext href="https://beebom.com/will-gta-6-be-on-xbox-game-pass/">Beebom</Ext>).
          That is history, not a plan: nobody has announced a future Game Pass date.
        </li>
      </Bullets>

      <H2>PlayStation Plus</H2>
      <p>
        Sony published its November PlayStation Plus Game Catalog lineup on 10 November, the day pre-load opened. GTA VI is not among the games listed (<Ext href="https://blog.playstation.com/2026/11/10/playstation-plus-game-catalog-for-november-death-stranding-2-on-the-beach-like-a-dragon-pirate-yakuza-in-hawaii-atomfall-dragon-quest-iii-hd-2d-remake-and-more/">PlayStation Blog</Ext>).
        That is an absence in a list, not a statement about future plans. On the PlayStation Store page, the game is a paid product with offline play enabled (<Ext href="https://www.playstation.com/en-us/games/grand-theft-auto-vi/">PlayStation Store</Ext>).
      </p>

      <H2>Xbox Cloud Gaming</H2>
      <Bullets>
        <li>
          <Lead>Official:</Lead> GTA 6 streams on Xbox One and Xbox Series X|S through Xbox Cloud Gaming, starting 1 AM ET on 19 Nov. That is 16:00 AEST on 19 Nov. It uses Xbox Series S graphics settings. Native Xbox Series X|S play unlocks region by region (see the{" "}
          <Link href={newsPath("gta-6-release-countdown")} className={L}>release time by region</Link>).
        </li>
        <li>
          <Lead>Official:</Lead> from 11 November, players in supported markets can buy cloud playtime without a Game Pass subscription. Availability and features &ldquo;may vary by market and device&rdquo;.
        </li>
        <li>
          <Lead>PC and PlayStation:</Lead> Xbox&rsquo;s post names Xbox consoles only. GameSpot reports Rockstar confirmed Remote Play on PS5 and Xbox Series X|S, but no cloud streaming on PlayStation (<Ext href="https://www.gamespot.com/articles/gta-6-ps5-pro-features-frame-rates-and-xbox-cloud-gaming-details-confirmed-by-rockstar/">GameSpot</Ext>).
        </li>
      </Bullets>

      <Callout title="Unconfirmed" tone="unconfirmed">
        <p>
          We have not seen Microsoft or Sony say whether GTA 6 will ever join Game Pass or PlayStation Plus. We also have not confirmed which countries count as &ldquo;supported markets&rdquo; for buying cloud time, or how many cloud hours each Game Pass plan includes, so check Xbox&rsquo;s own pages for your plan.
        </p>
      </Callout>

      <p>
        Buying advice: the <Link href={newsPath("gta-6-preload-editions-pricing")} className={L}>editions and price guide</Link> and the{" "}
        <Link href="/tools/edition-compare" className={L}>edition comparison</Link>. For how the game runs on each console, see the{" "}
        <Link href={newsPath("gta-6-performance-ps5-pro-xbox")} className={L}>performance guide</Link>.
      </p>

      <Sources>
        <Source href="https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/" label="Xbox Wire, 10 Nov 2026" kind="Official, platform holder" />
        <Source href="https://blog.playstation.com/2026/11/10/playstation-plus-game-catalog-for-november-death-stranding-2-on-the-beach-like-a-dragon-pirate-yakuza-in-hawaii-atomfall-dragon-quest-iii-hd-2d-remake-and-more/" label="PlayStation Blog: PS Plus Game Catalog for November, 10 Nov 2026" kind="Official, platform holder" />
        <Source href="https://www.playstation.com/en-us/games/grand-theft-auto-vi/" label="PlayStation Store: Grand Theft Auto VI" kind="Official, platform holder" />
        <Source href="https://www.gamespot.com/articles/gta-6-ps5-pro-features-frame-rates-and-xbox-cloud-gaming-details-confirmed-by-rockstar/" label="GameSpot, 10 Nov 2026" kind="Reputable outlet" />
        <Source href="https://beebom.com/will-gta-6-be-on-xbox-game-pass/" label="Beebom, updated 10 Nov 2026" kind="Outlet, used for Rockstar&rsquo;s Game Pass history only" />
      </Sources>
    </NewsLayout>
  );
}
