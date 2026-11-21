import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import { Palm } from "@/components/Palm";

export function Footer() {
  return (
    <footer className="relative isolate mt-16x overflow-hidden text-xs text-muted">
      <div className="vc-neon-line" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 140% at 50% 140%, rgba(255,107,53,0.28), transparent 60%), linear-gradient(180deg, rgba(10,10,11,0.4), #150a17)",
        }}
        aria-hidden
      />
      <p
        className="vc-outline vc-outline--faint pointer-events-none absolute -bottom-[0.18em] left-1/2 -z-10 -translate-x-1/2 select-none whitespace-nowrap text-[clamp(6rem,22vw,17rem)] leading-none"
        aria-hidden
      >
        Leonida
      </p>
      <Palm className="pointer-events-none absolute -bottom-2 left-0 -z-10 h-32 w-auto text-[#05030a] sm:left-6x sm:h-48" />
      <Palm flip className="pointer-events-none absolute -bottom-3 right-0 -z-10 h-28 w-auto text-[#05030a] sm:right-10x sm:h-40" />
      <div className="relative mx-auto grid max-w-6xl gap-10x px-4x pb-16x pt-10x sm:grid-cols-12 sm:px-gutter">
        <div className="sm:col-span-7">
          <div className="flex items-center gap-3x">
            <LogoMark className="h-8 w-auto" />
            <span className="vc-display text-[1.9rem] leading-none text-ink">Leonida Vice Guide</span>
          </div>
          <p className="mt-4x max-w-md leading-relaxed">
            Fan site. Not affiliated with Rockstar Games or Take-Two Interactive.
            Grand Theft Auto is a trademark of Take-Two.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6x gap-y-2x sm:col-span-5 sm:justify-end" aria-label="Footer">
          {[
            ["/guides/missions", "Walkthrough"],
            ["/guides", "Guides"],
            ["/news", "News"],
            ["/database", "Database"],
            ["/map", "Map"],
            ["/map/leaderboard", "Leaderboard"],
            ["/sources", "Sources"],
            ["/about", "About"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="vc-display text-lg tracking-[0.08em] text-ink-2 transition-colors hover:text-pink-2">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
