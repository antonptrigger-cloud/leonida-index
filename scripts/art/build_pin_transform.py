#!/usr/bin/env python3
"""Builds the non-destructive pin reprojection for the custom-art base.

Inputs : scripts/art/control-points.json  (legacy pin space -> art px, hand-matched by neighbourhood)
         assets/map/art/landmask.png      (land/water mask of the art at 1200x1648)
         src/lib/map/seed-pins.json, gtadb-pins.json, base-art.json
Outputs: src/lib/map/pin-transform-art.json   piecewise-affine transform (Delaunay triangles in legacy space)
         src/lib/map/art-pin-positions.json   art-pixel position for every known seed/gtadb pin id
Pins stored in Supabase are NOT touched: they stay in the legacy 1168x784 pin space. The app converts at
render time (src/lib/map/pin-transform.ts) and converts clicks back with the inverse of the same transform.
Run:  python3 scripts/art/build_pin_transform.py
"""
import json, sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy.spatial import Delaunay
from scipy.ndimage import distance_transform_edt

ROOT = Path(__file__).resolve().parents[2]
cp = json.loads((ROOT / "scripts/art/control-points.json").read_text())
manifest = json.loads((ROOT / "src/lib/map/base-art.json").read_text())
SRC_W, SRC_H = 1200, 1648                      # full-orig.jpg
S = manifest["width"] / SRC_W                   # composite px per full-orig px
pts = cp["points"]
L = np.array([p["legacy"] for p in pts], float)
A = np.array([p["art"] for p in pts], float) * S

tri = Delaunay(L)
area = lambda a, b, c: (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0])
folds = [t for t in tri.simplices if area(*L[t]) * area(*A[t]) <= 0]
if folds:
    print("FOLDED triangles (fix control points):", [[pts[i]["name"] for i in t] for t in folds]); sys.exit(1)

def forward(p):
    s = tri.find_simplex(p)
    if s < 0:  # outside the hull: use the triangle with the least-negative barycentric coordinate
        best = None
        for k, t in enumerate(tri.simplices):
            T = tri.transform[k]; b = T[:2] @ (np.array(p) - T[2]); w = np.append(b, 1 - b.sum())
            if best is None or w.min() > best[0]: best = (w.min(), k)
        s = best[1]
    t = tri.simplices[s]; T = tri.transform[s]; b = T[:2] @ (np.array(p) - T[2]); w = np.append(b, 1 - b.sum())
    return w @ A[t]

out = {"scale": S, "points": [{"name": p["name"], "legacy": l.tolist(), "art": [round(v, 2) for v in a.tolist()]} for p, l, a in zip(pts, L, A)],
       "triangles": [[int(i) for i in t] for t in tri.simplices]}
(ROOT / "src/lib/map/pin-transform-art.json").write_text(json.dumps(out, separators=(",", ":")) + "\n")

land = np.asarray(Image.open(ROOT / "assets/map/art/landmask.png").convert("L")) > 127
dist, (iy, ix) = distance_transform_edt(~land, return_indices=True)
LAND_TYPES = {"landmark", "shop", "property", "secret", "collectible", "quest", "other"}
MAX_SNAP = 160  # full-orig px

pins = json.loads((ROOT / "src/lib/map/seed-pins.json").read_text()) + json.loads((ROOT / "src/lib/map/gtadb-pins.json").read_text())
positions, snapped = {}, 0
for pin in pins:
    pid = pin["id"]
    if pid in cp.get("pinOverrides", {}):
        a = np.array(cp["pinOverrides"][pid], float) * S
    else:
        a = forward([pin["x"], pin["y"]])
        if pin["type"] in LAND_TYPES:
            fx, fy = int(round(a[0] / S)), int(round(a[1] / S))
            fx = min(max(fx, 0), SRC_W - 1); fy = min(max(fy, 0), SRC_H - 1)
            if not land[fy, fx] and dist[fy, fx] <= MAX_SNAP:
                a = np.array([ix[fy, fx], iy[fy, fx]], float) * S; snapped += 1
    positions[pid] = [round(float(a[0]), 1), round(float(a[1]), 1)]
(ROOT / "src/lib/map/art-pin-positions.json").write_text(json.dumps(positions, separators=(",", ":")) + "\n")
print(f"{len(tri.simplices)} triangles, {len(positions)} pin positions ({snapped} snapped to land)")

# Visual check: all pins over the art preview
try:
    import cv2
    prev = cv2.imread(str(ROOT / "assets/map/art/full-orig.jpg"))
    for pid, (x, y) in positions.items():
        col = (0, 0, 255) if pid.startswith("seed-") else (255, 255, 0)
        cv2.circle(prev, (int(x / S), int(y / S)), 6, col, -1)
    for p in pts:
        cv2.drawMarker(prev, (int(p["art"][0]), int(p["art"][1])), (255, 0, 255), cv2.MARKER_CROSS, 16, 2)
    cv2.imwrite("/tmp/art-pins-check.png", prev)
except ImportError:
    pass
