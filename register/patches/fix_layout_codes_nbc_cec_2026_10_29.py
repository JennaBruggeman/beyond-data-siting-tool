"""Layout rules checked against J.B.'s own copies of NBC 2020 (Vol. 1) and CSA C22.1:24 (CEC Part I), read on her computer, 29 Oct 2026
(the CEC text is not stored; only article numbers and short wording are cited).
- CEC 2-308 1): working space 1 m; 2-310 2): equipment rated 1200 A or more or over 750 V must be arranged so a person can leave without
  passing the failure point, otherwise the working space is not less than 1.5 m. Our earlier text ('1.5 m at 1200 A or more') was too strong.
- CEC 26-010: service rooms are required for small dielectric-liquid equipment; no CEC rule found that puts a UPS in a service room.
  CEC 64-804 2): batteries with exposed energized parts in a room or enclosure for authorized persons only; 64-1100 9): ESS evaluated to
  UL 9540A may be installed to the maker's instructions.
- NBC 2020 3.6.2.1.(6): electrical equipment the CEC requires in a service room → 1 h; 3.6.2.1.(7): in a storey not sprinklered throughout,
  a service room with other service equipment → 1 h; (8) limited quantity exempt. So a separate UPS and battery room is code-required at
  1 h only where the storey is not sprinklered (reading UPS and batteries as 'service equipment' is ours ?); otherwise it is a design choice.
- NBC 2020 3.4.2.5.(1): travel distance 45 m sprinklered (c), 40 m business (b), 30 m otherwise (f); 3.3.1.9.(1),(5): corridors 1 100 mm,
  dead ends ≤ 6 m; 3.3.1.10: aisles 'in conformance with the NFC' (NFC not read ?). Edmonton uses NBC(AE) 2023 (Alberta amendments not read ?)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
NEWSRC = {
 'nbc2020_v1': "National Building Code of Canada 2020, Vol. 1 Div. B (NRC; J.B.'s copy NBC2020p2.pdf, read 29 Oct 2026): 3.3.1.9.(1) public corridor 1 100 mm, (5) dead-end corridor ≤ 6 m; 3.3.1.10.(1) aisles 'in conformance with the NFC'; 3.4.2.5.(1) travel distance to an exit ≤ 45 m in a floor area sprinklered throughout (c), 40 m business (b), 30 m otherwise (f); 3.6.2.1.(6) CEC-required service rooms 1 h; (7) service room in a storey not sprinklered throughout 1 h; (8) limited-quantity exemption (pp. 3-143, 3-161)",
 'cec2024': "CSA C22.1:24 Canadian Electrical Code, Part I, 26th ed. (J.B.'s copy, read on her computer 29 Oct 2026; text not stored): Rule 2-308 1) working space 1 m with secure footing; 5) 2.2 m headroom at exposed bare live parts; Rule 2-310 2) 1200 A or more or over 750 V: arranged so a person can leave without passing the failure point, otherwise working space not less than 1.5 m; Rule 26-010 service rooms for small dielectric-liquid equipment; Rule 64-804 2) batteries with exposed energized parts in a room or enclosure for authorized persons; Rule 64-1100 9) ESS evaluated to UL 9540A installed to the maker's instructions",
}
REP = [
 ("room: a service room with a 1 h fire separation where the electrical rules require one (VBBL 3.6.2.1(6); whether a UPS triggers it is in the electrical code, not read ?); working space in front of the UPS 1.5 m (Galaxy VX 1000 kW draws 1203 A at 480 V, at or above 1200 A: CEC Rule 2-308 per ESA Bulletin 2-9-9; 1 m below 1200 A), headroom 2.2 m;",
  "room: no CEC rule found that puts a UPS in a service room (CEC 26-010 covers liquid-filled equipment); NBC 2020 / VBBL 3.6.2.1.(7) require a 1 h service room for service equipment in a storey not sprinklered throughout (reading UPS and batteries as service equipment is ours ?), so the separate room is code-required only there and drawn everywhere as a choice; working space in front of the UPS 1 m (CEC 2-308), and because the Galaxy VX 1000 kW is rated 1203 A at 480 V (≥ 1200 A) the room must let a person leave without passing it, otherwise 1.5 m (CEC 2-310 2)) — the tool draws 1.5 m because doors are not placed; headroom 2.2 m at exposed live parts (2-308 5));"),
 ("battery cabinets 0.914 m clear in front, 0.457 m above, 25 mm to a wall, none side to side (Vertiv, UL 9540A-tested);",
  "battery cabinets 0.914 m clear in front, 0.457 m above, 25 mm to a wall, none side to side (Vertiv, UL 9540A-tested; CEC 64-1100 9) lets UL 9540A systems follow the maker's instructions);"),
 ("egress: public corridors 1.1 m, dead ends ≤ 6 m, travel distance ≤ 45 m sprinklered (VBBL 2019 3.3.1; Edmonton (NBC(AE) 2023) not read ?)",
  "egress: public corridors 1.1 m, dead ends ≤ 6 m, travel distance to an exit ≤ 45 m sprinklered or 30 m otherwise (NBC 2020 3.3.1.9, 3.4.2.5; VBBL 2019 the same); aisles follow the NFC (not read ?); Edmonton uses NBC(AE) 2023 (Alberta amendments not read ?)"),
]
for f, pretty in (('register/formula_register.json', True), ('tool/opps.json', False)):
    p = R / f; s = p.read_text(); n = 0
    for a, b in REP: n += s.count(a); s = s.replace(a, b.replace('"', '\\"'))
    d = json.loads(s); (d['new_sources'] if pretty else d['sources']).update(NEWSRC); qs = d['quantities']
    for q in (qs if isinstance(qs, list) else [dict(v, id=k) for k, v in qs.items()]):
        pass
    for key, add in (('electrical_room', ['nbc2020_v1', 'cec2024']), ('hall_layout', ['nbc2020_v1'])):
        tgt = next((x for x in qs if x['id'] == key), None) if isinstance(qs, list) else qs.get(key)
        for k in add:
            if k not in tgt['sources']: tgt['sources'].append(k)
        if pretty:
            roles = tgt.setdefault('source_roles', [])
            if key == 'electrical_room':
                roles += [dict(id='cec2024', term='1 m / 1.5 m working space; ESS to maker instructions', role='rule', conf=90, verified=True), dict(id='nbc2020_v1', term='service room 1 h where not sprinklered', role='rule', conf=90, verified=True)]
            else:
                roles += [dict(id='nbc2020_v1', term='corridors, dead ends, travel distance', role='rule', conf=90, verified=True)]
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(f, n)
