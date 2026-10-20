#!/usr/bin/env python3
"""Register update, 20 Oct 2026: BC Assessment heat receivers for Vancouver, the estimate range in both cities, and the Edmonton
equivalents found for backup power and heating type (J.B.: 'look for edmonton equivilients and then do these'). Idempotent.
BC Assessment terms (J.B. with Jeremy Buhler, UBC Library): calculated values per building may be shown, rounded; no raw BCA field
leaves J.B.'s computer; BC Assessment is cited."""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
P = os.path.join(H, 'formula_register.json')
d = json.load(open(P, encoding='utf-8'))
Q = {q['id']: q for q in d['quantities']}
S = d['new_sources']

S.update({
 'bcAssess2026': "BC Assessment, Residential Inventory Extract (area 09, 1 Apr 2026) and Non-Residential Inventory Extract (1 Apr 2026), via UBC Library Abacus, 'BC Assessment Data Advice and Inventory Extracts', https://hdl.handle.net/11272.1/AB2/LAPUAB (licensed to UBC researchers; derived values only, rounded)",
 'bcaGuideCom': "BC Assessment, Commercial Inventory Extract External User Guide v1.0: field 19 Gross Building Area ('the total constructed area of a building'); field 21 strata lot area, with strata units' areas x 15% for common areas where building size is not known",
 'bcaGuideRes': "BC Assessment, Residential Inventory Extract External User Guide v1.1 (8 Jul 2021): field 9 total finished area (single-family); fields 34-36 occupancy code and unit of measure (STRLA strata lot area, STRPS parking)",
 'vanTaxReport': "City of Vancouver Open Data, property tax report (FOLIO = the last 12 digits of BC Assessment's 15-digit roll number; LAND_COORDINATE = the parcel), downloaded Oct 2026",
 'sheu2019cma': "NRCan, Survey of Household Energy Use 2019, Table 4.1 Number of households by CMA and main heating equipment — https://oee.nrcan.gc.ca/corporate/statistics/neud/dpa/showTable.cfm?type=SHCMA&sector=AAA&juris=CA&year=2019&rn=12&page=1 (pages 0-2)",
 'ceudCom2023t24': "NRCan CEUD 2023, Commercial/Institutional Table 24, space heating energy by source (BC and Territories; Alberta), local com_bct_e.xls / com_ab_e.xls",
 'bcbc2024_326': "BC Building Code 2024, 3.2.6.1 (high buildings: Group C floor level of the top storey more than 18 m above grade) and 3.2.6.5 (at least one elevator for use by firefighters); NBC(AE) the same Article",
 'abCCcompliance2026': "Government of Alberta, Assisted Living and Social Services, Continuing Care Accommodation Standards compliance reporting as of June 2026 (Open Government Licence – Alberta) — https://open.alberta.ca/dataset/continuing-care-accommodation-standards-compliance-reporting",
 'bcResCare': "Government of British Columbia, Residential Care Facilities (licensed community care facilities, maximum capacity; Open Government Licence – BC) — https://catalogue.data.gov.bc.ca/dataset/residential-care-facilities",
})

q = Q['receiver_demand']
add = ("20 Oct 2026 (J.B.; make_bigrecv.py, bca/bca_derive.py): Vancouver buildings over the same thresholds that did not disclose are added from BC Assessment: "
       "homes x 16.81 MWh + other floor area x CEUD 2023 BC intensity, worked out on J.B.'s computer and rounded (inputs not shown). Roll joined to the City's folio on its last 12 digits "
       "(99.4% non-residential, 99.96% residential rows matched); strata buildings counted once per parcel (each strata lot's row repeats the building's gross area); "
       "strata lot areas x 1.15 for the size test (BCA's own common-area allowance, commercial guide, borrowed). Check against 238 measured Vancouver buildings: estimate / measured "
       "median 1.74, quartiles 1.0 and 3.2. Shown as a range in both cities: estimate / 1.7 to the estimate (J.B. 20 Oct); Edmonton could not be checked (no measured data published). "
       "699 added in Vancouver (others within 40 m of a measured building or another receiver)")
