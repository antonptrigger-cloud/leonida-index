import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { CharacterPlaceholder } from "@/components/characters/CharacterBits";
import { CHARACTERS, CHARACTER_NOTE, GROUPS, LAST_VERIFIED_LABEL, characterPath } from "@/lib/characters/characters";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Spoiler } from "@/components/guides/Spoiler";
import { NAME_IS_SPOILER } from "@/lib/spoiler-characters";
import { CAST_PATH } from "@/lib/characters/cast";
import { REFERENCE_PAGES } from "@/lib/database/reference";

export const metadata = metaFor("/database/characters");

export default function CharactersIndex() {
  return (
    <div>
      <PageSchema path="/database/characters" breadcrumbs={false} />
      <Breadcrumbs path="/database/characters" />
      <PageHeader
        kicker="Database"
        title="Characters"
        verified={`${LAST_VERIFIED_LABEL} (after launch)`}
        source="Rockstar Games, Only in Leonida and official credits, plus launch guides (labelled Reported)"
      />

      <div>
        <div>
          <p className="max-w-3xl text-base leading-relaxed text-ink-2 md:text-lg">
            Eight official People profiles from Rockstar&apos;s Only in Leonida page, covering the two leads and the people around them, plus Lori Heder and DWNPLY, who are named in those profiles. Official stills are credited © Rockstar Games. The fences, contacts and side-quest characters come from launch guides and are labelled Reported, except for names and performers listed in Rockstar&apos;s official credits. Plot details stay blurred until you reveal them.
          </p>
          <Link href={CAST_PATH} className="vc-card group mt-8x block max-w-3xl p-4x">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">Cast</span>
            <span className="vc-display mt-1x block text-2xl leading-tight text-ink group-hover:text-pink">Who voices Lucia, Jason and the rest?</span>
            <span className="mt-2x block text-sm text-ink-2">What is confirmed, what is only reported and what Rockstar has not said about the GTA 6 cast.</span>
          </Link>
          {GROUPS.map((g) => {
            const all = CHARACTERS.filter((c) => c.group === g.id);
            // Characters whose name is a Chapter 2+ mission title sit behind a reveal, not in the open list.
            const list = all.filter((c) => !(c.slug in NAME_IS_SPOILER));
            const later = all.filter((c) => c.slug in NAME_IS_SPOILER);
            const card = (c: (typeof CHARACTERS)[number]) => (
              <li key={c.slug}>
                <Link href={characterPath(c.slug)} className="ch-card group">
                  <CharacterPlaceholder c={c} />
                  <div className="ch-card__body">
                    <h3 className="ch-card__name">{c.name}</h3>
                    <span className="ch-card__role">{c.role}</span>
                    <p className="ch-card__summary">{c.summary}</p>
                  </div>
                </Link>
              </li>
            );
            return (
              <section key={g.id} aria-labelledby={`g-${g.id}`} className="mt-16x">
                <h2 id={`g-${g.id}`} className="vc-display text-3xl text-ink md:text-4xl">{g.title}</h2>
                <p className="mt-1x max-w-3xl text-[0.9375rem] text-muted">{g.blurb}</p>
                <ul className="ch-grid mt-6x">
                  {list.map(card)}
                </ul>
                {later.length ? (
                  <div className="mt-6x">
                    <Spoiler label="later-story contacts">
                      <ul className="ch-grid">{later.map(card)}</ul>
                    </Spoiler>
                  </div>
                ) : null}
              </section>
            );
          })}
          <aside className="mt-16x grid gap-6x md:grid-cols-2">
            <div className="vc-card p-6x [border-left-color:#00d4ff]">
              <h2 className="vc-kicker">How we check</h2>
              <p className="mt-4x text-sm text-ink-2">{CHARACTER_NOTE}</p>
              <p className="mt-3x text-xs text-muted">
                Last verified <time dateTime="2026-11-22">{LAST_VERIFIED_LABEL}</time>, after launch.
              </p>
            </div>
            <div className="vc-card p-6x">
              <h2 className="vc-kicker">More in the database</h2>
              <ul className="mt-4x flex flex-col gap-2x text-sm">
                {REFERENCE_PAGES.filter((p) => !p.child).map((p) => (
                  <li key={p.path}><Link href={p.path} className="text-blue hover:text-pink">{p.cardTitle}</Link></li>
                ))}
                <li><Link href="/database" className="text-blue hover:text-pink">Database home</Link></li>
              </ul>
            </div>
          </aside>
          <p className="ch-credit mt-10x">Stills and area screenshots © Rockstar Games. Duotone cards show where a character is reported, not what they look like.</p>
        </div>
      </div>
    </div>
  );
}
