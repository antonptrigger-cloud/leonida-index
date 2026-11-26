import { MediaCard } from "@/components/cards/MediaCard";
import { SHOT_CREDIT } from "@/lib/media/shots";
import "@/components/cards/media-card.css";
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
      <p className="max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
        Reference pages for Leonida. Each fact says who reported it and how sure we are, and plot details stay blurred until you reveal them.
      </p>
      {/* 7 cards on a 4-column grid: the featured Characters card spans two columns, so both rows are full. */}
      <ul className="db-grid mt-10x">
        {CARDS.map((c, i) => (
          <li key={c.href} className={i === 0 ? "db-grid__feature" : undefined}>
            <MediaCard
              item={{ href: c.href, title: c.title, kicker: c.kicker, blurb: c.body }}
              feature={i === 0}
              eager={i === 0}
              headingLevel={2}
              sizes={i === 0 ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw"}
            />
          </li>
        ))}
      </ul>
      <p className="mc-credit">Screenshots {SHOT_CREDIT}</p>
    </div>
  );
}
