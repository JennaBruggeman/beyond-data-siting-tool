"""11 Nov 2026 (J.B.): the load factor becomes a range, 0.4–0.6, with sources on the cards. Low end: Uptime Institute Global Data Center Survey
2024 (report 146M), p. 9: 'one in four data centers in our survey is typically under 40% utilized by available UPS capacity' (self-reported
operator survey; no average or bands given; re-read 11 Nov 2026). High end: Fan, Weber, Barroso 2007, 59.5 % of the machines' combined maximum.
The low end pairs with the low PUE and the low capture, the high end with the high ones (ranges, not points)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
Q = {q['id']: q for q in d['quantities']}
lf = Q['load_factor']
lf['coef'] = ('0.4–0.6 (J.B. 11 Nov 2026): low end Uptime Global Data Center Survey 2024 p. 9, one in four sites typically under 40 % of available UPS capacity '
              '(self-reported, no average; uptime2024Survey); high end ' + lf['coef'])
lf['sources'] = lf['sources'] + ['uptime2024Survey'] if 'uptime2024Survey' not in lf['sources'] else lf['sources']
lf.setdefault('source_roles', []).append({'id': 'uptime2024Survey', 'term': 'low end of the load range', 'role': 'coefficient (operator survey)', 'conf': 50, 'verified': True})
lf['revised'] = '2026-11-11'
for k in ('it_load_actual', 'it_load_share'):
    q = Q[k]; q['formula'] = q['formula'].replace('× 0.6', '× 0.4–0.6').replace('0.6, the load factor', '0.4–0.6, the load factor'); q['revised'] = '2026-11-11'
    q['coef'] = q['coef'] + ' ‖ 11 Nov 2026 (J.B.): the tool now applies a load range 0.4–0.6 (low Uptime 2024 survey p. 9, high Fan et al. 2007).'
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('load_factor 0.4–0.6')
