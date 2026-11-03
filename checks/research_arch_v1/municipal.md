# Municipal template: approvals and rules (2–3 Nov 2026)

Scope: what a new data centre on an industrial lot must get, from whom, in what order, in Vancouver and Edmonton; port and federal land; the Alberta MGA; how other places regulate data centres.

"?" = not confirmed. "Our reading" = our interpretation, not a clause. New ids are `arch_mun_*` (municipal_sources.json). Existing ids reused, not duplicated (rezoning.md, zoning.md, register, code audits).
Method: web pages read with the fetch tool (short extracts); two saved PDFs re-read locally (sources/library/public/gvsdd299, mvBylaw1082). Re-check quotes before they go into the register.

## 0. Key findings

- **Edmonton: backup generators of 1 MW or more need AUC approval**, including plant "intended solely for on-site consumption, temporary generation, emergency and/or backup generation". The total counts across the site, so splitting sets doesn't avoid it. 1–10 MW: checklist, approved within five business days of a complete application. Rule 012 noise applies to testing (arch_mun_aucAnn2026, arch_mun_aucPowerPlant). A 2.5 MW data centre with N+1 sets is over 1 MW (our reading).
- **Edmonton air approval (settled at check 2):** no conflict. The Activities Designation Regulation defines a "power plant" as over 1 MW, but leaves out a backup system that is "only used" when grid power is interrupted, "not connected to the electric distribution system", and no more than 50 MW (s. 2(2)(vv)(iii); abADR276). So: AUC approval from 1 MW; EPEA approval only above 50 MW for true backup sets. Whether testing or grid-parallel use breaks the exclusion: ? (our reading).
- **Vancouver: the conditional-use permit is a staff decision**, made by the Director of Planning or the Development Permit Board (four senior staff). No Council vote. The Board "cannot deny a development permit if it meets the zoning and ODP and guidelines". Notice to neighbours is discretionary ("may notify"). Referral to the Board is mandatory where public response warrants it ("shall refer").
- **Edmonton: discretionary permit decided by the Development Planner.** The planner may refuse "even if it meets the requirements of this Bylaw". Approved discretionary permits are mailed within 7 days to owners within 60.0 m (wider if impacts reach further). No site sign by default on industrial zones. Anyone affected may appeal to SDAB within 21 days.
- **Appeals:** Vancouver Board of Variance, 30 days (late up to 75). City page: only the owner may appeal. Fee $3,060 and the "relaxation" limit are not re-confirmed (?). Edmonton SDAB, 21 days. Hearing within 30 days, written decision within 15 days.
- **Power, Vancouver:** BC Hydro "major distribution" starts at 2,500 kW (12 kV areas) or 5,000 kW (25 kV areas). Detailed design takes 1–2 years and construction 6–18 months; a 7–15 % design deposit is paid up front. At 10 MW or more, B.C. Reg. 8/2026 applies (existing id bcReg8_2026).
- **Air, Vancouver:** Bylaw 1082 s. 5 bars any business air discharge unless s. 7 exempts it. The engine exemption (7(9)) is unsettled, as already logged. A permit means public notification (site posting for 30 days plus newspapers) and takes "several months to a year or more".
- **Sewer, Vancouver:** Bylaw 299 s. 5.1 needs a Waste Discharge Permit for a "High Volume Discharge" (over 300 m³ in 30 days) and for any "Uncontaminated Water" (e.g. once-through cooling water) put into a sewer.
- **Port land:** VFPA runs its own review (PER categories A–D, 1–170 business days, fees $0–22,500 plus GST) and "issues building permits" to NBC 2020. Municipalities still supply the utilities. Before a permit, the federal Impact Assessment Act s. 82 needs a determination with at least 30 days of public comment.
- **MGA text still not read.** King's Printer and edmontontribunals.ca refuse robots, and open.alberta.ca has no PDF. Two city-hosted copies cut off before Part 17. Only Alberta's summaries were read (one is a 2011 manual, out of date).
- **Benchmarks:** Haarlemmermeer allows data centres on four business parks only, with waste heat "op een bruikbare temperatuur" to a heat network and PUE < 1.2. Ireland (CRU, Dec 2025) requires generation or storage matching demand, plus 80 % new renewables. Singapore DC-CFA2 requires PUE 1.25 and 50 % green energy. Quebec needs ministerial authorization at 5 MW or more. Ontario's Bill 40 creates ministerial approval to connect (threshold not set). Prince William County now requires a Special Use Permit outside an overlay.

