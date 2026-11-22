import Link from "next/link";
import { NEWS, newsPath } from "@/lib/news/articles";
import { shortDate } from "@/lib/news/hub";
import { FollowCta } from "@/components/ShareButtons";

const LIMIT = 4;

/** Latest news, newest first by published date, then updated. */
export function WhatsNew() {
  const items = [...NEWS]
    .sort((a, b) => {
      const byPub = Date.parse(b.published) - Date.parse(a.published);
      return byPub !== 0 ? byPub : Date.parse(b.updated) - Date.parse(a.updated);
    })
    .slice(0, LIMIT);

  if (!items.length) return null;

  return (
    <section aria-labelledby="whats-new" className="relative">
      <div className="mb-8x flex flex-col gap-3x sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="vc-kicker">Latest</p>
          <h2 id="whats-new" className="vc-heading mt-2x text-[clamp(2.5rem,6vw,4rem)]">
            What’s new
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-x-6x gap-y-2x">
          <FollowCta />
          <Link href="/news" className="text-xs font-semibold uppercase tracking-[0.18em] text-orange hover:text-pink">
            All news <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
      <ul className="grid gap-4x sm:grid-cols-2 lg:grid-cols-4">
        {items.map((n) => (
          <li key={n.slug}>
            <Link href={newsPath(n.slug)} className="vc-card group flex h-full flex-col p-4x">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">{n.tag}</span>
              <span className="vc-display mt-2x block text-2xl leading-tight text-ink group-hover:text-pink">{n.crumb}</span>
              <span className="mt-2x block flex-1 text-sm text-ink-2">{n.teaser}</span>
              <time className="mt-4x text-[0.65rem] font-bold uppercase tracking-[0.18em] text-turq" dateTime={n.published}>
                {shortDate(n.published)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
