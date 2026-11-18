import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

const GUIDES = [
  { href: "/guides/missions", title: "Mission guides: Chapter 1" },
  { href: "/guides/beginner", title: "Beginner" },
  { href: "/guides/wanted", title: "Wanted system" },
  { href: "/guides/stealing-cars", title: "Stealing cars" },
  { href: "/guides/activities", title: "Activities" },
];

export const metadata = metaFor("/guides");

export default function Guides() {
  return (
    <div>
      <PageSchema path="/guides" />
      <PageHeader kicker="Guides" title="How to play Leonida" />
      <ul className="flex flex-col gap-3">
        {GUIDES.map((g) => (
          <li key={g.href}>
            <Link href={g.href} className="text-orange hover:text-pink">{g.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
