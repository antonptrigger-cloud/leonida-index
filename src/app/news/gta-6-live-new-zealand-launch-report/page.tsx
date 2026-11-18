import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-live-new-zealand-launch-report";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Launch night" title="Live in New Zealand" source="Reputable outlets + official">
      <Lede>
        GTA 6 is playable. New Zealand hit midnight on 19 November at 11:00 UTC on 18 November, which was 9 PM in Brisbane, and several outlets
        report it went live there on schedule. The rest of the world follows as each region reaches its own midnight.
      </Lede>

      <H2>What we verified</H2>
      <Bullets>
        <li>
          <Lead>Live in New Zealand.</Lead> BBC News, Anadolu Agency and Polygon all report that the rolling launch started in New Zealand. The BBC live
          page logged the release at 11:00 GMT and said players who had preloaded should be able to launch it (
          <Ext href="https://www.bbc.com/news/live/c60rkg21dl22t">BBC News live</Ext>,{" "}
          <Ext href="https://www.aa.com.tr/en/science-technology/gta-vi-global-rollout-begins-with-new-zealand-launch/4129238">Anadolu</Ext>,{" "}
          <Ext href="https://www.polygon.com/gta-6-out-now-spoiler-warning-new-zealand-release/">Polygon</Ext>).
        </li>
        <li>
          <Lead>The schedule is official.</Lead> Sony describes a &ldquo;rolling midnight launch by country&rdquo; starting at 12:00 AM NZDT (
          <Ext href="https://blog.playstation.com/2026/11/10/pre-load-grand-theft-auto-vi-on-ps5-starting-today/">PlayStation Blog</Ext>).
        </li>
        <li>
          <Lead>Streams are huge.</Lead> The BBC reported more than 2.4 million people watching GTA 6 on Twitch at about 12:00 GMT.
        </li>
        <li>
          <Lead>Platforms.</Lead> PS5 and Xbox Series X|S only. No PC release date has been announced.
        </li>
        <li>
          <Lead>Reviews are in.</Lead> Metacritic opened at 99 within minutes of the unlock. See the{" "}
          <Link href={newsPath("gta-6-reviews-metacritic-99")} className={L}>review round-up</Link>.
        </li>
      </Bullets>

      <H2>What we could not verify</H2>
      <Bullets>
        <li>
          <Lead>A new Rockstar launch statement.</Lead> We found no launch-night post from Rockstar beyond a repost of Sony&rsquo;s PS5 update notice, and
          Rockstar&rsquo;s Newswire and service status pages would not load for us (HTTP 500).
        </li>
        <li>
          <Lead>Server problems.</Lead> Insider Gaming reported no performance or network issues at the time of writing, and we found no outage reports as of
          publication. Check the status pages yourself if something fails.
        </li>
        <li>
          <Lead>Download demand.</Lead> NZ network operator Chorus predicted a record download event but said it was &ldquo;not expecting any issues&rdquo; (
          <Ext href="https://www.1news.co.nz/2026/11/18/gta-6-how-to-beat-the-download-rush-and-why-gamers-abroad-envy-kiwis/">1News</Ext>
          ). That is a forecast, not a launch-night measurement.
        </li>
      </Bullets>

      <H2>Who unlocks next</H2>
      <p>
        Times are midnight local on 19 November. Australia&rsquo;s east coast (Sydney, Melbourne) is 13:00 UTC tonight, 23:00 in Brisbane. Japan and South
        Korea are 15:00 UTC, Central Europe 23:00 UTC, the UK 00:00 UTC on 19 November and US Eastern 05:00 UTC. The full table is in our{" "}
        <Link href={newsPath("gta-6-release-countdown")} className={L}>release time by region</Link>.
      </p>
      <p>
        <Lead>Brisbane is not settled.</Lead> Store-listing schedules put Australia at 13:00 UTC (Sydney time). Queensland does not use daylight saving, so a strict
        Brisbane midnight would be 14:00 UTC. Rockstar has not spelled it out, so trust the countdown on your own store page.
      </p>

      <H2>The &ldquo;New Zealand trick&rdquo;</H2>
      <p>
        Some players are changing console or account region to unlock early. 1News reported that Rockstar, Take-Two, Sony and Microsoft had not commented on the
        workaround, and a streamer quoted by the BBC warned that players could be banned. We do not recommend it, and we cannot confirm it works on either console.
      </p>

      <H2>Spoilers</H2>
      <p>
        Players are live-streaming and posting while most of the world is still on 18 November. Mute GTA keywords, skip Leonida tags and avoid comment
        sections until you have played. This page contains no story, mission or character details.
      </p>

      <H2>Related</H2>
      <p>
        <Link href={newsPath("gta-6-reviews-metacritic-99")} className={L}>Review scores</Link>,{" "}
        <Link href={newsPath("gta-6-ps5-update-patches-servers")} className={L}>PS5 update, patches and servers</Link> and the{" "}
        <Link href="/map" className={L}>Leonida map</Link>.
      </p>

      <Sources>
        <Source href="https://www.bbc.com/news/live/c60rkg21dl22t" label="BBC News live page, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.aa.com.tr/en/science-technology/gta-vi-global-rollout-begins-with-new-zealand-launch/4129238" label="Anadolu Agency, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.polygon.com/gta-6-out-now-spoiler-warning-new-zealand-release/" label="Polygon, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.vice.com/en/article/gta-6-new-zealand-worldwide-release-times/" label="VICE, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://blog.playstation.com/2026/11/10/pre-load-grand-theft-auto-vi-on-ps5-starting-today/" label="PlayStation Blog, 10 Nov 2026" kind="Official, platform holder" />
        <Source href="https://www.1news.co.nz/2026/11/18/gta-6-how-to-beat-the-download-rush-and-why-gamers-abroad-envy-kiwis/" label="1News NZ, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://insider-gaming.com/is-grand-theft-auto-6-down-gta-6-issues-explained/" label="Insider Gaming: Is GTA 6 down?, 18 Nov 2026" kind="Reputable outlet" />
      </Sources>
    </NewsLayout>
  );
}
