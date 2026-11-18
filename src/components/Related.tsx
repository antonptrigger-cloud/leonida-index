import Link from "next/link";
import { relatedFor } from "@/lib/seo/related";

/**
 * "Related" block for articles, guides and profiles. Links are chosen by
 * `relatedFor(path)` (src/lib/seo/related.ts): shared characters, map regions and topics
 * across sections, falling back to the latest items in the same section. Plain visible links.
 */
export function Related({ path, title = "Related on Leonida Vice Guide" }: { path: string; title?: string }) {
  const items = relatedFor(path);
  if (!items.length) return null;
  return (
    <section aria-labelledby="related" className="mt-16x border-t border-pink/20 pt-8x">
      <h2 id="related" className="vc-display text-3xl text-ink">{title}</h2>
      <ul className="mt-6x grid gap-4x sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <li key={r.href}>
            <Link href={r.href} className="vc-card group block h-full p-4x">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">{r.label}</span>
              <span className="vc-display mt-1x block text-2xl leading-tight text-ink group-hover:text-pink">{r.title}</span>
              {r.blurb ? <span className="mt-2x block text-sm text-ink-2">{r.blurb}</span> : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
