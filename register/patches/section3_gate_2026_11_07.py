"""7 Nov 2026 (J.B., section 3 gate): (1) the size test adds the data centre's support rooms at the conservative end: the register's 'median of six
whole-building cases 27–33 %' (tool/data/arch.json ratioGround.support; range 13–52 %, not a rule; test fits ≈30 %): floor needed = mw × 635 ÷ (1 − 0.33);
(2) a size whose generator yard is deeper than the tested range (21.7 m) is not a fit: the largest size inside it is shown, with 'beyond the tested range';
(3) an inside dock with no street or lane at the rear or sides gets a 6.1 m drive from the front street along the side: Vancouver inside the side yard as
far as it goes (driveway in a side yard ?, I-3 3.1.2.16 not read), Edmonton by narrowing the building; (4) generator noise stays 'not checked (?)'."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
q = {x['id']: x for x in d['quantities']}['arch_ratios']
F = ("; section 3 gate (7 Nov 2026, J.B.): size test floor = mw × 635 ÷ (1 − 0.33) (support rooms at the conservative end of 27–33 %); sizes beyond the "
     "tested generator-yard depth (21.7 m) are not fits ('beyond the tested range'); no rear or side access: a 6.1 m side drive from the front street "
     "(Vancouver in the side yard, flagged; Edmonton by narrowing the building), which replaces the drive charged as ground")
if 'section 3 gate (7 Nov 2026' not in q['formula']: q['formula'] += F
C = {c['id']: c for c in d['conditions']}
c = C.get('r_dock_truck_access')
if c and 'side drive' not in c['note']:
    c['note'] += (" Section 3 gate (J.B. 7 Nov 2026): where no street or lane reaches the rear or sides, a 6.1 m drive runs from the front street along the "
                  "dock's side: Vancouver inside the side yard (driveway in a side yard ?, I-3 3.1.2.16 not read), Edmonton by narrowing the building. "
                  "Cost: E06A largest fit 5.7 → 5.2 MW, tested MW unchanged (3.0); V339 none (the drive fits its 7.6 m side yard).")
g = C.get('r_generator_noise_unchecked')
if g and 'beyond the tested range' not in g['test']:
    g['test'] += ("; sizes needing a deeper yard are shown as beyond the tested range, not as fits (J.B. 7 Nov 2026); where every set-up with generators "
                  "is beyond it, the example no longer falls back to no generators (12603 123 St NW: 40 MW before, no size now: its rear line is diagonal, "
                  "so the rear plant yard cannot hold 3 sets within 21.7 m; section 5: plant on awkward ground)")
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('section 3 gate')
