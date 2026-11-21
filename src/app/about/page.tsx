import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
export const metadata = metaFor("/about");
export default function Page() {
  return (
    <div>
      <PageSchema path="/about" breadcrumbs={false} />
      <Breadcrumbs path="/about" />
      <PageHeader backdrop="beach" dim="heavy" kicker="About" title="Leonida Vice Guide" source="Editorial" />
      <div className="max-w-xl space-y-4 text-ink-2">
        <p>
          Leonida Vice Guide is an independent fan site for Grand Theft Auto VI. It has a community map of Leonida,
          a <Link href="/guides/missions" className="underline">mission-by-mission walkthrough</Link>,{" "}
          <Link href="/guides" className="underline">guides</Link>, a{" "}
          <Link href="/database" className="underline">database</Link> of characters, vehicles, weapons and places,
          and <Link href="/news" className="underline">launch news</Link>. It is not affiliated with Rockstar Games or
          Take-Two Interactive.
        </p>
        <h2 className="pt-4 text-sm uppercase tracking-widest text-turq">How we write</h2>
        <p>
          We do not copy other sites. Each guide is written for this site and names the outlets it relies on, such as
          Rockstar&apos;s own pages, VGC, PowerPyx, Push Square and PC Gamer. Where outlets disagree, the page says so
          instead of picking one quietly.
        </p>
        <p>
          Every fact carries a label that says how sure we are: confirmed, reported or unverified. The labels are
          explained on <Link href="/sources" className="underline">Sources &amp; Verification</Link>, which also credits the map data.
        </p>
        <h2 className="pt-4 text-sm uppercase tracking-widest text-turq">Spoilers</h2>
        <p>
          Plot details, story rewards and some names sit behind a blur until you choose to reveal them, so you can use
          a guide without being told more than you asked for.
        </p>
        <h2 className="pt-4 text-sm uppercase tracking-widest text-turq">Updates and corrections</h2>
        <p>
          Pages show when they were last updated, and we change them as the game is patched and more players report what
          they find. Players can add places to the map; community pins are reviewed by moderators before they count.
        </p>
        <p className="text-sm text-muted">
          Grand Theft Auto is a trademark of Take-Two Interactive. Map © Rockstar Games where credited on the Sources page.
        </p>
      </div>
    </div>
  );
}
