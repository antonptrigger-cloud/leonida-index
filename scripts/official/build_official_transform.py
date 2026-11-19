#!/usr/bin/env python3
"""Builds the non-destructive pin reprojection for the OFFICIAL base (Rockstar's Leonida Map & Cover Art Poster).

Stored pins stay in the legacy 1168x784 pin space; Supabase is never touched. Pin space was a placeholder geography, so it is
NOT fitted to the poster directly (a global affine fit is ~750 px off, because pin space disagrees with the real layout). Instead:

    pin space --(existing art transform, pin-transform.ts)--> custom-art px --(this warp)--> official poster px

The map (art px -> official px) is an affine fit through control points that exist on both pictures (outliers trimmed):
  * named  : places the poster prints by name (official-places.json), at the position the custom art base draws them
             (art-pin-positions.json);
  * islands: islands present on both (land-mask component centroids).
A thin-plate spline through the same points was tried: it fits the points better but predicts held-out places worse (and folds
unless smoothed until it is nearly affine), so the plain affine map is used. It is trivially invertible, so clicks on the map
convert back to pin space.

Reports in-sample and leave-one-out RMS (how well the map predicts a place it was not told about), writes the fixed official
positions of all seed/GTADB pins, and lists pins whose position is questionable.

Run:  python3 scripts/official/build_official_transform.py
"""
import json, re
from pathlib import Path
import numpy as np

ROOT = Path(__file__).resolve().parents[2]
D = ROOT / "scripts/official"
places = {p["name"]: p for p in json.loads((D / "official-places.json").read_text())["places"]}
seeds = {p["id"]: p for p in json.loads((ROOT / "src/lib/map/seed-pins.json").read_text())}
gtadb = json.loads((ROOT / "src/lib/map/gtadb-pins.json").read_text())
art_pos = json.loads((ROOT / "src/lib/map/art-pin-positions.json").read_text())
cfg = json.loads((D / "control-points.json").read_text())
ART_W, ART_H = 7200, 9888
OFF_W, OFF_H = 5379, 7503

named = [dict(name=f"{seeds[sid]['name']} = {pl}", kind="named", art=art_pos[sid], official=[places[pl]["x"], places[pl]["y"]]) for sid, pl in cfg["named"].items()]
islands = [dict(name=i["name"], kind="island", art=i["art_px"], official=i["official"]) for i in cfg["islands"]]
pts = named + islands
A = np.array([p["art"] for p in pts], float); O = np.array([p["official"] for p in pts], float)


def fit_affine(A, O):
    M, *_ = np.linalg.lstsq(np.c_[A, np.ones(len(A))], O, rcond=None)
    return M
apply = lambda M, P: np.c_[np.atleast_2d(P), np.ones(len(np.atleast_2d(P)))] @ M

# trim outliers: points where the custom art and the poster disagree about where a place is (the art base's positions were judgement calls)
TRIM = cfg.get("trimPx", 500)
idx = list(range(len(pts))); trimmed = []
while True:
    M = fit_affine(A[idx], O[idx]); r = np.linalg.norm(apply(M, A) - O, axis=1)
    worst = max(idx, key=lambda i: r[i])
    if r[worst] < TRIM or len(idx) <= 8: break
    idx.remove(worst); trimmed.append(pts[worst]["name"] + f" ({r[worst]:.0f} px off)")
rms = lambda xs: float(np.sqrt(np.mean(np.square(xs)))) if len(xs) else float("nan")
fit_rms = rms(r[idx])
loo = []
for k in idx:
    keep = [j for j in idx if j != k]
    loo.append((pts[k]["name"], pts[k]["kind"], float(np.linalg.norm(apply(fit_affine(A[keep], O[keep]), A[k]) [0] - O[k]))))
loo_rms = rms([d for _, _, d in loo]); loo_named = rms([d for _, k, d in loo if k == "named"])
print(f"affine art->official: {len(idx)} of {len(pts)} control points used; in-sample RMS {fit_rms:.0f} px ({fit_rms/OFF_W*100:.1f}% of map width)")
print(f"leave-one-out RMS {loo_rms:.0f} px ({loo_rms/OFF_W*100:.1f}%), named places only {loo_named:.0f} px")
for t in trimmed: print("  trimmed:", t)
for n, k, d in sorted(loo, key=lambda t: -t[2]): print(f"   LOO {d:5.0f} px  [{k}] {n}")
sx = np.hypot(M[0][0], M[0][1]); print("matrix", M.round(4).tolist())
out = dict(sourceSize=[OFF_W, OFF_H], artSize=[ART_W, ART_H], matrix=[[float(v) for v in row] for row in M],
           controlPoints=[dict(name=p["name"], kind=p["kind"], art=p["art"], official=p["official"], used=(i in idx)) for i, p in enumerate(pts)],
           accuracy=dict(controlPoints=len(pts), used=len(idx), trimmed=trimmed, fitRmsPx=round(fit_rms, 1), fitRmsPctWidth=round(fit_rms/OFF_W*100, 2),
                         looRmsPx=round(loo_rms, 1), looRmsPctWidth=round(loo_rms/OFF_W*100, 2)))
(ROOT / "src/lib/map/art-to-official.json").write_text(json.dumps(out, indent=1) + "\n")

W = lambda art: [float(v) for v in apply(M, np.array(art, float))[0]]
fixed = {}
for sid, spec in cfg["fixed"].items():
    if isinstance(spec, str): fixed[sid] = [places[spec]["x"], places[spec]["y"]]
    else: fixed[sid] = [places[spec["place"]]["x"] + spec["dx"], places[spec["place"]]["y"] + spec["dy"]]
for sid in seeds:
    if sid not in fixed:
        fixed[sid] = [round(v, 1) for v in W(art_pos[sid])]
        print("seed placed by the transform (not printed on the poster):", sid, fixed[sid])
groups = {}
for g in gtadb:
    m = re.search(r" in ([^,]+(?:, [A-Za-z ]+)?), from community", g["description"])
    groups.setdefault(m.group(1).split(", ")[-1] if m else None, []).append(g)
review = []
for district, gs in groups.items():
    tp = {g["id"]: np.array(W(art_pos[g["id"]])) for g in gs}
    if district in places and places[district]["kind"] in ("district", "city", "region"):
        c = np.mean(list(tp.values()), axis=0); lab = np.array([places[district]["x"], places[district]["y"]], float)
        for g in gs:
            d = tp[g["id"]] - c; n = np.linalg.norm(d)
            if n > 220: d = d / n * 220
            fixed[g["id"]] = [round(float(v), 1) for v in lab + d]
    else:
        for g in gs:
            fixed[g["id"]] = [round(float(v), 1) for v in tp[g["id"]]]
            review.append((g["id"], g["name"], district or "(none)"))
(ROOT / "src/lib/map/official-pin-positions.json").write_text(json.dumps(fixed, separators=(",", ":")) + "\n")

print("\nseed pins: transform position vs drawn position (px on the poster)")
for sid in seeds:
    d = float(np.linalg.norm(np.array(W(art_pos[sid])) - np.array(fixed[sid])))
    print(f"  {sid:30s} {d:6.0f}{'   <-- the transform alone would put it far from the printed place' if d > 500 else ''}")
print(f"\nGTADB pins in districts the poster does not print ({len(review)}):", ", ".join(f"{n} [{d}]" for _, n, d in review))
print(f"wrote art-to-official.json and official-pin-positions.json ({len(fixed)} pins)")
