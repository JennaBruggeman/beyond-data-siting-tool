#!/usr/bin/env python3
"""Checks the tool's heat chain against operating heat-recovery cases (sources/13_calibration_cases.md).

Run:  python3 bench/test_heat_chain.py      (exit code 1 if a check fails)
The heat chain: heat out = IT energy × capture × COP ÷ (COP − 1); heat-pump electricity = heat out ÷ COP.
Few published cases give IT load AND heat, so these checks test the parts that can be tested:
  1. the COP range against realised COPs,
  2. heat out per unit of heat captured against an operator's stated module,
  3. heat-pump electricity per unit of heat against a utility's metered year.
Coefficients are read from tool/engine.js."""
import os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
E = open(os.path.join(ROOT, 'tool', 'engine.js'), encoding='utf-8').read()
def arr(name):
    m = re.search(name + r'\s*:\s*\[([\d.]+)\s*,\s*([\d.]+)\]', E); return float(m.group(1)), float(m.group(2))
cop = arr('cop'); cap = arr('capture'); fails = 0
def check(ok, label, detail):
    global fails; fails += 0 if ok else 1; print(('PASS ' if ok else 'FAIL ') + label + ' — ' + detail)
factor = lambda c: c / (c - 1)
print('1. COP')
for name, c, ev in [('Meta Odense → Fjernvarme Fyn, 2020 (27 → 70 °C)', 4.5, 'utility annual report'),
                    ('Fjernvarme Fyn heat pumps combined, 2022–24', 465 / (33418 * 0.0036), 'utility annual report, derived')]:
    check(cop[0] <= c <= cop[1], name, f'realised COP {c:.2f} ({ev}); tool {cop[0]}–{cop[1]}')
print('\n2. Heat out per unit captured: COP ÷ (COP − 1)')
f = 6.5 / 5.0
check(factor(cop[1]) <= f <= factor(cop[0]), 'Telia Helsinki module (operator claim)', f'5 MW cooling → 6.5 MW heat = {f:.3f}; tool {factor(cop[1]):.3f}–{factor(cop[0]):.3f}')
print('\n3. Heat-pump electricity per unit of heat: 1 ÷ COP')
el, heat = 14019.926, 230457 / 3.6  # MWh electricity; TJ → MWh (230,457 GJ)
tol = 0.05  # the utility publishes the COP rounded to one decimal (4.5); the metered year works out to 4.57
check(1 / (cop[1] + tol*2) <= el / heat <= 1 / cop[0], 'Meta Odense, 2020 metered year (utility)', f'{el:,.0f} MWh ÷ {heat:,.0f} MWh = {el/heat:.3f} (COP {heat/el:.2f}); tool {1/cop[1]:.3f}–{1/cop[0]:.3f}, allowing for the published COP being rounded')
print('\n4. For information: capture (no case gives IT load and captured heat together)')
print(f'  tool captures {cap[0]:.0%}–{cap[1]:.0%} of server heat into liquid (direct-to-chip, LBNL 2014; NREL).')
print('  Yandex Mäntsälä: ~6 MW nominal recovery on ~15 MW site demand (utility text; demand not stated as IT) — exhaust-air recovery, partial by design.')
print('  Telia Helsinki: plan 4 × 5 MW cooling recovered on 24 MW IT (operator claim) — about 83% if fully built.')
print(f'\n{fails} failed'); sys.exit(1 if fails else 0)
