# Architecture mode v1: gaps, round 2 (31 Oct 2026)

Fills the "?" in SUMMARY.md and replaces weak sources. Ids → `gaps_round2_sources.json`. "Our arithmetic" = derived here. "?" = still not found. Check 1 only.

## Task A: gaps filled

### Laundry

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Institutional laundry, smallest tier (1–100 beds) | production rooms 3,680 NSF + linen support 480 NSF = 4,160 NSF ≈ 386 m² net (our arithmetic: sum of table rows) | arch_r2_vaLaundry2022 | s. 5.B–5.C, pp. 7–10 | design guide (US government benchmark) | 70 |
| Institutional laundry, size steps | 5 tiers by beds: 1–100, 101–200, 201–300, 301–400, 401–500; e.g. Clean Linen Processing 1,000 → 2,600 NSF | arch_r2_vaLaundry2022 | s. 5.B | design guide (US) | 75 |
| Institutional laundry, throughput basis | soiled linen lb per bed per day: general hospital 18, teaching 20, psychiatric 12, nursing home 8; "260 days of operation per year"; equipment "7 hours per day" | arch_r2_vaLaundry2022 | s. 3, 3.G, p. 6 | design guide (US) | 75 |
| Throughput at smallest tier | 100 beds × 18 lb ≈ 816 kg/day generated ≈ 1,150 kg per operating day (our arithmetic: × 365 ÷ 260) | arch_r2_vaLaundry2022 | — | our arithmetic | 55 |
| Grossing (VA) | net-to-department gross 1.15; building gross 1.35 | arch_r2_vaLaundry2022 | s. 3.C, p. 5 | design guide (US) | 75 |
| Laundromat floor area | "usually occupy 1,000 to 5,000 square feet ... the 2014 average being 2,170 square feet" (≈ 93–465 m², average ≈ 202 m², our arithmetic) | arch_r2_claIndustry | Industry Overview page | operator claim (trade association, US) | 45 |
| Laundromat throughput | washers "from three TPD to as high as eight TPD" (turns per day) | arch_r2_claIndustry | same | operator claim | 40 |
| On-premises laundry dryer size (hotels, care homes, prisons) | average installed OPL dryer "88 pounds" (≈ 40 kg) | arch_r2_trcOpl2017 | Executive Summary | consultant report for utility (US benchmark) | 55 |
| Process temperatures | some laundry processes "still take place at temperatures above 150 °C"; heat pumps cut primary energy "by up to 50 %" | arch_r2_buhler2020 | abstract | peer-reviewed (conference) | 65 |
| Laundry and district heat (reverse case) | Pauli laundry, Giessen (7 t/day): flue-gas heat exchanger feeds district heat, water "from 50 degrees to 85 degrees"; laundry steam 180 °C | arch_r2_giessenPauli2007 | news page, 27 Jul 2007 | operator claim (utility) | 40 |
| Laundry minimum size | ? (VA smallest tier ≈ 386 m² net; CLA 1,000 ft² low end; no Canadian source) | — | — | — | — |
| Data-centre heat → laundry precedent | ? none found (Nordic search gave only a student thesis on laundry heat recovery, not used) | — | — | — | — |
| Nordic district heat feeding a laundry | ? not found | — | — | — | — |

Note: laundry process heat (>150 °C drying/finishing) is well above data-centre heat; only wash water (≤75 °C rise) is a fit, via heat pump (our reading).