## 1. Approval path

### 1a. Vancouver (I-2 / I-3 A / I-1C / FC-2: Bulk Data Storage is conditional, zoning.md)

Order (our reading of the sources below): pre-application → development permit (DP) → building permit (BP) → trade permits and utility connections in parallel → occupancy. Air permit and BC Hydro design should start early (both take a year or more).

| what | rule | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Who decides a DP | Director of Planning or Development Permit Board may grant "either unconditionally or subject to conditions" or refuse | arch_mun_vanZDB4 | ZDB s. 4.3.1 | rule | 80 |
| Referral to DP Board | Director "shall refer" if "the public response to the application is such that review by the Development Permit Board is warranted" | arch_mun_vanZDB4 | s. 4.3.7(h) | rule | 80 |
| DP Board | "reviews, makes recommendations and approves major developments" of "significant importance because of scale, complexity, or public interest"; "four senior staff members, including the chairperson and an advisory panel"; meetings "open to the public"; "cannot deny a development permit if it meets the zoning and ODP and guidelines" | arch_mun_vanDPB | City page (undated) | government guide | 75 |
| DP Board size thresholds | ? not stated on the page | ? | ? | ? | 0 |
| Notification | Board or Director may refer to the Urban Design Panel "and may notify such property owners and tenants it deems necessary" (discretionary) | arch_mun_vanZDB4 | s. 4.3.8 (PDF footer March 2022) | rule | 80 |
| Application life | DP application "void 12 months from the date of application"; extensions ≤ 12 months total | arch_mun_vanZDB4 | s. 4.2.1–4.2.2 | rule | 80 |
| Deemed refusal | no permit within 30 days after all required information is in (or an agreed longer time) → deemed refused, appealable | arch_mun_vanZDB4 | s. 4.2.3 | rule | 75 |
| Permit life | void 12 months after issue unless work started or BP issued; void 24 months after issue unless complete | arch_mun_vanZDB4 | s. 4.6.1–4.6.2 | rule | 80 |
| DP before BP | step 5 "Development permit issued and apply for a building permit"; excavation and shoring "may be eligible to receive their building permit in advance" | arch_mun_vanDPpage | City page | government guide | 70 |
| DP fee | conditional, "all other uses": $2,530 per 100 m² to 500 m², then $1,570 (max $366,600); values as proposed for 2026 | vanFees2026 | RTS 18094 App. A p. 3 | government report (proposed) | 60 |
| Board of Variance: what | Charter s. 573(1)(a) zoning decisions by an official; (b) hardship on "siting, size, shape, or design"; (e) decisions of a delegated body that may relax the by-law | arch_mun_vanBoV10200 | By-law 10200 (consol. 29 Mar 2022), quoting Charter s. 573 | rule | 75 |
| BoV: time and fee | 30 days from the decision; late appeal up to 75 days if the Board is satisfied; fee "$3,060 appeal legality fee" (fee not re-confirmed at check 2 ?) | arch_mun_vanBoV10200; arch_mun_vanBoVpage | s. 3.2; City page | rule; government guide | 60 |
| BoV: who appeals | "Only a property owner (or an agent on their behalf) who is seeking to develop or use their property may file an appeal" (City page; Charter s. 573(1)(a) says "any person aggrieved": ?) | arch_mun_vanBoVpage | City page | government guide | 65 |
| BoV: DP Board decisions | appealable only to the extent they dealt with "relaxation" (not re-confirmed at check 2 ?) | arch_mun_vanBoVpage | City page | government guide | 50 |
| BoV: notice | Board "shall give notice to such owners ... as the Board may deem to be affected" | arch_mun_vanBoV10200 | Charter s. 573(3) as quoted | rule | 70 |
| Rezoning instead (CD-1) | Council; hearing unless ODP-consistent | arch_rz_vanCharter28; arch_rz_vanDAPfaq | rezoning.md §1 | rule | 85 |
| Building permit | VBBL 2025 permit clauses not read; DP first (above) | ? | ? | ? | 0 |
| BP fees | ? not read | ? | ? | ? | 0 |
| DP / BP processing times | ? not published on the pages read | ? | ? | ? | 0 |

