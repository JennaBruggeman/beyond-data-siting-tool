# Hunt 14 — Deep dive for sources of truth, both cities equally (13 Oct 2026)

Five parallel retrievals by Claude subagents, reproduced verbatim (access notes included). Rules: primary and scholarly only; operator and industry figures labelled; blocked sites named, not circumvented; nothing inferred. Several hunts hit the web-search limit before finishing; the gaps they name are carried into the hunt list in retrieval_guide.md (section P). Every quote came through a reader that returns short verbatim segments — check each against the original before it goes into the thesis.


## H1. Zoning, rezoning, process and consultation

# Data-centre siting: zoning, rezoning and consultation sources for Vancouver, Edmonton and Parkland County

I finished about half of what you asked for. Items 1 and 3 are well covered for Vancouver, and items 2 and 7 partly. Most of item 6 (both provinces) and the Edmonton side of items 3–5 are still open.

The main reason is that the web-search limit for this turn ran out partway through Edmonton. After that I could only open pages whose addresses had already come up, so I couldn't find the Edmonton fee schedule, Bylaw 14600, AUC Rule 012, or any of the BC First Nations and regulator pages. Send a follow-up and I'll continue.

**How to read this.** Every item is marked PRIMARY, SECONDARY or UNVERIFIED. Each quote is short, because the reading tool returns at most about 125 characters at a time. Page numbers for the 111 E 5th council report shifted by one between my reads, so treat them as ±1. Anything I've worked out myself rather than quoted is labelled **[interpretation]**.

---

## 1. Vancouver: where "Bulk Data Storage" is allowed

**The use definition.** Zoning and Development By-law 3575, Section 2 (June 2026 consolidation) — PRIMARY — https://bylaws.vancouver.ca/zoning/zoning-by-law-section-2.pdf
- **Bulk Data Storage** (p. 6): "The use of a wholly enclosed building for the storage of information on operating data servers."
- It sits in the **Transportation and Storage Uses** group (p. 46).
- **General Office** (p. 18) includes "Digital Entertainment and Information Communication Technology". That use's definition (p. 11) mentions "data security, data storage, management and processing". So there is an overlap in the wording.
- The 111 E 5th council report settles which one applies (rr1, p. 4): "Data centres are classified in the Zoning and Development By-law, under 'Transportation and Storage use'."

**District schedules.** All are at `https://bylaws.vancouver.ca/zoning/zoning-by-law-district-schedule-<district>.pdf` and are PRIMARY.

| District | Status (s. 2.1 use table) | Conditions | Edition |
|---|---|---|---|
| **I-2** | "Bulk Data Storage Conditional 2.2.1, 2.2.7" (p. 5) | s. 2.2.7: "Bulk data storage is not permitted at the ground floor, except for entrances." | Jun 2026 |
| **I-3** | "Bulk Data Storage, only in sub-area A Conditional 2.2.1, 2.2.11" (p. 5) | s. 2.2.11: same ground-floor rule | Jun 2026 |
| **I-1C** | "Bulk Data Storage Conditional 2.2.1" (p. 5) | s. 2.2.1: must be wholly within an enclosed building, plus other general conditions | Nov 2025 |
| I-1, **I-1A**, I-1B, I-4, IC-1, IC-2, IC-3, M-1, M-1A, M-1B, M-2, MC-1/MC-2 | **Not listed** | Each has a catch-all row: "Any other use that is not specifically listed and defined as a use in Section 2 of this by-law" (Conditional) | Nov 2025 – Jun 2026 |
| **DD** (Downtown) | Uses are set "as prescribed in detail in the Official Development Plan By-law No. 4912" (s. 3) | The Downtown ODP does not mention Bulk Data Storage. Its only Transportation and Storage uses are in area L2: "limited to Packaging Plant, Storage Warehouse", in buildings existing on Dec 11, 2001 (s. 1, para 16(d), p. 8) | ODP Jun 2026 |
| **CD-1** | The permit board may approve "the uses listed in the by-law designating the district" (s. 1.1) | Each CD-1 by-law sets its own uses, so a data centre needs a site-specific CD-1 listing it | Nov 2022 |
| I-1 (outright vs conditional) | Storage Warehouse is "Outright 2.2.2". Maximum density for transportation and storage uses is 3.00 (s. 3.1.1.1(a)(ii)) | — | Jun 2026 |

**[interpretation]** The catch-all row only covers uses that are *not defined* in Section 2. Bulk Data Storage *is* defined there, so the catch-all cannot be used to approve a data centre in I-1A or the other districts in that row.

**What 111 E 5th Ave (RTS 19744) tells you about I-1A.** Referral report dated June 30, 2026 — PRIMARY — https://council.vancouver.ca/20260714/documents/rr1.pdf
- p. 4: "While the site's existing I-1A zoning does not allow data centres, this use is consistent with the RGS and ODP." This confirms that I-1A does not allow a data centre outright or conditionally.
- Recommendation A (p. 1): "to add Bulk Data Storage Use as an allowable use".
- Note to condition 1.11: "Successful waste heat recovery and delivery to the NEU is a material condition of the proposed use." It also cites an "anticipated load of up to 40 MW".
- Draft Noise Control By-law amendment: "Amend Schedule B [Intermediate Zone] by adding the following:" (p. 24 by the printed page numbers).
- Plans received September 4, 2025.

**Current status of 111 E 5th.** Shape Your City page, updated July 23, 2026 — PRIMARY (City of Vancouver page) — https://www.shapeyourcity.ca/111-e-5
- "This item has been pulled from the public hearing agenda for July 23rd and will not be going forward at this time."
- "Staff have been directed by Council to undertake further public consultation" — engagement to begin "after the election."
- I could not retrieve the text of Council's July 21 resolution itself (see blocked list).

## 2. Edmonton and Parkland County

**Edmonton Zoning Bylaw 20001, Section 8.10 use definitions** — PRIMARY — https://zoningbylaw.edmonton.ca/part-8-definitions/810-use-definitions
- There is **no "Data Centre" use**, and no use mentions data, servers or computing.
- Major Industrial and Minor Industrial share the same activity list, which includes "handling, storing, or shipping equipment, goods, and materials;".
- Minor Industrial adds: "Any resulting Nuisance is less impactful than those permitted under the Major Industrial Use."
- Minor Utility's examples include "switching centres, telecommunications centres". Major Utility's examples include "cooling plants … power generating stations".

**How the City classifies data centres.** City of Edmonton engagement page for LDA26-0225 (application received July 6, 2026) — PRIMARY, but this is the City's description of the application, not bylaw text — https://engaged.edmonton.ca/eetpdatacentre
- "an AI Data Centre would be considered a heavy industrial use", i.e. Major Industrial.
- "A small-scale data centre could be considered as a Minor Industrial Use" if "associated nuisances are shown to be minimal and mainly contained on site". No size threshold is given.
- Power generation is "(Major Utility)".
- In the Petrochemical Precinct (EETC zone): "This use is currently permitted".
- In EETIM a large-scale data centre "is not contemplated or allowed". The applicant "will need to submit a rezoning and text amendment application" with "another Public Hearing".

**Zone use lists (s. 2 of each zone)** — PRIMARY
- **IM**, Medium Industrial (2.130): "2.3. Major Industrial, limited to those existing as of January 1, 2024" and "2.4. Minor Industrial". So a new large data centre cannot go in IM; a small one may fit as Minor Industrial.
- **BE**, Business Employment (2.120): "2.3. Minor Industrial", with "Minor Industrial Uses must be located within an enclosed building" (s. 3.2.1). No Major Industrial.
- **IH**, Heavy Industrial (2.140): **UNVERIFIED.** The use list did not come through when I read the page. Section 3.1 is headed "Major Industrial and Minor Industrial Uses", which suggests both are listed, but I have not confirmed it.
- **EETC** (3.52): s. 4.2 says Major Industrial that "may emit a significant level of noise…" is "not permitted within the 1.5 km Risk Buffer".
- Section headings: I could not confirm that the s. 2 lists are headed "Permitted Uses" — **UNVERIFIED**.

**Edmonton Part 7 (administration)** — PRIMARY — https://zoningbylaw.edmonton.ca/part-7-administrative-and-interpretive-regulations
- s. 7.110(3.2): Permitted Development includes a development that "is a Permitted Use".
- s. 7.20(3.3.2): where an activity does not clearly fit a use, the planner "may deem the purposes or activities to conform to a Use", and that use "is always considered a Discretionary Use".

**Parkland County Land Use Bylaw 2025-12** (passed May 27, 2025; replaced 2017-18) — PRIMARY — https://www.parklandcounty.com/media/iault5lh/amended-2025-12-july.pdf
- **"Data Processing Facility"** appears in the Industrial Uses lists of BI (s. 2.150, p. 39), MI (s. 2.160, p. 43), HI (s. 2.170, p. 46) and C (s. 2.190, p. 50).
- **Whether it is Permitted or Discretionary in each district is UNVERIFIED.** The two columns ran together when the PDF was read. The county's summary table shows "Data Processing Facility P P P" without district labels.
- The definition and the s. 5.80 "Data Processing Facility" regulations (listed in the table of contents at p. 98) were cut off — **not retrieved**.
- Acheson-specific provisions:
  - Acheson Residential Protection Overlay, s. 3.10: "To mitigate the potential negative impacts of industrial Development on residential Development within the Acheson Area."
  - Acheson Industrial Area Direct Control District (DC Area 1), s. 3.50: follows "the underlying District except for:". Neither names data centres.
- 2025 amendments, as listed on the county's Land Use Bylaw page (PRIMARY index; the bylaws themselves were not opened):
  - Bylaw 2025-23 creates a "Data Processing and Infrastructure Direct Control District (DC Area 7)" and amends s. 5.80.
  - Bylaws 2025-24 and 2025-25 map DC Area 7 at Keephills and Sundance.
  - Bylaw 2025-26 amends DC Area 4 (Keephills).
  - Index page: https://www.parklandcounty.com/en/business-and-development/land-use-bylaw.aspx

## 3. Rezoning process, fees and contributions

**Vancouver process** — PRIMARY
- Typical CD-1 rezoning process (undated flowchart): "Target ~16 weeks to Letter of Response (LOR)"; "Target ~15 months to decision". https://vancouver.ca/files/cov/rezoning-process-overview.pdf
- Apply-to-rezone page (modified June 16, 2026): "about one year to process (from fee payment to public hearing)". It lists 9 steps; payment starts the review; the development permit can only be issued after enactment. https://vancouver.ca/home-property-development/enquire-about-and-apply-for-rezoning.aspx
- How rezoning works: enactment "usually happens in the months after rezoning applications are approved". No number of months given. https://vancouver.ca/home-property-development/how-rezoning-works.aspx

**Vancouver fees** — "2026 FEES EFFECTIVE JANUARY 1, 2026" — PRIMARY (the document says the Council-approved by-laws are authoritative) — https://vancouver.ca/files/cov/vancouver-development-building-permit-fees.pdf
- Schedule 2, s. 3 (new CD-1 or CD-1 amendment). There is no separate industrial category.
  - Downtown/Broadway, under 8,000 m²: $226,300 up to 2,000 m², +$1,590 per 100 m², maximum $343,700.
  - Elsewhere, under 8,000 m²: $94,500, +$1,590 per 100 m², maximum $343,700.
  - 8,000 to under 40,000 m²: $287,700, +$2,060 per 100 m², maximum $2,455,100.
  - 40,000 m² or more: $2,455,100, +$3,120 per 100 m², maximum $8,183,200.
- Rezoning advice/enquiry:
  - Enquiry letter: $16,210 (Downtown/Broadway $21,200).
  - Workshop: $15,000.
  - Pre-application meeting: $2,800.
- Amending one section of an existing CD-1: $37,400 (s. 6).
- Development permit, s. 3, "all other uses":
  - Outright: $1,170 per 100 m² up to 500 m², then $564 per 100 m², maximum $57,600.
  - Other conditional: $2,530, then $1,570, maximum $366,600.
  - Development Permit Board: $2,240 per 100 m² up to 15,000 m², then $428.
- Board of Variance appeal: $3,060.

**Vancouver development cost levies (DCLs)** — DCL Bulletin, last amended Aug 25, 2026, Table 1, rates effective Dec 10, 2025 — PRIMARY — https://guidelines.vancouver.ca/bulletins/bulletin-development-cost-levies.pdf
- Industrial (I-2, M-1, M-1A, M-1B, M-2): **$112.87/m² ($10.49/ft²)** city-wide total. Southeast False Creek adds $31.73/m².
- "Mixed Employment (Light Industrial)" (IC-1, IC-2, I-1, I-1A, I-1B, I-1C, I-3, I-4): **$211.54/m² ($19.65/ft²)**.
- Exemption, s. 6.1(a): no levy on "alterations to an existing building where the total floor area of the building is not increased;".

**Amenity Cost Charges (ACCs)** — Council report RTS 18333, July 6, 2026, Table 5, p. 12 — PRIMARY — https://council.vancouver.ca/20260714/documents/r4.pdf
- Industrial $12.92/m² ($1.20/ft²); Mixed-Employment $24.22/m²; Commercial and other $32.29/m².
- Effective Sept 30, 2026. The DCL bulletin (p. 12) says ACCs are "in addition to DCLs, and will apply to all new development."

**Community Amenity Contributions (CACs)** — CAC Policy, last amended Sept 30, 2026 — PRIMARY — https://guidelines.vancouver.ca/policy-community-amenity-contributions-for-rezonings.pdf
- s. 8.2(b): exempt where the rezoning is for a change of use with "no residential use" and "no increase in total floor area".
- s. 8.2(c): exempt for "Rezonings submitted after September 30, 2026 that include 100% commercial, industrial and institutional…".
- The commercial linkage target ($123.65 to $185.53/m²) is "based on net additional floor area", and applies only to applications submitted before Sept 30, 2026.
- The policy does not mention data centres.

**Why 111 E 5th paid $0** — rr1, p. 6 and condition 2.7 — PRIMARY
- The report expects "DCLs of $0" based on "the applicant's estimate" of no net increase in floor area. The commercial linkage contribution "is applied on the net increase in floor area".
- Staff disagree with the estimate: "the FSR required to achieve the proposed development exceeds 3.0". Density above that would need a text amendment and would pay the standard contributions.

**Edmonton rezoning** — PRIMARY — https://www.edmonton.ca/business_economy/rezoning
- "Applications are not accepted until fees are paid in full."
- Mailed notice to "a minimum of 60 metres". Council decides at a Public Hearing.
- Direct Control rezonings need "a 21-day pre-application notice".
- After a refusal, the same application cannot be resubmitted "for 12 months".
- **Duration: not stated** ("Processing times vary based on the complexity of the application").
- **Fee amounts: not stated** on this page. The fee schedule was not retrieved.
- **Off-site levies: not retrieved.**

## 4. Development and building permit processing times

**Vancouver** — memo to Council, Feb 10, 2025 — PRIMARY — https://vancouver.ca/files/cov/2025-02-10-council-memo-3-3-3-1-permitting-program-update.pdf
- Target C: "Three months to approve permits for professionally designed multi-family and mid-rise projects".
- Target D: "One year to approve permits for high rise and large-scale projects" (over 12 storeys or 485,000 sq ft).
- 2024 median for Target C development permits: 14.7 months.
- **Industrial or data-centre development and building permit times: not stated.**
- Development permit page: a building permit must be applied for within 12 months of the development permit, or the development permit expires.

