import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PageSchema } from "@/lib/seo/jsonld";
import { NEWS, newsBySlug, newsPath } from "@/lib/news/articles";

/** External source link. Opens in a new tab. */
export function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue underline decoration-blue/40 underline-offset-2 hover:text-pink hover:decoration-pink">
      {children}
    </a>
  );
}

export function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="vc-display mt-10x scroll-mt-24 pt-2x text-3xl text-ink">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-6x text-lg font-semibold text-ink">{children}</h3>;
}

export function Bullets({ children }: { children: React.ReactNode }) {
  return <ul className="flex list-disc flex-col gap-3x pl-6x marker:text-pink">{children}</ul>;
}

export function Steps({ children }: { children: React.ReactNode }) {
  return <ol className="flex list-decimal flex-col gap-2x pl-6x marker:font-bold marker:text-pink">{children}</ol>;
}

/** Lead-in label inside a bullet. */
export function Lead({ children }: { children: React.ReactNode }) {
  return <strong className="text-orange">{children}</strong>;
}

export function Lede({ children }: { children: React.ReactNode }) {
  return <p className="text-xl leading-snug text-ink">{children}</p>;
}

/** Tone: "note" (orange) for corrections, "unconfirmed" (blue) for caveats. */
export function Callout({ title, tone = "note", children }: { title: string; tone?: "note" | "unconfirmed"; children: React.ReactNode }) {
  return (
    <aside
      className={`vc-card p-4x text-sm text-ink-2 ${tone === "unconfirmed" ? "[border-left-color:#00d4ff]" : "[border-left-color:#ff8c42]"}`}
      role="note"
    >
      <p className={`vc-kicker mb-2x ${tone === "unconfirmed" ? "text-blue" : ""}`}>{title}</p>
      {children}
    </aside>
  );
}

export function DataTable({ head, rows, minWidth = "32rem" }: { head: string[]; rows: React.ReactNode[][]; minWidth?: string }) {
  return (
    <div className="overflow-x-auto border border-pink/20">
      <table className="w-full border-collapse text-left text-sm" style={{ minWidth }}>
        <thead>
          <tr className="border-b border-pink/30 bg-pink/5 text-muted">
            {head.map((h) => (
              <th key={h} scope="col" className="px-3x py-2x font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-line last:border-b-0">
              {row.map((cell, j) => (
                <td key={j} className={`px-3x py-3x ${j === 0 ? "font-medium text-ink" : ""}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Sources({ children }: { children: React.ReactNode }) {
  return (
    <section aria-labelledby="sources" className="mt-16x">
      <h2 id="sources" className="vc-display text-3xl text-ink">
        Sources
      </h2>
      <p className="mt-2x text-sm text-muted">Wording on this page is our own. Links open the original reporting.</p>
      <ul className="mt-4x flex flex-col gap-3x text-sm">{children}</ul>
    </section>
  );
}

export function Source({ href, label, kind }: { href: string; label: string; kind: string }) {
  return (
    <li className="vc-bar">
      <Ext href={href}>{label}</Ext>
      <span className="block text-xs text-muted">{kind}</span>
    </li>
  );
}

const fmt = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Australia/Brisbane",
  hour12: false,
});

/** Shared shell for every news article: breadcrumb, header, spoiler line, body, aside. */
export function NewsLayout({
  slug,
  kicker,
  title,
  source,
  spoilerFree = true,
  children,
}: {
  slug: string;
  kicker: string;
  title: string;
  source: string;
  spoilerFree?: boolean;
  children: React.ReactNode;
}) {
  const item = newsBySlug(slug);
  if (!item) throw new Error(`Unknown news article: ${slug}`);
  const related = NEWS.filter((n) => n.slug !== slug).slice(0, 3);
  return (
    <article>
      <PageSchema path={newsPath(slug)} />
      <nav aria-label="Breadcrumb" className="mb-6x text-xs text-muted">
        <Link href="/news" className="hover:text-pink">
          News
        </Link>
        <span aria-hidden> / </span>
        <span className="text-ink-2">{item.crumb}</span>
      </nav>
      <PageHeader kicker={kicker} title={title} verified={`${fmt.format(new Date(item.updated))} AEST`} source={source} />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="flex min-w-0 max-w-2xl flex-col gap-4x text-ink-2 lg:col-span-8">{children}</div>
        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x [border-left-color:#00e5cc]">
            <h2 className="vc-kicker">{spoilerFree ? "Spoiler-free" : "Spoilers"}</h2>
            <p className="mt-4x text-sm text-ink-2">
              {spoilerFree
                ? "No story, mission or character details on this page. Safe to read before you play."
                : "This page discusses the story."}
            </p>
            <p className="mt-3x text-xs text-muted">
              Published <time dateTime={item.published}>{fmt.format(new Date(item.published))}</time> AEST. Updated{" "}
              <time dateTime={item.updated}>{fmt.format(new Date(item.updated))}</time> AEST.
            </p>
          </div>
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">More news</h2>
            <ul className="mt-4x flex flex-col gap-3x text-sm">
              {related.map((n) => (
                <li key={n.slug} className="vc-bar">
                  <Link href={newsPath(n.slug)} className="text-ink hover:text-pink">
                    {n.crumb}
                  </Link>
                  <span className="block text-xs text-muted">{n.tag}</span>
                </li>
              ))}
              <li className="vc-bar [--bar:#00d4ff]">
                <Link href="/map" className="text-ink hover:text-pink">
                  Leonida map
                </Link>
                <span className="block text-xs text-muted">Interactive</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      <p className="mt-16x text-xs text-muted">Fan site. Not affiliated with Rockstar Games or Take-Two Interactive.</p>
    </article>
  );
}
