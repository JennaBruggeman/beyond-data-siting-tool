# Fixture for the plantfit port (J.B. 13 Nov 2026, layout (a)): for each board whose grown.json holds a plant packed by eh/plantfit.py, the packer's
# inputs as eh/stepback.py builds them (plant yards, lot, building rects with door landings and yard walks, fuel fill, the order that fitted) and the
# units it placed. checks/tests/plantfit_port_test.js packs the same inputs with tool/plantfit.js and compares unit by unit.
# Usage (bd-testenv python): python -I plantfit_fixture.py "<Claude Link>/eh" <out.json>   (the output holds board geometry: keep it out of git)
import sys, os, json, importlib.util
EH, OUT = sys.argv[1], sys.argv[2]
sys.path.insert(0, EH)
import stepback as SB
FITS = ['v8980', 'e4103', 'e10003', 'e15231', 'e16075']
out = {}
for f in FITS:
    d = os.path.join(EH, f); cwd = os.getcwd(); os.chdir(d); sys.path.insert(0, d)
    os.environ.pop('EH_STEPBACK', None)
    try:
        sp = importlib.util.spec_from_file_location('geom_' + f, os.path.join(d, 'geom.py')); G = importlib.util.module_from_spec(sp); sp.loader.exec_module(G)
    finally:
        os.chdir(cwd); sys.path.pop(0)
    gj = json.load(open(os.path.join(d, 'grown.json')))
    plant = gj['plant']; kind = lambda p: 'hub' if p['id'].startswith('h') else {'g': 'gen', 't': 'pad', 'c': 'chill'}[p['id'][0]]
    dims = lambda k: next(((round(p['r'][1] - p['r'][0], 3), round(p['r'][3] - p['r'][2], 3)) for p in plant if kind(p) == k), None)
    # the packer's need, as stepback.plant() hands it (unit sizes from sizing.py are the sizes of the placed units, either orientation)
    import sizing as SZ
    g = SZ.gens(gj['MW'] * 1.55, 0.0)
    need = dict(gen=[sum(1 for p in plant if kind(p) == 'gen'), list(g['footprint'])], pad=[sum(1 for p in plant if kind(p) == 'pad'), list(dims('pad') or (0, 0))],
                hub=list(dims('hub')) if dims('hub') else None, chill=sum(1 for p in plant if kind(p) == 'chill'))
    # pad and hub dims: the sizing rule's own (placed units may be turned): read from sizing with the board's hub load where it can
    t = SZ.transformers(gj['MW'] * 1.55, gj.get('hub_kw') or 0.0, 'e' if f.startswith('e') else 'v'); need['pad'][1] = list(t['pad'])
    hs = SZ.hub_set(gj.get('hub_kw') or 60.0); enc = hs['enclosure'][0] if hs.get('enclosure') else hs['footprint']; need['hub'] = list(enc) if enc and need['hub'] else None
    out[f] = dict(yard=json.loads(json.dumps(list(G.PLANT_YARDS))), lot=[list(p) for p in G.LOTPOLY], bld=[list(r) for r in SB._bld(G, [])],
                  fill=[list(p) for p in getattr(G, 'FUEL_FILL', [])], order=gj['order'], need=need, MW=gj['MW'], hub_kw=gj.get('hub_kw'),
                  expect=[dict(kind=kind(p), r=list(p['r'])) for p in plant])
    print(f, 'units', len(plant), 'bld rects', len(out[f]['bld']), 'need', need)
json.dump(out, open(OUT, 'w'), indent=0)
