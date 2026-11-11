"""1 Nov 2026: FM Global Data Sheet 5-32 (J.B. uploaded the PDF). Insurer guidance, not law. CHECK 1 (Claude read the text); check 2 open.
11 Nov 2026: quoted text replaced by paraphrase (licensed_text_rewrite_2026_11_11.py)"""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']
K = 'fmDS0532'
T = ("INSURER GUIDANCE: FM Property Loss Prevention Data Sheet 5-32, Data Centers and Related Facilities, Factory Mutual Insurance Company, January 2026, interim revision July 2026 (free at fm.com/datasheets; J.B. upload 1 Nov 2026): "
     "2.2.4.1 one-hour fire-rated interior walls and partitions for data processing equipment rooms, network/fibre rooms, tape storage rooms and emergency/standby power generation rooms; "
     "2.2.4.1.1 two-hour fire-rated interior walls to compartment the data centre where it has more than one data processing equipment room; 2.2.4.3 rated walls from structural floor to structural floor above or roof; "
     "2.2.2.1 minimize interior windows and doors to the data room, tempered or wired glass, minimum ¾-hour doors; 2.2.5.2 ceilings at most 30 ft (9 m); "
     "2.2.13.1 site above the predicted 0.2% annual exceedance (500-year) flood elevation plus 1 to 2 ft (0.3 to 0.6 m) of freeboard, at least 500 ft (152 m) from direct wave impacts or flood flow above 2 m/s; "
     "2.6.4.3 locate generators, in order of preference, in a separate purpose-built building, in the yard with enough space separation from important buildings, or on the ground floor of the data centre; 2.6.4.3.1 no emergency generators at roof level or in basements; "
     "2.6.4.4 24-hour fuel supply, or a refuelling plan for 24 h; 2.6.4.4.1 buried tanks preferred, then outdoor aboveground; 2.6.4.4.1.1 no diesel fuel tanks inside the data centre (basement included) or at roof level; "
     "2.6.6.2.2 air-handling equipment and air paths separate from those serving other parts of the building; 2.6.6.2.3 positive pressure of at least 3 mm water gauge in data rooms relative to adjacent areas; 2.2.1.3.1 keep the building's air intakes clear of exposure to combustible materials; "
     "2.6.5.1 UPS batteries per Data Sheet 5-28; Li-ion: gaseous agents don't cool, so cooling the surroundings is critical (3.x). An insurer's recommendations: what an FM-insured operator would be held to, not a code requirement.")
d['new_sources'][K] = T
m['source_kinds'][K] = 'insurer guidance'; m['source_check'][K] = 'claude'
cl = m['check_log'].setdefault(K, [])
if not any(c.get('date') == '1 Nov 2026' for c in cl):
    cl.append({'check': 1, 'by': 'Claude', 'date': '1 Nov 2026', 'where': 'PDF pp. 5–7, 26–27 (pdftotext of J.B. upload)', 'what': 'quotes in the source entry'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
