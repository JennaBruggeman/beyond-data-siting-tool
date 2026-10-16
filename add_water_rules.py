# 16 Oct 2026: VBBL 2025 Book II and the Alberta alternative-solutions notice (J.B. downloads, data/raw/codes), read by Claude.
# Idempotent. Run after add_bch_tariff.py.
import json, os
h = os.path.dirname(os.path.abspath(__file__)); P = os.path.join(h, 'formula_register.json')
r = json.load(open(P, encoding='utf-8')); m = r['meta']
r['new_sources']['vbbl2025_272'] = ('Vancouver Building By-law 2025, Book II, Div. B, Art. 2.7.1.2–2.7.1.3 and Table 2.7.1.3 (read by Claude 16 Oct 2026): a non-potable system may collect only rainwater, clear-water waste and Class R greywater used in the same dwelling unit; '
  'blackwater, groundwater, road runoff and perimeter drainage are not permitted; treated rainwater and clear-water waste may be used for "make-up water for cooling towers, adiabatic cooling systems"; operating permit (2.7.5.3) and professional design (2.7.6.1) required — '
  'https://vancouver.ca/files/cov/2025-vbbl-book-II-insert-pages.pdf')
r['new_sources']['abAltSol2021'] = ('Government of Alberta, Notice: Alternative Solutions Guide for Small System Water Reuse and Stormwater Use (Jan 2021; read by Claude 16 Oct 2026): reuse beyond toilet and urinal flushing or sub-surface irrigation needs an alternative solution from the local authority having jurisdiction; '
  'the municipality must support it and oversee monitoring; Water Act / EPEA authorisation from Alberta Environment may be needed; projects serving more than one property are led by Alberta Environment — '
  'https://open.alberta.ca/publications/notice-alternative-solutions-guide-small-system-water-reuse-stormwater-use')
for t in m['try_menu']:
    if t['id'] == 'rainwater':
        t['rules'] = {'vancouver': 'allowed: rainwater may be used as cooling-tower make-up (VBBL 2025 Table 2.7.1.3); operating permit and professional design', 'edmonton': 'alternative solution from the City needed; City must support and oversee monitoring (Alberta notice, 2021)'}
        t['rule_sources'] = ['vbbl2025_272', 'abAltSol2021']
    if t['id'] == 'greywater':
        t['rules'] = {'vancouver': 'not for cooling: greywater only as NSF 350 Class R, reused in the same dwelling unit (VBBL 2025 Art. 2.7.1.2(3))', 'edmonton': 'alternative solution needed (Alberta notice, 2021)'}
        t['rule_sources'] = ['vbbl2025_272', 'abAltSol2021']
    if t['id'] == 'blackwater':
        t['rules'] = {'vancouver': 'not permitted (VBBL 2025 Art. 2.7.1.2(2)(f))', 'edmonton': 'alternative solution needed; Alberta Environment authorisation likely (Alberta notice, 2021)'}
        t['rule_sources'] = ['vbbl2025_272', 'abAltSol2021']
    if t['id'] == 'reclaimed':
        t['rule_sources'] = list(dict.fromkeys(t.get('rule_sources', []) + ['mv_ut019', 'abAltSol2021']))
json.dump(r, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
