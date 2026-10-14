# Add-ons ("what would happen if we added X to this option"), 14 Oct 2026.
# Quantities, conditions, sources and the add-on catalogue, from research reports sources/15a–15d.
# Idempotent: re-running replaces earlier add-on entries. Confidence follows the register scale.
import json, os
h = os.path.dirname(os.path.abspath(__file__))
P = os.path.join(h, 'formula_register.json')
r = json.load(open(P, encoding='utf-8'))

SRC = {
 'lbnl2024': 'Shehabi et al., 2024 United States Data Center Energy Usage Report, LBNL-2001637, Lawrence Berkeley National Laboratory, Dec 2024 — https://climate.mit.edu/sites/default/files/2025-02/lbnl-2024-united-states-data-center-energy-usage-report.pdf',
 'femp_ct': 'US DOE FEMP, Best Management Practice #10: Cooling Tower Management (2013, modified 2026); EPA WaterSense at Work §6.3 — https://www.energy.gov/node/849241',
 'arden2021': 'Arden et al., Onsite Non-potable Reuse for Large Buildings, Water Research 191:116635 (2021) — https://pasteur.epa.gov/uploads/10.23719/1519028/Arden%20et%20al.%2C%202021.pdf',
 'gsa_gpg052': 'US GSA Green Proving Ground, Blowdown Recovery System for Cooling Towers, Findings GPG-052 (Aug 2023; NREL evaluation) — https://www.gsa.gov/system/files/GPG%20Findings-052-Blowdown%20Recovery-14Sep23.pdf',
 'mv_ut019': 'Metro Vancouver, Interim Reclaimed Water Policy UT-019 (29 Sep 2023) — https://metrovancouver.org/boards/Policies/interim-reclaimed-water.pdf',
 'bc_mwr': 'BC Municipal Wastewater Regulation, B.C. Reg. 87/2012, s.104 and Table 13 (reclaimed water categories) — https://free.bcpublications.ca/civix/document/id/complete/statreg/87_2012',
 'ab_health2021': 'Alberta Health, Public Health Guidelines for Water Reuse and Stormwater Use (2021) — https://open.alberta.ca/dataset/6a57d29c-d437-4dd9-94e3-d96bedc01bb4/resource/d533afcb-2933-43da-9199-eea030148c00/download/health-public-health-guidelines-water-reuse-stormwater-use-2021.pdf',
 'ab_p1701': 'Alberta STANDATA P-17-01-NPC15, Reclaimed water systems — single property (Jan 2017, archived) — https://open.alberta.ca/dataset/42295e2f-cf70-44e4-bac9-7a027c4a0c5e/resource/50a4b829-e50b-40fb-9883-351b9a2b1e0f/download/p-17-01-reclaimedwatersystemssingleproperty.pdf',
 'nasem2016': 'National Academies, Using Graywater and Stormwater to Enhance Local Water Supplies (2016), Ch. 3 — https://www.nationalacademies.org/read/21866/chapter/5',
 'van_vbbl2025_27': 'City of Vancouver Building By-law 2025, Book II (Plumbing Systems) insert pages, By-law 14343 effective 15 Sep 2025 as amended by By-law 14488 effective 1 Jan 2026, Div. B, Art. 2.7.1.2–2.7.1.3 and Table 2.7.1.3 — https://vancouver.ca/files/cov/2025-vbbl-book-II-insert-pages.pdf (convenience copy)',
 'van_vbbl2019_27': 'City of Vancouver Building By-law 2019 (consol. 25 Jul 2023), Div. B, Art. 2.7.1.2 non-potable water systems — https://free.bcpublications.ca/civix/document/id/public/vpbl2019/734749594',
 'mv_bylaw299': 'Metro Vancouver Sewer Use Bylaw 299 (consolidated) — https://metrovancouver.org/boards/Bylaws/GVSDD_Bylaw_299_Consolidated.pdf',
 'msft_water2026': 'Microsoft blog, Inside Microsoft\'s two-decade push to cut water intensity (24 Jun 2026) — operator claim — https://blogs.microsoft.com/blog/2026/06/24/inside-microsofts-two-decade-push-to-cut-water-intensity-while-scaling-for-growth/',
 'nrcan_pv2006': 'Pelland, Poissant, McKenney et al., The Development of Photovoltaic Resource Maps for Canada, CANMET (NRCan) 2006-046, Table 1 — https://natural-resources.canada.ca/sites/www.nrcan.gc.ca/files/canmetenergy/files/pubs/2006-046_OP-J_411-SOLRES_PV+map.pdf',
 'nrel_rooftop2016': 'Gagnon et al., Rooftop Solar PV Technical Potential in the United States, NREL/TP-6A20-65298 (2016) — https://nrel.gov/docs/fy16osti/65298.pdf',
 'nrel_bench2023': 'Ramasamy et al., U.S. Solar PV System and Energy Storage Cost Benchmarks Q1 2023, NREL/TP-7A40-87303 — https://www.nrel.gov/docs/fy23osti/87303.pdf',
 'ieapvps_bipv': 'IEA PVPS Task 15 summary of Yang et al. (2026), BIPV yield and economic feasibility, Energy and Buildings, doi:10.1016/j.enbuild.2026.118031 — https://iea-pvps.org/key-topics/journal-article-multi-objective-assessment-of-bipv-yield-complementarity-and-economic-feasibility/',
 'nrcan_pvcost2024': 'NRCan / IEA PVPS National Survey Report of PV Power Applications in Canada 2024 (installed CAD/W by size) — see sources/15b',
 'bch_rs2289': 'BC Hydro, Self-generation (Rate Schedule 2289, from 1 Jul 2026; RS 1289 net metering closed) — https://app.bchydro.com/accounts-billing/electrical-connections/customer-generation/self-generation.html',
 'auc_microgen': 'AUC, Micro-generation notice submission guideline (2026), quoting Micro-generation Regulation s.1(1)(h) — https://media.auc.ab.ca/prd-wp-uploads/regulatory_documents/Reference/MicrogenerationNoticeSubmissionGuideline2026.pdf',
 'bc_ef2026': 'Government of BC, Electricity emission intensity factors (updated 26 May 2026) — https://www2.gov.bc.ca/gov/content/environment/climate-change/data/electricity',
 'ab_ghgperf': 'Government of Alberta, Alberta\'s greenhouse gas emissions reduction performance — https://www.alberta.ca/albertas-greenhouse-gas-emissions-reduction-performance',
 'est_wind2009': 'James, Bahaj, Anwar, Myers, Domestic small-scale wind field trial report, Energy Saving Trust (2009) — read from a vendor-hosted copy; official copy to retrieve (eprints.soton.ac.uk/353113)',
 'zurmuhl2018': 'Zurmuhl et al., Hybrid geothermal heat pumps for cooling telecommunications data centers, Stanford Geothermal Workshop 2018 — https://pangea.stanford.edu/ERE/pdf/IGAstandard/SGW/2018/Zurmuhl.pdf',
 'kindaichi2018': 'Kindaichi & Nishina, Renewable Energy 127 (2018) 182–194, doi:10.1016/j.renene.2018.04.065 — https://ideas.repec.org/a/eee/renene/v127y2018icp182-194.html',
 'drake_landing': 'Drake Landing Solar Community, Okotoks AB: measured BTES performance (Sibbitt et al. 2012; Mudasar et al., CSME 2020) — see sources/15c',
 'li2021_dcbtes': 'Li et al. (2021), borehole thermal energy storage for a 0.9 MW data centre (peer-reviewed design study) — see sources/15c',
 'ags_edmonton': 'Alberta Geological Survey, ground thermal properties near Edmonton (Hastings Lake test; design k 1.9 W/m·K, 6.1 °C) — see sources/15c',
 'majorowicz2021': 'Majorowicz & Grasby, Deep Geothermal Heating Potential for the Communities of the Western Canadian Sedimentary Basin, Energies 14(3):706 (2021) — https://www.mdpi.com/1996-1073/14/3/706',
 'aer_d089': 'Alberta Energy Regulator, Directive 089: Geothermal Resource Development (7 Feb 2025) — https://static.aer.ca/prd/documents/directives/Directive-089.pdf',
 'bc_gwpr': 'BC Groundwater Protection Regulation, B.C. Reg. 39/2016 (closed-loop geoexchange wells) — https://free.bcpublications.ca/civix/document/id/complete/statreg/39_2016',
 'ab_gshe2018': 'Alberta, Directive for Water Wells and Ground Source Heat Exchange Systems (2018) — data/AB_Directive_Water_Wells_GSHE_2018.pdf',
 'barth2026': 'Barth, Schefel, Blum, Menberg, Potential of aquifer thermal energy storage (ATES) for data centres in Germany, Geothermal Energy 14:11 (2026) — https://publikationen.bibliothek.kit.edu/1000192638/179927510',
 'atb2024_batt': 'NREL Annual Technology Baseline 2024, Commercial Battery Storage — https://atb.nrel.gov/electricity/2024/commercial_battery_storage',
 'pnnl2022': 'PNNL, Energy Storage Grand Challenge Cost and Performance Assessment 2022 (PNNL-33283) — https://www.sandia.gov/app/uploads/sites/256/2024/02/ESGC-Cost-Performance-Report-2022-PNNL-33283.pdf',
 'reber2023': 'Reber, Jarvis, Marshak, Beyond energy density: flow battery design driven by safety and location, RSC (2023), Table 1 — https://pubs.rsc.org/en/content/articlehtml/2023/ya/d3ya00208j',
 'bch_esi': 'BC Hydro, Energy Storage System Incentive — https://www.bchydro.com/powersmart/business/programs/large-demand-response/energy-storage-system-incentive.html',
 'bch_drb': 'BC Hydro, Demand Response for Business customer manual — https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/power-smart/business/programs/demand-response-for-business-customer-manual.pdf',
 'aeso_or': 'AESO, Operating reserve (ancillary services) — https://aeso.ca/market/ancillary-services/operating-reserve/',
 'auc_27938': 'AUC Decision 27938-D01-2023, Amazon Data Services Canada (10 Mar 2023) — https://efiling-webapi.auc.ab.ca/Document/Get/784765',
 'ap42_34': 'US EPA, AP-42 5th ed., Vol. I, §3.4, Table 3.4-1 (Apr 2025) — https://www.epa.gov/system/files/documents/2025-04/c03s04_april2025.pdf',
 'bc_rlcf012': 'BC Low Carbon Fuels, Approved Carbon Intensities – Current (RLCF-012, rev. 30 Apr 2026) — https://www2.gov.bc.ca/assets/gov/farming-natural-resources-and-industry/electricity-alternative-energy/transportation/renewable-low-carbon-fuels/rlcf012_approved_carbon_intensities_current_29apr2026final.pdf',
 'absorption2026': 'Absorption chiller temperatures and COP (Energies 19(9):2147, 2026) — https://www.mdpi.com/1996-1073/19/9/2147',
}

