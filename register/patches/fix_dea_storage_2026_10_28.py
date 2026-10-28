"""dea pit storage, 28 Oct 2026, read from J.B.'s download: DEA, Technology Data – Energy storage, version 0011 (CC BY 4.0).
Ch. 140 p. 43: 'Footprint / [m2] = 20.15 * (Volume / [m3])0.61' (100,000 m³ → 22,600 m²). p. 45–46 table of built Danish pits:
capacity ÷ water volume = 47 (Høje Taastrup) to 97 (Gram) kWh/m³ for 2013–2022 pits (our arithmetic); price 0.36–1.83 €/kWh."""
import pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REP = [("Pit storage (140) is in DEA's separate Technology Data for Energy Storage, not this workbook (edition and values not checked ?)",
        "Pit storage is in DEA's separate Technology Data – Energy storage (version 0011, CC BY 4.0; saved in sources/library/public/deaStorage): ch. 140 Seasonal Heat Storage, p. 43 footprint = 20.15 × V^0.61 m² (100,000 m³ → 22,600 m²); p. 45–46 built Danish pits 2013–2022: 47–97 kWh of capacity per m³ (our arithmetic from the table), prices 0.36–1.83 €/kWh"),
       ("DEA ch.140 (text after Table 2): footprint = 20.15 × V^0.61", "DEA Technology Data – Energy storage v0011, ch. 140, p. 43: footprint = 20.15 × V^0.61"),
       ('"pit storage ≈ 20.15 V^0.61; ~47–97 kWh/m³; tank rule ~30 m³/MWh"', '"pit storage ≈ 20.15 V^0.61; ~47–97 kWh/m³ (built Danish pits, DEA v0011 p. 45–46, our arithmetic); tank rule ~30 m³/MWh"')]
for f in ('register/formula_register.json', 'tool/opps.json'):
    p = R / f; s = p.read_text(); n = 0
    for a, b in REP: n += s.count(a); s = s.replace(a, b)
    p.write_text(s); print(f, n)
