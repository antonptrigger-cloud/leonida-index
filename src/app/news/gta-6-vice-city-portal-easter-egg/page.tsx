import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";
import { Spoiler } from "@/components/guides/Spoiler";
import { CreditImage } from "@/components/guides/CreditImage";

const SLUG = "gta-6-vice-city-portal-easter-egg";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const GS = "https://www.gamespot.com/articles/how-to-get-tommy-vercettis-shirt-and-bike-in-gta-6/";
const GR = "https://www.gamesradar.com/games/grand-theft-auto/gta-6s-coolest-easter-egg-so-far-is-so-intricate-that-only-real-vice-city-sickos-would-ever-find-it/";
const POLY = "https://www.polygon.com/gta-6-vice-city-portal-easter-egg-location-walkthrough-how-to-open/";

// Sourcing (read 26 Nov 2026, 13:42-13:50 AEST):
// - GameSpot, GamesRadar+ and Polygon all cover the Memeio find. Kotaku also appears to have a piece, but the page returned 503 this run, so it is not cited.
// - Exact steps, the Vice City cheat phrase, the power-station visit and the rewards sit behind spoiler toggles.
// - Vehicle reward and a Vinyl livery are not agreed; Polygon's "Tony Vercetti" wording is not repeated (GameSpot and GamesRadar+ say Tommy).
// - This is a secret, not a story mission, but the how-to is hidden so the lede stays spoiler-aware.

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Secrets" title="GTA 6's hidden Vice City portal easter egg" source="GameSpot, GamesRadar+, Polygon">
      <Lede>
        A content creator who goes by Memeio has cracked an unusually long Grand Theft Auto VI easter egg: a hidden sequence that, according to <Ext href={GS}>GameSpot</Ext>, <Ext href={GR}>GamesRadar+</Ext> and <Ext href={POLY}>Polygon</Ext>, opens a portal styled after 2002&rsquo;s Vice City.
        GamesRadar+ published its write-up on 25 November and led with a spoiler warning; GameSpot&rsquo;s guide ran on 23 November (US time) and Polygon&rsquo;s walkthrough on 24 November. The start point is a radio tower in Key Lento. The full route, the phrase it spells and the rewards sit behind spoiler toggles below. For other nods already on this site, see <Link href="/secrets/easter-eggs" className={L}>GTA 6 easter eggs</Link>.
      </Lede>
      <CreditImage
        src="/secrets/easter-eggs-vice-city-08.webp"
        alt="Official GTA 6 screenshot of Vice City at night, with lit arenas, a ferris wheel and a tall tower on the skyline. © Rockstar Games"
        width={1600}
        height={900}
        credit="Official screenshot (Vice City 08). © Rockstar Games"
      />

      <H2>What the outlets report, without the steps</H2>
      <p>
        GamesRadar+ says Memeio claimed, in a 23 November post, to be the first person to crack the code, after &ldquo;literally 3 days of rotting and searching for power stations.&rdquo; GameSpot also credits Memeio as the likely first find. None of the three outlets presents this as an official Rockstar walkthrough.
      </p>
      <Bullets>
        <li>
          <Lead>Where it starts:</Lead> all three place the first step at a radio tower in <Link href="/database/locations/key-lento" className={L}>Key Lento</Link>. GameSpot says the tower is west of Key Lento. Polygon names it the Badger radio tower, northeast of the Nifty Threads Island Wear shop. Those are not necessarily in conflict, but they are not worded the same way.
        </li>
        <li>
          <Lead>What you do next:</Lead> GamesRadar+ and Polygon say you then visit 12 LPL substations around Leonida in a set order, pressing buttons or pulling levers. Letters on the buildings spell a phrase taken from Vice City. After that, you are directed to a power station at night, where the portal opens.
        </li>
        <li>
          <Lead>What it looks like:</Lead> GamesRadar+ says the portal leads into the 1980s setting and 2002 graphics of Vice City, and that you still play as Jason rather than Tommy Vercetti. GameSpot simply calls it a trip back to the 2002 version of the city. Polygon calls it the original Vice City.
        </li>
      </Bullets>
      <p>
        This is a secret in the open world, not a story mission. If you want to hunt it yourself, stop here. The next two sections hide the sequence and the rewards.
      </p>

      <H2>The sequence</H2>
      <Spoiler label="the portal steps, the phrase and the power-station visit">
        <p>
          GameSpot says you climb the Key Lento radio tower, turn on a power switch and use an on-screen prompt. That plays a Vice City sound effect. Polygon describes a lever beside the door, then a button on a panel by an old television; if you have done it right, the TV shows the word &ldquo;Malibu.&rdquo; GamesRadar+, citing Memeio, also starts with powering up the Key Lento tower and hearing a Vice City sound effect.
        </p>
        <p>
          The 12 substations come next. Polygon says letters or short letter-groups on the outer walls spell, once combined, &ldquo;Life is passing me by,&rdquo; a PC cheat from Vice City that sped up time. GameSpot prints the same phrase in lowercase and also calls it a Vice City cheat. Polygon adds that a strip of pink tape marks the correct button or lever at each site, and that using the RydeMe app to fast travel, or swapping characters, resets the sequence so you have to start again at the tower. GameSpot says you must enter the phrase, as a cheat, at the substations without using fast travel, and it maps PlayStation face buttons to letters (triangle is W or Up, circle is D or Down, square is A, L1 is a period). We are not reprinting Polygon&rsquo;s full 12-stop list; that walkthrough lives on Polygon&rsquo;s page.
        </p>
        <p>
          After the last input, GameSpot says an unknown number texts &ldquo;U-235 REACTOR2 19-06,&rdquo; which it reads as: go to Reactor 2 between 7 p.m. and 6 a.m. It places Reactor 2 in the LPL Turtle Head power station and says to wait until at least 7 p.m. before going in. Polygon, after the 12th lever, says a message from an unknown contact tells you to head to the T. H. Power Station, east of Hamlet in Vice-Dale County, between 7 p.m. and 6 a.m. It puts the portal on the north side of the station, with energy along the cables, and warns that the grounds are heavily guarded; it suggests a helicopter or a swim to get in, then a lever on the left of the gate. GameSpot says you can stay in the past as long as you like, and that the exit portal remains until you use it. Polygon says you leave through the room behind the bar.
        </p>
        <p>
          Turtle Head and T. H. Power Station may be the same site described two ways, but the outlets do not say so outright, so we are leaving both wordings in place.
        </p>
      </Spoiler>

      <H2>The rewards, where the outlets differ</H2>
      <Spoiler label="the shirt, the bike and other claimed rewards">
        <Bullets>
          <li>
            <Lead>Agreed, with a wording caveat:</Lead> GameSpot and GamesRadar+ both say you receive Tommy Vercetti&rsquo;s Hawaiian shirt (GamesRadar+ calls it his iconic Hawaiian button-up; GameSpot just says his shirt). Polygon also describes a Hawaiian shirt, but prints the name as Tony Vercetti. We are following GameSpot and GamesRadar+ on the name.
          </li>
          <li>
            <Lead>Disputed vehicle:</Lead> GameSpot says you also get Tommy&rsquo;s classic Malibu bike. Polygon names the American Glory motorcycle, and tells you to register it. Those are not the same description, so the vehicle reward is disputed.
          </li>
          <li>
            <Lead>Single-source extra:</Lead> Polygon alone says completing the event unlocks a new livery for purchase at Vice Vinyl. Unconfirmed by the other two outlets.
          </li>
        </Bullets>
      </Spoiler>
      <Callout title="Not an official Rockstar guide" tone="note">
        <p>
          Rockstar has not published a walkthrough of this secret on the pages we read. Everything above is what GameSpot, GamesRadar+ and Polygon report from the find. For the wider Key Lento and Vice City maps, see <Link href="/database/locations/key-lento" className={L}>Key Lento</Link> and <Link href="/database/locations/vice-city" className={L}>Vice City</Link>.
        </p>
      </Callout>

      <Sources>
        <Source href={GS} label="GameSpot (Cheri Faulkner): How To Get Tommy Vercetti's Shirt And Bike In GTA 6, 23 Nov 2026, 06:22 PT / 24 Nov 2026, 00:22 AEST (read 26 Nov 2026, 13:43 AEST)" kind="News outlet" />
        <Source href={GR} label="GamesRadar+ (Jordan Gerblick): GTA 6's coolest Easter egg so far is so intricate that only real Vice City sickos would ever find it, 25 Nov 2026 (read 26 Nov 2026, 13:44 AEST)" kind="News outlet" />
        <Source href={POLY} label="Polygon (Paulo Kawanishi): Vice City portal Easter egg location in GTA 6, 24 Nov 2026, 17:11 ET / 25 Nov 2026, 08:11 AEST (read 26 Nov 2026, 13:44 AEST)" kind="News outlet" />
      </Sources>
    </NewsLayout>
  );
}
