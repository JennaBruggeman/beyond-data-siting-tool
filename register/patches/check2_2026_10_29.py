"""Check 2 (29 Oct 2026, evening): independent agent runs re-read every source added or re-read in the overnight pass
(results: scratchpad check2/result_A–D.json). Confirmed items get a check-2 entry; corrections are applied here with the
source wording the second reader quoted. A corrected passage has been read twice but its NEW wording only once: it is
flagged 'fixed at check 2' in check_log so a third look can target it.
Also fixes the date: the overnight pass ran on 29 Oct 2026 (Pacific), not 30 Oct as first written."""
import json, pathlib, re
R = pathlib.Path(__file__).resolve().parents[2]
D = '29 Oct 2026'

def fix_dates(s): return s.replace('30 Oct 2026', '29 Oct 2026')

SRC_EDIT = {  # (old, new) replacements inside source texts
 'bcReg8_2026': [("(Utilities Commission Act ss. 1 and 21.1)", "(Utilities Commission Act s. 21.1 (2) to (4))"),
                 ("s. 3 aggregate caps over two years from 1 Feb 2026;", "s. 3 aggregate caps over two years from 1 Feb 2026, and for the following year (s. 3(4)–(6): 50 / 150 / 100 MW from 1 Feb 2028, per the second reader ?);"),
                 ("(our reading of a text extract, not legal advice ?)", "(our reading: no provision says so outright; not legal advice ?)")],
 'cologixVAN3web': [("(OPERATOR CLAIMS; the tour guide said 2N)", "(OPERATOR CLAIMS; the page says N+1 — the '2N' in our notes comes from the tour guide, see tourVAN3, not from this page)")],
 'bchCfDRfA': [("('heat recovery ready', PUE, WUE)", "('heat recovery ready', 'power usage efficiency', 'water usage efficiency' — none defined in the RFA or the information session)")],
 'bchCfDInfo2026': [("— 'heat recovery ready' is not defined (?)", "— 'heat recovery ready' is defined neither here nor in the RFA (settled at check 2)")],
 'bcucG46_25': [("Micro TES is below 'a certain minimum dollar threshold as determined by the BCUC' — the value is not in the order's text (Appendix A is an image, not read ?)",
                 "Micro TES means 'a capital cost below a certain minimum dollar threshold' as determined by the BCUC — the dollar value is not in the order's text; Appendix A is the minister's approval letter of 18 Feb 2025, an image, not read (?)")],
 'bchCustGen': [(" — https://app.bchydro.com/accounts-billing/electrical-connections/customer-generation/community-generation.html ;",
                 "; the 2 MW AC limit is on net injection to the grid — the facility itself 'can be any size' (check 2) — https://app.bchydro.com/accounts-billing/electrical-connections/customer-generation/community-generation.html ;")],
 'bchTariff2026': [("RS 1830 Transmission Service, Revision 3, effective 1 Apr 2026:", "RS 1830 Transmission Service, Revision 3, effective 1 Apr 2026 (BCUC G-63-26, per check 2):"),
                   ("Level 2 31.30 ¢/kWh, fast 40.29 ¢/kWh", "Level 2 31.30 ¢/kWh, fast 40.29 ¢/kWh before rate riders (30.83 / 39.69 ¢/kWh after riders, check 2)")],
 'covHeat2025': [("memo 'Extreme heat plans summer 2025' (S. Singh", "memo 'Overview of Extreme Heat Plans and Actions 2025' (covering e-mail: 'Extreme Heat Plans - Summer 2025'; S. Singh"),
                 ("checks on residents of non-market housing", "checks on residents of City-owned and operated non-market housing")],
 'cologixVAN1_2026': [("Cologix VAN1 spec sheet (05-2026,", "Cologix VAN1 spec sheet (footer 'VAN1.042026.R4', i.e. April 2026; file named 05-2026;")],
 'aucMicro2026': [("(2026), p. 1, 4, 15:", "(2026), p. 1 and p. 3 (s. 1(1)(h) quoted), p. 8 sizing (pages per the second reader's WebFetch summary ?):")],
 'aesoAMS2025': [("the pool price is the hourly marginal price,", "the pool price is the hourly average of the one-minute system marginal prices (AESO glossary),"),
                 ("carbon cost 0.42–24.32;", "carbon cost 0.42–24.32 (already included in the marginal costs, which also include $5/MWh O&M — not to be added on top);"),
                 ("Average Alberta Internal Load", "Gas-fired generation 76.8% of Alberta's total in 2025; wind, solar and hydro 21.0%. Average Alberta Internal Load")],
 'edmBylaw17943': [("no provision found for a customer supplying heat into the DESS (?)", "no provision for a customer supplying heat into the DESS — its definitions cover energy delivered from the system only (full bylaw read at check 2); the City Manager's separate service requirements not read (?)")],
 'googleFlex2025': [("first data-centre demand response shifted non-urgent compute (e.g. processing a YouTube video) during grid stress with Centrica Energy and Elia (Belgium) and Taiwan Power Company;",
                     "earlier data-centre demand response shifted non-urgent compute (e.g. processing a YouTube video) 'when the grid is strained', with Centrica Energy and Elia (Belgium) and Taiwan Power Company;"),
                    ("new agreements with Indiana Michigan Power (Fort Wayne) and TVA;", "new agreements with Indiana Michigan Power (Fort Wayne) and TVA, which the post calls the 'first time' it delivers demand response by targeting machine-learning workloads;")],
 'epriDCFlexEU': [("EPRI Europe press release 'DCFlex: Momentum Builds Across Europe' (undated page ?): UK's first live DCFlex demonstration with National Grid, Nebius, Kraken, Emerald AI and NVIDIA cut load",
                   "SELF-REPORTED: EPRI Europe press release 'DCFlex: Momentum Builds Across Europe' (page carries no date): UK's first live DCFlex demonstration with National Grid, Emerald AI, Nebius, NVIDIA and EPRI (Kraken joined DCFlex separately) cut load"),
                  ("ESB joined; no site, date or MW given (?)", "ESB joined; the page gives no site, date or MW (settled at check 2)")],
 'msDublinUPS2022': [("through Enel X it can receive EirGrid signals to 'discharge our batteries to compensate for our load', replacing fossil-fuel spinning reserve",
                      "it takes part in EirGrid's market through Enel X, and signals from 'utilities, by way of aggregators' tell it to 'discharge our batteries to compensate for our load'; this 'reduces the need to maintain spinning reserve' (it would replace fossil-plant services only 'if' adopted widely)")],
 'txSB6_2025': [("PUC to set a large-load threshold of 75 MW (s. 37.0561(c));", "PUC to set a large-load threshold of 75 MW unless it decides a lower one is needed (s. 37.0561(c));"),
                ("transmission-voltage loads must have curtailment capability before interconnection, and ERCOT must",
                 "curtailment capability for loads interconnected after 31 Dec 2025, set through an ERCOT and utility protocol with exemptions (s. 39.170(a)); and ERCOT must")],
 'eatonCA022021': [("Eaton, substation transformer catalogue CA022021EN (Jan 2020) Table 14.1-20, 2,500 kVA: H 2084.1 × W 2263.1 × D 2390.1 mm; radiators 'may be mounted on the front and back' (equipment study 29 Oct 2026, kit3d basis; not re-read tonight)",
                    "Eaton, Secondary unit substation design guide CA022021EN (Jan 2020) Table 14.1-20 (oil-filled, 600 V class), 2,500 kVA: 5/15 kV primary row HTX 2084.1 × WTX 2263.1 × DTX 2390.1 mm; 25/35 kV primary row same height, WTX 2631.4 × DTX 2491.7 mm; 'Flat, tubular or panel radiators may be mounted on the front and back of the tank' (re-read at check 2, 29 Oct 2026) — https://www.eaton.com/content/dam/eaton/products/design-guides---consultant-audience/eaton-secondary-unit-substation-design-guide-ca022021en.pdf")],
}

