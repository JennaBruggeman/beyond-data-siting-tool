"""Builds checks/nearby_opp_check/nearby_opp_check.xlsx and nearby_opp_check.json: an INDEPENDENT hand calculation of
two stages of Beyond Data for the same eight lots as checks/place_check and checks/emit_check:
  "Who is nearby"           = register quantities with stage "prospect"    (10 parts)
  "What it could become"    = register quantities with stage "opportunity" (29 parts)
Quantities listed in register meta.dropped_quantities (30-31 Oct 2026) are skipped (none of them is in these stages).

Written from the register only (register/formula_register.json: formula / coef / inputs / sources / source_roles and the
new_sources / old_sources texts), raw data under data/ (census DA counts and boundaries, street centrelines, network
outlines, CWEC and PCIC weather files, parcels / lots), tool/*.json data files the register names (tool/receivers_van.json,
tool/receivers_edm.json), and the earlier independent stages checks/input_check/input_check.json,
checks/place_check/place_check.json and checks/emit_check/emit_check.json.
NOT read: tool/*.js, tool/index.html, checks/golden, any */screen folder, checks/agents.

Method follows checks/emit_check/build_emit_check.py and checks/place_check/build_place_check.py: lots across the
columns, one row block per register part, every computed cell a live Excel formula, constants on the Constants sheet
(named ranges) with the register part and source id; receivers on their own sheet (one row per lot-receiver pair within
3 km, demand per row a live formula, per-lot sums by SUMIFS); hourly weather on Weather, daily HDD on Daily.
The workbook is recalculated with LibreOffice and the cached values are read back to write the JSON.

Run:  python3 build_nearby_opp_check.py      (geometry takes about 1-3 minutes; run it in the background)
"""
import csv, json, os, collections, subprocess, shutil, tempfile, datetime
import pyproj, fiona
from shapely.geometry import shape, Polygon, Point, LineString
from shapely.ops import transform as shp_transform, unary_union
from shapely.strtree import STRtree
from shapely import make_valid, wkt as shp_wkt
from openpyxl import Workbook, load_workbook
from openpyxl.styles import Font, Alignment
from openpyxl.utils import get_column_letter as L
from openpyxl.workbook.defined_name import DefinedName

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
D = os.path.join(ROOT, 'data'); TOOL = os.path.join(ROOT, 'tool')
csv.field_size_limit(10 ** 9)
REG = json.load(open(os.path.join(ROOT, 'register', 'formula_register.json'), encoding='utf-8'))
DROPPED = set(REG['meta'].get('dropped_quantities', {}))
Q = {x['id']: x for x in REG['quantities'] if x.get('stage') in ('prospect', 'opportunity') and x['id'] not in DROPPED}
STAGE = {k: v['stage'] for k, v in Q.items()}
IC = json.load(open(os.path.join(ROOT, 'checks', 'input_check', 'input_check.json'), encoding='utf-8'))['lots']
PC = json.load(open(os.path.join(ROOT, 'checks', 'place_check', 'place_check.json'), encoding='utf-8'))['lots']
EC = json.load(open(os.path.join(ROOT, 'checks', 'emit_check', 'emit_check.json'), encoding='utf-8'))['lots']

LOTS = [  # key, label, city, parcel id, IT load MW (same list as build_place_check.py / build_emit_check.py)
    ('V09', '275 1st Ave E', 'van', '63819363', 2.5),
    ('E05', '8803 Stadium Rd NW', 'edm', '51053', 10.2),
    ('CLARK', '1425 Clark Dr', 'van', '23060741', 5.2),
    ('E123', '12603 123 Street NW', 'edm', '883345', 22.2),
    ('V339', '339 1st Ave E', 'van', '63819485', 3.8),
    ('E06A', '74 Airport Rd NW', 'edm', '176767', 10.2),
    ('E06B', '64 Airport Rd NW', 'edm', '146402', 10.2),
    ('HAST', '555 W Hastings', 'van', '59013407', 1.1),
]
KEYS = [l[0] for l in LOTS]
CITY = {l[0]: l[2] for l in LOTS}
EPSG = {'van': 26910, 'edm': 3776}
FWD = {c: pyproj.Transformer.from_crs(4326, e, always_xy=True).transform for c, e in EPSG.items()}
def proj(g, c): return shp_transform(FWD[c], g)
def valid(g): return g if g.is_valid else make_valid(g)
def num(v):
    try: return float(str(v).replace(',', '')) if v not in (None, '') else None
    except ValueError: return None
R_REACH = 3000          # receiver_radius (register)
R_CENSUS = (200, 500, 3000)
R_AREA = (500, 3000)    # heat density / linear heat density areas
NOW_TYPES = ('housing', 'apartment')   # residential receivers (excluded from the non-residential sum: census households cover them)

# ===================================================================== 1. geometry-derived inputs
def lots():
    """Same lot rule as input_check / place_check: Vancouver parcels by tax_coord; Edmonton Altalis-derived title lot
    holding the assessment point (geometry only; no licensed attribute is copied)."""
    LOT = {}
    vp = json.load(open(os.path.join(D, 'vancouver_parcels_2026.geojson'), encoding='utf-8'))
    by_tc = collections.defaultdict(list)
    for f in vp['features']:
        by_tc[(f['properties'].get('tax_coord') or '').lstrip('0')].append(f['geometry'])
    for k, l, c, p, it in LOTS:
        if c == 'van': LOT[k] = proj(unary_union([valid(shape(g)) for g in by_tc[p]]), 'van')
    edm_ids = {p: k for k, l, c, p, it in LOTS if c == 'edm'}
    erec = {}
    for r in csv.DictReader(open(os.path.join(D, 'edmonton_properties_2026.csv'), encoding='utf-8')):
        if r['parcel_point_id'] in edm_ids and r['parcel_point_id'] not in erec: erec[r['parcel_point_id']] = r
    raw = json.load(open(os.path.join(D, 'raw', 'edm', 'lots', 'edmonton_lots_epsb.json')))
    def dec(ring):
        x = y = 0; out = []
        for i in range(0, len(ring), 2): x += ring[i]; y += ring[i + 1]; out.append((x / 1e6, y / 1e6))
        return out
    lots_ll = []
    for pid, oid, rings in raw['lots']:
        rs = [dec(r) for r in rings]
        if len(rs[0]) < 4: continue
        lots_ll.append(valid(Polygon(rs[0], [r for r in rs[1:] if len(r) >= 4])))
    LT = STRtree(lots_ll)
    for ppid, k in edm_ids.items():
        r = erec[ppid]; pt = Point(float(r['lon']), float(r['lat']))
        LOT[k] = proj(unary_union([lots_ll[i] for i in LT.query(pt, predicate='intersects')]), 'edm')
    return LOT

def derive():
    LOT = lots()
    G = {k: {} for k in KEYS}
    for k in KEYS: G[k]['lot_m2'] = round(LOT[k].area, 1)

    # ---- networks (data/networks outlines; register: neuTraced, blatchfordDESS and the network inventory)
    NETS = {}
    for fn in sorted(os.listdir(os.path.join(D, 'networks'))):
        if not fn.endswith('.geojson'): continue
        d = json.load(open(os.path.join(D, 'networks', fn), encoding='utf-8'))
        c = 'van' if fn.startswith('van') else 'edm'
        if fn == 'van_cpcn_study_area.geojson': continue   # an electricity-supply study area, not a heat network
        NETS[fn[:-8]] = (c, proj(valid(shape(d['geometry'])), c), d['properties'].get('name', fn))
    for k in KEYS:
        G[k]['net_dist'] = {n: round(LOT[k].distance(g), 0) for n, (c, g, nm) in NETS.items() if c == CITY[k]}

    # ---- receivers within 3 km (straight line, lot edge to point)
    print('receivers')
    RECV = []
    for c in ('van', 'edm'):
        recs = json.load(open(os.path.join(TOOL, f'receivers_{c}.json'), encoding='utf-8'))
        for r in recs:
            p = proj(Point(r['lon'], r['lat']), c)
            for k in KEYS:
                if CITY[k] != c: continue
                dd = LOT[k].distance(p)
                if dd <= R_REACH:
                    nets = [n for n, (cc, g, nm) in NETS.items() if cc == c and g.contains(p)]
                    RECV.append(dict(lot=k, van=1 if c == 'van' else 0, n=r['n'] if r['src'] != 'vanBCA' else 'BCA-derived estimate (address withheld)',
                                     t=r['t'], src=r['src'], d=round(dd, 1), ten=1 if r.get('ten') else 0, meas=r.get('meas'),
                                     dem=r.get('dem'), lo=r.get('lo'), fa=None if r['src'] == 'vanBCA' else r.get('fa'), u=r.get('u'),
                                     net=', '.join(nets) or None))

    # ---- census DA counts (raw CSV + DA cartographic boundaries), area share within each radius
    print('census')
    F = ('pop2021', 'households', 'age_65plus', 'age_0_14', 'renter', 'shelter_30pct_plus')
    pop = {}
    for r in csv.DictReader(open(os.path.join(D, 'raw', 'census', 'census2021_DA_selected_Vancouver_Edmonton_regions.csv'), encoding='utf-8')):
        v = {f: num(r[f]) or 0 for f in F}            # suppressed / blank counts as 0 (register: "suppressed values count as 0")
        v['lowinc'] = (num(r['lim_at_pct']) or 0) / 100 * v['pop2021']   # register: LIM-AT % × population
        pop[r['dauid']] = v
    das = {'van': [], 'edm': []}
    with fiona.open('zip://' + os.path.join(D, 'raw', 'census', 'lda_000b21a_e.zip') + '!lda_000b21a_e.shp') as src:
        to_ll = pyproj.Transformer.from_crs(src.crs_wkt, 4326, always_xy=True).transform
        for f in src:
            da = f['properties']['DAUID']
            c = 'van' if da.startswith('5915') else 'edm' if da.startswith('4811') else None
            if c is None or da not in pop: continue
            das[c].append((proj(shp_transform(to_ll, valid(shape(f['geometry']))), c), pop[da]))
    for k in KEYS:
        lot = LOT[k]; arr = das[CITY[k]]
        for R in R_CENSUS:
            buf = lot.buffer(R); acc = collections.Counter(); land = 0.0
            for g, v in arr:
                if not g.area or not g.intersects(buf): continue
                a = g.intersection(buf).area; s = a / g.area; land += a
                for f_, x in v.items(): acc[f_] += x * s
            G[k][f'cen_{R}'] = {f_: round(x, 1) for f_, x in acc.items()}
            G[k][f'land_{R}'] = round(land, 0)          # DA cartographic boundaries are land only

    # ---- street centreline length within each radius (pipe length proxy for linear heat density)
    print('streets')
    lines = {'van': [], 'edm': []}
    for r in csv.DictReader(open(os.path.join(D, 'raw', 'van', 'public-streets.csv'), encoding='utf-8-sig'), delimiter=';'):
        g = json.loads(r['Geom'])
        if g['type'] == 'LineString': lines['van'].append(proj(LineString(g['coordinates']), 'van'))
        elif g['type'] == 'MultiLineString': lines['van'] += [proj(LineString(c), 'van') for c in g['coordinates']]
    for f in json.load(open(os.path.join(D, 'raw', 'van', 'streets', 'lanes_2026-10-18.geojson'), encoding='utf-8'))['features']:
        g = f['geometry']
        if g and g['type'] == 'LineString': lines['van'].append(proj(LineString(g['coordinates']), 'van'))
    for r in csv.DictReader(open(os.path.join(D, 'raw', 'edm', 'Road_Network_20261016.csv'), encoding='utf-8')):
        if r['CENTERLINE_TYPE'] not in ('Road', 'Alley'): continue
        if any(w in r['ROAD_SEGMENT_TYPE_DESCRIPTION'] for w in ('Ramp', 'Overpass', 'Bridge')): continue  # edmRoads2026: ramps, overpasses, bridges dropped
        g = shp_wkt.loads(r['GEOMETRY'])
        lines['edm'] += [proj(x, 'edm') for x in (g.geoms if hasattr(g, 'geoms') else [g])]
    T = {c: STRtree(v) for c, v in lines.items()}
    for k in KEYS:
        arr = lines[CITY[k]]
        for R in R_AREA:
            buf = LOT[k].buffer(R)
            G[k][f'street_{R}'] = round(sum(arr[i].intersection(buf).length for i in T[CITY[k]].query(buf, predicate='intersects')), 0)
    G['_nets'] = {n: nm for n, (c, g, nm) in NETS.items()}
    return G, RECV

# ===================================================================== 2. weather (homes_heated_2050s)
def epw(path):
    T = []
    for i, line in enumerate(open(path, encoding='latin-1')):
        if i < 8: continue
        T.append(float(line.split(',')[6]))          # EPW field 7, dry bulb °C
    assert len(T) == 8760, path
    return T
WXF = [('van_now', '51376785-CAN_BC_VANCOUVER-INTL-A_1108395_CWEC.epw'), ('edm_now', 'effbc917-CAN_AB_EDMONTON-INTL-A_3012216_CWEC.epw'),
       ('van_245', 'raw/weather_future/MORPHED_SSP245_2050s_CAN_BC_VANCOUVER-INTL-A_CWEC2020.epw'), ('van_585', 'raw/weather_future/MORPHED_SSP585_2050s_CAN_BC_VANCOUVER-INTL-A_CWEC2020.epw'),
       ('edm_245', 'raw/weather_future/MORPHED_SSP245_2050s_CAN_AB_EDMONTON-INTL-A_CWEC2020.epw'), ('edm_585', 'raw/weather_future/MORPHED_SSP585_2050s_CAN_AB_EDMONTON-INTL-A_CWEC2020.epw')]
