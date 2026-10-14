# Beyond Data — formula register

Generated 13 Oct 2026 from `formula_register.json` (the diagram reads the JSON; edit that, then run `make_register_md.py`).

**Scale.** 100 arithmetic/physics · 90 regulation, tariff or standard read directly · 80 government dataset or statistic · 70 peer-reviewed coefficient transferred from another context · 60 derived with stated assumption · 50 operator or industry claim · 40 proxy · 20 judged · 0 gap

**Rule.** A quantity's confidence is the lowest of its inputs; a condition's is the lowest of its quantities; a match fails at its weakest link; burdens are recorded beside, never netted.

**Verification.** Independent re-verification 9–10 Oct 2026: 258 items re-opened; 195 confirmed, 37 confirmed with wording/page notes, 10 mismatches corrected, 6 not on page (citations fixed), 1 unreachable. See verification_report.md. Hunt 9 (public proxies) and hunt 10 (J.B. full-text uploads) folded in 10 Oct: see sources/09 and sources/10.

**Counts.** 103 quantities · 77 conditions under 10 headings · 14 opportunities quantified.

## Quantities

"own" is the confidence of the quantity's own coefficient and source; "upstream" is the lowest confidence of anything feeding it.

### Size the facility

| id | quantity | unit | formula | inputs | coefficients | sources | own | upstream | status | used by |
|---|---|---|---|---|---|---|---|---|---|---|
| `floor_area` | Gross floor area | m² | footprint × storeys; Vancouver fallback: area_m2 × round(hgt_agl ÷ 3.5–4.5 m storey height) from the 2009 footprint layer (or total_gross_area / BCA Gross Building Area where held) | parcel | Edmonton: total_gross_area field; Vancouver: BCA Non-Residential Inventory Extract (UBC Abacus, listed as "Commercial"): pos. 19 Gross Building Area, 7 Gross Leasable Area, 8 Net Leasable Area, 20 Basement Area (all ft²), 6 Storeys, 4 Year Built, 42 Type of Heating, 45 Type of Construction (A steel / B concrete / C masonry / D wood-steel), 48 Zoning; one row per building or part — sum per roll number; quarterly .txt; no areas for ad valorem properties (major industrial, utilities, schools, airports) → fall back to footprint × storeys; Vancouver footprints 2009 carry area_m2 and hgt_agl/avght_m/maxht_m, rooftype, len, wid — fallback at 60 (storey-height divisor assumed; buildings after 2009 absent); measured GFA from the City energy report: 555 W Hastings 788,192 ft² (73,225 m²), 1050 W Pender 303,283 ft² (28,176 m²), 900 W Hastings 133,714 ft² (12,422 m²), 111 E 5th 130,548 ft² (12,128 m²) | edmParcel, vanFoot, bcaExtract, vanEnergyReport | 70 | 70 | Edmonton open; Vancouver via licensed BCA extract — field list confirmed from BCA user guide (data/BCA_…User_Guide.pdf); extract itself pending Abacus access; City property-tax report has no area field (schema checked) — fallback is footprint × storeys | Building type and control |
| `server_floor` | Server (raised) floor area | m² | floor_area × share_raised | floor_area | share 0.75–0.87 from Qu EDM1 (15,712/18,000) and eStruxture VAN-1 (7,500/10,000) | opClaims | 50 | 50 | operator claim | — (input to others) |
| `it_load_outside` | IT load, estimated from outside | MW | server_floor × density; density from RVO 4.38 MWh/m²·yr ÷ 8,760 h (≈ 500 W/m²) or measured 355–667 W/m² (US federal DCs) up to 1,076–5,382 W/m² (modelled large DCs) | server_floor | RVO 2018 p.4: 4.38 MWh/m² gross floor (BVO) per year, from CE Delft, validated with MJA3 (≈ 500 W/m² average); measured 33–62 W/ft² (US federal); modelled 100–500 W/ft² | rvo2018, lbnl2024, sunLuo2021, doeFederal | 60 | 50 | confirmed (RVO primary read) | — (input to others) |
| `it_load_claim` | IT load, operator claim | MW | stated nameplate | — | 2–4 MW typical downtown colocation; 40 MW stated at 111 E 5th (applicant figure in RTS 19744); permit record: no MW stated anywhere; load traces are BC Hydro primary-service upgrade at 555 W Hastings (DB-2022-01818) and new BC Hydro room at 175 W Cordova (BP-2021-06112) | opClaims, rts19744, vanPermits | 50 | 50 | operator claim / public record | — (input to others) |
| `it_load_actual` | IT load, actual (range) | MW | nameplate claim × utilisation 0.20–0.60, bounded above by measured whole-building energy; or outside estimate × utilisation when no claim | it_load_claim, it_load_outside | colocation server utilisation 0.21→0.35 (LBNL 2024); capacity utilisation 0.5 (LBNL); average ÷ peak ≈ 0.6 (Fan et al. 2007); leased share proxy: Digital Realty Toronto occupancy 96.4%, 55.8 MW white-space (Q2 2025 supplemental p.24) — occupancy ≠ utilisation; measured whole-building ceiling (City energy report): 555 W Hastings site EUI 1.84 GJ/m² → 37.4 GWh/yr total, 32.5 GWh non-heat ≈ 3.7 MW average for the whole 73,000 m² tower, data centre and offices together — so the ≥3.7 MW of operator nameplate claims cannot all be running at once; 1050 W Pender 11.2 GWh non-heat ≈ 1.3 MW avg; 900 W Hastings 0.57 MW; 111 E 5th 0.45 MW (no data centre yet); Equinix 10-K FY2024 (public filing, other operator): cabinet utilisation = cabinet space billed ÷ total cabinet capacity "taking into consideration power limitations" — Americas 81% (116,700 of 144,100 cabinets, 107 IBXs), EMEA 78%, Asia-Pacific 75%, company 78% (79% in 2023); MRR per cabinet Americas $2,550/month; new IBXs built for power and cooling twice that of earlier ones; Vancouver is a leased-only Equinix metro; Calgary CL1–3 and Kamloops KA1 (2020 acquisitions) listed in Schedule III; CALIBRATION: Telia Helsinki snapshot ERF 0.75 and PUE 1.152 with 4.11 MW waste heat imply 4.8 MW actual against 24 MW IT nameplate = 0.20 (one day, hall partly built out) — the low end of the band should be 0.20, not 0.35 | dlrQ2_2025, eqix10k, fan2007, lbnl2024, teliaHKI2024, vanEnergyReport | 70 | 50 | bounded above by measured whole-building energy (4 Vancouver sites); leased-share proxies: Equinix Americas 81% cabinet utilisation (power-limited), Digital Realty Toronto 96.4% occupancy; server utilisation still LBNL 21→35% | — (input to others) |
| `servers` | Server count | count | P_IT ÷ P_server | it_load_actual | 600 W per 2-socket server (2023); racks: 1.8–2.5 m² per rack measured in LBNL benchmarking (2007); Vertiv 42U rack 127 kg empty; Dell R760 36.1 kg (2U) | lbnl2024, lbnlBench | 80 | 50 | in hand | — (input to others) |

### What the place offers

| id | quantity | unit | formula | inputs | coefficients | sources | own | upstream | status | used by |
|---|---|---|---|---|---|---|---|---|---|---|
| `sewer_sink` | Sewer as heat source or sink | MW at the pipe | Q = flow × 4.18 × ΔT, within the temperature rules: sewage arriving at the plant ≥ 11 °C when used as a source (KWL design rule); waste entering a facility < 40 °C, non-domestic waste < 65 °C when used as a sink (Bylaw 299) | sewer_flow | Vancouver: ~45 MW city-wide, ~100 MW region-wide (KWL 2014, secondary); NEU uses 3.2 + 6.6 MW; access first-come first-served with a letter of support (UT-008); heat user pays access costs; per-pipe flow near a parcel is not published (only North Surrey 6 MW). Edmonton: no EPCOR sewer-heat programme or data found; non-contact cooling water to sanitary sewer needs EWSI written approval (Bylaw 18100 s.5.10) | kwlSewer, gvsddUT008, gvsdd299, neuSewage, edm18100 | 40 | 40 | rules in hand for Vancouver; flow at a parcel and all Edmonton figures are gaps | A sink the place offers |
| `surface_water_sink` | Sea or river water as a cooling sink | MW (site-specific) | capacity set by the thermal limit at the outfall and mixing, not by the licence: marine ±1 °C (BC, CCME), Burrard Inlet proposed "no further increase"; Alberta freshwater +3 °C over ambient | parcel | BC licence: cooling application $1,000; heat-exchange rental $2.25 per 1,000 m³ (min $200); DFO intake screens 2.54 mm, approach velocity 0.035–0.055 m/s (internal conflict — confirm); Alberta Water Act review as for any industrial project; Toronto Enwave precedent: 4 °C in, ≤13 °C out, 50-year agreement | bcWSRfees, thermalLimits, enwaveDLWC | 40 | 40 | rules in hand; capacity is site-specific and unmodelled | A sink the place offers |
| `rooftop_solar` | Solar from roofs nearby | MWh/yr | roof area × kWh/kWp (NRCan municipal values) × kWp/m² | massing | NRCan municipal kWh/kWp values blocked — J.B. retrieval D9; a 0.1–40 MW load would use a roof's output on site |  | 0 | 0 | gap: NRCan values pending | — (input to others) |
| `self_gen_rules` | Rules for generation beside the data centre | rule | export cap and compensation by province; connection priority for paired generation (Alberta) | — | BC: RS 2289 from 1 Jul 2026, export up to 100 kW per phase at $0.10/kWh; community generation up to 2 MW. Alberta: micro-generation ≤5 MW (retail credit <150 kW, wholesale above); data centres paired with dedicated new generation or storage go to the front of the connection line (Alta Reg 117/2026, government summary) | bchRS2289, abMicrogen, abGridPage, altaReg117 | 80 | 80 | in hand | — (input to others) |
| `electricity_price` | Price of power at the site | $/MWh + $/kW | tariff for the customer class: BC Hydro LGS or Transmission (RS 1830); Alberta pool price + EPCOR (Edmonton) or FortisAlberta (Parkland) distribution and transmission | parcel | BC LGS (1 Jul 2026): $13.83/kW, 6.79 ¢/kWh, 29.99 ¢/day; RS 1830: $12.178/kVA, 4.914 ¢/kWh; loads >150 MW pay full incremental cost; 300 MW AI + 100 MW DC allocation. Alberta: pool $43.68/MWh (2025), $62.78 (2024); EPCOR DAS-TOUP and SAS-TOUP; FortisAlberta Rate 63; Rate of Last Resort not available to these loads. Replaces the first attempt's assumed $80–120/MWh | bchLGS, bcIEAF, aesoStats2025, epcorDASSAS, fortisAB2026 | 90 | 90 | in hand (2026 tariffs) | Price of power at the site |
| `water_supply` | Water the place can supply | $/m³; ML/yr | potable at the metered rate; reclaimed where a utility offers it to industry | parcel | Vancouver 2026: water $4.091–5.128 per unit + sewer $7.960 per unit (unit = 2.832 m³), no large-user rate; Metro Vancouver reclaimed water case-by-case, no rate. Edmonton: EPCOR supplied 4,226 ML of reclaimed water to industry in 2024 (price, customers not stated); commercial potable rates not extracted | vanWater2026, mvReclaimed, epcorReclaimed | 70 | 70 | Vancouver in hand; Edmonton partial | — (input to others) |
| `existing_building` | Existing building to convert | m² available | parcels with buildings whose use and age suit conversion (from the parcel tables), less what policy steers to other uses | parcel, massing | Precedents: 515 W Hastings office → Bulk Data Storage (2023); Edmonton office → data centre (2009, 2011), warehouse → data centre (Qu EDM2); Vancouver Downtown Office Conversion Policy addresses residential conversion only; no official vacancy statistics in either city | vanPermits, edmPermits, vanOfficeConv | 20 | 20 | precedents in hand; stock at a parcel needs the parcel tables (N1–N7) | An existing building to reuse |
| `ambient_cover` | Acoustic cover from the place | dBA allowed | the zone pair sets what is allowed; a louder zone is the cover — Vancouver credits no ambient noise for equipment | receptors, parcel | Vancouver By-law 6555: quiet→quiet 55/45, activity→quiet 60/55, intermediate or activity→other 70/65 (day/night); background credited only for commercial premises. AUC Rule 012 road categories credit ambient but apply only to power plants and substations. Neither city publishes a road-noise map (traffic counts only). Edmonton Bylaw 14600 limits pending (J.B. retrieval D1) | van6555zones, rule012, bylaw14600 | 60 | 60 | Vancouver in hand; Edmonton to recheck | Acoustic cover |
| `interconnection` | Closeness to networks and customers | km / ms | distance to the nearest interconnection point and to customers; latency targets of tens of milliseconds | parcel | Why operators locate in cities: third-party (colocation) firms favour urban settings for buyer proximity (Pan Fang & Greenstein 2025); backbone networks are biased to cities that serve as interconnection points (Malecki 2002); edge latency targets of a few tens of ms, VR under 16 ms (Satyanarayanan 2017); internet exchange and customer proximity (JLARC 2024). Locations of internet exchange points in Vancouver and Edmonton not yet sourced | panFang2025, malecki2002, satya2017, jlarc2024 | 20 | 20 | rationale sourced; local exchange-point locations a gap | Closeness to networks and customers |

### Characterise what it gives off and holds

| id | quantity | unit | formula | inputs | coefficients | sources | own | upstream | status | used by |
|---|---|---|---|---|---|---|---|---|---|---|
| `heat_rejected` | Heat rejected | MWh/yr | Q ≈ E_IT + electrical losses; idle floor 36% of max | it_load_actual, pue | heat ≈ electricity drawn (Barroso); idle 36% (2023) | heatPhys, lbnl2024 | 80 | 50 | in hand | Quantity |
| `heat_temp` | Heat temperature by cooling type | °C | air-cooled 25–35; liquid-cooled 50–60; two runs if unknown | cooling_type | Alissa p.332; Wahlroos p.1753; heat-rejection equipment per site from permits: rooftop condensers (1050 W Pender, 175 W Cordova), rooftop chiller (55 E 7th), P1 chiller room (555 W Hastings), L8 roof well (515 W Hastings); seen on site (J.B.): 55 E 7th lane deck with a Cummins generator enclosure and a packaged cooling unit piped into the building (rooftop chiller in BP-2019-00595 not photographed — keep both); 111 E 5th louvre bands and three rooftop vent stacks; Internet Centre two rooftop condensing units (corroborates the 2024 "two RTUs, AC only" permit); Qu EDM2 cooling units on a raised platform under a canopy, "Munters" casings (air-side or indirect evaporative suggested, not confirmed); Kyndryl Acheson cooling plant with pipe racks into the wall on the south side; Baxtel claim for Kyndryl: two 550-ton water-cooled chillers (≈3.9 MW thermal) — operator/directory claim | lorenz, vanPermits, fieldJB | 70 | 70 | in hand | Quality (temperature grade); Change in cooling |
| `liquid_capture` | Share of heat captured in liquid | — | 0.5–0.8 cold plate; 1.0 immersion; air: judged | cooling_type | 13 Oct 2026: direct-to-chip 48–75 % (LBNL 2014; NREL), cold plate up to 94 % (Heydari 2024), hot-water cooled 80 % (Zimmermann 2012); air-cooled: no primary figure; the often-cited 97 % (Lu et al. 2011) describes electricity becoming heat, not capture — unverified at source. A water-cooled chiller plant rejects all heat to the condenser loop; 13 Oct 2026: direct-to-chip 48–75 % (LBNL 2014; NREL), cold plate up to 94 % (Heydari 2024), hot-water cooled 80 % (Zimmermann 2012); air-cooled: no primary figure; the often-cited 97 % (Lu et al. 2011) describes electricity becoming heat, not capture — unverified at source. A water-cooled chiller plant rejects all heat to the condenser loop; 13 Oct 2026: direct-to-chip 48–75 % (LBNL 2014; NREL), cold plate up to 94 % (Heydari 2024), hot-water cooled 80 % (Zimmermann 2012); air-cooled: no primary figure; the often-cited 97 % (Lu et al. 2011) describes electricity becoming heat, not capture — unverified at source. A water-cooled chiller plant rejects all heat to the condenser loop | lorenz, lbnlCapture | 70 | 70 | in hand | Form; Change in cooling |
| `cop` | Heat-pump COP (Lorenz) | — | COP = η × T_lm,sink ÷ (T_lm,sink − T_lm,source), log-mean temperatures on both sides (sink supply/return; source in/out); η 0.40–0.50 for built systems (calibrated 13 Oct 2026), 0.50–0.60 upper bound | heat_temp, receiver_temp | checks: ~3 at 20→75 °C; 4.5–5.0 Odense; DEA Aug 2026 waste-heat heat pumps, annual average COP to 70 °C forward / 35 °C return: 3.1 at 1 MW (source 13→8 °C), 3.6 at 3 MW (15→8 °C), 4.7 at 10 MW (27→15 °C); air-source 3 MW 2.8; CALIBRATION 13 Oct 2026 (calibrate.py; sources/13): full Lorenz with η 0.50 gives 4.56 for Odense (27→15 / 40→75 °C) against realised 4.5 (2020) and 4.2 all-in (2021–22, η 0.49 / 0.46); Telia Helsinki snapshot 3.9 at 20/32 → ~80 °C implies η 0.39; Université Laval ~7 at ~15 → 40 °C implies η 0.53; ReUseHeat design 3.6 and Bahnhof simulation 3.7 imply 0.37 / 0.43. The simplified form used in the first attempt (sink supply ÷ (sink supply − source out)) under-predicts at large lifts (3.0–3.6 for Odense) and is retired | bytes2heat, dea, dfKatalog2022, fjfAars2020, lorenz, teliaHKI2024, ulavalCVD | 70 | 70 | calibrated on six cases: η 0.39–0.53 built/operating | Quality (temperature grade) |
| `heat_captured` | Heat captured at the boundary (E_reuse) | MWh/yr | E_reuse = heat_rejected × liquid_capture, measured at the data-centre boundary by flow × ΔT before any heat pump (ISO/IEC 30134-6 cl.5–6; EU Reg. 2024/1364 Annex II 1(j)) | heat_rejected, liquid_capture | This is the figure a data centre may report as reused energy and the numerator of ERF; the network-side figure after the heat pump (what Stockholm Exergi and Fjernvarme Fyn meter and bill, and what Danish tax law meters "ved udgang fra varmepumpe" with 3 × electricity deducted) is heat_delivered, not E_reuse. The two differ by COP ÷ (COP − 1) ≈ 1.3 at COP 4.2. Published "heat delivered" figures must be labelled by which boundary they use; where the source does not say, mark unknown. | iso30134_6, euReg2024_1364, skatOverskud, dfKatalog2022, exergiAR2023 | 90 | 50 | in hand (measurement boundary defined 13 Oct 2026) | — (input to others) |
| `heat_delivered` | Heat available after heat pump | MWh/yr | Q_out = E_reuse × COP ÷ (COP − 1) — network-side heat after the heat pump; the match takes min(Q_out, receiver demand) | heat_captured, cop | ; CALIBRATION: delivered heat is receiver-limited, not source-limited, in every built case with a large data centre — Mäntsälä 20–30 GWh/yr from a ~15 MW DC (15–23 % of nameplate-continuous), Westville 2.4 GWh/yr from a 35 MW DC (1 %), TELUS Garden 4.9 of 12.3 GWh available (40 %); only Heerlen (520 kW DC into a 5GDHC network) ran source-limited at 54 %. Report this quantity as heat AVAILABLE after the heat pump; the match quantity is min(available, receiver demand); Odense DH output ≈ 1.3 × DC-side heat at COP 4.2 (Inspirationskatalog) matches COP ÷ (COP − 1) | bcucC113, bytes2heat, dfKatalog2022, lorenz, nivosMantsala, rvoCases2018 | 70 | 50 | calibrated: receiver-limited in 4 of 5 built cases | Quantity |
| `hp_electricity` | Heat-pump electricity | MWh/yr | Q_out ÷ COP | heat_delivered, cop | allocation rule stated; show two rules | heatPhys | 100 | 50 | in hand | Conversion step and its cost; Carbon displaced |
| `erf` | Energy reuse factor | — | ERF = E_reuse ÷ E_DC (ISO/IEC 30134-6; EU 2024/1364 Annex III): heat captured at the boundary ÷ total data-centre energy (IT × PUE); 0–1; heat-pump uplift and heat-pump electricity excluded | heat_captured, heat_rejected | EnEfG benchmark 10% → 20%; first attempt used heat_delivered ÷ IT energy — corrected 13 Oct 2026: Telia Helsinki reports ERF 0.75 on this basis; German HPC centres 0.01–0.20 (arXiv 2411.16204, non-ISO denominator); NREL RSF reports ERE 0.91 "calculated, not measured" | euReg2024_1364, heatPhys, iso30134_6, nrelRSF, teliaHKI2024 | 90 | 50 | in hand | Metering at the boundary; Data-sharing agreement; Mandates and incentives; Information security; Promises enforceable |
| `heat_in_water` | Heat carried in water | kWh | Q = V × 1.16 × ΔT | — | 1.16 kWh per m³ per °C | heatPhys | 100 | 100 | in hand | Metering at the boundary |
| `free_cooling_hours` | Free-cooling hours | h/yr | count hours with T_outdoor < threshold (18–27 °C inlet, approach +1.5 air-side or +12 dry cooler) | weather | CWEC 2020 edition (header CWEC2011 format, years 2000–2017), computed: Vancouver Intl air-side full free cooling 7,109 h at 18 °C inlet / 8,086 at 21 / 8,645 at 24 / 8,759 at 27; dry cooler to 30 °C liquid loop 7,675 h, to 40 °C 8,760. Edmonton Intl: air 7,614 / 8,046 / 8,412 / 8,661; dry cooler 7,846 / 8,754 / 8,760. Approach +1.5 °C air, +12 °C dry cooler (assumed). HDD18 from file: Vancouver 2,810, Edmonton 5,514 (design values 2,925 / 5,120) | ashrae, cwec | 80 | 80 | computed from government typical-year file (data/cwec_derived.json); approach temperatures are assumptions (60) | Free-cooling overlap; A sink the place offers |
| `pue` | Power usage effectiveness | — | E_facility ÷ E_IT | — | Manor Farm target < 1.30; 13 Oct 2026: US average 1.4 (2023, LBNL); global 1.54, North America 1.49, new facilities 1.48 (Uptime 2025, INDUSTRY SURVEY); no Canadian figure (NRCan: no sufficient survey); no source splits existing buildings from purpose-built — use 1.4–1.55; 13 Oct 2026: US average 1.4 (2023, LBNL); global 1.54, North America 1.49, new facilities 1.48 (Uptime 2025, INDUSTRY SURVEY); no Canadian figure (NRCan: no sufficient survey); no source splits existing buildings from purpose-built — use 1.4–1.55; 13 Oct 2026: US average 1.4 (2023, LBNL); global 1.54, North America 1.49, new facilities 1.48 (Uptime 2025, INDUSTRY SURVEY); no Canadian figure (NRCan: no sufficient survey); no source splits existing buildings from purpose-built — use 1.4–1.55 | heatPhys, uptime2025 | 100 | 100 | in hand | — (input to others) |
| `spare_capacity` | Reserved electrical capacity | MW | installed − peak; 2N holds half | it_load_actual | — | heatPhys | 100 | 50 | in hand | Form; Growth; Reserved capacity costs the operator; Value of flexibility to the grid |
| `backup_hours` | Backup duration | h | usable kWh ÷ load; fuel ÷ burn rate | — | UPS 10–15 s; 24–48 h fuel typical | heatPhys, opClaims | 90 | 90 | in hand | Reliability and backup; Operational |
| `flexible_load` | Flexible share of load | MW·h | flexible kW × hours | it_load_actual | Emerald AI Phoenix 25% for 3 h (preprint); Call for Demand curtailment ≥10%, 4 h, 36 events | cfd | 40 | 40 | literature | Operational; Value of flexibility to the grid |
| `load_factor` | Load factor (average ÷ peak) | — | average ÷ peak | — | ≈ 0.6 facility level (Fan et al. 2007); 8,760 h/yr | fan2007 | 80 | 80 | confirmed | Reliability and backup; Profile match |
| `evaporation` | Evaporative water | L/yr | E ≤ Q_rejected ÷ h_fg (h_fg ≈ 2,400 kJ/kg; ≤ ~1.5 L/kWh) | heat_rejected, cooling_type | — | femp | 100 | 50 | in hand | Water |
| `blowdown` | Blowdown and make-up | L/yr | B = E ÷ (C − 1); make-up = E + B | evaporation | C cycles of concentration | femp | 100 | 50 | in hand | Water |
| `wue` | Water usage effectiveness | L/kWh | site water ÷ E_IT | blowdown, it_load_actual | DCRE cap 2 L/kWh | femp | 90 | 50 | in hand | Water |
| `water_behind_electricity` | Water behind the electricity | L/yr | E × w_grid | it_load_actual | US thermoelectric ~1.25 L/kWh; hydro ~16.8 L/kWh; BC as a range | femp | 60 | 50 | in hand | Water |
| `rainwater` | Harvestable rainwater | m³/yr | V = A × R × C | floor_area | CSA B805:22 method; ECCC Normals 1991–2020: Vancouver Intl precipitation 1,159.5 mm/yr (rain 1,119.2; Oct–Jan ≥124 mm/mo, Jul 34 mm); Edmonton City 422.5 mm/yr (Edmonton Airport 434.0; Jun–Aug 213 mm, Dec–Feb 43 mm, mostly snow); C runoff coefficient per CSA | femp, eccc | 80 | 70 | rainfall confirmed (government normals, data/normals_1991_2020_extract.json); C and storage sizing per CSA B805 | — (input to others) |
| `grid_co2` | Grid carbon | tCO2e/yr | E × EF_average and E × EF_long-run marginal, both reported | it_load_actual, hp_electricity | NIR 2026 Annex 7 (same basis for both provinces, main-activity producers): Alberta generation intensity 334.8 g CO2e/kWh in 2024 (preliminary), consumption intensity 346.1 — down from 506.5 / 521.5 in 2021 and 947.7 / 1,030.8 in 1990; BC generation 16.7, consumption 18.1 g/kWh in 2024 (15.5 / 16.9 in 2021); Canada 102.2 / 110.6; earlier register values (BC 22.8 consumption-based with imports, 2025; AB 335 generation, 2024) now superseded by the NIR series for citation; Alberta Electricity Grid Displacement Factor, handbook v3.3 (Aug 2026) Table 1, vintage schedule: 0.4901 (2024), 0.4602 (2025), 0.4303 (2026), 0.4005 (2027), 0.3706 (2028), 0.3407 (2029) tCO2e/MWh for displacement by renewables; with line loss (increased or reduced grid use): 0.5226, 0.4907, 0.4588, 0.4271, 0.3952, 0.3633; 2030 onward aligns with the High Performance Benchmark; projects before 2024 use 0.52 / 0.55 (Table 2, 2018–2020 data); identical in v3.1 (Feb 2023) and v3.2 (Aug 2025); natural-gas combustion (Table 5, commercial/institutional): 1,962 g CO2 /m³ + 0.037 g CH4 + 0.035 g N2O; BC publishes no marginal factor; 13 Oct 2026 deep dive: no official BC marginal or incremental factor exists (BC 2025 methodology is consumption-based, net-import); 13 Oct 2026 deep dive: no official BC marginal or incremental factor exists (BC 2025 methodology is consumption-based, net-import); 13 Oct 2026 deep dive: no official BC marginal or incremental factor exists (BC 2025 methodology is consumption-based, net-import) | gridBC, gridAB, abEGDF, nir2026 | 90 | 50 | average intensities confirmed from the national inventory (both provinces, same basis, 1990–2024); Alberta displacement schedule from the regulator; BC marginal factor remains unpublished | Carbon displaced |
| `generator_co2` | Generator carbon | tCO2/yr | litres × 2.681 kg CO2/L | backup_hours | testing hours (Manor Farm 564 h/yr) | eccc | 90 | 90 | in hand | Carbon displaced |
| `generator_nox_pm` | Generator NOx and PM | kg/yr | AP-42 factor × rated hp × hours | backup_hours | NOx 0.024 lb/hp·h uncontrolled | eccc | 80 | 80 | in hand | Burdens beside |
| `refrigerant_co2e` | Refrigerant leakage | tCO2e/yr | charge × 3%/yr × GWP | cooling_type | IPCC GWPs; chillers 50–600 kg charge | eccc | 90 | 90 | in hand | Burdens beside |
| `embodied_it` | Embodied carbon, IT | tCO2e/yr | servers × kg CO2e per server ÷ lifespan | servers | Dell R760 LCA (2025): 4,177 kg CO2e total (US), manufacturing ≈10–15%; R740 PCF 8,640 ± 8,480 kg | dell, dellR760 | 50 | 50 | manufacturer LCA (EPEAT-verified) | Embodied carbon |
| `embodied_building` | Embodied carbon, building | tCO2e | floor_area × kg CO2e/m² | floor_area | 461 kg/m² median, no DC benchmark; 13 Oct 2026: still no per-m² data-centre benchmark; Alissa et al. 2025 (Nature) LCA spreadsheets on Zenodo to read (J.B. D10 / Claude); 13 Oct 2026: still no per-m² data-centre benchmark; Alissa et al. 2025 (Nature) LCA spreadsheets on Zenodo to read (J.B. D10 / Claude); 13 Oct 2026: still no per-m² data-centre benchmark; Alissa et al. 2025 (Nature) LCA spreadsheets on Zenodo to read (J.B. D10 / Claude) | clf | 40 | 40 | proxy | Embodied carbon; An existing building to reuse |
| `noise_level` | Sound level at receptor | dBA | screen Lp ≈ Lw − 20·log10(r) − 8; full ISO 9613-2 (NoiseModelling) | plant_schedule, receptors | starter set: scroll chiller 450–850 kW Lw 96–100 dBA (Daikin, AHRI 370); Trane Sintesis Prime RTAF 333–1,010 kW Lw 94–101 standard / 91–98 low-noise (Eurovent); screw chiller 99–103 (ISO 9614); dry cooler: Kelvion 94 dBA printed under 'per fan' heading, 61 dBA @10 m — unit total unresolved; Güntner small unit Lw 67 dBA (permit submittal); standby diesel open 98–99 dBA @7 m (ISO 8528-10); enclosed: Cummins QuietSite L2 73–76, L1 78–87, weather-protective 89–91 dBA @7 m; CRAC 48–62 dBA @2 m (Stulz, 30–150 kW); transformer 62–63 dB (NEMA contour, unverified edition) | iso9613, daikinCAT624, climavenetaIFX, kelvionLF, mtuDS2250, catTM9338, cumminsS1443, stulz, oldsNIA, burlingtonNIA, traneRTAF | 50 | 50 | method in hand; manufacturer-rated levels (AHRI 370 / ISO 9614 / ISO 8528-10) for a starter set; site schedule still needed | Burden reach; Noise limits; Burdens beside; What can be heard; Acoustic cover |
| `lf_flag` | Low-frequency flag | — | dBC − dBA ≥ 20 dB and tone 20–250 Hz → +5 dBA | noise_level | AUC Rule 012 s.4.5; NANR45 curve | rule012 | 90 | 50 | in hand; spectra available from Daikin AGZ (octave bands) and Olds NIA | Noise limits |
| `light_at_window` | Light at neighbour's window | lx | vertical illuminance vs CIE 150 zone limit (E3 10 / 2 lx pre/post curfew) | lighting_plan | CIE 150:2017 via ILP GN01/20; Vancouver: no lux limit; Edmonton Bylaw 20001 s.5.120(3): glare minimised, light deflected away, directed downward — qualitative | cie150, edmBylaw20001 | 70 | 70 | standard transferred | Burden reach; Burdens beside; Light, day and night |
| `shadow` | Shadow on neighbours | m²·h | fall-equinox shadows 10:00–16:00 on parks, schools, opposite sidewalks | floor_area, massing | Vancouver Solar Access Guidelines | solar | 90 | 70 | in hand | Usable space |
| `ground` | Ground and groundwater at the parcel | ft, USgpm, m²/d | nearest N wells (GWELLS well.csv by lat/long): finished depth, static water level, bedrock depth, yield, aquifer_id, lithology; pump-test transmissivity and hydraulic conductivity where a test exists; report the spread, never a point | parcel | City of Vancouver: 333 wells in export; depth median 59 ft (p10 16, p90 210); static level median 11 ft; yield sparse (114 values, p90 100 USgpm); 2 open-loop geoexchange wells; Edmonton: AWWID (retrieval guide F6), not yet in hand | gwells | 80 | 80 | Vancouver in hand (government export); Edmonton pending AWWID | A sink the place offers |
| `visibility` | What is seen from public space | ledger | for each plant element: seen from public space / closed to view / known only from documents / not checked — tested the same way at every site | plant_schedule | J.B. field ledger per site (sources/12); permit record for the documented column | fieldJB, vanPermits | 80 | 80 | observation (J.B. to set the confidence level for 'seen on site'; proposed 80 for existence, no capacity) | What the edge shows; What is visible and what is hidden |
| `watched_area` | Surveillance as experienced | m; count | visible cameras and signs; indicative watched area past the lot line (camera position and aim); first-person account labelled as one person's | visibility | e.g. 55 E 7th: camera 'almost on the public edge' of the front door; 111 E 5th: dome under soffit, mast camera at roof corner, '24 hour video surveillance' signs in the lane (J.B., Oct 2026) | fieldJB | 80 | 80 | observation; never a guide to coverage gaps — only what a passer-by sees and how it feels | Surveillance as experienced |
| `jobs` | Work created | FTE | floor area ÷ 5,000 ft² per operating job; construction peak separately | floor_area | Virginia JLARC 2024: about one full-time worker per 5,000 sq ft, about half contract; ~1,500 at peak construction for large campuses — transferred from Virginia hyperscale, use with caution at urban scale | jlarc2024 | 40 | 40 | transferred coefficient | Work created |

