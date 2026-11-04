"""3 Nov 2026: eStruxture VAN-2 datasheet (EN-V5), uploaded by J.B. Operator claim; first coordinates in the Vancouver inventory."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
k = 'arch_inv_estruxVan2Sheet'
S[k] = ("OPERATOR CLAIM: eStruxture, VAN-2 Data Center datasheet EN-V5 (undated), uploaded by J.B. 3 Nov 2026: '555 West Hastings Street, Suite 2605'; "
        "'Lat: 49.284680 | Long: -123.111890'; '14,500 sq. ft. of total space', '11,000 sq. ft. of white space'; 'Four Data Halls'; 'First data hall built in 2000'; "
        "'28 Floor multi-tenant building', '4 Data Halls on 2 different floors'; 'Ceiling clearance 10’ 2” to 11’ 8”'; 'Floor load ... 260 lbs. / sq. ft.'; "
        "'Outside 100 year floodplain', 'Outside 500 year floodplain'; 'Ground level loading dock'; '2.14 MW total power capacity'; 'Up to 10 kW per cabinet'; "
        "'Served by three utility feeds to building with single path electrical distribution to the data halls'; 'POWER PROVIDER BC Hydro'; "
        "'UPS N and N+1'; 'BACKUP GENERATORS N'; 'FUEL RUN-TIME 48 Hours'; 'Tier I design N+1 UPS solution'; 'Closed glycol loop chilled water'; 'Total 422 RT'; "
        "'REDUNDANCY N+1'; 'Double interlock pre-action dry pipe'; 'One Meet-Me-Room' — local upload (not in repo)")
m['source_kinds'][k] = 'operator claim'; m['source_check'][k] = 'claude'
cl = m['check_log'].setdefault(k, [])
if not any(c.get('check') == 1 for c in cl):
    cl.append({'check': 1, 'by': 'Claude', 'date': '3 Nov 2026', 'where': 'pdftotext of the uploaded PDF, pp. 1-2', 'what': 'all quotes read from the text layer'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
