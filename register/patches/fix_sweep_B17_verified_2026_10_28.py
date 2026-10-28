"""Second-check batch 17 (J.B. 28 Oct 2026), web. Most items had no first check (added after the sweep), so check 2 is
the only check: findings are '?' only. Our own conversions and derivations are labelled as ours."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REPL = {
 'enefg11': [('ERF ≥ 10 / 15 / 20 % by commissioning date', "share of reused energy (DIN EN 50600-4-6; 'ERF' our label) ≥ 10 / 15 / 20 % by commissioning date (the 15 and 20 % worded as 'geplant' ?)")],
 'ciraIXP2023': [('CIRA, IXPs (16 May 2023, modified 31 Aug 2026)', "CIRA, IXPs make Canada's internet faster, cheaper, and more resilient (16 May 2023, modified 31 Aug 2026; dates not printed ?)")],
 'linwood2023': [('150 psf (7.2 kPa)', '150 psf (7.2 kPa, our conversion)'), ('STRUCTURE (NCSEA)', 'STRUCTURE (NCSEA ?)')],
 'catTM9338': [('mechanical and exhaust spectra at 7 m', 'mechanical and exhaust spectra at 7 m (printed in feet; metres our conversion)')],
 'cologixVAN2fr': [("'15K SQFT'", "'Surface Vancouver 2 : 15 000 p.c.' (check 2 ?)")],
 'traneTCA2026': [('Trane, Air-Cooled Magnetic Bearing Chiller, Model TCA,', "Trane, Air-Cooled Magnetic Bearing Chiller, Model TCA (read by check 2 as 'From 1MW to 3MW Cooling Capacity for Data Center Thermal Management' ?),"), ('(05/07/2026;', '(05/07/2026, day/month order ?;'), ('300–850 TR units 27–52 m² → ≈17–26 m² per MW', '300–850 TR units 27–52 m² (printed in inches; m² our conversion) → ≈17–26 m² per MW (our calculation)')],
 'vaSpec230541': [('rising with span;', 'non-decreasing with span (flat in some rows);')],
 'epiTIA942': [('(TIA-942 certification body)', '(TIA-942 certification body ?)'), ("floor loading 'should be 12kPa (250 lb/ft2)'", "floor loading 'should be 12kPa (250 lb/ft2)' superimposed live load")],
 'uptimeRegional2025': [('Field report 183, Annual survey — regional view 2025', 'UII Data Report 183, Global Data Center Survey 2025: regional view'), ('weighted average PUE 1.49', "average annual PUE 1.49 (self-reported; 'weighted' not printed ?)")],
 'femp2024dc': [('55 °F (12.8 °C)', '55 °F (12.8 °C, our conversion)')],
 'abStandata19FCI003': [('tanks supplying stationary combustion engines comply', 'tanks of Class I liquids supplying stationary combustion engines inside buildings comply')],
 'melo2001': [('(peer-reviewed note;', '(short note, peer review ?;')],
 'vertivEXLS1': [('Site Planning Data 1000–1200 kVA,', 'Site Planning Data (document covers 250–1200 kVA; 1000–1200 in the URL ?),'), ('→ ≈2.0–2.4 m² per MW', '→ ≈2.0–2.4 m² per MW (our calculation)')],
 'vertivHPL': [('38 kWh / 207 kW per cabinet', '38 kWh / 207 kWb per cabinet'), ('→ ≥5 cabinets ≈2.2 m² per MW', '→ ≥5 cabinets ≈2.2 m² per MW (our calculation)')],
 'edmUses2026': [('permitted in MU, IM, BE, CB, within or on a building (MU ≤600 m²)', 'permitted in MU, IM, BE, CB, within or on a building (MU ≤600 m²) (zone permissions and caps are in the zone sections, not 8.10; not re-checked ?)')],
 'burlingtonPlans2026': [('City of Burlington, 3110 South Service Rd, Architectural Plans', 'Cuadro Arch Ltd. for the applicant, hosted by the City of Burlington, 3110 South Service Rd, Architectural Plans'), ('office 100 m², loading 45 m²', "office 100 m² ('OPEN SPACE OFFICE' only; summary 'OFFICE' figure differs ?), 'LOADING / GARBAGE ROOM' 45 m²")],
 'monstadt2025': [('claim on control in colocation named, not yet checked', 'claim on control in colocation named, not yet checked (not in the abstract ?)')],
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
