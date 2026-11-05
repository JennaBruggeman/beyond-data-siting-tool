"""4 Nov 2026 (dcshare follow-up; coordinator for J.B.): Ratios caps the data centre's share by the building's ground, item by item, checked
against the Edmonton test fits (checks/research_typ/testfit_lots.md). Figures and ids: tool/data/arch.json ratioGround and typologies.
Updates arch_ratios (formula, coef, inputs, sources) and arch_dc_rooms (the 13-52 % support range is now used, as its 27-33 % median)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text())
Q = {q['id']: q for q in d['quantities']}
q = Q['arch_ratios']
F = ("; ground check (4 Nov 2026): data centre floor on its storeys ≤ (footprint after loading and the plant yard − yard units over it "
     "− transformer pads × (depth + building clearance) − a drive to the rear where no other street reaches it − programs' ground) "
     "× hall storeys × (1 − support share); programs' ground = picked block programs beside the hall at their smallest size ÷ storeys, "
     "or before any pick the chosen typology's minimum ground (none chosen: the smallest in the library)")
if 'ground check (4 Nov 2026)' not in q['formula']: q['formula'] += F
C = ("; ground check: support 27–33 % of the data centre (median of six cases, our arithmetic; low end 33 %), transformer pads 2,500 kVA each + 1 "
     "(2.631 × 2.492 m, 1 m apart; 6.0 m from the building in Edmonton, 3 m in front in Vancouver), drive 6.1 m (the tool's loading aisle); "
     "typology hold-back is a default (coordinator recommendation, J.B. to confirm); within ±3 % of the Edmonton hand test fits with the Emergency hub (tool run)")
if 'ground check:' not in q['coef']: q['coef'] += C
for i in ['arch_dc_rooms', 'transformers', 'loading']:
    if i in Q and i not in q['inputs']: q['inputs'].append(i)
for s in ['burlingtonPlans2026', 'eatonCA022021', 'epcor_ccg', 'bchES54F', 'vanParking5', 'arch_edmEastglen2017']:
    if s not in q['sources']: q['sources'].append(s)
r = Q['arch_dc_rooms']
r['coef'] = r['coef'].replace('support space as a share of the building ranges 13–52 % in six cases (not a rule, not used)',
    'support space as a share of the building ranges 13–52 % in six cases (not a rule); Ratios uses the 27–33 % median in its ground check (4 Nov 2026)')
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
