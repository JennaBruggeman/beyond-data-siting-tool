"""Second-check batch 11 (J.B. 28 Oct 2026), checked against saved copies. Check 1 = sweep_results.csv; check 2 =
B11_a*.json. Corrections only where both checks agree; single-check findings '?'. Text and citations only."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REPL = {
 'abBill22': [('as introduced 22 Feb 2022:', 'as introduced 22 Feb 2022 (date from the file name, not printed):'), ('consumed solely on that property by that owner or tenant"', 'consumed solely on that property by that owner or tenant" (the clause continues with an exception for Commission-approved tariff rates, s. 122(2)(b) ?)')],
 'abAltSol2021': [('reuse beyond toilet and urinal flushing or sub-surface irrigation needs an alternative solution', "reuse 'may require an approved alternative solution' (toilet and urinal flushing and sub-surface irrigation 'may not'; ? one check reads the rest as overstated)"), ('from Alberta Environment may be needed; projects serving more than one property are led by Alberta Environment', 'from Alberta Environment and Parks may be needed; projects serving more than one property are led by AEP ?')],
 'vanZDBs10': [('I-2, I-3, I-1C, FC-2, M-1, C-2 have no roof screening clause; IC-2 s. 4.2.4 (Burrard sites) and 2.2.1(e) require screening from streets and R districts', 'I-2, I-3, I-1C, FC-2, M-1, C-2 have no roof screening clause; IC-2 s. 4.2.4 (Burrard sites) and 2.2.1(e) require screening from streets and R districts (?: these are in the district schedules, not Section 10; not re-checked)')],
 'vanR3R4R5': [('R1-1 "Residential Inclusive" and RT- districts are the small-scale housing districts ("retaining the single lot character")', 'R1-1 "Residential Inclusive" and RT- districts are the small-scale housing districts ("retaining the single lot character") (?: not in this guide; needs the district schedules); heights are the maximums for the standardized rezoning options')],
 'fairfaxDC2024': [('generators 300 ft from homes', 'generators 300 ft from the residential lot line (or separated by the data-centre building; less by special exception)'), ('(adopted 10 Sep 2024; news release and May 2024 staff report)', '(adopted 10 Sep 2024; news release; May 2024 staff report not in the saved copy ?)')],
 'loudounDC': [('facade treatment on all sides', 'principal facade treatment on all sides adjacent to residential property and other listed uses (parks, religious assemblies, farm wineries)')],
 'fhwaBarrier': [('FHWA noise barrier inventory to 2010, US$/ft²:', 'FHWA noise barrier inventory to 2010, 2010 $/ft²:'), ('WSDOT current average $51.61/ft².', 'WSDOT current average $51.61/ft² (?: not in this source).'), ('; dollar basis not confirmed', '')],
 'bchExtension2026': [('minimum underground three-phase service connection $1,520', 'underground three-phase service connection charge ("minimum" ?) $1,520')],
 'dunskyNRCan2024': [('grid upgrades excluded;', 'utility upgrades included per s. 2.5.1 although the executive summary says excluded (the report is inconsistent ?); wider grid upgrades estimated separately (s. 5.3);')],
 'cfsPlus': [('— https://www.cfsalberta.ca/donate.php', '(?: the BC affiliate, ISED page and Windows 11 point are not in the saved Alberta donate page; "recycles servers, switches, UPSs and lead batteries" not confirmed) — https://www.cfsalberta.ca/donate.php')],
 'nfpa855_2026': [('rooftop units over 20 kWh:', 'rooftop units over 20 kWh (the 3 ft unit spacing is in 9.6.3.1.1.3(5), for units of 20 kWh or less ?):')],
 'uptimeTiers': [('Tier I — basic capacity, no redundant components;', "Tier I — 'the basic capacity level' ('no redundant components' is our summary ?);")],
 'vanStreets2026': [('updated by the City 27 Jul 2026)', 'updated by the City 27 Jul 2026 ?: not in the saved file)'), ('17,072 street centreline segments', '17,072 street centreline segments (our row counts)')],
 'epcorGoldBar2026': [('at 50 St NW and Goldbar Park Road NW;', "near 50 St NW and 'Gold Bar Park Road' (the page gives the tour start, not the plant's address);")],
 'statcanGH2021': [('total greenhouse area in use —', 'total greenhouse area in use (only the Canada row is in the saved page; other rows from J.B.\'s downloads, not re-checked ?) —')],
 'abWells2026': [('(J.B. downloads 16 Oct 2026; nine reports, 3,844 records parsed; owner names not kept)', '(J.B. downloads 16 Oct 2026; nine reports, 3,844 records parsed; owner names not kept; the counts and medians are our parse, not re-checked ?)')],
 'ceedcIEF2026': [('(J.B. 16 Oct 2026; 254 facilities; figures reported 2014–2023; some withheld as confidential)', "(J.B. 16 Oct 2026; 254 facilities; figures reported 2014–2023; 'SFU' and 'confidential' not printed in the workbook ?)"), ("VGH and BC Children's central plants (no figures)", "VGH and BC Children's central plants (? one check finds a 27.97 MW figure for BC Children's)")],
 'ceud2023com': [('Tables 15, 17, 19:', 'Tables 15, 17, 19 (the xls files are not in the saved copies; values not re-checked ?):')],
 'estarMedian2018': [('NRCan / ENERGY STAR Portfolio Manager, Canadian Energy Use Intensity by Property Type', 'ENERGY STAR Portfolio Manager (NRCan as publisher ?), Canadian Energy Use Intensity by Property Type')],
 'nrcanEV2026': [('within the tool\'s Vancouver extent 544 open stations', 'within the tool\'s Vancouver extent (our counts, open and public) 544 open stations')],
 'vanNEUlevy2025': [('Earlier: 2025 rates (report 25 Nov 2024):', 'Earlier (?: not re-checked; not in the by-law): 2025 rates (report 25 Nov 2024):')],
 'abEUA2026': [('s. 2(1)(b) the Act does not apply to self-supply "consumed solely on that property by that owner or tenant";', 's. 2(1)(b) the Act does not apply to self-supply "consumed solely on that property by that owner or tenant", except for Commission-approved tariff rates (s. 122(2)(b));'), ('(CanLII, read by Claude 15 Oct 2026;', '(read by Claude 15 Oct 2026; saved copy is the King\'s Printer consolidation;')],
 'nfpa37clear': [('at least 5 ft (1.5 m)', 'at least 5 ft (1.5 m, our conversion)'), ('Vancouver bulletin 2000-015 points to CSA C282 (paywalled, not read)', 'Vancouver bulletin 2000-015 points to CSA C282 (a separate source; C282 paywalled, not read)')],
 'lpc50Hudson': [('judged not visible from the street;', 'with the mechanical bulkhead and penthouse judged not visible from public thoroughfares (applied to the screened units ?);')],
 'vanCTseminar2021': [('confirmed against VBBL Art. 6.3.2.15 (see vbbl2025_63215)', 'the VBBL text itself is in vbbl2025_63215, which confirms the figures')],
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