### Prospect the surroundings

| id | quantity | unit | formula | inputs | coefficients | sources | own | upstream | status | used by |
|---|---|---|---|---|---|---|---|---|---|---|
| `offerable_area` | Offerable floor area | m² | staffed spaces + meet-me rooms + space held for growth, judged | floor_area | — | bins | 20 | 20 | judged | Usable space; Adjacency; Building code for public uses (proposal); Legibility; What the edge shows |
| `receiver_radius` | Receiver search radius | m | by receiver type at 5-year payback: pools 1,000; housing 1,200; greenhouses 1,500 | — | RVO 2018 (IF Technology for RVO, RVO-178-1801): pools 1,000 m (future 1,450); existing housing 1,200 m (future 2,600); greenhouses 1,500–2,100 m; new-build housing 1,200 m; 5-year payback vs natural gas | rvo2018 | 70 | 70 | confirmed (primary report read) | Distance; Existing network nearby |
| `heat_density` | Heat density of receiving area | GJ/ha·yr | q_L = population density × floor space per capita × specific demand; classes 200 / 500 / 1,200 / 3,000 GJ/ha (20/50/120/300 MJ/m²) | receiver_demand, area | RVO 2018 p.8: areas below 1,000 GJ/ha treated as not viable (printed 'GJ/h'); HRE classes 200/500/1,200/3,000 GJ/ha (Persson Table 1, converted) | persson | 70 | 40 | confirmed (RVO primary and HRE) | Heat density |
| `linear_heat_density` | Linear heat density | GJ/m | q_L,w = Q_s ÷ L; effective width w = 137.5e + 5 (e ≤ 0.4) else 60 m; lower limit 1.5 GJ/m | heat_density, plot_ratio | — | persson | 70 | 40 | confirmed | Heat density |
| `distribution_cost` | Distribution capital cost | €/GJ | C_d = a(C1 + C2·d_a) ÷ q_L,w; d_a = 0.0486 ln(q_L,w) + 0.0007; C1 212 €/m; C2 4,464 €/m²; a 0.051 | linear_heat_density | convert to CAD | persson | 70 | 40 | confirmed | Route and right of way |
| `receiver_demand` | Receiver heat demand | GJ/yr | disclosed data (Energize Vancouver, opt-in) else floor area × intensity | receivers | CEUD intensities blocked; household 81.2 GJ (BC) / 121.8 (AB) × 0.61 space-heat share; measured heat intensity of the host buildings (City energy report): 555 W Hastings 0.24 GJ/m² → 4.9 GWh/yr, 1050 W Pender 0.32 → 2.5 GWh, 900 W Hastings 0.26 → 0.9 GWh, 111 E 5th 0 (all-electric); host heat demand is 15–22% of the building's own non-heat energy, so a data centre's host can absorb only a fraction of what it rejects; CEUD 2023 commercial/institutional intensity: BC 1.114 GJ/m² (all activity types), Alberta 2.007 GJ/m²; offices ≈32% of sector energy in both provinces, health care 18.9% BC / 14.2% AB; per-activity intensity not published — apportion by share × floor space or use the measured City report where a building is listed; 13 Oct 2026 receivers: NEU 667,000 m², 47 buildings (data centres named as a future heat source); Creative Energy Core >200 buildings; NE False Creek 48,100 MWh/yr; Sen̓áḵw 11,218 MWh/yr; River District ~33,600 MWh/yr at build-out; UBC ADES ~89 GWh; Edmonton DDE ≤50 buildings by 2050; Blatchford 13.1 MW heat / 12.3 MW cooling; 13 Oct 2026 receivers: NEU 667,000 m², 47 buildings (data centres named as a future heat source); Creative Energy Core >200 buildings; NE False Creek 48,100 MWh/yr; Sen̓áḵw 11,218 MWh/yr; River District ~33,600 MWh/yr at build-out; UBC ADES ~89 GWh; Edmonton DDE ≤50 buildings by 2050; Blatchford 13.1 MW heat / 12.3 MW cooling; 13 Oct 2026 receivers: NEU 667,000 m², 47 buildings (data centres named as a future heat source); Creative Energy Core >200 buildings; NE False Creek 48,100 MWh/yr; Sen̓áḵw 11,218 MWh/yr; River District ~33,600 MWh/yr at build-out; UBC ADES ~89 GWh; Edmonton DDE ≤50 buildings by 2050; Blatchford 13.1 MW heat / 12.3 MW cooling | energize, edmBench, ceud, statcanHousehold, nrcanTrends, vanEnergyReport, receiversBCUC, edmReceivers, neuConnect | 40 | 40 | proxy | Quantity |
| `deprivation` | Deprivation of affected areas | index | CIMD by dissemination area within noise contour and receiver radius | noise_level, receiver_radius | — | cimd | 80 | 50 | confirmed | Real need; Who benefits and who bears; Community response on record |
| `people_affected` | People within reach | people | dissemination-area population × share of the DA within each radius (noise, light, heat receivers) | receptors, area | Census Profile 2021 at DA level and DA boundaries (J.B. retrievals P1–P3) | census2021DA | 0 | 0 | gap: census download pending | Real need; People within reach |

### Opportunities: what the output could become

| id | quantity | unit | formula | inputs | coefficients | sources | own | upstream | status | used by |
|---|---|---|---|---|---|---|---|---|---|---|
| `refuge_people` | People sheltered | people | usable area ÷ 3.5 m²; 2 m between beds | offerable_area, backup_hours | BC ESS / JIBC; Edmonton shelter standard; cold need: Edmonton 6.1–6.5 days/yr with daily max ≤ −20 °C, extreme min −48 °C; Vancouver 0 days (ECCC Normals 1991–2020) | ess, eccc | 80 | 20 | in hand | — (input to others) |
| `clean_air_volume` | Clean-air room volume served | m³ | cleaned airflow ÷ (2–3 ACH); MERV 13+; < 26 °C | offerable_area | Health Canada 2020 | ess | 80 | 20 | in hand | — (input to others) |
| `cooling_centre_people` | People a cooling room can hold | people | spare cooling kW ÷ (0.108 kW per seated person + envelope gains); keep ≤ 26 °C | spare_cooling, offerable_area | 108 W seated, 126 standing, 207 W walking 3.2 km/h (ASHRAE via EnergyPlus; 180 W is 'walking about, office'); 26 °C Health Canada 2026; need: Vancouver Intl 5.7 days/yr humidex ≥30, Edmonton 10.5 (≥35: Edmonton ~1/yr; ECCC Normals 1991–2020); note 2021 heat dome exceeds normals | ess, healthCanada2026, eccc | 60 | 20 | derived | — (input to others) |
| `homes_heated` | Homes heated | homes | homes = Q_available ÷ (space-heat GJ/household [+ DHW GJ/household if year-round]); BC 33.1 (+19.4), AB 76.9 (+28.2) GJ | heat_delivered | CEUD 2023, provincial: BC 71.7 GJ/household/yr total, space heating 46.2% (33.1 GJ), water heating 27.1% (19.4 GJ), 0.464 GJ/m²; Alberta 121.8 GJ/household, space heating 63.1% (76.9 GJ), water heating 23.2% (28.2 GJ), 0.785 GJ/m² (replaces the 2021 StatCan 81.2 / 121.8 and the national 61% share); StatCan 25-10-0060 (2021, primary CSV): BC 81.2 GJ/household all energy; gas-using households 1,235,024 of 2,041,830 (60%) at 80.2 GJ gas each; electricity 32.5 GJ/household (40% of energy). Alberta 121.8 GJ; gas households 1,471,165 of 1,633,225 (90%) at 109.3 GJ; electricity 23.3 GJ (19%). Displacement target for a heat match = the gas-using share, not all households | ceud, statcanHousehold | 80 | 50 | confirmed (CEUD 2023 end-use split; StatCan 2021 fuel split, primary) | — (input to others) |
| `greenhouse_area` | Greenhouse area heated | m² | Q_delivered ÷ q_greenhouse; supply temperature check: root-zone ~38 °C ok, pipe-rail 82 °C needs heat pump | heat_delivered, heat_temp | 1.63 (Ontario measured) – 2.1 (Manitoba) GJ/m²·yr; BC/AB figure not found | manitobaGH, iesoGH, giacomelli, rootZone | 60 | 50 | transferred | — (input to others) |
| `aquaculture_tonnes` | Fish production supported | t/yr | tonnes = heat_delivered ÷ heat_per_kg; heat_per_kg 2.9 kWh/kg (make-up water only, 5→12 °C, Ayuso-Virgili 2023) to 4.6 kWh/kg (Luke, 15.5 °C trout); or per tank volume 300–600 kWh/m³·yr (Ion 2022, Galați, scale by HDD); or from first principles V × 1.16 × ΔT | heat_delivered, heat_temp | Ayuso-Virgili 2023: 9.589 kWh/kg total, freshwater thermal 30.1% (2.9 kWh/kg); Nistad 2020: measured smolt 5.1–12.8 mean 8.8 kWh/kg, heat pump ≈10–15% of total (COP 3 → 2.6–4 kWh/kg heat); Luke 4.6 kWh/kg; trout 9–14 °C (FAO); DFO BC model at 15 °C | ayuso2023, nistad2020, ion2022, lukeRAS, faoTrout, dfoRAS | 70 | 50 | confirmed (peer-reviewed full texts; Norwegian/Romanian climates transferred) | — (input to others) |
| `algae_kg` | Algae dry mass supported | kg/yr | Q ÷ 217 kWh/kgDW at 24 °C | heat_delivered, heat_temp | Chlorella, industrial plant, Italy | gurreri2023 | 70 | 50 | peer-reviewed, transferred | — (input to others) |
| `insect_check` | Insect rearing heat | kWh/kg | mealworm: 2.88 kWh heating per kg live (Dreyer et al. 2021, Austria); BSF: 3,404 kWh heat per tonne substrate input (Öko-Institut 2022); rearing 27–35 °C | heat_temp | — | dreyer2021, oekoBSF, schon2024 | 70 | 70 | peer-reviewed (mealworm) and government-commissioned (BSF) | — (input to others) |
| `distributed_servers_homes` | Homes heated by distributed servers | homes | servers ÷ (37–114 servers per home at 0.35 kW) | servers | Liu et al. 2011 (US climate zones); Qarnot/heata operator claims | liu2011 | 40 | 40 | design paper only | — (input to others) |
| `ev_stalls` | EV charging stalls supported | stalls | P_reserved × SF ÷ P_charger | spare_capacity | Level 2 7.4–19.2 kW; DCFC 50–350 kW; SF 0.5 | wsuEV, vanDCFC, silber2024 | 70 | 50 | confirmed | — (input to others) |
| `ev_area` | Space for charging stalls | m² | stalls × 13.75 m² net (≈ 22 m² with aisle) Vancouver; 14.3 / 23.4 Edmonton | ev_stalls | Vancouver 2.5 × 5.5 m, aisle 6.6 m; Edmonton Bylaw 20001 Table 5.1.3: standard 5.5 × 2.6 m, 90° aisle 7.0 m (confirmed on current bylaw) | vanParking, edmParking, edmBylaw20001 | 90 | 50 | confirmed (both current) | Room for equipment |
| `stored_heat` | Seasonal stored heat | MWh | ρ c V ΔT × efficiency (0.3–0.7) | heat_delivered, ground | ρc 1,238–2,683 kJ/m³K; Drake Landing 0.06 → 0.54 | drake | 80 | 50 | in hand | Conversion step and its cost; Storage to bridge |
| `storage_footprint` | Storage footprint | m² | pit storage ≈ 20.15 V^0.61; ~47–97 kWh/m³; tank rule ~30 m³/MWh | stored_heat | DEA ch.140 (text after Table 2): footprint = 20.15 × V^0.61; PlanEnergi 2025: 100,000 m³ → 23,100 m² design, ~26,000 m² realistic; specific footprint 15.4 × V^−0.369; heat-pump plant (DEA Aug 2026, sheet 40, waste-heat source): 100 m²/MW_heat at 1 MW, 50 at 3 MW, 30 at 10 MW (ranges 50–200 / 30–100 / 20–60); electric boiler and gas boiler ≈ 0–10 m²/MW | dea | 80 | 50 | confirmed | Room for equipment |
| `sewage_heat` | Sewage heat recoverable | kW | Q(L/s) × 4.18 × ΔT; not below 6 °C; WWTP inflow ≥ 11 °C | sewer_flow | Metro Vancouver ~45 MW City-wide (KWL 2014); FCNEU: 2006 design 2.5 MW base sewage heat, COP ~3, levelized $59/MWh (RTS 06419); +5 MW planned 2018; +6.6 MW added (City page). '3.2 MW' and '24 MW boilers' not found on cited pages — removed; Vancouver sewer-mains layer gives effluent type and material per segment but no diameter or flow, so flow near a parcel stays a gap (Metro Vancouver / City engineering request) | wilsonWorrall, kwlSewer, neuReport, rts06419, vanSewer | 80 | 80 | flow gap | — (input to others) |
| `copper_tonnes` | Copper in the facility | t | MW × 20–40 t/MW | it_load_actual | CDA 2023 (industry) | cda2023 | 50 | 50 | industry estimate | — (input to others) |
| `ewaste` | E-waste | kg/yr | servers × mass ÷ 6 yr | servers | 26.3 kg (2U); 21.25 kg (1U) | dell | 60 | 50 | manufacturer | Form |
| `rare_earth` | Rare earth in drives | g | drives × 3–4 g | servers | Danczak 2018 | dell | 70 | 50 | in hand | — (input to others) |

### Test the match

