#!/usr/bin/env python3
"""Register update: heat payback method (J.B., 19 Oct 2026; audit/payback_method_2026-10-19.md). Idempotent."""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
P = os.path.join(H, '..', 'formula_register.json')
d = json.load(open(P, encoding='utf-8'))
Q = {q['id']: q for q in d['quantities']}
S = d['new_sources']
def role(i, term, r, c, v=True): return {'id': i, 'term': term, 'role': r, 'conf': c, 'verified': v}
S['squamishNEU2010'] = "Compass Resource Management with FVB Energy and Hemmera, District of Squamish Neighbourhood Energy Utility feasibility study, final report, 15 Jun 2010: levelised cost over 30 years (pp. 27, 42); WACC 7.6% (5.6% real), ROE 10% (8% real) regulated by BCUC, debt 6%, 60/40; depreciation DPS 1.5%/yr, ETS 3%/yr (p. 44) — https://squamish.ca/assets/Land-Use-Policies/61bbc09bea/Squamish-NEU-Final-Feasibility-Report.pdf"
S['energiforsk2022life'] = "Jakubowicz, Sällström, Vega, Yarahmadi, Lifetime predictions and status assessments, Energiforsk report 2022:872 (30 Jun 2022), s. 8.2: 'EN 253 (2019) states that the service life shall be 30 years at 120 °C with single peaks of 140 °C' for 300 h/yr; 50 years needs below 115 °C; degradation ×2.5 per +10 °C — https://energiforsk.se/media/31455/liftetime-predictions-and-status-assessments-energiforskrapport-2022-872.pdf"
S['tbsCBA2018'] = "Treasury Board of Canada Secretariat, Policy on Cost-Benefit Analysis (1 Sep 2018), s. 7.1: opportunity cost of capital as the discount rate; social discount rate when impacts are long-term (50+ years) or mainly on private consumption; s. 7.4: minimum 10-year period — https://www.canada.ca/en/treasury-board-secretariat/services/federal-regulatory-management/guidelines-tools/policy-cost-benefit-analysis.html"
S['scotHeat2011'] = "Scottish Government, The recovery of heat from power generation in Scotland (4 Nov 2011), economics: NPV at 9%, 40-year life — https://www.gov.scot/publications/study-recovery-heat-power-generation-scotland/pages/5/"
S['vanNEURates2026'] = "City of Vancouver, 2026 False Creek Neighbourhood Energy Utility customer rates, RTS 18251 (21 Oct 2025): levelised rate approach, commercial utility model with a return on invested capital — https://council.vancouver.ca/20251112/documents/spec1d.pdf"
q = Q['payback']
q.update({'formula': 'simple payback = (pipe + connection + heat pump) ÷ (heat sold × (value − electricity ÷ COP) − upkeep); levelised cost = (CRF(i,30)·pipe + CRF(i,25)·heat pump + upkeep) ÷ heat sold + electricity ÷ COP, against the heat value',
  'inputs': ['lcoh', 'window', 'crf', 'receiver_demand', 'distribution_cost'],
  'coef': 'i = 5.6% real (Squamish NEU 2010, BCUC-regulated utility WACC); pipe 30 yr (EN 253:2019 via Energiforsk 2022:872); heat pump 25 yr, 1.13–0.95 M€/MW, upkeep 2,100 €/MW·yr + 3.07 €/MWh (DEA sheet 40); 4,400–7,100 full-load h; middle case = midpoints. Check: Pärssinen 2019 Table 4 paybacks 1.8–5.1 yr (Finnish, larger units). No 5-year threshold (RVO 2018 kept only for the 1.5 km search radius)',
  'sources': ['crf', 'parssinen', 'squamishNEU2010', 'energiforsk2022life', 'dea', 'tbsCBA2018', 'scotHeat2011', 'vanNEURates2026'],
  'conf': 60, 'status': 'revised 19 Oct 2026: one BC cost of capital (2010); EN 253 read through a secondary report',
  'source_roles': [role('crf', 'capital recovery factor', 'method', 100), role('squamishNEU2010', '5.6% real, levelised over 30 yr', 'coefficient', 60),
    role('energiforsk2022life', 'pipe life 30 yr at 120 °C', 'coefficient', 70), role('dea', 'heat pump capex, upkeep, 25 yr', 'coefficient', 80),
    role('parssinen', 'payback 1.8–5.1 yr by size', 'check', 70), role('tbsCBA2018', 'federal practice: opportunity cost of capital', 'context', 90),
    role('scotHeat2011', 'NPV 9%, 40 yr', 'context', 70), role('vanNEURates2026', 'NEU rates levelised', 'context', 90)],
  'revised': '2026-10-19'})
if 'receiver_radius' in Q:
    Q['receiver_radius']['note'] = 'used only as how far the tool looks; the 5-year payback behind it is no longer a test (19 Oct 2026)'
S['nrelESIF2019'] = "Van Geet (NREL), Data Center Optimization Strategies: NREL ESIF Data Center Energy and Water Savings (Aug 2019): 24 °C cooling water supply, 35–40 °C return used to heat offices and lab space; ERE 0.929 (first year of TSC operation) — https://nrel.gov/docs/fy19osti/74464.pdf; NREL warm-water liquid cooling page: building needs at least 95 °F on the coldest day — https://www.nrel.gov/computational-science/warm-water-liquid-cooling"
S['vanNEConnect2013'] = "City of Vancouver, Neighbourhood Energy Connectivity Standards bulletin (Dec 2013), s. 4.3 maximum temperatures: radiant floor 45/35 °C, panels 60/45, baseboard 70/50, fan coils 70/50, make-up air 65/45, DHW 60 °C — https://guidelines.vancouver.ca/bulletins/bulletin-sustainability-neighbourhood-energy-connectivity-standards.pdf"
S['upsiteASHRAE5'] = "Upsite Technologies blog, Major changes to ASHRAE's fifth edition of Thermal Guidelines, part 3 (industry blog; ASHRAE text not read): facility water classes W17/W27/W32/W40/W45/W+ by upper limit; makers design around 40 °C, few above 45 °C — https://www.upsite.com/blog/major-changes-to-ashraes-fifth-edition-of-thermal-guidelines-part-3-liquid-cooling-chapter-updates/"
if 'heat_temp' in Q:
    q = Q['heat_temp']; q['sources'] = q.get('sources', []) + [x for x in ('nrelESIF2019', 'upsiteASHRAE5') if x not in q.get('sources', [])]
    q['coef'] = (q.get('coef', '') + ' | 19 Oct 2026: liquid-cooled measured design 24 °C supply, 35–40 °C return (NREL ESIF); 50–60 °C remains unverified (secondary).').strip(' |')
    q['revised'] = '2026-10-19'
json.dump(d, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('payback updated')
