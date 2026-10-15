#!/usr/bin/env python3
"""Precedent catalogue for checking the tool's size chain.

In:  bench/raw/bench_{ukie,world,ca,us}.json — facts gathered 15 Oct 2026 by four research passes
     (each fact: value, what it measures, verbatim quote, URL, page, evidence type), plus cases already
     in sources/16 and sources/17 added below by hand.
Out: bench/benchmarks.json — every site and fact, a headline pair per site, a tier, and the ratios
     the tool's coefficients are checked against (bench/test_size_chain.py).

Tiers
  benchmark  IT (or critical IT) MW and gross floor area for the same building or campus, both from a
             public record or an applicant's filed document. Used by the tests.
  reference  The same pair, but at least one figure is an operator claim, or the scope or figure is in doubt.
             Shown, and summarised separately; not used to pass or fail a test.
  context    MW is total power, grid capacity or undefined, or no MW at all. Kept for storeys, heights,
             floor-to-floor and white-space shares.
Nothing here is converted except ft² → m² (×0.092903) and acres → m² (×4,046.856), done by the research pass
and shown next to the original."""
import json, os, statistics as st
H = os.path.dirname(os.path.abspath(__file__))
sites = []
REG = {'ukie': 'UK and Ireland', 'world': 'Australia, Europe, Asia', 'ca': 'Canada', 'us': 'United States',
       '2_us': 'United States', '2_eu': 'UK and Ireland', '2_ca': 'Canada', '2_ap': 'Australia, Europe, Asia'}
DUP = {'van-111-e-5th-rr2026': 'van-111-e-5th'}  # round 2 re-found a site: its facts join the existing entry
for f in ['ukie', 'world', 'ca', 'us', '2_us', '2_eu', '2_ca', '2_ap']:
    fn = f'bench_{f}.json' if not f.startswith('2_') else f'bench2_{f[2:]}.json'
    for s in json.load(open(os.path.join(H, 'raw', fn), encoding='utf-8')):
        s['region'] = REG[f]; s['round'] = 2 if f.startswith('2_') else 1
        if s.get('country') in ('France', 'Germany', 'Netherlands', 'Finland') and f == '2_eu': s['region'] = 'Australia, Europe, Asia'
        if s['id'] in DUP:
            t = next(x for x in sites if x['id'] == DUP[s['id']]); t['facts'] += s['facts']; t['notes'] = (t.get('notes') or '') + ' Round 2: ' + (s.get('notes') or ''); continue
        sites.append(s)

# cases already in sources/16 (C5, C10) and the floor-height addendum, not re-gathered by the research passes
H16 = 'sources/16_dc_components_sizing.md'
def F(field, value, unit, measures, quote, url, where, evidence):
    return dict(field=field, value=value, unit=unit, measures=measures, quote=quote, url=url, where=where, evidence=evidence)
