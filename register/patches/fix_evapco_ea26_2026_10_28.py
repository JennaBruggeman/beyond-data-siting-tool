"""EVAPCO eco-Air catalogue EA26MRKT (©2026), uploaded by J.B. 28 Oct 2026, read by Claude (p.8 figure, p.13 drawing and table):
- 12 m V-coil dry cooler EAW-VD9120ZA: 20 fans in two rows of 10 (plan drawing), L 39'-5-7/8" (12.04 m), W 7'-9-7/8" (2.38 m),
  overall height 9'-5-1/2" (2.88 m, dimension line base to top of fan), 4461 MBH = 1.31 MW at 110→100 °F, 92 °F dry bulb (maker's claim).
- Adiabatic version: same drawing, 'Adiabatic width: 9' 7/8"' (2.77 m); wetted pads stand outside both coil faces (p.8 figure).
  The tool's 2.5 m hybrid height has no source; 2.88 m is the drawing's height (the note gives only the width for adiabatic units)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REP = [
 ("up to 12 m long, 1.8–2.8 m wide, 2.5 m high, 2–10.6 t (? sizes not confirmed in the brochures read)",
  "up to 12 m long, 1.8–2.8 m wide; the 12 m, 8' V-coil adiabatic model is 12.04 × 2.77 m and 2.88 m high (EVAPCO EA26MRKT ©2026 p.13: L 39'-5-7/8\", adiabatic width 9'-7/8\", height 9'-5-1/2\"; pads outside both coil faces, p.8), 2–10.6 t (other makers' sizes ?)"),
 ("height 1.45–2.9 m; 160 kg to 10.6 t operating (only the EVAPCO sheet re-read, which prints MBH and inches; other makers ?)",
  "height 1.45–2.9 m; 160 kg to 10.6 t operating (other makers ?). EVAPCO EA26MRKT (©2026) p.13: 12 m V-coil EAW-VD9120ZA, 20 fans in two rows, 12.04 × 2.38 m, 2.88 m high (9'-5-1/2\"), 4461 MBH = 1.31 MW (maker's claim)"),
]
NEWSRC = {'evapcoEA26': "EVAPCO, eco-Air Series Closed Circuit Coolers, Bulletin EA26MRKT (©2026; J.B. download 28 Oct 2026): p.8 adiabatic and spray principles (pads outside both coil faces); p.13 V-coil EC twin-fan 8' models: EAW-VD9120ZA 20 fans, 4461 MBH, L 39'-5-7/8\", W 7'-9-7/8\" (adiabatic 9'-7/8\"), H 9'-5-1/2\"; 'Dimensions are subject to change. Do not use for pre-fabrication.'"}
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; s = p.read_text(); n = 0
    for a, b in REP: n += s.count(a); s = s.replace(a, b.replace("\"", "\\\""))
    d = json.loads(s); (d['new_sources'] if pretty else d['sources']).update(NEWSRC)
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, n)
