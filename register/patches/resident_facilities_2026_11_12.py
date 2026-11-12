"""12 Nov 2026 (J.B.: milestone 1, Resident step 0): the data-centre inventory as a register part, resident_facilities, with its sources.
Sources: the inventory research pass (checks/research_arch_v1/inv_van_sources.json, inv_edm_sources.json; 2-3 Nov 2026, check 2 applied 3 Nov)
and two directory listings from the main chat's 12 Nov file of addresses and floors (Claude Link RESIDENT_addresses_floors_2026-11-12.md).
The data file is tool/data/facilities.json (checks/tests/inventory_load.py). Idempotent."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
S = d['new_sources']; SC = d['meta'].setdefault('source_check', {})
added = 0
for f in ('inv_van_sources.json', 'inv_edm_sources.json'):
    src = json.loads((R / 'checks/research_arch_v1' / f).read_text(encoding='utf-8'))
    for k, v in src.items():
        if k.startswith('_'): continue
        if k not in S: S[k] = v; added += 1
        SC.setdefault(k, 'inventory research pass 2-3 Nov 2026, check 2 applied 3 Nov 2026 (checks/research_arch_v1/' + f + ')')
NEW = {
 'arch_inv3_dcmapRackforce': 'DIRECTORY LISTING (third-party, lowest trust; proxy 40): Data Center Map, RackForce Networks, Vancouver (datacentermap.com/canada/vancouver/rackforce-networks/): 701 W Georgia St (V7Y postal code). Used only for Hut 8 Vancouver (VAN2, ex-RackForce/TeraGo): the operator\'s current page gives no address. Main chat, 12 Nov 2026.',
 'arch_inv3_dcmapWolfpawEdm2': 'DIRECTORY LISTING (third-party, lowest trust; proxy 40): Data Center Map, Wolfpaw EDM2 and EDM3, Edmonton: 10200 102 Ave NW and 17204 114 Ave NW, the buildings of inventory rows E1 and E2 (tenants there, not new facilities). Main chat, 12 Nov 2026.',
}
for k, v in NEW.items():
    if k not in S: S[k] = v; added += 1
    SC.setdefault(k, 'main chat, read 12 Nov 2026 (Claude Link RESIDENT_addresses_floors_2026-11-12.md)')
SC.setdefault('atlasCloud', 'inventory research pass 2-3 Nov 2026, cited in checks/research_arch_v1/inv_van.md row 13 (operator claim, 16 racks)')
fac = json.loads((R / 'tool/data/facilities.json').read_text(encoding='utf-8'))
used = sorted({s for c in ('van', 'edm') for f in fac[c] for s in f['src'] + (f.get('size') or {}).get('src', []) + (f.get('floors') or {}).get('src', []) + (f.get('fenced') or {}).get('src', [])} | set(NEW))
missing = [s for s in used if s not in S and s not in d.get('old_sources', {})]
Q = {'id': 'resident_facilities', 'name': 'Data centres on record (Resident inventory)', 'stage': 'input', 'direction': 'place', 'unit': 'facility list',
     'formula': 'each facility as the inventory gives it (name, operator, status, building, size, cooling and power, heat reuse, who it serves, opened), with its labels; '
                'type for the schematic: inside a tower / stand-alone ("fenced site" only where a source says so) / not confirmed; floors only where a source names them; '
                'one size figure per facility (spec sheet first; operator figures labelled; differing figures as a range); Vancouver placed by address in the City\'s records '
                '(our method), Edmonton by the City permit geocode; rows outside the two city maps listed, not placed',
     'inputs': ['parcel'], 'coef': 'Vancouver 25 rows (17 on the map), Edmonton region 21 rows (9 on the map); research 2-3 Nov 2026 (check 2), addresses and floors 12 Nov 2026',
     'sources': [s for s in used if s not in missing], 'conf': 40,
     'status': 'operator claims (50) and two directory addresses (40, labelled); government and permit records 80-90; J.B. site visits labelled'}
qs = d['quantities']; old = next((x for x in qs if x['id'] == 'resident_facilities'), None)
if old: old.update(Q)
else: qs.append(Q)
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('resident_facilities: sources added', added, '| cited', len(Q['sources']), '| ids not in the register (left out, listed):', missing)
