import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { Spoiler } from "@/components/guides/Spoiler";
import { SourcesList, SpoilerWarning, StatusTag } from "@/components/guides/MissionBits";
import { CHAPTER, LAST_VERIFIED_LABEL, MISSIONS, ORDER_NOTE, missionBySlug, missionPath } from "@/lib/guides/missions";

export const dynamicParams = false;

export function generateStaticParams() {
  return MISSIONS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!missionBySlug(slug)) return {};
  return metaFor(missionPath(slug));
}

const ORDER_SENSITIVE = new Set(["prologue", "lab-fees", "just-a-scratch"]);

export default async function MissionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = missionBySlug(slug);
  if (!m) notFound();
  const i = MISSIONS.indexOf(m);
  const prev = MISSIONS[i - 1];
  const next = MISSIONS[i + 1];
  const path = missionPath(m.slug);
  const notes = [...(m.notes ?? []), ...(ORDER_SENSITIVE.has(m.slug) ? [ORDER_NOTE] : [])];

  return (
    <article>
      <PageSchema path={path} breadcrumbs={false} />
      <Breadcrumbs path={path} />
      <PageHeader
        backdrop="boat"
        kicker={`Mission guide · Chapter ${CHAPTER.number} · ${String(m.order).padStart(2, "0")}/${String(MISSIONS.length).padStart(2, "0")}`}
        title={m.name}
        verified={`${LAST_VERIFIED_LABEL} (pre-launch)`}
        source="PC Gamer, Press Start, PowerPyx"
      />

      <SpoilerWarning />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            {m.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {m.startLabel ? (
              <p className="text-sm text-muted">
                On the map and in your phone this starts as <strong className="text-ink">&ldquo;{m.startLabel}&rdquo;</strong>.
              </p>
            ) : null}
          </div>

          <section aria-labelledby="objectives" className="mt-16x">
            <h2 id="objectives" className="vc-display text-3xl text-ink">Objectives</h2>
            <p className="mt-2x text-sm text-muted">Reported by a pre-launch walkthrough. The on-screen prompts in your game take priority.</p>
            <div className="mt-4x">
              <Spoiler label="Objectives">
                <ol className="flex list-decimal flex-col gap-3x pl-6x text-ink-2 marker:font-bold marker:text-pink">
                  {m.objectives.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ol>
              </Spoiler>
            </div>
          </section>

          {m.spoiler ? (
            <section aria-labelledby="story" className="mt-16x">
              <h2 id="story" className="vc-display text-3xl text-ink">What happens</h2>
              <div className="mt-4x">
                <Spoiler label="Story notes">
                  <p className="text-ink-2">{m.spoiler}</p>
                </Spoiler>
              </div>
            </section>
          ) : null}

          <section aria-labelledby="tips" className="mt-16x">
            <h2 id="tips" className="vc-display text-3xl text-ink">Tips</h2>
            <ul className="mt-4x flex flex-col gap-4x">
              {m.tips.map((t) => (
                <li key={t.text} className="vc-bar text-ink-2">
                  {t.text}
                  {t.reported ? <StatusTag status="reported" /> : null}
                </li>
              ))}
            </ul>
          </section>

          {notes.length ? (
            <section aria-labelledby="notes" className="mt-16x">
              <h2 id="notes" className="vc-display text-3xl text-ink">Notes</h2>
              <ul className="mt-4x flex flex-col gap-3x text-sm text-muted">
                {notes.map((n) => (
                  <li key={n} className="vc-bar [--bar:#00d4ff]">{n}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="order-first lg:order-none lg:col-span-5" aria-labelledby="glance">
          <div className="vc-card p-6x lg:sticky lg:top-24">
            <h2 id="glance" className="vc-kicker">At a glance</h2>
            <dl className="vc-facts mt-4x text-sm">
              {m.facts.map((f) => (
                <div key={f.label} className="contents">
                  <dt>{f.label}</dt>
                  <dd className="text-ink-2">
                    {f.value}
                    <StatusTag status={f.status} />
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4x text-xs text-muted">
              <span className="text-turq">Confirmed</span>: two or more sources agree. <span className="text-orange">Reported</span>: one walkthrough says so.
            </p>
          </div>
        </aside>
      </div>

      <Faq items={m.faq} />

      <SourcesList sources={m.sources} />

      <nav aria-label="More missions" className="mt-16x grid gap-4x border-t border-pink/20 pt-6x sm:grid-cols-2">
        {prev ? (
          <Link href={missionPath(prev.slug)} className="vc-card block p-4x">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">← Previous</span>
            <span className="vc-display mt-1x block text-2xl text-ink">{prev.name}</span>
          </Link>
        ) : (
          <Link href="/guides/missions" className="vc-card block p-4x">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">← All missions</span>
            <span className="vc-display mt-1x block text-2xl text-ink">Chapter {CHAPTER.number}</span>
          </Link>
        )}
        {next ? (
          <Link href={missionPath(next.slug)} className="vc-card block p-4x sm:text-right">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">Next →</span>
            <span className="vc-display mt-1x block text-2xl text-ink">{next.name}</span>
          </Link>
        ) : (
          <Link href="/guides/missions" className="vc-card block p-4x sm:text-right">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">All missions →</span>
            <span className="vc-display mt-1x block text-2xl text-ink">Chapter {CHAPTER.number}</span>
          </Link>
        )}
      </nav>
      <Related path={path} />
    </article>
  );
}
