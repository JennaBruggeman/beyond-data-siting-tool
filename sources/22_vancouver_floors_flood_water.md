# 22 — Vancouver: basement vs ground vs upper floors — flood levels, floor area exclusions, non-potable water

Research date: 2026-10-14. Official sources only (City of Vancouver by-laws, guidelines, council reports, Open Data Portal). Quotes are as returned by the fetch tool from the source documents; quotes are short excerpts, not full clauses. Anything not confirmed in a primary source is marked **UNVERIFIED**.

Note on method: PDFs were read through a web-fetch tool that converts them to text. Where the tool summarised rather than reproduced text, this is said. Before citing in the thesis, J.B. should check each quote against the PDF.

---

## 1. Flood Construction Levels (FCL) and designated floodplain

### 1.1 Governing documents

- **Flood Plain Standards and Requirements** (City of Vancouver Guidelines, F014). Council adopted it on 16 September 2014, effective 1 January 2015, and amended it on 7 March 2023 [S1]. It replaced the earlier "Flood-Proofing Policies" [S2].
- **Vancouver Building By-law**: Division C, Article 1.5.2.11 (permits in designated flood plains, covenants, withholding permits) and Subsection 2.2.9 (flood plain requirements; numbered 2.2.8 in the 2014 amendment) [S2][S3]. Definitions of "designated flood plain" and "flood construction level requirements" are in Division A, Sentence 1.4.1.2.(1) [S2].
  - **UNVERIFIED:** that these article numbers are the same in **VBBL 2025** (By-law 14343). The 2023 sources [S1][S3] cite 2.2.9.x under the 2019 VBBL. Check Book I, Volume 2 [S12] (see download list).
- 2014 council report "Flood Construction Levels" (RTS 10576, report dated 30 May 2014, Committee 9 July 2014) [S2].
- 2023 council report "Rupert and Renfrew Station Area Plan – Updating Still Creek Floodplain…" (RTS 15119, report dated 6 January 2023, Committee 1 February 2023) [S3].

### 1.2 FCL value and basis

- Coastal / Fraser River FCL [S1, s.4.0; S2, Appendix A]: the floor underside or slab top "shall not be lower than 4.6 m Greater Vancouver Regional District datum."
  - **Datum:** the FCL is expressed in **GVRD datum**, not geodetic datum. The F014 footnote describes it as "based on mean sea level" [S1]. This research did not find an official conversion between GVRD datum and CGVD28/CGVD2013 (**UNVERIFIED**). The tool should store "4.6 m (GVRD datum)" and not relabel it as geodetic.
- Basis [S2]: "a sea level rise of 1m for the year 2100", a 1:500-year return period, and 0.6 m freeboard. The report describes the new level as "approximately one meter above the current FCL" (the pre-2015 level).
- The FCL is the same across the City, except at Still Creek [S2]: "The FCL is consistent across the City with the exception of Still Creek where FCLs will remain the same."
- **Wave effect zone (Diagram A2):** may require extra height "as determined by a suitably qualified Professional Engineer" [S1, s.4.0].
- **Still Creek (Diagram B):** the FCL is "the applicable elevation shown on the map" [S1, App. A, Def. 2(b)(i)]. The 2023 update is based on "the 200-year return period flood event that accounts for future (year 2100) climate conditions". The report says "In general, the proposed FCLs are between 0.5 m to 2 m above the adjacent road elevation" and that the new boundary "is approximately twice the size of the current floodplain boundary" [S3]. The site-specific values are only on the map figure (**not extracted**).
- **2024/2025 update to the coastal FCL:** no official source found (**UNVERIFIED / not found**). The most recent changes found are the 2014 coastal update and the 2023 Still Creek update.
- **Also found, not read:** City of Vancouver Coastal Flood Risk Assessment Phase 1 report [S13], which is background to the 2014 FCL.

### 1.3 Where the designated floodplain is

