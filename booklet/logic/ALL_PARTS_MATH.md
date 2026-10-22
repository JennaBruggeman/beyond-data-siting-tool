# Every part of the logic, with its math

Verbatim from `diagram_data.json` (the tool's own register, 21 Oct 2026): formula, coefficients, inputs, trust and sources. 195 parts in 8 stages, 261 links. Use these words and symbols as they are; do not simplify the numbers.


## 1. What we start with

### Weather file  (`weather`)

- Stage: What we start with · unit: — · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: free_cooling_hours, demand_profile, free_cooling_hours_2050s
- Trust: own 80 / 100 · weakest input (chain) 80 / 100 · status: read or asked

```
weather = f()
CWEC typical year, hourly
```

### Receiver temperature  (`receiver_temp`)

- Stage: What we start with · unit: — · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: cop, receivers_nearby
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: read or asked

```
receiver_temp = f()
°C the receiver needs
```

### Receivers nearby  (`receivers`)

- Stage: What we start with · unit: — · level: Civic
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: receiver_demand, crossing_type
- Trust: own 60 / 100 · weakest input (chain) 60 / 100 · status: read or asked

```
receivers = f()
buildings and uses within reach
```

### Host building  (`host_building`)

- Stage: What we start with · unit: — · level: Civic
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: hall_area, floor_load_need, vibration_rank, displaced_source
- Trust: own 50 / 100 · weakest input (chain) 50 / 100 · status: read or asked

```
host_building = f()
part of an existing building: owner or tenant, other uses, heating system, walls and orientation, room for heat rejection, electrical service, floor height, floor load
```

### Zone  (`zone`)

- Stage: What we start with · unit: — · level: Everyday
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: zoning_status, envelope
- Trust: own 80 / 100 · weakest input (chain) 80 / 100 · status: read or asked

```
zone = f()
zoning district and sub-area
```

### Parcel  (`parcel`)

- Stage: What we start with · unit: — · level: Everyday
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: floor_area, ground, surface_water_sink, electricity_price, water_supply, existing_building, ambient_cover, interconnection, zoning_status, envelope, service_class, receivers_nearby, uhi_context, restriction_history, seismic_sa02, nations_named
- Trust: own 80 / 100 · weakest input (chain) 80 / 100 · status: read or asked

```
parcel = f()
address → folio, lot, zoning, footprint, storeys
```

### Cooling type  (`cooling_type`)

- Stage: What we start with · unit: — · level: Civic
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: heat_temp, liquid_capture, evaporation, refrigerant_co2e, component_space, water_restriction_rule
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: read or asked

```
cooling_type = f()
air / glycol-dry cooler / chilled water / liquid
```

### Sewer flow  (`sewer_flow`)

- Stage: What we start with · unit: — · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: sewage_heat, sewer_sink
- Trust: own 20 / 100 · weakest input (chain) 20 / 100 · status: read or asked

```
sewer_flow = f()
m³/day in the main past the parcel
```

### Massing  (`massing`)

- Stage: What we start with · unit: — · level: Everyday
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: rainwater, shadow, rooftop_solar, existing_building, pv_roof, pv_facade
- Trust: own 80 / 100 · weakest input (chain) 80 / 100 · status: read or asked

```
massing = f()
height and footprint
```

### What is being built  (`start_case`)

- Stage: What we start with · unit: — · level: Everyday
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: zoning_status, component_space, floor_load_need, fuel_on_site, flood_exposure, vibration_rank
- Trust: own 100 / 100 · weakest input (chain) 100 / 100 · status: read or asked

```
start_case = f()
new or existing · whole or part · which floor · or a special case
```

### Plant on site  (`plant_schedule`)

- Stage: What we start with · unit: — · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: noise_level, visibility, pv_roof, heat_plume_dT, recirculation_flag
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: read or asked

```
plant_schedule = f()
generators, chillers, dry coolers, transformers — what, where
```

### Noise receptors  (`receptors`)

- Stage: What we start with · unit: — · level: Civic
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: noise_level, ambient_cover, people_affected
- Trust: own 80 / 100 · weakest input (chain) 80 / 100 · status: read or asked

```
receptors = f()
nearest dwellings and their distance
```

### Area considered  (`area`)

- Stage: What we start with · unit: — · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: heat_density, people_affected
- Trust: own 100 / 100 · weakest input (chain) 100 / 100 · status: read or asked

```
area = f()
hectares around the parcel
```

### Spare cooling  (`spare_cooling`)

- Stage: What we start with · unit: — · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: cooling_centre_people
- Trust: own 40 / 100 · weakest input (chain) 40 / 100 · status: read or asked

```
spare_cooling = f()
cooling capacity beyond IT load
```

### Lighting  (`lighting_plan`)

- Stage: What we start with · unit: — · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: light_at_window
- Trust: own 60 / 100 · weakest input (chain) 60 / 100 · status: read or asked

```
lighting_plan = f()
exterior lighting as seen
```

### Floodplain  (`flood_area`)

- Stage: What we start with · unit: — · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: flood_exposure
- Trust: own 80 / 100 · weakest input (chain) 80 / 100 · status: read or asked

```
flood_area = f()
whether the parcel is in the designated floodplain
```

### Plot ratio  (`plot_ratio`)

- Stage: What we start with · unit: — · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: linear_heat_density
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: read or asked

```
plot_ratio = f()
built area ÷ land area
```


## 2. How big it can be

### Largest size that fits  (`size_fit`)

- Stage: How big it can be · unit: MW IT (range) · level: Everyday
- Inputs (formula arguments): hall_area, floor_load_need, service_class
- Fed by (diagram links): hall_area, floor_load_need, service_class · feeds: —
- Trust: own 50 / 100 · weakest input (chain) 40 / 100 · status: range, wide; narrows with rack density

```
size_fit = f(hall_area, floor_load_need, service_class)
hall area ÷ area per MW (range); for part of a building, also capped by floor load, electrical service and heat-rejection space
```

Coefficients: LBNL prototypes 3.7–13.9 m² per rack → ≈186–2,325 m² per MW; Ark UP4 28 MW IT in 15,410 m² (three buildings); 111 E 5th ≤ 291 m² per MW (upper bound); Uptime 2024 average 8 kW per rack (industry survey)

Sources: `lbnl_proto2021` Sun, Luo, Luo, Hong, Prototype energy models for data centers, Energy and Buildings 231:110603 (2021) | `hillingdon_up4` London Borough of Hillingdon, planning committee report, Ark UP4 data centre | `van_rts19744` City of Vancouver, Referral Report RTS 19744, rezoning of 111 E 5th Ave (data centre), 14 Jul 2026 | `src16` Beyond Data research note 16: data centre components and sizing (sources/16_dc_components_sizing.md) | `evapcoLayout2026` EVAPCO, eco-Air Equipment Layout Manual (2026), Table 1 minimum clearances (ft): V-coil 10–20 ft long | `vanParking5` Vancouver Parking By-law 6059, s. 5 (May 2026): Class B space "at least 10.2 metres long, 3.4 metres wide, and 3.8 metres high"; Class C "23.1 … 3.6 … 4.3"; Class C aisle 14.0 m; access by a 6.1 m aisle from the lane where there is one (5.4.1); row 5.2.5 Class B: one space for the first 465 m² plus one for the next 1,860 m² and one per further 2,325 m²; Class C one space for 2,000–5,000 m² of manufacturing, storage warehouse or wholesale, two above 5,000; uses not listed are set by the Director of Planning from a similar use (5.1.4) | `edmZB580` Edmonton Zoning Bylaw 20001, s. 5.80 subs. 7: loading space 9.0 m long, 3.0 m wide (3.1/3.3 m with obstructions), 4.0 m clearance; wholly on site; no backing onto streets or alleys; number for non-residential uses

### Gross floor area  (`floor_area`)

- Stage: How big it can be · unit: m² · level: Civic
- Inputs (formula arguments): parcel
- Fed by (diagram links): parcel · feeds: server_floor, embodied_building, shadow, offerable_area, rezoning_price, jobs, property_tax
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: Edmonton open; Vancouver via licensed BCA extract — field list confirmed from BCA user guide (data/BCA_…User_Guide.pdf); extract itself pending Abacus access; City property-tax report has no area field (schema checked) — fallback is footprint × storeys

```
floor_area = f(parcel)
footprint × storeys; Vancouver fallback: area_m2 × round(hgt_agl ÷ 3.5–4.5 m storey height) from the 2009 footprint layer (or total_gross_area / BCA Gross Building Area where held)
```

Coefficients: Edmonton: total_gross_area field; Vancouver: BCA Non-Residential Inventory Extract (UBC Abacus, listed as "Commercial"): pos. 19 Gross Building Area, 7 Gross Leasable Area, 8 Net Leasable Area, 20 Basement Area (all ft²), 6 Storeys, 4 Year Built, 42 Type of Heating, 45 Type of Construction (A steel / B concrete / C masonry / D wood-steel), 48 Zoning; one row per building or part — sum per roll number; quarterly .txt; no areas for ad valorem properties (major industrial, utilities, schools, airports) → fall back to footprint × storeys; Vancouver footprints 2009 carry area_m2 and hgt_agl/avght_m/maxht_m, rooftype, len, wid — fallback at 60 (storey-height divisor assumed; buildings after 2009 absent); measured GFA from the City energy report: 555 W Hastings 788,192 ft² (73,225 m²), 1050 W Pender 303,283 ft² (28,176 m²), 900 W Hastings 133,714 ft² (12,422 m²), 111 E 5th 130,548 ft² (12,128 m²)

Sources: `edmParcel` Edmonton Property Information: total_gross_area, zoning, year_built per parcel; Rooflines 2019: building height | `vanFoot` City of Vancouver Open Data, Building footprints 2009: id, orient8, bldgid, topelev_m, med_slope, baseelev_m, hgt_agl, rooftype, area_m2, avght_m, minht_m, maxht_m, base_m, len, wid, geom, geo_point_2d (schema confirmed 10 Oct 2026); 2009 snapshot | `bcaExtract` BC Assessment, Non-Residential Inventory Extract External User Guide (field positions 1–48) | `vanEnergyReport` City of Vancouver Annual Energy and Carbon Report (by-law reporting, buildings ≥100,000 ft²), map at https://energycarbonreport.vancouver.ca/map/

### IT load, actual (range)  (`it_load_actual`)

- Stage: How big it can be · unit: MW · level: Civic
- Inputs (formula arguments): it_load_claim, it_load_outside
- Fed by (diagram links): it_load_claim, it_load_outside · feeds: servers, heat_rejected, spare_capacity, flexible_load, wue, water_behind_electricity, grid_co2, copper_tonnes, pv_share, battery, ups_flex, service_class, untaxed_equipment, power_bill_effect, chp_heat
- Trust: own 70 / 100 · weakest input (chain) 50 / 100 · status: bounded above by measured whole-building energy (4 Vancouver sites); leased-share proxies: Equinix Americas 81% cabinet utilisation (power-limited), Digital Realty Toronto 96.4% occupancy; server utilisation still LBNL 21→35%

```
it_load_actual = f(it_load_claim, it_load_outside)
IT MW × 8,760 h × 0.6 for every yearly MWh in the tool (M95: aligned to the tool); the 0.20–0.60 utilisation band is context and is not applied
```

Coefficients: colocation server utilisation 0.21→0.35 (LBNL 2024); capacity utilisation 0.5 (LBNL); average ÷ servers' combined maximum ≈ 0.6 (Fan et al. 2007, real data centre); leased share proxy: Digital Realty Toronto occupancy 96.4%, 55.8 MW white-space (Q2 2025 supplemental p.24) — occupancy ≠ utilisation; measured whole-building ceiling (City energy report): 555 W Hastings site EUI 1.84 GJ/m² → 37.4 GWh/yr total, 32.5 GWh non-heat ≈ 3.7 MW average for the whole 73,000 m² tower, data centre and offices together — so the ≥3.7 MW of operator nameplate claims cannot all be running at once; 1050 W Pender 11.2 GWh non-heat ≈ 1.3 MW avg; 900 W Hastings 0.57 MW; 111 E 5th 0.45 MW (no data centre yet); Equinix 10-K FY2024 (public filing, other operator): cabinet utilisation = cabinet space billed ÷ total cabinet capacity "taking into consideration power limitations" — Americas 81% (116,700 of 144,100 cabinets, 107 IBXs), EMEA 78%, Asia-Pacific 75%, company 78% (79% in 2023); MRR per cabinet Americas $2,550/month; new IBXs built for power and cooling twice that of earlier ones; Vancouver is a leased-only Equinix metro; Calgary CL1–3 and Kamloops KA1 (2020 acquisitions) listed in Schedule III; CALIBRATION: Telia Helsinki snapshot ERF 0.75 and PUE 1.152 with 4.11 MW waste heat imply 4.8 MW actual against 24 MW IT nameplate = 0.20 (one day, hall partly built out) — the low end of the band should be 0.20, not 0.35

Sources: `dlrQ2_2025` Digital Realty Q2 2025 Earnings Supplemental, p.24 occupancy analysis (Toronto) | `eqix10k` Equinix Inc., Form 10-K for FY2024 (filed Feb 2025), Item 2 Properties (cabinet capacity, cabinets billed, utilisation, MRR per cabinet by region; expansion table) and Item 7 Capacity Trends | `fan2007` Fan, Weber, Barroso 2007, Power provisioning for a warehouse-sized computer | `lbnl2024` Shehabi et al., 2024 United States Data Center Energy Usage Report, LBNL-2001637, Lawrence Berkeley National Laboratory, Dec 2024 | `teliaHKI2024` Telia, Helsinki Data Center cooling options for AI/GPU loads (operator PDF), pp.4–6: 24 MW IT / 100 MW total; module 5 MW cooling → 6.5 MW heat; snapshot 29 May 2024: 5.65 MW to DH (4.11 waste heat + 1.45 added), COP 3.9, PUE 1.152, ERF 0.75; loop 20 / 32 °C, DH 75–85 °C | `vanEnergyReport` City of Vancouver Annual Energy and Carbon Report (by-law reporting, buildings ≥100,000 ft²), map at https://energycarbonreport.vancouver.ca/map/ | `edmBEB6` City of Edmonton, Year 6 Building Energy Benchmarking Report (June 2023; 2021 data; J.B. upload 16 Oct 2026): voluntary programme with BOMA Edmonton; 468 properties, 1,014 buildings, 7,869,390 m² in 25 categories (largest: multifamily 139 properties, 1,865,615 m²; office 54, 1,049,068 m²); no data-centre category; average weather-normalized source EUI 1.3 GJ/m², average GHG intensity 125 kg CO2e/m²; buildings in all six years cut EUI 20.2% on average; building-level data shared on an online dashboard (edmonton.ca/energybenchmarkingdashboard, not yet read). Vancouver's equivalent is required reporting for buildings ≥100,000 ft²

### Buildable envelope  (`envelope`)

- Stage: How big it can be · unit: m² floor area · m height · level: Civic
- Inputs (formula arguments): parcel, zone
- Fed by (diagram links): parcel, zone · feeds: rainwater, hall_area, stormwater_volume
- Trust: own 75 / 100 · weakest input (chain) 75 / 100 · status: sourced for I-2, I-1C, I-3, FC-2, BE, IM, IH; FC-2 sub-area D bonus and E height unread; sub-area maps to digitise

```
envelope = f(parcel, zone)
max floor area = site area × FSR (or FAR) available to the data-centre use; height, setbacks and building-width limits from the zone
```

Coefficients: Vancouver I-3 A: FSR 3.00 (bonus not open to storage uses), 18.3 m (30.5 m discretionary), side yard 7.6 m, max building width and depth 61.0 m, floor-to-floor ≥ 6.0 m ground / 4.0 m above; FC-2: FSR 1.00–5.00 by sub-area (6.50 at discretion), 10.7–22.9 m (to 51.8 m), side yards not permitted; I-2: FSR 3.00, 18.3 m (to 30.5–36.5 m); I-1C: FSR 6.00, 46.5 m. Vancouver counts plant floor space above grade (excluded only at or below base surface, e.g. I-2 s. 4.1.2(c)). Edmonton IM: 18.0 m, FAR 2.0, setbacks 3.0 m street / 6.0 m to non-industrial; IH: 30.0 m, FAR 2.0, min site 1.0 ha; BE: 16.0 m, FAR 1.6. Edmonton s. 5.70(1.9): ventilating equipment, mechanical penthouses, tanks and stacks have no height limit

Sources: `van_zdb_i2` City of Vancouver Zoning and Development By-law, I-2 District Schedule (current) | `van_zdb_i1c` City of Vancouver Zoning and Development By-law, I-1C District Schedule (current) | `van_zdb_i3` City of Vancouver Zoning and Development By-law, I-3 District Schedule (June 2026), ss. 2.2.11, 3.1.1–3.1.2 | `van_zdb_fc2` City of Vancouver Zoning and Development By-law, FC-2 District Schedule (June 2026), ss. 2.2.4, 3.1–3.4 | `van_rts19744` City of Vancouver, Referral Report RTS 19744, rezoning of 111 E 5th Ave (data centre), 14 Jul 2026 | `edm_bl20001` City of Edmonton, Charter Bylaw 20001 (Zoning Bylaw), as adopted, PDF 3 Jan 2024: s. 2.130 IM, s. 2.140 IH, s. 5.70, s. 5.120, s. 8.10 | `src17` Beyond Data research note 17: Vancouver zoning (sources/17_zoning_vancouver.md) | `src18` Beyond Data research note 18: Edmonton zoning (sources/18_zoning_edmonton.md)

### IT load, operator claim  (`it_load_claim`)

- Stage: How big it can be · unit: MW · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: it_load_actual, workload_control
- Trust: own 50 / 100 · weakest input (chain) 50 / 100 · status: operator claim / public record

```
it_load_claim = f()
stated nameplate
```

Coefficients: 2–4 MW typical downtown colocation; 40 MW stated at 111 E 5th (applicant figure in RTS 19744); permit record: no MW stated anywhere; load traces are BC Hydro primary-service upgrade at 555 W Hastings (DB-2022-01818) and new BC Hydro room at 175 W Cordova (BP-2021-06112)

Sources: `opClaims` Operator capacity claims for the 13 sites (Cologix 4 MW VAN4, 2 MW VAN2; eStruxture 2.4 MW; Qu 2.5–3 MW; Hut 8 0.6–1 MW) (sources/01) | `rts19744` City of Vancouver RTS 19744 (30 Jun 2026): 111 E 5th, 'up to 40 MW'; cond. 1.11 heat recovery a material condition at the applicant's sole cost; 579 submissions | `vanPermits` City of Vancouver Open Data, Issued building permits | `quEDM1_2026` Qu Data Centres, EDM1 Facility Overview spec sheet (J.B. download 16 Oct 2026): Edmonton, Financial Core District; 18,000 ft² building (≈1,672 m²), 15,712 ft² raised floor (≈1,460 m²); 2.5 MW capacity; 248 tons of N+1 cooling (≈0.87 MW); ~5–10 kW per rack; no PUE and no heat recovery stated (claims). Security, fuel, generator and carrier details on the sheet deliberately not carried into the register or tool | `quEDM2_2026` Qu Data Centres, EDM2 Facility Overview spec sheet (J.B. download 16 Oct 2026): Edmonton; Uptime Institute Tier III certified (claim); raised floor phase 1 19,000 ft² + phase 2 14,196 ft², building 35,000 ft² (≈3,252 m²); 2.5 MW Tier II / 3 MW Tier III; 1,450 tons of N+1 cooling (≈5.1 MW); ~5–10 kW per rack; no PUE and no heat recovery stated (claims). Security, fuel, generator and carrier details deliberately not carried

### Server count  (`servers`)

- Stage: How big it can be · unit: count · level: Technical
- Inputs (formula arguments): it_load_actual
- Fed by (diagram links): it_load_actual · feeds: embodied_it, distributed_servers_homes, ewaste, rare_earth
- Trust: own 80 / 100 · weakest input (chain) 50 / 100 · status: in hand

```
servers = f(it_load_actual)
P_IT ÷ P_server
```

Coefficients: 600 W per 2-socket server (2023); racks: 1.8–2.5 m² per rack measured in LBNL benchmarking (2007); Vertiv 42U rack 127 kg empty; Dell R760 36.1 kg (2U)

Sources: `lbnl2024` Shehabi et al., 2024 United States Data Center Energy Usage Report, LBNL-2001637, Lawrence Berkeley National Laboratory, Dec 2024 | `lbnlBench` LBNL data-centre benchmarking #22 (2007): 377 racks in 10,000 ft²

### Room for the data hall  (`hall_area`)

- Stage: How big it can be · unit: m² · level: Technical
- Inputs (formula arguments): envelope, component_space, host_building
- Fed by (diagram links): envelope, component_space, host_building · feeds: size_fit
- Trust: own 50 / 100 · weakest input (chain) 40 / 100 · status: arithmetic on sourced limits; white-space share from one calibration case

```
hall_area = f(envelope, component_space, host_building)
new: envelope floor area − plant space − support − ground-floor uses the zone requires; part of an existing building: the floor area offered
```

Coefficients: Vancouver I-2, I-3 and FC-2: no data storage at the ground floor except entrances; calibration: Burlington 3,710 m² of halls = 48–72 % of gross area

Sources: `van_zdb_i3` City of Vancouver Zoning and Development By-law, I-3 District Schedule (June 2026), ss. 2.2.11, 3.1.1–3.1.2 | `van_zdb_fc2` City of Vancouver Zoning and Development By-law, FC-2 District Schedule (June 2026), ss. 2.2.4, 3.1–3.4 | `van_zdb_i2` City of Vancouver Zoning and Development By-law, I-2 District Schedule (current) | `src16` Beyond Data research note 16: data centre components and sizing (sources/16_dc_components_sizing.md) | `edm_bl20001` City of Edmonton, Charter Bylaw 20001 (Zoning Bylaw), as adopted, PDF 3 Jan 2024: s. 2.130 IM, s. 2.140 IH, s. 5.70, s. 5.120, s. 8.10

### Space for the plant  (`component_space`)

- Stage: How big it can be · unit: m² per MW, by component · level: Technical
- Inputs (formula arguments): start_case, cooling_type
- Fed by (diagram links): start_case, cooling_type · feeds: hall_area
- Trust: own 40 / 100 · weakest input (chain) 40 / 100 · status: manufacturer claims; clearances and switchgear room sizes unsourced

```
component_space = f(start_case, cooling_type)
Σ components (electrical yard and switchgear, UPS and batteries, generators and fuel, heat rejection, heat recovery, fire suppression, loading) × IT load × redundancy
```

Coefficients: 18 Oct 2026 (sweep M30–M32; audit/plant_sources_2026-10-18.md): cooling space is per MW of HEAT (servers × PUE), spares added when the plant is laid out; air cooling → air-cooled chillers with free-cooling coils, 17–26 m²/MW (Trane TCA; a dry cooler cannot cool water below outdoor air, and air-cooled halls need ≥13 °C chilled water, NREL/DOE FEMP 2024); liquid cooling → dry coolers, 19.5–30.5 m²/MW (EVAPCO, Thermokey, Mark; manufacturer claims). Manufacturer claims per MW: UPS ≈2.0–2.4 m², Li-ion batteries ≈2.2 m² (5 min), air-cooled chillers 17–26 m², cooling towers ≈8 m², dry coolers ≈24.5 m², heat pumps ≈3.4 m² per MW heat, CDUs ≈0.6 m²; equipment only, without clearances; EPCOR transformer clearances 3.0 m door side / 2.0 m others; fuel room 2 h separation and 550 mm clearance (NFC 4.3.14); generator room 2 h (VBBL 3.6.2.8)

Sources: `src16` Beyond Data research note 16: data centre components and sizing (sources/16_dc_components_sizing.md) | `epcor_ccg` EPCOR, Power Customer Connection Guide | `nfc2020_4313` NRC, National Fire Code of Canada 2020, Div. B, 4.3.13–4.3.14 and Table 4.3.13.4.-B | `van_genroom` City of Vancouver, Emergency generator rooms (Building By-law bulletin 2000-015; VBBL 3.6.2.8) | `cat3516c` Caterpillar 3516C 2,500 kW standby generator set specification (manufacturer claim) | `mfrDryCooler` Dry coolers, generic ranges from manufacturer data sheets (Alfa Laval VDM / SOLAR Max leaflets; EVAPCO eco-Air 270B; Vertiv drycooler manual; LU-VE, Güntner pages): about 20–2,700 kW per unit; length 1.6–12 m, width 1.15–2.5 m, height 1.45–2.9 m; 160 kg to 10.6 t operating. Ratings at standard conditions, not data-centre conditions | `evapcoLayout2026` EVAPCO, eco-Air Equipment Layout Manual (2026), Table 1 minimum clearances (ft): V-coil 10–20 ft long | `bacS3000` BAC Series 3000 cooling tower engineering data (2023): 293–1,394 nominal tons per cell (≈1.3–6.1 MW, Claude conversion at 15,000 BTU/h per tower ton); cell 2.6 × 5.5 m, 3.0 m high to 4.3 × 7.3 m, 6.8 m high; 6.9–22.8 t operating | `bacLayout2023` BAC Layout Guidelines (2023): air inlet 1.5–2.7 m from a wall for a single cell at grade, more in a well; envelope air velocity below 300 fpm; four or more cells referred to the manufacturer; fan discharge level with or above adjacent walls | `mfrAdiabatic` Adiabatic / hybrid coolers (EVAPCO 270B adiabatic models; BAC TrilliumSeries): about 0.7–1.4 MW per unit, up to 12 m long, 1.8–2.8 m wide, 2.5 m high, 2–10.6 t; same clearance table as dry coolers; "They cannot be elevated in lieu of spacing" | `mfrGenset` Standby diesel generator sets in enclosures (Cat 3516C enclosure sheet; Cummins S-1443): about 2 MW | `nfpa37clear` NFPA 37 s. 4.1.4 as reprinted by the NC Office of State Fire Marshal: engines outdoors at least 5 ft (1.5 m) from wall openings and from structures with combustible walls; reducible with a 1-hour wall or a tested enclosure. US standard, edition not stated; Vancouver bulletin 2000-015 points to CSA C282 (paywalled, not read) | `mfrBESS` Battery energy storage, generic: 20 ft container ≈5 MWh / ≈2.5 MW, 6.06 × 2.44 × 2.90 m, ≈42 t (StarCharge, Sungrow data sheets); cabinet ≈3.9 MWh / 1–1.9 MW, 8.8 × 1.65 × 2.8 m, 38 t (Megapack 2 XL sheet filed with the CT Siting Council) | `nfpa855tia` NFPA 855-2023 as amended by TIA 23-1 and 23-2: ESS units separated by at least 3 ft (0.9 m), less with fire testing; rooftop units 3 ft apart, ≥5 ft from roof edge; Hydro One (Ontario utility standard) quotes §9.5.2.6.1: 10 ft (3 m) to lot lines, public ways and buildings, reducible to 3 ft. NFPA 855 is not referenced in the National Fire Code 2020 (Claude checked the local text: 35 NFPA standards cited, 855 not among them) or the BC Fire Code 2024 amendments; VBBL 2025 Book I, BCBC 2024 and NFC – 2023 Alberta Edition do not cite it either and have no energy-storage provisions (Claude checked the full texts, 16 Oct; J.B. downloads). So in both provinces battery spacing is not set by the building or fire code: it falls to the authority having jurisdiction, the electrical code and the listing (UL 9540/9540A) | `vanParking5` Vancouver Parking By-law 6059, s. 5 (May 2026): Class B space "at least 10.2 metres long, 3.4 metres wide, and 3.8 metres high"; Class C "23.1 … 3.6 … 4.3"; Class C aisle 14.0 m; access by a 6.1 m aisle from the lane where there is one (5.4.1); row 5.2.5 Class B: one space for the first 465 m² plus one for the next 1,860 m² and one per further 2,325 m²; Class C one space for 2,000–5,000 m² of manufacturing, storage warehouse or wholesale, two above 5,000; uses not listed are set by the Director of Planning from a similar use (5.1.4) | `edmZB580` Edmonton Zoning Bylaw 20001, s. 5.80 subs. 7: loading space 9.0 m long, 3.0 m wide (3.1/3.3 m with obstructions), 4.0 m clearance; wholly on site; no backing onto streets or alleys; number for non-residential uses | `uptimeTiers` Uptime Institute, Tier Classification System web page (J.B. save, 16 Oct 2026): Tier I | `nfpa855_2026` NFPA 855, 2026 edition (Free Access reader; J.B. screenshots 16 Oct 2026, read by Claude): applies above the Table 1.3 thresholds (lithium-ion 20 kWh per fire area or outdoor installation); outdoor ESS "separated by a minimum 10 ft (3 m)" from lot lines, public ways, buildings, stored combustibles and other exposures (9.6.2.7.1), reducible to 3 ft (0.9 m) with a 1-hour freestanding barrier, fire and explosion testing, or a 2-hour enclosure (9.6.2.7.1.1–5); remote outdoor installations more than 100 ft (30.5 m) from exposures (9.5.1); vegetation cleared within 10 ft (9.6.2.1.1); rooftop units over 20 kWh: from the roof edge at least the system height and not less than 5 ft (1.5 m), at least 10 ft (3 m) from the fire-service access point, units 3 ft (0.9 m) apart, 5 ft walkways, 10 ft to exposures on the roof (9.6.3.1.1.2, 9.6.3.1.1.3, 9.6.3.1.3). Not cited by any BC or Alberta code (see nfpa855tia) | `cologixVAN1_2026` Cologix VAN1 spec sheet (05-2026, J.B. download 16 Oct 2026): 555 W Hastings (Harbour Centre), Cologix a tenant in an office building; site capacity 400 kW; data-centre space 5,000 ft² (≈465 m²) in two suites; cooling "N+1 chilled water cooling, N+1 dry cooler … N+1 IRC"; generator and UPS "N/N+1"; PUE 1.2 (claim). An operator example of N+1 cooling in Vancouver. Security details on the sheet deliberately not carried into the register or tool | `cologixVAN4_2026` Cologix VAN4 spec sheet (05-2026, J.B. download 16 Oct 2026): 175 W Cordova St, a leased four-storey concrete-frame building, single tenant; site capacity 6.5 MW; data-centre space 40,000 ft² (≈3,716 m²), multiple halls per floor; cooling "pumped refrigerant and air-cooled chilled water"; generators and UPS "5-to-make-4, distributed redundant"; 6–8 kW per cabinet; PUE 1.5 (claim). Security, fuel and fibre-entry details on the sheet deliberately not carried into the register or tool

### Server (raised) floor area  (`server_floor`)

- Stage: How big it can be · unit: m² · level: Technical
- Inputs (formula arguments): floor_area
- Fed by (diagram links): floor_area · feeds: it_load_outside
- Trust: own 50 / 100 · weakest input (chain) 50 / 100 · status: operator claim

```
server_floor = f(floor_area)
floor_area × share_raised
```

Coefficients: share 0.75–0.87 from Qu EDM1 (15,712/18,000) and eStruxture VAN-1 (7,500/10,000)

Sources: `opClaims` Operator capacity claims for the 13 sites (Cologix 4 MW VAN4, 2 MW VAN2; eStruxture 2.4 MW; Qu 2.5–3 MW; Hut 8 0.6–1 MW) (sources/01)

### IT load, estimated from outside  (`it_load_outside`)

- Stage: How big it can be · unit: MW · level: Technical
- Inputs (formula arguments): server_floor
- Fed by (diagram links): server_floor · feeds: it_load_actual
- Trust: own 60 / 100 · weakest input (chain) 50 / 100 · status: operator claims for the figure used (conf 60); government figures kept as context

```
it_load_outside = f(server_floor)
hall floor ÷ m² of hall per MW: 290–630 (typical) or about 250 (high density); IT MW = hall area ÷ that figure (M95, 19 Oct 2026: aligned to the tool)
```

Coefficients: Tool: 290–630 m² of hall per MW (≈ 1,590–3,450 W/m²), five built Canadian halls, operator claims: eStruxture VAN-1 ≈ 290, Hut 8 Vault ≈ 557, Qu EDM1 ≈ 584, Cologix VAN2 ≈ 619, VAN5 ≈ 627 (sources/16 §2.7); high density ≈ 250 (NEXTDC S3, QScale, operator claims). Context, not used: RVO 2018 ≈ 500 W/m² of server-room floor ('an order of magnitude'); US federal measured 355–667 W/m² — older, lower-density rooms; LBNL models 186–2,325 m²/MW

Sources: `rvo2018` RVO, Rapportage kansenkaart Warmte uit Datacenters (IF Technology, 7 Nov 2018), RVO-178-1801 | `lbnl2024` Shehabi et al., 2024 United States Data Center Energy Usage Report, LBNL-2001637, Lawrence Berkeley National Laboratory, Dec 2024 | `sunLuo2021` Sun, Luo, Luo, Hong 2021, Energy & Buildings 231:110603 (prototype DC energy models) | `doeFederal` US DOE case study, three federal data centres, 33/50/62 W/ft²


## 3. What the site offers

### Electrical service  (`service_class`)

- Stage: What the site offers · unit: class of connection · level: Technical
- Inputs (formula arguments): it_load_actual, parcel
- Fed by (diagram links): it_load_actual, parcel · feeds: size_fit
- Trust: own 75 / 100 · weakest input (chain) 50 / 100 · status: sourced thresholds

```
service_class = f(it_load_actual, parcel)
IT load × PUE → the utility service class and what it brings (second feeder, transmission, clearances)
```

Coefficients: BC Hydro: above 6.5 MVA (12.5 kV areas) or 13 MVA (25 kV areas) a two-feeder supply may be required; 60 kV and above under transmission rules. EPCOR: primary service typical above 2,500 kVA; transformer clearances 3.0 m / 2.0 m; access road 4.6 m in a 6.5 m strip

Sources: `bch_primary` BC Hydro, Primary Service Guide (distribution standards) | `epcor_ccg` EPCOR, Power Customer Connection Guide | `src16` Beyond Data research note 16: data centre components and sizing (sources/16_dc_components_sizing.md)

### Borefield as the data centre's heat sink  (`borefield`)

- Stage: What the site offers · unit: m of borehole; m² · level: Technical
- Inputs (formula arguments): heat_rejected, ground
- Fed by (diagram links): heat_rejected, ground · feeds: ground_warming
- Trust: own 40 / 100 · weakest input (chain) 40 / 100 · status: screening; no standard for continuous rejection

```
borefield = f(heat_rejected, ground)
L = heat to ground (W) ÷ q; boreholes = L ÷ 150 m; area = boreholes × 36 m²
```

Coefficients: q = 12 W/m (base design, 1,248 m) to 19 W/m (economic optimum, about 760 m), both for the ground-only heat-pump system; the dry-cooler hybrid only reused 760 m (derived by dividing the 14.5 kW cooling load by length, not the heat rejected to the ground, which also includes compressor work; Zurmuhl et al. 2018 s. 3.1, 4.2.1–4.2.2, a 14.5 kW data centre, Ithaca, k 3.27 W/m·K; checked 18 Oct 2026); Edmonton design k 1.9 W/m·K (Alberta Geological Survey) → ~7–11 W/m (scaling is an assumption); ≈2 ha of borefield per MW rejected; 40 MW ≈ 0.8 km²; screening only — CSA C448 sizing and a thermal response test required; no Vancouver ground data found

Sources: `zurmuhl2018` Zurmuhl et al., Hybrid geothermal heat pumps for cooling telecommunications data centers, Stanford Geothermal Workshop 2018 | `ags_edmonton` Alberta Geological Survey, ground thermal properties near Edmonton (Hastings Lake test; design k 1.9 W/m·K, 6.1 °C) | `bc_gwpr` BC Groundwater Protection Regulation, B.C. Reg. 39/2016 (closed-loop geoexchange wells) | `ab_gshe2018` Alberta, Directive for Water Wells and Ground Source Heat Exchange Systems (2018)

### Price of power at the site  (`electricity_price`)

- Stage: What the site offers · unit: $/MWh + $/kW · level: Technical
- Inputs (formula arguments): parcel
- Fed by (diagram links): parcel · feeds: peak_relief, clean_power_price
- Trust: own 90 / 100 · weakest input (chain) 80 / 100 · status: in hand (2026 tariffs)

```
electricity_price = f(parcel)
tariff for the customer class: BC Hydro LGS or Transmission (RS 1830); Alberta pool price + EPCOR (Edmonton) or FortisAlberta (Parkland) distribution and transmission
```

Coefficients: BC LGS (RS 1600–1611, effective 1 Apr 2026): $13.83/kW, 6.79 ¢/kWh, 29.99 ¢/day; RS 1830 (supply at 60 kV or higher, effective 1 Apr 2026): $12.178/kVA, 4.914 ¢/kWh; loads >150 MW pay full incremental cost; 300 MW AI + 100 MW DC allocation. Alberta: pool $43.68/MWh (2025), $62.78 (2024); EPCOR DAS-TOUP and SAS-TOUP; FortisAlberta Rate 63; Rate of Last Resort not available to these loads. Replaces the first attempt's assumed $80–120/MWh

Sources: `bchTariff2026` BC Hydro Electric Tariff (PDF, J.B. download 15 Oct 2026; read by Claude): RS 1600/1601/1610/1611 Large General Service, Revision 16, effective 1 Apr 2026 (BCUC G-76-25): 29.99 ¢/day, $13.83/kW of billing demand, 6.79 ¢/kWh, for ≥150 kW or >550,000 kWh a year; RS 1830 Transmission Service, Revision 3, effective 1 Apr 2026: supply at 60 kV or higher, $12.178/kVA, 4.914 ¢/kWh; RS 2289 Self-Generation Service, original, effective 1 Jul 2026 (G-64-26): only for customers taking service at distribution voltage; clean or renewable facility ≤100 kW nameplate or ≤100 kW per phase net injection, on the same or an adjacent parcel; BC Hydro pays 10 ¢/kWh for net generation, credit balance paid out each 30 April; RS 4100 Public EV Charging (BC Hydro's own stations), effective 1 Apr 2026: Level 2 31.30 ¢/kWh, fast 40.29 ¢/kWh | `bchLGS` BC Hydro business rates (Large General Service RS 1600–1611, Revision 26, effective 1 Jul 2026): basic 29.99 ¢/day, demand $13.83/kW, energy 6.79 ¢/kWh; Transmission Service RS 1830 (fiscal 2027): $12.178/kVA, 4.914 ¢/kWh (RS 1823 cancelled 1 Apr 2026) | `bcIEAF` BC Industrial Electricity Allocation Framework (updated 31 Mar 2026): '300MW for AI projects, 100MW for data centre projects'; data centre and AI projects ≥10 MW enter competitive selection; BC news release 2025ECS0044: loads over 150 MW pay 'the full cost of both incremental electricity generation and upgrades' | `aesoStats2025` AESO, Annual Market Statistics 2025, Table 13 (p. 55): operating reserve volumes and costs by category; active procured 2025 5,928 GWh / $206 M, 2024 5,834 / $255 M; standby procured 709 / $8 M and 713 / $10 M | `epcorDASSAS` EPCOR Distribution & Transmission 2026 interim tariffs (effective 1 Jan 2026): DAS-TOUP $67.45678/site/day + $0.13822/kW/day; SAS-TOUP $0.00250/kWh + capacity $0.13497/kW/day + demand $0.28126/kW/day + OR 7.99 % × pool price; DAS-CS (>5,000 kVA) closed to new service | `fortisAB2026` FortisAlberta rates effective 1 Oct 2026 (AUC 30274-D01-2025): Rate 63 Large General Service (>2,000 kW) transmission $0.214447 + $0.174184 /kW-day + $0.006228/kWh; distribution $27.080602 per contract km-day + $0.015170/kW-day + $15.998863/day

### Closeness to networks and customers  (`interconnection`)

- Stage: What the site offers · unit: km / ms · level: Technical
- Inputs (formula arguments): parcel
- Fed by (diagram links): parcel · feeds: computing_served, grid_refund
- Trust: own 50 / 100 · weakest input (chain) 50 / 100 · status: rationale sourced; local exchange-point locations a gap

```
interconnection = f(parcel)
distance to the nearest interconnection point and to customers; latency targets of tens of milliseconds
```

Coefficients: Why operators locate in cities: third-party (colocation) firms favour urban settings for buyer proximity (Pan Fang & Greenstein 2025); backbone networks are biased to cities that serve as interconnection points (Malecki 2002); edge latency targets of a few tens of ms, VR under 16 ms (Satyanarayanan 2017); internet exchange and customer proximity (JLARC 2024). Locations of internet exchange points in Vancouver and Edmonton not yet sourced; exchanges: Vancouver VANIX (78 participants, six connection points), UNM-Exch Canada-West (64), CSIX (16); Edmonton YEGIX (9) — operator-reported; fibre adds about 0.005 ms per km one way, small within a city; locations are not shown; exchanges: Vancouver VANIX (78 participants, six connection points), UNM-Exch Canada-West (64), CSIX (16); Edmonton YEGIX (9) — operator-reported; fibre adds about 0.005 ms per km one way, small within a city; locations are not shown; exchanges: Vancouver VANIX (78 participants, six connection points), UNM-Exch Canada-West (64), CSIX (16); Edmonton YEGIX (9) — operator-reported; fibre adds about 0.005 ms per km one way, small within a city; locations are not shown; exchanges: Vancouver VANIX (78 participants, six connection points), UNM-Exch Canada-West (64), CSIX (16); Edmonton YEGIX (9) — operator-reported; fibre adds about 0.005 ms per km one way, small within a city; locations are not shown; exchanges: Vancouver VANIX (78 participants, six connection points), UNM-Exch Canada-West (64), CSIX (16); Edmonton YEGIX (9) — operator-reported; fibre adds about 0.005 ms per km one way, small within a city; locations are not shown; exchanges: Vancouver VANIX (78 participants, six connection points), UNM-Exch Canada-West (64), CSIX (16); Edmonton YEGIX (9) — operator-reported; fibre adds about 0.005 ms per km one way, small within a city; locations are not shown; exchanges: Vancouver VANIX (78 participants, six connection points), UNM-Exch Canada-West (64), CSIX (16); Edmonton YEGIX (9) — operator-reported; fibre adds about 0.005 ms per km one way, small within a city; locations are not shown; exchanges: Vancouver VANIX (78 participants, six connection points), UNM-Exch Canada-West (64), CSIX (16); Edmonton YEGIX (9) — operator-reported; fibre adds about 0.005 ms per km one way, small within a city; locations are not shown; exchanges: Vancouver VANIX (78 participants, six connection points), UNM-Exch Canada-West (64), CSIX (16); Edmonton YEGIX (9) — operator-reported; fibre adds about 0.005 ms per km one way, small within a city; locations are not shown; exchanges: Vancouver VANIX (78 participants, six connection points), UNM-Exch Canada-West (64), CSIX (16); Edmonton YEGIX (9) — operator-reported; fibre adds about 0.005 ms per km one way, small within a city; locations are not shown; exchanges: Vancouver VANIX (78 participants, six connection points), UNM-Exch Canada-West (64), CSIX (16); Edmonton YEGIX (9) — operator-reported; fibre adds about 0.005 ms per km one way, small within a city; locations are not shown; exchanges: Vancouver VANIX (78 participants, six connection points), UNM-Exch Canada-West (64), CSIX (16); Edmonton YEGIX (9) — operator-reported; fibre adds about 0.005 ms per km one way, small within a city; locations are not shown; exchanges: Vancouver VANIX (78 participants, six connection points), UNM-Exch Canada-West (64), CSIX (16); Edmonton YEGIX (9) — operator-reported; fibre adds about 0.005 ms per km one way, small within a city; locations are not shown; exchanges: Vancouver VANIX (78 participants, six connection points), UNM-Exch Canada-West (64), CSIX (16); Edmonton YEGIX (9) — operator-reported; fibre adds about 0.005 ms per km one way, small within a city; locations are not shown

Sources: `panFang2025` Pan Fang & Greenstein 2025, 'Where the cloud rests: the economic geography of data centers', Strategy Science 10(4) (abstract): third-party firms favour urban settings and are 'sensitive to buyer demand for proximity'; cloud providers have 'a lower propensity for locating in urban areas' | `malecki2002` Malecki 2002, Economic Geography 78(4):399–424 (abstract): 'a global bias of Internet backbone networks toward world cities', tempered by urban areas 'that serve as interconnection points' | `satya2017` Satyanarayanan 2017, 'The Emergence of Edge Computing', Computer (Jan): head-tracked VR needs latencies under 16 ms (p.32); 'End-to-end latency of a few tens of milliseconds is a safe but achievable goal' (p.32) | `jlarc2024` Virginia JLARC Report 598, Data Centers in Virginia (Dec 2024): building 'usually takes about 12 to 18 months'; campus 'five or more years'; ~50 full-time workers per 250,000 sq ft ('one employee per 5,000 square feet'), about half contract; ~1,500 workers at peak construction; grid additions 12–36 months longer; 'One-third of data centers are currently located near residential areas'; residential bills +$14–37/month | `bchExtension2026` BC Hydro Electric Tariff, T&C s. 8.3 and 11.5 (local copy, effective 2025–26): Extension Fee = extension cost + customer share of system improvement + service connection − BC Hydro maximum contribution; system improvement under $1M not charged; at ≥1 MVA the customer pays the part above $1M per MVA and above $10M; maximum contribution, General Service $521 per kW of estimated billing demand; minimum underground three-phase service connection $1,520 (≤200 A) to $2,950 (≤400 A) | `bchDG100` BC Hydro DG technical interconnection requirements ≤100 kW, Rev 3 (15 Jul 2026): covers "customer‑owned generators and energy storage systems" up to 100 kW net injection per phase; CSA C22.3 No. 9 and UL 1741; application and field-verification reviews. Larger (to 35 kV) per the 2010 requirements, which do not mention storage | `aesoConnect` AESO Connection Process Quick Reference Guide v2.1 (2021): stages 0–6; generation and storage indicative weeks | `epcorDTtc2025` EPCOR Distribution & Transmission terms and conditions (1 Jan 2025): "Generating Facility" includes storage; Distribution Interconnection Agreement required; customer pays "all interconnection costs as determined by EDTI"; exporters must be Power Pool participants; micro-generation <5 MW | `isocPulseIXP` Internet Society Pulse, IXP tracker, Canada: Vancouver VANIX 78, UNM-Exch Canada-West 64, CSIX 16 participants; Edmonton YEGIX 9; Calgary YYCIX 91 (operator-reported) | `vanixPoints` VANIX: six connection points in Vancouver; YEGIX: one Edmonton site (operator claims; locations not shown in the tool)

### Water the place can supply  (`water_supply`)

- Stage: What the site offers · unit: $/m³; ML/yr · level: Civic
- Inputs (formula arguments): parcel
- Fed by (diagram links): parcel · feeds: reclaimed_makeup, fire_water
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: Vancouver in hand; Edmonton partial

```
water_supply = f(parcel)
potable at the metered rate; reclaimed where a utility offers it to industry
```

Coefficients: Vancouver 2026: water $4.091–5.128 per unit + sewer $7.960 per unit (unit = 2.832 m³), no large-user rate; Metro Vancouver reclaimed water case-by-case, no rate. Edmonton: EPCOR supplied 4,226 ML of reclaimed water to industry in 2024 (price, customers not stated); commercial potable rates not extracted; Alberta: 'A brand-new data centre licence stands last' (first in time) — matters only if the site holds its own licence; Vancouver 2050s: snowpack in the supply watersheds 292 → 123 cm (RCP8.5, Metro Vancouver 2016); Alberta: 'A brand-new data centre licence stands last' (first in time) — matters only if the site holds its own licence; Vancouver 2050s: snowpack in the supply watersheds 292 → 123 cm (RCP8.5, Metro Vancouver 2016); Alberta: 'A brand-new data centre licence stands last' (first in time) — matters only if the site holds its own licence; Vancouver 2050s: snowpack in the supply watersheds 292 → 123 cm (RCP8.5, Metro Vancouver 2016); Alberta: 'A brand-new data centre licence stands last' (first in time) — matters only if the site holds its own licence; Vancouver 2050s: snowpack in the supply watersheds 292 → 123 cm (RCP8.5, Metro Vancouver 2016); Alberta: 'A brand-new data centre licence stands last' (first in time) — matters only if the site holds its own licence; Vancouver 2050s: snowpack in the supply watersheds 292 → 123 cm (RCP8.5, Metro Vancouver 2016); Alberta: 'A brand-new data centre licence stands last' (first in time) — matters only if the site holds its own licence; Vancouver 2050s: snowpack in the supply watersheds 292 → 123 cm (RCP8.5, Metro Vancouver 2016); Alberta: 'A brand-new data centre licence stands last' (first in time) — matters only if the site holds its own licence; Vancouver 2050s: snowpack in the supply watersheds 292 → 123 cm (RCP8.5, Metro Vancouver 2016); Alberta: 'A brand-new data centre licence stands last' (first in time) — matters only if the site holds its own licence; Vancouver 2050s: snowpack in the supply watersheds 292 → 123 cm (RCP8.5, Metro Vancouver 2016); Alberta: 'A brand-new data centre licence stands last' (first in time) — matters only if the site holds its own licence; Vancouver 2050s: snowpack in the supply watersheds 292 → 123 cm (RCP8.5, Metro Vancouver 2016); Alberta: 'A brand-new data centre licence stands last' (first in time) — matters only if the site holds its own licence; Vancouver 2050s: snowpack in the supply watersheds 292 → 123 cm (RCP8.5, Metro Vancouver 2016); Alberta: 'A brand-new data centre licence stands last' (first in time) — matters only if the site holds its own licence; Vancouver 2050s: snowpack in the supply watersheds 292 → 123 cm (RCP8.5, Metro Vancouver 2016); Alberta: 'A brand-new data centre licence stands last' (first in time) — matters only if the site holds its own licence; Vancouver 2050s: snowpack in the supply watersheds 292 → 123 cm (RCP8.5, Metro Vancouver 2016) | 19 Oct 2026: Vancouver water + sewer $4.26–4.62/m³ (both on metered water); Edmonton 2026 commercial not read, placeholder $2.53–3.88/m³ from 2022–23 water and proposed 2025 wastewater and sanitary; reclaimed price not published in either region; US 20–100% of potable (grey literature); Alberta: 'A brand-new data centre licence stands last' (first in time) — matters only if the site holds its own licence; Vancouver 2050s: snowpack in the supply watersheds 292 → 123 cm (RCP8.5, Metro Vancouver 2016) | 19 Oct 2026: Vancouver water + sewer $4.26–4.62/m³ (both on metered water); Edmonton 2026 commercial not read, placeholder $2.53–3.88/m³ from 2022–23 water and proposed 2025 wastewater and sanitary; reclaimed price not published in either region; US 20–100% of potable (grey literature); Alberta: 'A brand-new data centre licence stands last' (first in time) — matters only if the site holds its own licence; Vancouver 2050s: snowpack in the supply watersheds 292 → 123 cm (RCP8.5, Metro Vancouver 2016) | 19 Oct 2026: Vancouver water + sewer $4.26–4.62/m³ (both on metered water); Edmonton 2026 commercial not read, placeholder $2.53–3.88/m³ from 2022–23 water and proposed 2025 wastewater and sanitary; reclaimed price not published in either region; US 20–100% of potable (grey literature)

Sources: `vanWater2026` City of Vancouver 2026 metered rates (Sch. D): water high season $5.128, low season $4.091, sewer $7.960 per unit (1 unit = 2.83168466 m³); one rate for all metered uses | `mvReclaimed` Metro Vancouver Interim Reclaimed Water Policy UT-019 (29 Sep 2023): industrial uses case-by-case; no rates | `epcorReclaimed` EPCOR 2024 Edmonton Wastewater Quality Annual Report p.11: '4,226 ML (3.9%) of reclaimed water provided to industrial customers'; price and customers not stated | `abNewLicenceLast` Government of Alberta, data centres and water: 'A brand-new data centre licence stands last' (first in time, first in right) | `mvClimate2016` Metro Vancouver Climate projections (2016), RCP8.5 2050s: HDD −25% (Table 16; summary says 29%), CDD 49 → 235, snowpack in supply watersheds 292 → 123 cm (−58%) | `vanRates2026` City of Vancouver, 2026 utility rates (Council 12 Nov 2025, spec1a Sch. D, spec1b Part V; metered rates page): water $4.091 (16 Oct–30 Apr) and $5.128 (1 May–15 Oct) per unit, sewer $7.960 per unit, all metered uses; 1 unit = 2.83168 m³ | `epcorBylaw19626` EPCOR Water Services Bylaw 19626, Sch. 1 Pt I (2022–23): commercial water $1.6122–0.9472/m³ by tier (tier mapping unclear in the extract) | `epcorWW2024app` EPCOR 2024 rate application, Appendix A: commercial wastewater treatment 2025 $1.1486/0.8886/0.4636 per m³ (proposed; another table differs), sanitary $1.1212 (proposed) | `epcorWWpbr2025` EPCOR 2025–27 Wastewater PBR application: Gold Bar reclaimed water to industrial customers (pp. 2, 21, 25); price and volume not stated | `mvUT019` Metro Vancouver, Interim Reclaimed Water Policy UT-019 (29 Sep 2023): industrial uses listed; commits to set pricing; none published | `ubcReclaimed2022` Patiño (UBC Sustainability Scholars for Metro Vancouver, 2022), Reclaimed water benefits and cost: US utilities price reuse at 20–100% of potable (2007 survey) | `epaQuincy` US EPA, Water reuse case study, Quincy WA reuse utility: operational 30 Jun 2021, $31 M operator-funded, 30-yr agreement, 138 M gal/yr potable saved

### Reclaimed water as cooling make-up  (`reclaimed_makeup`)

- Stage: What the site offers · unit: L/yr · level: Civic
- Inputs (formula arguments): evaporation, blowdown, water_supply
- Fed by (diagram links): evaporation, blowdown, water_supply · feeds: treatment_energy
- Trust: own 60 / 100 · weakest input (chain) 50 / 100 · status: screening; Vancouver and Edmonton supply volumes and prices not found

```
reclaimed_makeup = f(evaporation, blowdown, water_supply)
V_rec = s × make-up, with make-up = evaporation × C ÷ (C − 1)
```

Coefficients: C (cycles of concentration) 2–4 typical, up to 6 (FEMP/EPA); 4–6 run on treated municipal wastewater (US DOE-funded study, 2012; power-plant scale); s = share substituted, user-set 0–1; operator precedents 0.74–0.99 (Microsoft, operator claim); data-centre site water 0.32–0.36 L/kWh (LBNL 2024, denominator to confirm); Metro Vancouver will consider supplying reclaimed water case by case for industrial uses (UT-019, 2023); EPCOR Gold Bar already supplies treated water to industry (operator claim, no volumes); no Canadian data-centre case found

Sources: `femp_ct` US DOE FEMP, Best Management Practice #10: Cooling Tower Management (2013, modified 2026); EPA WaterSense at Work §6.3 | `lbnl2024` Shehabi et al., 2024 United States Data Center Energy Usage Report, LBNL-2001637, Lawrence Berkeley National Laboratory, Dec 2024 | `mv_ut019` Metro Vancouver, Interim Reclaimed Water Policy UT-019 (29 Sep 2023) | `msft_water2026` Microsoft blog, Inside Microsoft's two-decade push to cut water intensity (24 Jun 2026) | `irwdCulver2018` Irvine Ranch Water District, Culver Dr recycled-water pipeline bid (2018): low bid $707,777 for ≈1,240 LF of 8–12-inch purple pipe (≈US$1,870/m all items, Claude arithmetic); one US project | `cec2023pump` California Energy Commission CEC-500-2023-026 (UCLA, 2023): pressurisation energy 222 kWh per acre-foot (≈0.18 kWh/m³, Claude conversion) | `epaQuincy` US EPA, Water reuse case study, Quincy WA reuse utility: operational 30 Jun 2021, $31 M operator-funded, 30-yr agreement, 138 M gal/yr potable saved | `epcorGoldBar` EPCOR, Gold Bar operations: "membrane-based wastewater recycling facility which supplies local industry with reclaimed water" (utility claim; customers not named; a refinery is named only in trade press, not citable). Terms, price and openness to new customers not published | `vbbl2025_2713scope` VBBL 2025 Book II Art. 2.7.1.3: (1) treated non-potable water may serve Column A or B uses; (2) "An alternate water source system shall use treated non-potable water in lieu of potable water for all of the uses set out in Column A" (water closets, urinals, trap primers); cooling-tower make-up is a Column B (optional) use for rainwater and clear-water waste. Book II does not itself say which buildings must install a system (Claude read the local text)

### Greywater available from neighbours  (`greywater_neighbours`)

- Stage: What the site offers · unit: L/yr · level: Civic
- Inputs (formula arguments): people_affected
- Fed by (diagram links): people_affected · feeds: treatment_energy
- Trust: own 45 / 100 · weakest input (chain) 45 / 100 · status: screening; recovery rate a gap

```
greywater_neighbours = f(people_affected)
V_gw = residents within reach × 98 L/person/day × 365; used = min(V_gw × recovery, make-up)
```

Coefficients: 98 L/person/day residential greywater (National Academies 2016, US data); treatment recovery share not found (gap); cross-property sharing: no BC or Alberta rule text found

Sources: `nasem2016` National Academies, Using Graywater and Stormwater to Enhance Local Water Supplies (2016), Ch. 3 | `waterUse2026` Residential water use: Edmonton 176 L/person/day in 2019 (EPCOR 2021 discussion paper; 2015–19 average 185); all uses 251 L/person/day 2024 (EPCOR annual report). Metro Vancouver residential figure not found (consumption report gives all-use per capita in charts only); provincial residential 2021 BC 286, Alberta 195 L/person/day (StatCan Table 38-10-0271-01)

### Existing building to convert  (`existing_building`)

- Stage: What the site offers · unit: m² available · level: Civic
- Inputs (formula arguments): parcel, massing
- Fed by (diagram links): parcel, massing · feeds: afterlife
- Trust: own 40 / 100 · weakest input (chain) 40 / 100 · status: precedents in hand; stock at a parcel needs the parcel tables (N1–N7)

```
existing_building = f(parcel, massing)
parcels with buildings whose use and age suit conversion (from the parcel tables), less what policy steers to other uses
```

Coefficients: Precedents: 515 W Hastings office → Bulk Data Storage (2023); Edmonton office → data centre (2009, 2011), warehouse → data centre (Qu EDM2); Vancouver Downtown Office Conversion Policy addresses residential conversion only; no official vacancy statistics in either city; floor load: offices 2.4 kPa above the ground floor, 4.8 kPa on ground-access floors and basements (NBC 2020 / BCBC 2024 Table 4.1.5.3); computer rooms excluded from the office row; ≈ 6.0 kPa used in US VA design (claim-level transfer): upper office floors would need strengthening; floor load: offices 2.4 kPa above the ground floor, 4.8 kPa on ground-access floors and basements (NBC 2020 / BCBC 2024 Table 4.1.5.3); computer rooms excluded from the office row; ≈ 6.0 kPa used in US VA design (claim-level transfer): upper office floors would need strengthening; floor load: offices 2.4 kPa above the ground floor, 4.8 kPa on ground-access floors and basements (NBC 2020 / BCBC 2024 Table 4.1.5.3); computer rooms excluded from the office row; ≈ 6.0 kPa used in US VA design (claim-level transfer): upper office floors would need strengthening; floor load: offices 2.4 kPa above the ground floor, 4.8 kPa on ground-access floors and basements (NBC 2020 / BCBC 2024 Table 4.1.5.3); computer rooms excluded from the office row; ≈ 6.0 kPa used in US VA design (claim-level transfer): upper office floors would need strengthening; floor load: offices 2.4 kPa above the ground floor, 4.8 kPa on ground-access floors and basements (NBC 2020 / BCBC 2024 Table 4.1.5.3); computer rooms excluded from the office row; ≈ 6.0 kPa used in US VA design (claim-level transfer): upper office floors would need strengthening; floor load: offices 2.4 kPa above the ground floor, 4.8 kPa on ground-access floors and basements (NBC 2020 / BCBC 2024 Table 4.1.5.3); computer rooms excluded from the office row; ≈ 6.0 kPa used in US VA design (claim-level transfer): upper office floors would need strengthening; floor load: offices 2.4 kPa above the ground floor, 4.8 kPa on ground-access floors and basements (NBC 2020 / BCBC 2024 Table 4.1.5.3); computer rooms excluded from the office row; ≈ 6.0 kPa used in US VA design (claim-level transfer): upper office floors would need strengthening; floor load: offices 2.4 kPa above the ground floor, 4.8 kPa on ground-access floors and basements (NBC 2020 / BCBC 2024 Table 4.1.5.3); computer rooms excluded from the office row; ≈ 6.0 kPa used in US VA design (claim-level transfer): upper office floors would need strengthening; floor load: offices 2.4 kPa above the ground floor, 4.8 kPa on ground-access floors and basements (NBC 2020 / BCBC 2024 Table 4.1.5.3); computer rooms excluded from the office row; ≈ 6.0 kPa used in US VA design (claim-level transfer): upper office floors would need strengthening; floor load: offices 2.4 kPa above the ground floor, 4.8 kPa on ground-access floors and basements (NBC 2020 / BCBC 2024 Table 4.1.5.3); computer rooms excluded from the office row; ≈ 6.0 kPa used in US VA design (claim-level transfer): upper office floors would need strengthening; floor load: offices 2.4 kPa above the ground floor, 4.8 kPa on ground-access floors and basements (NBC 2020 / BCBC 2024 Table 4.1.5.3); computer rooms excluded from the office row; ≈ 6.0 kPa used in US VA design (claim-level transfer): upper office floors would need strengthening; floor load: offices 2.4 kPa above the ground floor, 4.8 kPa on ground-access floors and basements (NBC 2020 / BCBC 2024 Table 4.1.5.3); computer rooms excluded from the office row; ≈ 6.0 kPa used in US VA design (claim-level transfer): upper office floors would need strengthening; floor load: offices 2.4 kPa above the ground floor, 4.8 kPa on ground-access floors and basements (NBC 2020 / BCBC 2024 Table 4.1.5.3); computer rooms excluded from the office row; ≈ 6.0 kPa used in US VA design (claim-level transfer): upper office floors would need strengthening; floor load: offices 2.4 kPa above the ground floor, 4.8 kPa on ground-access floors and basements (NBC 2020 / BCBC 2024 Table 4.1.5.3); computer rooms excluded from the office row; ≈ 6.0 kPa used in US VA design (claim-level transfer): upper office floors would need strengthening

Sources: `vanPermits` City of Vancouver Open Data, Issued building permits | `edmPermits` City of Edmonton General Building Permits (open data 24uj-dj8v): 'DATA CENT' records incl. office → data centre (2009, 2011), warehouse → data centre (17204 114 Ave NW, 2015, 2020), and a 2021 demolition of a 'Sobeys Data Centre'; occupancy dates for non-residential permits completed since 2024 | `vanOfficeConv` City of Vancouver Downtown Office Conversion Policy (2009): applies to buildings ≥50,000 sq ft of office; addresses residential conversion only | `nbc2020Live` NBC 2020 / BCBC 2024 Table 4.1.5.3: offices 4.8 kPa on ground-access floors and basements, 2.4 kPa on other floors; computer rooms excluded from the office row; no Canadian code value for computer rooms (US VA design manual ≈ 6.0 kPa, 125 psf | `voaComputerCentres` UK Valuation Office Agency, Rating Manual s. 281 Computer centres, Practice note 1 s. 1 (2017): vacated first-generation centres 'tend to remain unoccupied and are not readily adaptable'

### Solar from roofs nearby  (`rooftop_solar`)

- Stage: What the site offers · unit: MWh/yr · level: Civic
- Inputs (formula arguments): massing
- Fed by (diagram links): massing · feeds: community_solar
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: factors read (round 2 confirmed); transferred to both cities

```
rooftop_solar = f(massing)
Σ roof footprint × 0.81 usable × yield (kWh/kWp, NRCan municipal) × kWp/m² × 0.70 over roofs within the radius
```

Coefficients: ≈ 128 kWh/m² of footprint a year (Vancouver) and 159 (Edmonton): NRCan CanmetENERGY 2024 usable-area and yield factors transferred (neither city in the sample); the data centre's own roof is pv_roof | 19 Oct 2026 (L): how neighbours could share it — see community_solar

Sources: `nrcanPV2024` NRCan CanmetENERGY (2024) PV potential summary report: usable roof factors 0.81 (area) and 0.70 (yield); with NRCan municipal yields ≈ 128 kWh/m² of footprint a year in Vancouver and 159 in Edmonton (factors transferred; neither city in the sample) | `bchSelfGen2026` BC Hydro, Self-generation rate updates (BCUC application ID 1323): RS 2289 from 1 Jul 2026, exports up to 100 kW per phase at 10 ¢/kWh; RS 2290 community generation, net injection up to 2 MW, set by 24 kW per residential and 100 kW per commercial beneficiary, bill credits only; BCUC G-64-26 sets net billing at 10 ¢/kWh for RS 2289 and RS 2290 (executive summary); beneficiaries may be anywhere in BC Hydro's service area (BC Hydro page) | `aucMicro2026` AUC, Micro-generation notice submission guideline (2026), p. 1, 4, 15: under the lesser of 5 MW or the service rating; on property the customer owns or leases, or adjacent owned or leased property; sized to the site's own use; revenue-seeking sites are commercial generators

### Aquifer heat store (open loop)  (`ates`)

- Stage: What the site offers · unit: m³/h; MWh/yr · level: Technical
- Inputs (formula arguments): ground, heat_captured
- Fed by (diagram links): ground, heat_captured · feeds: —
- Trust: own 45 / 100 · weakest input (chain) 45 / 100 · status: screening

```
ates = f(ground, heat_captured)
flow = MW × 3.6 ÷ (4.18 × ΔT); heat out ≈ 0.6 × heat in
```

Coefficients: 172 m³/h per MW at ΔT 5 K (assumption); injection ≤25 °C typical (Netherlands limit; no BC/AB limit found) — air-cooled data-centre heat (25–35 °C) may exceed it; recovery 0.6 (0.4–0.85), ≈ €300/kW at 2 MW (Barth et al. 2026); BC: water licence (WSA); Alberta: Water Act approval or licence + professional report

Sources: `barth2026` Barth, Schefel, Blum, Menberg, Potential of aquifer thermal energy storage (ATES) for data centres in Germany, Geothermal Energy 14:11 (2026) | `bc_gwpr` BC Groundwater Protection Regulation, B.C. Reg. 39/2016 (closed-loop geoexchange wells) | `ab_gshe2018` Alberta, Directive for Water Wells and Ground Source Heat Exchange Systems (2018)

### Sea or river water as a cooling sink  (`surface_water_sink`)

- Stage: What the site offers · unit: MW (site-specific) · level: Technical
- Inputs (formula arguments): parcel
- Fed by (diagram links): parcel · feeds: —
- Trust: own 40 / 100 · weakest input (chain) 40 / 100 · status: rules in hand; capacity is site-specific and unmodelled

```
surface_water_sink = f(parcel)
capacity set by the thermal limit at the outfall and mixing, not by the licence: marine ±1 °C (BC, CCME), Burrard Inlet proposed "no further increase"; Alberta freshwater +3 °C over ambient
```

Coefficients: BC licence: cooling application $1,000; heat-exchange rental $2.25 per 1,000 m³ (min $200); DFO intake screens 2.54 mm, approach velocity 0.035–0.055 m/s (internal conflict — confirm); Alberta Water Act review as for any industrial project; Toronto Enwave precedent: 4 °C in, ≤13 °C out, 50-year agreement | 19 Oct 2026 (K): Burrard Inlet bottom water 7.6–13.9 °C all year (False Creek not sampled); North Saskatchewan near 0 °C in winter with frazil-ice risk, summer not found; flow 24–49 L/s per MW at a 10–5 °C rise (derived); pipe about US$2,120–2,150/m (Hawaii 2002, deep ocean, an upper bound); BC: cooling water needs a waste discharge authorization, Port category C for a new discharge (60–120 business days); Edmonton: river valley plan allows major facilities only where essential and bans utility corridors except crossings. Distance to shore not computed: no shoreline file in the tool yet | 19 Oct 2026 (K): Burrard Inlet bottom water 7.6–13.9 °C all year (False Creek not sampled); North Saskatchewan near 0 °C in winter with frazil-ice risk, summer not found; flow 24–49 L/s per MW at a 10–5 °C rise (derived); pipe about US$2,120–2,150/m (Hawaii 2002, deep ocean, an upper bound); BC: cooling water needs a waste discharge authorization, Port category C for a new discharge (60–120 business days); Edmonton: river valley plan allows major facilities only where essential and bans utility corridors except crossings. distance to the water: Edmonton from the North Saskatchewan River outline (Altalis via Edmonton Public Schools, tool/shore.json); Vancouver not yet (CanVec Hydro to come) | 19 Oct 2026 (K): Burrard Inlet bottom water 7.6–13.9 °C all year (False Creek not sampled); North Saskatchewan near 0 °C in winter with frazil-ice risk, summer not found; flow 24–49 L/s per MW at a 10–5 °C rise (derived); pipe about US$2,120–2,150/m (Hawaii 2002, deep ocean, an upper bound); BC: cooling water needs a waste discharge authorization, Port category C for a new discharge (60–120 business days); Edmonton: river valley plan allows major facilities only where essential and bans utility corridors except crossings. distance to the water: Edmonton from the North Saskatchewan River outline (Altalis via Edmonton Public Schools), Vancouver from NRCan CanVec 50K Hydro (ocean and Fraser River polygons) (tool/shore.json)

Sources: `bcWSRfees` BC Water Sustainability Fees, Rentals and Charges Tariff Regulation 37/2016, Sch.1–2: industrial 'cooling' application $1,000; 'heat exchange' annual rental $2.25 per 1,000 m³, minimum $200 | `thermalLimits` Thermal discharge limits: BC Water Quality Guideline (temperature, 2001) marine '+ or - 1 degree Celsius change from natural ambient background', ≤0.5 °C/h; CCME marine ±1 °C; proposed Burrard Inlet objective 'No further increase in temperature' (Jul 2024); Alberta Surface Water Quality Guidelines 1999 'Not to be increased by more than 3°C above ambient' | `enwaveDLWC` City of Toronto reports (2000; 21 Nov 2019) on Enwave Deep Lake Water Cooling: water drawn at 4 °C, returned at ≤13 °C; 50-year Energy Transfer Agreement to 2054; serves 'over 80 buildings … including data centers' (DLWC Expansion EA 2020) | `abWaterAct2021` Alberta Water Act: a licence is needed to divert and use surface water and an approval for works or activities in a water body (fact sheets 2021); Surface Water Quality Guidelines for Use in Alberta (1999), temperature "Not to be increased by more than 3°C above ambient" (current 2018 guidelines failed to load, so not confirmed) | `burrardTemp2024` Tsleil-Waututh Nation and Province of BC, Burrard Inlet water quality: physical parameters technical report (Jul 2024), Table 4 p. 31 and p. 5: bottom water 7.6–13.9 °C across seasons (2018–20); proposed objective 'No further increase in temperature'; False Creek not sampled | `bcWQGtemp` BC Ambient Water Quality Guidelines for Temperature, overview (2001), s. 2.2 and 2.4: marine ±1 °C from natural; streams with fish ±1 °C beyond the most sensitive salmonid's optimum | `emaWDA` BC Government, Waste discharge authorization | `portPER2025` Port of Vancouver, Project and environmental review categories (10 Sep 2025): a new or modified discharge to water is Category C (60–120 business days); a water pipeline is Category A only under 100 m with no water crossing | `abSWQG1999` Alberta Environment, Surface water quality guidelines for use in Alberta (Nov 1999), Table 1.0 p. 9: not more than 3 °C above ambient (aquatic life); the 2018 edition not read | `edmARP7188` City of Edmonton, North Saskatchewan River Valley ARP (Bylaw 7188, consolidated), Policy 3.5.1 and s. 2.6.3: major facilities only where a river-valley location is deemed essential; utility corridors prohibited except direct river crossings | `howley2021` Howley, MSc thesis, University of Alberta (2021), s. 1.1 and 2.1: North Saskatchewan River supercooling to −0.106 °C (frazil ice); winter flow about 122 m³/s after the dams | `hawaiiSWAC2002` Hawaii DBEDT, Sea water district cooling feasibility analysis (Oct 2002), p. 61–66: cold-water pipe US$12.05–12.47 M for 5.7–5.8 km, about US$2,120–2,150 per m (2002, deep ocean intake at about 500 m); 92.5% energy saving (study) | `dfoScreen` DFO, Interim code of practice: end-of-pipe fish protection screens: openings ≤ 2.54 mm; approach velocity default 0.035–0.055 m/s; may not apply to large intakes | `epsbNSR` North Saskatchewan River polygon, Altalis Base Features Hydrography, shared by Edmonton Public Schools Data Analysis Team (azimuth.epsb.ca, Hosted/North_Saskatchewan_River layer 98; J.B. download 19 Oct 2026; academic use) | `canvecHydroBC` NRCan, CanVec 50K Hydro, British Columbia (waterbody features; Open Government Licence – Canada; J.B. download 20 Oct 2026): ocean, Fraser River and side-channel polygons around Vancouver; source maps from 1987 on

### Urban heat in the area  (`uhi_context`)

- Stage: What the site offers · unit: text · level: Everyday
- Inputs (formula arguments): parcel
- Fed by (diagram links): parcel · feeds: —
- Trust: own 80 / 100 · weakest input (chain) 80 / 100 · status: read

```
uhi_context = f(parcel)
one line per city: the City's heat policy and action, and the measured surface heat island
```

Coefficients: Vancouver: heat mapping, 30% canopy by 2050; Edmonton: Cool Edmonton (Action 9), hot days about 1 → 16 a year by the 2050s; surface heat island Vancouver summer day 7.25 °C, Edmonton winter night 2.86 °C (Duan et al. 2026); near data centres in Phoenix, surface about 0.5 °C warmer within 1 km and less vegetation, with low-income and minority neighbours over-represented (Molla 2026, exploratory, no causality); neither city regulates heat rejected by equipment

Sources: `vanHeatPolicy` City of Vancouver, Council memo Planning for extreme heat (10 Mar 2022) and Climate Change Adaptation Strategy 2024–25 update: heat mapping, 30% canopy by 2050; no rule on heat rejected by equipment | `edmHeatPolicy` City of Edmonton, Climate Resilient Edmonton (2018) Action 9 'Cool Edmonton'; adaptation progress June 2026: hot days about 1 → 16 a year by the 2050s; no rule on heat rejected by equipment | `duan2026` Duan et al. 2026 (peer-reviewed): surface urban heat island, Vancouver summer daytime 7.25 °C, Edmonton winter night 2.86 °C (land-surface, not air, temperature) | `molla2026` Molla 2026, In my backyard? Digital heat islands and the environmental justice of AI infrastructure in Phoenix (Climate Physics and Atmospheric Science 3–4, 100016; peer-reviewed short communication; read 19 Oct 2026): 46 data-centre buildings; land-surface temperature 39.74 °C within 1 km vs 39.26 °C citywide (≈ +0.5 °C), NDVI 0.15 vs 0.17, disproportionate proximity to low-income and minority populations; exploratory, 'does not establish causality'

### Recent water restrictions  (`restriction_history`)

- Stage: What the site offers · unit: list · level: Civic
- Inputs (formula arguments): parcel
- Fed by (diagram links): parcel · feeds: —
- Trust: own 80 / 100 · weakest input (chain) 80 / 100 · status: read

```
restriction_history = f(parcel)
dated official events per city
```

Coefficients: Vancouver: Stage 3 2015; Stage 2 2023 (4 Aug–15 Oct); 2026 Stage 3 from 8 Jun; Edmonton: one mandatory ban 29 Jan–2 Feb 2024 (plant failure, not drought); EPCOR: restrictions not every year

Sources: `mvStageHistory` Metro Vancouver: Stage 3 in 2015; Stage 1 extended to 31 Oct in 2022; Stage 2 4 Aug–15 Oct 2023; 2026 Stage 2 from 1 May, Stage 3 from 8 Jun, Stage 1 from 1 Sep; May 2026 report: 2023 'the most recent escalation to Stage 2' before 2026 | `epcorStages` EPCOR water restrictions, business guides: stages 1–4 target 5/10/15/25% reduction; stages 1–2 'actions your business can take', 3–4 'must take'; cooling towers: optimise, reduce 'where possible'; non-essential continuous-flow processes limited (3–4); 'essential' not defined; only official event found: mandatory ban 29 Jan–2 Feb 2024 (plant failure)

### Earthquake hazard  (`seismic_sa02`)

- Stage: What the site offers · unit: g · level: Technical
- Inputs (formula arguments): parcel
- Fed by (diagram links): parcel · feeds: —
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: proposed values

```
seismic_sa02 = f(parcel)
Sa(0.2) for the city; replace with the NRCan calculator value for the parcel
```

Coefficients: Vancouver 0.848, Edmonton 0.103 (proposed 2020 table; final table not read): Vancouver about 8×

Sources: `nrcSeismic2020` NRC NBC 2020 public review (Jan 2020, Change 1405) proposed Sa(0.2): Vancouver 0.848, Edmonton 0.103 (final table not read; parcel values need the NRCan calculator)

### Nations whose lands these are  (`nations_named`)

- Stage: What the site offers · unit: text · level: Everyday
- Inputs (formula arguments): parcel
- Fed by (diagram links): parcel · feeds: —
- Trust: own 90 / 100 · weakest input (chain) 80 / 100 · status: read

```
nations_named = f(parcel)
the City's own wording, and links to each Nation's own referral page; no statement of any Nation's position
```

Coefficients: Vancouver: xʷməθkʷəy̓əm (Musqueam), Sḵwx̱wú7mesh Úxwumixw (Squamish), səlilwətaɬ (Tsleil-Waututh), unceded territories; Edmonton: Treaty 6 territory and the Métis homeland, peoples named, not individual Nations (Confederacy of Treaty No. 6 lists 15)

Sources: `vanNationsNamed` City of Vancouver names xʷməθkʷəy̓əm (Musqueam), Sḵwx̱wú7mesh Úxwumixw (Squamish) and səlilwətaɬ (Tsleil-Waututh) Nations, on unceded territories (UNDRIP Strategy pp. 3–4); each Nation's referral page: https://www.musqueam.bc.ca/departments/title-and-rights/iga/ ; https://www.squamish.net/divisions/territory-culture-services/rights-title/referrals/ ; https://twnation.ca/our-departments/treaty-lands-resources/ | `edmNationsNamed` City of Edmonton land acknowledgement: Treaty 6 territory and the Métis homeland; names peoples (incl. Nehiyaw/Cree, Dene, Anishinaabe/Saulteaux, Nakota Isga, Niitsitapi) not individual Nations; Confederacy of Treaty No. 6 lists 15 Nations (https://www.treatysix.org/nation-listing); Indigenous Framework roles Listener, Connector, Advocate, Partner; Urban Reserve Strategy approved 28 Jun 2021

### Deep geothermal heat  (`deep_geo`)

- Stage: What the site offers · unit: MWth · level: Technical
- Inputs (formula arguments): receiver_demand
- Fed by (diagram links): receiver_demand · feeds: —
- Trust: own 55 / 100 · weakest input (chain) 55 / 100 · status: Edmonton only

```
deep_geo = f(receiver_demand)
MWth = flow × c × (T_res − T_return)
```

Coefficients: Edmonton: ~90 °C at 2.5 km, 30–80 kg/s → 2.1–5.6 MWth average per well pair, $4.7–8 M per well (Majorowicz & Grasby 2021); licensed by the AER (Directive 089, 2025); competes with data-centre heat as a district source rather than cooling the data centre; Vancouver: not plausible for power, direct use unproven

Sources: `majorowicz2021` Majorowicz & Grasby, Deep Geothermal Heating Potential for the Communities of the Western Canadian Sedimentary Basin, Energies 14(3):706 (2021) | `aer_d089` Alberta Energy Regulator, Directive 089: Geothermal Resource Development (7 Feb 2025) | `vanDeepGeo` No published temperature-at-depth assessment for Vancouver / the Lower Mainland was found. Heat flow west of the Coast Plutonic Complex is low, about 44 mW/m² (Lewis, Judge & Souther 1978, abstract); GSC OF 6914 (Grasby et al. 2012) names southern BC volcanic belts (Garibaldi) as EGS targets; Geoscience BC Report 2015-11 covers volcanic-belt sites 100+ km away (Meager Creek 180–280 °C). Edmonton 90 °C at 2.5 km confirmed (Majorowicz & Grasby 2021, Table A1)

### Sewer as heat source or sink  (`sewer_sink`)

- Stage: What the site offers · unit: MW at the pipe · level: Technical
- Inputs (formula arguments): sewer_flow
- Fed by (diagram links): sewer_flow · feeds: —
- Trust: own 40 / 100 · weakest input (chain) 20 / 100 · status: rules in hand for Vancouver; flow at a parcel and all Edmonton figures are gaps

```
sewer_sink = f(sewer_flow)
Q = flow × 4.18 × ΔT, within the temperature rules: sewage arriving at the plant ≥ 11 °C when used as a source (KWL design rule); waste entering a facility < 40 °C, non-domestic waste < 65 °C when used as a sink (Bylaw 299)
```

Coefficients: Vancouver: ~45 MW city-wide, ~100 MW region-wide (KWL 2014, secondary); NEU uses 3.2 + 6.6 MW; access first-come first-served with a letter of support (UT-008); heat user pays access costs; per-pipe flow near a parcel is not published (only North Surrey 6 MW). Edmonton: no EPCOR sewer-heat programme or data found; non-contact cooling water to sanitary sewer needs EWSI written approval (Bylaw 18100 s.5.10); Edmonton: Blatchford's planned sewer heat exchange centre (two combined sewers under the future market area) was deferred after EPCOR reduced its sewer-flow forecasts (Blatchford Budget and Plans 2023–2026) — the first Edmonton evidence on sewer heat, and a caution

Sources: `kwlSewer` KWL for Metro Vancouver 2014, heat-seeking sewer model | `gvsddUT008` Metro Vancouver (GVS&DD) Policy UT-008 Sewage Waste Heat Recovery (rev. 29 Jul 2022): access 'on a first-come first-served basis'; private applicants need a letter of support from the host municipality; heat user pays access costs; no $/GJ | `gvsdd299` GVS&DD Sewer Use Bylaw 299, Sch. A 4(b),(c): prohibited 'Any Waste which will raise the temperature of Waste entering any Sewage Facility to 40 degrees Centigrade' and non-domestic waste at 65 °C | `neuSewage` City of Vancouver, NEU sewage heat recovery: '3.2 megawatts (MW) of sewage heat recovery capacity', expansion 'an additional 6.6 megawatts' (two 3.3 MW heat pumps, end of 2024) | `edm18100` Edmonton Drainage Bylaw 18100 s.5.10(i): non-contact cooling water to the sanitary sewer only with prior written EWSI approval; no EPCOR sewer-heat programme found | `blatchford2023` City of Edmonton, 2023–2026 Blatchford Renewable Energy Utility Budget and Plans (Dec 2022) | `vanSewerCap2025` City of Vancouver, Sewer Capacity Development Review Policy (Council 29 Oct 2025): no-review threshold, then low-impact class, else "detailed technical review by the City Engineer"; model prepared by the City or the applicant; no timeline or cost-sharing stated | `mvWDP2021` Metro Vancouver waste discharge permit application (Dec 2021): "cooling water" and "boiler blow down" listed among non-domestic sources to describe; new industrial permit fee $1,000 | `epcorDrainage2023` EPCOR Water and Drainage Customer Connection Guide (May 2023) and One Water planning memos (Mar 2025): EPCOR reviews stamped plans and issues an approval letter with costs; "Details of any required sewer construction would be reviewed at the Development Permit stage"; no timelines

### Acoustic cover from the place  (`ambient_cover`)

- Stage: What the site offers · unit: dBA allowed · level: Technical
- Inputs (formula arguments): receptors, parcel
- Fed by (diagram links): receptors, parcel · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 60 / 100 · status: Vancouver in hand; Edmonton to recheck

```
ambient_cover = f(receptors, parcel)
the zone pair sets what is allowed; a louder zone is the cover — Vancouver credits no ambient noise for equipment
```

Coefficients: Vancouver By-law 6555: quiet→quiet 55/45, activity→quiet 60/55, intermediate or activity→other 70/65 (day/night); background credited only for commercial premises. AUC Rule 012 road categories credit ambient but apply only to power plants and substations. Neither city publishes a road-noise map (traffic counts only). Edmonton Bylaw 14600 limits pending (J.B. retrieval D1)

Sources: `van6555zones` Vancouver Noise Control By-law 6555 (consol. 14 Jul 2026), continuous sound ss.2.1–2.3: quiet→quiet 55 day / 45 night; activity→quiet 60 / 55; intermediate/activity→other 70 / 65; 'background noise' credited only for commercial premises (s.3.1(b)); no ambient credit for equipment | `rule012` AUC Rule 012: Noise Control, consolidated 30 Sep 2024 (74 pp.), Table 1 p.3; Bulletin 2026-03 (17 Apr 2026) | `bylaw14600` Edmonton Bylaw 14600 ss.19–22: 65 dBA day / 50 night at the residential property line; no Leq or continuous-noise provision

### Flood exposure  (`flood_exposure`)

- Stage: What the site offers · unit: m above or below the flood level · level: Civic
- Inputs (formula arguments): flood_area, start_case
- Fed by (diagram links): flood_area, start_case · feeds: —
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: Vancouver sourced; datum conversion not found; Edmonton not yet looked at

```
flood_exposure = f(flood_area, start_case)
floor elevation of the plant vs the flood construction level, for parcels in the designated floodplain
```

Coefficients: Vancouver FCL 4.6 m (GVRD datum, includes 1 m sea-level rise to 2100, 1:500-yr, 0.6 m freeboard); switchgear, electrical panels and fire protection not below FCL unless flood-protected (VBBL Div. C 2.2.9.3(2)); main switchgear in industrial buildings at or above FCL (F014 s. 3.3)

Sources: `van_f014` City of Vancouver, Flood Plain Standards and Requirements (F014, 2014, amended Mar 2023) | `van_floodplain` City of Vancouver Open Data, Designated floodplain | `src22` Beyond Data research note 22: Vancouver floors, flood, water (sources/22_vancouver_floors_flood_water.md) | `edmFPO2250` Edmonton Zoning Bylaw 20001 (as adopted, effective 1 Jan 2024; later amendments not checked), s. 2.250 FPO Floodplain Protection Overlay: applies to the lands mapped in its Appendix I (floodplains of the North Saskatchewan River and tributaries), and to the whole lot if the boundary crosses it (2.2); the applicant must submit an Alberta P.Eng. or architect certificate that the development complies with the floodplain policies of the applicable statutory plans (3.1); the Development Planner may require the geodetic elevation of the building and of its lowest opening, and confirmation that habitable rooms, electrical panels, heating units and operable windows are flood-proofed, plus basement and site drainage (3.2); conditions must follow the certificate (3.4). The bylaw sets no flood construction level of its own (Vancouver: FCL 4.6 m)

### Rules for generation beside the data centre  (`self_gen_rules`)

- Stage: What the site offers · unit: rule · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: —
- Trust: own 80 / 100 · weakest input (chain) 80 / 100 · status: in hand

```
self_gen_rules = f()
export cap and compensation by province; connection priority for paired generation (Alberta)
```

Coefficients: BC: RS 2289 from 1 Jul 2026, export up to 100 kW per phase (or ≤100 kW nameplate) at $0.10/kWh, same or adjacent parcel; RS 2289 applies only at distribution voltage, so a data centre supplied at 60 kV or higher (RS 1830) cannot use it; community generation up to 2 MW. Alberta: micro-generation ≤5 MW (retail credit <150 kW, wholesale above); data centres paired with dedicated new generation or storage go to the front of the connection line (Alta Reg 117/2026, government summary) | 19 Oct 2026 (L): BC Hydro describes RS 2289 as generation on your own property; the formal location clause (same or adjacent parcel) is not confirmed

Sources: `bchTariff2026` BC Hydro Electric Tariff (PDF, J.B. download 15 Oct 2026; read by Claude): RS 1600/1601/1610/1611 Large General Service, Revision 16, effective 1 Apr 2026 (BCUC G-76-25): 29.99 ¢/day, $13.83/kW of billing demand, 6.79 ¢/kWh, for ≥150 kW or >550,000 kWh a year; RS 1830 Transmission Service, Revision 3, effective 1 Apr 2026: supply at 60 kV or higher, $12.178/kVA, 4.914 ¢/kWh; RS 2289 Self-Generation Service, original, effective 1 Jul 2026 (G-64-26): only for customers taking service at distribution voltage; clean or renewable facility ≤100 kW nameplate or ≤100 kW per phase net injection, on the same or an adjacent parcel; BC Hydro pays 10 ¢/kWh for net generation, credit balance paid out each 30 April; RS 4100 Public EV Charging (BC Hydro's own stations), effective 1 Apr 2026: Level 2 31.30 ¢/kWh, fast 40.29 ¢/kWh | `bchRS2289` BC Hydro self-generation: RS 1289 net metering closing; from 1 Jul 2026 RS 2289 | `abMicrogen` Alberta micro-generation: capacity 'that does not exceed five (5) megawatts' (AUC); small (<150 kW) credited at retail, large at hourly wholesale; emissions ≤418 kg/MWh (alberta.ca, 2 Mar 2026) | `abGridPage` Government of Alberta, data centres | `altaReg117` Data Centre Regulation, Alta Reg 117/2026 (Electric Utilities Act), CanLII, current as posted 2026-06-17, retrieved 2026-10-11 | `bennettBill22` SECONDARY (law-firm summary): Bennett Jones, Alberta's Electricity Statutes (Modernizing Alberta's Electricity Grid) Amendment Act (Bill 22; Royal Assent 31 May 2022; proclaimed 6 Mar 2024), 11 Mar 2024: self-supply and export of surplus electricity permitted when s. 2(1)(b) conditions are met; CONFLICTS with the bill as introduced, which exempts only self-supply consumed on the property and has no export clause (abBill22) and with the current consolidation (abEUA2026) | `bcUCAs1` BC Utilities Commission Act s. 1 "public utility" | `aucCoaldale2025` AUC Decision 29294-D01-2025 (Coaldale Renewables / McCain, 3 Jun 2025): under EUA s. 2(1)(b) "the lands must, at a minimum, be contiguous"; lines crossing a highway to the customer "are an attempt to self-distribute and are not permitted". Permission to appeal granted in part (Sep 2025, per law-firm commentary); outcome not verified | `abEUAdef2026` Alberta Electric Utilities Act, consolidation current to 6 Feb 2026 (J.B. download): s. 1(1)(m) "electric distribution system" means "the plant, works, equipment, systems and services necessary to distribute electricity in a service area", excluding a generating unit, a transmission facility, and an energy storage resource in an energy storage facility unless approved under HEEA s. 25.1. Amendments not in force at that date include 2025 c8 (repeals and substitutes s. 18) | `bchSelfGen2026` BC Hydro, Self-generation rate updates (BCUC application ID 1323): RS 2289 from 1 Jul 2026, exports up to 100 kW per phase at 10 ¢/kWh; RS 2290 community generation, net injection up to 2 MW, set by 24 kW per residential and 100 kW per commercial beneficiary, bill credits only; BCUC G-64-26 sets net billing at 10 ¢/kWh for RS 2289 and RS 2290 (executive summary); beneficiaries may be anywhere in BC Hydro's service area (BC Hydro page) | `bchCustGen` BC Hydro, Customer generation and Community generation pages: at least two benefitting customers; each takes at most 50% (≤ 4 accounts), 25% (5–9) or 10% (≥ 10) of the credits; beneficiaries anywhere in the service area; community generation beneficiaries 'do not receive electricity directly from the facility' and must hold an active BC Hydro account


## 4. What it gives off

### Free-cooling hours  (`free_cooling_hours`)

- Stage: What it gives off · unit: h/yr · level: Technical
- Inputs (formula arguments): weather
- Fed by (diagram links): weather · feeds: free_cooling_hours_2050s
- Trust: own 80 / 100 · weakest input (chain) 80 / 100 · status: computed from government typical-year file (data/cwec_derived.json); approach temperatures are assumptions (60)

```
free_cooling_hours = f(weather)
count hours with T_outdoor < threshold (18–27 °C inlet, approach +1.5 air-side or +12 dry cooler)
```

Coefficients: 18 Oct 2026 (sweep M30–M32; audit/plant_sources_2026-10-18.md): full free cooling for an air-cooled hall (13 °C supply, ~18 °C return, ~10 K approach) only at ≤8 °C outdoors: 3,284 h Vancouver, 5,522 h Edmonton in the CWEC year (Claude's count). CWEC 2020 edition (header CWEC2011 format, years 2000–2017), computed: Vancouver Intl air-side full free cooling 7,109 h at 18 °C inlet / 8,086 at 21 / 8,645 at 24 / 8,759 at 27; dry cooler to 30 °C liquid loop 7,675 h, to 40 °C 8,760. Edmonton Intl: air 7,614 / 8,046 / 8,412 / 8,661; dry cooler 7,846 / 8,754 / 8,760. Approach +1.5 °C air, +12 °C dry cooler (assumed). HDD18 from file: Vancouver 2,810, Edmonton 5,514 (design values 2,925 / 5,120)

Sources: `ashrae` ASHRAE TC 9.9 inlet 18–27 °C; free-cooling hours by bin from CWEC hourly weather (Formulas sheet) | `cwec` CWEC 2020 edition typical-year files, ECCC Engineering Climate Datasets (collaboration.cmc.ec.gc.ca …/CWEC_FMCCE/CWEC_FMCCE_v_2020): CAN_BC_VANCOUVER-INTL-A_1108395_CWEC.epw; CAN_AB_EDMONTON-INTL-A_3012216_CWEC.epw

### Embodied carbon, building  (`embodied_building`)

- Stage: What it gives off · unit: tCO2e · level: Civic
- Inputs (formula arguments): floor_area
- Fed by (diagram links): floor_area · feeds: embodied_rule
- Trust: own 40 / 100 · weakest input (chain) 40 / 100 · status: proxy per m²; share confirmed from Alissa et al. 2025

```
embodied_building = f(floor_area)
floor_area × kg CO2e/m²
```

Coefficients: Vancouver benchmark 400 kg CO2e/m² (city-set) used for both cities in place of the 461 US median; Vancouver benchmark 400 kg CO2e/m² (city-set) used for both cities in place of the 461 US median; Vancouver benchmark 400 kg CO2e/m² (city-set) used for both cities in place of the 461 US median; Vancouver benchmark 400 kg CO2e/m² (city-set) used for both cities in place of the 461 US median; Vancouver benchmark 400 kg CO2e/m² (city-set) used for both cities in place of the 461 US median; Vancouver benchmark 400 kg CO2e/m² (city-set) used for both cities in place of the 461 US median; Vancouver benchmark 400 kg CO2e/m² (city-set) used for both cities in place of the 461 US median; Vancouver benchmark 400 kg CO2e/m² (city-set) used for both cities in place of the 461 US median; Vancouver benchmark 400 kg CO2e/m² (city-set) used for both cities in place of the 461 US median; Vancouver benchmark 400 kg CO2e/m² (city-set) used for both cities in place of the 461 US median; Vancouver benchmark 400 kg CO2e/m² (city-set) used for both cities in place of the 461 US median; Vancouver benchmark 400 kg CO2e/m² (city-set) used for both cities in place of the 461 US median; Vancouver benchmark 400 kg CO2e/m² (city-set) used for both cities in place of the 461 US median; Vancouver benchmark 400 kg CO2e/m² (city-set) used for both cities in place of the 461 US median; 461 kg CO2e/m² median for general buildings (no data-centre per-m² benchmark exists). Alissa et al. 2025 (Microsoft data, air-cooled): the building is 0.6% of a data centre's life-cycle GHG on a US-average grid and about 5% on renewable power — so the building shell is small either way; servers and electricity dominate

Sources: `clf` Carbon Leadership Forum WBLCA benchmark 461 kgCO2e/m² | `alissa2025lca` Alissa et al. 2025, Nature 641:331–338, LCA tool workbooks (Zenodo 14268168; J.B. download): per virtual core per year on the 2021 US grid, air-cooled | `vanEmbodied` City of Vancouver embodied carbon guidelines / VBBL 2025: benchmark 400 kg CO2e/m²; new buildings at most 2× the baseline (absolute path cap 800 kg/m²); further 10% cut delayed; Edmonton has no requirement for private buildings

### Load factor (average ÷ the servers' combined maximum power)  (`load_factor`)

- Stage: What it gives off · unit: — · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: hourly_overlap
- Trust: own 80 / 100 · weakest input (chain) 80 / 100 · status: confirmed

```
load_factor = f()
average ÷ sum of each server's measured maximum
```

Coefficients: ≈ 0.6: real data centre averaged 59.5% of 'actual peak' (sum of machine maxima); its observed peak was 71.9%, so average ÷ observed peak ≈ 0.83 (Fan et al. 2007, Table 3, s. 4.3–4.5; checked 18 Oct 2026); 8,760 h/yr

Sources: `fan2007` Fan, Weber, Barroso 2007, Power provisioning for a warehouse-sized computer

### Share of heat captured in liquid  (`liquid_capture`)

- Stage: What it gives off · unit: — · level: Technical
- Inputs (formula arguments): cooling_type
- Fed by (diagram links): cooling_type · feeds: heat_captured, futures
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: in hand

```
liquid_capture = f(cooling_type)
0.5–0.8 cold plate; 1.0 immersion; air: judged
```

Coefficients: 18 Oct 2026 (J.B. decisions, heat items 1–7; audit/heat_items_sources_2026-10-18.md): air cooling — still no capture share for a whole air-cooled hall. Reuse is shown 'possible with a change' (heat pumps on the chilled-water loop or chiller condenser) and the figure 'not yet known'. Evidence: Oró et al. 2019 (return air up to 47 °C, condenser up to 50 °C; ERF on a primary-energy basis 25–45% / ~55%, not ISO ERF); Požgaj et al. 2025 (air-side 30% recovered by heat pumps in place of chillers, ERF 0.78–0.88, 108 kW hybrid); Ljungqvist et al. 2023 (theoretical upper limit with no heat pump, 0.50–0.66 at 13–18 °C); Yuan et al. 2025 review (Table 2 temperatures; its '50–70% recoverable' is cited to Singapore energy statistics — unsupported, not used). 13 Oct 2026: direct-to-chip 48–75 % (LBNL 2014; NREL), cold plate up to 94 % (Heydari 2024), hot-water cooled 80 % (Zimmermann 2012); air-cooled: no primary figure; the often-cited 97 % (Lu et al. 2011) describes electricity becoming heat, not capture — unverified at source. A water-cooled chiller plant rejects all heat to the condenser loop

Sources: `lorenz` Lorenz COP, η 0.50–0.60 (Reinholdt et al. 2018; Pieper et al. 2020); air 25–35 °C, liquid 50–60 °C (Alissa; Wahlroos) (Formulas sheet) | `lbnlCapture` Coles & Greenberg 2014 (LBNL), direct-to-chip liquid capture 'The best results ranged from 67 percent to 75 percent', 57–59 % at 30 °C supply; NREL/TP-2C00-62905: RackCDU 'up to 64% of server heat'; Heydari et al. 2024 Appl. Therm. Eng. 239:122122 cold plate 94 %; air-cooled capture: no primary figure | `oro2019` Oró, Taddeo, Salom 2019, Waste heat recovery from urban air cooled data centres to increase energy efficiency of district heating networks, Sustainable Cities and Society 45:522–542 (peer-reviewed; J.B. upload, read 18 Oct 2026): 1 MW air-cooled model, Barcelona; recovery from return air (up to 47 °C) or chiller condenser (up to 50 °C) with a heat pump to 90 °C; ERF on a primary-energy basis 25–45% / ~55% (not the ISO 30134-6 ERF) | `pozgaj2025` Požgaj, Delač, Pavković, Medica-Viola 2025, Energy Efficiency Through Waste-Heat Recovery: Hybrid Data-Centre Cooling in District Heating Applications, Applied Sciences 16(1):323 (peer-reviewed; J.B. upload, read 18 Oct 2026): 108.5 kW HPC, Rijeka; ~30% of heat to air via chilled-water rack coolers (10–15 °C), recovered by heat pumps in place of the chillers; ERF 0.78–0.88 | `ljungqvist2023` Ljungqvist, Risberg, Toffolo, Vesterlund 2023, A realistic view on heat reuse from direct free air-cooled data centres, Energy Conversion and Management: X 20:100473 (peer-reviewed, open access; J.B. upload, read 18 Oct 2026): theoretical upper limit, no heat pump; ERF 0.50–0.66 at 30–50 °C exhaust, reuse at 13–18 °C, Luleå | `yuan2025` Yuan, Liu, Sun, Lin, Fan, Zhao, Kosonen 2025, Data center waste heat for district heating networks: A review, Renewable and Sustainable Energy Reviews 219:115863 (peer-reviewed; J.B. upload, read 18 Oct 2026): Table 2, air-side return hot air 25–47 °C, condenser coolant 40–50 °C; heat pumps essential for air-side heat

### Flexible share of load  (`flexible_load`)

- Stage: What it gives off · unit: MW·h · level: Civic
- Inputs (formula arguments): it_load_actual
- Fed by (diagram links): it_load_actual · feeds: lrmc_bc, ups_flex
- Trust: own 40 / 100 · weakest input (chain) 40 / 100 · status: literature

```
flexible_load = f(it_load_actual)
flexible kW × hours
```

Coefficients: Emerald AI Phoenix 25% for 3 h (preprint); Call for Demand curtailment ≥10%, 4 h, 36 events; 2026 Call: 15 applications, close to 800 MW requested; results expected after the government transition (BC Hydro, Oct 2026)

Sources: `cfd` BC Hydro 2026 Call for Demand RFA: 100 + 300 MW; 10–145 MW per project; ≥10% premium; curtailment; heat-recovery-ready inside the 10% environmental weight | `bchEIC2026` BC Hydro, Emerging industries connections (page saved by J.B., Oct 2026; read by Claude): the 2026 Call for Demand for AI and data centres is closed | `aesoP2A2026` AESO Engage, Phase 2A: Large Load Integration | BYOG Process (page last updated 8 Sep 2026; J.B. PDF print 16 Oct 2026, read by OCR): Phase 1 rolled out 4 Jun 2025 with a 1,200 MW interim large-load connection limit and an allocation process; Phase 2A develops a connection process for large loads that self-supply on site, enable net new transmission-connected generation, or need MW allocations ("bring your own generation"); Proposed BYOG Process posted 26 Jun 2026; at 8 Sep 2026 the process was still being finalized, with application intake expected in fall 2026; a final proposal waits on a data-centre regulation enabled by Bill 8 (fall 2025). Working group included eStruxture, IREN, Beacon AI Centers and generators | `aesoBYOG2026` AESO, Large Load Integration Phase 2A | `aesoP2Aupd2026` AESO, Large Load Integration Phase 2A BYOG Process Update, stakeholder session deck (18 Jun 2026, updated 24 Jun 2026). About 20 GW of data-centre load requested each quarter since Q2 2025 (19.2 GW Q2 2026). Phase 2 is modular: 2A BYOG, 2B ISO tariff, 2C "Grid Partners" (flexible load structures, operating procedures, market products), not yet set. Load management: data centres prioritized above other loads for reduction under supply-related conditions; in standard operation, if firm load shed is needed in an emergency, data centres reduce before all other firm loads; procedures (pro rata, blocks, rotations) to be developed. 74.9 MW applications rose from 9 (Jun 2025) to 18 (Jun 2026) in the 25–75 MW band; AESO may lower the 75 MW threshold. Distribution-connected large loads bypass BYOG; AESO has limited tools for them. Final process was planned for late July–early August 2026 | `aesoDCupd2025` AESO Update on Data Centres (Sep 2025): over 20,000 MW of data-centre load on the AESO project list; Phase 1 qualified 15 projects / 5 developers / 4,800 MW and assigned 1,200 MW to 3 projects / 2 developers, contracts pending execution (deadline extended to Oct 2025 for the provincial levy engagement); draft technical connection requirements for transmission-connected data centres posted 22 Aug 2025, final requirements planned Nov 2025 | `alta117_2026` Data Centre Regulation, Alta Reg 117/2026 under the Electric Utilities Act (King's Printer extract, current as of 9 Jun 2026; J.B. PDF 16 Oct 2026). s. 1: data centre includes hosting/cloud, digital asset mining, AI/ML, content delivery. s. 2: "large data centre" = maximum demand directly from the transmission system of 75 MW or more, or a lower threshold the AESO sets for reliability. s. 3: AESO may aggregate integrated data centres on the same or adjacent parcels with the same owner or affiliate. s. 5: a large data centre may be "tethered" to new or added generating units or energy storage able to supply at least its maximum demand, reliably and predictably (the Regulation does not limit the fuel; AESO's first intake does). s. 6: tethered requests processed first. s. 7: AESO may require site control, municipal zoning approvals, financing, permits or water licences. s. 8: no service above the tethered supply. s. 9: bridged service before the supply runs only once the plant is approved by the AUC, max 3 years, AESO may cap each and all bridged loads and suspend for unmet criteria. s. 10: inadequate supply

### Heat temperature by cooling type  (`heat_temp`)

- Stage: What it gives off · unit: °C · level: Technical
- Inputs (formula arguments): cooling_type
- Fed by (diagram links): cooling_type · feeds: cop, greenhouse_area, aquaculture_tonnes, algae_kg, insect_check, absorption, futures
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: in hand

```
heat_temp = f(cooling_type)
air-cooled 25–35; liquid-cooled 50–60; two runs if unknown
```

Coefficients: 18 Oct 2026 (J.B. decisions, heat items 1–7; audit/heat_items_sources_2026-10-18.md): air-side return hot air 25–47 °C, chiller condenser 40–50 °C, chilled-water loop 10–20 °C (Yuan et al. 2025 Table 2; Oró et al. 2019); the tool keeps 25–35 °C as the typical air-cooled figure. Alissa p.332; Wahlroos p.1753; heat-rejection equipment per site from permits: rooftop condensers (1050 W Pender, 175 W Cordova), rooftop chiller (55 E 7th), P1 chiller room (555 W Hastings), L8 roof well (515 W Hastings); seen on site (J.B.): 55 E 7th lane deck with a Cummins generator enclosure and a packaged cooling unit piped into the building (rooftop chiller in BP-2019-00595 not photographed — keep both); 111 E 5th louvre bands and three rooftop vent stacks; Internet Centre two rooftop condensing units (corroborates the 2024 "two RTUs, AC only" permit); Qu EDM2 cooling units on a raised platform under a canopy, "Munters" casings (air-side or indirect evaporative suggested, not confirmed); Kyndryl Acheson cooling plant with pipe racks into the wall on the south side; Baxtel claim for Kyndryl: two 550-ton water-cooled chillers (≈3.9 MW thermal) — operator/directory claim | 19 Oct 2026: liquid-cooled measured design 24 °C supply, 35–40 °C return (NREL ESIF); 50–60 °C remains unverified (secondary). | 19 Oct 2026: liquid-cooled measured design 24 °C supply, 35–40 °C return (NREL ESIF); 50–60 °C remains unverified (secondary). | 19 Oct 2026: liquid-cooled measured design 24 °C supply, 35–40 °C return (NREL ESIF); 50–60 °C remains unverified (secondary). | 19 Oct 2026: liquid-cooled measured design 24 °C supply, 35–40 °C return (NREL ESIF); 50–60 °C remains unverified (secondary).

Sources: `lorenz` Lorenz COP, η 0.50–0.60 (Reinholdt et al. 2018; Pieper et al. 2020); air 25–35 °C, liquid 50–60 °C (Alissa; Wahlroos) (Formulas sheet) | `vanPermits` City of Vancouver Open Data, Issued building permits | `fieldJB` J.B. site visits and photographs: Vancouver 8 and 11 Oct 2026 (55 E 7th, 111 E 5th, 333+369 Terminal), Edmonton Oct 2026 (Internet Centre, Qu EDM2, Kyndryl Acheson) | `yuan2025` Yuan, Liu, Sun, Lin, Fan, Zhao, Kosonen 2025, Data center waste heat for district heating networks: A review, Renewable and Sustainable Energy Reviews 219:115863 (peer-reviewed; J.B. upload, read 18 Oct 2026): Table 2, air-side return hot air 25–47 °C, condenser coolant 40–50 °C; heat pumps essential for air-side heat | `oro2019` Oró, Taddeo, Salom 2019, Waste heat recovery from urban air cooled data centres to increase energy efficiency of district heating networks, Sustainable Cities and Society 45:522–542 (peer-reviewed; J.B. upload, read 18 Oct 2026): 1 MW air-cooled model, Barcelona; recovery from return air (up to 47 °C) or chiller condenser (up to 50 °C) with a heat pump to 90 °C; ERF on a primary-energy basis 25–45% / ~55% (not the ISO 30134-6 ERF) | `nrelESIF2019` Van Geet (NREL), Data Center Optimization Strategies: NREL ESIF Data Center Energy and Water Savings (Aug 2019): 24 °C cooling water supply, 35–40 °C return used to heat offices and lab space; ERE 0.929 (first year of TSC operation) | `upsiteASHRAE5` Upsite Technologies blog, Major changes to ASHRAE's fifth edition of Thermal Guidelines, part 3 (industry blog; ASHRAE text not read): facility water classes W17/W27/W32/W40/W45/W+ by upper limit; makers design around 40 °C, few above 45 °C

### Reserved electrical capacity  (`spare_capacity`)

- Stage: What it gives off · unit: MW · level: Civic
- Inputs (formula arguments): it_load_actual
- Fed by (diagram links): it_load_actual · feeds: ev_stalls, reserved_cost, lrmc_bc
- Trust: own 100 / 100 · weakest input (chain) 50 / 100 · status: in hand

```
spare_capacity = f(it_load_actual)
installed − peak; 2N holds half
```

Sources: `heatPhys` Heat ≈ electricity drawn; Q = V × 1.16 × ΔT (Green Grid WP29); ISO/IEC 30134-6 ERF (Formulas sheet)

### Power usage effectiveness  (`pue`)

- Stage: What it gives off · unit: — · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: heat_rejected, pv_share
- Trust: own 80 / 100 · weakest input (chain) 80 / 100 · status: range in hand: an estimate (LBNL 2023) and an industry survey (Uptime 2025), not measured here; confidence 80, not 100 (M104, 19 Oct 2026)

```
pue = f()
E_facility ÷ E_IT
```

Coefficients: Manor Farm target < 1.30; 13 Oct 2026: US average 1.4 (2023, LBNL); global 1.54, North America 1.49, new facilities 1.48 (Uptime 2025, INDUSTRY SURVEY); no Canadian figure (NRCan: no sufficient survey); no source splits existing buildings from purpose-built — use 1.4–1.55

Sources: `heatPhys` Heat ≈ electricity drawn; Q = V × 1.16 × ΔT (Green Grid WP29); ISO/IEC 30134-6 ERF (Formulas sheet) | `uptime2025` Uptime Institute Global Data Center Survey 2025 (INDUSTRY SURVEY): weighted average PUE 1.54 (n=681); facilities commissioned in the last five years 1.48; North America 1.49

### Backup duration  (`backup_hours`)

- Stage: What it gives off · unit: h · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: generator_co2, generator_nox_pm, refuge_people, genset_test, fuel_on_site, refuge_after_quake, backup_neighbours
- Trust: own 90 / 100 · weakest input (chain) 90 / 100 · status: in hand

```
backup_hours = f()
usable kWh ÷ load; fuel ÷ burn rate
```

Coefficients: UPS runtime about 1–2 min (hyperscale), about 5 min (colocation), 10–15 min (financial); generators take over in 10–20 s (vendor claims); 12 h fuel minimum (Uptime) and 24–48 h typical (operator claims)

Sources: `heatPhys` Heat ≈ electricity drawn; Q = V × 1.16 × ΔT (Green Grid WP29); ISO/IEC 30134-6 ERF (Formulas sheet) | `opClaims` Operator capacity claims for the 13 sites (Cologix 4 MW VAN4, 2 MW VAN2; eStruxture 2.4 MW; Qu 2.5–3 MW; Hut 8 0.6–1 MW) (sources/01)

### Sound level at receptor  (`noise_level`)

- Stage: What it gives off · unit: dBA · level: Everyday
- Inputs (formula arguments): plant_schedule, receptors
- Fed by (diagram links): plant_schedule, receptors · feeds: lf_flag, deprivation, noise_limit
- Trust: own 50 / 100 · weakest input (chain) 50 / 100 · status: method in hand; manufacturer-rated levels (AHRI 370 / ISO 9614 / ISO 8528-10) for a starter set; site schedule still needed

```
noise_level = f(plant_schedule, receptors)
screen Lp ≈ Lw − 20·log10(r) − 8; full ISO 9613-2 (NoiseModelling)
```

Coefficients: 18 Oct 2026 (sweep M30–M32; audit/plant_sources_2026-10-18.md): unit count = the units the plant lays out (spares included); Lw per unit: air-cooled chillers 98–101 dBA (Trane RTAF, low-noise to standard), dry coolers 98.5–102 dBA at full fan speed (Güntner GFD ≈2.5 MW; Thermokey 738 kW); towers and hybrid coolers use the chiller ratings as a stand-in (labelled). starter set: scroll chiller 450–850 kW Lw 96–100 dBA (Daikin, AHRI 370); Trane Sintesis Prime RTAF HSE 333–1,010 kW Lw 94–101 standard / 91–98 low-noise, plus size 245 (877 kW) printed as 107 / 103, out of line with its neighbours (brochure RTAF-SLB001-GB p.13; sound rows sit under the 'Eurovent performances' heading but are not labelled Eurovent; checked 18 Oct 2026); the tool takes the 1,010 kW unit (size 280), 98 low-noise / 101 standard, as one unit per MW; screw chiller 99–103 (ISO 9614); dry cooler: Kelvion 94 dBA printed under 'per fan' heading, 61 dBA @10 m — unit total unresolved; Güntner small unit Lw 67 dBA (permit submittal); standby diesel open 98–99 dBA @7 m (ISO 8528-10); enclosed: Cummins QuietSite L2 73–76, L1 78–87, weather-protective 89–91 dBA @7 m; CRAC 48–62 dBA @2 m (Stulz, 30–150 kW); transformer 62–63 dB (NEMA contour, unverified edition)

Sources: `iso9613` ISO 9613-2:2024; screen Lp ≈ Lw − 20·log10(r) − 8; NoiseModelling (open source) (Formulas sheet) | `daikinCAT624` Daikin Applied Trailblazer AGZ-E catalogue 624, AHRI 370 sound power table | `climavenetaIFX` Mitsubishi Electric / Climaveneta i-FX brochure, ISO 9614 sound power | `kelvionLF` Kelvion dry cooler selection printout, EN 13487, Lw 94 dBA / 61 dBA @10 m | `mtuDS2250` mtu 16V4000 DS2250 spec, 98.7 dBA @7 m open (ISO 8528-10) | `catTM9338` Caterpillar 3516 performance sheet TM9338, mechanical and exhaust spectra at 7 m | `cumminsS1443` Cummins S-1443 enclosure sound levels 500–1,000 kW | `stulz` Stulz CyberAir 3PRO CRAC sound pressure @2 m | `oldsNIA` Synapse Olds NIA (OpenCycle, Rev 1, 24 Mar 2026) equipment Lw table | `burlingtonNIA` Burlington ON data-centre noise study (SS Wilson, May 2026), chillers Lw 92 dBA each | `traneRTAF` Trane Sintesis Prime RTAF brochure RTAF-SLB001-GB (2020), sound power table | `maekawaISO` Barrier attenuation: Maekawa–Tatge IL = 10 log10(3 + 20N), N = 2δ/λ (Bugaru et al., Computation 9:129, 2021); ISO 9613-2:1996 Dz capped at 20 dB for single and 25 dB for double diffraction (SoundPLAN appendix filed with the Italian environment ministry; CadnaA documentation). ISO text and Maekawa 1968 not read (paywalled) | `arupManx2013` Arup plant noise assessment, Manx Telecom hosting centre, Isle of Man (13/00726/REM): dry cooler screened by "A solid screen 3m high having a surface mass of 12kg/m²"; limits 45 dB LAeq,1hr at the school, 30 dB at nearest homes | `cumminsF1493` Cummins enclosures F-1493: 1,000 kW set at 7 m | `fhwaBarrier` FHWA noise barrier inventory to 2010, US$/ft²: concrete 30, block 25, wood 20, metal 18, absorptive 28, berm 7; WSDOT current average $51.61/ft². Highway walls, not rooftop screens; dollar basis not confirmed

### What is seen from public space  (`visibility`)

- Stage: What it gives off · unit: ledger · level: Everyday
- Inputs (formula arguments): plant_schedule
- Fed by (diagram links): plant_schedule · feeds: watched_area
- Trust: own 80 / 100 · weakest input (chain) 70 / 100 · status: observation (J.B. to set the confidence level for 'seen on site'; proposed 80 for existence, no capacity)

```
visibility = f(plant_schedule)
for each plant element: seen from public space / closed to view / known only from documents / not checked — tested the same way at every site
```

Coefficients: J.B. field ledger per site (sources/12); permit record for the documented column

Sources: `fieldJB` J.B. site visits and photographs: Vancouver 8 and 11 Oct 2026 (55 E 7th, 111 E 5th, 333+369 Terminal), Edmonton Oct 2026 (Internet Centre, Qu EDM2, Kyndryl Acheson) | `vanPermits` City of Vancouver Open Data, Issued building permits | `edmZB5120` Edmonton Zoning Bylaw 20001, s. 5.120 subs. 1.1: "Non-Industrial development must comply with the following": 1.1.2 "All mechanical equipment, except for Solar Collectors, must be concealed by screening" or incorporated in the building. Does not apply to industrial development | `edmZB2120` Edmonton Zoning Bylaw 20001, BE zone s. 2.120 subs. 5.2: "All mechanical and electrical equipment, transformers, ducts, cooling towers … must be screened from view from Abutting Streets and Sites in non-industrial Zones." IM and IH have no mechanical clause (outdoor storage and service areas screened, IM screens ≤3.7 m); Blatchford, CMUV and JAMSC special areas require rooftop equipment concealed | `vanZDBs10` Vancouver Zoning and Development By-law s. 10.1.1 (May 2026): the Director of Planning may let "mechanical equipment … and any related screening materials" and roof energy technologies exceed maximum height. I-2, I-3, I-1C, FC-2, M-1, C-2 have no roof screening clause; IC-2 s. 4.2.4 (Burrard sites) and 2.2.1(e) require screening from streets and R districts | `thGlobalSwitch2025` Tower Hamlets Strategic Development Committee, PA/24/01932 Global Switch House, 23 Apr 2025: about 10.7 m roof screen "screening the bulk of the plant from view"; flues visible through a ~10.5 m mesh screen; 32 generators enclosed inside the extension; conditions on plant noise and on grilles, louvres, vents and external plant | `abpHuntstown` An Bord Pleanála ABP-313583 (Huntstown, Dublin): 58 generators behind "a circa 6.5 metres high louvred screen wall" and berms; condition 18 bars plant above the parapet | `abpCruiserath` An Bord Pleanála PL06F.248544 (Cruiserath, Dublin 15): roof-level screened plant; parapet condition bars air handling equipment and tanks above the parapet; flue-stack finishes set by condition | `drieeEtix2010` DRIEE Île-de-France inspection report, Etix data centre in a former postal building, Pantin (2010): 26 generators in dedicated soundproofed containers on the roof terrace; chillers with integrated dry coolers on the roof | `spencerBldg` Smith + Andersen, Spencer Building (515 W Hastings, Vancouver) powered-shell sheet: air-cooled chillers and generators "utilizing the limited roof space available"; no screening information; City permit not found | `bahnhofPionen` Bahnhof, Pionen (Stockholm): the facility, generators included, is blasted into bedrock under Vita Bergen; only the entrance is visible | `lpc50Hudson` NYC Landmarks Preservation Commission permit COFA-19-24537 (50 Hudson St): "installing mechanical units set behind a louvered screen" judged not visible from the street; not documented as a data centre | `fairfaxDC2024` Fairfax County, data centre zoning amendment (adopted 10 Sep 2024; news release and May 2024 staff report): "all equipment must be enclosed or screened by a wall or similar barrier"; generators 300 ft from homes; noise studies before and after. Adopted ordinance text not opened | `loudounDC` Loudoun County zoning rewrite summary: "fully-screened mechanical equipment", soundproofing roof or ground plant, facade treatment on all sides. Summary page, no section numbers | `amsterdamDC2020` Amsterdam, siting policy for data centres 2020–2030 (first revision): data-centre buildings only "intensief gestapeld" (intensively stacked); underground encouraged; no roof-plant or screening rule | `yorkClearance2024` York/JCI (2024): a 12 ft wall 6 ft from an air-cooled chiller cut capacity by more than 4.5% and raised power by more than 6%; thin walls no taller than the unit negligible

### Refrigerant leakage  (`refrigerant_co2e`)

- Stage: What it gives off · unit: tCO2e/yr · level: Technical
- Inputs (formula arguments): cooling_type
- Fed by (diagram links): cooling_type · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 60 / 100 · status: default ranges from the IPCC inventory guidelines (read 19 Oct 2026); no Canadian or manufacturer figure for these chillers (M98)

```
refrigerant_co2e = f(cooling_type)
charge × 3%/yr × GWP
```

Coefficients: IPCC GWPs; chiller charge 10–2,000 kg and operating loss 2–15% of the initial charge a year, the lower end for developed countries (IPCC 2019 Refinement, Vol. 3 Ch. 7, Table 7.9, p. 7.32: default ranges, not measured here); the tool's 3%/yr sits near the lower end and its 50–600 kg per chiller inside the range

Sources: `ipcc2019v3ch7` IPCC 2019 Refinement to the 2006 Guidelines for National Greenhouse Gas Inventories, Vol. 3 Ch. 7 (ODS substitutes), Table 7.9 (Updated), p. 7.32: chillers

### Shadow on neighbours  (`shadow`)

- Stage: What it gives off · unit: m²·h · level: Everyday
- Inputs (formula arguments): floor_area, massing
- Fed by (diagram links): floor_area, massing · feeds: —
- Trust: own 90 / 100 · weakest input (chain) 70 / 100 · status: in hand

```
shadow = f(floor_area, massing)
fall-equinox shadows 10:00–16:00 on parks, schools, opposite sidewalks
```

Coefficients: Vancouver Solar Access Guidelines

Sources: `solar` Vancouver Solar Access Guidelines (2024, am. 2026): fall-equinox shadows 10:00–16:00 (Formulas sheet) | `edm7140sun` Edmonton Zoning Bylaw 20001 (Charter Bylaw 20001 as adopted, effective 1 Jan 2024; City PDF, OCR text, J.B. download 14 Oct 2026; later amendments not checked), s. 7.140 Special Information Requirements, subs. 9 Sun Shadow Impact Study: the Development Planner MAY require one only where the development is a Discretionary Development (9.1); prepared by an Alberta P.Eng. or architect (9.2.1); shadows every 3 hours between sunrise and sunset, Mountain Standard Time, on 21 Mar, 21 Jun, 21 Sep and 21 Dec (9.2.3); impact judged as the difference between the maximum massing the zone allows and the proposed massing (9.3.1); may refuse or require redesign (9.3.2–9.3.3). No shadow clause found in the standard industrial zones (BE, IM, IH); shadow clauses appear for towers in RL and MU (in compliance with 7.140), UI height variances, and special areas (HOR, CMU, AED, RTCC, ALA); 3.50 Energy and Technology Park mentions shading only as tree planting. s. 2.140 IH lists permitted uses only (Major Industrial; Minor Industrial limited to those existing at 1 Jan 2024) and no discretionary uses, so the study cannot be required there; the bylaw names no data-centre use (Minor/Major Industrial definitions, Part 8), so the use class is for the Development Planner to determine. Search of the full text for shad/shadow/sun

### Harvestable rainwater  (`rainwater`)

- Stage: What it gives off · unit: m³/yr · level: Civic
- Inputs (formula arguments): envelope, massing
- Fed by (diagram links): envelope, massing · feeds: —
- Trust: own 80 / 100 · weakest input (chain) 75 / 100 · status: rainfall confirmed (government normals, data/normals_1991_2020_extract.json); C and tank size assumed

```
rainwater = f(envelope, massing)
V = A × R × C; A = roof area: a new building's footprint as drawn from the site setup (else the footprint the yards leave), an existing building's roofs added together (M47, 18 Oct 2026)
```

Coefficients: ECCC Normals 1991–2020: Vancouver Intl precipitation 1,159.5 mm/yr (rain 1,119.2; Oct–Jan ≥124 mm/mo, Jul 34 mm); Edmonton City 422.5 mm/yr (Edmonton Airport 434.0; Jun–Aug 213 mm, Dec–Feb 43 mm, mostly snow); C = 0.8 assumed (CSA B805 not read); tank = one wet month, assumed | 19 Oct 2026: storage CAD 667/m³ (Vancouver toolkit 2014) to 2,955 (US EPA 2013 with pumps and controls, US$ converted); 15–30 yr (warranties); cost per m³ used at 5.6% real against water + sewer rates | 19 Oct 2026: storage CAD 667/m³ (Vancouver toolkit 2014) to 2,955 (US EPA 2013 with pumps and controls, US$ converted); 15–30 yr (warranties); cost per m³ used at 5.6% real against water + sewer rates | 19 Oct 2026: storage CAD 667/m³ (Vancouver toolkit 2014) to 2,955 (US EPA 2013 with pumps and controls, US$ converted); 15–30 yr (warranties); cost per m³ used at 5.6% real against water + sewer rates

Sources: `femp` US DOE FEMP BMP #10: evaporation ≤ Q ÷ h_fg (~1.5 L/kWh); blowdown = E ÷ (C−1); WUE (ISO 30134-9) (Formulas sheet) | `eccc` ECCC Canadian Climate Normals 1991–2020, station data CSV (BC, AB), climate.weather.gc.ca | `abRainwater2010` Alberta Guidelines for Residential Rainwater Harvesting Systems (2010): uses toilet and urinal flushing and sub-surface irrigation; size with 20% dead space; first flush 0.5–1.5 mm; residential only, commercial referred to federal reclaimed-water guidance; Alberta Health Public Health Guidelines for Water Reuse and Stormwater Use (Jan 2021) list cooling towers among end uses but listing is not approval | `epaRain2013` US EPA 841-R-13-002 (2013), Rainwater harvesting: cistern US$1.50–3.00 per gallon; pumps, controls, treatment US$2–5 per gallon (p. 24) | `vanISMP2014` City of Vancouver, Integrated Stormwater Management BMP Toolkit Vol. II (2014), p. II-18: about $10,000 for a 15 m³ below-ground tank (Class D ±30%) | `femRain` US DOE FEMP, Rainwater harvesting systems technology review: tanks and pipework warranted 15–30 years, pumps 2–10

### Water behind the electricity  (`water_behind_electricity`)

- Stage: What it gives off · unit: L/yr · level: Civic
- Inputs (formula arguments): it_load_actual
- Fed by (diagram links): it_load_actual · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 50 / 100 · status: in hand

```
water_behind_electricity = f(it_load_actual)
E × w_grid
```

Coefficients: US thermoelectric ~1.25 L/kWh; hydro ~16.8 L/kWh; BC as a range

Sources: `femp` US DOE FEMP BMP #10: evaporation ≤ Q ÷ h_fg (~1.5 L/kWh); blowdown = E ÷ (C−1); WUE (ISO 30134-9) (Formulas sheet) | `cerProfiles2026` Canada Energy Regulator provincial energy profiles (modified 26 Mar 2026): Alberta 2021 generation 73.9 TWh, about 22% coal and 63% natural gas, wind 9%, hydro 3%, bioenergy 2% (coal phased out June 2024); BC 2021 generation 71.7 TWh, shares by source not given in text

### Embodied carbon, IT  (`embodied_it`)

- Stage: What it gives off · unit: tCO2e/yr · level: Civic
- Inputs (formula arguments): servers
- Fed by (diagram links): servers · feeds: —
- Trust: own 50 / 100 · weakest input (chain) 50 / 100 · status: manufacturer LCA (EPEAT-verified)

```
embodied_it = f(servers)
servers × kg CO2e per server ÷ lifespan
```

Coefficients: Dell R760 LCA (2025): 4,177 kg CO2e total (US), manufacturing ≈10–15%; R740 PCF 8,640 ± 8,480 kg Alissa et al. 2025: making the servers is 8.8% of life-cycle GHG on a US-average grid but about 82% on renewable power (their two cases only). The tool's own inference: on Vancouver's low-carbon grid, making the servers is of the same order as running them (at 1 MW the electricity is about 133–147 t/yr at 18.1 g/kWh); in Edmonton running them dominates.

Sources: `dell` Dell carbon-footprint PDFs: R740 26.3 kg, R540 25.4 kg (2U); R650 21.25 kg (1U); Danczak 2018 rare earths; Graedel 2011 copper | `dellR760` Dell PowerEdge R760 LCA (Sphera 2025) and system weight 36.1 kg | `alissa2025lca` Alissa et al. 2025, Nature 641:331–338, LCA tool workbooks (Zenodo 14268168; J.B. download): per virtual core per year on the 2021 US grid, air-cooled

### Light at neighbour's window  (`light_at_window`)

- Stage: What it gives off · unit: lx · level: Everyday
- Inputs (formula arguments): lighting_plan
- Fed by (diagram links): lighting_plan · feeds: —
- Trust: own 70 / 100 · weakest input (chain) 60 / 100 · status: standard transferred

```
light_at_window = f(lighting_plan)
vertical illuminance vs CIE 150 zone limit (E3 10 / 2 lx pre/post curfew)
```

Coefficients: CIE 150:2017 via ILP GN01/20; Vancouver: no lux limit; Untidy Premises By-law 4548 s. 7 bars an outdoor light casting light directly onto a residential window across the street or adjacent AND unreasonably disturbing the neighbour (qualitative; checked 18 Oct 2026); Edmonton Bylaw 20001 s.5.120(3): glare minimised, light deflected away, directed downward — qualitative

Sources: `cie150` CIE 150:2017 obtrusive light limits via ILP GN01/20 | `edmBylaw20001` Edmonton Zoning Bylaw 20001 s.5.80 Table 5.1.3 (stalls) and s.5.120 (lighting, nuisance) | `vanLight2019` Vancouver Building By-law 2019, 10.2.2.10(2) (residential buildings and parts facing a lane): full cut-off or shielded luminaires over 600 lumens, mounted no higher than 4 m along side and back yards, dimmer and timer controls, minimize lighting of adjacent properties; Untidy Premises By-law 4548 s. 7: no outdoor light that casts light directly onto a neighbouring residential window and unreasonably disturbs; no lux values in either city

### Heat carried in water  (`heat_in_water`)

- Stage: What it gives off · unit: kWh · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: —
- Trust: own 100 / 100 · weakest input (chain) 100 / 100 · status: in hand

```
heat_in_water = f()
Q = V × 1.16 × ΔT
```

Coefficients: 1.16 kWh per m³ per °C

Sources: `heatPhys` Heat ≈ electricity drawn; Q = V × 1.16 × ΔT (Green Grid WP29); ISO/IEC 30134-6 ERF (Formulas sheet)

### Free-cooling hours in the 2050s  (`free_cooling_hours_2050s`)

- Stage: What it gives off · unit: h/yr · level: Technical
- Inputs (formula arguments): weather, free_cooling_hours
- Fed by (diagram links): weather, free_cooling_hours · feeds: homes_heated_2050s
- Trust: own 80 / 100 · weakest input (chain) 80 / 100 · status: computed from the PCIC files (both cities, Intl stations, same method)

```
free_cooling_hours_2050s = f(weather, free_cooling_hours)
same count as free_cooling_hours, run on the PCIC 2050s file (SSP2-4.5 and SSP5-8.5); shown beside today's value
```

Coefficients: computed 19 Oct 2026 from the PCIC files (Vancouver Intl): hours ≤ 8 °C 3,284 now → 2,279 (SSP2-4.5) / 1,954 (SSP5-8.5); hours > 18 °C 1,085 → 1,879 / 2,218; peak 25.6 → 27.6 / 28.6 °C. Edmonton Intl: hours ≤ 8 °C 5,522 → 5,047 / 4,815; hours > 18 °C 914 → 1,259 / 1,479; hours ≥ 30 °C 0 → 22 / 71; peak 29.0 → 31.9 / 33.3 °C. Files shift averages ("Heat waves or cold spells remain largely unchanged")

Sources: `pcicWx3` PCIC future-shifted weather files v3 (PCIC-WX-3.0.1, 27 Jan 2025): based on CWEC 2020; 2040s–2080s; SSP1-2.6, 2-4.5, 5-8.5; 564 locations; shifts temperature, dew point, humidity, pressure; 'Heat waves or cold spells remain largely unchanged' (Sobie & Curry 2025, Data in Brief)

### Ground and groundwater at the parcel  (`ground`)

- Stage: What it gives off · unit: ft, USgpm, m²/d · level: Technical
- Inputs (formula arguments): parcel
- Fed by (diagram links): parcel · feeds: stored_heat, licence_flag, borefield, ates
- Trust: own 80 / 100 · weakest input (chain) 80 / 100 · status: Vancouver in hand (government export); Edmonton pending AWWID

```
ground = f(parcel)
nearest N wells (GWELLS well.csv by lat/long): finished depth, static water level, bedrock depth, yield, aquifer_id, lithology; pump-test transmissivity and hydraulic conductivity where a test exists; report the spread, never a point
```

Coefficients: Wells in a latitude/longitude box around Vancouver, which also takes in parts of North Vancouver, Richmond and Burnaby (verification sweep 17 Oct; counts by municipality not re-checked): 333; depth median 59 ft (p10 16, p90 210); static level median 11 ft; yield sparse (114 values, p90 100 USgpm); 2 open-loop geoexchange wells (the sweep places both in Richmond; not re-checked); Edmonton: AWWID (retrieval guide F6), not yet in hand

Sources: `gwells` BC GWELLS export (well.csv, lithology.csv, screen.csv, pt_aquifer_parameters.csv), apps.nrs.gov.bc.ca/gwells | `abWells2026` Alberta Water Well Information Database, Reconnaissance Reports for Twp 51–54, Rge 22–26 W4M (J.B. downloads 16 Oct 2026; nine reports, 3,844 records parsed; owner names not kept): uses mostly domestic (about 2,810) and industrial (299); median depth 145 ft domestic, 200 ft industrial; records from 1898 to 2026, 366 since 2000. No record mentions geoexchange, ground loops or heat, although the area covered includes Blatchford, which has a geoexchange field

### Heat-pump COP (Lorenz)  (`cop`)

- Stage: What it gives off · unit: — · level: Technical
- Inputs (formula arguments): heat_temp, receiver_temp
- Fed by (diagram links): heat_temp, receiver_temp · feeds: heat_delivered, hp_electricity
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: calibrated on six cases: η 0.39–0.53 built/operating

```
cop = f(heat_temp, receiver_temp)
COP = η × T_lm,sink ÷ (T_lm,sink − T_lm,source), log-mean temperatures on both sides (sink supply/return; source in/out); η 0.40–0.50 for built systems (calibrated 13 Oct 2026), 0.50–0.60 upper bound
```

Coefficients: checks: ~3 at 20→75 °C; 4.5–5.0 Odense; DEA Aug 2026 waste-heat heat pumps, annual average COP to 70 °C forward / 35 °C return: 3.1 at 1 MW (source 13→8 °C), 3.6 at 3 MW (15→8 °C), 4.7 at 10 MW (27→15 °C); air-source 3 MW 2.8; CALIBRATION 13 Oct 2026 (calibrate.py; sources/13): full Lorenz with η 0.50 gives 4.56 for Odense (27→15 / 40→75 °C) against realised 4.5 (2020) and 4.2 all-in (2021–22, η 0.49 / 0.46); Telia Helsinki snapshot 3.9 at 20/32 → ~80 °C implies η 0.39; Université Laval ~7 at ~15 → 40 °C implies η 0.53; ReUseHeat design 3.6 and Bahnhof simulation 3.7 imply 0.37 / 0.43. The simplified form used in the first attempt (sink supply ÷ (sink supply − source out)) under-predicts at large lifts (3.0–3.6 for Odense) and is retired; observed: Meta Odense heat pumps 27 → 70 °C, COP 4.5 in 2020 (14,020 MWh electricity, 230 TJ heat) and about 3.9 combined 2022–24 (Fjernvarme Fyn annual reports); tool range 3.0–4.5

Sources: `bytes2heat` DENEFF / IER Stuttgart, Bytes2Heat Best-Practice-Übersicht (2023): Telehouse FRANKY 35 MW DC → Westville 2,400 MWh/yr, 2 × 320 kWth HPs, 30 → 70 °C, 15-yr contract; ReUseHeat Braunschweig 300 kWth, COP 3.6 design, 25/18 → 70/40 °C, 1,750 MWh/yr, €460k; HLRS 270 MWh/yr | `dea` Danish Energy Agency, Technology Data for Electricity and District Heating Production, data sheet updated August 2026 (2025 EUR): sheets 40 (compression heat pumps, waste heat 1/3/10 MW; air-source), 41 (electric boilers), 44 (gas boilers), 140 (pit storage) | `dfKatalog2022` Dansk Fjernvarme, Inspirationskatalog for store varmepumper 2022, pp.8–11 (Tietgenbyens Varmecentral): nominal 23.9 + 20.7 MW, nominal COP 4.4 / 4.9, source 27→15 °C, DH 40→75 °C, 5,000–7,000 full-load h, average COP 2021–22 4.2 'inklusive cirkulations- og distributionspumper', investment 215 M DKK, DH output ≈ 30 % above DC-side heat | `fjfAars2020` Fjernvarme Fyn, Årsberetning 2020, p.9 production table and p.13: 'Varmepumperne tilknyttet Facebook har forbrugt 14.020 MWh el svarende til COP 4,5'; 230 TJ heat (Facebook heat pumps only, first full year) | `lorenz` Lorenz COP, η 0.50–0.60 (Reinholdt et al. 2018; Pieper et al. 2020); air 25–35 °C, liquid 50–60 °C (Alissa; Wahlroos) (Formulas sheet) | `teliaHKI2024` Telia, Helsinki Data Center cooling options for AI/GPU loads (operator PDF), pp.4–6: 24 MW IT / 100 MW total; module 5 MW cooling → 6.5 MW heat; snapshot 29 May 2024: 5.65 MW to DH (4.11 waste heat + 1.45 added), COP 3.9, PUE 1.152, ERF 0.75; loop 20 / 32 °C, DH 75–85 °C | `ulavalCVD` Université Laval, Étude de cas – Centre de valorisation des données (Sept 2021) pp.9–10, 14–15, 24: Colosse heat recovery 1,150,000 kWh/yr to the campus chilled-water loop, water-to-water heat pumps to 40 °C, COP 'de l'ordre de 7', 130,000 m³ gas/yr saved, PUE 1.28 measured over a year | `blatchfordDG2025` City of Edmonton, District Energy Sharing System Multi-Unit Lots Design Guide v8 (Jun 2025), Table 8: ambient loop supply between 8 °C (winter) and 32 °C (summer), return 4 °C (winter); design ΔT 5 °C (s. 6.1). Vancouver NEU Connectivity Guidelines rev. 1 (May 2026): network supply minimum 65 °C, building return max 45 °C

### Heat captured at the boundary (E_reuse)  (`heat_captured`)

- Stage: What it gives off · unit: MWh/yr · level: Technical
- Inputs (formula arguments): heat_rejected, liquid_capture
- Fed by (diagram links): heat_rejected, liquid_capture · feeds: heat_delivered, erf, btes, ates, tes_volume, absorption
- Trust: own 90 / 100 · weakest input (chain) 50 / 100 · status: in hand (measurement boundary defined 13 Oct 2026)

```
heat_captured = f(heat_rejected, liquid_capture)
E_reuse = heat_rejected × liquid_capture, measured at the data-centre boundary by flow × ΔT before any heat pump (ISO/IEC 30134-6 cl.5–6; EU Reg. 2024/1364 Annex II 1(j))
```

Coefficients: This is the figure a data centre may report as reused energy and the numerator of ERF; the network-side figure after the heat pump (what Stockholm Exergi and Fjernvarme Fyn meter and bill, and what Danish tax law meters "ved udgang fra varmepumpe" with 3 × electricity deducted) is heat_delivered, not E_reuse. The two differ by COP ÷ (COP − 1) ≈ 1.3 at COP 4.2. Published "heat delivered" figures must be labelled by which boundary they use; where the source does not say, mark unknown.

Sources: `iso30134_6` ISO/IEC 30134-6:2021 Energy reuse factor (read in the BIS identical-adoption text, Oct 2023): ERF = E_Reuse ÷ E_DC, 0–1; only energy reused outside the data-centre boundary counts (cl.4); heat pumps outside the boundary 'shall not be included in the calculation' (cl.5); measured 'at the logical boundary of the data centre at the handoff point' by flow and temperature rise (cl.6); Annex A.1.5.3: heat-pump output is not reusable energy as it contains the pump's electricity | `euReg2024_1364` Commission Delegated Regulation (EU) 2024/1364 (14 Mar 2024) under EED 2023/1791: data centres ≥ 500 kW IT report E_DC, E_IT (EN 50600-4-2), waste heat reused E_REUSE per EN 50600-4-6 (outside the boundary only, at the handoff), average waste-heat temperature T_WH at the computer-room exchanger; Annex III ERF = E_REUSE ÷ E_DC | `skatOverskud` Skattestyrelsen, Juridisk vejledning E.A.4.6.10.2–3: electricity in heat pumps recovering surplus heat 'skal måles hver for sig'; the surplus-heat supplier is responsible for metering; heat measured at the heat-pump outlet with 3 × electricity deducted | `dfKatalog2022` Dansk Fjernvarme, Inspirationskatalog for store varmepumper 2022, pp.8–11 (Tietgenbyens Varmecentral): nominal 23.9 + 20.7 MW, nominal COP 4.4 / 4.9, source 27→15 °C, DH 40→75 °C, 5,000–7,000 full-load h, average COP 2021–22 4.2 'inklusive cirkulations- og distributionspumper', investment 215 M DKK, DH output ≈ 30 % above DC-side heat | `exergiAR2023` Stockholm Exergi, Års- och hållbarhetsredovisning 2023 p.20 (117 GWh recovered from Stockholm Data Parks and Öppen Fjärrvärme in 2023); Covenant of Mayors case study 2023 (~EUR 190,000 per year per MW delivered); Energiforsk 2020:681 pp.12–17 (75 GWh from data halls 2018; Bahnhof Pionen 600 kW at 68 °C; meter owned by Exergi; hourly avoided-cost price)

### Vibration to neighbours  (`vibration_rank`)

- Stage: What it gives off · unit: ranked: slab on grade → long-span upper floor · level: Everyday
- Inputs (formula arguments): start_case, host_building
- Fed by (diagram links): start_case, host_building · feeds: vibration_target
- Trust: own 40 / 100 · weakest input (chain) 40 / 100 · status: ranked, no dB values

```
vibration_rank = f(start_case, host_building)
qualitative rank of how hard plant vibration is to isolate at each position in the building
```

Coefficients: NBC/VBBL apparent STC 47 between dwellings and other spaces (STC 55 by elevator shafts) — airborne only, no equipment-vibration limit; isolator deflection rises with floor span (US government spec citing ASHRAE); ASHRAE Applications ch. 49 not read

Sources: `src23` Beyond Data research note 23: fuel and vibration (sources/23_fuel_and_vibration.md)

### Heat rejected  (`heat_rejected`)

- Stage: What it gives off · unit: MWh/yr · level: Civic
- Inputs (formula arguments): it_load_actual, pue
- Fed by (diagram links): it_load_actual, pue · feeds: heat_captured, erf, evaporation, borefield, heat_flux_site, heat_plume_dT, condensate
- Trust: own 80 / 100 · weakest input (chain) 50 / 100 · status: in hand

```
heat_rejected = f(it_load_actual, pue)
Q ≈ E_IT + electrical losses; idle floor 36% of max
```

Coefficients: heat ≈ electricity drawn (Barroso); idle 36% (2023)

Sources: `heatPhys` Heat ≈ electricity drawn; Q = V × 1.16 × ΔT (Green Grid WP29); ISO/IEC 30134-6 ERF (Formulas sheet) | `lbnl2024` Shehabi et al., 2024 United States Data Center Energy Usage Report, LBNL-2001637, Lawrence Berkeley National Laboratory, Dec 2024

### Solar on the data centre roof  (`pv_roof`)

- Stage: What it gives off · unit: kWp; MWh/yr · level: Civic
- Inputs (formula arguments): massing, plant_schedule
- Fed by (diagram links): massing, plant_schedule · feeds: pv_share, pv_cost, pv_lcoe
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: in hand (NRCan municipal values, 15 Oct 2026)

```
pv_roof = f(massing, plant_schedule)
kWp = panel area × 0.16–0.20 kWp/m²; panel area = 12 m² × the number of 6 × 2 m panel rows that fit on the roof outside the plant and its clearances (1 m from the roof edge, an assumption; rows 0.5 m apart along, 1.5 m across); MWh = kWp × yield (horizontal to latitude tilt)
```

Coefficients: 18 Oct 2026 (sweep M102): the register now matches the layout the Solar card uses (addons.js pvLayout); the earlier roof area × 0.66 × (1 − plant share) × 0.70 formula is retired. yield, annual kWh/kWp (NRCan municipal values, ±10%, losses in a 0.75 performance ratio): Vancouver 892 horizontal to 1007 at latitude tilt; Edmonton 944 to 1244. A flat-roof array at about 15° tilt lies between the two, so the tool uses horizontal as the low end and latitude tilt as the high end. Edmonton yields about 6–24% more than Vancouver per kWp. Module density 0.16 kWp/m² (2014 median) to 0.20 (current) (NREL); module cover 0.70 of a flat roof at 15° tilt; 66% of large roofs suitable (NREL 2016); roof share taken by plant from the cooling module

Sources: `nrcanPVmunic` NRCan, Photovoltaic potential and solar resource maps of Canada | `nrel_rooftop2016` Gagnon et al., Rooftop Solar PV Technical Potential in the United States, NREL/TP-6A20-65298 (2016) | `nrel_bench2023` Ramasamy et al., U.S. Solar PV System and Energy Storage Cost Benchmarks Q1 2023, NREL/TP-7A40-87303 | `vanRoofBulletin2022` City of Vancouver, Bulletin: Roof-mounted energy technologies and green roofs (effective 3 Feb 2009, amended 14 Nov 2022): solar panels may receive "minor additional height" at the Director of Planning's discretion (Zoning and Development By-law s. 10.1.1(d)); written rationale and drawings; no figure or edge setback stated | `edmZB510` Edmonton Zoning Bylaw 20001 s. 5.10 cl. 11 (read by Claude from the bylaw PDF, data/raw/edm/bylaw): rooftop collectors may project 1.5 m from the roof and up to 1.5 m above the maximum height "in a residential Zone"; must not extend beyond the eave or roof edge; wall-mounted 1.5 m into a setback, 0.6 m from the lot line. Non-residential zones: no projection limit stated

### Generator carbon  (`generator_co2`)

- Stage: What it gives off · unit: tCO2/yr · level: Civic
- Inputs (formula arguments): backup_hours
- Fed by (diagram links): backup_hours · feeds: genset_test
- Trust: own 90 / 100 · weakest input (chain) 90 / 100 · status: in hand

```
generator_co2 = f(backup_hours)
litres × 2.681 kg CO2/L
```

Coefficients: testing hours (Manor Farm 564 h/yr)

Sources: `eccc` ECCC Canadian Climate Normals 1991–2020, station data CSV (BC, AB), climate.weather.gc.ca

### Generator NOx and PM  (`generator_nox_pm`)

- Stage: What it gives off · unit: kg/yr · level: Everyday
- Inputs (formula arguments): backup_hours
- Fed by (diagram links): backup_hours · feeds: genset_test
- Trust: own 80 / 100 · weakest input (chain) 80 / 100 · status: in hand

```
generator_nox_pm = f(backup_hours)
AP-42 factor × rated hp × hours
```

Coefficients: NOx 0.024 lb/hp·h uncontrolled; Edmonton: emergency standby generators exempt from an EPEA approval (AUC 27938-D01-2023 para 10, reported; regulation clause not read); Edmonton: emergency standby generators exempt from an EPEA approval (AUC 27938-D01-2023 para 10, reported; regulation clause not read); Edmonton: emergency standby generators exempt from an EPEA approval (AUC 27938-D01-2023 para 10, reported; regulation clause not read); Edmonton: emergency standby generators exempt from an EPEA approval (AUC 27938-D01-2023 para 10, reported; regulation clause not read); Edmonton: emergency standby generators exempt from an EPEA approval (AUC 27938-D01-2023 para 10, reported; regulation clause not read); Edmonton: emergency standby generators exempt from an EPEA approval (AUC 27938-D01-2023 para 10, reported; regulation clause not read); Edmonton: emergency standby generators exempt from an EPEA approval (AUC 27938-D01-2023 para 10, reported; regulation clause not read); Edmonton: emergency standby generators exempt from an EPEA approval (AUC 27938-D01-2023 para 10, reported; regulation clause not read); Edmonton: emergency standby generators exempt from an EPEA approval (AUC 27938-D01-2023 para 10, reported; regulation clause not read); Edmonton: emergency standby generators exempt from an EPEA approval (AUC 27938-D01-2023 para 10, reported; regulation clause not read); Edmonton: emergency standby generators exempt from an EPEA approval (AUC 27938-D01-2023 para 10, reported; regulation clause not read); Edmonton: emergency standby generators exempt from an EPEA approval (AUC 27938-D01-2023 para 10, reported; regulation clause not read); Edmonton: emergency standby generators exempt from an EPEA approval (AUC 27938-D01-2023 para 10, reported; regulation clause not read); Edmonton: emergency standby generators exempt from an EPEA approval (AUC 27938-D01-2023 para 10, reported; regulation clause not read)

Sources: `eccc` ECCC Canadian Climate Normals 1991–2020, station data CSV (BC, AB), climate.weather.gc.ca | `mvBylaw1329` Metro Vancouver Non-Road Diesel Engine Emission Regulation Bylaw No. 1329, 2021: applies to non-road diesel engines of 25 hp or more, including stationary engines; emergency engines (incl. emergency generators) are exempt from Parts 3–6 and 9 (registration, fees, tier rules) but must be maintained to manufacturer procedures, keep exhaust away from building openings and air intakes, and keep records; no limit on testing hours. Bylaw 1082 has no engine-specific threshold | `abDCenv2026` Government of Alberta, Data Centres in Alberta: EPA regulatory role and environmental requirements (20 Jul 2026): an EPEA approval is required for a larger combustion power plant or a backup power generation system over 50 MW, with emission limits set case by case; Alberta reviews wastewater, stormwater and cooling-water blowdown. Federal Multi-Sector Air Pollutants Regulations cover gaseous-fuel spark-ignition engines only, not diesel

### Solar on the facade  (`pv_facade`)

- Stage: What it gives off · unit: MWh/yr · level: Civic
- Inputs (formula arguments): massing
- Fed by (diagram links): massing · feeds: pv_share
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: in hand (NRCan vertical values, 15 Oct 2026)

```
pv_facade = f(massing)
MWh = south facade area × module density × vertical yield
```

Coefficients: vertical (south-facing, 90°) yield, annual kWh/kWp: Vancouver 716, Edmonton 989 (NRCan municipal values). Vertical gives 71% of the latitude-tilt yield in Vancouver and 80% in Edmonton; in Edmonton a south wall yields more than a flat roof (989 vs 944), because of low winter sun. Replaces the interim 0.4–0.6 factor. No Canadian BIPV cost found

Sources: `nrcanPVmunic` NRCan, Photovoltaic potential and solar resource maps of Canada | `ieapvps_bipv` IEA PVPS Task 15 summary of Yang et al. (2026), BIPV yield and economic feasibility, Energy and Buildings, doi:10.1016/j.enbuild.2026.118031

### Work created  (`jobs`)

- Stage: What it gives off · unit: FTE · level: Everyday
- Inputs (formula arguments): floor_area
- Fed by (diagram links): floor_area · feeds: —
- Trust: own 50 / 100 · weakest input (chain) 50 / 100 · status: range from two planning records (50); applicant figures are claims

```
jobs = f(floor_area)
floor area ÷ 154–465 m² per operating job (range); construction peak separately
```

Coefficients: Ark UP4, Hillingdon officer report (Planning Committee 4 Sep 2025, read 19 Oct 2026): development of 15,410 m² GIA (data centre, energy centre, ancillary building); para 7.3 cites 18,898 m² "floorspace" without a basis, so 15,410 is used; applicant estimate 2.29 technical + 3.45 client staff per MW(IT) = 161 jobs at 28 MW, which the applicant itself "adjusts … down to between 50 and 100" (para 7.6, applicant claim) → 154–308 m² per job, 1.8–3.6 jobs/MW; JLARC 2024 ≈ 465 m² (5,000 ft²) per worker; no Canadian or peer-reviewed figure

Sources: `jlarc2024` Virginia JLARC Report 598, Data Centers in Virginia (Dec 2024): building 'usually takes about 12 to 18 months'; campus 'five or more years'; ~50 full-time workers per 250,000 sq ft ('one employee per 5,000 square feet'), about half contract; ~1,500 workers at peak construction; grid additions 12–36 months longer; 'One-third of data centers are currently located near residential areas'; residential bills +$14–37/month

### Who the computing serves  (`computing_served`)

- Stage: What it gives off · unit: text · level: Civic
- Inputs (formula arguments): interconnection
- Fed by (diagram links): interconnection · feeds: —
- Trust: own 80 / 100 · weakest input (chain) 50 / 100 · status: read

```
computing_served = f(interconnection)
up to four sourced statements, no score: federal data-residency rule; provincial rule; the local internet exchange and its size; residency ≠ sovereignty
```

Coefficients: Federal: Protected B and above stored in Canada; BC: data residency removed 2021, sensitive data abroad needs an assessment; Alberta: no rule found; Vancouver exchanges 158 participants across three, Edmonton YEGIX 9

Sources: `gcDataResidency` Government of Canada, Direction on the secure use of commercial cloud services / electronic data residency: Protected B, Protected C and Classified data stored in Canada (or GC premises abroad); GC white paper: 'Data residency does not mitigate against the application of foreign laws' | `bcFoippaAbroad` BC FOIPPA manual, disclosure outside Canada: the 2021 amendment removed the data-residency rule; sensitive personal information stored outside Canada needs an assessment | `isocPulseIXP` Internet Society Pulse, IXP tracker, Canada: Vancouver VANIX 78, UNM-Exch Canada-West 64, CSIX 16 participants; Edmonton YEGIX 9; Calgary YYCIX 91 (operator-reported)

### Stormwater held on the lot  (`stormwater_volume`)

- Stage: What it gives off · unit: m³ · level: Civic
- Inputs (formula arguments): envelope
- Fed by (diagram links): envelope · feeds: —
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: read 19 Oct 2026

```
stormwater_volume = f(envelope)
Vancouver: small site a 3,400–7,200 L tank; otherwise stage 1 = 15 mm × non-landscaped area, released at 5 L/s/ha, then 25 L/s/ha. Edmonton (lots over 0.16 ha): 375 m³/ha for the 100-year storm at C = 0.90 (507 for 200-year), released at 35 L/s/ha
```

Coefficients: the lot area is used as the non-landscaped area (an upper bound); Vancouver's full engineered volume (Modified Rational Method, 2100 IDF, 10-year) is not computed; extra volume held for a neighbour or the street costs as a tank ($667–2,955 per m³, register rainwater); no dollar value of avoided sewer upgrades found in either city

Sources: `vbbl2025_2425` Vancouver Building By-law 2025, Book II, Div. B, Art. 2.4.2.5 (By-law 14343 as amended by 14488, effective 1 Jan 2026), p. 26–28: all buildings manage rainwater on site; small sites (≤ 1,000 m² and FSR ≤ 1.0) a 3,400–7,200 L tank; otherwise released at no more than 5 L/s per hectare for the first 15 mm over the non-landscaped site, then 25 L/s per hectare (2100 IDF, 10-year) | `epcorStorm` EPCOR, Guidelines for on-site stormwater management (undated): control required for lots over 0.16 ha; release 0.035 m³/s per ha; storage for C = 0.90: 100 m³/ha (5-year), 375 (100-year), 507 (200-year), Exhibit 2 | `edmBylaw18100` City of Edmonton Bylaw 18100 (EPCOR Drainage Services), Sch. 2 Art. 6.1: owners control the release of stormwater when directed | `vanRainPage` City of Vancouver, Rainwater management (to Sep 2025): 192 developments, 66 ha managed, about 7,400 L/s peak reduction; purpose to 'relieve sewer system capacity constraints' (City claim) | `vanISMP2014` City of Vancouver, Integrated Stormwater Management BMP Toolkit Vol. II (2014), p. II-18: about $10,000 for a 15 m³ below-ground tank (Class D ±30%) | `epaRain2013` US EPA 841-R-13-002 (2013), Rainwater harvesting: cistern US$1.50–3.00 per gallon; pumps, controls, treatment US$2–5 per gallon (p. 24)

### Electricity to treat reused water  (`treatment_energy`)

- Stage: What it gives off · unit: kWh/yr · level: Technical
- Inputs (formula arguments): reclaimed_makeup, greywater_neighbours
- Fed by (diagram links): reclaimed_makeup, greywater_neighbours · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 45 / 100 · status: in hand (US values)

```
treatment_energy = f(reclaimed_makeup, greywater_neighbours)
E = m³ treated × e
```

Coefficients: e = 0.75–1.1 kWh/m³ greywater membrane bioreactor; 0.94–1.28 mixed wastewater (Arden et al. 2021, US EPA authors); ~4.6 kWh/m³ in one small blackwater plant (university report, low confidence); viable only where water + sewer cost ≥ US$2.38/m³ (greywater) or US$1.85/m³ (mixed) (Arden 2021, US 2020 dollars)

Sources: `arden2021` Arden et al., Onsite Non-potable Reuse for Large Buildings, Water Research 191:116635 (2021)

### Surveillance as experienced  (`watched_area`)

- Stage: What it gives off · unit: m; count · level: Everyday
- Inputs (formula arguments): visibility
- Fed by (diagram links): visibility · feeds: —
- Trust: own 80 / 100 · weakest input (chain) 70 / 100 · status: observation; never a guide to coverage gaps — only what a passer-by sees and how it feels

```
watched_area = f(visibility)
visible cameras and signs; indicative watched area past the lot line (camera position and aim); first-person account labelled as one person's
```

Coefficients: e.g. 55 E 7th: camera 'almost on the public edge' of the front door; 111 E 5th: dome under soffit, mast camera at roof corner, '24 hour video surveillance' signs in the lane (J.B., Oct 2026)

Sources: `fieldJB` J.B. site visits and photographs: Vancouver 8 and 11 Oct 2026 (55 E 7th, 111 E 5th, 333+369 Terminal), Edmonton Oct 2026 (Internet Centre, Qu EDM2, Kyndryl Acheson)

### Who controls the computing  (`workload_control`)

- Stage: What it gives off · unit: operator · tenants · mixed · level: Civic
- Inputs (formula arguments): it_load_claim
- Fed by (diagram links): it_load_claim · feeds: —
- Trust: own 50 / 100 · weakest input (chain) 50 / 100 · status: logic defined; per-site model from operator pages; Crozier & Liska 2025: no published flexible share — inference is inflexible, checkpointed training can pause

```
workload_control = f(it_load_claim)
flexible load is offered only by whoever runs the workloads: a single-owner or hyperscale operator can shift its own computing; in colocation the building operator controls power and cooling, not the tenants' computing, so flexibility needs each tenant's agreement
```

Coefficients: business model from operator pages (claims) and permits; the learning-series EV and workload papers are models of single-operator fleets

Sources: `crozier2025` Crozier & Liska 2025, Current Sustainable/Renewable Energy Reports 12(1) art. 12, open-access review: no single flexible share; price signals alone do not create flexibility; UPS rarely offered; inference inflexible; checkpointed training can pause (checked by the atlas chat 15 Oct)

### Low-frequency flag  (`lf_flag`)

- Stage: What it gives off · unit: — · level: Everyday
- Inputs (formula arguments): noise_level
- Fed by (diagram links): noise_level · feeds: —
- Trust: own 90 / 100 · weakest input (chain) 50 / 100 · status: in hand; spectra available from Daikin AGZ (octave bands) and Olds NIA

```
lf_flag = f(noise_level)
dBC − dBA ≥ 20 dB and tone 20–250 Hz → +5 dBA
```

Coefficients: AUC Rule 012 s.4.5; NANR45 curve

Sources: `rule012` AUC Rule 012: Noise Control, consolidated 30 Sep 2024 (74 pp.), Table 1 p.3; Bulletin 2026-03 (17 Apr 2026) | `bylaw6555` Vancouver By-law 6555 (cons. 14 Jul 2026): continuous >3 min in 15; intermediate→quiet 60 day / 50 night; dBC only for amplified music

### Fuel kept on site  (`fuel_on_site`)

- Stage: What it gives off · unit: L · level: Everyday
- Inputs (formula arguments): start_case, backup_hours
- Fed by (diagram links): start_case, backup_hours · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 60 / 100 · status: code limits sourced; fuel rate is a manufacturer claim

```
fuel_on_site = f(start_case, backup_hours)
generator capacity × runtime hours × fuel per kWh, against the limit per storage room for the storey it sits on
```

Coefficients: NFC 2020 Table 4.3.13.4.-B (Class II): first storey 200 000 L per room; basement or above the first storey 20 000 L (tanks > 2 500 L) or 45 000 L (tanks > 20 000 L); tanks > 230 L in a dedicated 2 h room; fuel use ≈0.263 L/kWh (one Cat model, manufacturer claim) ≈6.3 m³ per MW per 24 h; Uptime ≥ 12 h on site; whether data-centre standby counts as "emergency generators" is for the authority to decide

Sources: `nfc2020_4313` NRC, National Fire Code of Canada 2020, Div. B, 4.3.13–4.3.14 and Table 4.3.13.4.-B | `cat3516c` Caterpillar 3516C 2,500 kW standby generator set specification (manufacturer claim) | `src16` Beyond Data research note 16: data centre components and sizing (sources/16_dc_components_sizing.md) | `src23` Beyond Data research note 23: fuel and vibration (sources/23_fuel_and_vibration.md) | `vanFire14419` City of Vancouver Fire By-law No. 14419 (in force 22 Jul 2025; replaces 12472), adopts the 2024 BC Fire Code; no added indoor quantity limits for flammable or combustible liquids; tank changes only (4.3.1.7, 4.3.16.1) and permits from the Fire Chief to install, remove or abandon any above- or underground storage tank (Div. C 1.2.1.5(2)) | `nfcAB2023_4313` National Fire Code – 2023 Alberta Edition (J.B. download 16 Oct 2026), Tables 4.3.13.4.-A and -B read by Claude: identical to NFC 2020

### Evaporative water  (`evaporation`)

- Stage: What it gives off · unit: L/yr · level: Everyday
- Inputs (formula arguments): heat_rejected, cooling_type
- Fed by (diagram links): heat_rejected, cooling_type · feeds: blowdown, reclaimed_makeup
- Trust: own 100 / 100 · weakest input (chain) 50 / 100 · status: in hand

```
evaporation = f(heat_rejected, cooling_type)
E ≤ Q_rejected ÷ h_fg (h_fg ≈ 2,400 kJ/kg; ≤ ~1.5 L/kWh)
```

Sources: `femp` US DOE FEMP BMP #10: evaporation ≤ Q ÷ h_fg (~1.5 L/kWh); blowdown = E ÷ (C−1); WUE (ISO 30134-9) (Formulas sheet) | `pspcLegionella` PSPC, Legionella control, Chapter 3 (federal property): "minimum separation distance shall be 10 metres between the cooling tower and any air intake"; drift eliminators | `vanCTseminar2021` City of Vancouver, operating permits seminar slides (Nov 2021): cooling towers 7.6 m from outdoor air intakes, 3 m from doors, operable windows and occupiable outdoor space, 2.15 m above sidewalks. confirmed against VBBL Art. 6.3.2.15 (see vbbl2025_63215) | `vbbl2025_63215` VBBL 2025 Book I, Div. B Art. 6.3.2.15 (J.B. download 16 Oct 2026; read by Claude): evaporative heat rejection discharge "away from the building … not less than a) 2.15 m above sidewalks and driveways, b) 7.6 m from outdoor air intakes, c) 3 m horizontally or vertically from exterior doors and operable windows, and d) 3 m … from occupiable outdoor spaces"; drift eliminator; drains and blow-downs to the building drainage system (Clause 2.4.2.1.(1)(e), Book II); operating permit per Book II Art. 2.2.11.6. NFPA 855 is not among the NFPA standards Book I cites | `abAIDCstrategy2024` Government of Alberta, Alberta's AI Data Centre Strategy: Powering the future of artificial intelligence (Technology and Innovation, Dec 2024, ISBN 978-1-4601-6171-5; J.B. upload 16 Oct 2026): three pillars

### Blowdown and make-up  (`blowdown`)

- Stage: What it gives off · unit: L/yr · level: Technical
- Inputs (formula arguments): evaporation
- Fed by (diagram links): evaporation · feeds: wue, reclaimed_makeup, blowdown_recovery
- Trust: own 100 / 100 · weakest input (chain) 50 / 100 · status: in hand

```
blowdown = f(evaporation)
B = E ÷ (C − 1); make-up = E + B
```

Coefficients: C cycles of concentration

Sources: `femp` US DOE FEMP BMP #10: evaporation ≤ Q ÷ h_fg (~1.5 L/kWh); blowdown = E ÷ (C−1); WUE (ISO 30134-9) (Formulas sheet) | `waterHardness2026` Treated drinking-water hardness (mg/L as CaCO3): EPCOR Edmonton 2021 Rossdale avg 170 (137–203), E.L. Smith 169 (143–201); Jan–May 2026 both plants 177.8 (146–204); Metro Vancouver 2025 annual report, treated: Capilano 20.5, Seymour 20.2, Coquitlam 2.4

### Grid carbon  (`grid_co2`)

- Stage: What it gives off · unit: tCO2e/yr · level: Everyday
- Inputs (formula arguments): it_load_actual, hp_electricity
- Fed by (diagram links): it_load_actual, hp_electricity · feeds: displaced_source
- Trust: own 90 / 100 · weakest input (chain) 50 / 100 · status: average intensities confirmed from the national inventory (both provinces, same basis, 1990–2024); Alberta displacement schedule from the regulator; BC marginal factor remains unpublished

```
grid_co2 = f(it_load_actual, hp_electricity)
E × EF_average and E × EF_long-run marginal, both reported
```

Coefficients: 18 Oct 2026 (J.B., item 6): displaced side shown per MWh of heat — gas boiler ≈ 218 kg CO2e (marketable natural gas, commercial/institutional: CO2 1,966 BC / 1,962 AB g/m³, CH4 0.037, N2O 0.035 g/m³; AR5 GWPs 28 / 265; HHV 38.39 MJ/m³ → 51.5 kg/GJ; ÷ 0.85) against heat-pump electricity = grid ÷ COP 4.5–3.0 (BC 4–6 kg, AB 77–115 kg); provincial average consumption intensity, not marginal; the data centre's own cooling electricity and upstream gas not counted. The word 'lower-carbon' is no longer used. NIR 2026 Annex 7 (same basis for both provinces, main-activity producers): Alberta generation intensity 334.8 g CO2e/kWh in 2024 (preliminary), consumption intensity 346.1 — down from 506.5 / 521.5 in 2021 and 947.7 / 1,030.8 in 1990; BC generation 16.7, consumption 18.1 g/kWh in 2024 (15.5 / 16.9 in 2021); Canada 102.2 / 110.6; earlier register values (BC 22.8 consumption-based with imports, 2025; AB 335 generation, 2024) now superseded by the NIR series for citation; Alberta Electricity Grid Displacement Factor, handbook v3.3 (Aug 2026) Table 1, vintage schedule: 0.4901 (2024), 0.4602 (2025), 0.4303 (2026), 0.4005 (2027), 0.3706 (2028), 0.3407 (2029) tCO2e/MWh for displacement by renewables; with line loss (increased or reduced grid use): 0.5226, 0.4907, 0.4588, 0.4271, 0.3952, 0.3633; 2030 onward aligns with the High Performance Benchmark; projects before 2024 use 0.52 / 0.55 (Table 2, 2018–2020 data); identical in v3.1 (Feb 2023) and v3.2 (Aug 2025); natural-gas combustion (Table 5, commercial/institutional): 1,962 g CO2 /m³ + 0.037 g CH4 + 0.035 g N2O; BC publishes no marginal factor; 13 Oct 2026 deep dive: no official BC marginal or incremental factor exists (BC 2025 methodology is consumption-based, net-import); BASIS used across the tool (proposed 15 Oct by Claude and the atlas chat, J.B. to confirm): consumption intensity, since the tool counts electricity used — BC 18.1, Alberta 346.1 g CO2e/kWh (NIR 2026, 2024); average factors, BC marginal factor unpublished

Sources: `gridBC` BC 2025 consumption-based grid factor 22.8 tCO2e/GWh (2024: 9.9) | `gridAB` Alberta 335 g CO2e/kWh (2024, generation-based), citing NIR 2026 Table A7-10 | `abEGDF` Alberta Environment and Protected Areas, Carbon Offset Emission Factors Handbook v3.1 (Feb 2023), v3.2 (Aug 2025), v3.3 (Aug 2026), Tables 1, 2, 5 | `nir2026` ECCC, National Inventory Report 1990–2024 (2026 submission), Part 1 (data/NIR_2026_Part1.pdf) and Annex 7 electricity-intensity workbook, Tables A7-1 (Canada), A7-10 (Alberta), A7-11 (British Columbia) | `ecccEF2026` ECCC, Emission factors and reference values, v4.0, Sep 2026 (from NIR 1990-2024, Tables A6.1-1, A6.1-3; HHV Table 8, 38.39 MJ/m³) | `abEF2026` Alberta Environment and Protected Areas, Carbon Offset Emission Factors Handbook v3.3, Aug 2026, Table 5 (natural gas, commercial/institutional: CO2 1,962, CH4 0.037, N2O 0.035 g/m³)

### Heat available after heat pump  (`heat_delivered`)

- Stage: What it gives off · unit: MWh/yr · level: Civic
- Inputs (formula arguments): heat_captured, cop
- Fed by (diagram links): heat_captured, cop · feeds: hp_electricity, homes_heated, greenhouse_area, aquaculture_tonnes, algae_kg, stored_heat, price_floor, lcoh, hourly_overlap, snowmelt_area
- Trust: own 70 / 100 · weakest input (chain) 50 / 100 · status: calibrated: receiver-limited in 4 of 5 built cases

```
heat_delivered = f(heat_captured, cop)
Q_out = E_reuse × COP ÷ (COP − 1) — network-side heat after the heat pump; the match takes min(Q_out, receiver demand)
```

Coefficients: CALIBRATION: delivered heat is receiver-limited, not source-limited, in every built case with a large data centre — Mäntsälä 20–30 GWh/yr from a ~15 MW DC (15–23 % of nameplate-continuous), Westville 2.4 GWh/yr PLANNED from a 35 MW DC (1 %; operation not yet sourced), TELUS Garden 4.9 of 12.3 GWh available (40 %; 2013 design forecast, Order C-1-13); only Heerlen (520 kW DC into a 5GDHC network) ran source-limited at 54 %. Report this quantity as heat AVAILABLE after the heat pump; the match quantity is min(available, receiver demand); Odense DH output ≈ 1.3 × DC-side heat at COP 4.2 (Inspirationskatalog) matches COP ÷ (COP − 1)

Sources: `bcucC113` BCUC Order C-1-13 with Reasons (Feb 2013), FortisBC Alternative Energy Services, TELUS Garden thermal energy system, pp.14–19: 'A year round base load of 1,400 kW of heat is available on a 24/7 basis' from the TELUS data centre; development load 5,194 MWh heating / 4,591 MWh cooling; 94 % of heating from recovery, steam peaking; TES capital $7.9 M, waste-heat option $3.2 M vs geo-exchange $6.8 M; 'free waste heat supply from the TELUS Data Centre'; customer rate BC Hydro residential + 5–10 % (G-155-12: $0.105–0.126/kWh 2014–18); annual actual-load report rescinded by G-2-15 | `bytes2heat` DENEFF / IER Stuttgart, Bytes2Heat Best-Practice-Übersicht (2023): Telehouse FRANKY 35 MW DC → Westville 2,400 MWh/yr, 2 × 320 kWth HPs, 30 → 70 °C, 15-yr contract; ReUseHeat Braunschweig 300 kWth, COP 3.6 design, 25/18 → 70/40 °C, 1,750 MWh/yr, €460k; HLRS 270 MWh/yr | `dfKatalog2022` Dansk Fjernvarme, Inspirationskatalog for store varmepumper 2022, pp.8–11 (Tietgenbyens Varmecentral): nominal 23.9 + 20.7 MW, nominal COP 4.4 / 4.9, source 27→15 °C, DH 40→75 °C, 5,000–7,000 full-load h, average COP 2021–22 4.2 'inklusive cirkulations- og distributionspumper', investment 215 M DKK, DH output ≈ 30 % above DC-side heat | `lorenz` Lorenz COP, η 0.50–0.60 (Reinholdt et al. 2018; Pieper et al. 2020); air 25–35 °C, liquid 50–60 °C (Alissa; Wahlroos) (Formulas sheet) | `nivosMantsala` Nivos (Mäntsälä utility) articles 2016/2019 and 9 Mar 2022; Sitra case 18 Oct 2019; NIB loan page 21 Oct 2019: DC power demand ~15 MW (phase 1), heat recovery nominal ~6 MW, 4.0 MW heat pump (2015), 20 GWh delivered 2018 = 54 % of town demand, 30 GWh/yr programme figure, exhaust ~37 °C → 80 °C, gas −70 %, DH price −11 % | `rvoCases2018` RVO / Nederland ICT, Restwarmte uit datacenters – succesvoorbeelden (Feb 2018) pp.12–15 and Berenschot (Mar 2018): APG Heerlen 520 kW DC, 8,900 GJ extracted, Mijnwater network 16/28 °C, ≈€1.5 M; Eindhoven and Hengelo kW-scale gas heat pumps to 55 °C | `bartlett2025` Bartlett, C. (2025), Waste Heat Recovery and Utilization Potential from Data Centres in Alberta, MSc research project (Sustainable Energy Development), University of Calgary, supervisor G. Doluweera (J.B. upload 16 Oct 2026): modelled, not built | `abAIDCstrategy2024` Government of Alberta, Alberta's AI Data Centre Strategy: Powering the future of artificial intelligence (Technology and Innovation, Dec 2024, ISBN 978-1-4601-6171-5; J.B. upload 16 Oct 2026): three pillars

### Heat-pump electricity  (`hp_electricity`)

- Stage: What it gives off · unit: MWh/yr · level: Technical
- Inputs (formula arguments): heat_delivered, cop
- Fed by (diagram links): heat_delivered, cop · feeds: grid_co2, lcoh, displaced_source
- Trust: own 100 / 100 · weakest input (chain) 50 / 100 · status: in hand

```
hp_electricity = f(heat_delivered, cop)
Q_out ÷ COP
```

Coefficients: allocation rule stated; show two rules

Sources: `heatPhys` Heat ≈ electricity drawn; Q = V × 1.16 × ΔT (Green Grid WP29); ISO/IEC 30134-6 ERF (Formulas sheet)

### Generator emission rate  (`genset_emission_rate`)

- Stage: What it gives off · unit: g/s · level: Technical
- Inputs (formula arguments): genset_test
- Fed by (diagram links): genset_test · feeds: air_screen_1h, air_permit_trigger
- Trust: own 65 / 100 · weakest input (chain) 65 / 100 · status: arithmetic on the genset_test factor

```
genset_emission_rate = f(genset_test)
Q = emission factor (g/kWh) × generator kWe × load ÷ 3,600
```

Coefficients: NOx 14.6 g/kWh uncontrolled (AP-42 upper bound, as genset_test); check: 2,000 kWe at full load → 8.1 g/s (29.2 kg/h); generic equipment only

Sources: `ap42_34` US EPA, AP-42 5th ed., Vol. I, §3.4, Table 3.4-1 (Apr 2025)

### Air at a neighbour (screening)  (`air_screen_1h`)

- Stage: What it gives off · unit: µg/m³ · level: Technical
- Inputs (formula arguments): genset_emission_rate
- Fed by (diagram links): genset_emission_rate · feeds: no2_at_receptor, air_vs_objective
- Trust: own 60 / 100 · weakest input (chain) 60 / 100 · status: derived with stated assumptions

```
air_screen_1h = f(genset_emission_rate)
C(1 h) = 10⁶ × Q ÷ (π·u·σy·σz) × exp(−H² ÷ 2σz²); urban dispersion coefficients; u = 1 m/s, neutral class as a stated worst-case pick; preferred: AERSCREEN tables precomputed for three generic stacks
```

Coefficients: AERSCREEN is the screening tool in both provinces ("preferred" in BC, "recommended" in Alberta); label: screening — a regulator would require AERSCREEN or refined modelling; dispersion coefficient table to be checked against the final ISC3 edition

Sources: `bcDispersion` BC Ministry of Environment, Guidelines for Air Quality Dispersion Modelling in BC: AERSCREEN 'preferred' for screening | `abModelGuideline` Alberta Environment and Protected Areas, Air Quality Model Guideline (2021): AERSCREEN 'recommended'; averaging-time Eq. 1.1233 × hours^-0.2906

### Nitrogen dioxide at a neighbour  (`no2_at_receptor`)

- Stage: What it gives off · unit: µg/m³ · level: Technical
- Inputs (formula arguments): air_screen_1h
- Fed by (diagram links): air_screen_1h · feeds: air_vs_objective
- Trust: own 90 / 100 · weakest input (chain) 60 / 100 · status: rule read (BC); Alberta numbers not read

```
no2_at_receptor = f(air_screen_1h)
NO2 = NOx at the receptor × conversion ratio: 1.0 (Tier 1) to the ARM2 bounds 0.9–0.2; diesel in-stack ratio 0.083
```

Coefficients: BC NO2 guidance (2022); Edmonton uses Tier 1 only until Alberta Model Guideline s. 7.3 is read

Sources: `bcNO2Guidance` BC Ministry of Environment, Modelling guidance for NO2 (July 2022): Tier 1 100% conversion; ARM2 bounds 0.2–0.9; diesel in-stack NO2/NOx 0.083

### Energy reuse factor  (`erf`)

- Stage: What it gives off · unit: — · level: Technical
- Inputs (formula arguments): heat_captured, heat_rejected
- Fed by (diagram links): heat_captured, heat_rejected · feeds: —
- Trust: own 90 / 100 · weakest input (chain) 50 / 100 · status: in hand

```
erf = f(heat_captured, heat_rejected)
ERF = E_reuse ÷ E_DC (ISO/IEC 30134-6; EU 2024/1364 Annex III): heat captured at the boundary ÷ total data-centre energy (IT × PUE); 0–1; heat-pump uplift and heat-pump electricity excluded
```

Coefficients: EnEfG benchmark 10% → 20%; first attempt used heat_delivered ÷ IT energy — corrected 13 Oct 2026: Telia Helsinki reports ERF 0.75 (operator claim; basis not stated in the PDF); German HPC centres 0.01–0.20 (arXiv 2411.16204, non-ISO denominator); NREL RSF reports ERE 0.91 "calculated, not measured"

Sources: `euReg2024_1364` Commission Delegated Regulation (EU) 2024/1364 (14 Mar 2024) under EED 2023/1791: data centres ≥ 500 kW IT report E_DC, E_IT (EN 50600-4-2), waste heat reused E_REUSE per EN 50600-4-6 (outside the boundary only, at the handoff), average waste-heat temperature T_WH at the computer-room exchanger; Annex III ERF = E_REUSE ÷ E_DC | `heatPhys` Heat ≈ electricity drawn; Q = V × 1.16 × ΔT (Green Grid WP29); ISO/IEC 30134-6 ERF (Formulas sheet) | `iso30134_6` ISO/IEC 30134-6:2021 Energy reuse factor (read in the BIS identical-adoption text, Oct 2023): ERF = E_Reuse ÷ E_DC, 0–1; only energy reused outside the data-centre boundary counts (cl.4); heat pumps outside the boundary 'shall not be included in the calculation' (cl.5); measured 'at the logical boundary of the data centre at the handoff point' by flow and temperature rise (cl.6); Annex A.1.5.3: heat-pump output is not reusable energy as it contains the pump's electricity | `nrelRSF` NREL RSF data-centre case study (DOE): 'Average ERE = 0.91 (calculated, not measured)' against 'Average PUE = 1.18 (measured)' | `teliaHKI2024` Telia, Helsinki Data Center cooling options for AI/GPU loads (operator PDF), pp.4–6: 24 MW IT / 100 MW total; module 5 MW cooling → 6.5 MW heat; snapshot 29 May 2024: 5.65 MW to DH (4.11 waste heat + 1.45 added), COP 3.9, PUE 1.152, ERF 0.75; loop 20 / 32 °C, DH 75–85 °C

### Water usage effectiveness  (`wue`)

- Stage: What it gives off · unit: L/kWh · level: Technical
- Inputs (formula arguments): blowdown, it_load_actual
- Fed by (diagram links): blowdown, it_load_actual · feeds: —
- Trust: own 90 / 100 · weakest input (chain) 50 / 100 · status: in hand

```
wue = f(blowdown, it_load_actual)
site water ÷ E_IT
```

Coefficients: DCRE cap 2 L/kWh

Sources: `femp` US DOE FEMP BMP #10: evaporation ≤ Q ÷ h_fg (~1.5 L/kWh); blowdown = E ÷ (C−1); WUE (ISO 30134-9) (Formulas sheet)

### Warmer air near the cooling units  (`heat_plume_dT`)

- Stage: What it gives off · unit: °C · level: Everyday
- Inputs (formula arguments): heat_rejected, plant_schedule
- Fed by (diagram links): heat_rejected, plant_schedule · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 50 / 100 · status: physics at the coil (100); at a neighbour derived (60); field range peer-reviewed but transferred from large desert sites (70)

```
heat_plume_dT = f(heat_rejected, plant_schedule)
at the coil: ΔT = Q ÷ (ρ·cp·airflow); at a neighbour: ΔT ≈ Q ÷ (ρ·cp) × (χ/Q)(x), the plume factor from air_screen_1h; heat treated as a passive tracer (buoyant rise ignored)
```

Coefficients: airflow from manufacturer data (claim, 50); screening estimate, not a measured air temperature. Measured (first field study, Phoenix, 36–169 MW): downwind air 0.7–0.9 °C warmer on average, up to 2.2 °C, detectable 100–500 m away; condenser discharge 8–14 °C above ambient. Placement: units on the roof warm street-level air less than units on walls (Berlin model: up to 0.6 K for wall units, smaller for rooftop; Jin et al. 2020). The effect is strongest at night: Phoenix AC waste heat added more than 1 °C at night at some locations, little by day (Salamanca et al. 2014). A land-surface preprint (+2 °C) is context only

Sources: `sailor2026` Sailor, Samareh Abolhassani & Martin 2026, Data center waste heat as an emerging urban thermal hazard: first field measurements (ASME J. Engineering for Sustainable Buildings and Cities 7(2) 024501, peer-reviewed short communication; read 19 Oct 2026): vehicle traverses at four Phoenix facilities of 36–169 MW: downwind air up to 2.2 °C warmer, average 0.7–0.9 °C warmer than upwind; detectable 100–500 m from the perimeter depending on size, wind and layout; air-cooled condenser discharge 8–14 °C above ambient (cited); neighbourhood sensitivity about 1 °C per 100 W/m² (cited). Hot-desert summer, large facilities: transfer to a 2.5 MW in-city site with caution | `jin2020` Jin, Schubert, Salim & Schneider 2020, Impact of air conditioning systems on the outdoor thermal environment during summer in Berlin (Int. J. Environ. Res. Public Health 17, 4645; peer-reviewed, modelled): wall-mounted AC outdoor units raise near-surface air temperature up to 0.6 K, more at night and in urban areas; rooftop units have a smaller effect | `salamanca2014` Salamanca et al. 2014, Anthropogenic heating of the urban environment due to air conditioning (J. Geophys. Res. Atmospheres; peer-reviewed, WRF + building energy model, 10-day Phoenix heat event; read 19 Oct 2026): AC waste heat's mean daytime effect near the surface was negligible, but at night it raised 2 m air temperature by more than 1 °C at some urban locations and increased cooling demand | `dcLstPreprint` arXiv 2603.20897 (preprint, NOT peer-reviewed): data-centre sites ≈ +2 °C land-surface temperature on average, +1 °C detectable to 4.5 km

### Heat given off per m² of site  (`heat_flux_site`)

- Stage: What it gives off · unit: W/m² · level: Civic
- Inputs (formula arguments): heat_rejected
- Fed by (diagram links): heat_rejected · feeds: —
- Trust: own 70 / 100 · weakest input (chain) 50 / 100 · status: arithmetic (100); city comparison value 70

```
heat_flux_site = f(heat_rejected)
q = heat rejected at peak (W) ÷ site area (m²); shown beside the city value
```

Coefficients: Vancouver grid-cell anthropogenic heat flux 119 (units assumed W/m²; Allen et al. 2011); Edmonton: no published value; US city-wide fluxes 10–75 W/m², about 1 °C of air warming per 100 W/m² at neighbourhood scale (cited in Sailor 2026); check: 10 MW over 1 ha → 1,000 W/m²

Sources: `allen2011` Allen, Lindberg & Grimmond 2011, Global to city scale urban anthropogenic heat flux (Int. J. Climatology): Vancouver grid cell 119 (units assumed W/m²; not stated in the abstract); no Edmonton value | `sailor2026` Sailor, Samareh Abolhassani & Martin 2026, Data center waste heat as an emerging urban thermal hazard: first field measurements (ASME J. Engineering for Sustainable Buildings and Cities 7(2) 024501, peer-reviewed short communication; read 19 Oct 2026): vehicle traverses at four Phoenix facilities of 36–169 MW: downwind air up to 2.2 °C warmer, average 0.7–0.9 °C warmer than upwind; detectable 100–500 m from the perimeter depending on size, wind and layout; air-cooled condenser discharge 8–14 °C above ambient (cited); neighbourhood sensitivity about 1 °C per 100 W/m² (cited). Hot-desert summer, large facilities: transfer to a 2.5 MW in-city site with caution

### Condensate from cooling coils  (`condensate`)

- Stage: What it gives off · unit: h a year · level: Technical
- Inputs (formula arguments): heat_rejected
- Fed by (diagram links): heat_rejected · feeds: —
- Trust: own 50 / 100 · weakest input (chain) 50 / 100 · status: computed 19 Oct 2026; yield not sourced

```
condensate = f(heat_rejected)
coils condense only when air is cooled below its dew point; hours a year with outdoor dew point above 15 °C (the top of ASHRAE's recommended IT inlet range), from CWEC
```

Coefficients: computed from CWEC: Vancouver 417 h, Edmonton 117 h a year with outdoor dew point above 15 °C, so little condensate from a data centre; the monthly average dew point peaks near 13 °C in Vancouver and 12 °C in Edmonton in July–August (ECCC normals, vapour pressure 1.5 and 1.4 kPa, converted); US EPA rule of thumb for offices 3–10 US gal a day per 1,000 ft² conditioned (about 0.12–0.41 L/m² a day), not for data halls; litres per kW of cooling not found (gap)

Sources: `cwec` CWEC 2020 edition typical-year files, ECCC Engineering Climate Datasets (collaboration.cmc.ec.gc.ca …/CWEC_FMCCE/CWEC_FMCCE_v_2020): CAN_BC_VANCOUVER-INTL-A_1108395_CWEC.epw; CAN_AB_EDMONTON-INTL-A_3012216_CWEC.epw | `ecccNormals2020` ECCC Canadian Climate Normals 1991–2020, Vancouver International (Airport) and Edmonton (Airport), CSV (J.B. download 19 Oct 2026): snowfall 36.6 / 126.7 cm a year; days with snowfall ≥ 0.2 cm 7.4 / 54.7; days with snow depth ≥ 1 cm 8.2 / 145.1, ≥ 5 cm 4.4 / 120.5; average vapour pressure July 1.5 / 1.4 kPa | `ashraeTC99card` ASHRAE TC 9.9, Thermal guidelines 5th ed. reference card, Table 2.1: recommended IT inlet 18–27 °C, dew point −9 to 15 °C | `epaWSatWork` US EPA WaterSense at Work (Oct 2012) s. 8 p. 8-8: air-handler condensate 3–10 US gal a day per 1,000 ft² of conditioned space; generally usable without treatment as cooling-tower make-up

### Generator testing emissions  (`genset_test`)

- Stage: What it gives off · unit: t CO2; kg NOx, PM · level: Everyday
- Inputs (formula arguments): generator_co2, generator_nox_pm, backup_hours
- Fed by (diagram links): generator_co2, generator_nox_pm, backup_hours · feeds: hvo_swap, genset_emission_rate
- Trust: own 65 / 100 · weakest input (chain) 65 / 100 · status: in hand (upper bounds)

```
genset_test = f(generator_co2, generator_nox_pm, backup_hours)
energy = units × kW × test hours at load; × emission factors
```

Coefficients: testing ≈14.5 h/yr per unit, ~4 h at full load (AUC 27938-D01-2023, Amazon 25.6 MW, derived); Vancouver noise by-law exemption caps tests ≈15 h/yr; uncontrolled diesel 14.6 g NOx, 0.43 g PM, 706 g CO2 per kWh (AP-42 Table 3.4-1, upper bound for modern engines); Alberta exempts standby generators from environmental approval

Sources: `auc_27938` AUC Decision 27938-D01-2023, Amazon Data Services Canada (10 Mar 2023) | `ap42_34` US EPA, AP-42 5th ed., Vol. I, §3.4, Table 3.4-1 (Apr 2025) | `mvBylaw1329` Metro Vancouver Non-Road Diesel Engine Emission Regulation Bylaw No. 1329, 2021: applies to non-road diesel engines of 25 hp or more, including stationary engines; emergency engines (incl. emergency generators) are exempt from Parts 3–6 and 9 (registration, fees, tier rules) but must be maintained to manufacturer procedures, keep exhaust away from building openings and air intakes, and keep records; no limit on testing hours. Bylaw 1082 has no engine-specific threshold

### Renewable diesel in the generators  (`hvo_swap`)

- Stage: What it gives off · unit: g CO2e/MJ · level: Civic
- Inputs (formula arguments): genset_test
- Fed by (diagram links): genset_test · feeds: —
- Trust: own 55 / 100 · weakest input (chain) 55 / 100 · status: reference CI missing

```
hvo_swap = f(genset_test)
Δ lifecycle CO2e = fuel energy × (CI diesel − CI renewable diesel)
```

Coefficients: BC approved fuel codes −7 to 131 g CO2e/MJ (RLCF-012, Apr 2026); stack CO2, NOx and PM stay about the same; fossil diesel reference CI to retrieve

Sources: `bc_rlcf012` BC Low Carbon Fuels, Approved Carbon Intensities – Current (RLCF-012, rev. 30 Apr 2026) | `cfr2022_140` Clean Fuel Regulations SOR/2022-140 (consolidated to 30 Sep 2026; last amended 30 Sep 2024): s. 5(3) baseline carbon intensity of diesel 93 gCO2e/MJ (gasoline 95); s. 5(1) diesel limits 89.5 (2023) falling 1.5 a year to 79.0 (2030 and after); Schedule 1 reference CI, liquid class, 89.2 (2022–23) to 80.1 (2030+); a liquid low-CI fuel must be at most 90% of the reference CI. Applies in Alberta and BC. ECCC announced targeted amendments 9 Nov 2025 (not yet in the consolidation) | `bcLCFtech2023` BC Low Carbon Fuels (Technical) Regulation B.C. Reg. 295/2023, Schedule 3 Table 1: base carbon intensity of diesel fuel 94.38 gCO2e/MJ (gasoline 93.67); General Regulation 282/2023: 30% reduction by 2030; BC requirements page (updated 6 Mar 2026): diesel target CI 79.28 (2024), 77.11 (2025), 74.94 (2026) to 66.07 (2030); renewable content in diesel 8% from 2025; from 1 Apr 2025 eligible renewable diesel must be produced in Canada (yearly targets from the government page, regulation copies read were older) | `bcRLCF007_2024` BC RLCF-007-2024, Renewable and Low Carbon Fuel Requirements Summary 2010–2024 (revised Mar 2026): 2024 HDRD 1,041.1 million L at a weighted average 23.06 gCO2e/MJ (2023: 694.9 ML at 23.21); biodiesel 131.5 ML at 0.30; renewable share of the BC diesel pool 31.2% (1,172.8 of 2,610.2 ML) | `abRFS2026` Alberta Renewable Fuels Standard (Alta Reg 29/2010; regulation text blocked, values from Government of Alberta pages): minimum annual average 2% bio-based diesel in diesel and 5% renewable alcohol in gasoline; renewable fuels must show at least 25% lower life-cycle GHG than the petroleum equivalent (RFS resources page, 9 Oct 2026; fact sheet 12 Jan 2024). No carbon-intensity limit on the fuel pool, unlike BC | `ecccCFRmarket2024` ECCC Clean Fuel Regulations credit market report (26 Jun 2024), national only: volume-weighted average CI of HDRD used for credits 76.4 gCO2e/MJ in 2022 (range 36.0–80.0) and 65.3 in 2023 (15.0–80.0); approved Fuel LCA Model CIs for HDRD median 36.0; no provincial CI breakdown (Alberta Category 2 credits 636,752 t in 2023) | `bcRLCF012b` BC RLCF-012 Approved Carbon Intensities – Current (rev. 29 Apr 2026), read by agent: HDRD codes valid at 29 Apr 2026 range 7.58 (Tidewater Midstream) to 37.06 (Diamond Green Diesel) gCO2e/MJ; expired extremes −7.03 to 42.91; the list gives no facility location or feedstock, so no pathway can be confirmed as Alberta-made; Imperial Oil HDRD 15.06 and 19.46 (location not stated)

### Blowdown recovered  (`blowdown_recovery`)

- Stage: What it gives off · unit: L/yr · level: Technical
- Inputs (formula arguments): blowdown
- Fed by (diagram links): blowdown · feeds: —
- Trust: own 50 / 100 · weakest input (chain) 50 / 100 · status: single test site

```
blowdown_recovery = f(blowdown)
make-up × 0.84; blowdown × 0.47; + 3,541 kWh/yr per skid
```

Coefficients: one US federal test (GSA GPG-052, NREL evaluation, 2023): blowdown −53 %, make-up −16 %, cycles 2.8 → 4.9; US$46.8k installed; hard water, single site

Sources: `gsa_gpg052` US GSA Green Proving Ground, Blowdown Recovery System for Cooling Towers, Findings GPG-052 (Aug 2023; NREL evaluation) | `femp_ct` US DOE FEMP, Best Management Practice #10: Cooling Tower Management (2013, modified 2026); EPA WaterSense at Work §6.3 | `gsaBlowdown2023` GSA Green Proving Ground, blowdown recovery (2023): $35,403 equipment + $11,422 install on a 1,150-ton plant; blowdown −53%, make-up −16%, cycles 2.8 → 4.9; payback 2.9–4.8 years | `epaQuincy` US EPA, Water reuse case study, Quincy WA reuse utility: operational 30 Jun 2021, $31 M operator-funded, 30-yr agreement, 138 M gal/yr potable saved | `waterHardness2026` Treated drinking-water hardness (mg/L as CaCO3): EPCOR Edmonton 2021 Rossdale avg 170 (137–203), E.L. Smith 169 (143–201); Jan–May 2026 both plants 177.8 (146–204); Metro Vancouver 2025 annual report, treated: Capilano 20.5, Seymour 20.2, Coquitlam 2.4


## 5. Who is nearby

### Receiver search radius  (`receiver_radius`)

- Stage: Who is nearby · unit: m · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: deprivation, receivers_nearby
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: confirmed (primary report read)

```
receiver_radius = f()
search to 3 km in a straight line (a street-routing limit); the cost of each pipe decides
```

Coefficients: RVO 2018 (IF Technology for RVO, RVO-178-1801): pools 1,000 m (future 1,450); existing housing 1,200 m (future 2,600); greenhouses 1,500–2,100 m; new-build housing 1,200 m; 5-year payback vs natural gas | logic test 19 Oct 2026 (J.B.): the RVO 1.5 km reach is retired — in Edmonton a mall at 2.9 km was as good as the best building inside 1.5 km

Sources: `rvo2018` RVO, Rapportage kansenkaart Warmte uit Datacenters (IF Technology, 7 Nov 2018), RVO-178-1801

### Receivers within reach  (`receivers_nearby`)

- Stage: Who is nearby · unit: list: type, distance, demand, temperature, evidence · level: Everyday
- Inputs (formula arguments): parcel, receiver_radius, receiver_demand, receiver_temp
- Fed by (diagram links): parcel, receiver_radius, receiver_demand, receiver_temp · feeds: competing_sources, commitment
- Trust: own 70 / 100 · weakest input (chain) 60 / 100 · status: data in hand (15 Oct); Vancouver pools and Edmonton care homes thin in the national records

```
receivers_nearby = f(parcel, receiver_radius, receiver_demand, receiver_temp)
every candidate receiver whose straight-line distance ≤ its type's reach (receiver_radius); each carries its demand (disclosed, else floor area × intensity), the temperature its type needs, its profile, and where the record came from
```

Coefficients: types: hot-water district network · ambient (low-temperature) network · steam network · pool · ice rink (also a source) · school · hospital or care home · housing · office · greenhouse · wastewater plant. Pools: water ≤ 37 °C by regulation, 25–28 °C recommended for competition pools (BC 2025). Ambient networks (Blatchford) take heat near ground temperature and lift it in each building. Hot water stored for taps must be at least 60 °C, and 49 °C anywhere in a recirculation loop (Vancouver Building By-law 2025 Book II, 2.6.1.12.(1), 2.6.1.1.(3)); so data-centre heat at 25–35 °C can preheat tap water but a heat pump or other source must finish it. Map records (15 Oct 2026, tool/receivers_*.json): Vancouver 353 — 27 recreation centres, 1 arena, 20 hospitals, 103 care homes, 202 schools (StatCan ODSRF v2 records no separate Vancouver pools; recreation-centre contents not recorded) — plus 641 non-market housing projects (City open data); Edmonton 475 — 161 recreation centres, 23 pools, 22 indoor arenas, 13 hospitals, 2 care homes, 254 schools. 72 health records have no location and are counted, not placed. Arena ice plants are heat sources as well as receivers. | 20 Oct 2026 (dedupe_receivers.py M87): care homes from each province's licence list replace StatCan ODHF care records. Vancouver: BC Residential Care Facilities, all licensed types inside the City (100 homes, 3,853 licensed places). Edmonton: Alberta continuing-care compliance reporting June 2026, latest visit per site since 1 Jul 2024, Continuing Care Home Types A and B and Group Homes (assisted living and lodges left out: BC's list has no assisted living); 159 placed by City assessment address (19 at the nearest house number within 20), 3 not placed (In and Out Home Care House #2, Shepherd's Care Kensington Village, Salvation Army Grace Manor). ODHF care records with no listed home within 150 m kept (Vancouver 7, Edmonton 1) | 20 Oct 2026 audit (tool/audit_receivers.py, lot_dedupe.py; audit/bca_build_2026-10-20.md): one lot, one count in both cities. Assessment estimates on a lot already holding a named receiver with its own figure, or at a StatCan hospital or care address, dropped (Vancouver 14, Edmonton 7: e.g. Mount Saint Joseph, BC Children's, Misericordia, Alberta Hospital Edmonton); schools inside an assessed building made tenants; same-name repeats on one lot merged. Estimate vs building-outline floor area: median 0.86 Vancouver, 0.65 Edmonton

Sources: `bcPools2025` BC Ministry of Health, Health Protection Branch, B.C. Guidelines for Pool Operations v3 (2025), s. 5.2 and 5.6 (Pool Regulation ss. 10(2)(b), 16(b)): pool water ≤ 37 °C, hot tubs ≤ 40 °C; competitive pools 25–28 °C recommended | `blatchfordDESS` City of Edmonton / Blatchford, District energy sharing system overview (undated, uploaded 2016): ambient-temperature loop, geo-exchange and sewer heat exchange, heat pumps in buildings | `npc2612` City of Vancouver Building By-law 2025, Book II (Plumbing), Div. B 2.6.1.12.(1): storage-type service water heaters operate at not lower than 60 °C; 2.6.1.1.(3): recirculated hot water not less than 49 °C at any point (convenience copy, By-law 14343 as amended by 14488) | `odef` Statistics Canada, Open Database of Educational Facilities v2.1 (published 28 Nov 2022; archived) | `odhf` Statistics Canada, Open Database of Healthcare Facilities (published 17 Apr 2020; coverage Nov 2019–Mar 2020): hospitals, nursing and residential care, ambulatory | `odrsf` Statistics Canada, Open Database of Sport and Recreational Facilities v2 (ODSRF), 21-26-0002, product 2021001, released 24 Sep 2026, ~249,000 records (pools, arenas, rinks, community centres…; type, year_built, ownership, geometry) | `receiversBCUC` BCUC decisions on Vancouver-region networks: Creative Energy Core steam 971,259 klb forecast, >200 buildings (G-310-21A, 2021); NE False Creek 24 MW peak, 48,100 MWh/yr by 2024 (C-12-15); Sen̓áḵw DES 10,343 kW peak, 11,218 MWh/yr (C-5-23); River District 11.0 → 26.1 MW peak, ~33,600 MWh/yr (C-3-23); SFU Burnaby Mountain 43,787 MWh/yr (G-279-21) | `rvo2018` RVO, Rapportage kansenkaart Warmte uit Datacenters (IF Technology, 7 Nov 2018), RVO-178-1801 | `src25` Beyond Data research note 25: receivers, service areas, noise zones, Canadian precedents (sources/25_receivers_networks_precedents.md) | `vanEnergyReport` City of Vancouver Annual Energy and Carbon Report (by-law reporting, buildings ≥100,000 ft²), map at https://energycarbonreport.vancouver.ca/map/ | `vanNMH` City of Vancouver Open Data, Non-market housing (export 15 Oct 2026): 641 projects with status, occupancy year, operator, unit counts | `bcResCare` Government of British Columbia, Residential Care Facilities (licensed community care facilities, maximum capacity; Open Government Licence – BC) | `abCCcompliance2026` Government of Alberta, Assisted Living and Social Services, Continuing Care Accommodation Standards compliance reporting as of June 2026 (Open Government Licence – Alberta)

### Other sources for the same receiver  (`competing_sources`)

- Stage: Who is nearby · unit: list: source, capacity, status · level: Civic
- Inputs (formula arguments): receivers_nearby, sewage_heat
- Fed by (diagram links): receivers_nearby, sewage_heat · feeds: displaced_source
- Trust: own 60 / 100 · weakest input (chain) 20 / 100 · status: two networks sourced; others per receiver

```
competing_sources = f(receivers_nearby, sewage_heat)
sources already serving, or planned for, each receiver: sewage heat recovery, wastewater plants, ice-rink refrigeration, other data centres, ground loops; a receiver whose demand is already met by a low-carbon source is a weaker match, not a missing one
```

Coefficients: Vancouver NEU: 70% renewable, mostly sewage heat recovery, 6.6 MW added, 100% renewable target 2030 (City page, May 2025); Blatchford (Edmonton): ambient loop on geo-exchange and sewer heat. Ice rinks reject refrigeration heat — a source as well as a receiver. NEU By-law 9552 (2026): inside its service area, new buildings and major alterations must take NEU heat unless the City Engineer finds it not practical or economical (s. 2.1); heat returned to the network is credited at 50% of $65.172/MWh. Traced service area (2.3 km², ±45 m): 111 E 5th Ave lies inside, 70–130 m from the line — consistent with RTS 19744 making NEU heat delivery a material condition of that data centre

Sources: `blatchfordDESS` City of Edmonton / Blatchford, District energy sharing system overview (undated, uploaded 2016): ambient-temperature loop, geo-exchange and sewer heat exchange, heat pumps in buildings | `neuTraced` NEU service area traced 15 Oct 2026 from By-law 9552 Schedule A (300 dpi render; boundary extracted from the bold line; georeferenced to street centrelines from City parcel addresses | `van9552` City of Vancouver Energy Utility System By-law 9552, consolidated to By-law 14524 (effective 1 Jan 2026): Schedule A service area; s. 2.1 compulsory use; s. 5.2(a)(v) cooling-system heat recovery allowed; Schedule C charges and 50% credit for returned heat | `vanNEU2025` City of Vancouver, Southeast False Creek Neighbourhood Energy Utility (web page, modified 21 May 2025): 70% renewable, mostly sewage heat recovery; 6.6 MW sewage heat recovery added; 100% renewable by 2030

### Offerable floor area  (`offerable_area`)

- Stage: Who is nearby · unit: m² · level: Civic
- Inputs (formula arguments): floor_area
- Fed by (diagram links): floor_area · feeds: refuge_people, clean_air_volume, cooling_centre_people, crossing_type
- Trust: own 60 / 100 · weakest input (chain) 60 / 100 · status: ground floor by rule (90) in three Vancouver zones; support block from plans (60); growth space judged (20)

```
offerable_area = f(floor_area)
ground floor where zoning bars data storage at grade + a support block (200–600 m², from plans); space held for growth shown apart (judged, 20)
```

Coefficients: Vancouver I-2 s. 2.2.7, I-3 s. 2.2.11 (sub-area A), FC-2 s. 2.2.4 bar data storage at grade; Edmonton has no ground-floor rule

Sources: `bins` GP1 Bins sheet: 19 receivers noted; 22 precedents (mostly operator claims); policy levers (Bins sheet) | `vanI2Ground` Vancouver zoning I-2 s. 2.2.7, I-3 s. 2.2.11 (sub-area A) and FC-2 s. 2.2.4: data storage not permitted at grade (ground floor kept for other uses)

### Receiver heat demand  (`receiver_demand`)

- Stage: Who is nearby · unit: GJ/yr · level: Civic
- Inputs (formula arguments): receivers
- Fed by (diagram links): receivers · feeds: heat_density, demand_profile, payback, btes, deep_geo, receivers_nearby
- Trust: own 60 / 100 · weakest input (chain) 60 / 100 · status: proxy

```
receiver_demand = f(receivers)
disclosed data (Energize Vancouver) else floor area × type intensity × heating share (space + water heating, CEUD 2023 by province)
```

Coefficients: heating-only intensity, CEUD 2023: BC 0.57 / AB 1.40 GJ/m² overall; offices 0.45 / 1.13; heat is 48–63% of energy in BC, 62–83% in Alberta; hospitals from SCIEU 2024 (BC 1.90, AB 2.46 GJ/m² total); type medians NRCan ENERGY STAR; delivered fuel, not useful heat (boiler efficiency not yet sourced); 2023 a warm year | 19 Oct 2026 (make_bigrecv.py): large buildings added at the Vancouver GHG by-law reporting thresholds in both cities (commercial ≥ 4,645 m², multi-family and hotels ≥ 9,290 m²). Vancouver: owner-reported floor area × reported heat energy intensity (measured, disclosed buildings only: 200 added). Edmonton: assessment gross area of Other Residential × 0.777 GJ/m² and Commercial × 1.40 GJ/m² (estimate; 1,048 added). Condominiums not caught in Edmonton; non-disclosing buildings not caught in Vancouver (BC Assessment to follow) | 20 Oct 2026 (J.B.; make_bigrecv.py, bca/bca_derive.py): Vancouver buildings over the same thresholds that did not disclose are added from BC Assessment: homes x 16.81 MWh + other floor area x CEUD 2023 BC intensity, worked out on J.B.'s computer and rounded (inputs not shown). Roll joined to the City's folio on its last 12 digits (99.4% non-residential, 99.96% residential rows matched); strata buildings counted once per parcel (each strata lot's row repeats the building's gross area); strata lot areas x 1.15 for the size test (BCA's own common-area allowance, commercial guide, borrowed). Check against 238 measured Vancouver buildings: estimate / measured median 1.74, quartiles 1.0 and 3.2. Shown as a range in both cities: estimate / 1.7 to the estimate (J.B. 20 Oct); Edmonton could not be checked (no measured data published). 699 added in Vancouver (others within 40 m of a measured building or another receiver)

Sources: `energize` Energize Vancouver (By-law 13472): ≥4,645 m² report; disclosure opt-in; enforcement paused 21 May 2026 | `edmBench` Edmonton building benchmarking: voluntary; dashboard pending | `ceud` NRCan Comprehensive Energy Use Database, 2023 data: Residential Table 2 (BC; Alberta) and Commercial/Institutional Table 3 (BC & Territories; Alberta) | `statcanHousehold` Statistics Canada Table 25-10-0060-01, Household energy consumption, Canada and provinces (2011–2021, biennial) | `nrcanTrends` NRCan Energy Efficiency Trends 2020, residential: 95.7 GJ/household; space heating 61% | `vanEnergyReport` City of Vancouver Annual Energy and Carbon Report (by-law reporting, buildings ≥100,000 ft²), map at https://energycarbonreport.vancouver.ca/map/ | `receiversBCUC` BCUC decisions on Vancouver-region networks: Creative Energy Core steam 971,259 klb forecast, >200 buildings (G-310-21A, 2021); NE False Creek 24 MW peak, 48,100 MWh/yr by 2024 (C-12-15); Sen̓áḵw DES 10,343 kW peak, 11,218 MWh/yr (C-5-23); River District 11.0 → 26.1 MW peak, ~33,600 MWh/yr (C-3-23); SFU Burnaby Mountain 43,787 MWh/yr (G-279-21) | `edmReceivers` Edmonton receivers: Downtown District Energy (City/EPCOR) Phase 1 three buildings, up to 50 by 2050, heat only in phases 1–2; Blatchford Renewable Energy Utility 13.1 MW heating / 12.3 MW cooling, ambient-temperature sharing network; University of Alberta district energy (capacity not stated) | `neuConnect` City of Vancouver NEU Connectivity Guidelines (May 2026 Rev.1): network 'minimum 65°C'; building supply 60 °C year-round; 'a maximum return water temperature of 45°C must be achieved under all conditions'; the NEU does not provide cooling; waste heat from building cooling may be accepted for a bill credit | `blatchford2023` City of Edmonton, 2023–2026 Blatchford Renewable Energy Utility Budget and Plans (Dec 2022) | `edmDES2022` City of Edmonton, District Energy Strategy (Aug 2022), Attachment 1 to IIS02148, Urban Planning Committee, 27 Feb 2024 | `vanNEUguide` City of Vancouver NEU connectivity guidelines: building-side supply 60 °C, return ≤45 °C, ΔT ≥15 °C; ETS room ≥6 × 3 m under 13,940 m², 6 × 4 m to 23,230 m², 2.7 m headroom; ETS owned by the NEU | `torontoDER2016` City of Toronto, District Energy Ready Guideline (Oct 2016), design supply/return °C: radiant floor 45/35; radiators and fan coils 60/45; convectors 70/55; make-up air 65/45 (new buildings) | `statcanHeat2011` Statistics Canada, Households and the Environment 2011, main heating equipment: Canada forced air 57%, baseboard 27%, hot-water/steam boiler 5%; BC 52 / 28 / 6 (use with caution); Alberta forced air 94%. No apartment split | `vanNEUlevy2025` City of Vancouver, False Creek NEU connection levy now $123,873 per energy transfer station + $146 per kW of peak (By-law 9552 Sch. C Part 1, in force 1 Jan 2026 via By-law 14524; $136,260 + $161/kW from 1 Jan 2027; checked against data/raw/van/9552.txt 18 Oct 2026). Earlier: 2025 rates (report 25 Nov 2024): connection levy $112,611 per energy transfer station plus "$133 per kW of the peak heat energy demand", "to recover the direct costs of connection (service connection and energy transfer station)"; proposed 2026 $123,873 + $146/kW | `energyStarCA` NRCan ENERGY STAR Portfolio Manager, Canadian national median site EUI (GJ/m²): office 0.87, hospital 2.20, K-12 school 0.70, college/university 1.04, multifamily 0.82, ice rink 1.10 | `scieu2024` Statistics Canada, SCIEU 2024 (The Daily, 26 Jun 2026): hospitals BC 1.90 / AB 2.46 GJ/m², universities 1.25 / 1.59, colleges 0.75 / 1.50 | `edmBylaw21442` City of Edmonton Bylaw 21442, 2026 Property Tax and Supplementary Property Tax Bylaw, s. 2(n): Other Residential = four or more self-contained dwelling units used for permanent living accommodation | `ceudResTable2` NRCan Comprehensive Energy Use Database 2023, Residential Sector Table 2 (BC and Alberta): space + water heating ÷ total floor space, 2018–22 average: BC 0.400, Alberta 0.777 GJ/m² (all dwellings); per household BC 60.5, Alberta 119.3 GJ (data/82007eb2-res_bc_e_2.xls, a1c75be6-res_ab_e_2.xls) | `bcAssess2026` BC Assessment, Residential Inventory Extract (area 09, 1 Apr 2026) and Non-Residential Inventory Extract (1 Apr 2026), via UBC Library Abacus, 'BC Assessment Data Advice and Inventory Extracts', https://hdl.handle.net/11272.1/AB2/LAPUAB (licensed to UBC researchers; derived values only, rounded) | `bcaGuideCom` BC Assessment, Commercial Inventory Extract External User Guide v1.0: field 19 Gross Building Area ('the total constructed area of a building'); field 21 strata lot area, with strata units' areas x 15% for common areas where building size is not known | `bcaGuideRes` BC Assessment, Residential Inventory Extract External User Guide v1.1 (8 Jul 2021): field 9 total finished area (single-family); fields 34-36 occupancy code and unit of measure (STRLA strata lot area, STRPS parking) | `vanTaxReport` City of Vancouver Open Data, property tax report (FOLIO = the last 12 digits of BC Assessment's 15-digit roll number; LAND_COORDINATE = the parcel), downloaded Oct 2026

### Deprivation of affected areas  (`deprivation`)

- Stage: Who is nearby · unit: index · level: Civic
- Inputs (formula arguments): noise_level, receiver_radius
- Fed by (diagram links): noise_level, receiver_radius · feeds: affordability, ledger
- Trust: own 80 / 100 · weakest input (chain) 50 / 100 · status: confirmed

```
deprivation = f(noise_level, receiver_radius)
CIMD by dissemination area within noise contour and receiver radius
```

Sources: `cimd` StatCan Canadian Index of Multiple Deprivation 2021 (DA level); Census 2021 DA boundaries

### Distribution capital cost  (`distribution_cost`)

- Stage: Who is nearby · unit: €/GJ · level: Technical
- Inputs (formula arguments): linear_heat_density
- Fed by (diagram links): linear_heat_density · feeds: payback, row_cost
- Trust: own 70 / 100 · weakest input (chain) 60 / 100 · status: confirmed

```
distribution_cost = f(linear_heat_density)
C_d = a(C1 + C2·d_a) ÷ q_L,w; d_a = 0.0486 ln(q_L,w) + 0.0007; C1 212 €/m; C2 4,464 €/m²; a 0.051
```

Coefficients: convert to CAD

Sources: `persson` Persson et al. 2019 distribution cost: C1 = 212 €/m, C2 = 4,464 €/m² | `persson2019` Persson, Wiechers, Möller & Werner 2019, Energy 176:604–622: district-heating trench cost I/L = C1 + C2·da, average C1 = 212 €/m, C2 = 4,464 €/m² (2015 €; ≈€658/m at da 0.1 m, Claude arithmetic); inner-city vs outer-city split only in a figure not read | `nproCosts` npro.energy cost overview (from Logstor pipe prices and the KWW catalogue, "without any guarantee"): insulated pipe pair €/m | `cambridgeApp5` City of Cambridge MA, net-zero LCESS Appendix 5: district pipe US$/ft | `vanNEU2018` City of Vancouver NEU expansion report (21 Feb 2018): distribution capital "$13 to $37 million (2018$)", base case $29M; no length or cost per metre | `edmDDEcapital` City of Edmonton, DDE 2025–2026 rate filing (IIS02765; local copy): Phase 1 capital $35.9M covers the energy centre, distribution piping and energy transfer station together; Phase 1A $18.3M; no pipe length or per-metre cost (Claude searched the local PDFs, incl. the 2025 business case) | `isoplusEPD` isoplus Suomi EPD, pre-insulated steel pipe: DN100 A1–A3 39.5 kg CO2e per metre of single pipe (A4 1.03, A5 0.21); DN20 ×0.22, DN400 ×6.2. Supply and return ≈ double; trench excluded | `vanQuebecSt2020` City of Vancouver memo to Council (15 May 2020), NEU Mount Pleasant expansion on Quebec St 3rd–6th Ave: start 19 May, completion "anticipated in fall 2020" (≈5 months) | `vanStreets2026` City of Vancouver Open Data, Public streets (J.B. download 16 Oct 2026): 17,072 street centreline segments by hundred block with street use (residential, collector, arterial and others); plus Lanes (download 18 Oct 2026, updated by the City 27 Jul 2026): 7,856 lane centreline segments, surface not recorded. Used to route pipes and to place street viewpoints for sight lines | `edmRoads2026` City of Edmonton Open Data, Road Network (J.B. download 16 Oct 2026): 53,873 centrelines with type (road, alley, railway), segment type, functional class (local, collector, arterial classes A–D) and surface; the tool keeps roads and alleys (50,755 segments; ramps, overpasses and bridges dropped) for pipe routes and street viewpoints; gravel alleys are marked unpaved

### People within reach  (`people_affected`)

- Stage: Who is nearby · unit: people · level: Everyday
- Inputs (formula arguments): receptors, area
- Fed by (diagram links): receptors, area · feeds: greywater_neighbours
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: in hand (tool v18, 16 Oct 2026)

```
people_affected = f(receptors, area)
dissemination-area population × share of the DA within each radius (noise, light, heat receivers)
```

Coefficients: 2021 census counts by dissemination area, spread evenly within each area onto a 100 m grid and summed within 200 m, 500 m and the sound distance: people, households, 65+, under 15, renter households, households spending 30%+ on shelter, people in low income (LIM-AT % × population). Randomly rounded; suppressed values count as 0

Sources: `census2021DA` Statistics Canada, Census Profile 2021, dissemination areas (98-401-X2021006, BC and Prairies files) and 2021 DA cartographic boundaries (92-160-X, lda_000b21a_e); J.B. downloads 16 Oct 2026; selected counts extracted on J.B.'s computer for CD 5915 (Greater Vancouver, 3,590 DAs, population 2,642,825) and CD 4811 (Division No. 11, 1,952 DAs)

### Heat density of receiving area  (`heat_density`)

- Stage: Who is nearby · unit: GJ/ha·yr · level: Technical
- Inputs (formula arguments): receiver_demand, area
- Fed by (diagram links): receiver_demand, area · feeds: linear_heat_density
- Trust: own 70 / 100 · weakest input (chain) 60 / 100 · status: confirmed (RVO primary and HRE)

```
heat_density = f(receiver_demand, area)
q_L = population density × floor space per capita × specific demand; classes 200 / 500 / 1,200 / 3,000 GJ/ha (20/50/120/300 MJ/m²)
```

Coefficients: RVO 2018 p.8: areas below 1,000 GJ/ha treated as not viable (printed 'GJ/h'); HRE classes 200/500/1,200/3,000 GJ/ha (Persson Table 1, converted)

Sources: `persson` Persson et al. 2019 distribution cost: C1 = 212 €/m, C2 = 4,464 €/m²

### Linear heat density  (`linear_heat_density`)

- Stage: Who is nearby · unit: GJ/m · level: Technical
- Inputs (formula arguments): heat_density, plot_ratio
- Fed by (diagram links): heat_density, plot_ratio · feeds: distribution_cost
- Trust: own 70 / 100 · weakest input (chain) 60 / 100 · status: confirmed

```
linear_heat_density = f(heat_density, plot_ratio)
q_L,w = Q_s ÷ L; effective width w = 137.5e + 5 (e ≤ 0.4) else 60 m; lower limit 1.5 GJ/m
```

Sources: `persson` Persson et al. 2019 distribution cost: C1 = 212 €/m, C2 = 4,464 €/m²


## 6. What it could become

### Homes heated  (`homes_heated`)

- Stage: What it could become · unit: homes · level: Everyday
- Inputs (formula arguments): heat_delivered
- Fed by (diagram links): heat_delivered · feeds: homes_heated_2050s
- Trust: own 80 / 100 · weakest input (chain) 50 / 100 · status: confirmed (CEUD 2023 end-use split; StatCan 2021 fuel split, primary)

```
homes_heated = f(heat_delivered)
homes = Q_available ÷ (space + water heating GJ per household); BC 60.5 GJ (16.81 MWh), AB 119.3 GJ (33.14 MWh), CEUD residential 2018–22 average
```

Coefficients: 18 Oct 2026 (J.B. decisions, heat items 1–7; audit/heat_items_sources_2026-10-18.md): 2018–22 average replaces 2023 (the lowest heating-degree-day year in both provinces; 2023 gave 14.58 / 29.19 MWh). BC per year 16.71, 17.07, 16.72, 16.79, 16.75 MWh; AB 34.85, 34.38, 33.22, 31.13, 32.13 (local res_bc_e_2.xls / res_ab_e_2.xls). Earlier: CEUD 2023, provincial: BC 71.7 GJ/household/yr total, space heating 46.2% (33.1 GJ), water heating 27.1% (19.4 GJ), 0.464 GJ/m²; Alberta 121.8 GJ/household, space heating 63.1% (76.9 GJ), water heating 23.2% (28.2 GJ), 0.785 GJ/m² (replaces the 2021 StatCan 81.2 / 121.8 and the national 61% share); StatCan 25-10-0060 (2021, primary CSV): BC 81.2 GJ/household all energy; gas-using households 1,235,024 of 2,041,830 (60%) at 80.2 GJ gas each; electricity 32.5 GJ/household (40% of energy). Alberta 121.8 GJ; gas households 1,471,165 of 1,633,225 (90%) at 109.3 GJ; electricity 23.3 GJ (19%). Displacement target for a heat match = the gas-using share, not all households

Sources: `ceud` NRCan Comprehensive Energy Use Database, 2023 data: Residential Table 2 (BC; Alberta) and Commercial/Institutional Table 3 (BC & Territories; Alberta) | `statcanHousehold` Statistics Canada Table 25-10-0060-01, Household energy consumption, Canada and provinces (2011–2021, biennial)

### Sewage heat recoverable  (`sewage_heat`)

- Stage: What it could become · unit: kW · level: Civic
- Inputs (formula arguments): sewer_flow
- Fed by (diagram links): sewer_flow · feeds: competing_sources
- Trust: own 80 / 100 · weakest input (chain) 20 / 100 · status: flow gap

```
sewage_heat = f(sewer_flow)
Q(L/s) × 4.18 × ΔT; not below 6 °C; WWTP inflow ≥ 11 °C
```

Coefficients: Metro Vancouver ~45 MW City-wide (KWL 2014); FCNEU: 2006 design 2.5 MW base sewage heat, COP ~3, levelized $59/MWh (RTS 06419); +5 MW planned 2018; +6.6 MW added (City page). '3.2 MW' and '24 MW boilers' not found on cited pages — removed; Vancouver sewer-mains layer gives effluent type and material per segment but no diameter or flow, so flow near a parcel stays a gap (Metro Vancouver / City engineering request)

Sources: `wilsonWorrall` Wilson & Worrall 2021, Environ. Sci.: Water Res. Technol. 7:1760 | `kwlSewer` KWL for Metro Vancouver 2014, heat-seeking sewer model | `neuReport` NEU rates report RTS 18251 (Oct 2025): 47 buildings, 667,000 m²; 71% renewable; gas $2.23/GJ; RNG rider | `rts06419` City of Vancouver RTS 06419 (2006), SEFC NEU: 2.5 MW sewage heat base, COP ~3, $59/MWh levelized | `vanSewer` City of Vancouver Open Data, Sewer mains (39,927 segments): effluent_type (Storm / Sanitary / Combined), material, geom, geo_point_2d | `blatchfordBP2021` Blatchford Renewable Energy 2021–2024 Business Plan, City of Edmonton (J.B. upload 16 Oct 2026): the District Energy Sharing System uses geoexchange, sewer heat exchange and solar (p. 1); all buildings must connect for heating, cooling and hot water unless net-zero carbon (p. 2); a sewer-heat energy centre in the Blatchford Market area, drawing on the two combined sewer lines under the east side, was expected in 2023; connected floor area forecast 123,500 m² by 2024, all from the first energy centre; customers to pay at most a comparable fee to elsewhere in the city. No intake of heat from third-party sources is described | `epcorGoldBar2026` EPCOR, Gold Bar Wastewater Treatment Plant walking tour (J.B. screenshot 16 Oct 2026): plant on the North Saskatchewan River at 50 St NW and Goldbar Park Road NW; position taken from the City road network (Goldbar Park Road NW, Road_Network 16 Oct 2026) as approximate | `blatchfordSHX2026` Blatchford Renewable Energy (City of Edmonton company): sewer heat exchange from two existing combined sewers under east Blatchford, in planning and design; expansion adds 13.1 MW heating and 12.3 MW cooling; geoexchange field 570 boreholes × 150 m; federal SREPs $23.7 M toward a $79.2 M project (NRCan, 31 Jul 2024). EPCOR Bylaw 19627 allows non-contact cooling water into sanitary sewers with written approval | `blatchfordRates2026` Blatchford Renewable Energy rates: Bylaw 17943 consolidated 1 Jan 2024: infrastructure fee $1,947.03/unit residential, $22.24/m² commercial; fixed $1.88/unit/day townhouse, $12.84/kW peak/month multi-unit; variable $0.0325/kWh. 2025 and 2026 (frozen by Council 1 Dec 2025, citing federal policy changes): townhouse $2.07/unit/day + $0.0358/kWh; multi-unit $13.18/kW peak/month + $0.0358/kWh. The meter appears to measure heating and cooling energy drawn from the loop by the heat pump (operator equipment page; not stated outright). Bylaw 17943 (2022 consolidation, read by Claude): variable rate $0.0269/kWh | `blatchfordAdvisor2023` Utility Advisor response to the Blatchford 2024 rate filing (25 Oct 2023, Utility Committee 3 Nov 2023, FCS02051): customers forecast 181 in 2024 (down from 217) and 292 in 2025; revenue shortfall $1,324,700 (2024) and $863,600 (2025); viability "rides on increasing customers as quickly as possible". Operator page (Jan 2025): over 100 homes connected. Earlier plan (2020–2023) had forecast 1,409 customers by 2023. The 2021–2024 plan table reads 3,031 MWh cumulative to 2024 in one extraction and up to 5,562 MWh in another; to check against the original. Borefield used for seasonal storage of summer heat (operator pages, no measured data) | `edmDEstrategy2024` City of Edmonton, Implementing Edmonton District Energy Strategy (IIS02148, Urban Planning Committee 27 Feb 2024): seeks private-sector partner(s) through procurement; raises a private partner acquiring established City-owned systems such as Blatchford; lists expanding Blatchford as a next step; does not mention waste heat, data centres or ambient loops | `buffa2019` Buffa et al. 2019, 5th generation district heating and cooling systems: a review of existing cases in Europe, Renewable and Sustainable Energy Reviews 104:504–522: FGZ Friesenberg, Zürich (2014), "an HE is installed for direct heat recovery from a data center" (p. 515), network supply 8–28 °C; in summer the warm pipe reaches about 30 °C after the data centre, limiting free cooling downstream; borehole count inconsistent in the paper (332 vs 153). FGZ factsheet (Swiss Federal Office of Energy support): data-centre waste heat 9 MW, 27 GWh/a, 450 boreholes as seasonal storage (18 GWh); not stated as measured | `bfe2023dc` BFE/EnergieSchweiz 2023, Abwärmenutzung von Rechenzentren (Kulemann et al.): data-centre heat can enter a low-temperature network without a boost if taken out above 32 °C (p. 20); fictional 20 MW IT case: 48% of waste heat used with a 25 MW network, 12% with a 5 MW network (p. 24); data-centre waste heat has hardly had a price (p. 26); operators plan over 10–15 years, heat networks over 30–40 (p. 5). Canton of Zürich RRB 1340/2025: waste heat above 2 GWh must be offered to third parties at production cost

### Seasonal stored heat  (`stored_heat`)

- Stage: What it could become · unit: MWh · level: Civic
- Inputs (formula arguments): heat_delivered, ground
- Fed by (diagram links): heat_delivered, ground · feeds: storage_footprint, btes, hourly_overlap
- Trust: own 80 / 100 · weakest input (chain) 50 / 100 · status: in hand

```
stored_heat = f(heat_delivered, ground)
ρ c V ΔT × efficiency (0.3–0.7)
```

Coefficients: ρc 1,238–2,683 kJ/m³K; Drake Landing 0.06 → 0.54

Sources: `drake` Drake Landing BTES efficiency measured 0.06 → 0.54 over ten years (Mesquita et al. 2017)

### EV charging stalls supported  (`ev_stalls`)

- Stage: What it could become · unit: stalls · level: Everyday
- Inputs (formula arguments): spare_capacity
- Fed by (diagram links): spare_capacity · feeds: ev_area, ev_repay
- Trust: own 70 / 100 · weakest input (chain) 50 / 100 · status: confirmed

```
ev_stalls = f(spare_capacity)
P_reserved ÷ (SF × P_charger), SF 0.5–1 (corrected 18 Oct 2026: SF divides, it does not multiply)
```

Coefficients: Level 2 7.4–19.2 kW; DCFC 50–350 kW; SF 0.5 is the value Silber, Scheubner and Märtz 2024 found for fast-charging sites (“in most cases”; checked 18 Oct 2026); for Level 2 it is a transfer, so the range runs to SF 1 (all at once)

Sources: `wsuEV` WSU Energy Program, charging speeds and specs | `vanDCFC` City of Vancouver, EV charging by-law amendment, DCFC 25–400 kW | `silber2024` Silber, Scheubner, Märtz 2024, IJEPES 155:109540, simultaneity 0.5 | `inlL2_2015` INL/EXT-15-36313 (2015), public Level 2 use: starts concentrate at the start of the work day; drivers "rarely initiate their away-from-home charging before 6 a.m. or after 7 p.m."; DC fast charging leans to the end of the work day | `uclaWorkplace` Winn, Electric Vehicle Charging at Work (UCLA Luskin, ChargePoint data 2011–15): workplace session starts | `dunskyNRCan2024` Dunsky for NRCan (Feb 2024), EV charging infrastructure for Canada, Table 12 installed cost per port (2022 CAD): DC fast $160k at 125 kW (2025), $240k at 175 kW (2030); Level 2 $15k (2025), $10k (2030); grid upgrades excluded; fleets charge overnight at depots | `vanUses2026` Vancouver Zoning By-law s. 2 definitions and district schedules (2026): no stand-alone EV charging use | `edmUses2026` Edmonton Zoning Bylaw 20001 s. 8.10 use definitions: no EV charging use; Urban Agriculture ("hydroponic or aquaponic systems, and vertical farms") permitted in MU, IM, BE, CB, within or on a building (MU ≤600 m²); Community Service incl. shelters permitted in MU and BE (BE ≤500 m² except shelters); Minor Utility includes "district heating plants" (IM, BE); Major Utility includes "cooling plants"

### People sheltered  (`refuge_people`)

- Stage: What it could become · unit: people · level: Everyday
- Inputs (formula arguments): offerable_area, backup_hours
- Fed by (diagram links): offerable_area, backup_hours · feeds: importance_cat, refuge_after_quake
- Trust: own 80 / 100 · weakest input (chain) 60 / 100 · status: in hand

```
refuge_people = f(offerable_area, backup_hours)
usable area ÷ 3.5 m² per person; 0.75 m between beds (BC group lodging)
```

Coefficients: BC ESS / JIBC group lodging: 3.5 m² per person, 0.75 m between beds (p. 35) — the earlier '2 m between beds' had no source (corrected 19 Oct 2026); Edmonton group-lodging spacing not read; cold need: Edmonton 6.1–6.5 days/yr with daily max ≤ −20 °C, extreme min −48 °C; Vancouver 0 days (ECCC Normals 1991–2020)

Sources: `ess` BC ESS / JIBC group lodging 3.5 m² per person; Edmonton shelter standard 2 m between beds; Health Canada cleaner-air spaces MERV 13+, 2–3 ACH (Formulas sheet) | `eccc` ECCC Canadian Climate Normals 1991–2020, station data CSV (BC, AB), climate.weather.gc.ca | `jibcGroupLodging` JIBC / BC Emergency Support Services, Introduction to Group Lodging participant guide: 3.5 m² per person, 0.75 m between beds (p. 35); facilities 'will only be opened up if they are suitable and have power' (p. 44)

### Greenhouse area heated  (`greenhouse_area`)

- Stage: What it could become · unit: m² · level: Civic
- Inputs (formula arguments): heat_delivered, heat_temp
- Fed by (diagram links): heat_delivered, heat_temp · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 50 / 100 · status: transferred

```
greenhouse_area = f(heat_delivered, heat_temp)
Q_delivered ÷ q_greenhouse; supply temperature check: root-zone ~38 °C ok, pipe-rail 82 °C needs heat pump
```

Coefficients: 1.63 (Ontario measured) – 2.1 (Manitoba) GJ/m²·yr; BC/AB figure not found

Sources: `manitobaGH` Manitoba Agriculture greenhouse energy calculations, 2.1 GJ/m²·yr | `iesoGH` IESO Greenhouse Energy Profile Study 2019, Exhibits 53, 73 | `giacomelli` Giacomelli, greenhouse heating lecture notes (U-values, 82 °C pipe-rail) | `rootZone` UConn/UVM Extension, root-zone heating ~38 °C | `abGreenhouse2017` Alberta Agriculture and Forestry AGDEX 821-59 (2018, 2017 survey): greenhouse capital investment per m² | `vanUses2026` Vancouver Zoning By-law s. 2 definitions and district schedules (2026): no stand-alone EV charging use | `edmUses2026` Edmonton Zoning Bylaw 20001 s. 8.10 use definitions: no EV charging use; Urban Agriculture ("hydroponic or aquaponic systems, and vertical farms") permitted in MU, IM, BE, CB, within or on a building (MU ≤600 m²); Community Service incl. shelters permitted in MU and BE (BE ≤500 m² except shelters); Minor Utility includes "district heating plants" (IM, BE); Major Utility includes "cooling plants"

### Fish production supported  (`aquaculture_tonnes`)

- Stage: What it could become · unit: t/yr · level: Civic
- Inputs (formula arguments): heat_delivered, heat_temp
- Fed by (diagram links): heat_delivered, heat_temp · feeds: —
- Trust: own 70 / 100 · weakest input (chain) 50 / 100 · status: confirmed (peer-reviewed full texts; Norwegian/Romanian climates transferred)

```
aquaculture_tonnes = f(heat_delivered, heat_temp)
tonnes = heat_delivered ÷ heat_per_kg; heat_per_kg 2.9 kWh/kg (make-up water only, 5→12 °C, Ayuso-Virgili 2023) to 4.6 kWh/kg (Luke, 15.5 °C trout); or per tank volume 300–600 kWh/m³·yr (Ion 2022, Galați, scale by HDD); or from first principles V × 1.16 × ΔT
```

Coefficients: Ayuso-Virgili 2023: 9.589 kWh/kg total, freshwater thermal 30.1% (2.9 kWh/kg); Nistad 2020: measured smolt 5.1–12.8 mean 8.8 kWh/kg, heat pump ≈10–15% of total (COP 3 → 2.6–4 kWh/kg heat); Luke 4.6 kWh/kg; trout 9–14 °C (FAO); DFO BC model at 15 °C

Sources: `ayuso2023` Ayuso-Virgili et al. 2023, Aquacultural Engineering 101:102314, energy demand of a salmon RAS (simulated) | `nistad2020` Nistad 2020, NTNU MSc thesis, Energy use and efficiency in RAS (Norwegian smolt facilities) | `ion2022` Ion, Popescu, Coman et al. 2022, Energy Reports 8:11707–11714, Heat requirement in an indoor RAS | `lukeRAS` Luke/KAMK webinar 29 Oct 2025 (Laajala): 4.6 GWh/yr heating for 1,000 t/yr rainbow trout | `faoTrout` FAO rainbow trout fact sheet, 9–14 °C | `dfoRAS` DFO CSAS SAR 2008/001 closed containment | `faoRAS2022` Bregnballe, A guide to recirculation aquaculture (FAO/Eurofish 2022), pp. 53–54: total investment "between EUR 12 to EUR 20 (or more) per kg produced per year"; simple outdoor grow-out ≈€6/kg | `edmUses2026` Edmonton Zoning Bylaw 20001 s. 8.10 use definitions: no EV charging use; Urban Agriculture ("hydroponic or aquaponic systems, and vertical farms") permitted in MU, IM, BE, CB, within or on a building (MU ≤600 m²); Community Service incl. shelters permitted in MU and BE (BE ≤500 m² except shelters); Minor Utility includes "district heating plants" (IM, BE); Major Utility includes "cooling plants" | `vanUses2026` Vancouver Zoning By-law s. 2 definitions and district schedules (2026): no stand-alone EV charging use

### Algae dry mass supported  (`algae_kg`)

- Stage: What it could become · unit: kg/yr · level: Civic
- Inputs (formula arguments): heat_delivered, heat_temp
- Fed by (diagram links): heat_delivered, heat_temp · feeds: —
- Trust: own 70 / 100 · weakest input (chain) 50 / 100 · status: peer-reviewed, transferred

```
algae_kg = f(heat_delivered, heat_temp)
Q ÷ 217 kWh/kgDW at 24 °C
```

Coefficients: Chlorella, industrial plant, Italy

Sources: `gurreri2023` Gurreri et al. 2023, Chem. Eng. Trans. 105:229, Chlorella thermoregulation 217 kWh/kgDW

### Insect rearing heat  (`insect_check`)

- Stage: What it could become · unit: kWh/kg · level: Technical
- Inputs (formula arguments): heat_temp
- Fed by (diagram links): heat_temp · feeds: —
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: peer-reviewed (mealworm) and government-commissioned (BSF)

```
insect_check = f(heat_temp)
mealworm: 2.88 kWh heating per kg live (Dreyer et al. 2021, Austria); BSF: 3,404 kWh heat per tonne substrate input (Öko-Institut 2022); rearing 27–35 °C
```

Sources: `dreyer2021` Dreyer et al. 2021, Int J LCA 26:2232, mealworm heating 10.38 MJ/kg | `oekoBSF` Öko-Institut for UBA 2022, BSF facility heat 3,404 kWh per tonne input | `schon2024` Schøn et al. 2024, J. Insects as Food and Feed, BSF rearing temperatures

### Clean-air room volume served  (`clean_air_volume`)

- Stage: What it could become · unit: m³ · level: Everyday
- Inputs (formula arguments): offerable_area
- Fed by (diagram links): offerable_area · feeds: —
- Trust: own 80 / 100 · weakest input (chain) 60 / 100 · status: in hand

```
clean_air_volume = f(offerable_area)
cleaned airflow ÷ (2–3 ACH); MERV 13+; < 26 °C
```

Coefficients: Health Canada 2020

Sources: `ess` BC ESS / JIBC group lodging 3.5 m² per person; Edmonton shelter standard 2 m between beds; Health Canada cleaner-air spaces MERV 13+, 2–3 ACH (Formulas sheet) | `smoke2026` Wildfire smoke: Alberta counts a smoke day as daily PM2.5 above 15 µg/m³; northern Alberta stations had more than 100 smoke days in 2023 (Edmonton values only in a chart); Metro Vancouver had a 14-day wildfire smoke advisory in 2018 and two multi-day smoke advisories in 2023; smoke affected Metro Vancouver air in seven of the last ten years (2024 summary). No official annual smoke-hour counts for either city

### Copper in the facility  (`copper_tonnes`)

- Stage: What it could become · unit: t · level: Civic
- Inputs (formula arguments): it_load_actual
- Fed by (diagram links): it_load_actual · feeds: —
- Trust: own 50 / 100 · weakest input (chain) 50 / 100 · status: industry estimate

```
copper_tonnes = f(it_load_actual)
MW × 20–40 t/MW
```

Coefficients: CDA 2023 (industry)

Sources: `cda2023` Copper Development Association 2023, copper in data centres, 20–40 t/MW

### People a cooling room can hold  (`cooling_centre_people`)

- Stage: What it could become · unit: people · level: Everyday
- Inputs (formula arguments): spare_cooling, offerable_area
- Fed by (diagram links): spare_cooling, offerable_area · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 40 / 100 · status: derived

```
cooling_centre_people = f(spare_cooling, offerable_area)
spare cooling kW ÷ (0.108 kW per seated person + envelope gains); keep ≤ 26 °C
```

Coefficients: 108 W seated, 126 standing, 207 W walking 3.2 km/h (ASHRAE via EnergyPlus; 180 W is 'walking about, office'); 26 °C Health Canada 2026; need: Vancouver Intl 5.7 days/yr humidex ≥30, Edmonton 10.5 (≥35: Edmonton ~1/yr; ECCC Normals 1991–2020); note 2021 heat dome exceeds normals

Sources: `ess` BC ESS / JIBC group lodging 3.5 m² per person; Edmonton shelter standard 2 m between beds; Health Canada cleaner-air spaces MERV 13+, 2–3 ACH (Formulas sheet) | `healthCanada2026` Health Canada 2026, upper indoor temperature limits (26 °C) | `eccc` ECCC Canadian Climate Normals 1991–2020, station data CSV (BC, AB), climate.weather.gc.ca | `vanUses2026` Vancouver Zoning By-law s. 2 definitions and district schedules (2026): no stand-alone EV charging use | `edmUses2026` Edmonton Zoning Bylaw 20001 s. 8.10 use definitions: no EV charging use; Urban Agriculture ("hydroponic or aquaponic systems, and vertical farms") permitted in MU, IM, BE, CB, within or on a building (MU ≤600 m²); Community Service incl. shelters permitted in MU and BE (BE ≤500 m² except shelters); Minor Utility includes "district heating plants" (IM, BE); Major Utility includes "cooling plants"

### Homes heated by distributed servers  (`distributed_servers_homes`)

- Stage: What it could become · unit: homes · level: Civic
- Inputs (formula arguments): servers
- Fed by (diagram links): servers · feeds: —
- Trust: own 40 / 100 · weakest input (chain) 40 / 100 · status: design paper only

```
distributed_servers_homes = f(servers)
servers ÷ (37–114 servers per home at 0.35 kW)
```

Coefficients: Liu et al. 2011 (US climate zones); Qarnot/heata operator claims

Sources: `liu2011` Liu et al. 2011, The Data Furnace

### E-waste  (`ewaste`)

- Stage: What it could become · unit: kg/yr · level: Civic
- Inputs (formula arguments): servers
- Fed by (diagram links): servers · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 50 / 100 · status: manufacturer

```
ewaste = f(servers)
servers × mass ÷ 6 yr
```

Coefficients: 26.3 kg (2U); 21.25 kg (1U)

Sources: `dell` Dell carbon-footprint PDFs: R740 26.3 kg, R540 25.4 kg (2U); R650 21.25 kg (1U); Danczak 2018 rare earths; Graedel 2011 copper | `epraBC` EPRA BC / Return-It Electronics: accepts "Desktop computers (including those acting as servers)" and IT/telecom gear; loose batteries not accepted; Large Volume Generator pickup with a 3-pallet minimum; approved primary processors (Dec 2023): FCM Recycling (Delta), eCycle Solutions (Chilliwack), Quantum Lifecycle Partners and Hi Tech Recyclers (Edmonton) | `armaElectronics` Alberta Recycling Management Authority electronics program: "Blade (rack mount), desktop and floor standing servers" covered, for consumer, industrial or commercial use; registered processors incl. Hi-Tech Recyclers, Quantum Lifecycle Partners, YEG Electronics Recycling (Edmonton), Shanked Computer Recycling (Acheson), eCycle Solutions (Airdrie) | `cfsPlus` Computers for Schools Plus (ISED): BC affiliate BC Technology for Learning Society / ReuseTechBC (Burnaby; Windows 11-capable devices); Alberta Computers for Schools (Edmonton, Calgary) takes servers (≥4 cores) and recycles servers, switches, UPSs and lead batteries | `call2recycle` Call2Recycle Canada: dry-cell batteries up to 5 kg each (incl. sealed lead acid and Li-ion); larger UPS strings likely outside the program (inference); Alberta battery EPR from 1 Apr 2025 | `itsp40006` Canadian Centre for Cyber Security ITSP.40.006, IT Media Sanitization (supersedes ITSG-06; cites NIST SP 800-88 Rev. 1); Government of Alberta Secure Digital Media Sanitization Standard v2.0 (2023) uses NIST terms | `r2Van2026` SERI R2 certified facility directory, search within 100 miles of Vancouver (J.B. screenshot 16 Oct 2026): five active R2v3 facilities | `r2Edm2026` SERI R2 certified facility directory, search within 50 miles of Edmonton (J.B. screenshot 16 Oct 2026): two active R2v3 facilities

### Homes heated in the 2050s  (`homes_heated_2050s`)

- Stage: What it could become · unit: homes · level: Everyday
- Inputs (formula arguments): homes_heated, free_cooling_hours_2050s
- Fed by (diagram links): homes_heated, free_cooling_hours_2050s · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 50 / 100 · status: derived with a stated assumption

```
homes_heated_2050s = f(homes_heated, free_cooling_hours_2050s)
homes = heat available ÷ (space heat × HDD(2050s) ÷ HDD(now) + hot water)
```

Coefficients: space / hot-water split from CEUD 2023 (BC 46.2% / 27.1%; AB 63.1% / 23.2%); space heat assumed ∝ HDD, hot water unchanged; computed from PCIC (daily-mean HDD18): Vancouver 2,755 now → 2,198 (SSP2-4.5, −20%) / 2,038 (SSP5-8.5, −26%); Edmonton 5,389 → 4,659 (−14%) / 4,377 (−19%); published (RCP8.5, not like-for-like): Metro Vancouver −25%, Edmonton 5,657 → 4,331

Sources: `pcicWx3` PCIC future-shifted weather files v3 (PCIC-WX-3.0.1, 27 Jan 2025): based on CWEC 2020; 2040s–2080s; SSP1-2.6, 2-4.5, 5-8.5; 564 locations; shifts temperature, dew point, humidity, pressure; 'Heat waves or cold spells remain largely unchanged' (Sobie & Curry 2025, Data in Brief) | `mvClimate2016` Metro Vancouver Climate projections (2016), RCP8.5 2050s: HDD −25% (Table 16; summary says 29%), CDD 49 → 235, snowpack in supply watersheds 292 → 123 cm (−58%) | `emrbClimate2023` Edmonton Metropolitan Region Board climate resilience study (2023), RCP8.5 2050s: HDD 5,657 → 4,331, CDD 12 → 144, days ≥ 30 °C 1 → 11 (10th–90th percentile ranges)

### UPS batteries offered to the grid  (`ups_flex`)

- Stage: What it could become · unit: MWh; minutes · level: Civic
- Inputs (formula arguments): it_load_actual, flexible_load
- Fed by (diagram links): it_load_actual, flexible_load · feeds: peak_relief
- Trust: own 45 / 100 · weakest input (chain) 40 / 100 · status: operator claims only

```
ups_flex = f(it_load_actual, flexible_load)
flexible MWh = IT load × UPS minutes ÷ 60 × 0.5 (half held for outages)
```

Coefficients: UPS runtime 1–2 min (hyperscale), ~5 min (colocation), 10–15 min (financial) — vendor figures, operator claim; useful for fast frequency response, not for 4-hour peaks

Sources: `aeso_or` AESO, Operating reserve (ancillary services) | `bch_drb` BC Hydro, Demand Response for Business customer manual

### Battery storage  (`battery`)

- Stage: What it could become · unit: MW; MWh; m² · level: Civic
- Inputs (formula arguments): it_load_actual
- Fed by (diagram links): it_load_actual · feeds: peak_relief, battery_code_path
- Trust: own 70 / 100 · weakest input (chain) 50 / 100 · status: in hand (1 and 10 MW costs, 16 Oct 2026); fire code a gap

```
battery = f(it_load_actual)
MWh = MW × hours (1–8, default 4); area m² = kWh ÷ 34 (19–49)
```

Coefficients: round-trip 85% (NREL ATB 2024); PNNL 2022 LFP, 2021 US$ installed: 1 MW 518.59/kWh (2 h) and 448.34 (4 h), 10 MW 461.15 and 410.70 — about 10% above the 100 MW figure of 385; 2030: 340.46 (1 MW 4 h), 311.11 (10 MW 4 h); RTE 83% at the transformer, 2,400 cycles at 80% DOD, 16-year life; 34 ± 15 kWh/m² across built sites (Reber 2023); fire-code basis in BC/AB (NFPA 855 adoption) unconfirmed | 19 Oct 2026: cost range CAD 467–627/kWh (NREL 2025 US$334, 2024$, to PNNL 2022 1 MW 4 h US$448, 2021$; US$ × 1.3978, no inflation adjustment); O&M 2.5–4% of capex a year; 15 yr; cost per kW-year at 5.6% real compared with the programme value (Electricity card) | 19 Oct 2026: cost range CAD 467–627/kWh (NREL 2025 US$334, 2024$, to PNNL 2022 1 MW 4 h US$448, 2021$; US$ × 1.3978, no inflation adjustment); O&M 2.5–4% of capex a year; 15 yr; cost per kW-year at 5.6% real compared with the programme value (Electricity card) | 19 Oct 2026: cost range CAD 467–627/kWh (NREL 2025 US$334, 2024$, to PNNL 2022 1 MW 4 h US$448, 2021$; US$ × 1.3978, no inflation adjustment); O&M 2.5–4% of capex a year; 15 yr; cost per kW-year at 5.6% real compared with the programme value (Electricity card)

Sources: `pnnl2022fig43` PNNL-33283 (Viswanathan et al., Aug 2022), Figure 4.3 p. 24, Li-ion LFP total installed cost, 2021 (US$/kWh): 1 MW 2 h 518.59, 4 h 448.34; 10 MW 2 h 461.15, 4 h 410.70; 2030: 1 MW 4 h 340.46, 10 MW 4 h 311.11; fixed O&M 1 MW 4 h $5.05/kW-yr; RTE 83%, 2,400 cycles at 80% DOD, 16-year calendar life (read by Claude 16 Oct 2026; J.B. download) | `atb2024_batt` NREL Annual Technology Baseline 2024, Commercial Battery Storage | `pnnl2022` PNNL, Energy Storage Grand Challenge Cost and Performance Assessment 2022 (PNNL-33283) | `reber2023` Reber, Jarvis, Marshak, Beyond energy density: flow battery design driven by safety and location, RSC (2023), Table 1 | `mfrBESS` Battery energy storage, generic: 20 ft container ≈5 MWh / ≈2.5 MW, 6.06 × 2.44 × 2.90 m, ≈42 t (StarCharge, Sungrow data sheets); cabinet ≈3.9 MWh / 1–1.9 MW, 8.8 × 1.65 × 2.8 m, 38 t (Megapack 2 XL sheet filed with the CT Siting Council) | `nfpa855tia` NFPA 855-2023 as amended by TIA 23-1 and 23-2: ESS units separated by at least 3 ft (0.9 m), less with fire testing; rooftop units 3 ft apart, ≥5 ft from roof edge; Hydro One (Ontario utility standard) quotes §9.5.2.6.1: 10 ft (3 m) to lot lines, public ways and buildings, reducible to 3 ft. NFPA 855 is not referenced in the National Fire Code 2020 (Claude checked the local text: 35 NFPA standards cited, 855 not among them) or the BC Fire Code 2024 amendments; VBBL 2025 Book I, BCBC 2024 and NFC – 2023 Alberta Edition do not cite it either and have no energy-storage provisions (Claude checked the full texts, 16 Oct; J.B. downloads). So in both provinces battery spacing is not set by the building or fire code: it falls to the authority having jurisdiction, the electrical code and the listing (UL 9540/9540A) | `abESSstandata` Alberta STANDATA 21-ECV-064-900-ESS/19-BCB-010 (REV1): residential energy storage | `bchDG100` BC Hydro DG technical interconnection requirements ≤100 kW, Rev 3 (15 Jul 2026): covers "customer‑owned generators and energy storage systems" up to 100 kW net injection per phase; CSA C22.3 No. 9 and UL 1741; application and field-verification reviews. Larger (to 35 kV) per the 2010 requirements, which do not mention storage | `epcorDTtc2025` EPCOR Distribution & Transmission terms and conditions (1 Jan 2025): "Generating Facility" includes storage; Distribution Interconnection Agreement required; customer pays "all interconnection costs as determined by EDTI"; exporters must be Power Pool participants; micro-generation <5 MW | `nfcAB2023` National Fire Code – 2023 Alberta Edition (NRC, 2026 print; J.B. download 16 Oct 2026; Claude searched the full text): no reference to NFPA 855 and no energy-storage-system provisions (battery rules cover industrial-truck charging only, 3.1.3.3) | `nfpa855_2026` NFPA 855, 2026 edition (Free Access reader; J.B. screenshots 16 Oct 2026, read by Claude): applies above the Table 1.3 thresholds (lithium-ion 20 kWh per fire area or outdoor installation); outdoor ESS "separated by a minimum 10 ft (3 m)" from lot lines, public ways, buildings, stored combustibles and other exposures (9.6.2.7.1), reducible to 3 ft (0.9 m) with a 1-hour freestanding barrier, fire and explosion testing, or a 2-hour enclosure (9.6.2.7.1.1–5); remote outdoor installations more than 100 ft (30.5 m) from exposures (9.5.1); vegetation cleared within 10 ft (9.6.2.1.1); rooftop units over 20 kWh: from the roof edge at least the system height and not less than 5 ft (1.5 m), at least 10 ft (3 m) from the fire-service access point, units 3 ft (0.9 m) apart, 5 ft walkways, 10 ft to exposures on the roof (9.6.3.1.1.2, 9.6.3.1.1.3, 9.6.3.1.3). Not cited by any BC or Alberta code (see nfpa855tia) | `cec2024ESS` CSA C22.1:24 Canadian Electrical Code, Section 64 (read 19 Oct 2026, J.B. library copy): in force BC 4 Mar 2025, Alberta 1 Apr 2025 (Alberta Municipal Affairs notice, Apr 2025). Rule 64-1002: battery energy storage over 1 kWh must be certified (Rule 2-024), installed to the manufacturer's instructions, and | `nrelBatt2025` Cole, Ramasamy, Turan, NREL TP-6A40-93281, Cost Projections for Utility-Scale Battery Storage: 2025 Update (Jun 2025): US$334/kWh (2024$) 4 h; fixed O&M 4% of capex a year; 15-yr life; 85% round trip | `nrelATBcommBatt2024` NREL ATB 2024, Commercial Battery Storage: fixed O&M 2.5% of capital cost; 15 yr; 85%

### Sidewalk kept clear by its heat  (`snowmelt_area`)

- Stage: What it could become · unit: m² · level: Everyday
- Inputs (formula arguments): heat_delivered
- Fed by (diagram links): heat_delivered · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 50 / 100 · status: derived 19 Oct 2026

```
snowmelt_area = f(heat_delivered)
m² = heat offered (W) ÷ design heat per m²
```

Coefficients: Edmonton design 430–700 W/m² (NRC CBD 160, 1974: sheltered to very exposed); ASHRAE 2015 lists no Canadian city; Seattle, the nearest listed (27 snowfall hours a year), is used for Vancouver: 420–647 W/m² at the 99% level (snow-free area ratio 0.5 to 1), about 36 kWh/m² a year at ratio 0.5; low-temperature fluid works (Holland MI 35 °C, Klamath Falls 38 °C); snow (ECCC normals 1991–2020): Vancouver 36.6 cm a year, 7.4 days with snowfall, 8.2 days with at least 1 cm on the ground; Edmonton 126.7 cm, 54.7 days, 145.1 days; no data-centre snowmelt built (gap)

Sources: `nrcCBD160` Williams, Snow melting systems, NRC Canadian Building Digest 160 (1974), Tables II–III: Edmonton design heat 40 (sheltered) to 60–65 W/ft² (very exposed), about 430–700 W/m²; 65 W/ft² to keep pavement bare and wet after a design storm | `ashrae2015ch51` ASHRAE Handbook | `lundSnow` Lund, Pavement snow melting, Geo-Heat Center (OSTI 895225): ASHRAE classes from 1995 data, Portland OR 86/97/111 Btu/h·ft² (about 271/306/350 W/m²); Klamath Falls deck at 50 Btu/h·ft² (about 158 W/m²) with 38 °C fluid | `hollandSnow` City of Holland, Michigan, Snowmelt system: about 690,000 ft² of heated sidewalks and streets, water at 95 °F (35 °C) from power-plant waste heat, since 1988 (City claim) | `ecccNormals2020` ECCC Canadian Climate Normals 1991–2020, Vancouver International (Airport) and Edmonton (Airport), CSV (J.B. download 19 Oct 2026): snowfall 36.6 / 126.7 cm a year; days with snowfall ≥ 0.2 cm 7.4 / 54.7; days with snow depth ≥ 1 cm 8.2 / 145.1, ≥ 5 cm 4.4 / 120.5; average vapour pressure July 1.5 / 1.4 kPa | `edmSidewalk` City of Edmonton, Sidewalk snow removal: property owners clear adjacent sidewalks; $100 fine plus the cost of removal | `edmEncroach` City of Edmonton, Encroachment agreement application form: road right-of-way encroachments and structures on City streets, fee $300 or $500 with circulation (heated sidewalks not named) | `edmFees2026` City of Edmonton, 2026 Planning and Development Fee Schedules (effective 1 Jan 2026, updated Dec 2025)

### Hot or chilled water tank  (`tes_volume`)

- Stage: What it could become · unit: m³ · level: Technical
- Inputs (formula arguments): heat_captured, demand_profile
- Fed by (diagram links): heat_captured, demand_profile · feeds: —
- Trust: own 75 / 100 · weakest input (chain) 50 / 100 · status: physics; costs a gap

```
tes_volume = f(heat_captured, demand_profile)
litres per kWh = 3,600 ÷ (4.18 × ΔT) ÷ 0.85
```

Coefficients: 144 L/kWh at ΔT 6 K, 29 L/kWh at 30 K (physics); ice ≈ 10.5 kg per kWh; usable share 0.85 and tank heights are assumptions; costs too wide to use (IRENA range)

### Cooling for neighbours from waste heat  (`absorption`)

- Stage: What it could become · unit: kW cooling · level: Civic
- Inputs (formula arguments): heat_temp, heat_captured
- Fed by (diagram links): heat_temp, heat_captured · feeds: —
- Trust: own 65 / 100 · weakest input (chain) 50 / 100 · status: in hand

```
absorption = f(heat_temp, heat_captured)
cooling = recovered heat × COP, if temperature allows
```

Coefficients: 18 Oct 2026 (J.B. decisions, heat items 1–7; audit/heat_items_sources_2026-10-18.md): absorption ≥70–90 °C (single-effect ≥90, two-stage 70–80; Chen et al. 2026); adsorption from about 45–65 °C (LRZ CoolMUC-2 from 45 °C, operator; Meyer et al. 2013, ~65 °C, preprint). Air-cooled 25–47 °C: heat pump first (possible with a change); liquid-cooled 50–60 °C: adsorption possible, absorption with a heat pump. Earlier: single-effect absorption needs ≥90 °C, COP 0.6–0.7; two-stage 70–80 °C, COP <0.4 (Energies 2026); data-centre heat 25–35 °C air-cooled (no), 50–60 °C liquid-cooled (only with a heat-pump lift)

Sources: `absorption2026` Absorption chiller temperatures and COP (Energies 19(9):2147, 2026) | `lrzCoolMUC` OPERATOR (LRZ, public computing centre) documentation: CoolMUC-2 adsorption chillers cooled the centre's own equipment from 45 °C waste heat; shut off 13 Dec 2024 | `meyer2013` Meyer, Ries, Solbrig, Wettig 2013, iDataCool: HPC with hot-water cooling and energy reuse, arXiv 1309.4887 (preprint, not peer-reviewed): adsorption chiller driven at ~65 °C, standby below ~55 °C

### Seasonal ground store for neighbours  (`btes`)

- Stage: What it could become · unit: MWh/yr · level: Civic
- Inputs (formula arguments): heat_captured, stored_heat, receiver_demand
- Fed by (diagram links): heat_captured, stored_heat, receiver_demand · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 50 / 100 · status: in hand; COP a gap

```
btes = f(heat_captured, stored_heat, receiver_demand)
heat out = η × heat stored; boreholes = charge W ÷ 47–83 W/m ÷ 35–55 m
```

Coefficients: η 0.45 steady state (simulated), 0.32–0.56 measured years 3–10, 0.06–0.21 in years 1–2 (Drake Landing, Okotoks); a 0.9 MW data-centre design: 240 boreholes, 55 m deep, 3 m apart, 1,863 m², waste-heat use 77 → 96 %, ~17-yr payback (Li et al. 2021); heat-pump COP for the lift not given (gap)

Sources: `drake_landing` Drake Landing Solar Community, Okotoks AB: measured BTES performance (Sibbitt et al. 2012; Mudasar et al., CSME 2020) | `li2021_dcbtes` Li et al. (2021), borehole thermal energy storage for a 0.9 MW data centre (peer-reviewed design study) | `agsGround2009` Alberta Geological Survey OFR 2009-09 (Hastings Lake, east of Edmonton): undisturbed ground 6.1 °C to about 25 m; in-situ conductivity 1.74–2.01 W/m·K, design 1.90. Vancouver: no city-specific measurement found; national map 6–12 °C (GSC OF 6914)

### Firefighting water for neighbours  (`fire_water`)

- Stage: What it could become · unit: rule · level: Everyday
- Inputs (formula arguments): water_supply
- Fed by (diagram links): water_supply · feeds: —
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: rules read 19 Oct 2026

```
fire_water = f(water_supply)
a tank on the lot, non-potable, for the fire department after an earthquake; drinking water makes the operator a water supplier
```

Coefficients: BCBC 2024 and NBC 3.2.5.7 (Alberta uses the NBC Alberta Edition, same clause per the NFC(AE) cross-reference): every building has water for firefighting; a sprinklered building is deemed to comply; where city supply is limited, a supply on site may be needed, sized for at least 30 minutes of fire-department hose streams (NFPA 1142 and the ISO fire flow guide named; volume not sized: standards not read). Vancouver: sprinklers rely on the mains; the seismic saltwater system (DFPS) covers downtown, part of Kitsilano and to VGH and takes about 80 years to complete. BC DWPR: a non-potable, unconnected, marked supply needs no permit; drinking water needs construction and operating permits. Alberta: drinking water piped to neighbours makes it a private utility waterworks (Potable Water Regulation s. 1(1)(l)); a registration if it only passes on city water, an approval if it draws its own source (Activities Designation Regulation)

Sources: `bcbc2024_3257` BC Building Code 2024, Div. B 3.2.5.7 and Note A-3.2.5.7.(1) (local copy data/raw/codes/bcbc2024.pdf): every building has an adequate water supply for firefighting; sprinklered or standpiped buildings are deemed to comply (except some mass timber); where municipal supply is limited, supplemental supply on site may be needed; on-site volume for at least 30 minutes of fire-department hose streams; ISO Needed Fire Flow Guide, NFPA 1142 and AWWA named as useful | `nfcAB2023_5635` National Fire Code 2023 Alberta Edition, Div. B 5.6.3.5 (local copy data/raw/codes/nfc_ab2023.pdf): water supply for firefighting on construction sites, cross-referencing Note A-3.2.5.7 of the NBC(AE), the same building clause as BCBC 3.2.5.7 (NBC 2020 3.2.5.7 checked in data/raw/codes/nbc.txt) | `bcab2005` BC Building Code Appeal Board decision 2005, quoting BCBC Div. B 3.2.5.7.(1) and Note A-3.2.5.7.(1): every building has an adequate water supply for firefighting; on-site storage for at least 30 minutes of fire-department hose streams; NFPA 1142 as the reference | `vanOEM2018` City of Vancouver, Office of Emergency Management memo, Fire risks following an earthquake (4 Jun 2018), p. 5–9: two saltwater pump stations and a seismic network (DFPS), limited in scope (downtown, part of Kitsilano, to VGH); sprinklers rely on mains; network complete in about 80 years; City wells only for emergency drinking water | `bcDWPR` BC Drinking Water Protection Regulation, s. 1, 3.1(b), 6–7: a water supplier needs construction and operating permits; a system not for drinking or food, not connected and marked is exempt | `abPWR277` Alberta Potable Water Regulation, Alta Reg 277/2003 (consolidated to 199/2025, current as of 27 Aug 2025; J.B. download 19 Oct 2026; data/raw/codes/ab_potable_water_reg_277_2003.pdf), s. 1(1)(l): a private utility is a waterworks system owned and operated by anyone other than a municipality, development owner or similar, except one serving only a single family dwelling or farmstead; s. 1(2): applies only to waterworks listed in the Activities Designation Regulation (not read); s. 4: designs stamped by a professional engineer | `abADR276` Alberta Activities Designation Regulation, Alta Reg 276/2003 (CanLII, J.B. download 19 Oct 2026), Sch. 1 Div. 5 (approval): a waterworks system that is a private utility and draws surface water or groundwater other than high-quality groundwater; Sch. 2 Div. 5 (registration): a private utility using high-quality groundwater, or one that consists solely of a distribution system supplied with potable water from an approved or registered waterworks

### Storage footprint  (`storage_footprint`)

- Stage: What it could become · unit: m² · level: Technical
- Inputs (formula arguments): stored_heat
- Fed by (diagram links): stored_heat · feeds: —
- Trust: own 80 / 100 · weakest input (chain) 50 / 100 · status: confirmed

```
storage_footprint = f(stored_heat)
pit storage ≈ 20.15 V^0.61; ~47–97 kWh/m³; tank rule ~30 m³/MWh
```

Coefficients: DEA ch.140 (text after Table 2): footprint = 20.15 × V^0.61; PlanEnergi 2025: 100,000 m³ → 23,100 m² design, ~26,000 m² realistic; specific footprint 15.4 × V^−0.369; heat-pump plant (DEA Aug 2026, sheet 40, waste-heat source): 100 m²/MW_heat at 1 MW, 50 at 3 MW, 30 at 10 MW (ranges 50–200 / 30–100 / 20–60); electric boiler and gas boiler ≈ 0–10 m²/MW

Sources: `dea` Danish Energy Agency, Technology Data for Electricity and District Heating Production, data sheet updated August 2026 (2025 EUR): sheets 40 (compression heat pumps, waste heat 1/3/10 MW; air-source), 41 (electric boilers), 44 (gas boilers), 140 (pit storage) | `mfrBESS` Battery energy storage, generic: 20 ft container ≈5 MWh / ≈2.5 MW, 6.06 × 2.44 × 2.90 m, ≈42 t (StarCharge, Sungrow data sheets); cabinet ≈3.9 MWh / 1–1.9 MW, 8.8 × 1.65 × 2.8 m, 38 t (Megapack 2 XL sheet filed with the CT Siting Council) | `nfpa855tia` NFPA 855-2023 as amended by TIA 23-1 and 23-2: ESS units separated by at least 3 ft (0.9 m), less with fire testing; rooftop units 3 ft apart, ≥5 ft from roof edge; Hydro One (Ontario utility standard) quotes §9.5.2.6.1: 10 ft (3 m) to lot lines, public ways and buildings, reducible to 3 ft. NFPA 855 is not referenced in the National Fire Code 2020 (Claude checked the local text: 35 NFPA standards cited, 855 not among them) or the BC Fire Code 2024 amendments; VBBL 2025 Book I, BCBC 2024 and NFC – 2023 Alberta Edition do not cite it either and have no energy-storage provisions (Claude checked the full texts, 16 Oct; J.B. downloads). So in both provinces battery spacing is not set by the building or fire code: it falls to the authority having jurisdiction, the electrical code and the listing (UL 9540/9540A)

### Own gas plant: heat with the power  (`chp_heat`)

- Stage: What it could become · unit: MW heat per MW electric · level: Civic
- Inputs (formula arguments): it_load_actual
- Fed by (diagram links): it_load_actual · feeds: —
- Trust: own 70 / 100 · weakest input (chain) 50 / 100 · status: derived 19 Oct 2026

```
chp_heat = f(it_load_actual)
heat = electric output ÷ power-to-heat ratio; total efficiency 66–80%
```

Coefficients: reciprocating engines 0.8–2.0 MW of heat per MW of power (27–41% electric, 77–80% total, HHV); gas turbines 0.9–1.7 (24–36%, 66–71%) (US EPA 2015, derived from Table 1-3). Rules: Clean Electricity Regulations, units ≥ 25 MW on fossil fuel, 65 t CO2/GWh from 2035 (held in abeyance in Alberta); Alberta TIER $95/t in 2026, sites ≥ 100,000 t a year; BC: waste discharge authorization above 5 MW of combustion; self-supply legal in BC (UCA s. 1(d)) and Alberta (EUA s. 2(1)(b): consumed solely on the producer's own or rented property); Alberta Reg 117/2026 (read in full): data centres of 75 MW or more from the transmission system may be tethered to new generation or storage able to supply at least their maximum demand, located anywhere (no location is set) and of any fuel (the AESO's first intake is gas only, a proposal); tethered requests are processed first (s. 6); bridged service up to 3 years (s. 9); in a supply shortfall large data centres are cut before everyone else (s. 10); the AESO may require zoning approvals and water licences first (s. 7); the regulation expires 31 May 2035

Sources: `epaCHP2015` US EPA Combined Heat and Power Partnership, Catalog of CHP Technologies (2015), Table 1-3 p. 1-6: reciprocating engines 27–41% electric, 77–80% total (HHV); gas turbines 24–36% / 66–71%; power-to-heat ratio 0.5–1.2 and 0.6–1.1 | `sor2024_263` Clean Electricity Regulations, SOR/2024-263, s. 5(1) (units ≥ 25 MW burning fossil fuel, connected to a NERC-standard grid) and s. 9(1) (65 t CO2 per GWh, 2035–2049) | `caAbMOU2026` Canada–Alberta Implementation Agreement backgrounder (15 May 2026): Clean Electricity Regulations held in abeyance in Alberta during a court reference; TIER price $95/t (2026), $100 (2027–29), $130 (2035), $140 (2040) | `emaWDA` BC Government, Waste discharge authorization | `bcUCAs1` BC Utilities Commission Act s. 1 "public utility" | `euaS2` Alberta Electric Utilities Act, SA 2003 c E-5.1 (office consolidation current as of 6 Feb 2026; local copy data/raw/codes/eua.txt), s. 1(1)(vv.1) self-supply = production on a property the person owns or rents where any of it is consumed on that property by that owner or tenant; s. 2(1)(b) the Act does not apply to self-supply consumed solely on that property by that owner or tenant | `alta117_2026` Data Centre Regulation, Alta Reg 117/2026 under the Electric Utilities Act (King's Printer extract, current as of 9 Jun 2026; J.B. PDF 16 Oct 2026). s. 1: data centre includes hosting/cloud, digital asset mining, AI/ML, content delivery. s. 2: "large data centre" = maximum demand directly from the transmission system of 75 MW or more, or a lower threshold the AESO sets for reliability. s. 3: AESO may aggregate integrated data centres on the same or adjacent parcels with the same owner or affiliate. s. 5: a large data centre may be "tethered" to new or added generating units or energy storage able to supply at least its maximum demand, reliably and predictably (the Regulation does not limit the fuel; AESO's first intake does). s. 6: tethered requests processed first. s. 7: AESO may require site control, municipal zoning approvals, financing, permits or water licences. s. 8: no service above the tethered supply. s. 9: bridged service before the supply runs only once the plant is approved by the AUC, max 3 years, AESO may cap each and all bridged loads and suspend for unmet criteria. s. 10: inadequate supply

### Space for charging stalls  (`ev_area`)

- Stage: What it could become · unit: m² · level: Civic
- Inputs (formula arguments): ev_stalls
- Fed by (diagram links): ev_stalls · feeds: —
- Trust: own 90 / 100 · weakest input (chain) 50 / 100 · status: confirmed (both current)

```
ev_area = f(ev_stalls)
stalls × 13.75 m² net (≈ 22 m² with aisle) Vancouver; 14.3 / 23.4 Edmonton
```

Coefficients: Vancouver 2.5 × 5.5 m, aisle 6.6 m; Edmonton Bylaw 20001 Table 5.1.3: standard 5.5 × 2.6 m, 90° aisle 7.0 m (confirmed on current bylaw)

Sources: `vanParking` Vancouver Parking and Loading Design Supplement, 2.5 × 5.5 m | `edmParking` Edmonton Zoning Bylaw 12800 s.54.1 (superseded) | `edmBylaw20001` Edmonton Zoning Bylaw 20001 s.5.80 Table 5.1.3 (stalls) and s.5.120 (lighting, nuisance)

### Rare earth in drives  (`rare_earth`)

- Stage: What it could become · unit: g · level: Civic
- Inputs (formula arguments): servers
- Fed by (diagram links): servers · feeds: —
- Trust: own 70 / 100 · weakest input (chain) 50 / 100 · status: in hand

```
rare_earth = f(servers)
drives × 3–4 g
```

Coefficients: Danczak 2018

Sources: `dell` Dell carbon-footprint PDFs: R740 26.3 kg, R540 25.4 kg (2U); R650 21.25 kg (1U); Danczak 2018 rare earths; Graedel 2011 copper

### Solar on neighbours' roofs  (`community_solar`)

- Stage: What it could become · unit: rule · level: Everyday
- Inputs (formula arguments): rooftop_solar
- Fed by (diagram links): rooftop_solar · feeds: —
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: rules read 19 Oct 2026

```
community_solar = f(rooftop_solar)
BC: RS 2290 community generation, neighbours credited on their bills; Alberta: micro-generation on owned, leased or adjacent property, sized to own use
```

Coefficients: BC: net injection up to 2 MW, set by 24 kW per residential and 100 kW per commercial beneficiary (so 2 MW needs at least 84 households); beneficiaries get bill credits, not power; selling power directly to a neighbour fails the UCA s. 1(d) exclusion; credits at 10 ¢/kWh (BCUC G-64-26); each beneficiary takes at most 10–50% of the credits, by group size. Alberta: under the lesser of 5 MW and the service rating, on property owned or leased or adjacent to it, not more than the site's own use; panels on a leased neighbour's roof could serve the data centre (whether a roof lease counts as leased property is not confirmed); revenue-seeking sites are commercial generators

Sources: `bchSelfGen2026` BC Hydro, Self-generation rate updates (BCUC application ID 1323): RS 2289 from 1 Jul 2026, exports up to 100 kW per phase at 10 ¢/kWh; RS 2290 community generation, net injection up to 2 MW, set by 24 kW per residential and 100 kW per commercial beneficiary, bill credits only; BCUC G-64-26 sets net billing at 10 ¢/kWh for RS 2289 and RS 2290 (executive summary); beneficiaries may be anywhere in BC Hydro's service area (BC Hydro page) | `bchCustGen` BC Hydro, Customer generation and Community generation pages: at least two benefitting customers; each takes at most 50% (≤ 4 accounts), 25% (5–9) or 10% (≥ 10) of the credits; beneficiaries anywhere in the service area; community generation beneficiaries 'do not receive electricity directly from the facility' and must hold an active BC Hydro account | `bcucG6426` BCUC Order G-64-26 and Decision (24 Mar 2026): RS 1289 net metering closed 1 Jul 2026; RS 2289 net injection limit 100 kW per phase after the customer's load; 10 ¢/kWh for net generation | `bcUCAs1` BC Utilities Commission Act s. 1 "public utility" | `aucMicro2026` AUC, Micro-generation notice submission guideline (2026), p. 1, 4, 15: under the lesser of 5 MW or the service rating; on property the customer owns or leases, or adjacent owned or leased property; sized to the site's own use; revenue-seeking sites are commercial generators

### Backup power for neighbours in a blackout  (`backup_neighbours`)

- Stage: What it could become · unit: rule · level: Everyday
- Inputs (formula arguments): backup_hours
- Fed by (diagram links): backup_hours · feeds: —
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: rules read 19 Oct 2026

```
backup_neighbours = f(backup_hours)
only behind the data centre's own transfer switch, on a private line, with the utility's written approval; never through the utility's lines
```

Coefficients: BC: supplying anyone but itself, its employees or tenants makes it a public utility unless the minister (UCA s. 22) or BCUC (s. 88(3)) exempts it; an affiliate is a separate person (2026 BCCA 93, law-firm summary); BC Hydro: never energize a de-energized line. Edmonton: EPCOR bars extending a customer's wiring beyond its property (T&C s. 4.4, exception in Art. 8.3 not yet verified) and islanding without written approval (s. 7.6, 7.8). Spare generator capacity in a blackout is what the data centre's redundancy leaves, not sized here. Vancouver has 25 disaster support hubs, backup power not stated | 20 Oct 2026 (opps.js): who would need power most, within 1 km: care homes and hospitals (receivers: provincial licence lists, see receivers_nearby); buildings over 21 m from measured heights (Vancouver LiDAR 2022, Edmonton City 3D buildings) and over 39 m, read against BCBC 2024 / NBC(AE) 3.2.6.1 (residential top floor over 18 m: high building), 3.2.6.5 (firefighters' elevator), 3.2.7.9 (over 36 m: 2 h generator for elevators, fire pumps and smoke fans only); heights to the roof, so approximate. Main heating by CMA, SHEU 2019 Table 4.1: Vancouver furnace 39.25%, boiler 22.77% (M), electric baseboard or radiant 28.95%; Edmonton furnace 75.24%, boiler 19.21% (M), electric baseboard U (not published). BC Assessment's care beds, elevators and heating type exist for Vancouver only and are not used, to keep the cities equal

Sources: `bcUCAs1` BC Utilities Commission Act s. 1 "public utility" | `fasken2026` Fasken, BC Court of Appeal clarifies BCUC jurisdiction (12 Mar 2026; law-firm summary of Powell River Energy v. BCUC, 2026 BCCA 93): an affiliate is a separate person, so supplying it is not self-supply | `bchCTT2024` BC Hydro, Closed-transition transfer technical interconnection requirements (20 Mar 2024), s. 1.1 and 2.1: never energize a de-energized part of BC Hydro's system; momentary paralleling under 100 ms | `epcorIG2022` EPCOR Distribution & Transmission, Interconnection guide (2022), s. 7.6 and 7.8 p. 47–50: no island with part of EPCOR's system; intentional islanding only with EDTI's written approval; trip within 2 s | `epcorTC2025s44` EPCOR Distribution connection services terms and conditions (Jan 2025), s. 4.4 p. 19: a customer shall not extend its facilities beyond its own property (except as Art. 8.3 allows, not read); s. 6.5.2 p. 23: refund if a new customer shares an extension during the initial term | `vanHubs` City of Vancouver, Disaster support hubs: 25 hubs (mostly community centres); backup power not stated | `bcbc2024_326` BC Building Code 2024, 3.2.6.1 (high buildings: Group C floor level of the top storey more than 18 m above grade) and 3.2.6.5 (at least one elevator for use by firefighters); NBC(AE) the same Article | `sheu2019cma` NRCan, Survey of Household Energy Use 2019, Table 4.1 Number of households by CMA and main heating equipment | `bcResCare` Government of British Columbia, Residential Care Facilities (licensed community care facilities, maximum capacity; Open Government Licence – BC) | `abCCcompliance2026` Government of Alberta, Assisted Living and Social Services, Continuing Care Accommodation Standards compliance reporting as of June 2026 (Open Government Licence – Alberta)


## 7. What it would take

### Crossing type  (`crossing_type`)

- Stage: What it would take · unit: class · level: Technical
- Inputs (formula arguments): receivers, offerable_area
- Fed by (diagram links): receivers, offerable_area · feeds: standoff
- Trust: own 100 / 100 · weakest input (chain) 60 / 100 · status: rule

```
crossing_type = f(receivers, offerable_area)
pipes/cables/data only (easier) vs people inside (harder)
```

Coefficients: rule 9; diagrammatic only

Sources: `rule9` Handoff rule 9: diagrammatic only; nothing beyond public planning records (handoff §3)

### Hourly heat-demand profile  (`demand_profile`)

- Stage: What it would take · unit: MW · level: Technical
- Inputs (formula arguments): receiver_demand, weather
- Fed by (diagram links): receiver_demand, weather · feeds: tes_volume, hourly_overlap
- Trust: own 70 / 100 · weakest input (chain) 60 / 100 · status: computed from CWEC + STRATEGO method + NRCan 61% space-heat share; building-stock mix not applied

```
demand_profile = f(receiver_demand, weather)
hourly HDD = max(0, 16 − T_out); space heat ∝ HDD in season; DHW constant; losses ~15%
```

Coefficients: 18 Oct 2026 (J.B. decisions, heat items 1–7; audit/heat_items_sources_2026-10-18.md): busiest ÷ quietest month = 4.9 Vancouver, 5.0 Edmonton, with s = space ÷ (space + water heating), CEUD residential 2018–22 (BC 0.674, AB 0.761): month = s × CWEC HDD16 share + (1 − s) ÷ 12; replaces 3.9 / 3.3 (national 0.61). Earlier: Vancouver HDD 2,925 (VBBL 2014 Table 1.1.3.1); Edmonton HDD18 5,120 (NECB 2020 Table C-1, same data set as NBC 2020 Table C-2); computed from CWEC: monthly share of annual HDD16 — Vancouver Dec 0.170, Jan 0.166 … Jul/Aug 0.003; DJF 0.475, JJA 0.025 (winter/summer 19:1); Edmonton DJF 0.465, JJA 0.051 (9:1). With space heat 61% and DHW/losses flat (STRATEGO), peak month ÷ minimum month = 3.9 Vancouver, 3.3 Edmonton; ECCC Normals 1991–2020 HDD18: Vancouver Intl 2,781; Edmonton City (Blatchford) 5,126 — matches NECB 5,120; Edmonton Intl Airport 5,697 (the CWEC file is the airport, so Edmonton parcels run ~10% fewer HDD than its typical year); provincial space-heat share from CEUD 2023: BC 0.46, AB 0.63 (replaces national 0.61 in the profile)

Sources: `stratego` STRATEGO / Heat Roadmap Europe D2.2 hourly distributions | `vbblHDD` Vancouver Building By-law 2014 Table 1.1.3.1, HDD 2,925 | `necbHDD` NECB 2020 Table C-1 (CBHCC public review copy): Edmonton HDD18 5,120 | `eccc` ECCC Canadian Climate Normals 1991–2020, station data CSV (BC, AB), climate.weather.gc.ca | `ceud` NRCan Comprehensive Energy Use Database, 2023 data: Residential Table 2 (BC; Alberta) and Commercial/Institutional Table 3 (BC & Territories; Alberta) | `cwec` CWEC 2020 edition typical-year files, ECCC Engineering Climate Datasets (collaboration.cmc.ec.gc.ca …/CWEC_FMCCE/CWEC_FMCCE_v_2020): CAN_BC_VANCOUVER-INTL-A_1108395_CWEC.epw; CAN_AB_EDMONTON-INTL-A_3012216_CWEC.epw | `bchDR2026` BC Hydro Demand Response for Business customer manual (Aug 2026): events Nov–Mar, weekdays 6 am–10 pm, ≤4 consecutive hours, ≤2 a day, ≤20 a season; BC Hydro peaks on weekday evenings (2021 demand report); records 5–6 pm (Dec 2022 winter, Jul 2026 summer) | `aesoStats2025` AESO, Annual Market Statistics 2025, Table 13 (p. 55): operating reserve volumes and costs by category; active procured 2025 5,928 GWh / $206 M, 2024 5,834 / $255 M; standby procured 709 / $8 M and 713 / $10 M | `inlL2_2015` INL/EXT-15-36313 (2015), public Level 2 use: starts concentrate at the start of the work day; drivers "rarely initiate their away-from-home charging before 6 a.m. or after 7 p.m."; DC fast charging leans to the end of the work day

### Data-centre build cost  (`build_cost`)

- Stage: What it would take · unit: USD/W; CAD/ft² · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: reserved_cost, property_tax
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: confirmed (textbook, 2010–2017 USD data; local CAD/ft² industry)

```
build_cost = f()
cost per watt of critical power; cost per ft²; partially filled: capex and non-power opex × 1 ÷ occupancy
```

Coefficients: Barroso 3rd ed. Table 6.1 p.130: $9–13/W Tier III historical (Dupont Fabros 2010–11: 8.94–12.56); $7–9/W recent 10-Ks (DLR, CyrusOne, QTS); $12–25/W small/medium (Uptime); §6.5 p.135: two-thirds full → +50% opex, half-full server TCO $8,981 vs $6,310; Vancouver 910–1,200 CAD/ft² (T&T 2025, industry); local permit values: $28.5 M for a 4-storey office→data-centre conversion (175 W Cordova, 2022) and $18 M for three tower floors to Bulk Data Storage F2 (515 W Hastings, 2023) — per-m² pending floor areas

Sources: `barroso2018` Barroso, Hölzle, Ranganathan 2018, The Datacenter as a Computer, 3rd ed., ch.6 Modeling Costs | `fan2007` Fan, Weber, Barroso 2007, Power provisioning for a warehouse-sized computer | `tt2025` Turner & Townsend Canada cost table 2025 | `vanPermits` City of Vancouver Open Data, Issued building permits | `edmPermitsDC2026` City of Edmonton General Building Permits, full export 16 Oct 2026 (247,700 rows; J.B. download), job descriptions searched for data centre, data hall, server room: permit-declared construction values for data-centre work (value and floor area as entered on the permit; floor area may be the work area or the building; no MW stated): Rogers, 17204 114 Ave NW (DC2/IM), 2020, "Hall 7 & 8 expansion" in an empty warehouse, $4,000,000 over 9,519 m² ≈ $420/m²; Rogers, 10450 178 St NW (BE), 2025, expanding the internal data hall, $2,100,000 over 7,617 m² ≈ $276/m²; EPCOR Data Centre, office tower P1, 10423 101 St NW (CCA), 2011, $3,399,000 over 3,911 m² ≈ $869/m²; Alberta Pensions Administration new data centre in an office building, 5103 Windermere Blvd SW (DC2), 2009, $2,000,000 over 2,200 m² ≈ $909/m²; 17204 114 Ave NW addition with data centre and mechanical equipment, 2015, $850,000 (no area). No new purpose-built data centre appears; all are fit-outs or expansions in existing buildings. Permits naming backup generators left out (security rule)

### Capital recovery factor  (`crf`)

- Stage: What it would take · unit: — · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: price_floor, lcoh, payback
- Trust: own 100 / 100 · weakest input (chain) 100 / 100 · status: in hand

```
crf = f()
i ÷ (1 − (1+i)^−n)
```

Coefficients: NREL ATB

Sources: `crf` CRF = i / (1 − (1+i)^−n) (NREL ATB); LCoH (IEA SHC Task 54); TCO (Barroso ch. 8) (Formulas sheet)

### Solar installed cost  (`pv_cost`)

- Stage: What it would take · unit: CAD/W · level: Technical
- Inputs (formula arguments): pv_roof
- Fed by (diagram links): pv_roof · feeds: pv_lcoe
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: in hand

```
pv_cost = f(pv_roof)
kWp × 1,000 × rate by size
```

Coefficients: CAD 2.00–3.20/W under 100 kW; 1.90–2.40 for 100–250 kW; 1.68–2.22 above 250 kW (NRCan/IEA PVPS Canada 2024); O&M ≈ US$21/kW·yr, 30-yr life, 0.5–0.7 %/yr degradation (NREL, US)

Sources: `nrcan_pvcost2024` NRCan / IEA PVPS National Survey Report of PV Power Applications in Canada 2024 (installed CAD/W by size) | `nrel_bench2023` Ramasamy et al., U.S. Solar PV System and Energy Storage Cost Benchmarks Q1 2023, NREL/TP-7A40-87303

### Zoning: allowed, conditional or rezoning  (`zoning_status`)

- Stage: What it would take · unit: class · level: Everyday
- Inputs (formula arguments): parcel, zone, start_case
- Fed by (diagram links): parcel, zone, start_case · feeds: rezoning_price, construction_time
- Trust: own 80 / 100 · weakest input (chain) 80 / 100 · status: sourced for standard zones; Edmonton Major or Minor turns on the data centre's own effects (Development Planner decides)

```
zoning_status = f(parcel, zone, start_case)
look up the district: outright / conditional (development permit) / not listed (rezoning or text amendment)
```

Coefficients: Vancouver: "Bulk Data Storage" (s. 2) is conditional in I-2, I-1C, I-3 sub-area A and FC-2 only; not permitted elsewhere, including all commercial and mixed-use districts; CD-1 site-specific. Edmonton: no named use; the City treats large-scale data centres as Major Industrial (permitted IH; IM only where existing 1 Jan 2024); Minor Industrial permitted in BE and IM, and in IH only where it existed on 1 Jan 2024; in UI only on the NAIT Main Campus (Appendix IV, Sub-Area 2), limited to storage; in FD only as temporary outdoor storage; Direct Control site-specific; s. 7.20(3.3.2) may make an ill-fitting use discretionary

Sources: `van_zdb_s2` City of Vancouver Zoning and Development By-law No. 3575, Section 2 (definitions: Bulk Data Storage), June 2026 | `van_zdb_i2` City of Vancouver Zoning and Development By-law, I-2 District Schedule (current) | `van_zdb_i1c` City of Vancouver Zoning and Development By-law, I-1C District Schedule (current) | `van_zdb_i3` City of Vancouver Zoning and Development By-law, I-3 District Schedule (June 2026), ss. 2.2.11, 3.1.1–3.1.2 | `van_zdb_fc2` City of Vancouver Zoning and Development By-law, FC-2 District Schedule (June 2026), ss. 2.2.4, 3.1–3.4 | `van_cd1` City of Vancouver, CD-1 (Comprehensive Development) by-laws index | `edm_matrix` City of Edmonton, Zoning Bylaw 20001 Land Use & Zoning Matrix: Uses in Standard Zones, October 2026 | `edm_dcpage` City of Edmonton, Data Centre Development (web page, saved 14 Oct 2026) | `edm_bl20001` City of Edmonton, Charter Bylaw 20001 (Zoning Bylaw), as adopted, PDF 3 Jan 2024: s. 2.130 IM, s. 2.140 IH, s. 5.70, s. 5.120, s. 8.10 | `vanUses2026` Vancouver Zoning By-law s. 2 definitions and district schedules (2026): no stand-alone EV charging use | `edmUses2026` Edmonton Zoning Bylaw 20001 s. 8.10 use definitions: no EV charging use; Urban Agriculture ("hydroponic or aquaponic systems, and vertical farms") permitted in MU, IM, BE, CB, within or on a building (MU ≤600 m²); Community Service incl. shelters permitted in MU and BE (BE ≤500 m² except shelters); Minor Utility includes "district heating plants" (IM, BE); Major Utility includes "cooling plants" | `vanR3R4R5` Vancouver R3, R4 and R5 district schedules (low-, mid-, high-rise apartments; approved by Council Oct 2025; heights 27.5, 47.0, 84.0 m per the City rezoning guide, 5 Jan 2026). R1-1 "Residential Inclusive" and RT- districts are the small-scale housing districts ("retaining the single lot character") | `edmZBres` Edmonton Zoning Bylaw 20001 residential zones: RS and RSF small scale (up to 3 storeys); RSM small-medium transition (3–4 storeys); RM medium (4–8); RL large (9–20); RR rural residential

### Buyer ceiling price  (`price_ceiling`)

- Stage: What it would take · unit: CAD/MWh · level: Civic
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: window, affordability, heat_value_split
- Trust: own 60 / 100 · weakest input (chain) 60 / 100 · status: derived; Edmonton: pricing principle confirmed from the City report (90), tariff pending

```
price_ceiling = f()
fuel price ÷ boiler efficiency (0.85); or district-energy tariff; NEU returned-heat credit as revealed WTP
```

Coefficients: 18 Oct 2026 (J.B. decisions, heat items 1–7; audit/heat_items_sources_2026-10-18.md): gas commodity averaged over the same 12 months in both cities (Nov 2025 – Oct 2026), rest of each tariff at the current schedule. Vancouver: FortisBC CCRC $2.230 (to 31 Mar 2026; BCUC L-9-25, L-27-25) and $1.660 (from 1 Apr 2026; G-50-26; Oct 2026 unchanged per FortisBC release copy, unverified) → mean $1.8975; all per-GJ $9.5425 → ≈ $40.4/MWh heat at 85%. Edmonton: UCA regulated rate (2.579, 3.390, 3.331, 2.422, 1.784, 1.874, 0.936, 2.076, 1.595, 1.729, 1.124, 1.458) → mean $2.025, + ATCO delivery $1.045 → ≈ $13.0/MWh heat. Earlier: Vancouver gas ≈ $39.4 (Rate 3, every per-GJ charge incl. Riders 5, 6 and 8: $9.305/GJ, checked against the schedule 18 Oct 2026; $38.6 without the Rider 6 true-up); RNG ≈ $70.7; NEU credit $32.59; Creative Energy 2026 interim tiers $66.6 (first tier) to $39.6 (remainder) per MWh; Edmonton gas ≈ $10.7; Denmark surplus-heat price cap 95 DKK/GJ (≈342 DKK/MWh) — HISTORICAL: abolished 1 Jul 2025; Edmonton Downtown District Energy Utility (City-owned, Bylaw 20914; EPCOR design-build-finance-operate; Phase 1 = Winspear-area plant serving Century Hall and Chancery Place, Phase 1A adds City Hall, Citadel Theatre, Milner Library): rates set on a 'Business as Usual' principle — customers pay on average what they would pay a traditional provider plus their avoided boiler maintenance and capital renewal (IIS02765 p.4), so the Edmonton buyer ceiling = gas-equivalent cost + avoided boiler costs; Phase 1/1A: capital $51 M, annual rate revenue $2.4 M vs operating cost $1.9 M on gas or $5.3 M on electric boilers; 30-yr NPV +$4 M gas vs −$25 M electric (84% GHG cut, 126,000 t, $198/tCO2); full build-out: no-decarbonization NPV +$106 M (10% GHG cut) vs max-decarbonization −$172 M (96% cut); no private building is obliged to connect and no capital is funded for private connections; 2025 budget $889k spend vs $336k revenue; the $/GJ tariff itself is in Attachment 4 (pending); Vancouver built case: TELUS Garden TES (FAES, BCUC C-1-13 / G-155-12) charges customers the BC Hydro residential benchmark + 5–10 % ($0.105–0.126/kWh proposed 2014–18 = $105–126/MWh) for recovered-heat service — an all-in regulated TES rate including distribution and capital, not a price for the heat itself; Edmonton Downtown District Energy regulated rates (first filing): 2025 $7.92 per kW peak capacity per month + $0.0294/kWh; 2026 $8.08 per kW·month + $0.0300/kWh (= $8.33/GJ variable); set at "business as usual" — what a building would pay for its own heating plus maintenance and replacement reserve; one rate class (Winspear Centre, Century Place, Chancery Place); Phase 1 fuel mainly natural gas; business case scenarios to 96% GHG reduction include waste heat recovery and geo-exchange

Sources: `abgas` Alberta DERS gas Oct 2026 $1.458/GJ; ATCO North Mid-Use $1.062/GJ → ≈ $11/MWh heat | `bcucC113` BCUC Order C-1-13 with Reasons (Feb 2013), FortisBC Alternative Energy Services, TELUS Garden thermal energy system, pp.14–19: 'A year round base load of 1,400 kW of heat is available on a 24/7 basis' from the TELUS data centre; development load 5,194 MWh heating / 4,591 MWh cooling; 94 % of heating from recovery, steam peaking; TES capital $7.9 M, waste-heat option $3.2 M vs geo-exchange $6.8 M; 'free waste heat supply from the TELUS Data Centre'; customer rate BC Hydro residential + 5–10 % (G-155-12: $0.105–0.126/kWh 2014–18); annual actual-load report rescinded by G-2-15 | `ceG526` BCUC Order G-5-26, Creative Energy 2026 interim rates: downtown steam $19.53 / 16.53 / 14.63 / 11.60 per M# by tier (≈ $66.6 to $39.6 per MWh) | `dkPriceCap` Forsyningstilsynet, 2025 surplus-heat price cap 95 DKK/GJ | `edmDDE` City of Edmonton, Integrated Infrastructure Services report IIS02765, Downtown District Energy Initiative – Growth Plan, Utility Committee 23 Jun 2025 (with Utility Committee Report 4 cover; FCS02853 Fiscal Policy C631; Bylaw 20914) | `fortis` FortisBC Rate 3 (delivery 1 Jan 2026, commodity 1 Jul 2026): variable $9.305/GJ incl. Riders 5, 6, 8 → ≈ $39.4/MWh heat at 85% (checked against the schedule 18 Oct 2026); BC carbon tax zero since 1 Apr 2025 | `neu9552` False Creek NEU By-law 9552 Sch. C: energy charge $65.172/MWh; credit for heat returned = 50% → $32.59/MWh | `neuReport` NEU rates report RTS 18251 (Oct 2025): 47 buildings, 667,000 m²; 71% renewable; gas $2.23/GJ; RNG rider | `ddeRates2025` City of Edmonton, Downtown District Energy 2025–2026 Rate Filing, Attachment 4 to IIS02765, Utility Committee 23 Jun 2025 | `ddeBizCase2025` City of Edmonton, DDEI Business Case | `fortisBC2026` FortisBC business rates, Mainland and Vancouver Island, effective 1 Jul 2026 (J.B. screenshots 16 Oct 2026 of fortisbc.com): Rate 3 (commercial, institutional or small industrial, over 2,000 GJ a year, e.g. schools, offices) | `atcoGas2026` ATCO Gas North delivery (1 Jan 2026): Low Use $0.997/day + $1.049/GJ; Mid Use $1.909/day + $1.045/GJ (riders excluded). Alberta regulated rate, ATCO area, 2026 $/GJ: Jan 3.331 … Oct 1.458 (Utilities Consumer Advocate) | `bcCarbonTax2025` BC: "The B.C. carbon tax was eliminated effective April 1, 2025"; federal fuel charge set to zero 1 Apr 2025 (CRA FCN16); BC output-based pricing for large industry continues (≥10,000 t/yr); Alberta TIER $95/t for 2025, 2026 price not verified from a primary source | `ucaRates2026` Utilities Consumer Advocate (Alberta), regulated rates, Direct Energy Regulated Services (ATCO Gas), Nov 2025 – Oct 2026, $/GJ (read 18 Oct 2026) | `bcucG5026` BCUC Order G-50-26 (12 Mar 2026): FortisBC Mainland Commodity Cost Recovery Charge $2.230 → $1.660/GJ from 1 Apr 2026; BCUC letters L-9-25 (12 Jun 2025) and L-27-25 (11 Sep 2025): unchanged at $2.230 | `dkHeatCap2025` Denmark: the 95 kr./GJ surplus-heat price cap (regulator notice 1 Nov 2024) was abolished from 1 Jul 2025 (Lov nr 738)

### Termination risk  (`risk_term`)

- Stage: What it would take · unit: %/yr · level: Civic
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: ledger, futures
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: confirmed (full text, Energy 151:430–441, Table 2 p.434)

```
risk_term = f()
share of recoveries lost (volume-weighted) and share of cooperations terminated, by class
```

Coefficients: ≈6% of annual average heat recoveries lost to terminated industry + substitution, 107 Swedish recoveries 1974–2014; all causes 13% by volume (2.6 of 19.9 PJ), 33 of 107 by count; heat-pump-based: 14 of 19 terminated; small (<55 TJ/yr): 19 of 45; large (>300 TJ/yr): 0 of 16; risk factors = small volume and heat-pump recovery; authors: premium lower than feasibility studies presume

Sources: `lygnerud` Lygnerud & Werner 2018, Energy 151:430–441, Risk assessment of industrial excess heat recovery in district heating systems

### Water licence required  (`licence_flag`)

- Stage: What it would take · unit: flag · level: Civic
- Inputs (formula arguments): ground
- Fed by (diagram links): ground · feeds: consultation
- Trust: own 90 / 100 · weakest input (chain) 80 / 100 · status: BC and Alberta both confirmed from the regulator (data/); Alberta open loop = Water Act authorization with a temperature-impact assessment — a pass/partial condition, not a veto

```
licence_flag = f(ground)
BC: yes for open-loop heat exchange (WSR Sch. A item 9). Alberta (Guide to Groundwater Authorization 2023 §6.2): open loop with no water loss and return to the same water body = Water Act "activity" → approval; different water body or any loss → licence; closed loop → none. Flow tier for the aquifer test: Q(m³/day) = heat_kW ÷ (1.16 × ΔT) × 24; a 1 MW loop at ΔT 5 K ≈ 4,100 m³/day → top tier
```

Coefficients: Alberta EPA fact sheet, Ground Source Heat Exchange Systems (8 Oct 2025; 2024 edition identical on these points): open-loop systems "are regulated through a Water Act authorization" obtained before construction; application must assess the aquifer's capability to circulate the required quantity continuously, effects on groundwater quantity, temperature and quality, and on household, agricultural and existing licence holders; complex systems need an APEGA groundwater specialist report per the Guide to Groundwater Authorization; water in an open loop cannot be used for another purpose or temporarily discharged; open-loop wells drilled by a Class A driller, return through a separate return well; horizontal closed loop above the water table and vertical closed loop above the base of groundwater protection need no Water Act authorization (Class F installer); below the base of groundwater protection the AER regulates under the Geothermal Resource Development Act; applications via DRAS. Directive (11 Dec 2018) sets the construction standards; Guide App. 2 aquifer-test tiers by daily pumping rate: ≤10 m³/day 2+2 h, no observation well, no APEGA report (§2.2); 10–35 m³/day 24+24 h, 0–1 obs well; 35–65 m³/day 24+24 h, 1; 65–265 m³/day 48+48 h, 1–2; >265 m³/day 72+72 h, 1–2 obs wells, full §2 report by an APEGA groundwater practitioner; maximum daily rate = lesser of test rate and Q20 (20-year sustainable yield); CSA C448 referenced for installation; temporary discharge needs the director's authorisation

Sources: `wsa` BC Water Sustainability Regulation Sch. A items 4 and 9: licence required for open-loop cooling and heat exchange | `abDirective` Alberta Environment and Parks, Water Wells and Ground Source Heat Exchange Systems Directive, 11 Dec 2018 | `abGSHE` Alberta Environment and Protected Areas, Ground Source Heat Exchange Systems fact sheet, 8 Oct 2025 (and Oct 2024) | `abGuide` Alberta Environment and Protected Areas, Guide to Groundwater Authorization (2023), §2.2, §6.2, Appendix 2 | `bcUCAs1` BC Utilities Commission Act s. 1 "public utility" | `aucCoaldale2025` AUC Decision 29294-D01-2025 (Coaldale Renewables / McCain, 3 Jun 2025): under EUA s. 2(1)(b) "the lands must, at a minimum, be contiguous"; lines crossing a highway to the customer "are an attempt to self-distribute and are not permitted". Permission to appeal granted in part (Sep 2025, per law-firm commentary); outcome not verified

### Who pays which part  (`capex_split`)

- Stage: What it would take · unit: — · level: Civic
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: ledger, heat_value_split
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: confirmed (full texts)

```
capex_split = f()
recovery equipment / connection / network / heat pump, by party
```

Coefficients: Stockholm Exergi: supplier owns and invests in the heat pump; Exergi owns meter and pipes to metering point; called-off contracts 10 yr + 5 yr option, spot contracts open-ended (Energiforsk 2020:681); Fortum: price by outdoor temperature and supply/return side; RTS 19744: applicant pays all; Wahlroos 2018 p.1760: heat-pump capex 500 EUR/kW_heat ("rather low", DH pipe very near, Finnish sewage-HP experience); Table 2: 12 MW DH output, 5 MEUR extra investment, 5-yr direct payback; Bahnhof projects 3–5 yr ROI (operator claim); DEA Aug 2026 (2025 €): waste-heat heat pump total investment 1.13 M€/MW_heat at 1 MW, 0.95 at 3 and 10 MW (heat pump 0.36–0.55, building 0.06–0.12, other — pipes, electrical, controls, consultancy — 0.47–0.52); +5–15% at 40–80 °C DH temperatures; fixed O&M ≈ 2,100 €/MW·yr, variable 3.07 €/MWh excluding electricity; lifetime 25 yr; construction 0.5 yr; minimum load 25%; electric boiler 0.07 M€/MW, gas boiler 0.064 M€/MW; CALIBRATION 13 Oct 2026: in five of seven built cases the data centre gives the heat free and the utility owns and pays for the heat pump (Odense — Fjernvarme Fyn pays the total investment, 215 M DKK; Tallaght — SDCC-owned Heat Works, AWS heat free; Equinix PA10 — free for 15 years; Markham — 'Equinix does not seek income'; TELUS Garden — FAES owns the TES, 'free waste heat supply'); the supplier-owned, paid model is Stockholm (Öppen Fjärrvärme, hourly avoided cost, supplier owns the heat pump) and Mäntsälä (price not public). The tool must run both ownership models

Sources: `bcucC113` BCUC Order C-1-13 with Reasons (Feb 2013), FortisBC Alternative Energy Services, TELUS Garden thermal energy system, pp.14–19: 'A year round base load of 1,400 kW of heat is available on a 24/7 basis' from the TELUS data centre; development load 5,194 MWh heating / 4,591 MWh cooling; 94 % of heating from recovery, steam peaking; TES capital $7.9 M, waste-heat option $3.2 M vs geo-exchange $6.8 M; 'free waste heat supply from the TELUS Data Centre'; customer rate BC Hydro residential + 5–10 % (G-155-12: $0.105–0.126/kWh 2014–18); annual actual-load report rescinded by G-2-15 | `dea` Danish Energy Agency, Technology Data for Electricity and District Heating Production, data sheet updated August 2026 (2025 EUR): sheets 40 (compression heat pumps, waste heat 1/3/10 MW; air-source), 41 (electric boilers), 44 (gas boilers), 140 (pit storage) | `energiforsk2020` Energiforsk 2020:681, prosumer contract structures (Öppen Fjärrvärme) | `engiePA10` Engie Solutions / SMIREC press releases 2022 and 21 Jun 2024 (Equinix PA10 → Plaine Commune Énergie): water recovered at 28 °C, up to 6.6 MW, 10,800 MWh/yr projected, €5.7 M investment, heat supplied free for 15 years | `equinixTR5` Equinix press release 5 Jun 2024 and blog 24 Apr 2025: TR5 heat to Markham District Energy (operator claim) | `exergi` Stockholm Exergi: 'indikativt 2 MSEK årligen för 1 MW vid 5 000 timmar' → 400 SEK/MWh; supply normally 68 °C | `exergiAR2023` Stockholm Exergi, Års- och hållbarhetsredovisning 2023 p.20 (117 GWh recovered from Stockholm Data Parks and Öppen Fjärrvärme in 2023); Covenant of Mayors case study 2023 (~EUR 190,000 per year per MW delivered); Energiforsk 2020:681 pp.12–17 (75 GWh from data halls 2018; Bahnhof Pionen 600 kW at 68 °C; meter owned by Exergi; hourly avoided-cost price) | `fjfAars2020` Fjernvarme Fyn, Årsberetning 2020, p.9 production table and p.13: 'Varmepumperne tilknyttet Facebook har forbrugt 14.020 MWh el svarende til COP 4,5'; 230 TJ heat (Facebook heat pumps only, first full year) | `fortum` Fortum Avoin kaukolämpö purchase prices from 1 May 2026: €11 (≥16.1 °C) to €50/MWh (≤−8 °C) | `hiltunen2020` Hiltunen & Syri 2020, Energies 13(14):3551, heat-recovery capex 0.5–0.65 M€/MW | `rts19744` City of Vancouver RTS 19744 (30 Jun 2026): 111 E 5th, 'up to 40 MW'; cond. 1.11 heat recovery a material condition at the applicant's sole cost; 579 submissions | `tallaghtD22` ENABLE DHC D2.2 Tallaght (2025) pp.5–8 and Codema project page: 3,770 MWh distributed in the first year (2023) from a 3 MW heat pump (Heat Works CLG, SDCC-owned); source ~25 °C, network 70/55 °C; heat supplied by AWS free; customer tariff fixed + kWh | `wahlroos2017` Wahlroos et al. 2017, Energy 140:1228 | `wahlroos2018` Wahlroos, Pärssinen, Rinne, Syri, Manner 2018, RSER 82:1749–1764, Future views on waste heat utilization | `blatchfordBP2021` Blatchford Renewable Energy 2021–2024 Business Plan, City of Edmonton (J.B. upload 16 Oct 2026): the District Energy Sharing System uses geoexchange, sewer heat exchange and solar (p. 1); all buildings must connect for heating, cooling and hot water unless net-zero carbon (p. 2); a sewer-heat energy centre in the Blatchford Market area, drawing on the two combined sewer lines under the east side, was expected in 2023; connected floor area forecast 123,500 m² by 2024, all from the first energy centre; customers to pay at most a comparable fee to elsewhere in the city. No intake of heat from third-party sources is described | `blatchford2023` City of Edmonton, 2023–2026 Blatchford Renewable Energy Utility Budget and Plans (Dec 2022)

### Time horizons  (`horizons`)

- Stage: What it would take · unit: yr · level: Civic
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: futures, afterlife
- Trust: own 80 / 100 · weakest input (chain) 80 / 100 · status: primary sources found (13 Oct 2026)

```
horizons = f()
servers ~6; plant 15–25; shell ≤40; network 40–50; lease
```

Coefficients: Servers: average life 4.4 → 5 → 5.7 years (2000–2019, 2020, 2023; LBNL 2024); filings moved server useful lives to 5–6 years (Microsoft, Alphabet, Meta; Amazon partly back to 5 in 2025); Barroso: servers depreciated over 3–4 years, facilities over 15–20; plant medians ~20–25 years (ASHRAE); district-heating pipes 30 years at 120 °C, 50 only below 115 °C (EN 253); contracts: colocation 2–5 years, scale 5–10+ (Digital Realty); heat contracts 10 + 5 (Stockholm Exergi); Tallaght plant 25–35 years; Seattle permit 10 + two 10-year renewals; Vancouver property-tax report flags holding sites (improvement ÷ land value); Statistics Canada economic lives: office buildings 27 yr, warehouses 25.4, computers 4; Shared Services Canada closed 500+ of 720 federal data centres since 2011; Statistics Canada economic lives: office buildings 27 yr, warehouses 25.4, computers 4; Shared Services Canada closed 500+ of 720 federal data centres since 2011; Statistics Canada economic lives: office buildings 27 yr, warehouses 25.4, computers 4; Shared Services Canada closed 500+ of 720 federal data centres since 2011; Statistics Canada economic lives: office buildings 27 yr, warehouses 25.4, computers 4; Shared Services Canada closed 500+ of 720 federal data centres since 2011; Statistics Canada economic lives: office buildings 27 yr, warehouses 25.4, computers 4; Shared Services Canada closed 500+ of 720 federal data centres since 2011; Statistics Canada economic lives: office buildings 27 yr, warehouses 25.4, computers 4; Shared Services Canada closed 500+ of 720 federal data centres since 2011; Statistics Canada economic lives: office buildings 27 yr, warehouses 25.4, computers 4; Shared Services Canada closed 500+ of 720 federal data centres since 2011; Statistics Canada economic lives: office buildings 27 yr, warehouses 25.4, computers 4; Shared Services Canada closed 500+ of 720 federal data centres since 2011; Statistics Canada economic lives: office buildings 27 yr, warehouses 25.4, computers 4; Shared Services Canada closed 500+ of 720 federal data centres since 2011; Statistics Canada economic lives: office buildings 27 yr, warehouses 25.4, computers 4; Shared Services Canada closed 500+ of 720 federal data centres since 2011; Statistics Canada economic lives: office buildings 27 yr, warehouses 25.4, computers 4; Shared Services Canada closed 500+ of 720 federal data centres since 2011; Statistics Canada economic lives: office buildings 27 yr, warehouses 25.4, computers 4; Shared Services Canada closed 500+ of 720 federal data centres since 2011; Statistics Canada economic lives: office buildings 27 yr, warehouses 25.4, computers 4; Shared Services Canada closed 500+ of 720 federal data centres since 2011; Statistics Canada economic lives: office buildings 27 yr, warehouses 25.4, computers 4; Shared Services Canada closed 500+ of 720 federal data centres since 2011

Sources: `horizons` Horizons: servers ~6 yr; plant 15–25; shell up to 40; network 40–50 (handoff rule 7); control in colocation (Greene; Monstadt and Saltzman) (handoff §3) | `vanTax` City of Vancouver Open Data, Property tax report (1.55 M rows, 2006–): 30 fields | `lbnlLife` Shehabi et al. 2024 (LBNL) p.31: average server lifetime 'is 4.4 years, increasing to 5 years in 2020, and to 5.7 years by 2023' | `tenK_life` Company filings on server useful life: Microsoft FY2022 four → six years; Alphabet FY2023 servers four → six; Amazon six (2024), a subset back to five (2025, 'increased pace of technology development'); Meta 4–5 → 5.5 years (2025) | `barroso2018` Barroso, Hölzle, Ranganathan 2018, The Datacenter as a Computer, 3rd ed., ch.6 Modeling Costs | `ashraeLife` ASHRAE Handbook HVAC Applications 2015, ch.37 Table 4 (median service life): centrifugal chiller >25 yr; cooling tower galvanized >22; air-cooled condenser 20; commercial water-to-air heat pump >24; base-mounted pump 20; shell-and-tube heat exchanger 24; transformer 30 | `en253Life` Energiforsk 2022:872 (RISE): 'EN 253 (2019) states that the service life shall be 30 years at 120 °C'; 'If a service life of 50 years is desired, the temperatures must be below 115 °C' (p.32) | `dlrContracts` Digital Realty 10-K FY2024, Item 1: 0–1 MW colocation 'Contract length generally 2-5 years'; >1 MW 'generally 5-10+ years' (OPERATOR FILING) | `edmParcel` Edmonton Property Information: total_gross_area, zoning, year_built per parcel; Rooflines 2019: building height | `statcanLives` Statistics Canada, economic lives of assets: office buildings 27 yr, warehouses 25.4, other commercial construction 20.7, computers 4 | `sscConsolidation` Shared Services Canada, data centre consolidation: more than 500 of the 720 legacy federal data centres closed since 2011

### Connection lead time  (`lead_time`)

- Stage: What it would take · unit: months · level: Civic
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: construction_time
- Trust: own 90 / 100 · weakest input (chain) 90 / 100 · status: confirmed

```
lead_time = f()
BC Hydro: conceptual 1–1.5 + SIS 6–9 + transition 3–4 + FS 6–9; AESO: stages 0–2 avg 86 wk, stage 3 avg 134 wk
```

Sources: `bchTransmission` BC Hydro transmission load connection timelines | `aesoPerf` AESO connection process performance, April 2026

### Grid headroom status  (`grid_headroom`)

- Stage: What it would take · unit: status · level: Civic
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: consultation, power_bill_effect
- Trust: own 90 / 100 · weakest input (chain) 90 / 100 · status: confirmed (regulator and utility documents read in full); MW headroom at a downtown Vancouver parcel is explicitly nil for new feeder positions from fiscal 2027 until the WES is in service (July 2032) — the tool reports this as a hard timing constraint, not a judgement

```
grid_headroom = f()
governing document, date, stated cap or constraint, next milestone; headroom field in the form regulators publish elsewhere: remaining kVA band at station (≥7.5 MVA) and feeder (OEB) or feeder-segment kVA class (ENMAX)
```

Coefficients: Vancouver: West End Substation CPCN (10 Nov 2025, read in full): the downtown substations (Murrin 1947, Dal Grauer 1952, Cathedral Square) are 'at their final stage of development with no room to add more capacity'; by fiscal 2027 all 12 kV feeder positions in the study area will be in use, after which new customers connect only by loading feeders above planning guidelines or using transfer-tie positions in other stations (s.2.2.2); the project is a 230/25 kV, 400 MVA underground substation at 1150 Nelson St, expected in service July 2032, cost $756 M–$1.391 B (expected $1.028 B); Mount Pleasant (150 MVA, 2014, expandable to 400 MVA) cannot absorb Murrin's load; decision pending; Edmonton: 1,200 MW allocated; Data Centre Regulation, Alta Reg 117/2026 (posted 17 Jun 2026; read in full): s.2 'large data centre' = maximum demand from the transmission system ≥ 75 MW (ISO may set a lower threshold); s.3 ISO may aggregate data centres on the same or adjacent parcels under the same person or affiliate; s.5 'tethered' = large data centre whose access request is tied to a generating unit or storage facility of equal or greater capability; s.6 tethered requests processed first; s.7 ISO may require site control, municipal zoning approval, financing, permits and water licences before service; s.8 tethered service capped at the tethered generation's rate; s.9 'bridged' = tethered data centre served before its generation is in service, for at most 3 years, with an ISO-set demand limit and an ISO-set limit on all bridged load (no MW figure in the regulation — the 1,600 MW pool is an AESO process figure, not statute); s.10 bridged data centres cut first in a supply shortfall, large data centres cut before other participants in mandatory load shedding; s.12 review by 31 May 2030, expires 31 May 2035; neither city publishes a load-capacity map (EPCOR, BC Hydro: verified negative); precedents: ENMAX feeder classes <999…11,000–12,999 kVA (Dec 2025), OEB bands 0–1,000/1,000–2,000/>2,000 kVA at stations, Toronto Hydro = planning limit − annual peak, Hydro-Québec zone residuals (Montréal-Est 100 MW); Edmonton substation example: Woodcroft POD N-1 firm 76.0 MVA vs 74.2 MVA 2024 peak, shortfall from 2032 (EPCOR DDR Sep 2025); AESO Phase 1 1,200 MW allocated (970 + 230), ~19,565 MW requested (GoA, Jul 2026); BC CFD 15 applications ~800 MW, up to 400 MW, outcome deferred; AESO list Oct 2026: 56 data-load projects, 23,549 MW DTS in total — Active 16 / 1,752 MW, ISD Under Review 28 / 18,491 MW, Cluster 3 9 / 2,466 MW, cancelled 3 / 840 MW; none energized; 9 projects sized at exactly 74.9 MW (just under the 75 MW Alta Reg 117/2026 threshold); planning area 60-Edmonton: Beacon Saunders Lake A.I. Hub 400 MW (stage 2, ISD under review), Sovereign Cloud 74.9 MW (stage 2, active, ISD Dec 2029); EPCOR distribution-load reliability projects name the constrained areas: South Edmonton 51 MW (2031), West/Poundmaker 30.6 MW (2031), SW/Meadowlark 28 MW (2030), Woodcroft equipment change (Nov 2026); BC Hydro 2025 IRP (Exh. B-1): load scenarios follow Bill 31 (tabled 20 Oct 2025) — permanent ban on new cryptocurrency connections; sector limits for a two-year competitive call of 300 MW for AI and 100 MW for data centres (p.2-22 fn 17) — so the "up to 400 MW" Call for Demand is 100 MW of conventional data centre plus 300 MW of AI; Lower Mainland is one of three transfer-constrained regions, options with ~10-year lead times: SVCs at Ingledow/Meridian +400 MW ($20/kW-yr), new 500 kV Kelly Lake–Lower Mainland +630 MW ($195/kW-yr), Kelly Lake–Nicola +300 MW ($298/kW-yr) (Table 2-22); 13 Oct 2026: BC allocation framework — 300 MW AI + 100 MW data centres, ≥10 MW competitive, >150 MW full incremental cost; ISED principles (Sep 2026): proponents pay connection costs

Sources: `wes` BC Hydro, CPCN application for the West End Substation Project, initial application filed 10 Nov 2025 (BCUC proceeding 1396; decision pending as of 11 Oct 2026; BC Hydro final argument 6 Aug 2026) | `aeso` AESO: 1,200 MW interim limit fully allocated (GLDC 970; Keephills I 230); Edmonton load ≈ 1,400 MW; Phase 2A BYOG 1,600 MW proposed (Jun 2026) | `woodcroft` EPCOR Woodcroft Deficiency Report (Rev 1, 12 Sep 2025): N-1 firm 76 MVA; peak 66.2 → 76.3 MVA by 2032 | `queue` BC Hydro Load Interconnection Queue Business Practice v1.5: queue 'not publicly available' | `enmaxMap` ENMAX Load Capacity Map, ArcGIS layer Feeder_Load_Capacity_Rev9_20251211 | `oebCCIM` OEB Centralized Capacity Information Map; Phase 1 letter 17 Oct 2024 EB-2019-0207 App. A | `torontoHydroMap` Toronto Hydro Load Capacity Map FAQ | `hqZones` Hydro-Québec, Capacités de raccordement de projets industriels au réseau de transport (Dec 2025) | `woodcroftDDR` EPCOR (EDTI) Distribution Deficiency Report, Woodcroft POD, Rev 1, 12 Sep 2025 | `aesoLargeLoad` AESO Large Load Projects page; Data Centre Update Sept 2025; Connection Project List (monthly Excel) | `goaGrid` Government of Alberta, Data centres: grid (~19,565 MW requested, 30 Jul 2026) | `cfdPage` BC Hydro 2026 Call for Demand page (15 applications, ~800 MW, outcome deferred) | `aesoList` AESO Connection Project List, October 2026 Excel (updated 2026-10-09), 313 projects; fields Status, Planning Area, MW Type, Stage, EN1–3 STS/DTS MW, ISD | `altaReg117` Data Centre Regulation, Alta Reg 117/2026 (Electric Utilities Act), CanLII, current as posted 2026-06-17, retrieved 2026-10-11 | `bchIRP2025` BC Hydro 2025 Integrated Resource Plan, BCUC Exhibit B-1 (filed 31 Oct 2025, 413 pp.) | `bcIEAF` BC Industrial Electricity Allocation Framework (updated 31 Mar 2026): '300MW for AI projects, 100MW for data centre projects'; data centre and AI projects ≥10 MW enter competitive selection; BC news release 2025ECS0044: loads over 150 MW pay 'the full cost of both incremental electricity generation and upgrades' | `isedPrinciples` ISED, Canada's Responsible Data Centre Development Principles (15 Sep 2026): local benefits; 'Proponents must pay the costs of connecting and serving their projects'; waste heat recovery a priority technology; no siting criteria

### Earthquake design category  (`importance_cat`)

- Stage: What it would take · unit: rule · level: Technical
- Inputs (formula arguments): refuge_people
- Fed by (diagram links): refuge_people · feeds: refuge_after_quake
- Trust: own 90 / 100 · weakest input (chain) 60 / 100 · status: table read (90); data-centre classification judged (20)

```
importance_cat = f(refuge_people)
Normal (IE 1.0) by default; High (1.3) if likely used as a post-disaster shelter; post-disaster (1.5) if it serves as a communications facility, unless the authority exempts
```

Coefficients: High raises seismic design forces 30% over Normal (ratio only, not cost); Vancouver's new seismic rules apply to permits from 15 Sep 2026; whether a data centre counts as a communications facility is for the authority (20)

Sources: `nbcImportance` NBC 2020 / BCBC 2024 Table 4.1.2.1 importance categories: post-disaster buildings incl. telephone exchanges and communications facilities (authority may exempt); 'likely to be used as post-disaster shelters' = High; earthquake importance factor IE 1.0 Normal, 1.3 High, 1.5 post-disaster | `vbbl2025Seismic` City of Vancouver, Guide to 2025 VBBL updates (22 Sep 2025): new seismic rules apply to permits issued on or after 15 Sep 2026; in-stream projects before 8 Mar 2027 may use the old rules

### Local noise limit  (`noise_limit`)

- Stage: What it would take · unit: dBA · level: Everyday
- Inputs (formula arguments): noise_level
- Fed by (diagram links): noise_level · feeds: —
- Trust: own 90 / 100 · weakest input (chain) 50 / 100 · status: confirmed (regulator text read in full, data/AUC_Rule_012_2024-09-30.pdf); 18 Oct 2026 (M61/M62): Vancouver CD-1 districts placed by number from Sch. A (129), B (248) and G (4); B.1 outline from City open data 'Noise control areas' (Intermediate Zone, 2020; shape checked against the by-law map); 70, 125, 905 listed in both A and B, read as intermediate; G.1 not digitised (its CD-1s are in Sch. G). Edmonton 'zoned for use as residential' read with Bylaw 20001 s. 1.8.10: RS, RSF, RSM, RM, RL, RR and 28 special-area housing zones; mixed use (MU, MUN, CMUV) and Direct Control (DC, DC1, DC2) given the residential limit as an assumption and counted apart

```
noise_limit = f(noise_level)
Edmonton Bylaw 14600 at the property line, no averaging period stated: residential 65 day / 50 night, non-residential 75 / 60 (s.19–22); Vancouver by zone pair, continuous: quiet→quiet 55/45, activity→quiet 60/55, other 70/65; AUC Rule 012 Leq 40–56 + tonal +5 for the grid connection and any tethered generation
```

Coefficients: AUC Rule 012 (30 Sep 2024 consolidation; Bulletin 2026-03 of 17 Apr 2026 added guidance only) Table 1 basic sound level, night-time dBA Leq, all 15 cells confirmed: Category 1 (≥500 m from heavily travelled road/rail): 40 / 43 / 46 / 48 / 53 for 1–8 / 9–160 / 161–400 / 401–1,000 (suburban) / >1,000 (urban) dwellings per quarter section (451 m radius); Category 2 (30–500 m): 45 / 48 / 51 / 51 / 53; Category 3 (<30 m or frequent flyovers): 50 / 53 / 56 / 56 / 56; daytime = +10 dBA; minimum night BSL 40; Class A (seasonal/ambient) and B (temporary) adjustments may add; receptor = any dwelling within 1.5 km of the property boundary, else a point at 1.5 km; cumulative with other energy-related facilities; no-net-increase rule (s.2.8) for areas already at the limit. Note: Rule 012 binds AUC-regulated facilities (substations, generation); a data centre itself falls under Edmonton Bylaw 14600 — the rule applies to its grid connection and any generation it tethers to; 13 Oct 2026: Vancouver zone pairs confirmed — quiet→quiet 55/45, activity→quiet 60/55, intermediate/activity→other 70/65; no standing variance for operating noise (111 E 5th amended the by-law's schedule instead); 14 Oct 2026: Edmonton Bylaw 14600 (consolidated 22 Oct 2024) read in full — s.19 residential day 65 dB(A) at the property line 7 a.m.–10 p.m., with allowances 70/2 h, 75/1 h, 80/30 min, 85/15 min per day; s.20 residential night 50; s.21 non-residential day 75 (allowances 80/2 h, 85/1 h); s.22 non-residential night 60; no averaging period stated (read as instantaneous); s.14 a disturbance can be an offence whether or not a level is measured or exceeded; s.16 construction 7 a.m.–9 p.m. (Sun/holidays 9 a.m.–7 p.m.); Vancouver zones (By-law 6555 Sch. A/B/B.1, read 15 Oct): activity = MC-1, MC-2, DD, M-1, M-1A, M-1B, M-2, IC-1–3, I-1, I-1A–C, I-2, I-3, I-4, CWD, DEOD and listed CD-1s; intermediate = C-1, C-2, C-2A–C, C-2C1, C-3A, C-5, C-5A, C-6, C-7, C-8, FC-1, FC-2, FCCDD, BCPED, HA-1, HA-1A, HA-2–4, R3-1–3, R4-1, R5-1–4, RR-3A–C and the B.1 outline (north False Creek shore); quiet = all else. From an activity zone: to quiet 60/55, to intermediate or activity 70/65 dBA day/night

Sources: `bylaw14600` Edmonton Bylaw 14600 ss.19–22: 65 dBA day / 50 night at the residential property line; no Leq or continuous-noise provision | `bylaw6555` Vancouver By-law 6555 (cons. 14 Jul 2026): continuous >3 min in 15; intermediate→quiet 60 day / 50 night; dBC only for amplified music | `rule012` AUC Rule 012: Noise Control, consolidated 30 Sep 2024 (74 pp.), Table 1 p.3; Bulletin 2026-03 (17 Apr 2026) | `van6555` City of Vancouver Noise Control By-law 6555 (consolidated): Schedules A (activity), B and B.1 (intermediate); ss. 2.1–2.3 continuous-sound limits | `van6555zones` Vancouver Noise Control By-law 6555 (consol. 14 Jul 2026), continuous sound ss.2.1–2.3: quiet→quiet 55 day / 45 night; activity→quiet 60 / 55; intermediate/activity→other 70 / 65; 'background noise' credited only for commercial premises (s.3.1(b)); no ambient credit for equipment

### Street right-of-way cost  (`row_cost`)

- Stage: What it would take · unit: CAD/yr · level: Civic
- Inputs (formula arguments): distribution_cost
- Fed by (diagram links): distribution_cost · feeds: —
- Trust: own 90 / 100 · weakest input (chain) 60 / 100 · status: confirmed

```
row_cost = f(distribution_cost)
Vancouver Encroachment By-law 4243: $244.97 + $6.53/ft² over 150 ft²; Edmonton ULA permit, one-time: inspection $356.64 (no circulation) to $570.63 (under 20 m) or $1,560.31 (over 20 m) + $2.67 per m over 20 m, plus pavement degradation $2.59 per linear m (City of Edmonton ULA fee sheet, 2025 rates; checked 18 Oct 2026). Not comparable directly: Vancouver charges a yearly encroachment fee, Edmonton one-time permit fees
```

Sources: `bylaw4243` Vancouver Encroachment By-law 4243 | `edmULA` Edmonton Utility Line Assignment permit | `persson2019` Persson, Wiechers, Möller & Werner 2019, Energy 176:604–622: district-heating trench cost I/L = C1 + C2·da, average C1 = 212 €/m, C2 = 4,464 €/m² (2015 €; ≈€658/m at da 0.1 m, Claude arithmetic); inner-city vs outer-city split only in a figure not read | `nproCosts` npro.energy cost overview (from Logstor pipe prices and the KWW catalogue, "without any guarantee"): insulated pipe pair €/m | `vanQuebecSt2020` City of Vancouver memo to Council (15 May 2020), NEU Mount Pleasant expansion on Quebec St 3rd–6th Ave: start 19 May, completion "anticipated in fall 2020" (≈5 months)

### EV charging regulatory status  (`ev_exemption`)

- Stage: What it would take · unit: flag · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: —
- Trust: own 90 / 100 · weakest input (chain) 90 / 100 · status: both cities confirmed from primary sources

```
ev_exemption = f()
BC: exempt from UCA Part 3 (MO M104, 2019; G-66-19). Alberta: no rule yet — the AUC found parties agreed EV charging is "not defined clearly in legislation" and that its status is "unclear"; most saw no need for more oversight (AUC Distribution System Inquiry, 2021)
```

Sources: `m104` BC Ministerial Order M104 (2019) and BCUC G-66-19 | `aucDSI2021` AUC, Distribution System Inquiry

### Embodied carbon rule  (`embodied_rule`)

- Stage: What it would take · unit: rule · level: Civic
- Inputs (formula arguments): embodied_building
- Fed by (diagram links): embodied_building · feeds: —
- Trust: own 90 / 100 · weakest input (chain) 40 / 100 · status: read

```
embodied_rule = f(embodied_building)
Vancouver: new buildings at most 2× the baseline (cap 800 kg CO2e/m² on the absolute path); Edmonton: no requirement for private buildings
```

Coefficients: VBBL 2025; further 10% cut delayed

Sources: `vanEmbodied` City of Vancouver embodied carbon guidelines / VBBL 2025: benchmark 400 kg CO2e/m²; new buildings at most 2× the baseline (absolute path cap 800 kg/m²); further 10% cut delayed; Edmonton has no requirement for private buildings

### Floor strength  (`floor_load_need`)

- Stage: What it would take · unit: kPa needed vs designed · level: Technical
- Inputs (formula arguments): host_building, start_case
- Fed by (diagram links): host_building, start_case · feeds: size_fit
- Trust: own 70 / 100 · weakest input (chain) 50 / 100 · status: code values sourced; data-hall loads need the standard

```
floor_load_need = f(host_building, start_case)
equipment load of the hall (racks, batteries) vs the floor's design load for its original use
```

Coefficients: NBC 2020 Table 4.1.5.3: office 2.4 kPa (upper floors), 4.8 kPa (basement and ground floors with exterior access); equipment and service rooms ≥ 3.6 kPa; office row excludes computer rooms; data halls designed for actual loads (4.1.5.1.(1)); data-hall values 7.2 kPa (US DoD) and 12 kPa (TIA-942 Rated-3) need the standard

Sources: `nbc2020_4153` NRC, National Building Code of Canada 2020, Vol. 1, Div. B, Table 4.1.5.3 and Sentence 4.1.5.1.(1) | `src16` Beyond Data research note 16: data centre components and sizing (sources/16_dc_components_sizing.md)

### Ground warming over 20 years  (`ground_warming`)

- Stage: What it would take · unit: K · level: Technical
- Inputs (formula arguments): borefield
- Fed by (diagram links): borefield · feeds: —
- Trust: own 55 / 100 · weakest input (chain) 40 / 100 · status: small-field evidence

```
ground_warming = f(borefield)
from the share of heat put in vs taken out
```

Coefficients: +4.7 K over 20 yr ground-only, +1.2 K with a dry cooler (Zurmuhl 2018, small field); about +3 K in 3 yr where 4.8 × more heat went in than out (Kindaichi 2018, field measurement) — a borefield only lasts if neighbours take heat back out in winter

Sources: `zurmuhl2018` Zurmuhl et al., Hybrid geothermal heat pumps for cooling telecommunications data centers, Stanford Geothermal Workshop 2018 | `kindaichi2018` Kindaichi & Nishina, Renewable Energy 127 (2018) 182–194, doi:10.1016/j.renene.2018.04.065 | `agsGround2009` Alberta Geological Survey OFR 2009-09 (Hastings Lake, east of Edmonton): undisturbed ground 6.1 °C to about 25 m; in-situ conductivity 1.74–2.01 W/m·K, design 1.90. Vancouver: no city-specific measurement found; national map 6–12 °C (GSC OF 6914)

### What the receiver uses now  (`displaced_source`)

- Stage: What it would take · unit: fuel · kg CO₂e/MWh of heat · level: Civic
- Inputs (formula arguments): host_building, competing_sources, grid_co2, hp_electricity
- Fed by (diagram links): host_building, competing_sources, grid_co2, hp_electricity · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 20 / 100 · status: logic defined; factors per network to source

```
displaced_source = f(host_building, competing_sources, grid_co2, hp_electricity)
the heat source a match would replace: from the host-building question (gas boilers · hot-water system · electric baseboard · district energy) or the network's supply mix; carbon change = displaced heat × its factor − heat-pump electricity × grid factor, which can be zero or negative where the displaced source is already low-carbon
```

Coefficients: factors from grid_co2 (NIR 2026) and the network's own reported mix; a network share described as "renewable" is the operator's word and is shown as such

Sources: `nir2026` ECCC, National Inventory Report 1990–2024 (2026 submission), Part 1 (data/NIR_2026_Part1.pdf) and Annex 7 electricity-intensity workbook, Tables A7-1 (Canada), A7-10 (Alberta), A7-11 (British Columbia) | `vanNEU2025` City of Vancouver, Southeast False Creek Neighbourhood Energy Utility (web page, modified 21 May 2025): 70% renewable, mostly sewage heat recovery; 6.6 MW sewage heat recovery added; 100% renewable by 2030

### New clean power: price and route  (`clean_power_price`)

- Stage: What it would take · unit: CAD/MWh · level: Civic
- Inputs (formula arguments): electricity_price
- Fed by (diagram links): electricity_price · feeds: —
- Trust: own 70 / 100 · weakest input (chain) 70 / 100 · status: read 19 Oct 2026

```
clean_power_price = f(electricity_price)
BC: new supply only through BC Hydro calls; Alberta: a corporate PPA, physical or virtual, against the pool price
```

Coefficients: BC Hydro calls: $74/MWh (2024 call, 2024$; restated $76 in 2025$) and $82/MWh (2025 call, 2025$); only BC Hydro signs; no direct customer route found (retail access suspended in 2011, current status not confirmed); grid access for data centres bid as a premium of at least 10% on BC Hydro's charges (2026 Call for Demand). Alberta: pool $43.68/MWh in 2025 ($62.78 in 2024); wind earned $23.18, 46.9% below the pool — the risk a virtual PPA carries; Alberta PPA strike prices not published (gap)

Sources: `bchCall2025` BC Hydro, news release 12 Feb 2025: 2024 Call for Power, 10 projects, weighted average levelized price $74/MWh (2024$), about 4,830 GWh a year (operator) | `bchEPA2026` BC Hydro, 2025 Call for Power EPA application to BCUC (7 Aug 2026), s. 1 p. 1–2, s. 4.1: 2025 call weighted average levelized bid price $82/MWh (2025$), 4 wind projects, 1,158 MW; 2024 call restated $76/MWh (2025$) | `bjCall2025` Bennett Jones, BC Hydro 2025 Call for Power (law-firm summary): EPAs are between successful proponents and BC Hydro | `bchRAS2011` BC Hydro letter to BCUC, 23 Dec 2011: retail access programme suspension sought; no customer had ever taken part (current status not confirmed) | `cfd` BC Hydro 2026 Call for Demand RFA: 100 + 300 MW; 10–145 MW per project; ≥10% premium; curtailment; heat-recovery-ready inside the 10% environmental weight | `brc2025` Business Renewables Centre Canada, State of the Market 2025 (Jan 2026) p. 4–5 and Deal Tracker Q4 2025 p. 1: 3.63 GW bought through PPAs in Canada 2019–2025; over 60% of Alberta renewable projects with a PPA; corporate deals 'virtually disappeared' in 2025 (industry) | `aesoAMS2025wind` AESO, Annual Market Statistics 2025, p. 23 and Table 7 p. 27: wind earned $23.18/MWh in 2025, 46.9% below the average pool price ($43.68); solar 17.4% below

### First payer refunded when neighbours connect  (`grid_refund`)

- Stage: What it would take · unit: rule · level: Civic
- Inputs (formula arguments): interconnection
- Fed by (diagram links): interconnection · feeds: —
- Trust: own 80 / 100 · weakest input (chain) 50 / 100 · status: rules read 19 Oct 2026

```
grid_refund = f(interconnection)
the customer who pays for an extension or substation is refunded a share when later customers connect to it
```

Coefficients: BC Hydro distribution: automatic refund reviews at the 5th anniversary (fee $25k to under $1M), 5th and 10th ($1–4.99M), 5th, 10th and 15th (≥ $5M); BC Hydro transmission (Tariff Supplement 6, read): a reinforcement payment is refunded if a later customer uses it within 5 years; later customers on a shared extension pay a share of replacement cost, and the first customer gets the depreciated value (3% a year), unless BC Hydro's added load is 5% of capacity or less. AESO: within 20 years later customers pay a share and the ISO may refund (no refund under $10,000); data centres pay their own upgrades (Alberta). EPCOR: refund if a new customer shares the extension in the initial term

Sources: `bchDEP2025` BC Hydro, Distribution extension policy (BCUC approved 5 Mar 2025, effective 5 Jul 2025; order number not confirmed): the first payer is refunded when others connect, reviewed at the 5th anniversary (fee $25k to under $1M), 5th and 10th ($1–4.99M), 5th, 10th and 15th (≥ $5M); BC Hydro invests up to $1M at ≤ 1 MVA, $1M per MVA to $10M above | `bchTS6` BC Hydro Electric Tariff Supplement No. 6, Agreement for new transmission service customers (accepted for filing 1991; J.B. download 19 Oct 2026), App. 1 s. 5(e): a payment for system reinforcement is recalculated and the first customer refunded if a later customer uses it within 5 years; s. 10: later customers pay a share of the replacement cost of a common extension in proportion to contract demand, the first customer is paid its depreciated value (3% a year); for 7 years capacity is not excess if the first customer shows it needs it within 3 years; no payment if BC Hydro adds load of 5% of capacity or less, or if the first customer takes under 30% of its contract demand for 36 months | `bchTCIP2026` BC Hydro, Transmission Customer Interconnection Policy, Workshop #2 (4 Mar 2026), slides 12–34: modelled F2036 rate impact on all ratepayers of one new 75–250 MVA customer: +0.4 to +1.5% with no threshold, 0 to −1.2% under threshold options; approaches for data centres 'emerging' | `aesoTariff4` AESO ISO Tariff s. 4.6–4.7 (effective 1 Jan 2026): customer contribution = demand-related costs less the AESO's local investment ($121,800 a year substation fraction; $40,100 per MW a year for the first 7.5 MW, then less) | `aesoTariff5` AESO ISO Tariff s. 5.5 and 5.7 (effective 1 Jan 2025): within 20 years of the original connection, new participants pay a share; the ISO 'may' refund the original customer; no refund under $10,000 | `abDCpay` Government of Alberta, Powering new pathways for data centres: data centres, not Alberta ratepayers, pay for any transmission upgrades they need | `epcorTC2025s44` EPCOR Distribution connection services terms and conditions (Jan 2025), s. 4.4 p. 19: a customer shall not extend its facilities beyond its own property (except as Art. 8.3 allows, not read); s. 6.5.2 p. 23: refund if a new customer shares an extension during the initial term

### Water restrictions in a drought  (`water_restriction_rule`)

- Stage: What it would take · unit: rule · level: Everyday
- Inputs (formula arguments): cooling_type
- Fed by (diagram links): cooling_type · feeds: —
- Trust: own 90 / 100 · weakest input (chain) 70 / 100 · status: text read (90); "essential" undefined (20)

```
water_restriction_rule = f(cooling_type)
per city, text only: what each restriction stage asks of evaporative cooling
```

Coefficients: Vancouver: stages 1–3 do not restrict evaporative cooling; stage 4 asks industry for voluntary cuts; once-through cooling on City water banned at all times; towers need a permit and monthly Legionella reports. Edmonton: EPCOR stages target 5/10/15/25% cuts; stages 3–4 "must"; cooling towers reduced "where possible"; whether data-centre cooling is essential is not defined

Sources: `mvDWCP` Metro Vancouver Drinking Water Conservation Plan: stages 1–3 restrict lawn and outdoor uses; no stage restricts cooling towers or evaporative cooling; stage 4 asks industry for voluntary cuts | `vanOnceThrough` City of Vancouver Water Works By-law 4848 s. 3.9–3.10 (By-law 11777): once-through cooling on City water prohibited from 1 Jan 2020; cooling towers need an operating permit and monthly Legionella reports | `epcorStages` EPCOR water restrictions, business guides: stages 1–4 target 5/10/15/25% reduction; stages 1–2 'actions your business can take', 3–4 'must take'; cooling towers: optimise, reduce 'where possible'; non-essential continuous-flow processes limited (3–4); 'essential' not defined; only official event found: mandatory ban 29 Jan–2 Feb 2024 (plant failure)

### Vibration limit at neighbours (reference)  (`vibration_target`)

- Stage: What it would take · unit: VdB · level: Civic
- Inputs (formula arguments): vibration_rank
- Fed by (diagram links): vibration_rank · feeds: —
- Trust: own 70 / 100 · weakest input (chain) 40 / 100 · status: reference criteria transferred

```
vibration_target = f(vibration_rank)
compare with reference criteria: 72 VdB homes at night, 75 institutions, 65 vibration-sensitive rooms
```

Coefficients: US FTA criteria, transferred; neither city's noise bylaw mentions vibration; ISO standards set no neighbour limits

Sources: `ftaVibration` US FTA Transit Noise and Vibration Impact Assessment Manual (2018): vibration criteria 72 VdB residences (night), 75 institutional, 65 vibration-sensitive rooms (values read from a 2021 FRA reproduction)

### Peak relief and what it earns  (`peak_relief`)

- Stage: What it would take · unit: MW; $/yr · level: Civic
- Inputs (formula arguments): battery, ups_flex, electricity_price
- Fed by (diagram links): battery, ups_flex, electricity_price · feeds: —
- Trust: own 75 / 100 · weakest input (chain) 40 / 100 · status: in hand

```
peak_relief = f(battery, ups_flex, electricity_price)
MW = min(battery MW, MWh × √RTE ÷ event hours); $ = programme rate × kW
```

Coefficients: BC Hydro: Demand Response for Business $50/kW-season, events ≤4 h, Nov–Mar, diesel and fossil generators prohibited; Energy Storage Incentive ≤80 % of eligible cost, new non-exporting batteries ≥25 kW, 10-yr contract (an existing UPS does not qualify); LGS demand charge $13.83/kW·month; AESO reserves need ≥5 MW (supplemental) or ≥10 MW (spinning), smaller sites via an aggregator | 19 Oct 2026: ESI pays up to 80% of eligible cost (LGS, ≥25 kW, non-exporting, 10-yr); AESO reserve averages per MW-hour procured: active $43.71 (2024) / $34.75 (2025), standby $14.03 / $11.28 (Table 13, cost ÷ volume; not by product); all-hours value shown as an upper bound | 19 Oct 2026: ESI pays up to 80% of eligible cost (LGS, ≥25 kW, non-exporting, 10-yr); AESO reserve averages per MW-hour procured: active $43.71 (2024) / $34.75 (2025), standby $14.03 / $11.28 (Table 13, cost ÷ volume; not by product); all-hours value shown as an upper bound | 19 Oct 2026: ESI pays up to 80% of eligible cost (LGS, ≥25 kW, non-exporting, 10-yr); AESO reserve averages per MW-hour procured: active $43.71 (2024) / $34.75 (2025), standby $14.03 / $11.28 (Table 13, cost ÷ volume; not by product); all-hours value shown as an upper bound

Sources: `bch_drb` BC Hydro, Demand Response for Business customer manual | `bch_esi` BC Hydro, Energy Storage System Incentive | `aeso_or` AESO, Operating reserve (ancillary services) | `bchDR2026` BC Hydro Demand Response for Business customer manual (Aug 2026): events Nov–Mar, weekdays 6 am–10 pm, ≤4 consecutive hours, ≤2 a day, ≤20 a season; BC Hydro peaks on weekday evenings (2021 demand report); records 5–6 pm (Dec 2022 winter, Jul 2026 summer) | `aesoStats2025` AESO, Annual Market Statistics 2025, Table 13 (p. 55): operating reserve volumes and costs by category; active procured 2025 5,928 GWh / $206 M, 2024 5,834 / $255 M; standby procured 709 / $8 M and 713 / $10 M | `bchESI2026` BC Hydro Energy Storage Incentive customer manual (24 Sep 2026): lesser of $10,000/kW, $10,000 × kWh/4 or 80% of eligible cost; ≥ 25 kW; behind the meter, non-exporting; 10-yr contract; SGS/MGS/LGS eligible, not transmission

### BC Hydro long-run marginal cost  (`lrmc_bc`)

- Stage: What it would take · unit: $/MWh; $/kW·yr · level: Civic
- Inputs (formula arguments): flexible_load, spare_capacity
- Fed by (diagram links): flexible_load, spare_capacity · feeds: —
- Trust: own 90 / 100 · weakest input (chain) 40 / 100 · status: confirmed (utility filing, public appendix)

```
lrmc_bc = f(flexible_load, spare_capacity)
value of energy or capacity a data centre frees up or avoids = LRMC × quantity; capacity value of flexible load = $300 + $110 per kW-yr of firm reduction at peak
```

Coefficients: 2025 IRP App. F: energy $97/MWh (F2025$; UEC at POI $77 from the 2024 Call for Power levelized bid, + firm transmission 3, network upgrades 6, integration 8, losses 5, time-of-delivery −3); capacity $300/kW-yr point estimate (range 150–400); distribution and non-bulk transmission $110/kW-yr; dual-fuel dwellings cut Lower Mainland peak demand ~75% vs all-electric (Fig. 2-7)

Sources: `bchIRP2025` BC Hydro 2025 Integrated Resource Plan, BCUC Exhibit B-1 (filed 31 Oct 2025, 413 pp.) | `aesoAMS2025` AESO 2025 Annual Market Statistics (Mar 2026; J.B. PDF 16 Oct 2026), Table 1: Alberta pool price, daily average $/MWh

### Equipment outside property tax  (`untaxed_equipment`)

- Stage: What it would take · unit: text · level: Technical
- Inputs (formula arguments): it_load_actual
- Fed by (diagram links): it_load_actual · feeds: —
- Trust: own 90 / 100 · weakest input (chain) 50 / 100 · status: levy read from the bill (90); MGA side waits on Assessment Bulletin 25-02 (50)

```
untaxed_equipment = f(it_load_actual)
per city, list what is and is not taxed: shell and land (assessed), computing equipment (Alberta: not municipally assessed; ≥ 75 MW provincial levy), BC servers (not settled)
```

Coefficients: Alberta Data Centre Levy from 1 Jan 2026 for ≥ 75 MW: (E + F) × R; E = 45% of cost of equipment under 4 years, F = 15% of older; R 2% on grid power → about 0.9% of new equipment cost a year; paid to the Province, creditable against Alberta corporate tax; Vancouver: no equivalent

Sources: `abDataCentreLevy` Alberta Corporate Tax Act Part 9.1 'Data Centre Levy', ss. 92.2–92.5 (Bill 12, Financial Statutes Amendment Act, 2025 (No. 2); amended by Bill 17, 2026): data centres of 75 MW or greater; levy (E + F) × R, E = 45% of cost of computing equipment under 4 years, F = 15% of older; R 2% grid power, 1% new capacity, 0% off-grid; from 1 Jan 2026; paid to the Province, creditable against Alberta corporate tax; computing equipment assessable under the MGA is excluded from the levy base

### Warm air drawn back into the coolers  (`recirculation_flag`)

- Stage: What it would take · unit: flag · level: Technical
- Inputs (formula arguments): plant_schedule
- Fed by (diagram links): plant_schedule · feeds: —
- Trust: own 80 / 100 · weakest input (chain) 70 / 100 · status: geometric flag from the ASHRAE handbook (approximate); no recirculation percentage formula

```
recirculation_flag = f(plant_schedule)
flag when the coolers sit inside a roof recirculation zone — top of the units below Hc = 0.22R near the upwind roof edge (R = Bs^0.67 × BL^0.33, Bs and BL the smaller and larger of the building's upwind height and width) — or within R downwind of a taller neighbour, or next to a wall or screen that blocks their discharge; also when units sit at different fan heights or with gaps between banks
```

Coefficients: wind alone cut a modelled bank's heat rejection to 83.5–89.5% of still-air (Duvenhage & Kröger 1996, peer-reviewed, numerical: cross wind starves up-wind fans; wind along the bank drives plume recirculation; higher fan platforms recirculate more); field cases 13.6% and 24% recirculation (1971, manufacturer engineers — claim); a hot roof warmed inlet air about 0.3 °C (Wray & Akbari 2008, 70); ASHRAE: recirculation "can be a serious problem" for units with intake and exhaust on one housing; roof air "considerably hotter" cuts condenser capacity; zone geometry approximate (Wilson 1979)

Sources: `ashraeCh45` ASHRAE Handbook | `duvenhageKroger1996` Duvenhage & Kröger 1996, The influence of wind on the performance of forced draught air-cooled heat exchangers (J. Wind Eng. Ind. Aerodyn. 62, 259–277; peer-reviewed, numerical; read 19 Oct 2026): cross winds cut the air delivered by up-wind fans; winds along the bank's long axis raise hot-plume recirculation along its sides; a raised fan platform sees more wind and more up-wind recirculation; modelled system effectiveness 83.5% (cross wind, mostly lost fan flow; 3.1% from recirculation) and 89.5% (long-axis wind, mostly recirculation) | `gunterShipes1971` Gunter & Shipes 1971, Hot air recirculation by air coolers (AIChE-ASME conf.; authors from a manufacturer): field cases 13.6% and 24% recirculation, capacity down about 10% and 35% | `wrayAkbari2008` Wray & Akbari 2008 (peer-reviewed): a hot roof raised rooftop condenser inlet air about 0.3 °C; removed by a cool roof coating

### EV port repaid by  (`ev_repay`)

- Stage: What it would take · unit: kWh · level: Civic
- Inputs (formula arguments): ev_stalls
- Fed by (diagram links): ev_stalls · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 50 / 100 · status: derived 19 Oct 2026

```
ev_repay = f(ev_stalls)
kWh = port cost ÷ (public price − electricity cost)
```

Coefficients: BC: $15,000 ÷ (28.28 − 6.79) ¢ ≈ 70,000 kWh (≈ 9,400 h at 7.4 kW); Alberta: no public rate found; utilisation not published (no Level 2 figure)

Sources: `bcucG3026` BCUC Order G-30-26 (23 Feb 2026): BC Hydro public EV charging, Level 2 28.28 ¢/kWh; fast charging 39.70 ¢/kWh from 1 Apr 2026 (as proposed in the decision) | `nrcanEVinfra2024` Dunsky and ICCT for NRCan, Electric Vehicle Charging Infrastructure for Canada (Feb 2024), Table 12: Level 2 $15,000 a port, DC fast $160,000 at 125 kW (2025, 2022 $) | `bchTariff2026` BC Hydro Electric Tariff (PDF, J.B. download 15 Oct 2026; read by Claude): RS 1600/1601/1610/1611 Large General Service, Revision 16, effective 1 Apr 2026 (BCUC G-76-25): 29.99 ¢/day, $13.83/kW of billing demand, 6.79 ¢/kWh, for ≥150 kW or >550,000 kWh a year; RS 1830 Transmission Service, Revision 3, effective 1 Apr 2026: supply at 60 kV or higher, $12.178/kVA, 4.914 ¢/kWh; RS 2289 Self-Generation Service, original, effective 1 Jul 2026 (G-64-26): only for customers taking service at distribution voltage; clean or renewable facility ≤100 kW nameplate or ≤100 kW per phase net injection, on the same or an adjacent parcel; BC Hydro pays 10 ¢/kWh for net generation, credit balance paid out each 30 April; RS 4100 Public EV Charging (BC Hydro's own stations), effective 1 Apr 2026: Level 2 31.30 ¢/kWh, fast 40.29 ¢/kWh

### Battery rules  (`battery_code_path`)

- Stage: What it would take · unit: rule · level: Civic
- Inputs (formula arguments): battery
- Fed by (diagram links): battery · feeds: —
- Trust: own 90 / 100 · weakest input (chain) 50 / 100 · status: rules read (90)

```
battery_code_path = f(battery)
grid battery (ESS): certified; not above 23 m or below the lowest egress level unless in an electrical equipment vault; outdoors ≥ 3 m from egress and ≥ 1.5 m from openings unless UL 9540A-evaluated; UPS batteries are not an ESS and follow the general battery rules (ventilation, authorized access)
```

Coefficients: CEC 2024 Section 64 (Rules 64-902, 64-926, 64-1002; Appendix B) in force BC 4 Mar 2025, Alberta 1 Apr 2025; no city fire bylaw adds battery rules in either city; NFPA 855 commercial thresholds stay reference only (unverified)

Sources: `cec2024ESS` CSA C22.1:24 Canadian Electrical Code, Section 64 (read 19 Oct 2026, J.B. library copy): in force BC 4 Mar 2025, Alberta 1 Apr 2025 (Alberta Municipal Affairs notice, Apr 2025). Rule 64-1002: battery energy storage over 1 kWh must be certified (Rule 2-024), installed to the manufacturer's instructions, and

### Share of the data centre's power from its own solar  (`pv_share`)

- Stage: What it would take · unit: % · level: Technical
- Inputs (formula arguments): pv_roof, pv_facade, it_load_actual, pue
- Fed by (diagram links): pv_roof, pv_facade, it_load_actual, pue · feeds: —
- Trust: own 70 / 100 · weakest input (chain) 50 / 100 · status: derived

```
pv_share = f(pv_roof, pv_facade, it_load_actual, pue)
pv_MWh ÷ (IT load × PUE × 8,760)
```

Coefficients: worked check (roof areas assumed, not sourced): 1 MW IT site 1.4–4.8 %; 10 MW site 0.28–0.96 %; PV is a small share at data-centre densities; avoided carbon at the tool basis, NIR 2026 consumption intensity (2024): BC 18.1, Alberta 346.1 g CO2e/kWh (average factors)

Sources: `nrcan_pv2006` Pelland, Poissant, McKenney et al., The Development of Photovoltaic Resource Maps for Canada, CANMET (NRCan) 2006-046, Table 1 | `bc_ef2026` Government of BC, Electricity emission intensity factors (updated 26 May 2026) | `ab_ghgperf` Government of Alberta, Alberta's greenhouse gas emissions reduction performance

### Air permit trigger  (`air_permit_trigger`)

- Stage: What it would take · unit: rule · level: Civic
- Inputs (formula arguments): genset_emission_rate
- Fed by (diagram links): genset_emission_rate · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 60 / 100 · status: rule read; applicability unsettled

```
air_permit_trigger = f(genset_emission_rate)
Vancouver: daily NOx on a test day vs 5 kg/day (Bylaw 1082 s. 7(12)); Edmonton: emergency standby generators exempt from an EPEA approval
```

Coefficients: a 2 MW generator at full load passes 5 kg of NOx in about 10 minutes (arithmetic, 60: whether s. 7(9) exempts engines outright is unsettled)

Sources: `mvBylaw1082` Metro Vancouver Air Quality Management Bylaw 1082 (consolidated): s. 7(12) exempts discharges under 5 kg/day NOx; s. 7(9) engines (applicability unsettled)

### Air against the limits  (`air_vs_objective`)

- Stage: What it would take · unit: pass / refine · level: Everyday
- Inputs (formula arguments): no2_at_receptor, air_screen_1h
- Fed by (diagram links): no2_at_receptor, air_screen_1h · feeds: —
- Trust: own 70 / 100 · weakest input (chain) 60 / 100 · status: objectives read (90); background partial

```
air_vs_objective = f(no2_at_receptor, air_screen_1h)
C(avg) = C(1 h) × averaging ratio (24 h 0.60, annual 0.10) + background; test against the city objective AND the federal standard: "passes screen" or "refined modelling needed"; no score
```

Coefficients: Vancouver: Metro Vancouver NO2 1-h 79 µg/m³, annual 22.6; PM2.5 24-h 25; Clark Drive background NO2 ≈ 82 µg/m³ (1-h metric), already over the regional objectives; Edmonton: Alberta NO2 1-h 300 µg/m³ (hour by hour, reading 60), PM2.5 24-h 29; federal NO2 1-h 79 (2025), PM2.5 27 → 23 (2030); Edmonton short-term background a gap

Sources: `aerscreenGuide` US EPA AERSCREEN User's Guide (2021) s. 1.1: 1-h to 3-h 1.00, 8-h 0.90, 24-h 0.60, annual 0.10 | `mvAAQO` Metro Vancouver ambient air quality objectives (Nov 2024): NO2 1-h 79 µg/m³ (42 ppb), annual 22.6 µg/m³; PM2.5 24-h 25 µg/m³ (rolling) | `abAAQO` Alberta Ambient Air Quality Objectives (2024): NO2 1-h 300 µg/m³; PM2.5 24-h 29 µg/m³ (statistical form for NO2 1-h not stated; hour-by-hour reading conf 60) | `caaqs` CCME Canadian Ambient Air Quality Standards: NO2 1-h 2025 standard 79 µg/m³ (42 ppb, 98th percentile, 3-yr average); PM2.5 24-h 27 µg/m³ (2020) → 23 (2030) | `bcAirBackground` BC State of Environment reports: Vancouver Clark Drive NO2 1-h metric 43.6 ppb (≈82 µg/m³), annual 15 ppb; PM2.5 24-h 27, annual 7 µg/m³ | `mvAirSummary2024` Metro Vancouver annual air quality summary 2024: Clark Drive over both regional NO2 objectives | `acaEdmonton` Alberta Capital Airshed: Edmonton East NO2 annual mean 13.9 ppb (2023); no short-term percentile values found

### Standoff and zones  (`standoff`)

- Stage: What it would take · unit: m · level: Everyday
- Inputs (formula arguments): crossing_type
- Fed by (diagram links): crossing_type · feeds: —
- Trust: own 90 / 100 · weakest input (chain) 60 / 100 · status: confirmed

```
standoff = f(crossing_type)
10 m all new facilities; 45 m enhanced (GO-ITS 25.18); zone hierarchy PZ/RZ/OZ/SZ/HSZ (GCPSG-015)
```

Coefficients: Ontario standard transferred; TIA-942 ratings as proxy

Sources: `goits` Ontario GO-ITS 25.18 v1.2 | `gcpsg015` RCMP GCPSG-015 (2024) | `tia942` TIA-942 ratings

### Property tax to the city  (`property_tax`)

- Stage: What it would take · unit: $/yr · level: Civic
- Inputs (formula arguments): floor_area, build_cost
- Fed by (diagram links): floor_area, build_cost · feeds: tax_split
- Trust: own 60 / 100 · weakest input (chain) 60 / 100 · status: rates read (90); the improvement value of a new building is assumed from its cost (60)

```
property_tax = f(floor_area, build_cost)
assessed value (land + taxable improvements) × combined class rate
```

Coefficients: Vancouver Class 6 (Business & Other): 12.4672 per $1,000 in 2026, of which the City 7.09436; Edmonton non-residential: 25.22 + 3.97 education = 29.19 per $1,000 in 2026; servers and computing equipment are not municipally assessed in Alberta; in BC whether servers are assessed is not settled (0)

Sources: `vanTaxRates2026` City of Vancouver, RTS 18298, 2026 tax rates (Council 5 May 2026) and rates by-laws a2–a5: Class 6 Business & Other general purposes 7.09436 per $1,000; all taxing authorities 12.46720 (with DPRP adjustment) | `edmTaxRates2026` City of Edmonton 2026 property tax bylaw: non-residential municipal 0.0252216 and education 0.0039677 per $1 of assessed value ($25.22 + $3.97 = $29.19 per $1,000; units confirmed from the bylaw's own levy row, round 2) | `bcAssessClasses` BC Government, property assessment classes (Prescribed Classes of Property Regulation, last amended Sep 2024): Class 6 Business and Other is the residual class

### Hour-by-hour match  (`hourly_overlap`)

- Stage: What it would take · unit: % of receiver demand met · MWh surplus · MW backup · level: Technical
- Inputs (formula arguments): heat_delivered, demand_profile, load_factor, stored_heat
- Fed by (diagram links): heat_delivered, demand_profile, load_factor, stored_heat · feeds: futures
- Trust: own 70 / 100 · weakest input (chain) 50 / 100 · status: computable from data in hand

```
hourly_overlap = f(heat_delivered, demand_profile, load_factor, stored_heat)
for each hour of the typical year: delivered = min(heat available, receiver demand); report the share of the receiver's annual demand met, the heat still rejected (surplus), and the receiver's peak that must be met without the data centre
```

Coefficients: annual totals overstate the match: Vancouver heat demand is 47% in Dec–Feb and 2.5% in Jun–Aug (CWEC, computed); the data centre's heat is near-flat

Sources: `cwec` CWEC 2020 edition typical-year files, ECCC Engineering Climate Datasets (collaboration.cmc.ec.gc.ca …/CWEC_FMCCE/CWEC_FMCCE_v_2020): CAN_BC_VANCOUVER-INTL-A_1108395_CWEC.epw; CAN_AB_EDMONTON-INTL-A_3012216_CWEC.epw | `stratego` STRATEGO / Heat Roadmap Europe D2.2 hourly distributions

### Operator floor price  (`price_floor`)

- Stage: What it would take · unit: CAD/MWh · level: Civic
- Inputs (formula arguments): heat_delivered, crf
- Fed by (diagram links): heat_delivered, crf · feeds: window, heat_value_split
- Trust: own 60 / 100 · weakest input (chain) 50 / 100 · status: derived

```
price_floor = f(heat_delivered, crf)
CRF × capex_capture (0.5–0.65 M€/MW_heat) ÷ MWh − cooling savings; bounded by revealed prices (Fortum €11–50; Exergi 400 SEK ≈ $57)
```

Coefficients: no Canadian operator figure; 111 E 5th implicit $0 + unrecovered capex; DEA Aug 2026 (2025 €): waste-heat heat pump total investment 1.13 M€/MW_heat at 1 MW, 0.95 at 3 and 10 MW (heat pump 0.36–0.55, building 0.06–0.12, other — pipes, electrical, controls, consultancy — 0.47–0.52); +5–15% at 40–80 °C DH temperatures; fixed O&M ≈ 2,100 €/MW·yr, variable 3.07 €/MWh excluding electricity; lifetime 25 yr; construction 0.5 yr; minimum load 25%; electric boiler 0.07 M€/MW, gas boiler 0.064 M€/MW; CALIBRATION: realised heat-pump full-load hours 1,300–2,700 h in ramp-up years (Tallaght year 1, Odense 2020) and 4,400–7,100 h mature (Odense 2024 ≈ 4,365; Mäntsälä 5,000; STACK Oslo claim 7,143; Inspirationskatalog design 5,000–7,000); all-in capital 0.66 M€/MW (Odense, 44 MW, utility) to 1.53 M€/MW (ReUseHeat, 0.3 MW, excl. network), Equinix PA10 0.86 incl. 2.6 km network — the register's DEA 0.95–1.13 sits inside

Sources: `bytes2heat` DENEFF / IER Stuttgart, Bytes2Heat Best-Practice-Übersicht (2023): Telehouse FRANKY 35 MW DC → Westville 2,400 MWh/yr, 2 × 320 kWth HPs, 30 → 70 °C, 15-yr contract; ReUseHeat Braunschweig 300 kWth, COP 3.6 design, 25/18 → 70/40 °C, 1,750 MWh/yr, €460k; HLRS 270 MWh/yr | `dea` Danish Energy Agency, Technology Data for Electricity and District Heating Production, data sheet updated August 2026 (2025 EUR): sheets 40 (compression heat pumps, waste heat 1/3/10 MW; air-source), 41 (electric boilers), 44 (gas boilers), 140 (pit storage) | `dfKatalog2022` Dansk Fjernvarme, Inspirationskatalog for store varmepumper 2022, pp.8–11 (Tietgenbyens Varmecentral): nominal 23.9 + 20.7 MW, nominal COP 4.4 / 4.9, source 27→15 °C, DH 40→75 °C, 5,000–7,000 full-load h, average COP 2021–22 4.2 'inklusive cirkulations- og distributionspumper', investment 215 M DKK, DH output ≈ 30 % above DC-side heat | `engiePA10` Engie Solutions / SMIREC press releases 2022 and 21 Jun 2024 (Equinix PA10 → Plaine Commune Énergie): water recovered at 28 °C, up to 6.6 MW, 10,800 MWh/yr projected, €5.7 M investment, heat supplied free for 15 years | `exergi` Stockholm Exergi: 'indikativt 2 MSEK årligen för 1 MW vid 5 000 timmar' → 400 SEK/MWh; supply normally 68 °C | `floor` Operator floor price at any Canadian site | `fortum` Fortum Avoin kaukolämpö purchase prices from 1 May 2026: €11 (≥16.1 °C) to €50/MWh (≤−8 °C) | `hiltunen2020` Hiltunen & Syri 2020, Energies 13(14):3551, heat-recovery capex 0.5–0.65 M€/MW | `nivosMantsala` Nivos (Mäntsälä utility) articles 2016/2019 and 9 Mar 2022; Sitra case 18 Oct 2019; NIB loan page 21 Oct 2019: DC power demand ~15 MW (phase 1), heat recovery nominal ~6 MW, 4.0 MW heat pump (2015), 20 GWh delivered 2018 = 54 % of town demand, 30 GWh/yr programme figure, exhaust ~37 °C → 80 °C, gas −70 %, DH price −11 % | `rts19744` City of Vancouver RTS 19744 (30 Jun 2026): 111 E 5th, 'up to 40 MW'; cond. 1.11 heat recovery a material condition at the applicant's sole cost; 579 submissions | `tallaghtD22` ENABLE DHC D2.2 Tallaght (2025) pp.5–8 and Codema project page: 3,770 MWh distributed in the first year (2023) from a 3 MW heat pump (Heat Works CLG, SDCC-owned); source ~25 °C, network 70/55 °C; heat supplied by AWS free; customer tariff fixed + kWh

### Price window overlap  (`window`)

- Stage: What it would take · unit: CAD/MWh · level: Civic
- Inputs (formula arguments): price_floor, price_ceiling
- Fed by (diagram links): price_floor, price_ceiling · feeds: payback, ledger
- Trust: own 60 / 100 · weakest input (chain) 50 / 100 · status: derived

```
window = f(price_floor, price_ceiling)
overlap = [floor_low, floor_high] ∩ [ceiling_low, ceiling_high]; pass if non-empty
```

### What a rezoning takes  (`rezoning_price`)

- Stage: What it would take · unit: months; $ · level: Civic
- Inputs (formula arguments): zoning_status, floor_area
- Fed by (diagram links): zoning_status, floor_area · feeds: —
- Trust: own 80 / 100 · weakest input (chain) 70 / 100 · status: Vancouver and Edmonton fees and durations in hand; Edmonton arterial-road assessment rates not retrieved

```
rezoning_price = f(zoning_status, floor_area)
duration + application fee + levies and charges on new floor area
```

Coefficients: Vancouver: target ~15 months to decision (~1 year from fee to hearing); CD-1 fee $94,500 (elsewhere) or $226,300 (downtown/Broadway) + $1,590 per 100 m² under 8,000 m²; DCL industrial $112.87/m², mixed employment $211.54/m² (none if floor area does not increase); ACC $12.92–24.22/m² from 30 Sep 2026; CAC exempt for 100 % industrial after 30 Sep 2026. Also where the City attaches conditions (111 E 5th heat delivery) and residents get a say (579 submissions). Edmonton (2026 Planning and Development Fee Schedules, effective 1 Jan 2026): rezoning to an Industrial zone (BE, IM, IH, … DC/IND) $2,745 base + $340/ha; Direct Control — Administrative $7,930, Minor $7,930 + $0.62/m² buildable, Major $15,855 + $1.06/m² buildable (Major = significant change in character or intensity, comprehensive site planning with technical studies); plus a notification and engagement fee of $1,650 per component; development permit, non-residential new building $1,220 + $500 lot-grading inspection up to 500 m² GFA, + $1.20/m² above; building permit $11 per $1,000 construction value to $1 M, $10 per $1,000 above. Off-site levies (Facilities Bylaw 19340, consolidated 23 Apr 2024; Arterial Roads Bylaw 14380, consolidated May 2026) are charged as a condition of subdivision (and, for arterial roads, development permit) only within defined catchments, mostly new neighbourhoods and industrial areas; rates are set in a separate annual document (2026 Off-site Levies Approved Rates, not yet retrieved). Edmonton rezoning duration still not stated; Edmonton duration: rezoning target 160 calendar days (~5.5 months) for complex files, which include all Direct Control zones, if a pre-application meeting is held; 90 days for non-complex; very complex set at the pre-application meeting (Rezoning Application Complexity, 1 Jan 2024); actual April–June 2026: 147-day average, 70% within target (Processing Times page); then public hearing, typically every two weeks. Fire hall off-site levy (Bylaw 19340) 2026 rates per hectare at subdivision, held at 2024–25 levels: e.g. Mistatim Industrial $23,724, EETP $20,618, Northeast EETP $12,816, Blatchford $32,813 (range $12,816–42,032)

Sources: `vanRezoneTime` City of Vancouver: typical CD-1 rezoning 'Target ~16 weeks to Letter of Response', 'Target ~15 months to decision' (process overview); 'about one year to process (from fee payment to public hearing)' (apply-to-rezone page, Jun 2026) | `vanFees2026` City of Vancouver 2026 development and building permit fees (effective 1 Jan 2026), Schedule 2 s.3 new CD-1: elsewhere $94,500 + $1,590 per 100 m² (max $343,700) under 8,000 m²; Downtown/Broadway $226,300 + $1,590/100 m²; larger bands to $8,183,200; development permit 'all other uses' conditional $2,530 per 100 m² to 500 m² then $1,570 (max $366,600) | `vanDCL` Vancouver DCL Bulletin (amended 25 Aug 2026), Table 1 rates from 10 Dec 2025: Industrial (I-2, M-1, M-1A, M-1B, M-2) $112.87/m²; Mixed Employment (IC-1–3, I-1, I-1A–C, I-3, I-4) $211.54/m²; no levy where floor area does not increase (s.6.1(a)) | `vanACC` Vancouver Amenity Cost Charges, RTS 18333 (6 Jul 2026) Table 5: Industrial $12.92/m², Mixed-Employment $24.22/m², Commercial $32.29/m², effective 30 Sep 2026, in addition to DCLs | `vanCAC` Vancouver CAC Policy (amended 30 Sep 2026) s.8.2(c): rezonings submitted after 30 Sep 2026 that are 100 % commercial, industrial and institutional are exempt | `rts19744` City of Vancouver RTS 19744 (30 Jun 2026): 111 E 5th, 'up to 40 MW'; cond. 1.11 heat recovery a material condition at the applicant's sole cost; 579 submissions | `edmRezone` City of Edmonton rezoning page: fees paid before acceptance; notice to at least 60 m; public hearing; Direct Control needs 21-day pre-application notice; 'Processing times vary'; fees and durations not stated on the page | `edmFees2026` City of Edmonton, 2026 Planning and Development Fee Schedules (effective 1 Jan 2026, updated Dec 2025) | `edmBL19340` City of Edmonton Bylaw 19340, Facilities Off-site Levies Bylaw (consolidated 23 Apr 2024) | `edmBL14380` City of Edmonton Bylaw 14380, Arterial Roads for Development (office consolidation May 2026) | `edmProcTimes` City of Edmonton, Development and Construction Application Processing Times (actuals April–June 2026), web page saved 14 Oct 2026 | `edmRezComplexity` City of Edmonton, Rezoning Application Complexity (updated 1 Jan 2024) | `edmOSL2026` City of Edmonton, 2026 Fire Hall Off-Site Levy Rates (OSL Steering Committee, 23 Apr 2026; rates held at 2024–2025 levels)

### Levelised cost of heat  (`lcoh`)

- Stage: What it would take · unit: CAD/MWh · level: Civic
- Inputs (formula arguments): crf, hp_electricity, heat_delivered
- Fed by (diagram links): crf, hp_electricity, heat_delivered · feeds: payback
- Trust: own 70 / 100 · weakest input (chain) 50 / 100 · status: in hand

```
lcoh = f(crf, hp_electricity, heat_delivered)
(CRF × capex + O&M + energy) ÷ MWh
```

Coefficients: IEA SHC Task 54; O&M 2,000 €/MW·yr

Sources: `crf` CRF = i / (1 − (1+i)^−n) (NREL ATB); LCoH (IEA SHC Task 54); TCO (Barroso ch. 8) (Formulas sheet) | `hiltunen2020` Hiltunen & Syri 2020, Energies 13(14):3551, heat-recovery capex 0.5–0.65 M€/MW | `epcorDAS2026` EPCOR Distribution & Transmission, 2026 interim rates (AUC Decision 30298-D01-2025, 10 Dec 2025), per day: DAS-TOU (150–5,000 kVA secondary) $43.46/site + $0.22878/kW, energy $0; transmission pass-through SAS-TOU $0.00253/kWh + capacity $0.12868 + demand $0.24154 + other $0.00107 per kW per day + operating reserve 8.09% × kWh × pool price (based on the proposed 2026 AESO tariff). Per-kWh adders ≈ $2.53/MWh + 8% of pool; demand-type ≈ $18/kW-month (agent calculation); riders not included | `bchTariff2026` BC Hydro Electric Tariff (PDF, J.B. download 15 Oct 2026; read by Claude): RS 1600/1601/1610/1611 Large General Service, Revision 16, effective 1 Apr 2026 (BCUC G-76-25): 29.99 ¢/day, $13.83/kW of billing demand, 6.79 ¢/kWh, for ≥150 kW or >550,000 kWh a year; RS 1830 Transmission Service, Revision 3, effective 1 Apr 2026: supply at 60 kV or higher, $12.178/kVA, 4.914 ¢/kWh; RS 2289 Self-Generation Service, original, effective 1 Jul 2026 (G-64-26): only for customers taking service at distribution voltage; clean or renewable facility ≤100 kW nameplate or ≤100 kW per phase net injection, on the same or an adjacent parcel; BC Hydro pays 10 ¢/kWh for net generation, credit balance paid out each 30 April; RS 4100 Public EV Charging (BC Hydro's own stations), effective 1 Apr 2026: Level 2 31.30 ¢/kWh, fast 40.29 ¢/kWh

### Rooftop solar cost per MWh  (`pv_lcoe`)

- Stage: What it would take · unit: CAD/MWh · level: Civic
- Inputs (formula arguments): pv_roof, pv_cost
- Fed by (diagram links): pv_roof, pv_cost · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 60 / 100 · status: derived 19 Oct 2026

```
pv_lcoe = f(pv_roof, pv_cost)
(CRF(5.6%, 30) × capex + O&M) ÷ MWh a year, against the energy charge it avoids
```

Coefficients: self-use offsets the energy charge (RS 2289: "offset their consumption"); demand charge not reduced (flat load); BC exports 10 ¢/kWh up to 100 kW per phase; Alberta micro-generation under 5 MW

Sources: `bcucG6426` BCUC Order G-64-26 and Decision (24 Mar 2026): RS 1289 net metering closed 1 Jul 2026; RS 2289 net injection limit 100 kW per phase after the customer's load; 10 ¢/kWh for net generation | `aesoMicrogen2025` AESO, Connecting Microgeneration (17 Sep 2025): under 5 MW; small under 150 kW credited at the retail energy rate; large at the hourly pool price

### Cost of reserved (unused) capacity  (`reserved_cost`)

- Stage: What it would take · unit: USD/W·yr · level: Civic
- Inputs (formula arguments): spare_capacity, build_cost
- Fed by (diagram links): spare_capacity, build_cost · feeds: —
- Trust: own 70 / 100 · weakest input (chain) 50 / 100 · status: confirmed (textbook method)

```
reserved_cost = f(spare_capacity, build_cost)
(capex + non-power opex) × (1 ÷ occupancy − 1); i.e. the share of a built-but-empty data centre that the offerable capacity carries
```

Coefficients: Barroso §6.5: scale by inverse of occupancy; two-thirds full → +50% opex; half-full: server TCO $8,981 vs $6,310

Sources: `barroso2018` Barroso, Hölzle, Ranganathan 2018, The Datacenter as a Computer, 3rd ed., ch.6 Modeling Costs

### Consultation and rights that apply  (`consultation`)

- Stage: What it would take · unit: process · level: Everyday
- Inputs (formula arguments): licence_flag, grid_headroom
- Fed by (diagram links): licence_flag, grid_headroom · feeds: city_commitments
- Trust: own 60 / 100 · weakest input (chain) 60 / 100 · status: triggers read directly (90); whether an option meets one depends on land tenure, water source and on-site generation (60); Alberta 2013 policy read

```
consultation = f(licence_flag, grid_headroom)
list the approvals an option needs that trigger Crown consultation, and the City commitments that apply; describe, never predict
```

Coefficients: BC: Water Sustainability Act licence (own water source) → Province may consult; on-site generation ≥ 50 MW or groundwater ≥ 75 L/s → EA reviewable (data centres not listed); new utility works needing a CPCN → BCUC reviews whether the Crown consulted; City land → UNDRIP Call 1.18 first right of refusal; Call 2.3 'include this in permitting decisions' (a commitment, not a legal duty); local governments have no constitutional duty to consult. Alberta: Water Act licence or public-land disposition → waits on consultation (ACO); power plant ≥ 1 MW → AUC application, Indigenous groups in the participant program only in Category A or by AUC call (Category C); a thermal plant < 10 MW on private land is Category B (not ordinarily included); Alberta's 2013 policy (amended 2020) applies to Crown decisions on provincial Crown lands and excludes access to private lands where Nations have no right of access, so a private urban site triggers it only through a Crown approval such as a water licence; no Alberta equivalent of the BC Declaration Act found

Sources: `abConsult` Government of Alberta, data centres | `bchCfDRfA` BC Hydro 2026 Call for Demand, Request for Applications: 300 MW AI + 100 MW storage data centres; projects 10–145 MW; scoring 30 % cost, 30 % data sovereignty, 20 % community (incl. brownfield), 10 % environment ('heat recovery ready', PUE, WUE), 10 % First Nations | `vanUndrip` City of Vancouver UNDRIP Strategy (endorsed 25 Oct 2022; 79 Calls to Action; e.g. 1.18 first right of refusal on City land, 2.3 'include this in permitting decisions', 3.10 free, prior and informed consent) and Action Plan 2024–28 (endorsed 25 Jun 2024; 'early engagement threshold points', in progress) | `bcDeclarationAct` BC Declaration on the Rights of Indigenous Peoples Act (2019) s. 3; Interpretation Act amendment 23 Nov 2021; the Province's plan does not set local-government duties; 2014 provincial guide: local governments have no constitutional duty to consult but may have a statutory one; the Province's duty includes 'decisions that affect private land' | `bcEAthresholds` BC Reviewable Projects Regulation (243/2019): power plants ≥ 50 MW, transmission ≥ 345 kV and ≥ 40 km, groundwater ≥ 75 L/s; data centres not listed | `aucGuidance` AUC Guidance for proponents, participant involvement categories: A (Crown duty found for related approvals, or reserve/Settlement in radius) Indigenous groups included; B (e.g. thermal plants < 10 MW, private land with limited off-site impacts) not ordinarily included; C case by case; 'The ACO has no direct role in the AUC's regulatory process' | `abConsultPolicy2013` Government of Alberta, Policy on Consultation with First Nations on Land and Natural Resource Management, 2013 (amended 1 Apr 2020; read 19 Oct 2026): applies to Crown decisions on land and natural resource management that may adversely impact Treaty rights or traditional uses on provincial Crown lands; 'Matters Not Subject to this Policy' include 'Accessing private lands to which First Nations do not have a right of access for exercising their Treaty rights and traditional uses'; proponents (industry, municipal governments) may be delegated procedural aspects; the consultation office assesses adequacy

### Time to build and connect  (`construction_time`)

- Stage: What it would take · unit: months · level: Everyday
- Inputs (formula arguments): zoning_status, lead_time
- Fed by (diagram links): zoning_status, lead_time · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 60 / 100 · status: in hand (transferred); local derivation possible for Edmonton

```
construction_time = f(zoning_status, lead_time)
planning and permits + construction + grid connection (often the longest)
```

Coefficients: 12–18 months per building; 2–3 years to operation; grid can add 12–36 months (JLARC; IEA); Vancouver rezoning ~15 months; Edmonton permit data give build times for non-residential permits since 2024; Edmonton permit processing (targets / actual average April–June 2026): development permit, commercial or industrial new building 90 days / 73 days (76% within target); building permit, commercial/industrial 120 days / 64 days (86%); excludes notification and appeal periods

Sources: `jlarc2024` Virginia JLARC Report 598, Data Centers in Virginia (Dec 2024): building 'usually takes about 12 to 18 months'; campus 'five or more years'; ~50 full-time workers per 250,000 sq ft ('one employee per 5,000 square feet'), about half contract; ~1,500 workers at peak construction; grid additions 12–36 months longer; 'One-third of data centers are currently located near residential areas'; residential bills +$14–37/month | `ieaEnergyAI` IEA, Energy and AI (2025): 'a data centre can be operational in two to three years' | `vanRezoneTime` City of Vancouver: typical CD-1 rezoning 'Target ~16 weeks to Letter of Response', 'Target ~15 months to decision' (process overview); 'about one year to process (from fee payment to public hearing)' (apply-to-rezone page, Jun 2026) | `edmPermits` City of Edmonton General Building Permits (open data 24uj-dj8v): 'DATA CENT' records incl. office → data centre (2009, 2011), warehouse → data centre (17204 114 Ave NW, 2015, 2020), and a 2021 demolition of a 'Sobeys Data Centre'; occupancy dates for non-residential permits completed since 2024 | `edmProcTimes` City of Edmonton, Development and Construction Application Processing Times (actuals April–June 2026), web page saved 14 Oct 2026

### Payback and IRR  (`payback`)

- Stage: What it would take · unit: yr · level: Technical
- Inputs (formula arguments): lcoh, window, crf, receiver_demand, distribution_cost
- Fed by (diagram links): lcoh, window, crf, receiver_demand, distribution_cost · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 50 / 100 · status: revised 19 Oct 2026: one BC cost of capital (2010); EN 253 read through a secondary report

```
payback = f(lcoh, window, crf, receiver_demand, distribution_cost)
simple payback = (pipe + connection + heat pump) ÷ (heat sold × (value − electricity ÷ COP) − upkeep); levelised cost = (CRF(i,30)·pipe + CRF(i,25)·heat pump + upkeep) ÷ heat sold + electricity ÷ COP, against the heat value
```

Coefficients: i = 5.6% real (Squamish NEU 2010, BCUC-regulated utility WACC); pipe 30 yr (EN 253:2019 via Energiforsk 2022:872); heat pump 25 yr, 1.13–0.95 M€/MW, upkeep 2,100 €/MW·yr + 3.07 €/MWh (DEA sheet 40); 4,400–7,100 full-load h; middle case = midpoints. Check: Pärssinen 2019 Table 4 paybacks 1.8–5.1 yr (Finnish, larger units). No 5-year threshold (RVO 2018 kept only for the 1.5 km search radius) | logic test 19 Oct 2026 (J.B.): demand figures are energy bought, heat delivered = × 0.85 (gas boiler); cards also show the middle case at 3% and 8% cost of capital, and with the heat pump covering the coldest hours (full-load hours from CWEC: Vancouver 3,200–4,500, Edmonton 2,900–3,900; annual ÷ peak hour, single coldest to 99th percentile, base 15.5–18 °C, hot water flat)

Sources: `crf` CRF = i / (1 − (1+i)^−n) (NREL ATB); LCoH (IEA SHC Task 54); TCO (Barroso ch. 8) (Formulas sheet) | `parssinen` Pärssinen et al. 2019: heat-pump capex €60 k / €575 k (2 MW) / €5.5 M; DH pays marginal cost − €5/MWh; payback 1.8–5.1 yr | `squamishNEU2010` Compass Resource Management with FVB Energy and Hemmera, District of Squamish Neighbourhood Energy Utility feasibility study, final report, 15 Jun 2010: levelised cost over 30 years (pp. 27, 42); WACC 7.6% (5.6% real), ROE 10% (8% real) regulated by BCUC, debt 6%, 60/40; depreciation DPS 1.5%/yr, ETS 3%/yr (p. 44) | `energiforsk2022life` Jakubowicz, Sällström, Vega, Yarahmadi, Lifetime predictions and status assessments, Energiforsk report 2022:872 (30 Jun 2022), s. 8.2: 'EN 253 (2019) states that the service life shall be 30 years at 120 °C with single peaks of 140 °C' for 300 h/yr; 50 years needs below 115 °C; degradation ×2.5 per +10 °C | `dea` Danish Energy Agency, Technology Data for Electricity and District Heating Production, data sheet updated August 2026 (2025 EUR): sheets 40 (compression heat pumps, waste heat 1/3/10 MW; air-source), 41 (electric boilers), 44 (gas boilers), 140 (pit storage) | `tbsCBA2018` Treasury Board of Canada Secretariat, Policy on Cost-Benefit Analysis (1 Sep 2018), s. 7.1: opportunity cost of capital as the discount rate; social discount rate when impacts are long-term (50+ years) or mainly on private consumption; s. 7.4: minimum 10-year period | `scotHeat2011` Scottish Government, The recovery of heat from power generation in Scotland (4 Nov 2011), economics: NPV at 9%, 40-year life | `vanNEURates2026` City of Vancouver, 2026 False Creek Neighbourhood Energy Utility customer rates, RTS 18251 (21 Oct 2025): levelised rate approach, commercial utility model with a return on invested capital

### Heat cost share of income  (`affordability`)

- Stage: What it would take · unit: % · level: Everyday
- Inputs (formula arguments): price_ceiling, deprivation
- Fed by (diagram links): price_ceiling, deprivation · feeds: —
- Trust: own 70 / 100 · weakest input (chain) 50 / 100 · status: confirmed

```
affordability = f(price_ceiling, deprivation)
annual heat cost ÷ after-tax income; energy poverty if > 6%
```

Coefficients: CUSP 6%; Canada household energy $2,535 (2019); 13 Oct 2026: CUSP's tool is no longer at energypoverty.ca; Statistics Canada (2024) uses ≥10 % of after-tax income on energy bills: BC 4.9 %, Alberta 7.3 % (provincial only); small-area data would need a custom table

Sources: `cusp` CUSP energy poverty 6% threshold | `statcanSHS` StatCan 11-10-0222-01, household energy spend $2,535 (2019) | `statcanEP2024` Statistics Canada 46-28-0001 (20 Feb 2024), Estimation of Energy Poverty Rates Using the 2021 Census: energy bills ≥10 % of after-tax income; Canada 5.6 %, BC 4.9 %, Alberta 7.3 %; provincial only. CUSP's tool is no longer at energypoverty.ca (observed 13 Oct 2026) | `censusIncome2021` Statistics Canada 2021 Census, median after-tax household income 2020: Vancouver CMA $79,500, Edmonton CMA $84,000 (The Daily, 13 Jul 2022; Table 98-10-0058-01)

### Effect on household power bills  (`power_bill_effect`)

- Stage: What it would take · unit: text · level: Everyday
- Inputs (formula arguments): it_load_actual, grid_headroom
- Fed by (diagram links): it_load_actual, grid_headroom · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 50 / 100 · status: utility modelling of policy options (not decided); no source at in-city scale

```
power_bill_effect = f(it_load_actual, grid_headroom)
by size and province, text only: a typical in-city data centre (≈ 2.5 MW) shows no measurable effect in any source; very large loads depend on provincial connection policy
```

Coefficients: BC Hydro modelling (2026): one new 75–250 MVA customer changes all rates by +0.4 to +1.5% by F2036 with no threshold, 0 to −1.2% under threshold options; AESO (2025): whether large loads pay their fair share of transmission costs is still open; LBNL (2025): mechanisms and protections, no quantified effect

Sources: `bchTCIP2026` BC Hydro, Transmission Customer Interconnection Policy, Workshop #2 (4 Mar 2026), slides 12–34: modelled F2036 rate impact on all ratepayers of one new 75–250 MVA customer: +0.4 to +1.5% with no threshold, 0 to −1.2% under threshold options; approaches for data centres 'emerging' | `aesoDC2025` AESO Update on Data Centres (Sep 2025): 'Are large loads paying their fair share of transmission costs?' an open Phase II question; 20,000+ MW of data-centre load on the project list; 'Load is outpacing generation' | `lbnlLargeLoad2025` LBNL (Jan 2025), Electricity rate designs for large loads: mechanisms (stranded assets, forecast error, avoided charges) and protections (minimum bills, exit fees, collateral, contributions); no quantified rate effect

### Refuge after an earthquake  (`refuge_after_quake`)

- Stage: What it would take · unit: rule · level: Everyday
- Inputs (formula arguments): importance_cat, refuge_people, backup_hours
- Fed by (diagram links): importance_cat, refuge_people, backup_hours · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 60 / 100 · status: derived from rules read

```
refuge_after_quake = f(importance_cat, refuge_people, backup_hours)
credible after an earthquake only if ALL: designed High or above; backup power serves the refuge space; group-lodging basics; local emergency services list it; otherwise "everyday heat, cold and smoke events only"
```

Coefficients: BC: facilities "will only be opened up if they are suitable and have power"; Vancouver plans hubs around community centres (23 of 25); Edmonton opens warming spaces at −20 °C with wind chill for 3 days; neither city lists private or industrial buildings

Sources: `jibcGroupLodging` JIBC / BC Emergency Support Services, Introduction to Group Lodging participant guide: 3.5 m² per person, 0.75 m between beds (p. 35); facilities 'will only be opened up if they are suitable and have power' (p. 44) | `vanHubs` City of Vancouver, Disaster support hubs: 25 hubs (mostly community centres); backup power not stated | `edmWarming` City of Edmonton extreme weather (winter): warming response at −20 °C with wind chill for 3 days; City recreation centres and libraries | `nbcImportance` NBC 2020 / BCBC 2024 Table 4.1.2.1 importance categories: post-disaster buildings incl. telephone exchanges and communications facilities (authority may exempt); 'likely to be used as post-disaster shelters' = High; earthquake importance factor IE 1.0 Normal, 1.3 High, 1.5 post-disaster

### City commitments to Indigenous Nations  (`city_commitments`)

- Stage: What it would take · unit: text · level: Civic
- Inputs (formula arguments): consultation
- Fed by (diagram links): consultation · feeds: —
- Trust: own 90 / 100 · weakest input (chain) 60 / 100 · status: read

```
city_commitments = f(consultation)
commitments, not legal duties: Vancouver UNDRIP Strategy Calls 1.18, 2.1–2.3, 2.5, 3.10 and the Action Plan engagement framework (in progress); Edmonton Indigenous Framework roles and Urban Reserve Strategy
```

Coefficients: Vancouver endorsed the Strategy 25 Oct 2022 and the Action Plan 25 Jun 2024; Edmonton has no land-use or rezoning commitment like Vancouver's (stated plainly)

Sources: `vanUndrip` City of Vancouver UNDRIP Strategy (endorsed 25 Oct 2022; 79 Calls to Action; e.g. 1.18 first right of refusal on City land, 2.3 'include this in permitting decisions', 3.10 free, prior and informed consent) and Action Plan 2024–28 (endorsed 25 Jun 2024; 'early engagement threshold points', in progress) | `edmNationsNamed` City of Edmonton land acknowledgement: Treaty 6 territory and the Métis homeland; names peoples (incl. Nehiyaw/Cree, Dene, Anishinaabe/Saulteaux, Nakota Isga, Niitsitapi) not individual Nations; Confederacy of Treaty No. 6 lists 15 Nations (https://www.treatysix.org/nation-listing); Indigenous Framework roles Listener, Connector, Advocate, Partner; Urban Reserve Strategy approved 28 Jun 2021


## 8. Who gains, who pays

### Incentive scoring (counter-example)  (`cfd_score`)

- Stage: Who gains, who pays · unit: % · level: Technical
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: —
- Trust: own 90 / 100 · weakest input (chain) 90 / 100 · status: confirmed

```
cfd_score = f()
BC Hydro Call: 30/20/10/30/10 weights; heat-recovery-ready inside the 10%
```

Coefficients: 2026 RfA: 30 % cost, 30 % data sovereignty, 20 % community (incl. brownfield), 10 % environment ('heat recovery ready', PUE, WUE), 10 % First Nations; projects 10–145 MW

Sources: `cfd` BC Hydro 2026 Call for Demand RFA: 100 + 300 MW; 10–145 MW per project; ≥10% premium; curtailment; heat-recovery-ready inside the 10% environmental weight | `bchCfDRfA` BC Hydro 2026 Call for Demand, Request for Applications: 300 MW AI + 100 MW storage data centres; projects 10–145 MW; scoring 30 % cost, 30 % data sovereignty, 20 % community (incl. brownfield), 10 % environment ('heat recovery ready', PUE, WUE), 10 % First Nations | `aeso` AESO: 1,200 MW interim limit fully allocated (GLDC 970; Keephills I 230); Edmonton load ≈ 1,400 MW; Phase 2A BYOG 1,600 MW proposed (Jun 2026) | `abGridPage` Government of Alberta, data centres

### How firm the exchange is  (`commitment`)

- Stage: Who gains, who pays · unit: existing · committed · planned · proposed · possible · level: Civic
- Inputs (formula arguments): receivers_nearby
- Fed by (diagram links): receivers_nearby · feeds: —
- Trust: own 100 / 100 · weakest input (chain) 60 / 100 · status: rule

```
commitment = f(receivers_nearby)
existing = operating; committed = in a contract, permit condition or funded budget; planned = in a utility filing or adopted plan; proposed = an applicant or operator says so; possible = the tool found it and nobody has proposed it. Only existing and committed count as delivered
```

Coefficients: states and rule set 14 Oct 2026 (learning-series critique); promised heat that is only possible is shown, never counted

Sources: `learningSeries` J.B., Beyond Data learning series (manuscript, Oct 2026), critique 14 Oct 2026

### Who receives the tax  (`tax_split`)

- Stage: Who gains, who pays · unit: text · level: Everyday
- Inputs (formula arguments): property_tax
- Fed by (diagram links): property_tax · feeds: —
- Trust: own 90 / 100 · weakest input (chain) 60 / 100 · status: read

```
tax_split = f(property_tax)
list the parties, not a sum: City / school (Province) / TransLink and BC Assessment (Vancouver); City / education (Province) (Edmonton); then the City's spending shares
```

Coefficients: Vancouver: property tax ≈ 56% of City operating revenue, police the largest spending share; Edmonton: "where taxes go" page

Sources: `vanTaxRates2026` City of Vancouver, RTS 18298, 2026 tax rates (Council 5 May 2026) and rates by-laws a2–a5: Class 6 Business & Other general purposes 7.09436 per $1,000; all taxing authorities 12.46720 (with DPRP adjustment) | `vanBudget2026` City of Vancouver 2026 Budget: property tax about 56% of operating revenue; police the largest spending share | `edmTaxRates2026` City of Edmonton 2026 property tax bylaw: non-residential municipal 0.0252216 and education 0.0039677 per $1 of assessed value ($25.22 + $3.97 = $29.19 per $1,000; units confirmed from the bylaw's own levy row, round 2)

### Futures  (`futures`)

- Stage: Who gains, who pays · unit: one table per future · level: Civic
- Inputs (formula arguments): horizons, heat_temp, liquid_capture, hourly_overlap, risk_term
- Fed by (diagram links): horizons, heat_temp, liquid_capture, hourly_overlap, risk_term · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 50 / 100 · status: logic defined

```
futures = f(horizons, heat_temp, liquid_capture, hourly_overlap, risk_term)
rerun the match in four futures: (1) as planned; (2) the tenant changes cooling — air ↔ liquid changes heat temperature, capture share and flexibility; (3) the tenant leaves — the receiver's backup carries its full peak and the building's reusable parts are listed; (4) the receiver leaves — all heat goes back to rejection, so full rejection capacity stays
```

Coefficients: lifespans from horizons (servers ~6 years, plant 15–25, network 40–50); closure cases in meta.lifecycle

Sources: `learningSeries` J.B., Beyond Data learning series (manuscript, Oct 2026), critique 14 Oct 2026

### Who keeps the value of the heat  (`heat_value_split`)

- Stage: Who gains, who pays · unit: text · level: Civic
- Inputs (formula arguments): price_floor, price_ceiling, capex_split
- Fed by (diagram links): price_floor, price_ceiling, capex_split · feeds: —
- Trust: own 50 / 100 · weakest input (chain) 50 / 100 · status: qualitative only

```
heat_value_split = f(price_floor, price_ceiling, capex_split)
describe who controls each share (operator, utility, end users); no numeric split
```

Coefficients: no study measures the split; peer-reviewed papers say it is negotiated and the utility holds the stronger hand; a numeric split stays a gap (0) — a gap the thesis could fill

Sources: `dkHeatCap2025` Denmark: the 95 kr./GJ surplus-heat price cap (regulator notice 1 Nov 2024) was abolished from 1 Jul 2025 (Lov nr 738)

### Party ledger  (`ledger`)

- Stage: Who gains, who pays · unit: table · level: Civic
- Inputs (formula arguments): capex_split, window, risk_term, deprivation
- Fed by (diagram links): capex_split, window, risk_term, deprivation · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 50 / 100 · status: derived

```
ledger = f(capex_split, window, risk_term, deprivation)
parties × (owns, controls, pays, receives, bears, needs) × (recovery equipment, connection, network, conversion energy, operating payment, risk, pass-through)
```

Sources: `horizons` Horizons: servers ~6 yr; plant 15–25; shell up to 40; network 40–50 (handoff rule 7); control in colocation (Greene; Monstadt and Saltzman) (handoff §3) | `rts19744` City of Vancouver RTS 19744 (30 Jun 2026): 111 E 5th, 'up to 40 MW'; cond. 1.11 heat recovery a material condition at the applicant's sole cost; 579 submissions | `g9425` BCUC Order G-94-25: Creative Energy's $38.5 M capex schedule rejected; developer bears costs above $15 M (C-1-20) | `blatchfordBP2021` Blatchford Renewable Energy 2021–2024 Business Plan, City of Edmonton (J.B. upload 16 Oct 2026): the District Energy Sharing System uses geoexchange, sewer heat exchange and solar (p. 1); all buildings must connect for heating, cooling and hot water unless net-zero carbon (p. 2); a sewer-heat energy centre in the Blatchford Market area, drawing on the two combined sewer lines under the east side, was expected in 2023; connected floor area forecast 123,500 m² by 2024, all from the first energy centre; customers to pay at most a comparable fee to elsewhere in the city. No intake of heat from third-party sources is described

### After the data centre  (`afterlife`)

- Stage: Who gains, who pays · unit: text · level: Civic
- Inputs (formula arguments): horizons, existing_building
- Fed by (diagram links): horizons, existing_building · feeds: —
- Trust: own 60 / 100 · weakest input (chain) 40 / 100 · status: shell evidence transferred from the UK; conversion evidence a gap

```
afterlife = f(horizons, existing_building)
at closure, three streams: shell (reuse or demolition), equipment (stewardship program or disposal, with data sanitization), plant and batteries
```

Coefficients: Vacated first-generation centres "tend to remain unoccupied and are not readily adaptable" (UK VOA, 70); federal closures 500+ of 720; BC Recycling Regulation covers IT products (servers by interpretation, 60); Alberta designates computer equipment; large UPS batteries outside both consumer programs as read (gap); no official source on converting a data centre to another use

Sources: `voaComputerCentres` UK Valuation Office Agency, Rating Manual s. 281 Computer centres, Practice note 1 s. 1 (2017): vacated first-generation centres 'tend to remain unoccupied and are not readily adaptable' | `sscConsolidation` Shared Services Canada, data centre consolidation: more than 500 of the 720 legacy federal data centres closed since 2011 | `bcRecyclingIT` BC Recycling Regulation Sch. 3 (current to 3 Feb 2026): IT products covered; exclusion only for computers attached to commercial or industrial equipment that is not itself a covered product; servers not named (reading them as covered: interpretation, 60) | `abElectronicsReg` Alberta Electronics Designation Regulation 94/2004: computer equipment designated (read from a legislation summary, official text not read)

### Trade-off table  (`tradeoffs`)

- Stage: Who gains, who pays · unit: parties × rows · level: Everyday
- Inputs (formula arguments): —
- Fed by (diagram links): — · feeds: —
- Trust: own 100 / 100 · weakest input (chain) 100 / 100 · status: logic defined

```
tradeoffs = f()
for each option: every party, every row, gains and losses in their own units — never summed, never ranked
```

Coefficients: Replaces the match verdict (decided 13 Oct 2026). Constraints that cannot move are stated as such; everything else carries what it would take to move it.

Sources: `nonComp` Non-compensatory method: Munda; Cinelli et al. 2014; Rowley et al. 2012; handoff rule 1 (handoff §3)

