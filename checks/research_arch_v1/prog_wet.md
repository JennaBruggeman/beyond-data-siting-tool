# Wet programs: bathhouse / Nordic spa, therapy pool, public aquarium, fish farm (RAS)

Research 2 Nov 2026 per BRIEF_v2.md (group A). Source ids → `prog_wet_sources.json` (`arch_wet_*`). Ids from earlier files are reused, not repeated: arch_bcPoolReg296, arch_bcPoolDesign2025, arch_abPoolStd2014, arch_carbonTrustCTG009, arch_r2_carbonTrustCTV058, arch_r2_schnAquaPhysio2024, arch_r2_hhsHydro2019, arch_benakcha2025, arch_mvSewerBylaw299, arch_adj_bcPoolDesign, arch_adj_nbcAE72, arch_adj_abStandataCl, arch_adj_bcbcFarm, arch_adj_nbcPart2, arch_zon_EdmZones, arch_zon_EdmDefs, arch_vanSplash2017, and register ids van3575s2, van_zdb_i2, van_zdb_i3, van_zdb_fc2.

Labels: "?" = not found / not confirmed. "our reading" = our interpretation. "our arithmetic" = derived here. Codes read from local full texts (NBC 2020, BCBC 2024, NBC(AE) 2023); Vancouver schedules (June 2026) and Section 2; Edmonton Bylaw 20001 as adopted (amendments not checked ?).

## Key findings first

- **Heat fit.** Spa hot pools are capped at **40 °C** (BC s. 16(b); AB s. 2.2.1); therapy pools run **34.5–35 °C**; tilapia RAS was heated with **35–45 °C** water. All sit at or below data-centre liquid-cooling return (45–60 °C). Air-cooled heat (25–35 °C) needs a heat pump for all three (our reading).
- **Aquariums and cold-water fish farms mostly need cooling, not heat.** Reef HQ: HVAC ~50 % and pumps ~40 % of energy, "no central heating". Trout optimum is "below 21 °C". They add to the site's heat-rejection load (our reading).
- **Code class decides the wall.** Indoor pool = A-3 → **2 h** from F-2. A spa run as a personal service could be read as D ("Beauty parlours") → **no** separation (our reading; AHJ to confirm). Fish farm off farmland = Part 3, likely F-2 → no separation (our reading).
- **Vancouver now allows spas in 12 industrial districts** (Beauty and Wellness Centre, "limited to hydrotherapy and thermal therapy", conditional). There is no use for an aquarium or a fish farm there.
- **Edmonton BE** permits Health Service (therapy pool), Major Indoor Entertainment ("aquariums") and Urban Agriculture ("aquaponic systems"), each ≤500 m² for Health Service / Major Indoor Entertainment. There is no use defined for a spa.
- **Fish farm permits stack up.** BC: a federal DFO licence, a provincial water licence, and waste registration "before construction of the facility begins" (separate from EMA permission to release waste). AB: a provincial fish culture licence, a species list, and possibly a Water Act licence.

---

## 1. Bathhouse / Nordic spa

### Size

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver example (floating barge, Ogden Ave) | "floor area of 870 sq. m (9,365 sq. ft.) over three levels"; up to 12.1 m above water line; "hot and cold baths, saunas" | arch_wet_vanCD1Ogden | RTS 18653, 19 May 2026 | government report (rezoning) | 80 |
| Small operator outdoor area (survey) | most expected <46.5 m² (500 sq ft); a few >139 m² (1,500 sq ft) | arch_wet_vanRTS16473 | App. D p. 1 | government report (survey, not a rule) | 60 |
| Cold tub unit | ~1.8 × 0.9 × 0.9 m; most operators <5 tubs | arch_wet_vanRTS16473 | App. D p. 2 | government report (survey) | 60 |
| Sauna height | "maximum height of 3.6 m (12 ft)"; most planned 1–2 saunas | arch_wet_vanRTS16473 | App. D p. 2 | government report | 65 |
| Hot tub depth (AB) | water ≤1.2 m; to seat ≤600 mm; freeboard ≤300 mm | arch_wet_nbcAE726 | NBC(AE) 7.2.6.2.(3)–(5) | rule (AB only) | 90 |
| Hot tub deck (AB) | ≥1.8 m clear at main entry; ≥900 mm on all sides (25 % of perimeter may be <900 mm but ≥300 mm if <6 m² or no interior dimension >2.5 m, except where a ramp is incorporated) | arch_wet_nbcAE726 | 7.2.6.2.(7)–(9) | rule (AB only) | 90 |
| Hot tub bather load (BC) | "increments of 60 cm (2 ft) of bench seating per person" | arch_wet_bcPoolDesignHT | s. 8.7 | government guide | 80 |
| Change room (BC) | min. "0.32 m2/bather" | arch_wet_bcPoolDesignHT | s. 5.1 | government guide | 75 |
| Typical full Nordic spa area (Canada) | ? (Edmonton spa proposal found only in news; not used) | — | — | — | — |
| Minimum sensible size / steps | ? no source. Step unit = one hot tub (bench length 0.6 m/person) + one sauna (our reading) | — | — | — | — |

