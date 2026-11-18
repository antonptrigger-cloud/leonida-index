import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
export const metadata = metaFor("/about");
export default function Page() {
  return (
    <div>
      <PageSchema path="/about" />
      <PageHeader kicker="About" title="Leonida Index" source="Editorial" />
      <p className="max-w-xl text-ink-2">
        Independent fan utility for Grand Theft Auto VI. Map, guides, database, tools.
        Not affiliated with Rockstar Games or Take-Two Interactive.
      </p>
    </div>
  );
}
