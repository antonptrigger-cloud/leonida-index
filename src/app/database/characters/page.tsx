import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

const PEOPLE = [
  ["lucia-caminos", "Lucia Caminos"],
  ["jason-duval", "Jason Duval"],
  ["cal-hampton", "Cal Hampton"],
  ["boobie-ike", "Boobie Ike"],
  ["dre-quan-priest", "Dre’Quan Priest"],
  ["raul-bautista", "Raul Bautista"],
  ["brian-heder", "Brian Heder"],
  ["real-dimez", "Real Dimez"],
];

export const metadata = metaFor("/database/characters");

export default function Page() {
  return (
    <div>
      <PageSchema path="/database/characters" />
      <PageHeader kicker="Database" title="Characters" source="Official / Showcase" />
      <ul className="grid gap-2 sm:grid-cols-2">
        {PEOPLE.map(([slug, name]) => (
          <li key={slug}>
            <Link href={`/database/characters/${slug}`} className="text-orange hover:text-pink">{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
