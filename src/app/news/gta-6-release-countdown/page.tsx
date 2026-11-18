import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-release-countdown";
export const metadata = metaFor(newsPath(SLUG));

const ROWS: string[][] = [
  ["New Zealand", "00:00 NZDT, 19 Nov", "11:00 UTC, 18 Nov", "21:00, Wed 18 Nov"],
  ["Australia (Sydney, Melbourne)", "00:00 AEDT, 19 Nov", "13:00 UTC, 18 Nov", "23:00, Wed 18 Nov"],
  ["Japan, South Korea", "00:00 JST/KST, 19 Nov", "15:00 UTC, 18 Nov", "01:00, Thu 19 Nov"],
  ["Indonesia (west), Thailand", "00:00 UTC+7, 19 Nov", "17:00 UTC, 18 Nov", "03:00, Thu 19 Nov"],
  ["India", "00:00 IST, 19 Nov", "18:30 UTC, 18 Nov", "04:30, Thu 19 Nov"],
  ["United Arab Emirates", "00:00 GST, 19 Nov", "20:00 UTC, 18 Nov", "06:00, Thu 19 Nov"],
  ["Saudi Arabia, Turkey", "00:00 UTC+3, 19 Nov", "21:00 UTC, 18 Nov", "07:00, Thu 19 Nov"],
  ["Central Europe", "00:00 CET, 19 Nov", "23:00 UTC, 18 Nov", "09:00, Thu 19 Nov"],
  ["UK, Ireland", "00:00 GMT, 19 Nov", "00:00 UTC, 19 Nov", "10:00, Thu 19 Nov"],
  ["Brazil", "00:00 UTC−3, 19 Nov", "03:00 UTC, 19 Nov", "13:00, Thu 19 Nov"],
  ["US, Canada (Eastern)", "00:00 EST, 19 Nov", "05:00 UTC, 19 Nov", "15:00, Thu 19 Nov"],
  ["Mexico", "00:00 CST, 19 Nov", "06:00 UTC, 19 Nov", "16:00, Thu 19 Nov"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Countdown" title="Release time by region" source="Official + reported">
      <Lede>
        GTA 6 releases on 19 November 2026 for PS5 and Xbox Series X|S, unlocking at midnight local time. New Zealand
        got it first, at 11:00 UTC on 18 November, and the Americas get it last, about 19 hours later.
      </Lede>

      <H2>What is confirmed</H2>
      <Bullets>
        <li>
          <Lead>Date and platforms.</Lead> 19 November 2026 on PlayStation 5 and Xbox Series X|S. Rockstar&rsquo;s{" "}
          <Ext href="https://www.rockstargames.com/VI">GTA VI site</Ext> lists those two and nothing else.
        </li>
        <li>
          <Lead>Rolling midnight launch.</Lead> Sony describes a &ldquo;rolling midnight launch by country&rdquo;, starting at 12:00 AM
          NZDT in New Zealand (<Ext href="https://blog.playstation.com/2026/11/10/pre-load-grand-theft-auto-vi-on-ps5-starting-today/">PlayStation Blog, 10 Nov</Ext>).
        </li>
        <li>
          <Lead>Preloading is not early access.</Lead> Preloading puts the files on your console but does not open the game early.
          You still wait for your own unlock time (<Ext href="https://www.vice.com/en/article/gta-6-midnight-release-times-file-size-preload/">VICE</Ext>).
        </li>
        <li>
          <Lead>Xbox Cloud Gaming.</Lead> Streaming on Xbox One and Series X|S starts at 1 AM ET on 19 November (06:00 UTC), with
          Xbox Series S graphics settings (<Ext href="https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/">Xbox Wire</Ext>).
        </li>
      </Bullets>

      <H2>Unlock times by region</H2>
      <p>
        Local midnight on 19 November, converted to UTC and to Brisbane time (AEST, UTC+10). Check the countdown on your own store
        page before you rely on any table, including this one.
      </p>
      <DataTable head={["Region", "Local midnight", "UTC", "Brisbane"]} rows={ROWS} minWidth="40rem" />
      <p className="text-xs text-muted">
        Schedule as reported by{" "}
        <Ext href="https://kotaku.com/gta-6-pre-load-times-install-size-and-global-release-times-confirmed-2000752787">Kotaku</Ext> on 3 November,
        from regional store listings. The Brisbane column is our own conversion.
      </p>

      <H2>Unconfirmed details</H2>
      <Bullets>
        <li>
          <Lead>Country or time zone?</Lead> Digital Foundry first read Rockstar&rsquo;s &ldquo;midnight local time&rdquo; wording as tied to
          time zones, which would put the US West Coast three hours after Eastern. Sony&rsquo;s &ldquo;by country&rdquo; wording reads differently,
          and on 18 November VICE reported that US digital stores unlock at midnight Eastern for the whole continental US, which is 9 PM
          Pacific on 18 November. We have not seen Rockstar spell it out, so trust the countdown on your own store page (
          <Ext href="https://www.digitalfoundry.net/news/2026/11/rockstar-officially-confirms-gta-6-regional-release-times-and-theyre-not-what-we-thought">Digital Foundry</Ext>,{" "}
          <Ext href="https://www.vice.com/en/article/gta-6-new-zealand-worldwide-release-times/">VICE</Ext>).
        </li>
        <li>
          <Lead>Queensland.</Lead> Brisbane does not use daylight saving. Store listings put Australia at 13:00 UTC (midnight AEDT in Sydney
          and Melbourne), which is 23:00 in Brisbane on 18 November. Strict local midnight in Brisbane would be 14:00 UTC (00:00 on 19
          November). We have not seen Rockstar settle which applies.
        </li>
      </Bullets>

      <H2>Spoiler watch</H2>
      <p>
        New Zealand unlocked while most of the world was still on 18 November, so spoilers can surface from 11:00 UTC onward. Mute keywords,
        hide Leonida tags and stay out of comment sections if you want your first hours in Vice City clean. This page has no story spoilers.
      </p>

      <H2>While you wait</H2>
      <p>
        Browse the <Link href="/map" className="text-pink underline underline-offset-2">Leonida map</Link>, read the{" "}
        <Link href={newsPath("gta-6-confirmed-so-far")} className="text-pink underline underline-offset-2">confirmed facts</Link>, check the{" "}
        <Link href={newsPath("gta-6-ps5-update-patches-servers")} className="text-pink underline underline-offset-2">PS5 update and patch checklist</Link>, or see
        the <Link href={newsPath("gta-6-reviews-metacritic-99")} className="text-pink underline underline-offset-2">review scores</Link>.
      </p>

      <Sources>
        <Source href="https://www.rockstargames.com/VI" label="Rockstar Games: Grand Theft Auto VI" kind="Official" />
        <Source href="https://blog.playstation.com/2026/11/10/pre-load-grand-theft-auto-vi-on-ps5-starting-today/" label="PlayStation Blog, 10 Nov 2026" kind="Official, platform holder" />
        <Source href="https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/" label="Xbox Wire, 10 Nov 2026" kind="Official, platform holder" />
        <Source href="https://kotaku.com/gta-6-pre-load-times-install-size-and-global-release-times-confirmed-2000752787" label="Kotaku, 3 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.digitalfoundry.net/news/2026/11/rockstar-officially-confirms-gta-6-regional-release-times-and-theyre-not-what-we-thought" label="Digital Foundry, 10 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.vice.com/en/article/gta-6-midnight-release-times-file-size-preload/" label="VICE, 3 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.vice.com/en/article/gta-6-new-zealand-worldwide-release-times/" label="VICE, 18 Nov 2026" kind="Reputable outlet" />
      </Sources>
    </NewsLayout>
  );
}
