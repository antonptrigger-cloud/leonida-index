import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
export const metadata = metaFor("/database/characters/cal-hampton");
export default function Page() {
  return (
    <div>
      <PageSchema path="/database/characters/cal-hampton" />
      <PageHeader kicker="Character" title="Cal Hampton" source="Official / Showcase" />
      <p className="max-w-xl text-ink-2">Jason’s friend. Prefers snooping on Coast Guard comms from home.</p>
    </div>
  );
}
