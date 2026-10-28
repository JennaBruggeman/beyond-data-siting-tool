"""Second-check batch 13 (J.B. 28 Oct 2026), the last sources with saved copies. Check 1 = sweep_results.csv; check 2 =
B13_a*.json. Corrections only where both checks agree; single-check findings '?'. Text and citations only."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REPL = {
 'hawaiiSWAC2002': [('p. 61–66: cold-water pipe US$12.05–12.47 M for 5.7–5.8 km, about US$2,120–2,150 per m (2002, deep ocean intake at about 500 m); 92.5% energy saving (study)', 'p. 61–66: cold-water pipe US$12.05–12.47 M for 5.7–5.8 km (about US$2,120–2,150 per m, our conversion; 2002), intake at about 457–488 m depth; 92.5% energy saving (Executive Summary p. 4; study)')],
 'dfoScreen': [('approach velocity default 0.035–0.055 m/s;', 'approach velocity default maximum 0.035 m/s (Table C-1) or 0.055 m/s (s. 3.1.1; the page is inconsistent), up to 0.12 m/s only with enough sweeping velocity; an interim mitigation procedure;')],
 'vanRates2026': [('sewer $7.960 per unit, all metered uses; 1 unit = 2.83168 m³', "sewer $7.960 per unit (?: not in spec1a; spec1b not saved); 'rate for all metered uses' (water); 1 unit = 2,831.68 L (2.83168 m³, our conversion)")],
 'epaWSatWork': [('generally usable without treatment as cooling-tower make-up', "'generally safe without additional treatment for direct use in cooling towers with biocide control'")],
 'epcorTC2025s44': [('s. 6.5.2 p. 23: refund if a new customer shares an extension during the initial term', "s. 6.5.2 p. 23: the first customer 'may receive a refund' of a Distribution Contribution, in proportion, if a new customer shares the extension during the initial term (the saved copy is the 1 Jan 2026 edition)")],
 'edmARP7188': [('major facilities only where a river-valley location is deemed essential;', "'major public facilities' only where a river-valley location is deemed essential and approved by City Council;"), ('utility corridors prohibited except direct river crossings', 'objective (s. 2.6.3) to prohibit utility corridors except direct river crossings')],
 'euaS2': [('s. 2(1)(b) the Act does not apply to self-supply consumed solely on that property by that owner or tenant', "s. 2(1)(b) the Act does not apply to 'the portion of electric energy' consumed solely on that property by that owner or tenant, except for Commission-approved tariff rates (s. 122(2)(b))")],
 'bchTS6': [('s. 10: later customers pay a share', "s. 10 (reduced take for 36 consecutive months, unless the customer pays the O&M and taxes ?): later customers pay a share")],
 'bcbc2024_326': [('(high buildings: Group C floor level of the top storey more than 18 m above grade)', "(high buildings: Group C major occupancy 'whose floor level is more than 18 m above grade' ?)"), ('NBC(AE) the same Article', 'NBC(AE) the same Article (not checked ?)')],
 'vbbl2025_2425': [('all buildings manage rainwater on site;', 'buildings manage rainwater on site (with the Sentence (2) exemptions: laneway and small infill, accessory buildings, float homes, temporary buildings);')],
 'epcorStorm': [('EPCOR, Guidelines for on-site stormwater management (undated): control required for lots over 0.16 ha;', 'EPCOR, Guidelines for Stormwater Management, Requirements for Individual Lot Development Areas between 0.16 ha to 3.0 ha (undated): control required for lots over 0.16 ha (method up to 3.0 ha);')],
 'epcorBylaw19626': [('(tier mapping unclear in the extract)', '(five declining blocks, printed clearly; Apr 2022–Mar 2023 rates only)')],
 'epcorWW2024app': [('EPCOR 2024 rate application, Appendix A:', 'EPCOR 2025–2027 Wastewater PBR application (2024), Appendix A:')],
 'mvUT019': [('commits to set pricing; none published', 'commits to set pricing; none published (our observation)')],
 'sheu2019cma': [('(pages 0-2)', '(pages 0-2; table values not re-checked, page 2 not saved ?)')],
 'ecccNormals2020': [('CSV (J.B. download 19 Oct 2026):', 'CSV (J.B. download 19 Oct 2026; the CSV is not in the saved copies, values not re-checked ?):')],
 'vanTaxReport': [('(FOLIO = the last 12 digits of BC Assessment\'s 15-digit roll number; LAND_COORDINATE = the parcel)', "(FOLIO = the last 12 digits of BC Assessment's 15-digit roll number ?; LAND_COORDINATE equals the first 8 digits of FOLIO in all 228,921 rows)")],
 'bchEPA2026': [('2024 call restated $76/MWh (2025$)', '2024 call $76/MWh in 2025$')],
 'canvecHydroBC': [('(waterbody features; Open Government Licence – Canada; J.B. download 20 Oct 2026)', '(waterbody features; Open Government Licence – Canada; J.B. download 20 Oct 2026; the saved extract carries no metadata)')],
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
