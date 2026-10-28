#!/usr/bin/env python3
"""Method v5 inputs (J.B., 26 Oct 2026): turns the raw downloads into one small file per city, v5_inputs/v5_<city>.json.
Every list is [lon, lat, ...]; sources and dates are in factors.csv. Raw files stay out of git (paths below are this session's copies).
Run: python3 prep_v5.py"""
import csv, json, os, collections, zipfile, io
H = os.path.dirname(os.path.abspath(__file__)); V = os.path.join(H, 'v5_inputs')
U = '/root/.claude/uploads/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b'; L = '/mnt/user-data/uploads/Claude Link'; DL = '/home/claude/dl'
BOX = {'van': (-123.235, 49.195, -123.02, 49.32), 'edm': (-113.72, 53.39, -113.27, 53.72)}
inb = lambda c, lon, lat: BOX[c][0] <= lon <= BOX[c][2] and BOX[c][1] <= lat <= BOX[c][3]
csv.field_size_limit(10**9)
out = {c: collections.defaultdict(list) for c in BOX}; log = collections.Counter()

def add(c, key, lon, lat, *rest):
    if inb(c, lon, lat): out[c][key].append([round(lon, 6), round(lat, 6), *rest]); log[(c, key)] += 1

# ---- year-round heat users ('anchors'): [lon, lat, kind]
for r in csv.DictReader(open(os.path.join(V, 'bc_hospitals_vancouver.csv'))): add('van', 'anchors', float(r['lon']), float(r['lat']), 'hospital')
for r in csv.DictReader(open(os.path.join(V, 'edm_hospitals_odhf.csv'))): add('edm', 'anchors', float(r['lon']), float(r['lat']), 'hospital')
for r in csv.DictReader(open(os.path.join(V, 'bc_postsecondary_vancouver.csv'))): add('van', 'anchors', float(r['lon']), float(r['lat']), 'campus')
for r in csv.DictReader(open(os.path.join(V, 'edm_postsecondary_odef.csv'))): add('edm', 'anchors', float(r['lon']), float(r['lat']), 'campus')
VB = {'Hotel or Motel': 'hotel', 'Food Manufacturer Assembler and Processor': 'food', 'Laundry Services': 'laundry', 'Recycling and Resource Recovery Services': 'recycler'}
for r in csv.DictReader(open(os.path.join(U, '2e6a660f-van_bizlic_heat_extract.csv'), encoding='utf-8-sig')):
    k = VB.get(r['BusinessType']); g = r['geo_point_2d']
    if not k or r['Status'] != 'Issued' or not g: continue
    lat, lon = map(float, g.split(','))
    add('van', 'recyclers' if k == 'recycler' else 'anchors', lon, lat, k)
EB = {'Hotel / Motel': 'hotel', 'Food Processing / Catering Service': 'food', 'Scrap Metal Dealer and Recycler': 'recycler', 'Cannabis Cultivation Facility': 'cannabis'}   # v5.1: indoor cannabis growers
for r in csv.DictReader(open(os.path.join(U, 'e86e0505-City_of_Edmonton_-_Business_Licences_20261026.csv'), encoding='utf-8-sig')):
    cats = [x.strip() for x in r['Business Licence Category'].split(';')]
    try: lat, lon = float(r['Latitude']), float(r['Longitude'])
    except ValueError: continue
    for cat in cats:
        k = EB.get(cat)
        if k: add('edm', 'recyclers' if k == 'recycler' else 'anchors', lon, lat, k); break
# rinks: Vancouver parks facilities (FacilityType contains 'Rink' or 'Ice'), joined to park locations; Edmonton ODRSF arena / rink
pk = {}
for ft in json.load(open(os.path.join(U, '6293a853-parks.geojson')))['features']:
    p = ft['properties']; g = ft.get('geometry')
    gp = p.get('googlemapdest') or p.get('geo_point_2d')
    if g and g.get('type') == 'Point': pk[p['parkid']] = g['coordinates']
    elif isinstance(gp, dict): pk[p['parkid']] = [gp['lon'], gp['lat']]
    elif isinstance(gp, str) and ',' in gp: a, b = map(float, gp.split(',')); pk[p['parkid']] = [b, a]
for r in csv.DictReader(open(os.path.join(U, 'fb375160-parks-facilities.csv'), encoding='utf-8-sig'), delimiter=';'):
    t = r['FacilityType'].lower()
    if ('rink' in t or 'ice' in t) and 'roller' not in t and int(r['ParkID']) in pk:
        lon, lat = pk[int(r['ParkID'])]; add('van', 'anchors', lon, lat, 'rink')
