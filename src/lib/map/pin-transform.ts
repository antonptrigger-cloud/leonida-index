import data from "./pin-transform-art.json";

/**
 * Piecewise-affine transform between the canonical pin space (legacy 1168x784, what Supabase stores)
 * and the pixels of the custom-art base. Triangles come from a Delaunay triangulation of hand-matched
 * control points (scripts/art/build_pin_transform.py), so the mapping is continuous, exactly reversible
 * and identical at every control point. See docs/CUSTOM_MAP_ART.md.
 */
type V = [number, number];
interface Tri {
  l: [V, V, V]; // legacy-space corners
  a: [V, V, V]; // art-space corners
}

const TRIS: Tri[] = (data.triangles as number[][]).map(([i, j, k]) => {
  const P = data.points;
  return {
    l: [P[i].legacy as V, P[j].legacy as V, P[k].legacy as V],
    a: [P[i].art as V, P[j].art as V, P[k].art as V],
  };
});

function barycentric(p: V, [a, b, c]: [V, V, V]): [number, number, number] {
  const d = (b[1] - c[1]) * (a[0] - c[0]) + (c[0] - b[0]) * (a[1] - c[1]);
  const w1 = ((b[1] - c[1]) * (p[0] - c[0]) + (c[0] - b[0]) * (p[1] - c[1])) / d;
  const w2 = ((c[1] - a[1]) * (p[0] - c[0]) + (a[0] - c[0]) * (p[1] - c[1])) / d;
  return [w1, w2, 1 - w1 - w2];
}

function map(p: V, from: "l" | "a", to: "l" | "a"): V {
  // Pick the triangle that contains the point (or the least-outside one for points beyond the frame).
  let best: { w: [number, number, number]; t: Tri } | null = null;
  let bestMin = -Infinity;
  for (const t of TRIS) {
    const w = barycentric(p, t[from]);
    const m = Math.min(w[0], w[1], w[2]);
    if (m > bestMin) {
      bestMin = m;
      best = { w, t };
      if (m >= 0) break;
    }
  }
  const { w, t } = best!;
  const c = t[to];
  return [w[0] * c[0][0] + w[1] * c[1][0] + w[2] * c[2][0], w[0] * c[0][1] + w[1] * c[1][1] + w[2] * c[2][1]];
}

/** Pin space -> art source pixels. */
export const pinToArt = (x: number, y: number): V => map([x, y], "l", "a");
/** Art source pixels -> pin space. */
export const artToPin = (sx: number, sy: number): V => map([sx, sy], "a", "l");
