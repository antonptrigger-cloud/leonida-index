# Custom Leonida map art: build pipeline

Everything that turns the owner's two source images (`assets/map/art/full-orig.jpg` 1200x1648 and `vc-orig.jpg` 1840x1072)
into the tile pyramid in `public/map/art/`. The output is committed, so none of this runs in CI or on deploy.
Full write-up: `docs/CUSTOM_MAP_ART.md`.

Run from a scratch directory that holds copies of the two source images plus an empty `work/` folder.
Model weights live outside the repo (`LVG_WEIGHTS`, default `./weights`):
`realesr-general-x4v3.pth` (Real-ESRGAN, BSD-3-Clause) and `lama_fp32.onnx` (LaMa, Apache-2.0, Carve/LaMa-ONNX).
Python deps: numpy, opencv-python, torch, onnxruntime, pillow.

1. `python3 clean_text.py full` and `python3 clean_text.py vc`: LaMa inpaints the baked labels, grid numbers, scale bar and
   watermarks (box lists at the top of the file, in source pixels) -> `work/full-clean.png`, `work/vc-clean.png`.
2. `python3 upscale.py work/full-clean.png work/full-x4.png` (same for vc): Real-ESRGAN x4 on CPU, tiled.
3. `python3 align.py`: SIFT + RANSAC similarity of the Vice City detail onto the full map -> `work/H.json`.
4. `python3 composite.py`: composite at 6x the full-map pixels (7200x9888); the VC detail is blended in with a feathered,
   colour-matched mask.
5. `npm run map:tiles -- work/composite.png --id art --background "#30669e"` (see `scripts/map-tiles.mjs`) writes tiles, preview and
   `src/lib/map/base-art.json`.
6. Pins: edit `control-points.json`, then `python3 build_pin_transform.py` (from the repo root) regenerates
   `src/lib/map/pin-transform-art.json` and `src/lib/map/art-pin-positions.json`. `assets/map/art/landmask.png` is the
   land mask used to snap land pins.
