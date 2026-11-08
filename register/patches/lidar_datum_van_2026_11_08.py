"""8 Nov 2026 (J.B.): the vertical datum of the City of Vancouver LiDAR 2022 is settled: CGVD28 (GVRD), from the City's open-data portal metadata, read by
J.B. on the portal (it blocks automated reading; not circumvented) and recorded in Claude Link lidar_datum_2026-11-08.md. Trust 80 (government dataset
metadata, read by J.B., not a second reading). Consequence: Vancouver ground heights and the flood construction level (VBBL 2025 Div. A 1.4.1.2, 4.6 m,
'Greater Vancouver Regional District datum') are compared on one scale; that the FCL's 'GVRD datum' is CGVD28 GVRD is our reading. Edmonton stays '?'."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']; m = d['meta']
D = '8 Nov 2026'; TAG = ' ‖ 8 Nov 2026: vertical datum settled'
if TAG not in S['van_lidar2022_ground']:
    S['van_lidar2022_ground'] = S['van_lidar2022_ground'].replace('Vertical datum of the City LAS: not confirmed (?).', 'Vertical datum of the City LAS: CGVD28 (GVRD), settled 8 Nov 2026 (below).')
    S['van_lidar2022_ground'] += (TAG + ': the portal\'s dataset page, "Coordinate system": "Projection: UTM Zone 10 (Central Meridian 123 West); Hz Datum: NAD 83 (CSRS) 4.0.0.BC.1.GVRD; '
        'Vertical Datum: CGVD28GVRD; Metro Vancouver Geoid (HTMVBC00_Abbbyn.zip)". Read by J.B. on the City of Vancouver Open Data portal (blocks automated reading; not circumvented), '
        'recorded in Claude Link lidar_datum_2026-11-08.md. Trust 80 (government dataset metadata, read by J.B.). Ground heights and the 4.6 m flood construction level (GVRD datum; '
        'that this is CGVD28 GVRD is our reading) are now compared on one scale for Vancouver lots. Edmonton (NRCan HRDEM) not settled (?).')
cl = m['check_log'].setdefault('van_lidar2022_ground', [])
if not any(c.get('date') == D for c in cl):
    cl.append({'check': 2, 'by': 'J.B. (City portal metadata)', 'date': D, 'where': 'Claude Link lidar_datum_2026-11-08.md', 'what': 'vertical datum CGVD28GVRD read on the dataset page; trust 80'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
g = R / 'tool/data/grade.json'; G = json.loads(g.read_text(encoding='utf-8'))
G['van']['datum'] = 'CGVD28 (GVRD)'
G['van']['datumSrc'] = 'City of Vancouver Open Data, LiDAR 2022 dataset page, Coordinate system: "Vertical Datum: CGVD28GVRD" (read by J.B. 8 Nov 2026; trust 80; register van_lidar2022_ground)'
G['van']['sameAsFcl'] = 'our reading: the flood construction level\'s "Greater Vancouver Regional District datum" is CGVD28 (GVRD)'
g.write_text(json.dumps(G, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('lidar datum')
