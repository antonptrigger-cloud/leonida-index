import { CATEGORIES, categorySearchText } from "./categories";
import { typeSingular } from "./config";
import { LABELS, OFFICIAL_LABELS, labelsFor, type LabelKind, type MapLabel } from "./labels";
import type { BaseId } from "./bases";
import type { PublicPin } from "./types";

/** How many hits the search dropdown shows. The full count is still reported. */
export const SEARCH_RESULT_LIMIT = 12;

export const LABEL_KIND_LABEL: Record<LabelKind, string> = {
  region: "Region",
  county: "County",
  district: "District",
  city: "City",
  place: "Place",
  water: "Water",
  island: "Island",
};

/** Temporary, client-only marker dropped when a searched label has no pin yet. */
export interface SearchMarker {
  /** Label id, used in /map?place=<id>. */
  id: string;
  name: string;
  kindLabel: string;
  x: number;
  y: number;
}

export type SearchHit = {
  /** Pin id, or `label:<label.id>` for a region/district with no pin yet. */
  id: string;
  name: string;
  subtitle: string;
  x: number;
  y: number;
} & ({ kind: "pin"; pin: PublicPin } | { kind: "label"; labelKind: LabelKind });

/**
 * Labels for the current base, plus names that only exist in the other set (still in pin space).
 * A name that appears in both uses the current base's coordinates.
 */
export function searchableLabels(baseId: BaseId): MapLabel[] {
  const primary = labelsFor(baseId);
  const other = baseId === "official" ? LABELS : OFFICIAL_LABELS;
  const seen = new Set(primary.map((l) => l.name.toLowerCase()));
  return [...primary, ...other.filter((l) => !seen.has(l.name.toLowerCase()))];
}

function nameScore(q: string, name: string, isPin: boolean): number | null {
  const n = name.toLowerCase();
  const bonus = isPin ? 0 : 1;
  if (n === q) return bonus;
  if (n.startsWith(q)) return 2 + bonus;
  if (n.split(/[^a-z0-9]+/).some((w) => w.startsWith(q))) return 4 + bonus;
  if (n.includes(q)) return 6 + bonus;
  return null;
}

function pinScore(q: string, p: PublicPin): number | null {
  const byName = nameScore(q, p.name, true);
  if (byName != null) return byName;
  const extras = [p.description, p.region ?? "", p.occupant ?? "", p.gamerTag, categorySearchText(p.category)];
  return extras.some((v) => v.toLowerCase().includes(q)) ? 10 : null;
}

function pinSubtitle(p: PublicPin): string {
  const type = p.category ? CATEGORIES[p.category].short : typeSingular(p.type);
  const bits = [type];
  if (p.region && p.type !== "region") bits.push(p.region);
  if (p.source === "official") bits.push("official");
  else if (p.approximate) bits.push("approx.");
  return bits.join(" · ");
}

function labelSubtitle(l: MapLabel): string {
  return l.approximate ? `${LABEL_KIND_LABEL[l.kind]} · approx.` : LABEL_KIND_LABEL[l.kind];
}

export function searchLocations(q: string, pins: PublicPin[], baseId: BaseId): { hits: SearchHit[]; total: number } {
  const query = q.trim().toLowerCase();
  if (!query) return { hits: [], total: 0 };

  const scored: { score: number; hit: SearchHit }[] = [];
  const pinIds = new Set(pins.map((p) => p.id));
  const pinNames = new Set(pins.map((p) => p.name.toLowerCase()));

  for (const p of pins) {
    const score = pinScore(query, p);
    if (score == null) continue;
    scored.push({
      score,
      hit: { kind: "pin", id: p.id, name: p.name, subtitle: pinSubtitle(p), x: p.x, y: p.y, pin: p },
    });
  }

  for (const l of searchableLabels(baseId)) {
    // A label that already has a pin (same name, or an anchor pin) is reached through the pin.
    if ((l.anchor && pinIds.has(l.anchor)) || pinNames.has(l.name.toLowerCase())) continue;
    const score = nameScore(query, l.name, false);
    if (score == null) continue;
    scored.push({
      score,
      hit: { kind: "label", id: `label:${l.id}`, name: l.name, subtitle: labelSubtitle(l), x: l.x, y: l.y, labelKind: l.kind },
    });
  }

  scored.sort((a, b) => a.score - b.score || a.hit.name.localeCompare(b.hit.name));
  return { hits: scored.slice(0, SEARCH_RESULT_LIMIT).map((s) => s.hit), total: scored.length };
}

/** Resolve /map?place= to a label by id, name, or hyphenated name. */
export function findLabelByPlace(place: string, baseId: BaseId): MapLabel | undefined {
  const raw = place.trim().toLowerCase();
  if (!raw) return undefined;
  const labels = searchableLabels(baseId);
  return (
    labels.find((l) => l.id.toLowerCase() === raw) ??
    labels.find((l) => l.name.toLowerCase() === raw) ??
    labels.find((l) => l.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === raw)
  );
}

/** Deep-link from a home (or other) search hit to /map, flying to the pin or a temporary label marker. */
export function mapSearchHref(hit: SearchHit): string {
  if (hit.kind === "pin") return `/map?pin=${encodeURIComponent(hit.pin.id)}`;
  const id = hit.id.startsWith("label:") ? hit.id.slice("label:".length) : hit.id;
  return `/map?place=${encodeURIComponent(id)}`;
}

export function markerFromLabel(label: MapLabel): SearchMarker {
  return { id: label.id, name: label.name, kindLabel: LABEL_KIND_LABEL[label.kind], x: label.x, y: label.y };
}
