# Check 2, community and full levels: results and fix list (30 Oct 2026)

Sixteen independent runs re-read the **487 sources** behind the community and full levels.

- **Community (308):** 165 confirmed, 132 differ from the source, 11 couldn't be read.
- **Full (179):** 55 confirmed, 43 differ, 81 couldn't be read (mostly web fetches refused and the search limit used up when six runs went at once; worth a slower re-run).

For 128 sources this was the **first** recorded read, so it counts as check 1; their check 2 is still open.

The register logs every result, and each difference is a visible "CHECK 2" (or "CHECK 1") note on its source. **No values the tool shows have changed.** The fixes below are for you to approve.

Each line: source → nodes that use it → what differs.

## Community level

**bartlett2025** (heat_delivered)
- corrected: $65,280/yr natural gas displaced per MW at one gas-price case; $4 and $6/GJ cases also given (?) → State: $65,280/yr at $2.78/GJ; $94,003 at $4.00/GJ; $141,004 at $6.00/GJ. Remove '?'
- overreach: Graduate MSc research project, not peer-reviewed; 100% HX efficiency is an optimistic assumption - keep labelled modelled

**epaRain2013** (rainwater, stormwater_volume)
- corrected: p. 24 (?) → p. 23 (PDF p. 28); remove '?'
- overreach: US 2013 USD costs; needs currency/year conversion for BC/AB; literature review figures, not a rule. Used for stormwater_volume too - source gives costs, not volumes

**iesoGH** (greenhouse_area)
- corrected: Role: 'Ontario measured' → Call it 'Ontario modelled typical UEC (calibrated to utility consumption data)', not measured
- overreach: Modelled typical value presented as measured
- overreach: Ontario climate applied to Vancouver/Edmonton without climate adjustment (?)

**bcCarbonTax2025** (price_ceiling)
- not found: Federal fuel charge set to zero 1 Apr 2025 (CRA FCN16) → Cite CRA FCN16 as its own register entry
- not found: BC output-based pricing for large industry continues (≥10,000 t/yr ?) → Source separately (BC OBPS page) or remove
- not found: Alberta TIER $95/t for 2025; 2026 not verified → Move Alberta TIER to its own primary source (Alberta TIER regulation)
- overreach: Entry bundles three facts the cited page does not contain

**aesoList** (grid_headroom)
- not found: Role: 56 data-load projects, 23,549 MW requested → Recount from the Excel and state the filter; extract gives 40 projects / 19,789 MW DTS (?)
- overreach: Requested MW in a connection queue is not grid headroom; many projects are 'ISD Under Review' (16 of 40) or cancelled

**femp_ct** (reclaimed_makeup, blowdown_recovery)
- not found: EPA WaterSense at Work §6.3 → Cite WaterSense at Work separately with section after reading it
- not found: Role: blowdown recovered → Re-source blowdown recovery, or reword role to 'blowdown reduction'
- overreach: US federal guidance used for BC/AB

**bcRecyclingIT** (afterlife)
- corrected: Current to 3 Feb 2026 → Current to 20 Oct 2026 (saved copy)
- overreach: Role labelled 'rule' but server coverage is an interpretation; a server rack may fall under the 'attached to commercial equipment' exclusion (?)

**alissa2025lca** (heat_temp, embodied_it, embodied_building)
- corrected: Building figures from a Microsoft bill of materials → Microsoft and Tally BOMs, modelled in Tally
- not found: No per-m² value given
- overreach: Role heat_temp ('heat temperature by cooling type', traced from lorenz) not shown to be supported by this paper's GHG LCA (?)
- overreach: Microsoft authors: operator-built LCA, though peer-reviewed

**faoRAS2022** (aquaculture_tonnes)
- corrected: Simple outdoor grow-out ≈€6/kg → ≈€6/kg per year capacity for grow-out-only modules at ≥1,000 t/yr; drop 'simple outdoor'
- overreach: Euro capex per annual kg capacity, European context

