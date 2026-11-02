# Fish farm (RAS): which species? Warm-water heat user or cold-water cooling load

Research 2 Nov 2026 per BRIEF.md. New ids → `fish_species_sources.json` (`arch_fish_*`). Reused from prog_wet.md (not repeated): arch_wet_faoTilapia, arch_wet_faoTrout, arch_wet_abFishCulture, arch_wet_geofood2022, arch_wet_song2019, arch_wet_ntnuRAS, arch_wet_badiola2018, arch_wet_dfoSAR2008, arch_wet_dfoIMAP2016, arch_wet_dfoApp14211, arch_wet_dfoAuthBC2025, arch_wet_dfoLicence2024, arch_wet_bcLBFWCR, arch_wet_greenMountain2021.

Labels: "?" = not found. "our reading" = interpretation. "our arithmetic" = derived here.

## Key findings first

- **Heat users:** tilapia (best **28 °C**), barramundi (max growth **~31.4 °C**), African catfish (~30 °C), channel catfish (**26–30 °C**). Tanks sit at 25–31 °C, so the data centre's 25–35 °C air-side heat or 45–60 °C liquid-cooling heat can heat them (our reading).
- **Cooling loads:** trout (**13–18 °C**), coho (**10–14 °C**), char (**12–15 °C**), Atlantic salmon (~15 °C at Kuterra). In summer they add to heat rejection. In winter they still take some heat for make-up water (our reading).
- **Legal in both BC and AB:** rainbow trout, Arctic char, coho (AB Table 1; BC licensable, our reading). Tilapia and barramundi are on AB Table 1. In BC they are not banned, but a new species needs an ITC review (?).
- **Out:** channel catfish (all Ictaluridae are banned in BC; not on AB Table 1). Atlantic salmon, sturgeon and African catfish are not on AB Table 1.
- **Precedent with data-centre heat:** only operator claims (Green Mountain, Norway) and second-hand mentions in a peer-reviewed paper (China fish pond, eel farm; no figures). No primary peer-reviewed or Canadian case was found.

---

## 1. Nile tilapia (*Oreochromis niloticus*): heat user

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Optimum | "25°C–30°C"; "greatest success at 28°C" | arch_fish_omafraTilapia | p. 2 | government guide (ON) | 85 |
| Preferred / lethal | preferred 31–36 °C; lethal 11–12 °C and 42 °C | arch_wet_faoTilapia | Biological features | FAO fact sheet | 80 |
| Low limits | <20 °C loss of appetite; <16 °C "stop feeding"; <12 °C "mortality can occur" | arch_fish_omafraTilapia | p. 2 | government guide | 85 |
| AB 2006 profile | "25 to 30°C", "usually in tanks" | arch_fish_abProfile2006 | p. 6 | government (AB; 2006) | 70 |
| AB legal | Table 1, Cat. 1 "Tilapia (contained waters only)"; also Cat. 2 | arch_wet_abFishCulture | Table 1 (re-read 2 Nov 2026) | government | 90 |
| BC legal | not on the Controlled Alien Species Regulation fish list (Sched. 3). Needs a DFO land-based licence; "Species intended for culture other than species currently licensed by DFO" need an ITC review. Whether tilapia is currently licensed in BC: ? (DFO licence CSV blocked) | arch_fish_bcCAS; arch_fish_bcLBGuide2017; arch_fish_dfoITC; arch_wet_dfoAuthBC2025 | Sched. 3; guide p. 26 | rule / government guide | 70 |
| Canadian farms | ON: "first began in 1994"; "Since 2010, domestically produced fingerlings have no longer been available in Ontario" | arch_fish_omafraTilapia | p. 2 | government | 80 |
| Canadian farms (AB) | CDC South, Brooks (AB research, aquaponics): pilot "3.7 tons year-1", "Total volume – 73 m3", plant area 84 m²; commercial model "36 tonnes" per year on "1,000m2" | arch_fish_savidov2015 | slide "Parameters of the pilot-scale system in Brooks, Alberta"; tilapia production model slide (no slide numbers shown) | government researcher presentation | 60 |
| Canadian farms (MB) | tilapia, hybrid striped bass, channel catfish and barramundi "grown successfully in RAS operations for several decades" (not tilapia alone); no Canadian farm named | arch_fish_mbReport2024 | p. 14 | government-commissioned report | 60 |
| Energy per tonne | electricity **3,086 kWh/t** live weight, which includes heating, lighting and ice; heating "not possible to separate"; water ~30 °C; Sweden (benchmark outside Canada) | arch_fish_bergman2020 | Table 1; Methods | peer-reviewed | 80 |
| Heat supply temp. | heating water 35–45 °C (NL research RAS) | arch_wet_geofood2022 | p. 15 | research report (WUR) | 65 |
| Heat kWh per t or per m³ (heat only) | ? (GeoFood gives W/m² equations and graphs only; Energy Reports 2022 abstract has no figures) | arch_wet_geofood2022 | p. 15 | — | — |
| Tank density | 60–120 kg/m³ (FAO); ≤100 kg/m³ with oxygen (OMAFRA); 60 kg/m³ before slaughter (Sweden) | arch_wet_faoTilapia; arch_fish_omafraTilapia; arch_fish_bergman2020 | — | FAO / gov. / peer-reviewed | 80 |
| Tank volume per t/yr | **~20 m³** per t/yr (73 m³ ÷ 3.7 t/yr, our arithmetic, Brooks pilot) | arch_fish_savidov2015 | pilot-system slide | our arithmetic | 50 |
| Area per t/yr | **33 m²·a per t** grow-out land (Sweden); **~28 m²** per t/yr (1,000 m² ÷ 36 t, our arithmetic, AB model) | arch_fish_bergman2020; arch_fish_savidov2015 | Table 1; tilapia model slide | peer-reviewed / our arithmetic | 60 |

