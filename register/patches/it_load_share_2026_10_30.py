"""30 Oct 2026: J.B.'s added tour notes (density is the tenant's choice; halls are not always full) and a new quantity,
it_load_share: how much of a building's IT capacity actually runs. CHECK 1 only (Claude, 30 Oct 2026); check 2 open.
J.B. said 'yes' to both (30 Oct 2026)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
D = '30 Oct 2026'
TOUR_ADD = (" ADDED 30 Oct 2026 (her words in chat, from the guide): with AI servers there is more power for machines that take up less floor"
            " area than normal, so the power per area is 'entirly dependent on the clients wishes'; data centres 'arent always at capacity' —"
            " sometimes empty racks, or areas where clients are building new enclosures.")
NEW = {
 'uptime2024Survey': "Uptime Institute, Global Data Center Survey 2024 (UII Keynote Report 146M, July 2024; Donnellan, Lawrence, Bizo et al.; survey Mar–Apr 2024, 879 end users answered at least one question, n varies by question): "
                     "'one in four data centers in our survey is typically under 40% utilized by available UPS capacity' (p. 9; no question wording, bands or n given for this figure ?); "
                     "typical rack density averages 8 kW, 7.1 kW without 11 sites over 50 kW; 4–6 kW racks most common (p. 10). Self-reported operator survey — https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2024.GlobalDataCenterSurvey.Report.pdf",
 'lbnl2024': "Shehabi, Smith, Hubbard et al., 2024 United States Data Center Energy Usage Report, LBNL-2001637 (Dec 2024): converts 2028 energy (about 325–580 TWh) to 74–132 GW 'Assuming an average capacity utilization rate of 50%' (Executive Summary, p. 7); "
            "the term is not defined and no source is given for the 50% (?); separate from server utilisation (colocation servers 21% in 2014 rising to 35% in 2027, p. 27) — https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report_1.pdf",
}
KIND = {'uptime2024Survey': 'industry survey (operator self-report)', 'lbnl2024': 'national lab report (modelling assumption)'}
WHERE = {'uptime2024Survey': 'Uptime report PDF pp. 2, 5, 9, 10, 29', 'lbnl2024': 'LBNL report PDF pp. 7, 27'}
Q = {
 'id': 'it_load_share', 'name': 'How much of the IT capacity actually runs', 'unit': 'share of design IT load', 'stage': 'test', 'conf': 40,
 'status': 'no typical value sourced (?): the tool keeps working from capacity; this node shows why actual load is lower',
 'inputs': ['rack_count'], 'sources': ['tourVAN3', 'uptime2024Survey', 'lbnl2024'],
 'formula': 'running IT load = design IT load × share in use; share in use not set (?)',
 'coef': ("Guide at VAN3: halls are not always at capacity (empty racks, enclosures being built) and power per area depends on the tenants (tourVAN3, guide's claim); "
          "a quarter of surveyed sites typically run under 40% of their UPS capacity (Uptime 2024, operator self-report); LBNL assumes 50% average capacity utilisation for the whole US fleet, unsourced (lbnl2024). "
          "Neither gives a typical value for one colocation building, so heat and energy stay at capacity: an upper bound (the Heat view does not yet say so ?)"),
 'source_roles': [
  {'id': 'tourVAN3', 'term': 'not always full', 'role': 'check', 'conf': 40, 'verified': False},
  {'id': 'uptime2024Survey', 'term': 'under 40% of UPS capacity at 1 in 4 sites', 'role': 'check', 'conf': 50, 'verified': True},
  {'id': 'lbnl2024', 'term': '50% assumed', 'role': 'check', 'conf': 30, 'verified': True}],
}
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; d = json.loads(p.read_text())
    S = d['new_sources'] if pretty else d['sources']
    S.update(NEW)
    if 'ADDED 30 Oct 2026' not in S.get('tourVAN3', ''): S['tourVAN3'] = S['tourVAN3'] + TOUR_ADD
    if pretty:
        m = d['meta']; m['source_kinds'].update(KIND); m['source_check'].update({k: 'claude' for k in NEW})
        for k in NEW:
            m['check_log'].setdefault(k, [])
            if not any(c.get('date') == D for c in m['check_log'][k]): m['check_log'][k].append({'check': 1, 'by': 'Claude', 'date': D, 'where': WHERE[k], 'what': 'figures quoted in the source entry'})
        tl = m['check_log'].setdefault('tourVAN3', [])
        if not any(c.get('date') == D for c in tl): tl.append({'check': 1, 'by': 'Claude', 'date': D, 'where': "J.B.'s message in chat, 30 Oct 2026", 'what': "added as the guide's claims, her wording kept"})
        if not any(q['id'] == 'it_load_share' for q in d['quantities']): d['quantities'].append(Q)
    else:
        d['source_kinds'].update(KIND); d['source_check'].update({k: 'claude' for k in NEW})
        d['quantities']['it_load_share'] = {k: Q[k] for k in ('name', 'formula', 'coef', 'unit', 'sources', 'conf', 'status')}
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, 'ok')
