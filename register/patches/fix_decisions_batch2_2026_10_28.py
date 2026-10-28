"""J.B. decisions, 28 Oct 2026 (open-items 1, 3, 12):
- hollandSnow: use the City web page's 690,000 ft² (public); note the City DDA coordinator's slides give 860,000 ft² public + 190,000 private.
- edmBylaw18100: Bylaw 19627 (uploaded by J.B.) s. 10 'Bylaw No. 18100, as amended, is hereby repealed'; s. 9 in effect 1 Apr 2022;
  passed 30 Aug 2021; Sch. 2 s. 6.1 keeps the duty to control rate and location of release of stormwater when directed by EWSI.
- price_floor: 0.5–0.65 M€/MW was printed by no source; range now 0.42–0.6 (Wahlroos 2018: 5 MEUR for 12 MW, ≈0.42 our calculation;
  Hiltunen & Syri 2020: 0.6 assumed). price_floor is register-only (not computed in the tool), so tool results do not change."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
SRC = {
 'hollandSnow': [("about 690,000 ft² of heated sidewalks and streets (?: the City's own fact sheet gives about 1,050,000 ft²)", "'approximately 690,000 square feet of heated sidewalks and streets', plus 190,000 ft² of private systems on City mains (the City DDA coordinator's slides give 860,000 ft² public, 1,050,000 ft² in all)")],
 'edmBylaw18100': [("City of Edmonton Bylaw 18100 (EPCOR Drainage Services, consolidated to 19 Feb 2020), Sch. 2 s. 6.1: owners control the rate and location of release of stormwater when directed by EPCOR (?: one check finds 18100 repealed by Bylaw 19627, in force 1 Apr 2022, with the same duty in its Sch. 2 s. 6.1)", "City of Edmonton Bylaw 19627, EPCOR Drainage Services and Wastewater Treatment (passed 30 Aug 2021, in effect 1 Apr 2022; s. 10 repeals Bylaw 18100), Sch. 2 s. 6.1: the owner 'must control the Release of Stormwater and Subsurface Water when directed to do so by EWSI', including its rate and location")],
 'hiltunen2020': [('the 0.5–0.65 range comes from the studies it cites (Wahlroos; Rämä), not the paper itself', 'the 0.5–0.65 range is not printed by it or by Wahlroos 2018 (which gives 5 MEUR for 12 MW, ≈0.42 our calculation); the tool now uses 0.42–0.6')],
}
TXT = [('capex_capture (0.5–0.65 M€/MW_heat)', 'capex_capture (0.42–0.6 M€/MW_heat: Wahlroos 2018 case ≈0.42, our calculation; Hiltunen & Syri 2020 assume 0.6)'),
       ('"capex 0.5–0.65 M€/MW_heat"', '"capex 0.6 M€/MW_heat (assumed)"'), ('"capex 0.5–0.65 M€/MW"', '"capex 0.6 M€/MW (assumed)"')]
reg = R / 'register/formula_register.json'; op = R / 'tool/opps.json'
done, miss = set(), []
for p, ind in ((reg, 1), (op, None)):
    s = p.read_text()
    for a, b in TXT:
        if a in s: s = s.replace(a, b); done.add(a[:25])
    d = json.loads(s)
    for sec in (('new_sources', 'old_sources') if ind else ('sources',)):
        for i, reps in SRC.items():
            if i in d[sec]:
                for a, b in reps:
                    if a in d[sec][i]: d[sec][i] = d[sec][i].replace(a, b, 1); done.add(i)
                    elif b not in d[sec][i]: miss.append((i, a[:40]))
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if ind else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
print('applied', sorted(done), 'miss', miss)
