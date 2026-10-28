"""Second-check batch 5 (J.B. 28 Oct 2026): 50 'Found' sources. Check 1 = checks/sweep/sweep_results.csv; check 2 =
checks/sweep/B5_a1..a5.json. Corrections only where both checks agree; a finding from one check only is marked '?'.
Text and citations only: no engine value changes."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REPL = {
 'agsGround2009': [('undisturbed ground 6.1 °C to about 25 m; in-situ conductivity 1.74–2.01 W/m·K, design 1.90.', 'ground 6.1 °C to about 25 m (measured 3 Mar 2008; "undisturbed" ?); in-situ conductivity 1.74–2.01 W/m·K by line source, 1.59–1.81 by numerical model, design 1.90.'),
                   ('national map 6–12 °C (GSC OF 6914)', 'national map 6–12 °C (GSC OF 6914, a separate source, not checked ?)')],
 'alissa2025lca': [('(read by Claude 16 Oct 2026)', '(read by Claude 16 Oct 2026; percentages not re-checked, the workbooks could not be opened by the second check ?)')],
 'aucCoaldale2025': [('"are an attempt to self-distribute and are not permitted"', '"are an attempt to self-distribute and are not permitted" (para. 23; one check ties this to the Hydro and Electric Energy Act ?)')],
 'bcResCare': [('(licensed community care facilities, maximum capacity;', '(licensed residential care facilities, maximum capacity; "community care" ?;')],
 'bchDG100': [('per the 2010 requirements, which do not mention storage', 'per the 2010 requirements, which do not mention storage (?: not checked)')],
 'bchDR2026': [('BC Hydro peaks on weekday evenings (2021 demand report); records 5–6 pm (Dec 2022 winter, Jul 2026 summer)', 'BC Hydro peaks on weekday evenings (2021 demand report); records 5–6 pm (Dec 2022 winter, Jul 2026 summer) (?: these are not in this manual; need their own source)')],
 'bylaw6555': [('(cons. 14 Jul 2026)', '(cons. 14 Jul 2026 ?: one check reads 20 May 2025)'),
               ('dBC only for amplified music', 'dBC for bass sound from commercial premises (amplified or not, s. 3.1(a)) and for the Rogers Arena exemption (s. 4.3(g))')],
 'dkHeatCap2025': [('the 95 kr./GJ surplus-heat price cap (regulator notice 1 Nov 2024)', 'the 95 kr./GJ surplus-heat price cap (regulator notice 1 Nov 2024; ?: value and notice date are not in Lov nr 738 and need the Forsyningstilsynet notice)')],
 'edmNationsNamed': [('lists 15 Nations', 'lists 15 Nations (?: one check counts 16 member nations in the Confederacy list; no total printed)')],
 'edmZB580': [('no backing onto streets or alleys;', 'backing and turning must not interfere with traffic on abutting streets or alleys (s. 7.1.3; "no backing" ?);')],
 'emaWDA': [('facilities powered by fuel combustion over 5 MW need authorization', 'facilities powered by fuel combustion over 5 MW need authorization ("may need" ?)')],
 'engiePA10': [('10,800 MWh/yr projected, €5.7 M investment', '10,800 MWh projected (per year not printed ?), €5.7 M investment (? the 2022 release gives €4.3 M)')],
 'epaRain2013': [('pumps, controls, treatment US$2–5 per gallon (p. 24)', 'pumps, controls, filtration and treatment US$2–5 per gallon of harvesting-system capacity (p. 24 ?)')],
 'exergi': [("'indikativt 2 MSEK årligen för 1 MW vid 5 000 timmar' → 400 SEK/MWh; supply normally 68 °C", "indicative price about 2 MSEK a year for heat equal to 1 MW at 5,000 hours (operator figure; the earlier quote left out 'ca' and 'motsvarande') → 400 SEK/MWh (our calculation); supply normally 68 °C to the supply line (? the requirement can range to 103 °C)")],
 'exergiAR2023': [('meter owned by Exergi;', 'meter owned by Exergi (?);')],
 'isocPulseIXP': [('CSIX 16 participants', 'CSIX 16 participants ("members" ?)')],
 'jibcGroupLodging': [('3.5 m² per person,', '3.5 m² minimum sleeping area per person (the guide\'s own 1.5 × 2.5 m is 3.75 m² ?),')],
 'mvBylaw1329': [('(registration, fees, tier rules)', '(registration, labelling, low/moderate-use registration, prohibitions and surcharges ?)')],
 'neuReport': [('71% renewable;', '71% renewable (?: one check reads a 70% target, not achieved share);')],
 'nivosMantsala': [('— utility/programme reports', '(?: 4.0 MW heat pump, 20 GWh = 54 %, exhaust temperatures, gas −70 % and DH price −11 % not confirmed by either check) — utility/programme reports')],
 'nproCosts': [('"without any guarantee"', '"no guarantee can be made regarding accuracy or completeness"')],
 'nrcanPVmunic': [('Annual kWh/kWp —', 'Annual kWh/kWp (read from the downloaded CSV; not re-checked ?) —')],
 'cec2024ESS': [('(read 19 Oct 2026, J.B. library copy)', '(read 19 Oct 2026, J.B. library copy; rule text not second-checked, the code is paywalled ?)')],
 'euReg2024_1364': [(' — https://eur-lex.europa.eu', ' (?: details read from a reproduction, not EUR-Lex; re-read at the primary) — https://eur-lex.europa.eu')],
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