- Coastal [S1, App. A, Def. 1(a)]: lands near the natural boundary of **Burrard Inlet, English Bay, False Creek and the Fraser River**, shaded on Diagram A1, with the wave effect zone on Diagram A2.
- Still Creek [S1, Def. 1(b)]: lands crosshatched on Diagram B.
- No official source in this pass names specific neighbourhoods such as "False Creek Flats" or "Fraser River lands" by name. To tag a parcel, use the open data layer below rather than neighbourhood names.

### 1.4 Rules below the FCL (relevant to a basement data hall)

From the Building By-law, as quoted in F014 [S1] and the 2023 report [S3]:

- **Art. 2.2.9.3(1):** the FCL may be met by structural elevation of the floor, compacted fill, or both [S1].
- **Art. 2.2.9.3(2):** "No person shall install furnaces, electrical switchgear, electrical panels, fire protection systems … below the flood construction level, unless such services are protected from flood damage and accessible for servicing during a flood." [S1][S3]
- **Art. 2.2.9.3(3):** "No person shall store hazardous or toxic substances below the flood construction level." [S1][S3]
  - **UNVERIFIED:** whether battery (UPS) or diesel fuel storage counts as "hazardous or toxic substances" here. The term is not defined in the fetched text.
- **F014 ss. 3.1.1 and 3.3** (industrial): "Main electrical switchgear shall be no lower than the FCL." [S1][S3]
- The 2023 report states: "FCLs define the minimum floor elevation for habitation, business or storage of goods." [S3]
- **Parking exemptions:**
  - Art. 2.2.9.1(1)(c): enclosed parking in multiple dwellings is exempt if there is "an unobstructed non-mechanized means of pedestrian ingress and egress … above the flood construction level" and a posted warning sign.
  - Art. 2.2.9.1(1)(d): exempts "buildings and portions of buildings used as a carport or garage" [S1].
- **"Basement":** F014 does not use the word [S1]. No rule found that bans basements outright. The equipment and storage rules above are what constrain a below-FCL basement.
- **Relaxation and increase:** the Chief Building Official may increase (2.2.9.5) or relax (2.2.9.6) the requirements [S1][S3].

**Implication for the tool (inference, not a source claim):** in a designated floodplain, a basement data hall would put switchgear, panels and fire protection below the FCL. That is prohibited unless they are flood-protected and serviceable during a flood, and *main* switchgear in industrial buildings must be at or above the FCL. Treat this as a constraint flag, not a ban on the basement option.

### 1.5 Open data layer for tagging parcels

- **Name:** "Designated floodplain" — City of Vancouver Open Data Portal [S4]
- **URL:** https://opendata.vancouver.ca/explore/dataset/designated-floodplain/
- **Content:** "This dataset includes the coastal floodplain and Still Creek floodplain within the City of Vancouver." The page also mentions the 2014 coastal flood assessment, the wave effect zone, a 1 m sea level rise to 2100 and 0.6 m freeboard.
- **Coordinate system:** the original data is in UTM 10N NAD83 (EPSG:26910). The page writes "NA83".
- **Not confirmed:** field names, vertical datum, last-modified date and licence. The fetched page did not show them (**UNVERIFIED**). Check the "Information" and "Export" tabs.
- **Not checked:** whether the layer includes the 2023 enlarged Still Creek boundary (**UNVERIFIED**).

---

## 2. Zoning and Development By-law — floor area exclusions

### 2.1 Section 10 (general regulations; header "City of Vancouver May 2026") [S5]

