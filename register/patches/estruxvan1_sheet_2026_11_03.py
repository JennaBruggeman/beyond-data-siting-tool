"""3 Nov 2026: eStruxture VAN-1 datasheet (EN-V5), uploaded by J.B. Operator claim."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
k = 'arch_inv_estruxVan1Sheet'
S[k] = ("OPERATOR CLAIM: eStruxture, VAN-1 datasheet EN-V5 (undated), uploaded by J.B. 3 Nov 2026: '55 East 7th Avenue, Vancouver'; 'Building - 10,000 sq. ft.', 'Land - 6,000 sq. ft.'; "
        "'7,500 sq. ft. of cabinet space'; '4 halls and 2.4MW of critical IT load'; 'Supports up to 30kW/cabinet'; 'YEAR BUILT 1974'; 'Single building with 3 floors of office and infrastructure space'; "
        "'12” thick seismic shear wall spanning its core'; 'FLOOD PLAIN 79’ (24 m) above sea level'; 'Single high voltage entry with a dedicated 2.5MVA unit substation'; "
        "'Power feed from a single substation'; 'POWER PROVIDER BC Hydro'; 'Tier 1, N+1 UPS solution available'; 'UPS 2N solution available upon request'; "
        "'Minimum of 28 hours on site fuel'; 'Hot aisle/cold aisle containment'; '40 Ton mechanical Loop1, N+1 250 Ton Mechanical Loop2' (as laid out in the PDF; reading of the two loops ?); "
        "'N+1 mechanical redundancy'; 'Mechanical design based on optimal free cooling (8+ months / year)'; 'Novec clean agent fire suppression'; 'VESDA'; "
        "'One Meet Me Room with 3 fiber entrances' — local upload (not in repo)")
m['source_kinds'][k] = 'operator claim'; m['source_check'][k] = 'claude'
cl = m['check_log'].setdefault(k, [])
if not any(c.get('check') == 1 for c in cl):
    cl.append({'check': 1, 'by': 'Claude', 'date': '3 Nov 2026', 'where': 'pdftotext of the uploaded PDF, pp. 1-2', 'what': 'all quotes read from the text layer; cooling table is two-column and its pairing is uncertain'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
