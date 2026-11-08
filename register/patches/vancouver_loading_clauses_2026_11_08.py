"""8 Nov 2026 (Cowork notes, J.B.): Vancouver Parking By-law clause fixes. The loading access clause ('unobstructed access by vehicles to all off-street
loading spaces by means of a minimum 6.1 metre wide manoeuvring aisle') is s. 5.4.1, not 5.4.3. A Health Care Office is listed under Office Uses (Zoning and
Development By-law s. 2), so the clinic's loading row 5.2.9 is read from the by-law, not 'our reading'. The office row was already 5.2.9 everywhere
(the only '5.2.7' in the register is the manufacturing row, which is right)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; t = p.read_text(encoding='utf-8')
t = t.replace('Parking By-law 5.4.3', 'Parking By-law 5.4.1').replace("s. 5.4.3 'Access to Loading Spaces'", "s. 5.4.1 'Access to Loading Spaces'")
d = json.loads(t); n = 0
for c in d['conditions']:
    for k in ('test', 'note'):
        if isinstance(c.get(k), str) and '5.4.3' in c[k]: c[k] = c[k].replace('5.4.3', '5.4.1'); n += 1
assert '5.4.3' not in json.dumps(d, ensure_ascii=False), 'a 5.4.3 is left'
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('loading clauses', n)
