"""Add SFPUC Onsite Water Reuse (district-scale greywater between buildings) as a non-data-centre precedent. J.B. 27 Oct 2026."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
SID = 'sfpucReuse'
SRC = ('San Francisco Public Utilities Commission (regulator), Onsite Water Reuse Program Guidebook: district-scale systems '
       '"serving two or more buildings"; cooling listed among allowed non-potable uses '
       '— https://www.sfpuc.gov/sites/default/files/documents/Onsite-Water-Reuse-Guidebook.pdf')
NOTE = ('Shared between buildings in San Francisco: the SFPUC programme permits district-scale greywater and blackwater '
        'systems serving two or more buildings, with cooling as an allowed use (regulator); no data-centre case found. '
        'Vancouver (VBBL 2025) still limits greywater to the same dwelling.')
p = R / 'tool/opps.json'; o = json.loads(p.read_text())
o['sources'][SID] = SRC; o['source_kinds'][SID] = 'regulator'; o['source_check'][SID] = 'claude'
g = next(a for a in o['addons'] if a.get('id') == 'greywater')
g['readiness_basis'] = ('None found at a data centre; a data centre has too few occupants to make much greywater, so it would come from neighbours. ' + NOTE)
if SID not in g['readiness_sources']: g['readiness_sources'].append(SID)
n = 0
for op in o['opportunities'].values():
    b = op.get('basis', '')
    if 'Greywater or blackwater for cooling: none found.' in b:
        op['basis'] = b.replace('Greywater or blackwater for cooling: none found.',
            'Greywater or blackwater for cooling: no data-centre case found; ' + NOTE); n += 1
        if SID not in op['sources']: op['sources'].append(SID)
assert n == 1, n
p.write_text(json.dumps(o, ensure_ascii=False, separators=(',', ':')))
q = R / 'register/formula_register.json'; r = json.loads(q.read_text())
gq = next(x for x in r['quantities'] if x['id'] == 'greywater_neighbours')
gq['coef'] = gq['coef'].replace('cross-property sharing: no BC or Alberta rule text found',
    'cross-property sharing: no BC or Alberta rule text found; San Francisco permits district-scale systems serving two or more buildings (SFPUC)')
if SID not in gq['sources']:
    gq['sources'].append(SID)
    gq['source_roles'].append({'id': SID, 'term': 'district-scale greywater between buildings', 'role': 'precedent (not a data centre)', 'conf': 70, 'verified': True})
r['new_sources'][SID] = SRC
q.write_text(json.dumps(r, ensure_ascii=False, indent=1))
print('ok')
