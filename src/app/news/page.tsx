import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
export const metadata = { title: "News" };
export default function Page() {
  return (
    <div>
      <PageHeader kicker="News" title="Official only, for now" source="Official" />
      <ul className="space-y-2">
        <li><Link href="/news/release-date" className="text-[#ffd36b]">Release date and platforms</Link></li>
      </ul>
    </div>
  );
}
