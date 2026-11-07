"""7 Nov 2026 (J.B., after the Clark fixes): (1) the per-size floor test uses the conservative density the tool pairs with the tested MW (hall + UPS +
battery at the high end of dc_rooms, ≈635 m² per MW); the dense end only sets the top of the MW range; (2) the plant yard is capped at the buildable depth
less 12 m (the tool's minimum hall depth, a drawing choice) and 90 %; yards whose units' part is deeper than the test lots' deepest (21.7 m) are flagged:
generator noise at the lot lines is not checked (no sourced sound level for the sets, ?); (3) a truck route to the inside dock: a straight corridor from a
rear lane or street, units beside it; otherwise a 6.1 m truck lane along the building's rear face (Vancouver Parking By-law s. 5.4.3; Edmonton 20001 gives
no loading aisle width, so 6.1 m there too, ?). Updates arch_ratios, adds r_generator_noise_unchecked, updates r_dock_truck_access and vanParking5."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
Q = {x['id']: x for x in d['quantities']}; S = d['new_sources']
q = Q['arch_ratios']
F = ("; 7 Nov 2026 (J.B.): the size test uses ≈635 m² per MW (hall + UPS + battery, high end; support rooms not added, ?); plant yard capped at the "
     "buildable depth less 12 m; a truck lane to the dock is reserved in the plant yard (straight from a rear lane or street, else 6.1 m along the rear face)")
if '7 Nov 2026 (J.B.): the size test uses' not in q['formula']: q['formula'] += F
OLD = "lenient by design; J.B. to review"
NEW = "lenient by design; replaced the same day by the conservative ≈635 m² per MW (J.B.)"
if NEW not in q['coef'] and OLD in q['coef']: q['coef'] = q['coef'].replace(OLD, NEW, 1)
tag = ' ‖ 7 Nov 2026 truck access: '
if tag not in S['vanParking5']:
    S['vanParking5'] += tag + ("s. 5.4.3 'Access to Loading Spaces': 'adequate provision shall be made for unobstructed access by vehicles to all off-street loading "
        "spaces by means of a minimum 6.1 metre wide manoeuvring aisle and a loading throat or throats where required if required, and from any lane abutting the "
        "site, or from a street where either no lane is present or the Director of Planning, in consultation with the City Engineer, is satisfied that lane access "
        "is not possible because of site or development peculiarities' (p. 5-5).")
C = {c['id']: c for c in d['conditions']}
c = C.get('r_dock_truck_access')
if c and 'truck lane is reserved' not in c['note']:
    c['note'] += (" Later on 7 Nov 2026 (J.B.): a truck lane is reserved in the plant yard (straight from a rear lane or street, units beside it; otherwise 6.1 m along "
                  "the rear face, units behind it). Reached on CLARK (flank street) and E06B (side lane); V339 and E06A have no street or lane at the rear or sides: "
                  "a drive from the front would be needed (Ratios counts its ground, the layout does not draw it), flagged.")
    c['test'] = c['test'].replace('a 6.1 m aisle (Parking By-law 5.4.1)', 'a 6.1 m aisle (Parking By-law 5.4.3)')
if 'r_generator_noise_unchecked' not in C:
    d['conditions'].append({"id": "r_generator_noise_unchecked", "heading": "1 Technical", "name": "Generator noise at the lot lines not checked",
      "test": "the noise check covers the cooling plant only; where the generators' part of the plant yard is deeper than the test lots' deepest (21.7 m), the set-up says their noise at the lot lines is not checked",
      "quantities": ["arch_ratios"], "move": ["physics"], "parties": ["neighbours", "city"], "constraint": False,
      "note": "No sourced sound level for the tool's 2 MW sets (Rehlko KD2000, Sound Level 2 enclosure): the register has MTU DS2250 (98.7 dBA at 7 m, open) and Cummins S-1443 (72–91.3 dB(A) at 7 m, 250–1,000 kW) only. Whether the Vancouver and Edmonton noise by-laws exempt standby generators or limit test runs is not read (?).",
      "sources": ["mtuDS2250", "cumminsS1443"], "next_action": "J.B.: KD2000 Sound Level 2 spec sheet (dB(A) at 7 m); read By-law 6555 and Bylaw 14600 on standby generators"})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('density, yard cap, truck lane')
