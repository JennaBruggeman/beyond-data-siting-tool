"""cec2024ESS, 28 Oct 2026: rule text second-checked from J.B.'s licensed copy ('CEC 2024.pdf' in her Downloads, read on her
computer only; not copied or stored): 64-900, 64-902, 64-926, 64-1000, 64-1002, 64-1100 match the citation; scope of 64-1002 is
batteries 'exceeding 1 kWh' (64-1000)."""
import pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REP = [('(read 19 Oct 2026, J.B. library copy; rule text not second-checked, the code is paywalled ?)', '(read 19 Oct 2026 and re-read 28 Oct 2026 from J.B.\'s licensed copy, March 2024 printing; not stored)')]
for f in ('register/formula_register.json', 'tool/opps.json'):
    p = R / f; s = p.read_text(); n = 0
    for a, b in REP: n += s.count(a); s = s.replace(a, b)
    p.write_text(s); print(f, n)
