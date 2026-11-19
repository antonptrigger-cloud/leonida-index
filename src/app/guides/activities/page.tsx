import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";
import { Related } from "@/components/Related";
import { Faq } from "@/components/Faq";
import { ACTIVITIES_FAQ } from "@/lib/guides/basics";
export const metadata = metaFor("/guides/activities");
export default function Page() {
  return (
    <div>
      <PageSchema path="/guides/activities" breadcrumbs={false} />
      <Breadcrumbs path="/guides/activities" />
      <PageHeader backdrop="boat" kicker="Guide" title="Activities" source="Showcase" />
      <ul className="max-w-xl list-disc space-y-2 pl-5 text-ink-2">
        <li>Gym and food / drink that change how you feel in the moment</li>
        <li>Scuba, kayak, swim, jet ski, fish</li>
        <li>Basketball, pool, mini golf, races, base jump</li>
        <li>Animals to study, pet, or scold</li>
        <li>
          Creature hunting: see our <Link href="/guides/bigfoot-skunk-ape" className="text-orange hover:text-pink">Bigfoot and Skunk Ape guide</Link>
        </li>
      </ul>
      <Faq items={ACTIVITIES_FAQ} />
      <Related path="/guides/activities" />
    </div>
  );
}
