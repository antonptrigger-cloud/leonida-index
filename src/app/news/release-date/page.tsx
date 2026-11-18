import { PageHeader } from "@/components/PageHeader";
export const metadata = { title: "Release date" };
export default function Page() {
  return (
    <div>
      <PageHeader kicker="News" title="19 November 2026" source="Official" />
      <div className="max-w-xl space-y-3 text-ink-2">
        <p>PS5 and Xbox Series X|S. Preload 12 November 2026.</p>
        <p>No day-one PC announcement. Standard about $80, Ultimate about $100.</p>
      </div>
    </div>
  );
}
