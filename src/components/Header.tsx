import Link from "next/link";

const NAV = [
  { href: "/map", label: "Map" },
  { href: "/guides", label: "Guides" },
  { href: "/database/characters", label: "Database" },
  { href: "/tools/edition-compare", label: "Tools" },
  { href: "/news", label: "News" },
  { href: "/secrets", label: "Secrets" },
];

export function Header() {
  return (
    <header className="border-b border-[#2a2a2e] bg-[#0b0b0c]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-sm font-semibold tracking-wide text-[#f4f1ea] hover:text-[#ff2d7b]">
          Leonida Vice Guide
        </Link>
        <nav className="flex flex-wrap items-center gap-3 text-sm text-[#9a958c]">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[#ff2d7b]">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}