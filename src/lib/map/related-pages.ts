/**
 * Static pin → article links for the map pin drawer.
 * Seed and official pins only; no database writes. Keep labels spoiler-light.
 */

export interface PinPageLink {
  href: string;
  label: string;
}

const STRIP_CLUBS: PinPageLink[] = [
  { href: "/guides/strip-clubs", label: "Strip clubs guide: prices and private dances" },
  { href: "/secrets/strip-clubs", label: "Strip club secrets" },
];

const SECRET_VEHICLES: PinPageLink[] = [
  { href: "/guides/secret-vehicles", label: "Secret vehicles guide" },
  { href: "/secrets/hidden-locations", label: "Hidden locations" },
];

const PIN_PAGES: Record<string, PinPageLink[]> = {
  "gtadb-L190": STRIP_CLUBS,
  "seed-delights-cabaret": STRIP_CLUBS,
  "seed-jack-of-hearts": STRIP_CLUBS,
  "seed-mile-zero-air-station": SECRET_VEHICLES,
  "seed-wild-hog-point": [{ href: "/guides/secret-vehicles", label: "Secret vehicles guide" }],
  "seed-belville-ufo-house": [{ href: "/secrets/ufo", label: "UFO house secret" }],
  "seed-salton-chop-shop": [{ href: "/database/characters/raul-bautista", label: "Raul Bautista" }],
  "seed-bayside": [
    { href: "/secrets/hidden-locations", label: "Hidden locations (Boobie's laptop)" },
    { href: "/database/characters/boobie-ike", label: "Boobie Ike" },
  ],
  "seed-grassrivers": [
    { href: "/secrets/skunk-ape", label: "Skunk Ape (Bigfoot)" },
    { href: "/guides/bigfoot-skunk-ape", label: "Full Bigfoot guide" },
  ],
  "seed-pelican-valley": [
    { href: "/secrets/skunk-ape", label: "Skunk Ape (Bigfoot)" },
    { href: "/guides/bigfoot-skunk-ape", label: "Full Bigfoot guide" },
  ],
};

const SEARCH_PAGES: { match: RegExp; links: PinPageLink[] }[] = [
  { match: /gullet\s*marsh/i, links: [{ href: "/secrets/skunk-ape", label: "Skunk Ape (Bigfoot)" }, { href: "/guides/bigfoot-skunk-ape", label: "Full Bigfoot guide" }] },
  { match: /mile\s*zero/i, links: SECRET_VEHICLES },
  { match: /nine\s*1\s*nine|nine1nine/i, links: STRIP_CLUBS },
];

export function relatedPagesForPin(id: string): PinPageLink[] {
  return PIN_PAGES[id] ?? [];
}

export function relatedPagesForSearch(name: string): PinPageLink[] {
  const hit = SEARCH_PAGES.find((s) => s.match.test(name));
  return hit ? hit.links : [];
}
