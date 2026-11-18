import { PageHeader } from "@/components/PageHeader";
export const metadata = { title: "Wanted system" };
export default function Page() {
  return (
    <div>
      <PageHeader kicker="Guide" title="Wanted system" source="Showcase" />
      <div className="max-w-xl space-y-4 text-ink-2">
        <p>Six-star wanted returns. A crime needs a witness or an alarm before heat starts.</p>
        <p>Hollow stars mean police do not know what you look like. Leave the hot area clean and you can drop it.</p>
        <p>You can tell the other protagonist to run while you take the heat. They text when it is clear.</p>
        <p>City streets at three stars and up are tight. Fast cars matter more in Vice City than in the Keys or swamp.</p>
      </div>
    </div>
  );
}
