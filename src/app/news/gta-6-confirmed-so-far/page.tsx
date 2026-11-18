import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-confirmed-so-far";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Explainer" title="What is confirmed" source="Official">
      <Lede>
        GTA 6 is out in New Zealand and unlocks everywhere else over the next day. This is the short list of facts that Rockstar,
        Take-Two or the platform holders have stated on the record. Anything that rests on leaks or insiders stays out of the main list.
      </Lede>

      <H2>Release and platforms</H2>
      <Bullets>
        <li>
          <Lead>Release date:</Lead> 19 November 2026 (
          <Ext href="https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/rockstar-games-announces-pre-orders-grand-theft-auto-vi/">Take-Two, 24 Jun</Ext>
          ). It unlocks at midnight local time, so the exact hour depends on where you are. See the{" "}
          <Link href={newsPath("gta-6-release-countdown")} className={L}>release time by region</Link>.
        </li>
        <li>
          <Lead>Platforms:</Lead> PlayStation 5 and Xbox Series X|S. Rockstar&rsquo;s <Ext href="https://www.rockstargames.com/VI">GTA VI site</Ext>{" "}
          lists only those two, and no PC release has been announced.
        </li>
        <li>
          <Lead>PS4 and Xbox One:</Lead> not playable natively. Sony says the game is PS5 only (
          <Ext href="https://www.playstation.com/en-us/games/grand-theft-auto-vi/">PlayStation Store</Ext>). Xbox One can stream it through Xbox Cloud Gaming from 1 AM ET on
          19 November (<Ext href="https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/">Xbox Wire</Ext>).
        </li>
        <li>
          <Lead>PS5 Pro:</Lead> Sony lists PS5 Pro enhancements including PSSR upscaling and ray-traced shadows (
          <Ext href="https://blog.playstation.com/2026/11/10/pre-load-grand-theft-auto-vi-on-ps5-starting-today/">PlayStation Blog</Ext>).
        </li>
        <li>
          <Lead>PS5 system update:</Lead> PlayStation Support says a system software update is required before you can play. See the{" "}
          <Link href={newsPath("gta-6-ps5-update-patches-servers")} className={L}>PS5 update checklist</Link>.
        </li>
      </Bullets>

      <H2>Price and editions</H2>
      <Bullets>
        <li><Lead>Standard Edition:</Lead> $79.99 (US).</li>
        <li><Lead>Ultimate Edition:</Lead> $99.99 (US), with extra vehicles, weapons, apparel and shops.</li>
        <li>
          <Lead>Physical copies</Lead> are a download code in a box. PlayStation Support says no disc is included (
          <Ext href="https://www.playstation.com/en-us/support/games/gta-vi-support/">PlayStation Support</Ext>).
        </li>
      </Bullets>
      <p>
        Prices are from <Ext href="https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/rockstar-games-announces-pre-orders-grand-theft-auto-vi/">Take-Two</Ext>.
        Full breakdown in the <Link href={newsPath("gta-6-preload-editions-pricing")} className={L}>preload and editions guide</Link>.
      </p>

      <H2>Preload</H2>
      <Bullets>
        <li>
          Preload opened on 10 November, at midnight local time on PS5 and midnight GMT on Xbox Series X|S (
          <Ext href="https://www.rockstargames.com/VI/pre-load-now">Rockstar</Ext>,{" "}
          <Ext href="https://www.theverge.com/games/1025271/gta-vi-storage-space-rockstar-games">The Verge</Ext>).
        </li>
        <li>
          Rockstar says the preload needs up to 212GB, depending on device. Sony tells PS5 players to clear at least 212GB (
          <Ext href="https://www.playstation.com/en-us/games/grand-theft-auto-vi/">PlayStation Store</Ext>).
        </li>
      </Bullets>

      <H2>Setting, story and the map</H2>
      <Bullets>
        <li>The game is set in Vice City and the wider state of Leonida. Rockstar&rsquo;s site names the leads as Jason and Lucia.</li>
        <li>Take-Two describes the game as a single-player experience.</li>
        <li>
          Rockstar published a free printable Leonida map and cover poster on the GTA VI website on 3 November (
          <Ext href="https://www.usatoday.com/story/tech/gaming/2026/11/09/gta-6-preload-consoles-release-date-file-size/92640419007/">USA Today</Ext>
          ). Our own <Link href="/map" className={L}>community map</Link> covers{" "}
          <Link href="/map/vice-city" className={L}>Vice City</Link>, <Link href="/map/leonida-keys" className={L}>Leonida Keys</Link>,{" "}
          <Link href="/map/grassrivers" className={L}>Grassrivers</Link>, <Link href="/map/port-gellhorn" className={L}>Port Gellhorn</Link>,{" "}
          <Link href="/map/ambrosia" className={L}>Ambrosia</Link> and <Link href="/map/mount-kalaga" className={L}>Mount Kalaga</Link>.
        </li>
        <li>
          Content descriptors on Rockstar&rsquo;s site: blood and gore, intense violence, mature humor, nudity, strong language, strong sexual
          content, use of drugs and alcohol. The Xbox Store lists it as Mature 17+.
        </li>
      </Bullets>

      <H2>Official media</H2>
      <p>
        Rockstar&rsquo;s site lists four videos: Trailer 1 (4 Dec 2023), Trailer 2 (6 May 2025), An Extended Look (27 Aug 2026) and the Launch
        Trailer (15 Oct 2026). A Launch Gallery of new screenshots went up on 5 November. In the days before launch Rockstar also showed weather
        screenshots through The Weather Channel, with Rockstar&rsquo;s art team describing a more localised, persistent and dynamic weather system (
        <Ext href="https://www.gamespot.com/articles/gta-6-has-teamed-up-with-the-weather-channel-to-show-how-dynamic-leonida-can-be/">GameSpot, 17 Nov</Ext>).
      </p>

      <H2>Not confirmed</H2>
      <Bullets>
        <li>
          <Lead>PC:</Lead> nothing announced. Any date you see is speculation.
        </li>
        <li>
          <Lead>Review scores:</Lead> these are third-party. See the{" "}
          <Link href={newsPath("gta-6-reviews-metacritic-99")} className={L}>reviews round-up</Link> for what outlets reported and what we could not confirm.
        </li>
        <li>
          <Lead>Pre-launch patches:</Lead> reports say updates 01.002.000 (13 Nov) and 01.002.001 (16 Nov) went out without patch notes (
          <Ext href="https://www.vice.com/en/article/gta-6-second-day-one-patch-ps5-xbox/">VICE</Ext>). Rockstar has not detailed them.
        </li>
        <li><Lead>Further patches:</Lead> contents and size of any launch-day update are not stated.</li>
      </Bullets>
      <p>
        We label every fact on this site as Official, Showcase, In-game or Unverified. See <Link href="/sources" className={L}>how we label facts</Link>.
      </p>

      <Sources>
        <Source href="https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/rockstar-games-announces-pre-orders-grand-theft-auto-vi/" label="Take-Two press release, 24 Jun 2026" kind="Official" />
        <Source href="https://www.rockstargames.com/VI" label="Rockstar Games: Grand Theft Auto VI" kind="Official" />
        <Source href="https://www.rockstargames.com/VI/pre-load-now" label="Rockstar Games: Pre-Load Now, 10 Nov 2026" kind="Official" />
        <Source href="https://blog.playstation.com/2026/11/10/pre-load-grand-theft-auto-vi-on-ps5-starting-today/" label="PlayStation Blog, 10 Nov 2026" kind="Official, platform holder" />
        <Source href="https://www.playstation.com/en-us/games/grand-theft-auto-vi/" label="PlayStation Store: Grand Theft Auto VI" kind="Official, platform holder" />
        <Source href="https://www.playstation.com/en-us/support/games/gta-vi-support/" label="PlayStation Support: GTA VI" kind="Official, platform holder" />
        <Source href="https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/" label="Xbox Wire, 10 Nov 2026" kind="Official, platform holder" />
        <Source href="https://www.theverge.com/games/1025271/gta-vi-storage-space-rockstar-games" label="The Verge, 3 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.usatoday.com/story/tech/gaming/2026/11/09/gta-6-preload-consoles-release-date-file-size/92640419007/" label="USA Today, 9 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.gamespot.com/articles/gta-6-has-teamed-up-with-the-weather-channel-to-show-how-dynamic-leonida-can-be/" label="GameSpot, 17 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.vice.com/en/article/gta-6-second-day-one-patch-ps5-xbox/" label="VICE, 16 Nov 2026" kind="Reputable outlet" />
      </Sources>
    </NewsLayout>
  );
}
