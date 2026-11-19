"""Second cleanup pass on the owner's art: coordinate-grid hairlines, leftover garbled glyph clusters and the worst AI blobs.

Run AFTER clean_text.py (it reads work/full-clean.png and work/vc-clean.png) and BEFORE upscale.py. Writes
work/full-clean2.png and work/vc-clean2.png (plus *-mask2.png previews). Everything is in source-image pixels.

  python3 clean_artifacts.py full
  python3 clean_artifacts.py vc

1. Grid hairlines. The art carries a faint coordinate grid (full map: lines every ~86 px, plus a darker major cross near
   x=889 / y=894; Vice City detail: every ~169 px). The line positions are measured from the image (column / row median of the
   high-pass), each line is masked at its measured width and removed with OpenCV Telea inpainting (thin strips only, so roads
   and coastlines that cross a line are continued, not smeared).
2. Glyph clusters. Small high-frequency specks on otherwise smooth open water are what is left of the AI's pseudo-text.
   They are found automatically (`water_specks`) and a hand-checked box list (`TEXT_BOXES`) covers the ones the detector
   misses. All are removed with LaMa (clean_text.lama).
3. Blobs. `paint_land` replaces a grey/white AI blob with plain land: the blob mask is filled with the median colour of the
   land around it plus soft procedural texture, so the coastline (the blob edge) is kept and the invented runways, smudged
   rectangles and concrete discs are gone. It does not invent streets.
"""
import sys
import cv2, numpy as np
from clean_text import lama, K

# ---- 1. grid ---------------------------------------------------------------------------------------------------------
def line_centres(img, axis, thresh=4.0):
    g = img.astype(np.float32).mean(2)
    k = np.ones((1, 13), np.float32) / 13 if axis == 'x' else np.ones((13, 1), np.float32) / 13
    prof = np.median(g - cv2.filter2D(g, -1, k), axis=0 if axis == 'x' else 1)
    return prof, [i for i in range(2, len(prof) - 2) if abs(prof[i]) > thresh and abs(prof[i]) >= abs(prof[i - 1]) and abs(prof[i]) >= abs(prof[i + 1])]

def grid_mask(img, xs, ys, half=2, major=None):
    """xs/ys: line centres. major: {centre: halfwidth} for the wider, darker lines."""
    major = major or {}
    H, W = img.shape[:2]
    m = np.zeros((H, W), np.uint8)
    for x in xs:
        h = major.get(x, half); m[:, max(0, x - h):min(W, x + h + 1)] = 255
    for y in ys:
        h = major.get(y, half); m[max(0, y - h):min(H, y + h + 1), :] = 255
    return m

# Measured on full-orig.jpg: vertical lines 29.5 + 86.15 k (k=0..13) and a major one at 889; horizontal 29.5 + 86.5 k (k=0..18), major 894.
FULL_X = [round(29.5 + 86.15 * k) for k in range(14)] + [889]
FULL_Y = [round(29.5 + 86.5 * k) for k in range(19)]
FULL_MAJOR = {889: 8, 894: 7}
# Measured on vc-orig.jpg (lines every 169.4 px, ~3-5 px wide).
VC_X = [85, 254, 423, 593, 762, 932, 1102, 1270, 1441, 1610, 1779]
VC_Y = [118, 288, 458, 627, 797, 966]


