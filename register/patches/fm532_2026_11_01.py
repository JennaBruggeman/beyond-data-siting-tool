"""1 Nov 2026: FM Global Data Sheet 5-32 (J.B. uploaded the PDF). Insurer guidance, not law. CHECK 1 (Claude read the text); check 2 open."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']
K = 'fmDS0532'
T = ("INSURER GUIDANCE: FM Property Loss Prevention Data Sheet 5-32, Data Centers and Related Facilities, Factory Mutual Insurance Company, January 2026, interim revision July 2026 (free at fm.com/datasheets; J.B. upload 1 Nov 2026): "
     "2.2.4.1 'Provide one-hour fire-rated interior walls and partitions' for data processing equipment rooms, network/fibre rooms, tape storage rooms and emergency/standby power generation rooms; "
     "2.2.4.1.1 'If multiple data processing equipment rooms are within the data center, provide two-hour fire-rated interior walls for compartmentation'; 2.2.4.3 rated walls from structural floor to structural floor above or roof; "
     "2.2.2.1 minimize interior windows and doors to the data room, tempered or wired glass, minimum ¾-hour doors; 2.2.5.2 ceilings at most 30 ft (9 m); "
     "2.2.13.1 'Select a building site that is above the predicted 0.2% annual exceedance (500-year) flood elevation and includes 1 to 2 ft (0.3 to 0.6 m) of freeboard', at least 500 ft (152 m) from direct wave impacts or flood flow above 2 m/s; "
     "2.6.4.3 locate generators, in order of preference, 'In a separate, purpose-built building', 'In the yard with adequate space separation to important buildings', 'At the ground-floor level in the data center'; 2.6.4.3.1 'Do not locate emergency generators at roof level or in basement areas'; "
     "2.6.4.4 24-hour fuel supply, or a refuelling plan for 24 h; 2.6.4.4.1 buried tanks preferred, then outdoor aboveground; 2.6.4.4.1.1 'Do not locate diesel fuel tanks inside the data center, including the basement, or at roof level'; "
     "2.6.6.2.2 air-handling equipment and air paths 'independent from those connected to other building spaces'; 2.6.6.2.3 positive pressure of at least 3 mm water gauge in data rooms relative to adjacent areas; 2.2.1.3.1 'Do not expose the air intake(s) of the building to combustible materials'; "
     "2.6.5.1 UPS batteries per Data Sheet 5-28; Li-ion: gaseous agents don't cool, so 'cooling the surroundings is a critical factor' (3.x). An insurer's recommendations: what an FM-insured operator would be held to, not a code requirement.")
d['new_sources'][K] = T
m['source_kinds'][K] = 'insurer guidance'; m['source_check'][K] = 'claude'
cl = m['check_log'].setdefault(K, [])
if not any(c.get('date') == '1 Nov 2026' for c in cl):
    cl.append({'check': 1, 'by': 'Claude', 'date': '1 Nov 2026', 'where': 'PDF pp. 5–7, 26–27 (pdftotext of J.B. upload)', 'what': 'quotes in the source entry'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
