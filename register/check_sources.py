#!/usr/bin/env python3
"""Rebuild guard (30 Oct 2026, J.B.: make source logging automatic): every source a node or opportunity cites must have a
check record (meta.check_log check 1 or 2, or meta.source_check) — or be listed in meta.unread_sources with the reason it
could not be read. Exits 1 and names the offenders otherwise. Run with the rebuild scripts."""
import json, os, sys
H = os.path.dirname(os.path.abspath(__file__))
r = json.load(open(os.path.join(H, 'formula_register.json'))); S = r['new_sources']; m = r['meta']
L = m.get('check_log', {}); SC = m.get('source_check', {}); U = m.get('unread_sources', {})
cited = {}
for q in r['quantities']:
    for s in q.get('sources', []): cited.setdefault(s, []).append(q['id'])
for name, o in m.get('opportunity_labels', {}).items():
    for s in o.get('sources', []): cited.setdefault(s, []).append('opp:' + name)
bad = [s for s in cited if s in S and not SC.get(s) and not any(c.get('check') in (1, 2) for c in L.get(s, [])) and s not in U]
missing = [s for s in cited if s not in S and s not in r.get('old_sources', {})]
for s in sorted(bad): print('NO CHECK RECORD:', s, '← cited by', ', '.join(cited[s][:4]))
print(f'sources cited {len(cited)}; unread (listed) {len([s for s in cited if s in U])}; unrecorded {len(bad)}; ids not in register {len(missing)}')
sys.exit(1 if bad else 0)
