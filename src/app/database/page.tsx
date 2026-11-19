import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CAST_PATH } from "@/lib/characters/cast";
import { DB_UPDATED_LABEL, REFERENCE_PAGES } from "@/lib/database/reference";

export const metadata = metaFor("/database");

const CARDS = [
  { href: "/database/characters", kicker: "Characters", title: "Profiles from Rockstar", body: "Lucia, Jason, Brian and the people around them, plus the fences, side-quest givers and contacts launch guides describe." },
  { href: CAST_PATH, kicker: "Cast", title: "Who voices Lucia and Jason?", body: "What is confirmed, what is only reported and what Rockstar has not said." },
  ...REFERENCE_PAGES.filter((p) => !p.child).map((p) => ({ href: p.path, kicker: p.cardTitle, title: p.h1, body: p.cardBody })),
];

export default function DatabaseIndex() {
  return (
    <div>
      <PageSchema path="/database" breadcrumbs={false} />
      <Breadcrumbs path="/database" />
      <PageHeader
        kicker="Database"
        title="Database"
        verified={`${DB_UPDATED_LABEL} (launch day)`}
        source="Rockstar Games, PowerPyx and GameSpot, each labelled where used"
      />
      <p className="max-w-2xl text-lg text-ink-2">
        Reference pages for Leonida. Each fact says who reported it and how sure we are, and plot details stay blurred until you reveal them.
      </p>
      <ul className="mt-10x grid gap-6x sm:grid-cols-2">
        {CARDS.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="vc-card group block h-full p-4x">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">{c.kicker}</span>
              <span className="vc-display mt-1x block text-2xl leading-tight text-ink group-hover:text-pink">{c.title}</span>
              <span className="mt-2x block text-sm text-ink-2">{c.body}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
