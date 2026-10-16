#!/usr/bin/env python3
"""Census 2021 population on a 100 m grid for the tool's two map areas.

In:  data/raw/census/census2021_DA_selected_Vancouver_Edmonton_regions.csv  (selected Census Profile 2021 characteristics,
       dissemination areas in CD 5915 Greater Vancouver and CD 4811 Division No. 11; extracted on J.B.'s computer
       from 98-401-X2021006 BC and Prairies files)
     data/raw/census/lda_000b21a_e.zip  (2021 dissemination-area cartographic boundaries, Statistics Canada 92-160-X)
Out: tool/census_van.json, tool/census_edm.json
     cells of 100 m in the tool's local projection; each DA's counts are spread over its area (uniform within the DA,
     an assumption) and summed per cell. Counts are Statistics Canada's randomly rounded figures; suppressed values count as 0.
Fields per cell: x, y (cell index), pop, age 65+, age 0–14, households, renter households, households spending 30%+ of
income on shelter, people in low income (LIM-AT % × population, an approximation)."""
import os, csv, json, math, zipfile, tempfile
import fiona, shapely, pyproj
from shapely.geometry import shape, box
from shapely.ops import transform  # noqa
H = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(H)
RAW = os.path.join(ROOT, 'data', 'raw', 'census')
C = 100.0
vals = {}
for r in csv.DictReader(open(os.path.join(RAW, 'census2021_DA_selected_Vancouver_Edmonton_regions.csv'))):
    f = lambda k: float(r[k]) if r[k] not in ('', 'x', 'F', '..', '...') else 0.0
    pop = f('pop2021')
    vals[r['dauid']] = (pop, f('age_65plus'), f('age_0_14'), f('households'), f('renter'), f('shelter_30pct_plus'), pop * f('lim_at_pct') / 100.0)
tmp = tempfile.mkdtemp()
zipfile.ZipFile(os.path.join(RAW, 'lda_000b21a_e.zip')).extractall(tmp)
src = fiona.open(os.path.join(tmp, 'lda_000b21a_e.shp'))
to_ll = pyproj.Transformer.from_crs(src.crs_wkt, 4326, always_xy=True)
for city, cd in (('van', '5915'), ('edm', '4811')):
    meta = json.load(open(os.path.join(H, 'tiles', city, 'meta.json')))
    k = math.cos(math.radians(meta['lat0'])) * 111320.0
    def proj(x, y, z=None):
        lon, lat = to_ll.transform(x, y)
        return ((lon - meta['lon0']) * k, (lat - meta['lat0']) * 110540.0)
    tiles = [f for f in os.listdir(os.path.join(H, 'tiles', city)) if f.startswith('t_')]
    ij = [tuple(map(int, f[2:-5].split('_'))) for f in tiles]; T = meta['T']
    ext = box(min(i for i, j in ij) * T, min(j for i, j in ij) * T, (max(i for i, j in ij) + 1) * T, (max(j for i, j in ij) + 1) * T)
    cells = {}; n = 0
    for feat in src.filter():
        da = feat['properties']['DAUID']
        if not da.startswith(cd) or da not in vals: continue
        g = transform(proj, shape(feat['geometry']))
        if not g.intersects(ext): continue
        n += 1; A = g.area; v = vals[da]
        if A <= 0 or v[0] == 0 and v[3] == 0: continue
        x0, y0, x1, y1 = g.bounds
        for ix in range(int(math.floor(x0 / C)), int(math.floor(x1 / C)) + 1):
            for iy in range(int(math.floor(y0 / C)), int(math.floor(y1 / C)) + 1):
                a = g.intersection(box(ix * C, iy * C, ix * C + C, iy * C + C)).area
                if a <= 0: continue
                w = a / A; c = cells.setdefault((ix, iy), [0.0] * 7)
                for t in range(7): c[t] += v[t] * w
    out = [[ix, iy] + [round(x, 1) for x in c] for (ix, iy), c in cells.items() if c[0] >= 0.5]
    json.dump({'cell': C, 'fields': ['pop', 'age65', 'age0_14', 'households', 'renters', 'shelter30', 'lowincome'],
               'source': 'Statistics Canada, Census of Population 2021 (98-401-X2021006) and DA boundaries (92-160-X); spread uniformly within each dissemination area; cells under 0.5 people dropped (about 0.1% of people in the Vancouver area, 1.4% in the Edmonton area, mostly rural)',
               'cells': out}, open(os.path.join(H, 'census_%s.json' % city), 'w'), separators=(',', ':'))
    print(city, 'DAs', n, 'cells', len(out), 'pop', round(sum(c[2] for c in out)))