### Heat and water

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Hot tub max (BC) | "no more than 40°C" | arch_bcPoolReg296 | s. 16(b) | rule | 95 |
| Pool water max (AB, incl. whirlpools) | "must not be greater than 40 Celsius"; whirlpool = >30 °C | arch_abPoolStd2014 | s. 2.2.1; Part 2(p) | rule | 85 |
| Spa / hydrotherapy (UK) | spa 40 °C; hydrotherapy "32-40ºC" | arch_r2_carbonTrustCTV058 | p. 24, Table 3 | government-funded guide (UK) | 70 |
| Dry sauna | 80–100 °C, RH 10–20 %; steam ≤50 °C, RH 80–100 %; infrared 48–60 °C | arch_wet_ncceh2026 | p. 3 | government-funded review (NCCEH) | 75 |
| Sauna max (AB) | dry "not be greater than 85 Celsius"; steam "not be greater than 60 Celsius"; log every 24 h | arch_wet_abPoolStdSauna | s. 2.3.1–2.3.3 | rule (document marked "Archived"; still current ?) | 85 |
| Sauna heaters | CSA C22.2 No. 164 (paywalled → logged) | arch_wet_ncceh2026 | p. 4 | standard (pointer) | 60 |
| Hot tub turnover | BC: max 30 min; AB: 20 min (>4 m³) or 15 min (≤4 m³) | arch_wet_bcPoolDesignHT; arch_wet_nbcAE726 | BC s. 7.2; AB 7.2.3.30.(2)(e) | guide / rule | 85 |
| Peak kW or MWh/yr per m² or per tub | ? (no public primary source found) | — | — | — | — |
| Supply temperature | ? Our reading: >40 °C needed at the heat exchanger, so liquid-cooling heat (45–60 °C) fits; air-cooled needs a heat pump | — | — | our reading | 40 |
| Cold plunge temperature | ? (VCH draft guideline not public) | arch_wet_vanRTS16473 | App. D | — | — |

### Code

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Indoor pool class | A-3 "Indoor swimming pools, with or without spectator seating" | arch_wet_nbcA3121 | NBC A-3.1.2.1.(1) | rule (note) | 90 |
| Personal-service class | D lists "Beauty parlours", "Barber and hairdressing shops" | arch_wet_nbcA3121 | A-3.1.2.1.(1) | rule (note) | 90 |
| Separation to F-2 | A-3: **2 h**; D: **—** (none) | arch_nbc3131 | Table 3.1.3.1 | rule | 90 |
| Which class a spa is | ? Not named in any code. Our reading: rooms with pools/hot tubs = A-3; sauna and treatment rooms alone could be D | — | — | our reading | 40 |
| BC health rules | hot tub = pool under Pool Regulation; sauna = "personal service establishment" (Regulated Activities Reg. s. 2(1)); cold plunge = pool "unless they are drained, cleaned, sanitized and refilled after each use" | arch_wet_bcPoolRegDefs; arch_wet_bcRAR161; arch_wet_vanRTS16473 | s. 1, s. 2(1)(c); s. 2(1); report p. 5 | rule / government report | 85 |
| BC fence | "fence or other barrier with controlled access" around pool and walkways | arch_wet_bcPoolRegDefs | s. 7(1) | rule | 90 |
| AB health rules | Pool Standards cover whirlpools and saunas; exempt: single-family use, natural pools, pools drained after each user, floatation tanks | arch_wet_abPoolStdSauna | Part 1 | rule (marked "Archived"; still current ?) | 80 |
| AB building code | whirlpools on "independent circulation system"; emergency shut-off at poolside | arch_wet_nbcAE726 | 7.2.6.2.(2), (10) | rule | 90 |
| Vancouver licence | steam bath licence category to be removed; DP, BP, OP and business licence needed | arch_wet_vanRTS16473 | report | government report | 75 |

