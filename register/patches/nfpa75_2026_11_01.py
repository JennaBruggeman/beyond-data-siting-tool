"""1 Nov 2026: NFPA 75 (2024) pp. 75-10 to 75-14 and 75-20, read from J.B.'s screenshots of NFPA Free Access (not stored, per NFPA's terms). CHECK 1 (Claude).
11 Nov 2026: quoted text replaced by paraphrase (licensed_text_rewrite_2026_11_11.py)"""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']
K = 'nfpa75_2024'
T = ("STANDARD (US, benchmark; paywalled, read on NFPA Free Access): NFPA 75, Fire Protection of Information Technology Equipment, 2024 edition: "
     "6.1.1 the ITE area in a fully sprinklered building or a Type I or II (noncombustible) building; "
     "6.1.3 fire-resistance-rated construction separates the ITE area from other occupancies in the building, atria and other open spaces included; 6.1.3.1 the ITE room separated from other occupancies in the ITE area; "
     "6.1.3.2 rating matched to the exposure, at least 1 hour for both; 6.1.3.3 enclosures from structural floor to structural floor above or roof; "
     "6.1.3.4 doors: 2 h construction, 1½ h doors; 1 h construction, ¾ h doors; 6.1.3.6 separation may instead be set by a documented fire risk assessment (Ch. 4); "
     "6.3.1 the ITE area not above, below or next to areas or structures with hazardous processes unless approved protection is provided; "
     "6.3.2 ITE area access limited to authorized persons; 6.3.3 floors under ITE able to remove leaks (drains or containment with pumps); 6.3.3.2 leak detection under raised floors where liquids are piped in; "
     "6.6.2 pass-throughs or windows in rated construction need fire-rated shutters, a service-counter fire door or fire-rated windows, closing automatically on smoke or fire (6.6.2.1), rated at least as the wall (6.6.2.2); 6.6.3 fire and smoke dampers on ducts through rated construction; "
     "7.1.1 the ITE room holds only ITE and support equipment; 7.3.4 no combustible storage in battery rooms; 9.1.1 ITE rooms in a sprinklered building are sprinklered; "
     "4.2.3–4.2.4 the fire risk assessment covers life safety of occupants of adjacent spaces and the general public, and all adjacent exposures. "
     "Applies where ITE is installed in rooms of strategic importance (A.1.3.2).")
d['new_sources'][K] = T
m['source_kinds'][K] = 'standard (benchmark, outside Canada)'; m['source_check'][K] = 'claude'
cl = m['check_log'].setdefault(K, [])
if not any(c.get('date') == '1 Nov 2026' for c in cl):
    cl.append({'check': 1, 'by': 'Claude', 'date': '1 Nov 2026', 'where': "NFPA 75 2024 pp. 75-10 to 75-14, 75-20 (J.B.'s screenshots)", 'what': 'clauses quoted or summarised in the source entry'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
