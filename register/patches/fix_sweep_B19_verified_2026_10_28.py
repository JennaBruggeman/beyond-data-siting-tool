"""Second web check B19 (J.B. 28 Oct 2026) for the 29 sources whose only check was the B17/B18 web read (no sweep entry).
Points both web checks agree on are now settled (? removed or the fix applied); points from one check keep '?'."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REPL = {
 'uptimeRegional2025': [("average annual PUE 1.49 (self-reported; 'weighted' not printed ?)", 'average annual PUE 1.49 (operator-reported answers; not weighted)')],
 'monstadt2025': [('claim on control in colocation named, not yet checked (not in the abstract ?)', 'claim on control in colocation not in the abstract; full text not read ?')],
 'traneTCA2026': [("Trane, Air-Cooled Magnetic Bearing Chiller, Model TCA (read by check 2 as 'From 1MW to 3MW Cooling Capacity for Data Center Thermal Management' ?),", 'Trane, From 1MW to 3MW Cooling Capacity for Data Center Thermal Management (air-cooled magnetic-bearing chiller, Model TCA),'), ('300–850 TR units', "300–850 TR units (printed 'T')")],
 'vertivEXLS1': [('(document covers 250–1200 kVA; 1000–1200 in the URL ?)', '(document covers 250–1200 kVA; 1000–1200 is only in the URL)')],
 'enefg11': [("(the 15 and 20 % worded as 'geplant' ?)", "(the 15 and 20 % worded as a planned, 'geplant', share)"), ('(BGBl. 2023 I Nr. 309, 13 Nov 2023)', '(BGBl. 2023 I Nr. 309, 13 Nov 2023; citation not printed on the § 11 page ?)')],
 'linwood2023': [('STRUCTURE (NCSEA ?)', 'STRUCTURE magazine'), ('ASCE 7-22 access floor 100 psf', 'ASCE 7-22 access floor 100 psf (plus a 2,000 lb point load ?)')],
 'epiTIA942': [('EPI Singapore (TIA-942 certification body ?)', 'EPI Singapore (data-centre auditor and trainer; not shown as a TIA-942 certification body)')],
 'cologixVAN2fr': [("'Surface Vancouver 2 : 15 000 p.c.' (check 2 ?)", "'Surface Vancouver 2 : 15 000 p.c.' (not the 20 000 p.c. Vancouver total)")],
 'bcbc2018_911': [('same ASTC 47 / STC 50 / STC 55 for Part 9 buildings;', 'same ASTC 47 / STC 50 / STC 55 for Part 9 buildings (secondary suites STC 43 / ASTC 40, 9.11.1.1.(2), not used);')],
 'vanCD1_520': [('excluded from floor area', 'excluded from floor space ratio')],
 'zimmermann2012': [('(peer-reviewed)', '(journal article)'), ("'A heat recovery efficiency of 80% … with a water temperature of 60 °C'", "'A heat recovery efficiency of 80% … with a water temperature of 60 °C' (elision drops the 34% exergetic efficiency)")],
 'abStandata19FCI003': [('tanks of Class I liquids supplying stationary combustion engines inside buildings comply', 'tanks of Class I liquids supplying stationary engines inside buildings comply (when serving appliances installed to NFPA 37 ?)')],
 'nrcanEstarDC': [('NRCan, ENERGY STAR data-centre technical reference:', 'NRCan, ENERGY STAR technical reference, Data Center Estimates in the United States and Canada (title ?):')],
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
