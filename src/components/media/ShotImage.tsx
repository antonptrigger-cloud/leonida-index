import { shot, srcSetOf, type ShotId } from "@/lib/media/shots";

/**
 * Responsive official screenshot. Pre-sized WebP files (base / -md / -sm) via srcset, lazy by default,
 * so the browser only downloads the width the layout needs. Decorative by default (empty alt) because the
 * card around it already names the destination; pass `describe` for standalone images.
 */
export function ShotImage({
  id,
  sizes,
  className = "",
  eager = false,
  describe = false,
}: {
  id: ShotId;
  /** CSS `sizes`, e.g. "(min-width: 1024px) 33vw, 100vw". */
  sizes: string;
  className?: string;
  /** Above-the-fold images only. */
  eager?: boolean;
  describe?: boolean;
}) {
  const s = shot(id);
  return (
    // eslint-disable-next-line @next/next/no-img-element -- pre-sized static WebP set; no optimizer needed
    <img
      src={`${s.base}-md.webp`}
      srcSet={srcSetOf(s)}
      sizes={sizes}
      width={s.widths[1]}
      height={Math.round((s.widths[1] * 9) / 16)}
      alt={describe ? `${s.alt}. Official GTA 6 screenshot, © Rockstar Games` : ""}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
      style={s.pos ? { objectPosition: s.pos } : undefined}
    />
  );
}