ARK = 'https://modgov.hillingdon.gov.uk/documents/s64459/739%20REPORT.pdf'
BUR = 'https://www.burlington.ca/en/news/resources/Current-Development-Projects/Ward-4/3110-South-Service/Supporting-Documents/Architectural%20Plans%20-%202026-06-20.pdf'
HK480 = 'https://www.tpb.gov.hk/uploads/page/meetings/MPC/A_KC_480/A_KC_480_MainPaper.pdf'
HK510 = 'https://www.tpb.gov.hk/uploads/page/meetings/20251010/A_KC_510_MainPaper.pdf'
sites += [
 dict(id='ark-up4-hillingdon', name='Ark UP4, Union Park', operator='Ark Data Centres', address='Union Park, Hayes', city='London (Hillingdon)', country='UK', status='approved', year='2025 (committee 4 Sep 2025)', region='UK and Ireland',
      facts=[F('it_mw', 28, 'MW', 'IT load', '28 MW IT', ARK, 'committee report (see ' + H16 + ' C10)', 'public record'),
             F('grid_mva', 37, 'MVA', 'grid connection', '37 MVA', ARK, 'committee report', 'public record'),
             F('gfa_m2', 15410, 'm2', 'GIA across UP4/EC4/AB5 (para 7.3 says 18,898 m²)', '15,410 m² GIA', ARK, 'committee report', 'public record'),
             F('height_m', 32.8, 'm', 'building height', '32.8 m', ARK, 'committee report', 'public record'),
             F('other', 'halls on floors 2–4', '', 'arrangement', 'halls on floors 2–4', ARK, 'committee report', 'public record')],
      notes='Logged 14 Oct 2026 from the committee report; quotes are the earlier pass\'s extracts, not re-fetched 15 Oct. Two GIA figures in the report (15,410 and 18,898 m²).'),
 dict(id='burlington-3110-south-service', name='3110 South Service Rd', operator='not stated', address='3110 South Service Rd', city='Burlington ON', country='Canada', status='proposed', year='2026', region='Canada',
      facts=[F('gfa_m2', 5163, 'm2', 'stated GFA (floor labels sum to ≈7,770 m²; the plan set conflicts)', 'GFA "5163 m2"', BUR, 'architectural plans 20 Jun 2026', 'applicant claim'),
             F('white_space_m2', 3710, 'm2', 'data halls 1,650 + 2,060 m²', 'halls 1,650 + 2,060', BUR, 'plans', 'applicant claim'),
             F('storeys', '2 + lower level', '', 'storeys', '2 storeys + lower level', BUR, 'plans', 'applicant claim'),
             F('floor_to_floor_m', 6.0, 'm', '2nd floor above 1st', "19'-8¼\"", BUR, 'plans, section', 'applicant claim')],
      notes='No MW in any municipal document found. Hall share 48% or 72% depending on which GFA is right.'),
 dict(id='hk-a-kc-480', name='45-51 Tai Lin Pai Road (A/KC/480)', operator='not stated', address='45-51 Tai Lin Pai Rd, Kwai Chung', city='Hong Kong', country='Hong Kong', status='unknown', year='', region='Australia, Europe, Asia',
      facts=[F('floor_to_floor_m', 6.0, 'm', 'typical data-centre floor', 'requires a floor-to-floor height of 6m to meet the operational need', HK480, 'para 11.4', 'applicant claim'),
             F('storeys', 22, '', 'incl. 2 basement levels', '22 storeys', HK480, 'para 1.1', 'public record'),
             F('gfa_m2', 24954.6, 'm2', 'non-domestic GFA (max)', '24,954.6m²', HK480, 'section 1.5', 'public record'),
             F('site_area_m2', 2189, 'm2', 'site area', 'about 2,189m²', HK480, 'section 1.5', 'public record')], notes='No MW stated.'),
 dict(id='hk-a-kc-510', name='KCTL 145 (A/KC/510B)', operator='not stated', address='Kwai Chung Town Lot 145', city='Hong Kong', country='Hong Kong', status='unknown', year='2025', region='Australia, Europe, Asia',
      facts=[F('floor_to_floor_m', 5.5, 'm', 'data hall and M&E floors, 4/F and above', '4/F and above: data hall and M&E, 5.5m', HK510, 'para 1.6', 'public record'),
             F('storeys', 19, '', 'incl. 2 basement levels', '19 storeys', HK510, 'para 1.6', 'public record'),
             F('gfa_m2', 10991.88, 'm2', 'non-domestic GFA', 'about 10,991.88m²', HK510, 'para 1.6', 'public record'),
             F('site_area_m2', 964, 'm2', 'site area', 'about 964m²', HK510, 'para 1.1', 'public record')], notes='No MW stated.'),
]

