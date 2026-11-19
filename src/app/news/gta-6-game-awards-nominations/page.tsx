import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { CAST_PATH } from "@/lib/characters/cast";
import { characterPath } from "@/lib/characters/characters";
import { Bullets, Callout, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-game-awards-nominations";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const TGA = "https://thegameawards.com/nominees";
const PERF = "https://thegameawards.com/categories/best-performance";
const VGC = "https://www.videogameschronicle.com/news/gta-6-is-the-most-nominated-game-at-the-game-awards-2026/";
const SHACK = "https://www.shacknews.com/article/151383/gta-6-the-game-awards-2026-nominations";
const GS = "https://www.gamespot.com/articles/here-are-the-most-nominated-games-and-publishers-at-the-game-awards-this-year/";
const POLY = "https://www.polygon.com/game-awards-2026-nominees-most-nominations-gta-6-zelda/";
const VERGE = "https://www.theverge.com/games/1035602/gta-vis-voice-actor-for-lucia-was-revealed-by-the-game-awards";
const POLYP = "https://www.polygon.com/gta-6-lucia-actor-confirmed-game-awards-2026/";
const PCG = "https://www.pcgamer.com/games/live/news/grand-theft-auto-6-live-launch-coverage/";

// Category list: Shacknews says it confirmed the eight itself; VGC's full nominee list matches. Rivals per category are from VGC's full list.
const CATS: React.ReactNode[][] = [
  ["Game of the Year", "007 First Light, Control Resonant, Phantom Blade Zero, Resident Evil Requiem, The Legend of Zelda: Ocarina of Time"],
  ["Best Game Direction", "Control Resonant, Phantom Blade Zero, Pragmata, Resident Evil Requiem"],
  ["Best Narrative", "007 First Light, Control Resonant, Resident Evil Requiem, The Blood of Dawnwalker"],
  ["Best Art Direction", "Control Resonant, Mouse: P.I. For Hire, Phantom Blade Zero, The Legend of Zelda: Ocarina of Time"],
  ["Best Score and Music", "Ace Combat 8: Wings of Theve, Mixtape, Phantom Blade Zero, The Legend of Zelda: Ocarina of Time"],
  ["Best Audio Design", "Ace Combat 8: Wings of Theve, Control Resonant, Resident Evil Requiem, Star Wars: Galactic Racer"],
  ["Best Performance (Manni L. Perez)", "Angela Sant\u2019Albano (Resident Evil Requiem), Liam McIntyre (Marvel\u2019s Wolverine), Patrick Gibson (007 First Light), Rahul Kohli (Saros)"],
  ["Best Action/Adventure", "007 First Light, Control Resonant, Pragmata, Resident Evil Requiem, The Legend of Zelda: Ocarina of Time"],
];

const LEADERS: React.ReactNode[][] = [
  ["Grand Theft Auto VI", "8"],
  ["Control Resonant", "6"],
  ["Resident Evil Requiem", "6"],
  ["Phantom Blade Zero", "5"],
  ["Big Walk, 007 First Light, The Legend of Zelda: Ocarina of Time", "4 each"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Awards" title="GTA 6 leads The Game Awards 2026 with eight nominations" source="The Game Awards + reported">
      <Lede>
        Grand Theft Auto VI is the most-nominated game at The Game Awards 2026, with eight nominations including Game of the Year. The nominees were announced on 17 November (US time), two days before the game launched, and GameSpot, Polygon, Shacknews and VGC all report the same count of eight.
        The winners are revealed at the show on Thursday 10 December (US time). Here is every category GTA 6 is up for, who it is up against, what the Best Performance nomination does and does not confirm about the cast, and how voting works. No story spoilers.
      </Lede>

      <H2>Every GTA 6 nomination</H2>
      <p>
        Shacknews lists the eight categories and says it checked the count itself (<Ext href={SHACK}>Shacknews</Ext>). The rival nominees below come from VGC&rsquo;s full list (<Ext href={VGC}>VGC</Ext>); the official list is on <Ext href={TGA}>The Game Awards&rsquo; nominees page</Ext>.
      </p>
      <DataTable head={["Category", "Also nominated"]} rows={CATS} minWidth="34rem" />

      <H2>The most-nominated games</H2>
      <p>
        These counts are from GameSpot&rsquo;s tally, and Polygon and Shacknews give the same figures for the top four (<Ext href={GS}>GameSpot</Ext>, <Ext href={POLY}>Polygon</Ext>, <Ext href={SHACK}>Shacknews</Ext>). Shacknews says Geoff Keighley shared the most-nominated list on his social media after the announcement.
      </p>
      <DataTable head={["Game", "Nominations"]} rows={LEADERS} minWidth="24rem" />
      <Bullets>
        <li>
          <Lead>One outlet differs:</Lead> VGC&rsquo;s article puts Control Resonant and Resident Evil Requiem at eight each. GameSpot, Polygon and Shacknews all say six, so we use six. Every outlet we read agrees GTA 6 has eight and is the most nominated.
        </li>
        <li>
          <Lead>Publishers:</Lead> GameSpot lists Nintendo as the most-nominated publisher with 12, then Capcom (11), Annapurna and PlayStation (9 each), and Rockstar Games and Xbox (8 each).
        </li>
      </Bullets>

      <H2>Best Performance: does this confirm Lucia&rsquo;s actor?</H2>
      <p>
        Not officially. The Game Awards lists Manni L. Perez as a Best Performance nominee for Grand Theft Auto VI. The Verge says Rockstar has not publicly named the performers for its two leads, and that the nominee video credits Perez for her work in the game (<Ext href={VERGE}>The Verge</Ext>). Polygon says the nomination does not name her role and that Rockstar has confirmed no cast members (<Ext href={POLYP}>Polygon</Ext>).
        Shacknews and VGC both describe the nomination as Perez &ldquo;as Lucia&rdquo;, and PC Gamer calls it not hard to guess (<Ext href={PCG}>PC Gamer</Ext>), but that link comes from the outlets, not from Rockstar.
        Our <Link href={CAST_PATH} className={L}>GTA 6 cast page</Link> and <Link href={characterPath("lucia-caminos")} className={L}>Lucia Caminos profile</Link> track what is confirmed and what is reported.
      </p>

      <H2>How the winners are picked, and when</H2>
      <Bullets>
        <li>
          <Lead>Who votes:</Lead> VGC says a jury of media outlets chose the nominees and that winners are decided by a blended vote, 90% jury and 10% public (<Ext href={VGC}>VGC</Ext>). GameSpot, VGC and PC Gamer each disclose that they sit on the jury.
        </li>
        <li>
          <Lead>Early access:</Lead> GameSpot says jury members had already played GTA 6. PC Gamer says the announcement notes that jurors were in some cases given early access to games for the nomination process. Polygon asks whether every judge had time to play it before voting.
        </li>
        <li>
          <Lead>Fan voting:</Lead> The Game Awards&rsquo; site says saved ballots must be finalised before 9pm ET / 6pm PT on 9 December. By our conversion that is 12:00 pm AEST (Brisbane) on Thursday 10 December.
        </li>
        <li>
          <Lead>The show:</Lead> Thursday 10 December (US time), live from the Peacock Theater in Los Angeles and free to stream on more than 40 platforms, per VGC. The sources we read do not give a start time, so check The Game Awards&rsquo; site closer to the date for your local time.
        </li>
      </Bullets>

      <Callout title="Why a game nominated before launch" tone="note">
        <p>
          GTA 6 was nominated two days before it unlocked on 19 November, which Polygon calls an awkward situation and Shacknews calls &ldquo;a little strange&rdquo;. Critics who had played it were already high on it: it opened at 99 on Metacritic, which our <Link href={newsPath("gta-6-reviews-metacritic-99")} className={L}>review round-up</Link> covers. For the basics Rockstar has confirmed, see <Link href={newsPath("gta-6-confirmed-so-far")} className={L}>what is confirmed so far</Link>.
        </p>
      </Callout>

      <Sources>
        <Source href={TGA} label="The Game Awards: nominees and fan voting (read 19 Nov 2026)" kind="Official, awards organiser" />
        <Source href={PERF} label="The Game Awards: Best Performance nominees" kind="Official, awards organiser" />
        <Source href={SHACK} label="Shacknews (TJ Denzer): GTA 6 was the most nominated game at The Game Awards 2026, 17 Nov 2026" kind="News outlet" />
        <Source href={GS} label="GameSpot (Eddie Makuch): the most nominated games and publishers at The Game Awards, 18 Nov 2026" kind="News outlet, jury member" />
        <Source href={POLY} label="Polygon (Elijah Gonzalez): GTA 6 becomes the clear Game Awards 2026 frontrunner, 17 Nov 2026" kind="News outlet" />
        <Source href={VGC} label="VGC (Andy Robinson): GTA 6 is the most nominated game at The Game Awards 2026, 17 Nov 2026, with full nominee list" kind="News outlet, jury member" />
        <Source href={VERGE} label="The Verge (Jay Peters): GTA VI's voice actor for Lucia was revealed by The Game Awards, 17 Nov 2026" kind="News outlet" />
        <Source href={POLYP} label="Polygon (Austin Manchester): the Best Performance nomination and GTA 6's rumored Lucia actor, 17 Nov 2026" kind="News outlet" />
        <Source href={PCG} label="PC Gamer: GTA 6 live launch coverage" kind="News outlet, jury member" />
      </Sources>
    </NewsLayout>
  );
}
