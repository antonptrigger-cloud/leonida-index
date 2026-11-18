"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = { href: string; label: string; match?: string };

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname() ?? "/";
  return (
    <>
      {items.map((item) => {
        const base = item.match ?? item.href;
        const active = pathname === base || pathname.startsWith(`${base}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className="vc-nav-link py-1"
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
