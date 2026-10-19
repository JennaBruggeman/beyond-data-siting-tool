# I — Substation locations, Vancouver and Edmonton (newer than CanVec 50K)
Researched 19 Oct 2026. WebSearch/WebFetch only. Nothing downloaded.

## What the tool could show
- Substation points (name, code, voltage where given) near candidate data-centre sites.
- Distance from site to nearest substation, as a grid-connection proxy.

## Source table

| Source | Covers | Date | Licence | Format / how to get | Coords? | URL | Status |
|---|---|---|---|---|---|---|---|
| AESO AIES Map (system operator) | AB lines, substations, generators, planning areas; Edmonton/Wabamun inset with names + IDs (e.g. Poundmaker, Woodcroft, Namao) | "Updated 2026-10-16" | Not an open licence; disclaimer: "is intended only for research purposes" | PDF map, view on aeso.ca | No. Schematic; must digitise. Preprint below says AESO does "not provide precise geospatial coordinates" | https://www.aeso.ca/assets/2026_AIES_Map.pdf | Read. Text extraction jumbled; name-to-ID pairs (e.g. Clover Bar 987S) not confirmed |
| AESO Transmission Capability Map 2025 | Substation bubbles, "searched by either name or facility code"; Excel of capability values | Report 26 Sep 2025; system "as per... December 31, 2024" | No terms stated | Web map + Excel (About tab) | Geographic map; Excel fields not confirmed | https://aeso.ca/assets/Uploads/grid/transmission-capabilities-map/Transmission-Capability-Map-Report-Sept-2025.pdf | Read. **Does not cover Edmonton**: "covered the South and Central East planning regions" |
| AESO Needs ID docs / notices of filing | Named Edmonton substations; some legal land descriptions | 2017–2023 | AESO terms (not open) | PDF | By LLD only, e.g. Riverview "at NW‐4‐52‐25‐W4" | https://www.aeso.ca/assets/Uploads/P1695-NoF-Web-Posting.pdf ; https://www.aeso.ca/assets/Uploads/Transmission-Enhancements-in-the-West-Edmonton-Area-NID.pdf | Read. West Edmonton NID (1 Oct 2018) names Garneau, Poundmaker, Meadowlark, Rossdale, Jasper; no LLDs |
| EPCOR project pages (utility) | Civic addresses for individual Edmonton substations | Pages © 2026; projects 2023–2026 | EPCOR site terms | Web pages | By geocoding address | see list below | Read |
| EPCOR CETR need overview | Clover Bar, Kennedale, Namao; NE Edmonton | Jan 2023 | EPCOR | PDF | No: "identifying specific locations... is EPCOR's responsibility" | https://www.epcor.com/content/dam/epcor/documents/construction-projects/cetr-projects/cetr-need-overview.pdf | Read |
| AUC e-filing (regulator) | Facility applications, often with LLDs | Ongoing | AUC public record | PDFs per proceeding (e.g. 28545-A001, Castle Downs) | By LLD/address, case by case | https://efiling-webapi.auc.ab.ca/Document/Get/697152 | Not opened (search result only) |
| BC Hydro transmission maps (utility) | Provincial transmission map; one-line diagrams | Map "updated April 2025"; one-line "updated March 2025" | No terms stated | 3 PDFs | Not stated; province-scale | https://www.bchydro.com/energy-in-bc/operations/transmission/transmission-system/maps.html | Read page only; PDFs not opened |
| BC Hydro GIS via ICIS | "transmission and distribution line and structure locations", weekly updates | Current | ICIS Data Sharing and Licensing Agreement | ICIS Data Portal; members only | Yes (GIS) | same page; fees: https://www.icisociety.ca/wp-content/uploads/20250904_Utility-Fees.pdf | Read. Associate fee $1,500–$30,000 (for-profit); non-profit "request a quote"; no student access mentioned. Substations not confirmed in it |
| BC Hydro 2025 Annual Progress Report to WECC | Lower Mainland substation codes + projects (DGR, MUR, CSQ, MPT, WTE, EVR, HPN) | 20 Feb 2025 | WECC/BC Hydro | PDF | No | https://www.wecc.org/sites/default/files/documents/progress_report/2025/BCH%202025%20APR.pdf | Read |
| BC Hydro West End storyboards (utility) | Downtown supply map; DGR 1953, MUR 1947, CSQ 1984, MPT 2014 | Apr 2018 | BC Hydro | PDF | Descriptive only (e.g. MPT "Alberta St at W 6th Ave") | https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/projects/west-end-substation/bch-open-house-story-boards-april-2018.pdf | Read |
| BC Hydro 2025 CFP transmission system info | Substation names + codes by region | Rev 1, May 2025 | BC Hydro | PDF | No; "Appendix A has no Lower Mainland entries" | https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/corporate/independent-power-producers-calls-for-power/call-for-power/2025-cfp-transmission-system-info.pdf | Read. Not useful for Vancouver |
| BC Transmission Lines (DataBC) | Lines only; "Voltage data is not included" | Modified 2026-01-28 | OGL–BC | Open data | Lines yes; substations not stated | https://open.canada.ca/data/en/dataset/384d551b-dee1-4df8-8148-b3fcf865096a | Read. No substation layer found |
| StatCan Open Database of Infrastructure v2 | "Electrical grid" category | Oct 2023–Jun 2024; released 13 Nov 2024 | OGL–Canada | GeoPackage + CSV | Yes if substations are in it | https://www150.statcan.gc.ca/n1/pub/34-26-0003/342600032023001-eng.htm | Read. **Unconfirmed** whether substations included (needs metadata PDF in download) |
| NACEI / NRCan energy infrastructure maps | Plants ≥100 MW, renewables ≥1 MW, border crossings | Updated 17 Apr 2026 | OGL–Canada | Open data | — | https://donnees.iriu.ca/dataset/aae6619f-f9f3-435d-bc32-42decd58b674 | Read. **No substation layer** |
| CER interactive maps | Pipelines / facilities CER regulates | 2026 | — | Web | — | https://www.cer-rec.gc.ca/en/data-analysis/facilities-we-regulate/ | Search only. Not relevant (no distribution substations) |
| City of Vancouver / City of Edmonton open data | — | — | — | — | — | https://vancouver.ca/your-government/data-and-maps.aspx ; https://www.edmonton.ca/city_government/initiatives_innovation/open-data.aspx | No substation layer found by search (not confirmed absent) |
| OpenStreetMap — **crowd-sourced** | `power=substation` with `name`, `operator`, `voltage`, `ref` tags | Live | **ODbL** | Overpass API query on `power=substation` in a bounding box, or Geofabrik BC / Alberta .osm.pbf / .shp.zip | Yes (polygons/points) | https://wiki.openstreetmap.org/wiki/Tag:power%3Dsubstation ; https://download.geofabrik.de/north-america/canada.html | Read pages; data not fetched. Completeness unknown |
| Preprint: Alberta open grid datasets (arXiv 2504.07870) | Method: digitised AESO AIES map + SLD | 2025 | arXiv | HTML | Pixel positions; "may introduce slight geometric distortions" | https://arxiv.org/html/2504.07870 | Read. Preprint, not peer-reviewed (unconfirmed) |

