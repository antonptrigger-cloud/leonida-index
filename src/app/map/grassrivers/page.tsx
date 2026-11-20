import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";

export const metadata = metaFor("/map/grassrivers");

export default function Page() {
  return (
    <div>
      <PageSchema path="/map/grassrivers" breadcrumbs={false} />
      <Breadcrumbs path="/map/grassrivers" />
      <PageHeader kicker="Region" title="Grassrivers" source="Official / Showcase" />
      <div className="flex max-w-xl flex-col gap-6 text-ink-2">
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-widest text-turq">What it is</h2>
          <p>Everglades stand-in. Swamps, mangroves, airboats, wildlife.</p>
        </section>
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-widest text-turq">Explore Grassrivers</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li><Link href="/map" className="underline">Interactive map</Link>: search every named place and filter by region</li>
            <li><Link href="/database/locations" className="underline">GTA 6 locations</Link>: regions, counties and named places</li>
            <li><Link href="/guides/missions" className="underline">Mission walkthrough</Link>: every story mission in order</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
