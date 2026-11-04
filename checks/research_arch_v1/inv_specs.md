# Inventory specs: every facility (3 Nov 2026)

Brief: BRIEF_inventory_specs_2026-11-03.md. New ids are in inv_specs_sources.json (`arch_inv2_*`). Reused ids come from inv_van / inv_edm sources and the register.
Kinds: OC = operator claim · BRK = broker · ENG = engineer or contractor claim · GOV = council, bylaw or permit · REG = AUC / IAAC · UTIL = BC Hydro · INST = university. "?" = not found.
Not repeated here (already covered from J.B.'s uploads): Cologix VAN1–5, eStruxture VAN-1 and VAN-2, Hut 8 Vault and VAN2, the CWH Vancouver page, Spencer Colo5. Nothing newer was found for them.
Fields not listed under a facility were not found. That includes coordinates for every Vancouver row; for rural Edmonton rows only the AUC legal land is known.

## Metro Vancouver

**VAN-3 · eStruxture (4590 Canada Way, Burnaby)**
| what | value | source id | where | kind |
|---|---|---|---|---|
| site power | "13MW" (sheet: 10 MW) | arch_inv2_estruxVan3Web | spec list | OC |
| floor area | 55,000 ft² | arch_inv2_estruxVan3Web | spec list | OC |
| density | "150kW+ per cabinet" | arch_inv2_estruxVan3Web | spec list | OC |
| cooling | "High-density air and liquid cooling options"; "N+1 free cooling design" | arch_inv2_estruxVan3Web | spec list | OC |
| UPS / generators | "N+1 UPS solution"; diesel backup, count ?; "48 hours of fuel capacity" | arch_inv2_estruxVan3Web | spec list | OC |
| utility | "multiple utility feeds" (sheet: 25 kV, single entrance) | arch_inv2_estruxVan3Web; arch_inv_estruxVan3Sheet | — | OC |
| water | "air and liquid cooling instead of the local public water supply" | arch_inv2_estruxBlogApr2026 | blog | OC |
| status | "our doors are opening soon" (22 Apr 2026) | arch_inv2_estruxBlogApr2026 | blog | OC |
Not found: PUE, fire, seismic, flood, heat reuse.

**VA1 · Equinix (4185 Still Creek Dr, Unit B, Burnaby)**
| what | value | source id | where | kind |
|---|---|---|---|---|
| area / building | 343 m²; "2-Story, Reinforced concrete" | arch_inv2_equinixVa1Spec | specs table | OC |
| power | UPS N; 120/208 V; minimum 5 kVA per cabinet | arch_inv2_equinixVa1Spec | specs table | OC |
| cooling / generators | cooling N+1; generators N+1, autonomy "Unknown" | arch_inv2_equinixVa1Spec | specs table | OC |
| fire | "Double Interlock Pre-Action"; VESDA | arch_inv2_equinixVa1Spec | specs table | OC |
| flood | "Not Applicable" | arch_inv2_equinixVa1Spec | specs table | OC |
Not found: MW, PUE, year, utility.

**Uniserve VAN-1 (333 Terminal) and VAN-2 (369 Terminal)**
- No new primary source. The operator newsroom items are already in inv_van (arch_inv_uniserve2mw, arch_inv_uniserveOtl).
- LEAD only (news and a directory, not read): headlines say "1MW" and a "Q4 2026 launch".
- Not found: MW, cooling, generators, fuel, fire.

**Coquitlam DC · Canadian Web Hosting / eSecureData DC3 (1478 Hartley Ave)**
| what | value | source id | where | kind |
|---|---|---|---|---|
| area | "7600 square foot custom facility" | arch_inv2_esecureDcPage | page | OC |
| power | "100% BC Hydro power", UPS, "fully tested diesel generators" (count ?) | arch_inv2_esecureDcPage | page | OC |
| fire | "Pre-action dry pipe sprinkler system with clean agent fire extinguishers" | arch_inv2_esecureDcPage | page | OC |
| structure | bedrock, reinforced concrete block | arch_inv_esecureDc3 | page | OC |
Not found: kW, fuel, cooling type, year.

**UBC University Data Centre (Pharmaceutical Sciences Building, 2405 Wesbrook Mall)**
| what | value | source id | where | kind |
|---|---|---|---|---|
| location | "a data centre in the basement" | arch_inv2_bchUbcSuccess | case study | UTIL |
| heat reuse | "capturing waste heat from the data centre and recycling it into the building" | arch_inv2_bchUbcSuccess | case study | UTIL |
| size | 5,000 ft², 110 racks | arch_inv_ubcItColo | page | INST |
| building | 246,000 ft²; opened 2012 (18 Sep 2012) | arch_inv2_ubcPharmBldg; arch_inv2_bchUbcSuccess | — | INST / UTIL |
Not found: kW, cooling type, PUE, generators.

**SFU Water Tower Building (Cedar), Burnaby Mountain**
| what | value | source id | where | kind |
|---|---|---|---|---|
| area | 22,000 ft² | arch_inv2_snaSfuWeb | page | ENG |
| utility / UPS | one 2.0 MVA unit sub; "550kVA (n+1)" UPS | arch_inv2_snaSfuWeb | page | ENG |
| generators | two 1 MVA diesel | arch_inv2_snaSfuWeb | page | ENG |
| PUE | "target of 1.097" (design) | arch_inv2_snaSfuWeb | page | ENG |
| PUE | "1.07" (design or measured ?) | arch_inv2_sfuNewsFeb2026; arch_inv_bchSfu2019 | story | INST / UTIL |
| heat reuse | Corix MOU to "explore" waste-heat reuse for the Burnaby Mountain NEU (not in place) | arch_inv2_sfuNewsFeb2026 | story, 26 Feb 2026 | INST |
| year | completed 2017 | arch_inv2_snaSfuWeb | page | ENG |
Not found: cooling type, MW, fire.

**TELUS M3 (111 E 5th Ave + 2060 Quebec St)**
| what | value | source id | where | kind |
|---|---|---|---|---|
| load | "up to 40 MW" | vanRR1_2026 | p. 16 | GOV |
| floor area | proposed 11,622.6 m² vs existing 8,301 m² (p. 28); draft by-law above-grade cap 8,305 m² (p. 8) | vanRR1_2026 | pp. 8, 28 | GOV |
| FSR | applicant 3.0; staff 4.0–4.2 | vanRR1_2026 | pp. 4, 28 | GOV |
| height / storeys | 20 m; 3 above + 2 below grade | vanRR1_2026; arch_inv2_vanPhea6sr | pp. 2, 4, 10; p. 1 | GOV |
| plant | "site cooling and heat rejection system" (type ?); rooftop mechanical | vanRR1_2026 | pp. 5, 15 | GOV |
| noise | added to Noise Control By-law Sched. B, Intermediate Zone; no dB or acoustic report | vanRR1_2026; arch_inv2_vanPhea6sr | p. 23; p. 1 | GOV |
| heat reuse | NEU delivery "a material condition"; Waste Heat Recovery Study before enactment | vanRR1_2026 | pp. 14–16 | GOV |
| water | no main upgrades; VBBL recirculation rule | vanRR1_2026 | pp. 20, 26 | GOV |
Not found: generators, fuel, flood, seismic.

**150 W Georgia (Creative Energy site)**: no new source this pass (see inv_van row 18). MW, form and plant: ?

**TELUS Garden data centre**
| what | value | source id | where | kind |
|---|---|---|---|---|
| heat export | 1,400 kW year-round, "warm water" | arch_inv2_bcucC113Pages | App. A p. 6 | REG (applicant) |
| location | "a building adjacent to the Project site" (C-1-13) vs "situated onsite" (G-155-12) | arch_inv2_bcucC113Pages; arch_inv2_bcucG15512 | p. 7; App. B | REG |
| term | 20-year planning horizon | arch_inv2_bcucC113Pages | p. 22 | REG |
Not found: address, supply temperature, MW, current status.

**3448 Cornett Rd (DP-2024-00980)**: re-read. Nothing new beyond inv_van except 4 parking spaces off Natal St and the dates (received 17 Oct 2024; permit issued 25 Feb 2026) (arch_inv_vanDp3448Cornett, GOV). MW, plant and noise: not on the page.

**3438 Lougheed Hwy (DP-2026-00565)**: re-read. Only 30,490 ft² is published. The page reads both "approved 5 Oct 2026, subject to conditions" and "Decision by Director of Planning" stage (arch_inv_vanDp3438Lougheed, GOV). The prior-to letter PDF was not opened (not reachable from this agent).

**TransLink OCC2 (6700 Southridge Dr, Burnaby)**
| what | value | source id | where | kind |
|---|---|---|---|---|
| rezoning | Bylaw 14161 adopted 8 Feb 2021 (REZ.19-26; RDHA plan) | arch_inv2_burnabyBl14161 | final page | GOV |
| building | four storeys; "a larger data centre" | arch_inv2_houleOcc2; arch_inv2_charterOcc2 | page | ENG |
| UPS / generators | "24 5,000 lb UPS Cabinets"; "UPS and generator systems" (count ?) | arch_inv2_houleOcc2 | page | ENG |
| status | "Completion: 2025" (as of the page) | arch_inv2_houleOcc2 | page | ENG |
| size | 1,098 m² data/storage of 3,746 m² | arch_inv_burnabyRz1926 | p. 5 | GOV |
Not found: kW, cooling.

**Spencer Bldg, Atlas Cloud, Hut 8, Cologix, CWH 555 W Hastings**: nothing newer found.

## Edmonton region

**Qu EDM1 (downtown)**
| what | value | source id | where | kind |
|---|---|---|---|---|
| building / floor | 18,000 ft² building; 15,712 ft² raised floor | arch_inv2_quEdm1Sheet | sheet | OC |
| power | "2.5MW Capacity" (page FAQ: 1 MW); ~5–10 kW per rack | arch_inv2_quEdm1Sheet; arch_inv_quEdmPage | sheet; FAQ | OC |
| generators / fuel | 3 × 1 MW, N+1; 24 h at full load | arch_inv2_quEdm1Sheet | sheet | OC |
| cooling | 248 tons N+1 (type ?) | arch_inv2_quEdm1Sheet | sheet | OC |
| fire | FM200 + dry-pipe pre-action | arch_inv2_quEdm1Sheet | sheet | OC |
Register note: quEDM1_2026 leaves the generator details out on purpose. Whether to show them is J.B.'s call.

**Qu EDM2 (17204 114 Ave NW)**
| what | value | source id | where | kind |
|---|---|---|---|---|
| building / floor | 35,000 ft²; raised floor 19,000 + 14,196 ft² | arch_inv2_quEdm2Sheet | sheet | OC |
| power | "2.5MW Tier II \| 3MW Tier III" (page: 8 MW design) | arch_inv2_quEdm2Sheet; arch_inv_quEdmPage | — | OC |
| generators | Phase 1: 3 × 1 MW N+1; Phase 2: 2 × 1 MW N+1; fuel hours ? | arch_inv2_quEdm2Sheet | sheet | OC |
| cooling | 1,450 tons N+1 (type ?) | arch_inv2_quEdm2Sheet | sheet | OC |
| fire | dry-pipe pre-action; VESDA | arch_inv2_quEdm2Sheet | sheet | OC |
| tier | Uptime Tier III certified | arch_inv2_quEdm2Sheet | sheet | OC |

**Wolfpaw (EDM 1 Scotia Place; also EDM 2 downtown, EDM 3 west end)**
| what | value | source id | where | kind |
|---|---|---|---|---|
| EDM 1 power | dual grid; natural gas + diesel generator; redundant UPS | arch_inv2_wolfpawEdmPage | page | OC |
| EDM 1 fire | double-interlock dry pipe | arch_inv2_wolfpawEdmPage | page | OC |
| EDM 2 | diesel, 24 h fuel; FM200 + double-interlock dry pipe | arch_inv2_wolfpawEdmPage | page | OC |
| EDM 3 | N+1 diesel; "Priority Government Fuel Contracts" | arch_inv2_wolfpawEdmPage | page | OC |
| tier | "Concurrently Maintainable (Tier 3 Standard)" (self-described) | arch_inv2_wolfpawEdmPage | page | OC |
EDM 2 and EDM 3 are not rows in inv_edm. EDM 2 at 10200 102 Ave is a lead only; EDM 3's address is ?. No MW or ft² found.

**The Internet Centre (4130 95 St NW)**: 3,000 ft²; address confirmed by the operator (arch_inv2_incentreAddr, OC). Generator, UPS, cooling and fire: ?

**Rogers West Edmonton (10450 178 St NW)**: no operator page names this address. Rogers' 20 Nov 2013 release says the Edmonton expansion added "approximately 6,000 square feet" of raised floor, site not named (arch_inv2_rogersPr2013, OC). Linking that release to 178 St or to Qu EDM2 is unconfirmed (?).

**Kyndryl Acheson**: no operator source found. Kyndryl's 2026 Canada release names only Microsoft regions (arch_inv2_kyndrylPr2026). All specs ?

**EPCOR, APA, Churchill, ThinkTel, Sobeys (E7–E11)**: not searched further. Only the permit rows exist.

**Meta, Sturgeon County (E12)**
| what | value | source id | where | kind |
|---|---|---|---|---|
| size | "a new 1GW, AI-optimized data center" | arch_inv2_metaBlogJul2026 | post, 8 Jul 2026 | OC |
| cooling / water | "closed-loop, liquid-cooled system with dry cooling"; "no operational water use in the cooling system" | arch_inv2_metaBlogJul2026 | post | OC |
| status | "breaking ground" | arch_inv2_metaBlogJul2026 | post | OC |
| plant (Greenlight) | 1,864 MW; 4 gas turbines + 4 steam turbines; 98 ha; in service by Q1 2031 | arch_inv2_aucD30261 | ¶1–5 | REG |
| plant noise | R1 50.4 / 43.1 dBA predicted vs 55 / 45 dBA permissible | arch_inv2_aucD30261 | ¶31 | REG |
| plant water | ~538,000 m³/yr from Sturgeon County | arch_inv2_aucD30261 | ¶25 | REG |
Not found: floor area (beyond the GoA relay), PUE, heat reuse, county development permit.

**Beacon Heartland (E13)**
| what | value | source id | where | kind |
|---|---|---|---|---|
| load | ~800 MW to the co-located data centre; plant 920 MW | arch_inv2_aucD30518 | ¶7, ¶127 | REG |
| noise | L1 45.8 / 38.4 dBA predicted vs 50 / 40 dBA permissible; no dwellings within 1.5 km | arch_inv2_aucD30518 | ¶97–98 | REG |
| noise conditions | final noise impact assessment of plant and data centre together; post-construction study within 6 months | arch_inv2_aucD30518 | ¶101, ¶103 (paraphrase) | REG |
| plant water | closed-loop glycol, 0–1 m³/day | arch_inv2_aucD30518 | ¶38 | REG |
| plant area | ~13 ha | arch_inv2_aucD30518 | ¶5 | REG |
| schedule | construction Q4 2026; in service Q4 2027 | arch_inv2_aucD30518 | ¶9 | REG |
| federal | IAAC early decision, no further assessment, 10 Mar 2026 | arch_inv2_iaac90123 | page | REG |
Not found: data-hall cooling, floor area, county permit.

**TransAlta Keephills (E14), Sundance (E15), Capital Power Genesee (E16), Beacon Saunders Lake (E17), Beacon Harry Smith (E18), Lynx (E19), Sovereign Cloud (E20)**: nothing newer than inv_edm. The TransAlta ASP poster PDF failed again (site error).

**Walton EETP (E21)**: the edmonton.ca data-centre page is robots-blocked. Walton's 2024 release does not mention a data centre (arch_inv2_waltonPr2024). MW and plant: ?

Rule context: AUC Bulletin 2026-03 (arch_inv2_aucBulletin202603) adds no new Rule 012 requirements. Compliance is measured 15 m from the receptor.

## Conflicts with earlier figures

1. **eStruxture VAN-3 MW:** the web page says 13 MW; the datasheet (arch_inv_estruxVan3Sheet) says 10 MW.
2. **eStruxture VAN-3 status:** inv_van says "operating" (index page). The 22 Apr 2026 blog says "doors are opening soon".
3. **eStruxture VAN-3 utility:** the web page says "multiple utility feeds"; the sheet says a single 25 kV entrance.
4. **M3 floor area:** inv_van carries 11,622.6 m², but the draft by-law caps above-grade floor area at 8,305 m² (p. 8). The extra area is presumably below grade (our reading ?).
5. **TELUS Garden data centre:** G-155-12 puts it "onsite"; C-1-13 puts it "in a building adjacent".
6. **SFU Cedar PUE:** Smith + Andersen gives a 1.097 target; BC Hydro and SFU give 1.07.
7. **TransLink 6700 Southridge:** inv_van has "adoption ?". Bylaw 14161 was adopted 8 Feb 2021. The contractor gives completion 2025; Charter places it on the "OMC2 property" (same land ?).
8. **Qu EDM1:** 2.5 MW (sheet) vs 1 MW (FAQ), as before.
9. **Qu EDM2:** 2.5/3 MW (sheet) vs 8 MW (page).
10. **Meta:** "1GW" (Meta) vs 970 MW Phase 1 and 1,800 MW full build (GoA relay / AESO).
11. **Wolfpaw:** the operator lists three Edmonton sites; inv_edm maps one.
12. **IAAC 90123:** inv_edm says "project number not confirmed ?". The IAAC page confirms 90123.

## Blocked or not read (not circumvented)

- IAAC 90123 document PDFs (fetch not permitted).
- edmonton.ca data-centre page (robots).
- TransAlta ASP poster PDF (site error).
- eStruxture VAN-3 datasheet form (HubSpot).
- 3438 Lougheed prior-to letter.
- DCD Uniserve article (site error).
- Last ~19,500 characters of BCUC C-1-13.
- Pages 2+ of phea6sr (only p. 1 returned).
