"""3 Nov 2026 (overnight): a check round for the 260 register sources that had fewer than two recorded checks.
Results: checks/research_arch_v1/checkLow_result_low_0..2.json (brief CHECK_LOW_BRIEF.md). Applies new_text, kind changes, scope flags; logs the check as the next number."""
import json, pathlib, glob
from _licensed import clean  # 11 Nov 2026: loaded checks/ files pass the licensed-text guard
from collections import Counter
R = pathlib.Path(__file__).resolve().parents[2]
D = '3 Nov 2026'
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
C = Counter(); nt = nk = 0
for f in sorted(glob.glob(str(R / 'checks/research_arch_v1/checkLow_result_*.json'))):
    for k, r in clean(json.load(open(f))).items():
        if k not in S: continue
        for c in r.get('claims', []): C[c.get('verdict', '?')] += 1
        if r.get('new_text'): S[k] = r['new_text']; nt += 1
        if r.get('kind_change'): m['source_kinds'][k] = r['kind_change']; nk += 1
        if r.get('scope_flag') and 'SCOPE (check' not in S[k]: S[k] += ' ‖ SCOPE (check, 3 Nov 2026): ' + r['scope_flag']
        cl = m['check_log'].setdefault(k, [])
        if any(c.get('date') == D and c.get('where', '').startswith('checkLow') for c in cl): continue
        claims = r.get('claims', []); bad = [c for c in claims if c.get('verdict') in ('WRONG', 'NOT FOUND')]; unr = [c for c in claims if c.get('verdict') == 'UNREACHABLE']
        if claims and len(unr) == len(claims):
            cl.append({'check': None, 'by': 'Claude (independent agent)', 'date': D, 'where': 'checkLow: source unreachable', 'what': 'not checked: unreachable'}); continue
        nxt = max([c.get('check') or 0 for c in cl] or [0]) + 1
        cl.append({'check': nxt, 'by': 'Claude (independent agent)', 'date': D, 'where': 'checkLow ' + r.get('where_read', '')[:180],
                   'what': ('ok' if not bad else f'{len(bad)} claim(s) corrected or not found') + (f'; {len(unr)} unreachable' if unr else '') + f'; see {pathlib.Path(f).name}'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print(dict(C), 'texts', nt, 'kinds', nk)
