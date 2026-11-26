/**
 * Decorative, dimmed photo backdrop for page headers and the homepage hero.
 *
 * Official Rockstar Games screenshots from rockstargames.com/VI media, stored as
 * pre-compressed WebP in /public/backgrounds (full + "-sm" mobile). Several page
 * types reuse the same file to keep storage down. A subtle "© Rockstar Games"
 * credit is drawn on official shots. No logos, no leaks.
 *
 * Absolutely positioned and full-bleed inside the nearest `relative isolate`
 * parent, so it never shifts layout. A dark purple gradient darkens toward the
 * bottom and fades into the page background so text and cards stay readable.
 * Hidden from assistive tech (empty alt + aria-hidden).
 */

export const BACKDROPS = {
  /** Vice City marina and skyline. Homepage hero and database/character headers. */
  car: { file: "official-marina", w: 1600, h: 900, pos: "50% 58%", official: true },
  /** Vice City at dusk (Megamundo / ferris wheel). Map header, Secrets, news. */
  pier: { file: "official-sunset", w: 1600, h: 900, pos: "50% 42%", official: true },
  /** Same dusk skyline, slightly higher crop. News articles and hubs. */
  skyline: { file: "official-sunset", w: 1600, h: 900, pos: "50% 38%", official: true },
  /** Grassrivers swamp from the air. Guides and mission guides. */
  boat: { file: "official-swamp", w: 1600, h: 900, pos: "50% 48%", official: true },
  /** Leonida Keys, seaplane over the causeway. About, 404, tools, sources. */
  beach: { file: "official-keys", w: 1600, h: 900, pos: "50% 40%", official: true },
  /** Alias for pages that want the marina shot without the home "car" name. */
  marina: { file: "official-marina", w: 1600, h: 900, pos: "50% 55%", official: true },
  /** Alias for region and swamp-mood pages. */
  swamp: { file: "official-swamp", w: 1600, h: 900, pos: "50% 45%", official: true },
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
  credit = true,
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
  /** Draw the "© Rockstar Games" line. Turn off only when the page credits the image elsewhere in view. */
  credit?: boolean;
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
      {/*
        <picture> with width media, not srcset+sizes: a 3x phone still "needs" ~1200px under sizes="100vw",
        so it was downloading the 1600px file (official-swamp.webp is 205 KB vs 49 KB -sm). Media sources
        pin phones to -sm and mid widths to -md.
      */}
      <picture>
        <source media="(max-width: 767px)" srcSet={`${base}-sm.webp`} type="image/webp" />
        <source media="(max-width: 1279px)" srcSet={`${base}-md.webp`} type="image/webp" />
        <img
          src={`${base}.webp`}
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
      </picture>
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
      {credit && "official" in b && b.official ? (
        <p className="absolute bottom-[14%] right-4 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/65 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] sm:right-6">
          © Rockstar Games
        </p>
      ) : null}
    </div>
  );
}