### 1b. Edmonton (BE / IM / IH: data centre is a deemed use, so Discretionary, arch_zon_Edm720)

Order: pre-application → DP (discretionary) → 21-day appeal period → BP and trade permits → EPCOR connection. AUC approval for generators of 1 MW or more runs in parallel; AESO comes in at 75 MW or more.

| what | rule | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Unlisted use | deemed use "always considered a Discretionary Use" | arch_zon_Edm720 | 7.20 3.3.2 | rule | 90 |
| Completeness | Development Planner acknowledges a complete application "within 20 days after the receipt" | arch_mun_edm7100 | 7.100 2.1 | rule | 85 |
| Decision deadline | "If no decision is made on an application within 40 days" → "at the option of the applicant, deemed to be refused" | arch_mun_edm7100 | 7.100 2.5 | rule | 85 |
| Discretion | may approve "with or without conditions", with "regulations more restrictive than those required"; "may refuse an application for Discretionary Development even if it meets the requirements of this Bylaw" | arch_mun_edm7100 | 7.100 1.1.9, 1.1.10 | rule | 85 |
| Variance test | no undue interference with "amenities of the neighbourhood"; complies with MDP and statutory plans | arch_mun_edm7100 | 7.100 5.2–5.3 | rule | 85 |
| Notice (discretionary) | within 7 days of approval, by mail to owners "within 60.0 m of the boundaries of the Site", community league, BIA; Planner "must increase the 60.0 m notification boundary" if impacts are likely beyond it; all permits online within 7 days | arch_mun_edm7160 | 7.160 1.2–1.4 | rule | 85 |
| Site sign | only in RS, RSM, RM, RL, CN, MUN, MU zones or where the Planner requires: for new principal buildings, within 2.0 m of a front or flanking lot line, within 14 days of the permit becoming valid, kept to final occupancy. Not by default on BE/IM/IH | arch_mun_edm7160 | 7.160 2.2 | rule | 85 |
| Appeal | to SDAB; applicant 21 days after the decision; "any person affected" 21 days after notice | arch_mun_edm7170 | 7.170 1–2 | rule | 85 |
| SDAB timing | hearing "within 30 days of the notice of appeal being filed"; notice "at least 5 days before"; written decision "within 15 days after concluding the hearing" (only MGA s. 645 cited) | arch_mun_abSdabTimelines | fact sheet (undated, marked "Archived") | government guide | 70 |
| SDAB and Direct Control | SDAB "cannot hear a development permit appeal for Direct Control District lands" where Council decides; limited appeal where delegated | arch_mun_abSdabManual2011 | MGA s. 641 summary, p. 16 (2011) | government guide (old) | 50 |
| Rezoning / DC instead | Council at public hearing; DC needs 21-day pre-application notice | arch_rz_edmRezoning | rezoning.md §3 | government guide | 85 |
| Processing times | actuals Apr–Jun 2026; from complete application to decision; leave out notice and appeal | edmProcTimes | saved PDF | government data | 70 |
| DP / BP fees 2026 | 2026 fee schedule PDF refused (robots); fee-listing page gives no amounts | ? | ? | ? | 0 |
| Building permit | Safety Codes Act permit; City pages read gave no steps | ? | ? | ? | 0 |

### 1c. Electricity

