import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, H3, Lead, Lede, NewsLayout, Source, Sources, Steps } from "@/components/news/NewsBits";

const SLUG = "gta-6-ps5-update-patches-servers";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

// Update this block each hourly run: reading time (AEST), source, result.
const STATUS: React.ReactNode[][] = [
  ["PlayStation Network", "No active issues listed for the US, Canada, Mexico, Brazil, the UK, Ireland, France, Germany, Italy, Spain, Australia or New Zealand", <Ext key="ps" href="https://status.playstation.com/">PlayStation Service Status</Ext>, "14:03 AEST, 19 Nov"],
  ["PSN via GTATracker", "Up, all five listed services up", <Ext key="gtp" href="https://gtatracker.gg/online/server-status">GTATracker, relaying Sony&rsquo;s feed</Ext>, "03:55 UTC, 19 Nov (13:55 AEST)"],
  ["Xbox network", "Up. Account, safety, store, social and sharing services all up", <Ext key="gtx" href="https://gtatracker.gg/online/server-status">GTATracker, relaying Microsoft&rsquo;s feed</Ext>, "03:55 UTC, 19 Nov (13:55 AEST)"],
  ["Rockstar service status", "GTA Online, Red Dead Online, Online Services and Cfx up. No GTA VI entry listed", <Ext key="gt2" href="https://gtatracker.gg/online/server-status">GTATracker, reading Rockstar&rsquo;s page</Ext>, "03:54 UTC, 19 Nov (13:54 AEST)"],
  ["User reports: GTA VI (UK)", "\u201cPossible problems\u201d, unchanged since 11:04. Top category 68% (69% at 13:00; category name not shown to us). Read four hours after the UK unlock at 10:00 AEST. Not a confirmed outage", <Ext key="ddu" href="https://downdetector.co.uk/status/gta-vi/">Downdetector UK</Ext>, "14:04 AEST, 19 Nov"],
  ["User reports: GTA VI (Germany)", "\u201cPossible problems\u201d again (also at 11:04 and 12:00; no current problems at 13:00). Top category 46% (category name not shown to us). Not a confirmed outage", <Ext key="dde" href="https://allestoerungen.de/stoerung/gta-vi/">Allestörungen (Downdetector DE)</Ext>, "14:04 AEST, 19 Nov"],
  ["User reports: GTA VI (Australia)", "No current problems (was \u201cpossible problems\u201d at 12:00). Most reported: game launch (64%), then server connection", <Ext key="dda" href="https://downdetector.com.au/status/gta-vi/">Downdetector AU</Ext>, "14:04 AEST, 19 Nov"],
  ["User reports: PSN (Australia)", "\u201cPossible problems\u201d. Server connection 35% (37% at 13:00), then login and game launch. Not a confirmed outage", <Ext key="ddp" href="https://downdetector.com.au/status/playstation-network/">Downdetector AU</Ext>, "14:04 AEST, 19 Nov"],
  ["User reports: GTA VI (New Zealand)", "No current problems", <Ext key="dd" href="https://downdetector.co.nz/status/gta-vi/">Downdetector NZ</Ext>, "14:04 AEST, 19 Nov"],
  ["User reports: GTA VI (US)", "No current problems. Baseline an hour before the US East Coast unlock at 15:00 AEST", <Ext key="ddus" href="https://downdetector.com/status/gta-vi/">Downdetector US</Ext>, "14:04 AEST, 19 Nov"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Live tracker" title="GTA 6 Server Status & Known Issues" source="Official status pages + reported">
      <Lede>
        Latest readings as read by our team at 13:54-14:04 AEST on 19 Nov, four hours after the UK unlock and an hour before the US East Coast unlocks: PlayStation&rsquo;s status feed lists no active issues for the US, Canada, Mexico, Brazil, the UK, Ireland, France, Germany, Italy, Spain, Australia or New Zealand, and Xbox and Rockstar&rsquo;s status feeds (read second-hand via GTATracker) show up too.
        Downdetector user reports for GTA VI show &ldquo;possible problems&rdquo; in the UK and, again, Germany (Germany had dropped to no current problems at 13:00). Australia, New Zealand and the US show no current problems. Those are user reports, not confirmed outages. At a London gaming bar the BBC reported that some players got on straight away while others were waiting to connect, and 3DJuegos reported a fresh rise in PSN reports in Spain at the midnight unlock.
        PlayStation Network had a disruption on 18 Nov (US time) that Sony&rsquo;s status page acknowledged and later cleared. PS5 owners still need a mandatory system update. This page is updated through launch week.
      </Lede>

      <H2>Live status</H2>
      <DataTable head={["Service", "Reading", "Source", "When"]} rows={STATUS} minWidth="40rem" />
      <Bullets>
        <li>
          Before the PSN disruption, Insider Gaming reported no performance or networking issues at the time of writing (<Ext href="https://insider-gaming.com/is-grand-theft-auto-6-down-gta-6-issues-explained/">Insider Gaming</Ext>).
        </li>
        <li>
          We could not load Rockstar&rsquo;s own service status page ourselves (it returned an error), so the Rockstar reading above is second-hand. The PlayStation row is read from Sony&rsquo;s own status feed. GTA 6 is unlocking region by region, so the biggest remaining test of store and network load comes when the Americas unlock.
        </li>
        <li>
          <Lead>Where the unlock has reached:</Lead> Rockstar releases at midnight local time, rolling by region. By our conversion from store listings, New Zealand unlocked at 21:00 AEST (11:00 UTC) on 18 Nov, and Australian stores list 23:00 AEST (13:00 UTC), including for Brisbane. By 10:00 AEST on 19 Nov it was also live in Japan and the rest of Asia, India, the Gulf, central Europe, and the UK and Ireland.
          The US East Coast follows at 15:00 AEST. See the <Link href={newsPath("gta-6-release-countdown")} className={L}>release time by region</Link> for the caveats.
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
          <Lead>PlayStation Network disruption, 18 Nov (official, since cleared):</Lead> on Wednesday (US time), Sony&rsquo;s status page flagged a problem with gaming and social services: &ldquo;You might have difficulty launching games, apps or network features. We&rsquo;re working to resolve the issue as soon as possible&rdquo; (
          <Ext href="https://www.axios.com/2026/11/18/gta-6-playstation-psn-servers">Axios</Ext>, <Ext href="https://www.theguardian.com/games/2026/nov/18/playstation-down-grand-theft-auto-vi-game-release">The Guardian</Ext>).
          Axios says the page showed all issues resolved by 2:30pm ET (05:30 AEST, 19 Nov). Android Authority&rsquo;s 3:05pm ET update (06:05 AEST) also says the status site showed all services operational, while Downdetector reports were still climbing (
          <Ext href="https://www.androidauthority.com/playstation-outage-nov-2026-3736853/">Android Authority</Ext>). The two outlets differ on the clear time, so treat both as approximate.
        </li>
        <li>
          <Lead>What players reported:</Lead> failed sign-ins, server connection errors and stalled downloads. The Guardian says some consoles passed the internet connection test but failed the &ldquo;Sign in to online services&rdquo; check, and cites 1,228 Downdetector reports by Wednesday afternoon US time.
          Polygon lists messages such as &ldquo;Sony services are busy&rdquo; and error codes WS-116449-5, CE-34861-2 and WS-37505-0 (<Ext href="https://www.polygon.com/gta-6-is-psn-down-detector-account-services-busy-server-connection-error/">Polygon, 4:03pm ET</Ext>).
          GamesRadar+, writing earlier in the day, said the PlayStation status page was still green and the problems might be isolated or minor. Its UK-based staff had trouble redeeming codes and upgrading a GTA 6 edition, and some players said downloads went through after repeated attempts (<Ext href="https://www.gamesradar.com/games/grand-theft-auto/ps5-users-report-playstation-network-errors-as-gta-6-fever-hits-with-some-struggling-to-redeem-codes/">GamesRadar+</Ext>).
        </li>
        <li>
          <Lead>Cause: not confirmed.</Lead> Sony has not given one in anything we read, and Axios says PlayStation did not immediately respond to a request for comment. The Guardian notes the timing raised questions about a link to the new PS5 system update, but says no official cause has been established. Axios reports Xbox players had no network issues on Wednesday.
          Downdetector counts are user reports, not confirmed outages.
        </li>
        <li>
          <Lead>Reported (limited):</Lead> some physical code-in-box copies arrived without a usable code. Polygon reports a grey strip that could not be scratched off, on both PlayStation and Xbox editions, with retailer responses varying. It says the problem does not appear to be widespread (<Ext href="https://www.polygon.com/gta-6-grand-theft-auto-no-code-physical-edition/">Polygon, 14 Nov</Ext>).
          PlayStation&rsquo;s guidance is that if a code is missing or unreadable, contact the retailer (<Ext href="https://www.playstation.com/en-us/support/games/gta-vi-support/">PlayStation Support</Ext>).
        </li>
        <li>
          <Lead>Reported (UK unlock, limited):</Lead> in its live coverage, the BBC reported from the XP Tavern gaming bar in London at 00:07 GMT (10:07 AEST): &ldquo;Some were able to get on straight away. Others are waiting impatiently to connect&rdquo; (
          <Ext href="https://www.bbc.com/news/live/c60rkg21dl22t">BBC live page</Ext>). It does not say what was holding players up or how widespread it was, and PlayStation&rsquo;s status feed listed no UK issue when we read it at 11:03 AEST.
        </li>
        <li>
          <Lead>Reported (UK, after the unlock):</Lead> The Standard, carrying PA&rsquo;s report, says the PSN issues from Wednesday &ldquo;appeared to be cleared up by midnight&rdquo;, with PlayStation declaring all of its services &ldquo;up and running&rdquo; in the hours after the game went live (
          <Ext href="https://www.standard.co.uk/news/tech/travis-scott-sony-miami-currys-grand-theft-auto-b1305482.html">The Standard</Ext>).
        </li>
        <li>
          <Lead>Reported (Spain, limited):</Lead> 3DJuegos says Downdetector showed a new rise in PlayStation Network reports in Spain from midnight, as GTA 6 unlocked there, after which the number of reports fell noticeably. It says Sony&rsquo;s status page showed all services operational and that GTA 6 is not confirmed as the cause (
          <Ext href="https://www.3djuegos.com/ps4/noticias/playstation-network-psn-se-ha-caido-espana-para-algunos-jugadores-estreno-gta-6-ha-saturado-servidores-ps5-momentos">3DJuegos, in Spanish</Ext>). PlayStation&rsquo;s feed listed no issue for Spain when we read it at 12:00 AEST.
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
        <Source href="https://www.standard.co.uk/news/tech/travis-scott-sony-miami-currys-grand-theft-auto-b1305482.html" label="The Standard (PA): GTA VI goes live in the UK, 19 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.3djuegos.com/ps4/noticias/playstation-network-psn-se-ha-caido-espana-para-algunos-jugadores-estreno-gta-6-ha-saturado-servidores-ps5-momentos" label="3DJuegos: PSN problems in Spain at launch, 19 Nov 2026 (in Spanish)" kind="Reputable outlet" />
        <Source href="https://www.bbc.com/news/live/c60rkg21dl22t" label="BBC live coverage: UK release, 19 Nov 2026 (00:07 GMT entry, read 11:07 AEST)" kind="Reputable outlet" />
        <Source href="https://status.playstation.com/"  label="PlayStation Service Status (read 14:03 AEST, 19 Nov 2026)" kind="Official, platform holder" />
        <Source href="https://gtatracker.gg/online/server-status"  label="GTATracker: Rockstar, PSN and Xbox status feeds (03:54-03:55 UTC, 19 Nov)" kind="Third-party monitor" />
        <Source href="https://downdetector.co.nz/status/gta-vi/"  label="Downdetector NZ: GTA VI (read 14:04 AEST, 19 Nov)" kind="User-report aggregator" />
        <Source href="https://downdetector.com.au/status/gta-vi/" label="Downdetector AU: GTA VI (read 14:04 AEST, 19 Nov)" kind="User-report aggregator" />
        <Source href="https://downdetector.com.au/status/playstation-network/" label="Downdetector AU: PlayStation Network (read 14:04 AEST, 19 Nov)" kind="User-report aggregator" />
        <Source href="https://downdetector.co.uk/status/gta-vi/" label="Downdetector UK: GTA VI (read 14:04 AEST, 19 Nov)" kind="User-report aggregator" />
        <Source href="https://downdetector.com/status/gta-vi/" label="Downdetector US: GTA VI (read 14:04 AEST, 19 Nov)" kind="User-report aggregator" />
        <Source href="https://allestoerungen.de/stoerung/gta-vi/" label="Allestörungen (Downdetector DE): GTA VI (read 14:04 AEST, 19 Nov)" kind="User-report aggregator" />
        <Source href="https://www.axios.com/2026/11/18/gta-6-playstation-psn-servers" label="Axios: PlayStation outage before GTA VI launch, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.theguardian.com/games/2026/nov/18/playstation-down-grand-theft-auto-vi-game-release" label="The Guardian: PlayStation network problems, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.androidauthority.com/playstation-outage-nov-2026-3736853/" label="Android Authority: PlayStation outage, 18 Nov 2026 (updated 3:05pm ET)" kind="Reputable outlet" />
        <Source href="https://www.polygon.com/gta-6-is-psn-down-detector-account-services-busy-server-connection-error/" label="Polygon: PSN outage on release eve, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.gamesradar.com/games/grand-theft-auto/ps5-users-report-playstation-network-errors-as-gta-6-fever-hits-with-some-struggling-to-redeem-codes/" label="GamesRadar+: PSN errors and code redemption, 18 Nov 2026" kind="Reputable outlet" />
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
