import { PageHeader } from "@/components/PageHeader";
export const metadata = { title: "Raul Bautista" };
export default function Page() {
  return (
    <div>
      <PageHeader kicker="Character" title="Raul Bautista" source="Official / Showcase" />
      <p className="max-w-xl text-[#cfc9be]">Experienced bank robber always looking for new talent.</p>
    </div>
  );
}
