# Fixture for layout (c), the hall grown into the plant yard (J.B. 13 Nov 2026): for each at-grade board the hub grew with eh/stepback.py, the board at
# growth 0 (grow.py BUILD(0)), the one coordinate the growth moves (found by comparing BUILD(0) with BUILD(1) and BUILD(2)), the step-back's inputs
# (DMAX, LIMIT, MW_FLOOR, ZONES, hub load, city) and the hub's own steps from grown.json. checks/tests/growyard_port_test.js runs tool/growyard.js on
# it and compares step by step. The output holds Edmonton lot outlines (Altalis via EPSB GIS, academic use only): keep it out of git.
# Usage (bd-testenv python): python -I growyard_fixture.py "<Claude Link>/eh" <out.json> [<tool/data>]
import sys, os, json, importlib.util
EH, OUT = sys.argv[1], sys.argv[2]
sys.path.insert(0, EH)
import stepback as SB
FITS = ['e4103', 'e10003', 'e15231', 'e16075', 'e06b', 'e14715', 'v339', 'v8980']   # 11i (13 Nov): 339 and 8980 grow by moving the back wall too (layout (a))
def geo(G):
    rect = lambda r: [round(float(v), 4) for v in r]
    return dict(S={str(k): [dict(id=x['id'], n=x['n'], g=x['g'], r=[rect(r) for r in x['r']], core=bool(x.get('core')), stair=bool(x.get('stair'))) for x in G.S[k]] for k in G.S},
                D=[list(d) for d in G.D], PLANT=[dict(id=p['id'], n=p['n'], r=rect(p['r'] if not isinstance(p['r'], list) else p['r'][0])) for p in G.PLANT],
                PLANT_YARDS=[(rect(Y) if len(Y) == 4 and all(isinstance(v, (int, float)) for v in Y) else [list(map(float, q)) for q in Y]) for Y in G.PLANT_YARDS],
                LOTPOLY=[list(map(float, p)) for p in G.LOTPOLY], FUEL_FILL=[list(map(float, p)) for p in getattr(G, 'FUEL_FILL', [])],
                YARD_WALK=[rect(r) for r in (getattr(G, 'YARD_WALK', None) or [])], GATES=[list(g) for g in getattr(G, 'GATES', [])],
                WALK=[rect(r) for r in (getattr(G, 'WALK', None) or [])], CHILL=[rect(r) for r in (getattr(G, 'CHILL', None) or [])], DOOR_W=getattr(G, 'DOOR_W', 0.9),
                **{k: json.loads(json.dumps(getattr(G, k), default=list)) for k in ('STREET_EDGES', 'DCSPACE', 'DRIVE', 'APRON', 'AISLE', 'COURT', 'YARD_AISLE', 'TRUCK_ROUTES', 'TRUCK_ENTRIES', 'TRUCK_VIA', 'TRUCK_ALONG', 'VGATES', 'PORTAL', 'COVERED', 'H', 'SLAB') if getattr(G, k, None) is not None})
def flat(g):   # every number in the geometry, in order, for the diff
    out = []
    def walk(o):
        if isinstance(o, (int, float)) and not isinstance(o, bool): out.append(float(o))
        elif isinstance(o, dict): [walk(o[k]) for k in sorted(o)]
        elif isinstance(o, (list, tuple)): [walk(v) for v in o]
    walk(g); return out
