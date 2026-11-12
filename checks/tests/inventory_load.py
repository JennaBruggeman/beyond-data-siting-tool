"""Resident step 0 (J.B. 12 Nov 2026): the data-centre inventory into the tool (tool/data/facilities.json).

Reads checks/research_arch_v1/inv_van.md and inv_edm.md (research pass 2-3 Nov 2026, check 2 applied) and the main chat's
12 Nov file of addresses and published floors (Claude Link RESIDENT_addresses_floors_2026-11-12.md, folded in below by hand).
Every cell is kept as the inventory words it, with its labels (OC operator claim, GOV, BRK broker claim, ENG, OBS J.B. site visit,
DIR directory listing, "?"). Added here, each marked:
  - type for the Resident schematic (J.B. 11 Nov): (a) -> inside a tower; (b), (c) -> stand-alone; "fenced site" only where a source says so;
    "a ?" and the like -> type not confirmed;
  - one size figure per facility for the report's chart (spec sheet first; operator figures labelled as claims; differing figures kept as a range);
  - floors only where a source names them (12 Nov file); never inferred;
  - Vancouver: the parcel found by the address in the City's records (tool/tiles/van/s_*.tsv, the tool's own search), "placed by address,
    our method"; Edmonton: the City permit geocode the inventory gives (no lot ids: Edmonton lot geometry is licensed);
  - rows outside the tool's two city maps (Burnaby, Coquitlam, UBC; Edmonton region) listed with inMap false.
Run from the repo root: python checks/tests/inventory_load.py   (writes tool/data/facilities.json; prints the counts)."""
import json, re, glob, os, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
INV = R / 'checks/research_arch_v1'

def table(md, ncol):
    rows = []
    for l in open(md, encoding='utf-8'):
        if not l.startswith('| ') or l.startswith('| #') or l.startswith('|---'): continue
        c = [x.strip() for x in l.strip().strip('|').split(' | ')]
        if len(c) >= ncol and re.match(r'^E?\d+$', c[0]): rows.append(c)
    return rows

IDRE = re.compile(r'\b((?:arch_[A-Za-z0-9_]+)|cologixVAN\w+|tourVAN3|estruxtureVAN1ds|hut8\w+|van_rts19744|vanRR1_2026|spencerBldg|quEDM\w+|fieldJB|yegixStatus|edmPermits\w*|edmLDA26|edm_dcpage|aesoList|aesoLargeLoad|aesoDCupd2025|alta117_2026|edm20001|vanixFacilities|atlasCloud)\b')
ids = lambda t: sorted(set(IDRE.findall(t or '')))
def kind(t):
    for k, lab in (('OBS', 'J.B. site visit'), ('GOV', 'government record'), ('PERMIT', 'City permit'), ('REG', 'regulator record'), ('BRK', 'broker claim'), ('ENG', 'engineer’s project sheet'), ('OC', 'operator claim'), ('DIR', 'directory listing'), ('LEAD', 'lead only')):
        if re.search(r'\b' + k + r'\b', t or ''): return lab
    return None
KEYS = ('closed', 'operating', 'permitted', 'use approved', 'approved', 'announced', 'proposed', 'rezoning')
def status_class(t):
    t = (t or '').lower().lstrip()
    for k in KEYS:   # the status word the inventory leads with
        if t.startswith(k): return k
    if t.startswith('power plant approved'): return 'plant approved'
    if t.startswith('?'): return '?'
    for k in KEYS:
        if k in t[:40]: return k
    return '?'

# ---------------- Vancouver ----------------
van = table(INV / 'inv_van.md', 11)
VAN_ADDR = {1: '555 HASTINGS ST W', 2: '555 HASTINGS ST W', 3: '555 HASTINGS ST W', 4: '555 HASTINGS ST W', 5: '515 HASTINGS ST W', 6: '1050 PENDER ST W',
            7: '175 CORDOVA ST W', 8: '900 HASTINGS ST W', 9: '701 GEORGIA ST W', 11: '333 TERMINAL AVE', 12: '369 TERMINAL AVE', 13: '308 5TH AVE E',
            14: '2828 NATAL ST', 15: '2772 NATAL ST', 16: '3438 LOUGHEED HWY', 17: '111 5TH AVE E', 18: '150 GEORGIA ST W'}
