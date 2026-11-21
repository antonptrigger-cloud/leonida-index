import { isBaseId, type BaseId } from "./bases";
import { isCategory, type PinCategory } from "./categories";
import { PIN_TYPES, REGIONS, type PinType } from "./config";

/** Filter state that lives in the URL (/map?types=shop,landmark&official=1&region=vice-city&pin=seed-ocean-beach&place=olabel-downtown). */
export interface InitialFilters {
  q: string;
  types: PinType[] | null;
  /** Vendor categories (?cats=gas,clothing). Empty = no category filter. */
  cats: PinCategory[];
  official: boolean;
  region: string | null;
  spoilers: boolean;
  pin: string | null;
  /** A map label with no pin yet (/map?place=olabel-downtown). Temporary marker only; never saved. */
  place: string | null;
  /** null = the default base (art). `?base=legacy` shows the old placeholder map. */
  base: BaseId | null;
}

export const NO_FILTERS: InitialFilters = { q: "", types: null, cats: [], official: false, region: null, spoilers: false, pin: null, place: null, base: null };

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
    cats: (one("cats") ?? "").split(",").filter(isCategory),
    official: one("official") === "1",
    region: regionFromSlug(one("region")),
    spoilers: one("spoilers") === "1",
    pin: (one("pin") ?? "").slice(0, 64).replace(/[^A-Za-z0-9_-]/g, "") || null,
    place: (one("place") ?? "").slice(0, 64).replace(/[^A-Za-z0-9_-]/g, "") || null,
    base: isBaseId(one("base")) ? (one("base") as BaseId) : null,
  };
}
