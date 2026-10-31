# Adjacency: data-centre service rooms and hazards

Research 31 Oct 2026, per ADJ_BRIEF.md. Builds on spatial_rules.md and separations.md (not repeated; items re-checked are marked "re-verified").

Texts searched (repo copies): NBC 2020 (nbc.txt), BCBC 2024 (bcbc2024.txt), VBBL 2025 Book I (vbbl2025_v1.txt) plus Book II insert, NBC(AE) 2023 (nbc_ab2023.txt), NFC 2020 (nfc.txt; tables read from nfc2020.pdf pp. 188 and 126–127), NFC(AE) 2023 (nfc_ab2023.txt). Section texts were diffed code against code; "same" below means the wording matched after layout clean-up.

Codes column: N = NBC 2020, B = BCBC 2024, V = VBBL 2025, A = NBC(AE) 2023; NFC = NFC 2020, NFC(AE) = NFC(AE) 2023. BC Fire Code 2024 is not in the repo (not checked).

"our reading" = not stated by the code. "?" = not confirmed.

## (a) Rules

### 1. Service rooms (NBC 3.6.2) and related

| rule | applies to | requirement | clause | codes | differences |
|---|---|---|---|---|---|
| What counts as a service room | boiler, furnace, garbage, A/C or heating, pumps, compressors, electrical rooms | "Typical examples of service rooms include … rooms to accommodate air-conditioning or heating appliances, pumps, compressors and electrical equipment. Rooms such as elevator machine rooms and common laundry rooms are not considered to be service rooms." A data hall is not listed (our reading: not a service room). | Div. A Note A-1.4.1.2.(1) "Service Room" | N (others ?, not diffed) | — |
| Fuel-fired appliances | boiler, water heater; a generator if it counts as an "appliance" (?) | "fuel-fired appliances shall be installed in service rooms separated from the remainder of the building by fire separations having a fire-resistance rating not less than 1 h". Exceptions: serves one room or suite (2); fireplace (9); "A fire separation is not required between a rooftop appliance and the building it serves" (10). "Appliance means a device to convert fuel into energy" (Div. A 1.4.1.2) — whether a genset is an "appliance" is our reading (?). | 3.6.2.1.(1), (2), (9), (10) | N, B, V, A same | none |
| Equipment using liquid with flash point below 93.3 °C | diesel generator room, day-tank room (our reading) | "shall be installed in a service room separated from the remainder of the building by a fire separation having a fire-resistance rating not less than 1 h". Every "combustible liquid" (flash point 37.8–93.3 °C, Div. A def.) falls under this; that diesel is a combustible liquid is not sourced here (?). | 3.6.2.1.(5) | N, B, V, A same | none |
| Electrical equipment the electrical code puts in a service room | electrical room, switchgear, UPS room (?) | 1 h fire separation | 3.6.2.1.(6) | N, B, V, A | trigger: N = "CSA C22.1"; B, V = "the Safety Standards Act and pursuant regulations"; A = "the Electrical Code Regulation made pursuant to the Safety Codes Act" |
| Other service equipment, unsprinklered storey | chillers, pumps, AHUs indoors | 1 h "in a storey that is not sprinklered throughout"; none if "limited quantity of service equipment" that is neither a fire hazard nor essential to fire safety systems (8) | 3.6.2.1.(7), (8) | N, B, V, A same | none |
| Service room under an exit | boilers >100 kPa, "some types of refrigerating machinery and transformers" | "shall not be located directly under a required exit" | 3.6.2.2.(1) | N, B, V, A same (re-verified) | none |
| Mixing equipment in one room | heating/cooling room + electrical | "is permitted to contain other service equipment such as electrical service equipment" | 3.6.2.3.(1) | N, B, V, A same | none |
| Door swing | boiler room door onto a corridor or assembly room | swings outward, "except that the door shall swing inward if the door opens onto a corridor or any room used for an assembly occupancy" | 3.6.2.6.(1) | N, B, V, A same | none |
| Service room and exits | any service room ↔ exit stair | "A service room shall not open directly into an exit." Also storage, washrooms, "laundry rooms and similar ancillary rooms" (8); "A fuel-fired appliance shall not be installed in an exit" (4) | 3.4.4.4.(4), (7), (8) | N (B, V, A ? not diffed) | — |
| Refuse / recycling room | loading-dock bins room | 1 h (45 min where floor ≤45 min) and sprinklered | 3.6.2.5.(1) | N, B, V, A same | none |
| Electrical equipment vault — when | transformer vault inside the building | applies "if it is required by" regulations/by-laws or, failing them, CSA C22.1 | 3.6.2.7.(1) | N, B, V, A | B, V: "required by the Safety Standards Act and pursuant regulations"; A: "required by the Electrical Code Regulation …" |
| Vault separation | vault ↔ rest of building | "solid masonry or concrete construction" ≥ 3 h unsprinklered, 2 h with "an automatic fire extinguishing system" (re-verified) | 3.6.2.7.(2) | N, B, V, A same | none |
| Vault: no foreign services | ducts, pipes through vault walls | "Only pipes or ducts necessary for fire protection or the proper operation of the electrical installation shall penetrate" | 3.6.2.7.(4) | same | none |
| Vault with oil-filled equipment | oil transformer vault ↔ adjoining rooms | explosion-relief devices and vents per 3.3.1.21.(3); Note points to NFPA 68, NFPA 69 | 3.6.2.7.(5); Note A-3.6.2.7.(5) | same | none |
| Vault ventilation | vault exhaust | keep vault ≤40 °C; system "separate from the system for the remainder of the building" and shuts off on fire in the vault | 3.6.2.7.(6), (7) | same | none |
| Vault floor and sill | vault ↔ corridor | liquid-tight floor and sill holding all liquid of the largest item, "not less than 100 mm" (re-verified); "secured against unauthorized entry" (9) | 3.6.2.7.(8), (9) | same | none |
| Life-safety generator room | emergency generator ↔ everything else | 2 h; room "contains only the generating set and equipment related to the emergency power supply system"; not if the building is used solely for the generator (re-verified) | 3.6.2.8.(1) | N, B, V, A same | none |
| Generators that are not life-safety | IT standby sets | no clause of their own. They fall under 3.6.2.1.(5) (1 h) and possibly 3.6.2.1.(1) (our reading). Note A-3.2.7.8.(3): "If the operation of emergency generators … is intended for other than fire emergency conditions, such as power failures, fuel supplies … must be increased". Our reading: a set that also feeds life safety is a 3.6.2.8 set (2 h, room limited to emergency power equipment). | 3.6.2.1.(5); Note A-3.2.7.8.(3) | N, B, V, A | B note cites the BC Fire Code; A cites NFC(AE) |
| Emergency power installation | any emergency power supply | "shall be installed in conformance with CSA C282" | 3.2.7.5.(1) | N, B, V, A | none in wording seen |
| Refrigeration machinery | chiller plant room | the codes only point to CSA B52: "installation of heating and air-conditioning equipment, including mechanical refrigeration equipment, … mounting, clearances and air supply, shall conform to appropriate provincial or territorial requirements or, in the absence of such requirements, … CSA B52". No "machinery room" clause in NBC/BCBC/VBBL/NBC(AE). | 6.2.1.5.(1); 3.6.2.2 | N, A (B52:18 in N; B52:23 in A); V lists B52:18 (clause text not read ?) | B: clause reads "a) the Safety Standards Act and pursuant regulations. b) reserved, c) CSA B139 …, d) reserved" — B52 (and B149.1) dropped; BC refrigeration falls under the Safety Standards Act. A cites B52:23 |
| Explosive or flammable atmospheres | rooms where "gases, vapour … have the potential to create a fire or explosion hazard" | exhaust ventilation per Part 6; explosion relief per 6.3.1 and 6.9.1.2. Our reading: this is the code hook for hydrogen from vented lead-acid batteries. | 3.3.1.21.(1), (3) | N (others ?) | — |
| Electrical wiring | all | per provincial regulations or CSA C22.1 | 3.6.1.2.(1) | N | — |

