import { relatedFor } from "@/lib/seo/related";
import { MediaGrid } from "@/components/cards/MediaCard";

/**
 * "Related" block for articles, guides and profiles. Links are chosen by
 * `relatedFor(path)` (src/lib/seo/related.ts): shared characters, map regions and topics
 * across sections, falling back to the latest items in the same section. Plain visible links,
 * shown as image cards (official screenshots picked per section, see src/lib/media/shots.ts).
 */
export function Related({ path, title = "Related on Leonida Vice Guide" }: { path: string; title?: string }) {
  const items = relatedFor(path);
  if (!items.length) return null;
  return (
    <section aria-labelledby="related" className="mt-16x border-t border-white/10 pt-10x">
      <h2 id="related" className="vc-display text-3xl text-ink md:text-4xl">{title}</h2>
      <MediaGrid
        className="mt-6x"
        cols={3}
        items={items.map((r) => ({ href: r.href, title: r.title, kicker: r.label, blurb: r.blurb }))}
      />
    </section>
  );
}
