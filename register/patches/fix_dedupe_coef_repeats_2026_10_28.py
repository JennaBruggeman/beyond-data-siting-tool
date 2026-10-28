"""28 Oct 2026: earlier non-idempotent patches had appended the same clause to some coef strings more than once
(e.g. horizons: one clause 14 times). Collapse any run of an identical segment (40+ characters) repeated back to back."""
import json, pathlib, re
R = pathlib.Path(__file__).resolve().parents[2]
pat = re.compile(r'(.{40,600}?)\1+', re.S)
def fix(x, log, p=''):
    if isinstance(x, dict): return {k: fix(v, log, p + '.' + k) for k, v in x.items()}
    if isinstance(x, list): return [fix(v, log, p + f'[{i}]') for i, v in enumerate(x)]
    if isinstance(x, str) and len(x) > 80:
        y = x
        while True:
            z = pat.sub(r'\1', y)
            if z == y: break
            y = z
        if y != x: log.append((p, len(x), len(y)))
        return y
    return x
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; log = []; d = fix(json.loads(p.read_text()), log)
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    for l in log: print(f, *l)
