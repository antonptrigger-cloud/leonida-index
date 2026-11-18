import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
export const metadata = metaFor("/database/characters/raul-bautista");
export default function Page() {
  return (
    <div>
      <PageSchema path="/database/characters/raul-bautista" />
      <PageHeader kicker="Character" title="Raul Bautista" source="Official / Showcase" />
      <p className="max-w-xl text-ink-2">Experienced bank robber always looking for new talent.</p>
    </div>
  );
}
