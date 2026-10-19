# A — Tax, who the computing serves, and after the data centre
Research pass 19 Oct 2026. Follows RULES.md.
Register checked first: related ids `horizons`, `ewaste`, `existing_building`, `floor_load_need`, `interconnection`, `e_interconnection`, `jobs`, `ledger`, `futures`, `meta.lifecycle`, `cfd_score`, sources `vanTax`, `epraBC`, `armaElectronics`, `itsp40006`, `velkova2019`, `edmPermits`.
No tax node exists yet. The items below are new unless marked "adds to".
Quotes are as returned by the page reader. Spot-check the starred (*) items before you build.

---

## 1. Property tax paid to the city

### What the tool could compute or show
- Annual property tax = assessed value (land + taxable improvements) × combined rate for the class.
- What share of that money goes to the City and what share to school and regional bodies, and what the City spends it on.
- The things that are not taxed: computing equipment in Alberta, and possibly servers in BC (see the gap below).

### Findings: Vancouver
- **2026 general purposes rate, Class 6 Business & Other: 7.09436 per $1,000** (averaged 7.08019; DPRP-eligible land 3.54718). Class 5 rate is the same.
  - Source: City of Vancouver, RTS 18298, report to Council for 5 May 2026, pp. 3, 4, 10. https://council.vancouver.ca/20260505/documents/r2.pdf. Source type: municipal government. Confidence **90**.
- **Combined rate for all taxing authorities, Class 6: $12.45303 per $1,000** ($12.46720 with the DPRP adjustment; $8.92002 on DPRP-eligible land). For comparison, Class 1 is $3.36394, Class 4 Major Industry $37.37706 and Class 2 Utilities $52.83589.
  - Source: same report, App. A, p. 7. Confidence **90**.
- **The total combined rate splits by authority (Class 6, 2026).**
  - Provincial school: 4.05900 (council a2).
  - TransLink: 1.07093 (a3).
  - BC Assessment: 0.11353 (a4).
  - MFA: 0.00050 (a5).
  - Metro Vancouver: by separate by-law, rate not read.
  - Sources: https://council.vancouver.ca/20260505/documents/a2.pdf, a3.pdf, a4.pdf, a5.pdf. Confidence **90**.
- **The general purposes levy is $1,226,186,396.** Class 6 pays $485,647,684 (my arithmetic: 39.6%). The report gives "about 57.5% residential and 42.5% non-residential".
  - Source: r2.pdf, pp. 2, 3, 7. Confidence **90** (the 39.6% is arithmetic, confidence **100**).
- **What the City spends it on.** "Property taxes fund approximately 56%" of the 2026 Operating Budget: $1,333.3 M of $2,392.5 M.
  - Shares of expenditure: Police 22% ($525.3 M), Utilities 24%, Fire 9%, Parks & Recreation 8%, Engineering Public Works 6%, Library 3%, Debt and Capital 9%.
  - Source: City of Vancouver 2026 Budget, pp. 7, 8, 11. https://vancouver.ca/files/cov/2026-budget.pdf. Confidence **80**.
  - Note: this is spending from all revenue, not a split of the tax dollar alone.
- **Class 6 is the residual class.** "Class 6 property shall include all land and improvements not included in Classes 1 to 5 and 7 to 9."
  - Class 5 is land or improvements "used or held for the purpose of extracting, processing, manufacturing or transporting of products".
  - Source: Prescribed Classes of Property Regulation, B.C. Reg. 438/81, ss. 5–6. Archived consolidation current to 25 Sep 2012. https://www.bclaws.gov.bc.ca/civix/document/id/loo88/loo88/438_81. Confidence **90** for the text.
  - That a data centre is Class 6 and not Class 5 is **interpretation**, confidence **60**. No BC Assessment ruling on data centres was found.
- **How the value is set.** "The assessment value of a property is the value of its land and improvements (building and fixtures)"; "BC Assessment uses market value". There are nine classes.
  - Source: Gov. BC, Property assessment and classes (updated 1 Dec 2022). https://www2.gov.bc.ca/gov/content/governments/local-governments/finance/requisition-taxation/local-government-taxation/property-assessment-classes. Confidence **90**.
  - Market value is set "as of July 1st" using the "Direct Comparison Approach, Cost Approach, and Income Approach". Source: BC Assessment, Industrial/commercial/investment. https://info.bcassessment.ca/about/Pages/industrial-commercial-investment.aspx. Confidence **90**.
- **What counts as an improvement.** "Improvements" means "any building, fixture, structure or similar thing constructed or placed on or in land…", but not "(a) production machinery; (b) anything intended to be moved as a complete unit in its day to day use; (c) furniture and equipment that is not affixed…".
  - Production machinery = "any engine, motor or machine used to manufacture, process, repair or convey a product".
  - Source: Assessment Act s. 1(1), as quoted in Teck Metals v Assessor of Area 21, 2026 BCSC 781, paras [8], [46]. Court decision, confidence **90** for the text.
  - Whether racked servers count as improvements is **not settled in anything read**, confidence **0**.
