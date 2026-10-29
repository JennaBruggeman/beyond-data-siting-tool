"""Second makers for the single-maker types, 29 Oct 2026 (checks/node_review/select_gaps.md).
- Heat pump: GEA RedAstrum / RedGenium (brochure 7757-3000-017 rev 10-26, GEA Systems North America, p.17, 60/80 °C output) added to
  Sabroe DualPAC 7xx: 10 units, 5.6–15.1 m² per MW of heat (our calculation), median 9.05 → basis Sabroe DualPAC 716-W (9.19).
- Li-ion UPS cabinet: Delta LZH (leaflet © 2025: 400 kW for 5 min, 620 × 625 × 2185 mm) added to Vertiv EnergyCore Li5:
  1.0–1.8 m² per MW for about 5 minutes (our calculation); Vertiv stays the drawn basis (North American, CSA printed; Delta does not print either).
- Dry cooler: SPX Marley OlympusV (TECH-OLYAD-26 3/2026; OLYMPUSV-26 1/2026), dry rating 115→105 °F at 95 °F: 24.1–25.0 m² per MW; EVAPCO
  21.9. The tool's sizing (24.5 m² per MW per unit) already sits at the median of the three; EVAPCO stays the drawn unit because it is the
  only one with a dimensioned drawing (fan rows, coil shape). No maker prints an adiabatic capacity."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REP = [
 ("Li-ion batteries 1.8 m² for about 5 min (Vertiv EnergyCore Li5, 4 cabinets per MW; one maker readable)",
  "Li-ion batteries 1.0–1.8 m² for about 5 min (Vertiv EnergyCore Li5, 4 cabinets per MW; Delta LZH, 400 kW per rack; basis Vertiv)"),
 ("heat pumps 9.2–15.1 m² per MW heat (Sabroe DualPAC 7xx rated to 90 °C; basis 712-W; HeatPAC dropped, its document is not on the maker's site)",
  "heat pumps 5.6–15.1 m² per MW heat (Sabroe DualPAC 7xx, GEA RedAstrum/RedGenium at 60/80 °C; basis DualPAC 716-W; HeatPAC dropped, its document is not on the maker's site)"),
 ("dry coolers 19.5–30.5 m²,", "dry coolers 19.5–30.5 m² (EVAPCO 21.9, SPX Marley OlympusV 24.1–25.0 dry-rated; the tool sizes 24.5),"),
]
NEWSRC = {
 'geaRedHP': "GEA, Red Heat Pumps brochure 7757-3000-017 (rev 10-26), GEA Systems North America, metric table p.17: RedAstrum MH 1,575 kW at 40/35 → 60/80 °C, 7050 × 2150 × 2450 mm; RN 3,019 kW, 7900 × 2150 × 2750 mm; RedGenium 550 1,362 kW (35/30 → 60/80, paired by column order), 6450 × 2150 × 2500 mm (manufacturer claims)",
 'deltaLZH': "Delta Electronics, LZH Series lithium-ion battery leaflet (© 2025): '400 kW with 5 mins (BOL)' per rack; 620 × 625 × 2185 mm with top-hat (1910 mm without); UL 1973, UL 9540A (manufacturer claims)",
 'spxOlympusV': "SPX Cooling Tech, Marley OlympusV adiabatic cooler: engineering data TECH-OLYAD-26 (3/2026) lengths and dry ratings (VWS20 4,983 MBH; VWS29 4,668 MBH at 115→105 °F, 95 °F DB, CTI-certified); brochure OLYMPUSV-26 (1/2026) nominal width 2.90 m, height 3.05 m (manufacturer claims)",
}
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; s = p.read_text(); n = 0
    for a, b in REP: n += s.count(a); s = s.replace(a, b)
    d = json.loads(s); (d['new_sources'] if pretty else d['sources']).update(NEWSRC)
    qs = d['quantities']
    for q in (qs if isinstance(qs, list) else qs.values()):
        if q.get('id') == 'component_space' or q.get('name') == 'Space for the plant':
            for k in NEWSRC:
                if k not in q['sources']: q['sources'].append(k)
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, n)
