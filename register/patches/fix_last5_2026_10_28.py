"""Last 'may change a number' items, 28 Oct 2026:
- cec2024ESS: Technical Safety BC Information Bulletin IB-EL 2024-01 (11 Jun 2024): BC Electrical Code 2024 'Effective March 4, 2025'.
- dell / rare_earth: Dańczak et al. 2018, Physicochemical Problems of Mineral Processing 54(2):363–376: magnets 6–19 g per desktop HDD,
  2–6 g per notebook HDD (p. 369); Nd 25–29 %, Pr 2–13 %, Dy 0.1–1.4 % of the magnet (Table 6, p. 372). '3–4 g of rare earth per drive'
  is not printed: our arithmetic gives about 1–1.5 g (2.5") to about 4 g (3.5"). Graedel 2011 is not used (copper comes from CDA 2023).
- ewaste coef: 21.25 → 21.2 kg (missed in the earlier R650 patch).
- lorenz: Reinholdt/Jensen et al. 2018 (IIR Gustav Lorentzen, parts 1–2) give an estimation method, no η value; Pieper et al. 2020 alone
  supports 0.5–0.6. Alissa et al. 2025 (Nature 641, p. 332) gives the cold-plate liquid share '50% to 80% or more' and two-phase
  boiling at 30–50 °C, not the 25–35 / 50–60 °C ranges (those are Wahlroos)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REP = [
 ('in force Alberta 1 Apr 2025, BC 4 Mar 2025 ?', 'in force Alberta 1 Apr 2025, BC 4 Mar 2025 (Technical Safety BC, IB-EL 2024-01, 11 Jun 2024)'),
 ('; Danczak 2018 rare earths and Graedel 2011 copper are separate sources, not in the Dell PDFs (their values not checked ?)', '; rare earths come from Dańczak et al. 2018 (separate source); Graedel 2011 is not used'),
 ('"drives × 3–4 g"', '"drives × about 1–4 g of rare earths (our arithmetic from Dańczak 2018)"'),
 ('"Danczak 2018"', '"Dańczak et al. 2018, Physicochemical Problems of Mineral Processing 54(2):363–376: NdFeB magnets 6–19 g per desktop (3.5\\") HDD and 2–6 g per notebook (2.5\\") HDD (p. 369); Nd 25–29 %, Pr 2–13 %, Dy 0.1–1.4 % of the magnet (Table 6, p. 372) → about 1–1.5 g (2.5\\") to about 4 g (3.5\\") of rare earths per drive (our arithmetic; not printed)"'),
 ('"26.3 kg (2U); 21.25 kg (1U)"', '"26.3 kg (2U, R740); 21.2 kg (1U, R650)"'),
 ('Lorenz COP, η 0.50–0.60 (Pieper et al. 2020, Energy 205:117994: 0.5 assumed in the literature, design values 0.53–0.61 by heat source; Reinholdt et al. 2018 is an IIR conference paper, value not read ?); air 25–35 °C, liquid 50–60 °C (Wahlroos et al. 2018, RSER 82, p. 1753, confirmed; Alissa ?: not checked) (Formulas sheet)',
  'Lorenz COP, η 0.50–0.60 (Pieper et al. 2020, Energy 205:117994: 0.5 assumed in the literature, design values 0.53–0.61 by heat source; Reinholdt/Jensen et al. 2018, IIR Gustav Lorentzen, give the method but no η value); air 25–35 °C, liquid 50–60 °C (Wahlroos et al. 2018, RSER 82, p. 1753); Alissa et al. 2025 (Nature 641, p. 332) gives the cold-plate liquid share, \'50% to 80% or more\', not these temperatures (Formulas sheet)'),
 ('Alissa p.332; Wahlroos p.1753;', 'Wahlroos p.1753 (temperatures); Alissa p.332 (cold-plate liquid share 50–80%+, not temperatures);'),
]
NEWSRC = {'danczak2018': "Dańczak, Chojnacka, Matuska, Marcola, Leśniewicz, Wełna, Żak, Adamski, Rycerz 2018, The recycling-oriented material characterization of hard disk drives with special emphasis on NdFeB magnets, Physicochemical Problems of Mineral Processing 54(2):363–376 (peer-reviewed): magnets 6–19 g per desktop HDD, 2–6 g per notebook HDD (p. 369); Nd 25–29 %, Pr 2–13 %, Dy 0.1–1.4 % of the magnet (Table 6, p. 372) — https://yadda.icm.edu.pl/baztech/element/bwmeta1.element.baztech-9f3156b7-678b-4a46-a1c5-cbfeb9347b12/c/363-376_ppmp_2018_2.pdf"}
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; s = p.read_text(); n = 0
    for a, b in REP: n += s.count(a); s = s.replace(a, b)
    d = json.loads(s)
    tgt = d['new_sources'] if pretty else d['sources']
    tgt.update(NEWSRC)
    qs = d['quantities']; items = qs if isinstance(qs, list) else [dict(v, id=k) for k, v in qs.items()]
    for q in (qs if isinstance(qs, list) else qs.values()):
        if q.get('name') and 'rare' in json.dumps(q).lower() and 'dell' in q.get('sources', []) and ('Dańczak' in q.get('coef', '')):
            if 'danczak2018' not in q['sources']: q['sources'] = ['danczak2018' if x == 'dell' else x for x in q['sources']]
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, n)
# dea: data/dea_catalogue_extract.json sheet 44 re-extracted from the xlsx (columns 2015/2020/2030/2050, lower/upper 2020 and 2050)
A = 'extract data/dea_catalogue_extract.json (sheet 44 entries mis-keyed ?)'; B = 'extract data/dea_catalogue_extract.json (sheet 44 re-extracted 28 Oct 2026 with its own 2015/2020/2030/2050 columns)'
for f in ('register/formula_register.json', 'tool/opps.json'):
    p = R / f; s = p.read_text(); p.write_text(s.replace(A, B))
