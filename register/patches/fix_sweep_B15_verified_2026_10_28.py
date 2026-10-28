"""Second-check batch 15 (J.B. 28 Oct 2026), web. Check 1 = sweep_results.csv; check 2 = B15_a*.json. Corrections only
where both checks agree; single-check findings '?'. Unreachable items stay single-check."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REPL = {
 'ntnuRAS': [('NTNU, energy use for salmon RAS in Norway, 8.8 kWh/kg', 'NTNU, Current and Future Energy Use for Atlantic Salmon Farming in RAS in Norway: 8.8 kWh/kg is the mean on-site energy per kg live-weight smolt (range 5.1–12.8); grow-out to market size modelled at 6–10 kWh/kg')],
 'mvWWTP2026': [('and the sewerage area each serves;', "and the sewerage areas (the page does not pair each plant with an area; it also names a new North Shore plant);"), ('https://metrovancouver.org/services/liquid-waste', 'https://metrovancouver.org/services/liquid-waste/wastewater-treatment-plants-and-processes')],
 'msCircular': [('"83 percent reuse and 17 percent recycle of critical parts"', '"83 percent reuse and 17 percent recycle of critical parts" (Amsterdam centre only)'), ('azure.microsoft.com/ja-jp/blog/', 'azure.microsoft.com/blog/')],
 'est_wind2009': [('Domestic small-scale wind field trial report', 'Location, location, location: domestic small-scale wind field trial report')],
 'edm20001': [('IH use list UNVERIFIED', "IH: Major Industrial permitted, Minor Industrial 'limited to those existing as of January 1, 2024', no Data Centre (the IM attribution of that limit ?)")],
 'atlasCloud': [('instrument now inactive on MarketScreener', 'instrument now inactive on MarketScreener (not checked ?)')],
 'howley2021': [('supercooling to −0.106 °C (frazil ice); winter flow about 122 m³/s after the dams', 'supercooling of up to −0.106 °C observed (cited from Kalke et al. 2019 ?) (frazil ice); average Nov–Mar flow about 122 m³/s after the dams (cited from Total E&P Canada 2007 ?)')],
 'nrelBatt2025': [('fixed O&M 4% of capex a year', 'fixed O&M 4% of the $/kW capacity cost (a year ?)')],
 'codemaTallaght': [('almost 1,100 t CO2 saved in 2023', 'almost 1,100 t CO2 saved in 2023 (the page gives 1,100 t in the first year and over 1,400 t in 2025 ?)')],
 'fasken2026': [('BC Court of Appeal clarifies BCUC jurisdiction (12 Mar 2026;', "Family Ties: BC Court of Appeal Confirms BC Utilities Commission Jurisdiction over Affiliate Electricity Sales (Mar 2026, day ?;"), ('so supplying it is not self-supply', 'so supplying it is not self-supply (our reading of the holding ?)')],
 'vanOEM2018': [('Fire risks following an earthquake (4 Jun 2018)', "Fire Following EQ – Response to Council Inquiry (4 Jun 2018; title per check 2 ?)")],
 'gowlingEV2021': [('Regulation of electric vehicle charging services (2021)', 'Are electric vehicle charging services regulated "suppliers" of electricity? (27 May 2021 ?)')],
 'edmSidewalk': [('Sidewalk snow removal:', 'Residential Sidewalk Snow and Ice (page title ?):')],
 'wilde2017': [('CoolMUC-2:', 'CooLMUC-2:'), ('(peer-reviewed)', "(conference paper; 'peer-reviewed' ?)")],
 'riseMealworm': [('RISE (Swedish state research institute)', 'RISE (Swedish state research institute ?)'), ('(pilot, no results reported)', "('test bed'; no results reported)")],
 'greenMountainHima': [('warm water from DC-Telemark', "warm water from the Rjukan site (TEL-Rjukan; 'DC-Telemark' ?)")],
 'enelxDLR': [('Digital Realty Ireland: nine data centres in EirGrid DS3 frequency response', "Digital Realty (Ireland ?): nine data centres; DS3 frequency response (whether all nine are enrolled ?)")],
 'telehouse2026': [('Business Wire, 12 May 2026', 'Business Wire, 12 May 2026 (date from the URL ?)')],
 'heataCentrica': [('Centrica 2025,', 'Centrica 2025 (year from the URL ?),')],
 'ravi2026': [('Ravi et al. 2026, Applied Energy', 'Ravi et al. 2026, From servers to services: modeling data centers as heat-active urban energy prosumers (title ?), Applied Energy')],
 'bcaGuideCom': [("with strata units' areas x 15% for common areas", "with strata units' areas x 15% for common areas (stated for strata office and retail ?)")],
 'ubcReclaimed2022': [('Reclaimed water benefits and cost:', 'Reclaimed water benefits and cost saving evaluation in the context of Metro Vancouver:'), ('20–100% of potable (2007 survey)', '20–100% of potable (only the 19% of utilities that price as a share of potable; median 80% ?) (2007 survey, secondary)')],
 'upsiteASHRAE5': [('makers design around 40 °C', "'several manufacturers' design around 40 °C (Upsite's statement ?)")],
 'edmZB7120': [('7120-no-development-permit', '7120-no-development-permit-required'), ('on a building not on', "'mounted on a building' not on")],
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
