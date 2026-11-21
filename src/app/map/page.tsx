import Link from "next/link";
import { CommunityMap } from "@/components/map/CommunityMap";
import { PIN_TYPES } from "@/lib/map/config";
import { parseFilters } from "@/lib/map/filters";
import { getLivePins } from "@/lib/map/service";
import { PageSchema } from "@/lib/seo/jsonld";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ROUTES, metaFor } from "@/lib/seo/site";

export const metadata = metaFor("/map");

export const dynamic = "force-dynamic";

const REGION_LINKS = [
  ["/map/vice-city", "Vice City"],
  ["/map/leonida-keys", "Leonida Keys"],
  ["/map/grassrivers", "Grassrivers"],
  ["/map/port-gellhorn", "Port Gellhorn"],
  ["/map/ambrosia", "Ambrosia"],
  ["/map/mount-kalaga", "Mount Kalaga"],
] as const;

export default async function MapIndex({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [{ pins, online }, sp] = await Promise.all([getLivePins(), searchParams]);
  // /map?q=… (WebSite SearchAction) plus shareable filters: types, official, region, spoilers, pin, place.
  const filters = parseFilters(sp);
  // Spoiler-safe: the crawlable list only names non-spoiler, approved pins (getLivePins never returns pending ones).
  const listed = pins.filter((p) => !p.spoiler);
  return (
    <>
      <PageSchema path="/map" breadcrumbs={false} />
      {/*
        Server-rendered summary of the map for search engines and screen readers. The interactive
        map covers the viewport, so this is visually hidden but present in the HTML.
      */}
      <section className="sr-only" aria-labelledby="map-title">
        <h1 id="map-title">GTA 6 Interactive Map of Leonida and Vice City</h1>
        <p>{ROUTES["/map"].description}</p>
        <p>
          Pins marked approximate are best guesses until confirmed in game. Community submissions are reviewed by moderators
          before they appear, and each approved pin credits the player who marked it first.
        </p>
        <h2>Regions of Leonida</h2>
        <ul>
          {REGION_LINKS.map(([href, name]) => (
            <li key={href}>
              <Link href={href}>{name} map</Link>
            </li>
          ))}
        </ul>
        <h2>Locations on the map ({listed.length})</h2>
        <ul>
          {listed.map((p) => (
            <li key={p.id}>
              {p.name} ({PIN_TYPES[p.type].label}
              {p.region && p.type !== "region" ? `, ${p.region}` : ""}){p.approximate ? ", approximate" : ""}:{" "}
              {p.description}
            </li>
          ))}
        </ul>
        <p>
          <Link href="/map/leaderboard">Map leaderboard</Link> · <Link href="/guides">GTA 6 guides</Link> ·{" "}
          <Link href="/secrets">GTA 6 secrets</Link>
        </p>
      </section>
      <CommunityMap
        initialPins={pins}
        online={online}
        initialFilters={filters}
        breadcrumb={<Breadcrumbs path="/map" className="text-[11px] leading-none text-muted" />}
      />
    </>
  );
}
