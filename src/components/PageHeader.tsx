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
    <div className="mb-8">
      {kicker ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-turq">{kicker}</p>
      ) : null}
      <h1 className="vc-heading text-5xl sm:text-6xl">{title}</h1>
      <p className="mt-3 text-xs text-muted">
        Last verified: pre-launch · Source: {source}
      </p>
    </div>
  );
}
