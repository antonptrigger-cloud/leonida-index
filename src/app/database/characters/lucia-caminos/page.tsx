import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
export const metadata = metaFor("/database/characters/lucia-caminos");
export default function Page() {
  return (
    <div>
      <PageSchema path="/database/characters/lucia-caminos" />
      <PageHeader kicker="Character" title="Lucia Caminos" source="Official / Showcase" />
      <p className="max-w-xl text-ink-2">First female lead in a numbered HD-universe GTA. Fresh out of Leonida Penitentiary. Wants the good life on her own terms.</p>
    </div>
  );
}
