import { DUPLICATE_NAME_SIMILARITY, DUPLICATE_RADIUS_M, METRES_PER_PIXEL } from "./config";

export function normalizeName(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(the|a|an)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length];
}

/** 0..1, 1 = identical after normalisation. One name containing the other counts as similar. */
export function nameSimilarity(a: string, b: string): number {
  const na = normalizeName(a);
  const nb = normalizeName(b);
  if (!na || !nb) return 0;
  if (na === nb) return 1;
  if (na.length >= 4 && nb.length >= 4 && (na.includes(nb) || nb.includes(na))) return 0.9;
  return 1 - levenshtein(na, nb) / Math.max(na.length, nb.length);
}

export function distanceMetres(a: { x: number; y: number }, b: { x: number; y: number }): number {
  return Math.hypot(a.x - b.x, a.y - b.y) * METRES_PER_PIXEL;
}

export interface DuplicateMatch {
  id: string;
  name: string;
  status: string;
  distanceM: number;
  similarity: number;
}

export function findDuplicates<T extends { id: string; name: string; x: number; y: number; status: string }>(
  candidate: { id?: string; name: string; x: number; y: number },
  others: T[],
): DuplicateMatch[] {
  const out: DuplicateMatch[] = [];
  for (const o of others) {
    if (o.id === candidate.id) continue;
    const d = distanceMetres(candidate, o);
    if (d > DUPLICATE_RADIUS_M) continue;
    const sim = nameSimilarity(candidate.name, o.name);
    if (sim < DUPLICATE_NAME_SIMILARITY) continue;
    out.push({ id: o.id, name: o.name, status: o.status, distanceM: Math.round(d), similarity: Math.round(sim * 100) / 100 });
  }
  return out.sort((a, b) => a.distanceM - b.distanceM);
}