### 2. Vertical and horizontal service spaces

| rule | applies to | requirement | clause | codes | differences |
|---|---|---|---|---|---|
| Shaft rating | cable/duct/pipe shafts | Table 3.6.3.1: floor <45 min → none; 45 min or 1 h → 45 min; 1.5 h → 1 h; "2 h or more" → 1 h | 3.6.3.1.(1) | N (others ?) | — |
| Shaft openings | shaft walls | "Only openings that are necessary for the use of the vertical service space" | 3.6.3.1.(5) | N | — |
| Shared exhaust shaft | exhaust from several fire compartments (e.g. data hall + café) | fan at the outlet keeps the duct negative; compartments "shall not have individual fans that exhaust directly into the duct" | 3.6.3.4.(1) | N | — |
| Refuse chute discharge room | housing chute | 2 h; room holds no service equipment "not related to refuse handling" | 3.6.3.3.(9), (11) | N | — |
| Grease ducts | café kitchen duct through other floors | enclosure per NFPA 96; rating by CAN/ULC-S144 | 3.6.3.5 | N, B (6.3.1.6 same) | — |
| Return-air plenums | ceiling plenum under the data hall | no public corridor or exit as return plenum (6.3.2.11.(3)); plenum materials FSR ≤25 / SDC ≤50 with listed cable exceptions | 3.6.4.3; 6.3.2.11.(3) | N | — |

