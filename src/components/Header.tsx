import Link from "next/link";
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
    <header className="relative z-40 bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2.5">
        <Link href="/" className="group flex items-baseline gap-2" aria-label="Leonida Vice Guide home">
          <span className="vc-heading text-2xl leading-none sm:text-[28px]">Leonida</span>
          <span className="vc-display text-lg leading-none text-ink transition-colors group-hover:text-turq sm:text-xl">
            Vice Guide
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-ink-2" aria-label="Main">
          <NavLinks items={NAV} />
        </nav>
      </div>
      <div className="vc-neon-line" aria-hidden />
    </header>
  );
}
