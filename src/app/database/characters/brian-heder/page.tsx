import { PageHeader } from "@/components/PageHeader";
export const metadata = { title: "Brian Heder" };
export default function Page() {
  return (
    <div>
      <PageHeader kicker="Character" title="Brian Heder" source="Official / Showcase" />
      <p className="max-w-xl text-ink-2">Seasoned drug runner from the Keys’ smuggling years.</p>
    </div>
  );
}
