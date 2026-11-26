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
      <PageHeader kicker="Region" title="Leonida Keys" source="Official / Showcase" verified="22 Nov 2026" />
      <div className="flex max-w-xl flex-col gap-6 text-ink-2">
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-widest text-turq">What it is</h2>
          <p>Tropical archipelago. Dive bars like The Rusty Anchor, boats, underwater.</p>
        </section>
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-widest text-turq">Known landmarks</h2>
          <p className="text-muted">Add named places here as they are confirmed.</p>
        </section>
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-widest text-turq">On the map</h2>
          <p>
            <Link href="/map?region=leonida-keys" className="text-orange hover:text-pink">
              Open Leonida Keys on the interactive map <span aria-hidden>→</span>
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
