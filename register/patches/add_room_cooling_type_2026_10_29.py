"""Room cooling type chosen from hall density (J.B., 29 Oct 2026: 'yes' to the sourced rule). Research: checks/node_review/cooling_layout.md.
Re-read by Claude: Vertiv SL-70713 (density claims), SL-80367 (CA60/CA80 capacity, size, gallery-side mounting), SL-70701 (UL 1995,
service from the gallery side, no side access), SL-70553 drawings DPN005165 (1.1 m both sides) and DPN005179 (gasketed gap; 152 mm with
condensate kit), Liebert CRV System Design Catalog (73.7 kW at 95 °F DB, 45/55 °F water; end of rows; space evenly; oversize ≈20%)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
NEWSRC = {
 'vertivCWAds': "Vertiv, Liebert CWA Thermal Wall data sheet SL-70713 (R11/22): 'allowing a maximum of around 400 W/ft2 data hall density, as opposed to around 150 W/ft2 for traditional CRAH' and 'around 250 W/ft2 for full face discharge CRAH' (manufacturer claims; no test conditions) — https://www.vertiv.com/48edfb/globalassets/products/thermal-management/room-cooling/vertiv-liebert-cwa-thermal-wall/vertiv-liebert-cwa-ds-en-na-sl-70713-web.pdf",
 'coolloopBr': "Vertiv, CoolLoop Thermal Wall brochure SL-80367 (R11/25): 'optimized for slab floors and gallery-side mounting'; CA60 360 kW net sensible, 60 × 120 × 144.3 in; CA80 500 kW, 60 × 156 × 144.5 in; return air up to 45 °C; rating water temperatures not printed (?) — https://www.vertiv.com/49a63d/globalassets/shared/vertiv-coolloop-thermal-wall-br-en-na-sl-80367-web.pdf",
 'coolloopSpec': "Vertiv, CoolLoop Thermal Wall Guide Specifications SL-70701 (rev 11-25) s.1.2: standard 60 Hz units certified to UL 1995 (harmonized US/Canada); s.1.4: 'All service and maintenance shall be performed through the gallery side of the unit'; 'No side access shall be required.' — https://www.vertiv.com/4966eb/globalassets/shared/coolloop-thermal-wall-guide-spec_ca80_nam_10102025.pdf",
 'vertivCWAiom': "Vertiv, Liebert CWA Installer/User Guide (sl-70553 rev 3, 03-23): drawing DPN005165 '1.1m (42 inch) minimum clearance for installation and service access (Data Hall & Gallary Sides)'; DPN005179 adjacent units with a gasketed minimum gap, 152 mm with the gravity condensate kit (manual p.11, Appendix C p.65) — https://www.vertiv.com/4a76ae/globalassets/products/thermal-management/room-cooling/vertiv-liebert-cwa-thermal-wall/sl-70553_cwa_rev3_03-23-locked.pdf",
 'vertivCRVcat': "Vertiv, Liebert CRV System Design Catalog (performance data LRS 12/13/2019): CR050RC 73.7 kW at 95 °F DB / 67.7 °F WB, 45/55 °F water (AHRI 1360 condition), 600 mm wide, 1100 mm deep; Appendix E.2 pp.54–56: units at the end of rows or between racks, with containment 'space CRVs evenly in each row', aisle 0.6–1.8 m, 'oversize the CRV by approximately 20%', air reaches 'six to seven racks away'; E.3 p.59 capacity met if any other unit in the row fails — https://www.vertiv.com/48ed92/globalassets/products/thermal-management/in-row-cooling/liebert-crv-row-based-cooling-system-design-manual.pdf",
}
Q = dict(id='room_cooling_type', name='Room cooling type', unit='class', stage='size', conf=50, status='in hand',
  inputs=['it_load_actual','hall_area','liquid_capture','cooling_type'], sources=['vertivCWAds','coolloopBr','coolloopSpec','vertivCWAiom','vertivCRVcat','vertivCW181'],
  formula='hall density = heat to air on a hall floor ÷ its floor area (W/ft²); up to about 150 → room units along the walls; up to about 400 → a thermal wall in a side gallery; above → in-row coolers',
  coef="density limits are Vertiv's claims (SL-70713): about 150 W/ft² traditional CRAH, 250 full-face, 400 thermal wall; using heat to air (not all IT heat) for liquid-cooled halls is our reading (?); thermal wall: CA80 500 kW (rating water temperatures not printed ?), 1.52 m deep × 3.96 m along the wall × 3.67 m high, side by side with a gasketed gap, 1.1 m clear on the hall and gallery sides, UL 1995; in-row: CR050RC 73.7 kW at 95 °F return, 0.6 × 1.1 m, at row ends and evenly along rows, sized with about 20% extra (Vertiv CRV catalog)",
  source_roles=[dict(id='vertivCWAds',term='150 / 250 / 400 W/ft² limits',role='rule',conf=50,verified=True),dict(id='coolloopBr',term='CA80 500 kW, size, gallery mounting',role='coefficient',conf=50,verified=True),dict(id='coolloopSpec',term='UL 1995; service from the gallery',role='rule',conf=50,verified=True),dict(id='vertivCWAiom',term='1.1 m clearances; gasketed gap',role='rule',conf=50,verified=True),dict(id='vertivCRVcat',term='73.7 kW in-row; placement; +20%',role='coefficient',conf=50,verified=True)])
REP = [("Vertiv Liebert CW181 (60 Hz, CSA/UL 1995): 172 kW at 80 °F",
        "the unit follows room_cooling_type — room units: Vertiv Liebert CW181 (60 Hz, CSA/UL 1995): 172 kW at 80 °F"),
       ("liquid cooling leaves the rest of the heat to air (Schneider WP 133)",
        "liquid cooling leaves the rest of the heat to air (Schneider WP 133); thermal wall: CoolLoop CA80 500 kW; in-row: CR050RC 73.7 kW with about 20% extra (Vertiv CRV catalog)")]
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; s = p.read_text(); n = 0
    for a, b in REP: n += s.count(a); s = s.replace(a, b)
    d = json.loads(s); (d['new_sources'] if pretty else d['sources']).update(NEWSRC); qs = d['quantities']
    if pretty:
        if not any(x['id'] == Q['id'] for x in qs): qs.append(Q)
        rc = next(x for x in qs if x['id'] == 'room_cooling_units')
        if 'room_cooling_type' not in rc['inputs']: rc['inputs'].append('room_cooling_type')
        for k in ('coolloopBr', 'vertivCRVcat'):
            if k not in rc['sources']: rc['sources'].append(k)
    else:
        qs[Q['id']] = {k: Q[k] for k in ('name','formula','coef','unit','sources','conf','status')}
        for k in ('coolloopBr', 'vertivCRVcat'):
            if k not in qs['room_cooling_units']['sources']: qs['room_cooling_units']['sources'].append(k)
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, n)