| what | rule | source id | where | kind | conf. |
|---|---|---|---|---|---|
| BC Hydro major distribution | "greater than 5,000 kW in a 25 kV service area, or 2,500 kW in a 12 kV service area" | arch_mun_bchMajorDist | page (captured 28 May 2024 ?) | utility guide | 75 |
| Steps and times | request 1–2 weeks; conceptual review "No cost", 1–2 months; detailed design "One to two years"; construction "Six to 18 months" | arch_mun_bchMajorDist | same | utility guide | 75 |
| Payments | design deposit "typically 7% to 15% of the full project estimate"; construction "paid in full" before it starts | arch_mun_bchMajorDist | same | utility guide | 75 |
| Extension cost and refunds | BCUC-approved extension policy; first-payer refunds at 5/10/15 years | bchDEP2025; bchExtension2026 | register | rule (tariff) | 80 |
| Transmission | "can take years"; typical durations only | bchTransmission | register | utility guide | 70 |
| BC ≥ 10 MW | data-centre requests of 10 MW or more restricted; competitive process ≤ 145 MW | bcReg8_2026; bchCfDRfA | register | rule | 80 |
| BCUC role | approves BC Hydro tariffs and extension policy; CPCN for new BC Hydro substations (e.g. West End) | bchDEP2025; wes | register | rule / regulator | 70 |
| BCUC role for the data centre itself | ? none found for a customer below 10 MW (our reading) | ? | ? | our reading | 30 |
| EPCOR connection | Customer Connection Guide: clearances, right-of-way, truck access; no timeline recorded | epcor_ccg | s. 6.4, 3.10 | utility guide | 75 |
| EPCOR timeline | ? not read | ? | ? | ? | 0 |
| Alberta ≥ 75 MW transmission | "large data centre"; AESO may require "municipal zoning approvals" and permits; tethering; bridging only after AUC plant approval | alta117_2026; aesoBYOG2026 | ss. 2, 7, 9 | rule | 85 |
| AUC: generators | approval "before constructing or operating any power plant" of 1 MW or more, including "emergency and/or backup generation"; "cumulative capability of all generating units located at the site" | arch_mun_aucAnn2026 | announcement 26 Oct 2026 | regulator notice | 85 |
| AUC: route | ≥ 10 MW full application with participant involvement; 1 to < 10 MW checklist, approval "within five business days" of a complete one; legal basis HEEA s. 11 | arch_mun_aucPowerPlant | AUC page (eff. 25 Apr 2022) | regulator guide | 80 |
| AUC noise | "Temporary or backup generation is not exempt from Rule 012"; testing is non-emergency | arch_mun_aucAnn2026; rule012 | same | regulator notice | 85 |
| AUC precedent | Amazon Data Services Canada, testing schedule | auc_27938 | paras 8, 10 | regulator decision | 80 |
| AUC over municipality | NRCB/AUC approvals "prevail over any statutory plan, land use bylaw" that conflicts (MGA s. 619 summary) | arch_mun_abSdabManual2011 | p. 7 (2011) | government guide (old) | 50 |

### 1d. Air (generators)

