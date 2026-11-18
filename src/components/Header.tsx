import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import { NavLinks, type NavItem } from "@/components/NavLinks";

const NAV: NavItem[] = [
  { href: "/map", label: "Map" },
  { href: "/guides", label: "Guides" },
  { href: "/database/characters", label: "Database", match: "/database" },
  { href: "/tools/edition-compare", label: "Tools", match: "/tools" },
  { href: "/news", label: "News" },
  { href: "/secrets", label: "Secrets" },
];

export function Header() {
  return (
    <header className="relative z-40 bg-[rgba(10,10,11,0.86)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-10x gap-y-2x px-4x py-3x sm:px-gutter">
        <Link href="/" className="group flex shrink-0 items-center gap-3x" aria-label="Leonida Vice Guide home">
          <LogoMark className="h-9 w-auto drop-shadow-[0_0_10px_rgba(255,45,120,0.45)] transition-transform duration-300 group-hover:-rotate-3 sm:h-10" />
          <span className="flex flex-col leading-none">
            <span className="vc-display text-[1.9rem] leading-[0.8] tracking-[0.01em] text-ink sm:text-[2.15rem]">Leonida</span>
            <span className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.42em] text-pink-2">Vice Guide</span>
          </span>
        </Link>
        <nav
          className="flex w-full flex-wrap items-center justify-between gap-x-3x gap-y-1x sm:w-auto sm:flex-1 sm:justify-end sm:gap-6x"
          aria-label="Main"
        >
          <NavLinks items={NAV} />
        </nav>
        <span className="hidden items-center gap-2x border-l border-pink/30 pl-6x text-[0.65rem] font-bold uppercase tracking-[0.3em] text-turq lg:flex">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-turq shadow-[0_0_8px_#00e5cc]" />
          Launch 19.11.26
        </span>
      </div>
      <div className="vc-neon-line" aria-hidden />
    </header>
  );
}