### 3. Batteries, UPS and energy storage

| rule | applies to | requirement | clause | codes | differences |
|---|---|---|---|---|---|
| Battery rooms, ESS, UPS, hydrogen | UPS/battery room ↔ any room | no clause found (re-verified: no "energy storage", "lithium", "stationary battery", "uninterruptible"). Only general hooks: 3.6.2.1.(6) if the electrical code requires a service room; 3.3.1.21 for hydrogen (our reading). | — | N, B, V, A, NFC, NFC(AE) | none |
| Battery charging (closest analogue) | forklift charging only | "at least 1.5 m from combustible materials"; "when serving more than 2 trucks, in well ventilated areas"; away from flammable vapours and ignition sources | NFC 3.1.3.3.(1) | NFC, NFC(AE) same | — |
| Spare lithium cells in storage | battery store | TDG Class 9 "Miscellaneous Dangerous Goods" → "See Article 3.1.2.1." (no exempt quantity). Batteries in use are not "storage": Note A-3.3.6.1.(1) excludes products "directly supplied to appliances, equipment or apparatus" (our reading). | NFC Table 3.2.7.1 | NFC | — |
| CEC 64 ESS distances | outdoor ESS | in separations.md (STANDATA quote); CEC itself paywalled | — | — | — |

### 4. Fuel (NFC Part 4)