### Zoning

| place | use name | status | source id | where | conf. |
|---|---|---|---|---|---|
| Vancouver I-1, I-1A, I-1B, IC-1–3, I-2, I-3, I-4, M-1B, M-2, FC-2 | Beauty and Wellness Centre "limited to hydrotherapy and thermal therapy" | C (also allowed outdoors) | arch_wet_vanRTS16473 | App. A pp. 1–7 | 80 |
| Vancouver I-2 / I-3 / FC-2 (adopted June 2026) | same wording | C | van_zdb_i2, van_zdb_i3, van_zdb_fc2 | I-2 2.2.10; I-3 2.2.12; FC-2 2.2.8 | 95 |
| Vancouver I-1C | "hydrotherapy, thermal therapy" added to existing use | C | arch_wet_vanRTS16473 | App. A p. 7 | 70 |
| Vancouver definition | includes "hydrotherapy, thermal therapy"; excludes Fitness Centre | — | van3575s2 | Section 2 | 95 |
| Edmonton | no spa use. Candidates: Indoor Sales and Service ("personal service") or Minor Indoor Entertainment ("active recreation") ? | BE O (≤500 m², 3.7.1 for Indoor Sales); MU O; IM existing only; IH NP | arch_zon_EdmDefs; arch_zon_EdmZones; arch_wet_edmMU | 8.10; 2.120; 2.80 | 45 |
| Edmonton term | "Water Retention Structure" examples incl. "hot tubs, whirlpools, and spas" (a structure, not a use) | — | arch_wet_edmDefs | 8.20 | 85 |

### Adjacency

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| No siting or distance rule | none in BC Pool Reg., Regulated Activities Reg., AB Pool Standards (no siting rule found) | arch_wet_bcPoolRegDefs; arch_wet_bcRAR161; arch_wet_abPoolStdSauna | read to end | rule (absence) | 70 |
| Pool chemicals / chlorine room (AB) | see adj_programs.md (arch_adj_nbcAE72, arch_adj_abStandataCl): exhaust ≥3 m from intakes | — | — | rule | — |
| Noise / setback for outdoor spa (Vancouver) | none set; parks: "specified footprint" | arch_wet_vanRTS16473 | App. D p. 5 | government report | 70 |
| Distance to generators, coolers, loading | ? none found | — | — | — | — |
| Why industrial land (origin) | motion asked staff to find sites such as "underutilized commercial and industrial spaces" | arch_wet_vanMotionPlunge | motion text | government (motion) | 60 |

### Social fit

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver policy | "Provide accessible, therapeutic and wellness amenities connected with existing and future pools" (saunas, pools of varying temperatures) | arch_wet_vanSplashStrategy2019 | p. 67 | government strategy | 80 |
| Whirlpools | "Investigate decommissioning existing stand-alone whirlpools in community centres" | arch_wet_vanSplashStrategy2019 | p. 57 | government strategy | 80 |
| Edmonton | no spa/sauna standard in 2018 facility approach | arch_wet_edmRec2018 | read pp. 1–46 | government | 60 |
| Provision standard for spas | none found | — | — | — | — |

---

## 2. Therapy / rehab pool

