# 13 Nov 2026 (J.B.'s decision, audit K55): City of Edmonton open-data lists for the Architecture "Programs nearby" card, downloaded with J.B.'s OK
# (file, source and size sent first). Raw CSVs kept outside the repo (Projects/bd-data/edmonton_2026-11-13/); tool/public_rooms_edm.json is built
# from them by checks/tests/make_public_rooms_edm.py (names, addresses, coordinates only). Trust 80 (government dataset).
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); m = d['meta']; S = d['new_sources']
NEW = {
 'edmLibraries': 'GOVERNMENT DATASET (trust 80): City of Edmonton Open Data, "Public Libraries" (jn25-zspi), CSV, 22 branches with name, address and coordinates; rows updated 11 Nov 2026; downloaded 13 Nov 2026 (5,554 bytes). Licence: City of Edmonton Open Data Terms of Use (Open Government Licence). https://data.edmonton.ca/d/jn25-zspi',
 'edmRecFacilities': 'GOVERNMENT DATASET (trust 80): City of Edmonton Open Data, "Recreation Facilities" (nz3t-vyg3), CSV, 107 City-owned, operated or funded facilities (19 recreation centres, 22 arenas, 5 outdoor pools and others) with coordinates; rows updated 12 Nov 2026; downloaded 13 Nov 2026 (22,656 bytes). Licence: City of Edmonton Open Data Terms of Use (Open Government Licence). https://data.edmonton.ca/d/nz3t-vyg3',
 'edmLeagueHalls': 'GOVERNMENT DATASET (trust 80): City of Edmonton Open Data, "Community League Halls" (kaps-rk7z), CSV, 141 halls with name and coordinates (street address on 23 rows only); rows updated 8 Nov 2026; downloaded 13 Nov 2026 (20,361 bytes). Licence: City of Edmonton Open Data Terms of Use (Open Government Licence). https://data.edmonton.ca/d/kaps-rk7z',
}
for k, v in NEW.items():
    S[k] = v; m.setdefault('source_kinds', {})[k] = 'government dataset'; m.setdefault('source_check', {})[k] = 'claude'
    cl = m.setdefault('check_log', {}).setdefault(k, [])
    if not any(c.get('date') == '13 Nov 2026' for c in cl): cl.append({'check': 1, 'by': 'Claude (code session)', 'date': '13 Nov 2026', 'where': 'data.edmonton.ca dataset metadata and the downloaded CSV', 'what': 'row count, columns, update date and licence read from the dataset page; rows as downloaded'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8'); print('added', list(NEW))