res = {}
for f in FITS:
    fit = os.path.join(EH, f)
    for m in [k for k in list(sys.modules) if k.startswith(('geom', 'grow'))]: del sys.modules[m]
    G, W = SB._load(fit)
    sys.path[:] = [p for p in sys.path if p not in (fit,)] ; sys.path.insert(0, EH)
    g0, g1, g2, gh = geo(W.BUILD(0.0)), geo(W.BUILD(1.0)), geo(W.BUILD(2.0)), geo(W.BUILD(0.5))
    assert json.dumps(sorted(g0)) == json.dumps(sorted(g1)), f
    def lin(x, y, t):   # x + t (y - x), number by number (same structure)
        if isinstance(x, bool) or not isinstance(x, (int, float, list, dict)): return x
        if isinstance(x, (int, float)): return round(x + t * (y - x), 4)
        if isinstance(x, list): return [lin(p, q, t) for p, q in zip(x, y)]
        return {k: lin(x[k], y[k], t) for k in x}
    if len(flat(g0)) != len(flat(g1)):   # 11i (339, 8980): a piece that has no width at growth 0 is left out there; the form is taken from growth 1 and 2 and run back to 0 (zero-width pieces, no area)
        g0 = lin(g1, g2, -1.0)
        assert flat(lin(g1, g2, -0.5)) == [round(v, 4) for v in flat(gh)] or max(abs(p - q) for p, q in zip(flat(lin(g1, g2, -0.5)), flat(gh))) < 1e-3, f + ': not linear between 0.5 and 2'
    a0, a1, a2 = flat(g0), flat(g1), flat(g2)
    assert len(a0) == len(a1) == len(a2), f
    moved = sorted({round(x, 4) for x, y, z in zip(a0, a1, a2) if abs(y - x) > 1e-6})
    bad = [(x, y, z) for x, y, z in zip(a0, a1, a2) if abs(y - x) > 1e-6 and not (abs(y - x - 1) < 1e-6 and abs(z - x - 2) < 1e-6)]
    gj = json.load(open(os.path.join(fit, 'grown.json')))
    B0 = W.BUILD(0.0)
    res[f] = dict(base=g0, g1=g1, moved=moved, bad=bad[:5], DMAX=W.DMAX, LIMIT=getattr(W, 'LIMIT', None), MW_FLOOR=getattr(W, 'MW_FLOOR', None), ZONES=W.ZONES, REFUGE=W.REFUGE,
                  CITY=getattr(W, 'CITY', 'v'), hub_kw=gj.get('hub_kw'), base_hall=SB.hall_area(B0), base_dc=SB.dc_area(B0),
                  hall1=SB.hall_area(W.BUILD(1.0)), dc1=SB.dc_area(W.BUILD(1.0)), drawn=list(SB.drawn(B0)), grown=dict(MW=gj['MW'], d=gj['d'], stop=gj['stop'], steps=gj['steps'], order=gj.get('order'), plant=gj.get('plant')))
    print(f, 'moves', moved, 'not +d:', len(bad), 'hall', round(res[f]['base_hall'], 1), '+/m', round(res[f]['hall1'] - res[f]['base_hall'], 2), 'steps', len(gj['steps']))
json.dump(res, open(OUT, 'w'))
# the tool's copy (tool/data/hub_grow_edm.json, git-ignored: Edmonton lot outlines), keyed by board key, without the hub's step lists
if len(sys.argv) > 3:
    KEY = {'e4103': 'E4103', 'e10003': 'E10003', 'e15231': 'E15231', 'e16075': 'E16075', 'e06b': 'E06B', 'e14715': 'E14715', 'v339': 'V339', 'v8980': 'V8980'}
    for city in ('edm', 'van'):
      tool = {'_about': 'Layout (c), J.B. 13 Nov 2026: the at-grade boards the hub grew (EH-FREEZE-2026-11-11g), at growth 0 and 1, with the step-back inputs; tool/growyard.js grows them. Built by checks/tests/growyard_fixture.py. Edmonton lot outlines: Altalis via EPSB GIS, academic use only; git-ignored.',
            'fits': {KEY[f]: {k: v for k, v in x.items() if k not in ('grown', 'bad', 'moved')} | {'grownMW': x['grown']['MW'], 'grownStop': x['grown']['stop']['rule']} for f, x in res.items() if f[0] == city[0]}}
      if city == 'van': tool['_about'] = tool['_about'].replace('Edmonton lot outlines: Altalis via EPSB GIS, academic use only; git-ignored.', 'Vancouver: City of Vancouver open data (in git).').replace('EH-FREEZE-2026-11-11g', 'EH-FREEZE-2026-11-11g/11i')
      json.dump(tool, open(os.path.join(sys.argv[3], f'hub_grow_{city}.json'), 'w'), separators=(',', ':'))
      print('wrote', os.path.join(sys.argv[3], f'hub_grow_{city}.json'))
