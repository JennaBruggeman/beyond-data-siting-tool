"""2 Nov 2026: van3575s2 is cited by the Architecture-mode catalogue for use definitions beyond Bulk Data Storage. Claude read the
local copy (sources/library/public/van3575s2/full.pdf, pdftotext) and adds the quoted definitions; check record added."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); S = d['new_sources']; m = d['meta']
ADD = (" ‖ 2 Nov 2026 (Claude, local copy): p. 22 'Laundromat or Dry Cleaning Establishment' = 'The use of premises with a maximum floor area of 300 m2 for the laundering or cleaning of clothing, draperies or related small household goods'; "
       "p. 22 'Laundry or Cleaning Plant' (laundering, cleaning or dying of textiles … 'does not include Laundromat or Dry Cleaning Establishment'); p. 47 'Urban Farm - Class B' = 'cultivation of fruits or vegetables for sale … may take place in a greenhouse' (no fish or animals); "
       "p. 10 Cultural and Recreational Uses list includes 'Swimming Pool' and 'Zoo or Botanical Garden'; p. 41 Service Uses list includes 'Catering Establishment', 'Laundromat or Dry Cleaning Establishment', 'Laundry or Cleaning Plant'. Whether a use is allowed is set by each district schedule, not s. 2.")
if '2 Nov 2026 (Claude, local copy)' not in S['van3575s2']: S['van3575s2'] += ADD
m['source_kinds']['van3575s2'] = 'rule'; m['source_check']['van3575s2'] = 'claude'
cl = m['check_log'].setdefault('van3575s2', [])
if not any(c.get('date') == '2 Nov 2026' for c in cl):
    cl.append({'check': 1, 'by': 'Claude', 'date': '2 Nov 2026', 'where': 'sources/library/public/van3575s2/full.pdf (pdftotext -layout)', 'what': 'definitions quoted with page'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
