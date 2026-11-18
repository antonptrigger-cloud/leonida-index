import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { NEWS, newsPath } from "@/lib/news/articles";

export const metadata = metaFor("/news");

const date = new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", timeZone: "Australia/Brisbane" });

export default function Page() {
  const [lead, ...rest] = NEWS;
  return (
    <div>
      <PageSchema path="/news" />
      <PageHeader backdrop="skyline" dim="strong" kicker="News · Launch week" title="Launch news" source="Official + reputable outlets" verified="18 Nov 2026" />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Link href={newsPath(lead.slug)} className="vc-card group block p-6x">
            <p className="vc-kicker">{lead.tag}</p>
            <h2 className="vc-display mt-3x text-5xl leading-none text-ink group-hover:text-pink">{lead.crumb}</h2>
            <p className="mt-4x max-w-xl text-ink-2">{lead.teaser}</p>
            <p className="mt-4x text-xs text-muted">
              <time dateTime={lead.published}>{date.format(new Date(lead.published))}</time> · Read the report <span aria-hidden>→</span>
            </p>
          </Link>

          <ol className="mt-10x flex flex-col border-t border-pink/20">
            {rest.map((n, i) => (
              <li key={n.slug}>
                <Link href={newsPath(n.slug)} className="vc-index-row">
                  <span className="vc-index-row__num">{String(i + 2).padStart(2, "0")}</span>
                  <span className="relative">
                    <span className="vc-display block text-[1.75rem] leading-none text-ink">{n.crumb}</span>
                    <span className="mt-1x block text-[0.8rem] text-muted">
                      {n.tag} · {n.teaser}
                    </span>
                  </span>
                  <span className="vc-index-row__arrow relative text-xl" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/news/release-date" className="vc-index-row">
                <span className="vc-index-row__num">{String(NEWS.length + 1).padStart(2, "0")}</span>
                <span className="relative">
                  <span className="vc-display block text-[1.75rem] leading-none text-ink">Release date and platforms</span>
                  <span className="mt-1x block text-[0.8rem] text-muted">Reference · 19 November, PS5 and Xbox Series X|S, preload and price.</span>
                </span>
                <span className="vc-index-row__arrow relative text-xl" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          </ol>
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x">
            <h2 className="vc-kicker">How we report</h2>
            <p className="mt-4x text-sm text-ink-2">
              Every article links its sources and keeps official facts apart from reports. Anything we could not confirm is labelled{" "}
              <strong className="text-orange">unconfirmed</strong>. No story spoilers.
            </p>
          </div>
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">Fan site</h2>
            <p className="mt-4x text-sm text-ink-2">Independent. Not affiliated with Rockstar Games or Take-Two Interactive.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
