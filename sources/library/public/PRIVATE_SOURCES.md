# Private sources: index

These are the sources the tool relies on that **can't be shared publicly**: copyrighted papers, books, standards and handbooks, operator documents, and licensed data. Their saved copies are kept privately. This index records three things for each one, so a reader can find and check it themselves: the full citation, where to find it, and how the tool uses it.

Where our copy is kept:
- **Private repo:** `JennaBruggeman/beyond-data-sources`, folder `private/<id>/` (text extracts).
- **J.B.'s computer:** her Downloads folder and `Desktop/BCA`.
- **Working copy:** `data/raw/` in the tool's working folder. It is never committed.

Ids match the tool's register (`register/formula_register.json`). The tool parts are listed by id, with their names in brackets. Updated 28 Oct 2026.

---

## Journal papers, books and theses

### barroso2018
- **Citation:** Barroso, L. A., Hölzle, U., & Ranganathan, P. (2018). *The Datacenter as a Computer: Designing Warehouse-Scale Machines* (3rd ed.). Synthesis Lectures on Computer Architecture. Morgan & Claypool / Springer. ISBN 978-3-031-01761-2.
- **Where:** Springer (subscription); UBC Library. Our copy: Downloads `978-3-031-01761-2.pdf`; text extract in `private/barroso2018/`.
- **How we use it:** build cost per watt and occupancy scaling (build_cost); depreciation periods (horizons); cost of reserved, unused capacity (reserved_cost); heat rejected (heat_rejected).

### wahlroos2018
- **Citation:** Wahlroos, M., Pärssinen, M., Rinne, S., Syri, S., & Manner, J. (2018). Future views on waste heat utilization – Case of data centers in Northern Europe. *Renewable and Sustainable Energy Reviews, 82*, 1749–1764.
- **Where:** ScienceDirect, https://www.sciencedirect.com/science/article/pii/S1364032117314314 (subscription). Our copy: Downloads `1-s2.0-S1364032117314314-main.pdf`; text extract in `private/wahlroos2018/`.
- **How we use it:** heat temperature by cooling type (heat_temp); heat-pump capital cost and who pays which part (capex_split).

### lygnerud
- **Citation:** Lygnerud, K., & Werner, S. (2018). Risk assessment of industrial excess heat recovery in district heating systems. *Energy, 151*, 430–441.
- **Where:** ScienceDirect, https://www.sciencedirect.com/science/article/pii/S0360544218304559 (subscription). Our copy: Downloads `1-s2.0-S0360544218304559-main.pdf`; text extract in `private/lygnerud/`.
- **How we use it:** the risk that a heat supply ends early (risk_term).

### ayuso2023
- **Citation:** Ayuso-Virgili, G., Jafari, L., Lande-Sudall, D., & Lümmen, N. (2023). Linear modelling of the mass balance and energy demand for a recirculating aquaculture system. *Aquacultural Engineering, 101*, 102330.
- **Where:** ScienceDirect, https://www.sciencedirect.com/science/article/pii/S0144860923000171. Our copy: Downloads `1-s2.0-S0144860923000171-main.pdf`; text extract in `private/ayuso2023/`.
- **How we use it:** fish production a data centre's heat could support (aquaculture_tonnes): energy per kg of fish, with the make-up-water share.

