# Export Cowork's Emergency hub hand fits (eh/<fit>/geom.py) to JSON fixtures for tool/treach.js,
# and record what Cowork's own Python checks say about each fit (expected_<fit>.json) for the parity test.
#
#   python -I checks/tests/eh_fixtures_export.py "<Claude Link>/eh" checks/fixtures
#
# Run it from a scratch working directory (the geom.py files are executed). Writes:
#   <fixtures>/eh/<fit>.json, expected_<fit>.json         Vancouver fits (committed: rooms and doors only, no lot outline)
#   <fixtures>/eh_local/<fit>.json, expected_<fit>.json   Edmonton fits (Altalis-derived lots: never committed, .gitignore)
# Cowork's scripts are read, never edited: reach.py and deadend.py are imported from the eh folder; audit_rooms.py is
# executed from its text with three in-memory substitutions (base folder, fit list, output file), see audit().
import sys, os, json, runpy, io, contextlib, types, tempfile, math

VAN = ['v339', 'v1330', 'v8238', 'v1353', 'v8980']
EDM = ['e06b', 'e4103', 'e14715']
ROOM_KEYS = ('id', 'n', 'g', 'r', 'core', 'stair', 'kind')   # all the three scripts read from a room


def load(eh, fit):
    d = os.path.join(eh, fit); cwd = os.getcwd(); os.chdir(d); sys.path.insert(0, d)
    try:
        with contextlib.redirect_stdout(io.StringIO()):
            return runpy.run_path(os.path.join(d, 'geom.py'), run_name='geomexport')
    finally:
        os.chdir(cwd); sys.path.remove(d)


def fixture(g, fit):
    S = {}
    extra = set()
    for st, rooms in g['S'].items():
        S[str(st)] = []
        for x in rooms:
            extra |= set(x) - set(ROOM_KEYS)
            S[str(st)].append({k: ([list(r) for r in x[k]] if k == 'r' else x[k]) for k in ROOM_KEYS if k in x})
    D = [list(d) for d in g['D']]
    return {'fit': fit, 'city': 'edm' if fit.startswith('e') else 'van',
            'source': f'Claude Link/eh/{fit}/geom.py (Cowork hand fit); rooms and doors only, lot outline stripped',
            'S': S, 'D': D}, sorted(extra)


def fin(x):   # json-safe number (deadend gives inf for a corridor with no exit)
    return None if isinstance(x, float) and math.isinf(x) else x


def audit(eh, fit):
    src = open(os.path.join(eh, 'audit_rooms.py'), encoding='utf-8').read()
    out = os.path.join(tempfile.mkdtemp(), 'out.json')
    subs = [("base=os.path.expanduser('~/mnt/Claude Link/eh')", 'base=_EH'),
            ("open(os.path.expanduser('~/aud/out.json'),'w')", "open(_OUT,'w')")]
    for a, b in subs:
        assert src.count(a) == 1, a
        src = src.replace(a, b)
    i = src.index('fits={'); j = src.index('\n', i)
    src = src[:i] + 'fits={_FIT:_FIT}' + src[j:]
    with contextlib.redirect_stdout(io.StringIO()):
        exec(compile(src, 'audit_rooms.py', 'exec'), {'_EH': eh, '_OUT': out, '_FIT': fit, '__name__': 'audit'})
    return json.load(open(out))[fit]


def expected(eh, g, fit):
    import reach, deadend
    G = types.SimpleNamespace(S=g['S'], D=g['D'])
    out, K = reach.run(G)
    r = [{'rule': o[0], 'storey': o[1][0] if o[1] else None, 'room': o[1][1] if o[1] else None, 'reason': o[2]} for o in out]
    c = [{'storey': x[0], 'corridor': x[1], 'kind': x[2], 'exits': x[3], 'deadEnd_m': fin(x[4]), 'exitNames': x[5]}
         for x in deadend.corridors(G)]
    kinds = {f'{st}:{i}': k for (st, i), k in K.items()}
    return {'fit': fit, 'by': 'Cowork eh/reach.py, eh/deadend.py, eh/audit_rooms.py (run by checks/tests/eh_fixtures_export.py)',
            'reach': r, 'kinds': kinds, 'deadend': c, 'audit': audit(eh, fit)}


def main():
    eh, fx = os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2])
    sys.path.insert(0, eh)
    for fit in VAN + EDM:
        g = load(eh, fit)
        f, extra = fixture(g, fit)
        od = os.path.join(fx, 'eh' if fit in VAN else 'eh_local'); os.makedirs(od, exist_ok=True)
        json.dump(f, open(os.path.join(od, fit + '.json'), 'w'), indent=None, separators=(',', ':'))
        e = expected(eh, g, fit)
        json.dump(e, open(os.path.join(od, 'expected_' + fit + '.json'), 'w'), indent=1)
        print(fit, 'rooms', sum(len(v) for v in f['S'].values()), 'doors', len(f['D']), 'reach findings', len(e['reach']),
              'corridors', len(e['deadend']), 'ignored room keys', extra)


if __name__ == '__main__':
    main()
