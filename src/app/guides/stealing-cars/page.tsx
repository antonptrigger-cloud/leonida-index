import { PageHeader } from "@/components/PageHeader";
export const metadata = { title: "Stealing cars" };
export default function Page() {
  return (
    <div>
      <PageHeader kicker="Guide" title="Stealing cars" source="Showcase" />
      <div className="max-w-xl space-y-4 text-[#cfc9be]">
        <p>Older cars can be broken into and hot-wired.</p>
        <p>Newer cars need tools such as a key cloner. Plan thefts by the age of the vehicle, not just the model name.</p>
      </div>
    </div>
  );
}
