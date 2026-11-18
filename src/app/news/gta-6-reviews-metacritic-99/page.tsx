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
          <Lead>Metacritic:</Lead> 99, first reported from 100 critic reviews at about 11:17 GMT (
          <Ext href="https://www.bbc.com/news/live/c60rkg21dl22t">BBC News</Ext>). Anadolu later cited 115 reviews (
          <Ext href="https://www.aa.com.tr/en/science-technology/gta-vi-global-rollout-begins-with-new-zealand-launch/4129238">Anadolu</Ext>
          ). The count keeps moving and the score can too.
        </li>
        <li>
          <Lead>Lowest confirmed:</Lead> 90 on Metacritic when the BBC wrote, so no score below 90 in the first wave.
        </li>
        <li>
          <Lead>Records:</Lead> Rockstar&rsquo;s previous best Metascore was 98 for GTA IV, and GTA V scored 97 on Xbox 360 and PS3 (
          <Ext href="https://insider-gaming.com/gta-6-gets-a-99-in-early-metacritic-review-scores/">Insider Gaming</Ext>).
        </li>
        <li>
          <Lead>PS5 only, so far.</Lead> Reviewers appear to have had the PS5 version only, with no consensus yet on Xbox Series X|S (
          <Ext href="https://www.gamingbible.com/news/gta-6-review-round-up-highest-rated-game-all-time-916887-20261118">GAMINGbible</Ext>).
        </li>
      </Bullets>

      <H2>Scores from named outlets</H2>
      <DataTable head={["Outlet", "Score"]} rows={SCORES} minWidth="20rem" />
      <p className="text-xs text-muted">
        Scores as listed by <Ext href="https://www.gamingbible.com/news/gta-6-review-round-up-highest-rated-game-all-time-916887-20261118">GAMINGbible</Ext> and{" "}
        <Ext href="https://www.bbc.com/news/live/c60rkg21dl22t">BBC News</Ext>. We list scores only. Full reviews can include light story discussion, so read them at your own risk.
      </p>

      <H2>Performance notes</H2>
      <p>
        The most specific technical read so far is Digital Foundry&rsquo;s PlayStation review. It reports a strict 30fps target with no 60fps mode, and a 1440p base
        resolution on both PS5 and PS5 Pro. PS5 Pro adds PSSR upscaling and ray-traced shadows, and holds a steady 30fps. Base PS5 mostly holds it too, but can dip,
        including into the mid-20s during prolonged encounters with explosives (
        <Ext href="https://www.digitalfoundry.net/reviews/grand-theft-auto-6-a-landmark-achievement-that-redefines-a-console-generation">Digital Foundry</Ext>).
      </p>
      <p>
        We have not seen a published Xbox Series X or Series S performance breakdown yet. Treat any Xbox frame-rate claim as <Lead>unverified</Lead> for now.
      </p>

      <H2>What is unconfirmed</H2>
      <Bullets>
        <li>
          <Lead>Embargo time.</Lead> Outlets started reporting scores from about 11:17 GMT, shortly after the New Zealand unlock. We have not seen Rockstar publish an
          embargo time.
        </li>
        <li>
          <Lead>Final score.</Lead> The Metascore is a live aggregate and may shift as more reviews arrive.
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
        <Source href="https://www.aa.com.tr/en/science-technology/gta-vi-global-rollout-begins-with-new-zealand-launch/4129238" label="Anadolu Agency, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.digitalfoundry.net/reviews/grand-theft-auto-6-a-landmark-achievement-that-redefines-a-console-generation" label="Digital Foundry review, 18 Nov 2026" kind="Reputable outlet" />
      </Sources>
    </NewsLayout>
  );
}
