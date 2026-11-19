import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Related } from "@/components/Related";
import { Faq } from "@/components/Faq";
import { BEGINNER_FAQ } from "@/lib/guides/basics";
export const metadata = metaFor("/guides/beginner");
export default function Page() {
  return (
    <div>
      <PageSchema path="/guides/beginner" breadcrumbs={false} />
      <Breadcrumbs path="/guides/beginner" />
      <PageHeader backdrop="boat" kicker="Guide" title="First hours in Leonida" source="Showcase" />
      <div className="max-w-xl space-y-4 text-ink-2">
        <p>You play Lucia Caminos and Jason Duval. You can switch between them, including mid-job.</p>
        <p>The story is a couple under pressure across the state of Leonida, not just Vice City.</p>
        <p>Spend time off the mission marker. Activities, animals, and random encounters are part of the design.</p>
      </div>
      <Faq items={BEGINNER_FAQ} />
      <Related path="/guides/beginner" />
    </div>
  );
}