- **Some communications equipment is excluded.** The Assessment Act Regulation excludes "portable elements of communications, security or fire protection systems" from improvements (s. 1.2(1)(a)). It does not mention computers.
  - Source: B.C. Reg. 433/98, current to 13 Oct 2026. https://free.bcpublications.ca/civix/document/id/complete/statreg/433_98. Confidence **90**.
- **Adds to `vanTax`.** City open data already holds land value, improvement value and `tax_levy` per folio. For an existing building the tool can show the actual levy instead of estimating it. Confidence **80**.

### Findings: Edmonton
- **2026 municipal rate, Non-Residential: 0.0252216.** Residential is 0.0077419.
  - Machinery and Equipment: 0, "*Exempt by City Bylaw".
  - M&E means "machinery and equipment used for manufacturing and processing" (s. 2(h)).
  - Source: City of Edmonton Bylaw 21442, 2026 Property Tax and Supplementary Property Tax Bylaw (passed 28 Apr 2026), Schedule A. https://www.gov.edmonton.ab.ca/sites/default/files/public-files/documents/bl21442.pdf. Confidence **90**.
- **2026 education rate, Non-Residential: 0.0039677.**
  - ASFF requisition allowance: 0.0000770.
  - Designated Industrial Property requisition: 0.0000728 (MO MAG:003/26).
  - Source: same bylaw, Schedule A. Confidence **90**.
- **How the levy is applied.** The Chief Administrative Officer is "authorized to levy the tax rate set out in Schedule 'A' against the assessed value". Source: Bylaw 21442 s. 6(1). Confidence **90**.
- \* **Rate units.** The rates read as tax per $1 of assessed value, so 0.0252216 = $25.22 per $1,000. This is **inferred** from the bylaw format, confidence **60**.
  - Cross-check: the City's page gives "about $816 per year per $100,000" (residential), which does not match 0.0077419 × 100,000 = $774. Confirm the unit and year before use.
- **What the City spends it on.** "Where taxes go" gives a monthly breakdown for a typical home: Police $51, Debt Repayment $40, Transit $36, Fire Rescue $27, Parks and Roads $25, Neighbourhood Renewal $22, … Library $6. Total $317/month.
  - Source: City of Edmonton, https://www.edmonton.ca/city_government/budget_finances/where-taxes-go. Confidence **80**.
  - The house value this assumes is not stated. Use the shares, not the dollars.
- **How the value is set.** Assessments "reflect the market value" as of "July 1st of the previous year". The classes include Non-Residential and Machinery & Equipment.
  - Source: https://edmonton.ca/assessment. Confidence **90**.
- **Large data centres: provincial assessment and levy.** Data centres "that use over 75 megawatts … will be assessed by the province as Designated Industrial Property". "Computing equipment is not subject to assessment."
  - Assessable: power generation and backup power, building and improvements, HVAC and cooling, site-wide electrical, fire suppression, security, land.
  - Source: Alberta Municipalities, "Property taxes generated from a data centre", 7 Apr 2026. https://www.abmunis.ca/news/property-taxes-generated-data-centre. **Municipal association**, confidence **50**.
  - Primary bulletin (Municipal Affairs Assessment Bulletin 25-02): see "Could not read".
- **Same body, second page.** "The buildings, structures, and land are assessed at market value like any other commercial property."
  - Grid-connected power generation is "assessed as a linear property". Off-grid generation is assessed "as machinery and equipment".
  - The levy is "2 per cent … on the value of the computing equipment of data centres of 75 megawatts or greater that are connected to Alberta's power grid".
  - Source: Alberta Municipalities, Property Assessment and Taxation. https://www.abmunis.ca/advocacy-resources/governance/property-assessment-taxation. Municipal association, confidence **50**.
- **Government statement of the levy.** "Large-scale data centres pay a levy of up to 2 per cent on the value of their computing equipment"; "fully deductible against corporate income taxes paid in Alberta"; "Municipalities collect property taxes on the buildings".
  - Source: Government of Alberta, AI Data Centres, Who benefits. https://www.alberta.ca/datacentres/who-benefits. Government page, confidence **80**.
  - The page does not name the statute, the threshold or the start date.
- **Start date and depreciation.** "The levy is scheduled to come into effect on December 31, 2026". Large data centres are "recognized as designated industrial properties" with an "accelerated 5-year schedule" of depreciation. "Only land and buildings associated with data centres will be subject to municipal assessment and taxation."
  - Source: RMA, Data Centre Levy Announcement, 19 Sep 2025. https://rmalberta.com/news/data-centre-levy-announcement/. Municipal association, confidence **50**.
  - The date conflicts with abmunis "In 2026, the Alberta government implemented…". Unresolved.

### Vancouver vs Edmonton
- **Both:** market value at 1 July; land plus improvements; tax = value × class rate. Non-residential pays about 3–4× the residential rate.
  - Vancouver general purposes: 7.09436 ÷ 1.93406 = 3.67×.
  - Edmonton municipal: 0.0252216 ÷ 0.0077419 = 3.26×. Arithmetic, confidence **100**.
