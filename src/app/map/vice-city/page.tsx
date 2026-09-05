import { PageHeader } from "@/components/PageHeader";

export const metadata = { title: "Vice City" };

const LANDMARKS = [
  "Ocean Beach",
  "Vice Beach",
  "Ocean Drive",
  "Vice City Port",
  "Vice City International Airport",
  "Malibu Club",
  "Starlet Motel",
  "Monument of Leonida",
  "South Tower",
  "Rideout Customs",
  "Sara’s Unisex Salon",
  "Vercetti Estate",
];

export default function Page() {
  return (
    <div>
      <PageHeader kicker="Region" title="Vice City" source="Official / Showcase" />
      <div className="flex max-w-2xl flex-col gap-8 text-[#cfc9be]">
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-widest text-[#ffd36b]">What it is</h2>
          <p>
            Vice City is the Miami-inspired core of Leonida: art deco hotels, beaches,
            the port and airport, and the densest streets in the state. Heat is harder
            to drop here than in the Keys or Grassrivers.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-widest text-[#ffd36b]">Known landmarks</h2>
          <ul className="grid gap-1 sm:grid-cols-2">
            {LANDMARKS.map((name) => (
              <li key={name} className="border-b border-[#2a2a2e] py-2">
                {name}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-[#9a958c]">
            Named in official material or the Extended Look. Pins and interiors after launch.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-widest text-[#ffd36b]">Activities shown</h2>
          <p>
            Beach time, scooters, clubs and bars, store robberies, races, gyms, shopping
            and salons with Lucia and Jason.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-widest text-[#ffd36b]">Pins</h2>
          <p className="text-[#9a958c]">0 in-game verified. Map layer ships after 19 Nov.</p>
        </section>
      </div>
    </div>
  );
}