import { PageHeader } from "@/components/PageHeader";
export const metadata = { title: "Beginner guide" };
export default function Page() {
  return (
    <div>
      <PageHeader kicker="Guide" title="First hours in Leonida" source="Showcase" />
      <div className="max-w-xl space-y-4 text-[#cfc9be]">
        <p>You play Lucia Caminos and Jason Duval. You can switch between them, including mid-job.</p>
        <p>The story is a couple under pressure across the state of Leonida, not just Vice City.</p>
        <p>Spend time off the mission marker. Activities, animals, and random encounters are part of the design.</p>
      </div>
    </div>
  );
}
