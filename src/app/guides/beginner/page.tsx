import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Related } from "@/components/Related";
import { Faq } from "@/components/Faq";
import Link from "next/link";
import { BEGINNER_FAQ } from "@/lib/guides/basics";
export const metadata = metaFor("/guides/beginner");
export default function Page() {
  return (
    <div>
      <PageSchema path="/guides/beginner" breadcrumbs={false} />
      <Breadcrumbs path="/guides/beginner" />
      <PageHeader backdrop="boat" kicker="Guide" title="First hours in Leonida" source="Showcase" verified="after launch" />
      <div className="max-w-xl space-y-4 text-ink-2">
        <p>
          You play Lucia Caminos and Jason Duval. Free switching between them opens partway through the story, and it works mid-job. See{" "}
          <Link href="/guides/switch-characters" className="text-orange hover:text-pink">how to switch characters</Link> and{" "}
          <Link href="/guides/saving" className="text-orange hover:text-pink">how saving works</Link>.
        </p>
        <p>The story is a couple under pressure across the state of Leonida, not just Vice City.</p>
        <p>
          Struggling with the shootouts or the driving? GTA 6 has no difficulty levels, but there are <Link href="/guides/difficulty" className="text-orange hover:text-pink">settings that can help</Link>.
        </p>
        <p>Spend time off the mission marker. Activities, animals, and random encounters are part of the design.</p>
        <p>
          There is no free fast travel, so getting around the map is a skill of its own. See <Link href="/guides/fast-travel" className="text-orange hover:text-pink">how fast travel works</Link>.
        </p>
      </div>
      <Faq items={BEGINNER_FAQ} />
      <Related path="/guides/beginner" />
    </div>
  );
}