**Edmonton**
- Development permit appeal and notice periods (s. 7.160, s. 7.170) — PRIMARY:
  - Discretionary approvals: notice "Within 7 days" to addresses within 60 m.
  - Appeals to the Subdivision and Development Appeal Board within "21 days".
- **Processing-time statistics: not retrieved.**

## 5. Variances

**Vancouver Noise Control By-law 6555** (consolidated to July 14, 2026) — PRIMARY — https://bylaws.vancouver.ca/6555c.PDF
- Industrial districts are in Schedule A (activity zone).
- Continuous-sound limits, s. 2.3, from an activity zone:
  - to a quiet zone: 60 dBA day / 55 dBA night;
  - to an intermediate or activity zone: 70 / 65.
- Exceptions under s. 4.4 cover construction and special events only. They are capped at 180 days, with fees of $255 or $506.
- **No variance route for ongoing operating noise is stated.** At 111 E 5th the approach was to amend the by-law's schedule instead (see item 1).
- Councillor Maloney's motion "Addressing the Risks of Digital Infrastructure" (Standing Committee, July 15, 2026) asked staff to review whether the by-law covers "continuous, low-frequency" noise. The City's roundup says the motion "was not approved". PRIMARY: https://council.vancouver.ca/20260715/documents/cfscmotion5.pdf

**Edmonton variances** — s. 7.100 — PRIMARY
- s. 7.100(4.1): the Development Planner may grant "a variance".
- Test, s. 7.100(5.2): must not "unduly interfere with the amenities of the neighbourhood".
- s. 7.100(4.3): "A variance must not be granted for a Development Permit application within a Direct Control Zone".
- A permit with a variance becomes a Discretionary Development (s. 7.100(4.5)).

**Not retrieved:** Edmonton Community Standards Bylaw 14600 and Parkland County's variance process.

## 6. First Nations consultation (processes only)

**Alberta** — PRIMARY (Government of Alberta pages)
- https://www.alberta.ca/datacentres/indigenous: a project "cannot receive its *Water Act* licence, its public lands disposition or its environmental approval" until consultation is complete. For power plants, the regulator requires the company to "engage Indigenous communities within range of the project" before filing.
- https://www.alberta.ca/indigenous-consultations-in-alberta: the Aboriginal Consultation Office "reviews regulatory applications…". The governing policy is the "Policy on Consultation with First Nations on Land and Natural Resource Management, 2013". **Timelines: not stated.**
- https://www.alberta.ca/datacentres/water: "Any diversion of surface water or groundwater requires a *Water Act* licence". A new data-centre licence is "the most junior in its basin". Directly affected people can file a statement of concern during the notice period.
- Environment and Protected Areas fact sheet (July 20, 2026): an EPEA approval is needed for "a backup power generation system over 50 megawatts". https://www.alberta.ca/system/files/epa-data-centre-regulatory-role-and-environmental-requirements.pdf
- **Not retrieved:** Treaty 6 specifics, the AUC Rule 007 consultation text, and the City of Edmonton Indigenous Framework. The open.alberta.ca policy documents returned server errors.

**BC — not retrieved:** FrontCounter BC / Water Sustainability Act, BCUC certificate (CPCN) process, the City of Vancouver UNDRIP Strategy, and Musqueam, Squamish and Tsleil-Waututh referral pages. The 111 E 5th report does not mention First Nations or UNDRIP.

## 7. Cumulative effects and data-centre-specific policy

- **AUC Rule 012 cumulative-noise clause: not confirmed.** The AUC rules page did not expose the document link.
- **Alberta grid** — https://www.alberta.ca/datacentres/grid — PRIMARY: the grid operator (AESO) set "an interim limit of 1,200 megawatts" for large-load connections (Phase 1). The page says the Data Centre Regulation took effect June 2026.
- **Vancouver:** the Maloney motion (item 5) is the only data-centre policy item I found. It was not approved. It also names 175 West Cordova and a proposed data centre at 150 West Georgia.
- **Edmonton:** LDA26-0225 (item 2) is in engagement Sept 28 – Oct 25, 2026; public hearing date "TBD". A City data-centre policy page exists but blocked automated access (see blocked list).

---

## What it would take to move it

| Constraint | Vancouver | Edmonton | Parkland County |
|---|---|---|---|
| **Allowed as-is** | Not available. Bulk Data Storage is not outright in any district checked | Small data centre as Minor Industrial in BE or IM (s. 2 lists); time and fees not stated | Data Processing Facility listed in BI, MI, HI and C; permitted vs discretionary UNVERIFIED |
| **Development permit (conditional / discretionary)** | I-2, I-1C, I-3 sub-area A. Fee $2,530 per 100 m² up to 500 m², then $1,570, maximum $366,600. Time not stated | Discretionary path via s. 7.20(3.3.2); 7-day notice and 21-day appeal. Time not stated | Not stated |
| **Variance** | No standing noise variance; Board of Variance appeal $3,060 | s. 7.100 variance; none allowed in Direct Control zones. Time and fees not stated | Not retrieved |
| **Rezoning** | CD-1 required, as at 111 E 5th. Target about 15 months to decision (about one year from fee payment to public hearing). Fees from $94,500 or $226,300 up to an $8.18 M cap. Industrial DCL $112.87/m², mixed-employment $211.54/m², plus ACC from Sept 30, 2026 | Plan amendment plus rezoning, each with a public hearing (EETP example). Time and fees not stated | Direct Control District (DC Area 7 model); not retrieved |
| **Licence plus consultation** | Not retrieved | Water Act licence, EPEA approval over 50 MW backup, AUC for power plants; ACO consultation must finish first. Time not stated | Same provincial regime |

## Blocked or not retrieved

- **Proxy refused direct downloads** (organisation policy) from bylaws.vancouver.ca, council.vancouver.ca and zoningbylaw.edmonton.ca. The same pages opened normally through the web reader, so nothing was lost.
- **Site disallows automated access:** https://www.edmonton.ca/business_economy/economic_investment/data-centre-development
- **Fetch errors:**
  - https://council.vancouver.ca/20260721/regu20260721ag.htm (July 21 Council resolution on 111 E 5th)
  - https://vancouver.ca/docs/council/phea20260723ag_revised.pdf
  - https://open.alberta.ca/publications/goa-proponent-guide-first-nations-metis-settlements-consultation-procedures
  - https://open.alberta.ca/publications/3775118-2014
- **Not opened because I had no usable link once search ran out:**
  - Parkland County Bylaws 2025-23 to 2025-26
  - Edmonton's data-centre fact sheet (AUC fact sheet link on the engagement page)
  - The full Parkland LUB text for s. 5.80 and the definition
- **Never searched (search limit reached):** Edmonton fee schedule, processing times, off-site levies, Bylaw 14600 and Indigenous Framework; Parkland variance process; AUC Rule 012 and Rule 007; FrontCounter BC / WSA; BCUC; Vancouver UNDRIP Strategy; Musqueam, Squamish and Tsleil-Waututh referral pages.

**Worth saving to memory:** the 111 E 5th rezoning was pulled from the July 23, 2026 hearing and referred back to staff for more consultation after the election. In Edmonton, IM now allows Major Industrial only where it existed as of Jan 1, 2024, so a new large data centre there needs a rezoning.


## H2. City → data centre flows

# City → data centre flows: primary-source hunt (Vancouver and Edmonton)

I found citable rules and quantities for most items, especially in Vancouver. The largest gaps are on the Edmonton side. EPCOR has no published sewer-heat programme, map or figures that I could find. No official office vacancy statistics turned up for either city. I could not open the text of AR 117/2026, the Alberta Micro-generation Regulation, the NRCan per-city solar values or Edmonton Bylaw 14600, because the sites were blocked. They are listed at the end.

PRIMARY means a utility, regulator, government or by-law source. SECONDARY means a consultant, trade or law-firm source, used only to locate a primary. Any arithmetic of mine is marked "(my conversion)".

---

## 1. Sewer as a heat sink or source

| Figure | Unit | Status | Quote | Source, page | URL |
|---|---|---|---|---|---|
| Sewer heat recoverable, Vancouver (winter dry weather) | MW | SECONDARY | "around 45 MW of sewage heat"; "around 100 MW regionwide" | KWL (Suda & Carmichael), *District Energy* magazine, Q4 2015, p. 31 | https://www.cleantechalliance.org/wp-content/uploads/2023/12/Heat-Seeking-Sewer-Model-Kerr-Wood-Leidal-Report.pdf |
| Minimum sewage temperature arriving at treatment plants (model design rule) | °C | SECONDARY | "11 degrees C (51.8 F)"; the model also used "6 C" as the minimum sewage temperature at any time | same, p. 31 | same |
| Worked example of cumulative draw | MW | SECONDARY | 30 MW taken ahead of the Vancouver plant leaves 15 MW for upstream projects | same, p. 32 | same |
| Regional sewer heat | buildings | PRIMARY | "enough excess heat in the liquid waste collection system to heat 700 high rise buildings" | GVS&DD Board agenda, 29 Jul 2022, Surrey City Centre report (28 Jun 2022), p. 1 | https://metrovancouver.org/boards/GVSDD/SDD_2022-Jul-29_AGE.pdf |
| Same figure, other framing | homes | PRIMARY | "enough excess heat energy … to heat 100,000 homes" | same agenda, Heat Recovery Policy report (5 Jul 2022), p. 2 | same |
| Per-interceptor figure (the only one found) | MW | PRIMARY | "City of Surrey intends to recover 6 MW of thermal capacity from sewage in the GVS&DD's North Surrey Interceptor" | same agenda, Terms of Reference, agenda p. 32 | same |
| Allocation rule | rule | PRIMARY | "allocate access to untreated sewage for heat recovery on a first-come first-served basis"; private applicants need "a letter of support from the host member jurisdiction"; "Projects that access heat from municipal sewers do not require GVS&DD approval." | Policy UT-008, p. 1 (effective 23 Jun 2017, revised 29 Jul 2022) | https://metrovancouver.org/services/liquid-waste/Documents/sewage-waste-heat-recovery-policy.pdf |
| Cost of access | rule | PRIMARY | "GVS&DD will charge the heat user for all costs incurred to establish and maintain access to sewage." No $ per GJ is stated. | UT-008, p. 2 | same |
| Limits on extraction or temperature in the policy | — | PRIMARY | not stated | UT-008 | same |
| Upper limit on heat **rejected** into the sewer | °C | PRIMARY | Prohibited: "Any Waste which will raise the temperature of Waste entering any Sewage Facility to 40 degrees Centigrade"; "Any Non-Domestic Waste … with a temperature of 65 degrees Centigrade" | GVS&DD Sewer Use Bylaw 299, Sch. A item 4(b), 4(c) (consolidated 28 Jul 2023) | https://metrovancouver.org/boards/Bylaws/GVSDD_Bylaw_299_Consolidated.pdf |
| Annacis Island treatment plant flow | ML/d | PRIMARY | min 410, max 1,011, average 511 | GVS&DD 2023 Environmental Management report, Table 3.8, p. 26 | https://metrovancouver.org/services/liquid-waste/Documents/gvsdd-environmental-management-quality-control-annual-report-2023.pdf |
| Annual plant flows: Iona / Lions Gate / Lulu / NW Langley | ML/yr | PRIMARY | 182,064 / 27,712 / 25,184 / 5,939 | same, p. 5. The column order was garbled in extraction; I matched values to plants using the totals in the Executive Summary. | same |
| Treatment plant temperatures | °C | not stated in extractable text | Table 3.8 has an "Ave Temp. (o C)" column, but the values did not extract | same | same |
| Capital budget, sewer heat projects 2027–31 | $ | PRIMARY | Draft budget $71,500,000 | Liquid Waste Committee, 15 Jul 2026 agenda, Att. 1, p. 3 | https://metrovancouver.org/boards/LiquidWasteCommittee/LWA-2026-07-15-AGE.pdf |
| Vancouver NEU sewage heat capacity | MW | PRIMARY | "3.2 megawatts (MW) of sewage heat recovery capacity"; expansion "an additional 6.6 megawatts"; two new heat pumps of "3.3 MW" each, turned on end of 2024 | City of Vancouver expansion page | https://vancouver.ca/home-property-development/sewage-heat-recovery-expansion-project.aspx |
| Edmonton: EPCOR sewer heat programme, flows, temperatures or map | — | not found | No EPCOR or City primary source located | — | — |
| Edmonton: non-contact cooling water to sanitary sewer | rule | PRIMARY | only with prior written EWSI approval (s. 5.10(i)) | Bylaw 18100 (consol. 19 Feb 2020) | https://www.edmonton.ca/residential_neighbourhoods/Bylaws/C18100.pdf |
| Edmonton: temperature limit in prohibited wastes | °C | not read | Appendix A did not extract | same | same |
| Edmonton DDEI heat sources | rule | PRIMARY | Phase 1 runs on natural gas boilers at first; planned low-carbon sources "may include … wastewater heat recovery and geoexchange" | City District Energy page | https://www.edmonton.ca/projects_plans/district-energy |

**What the tool can size at a parcel.** For Vancouver, the tool can model the sewer as a heat sink. The firm upper limit on rejection is the Bylaw 299 rule: the receiving flow must stay below 40 °C at the treatment plant. The KWL 11 °C floor is the constraint when the sewer is used as a heat source. A defensible per-pipe capacity needs flow and temperature for the pipe next to the parcel; the only published per-pipe figure is the North Surrey 6 MW. Any per-pipe figure would therefore be "operator or municipal data on request". For Edmonton, sewer heat cannot yet be sized from published sources. It should be shown as "pending EPCOR data", and Bylaw 18100 s. 5.10 approval is the gate.

---

## 2. Surface water as a cooling sink

