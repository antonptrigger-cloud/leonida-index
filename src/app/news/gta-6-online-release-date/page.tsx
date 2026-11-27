import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, Ext, H2, H3, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";
import { CreditImage } from "@/components/guides/CreditImage";

const SLUG = "gta-6-online-release-date";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const PS = "https://www.playstation.com/en-us/games/grand-theft-auto-vi/";
const XBOX = "https://www.xbox.com/en-US/games/store/grand-theft-auto-vi/9NP019G7NZXT";
const PREORDER = "https://www.businesswire.com/news/home/20260624539426/en/Rockstar-Games-Announces-Pre-Orders-for-Grand-Theft-Auto-VI";
const LAUNCH = "https://www.businesswire.com/news/home/20261119830927/en/Rockstar-Games-Announces-Grand-Theft-Auto-VI-Now-Available";
const IGN = "https://www.ign.com/articles/take-two-boss-strauss-zelnick-on-gta-6-expectations-gta-online-and-the-decade-to-come";
const VERGE = "https://www.theverge.com/games/997116/twitch-ceo-gta-vi-multiplayer-is-coming-in-2027";
const GR = "https://www.gamesradar.com/games/grand-theft-auto/gta-6-online-multiplayer/";
const VICE = "https://www.vice.com/en/article/gta-6-online-release-date/";
const RT = "https://www.radiotimes.com/technology/gaming/gta-6-online-mode/";

// Sourcing (read 28 Nov 2026, 00:35-00:45 AEST):
// Official: PlayStation Store FAQ and product details; Xbox Store description and capabilities;
// Take-Two/Business Wire pre-order release (24 Jun 2026) and launch release (19 Nov 2026);
// Strauss Zelnick to IGN (9 Nov 2026 US / 10 Nov AEST), including IGN's quotation of Take-Two's financials.
// Reported, not official: The Verge (17 Sep 2026) on Dan Clancy / Bloomberg; GamesRadar (updated 25 Nov 2026);
// Vice (10 Nov 2026) on datamine entries; Radio Times (26 Nov 2026) for previous-game online timing only.
// Not used as fact: GamesRadar editorial ("all but guaranteed"); domain-renewal talk; court-filing player caps;
// Bloomberg documentary "a year later" line (no solid reputable write-up of the Schreier clarification);
// GameRant, Insider Gaming, dataminer social accounts, banned sources.
// Sony/Xbox legal footers about accounts or internet access are boilerplate, not a multiplayer confirmation.

