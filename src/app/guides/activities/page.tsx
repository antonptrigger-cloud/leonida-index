import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
export const metadata = metaFor("/guides/activities");
export default function Page() {
  return (
    <div>
      <PageSchema path="/guides/activities" />
      <PageHeader kicker="Guide" title="Activities" source="Showcase" />
      <ul className="max-w-xl list-disc space-y-2 pl-5 text-ink-2">
        <li>Gym and food / drink that change how you feel in the moment</li>
        <li>Scuba, kayak, swim, jet ski, fish</li>
        <li>Basketball, pool, mini golf, races, base jump</li>
        <li>Animals to study, pet, or scold</li>
      </ul>
    </div>
  );
}