# headline pair per site: (MW, basis, area m², area basis, scope, tier, note)
HL = {
 'sequoia-santa-clara':        (67.5, 'IT', 65353, 'gross', 'building', 'benchmark', 'Same report also gives 702,114 ft² gross.'),
 'martin-santa-clara':         (64, 'IT', 43495, 'gross', 'building', 'benchmark', ''),
 'ca3-vantage-santa-clara':    (64, 'IT', 43479, 'gross', 'building', 'benchmark', 'Report also calls the whole 468,000 ft² "data hall space" — loose wording.'),
 'coresite-sv9-santa-clara':   (35, 'IT', 23226, 'gross', 'building', 'benchmark', '"critical load"; 48 MW utility connection.'),
 'memorex-santa-clara':        (60, 'IT', 43936, 'gross', 'building', 'benchmark', 'Area is the data-centre portion only.'),
 'sj04-microsoft-san-jose':    (76.8, 'IT', 58608, 'gross', 'campus', 'benchmark', 'Area = 2 × 29,304 m² per building (Claude\'s arithmetic). Applicant\'s figures, still under review.'),
 'slough-manor-farm':          (72, 'IT', 36368, 'gross', 'building', 'benchmark', '"around 72 MW" — appellant\'s design figure. GIA. Appeal allowed Jun 2026.'),
 'iver-woodlands-park':        (147, 'IT', 163000, 'gross', 'campus', 'benchmark', 'GEA "up to"; 3 buildings; appeal refused. Para 32 mentions 2,240 MW, unexplained.'),
 'cloudhq-offenbach-laemmerspieler-weg': (112, 'IT', 108000, 'gross', 'campus', 'benchmark', 'City page read only in machine translation; operator gives 108,371 m².'),
 'ark-up4-hillingdon':         (28, 'IT', 15410, 'gross', 'campus', 'benchmark', 'GIA; report also gives 18,898 m².'),
 'globalswitch-house-e14':     (74, 'IT', 69829, 'gross', 'building', 'reference', 'Area = 63,541 existing + 6,288 new GIA (Claude\'s sum). Report does not say whether 74 MW is the whole building.'),
 'lafayette-santa-clara':      (66, 'IT', 53456, 'gross', 'building', 'reference', '66 MW not re-found when Claude re-checked the report on 15 Oct (only 99.8 MW maximum load). Moved to reference until checked.'),
 'van-111-e-5th':              (40, 'unclear', 11622.6, 'gross', 'building', 'reference', '"anticipated load of up to 40 MW" (applicant, via staff report); not stated as IT. Floor area is the staff FSR estimate.'),
 'vantage-qc1':                (11, 'IT', 5574.2, 'gross', 'building', 'reference', 'Operator claims.'),
 'vantage-qc4':                (50, 'IT', 29729, 'gross', 'campus', 'reference', 'Operator claims.'),
 'vantage-qc2':                (86, 'IT', 85935.3, 'gross', 'campus', 'reference', 'Operator claims.'),
 'qscale-q01':                 (114, 'IT', 86399.8, 'gross', 'campus', 'reference', 'Operator claims, campus.'),
 'estruxture-van1':            (2.4, 'IT', 929.0, 'gross', 'building', 'reference', 'Operator claims; 3 floors of office and infrastructure.'),
 'hut8-vancouver-vault':       (0.693, 'IT', 576.9, 'gross', 'building', 'reference', 'Operator claims; in an existing building.'),
 'nextdc-s3-artarmon':         (80, 'IT', 30703, 'gross', 'building', 'reference', 'MW is the operator\'s; GFA is the council\'s and excludes plant.'),
 'telehouse-south':            (18, 'IT', 31000, 'gross', 'building', 'reference', 'Operator documents conflict (15 MW / 31,999 m² in 2020).'),
 'estruxture-van2':            (2.14, 'unclear', 1347.1, 'gross', 'building', 'context', 'Web page says critical IT; datasheet says total.'),
 'estruxture-cal1':            (9, 'total', 6038.7, 'gross', 'building', 'context', '"total power".'),
 'colt-les-ulis-dh10plus':     (12.8, 'IT', 7590, 'gross', 'building', 'benchmark', 'French "surface de plancher"; the architect\'s notice gives 7,761 m². Data halls and electrical rooms on R+1 and R+2. Suburban business park.'),
 'colovore-3060-raymond':      (6, 'unclear', 2268.9, 'gross', 'building', 'reference', '"critical load of six MW" and "an estimated maximum of 6 MW" for the facility are the same figure, so it may be total load, not IT. Conversion of a two-storey industrial building.'),
 'vantage-lhr12-chandos-rd-ph2': (30, 'unclear', 16362, 'gross', 'building', 'reference', '"data centre capacity", not stated as IT; 5 MW per data-hall floor, six floors. A separate 8,827 m² GIA generator building is not counted.'),
 'microsoft-dub06-grange-castle': (17.6, 'unclear', 21350, 'gross', 'building', 'reference', '"data capacity" (applicant); the document\'s totals conflict.'),
 'hk-sunevision-mega-fanling': (10, 'IT', 12006.8, 'gross', 'building', 'reference', 'Operator filing. Area is the warehouse at lease, before conversion.'),
 'sf-365-main':                (8.6, 'IT', 21089, 'gross', 'building', 'reference', 'Operator factsheet read from an aggregator\'s copy; unverified until read on Digital Realty\'s own site. Conversion of an industrial building.'),
 'chicago-400-s-lasalle':      (22, 'IT', 27917.4, 'gross', 'building', 'reference', 'Operator flyer read from an aggregator\'s copy; unverified. Office conversion.'),
 'tor-uoft-mclennan-dc':       (0.35, 'IT', 450, 'gross', 'room', 'reference', 'A server room inside a teaching building (university governance report). Room scale.'),
 'bou-estruxture-mtl3':        (1, 'IT', 1858.1, 'gross', 'building', 'reference', 'Operator datasheet also gives 8,200 ft².'),
 'nextdc-s4-horsley-park':     (294, 'total', 61695, 'gross', 'building', 'context', '"maximum power capacity"; operator site says 365 MW IT.'),
}
TOL = 'Claude re-fetched this quote on 15 Oct 2026 and it matched.'
RECHECK = {('sequoia-santa-clara', 'it_mw'), ('sequoia-santa-clara', 'gfa_m2'), ('martin-santa-clara', 'it_mw'), ('martin-santa-clara', 'gfa_m2'),
           ('ca3-vantage-santa-clara', 'it_mw'), ('ca3-vantage-santa-clara', 'gfa_m2'), ('coresite-sv9-santa-clara', 'it_mw'), ('coresite-sv9-santa-clara', 'gfa_m2'),
           ('slough-manor-farm', 'it_mw'), ('slough-manor-farm', 'gfa_m2'), ('iver-woodlands-park', 'it_mw'), ('iver-woodlands-park', 'gfa_m2'),
           ('globalswitch-house-e14', 'it_mw'), ('globalswitch-house-e14', 'gfa_m2'), ('globalswitch-house-e14', 'storeys'), ('lafayette-santa-clara', 'gfa_m2')}