| what | rule | source id | where | kind | conf. |
|---|---|---|---|---|---|
| MV prohibition | "no person may in the course of conducting an industry, trade or business ... discharge ... any air contaminant" (subject to s. 7) | mvBylaw1082 (add s. 5 to entry) | Bylaw 1082 s. 5 (consol. 29 May 2020) | rule | 85 |
| MV exemptions | s. 7(9) "internal combustion engines in compliance, if applicable, with the Motor Vehicle Act"; s. 7(12) under 100 kg/day CO and 5 kg/day NOx and SOx | mvBylaw1082 | s. 7(9), 7(12) | rule | 85 |
| MV emergency engines | exempt from Parts 3–6, 9; s. 13 exhaust; s. 57 Tier 0/1 100 m | arch_mv1329; mvBylaw1329 | register | rule | 85 |
| MV permit process | public notification for new permits: post "for 30 days" within 15 days of signing; newspapers; BC Gazette; "several months to a year or more"; apply "at least one year in advance"; standby fuels often "a maximum of 350 hours per year"; appeals under EMA Part 8 | arch_mun_mvAirGuide2020 | pp. 6–9, 34, 50 | government guide | 80 |
| Does a data centre's genset need an MV permit? | ? depends on 7(9) and 7(12) and on hours; not settled | — | — | ? | 30 |
| Alberta EPEA: rule | approval for "the construction, operation or reclamation of a power plant"; "power plant" = over "one megawatt under peak load", excluding a backup system that is "only used" when the principal source is interrupted, "is not connected to the electric distribution system" and is "no more than 50 megawatts" | abADR276 (add s. 2(2)(vv), Sch. 1 Div. 2 Part 9(i) to entry) | ADR s. 2(2)(vv)(iii); Sch. 1 Div. 2 Part 9 (CanLII, consol. to 177/2026) | rule | 85 |
| Alberta EPEA: guides | EPA: "a backup power generation system over 50 megawatts"; AUC page: "thermal power plants above one MW". Both match the ADR (backup exclusion vs general rule) | abDCenv2026 (= arch_sep_abEpaDC2026, same PDF); arch_mun_aucPowerPlant | EPA guide 20 Jul 2026; AUC page | government guide; regulator guide | 80 |
| Testing and grid-parallel sets | whether routine testing or a grid-connected set falls outside the backup exclusion | — | — | our reading ? | 30 |

### 1e. Sewer and water

| what | rule | source id | where | kind | conf. |
|---|---|---|---|---|---|
| MV permit triggers | no discharge of "a High Volume Discharge", "Uncontaminated Water", stormwater or groundwater without a Waste Discharge Permit | gvsdd299 (add s. 5.1–5.2) | Bylaw 299 s. 5.1, 5.2 (consol. 2023) | rule | 85 |
| High Volume Discharge | non-domestic waste "in excess of 300 cubic metres over any consecutive 30 day period" or "30 litres per minute" | gvsdd299 | s. 2 definition | rule | 85 |
| Uncontaminated Water | water "not substantially changed ... as to chemical or biochemical qualities or temperature" | gvsdd299 | s. 2 definition | rule | 85 |
| Storm sewer | only "Stormwater, Uncontaminated Water and water from the provision of municipal services" | gvsdd299 | s. 3.3 | rule | 85 |
| Temperature | 40 °C at the sewage facility; 65 °C for non-domestic waste | gvsdd299; arch_mvSewerBylaw299 | Sch. A 4(b), (c) | rule | 85 |
| Who issues in Vancouver | City issues the wastewater permit; Metro bills treatment charges; application $1,000; first review about three months | arch_mun_vanWWpage | City page | government guide | 70 |
| City sewer capacity | data centre goes to Low Impact analysis, then City Engineer review | vanSewerCap2025 | register | government policy | 80 |
| Vancouver Sewer and Watercourse By-law 8093 | ? PDF fetch failed (client error) | ? | ? | ? | 0 |
| Edmonton cooling water | non-contact cooling water to sanitary only with prior written EWSI approval | edm18100 | Bylaw 19627 Sch. 2 s. 5.10(i) | rule | 85 |
| Edmonton stormwater | owner controls release when directed; control required over 0.16 ha | edmBylaw18100; epcorStorm | s. 6.1 | rule / utility guide | 80 |
| Edmonton drainage review | P.Eng. sealed plans; approval letter (guide not opened) | epcorDrainage2023 | register | utility guide | 40 |
| River/inlet water, BC | divert only if authorized; changes in and about a stream need approval; sea not named | arch_sys_bcWSA; bcWSRfees | WSA s. 6(1), 11(1) | rule | 85 |
| River water, Alberta | Water Act licence to divert; new licence "stands last" | arch_sys_abWaterLic; abNewLicenceLast | guide | government guide | 80 |
| Fish | no harmful alteration of habitat without authorization; no deleterious substance (incl. heat-changed water) | arch_sys_fishAct; arch_sys_dfoReview; dfoScreen | s. 34(1), 35, 36(3) | rule | 85 |
| Indigenous consultation (AB) | duty only where Treaty rights could be adversely affected | abConsult | register | government guide | 60 |

