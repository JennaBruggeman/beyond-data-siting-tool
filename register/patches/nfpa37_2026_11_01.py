"""1 Nov 2026: NFPA 37 (2024) pp. 37-8 to 37-12, read from J.B.'s screenshots of NFPA Free Access (read-only; screenshots not stored in the repo, per NFPA's terms). CHECK 1 (Claude); check 2 open.
11 Nov 2026: quoted text replaced by paraphrase (licensed_text_rewrite_2026_11_11.py)"""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']
K = 'nfpa37_2024'
T = ("STANDARD (US, benchmark; paywalled, read on NFPA Free Access): NFPA 37, Installation and Use of Stationary Combustion Engines and Gas Turbines, 2024 edition (pp. 37-8 to 37-12): "
     "4.1.1.1 engines readily accessible (NFPA 37's defined term) for maintenance, repair and firefighting; 4.1.1.2 air supply designed so that flue gases are not drawn in from stacks or flues; "
     "4.1.2.1.1 engine rooms within structures: walls, floors and ceilings rated at least 1 hour; 4.1.2.1.4 attached engine rooms: common wall at least 1 h; 4.1.2.1.5 openings with self-closing fire doors or dampers to match; "
     "4.1.2.2.2 dedicated detached structures at least 1.5 m (5 ft) from openings in walls and from structures with combustible walls, no minimum where the exposing or exposed wall is 1 h or the detached structure is sprinklered; "
     "4.1.3 on roofs: 4.1.3.1 at least 1.5 m from any openings in the walls of structures; 4.1.3.2 1.5 m from combustible walls unless 1 h (4.1.3.2.1), a fire test (4.1.3.2.2) or engineering calculations (4.1.3.2.3); 4.1.3.3 oil containment curb or dike holding the full lube-oil or fuel capacity; 4.1.3.4 noncombustible surface 300 mm beyond the engine and dike; "
     "4.1.4 outdoors: 4.1.4.1 1.5 m (5 ft) minimum from openings in structure walls (no exceptions); 4.1.4.2 1.5 m from structures having combustible walls, except 4.1.4.2.1 (structure within 1.5 m rated at least 1 h), 4.1.4.2.2 (fire test) or 4.1.4.2.2.3 (calculations) — the exceptions apply to combustible walls only, not to openings (our reading of the clause structure); "
     "6.3.2.2 fuel tanks not in a room of their own at most 2,500 L; larger tanks in a room per 6.3.5 or 6.3.6 (not read ?); 6.3.2.3 aggregate in a structure at most 5,000 L unless the excess is in such a room; 6.3.2.2.1 and 6.3.2.3.1 any size within engine rooms if engineered with fire detection, suppression and containment. "
     "Roof installation is permitted by NFPA 37 (contrast FM Global 5-32 2.6.4.3.1). Exhaust (Chapter 8 ?) not yet read.")
d['new_sources'][K] = T
m['source_kinds'][K] = 'standard (benchmark, outside Canada)'; m['source_check'][K] = 'claude'
cl = m['check_log'].setdefault(K, [])
if not any(c.get('date') == '1 Nov 2026' for c in cl):
    cl.append({'check': 1, 'by': 'Claude', 'date': '1 Nov 2026', 'where': "NFPA 37 2024 pp. 37-8 to 37-12 (J.B.'s screenshots)", 'what': 'clauses quoted or summarised in the source entry'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
