import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CommunityMap } from "@/components/map/CommunityMap";
import { getLivePins } from "@/lib/map/service";

const REGIONS = [
  { slug: "vice-city", name: "Vice City" },
  { slug: "leonida-keys", name: "Leonida Keys" },
  { slug: "grassrivers", name: "Grassrivers" },
  { slug: "port-gellhorn", name: "Port Gellhorn" },
  { slug: "ambrosia", name: "Ambrosia" },
  { slug: "mount-kalaga", name: "Mount Kalaga" },
];

export const metadata = {
  title: "Map",
  description: "Community interactive map of Leonida: landmarks, secrets, collectibles and quests marked by players.",
};

export const dynamic = "force-dynamic";

export default async function MapIndex() {
  const { pins, online } = await getLivePins();
  return (
    <div>
      <PageHeader kicker="Community map" title="Leonida" source="Official names + community pins" />
      <p className="mb-6 max-w-2xl text-[#9a958c]">
        Pan, zoom and filter the map. Spotted something? Drop a pin and it goes live once it&apos;s checked. The base map is an
        illustration, so official landmarks marked “approx.” are best guesses until they&apos;re confirmed in game.
      </p>

      <CommunityMap initialPins={pins} online={online} />

      <div className="mt-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm uppercase tracking-widest text-[#ffd36b]">Regions</h2>
          <Link href="/map/leaderboard" className="text-sm text-[#9a958c] hover:text-[#ff2d7b]">
            Leaderboard →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {REGIONS.map((r) => (
            <Link key={r.slug} href={`/map/${r.slug}`} className="rounded-lg border border-[#2a2a2e] bg-[#161618] p-4 hover:border-[#ffd36b]">
              {r.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
