import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
export const metadata = metaFor("/database/characters/boobie-ike");
export default function Page() {
  return (
    <div>
      <PageSchema path="/database/characters/boobie-ike" />
      <PageHeader kicker="Character" title="Boobie Ike" source="Official / Showcase" />
      <p className="max-w-xl text-ink-2">Vice City operator. Real estate, strip club, recording studio.</p>
    </div>
  );
}