- **Vancouver:** BC Assessment values the property and the City sets the rate. No data-centre-specific rule was found. It is unclear whether servers are taxable.
- **Edmonton:** the City assesses facilities under 75 MW. Above 75 MW the Province assesses them as Designated Industrial Property.
  - Computing equipment is not assessed; above 75 MW the provincial levy (up to 2%) falls on it instead, and that money goes to the Province, not the City.
  - Vancouver has **no equivalent levy**.
- **City revenue.** Vancouver publishes the actual levy per folio. Edmonton's equivalent dataset was not confirmed in this pass.

### Proposed nodes
- **`property_tax`** (new; tier: community, full)
  - Formula: (land value + taxable improvement value) × Σ class rates for the city.
  - Vancouver Class 6: 12.46720 per $1,000. Edmonton non-residential: (0.0252216 + 0.0039677) × 1,000 = 29.19 per $1,000, unit to confirm.
  - Inputs: `floor_area`, `build_cost` (cost approach) or the actual folio values.
  - Confidence 60. Rates are 90; the improvement value for a new building is an assumption.
- **`tax_split`** (new; tier: resident)
  - Rule: show the parties, not a sum. City / school (province) / TransLink and BCA (Vancouver); City / education (province) (Edmonton).
  - Then the City's spending shares (Vancouver budget p. 7; Edmonton "where taxes go").
- **`untaxed_equipment`** (new; tier: full)
  - Rule: list the components and their status per city.
  - Alberta: computing equipment not assessed, ≥75 MW provincial levy up to 2% (confidence 50 until the bulletin is read).
  - BC: servers unknown, confidence 0.
- **`tax_actual`** (adds to `vanTax`; tier: community)
  - For an existing building, read `tax_levy` from Vancouver open data.
  - Edmonton is a gap.

### Could not read / still a gap
- Alberta Municipal Affairs Assessment Bulletin 25-02 (16 Dec 2025, open.alberta.ca PDF). Blocked: the URL was not accepted by the fetch tool.
- open.alberta.ca/publications/2026_117 "Data Centre Regulation" failed twice (server error). The statute behind the levy and its exact threshold remain unread.
- BC Assessment has no published data-centre classification or ruling on servers as improvements.
- Vancouver Metro Vancouver (regional district) Class 6 rate: by-law not read.
- Edmonton rate unit and the $816/$100,000 mismatch: unresolved.
- Edmonton open-data field list for assessed value per account: not confirmed in this pass.

---

## 2. Who benefits from the computing

### What the tool could compute or show
- A factual statement of what local computing gives: data that must stay in Canada, a short network path, and local internet exchange.
- What it does **not** give: residency is not sovereignty, and a downtown site is not needed for most workloads.
- Shown as text with sources. No score.

### Findings
- **Federal rule on where government data is stored.** Protected B, Protected C and Classified data "will be stored in a GC-approved computing facility located within the geographic boundaries of Canada".
  - Archived as ITPIN 2017-02, now "Requirement 4.4.3.14 in the Directive on Service and Digital".
  - Source: TBS, Direction for Electronic Data Residency. https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/cloud-services/direction-electronic-data-residency.html. Federal policy, confidence **90**.
- **Residency is not sovereignty.** "Data residency does not mitigate against the application of foreign laws"; "Canada cannot ensure full sovereignty over its data". FISA is named as "the primary risk".
  - Source: GC White Paper, Data Sovereignty and Public Cloud (2018; page modified 23 Apr 2026). https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/cloud-services/digital-sovereignty/gc-white-paper-data-sovereignty-public-cloud.html. Government, confidence **80**.
  - The page notes a newer Digital Sovereignty Framework exists, not read.
- **BC removed its data-residency rule in 2021.** FIPPA s. 33.1: "A public body may disclose personal information outside of Canada only if the disclosure is in accordance with the regulations".
  - The regulation requires an assessment of any program "in which sensitive personal information" is disclosed "to be stored outside of Canada".
  - Source: Gov. BC FOIPPA Manual, s. 33.1 (updated 22 Apr 2026). https://www2.gov.bc.ca/gov/content/governments/services-for-government/policies-procedures/foippa-manual/disclosure-outside-canada. Confidence **90**.
  - OIPC BC: "In November 2021, the data residency provisions" changed, and the framework "permits the disclosure of personal information outside of Canada". https://oipc.bc.ca/guidance-documents/3646. Regulator, confidence **90**.
- **Alberta:** the Protection of Privacy Act "came into force on June 11, 2025". Neither the OIPC AB nor the alberta.ca page says anything on storage outside Canada.
  - Sources: https://oipc.ab.ca/legislation/popa/ ; https://www.alberta.ca/about-the-protection-of-privacy-act. Confidence **0** for any residency rule. Gap, not a finding that there is none.
- **BC Hydro's 2026 call weights data sovereignty at 30%.** Already in the register (`cfd_score`, confidence 90). This is a provincial incentive, not a residency law.
- **Internet exchanges by city.** Vancouver has VANIX (78 participants), UNM-Exch Canada-West (64) and CSIX (16). Edmonton has YEGIX (9).
  - Source: Internet Society Pulse IXP tracker, "Last updated in Pulse October 2026", draws on PeeringDB. https://pulse.internetsociety.org/en/ixp-tracker/country/CA/. Non-profit dataset, confidence **70**.