WXCOL = {k: L(2 + i) for i, (k, f) in enumerate(WXF)}

# ===================================================================== 3. constants
CONST = [  # name, value, unit, register part, source id(s) and note, trust
    # --- shared load inputs (same as emit_check)
    ('lf', 0.6, '—', 'it_load_actual (input to battery, ups_flex, copper, chp)', 'fan2007 (one 2007 Google site; label as such)', 80),
    ('pue_lo', 1.4, '—', 'pue (facility peak for chp thresholds)', 'lbnl2024', 80),
    ('pue_hi', 1.55, '—', 'pue', 'register "use 1.4–1.55"', 80),
    ('hours', 8760, 'h/yr', 'unit', 'hours in a year', 100),
    ('gj_mwh', 3.6, 'GJ/MWh', 'unit', 'unit conversion', 100),
    # --- prospect
    ('rr', 3000, 'm', 'receiver_radius', 'formula "search to 3 km in a straight line" (logic test 19 Oct 2026, J.B.; RVO reaches retired); rvo2018 role coefficient', 70),
    ('sb_lo', 200, 'm²', 'offerable_area', 'formula "support block (200–600 m², from plans)" — hillingdon_up4 / burlingtonPlans2026 / abp317802 / abp317446 "traced from bins", unverified', 60),
    ('sb_hi', 600, 'm²', 'offerable_area', 'same', 60),
    ('hd_c1', 200, 'GJ/ha·yr', 'heat_density', 'persson: HRE class 1', 70),
    ('hd_c2', 500, 'GJ/ha·yr', 'heat_density', 'persson: HRE class 2', 70),
    ('hd_c3', 1200, 'GJ/ha·yr', 'heat_density', 'persson: HRE class 3', 70),
    ('hd_c4', 3000, 'GJ/ha·yr', 'heat_density', 'persson: HRE class 4', 70),
    ('hd_rvo', 1000, 'GJ/ha·yr', 'heat_density', 'coef "RVO 2018 p.8: below 1,000 GJ/ha not viable (printed GJ/h)" (rvo2018 not in this part\'s sources)', 60),
    ('w_a', 137.5, 'm per unit e', 'linear_heat_density', 'persson: w = 137.5e + 5 (e ≤ 0.4)', 70),
    ('w_b', 5, 'm', 'linear_heat_density', 'persson', 70),
    ('w_e', 0.4, 'plot ratio', 'linear_heat_density', 'persson', 70),
    ('w_max', 60, 'm', 'linear_heat_density', 'persson (e > 0.4)', 70),
    ('qlw_min', 1.5, 'GJ/m·yr', 'linear_heat_density', 'persson: lower limit 1.5 GJ/m', 70),
    ('dc_a', 0.051, '—', 'distribution_cost', 'persson (annuity factor a)', 70),
    ('dc_C1', 212, '€/m', 'distribution_cost', 'persson / persson2019 (2015 €)', 70),
    ('dc_C2', 4464, '€/m²', 'distribution_cost', 'persson / persson2019 (2015 €)', 70),
    ('dc_k1', 0.0486, 'm', 'distribution_cost', 'formula d_a = 0.0486 ln(q_L,w) + 0.0007', 70),
    ('dc_k0', 0.0007, 'm', 'distribution_cost', 'same', 70),
    ('ih_bc', 0.57, 'GJ/m²·yr', 'receiver_demand', 'ceud 2023 heating-only intensity, BC overall (coef)', 80),
    ('ih_ab', 1.40, 'GJ/m²·yr', 'receiver_demand', 'ceud 2023 heating-only intensity, AB overall (coef; Edmonton Commercial assessed area × 1.40)', 80),
    ('ih_ab_res', 0.777, 'GJ/m²·yr', 'receiver_demand', 'coef 19 Oct: Edmonton "Other Residential × 0.777 GJ/m²" (estimate)', 60),
    ('hosp_bc', 1.90, 'GJ/m²·yr (all energy)', 'receiver_demand', 'scieu2024 hospitals BC (all energy — check 2: apply a heating share)', 80),
    ('hosp_ab', 2.46, 'GJ/m²·yr (all energy)', 'receiver_demand', 'scieu2024 hospitals AB', 80),
    ('hs_bc_lo', 0.48, 'share', 'receiver_demand', 'coef "heat is 48–63% of energy in BC" (ceud)', 80),
    ('hs_bc_hi', 0.63, 'share', 'receiver_demand', 'same', 80),
    ('hs_ab_lo', 0.62, 'share', 'receiver_demand', 'coef "62–83% in Alberta" (ceud)', 80),
    ('hs_ab_hi', 0.83, 'share', 'receiver_demand', 'same', 80),
    ('est_div', 1.7, '—', 'receiver_demand', 'coef 20 Oct (J.B.): estimates shown as "estimate / 1.7 to the estimate" (median ratio vs 238 measured Vancouver buildings)', 60),
    ('hh_bc', 16.81, 'MWh/household·yr', 'homes_heated / receiver_demand', 'ceud residential 2018–22 average, BC space + water (60.5 GJ)', 80),
    ('hh_ab', 33.14, 'MWh/household·yr', 'homes_heated', 'ceud residential 2018–22 average, AB (119.3 GJ)', 80),
    # --- opportunity
    ('ref_m2', 3.5, 'm²/person', 'refuge_people', 'jibcGroupLodging p. 35 (guide\'s own 1.5 × 2.5 m = 3.75 m²; 3.5 stated)', 80),
    ('ach_lo', 2, 'room volumes/h', 'clean_air_volume', 'hcCleanAir2020 ("two to three times the room volume per hour")', 80),
    ('ach_hi', 3, 'room volumes/h', 'clean_air_volume', 'same', 80),
    ('w_seat', 0.108, 'kW/person', 'cooling_centre_people', 'energyPlusPeople (seated, total metabolic heat — SECONDARY, ASHRAE via EnergyPlus)', 60),
    ('gh_lo', 1.63, 'GJ/m²·yr', 'greenhouse_area', 'iesoGH (Ontario MODELLED typical, not measured — check 2 fix)', 60),
    ('gh_hi', 2.1, 'GJ/m²·season', 'greenhouse_area', 'manitobaGH (worked example, Sept–May, Manitoba)', 60),
    ('aq_lo', 2.9, 'kWh/kg', 'aquaculture_tonnes', 'ayuso2023 (simulated freshwater heating, Norway, 5→12 °C)', 70),
    ('aq_hi', 4.6, 'kWh/kg', 'aquaculture_tonnes', 'lukeRAS (derived 4.6 GWh ÷ 1,000 t, one Finnish estimate)', 60),
    ('alg', 217, 'kWh/kgDW', 'algae_kg', 'gurreri2023 (Chlorella, Sicily, one plant)', 70),
    ('mw_kwh', 2.88, 'kWh/kg live', 'insect_check', 'dreyer2021 (10.38 MJ/kg; unreachable in check 2)', 60),
    ('bsf_kwh', 3404, 'kWh/t substrate', 'insect_check', 'oekoBSF (workshop slide; unreachable in check 2)', 50),
    ('mw_mj', 10.38, 'MJ/kg', 'insect_check (check)', 'dreyer2021 text', 60),
    ('dsh_lo', 37, 'servers/home', 'distributed_servers_homes', 'liu2011 (2011 US modelling assumptions)', 40),
    ('dsh_hi', 114, 'servers/home', 'distributed_servers_homes', 'liu2011', 40),
    ('dsh_kw', 0.35, 'kW/server', 'distributed_servers_homes', 'liu2011 (Dell PowerEdge 1850, 350 W)', 40),
    ('ev_sf_lo', 0.5, '—', 'ev_stalls', 'silber2024 (fast-charging sites; unreachable in check 2)', 50),
    ('ev_sf_hi', 1, '—', 'ev_stalls', 'formula (Level 2 transfer: all at once)', 50),
    ('ev_l2_lo', 7.4, 'kW', 'ev_stalls', 'wsuEV (table example)', 70),
    ('ev_l2_hi', 19.2, 'kW', 'ev_stalls', 'wsuEV ("up to 19.2 kW")', 70),
    ('ev_dc_lo', 50, 'kW', 'ev_stalls', 'coef "DCFC 50–350 kW" — vanDCFC text says "typically 25–400 kW"', 50),
    ('ev_dc_hi', 350, 'kW', 'ev_stalls', 'same', 50),
    ('ev_van_net', 13.75, 'm²/stall', 'ev_area', 'vanParking 2.5 × 5.5 m (guideline)', 90),
    ('ev_van_gr', 22, 'm²/stall', 'ev_area', 'formula "≈ 22 m² with aisle" (aisle 6.6 m)', 90),
    ('ev_edm_net', 14.3, 'm²/stall', 'ev_area', 'edmBylaw20001 Table 5.1.3, 5.5 × 2.6 m', 90),
    ('ev_edm_gr', 23.4, 'm²/stall', 'ev_area', 'formula (90° aisle 7.0 m)', 90),
    ('vw', 2.5, 'm', 'ev_area (check)', 'vanParking stall width', 90), ('vl', 5.5, 'm', 'ev_area (check)', 'vanParking stall length', 90),
    ('va', 6.6, 'm', 'ev_area (check)', 'coef aisle', 90), ('ew', 2.6, 'm', 'ev_area (check)', 'edmBylaw20001', 90),
    ('el', 5.5, 'm', 'ev_area (check)', 'edmBylaw20001', 90), ('ea', 7.0, 'm', 'ev_area (check)', 'edmBylaw20001 90° aisle', 90),
    ('pit_k', 20.15, 'm² per m³^0.61', 'storage_footprint', 'dea v0011 ch. 140 p. 43', 80),
    ('pit_e', 0.61, '—', 'storage_footprint', 'same', 80),
    ('pit_V', 100000, 'm³', 'storage_footprint (check)', 'coef PlanEnergi 2025 example', 80),
    ('pit_A', 23100, 'm²', 'storage_footprint (check)', 'coef PlanEnergi 2025 design footprint', 80),
    ('pit_k2', 15.4, '—', 'storage_footprint (check)', 'coef "specific footprint 15.4 × V^−0.369"', 80),
    ('pit_e2', -0.369, '—', 'storage_footprint (check)', 'same', 80),
    ('cp', 4.18, 'kJ/kg·K', 'tes_volume / sewage_heat', 'formula (physics; heatPhys)', 100),
    ('tes_dT_lo', 6, 'K', 'tes_volume', 'coef example', 75), ('tes_dT_hi', 30, 'K', 'tes_volume', 'coef example', 75),
    ('tes_use', 0.85, 'share', 'tes_volume', 'formula ÷ 0.85 (usable share; coef: assumption)', 50),
    ('tes_144', 144, 'L/kWh', 'tes_volume (check)', 'coef "144 L/kWh at ΔT 6 K"', 75), ('tes_29', 29, 'L/kWh', 'tes_volume (check)', 'coef "29 L/kWh at 30 K"', 75),
    ('cu_lo', 20, 't/MW', 'copper_tonnes', 'cda2023 (INDUSTRY CLAIM; "tons" metric or short not stated)', 50),
    ('cu_hi', 40, 't/MW', 'copper_tonnes', 'same', 50),
    ('srv_1u', 21.2, 'kg', 'ewaste', 'dell R650 (MANUFACTURER CLAIM)', 60), ('srv_2u', 26.3, 'kg', 'ewaste', 'dell R740 (MANUFACTURER CLAIM)', 60),
    ('ew_life', 6, 'yr', 'ewaste', 'formula "÷ 6 yr"', 60),
    ('re_lo', 1, 'g/drive', 'rare_earth', 'formula "about 1–4 g" (our arithmetic from danczak2018)', 70), ('re_hi', 4, 'g/drive', 'rare_earth', 'same', 70),
    ('mag35_lo', 6, 'g', 'rare_earth (check)', 'danczak2018 p. 369, desktop HDD magnet', 70), ('mag35_hi', 19, 'g', 'rare_earth (check)', 'same', 70),
    ('mag25_lo', 2, 'g', 'rare_earth (check)', 'danczak2018 notebook HDD magnet', 70), ('mag25_hi', 6, 'g', 'rare_earth (check)', 'same', 70),
    ('re_sh_lo', 0.271, 'share of magnet', 'rare_earth (check)', 'danczak2018 Table 6: Nd 25 + Pr 2 + Dy 0.1 % (our sum)', 70),
    ('re_sh_hi', 0.434, 'share of magnet', 'rare_earth (check)', 'danczak2018 Table 6: Nd 29 + Pr 13 + Dy 1.4 % (our sum)', 70),
    ('bat_h_lo', 1, 'h', 'battery', 'formula "hours (1–8, default 4)"', 70), ('bat_h_def', 4, 'h', 'battery', 'same', 70), ('bat_h_hi', 8, 'h', 'battery', 'same', 70),
    ('bat_d', 34, 'kWh/m²', 'battery', 'reber2023 (34 ± 15, utility-scale)', 70), ('bat_d_lo', 19, 'kWh/m²', 'battery', 'same', 70), ('bat_d_hi', 49, 'kWh/m²', 'battery', 'same', 70),
    ('bat_c_lo', 467, 'CAD/kWh', 'battery', 'coef 19 Oct: NREL 2025 US$334 × 1.3978 (no inflation adjustment)', 60),
    ('bat_c_hi', 627, 'CAD/kWh', 'battery', 'coef: PNNL 2022 1 MW 4 h US$448 × 1.3978', 60),
    ('usd_cad', 1.3978, 'CAD/USD', 'battery (check)', 'coef', 60), ('nrel_usd', 334, 'US$/kWh', 'battery (check)', 'coef (nrelBatt2025)', 60), ('pnnl_usd', 448.34, 'US$/kWh', 'battery (check)', 'pnnl2022 (coef)', 60),
    ('ups_min_lo', 1, 'min', 'ups_flex', 'coef 1–2 min hyperscale (VENDOR / OPERATOR CLAIM)', 45),
    ('ups_min_hi', 15, 'min', 'ups_flex', 'coef 10–15 min financial (same claim)', 45),
    ('ups_half', 0.5, 'share', 'ups_flex', 'formula "× 0.5 (half held for outages)"', 45),
    ('bt_eta_lo', 0.32, '—', 'btes', 'drake_landing measured years 3–10', 60), ('bt_eta_hi', 0.56, '—', 'btes', 'same', 60), ('bt_eta_ss', 0.45, '—', 'btes', 'drake_landing steady state (simulated)', 60),
    ('bt_wm_lo', 47, 'W/m', 'btes', 'formula 47–83 W/m', 60), ('bt_wm_hi', 83, 'W/m', 'btes', 'same', 60),
    ('bt_d_lo', 35, 'm', 'btes', 'formula 35–55 m', 60), ('bt_d_hi', 55, 'm', 'btes', 'same', 60),
    ('li_n', 240, 'boreholes', 'btes (check)', 'li2021_dcbtes (simulation, not built)', 60), ('li_d', 55, 'm', 'btes (check)', 'same', 60),
    ('li_mw', 0.9, 'MW waste heat', 'btes (check)', 'same (0.9 MW = waste-heat supply)', 60), ('li_m2', 1863, 'm²', 'btes (check)', 'same', 60),
    ('abs_T1', 90, '°C', 'absorption', 'absorption2026: single-effect ≥90 °C', 65), ('abs_T2', 70, '°C', 'absorption', 'absorption2026: two-stage 70–80 °C', 65),
    ('ads_T', 45, '°C', 'absorption', 'coef: adsorption from about 45 °C (lrzCoolMUC, OPERATOR) to ~65 °C (meyer2013, preprint)', 50),
    ('abs_cop_lo', 0.6, '—', 'absorption', 'absorption2026 single-effect COP 0.6–0.7', 65), ('abs_cop_hi', 0.7, '—', 'absorption', 'same', 65),
    ('ht_lo', 25, '°C', 'heat_temp (input)', 'emit_check heat_temp (air-cooled low)', 70), ('ht_hi', 60, '°C', 'heat_temp (input)', 'emit_check heat_temp (liquid high, unverified)', 50),
    ('bc_sp', 0.462, 'share of household energy', 'homes_heated_2050s', 'coef CEUD 2023 BC space 46.2 %', 80), ('bc_wa', 0.271, 'share', 'homes_heated_2050s', 'coef BC water 27.1 %', 80),
    ('ab_sp', 0.631, 'share', 'homes_heated_2050s', 'coef AB space 63.1 %', 80), ('ab_wa', 0.232, 'share', 'homes_heated_2050s', 'coef AB water 23.2 %', 80),
    ('hdd_base', 18, '°C', 'homes_heated_2050s', 'coef "daily-mean HDD18" (pcicWx3)', 80),
    ('hdd_van_now_r', 2755, '°C·d', 'homes_heated_2050s (check)', 'coef (computed from PCIC)', 60), ('hdd_van_245_r', 2198, '°C·d', 'homes_heated_2050s (check)', 'coef', 60),
    ('hdd_van_585_r', 2038, '°C·d', 'homes_heated_2050s (check)', 'coef', 60), ('hdd_edm_now_r', 5389, '°C·d', 'homes_heated_2050s (check)', 'coef', 60),
    ('hdd_edm_245_r', 4659, '°C·d', 'homes_heated_2050s (check)', 'coef', 60), ('hdd_edm_585_r', 4377, '°C·d', 'homes_heated_2050s (check)', 'coef', 60),
    ('ph_re_lo', 0.5, 'power/heat', 'chp_heat', 'epaCHP2015 Table 1-3: reciprocating engines power-to-heat 0.5–1.2', 70), ('ph_re_hi', 1.2, 'power/heat', 'chp_heat', 'same', 70),
    ('ph_gt_lo', 0.6, 'power/heat', 'chp_heat', 'epaCHP2015: gas turbines 0.6–1.1', 70), ('ph_gt_hi', 1.1, 'power/heat', 'chp_heat', 'same', 70),
    ('cer_mw', 25, 'MW per unit', 'chp_heat', 'sor2024_263 (Clean Electricity Regulations, units ≥ 25 MW)', 70), ('reg117_mw', 75, 'MW', 'chp_heat', 'alta117_2026 (data centres ≥ 75 MW may be tethered)', 70),
    ('sm_edm_lo', 430, 'W/m²', 'snowmelt_area', 'nrcCBD160 40–65 W/ft² (our conversion, register)', 60), ('sm_edm_hi', 700, 'W/m²', 'snowmelt_area', 'same', 60),
    ('sm_van_lo', 420, 'W/m²', 'snowmelt_area', 'ashrae2015ch51 Seattle, ratio 0.5 (transferred to Vancouver)', 60), ('sm_van_hi', 647, 'W/m²', 'snowmelt_area', 'ashrae2015ch51 Seattle, ratio 1', 60),
    ('sm_van_yr', 36, 'kWh/m²·yr', 'snowmelt_area', 'ashrae2015ch51 Seattle annual at ratio 0.5 (3.0 + 33.0)', 60),
    ('ft2_m2', 10.7639, 'ft²/m²', 'snowmelt_area (check)', 'unit conversion', 100), ('cbd_lo', 40, 'W/ft²', 'snowmelt_area (check)', 'nrcCBD160 Table III', 60), ('cbd_hi', 65, 'W/ft²', 'snowmelt_area (check)', 'same', 60),
    ('rs_toil', 5, 'toilets for 75–100', 'refuge_services', 'jibcESSqrg2012', 60), ('rs_n0', 75, 'people', 'refuge_services', 'same', 60), ('rs_n1', 100, 'people', 'refuge_services', 'same', 60),
    ('rs_add', 30, 'people per extra toilet', 'refuge_services', 'same', 60), ('rs_basin', 10, 'people/basin', 'refuge_services', 'same', 60), ('rs_shower', 50, 'people/shower', 'refuge_services', 'same', 60),
    ('rs_w', 126, 'L/person·day', 'refuge_services', 'same: 2 drinking + 12 washing + 112 sanitation (our sum)', 60),
    ('cs_mw', 2000, 'kW', 'community_solar', 'bchSelfGen2026 RS 2290 net injection', 70), ('cs_res', 24, 'kW/residential beneficiary', 'community_solar', 'bchSelfGen2026', 70),
    ('care_r', 1000, 'm', 'backup_neighbours', 'coef 20 Oct (opps.js note quoted in register): "who would need power most, within 1 km: care homes and hospitals"', 60),
]

