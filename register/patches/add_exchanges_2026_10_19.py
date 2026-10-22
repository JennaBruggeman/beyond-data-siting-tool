#!/usr/bin/env python3
"""Register update: electricity and water exchanges to the same rows as heat (J.B., 19 Oct 2026).
Sources: audit/research_2026-10-19/G_electricity_exchange.md, H_water_exchange.md. Idempotent."""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
P = os.path.join(H, '..', 'formula_register.json')
d = json.load(open(P, encoding='utf-8'))
Q = {q['id']: q for q in d['quantities']}
S = d['new_sources']
def role(i, term, r, c, v=True): return {'id': i, 'term': term, 'role': r, 'conf': c, 'verified': v}
def edit(i, **kw):
    q = Q[i]
    for k, v in kw.items():
        if k == 'add_sources': q['sources'] = q['sources'] + [x for x in v if x not in q['sources']]
        elif k == 'add_roles': q['source_roles'] = [r for r in q.get('source_roles', []) if r['id'] not in {x['id'] for x in v}] + v
        elif k == 'append': q['coef'] = (q.get('coef', '') + ' | ' + v).strip(' |')
        else: q[k] = v
    q['revised'] = '2026-10-19'
def add(i, name, unit, stage, inputs, formula, coef, sources, conf, status, roles):
    q = {'id': i, 'name': name, 'unit': unit, 'formula': formula, 'inputs': inputs, 'coef': coef, 'sources': sources, 'conf': conf, 'status': status, 'stage': stage, 'source_roles': roles, 'added': '2026-10-19'}
    if i in Q: d['quantities'][d['quantities'].index(Q[i])] = q
    else: d['quantities'].append(q)
    Q[i] = q
