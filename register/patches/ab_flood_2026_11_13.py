# 13 Nov 2026 (J.B.'s decision, audit K54): the Government of Alberta flood hazard maps for Edmonton lots (Claude Link ABFloodMapping.zip, read with
# pyogrio, installed with J.B.'s OK). tool/data/flood_edm.json is built by checks/tests/make_flood_edm.py (floodway and flood fringe only).
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); m = d['meta']; S = d['new_sources']
k = 'abFloodHazard'
S[k] = ('GOVERNMENT DATASET (trust 80): Government of Alberta, Alberta Flood Mapping, file geodatabase AB_Flood_Mapping.gdb, layer flood_hazard '
        '(floodway, flood fringe, high-hazard and protected flood fringe; 1:200 and 1:500 zones outside the hazard area). Edmonton: North Saskatchewan '
        'River Flood Study (Northwest Hydraulic Consultants, 2020-2022; final, 23 Sep 2024; https://open.alberta.ca/publications/north-saskatchewan-river-flood-study), '
        'with the St. Albert and Nisku studies at the edges. Open Government Licence - Alberta. Alberta sets no flood construction level.')
m.setdefault('source_kinds', {})[k] = 'government dataset'; m.setdefault('source_check', {})[k] = 'claude'
cl = m.setdefault('check_log', {}).setdefault(k, [])
if not any(c.get('date') == '13 Nov 2026' for c in cl): cl.append({'check': 1, 'by': 'Claude (code session)', 'date': '13 Nov 2026', 'where': 'AB_Flood_Mapping.gdb, layers flood_hazard and Study_Information', 'what': 'zone names, study names, dates and status read from the file'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8'); print('added', k)
