import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-file-size-time-to-beat";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const ROWS: React.ReactNode[][] = [
  ["Main story only", "About 60 hours (VGC), 65+ hours (GameSpot)"],
  ["Story plus most side content", "90 to 100 hours (GameSpot), over 100 hours (VGC)"],
  ["Everything, including collectibles and scans", "200+ hours (both)"],
  ["Rockstar developer's run", "About 80 hours (NYT via GamesRadar+)"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Guide" title="GTA 6 File Size and Time to Beat" source="PlayStation, The Verge, VGC, GameSpot">
      <Lede>
        Clear 212GB before you play, and plan for roughly 60 to 65 hours if you stick to the story. Add side content and you are looking at 90 to 100 hours or more.
      </Lede>

      <H2>File size</H2>
      <Bullets>
        <li>
          <Lead>Official (PlayStation):</Lead> clear a minimum of 212GB on your PS5 before pre-load (<Ext href="https://www.playstation.com/en-us/games/grand-theft-auto-vi/">PlayStation Store</Ext>).
        </li>
        <li>
          <Lead>Official (Rockstar):</Lead> the pre-load requires &ldquo;up to 212GB depending on your device&rdquo;, per The Verge, and Rockstar told players to make sure they have ample space (<Ext href="https://www.theverge.com/games/1025271/gta-vi-storage-space-rockstar-games">The Verge</Ext>).
        </li>
        <li>
          <Lead>Patches add more.</Lead> Two small pre-launch patches have gone out (about 1GB, then 602.5MB on PS5), and the PS5 also needed a system update. See the{" "}
          <Link href={newsPath("gta-6-ps5-update-patches-servers")} className={L}>server status and known issues tracker</Link>. Keep a few spare gigabytes free beyond 212GB.
        </li>
        <li>
          <Lead>Xbox:</Lead> Rockstar&rsquo;s figure covers both consoles: &ldquo;up to 212GB depending on your device&rdquo;. news.com.au reports about 234GB on Xbox, a different number from Rockstar&rsquo;s (<Ext href="https://www.news.com.au/technology/gaming/gta-6-release-australia-launch-times-download-size-and-why-its-a-bad-time-to-be-a-boss/news-story/eeb2f0ed1d624c365f65e50b92c974cf">news.com.au</Ext>).
          Neither Rockstar nor Microsoft has confirmed that figure to us, and we have not verified an Xbox Store size ourselves. Leave extra room on Xbox and check the size shown on your own pre-load before deleting anything.
        </li>
      </Bullets>
      <p>
        There is no disc: boxed copies contain a download code. See the <Link href={newsPath("gta-6-preload-editions-pricing")} className={L}>pre-load guide</Link> for how to start the download.
      </p>

      <H2>How long to beat</H2>
      <p>
        Reviewers who have finished the game give similar ranges. These are playthrough estimates, not official Rockstar figures, and they are spoiler-free.
      </p>
      <DataTable head={["Playstyle", "Estimate"]} rows={ROWS} minWidth="28rem" />
      <Bullets>
        <li>
          <Lead>VGC:</Lead> the campaign is around 60 hours on main missions alone. Its reviewer reached the credits after 100 hours with a large portion of side content done, and says full completion, including animal, landmark and collectible scanning, easily passes 200 hours (<Ext href="https://www.videogameschronicle.com/guide/how-long-to-beat-grand-theft-auto-6/">VGC</Ext>).
        </li>
        <li>
          <Lead>GameSpot:</Lead> &ldquo;anywhere upwards of 65 hours&rdquo; for the main campaign, 90 to 100 hours for staff who explored side content, and upwards of 200 hours for 100%. No one on its team had completed everything (<Ext href="https://www.gamespot.com/articles/how-long-to-beat-gta-6/">GameSpot</Ext>).
        </li>
        <li>
          <Lead>Rockstar dev (older, reported):</Lead> GamesRadar+, citing The New York Times, says Rockstar North co-studio head Rob Nelson&rsquo;s February playthrough took 80 hours, covering the main story and some optional goals with narrative ramifications (<Ext href="https://www.gamesradar.com/games/grand-theft-auto/how-long-is-gta-6-about-80-hours-according-to-one-rockstar-devs-playthrough/">GamesRadar+</Ext>). We have not read the NYT piece itself.
        </li>
      </Bullets>

      <Callout title="Read the numbers carefully" tone="unconfirmed">
        <p>
          Reviewers had a pre-release build and a deadline. Speed varies a lot by player, and both outlets say they will update as they find more. Completion counts also depend on what you count as &ldquo;everything&rdquo;.
        </p>
      </Callout>

      <p>
        Where to start once it is installed: the <Link href="/guides/beginner" className={L}>beginner guide</Link> and the <Link href="/guides/activities" className={L}>activities guide</Link> cover the side content that drives
        those extra hours. For how the game runs on your console, see the <Link href={newsPath("gta-6-performance-ps5-pro-xbox")} className={L}>performance guide</Link>.
      </p>

      <Sources>
        <Source href="https://www.playstation.com/en-us/games/grand-theft-auto-vi/" label="PlayStation Store: Grand Theft Auto VI" kind="Official, platform holder" />
        <Source href="https://www.theverge.com/games/1025271/gta-vi-storage-space-rockstar-games" label="The Verge, 3 Nov 2026" kind="Reputable outlet quoting Rockstar" />
        <Source href="https://www.news.com.au/technology/gaming/gta-6-release-australia-launch-times-download-size-and-why-its-a-bad-time-to-be-a-boss/news-story/eeb2f0ed1d624c365f65e50b92c974cf" label="news.com.au: GTA 6 release in Australia, 18 Nov 2026" kind="Reputable outlet (Xbox size, single source)" />
        <Source href="https://www.videogameschronicle.com/guide/how-long-to-beat-grand-theft-auto-6/" label="VGC: How long to beat GTA 6, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.gamespot.com/articles/how-long-to-beat-gta-6/" label="GameSpot: How long to beat GTA 6, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.gamesradar.com/games/grand-theft-auto/how-long-is-gta-6-about-80-hours-according-to-one-rockstar-devs-playthrough/" label="GamesRadar+, 27 Aug 2026" kind="Reputable outlet citing NYT" />
      </Sources>
    </NewsLayout>
  );
}
