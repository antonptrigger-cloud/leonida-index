import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

const REGIONS = [
  { slug: "vice-city", name: "Vice City" },
  { slug: "leonida-keys", name: "Leonida Keys" },
  { slug: "grassrivers", name: "Grassrivers" },
  { slug: "port-gellhorn", name: "Port Gellhorn" },
  { slug: "ambrosia", name: "Ambrosia" },
  { slug: "mount-kalaga", name: "Mount Kalaga" },
];

export const metadata = { title: "Map" };

export default function MapIndex() {
  return (
    <div>
      <PageHeader kicker="Map" title="Leonida" source="Official / Showcase" />
      <p className="mb-6 max-w-xl text-[#9a958c]">
        Interactive pins come after launch. These region pages are the map for now.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {REGIONS.map((r) => (
          <Link key={r.slug} href={`/map/${r.slug}`} className="rounded-lg border border-[#2a2a2e] bg-[#161618] p-4 hover:border-[#ffd36b]">
            {r.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
