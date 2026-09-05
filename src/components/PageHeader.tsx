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
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#ffd36b]">{kicker}</p>
      ) : null}
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-xs text-[#9a958c]">
        Last verified: pre-launch · Source: {source}
      </p>
    </div>
  );
}
