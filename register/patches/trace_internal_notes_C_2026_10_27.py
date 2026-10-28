"""Source sweep group C (J.B. 27 Oct 2026): parts that cited internal notes now cite the primary documents inside them
(trace in groupC_trace_2026-10-27.json, drawn from sources/16-25 and the register's own citations; no web lookups).
An internal id is removed only where every fact in the part has a named primary; otherwise it stays, labelled 'internal note'.
New sources are flagged 'named in our notes, not yet checked'. No coefficients or values change."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
T = json.loads((R / 'register/patches/groupC_trace_2026-10-27.json').read_text())
reg = R / 'register/formula_register.json'; r = json.loads(reg.read_text())
op = R / 'tool/opps.json'; o = json.loads(op.read_text())
parts = {p['id']: p for p in r['quantities'] + r['conditions']}
added, removed, kept = 0, 0, 0
for x in T:
    p = parts.get(x['part_id'])
    if not p: print('no part', x['part_id']); continue
    for i, c in x['new_sources'].items():
        r['new_sources'].setdefault(i, c); o['sources'].setdefault(i, c)
        o.setdefault('source_kinds', {}).setdefault(i, 'named in our notes, not yet checked'); o.setdefault('source_check', {}).setdefault(i, 'claude')
    old_role = next((s for s in p.get('source_roles', []) if s.get('id') == x['internal_id']), {})
    for i in x['replace_with'] + list(x['new_sources']):
        if i not in p['sources']:
            p['sources'].append(i); added += 1
            p.setdefault('source_roles', []).append({'id': i, 'term': p.get('name', ''), 'role': 'traced from ' + x['internal_id'], 'conf': old_role.get('conf', 50), 'verified': False})
    if not x['unsupported'] and (x['replace_with'] or x['new_sources']):
        p['sources'] = [s for s in p['sources'] if s != x['internal_id']]
        p['source_roles'] = [s for s in p.get('source_roles', []) if s.get('id') != x['internal_id']]; removed += 1
    else:
        for s in p.get('source_roles', []):
            if s.get('id') == x['internal_id']: s['role'] = 'internal note (no primary named for: ' + '; '.join(x['unsupported'])[:300] + ')'
        kept += 1
reg.write_text(json.dumps(r, ensure_ascii=False, indent=1)); op.write_text(json.dumps(o, ensure_ascii=False, separators=(',', ':')))
print('sources added to parts', added, '| internal ids removed', removed, '| kept as internal note', kept)