# ===================================================================== 4. workbook
def build(G, RECV):
    wb = Workbook()
    c = wb.active; c.title = 'Constants'
    c.append(['name', 'value', 'unit', 'register part', 'source (register new_sources / old_sources id) and note', 'trust'])
    for row_ in CONST: c.append(list(row_))
    for i, row_ in enumerate(CONST, start=2):
        wb.defined_names[row_[0]] = DefinedName(row_[0], attr_text=f"Constants!$B${i}")
    for col, w in zip('ABCDEF', (14, 12, 30, 40, 110, 7)): c.column_dimensions[col].width = w
    for cell in c[1]: cell.font = Font(bold=True)

    # ---- Receivers sheet: one row per lot-receiver pair within 3 km
    rv = wb.create_sheet('Receivers')
    hdr = ['lot', 'Vancouver 1/0', 'name', 'type', 'source', 'distance m (lot edge)', 'tenant (1 = demand inside host)', 'measured (1)',
           'demand in file MWh/yr', 'low in file MWh/yr', 'floor area m²', 'units (non-market housing)', 'demand high MWh/yr', 'demand low MWh/yr',
           'demand basis', 'inside network outline', 'Edm assessed: file ÷ recomputed']
    rv.append(hdr); [setattr(x, 'font', Font(bold=True)) for x in rv[1]]
    for i, r in enumerate(RECV, start=2):
        rv.append([r['lot'], r['van'], r['n'], r['t'], r['src'], r['d'], r['ten'], r['meas'], r['dem'], r['lo'], r['fa'], r['u']])
        A, B, D_, E, G_, I, J, K, Lc = (f'{x}{i}' for x in 'ABDEGIJKL')
        hosp_hi = f'IF({B}=1,hosp_bc*hs_bc_hi,hosp_ab*hs_ab_hi)'; hosp_lo = f'IF({B}=1,hosp_bc*hs_bc_lo,hosp_ab*hs_ab_lo)'
        edm_int = f'IF({D_}="apartment",ih_ab_res,ih_ab)'
        high = (f'=IF({G_}=1,0,IF({E}="edmAssess",{K}*{edm_int}/gj_mwh,IF(ISNUMBER({I}),{I},IF(ISNUMBER({Lc}),{Lc}*hh_bc,'
                f'IF(ISNUMBER({K}),IF({D_}="hospital",{K}*{hosp_hi},{K}*IF({B}=1,ih_bc,ih_ab))/gj_mwh,0)))))')
        low = (f'=IF({G_}=1,0,IF({E}="edmAssess",M{i}/est_div,IF(ISNUMBER({J}),{J},IF(AND({D_}="hospital",ISNUMBER({K}),NOT(ISNUMBER({I}))),{K}*{hosp_lo}/gj_mwh,M{i}))))')
        basis = (f'=IF({G_}=1,"tenant: in host",IF({E}="edmAssess","assessed area × CEUD intensity (recomputed)",IF(ISNUMBER({I}),IF(H{i}=1,"disclosed (measured)","BCA-derived estimate (file; inputs not shown)"),'
                 f'IF(ISNUMBER({Lc}),"units × 16.81 MWh",IF(ISNUMBER({K}),"floor area × CEUD intensity","no demand data")))))')
        rv[f'M{i}'] = high; rv[f'N{i}'] = low; rv[f'O{i}'] = basis; rv[f'P{i}'] = r['net']
        rv[f'Q{i}'] = f'=IF({E}="edmAssess",IF(M{i}>0,{I}/M{i},""),"")'
    NR = len(RECV) + 1
    for col, w in zip('ABCDEFGHIJKLMNOPQ', (7, 6, 40, 11, 11, 10, 8, 7, 11, 11, 10, 8, 12, 12, 40, 30, 10)): rv.column_dimensions[col].width = w
    rv.freeze_panes = 'A2'
    RG = lambda col: f'Receivers!${col}$2:${col}${NR}'

    # ---- Weather / Daily (for homes_heated_2050s)
    w = wb.create_sheet('Weather')
    w.append(['hour'] + [f'{k} dry bulb °C' for k, f in WXF])
    WX = [epw(os.path.join(D, f)) for k, f in WXF]
    for h in range(8760): w.append([h + 1] + [x[h] for x in WX])
    w['I1'] = 'Sources: cwec (data/*CWEC.epw), pcicWx3 (data/raw/weather_future/MORPHED_SSP245/585_2050s_*.epw); EPW field 7.'
    dy = wb.create_sheet('Daily')
    dy.append(['day'] + [f'{k} HDD18 (daily mean)' for k, f in WXF])
    for d in range(365):
        r0, r1 = 2 + 24 * d, 25 + 24 * d
        dy.append([d + 1] + [f'=MAX(0,hdd_base-AVERAGE(Weather!{WXCOL[k]}{r0}:{WXCOL[k]}{r1}))' for k, f in WXF])
    HDD = {k: f'SUM(Daily!{WXCOL[k]}2:{WXCOL[k]}366)' for k, f in WXF}

    sheets = {}
    def mk(name, title):
        s = wb.create_sheet(name, len(sheets))
        s['A1'] = title; s['A1'].font = Font(bold=True, size=13)
        s['A2'] = ('Blue = input (given, input_check, place_check, emit_check, data); black = formula; grey italic = text (not computable / qualitative). '
                   'Low pairs low coefficients with low inputs, high with high. All arithmetic is ours.')
        s.cell(3, 1, 'lot').font = Font(bold=True); s.cell(4, 1, 'address')
        for j, (k, l, cty, p, it) in enumerate(LOTS):
            s.cell(3, 2 + j, k).font = Font(bold=True); s.cell(4, 2 + j, l)
        sheets[name] = s; return s
    rows = {}
    blue = Font(color='1F4E9E'); grey = Font(color='808080', italic=True)
    cur = {}
    def row(key, label, vals=None, f=None, inp=False):
        assert key not in rows, key
        s = cur['s']; r = s.max_row + 1; rows[key] = (s.title, r); s.cell(r, 1, label)
        for j, (k, l, cty, p, it) in enumerate(LOTS):
            if inp:
                v = vals[j]; cell = s.cell(r, 2 + j, v)
                cell.font = grey if isinstance(v, str) and not v.startswith('=') else blue
            else:
                e = f(L(2 + j), cty, k)
                if isinstance(e, str) and e.startswith('='): s.cell(r, 2 + j, e)
                else: s.cell(r, 2 + j, e).font = grey
        return r
    def R(key, col):
        sh, r = rows[key]
        return f'{col}{r}' if sh == cur['s'].title else f"'{sh}'!{col}{r}"
    def head(t): s = cur['s']; r = s.max_row + 2; s.cell(r, 1, t).font = Font(bold=True)
    city = lambda col, a, b: f'=IF({R("van",col)}=1,{a},{b})'
    NC = lambda why: (lambda col, t, k: why)
    LOTKEY = lambda col: f'{col}$3'
    def sumifs(col, val_col, R_, extra=''):
        return f'SUMIFS({RG(val_col)},{RG("A")},{LOTKEY(col)},{RG("F")},"<="&{R_}{extra})'
    def countifs(col, R_, extra=''):
        return f'COUNTIFS({RG("A")},{LOTKEY(col)},{RG("F")},"<="&{R_}{extra})'
    NONRES = f',{RG("D")},"<>housing",{RG("D")},"<>apartment"'

    # =========================================================== Nearby (prospect)
    cur['s'] = mk('Nearby', 'Who is nearby (prospect) — independent hand calculation (live formulas)')
    head('INPUTS')
    row('van', 'Vancouver (1) or Edmonton (0)', [1 if x[2] == 'van' else 0 for x in LOTS], inp=True)
    row('it', 'IT load, MW of servers (given; same as place_check / emit_check)', [x[4] for x in LOTS], inp=True)
    row('lot', 'Lot area m² (input_check 1)', [IC[k]['1_lot_area_m2']['value'] for k in KEYS], inp=True)
    row('zone', 'Zone (input_check 2)', [IC[k]['2_zone']['value'] for k in KEYS], inp=True)
    row('rec_ic', 'Receivers within 3 km, input_check 7 (independent count, same file)', [IC[k]['7_receivers_within_3km']['value']['count'] for k in KEYS], inp=True)
    for R_ in R_CENSUS:
        for fld, lab in (('pop2021', 'people'), ('households', 'households'), ('age_65plus', 'aged 65+'), ('age_0_14', 'under 15'),
                         ('renter', 'renter households'), ('shelter_30pct_plus', 'households spending 30 %+ on shelter'), ('lowinc', 'people in low income (LIM-AT % × pop)')):
            row(f'c_{fld}_{R_}', f'{lab.capitalize()} within {R_} m (2021 DA × area share)', [G[k][f'cen_{R_}'].get(fld, 0) for k in KEYS], inp=True)
    for R_ in R_AREA:
        row(f'land{R_}', f'Land within {R_} m of the lot, m² (DA cartographic boundaries ∩ buffer)', [G[k][f'land_{R_}'] for k in KEYS], inp=True)
        row(f'street{R_}', f'Street + lane centreline within {R_} m, m (City open data)', [G[k][f'street_{R_}'] for k in KEYS], inp=True)
    nets = sorted(G['_nets'])
    for n in nets:
        row(f'nd_{n}', f'Distance lot → {G["_nets"][n]}, m (0 = inside)', [G[k]['net_dist'].get(n, 'n/a (other city)') for k in KEYS], inp=True)

    head('offerable_area — m² (ground floor where zoning bars data storage at grade + support block; ground floor area is size stage)')
    row('oa_rule', 'Zone with a ground-floor bar (I-2; I-3 sub-area A and FC-2 unconfirmed ?)',
        f=lambda col, t, k: f'=IF(OR({R("zone",col)}="I-2",{R("zone",col)}="FC-2",{R("zone",col)}="I-3"),"yes (ground floor offerable; area needs size stage)","no ground-floor rule")')
    row('oa_lo', 'Support block, low (200 m²) — lower bound where a ground-floor bar applies', f=lambda col, t, k: '=sb_lo')
    row('oa_hi', 'Support block, high (600 m²)', f=lambda col, t, k: '=sb_hi')

    head('receiver_radius — m')
    row('rr', 'Search radius (straight line)', f=lambda col, t, k: '=rr')

    head('receiver_demand / receivers_nearby — receivers within 3 km (Receivers sheet)')
    row('rn_n', 'Receivers within 3 km (count)', f=lambda col, t, k: '=' + countifs(col, 'rr'))
    row('rn_chk', 'Check: count ÷ input_check 7 count', f=lambda col, t, k: f'={R("rn_n",col)}/{R("rec_ic",col)}')
    row('rn_dem_n', 'with a demand figure (non-tenant, > 0)', f=lambda col, t, k: '=' + countifs(col, 'rr', f',{RG("M")},">0"'))
    row('rn_ten', 'tenants (demand inside a host)', f=lambda col, t, k: '=' + countifs(col, 'rr', f',{RG("G")},1'))
    row('rn_min', 'Nearest receiver off the lot, m (distance > 0)', f=lambda col, t, k: f'=_xlfn.MINIFS({RG("F")},{RG("A")},{LOTKEY(col)},{RG("F")},">0")')
    TYPES = sorted({r['t'] for r in RECV})
    for ty in TYPES:
        row(f'rn_t_{ty}', f'  type {ty}: count within 3 km', f=lambda col, t, k, ty=ty: '=' + countifs(col, 'rr', f',{RG("D")},"{ty}"'))
    row('rd_lo', 'Receiver demand within 3 km, MWh/yr, low (estimates ÷ 1.7)', f=lambda col, t, k: '=' + sumifs(col, 'N', 'rr'))
    row('rd_hi', 'Receiver demand within 3 km, MWh/yr, high', f=lambda col, t, k: '=' + sumifs(col, 'M', 'rr'))
    row('rd_lo_gj', 'same, GJ/yr, low', f=lambda col, t, k: f'={R("rd_lo",col)}*gj_mwh')
    row('rd_hi_gj', 'same, GJ/yr, high', f=lambda col, t, k: f'={R("rd_hi",col)}*gj_mwh')
    row('rd_nr_lo', 'Non-residential receivers (not housing/apartment), MWh/yr, low', f=lambda col, t, k: '=' + sumifs(col, 'N', 'rr', NONRES))
    row('rd_nr_hi', 'Non-residential receivers, MWh/yr, high', f=lambda col, t, k: '=' + sumifs(col, 'M', 'rr', NONRES))
    row('rd_nr500_lo', 'Non-residential receivers within 500 m, MWh/yr, low', f=lambda col, t, k: '=' + sumifs(col, 'N', '500', NONRES))
    row('rd_nr500_hi', 'Non-residential receivers within 500 m, MWh/yr, high', f=lambda col, t, k: '=' + sumifs(col, 'M', '500', NONRES))
    row('rd_hd_lo', 'Share of heat_delivered (emit) the receivers could take, low = MIN(1, demand low ÷ heat high)', f=lambda col, t, k: f'=MIN(1,{R("rd_lo",col)}/{R("hdl_hi",col)})' if False else 'placeholder')

    head('heat_density — GJ/ha·yr = (households × household heat + non-residential receivers) ÷ land area (floor space per capita not stated)')
    hh = lambda col: f'IF({R("van",col)}=1,hh_bc,hh_ab)'
    for R_ in R_AREA:
        row(f'q_res{R_}', f'{R_} m: residential heat GJ/yr = households × 16.81 / 33.14 MWh × 3.6', f=lambda col, t, k, R_=R_: f'={R(f"c_households_{R_}",col)}*{hh(col)}*gj_mwh')
        nlo, nhi = ('rd_nr_lo', 'rd_nr_hi') if R_ == 3000 else ('rd_nr500_lo', 'rd_nr500_hi')
        row(f'hd_lo{R_}', f'{R_} m: heat density, low', f=lambda col, t, k, R_=R_, nlo=nlo: f'=({R(f"q_res{R_}",col)}+{R(nlo,col)}*gj_mwh)/({R(f"land{R_}",col)}/10000)')
        row(f'hd_hi{R_}', f'{R_} m: heat density, high', f=lambda col, t, k, R_=R_, nhi=nhi: f'=({R(f"q_res{R_}",col)}+{R(nhi,col)}*gj_mwh)/({R(f"land{R_}",col)}/10000)')
    row('hd_cls', 'HRE class at 3 km, high (below 200 / 200 / 500 / 1,200 / 3,000)', f=lambda col, t, k: f'=IF({R("hd_hi3000",col)}>=hd_c4,"≥3,000",IF({R("hd_hi3000",col)}>=hd_c3,"1,200–3,000",IF({R("hd_hi3000",col)}>=hd_c2,"500–1,200",IF({R("hd_hi3000",col)}>=hd_c1,"200–500","below 200"))))')
    row('hd_rvo', 'High ÷ RVO 1,000 GJ/ha viability line (3 km)', f=lambda col, t, k: f'={R("hd_hi3000",col)}/hd_rvo')
    row('hd_rvo500', 'High ÷ RVO 1,000 GJ/ha (500 m)', f=lambda col, t, k: f'={R("hd_hi500",col)}/hd_rvo')

    head('linear_heat_density — GJ/m·yr = Q_s ÷ L (L = street + lane centreline length as pipe proxy)')
    for R_ in R_AREA:
        row(f'ql_lo{R_}', f'{R_} m: q_L,w low = heat density low × land ÷ street length', f=lambda col, t, k, R_=R_: f'={R(f"hd_lo{R_}",col)}*{R(f"land{R_}",col)}/10000/{R(f"street{R_}",col)}')
        row(f'ql_hi{R_}', f'{R_} m: q_L,w high', f=lambda col, t, k, R_=R_: f'={R(f"hd_hi{R_}",col)}*{R(f"land{R_}",col)}/10000/{R(f"street{R_}",col)}')
        row(f'w_impl{R_}', f'{R_} m: implied effective width w = land ÷ street length, m (register w 5–60 m)', f=lambda col, t, k, R_=R_: f'={R(f"land{R_}",col)}/{R(f"street{R_}",col)}')
    row('ql_w5', 'Register-width route, 3 km: heat density high × w 5 m (e = 0) ÷ 10,000', f=lambda col, t, k: f'={R("hd_hi3000",col)}*(w_a*0+w_b)/10000')
    row('ql_w60', 'Register-width route, 3 km: heat density high × w 60 m (e ≥ 0.4) ÷ 10,000', f=lambda col, t, k: f'={R("hd_hi3000",col)}*w_max/10000')
    row('ql_chk', 'Check: 137.5 × 0.4 + 5 (register says the line reaches 60 m)', f=lambda col, t, k: '=w_a*w_e+w_b')
    row('ql_min', 'q_L,w high (3 km) ÷ lower limit 1.5 GJ/m', f=lambda col, t, k: f'={R("ql_hi3000",col)}/qlw_min')

    head('distribution_cost — €/GJ (2015 €): C_d = a(C1 + C2·d_a) ÷ q_L,w; d_a = 0.0486 ln(q_L,w) + 0.0007')
    dcost = lambda q: f'dc_a*(dc_C1+dc_C2*(dc_k1*LN({q})+dc_k0))/{q}'
    for R_ in R_AREA:
        row(f'dc_lo{R_}', f'{R_} m: cost low (at q_L,w high)', f=lambda col, t, k, R_=R_: f'={dcost(R(f"ql_hi{R_}",col))}')
        row(f'dc_hi{R_}', f'{R_} m: cost high (at q_L,w low)', f=lambda col, t, k, R_=R_: f'={dcost(R(f"ql_lo{R_}",col))}')
        row(f'da{R_}', f'{R_} m: d_a at q_L,w high, m', f=lambda col, t, k, R_=R_: f'=dc_k1*LN({R(f"ql_hi{R_}",col)})+dc_k0')
    row('dc_at15', 'Check: cost at the 1.5 GJ/m lower limit', f=lambda col, t, k: f'={dcost("qlw_min")}')
    row('dc_cad', 'Cost in CAD', f=NC('not computable: coef says "convert to CAD" but states no rate or year (?)'))

    head('deprivation — CIMD index')
    row('dep', 'CIMD by DA within noise contour and receiver radius', f=NC('not computable: CIMD 2021 (cimd) is not in data/; noise contour level not stated'))

    head('people_affected — people (DA population × area share; register uses a 100 m grid of the same counts)')
    row('pa_lo', 'People within 200 m', f=lambda col, t, k: f'={R("c_pop2021_200",col)}')
    row('pa_hi', 'People within 500 m', f=lambda col, t, k: f'={R("c_pop2021_500",col)}')
    row('pa_snd', 'People within the sound distance', f=NC('not computable: the noise level that defines the "sound distance" is not stated in this part (?)'))

    head('competing_sources — receivers within 3 km that sit inside a heat-network outline; distance to each network in INPUTS')
    row('cs_in', 'Receivers within 3 km inside any network outline (data/networks)', f=lambda col, t, k: '=' + countifs(col, 'rr', f',{RG("P")},"<>"'))
    row('cs_in_dem', 'Their demand, MWh/yr, high', f=lambda col, t, k: '=' + sumifs(col, 'M', 'rr', f',{RG("P")},"<>"'))
    row('cs_share', 'Share of receiver demand (high) already inside a network outline', f=lambda col, t, k: f'=IF({R("rd_hi",col)}>0,{R("cs_in_dem",col)}/{R("rd_hi",col)},0)')
    row('cs_rink', 'Ice rinks within 3 km (arenas: a heat source as well as a receiver)', f=lambda col, t, k: '=' + countifs(col, 'rr', f',{RG("D")},"arena"'))
    row('cs_lot_in', 'Lot inside a network outline? (min distance = 0)', f=lambda col, t, k: f'=IF(MIN({",".join(R(f"nd_{n}",col) for n in nets)})=0,"inside","outside")')

    # =========================================================== Opportunity
    cur['s'] = mk('Opportunity', 'What it could become (opportunity) — independent hand calculation (live formulas)')
    head('INPUTS (earlier independent stages)')
    def ec(part, which): return [EC[k][part].get(which) for k in KEYS]
    row('hdl_lo', 'heat_delivered, MWh/yr available, low (emit_check)', ec('heat_delivered', 'low'), inp=True)
    row('hdl_hi', 'heat_delivered, MWh/yr available, high (emit_check)', ec('heat_delivered', 'high'), inp=True)
    row('hcp_lo', 'heat_captured, MWh/yr, low (emit_check, liquid-cooled run)', ec('heat_captured', 'low'), inp=True)
    row('hcp_hi', 'heat_captured, MWh/yr, high (emit_check)', ec('heat_captured', 'high'), inp=True)
    row('bk_lo', 'backup_hours, fuel h, low (emit_check)', ec('backup_hours', 'low'), inp=True)
    row('bk_hi', 'backup_hours, fuel h, high (emit_check)', ec('backup_hours', 'high'), inp=True)
    row('itavg', 'it_load_actual, MW = IT × 0.6', f=lambda col, t, k: f'={R("it",col)}*lf')
    row('pk_hi', 'Facility peak MW, high = IT × 1.55', f=lambda col, t, k: f'={R("it",col)}*pue_hi')
    row('roof500', 'Neighbour rooftop solar within 500 m, MWh/yr, register coef (place_check rooftop_solar high)', [PC[k]['rooftop_solar'].get('high') for k in KEYS], inp=True)
    row('care1k', 'Care homes + hospitals within 1 km (Receivers sheet)', f=lambda col, t, k: '=' + countifs(col, 'care_r', f',{RG("D")},"care"') + '+' + countifs(col, 'care_r', f',{RG("D")},"hospital"'))

    head('refuge_people — people = usable area ÷ 3.5 m² (usable area = offerable_area support block; ground floor is size stage)')
    row('rp_lo', 'Low = 200 ÷ 3.5', f=lambda col, t, k: f'=ROUNDDOWN({R("oa_lo",col)}/ref_m2,0)')
    row('rp_hi', 'High = 600 ÷ 3.5', f=lambda col, t, k: f'=ROUNDDOWN({R("oa_hi",col)}/ref_m2,0)')
    row('rp_hrs', 'Hours the refuge could run on fuel (backup_hours, emit), low', f=lambda col, t, k: f'={R("bk_lo",col)}')

    head('refuge_services — per refuge_people')
    def toil(n): return f'IF({n}<rs_n0,"not stated (< 75 people)",rs_toil+ROUNDUP(MAX(0,{n}-rs_n1)/rs_add,0))'
    row('rs_w_lo', 'Water L/day, low = people × 126', f=lambda col, t, k: f'={R("rp_lo",col)}*rs_w')
    row('rs_w_hi', 'Water L/day, high', f=lambda col, t, k: f'={R("rp_hi",col)}*rs_w')
    row('rs_t_lo', 'Toilets, low', f=lambda col, t, k: '=' + toil(R("rp_lo", col)))
    row('rs_t_hi', 'Toilets, high', f=lambda col, t, k: '=' + toil(R("rp_hi", col)))
    row('rs_b_hi', 'Washbasins, high = ROUNDUP(people ÷ 10)', f=lambda col, t, k: f'=ROUNDUP({R("rp_hi",col)}/rs_basin,0)')
    row('rs_s_hi', 'Showers, high = ROUNDUP(people ÷ 50)', f=lambda col, t, k: f'=ROUNDUP({R("rp_hi",col)}/rs_shower,0)')

    head('clean_air_volume / cooling_centre_people — need plant airflow and spare cooling (size stage / operator)')
    row('cav', 'clean_air_volume m³ = cleaned airflow ÷ 2–3 ACH', f=NC('not computable (cleaned airflow is a plant figure: size stage / operator)'))
    row('ccp', 'cooling_centre_people = spare cooling kW ÷ (0.108 + envelope)', f=NC('not computable (spare_cooling is an operator claim or judged; envelope gains not stated)'))
    row('ccp_kw', 'Reference: people per kW of spare cooling, envelope ignored = 1 ÷ 0.108', f=lambda col, t, k: '=1/w_seat')

    head('homes_heated — homes = heat_delivered ÷ household space + water heat (16.81 BC / 33.14 AB MWh)')
    row('hh_lo', 'Low', f=lambda col, t, k: f'={R("hdl_lo",col)}/{hh(col)}')
    row('hh_hi', 'High', f=lambda col, t, k: f'={R("hdl_hi",col)}/{hh(col)}')
    row('hh_chk', 'Check: 60.5 GJ ÷ 3.6 (BC) and 119.3 ÷ 3.6 (AB)', f=lambda col, t, k: city(col, '60.5/gj_mwh', '119.3/gj_mwh'))
    row('hh_chk2', 'Check: mean of the five listed years (BC 16.71…16.75; AB 34.85…32.13)', f=lambda col, t, k: city(col, 'AVERAGE(16.71,17.07,16.72,16.79,16.75)', 'AVERAGE(34.85,34.38,33.22,31.13,32.13)'))
    row('hh_res500', 'Homes heated (high) ÷ households within 500 m', f=lambda col, t, k: f'={R("hh_hi",col)}/{R("c_households_500",col)}')

    head('homes_heated_2050s — heat ÷ (space × HDD2050s ÷ HDDnow + hot water); shares scaled to the 16.81 / 33.14 MWh total')
    for sc in ('now', '245', '585'):
        row(f'hdd_{sc}', f'HDD18 (daily mean), {sc}', f=lambda col, t, k, sc=sc: city(col, HDD[f'van_{sc}'], HDD[f'edm_{sc}']))
    sp = lambda col: f'IF({R("van",col)}=1,bc_sp/(bc_sp+bc_wa),ab_sp/(ab_sp+ab_wa))'
    row('h50_lo', 'Low = heat low ÷ (hh × (space × HDD SSP2-4.5 ÷ now + water))', f=lambda col, t, k: f'={R("hdl_lo",col)}/({hh(col)}*({sp(col)}*{R("hdd_245",col)}/{R("hdd_now",col)}+1-{sp(col)}))')
    row('h50_hi', 'High = heat high ÷ (… SSP5-8.5 …)', f=lambda col, t, k: f'={R("hdl_hi",col)}/({hh(col)}*({sp(col)}*{R("hdd_585",col)}/{R("hdd_now",col)}+1-{sp(col)}))')
    row('h50_r_now', 'Check: HDD now ÷ register (2,755 / 5,389)', f=lambda col, t, k: f'={R("hdd_now",col)}/IF({R("van",col)}=1,hdd_van_now_r,hdd_edm_now_r)')
    row('h50_r245', 'Check: HDD SSP2-4.5 ÷ register (2,198 / 4,659)', f=lambda col, t, k: f'={R("hdd_245",col)}/IF({R("van",col)}=1,hdd_van_245_r,hdd_edm_245_r)')
    row('h50_r585', 'Check: HDD SSP5-8.5 ÷ register (2,038 / 4,377)', f=lambda col, t, k: f'={R("hdd_585",col)}/IF({R("van",col)}=1,hdd_van_585_r,hdd_edm_585_r)')

    head('greenhouse_area — m² = heat ÷ 1.63–2.1 GJ/m² (Ontario modelled / Manitoba; BC/AB figure not found)')
    row('gh_lo', 'Low = heat low × 3.6 ÷ 2.1', f=lambda col, t, k: f'={R("hdl_lo",col)}*gj_mwh/gh_hi')
    row('gh_hi', 'High = heat high × 3.6 ÷ 1.63', f=lambda col, t, k: f'={R("hdl_hi",col)}*gj_mwh/gh_lo')
    row('gh_t', 'Temperature: root-zone ~38 °C ok; pipe-rail 82 °C needs a heat pump', f=lambda col, t, k: '="heat_temp 25–60 °C: root-zone only without a lift (liquid-cooled run)"')

    head('aquaculture_tonnes — t/yr = heat ÷ 2.9–4.6 kWh/kg')
    row('aq_lo', 'Low = heat low ÷ 4.6', f=lambda col, t, k: f'={R("hdl_lo",col)}/aq_hi')
    row('aq_hi', 'High = heat high ÷ 2.9', f=lambda col, t, k: f'={R("hdl_hi",col)}/aq_lo')

    head('algae_kg — kg DW/yr = heat ÷ 217 kWh/kg')
    row('al_lo', 'Low', f=lambda col, t, k: f'={R("hdl_lo",col)}*1000/alg')
    row('al_hi', 'High', f=lambda col, t, k: f'={R("hdl_hi",col)}*1000/alg')

    head('insect_check — kWh/kg (coefficients); tonnes the heat could serve shown beside')
    row('in_mw', 'Mealworm heat, kWh/kg live', f=lambda col, t, k: '=mw_kwh')
    row('in_chk', 'Check: 10.38 MJ ÷ 3.6', f=lambda col, t, k: '=mw_mj/3.6')
    row('in_t_lo', 'Mealworm t/yr, low = heat low ÷ 2.88', f=lambda col, t, k: f'={R("hdl_lo",col)}/mw_kwh')
    row('in_t_hi', 'Mealworm t/yr, high', f=lambda col, t, k: f'={R("hdl_hi",col)}/mw_kwh')
    row('in_bsf', 'BSF substrate t/yr, high = heat high × 1,000 ÷ 3,404', f=lambda col, t, k: f'={R("hdl_hi",col)}*1000/bsf_kwh')

    head('distributed_servers_homes — homes = servers ÷ 37–114 (server count is size stage)')
    row('ds', 'Homes', f=NC('not computable (needs size stage: server count)'))
    row('ds_lo', 'Conditional: if servers = IT kW ÷ 0.35 kW (our reading), homes low = ÷ 114', f=lambda col, t, k: f'={R("it",col)}*1000/dsh_kw/dsh_hi')
    row('ds_hi', 'Conditional: homes high = ÷ 37', f=lambda col, t, k: f'={R("it",col)}*1000/dsh_kw/dsh_lo')

    head('ev_stalls / ev_area — need P_reserved (spare_capacity: size stage)')
    row('ev', 'Stalls', f=NC('not computable (needs spare_capacity: installed capacity is size stage)'))
    row('ev_mw_lo', 'Stalls per MW reserved, low (DCFC 350 kW, SF 1)', f=lambda col, t, k: '=1000/(ev_sf_hi*ev_dc_hi)')
    row('ev_mw_hi', 'Stalls per MW reserved, high (Level 2 7.4 kW, SF 0.5)', f=lambda col, t, k: '=1000/(ev_sf_lo*ev_l2_lo)')
    row('eva', 'Area m²', f=NC('not computable (needs ev_stalls)'))
    row('eva_lo', 'm² per stall, net', f=lambda col, t, k: city(col, 'ev_van_net', 'ev_edm_net'))
    row('eva_hi', 'm² per stall, with aisle', f=lambda col, t, k: city(col, 'ev_van_gr', 'ev_edm_gr'))
    row('eva_c1', 'Check: width × length', f=lambda col, t, k: city(col, 'vw*vl', 'ew*el'))
    row('eva_c2', 'Check: width × (length + aisle ÷ 2)', f=lambda col, t, k: city(col, 'vw*(vl+va/2)', 'ew*(el+ea/2)'))

    head('stored_heat / storage_footprint / tes_volume — need store volume, ΔT or demand profile (not lot data)')
    row('sh', 'stored_heat MWh = ρ c V ΔT × η', f=NC('not computable (store volume and ΔT not stated; "ground" not computable in emit_check)'))
    row('sf', 'storage_footprint m² = 20.15 V^0.61', f=NC('not computable (needs stored_heat / volume)'))
    row('sf_chk', 'Check: 20.15 × 100,000^0.61 vs PlanEnergi 23,100 m²', f=lambda col, t, k: '=pit_k*pit_V^pit_e')
    row('sf_chk2', 'Check: 15.4 × V^−0.369 × V at 100,000 m³', f=lambda col, t, k: '=pit_k2*pit_V^pit_e2*pit_V')
    row('tes', 'tes_volume m³', f=NC('not computable (needs demand_profile: kWh to store)'))
    row('tes_lo', 'L/kWh, ΔT 30 K (with ÷ 0.85)', f=lambda col, t, k: '=3600/(cp*tes_dT_hi)/tes_use')
    row('tes_hi', 'L/kWh, ΔT 6 K (with ÷ 0.85)', f=lambda col, t, k: '=3600/(cp*tes_dT_lo)/tes_use')
    row('tes_c6', 'Check: ΔT 6 K without ÷ 0.85 (register 144)', f=lambda col, t, k: '=3600/(cp*tes_dT_lo)')
    row('tes_c30', 'Check: ΔT 30 K without ÷ 0.85 (register 29)', f=lambda col, t, k: '=3600/(cp*tes_dT_hi)')

    head('sewage_heat — kW = Q(L/s) × 4.18 × ΔT')
    row('sw', 'Sewage heat kW', f=NC('not computable: sewer flow at the parcel not derivable (input_check 5; register "flow gap")'))

    head('copper_tonnes — t = MW × 20–40 t/MW (input named it_load_actual)')
    row('cu_lo', 'Low = it_load_actual × 20', f=lambda col, t, k: f'={R("itavg",col)}*cu_lo')
    row('cu_hi', 'High = it_load_actual × 40', f=lambda col, t, k: f'={R("itavg",col)}*cu_hi')
    row('cu_it_hi', 'On IT nameplate × 40 (CDA figures are per MW of capacity)', f=lambda col, t, k: f'={R("it",col)}*cu_hi')

    head('ewaste / rare_earth — need server and drive counts (size stage)')
    row('ew', 'E-waste kg/yr', f=NC('not computable (needs size stage: server count)'))
    row('ew_lo', 'Per server, kg/yr, low = 21.2 ÷ 6', f=lambda col, t, k: '=srv_1u/ew_life')
    row('ew_hi', 'Per server, kg/yr, high = 26.3 ÷ 6', f=lambda col, t, k: '=srv_2u/ew_life')
    row('re', 'Rare earth g', f=NC('not computable (needs size stage: drive count)'))
    row('re_c25_lo', 'Check: 2.5" drive, g, low = 2 × 27.1 %', f=lambda col, t, k: '=mag25_lo*re_sh_lo')
    row('re_c25_hi', 'Check: 2.5" drive, g, high = 6 × 43.4 %', f=lambda col, t, k: '=mag25_hi*re_sh_hi')
    row('re_c35_lo', 'Check: 3.5" drive, g, low = 6 × 27.1 %', f=lambda col, t, k: '=mag35_lo*re_sh_lo')
    row('re_c35_hi', 'Check: 3.5" drive, g, high = 19 × 43.4 %', f=lambda col, t, k: '=mag35_hi*re_sh_hi')

    head('battery — MWh = MW × hours (MW = it_load_actual); area m² = kWh ÷ 34 (19–49)')
    row('bt_lo', 'MWh, low = MW × 1 h', f=lambda col, t, k: f'={R("itavg",col)}*bat_h_lo')
    row('bt_hi', 'MWh, high = MW × 8 h', f=lambda col, t, k: f'={R("itavg",col)}*bat_h_hi')
    row('bt_def', 'MWh, default 4 h', f=lambda col, t, k: f'={R("itavg",col)}*bat_h_def')
    row('bt_a_lo', 'Area m² at 4 h, low = kWh ÷ 49', f=lambda col, t, k: f'={R("bt_def",col)}*1000/bat_d_hi')
    row('bt_a_mid', 'Area m² at 4 h, central = kWh ÷ 34', f=lambda col, t, k: f'={R("bt_def",col)}*1000/bat_d')
    row('bt_a_hi', 'Area m² at 4 h, high = kWh ÷ 19', f=lambda col, t, k: f'={R("bt_def",col)}*1000/bat_d_lo')
    row('bt_a_lot', 'Area high ÷ lot area', f=lambda col, t, k: f'={R("bt_a_hi",col)}/{R("lot",col)}')
    row('bt_c_lo', 'Cost CAD at 4 h, low = kWh × 467', f=lambda col, t, k: f'={R("bt_def",col)}*1000*bat_c_lo')
    row('bt_c_hi', 'Cost CAD at 4 h, high = kWh × 627', f=lambda col, t, k: f'={R("bt_def",col)}*1000*bat_c_hi')
    row('bat_chk', 'Check: 334 × 1.3978 and 448.34 × 1.3978', f=lambda col, t, k: '=nrel_usd*usd_cad')
    row('bat_chk2', '  (second)', f=lambda col, t, k: '=pnnl_usd*usd_cad')

    head('ups_flex — MWh = IT load × UPS minutes ÷ 60 × 0.5 (IT load = it_load_actual)')
    row('up_lo', 'Low (1 min, claim)', f=lambda col, t, k: f'={R("itavg",col)}*ups_min_lo/60*ups_half')
    row('up_hi', 'High (15 min, claim)', f=lambda col, t, k: f'={R("itavg",col)}*ups_min_hi/60*ups_half')
    row('up_it_hi', 'High on IT nameplate (if "IT load" means installed)', f=lambda col, t, k: f'={R("it",col)}*ups_min_hi/60*ups_half')

    head('btes — upper bound: all captured heat stored; charge W = heat_captured ÷ 8,760 h')
    row('bt_out_lo', 'Heat out MWh/yr, low = captured low × 0.32', f=lambda col, t, k: f'={R("hcp_lo",col)}*bt_eta_lo')
    row('bt_out_hi', 'Heat out MWh/yr, high = captured high × 0.56', f=lambda col, t, k: f'={R("hcp_hi",col)}*bt_eta_hi')
    row('bt_n_lo', 'Boreholes, low = W ÷ 83 ÷ 55', f=lambda col, t, k: f'=ROUNDUP({R("hcp_lo",col)}*1000000/hours/bt_wm_hi/bt_d_hi,0)')
    row('bt_n_hi', 'Boreholes, high = W ÷ 47 ÷ 35', f=lambda col, t, k: f'=ROUNDUP({R("hcp_hi",col)}*1000000/hours/bt_wm_lo/bt_d_lo,0)')
    row('bt_m2_hi', 'Borefield m², high, at Li 2021 spacing (1,863 m² ÷ 240)', f=lambda col, t, k: f'={R("bt_n_hi",col)}*li_m2/li_n')
    row('bt_lots', 'Borefield high ÷ lot area', f=lambda col, t, k: f'={R("bt_m2_hi",col)}/{R("lot",col)}')
    row('bt_chk', 'Check: Li 2021 W/m = 0.9 MW ÷ (240 × 55 m) (register 47–83)', f=lambda col, t, k: '=li_mw*1000000/(li_n*li_d)')
    row('bt_dem', 'Heat out high ÷ receiver demand within 3 km, low', f=lambda col, t, k: f'=IF({R("rd_lo",col)}>0,{R("bt_out_hi",col)}/{R("rd_lo",col)},"no demand")')

    head('absorption — kW cooling = recovered heat × COP, if temperature allows (heat_temp 25–60 °C)')
    row('ab_ok', 'Temperature allows absorption (≥ 70 °C)?', f=lambda col, t, k: '=IF(ht_hi>=abs_T2,"yes","no: 25–60 °C is below 70 °C (absorption); adsorption from ~45 °C (liquid run) but its COP is not stated")')
    row('ab_lo', 'Conditional if lifted to ≥ 90 °C: kW cooling, low = captured low kW avg × 0.6', f=lambda col, t, k: f'={R("hcp_lo",col)}*1000/hours*abs_cop_lo')
    row('ab_hi', 'Conditional: kW cooling, high = captured high kW avg × 0.7', f=lambda col, t, k: f'={R("hcp_hi",col)}*1000/hours*abs_cop_hi')

    head('chp_heat — MW heat = electric output ÷ power-to-heat ratio (electric = it_load_actual)')
    row('chp_lo', 'Low (reciprocating, P/H 1.2)', f=lambda col, t, k: f'={R("itavg",col)}/ph_re_hi')
    row('chp_hi', 'High (reciprocating, P/H 0.5)', f=lambda col, t, k: f'={R("itavg",col)}/ph_re_lo')
    row('chp_gt_lo', 'Gas turbines, low (P/H 1.1)', f=lambda col, t, k: f'={R("itavg",col)}/ph_gt_hi')
    row('chp_gt_hi', 'Gas turbines, high (P/H 0.6)', f=lambda col, t, k: f'={R("itavg",col)}/ph_gt_lo')
    row('chp_chk', 'Check: heat per MW electric, recip (77−41)/41 to (80−27)/27 vs 1/1.2–1/0.5', f=lambda col, t, k: '=(77-41)/41')
    row('chp_chk2', '  (upper end)', f=lambda col, t, k: '=(80-27)/27')
    row('chp_cer', 'Facility peak high ÷ 25 MW (CER unit threshold)', f=lambda col, t, k: f'={R("pk_hi",col)}/cer_mw')
    row('chp_117', 'Facility peak high ÷ 75 MW (Alberta Reg 117)', f=lambda col, t, k: f'=IF({R("van",col)}=0,{R("pk_hi",col)}/reg117_mw,"n/a (BC)")')

    head('snowmelt_area — m² = heat offered W ÷ design W/m² (all heat_delivered to snowmelt, continuous average)')
    row('sm_lo', 'Low = heat low W ÷ 700 (Edm) / 647 (Van)', f=lambda col, t, k: f'={R("hdl_lo",col)}*1000000/hours/IF({R("van",col)}=1,sm_van_hi,sm_edm_hi)')
    row('sm_hi', 'High = heat high W ÷ 430 (Edm) / 420 (Van)', f=lambda col, t, k: f'={R("hdl_hi",col)}*1000000/hours/IF({R("van",col)}=1,sm_van_lo,sm_edm_lo)')
    row('sm_yr', 'Vancouver annual-energy route: heat high × 1,000 ÷ 36 kWh/m²', f=lambda col, t, k: f'=IF({R("van",col)}=1,{R("hdl_hi",col)}*1000/sm_van_yr,"n/a (no Edmonton annual figure)")')
    row('sm_chk', 'Check: 40 and 65 W/ft² in W/m²', f=lambda col, t, k: '=cbd_lo*ft2_m2')
    row('sm_chk2', '  (65 W/ft²)', f=lambda col, t, k: '=cbd_hi*ft2_m2')

    head('Rules (qualitative): backup_neighbours, community_solar, fire_water — numbers shown beside')
    row('bn_care', 'backup_neighbours: care homes + hospitals within 1 km', f=lambda col, t, k: f'={R("care1k",col)}')
    row('cs_hh', 'community_solar: households for 2 MW at 24 kW each (register "at least 84")', f=lambda col, t, k: '=ROUNDUP(cs_mw/cs_res,0)')
    row('cs_roof', 'community_solar: neighbour rooftop solar within 500 m, MWh/yr (place_check)', f=lambda col, t, k: f'={R("roof500",col)}')

    # placeholder fix (the rd_hd row above needs emit inputs from the Opportunity sheet)
    sh, r = rows['rd_hd_lo']
    for j in range(len(LOTS)):
        col = L(2 + j)
        cl = sheets['Nearby'].cell(r, 2 + j, f"=MIN(1,{col}{rows['rd_lo'][1]}/'Opportunity'!{col}{rows['hdl_hi'][1]})"); cl.font = Font()
    sheets['Nearby'].cell(r, 1, 'Receiver demand low ÷ heat_delivered high (emit), capped at 1')

    for s in sheets.values():
        s.column_dimensions['A'].width = 86
        for j in range(len(LOTS)): s.column_dimensions[L(2 + j)].width = 17
        s.freeze_panes = 'B5'
    return wb, rows