## 2. Port lands and federal land

| what | rule | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Review applies | PER "applies to all proposed physical works and activities on federal lands and waters" | arch_sys_vfpaPER | Guide Sep 2022 p. 3 | agency guide | 85 |
| Categories | A minor, maybe temporary; B minor but needs technical analysis; C larger or more complex; D large, complicated | arch_sys_vfpaPER | p. 8 | agency guide | 85 |
| Times | A 1–10, B 10–60, C 60–120, D 120–170 business days (estimates, from a complete application) | arch_sys_vfpaPER | pp. 12–15 | agency guide | 85 |
| Public engagement | A none; B "May require a 30 calendar day public comment period"; C and D engagement, Indigenous consultation, 30-day registry comment | arch_sys_vfpaPER (add p. 8 engagement) | p. 8 | agency guide | 80 |
| Fees | A N/A; B $2,500 "if consultation required" ($500 otherwise ?); C $12,500; D $22,500 (plus GST); deposit 1 % of cost, $1,500–10,000 | arch_sys_vfpaPER | pp. 23–24 | agency guide | 80 |
| Building permits | "The Vancouver Fraser Port Authority issues building permits for buildings and structures" (NBC 2020) | arch_sys_vfpaPER (add p. 22) | p. 22 | agency guide | 80 |
| Utilities | "major utilities serving port property are provided by local municipalities"; trade permits "Typically ... obtained from the British Columbia Safety Authority" (now Technical Safety BC: our note, not in the guide) | arch_sys_vfpaPER (add p. 6) | p. 6 | agency guide | 75 |
| Land use | Land Use Plan designations; projects must conform | arch_rz_vfpaLup2026; arch_rz_canMarineAct48 | rezoning.md §5 | rule / guide | 80 |
| IAA s. 82 | authority must decide if "significant adverse environmental effects" are likely before a permit; Notice of Intent; comment "at least 30 days (subsection 86(2))" | arch_mun_iaaS82guide | IAAC guidance (Dec 2021, mod. 17 Dec 2025) | government guide | 80 |
| City zoning on port land | not stated in any source read; VFPA issuing its own building permits supports it (our reading) | ? | ? | our reading | 45 |
| Other federal land (rail, airport) | ? not researched | ? | ? | ? | 0 |

## 3. Alberta Municipal Government Act

| what | rule | source id | where | kind | conf. |
|---|---|---|---|---|---|
| MGA text | King's Printer and edmontontribunals.ca refused (robots); open.alberta.ca catalogue (21 Jun 2024) has no PDF; Calgary (1 Apr 2024) and Lethbridge copies cut off before Part 17 | arch_zon_MgaToc | TOC only | — | 0 |
| Section titles | 606 "Requirements for advertising"; 619 "NRCB, ERCB, AER, AEUB or AUC authorizations"; 640 "Land use bylaw"; 641 "Designation of direct control districts"; 642 "Permitted and discretionary uses"; 684 "Permit deemed refused"; 685 "Grounds for appeal"; 686 "Appeals"; 687 "Hearing and decision"; 692 "Planning bylaws" (confirmed at check 2) | arch_zon_MgaToc (add these titles to entry) | TOC (current as of 1 Apr 2024) | rule (titles) | 80 |
| Permitted use | "the development authority must issue the permit" if it conforms | arch_mun_abSdabManual2011 | p. 15 (s. 642) | government guide (old) | 50 |
| Discretionary use | may "refuse the application, approve the application or approve the application with conditions" | arch_mun_abSdabManual2011 | p. 15 (s. 640) | government guide (old) | 50 |
| Deemed refusal | "within the 40 days" (s. 684); matches Bylaw 20001 7.100 2.5 | arch_mun_abSdabManual2011; arch_mun_edm7100 | p. 24 | guide (old) + rule | 75 |
| Appeal period | 2011 manual says 14 days; current fact sheet and Bylaw 7.170 say 21 days → use 21 | arch_mun_abSdabTimelines; arch_mun_edm7170 | — | rule | 80 |
| SDAB powers | "may confirm, revoke or vary" the decision or conditions (s. 687) | arch_mun_abSdabManual2011 | p. 5 | guide (old) | 50 |
| Direct Control | no SDAB appeal where Council decides (s. 641) | arch_mun_abSdabManual2011 | p. 16 | guide (old) | 50 |
| AUC prevails | s. 619 | arch_mun_abSdabManual2011 | p. 7 | guide (old) | 50 |
| Public hearing for bylaws | s. 692 (title only); City page confirms hearing for rezonings | arch_zon_MgaToc; arch_rz_edmRezoning | — | rule (title) / guide | 60 |
| Subdivision regulation | Alta Reg 84/2022 | arch_zon_AbLegRefs2026 | — | government | 80 |