| Figure | Unit | Status | Quote | Source, page | URL |
|---|---|---|---|---|---|
| BC "cooling" purpose, application fee | $ | PRIMARY | Industrial "cooling": $1,000 new; $500 amendment | BC Reg 37/2016, Sch. 1 Table 1 (current to 3 Dec 2024) | https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/37_2016 |
| BC "heat exchange" purpose, annual rental | $ | PRIMARY | min annual $200; $2.25 per 1,000 m³; the greater of the two applies (s. 4(2)) | same, Sch. 2 Table 1 | same |
| "Cooling" in the rental schedule | — | PRIMARY | the word does not appear in Sch. 2. I could not confirm which rental class applies to cooling. | same | same |
| BC purpose definitions | text | PRIMARY | Cooling: "The diversion and use of water for cooling purposes in any manufacturing, processing or industrial operation." Heat exchange: "…to extract or dissipate heat … by passing water through an open loop system." | BC water use purpose definitions | https://www2.gov.bc.ca/assets/gov/environment/air-land-water/water/water-licensing-and-rights/water_use_purpose_defns.pdf |
| DFO intake screens: approach velocity | m/s | PRIMARY | "maximum design approach velocity of 0.055 m/s" (s. 3.1.1), but Table C-1 says 0.035 m/s, an internal conflict on the page; up to 0.12 m/s where ambient flow is at least twice the design velocity | DFO Standard, modified 17 Jun 2026 | https://www.dfo-mpo.gc.ca/pnw-ppe/standards-normes/fish-screen-grillage-poisson-eng.html |
| DFO intake screens: openings | mm | PRIMARY | 2.54 mm maximum; 1 mm where eels or small species at risk are present; at least 50% open area. The standard "may not be applicable to large water intakes or high withdrawal rates." | same | same |
| BC temperature guideline, marine or estuarine | °C | PRIMARY | "+ or - 1 degree Celsius change from natural ambient background"; hourly rate of change "up to 0.5 degrees Celsius" | BC WQG Temperature Overview, Table 1, 22 Aug 2001 | https://www2.gov.bc.ca/assets/gov/environment/air-land-water/water/waterquality/water-quality-guidelines/approved-wqgs/temperature-or.pdf |
| Burrard Inlet / False Creek proposed objective | rule | PRIMARY | "No further increase in temperature; the natural temperature cycle … should not be altered in amplitude or frequency by human activities." | Proposed Objectives for Burrard Inlet, Table 9, p. 5 (Jul 2024) | https://www2.gov.bc.ca/assets/gov/environment/air-land-water/water/waterquality/water-quality-objectives/burrard_inlet_physical_parameters_report.pdf |
| Burrard Inlet seawater temperatures | °C | PRIMARY | Outer Harbour summer surface "10.6 - 20.7 (15.2)"; winter bottom "8.4 - 9.7 (9.1)". False Creek was not monitored. | same, Table 4, p. 31 | same |
| CCME marine temperature guideline | °C | PRIMARY | "±1ºC at any time, location, or depth"; at most 0.5 °C per hour (1999) | CCME | https://ccme.ca/en/res/temperature-marine-en-canadian-water-quality-guidelines-for-the-protection-of-aquatic-life.pdf |
| Port of Vancouver thermal discharge rules | — | not found | — | — | — |
| Alberta temperature guideline (freshwater) | °C | PRIMARY | "Not to be increased by more than 3°C above ambient water temperature". This is the 1999 document; the 2018 *Environmental Quality Guidelines* was not checked. | AB Surface Water Quality Guidelines 1999, Table 1.0, p. 9 | https://open.alberta.ca/dataset/e0074537-88f6-4cc4-af5c-808161fa9af8/resource/ea13d7b1-c155-4fad-8b85-4f12443352f2/download/5713.pdf |
| Alberta Water Act and data centres | rule | PRIMARY | "Every drop a data centre wants goes through the same Water Act review as any other industrial project." Water Amendment Act (Bill 7), proclaimed 11 Mar 2026, "contains no data-centre-specific provisions". Thermal discharge rules not addressed. | alberta.ca/datacentres/water | https://www.alberta.ca/datacentres/water |
| Alberta cooling-water fee; EPCOR or AEPA thermal limits on the North Saskatchewan River | — | not found / not stated | — | — | — |
| Enwave DLWC: original design | various | PRIMARY | "drawing water at 4 degrees Celsius"; "peak cooling capacity of 40,000 tons"; water "returned to John Street Pumping Station at not more than 13 degrees Celsius" | City of Toronto Works Committee report, 8 May 2000 (no page numbers) | https://www.toronto.ca/legdocs/2000/agendas/council/cc/cc000607/wks12rpt/cl004.pdf |
| Enwave DLWC: fourth intake | various | PRIMARY | "26,000 tons of cooling at peak"; "12 - 14 MW peak demand reduction"; intake "3km into Lake Ontario" to "a depth of 70 metres"; Energy Transfer Agreement is a "50 year agreement" to 2054; 2018 Energy Transfer Fee "$1,583,045"; Enwave permit "545 MLD" | City of Toronto report, 21 Nov 2019, pp. 6–15 | https://www.toronto.ca/legdocs/mmis/2019/ie/bgrd/backgroundfile-140486.pdf |
| Enwave DLWC: customers | text | PRIMARY | cooling "to over 80 buildings … including data centers"; warmed water from the expansion goes to the lake via a stormwater connection | DLWC Expansion EA, 10 Sep 2020, pp. ES-2, ES-6 | https://www.toronto.ca/wp-content/uploads/2020/09/86d2-2020Sept-DLWC-EAPhase12_Report-Exec-Summary-AODA.pdf |
| Enwave DLWC: operator figures | text | OPERATOR CLAIM | "four-degree Celsius"; "more than 100 buildings"; expansion "increased its cooling capacity by 60 per cent" | Enwave, 29 Aug 2024 | https://www.enwave.com/enwave-commissions-expansion-of-world-renowned-deep-lake-water-cooling-system-internationally-recognized-by-the-united-nations-in-partnership-with-toronto-water |

**What the tool can size at a parcel.** In both cities the binding limit for a waterfront parcel is the thermal limit, not the licence fee. In marine water (Burrard Inlet, False Creek) the limit is ±1 °C and 0.5 °C per hour, with a proposed "no further increase" objective. In Alberta freshwater it is 3 °C above ambient, from the 1999 guideline. So a sink's capacity depends on mixing and flow at the outfall, and those are site-specific. The BC fees are small enough to show as a line item. DFO approach velocity sets the minimum screen area for a given intake flow, but the 0.055 vs 0.035 m/s conflict should be confirmed with DFO. Toronto works as a precedent for the "rule chain" (City agreement, fee, return-temperature cap), not as a transferable number.

---

## 3. District cooling or cold networks

| Figure | Unit | Status | Quote | Source | URL |
|---|---|---|---|---|---|
| Vancouver NEU cooling | rule | PRIMARY | "The NEU currently does not provide cooling as an energy service to individual buildings." The NEU may accept waste heat from building cooling loads (s. 2.3). | NEU Connectivity Guidelines, May 2026 Rev. 1 | https://guidelines.vancouver.ca/guidelines-neighbourhood-energy-utility-connectivity-requirements.pdf |
| Credit for heat sent to the NEU | rule | PRIMARY | "a credit to the utility bill is provided" (s. 2.6.1) | same | same |
| NEU temperatures | °C | PRIMARY | network "minimum 65°C"; "maximum return water temperature of 45°C" (s. 6.3) | same | same |
| 2026 waste heat credit rate | $/MWh | PRIMARY | "$65.172 per each MW hour multiplied by 50%" (≈ $32.59/MWh, my conversion) | Council report, 21 Oct 2025, Sch. C Part 4 | https://council.vancouver.ca/20251112/documents/spec1d.pdf |
| NEU size | buildings, m² | PRIMARY | "47 residential, commercial, and institutional buildings, with 667,000 square metres" | same, p. 2 | same |
| Creative Energy, Vancouver House cooling | kW | PRIMARY | electric chillers plus "two 475-ton cooling towers"; central plant peak "3,165 kW"; serves 4 buildings | BCUC Decision C-2-20, 1 Apr 2020, pp. 4, 7 | https://www.ordersdecisions.bcuc.com/bcuc/decisions/en/468371/1/document.do |
| Creative Energy SODO cooling, 2026–27 rates | — | blocked (client error) | — | BCUC proceeding 1375 | https://www.bcuc.com/OurWork/ViewProceeding?applicationid=1375 |
| UBC Neighbourhood DES | text | PRIMARY | "waste heat from TRIUMF's cooling towers" is the preferred source; no cooling service stated | UBC Campus + Community Planning | https://planning.ubc.ca/neighbourhood-district-energy-system |
| Edmonton DDEI | rule | PRIMARY | heat only in the first two phases; cooling would need Council approval; Phase 1 began operating Sep 2025; up to 50 buildings by 2050 | City District Energy page | https://www.edmonton.ca/projects_plans/district-energy |
| Blatchford | text | PRIMARY | provides "heating, cooling and hot water services"; sources "geoexchange, sewer heat recovery and solar panels"; capacities and loop temperatures not stated | City Blatchford page | https://www.edmonton.ca/projects_plans/blatchford/renewable-energy |

**What the tool can size at a parcel.** In Vancouver the only published heat-rejection route is the NEU waste heat credit (≈ $32.59/MWh, my conversion). It needs heat at network temperature: 65 °C supply, 45 °C return. A data centre's low-grade heat would therefore need heat pumps first, and a parcel's distance to the NEU becomes a key input. Creative Energy cooling at Vancouver House is a closed chiller and cooling-tower system, not a sink a third party can use. In Edmonton, Blatchford is the only network that offers cooling. Rules for third parties to connect to or reject heat into Blatchford were not published or not readable, because the Blatchford PDFs were blocked.

---

## 4. Power from the place to the data centre

| Figure | Unit | Status | Quote | Source | URL |
|---|---|---|---|---|---|
| BC Hydro Rate Schedule 1289 (net metering) | rule | PRIMARY | closing to new customers; "Effective July 1, 2026, a new self-generation service rate (Rate Schedule 2289)" | BC Hydro self-generation page | https://www.bchydro.com/toolbar/about/strategies-plans-regulatory/rate-design/self-generation-rate-updates.html |
| RS 2289 export cap | kW | PRIMARY | "send up to 100 kW per phase back to the grid" | same | same |
| RS 2289 compensation | $/kWh | PRIMARY | "BC Hydro will purchase your excess generation energy at 10 cents per kWh" | same | same |
| BC Hydro community generation | kW, MW | PRIMARY | "net injection limit up to 2 MW"; "24 kW for each residential customer, and 100 kW for each commercial customer" | same | same |
| BC Hydro load displacement | rule | PRIMARY | community generation projects using solar to offset load are eligible for load displacement incentives; no figures stated | same | same |
| Alberta micro-generation cap | MW | PRIMARY | "generation capacity that does not exceed five (5) megawatts" | AUC, modified 16 Apr 2026 | https://www.auc.ab.ca/generate-your-own-electricity/ |
| Alberta small vs large micro-generators; compensation | kW | PRIMARY | small "(under 150 kilowatts)" are credited at retail; large are credited "at the hourly wholesale market price"; emissions must be "418 kilograms per megawatt hour (kg/MWh) or less" | alberta.ca, 2 Mar 2026 | https://www.alberta.ca/micro-generation |
| Data Centre Regulation | reg | SECONDARY (locator only) | named as "AR 117/2026", enacted 9 Jun 2026. Primary text blocked. | Bennett Jones | https://www.bennettjones.com/Insights/Blogs/2026/07/Albertas-BYOG-Framework |
| Same regulation, government summary | rule | PRIMARY | "projects that pair their demand with dedicated new generation or storage go to the front of the connection line"; interim allocation 1,200 MW, now fully allocated; no number given for the regulation | alberta.ca/datacentres/grid | https://www.alberta.ca/datacentres/grid.html |
| AESO data centre connection guide (transmission) | MW | PRIMARY | ≥300 MW: two SCADA paths; ≥500 MW: diverse telecom links; distribution-connected sites should work with the distributor (s. 1) | AESO TCDC Guide, 12 Jun 2026 | https://www.aeso.ca/assets/Uploads/grid/Guide-to-AESO-Connection-Requirements-for-Transmission-Connected-Data-Centres.pdf |
| EPCOR distributed generation interconnection | kVA, kW | PRIMARY | applies at "25 kV or lower"; DERs "rated 1,000 kW or larger with the ability to export" need direct transfer trip protection; minimum circuit load "about 2,000 kVA" | EDTI DER Interconnection Guide, effective 31 Mar 2023, ss. 1.1, 7.6.3 | https://www.epcor.com/content/dam/epcor/documents/supporting-documents/2022_power_technical-requirements_interconnection-guide.pdf |
| FortisAlberta interconnection | — | not searched | Edmonton is in EPCOR's territory | — | — |
| NRCan PV potential dataset | kWh/kWp | PRIMARY (dataset) | "60 arc seconds ~2 km grid"; more than 3,500 municipalities; values for Vancouver and Edmonton not read (CSV blocked) | NRCan | https://natural-resources.canada.ca/energy-sources/renewable-energy/photovoltaic-potential-solar-resource-maps-canada |
| Edmonton rooftop solar map | — | PRIMARY | City RFI for "a web based rooftop solar potential map", closed 16 Jan 2025; no existing map found | CanadaBuys | https://canadabuys.canada.ca/en/tender-opportunities/tender-notice/ab-2024-10240 |
| Vancouver rooftop solar map | — | not found | — | — | — |

**What the tool can size at a parcel.** For on-site solar: roof area × NRCan kWh/kWp gives yield, once the city values are read manually from the NRCan map. The export cap is 100 kW per phase in BC under RS 2289 (paid at $0.10/kWh) and 5 MW in Alberta (at wholesale above 150 kW). A 0.1–40 MW load would usually use all of a rooftop's output on site, so the cap matters mainly for shared or community schemes. In BC, community generation adds the 2 MW and 100-kW-per-commercial-customer rules. In Alberta, AR 117/2026 rewards paired generation with connection priority, but its thresholds cannot be stated until the regulation text is read.

---

## 5. Water to the data centre

| Figure | Unit | Status | Quote | Source | URL |
|---|---|---|---|---|---|
| Gold Bar reclaimed water to industry, 2024 | ML | PRIMARY | "4,226 ML (3.9%) of reclaimed water provided to industrial customers" (p. 11); customers not named | EPCOR 2024 Wastewater Quality Annual Report | https://www.epcor.com/content/dam/epcor/documents/water-quality-reports/2024_edmonton_wastewater-quality_annual-report.pdf |
| Gold Bar reclaimed water, 2020 | ML | PRIMARY | "3,903 ML (3.6%)" (p. 11) | EPCOR 2020 report | https://www.epcor.com/content/dam/epcor/documents/water-quality-reports/2020_edmonton_wastewater-quality_annual-report.pdf |
| Gold Bar flows | ML/d | PRIMARY | average 265 ML/d; design 310 ML/d; 2024 average dry weather flow "285 million litres per day" | EPCOR Gold Bar page; 2024 report, p. 14 | https://www.epcor.com/ca/en/ab/edmonton/operations/water-wastewater/gold-bar-wastewater-treatment-plant/gold-bar-operations.html |
| Reclaimed water price; Gold Bar effluent temperature | — | not stated | — | — | — |
| Metro Vancouver reclaimed water policy | rule | PRIMARY | Policy UT-019, effective 29 Sep 2023; uses "may include … industrial uses", "case-by-case"; quality per Municipal Wastewater Regulation, "greater exposure potential" category; no rates set | Interim Reclaimed Water Policy, pp. 1–2 | https://metrovancouver.org/boards/Policies/interim-reclaimed-water.pdf |
| BC non-potable water rules | text | PRIMARY | BC Plumbing Code Div. B s. 2.7 "in accordance with good engineering practice"; since 2019 Vancouver requires "an alternate water system that uses rainwater and clear-water waste" for certain developments | Metro Vancouver, *Overcoming Barriers to Non-Potable Water Use* (c. 2022), pp. 9–14 | https://metrovancouver.org/services/water/Documents/non-potable-water-systems-key-findings.pdf |
| Alberta non-potable water | rule | PRIMARY | reclaimed water allowed "for toilet and urinal flushing or underground irrigation"; cooling not mentioned | alberta.ca/reclaimed-water (2019) | https://www.alberta.ca/reclaimed-water |
| Vancouver 2026 metered water | $/unit | PRIMARY | high season (1 May–15 Oct) $5.128; low season $4.091; sewer $7.960 per unit; "One unit equals … 2.83168466 cubic metres"; single rate "for all metered uses", no large-user rate | Council report 24 Oct 2025, Sch. D p. 12; metered-rates page | https://council.vancouver.ca/20251112/documents/spec1a.pdf |
| Edmonton 2026 water | $/m³ | PRIMARY | residential tiers $2.5258 / $2.7593 / $3.4873; wastewater $1.3020; sanitary $1.27331; effective 1 Apr 2026 | EPCOR rates page | https://www.epcor.com/ca/en/ab/edmonton/account/rates/current-and-historical-rates/water-and-wastewater.html |
| Edmonton commercial water rates | — | not extracted | the commercial section exists on the page but did not render | same | same |

