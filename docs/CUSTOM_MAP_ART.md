# Custom map art (base map "art")

The default base map on `/map` is the owner's own AI-generated illustration of Leonida, cleaned, upscaled and tiled.
It is **illustrative, not the in-game geography**. The old placeholder map stays available as a fallback (`/map?base=legacy`,
or the "Base map" selector in the filters) and Rockstar's official map can replace either one later.

## What the base is made of

| Piece | Source |
|---|---|
| Whole map | `assets/map/art/full-orig.jpg` (1200x1648) |
| Vice City detail | `assets/map/art/vc-orig.jpg` (1840x1072), aligned onto the whole map (SIFT + RANSAC similarity, 527 inliers) and blended in with a feathered, colour-matched mask |
| Text, scale bar, grid numbers, watermarks | removed from both images with LaMa inpainting (tight boxes), before upscaling |
| Resolution | Real-ESRGAN `realesr-general-x4v3` x4 on both, composited at **7200 x 9888** (6x the whole-map pixels; the VC detail is native or better there) |
| Tiles | 256px webp pyramid, z0 to z6 (z6 = 1 source px per screen px), 1540 tiles, about 9.3 MB, `public/map/art/`. The map may over-zoom to z7 |

Pipeline and scripts: `scripts/art/README.md`. Output is committed, so nothing here runs on deploy.

### Labels
Everything baked into the picture that was garbled (MT. KALISIA NATIONAL PARK, GNNGSRIVEYS, LEONIGA KEYS, the Port Gellhorn label,
VICE CITY (MIAMI), VICE BEACH, WATSON BAY, tiny district text, grid numbers, the fake scale bar and both Grok watermarks) was
inpainted out. Correct names are drawn by the site as the six **region pins** (Vice City, Leonida Keys, Grassrivers, Port Gellhorn,
Ambrosia, Mount Kalaga), styled like the rest of the site. On the legacy base those chips sit below its baked labels; on the art base
(`bakedLabels: false`) they are the labels.

## Coordinate system (read this before touching pins)

* **Stored pin coordinates never change**: `pins.x/y` live in the canonical *pin space* (`COORD_SPACE`, 1168 x 784, origin top left).
  The Supabase data and the `submit_location` RPC are unchanged.
* Each base maps pin space to its own image pixels (`src/lib/map/bases.ts`):
  * `legacy`: the linear calibration in `base-map.json`.
  * `art`: a **piecewise-affine (Delaunay) transform** fitted through control points (`scripts/art/control-points.json`: region anchors,
    VC and Keys landmarks, plus frame corners), generated into `src/lib/map/pin-transform-art.json` (44 triangles). It is exactly
    invertible (`src/lib/map/pin-transform.ts`).
  * Known pins (all 22 official and 42 GTADB seed pins) also have a hand-checked **position on the art**
    (`src/lib/map/art-pin-positions.json`, from the transform, adjusted by `pinOverrides` and snapped to land with
    `assets/map/art/landmask.png`). Pins without an entry use the transform.
* **Clicking/dragging on the map** converts art pixels back to pin space with the inverse transform before saving, so a community
  submission is stored consistently and shows in the same place on the art base, and at the matching place on the legacy base.
  Round-trip error is under 0.1 pin-space units.
* `?coords=1` shows pin-space coordinates under the cursor for either base.
* `?base=art|legacy` selects the base (default art).

### Accuracy caveats
The art does not follow the old map's geography exactly, so positions come from judgement-based control points, not surveying.
Every seed pin was already `approximate: true` and stays so. Expect place pins to be off by roughly the size of a district,
and re-check them against the official map when it is released.

## Swapping to Rockstar's official map
Add a base in `bases.ts` (manifest from `npm run map:tiles -- <img> --id <name>`, a pin transform, attribution), make it
`DEFAULT_BASE`, and keep or drop the others. See also section 6 of `docs/COMMUNITY_MAP.md`.

## Credits
Real-ESRGAN (BSD-3-Clause) and LaMa (Apache-2.0) were used locally as tools. The artwork is the owner's own AI-generated image.
GTADB landmark credit is unchanged (`docs/DATA_CREDITS.md`).
