"""The hub's own failure tests, replayed on the JS port (J.B. 11 Nov 2026, step c). Runs Claude Link eh/tests/fixbatch_tests.py (155) and
ic20_yardgate_tests.py (19) unchanged, and records every call they make into a ported check (reach.run, yardgate.check, dcspace.route,
portal.check, audit_rooms.audit_geom / clear_geom, sizing.*, hubload.load, tfboard._st / _width_row / _sizing_row / _hubset_row / _battery_row):
the input (plan geometry, arguments) and the Python result. port_tests_replay.js runs the same calls in tool/hubchecks.js.
Run: python capture_tests.py "<Claude Link>/eh"   Writes ref_tests/calls.json and ref_tests/results.txt (the suites' own output)."""
import sys, os, json, runpy, io, contextlib, functools
EH = os.path.abspath(sys.argv[1]); OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ref_tests'); os.makedirs(OUT, exist_ok=True)
sys.path[:0] = [os.path.join(EH, 'tests'), EH, os.path.join(EH, 'grade')]
def js(o):
    if isinstance(o, dict): return {str(k): js(v) for k, v in o.items()}
    if isinstance(o, (list, tuple, set)): return [js(v) for v in o]
    if isinstance(o, (int, float, str, bool)) or o is None: return o
    return repr(o)
def geom_of(G):
    return {k: js(getattr(G, k)) for k in dir(G) if not k.startswith('_') and (k.isupper() or k == 'S') and not callable(getattr(G, k))}
import reach, yardgate, dcspace, portal, audit_rooms, sizing, hubload, tfboard
CALLS = []; CTX = {'suite': None}
def wrap(mod, name, kind):
    f = getattr(mod, name)
    @functools.wraps(f)
    def w(*a, **k):
        r = f(*a, **k)
        rec = {'suite': CTX['suite'], 'fn': f'{mod.__name__}.{name}'}
        try:
            if kind == 'G':      # first argument is a plan
                rec.update(geom=geom_of(a[0]), args=js(list(a[1:])), kw=js(k))
            elif kind == 'Gcfg':
                rec.update(geom=geom_of(a[0]), cfg=js(a[1]), m=js(a[2]) if len(a) > 2 else None)
            elif kind == 'clear':
                x, rooms, st = a; rec.update(x=js(x), rooms=js(rooms), st=st)
            elif kind == 'audit':
                rec.update(S=js(a[0]), args=js(list(a[1:])), kw=js(k))
            else:
                rec.update(args=js(list(a)), kw=js(k))
            if name == 'run': rec['serves'] = reach.SERVES
            rec['clear_flag'] = audit_rooms.CLEAR   # clear sizes on (the freeze) or off (centreline, a test switch)
            if name == 'clear_geom': rec['out'] = {'area': r[0].area, 'cells': sorted(f'{p},{q}' for p, q in r[1])}
            elif name == '_st': rec['out'] = [str(r), getattr(r, 'over', None), getattr(r, 'unit', None)]
            else: rec['out'] = js(r)
        except Exception as ex:
            rec['capture_error'] = repr(ex)
        CALLS.append(rec); return r
    setattr(mod, name, w)
for m, n, k in [(reach, 'run', 'G'), (yardgate, 'check', 'G'), (dcspace, 'route', 'G'), (portal, 'check', 'G'), (audit_rooms, 'audit_geom', 'audit'),
                (audit_rooms, 'clear_geom', 'clear'), (sizing, 'gens', 'a'), (sizing, 'transformers', 'a'), (sizing, 'switch_margin', 'a'), (sizing, 'hub_tank', 'a'),
                (sizing, 'hub_set', 'a'), (sizing, 'batt_cabinets', 'a'), (sizing, 'batt_room', 'a'), (sizing, 'kd300_lh', 'a'), (hubload, 'load', 'G'),
                (tfboard, '_st', 'a'), (tfboard, '_width_row', 'Gcfg'), (tfboard, '_sizing_row', 'Gcfg'), (tfboard, '_hubset_row', 'Gcfg'), (tfboard, '_battery_row', 'Gcfg')]:
    wrap(m, n, k)
log = io.StringIO()
for suite, argv in [('fixbatch', []), ('ic20', [EH])]:
    CTX['suite'] = suite; path = os.path.join(EH, 'tests', 'fixbatch_tests.py' if suite == 'fixbatch' else 'ic20_yardgate_tests.py')
    old = sys.argv; sys.argv = [path] + argv; cwd = os.getcwd(); os.chdir(os.path.join(EH, 'tests'))
    try:
        with contextlib.redirect_stdout(log): runpy.run_path(path, run_name='__main__')
    except SystemExit: pass
    finally: sys.argv = old; os.chdir(cwd)
open(os.path.join(OUT, 'results.txt'), 'w', encoding='utf-8').write(log.getvalue())
json.dump(CALLS, open(os.path.join(OUT, 'calls.json'), 'w', encoding='utf-8'), ensure_ascii=False)
from collections import Counter
print(len(CALLS), 'calls:', dict(Counter(c['fn'] for c in CALLS)))
print('suite lines:', len(log.getvalue().splitlines()), '| capture errors:', sum(1 for c in CALLS if 'capture_error' in c))
