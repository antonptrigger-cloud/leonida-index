import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { CharacterPlaceholder } from "@/components/characters/CharacterBits";
import { CHARACTERS, CHARACTER_NOTE, GROUPS, LAST_VERIFIED_LABEL, characterPath } from "@/lib/characters/characters";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CAST_PATH } from "@/lib/characters/cast";

export const metadata = metaFor("/database/characters");

export default function CharactersIndex() {
  return (
    <div>
      <PageSchema path="/database/characters" breadcrumbs={false} />
      <Breadcrumbs path="/database/characters" />
      <PageHeader
        kicker="Database"
        title="Characters"
        verified={`${LAST_VERIFIED_LABEL} (launch eve)`}
        source="Rockstar Games, Only in Leonida, plus launch-eve guides (labelled Reported)"
      />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="max-w-2xl text-lg text-ink-2">
            Eight profiles from Rockstar&apos;s Only in Leonida page, covering the two leads and the people around them, plus Lori and the fences and contacts that launch-eve guides describe. Plot details stay blurred until you reveal them.
          </p>
          <Link href={CAST_PATH} className="vc-card group mt-8x block max-w-2xl p-4x">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">Cast</span>
            <span className="vc-display mt-1x block text-2xl leading-tight text-ink group-hover:text-pink">Who voices Lucia, Jason and the rest?</span>
            <span className="mt-2x block text-sm text-ink-2">What is confirmed, what is only reported and what Rockstar has not said about the GTA 6 cast.</span>
          </Link>
          {GROUPS.map((g) => {
            const list = CHARACTERS.filter((c) => c.group === g.id);
            return (
              <section key={g.id} aria-labelledby={`g-${g.id}`} className="mt-16x">
                <h2 id={`g-${g.id}`} className="vc-display text-3xl text-ink">{g.title}</h2>
                <p className="mt-1x text-sm text-muted">{g.blurb}</p>
                <ul className="mt-6x grid gap-6x sm:grid-cols-2">
                  {list.map((c) => (
                    <li key={c.slug}>
                      <Link href={characterPath(c.slug)} className="vc-card group block h-full p-4x">
                        <CharacterPlaceholder c={c} />
                        <span className="vc-display mt-4x block text-3xl leading-none text-ink group-hover:text-pink">{c.name}</span>
                        <span className="mt-1x block text-xs font-bold uppercase tracking-[0.18em] text-pink-2">{c.role}</span>
                        <span className="mt-3x block text-sm text-ink-2">{c.summary}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">How we check</h2>
            <p className="mt-4x text-sm text-ink-2">{CHARACTER_NOTE}</p>
            <p className="mt-3x text-xs text-muted">
              Last verified <time dateTime="2026-11-18">{LAST_VERIFIED_LABEL}</time>, before launch.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
