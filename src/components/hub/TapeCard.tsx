import Link from "next/link";
import "./hub.css";

export type HubAccent = "pink" | "orange" | "turq" | "blue";

/**
 * Tape-label card: angled corner, category strip, file number, barcode foot, hover lift + glow.
 * Reusable for any index (guides, news, ...). Wrap in an <li> inside `<ul className="gh-grid">`.
 */
export function TapeCard({
  href,
  title,
  blurb,
  tag,
  accent,
  file,
  tilt = 0,
  cta = "Open",
}: {
  href: string;
  title: string;
  blurb: string;
  tag: string;
  accent: HubAccent;
  /** Shown as "File 03". */
  file: number;
  /** -1 or 1 tilts the card slightly on md+ screens; 0 keeps it straight. */
  tilt?: -1 | 0 | 1;
  cta?: string;
}) {
  return (
    <Link href={href} className="gh-card" data-accent={accent} data-tilt={tilt}>
      <span className="gh-card__body">
        <span className="gh-card__strip">
          <span className="gh-card__tag">{tag}</span>
          <span className="gh-card__file" aria-hidden>
            File {String(file).padStart(2, "0")}
          </span>
        </span>
        <span className="vc-display gh-card__title">{title}</span>
        <span className="gh-card__blurb">{blurb}</span>
        <span className="gh-card__foot">
          <span className="gh-barcode" aria-hidden />
          <span className="gh-card__go">
            {cta} <span aria-hidden>→</span>
          </span>
        </span>
      </span>
    </Link>
  );
}
