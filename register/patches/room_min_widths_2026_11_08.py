"""8 Nov 2026 (J.B.): minimum clear widths join the room-minimums rule (Claude Link eh/specs/room_minimums_rule_2026-11-08.md, "Minimum widths",
after Cowork's room shape audit eh/specs/AUDIT_room_widths_2026-11-08.md and eh/audit_rooms.py). Same decision entry (rule_roomMinimums), spec only:
the F2 layout sizes rooms to both and the tool tests check them (T-width)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']; m = d['meta']
TAG = ' ‖ 8 Nov 2026 (minimum widths)'
if TAG not in S['rule_roomMinimums']:
    S['rule_roomMinimums'] += (TAG + ": every room also has a minimum clear width; a room may not reach its area by being long and thin. Exam, consult, "
      "procedure 3.0 m (clearance rule second-hand ?); first aid 2.7 m (judgment); offices, staff rooms, meet-me, NOC 2.4 m (judgment); MV switchgear, UPS, "
      "battery, battery HVAC 3.0 m (CEC 2-308 second-hand ?); janitor, sprinkler valve, storage, cot storage, garbage 1.5 m (judgment); refuge and shelter "
      "rooms 4.0 m, parts under 2.4 m wide not counted toward the refuge's area (judgment); universal WC holds a 1,700 mm circle clear of the WC and its "
      "900 mm transfer space (VBBL 3.8.3.13); corridors, stairs, loading, exit passages as spec Part 3. Mostly step 6 (drawing choice) until CSA Z8000, "
      "FGI and TIA-942 are read. Spec, not live yet.")
m['check_log'].setdefault('rule_roomMinimums', []).append({'check': 2, 'by': 'Code', 'date': '8 Nov 2026', 'where': 'Claude Link eh/specs/room_minimums_rule_2026-11-08.md (16:27)', 'what': 'minimum widths section added to the entry'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('room min widths')