- **10.17.1 (Floor Area Exclusions for Sites in a Designated Flood Plain in an R District):** the Director of Planning "may exclude floors located at or below finished grade with a ceiling height that does not exceed 1.5 m … in order to achieve flood construction levels on sites located in a designated flood plain in an R district."
- **10.18.1 (Zero Emissions Mechanical Equipment in Residential Buildings of 3 Storeys or Less):** the Director of Planning "may exclude up to 2.3 m2 per dwelling unit from the computation of floor area … to accommodate zero emissions mechanical equipment for heating or hot water." This is residential only.
- **10.33.3:** may exclude "any floor area occupied by heat recovery ventilators and connected shafts" (up to 2% of permitted floor area; summarised by the fetch tool).
- **10.16.1:** may exclude "the area occupied by interior commercial kitchen exhaust shafts."
- **10.20.1(b):** where existing utility, recreational or storage areas are below finished grade, at least 20% of that floor area must be kept for those uses (summarised by the fetch tool).
- **Electrical rooms:** "electrical room" does **not** appear in Section 10 [S5].

### 2.2 District schedule clauses — the below-grade vs above-grade distinction

Mechanical exclusions in Vancouver depend on *where* the floor is relative to **base surface**. The district schedules set this, not Section 10. Example: **I-2 District Schedule, s.4.1** (header "June 2026") [S6]:

- **4.1.1:** "Computation of floor area must include all floors of all buildings including accessory buildings, both above and below ground level, measured to the extreme outer limits of the building."
- **4.1.2:** "Computation of floor area must exclude:" …
  - **(c):** floors used for off-street parking and loading, passenger drop-off, bicycle storage, **heating and mechanical equipment**, or similar uses, where the floors are:
    - "(i) at or below base surface, provided that the maximum exclusion for a parking space does not exceed 7.3 m in length, or"
    - "(ii) above base surface and where developed as off-street parking are contained in an accessory building" in the rear yard.
- In other words, heating and mechanical floor space is excluded from floor area **only at or below base surface**. Above base surface, the only exclusion is for parking in a rear-yard accessory building, so above-grade mechanical space counts as floor area.
- **Electrical:** not mentioned in I-2 s.4.1 [S6]. Whether an electrical room falls under "heating and mechanical equipment, or uses which … are similar" is up to the Director of Planning (**UNVERIFIED**; no official interpretation found).
- The same wording appears in a CD-1 example. **CD-1 (520), By-law 10403, s.3.4(c)** excludes floors used for "heating and mechanical equipment … which are at or below base surface" [S7].
- **UNVERIFIED:** that every district schedule (C-3A, M-2, I-3, etc.) uses identical wording. Only I-2 and one CD-1 were checked.

### 2.3 Definitions (Section 2, header "June 2026") [S8]

- **Base Surface:** "The hypothetical surface determined by joining the official established building grades at all corners of the site …"
- **Basement:** "A space between 2 floors, with the lower floor located less than 1.2 m below finished grade and the floor surface of the storey above located not more than 2.0 m above finished grade."
- **Bulk Data Storage:** "The use of a wholly enclosed building for the storage of information on operating data servers."

### 2.4 Directly relevant to the ground-floor option

- **I-2 s.2.2.7:** "Bulk data storage is not permitted at the ground floor, except for entrances." Bulk Data Storage is a *conditional* approval use in I-2 (ss.2.1, 2.2.1, 2.2.7) [S6].
  - **UNVERIFIED:** whether other districts carry the same ground-floor restriction.
- **City bulletin on mechanical room exclusion** (effective 20 January 2021, amended 14 November 2022) [S9]:
  - refers to 10.18 and says "Exclusions cannot exceed the interior area of the mechanical room or rooms" and "The mechanical room cannot include any other uses or empty space e.g. for bulk storage."
  - makes no below-grade or above-grade distinction and does not mention electrical rooms.

---

## 3. VBBL 2025 — non-potable water / alternate water sources

### 3.1 Where the official text is

The Office of the Chief Building Official page [S10] links:

- Book I (General) Volume 1: https://vancouver.ca/files/cov/vbbl-2025-volume-1-v4-01.pdf
- Book I (General) Volume 2: https://vancouver.ca/files/cov/vbbl-2025-volume-2-v3-00.pdf
- Book II (Plumbing) Insert Pages: https://vancouver.ca/files/cov/2025-vbbl-book-II-insert-pages.pdf
  - Book II is the 2020 National Plumbing Code plus these Vancouver insert pages.