| rule | applies to | requirement | clause | codes | differences |
|---|---|---|---|---|---|
| B139 split | generator tanks | Part 4 does not apply to B139 equipment "except for aboveground storage tanks with an individual capacity exceeding 2 500 L" (re-verified) | NFC 4.1.1.1.(3)(b) | NFC, NFC(AE) same | — |
| What B139 covers | day/belly tanks ≤2,500 L | Note: B139 "limits the capacity of individual storage tanks to 2 500 L and their aggregate capacity to 5 000 L"; covers "diesel-engine-driven emergency generators and fire pumps". Indoor context (our reading). | NFC Notes A-4.3.13.4.(1)(b), A-4.1.1.1.(3)(b) | NFC | — |
| Indoor tanks — which occupancies | tank inside a non-industrial building | permitted "where combustible liquids are stored and used as fuel for oil-burning equipment, emergency generators and fire pumps". Whether IT standby sets count as "emergency generators" ? | NFC 4.3.13.1.(1)(b) | NFC, NFC(AE) same (4.3.13–4.3.15 identical) | — |
| Indoor tanks — quantities by storey | tank room on ground, upper floor or basement | Table 4.3.13.4.-B, Class II/IIIA, protected room: first storey, individual >2,500 / >20,000 L, aggregate 200,000 L; basement and upper storeys: >2,500 L → aggregate 20,000 L; >20,000 L → 45,000 L | NFC 4.3.13.4, Table 4.3.13.4.-B | NFC, NFC(AE) | — |
| Indoor tank construction | 2,500–20,000 L | double-walled or 300° secondary containment, leak monitoring | NFC 4.3.13.5.(1) | same | — |
| Tank room | indoor tank room ↔ rest of building | "fire separation having a fire-resistance rating of at least 2 h"; contain 100% of largest tank; liquid-tight; "used for no other purposes than the storage and handling of flammable liquids or combustible liquids"; 550 mm clear around tanks | NFC 4.3.14.1, 4.3.14.2 | same | — |
| Fire compartments | — | "not less than 2 h" | NFC 4.3.13.7 | same | — |
| Class I fuel engines | petrol/gas-fired engines indoors | NFPA 37 | NFC 4.3.13.2 | same | — |
| Piping | generator fuel piping | per CSA B139 | NFC 4.3.13.6 | same | — |
| Containers near exits | drums of diesel or lube oil | "shall not be stored in or adjacent to exits, elevators or principal routes that provide access to exits" | NFC 4.2.2.1.(1) | NFC (NFC(AE) ?) | — |
| Outdoor tanks — distances | tank ↔ property line, building | re-verified: Table 4.3.2.1 (3 m up to 250,000 L …); Class II/IIIA to building 1.5 m (≤50,000 L) or 0 (≤2,500 L); S655 waiver; tank-to-LPG 6 m; truck within 60 m | NFC 4.3.2.1–4.3.2.4 | NFC; NFC(AE) 80,000 L | see separations.md |
| Tank vents | vent ↔ windows, doors | Class II/IIIA: ≥2 m above ground, ≥1.5 m from "any building opening"; emergency vents 1.5 m from openings and combustible wall parts (re-verified) | NFC 4.3.5.2.(2), (3) | NFC | — |

### 5. Pool chemicals, pool plant, laundry, café

| rule | applies to | requirement | clause | codes | differences |
|---|---|---|---|---|---|
| Pool chemicals are oxidizers | chlorine store | Note lists "pool chemicals (e.g. calcium hypochlorite, sodium dichloroisocyanurate)" among oxidizers; storage "should not impede egress" | Note A-3.3.6.2.(2) | N | — |
| Exempt quantities | pool chemical store | oxidizers (5.1) 250 kg or 250 L; corrosives (8) 500 / 1,000 / 2,000 kg or L by packing group; toxic gases (2.3) 0 | NFC Table 3.2.7.1 | NFC | which product falls in which class depends on its SDS (our reading) |
| Oxidizer storage room | chlorine store ↔ rest of building | "shall be separated from the remainder of the building by a fire separation having a fire-resistance rating of not less than 2 h" (applies above Table 3.2.7.1 quantities, 3.3.6.1) | NBC 3.3.6.2.(1); NFC 3.2.7.5.(6) | N, NFC | — |
| Oxidizers vs other goods | chlorine ↔ acid, diesel, other stores | Table 3.2.7.6: oxidizers vs acids "X" (separate fire compartments); vs bases "1m"; vs flammable liquids "X"; vs toxic gases "1m" | NFC Table 3.2.7.6 | NFC | — |
| Oxidizer floors | — | "shall not be stored on combustible floors or platforms" | NFC 3.2.7.8.(2) | NFC | — |
| Chlorine gas cylinders | gas chlorination room | room on an exterior wall, entered from the exterior, gas-tight 1 h separation, self-closing closures, ventilated to outdoors; no combustibles in the room | NFC 3.2.8.3; NBC 3.3.6.3.(2) | NFC, N | — |
| Pool mechanical room | pump/filter room | no pool-specific clause; falls under 3.6.2.1.(7) (1 h if storey unsprinklered) | 3.6.2.1.(7) | N, B, V, A | — |
| Common laundry room (residential buildings only) | laundry ↔ rest of building | 1 h; 45 min where floor may be <1 h; no rating if sprinklered throughout | 3.3.1.23 | N, B, V, A same | — |
| Dryer exhaust | laundry ↔ data-centre ducts | "independent of other exhaust ducts"; collective venting: one central fan, interlock, make-up air; "discharge directly to the outdoors" | 6.3.2.10.(7)–(9) | N, B, V same | A adds: independent of "gas vents or chimneys", "not include screens", no protruding screws, collective system "constructed of sheet metal" |
| Lint traps | laundry | "cleaned after each use of the equipment" | NFC 2.4.1.4.(1) | NFC | — |
| Kitchen exhaust | café hood | NFPA 96 | 6.3.1.6.(1); 3.6.3.5 | N, B | — |
| Kitchen fire suppression | café | ANSI/CAN/UL/ULC 300 or ULC/ORD-C1254.6 | 6.9.1.3.(1) | N | — |
| Kitchen exhaust maintenance | café | per NFPA 96; Note: clean ≤12 months, ≤3 months for "deep fat cooking, char broiling" | NFC 2.6.1.9; Note A-2.6.1.9.(3) | NFC | — |

