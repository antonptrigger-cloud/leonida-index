import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Related } from "@/components/Related";
export const metadata = metaFor("/guides/stealing-cars");
export default function Page() {
  return (
    <div>
      <PageSchema path="/guides/stealing-cars" breadcrumbs={false} />
      <Breadcrumbs path="/guides/stealing-cars" />
      <PageHeader backdrop="boat" kicker="Guide" title="Stealing cars" source="Showcase" />
      <div className="max-w-xl space-y-4 text-ink-2">
        <p>Older cars can be broken into and hot-wired.</p>
        <p>Newer cars need tools such as a key cloner. Plan thefts by the age of the vehicle, not just the model name.</p>
      </div>
      <Related path="/guides/stealing-cars" />
    </div>
  );
}
