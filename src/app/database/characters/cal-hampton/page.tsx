import { PageHeader } from "@/components/PageHeader";
export const metadata = { title: "Cal Hampton" };
export default function Page() {
  return (
    <div>
      <PageHeader kicker="Character" title="Cal Hampton" source="Official / Showcase" />
      <p className="max-w-xl text-[#cfc9be]">Jason’s friend. Prefers snooping on Coast Guard comms from home.</p>
    </div>
  );
}
