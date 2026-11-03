"""2 Nov 2026: the I-2 and I-3 floor-space split, read by Claude from the local schedule texts (data/raw/codes/van_I-2_schedule.txt; data/raw/van/i3.txt),
for Architecture mode's non-industrial cap (code audit exchanges N1, N8)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); S = d['new_sources']; m = d['meta']
ADD = {
 'van_zdb_i3': " ‖ 2 Nov 2026 (Claude, local text data/raw/van/i3.txt): 3.1.1.1 'The maximum floor space ratio is 3.00, subject to the following allocations: (a) … 3.00 for artist studio, manufacturing uses, office uses permitted as outright approval uses, parking uses, service uses permitted as outright approval uses, transportation and storage uses, utility and communication uses, and wholesale uses; and (b) … 1.00 for all other uses combined, except that the floor area for: (i) retail uses … must not exceed 1,000 m2, (ii) office uses permitted as conditional approval uses must not exceed 33% of the total gross floor area'.",
 'van_zdb_i2': " ‖ 2 Nov 2026 (Claude, local text data/raw/codes/van_I-2_schedule.txt): 3.00 allocation lists '(iii) service uses, limited to: animal clinic or shelter, catering establishment, laboratory, laundry or cleaning plant, …', '(iv) transportation and storage uses, (v) utility and communication uses'; '(b) the maximum floor space ratio is 1.00 for all other uses combined, except that the floor area for: … (ii) general office and health care office combined must not exceed the greater of 235 m² or 33.3% of the total gross floor area of all principal and accessory uses combined'.",
}
for k, t in ADD.items():
    if '2 Nov 2026 (Claude, local text' not in S[k]: S[k] += t
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('date') == '2 Nov 2026' and c.get('by') == 'Claude' for c in cl):
        cl.append({'check': 1, 'by': 'Claude', 'date': '2 Nov 2026', 'where': 'local schedule text', 'what': 's. 3.1.1.1 floor-space allocations quoted'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
