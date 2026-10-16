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

# central heating plants from the CEEDC district-energy inventory (SFU; J.B. download 16 Oct 2026), matched by name to points already located
# from open data. CEEDC coordinates are not used (they do not match the facilities). Figures as reported, year in brackets.
CEEDC = {'van': {'Vancouver General Hospital': 'campus heating plant listed in the CEEDC district-energy inventory; no capacity or temperatures published (reported 2017)',
                 "Children'S And Women'S Health Centre Of British Columbia": 'campus heating plant listed in the CEEDC district-energy inventory; no capacity or temperatures published (reported 2022)'},
         'edm': {'University of Alberta': 'campus district energy: steam at 205 °C, 590 MW; chilled water at 5 °C, 145 MW; 80 buildings (CEEDC district-energy inventory, reported 2017). It also serves customers in the Greater Campus Area; its fuel was 136,705 t CO2e in 2023–24, and the University is weighing a conversion to low-temperature hot water (Operational GHG Emissions Reduction Plan, 2025). A lower-temperature network would need less lift from server heat'}}
for k, m in CEEDC.items():
    hit = set()
    for x in out[k]:
        if x['n'] in m: x['de'] = m[x['n']]; x['src2'] = 'ceedcIEF2026'; hit.add(x['n'])
    print('ceedc', k, sorted(hit), 'missing', sorted(set(m) - hit))
NETS = {'van': [dict(n='Neighbourhood Energy Utility (NEU)', op='City of Vancouver', kind='compulsory', src='van9552',
          ring=json.load(open(os.path.join(H, '..', 'data', 'networks', 'van_neu_9552_traced.geojson')))['geometry']['coordinates'][0],
          note='Traced from By-law 9552 Schedule A (±45 m). New buildings and major alterations inside must take NEU heat unless the City Engineer finds it not practical or economical (s. 2.1). Heat sent back is credited at 50% of $65.172/MWh. About 70% renewable, mostly sewage heat recovery; network at 65 °C minimum, 45 °C maximum return.'),
          dict(n='River District Energy', op='River District Energy LP', kind='unknown', src='rdeService2026',
          ring=json.load(open(os.path.join(H, '..', 'data', 'networks', 'van_river_district_citymap.geojson')))['geometry']['coordinates'][0],
          note='From the City map of established neighbourhood energy systems (March 2020; boundaries illustrative only), placed to about ±150 m; consistent with the operator\'s description (between Boundary Road and Kerr Street). Hot water at 85 °C supply, 65 °C return; 15 MW; 20 buildings (CEEDC inventory, reported 2018). Buildings must be hydronic and designed for at most 70 °C supply and 50 °C return in peak winter, 45/40 °C in summer, with no gas, electric-resistance or conventional heat-pump heating (RDE Information for Developers, Sept 2018). Connection rules and rates not yet read (BCUC filings). Whether it takes heat from others is not published.'),
          dict(n='Creative Energy (downtown)', op='Creative Energy', kind='unknown', src='vanNESmap2020',
          ring=json.load(open(os.path.join(H, '..', 'data', 'networks', 'van_creative_downtown_citymap.geojson')))['geometry']['coordinates'][0],
          note='From the City map of established neighbourhood energy systems (March 2020; boundaries illustrative only), placed to about ±150 m. Steam, 237 MW, 220 buildings (CEEDC inventory, reported 2014); the 2012 Neighbourhood Energy Strategy gives more than 200 downtown buildings on steam and aims to convert it to low-carbon sources. Whether connection is required is not yet read. 2026 rates average $14.78 per thousand pounds of steam and $42.59/MWh on its hot-water networks (Northeast False Creek, Butterfly), the same price at the tariff\'s 0.347 MWh per thousand pounds (BCUC Order G-179-26, Aug 2026). The existing Beatty steam plant is past its design life and is being kept running until a New Beatty Energy Centre is built (maintenance planned to 2029). Rates follow a flat-rate and declining-block structure; a low-carbon service from the Core Steam Decarbonization Project (approved 2022, capital cost revised from $37.5 M to $52.6 M) was aimed for Q4 2025, but its first rate-design application was rejected as incomplete in September 2024 (BCUC Order G-252-24). Steam cannot take server heat without a large lift.'),
          dict(n='Creative Energy (south downtown)', op='Creative Energy', kind='unknown', src='vanNESmap2020',
          ring=json.load(open(os.path.join(H, '..', 'data', 'networks', 'van_creative_southdowntown_citymap.geojson')))['geometry']['coordinates'][0],
          note='From the City map of established neighbourhood energy systems (March 2020; boundaries illustrative only), placed to about ±150 m. Temperatures, size and terms not yet read (BCUC filings).')],
        'edm': [dict(n='Downtown District Energy, Phases 1 and 1A', op='City of Edmonton', kind='unknown', src='edmDDEmap2025',
          ring=json.load(open(os.path.join(H, '..', 'data', 'networks', 'edm_dde_phase1_1a_citymap.geojson')))['geometry']['coordinates'][0],
          note='Approximate: around the Phase 1 and 1A buildings on the City\'s Downtown District Energy Initiative map (May 2025), placed on the City 3D building footprints (about ±50 m). Phase 1 serves the Winspear Centre, Century Place and Chancery Hall; Phase 1A would add City Hall, the Citadel Theatre and the Stanley A. Milner Library (2025–26 rate filing). The map shows heating and cooling mains with an energy centre; temperatures, rates and whether it takes outside heat are not yet read.'),
        dict(n='Downtown District Energy, planned Phases 2–4', op='City of Edmonton', kind='planned', src='edmDDEmap2025',
          ring=json.load(open(os.path.join(H, '..', 'data', 'networks', 'edm_dde_phases2_4_citymap.geojson')))['geometry']['coordinates'][0],
          note='Planned: the area around the Phase 2, 3 and 4 buildings on the City\'s Downtown District Energy Initiative map (May 2025; "proposed design ... subject to change"), placed to about ±50 m. A rough outline of the downtown core it would reach, not a service area.'),
        dict(n='Blatchford District Energy Sharing System', op='City of Edmonton (Blatchford Renewable Energy)', kind='compulsory', src='blatchford2023',
          ring=[list(c) for c in json.load(open(os.path.join(H, '..', 'data', 'networks', 'edm_blatchford_hull.geojson')))['geometry']['coordinates'][0]],
          note='Approximate: the convex hull of the City property records in the Blatchford Area neighbourhood (±50 m), not traced from Bylaw C17943 Schedule A. Owners inside must connect each building (s. 6) unless the City Manager exempts a net-zero carbon building (s. 8); owners outside may apply (s. 7). Variable rate $0.0269/kWh for heating and cooling; infrastructure fee $1,845.78 per residential unit or $21.09/m² commercial (Schedule B, 2022 consolidation). It shares ambient-temperature energy, so data-centre heat would need no lift to join it (loop temperatures not yet read). Its 2021–2024 Business Plan names geoexchange, sewer heat and solar as sources and describes no intake of heat from others.')]}
for k, v in out.items():
    json.dump(v, open(os.path.join(H, f'receivers_{k}.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
    os.makedirs(os.path.join(H, 'tiles', k), exist_ok=True)
    json.dump(dict(pts=v, nets=NETS[k]), open(os.path.join(H, 'tiles', k, 'receivers.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
    print(k, len(v), dict(collections.Counter(x['t'] for x in v)))
print('skipped:', dict(skipped))
