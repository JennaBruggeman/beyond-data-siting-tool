"""1 Nov 2026: ANSI/ASHRAE Standard 62.1-2022 (J.B. upload). CHECK 1 (Claude, pdftotext). Not a code in BC or Alberta: benchmark."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']
K = 'ashrae621_2022'
T = ("STANDARD (US, benchmark; J.B. upload 1 Nov 2026): ANSI/ASHRAE Standard 62.1-2022, Ventilation and Acceptable Indoor Air Quality: "
     "5.4.1 outdoor air intakes (incl. natural-ventilation openings) at least the Table 5-1 distance from each source, or per Normative Appendix B; "
     "Table 5-1 (p. 10): Class 2 exhaust/relief outlet 3 m; Class 3 5 m; Class 4 10 m; evaporative heat-rejection (cooling tower) exhaust 7.5 m, intake or basin 5 m; driveway, street or parking 1.5 m; garage entry or loading area 5 m; garbage or dumpsters 5 m; "
     "thoroughfare with high traffic 7.5 m; truck loading area or dock, bus parking/idling 7.5 m; vents, chimneys and flues from combustion appliances and equipment 5 m; surface below intake 0.3 m; "
     "5.4.1.2 fuel-burning equipment distances follow NFPA 54, NFPA 31, NFPA 211 (not read ?); "
     "Appendix B (p. 40–41): B1.3 Class 3, Class 4, cooling-tower and combustion exhaust must be the full distance L from operable windows and doors of occupiable spaces (other exhaust half L), 'both those on the subject property and those on adjacent properties'; "
     "B1.4 no credit for vertical separation where exhaust is less than 20 m below an intake or window; B1.6 exhaust to property line half L, except Class 3/4 or combustion exhaust at least 3 m above grade beside a public way; Table B-1 Class 3 5 m, Class 4 10 m; "
     "6.1.4.2 outdoor air filtered to MERV 11 or better where PM2.5 exceeds the national standard. "
     "The 2022 edition has no generator-specific row (the 'diesel generator' dilution factor is in a later addendum, see arch_ashrae621ag); this edition's combustion-flue row (5 m) is our closest reading for generator exhaust (?).")
d['new_sources'][K] = T
m['source_kinds'][K] = 'standard (benchmark, outside Canada)'; m['source_check'][K] = 'claude'
m['check_log'].setdefault(K, []).append({'check': 1, 'by': 'Claude', 'date': '1 Nov 2026', 'where': 'ASHRAE 62.1-2022 pp. 9–10, 40–41 (pdftotext of J.B. upload)', 'what': 'quotes in the source entry'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
