import Image from "next/image";
import type { Character, CharSource } from "@/lib/characters/characters";
import { LAST_VERIFIED, LAST_VERIFIED_LABEL } from "@/lib/characters/characters";
import { Spoiler } from "@/components/guides/Spoiler";
import { splitSources } from "@/lib/spoiler-sources";
import { areaFor, areaSrcSet } from "@/lib/characters/areas";
import "./characters.css";

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
        title="Reported by the outlet named, not stated by Rockstar."
      >
        Reported
      </span>
    );
  }
  return (
    <span
      className="whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em] text-orange"
      title="Not stated by Rockstar, or only seen in secondary reporting."
    >
      To be confirmed
    </span>
  );
}

/**
 * Official Rockstar still when we have one, credited "© Rockstar Games".
 * Characters without an official still get a duotone official screenshot of the area they are reported in,
 * with their name on it, so the card never pretends to be a portrait (see src/lib/characters/areas.ts).
 * On cards the credit is printed once under the grid, not on every card.
 */
export function CharacterPlaceholder({
  c,
  size = "card",
}: {
  c: Pick<Character, "slug" | "initials" | "accent" | "name" | "portrait">;
  size?: "card" | "hero";
}) {
  const rgb = ACCENT[c.accent];
  const hero = size === "hero";
  if (c.portrait) {
    const img = (
      <div className="relative isolate aspect-video w-full overflow-hidden">
        <Image
          src={c.portrait.src}
          alt={c.portrait.alt}
          width={c.portrait.width}
          height={c.portrait.height}
          className="h-full w-full object-cover"
          sizes={hero ? "(min-width: 1024px) 42vw, 100vw" : "(min-width: 1024px) 370px, (min-width: 640px) 50vw, 60vw"}
          priority={hero}
        />
      </div>
    );
    if (!hero) return img;
    return (
      <figure className="w-full">
        <div className="overflow-hidden rounded-md border border-white/10">{img}</div>
        <figcaption className="mt-2x text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted">{c.portrait.credit}</figcaption>
      </figure>
    );
  }
  const a = areaFor(c.slug);
  const art = (
    <div className={`ch-duo relative isolate w-full overflow-hidden ${hero ? "aspect-[4/3]" : "aspect-video"}`} style={{ ["--duo" as string]: `rgb(${rgb})` }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized static WebP set */}
      <img
        src={`${a.base}-md.webp`}
        srcSet={areaSrcSet(a.base)}
        sizes={hero ? "(min-width: 1024px) 42vw, 100vw" : "(min-width: 1024px) 370px, (min-width: 640px) 50vw, 60vw"}
        width={800}
        height={450}
        alt={`No official still of ${c.name} yet. Official screenshot of ${a.scene} instead`}
        loading={hero ? "eager" : "lazy"}
        decoding="async"
        className="ch-duo__img absolute inset-0 h-full w-full object-cover"
        style={a.pos ? { objectPosition: a.pos } : undefined}
      />
      <span className="ch-duo__tint" aria-hidden />
      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4x">
        <span aria-hidden className={`vc-display leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] ${hero ? "text-5xl" : "text-3xl"}`}>
          {c.name}
        </span>
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/80">
          No official still yet{a.area ? ` · Area: ${a.area}` : ""}
        </span>
      </span>
    </div>
  );
  if (!hero) return art;
  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-md border border-white/10">{art}</div>
      <figcaption className="mt-2x text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted">Area screenshot © Rockstar Games, not a portrait</figcaption>
    </figure>
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
