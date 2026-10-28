"""Second-check batch 6 (J.B. 28 Oct 2026): 50 'Found' sources. Check 1 = checks/sweep/sweep_results.csv; check 2 =
checks/sweep/B6_a1..a5.json. Corrections only where both checks agree; a finding from one check only is marked '?'.
Text and citations only: no engine value changes."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REPL = {
 'receiversBCUC': [('Sen̓áḵw DES 10,343 kW peak, 11,218 MWh/yr (C-5-23)', 'Sen̓áḵw DES 10,343 kW design heating peak, 11,218 MWh/yr modelled heating demand, Phases 1–2 (C-5-23)'),
                   ('~33,600 MWh/yr (C-3-23)', '~33,600 MWh/yr at full build-out, 2047 (C-3-23)')],
 'stratego': [('STRATEGO / Heat Roadmap Europe D2.2 hourly distributions', 'Connolly et al. 2015, STRATEGO (IEE/13/650) WP2 Background Report 2, D2.2, Creating Hourly Profiles to Model both Demand and Supply (hosted on the Heat Roadmap Europe site)')],
 'van6555zones': [('(consol. 14 Jul 2026)', '(consol. 14 Jul 2026 ?: one check reads 20 May 2025)'),
                  ('activity→quiet 60 / 55;', 'activity→quiet 60 / 55; intermediate→quiet 60 / 50;'),
                  ('no ambient credit for equipment', 'no ambient credit for equipment (our reading: not stated)')],
 'vanNEU2025': [('100% renewable by 2030', 'the City is evaluating options for 100% renewable by 2030 (not a commitment)'), ('(web page, modified 21 May 2025)', '(web page, modified 21 May 2025 ?)')],
 'vanTaxRates2026': [('and rates by-laws a2–a5', 'and rates by-laws a2–a5 (? a3 is a resolution)')],
 'van_genroom': [('(Building By-law bulletin 2000-015; VBBL 3.6.2.8)', '(Building By-law bulletin 2000-015, rev. 5 Oct 2015; Div. B 3.6.2.8; VBBL edition not printed)')],
 'abEGDF': [('v3.1 (Feb 2023), v3.2 (Aug 2025), v3.3 (Aug 2026)', 'v3.1 (Feb 2023 ?: alberta.ca shows updated 31 Jan 2023), v3.2 (Aug 2025), v3.3 (Aug 2026) (the Aug dates on alberta.ca are effective dates; check each cover; publisher not printed on the page ?)')],
 'abMicrogen': [("capacity 'that does not exceed five (5) megawatts' (AUC)", "capacity up to 5 MW (the AUC guideline reads 'the lesser of five megawatts or the rating of the customer's service'; not quoted on this page)"),
                ('(alberta.ca, 2 Mar 2026)', '(alberta.ca; "2 Mar 2026" not shown, page metadata 23 Oct 2026)')],
 'ab_p1701': [('Reclaimed water systems — single property', 'Reclaimed Water Systems within a Single Property')],
 'abgas': [('ATCO North Mid-Use $1.062/GJ', 'ATCO North Mid-Use $1.062/GJ (?: not on this page; needs the ATCO rate schedule)')],
 'abConsult': [("until consultation is complete;", "until consultation is complete (?: quote not found by either check);"),
               ('(EPA fact sheet 20 Jul 2026)', '(EPA fact sheet 20 Jul 2026, a separate document)')],
 'abElectronicsReg': [('(read from a legislation summary, official text not read)', '(read from a legislation summary and the open.alberta.ca record, which designates "computers, computer equipment and televisions"; regulation number and official text not read ?)')],
 'abRFS2026': [('(RFS resources page, 9 Oct 2026; fact sheet 12 Jan 2024)', '(RFS resources page, 9 Oct 2026; fact sheet 12 Jan 2024; page dates ?; "bio-based diesel" ?)'),
               ('No carbon-intensity limit on the fuel pool, unlike BC', 'No carbon-intensity limit on the fuel pool, unlike BC (our reading: not mentioned)')],
 'vanQuebecSt2020': [('(≈5 months)', '(≈5 months, our calculation; the PDF\'s cover email says 3rd–5th Ave and complete by October 2020)')],
 'pcicWx3': [('(PCIC-WX-3.0.1, 27 Jan 2025)', '(PCIC-WX-3.0.1, 27 Jan 2025 ?: version string and date not confirmed; PCIC says updated to v3 in Dec 2024)'),
             ("'Heat waves or cold spells remain largely unchanged'", "'the frequency and duration of persistent events such as heat waves or cold spells remain largely unchanged'")],
 'statcanHousehold': [('(2011–2021, biennial)', '(2011–2021 ?, biennial ?: listing shows 2011–2019, frequency "As Needed")')],
 'vanUndrip': [("(endorsed 25 Oct 2022;", "(report 25 Oct 2022 ?;"), ("(endorsed 25 Jun 2024; 'early engagement threshold points', in progress)", "(endorsed 25 Jun 2024; 'early engagement threshold points', in progress; ?: Action Plan not checked)")],
 'waterHardness2026': [('EPCOR Edmonton 2021 Rossdale avg 170 (137–203), E.L. Smith 169 (143–201)', 'EPCOR Edmonton 2021 Rossdale avg 170 (137–203), E.L. Smith 169 (143–201) (?: not checked; source not given)'),
                       ('Edmonton water is about eight times harder', 'Edmonton water is about eight times harder than Capilano/Seymour water (our calculation)')],
 'abWaterAct2021': [('(fact sheets 2021)', '(fact sheets 2021 ?: not checked; no link)')],
 'sailor2026': [('Hot-desert summer, large facilities', 'Hot desert, June–October traverses, large facilities')],
 'van9552': [('consolidated to By-law 14524 (effective 1 Jan 2026)', 'consolidated to By-law 14524 (effective 1 Jan 2026; ? the online consolidation read by one check is to 12 May 2020)')],
 'vanParking5': [('s. 5 (May 2026)', 's. 5 (May 2026 ?: page stamps run Sep 2012 to Nov 2021)')],
 'voaComputerCentres': [('Rating Manual s. 281 Computer centres', 'Rating Manual section 5a / section 6 part 3, Computer centres ("s. 281" ?)'), ("vacated first-generation centres 'tend to remain unoccupied", "vacated '1st generation' centres 'tend to remain unoccupied")],
 'van_zdb_i1c': [('I-1C District Schedule (current)', 'I-1C District Schedule (dated November 2025; current ?)')],
 'van_zdb_s2': [('Section 2 (definitions: Bulk Data Storage), June 2026', 'Section 2 (definitions: Bulk Data Storage), June 2026 (? one check reads footers to June 2018; the Bulk Data Storage page May 2018; by-law number not printed)')],
 'abEF2026': [('Handbook v3.3, Aug 2026', 'Handbook v3.3, Aug 2026 (?: the open.alberta.ca page read shows v3.1, 2022–23; publisher not printed)')],
 'abPWR277': [('owned and operated by anyone other than a municipality, development owner or similar', 'owned and operated by anyone other than the owners listed in clause (i) (local authorities and others; our paraphrase ?)')],
 'abRainwater2010': [('size with 20% dead space;', 'size with 20% dead space if unknown;'), ('residential only, commercial referred to federal reclaimed-water guidance;', 'primarily residential; other buildings pointed to the draft 2007 Canadian Guidelines for Domestic Reclaimed Water for toilet and urinal flushing ?;')],
}
reg = R / 'register/formula_register.json'; r = json.loads(reg.read_text())
op = R / 'tool/opps.json'; o = json.loads(op.read_text())
done, miss = set(), []
for d in (r['new_sources'], r['old_sources'], o['sources']):
    for i, reps in REPL.items():
        if i in d:
            for a, b in reps:
                if a in d[i]: d[i] = d[i].replace(a, b, 1); done.add(i)
                elif b not in d[i]: miss.append((i, a[:40]))
reg.write_text(json.dumps(r, ensure_ascii=False, indent=1)); op.write_text(json.dumps(o, ensure_ascii=False, separators=(',', ':')))
print('applied', len(done), 'of', len(REPL), 'miss', miss)
