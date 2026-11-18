import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
export const metadata = metaFor("/guides/beginner");
export default function Page() {
  return (
    <div>
      <PageSchema path="/guides/beginner" />
      <PageHeader kicker="Guide" title="First hours in Leonida" source="Showcase" />
      <div className="max-w-xl space-y-4 text-ink-2">
        <p>You play Lucia Caminos and Jason Duval. You can switch between them, including mid-job.</p>
        <p>The story is a couple under pressure across the state of Leonida, not just Vice City.</p>
        <p>Spend time off the mission marker. Activities, animals, and random encounters are part of the design.</p>
      </div>
    </div>
  );
}
