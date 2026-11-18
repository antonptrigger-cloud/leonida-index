import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-festival-set-times-heat-night";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

// Miami times exactly as printed on Rockstar's poster (no zone printed; DICE lists the event at UTC-5).
// Brisbane column is our conversion: Miami (EST, UTC-5) + 15 hours.
const STAGE_ONE: React.ReactNode[][] = [
  ["Ca7riel & Paco Amoroso", "6:00-7:00pm Sat", "09:00-10:00 Sun"],
  ["Cardi B", "7:45-8:15pm Sat", "10:45-11:15 Sun"],
  ["Justice (DJ set)", "9:00-10:00pm Sat", "12:00-13:00 Sun"],
  ["Rauw & Friends: Tainy", "11:00pm-12:00am", "14:00-15:00 Sun"],
  ["Cactus Jack presents Travis Scott, Don Toliver, Kodak Black, Sofaygo", "12:40-2:00am Sun", "15:40-17:00 Sun"],
];

const STAGE_TWO: React.ReactNode[][] = [
  ["Suero (Jubilee B2B Berrakka B2B Jonny From Space)", "4:00-6:00pm Sat", "07:00-09:00 Sun"],
  ["Nick León B2B DJ Python", "7:00-7:45pm Sat", "10:00-10:45 Sun"],
  ["The Dare B2B Fcukers (DJ set)", "8:15-9:00pm Sat", "11:15-12:00 Sun"],
  ["Prospa B2B Skream", "10:00-11:00pm Sat", "13:00-14:00 Sun"],
  ["Metro Boomin", "12:00-12:40am Sun", "15:00-15:40 Sun"],
  ["DJ E Money (inside Mana)", "5:00-6:00pm Sat", "08:00-09:00 Sun"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Launch events" title="GTA 6 Festival set times and Heat night" source="Rockstar Games on X, festival pages, ESPN, NBA.com">
      <Lede>
        Rockstar has posted the set times for Grand Theft Auto VI: The Festival, its launch concert with PlayStation at Mana Wynwood in Miami on Saturday 21 November, with Travis Scott&rsquo;s Cactus Jack set closing the night.
        In Brisbane that is Sunday 22 November, from 07:00 to 17:00 AEST. Earlier, on Thursday 19 Nov Brisbane time, the Miami Heat turn a home game against the Bucks into &ldquo;A Night in Vice City&rdquo;.
      </Lede>

      <H2>The festival: key facts</H2>
      <Bullets>
        <li>
          <Lead>Official:</Lead> Rockstar posted the schedule on X at 15:01 UTC on 18 Nov (01:01 AEST, 19 Nov). Doors open at 4:00pm and, in Rockstar&rsquo;s words, &ldquo;all proceeds from ticket sales will go to local Miami charities&rdquo; (
          <Ext href="https://x.com/RockstarGames/status/2123068976045453338">@RockstarGames</Ext>). Complex reports the same (<Ext href="https://www.complex.com/music/a/tracewilliamcowen/gta-6-festival-set-times-charities">Complex</Ext>).
        </li>
        <li>
          <Lead>Charities:</Lead> a follow-up Rockstar post names The Miami Foundation, Miami Bethany Community Services, Hermanos de la Calle, Live Healthy Little Havana, Martin Luther King Economic Development Corporation, Coconut Grove Crisis Food Pantry and Dade County Association of Fire Fighters Charities, and the list appears to continue past what the post shows (
          <Ext href="https://x.com/RockstarGames/status/2123069155775541350">@RockstarGames</Ext>). Rockstar has not said how much will be raised.
        </li>
        <li>
          <Lead>Where:</Lead> Mana Wynwood, 318 NW 23rd St, Miami. Rockstar&rsquo;s festival page says all ticketholders enter on NW 5th Avenue, with drop-off points around the edge of the grounds and no re-entry (
          <Ext href="https://www.rockstargames.com/VI/gtavi-thefestival">Rockstar festival page</Ext>).
        </li>
        <li>
          <Lead>Tickets:</Lead> sold only on DICE to ticket-lottery winners, at US$72 on the listing. The lottery has closed and there is a waitlist. Tickets are capped at two per person and cannot be transferred, though you can relist them on DICE at the price you paid. The event is 17+ (
          <Ext href="https://gtavi-thefestival.miami">DICE event page</Ext>).
        </li>
        <li>
          <Lead>Livestream:</Lead> we found no livestream or broadcast announced in Rockstar&rsquo;s posts or on the festival and DICE pages, as of 08:13 AEST on 19 Nov.
        </li>
      </Bullets>

      <H2>Set times: Stage One</H2>
      <DataTable head={["Artist", "Miami (Sat 21 Nov)", "Brisbane (Sun 22 Nov)"]} rows={STAGE_ONE} minWidth="34rem" />

      <H2>Set times: Stage Two and inside Mana</H2>
      <DataTable head={["Artist", "Miami (Sat 21 Nov)", "Brisbane (Sun 22 Nov)"]} rows={STAGE_TWO} minWidth="34rem" />
      <p className="text-xs text-muted">
        Miami times are as printed on Rockstar&rsquo;s schedule, which gives no time zone. The DICE listing puts doors at 4:00pm UTC-5, so we treat every time as Miami local time (EST). Brisbane is UTC+10, 15 hours ahead.
        Sets after midnight in Miami fall on Sunday 22 Nov there. Complex reported the same schedule (<Ext href="https://www.complex.com/music/a/tracewilliamcowen/gta-6-festival-set-times-charities">Complex</Ext>). Set times can change on the night.
      </p>

      <H2>A Night in Vice City: Heat vs Bucks</H2>
      <Bullets>
        <li>
          <Lead>When:</Lead> The Heat&rsquo;s home game against the Milwaukee Bucks was scheduled for 7pm ET on Wednesday 18 Nov, on ESPN in the US, per the <Ext href="https://www.nba.com/heat/game/0022600260-bucks-vs-heat-miami-fl-11-18-2026">NBA.com game page</Ext> and ESPN. Rockstar&rsquo;s post that day said to tune in at 7PM ET (
          <Ext href="https://x.com/RockstarGames/status/2123098923434713278">@RockstarGames</Ext>). That is 10:00 AEST on Thursday 19 Nov, by our conversion. Rockstar links to the{" "}
          <Ext href="https://www.nba.com/schedule/heat">NBA&rsquo;s Heat schedule</Ext> for how to watch in your area.
        </li>
        <li>
          <Lead>What changes:</Lead> ESPN reports a pink, white and blue court with &ldquo;Vice City&rdquo; at centre court, &ldquo;I heart Vice City&rdquo; on a baseline and a &ldquo;VI&rdquo; logo near each dunker spot, plus &ldquo;Welcome to Vice City&rdquo; on the arena roof, GTA VI-inspired cars on the West Plaza and music from the game in the arena (
          <Ext href="https://www.espn.com/nba/story/_/id/50085674/miami-heat-night-vice-city-game">ESPN</Ext>).
        </li>
        <li>
          <Lead>The kit:</Lead> ESPN describes a black jersey with pink and white accents, &ldquo;Vice City&rdquo; across the chest, Travis Scott&rsquo;s flipped Nike Swoosh and a &ldquo;VI&rdquo; nod, made with Cactus Jack. ESPN says on-court and Swingman versions were to go on sale in limited quantities on game day.
        </li>
        <li>
          <Lead>Also:</Lead> NBA.com notes Heat center Bam Adebayo is the cover athlete for the NBA 2K27 Vice City Edition (<Ext href="https://www.nba.com/news/heat-unveil-vice-city-court">NBA.com</Ext>).
        </li>
      </Bullets>

      <Callout title="Unconfirmed" tone="unconfirmed">
        <p>
          Rockstar has not announced a festival livestream or replay. If one is announced, we will add it with times. Rockstar&rsquo;s charity post is cut off on X, so the list above may be incomplete.
        </p>
      </Callout>

      <p>
        Watching from home instead? See who is streaming GTA 6 in the <Link href={newsPath("gta-6-launch-streams-schedule")} className={L}>launch streams guide</Link>, check your unlock in the{" "}
        <Link href={newsPath("gta-6-release-countdown")} className={L}>release time by region</Link>, and read up on the city itself in our <Link href="/map/vice-city" className={L}>Vice City region guide</Link>.
      </p>

      <Sources>
        <Source href="https://x.com/RockstarGames/status/2123068976045453338" label="@RockstarGames on X: festival set times, 18 Nov 2026, 15:01 UTC" kind="Official, publisher" />
        <Source href="https://x.com/RockstarGames/status/2123069155775541350" label="@RockstarGames on X: festival charities, 18 Nov 2026" kind="Official, publisher" />
        <Source href="https://x.com/RockstarGames/status/2123098923434713278" label="@RockstarGames on X: A Night in Vice City, 18 Nov 2026, 17:00 UTC" kind="Official, publisher" />
        <Source href="https://www.rockstargames.com/VI/gtavi-thefestival" label="Rockstar Games: GTA VI The Festival" kind="Official, publisher" />
        <Source href="https://gtavi-thefestival.miami" label="DICE: Grand Theft Auto VI: The Festival (read 08:08 AEST, 19 Nov 2026)" kind="Official ticketing" />
        <Source href="https://www.complex.com/music/a/tracewilliamcowen/gta-6-festival-set-times-charities" label="Complex: festival set times, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.espn.com/nba/story/_/id/50085674/miami-heat-night-vice-city-game" label="ESPN: A Night in Vice City court and activities, 17 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.nba.com/heat/game/0022600260-bucks-vs-heat-miami-fl-11-18-2026" label="NBA.com: Bucks vs Heat game page, 18 Nov 2026, 7:00 PM EST" kind="Official, league" />
        <Source href="https://www.nba.com/news/heat-unveil-vice-city-court" label="NBA.com: Heat unveil Vice City court, 18 Nov 2026" kind="Official, league" />
      </Sources>
    </NewsLayout>
  );
}
