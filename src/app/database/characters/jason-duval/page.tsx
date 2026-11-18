import { PageHeader } from "@/components/PageHeader";
export const metadata = { title: "Jason Duval" };
export default function Page() {
  return (
    <div>
      <PageHeader kicker="Character" title="Jason Duval" source="Official / Showcase" />
      <p className="max-w-xl text-ink-2">Ex-military, working the Keys for drug runners. Lucia’s partner.</p>
    </div>
  );
}
