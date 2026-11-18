import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

const GUIDES = [
  { href: "/guides/beginner", title: "Beginner" },
  { href: "/guides/wanted", title: "Wanted system" },
  { href: "/guides/stealing-cars", title: "Stealing cars" },
  { href: "/guides/activities", title: "Activities" },
];

export const metadata = { title: "Guides" };

export default function Guides() {
  return (
    <div>
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
