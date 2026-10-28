"""Second-check batch 10 (J.B. 28 Oct 2026), checked against saved copies. Check 1 = sweep_results.csv; check 2 =
B10_a*.json. Corrections only where both checks agree; single-check findings '?'. Text and citations only."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REPL = {
 'thermalLimits': [("proposed Burrard Inlet objective 'No further increase in temperature' (Jul 2024); Alberta Surface Water Quality Guidelines 1999 'Not to be increased by more than 3°C above ambient'", "proposed Burrard Inlet objective 'No further increase in temperature' (Jul 2024 ?: not re-checked); Alberta Surface Water Quality Guidelines 1999 'Not to be increased by more than 3°C above ambient' (see abSWQG1999); CCME as reprinted in the BC report")],
 'enwaveDLWC': [("water drawn at 4 °C, returned at ≤13 °C; 50-year Energy Transfer Agreement to 2054; serves 'over 80 buildings … including data centers' (DLWC Expansion EA 2020)", "water drawn at 4 °C, returned at ≤13 °C (2000 report, not re-checked ?); Energy Transfer Agreement to 2054, with an extension to 2064 proposed in 2019; serves 'over 80 buildings … including data centers' (?: not in the saved reports or the 2020 EA notice)")],
 'epcorDASSAS': [("— https://www.epcor.com/content/dam/epcor/documents/rates/distribution-access-service-tariffs/2026-01-distribution-access-service-tariff.pdf", "— DAS figures: https://www.epcor.com/content/dam/epcor/documents/rates/distribution-access-service-tariffs/2026-01-distribution-access-service-tariff.pdf ; SAS figures: https://www.epcor.com/content/dam/epcor/documents/rates/system-access-service-tariffs/2026-01-system-access-service-tariff.pdf")],
 'lbnlCapture': [("NREL/TP-2C00-62905: RackCDU 'up to 64% of server heat'; Heydari et al. 2024 Appl. Therm. Eng. 239:122122 cold plate 94 %;", "NREL/TP-2C00-62905: RackCDU 'up to 64% of server heat' (?: not checked); Heydari et al. 2024 Appl. Therm. Eng. 239:122122 cold plate 94 % (?: not checked);")],
 'edmPermits': [("incl. office → data centre (2009, 2011), warehouse → data centre (17204 114 Ave NW, 2015, 2020)", "incl. a new data centre inside an office (2009, 2011) and the expansion of an existing data centre into an empty warehouse (17204 114 Ave NW, 2015, 2020) (one check reads these as narrower than 'office/warehouse → data centre' ?); dataset id not in the export ?")],
 'lbnlLife': [("average server lifetime 'is 4.4 years, increasing", "'the lifetime assumption for 2000–2019 is 4.4 years', increasing"), ("https://climate.mit.edu/sites/default/files/2025-02/lbnl-2024-united-states-data-center-energy-usage-report.pdf", "https://climate.mit.edu/sites/default/files/2025-02/lbnl-2024-united-states-data-center-energy-usage-report.pdf (an MIT-hosted copy; LBNL record https://eta-publications.lbl.gov/bibcite/reference/36455 ?)")],
 'census2021DA': [("(98-401-X2021006, BC and Prairies files)", "(98-401-X2021006, BC and Prairies files ?: the saved profile files are census-subdivision level; product codes not confirmed)")],
 'statcanEP2024': [("Canada 5.6 %, BC 4.9 %, Alberta 7.3 %;", "Canada 5.6 %, BC 4.9 %, Alberta 7.3 % (all households; Table 2 gives 5.5 / 4.8 / 7.2 for non-farm, non-reserve households);"), ("provincial only.", "provinces and territories only."), ("CUSP's tool is no longer at energypoverty.ca (observed 13 Oct 2026)", "CUSP's tool is no longer at energypoverty.ca (our observation, 13 Oct 2026; not from this source)")],
 'isedPrinciples': [("(3 Sep 2026)", "(3 Sep 2026 ?: date not printed on the saved page)")],
 'odef': [("(released 28 Nov 2022; archived)", "(metadata dated 28 Nov 2022; web page release 13 Dec 2024, issue 2022001; 'archived' ?)")],
 'qcRejets2026': [("Gouvernement du Québec (MELCCFP), Valorisation des rejets thermiques: S. Gagnon, Vecteur Environnement, Mar 2026", "S. Gagnon (MELCCFP), 'Développer l'IA ou décarboner le Québec ? On peut faire les deux !', Vecteur Environnement, Mar 2026 (printed title ?)")],
 'opdcOldOak': [("£36M to heat over 9,000 homes from data centres", "£36M to keep 'thousands of homes' warm with data-centre heat (9,000 is the homes Old Oak West will deliver, not homes heated ?)")],
 'van_vbbl2019_27': [("Div. B, Art. 2.7.1.2", "Div. B, Section 2.7 (Art. 2.7.1.2 ?)")],
 'fortisAB2026': [("FortisAlberta rates effective 1 Oct 2026 (AUC 30274-D01-2025):", "FortisAlberta rates schedule (Oct 2026 edition); Rate 63 approved in AUC 30274-D01-2025, effective 1 Jan 2026 (the 1 Oct 2026 date is for a rider ?):")],
 'bch_esi': [("BC Hydro, Energy Storage System Incentive", "BC Hydro, Energy storage incentive (page title ?)")],
 'neuConnect': [("building supply 60 °C year-round", "building supply 60 °C at design conditions ('year-round' is our word ?)"), ("must be achieved under all conditions'", "must be achieved under all conditions' except when domestic hot water recirculation is the only load")],
 'epcorReclaimed': [("EPCOR 2024 Edmonton Wastewater Quality Annual Report p.11:", "EPCOR Water Services, 2024 Annual Wastewater System Report (Feb 2025), Part I p.10 (PDF p.14; title and page ?):")],
 'stavangerBTES2023': [("borehole life could fall \"from 30 to 10 years\" (study)", "borehole life 'may' fall \"from 30 to 10 years\" when heat is stored above 75 °C (conference abstract)")],
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
TXT = [("Old Oak, London is proposed (OPDC: over 9,000 homes, 2026–2040).", "Old Oak, London is proposed (OPDC: 'thousands of homes', about 95 GWh across five phases, 2026–2040; 9,000 is the homes the development will deliver).")]
def fix(t):
    for x, y in TXT: t = t.replace(x, y)
    return t
r = json.loads(fix(json.dumps(r, ensure_ascii=False))); o = json.loads(fix(json.dumps(o, ensure_ascii=False)))
reg.write_text(json.dumps(r, ensure_ascii=False, indent=1)); op.write_text(json.dumps(o, ensure_ascii=False, separators=(',', ':')))
print('applied', len(done), 'of', len(REPL), 'miss', miss)
