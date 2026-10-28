"""Second-check batch 14 (J.B. 28 Oct 2026), web. Check 1 = sweep_results.csv; check 2 = B14_a*.json. Corrections only
where both checks agree; single-check findings '?'. Internal notes with no document stay for the node review."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REPL = {
 'parssinen': [('heat-pump capex €60 k / €575 k (2 MW) / €5.5 M;', 'heat-pump capex €60 k / €575 k / €5.5 M for cases of about 50 / 500 / 5,000 racks (the 2 MW is a capacity block, not the medium case ?);'), ('payback 1.8–5.1 yr', 'payback 1.8–5.1 yr for the medium and large cases (small case over 10 yr)')],
 'solar': [('Vancouver Solar Access Guidelines (2024, am. 2026): fall-equinox shadows 10:00–16:00', "Vancouver solar access guidelines for the Downtown Peninsula (approved 17 Sep 2025; 'am. 2026' ?): equinox shadows 10 am to 4 pm PDT")],
 'cie150': [('(2021, supersedes GN01/20)', "(2021; the page says it 'has just been revised', earlier note not named ?)")],
 'schon2024': [('Schøn et al. 2024, J. Insects as Food and Feed, BSF rearing temperatures', 'Schøn et al. 2025 (online 2024), Journal of Insects as Food and Feed 11(6):1059–1074, doi:10.1163/23524588-00001268, BSF rearing temperatures')],
 'stulz': [('Stulz CyberAir 3PRO CRAC sound pressure @2 m', 'Stulz CyberAir 3PRO, ASR (underfloor-fan, downflow DX) units, brochure Sept 2016 (German edition): sound pressure @2 m ("CRAC" ?)')],
 'oldsNIA': [('equipment Lw table — ', 'equipment sound power (PWL), tabulated by octave band in Appendix D, Table D — ')],
 'lukeRAS': [('(Laajala): 4.6 GWh/yr heating for 1,000 t/yr rainbow trout', '(Härkönen, Vielma, Laajala): 4.6 GWh/yr lake-water heating, when below 15.5 °C (about 9 months), for 1,000 t/yr rainbow trout (Oulujärvi case; t/yr from kg ?)')],
 'dreyer2021': [('Int J LCA 26:2232, mealworm heating 10.38 MJ/kg', 'Int J LCA 26:2232–2247, heating electricity 10.38 MJ per kg of live mealworm (15.86 in a colder winter)')],
 'oekoBSF': [("Öko-Institut for UBA 2022, BSF facility heat 3,404 kWh per tonne input", "Öko-Institut 2022 (funded by UBA), workshop slide deck, BSF facility heat 3,404 kWh per Mg (tonne) input"), (' p.5', ' slide 4')],
 'ulavalCVD': [("Colosse heat recovery 1,150,000 kWh/yr to the campus chilled-water loop", "heat recovery from Colosse (the CVD's predecessor; CVD PUE ≈ 1.25) of about 1,150,000 kWh/yr, with heat rejected to the campus chilled-water network and picked up by heat pumps"), ('130,000 m³ gas/yr saved', "'de l'ordre de' 130,000 m³ gas/yr saved")],
 'edm18100': [('Edmonton Drainage Bylaw 18100 s.5.10(i): non-contact cooling water to the sanitary sewer only with prior written EWSI approval; no EPCOR sewer-heat programme found', 'Edmonton EPCOR Drainage Services Bylaw 18100 s.5.10(i): non-contact cooling water to the sanitary (or combined) sewer only with prior written EWSI approval; no EPCOR sewer-heat programme found (our search finding, not in the bylaw)')],
 'rootZone': [('UConn/UVM Extension, root-zone heating ~38 °C', 'Bartok (UConn) and Grubinger (UVM), Farm Energy / eXtension, root-zone heating (printed in °F; ~38 °C our conversion)')],
 'faoTrout': [('FAO rainbow trout fact sheet, 9–14 °C', 'FAO rainbow trout fact sheet, 9–14 °C (the spawning and growth range; the sheet also gives an optimum below 21 °C and a 12–21 °C site criterion)')],
 'edmBench': [('Edmonton building benchmarking: voluntary; dashboard pending', "Edmonton building benchmarking: owner consent needed ('voluntary' is our word); Year 7 dashboard 'coming soon'")],
 'iso9613': [('screen Lp ≈ Lw − 20·log10(r) − 8;', 'screen Lp ≈ Lw − 20·log10(r) − 8 (our simplification, not from the standard);')],
 'enmaxMap': [('ArcGIS layer Feeder_Load_Capacity_Rev9_20251211', 'ArcGIS layer Feeder_Load_Capacity_Rev9_20251211 (layer name not visible to the checks ?)')],
 'gwells': [('(well.csv, lithology.csv, screen.csv, pt_aquifer_parameters.csv)', '(well.csv, lithology.csv, screen.csv, pt_aquifer_parameters.csv; file names not confirmed online ?)')],
 'panFang2025': [('Strategy Science 10(4)', 'Strategy Science 10(4) (year, volume and issue not confirmed ?)')],
 'edmRezone': [('fees and durations not stated on the page', "fees not stated on the page; the only duration given is a 12-month bar on resubmitting a refused application")],
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