def Q(id, name, stage, unit, formula, inputs, coef, sources, conf, status, addon, roles=None):
    return dict(id=id, name=name, stage=stage, unit=unit, formula=formula, inputs=inputs, coef=coef, sources=sources,
                source_roles=roles or [dict(id=s, term=name, role='data', conf=conf, verified=conf >= 60) for s in sources],
                conf=conf, status=status, addon=addon)

NEW = [
 # water
 Q('reclaimed_makeup', 'Reclaimed water as cooling make-up', 'opportunity', 'L/yr',
   'V_rec = s × make-up, with make-up = evaporation × C ÷ (C − 1)',
   ['evaporation', 'blowdown', 'water_supply'],
   'C (cycles of concentration) 2–4 typical, up to 6 (FEMP/EPA); 4–6 run on treated municipal wastewater (US DOE-funded study, 2012; power-plant scale); s = share substituted, user-set 0–1; operator precedents 0.74–0.99 (Microsoft, operator claim); data-centre site water 0.32–0.36 L/kWh (LBNL 2024, denominator to confirm); Metro Vancouver will consider supplying reclaimed water case by case for industrial uses (UT-019, 2023); EPCOR Gold Bar already supplies treated water to industry (operator claim, no volumes); no Canadian data-centre case found',
   ['femp_ct', 'lbnl2024', 'mv_ut019', 'msft_water2026'], 60, 'screening; Vancouver and Edmonton supply volumes and prices not found', 'reclaimed'),
 Q('greywater_neighbours', 'Greywater available from neighbours', 'opportunity', 'L/yr',
   'V_gw = residents within reach × 98 L/person/day × 365; used = min(V_gw × recovery, make-up)',
   ['people_affected'],
   '98 L/person/day residential greywater (National Academies 2016, US data); treatment recovery share not found (gap); cross-property sharing: no BC or Alberta rule text found',
   ['nasem2016'], 45, 'screening; recovery rate a gap', 'greywater'),
 Q('treatment_energy', 'Electricity to treat reused water', 'opportunity', 'kWh/yr',
   'E = m³ treated × e',
   ['reclaimed_makeup', 'greywater_neighbours'],
   'e = 0.75–1.1 kWh/m³ greywater membrane bioreactor; 0.94–1.28 mixed wastewater (Arden et al. 2021, US EPA authors); ~4.6 kWh/m³ in one small blackwater plant (university report, low confidence); viable only where water + sewer cost ≥ US$2.38/m³ (greywater) or US$1.85/m³ (mixed) (Arden 2021, US 2020 dollars)',
   ['arden2021'], 60, 'in hand (US values)', 'greywater'),
 Q('blowdown_recovery', 'Blowdown recovered', 'opportunity', 'L/yr',
   'make-up × 0.84; blowdown × 0.47; + 3,541 kWh/yr per skid',
   ['blowdown'],
   'one US federal test (GSA GPG-052, NREL evaluation, 2023): blowdown −53 %, make-up −16 %, cycles 2.8 → 4.9; US$46.8k installed; hard water, single site',
   ['gsa_gpg052', 'femp_ct'], 50, 'single test site', 'blowdown'),
 # power
 Q('pv_roof', 'Solar on the data centre roof', 'opportunity', 'kWp; MWh/yr',
   'kWp = roof area × 0.66 × (1 − plant share) × 0.70 × 0.16–0.20; MWh = kWp × yield',
   ['massing', 'plant_schedule'],
   'yield 1,009 kWh/kWp·yr Vancouver, 1,245 Edmonton at latitude tilt, ±10 %, losses included (NRCan 2006, Table 1) — an upper bound for 15° flat-roof arrays until NRCan horizontal values are retrieved (D9); module density 0.16 kWp/m² (2014 median) to 0.20 (current) (NREL); module cover 0.70 of a flat roof at 15° tilt; 66 % of large roofs suitable (NREL 2016); roof share taken by plant from the cooling module',
   ['nrcan_pv2006', 'nrel_rooftop2016', 'nrel_bench2023'], 70, 'in hand; NRCan horizontal and vertical values to retrieve', 'pv'),
 Q('pv_facade', 'Solar on the facade', 'opportunity', 'MWh/yr',
   'MWh = south facade area × module density × yield × 0.4–0.6',
   ['massing'],
   'vertical BIPV needs 1.7–2.5 × the area of rooftop PV for the same energy (IEA PVPS summary of Yang et al. 2026) → factor 0.4–0.6, interim until NRCan vertical values; no Canadian BIPV cost found',
   ['ieapvps_bipv', 'nrcan_pv2006'], 40, 'interim factor', 'pv_facade'),
 Q('pv_share', 'Share of the data centre\'s power from its own solar', 'test', '%',
   'pv_MWh ÷ (IT load × PUE × 8,760)',
   ['pv_roof', 'pv_facade', 'it_load_actual', 'pue'],
   'worked check (roof areas assumed, not sourced): 1 MW IT site 1.4–4.8 %; 10 MW site 0.28–0.96 %; PV is a small share at data-centre densities; avoided carbon BC 22.8 tCO2e/GWh (2025), Alberta 335 g/kWh (2024 generation intensity)',
   ['nrcan_pv2006', 'bc_ef2026', 'ab_ghgperf'], 70, 'derived', 'pv'),
 Q('pv_cost', 'Solar installed cost', 'test', 'CAD/W',
   'kWp × 1,000 × rate by size',
   ['pv_roof'],
   'CAD 2.00–3.20/W under 100 kW; 1.90–2.40 for 100–250 kW; 1.68–2.22 above 250 kW (NRCan/IEA PVPS Canada 2024); O&M ≈ US$21/kW·yr, 30-yr life, 0.5–0.7 %/yr degradation (NREL, US)',
   ['nrcan_pvcost2024', 'nrel_bench2023'], 70, 'in hand', 'pv'),
 Q('battery', 'Battery storage', 'opportunity', 'MW; MWh; m²',
   'MWh = MW × hours (1–8, default 4); area m² = kWh ÷ 34 (19–49)',
   ['it_load_actual'],
   'round-trip 85 %, life 15 yr, O&M 2.5 % of capital per yr (NREL ATB 2024); US$385/kWh installed LFP at 100 MW 4 h, 2021 — a floor for urban 1–10 MW (PNNL 2022); 34 ± 15 kWh/m² across built sites (Reber 2023); fire-code basis in BC/AB (NFPA 855 adoption) unconfirmed',
   ['atb2024_batt', 'pnnl2022', 'reber2023'], 70, 'in hand; urban costs a gap', 'battery'),
 Q('ups_flex', 'UPS batteries offered to the grid', 'opportunity', 'MWh; minutes',
   'flexible MWh = IT load × UPS minutes ÷ 60 × 0.5 (half held for outages)',
   ['it_load_actual', 'flexible_load'],
   'UPS runtime 1–2 min (hyperscale), ~5 min (colocation), 10–15 min (financial) — vendor figures, operator claim; useful for fast frequency response, not for 4-hour peaks',
   ['aeso_or'], 45, 'operator claims only', 'ups'),
 Q('peak_relief', 'Peak relief and what it earns', 'test', 'MW; $/yr',
   'MW = min(battery MW, MWh × √RTE ÷ event hours); $ = programme rate × kW',
   ['battery', 'ups_flex', 'electricity_price'],
   'BC Hydro: Demand Response for Business $50/kW-season, events ≤4 h, Nov–Mar, diesel and fossil generators prohibited; Energy Storage Incentive ≤80 % of eligible cost, new non-exporting batteries ≥25 kW, 10-yr contract (an existing UPS does not qualify); LGS demand charge $13.83/kW·month; AESO reserves need ≥5 MW (supplemental) or ≥10 MW (spinning), smaller sites via an aggregator',
   ['bch_drb', 'bch_esi', 'aeso_or'], 75, 'in hand', 'battery'),
 # carbon
 Q('genset_test', 'Generator testing emissions', 'characterise', 't CO2; kg NOx, PM',
   'energy = units × kW × test hours at load; × emission factors',
   ['generator_co2', 'generator_nox_pm', 'backup_hours'],
   'testing ≈14.5 h/yr per unit, ~4 h at full load (AUC 27938-D01-2023, Amazon 25.6 MW, derived); Vancouver noise by-law exemption caps tests ≈15 h/yr; uncontrolled diesel 14.6 g NOx, 0.43 g PM, 706 g CO2 per kWh (AP-42 Table 3.4-1, upper bound for modern engines); Alberta exempts standby generators from environmental approval',
   ['auc_27938', 'ap42_34'], 65, 'in hand (upper bounds)', 'genset'),
 Q('hvo_swap', 'Renewable diesel in the generators', 'characterise', 'g CO2e/MJ',
   'Δ lifecycle CO2e = fuel energy × (CI diesel − CI renewable diesel)',
   ['genset_test'],
   'BC approved fuel codes −7 to 131 g CO2e/MJ (RLCF-012, Apr 2026); stack CO2, NOx and PM stay about the same; fossil diesel reference CI to retrieve',
   ['bc_rlcf012'], 55, 'reference CI missing', 'genset'),
 # ground
 Q('borefield', 'Borefield as the data centre\'s heat sink', 'opportunity', 'm of borehole; m²',
   'L = heat to ground (W) ÷ q; boreholes = L ÷ 150 m; area = boreholes × 36 m²',
   ['heat_rejected', 'ground'],
   'q = 12 W/m ground-only to 19 W/m with a dry cooler (derived from Zurmuhl et al. 2018, a 14.5 kW data centre, Ithaca, k 3.27 W/m·K); Edmonton design k 1.9 W/m·K (Alberta Geological Survey) → ~7–11 W/m (scaling is an assumption); ≈2 ha of borefield per MW rejected; 40 MW ≈ 0.8 km²; screening only — CSA C448 sizing and a thermal response test required; no Vancouver ground data found',
   ['zurmuhl2018', 'ags_edmonton', 'bc_gwpr', 'ab_gshe2018'], 40, 'screening; no standard for continuous rejection', 'borefield'),
 Q('ground_warming', 'Ground warming over 20 years', 'test', 'K',
   'from the share of heat put in vs taken out',
   ['borefield'],
   '+4.7 K over 20 yr ground-only, +1.2 K with a dry cooler (Zurmuhl 2018, small field); about +3 K in 3 yr where 4.8 × more heat went in than out (Kindaichi 2018, field measurement) — a borefield only lasts if neighbours take heat back out in winter',
   ['zurmuhl2018', 'kindaichi2018'], 55, 'small-field evidence', 'borefield'),
 Q('btes', 'Seasonal ground store for neighbours', 'opportunity', 'MWh/yr',
   'heat out = η × heat stored; boreholes = charge W ÷ 47–83 W/m ÷ 35–55 m',
   ['heat_captured', 'stored_heat', 'receiver_demand'],
   'η 0.45 steady state (simulated), 0.32–0.56 measured years 3–10, 0.06–0.21 in years 1–2 (Drake Landing, Okotoks); a 0.9 MW data-centre design: 240 boreholes, 55 m deep, 3 m apart, 1,863 m², waste-heat use 77 → 96 %, ~17-yr payback (Li et al. 2021); heat-pump COP for the lift not given (gap)',
   ['drake_landing', 'li2021_dcbtes'], 60, 'in hand; COP a gap', 'btes'),
 Q('ates', 'Aquifer heat store (open loop)', 'opportunity', 'm³/h; MWh/yr',
   'flow = MW × 3.6 ÷ (4.18 × ΔT); heat out ≈ 0.6 × heat in',
   ['ground', 'heat_captured'],
   '172 m³/h per MW at ΔT 5 K (assumption); injection ≤25 °C typical (Netherlands limit; no BC/AB limit found) — air-cooled data-centre heat (25–35 °C) may exceed it; recovery 0.6 (0.4–0.85), ≈ €300/kW at 2 MW (Barth et al. 2026); BC: water licence (WSA); Alberta: Water Act approval or licence + professional report',
   ['barth2026', 'bc_gwpr', 'ab_gshe2018'], 45, 'screening', 'ates'),
 Q('deep_geo', 'Deep geothermal heat', 'opportunity', 'MWth',
   'MWth = flow × c × (T_res − T_return)',
   ['receiver_demand'],
   'Edmonton: ~90 °C at 2.5 km, 30–80 kg/s → 2.1–5.6 MWth average per well pair, $4.7–8 M per well (Majorowicz & Grasby 2021); licensed by the AER (Directive 089, 2025); competes with data-centre heat as a district source rather than cooling the data centre; Vancouver: not plausible for power, direct use unproven',
   ['majorowicz2021', 'aer_d089'], 55, 'Edmonton only', 'deep_geo'),
 # building thermal storage and cooling for neighbours
 Q('tes_volume', 'Hot or chilled water tank', 'opportunity', 'm³',
   'litres per kWh = 3,600 ÷ (4.18 × ΔT) ÷ 0.85',
   ['heat_captured', 'demand_profile'],
   '144 L/kWh at ΔT 6 K, 29 L/kWh at 30 K (physics); ice ≈ 10.5 kg per kWh; usable share 0.85 and tank heights are assumptions; costs too wide to use (IRENA range)',
   [], 75, 'physics; costs a gap', 'tes'),
 Q('absorption', 'Cooling for neighbours from waste heat', 'opportunity', 'kW cooling',
   'cooling = recovered heat × COP, if temperature allows',
   ['heat_temp', 'heat_captured'],
   'single-effect absorption needs ≥90 °C, COP 0.6–0.7; two-stage 70–80 °C, COP <0.4 (Energies 2026); data-centre heat 25–35 °C air-cooled (no), 50–60 °C liquid-cooled (only with a heat-pump lift)',
   ['absorption2026'], 65, 'in hand', 'absorption'),
]
CONDS = [
 dict(id='a_reuse_rules', heading='11 What if we added', name='Water reuse is allowed for this source and use',
      test='city × source (rain, reclaimed, greywater, blackwater) × use (cooling make-up) is permitted',
      quantities=['reclaimed_makeup', 'greywater_neighbours', 'blowdown_recovery', 'rainwater'], move=['policy', 'time'],
      parties=['operator', 'city', 'neighbours'], constraint=False,
      note='Vancouver Building By-law 2025, Book II (as amended to 1 Jan 2026), Art. 2.7.1.2–2.7.1.3: rainwater and clear-water waste may supply cooling-tower make-up and adiabatic cooling (Table 2.7.1.3, Column B); greywater only from NSF/ANSI 350 Class R single-family systems, reused in the same dwelling unit for toilets, urinals and clothes washers — not for cooling; blackwater may not be collected. Alberta: single-property reuse limited to toilets and subsurface irrigation (P-17-01, archived), other uses by variance; Alberta Health 2021 lists cooling towers with treatment targets. Taking someone else\'s treated wastewater needs Water Act authorisation in Alberta and falls under the Municipal Wastewater Regulation in BC.',
      sources=['van_vbbl2025_27', 'van_vbbl2019_27', 'ab_p1701', 'ab_health2021', 'bc_mwr', 'mv_ut019']),
 dict(id='a_pv_export', heading='11 What if we added', name='Solar fits the generation rules',
      test='size and export within the provincial programme', quantities=['pv_roof', 'pv_facade', 'self_gen_rules'],
      move=['policy', 'choice'], parties=['operator', 'utility', 'ratepayers'], constraint=False,
      note='BC Hydro RS 2289 (from 1 Jul 2026): up to 100 kW AC, exports credited 10 ¢/kWh; larger needs interconnection study. Alberta: micro-generation ≤ 5 MW and ≤ the site\'s annual use, retail credit under 150 kW, pool price above.',
      sources=['bch_rs2289', 'auc_microgen']),
 dict(id='a_ground_land', heading='11 What if we added', name='There is ground for a borefield',
      test='borefield area ≤ land available on or next to the parcel (parking, parks, streets)', quantities=['borefield', 'btes', 'ground_warming'],
      move=['choice', 'infra', 'policy'], parties=['operator', 'city', 'neighbours'], constraint=False,
      note='≈2 ha per MW rejected to ground alone; Alberta setbacks 1 m from buildings, 3 m from property lines, 15 m from water wells; BC closed-loop wells need a registered driller and a construction report; boreholes under streets or parks need City agreement (rules not found).',
      sources=['zurmuhl2018', 'ab_gshe2018', 'bc_gwpr']),
 dict(id='a_absorption_temp', heading='11 What if we added', name='The heat is hot enough to make cooling',
      test='heat temperature ≥ the absorption chiller\'s minimum', quantities=['absorption', 'heat_temp'],
      move=['physics', 'choice'], parties=['operator', 'neighbours'], constraint=True,
      note='Air-cooled heat cannot drive absorption cooling; liquid-cooled heat can only with a heat-pump lift or a low-COP two-stage machine.',
      sources=['absorption2026']),
 dict(id='a_storage_fire', heading='11 What if we added', name='Battery storage meets fire rules on an urban site',
      test='code path and separation for a battery system are confirmed', quantities=['battery'],
      move=['time', 'policy', 'money'], parties=['operator', 'city', 'neighbours'], constraint=False,
      note='Whether NFPA 855 is referenced by the BC or Alberta building and fire codes was not confirmed; Technical Safety BC withdrew its storage bulletin in March 2025.',
      sources=['reber2023']),
]
CAT = [
 dict(id='rainwater', name='Rainwater for cooling', family='water', status='sized', quantities=['rainwater'], rules={'vancouver': 'allowed (cooling-tower make-up)', 'edmonton': 'variance needed'}, changes=['water from the city ↓', 'tank space ↑']),
 dict(id='reclaimed', name='Treated city wastewater for cooling', family='water', status='screening', quantities=['reclaimed_makeup'], rules={'vancouver': 'case by case (Metro Vancouver UT-019)', 'edmonton': 'precedent at Gold Bar; Water Act authorisation'}, changes=['potable water ↓', 'treatment cost ↑']),
 dict(id='greywater', name='Greywater recycling', family='water', status='screening', quantities=['greywater_neighbours', 'treatment_energy'], rules={'vancouver': 'not for cooling: 2025 by-law allows greywater only within one single-family dwelling (Art. 2.7.1.2(3))', 'edmonton': 'variance needed'}, changes=['water ↓', 'electricity ↑', 'space ↑']),
 dict(id='blackwater', name='Blackwater treatment on site', family='water', status='screening', quantities=['treatment_energy'], rules={'vancouver': 'not a permitted source (2025 by-law, Art. 2.7.1.2(2)(f))', 'edmonton': 'variance needed'}, changes=['water ↓', 'electricity ↑', 'space ↑', 'approvals ↑']),
 dict(id='blowdown', name='Recover blowdown', family='water', status='screening', quantities=['blowdown_recovery'], rules={'vancouver': 'internal process', 'edmonton': 'internal process'}, changes=['make-up ↓ 16 %', 'sewer discharge ↓ 53 %']),
 dict(id='pv', name='Solar on the roof', family='power', status='sized', quantities=['pv_roof', 'pv_share', 'pv_cost'], rules={'vancouver': 'RS 2289 ≤100 kW AC', 'edmonton': 'micro-generation ≤5 MW'}, changes=['grid power ↓ a few %', 'roof space ↓', 'carbon ↓ (small in BC)']),
 dict(id='pv_facade', name='Solar on the facade', family='power', status='screening', quantities=['pv_facade'], rules={'vancouver': 'as above', 'edmonton': 'as above'}, changes=['grid power ↓', 'facade appearance changes']),
 dict(id='battery', name='Battery storage', family='power', status='sized', quantities=['battery', 'peak_relief'], rules={'vancouver': 'fire code path unconfirmed', 'edmonton': 'fire code path unconfirmed'}, changes=['grid peak ↓', 'space ↑', 'earnings from programmes']),
 dict(id='ups', name='Offer UPS batteries to the grid', family='power', status='screening', quantities=['ups_flex'], rules={'vancouver': 'no BC programme found', 'edmonton': 'AESO reserves ≥5 MW or via aggregator'}, changes=['fast grid support', 'no new space']),
 dict(id='genset', name='Cleaner backup power', family='carbon', status='sized', quantities=['genset_test', 'hvo_swap'], rules={'vancouver': 'testing within noise exemption', 'edmonton': 'standby exempt from approval'}, changes=['diesel carbon ↓', 'NOx and PM ↓ only with batteries or fuel cells']),
 dict(id='borefield', name='Borefield heat sink', family='ground', status='screening', quantities=['borefield', 'ground_warming'], rules={'vancouver': 'registered driller; report', 'edmonton': 'setbacks (2018 directive)'}, changes=['dry-cooler noise ↓', 'land ≈2 ha per MW', 'ground warms unless heat is taken out']),
 dict(id='btes', name='Seasonal ground store for neighbours', family='heat_use', status='sized', quantities=['btes'], rules={'vancouver': 'as borefield', 'edmonton': 'as borefield'}, changes=['winter heat ↑', 'land ↑', 'first years weak']),
 dict(id='ates', name='Aquifer heat store', family='ground', status='screening', quantities=['ates'], rules={'vancouver': 'water licence', 'edmonton': 'Water Act approval or licence'}, changes=['winter heat ↑', 'licence time ↑']),
 dict(id='deep_geo', name='Deep geothermal', family='ground', status='screening', quantities=['deep_geo'], rules={'vancouver': 'not plausible', 'edmonton': 'AER Directive 089'}, changes=['competes with data-centre heat']),
 dict(id='tes', name='Hot or chilled water tank', family='heat_use', status='sized', quantities=['tes_volume'], rules={'vancouver': '—', 'edmonton': '—'}, changes=['peaks shifted', 'space ↑']),
 dict(id='absorption', name='Cooling for neighbours', family='heat_use', status='gate', quantities=['absorption'], rules={'vancouver': 'temperature gate', 'edmonton': 'temperature gate'}, changes=['cooling to neighbours (liquid-cooled only)']),
 dict(id='wind', name='Small wind', family='power', status='excluded', quantities=[], rules={}, changes=[], reason='Building-mounted turbines in UK urban and suburban trials made ≤200 kWh/yr each, load factor ≤3 % (Energy Saving Trust 2009; Energy Policy 2010); shown so users can see why it is out.', sources=['est_wind2009']),
 dict(id='biomass', name='Biomass or renewable gas', family='carbon', status='excluded', quantities=[], rules={}, changes=[], reason='Adds combustion to the urban airshed (Metro Vancouver requires dispersion modelling for biomass boilers), the data centre already has surplus heat, and renewable gas is a fuel-accounting choice with limited supply (sources/15d §5).', sources=[]),
]