### Greenhouse

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Lower Mainland greenhouse, size | "average-sized greenhouse in the Lower Mainland of BC" = 7.5 ha | arch_r2_chau2009 | abstract | peer-reviewed | 85 |
| Lower Mainland peak heat | design heat "7.4 MW" (agrees with existing 7.5 MW gas boiler) → ≈ 99 W/m² floor (our arithmetic: 7.4 MW ÷ 75,000 m²) | arch_r2_chau2009 | abstract/intro | peer-reviewed + our arithmetic | 70 |
| Lower Mainland annual energy | "annual energy cost ... C$1,459,234" at "C$8.25/GJ" → ≈ 177,000 GJ ≈ 2.4 GJ/m² ≈ 655 kWh/m²·yr of fuel (our arithmetic; fuel not delivered heat; cost basis may include more than gas) | arch_r2_chau2009 | abstract/methods | our arithmetic | 40 |
| Cover-to-floor ratio, gutter-connected (Manitoba worked example) | 5 bays × 21 ft × 360 ft, 14 ft eaves: cover 5,439 m² ÷ floor 3,512 m² ≈ 1.55; roof alone ≈ 1.19 (our arithmetic from the page's formulas) | arch_r2_mbHeatVent | worked example | government guide (archived) | 60 |
| Manitoba U-value | double poly "5.00 Watts/meter2" °C (vs 4.0 in EP406) | arch_r2_mbHeatVent | same | government guide (archived) | 70 |
| Cover-to-floor, other forms (Venlo, quonset) | ? (geometry only; no source) | — | — | — | — |
| Community greenhouse, Vancouver guideline | "a greenhouse, of minimum 9 x 12 feet, if provided" (≈ 10 m², our arithmetic) | arch_r2_vanUrbanAg2009 | s. 3.1.5(d)(iv) | government guide | 80 |
| Community greenhouse, Inuvik NWT | former arena; "some 140 operational plots rented by members" | arch_r2_gnwtInuvik2014 | Inuvik Community Greenhouse | government report | 65 |
| Inuvik floor area | "over 16,000 square feet" (≈ 1,490 m²); May–Oct | arch_r2_carletonInuvik | case study | student case study (low) | 35 |
| Lufa Farms rooftop sizes (Montreal) | Ahuntsic 2011 31,000 ft²; Laval 2013 43,000; Anjou 2017 63,000; Ville Saint-Laurent 2020 163,800; Marché Central 2024 127,000 (≈ 2,880–15,220 m²) | arch_r2_lufaFarms | Our farms page | operator claim | 50 |
| Lufa conflict | Ahuntsic blog says "32,000-square-foot" | arch_r2_lufaAhuntsic | blog | operator claim | 40 |
| Lufa heating | rooftop: "about half the heating equivalent to ground-level greenhouses"; "high-efficiency natural gas heaters" | arch_r2_lufaFarms | same | operator claim | 35 |
| Minimum / typical community greenhouse, Vancouver or Edmonton | ? (no city programme size found) | — | — | — | — |
| BC Greenhouse Growers' Association / BC Ministry annual GJ/m² | ? (not found; 2009 industry profile only on a web archive, not used) | — | — | — | — |

Check: EP406 conduction 92 W/m² cover × 1.55 ≈ 143 W/m² floor (our arithmetic) vs Chau 99 W/m² floor. Different covers and set points; do not merge.

### Pool

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Swimming Canada, competition | lanes "at least 2.5 metres wide, first and last lane may be 2.4"; start depth "1.35 metres, extending from 1.0 metre to at least 6.0"; water "25° to 28°C" | arch_r2_swimCanFacility2023 | Sec. 1 II.16.1.4, .6, .13.1 | rule (sport body, Canada) | 90 |
| Swimming Canada, club/development | lanes "at least 1.8 metres wide or a reasonable variance"; deck starts "1.20 metres ... 1.0 to at least 5.0" | arch_r2_swimCanFacility2023 | Sec. 2 C16.1.6.1, C16.1.4.1 | rule (sport body) | 85 |
| Swimming Canada, 25 yd pools | times "not approved or used for ranking or qualifying" | arch_r2_swimCanFacility2023 | Sec. 2 C16.1.1.3 | rule | 85 |
| Therapy pool temperature | hydrotherapy "32-40ºC"; conventional 28, leisure 29, spa 40 | arch_r2_carbonTrustCTV058 | p. 24, Table 3 | government-funded guide (UK) | 70 |
| Therapy pool temperature | "maintained between 32° - 36°C" | arch_r2_schnAquaPhysio2024 | Background, p. 3 | hospital procedure (Australia, public health network) | 65 |
| Therapy pool, Canadian example | Hamilton Health Sciences pool "34o C (94oF)" | arch_r2_hhsHydro2019 | patient leaflet | operator claim (hospital) | 50 |
| Therapy pool in BC | BC caps pool water at 37 °C (already sourced, arch_bcPoolReg296), so a BC therapy pool runs 32–37 °C (our reading) | — | — | our reading | 60 |
| Pool hall air | "1ºC above the water temperature" | arch_r2_carbonTrustCTV058 | p. 24 | government-funded guide | 70 |
| Finnish swimming hall on district heat | normal pool setpoint "26.5 °C" | arch_r2_yuanDR2021 | abstract | peer-reviewed | 70 |
| Peak heat per m² of water | ? (not in Li 2021 review; ASHRAE Handbook paywalled) | — | — | — | — |
| Supply temperature for pool heat exchanger | ? (no primary source; only pool water ≤37 °C (BC) and 25–28 °C (Swimming Canada)) | — | — | — | — |
| Lifesaving Society public standard | national pool page has no temperature, bather load or deck figures | — | — | — | — |

### Refuge

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Cooling room capacity (COVID-era, Toronto) | "does not exceed 50% capacity or 1,000 people (whichever is less)"; 50 % of fire-code occupant load; 2 m distancing | arch_r2_torontoCooling2021 | fact sheet, rev. 28 Jul 2021 | government guide (pandemic rule, ON) | 45 |
| Peak heating, upper bound for a very efficient room | "heating load ≤ 10 W/m²" of treated floor area (Passive House, non-residential) | arch_r2_phiNonRes2013 | s. 1, pp. 1–2 (2013 criteria, archived edition) | standard body criterion (DE) | 60 |
| Cooling / clean-air m² per person, BC or Alberta | ? (Fraser Health page 404; Health Canada archive page has none) | — | — | — | — |
| Typical peak W/m², small assembly room (Vancouver/Edmonton) | ? (ZEBP target study models residential only) | — | — | — | — |

## Task B: weak sources

| weak id | result | new id(s) |
|---|---|---|
| arch_rbwmFOIdeepGreen2023 | No stronger copy. Same figures (222,000 kWh gas; 139,284 kWh; 62 %) appear only in other FOI requests (Coventry, Wigan), relayed from BBC/East Devon. Council replies do not confirm them. Keep as operator claim, conf 30. Peer-reviewed data-centre-to-pool case added: Oró et al. 2018 (metadata only, abstract not readable). | arch_r2_coventryFOI2023; arch_r2_oro2018 |
| arch_ubcSeedsPool2010 | 28 °C water: replaced by Swimming Canada 25–28 °C and Carbon Trust CTV058 28 °C (conventional). 14,000 GJ/yr and HX rating: no stronger Canadian source; keep as student report, conf 30–35. | arch_r2_swimCanFacility2023; arch_r2_carbonTrustCTV058 |
| arch_benakcha2025 | Now cited as *Solar Energy* 2026 in the reference list of E3S Web Conf. 710:02002 (2026); journal version not seen (?). Its 208 MWh figure comes from Yuan et al. 2021 (*Building and Environment* 205:108189, peer-reviewed); full text blocked, figure not confirmed there (?). | arch_r2_e3s710; arch_r2_yuan2021Review |
| arch_carbonTrustCTG009 | Official CTG009 not found on carbontrust.com. Official Carbon Trust copy found for the same temperatures: CTV058 v3 Hospitality guide (Mar 2018), p. 24. Use it; keep CTG009 only for per-use rows (27/30 °C) not in CTV058. | arch_r2_carbonTrustCTV058 |
| 4,300–5,200 kWh/m²·yr | Original: Trianti-Stourna et al., Energy and Buildings 27(2):123–135, 1998 (Greek pool audits). Abstract has no kWh/m² figure; full text paywalled (Elsevier). Li et al. 2021 cite the same paper for "600 kWh/m2 to 6,000 kWh/m2" and Kampel (Norway) for "3,991 kWh/m2", neither stating the area basis. Basis (water vs building) still ?. Treat as total facility energy, not heat. | arch_r2_trianti1998; arch_r2_li2021Review |

## Still "?"
- Pool: peak W/m² of water; heat-exchanger supply temperature; basis of 4,300–5,200 kWh/m².
- Laundry: Canadian sizes; data-centre or district-heat-to-laundry precedent; Edmonton drainage clause.
- Greenhouse: Vancouver/Edmonton community greenhouse sizes; Venlo/quonset ratios; BC Ministry/BCGGA annual figure.
- Refuge: BC/AB cooling and clean-air m² per person; typical peak W/m².

## Blocked or paywalled (not circumvented)
- doi.org/10.1016/S0378-7788(97)00041-8 (Trianti-Stourna): fetch refused; journal paywalled.
- research.aalto.fi Yuan 2021 accepted-manuscript PDF: fetch refused.
- orbit.dtu.dk ECOS 2020 paper PDF: site error.
- researchgate.net (Kampel 2013): site error.
- Ontario O. Reg. 502/24 page: no text returned.
- Logged in paywalled_standards.md: ASHRAE Handbook (pool chapter), AS 3979, VDI 2089-1, CSA Z8000.