- Errata: https://vancouver.ca/files/cov/errata-2025-volume-1-and-2-v4.00.pdf

The Insert Pages title page reads: "By-law 14343, effective September 15, 2025 … as amended by By-law 14488, effective January 1, 2026", "Convenience Copy", "These 'insert pages' are not an official version." [S11]

### 3.2 What could be read (Insert Pages) [S11]

- **Definition (Div. A 1.4.1.2):** "Alternate water source system means a system designed to collect, treat, and use non-potable water from alternate water sources in lieu of potable water, but excludes a system in a building used exclusively for residential occupancy containing no more than 8 principal dwelling units, and excludes the use of rain barrels of up to a cumulative capacity of 500 L."
- **Definitions of greywater and rainwater:**
  - "Greywater means waste water from all sources except blackwater and clear-water waste."
  - "Rainwater means rainfall and other natural precipitation, and includes storm water."
- **Table 1.3.1.2** references "NSF/ANSI 350-2023 Onsite Residential and Commercial Water Reuse Treatment Systems" at **2.7.1.2.(3)**. So Sentence 2.7.1.2.(3) refers to NSF 350 treatment systems, which points to a greywater/reuse pathway. The sentence text itself was **not read**.
- **Summary table rows:**
  - "NON-POTABLE (ALTERNATE) WATER SYSTEMS. Operating permit required for new and existing systems using rainwater or stormwater." "Water quality reporting required every two months."
  - "Residential greywater reuse systems certified to NSF 350 Class R may be installed, and no operating permit or water quality reporting is required."
  - "COOLING TOWERS AND EVAPORATIVE CONDENSERS. Operating permit required for new and existing systems." with Legionella reporting "at seasonal start-up and every month of operation."
- **Article 2.2.11.6.(11):** when a cooling tower is removed or permanently discontinued, "the make-up water line shall be disconnected and capped." No other make-up water rule was found in the readable portion.
- **Articles 2.7.1.1 (General), 2.7.1.2 (Non-Potable Water Sources) and 2.7.1.3 (Non-Potable Water Uses):** only the headings were readable. The fetch tool's text stops at about Article 2.4.4.2, so the Section 2.7 text was **not read**. A direct download of the PDF was refused by the network proxy (403). It was not worked around. → **J.B. to download.**
- **City Guide to 2025 VBBL Updates** (22 September 2025) [S14]:
  - "Greywater is gently used water from showers or bathroom sinks that is reused, for example, to flush toilets."
  - Small-scale greywater reuse systems are newly permitted under the 2025 VBBL (fetch-tool summary).
  - The guide does not mention blackwater or cooling towers.

### 3.3 Earlier state (VBBL 2019, as amended 2023), for context only [S15]

The 2023 council report (RTS 15424, 29 May 2023) quotes the 2019-VBBL text:

- **2.7.1.2(1):** only "rainwater", "clear-water waste", or a combination may be collected.
- **2.7.1.2(2):** prohibits collection from "runoff from a public road", "runoff from an area on which fertilizer is used or stored", "groundwater", "perimeter drainage water", "greywater", and "blackwater".
- **New 2.7.1.3.(5):** "Non-potable water systems shall not be used to supply fixtures in healthcare facilities."
- The report did not list the Table 2.7.1.3 uses.

The 2024 council report (RTS 16455) [S16] adds:

- the By-law "facilitates the use of rainwater for non-potable applications, like toilet flushing";
- groundwater reuse is pending Engineering's Groundwater Management Strategy.

### 3.4 Answers to the specific questions

