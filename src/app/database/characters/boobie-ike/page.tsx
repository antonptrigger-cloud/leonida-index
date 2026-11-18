import { PageHeader } from "@/components/PageHeader";
export const metadata = { title: "Boobie Ike" };
export default function Page() {
  return (
    <div>
      <PageHeader kicker="Character" title="Boobie Ike" source="Official / Showcase" />
      <p className="max-w-xl text-ink-2">Vice City operator. Real estate, strip club, recording studio.</p>
    </div>
  );
}
