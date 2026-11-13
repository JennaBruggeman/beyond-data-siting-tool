# Edmonton flood hazard for the Architecture "Ground and flood" card (audit K54, J.B. 13 Nov 2026): the Government of Alberta flood maps
# (Claude Link ABFloodMapping.zip, layer flood_hazard; Open Government Licence - Alberta), clipped to the tool's Edmonton extent, in the tool's
# coordinates (engine.js P: x = (lon - lon0) cos(lat0) 111320, y = (lat - lat0) 110540), grouped by zone (floodway and flood fringe; the 1:200 and 1:500 zones are outside the hazard area and not kept), simplified 2.5 m.
# Alberta has no flood construction level: the card says whether a lot is inside the mapped flood hazard area (floodway, flood fringe).
# Usage (bd-testenv python with pyogrio, shapely, pyproj): python -I make_flood_edm.py <unzipped ABFloodMapping folder> <tool folder>
import sys, os, json, math
import pyogrio, pyproj
from shapely import wkb
from shapely.geometry import box, mapping
from shapely.ops import transform, unary_union
SRC, TOOL = sys.argv[1], sys.argv[2]
g = os.path.join(SRC, 'Data', 'AB_Flood_Mapping', 'AB_Flood_Mapping.gdb')
M = json.load(open(os.path.join(TOOL, 'tiles', 'edm', 'meta.json'), encoding='utf-8'))
lat0, lon0 = M['lat0'], M['lon0']; k = math.cos(math.radians(lat0)) * 111320
ext = M['ext']   # [x0, y0, x1, y1] in tool metres
inv = pyproj.Transformer.from_crs(3400, 4326, always_xy=True)
fwd = pyproj.Transformer.from_crs(4326, 3400, always_xy=True)
lon = lambda x: x / k + lon0; lat = lambda y: y / 110540 + lat0
bx = [fwd.transform(lon(x), lat(y)) for x in (ext[0], ext[2]) for y in (ext[1], ext[3])]
meta, fids, geom, fields = pyogrio.raw.read(g, layer='flood_hazard', bbox=(min(p[0] for p in bx), min(p[1] for p in bx), max(p[0] for p in bx), max(p[1] for p in bx)))
names = list(meta['fields']); F = lambda n, i: fields[names.index(n)][i]
def tool(xx, yy, z=None):
    lo, la = inv.transform(xx, yy); return ((lo - lon0) * k, (la - lat0) * 110540)
clip = box(*ext); groups = {}
CLASS = {'Floodway': 'floodway', 'Flood Fringe': 'flood fringe', 'High Hazard Flood Fringe': 'flood fringe (high hazard)', 'Protected Flood Fringe': 'flood fringe (protected)', '1:200 Flood': '1:200 flood (outside the hazard area)', '1:500 Flood': '1:500 flood (outside the hazard area)'}
studies = set()
for i, gb in enumerate(geom):
    if gb is None: continue
    cls = CLASS.get(str(F('Multi_Zone', i)), str(F('Multi_Zone', i)))
    if cls.startswith('1:'): continue   # the 1:200 and 1:500 zones lie outside the flood hazard area: not kept (size)
    shp = transform(tool, wkb.loads(bytes(gb))).buffer(0).intersection(clip)
    if shp.is_empty: continue
    groups.setdefault(cls, []).append(shp); studies.add(str(F('StudyName', i)))
out = {'_about': 'Government of Alberta flood hazard maps (layer flood_hazard; Open Government Licence - Alberta), clipped to the tool\'s Edmonton extent, tool coordinates, simplified 2.5 m. Built by checks/tests/make_flood_edm.py. Studies: ' + '; '.join(sorted(studies)) + '.',
       'src': 'abFloodHazard', 'zones': {}}
for cls, L in groups.items():
    u = unary_union(L).simplify(2.5)
    polys = [u] if u.geom_type == 'Polygon' else list(u.geoms)
    out['zones'][cls] = [[[round(c, 1) for xy in p.exterior.coords for c in xy]] + [[round(c, 1) for xy in h.coords for c in xy] for h in p.interiors] for p in polys if p.area > 20]
json.dump(out, open(os.path.join(TOOL, 'data', 'flood_edm.json'), 'w', encoding='utf-8'), separators=(',', ':'))
print({k: len(v) for k, v in out['zones'].items()}, os.path.getsize(os.path.join(TOOL, 'data', 'flood_edm.json')), 'bytes')
