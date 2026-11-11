"""3 Nov 2026 (Build 2, first line of checks/agents/BUILD2_BRIEF_2026-11-03.md): J.B.'s uploads for ASHRAE 62.1-2022.
1. Addendum ag to 62.1-2022 (PDF, 11 pp.): register arch_ashrae621ag was read from the ASHRAE web copy (checks 1-3, 30-31 Oct). The uploaded copy is now
   its local source; figures re-read from it (pdftotext) and two more quoted (flue exhaust rate; wind range). Check 4: build agent, the upload itself.
2. Screenshots of 62.1-2022 pp. 8-11 (s. 5.1-5.8, incl. s. 5.4 and Table 5-1, p. 10): register ashrae621_2022 was read 1 Nov from a pdftotext copy.
   Check 2: build agent re-read every Table 5-1 figure and 5.4.1 against the page images (not an independent agent: marked so).
   Two other screenshots uploaded with them are not 62.1 pages (a blank browser window; a tool screenshot): not used.
11 Nov 2026: quoted text replaced by paraphrase (licensed_text_rewrite_2026_11_11.py)"""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
UP = '/root/.claude/uploads/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/'
D = '3 Nov 2026'
def log(k, entry):
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('date') == D and c.get('check') == entry['check'] and c.get('by') == entry['by'] for c in cl): cl.append(entry)

K = 'arch_ashrae621ag'
ADD = (" ‖ LOCAL COPY (J.B. upload, 3 Nov 2026): " + UP + "fda2b3e6-62_1_2022_ag_20240430.pdf (11 pp.; approved by ASHRAE and ANSI on 30 Apr 2024, p. i). "
       "Re-read: Table B-1 (p. 4) diesel generators, diesel truck loading areas or docks and diesel bus parking or idling areas "
       "2000 × e, fn. b e = 1 − VOC removal efficiency of the odour filter (80 % filter: DF 400); Class 2 10, Class 3 50, Class 4 (kitchen grease hoods) 300; "
       "B1.1 Exception f: minimum separation distances for heat rejection equipment are those of Table 5-1 (p. 1); B1.3 Class 3, Class 4, cooling-tower and "
       "combustion exhaust the full distance L from operable openings to occupiable spaces, other exhaust half L (p. 2); B1.4 no credit for vertical separation under 65 ft (20 m) (p. 2); "
       "B2.1 flue vents: take 250 cfm per million Btu/h (0.00043 m3/s per kW) of combustion input unless the maker gives actual rates; with no local wind data, "
       "UH varied from 1.5 to 10 m/s (p. 4).")
if 'LOCAL COPY (J.B. upload, 3 Nov 2026)' not in S[K]: S[K] = S[K] + ADD
log(K, {'check': 4, 'by': 'Claude (build agent)', 'date': D, 'where': 'J.B. upload fda2b3e6-62_1_2022_ag_20240430.pdf, pdftotext pp. 1-4',
        'what': 'ok: 2000 × e, e footnote and Table 5-1 reference agree with checks 2-3; flue rate and wind range added'})

K2 = 'ashrae621_2022'
ADD2 = (" ‖ PAGE IMAGES (J.B. screenshots, 3 Nov 2026, pp. 8-11): " + UP + "4483d59c-image.png (p. 8), 2507c629-image.png (p. 9, s. 5.4, 5.4.1, 5.4.1.2), "
        "33e88e0c-image.png (p. 10, Table 5-1), bc270e6a-image.png (p. 11). Table 5-1 also lists plumbing vents 1 m above the intake 1 m, under 1 m above 3 m (p. 10); "
        "5.4.1.1 Class 2 and 3 separation applies between one system's intakes and any other system's exhaust and relief outlets (p. 9).")
if 'PAGE IMAGES (J.B. screenshots, 3 Nov 2026' not in S[K2]: S[K2] = S[K2] + ADD2
log(K2, {'check': 2, 'by': 'Claude (build agent; same agent, second method: page images)', 'date': D, 'where': 'J.B. screenshots of pp. 8-11 (Table 5-1 p. 10; s. 5.4 p. 9)',
         'what': 'ok: Class 2 3 m, Class 3 5 m, Class 4 10 m, evaporative exhaust 7.5 m, intake or basin 5 m, driveway 1.5 m, garage entry 5 m, garbage 5 m, '
                 'high-traffic thoroughfare 7.5 m, truck loading or bus idling 7.5 m, combustion vents 5 m, surface below intake 0.30 m: all agree with the page'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
