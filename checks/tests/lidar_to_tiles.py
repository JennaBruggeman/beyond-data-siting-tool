"""A section (J.B. 12 Nov 2026): City of Vancouver LiDAR 2022 building outlines (Claude Link/lidar_out/<tile>.json, made by lidar_out/lidar_tile.py:
class 6 points -> outlines with measured heights, UTM 10N) into the tool's own frame and tiles: tool/tiles/van/lid_<key>.json = {"B": [[h_p90, h_max, x0, y0, x1, y1, ...]]}.
The tool frame is engine.js P(): x = (lon - lon0) * cos(lat0) * 111,320, y = (lat - lat0) * 110,540 (tiles/van/meta.json). Tiles stay out of git (.gitignore tool/tiles/).
Data: City of Vancouver LiDAR 2022, Open Government Licence - Vancouver. Run: python checks/tests/lidar_to_tiles.py "<Claude Link>/lidar_out" """
import sys, os, json, glob, math
from pyproj import Transformer
R = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
src = sys.argv[1]
meta = json.load(open(os.path.join(R, 'tool/tiles/van/meta.json')))
lat0, lon0, T = meta['lat0'], meta['lon0'], meta['T']; k = math.cos(math.radians(lat0)) * 111320
tr = Transformer.from_crs('EPSG:26910', 'EPSG:4326', always_xy=True)   # NAD83 / UTM 10N -> lon, lat
out = {}
n = 0
for f in sorted(glob.glob(os.path.join(src, '*.json'))):
    J = json.load(open(f))
    if not isinstance(J, dict) or 'buildings' not in J: continue
    for b in J['buildings']:
        h90, hmax, area, gz, ring = b[0], b[1], b[2], b[3], b[4]
        if area < 12: continue
        lon, lat = tr.transform([p[0] for p in ring], [p[1] for p in ring])
        xy = [((lo - lon0) * k, (la - lat0) * 110540) for lo, la in zip(lon, lat)]
        cx = sum(p[0] for p in xy) / len(xy); cy = sum(p[1] for p in xy) / len(xy)
        key = f'{math.floor(cx / T)}_{math.floor(cy / T)}'
        out.setdefault(key, []).append([round(h90, 1), round(hmax, 1)] + [round(v, 1) for p in xy for v in p])
        n += 1
for key, B in out.items():
    json.dump({'B': B, 'src': 'City of Vancouver LiDAR 2022 (class 6), outlines and heights by lidar_out/lidar_tile.py; Open Government Licence - Vancouver'}, open(os.path.join(R, f'tool/tiles/van/lid_{key}.json'), 'w'), separators=(',', ':'))
print('buildings', n, 'tiles', len(out))
