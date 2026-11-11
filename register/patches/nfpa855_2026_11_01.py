"""1 Nov 2026: NFPA 855 (2026) pp. 855-7, 855-8, 855-21 to 855-27 from J.B.'s screenshots (not stored, per NFPA's terms). CHECK 1 (Claude).
11 Nov 2026: quoted text replaced by paraphrase (licensed_text_rewrite_2026_11_11.py)"""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']
K = 'nfpa855_2026'
T = ("STANDARD (US, benchmark; read on NFPA Free Access): NFPA 855, Installation of Stationary Energy Storage Systems, 2026 edition: "
     "1.3 and Table 1.3 apply above 20 kWh of lithium-ion per fire area or outdoor installation (lead-acid 70 kWh); "
     "UPS exemptions (UPS listed to UL 1778: 9.2.1.1(3), 9.3.1(6), 9.5.1.4(6), 9.7.2.2(6)) cover only lead-acid, aqueous nickel-based and aqueous metal-air batteries, so a lithium-ion UPS is not exempt (our reading of the clause wording); "
     "9.5.1.1 groups of at most 50 kWh each; 9.5.1.2 groups 0.9 m (3 ft) from other groups and from walls; 9.5.1.3 larger groups or less spacing if fire testing (9.2) shows it; "
     "9.4.1.1 a dedicated-use ESS building holds only energy storage or grid/communications equipment, no other occupancy, admin areas at most 10 % of the storey behind 2 h fire barriers; "
     "9.6.1.2.1.1 in occupied work centres ESSs are permitted in the same room as the equipment they serve; 9.6.1.2.1.2 in a noncombustible locked cabinet unless in an equipment room accessible only to authorized personnel; "
     "9.6.1.2.2.1 not in sleeping rooms or spaces opening directly into them; "
     "outdoors (9.6.2.7.1): at least 3 m (10 ft) from lot lines, public ways, buildings, stored combustibles, hazardous materials and other exposures, reducible to 0.9 m with a 1 h freestanding exterior barrier (9.6.2.7.1.1), a noncombustible wall without openings of matching rating (9.6.2.7.1.2), fire testing (9.6.2.7.1.3) or a 2 h-rated ESS enclosure (9.6.2.7.1.5); "
     "9.6.2.7.1.6 ESS exhaust outlets at least 4.57 m (15 ft) from HVAC intakes, windows, doors, loading docks and other openings, not directed onto egress, walkways or travel paths; 9.6.2.7.1.7 at least 3 m from any means of egress; 9.6.2.1.1 3 m cleared of combustible vegetation; 9.6.2.6 no occupied work centres in outdoor installations; "
     "rooftops (9.6.3.1.1.2): 1.5 m (or the equipment height) from the roof edge, 3 m from the fire service access point, 1.5 m service walkways, standpipe outlet, no open racks; 9.6.3.1.3.1 rooftop ESSs 3 m from other buildings, lot lines, public ways and parking; "
     "9.7.1 smoke or thermal-image detection; 9.7.2.1 suppression per 4.9; 9.7.3.1 a permanent water supply. Indoor room fire-resistance rating is in Chapter 4 (not yet read ?).")
d['new_sources'][K] = T
m['source_kinds'][K] = 'standard (benchmark, outside Canada)'; m['source_check'][K] = 'claude'
cl = m['check_log'].setdefault(K, [])
if not any(c.get('date') == '1 Nov 2026' for c in cl):
    cl.append({'check': 1, 'by': 'Claude', 'date': '1 Nov 2026', 'where': "NFPA 855 2026 pp. 855-7, -8, -21 to -27 (J.B.'s screenshots)", 'what': 'clauses quoted or summarised in the source entry'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
