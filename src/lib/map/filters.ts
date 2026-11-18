import { PIN_TYPES, REGIONS, type PinType } from "./config";

/** Filter state that lives in the URL (/map?types=shop,landmark&official=1&region=vice-city&pin=seed-ocean-beach). */
export interface InitialFilters {
  q: string;
  types: PinType[] | null;
  official: boolean;
  region: string | null;
  spoilers: boolean;
  pin: string | null;
}

export const NO_FILTERS: InitialFilters = { q: "", types: null, official: false, region: null, spoilers: false, pin: null };

export const regionSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");
const regionFromSlug = (v: string | null) => REGIONS.find((r) => regionSlug(r) === v) ?? null;

/** Parses /map search params (server and client share this). Unknown values are ignored. */
export function parseFilters(sp: Record<string, string | string[] | undefined>): InitialFilters {
  const one = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : null);
  const types = (one("types") ?? "")
    .split(",")
    .filter((t): t is PinType => t in PIN_TYPES);
  return {
    q: (one("q") ?? "").slice(0, 80),
    types: types.length ? types : null,
    official: one("official") === "1",
    region: regionFromSlug(one("region")),
    spoilers: one("spoilers") === "1",
    pin: (one("pin") ?? "").slice(0, 64).replace(/[^A-Za-z0-9_-]/g, "") || null,
  };
}
