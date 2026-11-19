"""Builds src/lib/map/labels.json: the district / region / water labels drawn on the map.

DATA RULE: every NAME comes from official Rockstar material (rockstargames.com/VI pages), and the file records the page and
the wording it comes from (`sourceUrl`, `sourceQuote`). Rockstar publishes no coordinates, so every POSITION is approximate:
  * regions reuse the position of their region chip (the `anchor` seed pin);
  * places that already have an official-name pin sit under that pin (`anchor`);
  * the rest are placed by direction only, using the relative layout of the community GTADB.org landmark data (CC BY 4.0,
    credited in docs/DATA_CREDITS.md) -- but only where the district NAME also appears on official Rockstar pages.
Nothing from unverifiable or leak-derived records is used. Fewer labels beat unverified ones: places Rockstar names but nobody
can place (e.g. Gambit Bay) get no label.

Positions below are written as art-base source pixels (what you see on the map) and converted to the stored pin space, so the
same label lands in the same place on both bases. Run:  python3 scripts/art/build_labels.py
"""
import json, os

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
T = json.load(open(os.path.join(ROOT, 'src/lib/map/pin-transform-art.json')))
SEEDS = {p['id']: p for p in json.load(open(os.path.join(ROOT, 'src/lib/map/seed-pins.json')))}
P = T['points']
TRIS = [(P[i], P[j], P[k]) for i, j, k in T['triangles']]

def bary(p, a, b, c):
    d = (b[1]-c[1])*(a[0]-c[0]) + (c[0]-b[0])*(a[1]-c[1])
    w1 = ((b[1]-c[1])*(p[0]-c[0]) + (c[0]-b[0])*(p[1]-c[1]))/d
    w2 = ((c[1]-a[1])*(p[0]-c[0]) + (a[0]-c[0])*(p[1]-c[1]))/d
    return w1, w2, 1-w1-w2

def art_to_pin(sx, sy):
    best = None
    for t in TRIS:
        a, b, c = (q['art'] for q in t)
        w = bary((sx, sy), a, b, c)
        m = min(w)
        if best is None or m > best[0]:
            best = (m, w, t)
        if m >= 0: break
    _, w, t = best
    x = sum(wi*q['legacy'][0] for wi, q in zip(w, t)); y = sum(wi*q['legacy'][1] for wi, q in zip(w, t))
    return round(x, 1), round(y, 1)

VC = 'https://www.rockstargames.com/VI/vice-city'
UE = 'https://www.rockstargames.com/VI/ultimate-edition'
GTADB = 'GTADB.org landmark data (CC BY 4.0, rev 8b1dc4f): direction only'

def region(seed, name, url, quote, minz=0):
    s = SEEDS[seed]
    return dict(id='label-' + seed.removeprefix('seed-'), name=name, kind='region', x=s['x'], y=s['y'], anchor=seed, minZoom=minz,
                approximate=False, source='official', sourceUrl=url, sourceQuote=quote, placement='Region chip position (same as the region pin)')

def at_pin(seed, name, kind, url, quote, minz):
    """Label for a place that already has an official-name pin: sits just under that pin (same approximate position)."""
    s = SEEDS[seed]
    return dict(id='label-' + seed.removeprefix('seed-'), name=name, kind=kind, x=s['x'], y=s['y'], anchor=seed, minZoom=minz,
                approximate=True, source='official', sourceUrl=url, sourceQuote=quote,
                placement='Under the matching pin (approximate position; Rockstar publishes no coordinates)')

def by_direction(id, name, kind, art, url, quote, note, minz):
    x, y = art_to_pin(*art)
    return dict(id='label-' + id, name=name, kind=kind, x=x, y=y, minZoom=minz, approximate=True, source='official', sourceUrl=url,
                sourceQuote=quote, placement=GTADB + ' (' + note + ')')

LABELS = [
    region('seed-vice-city', 'Vice City', VC, 'Vice City, USA. ... the sun and fun capital of America'),
    region('seed-leonida-keys', 'Leonida Keys', VC, 'Explore Leonida Keys'),
    region('seed-grassrivers', 'Grassrivers', VC, 'Explore Grassrivers'),
    region('seed-port-gellhorn', 'Port Gellhorn', VC, 'Explore Port Gellhorn'),
    region('seed-ambrosia', 'Ambrosia', VC, 'Explore Ambrosia'),
    region('seed-mount-kalaga', 'Mount Kalaga', VC, 'Explore Mount Kalaga (Mount Kalaga National Park)'),
    # Places with an official-name pin already: the label sits under that pin.
    at_pin('seed-ocean-beach', 'Ocean Beach', 'district', VC, 'the pastel art deco hotels and bright white sands of Ocean Beach', 4.0),
    at_pin('seed-washington-beach', 'Washington Beach', 'district', UE, 'this gradient pink and blue Squalo docked at Washington Beach', 4.0),
    at_pin('seed-little-cuba', 'Little Cuba', 'district', VC, 'the bustling panaderias of Little Cuba', 4.25),
    at_pin('seed-tisha-wocka', 'Tisha-Wocka', 'place', VC, 'the bootleg brands of the Tisha-Wocka flea market', 5.0),
    at_pin('seed-vc-port', 'VC Port', 'place', VC, 'out to the VC Port, the cruise ship capital of the world', 4.5),
    at_pin('seed-allied-crystal', 'Allied Crystal', 'place', VC, 'The Allied Crystal sugar refinery provides the jobs', 4.25),
    at_pin('seed-lake-leonida', 'Lake Leonida', 'water', UE, 'This mod shop in Lake Leonida specializes in off-road modifications', 4.0),
    # Official district names with no pin: placed by direction only.
    by_direction('stockyard', 'Stockyard', 'district', (4980, 4560), UE, "Stockyard's premier destination for elevated streetwear", 'north of downtown', 4.25),
    by_direction('southside', 'Southside', 'district', (4400, 6650), UE, "one of Southside Vice City's loudest and most socially active gangs", 'south-west of downtown', 4.25),
]

out = dict(
    version=1,
    note='Official place names only (see scripts/art/build_labels.py and docs/DATA_CREDITS.md). Positions are approximate pin-space coordinates; regions use their chip anchor.',
    labels=LABELS,
)
path = os.path.join(ROOT, 'src/lib/map/labels.json')
json.dump(out, open(path, 'w'), indent=2, ensure_ascii=False); open(path, 'a').write('\n')
print(len(LABELS), 'labels ->', path)
