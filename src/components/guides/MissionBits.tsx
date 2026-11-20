import { Spoiler, SpoilerAll } from "./Spoiler";
import type { MissionSource } from "@/lib/guides/missions";
import { LAST_VERIFIED, LAST_VERIFIED_LABEL } from "@/lib/guides/missions";

export function SpoilerWarning({ children }: { children?: React.ReactNode }) {
  return (
    <aside className="vc-warn mb-10x flex flex-col gap-4x p-4x sm:flex-row sm:items-center sm:justify-between" role="note" aria-label="Spoiler warning">
      <div>
        <p className="vc-display text-2xl leading-none text-orange">Spoiler warning</p>
        <p className="mt-2x max-w-2xl text-sm text-ink-2">
          {children ??
            "This guide covers GTA 6 story missions. Names and one-line premises are visible. Objectives and story notes stay blurred until you reveal them."}
        </p>
      </div>
      <div className="shrink-0">
        <SpoilerAll />
      </div>
    </aside>
  );
}

export function StatusTag({ status }: { status: "confirmed" | "reported" }) {
  return status === "confirmed" ? (
    <span className="ml-2x whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-turq">Confirmed</span>
  ) : (
    <span className="ml-2x whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-orange" title="From a single walkthrough. Not yet confirmed in-game.">
      Reported
    </span>
  );
}

export interface PlainSource {
  label: string;
  url: string;
  used: string;
}

export function SourcesList({
  sources,
  verified = { iso: LAST_VERIFIED, label: `${LAST_VERIFIED_LABEL} (pre-launch)` },
  blurLinks = false,
  blurLabel = "source links (the web addresses name the mission)",
}: {
  sources: (MissionSource | PlainSource)[];
  verified?: { iso: string; label: string };
  /** Hidden-mission pages: some source URLs contain the mission name, so the link list sits behind a blur. */
  blurLinks?: boolean;
  blurLabel?: string;
}) {
  const list = (
      <ol className="mt-4x flex flex-col gap-3x text-sm">
        {sources.map((s) => (
          <li key={s.url} className="vc-bar">
            <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="text-blue hover:text-pink">
              {s.label}
            </a>
            <span className="block text-xs text-muted">{s.used}</span>
          </li>
        ))}
      </ol>
  );
  return (
    <section aria-labelledby="sources" className="mt-16x">
      <h2 id="sources" className="vc-display text-3xl text-ink">Sources</h2>
      <p className="mt-2x text-sm text-muted">
        Last verified: <time dateTime={verified.iso}>{verified.label}</time>. Wording on this page is our own. &ldquo;Reported&rdquo; means a single walkthrough says so and we have not confirmed it yet.
      </p>
      {blurLinks ? (
        <div className="mt-4x">
          <Spoiler label={blurLabel}>{list}</Spoiler>
        </div>
      ) : (
        list
      )}
    </section>
  );
}