- **VANIX:** "Vancouver Internet Exchange", incorporated 29 Aug 2015 under the "Canada Not-for-profit Corporations Act". https://vanix.ca/about/history/. Operator **claim**, confidence **50**.
- **YEGIX:** "exchange of Alberta-based Internet traffic"; operates "on a not-for-profit basis"; aims at "direct access to local internet content". https://yegix.ca/about.html. Operator **claim**, confidence **50**.
- **What an exchange did in Calgary (YYCIX).** Before it, "all of the city's Internet traffic was being routed through Seattle".
  - Members' latency dropped "from anywhere between 4 and 35 milliseconds to less than 1 millisecond".
  - During the 2013 floods, members stayed online.
  - Source: Internet Society case study, 2022. https://internetsociety.org/wp-content/uploads/2022/06/2022-Calgary-IXP-Case-Study.pdf, pp. 2–5. Non-profit report quoting operators: **claims**, confidence **50**.
- **Boomerang routing (peer-reviewed).** "Internet transmissions originating and terminating in Canada are routinely routed through the United States" (more than 25,000 traceroutes).
  - Source: Obar & Clement 2013, TEM Proceedings, Canadian Communication Association (abstract). https://papers.ssrn.com/abstract=2311792. Confidence **70**. No percentage in the abstract.
- **Latency targets.** Already in the register (`interconnection`: Satyanarayanan 2017, "a few tens of milliseconds"). Not duplicated.
- **Fibre delay.** Light in fibre ≈ c ÷ n ≈ 4.9 µs per km, assuming n ≈ 1.47. So 100 km ≈ 0.5 ms one way.
  - Confidence **60**: physics with an assumed index. ITU-T G.114 was not read.
  - This shows that distance inside a metro area is small next to the "tens of ms" target.

### Vancouver vs Edmonton
- **The same:** both are subject to the federal rule on government data.
- **Provincial privacy:** BC has an explicit rule since 2021 (assessment for sensitive data stored abroad). Alberta: none found.
- **Exchange participants:** Vancouver has about 158 across three IXPs; Edmonton has 9 at one.
  - That is a real asymmetry. Edmonton's peers may also use Calgary's YYCIX, but this was not verified.

### Proposed nodes
- **`computing_served`** (new; tier: resident)
  - Rule: a text panel of up to four sourced statements:
    1. Federal Protected B+ data must be in Canada.
    2. BC: sensitive data abroad needs an assessment. Alberta: no rule found.
    3. The local exchange and its participant count.
    4. "Residency ≠ sovereignty" (GC white paper).
  - No score. Confidence: as each source.
- **Adds to `interconnection`:** fill the "Locations of internet exchange points … not yet sourced" gap with **names and participant counts only**, from ISOC Pulse.
  - Locations are **not** given, per the security rule.
- **`latency_distance`** (optional; tier: full)
  - Formula: one-way ms ≈ route km × 0.0049. Compare with the `interconnection` targets.
  - Confidence 60.

### Could not read / still a gap
- Obar & Clement chapter on OpenEdition (books.openedition.org/uop/929): bot challenge. Not circumvented.
- TBS Directive on Service and Digital 4.4.3.14: current text not read; only the archived ITPIN was.
- GC Digital Sovereignty Framework (newer): not read.
- Alberta POPA statute text: no section on storage abroad read.
- ITU-T G.114 full text: behind a login.
- No government or peer-reviewed measure of **local resident** benefit from an in-city data centre was found. The benefits found go to institutions, ISPs and operators, which is itself useful for the trade-off table.

---

## 3. After the data centre: reuse and decommissioning

### What the tool could compute or show
- What the building could become, and what leaves the site (servers, batteries) and under which program.
- Typical lives for the building and the equipment, set against `horizons`.

### Findings
- **Old data centres are hard to reuse (UK valuation guidance).** First-generation centres, once vacant, "tend to remain unoccupied and are not readily adaptable for other uses".
  - Modern centres are valued as "an uplift on the prevailing distribution warehouse tone … on the fully fitted data halls".
  - Unfitted halls are valued at "£0 until such time as they are fitted out". The modern trend is to adapt warehouses and light-industrial buildings.
  - Source: HMRC/VOA Rating Manual, Computer centres (published 5 May 2017, updated 21 Sep 2026), s. 8 and 2026 Practice Note paras 4.3–4.6. https://www.gov.uk/guidance/rating-manual-section-6-part-3-valuation-of-all-property-classes/section-281-computer-centres.
  - UK government guidance, transferred, confidence **70**. It also bears on topic 1: data centres are valued off the warehouse rent, plus plant.