### Size

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Example size | 4 × 6 m = 24 m² → 12 bathers at 2 m² each | arch_wet_atacp2019 | s. 2.6 p. 11 | design guide (UK professional body; benchmark outside Canada; applies to all ATACP rows) | 75 |
| For 100 bathers per 12 h | 5.5 × 8.5 m (≈46.75 m²) "or equivalent" | arch_wet_atacp2019 | s. 2.6 p. 11 | design guide | 75 |
| Treatment space | 2 m² per bather; water quality 2.7 m² per bather (PWTAG) | arch_wet_atacp2019 | s. 2.6 | design guide | 75 |
| Depth | adult shallow ~1 m; paediatric 0.85 m; deep >1.35 m (neuro), 1.5–1.8 m (sports) | arch_wet_atacp2019 | s. 2.7, s. 1.2 | design guide | 75 |
| Concourse | ≥2 m on 2 sides, ≥1.5 m on the others | arch_wet_atacp2019 | s. 2.6 p. 12 | design guide | 75 |
| Plant room | "typically be 15-30% of the pool water area"; not accessed from concourse | arch_wet_atacp2019 | s. 2.16 p. 19 | design guide | 75 |
| Hall | ceiling ~4.5 m above concourse | arch_wet_atacp2019 | s. 3.1 | design guide | 65 |
| Edmonton example (Glenrose) | planned rebuild: "A mid-sized therapy pool for group sessions and advanced rehabilitation" and "Two smaller precision therapy pools", "0 to 7 feet" deep; closed Nov 2024 ("structural failure"); $6.5 M; AB $3.25 M (7 Jan 2026) | arch_wet_glenrose | page | operator claim (hospital foundation) | 45 |
| BC regulated minimum | public pool ≥61 cm deep incl. "physiotherapy purposes" | arch_wet_bcPoolRegDefs | s. 1 | rule | 90 |
| **Minimum sensible size (proposal)** | 4 × 6 m = 24 m² water, 12 bathers (ATACP example); Canadian min. ? | arch_wet_atacp2019 | s. 2.6 | design guide (benchmark) | 55 |

### Heat

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Water | 32–35.5 °C, ideal 34.5–35.5 °C; heat exchanger to hold 32–35.5 °C, ideally 34.5–35 °C | arch_wet_atacp2019 | p. 5; s. 2.16 p. 20 | design guide | 75 |
| Other sources | 32–36 °C (Aus.); 34 °C (Hamilton); BC cap 37 °C | arch_r2_schnAquaPhysio2024; arch_r2_hhsHydro2019; arch_bcPoolReg296 | — | (earlier files) | 65 |
| Air / humidity | air ~25–30 °C, not >5 °C below water; RH ≤60 % | arch_wet_atacp2019 | s. 3.1 p. 21 | design guide | 75 |
| Ventilation | 10 L/s per m² of water + wet surrounds; 6 ACH | arch_wet_atacp2019 | s. 3.1 | design guide | 70 |
| Heat loss | warmer water → "heat loss and humidity are greater"; heat recovery "up to 95%" of ventilation heat | arch_wet_atacp2019 | s. 5 p. 24 | design guide | 60 |
| Showers | thermostatic valve max 43 °C | arch_wet_atacp2019 | s. 2.12 | design guide | 70 |
| Turnover | AB special purpose pool ≤2 h; BC therapeutic pools 30 min | arch_wet_nbcAE726; arch_wet_bcPoolDesignHT | 7.2.3.30.(2)(b); s. 7.2 | rule / guide | 85 |
| Peak kW, MWh/yr per m² | ? (lap pool at 27 °C: ≈416 kWh heat/m²·yr, our arithmetic from arch_benakcha2025; therapy pool higher, no figure) | — | — | — | — |
| Supply temperature | ? Our reading: ≥~40 °C at exchanger serves 35 °C water; liquid-cooling heat fits | — | — | our reading | 40 |

