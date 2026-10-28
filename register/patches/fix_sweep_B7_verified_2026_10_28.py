"""Second-check batch 7 (J.B. 28 Oct 2026): 50 'Found' sources; 38 rerun after the web limit reset (B7_a6.json). Check 1 =
checks/sweep/sweep_results.csv; check 2 = checks/sweep/B7_a*.json. Corrections only where both checks agree; a finding
from one check only is marked '?'. Text and citations only: no engine value changes."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REPL = {
 'abpCruiserath': [('flue-stack finishes set by condition', 'flue-stack finishes to be agreed with the planning authority (Cond. 6(a)) ?; "screened plant" is in the development description')],
 'aesoAMS2025': [('Alberta is an energy-only market:', 'Our reading, not from this source: Alberta is an energy-only market:')],
 'aesoConnect': [('generation and storage indicative weeks — Stage 1 14, Stage 2 39, Stage 3 55, Stage 4 30; only where transmission is needed', 'generation and storage indicative weeks — Stage 1 14, Stage 2 39, Stage 3 55, Stage 4 30 (? the graphic\'s week figures read unclearly; a newer quick reference, V1 27 May 2025, gives no durations); targets, not achieved times; process used when a System Access Service Request needs transmission facilities')],
 'aesoList': [('field guide https://www.aeso.ca/assets/AESO-Connection-Project-List-Guide-v2.pdf', "field guide 'AESO Connection Project List Guide' V1.5, 25 Feb 2025 https://www.aeso.ca/assets/AESO-Connection-Project-List-Guide-v2.pdf (the list itself: J.B. download, not checked online ?)")],
 'aesoP2A2026': [('Working group included eStruxture, IREN, Beacon AI Centers and generators', 'Working group included eStruxture, IREN, Beacon AI Centers, Capital Power, TransAlta, Dow, Imperial Oil and others'), ('expected in fall 2026', 'expected in the fall (2026 inferred from the page date ?)')],
 'aesoPerf': [('AESO connection process performance, April 2026', 'AESO, Connection Process Performance Update, April 2026 (Sep 2023 – Mar 2026)')],
 'aesoTariff5': [("new participants pay a share;", "the ISO 'may assess' construction contributions to new participants (discretionary ?);"), ('no refund under $10,000', 'no adjustment (payment or refund) under $10,000 ?')],
 'ags_edmonton': [('Alberta Geological Survey, ground thermal properties near Edmonton (Hastings Lake test; design k 1.9 W/m·K, 6.1 °C)', 'Alberta Geological Survey OFR 2009-09, ground thermal properties near Edmonton (Hastings Lake tests 2.01 and 1.74 W/m·K; k 1.9 W/m·K used in modelling ("design" ?); 6.1 °C)')],
 'armaElectronics': [('"Blade (rack mount), desktop and floor standing servers" covered, for consumer, industrial or commercial use;', '"Blade (rack mount), desktop and floor standing servers" covered, for consumer, industrial or commercial use (wording from the Electronics Products, Definitions and Fees PDF, https://files.albertarecycling.ca/Electronics_Products-Definitions-and-Fees.pdf, not the registry page; single check ?);')],
 'arupManx2013': [('https://planningportal.im/md/docs/1314840.md', 'https://planningportal.im/md/docs/1314840.md (a copy of the Isle of Man public register ?; school limits are 35 dB internal and 45 dB external)')],
 'ashrae': [('free-cooling hours by bin from CWEC hourly weather (Formulas sheet)', 'free-cooling hours by bin from CWEC hourly weather (our own calculation, not from ASHRAE; Formulas sheet)')],
 'ashraeCh45': [("exhaust-to-intake recirculation 'can be a serious problem'", "exhaust-to-intake recirculation 'can be a serious problem' (?: the 2019 edition reads 'can be an even more serious problem' and describes intake on one side, discharge on the other; SI 2015 copy not re-checked)")],
 'ashraeLife': [('ch.37 Table 4 (median service life): centrifugal chiller >25 yr; cooling tower galvanized >22;', 'ch.37 Table 3 (median service life): centrifugal chiller >25 yr; cooling tower metal >22; Table 4 (Akalin 1978, which ASHRAE footnotes as possibly outdated):')],
 'atb2024_batt': [('NREL Annual Technology Baseline 2024', 'NREL Annual Technology Baseline 2024 (page now names the publisher NLR; a newer 2024b version exists ?)')],
 'atcoGas2026': [('(riders excluded)', '(riders excluded ?: the UCA says rate riders are included in delivery charges; delivery figures need the ATCO Gas North rate schedule, not on this page)')],
 'aucDSI2021': [('p. 69 no party suggested', 'p. 69 (?: pp. 60 and 69 not re-checked) no party suggested')],
 'auc_microgen': [('guideline (2026)', 'guideline (2026 per the file name; no date printed)')],
 'bacLayout2023': [('air inlet 1.5–2.7 m from a wall for a single cell at grade', 'air inlet 1.5–2.7 m from a wall for a single cell at grade (our summary of per-model tables ?)')],
 'bartlett2025': [('$65,280/yr of natural gas displaced per MW', '$65,280/yr of natural gas displaced per MW (at one gas-price case; the report also gives $4 and $6/GJ cases ?)')],
 'bcAirBackground': [('43.6 ppb (≈82 µg/m³)', '43.6 ppb (≈82 µg/m³, our conversion)'), ('PM2.5 24-h 27, annual 7 µg/m³', 'PM2.5 24-h 27, annual 7 µg/m³ (?: June 2025 report not checked; an April 2026 edition exists)')],
 'bcCarbonTax2025': [('continues (≥10,000 t/yr)', 'continues (≥10,000 t/yr ?: not on this page)'), ('federal fuel charge set to zero 1 Apr 2025 (CRA FCN16)', 'federal fuel charge set to zero 1 Apr 2025 (CRA FCN16, a separate source)')],
 'bcDWPR': [('a water supplier needs construction and operating permits;', 'a water supplier needs construction and operating permits (? the duty is in the Act, ss. 7–8; the regulation sets how permits are issued and the exemptions);')],
 'bcLCFtech2023': [('(yearly targets from the government page, regulation copies read were older)', '(yearly targets from the government page; ? one check finds the regulations current to 20 Oct 2026)')],
 'bcRecyclingIT': [('exclusion only for computers attached to commercial or industrial equipment that is not itself a covered product;', 'exclusion for computers attached to other listed items, including commercial or industrial equipment that is not itself a covered product (?);')],
 'bcWQGtemp': [('BC Ambient Water Quality Guidelines for Temperature, overview (2001)', 'BC, Water Quality Guidelines for Temperature: Overview Report (2001; printed title ?)')],
 'bc_mwr': [('s.104 and Table 13 (reclaimed water categories)', 's.104 (reclaimed water categories) and Table 13 (? one check reads it as Municipal Effluent Quality Requirements for Reclaimed Water)')],
 'bc_rlcf012': [('(RLCF-012, rev. 30 Apr 2026)', '(RLCF-012 per file name, revised 30 Apr 2026; Ministry of Energy and Climate Solutions)')],
 'bcaExtract': [('Non-Residential Inventory Extract External User Guide', 'Non-Residential Inventory Extract External User Guide (printed title: BCA User Guide for BCA Non-Residential Inventory Extract, 5 Apr 2019 ?)'), ('(licensed)', '(licensed; Abacus record not checked ?)')],
 'bcaGuideRes': [('Residential Inventory Extract External User Guide v1.1', 'External BCA User Guide for BCA Residential Inventory Extract v1.1')],
 'arden2021': [('Onsite Non-potable Reuse for Large Buildings,', 'Onsite Non-potable Reuse for Large Buildings: Environmental and Economic Suitability as a Function of Building Characteristics and Location,')],
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
