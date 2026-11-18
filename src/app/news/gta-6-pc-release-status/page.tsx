import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-pc-release-status";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Platforms" title="Is GTA 6 Coming to PC? Latest Status" source="Rockstar, Take-Two, Polygon, PC Gamer">
      <Lede>
        No. As of 23:38 AEST on 18 Nov, GTA 6 is a PS5 and Xbox Series X|S game only. Rockstar has not announced a PC version, a date, or system requirements. This page is updated
        in place when that changes.
      </Lede>

      <H2>What is official</H2>
      <Bullets>
        <li>
          <Lead>Platforms:</Lead> Rockstar&rsquo;s GTA VI page lists PlayStation 5 and Xbox Series X|S, with the game &ldquo;Coming November 19, 2026&rdquo; (<Ext href="https://www.rockstargames.com/VI">Rockstar Games</Ext>).
          PC is not listed.
        </li>
        <li>
          <Lead>Cloud is console-only:</Lead> Xbox&rsquo;s announcement of GTA 6 on Xbox Cloud Gaming names Xbox One and Xbox Series X|S, not PC (<Ext href="https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/">Xbox Wire</Ext>).
          Polygon notes that Rockstar&rsquo;s November 10 post made no mention of PC, though streaming would technically be possible there, and that Microsoft denied an earlier rumour of a PC streaming deal (<Ext href="https://www.polygon.com/gta-6-pc-release-date-cloud-streaming-rockstar-news-xbox-mods/">Polygon</Ext>).
        </li>
        <li>
          <Lead>Take-Two:</Lead> in a statement Game Rant published on 1 October, the company said its strategy is, &ldquo;over time, generally speaking, to launch on any platform for which there&rsquo;s a meaningful audience&rdquo;, and that
          &ldquo;the PC platform is becoming more and more important to our company over time&rdquo; (<Ext href="https://gamerant.com/gta-6-online-take-two-statement-release-beyond/">Game Rant</Ext>). That is a general strategy, not a GTA 6 PC announcement.
          PC Gamer reports Take-Two has declined to reveal anything about GTA 6 on PC (<Ext href="https://www.pcgamer.com/games/grand-theft-auto/the-experiences-on-console-and-pc-tend-to-be-roughly-the-same-says-take-two-ceo-in-response-to-question-about-gta-roleplaying/">PC Gamer</Ext>).
        </li>
      </Bullets>

      <H2>Rockstar&rsquo;s track record</H2>
      <p>
        Rockstar&rsquo;s recent big releases arrived on consoles first. Per Yahoo Tech (a Just Jared piece), GTA V launched on PS3 and Xbox 360 in September 2013 and reached PC in April 2015, about 19 months later. Red Dead Redemption 2 launched in October 2018 and reached
        PC in November 2019, just over a year later (<Ext href="https://tech.yahoo.com/gaming/articles/gta-6-pc-release-date-150338948.html">Yahoo Tech</Ext>). That history does not set a date for GTA 6.
      </p>

      <Callout title="Unconfirmed" tone="unconfirmed">
        <p>
          Polygon and GameSpot both mention reports that a PC version could arrive a few months after the console launch, with GameSpot saying early 2027. Neither names its source, and Rockstar has not confirmed it. Treat any PC date as a rumour.
        </p>
      </Callout>

      <H2>What to watch for</H2>
      <Bullets>
        <li>A PC logo on Rockstar&rsquo;s GTA VI page, which is where PC would appear first.</li>
        <li>A Rockstar Newswire post with a date, store (Steam, Epic or the Rockstar launcher) and system requirements. Yahoo Tech notes none of these has been confirmed.</li>
        <li>
          Take-Two investor calls. PC Gamer reports the company has consistently declined to reveal GTA 6 PC plans, including on its 10 Nov call.
        </li>
      </Bullets>

      <p>
        While you wait: see the <Link href={newsPath("gta-6-release-countdown")} className={L}>release time by region</Link>, the <Link href={newsPath("gta-6-confirmed-so-far")} className={L}>confirmed facts</Link> and
        the <Link href="/tools/edition-compare" className={L}>edition comparison</Link>. If you are choosing a console, our <Link href={newsPath("gta-6-performance-ps5-pro-xbox")} className={L}>performance guide</Link> compares them.
      </p>

      <Sources>
        <Source href="https://www.rockstargames.com/VI" label="Rockstar Games: Grand Theft Auto VI (read 18 Nov 2026)" kind="Official" />
        <Source href="https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/" label="Xbox Wire, 10 Nov 2026" kind="Official, platform holder" />
        <Source href="https://www.polygon.com/gta-6-pc-release-date-cloud-streaming-rockstar-news-xbox-mods/" label="Polygon, 10 Nov 2026" kind="Reputable outlet" />
        <Source href="https://gamerant.com/gta-6-online-take-two-statement-release-beyond/" label="Game Rant, 1 Oct 2026 (Take-Two statement)" kind="Reputable outlet quoting official statement" />
        <Source href="https://www.pcgamer.com/games/grand-theft-auto/the-experiences-on-console-and-pc-tend-to-be-roughly-the-same-says-take-two-ceo-in-response-to-question-about-gta-roleplaying/" label="PC Gamer, 10 Nov 2026" kind="Reputable outlet" />
        <Source href="https://tech.yahoo.com/gaming/articles/gta-6-pc-release-date-150338948.html" label="Yahoo Tech (Just Jared), 15 Nov 2026" kind="Syndicated outlet, used for dates only" />
        <Source href="https://www.gamespot.com/articles/gta-6-ps5-pro-features-frame-rates-and-xbox-cloud-gaming-details-confirmed-by-rockstar/" label="GameSpot, 10 Nov 2026" kind="Reputable outlet" />
      </Sources>
    </NewsLayout>
  );
}
