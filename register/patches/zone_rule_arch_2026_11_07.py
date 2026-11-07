"""7 Nov 2026 (WORKLIST 3): in Architecture mode typologies are laid out only where a data centre is permitted, conditional or discretionary
(the zone has a row in tool/data/zones.json, built from checks/research_arch_v1/zones.md, and the lot is not in I-3 sub-area B). Elsewhere the tool
says "Not allowed here; rezoning needed"; looking on as if rezoned is a flagged option (START_HERE: rezonings are flagged options, not blocks)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
C = {c['id'] for c in d['conditions']}
if 'r_arch_zone_allowed' not in C:
    d['conditions'].append({"id": "r_arch_zone_allowed", "heading": "6 Regulatory", "name": "Typologies only where a data centre is allowed",
      "test": "Architecture lays out typologies only on lots whose zone permits a data centre, conditionally or at discretion (Vancouver I-1C, I-2, I-3 sub-area A, FC-2; Edmonton IH, IM, BE, EETB, EETC, EETL, EETM, EETIM, EIB, EIM); elsewhere 'Not allowed here; rezoning needed', with an as-if-rezoned view flagged on every screen",
      "quantities": ["arch_ratios"], "move": ["policy"], "parties": ["operator", "city"], "constraint": True,
      "note": "Size limits inside allowed zones (e.g. IH Minor Industrial only where existing on 1 Jan 2024) stay flags on the zone's clauses. CD-1 lots are not read (?): they count as not allowed until a CD-1 by-law naming Bulk Data Storage is in the zone table (CD-1 (818) found, not in the tiles).",
      "sources": ["van_zdb_i3", "van_zdb_i2", "van_zdb_fc2", "edm_bl20001", "arch_zns_edmEETP", "arch_zns_edmEllerslie"], "next_action": "sweep (WORKLIST 3): count lots per zone"})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('zone rule condition')
