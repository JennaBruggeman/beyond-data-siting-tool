"""9 Nov 2026 (J.B.): how far the code checks go (Claude Link CODE_LEVEL_RULE_2026-11-09.md). Schematic massing and program studies: the tool
checks the big moves only; a result within 0.5 m (lengths) or 5 % (other quantities) of a limit is 'tight: check in design', not a fail
(tool/treach.js judge). Detailed design (fixture layouts, stalls, door swings, sub-0.5 m measurement choices, finishes, intakes) is not checked.
Also J.B.'s answers of 9 Nov: (1) dead ends 6 m everywhere, also inside a suite (conservative; no change); (2) a new check, egress doorways per
room (VBBL 3.3.1.5.(1)(b), (d) and (2)); (3) Table 3.7.2.2.-B per sex, the load split equally (3.7.2.2.(1)), a partial increment counts."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']; m = d['meta']; D = '9 Nov 2026'
if 'rule_codeLevel' not in S:
    S['rule_codeLevel'] = ("DECISION (J.B., 9 Nov 2026): Claude Link CODE_LEVEL_RULE_2026-11-09.md, how far the code checks go. Check the big moves: use and "
      "approval; envelope (height, floor area, yards, depth, flood construction level); separations (2 h between data centre and public programs, nothing "
      "wet over the hall); exits (two per zone, travel 45 m, exits apart, dead ends 6 m, egress doors for rooms over 60 people, exit width by load, no public "
      "exits through data-centre space or plant yards); room minimum area and width; washroom counts by load (VBBL 3.7.2.2) and one universal washroom per "
      "hub; loading counts; plant clearances; step-free entry. Not checked (detailed design): fixture layouts, accessible stalls, door swings, grab bars, "
      "edge-vs-centre measurement and other sub-0.5 m refinements, finishes, hardware, signage, lighting, intake and exhaust placement. Tolerance: a "
      "result within 0.5 m (or 5 %) of a limit is 'tight: check in design', not re-planned; re-plan only when a big-move rule fails by more. A decision, "
      "not a source: no trust rating (n/a).")
    m['check_log'].setdefault('rule_codeLevel', []).append({'check': 1, 'by': 'Code', 'date': D, 'where': 'Claude Link CODE_LEVEL_RULE_2026-11-09.md', 'what': 'read whole'})
Q = {q['id']: q for q in d['quantities']}
for pid in ('dead_ends', 'travel_distance', 'exit_separation', 'room_widths', 'building_height'):
    q = Q[pid]
    if 'rule_codeLevel' not in q['sources']: q['sources'].append('rule_codeLevel')
    if 'tight' not in q['coef']: q['coef'] += "; within 0.5 m of the limit: 'tight: check in design', not a fail (J.B. 9 Nov)"
if 'egress_doorways' not in Q:
    d['quantities'].append({"id": "egress_doorways", "name": "Two egress doorways from large rooms", "stage": "test", "unit": "doors, m apart vs m needed",
      "formula": "a room with an occupant load over 60, or larger than Table 3.3.1.5.-B (sprinklered: Group A 200 m², D 300 m², F-2 200 m²), has 2 egress doorways at least 1/3 of its maximum overall diagonal apart, door to door (tool/treach.js egressDoors; tool/hub.js adds the second door)",
      "inputs": ["hub_layout"], "coef": "load: refuge, shelter and waiting rooms area ÷ 0.75 m² (spec Part 1), clinic rooms ÷ 9.3 m²; within 0.5 m: tight (J.B. 9 Nov)",
      "sources": ["vbbl25_3315", "vbbl25_31171", "rule_codeLevel"], "conf": 90, "status": "in hand (9 Nov 2026, J.B.'s answer 2)"})
if '9 Nov 2026 (J.B.): applied per sex' not in S['vbbl25_3722B']:
    S['vbbl25_3722B'] += " ‖ 9 Nov 2026 (J.B.): applied per sex with the load split equally (3.7.2.2.(1)), a partial increment counts: tool/hub.js wcBload."
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('code level rule; egress_doorways')
