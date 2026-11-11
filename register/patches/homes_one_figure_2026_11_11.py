"""11 Nov 2026 (J.B., CODE_JOB_F11 B6): one per-home heat figure everywhere: the heat a home needs = CEUD 2018-22 energy for space and water heating
per household × 0.85 boiler efficiency (our assumption) = 14.29 MWh (BC), 28.17 MWh (Alberta); tool/data/heat.json homeHeatMWh. Used for the homes
equivalent, housing receivers' demand and the explainer. The BC Assessment receivers' demands (homes × 16.81 MWh, worked out on J.B.'s computer by
tool/bca/bca_derive.py) are not re-derived here: they stay on the energy-bought basis, as do the CEUD floor-area intensities for other receivers (?)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
Q = {q['id']: q for q in d['quantities']}
h = Q['homes_heated']
h['formula'] = ('homes = Q_available ÷ the heat a home needs; the heat a home needs = space + water heating energy per household × 0.85 boiler efficiency '
                '(our assumption) = 14.29 MWh (BC), 28.17 MWh (AB); energy per household BC 60.5 GJ (16.81 MWh), AB 119.3 GJ (33.14 MWh), CEUD residential '
                '2018–22 average. One figure everywhere: homes equivalent, housing receivers, the explainer (J.B. 11 Nov 2026)')
h['revised'] = '2026-11-11'
rd = Q['receiver_demand']
rd['coef'] = ('Housing receivers (City non-market housing list): homes × 14.29 MWh (BC) / 28.17 MWh (AB), the heat a home needs (register homes_heated; '
              'J.B. 11 Nov 2026). The BC Assessment receivers below keep homes × 16.81 MWh (energy bought; derived offline, not re-run) and other floor area '
              '× CEUD energy intensity, so they are on the energy-bought basis (?). ' + rd['coef'])
rd['revised'] = '2026-11-11'
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('homes_heated, receiver_demand updated')
