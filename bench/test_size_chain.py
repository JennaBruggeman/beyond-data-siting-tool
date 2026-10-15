#!/usr/bin/env python3
"""Checks the tool's size chain against the precedent catalogue (bench/benchmarks.json).

Run:  python3 bench/test_size_chain.py      (exit code 1 if any check fails)

What it checks, in plain words
  1. Each benchmark building: feed its real floor area through the tool's chain
     (floor area × hall share ÷ hall area per MW). Its real IT MW must land inside the tool's range.
  2. The tool's coefficients against the catalogue:
     - hall area per MW (m2PerMW) within what built halls report (white space per IT MW);
     - hall share (hallShare) within the built white-space shares;
     - the whole-building check line (grossPerMW) equals the benchmark buildings' min–max;
     - data-hall floor heights (ftf.up) within the built and proposed floor heights.
The coefficients are read from tool/engine.js, so the test always checks what the tool actually uses."""
import json, os, re, sys
H = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(H)
B = json.load(open(os.path.join(H, 'benchmarks.json'), encoding='utf-8'))
E = open(os.path.join(ROOT, 'tool', 'engine.js'), encoding='utf-8').read()
def arr(name):
    m = re.search(name + r'\s*:\s*\[([\d.]+)\s*,\s*([\d.]+)\]', E)
    if not m: sys.exit(f'could not read {name} from engine.js')
    return float(m.group(1)), float(m.group(2))
m2 = arr('m2PerMW'); share = arr('hallShare'); gpm = arr('grossPerMW'); up = arr(r'up')
S = B['summary']; fails = 0
def check(ok, label, detail):
    global fails
    fails += 0 if ok else 1
    print(('PASS ' if ok else 'FAIL ') + label + ' — ' + detail)

print('1. Benchmark buildings through the tool\'s chain')
for s in B['sites']:
    if s['tier'] != 'benchmark': continue
    h = s['headline']; g = h['area_m2']
    lo, hi = g * share[0] / m2[1], g * share[1] / m2[0]
    pos = (h['mw'] - lo) / (hi - lo)
    check(lo <= h['mw'] <= hi, s['name'], f"{g:,.0f} m² → tool {lo:.1f}–{hi:.1f} MW; actual {h['mw']} MW IT ({pos:.0%} of the way up the range)")

print('\n2. Coefficients against the catalogue')
w = S['white_per_it_mw']; check(w['min'] <= m2[0] and m2[1] <= w['max'], 'hall area per MW', f"tool {m2[0]:.0f}–{m2[1]:.0f}; built halls {w['min']}–{w['max']} m²/MW (n={w['n']}, median {w['median']})")
ws = S['white_share']; check(ws['min'] <= share[0] and share[1] <= ws['max'], 'hall share', f"tool {share[0]:.0%}–{share[1]:.0%}; built {ws['min']:.0%}–{ws['max']:.0%} (n={ws['n']}, middle half {ws['p25']:.0%}–{ws['p75']:.0%})")
b = S['gross_per_it_mw_benchmark']; check((gpm[0], gpm[1]) == (b['min'], b['max']), 'whole-building check line', f"tool {gpm[0]:.0f}–{gpm[1]:.0f}; benchmarks {b['min']}–{b['max']} m²/MW (n={b['n']}, median {b['median']})")
implied = (m2[0] / share[1], m2[1] / share[0])
check(implied[0] <= b['min'] and b['max'] <= implied[1], 'chain covers all benchmarks', f"tool implies {implied[0]:.0f}–{implied[1]:.0f} m² of building per MW; benchmarks {b['min']}–{b['max']}")
hd = arr('m2PerMWHigh'); check(w['min'] <= hd[0] and hd[1] <= m2[0], 'high-density option', f"tool {hd[0]:.0f}–{hd[1]:.0f} m²/MW; densest built halls {w['min']}; typical starts at {m2[0]:.0f}")
ff = [x['m'] for x in S['floor_to_floor'] if x['m'] < 8]  # Talavera's 8.6 m is a ground floor, not a hall floor
check(min(ff) <= up[0] and up[1] <= max(ff), 'data-hall floor height', f"tool {up[0]}–{up[1]} m; built and proposed hall floors {min(ff)}–{max(ff)} m (n={len(ff)})")
print('\n3. For information (not pass/fail): small sites and conversions, any tier with a stated MW')
for s in B['sites']:
    h = s.get('headline')
    if not h or s['tier'] == 'context' or not (h['area_m2'] < 25000 or s.get('conversion')): continue
    g = h['area_m2']; lo, hi = g * share[0] / m2[1], g * share[1] / m2[0]
    where = 'inside' if lo <= h['mw'] <= hi else ('denser than the tool allows' if h['mw'] > hi else 'less dense than the tool allows')
    print(f"  {s['name'][:46]:46} {s['tier']:9} {h['mw']:>6} MW {h['mw_basis']:7} {g:>8,.0f} m²  tool {lo:.1f}–{hi:.1f}  {where}{'  (conversion)' if s.get('conversion') else ''}")
print(f"\n{fails} failed")
sys.exit(1 if fails else 0)
