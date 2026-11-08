"""8 Nov 2026 (J.B., F1b gate answers 1 and 2). Display and source notes only; no value changes.
1. 375 1st Ave E (Vancouver lot 63819495, CD-1 (402)) is a quiet zone under Noise Control By-law 6555: s. 1.2 '"quiet zone" means any portion of the city not
   defined as an activity zone, intermediate zone or event zone'; CD-1 402 is not listed in Schedule A (activity), B (intermediate) or G (event), and the tool's
   B.1 outline test puts the lot outside it (engine vZone). Read from the saved consolidation (to 14 Jul 2026, By-law 14786), Claude Link
   beyond-data-sources/public/bylaw6555/full.pdf. It adjoins 339 1st Ave E (0 m; Cowork's 131 m came from an out-of-date 5 Nov file).
   The engine's noise check (noiseCheck) tests only neighbouring lots that hold a building; 375's only outline is flagged 'not found in LiDAR 2022' (tiles f = 3),
   so the check does not test 55 dBA at that line. Recorded as a gap, not changed (engine.js stays as it is; J.B. to decide).
2. Edmonton BE height limit 16.0 m: Zoning Bylaw 20001 s. 2.120, 4.1.1 (clause as J.B. gave it, 8 Nov 2026; the tool already holds 16.0 m)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']; m = d['meta']
D = '8 Nov 2026'
T1 = ' ‖ 8 Nov 2026: 375 1st Ave E'
if T1 not in S['van6555zones']:
    S['van6555zones'] += (T1 + ' (lot 63819495, CD-1 (402)) is a quiet zone: s. 1.2 "quiet zone" means any portion of the city not defined as an activity zone, '
        'intermediate zone or event zone; CD-1 402 is not in Schedule A, B or G, and the lot lies outside the B.1 outline (tool vZone). It adjoins 339 1st Ave E (0 m). '
        'The tool\'s noise check tests only lots holding a building; 375\'s only outline is not found in LiDAR 2022, so its 55 dBA line is not tested (gap, ?).')
T2 = ' ‖ 8 Nov 2026: BE height'
if T2 not in S['arch_edmZB20001_BE']:
    S['arch_edmZB20001_BE'] += T2 + ': 16.0 m, Zoning Bylaw 20001 s. 2.120, 4.1.1 (clause given by J.B., 8 Nov 2026; shown on the Municipal storey and height cards).'
for k, w in (('van6555zones', '375 1st Ave E CD-1 (402) quiet zone: s. 1.2 definition, not in Sch. A, B, G; read from the saved consolidation'), ('arch_edmZB20001_BE', 'BE height clause s. 2.120, 4.1.1 given by J.B.')):
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('date') == D and c.get('what') == w for c in cl):
        cl.append({'check': 2, 'by': 'Claude Code (J.B. gate answer)', 'date': D, 'where': 'F1b gate', 'what': w})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('quiet zone 375, BE height')
