"""Export the hub fits' geometry (Claude Link eh/<fit>/geom.py, freeze EH-FREEZE-2026-11-11) to JSON for the JS port tests.
J.B. 11 Nov 2026: OK to export the geom.py geometry once frozen. Edmonton fits carry lot outlines from the tool's Edmonton
tiles (Altalis, course use only): their JSON is written but git-ignored (checks/tests/hub_port/geom/e*.json).
Run: python export_geom.py "<Claude Link>/eh"   (plain Python, no packages)"""
import sys, os, json, importlib.util, hashlib
EH = os.path.abspath(sys.argv[1]); OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'geom')
FITS = [('v339', 'geom.py'), ('v1330', 'geom.py'), ('v1353', 'geom.py'), ('v1360', 'geom.py'), ('v8238', 'geom.py'), ('v8238_mid', 'geom_mid.py'),
        ('v8980', 'geom.py'), ('e06b', 'geom.py'), ('e10003', 'geom.py'), ('e10004', 'geom.py'), ('e14715', 'geom.py'),
        ('e15231', 'geom.py'), ('e16075', 'geom.py'), ('e4103', 'geom.py')]
def js(o):
    if isinstance(o, dict): return {str(k): js(v) for k, v in o.items()}
    if isinstance(o, (list, tuple, set)): return [js(v) for v in o]
    if isinstance(o, (int, float, str, bool)) or o is None: return o
    raise TypeError
for name, gf in FITS:
    d = os.path.join(EH, name.split('_')[0]); cwd = os.getcwd(); os.chdir(d); sys.path[:0] = [d, EH]
    try:
        sp = importlib.util.spec_from_file_location('geom_' + name, os.path.join(d, gf)); G = importlib.util.module_from_spec(sp); sp.loader.exec_module(G)
    finally:
        os.chdir(cwd); del sys.path[:2]
    out = {'_fit': name, '_file': f'eh/{name.split("_")[0]}/{gf}', '_sha16': hashlib.sha256(open(os.path.join(d, gf), 'rb').read()).hexdigest()[:16]}
    for k in dir(G):
        if k.startswith('_') or not (k.isupper() or k == 'S'): continue
        try: out[k] = js(getattr(G, k))
        except TypeError: pass
    json.dump(out, open(os.path.join(OUT, name + '.json'), 'w', encoding='utf-8'), ensure_ascii=False)
    print(name, len(out), 'fields;', sum(len(v) for v in G.S.values()), 'rooms;', len(G.D), 'doors')