### Code

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Stand-alone pool | A-3 → **2 h** from F-2 | arch_wet_nbcA3121; arch_nbc3131 | A-3.1.2.1.(1); Table 3.1.3.1 | rule | 90 |
| Inside outpatient clinic | clinic = D ("Medical offices"; D/F-2 none); pool part still A-3 ? | arch_wet_nbcA3121 | A-3.1.2.1.(1) | our reading | 50 |
| Inside rehab centre with treatment | B-2 ("Convalescent/recovery/rehabilitation centres with treatment") → 2 h | arch_wet_nbcA3121; arch_nbc3131 | — | rule | 85 |
| AB term | "Special purpose swimming pool" = for "healing or therapy"; Part 7 applies if not drained after every use | arch_wet_nbcAE726 | Div. A 1.4.1.2; 7.2.6.1 | rule (AB only) | 90 |
| BC | no therapy exemption; "physiotherapy purposes" inside public-pool definition | arch_wet_bcPoolRegDefs | s. 1, s. 2(1) | rule | 85 |

### Zoning

| place | use name | status | source id | where | conf. |
|---|---|---|---|---|---|
| Vancouver I-2 | Health Care Office (incl. "physical therapists") | C | van_zdb_i2; van3575s2 | s. 2.1 | 80 |
| Vancouver I-3 | Health Care Office only sub-area A; "not permitted at the ground floor, except for entrances" | C | van_zdb_i3 | 2.2.6 | 90 |
| Vancouver FC-2 | Health Care Office only sub-areas A and E | C | van_zdb_fc2 | 2.1, 2.2.4 | 85 |
| Vancouver "Swimming Pool" use | not listed in I-2, I-3, FC-2 → NP | — | van_zdb_i2/i3/fc2 | 2.1 | 80 |
| Pool as part of a physio clinic | ? our reading: accessory to Health Care Office | — | — | our reading | 40 |
| Edmonton | Health Service: out-patient services "of a preventive, diagnostic, treatment, therapeutic, rehabilitative ... nature" | BE O, ≤500 m² (3.3.1); MU O; IM/IH NP | arch_wet_edmDefs; arch_zon_EdmZones; arch_wet_edmMU | 8.10; 2.120 3.3.1; 2.80 2.8 | 85 |

### Adjacency and social fit

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Plant room | "as close as possible to the pool" | arch_wet_atacp2019 | s. 2.16 | design guide | 75 |
| Changing | Changing Places 3 × 4 m with hoist; 1 toilet per 6 people | arch_wet_atacp2019 | s. 2.11–2.12 | design guide | 70 |
| Distance to plant, street, loading | ? none found | — | — | — | — |
| Vancouver provision | "Therapy and Rehab" offered at Medium and Large pools, not Small; catchments 2 / 3 / 4 km | arch_wet_vanSplashStrategy2019 | p. 20, p. 75 | government strategy | 80 |
| Edmonton | indoor recreation "within 5 kilometres of their residence"; no therapy pool standard | arch_wet_edmRec2018 | p. 34 | government | 70 |

---

