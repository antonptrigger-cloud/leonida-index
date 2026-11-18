import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
export const metadata = metaFor("/database/characters/dre-quan-priest");
export default function Page() {
  return (
    <div>
      <PageSchema path="/database/characters/dre-quan-priest" />
      <PageHeader kicker="Character" title="Dre’Quan Priest" source="Official / Showcase" />
      <p className="max-w-xl text-ink-2">Aspiring musician trying to get out of club gigs after signing.</p>
    </div>
  );
}
