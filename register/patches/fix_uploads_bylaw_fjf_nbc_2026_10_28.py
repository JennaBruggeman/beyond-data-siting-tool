"""28 Oct 2026: Bylaw 14600 (consolidated 22 Oct 2024) and Fjernvarme Fyn Årsberetning 2020 read from J.B.'s uploads;
NBC 2020 Vol. 1 and BCBC 2024 read from the project's saved copies (data/raw/codes/nbc.txt, bcbc2024.txt)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
SRC = {
 'bylaw14600': "Edmonton Bylaw 14600, Community Standards Bylaw (consolidated 22 Oct 2024), ss. 19–22, measured at the property line: residential 65 dB(A) 7 a.m.–10 p.m. (higher levels allowed for limited times: 70 for 2 h, 75 for 1 h, 80 for 30 min, 85 for 15 min a day) and 50 dB(A) overnight; non-residential 75 day and 60 overnight; no Leq or continuous-noise provision — https://edmonton.ca/sites/default/files/public-files/C14600.pdf",
 'fjfAars2020': "Fjernvarme Fyn, Årsberetning 2020, p. 9 production table (note: 'Den høje virkningsgrad er ensbetydende med COP på 4,5') and p. 13: 2020 'første hele produktionsår' of heat from Facebook's data centre, 'en samlet varmelevering på 230 TJ'; 'Varmepumperne tilknyttet Facebook har forbrugt 14.020 MWh el svarende til COP 4,5' (read from J.B. download 28 Oct 2026) — https://www.fjernvarmefyn.dk/media/1754/fjernvarme_fyn_aarsberetning_2020.pdf",
 'nbcImportance': "NBC 2020 (Vol. 1) and BCBC 2024: Div. A definition 'Post-disaster building' includes telephone exchanges, power stations and substations, water and sewage facilities, and — unless exempted by the authority having jurisdiction — emergency response facilities and communications facilities, including radio and television stations (BCBC adds 'that the authority having jurisdiction has determined is necessary'); Div. B Table 4.1.2.1: High = 'Community centres and elementary, middle and secondary schools' (the 2018 wording 'likely to be used as post-disaster shelters' is gone); Table 4.1.8.5.-A earthquake importance factor IE: Low 0.8, Normal 1.0, High 1.3, Post-disaster 1.5 — data/raw/codes/nbc.txt, bcbc2024.txt (saved copies)",
}
for p, pretty in ((R / 'register/formula_register.json', True), (R / 'tool/opps.json', False)):
    d = json.loads(p.read_text()); n = 0
    for sec in (('new_sources', 'old_sources') if pretty else ('sources',)):
        for i, t in SRC.items():
            if i in d[sec]: d[sec][i] = t; n += 1
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(p.name, n)
# importance_cat formula: NBC 2020 / BCBC 2024 no longer put 'likely post-disaster shelters' in High (register text only)
A = '"Normal (IE 1.0) by default; High (1.3) if likely used as a post-disaster shelter; post-disaster (1.5) if it serves as a communications facility, unless the authority exempts"'
B = '"Normal (IE 1.0) by default; High (1.3) only for the types the code names (community centres and schools in NBC 2020 / BCBC 2024; the 2018 \'likely post-disaster shelter\' wording is gone), or if the owner designs to it voluntarily; post-disaster (1.5) if it serves as a communications facility, unless the authority exempts"'
for f in ('register/formula_register.json', 'tool/opps.json'):
    p = R / f; s = p.read_text(); print(f, s.count(A)); p.write_text(s.replace(A, B))
