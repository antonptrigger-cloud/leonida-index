import type { Character, CharSource } from "@/lib/characters/characters";
import { LAST_VERIFIED, LAST_VERIFIED_LABEL } from "@/lib/characters/characters";
import { Spoiler } from "@/components/guides/Spoiler";
import { splitSources } from "@/lib/spoiler-sources";

const ACCENT: Record<Character["accent"], string> = {
  pink: "255,45,120",
  blue: "0,212,255",
  orange: "255,140,66",
  turq: "0,229,204",
};

/** Confirmed (Rockstar or the person says so, or two main outlets agree), Reported (credible outlets, no official statement) or To be confirmed (nothing solid yet). */
export function ConfirmTag({ status }: { status: "confirmed" | "tbc" | "reported" }) {
  if (status === "confirmed") {
    return (
      <span
        className="whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-turq"
        title="Stated by Rockstar or the person involved, or given the same way by two main outlets."
      >
        Confirmed
      </span>
    );
  }
  if (status === "reported") {
    return (
      <span
        className="whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-blue"
        title="Reported by the outlet named, not stated by Rockstar. We recheck after launch."
      >
        Reported
      </span>
    );
  }
  return (
    <span
      className="whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-orange"
      title="Not stated by Rockstar yet, or only seen in secondary reporting. We recheck after launch."
    >
      To be confirmed
    </span>
  );
}

/**
 * Text-and-gradient stand-in for a portrait. We do not use Rockstar's images:
 * the owner has not decided on image licensing yet.
 */
export function CharacterPlaceholder({ c, size = "card" }: { c: Pick<Character, "initials" | "accent" | "name">; size?: "card" | "hero" }) {
  const rgb = ACCENT[c.accent];
  return (
    <div
      className={`relative isolate flex items-end overflow-hidden border border-pink/25 ${size === "hero" ? "aspect-[4/5] w-full" : "aspect-[4/3] w-full"}`}
      style={{
        background: `radial-gradient(120% 90% at 20% 0%, rgba(${rgb},0.38), transparent 60%), linear-gradient(160deg, #1d1030 0%, #0f0d13 70%)`,
      }}
      role="img"
      aria-label={`${c.name}: portrait placeholder`}
    >
      <span
        aria-hidden
        className="vc-display pointer-events-none absolute -right-2 -top-4 select-none text-[9rem] leading-none sm:text-[11rem]"
        style={{ color: `rgba(${rgb},0.16)` }}
      >
        {c.initials}
      </span>
      <span className="vc-neon-line absolute inset-x-0 bottom-0 h-px" aria-hidden />
      <span className="relative m-4x text-[0.6rem] font-bold uppercase tracking-[0.28em] text-muted">Portrait coming soon</span>
    </div>
  );
}

export function CharSources({ sources, verified }: { sources: CharSource[]; verified?: { iso: string; label: string; note: string } }) {
  return (
    <section aria-labelledby="sources" className="mt-16x">
      <h2 id="sources" className="vc-display text-3xl text-ink">Sources</h2>
      <p className="mt-2x text-sm text-muted">
        Last verified: <time dateTime={verified?.iso ?? LAST_VERIFIED}>{verified?.label ?? LAST_VERIFIED_LABEL}</time> ({verified?.note ?? "launch eve"}). Wording on this page is our own. Rockstar&apos;s pages are the primary source. Anything from elsewhere is marked Reported or To be confirmed, and plot details stay in the blurred section.
      </p>
      <SourceList sources={sources} />
    </section>
  );
}

type ListedSource = { url: string; label: string; used: string; primary?: boolean };

function SourceItems({ sources }: { sources: ListedSource[] }) {
  return (
    <ol className="mt-4x flex flex-col gap-3x text-sm">
      {sources.map((s) => (
        <li key={s.url} className="vc-bar">
          <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="text-blue hover:text-pink">
            {s.label}
          </a>
          <span className="block text-xs text-muted">
            {s.primary ? "Primary \u00b7 " : "Secondary \u00b7 "}
            {s.used}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Source list. Sources whose title or address names a Chapter 2+ story mission or story place sit behind a blur. */
export function SourceList({ sources }: { sources: ListedSource[] }) {
  const { open, hidden } = splitSources(sources);
  return (
    <>
      <SourceItems sources={open} />
      {hidden.length > 0 ? (
        <div className="mt-4x">
          <Spoiler label="more sources (the titles name story missions)">
            <SourceItems sources={hidden} />
          </Spoiler>
        </div>
      ) : null}
    </>
  );
}
