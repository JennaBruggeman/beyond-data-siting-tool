"""Answer key for the JS port (tool/hubchecks.js): runs each hub board's own run.py from Claude Link eh/ (freeze EH-FREEZE-2026-11-11)
and records, at the moment the board's checks run, the geometry they see (geom.py plus whatever run.py sets on G) and the frozen
scripts' results: reach.run, yardgate.check, portal.check, dcspace.route (every call), audit_rooms.clear_geom (every room).
Needs the freeze's Python packages (shapely, numpy, scipy) and BD_META / BD_LIDAR as the manifest says.
Run: python capture_ref.py "<Claude Link>/eh" "<repo>/tool/tiles/van/meta.json"
Writes ref/<fit>.json (Edmonton fits git-ignored: lot outlines from the Altalis-based tiles)."""
import sys, os, json, runpy, io, contextlib, importlib, tempfile
ONLY = sys.argv[3:]   # optional fit names
EH = os.path.abspath(sys.argv[1]); META = os.path.abspath(sys.argv[2])
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ref'); os.makedirs(OUT, exist_ok=True)
os.environ.setdefault('BD_META', META)
FITS = [('v339', []), ('v1330', []), ('v1353', []), ('v1360', []), ('v8238', ['outright']), ('v8238_mid', ['mid']), ('v8980', []),
        ('e06b', []), ('e10003', []), ('e10004', []), ('e14715', []), ('e15231', []), ('e16075', []), ('e4103', [])]
def js(o):
    if isinstance(o, dict): return {str(k): js(v) for k, v in o.items()}
    if isinstance(o, (list, tuple, set)): return [js(v) for v in o]
    if isinstance(o, (int, float, str, bool)) or o is None: return o
    return repr(o)
def geom_of(G):
    return {k: js(getattr(G, k)) for k in dir(G) if not k.startswith('_') and (k.isupper() or k == 'S') and not callable(getattr(G, k))}
sys.path[:0] = [EH, os.path.join(EH, 'grade')]
import reach, yardgate, portal, dcspace, audit_rooms, tfboard, html as _html, re as _re, shutil
def board_rows(path):
    """(status, title, text) of every check row on a board page"""
    t = open(path, encoding='utf-8').read(); out = []
    for m in _re.finditer(r'<tr><td[^>]*>([^<]*)</td><td[^>]*><div[^>]*>(.*?)</div><div[^>]*>(.*?)</div>', t, _re.S):
        strip = lambda x: _html.unescape(_re.sub(r'<[^>]+>', '', x)).strip()
        out.append([strip(m.group(1)), strip(m.group(2)), strip(m.group(3))])
    return out
