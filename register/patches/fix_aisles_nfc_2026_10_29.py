"""Aisles inside the data hall, from the National Fire Code (NBC 3.3.1.10 sends aisles to the NFC), read by Claude 29 Oct 2026 from the
local copies data/raw/codes/nfc2020.pdf (NFC 2020 Div. B p.2-11) and nfc_ab2023.pdf (NFC 2023 Alberta Edition, identical text):
2.7.1.2.(1) aisles in every floor area required to have more than one egress doorway; (2) every required egress doorway served by an
aisle ≥ 1 100 mm clear, with access to another egress doorway and a choice of two opposite directions at every point; (3) a subsidiary
aisle with one direction of travel ≥ 900 mm and no longer than 7.5 m (business, mercantile, high-hazard), 10 m (medium-hazard industrial)
or 15 m (low-hazard industrial). The occupancy class of a data hall is not stated in the codes read (?), so the dead-end limit is 7.5–15 m.
The tool's rack aisles (1.2 m, open at both ends onto 1.1 m cross aisles) meet 2.7.1.2.(2)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
NEWSRC = {'nfc2020_2712': "National Fire Code of Canada 2020, Div. B 2.7.1.2. Open Floor Areas (p. 2-11; NFC 2023 Alberta Edition identical): aisles serving required egress doorways ≥ 1 100 mm, two opposite directions at every point; subsidiary aisles with one direction ≥ 900 mm, ≤ 7.5 m (business, mercantile, high-hazard), 10 m (medium-hazard industrial), 15 m (low-hazard industrial) — https://publications.gc.ca/collections/collection_2022/cnrc-nrc/NR24-27-2020-eng.pdf"}
REP = [("aisles 1.2 m (middle of Vertiv's standard containment sizes 0.9 / 1.2 / 1.8 m — product sizes; no code minimum found for aisles inside a data hall ?);",
        "aisles 1.2 m (middle of Vertiv's standard containment sizes 0.9 / 1.2 / 1.8 m), open at both ends onto 1.1 m cross aisles, which meets the NFC: aisles serving egress doorways ≥ 1 100 mm with two directions of travel, single-direction subsidiary aisles ≥ 900 mm and ≤ 7.5–15 m by occupancy (NFC 2020 / NFC(AE) 2023 2.7.1.2; a data hall's occupancy class is not stated in the codes read ?);"),
       ("aisles follow the NFC (not read ?);", "aisles follow the NFC (2.7.1.2, above);")]
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; s = p.read_text(); n = 0
    for a, b in REP: n += s.count(a); s = s.replace(a, b)
    d = json.loads(s); (d['new_sources'] if pretty else d['sources']).update(NEWSRC); qs = d['quantities']
    tgt = next(x for x in qs if x['id'] == 'hall_layout') if pretty else qs['hall_layout']
    if 'nfc2020_2712' not in tgt['sources']: tgt['sources'].append('nfc2020_2712')
    if pretty: tgt['source_roles'].append(dict(id='nfc2020_2712', term='aisles ≥ 1 100 mm, subsidiary ≥ 900 mm and 7.5–15 m', role='rule', conf=90, verified=True))
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, n)
