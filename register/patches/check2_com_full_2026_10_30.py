"""Check 2 (community and full tiers, 30 Oct 2026): 487 sources re-read by 16 independent agent runs (scratchpad check3/result_com_1–10, result_full_1–6).
For the 128 sources that had no earlier check on record, this read is logged as CHECK 1 (check 2 still open).
Logs results and attaches each difference to its source as a visible 'CHECK 2' (or 'CHECK 1') note; no values the tool shows are changed here.
Value-changing fixes are listed for J.B. in checks/check2/check2_fixlist_com_full.md."""
import json, glob, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
S = '/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/check3'
D = '30 Oct 2026'
res, first = {}, {}
for g in sorted(glob.glob(S + '/com_*.json') + glob.glob(S + '/full_*.json')):
    inp = json.load(open(g)); out = json.load(open(S + '/result_' + g.split('/')[-1]))
    for k, v in out.items():
        res[k] = ('result_' + g.split('/')[-1], v); first[k] = inp.get(k, {}).get('this_read_counts_as') == 'check 1'
def note(v):
    parts = []
    for c in v.get('claims', []):
        if c.get('verdict') in ('CORRECTED', 'NOT FOUND', 'UNREACHABLE'):
            t = c.get('fix') or c.get('evidence') or ''
            parts.append(f"{c['verdict'].lower()}: {c.get('claim','')[:140]}" + (f" → {t[:220]}" if t else ''))
    for o in v.get('overreach', []) or []: parts.append('overreach: ' + str(o)[:220])
    if v.get('roles_ok') in (False, 'partly'): parts.append(f"roles: {'not supported' if v['roles_ok'] is False else 'partly supported'}")
    return parts
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; d = json.loads(p.read_text()); srcs = d['new_sources'] if pretty else d['sources']
    for k, (file, v) in res.items():
        if k not in srcs: continue
        tag = 'CHECK 1' if first[k] else 'CHECK 2'
        ps = note(v)
        if ps and f' ‖ {tag} ({D}' not in srcs[k]: srcs[k] += f" ‖ {tag} ({D}, {v.get('overall')}): " + '; '.join(ps)
    if pretty:
        cl = d['meta'].setdefault('check_log', {})
        for k, (file, v) in res.items():
            if v.get('overall') == 'unreachable': 
                cl.setdefault(k, [])
                if not any(c.get('date') == D and c.get('result', '').startswith('not read') for c in cl[k]):
                    cl[k].append({'check': None, 'by': 'independent agent run', 'date': D, 'result': 'not read: source could not be opened (' + v.get('where_read', '')[:160] + ')', 'record': 'scratchpad check3/' + file})
                continue
            n = sum(1 for c in v.get('claims', []) if c.get('verdict') == 'CONFIRMED'); t = len(v.get('claims', []))
            ck = 1 if first[k] else 2
            cl.setdefault(k, [])
            if not any(c.get('check') == ck and c.get('date') == D for c in cl[k]):
                cl[k].append({'check': ck, 'by': 'independent agent run' if ck == 2 else 'agent run (first recorded read)', 'date': D, 'where': v.get('where_read', '')[:300],
                              'result': {'ok': 'confirmed', 'needs fix': f'differences found: see CHECK {ck} note on the source; value fixes pending J.B.'}[v.get('overall', 'ok')] + f' ({n} of {t} claims confirmed)',
                              'record': 'scratchpad check3/' + file})
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, 'ok')
