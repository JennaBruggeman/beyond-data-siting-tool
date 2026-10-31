"""31 Oct 2026: check 2 (first independent agent check) of the 136 Architecture-mode sources.
Results: checks/research_arch_v1/check2_result_0..3.json. Applies new_text, kind changes and scope flags; logs check 2."""
import json, pathlib, glob
R = pathlib.Path(__file__).resolve().parents[2]
D = '31 Oct 2026'
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
from collections import Counter
C = Counter(); n_txt = n_kind = 0
for f in sorted(glob.glob(str(R / 'checks/research_arch_v1/check2_result_*.json'))):
    res = json.load(open(f))
    for k, r in res.items():
        if k not in S: continue
        for c in r.get('claims', []): C[c.get('verdict', '?')] += 1
        if r.get('new_text'): S[k] = r['new_text']; n_txt += 1
        if r.get('kind_change'): m['source_kinds'][k] = r['kind_change']; n_kind += 1
        if r.get('scope_flag') and 'SCOPE (check 2' not in S[k]: S[k] += ' ‖ SCOPE (check 2, 31 Oct 2026): ' + r['scope_flag']
        bad = [c for c in r.get('claims', []) if c.get('verdict') in ('WRONG', 'NOT FOUND', 'UNREACHABLE')]
        cl = m['check_log'].setdefault(k, [])
        if not any(c.get('check') == 2 and c.get('date') == D for c in cl):
            cl.append({'check': 2, 'by': 'Claude (independent agent)', 'date': D, 'where': r.get('where_read', '')[:200],
                       'what': 'ok' if not bad else f"{len(bad)} claim(s) corrected or unconfirmed; see {pathlib.Path(f).name}"})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print(dict(C), 'texts', n_txt, 'kinds', n_kind)
