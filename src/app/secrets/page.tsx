import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
export const metadata = metaFor("/secrets");
export default function Page() {
  return (
    <div>
      <PageSchema path="/secrets" breadcrumbs={false} />
      <Breadcrumbs path="/secrets" />
      <PageHeader backdrop="pier" dim="light" kicker="Secrets" title="Easter eggs" source="Unverified" />
      <p className="text-muted">Shell. Submit finds after launch. Nothing invented here.</p>
    </div>
  );
}