**What the tool can size at a parcel.** In Vancouver, potable make-up water can be priced from the 2026 metered rates: about $1.45–1.81/m³ water plus about $2.81/m³ sewer (my conversion). There is no large-user discount. In Edmonton the tool can show that a reclaimed supply exists, at about 4,200 ML/yr already going to industry from one plant. Price, spare capacity and whether cooling is a permitted use must be shown as "ask EPCOR". The Alberta building rules found only cover flushing and irrigation. Metro Vancouver reclaimed water is case-by-case with no price, so it should be a "works with a change" pathway, not a number.

---

## 6. Existing buildings available for conversion

| Figure | Unit | Status | Quote | Source | URL |
|---|---|---|---|---|---|
| Official office vacancy rate, either city | % | not found | No City or provincial series found. Brokerage reports were not used. | — | — |
| Metro Vancouver industrial or employment land | ha | PRIMARY | "10,250 hectares" (2020 Regional Industrial Lands Inventory); vacant hectares not in the extractable text | Metro 2050 monitoring page | https://metrovancouver.org/services/regional-planning/metro-2050-performance-monitoring/goal-2/industrial-and-employment-lands/protect-land-for-industry |
| Vancouver Downtown Office Conversion Policy | rule | PRIMARY | adopted 16 Jun 2009; covers buildings ≥50,000 sq ft of office (≥30,000 in HA-2 and HA-3); "does not prohibit residential conversion of office space"; proposals may go to Council against 5 criteria (s. 4.2); conversion to non-residential uses not addressed | Policy PDF | https://guidelines.vancouver.ca/policy-downtown-office-conversion.pdf |
| Edmonton office conversion policy or vacancy | — | not found | City downtown pages show none; the infographic was blocked | — | — |

**What the tool can size at a parcel.** Only the Vancouver policy is citable. A data-centre conversion of a downtown office building of 50,000 sq ft or more falls outside the policy's residential focus. The tool should flag it as a rezoning or Director of Planning discretion item, not as an "as-of-right" conversion. Vacancy as a city-wide supply driver cannot be quantified from official sources. Parcel-level vacancy would need BC Assessment or City assessment data, which I did not search.

---

## 7. Ambient noise as acoustic cover

| Figure | Unit | Status | Quote | Source | URL |
|---|---|---|---|---|---|
| Vancouver continuous sound limits | dBA | PRIMARY | quiet→quiet: 55 day / 45 night; intermediate→other zones: 70 / 65; activity→quiet: 60 / 55 (ss. 2.1–2.3) | Noise Control By-law 6555, consolidated to 14 Jul 2026 | https://bylaws.vancouver.ca/6555c.PDF |
| Vancouver ambient credit | rule | PRIMARY | "background noise" is defined (s. 1.2), but the only background-relative limit is s. 3.1(b): "exceeds 3 dBA above the background noise", for commercial premises. "Ambient" does not appear in the by-law, and there is no general ambient credit. | same | same |
| Vancouver mechanical equipment | dBA | PRIMARY | no provision for HVAC or heat pumps; emergency generator testing is limited to 80 dBA, monthly ≤60 min (s. 4.1(c)) | same | same |
| AUC Rule 012 basic sound levels (night) | dBA Leq | PRIMARY | Category 1 / 2 / 3 at 1–8 dwellings: 40 / 45 / 50; at >160 dwellings: 46 / 51 / 56. Cat 1 "≥500 m", Cat 2 "≥30 m, but less than 500 m", Cat 3 "less than 30 m" from heavily travelled roads or rail; daytime +10 dBA; Class A2 ambient adjustment −10 to +10 dBA | Rule 012, Table 1, s. 2.1, effective 5 Mar 2021 (a 2024 revision consultation exists; whether a newer rule is in force was not checked) | https://media.auc.ab.ca/prd-wp-uploads/Shared%20Documents/Rules/Rule012.pdf |
| Rule 012 scope | rule | PRIMARY | applies to "power plant, substation or transmission line" and similar, so to on-site generation, not the data centre building itself | s. 1.1(2) | same |
| Edmonton Bylaw 14600 | — | blocked | the City noise page says only that "The Community Standards Bylaw regulates noise", with no dBA values | — | https://edmonton.ca/city_government/bylaws/noise |
| BC MoTI highway noise policy | dBA Ldn | PRIMARY | mitigation is triggered by a 5 dBA increase (Moderate) or 10 dBA increase (Severe) over pre-project Ldn; Rev. 2, Oct 2016 | MoTI policy | https://www2.gov.bc.ca/assets/gov/driving-and-transportation/transportation-infrastructure/engineering-standards-and-guidelines/environment/references/noise-policy-highways.pdf |
| Road traffic noise maps | — | not found | Only traffic-volume datasets: Edmonton "Average Annual Weekday Traffic Volumes (2011-2022)"; Vancouver "Intersection traffic movement counts" and "Directional traffic count locations" | City open data | https://data.edmonton.ca/Transportation/Average-Annual-Weekday-Traffic-Volumes-2011-2022-/b58q-nxjr ; https://opendata.vancouver.ca/explore/dataset/intersection-traffic-movement-counts/table/ |

**What the tool can size at a parcel.** Neither city publishes a road-noise map. Acoustic cover would have to be modelled from traffic counts and labelled as a method, not a dataset. In Vancouver the by-law sets fixed limits by zone pair and does not credit ambient noise for equipment. The "cover" is therefore the zone itself (intermediate and activity zones allow 65–70 dBA). Rule 012's distance-to-road categories, which do credit ambient, apply only to an Edmonton site's own generation or substation. Edmonton's limits for the building's own equipment cannot be stated until Bylaw 14600 is read.

---

## Blocked or failed URLs (not worked around)

- https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/36_2016 (Water Sustainability Regulation; robots). The same host's 37_2016 page loaded.
- https://www.canlii.org/en/ab/laws/regu/alta-reg-117-2026/235829/alta-reg-117-2026.html (AR 117/2026; robots)
- https://kings-printer.alberta.ca/documents/Regs/2008_027.pdf (Micro-generation Regulation; robots)
- https://ftp.maps.canada.ca/pub/nrcan_rncan/Solar-energy_Energie-solaire/photovoltaic_canada_photovoltaique/municip_potentiel-potential.csv (NRCan per-city PV values; robots and proxy)
- https://www.edmonton.ca/sites/default/files/public-files/C14600.pdf (Bylaw 14600; robots)
- https://www.edmonton.ca/sites/default/files/public-files/BlatchfordRenewableEnergyUtility2023-2026BudgetandPlans.pdf?cb=1671033821 (robots)
- https://www.edmonton.ca/public-files/assets/document?path=PDF/BlatchfordRenewableEnergy2021-2024BusinessPlan.pdf (robots)
- https://www.edmonton.ca/public-files/assets/document?path=PDF/Blatchford+energy+strategy+overview.pdf (robots)
- https://www.edmonton.ca/sites/default/files/public-files/City-of-Edmonton-Downtown-Infographic.pdf?cb=1745870127 (robots)
- https://www.edmonton.ca/sites/default/files/public-files/assets/RPT2018-10-24_Edmonton_Valley_Line_West_NV.pdf?cb=1756946381 (robots)
- https://opendata.vancouver.ca/api/explore/v2.1/catalog/datasets (robots)
- https://www.bcuc.com/OurWork/ViewProceeding?applicationid=1375 (Creative Energy SODO cooling; client error)
- https://open.alberta.ca/publications/public-health-guidelines-water-reuse-stormwater-use (server error)
- https://www.epcor.com/content/dam/epcor/documents/water-quality-reports/2025_edmonton_wastewater-quality_annual-report.pdf (client error; this file may not exist)
- metrovancouver.org via direct download (proxy refused). WebFetch could read it, but the temperature columns in the 2023 GVS&DD report did not extract.

## Worth saving to project memory

- Rules: the Bylaw 299 limits of 40 °C at the sewage facility and 65 °C for non-domestic waste; the NEU waste heat credit of 50% × $65.172/MWh (2026); BC Hydro RS 2289 (100 kW/phase, $0.10/kWh, from 1 Jul 2026), which replaces RS 1289.
- Open gaps: EPCOR sewer-heat data, official vacancy statistics for either city, and road-noise maps for either city all appear not to exist in public primary sources.


## H3. Lifecycle, lifetimes, reuse, workers

I found primary sources for items 1, 2, 4 and part of 3. Items 5, 6 and 8 are still thin, partly because the shared web-search limit for this turn ran out before I reached them. A follow-up message would let me continue.

**How the quotes were captured.** Bash downloads were refused by the network proxy (403) for both sec.gov and eta-publications.lbl.gov. Every quote below therefore came through the web-fetch tool, which hands back only short verbatim segments of 125 characters or less. Treat each quote as verified at the phrase level, and check it against the original before you put it in the thesis.

