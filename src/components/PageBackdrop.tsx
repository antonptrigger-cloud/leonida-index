/**
 * Decorative, dimmed photo backdrop for page headers and the homepage hero.
 *
 * - Original AI-generated artwork (no game assets), stored as WebP in /public/backgrounds (full + "-sm" mobile).
 * - Absolutely positioned and full-bleed inside the nearest `relative isolate` parent, so it never
 *   shifts layout. The parent keeps its own content above it.
 * - A dark purple gradient darkens toward the bottom and fades into the page background so text
 *   and cards stay readable. Hidden from assistive tech (empty alt + aria-hidden).
 */

export const BACKDROPS = {
  /** Muscle car at a lookout over the city at dusk. Homepage hero. */
  car: { file: "home-hero-car-lookout", w: 1592, h: 1071, pos: "50% 72%" },
  /** Neon pier at night. Map header, Secrets. */
  pier: { file: "map-neon-pier", w: 1086, h: 729, pos: "50% 46%" },
  /** City skyline at sunset. News. */
  skyline: { file: "news-city-skyline", w: 1086, h: 729, pos: "50% 62%" },
  /** Speedboat and dock, purple dusk. Guides and mission guides. */
  boat: { file: "guides-speedboat-dock", w: 1592, h: 1071, pos: "50% 66%" },
  /** Beach sunset, the brightest image. About and 404. */
  beach: { file: "about-beach-sunset", w: 1086, h: 729, pos: "50% 52%" },
} as const;

export type BackdropId = keyof typeof BACKDROPS;
export type Dim = "light" | "medium" | "strong" | "heavy";

/** Overlay opacity at the top of the image. The bottom always fades to the page background. */
const DIM: Record<Dim, { top: number; mid: number }> = {
  light: { top: 0.3, mid: 0.48 },
  medium: { top: 0.45, mid: 0.6 },
  strong: { top: 0.55, mid: 0.66 },
  heavy: { top: 0.8, mid: 0.88 },
};

export function PageBackdrop({
  id,
  dim = "medium",
  priority = false,
  fadeTop = false,
  contained = false,
  fadeBottom = true,
}: {
  id: BackdropId;
  dim?: Dim;
  /** Only for the homepage hero (above the fold, likely LCP). */
  priority?: boolean;
  /** Also fade the top edge into the page (for headers that sit below breadcrumbs). */
  fadeTop?: boolean;
  /** Fill the parent's width instead of bleeding to the viewport edges (site header strip). */
  contained?: boolean;
  /** Fade the bottom edge into the page background (off for thin strips). */
  fadeBottom?: boolean;
}) {
  const b = BACKDROPS[id];
  const d = DIM[dim];
  const base = `/backgrounds/${b.file}`;
  const mask = fadeTop
    ? "linear-gradient(180deg, transparent 0%, #000 22%, #000 100%)"
    : undefined;
  return (
    <div
      aria-hidden
      data-backdrop={id}
      className={`pointer-events-none absolute inset-y-0 -z-10 overflow-hidden ${contained ? "inset-x-0" : "left-1/2 w-screen -translate-x-1/2"}`}
      style={mask ? { WebkitMaskImage: mask, maskImage: mask } : undefined}
    >
      {/* Plain <img>: decorative, pre-sized WebP variants chosen via srcset (no runtime optimizer cost). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${base}.webp`}
        srcSet={`${base}-sm.webp 720w, ${base}.webp ${b.w}w`}
        sizes="100vw"
        width={b.w}
        height={b.h}
        alt=""
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className="absolute inset-0 h-full w-full select-none object-cover"
        style={{ objectPosition: b.pos }}
        draggable={false}
      />
      {/* Headings are left-aligned: extra shade on the left keeps them legible while the right side stays vivid. */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(12,5,24,0.62) 0%, rgba(12,5,24,0.38) 45%, transparent 85%)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: fadeBottom
            ? `linear-gradient(180deg, rgba(26,10,46,${d.top}) 0%, rgba(20,8,36,${d.mid}) 62%, rgba(10,10,11,0.9) 92%, var(--bg) 100%)`
            : `linear-gradient(180deg, rgba(26,10,46,${d.top}) 0%, rgba(20,8,36,${d.mid}) 100%)`,
        }}
      />
    </div>
  );
}
