import Link from "next/link";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { ConfirmTag, SourceList } from "@/components/characters/CharacterBits";
import { Spoiler } from "@/components/guides/Spoiler";
import { SpoilerWarning } from "@/components/guides/MissionBits";
import { DB_VERIFIED, DB_VERIFIED_LABEL, REFERENCE_PAGES, REFERENCE_BY_PATH, type RefTable } from "@/lib/database/reference";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "2026-11-19" becomes "19 Nov 2026". */
function dateLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** Cells that are site paths (such as /map/vice-city) render as links. */
function Cell({ value }: { value: string }) {
  if (/^\/[a-z0-9/-]+$/.test(value)) {
    return <Link href={value} className="text-blue hover:text-pink">{value}</Link>;
  }
  return <>{value}</>;
}

function Table({ table }: { table: RefTable }) {
  const [first, ...rest] = table.columns;
  return (
    <div className="vc-card mt-4x overflow-x-auto p-4x">
      <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
        <caption className="sr-only">{table.caption}</caption>
        <thead>
          <tr className="text-xs uppercase tracking-[0.18em] text-muted">
            <th scope="col" className="pb-3x pr-4x font-semibold">{first}</th>
            {rest.map((c) => (
              <th key={c} scope="col" className="pb-3x pr-4x font-semibold last:pr-0">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-pink/15 align-top text-ink-2">
          {table.rows.map((row) => (
            <tr key={row.join("|")}>
              <th scope="row" className="py-3x pr-4x font-semibold text-ink">{row[0]}</th>
              {row.slice(1).map((cell, i) => (
                <td key={i} className="py-3x pr-4x last:pr-0"><Cell value={cell} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Shared layout for the vehicles, weapons and radio reference pages. Data lives in lib/database/reference.ts. */
export function ReferencePage({ path }: { path: string }) {
  const page = REFERENCE_BY_PATH[path];
  if (!page) throw new Error(`No reference page for ${path}`);
  const others = REFERENCE_PAGES.filter((p) => p.path !== path && !p.child);
  const updated = page.updated ?? DB_VERIFIED;
  const updatedLabel = page.updated ? dateLabel(page.updated) : DB_VERIFIED_LABEL;
  return (
    <article>
      <PageSchema path={path} breadcrumbs={false} />
      <Breadcrumbs path={path} />
      <PageHeader kicker={page.kicker} title={page.h1} verified={`${updatedLabel}${page.updated ? "" : " (launch eve)"}`} source={page.sourceLine} />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="max-w-2xl text-lg text-ink-2">{page.intro}</p>
          <p className="vc-bar mt-6x max-w-2xl text-sm text-ink-2">{page.notice}</p>

          {page.sections.map((s) => (
            <section key={s.id} aria-labelledby={s.id} className="mt-16x">
              <h2 id={s.id} className="vc-display text-3xl text-ink">
                {s.heading}
                {s.status ? <span className="ml-3x align-middle"><ConfirmTag status={s.status} /></span> : null}
              </h2>
              <div className="mt-4x max-w-2xl space-y-4x text-lg text-ink-2">
                {s.paragraphs?.map((t) => <p key={t}>{t}</p>)}
              </div>
              {s.table ? <Table table={s.table} /> : null}
              {s.list ? (
                <ul className="mt-4x grid max-w-2xl list-disc gap-x-8x gap-y-1x pl-6x text-ink-2 marker:text-pink sm:grid-cols-2">
                  {s.list.map((i) => <li key={i}>{i}</li>)}
                </ul>
              ) : null}
              {s.links ? (
                <ul className="mt-4x flex max-w-2xl flex-col gap-2x">
                  {s.links.map((l) => (
                    <li key={l.href} className="vc-bar">
                      <Link href={l.href} className="font-semibold text-blue hover:text-pink">{l.label}</Link>
                      {l.note ? <span className="block text-sm text-ink-2">{l.note}</span> : null}
                    </li>
                  ))}
                </ul>
              ) : null}
              {s.after ? (
                <div className="mt-4x max-w-2xl space-y-4x text-lg text-ink-2">
                  {s.after.map((t) => <p key={t}>{t}</p>)}
                </div>
              ) : null}
            </section>
          ))}

          {page.spoiler ? (
            <section aria-labelledby="spoilers" className="mt-16x">
              <h2 id="spoilers" className="vc-display text-3xl text-ink">{page.spoiler.heading}</h2>
              <div className="mt-4x">
                <SpoilerWarning>{page.spoiler.intro}</SpoilerWarning>
                <Spoiler label={page.spoiler.label}>
                  <ul className="flex max-w-2xl list-disc flex-col gap-2x pl-6x text-ink-2 marker:text-pink">
                    {page.spoiler.items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </Spoiler>
              </div>
            </section>
          ) : null}

          <p className="mt-16x max-w-2xl text-sm text-muted">{page.updateNote}</p>
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            {page.related?.length ? (
              <>
                <h2 className="vc-kicker">Related</h2>
                <ul className="mt-4x mb-6x flex flex-col gap-2x text-sm">
                  {page.related.map((r) => (
                    <li key={r.href}><Link href={r.href} className="text-blue hover:text-pink">{r.label}</Link></li>
                  ))}
                </ul>
              </>
            ) : null}
            <h2 className="vc-kicker">More in the database</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              {page.child ? (
                <li><Link href={page.child.parentPath} className="text-blue hover:text-pink">{page.child.parentLabel}</Link></li>
              ) : null}
              {others.map((p) => (
                <li key={p.path}><Link href={p.path} className="text-blue hover:text-pink">{p.cardTitle}</Link></li>
              ))}
              <li><Link href="/database/characters" className="text-blue hover:text-pink">Characters</Link></li>
              <li><Link href="/database" className="text-blue hover:text-pink">Database home</Link></li>
            </ul>
            <p className="mt-4x text-xs text-muted">
              Last verified <time dateTime={updated}>{updatedLabel}</time>.
            </p>
          </div>
        </aside>
      </div>

      <Faq items={page.faq} />

      <section aria-labelledby="sources" className="mt-16x">
        <h2 id="sources" className="vc-display text-3xl text-ink">Sources</h2>
        <p className="mt-2x text-sm text-muted">
          Last verified: <time dateTime={updated}>{updatedLabel}</time>{page.updated ? "" : " (launch eve)"}. Wording on this page is our own. &ldquo;Reported&rdquo; means an outlet other than Rockstar says so and we have not confirmed it in the finished game. Plot details stay in the blurred section.
        </p>
        <SourceList sources={page.sources} />
      </section>

      <Related path={path} />
    </article>
  );
}
