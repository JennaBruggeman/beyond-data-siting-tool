"""Decision 4 (J.B. 28 Oct 2026): replace the proposed-2020 Sa(0.2) values with the final NBC 2020 values from the NRCan
2025-2020 NBC Seismic Hazard Tool, Site Class C, 2%/50 yr, read for the three chosen sites (screenshots in
sources/library/public/nrcanHazard2020). V09 1.08; E05 0.152; E06 0.154. seismic_sa02 is register text only (not computed)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
NEW = ("NRCan, 2025 - 2020 National Building Code of Canada Seismic Hazard Tool (date modified 2026-01-21), NBC 2020, Site Class C, "
       "2%/50 yr, read 28 Oct 2026: Sa(0.2) V09 275 1st Ave E (49.269, −123.097) 1.08; E05 8803 Stadium Rd NW (53.555, −113.477) 0.152; "
       "E06 Airport Rd NW (53.569, −113.522) 0.154 — https://www.seismescanada.rncan.gc.ca/hazard-alea/interpolat/nbc-cnb-en.php")
TXT = [('"Vancouver 0.848, Edmonton 0.103 (proposed 2020 table; final table not read): Vancouver about 8×"',
        '"NBC 2020 final, Site Class C: Vancouver (V09) 1.08, Edmonton (E05 0.152, E06 0.154): Vancouver about 7×"'),
       ('"Sa(0.2) for the city; replace with the NRCan calculator value for the parcel"', '"Sa(0.2), 2%/50 yr, Site Class C, from the NRCan NBC 2020 hazard tool for the parcel"'),
       ('"status": "proposed values"', '"status": "NRCan tool, 28 Oct 2026"')]
for p, pretty in ((R / 'register/formula_register.json', True), (R / 'tool/opps.json', False)):
    s = p.read_text(); n = 0
    for a, b in TXT: n += s.count(a); s = s.replace(a, b)
    d = json.loads(s)
    for sec in (('new_sources', 'old_sources') if pretty else ('sources',)):
        if 'nrcSeismic2020' in d[sec]: d[sec]['nrcSeismic2020'] = NEW; n += 1
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1) if pretty else json.dumps(d, ensure_ascii=False, separators=(',', ':')))
    print(p.name, n)