**epraBC** (ewaste)
- not found: Loose batteries not accepted (?) → Keep '?'
- not found: Approved primary processors (Dec 2023): FCM (Delta), eCycle (Chilliwack), Quantum, Hi Tech Recyclers (Edmonton → Remove or source; an Edmonton processor in a BC list needs checking
- overreach: Program operator page, not regulation

**wahlroos2017** (capex_split)
- not found: Role: earlier capex basis → Read full text for the capex figure used, or mark '?'
- overreach: Finnish (Espoo) DH system costs used as capex check

**edmULA** (row_cost)
- not found: Role: 2025 fee sheet (one-time fees) → Cite the 2025 fee sheet as its own source
- overreach: Permit page used for fee figures it does not contain; private lines in road ROW also need a ROW Consent/Franchise agreement

**absorption2026** (absorption)
- overreach: Single lab unit (experimental); data-centre heat (often 30–60 °C) is below the 70 °C minimum - absorption cooling only fits hot liquid cooling or boosted heat (?)

**fujiRedundancy** (ups_modules, room_cooling_units, cooling_units)
- overreach: Vendor glossary used as 'rule' for UPS, cooling, generators and transformers; it defines terms but sets no requirement. Which redundancy applies should come from a design standard/tier (e.g. Uptime Ti

**abRainwater2010** (rainwater)
- not found: Alberta Health Public Health Guidelines for Water Reuse and Stormwater Use (Jan 2021) list cooling towers amon → Cite the 2021 Alberta Health guideline as its own register entry and verify it separately.
- overreach: A residential guideline (single-family focus) applied to data-centre rainwater; it covers only toilet/urinal flushing and sub-surface irrigation, not cooling make-up.
- overreach: Cooling-tower end use rests on a different, unread document.

**statcanHeat2011** (receiver_demand)
- corrected: Canada forced air 57%, baseboard 27%, hot-water/steam boiler 5% → Use the table's labels: furnace 57%, electric baseboards 27%, boiler 5%. 'Forced air' and 'hot-water/steam' are interpretations not printed in the table.
- corrected: Alberta forced air 94% → Alberta furnace 94%.
- corrected: (implicit) shares are of all households → Add: excludes households heated by a building-level central system and heat-pump users, so apartments on central boilers are largely outside this table.
- overreach: For receiver_demand, the table excludes centrally heated (building-supplied) dwellings, which are the likely district-heat receivers; do not read 5% boiler as the share of buildings with hydronic heat

**dfoRAS** (aquaculture_tonnes)
- not found: (role aquaculture_tonnes) BC model at 15 °C → Find the source of the 15 °C figure (likely the underlying technical report, not this SAR) or drop it; cite 2,500 t/cycle as the modelled farm size if used.
- overreach: SAR covers saltwater Atlantic salmon systems; it states RAS 'has not been proven for adult salmon'. Any tonnes figure should carry that caveat.

**rts06419** (sewage_heat)
- corrected: Page refs pp.5, 11 → Change to pp.4, 10.
- overreach: Sewage heat source temperature in SEFC is 10–20 °C lifted to 65–90 °C; COP 3 is for that lift, not a general COP.

**aesoStats2025** (demand_profile, electricity_price, peak_relief)
- not found: 'by category' (?) → Drop 'by category'.
- overreach: Register text covers only Table 13 (operating reserves); the electricity_price role ('Alberta energy price') needs the pool-price figures in the same report (2025 average $43.68/MWh, p.2 area), which 

**atcoGas2026** (price_ceiling)
- not found: UCA says rate riders are included in delivery charges → Remove or cite the UCA rate-riders page if read.
- overreach: Low/Mid Use are small (≤8,000 GJ/yr) delivery classes; a data centre or district-heat price ceiling for large buildings may fall under a different ATCO rate class.

**epcorBylaw19626** (water_supply)
- corrected: Five declining blocks → Five bands, four distinct rates (0–100 m³ at $1.6122).
- overreach: 2022–23 rates are out of date for 2026; later years are formula-adjusted (Sch.3), so tool should label as 2022–23 $ or use the current EPCOR rate sheet. Fixed monthly charge and fire protection charge

**epcorDTtc2025** (interconnection, battery)
- corrected: EPCOR D&T terms and conditions (1 Jan 2025) → Cite the 1 Jan 2026 edition (URL .../2026-01-distribution-connection-services-terms-and-conditions.pdf), or re-read the 2025 edition.

**van_floodplain** (flood_exposure)
- corrected: (implicit, role flood_exposure) all polygons are the designated floodplain → Tool should distinguish the FCL 4.6 m designated floodplain (2100, 1 m SLR) from the 'today' and wave-effect layers. Portal metadata (licence, date) not read: re-save the portal pa
- overreach: Saved copy of the portal has no content; provenance of the CSV export (date, licence) not recorded in the register.

**bcFoippaAbroad** (computing_served)
- overreach: Used as a 'BC rule' for computing_served: it binds only public bodies and their service providers, and requires an assessment, not in-Canada storage. Not a rule for private data-centre customers.

**vbbl2025_2425** (stormwater_volume)
- corrected: Sentence (2) exemptions: laneway and small infill, accessory buildings, float homes, temporary buildings → Add marinas and retaining structures; the ≤1000 m² limit applies to both laneway houses and infill.

**rvoCases2018** (heat_delivered)
- corrected: RVO / Nederland ICT, Restwarmte uit datacenters – succesvoorbeelden (Feb 2018) → Author appears to be Berenschot (commissioned; 27 Feb 2018); publisher not named in the document (?). Do not present as an RVO publication without checking.
- corrected: ≈€1.5 M for Heerlen (? €0.8 M installations + ≈€0.7 M network on p.13; €1.5 M is Aalsmeer p.15) → Heerlen: €0.8 M installations in the APG building + ≈€0.7 M network cost attributed to APG. The €1.5 M figure belongs to Aalsmeer. Remove '≈€1.5 M' from Heerlen.
- overreach: 'source-limited, 54 %' is Claude arithmetic (8,900 GJ ÷ (520 kW × 8,760 h)), assumes 8,900 GJ is annual and 520 kW is IT load at full use; label as derived.

**equinixTR5** (capex_split)
- overreach: Operator claim; neither page says who paid for the heat-recovery equipment or whether MDE pays anything.

**monstadt2025** (horizons, ledger)
- overreach: Roles horizons and ledger trace a colocation-control claim to this source, but the readable abstract does not support it. Either read the full text or drop the citation from those roles.

**li2021_dcbtes** (btes)
- corrected: For a 0.9 MW data centre → 0.9 MW is the steady waste-heat supply (campus DC, Norway), not the data centre's rated size.
- corrected: Peer-reviewed design study → Peer-reviewed simulation study of a hypothetical BTES; the BTES was not built.
- overreach: BTES results (96 % waste-heat use, payback >17 yr) rest on assumed storage efficiency; Norwegian campus DH context.

**lbnlXu2007** (ups_modules, generator_sets)
- not found: LBNL-62716 → Mark report number as from the LBNL file name/catalogue (?).
- overreach: Roles are typed 'rule' but this is one 2007 case study; it shows practice at one facility, not a code requirement. Retype as precedent/data.

**whiteDCeel** (opportunity card)
- corrected: By Hirotatsu Honma, Setsuya Bizan Shoten, not White Data Center (?) → Author is 本間弘達 (Honma), Yukiya Bibai Shoten Co. (romanisation of 雪屋媚山商店 ?); not White Data Center. Drop the '?' on authorship.
- overreach: Operator/promoter claim (correctly labelled). Not used by any tool node.

**bytes2heat** (cop, heat_delivered, price_floor)
- corrected: Located PDF p. 11, printed p. 10 → PDF p. 11 = printed p. 11 (the '10' is the footer of the preceding 'Deutschland' divider page).
- overreach: cop role says 'design COP 3.6 at 25/18 -> 70/40 °C' but the page gives only 18-25 °C source and a 70 °C network; the 40 °C return is not printed (register itself says so) - role text should drop '/40'
- overreach: Compilation by DENEFF/IER summarising operator/press material (Quelle [12-24]); figures are reported/planned, not measured - label as secondary/claims.

**uptimeTiers** (spare_capacity, component_space)
- corrected: 'no redundant components' is our summary (?) → Page does not say Tier I lacks redundant components (its Tier I text even lists 'redundant equipment'); summarise instead as 'basic capacity; must shut down completely for maintena
- overreach: N+1 ~ Tier II-III and 2N ~ Tier IV mapping is Claude's interpretation, not the source; must stay labelled as such where used in spare_capacity.
- overreach: Web marketing page of the certifier, not the Tier Standard: Topology document; treat as industry classification, not a code rule.

**giacomelli** (greenhouse_area)
- corrected: 82 °C pipe-rail → Source gives 180 °F in a pipe-loop example (≈82 °C is our conversion); 'pipe-rail' wording not confirmed (?).
- overreach: Course slides (teaching example), not a design standard; 180 °F is one worked example, not a requirement - fine as a 'check', not as a rule.

**blatchfordBP2021** (sewage_heat, capex_split, ledger)
- corrected: DESS uses geoexchange, sewer heat exchange and solar (p. 1) → Page is printed p. 2 (PDF p. 3); there is no printed p. 1 (PDF p. 2 is the contents).
- overreach: Plan is forward-looking (2021); the 2023 sewer energy centre date and 123,500 m² are forecasts. Plan also gives $45.2 M estimated cost for the Sewer Heat Recovery Energy Centre (2022-23) - relevant to

**hiltunen2020** (price_floor, lcoh, capex_split)
- corrected: the 0.5-0.65 range is not printed by it → The range is not stated as a range, but both endpoints (500 and 650 €/kW) are printed as cited values.
- corrected: not printed by Wahlroos 2018, which gives 5 MEUR for 12 MW (≈0.42) → Wahlroos does print 500 EUR/kWheat (0.5 M€/MW); 0.42 is our division of the 5 MEUR 'extra investment' by 12 MW DH output.
- not found: tool now uses 0.42-0.6 → Consider 0.5-0.65 (printed values) or label 0.42 as derived.
- overreach: 0.6 M€/MW is a Finnish 2020 modelling assumption in euros; converting to CAD and Canadian costs needs its own source.

**altaReg117** (grid_headroom, self_gen_rules)
- corrected: King's Printer text current as of 9 Jun 2026 → Version posted 17 Jun 2026; currency checked against King's Printer 30 Sep 2026 (no amendments). '9 Jun 2026' not found in the file.
- corrected: CanLII copy and retrieval date are not in the saved file (?) → The saved file IS the CanLII copy, stable link canlii.ca/t/56vg9, retrieved 11 Oct 2026.
- overreach: 75 MW is a floor the ISO may lower (s.2(2)); tool should not treat 75 MW as fixed.
- overreach: Threshold is maximum demand directly from the transmission system, not IT load.

**nrel_rooftop2016** (pv_roof)
- overreach: Register gives no figures, so the values pv_roof uses (e.g. 160 W/m², GCR 0.70 flat roofs, 66% suitable large-building roof) are not indexed - add them. US lidar sample; suitability shares are US-samp

**cfr2022_140** (hvo_swap)
- not found: Applies in Alberta and BC → Say 'federal regulation (applies Canada-wide, incl. AB and BC) - our reading'.
- not found: ECCC announced targeted amendments 9 Nov 2025 → Needs its own source entry.
- overreach: CFR obligations fall on primary suppliers (producers/importers) of gasoline and diesel, not on a data centre buying fuel; hvo_swap should use it only for CI benchmarks, not as a rule binding the opera

**abElectronicsReg** (afterlife)
- not found: URL https://www.albertarecycling.ca/programs/electronics/ → Cite open.alberta.ca/publications/2004_094 (or the King's Printer text) instead of the ARMA programme page.
- overreach: Description does not mention servers or commercial equipment; whether data-centre servers are designated depends on the regulation schedule (not read) - see armaElectronics.

**bjCall2025** (clean_power_price)
- overreach: Role 'only BC Hydro signs' used as a 'rule' rests on a law-firm blog (secondary) about one procurement; the post says nothing about third parties or data centres buying power. Cite BC Hydro's RFP / sp

**vertivLi5** (battery_cabinets)
- corrected: 5 min class → '5 min end-of-life runtime'.
- corrected: UL 1973, UL 9540A, CSA mark → UL 1973 via CSA mark; UL 9540A is a test method (tested), not a listing.
- overreach: Vendor data sheet - label as manufacturer claim. 263 kW per cabinet for 5 min at end of life; cabinet count should use EOL rating, not BOL.

**lbnl2024** (it_load_outside, it_load_actual, servers)
- corrected: Location: Executive Summary, p. 7 → Executive Summary, p. 6 (PDF p. 7)
- overreach: The 50% 'capacity utilization' is an undefined modelling assumption used to convert TWh to GW; as a coefficient for it_load_actual / it_load_share it must be labelled an assumption
- overreach: Server utilisation 21%->35% is colocation only; hyperscale is 45%->50%, internal 11%->20% (p. 27)

**bchEIC2026** (flexible_load)
- corrected: Feasibility results delivered 24 Aug → Feasibility results scheduled for 24 Aug (target date; delivery not confirmed)
- overreach: Used by flexible_load but the page says nothing about flexible or interruptible load; supports grid-allocation context only

**liu2011** (distributed_servers_homes)
- overreach: Role 'all coefficients' for distributed_servers_homes: paper's figures are 2011 US assumptions (e.g. 'Dell PowerEdge 1850 consumes 350 W', US $0.10/kWh residential, 5 US climate zones) by Microsoft Re

**cfsPlus** (ewaste)
- not found: Recycles servers, switches, UPSs and lead batteries → Say: accepts functioning UPS (with battery) and gigabit switches for reuse; recycling claim unsupported - drop
- overreach: Program aims at reuse for schools/non-profits with minimum specs; not a route for bulk data-centre decommissioning volumes - label as claim/possible channel, not capacity

**tallaghtD22** (price_floor, capex_split)
- corrected: Network 70/55 °C → Network design 70/50 °C; operating about 70/55 °C
- corrected: AWS supplies low-grade waste heat → Attribute Amazon to the Codema page; drop 'low-grade' unless sourced
- overreach: 1,257 full-load hours is a derived figure from a ramp-up year (Phase 1); not a steady-state utilisation

**bcucG5026** (price_ceiling)
- not found: Letters L-9-25 (12 Jun 2025) and L-27-25 (11 Sep 2025): unchanged at $2.230 → Cite the two letters separately (unverified here)
- overreach: Used by price_ceiling: CCRC is the commodity component only; it excludes delivery, storage/transport and carbon charges - a gas-heat ceiling needs the full rate, and the CCRC changes quarterly

**lbnlLife** (horizons, futures)
- corrected: Page 31 → p. 30
- overreach: Lifetime is a US installed-base modelling assumption; label as such

**wes** (grid_headroom)
- not found: BCUC proceeding 1396 → Keep '?' or cite the BCUC proceeding page
- not found: Decision pending as of 11 Oct 2026 → Keep '?'
- not found: BC Hydro final argument 6 Aug 2026 → Keep '?' until the BCUC exhibit is cited
- overreach: In-service 2032 is BC Hydro's conditional target, not an approved date; interim measures (loading feeders above guidelines, transfer-ties) mean 'no room' is not absolute

**bchIRP2025** (grid_headroom, lrmc_bc)
- overreach: grid_headroom uses the 300 + 100 MW as a 'rule', but the IRP only reports a news release about a Bill 'tabled' 20 Oct 2025 (footnote 17); cite the enacted Bill 31 / regulation for the rule

**nrel_bench2023** (pv_roof, pv_cost)
- corrected: Ramasamy et al., U.S. Solar PV System and Energy Storage Cost Benchmarks Q1 2023, NREL/TP-7A40-87303 → Use the full title and add date September 2023
- overreach: pv_roof / pv_cost: the report states 'we do not model a commercial rooftop system' for Q1 2023; nearest benchmark is a 3 MWdc ground-mounted community solar system (MSP $1.49/Wdc, MMP $1.76/Wdc) - not
- overreach: US 2023 USD costs; needs currency/year and Canadian adjustment

**nfpa855_2026** (battery, component_space)
- corrected: Remote outdoor installations more than 100 ft (30.5 m) from exposures (9.5.1) → Cite 9.4.2(1) (and 9.6.2.5: 9.5.1 does not apply to remote outdoor ESS)
- not found: Not cited by any BC or Alberta code (see nfpa855tia) - reference only
- overreach: US standard, not adopted in BC/AB per register; must stay 'reference only' and not be applied as a rule in battery/component_space

**bcLCFtech2023** (hvo_swap)
- corrected: ? regulations current to 20 Oct 2026 → Current to 27 Oct 2026 (as read 30 Oct 2026)
- overreach: hvo_swap applies LCFS to data-centre generator diesel, but the page says requirements 'apply to transportation and the following prescribed purposes: Cargo handling equipment at ports, Ground support 

**meyer2013** (absorption)
- corrected: Preprint, not peer-reviewed → Published in ISC 2013 proceedings (LNCS 7905, pp. 383–394); cite that
- overreach: Used by 'absorption' but the source is an adsorption chiller (one model, LTC 09); not an absorption-chiller threshold

**bchRAS2011** (clean_power_price)
- overreach: Letter is BC Hydro's application, not the BCUC decision; the suspension itself needs the BCUC order

**codemaTallaght** (opportunity card)
- corrected: Almost 1,100 t CO2 saved in 2023 → 1,100 t CO2 in the first year of operation; over 1,400 t in 2025 (no 'almost', no '2023')
- overreach: Codema is the scheme's energy agency partner; CO2 savings are project claims

**dlrQ2_2025** (it_load_actual)
- corrected: role label 'leased share' / occupancy ≠ utilisation → Call it 'occupancy (operator-defined; not strictly leased area, not IT utilisation)'; label as OPERATOR FILING claim.
- overreach: Occupancy is an operator-defined metric partly based on power/support space, not 'leased share'; using it as it_load_actual proxy needs that caveat
- overreach: Toronto, not Vancouver/Edmonton (proxy only)

**dellR760** (embodied_it)
- corrected: role: 4,177 kg CO2e per server = embodied → 4,177 kg is US full life cycle incl. use phase; embodied (manufacturing) is only ≈10-15% (≈420-630 kg ?). EU total 2,896 kg. Do not use 4,177 as embodied.
- overreach: Total life-cycle GWP (incl. US-grid use phase) used as embodied carbon - double counts operational emissions
- overreach: Vendor LCA = operator claim; one 'market configuration' (2× Xeon Silver 4410Y, 2 SSD)

**edmReceivers** (receiver_demand)
- not found: University of Alberta district energy (not on these pages ?) → Needs its own source or remove.
- overreach: receiver_demand 'data' role: pages give building counts and added capacity, not heat demand in MWh

**abGreenhouse2017** (greenhouse_area)
- corrected: surveyed existing operations, not new build → Existing operations, valued at replacement cost; totals include land (cucumber land $11.12/m²).
- overreach: Investment figures include land and machinery, not structure only
- overreach: Small samples (e.g. 9 cucumber growers); 2017 dollars

**vanParking** (ev_area)
- corrected: Vancouver Parking and Loading Design Supplement → Use the document's title and amendment date.
- overreach: Supplement is a design guideline; the binding stall size is in Parking By-law 6059 s.4
- overreach: No EV-specific provisions in this document (used for ev_area)

**blatchfordSHX2026** (sewage_heat)
- not found: 'combined' sewers (?) → Drop 'combined' or source it.
- not found: EPCOR Bylaw 19627 non-contact cooling water into sanitary sewers with written approval (?) → Needs the bylaw text.
- overreach: Utility page statements are operator claims about its own plans

**call2recycle** (ewaste)
- not found: 'sealed lead acid' (?) → Keep '?' or drop.
- not found: larger UPS strings likely outside the program (inference) → Keep labelled as inference.
- not found: Alberta battery EPR from 1 Apr 2025 (?) → Needs Alberta regulation as source.
- overreach: Household program; not a disposal route for data-centre UPS batteries

**ceG526** (price_ceiling)
- corrected: ≈ $66.6 to $39.6 per MWh (our conversion) → State the conversion factor used (0.293 MWh/M#?) or use the order's own 50 M# = 17 MWh equivalence; hot-water tiers are given directly ($56.28-$33.44/MWh).
- overreach: Interim rates, subject to refund
- overreach: Steam retail rate used as price_ceiling for waste heat is an inference

**tenK_life** (horizons)
- not found: Amazon six years (2024) → Cite exact filing and section.
- not found: Meta prior range 4-5 (?) → Keep '?' or cite FY2024 10-K.
- overreach: Accounting depreciation lives are operator filings, not physical service life (label OPERATOR FILING - done)

**enmaxMap** (grid_headroom)
- not found: ArcGIS layer Feeder_Load_Capacity_Rev9_20251211 → Keep '?'; record a screenshot or layer metadata.
- overreach: Calgary utility; method/format reference only (as labelled)

**bcIEAF** (grid_headroom, electricity_price)
- corrected: 2025ECS0044: loads over 150 MW pay 'the full cost of both incremental electricity generation and upgrades' → Quote in full: upgrades to bulk (500 kV) transmission; it describes the current industrial tariff in a North Coast Transmission Line backgrounder (20 Oct 2025); data centres not na
- overreach: 150 MW rule is stated for BC Hydro's industrial tariff in an NCTL context; applying it to a Vancouver data centre is an inference
- overreach: Allocation is a two-year call, not a permanent headroom figure

**vanACC** (rezoning_price)
- overreach: Rates are recommendations in a staff report, not an enacted by-law; used as 'rule'
- overreach: ACC applies to most development citywide, not only rezoning (role 'rezoning_price')

**vanRoofBulletin2022** (pv_roof)
- corrected: effective 3 Feb 2009, amended 14 Nov 2022 → Add the 26 Aug 2019 amendment.
- corrected: no figure or edge setback stated → Say 'no height figure or setback; only a descriptive 1/3 width / 1/10 roof area remark'.
- overreach: Discretionary, not as-of-right; tool should not assume extra height is granted

**cec2024ESS** (battery, battery_code_path)
- overreach: Section 64 rules cannot be independently verified (licensed copy); they are electrical-installation rules - fire code (NFC/BCFC) ESS provisions not covered
- overreach: UPS batteries excluded from ESS definition, so Section 64 ESS rules may not govern a data centre's UPS

**bcRLCF007_2024** (hvo_swap)
- corrected: renewable share 31.2%; total diesel 2,610.2; renewable 1,172.8; basis not stated (?) → Basis = renewable ÷ (non-exempt fossil + renewable diesel), checker arithmetic; 2,610.2 is fossil-side diesel, not the pool.
- overreach: Renewable diesel pool share includes biodiesel and co-processed; HDRD CI is a BC-supply weighted average, not a product spec

**mfrAdiabatic** (component_space, cooling_units)
- corrected: about 0.7-1.4 MW per unit (?); role 0.67-1.37 MW → Largest 12 m unit ≈1.31 MW nominal (dry rating); source of 0.67/1.37 not found.
- not found: 2-10.6 t (other makers ?) → Source the range or use EVAPCO figures.
- overreach: Manufacturer catalogue = claim; nominal capacity is dry-rating at US design temps, not Vancouver/Edmonton adiabatic duty

**brc2025** (clean_power_price)
- corrected: corporate deals 'virtually disappeared' in 2025 → Say Alberta corporate deals (?), p.4, Deal Tracker as of Q4 2025.
- overreach: Industry association report (label as industry)

**bchDEP2025** (grid_refund)
- corrected: BC Hydro invests up to $1M under 1 MVA; $1M per MVA pro-rated by kVA to max $10M over 1 MVA → Specify it is the system-improvement investment (customer pays the balance), separate from the extension contribution allowance.
- overreach: Distribution extension policy; a large data centre on transmission service would fall outside it (?)
- overreach: Only projects invoiced after 5 Jul 2025

**fjfAars2020** (cop, capex_split)
- not found: Role cop: realised COP 4.5 at 27→15 / 40→75 °C → Cite the temperatures from their own source; this report supports COP 4.5 only (≈230 TJ ÷ 50.5 TJ el = 4.56).
- not found: Role capex_split: utility pays all; heat free → Source the capex split / free heat from another document or drop the link to fjfAars2020.
- overreach: Temperatures 27→15 / 40→75 °C attached to this source are not in it.
- overreach: capex_split 'utility pays all; heat free' is not supported by this report.

**neuConnect** (receiver_demand)
- corrected: building supply 60 °C at design conditions ('year-round' is our word ?) → 'year-round' is the source's own word; remove the '?'.
- overreach: Temperatures are customer-building (heat-receiving) requirements; using them as a 'rule' for what a data centre must deliver to the NEU is an inference. Acceptance of waste heat is case-by-case ('may 

**aesoAMS2025wind** (clean_power_price)
- corrected: p. 23: wind 46.9% below average pool price; solar 17.4% below → Change p. 23 to p. 22.

**isedPrinciples** (grid_headroom)
- not found: dated 3 Sep 2026 ? (date not printed on saved page) → Cite 'Date modified: 2026-10-20'; 3 Sep 2026 needs its own source.
- overreach: Used as a 'rule' for grid_headroom, but it is a voluntary national framework with company signatories (page lists 'Signatories'), not a regulation; label as federal principle/policy, not a binding rul

**nrelATB_crf** (crf, lcoh, payback)
- corrected: edition and page not named; no URL → Add URL and edition (ATB 2024).
- overreach: ATB applies CRF with real WACC and t = 30-yr default cost-recovery period; lcoh/payback must state their own i and n.

**ashraeLife** (horizons, futures)
- corrected: Table 4 (Akalin): commercial water-to-air heat pump >24 → Write 'commercial water-to-air heat pump >24 (Abramson 2005; Akalin 1978: 19)'.
- overreach: Median service lives are survey medians for commercial buildings, not design lives for data-centre plant; Akalin values are flagged by ASHRAE itself as possibly outdated.

**nbcAB2023** (hall_layout, electrical_room, hr_plant_room)
- corrected: 3.3.1.9.(1) corridors 1 100 mm → Say 'public corridors 1 100 mm'; width of non-public corridors is set elsewhere (article not checked ?).
- corrected: same as NBC 2020 for these articles → Say 'same requirements; references changed to the Alberta Electrical Code Regulation and NFC(AE)'.
- overreach: 1 100 mm applies to public corridors; data-hall service corridors may not be public corridors — check occupancy classification before applying.
- overreach: Travel distance (b) 40 m applies only to business occupancy; a data centre's major occupancy (?) must be fixed first.

**vanI2Ground** (offerable_area)
- not found: I-3 s.2.2.11 (sub-area A) and FC-2 s.2.2.4 carry the same rule → Save and read the I-3 and FC-2 schedules before relying on those clauses.
- overreach: Rule role is valid for I-2; applying to I-3/FC-2 sites is unverified.

**nistad2020** (aquaculture_tonnes)
- corrected: Heat pump 10–15% → Say: heat pump ~10% (thesis model) / 15% (cited literature case); measured facilities 6–21% (Table 11).
- overreach: Smolt (juvenile) facilities, not grow-out; use as a bound for aquaculture_tonnes only if the tool's fish stage matches.

**edmDDE** (price_ceiling)
- not found: with Utility Committee Report 4 cover → Drop or confirm the cover sheet ?
- overreach: BAU is a revenue principle 'on average', set by Policy C631 for the DDE utility only; not a general Edmonton price cap.

**epcorDAS2026** (lcoh)
- overreach: Interim rates; riders (e.g. Rider DJ interim adjustment) excluded.

**vanOfficeConv** (existing_building)
- corrected: ≥50,000 sq ft office in the DODP areas → Name the areas: DODP Areas C2, C3, G, H, L1, L2, M and N (not all DODP).
- overreach: Policy only triggers a discretionary report to Council for office-to-residential; it is not a rule for office-to-data-centre conversion. Role should be context, not rule.

**ftaVibration** (vibration_target)
- corrected: 65 vibration-sensitive rooms → Use source wording; 65 VdB applies at all event frequencies.
- overreach: US transit-project impact criteria for receivers, not a Canadian rule; apply to data-centre plant vibration only as a reference coefficient, labelled.

**aesoP2Aupd2026** (flexible_load)
- corrected: Deck 'BYOG Process Proposal' stakeholder session, 18 Jun 2026 ('updated 24 Jun' from file name ?) → Title 'Large Load Integration Phase 2A BYOG Process Update'; session 24 Jun 2026; posted 18 Jun, updated 24 Jun (page states it; remove '?').
- corrected: Final process planned late July–early August 2026 → Add: delayed; AESO now says 'this fall' (8 Sep 2026 update).
- overreach: Proposal-stage system-operator material; load-management priority is proposed, not a rule ?

**mfrBESS** (storage_footprint, battery, component_space)
- corrected: ≈42 t (? one check reads ~43 t on StarCharge) → Use ≈43 t (StarCharge); drop '?'.
- overreach: Manufacturer claims; labelled as such.

**crozier2025** (workload_control)
- corrected: Operators surveyed unwilling to offer UPS for ancillary services → Say: one surveyed owner (China study cited in review) unwilling to use UPS for ancillary services.
- corrected: Inference inflexible → Say: inference must respond on very short timescales (limits shifting).

**canaanMB** (opportunity card)
- overreach: finviz is a reprint aggregator; replace with PR Newswire primary URL (not fetched here).

**bcaGuideCom** (receiver_demand)
- overreach: Role coefficient 'x 1.15': source wording is 'multiplied by 15 percent' (literally x 0.15); x 1.15 is our reading of intent - mark as interpretation.
- overreach: Applies only to strata office/retail, not strata industrial; must not be applied to all strata receivers.

**abGSHE** (licence_flag)
- corrected: (role) authorization before construction → Authorization before construction applies to OPEN-loop systems only; closed loops (horizontal above water table; vertical above base of groundwater protection) need no Water Act au
- overreach: licence_flag rule must be limited to open-loop (groundwater) systems; applying it to closed-loop boreholes overstates the requirement.
- overreach: Fact sheet is guidance summarizing the Water Act/Directive; cite the Directive/Regulation for the rule itself.

**bcucG3026** (ev_repay)
- corrected: BC Hydro public EV charging, Level 2 28.28 ¢/kWh → 28.28 ¢/kWh was set by Order G-67-24 (13 Mar 2024), only recited in G-30-26 (L2 unchanged); before Deferral Account / Trade Income rate riders.
- corrected: Fast charging 39.70 ¢/kWh from 1 Apr 2026 → Order approves a 6% increase effective 1 Apr 2026; 39.70 ¢/kWh is BC Hydro's calculated rate (6% + F2027 general rate increase = ~10%), reported in the Decision, not set in the Ord
- overreach: ev_repay coefficient 28.28 should cite G-67-24 as the setting order and note 'before rate riders'.

**aesoTariff5** (grid_refund)
- corrected: ISO 'may' refund the original customer → ISO must reduce the original participant's allocated costs and may refund its contribution; the refund itself is paid by the transmission facility owner (5.7(2)).
- corrected: No adjustment (payment or refund) under $10,000 ? → Not required (rather than not allowed) to pay or refund adjustments under $10,000; remove '?'.

**nfpa855tia** (storage_footprint, battery, component_space)
- corrected: NFPA 855 not referenced in NFC 2020; 35 NFPA standards cited → 39 NFPA documents cited (not 35); 855 absent - confirmed.
- not found: So in both provinces battery spacing falls to AHJ, electrical code and listing (UL 9540/9540A) → Label as our inference; cite CEC 2024 Section 64/ULC or AHJ guidance if available.
- overreach: US standard (NFPA 855) not adopted in BC or Alberta codes, used as a 'bound' for electrical_room (0.914 m) - acceptable only labelled as a US benchmark, not a Canadian rule.
- overreach: 3 ft rooftop spacing applies to units <=20 kWh only; larger rooftop ESS follow other rules.

**aeso_or** (ups_flex, peak_relief)
- not found: (role) UPS batteries offered to the grid → Page supports only that loads may provide contingency reserves via Watt-Ex; battery/UPS participation needs another source.
- not found: (role) Peak relief and what it earns → No earnings figures here; cite Watt-Ex price data or AESO OR statistics.
- overreach: Used as 'data' for UPS flexibility and peak-relief earnings, but the page has no figures and does not mention batteries; it is descriptive only.

**sor2024_263** (chp_heat)
- overreach: chp_heat rule '>= 25 MW' omits s.5(2): units <25 MW commissioned on/after 1 Jan 2025 are deemed covered if the facility's new units sum to >= 25 MW - several small CHP units or gensets could be caught
- overreach: Emission limit is an annual tonnage from capacity x 65 x 8760, not a per-GWh intensity of actual output; also end-of-prescribed-life deferral (s.10).

**exergiAR2023** (heat_captured, capex_split)
- not found: Meter owned by Exergi (?) → Keep '?'.
- corrected: Hourly avoided-cost price → Avoided-cost price confirmed (CoMo); 'hourly' rests on Energiforsk, unverified (?).
- overreach: heat_captured 'rule' (utility meters on DH side after supplier HP) is not supported by the sources reached; meter location/ownership unverified.
- overreach: Stockholm market model (Open District Heating) used as a rule; it is one utility's commercial practice - label as case data.

**burlingtonPlans2026** (offerable_area, hall_area)
- corrected: 'SERVICE AREA' 175-200 m² → Per-floor service areas range 127-230 m² (assignment to floors unclear ?).
- overreach: Applicant's municipal submission plans (Ontario), one project; area ratios are a single-case reference, and the summary table conflicts with GFA - do not use for coefficients without the conflict flag

**learningSeries** (commitment, futures)
- not found: (role) five commitment states; 'only existing and committed count' → Internal rule with no primary - keep labelled, or source it.
- corrected: (role) four-futures scenario set → Source says three futures; the fourth is our addition - label.
- not found: (role) network 40-50 yr vs en253Life 30 yr at 120 °C, 50 below 115 °C → Check under en253Life.
- overreach: commitment and futures rules have no primary source - conflicts with the 'no unsourced assumptions' standard; they are correctly labelled internal, but the 'four futures' contradicts the manuscript's 

**edmBEB6** (it_load_actual)
- not found: programme 'voluntary' ? → Drop 'voluntary' or source it elsewhere (e.g. City programme page); do not attribute it to this report.
- not found: Vancouver equivalent is required reporting (not in this source)
- overreach: Used by it_load_actual, but the report has no data-centre category, so it can only show absence of Edmonton data-centre benchmark data (context), not an IT-load figure.
- overreach: 'voluntary' attributed to the programme is not in the report (refers to BOMA BEST).

**bcucC113** (heat_delivered, price_ceiling, capex_split)
- corrected: (G-155-12: $0.105–0.126/kWh 2014–18) → Remove the G-155-12 rate attribution; if needed cite '$0.126/kWh levelized cost of service (FAES forecast)'. Source the $0.105 elsewhere or mark unverified.
- not found: annual actual-load report rescinded by G-2-15 → Cite G-2-15 as its own source or mark '?'.
- overreach: heat_delivered: 94 % is a design forecast covering DC plus tower waste heat, not measured DC heat taken.
- overreach: price_ceiling: '$105–126/MWh customer rate' is not in this order; the proposed rate was denied and $0.126/kWh is a levelized cost-of-service forecast, not a customer rate.

**vanNEUguide** (receiver_demand)
- corrected: building-side supply 60 °C → Space heating: max supply 70 °C winter / 50 °C summer; DHW 60 °C.
- corrected: return <=45 °C → Max return 50 °C winter / 30 °C summer.
- corrected: ΔT >=15 °C → Minimum ΔT 20 °C.
- overreach: Guideline (rule (guideline)) for buildings connecting to the City-owned NEU (SEFC); temperatures are maxima for customer buildings, not data-centre supply temperatures.

**wilsonWorrall** (sewage_heat)
- not found: (sewage_heat method) not below 6 °C → Source the 6 °C floor elsewhere or remove the attribution to this paper.
- not found: (sewage_heat method) inflow >= 11 °C → Source the 11 °C threshold elsewhere or remove.
- overreach: sewage_heat cites this paper for 6 °C and 11 °C thresholds that are not in it.
- overreach: Study is of final sewage effluent (FSE) at UK treatment works, not in-sewer recovery upstream of a plant; the paper flags a 0.5 °C cooling limit upstream of treatment.

**buffa2019** (sewage_heat)
- corrected: "an HE is installed for direct heat recovery from a data center" (p.515) → Page 516 (not 515) ? — page from fetched summary.
- overreach: Used by sewage_heat, but neither the paper's FGZ case nor the factsheet concerns sewage heat; it is a data-centre/BTES anergy network precedent. Re-map the role (e.g. to network temperatures or BTES).

**lygnerud** (risk_term)
- overreach: Swedish industrial excess heat 1974–2014; no data centres in the sample. Using termination shares as a data-centre risk coefficient is an analogy and should be labelled so.
- overreach: Shares are cumulative over 40 years, not an annual rate; formula unit is '%/yr' — convert or relabel.

**voaComputerCentres** (existing_building, afterlife)
- corrected: UK Valuation Office Agency, Rating Manual section 5a / section 6 part 3, Computer centres ('s. 281' ?) → Cite as 'VOA Rating Manual section 5a: valuation of all property classes — Computer centres (GOV.UK, publisher shown as HM Revenue & Customs; updated 21 Sep 2026)'. Drop 'section 6
- overreach: existing_building / afterlife: the 'not readily adaptable' line is from the superseded 2017 note; current 2026 note says 1st-generation centres are 'capable of an alternative use' and valued on that b
- overreach: UK rating guidance for valuers, not Canadian evidence; context only (as roles say).

**agsGround2009** (ground_warming, btes)
- corrected: "undisturbed" ? → Drop 'undisturbed'; note the report's own caveat that 6.1 °C may be site-elevated (extrapolated deep gradient ~3.7 °C).
- not found: Vancouver: no city-specific measurement found; national map 6–12 °C (GSC OF 6914, not checked ?) → Read GSC OF 6914 or keep '?'.
- overreach: One pilot site 15 km+ from Edmonton with two boreholes; values are site-specific (drift 42 m thick), so use as an Edmonton-region indication, not a citywide value.
- overreach: btes: measurements are for small closed-loop GSHP; no seasonal-storage data.

**bcAssessClasses** (property_tax)
- not found: Prescribed Classes of Property Regulation, BC Reg 438/81 (amendment date ?) → Read and cite BC Reg 438/81 directly, or drop it.
- overreach: property_tax 'Class 6 residual' as a rule: page does not say data centres fall in Class 6. Class 2 (Utilities) covers 'telecommunications' and Class 5 covers some storage/processing; actual classifica

**nbc6215** (hr_plant_room)
- corrected: mechanical refrigeration equipment designed, constructed and installed to CSA B52 → Say 'installation (incl. mounting, clearances, air supply) shall conform to ... CSA B52'.
- overreach: hr_plant_room 'CSA B52 applies': true for Edmonton via NBC(AE) 2023. For Vancouver, BCBC 2024 6.2.1.5 names only 'the Safety Standards Act and pursuant regulations' (B52 not listed); B52 reaches BC th
- overreach: Any plant-room sizes or rules drawn from B52 itself are unverified, since B52 was not read.

**barroso2018** (heat_rejected, build_cost, horizons)
- overreach: Register text names only ch.6 but heat_rejected role draws on ch.4 statement
- overreach: Cost figures are US$ and US/2011-era; applying directly to Canadian 2026 build cost needs currency/escalation flag

**cerProfiles2026** (water_behind_electricity)
- overreach: Alberta mix is 2021 and coal is now gone: using 22% coal for current water-behind-electricity would overstate coal; tool must flag year
- overreach: BC: capacity share (86% hydro) is not generation share; do not use as generation mix

**bfe2023dc** (sewage_heat)
- corrected: Canton Zürich RRB 1340/2025: waste heat above 2 GWh must be offered to third parties at production cost → Cite § 30a Abs. 2 BBV I (LS 700.21), RRB 840/2022, in force 1 Sep 2022; applies to new buildings or after renewal of cooling generation, heat the site cannot use itself. Cite as se
- overreach: Used by 'sewage_heat': report is about data-centre waste heat, not sewage heat — role link looks misassigned ?
- overreach: Zürich rule is Swiss cantonal law, not a BC/AB rule — use only as precedent

**aesoLargeLoad** (grid_headroom)
- not found: Connection Project List (monthly Excel) → Describe as 'Connection Project List (dashboard)'; confirm format/frequency from the list page itself before saying monthly Excel.
- overreach: Page also states Phase 1 'All 1,200 MW of the interim connection limit was successfully allocated' — if grid_headroom uses any headroom figure it should cite this, not infer

**aucCoaldale2025** (licence_flag, self_gen_rules)
- not found: Permission to appeal granted in part (Sep 2025, per law-firm commentary); outcome not verified → Verify against Alberta Court of Appeal record or AUC; until then mark unverified and do not rely on law-firm commentary.
- overreach: Decision is about a generator crossing a highway/railway to a single industrial customer; for licence_flag/self_gen_rules it supports 'non-contiguous lots fail s. 2(1)(b)', but is a single decision un

**bchDG100** (interconnection, battery)
- overreach: ≤100 kW/phase scope: a data-centre battery or generator is far larger; this doc only governs small DG — the tool must not apply it to MW-scale storage

**waterUse2026** (greywater_neighbours)
- not found: Metro Vancouver residential figure not found
- overreach: kind 'utility report' is mixed: StatCan is federal statistics, EPCOR is utility
- overreach: Residential per-capita use is supply-side; greywater_neighbours should not assume all of it is greywater ?

**pnnl2022** (battery)
- overreach: Register names no specific figure, table or page used by the 'battery' node; the coefficient used cannot be verified from the entry — add table/page and value. US costs (USD 2021) need currency flag.

**bch_esi** (peak_relief)
- overreach: Register text has no figures, so peak_relief 'what it earns' values cannot be traced to this entry; the '$10,000 X kW' figure as printed looks unusually high — confirm against ESI customer manual befo

**bchDR2026** (demand_profile, peak_relief)
- not found: BC Hydro peaks on weekday evenings (2021 demand report) → Needs its own source entry.
- not found: Records 5–6 pm (Dec 2022 winter, Jul 2026 summer) → Needs its own primary BC Hydro source.
- overreach: Program window (6 am–10 pm) is an event-eligibility rule, not the shape of BC Hydro's peak; demand_profile must not infer peak timing from it
- overreach: Saved copy is filed under bch_drb, not bchDR2026 — duplicate source ids for the same manual

**vanRates2026** (water_supply)
- corrected: 1 unit = 2,831.68 L (2.83168 m³, our conversion) → City states 2,831.6 L = 100 ft³; 2,831.68 is our conversion of 100 ft³ — cite the City value.
- overreach: No roles recorded; water_supply should use these as City rates for metered properties only

**nivosMantsala** (heat_delivered, price_floor)
- not found: 4.0 MW heat pump (2015) → Keep '?' or find a primary source; else drop.
- overreach: price_floor '5,000 flh (2018)' is not stated in any source read; it is our derivation (e.g. 30 GWh / 6 MW) — label as calculation
- overreach: Nivos is the utility partner and Sitra/NIB repeat programme figures: label as utility/programme claims, not measured audits

**abp317446** (offerable_area)
- corrected: 45 operational jobs → Say 'over 45 operational jobs (applicant's claim)'.
- overreach: Irish (South Dublin) case — precedent only for floor-area ratios

**torontoDER2016** (receiver_demand)
- not found: (new buildings) → Say 'for DE-ready building design'; ΔT 'shall be regarded as a minimum requirement'.
- overreach: Toronto design guideline (not a rule, not BC/AB); using it for receiver_demand temperatures of existing Vancouver/Edmonton buildings is an assumption

**kwlSewer** (sewage_heat, sewer_sink)
- overreach: Source is the consultant's own award entry hosted by a trade magazine — label as consultant claim; the underlying Metro Vancouver report should be cited if available

**drake_landing** (btes)
- corrected: Mudasar et al., CSME 2020 (? modelling vs measured) → Label as GSHP+ORC modelling study using DLSC as case, not measured data.
- overreach: Using DLSC as 'data' for a seasonal store must carry the failure context: end-of-life components, unsustainable funding (losses $42,000–62,000/yr)

**gcDataResidency** (computing_served)
- corrected: (implied current rule) → Cite Directive on Service and Digital req. 4.4.3.14 as the current rule; ITPIN as history.
- overreach: Role 'rule': archived direction used as rule — must cite the current Directive requirement; applies to GC data only, not private demand

**vertivVR3300** (rack_count, hall_layout)
- not found: Same 600 × 1200 footprint from APC AR3300B2, Rittal VX, Chatsworth ZA15, Panduit XG → Cite each vendor's spec sheet separately or drop.
- overreach: Vendor spec of one product; 0.6 × 1.2 m is a common but not universal deep-rack size — label as product example

**tsbcDBP202405** (hr_plant_room)
- overreach: Role 'registration above 125 kW (ammonia)': directive does not mention ammonia/B2L; the 125 kW is an exemption ceiling for certified factory-assembled units only — field-built ammonia plant may need r

**greenMountainHima** (opportunity card)
- corrected: Rjukan site TEL-Rjukan ('DC-Telemark' ?) → Drop 'DC-Telemark'.
- overreach: No uses recorded; correctly labelled operator claim

**Couldn't be read (11):** vanSewer, abESSstandata, uptime2024Survey, epcorWWpbr2025, aesoBYOG2026, bcAssess2026, blatchfordAdvisor2023, r2Van2026, ieaSHCTask54, geaRedHP, edmRezComplexity

## Full level

**quEDM1_2026** (server_floor, it_load_claim, backup_hours)
- overreach: backup_hours is traced to this source although the register says fuel/generator details were deliberately not carried into the tool — either the register text or the role is wrong
- overreach: All figures are operator claims (marketing spec sheet); must stay labelled as claims

**abWells2026** (ground)
- corrected: 3,844 records parsed → Re-run the parse; record the dedup rule. Count ~3,980 (?) by independent parse.
- corrected: 366 since 2000 → Re-check; state whether 2000 is included.
- overreach: Well records are drilling reports, not ground thermal properties; use for 'ground' only as context on depth/aquifer use

**dfoScreen** (surface_water_sink)
- corrected: 'interim mitigation standard' → Call it an 'interim mitigation procedure' (national guidance), not a standard.
- overreach: Guidance referenced via Fisheries Act authorizations, not a stand-alone rule; a data-centre-scale intake may be the 'large intake' case it excludes

**abEUAdef2026** (self_gen_rules)
- corrected: Amendments not in force include 2025 c8 (repeals and substitutes s. 18) → 2025 c8 also amends s. 1(1) — the definitions section quoted here; check the current version before relying on s. 1(1)(m) too.
- overreach: A definition alone does not state self-generation rules; self_gen_rules needs the operative provisions (and the Micro-generation Regulation etc.)

**ab_ghgperf** (pv_share)
- overreach: Role pv_share ('share of the data centre's power from its own solar') is a site-level quantity; this page only gives provincial grid/renewable figures (e.g. 'wind, solar, and hydro ... approximately 2
- overreach: Government performance page (promotional framing); figures trace to ECCC NIR 2026 and AESO — cite those primaries

**nfpa37clear** (component_space)
- corrected: Reducible with a 1-hour wall or a tested enclosure → Separation is not required (eliminated), not merely reduced; enclosure must be noncombustible and shown by full-scale fire test or calculation (A.4.1.4(2)).
- not found: Vancouver bulletin 2000-015 points to CSA C282
- overreach: US (NFPA/North Carolina) rule applied to Vancouver/Edmonton plant space; Canadian requirement is CSA C282/NBC — use only as a US reference figure, not a rule

**cologixVAN2web** (it_load_claim)
- overreach: 'Site Capacity' is not stated to be IT load; using it as it_load_claim needs the label 'site capacity (operator claim), IT share not stated'

**epcor_ccg** (component_space, service_class)
- corrected: EPCOR Power Customer Connection Guide; title may be 'EDTI Customer Connection Guide', 1 Aug 2025 (?) → Cite as: EPCOR Distribution & Transmission Inc. (EDTI), Customer Connection Guide, released/effective 1 Aug 2025. Remove '?'.
- overreach: Register text gives no figure or section; add the section used (e.g. 3.5 Selecting the Service Type; 6.4 Padmount Transformers; 3.10 Clearances; 3.14 Electrical Room)
- overreach: Edmonton (EPCOR) only — not applicable to Vancouver

**vertivCW181** (room_cooling_units, room_cooling_type)
- corrected: p.7: 179 kW at 75 °F → Say '179 kW sensible (211 kW total) at 75 °F DB, 45 °F water, 10 °F rise'.
- overreach: Manufacturer catalogue ratings — label as manufacturer claims; capacities depend on water temperatures, so use the row matching the tool's water temps

**vertivCWguide** (hall_layout)
- corrected: Liebert CW 38–181 kW Installer/User Guide SL-18060, ©2022, hosted by Vertiv → Document number SL-18060 not printed (from URL only ?). Note the confidential marking.
- overreach: Manufacturer installation guidance used as 'rule' — label as manufacturer guidance
- overreach: Document marked 'Proprietary and Confidential' and URL says 'for-internal-use-only'; check it may be cited/quoted

**esaBulletin299** (electrical_room)
- corrected: On Canadian Electrical Code Rule 2-308 → Say: on OESC Rules 2-308/2-310 (Ontario's adoption of CEC Part I); BC/AB equivalence not shown by this source (?).
- corrected: Note 2: 1 m → 1.5 m where a person cannot leave without passing a failure point → Add the condition (≥1200 A or >750 V); otherwise a second exit is required.
- overreach: Ontario bulletin (OESC/OBC) used as a 'rule' for BC and Alberta sites; the 750 mm egress figure is an Ontario Building Code requirement

**bcWSRfees** (surface_water_sink)
- overreach: Register mixes purposes: application fee quoted for 'cooling' but rental for 'heat exchange'. 'cooling' rental is $1.30/1,000 m³ (min $200); 'heat exchange' application fee is also $1,000. Pick one pu
- overreach: BC only; must not be applied to the Edmonton (Alberta) site.

**epsbNSR** (surface_water_sink)
- not found: Altalis Base Features Hydrography → Record the provider statement from the EPSB layer page.
- not found: J.B. download 19 Oct 2026; academic use
- overreach: Third-party re-hosting of Altalis data: licence ('academic use') should be confirmed from the publisher, not assumed.

**schneiderWP133** (room_cooling_units, cdu_units)
- not found: (©2024)
- overreach: Vendor white paper (MANUFACTURER CLAIM) — not labelled as such in the register; label it.
- overreach: Used as a 'rule' for room_cooling_units; it is a vendor estimate, so treat as a bound/assumption, not a rule.

**vbbl2019_331** (hall_layout)
- overreach: VBBL 2019 is superseded by VBBL 2025 for new permits (2025 by-law preface: 'This Building By-law replaces the 2019 Building By-law'); re-cite VBBL 2025 Div. B 3.3.1 for current rules.
- overreach: 45 m is a corridor-separation exemption condition; using it as the hall travel-distance limit is a misreading.

**tsbcIBEL201605** (electrical_room)
- corrected: second means of egress at large equipment → Reword: layout must let workers leave without passing failed equipment; otherwise 'the working space shall be increased to 1.5M'.
- overreach: Bulletin interprets the CE Code for BC; it supports a check, not dimensions beyond 1.5 m. BC only — Edmonton needs the Alberta equivalent.

**vbbl2025Seismic** (importance_cat)
- corrected: new seismic rules apply to permits issued on or after 15 Sep 2026 → The trigger is the application submission date, not permit issue date (per by-law; guide unverified).
- overreach: Cite the by-law (Div. C 3.3.1.4) rather than the guide for the transition rule.

**blatchfordDG2025** (cop)
- overreach: One id carries two documents from two cities; the Vancouver figures have no URL and are unverified.
- overreach: 'Ambient loop' is the register's gloss; the guide says 'Heat Pump Loop Water'.

**nrelRSF** (erf)
- overreach: Role is 'erf' 'reported value', but the deck reports ERE, not ERF. ERF = 1 − ERE/PUE ≈ 0.23 is a derived value; label it derived and note ERE itself was calculated, not measured.

**energiforsk2022life** (payback)
- corrected: Degradation ×2.5 per +10 °C (conclusions); s. 6.1 gives ×2 ? → Write: s.6.1 states ×2 rule of thumb but finds ×2.5 (Case II) fits field data better; remove '?'.
- overreach: EN 253 requirement is quoted second-hand (EN 253 not read).
- overreach: 30 yr at 120 °C is a design-test basis for hot DH pipes; a low-temperature network would last longer, so 30 yr is conservative as a payback life — say so.

**m104** (ev_exemption)
- overreach: M104 only approves BCUC making the exemption; the binding exemption is the BCUC order (G-66-19 ?), which is unverified. Exemption is from UCA Part 3 except ss.25 and 38 (safety), for persons not other

**thermalLimits** (surface_water_sink)
- not found: Proposed Burrard Inlet objective 'No further increase in temperature' (Jul 2024 ?) → Cite its own source (library has burrardTemp2024); keep '?' until read.
- not found: Alberta SWQG 1999 'Not to be increased by more than 3°C above ambient' → Cite abSWQG1999 only.
- overreach: Role says 'thermal limit (binding)' rule, but the source is an ambient water-quality GUIDELINE ('establishes ambient water quality guidelines'); not binding unless written into a permit. Label as guid
- overreach: Freshwater (Fraser River) streams use different criteria (±1 °C beyond optimum range, 1 °C/h), not the marine 0.5 °C/h.

**mfrDryCooler** (component_space)
- overreach: Range across other makers unverified this pass; correctly labelled maker claim. Operating weight of VD9120ZA is 22,410 lb (≈10.2 t), within range.

**nbc2020_v1** (hall_layout, electrical_room)
- overreach: NBC 2020 is the model code: Vancouver uses VBBL 2025, rest of BC BCBC 2024, Alberta NBC(AE) 2023 — local copies exist in data/raw/codes; cite the adopted code.
- overreach: 3.4.2.5.(1) applies 'if more than one exit is required'; 3.3.1.9.(1) is for public corridors only.

**ubc336100** (hr_flow, hr_pipe_size, phe_frames)
- corrected: 4.1.5 heat exchangers sized for maximum 5 °C approach → Change clause to 4.1.4.2.
- overreach: A UBC campus owner's standard used as a 'rule' for Vancouver/Edmonton sites; it binds only UBC's DES. Label as reference practice. 3.1.5 itself says preliminary sizing only.

**edmDDEcapital** (distribution_cost)
- corrected: Phase 1A $18.3M → Say $18.3M estimate covers Phase 1A infrastructure plus Phase 2 conceptual design (only $4.5M in 2025–26)
- overreach: Lumped capital cannot give a per-metre distribution cost; usable only as an order-of-magnitude total, not a coefficient.

**aucDSI2021** (ev_exemption)
- overreach: Role type 'rule': an inquiry report records parties' views; it is not a rule or exemption. Label as 'regulator inquiry finding (2021), not law'.

**enwaveDLWC** (surface_water_sink)
- not found: Serves 'over 80 buildings… including data centers' → Keep as unverified or drop
- overreach: Used as 'check'/built precedent — fine; any data-centre-customer claim is unsourced.

**gsaBlowdown2023** (blowdown_recovery)
- corrected: $35,403 equipment + $11,422 install on a 1,150-ton plant → Equipment price is for a 200–1,000 ton load size; testbed plant was 1,150 tons
- overreach: US federal pilot, single site; US water rates.

**bacS3000** (component_space)
- corrected: 8'-6" × 18'-1", 9'-10" high to 14'-0" × 24'-1", 22'-5" high → Say 'smallest to largest-capacity model'; max height in table 22'-9" (≈6.9 m), +10.5" with options
- overreach: Manufacturer catalogue; 'Do not use for construction' — fine for space allowance (pending build).

**lbnlCapture** (liquid_capture)
- not found: Air-cooled capture: no primary figure
- overreach: 57–59 % at 30 °C is for 50/100 % power; at idle the same report gives 35 % ('heat captured at the server idle power level was 35 percent'). Coefficient should note load dependence.
- overreach: Two of three figures (64 %, 94 %) remain unchecked; do not use them as coefficients until read.

**vanSewerCap2025** (sewer_sink)
- overreach: No Review Threshold (FSR ≤ 7.0) applies only to residential and commercial: 'the No Review Threshold applies to residential and commercial applicants'. A data centre (industrial) goes straight to Low 

**abWaterAct2021** (surface_water_sink)
- not found: Water Act: licence to divert/use surface water; approval for works in a water body (fact sheets 2021) → Find and cite the Water Act (RSA 2000 c W-3) s.36 (approval) and s.49 (licence) or the 2021 fact sheets; or drop the claim
- overreach: Source id and title say 'Water Act 2021' but the URL is the 1999 guideline: retitle the entry (or split it) so the id matches the document.
- overreach: 3 °C is a 1999 water-quality guideline (superseded by the 2018 Environmental Quality Guidelines), not a permit rule; label as guideline.

**cec2024** (electrical_room)
- corrected: Rule 2-308 5) 2.2 m headroom at exposed bare live parts → Say: 2.2 m headroom around switchboards or MCCs with exposed bare live parts
- overreach: 64-1100 Subrules 1)–8) are dwelling/residential location limits; 9) only relaxes those. Using 9) as a general data-centre ESS rule overreaches.
- overreach: Repo note CEC_2024_note.txt: Appendix B ESS definition excludes UPS (covered by CSA C22.2 No. 107.3); data-centre UPS batteries may fall under 64-800 battery rules, not ESS rules.