VAN_OUT = {20: 'Burnaby', 21: 'Burnaby', 22: 'Burnaby', 23: 'Burnaby', 24: 'Coquitlam', 25: 'UBC (Electoral Area A)'}
shards = {}
def parcel(a):
    k = a[0] if a[0].isdigit() else 'x'
    if k not in shards:
        f = R / f'tool/tiles/van/s_{k}.tsv'; shards[k] = [l.rstrip('\n').split('\t') for l in open(f, encoding='utf-8')] if f.exists() else []
    for r in shards[k]:
        if len(r) >= 3 and r[0] == a: return {'tile': r[1], 'id': r[2]}
    return None
VAN_NOTE = {
    8: ('900 W Hastings St', 'address from the operator’s page and FAQ (OC arch_inv_hut8VaultWeb; main chat 12 Nov 2026: the vault page’s 1700-666 Burrard is not repeated on the current page, dropped)'),
    9: ('701 W Georgia St', 'address from a directory listing (DIR arch_inv3_dcmapRackforce; the operator’s current page gives none; main chat 12 Nov 2026)'),
    10: (None, 'address 55 E 7th Ave is not in the City’s address records the tool searches (?): listed, not placed'),
    15: ('3448 Cornett Rd (City records: 2772 Natal St)', 'placed at 2772 Natal St, the address the inventory gives as its former one'),
    19: (None, 'address not confirmed: the BCUC order puts the data centre “in a building adjacent to the Project site” (the TELUS Garden block); no source names the building (main chat 12 Nov 2026)'),
}
TYPE_VAN = {}
for c in van:
    t = c[10].strip()
    TYPE_VAN[int(c[0])] = 'tower' if t == 'a' else 'standalone' if t in ('b', 'c') else '?'
FENCED = {('van', 14): ('J.B. saw a fence and gate', ['fieldJB', 'tourVAN3']), ('van', 20): ('“Perimeter secured by 10’ fence” (operator claim)', ['arch_inv_estruxVan3Sheet']),
          ('edm', 2): ('palisade gate (J.B. site visit)', ['fieldJB'])}
FLOORS = {('van', 1): ([9], 'floor 9, unit 985 (GOV BP-2018-06132; the permit names no operator, tied to VAN1 by “dry cooler (985)”: our reading)', ['vanPermits']),
          ('van', 3): ([26], 'suite 2605, floor 26 (OC); the operator says 2 floors: the second is not published', ['arch_sec2_estruxVan2']),
          ('van', 5): ([6, 8, 9], 'floors 6, 8, 9 (GOV permit BP-2022-05512; BRK)', ['vanPermits', 'arch_inv_jllSpencer2023']),
          ('van', 6): ([2], '2nd floor (OC spec sheet)', ['cologixVAN2fr']),
          ('van', 8): (['basement'], '2 basement units (GOV BP-2018-03485, TeraGo “Data Center”)', ['vanPermits', 'arch_inv_hut8VaultWeb']),
          ('edm', 3): ([3], 'suite 303, 3rd floor (GOV 2023 permit)', ['arch_inv_edmPermitRows']),
          ('edm', 7): (['P1'], 'P1 level, below grade (City permit 2011)', ['arch_inv_edmPermitRows']),
          ('edm', 1): ([3], '3rd floor: our reading from the permit unit number (Powerhouse unit 302G, 2019)', ['arch_inv_edmPermitRows'])}
