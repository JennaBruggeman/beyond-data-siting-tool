"""3 Nov 2026: facility spec research (inv_specs.md, inv_specs_sources.json), check 1 by the research agent. Check 2 pending."""
import json, pathlib
from _licensed import clean  # 11 Nov 2026: loaded checks/ files pass the licensed-text guard
R = pathlib.Path(__file__).resolve().parents[2]
A = R / 'checks/research_arch_v1'
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
KIND = [('OPERATOR CLAIM','operator claim'),('MAKER CLAIM','manufacturer claim'),('BROKER CLAIM','broker claim'),('DEVELOPER CLAIM','developer claim'),
        ('PERMIT','rule'),('GOV','government'),('RULE','rule'),('REGULATOR','government'),('UTILITY','utility record'),('INSTITUTION','institution'),('ENG','engineer claim'),('LEAD','lead (not evidence)')]
src = clean(json.load(open(A / 'inv_specs_sources.json'))); n = 0
for k, v in src.items():
    if k.startswith('_'): continue
    if k not in S: n += 1
    S[k] = v
    kind = next((kk for pre, kk in KIND if v.upper().startswith(pre)), 'named in our notes, not yet checked')
    m['source_kinds'][k] = kind; m['source_check'][k] = 'claude'
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('check') == 1 for c in cl):
        cl.append({'check': 1, 'by': 'Claude (research agent)', 'date': '3 Nov 2026', 'where': 'checks/research_arch_v1/inv_specs.md', 'what': 'figures quoted in the source entry'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('new', n)
