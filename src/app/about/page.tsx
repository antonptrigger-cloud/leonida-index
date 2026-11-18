import { PageHeader } from "@/components/PageHeader";
export const metadata = { title: "About" };
export default function Page() {
  return (
    <div>
      <PageHeader kicker="About" title="Leonida Index" source="Editorial" />
      <p className="max-w-xl text-ink-2">
        Independent fan utility for Grand Theft Auto VI. Map, guides, database, tools.
        Not affiliated with Rockstar Games or Take-Two Interactive.
      </p>
    </div>
  );
}