- **Is greywater a permitted source in non-residential buildings under VBBL 2025?** **UNVERIFIED.** It was prohibited under the 2019 VBBL (2.7.1.2(2)). The 2025 VBBL adds an NSF 350 reference at 2.7.1.2.(3), and the standard's title covers "Residential and Commercial" systems. However, the City summary only says "*Residential* greywater reuse systems … may be installed". The non-residential position must be read from 2.7.1.2.(3).
- **Is blackwater a permitted source?** **UNVERIFIED.** It was prohibited in 2019. No 2025 source read mentions blackwater beyond the definition.
- **Is cooling tower make-up a permitted non-potable use?** **UNVERIFIED.** Table 2.7.1.3 was not read. The 2024 report notes that a private development (Oakridge) treats groundwater for "cooling towers, clothes washers and a vehicle wash facility, and for irrigation" [S16]. That is one project's approach, not a by-law rule.

---

## Table — what the tool can use

| Item | Value / rule | Status | Source |
|---|---|---|---|
| Coastal/Fraser FCL | 4.6 m, GVRD datum | Verified | S1 s.4.0; S2 |
| FCL basis | 1 m SLR to 2100, 1:500 yr, 0.6 m freeboard | Verified | S2; S4 |
| Wave effect zone | FCL + allowance set by P.Eng. | Verified (no number) | S1 s.4.0 |
| Still Creek FCL | Site-specific per Diagram B; generally 0.5–2 m above adjacent road | Verified (range only) | S1; S3 |
| Floodplain parcel tag | Open data "Designated floodplain" (coastal + Still Creek), EPSG:26910 | Verified exists; fields UNVERIFIED | S4 |
| Switchgear, panels, fire protection below FCL | Prohibited unless flood-protected and serviceable during flood (2.2.9.3(2)) | Verified (2019 numbering) | S1; S3 |
| Main switchgear, industrial | Not lower than FCL (F014 s.3.3) | Verified | S1 |
| Hazardous/toxic storage below FCL | Prohibited (2.2.9.3(3)); applies to batteries/fuel? | Rule verified; application UNVERIFIED | S1 |
| VBBL 2025 flood article numbers | 1.5.2.11 / 2.2.9 carried over? | UNVERIFIED | — |
| Mechanical floor area exclusion | Excluded only at or below base surface (I-2 4.1.2(c)(i)) | Verified for I-2 and CD-1(520) | S6; S7 |
| Above-base-surface mechanical | Counts as floor area (no exclusion in 4.1.2) | Verified for I-2 (inference from text) | S6 |
| Electrical rooms in floor area rules | Not named in Sec. 10 or I-2 4.1 | Verified absence; interpretation UNVERIFIED | S5; S6 |
| Bulk Data Storage at ground floor (I-2) | Not permitted except entrances (2.2.7) | Verified | S6 |
| Bulk Data Storage definition | "wholly enclosed building … operating data servers" | Verified | S8 |
| Basement definition | Lower floor < 1.2 m below finished grade; storey above ≤ 2.0 m above | Verified | S8 |
| Rainwater/stormwater non-potable systems | Permitted; operating permit; 2-monthly water quality reporting | Verified | S11 |
| Greywater, non-residential | — | UNVERIFIED (read 2.7.1.2.(3)) | S11 (heading only) |
| Blackwater | — | UNVERIFIED | — |
| Cooling tower make-up from non-potable | — | UNVERIFIED (read Table 2.7.1.3) | — |
| Cooling tower permit | Operating permit + Legionella reporting | Verified | S11 |

---

## Sources