NOTFOUND = {('lafayette-santa-clara', 'it_mw')}
RECHECK |= {('colt-les-ulis-dh10plus', 'it_mw'), ('colt-les-ulis-dh10plus', 'gfa_m2'), ('colovore-3060-raymond', 'it_mw'), ('colovore-3060-raymond', 'gfa_m2'),
            ('colovore-3060-raymond', 'storeys'), ('vantage-lhr12-chandos-rd-ph2', 'it_mw'), ('vantage-lhr12-chandos-rd-ph2', 'gfa_m2'), ('vantage-lhr12-chandos-rd-ph2', 'storeys')}

for s in sites:
    for i, x in enumerate(s['facts']):
        x['fid'] = f"{s['id']}#{i}"
        k = (s['id'], x['field'])
        x['claude_check'] = 'matched' if k in RECHECK else ('not re-found' if k in NOTFOUND else 'not re-checked')
        if 'value_m2' not in x and x['field'] in ('gfa_m2', 'white_space_m2', 'site_area_m2') and isinstance(x['value'], (int, float)):
            x['value_m2'] = x['value']
    hl = HL.get(s['id'])
    if hl:
        mw, b, a, ab, sc, tier, note = hl
        s['headline'] = dict(mw=mw, mw_basis=b, area_m2=a, area_basis=ab, scope=sc, note=note, m2_per_mw=round(a / mw))
        s['tier'] = tier
    else:
        s['tier'] = 'context'
        s['headline'] = None

