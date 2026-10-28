"""The 17 'may change a number' items left after the first pass, 28 Oct 2026.
Read by Claude in the built-in browser on J.B.'s computer (MDPI article page, IEA chapter page, Vancouver rezoning process overview)
and by web fetch (Dell R650 spec page, StatCan 15-206-X2015039 Table 10, Vancouver metered-rates page); a resolving check
(checks/sweep/num47/b1.json) found NRC CBD-160 and Pieper et al. 2020. Number changes: Dell R650 21.25 → 21.2 kg (tool code too);
StatCan computers 4 → 4.9 yr (register text only)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
SRC = {
 'absorption2026': "Chen, Tan, Wu, Li, Hu 2026, 'Experimental Study and Performance Analysis of a Li-Br Single-Effect/Two-Stage Hybrid Absorption Chiller', Energies 19(9):2147, doi:10.3390/en19092147 (peer-reviewed; introduction citing refs 3–7): two-stage absorption suits 70–80 °C heat but 'COP, typically below 0.4'; single-effect needs at least 90 °C, COP 0.6–0.7; double-effect at least 150 °C, COP above 1.2; their hybrid unit runs from 70 °C (COP 0.41) to 120 °C (COP 0.78) — https://www.mdpi.com/1996-1073/19/9/2147",
 'ieaEnergyAI': "IEA, Energy and AI (2025), chapter 'Energy demand from AI': 'a data centre can be operational in two to three years', while the energy system 'requires longer lead times' (page read 28 Oct 2026) — https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai",
 'vanRezoneTime': "City of Vancouver, Typical CD-1 Rezoning Process (for policy and ODP consistent projects), one-page overview: rezoning enquiry 'Target ~16 weeks to Letter of Response (LOR)'; rezoning application 'Target ~15 months to decision' (read 28 Oct 2026); the apply-for-rezoning page gives no processing time — https://vancouver.ca/files/cov/rezoning-process-overview.pdf",
 'nrcCBD160': "Williams, G.P., Design Heat Requirements for Snow Melting Systems, Canadian Building Digest CBD-160 (NRC Division of Building Research, 1974): Edmonton 65 W/ft² to keep pavement bare and wet after a design storm (Table II); design heat 40 sheltered, 55–60 average, 60–65 extremely exposed (Table III; unit taken from Table II); about 430–700 W/m² (our conversion) — https://nrc-publications.canada.ca/fra/voir/td/?id=ea4000fb-340b-4fdf-878f-27658e1f7df8",
}
REP = [
 ('computers 4 (?: not in this table; likely Table C.1-6 or C.1-7 (machinery and equipment), not yet read)', "computers 4.9 yr ('Computers, associated hardware and word processors', Table 10, ex post and survey expected life, 1985–2010)"),
 ('— https://www150.statcan.gc.ca/n1/pub/15-206-x/2015039/t/tblc11-eng.htm', '— https://www150.statcan.gc.ca/n1/pub/15-206-x/2015039/t/tblc11-eng.htm ; https://www150.statcan.gc.ca/n1/pub/15-206-x/2015039/t/tbl10-eng.htm'),
 ('warehouses 25.4, computers 4;', 'warehouses 25.4, computers 4.9;'),
 ('R740 26.3 kg (2U ?: not stated in the PDF)', 'R740 26.3 kg (2U per Dell R740 Technical Guide)'),
 ('R650 21.25 kg (1U) (?: not in these PDFs; source not found)', "R650 21.2 kg ('4 x 3.5-inch', maximum with all drives; 1U) from Dell's R650 Technical Specifications, chassis weight"),
 ('server masses 21.25–26.3 kg', 'server masses 21.2–26.3 kg'),
 ('Lorenz COP, η 0.50–0.60 (Reinholdt et al. 2018; Pieper et al. 2020) (?: not yet checked)', 'Lorenz COP, η 0.50–0.60 (Pieper et al. 2020, Energy 205:117994: 0.5 assumed in the literature, design values 0.53–0.61 by heat source; Reinholdt et al. 2018 is an IIR conference paper, value not read ?)'),
 ("Building By-law requirements since 1 Jan 2024 (?: 'Part 3' is our reading, not the page's wording)", 'Building By-law requirements since 1 Jan 2024'),
 ('→ ≈ $11/MWh heat (? conversion not re-checked)', '→ (1.045 + 1.458) × 3.6 ÷ 0.85 boiler efficiency ≈ $10.6/MWh heat at the October rate (our arithmetic; the tool uses the 12-month mean commodity, ≈ $13/MWh)'),
 ('unit not defined in that report — assumed same as water unit ?', "unit not defined in that report; the City's metered-rates page defines one unit for its water and sewer meter rates as 2,831.6 L = 100 ft³"),
]
for p, pretty in ((R / 'register/formula_register.json', True), (R / 'tool/opps.json', False)):
    s = p.read_text(); n = 0
    for a, b in REP: n += s.count(a); s = s.replace(a, b)
    d = json.loads(s)
    for sec in (('new_sources', 'old_sources') if pretty else ('sources',)):
        for i, t in SRC.items():
            if i in d[sec]: d[sec][i] = t; n += 1
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(p.name, n)
# tool code: R650 weight 21.25 → 21.2 kg
for f in ('tool/engine.js', 'tool/addons.js', 'tool/explain.js'):
    p = R / f; s = p.read_text(); n = s.count('21.25'); p.write_text(s.replace('servers*21.25', 'servers*21.2').replace('21.25–26.3 kg', '21.2–26.3 kg')); print(f, n)
