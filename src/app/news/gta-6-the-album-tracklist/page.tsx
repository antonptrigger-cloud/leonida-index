import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-the-album-tracklist";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const TAKE2 = "https://www.take2games.com/ir/news/rockstar-games-announces-grand-theft-auto-vi-now-available";
const ROCKSTAR = "https://www.rockstargames.com/VI/music";
const APPLE = "https://music.apple.com/us/album/grand-theft-auto-vi-the-album/6812476961";
const BILLBOARD = "https://www.billboard.com/music/music-news/grand-theft-auto-vi-the-album-1236385865/";
const COMPLEX = "https://www.complex.com/music/a/shawn-setaro/grand-theft-auto-vi-the-album-released";
const DMN = "https://www.digitalmusicnews.com/2026/11/19/grand-theft-auto-vi-the-album/";

// Sourcing (read 20 Nov 2026, 17:03-17:30 AEST):
// - Tracklist: Apple Music US listing (34 songs, 1 hr 37 min, 20 Nov 2026, (P) Atlantic Recording Corporation and Take-Two
//   Interactive), checked title by title against Complex's "official tracklist". Same order and titles. The 34 track lengths
//   on Apple add up to about 97.9 minutes, matching the listed 1 hr 37 min. Artist credits follow Complex: Apple writes
//   "DaM FunK" and lists track 34 as Clarke, Glasper & Dayes, and the Rockstar music page spells PinkPantheress as "Pink Pantheress".
// - No leaked material is used: the list is from the official/store sources only.
// - Timing: Take-Two's 19 Nov release says "will be available at midnight" (no zone, not converted to AEST); Apple lists 20 Nov;
//   Billboard and Complex say it hit streaming on Friday 20 Nov; Digital Music News (19 Nov) says it was available "now".
// - Atlantic Records' own site returned 403; no Atlantic press release cited. Exclusive formats come from Digital Music News only.
// - Billboard counts 12 early singles; Rockstar's music page lists 10. Both stated.
// - Festival overlap checked against /news/gta-6-festival-set-times-heat-night (Rockstar's schedule).
// - Skipped: Billboard's Sensor Tower sales line (covered in our sales piece), UMPG licensing detail (trade angle).