### 6. Air intakes and exhausts (Part 6)

| rule | applies to | requirement | clause | codes | differences |
|---|---|---|---|---|---|
| Table 6.3.2.9 (all rows) | any outdoor air intake (refuge, pool, data hall) | garage entry (5+ vehicles), car loading, drive-in queue 4.5 m; truck dock and bus parking 7.6; driveway, street, parking space 1.5; thoroughfare/arterial/freeway/highway 7.6; garbage and dumpsters 4.5; evaporative heat rejection discharge 7.6; sanitary vent 3.5; kitchen cooking exhaust 3.0; vent for combustion products 3.0 | 6.3.2.9.(2)(b), Table 6.3.2.9 | N, B, V, A same values | B, V: 6.3.2.9.(2)(a) (outdoor air-quality link) is "reserved" |
| Intake height | intakes | "not less than 0.3 m above roofs, landscape grades or other surfaces, taking into account anticipated snow" | 6.3.2.9.(3) | all | — |
| Combustion vents (non-appliance) | generator exhaust (?) | 2.15 m above walks/drives; 3 m from intakes; 3 m from doors and operable windows; 3 m from occupiable outdoor spaces | 6.3.3.1.(2) | N, B, V, A same (re-verified) | — |
| Appliance vents | oil/gas appliances | vented per the appliance standard in 6.2.1.5 (B139, B149.1). Our reading: because B139 covers "diesel-engine-driven emergency generators" (NFC Note A-4.1.1.1.(3)(b)), a diesel genset's stack may fall under (1) → B139 (paywalled), not (2). Unresolved (?). | 6.3.3.1.(1) | same | — |
| Cooling towers / evaporative | tower ↔ intakes, windows, plazas | 7.6 m intakes; 3 m doors/windows; 3 m occupiable outdoor spaces; health care per Z317.2 (re-verified) | 6.3.2.15.(5), (6) | N, B, V, A | V: water treatment per Guideline 12 s. 8.2.4 (others 7.6.2); V adds a sampling port; A ties make-up/drains to the Alberta plumbing regulation |
| Outdoor air quality design | all intakes | PM2.5 24 h 30 µg/m³, ozone 8 h 65 ppb; local contaminants assessed; Note lists "combustion exhaust from vehicles on loading docks", "visible plumes from cooling towers" | 6.2.1.2.(2), (3); 6.3.2.14; Note A-6.2.1.2.(3) | N, A | B, V: 6.2.1.2.(2)–(3) "Reserved"; B 6.3.2.14 "Reserved"; Note absent in B, V |
| Vancouver filtration | all outdoor air | "filtration devices with a Minimum Efficiency Reporting Value (MERV) of 13 … prior to introduction of outdoor air into indoor occupied spaces" | VBBL Div. B 6.3.2.14.(1) | V only | — |
| Contaminated spaces | generator room, battery room, pool chem room | systems "shall be designed in such a manner as to prevent the spread of such contamination to other occupied parts of the building" | 6.3.1.5.(2) | N (others ?) | — |
| Hazardous gases | rooms with hazardous gases/liquids | per provincial rules or NFPA (Note lists NFPA 30, 55 …) | 6.9.1.2.(1) | N | — |
| Fans near boiler rooms | AHUs | must not let duct air "be contaminated by air or gases from the boiler room or furnace room" | 6.3.2.17.(1)(b) | N | — |
| Garage pressure | storage garage ↔ other occupancies | garage kept at lower pressure than "adjoining buildings of other occupancy" | 6.3.1.3.(3) | N | — |
| Exhaust discharge | all exhaust | "shall discharge directly to the outdoors" (except into a garage per (6)) | 6.3.2.10.(5) | N | — |

