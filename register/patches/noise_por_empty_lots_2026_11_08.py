"""8 Nov 2026 (J.B., Engineering gate item 1): the noise by-law check tests every neighbouring lot, with or without a building. By-law 6555 limits apply at the
point of reception; for an empty lot that is our reading. The definition is quoted from the saved consolidation (to 14 Jul 2026, By-law 14786; Claude Link
beyond-data-sources/public/bylaw6555/full.pdf, s. 1.2). 375 1st Ave E (CD-1 (402), quiet zone, no building on record) is now tested; with the plant room the
tool requires it gets 49-52 dBA against 55 dBA and is the worst case for 339 1st Ave E (74-77 dBA without the plant room). Engine: noiseRecv adds lots with
no building; noiseCheck stores each lot's level (BD.eng.noiseLot)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']; m = d['meta']; D = '8 Nov 2026'
S['van6555_por'] = ('RULE: City of Vancouver Noise Control By-law 6555 (consolidated to 14 Jul 2026, By-law 14786), s. 1.2: \'"point of reception" means: (a) a point in a lane '
  'or street, adjacent to but outside of the property occupied by the recipient of the noise or sound, that represents the shortest distance between that property and '
  'the source of the noise; (b) where no lane, street, or other public property exists between the recipient and the source, any point outside the property line of '
  'the real property from which the noise or sound emanates; or (c) in the case of noise emanating from inside Rogers Arena, ...\' (saved copy, Claude Link '
  'beyond-data-sources/public/bylaw6555/full.pdf; read by Code 8 Nov 2026). Trust 90. Applied to every neighbouring lot, with or without a building: that an empty '
  'lot is a "property occupied by the recipient" is our reading (J.B., 8 Nov 2026). The tool measures at the receiving lot\'s point nearest the plant.')
m['source_kinds']['van6555_por'] = 'rule'
m['check_log'].setdefault('van6555_por', []).append({'check': 1, 'by': 'Code', 'date': D, 'where': 'saved By-law 6555 consolidation s. 1.2', 'what': 'definition quoted; empty lots: our reading'})
TAG = ' ‖ 8 Nov 2026: 375 1st Ave E'
if TAG in S['van6555zones']:
    S['van6555zones'] = S['van6555zones'].replace("The tool's noise check tests only lots holding a building; 375's only outline is not found in LiDAR 2022, so its 55 dBA line is not tested (gap, ?).",
      "Since 8 Nov 2026 the check tests every neighbouring lot, with or without a building (van6555_por, our reading): 375 is tested at its lot line, 49-52 dBA with the required plant room against 55 dBA, and is the worst case for 339 1st Ave E.")
for q in d['quantities']:
    if q['id'] in ('noise_level', 'noise_limit') and 'van6555_por' not in q.get('sources', []): q.setdefault('sources', []).append('van6555_por')
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('noise point of reception')