# ===================================================================== 5. parts: rows read back, status, notes
QUAL = {
    'backup_neighbours': 'Rule: only behind the data centre\'s own transfer switch, on a private line, with the utility\'s written approval; never through utility lines. BC: supplying others makes it a public utility unless exempted (UCA s. 22 / s. 88(3)); EPCOR bars extending wiring beyond the property (T&C s. 4.4) and islanding without written approval. Spare generator capacity is what redundancy leaves (not sized). Count of care homes and hospitals within 1 km shown.',
    'community_solar': 'Rule: BC RS 2290 community generation, ≤ 2 MW net injection, 24 kW per residential / 100 kW per commercial beneficiary, bill credits at 10 ¢/kWh, not power; Alberta micro-generation ≤ lesser of 5 MW and service rating, on owned / leased / adjacent property, sized to own use (roof lease as "leased property" not confirmed).',
    'fire_water': 'Rule: a non-potable tank on the lot for the fire department after an earthquake; drinking water would make the operator a water supplier (BC DWPR permits; Alberta PWR s. 1(1)(l)). Volume not sized (NFPA 1142 / ISO fire-flow guide not read); Edmonton NBC(AE) 3.2.5.7.(1): municipal supply ≥ 3,800 L/min at 140 kPa for buildings over 3 storeys or 600 m², else an on-site volume by formula (formula not in the register).',
}
PARTS = {  # part -> (sheet-row low, high, unit, how, status)
    # prospect
    'offerable_area': ('oa_lo', 'oa_hi', 'm²', 'support block 200–600 m² (from plans, unverified); ground floor added where zoning bars data storage at grade (I-2; I-3 / FC-2 marked ?) — its area is size stage; growth space judged, not counted', 'computed (support block only; ground floor area needs size stage)'),
    'receiver_radius': ('rr', 'rr', 'm', 'register: search to 3 km in a straight line', 'computed (register value)'),
    'heat_density': ('hd_lo3000', 'hd_hi3000', 'GJ/ha·yr', '(census households within 3 km × 16.81 / 33.14 MWh + non-residential receivers within 3 km, low–high) × 3.6 ÷ land area (DA boundaries); 500 m in extra', 'computed (our route: floor space per capita not stated)'),
    'linear_heat_density': ('ql_lo3000', 'ql_hi3000', 'GJ/m·yr', 'heat within 3 km ÷ street + lane centreline length within 3 km (pipe-length proxy); register-width route and 500 m in extra', 'computed (street length as pipe proxy)'),
    'distribution_cost': ('dc_lo3000', 'dc_hi3000', '€/GJ (2015 €)', 'a(C1 + C2·d_a) ÷ q_L,w with Persson coefficients; CAD conversion not stated', 'computed (EUR; CAD not computable)'),
    'receiver_demand': ('rd_lo', 'rd_hi', 'MWh/yr (sum within 3 km)', 'per receiver: disclosed (measured) else BCA-derived file estimate (Van) / assessed area × 1.40 or 0.777 GJ/m² (Edm, recomputed) / non-market units × 16.81 MWh / floor area × 0.57 or 1.40 GJ/m² (hospitals 1.90 / 2.46 × heating share); estimates ÷ 1.7 for the low end; tenants 0', 'computed'),
    'deprivation': (None, None, 'index', 'CIMD by DA within noise contour and receiver radius', 'not computable (CIMD not in data/; noise contour level not stated)'),
    'people_affected': ('pa_lo', 'pa_hi', 'people', 'raw 2021 DA counts × area share within 200 m (low) and 500 m (high); households, 65+, under 15, renters, shelter 30 %+, low income in extra; sound distance not computable', 'computed (200 / 500 m; sound distance not stated)'),
    'receivers_nearby': ('rn_n', 'rn_n', 'receivers within 3 km', 'tool/receivers_*.json points, lot edge to point ≤ 3,000 m; counts by type in extra', 'computed'),
    'competing_sources': ('cs_in', 'cs_in', 'receivers within 3 km inside a network outline', 'data/networks outlines (NEU traced, Creative Energy, River District, Blatchford, DDEI); arenas as ice-rink sources; sewage heat and other data centres not in data', 'computed (networks and rinks only)'),
    # opportunity
    'refuge_people': ('rp_lo', 'rp_hi', 'people', 'offerable_area (support block 200–600 m²) ÷ 3.5 m²; ground floor would add more where offerable', 'computed (support block only)'),
    'clean_air_volume': (None, None, 'm³', 'cleaned airflow ÷ 2–3 ACH', 'not computable (cleaned airflow is a plant figure)'),
    'cooling_centre_people': ('ccp_kw', 'ccp_kw', 'people per kW of spare cooling', 'spare cooling kW ÷ (0.108 + envelope)', 'not computable (spare_cooling operator claim / judged; envelope gains not stated); per-kW reference shown'),
    'homes_heated': ('hh_lo', 'hh_hi', 'homes', 'heat_delivered (emit) ÷ 16.81 MWh (BC) / 33.14 MWh (AB); available heat, not receiver-limited', 'computed'),
    'greenhouse_area': ('gh_lo', 'gh_hi', 'm²', 'heat_delivered × 3.6 ÷ 2.1–1.63 GJ/m²', 'computed (transferred coefficients)'),
    'aquaculture_tonnes': ('aq_lo', 'aq_hi', 't/yr', 'heat_delivered ÷ 4.6–2.9 kWh/kg', 'computed (transferred coefficients)'),
    'algae_kg': ('al_lo', 'al_hi', 'kg DW/yr', 'heat_delivered ÷ 217 kWh/kg', 'computed'),
    'insect_check': ('in_mw', 'in_mw', 'kWh/kg live (mealworm)', 'register coefficient 2.88 kWh/kg (10.38 MJ); mealworm and BSF tonnes the heat could serve in extra', 'computed (coefficient)'),
    'distributed_servers_homes': ('ds_lo', 'ds_hi', 'homes', 'servers ÷ 37–114', 'not computable (needs size stage: server count); conditional IT kW ÷ 0.35 shown'),
    'ev_stalls': ('ev_mw_lo', 'ev_mw_hi', 'stalls per MW reserved', 'P_reserved ÷ (SF × P_charger)', 'not computable (needs spare_capacity: size stage); per-MW reference shown'),
    'ev_area': ('eva_lo', 'eva_hi', 'm² per stall', 'stalls × 13.75–22 (Van) / 14.3–23.4 (Edm)', 'not computable (needs ev_stalls); per-stall area shown'),
    'stored_heat': (None, None, 'MWh', 'ρ c V ΔT × η', 'not computable (store volume and ΔT not stated)'),
    'storage_footprint': (None, None, 'm²', '20.15 V^0.61', 'not computable (needs store volume)'),
    'sewage_heat': (None, None, 'kW', 'Q × 4.18 × ΔT', 'not computable (sewer flow not derivable: input_check 5)'),
    'copper_tonnes': ('cu_lo', 'cu_hi', 't', 'it_load_actual × 20–40 t/MW (industry claim; IT nameplate route in extra)', 'computed'),
    'ewaste': ('ew_lo', 'ew_hi', 'kg/yr per server', 'servers × 21.2–26.3 kg ÷ 6 yr', 'not computable (needs size stage: server count); per-server value shown'),
    'rare_earth': (None, None, 'g', 'drives × 1–4 g', 'not computable (needs size stage: drive count)'),
    'battery': ('bt_lo', 'bt_hi', 'MWh', 'it_load_actual × 1–8 h; area at 4 h ÷ 49–19 kWh/m²; cost CAD 467–627/kWh in extra', 'computed'),
    'ups_flex': ('up_lo', 'up_hi', 'MWh', 'it_load_actual × 1–15 min ÷ 60 × 0.5 (vendor claims)', 'computed'),
    'btes': ('bt_out_lo', 'bt_out_hi', 'MWh/yr heat out', 'upper bound: heat_captured (emit) stored, × η 0.32–0.56; boreholes = captured W ÷ 83–47 W/m ÷ 55–35 m', 'computed (upper bound: all captured heat stored)'),
    'tes_volume': ('tes_lo', 'tes_hi', 'L per kWh stored', '3,600 ÷ (4.18 ΔT) ÷ 0.85, ΔT 30–6 K', 'not computable (needs demand_profile); per-kWh value shown'),
    'absorption': ('ab_lo', 'ab_hi', 'kW cooling', 'recovered heat × COP if temperature allows; 25–60 °C is below absorption\'s 70–90 °C; adsorption COP not stated', 'not computable (temperature does not allow; adsorption COP not stated); conditional lifted value shown'),
    'homes_heated_2050s': ('h50_lo', 'h50_hi', 'homes', 'heat ÷ (household heat × (space share × HDD2050s ÷ HDDnow + water share)); HDD18 daily mean from CWEC and PCIC 2050s files', 'computed'),
    'chp_heat': ('chp_lo', 'chp_hi', 'MW heat', 'it_load_actual ÷ power-to-heat 1.2–0.5 (reciprocating); turbines and thresholds in extra', 'computed'),
    'snowmelt_area': ('sm_lo', 'sm_hi', 'm²', 'heat_delivered average W ÷ 700–430 (Edm) / 647–420 (Van) W/m²', 'computed (all heat to snowmelt; design-storm basis)'),
    'backup_neighbours': (None, None, 'rule', '', 'qualitative'),
    'community_solar': (None, None, 'rule', '', 'qualitative'),
    'fire_water': (None, None, 'rule', '', 'qualitative'),
    'refuge_services': ('rs_w_lo', 'rs_w_hi', 'L/day', 'refuge_people × 126 L; toilets, basins, showers in extra', 'computed'),
}
EXTRA = {
    'offerable_area': {'ground_floor_rule': ['oa_rule'], 'zone': ['zone']},
    'heat_density': {'at_500m': ['hd_lo500', 'hd_hi500'], 'class_3km_high': ['hd_cls'], 'high_over_rvo_1000': ['hd_rvo', 'hd_rvo500'],
                     'residential_GJ_3km': ['q_res3000'], 'land_m2_500_3000': ['land500', 'land3000']},
    'linear_heat_density': {'at_500m': ['ql_lo500', 'ql_hi500'], 'implied_width_m_500_3000': ['w_impl500', 'w_impl3000'],
                            'register_width_route_w5_w60': ['ql_w5', 'ql_w60'], 'high_over_1.5': ['ql_min'], 'street_m_500_3000': ['street500', 'street3000']},
    'distribution_cost': {'at_500m': ['dc_lo500', 'dc_hi500'], 'd_a_m': ['da3000'], 'cost_at_1.5_GJ_per_m': ['dc_at15'], 'CAD': ['dc_cad']},
    'receiver_demand': {'non_residential_MWh': ['rd_nr_lo', 'rd_nr_hi'], 'non_residential_500m_MWh': ['rd_nr500_lo', 'rd_nr500_hi'], 'GJ': ['rd_lo_gj', 'rd_hi_gj'],
                        'low_over_heat_delivered_high': ['rd_hd_lo']},
    'people_affected': {f'{lab}_200_500_3000': [f'c_{f}_{r}' for r in R_CENSUS] for f, lab in
                        (('households', 'households'), ('age_65plus', 'age65'), ('age_0_14', 'under15'), ('renter', 'renters'),
                         ('shelter_30pct_plus', 'shelter30'), ('lowinc', 'low_income'), ('pop2021', 'people'))},
    'receivers_nearby': {'with_demand': ['rn_dem_n'], 'tenants': ['rn_ten'], 'nearest_m': ['rn_min'], 'over_input_check_count': ['rn_chk']},
    'competing_sources': {'demand_inside_MWh_high': ['cs_in_dem'], 'share_inside': ['cs_share'], 'rinks_3km': ['cs_rink'], 'lot': ['cs_lot_in']},
    'refuge_people': {'fuel_hours_low': ['rp_hrs']},
    'refuge_services': {'toilets': ['rs_t_lo', 'rs_t_hi'], 'basins_hi': ['rs_b_hi'], 'showers_hi': ['rs_s_hi']},
    'homes_heated': {'checks_MWh': ['hh_chk', 'hh_chk2'], 'high_over_households_500m': ['hh_res500']},
    'homes_heated_2050s': {'HDD_now_245_585': ['hdd_now', 'hdd_245', 'hdd_585'], 'HDD_over_register': ['h50_r_now', 'h50_r245', 'h50_r585']},
    'greenhouse_area': {'temperature': ['gh_t']},
    'insect_check': {'check_MJ': ['in_chk'], 'mealworm_t': ['in_t_lo', 'in_t_hi'], 'bsf_substrate_t_hi': ['in_bsf']},
    'cooling_centre_people': {}, 'distributed_servers_homes': {}, 'ev_stalls': {}, 'ewaste': {}, 'tes_volume': {'checks_no_0.85': ['tes_c6', 'tes_c30']},
    'ev_area': {'checks': ['eva_c1', 'eva_c2']},
    'storage_footprint': {'check_100000m3': ['sf_chk', 'sf_chk2']},
    'rare_earth': {'check_g_2.5in': ['re_c25_lo', 're_c25_hi'], 'check_g_3.5in': ['re_c35_lo', 're_c35_hi']},
    'copper_tonnes': {'on_IT_nameplate_hi': ['cu_it_hi']},
    'battery': {'default_4h_MWh': ['bt_def'], 'area_m2_4h': ['bt_a_lo', 'bt_a_mid', 'bt_a_hi'], 'area_hi_over_lot': ['bt_a_lot'], 'cost_CAD_4h': ['bt_c_lo', 'bt_c_hi'], 'cost_checks': ['bat_chk', 'bat_chk2']},
    'ups_flex': {'on_IT_nameplate_hi': ['up_it_hi']},
    'btes': {'boreholes': ['bt_n_lo', 'bt_n_hi'], 'borefield_m2_hi': ['bt_m2_hi'], 'over_lot': ['bt_lots'], 'li2021_W_per_m': ['bt_chk'], 'over_receiver_demand_low': ['bt_dem']},
    'absorption': {'temperature': ['ab_ok']},
    'chp_heat': {'gas_turbine_MW': ['chp_gt_lo', 'chp_gt_hi'], 'check_recip_from_eff': ['chp_chk', 'chp_chk2'], 'peak_over_25MW': ['chp_cer'], 'peak_over_75MW': ['chp_117']},
    'snowmelt_area': {'van_annual_route_m2': ['sm_yr'], 'check_W_m2': ['sm_chk', 'sm_chk2']},
    'backup_neighbours': {'care_hospital_1km': ['bn_care']},
    'community_solar': {'households_for_2MW': ['cs_hh'], 'neighbour_roof_solar_500m_MWh': ['cs_roof']},
}

