#!/usr/bin/env python3
"""Building footprints and heights around 12 data-centre sites (J.B. request, 21 Oct 2026).

Works only from data already held in the project (data/). No value is estimated: a blank means the data does not give it.
Outputs, per site: <site>_footprints.geojson (WGS84) and <site>_heights.csv; plus datasets.md.

Vancouver
  footprints  City of Vancouver Open Data, Building footprints 2009 (data/vancouver_footprints_2009.geojson): one polygon per
              building part, with hgt_agl (height above ground), max_ht, base_elev (ground elevation), roof type.
  heights     City of Vancouver LiDAR 2022 (classified points, 148 1-km tiles), processed 14–15 Oct 2026 by tool/lidar_hybrid.py:
              per 2009 footprint the 90th percentile and maximum height of building points above ground, and the share of the
              footprint that still has building points; plus outlines of buildings found in 2022 but not in 2009.
  parcels     City of Vancouver Open Data, property parcel polygons, with the property tax report 2026 (address, year built).
Edmonton
  footprints and heights  City of Edmonton Open Data, 3D Buildings (78sz-qcfr; downloaded 15 Oct 2026), layer Building_MP_Merge,
              EPSG:3776: each object split into its roof parts (see below); height = roof elevation − the object's lowest point.
              (The Rooflines 2019 file the project holds merges downtown blocks and carries no height; not used.)
  assessment  City of Edmonton Open Data, property assessment and information 2026 (points): address, year built, tax class.
"""
import json, csv, math, os, glob, collections
import numpy as np, pyproj, shapely
from shapely.geometry import shape, box, Point, mapping, Polygon
from shapely.strtree import STRtree

H = os.path.dirname(os.path.abspath(__file__)); D = os.path.join(H, '..', 'data'); OUT = H

def bbox_from(lat, lon, size):
    h = size / 2; return (lat - h / 111200.0, lon - h / (111320.0 * math.cos(math.radians(lat))), lat + h / 111200.0, lon + h / (111320.0 * math.cos(math.radians(lat))))

# centres: J.B.'s points; "approx." ones and V08 recentred on the street address (parcel centroid, City property tax report)
SITES = [
 ('V01', '55 E 7th Ave, Vancouver', (49.26261, -123.10556, 49.26620, -123.10005), 'box as given'),
 ('V02', '111 E 5th Ave (2060 Quebec St), Vancouver', (49.26479, -123.10500, 49.26839, -123.09949), 'box as given'),
 ('V03', '333 and 369 Terminal Ave, Vancouver', (49.27023, -123.09918, 49.27472, -123.09230), 'box as given'),
 ('V04', '175 W Cordova St, Vancouver', bbox_from(49.28356, -123.10866, 400), 'recentred on the parcel at 175 W Cordova St'),
 ('V05', '555 W Hastings St (Harbour Centre) and 515 W Hastings, Vancouver', bbox_from(49.28468, -123.11189, 400), 'recentred on the parcel at 555 W Hastings St; 515 W Hastings is not in the property tax report'),
 ('V06', '720 Beatty St, Vancouver (Creative Energy)', bbox_from(49.2787, -123.1113, 500), 'kept on your point: 720 Beatty St is not in the property tax report'),
 ('V07', '1050 W Pender St, Vancouver', bbox_from(49.28689, -123.11961, 400), 'recentred on the parcel at 1050 W Pender St'),
 ('V08', '2828 Natal St, Vancouver', bbox_from(49.25947, -123.02963, 400), 'centred on the parcel at 2828 Natal St'),
 ('E01', '4130 95 St NW, Edmonton', (53.47508, -113.47971, 53.47958, -113.47216), 'box as given'),
 ('E02', '17204 114 Ave NW, Edmonton', (53.56133, -113.62506, 53.56672, -113.61598), 'box as given'),
 ('E03', '9672 279 St, Acheson (Parkland County)', (53.53119, -113.79494, 53.53837, -113.78285), 'box as given'),
 ('E04', 'HSBC Bank Place, 10250 101 St NW, Edmonton', (53.54237, -113.49736, 53.54596, -113.49131), 'box as given'),
]
COLS = ['site', 'building_id', 'address', 'building_name', 'height_m', 'storeys', 'roof_elevation_m', 'ground_elevation_m', 'year_built', 'use', 'source_dataset', 'source_date', 'notes', 'parcel_id']
SRC_V09 = 'City of Vancouver Open Data, Building footprints 2009'; SRC_VL = 'City of Vancouver LiDAR 2022, processed by Beyond Data (lidar_hybrid.py, 14–15 Oct 2026)'
SRC_VP = 'City of Vancouver Open Data, property parcel polygons and property tax report 2026'
SRC_ER = 'City of Edmonton Open Data, Rooflines (as of 2019)'; SRC_E3 = 'City of Edmonton Open Data, 3D Buildings (78sz-qcfr), downloaded 15 Oct 2026'
SRC_EA = 'City of Edmonton Open Data, property assessment and information 2026'
r1 = lambda v: None if v is None else round(float(v), 1)