def remove_lines(img, centres, axis, half=3, major=None, block=32):
    """Subtract each grid line instead of painting over it. The line is a faint overlay, so its effect is measured per colour
    channel as the median difference between the line columns and their left/right neighbours, over blocks of `block` px along
    the line (roads and coastlines that cross the line fall out of the median), interpolated between blocks and subtracted.
    Unlike inpainting this keeps the texture, rivers and roads that cross a line intact."""
    major = major or {}
    a = img.astype(np.float32)
    if axis == 'x': a = a.transpose(1, 0, 2)          # first axis = position across the line
    W, L = a.shape[0], a.shape[1]
    for x in centres:
        h = major.get(x, half)
        lo, hi = max(0, x - h), min(W - 1, x + h)
        ref_l = a[max(0, lo - 4):max(1, lo - 1)].mean(0) if lo > 1 else None
        ref_r = a[hi + 2:hi + 5].mean(0) if hi + 5 < W else None
        refs = [r for r in (ref_l, ref_r) if r is not None]
        if not refs: continue
        ref = sum(refs) / len(refs)                    # (L, 3)
        diff = a[lo:hi + 1] - ref[None]                # (2h+1, L, 3)
        nb = max(1, L // block)
        centres_b = (np.arange(nb) + 0.5) * (L / nb)
        prof = np.zeros((hi - lo + 1, nb, 3), np.float32)
        for b in range(nb):
            seg = diff[:, int(b * L / nb):int((b + 1) * L / nb)]
            prof[:, b] = np.median(seg, axis=1)
        full = np.stack([np.stack([np.interp(np.arange(L), centres_b, prof[o, :, c]) for c in range(3)], 1) for o in range(prof.shape[0])])
        a[lo:hi + 1] -= full
    if axis == 'x': a = a.transpose(1, 0, 2)
    return np.clip(a, 0, 255).astype(np.uint8)

# ---- 2. glyph clusters -----------------------------------------------------------------------------------------------
def water_specks(img, exclude=None, hp_thresh=9, coast=9):
    """Small clusters of high-frequency detail on smooth open water."""
    b, g, r = [img[:, :, i].astype(int) for i in range(3)]
    water = ((b - r > 45) & (b > 130)).astype(np.uint8)
    open_water = cv2.erode(water, K(2 * coast + 1))
    gray = img.astype(np.float32).mean(2)
    hp = np.abs(gray - cv2.GaussianBlur(gray, (0, 0), 3))
    spec = ((hp > hp_thresh) & (open_water > 0)).astype(np.uint8)
    merged = cv2.dilate(spec, K(9))
    n, lab, st, _ = cv2.connectedComponentsWithStats(merged, connectivity=8)
    out = np.zeros(img.shape[:2], np.uint8)
    boxes = []
    for i in range(1, n):
        x, y, w, h, a = st[i]
        if w >= 14 and h >= 5 and w <= 160 and h <= 60 and int(spec[lab == i].sum()) >= 20:
            out[lab == i] = 255; boxes.append((int(x), int(y), int(w), int(h)))
    out = cv2.dilate(out, K(7))
    if exclude is not None: out[exclude > 0] = 0
    return out, boxes

# ---- 3. blobs --------------------------------------------------------------------------------------------------------
def land_palette(img, box):
    """Light / dark land greens sampled from an area of ordinary land (box in source pixels)."""
    x0, y0, x1, y1 = box
    roi = img[y0:y1, x0:x1]
    hsv = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)
    px = roi[(hsv[:, :, 1] > 60) & (hsv[:, :, 0] > 20) & (hsv[:, :, 0] < 50)]
    lum = px.astype(float).mean(1)
    lo, hi = np.percentile(lum, 40), np.percentile(lum, 92)
    return px[lum <= lo].mean(0), px[lum >= hi].mean(0)

def paint_land(img, blob, seed=1, palette_box=(520, 300, 700, 430), rim=None):
    """Replace the masked blob with plain land: a soft two-tone green field with fine grain. `blob` is a 0/255 mask.
    The blob edge is the coastline, so it stays; no roads, runways or buildings are invented."""
    rng = np.random.default_rng(seed)
    dark, light = land_palette(img, palette_box)
    H, W = blob.shape
    def noise(s):
        n = cv2.GaussianBlur(rng.standard_normal((H, W)).astype(np.float32), (0, 0), s)
        return (n - n.mean()) / (n.std() + 1e-6)
    t = np.clip(0.5 + 0.34 * noise(16) + 0.18 * noise(6), 0, 1)[..., None]
    fill = dark[None, None, :] * (1 - t) + light[None, None, :] * t
    fill = fill + 3.5 * noise(1.2)[..., None]
    if rim is not None:    # sandy rim (BGR) along the coast, fading inward
        d = cv2.distanceTransform((blob > 0).astype(np.uint8), cv2.DIST_L2, 5)
        a = np.clip(1 - d / 7.0, 0, 1)[..., None] * 0.6
        fill = fill * (1 - a) + np.array(rim, float)[None, None, :] * a
    soft = cv2.GaussianBlur((blob > 0).astype(np.float32), (0, 0), 1.2)[..., None]
    return np.clip(img * (1 - soft) + fill * soft, 0, 255).astype(np.uint8)

