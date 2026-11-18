import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
export const metadata = metaFor("/sources");
export default function Page() {
  return (
    <div>
      <PageSchema path="/sources" breadcrumbs={false} />
      <Breadcrumbs path="/sources" />
      <PageHeader kicker="About" title="How we label facts" source="Editorial" />
      <ul className="max-w-xl space-y-3 text-ink-2">
        <li><strong className="text-orange">Official</strong> — Rockstar or Take-Two.</li>
        <li><strong className="text-orange">Showcase</strong> — trailers and the Extended Look.</li>
        <li><strong className="text-orange">In-game</strong> — captured after 19 Nov.</li>
        <li><strong className="text-orange">Unverified</strong> — not treated as fact in the headline.</li>
      </ul>
    </div>
  );
}
