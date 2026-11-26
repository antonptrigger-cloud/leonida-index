import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { relatedFor } from "@/lib/seo/related";
import { Spoiler } from "@/components/guides/Spoiler";
import { SourcesList, SpoilerWarning, StatusTag } from "@/components/guides/MissionBits";
import { LAST_VERIFIED_LABEL, MISSIONS, NON_CHAIN_ENTRIES, ORDER_NOTE, missionBySlug, missionChapter, missionChapterOrder, missionPath } from "@/lib/guides/missions";
import { STORY_CHAPTERS } from "@/lib/guides/story";

export const dynamicParams = false;

export function generateStaticParams() {
  return MISSIONS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!missionBySlug(slug)) return {};
  return metaFor(missionPath(slug));
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "2026-11-20T00:11:00+10:00" -> "20 Nov 2026" (date as written, in Brisbane time). */
const dateLabel = (iso: string) => `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;

const ORDER_SENSITIVE = new Set(["prologue", "lab-fees", "just-a-scratch"]);


function MissionHop({
  prev,
  next,
  path,
}: {
  prev?: (typeof MISSIONS)[number];
  next?: (typeof MISSIONS)[number];
  path: string;
}) {
  const skip = new Set([prev ? missionPath(prev.slug) : "", next ? missionPath(next.slug) : "", path]);
  const related = relatedFor(path, 4).filter((r) => !skip.has(r.href)).slice(0, 2);
  return (
    <nav aria-label="Continue reading" className="mt-6x border-t border-pink/20 pt-4x">
      <p className="vc-kicker">Keep going</p>
      <ul className="mt-3x flex flex-col gap-2x text-sm">
        <li>
          {next ? (
            <Link href={missionPath(next.slug)} className="font-semibold text-orange hover:text-pink">
              Next: {next.hidden ? "Next mission" : next.name} <span aria-hidden>→</span>
            </Link>
          ) : (
            <Link href="/guides/missions" className="font-semibold text-orange hover:text-pink">
              All missions <span aria-hidden>→</span>
            </Link>
          )}
        </li>
        {related.map((r) => (
          <li key={r.href}>
            <Link href={r.href} className="text-ink-2 hover:text-pink">
              {r.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function MissionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = missionBySlug(slug);
  if (!m) notFound();
  const i = MISSIONS.indexOf(m);
  const prev = MISSIONS[i - 1];
  const next = MISSIONS[i + 1];
  const path = missionPath(m.slug);
  const chapterNumber = missionChapter(m);
  const chapterTotal = STORY_CHAPTERS.find((c) => c.number === chapterNumber)?.missions.length ?? 0;
  // Neutral "coming soon" notes where the chapter has a mission we haven't written yet, instead of a dead link.
  const chapterGap = (a: (typeof MISSIONS)[number] | undefined, b: (typeof MISSIONS)[number] | undefined): { chapter: number; n: number }[] => {
    if (!a || !b) return [];
    const ca = missionChapter(a);
    const cb = missionChapter(b);
    const skip = NON_CHAIN_ENTRIES[ca] ?? [];
    if (ca === cb) {
      return Array.from({ length: Math.max(0, missionChapterOrder(b) - missionChapterOrder(a) - 1) }, (_, k) => missionChapterOrder(a) + k + 1)
        .filter((n) => !skip.includes(n))
        .map((n) => ({ chapter: ca, n }));
    }
    // Neighbours in different chapters: the earlier chapter may still have unwritten missions after `a`.
    const total = STORY_CHAPTERS.find((c) => c.number === ca)?.missions.length ?? 0;
    return Array.from({ length: Math.max(0, total - missionChapterOrder(a)) }, (_, k) => missionChapterOrder(a) + k + 1)
      .filter((n) => !skip.includes(n))
      .map((n) => ({ chapter: ca, n }));
  };
  const gapNumbers = [...chapterGap(prev, m), ...chapterGap(m, next)];
  const notes = [...(m.notes ?? []), ...(ORDER_SENSITIVE.has(m.slug) ? [ORDER_NOTE] : [])];

  return (
    <article>
      <PageSchema path={path} breadcrumbs={false} />
      <Breadcrumbs path={path} />
      <PageHeader
        backdrop="boat"
        kicker={`Mission guide · Chapter ${chapterNumber} · ${String(missionChapterOrder(m)).padStart(2, "0")}/${String(chapterTotal).padStart(2, "0")}`}
        title={m.name}
        verified={m.updated ? dateLabel(m.updated) : LAST_VERIFIED_LABEL}
        source={m.sourceLabel ?? (m.sources.some((x) => x.id === "vgc") ? "PC Gamer, Press Start, VGC, PowerPyx" : "PC Gamer, Press Start, PowerPyx")}
      />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SpoilerWarning />

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
            <p className="mt-2x text-sm text-muted">Reported by a walkthrough. The on-screen prompts in your game take priority.</p>
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
                  {t.link ? (
                    <>
                      {" "}
                      <Link href={t.link.href} className="text-orange hover:text-pink">{t.link.label}</Link>
                    </>
                  ) : null}
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
            {m.map ? (
              <p className="mt-4x text-sm">
                <Link href={m.map.href} className="font-semibold text-orange hover:text-pink">
                  {m.map.label} <span aria-hidden>→</span>
                </Link>
              </p>
            ) : null}
            <p className="mt-4x text-xs text-muted">
              <span className="text-turq">Confirmed</span>: two or more sources agree. <span className="text-orange">Reported</span>: one walkthrough says so.
            </p>
            <MissionHop prev={prev} next={next} path={path} />
          </div>
        </aside>
      </div>

      <Faq items={m.faq} />

      <SourcesList blurLinks={Boolean(m.hidden)} sources={m.sources} verified={m.updated ? { iso: m.updated, label: dateLabel(m.updated) } : undefined} />

      {gapNumbers.length ? (
        <p className="mt-16x text-sm text-muted">
          {gapNumbers.map((g) => `Chapter ${g.chapter}, Mission ${g.n} guide coming soon.`).join(" ")}
        </p>
      ) : null}

      <nav aria-label="More missions" className={`${gapNumbers.length ? "mt-4x" : "mt-16x"} grid gap-4x border-t border-pink/20 pt-6x sm:grid-cols-2`}>
        {prev ? (
          <Link href={missionPath(prev.slug)} className="vc-card block p-4x">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">← Previous</span>
            <span className="vc-display mt-1x block text-2xl text-ink">{prev.hidden ? "Previous mission" : prev.name}</span>
          </Link>
        ) : (
          <Link href="/guides/missions" className="vc-card block p-4x">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">← All missions</span>
            <span className="vc-display mt-1x block text-2xl text-ink">Chapter {chapterNumber}</span>
          </Link>
        )}
        {next ? (
          <Link href={missionPath(next.slug)} className="vc-card block p-4x sm:text-right">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">Next →</span>
            <span className="vc-display mt-1x block text-2xl text-ink">{next.hidden ? "Next mission" : next.name}</span>
          </Link>
        ) : (
          <Link href="/guides/missions" className="vc-card block p-4x sm:text-right">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">All missions →</span>
            <span className="vc-display mt-1x block text-2xl text-ink">Chapter {chapterNumber}</span>
          </Link>
        )}
      </nav>
      <Related path={path} />
    </article>
  );
}
