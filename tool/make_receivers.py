#!/usr/bin/env python3
"""Candidate heat receivers (and arena ice plants, which are also heat sources) for Vancouver and Edmonton,
from Statistics Canada open databases (Open Government Licence – Canada):
  ODSRF v2 (sport and recreation, released 24 Sep 2026) — recreation centres, pools, indoor arenas
  ODHF v1 (health, published Apr 2020)                   — hospitals, nursing and residential care
  ODEF v2.1 (education, published Nov 2022)              — schools
Out: tool/receivers_van.json, tool/receivers_edm.json  [{t, n, lon, lat, src}]
Outdoor community-league rinks are left out (no heating load); records without coordinates are counted, not guessed."""
import csv, json, os, sqlite3, collections, pyproj
from shapely import wkb
H = os.path.dirname(os.path.abspath(__file__)); X = os.path.join(H, '..', 'data', 'raw', 'receivers', 'x')
CITY = {'Vancouver': 'van', 'Edmonton': 'edm'}
out = {k: [] for k in CITY.values()}; skipped = collections.Counter()

tf = pyproj.Transformer.from_crs(3347, 4326, always_xy=True)
def gpkg_point(b):
    env = {0: 0, 1: 32, 2: 48, 3: 48, 4: 64}[(b[3] >> 1) & 7]
    g = wkb.loads(bytes(b[8 + env:])); p = g if g.geom_type == 'Point' else g.representative_point()
    return tf.transform(p.x, p.y)
c = sqlite3.connect(os.path.join(X, 'odsrf_v2.gpkg'))
T = {'Swimming': 'pool', 'Arena or stadium': 'arena', 'Recreation centre': 'rec'}
for g, name, typ, csd in c.execute("select geom,name,type,csdname from odsrf_v2 where csdname in ('Vancouver','Edmonton') and type in ('Swimming','Arena or stadium','Recreation centre')"):
    lon, lat = gpkg_point(g)
    out[CITY[csd]].append(dict(t=T[typ], n=name or '', lon=round(lon, 6), lat=round(lat, 6), src='odsrf'))

H_T = {'Hospitals': 'hospital', 'Nursing and residential care facilities': 'care'}
for r in csv.DictReader(open(os.path.join(X, 'odhf_v1.csv'), encoding='cp1252')):
    if r['CSDname'] not in CITY or r['odhf_facility_type'] not in H_T: continue
    if not r['latitude']: skipped[(r['CSDname'], H_T[r['odhf_facility_type']], 'no location in source')] += 1; continue
    out[CITY[r['CSDname']]].append(dict(t=H_T[r['odhf_facility_type']], n=r['facility_name'].title(), lon=round(float(r['longitude']), 6), lat=round(float(r['latitude']), 6), src='odhf'))

for r in csv.DictReader(open(os.path.join(X, 'ODEF_v2.1_EN', 'ODEF_v2_1.csv'), encoding='latin-1')):
    if r['CSDNAME'] not in CITY or r['Facility_Type'] in ('StrongStart BC', 'ECS Private Operator'): continue
    if not r['Latitude']: skipped[(r['CSDNAME'], 'school', 'no location in source')] += 1; continue
    out[CITY[r['CSDNAME']]].append(dict(t='school', n=r['Facility_Name'], lon=round(float(r['Longitude']), 6), lat=round(float(r['Latitude']), 6), src='odef'))

# City of Vancouver non-market housing (open data export, 15 Oct 2026): units = sum of the design_* counts
for r in json.load(open(os.path.join(H, '..', 'data', 'raw', 'van', 'non-market-housing.json'), encoding='utf-8')):
    g = (r.get('geom') or {}).get('geometry')
    if not g: skipped[('Vancouver', 'housing', 'no location in source')] += 1; continue
    u = sum(v for k, v in r.items() if k.startswith('design_') and isinstance(v, (int, float)))
    st = (r.get('project_status') or '').lower()
    out['van'].append(dict(t='housing', n=r.get('name') or '', lon=round(g['coordinates'][0], 6), lat=round(g['coordinates'][1], 6), src='vanNMH', u=int(u), s=st, y=r.get('occupancy_year') or ''))

NETS = {'van': [dict(n='Neighbourhood Energy Utility (NEU)', op='City of Vancouver', kind='compulsory', src='van9552',
          ring=json.load(open(os.path.join(H, '..', 'data', 'networks', 'van_neu_9552_traced.geojson')))['geometry']['coordinates'][0],
          note='Traced from By-law 9552 Schedule A (±45 m). New buildings and major alterations inside must take NEU heat unless the City Engineer finds it not practical or economical (s. 2.1). Heat sent back is credited at 50% of $65.172/MWh. About 70% renewable, mostly sewage heat recovery; network at 65 °C minimum, 45 °C maximum return.')],
        'edm': []}
for k, v in out.items():
    json.dump(v, open(os.path.join(H, f'receivers_{k}.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
    os.makedirs(os.path.join(H, 'tiles', k), exist_ok=True)
    json.dump(dict(pts=v, nets=NETS[k]), open(os.path.join(H, 'tiles', k, 'receivers.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
    print(k, len(v), dict(collections.Counter(x['t'] for x in v)))
print('skipped:', dict(skipped))
