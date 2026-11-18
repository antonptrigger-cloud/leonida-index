import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
export const metadata = metaFor("/news");
export default function Page() {
  return (
    <div>
      <PageSchema path="/news" />
      <PageHeader kicker="News" title="Official only, for now" source="Official" />
      <ul className="space-y-2">
        <li><Link href="/news/release-date" className="text-orange">Release date and platforms</Link></li>
      </ul>
    </div>
  );
}
