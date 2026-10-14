# 18 — Edmonton zoning: data-centre use and buildable envelope

Prepared 14 Oct 2026 for the "Beyond Data" tool (ARCH 540 / GP1). Sources are City of Edmonton Zoning Bylaw 20001 (passed 23 Oct 2023, in force 1 Jan 2024) as published on the City's online bylaw (zoningbylaw.edmonton.ca), City engagement pages, and the City's open-data zoning layer (the student's CSV export). All pages were fetched on 14 Oct 2026.

**Status labels.** **SOURCED** means the value was read on an official City page. **UNVERIFIED** means it could not be confirmed in an official in-force text, or it rests on interpretation.

**How to read the quotes.** Quotes and numbers were read through a fetch tool that summarises pages and caps quotes at about 125 characters. Long definitions are therefore quoted in segments. Check every quote and number against the official PDF before you cite it in thesis text.

**Version.** The online bylaw shows no consolidation date. It says only "Passed by Council on October 23, 2023, effective January 1, 2024", and that the online version "is consolidated for convenience only". The Amendments page lists Charter Bylaws 20560, 20728, 20736 (omnibus), 20756 and 20794, with no dates. None of them concerns data centres or the industrial zones. Read this note as "online consolidation as viewed 14 Oct 2026". The open-data layer used by the student is stamped `date_ext` = 2026/10/12.

**Access notes.**
- **Blocked by the network proxy (HTTP 403):** direct downloads from `www.edmonton.ca` and `zoningbylaw.edmonton.ca`.
- **Blocked to the fetch tool (robots.txt):** the official consolidated PDF (`edmonton.ca/.../Bylaws/Bylaw20001.pdf`), the City's *Land Use & Zoning Matrix* PDF, the *Zoning Bylaw Guide* PDF and the City page *Data Centre Development*. These were **not** worked around.
- **eScribe:** Bylaw 21121 (an amendment to 20001) returned a fetch error and was not read.
- **Gaps in the online bylaw pages:** several pages do not render part of their content. Section 2 (use list) is missing on CG, CB, IH, EETIM, EETM and EETL. Table 4.1 is missing on IM and UF. These gaps are flagged below.

---

## 1. Summary table

**Legend:**
- **P\*** = listed in the zone's use list. In standard zones the use list appears to be the Permitted Uses list (see §2.4). The heading itself is not rendered online, so the permitted status is UNVERIFIED.
- **D\*** = in the second use list of a Special Area zone, which we infer is the Discretionary list (§2.4).
- **NL** = not listed.
- **Deemed-use caveat:** under s. 7.20(3.3.2), a use the Development Planner deems to fit is always Discretionary (§2.2). This applies to every P\* row.

**Applies to every row unless the row says otherwise:**
- **Parking/loading:** no minimum vehicle parking. Loading spaces: 0 under 2,500 m² floor area, 1 for 2,500–7,500 m², 2 over 7,500 m² (s. 5.80, Table 7.2). See §3.
- **Landscaping:** s. 5.60 citywide rules. See §3.

| Zone (code in open data) | Data-centre use status (as Minor Industrial / Major Industrial / Minor Utility / ES "Information Service") | Max height | Max FAR | Max site coverage | Min setbacks | Landscaping / screening | Parking / loading for the use | Bylaw ref | Status |
|---|---|---|---|---|---|---|---|---|---|
| **BE** Business Employment | Minor Industrial **P\*** (2.3); Minor Utility **P\*** (2.21); Major Industrial NL | 16.0 m (4.1.1) | 1.6 (4.1.2) | none in zone | Street 6.0 m (4.1.3); Collector/Local road 4.5 m (4.1.4); Site 0 m (4.1.5); Site in residential zone 6.0 m (4.1.6); Alley 0 m (4.1.7) | Parking/loading/storage not in setbacks (5.4). Parking/display may enter a residential-side setback with a 3.0 m Landscape Buffer (5.5). Mechanical/electrical equipment screened from streets and non-industrial sites (5.2). Loading/service not between building and street, and screened (5.8). Walls over 25 m facing street need 2+ design techniques (5.1). Industrial activity must be enclosed except Minor Industrial loading, waste and storage (3.2.1) | As above | s. 2.120 | SOURCED (values). Use status P\* UNVERIFIED |
| **IM** Medium Industrial | Minor Industrial **P\*** (2.4). Major Industrial only "limited to those existing as of January 1, 2024" (2.3). Minor Utility **P\*** (2.13) | **not rendered** | **not rendered** | not rendered | **not rendered** (Table 4.1 missing online; 5.4 cross-refers to 4.1.1) | Parking/loading/storage not in required setbacks (5.1). Storage/service areas not between building and street, and screened, unless the road is a Local Road serving IH/IM or the abutting site is IH/IM (5.2). Screening max 3.7 m (5.3). Outdoor storage height 8.0 m / 2.0 m near listed corridors (Table 5.4). Office/technical space ≤ 33 % of floor area for Minor Industrial (3.2.1) | As above | s. 2.130 | Uses SOURCED. **Envelope UNVERIFIED** |
| **IH** Heavy Industrial | Major Industrial and Minor Industrial regulated in 3.1. The Section 2 use list is not rendered online. Both are presumably listed **P\*** | 30.0 m (4.1.2); Development Planner may vary for features needed by the operation (4.2) | 2.0 (4.1.3) | none in zone | Street 3.0 m (4.1.4); Alley or abutting site 0 m (4.1.5); **min site area 1.0 ha** (4.1.1) | Parking/loading/storage not in setbacks (5.1). Storage/service screening with IH/IM exceptions (5.2). Risk/environmental assessment may be required under s. 7.140 (5.3) | As above | s. 2.140 | Envelope SOURCED. Use list UNVERIFIED (not rendered) |
| **PU** Public Utility | Major Utility listed (min site 1.0 ha). Minor Utility NL; Industrial NL | 12.0 m; 18.0 m on sites > 0.7 ha (4.1.1–4.1.2); variance 4.2 | none | none | Street 6.0 m; Site 4.5 m; Site in residential zone 7.5 m; Major Utility from site in non-industrial zone 10.0 m; Alley 4.5 m (4.1.3–4.1.7) | s. 5.60 applies. Loading/storage at rear or sides (5.3). Site performance s. 5.120 applies, but Major Utility is exempt from subsection 1 (5.7) | As above | s. 2.190 | SOURCED. A data centre is not a Major Utility by definition (§2) |
| **UI** Urban Institution | Minor Utility **P\*** (2.9). Minor Industrial only in Appendix 10 Sub-area 2, as indoor/outdoor storage (10.5, 10.11) | 55.0 m (4.1.5) | 10.0 (4.1.6) | none | Street: **maximum** 1.0 m (4.1.1); Site in residential zone 7.5 m, or 10.0 m for a building with commercial uses (4.1.2–4.1.3); Alley abutting residential 1.5 m (4.1.4) | — | As above | s. 2.210 | SOURCED. Fit as Minor Utility is interpretation |
| **FD** Future Urban Development | Minor Industrial "limited to temporary outdoor storage" (3.9, 4.3), so a data centre is excluded. Minor Utility listed (3.11) | 12.0 m (5.1.2) | none | none | 7.5 m (5.1.3); min site 8.0 ha (5.1.1) | Exempt from 5.60 s. 4.1. Development must not need foundations that cannot readily be removed (6.1.2) | — | s. 2.240 | SOURCED. Effectively **not permitted** for a permanent data centre |
| **A** River Valley | Minor Utility listed (3.14). Industrial NL | — | — | — | — | Environmental review; Discretionary Development may be refused (5.1.2) | — | s. 2.150 | SOURCED (use list) |
| RS, RSF, RSM, RM, RL, RR, MUN, MU, CN | **NL** (Minor/Major Industrial, Minor/Major Utility all absent). MU lists only Indoor Self Storage under Industrial | (MU height/FAR set by map modifiers `h`/`f`, 4.1.1/4.1.3) | — | — | — | — | — | ss. 2.10–2.90 | SOURCED (read via the bylaw print page) |
| **CG** General Commercial | Section 2 use list not rendered. Section 3 regulations and the print page show no Minor/Major Industrial or utility use. Likely **NL** | (16.0 m; FAR 3.5; for reference) | — | — | — | — | — | s. 2.100 | **UNVERIFIED** |
| **CB** Business Commercial | Section 2 not rendered. The phrases "Minor Industrial" and "Minor Utility" do not appear on the page. Likely **NL** | (16.0 m; FAR 3.5; for reference) | — | — | — | — | — | s. 2.110 | **UNVERIFIED** |
| NA, PS, PSN, UF, AG | **NL** | — | — | — | — | — | — | ss. 2.160–2.200, 2.230 | SOURCED |
| **AJ** Alternative Jurisdiction | Not governed by the bylaw while federal/provincial jurisdiction applies. If the bylaw later applies, the most restrictive abutting zone governs and development is Discretionary | — | — | — | — | — | — | s. 2.220 | SOURCED |
| **EETC** EETP Chemical Cluster | Major Industrial (not within the 1.5 km Risk Buffer, 4.2). Minor Industrial only within the Risk Buffer (4.1). City engagement page: an AI data centre "would be considered … Major Industrial" and is "currently permitted within the Petrochemical Precinct" | **not rendered** | **not rendered** | — | Street 3.0 m (5.1.2); larger setback may be required (5.2); **min site 1.0 ha** (5.1.1) | Special-area rules (s. 3.50): Eco-Industrial Design Plan (5.1), Landscape Plan (5.2), risk management plan (5.5–5.7), parking plan / parkade (5.8–5.10) | Parking plan required (3.50 s. 5.8) | s. 3.52; s. 3.50; LDA26-0225 page | Use SOURCED (City page). Height/FAR **UNVERIFIED** |
| **EETIM** EETP Medium Industrial | Main use list not rendered. City page: a large AI data centre "is not contemplated or allowed"; a small one "could be considered as a Minor Industrial Use" if "nuisances are shown to be minimal". Service Commercial Node: Minor Industrial permitted; Major Utilities discretionary (6.3) | 18.0 m (5.1.2); may vary to 22.0 m (5.2) | 2.0 (5.1.1) | — | 0 m (5.1.3); Front 6.0 m (5.1.4); Front on a non-arterial/service/collector street 3.0 m (5.1.5) | As EETC (s. 3.50) | As EETC | s. 3.56; LDA26-0225 | Envelope SOURCED. Use list **UNVERIFIED** |
| **EETM** EETP Manufacturing | Use list not rendered. Purpose names manufacturing/industrial. Major Utilities (no landfill or nuclear, ≥ 300 m from municipal boundary) regulated in 4.4 | 18.0 m (5.1.2); may vary to 22.0 m (5.2) | 2.0 (5.1.1) | — | 0 m; Front 6.0 m; Front on a lesser street 3.0 m; min frontage 30.0 m (5.1.3–5.1.6) | 6.0 m landscaped berm where abutting residential (7.3). Storage at rear, not facing arterials (7.1). Mechanical equipment concealed (6.2.4–6.2.5) | As EETC | s. 3.54 | Envelope SOURCED. Use **UNVERIFIED** |
| **EETL** EETP Logistics | Use list not rendered | 14.0 m (5.1.2); variance to 18.0 m for industrial development (5.2) | 1.5 (5.1.1) | — | 0 m; Front 6.0 m; Front on a lesser street 3.0 m (5.1.3–5.1.5) | 6.0 m berm abutting residential (7.3). Activities enclosed where possible (7.5) | As EETC | s. 3.53 | Envelope SOURCED. Use **UNVERIFIED** |
| **EETR** EETP Industrial Reserve | **NL** (Minor Utility only, 3.3) | — | — | — | — | — | — | s. 3.55 | SOURCED |
| **EIB** Ellerslie Industrial Business | Minor Industrial (excluding Fleet Services and Recycling Depots) **P\*** (2.6) | 12.0 m (5.1.2); up to 14.0 m for Minor Industrial operations (5.3) | 1.2 (5.1.1) | — | 6.0 m where abutting a street, commercial or residential zone, or SWMF/open-space corridor (5.1.3); other sites 0 m (5.1.4); min frontage 30.0 m (5.2) | Mechanical equipment, transformers and cooling towers screened from streets and non-industrial sites (6.2). Outdoor storage/loading screened 1.8 m (6.5). Parking may enter a residential setback with a 3.0 m buffer (6.4) | As above | s. 3.181 | Values SOURCED. P\* UNVERIFIED |
| **EIM** Ellerslie Medium Industrial | Minor Industrial (excluding Fleet Services and Recycling Depots) **P\*** (2.3) | 18.0 m (5.1.2) | 2.0 (5.1.1) | — | Street 3.0 m (5.1.3); Alley or site 0 m (5.1.4) | Nothing in setbacks (6.1). Storage at rear or sides and screened (6.2). Screening 1.8–3.7 m (6.4) | As above | s. 3.182 | Values SOURCED. P\* UNVERIFIED |
| **ECB** Ellerslie Business Commercial | Minor Industrial "limited to Special Industrial Uses" (2.13); "Special Industrial Uses" is not defined in what was read. Fleet Services and Recycling Depots in the second list (3.6) | 14.5 m flat roof / 16.0 m pitched (5.1.3–5.1.4) | 1.4; 2.0 with underground parkade (5.1.1–5.1.2) | — | 6.0 m (5.1.6); others 0 m (5.1.7) | — | — | s. 3.183 | **UNVERIFIED** (fit) |
| **ILES** Industrial-Light Edmonton South | "Information Service" **P\*** (2.19). Its definition "includes data processing" (3.60, 4.1.84). Also Industrial, Light (2.18); Utility Service, Minor (2.32) | 6 storeys outside airport vicinity (5.3). Edmonton International Airport Zoning Regulations near the airport (5.2) | none | **80 %** principal plus accessory (5.4) | Road (highway, arterial, internal/service, street) 7.5 m front/side/rear; other lots side 0.0 m, rear 1.2 m (5.1.1–5.1.5) | Landscaping plan required. Front yards and road-side yards landscaped to 6.0 m depth. Outdoor storage screened and not the dominant use. Nuisance must not be apparent outside the building | Hard-surfaced. No ratio in zone | s. 3.66; defs s. 3.60 | Values SOURCED. P\* UNVERIFIED |
| **IBES** Industrial Business Edmonton South | "Information Service" **P\*** (2.13); Utility Service, Minor (2.20) | 6 storeys (5.2.2); airport regulations (5.2.1) | none | **80 %** (5.3) | Roads 7.5 m (5.1.1–5.1.3); side abutting residential 15.0 m (single storey) or 30.0 m (multi-storey) (5.1.5); rear 1.2 m (5.1.6) | Landscaping per 7.1–7.3. **Outdoor storage not permitted** (7.4). Rooftop equipment screened (7.25) | Hard-surfaced (7.6) | s. 3.65 | Values SOURCED. P\* UNVERIFIED |
| **DC/INDES** (s. 3.68 DC/IND) | Council direct control. Uses come from the ASP/ARP or a Council resolution | — | — | — | — | — | — | s. 3.68 | Not computable (§4) |
| UW, CMU, RMU, AED, A6 (Downtown / River Valley special areas) | Minor Utility listed (UW 3.12; CMU 3.12; RMU 3.9; AED 3.5; A6 4.21). Minor/Major Industrial NL | — | — | — | — | — | — | Part 3 | SOURCED (use presence only). Envelope not extracted |
| Other special-area zones in the data (Blatchford BLMR/BRH/BP/BMR, Griesbach, Stillwater, Paisley, Ambleside, Marquis, Riverview, Clareview Campus, Heritage Valley TC-C, CMUV, HDR, CCA, JAMSC, HA, A1–A5, AES/RAES/RCES/UC3ES) | Not checked one by one. Mostly residential, commercial or park. Likely **NL** | — | — | — | — | — | — | Part 3 | **UNVERIFIED** |
| **DC1 / DC2 / DC** | Per individual provision (§4) | | | | | | | Part 4 | Not computable generically |

---

## 2. Use classification

### 2.1 The bylaw does not name data centres

The use definitions in s. 8.10 contain no "data centre", "server", "computer" or "data". The only near term is "telecommunications centres", inside Minor Utility. The candidate definitions (s. 8.10, as rendered on the City's online bylaw) are below.

- **Minor Industrial** (Industrial Uses): "Minor Industrial means a development used primarily for 1 or more of the following activities:" … "manufacturing, cleaning, servicing, repairing or testing materials, goods and equipment;" "handling, storing, or shipping equipment, goods, and materials;" … "Any resulting Nuisance is less impactful than those permitted under the Major Industrial Use." Examples include "laboratories … materials storage, research facilities … and warehouses."
- **Major Industrial**: the same activity list, plus "at least 1 of the following features:" "the creation of Nuisances that extend beyond the boundaries of the Site" … "or the use of materials or processing operations that require separation from other developments," "due to risk of toxic emissions or fire and explosion hazards." Examples: "chemical plants, land treatment facilities, metal factories, and petroleum refineries."
- **Minor Utility** (Basic Service Uses): "Minor Utility means a development that provides utility infrastructure" "which is likely to create minimal or no Nuisance." Examples include "communication towers, district heating plants … power terminals and distributing substations," "snow dumping sites, switching centres, telecommunications centres, …" "water treatment plants, and wire centres."
- **Major Utility**: "a development that provides utility infrastructure" "which is likely to create major Nuisances such as emissions, odour, light, or noise." Examples: "compost facilities, cooling plants, …" "power generating stations …".
- **Essential Utility**: "a development that provides infrastructure which forms a necessary part of a principal utility." Examples: "electrical power transformers, pumping stations …".
- **Office**: "a development where the main activity is to provide professional, management," "administrative, consulting, or financial services." Examples include "employment or call centres".

### 2.2 Rule for uses that are not listed (s. 7.20, General Rules of Interpretation)

- **3.3.1:** "the typical examples that may be listed in the definitions are not intended to be exclusive or restrictive."
- **3.3.2:** where an activity does not fit any definition, or fits loosely into two or more, "the Development Planner may deem the purposes or activities to conform to a Use they consider to be the most appropriate." Then: "In this situation, despite any other Section of this Bylaw, the Use is always considered a Discretionary Use."
- **3.3.3:** "The list of Uses within each Zone determines the types of activities allowed within each Zone."

### 2.3 The City's stated position (an official City page, but not a bylaw interpretation)

The Engaged Edmonton page *LDA26-0225 Edmonton Energy & Technology Park AI Data Centre Amendment* is a City page. It records an ASP amendment application received 6 Jul 2026 from Stantec on behalf of Walton Global Investments, with engagement from 28 Sep to 25 Oct 2026. It states:

- In the Petrochemical Precinct (EETC zone), "an AI Data Centre would be considered a heavy industrial use", i.e. "Major Industrial under Edmonton Zoning Bylaw 20001", and is "currently permitted within the Petrochemical Precinct".
- In the Medium Industrial Precinct (EETIM), a large-scale AI data centre "is not contemplated or allowed". A small-scale data centre "could be considered as a Minor Industrial Use", provided "nuisances are shown to be minimal".
- A power generation facility is a Major Utility and "is a discretionary use in this zone" (EETIM).
- A rezoning and text amendment would still be needed. A Development Permit review is required in all cases.

The applicant's own submission was not read. Figures in it would be applicant claims.

### 2.4 Our reading (INTERPRETATION, needs City confirmation)

1. **The size and nuisance of the data centre decide the use, not the label "data centre".**
   - A hyperscale or AI campus with on-site generation, large cooling plants and noise or emissions beyond the site → **Major Industrial**. The City has said this for EETC.
   - A small, enclosed facility with minimal nuisance → **Minor Industrial**.
   - A carrier or telecom node may arguably fit **Minor Utility** ("switching centres, telecommunications centres, wire centres").
   - Office covers server rooms that are ancillary to an office, not a data centre as the principal use.
2. **The data centre is likely to be a "deemed" use, so it would be Discretionary.** No definition names data centres, and the activity fits loosely into Minor Industrial, Major Industrial and Minor Utility. A data centre is therefore a plausible case for s. 7.20(3.3.2). If the Development Planner deems it a use, it "is always considered a Discretionary Use" wherever that use is listed. The tool should label every match **"Permitted or Discretionary, per City determination"** rather than "Permitted".
3. **Edmonton South uses its own definitions.** These definitions apply in Edmonton South zones only (s. 7.70(2.4)). Its "Information Service" "includes data processing" (s. 3.60, 4.1.84). That is the closest explicit match anywhere in Bylaw 20001. In ILES and IBES it sits in the first use list.
   - The second list holds "Sign", and s. 3.60(6.2) says a Sign "Shall be considered a Discretionary Use in all Edmonton South Special Area Zones".
   - So the first list is very likely Permitted and the second Discretionary. This is inferred, because the list headings are not rendered.
4. **Permitted status in the standard zones is inferred.** The online pages show each zone's uses under category headings (2.x) and then "additional regulations for listed uses" (3.x). No separate Discretionary list appears.
   - s. 7.110(3.2) makes a development that "is a Permitted Use" a Permitted Development.
   - s. 7.70(3.3) requires Special Area zones to have "Permitted and/or Discretionary Use lists".
   - We infer that a use listed in a standard zone is Permitted and that discretion arises through variances (s. 7.100(4.5)) or deemed uses (s. 7.20(3.3.2)). The official PDF and the City's Land Use Matrix that would confirm the headings were blocked, so this is **UNVERIFIED**.

---

## 3. Citywide regulations that apply in every zone

### 3.1 Parking, access and loading (s. 5.80, *Parking, Access, Site Circulation, and Bike Parking*)

**Vehicle parking**
- **No minimum vehicle parking** for any use. Subsection 6.6 gives a "deemed minimum" used only to size barrier-free stalls. It "does not create a minimum requirement for any other parking spaces."
- **Maximum** for non-residential uses: 1 space per 50.0 m², but only within 200 m of a Mass Transit Station or within Appendix I (Table 6.3.2). No industrial-zone maximum otherwise.
- **Stall sizes:** standard 5.5 × 2.6 m (2.7 m with an obstruction on one side, 3.0 m on both sides).
- **Aisle widths:** 7.0 m for 90° parking, 5.5 m for 60°, 3.6 m for 45° and parallel (Table 5.5).

**Loading (Table 7.2)**
- Non-residential floor area < 2,500 m²: 0 spaces.
- 2,500–7,500 m²: 1 space.
- > 7,500 m²: 2 spaces.
- Each space 9.0 m × 3.0 m with 4.0 m clearance (7.1.4.1), "wholly located on-Site".

**Bicycle parking:** Table 8.5 lists no industrial uses, so there is no bicycle minimum for Minor or Major Industrial. A data centre classified as Office would follow the Commercial rates (UNVERIFIED).

### 3.2 Landscaping (s. 5.60)

**General requirements**
- All open space, including setbacks, must be landscaped (2.2). The exceptions are pathways, parking and circulation areas, and permeable substitutes (2.2.1–2.2.3).
- **Setbacks:** 1 tree and 2 shrubs per 30.0 m² of total ground-level setback area (4.1.1). There is no minimum soft-landscaped percentage for non-residential sites; the 30 % and 25 % minimums apply to residential sites (3.2–3.3).
- Exempt from 4.1: AG, AJ, FD, PS, PSN and River Valley Special Area zones.

**Parking-lot landscaping**
- Islands: 1 tree and 2 shrubs up to 11 m²; 2 trees and 4 shrubs from 11 to 22 m²; plus 1 tree and 2 shrubs for each further 22 m² (4.5).
- Perimeter planting is required along surface lots (4.6), except where the lot abuts IM or IH sites (4.6.1).

**Screening and buffers**
- Storage, waste and outdoor service areas abutting non-industrial zones, streets or LRT: Landscape Buffer at least 1.8 m high (4.7).
- Industrial zones on listed corridors (Anthony Henday, Yellowhead, Whitemud and others): buffer screening of outdoor storage (4.3).
- Additional landscaping may be required to mitigate a Nuisance (5.1).

**Plant sizes, timing and security**
- Deciduous trees 50 mm caliper; coniferous trees 2.0 m (6.1).
- Install within 12 months; maintain for 24 months (9.2, 10.9).
- Landscape security is required for non-residential development (10.1).

### 3.3 Not extracted (UNVERIFIED)

- s. 5.120 Site Performance Standards (noise, light, vibration). Relevant to the Minor/Major Industrial threshold.
- s. 5.70 Grade and height measurement.
- s. 7.100(6) height variance rules (cited by IH 4.2).
- s. 7.140 risk/environmental assessment content.
- Overlays (e.g. North Saskatchewan River Valley and Ravine System Protection Overlay).

---

## 4. Direct Control and Special Area zones

### 4.1 Direct Control (Part 4; s. 7.80)

**Purpose:** "To provide direct control of development on a Site or within a specified area". s. 7.80(2.1) allows it only where a standard zone is inadequate, for example:
- development that exceeds the closest standard zone;
- tailored rules to limit conflicts with neighbours;
- unique site features or operating rules;
- environmental areas named in a Statutory Plan;
- historic resources.

**How a Direct Control provision applies:**
- Each DC provision is its own small bylaw, with its own uses, regulations and appended site plan or elevations (7.80(4.1)).
- All Zoning Bylaw regulations apply unless the DC provision excludes or modifies them (5.1).
- Development in a DC zone counts as Permitted Development if it complies (7.110(3.2)).
- **Legacy provisions:** DC1 provisions (Direct Development Control) and DC2 provisions (Site Specific Development Control) were mostly carried over from Bylaw 12800. s. 7.20(4.1) governs how pre-2024 DC zones are read, using 12800 definitions; that clause was not extracted (UNVERIFIED). Newer provisions appear as "DC".

**In the student's data**, 1,068 of 11,549 features (9.2 %) are Direct Control:

| Code | Features |
|---|---|
| DC2 | 700 |
| DC1 | 275 |
| DC | 92 |
| DC/INDES | 1 |

Each feature carries `agreement_no` (the DC number), `dc2_sub_area` (Area A/1/2…) and a `url` to the provision's page (e.g. `zoningbylaw.edmonton.ca/dc2-289`).

**Why DC zones can't be computed generically:** the uses and envelope differ for each provision, and often for each sub-area. Values are written in prose or in appended plans rather than in a standard table. Many use pre-2024 use names (e.g. "General Industrial Uses" under 12800), which need translating.

### 4.2 Special Areas (Part 3; s. 7.70)

**What they are:** zones written for a single Special Area (Blatchford, EETP, Ellerslie Industrial, Edmonton South, Downtown, River Valley, Griesbach and others). Each has its own use lists, tables and sometimes its own definitions; Edmonton South keeps Leduc-County-style use names (7.70(2.4)).

**Why they can be computed but must be handled one by one:** they are finite and tabular, but each needs its own extraction.
- **Blatchford:** amended often (Charter Bylaws 20560, 20756, 20794). Its zones are residential, park or mixed, so a data centre is likely NL (UNVERIFIED). The Blatchford district-energy context belongs to a separate note.
- **Legacy codes:** some codes in the data link to "legacy" instead of a bylaw page: NSRVES, TC-MU, CPMU, RCRL, RCRM, CPT, A7, RTCR, and BMR (blank URL). These need checking against the City.

### 4.3 PROPOSAL for tool handling (not City guidance)

1. **Three tiers of confidence:**
   - **Tier A:** standard zones with a fully extracted table (BE, IH, PU, UI, FD and others), computed automatically.
   - **Tier B:** special-area zones with tables (EIB, EIM, EETIM, EETM, EETL, ILES, IBES), computed with a "special area" flag.
   - **Tier C:** DC1, DC2, DC and DC/IND. Show "site-specific: read provision", link the `url` from the data, and show **no** envelope numbers.
2. **For Tier C, offer a "rezoning pathway" result instead of a buildable volume.** The nearest standard zone could stand in as a *scenario*, e.g. "if rezoned to BE / IM / IH", labelled as hypothetical. This fits the student's trade-off framing: an unzoned or DC site may offer more reciprocity, but at the cost of rezoning time and risk.
3. **Use a small manual lookup for frequent industrial DC2s.** Extract the DC provisions that intersect industrial areas or candidate sites one at a time, each with its bylaw number and date, and store them as hand-checked records.
4. **Always attach these labels to a result:**
   - the "deemed use → Discretionary" caveat (s. 7.20(3.3.2));
   - the City's EETP statement (Major Industrial for AI-scale facilities);
   - "verify with City (311 / Development Planner)" on any data-centre result.

---

## 5. Student's open-data zoning layer, confirmed from the file

**File:** `Zoning_Bylaw_Geographical_Data_20261014.csv`, the City of Edmonton Open Data export titled "Zoning Bylaw Geographical Data". Its map view (data.edmonton.ca/d/ruwn-htv8) describes it as "To visually display all property zone codes for the City of Edmonton". The portal's metadata page could not be read; it showed only the site chrome. A copy also sits at `outputs/data/edmonton_zoning.geojson`, with the same 11,549 features and properties `zone`, `description`, `url`.

| Item | Value |
|---|---|
| Features | 11,549 |
| `date_ext` | 2026/10/12 on every row |
| Fields | `id`, `zoning`, `description`, `agreement_no`, `dc2_sub_area`, `date_ext`, `url`, `geometry_multipolygon` |
| Distinct `zoning` strings | 153 (95 base codes once modifiers are stripped) |

**The `zoning` field carries zone modifiers.** Examples: `RM h16`, `RSM h12`, `RL h65`, `MU h16 f3.5 cf`. In MU, height = "The number (in metres) following the Modifier 'h'" (s. 2.80, 4.1.1) and FAR = "The number following the Modifier 'f'" (4.1.3). `cf` is the Commercial Frontage Modifier (3.1). **Parse the first token as the zone and the rest as modifiers.**

**Features by base code:**

| Group | Codes (feature count) |
|---|---|
| Residential | RSF 1921, RM 1231, RS 1148, RSM 740, RL 89, RR 44 |
| Parks and open space | PSN 901, PS 708, A 325, NA 100 |
| Utility / urban services | PU 888, UF 209, UI 11, AJ 32 |
| Direct Control | DC2 700, DC1 275, DC 92, DC/INDES 1 |
| Employment / industrial | BE 476, IM 213, IH 43 |
| Mixed use / commercial | MU 345, CN 289, CG 206, CB 74, MUN 17 |
| Agricultural / future | FD 108, AG 102 |
| Special-area industrial | EIB 19, EIM 7, ECB 1, EETC 6, EETM 4, EETIM 4, EETL 3, EETR 1, ILES 3, IBES 1 |
| Other special-area codes | Remainder, each ≤ 22 features |

**Candidate geography for a data centre:**
- **Standard zones:** BE + IM + IH = 732 features.
- **Plus special-area industrial:** EIB, EIM, EETC, EETIM, EETM, EETL, ILES, IBES = 47 features.

---

## 6. Sources (all accessed 14 Oct 2026)

1. City of Edmonton, Zoning Bylaw 20001, online consolidation, home page ("Passed by Council on October 23, 2023, effective January 1, 2024"). https://zoningbylaw.edmonton.ca/
2. Zoning Bylaw 20001, s. 8.10 Use Definitions. https://zoningbylaw.edmonton.ca/part-8-definitions/810-use-definitions
3. Use definition pages: Minor Industrial https://zoningbylaw.edmonton.ca/minor-industrial ; Major Industrial https://zoningbylaw.edmonton.ca/major-industrial ; Minor Utility https://zoningbylaw.edmonton.ca/minor-utility ; Major Utility https://zoningbylaw.edmonton.ca/major-utility
4. s. 8.20 General Definitions. https://zoningbylaw.edmonton.ca/part-8-definitions/820-general-definitions
5. s. 7.20 General Rules of Interpretation. https://zoningbylaw.edmonton.ca/part-7-administrative-and-interpretive-clauses/general/720-general-rules-interpretation
6. Part 7, Administrative and Interpretive Regulations (ss. 7.30, 7.70, 7.80, 7.100, 7.110). https://zoningbylaw.edmonton.ca/part-7-administrative-and-interpretive-regulations
7. Bylaw PDF / print view (Parts 1–2 to s. 2.100; truncated). https://zoningbylaw.edmonton.ca/bylaw-pdf-print
8. s. 2.120 BE. https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays/industrial-zones/2120-be-business-employment-zone
9. s. 2.130 IM. https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays/industrial-zones/2130-im-medium-industrial-zone (also https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays/industrial/2120-im-medium-industrial-zone)
10. s. 2.140 IH. https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays/industrial-zones/2140-ih-heavy-industrial-zone
11. s. 2.100 CG. https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays/commercial-zones/2100-cg-general-commercial-zone ; s. 2.110 CB. https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays/commercial-zones/2110-cb-business-commercial-zone
12. s. 2.80 MU. https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays/mixed-use-zones/280-mu-mixed-use-zone
13. Open-space and urban-services zones: s. 2.150 A https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays/open-space-and-urban-services-zones/2150-river-valley-zone ; 2.160 NA https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays/open-space-and-urban-services-zones/2160-na-natural-areas-zone ; 2.170 PSN https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays/open-space-and-urban-services-zones/2170-psn-neighbourhood-parks-and-services-zone ; 2.180 PS https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays/open-space-and-urban-services-zones/2180-ps-parks-and-services-zone ; 2.190 PU https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays/open-space-and-urban-services-zones/2190-pu-public-utility-zone ; 2.200 UF https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays/open-space-and-urban-services-zones/2200-uf-urban-facilities-zone ; 2.210 UI https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays/open-space-and-urban-services-zones/2210-ui-urban-institution-zone ; 2.220 AJ https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays/open-space-and-urban-services-zones/2220-aj-alternative-jurisdiction-zone
14. Agricultural zones: s. 2.230 AG https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays/agricultural-zones/2230-ag-agriculture-zone ; 2.240 FD https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays/agricultural-zones/2240-fd-future-urban-development-zone
15. s. 5.60 Landscaping. https://zoningbylaw.edmonton.ca/part-5-general-development-regulations/560-landscaping
16. s. 5.80 Parking, Access, Site Circulation, and Bike Parking. https://zoningbylaw.edmonton.ca/part-5-general-development-regulations/580-parking-access-site-circulation-and-bike-parking
17. Part 3 Special Area Zones (index; truncated). https://zoningbylaw.edmonton.ca/part-3-special-area-zones
18. EETP: s. 3.50 https://zoningbylaw.edmonton.ca/part-3-special-area-zones/edmonton-energy-and-technology-park-special-area/350-edmonton-energy-and-technology-park-special-area ; 3.52 EETC https://zoningbylaw.edmonton.ca/part-3-special-area-zones/edmonton-energy-and-technology-park-special-area/352-eetc-edmonton-energy-and-technology-park-chemical-cluster-zone ; 3.53 EETL https://zoningbylaw.edmonton.ca/part-3-special-area-zones/edmonton-energy-and-technology-park-special-area/353-eetl-edmonton-energy-and-technology-park-logistics-zone ; 3.54 EETM https://zoningbylaw.edmonton.ca/part-3-special-area-zones/edmonton-energy-and-technology-park-special-area/354-eetm-edmonton-energy-and-technology-park-manufacturing-zone ; 3.55 EETR https://zoningbylaw.edmonton.ca/part-3-special-area-zones/edmonton-energy-and-technology-park-special-area/355-eetr-edmonton-energy-and-technology-park-industrial-reserve-zone ; 3.56 EETIM https://zoningbylaw.edmonton.ca/part-3-special-area-zones/edmonton-energy-and-technology-park-special-area/356-eetim-edmonton-energy-and-technology-park-medium-industrial-zone
19. Ellerslie Industrial: 3.181 EIB https://zoningbylaw.edmonton.ca/part-3-special-area-zones/ellerslie-industrial-special-area/3181-eib-ellerslie-industrial-business-zone ; 3.182 EIM https://zoningbylaw.edmonton.ca/part-3-special-area-zones/ellerslie-industrial-special-area/3182-eim-ellerslie-medium-industrial-zone ; 3.183 ECB https://zoningbylaw.edmonton.ca/part-3-special-area-zones/ellerslie-industrial-special-area/3183-ecb-ellerslie-business-commercial-zone
20. Edmonton South: s. 3.60 (definitions) https://zoningbylaw.edmonton.ca/part-3-special-area-zones/edmonton-south-special-area/360-edmonton-south-special-area ; 3.65 IBES https://zoningbylaw.edmonton.ca/part-3-special-area-zones/edmonton-south-special-area/365-ibes-industrial-business-edmonton-south-zone ; 3.66 ILES https://zoningbylaw.edmonton.ca/part-3-special-area-zones/edmonton-south-special-area/366-iles-industrial-light-edmonton-south-zone ; 3.68 DC/IND https://zoningbylaw.edmonton.ca/part-3-special-area-zones/edmonton-south-special-area/368-dcind-direct-controlindustrial-district-edmonton-south-zone
21. Amendments list. https://zoningbylaw.edmonton.ca/amendments
22. City of Edmonton, Engaged Edmonton: "LDA26-0225 Edmonton Energy & Technology Park AI Data Centre Amendment" (application received 6 Jul 2026; engagement 28 Sep – 25 Oct 2026). https://engaged.edmonton.ca/eetpdatacentre
23. City of Edmonton, "Zoning Bylaw" (At-a-Glance) page (only link text read). https://www.edmonton.ca/city_government/bylaws/zoning-bylaw
24. City of Edmonton Open Data, "Zoning Bylaw Geographical Data: Map View". https://data.edmonton.ca/d/ruwn-htv8 ; student export `Zoning_Bylaw_Geographical_Data_20261014.csv` (date_ext 2026/10/12).

**Blocked or not read:**
- Bylaw20001.pdf: https://www.edmonton.ca:443/sites/default/files/public-files/assets/Bylaws/Bylaw20001.pdf (robots.txt; proxy 403).
- Land Use & Zoning Matrix: https://www.edmonton.ca/sites/default/files/public-files/Edmonton-Zoning-Bylaw-Land-Use-and-Zoning-Matrix.pdf (robots.txt).
- Zoning Bylaw Guide: https://www.edmonton.ca/sites/default/files/public-files/Zoning-Bylaw-Guide.pdf (robots.txt).
- Data Centre Development: https://www.edmonton.ca/business_economy/economic_investment/data-centre-development (robots.txt).
- Bylaw 21121: https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=255692 (fetch error).

---

## 7. Gaps (all UNVERIFIED until closed)

1. **IM envelope.** Table 4.1 (height, FAR, setbacks) does not render online. It is needed from the official PDF or the City. IM is the most common industrial zone after BE.
2. **Use-list headings.** (Standard zones now RESOLVED by the Land Use Matrix, §8.) Whether standard-zone lists are "Permitted" could not be confirmed, and neither could the 2.x/3.x Permitted/Discretionary split in special areas. Source: the official PDF or the City's Land Use Matrix (both blocked).
3. **Use lists not rendered:** IH, CG, CB, EETIM, EETM, EETL. EETC height/FAR also not rendered.
4. **City classification of a data centre outside EETP.** There is no formal interpretation. The EETP engagement statement is the only City statement found. The City's "Data Centre Development" page was blocked and may contain more. Ask the City (Development Planner) whether it applies s. 7.20(3.3.2) to data centres, i.e. whether they are always Discretionary.
5. **Not extracted:** s. 5.120 performance standards, s. 5.70 height measurement, s. 7.100(6), overlays, Main Streets rules.
6. **Direct Control.** No DC1/DC2/DC provision was read. The legacy-code features (NSRVES, TC-MU, CPMU, RCRL, RCRM, CPT, A7, RTCR, BMR) also need checking.
7. **Consolidation date.** The online bylaw gives none, and the amendment dates were not shown. Record "as viewed 14 Oct 2026" plus open-data date_ext 2026/10/12.
8. **Applicant documents for LDA26-0225** were not read. Anything taken from them must be labelled an applicant/operator claim.

---

## 8. Confirmed from the City's Land Use & Zoning Matrix (October 2026), supplied by J.B. 14 Oct

Source: City of Edmonton, *Zoning Bylaw 20001 Land Use & Zoning Matrix: Uses in Standard Zones*, October 2026 (PDF dated 2 Oct 2026), p. 6. Saved locally as data/raw/edm/land_use_zoning_matrix.pdf. The City states it is "created for convenience only"; the bylaw governs. Read from the page image (colour-coded cells), not from extracted text.

Codes: 1 = Permitted; 1A = Permitted with use-specific regulations or limitations; 2 = Discretionary; 2A = Discretionary with use-specific regulations; blank = not a Permitted or Discretionary use in the zone.

| Use (candidate for a data centre) | BE | IM | IH | UI | PU | A | FD | Residential, MU, MUN, CN, CG, CB |
|---|---|---|---|---|---|---|---|---|
| Major Industrial | – | 1A | 1A | – | – | – | – | – |
| Minor Industrial | 1A | 1A | 1A | 1A | – | – | 2A | – |
| Minor Utility | 1 | 1 | 1 | 1 | 1 | 2 | 2 | – |
| Major Utility | – | – | 1 | – | 1A | – | – | – |
| Office (only relevant if the City read a data centre as office — UNVERIFIED interpretation) | 1 | 1A | – | 1 | – | – | – | 1A in RS, RSF, RSM, RM, RL, MUN, CN; 1 in MU, CG, CB |

What this settles:
- The matrix confirms the standard-zone use lists are Permitted (1/1A), resolving gap 2 for standard zones. The special-area Permitted/Discretionary split is still unconfirmed.
- Major Industrial in IM carries limitations (1A); this matches the s. 7.20 note in this file that Major Industrial in IM applies only where it existed on 1 Jan 2024 — check the IM zone text for the exact wording.
- No standard residential, mixed-use or commercial zone lists any industrial or utility use. A data centre unit in a mixed-use or commercial building would rely on the Office path (an interpretation the City has not made) or a rezoning or Direct Control.
- s. 7.20(3.3.2) still applies: where the Development Planner finds a proposal fits no definition well, it is treated as Discretionary regardless of this table.

## 9. City "Data Centre Development" page (screenshot supplied by J.B., viewed 14 Oct 2026)

- Current application: an amendment to the Edmonton Energy Technology Park (EETP) Area Structure Plan "to allow for data centres and power generation facilities to be included as permitted uses in the Medium Industrial Precinct". Public feedback open 28 Sep – 25 Oct 2026 on Engaged Edmonton.
- The page links the Alberta government's list of major proposed projects, including data centres.
- The section "How Are Data Centre Decisions Made?" was cut off in the screenshot and has not been read. Needed: a full save of the page (or a screenshot of that section).

---

## 10. Second pass (14 Oct)

All pages fetched 14 Oct 2026. Every URL below came from a web search result. The fetch tool summarises pages and caps quotes at about 125 characters, so some clauses below are **paraphrased** (marked "paraphrase"). Check wording against the official PDF before quoting in thesis text. Bylaw 12800 pages (webdocs.edmonton.ca) are the **repealed** pre-2024 bylaw; they are cited only as context or where s. 7.20(4.1) makes them govern legacy Direct Control zones.

### 10.1 s. 5.120 Site Performance Standards (gap 5, item 1)

Source: https://zoningbylaw.edmonton.ca/part-5-general-development-regulations/5120-site-performance-standards — SOURCED.

**Main finding: s. 5.120 contains no numeric limits for noise, vibration, odour, emissions, dust or heat, and does not mention generators.** It is a qualitative, permit-condition section. It does not vary by zone; it varies by type of development. Structure as rendered:

- **Subsection 1 (Non-Industrial development only).** 1.1: "Non-Industrial development must comply with the following:"
  - 1.1.1 exterior finishing materials to the Development Planner's satisfaction (paraphrase).
  - 1.1.2: "All mechanical equipment, except for Solar Collectors, must be concealed by screening" or integrated into the building, in a way compatible with its architectural character (second half paraphrase).
  - 1.1.3 screening exemption for air conditioners/heat pumps serving small residential buildings (paraphrase).
  - 1.1.4: "Venting systems for Parkades must be oriented away from Abutting Sites" (and from amenity and pedestrian areas, paraphrase).
  - 1.1.5 no fences of hazardous materials such as barbed wire (paraphrase).
- **Subsection 2 (Nuisance mitigation; applies to any non-Residential Use or Home Based Business).** 2.1: where a use "may create a Nuisance", determined at Development Permit application, mitigation must be provided to the Development Planner's satisfaction (paraphrase). Listed measures: 2.1.1 screening (walls, berms); 2.1.2 lighting controls (e.g. full cut-off); 2.1.3 "structural soundproofing or limiting the use of outdoor speakers and amplification systems"; 2.1.4 ventilation systems or filters treating emissions before venting; 2.1.5 other similar measures. 2.2: the Development Planner may impose these as permit conditions (paraphrase).
- **Subsection 3 (outdoor lighting).** 3.1.1 limit glare and direct light away from surrounding Sites; 3.1.2 generally directed downward; 3.1.3 adequate lighting at entrances, parking, Pathways; 3.1.4: "not interfere with the function of traffic control devices" (others paraphrase).
- Subsections 4–6: residential waste areas, vehicle parking in residential zones, drainage easements. Not relevant.

**"Nuisance"** (s. 8.20): "Nuisance means the external impact caused by an activity that is reasonably likely to interfere with the use" "and enjoyment of an individual's property" … "Typical examples include emission of noise, smoke, dust, vapour, odour, heat, light, fumes" "or unsightly or unsafe conditions, or use of toxic or hazardous materials." Source: https://zoningbylaw.edmonton.ca/part-8-definitions/820-general-definitions — SOURCED.

**What this means for a data centre's generators and heat-rejection plant (INTERPRETATION):**
- In industrial zones (BE, IM, IH, EET*, EI*), s. 5.120(1.1.2) screening does **not** apply because subsection 1 is limited to "Non-Industrial development". Whether a data centre counts as Industrial development turns on the use classification (§2.4). If classed as Office or a utility in a non-industrial zone, 1.1.2 would apply. UNVERIFIED.
- Zone-level screening rules fill this gap in some zones: BE 5.2 (mechanical/electrical equipment screened), EIB 6.2 (cooling towers screened), IBES 7.25 (rooftop equipment screened), EETM 6.2.4–6.2.5 (concealed). **IM and IH zone pages do not mention mechanical equipment** (IM section 5 checked this pass).
- s. 5.120(2) applies everywhere to a non-Residential use. The bylaw gives no decibel threshold; noise conditions are set case by case. The Minor/Major Industrial threshold (§2.1) is itself framed by Nuisance "beyond the boundaries of the Site".
- PU 5.7 exempts Major Utility from s. 5.120 subsection 1 (from §1 above), consistent with subsection 1 being the non-industrial rule.
- **Numeric noise limits live outside Bylaw 20001.** The City noise page (https://edmonton.ca/city_government/bylaws/noise) names a "City of Edmonton Noise Bylaw" and the "Community Standards Bylaw" but gives **no bylaw number and no decibel limits** on the page. Search results point to Community Standards Bylaw 14600 (https://edmonton.ca/sites/default/files/public-files/C14600.pdf) — **not fetched; UNVERIFIED** whether it holds numeric limits for stationary equipment. Provincial emission rules for generators (Alberta EPEA approvals, AUC Rule 012 noise for power plants) were **not researched** and are out of scope of the zoning bylaw. UNVERIFIED.
- Risk / environmental assessment: s. 5.120 has none. The zone pages (IM 5.5, IH 5.3) let the Development Planner require a Risk Assessment, Environmental Impact Assessment or Environmental Assessment Information "in compliance with Section 7.140". s. 7.140 not read.

### 10.2 s. 5.70 Measuring Height and Grade; rooftop equipment (gap 5, item 2)

Source: https://zoningbylaw.edmonton.ca/570-measuring-height-and-grade — SOURCED (mostly paraphrase; verify wording).

**How Height is measured**
- 1.1 hip/gable roof: from Grade to the midpoint between eave end and roof top. "The Height of a building with a hip or gable roof is measured from Grade" (rest paraphrase).
- 1.3 mansard/gambrel: Grade to midpoint between deck line and roof top.
- **1.4 flat roof: Grade to the midpoint of the highest parapet, between top of roof deck and top of parapet.** This is the case for a typical data hall.
- 1.5 other roof forms: Development Planner selects a method.
- 1.6 platform structures: lowest adjacent ground to top of structure.

**Exemptions (the key point for rooftop plant)**
- 1.7 a roof may extend up to **1.7 m** above the zone maximum Height.
- 1.8 a flat-roof parapet may extend up to **0.4 m** above the zone maximum (prevails over 1.7).
- **1.9: no Height limit in any Zone** for: chimney stacks (free-standing or roof-mounted); steeples, domes, etc.; elevator housing and roof stairways; "water or other tanks"; **"ventilating equipment, plumbing stacks, and mechanical penthouse"** (1.9.5); skylights; fire walls; antenna structures and satellite dishes; masts, flagpoles; other similar architectural features.
- 1.10 rooftop access enclosures +3.0 m in residential zones ≤ 12.0 m (not relevant).
- **Not in s. 5.70:** any roof-edge setback, maximum percentage of roof area, or maximum projection height for exempt equipment. So rooftop chillers, dry coolers and exhaust stacks appear **not to count toward Height and have no stated limit** (INTERPRETATION; whether a dry cooler or condenser array is "ventilating equipment" or a "mechanical penthouse" is the Development Planner's call — UNVERIFIED).
- Related: s. 5.10(12.1) "Rooftop mounted Solar Collectors may project a maximum of 1.5 m in Height" (read via the Part 5 index page, https://zoningbylaw.edmonton.ca/part-5-general-development-regulations). Context of that clause (above roof or above Height) not checked. UNVERIFIED.

**Grade (2.1–2.4):** Development Planner picks the method that best ensures compatibility; default 2.1.1 averages pre-construction elevations at the Site corners. 2.2: an alternative method may be used, but the permit "must be a Discretionary Development" (paraphrase). 2.3 grading plan required for new construction.

**For the tool:** model Height to top of parapet midpoint (flat roof), allow +0.4 m parapet, and treat rooftop mechanical as exempt (flag "per s. 5.70(1.9), Development Planner discretion"). Zone-level screening rules (§10.1) still apply.

### 10.3 IM Medium Industrial (s. 2.130) (gap 1, item 3)

Source: https://zoningbylaw.edmonton.ca/part-2-standard-zones-and-overlays/industrial-zones/2130-im-medium-industrial-zone — re-fetched.

**Use list (Section 2) — now rendered, SOURCED:**
- Industrial: 2.1 Crematorium; 2.2 Indoor Self Storage; **2.3 "Major Industrial, limited to those existing as of January 1, 2024"**; **2.4 Minor Industrial**; 2.5 Natural Resource Development.
- Commercial: 2.6 Custom Manufacturing; 2.7 Indoor Sales and Service, limited to 2.7.1 those existing as of 1 Jan 2024 and 2.7.2 animal hospitals and shelters; **2.8 Office**; 2.9 Outdoor Sales and Service; 2.10 Vehicle Support Service.
- Community: 2.11 Special Event. Basic Service: 2.12 Emergency Service; **2.13 Minor Utility**; 2.14 Recycling Drop-off Centre; 2.15 Transit Facility. Agricultural: 2.16 Urban Agriculture. Signs: 2.17–2.22.
- **Major Utility is not listed in IM** (matches the Matrix, §8).

**Use-specific limits:**
- **Major Industrial:** the only limit is in 2.3 itself. Section 3 has no Major Industrial clause. s. 7.20(1.8.11): a Use "existing as of January 1, 2024" means it "is existing with a valid Development Permit as of January 1, 2024." So **a new data centre classed as Major Industrial is not available in IM**; it needs IH, EETC, or rezoning/DC. SOURCED (interpretation of consequence is ours).
- **Minor Industrial (3.2):** 3.2.1 indoor display, office, technical or administrative support areas ≤ 33 % of the Minor Industrial floor area (paraphrase); 3.2.1.1 cap lifted where "more than 50% of the Site area is used for outdoor industrial activities"; 3.2.2–3.2.2.1 temporary employee sleeping accommodation as Accessory, not a permanent dwelling.
- Purpose statement: "Any Nuisance conditions associated with such developments are minimal."
- Section 5: 5.2 screening of storage/waste/service areas (with IH/IM exceptions); 5.3: "The maximum Height of screening specified in Subsection 5.2 is 3.7 m, except for trees or shrubs."; 5.5 Risk Assessment / EIA / Environmental Assessment Information may be required under s. 7.140. **No mechanical-equipment clause.**

**Table 4.1 (height, FAR, coverage, setbacks): STILL NOT RENDERED.** The page goes from Section 3 directly to 5.1. **UNVERIFIED — needs the official PDF.**
- Context only (repealed bylaw, NOT the in-force value): Bylaw 12800 s. 420.4 IM had max FAR 2.0 (420.4(1)), setback 3.0 m to a public roadway other than a Lane and 6.0 m abutting a Residential Zone (420.4(2)), max Height 18.0 m (420.4(4)), no site-coverage rule shown. Source: https://webdocs.edmonton.ca/zoningbylaw/ZoningBylaw/Part2/Industrial/420_(IM)_Medium_Industrial_Zone.htm. The City's 2023 overview says IM scope "remains similar to the current Medium Industrial zone" (*Overview of the New Zoning Bylaw*, p. 15, https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=168554) but gives **no** IM numbers. Do not put 18.0 m / 2.0 in the tool as IM values until the PDF confirms them.
- Blocked: *New Zoning Bylaw with Rationale* (Appendix 2), https://www.edmonton.ca/sites/default/files/public-files/New-Zoning-Bylaw-with-Rationale.pdf?cb=1701821228 (robots.txt). Student could download this; it likely contains the IM table as proposed (draft, not in-force).

### 10.4 Use lists for IH, CG, CB, EETIM, EETM, EETL; EETC envelope (gap 3, item 4)

**IH (s. 2.140)** — re-fetched; Section 2 **still not rendered** (only the heading "Industrial Uses" appears). Section 3.1 covers Major and Minor Industrial together (33 % office cap, 3.1.1–3.1.1.1; temporary sleeping accommodation, 3.1.2–3.1.2.1); 3.2 Natural Resource Development; 3.3 Signs; **no Major Utility clause**. The City Land Use Matrix (§8) gives Major Industrial 1A, Minor Industrial 1A, Minor Utility 1, Major Utility 1 in IH, and the 2023 City overview (p. 16) says "Major Utilities, Minor Utilities and Natural Resources Developments" are additional permitted uses in IH. Use status therefore SOURCED via Matrix + Council document; exact list wording UNVERIFIED (needs PDF).

**CG (s. 2.100)** — print page (https://zoningbylaw.edmonton.ca/bylaw-pdf-print, offset read) renders only the Section 3 regulations (3.1–3.19). The only Industrial Use regulated is 3.10 Indoor Self Storage; Basic Service uses regulated are Health Care Facilities, Recycling Drop-Off Centres, Transit Facilities. Table 4.1: "4.1.1. Maximum Height 16.0 m"; 4.1.2 Hotels 30.0 m; "4.1.3. Maximum total Floor Area Ratio 3.5"; 4.1.4 Residential FAR 2.0. Combined with the Matrix (§8: no industrial or utility use in CG), **data centre NL** except via the Office path (Office is 1 in CG). Section 2 list wording still UNVERIFIED.

**CB (s. 2.110)** — not re-rendered this pass; the Matrix (§8) already settles it: no industrial or utility use; Office 1. **NL** (except Office path).

**EETIM (s. 3.56), EETM (s. 3.54), EETL (s. 3.53)** — re-fetched; **Sections 2–3 (Permitted/Discretionary lists) still not rendered** on all three. Only heading text ("Commercial Uses") and Section 4 use-specific regulations show:
- EETIM 4.3: "Major Utilities must be greater than or equal to 300.0 m from a municipal boundary." (So Major Utility is listed in EETIM; the City's LDA26-0225 page calls it discretionary, §2.3.) 4.1 Specialty Food Services ≤ 120 m² public space / 100 occupants; 4.2 certain commercial uses on lots abutting Anthony Henday Drive.
- EETM 4.4: Major Utilities "Does not include sanitary landfill Sites or nuclear power facilities"; ≥ 300.0 m from a municipal boundary. 4.1 Commercial Uses only on highway/arterial/service/collector frontages, corner sites, or beside an existing Commercial Use.
- EETL: 4.1 same commercial location rule; no utility or industrial clause rendered.
- **Context only — repealed Bylaw 12800 lists (the zones were carried into 20001 but use names changed; NOT in-force):**
  - EETIM (12800 s. 970.11): Permitted included "General Industrial", "Industrial Logistics", "Industrial Manufacturing", "Minor Impact Utility Services", "Special Industrial Uses"; Discretionary included "Major Impact Utility Services, excluding sanitary landfill Sites or nuclear power facilities"; max Height 18.0 m (variance to 22.0 m for Industrial Manufacturing); FAR 2.0. https://webdocs.edmonton.ca/zoningbylaw/ZoningBylaw/Part2/Special_Areas/970.11_(EETIM)_Special_Area_Edmonton_Energy_and_Technology_Park.htm
  - EETM (12800 s. 970.9): Permitted included "General Industrial Uses", "Industrial Manufacturing", "Minor Impact Utility Services"; Discretionary included "Special Industrial Uses", "Major Impact Utility Services". https://webdocs.edmonton.ca/zoningbylaw/ZoningBylaw/Part2/Special_Areas/970_9_(EETM)_Edmonton_Energy_and_Technology_Park_Manufacturing_Zone.htm
  - EETL (12800 s. 970.8): Permitted included "General Industrial Uses", "Industrial Logistics", "Minor Impact Utility Services", "Special Industrial Uses"; no Major Impact Utility listed. https://webdocs.edmonton.ca/InfraPlan/zoningbylaw/ZoningBylaw/Part2/Special_Areas/970_8_(EETL)_Edmonton_Energy_and_Technology_Park_Logistics_Zone.htm
  - How these map to 20001 names (e.g. General Industrial → Minor Industrial?) is **UNVERIFIED**. The 20001 lists need the PDF.

**EETC (s. 3.52) height/FAR** — re-fetched. Section 5 renders as "5.1. Development must comply with Table 5.1:" with only two rows: 5.1.1 "Minimum Site area" 1.0 ha; 5.1.2 "Minimum Setback where a Lot line Abuts a Street" 3.0 m. 5.2: the Development Planner may require a greater Setback for components that "may interfere with the safety or amenity of developments upon" Abutting Sites, having regard to separation distances required by Alberta Environment and Protected Areas (paraphrase). **No height or FAR row is rendered.** Possible reading: EETC sets **no** maximum height or FAR. UNVERIFIED — the table may be partly unrendered, as on IM; confirm in the PDF.

### 10.5 Direct Control: DC1 and DC2 (gap 6, item 5)

Bylaw 20001 has a single Direct Control tool (s. 7.80, §4.1). The City's 2023 overview (DocumentId=168554, p. 32): "The distinction between DC1 and DC2 is proposed to be removed"; "Existing Direct Control zones will not be rezoned". So DC1/DC2 in the open data are **legacy** zones passed under Bylaw 12800 (or 5996).

**s. 7.20(4) — how legacy DC zones are read (SOURCED,** https://zoningbylaw.edmonton.ca/part-7-administrative-and-interpretive-clauses/general/720-general-rules-interpretation**):**
- 4.1: "For the purpose of any Direct Control Zone passed on or before December 31, 2023:" 4.1.1 listed Uses are interpreted under "Land Use Bylaw 5996 as it appeared on June 13, 2001, or Zoning Bylaw 12800 as it appeared on December 31, 2023, whichever is applicable"; 4.1.2 section references go to the bylaw "that was in effect on the date on which the Direct Control Zone was approved by Council"; 4.1.3 zone/overlay references go to the version "that was in effect on December 31, 2023."
- 4.2: DC zones passed on or after 1 Jan 2024 follow the bylaw in effect at Council approval (sections) and at the permit decision (zones/overlays).
- 4.3: an existing DC zone "must not be interpreted to provide any additional rights than are otherwise contemplated" in it.
- **Consequence for the tool:** a DC2 listing "General Industrial Uses" or "Major Impact Utility Services" must be read with **12800** definitions, not 20001 ones.

**DC1 — Bylaw 12800 s. 710 Direct Development Control Provision** (https://webdocs.edmonton.ca/zoningbylaw/ZoningBylaw/Part2/Direct/710_(DC1)_Direct_Development_Control_Provision.htm; amended Charter Bylaw 19724, 8 Jun 2021):
- 710.1: "The purpose of this Provision is to provide for detailed, sensitive control of the Use" (rest of sentence not captured).
- 710.2: applied only "where specified by an approved Statutory Plan in effect at the time of passage", or "to those historical resources that have been designated by the Minister or by Council".
- 710.3.1 / 710.4.1: Uses and regulations come from the approved Statutory Plan (ARP); 710.4.5: "All regulations in this Bylaw shall apply".
- In short: **plan-driven** (ARP areas, heritage). City webdocs index: "These documents are for individual sites usually associated with Area Re-development (ARP) plans" (https://webdocs.edmonton.ca/zoningbylaw/DC1_Direct_Development_Control_Provisions.htm).

**DC2 — Bylaw 12800 s. 720 Site Specific Development Control Provision** (https://webdocs.edmonton.ca/zoningbylaw/ZoningBylaw/Part2/Direct/720_(DC2)_Site_Specific_Development_Control_Provision.htm):
- 720.1: "to provide for direct control over a specific proposed development" "where any other Zone would be inappropriate or inadequate."
- 720.2.1: only for a specific proposed development where it "exceeds the development provisions of the closest equivalent conventional Zone"; needs regulations so "land Use conflicts with neighbouring properties are minimized"; the Site "has unique characteristics"; or "the ongoing operation of the proposed development requires specific regulations."
- 720.3.1–3.2: applicant-drafted provision with legal description, Use Class Opportunities and Development Regulations; a Site plan is appended and "all development in the Provision shall be in accordance with the Site plan."
- 720.3.3: "All Regulations in the Zoning Bylaw shall apply" unless "specifically excluded or modified".
- In short: **project-driven**, one bylaw per site, often with an appended plan. This confirms the Tier C handling in §4.3.
- Not found: appeal rules for DC zones (s. 7.80 / MGA s. 685(4)) — UNVERIFIED.

### 10.6 Needs the official PDF (Bylaw 20001)

1. **IM Table 4.1** — max Height, FAR, site coverage, all setbacks; any 4.2 variance clause.
2. **IH Section 2** use list wording (status already from Matrix).
3. **CG and CB Section 2** use list wording (status already from Matrix).
4. **EETIM, EETM, EETL Sections 2–3** Permitted and Discretionary lists — the key unknown for EETP (which list holds Minor Industrial / Major Industrial / Major Utility).
5. **EETC Table 5.1** — confirm whether height and FAR are genuinely absent.
6. **Verbatim wording** of s. 5.120 (subsections 1–3) and s. 5.70 (1.4, 1.7–1.9), since this pass read them in paraphrase; plus diagrams for 5.70.
7. s. 5.10(12.1) solar-collector projection, in context.
8. s. 7.140 (Risk Assessment / EIA content) and s. 7.100(6) (height variances).
9. s. 7.80 in full (DC appeal and approval process).

**Other documents for the student to download (blocked or not fetched):**
- *New Zoning Bylaw with Rationale* (Appendix 2, draft): https://www.edmonton.ca/sites/default/files/public-files/New-Zoning-Bylaw-with-Rationale.pdf?cb=1701821228 (robots.txt).
- Community Standards Bylaw 14600 (noise): https://edmonton.ca/sites/default/files/public-files/C14600.pdf (not fetched; check for decibel limits on stationary equipment).

### 10.7 Sources added in this pass (accessed 14 Oct 2026)

25. s. 5.120 Site Performance Standards. https://zoningbylaw.edmonton.ca/part-5-general-development-regulations/5120-site-performance-standards
26. s. 5.70 Measuring Height and Grade. https://zoningbylaw.edmonton.ca/570-measuring-height-and-grade
27. Part 5 index. https://zoningbylaw.edmonton.ca/part-5-general-development-regulations
28. City of Edmonton, *Overview of the New Zoning Bylaw* (Council document, eScribe). https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=168554
29. City of Edmonton, Noise page. https://edmonton.ca/city_government/bylaws/noise
30. Bylaw 12800 (repealed; context and legacy DC interpretation): s. 420 IM https://webdocs.edmonton.ca/zoningbylaw/ZoningBylaw/Part2/Industrial/420_(IM)_Medium_Industrial_Zone.htm ; s. 970.8 EETL, 970.9 EETM, 970.11 EETIM (URLs in §10.4); s. 710 DC1 and s. 720 DC2 (URLs in §10.5); DC1 index https://webdocs.edmonton.ca/zoningbylaw/DC1_Direct_Development_Control_Provisions.htm ; DC2 index https://webdocs.edmonton.ca/InfraPlan/zoningbylaw/ZoningBylaw/Part4/DC2_Site_Specific_Development_Control_Provisions.htm
31. Re-fetched this pass: IM, IH, EETC, EETIM, EETM, EETL, s. 7.20, s. 8.20, bylaw print page (sources 4, 5, 7, 9, 10, 18).
