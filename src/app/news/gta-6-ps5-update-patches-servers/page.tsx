import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Ext, H2, Lead, Lede, NewsLayout, Source, Sources, Steps } from "@/components/news/NewsBits";

const SLUG = "gta-6-ps5-update-patches-servers";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Checklist" title="Launch checklist" source="Official + reported">
      <Lede>
        Before your midnight: PS5 owners must install a new system software update or GTA 6 will not launch. Two small game patches have also gone out, with no patch
        notes. Here is what is official and what is not.
      </Lede>

      <H2>PS5: mandatory system update (official)</H2>
      <Bullets>
        <li>
          PlayStation Support US posted on X that Sony has issued a PS5 system software update that is &ldquo;required before playing Grand Theft Auto VI&rdquo;, to be installed
          before midnight on 19 November (<Ext href="https://x.com/PS_Support_US/status/2122863683881619685">@PS_Support_US</Ext>, 18 Nov, 01:25 UTC). @RockstarGames reposted it
          at 02:43 UTC.
        </li>
        <li>
          <Lead>Version and size (reported):</Lead> system software 26.07-14.23.00, about 1.27GB (
          <Ext href="https://www.polygon.com/gta-6-grand-theft-auto-playstation-mandatory-ps5-update/">Polygon</Ext>,{" "}
          <Ext href="https://www.theverge.com/games/1036395/if-you-want-to-play-gta-vi-on-ps5-tonight-download-yesterdays-firmware-update-first">The Verge</Ext>,{" "}
          <Ext href="https://www.pushsquare.com/news/2026/11/gta-6-requires-new-ps5-firmware-update-to-play">Push Square</Ext>). Sony&rsquo;s own post gives no version number.
        </li>
        <li>
          <Lead>Why (unverified):</Lead> the release note reads &ldquo;We&rsquo;ve made some security fixes to the system software&rdquo;. Polygon and Push Square link the update to
          PS5 piracy and jailbreaking. Sony has not said so in anything we read.
        </li>
        <li>
          <Lead>How:</Lead> Settings, System, System Software, System Software Update and Settings.
        </li>
      </Bullets>
      <p>We found no equivalent mandatory-update notice for Xbox Series X|S. That is an absence of reports, not a confirmation.</p>

      <H2>Game patches (reported, no notes)</H2>
      <Bullets>
        <li>
          <Lead>01.002.000</Lead>, from 13 November: about 1GB on PS5 (
          <Ext href="https://www.vice.com/en/article/gta-6-second-day-one-patch-ps5-xbox/">VICE</Ext>).
        </li>
        <li>
          <Lead>01.002.001</Lead>, from 16 November: 602.5MB on PS5, and about 1.6GB on Xbox according to dataminers. It rolled out to PS5 in three waves, 12 hours apart (
          <Ext href="https://www.vice.com/en/article/gta-6-second-day-one-patch-ps5-xbox/">VICE</Ext>).
        </li>
        <li>Rockstar has published no patch notes for either update and has not confirmed what changed.</li>
        <li>
          <Lead>Launch-day patch:</Lead> none announced. We cannot say whether one is coming.
        </li>
      </Bullets>
      <p>To check on PS5, highlight the game, press Options and choose Check for Update. Xbox owners need roughly 1.6GB free for the second patch.</p>

      <H2>Servers and status</H2>
      <Bullets>
        <li>
          <Lead>As of 22:35 AEST (about 12:35 UTC), 18 Nov:</Lead> the 
          <Ext href="https://status.playstation.com/">PlayStation service status page</Ext> read &ldquo;All services are up and running&rdquo;. GTATracker&rsquo;s read of
          Microsoft&rsquo;s Xbox status feed and of Rockstar&rsquo;s service status page (12:24 UTC) also showed everything up, with no GTA VI entry on Rockstar&rsquo;s list yet (
          <Ext href="https://gtatracker.gg/online/server-status">GTATracker</Ext>).
        </li>
        <li>
          Insider Gaming likewise reported no performance or networking issues at the time of writing (
          <Ext href="https://insider-gaming.com/is-grand-theft-auto-6-down-gta-6-issues-explained/">Insider Gaming</Ext>). We found no outage reports, but that only covers the first
          unlocks. Status pages lag, so check them again at your own midnight.
        </li>
        <li>
          We could not load Rockstar&rsquo;s own service status page ourselves (HTTP 500), so the Rockstar reading above is second-hand.
        </li>
        <li>
          Take-Two describes GTA VI as a single-player experience, so we expect day-one strain to land mostly on store and download systems. That is our expectation, not a
          reported fact.
        </li>
        <li>
          Chorus in New Zealand predicted a record download event but said it expected no issues (
          <Ext href="https://www.1news.co.nz/2026/11/18/gta-6-how-to-beat-the-download-rush-and-why-gamers-abroad-envy-kiwis/">1News</Ext>).
        </li>
      </Bullets>

      <H2>Checklist</H2>
      <Steps>
        <li>Install the PS5 system update, then restart.</li>
        <li>Check for game updates and let both patches finish.</li>
        <li>Keep 212GB installed and a few extra GB free for patches.</li>
        <li>Plug in a cable if you can, and pause other downloads.</li>
        <li>
          Check your own store countdown. See the <Link href={newsPath("gta-6-release-countdown")} className={L}>release time by region</Link>.
        </li>
      </Steps>
      <p>
        More on preload in the <Link href={newsPath("gta-6-preload-editions-pricing")} className={L}>preload guide</Link>.
      </p>

      <Sources>
        <Source href="https://x.com/PS_Support_US/status/2122863683881619685" label="PlayStation Support US on X, 18 Nov 2026" kind="Official, platform holder" />
        <Source href="https://www.polygon.com/gta-6-grand-theft-auto-playstation-mandatory-ps5-update/" label="Polygon, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.theverge.com/games/1036395/if-you-want-to-play-gta-vi-on-ps5-tonight-download-yesterdays-firmware-update-first" label="The Verge, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.pushsquare.com/news/2026/11/gta-6-requires-new-ps5-firmware-update-to-play" label="Push Square, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.vice.com/en/article/gta-6-second-day-one-patch-ps5-xbox/" label="VICE: second pre-launch patch, 16 Nov 2026" kind="Reputable outlet" />
        <Source href="https://insider-gaming.com/is-grand-theft-auto-6-down-gta-6-issues-explained/" label="Insider Gaming: Is GTA 6 down?, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://status.playstation.com/" label="PlayStation Service Status (read 18 Nov 2026)" kind="Official, platform holder" />
        <Source href="https://gtatracker.gg/online/server-status" label="GTATracker: Rockstar, PSN and Xbox status feeds (12:24 UTC, 18 Nov)" kind="Third-party monitor" />
        <Source href="https://www.1news.co.nz/2026/11/18/gta-6-how-to-beat-the-download-rush-and-why-gamers-abroad-envy-kiwis/" label="1News NZ, 18 Nov 2026" kind="Reputable outlet" />
      </Sources>
    </NewsLayout>
  );
}
