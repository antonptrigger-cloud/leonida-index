# Data credits and licences

## GTADB.org landmark data (CC BY 4.0)

Some pins on `/map` come from the community landmark research published by **GTADB.org** and its contributors
(maintained by rlx / rolux): *GTA VI Landmarks Data (CC BY 4.0)*, <https://map.gtadb.org>.

- Source: <https://github.com/rolux/gtadb.org>, `map/data/6/landmarks.json`, revision `8b1dc4f` (2026-11-18).
- Licence: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) ([LICENSE-DATA](https://github.com/rolux/gtadb.org/blob/8b1dc4f0619d8760fd87881c396225c147f4d738/LICENSE-DATA)).
  Credit is given in the map attribution, on every imported pin (`source: "gtadb"`, shown as "Community research (GTADB.org)"),
  on `/sources`, and here.
- **What we used:** landmark names, a coarse category and relative position inside a district. Nothing else.
- **What we did not use:** GTADB's / Yanis' map tiles, photos or any other image assets. Our base map is our own image.
- **Changes made (as CC BY 4.0 requires us to say):** filtered to a small named subset (no unconfirmed, closed or generic entries),
  mapped onto our own pin types, repositioned onto our base image, and each entry given a short generated description.
- **Positions are approximate.** GTADB coordinates live in the pixel space of their own map. A fit between six shared reference
  points (region centres) and our base image was off by ~85 px RMS (about 7% of the map width), so we cannot map GTADB coordinates
  onto our image soundly. Each district is instead placed by itself (see the header of `scripts/import-gtadb.mjs`). All imported
  pins are `approximate: true`, and the official map swap will realign them.
- Re-run: `node scripts/import-gtadb.mjs` (fetches the pinned revision) then `node scripts/gen-seed-sql.mjs` and paste the output
  between the markers in `supabase/migrations/20261118000400_pin_types_and_source.sql`.

GTADB.net and gtadb.org are separate projects; this site is not affiliated with or endorsed by GTADB, Rockstar Games or Take-Two.

## Rockstar-named places

Pins with `source: "official"` are places Rockstar names itself (rockstargames.com/VI pages and galleries, trailers, Newswire).
Each pin's description ends with the page it came from. Rockstar's artwork is not used. Our map is an illustration; positions are
guesses and marked approximate until the official map is swapped in.
