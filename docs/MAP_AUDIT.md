# Map audit and improvement plan (docs only)

Date: 19 Nov 2026 (Brisbane time). Scope: audit of the live `/map` (default base: custom AI art), competitor feature comparison,
and a ranked plan. **Nothing in this PR changes code, data or the site.** All screenshots are of production
(`https://www.leonidaviceguide.com/map`), taken headlessly at 1440x900 and 390x844 at z5, z6 and z7.
Full set (about 50 files): `/workspace/leonida-screens/audit/` on the box. The eight most telling ones are in `docs/map-audit/`.

## 1. Audit: what is wrong when you zoom in

Zoom maths first, because it explains most of the blur. The composite is 7200x9888 and is 6x the original 1200x1648 art
(Real-ESRGAN x4, then resampled to x6). z6 is 1 composite px per screen px, so one pixel of the original art is 6 screen px at z6,
3 at z5 and 1.5 at z4. **Outside the Vice City detail, real detail ends around z3.5-4. In the Vice City detail
(`vc-orig.jpg`, 1840x1072, "native or better" per `docs/CUSTOM_MAP_ART.md`) it runs out around z4.5-5 (my estimate).
Everything beyond that, z5 to z7, is interpolation and AI hallucination.** The tile pyramid and overzoom are fine technically. The source image is the problem.

### Worst problems, most severe first

| # | Problem | Where (screenshot) | Detail |
|---|---|---|---|
| 1 | **Streets are not real geography** | everywhere; `02`, `03`, `05`, `07` | The art is an AI illustration of "a GTA-like map". Vice City is a tidy chequerboard, Ambrosia a few boxes in green. None of it is traced from Rockstar material, so even a clean redraw would be a clean fake. This is the owner's "streets aren't accurate" complaint, and it is true by construction. |
| 2 | **Muddled and smeared roads** | `02` downtown z6, `03` Vice Beach z7, `08` mobile z7 | Road edges are double-contoured and wobbly, blocks are smeared grey-blue, and the interchanges in downtown are spaghetti. At z7 (2x overzoom) it reads as a blurry watercolour. Mobile z7 is worse: 390 px shows about 190 art-px, so a few blocks fill the screen. |
| 3 | **Garbled fake text still in the art** | `04` VC port z6 (water, left of centre); also top of `05` Port Gellhorn | The inpainting left pseudo-letters ("KEY LENTO"-like glyph clusters) on the water. Docs say all text was removed, but at z6+ these remain. They look like broken labels. |
| 4 | **Leftover grid and crosshair lines** | `01` (a cross through the whole island); `02`, `05`, `06`, `07` as a thin line crossing tiles | A vertical and a horizontal hairline cross the whole map. These are the original art's coordinate grid, not removed. At z6 it looks like a tile seam. It looks baked into the art rather than a tile boundary (it runs through the whole composite and tile edges are otherwise clean). |
| 5 | **Obvious AI blobs in the wrong places** | `06` Leonida Keys main island; `05` Port Gellhorn | The Keys' biggest island is a huge white blob with a giant brown "X" (an airport with two runways) and sits where the Keys should be a thin chain. Port Gellhorn is a white disc with a brown smudged rectangle and a swooshy ramp. Neither resembles anything Rockstar has shown. |
| 6 | **Wetlands and nature are noise** | `07` Grassrivers z6, `Mount Kalaga` z6 (in audit folder) | Grassrivers is a field of blue/teal blotches with only one pin on screen. Mount Kalaga is a flat green sheet with two road loops and nothing else: no terrain, no park boundary, no trails (its one pin is hidden under the filter card). |
| 7 | **No labels at all below the region chips** | every deep-zoom shot | Only the six region chips exist (visible at overview, hidden or off-screen when zoomed in). Nothing names Ocean Beach, Downtown, Little Cuba, Key Lento, Lake Leonida, the airport, bays, and so on. Pins show an icon but **no name until clicked**. |
| 8 | **Pin sparsity and pin/base mismatch** | `02`, `03`, `07`, Kalaga | 64 pins total (6 regions, 24 landmarks, 17 shops, 7 properties, 10 activities). A 1440x900 viewport at z6 shows 0-8 pins; Grassrivers shows 1, Kalaga 1 (under the card). GTADB-sourced pins are `approximate` (placed per district, not by true coordinates) and the base's streets don't match, so even where a pin is "right" it does not sit on a recognisable block. |
| 9 | **Shops and vendors: type exists, categories do not** | filter card in all shots | There is one "Shops" filter (17 pins). No gas, clothing, guns, barbers, tattoo, banks, mod shops, car washes, dealers, safehouses, metro or airports. The owner is right that there are no vendor pins in practice. |
| 10 | **UI chrome eats the viewport** | all desktop shots; mobile `08` | The desktop filter card covers about 30% x 35% of the top-left, and it hides pins (the Mount Kalaga activity pin sits under it in the z6 shot). Mobile keeps a search bar and a large pink "Submit a location" button over the bottom-left, plus a two-line attribution bar. None of this is a bug, but at deep zoom the map area is small. |
| 11 | **Honest-labelling gap** | attribution bar | The attribution says "Illustrative AI-made map art, not the in-game geography". That is honest, but nothing on the map itself tells users (a tag or banner) that the streets at z5+ are not real. |