## 2. Barramundi (*Lates calcarifer*): heat user

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Optimum | max specific growth rate at **~31.4 °C** (21–39 °C tested in 3 °C steps, 3–5 g juveniles) | arch_fish_katersky2007 | abstract | peer-reviewed | 75 |
| Tolerable / lethal | ? (FAO gives no grow-out range; cold limits farming in southern Australia, no number) | arch_fish_faoBarra | Habitat and biology | FAO fact sheet | — |
| RAS density | "about 15 kg/m³" | arch_fish_faoBarra | Ongrowing techniques | FAO fact sheet | 75 |
| AB legal | Table 1, Cat. 2 "Barramundi" | arch_wet_abFishCulture | Table 1 | government | 90 |
| BC legal | not on CAS Sched. 3; new species → ITC review (?) | arch_fish_bcCAS; arch_fish_bcLBGuide2017 | Sched. 3; p. 26 | rule / guide | 60 |
| Canadian farms | ? none found in government or peer-reviewed sources | — | — | — | — |
| Energy, area | ? | — | — | — | — |

## 3. Catfish: heat user (legal problems)

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Channel catfish temp. | grow-out water "ideally 26-30 °C"; RAS "has been attempted", few economic farms | arch_fish_faoCatfish | Production systems | FAO fact sheet | 75 |
| African catfish (*Clarias*) temp. | ~30 °C farm water (Sweden) | arch_fish_bergman2020 | Methods | peer-reviewed | 75 |
| African catfish energy | electricity **771 kWh/t** (incl. heating); 250 kg/m³ before slaughter; **15 m²·a per t** | arch_fish_bergman2020 | Table 1; Results | peer-reviewed | 80 |
| BC legal: channel catfish | **banned.** "All fish species of the family Ictaluridae [including bullheads, channel catfish and madtoms]"; "must not possess" | arch_fish_bcCAS | Sched. 3 s. 1(5); s. 7(1) | rule | 95 |
| BC legal: African catfish | not listed in Sched. 3; ITC review ? | arch_fish_bcCAS | Sched. 3 | rule | 60 |
| AB legal | no catfish on Table 1 → "A licensing will not be issued" | arch_wet_abFishCulture | Table 1 | government | 90 |
| Canadian farms | ? | — | — | — | — |

