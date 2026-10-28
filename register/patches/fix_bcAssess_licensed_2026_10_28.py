"""bcAssess2026 (J.B. 28 Oct 2026): licensed BC Assessment data accessed by J.B. through UBC Abacus; it cannot be checked on the open
web by design. Closed as a licensed dataset, not as an unreachable page. Raw data is never in the repo; derived values only."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
A = "(licensed to UBC researchers; derived values only, rounded)"
B = "(licensed to UBC researchers and accessed by J.B. under that licence; not public, so it cannot be checked on the open web; derived values only, rounded)"
for p in (R / 'register/formula_register.json', R / 'tool/opps.json'):
    s = p.read_text(); n = s.count(A); p.write_text(s.replace(A, B)); print(p.name, n)