## 3. Public aquarium

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Benchmark (Reef HQ, Townsville) | ~5,400 m² building; 2,345 m² air-conditioned; 775 m² under the two main tanks; ~4 ML seawater (reef exhibit 3.2 ML) | arch_wet_thyer2018 | text | peer-reviewed (Aus. benchmark) | 80 |
| Energy | baseline 2,438 MWh/yr electricity = **451 kWh/m²·yr**; later 1,160 MWh | arch_wet_thyer2018 | text (2,348 MWh also cited: conflict) | peer-reviewed | 70 |
| Split | HVAC "about 50%"; pumps/compressors ~40 %; "no central heating" | arch_wet_thyer2018 | text | peer-reviewed | 75 |
| Water temperatures | tanks <28 °C; reef set-point 27 °C; chilled store 6–15 °C | arch_wet_thyer2018 | text | peer-reviewed | 75 |
| Cold-water species (BC) | ? (rockfish mortality rose >14 °C at a US aquarium: student project, not used) | — | — | — | — |
| Vancouver Aquarium size | ? (Park Board 2007 memo gives no total area) | arch_wet_vanAq2007 | memo | government | — |
| Minimum size / steps | ? | — | — | — | — |
| Heat need | our reading: mainly a **cooling** load (chillers), not a heat user; tropical tanks may take low-grade heat in winter ? | arch_wet_thyer2018 | — | our reading | 40 |
| Code class | not named; Museums / Art galleries = A-2 → **2 h** from F-2 (our reading) | arch_wet_nbcA3121; arch_nbc3131 | A-3.1.2.1.(1) | our reading | 55 |
| Vancouver zoning | no "aquarium" term; nearest: "Zoo or Botanical Garden", "Museum or Archives" (Cultural and Recreational) → not listed in I-2, I-3, FC-2 → NP | van3575s2; van_zdb_i2/i3/fc2 | Section 2; s. 2.1 | rule | 75 |
| Edmonton zoning | Major Indoor Entertainment, examples incl. "aquariums": BE O ≤500 m² (3.3.1); MU O ≤500 m² "except where located on a Site greater than 1 ha" (3.10.1); IM/IH NP; variance possible (3.18) | arch_zon_EdmDefs; arch_zon_EdmZones; arch_wet_edmMU | 8.10; 2.120; 2.80 | rule | 90 |
| AB licence | Zoo Permit (Wildlife Act); "animal" excludes fish; fish collection needs a water-quality protocol | arch_wet_abZooStd2015 | s. IV.D; s. III.E (Jan 2015) | government standard (marked "Archived"; still current ?) | 80 |
| AB backup | systems for "heating, cooling, aeration, filtration" must have "warning devices and have emergency backup systems"; plan for "power outage" | arch_wet_abZooStd2015 | s. III.E | government standard (archived; currency ?) | 85 |
| BC licence for display fish | ? not found | — | — | — | — |
| Adjacency | no distance rule found. Our reading: shares the data centre's standby power (a benefit), but its life support needs its own alarms | arch_wet_abZooStd2015 | s. III.E | our reading | 40 |
| Social fit / catchment | none found (Edmonton: "typically a regional or city attraction") | arch_wet_edmDefs | Major Indoor Ent. def. | rule (definition) | 60 |

---

## 4. Fish farm (land-based RAS)

### Size and output

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Tilapia RAS yield | "60 to 120 kg/m3 of rearing tank volume"; nursery 1,000 fish/m³ → 50 g in 12 weeks | arch_wet_faoTilapia | Production systems | intergovernmental fact sheet (FAO) | 80 |
| Salmon density | 80 kg/m³ max without growth impact (small studies) | arch_wet_dfoSAR2008 | p. 9 | government (DFO CSAS) | 70 |
| Recirculation | "98% recirculation system" in a DFO land-based case | arch_wet_dfoSAR2008 | p. 12 | government | 65 |
| BC scale | DFO licenses ~110 freshwater/land-based facilities; RAS listed 18 times among authorized culture types (Jan 2016; 18 authorizations, not 18 unique licences) | arch_wet_dfoIMAP2016 | plan | government | 80 |
| Small BC example | FFSBC Cowichan: 0.92 t/yr, flow-through; buildings and tanks >30 m from water | arch_wet_dfoApp14211 | application summary (27 Feb 2026) | government | 75 |
| Large precedent with data-centre heat | Hima / Green Mountain, Rjukan: ~9,000 t trout/yr; data centre ~800 m away | arch_wet_greenMountain2021 | press release 28 Jun 2021 | operator claim | 35 |
| Floor area per tonne / minimum size | ? (DFO gives tank counts only) | — | — | — | — |

