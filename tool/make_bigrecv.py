#!/usr/bin/env python3
"""Apartments, offices and other large buildings as heat receivers (J.B., 19 Oct 2026). Run after dedupe_receivers.py.
Same size thresholds in both cities: the ones Vancouver's GHG limits by-law uses for reporting — commercial ≥ 50,000 ft² (4,645 m²),
multi-family and hotels ≥ 100,000 ft² (9,290 m²).
Vancouver: buildings whose owners disclosed their 2025 report (City reporting map, Disclosed Data, exported 18 Oct 2026; via make_gfa_reported.py,
  data/gfa_van_bld.json): reported gross floor area × reported Annual Heat Energy Intensity (GJ/m²) = MEASURED heat use (owner-reported).
  Buildings below the thresholds, or whose owners did not disclose, are not listed (BC Assessment data to follow).
Edmonton: City property assessment 2026 (open data), grouped by parcel: "Other Residential" (Bylaw 21442 s. 2(n): four or more self-contained
  dwelling units) and "Commercial" accounts, gross area summed; ESTIMATED heat use = gross area × space + water heating intensity:
  residential 0.777 GJ/m² (CEUD 2023 Alberta residential Table 2, 2018–22 average; all dwellings, so likely high for apartments),
  commercial 1.40 GJ/m² (CEUD 2023 Alberta commercial, heating-only, register receiver_demand). Strata condominiums are assessed as
  "Residential" unit by unit and are not caught here.
Skipped where an existing receiver (school, hospital, housing…) lies within 40 m. Writes into tiles/<city>/receivers.json (pts) and receivers_<city>.json."""
import json, os, csv, math, collections
H = os.path.dirname(os.path.abspath(__file__)); D = os.path.join(H, '..', 'data')
CITY = {'van': dict(lat0=49.25, lon0=-123.12), 'edm': dict(lat0=53.54, lon0=-113.50)}
COM, RES = 4645, 9290
def inv(c, x, y):
    k = math.cos(math.radians(CITY[c]['lat0'])) * 111320.0
    return round(x / k + CITY[c]['lon0'], 6), round(y / 110540.0 + CITY[c]['lat0'], 6)
def fwd(c, lon, lat):
    k = math.cos(math.radians(CITY[c]['lat0'])) * 111320.0
    return (lon - CITY[c]['lon0']) * k, (lat - CITY[c]['lat0']) * 110540.0
USE = {'multifamily housing': 'apartment', 'senior living community': 'apartment', 'residential care facility': None, 'hotel': 'hotel', 'office': 'office',
       'medical office': 'office', 'financial office': 'office', 'college/university': None, 'k-12 school': None, 'hospital (general medical & surgical)': None}
new = {'van': [], 'edm': []}
# Vancouver
B = json.load(open(os.path.join(D, 'gfa_van_bld.json')))
for bid, b in B.items():
    t = USE.get(b['use'], 'commercial')
    if t is None or not b['hei']: continue
    big = b['gfa'] >= (RES if t in ('apartment', 'hotel') else COM)
    if not big: continue
    lon, lat = inv('van', b['x'], b['y'])
    new['van'].append(dict(t=t, n=b['n'].title(), lon=lon, lat=lat, src='vanGHGrep', fa=b['gfa'], dem=round(b['gfa'] * b['hei'] / 3.6), meas=1, use=b['use']))
# Edmonton
G = collections.OrderedDict()
for r in csv.DictReader(open(os.path.join(D, 'edmonton_properties_2026.csv'), encoding='utf-8')):
    if r['class1'] not in ('OTHER RESIDENTIAL', 'COMMERCIAL') or not r['lat']: continue
    pid = r['parcel_point_id'] or ('a' + r['account']); g = G.setdefault(pid, dict(lat=float(r['lat']), lon=float(r['lon']), res=0.0, com=0.0, addr=(r['house_number'] + ' ' + r['street']).strip()))
    a = float(r['gross_area_m2'] or 0)
    if r['class1'] == 'OTHER RESIDENTIAL': g['res'] += a
    else: g['com'] += a
for pid, g in G.items():
    t = 'apartment' if g['res'] >= RES and g['res'] >= g['com'] else 'commercial' if g['com'] >= COM else None
    if not t: continue
    fa = g['res'] if t == 'apartment' else g['com']; dem = fa * (0.777 if t == 'apartment' else 1.40) / 3.6
    new['edm'].append(dict(t=t, n=g['addr'].title() or 'Unnamed', lon=round(g['lon'], 6), lat=round(g['lat'], 6), src='edmAssess', fa=round(fa), dem=round(dem), meas=0))
for c, L in new.items():
    path = os.path.join(H, 'tiles', c, 'receivers.json'); Dj = json.load(open(path))
    keep = [p for p in Dj['pts'] if p.get('src') not in ('vanGHGrep', 'edmAssess')]
    xy = [fwd(c, p['lon'], p['lat']) for p in keep]; added = 0
    for p in L:
        x, y = fwd(c, p['lon'], p['lat'])
        if any((x - a) ** 2 + (y - b) ** 2 < 40 ** 2 for a, b in xy): continue
        keep.append(p); added += 1
    Dj['pts'] = keep
    json.dump(Dj, open(path, 'w'), ensure_ascii=False, separators=(',', ':'))
    json.dump(keep, open(os.path.join(H, f'receivers_{c}.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
    print(c, 'candidates', len(L), 'added', added, collections.Counter(p['t'] for p in L))
