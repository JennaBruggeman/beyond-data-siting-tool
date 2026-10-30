"""30 Oct 2026: floor area per rack (J.B.: research the '180-200 m2 per MW' arithmetic; label the gap in the 3D key).
CHECK 1 only (Claude, 30 Oct 2026); check 2 open."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
D = '30 Oct 2026'
NEW = {
 'schneiderWP46': "VENDOR WHITE PAPER: N. Rasmussen, 'Cooling Strategies for Ultra-High Density Racks and Blade Servers', Schneider Electric Data Center Science Center White Paper 46, Rev. 7 (undated; cites 2002–03 survey data): "
                  "densities are taken over total floor area 'which includes space such as aisles' (p. 3); 'The rack and row densities in Figure 1 use a rack floor equivalent of 25 ft2', common values 25–30 ft² (2.3–2.8 m²) per rack (p. 2, note 1); "
                  "its design table uses 30 ft² (2.79 m²) per enclosure (p. 4); what else besides aisles the equivalent covers (cooling units, PDUs, cross aisles) is not stated (?). Read from a copy hosted by FacilitiesNet "
                  "(https://www.facilitiesnet.com/whitepapers/pdfs/20130227-SchneiderElectric.pdf); Schneider's listing: https://it-resource.schneider-electric.com/server-rooms-and-network-closets/wp-46-cooling-strategies-for-ultra-high-density-racks-and-blade-servers",
 'intelHD2012': "OPERATOR WHITE PAPER: J. Musilli and B. Ellison, 'Facilities Design for High-density Data Centers', IT@Intel White Paper (Jan 2012): Table 1 (p. 4) pairs 15 / 22.5 / 30 kW racks with 250 / 375 / 500 W per sq ft, "
                "'based on a 5,000-square-foot room with cooling units and power distribution units (PDUs) in the same space'; no area per rack is stated (60 ft², about 5.6 m², per rack is our arithmetic from the table) — "
                "https://www.intel.cn/content/dam/www/public/us/en/documents/best-practices/data-center-facilities-paper.pdf",
}
KIND = {'schneiderWP46': 'vendor white paper', 'intelHD2012': 'operator white paper'}
WHERE = {'schneiderWP46': 'FacilitiesNet-hosted PDF pp. 2–4', 'intelHD2012': 'Intel PDF pp. 2, 4'}
ADD = ("; floor per rack (check 1, 30 Oct 2026): the tightest drawn layout is a rack 0.6 m wide × (1.2 m rack + 1.2 m aisle) = 1.44 m² a rack, before row ends, cross aisles and cooling units — "
       "at 7.1–8 kW a rack that is about 180–200 m² per MW (our arithmetic, no source gives it); Schneider counts 2.3–2.8 m² a rack with its share of aisles (schneiderWP46), about 290–390 m² per MW at the same rack power (our arithmetic); "
       "Intel's 2012 table works out to about 5.6 m² a rack with cooling units and PDUs in the room (intelHD2012, our arithmetic); built Canadian halls use 290–630 m² of hall per MW (size_fit, operator claims) — "
       "the rest is tenant enclosures, growth space and lower densities (tourVAN3, guide's claims). The 3D key says so")
ROLES = [{'id': 'schneiderWP46', 'term': 'floor per rack with aisles', 'role': 'check', 'conf': 60, 'verified': True},
         {'id': 'intelHD2012', 'term': 'W per sq ft of room', 'role': 'check', 'conf': 50, 'verified': True}]
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; d = json.loads(p.read_text())
    (d['new_sources'] if pretty else d['sources']).update(NEW)
    if pretty:
        m = d['meta']; m['source_kinds'].update(KIND); m['source_check'].update({k: 'claude' for k in NEW})
        for k in NEW:
            m['check_log'].setdefault(k, [])
            if not any(c.get('date') == D for c in m['check_log'][k]): m['check_log'][k].append({'check': 1, 'by': 'Claude', 'date': D, 'where': WHERE[k], 'what': 'figures quoted in the source entry'})
        q = next(q for q in d['quantities'] if q['id'] == 'hall_layout')
        if 'schneiderWP46' not in q['coef']: q['coef'] += ADD
        for k in NEW:
            if k not in q['sources']: q['sources'].append(k)
        for r in ROLES:
            if not any(x['id'] == r['id'] for x in q.setdefault('source_roles', [])): q['source_roles'].append(r)
        if 'size_fit' not in q['inputs']: q['inputs'].append('size_fit')
    else:
        d['source_kinds'].update(KIND); d['source_check'].update({k: 'claude' for k in NEW})
        q = d['quantities'].get('hall_layout')
        if q and 'schneiderWP46' not in q['coef']:
            q['coef'] += ADD; q['sources'] += [k for k in NEW if k not in q['sources']]
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, 'ok')