What is fine: tile loading, no seams between tiles, no 404s, clean region chips at overview, clustering at z6, the pin detail panel and submit flow, and the overview framing (PR #36 and #37).

## 2. Competitor comparison (features only)

Method: I read each site's public pages as text (WebFetch, WebSearch) on 19 Nov 2026. I did not download or copy any tiles or assets. For some maps I could only see what the page text and third-party comparisons say, not the rendered UI, so UX columns are "stated", not "tested". GTADB is JS-only, so its UI list comes from its own page text.

| | **GTADB** (map.gtadb.org, leonida.gtadb.org, api.gtadb.org) | **GTA Boss** (gtaboss.gg/gta-6/map) | **gta-6-map.com** | **Leonida Explorer** (leonidaexplorer.com) | **MapGenie / Mobalytics** |
|---|---|---|---|---|---|
| Size | 3,431 landmark records (about 790 named and active); gtadb.io shows 797 markers | 490 locations | 889 places (508 Vice City, 158 Port Gellhorn, 60 Keys, 53 Kalaga, 51 Ambrosia, 23 Grassrivers); 454 place pages | 3,650 points; 316 named places; 1,064 "official in-game views" | MapGenie: **no GTA 6 map yet**. Mobalytics: a map shell with category taxonomy, mostly empty (e.g. Garage 10, Gas 13, Banks 22, Police 5, Hospital 3) |
| Districts labelled | The most complete: Ocean Beach, Salton, Downtown, Southside, Crosstown, Rockridge, Peacock Bay, Little Cuba, Tequesta, La Perle, Balsero, Stockyard, Washington Beach, Bayside, Vice Decor District, Capri, Waning Sands, Watson Bay, Key Lento, Hamlet, Rialto Islands, Gloriana Key, Dalton Island, Catalan Key, VCIA, Gellhorn Raceway, plus counties (Mariana, Kelly, Lummox, Leonard, Vice-Dale) | Districts only appear as store names ("Pay 'n' Spray, Waning Sands", etc.) and region groups | Six regions plus district names in pin addresses (Ocean Beach, Vice Beach, ...) | Six regions, each with a guide page | Six regions only |
| Street names | **Yes, via geocoder and addresses**, about 27 distinct streets in the landmark data (Shore Dr, Catalan Blvd, Thompson Ave, Calderone Ave, SW 9th/3rd/7th Ave, Westbrook Dr, El Joven Blvd, Route 1, Miramar Dr ...) | No | No | No | No |
| POI categories we lack | Landmark `types` and `#`-tags: gas, supermarket, guns, hair, bar, nightclub, safehouse, fence, marina, metro, metromover, train, airport, racetrack, tennis, bus | **Shops & Services (270)**: guns 24, clothing 84, barbers 18, tattoos 11, gas 20, stores 40, food and drink 33, banks 32, fences 8. **Vehicles (45)**: dealers, mod shops 35, car washes 8. **Properties (18)**: garages 13, safehouses 5. **Activities (91)**: nightclubs, bars, golf, tennis, racetracks, gyms, cinema, ferris wheel, robberies 35, gang activity 33. **Travel (55)**: airports 11, trains 22, metro 10, marinas 12. **Emergency (11)**: police, fire, hospital, jail | Hotels, landmarks, every trailer scene; stores, activities and collectibles promised | "Named places first" vs "every pin" toggle | Mobalytics taxonomy: Story (safehouse, property, garage), Travel (airport, airstrip, helipad, marina, gas, viewpoint, train), Service (gun, clothing, barber, tattoo, mod shop, respray, car wash, convenience, dealership, hospital, police, bank), Activities (race, stunt jump, range, golf, strip club, bar/nightclub, cinema, speedway, off-road), Nature (hunting, fishing, airboat, beach), Collectibles (flight challenge, wildlife) |
| UX | Search, **directions/routing with distance and duration (real-life or in-game)**, 2D/3D toggle with pitch and rotate, keyboard shortcuts, **elevation**, geocoding and landmarks API, "plop your own markers" tool (markers.gtadb.org), real-life counterpart for each landmark | Category groups, per-category lists, "positions are estimates" banner | "Mark as found" checklist (stored on device), per-place pages with real-life inspiration | Named-place pages, region guide links, official-view galleries, unlock all pins | MapGenie model: per-category toggles, found-checklists, notes, Pro account |
| Data licence | **Data CC BY 4.0** (`LICENSE-DATA`), code MIT. Its FAQ also says "public domain unless otherwise stated". Its own FAQ says the mapping project may use the 2022 and 2026 leaks, and that its map was traced by hand. | Not stated | Says its locations are from GTADB (CC BY 4.0) | Not stated | Not stated |
| Provenance | Community research plus, by its own admission, leaks | "Drawn from pre-release footage"; honest estimate banner | GTADB data matched to official footage | Says official footage; "reconstruction" for the full pin set | n/a |

Takeaways for us:

* We are well behind on **pin count (64 vs 490-3,650)**, **category depth**, **district labels** and **street/route features**. We are ahead on the community submit/vote/vet flow, which none of the others seem to offer on their map (not verified for every site).
* Nobody has a *street-accurate* base. GTADB's accurate layer is points (landmarks), plus its own hand-traced map and tiles, which we cannot use.
* "Named places first, every pin on demand" (Leonida Explorer) and GTA Boss's grouped category tree are the two UX patterns worth copying (patterns, not code or art).
* We must not copy: any competitor's tiles, icons, images, or their curated lists as such. GTA Boss's categories and counts are listed above only to show which categories exist; we should build ours from GTADB CC BY data plus our own community flow.

## 3. Legal and accuracy reality (read before choosing)

* **Rockstar's official printable map** is promised for today (19 Nov) on the official site ("official printable Grand Theft Auto VI cover art poster and map of Leonida", Newswire 3 Nov). At my last check (about 6:55 PM Brisbane time) the official downloads and artwork pages (27 artwork items, six regional postcards, no map or poster) did not list it. The hourly watch continues. If it ships, it is by far the highest-value base: right coastline, right regions, official place names (labels we may use). Open points: its resolution (unknown, likely a poster-level map, not street-level), its terms of use (the owner or Master should read them before we host tiles of it), and whether it carries district names.
* **Street-accurate geometry cannot be legally and reliably derived today.** Official trailers and screenshots (the 138 on the downloads page) let us place identified landmarks, not trace a road network. The accurate maps that exist are traced with help from leaks (GTADB says so in its FAQ), which violates the owner's "only official material" rule, and their tiles are off-limits anyway. Tracing real Miami streets from OpenStreetMap would be wrong too, since Rockstar changed the layout (GTADB's FAQ notes moved roads and keys).
* **The game itself is out from today.** Facts a player observes (names of districts and streets, where a shop is, what category it is) are facts, and the existing community submit/vote/vet flow is the legal and accurate way to gather them. Rockstar's in-game map art and screenshots of it are copyrighted artwork and are not ours to host.
* **GTADB CC BY 4.0 data** is usable for facts with credit and a changes note (already done in `docs/DATA_CREDITS.md`). **Flag for the owner:** GTADB's own FAQ states the project may derive information from the 2022 and 2026 leaks. The licence covers GTADB's compilation. It does not tell us whether a given record came from a leak, and the data has no per-record provenance field. The owner has approved GTADB data with credit; the owner should know about this caveat once, and decide whether to keep the approval as is or limit GTADB use to records that match an official screenshot.
* Not legal advice. These are the constraints I'd work to until the owner or counsel says otherwise.
* **GTADB coordinates do not fit our base.** The previous import found an ~85 px RMS misfit (about 7% of map width), so we place district by district and mark every pin `approximate`. Any data layer we add (labels, shops) is *as accurate as the district, not the street*, until the base is replaced. This applies to every option below that places things on the map.

