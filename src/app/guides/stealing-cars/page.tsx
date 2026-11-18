import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
export const metadata = metaFor("/guides/stealing-cars");
export default function Page() {
  return (
    <div>
      <PageSchema path="/guides/stealing-cars" />
      <PageHeader kicker="Guide" title="Stealing cars" source="Showcase" />
      <div className="max-w-xl space-y-4 text-ink-2">
        <p>Older cars can be broken into and hot-wired.</p>
        <p>Newer cars need tools such as a key cloner. Plan thefts by the age of the vehicle, not just the model name.</p>
      </div>
    </div>
  );
}