for r in csv.DictReader(open(os.path.join(DL, 'odrsf/ODRSF_V1.0/ODRSF_v1.0.csv'), encoding='utf-8-sig', errors='replace')):
    if r['CSD_Name'] != 'Edmonton': continue
    try: lat, lon = float(r['Latitude']), float(r['Longitude'])
    except ValueError: continue
    if r['ODRSF_facility_type'] in ('arenas', 'arena'): add('edm', 'anchors', lon, lat, 'rink')   # arenas only: ODRSF 'rink' in Edmonton includes outdoor rinks
    if r['ODRSF_facility_type'] in ('community centres', 'community centre'): add('edm', 'partners', lon, lat, 'community centre')
    elif 'curling' in r['Facility_Name'].lower() and r['ODRSF_facility_type'] == 'rink': add('edm', 'anchors', lon, lat, 'rink')   # v5.1: indoor curling clubs
# ---- partners for public rooms and a cooling refuge: libraries + community centres
for r in csv.DictReader(open(os.path.join(U, '952a03f3-libraries_1.csv'), encoding='utf-8-sig'), delimiter=';'):
    if r['NAME'] == 'Outreach Services': continue
    a, b = map(float, r['geo_point_2d'].split(',')); add('van', 'partners', b, a, 'library')
for r in csv.DictReader(open(os.path.join(U, '07ff2ad5-community-centres_1.csv'), encoding='utf-8-sig'), delimiter=';'):
    a, b = map(float, r['geo_point_2d'].split(',')); add('van', 'partners', b, a, 'community centre')
# v5.1: Vancouver neighbourhood houses with a published address (ANHBC contact page, 26 Oct 2026), located by matching the address to the 2026 parcels.
# The eight ANHBC-run houses (Arbutus, Cedar Cottage, Frog Hollow, Gordon, Kitsilano, Marpole Place, Mount Pleasant, South Vancouver) have no address on that page, and Downtown Eastside (573 E Hastings) did not match a 2026 parcel address: not yet added.
for nm, lon, lat in (('Little Mountain', -123.101409, 49.249686), ('Collingwood', -123.032856, 49.23658), ('Kiwassa', -123.055853, 49.286002)): add('van', 'partners', lon, lat, 'neighbourhood house')
seen = set()
for r in csv.DictReader(open(os.path.join(U, 'fe8c73c5-Public_Libraries_20261026.csv'), encoding='utf-8-sig')):
    k = (r['Latitude'], r['Longitude'])
    if k in seen: continue
    seen.add(k); add('edm', 'partners', float(r['Longitude']), float(r['Latitude']), 'library')
# ---- v5.2: child care (heat users), shelters (partners), fire halls (resilience; recorded, not scored)
for r in csv.DictReader(open(os.path.join(U, 'a1e4d32c-childcare_locations.csv'), encoding='utf-8-sig')):
    if r['CITY'].strip().lower() == 'vancouver' and r['SERVICE_TYPE_CD'] == 'Licensed Group' and r['IS_DUPLICATE'] != 'Y' and r['LATITUDE']:
        add('van', 'anchors', float(r['LONGITUDE']), float(r['LATITUDE']), 'childcare')
for r in csv.DictReader(open(os.path.join(V, 'edm_childcare_geocoded.csv'))): add('edm', 'anchors', float(r['lon']), float(r['lat']), 'childcare')
for r in csv.DictReader(open(os.path.join(U, '4c058a10-homeless-shelter-locations.csv'), encoding='utf-8-sig'), delimiter=';'):
    a, b = map(float, r['geo_point_2d'].split(',')); add('van', 'partners', b, a, 'shelter')
for r in csv.DictReader(open(os.path.join(U, '4cbc5fb0-fire-halls.csv'), encoding='utf-8-sig'), delimiter=';'):
    a, b = map(float, r['geo_point_2d'].split(',')); add('van', 'fire', b, a, r['Name'])
for ft in json.load(open(os.path.join(U, 'efe255db-Fire_Stations_20261026.geojson')))['features']:
    lon, lat = ft['geometry']['coordinates']; add('edm', 'fire', lon, lat, 'No ' + str(ft['properties']['name']))
# ---- v5.3: big facilities with steady year-round heat or humidity loads (conservatories, zoo, aquarium, museums, exhibition halls)
# coordinates: Wikipedia infobox (Muttart, Vancouver Aquarium, Expo Centre, Science World, Royal Alberta Museum, Valley Zoo, Bloedel), checked 26 Oct 2026;
# addresses on the operators' or cities' own pages. TELUS World of Science (11211 142 St NW) left out: no coordinates found yet.
BIG = {'van': [('Bloedel Conservatory', -123.1138, 49.2421), ('Vancouver Aquarium', -123.131053, 49.300586), ('Science World', -123.103767, 49.273251)],
       'edm': [('Muttart Conservatory', -113.47650, 53.53522), ('Edmonton Valley Zoo', -113.55389, 53.51139), ('Edmonton Expo Centre', -113.45806, 53.56861), ('Royal Alberta Museum', -113.48885, 53.5470651)]}