- **Federal closures (SSC).** Shared Services Canada "inherited 720 legacy data centres in 2011" and has closed "more than 500".
  - Results: "$55 million in net run cost savings"; "$31.6 million in real property space was reclaimed".
  - Source: SSC, Closing the door on legacy problems (modified 6 Feb 2026). https://www.canada.ca/en/shared-services/campaigns/stories/closing-door-on-legacy-problems.html. Federal government, confidence **80**.
  - What happened to the rooms is not stated.
  - SSC now runs 4 enterprise data centres and is "closing aging data centres and migrating applications and data to the cloud". https://www.canada.ca/en/shared-services/corporate/data-centre-consolidation.html (30 Dec 2025). Confidence **80**.
- **Surveyed building lives (StatCan).** Office buildings 27.0 yr; warehouses, refrigerated storage and freight terminals 25.4; plants for manufacturing 25.4; other commercial 20.7.
  - Source: Statistics Canada 15-206-X, An Update on Depreciation Rates…, Table C.1-1, "Surveyed lives (1985 to 2010)". https://www150.statcan.gc.ca/n1/pub/15-206-x/2015039/t/tblc11-eng.htm. Confidence **80**.
  - These are economic (depreciation) lives, not physical lives.
- **Computers and computer peripheral equipment: 4 years** (StatCan service life).
  - Source: StatCan 13-604-M no. 85 (15 May 2017), Chart 1. https://www150.statcan.gc.ca/n1/pub/13-604-m/13-604-m2017085-eng.htm. Confidence **80**.
  - Adds a Canadian figure to `horizons` (LBNL 5.7 yr is already in).
- **BC electronics stewardship.** The Recycling Regulation (B.C. Reg. 449/2004) Sch. 3 covers IT devices, including "other devices, equipment or media for collecting, storing, processing, presenting or communicating information".
  - The old s. 2(2) excluded "computers and televisions that are part of or attached to vehicles, marine vessels or commercial or industrial equipment".
  - Amended effective 21 Nov 2025 (B.C. Reg. 170/2025). The amended text was **not read**.
  - Source: https://free.bcpublications.ca/civix/document/id/complete/statreg/449_2004_pit. Confidence **90** for the old text, **20** for current scope.
- **BC 2025 explanatory notes.** The producer definition applies to products "used across all sectors, including residential and non-residential".
  - Batteries ≤ 5 kg are in Sch. 3. The category "excludes products used exclusively in an industrial, agricultural or military setting".
  - Source: Gov. BC, 2025 Recycling Regulation Amendments, Explanatory Notes, Sch. 3, pp. 1–3 (OIC 476, 27 Oct 2025). https://www2.gov.bc.ca/assets/gov/environment/waste-management/recycling/recycle/recycling_explanatory_notes_electrical_battery.pdf. Confidence **90**.
  - Large UPS batteries are not addressed. The new Sch. 7 large-battery category covers 12-volt consumer-installable batteries: plans by 31 Mar 2027, program by 1 Oct 2027.
- **Alberta electronics.** The Electronics Designation Regulation (Alta. Reg. 94/2004, made under EPEA) covers "computers, computer equipment and televisions".
  - Source: UNEP LEAP / FAOLEX summary. https://leap.unep.org/en/countries/ca/national-legislation/electronics-designation-regulation-alta-reg-942004-0. Confidence **70**: a legislation database summary, not the King's Printer text.
- **Alberta program.** ARMA lists "Computers and servers". A separate "corporate and institutional electronics recycling program" exists. The program expanded by "more than 500 materials" on 1 Apr 2025.
  - Source: https://www.albertarecycling.ca/programs/electronics/. Delegated authority, confidence **70**. Adds to `armaElectronics`.
- **Floor loads.** Already in the register (`floor_load_need`: NBC 2020 Table 4.1.5.3). Not duplicated.

### Vancouver vs Edmonton
- **Both** have provincial electronics programs that accept servers.
  - BC's commercial/industrial exemption changed in Nov 2025, current text unread.
  - Alberta's regulation names computer equipment.
- **Neither** province has a rule found requiring a data centre to be decommissioned or restored in a set way. Building demolition and permits are general (Edmonton demolition precedent in `edmPermits`).
- The StatCan lives and the SSC closures are national: the same for both cities.
- No Vancouver- or Edmonton-specific evidence was found on what replaced a closed data centre.

### Proposed nodes
- **`afterlife`** (new; tier: community, full)
  - Rule: at closure, list three streams.
    1. **Shell:** reuse or demolition. Evidence: VOA "not readily adaptable" (70); warehouse-based design keeps a warehouse use open, which is interpretation (20).
    2. **Equipment:** servers to a stewardship program or IT asset disposition, with sanitization (`itsp40006`). BC Sch. 3 / AB Reg. 94/2004.
    3. **Plant and batteries:** large UPS batteries are outside both consumer programs as read. Gap.
- **Adds to `horizons`**
  - Building economic life 25–27 yr (StatCan 80), alongside the current "shell ≤40" (60).
  - Computers 4 yr (StatCan 80), alongside LBNL 5.7.
- **Adds to `meta.lifecycle.closure`:** SSC 500+ of 720 closed since 2011 (80) as Canadian closure evidence.

