"""3 Nov 2026: Canadian Web Hosting data centres page (screenshots from J.B.). Operator claim. Covers Vancouver (555 W Hastings) and Coquitlam."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
k = 'arch_inv_cwhDcPage2026'
S[k] = ("OPERATOR CLAIM: Canadian Web Hosting, 'Canadian Data Centres - Toronto, Vancouver & Coquitlam' page, screenshots by J.B. 3 Nov 2026: "
        "Vancouver Data Centre, 'Our primary facility at 555 West Hastings'; 'Multi-level high-rise building with raised floor'; 'UPS and diesel generator backup power'; "
        "'Pre-action dry pipe sprinkler fire suppression'; '24/7/365 NOC monitoring and on-site staff'; FAQ: 'All three facilities use UPS ... and diesel generators ... "
        "Power is delivered through multiple independent feeds'; spec table: Building Type Vancouver 'Multi-level high-rise', Coquitlam 'Custom 7,600 sq. ft.'; "
        "no MW, floor area (Vancouver), cooling type, PUE or heat reuse given — https://canadianwebhosting.com/company/canadian-data-centres")
m['source_kinds'][k] = 'operator claim'; m['source_check'][k] = 'claude'
cl = m['check_log'].setdefault(k, [])
if not any(c.get('check') == 1 for c in cl):
    cl.append({'check': 1, 'by': 'Claude', 'date': '3 Nov 2026', 'where': "J.B.'s three screenshots of the page", 'what': 'quotes read from the images'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('ok')
