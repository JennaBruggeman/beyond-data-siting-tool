"""Second-check batch 12 (J.B. 28 Oct 2026), checked against saved copies. Check 1 = sweep_results.csv; check 2 =
B12_a*.json. Corrections only where both checks agree; single-check findings '?'. Text and citations only."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REPL = {
 'majdabadi2026': [('Majdabadi, Irandoostshahrestani and Koohi-Fayegh (2026)', 'Mahmoudi Majdabadi, Irandoostshahrestani and Koohi-Fayegh (2026)'), ('with limited overall savings in Edmonton (Climate Zone 6)', 'with limited overall savings in Edmonton (Climate Zone 6; the paper also says Zone 7 ?)')],
 'abGreenhouse2023': [('53 growers, 909,443 m² surveyed', '56 completed questionnaires from 41 greenhouse operations, 909,443 m² surveyed'), ('about 85% of growers heat with natural gas, 9% propane (2019–20)', 'about 85% of growers heat with natural gas, 9% propane (2019–20, from the 2019 profile report ?)')],
 'vanWaterPermits': [('— https://opendata.vancouver.ca', '(?: counts not re-checked; the saved page is the companion water-quality dataset) — https://opendata.vancouver.ca')],
 'edmBEB6': [('voluntary programme with BOMA Edmonton;', "programme with BOMA Edmonton as 'a founding partner' ('voluntary' ?);"), ("Vancouver's equivalent is required reporting for buildings ≥100,000 ft²", "Vancouver's equivalent is required reporting (see vanEnergyReport; not in this source)")],
 'aesoP2Aupd2026': [('AESO, Large Load Integration Phase 2A BYOG Process Update, stakeholder session deck (18 Jun 2026, updated 24 Jun 2026).', "AESO, Large Load Integration Phase 2A, 'BYOG Process Proposal' stakeholder session deck (18 Jun 2026; 'updated 24 Jun' is from the file name ?)."), ('About 20 GW of data-centre load requested each quarter since Q2 2025 (19.2 GW Q2 2026).', 'About 20 GW of data-centre load requested each quarter since Q2 2025 (19.2 GW Q2 2026; ? one check reads Q2-25 19.6 and Q3-25 21.4 GW from the chart).')],
 'edm7140sun': [("s. 7.140 Special Information Requirements, subs. 9 Sun Shadow Impact Study:", "s. 7.140 Special Information Requirements, subs. 9 Sun Shadow Impact Study (other zones' shadow clauses not fully listed ?):")],
 'edmPermitsDC2026': [('(value and floor area as entered on the permit; floor area may be the work area or the building; no MW stated)', '(value and floor area as entered on the permit; floor area may be the work area or the building; the export gives no unit and some areas look like ft², so $/m² may be up to 10.76× higher ?; no MW stated)')],
 'cerProfiles2026': [('BC 2021 generation 71.7 TWh, shares by source not given in text — capacity hydro 15,953 of 18,514 MW (≈86%)', 'BC 2021 generation 71.7 TWh, shares by source not given in text — capacity hydro 15,953 of 18,514 MW (≈86%) (BC page not in the saved copies ?)')],
 'waterUse2026': [('Residential water use:', 'Residential water use (only the StatCan release is saved; EPCOR and provincial values not re-checked ?):')],
 'vanLight2019': [('Vancouver Building By-law 2019, 10.2.2.10(2)', 'Vancouver Building By-law 2019, 10.2.2.10(2) (?: not in the saved copies; only By-law 4548 is)')],
 'smoke2026': [('Metro Vancouver had a 14-day wildfire smoke advisory in 2018', 'Metro Vancouver (?: needs its own source; not in the saved Alberta page) had a 14-day wildfire smoke advisory in 2018')],
 'nfcAB2023_4313': [('Vancouver: Fire By-law 14419 adds no quantity limits to the BC Fire Code', 'Vancouver: Fire By-law 14419 adds no quantity limits to the BC Fire Code (see vanFire14419; not in this source)'), ('identical to NFC 2020 —', 'identical to NFC 2020 (?) — Table -B (emergency generators):')],
 'ecccEF2026': [('HHV Table 8, 38.39 MJ/m³)', "HHV Table 8, 38.39 MJ/m³, which ECCC takes from the Clean Fuel Regulations Data Workbook)")],
 'vanHeatPolicy': [('and Climate Change Adaptation Strategy 2024–25 update: heat mapping, 30% canopy by 2050;', '(Climate Change Adaptation Strategy 2024–25 update not checked ?): heat mapping; 30% canopy by 2050 (Urban Forest Strategy);')],
 'bcDispersion': [('BC Ministry of Environment,', 'BC Ministry of Environment and Parks,')],
 'abModelGuideline': [("AERSCREEN 'recommended'", "AERSCREEN 'the U.S. EPA recommended screening model'")],
 'nrcanPV2024': [('with NRCan municipal yields ≈ 128 kWh/m² of footprint a year in Vancouver and 159 in Edmonton', 'with NRCan municipal yields ≈ 128 kWh/m² of footprint a year in Vancouver and 159 in Edmonton (our derivation); North Vancouver is in the sample')],
 'vanI2Ground': [('data storage not permitted at grade (ground floor kept for other uses)', "Bulk Data Storage not permitted at the ground floor 'except for entrances' (in I-2 district-wide); I-3 and FC-2 clauses not in the saved copy ?")],
 'nbc2020Live': [('(US VA design manual ≈ 6.0 kPa, 125 psf — claim-level transfer)', '(US VA design manual ≈ 6.0 kPa, 125 psf — claim-level transfer; not re-checked ?)'), ('NBC 2023 Alberta Edition Table 4.1.5.3 read 19 Oct 2026', 'NBC 2023 Alberta Edition Table 4.1.5.3 read 19 Oct 2026 (copy not in the saved set ?)')],
 'ftaVibration': [('vibration criteria 72 VdB residences (night), 75 institutional, 65 vibration-sensitive rooms (values read from a 2021 FRA reproduction)', "vibration criteria 72 VdB 'buildings where people normally sleep', 75 institutional, 65 vibration-sensitive rooms, for frequent events (criteria vary with event frequency ?)")],
 'bcucG34522A': [('29 Nov 2022, with errata', "29 Nov 2022 (the 'A' order dated 16 Mar 2023; separate errata notice ?)")],
 'bcucG17926': [('permanent 2026 rates averaging $14.78', 'permanent 2026 rates (as adjusted under ss. 2.1.2 and 2.1.4 ?) averaging $14.78'), ('until the New Beatty Energy Center is completed (to 2029)', "until the New Beatty Energy Center is completed (completion 'remains uncertain'; 2029 is the sustainment-capital horizon)")],
 'uofaEERMP2021': [('programme of $3.56 M, 375,600 GJe, 30,450 t CO2e (savings valued at 2020/21 utility costs)', 'annual savings from the past Energy Management Program 2003–12 of $3.56 M, 375,600 GJe, 30,450 t CO2e (Appendix A ?); laboratories 2.5× on p. 4, "twice" on p. 13')],
 'alta117_2026': [("(King's Printer extract, current as of 9 Jun 2026; J.B. PDF 16 Oct 2026)", "(King's Printer extract, current as of 9 Jun 2026; J.B. PDF 16 Oct 2026; the saved file for this id is the catalogue page, the text is under altaReg117)")],
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
