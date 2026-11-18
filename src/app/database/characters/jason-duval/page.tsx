import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
export const metadata = metaFor("/database/characters/jason-duval");
export default function Page() {
  return (
    <div>
      <PageSchema path="/database/characters/jason-duval" />
      <PageHeader kicker="Character" title="Jason Duval" source="Official / Showcase" />
      <p className="max-w-xl text-ink-2">Ex-military, working the Keys for drug runners. Lucia’s partner.</p>
    </div>
  );
}