for fit, extra in FITS:
    if ONLY and fit not in ONLY: continue
    rec = {'fit': fit, 'geom': None, 'reach': [], 'yardgate': [], 'portal': [], 'route': [], 'clear': {}, 'cfg': None, 'm': None, 'rows': {}, 'audit': [], 'board_rows': None}
    o_ms, o_ag = tfboard.measure, audit_rooms.audit_geom
    o_rows = {k: getattr(tfboard, k) for k in ('_sizing_row', '_hubset_row', '_battery_row', '_width_row')}
    def w_ms(G, cfg):
        m = o_ms(G, cfg)
        rec['cfg'] = js({k: v for k, v in cfg.items() if k in ('refuge_ids', 'shelter_ids', 'city', 'small_lot', 'sizing_fallback', 'sizing_fallback_kw', 'hub_kw')})
        rec['m'] = js({k: m.get(k) for k in ('hall', 'MW', 'Q', 'ref_counted', 'ref_main', 'people', 'hub', 'sz_gen', 'sz_tx', 'ngen', 'genkw', 'ntx', 'tank', 'hub_tank', 'hub_set', 'sz_margin')})
        if rec['geom'] is None: rec['geom'] = geom_of(G)
        return m
    def w_ag(S, name='', fold=''):
        r = o_ag(S, name, fold); rec['audit'].append({'name': name, 'fold': fold, 'storeys': sorted(S), 'rows': js(r)}); return r
    def mk(k):
        def w(*a, **kw):
            r = o_rows[k](*a, **kw); rec['rows'][k] = js([str(r[0])] + list(r[1:])); return r
        return w
    tfboard.measure, audit_rooms.audit_geom = w_ms, w_ag
    for k in o_rows: setattr(tfboard, k, mk(k))
    o_run, o_yg, o_pt, o_rt, o_cg = reach.run, yardgate.check, portal.check, dcspace.route, audit_rooms.clear_geom
    def w_run(G, *a, **k):
        r = o_run(G, *a, **k)
        if rec['geom'] is None: rec['geom'] = geom_of(G)
        rec['reach'].append({'serves': reach.SERVES, 'out': js(r[0]), 'K': {f'{s}|{i}': v for (s, i), v in r[1].items()}}); return r
    def w_yg(G, *a, **k):
        r = o_yg(G, *a, **k)
        if rec['geom'] is None: rec['geom'] = geom_of(G)
        rec['yardgate'].append(js(r)); return r
    def w_pt(G, *a, **k):
        r = o_pt(G, *a, **k); rec['portal'].append(js(r)); return r
    def w_rt(G, st, u, v, o, avoid_truck=True, extra_block=(), start=None):
        r = o_rt(G, st, u, v, o, avoid_truck=avoid_truck, extra_block=extra_block, start=start)
        rec['route'].append({'args': js([st, u, v, o, avoid_truck, extra_block, start]), 'out': js(r)}); return r
    def w_cg(x, rooms, st):
        C, cs = o_cg(x, rooms, st)
        rec['clear'][f"{st}|{x['id']}"] = {'area': C.area, 'n_cells': len(cs), 'cells': sorted(f'{a},{b}' for a, b in cs),
                                         'w': round(audit_rooms.max_square(x['r'], cs), 2)}
        return C, cs
    reach.run, yardgate.check, portal.check, dcspace.route, audit_rooms.clear_geom = w_run, w_yg, w_pt, w_rt, w_cg
    d = os.path.join(EH, fit.split('_')[0]); cwd = os.getcwd(); tmp = tempfile.mkdtemp()
    argv = sys.argv; sys.argv = [os.path.join(d, 'run.py'), os.path.join(tmp, 'board.html'), '0'] + extra
    try:
        os.chdir(d); sys.path.insert(0, d)
        for m in ('geom', 'geom_mid'): sys.modules.pop(m, None)
        with contextlib.redirect_stdout(io.StringIO()): runpy.run_path(os.path.join(d, 'run.py'), run_name='__main__')
        rec['ok'] = True
    except SystemExit: rec['ok'] = True
    except Exception as ex: rec['ok'] = False; rec['error'] = repr(ex)
    finally:
        os.chdir(cwd); sys.path.remove(d); sys.argv = argv
        reach.run, yardgate.check, portal.check, dcspace.route, audit_rooms.clear_geom = o_run, o_yg, o_pt, o_rt, o_cg
        tfboard.measure, audit_rooms.audit_geom = o_ms, o_ag
        for k in o_rows: setattr(tfboard, k, o_rows[k])
    bp = os.path.join(tmp, 'board.html')
    if os.path.exists(bp): rec['board_rows'] = board_rows(bp)
    json.dump(rec, open(os.path.join(OUT, fit + '.json'), 'w', encoding='utf-8'), ensure_ascii=False)
    print(fit, 'ok' if rec['ok'] else rec['error'], len(rec['rows']), 'rows,', len(rec['board_rows'] or []), 'board rows,', len(rec['reach']), 'reach,', len(rec['yardgate']), 'yardgate,', len(rec['route']), 'routes,', len(rec['clear']), 'rooms')
