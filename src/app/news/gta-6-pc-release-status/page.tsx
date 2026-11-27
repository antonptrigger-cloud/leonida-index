import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, Ext, H2, H3, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";
import { CreditImage } from "@/components/guides/CreditImage";

const SLUG = "gta-6-pc-release-status";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const RS = "https://www.rockstargames.com/VI";
const LAUNCH = "https://www.businesswire.com/news/home/20261119830927/en/Rockstar-Games-Announces-Grand-Theft-Auto-VI-Now-Available";
const XBOX = "https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/";
const POLY = "https://www.polygon.com/gta-6-pc-release-date-cloud-streaming-rockstar-news-xbox-mods/";
const VERGE = "https://www.theverge.com/games/997116/twitch-ceo-gta-vi-multiplayer-is-coming-in-2027";
const PCG = "https://www.pcgamer.com/games/grand-theft-auto/the-experiences-on-console-and-pc-tend-to-be-roughly-the-same-says-take-two-ceo-in-response-to-question-about-gta-roleplaying/";
const YAHOO = "https://tech.yahoo.com/gaming/articles/gta-6-pc-release-date-150338948.html";
const GS = "https://www.gamespot.com/articles/gta-6-ps5-pro-features-frame-rates-and-xbox-cloud-gaming-details-confirmed-by-rockstar/";