## Named sites with a primary-source location (for geocoding)
Vancouver
- Murrin — "721 Main Street" — Canadian Register of Historic Places, https://historicplaces.ca/en/rep-reg/place-lieu.aspx?id=2748
- East Vancouver (new, replaces Murrin) — "located at 303 Vernon Drive, north of Hastings Street" — https://bchydro.com/energy-in-bc/projects/east-vancouver-substation.html
- Cathedral Square — "underground substation below Cathedral Square Park" — 2018 storyboards
- Dal Grauer — on Burrard Street; civic no. not found in a BC Hydro/government source (944 Burrard seen only on a directory site; not used)
- Mount Pleasant — "Alberta St at W 6th Ave" — 2018 storyboards
- Sperling — "at Arbutus and W. King Edward Ave." — https://www.bchydro.com/news/press_centre/news_releases/2013/mount-pleasant-substation-to-meet-growing-energy-demand.html
- West End (proposed) — "underground at the Vancouver School Board's Lord Roberts Annex property" — https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/projects/west-end-substation/west-end-substation-discussion-guide-2025-apr-may.pdf
- Camosun, UBC, Mainwaring — relative descriptions only (storyboards). "Kidd" not found in Vancouver sources.

Edmonton (EPCOR pages)
- Garneau — "11123 85 Avenue NW" — https://www.epcor.com/ca/en/ab/edmonton/operations/construction/projects/garneau-substation.html
- Dome — "located at 2720 Parson Road" — https://www.epcor.com/ca/en/ab/edmonton/operations/construction/projects/dome-substation.html
- Woodcroft — "located at 11819 142 Street" — https://www.epcor.com/ca/en/ab/edmonton/operations/construction/projects/woodcroft-substation.html
- Meadowlark — "located at 15404 84 Avenue NW" — https://www.epcor.com/ca/en/ab/edmonton/operations/construction/projects/meadowlark-substation.html
- Castle Downs — "located at 16253 – 97 St NW" — https://www.epcor.com/products-services/infrastructure/construction-projects/Documents/2023-11-15-Castle-Downs-Substation-Notice.pdf
- Riverview — "NW‐4‐52‐25‐W4" (LLD, quarter-section precision) — AESO P1695 notice
- Poundmaker, Rossdale, Jasper, Kennedale, Namao, Clover Bar, Argyll, Strathcona — named (AESO/EPCOR), no address found yet

