#!/usr/bin/env python3
"""Hand the register's opportunity labels, add-ons (try menu), label systems and the text of every source they cite to the tool.
In: formula_register.json. Out: tool/opps.json. Run after make_register_md.py (pipeline), or any time the register changes."""
import json, os, re
H = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(H)
r = json.load(open(os.path.join(ROOT, 'formula_register.json'), encoding='utf-8'))
m = r['meta']; S = {**r.get('old_sources', {}), **r['new_sources']}
used = set()
def walk(x):
    if isinstance(x, dict):
        for k, v in x.items():
            if k in ('sources', 'rule_sources', 'readiness_sources') and isinstance(v, list): used.update(v)
            else: walk(v)
    elif isinstance(x, list):
        for v in x: walk(v)
walk(m['opportunity_labels']); walk(m['try_menu'])
used.update(m.get('source_kinds', {}).keys())
Q = {q['id']: {'name': q['name'], 'formula': q['formula'], 'coef': q.get('coef', ''), 'unit': q['unit'], 'sources': q['sources'], 'conf': q['conf'], 'status': q['status']} for q in r['quantities']}
for q in Q.values(): used.update(q['sources'])
out = {'date': m.get('date', ''), 'label_systems': m['label_systems'], 'opportunities': m['opportunity_labels'], 'addons': m['try_menu'],
       'quantities': Q, 'opp_quantities': r.get('opportunity_quantities', {}), 'source_kinds': m.get('source_kinds', {}), 'source_check': m.get('source_check', {}),
       'sources': {k: S[k] for k in sorted(used) if k in S}}
json.dump(out, open(os.path.join(H, 'opps.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
print('opps.json', len(out['opportunities']), 'opportunities,', len(out['addons']), 'add-ons,', len(out['sources']), 'sources,', round(os.path.getsize(os.path.join(H, 'opps.json')) / 1024), 'KB')
