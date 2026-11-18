import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Spoiler } from "@/components/guides/Spoiler";
import { SpoilerWarning } from "@/components/guides/MissionBits";
import { CharSources, CharacterPlaceholder, ConfirmTag } from "@/components/characters/CharacterBits";
import { CHARACTERS, LAST_VERIFIED_LABEL, SOURCES, characterBySlug, characterPath } from "@/lib/characters/characters";

export const dynamicParams = false;

export function generateStaticParams() {
  return CHARACTERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!characterBySlug(slug)) return {};
  return metaFor(characterPath(slug));
}

export default async function CharacterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = characterBySlug(slug);
  if (!c) notFound();
  const i = CHARACTERS.indexOf(c);
  const prev = CHARACTERS[(i - 1 + CHARACTERS.length) % CHARACTERS.length];
  const next = CHARACTERS[(i + 1) % CHARACTERS.length];
  const sources = c.sourceIds.map((id) => SOURCES[id]);
  const path = characterPath(c.slug);

  return (
    <article>
      <PageSchema path={path} />
      <nav aria-label="Breadcrumb" className="mb-6x text-xs text-muted">
        <Link href="/database/characters" className="hover:text-pink">Characters</Link>
        <span aria-hidden> / </span>
        <span className="text-ink-2">{c.name}</span>
      </nav>
      <PageHeader
        kicker={`Character · ${c.role}`}
        title={c.name}
        verified={`${LAST_VERIFIED_LABEL} (pre-launch)`}
        source="Rockstar Games, Only in Leonida"
      />

      {c.spoiler ? (
        <SpoilerWarning>
          Rockstar&apos;s own profile text is visible. Story and footage details from secondary reports stay blurred until you reveal them.
        </SpoilerWarning>
      ) : null}

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="max-w-2xl text-xl leading-snug text-ink">{c.summary}</p>
          <blockquote className="vc-bar mt-6x max-w-2xl">
            <p className="text-lg text-ink-2">&ldquo;{c.quote}&rdquo;</p>
            <footer className="mt-1x text-xs text-muted">Rockstar Games, Only in Leonida</footer>
          </blockquote>

          <section aria-labelledby="background" className="mt-16x">
            <h2 id="background" className="vc-display text-3xl text-ink">What Rockstar says</h2>
            <div className="mt-4x max-w-2xl space-y-4x text-lg text-ink-2">
              {c.background.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="relationships" className="mt-16x">
            <h2 id="relationships" className="vc-display text-3xl text-ink">Relationships</h2>
            <ul className="mt-4x flex flex-col gap-3x">
              {c.relationships.map((r) => (
                <li key={r.name} className="vc-bar">
                  {r.slug ? (
                    <Link href={characterPath(r.slug)} className="font-semibold text-blue hover:text-pink">
                      {r.name}
                    </Link>
                  ) : (
                    <span className="font-semibold text-ink">{r.name}</span>
                  )}
                  <span className="block text-sm text-ink-2">{r.note}</span>
                </li>
              ))}
            </ul>
          </section>

          {c.spoiler ? (
            <section aria-labelledby="footage" className="mt-16x">
              <h2 id="footage" className="vc-display text-3xl text-ink">Seen in footage</h2>
              <p className="mt-2x text-sm text-muted">
                From a secondary summary of An Extended Look, not from Rockstar&apos;s profile. <ConfirmTag status="tbc" />
              </p>
              <div className="mt-4x">
                <Spoiler label="Footage notes">
                  <ul className="flex list-disc flex-col gap-3x pl-6x text-ink-2 marker:text-pink">
                    {c.spoiler.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </Spoiler>
              </div>
            </section>
          ) : null}

          <section aria-labelledby="tbc" className="mt-16x">
            <h2 id="tbc" className="vc-display text-3xl text-ink">Still to confirm</h2>
            <ul className="mt-4x flex list-disc flex-col gap-2x pl-6x text-ink-2 marker:text-orange">
              {c.tbc.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="mt-3x text-xs text-muted">We recheck every profile against the finished game after launch on 19 November 2026.</p>
          </section>
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-5">
          <CharacterPlaceholder c={c} size="hero" />
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">Key facts</h2>
            <dl className="mt-4x flex flex-col divide-y divide-pink/15 text-sm">
              {c.facts.map((f) => (
                <div key={f.label} className="flex flex-col gap-1x py-3x first:pt-0 last:pb-0">
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted">{f.label}</dt>
                  <dd className="flex flex-wrap items-baseline gap-x-3x gap-y-1x text-ink-2">
                    <span>{f.value}</span>
                    <ConfirmTag status={f.status} />
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4x text-xs text-muted">
              <span className="text-turq">Confirmed</span>: Rockstar&apos;s profile says so. <span className="text-orange">To be confirmed</span>: not stated yet, or secondary reporting only.
            </p>
          </div>
        </aside>
      </div>

      <CharSources sources={sources} />

      <nav aria-label="More characters" className="mt-16x grid gap-4x border-t border-pink/20 pt-6x sm:grid-cols-2">
        <Link href={characterPath(prev.slug)} className="vc-card block p-4x">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">← Previous</span>
          <span className="vc-display mt-1x block text-2xl text-ink">{prev.name}</span>
        </Link>
        <Link href={characterPath(next.slug)} className="vc-card block p-4x sm:text-right">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">Next →</span>
          <span className="vc-display mt-1x block text-2xl text-ink">{next.name}</span>
        </Link>
      </nav>
    </article>
  );
}
