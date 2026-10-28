"""J.B. 28 Oct 2026 (option 1): the building figure in Time horizons is Statistics Canada's economic life, 25–27 years
(office buildings 27.0, warehouses 25.4; 15-206-X2015039 Table C.1-1), replacing the unsourced 'shell up to 40'.
Network 30–50 years follows EN 253 as quoted by Energiforsk 2022:872 (30 yr at 120 °C, 50 below 115 °C), matching the card.
Tool text changed in engine.js (lifespans line) and addons.js (Futures: the shell); no computed results change."""
import json, pathlib, re
R = pathlib.Path(__file__).resolve().parents[2]
REP = [
 ('"servers ~6; plant 15–25; shell ≤40; network 40–50; lease"', '"servers ~6; plant 15–25; building 25–27 (economic life); network 30–50; lease"'),
 ('"servers ~6; plant 15–25; shell ≤40; network 40–50"', '"servers ~6; plant 15–25; building 25–27 (economic life); network 30–50"'),
 ('Horizons: servers ~6 yr; plant 15–25; shell up to 40; network 40–50 (handoff rule 7);', 'Horizons: servers ~6 yr (LBNL 2024; company filings); plant 15–25 (Barroso; ASHRAE); building 25–27 yr economic life (Statistics Canada, offices 27.0, warehouses 25.4; physical life not published); network 30–50 (EN 253 via Energiforsk 2022); (handoff rule 7, sources added 28 Oct 2026);'),
 ('internal note (no primary named for: shell up to 40 years: no primary named (statcanLives gives 27 yr offices, 25.4 warehouses); ', 'internal note (building now 25–27 yr from statcanLives, J.B. 28 Oct 2026; no primary named for: '),
]
for f in ('register/formula_register.json', 'tool/opps.json', 'register/source_roles.py'):
    p = R / f; s = p.read_text(); n = 0
    for a, b in REP:
        a2 = a.strip('"') if f.endswith('.py') else a; b2 = b.strip('"') if f.endswith('.py') else b
        n += s.count(a2); s = s.replace(a2, b2)
    p.write_text(s); print(f, n)
# the trailing '?: internal note, each figure needs its own source' removed now that each figure names one
import re
for f in ('register/formula_register.json', 'tool/opps.json'):
    p = R / f; s = p.read_text()
    s = re.sub(r'\(handoff §3; \?: internal note, each figure needs its own source in the node revi[^)]*\)', '(handoff §3; Greene 2022 and Monstadt and Saltzman 2025 are cited as their own sources)', s); p.write_text(s)