J.B. could get the MGA consolidation through UBC Library or from King's Printer directly (kings-printer@gov.ab.ca).

## 4. Other jurisdictions (benchmarks; none apply in BC or Alberta unless marked Canada)

| place | what | rule | source id | where | kind | conf. |
|---|---|---|---|---|---|---|
| Haarlemmermeer (NL, outside Canada) | location | only "Polanenpark, Schiphol-Rijk, Schiphol Trade Park (STP) en Corneliahoeve"; "geen datacenters ... in het buitengebied"; outside these, extensions ≤ 10 % | arch_mun_hmmParaplu2020 | Gemeenteblad 2020, 306084, s. 5.1, 5.3 | government policy | 80 |
| Haarlemmermeer | heat | waste heat to an existing or planned network "op een bruikbare temperatuur"; otherwise keep "ruimte ... voor toekomstige levering van restwarmte" | arch_mun_hmmParaplu2020 | s. 6.3.2 | government policy | 80 |
| Haarlemmermeer | energy and power | "PUE < 1,2"; "dragen bij aan de stimulering van opwek van hernieuwbare energie" (help stimulate renewable generation); > 80 MVA builds own 150 kV station; 750 MVA cap to 2030 | arch_mun_hmmParaplu2020 | s. 6.2, 6.2.1, 6.3.2 | government policy | 80 |
| Haarlemmermeer | design | nature-inclusive, rainwater capture, solar built in; no large fences | arch_mun_hmmParaplu2020 | s. 6.1 | government policy | 75 |
| Amsterdam (NL) | pause | council 12 Jul 2019 "voorbereidingsbesluit" for the whole city, "met betrekking tot datacenters", one year: change of use barred, building permits "aangehouden" | arch_mun_amsVoorb2019 | Staatscourant 2019, 42491 | rule | 80 |
| Amsterdam (NL) | form | 2020–2030 policy: "intensief gestapeld" | amsterdamDC2020 | register | government policy | 75 |
| Ireland (outside Canada) | power | new data centres provide generation and/or storage "either onsite or local in proximity" to match maximum import; it must "participate in the wholesale electricity market"; ≥ 80 % of annual demand from additional renewables (6-year glide path); location test constrained vs unconstrained | arch_mun_cruDec2025 | CRU page 12 Dec 2025 (decision CRU2025236 ?) | regulator decision | 80 |
| Singapore (outside Canada) | allocation | DC-CFA2 (1 Dec 2025): "At least 200MW"; "PUE of 1.25 (at 100% IT load) or better"; "at least 50% powered by eligible green energy pathways"; SS 715:2025 IT efficiency; no heat-reuse or location condition stated | arch_mun_sgDCCFA2 | EDB/IMDA fact sheet | government | 80 |
| Frankfurt / Germany | location and heat | Rechenzentrenkonzept 2022 (heat "anzustreben", no quota); EnEfG § 11 PUE and ERF | src20 | research note 20 | rule / policy | 75 |
| Fairfax and Loudoun (US) | setback, noise | Fairfax 200 ft building / 300 ft equipment from R lots; pre- and post-construction noise studies; Loudoun SPEX only | src19; loudounDC | research note 19 | rule | 75 |
| Prince William County (US) | permission | DCOZOD adopted 22 Sep 2026 (Ord. 26-67): outside the overlay new proposals need a Special Use Permit; PC recommended 500 ft from homes and schools for pathway 5 (not confirmed in ordinance ?) | arch_mun_pwcDCOZOD | County page | government | 70 |
| Quebec (Canada) | power allocation | Hydro-Québec's duty to distribute "does not apply" to requests "for 5,000 kilowatts or more"; needs "the authorization of the Minister". Transitional: applies "until" a regulation under the Régie Act s. 112 takes effect (now? ?) | arch_mun_qcBill2023 | 2023 c. 1 s. 10 | rule | 85 |
| Quebec (Canada) | criteria | grid capacity; "retombées sur l'économie et le développement régional"; "l'impact environnemental et social"; policy fit | arch_mun_qcNews2023 | quebec.ca 12 May 2023 | government | 75 |
| Quebec (Canada) | application form | binding commitments if a block is awarded | arch_mun_hq5MW | HQ form 963-3367 (2026-06) | utility form | 70 |
| Quebec (Canada) | capacity maps | indicative only | hqZones | register | utility | 70 |
| Ontario (Canada) | connection approval | Bill 40 amendments to Electricity Act: covered data centres need "approval from the Minister of Energy and Mines to connect"; threshold not set (50 MW given only as an example) | arch_mun_onERO251001 | ERO 025-1001 (5 Sep 2025) | government proposal | 70 |
| Ontario (Canada) | criteria | proposed three pillars: economic development, data sovereignty, communities and public trust (incl. "minimal impacts on the technical and fiscal capacity of host communities and their utilities"); no heat; "greater than 1 MW" as an example only | arch_mun_onERO260853 | ERO 026-0853 (13 Aug 2026), proposal | government proposal | 65 |
| Calgary / Rocky View (Canada) | zoning | no Calgary data-centre use; Rocky View S-DAT district, 30 m setback, Rule 012 | src21 | research note 21 | rule | 70 |

