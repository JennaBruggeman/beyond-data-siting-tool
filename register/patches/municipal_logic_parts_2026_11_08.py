"""8 Nov 2026 (Cowork's reply on municipal_logic_parts.md, J.B.): three parts that wire figures the tool already holds into the logic, so the Municipal
template's cards have parts to light. Display wiring only: each part names the code that already computes or holds the figure and that code's existing
sources; no value changes. Tagged for Municipal (and Architecture) in make_templates.py. Not added yet (Cowork: "later, when sourced"): land_policy,
approval_path. standoff and visibility leave the Municipal list (security standoff and seen-from-public-space are not Municipal rules)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
Q = {q['id'] for q in d['quantities']}
NEW = [
 {"id": "loading_need", "name": "Loading spaces required", "stage": "size", "unit": "spaces (count, size, aisle)",
  "formula": "count of off-street loading spaces for the building's floor area by use, their class (size and clearance) and the aisle that reaches them, from the zone's parking or loading clauses (tool/site.js loadingNeed; tool/data/zones.json 'loading')",
  "inputs": ["zone", "floor_area"],
  "coef": "Vancouver Parking By-law s. 5.1 (each class of use counted separately and added), 5.2.x rows, 5.4.1 aisle 6.1 m; Edmonton Zoning Bylaw 20001 s. 5.80 (no aisle width given: Vancouver's 6.1 m used, marked ?). Figures as the tool already computes them; this part only names them in the logic.",
  "sources": ["vanParking5", "edmZB580"], "conf": 75,
  "status": "in hand (8 Nov 2026: wired into the logic for the Municipal and Architecture cards; values unchanged)"},
 {"id": "roof_equipment_rule", "name": "Rooftop equipment above the height limit", "stage": "test", "unit": "rule (allowed / at discretion)",
  "formula": "whether mechanical equipment may project above the height limit, and on what terms (tool/data/arch.json roofEquip): Edmonton exempt from Height, Vancouver at the Director of Planning's discretion with screening",
  "inputs": ["zone", "envelope"],
  "coef": "Edmonton Bylaw 20001 s. 5.70 1.9 (ventilating equipment and mechanical penthouses have no Height limit; dry coolers and chillers: our reading); Vancouver ZDBL s. 10.1.1 (the Director of Planning may permit mechanical equipment and its screening above the height limit).",
  "sources": ["arch_hb_edm570", "arch_up_vanZDB10"], "conf": 90,
  "status": "in hand (8 Nov 2026: wired into the logic; values unchanged)"},
 {"id": "storey_min", "name": "Minimum storey heights", "stage": "size", "unit": "m floor to floor",
  "formula": "minimum floor-to-floor height of the ground storey and the storeys above, where the zone sets one (tool/data/arch.json storeyMin)",
  "inputs": ["zone"],
  "coef": "Vancouver I-3 s. 3.1.2.9: first floor at least 6.0 m, floors above at least 4.0 m. Vancouver I-2 ss. 3.1.2.4 and 3.2.2.9 give 6.1 m / 4.0 m (not applied in the tool yet: WORKLIST 5). Elsewhere no rule (the card says so).",
  "sources": ["arch_hb_vanI3", "van_zdb_i2"], "conf": 90,
  "status": "in hand (8 Nov 2026: wired into the logic; I-2 figures not applied in the tool yet)"}]
for q in NEW:
    if q["id"] not in Q:
        d['quantities'].append(q)
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('municipal logic parts')
