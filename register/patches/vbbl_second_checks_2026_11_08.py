"""8 Nov 2026 (J.B.): second checks of Cowork's single reads of the Vancouver Building By-law 2025, by Code from J.B.'s copy
(C:/Users/bangp/Downloads/vbbl-2025-volume-1-v4-01.pdf; PDF page numbers below). Each entry keeps its trust (90) and gains what the
first read left out; nothing read changes a number the tool uses. Findings for J.B. (checks/to_cowork.md):
  - 3.3.1.9.(5): the 6 m dead-end limit does not apply to a dead-end corridor entirely within a suite.
  - 3.3.1.5.(1)(d): in a floor area sprinklered throughout, a room larger than Table 3.3.1.5.-B (Group A 200 m2, D 300, F-2 200) also needs
    2 egress doorways, at least 1/3 of its diagonal apart: the data hall and the refuge are covered by this, not only by 'more than 60 people'.
  - Table 3.7.2.2.-B counts persons OF EACH SEX (3.7.2.2.(1): the load split equally). The tool and Part 7 apply it to the total.
Also: vbbl25_31171 (Cowork's register_additions_2026-11-08.md row) was never added; added here with both checks. And the Edmonton lots in
tool/data/approval_counts.json come from a City dataset with no register entry yet: edmPropInfo2026."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']; m = d['meta']; D = '8 Nov 2026'
PDF = "J.B.'s copy vbbl-2025-volume-1-v4-01.pdf"
TAG = ' ‖ 8 Nov 2026 (check 2, Code)'
ADD = {
 'vbbl25_3319': ("PDF p. 268: (1) and (5) read as above. Also (2): a corridor used by the public or serving classrooms or patients' sleeping rooms "
   "at least 1100 mm unobstructed. (5) in full: 'Except for a dead-end corridor that is entirely within a suite or as permitted by Sentences 3.3.3.3.(1) "
   "and 3.3.4.4.(6), a dead-end corridor is permitted provided it is not more than 6 m long': a dead end inside a suite is not limited. 'No second check' "
   "above is superseded.", 268),
 'vbbl25_3425': ("PDF p. 297: 3.4.2.5.(1)(c) read as above; the full list: (a) 25 m high-hazard industrial, (b) 40 m business and personal services, "
   "(c) 45 m any occupancy other than high-hazard industrial in a floor area sprinklered throughout, (d) 105 m with a 9 m public corridor (conditions), "
   "(e) 60 m storage garages, (f) 30 m otherwise; (2) need not apply where exits are on the perimeter not more than 60 m apart and each main aisle leads "
   "to an exit. 3.4.2.4.(1): travel distance is measured along the path of travel to the exit. 'No second check' above is superseded.", 297),
 'vbbl25_3423': ("PDF p. 296: (1)(a) and (b) read as above (half the maximum diagonal, need not be more than 9 m with a public corridor; not less "
   "than 9 m otherwise); (3) the distance is the shortest path smoke would travel, not through an intervening fire separation; (4) exterior discharges 9 m, "
   "or 6 m sprinklered and within 15 m of a street. Left out by the first read: (2) Sentence (1) need not apply where at least one third of the floor area is "
   "on each side of a fire separation that must be passed to go from one exit to the other.", 296),
 'vbbl25_3315': ("PDF p. 267: (1)(b) and (2) read as above (2 egress doorways, at least one third of the maximum overall diagonal apart, measured "
   "as smoke would travel). Left out by the first read: (1)(d) in a floor area sprinklered throughout (no high-hazard industrial occupancy), 2 egress "
   "doorways are also needed where travel to an egress doorway is more than 25 m or the room or suite is larger than Table 3.3.1.5.-B: Group A 200 m2, "
   "B-1 100, C 150, D 300, E 200, F-2 200, F-3 300. So the data hall (F-2) and any refuge room over 200 m2 (A) need 2 doorways whatever their load.", 267),
 'vbbl25_3835': ("PDF p. 338: 3.8.3.5.(1) read as above: clear width at least 1 000 mm, uniform slope not more than 1 in 12, level areas at least "
   "1 700 x 1 700 mm at the top and bottom and at doors (latch-side extension 600 / 300 mm); intermediate level areas at least 1 350 mm long every 9 m and at "
   "abrupt turns; handrails 865–965 mm high; guards. (4) cross slope at most 1 in 50.", 338),
 'vbbl25_3722B': ("PDF p. 327: Table 3.7.2.2.-B rows are 'Number of Persons of Each Sex': 1–25: 1; 26–50: 2; over 50: '3, plus 1 for each "
   "additional increment of 50 persons of each sex in excess of 50'. 3.7.2.2.(1): the occupant load is taken as equally divided between the sexes. (2): one "
   "WC may serve both sexes where the load is 25 or fewer. (15) in full: two unisex toilet rooms may serve an assembly, business and personal services, "
   "mercantile or industrial occupancy where the suite is at most 200 m2, the load at most 60, each room has one WC and one lavatory, and one complies with "
   "3.8.3.13. (16): three unisex rooms for 61–100 persons in an assembly occupancy. Finding: the tool and Part 7 apply Table B to the clinic's total head "
   "count, not to each sex (conservative; J.B. to decide).", 327),
}
for k, (t, pg) in ADD.items():
    if TAG not in S[k]: S[k] += TAG + ': ' + t
    L = m['check_log'].setdefault(k, [])
    if not any(c.get('check') == 2 and c.get('date') == D for c in L):
        L.append({'check': 2, 'by': 'Code', 'date': D, 'where': PDF + ', PDF p. ' + str(pg), 'what': 'clause read in full; first read confirmed' + ('' if k in ('vbbl25_3319', 'vbbl25_3425') else '; omissions added')})
if 'vbbl25_31171' not in S:
    S['vbbl25_31171'] = ("RULE: Vancouver Building By-law 2025, vol. 1, Div. B 3.1.17.1 and Table 3.1.17.1 (PDF pp. 174–175): occupant load = the number of "
      "persons the area is designed for, but not less than the table, unless it can be shown the area will hold fewer (then a permanent posted sign, (2)); "
      "rooms used for different occupancies at different times take the value giving the most persons ((4)). Areas per person: assembly space with "
      "non-fixed seats 0.75 m2, non-fixed seats and tables 0.95, standing 0.40, dining 1.20; dormitories 4.60; personal services shops 4.60; offices 9.30; "
      "care, treatment and sleeping room areas 10.00; kitchens 9.30; storage 46.00. First read by Cowork (Claude Link register_additions_2026-11-08.md, row "
      "vbbl25_31171; not added to the register then); second check by Code from J.B.'s copy, 8 Nov 2026. Trust 90.")
    m['check_log'].setdefault('vbbl25_31171', []).extend([
      {'check': 1, 'by': 'Cowork (main chat)', 'date': D, 'where': 'Claude Link register_additions_2026-11-08.md', 'what': 'read once'},
      {'check': 2, 'by': 'Code', 'date': D, 'where': PDF + ', PDF pp. 174-175', 'what': 'clause and table read; values confirmed'}])
if 'edmPropInfo2026' not in S:
    S['edmPropInfo2026'] = ("City of Edmonton Open Data, Property Information (Current Calendar Year), https://data.edmonton.ca/d/dkk9-cj3x, full export "
      "received 13 Oct 2026 (439,696 accounts as points; docs/retrieval_guide.md N4), joined on account number with Property Assessment Data (Current "
      "Calendar Year), q7d6-ambg (N4b): data/edmonton_properties_2026.csv (raw data, not in git). The tool's Edmonton lot points, addresses and zones "
      "(tool/make_tiles.py) and the Edmonton lot counts in tool/data/approval_counts.json. Licence: Open Government Licence – Edmonton v1.0 (as "
      "edm_3dBuildings). Trust 80.")
    m['check_log'].setdefault('edmPropInfo2026', []).append({'check': 1, 'by': 'Code', 'date': D, 'where': 'docs/retrieval_guide.md N4, N4b; tool/make_tiles.py', 'what': 'dataset ids, receipt date and the fields the tool keeps; licence as the City portal (read 8 Nov for edm_3dBuildings)'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('VBBL second checks:', len(ADD), '+ vbbl25_31171; edmPropInfo2026')