**bacLayout2023** (component_space)
- corrected: Air inlet 1.5–2.7 m from a wall, single cell at grade (our summary) → State it is Series 3000 only (2026 ed.), or give the full range across product lines
- overreach: Manufacturer guideline (minimum spacing for BAC units), correctly labelled; not a code rule.

**equipStudy2026** (component_space)
- corrected: Basis = unit nearest the median area per MW → Say: 'nearest the median area per MW, with stated tie-breaks (listing, scope), where a median exists'
- overreach: Internal study, not an external source: each basis unit's figures must trace to its own maker-sheet entry in the register.
- overreach: select_heat.md says the EVAPCO EA26MRKT catalogue 'could not be opened', yet a copy is saved at beyond-data-sources/private/maker_sheets/EVAPCO_EA26MRKT_2026.pdf; recheck.

**cologixVAN4web** (it_load_claim)
- not found: Page now prints 'Site Capacity: 6.5 MW' (check 2 note) → Drop the 6.5 MW note or re-check in a browser; this read found only 4 MW
- not found: Page also shows 58K → Drop '58K ?' unless seen again
- overreach: Labelled OPERATOR CLAIM: correct. Colocation capacity is not measured IT load; keep it as a claim/upper bound.

**waterHardness2026** (blowdown, blowdown_recovery)

