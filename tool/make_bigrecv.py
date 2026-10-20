#!/usr/bin/env python3
"""Apartments, offices and other large buildings as heat receivers (J.B., 19 Oct 2026). Run after dedupe_receivers.py.
Same size thresholds in both cities: the ones Vancouver's GHG limits by-law uses for reporting — commercial ≥ 50,000 ft² (4,645 m²),
multi-family and hotels ≥ 100,000 ft² (9,290 m²).
Vancouver: buildings whose owners disclosed their 2025 report (City reporting map, Disclosed Data, exported 18 Oct 2026; via make_gfa_reported.py,
  data/gfa_van_bld.json): reported gross floor area × reported Annual Heat Energy Intensity (GJ/m²) = MEASURED heat use (owner-reported).
  Other buildings over the thresholds: BC Assessment estimate (see CAL below).
Edmonton: City property assessment 2026 (open data), grouped by parcel: "Other Residential" (Bylaw 21442 s. 2(n): four or more self-contained
  dwelling units) and "Commercial" accounts, gross area summed; ESTIMATED heat use = gross area × space + water heating intensity:
  residential 0.777 GJ/m² (CEUD 2023 Alberta residential Table 2, 2018–22 average; all dwellings, so likely high for apartments),
  commercial 1.40 GJ/m² (CEUD 2023 Alberta commercial, heating-only, register receiver_demand). Strata condominiums are assessed as
  "Residential" unit by unit and are not caught here.
Run order: dedupe_receivers.py, then this, then lot_dedupe.py (one lot, one count).
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
# Vancouver, the rest: BC Assessment (J.B. 20 Oct 2026). Derived on J.B.'s computer by bca/bca_derive.py (rounded heat per parcel, use group,
# and a yes/no for the same size thresholds; no BCA field leaves her computer). Heat = homes x 16.81 MWh, other floor area x CEUD 2023 BC intensity.
# Checked against the City's owner-reported buildings (printed below): the estimate is typically about 1.7x the measured use, so it is shown as
# a range: estimate / that factor to the estimate (J.B. 20 Oct 2026). Edmonton's estimate is the same kind (provincial averages) and gets the same
# range; the check could only be made in Vancouver (Edmonton publishes no measured building heat).
CAL = 1.6
BCA = os.path.join(D, 'bca', 'bca_derived_van.json')
if os.path.exists(BCA):
    from shapely.geometry import shape
    bca = json.load(open(BCA))['parcels']
    F = json.load(open(os.path.join(D, 'vancouver_parcels_2026.geojson'), encoding='utf-8'))['features']
    loc, a2tc = {}, {}
    for ft in F:
        tc = ft['properties'].get('tax_coord'); a = (ft['properties'].get('address') or '').upper()
        if a: a2tc.setdefault(a, tc)
        if tc in bca and bca[tc]['b'] and tc not in loc:
            pt = shape(ft['geometry']).representative_point(); loc[tc] = (round(pt.x, 6), round(pt.y, 6), ft['properties'].get('address') or '')
    rat = sorted(bca[a2tc[b['addr'].upper()]]['h'] / (b['gfa'] * b['hei'] / 3.6) for b in B.values() if b['hei'] and a2tc.get(b['addr'].upper()) in bca)
    if rat: CAL = round(rat[len(rat) // 2], 1)  # the factor is the check's median, rounded (1.7 on 20 Oct 2026, after the strata fix)
    if rat: print('check, BCA estimate / measured: n', len(rat), 'median', round(rat[len(rat) // 2], 2), 'quartiles', round(rat[len(rat) // 4], 2), round(rat[3 * len(rat) // 4], 2))
    for tc, (lon, lat, addr) in loc.items():
        v = bca[tc]
        new['van'].append(dict(t='apartment' if v['g'] == 'apartment' else 'commercial', n=addr.title() or 'Unnamed', lon=lon, lat=lat, src='vanBCA',
                               dem=round(v['h']), lo=round(v['h'] / CAL), meas=0))  # heating type left out: close to a raw BCA field, and Vancouver only
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
    new['edm'].append(dict(t=t, n=g['addr'].title() or 'Unnamed', lon=round(g['lon'], 6), lat=round(g['lat'], 6), src='edmAssess', fa=round(fa), dem=round(dem), lo=round(dem / CAL), meas=0))
for c, L in new.items():
    path = os.path.join(H, 'tiles', c, 'receivers.json'); Dj = json.load(open(path))
    keep = [p for p in Dj['pts'] if p.get('src') not in ('vanGHGrep', 'edmAssess', 'vanBCA')]
    xy = [fwd(c, p['lon'], p['lat']) for p in keep]; added = 0
    for p in L:  # measured buildings come first; an estimate within 40 m of one is dropped
        x, y = fwd(c, p['lon'], p['lat'])
        if any((x - a) ** 2 + (y - b) ** 2 < 40 ** 2 for a, b in xy): continue
        keep.append(p); added += 1
        if p.get('meas'): xy.append((x, y))
    Dj['pts'] = keep
    json.dump(Dj, open(path, 'w'), ensure_ascii=False, separators=(',', ':'))
    json.dump(keep, open(os.path.join(H, f'receivers_{c}.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
    print(c, 'candidates', len(L), 'added', added, collections.Counter(p['t'] for p in L))