def out(site, feats, rows, note):
    gj = {'type': 'FeatureCollection', 'name': f'{site}_footprints', 'note': note, 'features': feats}
    json.dump(gj, open(os.path.join(OUT, f'{site}_footprints.geojson'), 'w'), ensure_ascii=False)
    with open(os.path.join(OUT, f'{site}_heights.csv'), 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, COLS); w.writeheader(); [w.writerow({k: ('' if r.get(k) is None else r.get(k)) for k in COLS}) for r in rows]
    print(site, len(feats), 'footprints')

# ---------- Vancouver ----------
print('loading Vancouver')
FP = json.load(open(os.path.join(D, 'vancouver_footprints_2009.geojson'), encoding='utf-8'))['features']
fpg = [shape(f['geometry']) for f in FP]; fptree = STRtree(fpg)
LID, NEW = {}, []
for fn in glob.glob(os.path.join(D, 'lidar2022', '*.json')):
    j = json.load(open(fn)); LID.update(j.get('fp', {})); NEW += j.get('new', [])
NEWG = [Polygon(n[3]) for n in NEW]; newtree = STRtree(NEWG)
PAR = json.load(open(os.path.join(D, 'vancouver_parcels_2026.geojson'), encoding='utf-8'))['features']
parg = [shape(f['geometry']) for f in PAR]; partree = STRtree(parg)
def parcel_at(pt):
    # all parcels under the point: strata and air-space parcels overlap the land parcel; keep every one
    ps = [PAR[i]['properties'] for i in partree.query(pt, predicate='within')]
    if not ps: return None
    ys = sorted({int(p['year_built']) for p in ps if p.get('year_built')})
    return {'address': '; '.join(sorted({p.get('address') or '' for p in ps} - {''})), 'tax_coord': '; '.join(sorted({p['tax_coord'] for p in ps if p.get('tax_coord')})),
            'year_built': ('–'.join(map(str, [ys[0], ys[-1]])) if len(ys) > 1 else (ys[0] if ys else None))}