S['nrelBatt2025'] = "Cole, Ramasamy, Turan, NREL TP-6A40-93281, Cost Projections for Utility-Scale Battery Storage: 2025 Update (Jun 2025): US$334/kWh (2024$) 4 h; fixed O&M 4% of capex a year; 15-yr life; 85% round trip — https://docs.nrel.gov/docs/fy25osti/93281.pdf"
S['nrelATBcommBatt2024'] = "NREL ATB 2024, Commercial Battery Storage: fixed O&M 2.5% of capital cost; 15 yr; 85% — https://atb.nrel.gov/electricity/2024/commercial_battery_storage"
S['bchESI2026'] = "BC Hydro Energy Storage Incentive customer manual (24 Sep 2026): lesser of $10,000/kW, $10,000 × kWh/4 or 80% of eligible cost; ≥ 25 kW; behind the meter, non-exporting; 10-yr contract; SGS/MGS/LGS eligible, not transmission — https://bchydro.com/content/dam/BCHydro/customer-portal/documents/power-smart/business/programs/esi-customer-program-manual.pdf"
S['aesoStats2025'] = "AESO, Annual Market Statistics 2025, Table 13 (p. 55): operating reserve volumes and costs by category; active procured 2025 5,928 GWh / $206 M, 2024 5,834 / $255 M; standby procured 709 / $8 M and 713 / $10 M — https://www.aeso.ca/assets/Annual-Market-Stats-2025.pdf"
S['bcucG6426'] = "BCUC Order G-64-26 and Decision (24 Mar 2026): RS 1289 net metering closed 1 Jul 2026; RS 2289 net injection limit 100 kW per phase after the customer's load; 10 ¢/kWh for net generation — https://www.ordersdecisions.bcuc.com/bcuc/orders/en/523115/1/document.do"
S['aesoMicrogen2025'] = "AESO, Connecting Microgeneration (17 Sep 2025): under 5 MW; small under 150 kW credited at the retail energy rate; large at the hourly pool price — https://www.aeso.ca/assets/Connecting-Microgeneration.pdf"
S['bcucG3026'] = "BCUC Order G-30-26 (23 Feb 2026): BC Hydro public EV charging, Level 2 28.28 ¢/kWh; fast charging 39.70 ¢/kWh from 1 Apr 2026 (as proposed in the decision) — https://www.ordersdecisions.bcuc.com/bcuc/orders/en/523073/1/document.do"
S['nrcanEVinfra2024'] = "Dunsky and ICCT for NRCan, Electric Vehicle Charging Infrastructure for Canada (Feb 2024), Table 12: Level 2 $15,000 a port, DC fast $160,000 at 125 kW (2025, 2022 $) — https://natural-resources.canada.ca/energy-efficiency/transportation-alternative-fuels/resource-library/electric-vehicle-charging-infrastructure-for-canada/25756"
S['vanRates2026'] = "City of Vancouver, 2026 utility rates (Council 12 Nov 2025, spec1a Sch. D, spec1b Part V; metered rates page): water $4.091 (16 Oct–30 Apr) and $5.128 (1 May–15 Oct) per unit, sewer $7.960 per unit, all metered uses; 1 unit = 2.83168 m³ — https://vancouver.ca/home-property-development/metered-rates.aspx"
S['epcorBylaw19626'] = "EPCOR Water Services Bylaw 19626, Sch. 1 Pt I (2022–23): commercial water $1.6122–0.9472/m³ by tier (tier mapping unclear in the extract) — https://epcor.com/content/dam/epcor/documents/supporting-documents/epcor_water-services_bylaw%E2%80%8B-19626.pdf"
S['epcorWW2024app'] = "EPCOR 2024 rate application, Appendix A: commercial wastewater treatment 2025 $1.1486/0.8886/0.4636 per m³ (proposed; another table differs), sanitary $1.1212 (proposed) — https://www.epcor.com/content/dam/epcor/documents/supporting-documents/2024_water-rate-application-appendix-a-summary-of-bylaw-and-key-changes.pdf"
S['epcorWWpbr2025'] = "EPCOR 2025–27 Wastewater PBR application: Gold Bar reclaimed water to industrial customers (pp. 2, 21, 25); price and volume not stated — https://www.epcor.com/content/dam/epcor/documents/supporting-documents/2025-2027-wastewater-pbr-application.pdf"
S['mvUT019'] = "Metro Vancouver, Interim Reclaimed Water Policy UT-019 (29 Sep 2023): industrial uses listed; commits to set pricing; none published — https://metrovancouver.org/boards/Policies/interim-reclaimed-water.pdf"
S['ubcReclaimed2022'] = "Patiño (UBC Sustainability Scholars for Metro Vancouver, 2022), Reclaimed water benefits and cost: US utilities price reuse at 20–100% of potable (2007 survey) — grey literature — https://www.sustain.ubc.ca/sites/default/files/2022-024_ReclaimedWaterBenefitsAndCost_Patino.pdf"
S['epaRain2013'] = "US EPA 841-R-13-002 (2013), Rainwater harvesting: cistern US$1.50–3.00 per gallon; pumps, controls, treatment US$2–5 per gallon (p. 24) — https://www.epa.gov/sites/production/files/2015-11/documents/rainharvesting.pdf"
S['vanISMP2014'] = "City of Vancouver, Integrated Stormwater Management BMP Toolkit Vol. II (2014), p. II-18: about $10,000 for a 15 m³ below-ground tank (Class D ±30%) — https://vancouver.ca/files/cov/integrated-stormwater-management-best-practice-toolkit-volume-2.pdf"
S['femRain'] = "US DOE FEMP, Rainwater harvesting systems technology review: tanks and pipework warranted 15–30 years, pumps 2–10 — https://www.energy.gov/cmei/femp/rainwater-harvesting-systems-technology-review"
S['epaQuincy'] = "US EPA, Water reuse case study, Quincy WA reuse utility: operational 30 Jun 2021, $31 M operator-funded, 30-yr agreement, 138 M gal/yr potable saved — https://www.epa.gov/node/286187"
edit('battery', add_sources=['nrelBatt2025', 'nrelATBcommBatt2024'], append='19 Oct 2026: cost range CAD 467–627/kWh (NREL 2025 US$334, 2024$, to PNNL 2022 1 MW 4 h US$448, 2021$; US$ × 1.3978, no inflation adjustment); O&M 2.5–4% of capex a year; 15 yr; cost per kW-year at 5.6% real compared with the programme value (Electricity card)')
edit('peak_relief', add_sources=['bchESI2026', 'aesoStats2025'], append='19 Oct 2026: ESI pays up to 80% of eligible cost (LGS, ≥25 kW, non-exporting, 10-yr); AESO reserve averages per MW-hour procured: active $43.71 (2024) / $34.75 (2025), standby $14.03 / $11.28 (Table 13, cost ÷ volume; not by product); all-hours value shown as an upper bound')
edit('water_supply', add_sources=['vanRates2026', 'epcorBylaw19626', 'epcorWW2024app', 'epcorWWpbr2025', 'mvUT019', 'ubcReclaimed2022', 'epaQuincy'], append='19 Oct 2026: Vancouver water + sewer $4.26–4.62/m³ (both on metered water); Edmonton 2026 commercial not read, placeholder $2.53–3.88/m³ from 2022–23 water and proposed 2025 wastewater and sanitary; reclaimed price not published in either region; US 20–100% of potable (grey literature)')
edit('rainwater', add_sources=['epaRain2013', 'vanISMP2014', 'femRain'], append='19 Oct 2026: storage CAD 667/m³ (Vancouver toolkit 2014) to 2,955 (US EPA 2013 with pumps and controls, US$ converted); 15–30 yr (warranties); cost per m³ used at 5.6% real against water + sewer rates')
add('ev_repay', 'EV port repaid by', 'kWh', 'test', ['ev_stalls'], 'kWh = port cost ÷ (public price − electricity cost)', 'BC: $15,000 ÷ (28.28 − 6.79) ¢ ≈ 70,000 kWh (≈ 9,400 h at 7.4 kW); Alberta: no public rate found; utilisation not published (no Level 2 figure)', ['bcucG3026', 'nrcanEVinfra2024', 'bchTariff2026'], 60, 'derived 19 Oct 2026', [role('bcucG3026', 'L2 28.28 ¢/kWh', 'coefficient', 90), role('nrcanEVinfra2024', '$15k a port', 'coefficient', 70)])
add('pv_lcoe', 'Rooftop solar cost per MWh', 'CAD/MWh', 'test', ['pv_roof', 'pv_cost'], '(CRF(5.6%, 30) × capex + O&M) ÷ MWh a year, against the energy charge it avoids', 'self-use offsets the energy charge (RS 2289: "offset their consumption"); demand charge not reduced (flat load); BC exports 10 ¢/kWh up to 100 kW per phase; Alberta micro-generation under 5 MW', ['bcucG6426', 'aesoMicrogen2025'], 60, 'derived 19 Oct 2026', [role('bcucG6426', 'RS 2289 terms', 'rule', 90), role('aesoMicrogen2025', 'micro-generation credit', 'rule', 90)])
S['edmBylaw21442'] = "City of Edmonton Bylaw 21442, 2026 Property Tax and Supplementary Property Tax Bylaw, s. 2(n): Other Residential = four or more self-contained dwelling units used for permanent living accommodation — https://www.gov.edmonton.ab.ca/sites/default/files/public-files/documents/bl21442.pdf"
S['ceudResTable2'] = "NRCan Comprehensive Energy Use Database 2023, Residential Sector Table 2 (BC and Alberta): space + water heating ÷ total floor space, 2018–22 average: BC 0.400, Alberta 0.777 GJ/m² (all dwellings); per household BC 60.5, Alberta 119.3 GJ (data/82007eb2-res_bc_e_2.xls, a1c75be6-res_ab_e_2.xls)"
edit('receiver_demand', add_sources=['edmBylaw21442', 'ceudResTable2'], append='19 Oct 2026 (make_bigrecv.py): large buildings added at the Vancouver GHG by-law reporting thresholds in both cities (commercial ≥ 4,645 m², multi-family and hotels ≥ 9,290 m²). Vancouver: owner-reported floor area × reported heat energy intensity (measured, disclosed buildings only: 200 added). Edmonton: assessment gross area of Other Residential × 0.777 GJ/m² and Commercial × 1.40 GJ/m² (estimate; 1,048 added). Condominiums not caught in Edmonton; non-disclosing buildings not caught in Vancouver (BC Assessment to follow)')
# logic test 19 Oct 2026 (audit/logic_test_heat_2026-10-19.md), J.B. decisions
if 'receiver_radius' in Q:
    edit('receiver_radius', formula='search to 3 km in a straight line (a street-routing limit); the cost of each pipe decides', append='logic test 19 Oct 2026 (J.B.): the RVO 1.5 km reach is retired — in Edmonton a mall at 2.9 km was as good as the best building inside 1.5 km')
edit('payback', append='logic test 19 Oct 2026 (J.B.): demand figures are energy bought, heat delivered = × 0.85 (gas boiler); cards also show the middle case at 3% and 8% cost of capital, and with the heat pump covering the coldest hours (full-load hours from CWEC: Vancouver 3,200–4,500, Edmonton 2,900–3,900; annual ÷ peak hour, single coldest to 99th percentile, base 15.5–18 °C, hot water flat)')
json.dump(d, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('exchanges updated')