ids = {q['id'] for q in NEW}
r['quantities'] = [q for q in r['quantities'] if q['id'] not in ids] + NEW
cids = {c['id'] for c in CONDS}
r['conditions'] = [c for c in r['conditions'] if c['id'] not in cids] + CONDS
r['new_sources'].update(SRC)
r['meta']['addons'] = CAT
r['meta']['addons_note'] = 'Add-ons answer "what would happen if we added X to this option". Each changes rows of the trade-off table and carries its rule status per city; "excluded" add-ons are shown with the reason. From sources/15a–15d (14 Oct 2026).'
ol = r['meta']['options_logic']
step = 'let the user add or remove add-ons on any option (rainwater, reclaimed water, greywater, blackwater, solar, batteries, cleaner backup power, borefield, seasonal store, aquifer store, deep geothermal, water tanks, cooling for neighbours) and show what each changes'
if step not in ol['steps']: ol['steps'].insert(4, step)

# --- 14 Oct (J.B.): sort the "what if" items by which way the exchange runs ---
KIND = {  # opportunity = the data centre gives the place; place = the place gives the data centre; technology = the data centre's own choice
 'btes': 'opportunity', 'absorption': 'opportunity', 'battery': 'opportunity', 'ups_flex': 'opportunity', 'peak_relief': 'opportunity', 'tes_volume': 'opportunity',
 'reclaimed_makeup': 'place', 'greywater_neighbours': 'place', 'borefield': 'place', 'ground_warming': 'place', 'ates': 'place', 'deep_geo': 'place',
 'pv_roof': 'technology', 'pv_facade': 'technology', 'pv_share': 'technology', 'pv_cost': 'technology', 'blowdown_recovery': 'technology',
 'treatment_energy': 'technology', 'genset_test': 'technology', 'hvo_swap': 'technology'}
