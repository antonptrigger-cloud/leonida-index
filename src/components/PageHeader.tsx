export function PageHeader({
  kicker,
  title,
  source = "Showcase",
}: {
  kicker?: string;
  title: string;
  source?: string;
}) {
  return (
    <div className="mb-10x">
      {kicker ? <p className="vc-kicker mb-4x">{kicker}</p> : null}
      <h1 className="vc-heading text-[clamp(3.5rem,10vw,6.5rem)]">{title}</h1>
      <div className="mt-6x flex items-center gap-4x">
        <span className="vc-neon-line w-16 shrink-0" aria-hidden />
        <p className="text-xs text-muted">
          Last verified: pre-launch · Source: {source}
        </p>
      </div>
    </div>
  );
}
