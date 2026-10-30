"""Check 2, resident-tier sources (29 Oct 2026): 190 sources re-read by six independent agent runs (scratchpad check2/result_res_1–6.json).
This patch LOGS the results and attaches each correction to its source entry as a visible 'CHECK 2' note; it does not yet
rewrite values the tool shows. Value-changing fixes are listed separately for J.B. (check2_fixlist_resident.md)."""
import json, glob, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
S = '/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/check2'
D = '29 Oct 2026'
res = {}
for f in sorted(glob.glob(S + '/result_res_*.json')):
    for k, v in json.load(open(f)).items(): res[k] = (f.split('/')[-1], v)

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
    old = d.get('old_sources', {}) if pretty else {}
    for k, (file, v) in res.items():
        tgt = srcs if k in srcs else old if k in old else None
        if tgt is None: continue
        ps = note(v)
        if ps and ' ‖ CHECK 2 (29 Oct 2026' not in tgt[k]:
            tgt[k] += f" ‖ CHECK 2 ({D}, {v.get('overall')}): " + '; '.join(ps)
    if pretty:
        cl = d['meta'].setdefault('check_log', {})
        for k, (file, v) in res.items():
            cl.setdefault(k, [])
            if not any(c.get('check') == 2 for c in cl[k]):
                n = sum(1 for c in v.get('claims', []) if c.get('verdict') == 'CONFIRMED'); t = len(v.get('claims', []))
                cl[k].append({'check': 2, 'by': 'independent agent run', 'date': D, 'where': v.get('where_read', '')[:300],
                              'result': {'ok': 'confirmed', 'needs fix': 'differences found: see CHECK 2 note on the source; value fixes pending J.B.', 'unreachable': 'source could not be read: still single-checked'}[v.get('overall', 'ok')] + f' ({n} of {t} claims confirmed)',
                              'record': 'scratchpad check2/' + file})
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, 'ok')
