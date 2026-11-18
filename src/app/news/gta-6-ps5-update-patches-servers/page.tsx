import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, H3, Lead, Lede, NewsLayout, Source, Sources, Steps } from "@/components/news/NewsBits";

const SLUG = "gta-6-ps5-update-patches-servers";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

// Update this block each hourly run: reading time (AEST), source, result.
const STATUS: React.ReactNode[][] = [
  ["PlayStation Network", "All services up and running (account management, gaming and social, video, store, direct)", <Ext key="ps" href="https://status.playstation.com/">PlayStation Service Status</Ext>, "23:50 AEST"],
  ["PSN via GTATracker", "Up, all five listed services up", <Ext key="gtp" href="https://gtatracker.gg/online/server-status">GTATracker, relaying Sony&rsquo;s feed</Ext>, "13:45 UTC (23:45 AEST)"],
  ["Xbox network", "Up. Account, safety, store, social and sharing services all up", <Ext key="gtx" href="https://gtatracker.gg/online/server-status">GTATracker, relaying Microsoft&rsquo;s feed</Ext>, "13:45 UTC (23:45 AEST)"],
  ["Rockstar service status", "GTA Online, Red Dead Online, Online Services and Cfx up. No GTA VI entry listed", <Ext key="gt2" href="https://gtatracker.gg/online/server-status">GTATracker, reading Rockstar&rsquo;s page</Ext>, "13:43 UTC (23:43 AEST)"],
  ["User reports (New Zealand)", "No current problems", <Ext key="dd" href="https://downdetector.co.nz/status/gta-vi/">Downdetector NZ</Ext>, "23:50 AEST"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Live tracker" title="GTA 6 Server Status & Known Issues" source="Official status pages + reported">
      <Lede>
        Last checked 23:50 AEST on 18 Nov: we found no confirmed GTA 6 outage, though news.com.au reports some PlayStation players in Australia hit login, download and purchase problems before the unlock.
        PS5 owners still need a mandatory system update, and two pre-launch patches are out. This page is updated through launch week.
      </Lede>

      <H2>Live status</H2>
      <DataTable head={["Service", "Reading", "Source", "When"]} rows={STATUS} minWidth="40rem" />
      <Bullets>
        <li>
          Insider Gaming likewise reported no performance or networking issues at the time of writing (<Ext href="https://insider-gaming.com/is-grand-theft-auto-6-down-gta-6-issues-explained/">Insider Gaming</Ext>).
        </li>
        <li>
          We could not load Rockstar&rsquo;s own service status page ourselves (it returned an error), so the Rockstar reading above is second-hand. GTA 6 is unlocking region by region, so the real test of store and network load comes when Europe and the Americas unlock.
        </li>
        <li>
          <Lead>Where the unlock has reached:</Lead> Rockstar releases at midnight local time, rolling by region. By our conversion from store listings, New Zealand unlocked at 21:00 AEST (11:00 UTC), and Australian stores list 23:00 AEST (13:00 UTC), including for Brisbane.
          Japan follows at 01:00 AEST on 19 Nov and central Europe from about 09:00 AEST, then the UK and the Americas. See the <Link href={newsPath("gta-6-release-countdown")} className={L}>release time by region</Link> for the caveats.
        </li>
        <li>
          Take-Two describes GTA VI as a single-player title, so we expect day-one strain to land mostly on store and download systems. That is our expectation, not a reported fact.
        </li>
        <li>
          Chorus in New Zealand predicted a record download event but said it expected no issues (<Ext href="https://www.1news.co.nz/2026/11/18/gta-6-how-to-beat-the-download-rush-and-why-gamers-abroad-envy-kiwis/">1News</Ext>).
        </li>
      </Bullets>

      <H2>Known issues</H2>
      <Bullets>
        <li>
          <Lead>Reported (limited):</Lead> some physical code-in-box copies arrived without a usable code. Polygon reports a grey strip that could not be scratched off, on both PlayStation and Xbox editions, with retailer responses varying. It says the problem does not appear to be widespread (<Ext href="https://www.polygon.com/gta-6-grand-theft-auto-no-code-physical-edition/">Polygon, 14 Nov</Ext>).
          PlayStation&rsquo;s guidance is that if a code is missing or unreadable, contact the retailer (<Ext href="https://www.playstation.com/en-us/support/games/gta-vi-support/">PlayStation Support</Ext>).
        </li>
        <li>
          <Lead>Reported (pre-unlock):</Lead> news.com.au says several PlayStation players in Australia reported login, download and purchasing problems in the hours before the unlock (<Ext href="https://www.news.com.au/technology/gaming/gta-6-release-australia-launch-times-download-size-and-why-its-a-bad-time-to-be-a-boss/news-story/eeb2f0ed1d624c365f65e50b92c974cf">news.com.au, 18 Nov</Ext>).
          It does not name a cause, and PlayStation&rsquo;s status page showed no incident when we checked.
        </li>
        <li>
          <Lead>Reported (fixed before launch, per Digital Foundry):</Lead> animation update-rate unsteadiness seen in pre-release footage and early Xbox Series testing seems to have been fixed by pre-launch patches (<Ext href="https://www.digitalfoundry.net/features/gta-6-ps5-vs-ps5-pro-xbox-series-x-and-series-s-which-console-plays-best">Digital Foundry, 18 Nov</Ext>).
        </li>
        <li>
          <Lead>Reported (Rockstar, via Digital Foundry and Wccftech):</Lead> Rockstar says it recently identified an issue that made the vignette effect look stronger than intended in some circumstances. Wccftech quotes Rockstar&rsquo;s art team saying it was also fixed (<Ext href="https://wccftech.com/grand-theft-auto-vi-amd-fsr-4-xbox-series-s-ray-tracing/">Wccftech</Ext>). We have not seen a patch note for it.
        </li>
        <li>
          <Lead>Performance dips:</Lead> Digital Foundry measured frame-rate drops into the mid-20s on PS5 and Xbox Series X and lower on Series S in heavy scenes. These are performance behaviour, not outages. See the <Link href={newsPath("gta-6-performance-ps5-pro-xbox")} className={L}>performance guide</Link>.
        </li>
        <li>
          <Lead>Other gameplay bugs:</Lead> we have not found a confirmed list of in-game bugs or a Rockstar known-issues post. Rockstar&rsquo;s support page was not loadable for us. We will list issues here only once a named outlet or Rockstar reports them.
        </li>
      </Bullets>

      <H3>Who to contact</H3>
      <p>
        PlayStation&rsquo;s support page says Rockstar Support handles gameplay issues, patches and bugs, and PlayStation Support handles account, launch, download, code, installation, refund and suspension issues.
      </p>

      <H2>PS5: mandatory system update (official)</H2>
      <Bullets>
        <li>
          PlayStation Support US posted on X that Sony has issued a PS5 system software update that is &ldquo;required before playing Grand Theft Auto VI&rdquo;, to be installed
          before midnight on 19 November (<Ext href="https://x.com/PS_Support_US/status/2122863683881619685">@PS_Support_US</Ext>, 18 Nov, 01:25 UTC).
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
          <Lead>01.002.000</Lead>, from 13 November: about 1GB (
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

      <H2>Checklist</H2>
      <Steps>
        <li>Install the PS5 system update, then restart.</li>
        <li>Check for game updates and let both patches finish.</li>
        <li>
          Keep 212GB free on PS5 (about 225GB on Xbox) plus a few extra GB for patches (<Link href={newsPath("gta-6-file-size-time-to-beat")} className={L}>file size</Link>).
        </li>
        <li>Plug in a cable if you can, and pause other downloads.</li>
        <li>
          Check your own store countdown. See the <Link href={newsPath("gta-6-release-countdown")} className={L}>release time by region</Link>.
        </li>
      </Steps>
      <p>
        More on preload in the <Link href={newsPath("gta-6-preload-editions-pricing")} className={L}>preload guide</Link>, and settings tips in the <Link href="/guides/beginner" className={L}>beginner guide</Link>.
      </p>

      <Callout title="How this tracker works">
        <p>
          Each reading above shows its source and time. Status pages lag behind real problems, so a green page is not proof that everything is fine. If you see a problem, check the platform status first, then the support routes above.
        </p>
      </Callout>

      <Sources>
        <Source href="https://status.playstation.com/"  label="PlayStation Service Status (read 23:50 AEST, 18 Nov 2026)" kind="Official, platform holder" />
        <Source href="https://gtatracker.gg/online/server-status"  label="GTATracker: Rockstar, PSN and Xbox status feeds (13:43-13:45 UTC, 18 Nov)" kind="Third-party monitor" />
        <Source href="https://downdetector.co.nz/status/gta-vi/"  label="Downdetector NZ: GTA VI (read 23:50 AEST)" kind="User-report aggregator" />
        <Source href="https://www.playstation.com/en-us/support/games/gta-vi-support/" label="PlayStation Support: Grand Theft Auto VI" kind="Official, platform holder" />
        <Source href="https://www.polygon.com/gta-6-grand-theft-auto-no-code-physical-edition/" label="Polygon: physical code issues, 14 Nov 2026" kind="Reputable outlet" />
        <Source href="https://x.com/PS_Support_US/status/2122863683881619685" label="PlayStation Support US on X, 18 Nov 2026" kind="Official, platform holder" />
        <Source href="https://www.polygon.com/gta-6-grand-theft-auto-playstation-mandatory-ps5-update/" label="Polygon, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.theverge.com/games/1036395/if-you-want-to-play-gta-vi-on-ps5-tonight-download-yesterdays-firmware-update-first" label="The Verge, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.pushsquare.com/news/2026/11/gta-6-requires-new-ps5-firmware-update-to-play" label="Push Square, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.vice.com/en/article/gta-6-second-day-one-patch-ps5-xbox/" label="VICE: second pre-launch patch, 16 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.digitalfoundry.net/features/gta-6-ps5-vs-ps5-pro-xbox-series-x-and-series-s-which-console-plays-best" label="Digital Foundry: GTA 6 on PS5, PS5 Pro, Xbox Series X and Series S, 18 Nov 2026" kind="Technical analysis" />
        <Source href="https://insider-gaming.com/is-grand-theft-auto-6-down-gta-6-issues-explained/" label="Insider Gaming: Is GTA 6 down?, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.news.com.au/technology/gaming/gta-6-release-australia-launch-times-download-size-and-why-its-a-bad-time-to-be-a-boss/news-story/eeb2f0ed1d624c365f65e50b92c974cf" label="news.com.au: GTA 6 release in Australia, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.1news.co.nz/2026/11/18/gta-6-how-to-beat-the-download-rush-and-why-gamers-abroad-envy-kiwis/" label="1News NZ, 18 Nov 2026" kind="Reputable outlet" />
      </Sources>
    </NewsLayout>
  );
}
