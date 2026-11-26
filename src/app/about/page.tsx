import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
export const metadata = metaFor("/about");
export default function Page() {
  return (
    <div>
      <PageSchema path="/about" breadcrumbs={false} />
      <Breadcrumbs path="/about" />
      <PageHeader backdrop="beach" dim="heavy" kicker="About" title="Leonida Vice Guide" source="Editorial" verified="after launch" />
      <p className="max-w-xl text-ink-2">
        Independent fan utility for Grand Theft Auto VI. Map, guides, database, tools.
        Not affiliated with Rockstar Games or Take-Two Interactive.
      </p>
    </div>
  );
}
