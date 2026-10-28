"""bytes2heat read from J.B.'s download (Version Mai 2023), 28 Oct 2026:
p.11 Braunschweig 'Heinrich des Löwen': DC ~12 MW IT, waste heat 18–25 °C, 250 kW extracted; HP 300 kWth, COP 3,6; network 70 °C;
  demand of the 400-house area 2100 MWh/a; capex 460.000 € without the network. 1,750 MWh/yr and 70/40 return not printed.
p.13 HLRS: two HPs of 55 kWth each, ~270 MWh/yr. p.20 FRANKY: IT connection ~35 MW (actual draw ~20 MW); 2 × 320 kWth HPs;
  network 70/40 °C; waste heat ~30 °C; 'mind. 2.400 MWh/a' from waste heat (planned); Mainova contract 15 years."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
SRC = {'bytes2heat': [
 ('Telehouse FRANKY 35 MW DC → Westville 2,400 MWh/yr, 2 × 320 kWth HPs, 30 → 70 °C, 15-yr contract', "Telehouse FRANKY (IT connection ~35 MW, actual draw ~20 MW) → Westville at least 2,400 MWh/yr planned from waste heat, 2 × 320 kWth HPs, ~30 °C waste heat to a 70/40 °C network, 15-yr Mainova contract (p. 20)"),
 ('ReUseHeat Braunschweig 300 kWth, COP 3.6 design, 25/18 → 70/40 °C, 1,750 MWh/yr, €460k', "ReUseHeat Braunschweig (VW data centre ~12 MW IT; 250 kW extracted at 18–25 °C) 300 kWth heat pump, COP 3.6, to a 70 °C network; area demand 2,100 MWh/yr (1,750 MWh/yr from the DC and the 40 °C return not printed ?); €460k capex without the network (p. 11)"),
 ('HLRS 270 MWh/yr', 'HLRS two 55 kWth heat pumps, ~270 MWh/yr (p. 13); version May 2023, read from J.B. download 28 Oct 2026')]}
for p, pretty in ((R / 'register/formula_register.json', True), (R / 'tool/opps.json', False)):
    d = json.loads(p.read_text()); n = 0; miss = []
    for sec in (('new_sources', 'old_sources') if pretty else ('sources',)):
        for i, reps in SRC.items():
            if i in d[sec]:
                for a, b in reps:
                    if a in d[sec][i]: d[sec][i] = d[sec][i].replace(a, b, 1); n += 1
                    elif b not in d[sec][i]: miss.append((i, a[:30]))
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(p.name, n, miss)
