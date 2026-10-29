"""Chiller sound re-sourced to the new chiller basis, 29 Oct 2026. Vertiv Liebert AFC (SL-71060 R09/24, 'Preliminary data') prints
'Sound Pressure Level (SPL) calculated at 3.3ft (1m) distance': FIZ135 83.0 dB(A), FH3135 80.0 dB(A) (1481 kW, same capacity, R513A).
Lw = Lp + 10 log10 S, S = 4(ab+bc+ca) with a = L/2+1, b = W/2+1, c = H+1 (ISO 3744 parallelepiped over a reflecting plane):
FIZ135 12.141 × 2.362 × 2.896 m → S 205.9 m² → Lw 106.1; FH3135 10.846 m long → S 190.1 m² → Lw 102.8 (our calculation).
Airedale's brochure prints no sound data. The Trane RTAF values stay in the starter set as a reference, no longer the basis."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REP = [("Lw per unit: air-cooled chillers 98–101 dBA (Trane RTAF, low-noise to standard)",
        "Lw per unit: air-cooled chillers 102.8–106.1 dBA per 1.49 MW free-cooling chiller (Vertiv Liebert AFC FH3135/FIZ135, Lp at 1 m 80.0/83.0 dB(A) converted to Lw by the ISO 3744 1 m box, our calculation; 'Preliminary data'; low-noise options not rated)")]
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; s = p.read_text(); n = 0
    for a, b in REP: n += s.count(a); s = s.replace(a, b)
    d = json.loads(s); qs = d['quantities']
    for q in (qs if isinstance(qs, list) else qs.values()):
        if q.get('id') == 'noise_level' or q.get('name') == 'Sound level at receptor':
            if 'vertivAFC' not in q['sources']: q['sources'].append('vertivAFC')
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, n)