TOUR = ("J.B., guided tour of Cologix VAN3, 2828 Natal St, Vancouver (about 2 hours, late Oct 2026; her notes typed in chat and three lobby photos). Her words are kept where a reading could change the meaning. "
 "HER OWN DESCRIPTION OF THE SITE (where each fact came from is not stated ?): a converted industrial building, about 5 MW, multi-tenant colocation, outside-air free cooling plus magnetic-levitation chillers, Tier III. "
 "OBSERVED: no true front or arrival, entrance hard to find; a fence ('K gate fence', her words) with a video-and-voice intercom where she buzzed security; a ramp up to a front door that had to buzz her in; a vestibule with a guard in a closed-off room with 'bullet proof glass' (her words), a slot to slide ID under, massive screens and cameras; a pass, then a buzzed door into a bright lobby (photos: Cologix sign, seating, a round glass security portal, a black door marked 'NOTICE ENTER HERE' with a card reader, a glass meeting room); to the right of the lobby and open to it, a client hot-desk area with private client offices off it, a client kitchen and a client boardroom; a technicians' room down the hall with two desks and equipment; at the far right side a POP room with fibre running from the street, next to a meet-me room, both behind scanners; washrooms with lockers and showers; through the round portal ('the glass circle'), which 'weighed me and measured me' (how she knew: display or guide ?); the guide used the door to its right with 'biometrics AND a scanner'; a first-floor hall on an 18 in raised floor above the slab with a ramp up (measured or told ?); she could not see any servers; 'electrical boxes (400 A)' on the wall, VESDA and a humidifier (from 'he should be the electrical boxes…', read as 'he showed me' ?); out through a back side door at the back-left corner to a second POP and meet-me room; from that hallway a door to a loading bay with two docks and a room where clients' deliveries are stored; a freight elevator off that room. "
 "GUIDE'S CLAIMS: giving power back to the grid 'is not a thing and would never make sense' — expensive and insignificant; they cannot get enough power from the grid; even with on-site generation they would always need a substation connection and power guarantees for clients; latency-sensitive clients would never agree to share; uptime too important; maybe possible with one tenant of steady, predictable demand, still insignificant; generator testing 'the only realistic give-back'; multiple UPS systems and multiple feeds (2N) because they cannot risk an outage (Cologix's own page says N+1: cologixVAN3web); the industry is moving to liquid (glycol) to-chip cooling; 'it' is a closed loop (what 'it' refers to ?); they don't use much copper any more, it's mostly fibre; a fence 'drilled 9 feet underground'; a 24/7 guard; 'only three tenants downstairs', each in a private enclosure with 'the company biometrics and cameras' (whose company ?); every 'server box' has a sensor recording temperature and humidity, reported to a third party that monitors constantly; the second POP and meet-me room are for redundancy; clients 'come over night' (reason for the showers); the freight elevator goes to the second storey, a full floor of data hall. "
 "Unclear in her notes: 'about the with' in the client-area note (?). One visit: observations, not measurements.")