### 7. Fire department access, alarm, suppression

| rule | applies to | requirement | clause | codes | differences |
|---|---|---|---|---|---|
| When access routes are required | whole building | ">3 storeys … or more than 600 m2 in building area" → routes to the principal-entrance face and access-opening faces | 3.2.5.4.(1) | N, B, A | V: "Every building shall be provided with access routes" |
| Route to entrance distance | principal entrance, access openings | "not less than 3 m and not more than 15 m from the closest portion of the access route … measured horizontally from the face of the building" | 3.2.5.5.(1) | N, B, A | V: principal entrance 3–15 m "measured horizontally along the path of travel"; 45 m path to "principal suite entry" for cut-off non-residential portions; hydrant-to-entrance route ≤90 m |
| Firefighter path | vehicle → FDC or entrance | ≤45 m; hydrant + path ≤90 m without an FDC; each cut-off portion ≤45 m | 3.2.5.5.(2)–(4) | N, B, A | V rewrites (see above) |
| Route design | fire lane | ≥6 m wide; ≥12 m centre-line radius; 5 m overhead; grade change ≤1 in 12.5 over 15 m; turnaround if dead end >90 m | 3.2.5.6.(1) | N, B, V, A | V adds (3): firefighter path ≥1.2 m wide, hard-surfaced |
| Fire department connection | FDC location vs entrance | N, B: ≤45 m to a hydrant | 3.2.5.15 | N, B, A, V | A adds: FDC "no closer than 3 m and no further than 15 m from the principal entrance"; V: "within 5 m of the principal entrance", 1 m clear, "visible from the street" |
| Upper-storey access openings | unsprinklered storeys | one window or panel per 15 m of street-facing wall; 1,100 × 550 mm (750 mm wide if dangerous goods) | 3.2.5.1 | N, B, A | V adds (4): master key or wired-glass panel where exit doors lock |
| Firefighter facilities | central control, firefighters' elevator | "centrally located in close proximity to the firefighters' entrance" | VBBL 3.2.5.19 | V only | — |
| Radio antenna system | buildings >6 storeys or with large basements | ≥98% coverage incl. "emergency generator room", "electrical service and transformer room", "fire pump room"; may be waived where signals "compromise the intended use" | VBBL 3.2.5.20 | V only | — |
| One alarm system | mixed-occupancy building | "if a building contains more than one major occupancy and a fire alarm system is required, a single system shall serve all occupancies"; required in any portion → "installed throughout" | 3.2.4.2.(2), (3) | N, B, V, A same | — |
| Separated-portion exception excludes service rooms | low-rise portion split by 1 h wall | portions ≤3 storeys behind a 1 h wall with no openings may be treated as separate buildings, but "does not apply to service rooms and storage rooms" | 3.2.4.2.(4), (5) | same | — |
| Sprinkler triggers alarm | sprinklered building | N, A: alarm required where a sprinkler system "is installed" | 3.2.4.1.(1) | N, A | B, V: "is required by this Part" |
| Sprinkler standard | data hall, plant rooms | NFPA 13 | 3.2.5.12.(1) | all | — |
| Vault sprinkler omission | transformer vault | may be unsprinklered in a sprinklered building if used only for electrical equipment and has a smoke detector on the alarm | 3.6.2.7.(3) | all | — |
| Gas (clean-agent) suppression | data hall | NFC 2020 lists NFPA 11, 12, 12A, 12B, 17, 17A only — **NFPA 2001 not listed**; NFC(AE) adds "g) NFPA 2001 … Clean Agent" and NFPA 750 water mist. New halon systems prohibited (Note). | NFC 2.1.3.5.(3), (4); Note A-2.1.3.5.(3)(c) and (d) | NFC; NFC(AE) | AB names NFPA 2001; BC Fire Code 2024 ? |
| Gas suppression vs adjacent rooms | data hall ↔ public rooms | nothing found in any code | — | — | — |

