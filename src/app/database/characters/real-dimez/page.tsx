import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
export const metadata = metaFor("/database/characters/real-dimez");
export default function Page() {
  return (
    <div>
      <PageSchema path="/database/characters/real-dimez" />
      <PageHeader kicker="Character" title="Real Dimez" source="Official / Showcase" />
      <p className="max-w-xl text-ink-2">Bae-Luxe and Roxy. Rapping duo, friends since high school.</p>
    </div>
  );
}