### Heat, energy, water

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Tilapia temperature | lethal 11–12 °C and 42 °C; preferred 31–36 °C | arch_wet_faoTilapia | Biological features | FAO fact sheet | 80 |
| Trout temperature | optimum "below 21 °C"; criterion 12–21 °C; growth 9–14 °C | arch_wet_faoTrout | Biology; site table | FAO fact sheet | 80 |
| AB allowed species | e.g. tilapia ("contained waters only"), rainbow trout, Arctic char, barramundi, Pacific white shrimp | arch_wet_abFishCulture | Table 1 | government | 85 |
| Heating supply used (tilapia RAS, NL) | "heating temperature ... ranged between 35-45 °C"; residual greenhouse heat can supply it | arch_wet_geofood2022 | text | research report (WUR) | 65 |
| Electricity, salmon RAS | 7,509 kWh farm-level per tonne live weight (=7.5 kWh/kg) | arch_wet_song2019 | abstract | peer-reviewed | 75 |
| Electricity, Norway (salmon) | smolt 5.1–12.8 kWh/kg (mean 8.8); grow-out 6–10 kWh/kg | arch_wet_ntnuRAS | NTNU web listing (no authors, venue, year or DOI shown) | unconfirmed publication (not peer-reviewed as far as shown) | 50 |
| RAS energy overall | "high energy requirement is a drawback" (no figures in abstract) | arch_wet_badiola2018 | abstract | peer-reviewed | 60 |
| DFO | "Reclamation of heat could help to lower the costs" | arch_wet_dfoSAR2008 | p. 15 | government | 65 |
| Heat kWh per kg or per m³ tank | ? (Energy Reports 2022 paper: no figures in abstract) | — | — | — | — |
| Our reading | warm species (tilapia, barramundi, shrimp) = heat user at 35–45 °C; cold species (trout, char, salmon) need cooling in summer | — | — | our reading | 50 |

### Code

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| NBC 2020 | G-2 incl. "facilities for cultured fish and shellfish" | arch_wet_nbcPart2G | Note A-2.1.4.1.(1) | rule (note) | 90 |
| Scope of Part 2 | applies only to farm buildings of low human occupancy ("not more than 1 person per 40 m2"); a public-facing fish farm would fall outside it | arch_wet_nbcPart2G | Note A-2 | rule (note; scope) | 85 |
| But only on farmland | agricultural occupancy = "located on land that is associated with and devoted to the practice of farming" | arch_wet_nbcPart2G | Div. A 1.4.1.2 | rule | 90 |
| BCBC | farm building must be "located on land devoted to the practice of farming" | arch_adj_bcbcFarm | Div. A 1.4.1.2 | rule | 90 |
| AB | no Group G (adj_occupancy.md) | — | — | rule | 80 |
| Urban site → Part 3 | not listed; nearest F-2 "Factories", "Cold storage plants" → F-2/F-2 **no separation** (our reading) | arch_wet_nbcA3121; arch_nbc3131 | — | our reading | 50 |
| If G-2 did apply | G-2/F-2 "–"; G-2 building "shall not contain" A-1, A-3 or B | arch_wet_nbcPart2G | Table 2.2.1.4; 2.2.1.2.(2) | rule | 90 |

### Zoning

| place | use name | status | source id | where | conf. |
|---|---|---|---|---|---|
| Vancouver | Urban Farm - Class B = "cultivation of fruits or vegetables" → fish excluded | C in I-2, I-3, FC-2 (plants only) | van3575s2 | Section 2 | 90 |
| Vancouver | Food or Beverage Products Manufacturing - Class A (Class B excludes "the use of fish, or the use of live animals") | C in I-2 and FC-2; I-3 only existing as of 20 Jul 1999 | van3575s2; van_zdb_i2/i3/fc2 | s. 2.1 | 80 |
| Vancouver: is fish rearing "manufacturing"? | ? our reading: no clear use → rezoning/CD-1 or Director's interpretation | — | — | our reading | 35 |
| Edmonton | Urban Agriculture: "growing fruits, vegetables, plants, or raising chickens or bees"; examples "hydroponic or aquaponic systems" | BE O (2.25), IM O (2.16), MU O (2.28); IH NP | arch_wet_edmDefs; arch_zon_EdmZones | 8.10 | 85 |
| Edmonton: fish-only RAS | ? not in the definition; Agriculture ("raising animals ... within a rural context") not in these zones. Our reading: aquaponics fits; fish-only may be deemed (s. 7.20 3.3.2 → discretionary) | arch_zon_Edm720 | — | our reading | 40 |