### Could not read / still a gap
- Peer-reviewed studies of converting data centres **to** other uses: none found. Search returned only trade press and consultants, which were not used.
- CSA S478 (durability, design service life categories): standard not freely readable; only a consultant slide summary was found, not used.
- BC Recycling Regulation Sch. 3 as amended 21 Nov 2025: not read. The fetch returned the pre-amendment text.
- Alberta Reg. 94/2004 King's Printer text: not read. The FAOLEX link returned a different regulation (tires).
- Floor-to-floor heights for data halls versus offices: no government or peer-reviewed source found in this pass.
- Hong Kong TPB A/KC/484 (June 2022): the "data centre" there was redevelopment after demolition, not conversion. Not used.

---

## Round 2 (verification and gaps)
Second agent, 19 Oct 2026. Every source below re-opened by me. Quotes are as returned by the page reader.
Round 1 text above is left as written; where it is wrong, the correction is here.

### Task 1 — skeptic check

**1. Vancouver 2026 Class 6 rates — CONFIRMED.**
- r2.pdf p. 3 table headings: "2026 Unaveraged Rate", "2026 Averaged Rate", "2026 Tax Levy", "2025 Tax Levy".
  - Class 6 averaged 7.08019; 2026 levy $485,647,684; total levy $1,226,186,396.
  - Class 1 averaged 1.93406 (a 2026 rate, so the 3.67× ratio stands).
- p. 4 headings "2026 Averaged Rate", "2026 Adjusted Rate": Class 6 adjusted 7.09436; "DPRP n/a 3.54718".
- p. 7 App. A: Class 6 $12.45303; 12.46720 and 8.92002 (DPRP); Class 1 $3.36394; Class 2 $52.83589; Class 4 $37.37706.
- Unaveraged Class 6 rate: the reader returned two different values (7.04754, 7.07054). **Do not use** the unaveraged rate.
- Source discrepancies (in the report itself, not errors here):
  - p. 4 Class 6 levies sum to $485,635,527, not p. 3's $485,647,684.
  - App. C (p. 10) gives $1,224,250,000; p. 3 explains about $2.0 M of forgone port taxes.
- "Class 5 rate is the same": not re-checked. UNVERIFIED.

**2. Vancouver Class 6 split by authority — CONFIRMED.**
- School 4.05900 (a2, "2026 Tax Levies for Provincial Schools", School Act; replaces OIC rate 4.04000).
- TransLink 1.07093 (a3; replaces 1.06590).
- BC Assessment 0.11353 (a4; "the rate of 0.11353 is substituted for the rate of 0.11300").
- MFA 0.00050 (a5).
- Unit in all four: "being dollars of tax for each one thousand dollars of taxable value".
- Derived: 12.46720 − (4.05900 + 1.07093 + 0.11353 + 0.00050 + 7.09436) = **0.12888** left for Metro Vancouver (and any other levy). Arithmetic, confidence **60** until the by-law is read.

**3. Class 6 classification — CONFIRMED, better source.**
- Current consolidation now read: B.C. Reg. 438/81, "[Last amended September 16, 2024 by B.C. Reg. 263/2024]". https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/438_81
- s. 6: "Class 6 property shall include all land and improvements not included in Classes 1 to 5 and 7 to 9." Same as the 2012 archive.
- s. 5(b): "used or held for the purpose of extracting, processing, manufacturing or transporting of products". Unchanged.
- Data centre = Class 6 remains **interpretation, 60**.

**4. Edmonton rate units — CONFIRMED (resolved): per $1 of assessed value.**
- Bylaw 21442 Sch. A gives no unit and does not define "tax rate".
- But its own row: "Non-Residential … 43,985,676,319 0.0252216 1,109,389,134".
  - 43,985,676,319 × 0.0252216 = 1,109,389,134. So the rate is per dollar: **$25.22 per $1,000**. Confidence **100** (arithmetic on the bylaw).
  - Education non-res check: 42,839,544,595 × 0.0039677 = 169,974,461 (bylaw: 169,974,462).
- Combined non-res (municipal + education) = **$29.19 per $1,000**. Add ASFF 0.0000770 if wanted (+$0.08).
- Small correction to round 1: residential ASFF is 0.0000809 (round 1 gave only the non-res 0.0000770).
- Historical table agrees: https://www.edmonton.ca/sites/default/files/public-files/COE_Historical_Tax_Rates.pdf (2025 non-res municipal 0.0242229; 2025 residential 0.0076254). Column mapping inferred by reader: confidence **70**.

**5. The $816 per $100,000 mismatch — CORRECTED (explained, not an error in the rate).**
- Exact wording: "On December 4, 2025, Council approved a 6.9% municipal property tax levy increase for 2026." Then "For homeowners, this means about $816 more in property taxes for every $100,000 of assessed value." Reader adds: "an increase of $53 over last year".
  - Round 1's paraphrase "about $816 per year per $100,000" dropped the context.
