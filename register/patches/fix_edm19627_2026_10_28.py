"""Bylaw 18100 was repealed by Bylaw 19627 (s. 10; in effect 1 Apr 2022), read from J.B.'s upload 28 Oct 2026.
Sch. 2 s. 5.10(i) of 19627 keeps non-contact cooling water to sanitary/combined sewer only with prior written EWSI approval."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
SRC = {'edm18100': [('Edmonton EPCOR Drainage Services Bylaw 18100 s.5.10(i):', 'Edmonton Bylaw 19627, EPCOR Drainage Services and Wastewater Treatment (in effect 1 Apr 2022; repealed Bylaw 18100), Sch. 2 s. 5.10(i):'),
                    ('https://www.edmonton.ca/residential_neighbourhoods/Bylaws/C18100.pdf', 'https://www.epcor.com/content/dam/epcor/documents/supporting-documents/epcor_drainage-services-and-wastewater-treatment_bylaw%E2%80%8B-19627.pdf')]}
TXT = [('needs EWSI written approval (Bylaw 18100 s.5.10)', 'needs EWSI written approval (Bylaw 19627 Sch. 2 s. 5.10)'),
       ('(EPCOR guideline; Bylaw 18100)', '(EPCOR guideline; Bylaw 18100, now repealed by 19627: clause not re-checked ?)')]
for p, pretty in ((R / 'register/formula_register.json', True), (R / 'tool/opps.json', False)):
    s = p.read_text(); n = 0
    for a, b in TXT:
        n += s.count(a); s = s.replace(a, b)
    d = json.loads(s)
    for sec in (('new_sources', 'old_sources') if pretty else ('sources',)):
        for i, reps in SRC.items():
            if i in d[sec]:
                for a, b in reps:
                    if a in d[sec][i]: d[sec][i] = d[sec][i].replace(a, b, 1); n += 1
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(p.name, n, 'replacements')
