# The official base map (Rockstar's Leonida Map & Cover Art Poster)

The default base of `/map` is Rockstar's own **Leonida Map & Cover Art Poster**, published on
<https://www.rockstargames.com/VI/downloads> ("Leonida Map - Printable"). Credit: **Map © Rockstar Games**, shown in the map
attribution, on `/sources` and here. The custom art (`?base=art`) and the old placeholder (`?base=legacy`) stay selectable.

## What we did to the file

| Step | Detail |
| --- | --- |
| Source | `Leonida_Map_Poster_Printable.jpg`, 5775x7900, CMYK, embedded profile GRACoL2013 (CRPC6), 300 dpi. Kept outside the repo. |
| Colour | ICC conversion CMYK (GRACoL2013) -> sRGB with LittleCMS (Pillow `ImageCms`), relative colorimetric with black point compensation. Not a channel flip. |
| Crop | To the inside of the map's dark frame (x 198..5576, y 198..7700): 5379x7503. The white margin with the A-M / 1-9 grid letters is cut off; the grid lines inside the frame stay. |
| Not touched | Legend ("Visit Leonida"), seal, "The Great State of Leonida" title, compass and the printed grid are left exactly as published. They sit in the sea and do not hide any land. No AI upscaling, no cleaning, no retouching. |
| Tiles | `npm run map:tiles -- official_srgb_map.png --id official --background "#00a7c6" --quality 85`: z0..z5 (z5 = one source pixel per screen pixel), 890 WebP tiles, 6.3 MB, `public/map/official/`, manifest `src/lib/map/base-official.json`. One overzoom level (max zoom 6) is allowed; nothing is generated beyond the real resolution. |

## Pin positions

Stored pins never change (pin space 1168x784 in Supabase). Pin space was a placeholder geography and does not match the real map
(a direct affine fit is about 750 px off), so the official base chains two steps:

    pin space --(pin-transform.ts, as on the art base)--> custom-art px --(affine, art-to-official.json)--> official px

* The affine map is fitted from 19 control points that exist on both pictures: 14 places the poster prints by name (read off the
  poster, `scripts/official/official-places.json`) and 5 islands present on both (land-mask centroids). Three outliers are trimmed
  (Gambit Bay, Tisha-Wocka Flea Market, Leonida Keys: the art base never drew them where the poster does).
* **Accuracy** (`scripts/official/build_official_transform.py` prints it, `art-to-official.json` stores it): in-sample RMS
  **247 px = 4.6 %** of the map width over 16 points; leave-one-out RMS **315 px = 5.9 %** (338 px for named places only). A
  thin-plate spline fits the points better but predicts held-out places worse and folds the map, so the plain affine map is used.
* **Seed pins whose place the poster prints** are drawn exactly at the printed label (`official-pin-positions.json`), not through
  the transform. Vendor seeds the poster only names by district (Electric Fang, Stock 305, PTT YOUNGIN$, Paradise Garage) sit in
  that district. Seed pins in open water are moved to the nearest land (not the ones that are water places by nature: Lake
  Leonida, Gambit Bay, scuba, the pier bar). The 42 older GTADB pins sit at their district's printed label (clamped spread);
  two whose name is printed on the poster (Sahara Arena, Fleeca Field) sit at that printed name.
* Clicks on the map are converted back to pin space with the inverse of the same chain, so a submission lands in the same place on
  every base.

Rebuild: `python3 scripts/official/build_official_transform.py && python3 scripts/official/build_labels.py`.

## Labels

`src/lib/map/official-labels.json` has 95 names printed on the poster: five county titles (Lummox, Leonard, Kelly, Vice-Dale,
Mariana), eight sub-county names (East / South West Lummox, North / South Leonard, North / South Kelly, West / South Vice-Dale),
cities, districts, islands, places and water names, each with the centre of its printed label. Names and positions come from the
poster alone (read with OCR, then checked by eye): nothing from GTADB, leaks or the community. Each entry's `sourceQuote` says so.

The poster prints its own text, so our label is drawn **only while the printed name is too small to read** (printed letter height
x zoom < 11 px) and the label zoom tier for its kind allows it (counties, then cities and water, then islands and districts, then
places). The big county titles are legible from the first zoom level, so they are never redrawn. Region chips (the six region
pins) hang below the printed text instead of covering it.

## Rockstar's terms (summary, read 2026-11-20)

* The downloads page offers the map as a "print-ready format of the official game map" and states no licence terms of its own.
* Terms of Service (rockstargames.com/legal) 2.1: Rockstar owns all rights in its content, including artwork, illustrations and
  locations. 2.2: users get a personal, non-commercial licence. 2.3: no copying, distributing, modifying, creating derivative
  works or commercialising the content without separate written terms from Rockstar.
* Fan content policy (support.rockstargames.com, "Policy on posting copyrighted Rockstar Games material", updated Jan 10 2025):
  Take-Two "generally does not object" to fans using material for **non-commercial** uses that do not intentionally spoil the plot;
  "non-commercial" means no money made from the material and no use to promote a product or service; Take-Two can have material
  taken down at any time. It does not apply to film, TV, ads, books, magazines or "digital publishing"; licences go to
  copyright@take2games.com.
* So: hosting the poster as map tiles on a fan site is **tolerated for a non-commercial fan site, not licensed**. Risk goes up if the
  map page carries ads, affiliate links or paid features. The owner should decide whether to ask copyright@take2games.com for
  written permission, and keep the ability to switch back to the custom art (`DEFAULT_BASE` in `bases.ts`) if asked to remove it.
