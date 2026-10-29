"""Equipment counts as register quantities, 29 Oct 2026 (J.B.: "make sure the equipment calculations are correct and ... sourced just
like every equation, and that they live in the template and logic diagram"). Seven new 'size' quantities: racks, UPS modules,
battery cabinets, room cooling units, CDUs, outdoor cooling units, generator sets. Values re-read by Claude: Vertiv Liebert CW System
Design Catalog Table 2.3 p.11 (CW181 172/210/246 kW). Research notes: checks/node_review/count_rules.md, select_*.md."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
NEWSRC = {
 'vertivVR3300': "Vertiv, VR Rack brochure SL-20819 (R06/25): VR3300 42U, 600 × 1200 × 2000 mm ('nominal'), UL 2416; the same 600 × 1200 footprint from Schneider APC AR3300B2, Rittal VX, Chatsworth ZA15, Panduit XG — https://www.vertiv.com/en-us/products-catalog/facilities-enclosures-and-racks/racks-and-containment/vr3300/",
 'galaxyVX': "Schneider Electric, Galaxy VX 480 V UPS System Technical Specifications 990-5451K-001 (11/2024): 1000 kW (GVX1000K1000NGS), UL 1778 and CSA C22.2 No. 107.3; dimensions 990-6264J-001: 3600 × 900 × 1970 mm",
 'vertivLi5': "Vertiv, EnergyCore Li5 data sheet SL-71271 (R06/26): 18 modules, 31.1 kWh, 263 kW max discharge, 5 min class, 600 × 750 × 2000 mm (axes not labelled), UL 1973, UL 9540A, CSA mark",
 'vertivCW181': "Vertiv, Liebert CW System Design Catalog, 60 Hz (©2024), Table 2.3 'High Delta T Conditions' p.11, 50/64 °F water: CW181 172 kW at 80 °F DB, 210 kW at 85 °F, 246 kW at 90 °F (total = sensible); p.7 179 kW at 75 °F; product page: 94 × 122 × 42 in (2388 × 3099 × 1067 mm), 177 kW; guide spec SL-18061GS Rev. 9 (Oct 2021) p.1: CSA C22.2 No 236/UL 1995 — https://www.vertiv.com/4a6b21/globalassets/products/thermal-management/room-cooling/liebert-cw-038-181kw--chilled-water-cooling/liebert-cw-38-to-181-kw-system-design-catalog-sl-18061.pdf",
 'motivairMCDU': "Motivair by Schneider Electric, CDU brochure (©2025): MCDU-50 1516 kW at a 4 K approach (row 2: primary supply 105.8 °F, secondary supply 113 °F), 36 × 61-5/8 × 80-1/2 in; UL, 380–480 V, 50/60 Hz (manufacturer claims)",
 'lbnlXu2007': "Xu, T. & Greenberg, S., Data Center Energy Benchmarking Part 1: Case Studies on Two Co-location Data Centers (No. 16 and 17), LBNL-62716, Aug 2007: UPS serves the 'computer loads' (p.2); HVAC — 'CRACs, cooling towers, and condenser water pumps' — on generator-backed essential power (p.9); one site — https://eta-publications.lbl.gov/sites/default/files/62716-p1.pdf",
 'fujiRedundancy': "Fuji Electric Corp. of America (UPS maker; no date), 'What are N+1, 2N, and 2(N+1) redundancy?': N+1 'N units to handle the full load, plus 1 additional (spare) unit'; 2N 'two completely independent sets of N components, each capable of handling the full load' — https://americas.fujielectric.com/what-are-n1-2n-and-2n1-redundancy/",
 'schneiderWP133': "Lin, Bunger, Avelar, Navigating Liquid Cooling Architectures for Data Centers with AI Workloads, Schneider Electric White Paper 133 v2 (©2024) p.8: '60% to 90% of a liquid-cooled server's heat can be removed via the liquid'; 'The remaining heat is removed by air cooling.' — https://download.schneider-electric.com/doc/SPD_WP133_EN/WP133_V2_EN.pdf",
}
Q = [
 dict(id='rack_count', name='Server racks', unit='count (range)', stage='size', conf=50, status='in hand',
      inputs=['it_load_actual'], sources=['uptime2024survey','vertivVR3300'],
      formula='racks = P_IT ÷ kW per rack',
      coef="7.1–8 kW per rack average (Uptime Institute Global Data Center Survey 2024 p.10: 'the average of typical racks densities ... 8 kW'; 7.1 kW without 11 sites above 50 kW; industry survey); cabinet 0.6 × 1.2 × 2.0 m (Vertiv VR3300; five makers share the footprint); arrangement in rows with 1.2 m contained aisles is schematic",
      source_roles=[dict(id='uptime2024survey',term='7.1–8 kW per rack',role='coefficient',conf=50,verified=True),dict(id='vertivVR3300',term='0.6 × 1.2 × 2.0 m cabinet',role='coefficient',conf=50,verified=True)]),
 dict(id='ups_modules', name='UPS modules', unit='count', stage='size', conf=50, status='in hand',
      inputs=['it_load_actual','spare_cooling'], sources=['galaxyVX','lbnlXu2007','fujiRedundancy','tia942'],
      formula='n = ⌈P_IT ÷ module rating⌉, then redundancy: N+1 adds one, 2N doubles',
      coef="1000 kW frame, 3.6 × 0.9 × 1.97 m (Schneider Galaxy VX, UL 1778 + CSA); the UPS carries the IT load ('computer loads' on UPS, cooling on generator-backed power: LBNL 2007, one site; where continuous cooling is required, some cooling is on UPS too — not modelled ?); N+1 and 2N as defined by a UPS maker (Fuji Electric); UPS modules are redundant capacity components (TIA-942); the set-up's spare-unit choice is applied",
      source_roles=[dict(id='galaxyVX',term='1000 kW module',role='coefficient',conf=50,verified=True),dict(id='lbnlXu2007',term='UPS carries the IT load',role='rule',conf=40,verified=True),dict(id='fujiRedundancy',term='N+1, 2N definitions',role='rule',conf=50,verified=True),dict(id='tia942',term='redundant capacity components',role='rule',conf=90,verified=False)]),
 dict(id='battery_cabinets', name='UPS battery cabinets', unit='count (range)', stage='size', conf=50, status='in hand',
      inputs=['it_load_actual','backup_hours','spare_cooling'], sources=['vertivLi5','deltaLZH'],
      formula='n = ⌈P_IT ÷ cabinet power at the runtime⌉, ×2 for 2N',
      coef="about 5 min runtime (backup_hours, colocation); 263 kW per cabinet (Vertiv EnergyCore Li5, 0.6 × 0.75 × 2.0 m, drawn) to 400 kW per rack (Delta LZH) for 5 min → range (manufacturer claims)",
      source_roles=[dict(id='vertivLi5',term='263 kW per cabinet, 5 min',role='coefficient',conf=50,verified=True),dict(id='deltaLZH',term='400 kW per rack, 5 min',role='bound',conf=50,verified=True)]),
 dict(id='room_cooling_units', name='Room cooling units', unit='count (range)', stage='size', conf=50, status='in hand',
      inputs=['it_load_actual','liquid_capture','cooling_type','spare_cooling'], sources=['vertivCW181','schneiderWP133','fujiRedundancy'],
      formula='n = ⌈heat to air ÷ unit capacity⌉, then redundancy; heat to air = P_IT (air cooling) or P_IT × (1 − liquid share) (liquid cooling)',
      coef="Vertiv Liebert CW181 (60 Hz, CSA/UL 1995): 172 kW at 80 °F to 246 kW at 90 °F entering air with 50/64 °F water (System Design Catalog ©2024 Table 2.3 p.11; 'DB' read as return air for a downflow unit — our reading); 179 kW at the legacy 75 °F; above 90 °F not printed ?; 3.10 × 1.07 × 2.39 m; liquid cooling leaves the rest of the heat to air (Schneider WP 133)",
      source_roles=[dict(id='vertivCW181',term='172–246 kW per unit',role='coefficient',conf=50,verified=True),dict(id='schneiderWP133',term='remaining heat removed by air',role='rule',conf=50,verified=True),dict(id='fujiRedundancy',term='N+1, 2N',role='rule',conf=50,verified=True)]),
 dict(id='cdu_units', name='Coolant distribution units', unit='count', stage='size', conf=40, status='in hand',
      inputs=['it_load_actual','liquid_capture','spare_cooling'], sources=['motivairMCDU','schneiderWP133'],
      formula='n = ⌈P_IT × liquid share ÷ CDU capacity⌉, then redundancy',
      coef="1516 kW at a 4 K approach, 0.91 × 1.57 × 2.05 m (Motivair MCDU-50, manufacturer claim); liquid share from liquid_capture (0.48–0.75; WP 133 gives 60–90%); sizing the CDU on the heat in the liquid is our inference (no primary rule found ?)",
      source_roles=[dict(id='motivairMCDU',term='1516 kW at 4 K',role='coefficient',conf=50,verified=True),dict(id='schneiderWP133',term='60–90% of heat to liquid',role='bound',conf=50,verified=True)]),
 dict(id='cooling_units', name='Outdoor cooling units', unit='count', stage='size', conf=50, status='in hand',
      inputs=['it_load_actual','pue','cooling_type','spare_cooling'], sources=['vertivAFC','evapcoEA26','mfrAdiabatic','bacS3000ed','fujiRedundancy'],
      formula='n = ⌈P_IT × PUE ÷ unit capacity⌉, then spares (N+1 / 2N)',
      coef="heat to reject ≈ facility power (servers × PUE, high end); unit capacity: air-cooled chillers with free cooling 1.489 MW (Vertiv AFC FIZ135); dry coolers 1.18 MW (24.5 m² per MW over a 12 × 2.4 m unit; EVAPCO 12 m unit rated 1.31 MW); hybrid coolers 0.67 MW (low end of 0.67–1.37, EVAPCO/BAC claims); tower cells 3.03 MW (BAC S3E-1222-07R); air-cooled halls get chillers, liquid-cooled halls dry coolers",
      source_roles=[dict(id='vertivAFC',term='1.489 MW chiller',role='coefficient',conf=50,verified=True),dict(id='evapcoEA26',term='12 m dry cooler',role='coefficient',conf=50,verified=True),dict(id='mfrAdiabatic',term='0.67–1.37 MW hybrid',role='coefficient',conf=50,verified=False),dict(id='bacS3000ed',term='3.03 MW tower cell',role='coefficient',conf=50,verified=True),dict(id='fujiRedundancy',term='N+1, 2N',role='rule',conf=50,verified=True)]),
 dict(id='generator_sets', name='Standby generator sets', unit='count', stage='size', conf=50, status='in hand',
      inputs=['it_load_actual','pue'], sources=['rehlkoKD2000','rehlkoKD1000','lbnlXu2007','fujiRedundancy'],
      formula='n = ⌈P_IT × PUE ÷ set rating⌉, then spares',
      coef="2,000 kW sets when the facility load is above 3 MW (Rehlko KD2000), otherwise 1,000 kW (KD1000); data-centre continuous rating = standby (Rehlko); the sets carry the whole facility, cooling included (HVAC on generator-backed power: LBNL 2007, one site); generator spares as set up (N+1 default)",
      source_roles=[dict(id='rehlkoKD2000',term='2,000 kW set',role='coefficient',conf=50,verified=True),dict(id='rehlkoKD1000',term='1,000 kW set',role='coefficient',conf=50,verified=True),dict(id='lbnlXu2007',term='cooling on generator power',role='rule',conf=40,verified=True),dict(id='fujiRedundancy',term='N+1',role='rule',conf=50,verified=True)]),
]
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; d = json.loads(p.read_text())
    (d['new_sources'] if pretty else d['sources']).update(NEWSRC)
    qs = d['quantities']
    for q in Q:
        if pretty:
            if not any(x['id'] == q['id'] for x in qs): qs.append(q)
        else:
            qs[q['id']] = {k: q[k] for k in ('name','formula','coef','unit','sources','conf','status')}
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, 'ok')