CHK2 = {  # id: 'ok' or a short fix note
 **{k: 'ok' for k in ['bchCfDRfA', 'cfdPage', 'bcUCAs1', 'bccsHeat2022', 'hcCleanAir2020', 'jibcESSqrg2012', 'bcbcGroupC', 'nbcImportance', 'edmBlatchfordBP', 'atcoDrake2024', 'cologixVAN4_2026', 'aesoAlert2024', 'emeraldPhoenix2025', 'eatonBasefarm2018', 'fortumTelia2022', 'cruLEU2025']},
 'bcReg8_2026': 'fixed at check 2: enabling section; third-year caps added (one read ?)', 'bchTariff2026': 'fixed at check 2: 25 kV rule is s. 3.7, transformation s. 3.13; RS 1830 order; EV riders',
 'cologixVAN3web': "fixed at check 2: '2N' attributed to the guide, not the page", 'bchCfDInfo2026': "'heat recovery ready' undefined: settled", 'bcucG46_25': 'fixed at check 2: capital-cost threshold; Appendix A identified',
 'bchCustGen': 'fixed at check 2: 2 MW is net injection', 'covHeat2025': 'fixed at check 2: memo title; City-owned non-market housing', 'cologixVAN1_2026': 'fixed at check 2: sheet dated April 2026',
 'aucMicro2026': 'fixed at check 2: page references (from a summary ?)', 'aesoAMS2025': 'fixed at check 2: pool-price wording; carbon already in marginal cost; gas share added',
 'edmBylaw17943': "fixed at check 2: no supply-in provision confirmed from the full bylaw", 'googleFlex2025': "fixed at check 2: 'first time' refers to the ML agreements",
 'epriDCFlexEU': 'fixed at check 2: demo partners; self-reported label', 'msDublinUPS2022': 'fixed at check 2: signals via aggregators; spinning reserve reduced, not replaced',
 'txSB6_2025': 'fixed at check 2: threshold may be lower; curtailment via protocol for loads after 2025', 'eatonCA022021': 'fixed at check 2: design guide; 5/15 kV vs 25/35 kV rows',
 'tourVAN3': 'rewritten at check 2: buckets corrected, omissions added, her wording kept',
}
QFIX = {  # quantity coef edits
 'power_allocation': [("environment 10% ('heat recovery ready', PUE, WUE — 'heat recovery ready' not defined ?)", "environment 10% ('heat recovery ready', 'power usage efficiency', 'water usage efficiency' — none defined)")],
 'crisis_events': [("checks residents of non-market housing", "checks residents of City-owned and operated non-market housing")],
 'heat_sale_rules': [("no route found for a customer to supply heat into it (?)", "no route in the bylaw for a customer to supply heat into it (bylaw read twice; the City Manager's service requirements not read ?)")],
 'transformers': [("unit: Eaton 2,500 kVA substation transformer, 2.263 × 2.39 × 2.084 m (CA022021EN);", "unit: Eaton 2,500 kVA oil-filled transformer (CA022021EN): 2.263 × 2.39 × 2.084 m with a 5/15 kV primary, 2.631 × 2.492 m footprint with a 25/35 kV primary — BC Hydro asks primary-service equipment to take 25 kV, so the larger row may apply in BC (?);"),
                  ("(BC Hydro T&C 3.12–3.13, effective 1 Apr 2026)", "(BC Hydro T&C 3.7 and 3.13, effective 1 Apr 2026)")],
 'security_layers': [("VAN3 (tour, Oct 2026): 5 — gate intercom, building door, vestibule door, single-person portal (weighs and measures; staff use a biometric and card door), tenant enclosure with its own biometrics and cameras;",
                      "VAN3 (tour, Oct 2026): 4 she passed — gate intercom, buzzed front door, buzzed door from the vestibule to the lobby, single-person portal (it weighed and measured her; the guide used a side door with 'biometrics AND a scanner'); then, by the guide's account, each tenant's enclosure with its own biometrics and cameras (5 to the servers);"),
                     ("POP and meet-me rooms behind scanner doors;", "the first POP and meet-me room behind scanners;")],
 'flexible_load': [("Microsoft's Dublin UPS batteries answer EirGrid signals through Enel X (operator claim, 2022)", "Microsoft's Dublin UPS batteries take part in EirGrid's market through Enel X and discharge on aggregator signals (operator claim, 2022)"),
                   ("Texas S.B. 6: loads of 75 MW and up must be curtailable and may be ordered onto their backup generators", "Texas S.B. 6: loads of 75 MW and up (or a lower threshold the PUC sets) connected after 2025 need curtailment capability under an ERCOT protocol, and may be ordered onto their backup generators")],
 'hall_layout': [("observed at VAN3 (tour, Oct 2026): a first-floor hall on an 18 in (457 mm) raised floor", "observed at VAN3 (tour, Oct 2026): a first-floor hall on an 18 in (457 mm) raised floor (her figure; measured or told ?)")],
 'fire_protection': [("Cologix VAN1 'Dual interlocked pre-action dry pipe'; VAN4", "Cologix VAN1 'Dual interlocked pre-action dry pipe' (sheet dated April 2026); VAN4"),
                     ("VAN3: VESDA seen on the tour", "VAN3: VESDA on the tour (her note, read as 'he showed me' ?)")],
}

