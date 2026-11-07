"""7 Nov 2026 (J.B.): plan layer, rule sheet v0 (tool/plan.js): corridors, stairs, lifts, doors, exits and walls added to Arrange's layout storey by storey,
read-only (no size or MW change). Drawing choices named in plan.RULES; code minimums from arch_nbc3432. A block on several storeys is drawn as real storeys
with two stairs and a lift (the clinic may sit on upper floors, J.B. 4 Nov 2026). Adds condition r_plan_v0."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
C = {c['id'] for c in d['conditions']}
if 'r_plan_v0' not in C:
    d['conditions'].append({"id": "r_plan_v0", "heading": "2 Spatial", "name": "Plan layer: corridors, stairs, doors, exits (rule sheet v0)",
      "test": "each storey of the data-centre block gets a 2.0 m corridor on the side away from the dock with an exit stair in line at each end; rooms open onto it or, where they cannot, into a reached neighbour (flagged); program blocks on several storeys get two stairs and a lift, carried down to the ground where the block sits over another; doors 0.9 m (≥ 850 mm), public street doors 1.8 m; exits at the stair feet, the program doors and the dock",
      "quantities": ["arch_ratios"], "move": ["choice"], "parties": ["operator", "city"], "constraint": False,
      "note": "Drawing choices (tool/plan.js RULES): corridor 2.0 m, stair 3.0 × 6.0 m, lift 2.5 × 2.5 m, two doors for rooms ≥ 150 m². Code minimums: doorway 850 mm, corridor 1 100 mm, stair 1 100 mm (arch_nbc3432). Not yet: bands, the shared lobby (no code size), the fallback ladder, path-based checks 8 and 9, occupant-load door widths (check 10), ramp slope for step-free entrances (BCBC 3.8 not in the repo ?), street grade at the door (?).",
      "sources": ["arch_nbc3432"], "next_action": "full rule sheet (WORKLIST 5); checks 8 and 9 along the plan"})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('plan v0 condition')
