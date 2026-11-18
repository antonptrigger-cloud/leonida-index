import { PageHeader } from "@/components/PageHeader";

export const metadata = { title: "Port Gellhorn" };

export default function Page() {
  return (
    <div>
      <PageHeader kicker="Region" title="Port Gellhorn" source="Official / Showcase" />
      <div className="flex max-w-xl flex-col gap-6 text-ink-2">
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-widest text-turq">What it is</h2>
          <p>Working port city. Industrial waterfront.</p>
        </section>
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-widest text-turq">Known landmarks</h2>
          <p className="text-muted">Add named places here as they are confirmed.</p>
        </section>
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-widest text-turq">Activities shown</h2>
          <p className="text-muted">Fill from in-game after 19 Nov.</p>
        </section>
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-widest text-turq">Pins</h2>
          <p className="text-muted">0 verified. Shell on purpose.</p>
        </section>
      </div>
    </div>
  );
}
