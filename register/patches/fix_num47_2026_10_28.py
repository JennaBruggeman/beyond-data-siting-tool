"""Open items that may change a number (47), 28 Oct 2026. Each was re-read from the primary source by a resolving check
(checks/sweep/num47/a*.json) on top of the earlier sweep finding; the number-changing ones were re-read again by Claude
(BAC p. C16/C18 by web fetch; ATCO 1.045 matches the value already in tool/cards.js from the 18 Oct rate-schedule read).
Only items marked resolved 'yes' or 'partly' are applied, and '?' stays on whatever was not confirmed."""
import json, pathlib, glob
R = pathlib.Path(__file__).resolve().parents[2]
NEW = {}
for f in sorted(glob.glob(str(R / 'checks/sweep/num47/a*.json'))):
    for a in json.load(open(f)):
        if a['resolved'] in ('yes', 'partly') and a.get('proposed_text'): NEW[a['id']] = a['proposed_text']
for p, pretty in ((R / 'register/formula_register.json', True), (R / 'tool/opps.json', False)):
    d = json.loads(p.read_text()); n = 0
    for sec in (('new_sources', 'old_sources') if pretty else ('sources',)):
        for i, t in NEW.items():
            if i in d[sec] and d[sec][i] != t: d[sec][i] = t; n += 1
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(p.name, n, 'replaced')
# cec2024ESS: Alberta's notice dates CEC 2024 publication 4 Mar 2024; the 'BC 4 Mar 2025' in-force date is unconfirmed
for p in (R / 'register/formula_register.json', R / 'tool/opps.json'):
    s = p.read_text(); s = s.replace('in force BC 4 Mar 2025, Alberta 1 Apr 2025', 'published 4 Mar 2024; in force Alberta 1 Apr 2025, BC 4 Mar 2025 ?'); p.write_text(s)
