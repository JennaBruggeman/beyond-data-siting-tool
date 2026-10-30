"""30 Oct 2026, J.B. 'yes': apply the clear-cut check-2 corrections (drafted per source from the check-2 findings: checks/check2/fixes_proposed_2026_10_30.json).
Register text rewritten to what the sources say; kinds and role labels corrected; display-text edits in tool code applied by a separate step.
Judgement calls are NOT applied: they stay as an open note on the source and go to J.B. (checks/check2/judgement_calls_2026_10_30.md)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]; D = '30 Oct 2026'
FX = json.load(open(R / 'checks/check2/fixes_proposed_2026_10_30.json'))
def newtext(k, v, cur):
    base = v['new_text'] if v.get('new_text') else cur.split(' ‖ ')[0]
    tail = f" ‖ CHECK 2 fixes applied ({D}): {v.get('summary') or 'none needed'}"
    if v.get('judgement'): tail += f" ‖ OPEN for J.B. ({D}): " + '; '.join(j['question'] for j in v['judgement'])
    return base + tail
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; d = json.loads(p.read_text()); S = d['new_sources'] if pretty else d['sources']
    n = 0
    for k, v in FX.items():
        if k not in S or f'CHECK 2 fixes applied ({D})' in S[k]: continue
        S[k] = newtext(k, v, S[k]); n += 1
        if v.get('kind'): (d['meta']['source_kinds'] if pretty else d.setdefault('source_kinds', {}))[k] = v['kind']
    if pretty:
        Q = {q['id']: q for q in d['quantities']}; rc = 0
        for k, v in FX.items():
            for c in v.get('role_changes') or []:
                q = Q.get(c.get('node'))
                if not q: continue
                for x in q.get('source_roles', []):
                    if x['id'] == k and (x.get('role') == c.get('old_role') or x.get('term') == c.get('term')):
                        x['role'] = c['new_role']; x['relabel'] = f"{D}: {c.get('old_role')} → {c['new_role']} ({c.get('why','')[:160]})"; rc += 1; break
            L = d['meta']['check_log'].setdefault(k, [])
            if not any(e.get('what') == 'check-2 fixes applied' for e in L):
                L.append({'check': 2, 'by': 'Claude (from the independent read)', 'date': D, 'what': 'check-2 fixes applied', 'result': v.get('summary') or 'none needed', 'record': 'checks/check2/fixes_proposed_2026_10_30.json'})
        print('roles relabelled', rc)
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, 'sources rewritten', n)
