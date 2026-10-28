"""Second-check batch 16 (J.B. 28 Oct 2026), web. Check 1 = sweep_results.csv; check 2 = B16_a*.json. Corrections only
where both checks agree; single-check findings '?'. Many fetches were refused (no one to approve); those stay single-check."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REPL = {
 'edmReceivers': [('Blatchford Renewable Energy Utility 13.1 MW heating / 12.3 MW cooling, ambient-temperature sharing network', "Blatchford Renewable Energy Utility, a 'District Energy Sharing System'; 13.1 MW heating / 12.3 MW cooling is capacity supported by a 2024 federal grant, not stated as installed"), ('University of Alberta district energy (capacity not stated)', 'University of Alberta district energy (not on these pages ?)')],
 'nrcan_pvcost2024': [('NRCan / IEA PVPS National Survey Report', 'IEA PVPS (NRCan authors) National Survey Report'), ('(installed CAD/W by size)', "(CAD/W by size; the report prints 'turnkey' prices ?)")],
 'edmBL19340': [('Facilities Off-site Levies Bylaw (consolidated 23 Apr 2024)', "Facilities Off-site Levy (or Levies ?) Bylaw (consolidated 23 Apr 2024 ?)")],
 'edmBL14380': [('(office consolidation May 2026)', '(office consolidation May 2026 ?)')],
 'nasem2016': [('Local Water Supplies (2016)', 'Local Water Supplies: An Assessment of Risks, Costs, and Benefits (2016; subtitle ?)')],
 'mfrDryCooler': [('about 20–2,700 kW per unit; length 1.6–12 m, width 1.15–2.5 m, height 1.45–2.9 m; 160 kg to 10.6 t operating.', 'about 20–2,700 kW per unit; length 1.6–12 m, width 1.15–2.5 m, height 1.45–2.9 m; 160 kg to 10.6 t operating (only the EVAPCO sheet re-read, which prints MBH and inches; other makers ?).')],
 'mfrGenset': [('0.6–1 MW — 6.6–8.6 × 2.5 m, 3.5–3.7 m high; sub-base fuel tank optional; ≥1 m clearance around each set (Cummins T-030).', '0.6–1 MW — 6.6–8.6 × 2.5 m (8.6 m not seen; S-1443 prints inches ?), 3.5–3.7 m high; sub-base fuel tank optional (S-1443 shows no-tank bases only to 500 kW ?); ≥1 m clearance around each set (Cummins T-030; not checked ?); Cat 3516C sheet not re-read ?.')],
 'epcorDrainage2023': [('EPCOR Water and Drainage Customer Connection Guide (May 2023)', "EPCOR Drainage Customer Connection Guide (released 1 May 2023; title per check 2 ?)"), ('EPCOR reviews stamped plans', "EPCOR reviews plans with a P.Eng. 'Signature and Seal'"), ('"Details of any required sewer construction would be reviewed at the Development Permit stage"', '"Details of any required sewer construction would be reviewed at the Development Permit stage" (not in the guide; from the One Water memos, not checked ?)')],
 'itsp40006': [('Government of Alberta Secure Digital Media Sanitization Standard v2.0 (2023) uses NIST terms', 'Government of Alberta Secure Digital Media Sanitization Standard v2.0 (2023) uses NIST terms (separate document, not checked ?)')],
 'mvDWCP': [('stage 4 asks industry for voluntary cuts', "stage 4 limits indoor and outdoor uses and asks 'industrial water users' for voluntary cuts"), ('City By-law 12086', 'City By-law 12086 (not checked ?)')],
 'energiforsk2022life': [('(30 Jun 2022)', '(June 2022; day ?)'), ('Lifetime predictions and status assessments,', 'Lifetime predictions and status assessments of district heating pipelines,'), ('degradation ×2.5 per +10 °C', 'degradation ×2.5 per +10 °C (conclusions; s. 6.1 gives ×2 ?)')],
 'yorkClearance2024': [('York/JCI (2024): a 12 ft wall 6 ft from', 'York / Johnson Controls (10 Jun 2024; vendor testing): a wall (12 ft ?) 6 ft from'), ('thin walls no taller than the unit negligible', "walls no taller than the unit: 'without any negligible derating' (garbled in source ?)")],
 'lbnl_proto2021': [('Energy and Buildings 231:110603 (2021)', 'Energy and Buildings 231:110603 (2021; journal volume not printed in the LBNL copy, DOI 10.1016/j.enbuild.2020.110603 ?)')],
 'edmZB2120': [('Blatchford, CMUV and JAMSC special areas require rooftop equipment concealed', 'Blatchford, CMUV and JAMSC special areas require rooftop equipment concealed (IM/IH and special-area statements not re-checked ?)')],
 'edmZBres': [('RSM small-medium transition (3–4 storeys); RM medium (4–8)', "RSM small-medium transition ('up to 3 or 4 Storeys'); RM medium (4–8 ?)")],
 'uclaWorkplace': [('(UCLA Luskin, ChargePoint data 2011–15)', '(UCLA urban planning client project for ChargePoint, hosted by the Luskin Center ?; ChargePoint data 2011–15)')],
 'cologixVAN4web': [("'4 MW of colocation capacity';", "'4 MW of colocation capacity' (check 2: page now prints 'Site Capacity: 6.5 MW' ?);"), ("'68K SQFT across four floors'", "'68K SQFT across four floors' (page also shows 58K ?)")],
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