for site, addr, (S, Wb, N, E), how in SITES:
    if not site.startswith('V'): continue
    B = box(Wb, S, E, N); feats, rows = [], []
    for i in fptree.query(B, predicate='intersects'):
        p = FP[i]['properties']; g = fpg[i]; bid = f'V2009-{p["id"]}'
        lv = LID.get(str(p['id'])); par = parcel_at(g.representative_point())
        notes = [f'part of 2009 building {p.get("bldgid")}', f'2009 dataset: hgt_agl {p.get("hgt_agl")} m, max_ht {p.get("max_ht")} m, roof {p.get("roof")}']
        h, src = p.get('hgt_agl'), SRC_V09; sdate = '2009'
        if lv:
            p90, mx, share = lv
            if share >= 0.6 and p90 > 0:
                h, src, sdate = p90, SRC_VL + ': 90th percentile of building points above ground', '2022'
                notes.append(f'LiDAR 2022: max {mx} m; building points on {round(share*100)} % of the footprint')
            else:
                notes.append(f'LiDAR 2022 finds building points on only {round(share*100)} % of this footprint: it may have been demolished or rebuilt since 2009 (height given is the 2009 value)')
        else: notes.append('outside the processed LiDAR 2022 tiles')
        rows.append(dict(site=site, building_id=bid, address=par and par.get('address'), height_m=r1(h), ground_elevation_m=r1(p.get('base_elev')),
                         year_built=par and par.get('year_built'), source_dataset=f'{src}; footprint: {SRC_V09}; address and year built: {SRC_VP}',
                         source_date=sdate, notes='; '.join(notes), parcel_id=par and par.get('tax_coord')))
        feats.append({'type': 'Feature', 'properties': {'building_id': bid, 'source': SRC_V09}, 'geometry': mapping(g)})
    for i in newtree.query(B, predicate='intersects'):
        n = NEW[i]; g = NEWG[i]; bid = f'VL22-{site}-{len(feats)+1}'; par = parcel_at(g.representative_point())
        if not par: continue   # as in the tool: keep a 2022-only outline only if it sits on a City parcel
        rows.append(dict(site=site, building_id=bid, address=par.get('address'), height_m=r1(n[0]), year_built=par.get('year_built'),
                         source_dataset=f'{SRC_VL}: 90th percentile of building points above ground; outline traced from 2022 LiDAR points; address: {SRC_VP}',
                         source_date='2022', notes=f'not in the 2009 footprints: built or extended since 2009; outline traced from LiDAR points, not surveyed; LiDAR max {n[1]} m',
                         parcel_id=par.get('tax_coord')))
        feats.append({'type': 'Feature', 'properties': {'building_id': bid, 'source': SRC_VL + ' (outline traced from points)'}, 'geometry': mapping(g)})
    out(site, feats, rows, f'{addr}. Box {how}. Bounds S,W,N,E = {S:.5f}, {Wb:.5f}, {N:.5f}, {E:.5f}.')

# ---------- Edmonton ----------
# The 3D Buildings layer (Building_MP_Merge) stores a whole block as one object in places. Each object is split into roof parts:
# flat faces grouped by elevation (to 0.5 m) and sloped faces, each connected group a part, with its roof elevation; the object's
# lowest point is the ground. Bottom faces (within 0.5 m of the ground) are skipped. Geometry and elevations are the City's.
print('loading Edmonton')
import fiona
from shapely.ops import unary_union, transform as stransform
GDB = os.path.join(D, 'raw', 'edm', '3d', '3dBuildings.gdb')
fw = pyproj.Transformer.from_crs(4326, 3776, always_xy=True); bw = pyproj.Transformer.from_crs(3776, 4326, always_xy=True)
def faces(g):
    if g is None: return
    if g['type'] == 'GeometryCollection':
        for h in g['geometries']: yield from faces(h)
    elif g['type'] == 'Polygon': yield g['coordinates']
    elif g['type'] == 'MultiPolygon':
        for p in g['coordinates']: yield p
def roof_parts(geom):
    hz, sl, zmin = collections.defaultdict(list), [], 1e9
    F = []
    for rings in faces(geom):
        r = rings[0]
        if len(r) < 3: continue
        zs = [c[2] for c in r]; zmin = min(zmin, min(zs)); F.append((r, min(zs), max(zs)))
    for r, a, b in F:
        if b < zmin + 0.5: continue
        p = Polygon([(c[0], c[1]) for c in r])
        if not p.is_valid: p = p.buffer(0)
        if p.area < 0.5: continue
        if b - a < 0.3: hz[round(b * 2) / 2].append(p)
        else: sl.append((p, b))
    out = []
    for z, ps in hz.items():
        u = unary_union(ps)
        for g in (u.geoms if hasattr(u, 'geoms') else [u]):
            if g.area >= 4: out.append((g, z, 'flat'))
    if sl:
        u = unary_union([p for p, _ in sl])
        for g in (u.geoms if hasattr(u, 'geoms') else [u]):
            if g.area < 4: continue
            z = max(b for p, b in sl if p.intersects(g)); out.append((g, z, 'sloped'))
    return out, zmin
