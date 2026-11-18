import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Related } from "@/components/Related";
export const metadata = metaFor("/news/release-date");
export default function Page() {
  return (
    <div>
      <PageSchema path="/news/release-date" breadcrumbs={false} />
      <Breadcrumbs path="/news/release-date" />
      <PageHeader backdrop="skyline" dim="strong" kicker="News" title="19 November 2026" source="Official" verified="18 Nov 2026" />
      <div className="max-w-xl space-y-3 text-ink-2">
        <p>PS5 and Xbox Series X|S. Preload opened 10 November 2026. Boxed copies (a download code in a box) reached retailers from 12 November.</p>
        <p>No day-one PC announcement. Standard about $80, Ultimate about $100.</p>
      </div>
      <Related path="/news/release-date" />
    </div>
  );
}
