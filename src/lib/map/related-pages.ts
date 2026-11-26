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

const BANK_JOBS: PinPageLink[] = [
  { href: "/guides/bank-robbery", label: "Bank robbery guide: all 22 banks, vaults and getaways" },
  { href: "/guides/wanted", label: "Wanted system: losing the cops" },
];

/** Every bank pin from the bank robbery guide (src/lib/guides/bank-robbery.ts). */
const BANK_PIN_IDS = [
  "seed-bank-01-fleeca-key-lento",
  "seed-bank-02-shorefront-watson-bay",
  "seed-bank-03-gibson-brothers-capri",
  "seed-bank-04-lombank-peacock-bay",
  "seed-bank-05-fleeca-peacock-bay",
  "seed-bank-06-shorefront-downtown",
  "seed-bank-07-shorefront-rockridge",
  "gtadb-L1786",
  "seed-bank-10-lombank-ocean-beach",
  "seed-bank-11-fleeca-ocean-beach",
  "seed-bank-12-shorefront-ocean-beach",
  "seed-bank-13-druthers-belville",
  "seed-bank-14-shorefront-ambrosia",
  "seed-bank-15-fleeca-vcia",
  "seed-bank-16-fleeca-tequesta",
  "seed-bank-17-lombank-downtown",
  "seed-bank-18-fleeca-downtown",
  "seed-bank-19-lombank-ocean-beach",
  "seed-bank-20-fleeca-ocean-beach",
  "seed-bank-21-lombank-ocean-beach",
  "seed-bank-22-shorefront-ocean-beach",
];

const PIN_PAGES: Record<string, PinPageLink[]> = {
  ...Object.fromEntries(BANK_PIN_IDS.map((id) => [id, BANK_JOBS])),
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
  { match: /\b(fleeca(?!\s*field)|lombank|shorefront|gibson brothers bank|druthers state bank|bank job|bank vault)\b/i, links: BANK_JOBS },
];

export function relatedPagesForPin(id: string): PinPageLink[] {
  return PIN_PAGES[id] ?? [];
}

export function relatedPagesForSearch(name: string): PinPageLink[] {
  const hit = SEARCH_PAGES.find((s) => s.match.test(name));
  return hit ? hit.links : [];
}
