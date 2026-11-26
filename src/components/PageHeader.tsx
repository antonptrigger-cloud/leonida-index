import { PageBackdrop, type BackdropId, type Dim } from "@/components/PageBackdrop";
import { ShareButtons } from "@/components/ShareButtons";

/** Pick a backdrop for headers that do not set one, so formerly black pages get a hero. */
function defaultBackdrop(kicker?: string): BackdropId | undefined {
  const k = (kicker ?? "").toLowerCase();
  if (k.includes("moderation")) return undefined;
  if (k.includes("region") || k.includes("community")) return "marina";
  if (k.includes("character") || k.includes("database") || k.includes("cast")) return "marina";
  if (k.includes("tool") || k.includes("about")) return "beach";
  if (k.includes("secret")) return "pier";
  return "skyline";
}

export function PageHeader({
  kicker,
  title,
  source = "Showcase",
  verified = "after launch",
  backdrop,
  dim = "medium",
  share = true,
}: {
  kicker?: string;
  title: string;
  source?: string;
  verified?: string;
  /** Optional dimmed decorative background behind the heading (see PageBackdrop). */
  backdrop?: BackdropId;
  dim?: Dim;
  /** Share buttons (X, Reddit, copy link). Off on private pages. */
  share?: boolean;
}) {
  const bg = backdrop ?? defaultBackdrop(kicker);
  const showShare = share && !((kicker ?? "").toLowerCase().includes("moderation"));

  if (!bg) {
    return (
      <div className="mb-6x sm:mb-10x">
        {kicker ? <p className="vc-kicker mb-2x sm:mb-4x">{kicker}</p> : null}
        <h1 className="vc-heading text-[clamp(2.15rem,9vw,3.4rem)] leading-[0.92] sm:text-[clamp(3.5rem,10vw,6.5rem)]">{title}</h1>
        <div className="mt-3x flex items-center gap-4x sm:mt-6x">
          <span className="vc-neon-line w-16 shrink-0" aria-hidden />
          <p className="text-xs text-muted">
            Last verified: {verified} · Source: {source}
          </p>
        </div>
        {showShare ? <ShareButtons title={`${title} | Leonida Vice Guide`} /> : null}
      </div>
    );
  }
  return (
    <div className="relative isolate mb-6x pb-8x pt-5x sm:mb-10x sm:pb-16x sm:pt-10x">
      <PageBackdrop id={bg} dim={dim} fadeTop />
      {kicker ? <p className="vc-kicker mb-2x sm:mb-4x">{kicker}</p> : null}
      <h1 className="vc-heading text-[clamp(2.15rem,9vw,3.4rem)] leading-[0.92] sm:text-[clamp(3.5rem,10vw,6.5rem)]">{title}</h1>
      <div className="mt-3x flex flex-wrap items-center gap-4x sm:mt-6x">
        <span className="vc-neon-line w-16 shrink-0" aria-hidden />
        <p className="text-xs text-ink-2">
          Last verified: {verified} · Source: {source}
        </p>
      </div>
      {showShare ? <ShareButtons title={`${title} | Leonida Vice Guide`} /> : null}
    </div>
  );
}
