#!/usr/bin/env python3
"""Remove the poster's own legend box, state seal and title block from the sRGB map master, non-generatively.

Rockstar's poster prints three blocks on flat open sea: the "Visit Leonida" legend (top left), the Great Seal and the
"The Great State of Leonida" title (bottom right). They cover no land. For the map we want no logos, so each block is replaced by
the sea under it: a low-order polynomial surface fitted to the water around the block (no texture synthesis, nothing invented
beyond a smooth sea colour), with the poster's own thin white grid lines re-drawn across the hole from their clean parts.

  python3 scripts/official/mask_logos.py IN.png OUT.png
Boxes are in the coordinates of official_srgb_map.png (5379x7503, the poster cropped to its frame).
"""
import sys
import numpy as np
from PIL import Image

Image.MAX_IMAGE_PIXELS = None

# (x0, y0, x1, y1) in map-master pixels, padded ~12 px beyond the printed block
BOXES = {
    "legend": (268, 212, 1128, 1302),
    "seal": (4043, 5958, 4730, 6648),
    "title": (3745, 6722, 5022, 7142),
}
RING = 70  # px of surrounding water used to fit the sea


def fit_surface(img, box):
    x0, y0, x1, y1 = box
    H, W = img.shape[:2]
    ax0, ay0, ax1, ay1 = max(0, x0 - RING), max(0, y0 - RING), min(W, x1 + RING), min(H, y1 + RING)
    ys, xs = np.mgrid[ay0:ay1, ax0:ax1]
    ring = ~((xs >= x0) & (xs < x1) & (ys >= y0) & (ys < y1))
    px = img[ay0:ay1, ax0:ax1].astype(np.float64)
    X = (xs[ring] - x0) / 1000.0
    Y = (ys[ring] - y0) / 1000.0
    A = np.stack([np.ones_like(X), X, Y, X * X, X * Y, Y * Y], 1)
    out = {}
    gx, gy = np.meshgrid(np.arange(x0, x1), np.arange(y0, y1))
    Xg, Yg = (gx - x0) / 1000.0, (gy - y0) / 1000.0
    Ag = np.stack([np.ones_like(Xg), Xg, Yg, Xg * Xg, Xg * Yg, Yg * Yg], -1)
    fill = np.zeros((y1 - y0, x1 - x0, 3))
    keep = np.ones(X.shape[0], bool)
    for c in range(3):
        v = px[..., c][ring]
        k = np.ones_like(v, bool)
        for _ in range(4):  # trim grid lines, land and text that fall in the ring
            coef, *_ = np.linalg.lstsq(A[k], v[k], rcond=None)
            r = v - A @ coef
            s = np.std(r[k]) + 1e-6
            k = np.abs(r) < 2.0 * s
        fill[..., c] = Ag @ coef
        keep &= k
    return fill, keep.mean()


def grid_lines(img, box):
    """Find the poster's grid lines (thin, lighter, axis-aligned) in clean bands just outside the box."""
    x0, y0, x1, y1 = box
    H, W = img.shape[:2]
    lines = {"v": [], "h": []}
    band_top = img[max(0, y0 - 60):max(1, y0 - 12)].astype(np.float64).mean(2)
    band_left = img[:, max(0, x0 - 60):max(1, x0 - 12)].astype(np.float64).mean(2)
    # vertical lines: columns brighter than a running median
    prof = np.median(band_top, 0)
    base = np.convolve(prof, np.ones(61) / 61, "same")
    cols = np.where(prof - base > 6)[0]
    # horizontal lines
    prof2 = np.median(band_left, 1)
    base2 = np.convolve(prof2, np.ones(61) / 61, "same")
    rows = np.where(prof2 - base2 > 6)[0]

    def groups(idx):
        out, cur = [], []
        for i in idx:
            if cur and i - cur[-1] > 2:
                out.append((cur[0], cur[-1])); cur = []
            cur.append(i)
        if cur:
            out.append((cur[0], cur[-1]))
        return out

    lines["v"] = [g for g in groups(cols) if g[0] < x1 + 5 and g[1] > x0 - 5 and x0 + 2 < (g[0] + g[1]) / 2 < x1 - 2 or x0 <= g[0] <= x1]
    lines["h"] = [g for g in groups(rows) if y0 <= g[0] <= y1]
    return lines


def process(img, name, box):
    x0, y0, x1, y1 = box
    fill, kept = fit_surface(img, box)
    lines = grid_lines(img, box)
    print(f"{name}: box {box}, surface fitted on {kept:.0%} of the ring; grid lines v={lines['v']} h={lines['h']}")
    patch = np.clip(fill, 0, 255)
    alpha = np.zeros(patch.shape[:2])
    # line alpha profile measured in a clean band outside the box, for each line
    for (a, b) in lines["v"]:
        w = b - a + 1
        for src_y in (slice(max(0, y0 - 60), y0 - 12), slice(y1 + 12, min(img.shape[0], y1 + 60))):
            band = img[src_y, a - 4:b + 5].astype(np.float64)
            if band.shape[0] < 10:
                continue
            prof = np.median(band, 0).mean(1)
            side = np.median(np.concatenate([prof[:3], prof[-3:]]))
            al = np.clip((prof - side) / max(1.0, 255 - side), 0, 1)
            cols = np.arange(a - 4, b + 5)
            for ci, c in enumerate(cols):
                if x0 <= c < x1:
                    alpha[:, c - x0] = np.maximum(alpha[:, c - x0], al[ci])
            break
    for (a, b) in lines["h"]:
        for src_x in (slice(max(0, x0 - 60), x0 - 12), slice(x1 + 12, min(img.shape[1], x1 + 60))):
            band = img[a - 4:b + 5, src_x].astype(np.float64)
            if band.shape[1] < 10:
                continue
            prof = np.median(band, 1).mean(1)
            side = np.median(np.concatenate([prof[:3], prof[-3:]]))
            al = np.clip((prof - side) / max(1.0, 255 - side), 0, 1)
            for ri, r in enumerate(range(a - 4, b + 5)):
                if y0 <= r < y1:
                    alpha[r - y0, :] = np.maximum(alpha[r - y0, :], al[ri])
            break
    patch = patch * (1 - alpha[..., None]) + 255.0 * alpha[..., None]
    img[y0:y1, x0:x1] = np.clip(patch + 0.5, 0, 255).astype(np.uint8)


def main(src, dst):
    img = np.asarray(Image.open(src).convert("RGB")).copy()
    for name, box in BOXES.items():
        process(img, name, box)
    Image.fromarray(img).save(dst, optimize=False)
    print("wrote", dst)


if __name__ == "__main__":
    main(*sys.argv[1:3])