NOTES = [  # part, kind, note
    ('heat_density', 'unusable as written', 'Formula q_L = population density × floor space per capita × specific demand: floor space per capita is not stated anywhere in the part; inputs name receiver_demand and "area" but no area size. Computed instead from census households × CEUD household heat + non-residential receivers over DA land within 3 km (and 500 m). "1,000 GJ/ha" is credited to RVO, which is not in this part\'s sources (persson only).'),
    ('heat_density', 'unit', 'Classes "200 / 500 / 1,200 / 3,000 GJ/ha (20/50/120/300 MJ/m²)" are consistent (1 GJ/ha = 0.1 MJ/m²).'),
    ('linear_heat_density', 'input', 'Inputs name plot_ratio, which input_check finds not derivable (no storeys). w therefore only bounded 5–60 m; the street-length route (pipe proxy) is ours. Register check: 137.5 × 0.4 + 5 = 60 (consistent). Vancouver street files cover the City only, so 3 km buffers that reach Burnaby / the North Shore undercount street length (raises q_L,w).'),
    ('distribution_cost', 'unit / currency', 'Coefficients are 2015 € (persson2019 text); coef says "convert to CAD" without a rate or year. d_a needs q_L,w in GJ/m; below about 1 GJ/m the term d_a becomes small and the cost rises steeply.'),
    ('receiver_demand', 'basis', 'Tool data files give demand in MWh/yr (our inference: Edmonton assessed records equal area × 1.40 or 0.777 GJ/m² ÷ 3.6 — see column Q on Receivers). Vancouver BCA-derived values cannot be recomputed (licensed inputs, "inputs not shown"); used as given and labelled. Delivered fuel, not useful heat (boiler efficiency not sourced). Receivers with no floor area, units or demand are counted, not summed. edmReceivers relabelled "context (no heat demand figures)".'),
    ('receiver_demand', 'coverage', 'Commercial / apartment receivers exist only above the reporting thresholds (≥ 4,645 / 9,290 m²), so sums are a lower bound on area demand.'),
    ('receivers_nearby', 'source roles', 'sources list 13 ids but source_roles covers 11 (bcResCare and abCCcompliance2026 have no role). Count matches input_check 7 (independent) where the ratio row is 1.'),
    ('competing_sources', 'source roles', 'neuTraced and van9552 are in sources but have no source_role; the traced NEU area (±45 m) is the main input. Other data centres and per-receiver sewage heat are not in data/.'),
    ('deprivation', 'data gap', 'CIMD (cimd) is named but no CIMD file is under data/; the noise contour level that bounds the area is not stated.'),
    ('people_affected', 'method', 'Register spreads DA counts onto a 100 m grid (tool/census_*.json, grid origin not stated in the register); here the raw DA CSV × polygon area share is used (same counts, different spreading). "Sound distance" has no stated dB level.'),
    ('offerable_area', 'source gap', 'Ground-floor bar confirmed only for I-2 (vanI2Ground OPEN item); I-3 sub-area A and FC-2 marked ?. Support block 200–600 m² rests on plans "traced from bins" (unverified, conf 20). I-3 sub-area membership of V09 / V339 is not in data/.'),
    ('cooling_centre_people', 'basis', '0.108 kW is total metabolic heat (sensible + latent; energyPlusPeople check 2), not sensible load; envelope gains not stated.'),
    ('clean_air_volume', 'source roles', 'healthCanada2026 (upper indoor temperature) is linked to clean-air volume; check 2 asks to remove it. Formula needs cleaned airflow (plant).'),
    ('homes_heated_2050s', 'basis', 'Space / water split taken from CEUD 2023 shares (46.2 / 27.1 %; 63.1 / 23.2 %) rescaled to the 2018–22 household totals (16.81 / 33.14 MWh) — mixing years, as the register does. HDD check rows compare our CWEC / PCIC daily-mean HDD18 with the register values.'),
    ('chp_heat', 'consistency', 'Register "0.8–2.0 MW heat per MW power (recip.), 0.9–1.7 (turbines)" = 1 ÷ epaCHP2015 power-to-heat 1.2–0.5 and 1.1–0.6: consistent. From the efficiency endpoints alone (27–41 % electric, 77–80 % total) heat per MW electric spans 0.88–1.96. Input named it_load_actual; a plant supplying the whole facility would scale with PUE.'),
    ('copper_tonnes', 'basis', 't/MW (CDA, industry claim; metric vs short tons not stated) is per MW of capacity, but the input is it_load_actual (average load = 0.6 × IT). Both shown.'),
    ('ups_flex', 'basis', '"IT load" in the formula vs input it_load_actual: average used; nameplate in extra. UPS minutes are vendor / operator claims; aeso_or role "context", unverified.'),
    ('battery', 'basis', 'Formula gives no MW basis; it_load_actual (the named input) used. Fire-code basis (NFPA 855 adoption) unconfirmed. Areal density is utility-scale (reber2023 check 2).'),
    ('btes', 'input', 'Charge W and heat stored are not defined; upper bound takes all captured heat as charged evenly over 8,760 h. Li 2021 check: 0.9 MW ÷ (240 × 55 m) = 68 W/m, inside 47–83. Heat-pump COP for the lift is a register gap.'),
    ('tes_volume', 'consistency', 'Coef values 144 L/kWh (6 K) and 29 L/kWh (30 K) omit the ÷ 0.85 in the formula (with it: 169 and 34 L/kWh). sources list is empty.'),
    ('rare_earth', 'source roles / arithmetic', 'sources = [danczak2018] but source_roles credits dell. From danczak2018 figures: 2.5" 0.5–2.6 g, 3.5" 1.6–8.2 g per drive (our arithmetic, sum of Nd + Pr + Dy shares), wider than the register\'s "about 1–4 g".'),
    ('ev_stalls', 'source text', 'Formula DCFC 50–350 kW; vanDCFC text says "typically 25–400 kW". silber2024 SF 0.5 unreachable in check 2.'),
    ('aquaculture_tonnes', 'transfer', '2.9 kWh/kg is a simulated freshwater-heating term for one Norwegian post-smolt stage (5→12 °C); 4.6 is a derived Finnish ratio. Only make-up water heating, not whole-farm heat.'),
    ('greenhouse_area', 'source label', 'Coef calls 1.63 GJ/m² "Ontario measured"; source iesoGH (check 2) says modelled typical, not measured. 2.1 GJ/m² is a September–May season (Manitoba).'),
    ('absorption', 'unusable at lot temperature', 'heat_temp 25–60 °C is below absorption\'s 70–90 °C; adsorption from ~45 °C (operator / preprint) has no COP in the register. Only a conditional "if lifted to ≥ 90 °C" value can be shown; the lift\'s electricity is not counted.'),
    ('snowmelt_area', 'basis', 'Design W/m² is the 99 % storm load; dividing average heat by it gives the area held clear during a design storm if all heat went to snowmelt. Vancouver uses Seattle (transferred). nrcCBD160 unreachable in check 2.'),
    ('refuge_services', 'gap', 'Toilet rule starts at 75–100 people; below 75 not stated. 2012 guide; current BC ESS standard not checked.'),
    ('refuge_people', 'basis', 'Usable area = offerable_area; only the support block (200–600 m²) is known before the size stage. Edmonton spacing (2 m between beds, homeless-shelter standard) vs JIBC 0.75 m: OPEN item.'),
    ('distributed_servers_homes', 'basis', 'Liu 2011 figures are 2011 US modelling assumptions; Qarnot / heata are operator claims.'),
    ('fire_water', 'gap', 'On-site volume formula for Edmonton (NBC(AE) 3.2.5.7) not given; NFPA 1142 not read.'),
]

