"""Second-check batch 9 (J.B. 28 Oct 2026): first batch checked against saved copies (sources repo, data/raw), not the web.
Check 1 = sweep_results.csv; check 2 = B9_a*.json. Corrections only where both checks agree; single-check findings '?'.
Text and citations only: no engine value changes."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REPL = {
 'fortis': [('→ ≈ $39.4/MWh heat at 85%', '→ ≈ $39.4/MWh heat at 85% (our conversion)'), ('BC carbon tax zero since 1 Apr 2025', 'BC carbon tax zero since 1 Apr 2025 (not on this schedule; see bcCarbonTax2025); Municipal Operating Fee extra where applicable ?')],
 'neu9552': [('False Creek NEU By-law 9552', 'Energy Utility System By-law 9552 (the False Creek NEU)'), ('→ $32.59/MWh', '→ $32.59/MWh (our calculation)')],
 'wsa': [('licence required for open-loop cooling and heat exchange', 'designate cooling (item 4, manufacturing, processing or industrial operations) and open-loop heat exchange (item 9) as industrial-purpose water uses; the licence requirement is in the Water Sustainability Act s. 6(1)')],
 'manitobaGH': [('2.1 GJ/m²·yr', '2.1 GJ/m² per September–May heating season (double-poly greenhouse; archived page)')],
 'edmParking': [('s.54.1 (superseded)', 's.54.1 (Bylaw 12800 repealed when Zoning Bylaw 20001 took effect, 1 Jan 2024; the saved page does not say so)')],
 'm104': [('and BCUC G-66-19', 'and BCUC G-66-19 (?: the order number is not in the saved file, whose attachment is a draft "G-xx-xx")')],
 'dea': [('(2025 EUR): sheets 40', '(2025 EUR; sheet numbers, price year and sizes read from the xlsx once, not re-checked ?): sheets 40')],
 'statcanSHS': [('household energy spend $2,535 (2019)', "household spending on 'water, fuel and electricity for principal accommodation' (includes water) $2,535 (2019 ?)")],
 'quebecRejets': [("$40 M grant to Île d'Orléans greenhouses on QScale Lévis heat", "$40 M in financial assistance to the producer Les fraises de l'Île d'Orléans for 12 ha of greenhouses near the QScale data centre in Lévis, heated by it")],
 'wahlroos2018': [('Future views on waste heat utilization —', 'Future views on waste heat utilization – Case of data centers in Northern Europe —')],
 'eccc': [('— J.B. download;', '— J.B. download (station CSVs not re-checked; the saved web page is the landing page only ?);')],
 'vanTax': [('(1.55 M rows, 2006–)', '(1.55 M rows ?, 2006–; one check counts 228,921 rows in the saved export)'), ('(schema confirmed 10 Oct 2026)', '(schema confirmed from the data 10 Oct 2026; the saved web page does not show it)')],
 'vanFoot': [('(schema confirmed 10 Oct 2026)', '(schema confirmed from the data 10 Oct 2026; the saved web page does not show it)')],
 'wes': [('(BCUC proceeding 1396; decision pending as of 11 Oct 2026; BC Hydro final argument 6 Aug 2026)', '(BCUC proceeding 1396; decision pending as of 11 Oct 2026; BC Hydro final argument 6 Aug 2026 ?: these details are not on the saved project page)')],
 'nir2026': [('Tables A7-1 (Canada), A7-10 (Alberta), A7-11 (British Columbia)', 'Tables A7-1 (Canada), A7-10 (Alberta), A7-11 (British Columbia) (?: workbook not in the saved copies; only the landing page)')],
 'dkPrisloftFAQ': [('Forsyningstilsynet FAQ on the surplus-heat price cap:', 'Forsyningstilsynet, FAQ Prisloft på overskudsvarme (v2, 1 Nov 2023):')],
 'van3575s2': [('https://bylaws.vancouver.ca/zoning/zoning-by-law-section-2.pdf', 'https://bylaws.vancouver.ca/zoning/Sec02.pdf (by-law number not printed in the section file)')],
 'vanDistricts': [('Vancouver district schedules (Jun 2026 / Nov 2025):', 'Vancouver district schedules (Jun 2026 / Nov 2025; only the I-2 schedule re-checked, the others ?):')],
 'gvsddUT008': [('letter of support from the host municipality', "letter of support from the 'host member jurisdiction'"), ('https://metrovancouver.org/services/liquid-waste/Documents/sewage-waste-heat-recovery-policy.pdf', 'https://metrovancouver.org/boards/Policies/sewage-and-waste-heat-recovery.pdf')],
 'neuSewage': [("expansion 'an additional 6.6 megawatts'", "expansion of 6.6 MW (two 3.3 MW heat pumps; the phrase 'an additional 6.6 megawatts' is not on the saved page ?)")],
 'rts06419': [('2.5 MW sewage heat base, COP ~3, $59/MWh levelized', "2.5 MW sewage heat as a comparison size, heat-pump 'efficiency rating of 300%', $59/MWh levelized over 25 years (2006 $, with gas peaking; staff estimate); the report recommended biomass for Phase 1")],
 'vanACC': [('effective 30 Sep 2026, in addition to DCLs', "effective 30 Sep 2026 (recommended, approved in principle; enactment not checked ?), 'Commercial & Other'; levied with DCLs")],
 'vanCAC': [('100 % commercial, industrial and institutional are exempt', '100 % commercial, industrial and institutional (hospital, post-secondary, care facility) are exempt')],
 'vanDCFC': [('City of Vancouver, EV charging by-law amendment, DCFC 25–400 kW', "City of Vancouver, Council report (6 Jul 2021) recommending EV charging requirements in new non-residential buildings, with a draft Parking By-law 6059 amendment: DCFC 'typically' 25–400 kW (enacted wording not checked ?)")],
 'vbblHDD': [('Table 1.1.3.1, HDD 2,925', 'Table 1.1.3.1.A, degree-days below 18 °C 2,925 (2014 edition; current edition ?)')],
 'altaReg117': [('CanLII, current as posted 2026-06-17, retrieved 2026-10-11', 'King\'s Printer text current as of 9 Jun 2026 (the CanLII copy and retrieval date are not in the saved file ?)')],
 'cimd': [('Census 2021 DA boundaries', 'Census 2021 DA boundaries (not named on the record ?)')],
 'gridBC': [('BC 2025 consumption-based grid factor 22.8 tCO2e/GWh (2024: 9.9)', 'BC 2025 consumption-based factor for the Integrated Grid 22.8 tCO2e/GWh (2024: 9.9; Fort Nelson differs)')],
 'edmLDA26': [("where nuisances are minimal and contained on site", "'provided that associated nuisances are shown to be minimal and mainly contained on site'")],
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
TXT = [('FCNEU: 2006 design 2.5 MW base sewage heat, COP ~3,', "FCNEU: 2006 comparison size 2.5 MW sewage heat, 'efficiency 300%',")]
def fix(t):
    for a, b in TXT: t = t.replace(a, b)
    return t
r = json.loads(fix(json.dumps(r, ensure_ascii=False))); o = json.loads(fix(json.dumps(o, ensure_ascii=False)))
reg.write_text(json.dumps(r, ensure_ascii=False, indent=1)); op.write_text(json.dumps(o, ensure_ascii=False, separators=(',', ':')))
print('applied', len(done), 'of', len(REPL), 'miss', miss)