### Permits (system side)

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| BC, federal | "Federal freshwater/land-based aquaculture licence issued under the Fisheries Act" (DFO); Transport Canada also listed | arch_wet_dfoAuthBC2025 | "Federal/provincial authorizations for land-based aquaculture facilities in B.C." (version 1 Jul 2025, released Sep 2025) | government | 85 |
| BC licence terms | escapes: designed "to prevent escapes", inspect "at least weekly", report within 24 h; screens for wild fish; detail for infrastructure "within 30m of aquatic habitat" | arch_wet_dfoLicence2024 | Part B 4.1–4.5; App. 1 | rule (licence conditions) | 80 |
| BC licence term | max 9 years | arch_wet_dfoIMAP2016 | plan | government | 75 |
| BC, water | Ministry of Water, Land and Resource Stewardship: "A licence is required to divert, use or store surface or ground water" | arch_wet_dfoAuthBC2025 | infographic | government | 80 |
| BC, waste (infographic) | two items: MOECCS "Registration required ... prior to construction" (finfish waste); EMA "written permission is required prior to releasing waste into the environment" | arch_wet_dfoAuthBC2025 | infographic | government | 80 |
| BC, waste | registration "before construction of the facility begins" (s. 4(1)); limits: non-filterable residue 10 or 20 mg/L, total P 0.1 or 0.2 mg/L (dilution <20:1 or ≥20:1); no detectable chlorine; no solids, backwash, dead fish; no temperature limit; no sewer exemption | arch_wet_bcLBFWCR | ss. 3, 4, 6, 7 | rule | 90 |
| Sewer (Metro Van.) | non-domestic waste <65 °C; mixed flow <40 °C | arch_mvSewerBylaw299 | Sched. A s. 4 | rule | 90 |
| AB | commercial fish culture licence ($500 / 5 yr) to sell fish; species only from Table 1; Water Act licence may be needed; commercial sites may get biosecurity inspection | arch_wet_abFishCulture | page (9 Jul 2026) | government | 85 |
| Edmonton sewer temperature | ? (Drainage bylaw blocked earlier, see pool_laundry.md) | — | — | — | — |

### Adjacency and social fit

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Distance rule to plant, street, housing | none found; Vancouver I-2/I-3 bar outdoor "fish, fish oil or meal" storage (bulk-goods clauses; our reading of their relevance ?) | van_zdb_i2; van_zdb_i3 | s. 2.2 | rule | 40 |
| Oxygen / ozone storage | ? (fire code not searched for LOX; follow-up) | — | — | — | — |
| Social fit | no provision standard found; food-security plans not searched ? | — | — | — | — |

---

## Gaps (?)
- Heat demand (peak kW, MWh/yr per m² or per unit) for spa hot pools, therapy pools and RAS tanks: no public primary figure found.
- Typical Canadian Nordic spa size (only the Vancouver barge, 870 m²); minimum spa size.
- Code class of a spa (A-3 or D) and of a fish farm off farmland: no code text; AHJ ruling needed.
- Vancouver: no use name for an aquarium or a fish farm in industrial districts.
- Edmonton: no use for a spa; fish-only RAS not in the Urban Agriculture definition.
- BC licence for display fish (aquarium); cold plunge temperature (VCH draft not public); Edmonton sewer temperature limit.
- Aquarium size and energy for a Canadian cold-water aquarium (only a tropical Australian benchmark).
- NTNU salmon energy paper: full citation not confirmed; web listing shows no authors, venue, year or DOI, so not labelled peer-reviewed.
- Alberta Pool Standards (2014) and Zoo Standards (2015): both marked "Archived" on open.alberta.ca; whether still current ?
- No distance rules found between any of the four programs and generators, coolers, transformers or loading docks.

## Paywalled / blocked
- CSA C22.2 No. 164 (sauna heaters): paywalled, not read.
- Badiola et al. 2018 full text (Elsevier): abstract only.
- FAO tilapia page at fao.org (no www): fetch refused; the www. copy was read.
- Bath & NE Somerset warm-water pools paper: robots_disallowed.
- BC Guidelines for Pool Design ss. 9.8–9.9 (equipment / chemical rooms): text cut off in the fetch, not read.
- Edmonton Nordic spa and Glenrose pool: only news or foundation pages found; news not used.

Check 2 applied (2 Nov 2026)

Check 3 applied (2 Nov 2026)
