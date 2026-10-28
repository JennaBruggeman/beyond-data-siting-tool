"""Second-check batch 4 (J.B. 28 Oct 2026): 8 group A single-check items + 42 'Found' sources. Check 1 =
checks/sweep/sweep_results.csv; check 2 = checks/sweep/B4_a1..a5.json. Corrections only where both checks agree; a finding
from one check only is marked '?'. spencerBldg: 'City permit not found' contradicted by our own permit records
(sources/11_vancouver_permits.md). Text and citations only: no engine value changes."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REPL = {
 'teliaHKI2024': [('5.65 MW to DH (4.11 waste heat + 1.45 added)', '5.65 MW to DH (4.11 waste heat + 1.45 added; 4.11 + 1.45 = 5.56, so one figure is misprinted ?)'),
                  ('Telia, Helsinki Data Center cooling options for AI/GPU loads (operator PDF)', 'Telia, Helsinki Data Center cooling options for AI/GPU loads (operator PDF; printed title ?: "Cooling options for AI/GPU loads in Telia Helsinki Data Center")')],
 'van_rts19744': [('rezoning of 111 E 5th Ave (data centre), 14 Jul 2026', 'CD-1 rezoning of 111 E 5th Ave (and 2060 Quebec St ?) (data centre), report 30 Jun 2026 for Council 14 Jul 2026')],
 'dell': [('(2U); R650 21.25 kg (1U); Danczak 2018 rare earths; Graedel 2011 copper', '(product weights; 2U ?); R650 21.25 kg (1U) (?: not found in these PDFs); Danczak 2018 rare earths and Graedel 2011 copper (separate sources, not in the Dell PDFs ?)')],
 'hiltunen2020': [('heat-recovery capex 0.5–0.65 M€/MW', 'assumes 0.6 M€/MW(heat) for data-centre heat pumps; the 0.5–0.65 range comes from the studies it cites (Wahlroos; Rämä), not the paper itself')],
 'nfpa855tia': [('rooftop units 3 ft apart, ≥5 ft from roof edge;', 'rooftop units 3 ft apart, ≥5 ft from roof edge (these are in TIA 23-2, not 23-1; the 3 ft applies to individual units ≤20 kWh, and the roof-edge distance is the system height but not less than 5 ft ?);'),
                 ('Hydro One (Ontario utility standard) quotes §9.5.2.6.1', 'Hydro One (Ontario utility standard) quotes §9.5.2.6.1 (?: not verified)')],
 'epaQuincy': [('138 M gal/yr potable saved', '138 M gal/yr saved (estimated; "potable" ?)')],
 'rvo2018': [('(IF Technology, 7 Nov 2018)', '(IF Technology ?: printed author Barry Scholten; IF Technology made the maps for Berenschot; 7 Nov 2018)')],
 'zurmuhl2018': [('Stanford Geothermal Workshop 2018', 'Stanford Geothermal Workshop 2018 (printed: 43rd Workshop on Geothermal Reservoir Engineering, 12–14 Feb 2018 ?)')],
 'abCCcompliance2026': [('as of June 2026 (Open Government Licence – Alberta)', 'as of June 2026 (Open Government Licence – Alberta) (?: ministry name, date and licence not printed on the dataset page)')],
 'rule012': [('consolidated 30 Sep 2024 (74 pp.)', 'effective 30 Sep 2024 (approved 5 Jun 2024; "consolidated" and 74 pp. ?)'),
             ('Bulletin 2026-03 (17 Apr 2026)', 'Bulletin 2026-03 (17 Apr 2026 ?: one check finds only a bulletin of 3 Jul 2024)')],
 'blatchfordBP2021': [('City URL not yet checked', 'City URL not yet checked (?: one check read the City\'s 2020–2023 edition, which has the energy centre in the Town Centre and no Blatchford Market sewer lines or m² forecast; check the uploaded file)')],
 'skatOverskud': [("(tax.dk is a private mirror; wording not re-checked at the primary ?)", "(tax.dk is a private mirror; at info.skat.dk, E.A.4.6.10.6 'skal måles hver for sig' refers to taxed and tax-exempt surplus heat, and the heat-pump rule and 3 × deduction were not found ?)")],
 'spencerBldg': [('City permit not found', 'City permits BP-2022-05512 (Apr 2023, Office → Bulk Data Storage on floors 6, 8, 9; generators to an L8 roof well) and BP-2024-01976 (see sources/11_vancouver_permits.md, 515 W Hastings)')],
 'abAIDCstrategy2024': [('; Water Act allocation)', '; the Water Act allocation line is in the "Water" section, p. 6, not under the pillar ?)')],
 'aesoStats2025': [('operating reserve volumes and costs by category;', 'operating reserve volumes and costs (by type: active procured, standby procured, standby activated; "by category" ?);')],
 'ceud': [('J.B. download of res_bc_e_2, res_ab_e_2, com_bct_e_3, com_ab_e_3 (data/)', 'J.B. download of res_bc_e_2, res_ab_e_2, com_bct_e_3, com_ab_e_3 (data/; file names ?: the site lists zips such as resbc2023e.zip)')],
 'van_zdb_i2': [('I-2 District Schedule (current)', 'I-2 District Schedule (dated March 2025; current ?)')],
 'dfKatalog2022': [('DH output ≈ 30 % above DC-side heat', 'DH output ≈ 30 % above DC-side heat (?: not checked; Table 1.1 lists 19 MW)')],
 'ab_gshe2018': [('Directive for Water Wells and Ground Source Heat Exchange Systems (2018)', 'Water Wells and Ground Source Heat Exchange Systems Directive (2018)')],
 'epcor_ccg': [('EPCOR, Power Customer Connection Guide', "EPCOR, Power Customer Connection Guide (?: one check reads the title as 'EDTI Customer Connection Guide', 1 Aug 2025)")],
 'mfrBESS': [('≈42 t (StarCharge, Sungrow data sheets)', '≈42 t (StarCharge, Sungrow data sheets; ? one check reads ~43 t on the StarCharge sheet)')],
 'jlarc2024': [('residential bills +$14–37/month', 'residential bills +$14–37/month (typical Dominion residential customer by 2040, real $ ?)'),
               ('https://jlarc.virginia.gov/pdfs/reports/Rpt598-2.pdf', 'https://jlarc.virginia.gov/pdfs/reports/Rpt598-2.pdf (one check read Rpt598.pdf ?)')],
}
reg = R / 'register/formula_register.json'; r = json.loads(reg.read_text())
op = R / 'tool/opps.json'; o = json.loads(op.read_text())
done, miss = set(), []
for d in (r['new_sources'], r['old_sources'], o['sources']):
    for i, reps in REPL.items():
        if i in d:
            for a, b in reps:
                if a in d[i]: d[i] = d[i].replace(a, b); done.add(i)
                elif b not in d[i]: miss.append((i, a[:40]))
reg.write_text(json.dumps(r, ensure_ascii=False, indent=1)); op.write_text(json.dumps(o, ensure_ascii=False, separators=(',', ':')))
print('applied', len(done), 'of', len(REPL), 'miss', miss)
