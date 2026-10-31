"""31 Oct 2026: check 3 (second agent round) of the 88 Architecture-mode sources check 2 changed or flagged.
Results: checks/research_arch_v1/check3_result_0..1.json. Applies new_text and kind changes; logs check 3."""
import json, pathlib, glob
from collections import Counter
R = pathlib.Path(__file__).resolve().parents[2]
D = '31 Oct 2026'
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
C = Counter(); nt = nk = 0
for f in sorted(glob.glob(str(R / 'checks/research_arch_v1/check3_result_*.json'))):
    for k, r in json.load(open(f)).items():
        if k not in S: continue
        for it in r.get('items', []): C[it.get('verdict', '?')] += 1
        if r.get('new_text'): S[k] = r['new_text']; nt += 1
        if r.get('kind_change'): m['source_kinds'][k] = r['kind_change']; nk += 1
        dis = [i for i in r.get('items', []) if i.get('verdict') != 'AGREE']
        cl = m['check_log'].setdefault(k, [])
        if not any(c.get('check') == 3 and c.get('date') == D for c in cl):
            cl.append({'check': 3, 'by': 'Claude (independent agent)', 'date': D, 'where': r.get('where_read', '')[:200],
                       'what': 'agrees with check 2' if not dis else f"{len(dis)} item(s) disagree or unreachable; see {pathlib.Path(f).name}"})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print(dict(C), 'texts', nt, 'kinds', nk)