# one size figure (spec sheet first; claims labelled; differing operator figures as a range)
SIZE = {('van', 1): ([0.4, 0.52], 'site capacity', 'operator claim: 400 kW on the Apr 2026 sheet, 520 kW on the web page'),
        ('van', 2): ([1.6, 1.6], 'capacity', 'operator claim (the “6.23 MW site capacity” may be the whole building: not used)'),
        ('van', 3): ([2.14, 2.14], 'critical IT', 'operator claim'), ('van', 5): ([5, 5], 'critical IT', 'broker claim (2 halls × 2.5 MW)'),
        ('van', 6): ([2, 2], 'site capacity', 'operator claim'), ('van', 7): ([4, 6.5], 'site capacity', 'operator claim: 4 MW (2021 release) and 6.5 MW (web page, 2 Nov 2026) differ'),
        ('van', 8): ([0.693, 0.693], 'IT', 'operator claim (1 MW design)'), ('van', 9): ([0.329, 0.329], 'IT', 'operator claim (0.6 MW design)'),
        ('van', 10): ([2.4, 2.4], 'critical IT', 'spec sheet (operator)'), ('van', 12): ([2, 2], 'initial', 'operator claim'),
        ('van', 14): ([5, 5], 'site capacity', 'operator claim'), ('van', 17): ([40, 40], 'up to', 'applicant figure in a City report (GOV)'),
        ('van', 20): ([10, 10], 'total', 'spec sheet (operator); the web page says 13 MW'),
        ('edm', 1): ([1, 2.5], 'capacity', 'operator claims differ: 1 MW (FAQ), 2.5 MW (listing)'),
        ('edm', 2): ([2.5, 3], 'capacity', 'spec sheet (operator): 2.5 MW Tier II, 3 MW Tier III; the web page says 8 MW design'),
        ('edm', 12): ([970, 970], 'grid allocation, phase 1', 'provincial government relaying the operator'),
        ('edm', 13): ([800, 800], 'to data halls', 'applicant figure in a regulator filing'), ('edm', 14): ([230, 230], 'phase 1', 'operator claim'),
        ('edm', 15): ([401, 401], 'requested from the grid', 'AESO connection list'), ('edm', 16): ([1500, 1500], 'up to', 'operator claim'),
        ('edm', 17): ([400, 400], 'requested from the grid', 'AESO connection list'), ('edm', 19): ([3600, 3600], 'requested from the grid', 'AESO connection list'),
        ('edm', 20): ([74.9, 74.9], 'requested from the grid', 'AESO connection list')}

def common(city, n, name_op, addr, st, bld, size, cool, heat, serves, opened, typ_raw):
    name, _, op = name_op.partition(' · ')
    f = {'id': f'{city}{n}', 'n': n, 'city': city, 'name': name.strip(), 'operator': op.strip() or None, 'addrText': addr,
         'status': status_class(st), 'statusText': st, 'building': bld, 'sizeText': size, 'cooling': cool, 'heat': heat, 'serves': serves,
         'opened': None if opened.strip() in ('?', '—', '') else opened, 'typeRaw': typ_raw}
    k = (city, n)
    tr = typ_raw.strip(); m = re.match(r'^([abc])(?: \(([^)?]*)\))?$', tr)   # 'a', 'c (rural campus)', 'a (low-rise)'; anything with '?' -> not confirmed
    f['type'] = {'a': 'tower', 'b': 'standalone', 'c': 'standalone'}[m.group(1)] if m else '?'
    if m and m.group(2): f['typeNote'] = m.group(2)
    if k in FENCED: f['fenced'] = {'text': FENCED[k][0], 'src': FENCED[k][1]}
    if k in FLOORS: f['floors'] = {'list': FLOORS[k][0], 'text': FLOORS[k][1], 'src': FLOORS[k][2]}
    elif f['type'] == 'tower': f['floors'] = {'list': [], 'text': 'floors not published'}
    if k in SIZE: v, sc, lab = SIZE[k]; f['size'] = {'mw': v, 'scope': sc, 'label': lab, 'src': ids(size) or ids(st) or (['aesoList'] if 'AESO' in size + st else [])}
    allt = ' '.join([name_op, addr, st, bld, size, cool, heat, serves, opened]); extra = set()
    if city == 'edm' and (re.search(r'\bPERMIT\b', allt) or re.search(r'5\d\.\d+,', addr)): extra.add('arch_inv_edmPermitRows')   # 'PERMIT' rows and the permit geocode
    if re.search(r'\bOBS\b', allt): extra.add('fieldJB')
    if re.search(r'\bAESO\b', allt): extra.add('aesoList')
    if city == 'van' and re.search(r'BP-20|DB-20|sources/11', allt): extra.add('vanPermits')
    if city == 'edm' and re.search(r'16 Oct 2026 export', allt): extra.add('arch_inv_edmPermitRows')
    if re.search(r'\bLEAD\b', allt): extra.add('arch_inv_leadDirectory')
    if 'Beacon' in name_op and 'OC 2025' in allt: extra.add('arch_inv_beaconRelease2025')
    f['src'] = sorted(set(ids(allt)) | extra)
    return f