1. City of Vancouver, *Flood Plain Standards and Requirements* (Guideline F014), adopted 16 Sept 2014, amended 7 March 2023. https://guidelines.vancouver.ca/F014.pdf
2. City of Vancouver, Administrative Report "Flood Construction Levels", RTS 10576, 30 May 2014 (Standing Committee on City Finance and Services, 9 July 2014). https://council.vancouver.ca/20140709/documents/cfsc2.pdf
3. City of Vancouver, Report "Rupert and Renfrew Station Area Plan – Updating Still Creek Floodplain and Interim Rezoning Policy", RTS 15119, 6 Jan 2023 (CFSC, 1 Feb 2023). https://council.vancouver.ca/20230201/documents/cfsc2.pdf
4. City of Vancouver Open Data Portal, "Designated floodplain". https://opendata.vancouver.ca/explore/dataset/designated-floodplain/
5. City of Vancouver, Zoning and Development By-law, Section 10 (May 2026). https://bylaws.vancouver.ca/zoning/zoning-by-law-section-10.pdf
6. City of Vancouver, Zoning and Development By-law, I-2 District Schedule (June 2026). https://bylaws.vancouver.ca/zoning/zoning-by-law-district-schedule-I-2.pdf
7. City of Vancouver, CD-1 (520) By-law No. 10403 (2011). https://cd1-bylaws.vancouver.ca/CD-1(520).pdf
8. City of Vancouver, Zoning and Development By-law, Section 2 Definitions (June 2026). https://bylaws.vancouver.ca/zoning/Sec02.pdf
9. City of Vancouver, Bulletin "Administration of Mechanical Room Exclusion for Zero Emissions Equipment" (eff. 20 Jan 2021, amended 14 Nov 2022). https://guidelines.vancouver.ca/bulletins/bulletin-mechanical-exclusion.pdf
10. City of Vancouver, Office of the Chief Building Official (VBBL 2025 links). https://vancouver.ca/your-government/office-of-the-chief-building-official.aspx
11. City of Vancouver, *2025 VBBL Book II: Plumbing Systems — Insert Pages* (By-law 14343 as amended by 14488; convenience copy). https://vancouver.ca/files/cov/2025-vbbl-book-II-insert-pages.pdf
12. City of Vancouver, *VBBL 2025 Book I Volumes 1 and 2*. https://vancouver.ca/files/cov/vbbl-2025-volume-1-v4-01.pdf ; https://vancouver.ca/files/cov/vbbl-2025-volume-2-v3-00.pdf (not read)
13. City of Vancouver, *Coastal Flood Risk Assessment Phase 1 Final Report*. https://vancouver.ca/files/cov/CFRA-Phase-1-Final_Report.pdf (found, not read)
14. City of Vancouver, *Guide to 2025 VBBL Updates* v1.0 (22 Sept 2025). https://vancouver.ca/files/cov/guide-to-2025-vbbl-updates.pdf
15. City of Vancouver, Report "Simplifying Development Permit Requirements and Alleviating Sewer Infrastructure Issues", RTS 15424, 29 May 2023 (Council 13 June 2023). https://council.vancouver.ca/20230613/documents/rr1.pdf
16. City of Vancouver, Report "Rainwater Management to Facilitate New Housing", RTS 16455, 15 Oct 2024 (Council 12 Nov 2024). https://council.vancouver.ca/20241112/documents/r3.pdf

---

## For J.B. to download

1. **VBBL 2025 Book II Insert Pages**, for the full text of Articles 2.7.1.1–2.7.1.3, Sentence 2.7.1.2.(3) and Table 2.7.1.3.
   - The fetch tool's text stopped at about Art. 2.4.4.2.
   - A direct download returned "403 CONNECT tunnel failed" from the network proxy and was not worked around.
   - https://vancouver.ca/files/cov/2025-vbbl-book-II-insert-pages.pdf
2. **VBBL 2025 Book I, Volume 2** (Division C), to confirm the flood plain articles (1.5.2.11, 2.2.9.x) and Division A flood plain diagrams in the 2025 numbering. Not read because of file size.
   - https://vancouver.ca/files/cov/vbbl-2025-volume-2-v3-00.pdf
   - Volume 1: https://vancouver.ca/files/cov/vbbl-2025-volume-1-v4-01.pdf
3. **Errata** to the above: https://vancouver.ca/files/cov/errata-2025-volume-1-and-2-v4.00.pdf
4. **Designated floodplain dataset**, for the export (field names, vertical datum, update date, licence): https://opendata.vancouver.ca/explore/dataset/designated-floodplain/
5. **Flood Plain Standards F014 diagrams** (A1, A2, B), for the map images and Still Creek elevations, which were not in the extracted text: https://guidelines.vancouver.ca/F014.pdf
