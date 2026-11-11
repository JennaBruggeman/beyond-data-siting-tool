"""3 Nov 2026: the data centre's own rooms in the register (Architecture rebuild, part 1; checks/agents/REBUILD1_BRIEF_2026-11-03.md).
Research: checks/research_arch_v1/dc_rooms.md and dc_rooms_sources.json. Texts already carry checks 2 and 3 (checkV2_result_dc_rooms.json,
checkV3_result_dc_rooms.json); this patch adds the arch_dc_* sources with their kinds, logs checks 1-3, and adds Architecture-only quantities
for each room the research sizes. Rooms with no size rule are listed in arch_dc_rooms with '?'. Figures the tool shows: tool/data/dc_rooms.json."""
import json, pathlib
from _licensed import clean  # 11 Nov 2026: loaded checks/ files pass the licensed-text guard
R = pathlib.Path(__file__).resolve().parents[2]
A = R / 'checks/research_arch_v1'
D = '2 Nov 2026'
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
src = clean(json.load(open(A / 'dc_rooms_sources.json')))
r2 = clean(json.load(open(A / 'checkV2_result_dc_rooms.json'))); r3 = clean(json.load(open(A / 'checkV3_result_dc_rooms.json')))
# kind from the label each source text starts with (research brief: kinds named in the text)
KIND = [('OPERATOR CLAIM', 'operator claim'), ('MAKER CLAIM', 'manufacturer claim'), ('INSURER GUIDANCE', 'insurer guidance'), ('RULE', 'rule'),
        ('DESIGN GUIDE', 'design guide'), ('GOVERNMENT REPORT', 'government'), ('FILED PLANNING PAPER', 'filed plans'), ('FILED PLANS', 'filed plans')]
ABROAD = ('(US', '(Hong Kong', 'UK', '(EU')  # outside Canada: marked as a benchmark
def bad(res, k):
    r = res.get(k) or {}
    return [c for c in r.get('claims', []) if c.get('verdict') in ('WRONG', 'NOT FOUND', 'UNREACHABLE')], r
n = 0
for k, v in src.items():
    if k not in S: n += 1
    S[k] = v
    kind = next((kk for pre, kk in KIND if v.upper().startswith(pre)), 'named in our notes, not yet checked')
    if any(t in v[:80] for t in ABROAD): kind += ' (benchmark, outside Canada)'
    if k == 'arch_dc_ualbertaTelecom': kind += ' (benchmark: office and campus buildings, not data centres)'
    for res in (r2, r3):
        if (res.get(k) or {}).get('kind_change'): kind = res[k]['kind_change']
    m['source_kinds'][k] = kind; m['source_check'][k] = 'claude'
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('date') == D and c.get('check') == 1 for c in cl):
        cl.append({'check': 1, 'by': 'Claude (research agent)', 'date': D, 'where': 'checks/research_arch_v1/dc_rooms.md', 'what': 'figures quoted in the source entry'})
    for no, res, fn in ((2, r2, 'checkV2_result_dc_rooms.json'), (3, r3, 'checkV3_result_dc_rooms.json')):
        b, r = bad(res, k)
        if k in res and not any(c.get('date') == D and c.get('check') == no for c in cl):
            cl.append({'check': no, 'by': 'Claude (independent agent)', 'date': D, 'where': r.get('where_read', '')[:200],
                       'what': 'ok' if not b else f'{len(b)} claim(s) corrected or unconfirmed; see {fn}'})
