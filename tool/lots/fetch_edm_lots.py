#!/usr/bin/env python3
"""Fetch Edmonton lot outlines from the Edmonton Public Schools GIS layer "Titled Lots Current"
(Alberta title mapping, (c) Altalis; current to 1 Sep 2025). Academic use approved by J.B.'s professor, 15 Oct 2026.
Raw output stays out of git (see .gitignore). Pages through the layer inside the City of Edmonton's extent.
Out: data/raw/edm/lots/page_NNNN.json (Esri JSON, outSR 3776 = NAD83 3TM 114, the City's projection)."""
import json, os, sys, time, urllib.request, urllib.parse
H = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(H, '..', '..', 'data', 'raw', 'edm', 'lots'); os.makedirs(OUT, exist_ok=True)
U = 'https://azimuth.epsb.ca/server/rest/services/Hosted/Titled_Lots_Current/FeatureServer/0'
def get(url, p):
    for k in range(5):
        try:
            with urllib.request.urlopen(url + '?' + urllib.parse.urlencode(p), timeout=120) as r: return json.load(r)
        except Exception as e: print('retry', k, e); time.sleep(3 * (k + 1))
    sys.exit('failed')
meta = get(U, {'f': 'json'}); json.dump(meta, open(os.path.join(OUT, 'layer.json'), 'w'))
n = meta.get('maxRecordCount', 1000)
# City of Edmonton extent, lon/lat, with a margin
env = dict(xmin=-113.72, ymin=53.39, xmax=-113.27, ymax=53.72, spatialReference={'wkid': 4326})
base = dict(f='json', where='1=1', geometry=json.dumps(env), geometryType='esriGeometryEnvelope', inSR=4326, spatialRel='esriSpatialRelIntersects',
            outFields='*', outSR=3776, returnGeometry='true', orderByFields='objectid')
cnt = get(U + '/query', dict(base, returnCountOnly='true'))['count']; print('lots in extent:', cnt, 'page size', n)
off, i = 0, 0
while off < cnt:
    fn = os.path.join(OUT, f'page_{i:04d}.json')
    if not os.path.exists(fn):
        d = get(U + '/query', dict(base, resultOffset=off, resultRecordCount=n)); json.dump(d, open(fn, 'w'))
    off += n; i += 1
    if i % 20 == 0: print(off, '/', cnt)
print('done', i, 'pages')