out = {'van': [], 'edm': []}
for c in van:
    n = int(c[0]); f = common('van', n, *c[1:11])
    if n in VAN_OUT: f.update(inMap=False, where=VAN_OUT[n], addr=re.sub(r'\s*\(.*$', '', c[2]))
    else:
        f['inMap'] = True; a = VAN_ADDR.get(n); note = VAN_NOTE.get(n)
        f['addr'] = (note and note[0]) or (a.title().replace(' W', ' W').replace('St W', 'St W') if a else None)
        if note: f['addrNote'] = note[1]
        f['parcel'] = parcel(a) if a else None
        if f['parcel']: f['placed'] = 'placed by address in the City’s records (our method)'
        if not f['parcel']: f['inMap'] = n not in (10, 19) and f['inMap']
    out['van'].append(f)

# ---------------- Edmonton ----------------
edm = table(INV / 'inv_edm.md', 12)
EDM_IN = {1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 20, 21}   # inside the City of Edmonton (inventory addresses); the rest are regional
for c in edm:
    n = int(c[0][1:]); f = common('edm', n, c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[11])
    f['permitNotes'] = c[10]
    m = re.search(r'(5\d\.\d+),\s*[−-](11\d\.\d+)', c[2])
    f['xy'] = [float(m.group(1)), -float(m.group(2))] if m else None
    f['inMap'] = n in EDM_IN and f['xy'] is not None
    if n in EDM_IN and not f['xy']: f['addrNote'] = 'address or location not confirmed (?): listed, not placed'
    if n not in EDM_IN: f['where'] = 'outside the City of Edmonton (region)'
    f['addr'] = re.sub(r'\s*·.*$', '', c[2]).strip()
    if f['xy']: f['placed'] = 'City permit geocode (arch_inv_edmPermitRows)'
    if n in (1, 2): f['alsoTenant'] = 'also Wolfpaw (directory listing: DIR arch_inv3_dcmapWolfpawEdm2; main chat 12 Nov 2026)'
    out['edm'].append(f)

doc = {'_about': 'Data-centre inventory for the Resident template (Resident step 0, J.B. 12 Nov 2026), from checks/research_arch_v1/inv_van.md and inv_edm.md '
                  '(research 2–3 Nov 2026, check 2) and the main chat’s 12 Nov addresses and floors. Built by checks/tests/inventory_load.py; register part resident_facilities. '
                  'Cells as the inventory words them, with their labels; type, one size figure, floors and placement added as marked there.', **out}
p = R / 'tool/data/facilities.json'; p.write_text(json.dumps(doc, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')

# ---------------- counts ----------------
for city in ('van', 'edm'):
    L = out[city]; ins = [f for f in L if f['inMap']]
    st = {}; [st.__setitem__(f['status'], st.get(f['status'], 0) + 1) for f in L]
    ty = {}; [ty.__setitem__(f['type'], ty.get(f['type'], 0) + 1) for f in L]
    print(city, len(L), 'rows | on the map', len(ins), '| not placed in the city', len([f for f in L if not f['inMap'] and not f.get('where')]), '| outside the map', len([f for f in L if f.get('where')]))
    print('  status', st, '| type', ty)
    for fld in ('addr', 'operator', 'statusText', 'building', 'sizeText', 'cooling', 'heat', 'serves', 'opened', 'size', 'floors', 'fenced'):
        n = len([f for f in L if f.get(fld) and str(f.get(fld)).strip() not in ('?', 'None')]); print(f'  {fld}: {n}', end='')
    print()
    print('  not placed:', [(f['id'], f['name']) for f in L if not f['inMap'] and not f.get('where')])