have = lambda ids: [i for i in ids if i in S or i in d.get('old_sources', {})]
Q = [
 dict(id='arch_dc_hall', name='Data hall, m² per MW of IT (Architecture mode)', unit='m² per MW IT',
      formula='hall floor = MW of IT × 290–630 m² per MW (≈250 at high density); per floor, on the floors the zone allows data storage',
      inputs=['it_load_outside', 'size_fit', 'hall_area'],
      coef='five built Canadian halls, operator claims (register it_load_outside; tool/data/size.json m2PerMW); not at the ground floor in Vancouver I-2, I-3, FC-2; ceiling at most 9 m (FM 5-32 2.2.5.2, insurer guidance); 1 h walls, 2 h between halls (FM 5-32 2.2.4.1, insurer guidance); code separation depends on the hall\'s occupancy, which no code names (if F-2: Table 3.1.3.1)',
      sources=have(['estruxtureVAN1ds', 'hut8Vault', 'quEDM1_2026', 'fmDS0532', 'van_zdb_i2', 'van_zdb_i3', 'van_zdb_fc2', 'arch_pub_nbc3131full']), conf=50,
      status='in hand (operator claims; checks 1–3 of dc_rooms.md)', stage='size'),
 dict(id='arch_dc_electrical', name='Electrical room (UPS), m² per MW of IT (Architecture mode)', unit='m² per MW IT',
      formula='UPS equipment 2.4–3.3 m² per MW (equipment only, no working space); room by count: UPS modules + 1.5 m working space (CEC 2-310 2))',
      inputs=['component_space', 'ups_modules', 'electrical_room'],
      coef='manufacturer claims (Vertiv EXL S1, Schneider Galaxy VX, ABB MegaFlex UL; register component_space); 1 h service room (NBC 3.6.2.1.(6), (7)); UPS carries the load for 10–15 min (FM 5-32 3.5.2.1, insurer guidance); next to the hall it feeds ? (no source)',
      sources=have(['vertivEXLS1', 'galaxyVX', 'cec2024', 'nbc2020_v1', 'arch_dc_fm0532rooms']), conf=50, status='in hand (manufacturer claims)', stage='size'),
 dict(id='arch_dc_battery', name='Battery room, lithium-ion, m² per MW of IT (Architecture mode)', unit='m² per MW IT',
      formula='Li-ion cabinets 1.0–1.8 m² per MW for about 5 min (equipment only); VRLA ≈3.3–6.0 m² per MW (Li-ion ÷ 0.3, maker\'s \'saves space 70%\', our arithmetic; not used)',
      inputs=['component_space', 'battery_cabinets'],
      coef='manufacturer claims (Vertiv EnergyCore Li5, Delta LZH; register component_space); HVAC separate from the hall, above the 500-year flood + 0.3–0.6 m (FM 5-28, insurer guidance); 2 h kept (NFPA 855, US standard, stricter than FM 1 h); Li-ion room rules are in FM 5-33, not read (?); 0.914 m clear in front of cabinets (Vertiv manual)',
      sources=have(['vertivLi5', 'deltaLZH', 'vertivHPL', 'arch_up_fm0528', 'nfpa855_2026', 'vertivLi5manual']), conf=50, status='in hand (manufacturer claims)', stage='size'),
 dict(id='arch_dc_ets', name='Energy transfer station room (Architecture mode)', unit='m²',
      formula='Vancouver NEU: at least 6 × 3 m below 13,940 m² of building floor, 6 × 4 m to 23,230 m², 2.7 m headroom, P1 on the perimeter; Blatchford (Edmonton): 27–55 m² by number of units (residential table; benchmark for a data centre)',
      inputs=['hr_plant_room', 'floor_area'], coef='government guide (NEU) and utility design guide (Blatchford); only where the site joins a heat network',
      sources=have(['neuETS', 'arch_ho_vanNEUconn2020', 'arch_ho_breMultiUnit2025', 'arch_dc_rts19744cond']), conf=70, status='in hand (checks 1–3)', stage='size'),
 dict(id='arch_dc_portal', name='Security portals (Architecture mode)', unit='m each',
      formula='portal 1.0–1.8 m square or round, 2.2 m high (1.8 m: wheelchair model); a swing door beside each for egress; an 850 mm accessible door at each layer; count per zone line ? (no source)',
      inputs=['security_layers'], coef='maker claims (Boon Edam, Gunnebo); egress and accessibility: NBC 3.4.6.15, 3.4.6.16.(5), 3.8.3.6.(2) (our reading)',
      sources=have(['arch_acc_boonSolo', 'arch_acc_gunneboHiSec', 'arch_acc_nbcRevolving', 'arch_acc_nbcDoorRelease', 'arch_acc_nbcAccessible']), conf=65, status='in hand (maker claims)', stage='size'),
 dict(id='arch_dc_washrooms', name='Staff washrooms (Architecture mode)', unit='water closets',
      formula='per sex: 1–10 staff → 1, 11–25 → 2, 26–50 → 3 (if Group F); one shared WC at an occupant load ≤10 (Vancouver ≤25); staff ≈1 per MW in business hours (one applicant claim, UK); room area ?',
      inputs=['arch_dc_hall'], coef='rule (NBC 3.7.2) for the count; the staff figure is an applicant claim and outside Canada; showers not required',
      sources=have(['arch_per_nbcWC', 'hillingdon_up4', 'arch_dc_nbcJanitorShower']), conf=45, status='count rule in hand; area ?', stage='size'),
 dict(id='arch_dc_rooms', name='The data centre\'s rooms (Architecture mode)', unit='list',
      formula='hall, electrical (UPS), battery (Li-ion): m² per MW; heat recovery: m² per MW of heat; transformers, generators, chillers or dry coolers, loading: by the counts the rest of the tool uses; energy transfer station: NEU table; portals: by unit; staff washrooms: by count. No size source: MV switchgear, telecom entrance and meet-me rooms, fire suppression, storage and staging, security control and guard room, offices and NOC, break room, janitor (shown as ?)',
      inputs=['arch_dc_hall', 'arch_dc_electrical', 'arch_dc_battery', 'arch_dc_ets', 'arch_dc_portal', 'arch_dc_washrooms', 'component_space', 'transformers', 'generator_sets', 'cooling_units'],
      coef='figures and their ids: tool/data/dc_rooms.json; research: checks/research_arch_v1/dc_rooms.md (checks 1–3); support space as a share of the building ranges 13–52 % in six cases (not a rule, not used)',
      sources=have(['burlingtonPlans2026', 'arch_dc_fm0532rooms', 'fmDS0532']), conf=50, status='in hand; eight rooms ?', stage='size'),
 dict(id='arch_ratios', name='Site ratios: coverage, floor-area split, data-centre size (Architecture mode)', unit='m² · %, MW',
      formula='allowed floor = min(lot × floor-space ratio, building footprint × storeys under the height limit); footprint up to the zone\'s coverage limit where the register has one, else the buildable area inside the yards; data centre share × allowed floor = hall + electrical + battery floor; MW = that floor ÷ (290–630 + 2.4–3.3 + 1.0–1.8) m² per MW, a range (no midpoint); programs share × allowed floor = the programs\' space budget; rooms with no size source are not counted (?)',
      inputs=['envelope', 'arch_dc_hall', 'arch_dc_electrical', 'arch_dc_battery', 'arch_space_budget'],
      coef='J.B., 2 Nov 2026: the ratio splits floor area (all storeys), not footprint; the data centre\'s share sets its MW (J.B., 3 Nov 2026); Arrange tests one end of the MW range, chosen by the user (low end by default: the size the share holds even at 630 m² per MW); a coverage limit is in the register only for I-2 (none); every other zone shows ?',
      sources=have(['van_zdb_i2', 'van_zdb_i3', 'edm_bl20001']), conf=55, status='in hand (our arithmetic on sourced figures)', stage='size'),
]
ids = {q['id']: i for i, q in enumerate(d['quantities'])}
for q in Q:
    if q['id'] in ids: d['quantities'][ids[q['id']]] = q
    else: d['quantities'].append(q)
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('new sources', n, 'quantities', len(Q))