for c, LST in BIG.items():
    for nm, lon, lat in LST: add(c, 'anchors', lon, lat, 'big')
# ---- transit: [lon, lat, 'rapid'|'bus']; rapid = rail, LRT, SeaBus (route_type 0, 1, 2, 4)
for c, d in (('van', 'vgtfs'), ('edm', 'egtfs')):
    P = os.path.join(DL, d); rt = {r['route_id']: int(r['route_type']) for r in csv.DictReader(open(os.path.join(P, 'routes.txt'), encoding='utf-8-sig'))}
    tr = {r['trip_id']: rt[r['route_id']] for r in csv.DictReader(open(os.path.join(P, 'trips.txt'), encoding='utf-8-sig'))}
    rapid = set()
    for r in csv.DictReader(open(os.path.join(P, 'stop_times.txt'), encoding='utf-8-sig')):
        if tr.get(r['trip_id']) in (0, 1, 2, 4): rapid.add(r['stop_id'])
    st = {r['stop_id']: r for r in csv.DictReader(open(os.path.join(P, 'stops.txt'), encoding='utf-8-sig'))}
    for sid, r in st.items():
        if r.get('location_type', '0') not in ('', '0'): continue
        par = r.get('parent_station') or ''
        add(c, 'transit', float(r['stop_lon']), float(r['stop_lat']), 'rapid' if sid in rapid or par in rapid else 'bus')
# ---- fibre: PeeringDB facilities [lon, lat, networks]
for c, fn in (('van', 'peeringdb_fac_vancouver.csv'), ('edm', 'peeringdb_fac_edmonton.csv')):
    for r in csv.DictReader(open(os.path.join(V, fn))): add(c, 'peering', float(r['lon']), float(r['lat']), int(r['net_count'] or 0))
# ---- large sewers (Vancouver): Metro Vancouver trunk mains, sanitary + combined, sampled every ~25 m
import math
for ft in json.load(open(os.path.join(U, 'b36a7c63-gvrd-sewer-trunk-mains.geojson')))['features']:
    if ft['properties'].get('effluent_type') not in ('Sanitary', 'Combined') or not ft.get('geometry'): continue
    g = ft['geometry']; lines = [g['coordinates']] if g['type'] == 'LineString' else g['coordinates']
    for q in lines:
        for (a, b), (c2, d2) in zip(q, q[1:]):
            n = max(1, int(math.hypot((c2 - a) * 72700, (d2 - b) * 111200) // 25))
            for t in range(n + 1): add('van', 'sewer', a + (c2 - a) * t / n, b + (d2 - b) * t / n)
# ---- need: CIMD 2021 per dissemination area; we use economic dependency + situational vulnerability only
# (residential instability and ethno-cultural composition are not read as need here: J.B.'s call, see METHODS.md)
need = {}
for fn in ('bc_scores_quintiles_EN.csv', 'prairies_scores_quintiles_EN.csv'):
    for r in csv.DictReader(open(os.path.join(DL, 'cimd', fn), encoding='utf-8-sig')):
        try: need[r['Dissemination Area (DA)']] = (int(r['Economic dependency Quintiles']) + int(r['Situational vulnerability Quintiles'])) / 2
        except ValueError: pass
for c in BOX:
    ft = json.load(open(os.path.join(L, 'v5_cut', 'da2_%s.geojson' % c)))['features']; n = 0
    for f in ft:
        q = need.get(f['properties']['DAUID'])
        if q is None: continue
        out[c]['need'].append(dict(da=f['properties']['DAUID'], q=q, geometry=f['geometry'])); n += 1
    log[(c, 'need_DAs')] = n
# ---- Edmonton flood hazard (Alberta flood hazard maps, Oct 2026 package): polygons by zone
for f in json.load(open(os.path.join(L, 'edm_flood_hazard_2026-10.geojson')))['features']:
    out['edm']['flood'].append(dict(zone=f['properties']['Multi_Zone'], river=f['properties']['RiverName'], geometry=f['geometry']))
for c in BOX: json.dump(out[c], open(os.path.join(V, 'v5_%s.json' % c), 'w'), separators=(',', ':'))
for k, v in sorted(log.items()): print(k, v)
for c in BOX: print(c, collections.Counter(a[2] for a in out[c]['anchors']), collections.Counter(a[2] for a in out[c]['transit']))
