"""28 Oct 2026: two citations corrected from J.B.'s own copies of the documents (read while moving the extracts to the
private repo). Ayuso-Virgili 2023 prints article 102330 (check 2 read the same); Nistad's thesis is 'Current and Future
Energy Use for Atlantic Salmon Farming in Recirculating Aquaculture Systems in Norway', NTNU, January 2020."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REPL = {'ayuso2023': [('Aquacultural Engineering 101:102314 (?: one check reads article 102330)', 'Aquacultural Engineering 101:102330')],
        'nistad2020': [('Nistad 2020, NTNU MSc thesis, Energy use and efficiency in RAS (Norwegian smolt facilities) (?: author, year and title not confirmed online; check against J.B.\'s uploaded PDF)',
                        "Nistad, A. A. 2020, NTNU MSc thesis (Energy and Environmental Engineering), Current and Future Energy Use for Atlantic Salmon Farming in Recirculating Aquaculture Systems in Norway (Norwegian smolt facilities)")]}
reg = R / 'register/formula_register.json'; r = json.loads(reg.read_text()); op = R / 'tool/opps.json'; o = json.loads(op.read_text()); n = 0
for d in (r['new_sources'], r['old_sources'], o['sources']):
    for i, reps in REPL.items():
        if i in d:
            for a, b in reps:
                if a in d[i]: d[i] = d[i].replace(a, b); n += 1
reg.write_text(json.dumps(r, ensure_ascii=False, indent=1)); op.write_text(json.dumps(o, ensure_ascii=False, separators=(',', ':'))); print('replaced', n)
