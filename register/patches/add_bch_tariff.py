# 15 Oct 2026: BC Hydro Electric Tariff PDF (J.B. download, data/raw/bchydro). Confirms LGS and RS 1830 prices; reads RS 2289 and RS 4100.
# Idempotent. Run after add_solar_ev.py.
import json, os
h = os.path.dirname(os.path.abspath(__file__)); P = os.path.join(h, '..', 'formula_register.json')
r = json.load(open(P, encoding='utf-8')); m = r['meta']
r['new_sources']['bchTariff2026'] = ('BC Hydro Electric Tariff (PDF, J.B. download 15 Oct 2026; read by Claude): RS 1600/1601/1610/1611 Large General Service, Revision 16, effective 1 Apr 2026 (BCUC G-76-25): '
  '29.99 ¢/day, $13.83/kW of billing demand, 6.79 ¢/kWh, for ≥150 kW or >550,000 kWh a year; RS 1830 Transmission Service, Revision 3, effective 1 Apr 2026: supply at 60 kV or higher, $12.178/kVA, 4.914 ¢/kWh; '
  'RS 2289 Self-Generation Service, original, effective 1 Jul 2026 (G-64-26): only for customers taking service at distribution voltage; clean or renewable facility ≤100 kW nameplate or ≤100 kW per phase net injection, '
  'on the same or an adjacent parcel; BC Hydro pays 10 ¢/kWh for net generation, credit balance paid out each 30 April; RS 4100 Public EV Charging (BC Hydro\'s own stations), effective 1 Apr 2026: Level 2 31.30 ¢/kWh, fast 40.29 ¢/kWh — '
  'https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/corporate/tariff-filings/electric-tariff/bchydro-electric-tariff.pdf')
for q in r['quantities']:
    if q['id'] == 'electricity_price':
        q['coef'] = q['coef'].replace('BC LGS (1 Jul 2026)', 'BC LGS (RS 1600–1611, effective 1 Apr 2026)').replace('RS 1830: $12.178/kVA, 4.914 ¢/kWh', 'RS 1830 (supply at 60 kV or higher, effective 1 Apr 2026): $12.178/kVA, 4.914 ¢/kWh')
        if 'bchTariff2026' not in q['sources']: q['sources'].insert(0, 'bchTariff2026')
        q['source_roles'] = [x for x in q.get('source_roles', []) if x['id'] != 'bchTariff2026'] + [{'id': 'bchTariff2026', 'term': 'LGS and RS 1830 prices (tariff text)', 'role': 'coefficient', 'conf': 90, 'verified': True}]
    if q['id'] == 'self_gen_rules':
        if 'RS 2289 applies only at distribution voltage' not in q['coef']:
            q['coef'] = q['coef'].replace('BC: RS 2289 from 1 Jul 2026, export up to 100 kW per phase at $0.10/kWh;',
              'BC: RS 2289 from 1 Jul 2026, export up to 100 kW per phase (or ≤100 kW nameplate) at $0.10/kWh, same or adjacent parcel; RS 2289 applies only at distribution voltage, so a data centre supplied at 60 kV or higher (RS 1830) cannot use it;')
        if 'bchTariff2026' not in q['sources']: q['sources'].insert(0, 'bchTariff2026')
        q['source_roles'] = [x for x in q.get('source_roles', []) if x['id'] != 'bchTariff2026'] + [{'id': 'bchTariff2026', 'term': 'RS 2289 tariff text', 'role': 'rule', 'conf': 90, 'verified': True}]
for t in m['try_menu']:
    if t['id'] in ('pv', 'pv_facade'):
        t['rules']['vancouver'] = ('export ≤100 kW per phase at 10 ¢/kWh (RS 2289), only for sites supplied at distribution voltage — not for a large data centre on transmission service (RS 1830); '
                                   'extra height at the Director of Planning\'s discretion (s. 10.1.1(d); bulletin, Nov 2022)')
        if 'bchTariff2026' not in t.get('rule_sources', []): t['rule_sources'] = ['bchTariff2026'] + [s for s in t.get('rule_sources', []) if s != 'bchRS2289']
json.dump(r, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
