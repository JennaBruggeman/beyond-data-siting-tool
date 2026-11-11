"""11 Nov 2026 (J.B.): grid carbon stays on NIR for both cities (same method): NIR 2026 Annex 7 consumption intensity, 2024, marked preliminary
(the workbook flags 2024 'a'; the latest final year could not be read because the Annex 7 workbook is not on this computer). BC also shows a second,
labelled figure: the BC Government electricity emission intensity factor for the Integrated Grid, 2025 factor 22.8 tCO2e/GWh (consumption-based,
net imports included, exports excluded; 4-year window, 2025 uses 2021-2024). Spread over the factors made by the current (2021) method, 2021-2025:
9.7-22.8. Read by Claude 11 Nov 2026 from https://www2.gov.bc.ca/gov/content/environment/climate-change/data/electricity (last updated 26 May 2026)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
Q = {q['id']: q for q in d['quantities']}
g = Q['grid_co2']
g['coef'] += (' ‖ 11 Nov 2026 (J.B.): both cities stay on NIR 2026 consumption intensity (BC 18.1, Alberta 346.1 g/kWh), year 2024 marked preliminary '
  "(workbook flag 'a'; latest final year not read: workbook not on this computer ?). Second, labelled BC figure shown beside it, not added: BC Government "
  'Integrated Grid factor 2025 = 22.8 g/kWh (imports included); current-method factors 2021 9.7, 2022 11.5, 2023 11.3, 2024 9.9, 2025 22.8 → spread 9.7–22.8. '
  'The 2017–2020 factors on the page (31.7, 25.3, 29.9, 40.1) are on the 2017 method; the 2021-method backcast for 2020 is 9.2, so 40.1 is not part of the same-method spread.')
g['revised'] = '2026-11-11'
S = d['new_sources'] if 'gridBC' in d['new_sources'] else d['old_sources']
S['gridBC'] += (' ‖ RE-READ 11 Nov 2026 (Claude; page last updated 26 May 2026): main table 2017–2025: 31.7, 25.3, 29.9, 40.1, 9.7, 11.5, 11.3, 9.9, 22.8 tCO2e/GWh; '
  'backcast 2010–2020 on the 2021 method (2020: 9.2) and the 2017 method (2020: 40.1); "consumption-based estimate, meaning electricity imports are included and exports are excluded"; net imports basis.')
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('grid_co2, gridBC updated')