// Sourcing (read 28 Nov 2026, 01:05-01:17 AEST):
// Official re-read: Rockstar GTA VI page (Now Available; PlayStation 5 and Xbox Series X|S only; no PC).
// Take-Two / Business Wire launch release, 19 Nov 2026 (those two platforms only; no PC mention).
// Xbox Wire, 10 Nov 2026, left as the official cloud-gaming announcement (Xbox One and Series X|S).
// The Verge, 17 Sep 2026, for Zelnick's general "PC is becoming more and more important" line (citing GamesRadar).
// PC Gamer, 10 Nov 2026, already on this page: Take-Two declined to reveal GTA 6 PC plans (not re-fetched today).
// Polygon and GameSpot 10 Nov rumour lines (early 2027 / a few months after launch) are carried forward
// as reported-not-confirmed; Rockstar still has not confirmed them.
// Yahoo Tech historical GTA V / RDR2 PC gaps kept for dates only.
// Not used: unofficial/pirated PC ports, banned sources, GameRant as the Take-Two source.

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Platforms" title="Is GTA 6 Coming to PC? Latest Status" source="Rockstar, Take-Two, Xbox, The Verge, PC Gamer">
      <Lede>
        As of 28 November 2026, Grand Theft Auto VI is still a PlayStation 5 and Xbox Series X|S game only. Rockstar and Take-Two have not announced a PC version, a release date, a store, or system requirements. This page is updated in place when that changes.
      </Lede>
      <CreditImage
        src="/images/topics/skyline-swamp.webp"
        alt="Official Grand Theft Auto VI screenshot of a Leonida skyline and swamp. © Rockstar Games"
        width={1280}
        height={720}
        credit="© Rockstar Games"
      />

      <H2>Officially confirmed</H2>
      <p>These points come from Rockstar, Take-Two, or Xbox.</p>
      <Bullets>
        <li>
          <Lead>The official site still lists only two platforms.</Lead> Rockstar&rsquo;s GTA VI page now says the game is &ldquo;Now Available&rdquo; and names PlayStation 5 and Xbox Series X|S. PC is not listed (<Ext href={RS}>Rockstar Games</Ext>, read 28 Nov 2026).
        </li>
        <li>
          <Lead>The launch announcement named the same two platforms.</Lead> Take-Two&rsquo;s 19 November release says Grand Theft Auto VI is available for PlayStation 5 and Xbox Series X|S. It does not mention a PC version, Steam, Epic, or the Rockstar launcher (<Ext href={LAUNCH}>Take-Two / Business Wire, 19 Nov 2026</Ext>).
        </li>
        <li>
          <Lead>Xbox Cloud Gaming is also console-only, officially.</Lead> Xbox&rsquo;s announcement of GTA 6 on Xbox Cloud Gaming names Xbox One and Xbox Series X|S, not PC (<Ext href={XBOX}>Xbox Wire, 10 Nov 2026</Ext>).
        </li>
        <li>
          <Lead>No date, store, or system requirements have been announced.</Lead> As of this update, neither Rockstar nor Take-Two has given a PC window or a specifications list.
        </li>
      </Bullets>

      <H2>What Take-Two has said about PC in general</H2>
      <p>
        That is not the same as announcing GTA 6 for PC. In a September investor call, Take-Two CEO Strauss Zelnick said the PC platform is &ldquo;becoming more and more important to our company over time,&rdquo; as reported by The Verge (citing GamesRadar) (<Ext href={VERGE}>The Verge, 17 Sep 2026</Ext>). PC Gamer later reported that Take-Two declined to reveal anything about a GTA 6 PC version, including on its 10 November call (<Ext href={PCG}>PC Gamer, 10 Nov 2026</Ext>). A general remark about the PC market is not a launch plan.
      </p>

      <H2>Previous games are not a schedule</H2>
      <Callout title="Historical context only" tone="unconfirmed">
        <p>
          Rockstar&rsquo;s recent big releases arrived on consoles first. Per Yahoo Tech, Grand Theft Auto V launched on consoles in September 2013 and reached PC in April 2015, about 19 months later. Red Dead Redemption 2 launched in October 2018 and reached PC in November 2019, just over a year later (<Ext href={YAHOO}>Yahoo Tech, 15 Nov 2026</Ext>). That history does not set a date for GTA 6.
        </p>
      </Callout>

      <H2>Reported, not confirmed</H2>
      <Callout title="Reported, not official" tone="unconfirmed">
        <p>
          Before launch, Polygon and GameSpot both mentioned reports that a PC version could arrive a few months after the console release, with GameSpot citing early 2027. Neither named a source, and Rockstar has not confirmed a date (<Ext href={POLY}>Polygon, 10 Nov 2026</Ext>, <Ext href={GS}>GameSpot, 10 Nov 2026</Ext>). Treat any PC date as unconfirmed until Rockstar or Take-Two publishes one.
        </p>
      </Callout>

      <H2>What would actually confirm a PC version</H2>
      <Bullets>
        <li>A PC platform line on Rockstar&rsquo;s GTA VI page, which is where it would appear first.</li>
        <li>A Rockstar or Take-Two announcement with a date, a store, and system requirements.</li>
        <li>A listing on Steam, Epic, or the Rockstar launcher. None of those exists as an official GTA 6 PC product page today.</li>
      </Bullets>

      <H2>Frequently asked questions</H2>
      <H3>Is GTA 6 on PC?</H3>
      <p>No. As of 28 November 2026 it is not on sale for PC, and Rockstar has not announced a PC version.</p>
      <H3>Is there a GTA 6 PC release date?</H3>
      <p>No. The only timelines in circulation are unnamed-source reports, which we treat as rumour.</p>
      <H3>Can I stream GTA 6 to a PC?</H3>
      <p>Not through anything Rockstar or Xbox has announced. The Xbox Cloud Gaming launch names Xbox consoles only.</p>
      <H3>How long did earlier Rockstar games take to reach PC?</H3>
      <p>
        Per Yahoo Tech, GTA V took about 19 months and Red Dead Redemption 2 just over a year. Neither sets a date for GTA 6.
      </p>
      <p>
        For the console release, see our{" "}
        <Link href={newsPath("gta-6-confirmed-so-far")} className={L}>
          confirmed facts
        </Link>
        , the{" "}
        <Link href="/tools/edition-compare" className={L}>
          edition comparison
        </Link>
        , and the{" "}
        <Link href={newsPath("gta-6-performance-ps5-pro-xbox")} className={L}>
          performance guide
        </Link>
        . GTA 6 Online is also unannounced; that is covered separately in{" "}
        <Link href={newsPath("gta-6-online-release-date")} className={L}>
          what is confirmed about multiplayer
        </Link>
        .
      </p>

      <Sources>
        <Source href={RS} label="Rockstar Games: Grand Theft Auto VI (read 28 Nov 2026)" kind="Official" />
        <Source href={LAUNCH} label="Take-Two / Business Wire, 19 Nov 2026 (launch announcement)" kind="Official" />
        <Source href={XBOX} label="Xbox Wire, 10 Nov 2026" kind="Official, platform holder" />
        <Source href={VERGE} label="The Verge, 17 Sep 2026 (Zelnick on PC, via GamesRadar)" kind="Reputable outlet, general strategy only" />
        <Source href={PCG} label="PC Gamer, 10 Nov 2026" kind="Reputable outlet" />
        <Source href={POLY} label="Polygon, 10 Nov 2026" kind="Reputable outlet, reported, not official" />
        <Source href={GS} label="GameSpot, 10 Nov 2026" kind="Reputable outlet, reported, not official" />
        <Source href={YAHOO} label="Yahoo Tech (Just Jared), 15 Nov 2026" kind="Syndicated outlet, used for historical dates only" />
      </Sources>
    </NewsLayout>
  );
}
