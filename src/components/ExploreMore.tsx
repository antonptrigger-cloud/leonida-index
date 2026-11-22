"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const FALLBACK: { href: string; label: string; title: string; blurb: string }[] = [
  { href: "/map", label: "Map", title: "Open the Leonida map", blurb: "Six regions, official landmarks and community pins." },
  { href: "/guides", label: "Guides", title: "GTA 6 guides", blurb: "Beginner tips, money, missions and systems." },
  { href: "/news", label: "News", title: "Latest GTA 6 news", blurb: "What is confirmed, and what just changed." },
  { href: "/database", label: "Database", title: "Characters and reference", blurb: "Profiles, vehicles, weapons and radio." },
  { href: "/secrets", label: "Secrets", title: "Easter eggs", blurb: "Community finds, kept spoiler-safe." },
  { href: "/guides/money", label: "Guide", title: "Make money", blurb: "How to fill your pockets in Leonida." },
];

const EXACT = new Set([
  "/guides",
  "/news",
  "/database",
  "/database/characters",
  "/secrets",
  "/about",
  "/sources",
  "/map/leaderboard",
]);

function allowed(path: string) {
  if (EXACT.has(path)) return true;
  if (path === "/map" || path === "/map/admin") return false;
  return /^\/map\/[a-z0-9-]+$/.test(path);
}

/**
 * Related-style links at the end of hub, region and other pages that do not already
 * render <Related>. Kept as a small client island so we do not pull the related index
 * into the client bundle, and so we do not have to edit content files.
 */
export function ExploreMore() {
  const path = usePathname() ?? "";
  if (!allowed(path)) return null;
  const items = FALLBACK.filter((i) => i.href !== path).slice(0, 4);
  if (!items.length) return null;
  return (
    <section aria-labelledby="explore-more" className="mt-16x border-t border-pink/20 pt-8x">
      <h2 id="explore-more" className="vc-display text-3xl text-ink">
        Keep exploring
      </h2>
      <ul className="mt-6x grid gap-4x sm:grid-cols-2 lg:grid-cols-4">
        {items.map((r) => (
          <li key={r.href}>
            <Link href={r.href} className="vc-card group block h-full p-4x">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">{r.label}</span>
              <span className="vc-display mt-1x block text-2xl leading-tight text-ink group-hover:text-pink">{r.title}</span>
              <span className="mt-2x block text-sm text-ink-2">{r.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