STAGE = {'opportunity': 'opportunity', 'place': 'place', 'technology': 'characterise'}
KEEP_TEST = {'peak_relief', 'ground_warming', 'pv_share', 'pv_cost'}
for q in r['quantities']:
    if q['id'] in KIND:
        k = KIND[q['id']]; q['trial'] = k; q.pop('addon', None)
        q['stage'] = 'test' if q['id'] in KEEP_TEST else STAGE[k]
        if k == 'place': q['direction'] = 'place'
OG = r['opportunity_quantities']
def addto(g, ids):
    OG.setdefault(g, [])
    for i in ids:
        if i not in OG[g]: OG[g].append(i)
addto('Seasonal storage in the ground', ['btes'])
addto('Reserved capacity and batteries to the grid', ['battery', 'ups_flex'])
addto('Cooling for neighbours', ['absorption', 'heat_temp'])
addto('District heat to a network', ['tes_volume'])
CATK = {'rainwater': 'technology', 'reclaimed': 'place', 'greywater': 'place', 'blackwater': 'technology', 'blowdown': 'technology', 'pv': 'technology',
        'pv_facade': 'technology', 'battery': 'opportunity', 'ups': 'opportunity', 'genset': 'technology', 'borefield': 'place', 'btes': 'opportunity',
        'ates': 'place', 'deep_geo': 'place', 'tes': 'opportunity', 'absorption': 'opportunity', 'wind': 'technology', 'biomass': 'technology'}
for a in CAT: a['kind'] = CATK[a['id']]
r['meta'].pop('addons', None); r['meta'].pop('addons_note', None)
r['meta']['try_menu'] = CAT
r['meta']['try_menu_note'] = 'What would happen if we added X: any option can try these. Each is sorted by which way the exchange runs — an opportunity (the data centre gives the place), something the place gives the data centre, or the data centre\'s own technology choice. Sources: sources/15a–15d (14 Oct 2026).'
ol = r['meta']['options_logic']
ol['steps'] = [s for s in ol['steps'] if not s.startswith('let the user add or remove add-ons')]
step2 = 'let the user try things on any option — "what if we added…" — whether an opportunity for the place (a seasonal heat store, cooling for neighbours, batteries for the grid), something the place offers (reclaimed water, neighbours\' greywater, the ground), or a technology choice (solar, water recovery, cleaner backup power) — and show what each changes and the rules in each city'
if step2 not in ol['steps']: ol['steps'].insert(4, step2)
json.dump(r, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(NEW), 'quantities,', len(CONDS), 'conditions,', len(CAT), 'add-ons')
