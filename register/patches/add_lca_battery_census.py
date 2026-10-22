# 16 Oct 2026: PNNL-33283 Figure 4.3 (LFP costs at 1 and 10 MW), Alissa et al. 2025 LCA workbooks (Zenodo), Census 2021 DA layer.
# Idempotent. Run after add_water_rules.py.
import json, os
h = os.path.dirname(os.path.abspath(__file__)); P = os.path.join(h, '..', 'formula_register.json')
r = json.load(open(P, encoding='utf-8'))
S = r['new_sources']
S['pnnl2022fig43'] = ('PNNL-33283 (Viswanathan et al., Aug 2022), Figure 4.3 p. 24, Li-ion LFP total installed cost, 2021 (US$/kWh): 1 MW 2 h 518.59, 4 h 448.34; 10 MW 2 h 461.15, 4 h 410.70; 2030: 1 MW 4 h 340.46, 10 MW 4 h 311.11; '
  'fixed O&M 1 MW 4 h $5.05/kW-yr; RTE 83%, 2,400 cycles at 80% DOD, 16-year calendar life (read by Claude 16 Oct 2026; J.B. download) — https://www.sandia.gov/app/uploads/sites/256/2024/02/ESGC-Cost-Performance-Report-2022-PNNL-33283.pdf')
S['alissa2025lca'] = ('Alissa et al. 2025, Nature 641:331–338, LCA tool workbooks (Zenodo 14268168; J.B. download): per virtual core per year on the 2021 US grid, air-cooled — building 0.6% of life-cycle GHG, servers 8.8%, use phase 90.4%; '
  'with 100% renewable electricity the total falls to 10.7% of that and servers become 82% of what remains (building 5%). Building figures come from a Microsoft bill of materials; no per-m² value is given (read by Claude 16 Oct 2026) — https://zenodo.org/records/14268168')
S['census2021DA'] = ('Statistics Canada, Census Profile 2021, dissemination areas (98-401-X2021006, BC and Prairies files) and 2021 DA cartographic boundaries (92-160-X, lda_000b21a_e); J.B. downloads 16 Oct 2026; '
  'selected counts extracted on J.B.\'s computer for CD 5915 (Greater Vancouver, 3,590 DAs, population 2,642,825) and CD 4811 (Division No. 11, 1,952 DAs) — https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/download-telecharger.cfm?Lang=E')
for q in r['quantities']:
    if q['id'] == 'battery':
        q['coef'] = ('round-trip 85% (NREL ATB 2024); PNNL 2022 LFP, 2021 US$ installed: 1 MW 518.59/kWh (2 h) and 448.34 (4 h), 10 MW 461.15 and 410.70 — about 10% above the 100 MW figure of 385; '
                     '2030: 340.46 (1 MW 4 h), 311.11 (10 MW 4 h); RTE 83% at the transformer, 2,400 cycles at 80% DOD, 16-year life; 34 ± 15 kWh/m² across built sites (Reber 2023); fire-code basis in BC/AB (NFPA 855 adoption) unconfirmed')
        q['sources'] = list(dict.fromkeys(['pnnl2022fig43'] + q['sources']))
        q['status'] = 'in hand (1 and 10 MW costs, 16 Oct 2026); fire code a gap'
    if q['id'] == 'embodied_building':
        q['coef'] = ('461 kg CO2e/m² median for general buildings (no data-centre per-m² benchmark exists). Alissa et al. 2025 (Microsoft data, air-cooled): the building is 0.6% of a data centre\'s life-cycle GHG on a US-average grid and about 5% on renewable power — '
                     'so the building shell is small either way; servers and electricity dominate')
        q['sources'] = list(dict.fromkeys(q['sources'] + ['alissa2025lca']))
        q['status'] = 'proxy per m²; share confirmed from Alissa et al. 2025'
    if q['id'] == 'embodied_it':
        q['coef'] = q['coef'].split(' Alissa')[0] + (' Alissa et al. 2025: making the servers is 8.8% of life-cycle GHG on a US-average grid but about 82% on renewable power — in Vancouver (18 g/kWh) the servers\' making is the largest carbon item; '
                                                     'in Edmonton (346 g/kWh) running them is.')
        q['sources'] = list(dict.fromkeys(q['sources'] + ['alissa2025lca']))
    if q['id'] == 'people_affected':
        q['coef'] = ('2021 census counts by dissemination area, spread evenly within each area onto a 100 m grid and summed within 200 m, 500 m and the sound distance: people, households, 65+, under 15, renter households, '
                     'households spending 30%+ on shelter, people in low income (LIM-AT % × population). Randomly rounded; suppressed values count as 0')
        q['sources'] = ['census2021DA']; q['conf'] = 70; q['status'] = 'in hand (tool v18, 16 Oct 2026)'
        q['source_roles'] = [{'id': 'census2021DA', 'term': 'counts by dissemination area', 'role': 'data', 'conf': 80, 'verified': True}]
json.dump(r, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')

# BC Hydro Emerging industries connections page (J.B. save, Oct 2026)
r = json.load(open(P, encoding='utf-8'))
r['new_sources']['bchEIC2026'] = ('BC Hydro, Emerging industries connections (page saved by J.B., Oct 2026; read by Claude): the 2026 Call for Demand for AI and data centres is closed — "15 applications representing close to 800 megawatts (MW) in total load request"; '
  'process enabled by Bill 31; feasibility results delivered 24 Aug, supplemental applications due 9 Sep, withdrawal deadline 16 Sep; with a provincial election called, results are expected after the government transition later in 2026 — '
  'https://app.bchydro.com/accounts-billing/electrical-connections/large-load/emerging-industries-connections.html')
for q in r['quantities']:
    if q['id'] == 'flexible_load' and 'bchEIC2026' not in q['sources']:
        q['sources'].append('bchEIC2026')
        q['coef'] = q['coef'] + '; 2026 Call: 15 applications, close to 800 MW requested; results expected after the government transition (BC Hydro, Oct 2026)'
json.dump(r, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('eic ok')