export default function Page() {
  return (
    <NewsLayout
      slug={SLUG}
      kicker="News · Online"
      title="GTA 6 Online and multiplayer: what's confirmed"
      source="Rockstar, Take-Two, PlayStation, Xbox, IGN, The Verge, GamesRadar+"
    >
      <Lede>
        As of 28 November 2026, Grand Theft Auto VI is a single-player game. Rockstar and Take-Two have not announced a GTA 6 online mode, a name for one, a release date, or any multiplayer modes. Below is what those companies and the official storefronts have actually said, then what reputable outlets have reported. This page is updated in place.
      </Lede>
      <CreditImage
        src="/images/regions/vice-city.webp"
        alt="Official Grand Theft Auto VI screenshot of Vice City. © Rockstar Games"
        width={1280}
        height={720}
        credit="© Rockstar Games"
      />

      <H2>Officially confirmed</H2>
      <p>These points come from Rockstar, Take-Two, or the official PlayStation and Xbox store pages.</p>
      <Bullets>
        <li>
          <Lead>It launched as a single-player game.</Lead> Grand Theft Auto VI came out on 19 November 2026 for PlayStation 5 and Xbox Series X|S. Take-Two&rsquo;s launch announcement does not mention multiplayer, co-op, or a GTA 6 online mode (<Ext href={LAUNCH}>Take-Two / Business Wire, 19 Nov 2026</Ext>).
        </li>
        <li>
          <Lead>Rockstar and Take-Two have described it that way for months.</Lead> The official pre-order announcement said the game &ldquo;features a single-player experience&rdquo; (<Ext href={PREORDER}>Take-Two / Business Wire, 24 Jun 2026</Ext>).
        </li>
        <li>
          <Lead>Store listings still say the same thing after launch.</Lead> The PlayStation Store FAQ asks, &ldquo;Does Grand Theft Auto VI have any multiplayer modes or features?&rdquo; and answers: &ldquo;Grand Theft Auto VI is a single-player experience.&rdquo; The same page lists the game as one player, with offline play enabled (<Ext href={PS}>PlayStation Store</Ext>). The Xbox Store uses the same single-player line in its description and lists Single player among its capabilities, with no online or co-op capability shown (<Ext href={XBOX}>Xbox Store</Ext>).
        </li>
        <li>
          <Lead>No GTA 6 Online name, date, window, or mode list has been announced.</Lead> As of this update, neither Rockstar nor Take-Two has named a GTA 6 online mode, given it a release date, or described any modes for one. GamesRadar+, in a page last updated on 25 November, likewise reports that no online mode is in the launch game and that no release date has been announced (<Ext href={GR}>GamesRadar+</Ext>).
        </li>
      </Bullets>

      <H2>The existing GTA Online is still being supported</H2>
      <p>
        This is the GTA Online service that already exists in Grand Theft Auto V, not a new GTA 6 mode. Take-Two CEO Strauss Zelnick told IGN: &ldquo;We intend to keep supporting GTA Online and it has been very successful. It&rsquo;s been very resilient. It has continued to grow over the years, so we feel very good about it.&rdquo; In the same interview, IGN notes a line in Take-Two&rsquo;s financials about Rockstar continuing to support GTA Online &ldquo;with new content and ongoing events for its vast community&rdquo; (<Ext href={IGN}>IGN, 9 Nov 2026</Ext>).
      </p>
      <p>
        The June pre-order announcement also tied a free month of GTA+ for digital pre-orders to &ldquo;the ever-evolving world of GTA Online&rdquo; and to playing Grand Theft Auto V and other Rockstar titles (<Ext href={PREORDER}>Take-Two / Business Wire, 24 Jun 2026</Ext>). GTA+ later added optional single-player benefits in GTA 6; those are not an online mode. See our{" "}
        <Link href={newsPath("gta-6-gta-plus-story-perks")} className={L}>
          GTA+ story-perk guide
        </Link>
        .
      </p>

      <H2>Launch timing</H2>
      <p>
        There is no official date, season, or year for a GTA 6 online mode. Anyone giving a firm window is going beyond what Rockstar and Take-Two have said.
      </p>
      <Callout title="Previous games are not a schedule" tone="unconfirmed">
        <p>
          Earlier Rockstar games did not always ship their online modes on day one. Radio Times notes that GTA Online arrived about two weeks after Grand Theft Auto V in 2013, and that Red Dead Online arrived about seven months after Red Dead Redemption 2 (<Ext href={RT}>Radio Times, 26 Nov 2026</Ext>). That is past-game history, not a plan Rockstar has announced for GTA 6.
        </p>
      </Callout>

      <H2>What is known about modes</H2>
      <p>
        Officially, nothing. Rockstar and Take-Two have not described heists, races, Freemode, a player cap, co-op story play, or any other mode for a GTA 6 online offering. The PlayStation FAQ answers the question about &ldquo;any multiplayer modes or features&rdquo; with the single-player line above. Until they publish a mode list, there isn&rsquo;t one to report.
      </p>

      <H2>Reported, not confirmed</H2>
      <p>The items below have been published by reputable outlets. They are not announcements from Rockstar or Take-Two.</p>
      <Callout title="Reported, not official" tone="unconfirmed">
        <ul className="mt-2x list-disc pl-6x">
          <li>
            <Lead>The 2027 talk:</Lead> It comes from Twitch CEO Dan Clancy, not from Rockstar. In a Bloomberg interview summarised by The Verge on 17 September 2026, Clancy said Twitch had &ldquo;spent a lot of time talking with Rockstar about their plans,&rdquo; then added: &ldquo;You are going to see this big bump with GTA 6, but then an even bigger one next year when they launch multiplayer&rdquo; (<Ext href={VERGE}>The Verge</Ext>). That is a partner&rsquo;s expectation. It is not a release date.
          </li>
          <li>
            <Lead>File and database finds:</Lead> Vice reports that the PlayStation Game Size account found PS5 database entries for GTA VI named joinSession, launchActivity and launchMultiplayerActivity, and says those finds do not confirm an online mode (<Ext href={VICE}>Vice, 10 Nov 2026</Ext>). GamesRadar+ has also reported inactive multiplayer code in the files (<Ext href={GR}>GamesRadar+</Ext>). File labels are not a launch plan, a date, or a mode list.
          </li>
        </ul>
      </Callout>

      <H2>Frequently asked questions</H2>
      <H3>Does GTA 6 have online multiplayer?</H3>
      <p>
        Not as of 28 November 2026. PlayStation and Xbox both list it as a single-player experience, and no GTA 6 online mode has been announced.
      </p>
      <H3>When is GTA 6 Online coming out?</H3>
      <p>
        There is no announced date or window. The 2027 timing often repeated online is a partner&rsquo;s expectation, not a statement from Rockstar or Take-Two.
      </p>
      <H3>What modes will it have?</H3>
      <p>None have been announced. There is no official list of modes, features, or player counts for a GTA 6 online offering.</p>
      <H3>Can I play GTA 6 co-op with friends?</H3>
      <p>
        Not according to the official storefronts, which list the game as one player. You can still play the existing GTA Online in Grand Theft Auto V with friends.
      </p>
      <H3>Is the current GTA Online shutting down?</H3>
      <p>No. Take-Two has said it intends to keep supporting GTA Online, including with new content and ongoing events.</p>
      <p>
        For the wider confirmed picture, see{" "}
        <Link href={newsPath("gta-6-confirmed-so-far")} className={L}>
          what is confirmed so far
        </Link>
        , our note on the{" "}
        <Link href={newsPath("gta-6-pc-release-status")} className={L}>
          PC version
        </Link>{" "}
        (also unannounced), and the{" "}
        <Link href="/guides/beginner" className={L}>
          beginner guide
        </Link>{" "}
        to the single-player game.
      </p>

      <Sources>
        <Source href={PS} label="PlayStation Store: Grand Theft Auto VI (FAQ and product details)" kind="Official, platform holder" />
        <Source href={XBOX} label="Xbox Store: Grand Theft Auto VI" kind="Official, platform holder" />
        <Source href={PREORDER} label="Take-Two / Business Wire, 24 Jun 2026 (pre-order announcement)" kind="Official" />
        <Source href={LAUNCH} label="Take-Two / Business Wire, 19 Nov 2026 (launch announcement)" kind="Official" />
        <Source href={IGN} label="IGN, 9 Nov 2026 (Strauss Zelnick interview)" kind="Reputable outlet, quotes Take-Two CEO and financials" />
        <Source href={VERGE} label="The Verge, 17 Sep 2026 (Bloomberg interview with Twitch CEO Dan Clancy)" kind="Reputable outlet, reported, not official" />
        <Source href={GR} label="GamesRadar+, updated 25 Nov 2026" kind="Reputable outlet" />
        <Source href={VICE} label="Vice, 10 Nov 2026" kind="Reputable outlet, reported, not official" />
        <Source href={RT} label="Radio Times, 26 Nov 2026 (previous-game online timing)" kind="Reputable outlet, historical context only" />
      </Sources>
    </NewsLayout>
  );
}
