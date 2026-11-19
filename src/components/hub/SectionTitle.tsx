import "./hub.css";

/** Numbered section heading ("01 / kicker / big title") shared by the hub-style index pages (/guides, /news). */
export function SectionTitle({ id, num, kicker, title, children }: { id: string; num: string; kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-10x flex flex-col gap-4x md:flex-row md:items-end md:justify-between">
      <div className="vc-section-title">
        <span data-num aria-hidden>
          {num}
        </span>
        <div>
          <p className="vc-kicker">{kicker}</p>
          <h2 id={id} className="vc-heading mt-2x text-[clamp(2.6rem,6.5vw,4.75rem)]">{title}</h2>
        </div>
      </div>
      {children ? <p className="max-w-[34ch] text-sm leading-relaxed text-muted md:text-right">{children}</p> : null}
    </div>
  );
}