## 4. Atlantic salmon (*Salmo salar*): cooling load

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Temperature | sea growth best where extremes are within "6-16 °C"; eggs <10 °C; no freshwater grow-out optimum | arch_fish_faoAtlSalmon | Ongrowing; Seed supply | FAO fact sheet | 70 |
| Kuterra (BC RAS) | cohort means 13.7–15.1 °C (all-group average 14.5 °C); "15C optimum" (quarantine); mechanical-room surplus heat sent to tanks; "improving the cooling system" | arch_fish_kuterra2016 | pp. 4, 22, 30 | grant report (operator) | 55 |
| Density | ≤80 kg/m³ (small studies); nursery ≥50 kg/m³ | arch_wet_dfoSAR2008; arch_fish_faoAtlSalmon | p. 9; Nursery | government / FAO | 70 |
| BC legal | land-based Atlantic salmon licensed: Kuterra ('Namgis) "first closed containment facility designed and built in North America", "current production capacity of 250 metric tonnes" | arch_fish_dfoQP2020 | QP note, 9 Mar 2020 | government | 85 |
| AB legal | **not** on current Table 1 (the 2006 profile listed Atlantic salmon; it has since been dropped) | arch_wet_abFishCulture; arch_fish_abProfile2006 | Table 1; p. 1 | government | 85 |
| Kuterra size | design "370mt (live wt) of product per year"; tanks 250 m³ and 500 m³; 100 m³ purge; building area ? | arch_fish_kuterra2016 | pp. 3, 18, 31 | grant report | 55 |
| Electricity | 7,509 kWh/t live weight (China RAS) | arch_wet_song2019 | abstract | peer-reviewed | 75 |
| Electricity (NO) | grow-out 6–10 kWh/kg | arch_wet_ntnuRAS | listing | unconfirmed publication | 45 |
| Cooling kWh per t | ? | — | — | — | — |

## 5. Coho salmon (*Oncorhynchus kisutch*): cooling load

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Optimum | "grow best ... 9–15 °C" (FAO); RAS "10°C and 14°C" suitable; "below 4.4°C and above 15°C are not optimal" (OMAFRA) | arch_fish_faoCoho; arch_fish_omafraCoho | Ongrowing; Farming conditions | FAO / government | 80 |
| Lethal | "approximately 25°C" | arch_fish_omafraCoho | Farming conditions | government | 80 |
| AB legal | Table 1, Cat. 2 "Coho salmon" | arch_wet_abFishCulture | Table 1 | government | 90 |
| BC legal | native; farmed in BC since the early 1970s (net pens); land-based needs a DFO licence (our reading: licensable) | arch_fish_omafraCoho; arch_wet_dfoAuthBC2025 | Coho aquaculture | government | 65 |
| Canadian RAS | ON: eggs imported and "grown to market size in land-based recirculating aquaculture systems (RAS)" (no farm named) | arch_fish_omafraCoho | Coho aquaculture | government | 75 |
| Energy, area | ? | — | — | — | — |

## 6. Rainbow trout (*Oncorhynchus mykiss*): cooling load

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Optimum | "13°C–18°C" (OMAFRA); "below 21 °C" (FAO); 15 °C ideal (AB 2006) | arch_fish_omafraTrout; arch_wet_faoTrout; arch_fish_abProfile2006 | p. 2; Biology; pp. 5–6 | government / FAO | 85 |
| Tolerable | "0°C–24°C" (OMAFRA); 0–27 °C (FAO) | arch_fish_omafraTrout; arch_wet_faoTrout | p. 2 | government / FAO | 80 |
| AB legal | Table 1, Cat. 1 and 2 | arch_wet_abFishCulture | Table 1 | government | 90 |
| BC legal | licensed (FFSBC Cowichan application, flow-through) | arch_wet_dfoApp14211 | summary | government | 80 |
| Canadian farms | "Canada's most valuable freshwater aquaculture species, and Ontario is the country's largest producer"; "Rainbow trout make up the majority of Alberta's production" | arch_fish_omafraTrout; arch_fish_abProfile2006 | p. 2 | government | 80 |
| Data-centre heat | Hima / Green Mountain, Rjukan: ~9,000 t/yr | arch_wet_greenMountain2021 | release | operator claim | 35 |
| Energy, area | ? | — | — | — | — |

## 7. Arctic char (*Salvelinus alpinus*): cooling load

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Optimum | "maximum growth between 12°C–15°C"; feeds "close to zero" | arch_fish_omafraChar | p. 2 | government (ON) | 80 |
| Upper limit | ? ("cannot tolerate warmer water", no number) | arch_fish_abProfile2006 | p. 6 | — | — |
| System | "recommended to rear char using groundwater or in land-based recirculating aquaculture systems" | arch_fish_omafraChar | p. 2 | government | 80 |
| Density | economic "60–90 kg/m3"; up to 150 kg/m³ | arch_fish_omafraChar | p. 2 | government | 80 |
| AB legal | Table 1, Cat. 2 | arch_wet_abFishCulture | Table 1 | government | 90 |
| BC legal | BC guide asks for a fish health plan for "Arctic char" applications (our reading: licensable) | arch_fish_bcLBGuide2017 | p. 31 | government guide (2017) | 65 |
| Canadian farms | "Yukon, Manitoba, Ontario, Quebec, New Brunswick, Nova Scotia and Newfoundland"; MB: Sapphire Springs, "5,000 MT Arctic Char facility ... under construction" (system type not stated) | arch_fish_omafraChar; arch_fish_mbReport2024 | p. 1; p. 14 | government / gov.-commissioned | 75 |
| Energy, area | ? | — | — | — | — |

## 8. Sturgeon (white, *Acipenser transmontanus*; Siberian, *A. baerii*): cool to moderate

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Siberian range | "from only 1 °C to 25–26 °C"; RAS only "tests" | arch_fish_faoSturgeon | Habitat and biology | FAO fact sheet | 70 |
| White sturgeon optimum | ? (Aquaculture 115:297, 1993 has no abstract online; an unidentified excerpt not used) | — | — | — | — |
| AB legal | **not** on Table 1 | arch_wet_abFishCulture | Table 1 | government | 90 |
| BC legal | guide asks for a fish health plan for "White sturgeon" (our reading: licensable; native) | arch_fish_bcLBGuide2017 | p. 31 | government guide | 65 |
| Canadian farms | ? (Sechelt farm only in trade press; not used) | — | — | — | — |

---

## Comparison

| species | tank temp. | data-centre role | BC | AB | Canadian precedent (primary) |
|---|---|---|---|---|---|
| Tilapia | 25–30 °C | **heat user** | not banned; ITC ? | **yes** (contained) | ON since 1994; AB Brooks pilot |
| Barramundi | ~31 °C | **heat user** | not banned; ITC ? | **yes** | ? |
| Channel catfish | 26–30 °C | heat user | **banned** | no | — |
| African catfish | ~30 °C | heat user | ? | no | ? |
| Atlantic salmon | ~15 °C | cooling load | **yes** (Kuterra) | no | Kuterra BC, 250 t |
| Coho | 10–14 °C | cooling load | yes (our reading) | **yes** | ON RAS |
| Rainbow trout | 13–18 °C | cooling load | **yes** | **yes** | ON, AB, BC |
| Arctic char | 12–15 °C | cooling load | yes (our reading) | **yes** | YT, MB and others |
| Sturgeon | ? (1–26 °C range) | cool to moderate | yes (our reading) | no | ? |

Our reading: for **Edmonton**, tilapia or barramundi take heat and are on the AB list. For **Vancouver**, trout, char or coho are clearly licensable but add cooling load. Tilapia or barramundi would need an ITC check first.

## Waste-heat precedent

| what | value | source id | kind | conf. |
|---|---|---|---|---|
| Rjukan trout + data centre | ~9,000 t; ~800 m away; no MW | arch_wet_greenMountain2021 | operator claim | 35 |
| Norway: lobster + trout | Green Mountain to "reuse the heat from two of its rural data centres in land-based lobster and trout farming" | arch_fish_investNorway2023 | government promotion repeating operator claims | 35 |
| Peer-reviewed mention | fish and lobster farming "is tried in Norway" (no project, no figures) | arch_fish_terenius2023 | peer-reviewed (qualitative) | 50 |
| Greenhouse residual heat → tilapia | "a 6500 m2 RAS can be sustained by the residual heat of a 5 ha geothermally heated tomato greenhouse" (model) | arch_wet_geofood2022 | research report | 60 |
| Data centre heat → farm (China) | 9.6 MW data centre → dairy farm, 2,622 MWh/yr; case study has **no fish**. Introduction cites (second-hand) a Ningxia Technology Group data centre (placed in Xizang) whose heat "was able to regulate the temperature of the fish pond" and an eel farm using data-centre water (Hokkaido, Japan); no fish figures | arch_fish_chen2024 | peer-reviewed (benchmark outside Canada) | 70 |
| Canada | ? none found | — | — | — |

## Gaps (?)
- Heat-only kWh per tonne or per m³ for any warm species (Bergman bundles heat with electricity). Cooling kWh per tonne for cold species.
- Whether tilapia or barramundi is now licensed in BC (DFO licence-holder CSV blocked) and how an ITC review would rule.
- Optimum temperature for white sturgeon; upper limits for char and barramundi.
- Building area per tonne for cold species; Kuterra building area.
- Any Canadian or primary peer-reviewed data-centre-to-fish case (Chen 2024 only cites two, second-hand).

## Blocked / not read
- DFO licence-holder CSV (api-proxy.edh-cde.dfo-mpo.gc.ca): proxy refused, then permission timed out.
- OSTI (ORNL-4797; Great Basin paper): robots_disallowed.
- Energy Reports 2022 and Wiley ESS paper: client error. Lund ESS docx: proxy refused.
- Handeland 2008 (salmon optimum), Larsson & Berglund 2005 (char): abstracts not shown (paywalled / login).
- NTNU record (nva.sikt.no) and SLU record: redirect not followed.
- Alberta Agdex 2014 profile: server error.

Check 2 applied (2 Nov 2026)

Check 3 applied (2 Nov 2026)
