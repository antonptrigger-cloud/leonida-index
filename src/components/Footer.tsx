import Link from "next/link";
import { Palm } from "@/components/Palm";

export function Footer() {
  return (
    <footer className="relative isolate mt-16 overflow-hidden text-xs text-muted">
      <div className="vc-neon-line" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 120% at 50% 130%, rgba(255,107,53,0.18), transparent 60%), linear-gradient(180deg, #0a0a0b, #120a14)",
        }}
        aria-hidden
      />
      <Palm className="pointer-events-none absolute -bottom-2 left-2 h-28 w-auto text-[#1a0f1c] sm:left-8 sm:h-36" />
      <Palm flip className="pointer-events-none absolute -bottom-3 right-2 h-24 w-auto text-[#1a0f1c] sm:right-10 sm:h-32" />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="vc-heading text-xl">Leonida Vice Guide</p>
          <p className="mt-1 max-w-md leading-relaxed">
            Fan site. Not affiliated with Rockstar Games or Take-Two Interactive.
            Grand Theft Auto is a trademark of Take-Two.
          </p>
        </div>
        <p className="flex gap-4 text-sm text-ink-2">
          <Link href="/sources" className="hover:text-pink-2">Sources</Link>
          <Link href="/about" className="hover:text-pink-2">About</Link>
          <Link href="/map/leaderboard" className="hover:text-pink-2">Leaderboard</Link>
        </p>
      </div>
    </footer>
  );
}