## Recommendation
- **Edmonton:** AESO 2026 AIES Map (updated 16 Oct 2026) as the authoritative list of names/IDs; locate each by EPCOR/AUC addresses or LLDs. Confidence 80 for named+addressed sites; 60 for digitised-from-map positions.
- **Vancouver:** No open government substation layer found. Build a hand list from BC Hydro filings/project pages + Register of Historic Places, geocode addresses. Confidence 80 where an address/intersection is quoted; 60 for "below park" type descriptions.
- **Both:** OSM (crowd-sourced, ODbL) as a cross-check and gap-filler only; label as such.
- Full GIS (BC Hydro via ICIS) is licensed and paid; not suitable for a public student tool.

## Vancouver vs Edmonton
- Edmonton has a current, operator-published system map with names + IDs; Vancouver has no equivalent public map at city scale (BC Hydro maps are province-scale; not opened).
- Neither city has an open-licence substation coordinate layer found.

## Could not read / still a gap
- StatCan ODI "Electrical grid": whether it holds substations — needs the metadata PDF inside the download (not downloaded).
- BC Hydro Provincial Transmission System PDF (April 2025) and one-line diagrams: not opened; whether they show Vancouver substations is unknown.
- AUC e-filing document 697152: not opened.
- AIES map name-to-ID pairing (e.g. Clover Bar 987S): text extraction unreliable; needs visual check by J.B.
- City open-data portals: not searched directly (only via web search).
- No WebFetch failures/blocks recorded.

## Follow-up 19 Oct (after J.B.'s downloads)
- StatCan ODI v2 electric grid (J.B. download): substations only for Nova Scotia (230), Laval (8) and Yukon (19). **None for BC or Alberta.** Edmonton has a City "Circuit Layer" of power lines (2023), not substations.
- Built: named stations placed at the City-listed parcel for the published address (tool address search). Vancouver: Murrin (721 Main), East Vancouver (303 Vernon Dr), West End planned (1150 Nelson). Edmonton: Garneau (placed at 11127 85 Ave, nearest listed), Dome (2720 Parsons Rd), Woodcroft (placed at 11820 142 St, nearest listed), Meadowlark (15404 84 Ave), Castle Downs (16253 97 St).
- CanVec points kept for the rest, dropped where a named station lies within 300 m.
- Not placed: Mount Pleasant, Sperling (intersections), Cathedral Square (under a park), Dal Grauer (no primary address); Edmonton stations named on the AESO 2026 map without addresses.