AS = []
for r in csv.DictReader(open(os.path.join(D, 'edmonton_properties_2026.csv'), encoding='utf-8')):
    try: AS.append((float(r['lon']), float(r['lat']), r))
    except ValueError: pass
astree = STRtree(shapely.points([a[0] for a in AS], [a[1] for a in AS]))
for site, addr, (S, Wb, N, E), how in SITES:
    if not site.startswith('E'): continue
    x0, y0 = fw.transform(Wb, S); x1, y1 = fw.transform(E, N); B = box(Wb, S, E, N); feats, rows = [], []
    with fiona.open(GDB, layer='Building_MP_Merge') as src:
        for _, f in src.items(bbox=(x0, y0, x1, y1)):
            parts, zmin = roof_parts(f['geometry']); fid = f['properties']['PRESEG_FID']
            for k, (g, z, kind) in enumerate(sorted(parts, key=lambda t: -t[1])):
                gw = shapely.transform(g, lambda c: np.column_stack(bw.transform(c[:, 0], c[:, 1])))
                if not gw.is_valid: gw = gw.buffer(0)
                if not gw.intersects(B): continue
                bid = f'E3D-{fid}-{k+1}'; notes = [f'3D object {fid} ({f["properties"].get("ROOFFORM")}), roof part {k+1} of {len(parts)}, {kind} roof',
                                                   'outline = this roof part seen from above (City 3D model), not a surveyed footprint']
                ai = astree.query(gw, predicate='contains'); acc = [AS[i][2] for i in ai]
                if not acc:
                    j = astree.nearest(gw); a = AS[j]; dm = gw.distance(Point(a[0], a[1])) * 111320 * math.cos(math.radians(53.5))
                    if dm <= 25: acc = [a[2]]; notes.append(f'assessment point {dm:.0f} m outside this part (nearest; may belong to the same lot, not this part)')
                yb = sorted({int(a['year_built']) for a in acc if a.get('year_built', '').isdigit()})
                adds = sorted({f"{a['house_number']} {a['street']}".strip() for a in acc if a.get('house_number')})
                if len(acc) > 1: notes.append(f'{len(acc)} assessment accounts inside')
                rows.append(dict(site=site, building_id=bid, address='; '.join(adds[:3]) + (' …' if len(adds) > 3 else ''), height_m=r1(z - zmin), roof_elevation_m=r1(z), ground_elevation_m=r1(zmin),
                                 year_built=('–'.join(map(str, [yb[0], yb[-1]])) if len(yb) > 1 else (yb[0] if yb else None)),
                                 use='; '.join(sorted({a['class1'] for a in acc if a.get('class1')})) or None,
                                 source_dataset=f'outline, height and elevations: {SRC_E3}; address, year built, use (tax class): {SRC_EA}',
                                 source_date='3D buildings as downloaded 15 Oct 2026; assessment 2026', notes='; '.join(notes),
                                 parcel_id='; '.join(sorted({a['account'] for a in acc}))[:120] or None))
                feats.append({'type': 'Feature', 'properties': {'building_id': bid, 'source': SRC_E3}, 'geometry': mapping(gw)})
    note = f'{addr}. Box {how}. Bounds S,W,N,E = {S:.5f}, {Wb:.5f}, {N:.5f}, {E:.5f}.'
    if not feats: note += ' No footprints: this box is outside the City of Edmonton datasets the project holds (Parkland County data not held).'
    out(site, feats, rows, note)
