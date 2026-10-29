"""Equipment study, 29 Oct 2026 (J.B.: "make sure we are selecting things for a reason"; approved the rule and picks the same day).
Rule: compare makers' own current documents (data-centre or district-heating product at the right size, sold in Canada, size and
capacity printed); use the unit nearest the median area per MW as the drawn basis; the range across makers goes in the register.
Full tables: checks/node_review/select_heat.md, select_power.md, select_hall.md. Values below re-read by Claude: Vertiv AFC FIZ135,
Rehlko KD2000 (G5-626), KD1000 (G6-154)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REP = [
 ("air cooling → air-cooled chillers with free-cooling coils, 17–26 m²/MW (Trane TCA;",
  "air cooling → air-cooled chillers with free-cooling coils, 16.4–30.5 m²/MW across Vertiv Liebert AFC and Airedale TurboChill DCS, basis Vertiv AFC FIZ135 at 19.3 (equipment study 29 Oct 2026; Trane TCA dropped: Trane says it works 'without relying on glycol or separate free-cooling coils';"),
 ("Manufacturer claims per MW: UPS ≈2.0–2.4 m², Li-ion batteries ≈2.2 m² (5 min), air-cooled chillers 17–26 m², cooling towers ≈8 m², dry coolers ≈24.5 m², heat pumps ≈3.4 m² per MW heat, CDUs ≈0.6 m²;",
  "Manufacturer claims per MW (equipment study 29 Oct 2026, range across makers compared): UPS 2.4–3.3 m² (Vertiv EXL S1, Schneider Galaxy VX, ABB MegaFlex UL; basis Galaxy VX), Li-ion batteries 1.8 m² for about 5 min (Vertiv EnergyCore Li5, 4 cabinets per MW; one maker readable), air-cooled chillers 16.4–30.5 m², cooling towers 4.7–16.5 m² (BAC Series 3000, Marley NC; basis BAC S3E-1222-07R), dry coolers 19.5–30.5 m², heat pumps 9.2–15.1 m² per MW heat (Sabroe DualPAC 7xx rated to 90 °C; basis 712-W; HeatPAC dropped, its document is not on the maker's site), CDUs 0.4–1.5 m² (10 units, 6 makers; basis Motivair MCDU-50);"),
]
NEWSRC = {
 'vertivAFC': "Vertiv, Liebert AFC air-cooled free cooling chiller 900–1800 kW, SL-71060 (R09/24), 'Preliminary data': FIZ135 423 tons (1489 kW) at 95 °F ambient, 82/66 °F fluid, 30% ethylene glycol, 460 V/60 Hz; 478 × 93 × 114 in (12141 × 2362 × 2896 mm); 'oversized free cooling coils' — https://www.vertiv.com/49fe65/globalassets/shared/vertiv-liebert-afc_datasheet_en-na.pdf",
 'airedaleDCS': "Airedale by Modine, TurboChill DCS sales brochure (2025): TCF13R18K 985 kW, 10.55 × 2.844 × 2.2 m; TCF24R24G 1600 kW, 14.385 × 2.90 × 2.2 m, at 30/20 °C water, 35 °C ambient, 50 Hz (manufacturer claims) — https://www.airedale.com/wp-content/uploads/2025/07/TurboChill_DCS_Sales_Brochure_280925.pdf",
 'rehlkoKD2000': "Kohler/Rehlko, Industrial Diesel Generator Set KD2000, G5-626 (rev 6/24d): 2000 kW standby, data-center continuous same as standby; Sound Level 2 enclosure 13493 × 3488 × 4777 mm max; Tier 2 EPA; cULus UL 2200 and CSA C22.2 No. 100 — https://techcomm.kohler.com/techcomm/pdf/g5626.pdf",
 'rehlkoKD1000': "Kohler/Rehlko, KD800–KD2500 enclosure and sub-base tank dimensions, G6-154 (12/23): KD1000 Sound Level 2, 3475 L (12 h) tank 8434 × 2616 × 3706 mm; 6621 L (24 h) 8434 × 2616 × 3934 mm; KD1000 spec sheet G5-580 (9/24) — https://techcomm.kohler.com/techcomm/pdf/KD800-2500_G6154.pdf",
 'bacS3000ed': "BAC, Series 3000 Engineering Data, Product & Application Handbook Vol. VI pp. C15–C17 (file 20231020; J.B. upload 28 Oct 2026): S3E-1222-07R 690 nominal tons, L 11'-10\", W 21'-7\", H 12'-9\", A 11'-4\"; access door both ends; nominal tons at 95/85/78 °F — https://baltimoreaircoil.com/download_api_endpoint/6026/C015_PAHBvi_3000_ED_20231020.pdf",
 'equipStudy2026': "Beyond Data equipment study, 29 Oct 2026: makers compared per type from their own documents, basis = unit nearest the median area per MW (checks/node_review/select_heat.md, select_power.md, select_hall.md)",
}
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; s = p.read_text(); n = 0
    for a, b in REP: n += s.count(a); s = s.replace(a, b.replace('"', '\\"'))
    d = json.loads(s); (d['new_sources'] if pretty else d['sources']).update(NEWSRC)
    qs = d['quantities']
    for q in (qs if isinstance(qs, list) else qs.values()):
        if q.get('id', '') == 'component_space' or q.get('name') == 'Space for the plant':
            for k in ('vertivAFC', 'airedaleDCS', 'rehlkoKD2000', 'rehlkoKD1000', 'bacS3000ed', 'equipStudy2026'):
                if k not in q['sources']: q['sources'].append(k)
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, n)
# mfrGenset: the source text keeps its history; its sizes are replaced by the Rehlko basis
for f in ('register/formula_register.json', 'tool/opps.json'):
    p = R / f; s = p.read_text()
    a = 'Standby diesel generator sets in enclosures (Cat 3516C enclosure sheet; Cummins S-1443): about 2 MW — 13.9 × 2.7 m, 3.9–5.0 m high;'
    b = 'Standby diesel generator sets in enclosures (basis since 29 Oct 2026: Rehlko KD2000 13.49 × 3.49 m, 4.78 m high, and KD1000 8.43 × 2.62 m, 3.71 m high — see rehlkoKD2000, rehlkoKD1000; earlier: Cat 3516C enclosure sheet; Cummins S-1443): about 2 MW — 13.9 × 2.7 m, 3.9–5.0 m high (Cat);'
    print(f, 'mfrGenset', s.count(a)); p.write_text(s.replace(a, b))
