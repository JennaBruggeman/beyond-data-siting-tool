"""8 Nov 2026 (J.B., F1c gate): street names on the Rooms, Separations and Exits plans. The street files the tool holds carry no names (Vancouver
streets_van.json and Edmonton streets_edm.json keep class only; the City files they were made from are not on this computer). NBD_Roads_GPKG.zip
(Claude Link, 26 Oct) was read and has no name field (ISED broadband availability by road segment), so it is not used and not registered.
Method (ours): each street segment is named from the addresses of the lots that front it (lot records the tool already holds, their
address field: vanTax in Vancouver, the City property records in the Edmonton tiles). Only lots fronting one street segment vote (a corner lot's address could be on either street); a segment takes the street at least
2 and more than half of its votes name; lanes and every other segment stay 'street name ?'. A lot on one street keeps its own address street.
No new data. tool/streetnames.js; checks/tests/streetnames_probe.js."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']; m = d['meta']; D = '8 Nov 2026'
K = 'method_streetNamesAddr'
S[K] = ("DERIVED (our method, J.B. 8 Nov 2026): street names on the Architecture plans, named from fronting lot addresses. The tool's street files "
  "(vanStreets2026, edmRoads2026) hold no names. A street segment takes the street part of the addresses of the lots that front it (an edge 0.5 m or "
  "longer facing the segment within 35 m, no other addressed lot between: the lotside.js probe), one vote per address, only from lots on one street; "
  "named when at least 2 votes and more than half agree. Lanes, segments fronted only by corner lots, and split votes stay 'street name ?'. A lot on "
  "one street keeps its own address. tool/streetnames.js. Trust 60 (derived with a stated assumption: that most lots on a single street are addressed on it).")
m['source_kinds'][K] = 'derived (our method)'
m['check_log'].setdefault(K, []).append({'check': 1, 'by': 'Code', 'date': D, 'where': 'checks/tests/streetnames_probe.js on the five check lots',
  'what': 'segments within 150 m named: 339 1st Ave E 8 of 23, 275 1st Ave E 7 of 23, 1425 Clark Dr 7 of 23, 74 Airport Rd NW 8 of 17, 64 Airport Rd NW 9 of 23 (lanes not counted)'})
TAG = ' ‖ 8 Nov 2026 (street names)'
for k in ('vanStreets2026', 'edmRoads2026'):
    if TAG not in S[k]: S[k] += TAG + ': the tool file keeps no street name; plan street names come from fronting lot addresses (method_streetNamesAddr, our method).'
for c in d['conditions']:
    if c['id'] == 'r_plan_v0' and K not in c.setdefault('sources', []): c['sources'].append(K)
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('street names from addresses')
