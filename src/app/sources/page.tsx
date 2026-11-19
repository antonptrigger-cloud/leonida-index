import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
export const metadata = metaFor("/sources");
export default function Page() {
  return (
    <div>
      <PageSchema path="/sources" breadcrumbs={false} />
      <Breadcrumbs path="/sources" />
      <PageHeader kicker="About" title="How we label facts" source="Editorial" />
      <ul className="max-w-xl space-y-3 text-ink-2">
        <li><strong className="text-orange">Official</strong> — Rockstar or Take-Two.</li>
        <li><strong className="text-orange">Showcase</strong> — trailers and the Extended Look.</li>
        <li><strong className="text-orange">In-game</strong> — captured after 19 Nov.</li>
        <li><strong className="text-orange">Unverified</strong> — not treated as fact in the headline.</li>
      </ul>
      <h2 className="mb-2 mt-10 text-sm uppercase tracking-widest text-turq">Map data credits</h2>
      <p className="max-w-xl text-ink-2">
        Pins marked <strong className="text-turq">official</strong> are places Rockstar names itself. Pins marked GTADB use landmark data from{" "}
        <a href="https://map.gtadb.org" className="underline" target="_blank" rel="noopener">GTADB.org</a> and its contributors,
        licensed <a href="https://creativecommons.org/licenses/by/4.0/" className="underline" target="_blank" rel="noopener">CC BY 4.0</a>.
        We changed it: filtered, re-typed and repositioned onto our own base map, so those positions are approximate. We do not use
        their map tiles or photos. Community pins are marked by players and reviewed by moderators.
      </p>
      <p className="mt-3 max-w-xl text-ink-2">
        The base map is our own AI-generated illustration, cleaned and upscaled with open tools (Real-ESRGAN, BSD-3-Clause; LaMa, Apache-2.0).
        It is not Rockstar’s map and not the in-game geography, and it carries an “Illustrative base map” note on the map itself. Region and district names on it are drawn by the site and come only from Rockstar’s own pages; positions are approximate.
      </p>
      <p className="mt-3 max-w-xl text-ink-2">
        Vendor, shop and service categories (gas, clothing, tattoo, banks and so on) are our own grouping with our own icons. Only nine places carry
        one from data, and each is named by Rockstar itself; where we placed a pin using a GTADB.org record for its direction only, that record is credited in
        the pin and in our data credits. Players can add a category when they submit a place. Positions stay approximate.
      </p>
    </div>
  );
}
