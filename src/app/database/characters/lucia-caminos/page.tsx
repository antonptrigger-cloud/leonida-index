import { PageHeader } from "@/components/PageHeader";
export const metadata = { title: "Lucia Caminos" };
export default function Page() {
  return (
    <div>
      <PageHeader kicker="Character" title="Lucia Caminos" source="Official / Showcase" />
      <p className="max-w-xl text-[#cfc9be]">First female lead in a numbered HD-universe GTA. Fresh out of Leonida Penitentiary. Wants the good life on her own terms.</p>
    </div>
  );
}
