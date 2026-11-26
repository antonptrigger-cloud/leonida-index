import Link from "next/link";
import { ShotImage } from "@/components/media/ShotImage";
import { shotForHref, SHOT_CREDIT, type ShotId } from "@/lib/media/shots";
import "./media-card.css";

export interface MediaCardItem {
  href: string;
  title: string;
  /** Small label above the title, e.g. "Guide" or "News · Sales". */
  kicker?: string;
  blurb?: string;
  /** Card art; defaults to the picture for the link's section. */
  shot?: ShotId;
}

/**
 * The one card used across hubs and "Related" blocks: official screenshot on top, then kicker, title and a
 * short line. Whole card is the link. `feature` makes a larger card (taller image, bigger title).
 */
export function MediaCard({
  item,
  sizes = "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 60vw",
  feature = false,
  eager = false,
  headingLevel = 3,
}: {
  item: MediaCardItem;
  sizes?: string;
  feature?: boolean;
  /** Above-the-fold LCP card only: load eagerly with high fetch priority. */
  eager?: boolean;
  headingLevel?: 2 | 3 | 4;
}) {
  const H = `h${headingLevel}` as "h2" | "h3" | "h4";
  return (
    <Link href={item.href} className="mc-card group" data-feature={feature || undefined}>
      <div className="mc-card__media">
        <ShotImage id={item.shot ?? shotForHref(item.href)} sizes={sizes} eager={eager} />
      </div>
      <div className="mc-card__body">
        {item.kicker ? <span className="mc-card__kicker">{item.kicker}</span> : null}
        <H className="mc-card__title">{item.title}</H>
        {item.blurb ? <p className="mc-card__blurb">{item.blurb}</p> : null}
      </div>
    </Link>
  );
}

/** Compact row: small thumbnail beside the text. For side lists next to a feature card. */
export function MediaRow({ item, headingLevel = 3 }: { item: MediaCardItem; headingLevel?: 2 | 3 | 4 }) {
  const H = `h${headingLevel}` as "h2" | "h3" | "h4";
  return (
    <Link href={item.href} className="mc-row group">
      <div className="mc-row__media">
        <ShotImage id={item.shot ?? shotForHref(item.href)} sizes="128px" />
      </div>
      <div className="mc-row__body">
        {item.kicker ? <span className="mc-card__kicker">{item.kicker}</span> : null}
        <H className="mc-row__title">{item.title}</H>
        {item.blurb ? <p className="mc-row__blurb">{item.blurb}</p> : null}
      </div>
    </Link>
  );
}

/**
 * Responsive grid of MediaCards with one shared credit line. `cols` is the desktop column count; the grid
 * drops to 2 then 1 column on smaller screens.
 */
export function MediaGrid({
  items,
  cols = 3,
  headingLevel = 3,
  credit = true,
  className = "",
}: {
  items: MediaCardItem[];
  cols?: 2 | 3 | 4;
  headingLevel?: 2 | 3 | 4;
  credit?: boolean;
  className?: string;
}) {
  if (!items.length) return null;
  const sizes =
    cols === 4
      ? "(min-width: 1024px) 270px, (min-width: 640px) 50vw, 60vw"
      : cols === 3
        ? "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 60vw"
        : "(min-width: 640px) 50vw, 60vw";
  return (
    <div className={className}>
      <ul className="mc-grid" data-cols={cols}>
        {items.map((it, i) => (
          // A lone card on the last row is laid out wide (picture beside the text) so no row looks unfinished.
          <li
            key={it.href}
            data-lone-sm={i === items.length - 1 && items.length % 2 === 1 && items.length > 1 ? "" : undefined}
            data-lone-lg={i === items.length - 1 && items.length % cols === 1 && items.length > 1 ? "" : undefined}
          >
            <MediaCard item={it} sizes={sizes} headingLevel={headingLevel} />
          </li>
        ))}
      </ul>
      {credit ? <p className="mc-credit">Screenshots {SHOT_CREDIT}</p> : null}
    </div>
  );
}
