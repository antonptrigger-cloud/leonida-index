/**
 * Vendor / shop / service categories ("what kind of place is it?"). Independent of the pin *type*: a pin keeps its type
 * (shop, property, landmark ...) and may carry one optional category. Stored in `pins.category`
 * (supabase/migrations/20261119000500_pin_categories.sql); the app works without that column (see store/supabase.ts).
 *
 * Icons are our own simple 24x24 glyphs (see CATEGORY_GLYPHS in components/map/glyphs.ts).
 */
export const CATEGORY_IDS = [
  "gas",
  "convenience",
  "clothing",
  "weapons",
  "barber-tattoo",
  "vehicles",
  "market",
  "bank",
  "services",
  "bar-club",
  "transport",
  "safehouse",
] as const;
export type PinCategory = (typeof CATEGORY_IDS)[number];

export interface CategoryInfo {
  label: string;
  /** Short label for chips and marker tooltips. */
  short: string;
  group: CategoryGroupId;
  /** Extra search words (the search box also matches the label). */
  keywords: string[];
}

export type CategoryGroupId = "shops" | "money" | "going-out" | "getting-around" | "stay";

export const CATEGORY_GROUPS: { id: CategoryGroupId; label: string }[] = [
  { id: "shops", label: "Shops & vendors" },
  { id: "money", label: "Money & services" },
  { id: "going-out", label: "Going out" },
  { id: "getting-around", label: "Getting around" },
  { id: "stay", label: "Places to stay & store" },
];

export const CATEGORIES: Record<PinCategory, CategoryInfo> = {
  gas: { label: "Gas stations", short: "Gas", group: "shops", keywords: ["fuel", "petrol", "pump"] },
  convenience: { label: "Convenience & supermarkets", short: "Convenience", group: "shops", keywords: ["store", "supermarket", "grocery", "liquor", "24/7"] },
  clothing: { label: "Clothing & fashion", short: "Clothing", group: "shops", keywords: ["clothes", "outfit", "streetwear", "apparel", "boutique"] },
  weapons: { label: "Weapons", short: "Weapons", group: "shops", keywords: ["guns", "ammo", "ammunition", "firearms", "gun shop"] },
  "barber-tattoo": { label: "Barber, salon & tattoo", short: "Barber / tattoo", group: "shops", keywords: ["barber", "salon", "hair", "tattoo", "ink", "nails"] },
  vehicles: { label: "Vehicles, dealers & mod shops", short: "Vehicles", group: "shops", keywords: ["car", "dealer", "dealership", "mod shop", "garage", "customs", "boat"] },
  market: { label: "Markets & illegal goods", short: "Markets", group: "shops", keywords: ["flea market", "bootleg", "black market", "contraband", "fence", "illegal"] },
  bank: { label: "Banks & ATMs", short: "Banks", group: "money", keywords: ["atm", "cash", "money", "lombank"] },
  services: { label: "Services (police, hospital)", short: "Services", group: "money", keywords: ["police", "hospital", "fire", "emergency", "government"] },
  "bar-club": { label: "Bars & nightclubs", short: "Bars / clubs", group: "going-out", keywords: ["bar", "club", "nightclub", "pub", "drink", "lounge"] },
  transport: { label: "Transport", short: "Transport", group: "getting-around", keywords: ["airport", "marina", "dock", "port", "station", "bus", "train", "ferry"] },
  safehouse: { label: "Safehouses & properties", short: "Safehouses", group: "stay", keywords: ["safehouse", "property", "apartment", "garage", "hideout", "house"] },
};

export const isCategory = (v: unknown): v is PinCategory => typeof v === "string" && (CATEGORY_IDS as readonly string[]).includes(v);

export const categoryLabel = (c: PinCategory | null | undefined) => (c ? CATEGORIES[c].label : "");

/** Text the search box matches for a category (label plus keywords). */
export const categorySearchText = (c: PinCategory | null | undefined) => (c ? `${CATEGORIES[c].label} ${CATEGORIES[c].keywords.join(" ")}`.toLowerCase() : "");
