"""30 Oct 2026: (1) B.C. Reg. 8/2026 re-read by Claude for J.B.'s question on sites under 10 MW: s. 3 caps have no size threshold.
(2) J.B. confirmed ('yes') that the washrooms and the technicians' room were before the glass portal. Check 1 (Claude)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]; D = '30 Oct 2026'
REG = (" RE-READ 30 Oct 2026 (Claude, for J.B.): every s. 2(1) prohibition is triggered only at 10 MW or more (through the s. 1 definitions or s. 2(1)(d)–(f)); "
       "but the s. 3 aggregate caps (e.g. s. 3(1): not 'more than a total of 100 MW of new electricity capacity' for conventional data centre purposes) state no per-request size, "
       "so whether a data centre under 10 MW counts toward them is not settled by the text (?): a question for BC Hydro")
TOUR = " LAYOUT (J.B. 30 Oct 2026, 'yes'): the washrooms (lockers, showers) and the technicians' room were before the glass portal, on the lobby side, as her notes' order shows."
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; d = json.loads(p.read_text()); S = d['new_sources'] if pretty else d['sources']
    if 'RE-READ 30 Oct 2026' not in S['bcReg8_2026']: S['bcReg8_2026'] += REG
    if 'LAYOUT (J.B. 30 Oct' not in S['tourVAN3']: S['tourVAN3'] += TOUR
    if pretty:
        L = d['meta']['check_log']
        for k, w, what in (('bcReg8_2026', 'BC Laws page, 30 Oct 2026', 's. 1–4 re-read for the under-10 MW question'), ('tourVAN3', "J.B.'s answer in chat, 30 Oct 2026", 'portal position of washrooms and technicians\' room')):
            if not any(c.get('date') == D and c.get('what') == what for c in L.setdefault(k, [])): L[k].append({'check': 1, 'by': 'Claude', 'date': D, 'where': w, 'what': what})
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, 'ok')
