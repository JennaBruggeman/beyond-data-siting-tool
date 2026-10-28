"""bchTariff2026 re-read from the saved PDF (sources/library/public/bchTariff2026/full.pdf), 28 Oct 2026:
RS 1600/1601/1610/1611 Revision 16, eff. 1 Apr 2026, order G-76-25: 29.99 ¢/day, $13.83/kW, 6.79 ¢/kWh;
RS 1830 Revision 3, eff. 1 Apr 2026: 60 kV or higher, $12.178/kVA, 4.914 ¢/kWh; RS 4100 Revision 4: 31.30 / 40.29 ¢/kWh."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
A, B = '(PDF, J.B. download 15 Oct 2026; read by Claude)', '(PDF, J.B. download 15 Oct 2026; rates re-read from the saved PDF 28 Oct 2026)'
for p, pretty in ((R / 'register/formula_register.json', True), (R / 'tool/opps.json', False)):
    s = p.read_text(); n = s.count(A); s = s.replace(A, B); p.write_text(s); print(p.name, n)
