# Export Cowork's Emergency hub hand fits (eh/<fit>/geom.py) to JSON fixtures for tool/treach.js,
# and record what Cowork's own Python checks say about each fit (expected_<fit>.json) for the parity test.
#
#   python -I checks/tests/eh_fixtures_export.py "<Claude Link>/eh" checks/fixtures
#
# Run it from a scratch working directory (the geom.py files are executed). Writes:
#   <fixtures>/eh/<fit>.json, expected_<fit>.json         Vancouver fits (committed: rooms and doors only, no lot outline)
#   <fixtures>/eh_local/<fit>.json, expected_<fit>.json   Edmonton fits (Altalis-derived lots: never committed, .gitignore)
# Cowork's scripts are read, never edited: reach.py and deadend.py are imported from the eh folder; audit_rooms.py is
# loaded as a module and its audit_geom() called per fit (its own fits map picks each fit's geometry file), see audit().
import sys, os, json, runpy, io, contextlib, types, tempfile, math

VAN = ['v339', 'v1330', 'v8238', 'v1353', 'v8980']
EDM = ['e06b', 'e4103', 'e14715']
ROOM_KEYS = ('id', 'n', 'g', 'r', 'core', 'stair', 'kind')   # all the three scripts read from a room


def geomfile(eh, fit):
    """the geometry file Cowork's audit_rooms.py audits for this fit (8 Nov: 8238 is geom_mid.py, the outright option with the south exit passage)"""
    A = audit_mod(eh)
    for fold, gf in A['fits'].values():
        if fold == fit: return gf
    return 'geom.py'


def load(eh, fit):
    d = os.path.join(eh, fit); cwd = os.getcwd(); os.chdir(d); sys.path.insert(0, d)
    try:
        with contextlib.redirect_stdout(io.StringIO()):
            return runpy.run_path(os.path.join(d, geomfile(eh, fit)), run_name='geomexport')
    finally:
        os.chdir(cwd); sys.path.remove(d)


def fixture(g, fit, gfile='geom.py'):
    S = {}
    extra = set()
    for st, rooms in g['S'].items():
        S[str(st)] = []
        for x in rooms:
            extra |= set(x) - set(ROOM_KEYS)
            S[str(st)].append({k: ([list(r) for r in x[k]] if k == 'r' else x[k]) for k in ROOM_KEYS if k in x})
    D = [list(d) for d in g['D']]
    return {'fit': fit, 'city': 'edm' if fit.startswith('e') else 'van',
            'source': f'Claude Link/eh/{fit}/{gfile} (Cowork hand fit); rooms and doors only, lot outline stripped',
            'S': S, 'D': D}, sorted(extra)


def fin(x):   # json-safe number (deadend gives inf for a corridor with no exit)
    return None if isinstance(x, float) and math.isinf(x) else x


_AUD = {}
def audit_mod(eh):
    """Cowork's eh/audit_rooms.py (updated 8 Nov to the approved minimum widths), loaded as a module: its __main__ block does not run"""
    if eh not in _AUD:
        with contextlib.redirect_stdout(io.StringIO()):
            _AUD[eh] = runpy.run_path(os.path.join(eh, 'audit_rooms.py'), run_name='audit')
    return _AUD[eh]


def audit(eh, g, fit):
    A = audit_mod(eh)
    name = next((k for k, (fold, gf) in A['fits'].items() if fold == fit), fit)
    return A['audit_geom'](g.get('S', {}), name, fit)


def expected(eh, g, fit):
    import reach, deadend
    G = types.SimpleNamespace(S=g['S'], D=g['D'])
    out, K = reach.run(G)
    r = [{'rule': o[0], 'storey': o[1][0] if o[1] else None, 'room': o[1][1] if o[1] else None, 'reason': o[2]} for o in out]
    c = [{'storey': x[0], 'corridor': x[1], 'kind': x[2], 'exits': x[3], 'deadEnd_m': fin(x[4]), 'exitNames': x[5]}
         for x in deadend.corridors(G)]
    kinds = {f'{st}:{i}': k for (st, i), k in K.items()}
    return {'fit': fit, 'by': 'Cowork eh/reach.py, eh/deadend.py, eh/audit_rooms.py (run by checks/tests/eh_fixtures_export.py)',
            'reach': r, 'kinds': kinds, 'deadend': c, 'audit': audit(eh, g, fit)}


def main():
    eh, fx = os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2])
    sys.path.insert(0, eh)
    for fit in VAN + EDM:
        g = load(eh, fit)
        f, extra = fixture(g, fit, geomfile(eh, fit))
        od = os.path.join(fx, 'eh' if fit in VAN else 'eh_local'); os.makedirs(od, exist_ok=True)
        json.dump(f, open(os.path.join(od, fit + '.json'), 'w'), indent=None, separators=(',', ':'))
        e = expected(eh, g, fit)
        json.dump(e, open(os.path.join(od, 'expected_' + fit + '.json'), 'w'), indent=1)
        print(fit, 'rooms', sum(len(v) for v in f['S'].values()), 'doors', len(f['D']), 'reach findings', len(e['reach']),
              'corridors', len(e['deadend']), 'ignored room keys', extra)


if __name__ == '__main__':
    main()