| id | quantity | unit | formula | inputs | coefficients | sources | own | upstream | status | used by |
|---|---|---|---|---|---|---|---|---|---|---|
| `demand_profile` | Hourly heat-demand profile | MW | hourly HDD = max(0, 16 − T_out); space heat ∝ HDD in season; DHW constant; losses ~15% | receiver_demand, weather | Vancouver HDD 2,925 (VBBL 2014 Table 1.1.3.1); Edmonton HDD18 5,120 (NECB 2020 Table C-1, same data set as NBC 2020 Table C-2); computed from CWEC: monthly share of annual HDD16 — Vancouver Dec 0.170, Jan 0.166 … Jul/Aug 0.003; DJF 0.475, JJA 0.025 (winter/summer 19:1); Edmonton DJF 0.465, JJA 0.051 (9:1). With space heat 61% and DHW/losses flat (STRATEGO), peak month ÷ minimum month = 3.9 Vancouver, 3.3 Edmonton; ECCC Normals 1991–2020 HDD18: Vancouver Intl 2,781; Edmonton City (Blatchford) 5,126 — matches NECB 5,120; Edmonton Intl Airport 5,697 (the CWEC file is the airport, so Edmonton parcels run ~10% fewer HDD than its typical year); provincial space-heat share from CEUD 2023: BC 0.46, AB 0.63 (replaces national 0.61 in the profile) | stratego, vbblHDD, necbHDD, eccc, ceud, cwec | 70 | 40 | computed from CWEC + STRATEGO method + NRCan 61% space-heat share; building-stock mix not applied | Profile match; Free-cooling overlap |
| `price_floor` | Operator floor price | CAD/MWh | CRF × capex_capture (0.5–0.65 M€/MW_heat) ÷ MWh − cooling savings; bounded by revealed prices (Fortum €11–50; Exergi 400 SEK ≈ $57) | heat_delivered, crf | no Canadian operator figure; 111 E 5th implicit $0 + unrecovered capex; DEA Aug 2026 (2025 €): waste-heat heat pump total investment 1.13 M€/MW_heat at 1 MW, 0.95 at 3 and 10 MW (heat pump 0.36–0.55, building 0.06–0.12, other — pipes, electrical, controls, consultancy — 0.47–0.52); +5–15% at 40–80 °C DH temperatures; fixed O&M ≈ 2,100 €/MW·yr, variable 3.07 €/MWh excluding electricity; lifetime 25 yr; construction 0.5 yr; minimum load 25%; electric boiler 0.07 M€/MW, gas boiler 0.064 M€/MW; CALIBRATION: realised heat-pump full-load hours 1,300–2,700 h in ramp-up years (Tallaght year 1, Odense 2020) and 4,400–7,100 h mature (Odense 2024 ≈ 4,365; Mäntsälä 5,000; STACK Oslo claim 7,143; Inspirationskatalog design 5,000–7,000); all-in capital 0.66 M€/MW (Odense, 44 MW, utility) to 1.53 M€/MW (ReUseHeat, 0.3 MW, excl. network), Equinix PA10 0.86 incl. 2.6 km network — the register's DEA 0.95–1.13 sits inside | bytes2heat, dea, dfKatalog2022, engiePA10, exergi, floor, fortum, hiltunen2020, nivosMantsala, rts19744, tallaghtD22 | 60 | 50 | derived | Price window |
| `price_ceiling` | Buyer ceiling price | CAD/MWh | fuel price ÷ boiler efficiency (0.85); or district-energy tariff; NEU returned-heat credit as revealed WTP | — | Vancouver gas ≈ $38.6 (Rate 3, Rider 6 excluded; $39.4 with it); RNG ≈ $70.7; NEU credit $32.59; Creative Energy 2026 interim tiers $66.6 (first tier) to $39.6 (remainder) per MWh; Edmonton gas ≈ $10.7; Denmark 2025 surplus-heat price cap 95 DKK/GJ (≈342 DKK/MWh) as a regulated comparator; Edmonton Downtown District Energy Utility (City-owned, Bylaw 20914; EPCOR design-build-finance-operate; Phase 1 = Winspear-area plant serving Century Hall and Chancery Place, Phase 1A adds City Hall, Citadel Theatre, Milner Library): rates set on a 'Business as Usual' principle — customers pay on average what they would pay a traditional provider plus their avoided boiler maintenance and capital renewal (IIS02765 p.4), so the Edmonton buyer ceiling = gas-equivalent cost + avoided boiler costs; Phase 1/1A: capital $51 M, annual rate revenue $2.4 M vs operating cost $1.9 M on gas or $5.3 M on electric boilers; 30-yr NPV +$4 M gas vs −$25 M electric (84% GHG cut, 126,000 t, $198/tCO2); full build-out: no-decarbonization NPV +$106 M (10% GHG cut) vs max-decarbonization −$172 M (96% cut); no private building is obliged to connect and no capital is funded for private connections; 2025 budget $889k spend vs $336k revenue; the $/GJ tariff itself is in Attachment 4 (pending); Vancouver built case: TELUS Garden TES (FAES, BCUC C-1-13 / G-155-12) charges customers the BC Hydro residential benchmark + 5–10 % ($0.105–0.126/kWh proposed 2014–18 = $105–126/MWh) for recovered-heat service — an all-in regulated TES rate including distribution and capital, not a price for the heat itself | abgas, bcucC113, ceG526, dkPriceCap, edmDDE, fortis, neu9552, neuReport | 60 | 60 | derived; Edmonton: pricing principle confirmed from the City report (90), tariff pending | Price window; What the receiver saves |
| `window` | Price window overlap | CAD/MWh | overlap = [floor_low, floor_high] ∩ [ceiling_low, ceiling_high]; pass if non-empty | price_floor, price_ceiling | — |  | 60 | 50 | derived | Price window |
| `crf` | Capital recovery factor | — | i ÷ (1 − (1+i)^−n) | — | NREL ATB | crf | 100 | 100 | in hand | Payback |
| `lcoh` | Levelised cost of heat | CAD/MWh | (CRF × capex + O&M + energy) ÷ MWh | crf, hp_electricity, heat_delivered | IEA SHC Task 54; O&M 2,000 €/MW·yr | crf, hiltunen2020 | 70 | 50 | in hand | Conversion step and its cost; Payback |
| `payback` | Payback and IRR | yr | NPV, IRR (NIST HB 135) | lcoh, window | Pärssinen 2019 Table 4: medium 2.14–3.72 yr (min case >10 yr); large 1.82–5.14 yr (corrected after verification) | crf, parssinen | 70 | 50 | in hand | Payback |
| `risk_term` | Termination risk | %/yr | share of recoveries lost (volume-weighted) and share of cooperations terminated, by class | — | ≈6% of annual average heat recoveries lost to terminated industry + substitution, 107 Swedish recoveries 1974–2014; all causes 13% by volume (2.6 of 19.9 PJ), 33 of 107 by count; heat-pump-based: 14 of 19 terminated; small (<55 TJ/yr): 19 of 45; large (>300 TJ/yr): 0 of 16; risk factors = small volume and heat-pump recovery; authors: premium lower than feasibility studies presume | lygnerud | 70 | 70 | confirmed (full text, Energy 151:430–441, Table 2 p.434) | Termination risk; Risk premium; Dependency |
| `capex_split` | Who pays which part | — | recovery equipment / connection / network / heat pump, by party | — | Stockholm Exergi: supplier owns and invests in the heat pump; Exergi owns meter and pipes to metering point; called-off contracts 10 yr + 5 yr option, spot contracts open-ended (Energiforsk 2020:681); Fortum: price by outdoor temperature and supply/return side; RTS 19744: applicant pays all; Wahlroos 2018 p.1760: heat-pump capex 500 EUR/kW_heat ("rather low", DH pipe very near, Finnish sewage-HP experience); Table 2: 12 MW DH output, 5 MEUR extra investment, 5-yr direct payback; Bahnhof projects 3–5 yr ROI (operator claim); DEA Aug 2026 (2025 €): waste-heat heat pump total investment 1.13 M€/MW_heat at 1 MW, 0.95 at 3 and 10 MW (heat pump 0.36–0.55, building 0.06–0.12, other — pipes, electrical, controls, consultancy — 0.47–0.52); +5–15% at 40–80 °C DH temperatures; fixed O&M ≈ 2,100 €/MW·yr, variable 3.07 €/MWh excluding electricity; lifetime 25 yr; construction 0.5 yr; minimum load 25%; electric boiler 0.07 M€/MW, gas boiler 0.064 M€/MW; CALIBRATION 13 Oct 2026: in five of seven built cases the data centre gives the heat free and the utility owns and pays for the heat pump (Odense — Fjernvarme Fyn pays the total investment, 215 M DKK; Tallaght — SDCC-owned Heat Works, AWS heat free; Equinix PA10 — free for 15 years; Markham — 'Equinix does not seek income'; TELUS Garden — FAES owns the TES, 'free waste heat supply'); the supplier-owned, paid model is Stockholm (Öppen Fjärrvärme, hourly avoided cost, supplier owns the heat pump) and Mäntsälä (price not public). The tool must run both ownership models | bcucC113, dea, energiforsk2020, engiePA10, equinixTR5, exergi, exergiAR2023, fjfAars2020, fortum, hiltunen2020, rts19744, tallaghtD22, wahlroos2017, wahlroos2018 | 70 | 70 | confirmed (full texts) | Who pays capital |
| `affordability` | Heat cost share of income | % | annual heat cost ÷ after-tax income; energy poverty if > 6% | price_ceiling, deprivation | CUSP 6%; Canada household energy $2,535 (2019); 13 Oct 2026: CUSP's tool is no longer at energypoverty.ca; Statistics Canada (2024) uses ≥10 % of after-tax income on energy bills: BC 4.9 %, Alberta 7.3 % (provincial only); small-area data would need a custom table; 13 Oct 2026: CUSP's tool is no longer at energypoverty.ca; Statistics Canada (2024) uses ≥10 % of after-tax income on energy bills: BC 4.9 %, Alberta 7.3 % (provincial only); small-area data would need a custom table; 13 Oct 2026: CUSP's tool is no longer at energypoverty.ca; Statistics Canada (2024) uses ≥10 % of after-tax income on energy bills: BC 4.9 %, Alberta 7.3 % (provincial only); small-area data would need a custom table | cusp, statcanSHS, statcanEP2024 | 70 | 50 | confirmed | Affordability |
| `build_cost` | Data-centre build cost | USD/W; CAD/ft² | cost per watt of critical power; cost per ft²; partially filled: capex and non-power opex × 1 ÷ occupancy | — | Barroso 3rd ed. Table 6.1 p.130: $9–13/W Tier III historical (Dupont Fabros 2010–11: 8.94–12.56); $7–9/W recent 10-Ks (DLR, CyrusOne, QTS); $12–25/W small/medium (Uptime); §6.5 p.135: two-thirds full → +50% opex, half-full server TCO $8,981 vs $6,310; Vancouver 910–1,200 CAD/ft² (T&T 2025, industry); local permit values: $28.5 M for a 4-storey office→data-centre conversion (175 W Cordova, 2022) and $18 M for three tower floors to Bulk Data Storage F2 (515 W Hastings, 2023) — per-m² pending floor areas | barroso2018, fan2007, tt2025, vanPermits | 70 | 70 | confirmed (textbook, 2010–2017 USD data; local CAD/ft² industry) | Reserved capacity costs the operator |
| `horizons` | Time horizons | yr | servers ~6; plant 15–25; shell ≤40; network 40–50; lease | — | Servers: average life 4.4 → 5 → 5.7 years (2000–2019, 2020, 2023; LBNL 2024); filings moved server useful lives to 5–6 years (Microsoft, Alphabet, Meta; Amazon partly back to 5 in 2025); Barroso: servers depreciated over 3–4 years, facilities over 15–20; plant medians ~20–25 years (ASHRAE); district-heating pipes 30 years at 120 °C, 50 only below 115 °C (EN 253); contracts: colocation 2–5 years, scale 5–10+ (Digital Realty); heat contracts 10 + 5 (Stockholm Exergi); Tallaght plant 25–35 years; Seattle permit 10 + two 10-year renewals; Vancouver property-tax report flags holding sites (improvement ÷ land value) | horizons, vanTax, lbnlLife, tenK_life, barroso2018, ashraeLife, en253Life, dlrContracts | 80 | 80 | primary sources found (13 Oct 2026) | Time horizons; Contract chain; Dependency |
| `lead_time` | Connection lead time | months | BC Hydro: conceptual 1–1.5 + SIS 6–9 + transition 3–4 + FS 6–9; AESO: stages 0–2 avg 86 wk, stage 3 avg 134 wk | — | — | bchTransmission, aesoPerf | 90 | 90 | confirmed | Lead time; Grid connection |
| `grid_headroom` | Grid headroom status | status | governing document, date, stated cap or constraint, next milestone; headroom field in the form regulators publish elsewhere: remaining kVA band at station (≥7.5 MVA) and feeder (OEB) or feeder-segment kVA class (ENMAX) | — | Vancouver: West End Substation CPCN (10 Nov 2025, read in full): the downtown substations (Murrin 1947, Dal Grauer 1952, Cathedral Square) are 'at their final stage of development with no room to add more capacity'; by fiscal 2027 all 12 kV feeder positions in the study area will be in use, after which new customers connect only by loading feeders above planning guidelines or using transfer-tie positions in other stations (s.2.2.2); the project is a 230/25 kV, 400 MVA underground substation at 1150 Nelson St, expected in service July 2032, cost $756 M–$1.391 B (expected $1.028 B); Mount Pleasant (150 MVA, 2014, expandable to 400 MVA) cannot absorb Murrin's load; decision pending; Edmonton: 1,200 MW allocated; Data Centre Regulation, Alta Reg 117/2026 (posted 17 Jun 2026; read in full): s.2 'large data centre' = maximum demand from the transmission system ≥ 75 MW (ISO may set a lower threshold); s.3 ISO may aggregate data centres on the same or adjacent parcels under the same person or affiliate; s.5 'tethered' = large data centre whose access request is tied to a generating unit or storage facility of equal or greater capability; s.6 tethered requests processed first; s.7 ISO may require site control, municipal zoning approval, financing, permits and water licences before service; s.8 tethered service capped at the tethered generation's rate; s.9 'bridged' = tethered data centre served before its generation is in service, for at most 3 years, with an ISO-set demand limit and an ISO-set limit on all bridged load (no MW figure in the regulation — the 1,600 MW pool is an AESO process figure, not statute); s.10 bridged data centres cut first in a supply shortfall, large data centres cut before other participants in mandatory load shedding; s.12 review by 31 May 2030, expires 31 May 2035; neither city publishes a load-capacity map (EPCOR, BC Hydro: verified negative); precedents: ENMAX feeder classes <999…11,000–12,999 kVA (Dec 2025), OEB bands 0–1,000/1,000–2,000/>2,000 kVA at stations, Toronto Hydro = planning limit − annual peak, Hydro-Québec zone residuals (Montréal-Est 100 MW); Edmonton substation example: Woodcroft POD N-1 firm 76.0 MVA vs 74.2 MVA 2024 peak, shortfall from 2032 (EPCOR DDR Sep 2025); AESO Phase 1 1,200 MW allocated (970 + 230), ~19,565 MW requested (GoA, Jul 2026); BC CFD 15 applications ~800 MW, up to 400 MW, outcome deferred; AESO list Oct 2026: 56 data-load projects, 23,549 MW DTS in total — Active 16 / 1,752 MW, ISD Under Review 28 / 18,491 MW, Cluster 3 9 / 2,466 MW, cancelled 3 / 840 MW; none energized; 9 projects sized at exactly 74.9 MW (just under the 75 MW Alta Reg 117/2026 threshold); planning area 60-Edmonton: Beacon Saunders Lake A.I. Hub 400 MW (stage 2, ISD under review), Sovereign Cloud 74.9 MW (stage 2, active, ISD Dec 2029); EPCOR distribution-load reliability projects name the constrained areas: South Edmonton 51 MW (2031), West/Poundmaker 30.6 MW (2031), SW/Meadowlark 28 MW (2030), Woodcroft equipment change (Nov 2026); BC Hydro 2025 IRP (Exh. B-1): load scenarios follow Bill 31 (tabled 20 Oct 2025) — permanent ban on new cryptocurrency connections; sector limits for a two-year competitive call of 300 MW for AI and 100 MW for data centres (p.2-22 fn 17) — so the "up to 400 MW" Call for Demand is 100 MW of conventional data centre plus 300 MW of AI; Lower Mainland is one of three transfer-constrained regions, options with ~10-year lead times: SVCs at Ingledow/Meridian +400 MW ($20/kW-yr), new 500 kV Kelly Lake–Lower Mainland +630 MW ($195/kW-yr), Kelly Lake–Nicola +300 MW ($298/kW-yr) (Table 2-22); 13 Oct 2026: BC allocation framework — 300 MW AI + 100 MW data centres, ≥10 MW competitive, >150 MW full incremental cost; ISED principles (Sep 2026): proponents pay connection costs; 13 Oct 2026: BC allocation framework — 300 MW AI + 100 MW data centres, ≥10 MW competitive, >150 MW full incremental cost; ISED principles (Sep 2026): proponents pay connection costs; 13 Oct 2026: BC allocation framework — 300 MW AI + 100 MW data centres, ≥10 MW competitive, >150 MW full incremental cost; ISED principles (Sep 2026): proponents pay connection costs | wes, aeso, woodcroft, queue, enmaxMap, oebCCIM, torontoHydroMap, hqZones, woodcroftDDR, aesoLargeLoad, goaGrid, cfdPage, aesoList, altaReg117, bchIRP2025, bcIEAF, isedPrinciples | 90 | 90 | confirmed (regulator and utility documents read in full); MW headroom at a downtown Vancouver parcel is explicitly nil for new feeder positions from fiscal 2027 until the WES is in service (July 2032) — the tool reports this as a hard timing constraint, not a judgement | Zoning and permits; Grid connection; Price of power at the site |
| `crossing_type` | Crossing type | class | pipes/cables/data only (easier) vs people inside (harder) | receivers, offerable_area | rule 9; diagrammatic only | rule9 | 100 | 20 | rule | Exit point; Building code for public uses (proposal); Crossing type; Public access safe |
| `standoff` | Standoff and zones | m | 10 m all new facilities; 45 m enhanced (GO-ITS 25.18); zone hierarchy PZ/RZ/OZ/SZ/HSZ (GCPSG-015) | crossing_type | Ontario standard transferred; TIA-942 ratings as proxy | goits, gcpsg015, tia942 | 90 | 20 | confirmed | Critical-infrastructure law; Security zones and standoff; Rating as proxy; Public access safe |
| `noise_limit` | Local noise limit | dBA | Edmonton 65 day / 50 night at residential line (instantaneous); Vancouver by zone pair, continuous (int→quiet 60/50); AUC Rule 012 Leq 40–56 + tonal +5 | noise_level | AUC Rule 012 (30 Sep 2024 consolidation; Bulletin 2026-03 of 17 Apr 2026 added guidance only) Table 1 basic sound level, night-time dBA Leq, all 15 cells confirmed: Category 1 (≥500 m from heavily travelled road/rail): 40 / 43 / 46 / 48 / 53 for 1–8 / 9–160 / 161–400 / 401–1,000 (suburban) / >1,000 (urban) dwellings per quarter section (451 m radius); Category 2 (30–500 m): 45 / 48 / 51 / 51 / 53; Category 3 (<30 m or frequent flyovers): 50 / 53 / 56 / 56 / 56; daytime = +10 dBA; minimum night BSL 40; Class A (seasonal/ambient) and B (temporary) adjustments may add; receptor = any dwelling within 1.5 km of the property boundary, else a point at 1.5 km; cumulative with other energy-related facilities; no-net-increase rule (s.2.8) for areas already at the limit. Note: Rule 012 binds AUC-regulated facilities (substations, generation); a data centre itself falls under Edmonton Bylaw 14600 — the rule applies to its grid connection and any generation it tethers to; 13 Oct 2026: Vancouver zone pairs confirmed — quiet→quiet 55/45, activity→quiet 60/55, intermediate/activity→other 70/65; no standing variance for operating noise (111 E 5th amended the by-law's schedule instead); 13 Oct 2026: Vancouver zone pairs confirmed — quiet→quiet 55/45, activity→quiet 60/55, intermediate/activity→other 70/65; no standing variance for operating noise (111 E 5th amended the by-law's schedule instead); 13 Oct 2026: Vancouver zone pairs confirmed — quiet→quiet 55/45, activity→quiet 60/55, intermediate/activity→other 70/65; no standing variance for operating noise (111 E 5th amended the by-law's schedule instead) | bylaw14600, bylaw6555, rule012, van6555zones | 90 | 50 | confirmed (regulator text read in full, data/AUC_Rule_012_2024-09-30.pdf) | Noise limits |
| `licence_flag` | Water licence required | flag | BC: yes for open-loop heat exchange (WSR Sch. A item 9). Alberta (Guide to Groundwater Authorization 2023 §6.2): open loop with no water loss and return to the same water body = Water Act "activity" → approval; different water body or any loss → licence; closed loop → none. Flow tier for the aquifer test: Q(m³/day) = heat_kW ÷ (1.16 × ΔT) × 24; a 1 MW loop at ΔT 5 K ≈ 4,100 m³/day → top tier | ground | Alberta EPA fact sheet, Ground Source Heat Exchange Systems (8 Oct 2025; 2024 edition identical on these points): open-loop systems "are regulated through a Water Act authorization" obtained before construction; application must assess the aquifer's capability to circulate the required quantity continuously, effects on groundwater quantity, temperature and quality, and on household, agricultural and existing licence holders; complex systems need an APEGA groundwater specialist report per the Guide to Groundwater Authorization; water in an open loop cannot be used for another purpose or temporarily discharged; open-loop wells drilled by a Class A driller, return through a separate return well; horizontal closed loop above the water table and vertical closed loop above the base of groundwater protection need no Water Act authorization (Class F installer); below the base of groundwater protection the AER regulates under the Geothermal Resource Development Act; applications via DRAS. Directive (11 Dec 2018) sets the construction standards; Guide App. 2 aquifer-test tiers by daily pumping rate: ≤10 m³/day 2+2 h, no observation well, no APEGA report (§2.2); 10–35 m³/day 24+24 h, 0–1 obs well; 35–65 m³/day 24+24 h, 1; 65–265 m³/day 48+48 h, 1–2; >265 m³/day 72+72 h, 1–2 obs wells, full §2 report by an APEGA groundwater practitioner; maximum daily rate = lesser of test rate and Q20 (20-year sustainable yield); CSA C448 referenced for installation; temporary discharge needs the director's authorisation | wsa, abDirective, abGSHE, abGuide | 90 | 80 | BC and Alberta both confirmed from the regulator (data/); Alberta open loop = Water Act authorization with a temperature-impact assessment — a pass/partial condition, not a veto | Utility regulation |
| `ev_exemption` | EV charging regulatory status | flag | BC: exempt from UCA Part 3 (MO M104, 2019; G-66-19); Alberta: to check | — | — | m104 | 90 | 90 | BC confirmed | Utility regulation |
| `row_cost` | Street right-of-way cost | CAD/yr | Vancouver Encroachment By-law 4243: $244.97 + $6.53/ft² over 150 ft²; Edmonton ULA permit, fees unstated | distribution_cost | — | bylaw4243, edmULA | 90 | 40 | confirmed | Route and right of way |
| `reserved_cost` | Cost of reserved (unused) capacity | USD/W·yr | (capex + non-power opex) × (1 ÷ occupancy − 1); i.e. the share of a built-but-empty data centre that the offerable capacity carries | spare_capacity, build_cost | Barroso §6.5: scale by inverse of occupancy; two-thirds full → +50% opex; half-full: server TCO $8,981 vs $6,310 | barroso2018 | 70 | 50 | confirmed (textbook method) | Reserved capacity costs the operator |
| `lrmc_bc` | BC Hydro long-run marginal cost | $/MWh; $/kW·yr | value of energy or capacity a data centre frees up or avoids = LRMC × quantity; capacity value of flexible load = $300 + $110 per kW-yr of firm reduction at peak | flexible_load, spare_capacity | 2025 IRP App. F: energy $97/MWh (F2025$; UEC at POI $77 from the 2024 Call for Power levelized bid, + firm transmission 3, network upgrades 6, integration 8, losses 5, time-of-delivery −3); capacity $300/kW-yr point estimate (range 150–400); distribution and non-bulk transmission $110/kW-yr; dual-fuel dwellings cut Lower Mainland peak demand ~75% vs all-electric (Fig. 2-7) | bchIRP2025 | 90 | 40 | confirmed (utility filing, public appendix) | Value of flexibility to the grid |
| `zoning_status` | Zoning: allowed, conditional or rezoning | class | look up the district: outright / conditional (development permit) / not listed (rezoning or text amendment) | parcel | Vancouver: Bulk Data Storage conditional in I-2, I-3 sub-area A, I-1C; not in I-1A and most industrial and downtown districts; CD-1 rezoning otherwise (111 E 5th). Edmonton: no data-centre use; a small one may be Minor Industrial (BE, IM), a large one Major Industrial (heavy industrial; IM only where existing at 1 Jan 2024); unlisted activities are always discretionary. Parkland County: "Data Processing Facility" listed in BI, MI, HI, C (permitted vs discretionary unverified); DC Area 7 created 2025 | van3575s2, vanDistricts, rts19744p4, edm20001, edmLDA26, parklandLUB | 80 | 80 | in hand; Parkland P/D and Edmonton IH to confirm | Zoning and permits |
| `rezoning_price` | What a rezoning takes | months; $ | duration + application fee + levies and charges on new floor area | zoning_status, floor_area | Vancouver: target ~15 months to decision (~1 year from fee to hearing); CD-1 fee $94,500 (elsewhere) or $226,300 (downtown/Broadway) + $1,590 per 100 m² under 8,000 m²; DCL industrial $112.87/m², mixed employment $211.54/m² (none if floor area does not increase); ACC $12.92–24.22/m² from 30 Sep 2026; CAC exempt for 100 % industrial after 30 Sep 2026. Also where the City attaches conditions (111 E 5th heat delivery) and residents get a say (579 submissions). Edmonton: duration and fees not stated on the City page (J.B. retrieval D2) | vanRezoneTime, vanFees2026, vanDCL, vanACC, vanCAC, rts19744, edmRezone | 80 | 70 | Vancouver in hand; Edmonton fees and times pending | Zoning and permits |
| `consultation` | Consultation and rights that apply | process | list the approvals an option needs that trigger consultation; describe, never predict | licence_flag, grid_headroom | Alberta: Water Act licences, public-land dispositions and environmental approvals wait on consultation; EPEA approval for backup generation over 50 MW. BC: Water Sustainability Act licences, BCUC CPCNs, City of Vancouver UNDRIP Strategy — to source. BC Hydro's 2026 Call for Demand scores First Nations criteria at 10 %. The tool never speaks for the Nations | abConsult, bchCfDRfA | 40 | 40 | Alberta partly in hand; BC to source | Consultation and rights |
| `construction_time` | Time to build and connect | months | planning and permits + construction + grid connection (often the longest) | zoning_status, lead_time | 12–18 months per building; 2–3 years to operation; grid can add 12–36 months (JLARC; IEA); Vancouver rezoning ~15 months; Edmonton permit data give build times for non-residential permits since 2024 | jlarc2024, ieaEnergyAI, vanRezoneTime, edmPermits | 60 | 60 | in hand (transferred); local derivation possible for Edmonton | Lead time |

### Decide and account

| id | quantity | unit | formula | inputs | coefficients | sources | own | upstream | status | used by |
|---|---|---|---|---|---|---|---|---|---|---|
| `cfd_score` | Incentive scoring (counter-example) | % | BC Hydro Call: 30/20/10/30/10 weights; heat-recovery-ready inside the 10% | — | 2026 RfA: 30 % cost, 30 % data sovereignty, 20 % community (incl. brownfield), 10 % environment ('heat recovery ready', PUE, WUE), 10 % First Nations; projects 10–145 MW; 2026 RfA: 30 % cost, 30 % data sovereignty, 20 % community (incl. brownfield), 10 % environment ('heat recovery ready', PUE, WUE), 10 % First Nations; projects 10–145 MW; 2026 RfA: 30 % cost, 30 % data sovereignty, 20 % community (incl. brownfield), 10 % environment ('heat recovery ready', PUE, WUE), 10 % First Nations; projects 10–145 MW | cfd, bchCfDRfA | 90 | 90 | confirmed | Costs passed to ratepayers and taxpayers; Mandates and incentives |
| `ledger` | Party ledger | table | parties × (owns, controls, pays, receives, bears, needs) × (recovery equipment, connection, network, conversion energy, operating payment, risk, pass-through) | capex_split, window, risk_term, deprivation | — | horizons, rts19744, g9425 | 60 | 50 | derived | Building type and control; Who pays capital; Split incentive; Costs passed to ratepayers and taxpayers; Who controls each part; Contract chain; Common ownership; Who benefits and who bears; Residents as a party; Not a technological fix |
| `tradeoffs` | Trade-off table | parties × rows | for each option: every party, every row, gains and losses in their own units — never summed, never ranked | * | Replaces the match verdict (decided 13 Oct 2026). Constraints that cannot move are stated as such; everything else carries what it would take to move it. | nonComp | 100 | 0 | logic defined | Documents and site visit agree |

## How the tool reads a match (decided 13 Oct 2026; see tool_logic_decisions.md)

No verdict and no score. Each option gets a trade-off table: every party, every row, in its own unit, never summed or ranked. Facts are shared; the weighting belongs to whoever is deciding.

### Parties

- **Operator** — owns or runs the data centre
- **Host / landlord** — owns the building or land it sits in
- **Receiver** — takes heat, power, water or space: a network, a building, a greenhouse, a shelter
- **Utility** — electricity, water, sewer and district-energy operators
- **City** — zoning, permits, public land, enforcement of conditions
- **Neighbours** — people who live and work within reach today
- **The public passing by** — the street edge, security zones, surveillance as experienced
- **Ratepayers and taxpayers** — who pays costs passed through tariffs or budgets
- **Workers** — people who build and run it
- **Future residents** — people who live with a 40-year building and network after today's neighbours
- **The climate** — carbon, counted on average and marginal factors
- **First Nations (rights holders)** — Musqueam, Squamish and Tsleil-Waututh (Vancouver); Treaty 6 nations (Edmonton, Amiskwacîwâskahikan). The tool describes which processes and rights apply to an option, with sources, and never speaks for them; their gains and losses are left for the Nations to state. Decided for now; J.B. may revisit.

### What it would take to move a condition

Proposed by Claude (13 Oct 2026), for J.B. to check: each condition lists what it would take to move it, cheapest first. Only 'not movable' is a hard constraint; everything else is a trade-off at a price. A limit set by a user is respected, and what relaxing it would open is shown separately.

- `choice` **a different option** — changes with the design or the site, not with a price
- `money` **money** — equipment, pipe, enclosure, a higher price paid
- `time` **time and process** — permits, rezoning, licences, contracts, consultation
- `policy` **a change in policy or law** — tariffs, by-laws, provincial or federal rules
- `infra` **city-scale infrastructure** — substations, networks, transmission
- `physics` **not movable** — physics and climate; the ceiling everything else works under

### Exchanges, both directions

| exchange | data centre → place | place → data centre |
|---|---|---|
| Heat and cold | `heat_captured`, `heat_delivered`, `stored_heat` | `free_cooling_hours`, `ground`, `sewer_sink`, `surface_water_sink` |
| Power | `spare_capacity`, `flexible_load`, `backup_hours` | `electricity_price`, `grid_headroom`, `rooftop_solar`, `self_gen_rules` |
| Water | `rainwater`, `blowdown` | `water_supply` |
| Space | `offerable_area` | `existing_building`, `zoning_status`, `row_cost` |
| Materials | `copper_tonnes`, `ewaste`, `rare_earth` | `existing_building` |
| Sound | `noise_level` | `ambient_cover` |

### Lifecycle

| phase | duration | basis | conf |
|---|---|---|---|
| Planning, permits, grid | 1–3 (Vancouver rezoning ~15 months to decision; grid can add 12–36 months) | vanRezoneTime, jlarc2024, bchTransmission, aesoPerf | 70 |
| Construction | 1–1.5 per building; 2–3 to operation | jlarc2024, ieaEnergyAI | 60 |
| Ramp-up | first 1–4 years at 1,300–4,400 full-load hours of the heat pump | tallaghtD22, fjfAars2020, fjfAars2124 | 70 |
| Mature year (the table) | — | — | 70 |
| Server refresh | every 5–6 years (LBNL average 5.7 in 2023) | lbnlLife, tenK_life | 80 |
| Contracts and leases | colocation 2–5 years; scale 5–10+; heat contracts 10 + 5 (Stockholm) | dlrContracts, exergiAR2023 | 50 |
| Plant replacement | chillers and heat pumps ~20–25 years (ASHRAE medians) | ashraeLife | 80 |
| Network life | 30 years at 120 °C; 50 only below 115 °C (EN 253) | en253Life | 80 |
| Closure or reuse | case evidence only: heat-pump recoveries 14 of 19 ended (Sweden); Ericsson Vaudreuil closed within a year; a Sobeys data centre demolished (Edmonton 2021) | lygnerud, velkova2019, edmPermits | 50 |

### How options are made

1. build every combination the tool knows (size, position on the parcel or another parcel, adjacency, technology, both cities, in or out of town)
2. set aside options that break a user limit — and keep them for the "if you moved this limit" panel
3. drop options worse than another on every row for every party (not a trade-off)
4. pick as many as the user asked for, as different as possible on the rows the user emphasised
5. show them side by side, in no order, each with its full trade-off table

Preferences: **Number of options** — how many suggestions the user wants; **Limits** — non-negotiables, e.g. no rezoning; ≤ 45 dB at the nearest bedroom at night; **Emphasis** — which rows the options should differ on; never a weight; **Lens** — which party's view is read first; every row stays visible

## Condition states

Condition states (met / with a change / not met / not applicable or declined / cannot judge / not judged) describe single conditions only. There is no match verdict: decided 13 Oct 2026 — the tool lays out trade-offs by party and does not rank or score options. Wording is suggested for J.B. to accept.

- `pass` **works** — every condition for the match passes
- `partial` **works with a change** — at least one condition passes only if a named change is made; the blocker is named
- `fail` **doesn't work** — a condition fails and no change within the match removes it; the blocker is named
- `na` **not applicable or declined** — the condition does not bear on this match, or the receiver has said no — a valid answer, not a failure
- `cannot` **cannot judge** — a figure the condition needs is missing; the tool names which (operator floor price, parcel MW headroom, BC marginal factor, per-activity intensity)
- `unassessed` **not judged** — the run has not reached this condition yet

## Conditions (open list, from GP1 8 Oct 2026; additions 13 Oct)

| heading | condition | test | quantities | weakest | to move it | parties |
|---|---|---|---|---|---|---|
| 1 Technical | Quantity | heat_delivered ≥ receiver_demand (or share of it) | `heat_rejected`, `heat_delivered`, `receiver_demand` | 40 | money, physics | operator, receiver |
| 1 Technical | Quality (temperature grade) | heat_temp ≥ receiver need, or COP acceptable after lift | `heat_temp`, `cop` | 70 | money | operator, receiver |
| 1 Technical | Form | heat in water vs air; power voltage; materials reusable vs recyclable | `liquid_capture`, `spare_capacity`, `ewaste` | 50 | money | operator, receiver |
| 1 Technical | Conversion step and its cost | heat pump / storage / treatment energy and capex stated | `hp_electricity`, `stored_heat`, `lcoh` | 50 | money | operator, receiver |
| 1 Technical | Reliability and backup | receiver firmness need vs backup_hours and uptime priority | `backup_hours`, `load_factor` | 80 | money | operator, receiver |
| 1 Technical | Change in cooling | liquid cooling planned → window to attach | `heat_temp`, `liquid_capture` | 70 | time | operator, receiver |
| 1 Technical | Metering at the boundary | ERE control volume definable | `erf`, `heat_in_water` | 50 | money | operator, receiver |
| 2 Spatial | Distance | receiver within receiver_radius | `receiver_radius` | 70 | money | operator, host, receiver, city, neighbours |
| 2 Spatial | Heat density | heat_density ≥ class threshold; linear density ≥ 1.5 GJ/m | `heat_density`, `linear_heat_density` | 40 | infra | receiver, city |
| 2 Spatial | Route and right of way | crossings counted; ROW agreement; distribution_cost within window | `distribution_cost`, `row_cost` | 40 | money, time | operator, host, receiver, city, neighbours |
| 2 Spatial | Existing network nearby | service area within radius | `receiver_radius` | 70 | infra | operator, host, receiver, city, neighbours |
| 2 Spatial | Exit point | judged, diagrammatic | `crossing_type` | 20 | money | operator, host |
| 2 Spatial | Room for equipment | plant and storage footprint fits | `storage_footprint`, `ev_area` | 50 | money | operator, host |
| 2 Spatial | Building type and control | standalone vs floors in a tower | `floor_area`, `ledger` | 50 | choice | operator, host |
| 2 Spatial | Usable space | roofs, walls, setbacks, ground floor, reserved halls | `offerable_area`, `shadow` | 20 | money | host, city, public |
| 2 Spatial | Adjacency | site visit | `offerable_area` | 20 | time | operator, host, receiver, city, neighbours |
| 2 Spatial | Burden reach | noise and light distance to sensitive neighbours | `noise_level`, `light_at_window` | 50 | money | operator, host, receiver, city, neighbours |
| 3 Temporal | Profile match | hourly demand_profile vs near-flat supply | `demand_profile`, `load_factor` | 40 | money | operator, receiver, future |
| 3 Temporal | Free-cooling overlap | free-cooling hours vs heating season | `free_cooling_hours`, `demand_profile` | 40 | physics | operator, receiver, future |
| 3 Temporal | Storage to bridge | stored_heat covers mismatch at 30–70% | `stored_heat` | 50 | money | operator, receiver, future |
| 3 Temporal | Time horizons | connection life > several server refreshes; lease term | `horizons` | 80 | time | operator, receiver, future |
| 3 Temporal | Growth | reserved capacity shrinks as fill-up proceeds | `spare_capacity` | 50 | time | operator, receiver, future |
| 3 Temporal | Lead time | studies, approvals, construction | `lead_time`, `construction_time` | 60 | time, infra | operator, receiver, future |
| 3 Temporal | Termination risk | what happens when the source stops | `risk_term` | 70 | money, policy | receiver, future, operator |
| 4 Economic | Price window | floor ≤ price ≤ ceiling | `price_floor`, `price_ceiling`, `window` | 50 | money, policy | operator, receiver, utility, ratepayers |
| 4 Economic | Who pays capital | each part assigned | `capex_split`, `ledger` | 50 | money | operator, receiver, utility, ratepayers |
| 4 Economic | Payback | IRR and LCoH within thresholds | `crf`, `lcoh`, `payback` | 50 | money | operator, receiver, utility, ratepayers |
| 4 Economic | Risk premium | both sides | `risk_term` | 70 | money | operator, receiver, utility, ratepayers |
| 4 Economic | Split incentive | tenants on flat rates | `ledger` | 50 | policy | operator, receiver, utility, ratepayers |
| 4 Economic | Reserved capacity costs the operator | cost per watt rises with emptiness | `spare_capacity`, `build_cost`, `reserved_cost` | 50 | money | operator, receiver, utility, ratepayers |
| 4 Economic | Costs passed to ratepayers and taxpayers | named in ledger | `ledger`, `cfd_score` | 50 | policy | ratepayers, utility |
| 4 Economic | What the receiver saves | replaced fuel by city | `price_ceiling` | 60 | money | operator, receiver, utility, ratepayers |
| 5 Organizational | Who controls each part | landlord / tenants / utility | `ledger` | 50 | time | operator, host, receiver, utility, city |
| 5 Organizational | Contract chain | network owner willing; long contracts | `ledger`, `horizons` | 50 | time | operator, host, receiver, utility, city |
| 5 Organizational | Common ownership | same owner for host and receiver (proposal: university or city as tenant and receiver) | `ledger` | 50 | policy | operator, host, receiver, utility, city |
| 5 Organizational | Data-sharing agreement | meters and sensors | `erf` | 50 | time | operator, host, receiver, utility, city |
| 6 Regulatory | Zoning and permits | use or connection permitted; conditions (RTS 19744) | `grid_headroom`, `zoning_status`, `rezoning_price` | 70 | time, money | city, operator, neighbours, nations |
| 6 Regulatory | Utility regulation | BCUC for heat; EV exempt in BC; Alberta to check | `ev_exemption`, `licence_flag` | 80 | policy | utility, nations, city |
| 6 Regulatory | Grid connection | cap, queue, sharing terms | `grid_headroom`, `lead_time` | 90 | infra, time | utility, operator, ratepayers |
| 6 Regulatory | Noise limits | noise_level ≤ noise_limit | `noise_level`, `noise_limit`, `lf_flag` | 50 | money | neighbours, city, operator |
| 6 Regulatory | Mandates and incentives | move the window | `cfd_score`, `erf` | 50 | policy | city, operator, ratepayers |
| 6 Regulatory | Critical-infrastructure law | access affected (unverified) | `standoff` | 20 | policy | city, operator, public |
| 6 Regulatory | Building code for public uses (proposal) | SUGGESTED (J.B. to accept): the offered floor can hold a public occupancy (assembly or care) beside the data centre, which Vancouver permits label "Bulk Data Storage (F2)": separation, exits and occupant load under the applicable code's multiple-occupancy rules (BCBC/NBC Part 3 — article not yet verified; no code source in the register) | `offerable_area`, `crossing_type` | 20 | policy | city, public, operator |
| 7 Security | Crossing type | pipes/cables/data vs people | `crossing_type` | 20 | money | public, operator |
| 7 Security | Security zones and standoff | public zone possible; 10–45 m standoff | `standoff` | 20 | money | public, operator |
| 7 Security | Rating as proxy | TIA-942 Rated-1 to 4 | `standoff` | 20 | choice | public, operator |
| 7 Security | Information security | metering reveals load | `erf` | 50 | money | public, operator |
| 7 Security | Operational | sharing batteries or generators affects uptime | `backup_hours`, `flexible_load` | 40 | time | public, operator |
| 8 Social | Real need | deprivation and census nearby | `deprivation`, `people_affected` | 0 | choice | neighbours, public, city, future |
| 8 Social | Who benefits and who bears | named, not summed | `ledger`, `deprivation` | 50 | policy | neighbours, public, city, future |
| 8 Social | Residents as a party | present in ledger | `ledger` | 50 | time | neighbours, public, city, future |
| 8 Social | Dependency | receiver dependent on the source | `risk_term`, `horizons` | 70 | money | neighbours, public, city, future |
| 8 Social | Promises enforceable | condition in permit; monitoring | `erf` | 50 | policy | neighbours, public, city, future |
| 8 Social | Affordability | heat cost share ≤ 6% of income | `affordability` | 50 | policy, money | neighbours, future |
| 8 Social | Legibility | site visit | `offerable_area` | 20 | money | public, neighbours |
| 8 Social | Public access safe | crossing type and zones | `crossing_type`, `standoff` | 20 | money | neighbours, public, city, future |
| 8 Social | Community response on record | submissions, proceedings | `deprivation` | 50 | time | neighbours, public, city, future |
| 8 Social | Not a technological fix | judged | `ledger` | 50 | choice | city |
| 9 Environmental | Carbon displaced | both factors reported | `grid_co2`, `hp_electricity`, `generator_co2` | 50 | infra, choice | climate |
| 9 Environmental | Water | WUE, evaporation, source, stress | `evaporation`, `blowdown`, `wue`, `water_behind_electricity` | 50 | money | utility, neighbours, climate |
| 9 Environmental | Embodied carbon | new equipment and networks | `embodied_it`, `embodied_building` | 40 | choice | climate |
| 9 Environmental | Burdens beside | noise, light, air, refrigerants | `noise_level`, `light_at_window`, `generator_nox_pm`, `refrigerant_co2e` | 50 | money | climate, neighbours |
| 10 Experiential | What the edge shows | site visit | `offerable_area`, `visibility` | 20 | money | neighbours, public |
| 10 Experiential | What can be heard | site visit vs noise_level | `noise_level` | 50 | money | neighbours, public |
| 10 Experiential | Light, day and night | site visit vs light_at_window | `light_at_window` | 70 | money | neighbours, public |
| 10 Experiential | Documents and site visit agree | reciprocal only where both agree | `tradeoffs` | 0 | time | public, neighbours, city |
| 10 Experiential | What is visible and what is hidden | visibility ledger per element; documents-only elements flagged | `visibility` | 80 | money, choice | neighbours, public |
| 8 Social | Surveillance as experienced | watched area reaches past the lot line; felt sense of not being able to pause (one person's account, labelled) | `watched_area` | 80 | money, choice | neighbours, public, city, future |
| 4 Economic | Value of flexibility to the grid | flexible MW × utility long-run marginal capacity cost vs operator's cost of offering it | `lrmc_bc`, `flexible_load`, `spare_capacity` | 40 | policy | utility, ratepayers, operator |
| 1 Technical | A sink the place offers | heat can be rejected to or drawn from sewer, water, ground or air within their rules | `sewer_sink`, `surface_water_sink`, `ground`, `free_cooling_hours` | 40 | money, time | operator, utility, nations |
| 2 Spatial | An existing building to reuse | a building nearby suits conversion; its embodied carbon is kept | `existing_building`, `embodied_building` | 20 | money, time | host, operator, climate |
| 4 Economic | Price of power at the site | tariff and allocation rules for the load and the heat pump | `electricity_price`, `grid_headroom` | 90 | policy | operator, utility, ratepayers |
| 4 Economic | Closeness to networks and customers | what the operator gains from being in the city (latency, interconnection, buyers) | `interconnection` | 20 | choice | operator |
| 6 Regulatory | Consultation and rights | which approvals trigger consultation with rights holders; described, never predicted | `consultation` | 40 | time | nations, city, operator |
| 8 Social | People within reach | how many people live within each radius of benefit and burden | `people_affected` | 0 | choice | neighbours, future |
| 8 Social | Work created | operating and construction jobs, and who gets them | `jobs` | 40 | choice | workers, city |
| 10 Experiential | Acoustic cover | how much the place's own noise and zoning absorb the plant | `ambient_cover`, `noise_level` | 50 | choice | neighbours, public |

## Opportunities and the quantities that size them

- **District heat to a network**: `heat_delivered`, `homes_heated`, `window`, `distribution_cost` (weakest 40)
- **Hospital or campus anchor**: `heat_delivered`, `receiver_demand`, `horizons` (weakest 40)
- **Seasonal storage in the ground**: `stored_heat`, `storage_footprint`, `licence_flag` (weakest 50)
- **Aquaculture / insects / algae**: `aquaculture_tonnes`, `insect_check`, `algae_kg`, `heat_temp` (weakest 50)
- **Warming centre, refuge, clean-air room**: `refuge_people`, `clean_air_volume`, `cooling_centre_people`, `backup_hours`, `crossing_type` (weakest 20)
- **Reserved capacity and batteries to the grid**: `spare_capacity`, `flexible_load`, `backup_hours`, `lrmc_bc` (weakest 40)
- **EV charging hub**: `ev_stalls`, `ev_area`, `ev_exemption`, `grid_headroom` (weakest 50)
- **Meanwhile uses on land held for growth**: `offerable_area`, `horizons` (weakest 20)
- **Rainwater, condensate and water reuse**: `rainwater`, `blowdown` (weakest 50)
- **Material bank: copper**: `copper_tonnes`, `ewaste`, `rare_earth` (weakest 50)
- **Distributed servers as heaters**: `distributed_servers_homes`, `servers` (weakest 40)
- **New district with the data centre as heat plant**: `heat_delivered`, `homes_heated`, `heat_density`, `capex_split` (weakest 40)
- **Greenhouse**: `greenhouse_area`, `heat_temp` (weakest 50)
- **Sewage heat as comparator source**: `sewage_heat` (weakest 80)

## Sources by term

source_roles (added 12 Oct 2026): for each source, the term of the formula it supplies, its role (coefficient · bound · proxy · check · site fact · rule · data · method · gap) and its own confidence on the register scale; verified=false marks a placement that is Claude's reading of the coefficient text rather than an explicit tie, for J.B. to confirm. A quantity's own confidence is not recomputed from these: it was set in verification and can sit below its sources where the transfer or an assumption is the weak link (status says why), or above a source used only as a check or bound. The md lists every quantity where own confidence differs from the lowest coefficient-role source, for review.

| quantity | source | supplies | role | conf | placement |
|---|---|---|---|---|---|
| `floor_area` | `edmParcel` | total_gross_area (Edmonton) | data | 80 |  |
| `floor_area` | `bcaExtract` | Gross Building Area, storeys (Vancouver; licensed extract, requested) | data | 80 |  |
| `floor_area` | `vanFoot` | area_m2 × storeys from height (Vancouver fallback) | proxy | 60 |  |
| `floor_area` | `vanEnergyReport` | measured GFA for four listed buildings | check | 80 |  |
| `it_load_outside` | `rvo2018` | density 4.38 MWh/m²·yr (≈500 W/m²) | coefficient | 70 |  |
| `it_load_outside` | `doeFederal` | measured 355–667 W/m² (US federal) | bound | 80 |  |
| `it_load_outside` | `sunLuo2021` | modelled 1,076–5,382 W/m² (large DCs) | bound | 70 |  |
| `it_load_outside` | `lbnl2024` | server and utilisation context | check | 80 | unverified |
| `it_load_claim` | `opClaims` | nameplate MW per site | data | 50 |  |
| `it_load_claim` | `rts19744` | 40 MW applicant figure, 111 E 5th | data | 50 |  |
| `it_load_claim` | `vanPermits` | service upgrades as load traces (no MW stated) | site fact | 80 |  |
| `it_load_actual` | `lbnl2024` | server utilisation 0.21→0.35; capacity utilisation 0.5 | coefficient | 80 |  |
| `it_load_actual` | `fan2007` | average ÷ peak ≈ 0.6 | coefficient | 70 |  |
| `it_load_actual` | `vanEnergyReport` | measured whole-building ceiling (3.7 MW at 555 W Hastings) | bound | 80 |  |
| `it_load_actual` | `dlrQ2_2025` | leased share 96.4% occupancy (Toronto) — occupancy ≠ utilisation | proxy | 40 |  |
| `it_load_actual` | `eqix10k` | cabinet utilisation 81% Americas (power-limited) | proxy | 50 |  |
| `it_load_actual` | `teliaHKI2024` | utilisation 0.20 implied (snapshot) | check | 50 |  |
| `servers` | `lbnl2024` | 600 W per 2-socket server | coefficient | 80 |  |
| `servers` | `lbnlBench` | 1.8–2.5 m² per rack | coefficient | 70 |  |
| `heat_rejected` | `heatPhys` | heat ≈ electricity drawn | rule | 100 |  |
| `heat_rejected` | `lbnl2024` | idle floor 36% of max | coefficient | 80 |  |
| `heat_temp` | `lorenz` | air 25–35 °C; liquid 50–60 °C | coefficient | 70 |  |
| `heat_temp` | `vanPermits` | heat-rejection equipment per site | site fact | 80 |  |
| `heat_temp` | `fieldJB` | equipment seen on site | site fact | 80 |  |
| `liquid_capture` | `lorenz` | all coefficients | coefficient | 70 |  |
| `liquid_capture` | `lbnlCapture` | capture ratios by technology | coefficient | 80 |  |
| `cop` | `lorenz` | COP = η × T_lm,H ÷ (T_lm,H − T_lm,L); η 0.50–0.60 | method | 70 |  |
| `cop` | `dea` | annual COP 3.1 / 3.6 / 4.7 at 1 / 3 / 10 MW | check | 80 |  |
| `cop` | `fjfAars2020` | realised COP 4.5 at 27→15 / 40→75 °C (annual settlement) | check | 80 |  |
| `cop` | `dfKatalog2022` | nominal 4.4 / 4.9; all-in 4.2 incl. pumps; temperatures | coefficient | 70 |  |
| `cop` | `teliaHKI2024` | COP 3.9 snapshot at 20/32 → 75–85 °C | check | 50 |  |
| `cop` | `ulavalCVD` | COP ~7 to 40 °C campus loop | check | 60 |  |
| `cop` | `bytes2heat` | design COP 3.6 at 25/18 → 70/40 °C | check | 60 |  |
| `heat_captured` | `iso30134_6` | boundary and measurement rule | rule | 90 |  |
| `heat_captured` | `euReg2024_1364` | E_REUSE and T_WH reporting fields | rule | 90 |  |
| `heat_captured` | `skatOverskud` | Danish tax metering at heat-pump outlet, 3 × electricity deducted | rule | 90 |  |
| `heat_captured` | `dfKatalog2022` | DC-side vs DH-side heat ≈ 1.3 × | check | 70 |  |
| `heat_captured` | `exergiAR2023` | utility meters on the DH side after the supplier heat pump | rule | 70 |  |
| `heat_delivered` | `lorenz` | all coefficients | coefficient | 70 |  |
| `heat_delivered` | `nivosMantsala` | 20–30 GWh/yr from ~15 MW DC (receiver-limited) | check | 70 |  |
| `heat_delivered` | `bcucC113` | 1.4 MW base-load offer, 94 % of 5,194 MWh demand taken | check | 90 |  |
| `heat_delivered` | `rvoCases2018` | Heerlen 8,900 GJ from 520 kW (source-limited, 54 %) | check | 70 |  |
| `heat_delivered` | `dfKatalog2022` | DH output ≈ 1.3 × DC-side heat at COP 4.2 | check | 70 |  |
| `heat_delivered` | `bytes2heat` | Westville 2.4 GWh/yr from 35 MW (1 %) | check | 60 |  |
| `erf` | `euReg2024_1364` | definition | rule | 90 |  |
| `erf` | `heatPhys` | reported value | check | 50 |  |
| `erf` | `iso30134_6` | definition | rule | 90 |  |
| `erf` | `nrelRSF` | reported value | check | 50 |  |
| `erf` | `teliaHKI2024` | reported value | check | 50 |  |
| `free_cooling_hours` | `ashrae` | inlet envelope 18–27 °C | rule | 90 |  |
| `free_cooling_hours` | `cwec` | hourly outdoor temperature, typical year | data | 80 |  |
| `pue` | `heatPhys` | all coefficients | coefficient | 100 |  |
| `pue` | `uptime2025` | PUE survey averages | check | 50 |  |
| `backup_hours` | `heatPhys` | kWh ÷ load; fuel ÷ burn rate | rule | 100 |  |
| `backup_hours` | `opClaims` | UPS and fuel durations stated by operators | data | 50 |  |
| `rainwater` | `femp` | V = A × R × C method (via CSA B805) | method | 90 | unverified |
| `rainwater` | `eccc` | R: 1,160 mm Vancouver, 423 mm Edmonton | data | 80 |  |
| `grid_co2` | `gridBC` | BC average factor (superseded by NIR series) | data | 80 |  |
| `grid_co2` | `gridAB` | Alberta average factor (superseded by NIR series) | data | 80 |  |
| `grid_co2` | `nir2026` | generation and consumption intensity, both provinces, 1990–2024 | data | 80 |  |
| `grid_co2` | `abEGDF` | Alberta displacement schedule 0.49→0.34 t/MWh | rule | 90 |  |
| `embodied_it` | `dellR760` | 4,177 kg CO2e per server (R760 LCA) | coefficient | 50 |  |
| `embodied_it` | `dell` | R740/R540/R650 footprints and weights | coefficient | 50 |  |
| `noise_level` | `iso9613` | Lp ≈ Lw − 20·log10(r) − 8; full method | method | 90 |  |
| `noise_level` | `daikinCAT624` | scroll chiller Lw 96–100 dBA | coefficient | 50 |  |
| `noise_level` | `traneRTAF` | chiller Lw 94–101 / 91–98 dBA | coefficient | 50 |  |
| `noise_level` | `climavenetaIFX` | screw chiller Lw 99–103 dBA | coefficient | 50 |  |
| `noise_level` | `kelvionLF` | dry cooler Lw (unit total unresolved) | coefficient | 40 |  |
| `noise_level` | `mtuDS2250` | open diesel 98.7 dBA @7 m | coefficient | 50 |  |
| `noise_level` | `catTM9338` | diesel spectra at 7 m | coefficient | 50 |  |
| `noise_level` | `cumminsS1443` | enclosed diesel 73–91 dBA @7 m | coefficient | 50 |  |
| `noise_level` | `stulz` | CRAC 48–62 dBA @2 m | coefficient | 50 |  |
| `noise_level` | `oldsNIA` | filed equipment Lw table (Olds AB) | check | 70 |  |
| `noise_level` | `burlingtonNIA` | filed chiller Lw 92 dBA each (Burlington ON) | check | 70 |  |
| `light_at_window` | `cie150` | E3 zone limits 10 / 2 lx | rule | 90 |  |
| `light_at_window` | `edmBylaw20001` | Edmonton s.5.120(3) qualitative glare rule | rule | 90 |  |
| `refuge_people` | `ess` | 3.5 m² per person; 2 m between beds | coefficient | 90 |  |
| `refuge_people` | `eccc` | cold-need days (≤ −20 °C) | data | 80 |  |
| `cooling_centre_people` | `ess` | room standards | coefficient | 90 | unverified |
| `cooling_centre_people` | `healthCanada2026` | 26 °C indoor limit | rule | 90 |  |
| `cooling_centre_people` | `eccc` | humidex ≥30 days (5.7 / 10.5) | data | 80 |  |
| `receiver_demand` | `energize` | disclosed building energy (opt-in; enforcement paused) | data | 80 |  |
| `receiver_demand` | `edmBench` | Edmonton benchmarking (voluntary; pending) | data | 80 |  |
| `receiver_demand` | `vanEnergyReport` | measured heat intensity of listed hosts (0.24–0.32 GJ/m²) | data | 80 |  |
| `receiver_demand` | `ceud` | commercial intensity 1.11 / 2.01 GJ/m²; household 71.7 / 121.8 GJ | coefficient | 80 |  |
| `receiver_demand` | `statcanHousehold` | household 81.2 / 121.8 GJ (2021, confirms CEUD) | check | 80 |  |
| `receiver_demand` | `nrcanTrends` | space-heat share 61% (superseded by CEUD provincial) | coefficient | 80 |  |
| `receiver_demand` | `receiversBCUC` | Vancouver-region network loads | data | 90 |  |
| `receiver_demand` | `edmReceivers` | Edmonton networks | data | 80 |  |
| `receiver_demand` | `neuConnect` | NEU temperatures | rule | 90 |  |
| `homes_heated` | `ceud` | space heat 33.1 / 76.9 GJ; DHW 19.4 / 28.2 GJ per household | coefficient | 80 |  |
| `homes_heated` | `statcanHousehold` | gas-using share 60% / 90% (displacement target) | coefficient | 80 |  |
| `greenhouse_area` | `iesoGH` | 1.63 GJ/m²·yr (Ontario measured) | coefficient | 80 |  |
| `greenhouse_area` | `manitobaGH` | 2.1 GJ/m²·yr (Manitoba) | coefficient | 80 |  |
| `greenhouse_area` | `rootZone` | root-zone supply ~38 °C | check | 70 |  |
| `greenhouse_area` | `giacomelli` | pipe-rail 82 °C | check | 70 |  |
| `aquaculture_tonnes` | `ayuso2023` | 2.9 kWh/kg (make-up water only) | coefficient | 70 |  |
| `aquaculture_tonnes` | `nistad2020` | measured 5.1–12.8 kWh/kg; heat pump 10–15% | bound | 70 |  |
| `aquaculture_tonnes` | `lukeRAS` | 4.6 kWh/kg trout | coefficient | 50 |  |
| `aquaculture_tonnes` | `ion2022` | 300–600 kWh/m³·yr per tank volume | coefficient | 70 |  |
| `aquaculture_tonnes` | `faoTrout` | trout 9–14 °C | check | 80 |  |
| `aquaculture_tonnes` | `dfoRAS` | BC model at 15 °C | check | 80 |  |
| `insect_check` | `dreyer2021` | mealworm 2.88 kWh/kg | coefficient | 70 |  |
| `insect_check` | `oekoBSF` | BSF 3,404 kWh/t substrate | coefficient | 70 |  |
| `insect_check` | `schon2024` | rearing 27–35 °C | check | 70 |  |
| `ev_stalls` | `wsuEV` | Level 2 7.4–19.2 kW | coefficient | 80 |  |
| `ev_stalls` | `vanDCFC` | DCFC 25–400 kW | coefficient | 90 |  |
| `ev_stalls` | `silber2024` | simultaneity 0.5 | coefficient | 70 |  |
| `ev_area` | `vanParking` | 2.5 × 5.5 m, aisle 6.6 m (Vancouver) | rule | 90 |  |
| `ev_area` | `edmBylaw20001` | 5.5 × 2.6 m, aisle 7.0 m (Edmonton, current) | rule | 90 |  |
| `ev_area` | `edmParking` | superseded Bylaw 12800 (kept for record) | check | 90 |  |
| `sewage_heat` | `wilsonWorrall` | Q × 4.18 × ΔT; not below 6 °C; inflow ≥ 11 °C | method | 70 |  |
| `sewage_heat` | `kwlSewer` | ~45 MW City-wide (Metro Vancouver model) | bound | 70 |  |
| `sewage_heat` | `rts06419` | 2.5 MW base, COP ~3, $59/MWh (SEFC NEU) | check | 80 |  |
| `sewage_heat` | `neuReport` | NEU today: 47 buildings, 71% renewable | check | 80 |  |
| `sewage_heat` | `vanSewer` | sewer type and material near a parcel (no flow) | data | 80 |  |
| `demand_profile` | `stratego` | hourly distribution shape; DHW flat | method | 70 |  |
| `demand_profile` | `cwec` | hourly temperature → HDD16 shares | data | 80 |  |
| `demand_profile` | `vbblHDD` | Vancouver design HDD 2,925 | rule | 90 |  |
| `demand_profile` | `necbHDD` | Edmonton design HDD18 5,120 | rule | 90 |  |
| `demand_profile` | `eccc` | normals HDD18 2,781 / 5,126 / 5,697 | data | 80 |  |
| `demand_profile` | `ceud` | space-heat share 0.46 / 0.63 | coefficient | 80 |  |
| `price_floor` | `hiltunen2020` | capex 0.5–0.65 M€/MW_heat | coefficient | 70 |  |
| `price_floor` | `dea` | capex 1.13 / 0.95 M€/MW; O&M; lifetime 25 yr | coefficient | 80 |  |
| `price_floor` | `fortum` | revealed €11–50/MWh | bound | 50 |  |
| `price_floor` | `exergi` | revealed ~400 SEK/MWh | bound | 50 |  |
| `price_floor` | `rts19744` | implicit $0 + unrecovered capex (111 E 5th) | site fact | 80 |  |
| `price_floor` | `floor` | Canadian operator floor price | gap | 0 |  |
| `price_floor` | `dfKatalog2022` | 215 M DKK / 44 MW; 5,000–7,000 flh | check | 70 |  |
| `price_floor` | `tallaghtD22` | year-1 1,257 flh | check | 80 |  |
| `price_floor` | `engiePA10` | €5.7 M / 6.6 MW | check | 70 |  |
| `price_floor` | `bytes2heat` | ReUseHeat €460k / 0.3 MW | check | 60 |  |
| `price_floor` | `nivosMantsala` | 5,000 flh (2018) | check | 70 |  |
| `price_ceiling` | `fortis` | Vancouver gas ≈ $38.6/MWh heat | coefficient | 90 |  |
| `price_ceiling` | `abgas` | Edmonton gas ≈ $11/MWh heat | coefficient | 90 |  |
| `price_ceiling` | `neu9552` | NEU returned-heat credit $32.59 | coefficient | 90 |  |
| `price_ceiling` | `neuReport` | NEU fuel context | check | 80 |  |
| `price_ceiling` | `dkPriceCap` | Denmark cap 95 DKK/GJ (comparator) | check | 90 |  |
| `price_ceiling` | `edmDDE` | Edmonton DDE business-as-usual pricing rule | rule | 80 |  |
| `price_ceiling` | `ceG526` | Creative Energy tiers $66.6 / $39.6 | coefficient | 90 | unverified |
| `price_ceiling` | `bcucC113` | TELUS Garden customer rate $105–126/MWh (all-in TES) | check | 90 |  |
| `lcoh` | `crf` | CRF and LCoH method | method | 100 |  |
| `lcoh` | `hiltunen2020` | O&M 2,000 €/MW·yr; capex | coefficient | 70 |  |
| `payback` | `crf` | NPV / IRR method | method | 100 |  |
| `payback` | `parssinen` | payback 1.8–5.1 yr by size | check | 70 |  |
| `capex_split` | `energiforsk2020` | who owns heat pump, meter, pipes (Exergi) | data | 70 |  |
| `capex_split` | `exergi` | contract terms 10 + 5 yr | data | 50 | unverified |
| `capex_split` | `fortum` | price by temperature and side | data | 50 | unverified |
| `capex_split` | `rts19744` | applicant pays all (Vancouver condition) | rule | 90 |  |
| `capex_split` | `wahlroos2018` | heat-pump capex 500 €/kW; 12 MW / 5 M€ / 5-yr example | coefficient | 70 |  |
| `capex_split` | `wahlroos2017` | earlier capex basis | check | 70 | unverified |
| `capex_split` | `hiltunen2020` | capex 0.5–0.65 M€/MW | coefficient | 70 |  |
| `capex_split` | `dea` | capex split: heat pump / building / other | coefficient | 80 |  |
| `capex_split` | `fjfAars2020` | utility pays all; heat free | data | 80 |  |
| `capex_split` | `tallaghtD22` | SDCC-owned HP; AWS heat free | data | 80 |  |
| `capex_split` | `engiePA10` | free for 15 years | data | 70 |  |
| `capex_split` | `equinixTR5` | no income sought (operator claim) | data | 50 |  |
| `capex_split` | `bcucC113` | FAES-owned TES; free DC heat; customer rate BC Hydro + 5–10 % | data | 90 |  |
| `capex_split` | `exergiAR2023` | supplier-owned HP; hourly avoided-cost price | data | 70 |  |
| `affordability` | `cusp` | 6% threshold | rule | 70 |  |
| `affordability` | `statcanSHS` | household energy spend $2,535 | data | 80 |  |
| `affordability` | `statcanEP2024` | official threshold and rates | data | 80 |  |
| `build_cost` | `barroso2018` | $9–13/W; occupancy scaling | coefficient | 70 |  |
| `build_cost` | `fan2007` | provisioning context | check | 70 | unverified |
| `build_cost` | `tt2025` | Vancouver 910–1,200 CAD/ft² | coefficient | 50 |  |
| `build_cost` | `vanPermits` | permit values $28.5 M, $18 M | site fact | 80 |  |
| `horizons` | `horizons` | servers ~6; plant 15–25; shell ≤40; network 40–50 | coefficient | 60 |  |
| `horizons` | `vanTax` | improvement ÷ land value flags holding sites | proxy | 80 |  |
| `horizons` | `lbnlLife` | server life | data | 80 |  |
| `horizons` | `tenK_life` | server useful life (filings) | check | 60 |  |
| `horizons` | `barroso2018` | depreciation periods | coefficient | 70 |  |
| `horizons` | `ashraeLife` | plant life | coefficient | 80 |  |
| `horizons` | `en253Life` | pipe life | rule | 80 |  |
| `horizons` | `dlrContracts` | contract terms | data | 50 |  |
| `lead_time` | `bchTransmission` | BC Hydro stage durations | data | 90 |  |
| `lead_time` | `aesoPerf` | AESO stage averages 86 / 134 wk | data | 80 |  |
| `grid_headroom` | `wes` | downtown Vancouver: no room; feeder positions by FY2027; WES 2032 | data | 90 |  |
| `grid_headroom` | `bchIRP2025` | Bill 31 limits 300 + 100 MW; LRMC | rule | 90 |  |
| `grid_headroom` | `cfdPage` | Call for Demand status | data | 80 |  |
| `grid_headroom` | `queue` | BC queue not public | gap | 0 |  |
| `grid_headroom` | `altaReg117` | ≥75 MW, aggregation, tethered/bridged, shed first | rule | 90 |  |
| `grid_headroom` | `aesoList` | 56 data-load projects, 23,549 MW requested | data | 80 |  |
| `grid_headroom` | `aesoLargeLoad` | AESO process pages | data | 80 |  |
| `grid_headroom` | `aeso` | 1,200 MW interim allocation | data | 80 |  |
| `grid_headroom` | `goaGrid` | ~19,565 MW requested (Jul 2026) | data | 80 |  |
| `grid_headroom` | `woodcroft` | EPCOR Woodcroft N-1 firm 76 MVA | data | 80 |  |
| `grid_headroom` | `woodcroftDDR` | same report, deficiency filing | data | 80 |  |
| `grid_headroom` | `enmaxMap` | headroom map format (not our city) | method | 80 |  |
| `grid_headroom` | `oebCCIM` | headroom map format (Ontario) | method | 80 |  |
| `grid_headroom` | `torontoHydroMap` | headroom map format (Toronto) | method | 80 |  |
| `grid_headroom` | `hqZones` | headroom map format (Québec) | method | 80 |  |
| `grid_headroom` | `bcIEAF` | BC allocation | rule | 90 |  |
| `grid_headroom` | `isedPrinciples` | federal principle | rule | 80 |  |
| `standoff` | `goits` | 10 m / 45 m standoff | rule | 90 |  |
| `standoff` | `gcpsg015` | zone hierarchy | rule | 90 |  |
| `standoff` | `tia942` | rating as proxy | proxy | 40 |  |
| `noise_limit` | `bylaw14600` | Edmonton 65 / 50 dBA at the line | rule | 90 |  |
| `noise_limit` | `bylaw6555` | Vancouver zone-pair continuous limits | rule | 90 |  |
| `noise_limit` | `rule012` | AUC Table 1 40–56 dBA night (+10 day) | rule | 90 |  |
| `noise_limit` | `van6555zones` | zone pairs | rule | 90 |  |
| `licence_flag` | `wsa` | BC: licence for open loop (Sch. A item 9) | rule | 90 |  |
| `licence_flag` | `abGuide` | Alberta: approval vs licence; aquifer test tiers | rule | 90 |  |
| `licence_flag` | `abGSHE` | Alberta fact sheet: authorization before construction | rule | 90 |  |
| `licence_flag` | `abDirective` | well and installer requirements | rule | 90 |  |
| `row_cost` | `bylaw4243` | Vancouver $244.97 + $6.53/ft² | rule | 90 |  |
| `row_cost` | `edmULA` | Edmonton ULA permit (fees unstated) | rule | 90 |  |
| `cfd_score` | `cfd` | all coefficients | coefficient | 90 |  |
| `cfd_score` | `bchCfDRfA` | scoring weights | rule | 90 |  |
| `ledger` | `horizons` | who controls what, by horizon | data | 60 |  |
| `ledger` | `rts19744` | applicant bears costs (Vancouver condition) | site fact | 90 |  |
| `ledger` | `g9425` | developer bears costs above $15 M (BCUC G-94-25) | rule | 90 |  |
| `visibility` | `fieldJB` | seen / closed to view / not checked | site fact | 80 |  |
| `visibility` | `vanPermits` | documents-only column | site fact | 80 |  |
| `sewer_sink` | `gvsdd299` | temperature limits for rejection | rule | 90 |  |
| `sewer_sink` | `gvsddUT008` | allocation and cost rule | rule | 90 |  |
| `sewer_sink` | `kwlSewer` | city-wide capacity | bound | 60 |  |
| `sewer_sink` | `neuSewage` | built precedent | check | 80 |  |
| `sewer_sink` | `edm18100` | Edmonton approval gate | rule | 90 |  |
| `surface_water_sink` | `thermalLimits` | thermal limit (binding) | rule | 90 |  |
| `surface_water_sink` | `bcWSRfees` | licence fees | rule | 90 |  |
| `surface_water_sink` | `enwaveDLWC` | built precedent | check | 80 |  |
| `self_gen_rules` | `bchRS2289` | BC caps and price | rule | 90 |  |
| `self_gen_rules` | `abMicrogen` | Alberta caps | rule | 90 |  |
| `self_gen_rules` | `abGridPage` | connection priority | rule | 80 |  |
| `self_gen_rules` | `altaReg117` | regulation text | rule | 90 |  |
| `electricity_price` | `bchLGS` | BC tariffs | rule | 90 |  |
| `electricity_price` | `bcIEAF` | BC allocation and >150 MW rule | rule | 90 |  |
| `electricity_price` | `aesoStats2025` | Alberta energy price | data | 80 |  |
| `electricity_price` | `epcorDASSAS` | Edmonton delivery charges | rule | 90 |  |
| `electricity_price` | `fortisAB2026` | Parkland delivery charges | rule | 90 |  |
| `water_supply` | `vanWater2026` | Vancouver price | rule | 90 |  |
| `water_supply` | `mvReclaimed` | Vancouver reclaimed route | rule | 80 |  |
| `water_supply` | `epcorReclaimed` | Edmonton reclaimed volume | data | 80 |  |
| `existing_building` | `vanPermits` | Vancouver precedent | check | 80 |  |
| `existing_building` | `edmPermits` | Edmonton precedents | check | 80 |  |
| `existing_building` | `vanOfficeConv` | policy context | rule | 90 |  |
| `ambient_cover` | `van6555zones` | Vancouver zone pairs | rule | 90 |  |
| `ambient_cover` | `rule012` | Alberta facilities only | rule | 90 |  |
| `ambient_cover` | `bylaw14600` | Edmonton limits (earlier read, to recheck) | rule | 70 |  |
| `interconnection` | `panFang2025` | urban preference of colocation | data | 70 |  |
| `interconnection` | `malecki2002` | interconnection in cities | data | 70 |  |
| `interconnection` | `satya2017` | latency thresholds | coefficient | 70 |  |
| `interconnection` | `jlarc2024` | exchange point and proximity | data | 80 |  |
| `zoning_status` | `van3575s2` | use definition | rule | 90 |  |
| `zoning_status` | `vanDistricts` | district tables | rule | 90 |  |
| `zoning_status` | `rts19744p4` | I-1A confirmed | rule | 90 |  |
| `zoning_status` | `edm20001` | Edmonton use classes | rule | 90 |  |
| `zoning_status` | `edmLDA26` | City interpretation | data | 70 |  |
| `zoning_status` | `parklandLUB` | Parkland listing | rule | 60 |  |
| `rezoning_price` | `vanRezoneTime` | duration | data | 90 |  |
| `rezoning_price` | `vanFees2026` | application fee | rule | 90 |  |
| `rezoning_price` | `vanDCL` | levy | rule | 90 |  |
| `rezoning_price` | `vanACC` | amenity charge | rule | 90 |  |
| `rezoning_price` | `vanCAC` | CAC exemption | rule | 90 |  |
| `rezoning_price` | `rts19744` | conditions and response | check | 90 |  |
| `rezoning_price` | `edmRezone` | Edmonton process | rule | 90 |  |
| `consultation` | `abConsult` | Alberta triggers | rule | 90 |  |
| `consultation` | `bchCfDRfA` | BC Hydro scoring | rule | 90 |  |
| `construction_time` | `jlarc2024` | construction and grid delay | data | 80 |  |
| `construction_time` | `ieaEnergyAI` | to operation | data | 80 |  |
| `construction_time` | `vanRezoneTime` | rezoning | data | 90 |  |
| `construction_time` | `edmPermits` | local derivation possible | check | 80 |  |

### Own confidence vs sources (for review)

- `floor_area` own 70, lowest coefficient-role source 80 — Edmonton open; Vancouver via licensed BCA extract — field list confirmed from BCA user guide (data/BCA_…User_Guide.pdf); extract itself pending Abacus access; City property-tax report has no area field (schema checked) — fallback is footprint × storeys
- `it_load_outside` own 60, lowest coefficient-role source 70 — confirmed (RVO primary read)
- `servers` own 80, lowest coefficient-role source 70 — in hand
- `heat_captured` own 90, lowest coefficient-role source 70 — in hand (measurement boundary defined 13 Oct 2026)
- `backup_hours` own 90, lowest coefficient-role source 50 — in hand
- `grid_co2` own 90, lowest coefficient-role source 80 — average intensities confirmed from the national inventory (both provinces, same basis, 1990–2024); Alberta displacement schedule from the regulator; BC marginal factor remains unpublished
- `noise_level` own 50, lowest coefficient-role source 40 — method in hand; manufacturer-rated levels (AHRI 370 / ISO 9614 / ISO 8528-10) for a starter set; site schedule still needed
- `light_at_window` own 70, lowest coefficient-role source 90 — standard transferred
- `cooling_centre_people` own 60, lowest coefficient-role source 80 — derived
- `receiver_demand` own 40, lowest coefficient-role source 80 — proxy
- `greenhouse_area` own 60, lowest coefficient-role source 80 — transferred
- `aquaculture_tonnes` own 70, lowest coefficient-role source 50 — confirmed (peer-reviewed full texts; Norwegian/Romanian climates transferred)
- `sewage_heat` own 80, lowest coefficient-role source 70 — flow gap
- `price_floor` own 60, lowest coefficient-role source 70 — derived
- `price_ceiling` own 60, lowest coefficient-role source 80 — derived; Edmonton: pricing principle confirmed from the City report (90), tariff pending
- `payback` own 70, lowest coefficient-role source 100 — in hand
- `capex_split` own 70, lowest coefficient-role source 50 — confirmed (full texts)
- `build_cost` own 70, lowest coefficient-role source 50 — confirmed (textbook, 2010–2017 USD data; local CAD/ft² industry)
- `horizons` own 80, lowest coefficient-role source 50 — primary sources found (13 Oct 2026)
- `lead_time` own 90, lowest coefficient-role source 80 — confirmed
- `grid_headroom` own 90, lowest coefficient-role source 80 — confirmed (regulator and utility documents read in full); MW headroom at a downtown Vancouver parcel is explicitly nil for new feeder positions from fiscal 2027 until the WES is in service (July 2032) — the tool reports this as a hard timing constraint, not a judgement
- `sewer_sink` own 40, lowest coefficient-role source 90 — rules in hand for Vancouver; flow at a parcel and all Edmonton figures are gaps
- `surface_water_sink` own 40, lowest coefficient-role source 90 — rules in hand; capacity is site-specific and unmodelled
- `electricity_price` own 90, lowest coefficient-role source 80 — in hand (2026 tariffs)
- `water_supply` own 70, lowest coefficient-role source 80 — Vancouver in hand; Edmonton partial
- `existing_building` own 20, lowest coefficient-role source 90 — precedents in hand; stock at a parcel needs the parcel tables (N1–N7)
- `ambient_cover` own 60, lowest coefficient-role source 70 — Vancouver in hand; Edmonton to recheck
- `interconnection` own 20, lowest coefficient-role source 70 — rationale sourced; local exchange-point locations a gap
- `zoning_status` own 80, lowest coefficient-role source 60 — in hand; Parkland P/D and Edmonton IH to confirm
- `rezoning_price` own 80, lowest coefficient-role source 90 — Vancouver in hand; Edmonton fees and times pending
- `consultation` own 40, lowest coefficient-role source 90 — Alberta partly in hand; BC to source
- `people_affected` own 0, lowest coefficient-role source 80 — gap: census download pending
- `jobs` own 40, lowest coefficient-role source 60 — transferred coefficient
- `construction_time` own 60, lowest coefficient-role source 80 — in hand (transferred); local derivation possible for Edmonton

## Sources

Source ids added 9–11 Oct are listed first with their citations; ids from the first register (hunts 1–8) follow, with their full reports in sources/01–08.

- `sunLuo2021` — Sun, Luo, Luo, Hong 2021, Energy & Buildings 231:110603 (prototype DC energy models) — https://eta-publications.lbl.gov/publications/prototype-energy-models-data-centers
- `doeFederal` — US DOE case study, three federal data centres, 33/50/62 W/ft² — https://www.energy.gov/sites/prod/files/2014/06/f16/casestudy_3federaldatacenters_0.pdf
- `fan2007` — Fan, Weber, Barroso 2007, Power provisioning for a warehouse-sized computer — https://www.barroso.org/publications/PowerProvisioning.pdf
- `cie150` — CIE 150:2017 obtrusive light limits via ILP GN01/20 — https://mta-sts.brighton-hove.gov.uk/sites/default/files/2021-05/OD65%20ILP-Guidance%20Note%201%202020.pdf
- `healthCanada2026` — Health Canada 2026, upper indoor temperature limits (26 °C) — https://www.canada.ca/en/health-canada/services/publications/healthy-living/guidance-upper-indoor-temperature-limits-protecting-older-adults.html
- `statcanHousehold` — Statistics Canada Table 25-10-0060-01, Household energy consumption, Canada and provinces (2011–2021, biennial) — primary CSV in hand (data/25100060.csv), replaces the NL Statistics mirror
- `nrcanTrends` — NRCan Energy Efficiency Trends 2020, residential: 95.7 GJ/household; space heating 61% — https://oee.rncan-nrcan.gc.ca/publications/statistics/trends/2020/residential.cfm
- `manitobaGH` — Manitoba Agriculture greenhouse energy calculations, 2.1 GJ/m²·yr — https://www.gov.mb.ca/agriculture/crops/crop-management/print,energy-calculations.html
- `iesoGH` — IESO Greenhouse Energy Profile Study 2019, Exhibits 53, 73 — https://ieso.ca/-/media/Files/SaveOnEnergy/Industry/Greenhouse-Energy-Profile-Study.ashx
- `giacomelli` — Giacomelli, greenhouse heating lecture notes (U-values, 82 °C pipe-rail) — https://ceac.arizona.edu/sites/default/files/giacomelli%20heating.pdf
- `rootZone` — UConn/UVM Extension, root-zone heating ~38 °C — https://farm-energy.extension.org/root-zone-heating-systems-for-greenhouses/
- `ntnuRAS` — NTNU, energy use for salmon RAS in Norway, 8.8 kWh/kg — https://www.ntnu.no/bridge/node/22667
- `faoTrout` — FAO rainbow trout fact sheet, 9–14 °C — https://fao.org/fishery/docs/CDrom/aquaculture/I1129m/file/en/en_rainbowtrout.htm
- `dfoRAS` — DFO CSAS SAR 2008/001 closed containment — https://waves-vagues.dfo-mpo.gc.ca/library-bibliotheque/332156.pdf
- `gurreri2023` — Gurreri et al. 2023, Chem. Eng. Trans. 105:229, Chlorella thermoregulation 217 kWh/kgDW — https://www.cetjournal.it/cet/23/105/039.pdf
- `schon2024` — Schøn et al. 2024, J. Insects as Food and Feed, BSF rearing temperatures
- `liu2011` — Liu et al. 2011, The Data Furnace — https://classpages.cselabs.umn.edu/Fall-2021/csci8980-ec/papers/EdgeArch/furnace.pdf
- `wsuEV` — WSU Energy Program, charging speeds and specs — https://www.energy.wsu.edu/documents/1%20Charging%20Speeds%20Ports%20Specs.pdf
- `vanDCFC` — City of Vancouver, EV charging by-law amendment, DCFC 25–400 kW — https://council.vancouver.ca/20210706/documents/r4.pdf
- `silber2024` — Silber, Scheubner, Märtz 2024, IJEPES 155:109540, simultaneity 0.5 — https://publikationen.bibliothek.kit.edu/1000163825
- `vanParking` — Vancouver Parking and Loading Design Supplement, 2.5 × 5.5 m — https://guidelines.vancouver.ca/bulletins/bulletin-parking-loading-design-supplement.pdf
- `edmParking` — Edmonton Zoning Bylaw 12800 s.54.1 (superseded) — https://webdocs.edmonton.ca/zoningbylaw/ZoningBylaw/Part1/Development/54_1_General_On-Site_Parking_and_Loading_Requirements.htm
- `m104` — BC Ministerial Order M104 (2019) and BCUC G-66-19 — https://www.bclaws.gov.bc.ca/civix/document/id/mo/hmo/m0104_2019
- `dea` — Danish Energy Agency, Technology Data for Electricity and District Heating Production, data sheet updated August 2026 (2025 EUR): sheets 40 (compression heat pumps, waste heat 1/3/10 MW; air-source), 41 (electric boilers), 44 (gas boilers), 140 (pit storage) — J.B. download, data/DEA_technology_data_el_dh_2026-08.xlsx; extract data/dea_catalogue_extract.json
- `wilsonWorrall` — Wilson & Worrall 2021, Environ. Sci.: Water Res. Technol. 7:1760 — https://pubs.rsc.org/en/content/articlepdf/2021/ew/d1ew00411e
- `kwlSewer` — KWL for Metro Vancouver 2014, heat-seeking sewer model — https://www.canadianconsultingengineer.com/awards/pdfs/2014/F5_HeatSeekingSewerModel.pdf
- `cda2023` — Copper Development Association 2023, copper in data centres, 20–40 t/MW — https://live.copper.org/copperpowers/reports/copper-in-data-centers-report.pdf
- `stratego` — STRATEGO / Heat Roadmap Europe D2.2 hourly distributions — https://heatroadmap.eu/wp-content/uploads/2018/09/STRATEGO-WP2-Background-Report-2-Hourly-Distributions-1.pdf
- `vbblHDD` — Vancouver Building By-law 2014 Table 1.1.3.1, HDD 2,925 — https://free.bcpublications.ca/civix/document/id/public/vbbl2014/ep001021.1
- `hiltunen2020` — Hiltunen & Syri 2020, Energies 13(14):3551, heat-recovery capex 0.5–0.65 M€/MW — https://www.mdpi.com/1996-1073/13/14/3551
- `wahlroos2017` — Wahlroos et al. 2017, Energy 140:1228 — https://acris.aalto.fi/ws/portalfiles/portal/17305461/1_s2.0_S0360544217314548_main.pdf
- `cusp` — CUSP energy poverty 6% threshold — https://energypoverty.ca/
- `statcanSHS` — StatCan 11-10-0222-01, household energy spend $2,535 (2019) — https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1110022201
- `tt2025` — Turner & Townsend Canada cost table 2025 — https://assets.foleon.com/eu-central-1/de-uploads-7e3kk3/48604/cost_data_table_2025.e9125d36911e.pdf
- `bchTransmission` — BC Hydro transmission load connection timelines — https://app.bchydro.com/accounts-billing/electrical-connections/large-load/transmission.html
- `aesoPerf` — AESO connection process performance, April 2026 — https://www.aeso.ca/assets/Uploads/grid/April-2026-Connection-Process-Performance.pdf
- `goits` — Ontario GO-ITS 25.18 v1.2 — https://files.ontario.ca/tbs-2019-11-14/go-its-25-18-data-centre-physical-security.pdf
- `gcpsg015` — RCMP GCPSG-015 (2024) — https://rcmp.ca/en/lead-security-agency-physical-security/guidance-and-publications/gcpsg-015-2024-guide-application-physical-security-zones
- `tia942` — TIA-942 ratings — https://tiaonline.org/?p=16534
- `bylaw4243` — Vancouver Encroachment By-law 4243 — https://bylaws.vancouver.ca/4243c.pdf
- `edmULA` — Edmonton Utility Line Assignment permit — https://www.edmonton.ca/business_economy/utility-line-assignment-permit
- `daikinCAT624` — Daikin Applied Trailblazer AGZ-E catalogue 624, AHRI 370 sound power table — https://info.hoffman-hoffman.com/hubfs/CAT624.pdf p.18
- `climavenetaIFX` — Mitsubishi Electric / Climaveneta i-FX brochure, ISO 9614 sound power — https://library.mitsubishielectric.co.uk/pdf/download_full/4298
- `kelvionLF` — Kelvion dry cooler selection printout, EN 13487, Lw 94 dBA / 61 dBA @10 m — https://www.resale.de/images/161618957_g_rueckkuehler-lf-pd203t4h-080y06d_2023-04-dn100.pdf
- `mtuDS2250` — mtu 16V4000 DS2250 spec, 98.7 dBA @7 m open (ISO 8528-10) — https://www.mtu-solutions.com/content/dam/mtu/products/power-generation/powergeneration-product-list-latest/231210_PG_Spec_16V4000DS2250G04_2250kW_3D_FC_60Hz_50C.pdf
- `catTM9338` — Caterpillar 3516 performance sheet TM9338, mechanical and exhaust spectra at 7 m — https://powergenenterprises.com/wp-content/uploads/2019/10/GS2888-Caterpillar-3516-GeneratorSet-Performance_Sheet.pdf
- `cumminsS1443` — Cummins S-1443 enclosure sound levels 500–1,000 kW — https://powersuite.cummins.com/PS5/PS5Content/SiteContent/en/Binary_Asset/pdf/Commercial/Diesel/s-1443.pdf
- `stulz` — Stulz CyberAir 3PRO CRAC sound pressure @2 m — https://repository.stulz.com/DFC83F25
- `oldsNIA` — Synapse Olds NIA (OpenCycle, Rev 1, 24 Mar 2026) equipment Lw table — https://www.olds.ca/media/egilzm3p/30732_x0011_tp-31-noise-impact-assessment_000011.pdf Table 1; App. D
- `burlingtonNIA` — Burlington ON data-centre noise study (SS Wilson, May 2026), chillers Lw 92 dBA each — https://www.burlington.ca/en/news/resources/Current-Development-Projects/Ward-4/3110-South-Service/Supporting-Documents/Noise%20and%20Vibration%20Study%20-%202026-05-05.pdf
- `rvo2018` — RVO, Rapportage kansenkaart Warmte uit Datacenters (IF Technology, 7 Nov 2018), RVO-178-1801 — https://www.rvo.nl/sites/default/files/2018/11/Rapportage%20kansenkaart%20warmte%20uit%20datacenters.pdf pp.3–9
- `necbHDD` — NECB 2020 Table C-1 (CBHCC public review copy): Edmonton HDD18 5,120 — https://cbhcc-cchcc.ca/eng/public-review/2023_2/pcfs/necb20_divb_appc_001732.html
- `lukeRAS` — Luke/KAMK webinar 29 Oct 2025 (Laajala): 4.6 GWh/yr heating for 1,000 t/yr rainbow trout — https://kamk.fi/wp-content/uploads/2025/11/ESITYS_Hukkalampo-kalankasvatuksessa-KAMK-Webinar-Pasi-Laajala-Luke-29.10.2025.pdf
- `dreyer2021` — Dreyer et al. 2021, Int J LCA 26:2232, mealworm heating 10.38 MJ/kg — https://link.springer.com/article/10.1007/s11367-021-01980-4
- `oekoBSF` — Öko-Institut for UBA 2022, BSF facility heat 3,404 kWh per tonne input — https://ccacoalition.org/sites/default/files/resources//Oeko-Institut_Black_Soldier_Flies_20220516_final.pdf p.5
- `traneRTAF` — Trane Sintesis Prime RTAF brochure RTAF-SLB001-GB (2020), sound power table — https://www.trane.com/Resources/Partners/a41a3b61-a631-48b1-a8d8-3f25d0783c05/documents/RTAF-SLB001-GB_0620.pdf p.14
- `energiforsk2020` — Energiforsk 2020:681, prosumer contract structures (Öppen Fjärrvärme) — https://energiforsk.se/media/28252/verktygslada-for-prosumtion-inom-fjarrvarme-energiforskrapport-2020-681.pdf pp.12–27
- `dkPriceCap` — Forsyningstilsynet, 2025 surplus-heat price cap 95 DKK/GJ — https://forsyningstilsynet.dk/Media/638660516540345737/Udmeldelse%20af%20prisloft%20for%20overskudsvarme%202025.pdf
- `bcaExtract` — BC Assessment, Non-Residential Inventory Extract External User Guide (field positions 1–48) — https://www.bcassessment.ca/Files/Misc/UserGuide/Non-Residential_Inventory_Extract_External_User_Guide.pdf ; data via UBC Abacus hdl:11272.1/AB2/LAPUAB (licensed)
- `edmBylaw20001` — Edmonton Zoning Bylaw 20001 s.5.80 Table 5.1.3 (stalls) and s.5.120 (lighting, nuisance) — https://zoningbylaw.edmonton.ca/part-5-general-development-regulations/580-parking-access-site-circulation-and-bike-parking
- `rts06419` — City of Vancouver RTS 06419 (2006), SEFC NEU: 2.5 MW sewage heat base, COP ~3, $59/MWh levelized — https://council.vancouver.ca/20061214/documents/csb3b.pdf pp.5, 11
- `dellR760` — Dell PowerEdge R760 LCA (Sphera 2025) and system weight 36.1 kg — https://www.delltechnologies.com/asset/en-us/products/servers/briefs-summaries/poweredge-r760-life-cycle-assessment.pdf
- `lbnlBench` — LBNL data-centre benchmarking #22 (2007): 377 racks in 10,000 ft² — https://eta-publications.lbl.gov/sites/default/files/62716-p5-dc-22-finalf.pdf
- `quebecRejets` — Québec, Valorisation des rejets thermiques: $40 M grant to Île d'Orléans greenhouses on QScale Lévis heat — https://www.quebec.ca/agriculture-environnement-et-ressources-naturelles/energie/reussir-ses-projets-transition-energetique/valorisation-rejets-thermiques/projets-en-cours
- `lygnerud` — Lygnerud & Werner 2018, Energy 151:430–441, Risk assessment of industrial excess heat recovery in district heating systems — full text (J.B. upload)
- `wahlroos2018` — Wahlroos, Pärssinen, Rinne, Syri, Manner 2018, RSER 82:1749–1764, Future views on waste heat utilization — full text (J.B. upload)
- `ayuso2023` — Ayuso-Virgili et al. 2023, Aquacultural Engineering 101:102314, energy demand of a salmon RAS (simulated) — full text (J.B. upload)
- `ion2022` — Ion, Popescu, Coman et al. 2022, Energy Reports 8:11707–11714, Heat requirement in an indoor RAS — full text (J.B. upload)
- `nistad2020` — Nistad 2020, NTNU MSc thesis, Energy use and efficiency in RAS (Norwegian smolt facilities) — full text (J.B. upload)
- `barroso2018` — Barroso, Hölzle, Ranganathan 2018, The Datacenter as a Computer, 3rd ed., ch.6 Modeling Costs — full text (J.B. upload)
- `gwells` — BC GWELLS export (well.csv, lithology.csv, screen.csv, pt_aquifer_parameters.csv), apps.nrs.gov.bc.ca/gwells — J.B. upload
- `dlrQ2_2025` — Digital Realty Q2 2025 Earnings Supplemental, p.24 occupancy analysis (Toronto) — https://s29.q4cdn.com/106493612/files/doc_financials/2025/q2/Digital-Realty-2Q25-Earnings-Supplemental-07-24-2025.pdf
- `enmaxMap` — ENMAX Load Capacity Map, ArcGIS layer Feeder_Load_Capacity_Rev9_20251211 — https://www.enmax.com/system-resources/load-capacity-map
- `oebCCIM` — OEB Centralized Capacity Information Map; Phase 1 letter 17 Oct 2024 EB-2019-0207 App. A — https://www.rds.oeb.ca/CMWebDrawer/Record/868457/File/document
- `torontoHydroMap` — Toronto Hydro Load Capacity Map FAQ — https://www.torontohydro.com/contractors-and-developers/frequently-asked-load-capacity-map-questions
- `hqZones` — Hydro-Québec, Capacités de raccordement de projets industriels au réseau de transport (Dec 2025) — https://pannes.hydroquebec.com/data/projets/presentation-zones-raccordement-industriel.pdf
- `woodcroftDDR` — EPCOR (EDTI) Distribution Deficiency Report, Woodcroft POD, Rev 1, 12 Sep 2025 — https://www.aeso.ca/assets/Uploads/projects/2582/EDTI-Distribution-Deficiency-Report-2025-Updated.pdf
- `aesoLargeLoad` — AESO Large Load Projects page; Data Centre Update Sept 2025; Connection Project List (monthly Excel) — https://www.aeso.ca/grid/connecting-to-the-grid/large-load-projects
- `goaGrid` — Government of Alberta, Data centres: grid (~19,565 MW requested, 30 Jul 2026) — https://www.alberta.ca/datacentres/grid
- `cfdPage` — BC Hydro 2026 Call for Demand page (15 applications, ~800 MW, outcome deferred) — https://app.bchydro.com/accounts-billing/electrical-connections/large-load/emerging-industries-connections.html
- `cwec` — CWEC 2020 edition typical-year files, ECCC Engineering Climate Datasets (collaboration.cmc.ec.gc.ca …/CWEC_FMCCE/CWEC_FMCCE_v_2020): CAN_BC_VANCOUVER-INTL-A_1108395_CWEC.epw; CAN_AB_EDMONTON-INTL-A_3012216_CWEC.epw — J.B. download, in data/
- `eccc` — ECCC Canadian Climate Normals 1991–2020, station data CSV (BC, AB), climate.weather.gc.ca — J.B. download; extract in data/normals_1991_2020_extract.json (Vancouver Intl, Edmonton Airport, Edmonton City)
- `vanTax` — City of Vancouver Open Data, Property tax report (1.55 M rows, 2006–): 30 fields — pid, legal_type, folio, land_coordinate, zoning_district, zoning_classification, lot/plan/block/district_lot, civic numbers, street, postal code, legal lines 1–5, current/previous land and improvement value, tax_assessment_year, year_built, big_improvement_year, tax_levy, neighbourhood_code, report_year, note. No floor-area field (schema confirmed 10 Oct 2026) — https://opendata.vancouver.ca/explore/dataset/property-tax-report/
- `vanFoot` — City of Vancouver Open Data, Building footprints 2009: id, orient8, bldgid, topelev_m, med_slope, baseelev_m, hgt_agl, rooftype, area_m2, avght_m, minht_m, maxht_m, base_m, len, wid, geom, geo_point_2d (schema confirmed 10 Oct 2026); 2009 snapshot — https://opendata.vancouver.ca/explore/dataset/building-footprints-2009/
- `vanPermits` — City of Vancouver Open Data, Issued building permits — seven address exports by J.B., 10 Oct 2026; extract data/vancouver_permits_7sites.json; summary sources/11_vancouver_permits.md
- `vanEnergyReport` — City of Vancouver Annual Energy and Carbon Report (by-law reporting, buildings ≥100,000 ft²), map at https://energycarbonreport.vancouver.ca/map/ — four sites screenshot by J.B. 10 Oct 2026; derivations in data/vancouver_energy_report.json; reporting year 2025 (selector confirmed)
- `vanSewer` — City of Vancouver Open Data, Sewer mains (39,927 segments): effluent_type (Storm / Sanitary / Combined), material, geom, geo_point_2d — no diameter or flow field (schema checked 10 Oct 2026) — https://opendata.vancouver.ca/explore/dataset/sewer-mains/
- `atlasCloud` — Atlas Cloud Enterprises (CSE: AKE, instrument now inactive on MarketScreener) — operator pages https://www.atlasdatacenter.ca/about-atlas-cloud/ and /site-location/: 308 East 5th Ave site, long-term lease, former packing-plant manufacturing building, "first phase of 16 racks"; CSE release 24 Jan 2018 (bitcoin miners; Electric City WA 3 MW) — operator claims
- `aesoList` — AESO Connection Project List, October 2026 Excel (updated 2026-10-09), 313 projects; fields Status, Planning Area, MW Type, Stage, EN1–3 STS/DTS MW, ISD — J.B. download; extract data/aeso_project_list_oct2026_extract.json; field guide https://www.aeso.ca/assets/AESO-Connection-Project-List-Guide-v2.pdf
- `altaReg117` — Data Centre Regulation, Alta Reg 117/2026 (Electric Utilities Act), CanLII, current as posted 2026-06-17, retrieved 2026-10-11 — https://canlii.ca/t/56vg9 ; data/Alta_Reg_117_2026_Data_Centre_Regulation.pdf
- `abEGDF` — Alberta Environment and Protected Areas, Carbon Offset Emission Factors Handbook v3.1 (Feb 2023), v3.2 (Aug 2025), v3.3 (Aug 2026), Tables 1, 2, 5 — J.B. download, data/
- `ceud` — NRCan Comprehensive Energy Use Database, 2023 data: Residential Table 2 (BC; Alberta) and Commercial/Institutional Table 3 (BC & Territories; Alberta) — J.B. download of res_bc_e_2, res_ab_e_2, com_bct_e_3, com_ab_e_3 (data/); extract data/nrcan_ceud_latest.json
- `abDirective` — Alberta Environment and Parks, Water Wells and Ground Source Heat Exchange Systems Directive, 11 Dec 2018 — J.B. download, data/AB_Directive_Water_Wells_GSHE_2018.pdf
- `abGSHE` — Alberta Environment and Protected Areas, Ground Source Heat Exchange Systems fact sheet, 8 Oct 2025 (and Oct 2024) — J.B. download, data/
- `abGuide` — Alberta Environment and Protected Areas, Guide to Groundwater Authorization (2023), §2.2, §6.2, Appendix 2 — J.B. download, data/AB_Guide_to_Groundwater_Authorization_2023.pdf
- `rule012` — AUC Rule 012: Noise Control, consolidated 30 Sep 2024 (74 pp.), Table 1 p.3; Bulletin 2026-03 (17 Apr 2026) — https://media.auc.ab.ca/prd-consultation/sites/2/2023/11/2024-09-30-Rule012.pdf ; J.B. download in data/
- `bchIRP2025` — BC Hydro 2025 Integrated Resource Plan, BCUC Exhibit B-1 (filed 31 Oct 2025, 413 pp.) — https://docs.bcuc.com/documents/proceedings/2025/doc_84202_b-1-bch-2025-irp-application.pdf ; J.B. download, data/BCH_2025_IRP_Exhibit_B-1.pdf
- `wes` — BC Hydro, CPCN application for the West End Substation Project, initial application filed 10 Nov 2025 (BCUC proceeding 1396; decision pending as of 11 Oct 2026; BC Hydro final argument 6 Aug 2026) — https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/corporate/regulatory-planning-documents/regulatory-filings/project/2025-11-10-bch-cpcn-west-end-substation-proj-initial-app.pdf ; J.B. download, data/
- `edmDDE` — City of Edmonton, Integrated Infrastructure Services report IIS02765, Downtown District Energy Initiative – Growth Plan, Utility Committee 23 Jun 2025 (with Utility Committee Report 4 cover; FCS02853 Fiscal Policy C631; Bylaw 20914) — J.B. download, data/Edmonton_IIS02765_DDEI_Growth_Plan_report.pdf; Attachment 4 (rate filing) and Attachment 3 (business case) not yet in hand
- `fieldJB` — J.B. site visits and photographs: Vancouver 8 and 11 Oct 2026 (55 E 7th, 111 E 5th, 333+369 Terminal), Edmonton Oct 2026 (Internet Centre, Qu EDM2, Kyndryl Acheson) — first-hand observation, positions approximate unless confirmed; recorded in sources/12_field_observations.md (from the atlas-chat handoff of 11 Oct)
- `eqix10k` — Equinix Inc., Form 10-K for FY2024 (filed Feb 2025), Item 2 Properties (cabinet capacity, cabinets billed, utilisation, MRR per cabinet by region; expansion table) and Item 7 Capacity Trends — https://www.sec.gov/Archives/edgar/data/1101239/000162828025005126/eqix-20241231.htm ; J.B. download, data/Equinix_10-K_FY2024.pdf
- `nir2026` — ECCC, National Inventory Report 1990–2024 (2026 submission), Part 1 (data/NIR_2026_Part1.pdf) and Annex 7 electricity-intensity workbook, Tables A7-1 (Canada), A7-10 (Alberta), A7-11 (British Columbia) — data/NIR_2026_Annex7_Electricity_Intensity.xlsx; extract data/nir2026_annex7_intensity_extract.json
- `ceG526` — BCUC Order G-5-26, Creative Energy 2026 interim rates: downtown steam $19.53 / 16.53 / 14.63 / 11.60 per M# by tier (≈ $66.6 to $39.6 per MWh) — https://www.ordersdecisions.bcuc.com/bcuc/orders/en/523033/1/document.do
- `fjfAars2020` — Fjernvarme Fyn, Årsberetning 2020, p.9 production table and p.13: 'Varmepumperne tilknyttet Facebook har forbrugt 14.020 MWh el svarende til COP 4,5'; 230 TJ heat (Facebook heat pumps only, first full year) — https://www.fjernvarmefyn.dk/media/1754/fjernvarme_fyn_aarsberetning_2020.pdf
- `fjfAars2124` — Fjernvarme Fyn, Årsberetninger 2021–2024 (heat-pump output combined with Ejby Mølle): 566 / 465 / 767 / 990 TJ; 2023 'virkningsgrad 393 %'; 43 MW at Tietgenbyen (2021) — https://www.fjernvarmefyn.dk/media/ow1hkzhq/aarsberetning_2024_web.pdf and earlier
- `dfKatalog2022` — Dansk Fjernvarme, Inspirationskatalog for store varmepumper 2022, pp.8–11 (Tietgenbyens Varmecentral): nominal 23.9 + 20.7 MW, nominal COP 4.4 / 4.9, source 27→15 °C, DH 40→75 °C, 5,000–7,000 full-load h, average COP 2021–22 4.2 'inklusive cirkulations- og distributionspumper', investment 215 M DKK, DH output ≈ 30 % above DC-side heat — trade-association catalogue written with the utility — https://danskfjernvarme.dk/media/eqbhcqlv/inspirationskatalog-for-store-varmepumper-2022.pdf
- `teliaHKI2024` — Telia, Helsinki Data Center cooling options for AI/GPU loads (operator PDF), pp.4–6: 24 MW IT / 100 MW total; module 5 MW cooling → 6.5 MW heat; snapshot 29 May 2024: 5.65 MW to DH (4.11 waste heat + 1.45 added), COP 3.9, PUE 1.152, ERF 0.75; loop 20 / 32 °C, DH 75–85 °C — OPERATOR CLAIM, one-day point measurement — https://www.telia.fi/dam/jcr:3e4b6c78-a106-4364-9a91-97e36e8a77c1/Telia-Helsinki-Datacenter-cooling-options-for-AI-GPU-loads.pdf
- `nivosMantsala` — Nivos (Mäntsälä utility) articles 2016/2019 and 9 Mar 2022; Sitra case 18 Oct 2019; NIB loan page 21 Oct 2019: DC power demand ~15 MW (phase 1), heat recovery nominal ~6 MW, 4.0 MW heat pump (2015), 20 GWh delivered 2018 = 54 % of town demand, 30 GWh/yr programme figure, exhaust ~37 °C → 80 °C, gas −70 %, DH price −11 % — utility/programme reports — https://nivos.fi/ajankohtaista/paikallisen-datakeskuksen-kanssa-yhteistyossa-luotu-ekosysteemi-lammittaa-mantsalassa/ ; https://www.nib.int/loan/nivos-energia-oy-22822
- `exergiAR2023` — Stockholm Exergi, Års- och hållbarhetsredovisning 2023 p.20 (117 GWh recovered from Stockholm Data Parks and Öppen Fjärrvärme in 2023); Covenant of Mayors case study 2023 (~EUR 190,000 per year per MW delivered); Energiforsk 2020:681 pp.12–17 (75 GWh from data halls 2018; Bahnhof Pionen 600 kW at 68 °C; meter owned by Exergi; hourly avoided-cost price) — https://www.stockholmexergi.se/wp-content/uploads/2024/03/Arsredovisning-2023_SV_240326_sidor.pdf
- `tallaghtD22` — ENABLE DHC D2.2 Tallaght (2025) pp.5–8 and Codema project page: 3,770 MWh distributed in the first year (2023) from a 3 MW heat pump (Heat Works CLG, SDCC-owned); source ~25 °C, network 70/55 °C; heat supplied by AWS free; customer tariff fixed + kWh — https://enabledhc.ambienteitalia.it/wp-content/uploads/2025/06/D2.2-Tallaght.pdf ; https://www.codema.ie/our-work/tallaght-district-heating-scheme/
- `engiePA10` — Engie Solutions / SMIREC press releases 2022 and 21 Jun 2024 (Equinix PA10 → Plaine Commune Énergie): water recovered at 28 °C, up to 6.6 MW, 10,800 MWh/yr projected, €5.7 M investment, heat supplied free for 15 years — utility release — https://engie-solutions.com/sites/default/files/assets/2024-06/cp_mise_en_service_officielle_de_la_sous-station_equinix_vdef_v2.pdf
- `rvoCases2018` — RVO / Nederland ICT, Restwarmte uit datacenters – succesvoorbeelden (Feb 2018) pp.12–15 and Berenschot (Mar 2018): APG Heerlen 520 kW DC, 8,900 GJ extracted, Mijnwater network 16/28 °C, ≈€1.5 M; Eindhoven and Hengelo kW-scale gas heat pumps to 55 °C — https://www.bouwstenen.nl/sites/default/files/uploads/Rapportage-Restwarmte-uit-datacenters.pdf
- `bytes2heat` — DENEFF / IER Stuttgart, Bytes2Heat Best-Practice-Übersicht (2023): Telehouse FRANKY 35 MW DC → Westville 2,400 MWh/yr, 2 × 320 kWth HPs, 30 → 70 °C, 15-yr contract; ReUseHeat Braunschweig 300 kWth, COP 3.6 design, 25/18 → 70/40 °C, 1,750 MWh/yr, €460k; HLRS 270 MWh/yr — https://deneff.org/wp-content/uploads/2023/05/Bytes2Heat-Best-Practice-Uebersicht.pdf
- `bcucC113` — BCUC Order C-1-13 with Reasons (Feb 2013), FortisBC Alternative Energy Services, TELUS Garden thermal energy system, pp.14–19: 'A year round base load of 1,400 kW of heat is available on a 24/7 basis' from the TELUS data centre; development load 5,194 MWh heating / 4,591 MWh cooling; 94 % of heating from recovery, steam peaking; TES capital $7.9 M, waste-heat option $3.2 M vs geo-exchange $6.8 M; 'free waste heat supply from the TELUS Data Centre'; customer rate BC Hydro residential + 5–10 % (G-155-12: $0.105–0.126/kWh 2014–18); annual actual-load report rescinded by G-2-15 — https://www.ordersdecisions.bcuc.com/bcuc/orders/en/118621/1/document.do
- `ulavalCVD` — Université Laval, Étude de cas – Centre de valorisation des données (Sept 2021) pp.9–10, 14–15, 24: Colosse heat recovery 1,150,000 kWh/yr to the campus chilled-water loop, water-to-water heat pumps to 40 °C, COP 'de l'ordre de 7', 130,000 m³ gas/yr saved, PUE 1.28 measured over a year — https://transformation-numerique.ulaval.ca/wp-content/uploads/2023/05/etude-de-cas-centre-de-valorisation-des-donnes-universite-laval-septembre-2021.pdf
- `equinixTR5` — Equinix press release 5 Jun 2024 and blog 24 Apr 2025 (OPERATOR CLAIM); FVB Energy project page: Markham District Energy heat recovery from Equinix TR5, 2 × 2 MWt ammonia heat-recovery chillers at Warden Energy Centre, up to 85 °C, commissioned late 2023, summer heat exceeds demand, 'Equinix does not seek income from the exported heat' — https://fvbenergy.com/astra-portfolio/markham-large-scale-heat-pumps/
- `iso30134_6` — ISO/IEC 30134-6:2021 Energy reuse factor (read in the BIS identical-adoption text, Oct 2023): ERF = E_Reuse ÷ E_DC, 0–1; only energy reused outside the data-centre boundary counts (cl.4); heat pumps outside the boundary 'shall not be included in the calculation' (cl.5); measured 'at the logical boundary of the data centre at the handoff point' by flow and temperature rise (cl.6); Annex A.1.5.3: heat-pump output is not reusable energy as it contains the pump's electricity — https://services.bis.gov.in/tmp/LITD39622436_17102023_1.pdf
- `euReg2024_1364` — Commission Delegated Regulation (EU) 2024/1364 (14 Mar 2024) under EED 2023/1791: data centres ≥ 500 kW IT report E_DC, E_IT (EN 50600-4-2), waste heat reused E_REUSE per EN 50600-4-6 (outside the boundary only, at the handoff), average waste-heat temperature T_WH at the computer-room exchanger; Annex III ERF = E_REUSE ÷ E_DC — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R1364
- `skatOverskud` — Skattestyrelsen, Juridisk vejledning E.A.4.6.10.2–3: electricity in heat pumps recovering surplus heat 'skal måles hver for sig'; the surplus-heat supplier is responsible for metering; heat measured at the heat-pump outlet with 3 × electricity deducted — https://www.tax.dk/jv-2024-1/ea/E_A_4_6_10_3.htm
- `dkPrisloftFAQ` — Forsyningstilsynet FAQ on the surplus-heat price cap: cap applies to plants ≥ 0.25 MW; 'De samlede omkostninger til udnyttelse af overskudsvarme skal holdes under prisloftet' including the heat pump, connection, O&M and any payment to the supplier — https://cdn1.gopublic.dk/forsyningstilsynet/Media/638372891900131751/FAQ%20vedrørende%20prisloft%20på%20overskudsvarme.pdf
- `nrelRSF` — NREL RSF data-centre case study (DOE): 'Average ERE = 0.91 (calculated, not measured)' against 'Average PUE = 1.18 (measured)' — https://www1.eere.energy.gov/buildings/publications/pdfs/rsf/rsf_data_center_case_study.pdf
- `van3575s2` — City of Vancouver Zoning and Development By-law 3575, Section 2 (Jun 2026 consolidation): 'Bulk Data Storage' = 'The use of a wholly enclosed building for the storage of information on operating data servers', in the Transportation and Storage Uses group — https://bylaws.vancouver.ca/zoning/zoning-by-law-section-2.pdf
- `vanDistricts` — Vancouver district schedules (Jun 2026 / Nov 2025): Bulk Data Storage Conditional in I-2 (s.2.2.7, not at ground floor), I-3 sub-area A (s.2.2.11), I-1C (s.2.2.1); not listed in I-1, I-1A, I-1B, I-4, IC-1–3, M-1, M-1A, M-1B, M-2, MC-1/2; Downtown ODP (DD) does not list it; CD-1 sets its own uses — https://bylaws.vancouver.ca/zoning/ (district schedule PDFs)
- `rts19744p4` — RTS 19744 p.4: 'While the site's existing I-1A zoning does not allow data centres, this use is consistent with the RGS and ODP'; DCLs $0 on the applicant's estimate of no net floor area (p.6); pulled from the 23 Jul 2026 hearing, further consultation after the election (Shape Your City) — https://council.vancouver.ca/20260714/documents/rr1.pdf ; https://www.shapeyourcity.ca/111-e-5
- `vanRezoneTime` — City of Vancouver: typical CD-1 rezoning 'Target ~16 weeks to Letter of Response', 'Target ~15 months to decision' (process overview); 'about one year to process (from fee payment to public hearing)' (apply-to-rezone page, Jun 2026) — https://vancouver.ca/files/cov/rezoning-process-overview.pdf
- `vanFees2026` — City of Vancouver 2026 development and building permit fees (effective 1 Jan 2026), Schedule 2 s.3 new CD-1: elsewhere $94,500 + $1,590 per 100 m² (max $343,700) under 8,000 m²; Downtown/Broadway $226,300 + $1,590/100 m²; larger bands to $8,183,200; development permit 'all other uses' conditional $2,530 per 100 m² to 500 m² then $1,570 (max $366,600) — https://vancouver.ca/files/cov/vancouver-development-building-permit-fees.pdf
- `vanDCL` — Vancouver DCL Bulletin (amended 25 Aug 2026), Table 1 rates from 10 Dec 2025: Industrial (I-2, M-1, M-1A, M-1B, M-2) $112.87/m²; Mixed Employment (IC-1–3, I-1, I-1A–C, I-3, I-4) $211.54/m²; no levy where floor area does not increase (s.6.1(a)) — https://guidelines.vancouver.ca/bulletins/bulletin-development-cost-levies.pdf
- `vanACC` — Vancouver Amenity Cost Charges, RTS 18333 (6 Jul 2026) Table 5: Industrial $12.92/m², Mixed-Employment $24.22/m², Commercial $32.29/m², effective 30 Sep 2026, in addition to DCLs — https://council.vancouver.ca/20260714/documents/r4.pdf
- `vanCAC` — Vancouver CAC Policy (amended 30 Sep 2026) s.8.2(c): rezonings submitted after 30 Sep 2026 that are 100 % commercial, industrial and institutional are exempt — https://guidelines.vancouver.ca/policy-community-amenity-contributions-for-rezonings.pdf
- `vanPermitTimes` — City of Vancouver memo to Council, 10 Feb 2025 (3-3-3-1 permitting): Target D 'One year to approve permits for high rise and large-scale projects'; industrial/data-centre times not stated — https://vancouver.ca/files/cov/2025-02-10-council-memo-3-3-3-1-permitting-program-update.pdf
- `edm20001` — Edmonton Zoning Bylaw 20001, s.8.10 use definitions (no 'Data Centre' use); zone use lists: IM 'Major Industrial, limited to those existing as of January 1, 2024', Minor Industrial; BE Minor Industrial in an enclosed building; IH use list UNVERIFIED; s.7.20(3.3.2) unlisted activities 'always considered a Discretionary Use' — https://zoningbylaw.edmonton.ca/part-8-definitions/810-use-definitions
- `edmLDA26` — City of Edmonton engagement page, LDA26-0225 (received 6 Jul 2026): 'an AI Data Centre would be considered a heavy industrial use'; 'A small-scale data centre could be considered as a Minor Industrial Use' where nuisances are minimal and contained on site; rezoning, text amendment and public hearing needed in EETIM — https://engaged.edmonton.ca/eetpdatacentre
- `edmRezone` — City of Edmonton rezoning page: fees paid before acceptance; notice to at least 60 m; public hearing; Direct Control needs 21-day pre-application notice; 'Processing times vary'; fees and durations not stated on the page — https://www.edmonton.ca/business_economy/rezoning
- `parklandLUB` — Parkland County Land Use Bylaw 2025-12 (passed 27 May 2025): 'Data Processing Facility' listed in BI, MI, HI and C districts (permitted vs discretionary UNVERIFIED); s.5.80 regulations not read; Bylaw 2025-23 creates a 'Data Processing and Infrastructure Direct Control District (DC Area 7)' — https://www.parklandcounty.com/media/iault5lh/amended-2025-12-july.pdf
- `abConsult` — Government of Alberta, data centres — Indigenous consultation: a project 'cannot receive its Water Act licence, its public lands disposition or its environmental approval' until consultation is complete; EPEA approval needed for backup generation over 50 MW (EPA fact sheet 20 Jul 2026) — https://www.alberta.ca/datacentres/indigenous
- `gvsddUT008` — Metro Vancouver (GVS&DD) Policy UT-008 Sewage Waste Heat Recovery (rev. 29 Jul 2022): access 'on a first-come first-served basis'; private applicants need a letter of support from the host municipality; heat user pays access costs; no $/GJ — https://metrovancouver.org/services/liquid-waste/Documents/sewage-waste-heat-recovery-policy.pdf
- `gvsdd299` — GVS&DD Sewer Use Bylaw 299, Sch. A 4(b),(c): prohibited 'Any Waste which will raise the temperature of Waste entering any Sewage Facility to 40 degrees Centigrade' and non-domestic waste at 65 °C — https://metrovancouver.org/boards/Bylaws/GVSDD_Bylaw_299_Consolidated.pdf
- `neuSewage` — City of Vancouver, NEU sewage heat recovery: '3.2 megawatts (MW) of sewage heat recovery capacity', expansion 'an additional 6.6 megawatts' (two 3.3 MW heat pumps, end of 2024) — https://vancouver.ca/home-property-development/sewage-heat-recovery-expansion-project.aspx
- `edm18100` — Edmonton Drainage Bylaw 18100 s.5.10(i): non-contact cooling water to the sanitary sewer only with prior written EWSI approval; no EPCOR sewer-heat programme found — https://www.edmonton.ca/residential_neighbourhoods/Bylaws/C18100.pdf
- `bcWSRfees` — BC Water Sustainability Fees, Rentals and Charges Tariff Regulation 37/2016, Sch.1–2: industrial 'cooling' application $1,000; 'heat exchange' annual rental $2.25 per 1,000 m³, minimum $200 — https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/37_2016
- `thermalLimits` — Thermal discharge limits: BC Water Quality Guideline (temperature, 2001) marine '+ or - 1 degree Celsius change from natural ambient background', ≤0.5 °C/h; CCME marine ±1 °C; proposed Burrard Inlet objective 'No further increase in temperature' (Jul 2024); Alberta Surface Water Quality Guidelines 1999 'Not to be increased by more than 3°C above ambient' — https://www2.gov.bc.ca/assets/gov/environment/air-land-water/water/waterquality/water-quality-guidelines/approved-wqgs/temperature-or.pdf
- `enwaveDLWC` — City of Toronto reports (2000; 21 Nov 2019) on Enwave Deep Lake Water Cooling: water drawn at 4 °C, returned at ≤13 °C; 50-year Energy Transfer Agreement to 2054; serves 'over 80 buildings … including data centers' (DLWC Expansion EA 2020) — https://www.toronto.ca/legdocs/mmis/2019/ie/bgrd/backgroundfile-140486.pdf
- `neuConnect` — City of Vancouver NEU Connectivity Guidelines (May 2026 Rev.1): network 'minimum 65°C'; building supply 60 °C year-round; 'a maximum return water temperature of 45°C must be achieved under all conditions'; the NEU does not provide cooling; waste heat from building cooling may be accepted for a bill credit — https://guidelines.vancouver.ca/guidelines-neighbourhood-energy-utility-connectivity-requirements.pdf
- `bchRS2289` — BC Hydro self-generation: RS 1289 net metering closing; from 1 Jul 2026 RS 2289 — export 'up to 100 kW per phase', excess purchased 'at 10 cents per kWh'; community generation up to 2 MW net injection — https://www.bchydro.com/toolbar/about/strategies-plans-regulatory/rate-design/self-generation-rate-updates.html
- `abMicrogen` — Alberta micro-generation: capacity 'that does not exceed five (5) megawatts' (AUC); small (<150 kW) credited at retail, large at hourly wholesale; emissions ≤418 kg/MWh (alberta.ca, 2 Mar 2026) — https://www.alberta.ca/micro-generation
- `abGridPage` — Government of Alberta, data centres — grid: 'projects that pair their demand with dedicated new generation or storage go to the front of the connection line'; interim allocation 1,200 MW, fully allocated — https://www.alberta.ca/datacentres/grid
- `bchLGS` — BC Hydro business rates (Large General Service RS 1600–1611, Revision 26, effective 1 Jul 2026): basic 29.99 ¢/day, demand $13.83/kW, energy 6.79 ¢/kWh; Transmission Service RS 1830 (fiscal 2027): $12.178/kVA, 4.914 ¢/kWh (RS 1823 cancelled 1 Apr 2026) — https://app.bchydro.com/accounts-billing/rates-energy-use/electricity-rates/business-rates.html
- `bcIEAF` — BC Industrial Electricity Allocation Framework (updated 31 Mar 2026): '300MW for AI projects, 100MW for data centre projects'; data centre and AI projects ≥10 MW enter competitive selection; BC news release 2025ECS0044: loads over 150 MW pay 'the full cost of both incremental electricity generation and upgrades' — https://www2.gov.bc.ca/gov/content/industry/electricity-alternative-energy/electricity/industrial-electricity-allocation-framework
- `aesoStats2025` — AESO 2025 Annual Market Statistics, Table 1 p.2: average pool price $43.68/MWh (2025), $62.78 (2024); on-/off-peak 2025 52.15 / 26.74 — https://www.aeso.ca/assets/Annual-Market-Stats-2025.pdf
- `epcorDASSAS` — EPCOR Distribution & Transmission 2026 interim tariffs (effective 1 Jan 2026): DAS-TOUP $67.45678/site/day + $0.13822/kW/day; SAS-TOUP $0.00250/kWh + capacity $0.13497/kW/day + demand $0.28126/kW/day + OR 7.99 % × pool price; DAS-CS (>5,000 kVA) closed to new service — https://www.epcor.com/content/dam/epcor/documents/rates/distribution-access-service-tariffs/2026-01-distribution-access-service-tariff.pdf
- `fortisAB2026` — FortisAlberta rates effective 1 Oct 2026 (AUC 30274-D01-2025): Rate 63 Large General Service (>2,000 kW) transmission $0.214447 + $0.174184 /kW-day + $0.006228/kWh; distribution $27.080602 per contract km-day + $0.015170/kW-day + $15.998863/day — https://www.fortisalberta.com/docs/default-source/default-document-library/rates-options-and-riders-schedules-effective-october1-2026.pdf
- `bocFX2025` — Bank of Canada annual average exchange rates: 1 EUR = 1.5782 CAD (2025), 1.4818 (2024) — https://www.bankofcanada.ca/rates/exchange/annual-average-exchange-rates/
- `uptime2025` — Uptime Institute Global Data Center Survey 2025 (INDUSTRY SURVEY): weighted average PUE 1.54 (n=681); facilities commissioned in the last five years 1.48; North America 1.49 — https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2025.Annual.Survey.Report.pdf
- `lbnlCapture` — Coles & Greenberg 2014 (LBNL), direct-to-chip liquid capture 'The best results ranged from 67 percent to 75 percent', 57–59 % at 30 °C supply; NREL/TP-2C00-62905: RackCDU 'up to 64% of server heat'; Heydari et al. 2024 Appl. Therm. Eng. 239:122122 cold plate 94 %; air-cooled capture: no primary figure — https://escholarship.org/content/qt0g50294h/qt0g50294h.pdf
- `vanWater2026` — City of Vancouver 2026 metered rates (Sch. D): water high season $5.128, low season $4.091, sewer $7.960 per unit (1 unit = 2.83168466 m³); one rate for all metered uses — https://council.vancouver.ca/20251112/documents/spec1a.pdf
- `epcorReclaimed` — EPCOR 2024 Edmonton Wastewater Quality Annual Report p.11: '4,226 ML (3.9%) of reclaimed water provided to industrial customers'; price and customers not stated — https://www.epcor.com/content/dam/epcor/documents/water-quality-reports/2024_edmonton_wastewater-quality_annual-report.pdf
- `mvReclaimed` — Metro Vancouver Interim Reclaimed Water Policy UT-019 (29 Sep 2023): industrial uses case-by-case; no rates — https://metrovancouver.org/boards/Policies/interim-reclaimed-water.pdf
- `vanOfficeConv` — City of Vancouver Downtown Office Conversion Policy (2009): applies to buildings ≥50,000 sq ft of office; addresses residential conversion only — https://guidelines.vancouver.ca/policy-downtown-office-conversion.pdf
- `edmPermits` — City of Edmonton General Building Permits (open data 24uj-dj8v): 'DATA CENT' records incl. office → data centre (2009, 2011), warehouse → data centre (17204 114 Ave NW, 2015, 2020), and a 2021 demolition of a 'Sobeys Data Centre'; occupancy dates for non-residential permits completed since 2024 — https://data.edmonton.ca/d/24uj-dj8v
- `van6555zones` — Vancouver Noise Control By-law 6555 (consol. 14 Jul 2026), continuous sound ss.2.1–2.3: quiet→quiet 55 day / 45 night; activity→quiet 60 / 55; intermediate/activity→other 70 / 65; 'background noise' credited only for commercial premises (s.3.1(b)); no ambient credit for equipment — https://bylaws.vancouver.ca/6555c.PDF
- `lbnlLife` — Shehabi et al. 2024 (LBNL) p.31: average server lifetime 'is 4.4 years, increasing to 5 years in 2020, and to 5.7 years by 2023' — https://climate.mit.edu/sites/default/files/2025-02/lbnl-2024-united-states-data-center-energy-usage-report.pdf
- `tenK_life` — Company filings on server useful life: Microsoft FY2022 four → six years; Alphabet FY2023 servers four → six; Amazon six (2024), a subset back to five (2025, 'increased pace of technology development'); Meta 4–5 → 5.5 years (2025) — SEC filings (OPERATOR FILING)
- `ashraeLife` — ASHRAE Handbook HVAC Applications 2015, ch.37 Table 4 (median service life): centrifugal chiller >25 yr; cooling tower galvanized >22; air-cooled condenser 20; commercial water-to-air heat pump >24; base-mounted pump 20; shell-and-tube heat exchanger 24; transformer 30 — https://handbook.ashrae.org/Handbooks/A15/IP/A15_CH37/a15_ch37_ip.aspx
- `en253Life` — Energiforsk 2022:872 (RISE): 'EN 253 (2019) states that the service life shall be 30 years at 120 °C'; 'If a service life of 50 years is desired, the temperatures must be below 115 °C' (p.32) — https://energiforsk.se/media/31455/liftetime-predictions-and-status-assessments-energiforskrapport-2022-872.pdf
- `jlarc2024` — Virginia JLARC Report 598, Data Centers in Virginia (Dec 2024): building 'usually takes about 12 to 18 months'; campus 'five or more years'; ~50 full-time workers per 250,000 sq ft ('one employee per 5,000 square feet'), about half contract; ~1,500 workers at peak construction; grid additions 12–36 months longer; 'One-third of data centers are currently located near residential areas'; residential bills +$14–37/month — https://jlarc.virginia.gov/pdfs/reports/Rpt598-2.pdf
- `ieaEnergyAI` — IEA, Energy and AI (2025): 'a data centre can be operational in two to three years' — https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai
- `dlrContracts` — Digital Realty 10-K FY2024, Item 1: 0–1 MW colocation 'Contract length generally 2-5 years'; >1 MW 'generally 5-10+ years' (OPERATOR FILING) — https://www.sec.gov/Archives/edgar/data/1297996/000155837025001424/dlr-20241231x10k.htm
- `velkova2019` — Velkova 2019, 'Data centers as impermanent infrastructures', Culture Machine 18: operators 'tend to limit their lifespan to six years only'; Ericsson Vaudreuil QC shut down less than a year after inauguration — https://culturemachine.net/vol-18-the-nature-of-data-centers/data-centers-as-impermanent/
- `census2021DA` — Statistics Canada, Census Profile 2021, 98-401-X2021006 (dissemination areas; BC file 006_BC_CB, Prairies 006_Prairies); DA boundary file 92-169-X — https://www150.statcan.gc.ca/n1/en/catalogue/98-401-X2021006
- `statcanEP2024` — Statistics Canada 46-28-0001 (20 Feb 2024), Estimation of Energy Poverty Rates Using the 2021 Census: energy bills ≥10 % of after-tax income; Canada 5.6 %, BC 4.9 %, Alberta 7.3 %; provincial only. CUSP's tool is no longer at energypoverty.ca (observed 13 Oct 2026) — https://www150.statcan.gc.ca/n1/pub/46-28-0001/2024001/article/00001-eng.htm
- `panFang2025` — Pan Fang & Greenstein 2025, 'Where the cloud rests: the economic geography of data centers', Strategy Science 10(4) (abstract): third-party firms favour urban settings and are 'sensitive to buyer demand for proximity'; cloud providers have 'a lower propensity for locating in urban areas'
- `malecki2002` — Malecki 2002, Economic Geography 78(4):399–424 (abstract): 'a global bias of Internet backbone networks toward world cities', tempered by urban areas 'that serve as interconnection points'
- `satya2017` — Satyanarayanan 2017, 'The Emergence of Edge Computing', Computer (Jan): head-tracked VR needs latencies under 16 ms (p.32); 'End-to-end latency of a few tens of milliseconds is a safe but achievable goal' (p.32)
- `isedPrinciples` — ISED, Canada's Responsible Data Centre Development Principles (15 Sep 2026): local benefits; 'Proponents must pay the costs of connecting and serving their projects'; waste heat recovery a priority technology; no siting criteria
- `bchCfDRfA` — BC Hydro 2026 Call for Demand, Request for Applications: 300 MW AI + 100 MW storage data centres; projects 10–145 MW; scoring 30 % cost, 30 % data sovereignty, 20 % community (incl. brownfield), 10 % environment ('heat recovery ready', PUE, WUE), 10 % First Nations — https://app.bchydro.com/content/dam/BCHydro/customer-portal/documents/accounts-billing/electrical-connections/2026-cfd-request-for-applications.pdf
- `receiversBCUC` — BCUC decisions on Vancouver-region networks: Creative Energy Core steam 971,259 klb forecast, >200 buildings (G-310-21A, 2021); NE False Creek 24 MW peak, 48,100 MWh/yr by 2024 (C-12-15); Sen̓áḵw DES 10,343 kW peak, 11,218 MWh/yr (C-5-23); River District 11.0 → 26.1 MW peak, ~33,600 MWh/yr (C-3-23); SFU Burnaby Mountain 43,787 MWh/yr (G-279-21) — https://www.ordersdecisions.bcuc.com/
- `edmReceivers` — Edmonton receivers: Downtown District Energy (City/EPCOR) Phase 1 three buildings, up to 50 by 2050, heat only in phases 1–2; Blatchford Renewable Energy Utility 13.1 MW heating / 12.3 MW cooling, ambient-temperature sharing network; University of Alberta district energy (capacity not stated) — https://www.edmonton.ca/projects_plans/district-energy ; https://blatchfordutility.ca/about-us/

Source ids from the first register (hunts 1–8; full reports in sources/01–08):

- `abgas` — Alberta DERS gas Oct 2026 $1.458/GJ; ATCO North Mid-Use $1.062/GJ → ≈ $11/MWh heat — https://www.ucahelps.alberta.ca/regulated-rates.aspx
- `aeso` — AESO: 1,200 MW interim limit fully allocated (GLDC 970; Keephills I 230); Edmonton load ≈ 1,400 MW; Phase 2A BYOG 1,600 MW proposed (Jun 2026) — https://www.aeso.ca/grid/connecting-to-the-grid/large-load-projects
- `ashrae` — ASHRAE TC 9.9 inlet 18–27 °C; free-cooling hours by bin from CWEC hourly weather (Formulas sheet)
- `bins` — GP1 Bins sheet: 19 receivers noted; 22 precedents (mostly operator claims); policy levers (Bins sheet)
- `bylaw14600` — Edmonton Bylaw 14600 ss.19–22: 65 dBA day / 50 night at the residential property line; no Leq or continuous-noise provision — https://edmonton.ca/sites/default/files/public-files/C14600.pdf
- `bylaw6555` — Vancouver By-law 6555 (cons. 14 Jul 2026): continuous >3 min in 15; intermediate→quiet 60 day / 50 night; dBC only for amplified music — https://bylaws.vancouver.ca/6555c.PDF
- `cfd` — BC Hydro 2026 Call for Demand RFA: 100 + 300 MW; 10–145 MW per project; ≥10% premium; curtailment; heat-recovery-ready inside the 10% environmental weight — https://app.bchydro.com/content/dam/BCHydro/customer-portal/documents/accounts-billing/electrical-connections/2026-cfd-request-for-applications.pdf
- `cimd` — StatCan Canadian Index of Multiple Deprivation 2021 (DA level); Census 2021 DA boundaries — https://open.canada.ca/data/en/dataset/ec6dc8e7-2fa0-4e49-8969-38541ca0a34d
- `clf` — Carbon Leadership Forum WBLCA benchmark 461 kgCO2e/m² — no data-centre benchmark (matrix MA-20)
- `crf` — CRF = i / (1 − (1+i)^−n) (NREL ATB); LCoH (IEA SHC Task 54); TCO (Barroso ch. 8) (Formulas sheet)
- `dell` — Dell carbon-footprint PDFs: R740 26.3 kg, R540 25.4 kg (2U); R650 21.25 kg (1U); Danczak 2018 rare earths; Graedel 2011 copper — https://i.dell.com/sites/csdocuments/corpcomm_docs/en/carbon-footprint-poweredge-r740.pdf
- `drake` — Drake Landing BTES efficiency measured 0.06 → 0.54 over ten years (Mesquita et al. 2017) — https://proceedings.ises.org/paper/swc2017/swc2017-0033-Mesquita.pdf
- `edmBench` — Edmonton building benchmarking: voluntary; dashboard pending — https://www.edmonton.ca/programs_services/environmental/building-energy-benchmarking-program
- `edmParcel` — Edmonton Property Information: total_gross_area, zoning, year_built per parcel; Rooflines 2019: building height — https://data.edmonton.ca/d/dkk9-cj3x
- `energize` — Energize Vancouver (By-law 13472): ≥4,645 m² report; disclosure opt-in; enforcement paused 21 May 2026 — https://vancouver.ca/files/cov/vancouver-annual-greenhouse-gas-and-energy-limits-by-law-faq.pdf
- `ess` — BC ESS / JIBC group lodging 3.5 m² per person; Edmonton shelter standard 2 m between beds; Health Canada cleaner-air spaces MERV 13+, 2–3 ACH (Formulas sheet)
- `exergi` — Stockholm Exergi: 'indikativt 2 MSEK årligen för 1 MW vid 5 000 timmar' → 400 SEK/MWh; supply normally 68 °C — https://www.stockholmexergi.se/wp-content/uploads/2023/05/Produktblad_tjanster_Oppen-Fjarrvarme.pdf
- `femp` — US DOE FEMP BMP #10: evaporation ≤ Q ÷ h_fg (~1.5 L/kWh); blowdown = E ÷ (C−1); WUE (ISO 30134-9) (Formulas sheet)
- `floor` — Operator floor price at any Canadian site
- `fortis` — FortisBC Rate 3 (1 Jul 2026): variable ≈ $9.12/GJ → ≈ $38.6/MWh heat at 85%; BC carbon tax zero since 1 Apr 2025 — https://www.cdn.fortisbc.com/libraries/docs/default-source/about-us-documents/regulatory-affairs-documents/gas-utility/rateschedule_3.pdf
- `fortum` — Fortum Avoin kaukolämpö purchase prices from 1 May 2026: €11 (≥16.1 °C) to €50/MWh (≤−8 °C) — https://www.fortum.com/fi/lammitys-ja-jaahdytys/yritykset-ja-taloyhtiot/kaukolampoa-yrityksille/avoin-kaukolampo/avoin-kaukolampo-ostohinnat
- `g9425` — BCUC Order G-94-25: Creative Energy's $38.5 M capex schedule rejected; developer bears costs above $15 M (C-1-20) — https://www.ordersdecisions.bcuc.com/bcuc/orders/en/522707/1/document.do
- `gridAB` — Alberta 335 g CO2e/kWh (2024, generation-based), citing NIR 2026 Table A7-10 — https://www.alberta.ca/albertas-greenhouse-gas-emissions-reduction-performance
- `gridBC` — BC 2025 consumption-based grid factor 22.8 tCO2e/GWh (2024: 9.9) — https://www2.gov.bc.ca/gov/content/environment/climate-change/data/electricity
- `heatPhys` — Heat ≈ electricity drawn; Q = V × 1.16 × ΔT (Green Grid WP29); ISO/IEC 30134-6 ERF (Formulas sheet)
- `horizons` — Horizons: servers ~6 yr; plant 15–25; shell up to 40; network 40–50 (handoff rule 7); control in colocation (Greene; Monstadt and Saltzman) (handoff §3)
- `iso9613` — ISO 9613-2:2024; screen Lp ≈ Lw − 20·log10(r) − 8; NoiseModelling (open source) (Formulas sheet)
- `lbnl2024` — Shehabi et al., LBNL 2024 US Data Center Energy Usage Report: 2-socket server 600 W (2023); idle 36%; colocation utilisation 21→35% — https://eta-publications.lbl.gov/publications/2024-lbnl-data-center-energy-usage-report
- `lorenz` — Lorenz COP, η 0.50–0.60 (Reinholdt et al. 2018; Pieper et al. 2020); air 25–35 °C, liquid 50–60 °C (Alissa; Wahlroos) (Formulas sheet)
- `neu9552` — False Creek NEU By-law 9552 Sch. C: energy charge $65.172/MWh; credit for heat returned = 50% → $32.59/MWh — https://bylaws.vancouver.ca/9552c.PDF
- `neuReport` — NEU rates report RTS 18251 (Oct 2025): 47 buildings, 667,000 m²; 71% renewable; gas $2.23/GJ; RNG rider — https://council.vancouver.ca/20251112/documents/spec1d.pdf
- `nonComp` — Non-compensatory method: Munda; Cinelli et al. 2014; Rowley et al. 2012; handoff rule 1 (handoff §3)
- `opClaims` — Operator capacity claims for the 13 sites (Cologix 4 MW VAN4, 2 MW VAN2; eStruxture 2.4 MW; Qu 2.5–3 MW; Hut 8 0.6–1 MW) (sources/01)
- `parssinen` — Pärssinen et al. 2019: heat-pump capex €60 k / €575 k (2 MW) / €5.5 M; DH pays marginal cost − €5/MWh; payback 1.8–5.1 yr — https://acris.aalto.fi/ws/portalfiles/portal/29723097/ELEC_parssinen_et_al_waste_heat_sustainability.pdf
- `persson` — Persson et al. 2019 distribution cost: C1 = 212 €/m, C2 = 4,464 €/m² — https://vbn.aau.dk/ws/files/330989757/1_s2.0_S0360544219306097_main.pdf
- `queue` — BC Hydro Load Interconnection Queue Business Practice v1.5: queue 'not publicly available' — https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/accounts-billing/electrical-connections/business-practice-load-interconnection-queue-mgmt.pdf
- `rts19744` — City of Vancouver RTS 19744 (30 Jun 2026): 111 E 5th, 'up to 40 MW'; cond. 1.11 heat recovery a material condition at the applicant's sole cost; 579 submissions — https://council.vancouver.ca/20260714/documents/rr1.pdf
- `rule9` — Handoff rule 9: diagrammatic only; nothing beyond public planning records (handoff §3)
- `solar` — Vancouver Solar Access Guidelines (2024, am. 2026): fall-equinox shadows 10:00–16:00 (Formulas sheet)
- `woodcroft` — EPCOR Woodcroft Deficiency Report (Rev 1, 12 Sep 2025): N-1 firm 76 MVA; peak 66.2 → 76.3 MVA by 2032 — https://www.aeso.ca/assets/Uploads/projects/2582/EDTI-Distribution-Deficiency-Report-2025-Updated.pdf
- `wsa` — BC Water Sustainability Regulation Sch. A items 4 and 9: licence required for open-loop cooling and heat exchange — https://free.bcpublications.ca/civix/document/id/complete/statreg/36_2016

## Remaining gaps (after two search passes, verification, hunts 9–10)

1. ~~`free_cooling_hours` needs the CWEC hourly file~~ — resolved 10 Oct; approach temperatures remain assumptions.
2. `offerable_area` is judged (20) until the field log and permits fill it per site.
3. ~~BC long-run marginal grid factor: none published; Alberta EGDF v3.1–3.3 values to read~~ — Alberta read (v3.3 Table 1, declining 0.49 → 0.34 t/MWh 2024–2029); BC marginal factor still unpublished.
4. Operator floor price and any Canadian/US heat price paid to a data centre: not public; user session.
5. ~~Canadian summer/winter heat-demand ratio~~ — computed from CWEC (data/cwec_derived.json); building-stock weighting still unapplied.
6. Kelvion dry-cooler sound power: per-fan vs unit unresolved; Trane and Güntner values now available instead.
7. Grid headroom at the parcel: no load-capacity map in Vancouver or Edmonton; tool reports the governing document and 'stop and study' above feeder scale (sources/09).
8. Edmonton groundwater: AWWID export not yet in hand (retrieval guide F6); Vancouver GWELLS is.
9. Equinix regional cabinet utilisation: FY2024 10-K Item 7 to read manually (retrieval guide L2).
