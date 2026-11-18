import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-reviews-metacritic-99";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const SCORES: string[][] = [
  ["IGN", "10/10"],
  ["Game Informer", "10/10"],
  ["Edge", "10/10"],
  ["Push Square", "10/10"],
  ["Respec", "10/10"],
  ["GamesRadar+", "5/5"],
  ["Eurogamer", "5/5"],
  ["VGC", "5/5"],
  ["TheSixthAxis", "9/10"],
  ["Slant Magazine", "4.5/5"],
  ["ScreenHub", "4/5 (Metacritic: 80)"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Reviews" title="Reviews are in" source="Reputable outlets">
      <Lede>
        GTA 6 reviews landed within minutes of the game unlocking in New Zealand. Metacritic opened at a Metascore of 99 on the PS5 listing, which ties The Legend of
        Zelda: Ocarina of Time for the highest score on the site.
      </Lede>

      <H2>The numbers</H2>
      <Bullets>
        <li>
          <Lead>Metacritic (as of 08:13 AEST, 19 Nov):</Lead> Metascore 99, &ldquo;Universal Acclaim&rdquo;, from 150 critic reviews on the main listing, and 99 across all platforms from 156, read directly from{" "}
          <Ext href="https://www.metacritic.com/game/grand-theft-auto-vi/">Metacritic</Ext>. It first appeared at 99 from 100 reviews at about 11:17 GMT (
          <Ext href="https://www.bbc.com/news/live/c60rkg21dl22t">BBC News</Ext>), so the score has held at 99 while the count has moved around.
        </li>
        <li>
          <Lead>Lowest score:</Lead> 80 (ScreenHub) on the Metacritic page we read. The BBC&rsquo;s first-wave lowest was 90, so a few lower scores have arrived since. Metacritic
          showed 100% positive reviews, with none mixed or negative.
        </li>
        <li>
          <Lead>Xbox and other aggregators:</Lead> Metacritic also lists an Xbox Series X page, at 99 from 14 reviews. OpenCritic now shows a Top Critic Average of 99, up from the 98 we read at 23:49 AEST on 18 Nov, with 99% of critics recommending it, down from 100% (as of 08:13 AEST, 19 Nov, read directly from{" "}
          <Ext href="https://opencritic.com/game/15398/grand-theft-auto-vi">OpenCritic</Ext>; <Ext href="https://www.polygon.com/gta-6-review-roundup/">Polygon</Ext> reported 98 on launch day). OpenCritic&rsquo;s player rating stays hidden until 20 ratings; it showed 1 of 20. Metacritic&rsquo;s user score is still &ldquo;tbd&rdquo;.
        </li>
        <li>
          <Lead>Records:</Lead> Rockstar&rsquo;s previous best Metascore was 98 for GTA IV, and GTA V scored 97 on Xbox 360 and PS3 (
          <Ext href="https://insider-gaming.com/gta-6-gets-a-99-in-early-metacritic-review-scores/">Insider Gaming</Ext>).
        </li>
        <li>
          <Lead>Mostly PS5 so far.</Lead> Reviewers appear to have had the PS5 version first, and most reviews are on the PS5 listing (
          <Ext href="https://www.gamingbible.com/news/gta-6-review-round-up-highest-rated-game-all-time-916887-20261118">GAMINGbible</Ext>).
        </li>
      </Bullets>

      <H2>Scores from named outlets</H2>
      <DataTable head={["Outlet", "Score"]} rows={SCORES} minWidth="20rem" />
      <p className="text-xs text-muted">
        Scores as listed by <Ext href="https://www.gamingbible.com/news/gta-6-review-round-up-highest-rated-game-all-time-916887-20261118">GAMINGbible</Ext>,{" "}
        <Ext href="https://www.bbc.com/news/live/c60rkg21dl22t">BBC News</Ext>, <Ext href="https://www.polygon.com/gta-6-review-roundup/">Polygon</Ext> and Metacritic. We list scores only. Full reviews can include light story discussion, so read them at your own risk.
      </p>

      <H2>Performance notes</H2>
      <p>
        The most specific technical read so far is Digital Foundry&rsquo;s PlayStation review. It reports a strict 30fps target with no 60fps mode, and a 1440p base
        resolution on both PS5 and PS5 Pro. PS5 Pro adds PSSR upscaling and ray-traced shadows, and holds a steady 30fps. Base PS5 mostly holds it too, but can dip,
        including into the mid-20s during prolonged encounters with explosives (
        <Ext href="https://www.digitalfoundry.net/reviews/grand-theft-auto-6-a-landmark-achievement-that-redefines-a-console-generation">Digital Foundry</Ext>).
      </p>
      <p>
        Digital Foundry has since published a four-console test. It reports 1440p and a 30fps target on PS5, PS5 Pro and Xbox Series X, with Series X holding 30fps a little loosely and dipping into the mid-20s with vehicle destruction. Series S renders at 720p, upscaled to about 1080p with FSR 4,
        and spends large parts of the game in the mid to high 20s. Digital Foundry calls it &ldquo;the hardest to recommend&rdquo; (<Ext href="https://www.digitalfoundry.net/features/gta-6-ps5-vs-ps5-pro-xbox-series-x-and-series-s-which-console-plays-best">Digital Foundry</Ext>).
        IGN&rsquo;s Series S test covered only the opening section and found mostly 30fps with a couple of drops to 24fps (<Ext href="https://www.ign.com/articles/gta-6-xbox-series-s-performance">IGN</Ext>).
        Full detail is in our <Link href={newsPath("gta-6-performance-ps5-pro-xbox")} className={L}>performance guide</Link>.
      </p>

      <H2>What is unconfirmed</H2>
      <Bullets>
        <li>
          <Lead>Embargo time.</Lead> Outlets started reporting scores from about 11:17 GMT, shortly after the New Zealand unlock. We have not seen Rockstar publish an
          embargo time.
        </li>
        <li>
          <Lead>Final score.</Lead> The Metascore is a live aggregate and the review count was still rising when we checked. It may shift.
        </li>
      </Bullets>

      <H2>Spoiler policy</H2>
      <p>
        We are not quoting reviews about story, characters or missions. If you are waiting for your midnight, the safest move is to stay off review comment sections as well.
        See also the <Link href={newsPath("gta-6-live-new-zealand-launch-report")} className={L}>launch night report</Link> and the{" "}
        <Link href={newsPath("gta-6-confirmed-so-far")} className={L}>confirmed facts</Link>.
      </p>

      <Sources>
        <Source href="https://www.bbc.com/news/live/c60rkg21dl22t" label="BBC News live page, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://insider-gaming.com/gta-6-gets-a-99-in-early-metacritic-review-scores/" label="Insider Gaming, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.gamingbible.com/news/gta-6-review-round-up-highest-rated-game-all-time-916887-20261118" label="GAMINGbible, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.metacritic.com/game/grand-theft-auto-vi/" label="Metacritic: Grand Theft Auto VI (read 08:13 AEST, 19 Nov 2026)" kind="Review aggregator" />
        <Source href="https://opencritic.com/game/15398/grand-theft-auto-vi" label="OpenCritic: Grand Theft Auto VI (read 08:13 AEST, 19 Nov 2026)" kind="Review aggregator" />
        <Source href="https://www.polygon.com/gta-6-review-roundup/" label="Polygon review round-up, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.aa.com.tr/en/science-technology/gta-vi-global-rollout-begins-with-new-zealand-launch/4129238" label="Anadolu Agency, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.digitalfoundry.net/features/gta-6-ps5-vs-ps5-pro-xbox-series-x-and-series-s-which-console-plays-best" label="Digital Foundry: PS5, PS5 Pro, Xbox Series X and Series S, 18 Nov 2026" kind="Technical analysis" />
        <Source href="https://www.ign.com/articles/gta-6-xbox-series-s-performance" label="IGN: Xbox Series S performance, 18 Nov 2026" kind="Reputable outlet, opening section only" />
        <Source href="https://www.digitalfoundry.net/reviews/grand-theft-auto-6-a-landmark-achievement-that-redefines-a-console-generation" label="Digital Foundry review, 18 Nov 2026" kind="Reputable outlet" />
      </Sources>
    </NewsLayout>
  );
}