if add[:40] not in q['coef']: q['coef'] += ' | ' + add
for s in ('bcAssess2026', 'bcaGuideCom', 'bcaGuideRes', 'vanTaxReport'):
    if s not in q['sources']: q['sources'].append(s)
q.setdefault('source_roles', [])
for s, term, role, c in (('bcAssess2026', 'Vancouver homes and floor area per parcel', 'input', 85), ('bcaGuideCom', 'strata area rule, x 1.15', 'coefficient', 60)):
    if not any(r['id'] == s for r in q['source_roles']): q['source_roles'].append({'id': s, 'term': term, 'role': role, 'conf': c, 'verified': True})
q['revised'] = '2026-10-20'

# backup power: who would need it most, the same three sources in both cities (J.B. 20 Oct: Edmonton equivalents first)
q = Q['backup_neighbours']
add = ("20 Oct 2026 (opps.js): who would need power most, within 1 km: care homes and hospitals (receivers: provincial licence lists, see receivers_nearby); buildings over 21 m from measured heights (Vancouver LiDAR 2022, Edmonton City 3D buildings) and over 39 m, read against "
       "BCBC 2024 / NBC(AE) 3.2.6.1 (residential top floor over 18 m: high building), 3.2.6.5 (firefighters' elevator), 3.2.7.9 (over 36 m: 2 h generator for elevators, "
       "fire pumps and smoke fans only); heights to the roof, so approximate. Main heating by CMA, SHEU 2019 Table 4.1: Vancouver furnace 39.25%, boiler 22.77% (M), "
       "electric baseboard or radiant 28.95%; Edmonton furnace 75.24%, boiler 19.21% (M), electric baseboard U (not published). BC Assessment's care beds, elevators and "
       "heating type exist for Vancouver only and are not used, to keep the cities equal")
if add[:40] not in q['coef']: q['coef'] += ' | ' + add
for s_ in ('bcbc2024_326', 'sheu2019cma'):
    if s_ not in q['sources']: q['sources'].append(s_)
q['revised'] = '2026-10-20'
for qid in ('receiver_temp',):
    if qid in Q:
        q = Q[qid]; add = "20 Oct 2026 (cards.js, 'How hard to connect'): household main heating by CMA replaces StatCan 2011 provincial: SHEU 2019 Table 4.1 (see backup_neighbours)"
        if add[:40] not in q.get('coef', ''): q['coef'] = (q.get('coef', '') + ' | ' + add).strip(' |')
        if 'sheu2019cma' not in q.setdefault('sources', []): q['sources'].append('sheu2019cma')
q = Q['receivers_nearby']
add = ("20 Oct 2026 (dedupe_receivers.py M87): care homes from each province's licence list replace StatCan ODHF care records. Vancouver: BC Residential Care "
       "Facilities, all licensed types inside the City (100 homes, 3,853 licensed places). Edmonton: Alberta continuing-care compliance reporting June 2026, latest "
       "visit per site since 1 Jul 2024, Continuing Care Home Types A and B and Group Homes (assisted living and lodges left out: BC's list has no assisted living); "
       "159 placed by City assessment address (19 at the nearest house number within 20), 3 not placed (In and Out Home Care House #2, Shepherd's Care Kensington "
       "Village, Salvation Army Grace Manor). ODHF care records with no listed home within 150 m kept (Vancouver 7, Edmonton 1)")
if add[:40] not in q['coef']: q['coef'] += ' | ' + add
for s_ in ('bcResCare', 'abCCcompliance2026'):
    if s_ not in q['sources']: q['sources'].append(s_)
q['revised'] = '2026-10-20'
for s_ in ('bcResCare', 'abCCcompliance2026'):
    if s_ not in Q['backup_neighbours']['sources']: Q['backup_neighbours']['sources'].append(s_)
json.dump(d, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