**Status labels.** PRIMARY = government, lab, standard or peer-reviewed. FILING = SEC filing (the operator's own statement). SECONDARY = a scholarly source that relays someone else's figure. UNVERIFIED = located but not read, or the provenance is unclear.

---

## 1. Server and IT service life, and refresh

| Figure | Unit | Status | Quote | Page / section | URL |
|---|---|---|---|---|---|
| 4.4 → 5 → 5.7 | yr, average server lifetime in the stock model | PRIMARY (LBNL; read from MIT-hosted copy) | "the lifetime assumption for 2000–2019 is 4.4 years, increasing to 5 years in 2020, and to 5.7 years by 2023"; "For AI accelerated and nonaccelerated servers, the same lifetime assumptions are used." | p. 31, Installed Base Calculation, Fig. 3.8 | https://climate.mit.edu/sites/default/files/2025-02/lbnl-2024-united-states-data-center-energy-usage-report.pdf |
| Storage and network lifetime | — | not stated in the part I could read | — | — | same |
| 3–4 | yr, server depreciation | PRIMARY (book, open-access chapter) | Servers "have a shorter lifetime and thus are typically depreciated over 3–4 years." | Barroso et al., *Datacenter as a Computer*, 3rd ed., Ch. 6, p. 131 | https://link.springer.com/content/pdf/10.1007/978-3-031-01761-2_6.pdf |
| 3 | yr, base-case server life | PRIMARY | Base case assumes a three-year server lifetime; "we finance the servers with a 3-year interest-only loan" | pp. 132–133 | same |
| 15–20 (base case 20) | yr, facility depreciation | PRIMARY | "Typically, data centers are depreciated over periods of 15–20 years."; base case "over 20 years" (footnote 6: the 1st edition used 12) | pp. 131–132 | same |
| 4 → 6 | yr, Microsoft servers and network gear | FILING | "In July 2022, we completed an assessment of the useful lives of our server and network equipment"; "increase the estimated useful lives of both server and network equipment from four years to six years"; "effective beginning fiscal year 2023." | 10-K FY2022, Accounting Policies | https://www.sec.gov/Archives/edgar/data/789019/000156459022026876/R27.htm |
| 4 → 6 (servers); 5 → 6 (certain network) | yr, Alphabet | FILING | "adjusted the estimated useful life of our servers from four years to six years and the estimated useful life of certain network equipment from five years to six years"; "effective beginning in fiscal year 2023"; depreciation reduced by "$3.9 billion" | 10-K FY2023, Note 1 | https://www.sec.gov/Archives/edgar/data/1652044/000165204424000022/R10.htm |
| 4 (servers), 5 (network) before the change | yr, Alphabet | FILING | "(generally, four years for servers and five years for network equipment)" | 10-K FY2022, Policies | https://www.sec.gov/Archives/edgar/data/1652044/000165204423000016/R27.htm |
| 5 → 6 | yr, Amazon servers | FILING | "effective January 1, 2024 we changed our estimate of the useful lives for our servers from five to six years." | 10-Q Q1 2024, Note 1 | https://www.sec.gov/Archives/edgar/data/1018724/000101872424000083/amzn-20240331.htm |
| 6 → 5 | yr, Amazon (subset of servers and networking) | FILING | "Effective January 1, 2025 we changed our estimate of the useful lives"; "a subset of our servers and networking equipment from six years to five years"; "due to the increased pace of technology development… artificial intelligence and machine learning" | 10-Q Q1 2025, Note 1 | https://www.sec.gov/Archives/edgar/data/1018724/000101872425000036/amzn-20250331.htm |
| 4–5 → 5.5 | yr, Meta servers and network assets | FILING | Table: servers and network assets "Four to Five years"; tagged Subsequent Event (Jan 29, 2025): "5 years 6 months" | 10-K FY2024, R10 and R47 | https://www.sec.gov/Archives/edgar/data/1326801/000132680125000017/R47.htm |
| ~5 | yr, IT replacement (Virginia) | PRIMARY (state legislative audit, Commission draft) | "computer equipment that is typically replaced every five years" | JLARC, *Data Centers in Virginia* (Dec 2024), pp. 16, 21 | https://www.fredericksburgva.gov/DocumentCenter/View/28959/JLARC---Data-Centers-Study_Report_120924 |
| Colocation 2–5; scale/hyperscale 5–10+ | yr, customer contract length | FILING | 0–1 MW colocation: "Contract length generally 2-5 years"; >1 MW: "Contract length generally 5-10+ years" | Digital Realty 10-K FY2024, Item 1, product table | https://www.sec.gov/Archives/edgar/data/1297996/000155837025001424/dlr-20241231x10k.htm |
| ≥1 | yr, Equinix contracts | FILING | "Customers typically sign renewable contracts of one or more years in length." | Equinix 10-K FY2014, Item 1 | https://www.sec.gov/Archives/edgar/data/0001101239/000119312515073042/d854432d10k.htm |
| 23.3% | share of floor area, Digital Realty | FILING | customer agreements representing "23.3% of the square footage" were "scheduled to expire through 2026" | 10-K FY2024, Item 1A | same as Digital Realty above |

I did not reach the Amazon 2022 change from four to five years in a readable part of a filing. The 10-K text gets cut off partway through Item 7, so that change is UNVERIFIED.

## 2. Plant life

ASHRAE Handbook, HVAC Applications 2015, Ch. 37 "Owning and Operating Costs", Table 4 "Comparison of Service Life Estimates". The page was open on handbook.ashrae.org: https://handbook.ashrae.org/Handbooks/A15/IP/A15_CH37/a15_ch37_ip.aspx. Status: **PRIMARY**. The values are medians.

| Equipment | Abramson et al. 2005 (yr) | Akalin 1978 (yr) |
|---|---|---|
| Centrifugal chiller | >25 | 23 |
| Reciprocating chiller | N/A | 20 |
| Absorption chiller | N/A | 23 |
| Cooling tower, galvanized | >22 | 20 |
| Cooling tower, wood / ceramic | N/A | 20 / 34 |
| Air-cooled condenser (closest proxy for a dry cooler) | N/A | 20 |
| Evaporative condenser | N/A | 20 |
| Heat pump, commercial water-to-air | >24 | 19 |
| Heat pump, commercial air-to-air | N/A | 15 |
| Pump, base-mounted / pipe-mounted | N/A | 20 / 10 |
| Shell-and-tube heat exchanger | N/A | 24 |
| Electric transformer | N/A | 30 |
| Motor | N/A | 18 |

- **What ">25" means.** The handbook says the centrifugal-chiller median "can only be stated with confidence as >25 years". Table 3 medians are the "highest age at which the survival rate remains at or above 50%".
- **UPS, generators, CRAC units.** None of these is in ASHRAE Table 4. I found no primary source for them.
- **DEA heat pumps (Ch. 40) and district-heating grid (Ch. 113).** I located the catalogues (https://ens.dk/media/6571/download, v0017, May 2025; https://ens.dk/media/6440/download), but the fetch tool cuts them off before those chapters. The lifetimes are UNVERIFIED.
  - The only DEA figure I read was for the electricity distribution grid, not district heating: "the technical life time for stations and cables are 40 years" (Energy Transport catalogue, p. 45).
- **District-heating pipes** (Energiforsk report 2022:872, RISE; research institute, PRIMARY):
  - "EN 253 (2019) states that the service life shall be 30 years at 120 °C with single peaks of 140 °C."
  - "If a service life of 50 years is desired, the temperatures must be below 115 °C." (p. 32)
  - URL: https://energiforsk.se/media/31455/liftetime-predictions-and-status-assessments-energiforskrapport-2022-872.pdf
  - Your register's "network 40–50 yr" is only conditionally supported. The standard's design life is 30 years; 50 years needs supply temperatures below 115 °C.

## 3. Shell life, and data-centre building reuse

| Item | Status | Quote / data | Source |
|---|---|---|---|
| Building depreciation, Alphabet | FILING | "We depreciate buildings over periods of seven to 25 years" | goog 10-K FY2022, R27 |
| Building depreciation, Meta | FILING | Buildings "25 to 30 years" | meta 10-K FY2024, R10 |
| Building depreciation, Amazon | FILING | "(generally the lesser of 40 years or the remaining life of the underlying building…" | amzn 10-K FY2024, R24 |
| Building depreciation, Microsoft | FILING | "buildings and improvements, five to 15 years" | msft 10-K FY2022, R27 |
| WBLCA reference study period | PRIMARY (method convention, not an observed life) | "Reference study period: must be set to 60 years." | Carbon Leadership Forum benchmark v2 user guide (2024), p. 7 |
| Impermanence and closure | PRIMARY (peer-reviewed); figures inside it SECONDARY | Velkova (2019), *Culture Machine* 18: operators "tend to limit their lifespan to six years only"; Ericsson Vaudreuil, QC: "shut down the facility less than a year after its inauguration"; a data centre built inside a logistics centre was demolished after about 5 years (architect interview) | https://culturemachine.net/vol-18-the-nature-of-data-centers/data-centers-as-impermanent/ |
| Conversion of old industrial buildings | PRIMARY (peer-reviewed; abstract only) | "the majority of data centres are not placed in these retrofitted industrial buildings" | Jacobson & Hogan (2019), *Work Organisation, Labour & Globalisation* 13(2): 78–94, doi:10.13169/workorgalaboglob.13.2.0078 |

City of Edmonton General Building Permits (open data, dataset 24uj-dj8v; PRIMARY municipal). I queried job descriptions containing "DATA CENT" and got 17 records. The relevant ones:

- 2009-06-19, 5103 Windermere Blvd SW: interior alterations to an existing office building, "New Data Center for Alberta Pensions…", 2,200 sq ft.
- 2011-08-19, 10423 101 St NW: office tower P1 level, "Epcor Data Centre".
- 2015-05-12 and 2020-05-21, 17204 114 Ave NW: a General Industrial building / warehouse turned into a data centre, "2019 EDMONTON DC2 HALL 7 & 8 EXPANSION", 9,519 sq ft, $4.0 M.
- **2021-08-26, 12831 163 St NW: "To demolish a Business And Personal Services use building – Sobeys Data Centre."** This is an end-of-life example.

I found no peer-reviewed or government study that quantifies data-centre building conversion or decommissioning rates.

## 4. Construction duration

| Figure | Status | Quote | Source |
|---|---|---|---|
| 12–18 months per building | PRIMARY | "Construction of an individual data center building usually takes about 12 to 18 months" | JLARC 2024, pp. 13–14 |
| 5+ yr per campus | PRIMARY | "it can take five or more years to fully build out a campus" | JLARC 2024, p. 14 |
| 2–3 yr to operation | PRIMARY (IEA) | "a data centre can be operational in two to three years" | IEA, *Energy and AI* (2025), https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai |
| 12–18 months of capital committed ahead of customers | FILING | resources committed "generally 12 to 18 months in advance of securing customer contracts" | Equinix 10-K FY2014 |
| <30 weeks | FILING (operator claim) | "on average we can deliver a fully commissioned facility in under 30 weeks" | Digital Realty 10-K FY2017, Item 1 |
| Large-load grid connection delay | PRIMARY | additions "expected to take 12 to 36 months longer than they have previously taken" (Dominion letter cited by JLARC) | JLARC p. 36 |

Deriving build times from permit data:

- **Edmonton.** You can compute `occupancy_granted_date − issue_date` per permit. The catch: for non-residential permits, occupancy dates exist only for permits completed on or after 2024-01-01, and only when an occupancy record exists. The field is stored as text, and the metadata calls it "trend analysis only".
- **Vancouver.** The issued-building-permits dataset covers permits since 2017. It has `PermitElapsedDays` (application to issuance) but no occupancy or completion date, so it cannot give construction duration.

## 5. Ramp-up and stabilisation

**No primary source found.** I could not find a definition of "stabilised" in the Equinix or Digital Realty filings I read (FY2014, FY2017, FY2024 10-Ks and a 2018 Equinix 8-K). Barroso et al. (p. 135) only scale costs by the inverse of occupancy and note that "data center space takes a while to build".

## 6. Embodied carbon of buildings

- **Wadenstein & Vanderbauwhede (2025), *Eur. Phys. J. C*** (peer-reviewed), §3.2: "1,829 tCO2e on construction, increasing to 2,400 tCO2e after 20 years… for a 1MW data centre". Status: **SECONDARY**, because the paper takes these figures from a Schneider Electric white paper (Lin, Bunger & Avelar 2023), which counts as a MANUFACTURER CLAIM. https://arxiv.org/html/2506.14365v1
- **Whitehead, Andrews & Shah (2015), *Int J LCA* 20(3): 332–349.** I could read the abstract only (paywalled). It gives no per-m² figure; it reports that IT-embodied impact exceeds mechanical and electrical operational impact.
- **Alissa et al. (2025), *Nature* 641: 331–338.** The scope includes data-centre buildings, but I could not fetch the full text. The LCA spreadsheets are open on Zenodo (https://zenodo.org/records/14268168) and still need to be read.
- **No per-m² benchmark found yet.** The CLF v2 user guide gives none for data centres. Hassel (2025) is a Harvard master's thesis (60-yr building, 15–25-yr mechanical): not peer-reviewed, so SECONDARY.

## 7. Employment

| Figure | Status | Quote | Source |
|---|---|---|---|
| ~50 operating jobs per 250,000 sq ft | PRIMARY | "approximately 50 full-time workers (one employee per 5,000 square feet" | JLARC pp. i, 13 |
| ~1,500 on site at peak construction | PRIMARY | "at the height of construction, approximately 1,500 workers are on site" | JLARC p. i |
| 3,000+ construction / 300 permanent (Meta, Sturgeon County AB, 970 MW phase 1) | Government page relaying an OPERATOR CLAIM; UNVERIFIED | the page cites Meta's July 2026 announcement and a Sturgeon County release; no method given | https://www.alberta.ca/datacentres/numbers |
| Equinix 13,606 employees; Digital Realty 3,936 | FILING | company totals, not per facility | 10-Ks FY2024 |

- The Alberta jobs figures are dated July 2026, which is after my training data, so I could not cross-check them.
- The PwC/Data Center Coalition and Chamber studies are INDUSTRY reports; I did not use them.
- I found no Statistics Canada or Innovation, Science and Economic Development (ISED) figure per MW.
- I found no figures per MW for 1–40 MW facilities.

## 8. End of heat supply

- **Wahlroos et al. (2018), *RSER* 82: 1749–1764** (abstract): the barrier is an "unstable source of heat", and "business models… are often not transparent". No contract lengths are given.
- **Yuan et al. (2025), *RSER* 219: 115863** (abstract only): nothing on closure.
- **Velkova (2019)** above is the only source I found that documents a heat-source data centre closing early.
- The search limit ran out before I reached the EU ReUseHeat deliverables and Lygnerud's later papers.

---

## Proposed lifecycle timeline

| Phase | Duration | Source |
|---|---|---|
| Planning, permitting and grid connection | No primary figure; the grid can add 12–36 months | JLARC p. 36 |
| Construction (one building) | 12–18 months; 2–3 yr to operation | JLARC; IEA |
| Campus build-out | 5+ yr | JLARC |
| Ramp-up to stabilised use | No primary source found | — |
| Customer contracts | 2–5 yr colocation; 5–10+ yr scale | Digital Realty 10-K (FILING) |
| Server refresh | 5–6 yr (average 5.7 in 2023; 5 for some AI servers from 2025) | LBNL; 10-Ks; JLARC |
| Network gear | 6 yr | Microsoft and Alphabet 10-Ks |
| Chillers, towers, condensers, heat pumps | 15–25+ yr (median) | ASHRAE Table 4 |
| UPS and generators | No primary source found | — |
| Facility amortisation | 15–20 yr; TCO horizon 15–20 yr | Barroso; JLARC p. ix |
| Shell (book life) | 7–40 yr depending on the company | 10-Ks |
| Shell (physical life) | No primary source; 60 yr is an LCA convention | CLF |
| District-heating pipes | 30 yr at 120 °C; 50 yr only below 115 °C | EN 253 via Energiforsk |
| Closure or reuse | Case evidence only | Velkova 2019; Edmonton Sobeys demolition permit 2021 |

## Blocked or not retrieved

- **Proxy refused (403) for Bash downloads:** eta-publications.lbl.gov, www.sec.gov. Both were readable through web fetch instead.
- **opendata.vancouver.ca API:** refused by the site's robots.txt rules. I did not work around it.
- **Not fetched (tool provenance limit, not a site block):** https://www.nature.com/articles/s41586-025-08832-3
- **Fetch errors:** ASHRAE TC 7.8 FAQ 58 PDF; the open.alberta.ca AI Data Centre Strategy PDF (server error).
- **Paywalled:** Whitehead 2015 full text (Springer); Wahlroos 2018 and Yuan 2025 (ScienceDirect).
- **Cut off before the relevant chapters:** DEA catalogues (Ch. 40 heat pumps, Ch. 113 district heating); the Barroso full PDF (the Springer Ch. 6 PDF was used instead).
- **Search limit reached:** items 5, 6 and 8 need another pass.

**Worth saving to memory:** Jenna's tool register now has primary sources for server life, plant life and build time. The open gaps are ramp-up/stabilisation, UPS and generator life, building embodied carbon per m², and heat-recovery termination. Edmonton's open permit data has occupancy dates for non-residential permits completed since 2024, so build durations can be derived there; Vancouver's cannot.


## H4. Tariffs, mitigation costs, operating figures

# Primary sources for six tool assumptions: Vancouver and Edmonton heat-recovery tool (checked 13 Oct 2026)

I found primary-source figures for six of the eight items. Two came up short. I found no cost per m² for enclosures or barriers around equipment, and no Canadian district-heating pipe cost per metre. Edmonton's IIS02765 report could not be found.

**Before you cite anything:** a page-reading tool pulled the quotes and page numbers from each page or PDF. They are verbatim as that tool returned them, but please check each one at the URL before it goes into the thesis. Status labels: **PRIMARY**, **INDUSTRY SURVEY**, **MANUFACTURER**, **UNVERIFIED**.

---

## 1. Electricity prices for 2026

### BC Hydro

| Figure | Value | Status | Quote / source detail | URL |
|---|---|---|---|---|
| Large General Service (RS 1600/1601/1610/1611) basic charge | 29.99 ¢/day | PRIMARY | "29.99 cents per day." The page gives no effective date. | [app.bchydro.com business rates](https://app.bchydro.com/accounts-billing/rates-energy-use/electricity-rates/business-rates.html) |
| Large General Service demand charge | $13.83/kW | PRIMARY | "$13.83 per kW." | same |
| Large General Service energy charge | 6.79 ¢/kWh | PRIMARY | "6.79 cents per kWh." The tariff's table of contents shows LGS 1600–1611 at "Revision 26, Effective: July 1, 2026", with order G-64-26 on those pages. I could not read the schedule pages themselves (see blocked list). | same; [Electric Tariff PDF](https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/corporate/tariff-filings/electric-tariff/bchydro-electric-tariff.pdf) |
| **RS 1823 (stepped Transmission Service)** | closed | PRIMARY | "Rate is closed to all customers effective the end of the fiscal 2026 billing year." Remaining customers were moved to RS 1830, and 1823 was cancelled on 1 April 2026. **Your tool should use RS 1830 instead of RS 1823.** | [Transmission rates](https://app.bchydro.com/accounts-billing/rates-energy-use/electricity-rates/transmission_rate.html) |
| RS 1830 Transmission Service demand charge (fiscal 2027) | $12.178/kVA of billing demand | PRIMARY | "$12.178 per kVA of billing demand." | same |
| RS 1830 energy charge (fiscal 2027) | 4.914 ¢/kWh | PRIMARY | "4.914 cents per kWh applied to all kWh." Energy charges A, B and C were combined into this one charge from 1 April 2026. | same |
| New optional transmission rates | RS 2801/2802 (time-of-use), RS 2821/2822 (critical peak pricing), from 1 Apr 2026 | PRIMARY | The critical-peak charge applies "from 4 p.m. to 8 p.m. on weekdays", for up to 15 events and 60 hours a year. | same |
| BC Hydro data-centre rate | **No rate found** | PRIMARY | None of BC Hydro's rate pages has a data-centre-specific rate. | — |
| AI and data-centre electricity allocation | 300 MW for AI, 100 MW for data centres | PRIMARY | "300MW for AI projects, 100MW for data centre projects". "All data centre and AI projects 10 MW and greater will enter the competitive selection process." The two-year call was "launched … on February 1, 2026". Selected projects are "subject to a lower price premium and reduced curtailment requirements". The page gives **no figures** for that premium or curtailment. | [BC Industrial Electricity Allocation Framework](https://www2.gov.bc.ca/gov/content/industry/electricity-alternative-energy/electricity/industrial-electricity-allocation-framework) (updated 31 Mar 2026) |
| Large loads over 150 MW | full incremental cost | PRIMARY | Customers "requiring more than 150 megawatts" are assigned "the full cost of both incremental electricity generation and upgrades." This is a government news release, so it is PRIMARY government, not press. Crypto mining: "permanently ban new BC Hydro connections". | [BC Gov release 2025ECS0044, 20 Oct 2025](https://archive.news.gov.bc.ca/releases/news_releases_2024-2028/2025ECS0044-001032.htm) |

### Alberta

| Figure | Value | Status | Quote / page | URL |
|---|---|---|---|---|
| Pool price, 2025 average | $43.68/MWh | PRIMARY | "The 2025 daily average pool price ($43.68) fell by 30.4 per cent compared to 2024 ($62.78)." Table 1, p. 2. | [AESO 2025 Annual Market Statistics](https://www.aeso.ca/assets/Annual-Market-Stats-2025.pdf) |
| Pool price, 2024 average | $62.78/MWh | PRIMARY | Same source, same table. | same |
| On-peak / off-peak average, 2025 | 52.15 / 26.74 $/MWh | PRIMARY | Table 1, p. 2. | same |
| On-peak / off-peak average, 2024 | 74.46 / 39.43 $/MWh | PRIMARY | Table 1, p. 2. | same |
| **EPCOR distribution (DAS), 2026 interim rates, effective 1 Jan 2026** | | PRIMARY | EPCOR serves the City of Edmonton. | [EPCOR 2026-01 DAS tariff](https://www.epcor.com/content/dam/epcor/documents/rates/distribution-access-service-tariffs/2026-01-distribution-access-service-tariff.pdf) |
| DAS-TOU (150 to under 5,000 kVA, secondary voltage), pp. 5–6 | $43.46210/site/day; $0.22878/kW/day; $0.00000/kWh | PRIMARY | Minimum billing demand is 50 kW. | same |
| DAS-TOUP (primary voltage, 150 kVA or more), pp. 7–8 | $67.45678/site/day; $0.13822/kW/day; $0.00000/kWh | PRIMARY | | same |
| DAS-CS (over 5,000 kVA), pp. 9–10 | flat $/day for each named customer | PRIMARY | "existing service only, not available to new points of service." **A new data centre in Edmonton would not get this class.** | same |
| DAS-DC (connected directly to transmission), p. 11 | $9.66306/site/day | PRIMARY | | same |
| **EPCOR transmission pass-through (SAS), 2026 interim rates, effective 1 Jan 2026** | | PRIMARY | Labelled "Based on Proposed 2026 AESO ISO Tariff Update Application in Proceeding 30427". | [EPCOR 2026-01 SAS tariff](https://www.epcor.com/content/dam/epcor/documents/rates/system-access-service-tariffs/2026-01-system-access-service-tariff.pdf) |
| SAS-TOU, pp. 5–6 | energy $0.00253/kWh; capacity $0.12868/kW/day; OSS $0.00107/kW/day; operating reserve 8.09% × energy × pool price; demand $0.24154/kW/day | PRIMARY | | same |
| SAS-TOUP, pp. 7–8 | $0.00250/kWh; $0.13497; $0.00112; 7.99%; $0.28126 /kW/day | PRIMARY | | same |
| **FortisAlberta, effective 1 Jan 2026 (AUC Decision 30274-D01-2025; schedule dated 1 Oct 2026)** | | PRIMARY | FortisAlberta serves the area around Edmonton, not the city itself. | [FortisAlberta schedules, effective 1 Oct 2026](https://www.fortisalberta.com/docs/default-source/default-document-library/rates-options-and-riders-schedules-effective-october1-2026.pdf) |
| Rate 61 General Service (up to 2,000 kW), pp. 20–21 | Transmission: $0.244663/kW-day (usage), $0.140959/kW-day (capacity), $0.006424/kWh. Distribution: $0.107884/kW-day, $0.114553/kW-day, $1.385825/day | PRIMARY | Capacity is ratcheted to 85% of the 12-month peak. | same |
| Rate 63 Large General Service (over 2,000 kW), pp. 23–24 | Transmission: $0.214447/kW-day, $0.174184/kW-day, $0.006228/kWh. Distribution: $27.080602/contract km-day, $0.015170/kW-day, $15.998863/day | PRIMARY | Capacity is ratcheted to 90% of the 12-month peak, with a 2,000 kW rate minimum. | same |
| Rate 65 Transmission Connected, p. 25 | Distribution $50.619440/day; AESO ISO tariff passed through | PRIMARY | | same |
| Rate of Last Resort (the RRO's replacement), Edmonton small commercial | 12.01 ¢/kWh | PRIMARY | "The current rate period is January 1, 2025 – December 31, 2026." Only for businesses that "use less than 250,000 kWh of electricity per year". **A data centre or heat-pump plant would not qualify.** | [EPCOR regulated business](https://www.epcor.com/ca/en/ab/edmonton/account/rates/business/regulated-business.html) |

## 2. EUR to CAD exchange rate

| Figure | Value | Status | Quote | URL |
|---|---|---|---|---|
| 2025 annual average | 1 EUR = 1.5782 CAD | PRIMARY | "The annual average exchange rates are published by 12:30 ET on the last business day of the year." The rates are "indicative rates only, obtained from averages of aggregated price quotes from financial institutions." The page does not say which days are averaged. | [Bank of Canada annual averages](https://www.bankofcanada.ca/rates/exchange/annual-average-exchange-rates/) |
| 2024 annual average | 1.4818 | PRIMARY | same | same |

## 3. PUE (power usage effectiveness)

| Figure | Value | Status | Quote / page | URL |
|---|---|---|---|---|
| LBNL 2024 report, US average | 1.6 (2014) falling to 1.4 (2023) | PRIMARY | "The resulting annual average PUE falls from 1.6 in 2014 to 1.4 in 2023." p. 48 | [Shehabi et al. 2024, LBNL-2001637](https://climate.mit.edu/sites/default/files/2025-02/lbnl-2024-united-states-data-center-energy-usage-report.pdf) |
| LBNL, hyperscale and colocation combined | under 1.4 (2023) | PRIMARY | "By 2023, the average PUE across hyperscale and colocation data centers is under 1.4." p. 48. The values for each space type appear only in a chart (Fig. 4.5), not in the text. | same |
| LBNL, 2028 projection | 1.15–1.35 | PRIMARY | p. 48 | same |
| LBNL, existing building vs purpose-built | **not stated** | — | The report has no retrofit-versus-new split. | — |
| Uptime 2025, global | 1.54 (n=681) | INDUSTRY SURVEY | "respondents' annual PUE had a weighted average of 1.54", p. 7 | [Uptime 2025 survey](https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2025.Annual.Survey.Report.pdf?version=0) |
| Uptime 2025, facilities built in the last 5 years | 1.48 | INDUSTRY SURVEY | Facilities commissioned within five years "achieved an average PUE of 1.48", p. 8. **This is the closest thing to a new-versus-older split.** | same |
| Uptime 2025, facilities of 20 MW or more | 1.44 | INDUSTRY SURVEY | p. 7 | same |
| Uptime 2025, North America | 1.49 (n=111) | INDUSTRY SURVEY | p. 1 | [Uptime regional view 2025](https://intelligence.uptimeinstitute.com/sites/default/files/2025-08/UI%20Field%20report%20183_Annual%20survey%20-%20regional%20view%202025.pdf) |
| Uptime 2024 | 1.56 | UNVERIFIED | Read only from a chart label in the 2025 report (Fig. 2). | same as 2025 survey |
| Canadian figure (NRCan) | **none exists** | PRIMARY | NRCan states "a sufficient survey assessing data center PUE is not currently available". | [NRCan ENERGY STAR data-centre technical reference](https://natural-resources.canada.ca/energy-efficiency/energy-star/buildings/technical-reference-documents/data-center) |
| BC Hydro data-centre benchmark | not found | — | | — |

## 4. Share of data-centre heat captured into liquid

| Figure | Value | Status | Quote / page | Source |
|---|---|---|---|---|
| Direct-to-chip, LBNL prototype | best 67–75%; 57% / 59% at 50% / 100% load with 30 °C supply; 35% at idle | PRIMARY (government lab report) | "The best results ranged from 67 percent to 75 percent." p. 2. Capture falls as return water gets hotter. | [Coles & Greenberg 2014, LBNL](https://escholarship.org/content/qt0g50294h/qt0g50294h.pdf) |
| Direct-to-chip, CPU only (Asetek RackCDU) | up to 64% at 89 °F outlet; 48% near 100 °F | PRIMARY (government lab report) | "RackCDU captured up to 64% of server heat into the liquid stream at an outlet temperature of 89 degrees F" | [NREL/TP-2C00-62905](https://www.osti.gov/biblio/1164105) |
| Cold plate, 53 kW rack | 94% | PRIMARY (peer-reviewed) | "the heat capture ratio for fluid was found to be 94%." | [Heydari et al. 2024, *Appl. Therm. Eng.* 239:122122](https://par.nsf.gov/biblio/10529800) |
| Hot-water cooled (Aquasar) | 80% heat recovery efficiency at 60 °C | PRIMARY (peer-reviewed) | "A heat recovery efficiency of 80% and an exergetic efficiency of 34% were achieved with a water temperature of 60 °C." | [Zimmermann et al. 2012, *Energy* 43:237–245](https://ideas.repec.org/a/eee/energy/v43y2012i1p237-245.html) |
| Lu et al. 2011, "97%" | 97% | **UNVERIFIED** | I found this only as a citation in another paper: "97 % energy consumption can be recovered as waste heat" (Sethuramalingam et al. 2019, p. 366). The original is Lu et al. 2011, *Energy & Buildings* 43(12):3360–3372, doi:10.1016/j.enbuild.2011.08.034, and it was blocked. It seems to describe how much electricity ends up as heat, not how much is captured in liquid. | [SHU repository](https://shura.shu.ac.uk/26175/1/Asthana_ReviewOfWaste%28VoR%29.pdf) |
| Ebrahimi et al. 2014 | 50% | UNVERIFIED | Cited in Sethuramalingam et al. 2019: "recover up to 50% energy from its waste heat", for air-handling (CRAC) systems. I did not see the original. | same |
| Capture temperatures | air 25–35 °C; liquid 50–60 °C | UNVERIFIED | Quoted in Sethuramalingam et al. (pp. 366, 370), citing Ebrahimi et al. 2015 and Davies et al. 2016. I could not read the originals. | same |
| Rear-door heat exchangers | **not found** | — | I found no peer-reviewed capture percentage. | — |

## 5. District energy systems

| Figure | Value | Status | Quote / page | URL |
|---|---|---|---|---|
| NEU distribution temperature | minimum 65 °C | PRIMARY | "The NEU distribution network temperature is minimum 65°C." | [NEU Connectivity Guidelines, May 2026](https://guidelines.vancouver.ca/guidelines-neighbourhood-energy-utility-connectivity-requirements.pdf) |
| NEU building-side supply and return | supply 60 °C year-round; return 45 °C maximum; ΔT at least 15 °C | PRIMARY | Table 2, p. 21: "a maximum return water temperature of 45°C must be achieved under all conditions" | same |
| NEU scale | 47 buildings; 667,000 m² | PRIMARY | RTS 18251, p. 2 | [RTS 18251, 2026 NEU rates](https://council.vancouver.ca/20251112/documents/spec1d.pdf) |
| NEU 2026 rates | $0.696/m²/month (Class 1); $10.466/kW peak/month (Classes 2 and 3); $65.172/MWh | PRIMARY | Table 1, p. 3 | same |
| NEU renewable share | 71% forecast for 2025 | PRIMARY | Appendix B, p. 5 | same |
| NEU future capital | $40M for distribution | PRIMARY | "$40M for distribution infrastructure are estimated", App. B, p. 6 | same |
| NEU annual heat delivered | **not stated** | — | Not in RTS 18251, 16419 or 15730. In those reports the generation mix appears only in charts. | — |
| Creative Energy Core steam: 2025 approved load | 1,115,063 M# (thousand pounds of steam) | PRIMARY | Core Steam plus NEFC alone is 1,106,786 M#, p. 4. Average rate $13.84/M#, Table 1. "more than 208 connected buildings", p. i. | [BCUC G-199-25A](https://www.ordersdecisions.bcuc.com/bcuc/orders/en/522881/1/document.do) |
| Creative Energy: electric boiler share | 85,000 MWh ≈ 18% of annual steam demand | PRIMARY | "85,000 MWh/year of electric boiler capacity represents approximately 18 percent of Creative Energy's annual steam demand", p. 10. Planned plant: 2 × 6.9 MW electric boilers. | [BCUC C-5-22, 2022](https://www.ordersdecisions.bcuc.com/bcuc/decisions/en/521247/1/document.do) |
| Creative Energy steam pressure and temperature | **not stated** | — | Not in either decision I read. | — |
| Edmonton Downtown District Energy Initiative | up to 50 buildings by 2050; gas boilers at first; heat only in Phases 1–2 | PRIMARY | Design temperatures and loads are **not on the page**. Report IIS02765 was not found. | [Edmonton district energy page](https://www.gov.edmonton.ab.ca/projects_plans/district-energy) |
| Blatchford 2026 rates | $13.18/kW peak/month (multi-unit); $0.0358/kWh variable; townhouse $2.07/unit/day | PRIMARY | The page itself has unit inconsistencies: a "monthly" charge given "per unit per day", and the multi-unit variable charge given "per kW". | [Blatchford 2026 rates](https://blatchfordutility.ca/2026-rates-blatchford-renewable-energy/) |
| Blatchford bylaw | Bylaw 17943 | PRIMARY | Consolidated 1 Jan 2024. Infrastructure fee $22.24/m² for multi-unit commercial. | [Bylaw 17943](https://www.edmonton.ca/documents/Bylaws/C17943.pdf) |
| Blatchford temperatures and loads | "ambient temperature district energy sharing system"; no °C or MW given | PRIMARY | | [Blatchford energy strategy overview](https://blatchfordedmonton.ca/wp-content/uploads/2016/05/Blatchford-energy-strategy-overview.pdf) |

## 6. Noise mitigation

| Figure | Value | Status | Quote / page | URL |
|---|---|---|---|---|
| US highway noise barriers, average cost (2022 US$) | $40.18/ft² calculated for 2022; $36.47/ft² average 1963–2022 | PRIMARY (US government) | Column header: "Cost per Square Foot (Average Calculated here in 2022 $)". This is in US dollars per square foot, not CAD/m². | [FHWA barrier inventory](https://www.fhwa.dot.gov/ENVIRONMENT/noise/noise_barriers/inventory/graphs/graph02.cfm) |
| BC MoTI cost benchmark | $25,000 (moderate) / $40,000 (severe) per directly benefiting residential unit | PRIMARY | Policy dated 27 Oct 2016. Barriers must cut total exposure by at least 5 dBA, and walls are limited to 5 m high. No cost per m². | [BC MoTI noise policy](https://www2.gov.bc.ca/assets/gov/driving-and-transportation/transportation-infrastructure/engineering-standards-and-guidelines/environment/references/noise-policy-highways.pdf) |
| Barrier attenuation (City of Calgary) | 5 dB once line of sight is broken, plus 1.5 dB per extra metre of height | PRIMARY (municipal) | "A noise barrier can achieve a 5-decibel noise level reduction when it is tall enough to break the line-of-sight" | [Calgary noise barrier FAQ](https://www.calgary.ca/content/dam/www/transportation/tp/documents/projects/current-planning-projects/noise-barrier-retrofit-faq.pdf) |
| Chiller enclosure, one case | 88 dBA reduced to 69 dBA at 10 ft (19 dBA) | MANUFACTURER | Kinetics Noise Control profile in *Canadian Acoustics* 44(2), 2016, pp. 6–7. No cost given. | [JCAA](https://jcaa.caa-aca.ca/index.php/jcaa/article/download/2848/pdf/3737) |
| Generator enclosures | Level 1: 73–76 dB(A); Level 2: 70–72 dB(A), at 7 m and 100% load | MANUFACTURER | Cat LEHE0465-09, 350–750 ekW. No open-set (unenclosed) levels are given, so insertion loss **cannot be derived**. | [Cat enclosure sheet](https://www.petersoncat.com/sites/default/files/products/documents/-113522.pdf) |
| Enclosure or barrier cost per m² for dry coolers, chillers or generators | **not found in a primary source** | — | | — |

## 7. District-heating pipe cost per metre

| Figure | Value | Status | Quote / page | URL |
|---|---|---|---|---|
| River District phase 2, Vancouver | 4,440 m of pipe; $53,023,200 for piping and energy transfer stations **combined** | PRIMARY | "the total cost estimate for the DPS and ETS $53,023,200", p. 35. The cost table is an image. Operating range is "between 60oC and 85oC", and Metro Vancouver waste heat arrives at 90–120 °C, p. 15. | [BCUC C-3-23](https://www.ordersdecisions.bcuc.com/bcuc/decisions/en/521743/1/document.do) |
| Canadian pipe-only cost per metre | **none found** | — | Not in the NEU reports, NRCan, or the Oakridge CPCN (C-2-22) that I could read. | — |

## 8. BC marginal emission factor

**No marginal or incremental factor was found.**

- **BC government factor (PRIMARY):** the integrated grid factor is 22.8 tCO₂e/GWh for 2025, 9.9 for 2024 and 11.3 for 2023. It is consumption-based: imports count and exports are subtracted, averaged over four years. The page does not mention a marginal factor. Source: [BC electricity emission intensity factors](https://www2.gov.bc.ca/gov/content/environment/climate-change/data/electricity) (updated 26 May 2026).
- **BC 2025 Best Practices Methodology (PRIMARY, Dec 2025):** it calls the factors "consumption-based, calculated using a 'net import' model". It has no marginal or incremental factor, but the reader cut off after Section 4.2.3, so I did not see the annexes.
- **BC Hydro 2025 IRP application:** I could not read it (see blocked list).

---

## What this replaces in the tool

1. **BC data-centre and heat-pump power price:** your current assumption becomes the LGS rates ($13.83/kW, 6.79 ¢/kWh, 29.99 ¢/day) or RS 1830 ($12.178/kVA, 4.914 ¢/kWh). **Remove RS 1823; it was cancelled on 1 Apr 2026.** Add a note on the 400 MW AI and data-centre allocation, and that loads over 150 MW pay full incremental cost.
2. **Alberta power price:** pool price of $43.68/MWh (2025) or $62.78/MWh (2024), plus EPCOR DAS and SAS charges (DAS-TOUP, SAS-TOUP), or FortisAlberta Rate 63 outside the city. **The RoLR cannot be used for these loads.**
3. **EUR to CAD:** 1.5782 (Bank of Canada 2025 annual average).
4. **PUE:** about 1.4 (US 2023 average, LBNL) up to 1.54 (global, Uptime). New facilities 1.48 and North America 1.49 (Uptime). Show a range; no source splits existing buildings from purpose-built ones.
5. **Share captured in liquid:**
   - Liquid-cooled: 48–75% from the LBNL and NREL tests, and up to 94% in a single cold-plate rack test (Heydari).
   - Air-cooled: no primary figure.
   - **Mark the "97%" as UNVERIFIED.**
6. **District temperatures:** NEU network at least 65 °C, with 60 °C supply and 45 °C maximum return on the building side. River District 60–85 °C. Blatchford is ambient-temperature. No primary pressure or temperature for Creative Energy steam.
7. **Noise mitigation:** for highway barriers, keep it as a range: FHWA US$36–40/ft² (2022 dollars), 5 dB plus 1.5 dB per metre of height. For equipment enclosures, the only figure is one manufacturer case of 19 dBA, with no cost. Keep enclosure cost marked as an assumption.
8. **Pipe cost per metre:** no Canadian primary figure, so the register's figure stays an assumption. River District only gives a combined piping-plus-stations cost.
9. **Carbon factor:** use the BC average factor of 22.8 tCO₂e/GWh (2025). State that no official BC marginal factor was found.

## Blocked or not retrieved

I did not try any workaround for these.

- **BC Hydro Electric Tariff PDF:** the proxy returned 403 when I tried to download it, and the page reader returned only the table of contents and terms. The LGS and RS 1830 schedule pages were not read. https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/corporate/tariff-filings/electric-tariff/bchydro-electric-tariff.pdf
- **Lu et al. 2011 on ScienceDirect:** blocked by the site's robots rule. https://www.sciencedirect.com/ (doi:10.1016/j.enbuild.2011.08.034)
- **BC Hydro 2025 IRP application:** fetch error. https://docs.bcuc.com/documents/proceedings/2025/doc_84202_b-1-bch-2025-irp-application.pdf
- **Creative Energy response to CEC information request (IR1):** fetch error. https://docs.bcuc.com/documents/proceedings/2020/doc_57730_b-6-creativeenergy-response-to-cec-ir1.pdf
- **Edmonton council search for IIS02765:** fetch error, and web search found nothing. https://pub-edmonton.escribemeetings.com/
- **AESO 2024 Annual Market Statistics:** the PDF came back unreadable. The 2024 values are confirmed in the 2025 edition instead. https://aeso.ca/download/listedfiles/2024-Annual-Market-Statistics.pdf
- **BC MoTI Noise Control Earth Berms (2009):** the PDF has no readable text. https://www2.gov.bc.ca/assets/gov/driving-and-transportation/transportation-infrastructure/engineering-standards-and-guidelines/environment/references/guidelines-noise_control_earth_berms.pdf
- **Values shown only in charts:** LBNL Fig. 4.5 (PUE by space type), NEU generation mix (RTS 18251 Fig. 4), and River District cost Table 10.

**Worth noting in the project file:** RS 1823 is gone and RS 1830 is the transmission default. EPCOR's over-5,000 kVA class is closed to new customers. No official BC marginal emission factor exists.


## H5. People, receivers, why urban

# Research report: urban data centres, Vancouver and Edmonton (Parkland County)

**Scope and limits:**
- I ran out of web searches partway through item 5. That means:
  - item 4 is missing several of the named authors;
  - item 5 is thin;
  - I found no primary Vancouver facility list for item 6.
- The fetch tool only returned verbatim quotes under 125 characters. Some quotes are therefore excerpts, and some page numbers were inferred from PDF footers. Both are marked.
- Status key:
  - **PRIMARY**: I read it in the original document.
  - **SECONDARY**: a summary, non-peer-reviewed university work, or a personal opinion.
  - **UNVERIFIED**: from my own knowledge, not confirmed this session.

---

## 1. Census data at dissemination-area (DA) level

| Item | Value | Status | Quote / note | Source |
|---|---|---|---|---|
| Census Profile product | **98-401-X2021006**, "Census Profile, 2021: Canada, Provinces, Territories, Census Divisions, Census Subdivisions and Dissemination Areas", released Dec 15, 2022 | PRIMARY | Formats: CSV, TAB, IVT | https://www150.statcan.gc.ca/n1/en/catalogue/98-401-X2021006 |
| BC-only DA file | GEONO=`006_BC_CB`. CSV 299,852 KB; TAB 294,966; IVT 41,779 | PRIMARY (sizes as listed on the page) | `.../comp/GetFile.cfm?Lang=E&FILETYPE=CSV&GEONO=006_BC_CB` | download page below |
| Prairies-only DA file (Alberta, Saskatchewan, Manitoba) | GEONO=`006_Prairies`. CSV 436,604 KB | PRIMARY | `.../GetFile.cfm?Lang=E&FILETYPE=CSV&GEONO=006_Prairies` | same |
| Versions with confidence intervals (long-form sample) | `006CI_BC_CB` (CSV 248,702 KB), `006CI_Prairies` (CSV 355,906 KB) | PRIMARY | Use these for income and shelter variables | same |
| File names inside the zip archives | not stated on the page | — | My direct header checks were refused by the network proxy (403), so I couldn't confirm them | — |
| Shelter cost includes utilities | — | PRIMARY | "along with the costs of electricity, heat, water and other municipal services" (owners); renters the same | https://www12.statcan.gc.ca/census-recensement/2021/ref/dict/az/Definition-eng.cfm?ID=households-menage033 |
| "Real need" variables at DA level: LIM-AT prevalence (%), "Spending 30% or more of income on shelter costs", "In core housing need" | exact characteristic labels | UNVERIFIED | The Census Profile pages returned errors, so check the labels in the CSV | — |
| Energy cost variable at DA level | **not in the Census Profile** | PRIMARY (inferred) | The 2021 Census did collect electricity and fuel costs (see item 2), but a DA-level figure would need a custom tabulation | — |
| CSD codes: Vancouver 5915022, Edmonton 4811061, Parkland County 4811034 | — | UNVERIFIED | Filter the CSV on these, then check | — |
| DA boundary file | **92-169-X**, 2021 issue released Nov 17, 2021 | PRIMARY | Covers "the dissemination area boundaries for which Census data are disseminated" | https://www150.statcan.gc.ca/n1/en/catalogue/92-169-X |
| DA boundary file names | `lda_000b21a_e` = cartographic (land only); `lda_000a21a_e` = digital (includes coastal water). Shapefile, Lambert conformal conic, NAD83 | PRIMARY | Digital file holds all 57,936 DAs; cartographic holds 57,932 | https://www150.statcan.gc.ca/pub/92-160-g/92-160-g2021001-eng.htm (Section 4) |

## 2. Energy poverty indicators

| Item | Figure | Status | Quote / note | Source |
|---|---|---|---|---|
| Statistics Canada, *Estimation of Energy Poverty Rates Using the 2021 Census of Population* (Dionne-Laforest, Heisel, Situ; 46-28-0001, released Feb 20, 2024) | Definition: 10% or more of after-tax income spent on dwelling energy bills | PRIMARY | Energy bills "include electricity and fuel costs" (Note 1) | https://www150.statcan.gc.ca/n1/pub/46-28-0001/2024001/article/00001-eng.htm |
| Canada | 5.6% (822,000 households) | PRIMARY | Direct payments only | same |
| BC / Alberta | 4.9% / 7.3% | PRIMARY | BC is named among "the lowest rates of energy-poor households" | same |
| Geography of the StatCan article | Canada and provinces only; CSDs used only inside the method; no CMA figures; no downloadable table number | PRIMARY | — | same |
| CUSP Energy Poverty and Equity Explorer | "neighbourhood-scale", built on "custom Statistics Canada datasets" | SECONDARY | Green Municipal Fund description | https://greenmunicipalfund.ca/resources/tool-municipal-clean-energy-program-development-use-energy-poverty-and-equity-explorer |
| CUSP methodology | Threshold of more than 6% of after-tax income on home energy; **census-tract** geography; 2016 Census custom tables (inferred from "in 2015" income) | SECONDARY (UBC SEEDS student report, McNaughton 2020, pp. 2, 4–5, 34) | "there is no formal and official definition for energy poverty in Canada" (p. 2) | https://sustain.ubc.ca/sites/default/files/2020-30_Energy%20Poverty%20Community%20Profile_McNaughton.pdf |
| **CUSP tool status** | energypoverty.ca now shows an unrelated casino page | PRIMARY (observed Oct 13, 2026) | The tool is no longer at that domain. CUSP has not been contacted | — |
| Efficiency Canada Energy Poverty Data Map (a research group, grey literature) | Thresholds 6% / 10% / 15% of income; housing-cost burden >30%; "2021 Census custom data" (p. 11); geography "at various geographic scales", not specified | SECONDARY | "more indicators are available for download on our energy poverty hub" (p. 20) | https://efficiencycanada.org/wp-content/uploads/2024/05/Efficiency-Canada-Energy-Poverty-Data-Map-User-Guide.pdf |
| Das, Martiskainen & Li 2022, *Canadian Geographies* 66(3):416–433, doi:10.1111/cag.12750 | 7–9% of households spend more than 10% of income on energy (2016 Survey of Household Spending; national/provincial, not small-area) | SECONDARY (abstract only) | "7–9% of households spent more than 10% of their income on energy expenditures" | https://crdcn.ca/publication/quantifying-the-prevalence-of-energy-poverty-across-canada-estimating-domestic-energy-burden-using-an-expenditures-approach/ |

**Bottom line:** I found no public DA-level energy-poverty dataset for BC or Alberta. The options are:
- census-tract data (CUSP 2016, Efficiency Canada 2021, geography unconfirmed); or
- a StatCan custom tabulation of the 2021 electricity and fuel cost variables.

## 3. Heat receivers

**Vancouver and region**

| Receiver | Figure | Unit | Status | Quote / note, page | Source |
|---|---|---|---|---|---|
| False Creek NEU (City) | 667,000 connected floor area, ~2,000,000 forecast build-out; 47 buildings | m² | PRIMARY | "currently services 47 residential, commercial, and institutional buildings" (p. 2) | https://council.vancouver.ca/20251112/documents/spec1d.pdf (RTS 18251, Oct 21, 2025) |
| False Creek NEU | 71% renewable forecast for 2025; annual MWh and peak MW not stated | % | PRIMARY | "forecasting to deliver 71% of its energy from renewable in 2025" (App. B p. 6) | same |
| False Creek NEU | 6.6 sewage heat recovery added | MW (web page) / "MWh" (report) | PRIMARY | The two sources disagree on the unit; the web page says "6.6 megawatts" | https://vancouver.ca/home-property-development/southeast-false-creek-neighbourhood-energy-utility.aspx |
| False Creek NEU: data centres named as a heat source | — | — | PRIMARY | "waste heat recovery from sewage, commercial cooling, and data centres" (App. B p. 8) | spec1d.pdf |
| NEU rezoning condition, 1220 Station St (next to the new St Paul's) | — | — | PRIMARY | Condition 1.32 asks the applicant to explore "heat recovery from commercial refrigeration systems, data centres, industrial processes" (p. 26) | https://council.vancouver.ca/20260602/documents/r23.pdf |
| Creative Energy Core steam (720 Beatty) | 971,259 thousand lb of steam (2021 amended forecast); "more than 200 buildings" | klb/yr | PRIMARY | BCUC G-310-21A, Oct 29, 2021, pp. i–ii | https://www.ordersdecisions.bcuc.com/bcuc/decisions/en/515249/1/document.do |
| Creative Energy NE False Creek + steam | NEFC: 506,300 m², 24 MW diversified peak, 48,100 MWh/yr by 2024. Combined with steam: 213–221 MW peak | various | PRIMARY (2015 forecasts, now dated) | BCUC C-12-15, Dec 8, 2015, pp. 10–11 | https://www.ordersdecisions.bcuc.com/bcuc/decisions/en/126938/1/document.do |
| Creative Energy Sen̓áḵw DES | ~185,000 m²; 10,343 kW heating design peak; 11,218 MWh/yr heat | — | PRIMARY | BCUC C-5-23, Oct 26, 2023, pp. 7, 9, 10 | https://www.ordersdecisions.bcuc.com/bcuc/decisions/en/521940/1/document.do |
| River District Energy | ~290,000 m², 19 buildings (2022); peak 11.0 MW (2022) rising to 26.1 MW (2047); ~33,600 MWh/yr low-carbon heat at build-out | — | PRIMARY | Main source is waste heat from Metro Vancouver's Waste-to-Energy Facility (10 MW). BCUC C-3-23, Jun 27, 2023, pp. 5, 11, 24 | https://www.ordersdecisions.bcuc.com/bcuc/decisions/en/521743/1/document.do |
| UBC Academic District Energy System | 162 buildings, ~10 million sq ft; gas boilers 3 × 15 MWt; biomass 6 MWt (+12 MWt planned); ~89 GWh hot water in FY2018/19 | — | PRIMARY | UBC Energy & Water Services 2018/19, pp. 3–6. The 89 GWh label was hard to read in the diagram | https://vpfo-facilities.sites.olt.ubc.ca/files/2025/02/2019-UBC_EWS_DES.pdf |
| SFU/Corix Burnaby Mountain (**Burnaby, not Vancouver**) | SFU demand 43,787 MWh/yr; biomass 13.5 MW (10 MW to SFU); plant 19.5 MW | — | PRIMARY | BCUC G-279-21, Sep 24, 2021, pp. 19, 21, 25 | https://www.ordersdecisions.bcuc.com/bcuc/decisions/en/513500/1/document.do |
| Large buildings (Energize Vancouver) | Office heat 687,445 GJ/yr and retail 49,309 GJ/yr (buildings over 100,000 ft², 2023 data) | GJ/yr | PRIMARY | Building-level figures only for owners who chose to disclose (slides 15–18) | https://vancouver.ca/files/cov/annual-ghg-and-energy-limits-by-law-year-1-implementation.pdf ; map https://energycarbonreport.vancouver.ca/map/ |
| Vancouver General Hospital, St Paul's, pools and rinks | not stated | — | — | No primary facility-level energy data found | — |

**Edmonton**

| Receiver | Figure | Status | Quote / note | Source |
|---|---|---|---|---|
| Downtown District Energy Initiative (City and EPCOR) | Up to 50 buildings at full build-out by 2050. Phase 1: 3 buildings (Winspear, Chancery Hall, Century Place). Phase 2: up to 20. Gas boilers at first; MW not stated | PRIMARY | "expected to be operational by fall 2025" | https://www.gov.edmonton.ab.ca/projects_plans/district-energy |
| Blatchford Renewable Energy Utility | 13.1 MW heating / 12.3 MW cooling (grant-funded); "Over 100 homes" connected (2024); 570 boreholes × 150 m; sewer heat still in design; annual MWh not stated | PRIMARY | City-owned | https://blatchfordutility.ca/about-us/ ; https://blatchfordutility.ca/district-energy-sharing/ |
| University of Alberta district energy | Capacity and annual heat not stated. Serves North Campus "which includes Alberta Health Services and provincial government buildings" | PRIMARY | U of A Hospital is not named | https://www.ualberta.ca/en/university-services-operations-finance/initiatives/our-district-energy-system.html |
| Royal Alexandra, U of A Hospital, pools, rinks | not stated | — | Not found | — |
| Greenhouses near Edmonton | Census of Agriculture table 32-10-0360-01 goes down to census consolidated subdivision; Alberta Division 11 values not retrieved | PRIMARY (table exists) | No per-site greenhouse data found | https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3210036001 |

## 4. Why data centres locate in cities

Quotes from abstracts don't have page numbers.

| Source | Quote (excerpt), page | Status |
|---|---|---|
| Pan Fang, T. & Greenstein, S. (2025) "Where the cloud rests: The economic geography of data centers", *Strategy Science* 10(4):404–, doi:10.1287/stsc.2024.0225 | "The former [third-party firms] favors urban settings more and appears sensitive to buyer demand for proximity."; "They trade off costs of supply, which vary with density, and economies of scale."; "Cloud providers tend to display a lower propensity for locating in urban areas." (abstract) | PRIMARY (abstract) |
| Malecki, E.J. (2002) *Economic Geography* 78(4):399–424, doi:10.1111/j.1944-8287.2002.tb00193.x | "a global bias of Internet backbone networks toward world cities", "tempered only slightly by a set of urban areas that serve as interconnection points" (abstract) | PRIMARY (abstract) |
| Townsend, A.M. (2001) *Environment and Planning B* 28(1):39–58, doi:10.1068/b2688 | "have broadly diffused across a wide group of medium-sized and large-sized metropolitan areas"; "the growing divide between network cities and the rest of the urban world" (abstract) | PRIMARY (abstract) |
| O'Kelly & Grubesic (2002) *Environment and Planning B* 29(4):533–552, doi:10.1068/b12829 | "certain locations are more accessible and better connected than others" (abstract) | PRIMARY (abstract) |
| Satyanarayanan, M. (2017) "The Emergence of Edge Computing", *Computer*, Jan 2017, pp. 30–39 | Average round-trip time to the optimal EC2 instance from 260 vantage points = 74 ms (p. 31); "VR applications that use headtracked systems require latencies of less than 16 ms" (p. 32); "End-to-end latency of a few tens of milliseconds is a safe but achievable goal." (p. 32); edge processing "can reduce ingress bandwidth into the cloud by three to six orders of magnitude" (p. 35) | PRIMARY. Volume and issue not confirmed |
| Carr, Bast, Madron & Syrus (2022) "Mapping the clouds: the matter of data centers", *Journal of Maps*, doi:10.1080/17445647.2022.2088304 | "concentrated in metropolitan areas where the demand is high" (p. 3); "DCs require access to electrical grids and telecommunication infrastructure" (p. 3) | PRIMARY. Pages inferred |
| Monstadt & Saltzman (2025) "How data centers have come to matter…", *IJURR* 49(4):757–778, doi:10.1111/1468-2427.13316 | Abstract (paraphrase): Amsterdam promoted itself as a "digital gateway to Europe"; after years of "largely unconditional political support" it brought in reforms to limit growth; waste-heat reuse and land and power demand remain unresolved | SECONDARY (abstract via RePEc; the Wiley full text was blocked) |
| Bresnihan & Brodie (2021) *Environment and Planning E* 4(4):1645–1664, doi:10.1177/2514848620970121 | "data centres have primarily clustered around the T50 fibre optic cable ring around the city of Dublin" (p. 1654) | PRIMARY |
| Virginia JLARC Report 598 (Dec 9, 2024) | "a strong fiber network, supply of reliable cheap energy, and available land" (p. 7); "The establishment of an internet exchange point in the 1990s" (p. 7); "Being in proximity to customers reduces the time it takes for data to travel" (p. 3) | PRIMARY (government report) |
| Graham, S. (1999) "Global grids of glass", *Urban Studies* 36(5–6):929–949 | not stated (paywalled) | citation PRIMARY, content UNVERIFIED |
| Evans-Cowley, J. (2002) *Telecom Hotels: A Planners Guide*, APA PAS Report 505 | Telecom hotels appeared in US downtowns from 1999; some cities drafted "emergency legislation to prevent these new developments from disrupting downtown plans" | SECONDARY (catalogue page only) |
| Pickren (*Progress in Human Geography*), Velkova 2016 (*Big Data & Society*), Hogan 2015, Taylor, Brodie, Vonderau; academic work on 60 Hudson and One Wilshire | not stated | UNVERIFIED (search budget ran out) |
| **ISED, Canada's Responsible Data Centre Development Principles** (Sept 15, 2026) | Five principles: local benefits; households not to bear grid costs ("Proponents must pay the costs of connecting and serving their projects"); water; transparency; strategic value. "waste heat recovery" is a priority technology. No siting criteria | PRIMARY |
| ISED, *Data centres: Powering Canada's digital future responsibly* (Sept 2026) | Siting not addressed | PRIMARY |
| Alberta AI Data Centre Strategy fact sheet (Dec 2024) | "Alberta's cold climate provides a natural benefit to cooling solution challenges."; "capturing and redirecting heat for other uses"; "municipalities can accelerate and benefit from the modernization of their power, water, and internet services." No urban or latency reasoning | PRIMARY (fact sheet; the full strategy PDF failed to load) |
| BC Hydro, 2026 Call for Demand, Request for Applications | 300 MW for AI data centres and 100 MW for storage data centres; projects 10–145 MW; scoring: 30% cost, 30% data sovereignty, 20% community (includes "brownfield site"), 10% environment ("heat recovery ready", PUE, WUE), 10% First Nations (pp. 1, 7, 30) | PRIMARY |

**What these sources say about cities:** none of the Canadian government sources gives an urban or latency reason for siting. The urban argument rests on:
- Pan Fang & Greenstein: buyer proximity favours third-party firms;
- Malecki and Townsend: interconnection points sit in cities;
- Satyanarayanan: latency thresholds for edge computing;
- JLARC: the internet exchange point and customer proximity.

## 5. Who is affected

| Source | Finding | Status |
|---|---|---|
| JLARC Report 598 (2024) | Jobs: "approximately 50 full-time workers, about half of which are contract workers" (p. i). "Most of these economic benefits derive from the construction phase" (p. i). Bills: residential "generation- and transmission-related costs increasing by an estimated $14 to $37 monthly" (p. v). Land use: "largely incompatible with residential uses"; "One-third of data centers are currently located near residential areas" (p. vii). Noise: "constant noise … affects their well-being" (p. viii) | PRIMARY |
| Loudoun County, M. Turner slides (Jul 1, 2026) | 250+ data centres; 5.33 GW (2025); recommends 50 dBA at the property line and 500–1,000 ft setbacks (pp. 2, 6, 16, 18). The slides state they are the supervisor's own opinion, not the County's | SECONDARY (personal view) |
| Bresnihan & Brodie (2021) | Grid strain; Athenry residents saw Apple as "a ticket to the tech services-focused recovery economy" (p. 1656); Donegal residents "see AWS as an intruder" (p. 1658) | PRIMARY |
| Ireland CRU decision on new data-centre connections (Dec 12, 2025) | New sites must supply generation or storage "either onsite or local in proximity" equal to their import demand; 80% renewable | PRIMARY (news page; the decision document is probably CRU2025236, UNVERIFIED) |
| Carr et al. (2022) | Data centres "stress local administrations, financing, and availability of upstream resources" (p. 1) | PRIMARY |
| Libertson, Velkova & Palm, "energy gentrification" (Sweden); Dutch planning studies; property-value studies | not stated | UNVERIFIED (not reached) |

The only property-value material I found was trade press and news, so I left it out.

## 6. Existing data-centre clusters

- **Alberta:** you already have the AESO project list.
- **Vancouver:** I found no primary source listing facilities by address, because the search budget ran out before I got to it.
- **Note for heat matching:** the Creative Energy steam plant at 720 Beatty is a primary-sourced address.

---

## Downloads to fetch yourself

1. **Census Profile, BC DAs.** Go to https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/download-telecharger.cfm?Lang=E. Under "Comprehensive download files", find the row for Canada, provinces, territories, CDs, CSDs and DAs, "British Columbia only", and click CSV. Direct link: `https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/download-telecharger/comp/GetFile.cfm?Lang=E&FILETYPE=CSV&GEONO=006_BC_CB`
2. **Census Profile, Prairies (Edmonton and Parkland).** Same link with `GEONO=006_Prairies`. For confidence intervals, use `006CI_BC_CB` and `006CI_Prairies`.
3. **DA boundaries.** Go to https://www12.statcan.gc.ca/census-recensement/2021/geo/sip-pis/boundary-limites/index2021-eng.cfm?year=21. Choose Statistical boundaries, then Dissemination areas, Cartographic, Shapefile, English. That gives `lda_000b21a_e.zip`.
4. **StatCan energy-poverty article:** https://www150.statcan.gc.ca/n1/pub/46-28-0001/2024001/article/00001-eng.htm (there's a PDF link on the page).
5. **Census of Agriculture greenhouse table** 32-10-0360-01: use "Download options" and choose Alberta, Division No. 11.
6. **BCUC decisions:** G-310-21A, C-12-15, C-5-23, C-3-23, G-279-21 (links above). The tail end of each long decision (roughly the last 10,000–18,000 characters) wasn't read.
7. **Energize Vancouver map:** https://energycarbonreport.vancouver.ca/map/ (disclosed buildings only; it isn't clear whether the export is public).
8. **JLARC report:** https://jlarc.virginia.gov/pdfs/reports/Rpt598-2.pdf
9. **BC Hydro Request for Applications:** https://app.bchydro.com/content/dam/BCHydro/customer-portal/documents/accounts-billing/electrical-connections/2026-cfd-request-for-applications.pdf

## Blocked or unreachable (not worked around)

- **edmonton.ca** (the site's robots rules blocked my fetch): https://www.edmonton.ca/sites/default/files/public-files/BlatchfordRenewableEnergyUtility2023-2026BudgetandPlans.pdf
- **Edmonton council (fetch error):** https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=174375
- **Wiley (fetch error):** https://onlinelibrary.wiley.com/doi/full/10.1111/1468-2427.13316
- **Alberta strategy PDF (server error):** https://open.alberta.ca/dataset/f6fe5816-12ac-4ba6-805c-d0a0dd5aebf9/resource/26d62103-ff38-4310-a98f-ab4595a4af74/download/ti-albertas-ai-data-centre-strategy.pdf and https://open.alberta.ca/publications/albertas-ai-data-centre-strategy
- **StatCan Census Profile pages (errors):** `.../prof/details/page.cfm?...DGUIDlist=2021A00055915022...` and `.../prof/search-recherche/results-resultats.cfm?SearchText=Parkland%20County`
- **StatCan GetFile and api.crossref.org:** the network proxy refused my direct requests (403).
- **Efficiency Canada map page:** the tool wouldn't fetch it: https://www.efficiencycanada.org/energy-poverty-in-canada/
- **Paywalled:** Graham 1999, *Urban Studies*.

## Worth saving to memory

- energypoverty.ca no longer hosts CUSP's tool (it now shows a casino page).
- The Census Profile has no energy-cost variable at DA level.
- Two primary Vancouver sources name data centres as NEU heat sources: the 2026 NEU rates report and the 1220 Station St rezoning condition 1.32.
- BC Hydro's 2026 Call for Demand allocates 300 MW + 100 MW, for projects of 10–145 MW, and scores "heat recovery ready".
