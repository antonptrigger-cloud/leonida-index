import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
export const metadata = metaFor("/database/characters/brian-heder");
export default function Page() {
  return (
    <div>
      <PageSchema path="/database/characters/brian-heder" />
      <PageHeader kicker="Character" title="Brian Heder" source="Official / Showcase" />
      <p className="max-w-xl text-ink-2">Seasoned drug runner from the Keys’ smuggling years.</p>
    </div>
  );
}
