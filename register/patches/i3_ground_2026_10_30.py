"""30 Oct 2026 (J.B. 'do 2 and 3'): the I-3 ground-floor rule for Bulk Data Storage, read in two City drafts; the enacted I-3 schedule could not be opened (no link reachable from the tools). Check 1 (Claude)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]; D = '30 Oct 2026'
NEW = {
 'vanFCF2017draft': "City of Vancouver, draft by-law for public hearing 19 Sep 2017, 'False Creek Flats Amendments to the Zoning and Development By-law' (DRAFT, not enacted as printed; number and date blank): adds the Bulk Data Storage definition; I-3 (Appendix B) s. 3.2.T Bulk Data Storage conditional 'but only in sub-area A'; s. 3.3.7 'Except for entrances, Bulk Data Storage use shall not be permitted at the ground floor'; I-2 (Appendix A) s. 3.3.6 the same — https://council.vancouver.ca/20170919/documents/phea6draftbylawZD.pdf",
 'vanI3draft2022': "City of Vancouver, I-3 District Schedule, Consultation Draft (April 2022, regulation redesign): s. 2.1 Bulk Data Storage conditional 'only in sub-area A'; s. 2.2.11 'Bulk data storage is not permitted at the ground floor, except for entrances' — https://syc.vancouver.ca/projects/regulation-redesign/i/zoning-by-law-district-schedule-i-3-draft.pdf",
}
NOTE = (" ‖ I-3 RE-READ (30 Oct 2026, for J.B.'s decision 18): the ground-floor rule for I-3 is in both City drafts — the 2017 public-hearing by-law (Appendix B s. 3.3.7, vanFCF2017draft) and the 2022 consultation draft (s. 2.2.11, vanI3draft2022); "
        "the enacted I-3 schedule in force could not be opened (?), so the tool keeps the rule for I-3, labelled 'in both drafts; enacted text not read'. FC-2 not read (?)")
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; d = json.loads(p.read_text()); S = d['new_sources'] if pretty else d['sources']
    S.update(NEW)
    if 'I-3 RE-READ (30 Oct 2026' not in S['vanI2Ground']: S['vanI2Ground'] += NOTE
    if pretty:
        m = d['meta']; m['source_kinds'].update({'vanFCF2017draft': 'draft by-law (public hearing)', 'vanI3draft2022': 'consultation draft'}); m['source_check'].update({k: 'claude' for k in NEW})
        for k in NEW: m['check_log'].setdefault(k, []).append({'check': 1, 'by': 'Claude', 'date': D, 'where': 'City PDF via WebFetch', 'what': 'Bulk Data Storage clauses quoted'})
        for q in d['quantities']:
            if 'vanI2Ground' in q.get('sources', []):
                for k in NEW:
                    if k not in q['sources']: q['sources'].append(k)
                    if not any(x['id'] == k for x in q.setdefault('source_roles', [])): q['source_roles'].append({'id': k, 'term': 'I-3 ground-floor rule (draft text)', 'role': 'check', 'conf': 60, 'verified': True})
    else:
        for q in d['quantities'].values():
            if 'vanI2Ground' in q.get('sources', []): q['sources'] += [k for k in NEW if k not in q['sources']]
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, 'ok')