## 4. Options, ranked by impact per effort

Effort: S = under a day, M = 1-3 days, L = a week or more. "Gate" = something outside our control.

| Rank | Option | Impact | Effort | Legal / data source | Risks |
|---|---|---|---|---|---|
| 1 | **(b) District and region label layer**: zoom-dependent text drawn in the browser (not baked into tiles), with bands (regions at z0-4, districts z3.5-6, minor places z5+), a "Labels" toggle, search that finds districts and flies there | **High**: fixes "no district or suburb labels" immediately, hides base weakness, survives a base swap | **S-M** | Tier A: names Rockstar publishes (the six regions plus names already in `seed-pins.json` with `source: official`, e.g. Ocean Beach, Washington Beach, Little Cuba, Lake Leonida, Gambit Bay). Tier B: GTADB district names with record counts (Downtown, Salton, Southside, Crosstown, Rockridge, Peacock Bay, Tequesta, La Perle, Balsero, Stockyard, Bayside, Capri, Waning Sands, Watson Bay, Key Lento, Hamlet ...). CC BY with credit; label anchors from per-district centroids | Label positions only as good as the base (district-level). Fix: a data-driven file (`labels.json`, stored in pin space) so a base swap re-anchors them. Tier B needs the owner's provenance call (section 3) |
| 2 | **(d) Vendor, shop and service categories**: a `category` (subtype) on pins with a migration, grouped filters (Shops & Services, Vehicles, Properties, Activities, Travel, Emergency) with counts, per-category icons, "named places first" toggle | **High**: answers "no vendor pins", the biggest content gap vs GTA Boss | **M** (migration needs the owner's approval and Master to apply) | Seed from GTADB landmarks (about 790 named and active; categories `retail`, `restaurant`, `#gas`, `#supermarket`, `#guns`, `#hair`, `#bar`, `#nightclub`, `#safehouse`, `#fence`, `#marina`, `#metro`, `#airport`, `#racetrack` ...), mapped onto our taxonomy; official Rockstar-named businesses get `source: official`. Plus the community flow for new ones | Placement is district-level (section 3), so bulk-importing 700 pins puts many "off-street" on the art. Mitigation: ship the schema and UI first, import only the districts we have boxes for, keep `approximate`, and batch the rest with the official-map swap. Migration is irreversible-ish: needs a down path and owner sign-off |
| 3 | **(a1) Swap in Rockstar's official map when it appears** | **Very high** (right geography, labels, aligned GTADB points) | **M** (pipeline and `bases.ts` already exist) | Official only. Check the terms of use first | **Gate**: not out yet at my last check. Resolution may stop at about z4-5 (so pair with 4 and 5). May hold only landmarks and regions. Needs a fresh control-point fit and re-anchoring of 64 pins |
| 4 | **(a2) Clean the art we have** (targeted LaMa inpaint, no regeneration): remove the grid crosshair, leftover glyph clusters, Keys "X" airport blob and Port Gellhorn smudge | Medium (stops it looking broken) | **S-M** (pipeline in `scripts/art/`) | Owner's own art | Does not fix accuracy. Inpainting can add new artifacts. Re-tile is about 9 MB and a cache bust |
| 5 | **(a3) Honest deep zoom**: lower the native zoom cap to where real detail ends (about z5), disable or soften z6-7 overzoom (use `image-rendering` and a slight fade-to-flat past the cap), a small "illustrative base, not in-game streets" chip at z4+, and rely on labels and pins for detail | Medium (trades false detail for honest detail; pairs with 1 and 2) | **S** | Our own code | The owner may read a lower zoom cap as a regression. Pitch it as "labels and pins carry the detail now". Obsolete if option 3 lands |
| 6 | **(e) Cheap wins** (see section 5) | Medium | S each | Our own code and data | Low |
| 7 | **(c) Street-name layer** | Medium now, high later | **L** | Only about 27 street names exist in the GTADB data (Shore Dr, Catalan Blvd, Thompson Ave, Calderone Ave, Westbrook Dr, El Joven Blvd, SW 3rd/7th/9th Ave, Route 1, Miramar Dr ...), all from addresses of landmarks, not full road geometry. Longer term: names players verify in-game via the submit flow | Placing names on the AI streets would label non-existent roads. **Do not ship on the current base.** Revisit only with an accurate base and in-game verification |
| 8 | **(a4) Regenerate or "redraw" roads at z5+** (re-run AI, or vector-trace the AI roads, or trace from trailers) | Looks crisper, but **not accurate** | L | Re-running AI = fake streets again; tracing screenshots is partial and derivative; tracing the AI art just vectorises the fake | **Not recommended.** It buys sharpness, not truth, and adds the "fake precision" risk. Revisit only after the official map or after launch-based community data exists |

## 5. Cheap high-value extras (option e)

1. **Name labels beside pins at z6+** (collision-aware), so pins are not anonymous icons.
2. **"Named places first / show all"** toggle and a pin-density slider (pattern from Leonida Explorer).
3. **Deep links**: `?pin=<id>` and `#z/lat/lng` so places can be shared and linked from guides and news (SEO and traffic benefit).
4. **Real-life counterpart** on pin details (address text only, from GTADB, CC BY), e.g. "Inspired by Cardozo South Beach, Miami Beach".
5. **Mark as found** checklist stored on device (every competitor has it, and it needs no backend).
6. **Mobile**: collapse the search/filter card to one row and move "Submit a location" to a compact button; move attribution to a "i" popover.
7. **An "approximate base" tag** so the AI base never passes as the game's map.
8. **Map legend** with per-category icons and a link to `/sources`.
9. **Later**: measuring tool, a simple "route between two pins" (straight-line distance), and a layer for gas, metro and airports.

## 6. Recommended first PR

**PR A, "Map labels and base hygiene" (no schema change, no DB, no migration):**

1. Label layer (rank 1): `src/lib/map/labels.json` in pin space with `{ name, kind, x, y, minZoom, maxZoom, source }`, rendered as non-interactive text markers with zoom bands, and a "Labels" toggle in the filter card. Include the six regions (official), the names already official in the seed (Ocean Beach, Washington Beach, Little Cuba, VC Port, Lake Leonida, Gambit Bay), and a small Tier B set (about 12-15 districts: Downtown, Salton, Southside, Crosstown, Rockridge, Peacock Bay, Tequesta, Balsero, Stockyard, Capri, Waning Sands, Key Lento, Hamlet, Watson Bay) **only if the owner confirms the GTADB provenance point**. Otherwise ship Tier A only and add Tier B in a follow-up. Search should return and fly to labels.
2. Pin name labels at z6+ (extra 5.1).
3. Art cleanup (rank 4): inpaint the grid crosshair, leftover glyph clusters, and the two worst blobs; re-tile; bump the manifest version.
4. Honest deep zoom (rank 5): a soft zoom cap and an "illustrative base" chip.
5. Update `docs/DATA_CREDITS.md` and `/sources` for label sources.

Why this first: it directly addresses the owner's strongest, easiest-to-see complaints (no labels, junk at depth) and needs no database change or owner migration approval, so Master can QC and merge it quickly. Labels are stored in pin space, so they carry over to Rockstar's official map when it lands. Expected effort: M overall. Risk: Tier B label placement (district-level only) and the owner's provenance decision.

**PR B, "Vendor and service categories":** migration adding `category`, filters, icons, and a first batch of about 100-150 GTADB-seeded vendor and service pins (gas, supermarkets, guns, barbers, banks, marinas, metro, airports, mod shops) in the districts we already have boxes for. Needs the owner's approval of the migration. **PR C, "Official map swap":** as soon as Rockstar's map is published and its terms allow, add it as a base, re-fit control points, and re-anchor pins and labels, then retire the AI base at z5+ or keep it as an alternate.

Do not start PR C work by hand-tracing anything from the official map: use it as an image base, and read place names from it as labels.

## 7. Decisions needed from the owner

1. **GTADB provenance:** keep the current approval as is, or limit use to records matching an official screenshot? (The data has no per-record provenance, and GTADB says it may use leaks.)
2. **Zoom cap:** accept a lower zoom limit on the AI base (about z5) in exchange for honest detail?
3. **Official map terms:** who checks Rockstar's terms of use for hosting tiles of the printable map once it is out?
4. **Migration approval** for PR B (new pin `category` column).

## 8. Appendix: screenshots

| File | What it shows |
|---|---|
| `map-audit/01-overview-desktop.jpg` | Zoomed-out reference: fine overall, grid crosshair visible across the island |
| `map-audit/02-vice-city-downtown-z6.jpg` | Downtown z6: muddled interchanges, double-contour roads, anonymous pins |
| `map-audit/03-vice-beach-z7.jpg` | Vice Beach z7: blurry overzoom, chequerboard, no labels |
| `map-audit/04-vc-port-z6-fake-text.jpg` | Port z6: garbled fake text on the water left over from inpainting |
| `map-audit/05-port-gellhorn-z6.jpg` | Port Gellhorn z6: white blob, brown smudge, nothing resembling a town |
| `map-audit/06-leonida-keys-z6.jpg` | Leonida Keys main island z6: brown "X" runways on a white blob, grid lines |
| `map-audit/07-grassrivers-z6.jpg` | Grassrivers z6: noise instead of wetlands, one pin on screen |
| `map-audit/08-mobile-vice-beach-z7.jpg` | Mobile z7: a few blurry blocks fill the screen, UI chrome overlaps |

Capture script: `/workspace/e2e-v2/audit-shots.mjs` (reads the Leaflet instance from the React fiber of `.leaflet-container`, then `setView` per area and zoom). Not part of this PR.
