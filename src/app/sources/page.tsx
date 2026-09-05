import { PageHeader } from "@/components/PageHeader";
export const metadata = { title: "Sources" };
export default function Page() {
  return (
    <div>
      <PageHeader kicker="About" title="How we label facts" source="Editorial" />
      <ul className="max-w-xl space-y-3 text-[#cfc9be]">
        <li><strong className="text-[#ffd36b]">Official</strong> — Rockstar or Take-Two.</li>
        <li><strong className="text-[#ffd36b]">Showcase</strong> — trailers and the Extended Look.</li>
        <li><strong className="text-[#ffd36b]">In-game</strong> — captured after 19 Nov.</li>
        <li><strong className="text-[#ffd36b]">Unverified</strong> — not treated as fact in the headline.</li>
      </ul>
    </div>
  );
}
