import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-online-release-date";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Online" title="GTA 6 Online: Release Date & What We Know" source="Take-Two, PlayStation, Vice, The Verge">
      <Lede>
        GTA 6 launches as a single-player game. Rockstar has not announced an online mode, a name or a date for one. Here is what is official, what is reported, and what is only
        speculation. This page is updated in place.
      </Lede>

      <H2>What is official</H2>
      <Bullets>
        <li>
          <Lead>Single-player at launch:</Lead> PlayStation&rsquo;s store page says &ldquo;Grand Theft Auto VI is a single-player experience&rdquo; and lists the game as one player with offline play enabled (<Ext href="https://www.playstation.com/en-us/games/grand-theft-auto-vi/">PlayStation Store</Ext>).
          Vice reports Rockstar has consistently described the release that way (<Ext href="https://www.vice.com/en/article/gta-6-online-release-date/">Vice</Ext>).
        </li>
        <li>
          <Lead>Take-Two:</Lead> &ldquo;GTA 6 is a single-player title and is due to release this November. We will continue to support GTA Online after GTA 6 release and beyond.&rdquo; (statement quoted by{" "}
          <Ext href="https://gamerant.com/gta-6-online-take-two-statement-release-beyond/">Game Rant</Ext>).
        </li>
        <li>
          <Lead>No date:</Lead> as of 10 Nov, Vice reports neither Rockstar nor Take-Two has announced a GTA 6 Online release date or window. PC Gamer, the same day, reports no known plans for a new GTA Online set in Vice City (<Ext href="https://www.pcgamer.com/games/grand-theft-auto/the-experiences-on-console-and-pc-tend-to-be-roughly-the-same-says-take-two-ceo-in-response-to-question-about-gta-roleplaying/">PC Gamer</Ext>).
        </li>
      </Bullets>
      <p>
        In practice that means the GTA Online you can play today is the one in GTA V. Take-Two has said it will keep supporting it.
      </p>

      <H2>Where the 2027 talk comes from</H2>
      <p>
        The 2027 window traces to Twitch CEO Dan Clancy. In a September Bloomberg interview summarised by The Verge, he said Twitch had talked with Rockstar about its plans and that &ldquo;you are going to see this big bump with GTA 6, but then an even bigger one next year when they launch multiplayer&rdquo; (<Ext href="https://www.theverge.com/games/997116/twitch-ceo-gta-vi-multiplayer-is-coming-in-2027">The Verge</Ext>).
        Vice notes that this is an expectation from a partner, not a date from Rockstar.
      </p>

      <Callout title="Unconfirmed" tone="unconfirmed">
        <p>Everything below is reported or inferred, not announced.</p>
        <ul className="mt-2x list-disc pl-6x">
          <li>
            <Lead>Datamine:</Lead> Vice reports that the PlayStation Game Size account found three PS5 database entries for GTA VI: joinSession, launchActivity and launchMultiplayerActivity. Vice says no online mode is confirmed.
          </li>
          <li>
            <Lead>Separate download:</Lead> GameSpot says some players reported the story appearing as a separate download, &ldquo;fuelling speculation&rdquo; about a new online mode. Neither Rockstar nor Sony has commented.
          </li>
          <li>
            <Lead>Court filings:</Lead> Game Rant quotes Rockstar&rsquo;s own filing in an employment tribunal case, which says staff discussed &ldquo;an online 32-player format which was highly confidential at that time&rdquo;. The filing does not name GTA 6 Online or say what the final player cap will be.
          </li>
        </ul>
      </Callout>

      <p>
        While you wait, see the <Link href={newsPath("gta-6-confirmed-so-far")} className={L}>confirmed facts</Link>, our guide to{" "}
        <Link href={newsPath("gta-6-pc-release-status")} className={L}>GTA 6 on PC</Link>, the <Link href="/map" className={L}>Leonida map</Link> and the{" "}
        <Link href="/database/characters" className={L}>character profiles</Link> (spoiler-aware).
      </p>

      <Sources>
        <Source href="https://www.playstation.com/en-us/games/grand-theft-auto-vi/" label="PlayStation Store: Grand Theft Auto VI" kind="Official, platform holder" />
        <Source href="https://gamerant.com/gta-6-online-take-two-statement-release-beyond/" label="Game Rant, 1 Oct 2026 (Take-Two statement)" kind="Reputable outlet quoting official statement" />
        <Source href="https://www.vice.com/en/article/gta-6-online-release-date/" label="Vice, 10 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.theverge.com/games/997116/twitch-ceo-gta-vi-multiplayer-is-coming-in-2027" label="The Verge, 17 Sep 2026 (Bloomberg interview)" kind="Reputable outlet" />
        <Source href="https://www.pcgamer.com/games/grand-theft-auto/the-experiences-on-console-and-pc-tend-to-be-roughly-the-same-says-take-two-ceo-in-response-to-question-about-gta-roleplaying/" label="PC Gamer, 10 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.gamespot.com/articles/gta-6-ps5-pro-features-frame-rates-and-xbox-cloud-gaming-details-confirmed-by-rockstar/" label="GameSpot, 10 Nov 2026" kind="Reputable outlet" />
      </Sources>
    </NewsLayout>
  );
}