const TRACKS: React.ReactNode[][] = [
  ["1", "Starting From Zero (feat. Michael McDonald)", "Justice"],
  ["2", "That's It (feat. Future & Metro Boomin)", "Yung Lean"],
  ["3", "AHH YEA", "Playboi Carti"],
  ["4", "RHYNO", "Travis Scott"],
  ["5", "Sexy Magic", "CA7RIEL & Paco Amoroso, PinkPantheress, Fred again.., Etienne de Crécy"],
  ["6", "Flower In A Hurricane (feat. Tame Impala, SZA & King Gizzard & The Lizard Wizard)", "Justice"],
  ["7", "Go Easy", "Dua Lipa"],
  ["8", "Last Thing You Need", "Morgan Wallen"],
  ["9", "X", "JHAYCO"],
  ["10", "Suzuki", "Fuerza Regida"],
  ["11", "Macacoa 2000", "Rauw Alejandro"],
  ["12", "Dance With Me (feat. elkan)", "A Boogie wit da Hoodie"],
  ["13", "Bigger", "Burna Boy"],
  ["14", "COUNT UP", "Gunna"],
  ["15", "Let's Rock", "Kodak Black & Don Toliver"],
  ["16", "WAKIN UP FLEX", "Young Thug"],
  ["17", "IKYFL", "Tee Grizzley"],
  ["18", "TF?", "Don Toliver"],
  ["19", "Don't Chart", "Cardi B"],
  ["20", "GMA", "JT"],
  ["21", "Power Trip", "JENNIE"],
  ["22", "Blood In Your Eyes", "Tove Lo"],
  ["23", "Fast Emotion", "Zara Larsson"],
  ["24", "Sweet Like Candy", "Camila Cabello"],
  ["25", "Only One", "Fcukers"],
  ["26", "Sandunguea", "Arca"],
  ["27", "TRDWFE", "Rina Sawayama"],
  ["28", "All Again", "Rose Gray"],
  ["29", "Crazy For You", "Lana Del Rey"],
  ["30", "Largate", "Kali Uchis & Helado Negro"],
  ["31", "NO ME BUSQUES", "Omar Apollo"],
  ["32", "Bright Lights, Big City", "Keith Richards"],
  ["33", "Stone Kold Krazy Luuv", "Jesse Johnson & DāM-FunK"],
  ["34", "Overtown Lights", "Stanley Clarke, Yussef Dayes & Robert Glasper"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Music" title="GTA 6: The Album is out: full 34-track list" source="Take-Two release, Rockstar Games, Apple Music, Billboard, Complex">
      <Lede>
        The neon has a soundtrack. Grand Theft Auto VI: The Album, the official soundtrack from Rockstar Games and Atlantic Records, is now on streaming services with 34 original tracks, from Playboi Carti and Dua Lipa to JENNIE, Camila Cabello, Burna Boy and Keith Richards.
        Here is the full tracklist, when it landed, the physical editions and how it differs from Justice&rsquo;s score, which is still to come.
      </Lede>

      <H2>The key facts</H2>
      <Bullets>
        <li>
          <Lead>34 tracks:</Lead> Take-Two&rsquo;s launch-day press release calls it &ldquo;the official soundtrack from Atlantic Records featuring 34 original tracks&rdquo; (<Ext href={TAKE2}>Take-Two</Ext>), and Rockstar&rsquo;s music page gives the same count (<Ext href={ROCKSTAR}>Rockstar Games</Ext>). The Apple Music listing runs 34 songs and 1 hour 37 minutes (<Ext href={APPLE}>Apple Music</Ext>).
        </li>
        <li>
          <Lead>When it landed:</Lead> the 19 November release said the album &ldquo;will be available at midnight on all major music streaming services and on vinyl or CD at gtavi-thealbum.com&rdquo; (<Ext href={TAKE2}>Take-Two</Ext>). Apple Music lists a 20 November release date, and Billboard and Complex both report it hit streaming on Friday 20 November, about a day after the game (<Ext href={BILLBOARD}>Billboard</Ext>, <Ext href={COMPLEX}>Complex</Ext>).
        </li>
        <li>
          <Lead>Who is on it:</Lead> Travis Scott, Cardi B, Lana Del Rey, Morgan Wallen, Gunna, Don Toliver, Young Thug, Rauw Alejandro, Fuerza Regida, Zara Larsson, Tove Lo, Kali Uchis and more. Justice have two tracks on the album too, including &ldquo;Flower In A Hurricane&rdquo; with Tame Impala, SZA and King Gizzard &amp; The Lizard Wizard (<Ext href={COMPLEX}>Complex</Ext>).
        </li>
        <li>
          <Lead>Early singles:</Lead> Rockstar&rsquo;s music page lists ten singles, among them Travis Scott&rsquo;s &ldquo;RHYNO&rdquo; and Cardi B&rsquo;s &ldquo;Don&rsquo;t Chart&rdquo; (<Ext href={ROCKSTAR}>Rockstar Games</Ext>). Billboard counts 12 of the 34 as early singles (<Ext href={BILLBOARD}>Billboard</Ext>), so the two counts differ.
        </li>
      </Bullets>

      <H2>Full tracklist</H2>
      <DataTable head={["#", "Track", "Artist"]} rows={TRACKS} minWidth="34rem" />
      <p className="text-xs text-muted">
        Titles and order match the Apple Music listing and Complex&rsquo;s official tracklist. Artist credits follow Complex, which differs from Apple in a few spellings and in the order of the three credits on track 34 (<Ext href={APPLE}>Apple Music</Ext>, <Ext href={COMPLEX}>Complex</Ext>). Apple Music lists the whole album at 1 hour 37 minutes.
      </p>

      <H2>Vinyl, CD and exclusives</H2>
      <p>
        Take-Two points buyers to gtavi-thealbum.com for vinyl and CD (<Ext href={TAKE2}>Take-Two</Ext>), and Rockstar&rsquo;s music page has standard and exclusive vinyl in its shop (<Ext href={ROCKSTAR}>Rockstar Games</Ext>). According to Digital Music News, three editions are Atlantic Records exclusives: a limited-edition liquid-filled vinyl, a splatter-edition vinyl and a CD jewel case, with separate vinyl designs for Blood Records, Best Buy, Walmart, Amazon, Barnes &amp; Noble, Target, Urban Outfitters and indie record stores (<Ext href={DMN}>Digital Music News</Ext>). Stock and shipping to Australia are not covered in any of these sources.
      </p>

      <H2>Not the score: Justice arrives 11 December</H2>
      <p>
        The album is separate from Grand Theft Auto VI: Original Score by Justice. Rockstar says the score album has 30 tracks plus digital bonus tracks and arrives on 11 December on streaming, CD and vinyl (<Ext href={ROCKSTAR}>Rockstar Games</Ext>). For the in-game stations, hosts and genres, see our <Link href="/database/radio-stations" className={L}>GTA 6 radio stations and soundtrack guide</Link>. None of the sources above say which album tracks play on which in-game station.
      </p>

      <H2>Live in Miami this weekend</H2>
      <p>
        Several album artists are booked for Grand Theft Auto VI: The Festival at Mana Wynwood in Miami on Saturday 21 November, including Cardi B, Travis Scott and Rauw Alejandro, Billboard reports (<Ext href={BILLBOARD}>Billboard</Ext>). Digital Music News also names CA7RIEL &amp; Paco Amoroso, Metro Boomin, Justice, Kodak Black and Fcukers as soundtrack artists on the bill (<Ext href={DMN}>Digital Music News</Ext>), and all of them appear on Rockstar&rsquo;s schedule as we reported. Our <Link href={newsPath("gta-6-festival-set-times-heat-night")} className={L}>GTA 6 Festival set times</Link> piece has the full schedule converted to Brisbane time. New to Leonida and want the radio on while you learn the ropes? Start with the <Link href="/guides/beginner" className={L}>GTA 6 beginner guide</Link>.
      </p>

      <Callout title="Unconfirmed" tone="unconfirmed">
        <p>
          Outlets disagree on the exact release moment: Digital Music News, published on 19 November, described the album as available on streaming platforms &ldquo;now&rdquo;, while Apple Music, Billboard and Complex give 20 November. Take-Two&rsquo;s &ldquo;midnight&rdquo; has no time zone, so we have not converted it to AEST.
        </p>
      </Callout>

      <Sources>
        <Source href={TAKE2} label="Take-Two Interactive: Rockstar Games Announces Grand Theft Auto VI Now Available, 19 Nov 2026 (read 20 Nov 2026, 17:03 AEST)" kind="Official, for the 34 tracks, Atlantic Records and the streaming/vinyl/CD release" />
        <Source href={ROCKSTAR} label="Rockstar Games: The Music of Grand Theft Auto VI (read 20 Nov 2026, 17:04 AEST)" kind="Official, for the track count, early singles, shop and Justice score details" />
        <Source href={APPLE} label="Apple Music: Grand Theft Auto VI: The Album (US listing, read 20 Nov 2026, 17:04 AEST)" kind="Store listing, for the tracklist, running time and release date" />
        <Source href={BILLBOARD} label="Billboard (Michael Saponara): 'Grand Theft Auto VI: The Album' Is Here, 20 Nov 2026 (read 20 Nov 2026, 17:03 AEST)" kind="News outlet" />
        <Source href={COMPLEX} label="Complex (Shawn Setaro): 'Grand Theft Auto VI: The Album' Is Here: Listen, 20 Nov 2026 (read 20 Nov 2026, 17:06 AEST)" kind="News outlet, for the official tracklist" />
        <Source href={DMN} label="Digital Music News (Ashley King): Atlantic Drops Hefty, 34-Track 'Grand Theft Auto VI: The Album', 19 Nov 2026 (read 20 Nov 2026, 17:04 AEST)" kind="News outlet, for the exclusive editions" />
      </Sources>
    </NewsLayout>
  );
}
