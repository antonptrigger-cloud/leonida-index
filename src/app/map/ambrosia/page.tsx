import { PageHeader } from "@/components/PageHeader";

export const metadata = { title: "Ambrosia" };

export default function Page() {
  return (
    <div>
      <PageHeader kicker="Region" title="Ambrosia" source="Official / Showcase" />
      <div className="flex max-w-xl flex-col gap-6 text-[#cfc9be]">
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-widest text-[#ffd36b]">What it is</h2>
          <p>Industrial town inland.</p>
        </section>
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-widest text-[#ffd36b]">Known landmarks</h2>
          <p className="text-[#9a958c]">Add named places here as they are confirmed.</p>
        </section>
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-widest text-[#ffd36b]">Activities shown</h2>
          <p className="text-[#9a958c]">Fill from in-game after 19 Nov.</p>
        </section>
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-widest text-[#ffd36b]">Pins</h2>
          <p className="text-[#9a958c]">0 verified. Shell on purpose.</p>
        </section>
      </div>
    </div>
  );
}
