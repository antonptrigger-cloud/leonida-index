import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";

export const metadata = metaFor("/map/leonida-keys");

export default function Page() {
  return (
    <div>
      <PageSchema path="/map/leonida-keys" breadcrumbs={false} />
      <Breadcrumbs path="/map/leonida-keys" />
      <PageHeader kicker="Region" title="Leonida Keys" source="Official / Showcase" />
      <div className="flex max-w-xl flex-col gap-6 text-ink-2">
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-widest text-turq">What it is</h2>
          <p>Tropical archipelago. Dive bars like The Rusty Anchor, boats, underwater.</p>
        </section>
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-widest text-turq">Explore Leonida Keys</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li><Link href="/database/locations/key-lento" className="underline">Key Lento: where it is and what is nearby</Link></li>
            <li><Link href="/map" className="underline">Interactive map</Link>: search every named place and filter by region</li>
            <li><Link href="/database/locations" className="underline">GTA 6 locations</Link>: regions, counties and named places</li>
            <li><Link href="/guides/missions" className="underline">Mission walkthrough</Link>: every story mission in order</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