### 8. Vancouver and Alberta additions (not in NBC)

| rule | applies to | requirement | clause | codes |
|---|---|---|---|---|
| Plant below flood level | electrical rooms, switchgear, fire pumps in a flood plain | "No person shall install furnaces, electrical switchgear, electrical panels, fire protection systems or other fixed building services susceptible to flood damage, below the flood construction level, unless … protected from flood damage and accessible for servicing during a flood" | VBBL Div. C 2.2.10.3.(2) | V |
| Hazardous storage below flood level | diesel, pool chemicals | "No person shall store hazardous or toxic substances below the flood construction level." | VBBL Div. C 2.2.10.3.(3) | V |
| Flood level and setbacks | site | FCL 4.6 m GVRD datum on mapped plains (Div. A def.); setbacks 30 m Fraser River, 15 m Burrard Inlet/English Bay/False Creek, 5 m Still Creek, 7.5 m from flood works | VBBL Div. A 1.4.1.2; Div. C 2.2.10.4 | V |
| Once-through cooling | data-hall cooling on city water | City water "shall not be connected to once through cooling equipment" (emergency/maintenance units only by permit) | VBBL Book II Div. B 2.2.11.4.(1), (3) | V |
| Cooling tower permit | towers, adiabatic coolers | operating permit, service contract, monthly Legionella tests (re-verified; no distance) | VBBL Book II Div. B 2.2.11.6 | V |
| Roof HVAC access | rooftop chillers | roof access per CSA B149.1 cl. 4.14.5–4.14.6; fixed access on sloped roofs | NBC(AE) 3.6.4.7 | A |

## (b) Searched for and NOT found

- Any clause on battery rooms, UPS rooms, ESS, lithium, hydrogen venting from batteries (N, B, V, A, NFC, NFC(AE)).
- A refrigeration "machinery room" clause, refrigerant detection, or machinery-room exit rule (all codes defer to CSA B52).
- Any rule saying what may or may not sit **above or beside** a service room, generator room or vault, other than "not under a required exit" (3.6.2.2) and "not open directly into an exit" (3.4.4.4.(7)).
- A separate rule for generators that are not life-safety.
- Any clause limiting public rooms next to gas-suppressed rooms; NFPA 2001 in NFC 2020.
- A Table 6.3.2.9 row for dryer exhaust, generator exhaust as such, battery-room exhaust, pool-chemical-room exhaust or dry coolers.
- A pool-chemical-room or pool-plant-room clause in any building code.
- Fire-code distance from an outdoor tank to an exit door or air intake (only to "building" and "property line"; vents to "building opening").
- Any Vancouver or Alberta change to 3.6.2 beyond the electrical-law trigger wording.
- Diesel's flash point (not in these codes).

## (c) Open questions

- Is a diesel genset an "appliance" (3.6.2.1.(1)) and is its exhaust under 6.3.3.1.(1) → B139, or (2) → 3 m? Needs B139 or an authority ruling.
- Do IT standby sets count as "emergency generators" in NFC 4.3.13.1.(1)(b)? If not, indoor fuel tanks may need an industrial occupancy.
- Does the electrical code require a service room or vault for UPS, switchgear, transformers (3.6.2.1.(6), 3.6.2.7.(1))? CEC paywalled.
- Data hall class (F-2 / F-3 / D) still open (spatial_rules s. 3).
- Pool chemical storage: BC Pool Regulation and Alberta Pool Standards not searched (outside these codes).
- BC Fire Code 2024: does it list NFPA 2001? Not in repo.
- 3.4.4.4 and 6.3.1.5 were read in NBC only; provincial wording not diffed.

Paywalled items added to checks/paywalled_standards.md: CSA B52, NFPA 2001, NFPA 96, NFPA 68/69, CSA B149.1, NFPA 13.