# white-space shares: white ÷ gross from the same document set (first figure of each kind)
def first(s, fld):
    for x in s['facts']:
        if x['field'] == fld and isinstance(x.get('value_m2', x['value']), (int, float)):
            return x.get('value_m2', x['value'])
SHARE_SKIP = {'qscale-q01', 'kao-harlow-campus', 'qu-edm2', 'sg-equinix-sg4-7-tai-seng', 'bby-6700-southridge', 'lbnl-crt', 'ncar-nwsc'}  # campus or phase mismatch; mixed office or research buildings
shares = []
for s in sites:
    w, g = first(s, 'white_space_m2'), first(s, 'gfa_m2')
    if w and g and s['id'] not in SHARE_SKIP and w <= g:
        shares.append(dict(id=s['id'], share=round(w / g, 3)))
        s['white_share'] = round(w / g, 3)
# white space per IT MW (operator figures; IT basis only)
WHITE_IT = {'virtus-london4-slough', 'virtus-london5-stockley', 'virtus-london12-slough', 'virtus-london11-slough', 'virtus-london3-slough',
            'virtus-london10-slough', 'virtus-london1-enfield', 'estruxture-van1', 'hut8-vancouver-vault', 'qscale-q01', 'nextdc-s3-artarmon'}
white_per = []
for s in sites:
    if s['id'] in WHITE_IT:
        w = first(s, 'white_space_m2'); mw = s['headline']['mw'] if s.get('headline') else next(x['value'] for x in s['facts'] if x['field'] == 'it_mw')
        white_per.append(dict(id=s['id'], m2_per_mw=round(w / mw)))
        s['white_per_mw'] = round(w / mw)

def summ(v, d=0):
    v = sorted(v); q = st.quantiles(v, n=4) if len(v) >= 4 else [v[0], st.median(v), v[-1]]
    r = lambda x: round(x, d) if d else round(x)
    return dict(n=len(v), min=v[0], p25=r(q[0]), median=r(st.median(v)), p75=r(q[2]), max=v[-1])
bm = [s['headline']['m2_per_mw'] for s in sites if s['tier'] == 'benchmark']
rf = [s['headline']['m2_per_mw'] for s in sites if s['tier'] == 'reference' and s['headline']['mw_basis'] == 'IT']
ftf = [dict(id=s['id'], m=x['value']) for s in sites for x in s['facts'] if x['field'] == 'floor_to_floor_m' and isinstance(x['value'], (int, float))]
out = dict(meta=dict(date='2026-10-15', note=__doc__.split('\n\n')[0], tiers={'benchmark': 'IT MW + gross area, public or filed record', 'reference': 'same pair, operator claim or doubt', 'context': 'no usable IT MW + area pair'}),
           summary=dict(gross_per_it_mw_benchmark=summ(bm), gross_per_it_mw_reference=summ(rf), white_share=summ([x['share'] for x in shares], 3),
                        white_per_it_mw=summ([x['m2_per_mw'] for x in white_per]), floor_to_floor=ftf),
           sites=sites)
json.dump(out, open(os.path.join(H, 'benchmarks.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(json.dumps(out['summary'], indent=1))
from collections import Counter
print(Counter(s['tier'] for s in sites), 'facts', sum(len(s['facts']) for s in sites))