for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; s = fix_dates(p.read_text()); d = json.loads(s)
    srcs = d['new_sources'] if pretty else d['sources']
    for k, edits in SRC_EDIT.items():
        if k not in srcs: continue
        for a, b in edits:
            if a in srcs[k]: srcs[k] = srcs[k].replace(a, b)
            elif b not in srcs[k]: print('MISS', f, k, a[:60])
    srcs['tourVAN3'] = TOUR
    qs = d['quantities']
    for qid, edits in QFIX.items():
        x = next((q for q in qs if q['id'] == qid), None) if pretty else qs.get(qid)
        if not x: continue
        for a, b in edits:
            if a in x.get('coef', ''): x['coef'] = x['coef'].replace(a, b)
            elif b not in x.get('coef', ''): print('MISSQ', f, qid, a[:60])
    if pretty:
        m = d['meta']; cl = m['check_log']
        for k, note in CHK2.items():
            cl.setdefault(k, [])
            if not any(c.get('check') == 2 for c in cl[k]):
                cl[k].append({'check': 2, 'by': 'independent agent run (no part in check 1)', 'date': D, 'result': 'confirmed' if note == 'ok' else note,
                              'record': 'scratchpad check2/result_' + ('A' if k in ['cologixVAN3web','bcReg8_2026','bchCfDRfA','bchCfDInfo2026','cfdPage','bcUCAs1','bcucG46_25','bchCustGen','bchTariff2026'] else 'C' if k in ['googleFlex2025','emeraldPhoenix2025','epriDCFlexEU','eatonBasefarm2018','fortumTelia2022','msDublinUPS2022','txSB6_2025','cruLEU2025','eatonCA022021'] else 'D' if k == 'tourVAN3' else 'B') + '.json'})
        for c in cl.get('bchTariff2026', []):
            if c.get('check') == 1: c['where'] = c['where'].replace('T&C s. 3.12–3.13', 'T&C s. 3.7 and 3.13')
        m['check_log_note'] = ("check_log: CHECK 1 = first read (Claude, overnight pass 29 Oct 2026); CHECK 2 = independent agent re-read the same evening. "
                               "'confirmed' = both reads agree. 'fixed at check 2' = the second reader found a difference and the entry was corrected to the source wording it quoted: "
                               "that new wording has one read, so it is the place for any third look. Items still marked '?' stay open.")
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, 'ok')
for js in ('tool/scene3d.js',):
    p = R / js; p.write_text(fix_dates(p.read_text()))
