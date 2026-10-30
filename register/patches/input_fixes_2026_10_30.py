"""30 Oct 2026, J.B. 'yes' (yes to D-1 and D-2): input-stage fixes from checks/findings_input.md applied in code; register text brought in line."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]; D = '30 Oct 2026'
ADD = {
 'parcel': "lot area (30 Oct 2026, findings I-01, I-10): Edmonton lots are sized on the drawn lot outline whenever one exists, the assessment record shown as a note (J.B. decision D-1); areas corrected from the data's local metres (111,320·cos lat0 × 110,540 m per degree) by the true degree lengths at the city's latitude, +0.80% Vancouver, +0.90% Edmonton (D-2); distances stay 0.2–0.7% short until the data files are rebuilt; checked against an independent projected/geodesic area on 8 lots: within 0.05–0.4% (checks/input_check)",
 'flood_area': "test (30 Oct 2026, finding I-09): a grid of points over every part of the lot, not just its corners; share of the lot shown; independent check 275 1st Ave E 48%, 1425 Clark Dr 36%, 339 1st Ave E 29% (checks/input_check), the tool now gives the same",
 'receivers': "search radius (30 Oct 2026, finding I-03): 3 km for every count (receiver_radius); the RVO reaches (pool 1,000, housing 1,200, greenhouse 1,500 m) kept only as a reference",
 'massing': "missing heights (30 Oct 2026, finding I-06): a building part with no recorded height (stored −1) or an untrusted estimate is never shown as a height; an existing building with none is taken as one storey at 4 m and labelled as an assumption; buildings and neighbours are read from the lot's tile and its 8 neighbours (finding I-02)",
}
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; d = json.loads(p.read_text()); Q = {q['id']: q for q in d['quantities']} if pretty else d['quantities']
    for qid, t in ADD.items():
        if qid in Q and t[:25] not in Q[qid]['coef']: Q[qid]['coef'] += ('; ' if Q[qid]['coef'] else '') + t
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, 'ok', [q for q in ADD if q not in Q])