- Derived: 2025 residential municipal rate 0.0076254 × 100,000 = $762.54. × 1.069 = **$815.16 ≈ $816**. $816 − $762.54 = **$53.46 ≈ $53**.
- So $816 is the **December 2025 budget-stage figure on 2025 values**. The April 2026 bylaw rate, set after reassessment (average assessed value +5.7%, per the City's "how does your property compare" 2026 sheet), gives **$774**.
- Use the bylaw rate. Confidence **60** for this explanation (derived, fits both numbers).

**6. Alberta data-centre assessment and levy — CORRECTED.**
- **The statute is now read.** Alberta Corporate Tax Act, new Part 9.1 "Data Centre Levy", ss. 92.2–92.5, added by Bill 12, *Financial Statutes Amendment Act, 2025 (No. 2)*, s. 2(5). https://docs.assembly.ab.ca/LADDAR_files/docs/bills/bill/legislature_31/session_2/20251023_bill-012.pdf. Bill text (not the consolidated Act). Confidence **90**.
- **Threshold — CORRECTED wording: "75 MW or greater"**, not "over 75".
  - s. 92.3(3)–(4): "the electricity capacity of the particular data centre is 75 MW or greater" at any time in the calendar year. Related (non-arm's-length) groups are also aggregated to 75 MW.
  - abmunis actually reads "over 75 megawatts or that are capable of connecting to the electrical grid" (round 1 cut the second clause). The statute governs.
- **Computing equipment not assessed — CONFIRMED, now with statute.**
  - s. 92.2(1)(e): "'computing equipment' means the following, but does not include property" "that is assessable under the Municipal Government Act". Includes racks, power distribution and cooling components and networking gear (reader summary).
  - So levy base and municipal assessment do not overlap. The MGA-side rule (Bulletin 25-02) is still unread.
- **"Levy up to 2%" — CORRECTED: it is 2% at most of a reduced base, not 2% of equipment value.**
  - s. 92.3(7): levy = "(E + F) x R".
  - E: "the product of 45% and the total of the cost of computing equipment … that is less than 4 years old in age at the end of the calendar year".
  - F: "the product of 15% and the total of the cost of computing equipment … that is greater than 3 years old in age at the end of the calendar year".
  - R (as amended by Bill 17): "(((G – N)/T) x 0.02) + ((N/T) x 0.01)". G = grid electricity; T = all electricity; N = grid power offset by new capacity. Off-grid power gets 0% (Budget 2026 page: "power not drawn from the broader grid will be eligible for a 0% rate").
  - Derived: fully grid-powered, new equipment → 45% × 2% = **0.9% of cost per year**; older than 3 yr → **0.3%**. Arithmetic, confidence **100** given the formula.
  - Paid "to the Provincial Minister" (s. 92.3(1)); "is a tax" (s. 92.3(2)). Creditable against Alberta corporate tax (ss. 25.05–25.06), 7-year carry-forward (reader summary).
- **Start date — CORRECTED.**
  - Bill 12 s. 2(6): in force **1 January 2026** (reader summary). Bill 17 s. 1(3) amendments: "deemed to have come into force on January 1, 2026".
  - The levy is on each **calendar year**; returns and payment due by the end of the 14th month after the year (s. 92.5(1), reader summary). So the 2026 levy is measured at **31 Dec 2026**, which explains RMA's "December 31, 2026". The abmunis/RMA conflict is resolved.
- **Bill 17**, *Fiscal Measures Statutes Amendment Act, 2026*: "received royal assent on March 26, 2026" (https://www.alberta.ca/implementing-budget-2026). Repealed s. 92.3(11), the off-grid exemption, replacing it with the 0% rate on non-grid power. https://docs.assembly.ab.ca/LADDAR_files/docs/bills/bill/legislature_31/session_2/20251023_bill-017.pdf
- Fact sheet confirms in plain words: "up to two per cent on the value of computer equipment"; "large data centres (with 75 megawatts of power or more)". https://www.alberta.ca/system/files/tbf-bill-12-financial-statutes-amendment-act-fact-sheet.pdf. Government, **80**.
- alberta.ca/datacentres/who-benefits re-read: quotes CONFIRMED; still no threshold, date or statute on that page.

**7. Federal data residency — CONFIRMED.**
- "will be stored in a GC-approved computing facility located within the geographic boundaries of Canada" … "or within the premises of a GC department located abroad, such as a diplomatic or consular mission." Round 1 omitted the "abroad" clause; add it.
- "This page has been archived and replaced by Requirement 4.4.3.14 in the Directive on Service and Digital." Current directive text still unread.

**8. IX participant counts — CONFIRMED.**
- ISOC Pulse, "Last updated in Pulse October 2026": VANIX 78; UNM-Exch Canada-West 64; CSIX 16; YEGIX 9.
- Added: **YYCIX (Calgary) 91**. Whether Edmonton networks use YYCIX is still unverified.

**9. StatCan economic lives — CONFIRMED, one label corrected.**
- Table 15-206-X C.1-1, "Surveyed lives (1985 to 2010)", years: Office buildings (1013) 27.0; Warehouses, refrigerated storage, freight terminals (1006) 25.4; Plants for manufacturing (1001) 25.4.
- **Label CORRECTED:** 20.7 is "Other commercial construction (1098)", not "other commercial".
- 13-604-M no. 85 (15 May 2017), Chart 1 "Service lives for selected assets": computers and peripherals **4 years**. CONFIRMED.

**10. UK VOA quote — CORRECTED (citation and one word).**
- "once they become vacant they tend to remain unoccupied and are not readily adaptable for other uses" is in **2017 Practice note 1, s. 1**, not s. 8.
- 2026 Practice note s. 4.3: "an uplift on the prevailing distribution warehouse tone for the locality on the fully fitted data halls". CONFIRMED.
- £0 applies to **"fallow areas"**, not "unfitted halls": "should be valued at £0 until such time as they are fitted out" (s. 8; 2026 and 2023 notes s. 4.4).
- Adds: 2026 note s. 4.2 refers to "adapted warehouses or offices, capable of an alternative use within rebus". Supports the reuse case for warehouse-type halls. Transferred, **70**.
- Page header "Updated 21 September 2026"; metadata shows 30 Sep 2026.

### Task 2 — gaps

**Alberta Bulletin 25-02 / data-centre regulation**
- Levy statute: **found and read** (see item 6). The levy is in the Alberta Corporate Tax Act, not the MGA, and not a separate "Data Centres Levy Act".
- Bulletin 25-02: still not read. abmunis links it as "ma-assessment-bulletin-25-02-2025-12-16.pdf". Bulletin series page https://open.alberta.ca/publications/2291-983x: server error. alberta.ca/annual-designated-industrial-property-assessments: no data-centre content.
- "Data Centre Regulation" https://open.alberta.ca/publications/2026_117: server error again (third failure overall). Not retried further.
- alberta.ca/data-centre-levy-engagement: pre-decision consultation page only. Useful line: "Alberta's government does not levy a sales tax or property taxes on machinery and equipment." Government, **80**.

**Amended BC Recycling Regulation — FOUND.**
- Current consolidation "current to February 3, 2026": https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/449_2004. Regulation, confidence **90**.
- Sch. 3 s. 2(1)(a) still includes "computers, whether desktop, laptop, portable or part of other products" and "other devices, equipment or media for collecting, storing, processing, presenting or communicating information".
- New s. 2(2): the category "does not include computers and televisions that are part of or attached to" a motor vehicle, a marine vessel, "commercial equipment that is not a product described in subsection (1)", or "industrial equipment that is not a product described in subsection (1)".
- Sch. 3 s. 1: "'computer' includes a computer monitor and computer peripheral".
- Servers and storage are not named. Reading them as inside s. 2(1)(a) is **interpretation, 60**.
- "used exclusively in an industrial, agricultural or military setting" is in s. 5(2)(f), the **battery-containing product** category, not the electronics category.
- Round 1's "20 for current scope" → now **90** for text, **60** for servers in scope.

**Data-hall floor-to-floor height and floor loading**
- Floor-to-floor height: **still a gap.** US DOE/FEMP Best Practices Guide (July 2024) gives only "A minimum effective (clear) height of 24 inches should be provided for raised-floor installations" (p. 9, s. 4.1). https://www.energy.gov/sites/default/files/2024-07/best-practice-guide-data-center-design_0.pdf. US government lab guide, **70** transferred. LBNL/PG&E 2006 sourcebook: no dimensions found in the text read.
- Floor loading: UFC 3-301-01 (27 Jan 2010, Change 2, 31 Jan 2011), Table D-1, App. D p. 38, access floor systems, "Computer use": **4.8 kPa (100 psf) uniform; 8.9 kN (2,000 lb) concentrated**. https://www.wbdg.org/api/documents/media/80342447-52ee-4a73-88d0-7edca5250402/file
  - The page marks the document **cancelled**. US military criteria, **40** (proxy). NBC 2020 Table 4.1.5.3 in `floor_load_need` stays the primary.
- No Canadian government or peer-reviewed source on data-hall heights found.

### Changes to proposed nodes
- `property_tax`: Edmonton unit settled. Non-res 29.19 per $1,000 at **90** (rate) / **100** (unit).
- `untaxed_equipment`: Alberta → "computing equipment excluded from MGA assessment; provincial levy (E+F)×R, ≤0.9% of cost per year for new equipment, ≥75 MW, from calendar 2026, paid to the Province and creditable against Alberta corporate tax". Confidence **90** for the levy, **50** for the MGA side until Bulletin 25-02 is read.
- `afterlife` stream 2: BC Sch. 3 current text, servers in scope at **60**.

### Still a gap after round 2
- Alberta Bulletin 25-02; "Data Centre Regulation" (open.alberta.ca 2026_117).
- Consolidated Alberta Corporate Tax Act Part 9.1 (only bill text read). Some Bill 12 points are reader summaries, not quotes: commencement s. 2(6), s. 92.5(1), ss. 25.05–25.06.
- Metro Vancouver Class 6 rate by-law (0.12888 is derived).
- TBS Directive on Service and Digital 4.4.3.14 current text.
- Data-hall floor-to-floor height: no official source.