def recalc(path):
    soffice = shutil.which('soffice') or shutil.which('libreoffice')
    if not soffice: return False
    tmp = tempfile.mkdtemp()
    subprocess.run([soffice, '--headless', '--calc', '--convert-to', 'xlsx', '--outdir', tmp, path], check=True,
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=600)
    shutil.move(os.path.join(tmp, os.path.basename(path)), path)
    return True

def main():
    assert set(PARTS) == set(Q), (set(Q) - set(PARTS), set(PARTS) - set(Q))
    cache = os.path.join(HERE, '_geom_cache.json')
    if os.path.exists(cache) and os.environ.get('USE_CACHE'):
        G, RECV = json.load(open(cache))
    else:
        G, RECV = derive(); json.dump([G, RECV], open(cache, 'w'))
    wb, rows = build(G, RECV)
    q = wb.create_sheet('Qualitative')
    q.append(['part', 'register statement (no number)']); [setattr(x, 'font', Font(bold=True)) for x in q[1]]
    for p, t in QUAL.items(): q.append([p, t])
    n = wb.create_sheet('Register notes')
    n.append(['part', 'kind', 'note']); [setattr(x, 'font', Font(bold=True)) for x in n[1]]
    for p in NOTES: n.append(list(p))
    st = wb.create_sheet('Parts')
    st.append(['part', 'stage', 'status', 'unit', 'how', 'register formula']); [setattr(x, 'font', Font(bold=True)) for x in st[1]]
    for p, (lo, hi, unit, how, status) in PARTS.items(): st.append([p, STAGE[p], status, unit, how or QUAL.get(p, ''), Q[p]['formula']])
    for ws, widths in ((q, (22, 160)), (n, (24, 22, 160)), (st, (26, 11, 50, 26, 90, 90))):
        for i, w_ in enumerate(widths): ws.column_dimensions[L(i + 1)].width = w_
        for row_ in ws.iter_rows(min_row=2):
            for cell in row_: cell.alignment = Alignment(wrap_text=True, vertical='top')
    out = os.path.join(HERE, 'nearby_opp_check.xlsx'); wb.save(out); print('wrote', out)
    ok = recalc(out); print('recalculated with LibreOffice' if ok else 'LibreOffice not found: values not cached')

    vb = load_workbook(out, data_only=True)
    def val(key, j):
        sh, r = rows[key]; return vb[sh].cell(r, 2 + j).value
    def rd(x): return round(x, 4) if isinstance(x, float) else x
    res = {}; errors = []
    for j, (k, l, cty, p, it) in enumerate(LOTS):
        o = {'_lot': dict(label=l, city=cty, parcel_id=p, it_mw=it)}
        for part, (lo, hi, unit, how, status) in PARTS.items():
            if status == 'qualitative':
                d = dict(stage=STAGE[part], status='qualitative', unit=unit, register_says=QUAL[part])
            else:
                d = dict(stage=STAGE[part], status=status, unit=unit, how=how)
                if lo:
                    a, b = rd(val(lo, j)), rd(val(hi, j))
                    if isinstance(a, str) or isinstance(b, str) or a is None or b is None:
                        txt = str(a if isinstance(a, str) or a is None else b)
                        if txt.startswith(('#', 'Err')) or txt == 'None': errors.append((k, part, txt))
                        d['status'] = txt if txt.startswith('not computable') else f'not computable ({txt})'
                        d['low'] = d['high'] = None
                    elif lo == hi: d['value'] = a
                    else: d['low'], d['high'] = a, b
            ex = {}
            for nm, keys in EXTRA.get(part, {}).items():
                vs = [rd(val(x, j)) for x in keys]; ex[nm] = vs[0] if len(vs) == 1 else vs
                errors += [(k, part, v) for v in vs if isinstance(v, str) and v.startswith(('#', 'Err'))]
            if d['status'].startswith('not computable') and any(d.get(x) is not None for x in ('low', 'high', 'value')):
                ex['reference_shown'] = d.pop('value') if 'value' in d else [d.get('low'), d.get('high')]
                d['low'] = d['high'] = None
            if ex: d['extra'] = ex
            o[part] = d
        res[k] = o
    if errors: print('FORMULA ERRORS:', errors[:30])
    def bucket(s): return 'qualitative' if s == 'qualitative' else 'not computable' if s.startswith('not computable') else 'computed'
    counts = {part: '/'.join(sorted({bucket(res[k][part]['status']) for k in KEYS})) for part in PARTS}
    summ = {}
    for stg in ('prospect', 'opportunity'):
        c_ = {}
        for part, v in counts.items():
            if STAGE[part] == stg: c_[v] = c_.get(v, 0) + 1
        summ[stg] = c_
    meta = dict(built=str(datetime.date.today()), script='checks/nearby_opp_check/build_nearby_opp_check.py',
                stages={'prospect (Who is nearby)': sorted(p for p in PARTS if STAGE[p] == 'prospect'),
                        'opportunity (What it could become)': sorted(p for p in PARTS if STAGE[p] == 'opportunity')},
                dropped_skipped=sorted(DROPPED & {x['id'] for x in REG['quantities']}),
                inputs='register (stages prospect, opportunity) + new/old_sources; data/raw/census (DA CSV + lda_000b21a_e), data/raw/van/public-streets.csv + lanes, data/raw/edm/Road_Network_20261016.csv, data/networks/*.geojson, data/vancouver_parcels_2026.geojson, data/raw/edm/lots, CWEC + PCIC 2050s EPW; tool/receivers_van.json, tool/receivers_edm.json; checks/input_check, place_check (rooftop_solar), emit_check (heat_delivered, heat_captured, backup_hours); IT load per lot as given',
                not_read='tool/*.js, tool/index.html, checks/golden, */screen, checks/agents',
                licensed='Vancouver BCA-derived receiver rows keep only the tool file\'s derived demand (address withheld, no floor area); Edmonton lot geometry used for distances only',
                assumptions=['it_load_actual = IT × 0.6 (load_factor); facility peak = IT × 1.55',
                             'heat_delivered / heat_captured from emit_check (liquid-cooled run, COP 3.0–4.5): available heat, not receiver-limited',
                             'distances are straight-line, lot edge to receiver point (as input_check 7)',
                             'receiver demand units MWh/yr (inferred; Edmonton rows recomputed from area × CEUD intensity)'],
                part_status=counts, status_summary=summ, formula_errors=errors,
                register_notes=[dict(part=a, kind=b, note=c) for a, b, c in NOTES])
    json.dump(dict(meta=meta, lots=res), open(os.path.join(HERE, 'nearby_opp_check.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('wrote nearby_opp_check.json'); print(json.dumps(summ))

if __name__ == '__main__':
    main()
