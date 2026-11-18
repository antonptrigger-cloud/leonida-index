import { PageHeader } from "@/components/PageHeader";
export const metadata = { title: "Secrets" };
export default function Page() {
  return (
    <div>
      <PageHeader kicker="Secrets" title="Easter eggs" source="Unverified" />
      <p className="text-muted">Shell. Submit finds after launch. Nothing invented here.</p>
    </div>
  );
}