### ion2022
- **Citation:** Ion, I. V., Popescu, F., Coman, G., & Frăţiţă, M. (2022) (last name's diacritics to check against the paper). Heat requirement in an indoor recirculating aquaculture system. *Energy Reports, 8*, 11707–11714.
- **Where:** ScienceDirect, https://www.sciencedirect.com/science/article/pii/S2352484722016894. Our copy: Downloads `1-s2.0-S2352484722016894-main.pdf`; text extract in `private/ion2022/`.
- **How we use it:** heat per m³ of tank volume (aquaculture_tonnes).

### nistad2020
- **Citation:** Nistad, A. A. (2020). *Current and Future Energy Use for Atlantic Salmon Farming in Recirculating Aquaculture Systems in Norway* (Master's thesis, Energy and Environmental Engineering). Norwegian University of Science and Technology (NTNU), Trondheim.
- **Where:** NTNU Open (Inspera record 48582836). Our copy: Downloads `no.ntnu_inspera_48582836_23704449.pdf`; text extract in `private/nistad2020/`.
- **How we use it:** measured energy per kg of smolt and the heat pump's share (aquaculture_tonnes).

### oro2019
- **Citation:** Oró, E., Taddeo, P., & Salom, J. (2019). Waste heat recovery from urban air cooled data centres to increase energy efficiency of district heating networks. *Sustainable Cities and Society, 45*, 522–542.
- **Where:** ScienceDirect (subscription). Our copy: J.B. upload, read 18 Oct 2026 (file location not recorded).
- **How we use it:** heat temperature by cooling type (heat_temp); share of heat captured in liquid (liquid_capture).

### yuan2025
- **Citation:** Yuan, Liu, Sun, Lin, Fan, Zhao, & Kosonen (2025). Data center waste heat for district heating networks: A review. *Renewable and Sustainable Energy Reviews, 219*, 115863. https://doi.org/10.1016/j.rser.2025.115863 (authors' initials still to add from the paper).
- **Where:** ScienceDirect (subscription). Our copy: J.B. upload, read 18 Oct 2026 (file location not recorded).
- **How we use it:** air-side and condenser heat temperatures (heat_temp); share of heat captured in liquid (liquid_capture).

### majdabadi2026
- **Citation:** Majdabadi, M. M., Irandoostshahrestani, M., & Koohi-Fayegh, S. (2026). Integration of air-source to ground-source heat pump systems: Impact on borehole design and life-cycle cost in Canada. *Geothermics, 138*, 103640. https://doi.org/10.1016/j.geothermics.2026.103640
- **Where:** ScienceDirect. Our copy: Downloads `1-s2.0-S0375650526000453-main.pdf`; working copy `data/raw/papers/geothermics_2026.pdf`.
- **How we use it:** borehole installation cost per metre for Edmonton. It's in the register but not yet linked to a tool part.

### sailor2026
- **Citation:** Sailor, D. J., Samareh Abolhassani, S., & Martin, E. P. (2026). Data center waste heat as an emerging urban thermal hazard: First field measurements. *ASME Journal of Engineering for Sustainable Buildings and Cities, 7*(2), 024501. https://doi.org/10.1115/1.4071922
- **Where:** ASME Digital Collection. Our copy: working copy `data/raw/papers/sailor2026_dc_waste_heat.pdf`.
- **How we use it:** measured downwind warming near data centres (heat_plume_dT); heat given off per m² of site (heat_flux_site).

### duvenhageKroger1996
- **Citation:** Duvenhage, K., & Kröger, D. G. (1996). The influence of wind on the performance of forced draught air-cooled heat exchangers. *Journal of Wind Engineering and Industrial Aerodynamics, 62*, 259–277.
- **Where:** ScienceDirect, https://www.sciencedirect.com/science/article/pii/S0167610596000827 (subscription). Our copy: Downloads `1-s2.0-S0167610596000827-main.pdf`; working copy `data/raw/papers/duvenhage_kroger_1996.pdf`.
- **How we use it:** wind and warm-air recirculation at rooftop coolers (recirculation_flag).

### molla2026
- **Citation:** Molla, A. (2026). In my backyard? Digital heat islands and the environmental justice of AI infrastructure in Phoenix. *Climate Physics and Atmospheric Science: Scientific Insights and Societal Challenges, 3–4*, 100016.
- **Where:** ScienceDirect. Our copy: working copy `data/raw/papers/molla2026_digital_heat_islands.pdf`.
- **How we use it:** urban heat around data centres, as context (uhi_context).

### salamanca2014
- **Citation:** Salamanca, F., Georgescu, M., Mahalov, A., Moustaoui, M., & Wang, M. (2014). Anthropogenic heating of the urban environment due to air conditioning. *Journal of Geophysical Research: Atmospheres, 119*, 5949–5965. https://doi.org/10.1002/2013JD021225
- **Where:** Wiley / AGU. Our copy: Downloads (JGR Atmospheres, 2014, Salamanca); working copy `data/raw/papers/salamanca2014_phoenix_ac.pdf`.
- **How we use it:** how much air-conditioning waste heat warms nearby air, as a comparison (heat_plume_dT).

---

## Standards, codes and handbooks

### cec2024ESS
- **Citation:** CSA Group. (2024). *CSA C22.1:24, Canadian Electrical Code, Part I*, Section 64. Toronto: CSA Group.
- **Where:** CSA Group store (paid); UBC Library. Our copy: Downloads `CEC 2024.pdf` (library copy); notes in working copy `data/raw/codes/CEC_2024_note.txt`.
- **How we use it:** where batteries may go, separation distances and certification (battery, battery_code_path).

### nfpa855_2026
- **Citation:** National Fire Protection Association. (2026). *NFPA 855: Standard for the Installation of Stationary Energy Storage Systems* (2026 ed.). Quincy, MA: NFPA.
- **Where:** NFPA Free Access reader (read-only, login needed). Our copy: screenshots in working copy `data/raw/codes/nfpa855_2026_screens.pdf`.
- **How we use it:** battery thresholds and outdoor separation, as a US reference (battery, component_space).

### ashraeCh45
- **Citation:** ASHRAE. (2015). Building air intake and exhaust design. In *ASHRAE Handbook—HVAC Applications* (SI ed., Ch. 45). Atlanta: ASHRAE. Also: ASHRAE. (2025). Airflow around buildings. In *ASHRAE Handbook—Fundamentals* (Ch. 24).
- **Where:** ASHRAE Handbook Online (subscription); UBC Library. Our copy: working copies `data/raw/papers/ashrae_hvacapps_ch45_intake_exhaust.pdf` and `ashrae_fund_ch24_airflow.pdf`.
- **How we use it:** recirculation zones on flat roofs and the risk of warm air being drawn back into coolers (recirculation_flag).

### ashrae2015ch51
- **Citation:** ASHRAE. (2015). Snow melting and freeze protection. In *ASHRAE Handbook—HVAC Applications* (SI ed., Ch. 51). Atlanta: ASHRAE.
- **Where:** ASHRAE Handbook Online (subscription); UBC Library. Our copy: working copy `data/raw/codes/ashrae2015_ch51_snow_melting.pdf`.
- **How we use it:** heat needed per m² of sidewalk, using Seattle as the nearest listed city (snowmelt_area).

### ashraeLife
- **Citation:** ASHRAE. (2015). Owning and operating costs. In *ASHRAE Handbook—HVAC Applications* (Ch. 37, Tables 3–4). Atlanta: ASHRAE.
- **Where:** ASHRAE Handbook Online, https://handbook.ashrae.org (subscription). Our copy: none saved (read online).
- **How we use it:** service life of plant: chillers, cooling towers, pumps, transformers (horizons, futures).

---

## Operator documents

### cologixVAN1_2026, cologixVAN4_2026
- **Citation:** Cologix. (2026, May). *VAN1 data centre specification sheet* and *VAN4 data centre specification sheet*.
- **Where:** Cologix website (cologix.com). Our copies: working copies `data/raw/cologix_van1_2026-05.pdf` and `data/raw/cologix_van4_2026-05.pdf`. Security, fuel and fibre-entry details are deliberately left out of the tool.
- **How we use it:** operator claims for plant space and capacity (component_space).

### quEDM1_2026, quEDM2_2026
- **Citation:** Qu Data Centres. (2026). *EDM1 Facility Overview* and *EDM2 Facility Overview* (specification sheets).
- **Where:** Qu Data Centres website. Our copies: Downloads `EDM1-Spec-Sheet.pdf`, `EDM2-Spec-Sheet.pdf`; working copies `data/raw/qu/`.
- **How we use it:** operator claims for IT load (it_load_claim), raised-floor area (server_floor) and backup duration (backup_hours).

---

## Licensed data

### bcAssess2026
- **Citation:** BC Assessment. (2026). *Residential Inventory Extract* and *Non-Residential Inventory Extract* (1 Apr 2026). In BC Assessment Data Advice and Inventory Extracts. UBC Library Abacus, https://hdl.handle.net/11272.1/AB2/LAPUAB
- **Where:** Abacus (restricted to SFU, UBC, UNBC and UVic researchers). Our copy: J.B.'s computer, `Desktop/BCA`; licence terms in Downloads `DataBC_BCA_terms_for_UBC_researchers-2025_01.pdf`. The raw files never leave her computer.
- **How we use it:** homes and floor area per parcel for Vancouver heat demand (receiver_demand). Only derived values are shown, rounded (agreed with UBC Library, 19 Oct 2026).

### epsbNSR, and Edmonton lot outlines
- **Citation:** Altalis Base Features (hydrography, and title-mapping lot lines), shared through Edmonton Public Schools Data Analysis Team, Azimuth GIS (azimuth.epsb.ca).
- **Where:** academic use only, approved through Xun Liu, 15 Oct 2026; not for redistribution. Our copies: Downloads `edmonton_lots_epsb.json`; working copy `data/raw/edm/lots/`. The lot tiles stay out of git.
- **How we use it:** the North Saskatchewan River as a cooling sink (surface_water_sink); lot outlines for picking an Edmonton site.

---

## Not listed here
- **Open-access papers and public documents** (government reports, bylaws, codes free from NRC or the provinces): their saved copies are in the private repo's `public/` folders, with an `info.json` index in this folder.
- **Uptime Institute's Tier page and the NFPA 855 TIAs:** these are free web documents.
