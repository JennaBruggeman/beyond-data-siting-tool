"""J.B. 28 Oct 2026: energy-poverty threshold switched from CUSP 6% (no CUSP source found) to Statistics Canada's
10% of after-tax income on energy bills. Register text only (affordability is not computed in the tool)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
TXT = [('"annual heat cost ÷ after-tax income; energy poverty if > 6%"', '"annual heat cost ÷ after-tax income; energy poverty if ≥ 10% (Statistics Canada threshold)"'),
       ('"CUSP 6%; Canada household energy $2,535 (2019);', '"Statistics Canada (2024) threshold ≥10 % of after-tax income on energy bills (CUSP 6% dropped 28 Oct 2026: no CUSP source found); Canada household energy $2,535 (2019);')]
for p, pretty in ((R / 'register/formula_register.json', True), (R / 'tool/opps.json', False)):
    s = p.read_text(); n = 0
    for a, b in TXT: n += s.count(a); s = s.replace(a, b)
    d = json.loads(s)
    for k in ('quantities',) if not pretty else ():
        pass
    def drop(x):
        if isinstance(x, dict): return {k: drop(v) for k, v in x.items()}
        if isinstance(x, list): return [drop(v) for v in x if v != 'cusp']
        return x
    d = drop(d)
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(p.name, n)
# (also removed the cusp entry from affordability.source_roles, done once on 28 Oct 2026)
