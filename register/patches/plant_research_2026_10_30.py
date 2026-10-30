"""30 Oct 2026, J.B. 'yup': plant research — hall floor loads, transformer clearances, exhaust, fuel. Check 1 (Claude)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]; D = '30 Oct 2026'
NEW = {
 'linwood2023': "E. Linwood, P.E., 'Design Parameters for Data Center Facilities', STRUCTURE magazine, 'Outside the Box', Jan 2023, pp. 16–18 (trade magazine of the structural engineering profession; US codes): data-hall live loads — 100 psf ASCE 7-22 minimum for computer access floors (or a 2,000 lb point load); 150 psf UFC 3-301-01 (2018) for IT server spaces; 350 psf recommended by Intel 2012 (intelHD2012); about 240 psf the author's own worked example for a 16 × 20 ft module (racks, containment, raised floor, cables); 412.5 psf under a single 3,000 lb rack; clients 'typically prefer a conservative structural design'; roof: ASCE minimum 20 psf, a heavier roof criterion recommended. No operator requests quoted. 100/150/240/350 psf ≈ 4.8/7.2/11.5/16.8 kPa (our conversion) — https://www.structuremag.org/wp-content/uploads/2022/12/302301-C-OutsidetheBox-Linwood.pdf",
 'epiTIA942': "INDUSTRY READING (certification firm, not TIA): EPI Singapore, Q&A on TIA-942 Rated-3 floor loading (undated page, © 2026): 'should be 12kPa (250 lb/ft2)' superimposed live load for a Rated-3 data centre; auditors may accept less if fit for purpose. TIA-942 itself not read (paywalled) — https://www.epi-ap.com/content/28/641/The_data_centre_is_not_meeting_the_12kPa_floor_loading_capability_as_per_TIA-942_Rated-3_Will_this_data_centre_fail_the_certification?",
 'bchES54F': "BC Hydro Distribution Standard ES54 Section F, Transformer pads and vaults (F0-02 general notes; F3-04 R.6 Feb 2017, three-phase pad ≤500 kVA; F3-05 R.8 Sep 2017, ≥750 kVA): pad at least 1 m from a customer building or other structure (BC Hydro's minimum; the CEC allows less); 'a minimum 3 m unobstructed area in front of each transformer'; 1 m at the sides and between transformers; granular oil containment in a timber frame; pad-mounted units hold under 2,500 L of oil. These are BC Hydro-owned distribution transformers; a customer-owned substation at primary service follows the CEC (not read ?) — https://app.bchydro.com/content/dam/BCHydro/customer-portal/documents/distribution/standards/ds-ES54-section-f-transformer-pads-vaults.pdf",
 'nfc2020_4313': "National Fire Code of Canada 2020 (local copy data/raw/codes/nfc.txt): Note A-4.1.1.1.(3)(b) — tanks and piping supplying diesel-engine emergency generators fall under CSA B139 Series, and 'Part 4 of the NFC does not apply to such tanks and piping systems'; for other indoor tanks, Table 4.3.13.4.-B (protected storage rooms, Classes II/IIIA such as diesel): up to 200,000 L aggregate on the first storey, 20,000 L in basements and upper storeys (45,000 L with tanks over 20,000 L ? table layout unclear in the text copy); tanks over 2,500 L double-walled or secondarily contained (4.3.13.5); Class I fuels for indoor engines → NFPA 37 (4.3.13.2). BC and Alberta fire codes adopt the same Part 4 (not re-checked ?)",
 'bcbc2024_3275': "BC Building Code 2024, Div. B 3.2.7.5.(1) (local copy): an emergency electrical power supply system 'shall be installed in conformance with CSA C282'. C282 (paywalled) therefore governs generator rooms, exhaust and testing for code-required emergency power; whether a data centre's IT generators are 'emergency' power is not stated (?)",
}
KIND = {'linwood2023': 'trade magazine (engineer)', 'epiTIA942': 'certifier reading (industry)', 'bchES54F': 'utility standard', 'nfc2020_4313': 'code', 'bcbc2024_3275': 'code'}
ADD_EPCOR = " ‖ SECTIONS READ (check 1, 30 Oct 2026, local copy full.pdf): s. 6.4(g) 'Required clearances between transformers and buildings can be as high as 6.0m, depending on the type of transformer used' (especially 347/600 V in the 5 kV area; confirm with EDTI); 6.4(e) on the customer's site in a registered utility right-of-way; 6.4(b) truck access; 6.4(o) piles if within 4.0 m of a foundation; 3.10.2.2 padmount equipment 1.0 m from gas lines, 1.8 m from water lines, 2.0 m from valves, hydrants, catch basins and sewers"
Q_ADD = {
 'plant_weight': "hall floors (check 1, 30 Oct 2026): 100 psf (4.8 kPa) US code minimum for computer access floors, 150 psf (7.2) US military IT spaces, about 240 psf (11.5) one engineer's worked example, 350 psf (16.8) Intel's recommendation (linwood2023); 12 kPa for a TIA-942 Rated-3 hall per a certifier (epiTIA942) — so a data-hall floor is as heavy as the plant or heavier; the NBC has no data-hall line (computer rooms are excluded from the office load)",
 'transformers': "clearances (check 1, 30 Oct 2026): BC Hydro pads 1 m from buildings, 3 m clear in front, 1 m at sides and between units (bchES54F; utility-owned distribution transformers); EPCOR up to 6.0 m from buildings by transformer type, in a registered right-of-way with truck access (epcor_ccg s. 6.4); customer-owned substations at primary service: CEC (paywalled, not read ?)",
 'generator_sets': "fuel and exhaust (check 1, 30 Oct 2026): diesel tanks for generators fall under CSA B139, not NFC Part 4 (nfc2020_4313; B139 paywalled, not read ?); code-required emergency power installed to CSA C282 (bcbc2024_3275; paywalled); exhaust: keep away from building openings and air intakes (mvBylaw1329); exhaust height not set by any code read (?)",
}
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; d = json.loads(p.read_text()); S = d['new_sources'] if pretty else d['sources']
    S.update(NEW)
    if 'SECTIONS READ (check 1, 30 Oct 2026' not in S['epcor_ccg']: S['epcor_ccg'] += ADD_EPCOR
    Q = {q['id']: q for q in d['quantities']} if pretty else d['quantities']
    srcs = {'plant_weight': ['linwood2023', 'epiTIA942'], 'transformers': ['bchES54F', 'epcor_ccg'], 'generator_sets': ['nfc2020_4313', 'bcbc2024_3275', 'mvBylaw1329']}
    for qid, txt in Q_ADD.items():
        q = Q[qid]
        if txt[:30] not in q['coef']: q['coef'] += '; ' + txt
        for s in srcs[qid]:
            if s not in q['sources']: q['sources'].append(s)
            if pretty and not any(x['id'] == s for x in q.setdefault('source_roles', [])):
                q['source_roles'].append({'id': s, 'term': txt.split(':')[0], 'role': 'benchmark' if s in ('linwood2023', 'epiTIA942') else 'rule', 'conf': 50 if s in ('linwood2023', 'epiTIA942') else 70, 'verified': True})
    if pretty:
        m = d['meta']; m['source_kinds'].update(KIND); m['source_check'].update({k: 'claude' for k in NEW})
        for k in list(NEW) + ['epcor_ccg']:
            L = m['check_log'].setdefault(k, [])
            if not any(c.get('date') == D and c.get('what') == 'plant research' for c in L): L.append({'check': 1, 'by': 'Claude', 'date': D, 'where': 'source PDF / local code copy', 'what': 'plant research'})
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, 'ok')
