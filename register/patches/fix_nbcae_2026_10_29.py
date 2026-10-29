"""Edmonton: NBC 2023 Alberta Edition (J.B. upload 29 Oct 2026; local copy data/raw/codes/nbc_ab2023.pdf, not in git) read by Claude for the
articles the layout uses: 3.3.1.9 (corridors 1 100 mm, dead ends ≤ 6 m), 3.3.1.10 (aisles to the NFC(AE)), 3.4.2.5 (travel distance
45 m sprinklered / 30 m otherwise) and 3.6.2.1 — identical to NBC 2020, except 3.6.2.1.(6) points to Alberta's Electrical Code Regulation
under the Safety Codes Act instead of CSA C22.1 directly."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
NEWSRC = {'nbcAB2023': "National Building Code – 2023 Alberta Edition, Vol. 1 Div. B (NRC 2026; free PDF https://doi.org/10.4224/hz98-7h49; J.B. upload 29 Oct 2026): 3.3.1.9.(1),(5) corridors 1 100 mm, dead ends ≤ 6 m; 3.3.1.10 aisles 'in conformance with the NFC(AE)'; 3.4.2.5.(1) travel distance 45 m sprinklered (c), 40 m business (b), 30 m otherwise (f) (p. 3-143); 3.6.2.1.(6) electrical equipment the Electrical Code Regulation (Safety Codes Act) requires in a service room → 1 h; (7) service room in a storey not sprinklered throughout → 1 h — same as NBC 2020 for these articles"}
REP = [("Edmonton uses NBC(AE) 2023 (Alberta amendments not read ?)", "Edmonton: NBC(AE) 2023 has the same articles (checked 29 Oct 2026)")]
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; s = p.read_text(); n = 0
    for a, b in REP: n += s.count(a); s = s.replace(a, b)
    d = json.loads(s); (d['new_sources'] if pretty else d['sources']).update(NEWSRC); qs = d['quantities']
    for key in ('hall_layout', 'electrical_room'):
        tgt = next(x for x in qs if x['id'] == key) if pretty else qs[key]
        if 'nbcAB2023' not in tgt['sources']: tgt['sources'].append('nbcAB2023')
        if pretty: tgt['source_roles'].append(dict(id='nbcAB2023', term='Edmonton: same egress and service-room articles', role='rule', conf=90, verified=True))
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, n)