def grey_blob(img, box, sat_max=70, val_min=110, grow=2):
    """Mask the low-saturation (grey/white/brown-grey) pixels inside a box: the concrete-looking interior of an AI blob."""
    x0, y0, x1, y1 = box
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    roi = hsv[y0:y1, x0:x1]
    m = ((roi[:, :, 1] < sat_max) & (roi[:, :, 2] > val_min)) | ((roi[:, :, 2] < val_min + 60) & (roi[:, :, 1] < 120) & (roi[:, :, 0] > 5) & (roi[:, :, 0] < 25))
    m = cv2.morphologyEx(m.astype(np.uint8) * 255, cv2.MORPH_OPEN, K(3))
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, K(9))
    out = np.zeros(img.shape[:2], np.uint8); out[y0:y1, x0:x1] = m
    return cv2.dilate(out, K(2 * grow + 1)) if grow else out

# Boxes (x0, y0, x1, y1) in source pixels, found by looking at the upscaled composite at z6 (see docs/CUSTOM_MAP_ART.md).
FULL_TEXT_BOXES = [(262, 1520, 300, 1536),   # leftover label under the Keys main island
                   (500, 1390, 548, 1412),   # red glyphs east of the Keys
                   (174, 860, 198, 880), (226, 914, 250, 932),   # specks in the west ocean
                   (1090, 1598, 1192, 1642)]  # remains of the watermark, bottom right
VC_TEXT_BOXES = [(1188, 566, 1232, 586)]    # garbled "label" on the Vice City port water
FULL_BLOBS = [
    # Leonida Keys main island: grey disc with an invented two-runway "X" and tan taxiway strips
    dict(name='keys-island', box=(228, 1413, 350, 1535), kind='grey', seed=3),
    # Port Gellhorn: white disc with a smudged brown rectangle
    dict(name='port-gellhorn-disc', box=(200, 418, 290, 505), kind='grey', seed=5, tint=None),
]

def run(which):
    if which == 'full':
        img = cv2.imread('work/full-clean.png'); xs, ys, major = FULL_X, FULL_Y, FULL_MAJOR; boxes = FULL_TEXT_BOXES
    else:
        img = cv2.imread('work/vc-clean.png'); xs, ys, major = VC_X, VC_Y, {}; boxes = VC_TEXT_BOXES
    mask = np.zeros(img.shape[:2], np.uint8)
    # 1. grid
    gm = grid_mask(img, xs, ys, half=2, major=major)
    res = remove_lines(img, xs, 'x', half=3, major={889: 9})
    res = remove_lines(res, ys, 'y', half=3, major={894: 9})
    mask |= gm
    # the grid has a small ring/cross glyph at every crossing: remove each with a tiny Telea inpaint
    nodes = np.zeros(img.shape[:2], np.uint8)
    bgr = res.astype(int)
    wat = cv2.dilate(((bgr[:, :, 0] - bgr[:, :, 2] > 45) & (bgr[:, :, 0] > 130)).astype(np.uint8), K(5)) > 0
    for x in xs:
        for y in ys:
            if wat[min(y, wat.shape[0] - 1), min(x, wat.shape[1] - 1)]: cv2.circle(nodes, (x, y), 5, 255, -1)   # water only: over land they are invisible
    res = cv2.inpaint(res, nodes, 3, cv2.INPAINT_TELEA)
    mask |= nodes
    # 2. glyph clusters (auto + boxes), after the grid is gone so lines do not count as specks
    sp, sboxes = water_specks(res)
    tm = sp.copy()
    for (x0, y0, x1, y1) in boxes: tm[y0:y1, x0:x1] = 255
    print(which, 'grid px', int((gm > 0).sum()), 'speck clusters', len(sboxes), 'text-mask px', int((tm > 0).sum()))
    res = lama(res, tm)
    mask |= tm
    # 3. blobs
    if which == 'full':
        for b in FULL_BLOBS:
            bm = grey_blob(res, b['box'])
            res = paint_land(res, bm, seed=b['seed'], rim=(150, 205, 215))
            mask |= bm
            print(' blob', b['name'], int((bm > 0).sum()), 'px')
    out = 'work/%s-clean2.png' % ('full' if which == 'full' else 'vc')
    cv2.imwrite(out, res); cv2.imwrite(out.replace('.png', '-mask2.png'), mask)
    return res

if __name__ == '__main__':
    run(sys.argv[1] if len(sys.argv) > 1 else 'full')