What they require, in short: **heat** only Haarlemmermeer and Germany (EU EED > 1 MW); **noise and setback** in the US counties and Rocky View; **location** in Haarlemmermeer, Amsterdam, Ireland (grid), Prince William; **power** in Ireland, Singapore, Quebec, Ontario, Alberta (AESO).

## 5. Gaps "?"

- MGA ss. 606, 619, 640–642, 684–687, 692: text not read (robots; truncated copies). Only Alberta summaries, one from 2011.
- Alberta EPEA trigger: settled (ADR s. 2(2)(vv)). Open: does routine testing or a grid-parallel set lose the backup exclusion?
- Vancouver BoV fee ($3,060) and the "relaxation" limit: City page sections collapsed in the check-2 extract.
- Vancouver DP Board referral thresholds; DP and BP processing times; BP fees; VBBL permit clauses.
- Vancouver Sewer and Watercourse By-law 8093 (fetch failed) and Waterworks By-law.
- Edmonton 2026 fee schedule (robots); building permit steps; EPCOR power and drainage timelines.
- Whether Bylaw 1082 s. 7(9) exempts stationary standby gensets (carried over).
- Is Bylaw 1082 still the current air bylaw (2020 consolidation)? ?
- City zoning on port land: no clause read; other federal land not researched.
- Fairfax/Loudoun, Frankfurt, Calgary rows cite internal notes (src19–21): swap for the primary ids (e.g. fairfaxDC2024).
- Loudoun in-force text; Prince William ordinance text; CRU decision paper itself (CRU publications page refused, robots).
- Edmonton SDAB procedures PDF refused (robots).
- portvancouver.com category and PER pages: client error; guide read instead.

Check 2 applied (3 Nov 2026)