**src16** (component_space)
- overreach: Internal note is not a primary source; component_space must cite the primaries (S-ids). The 30.5 m²/MW dry-cooler figure has no primary document.

**mfrGenset** (component_space)
- overreach: Manufacturer claims, labelled. Clearance 1 m remains unverified and should not drive layout.

**abDataCentreLevy** (untaxed_equipment)
- overreach: Bill text, not the consolidated Act; flag that the in-force wording should be checked in the consolidation.

**vbbl2019_362** (electrical_room)
- corrected: 3.6.2.7 vaults 3 h unsprinklered / 2 h sprinklered → Say 'protected / not protected by an automatic fire extinguishing system', not sprinklered
- overreach: VBBL 2019 superseded by VBBL 2025 (check register vbbl2025 entries) ?

**vertivCWAds** (room_cooling_type)
- overreach: Used as 'rule' (150/250/400 W/ft² limits) but these are approximate manufacturer marketing claims with no conditions. Relabel as manufacturer-claim coefficients/indicative thresholds.

**Couldn't be read (81):** nrelESIF2019, euReg2024_1364, uptime2025, ipcc2019v3ch7, necbHDD, tt2025, epcorDrainage2023, satya2017, ciraIXP2023, kindaichi2018, thermokeyGH2490, spxOlympusV, alfaT20, bacS3000_2012, estruxtureVAN1ds, hut8VAN1, upsiteASHRAE5, zimmermann2012, skatOverskud, uptimeRegional2025, dreyer2021, squamishNEU2010, portPER2025, arden2021, nrcan_pvcost2024, barth2026, traneTCA2026, hut8Vault, sethuramalingam2019, nrcanEstarDC, oekoBSF, canvecHydroBC, aesoConnect, zurmuhl2018, majorowicz2021, carrier61XWH, linwood2023, gunterShipes1971, nrcSeismic2020, galaxyVXinstall, ornlWang, reinholdt2018, enefg11, schneiderUPS2020, schon2024, vanixPoints, vertivEXLS1, airedaleDCS, epiTIA942, wrayAkbari2008, ashraeTC99card, vertivCRVcat, schneiderWP46, vertivLi5manual, energiforsk2021, reflexH5000, pieper2020, greenGridWP29, cologixVAN2fr, isoplusEPD, stratego, howley2021, panFang2025, vanixFacilities, nrcan_pv2006, vanDeepGeo, vertivHPL, motivairMCDU, intelHD2012, logstor2014, armstrong4030, oro2019, pozgaj2025, iso30134_6, gwells, bennettBill22, malecki2002, yegixStatus, vertivCDU2300, deltaLZH, galaxyVX
