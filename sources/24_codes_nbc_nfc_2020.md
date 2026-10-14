# 24 · NBC 2020 floor loads and NFC 2020 fuel storage (read from the official PDFs)

Supplied by J.B., 14 Oct 2026. Saved locally in data/raw/codes/ (not in the repo).
- [N1] National Research Council of Canada. *National Building Code of Canada 2020*, Volume 1 (as published 2025 with revisions), Division B, Part 4. doi:10.4224/w324-hv93. Table read from the page image (PDF pp. 444–445; code pp. 4-9 to 4-10).
- [N2] National Research Council of Canada. *National Fire Code of Canada 2020*. NR24-27-2020-eng. https://publications.gc.ca/collections/collection_2022/cnrc-nrc/NR24-27-2020-eng.pdf . Tables read from the page images (PDF pp. 188–190; code pp. 4-32 to 4-34).

Status: SOURCED (national model codes). BC (BCBC 2024 / BCFC 2024), Alberta (NBC(AE) / NFC(AE) 2023) and the Vancouver Building By-law adopt these with local variations; check each for changes before citing them for a specific city.

## 1. Floor live loads — NBC 2020 Table 4.1.5.3 [N1]

| Use of area (NBC wording) | Minimum specified load, kPa |
|---|---|
| Office areas (**not including record storage and computer rooms**) in basements, and floors with direct access to the exterior at ground level | 4.8 |
| Office areas, other floors | 2.4 |
| Equipment areas and service rooms, including generator rooms, mechanical equipment, machine rooms, pump rooms, transformer vaults, ventilating or air-conditioning equipment | 3.6 (note 4) |
| Storage areas | 4.8 (note 4) |
| Factories | 6.0 (note 4) |
| Warehouses | 4.8 (note 4) |
| Libraries: stack rooms | 7.2 |
| Roofs | 1.0 (note 5) |

- Note 4 points to Sentence 4.1.5.1.(1): the specified live load "shall not be less than either the uniformly distributed load patterns listed in Article 4.1.5.3., the loads due to the intended use and occupancy, or the concentrated loads listed in Article 4.1.5.9., whichever produces the most critical effect."
- **What this means for the tool:** the NBC has **no row for data halls**; computer rooms are explicitly excluded from the office row. A data hall must be designed for its actual equipment loads (4.1.5.1.(1)). The 7.2 kPa (US DoD) and 12 kPa (TIA-942) figures in note 16 stay NEEDS STANDARD.
- **Basement vs upper floor (sourced):** an office building's upper floors are designed for 2.4 kPa, its basement and ground-access floors for 4.8 kPa, and plant rooms for at least 3.6 kPa. A data hall placed on an upper office floor is therefore the most likely to need structural reinforcement; a slab on grade carries any load.
- This replaces the Ontario Building Code stand-in in note 16, row 21 (values match).

## 2. Fuel storage inside buildings — NFC 2020 [N2]

- **Definition (1.4.1.2):** "Storage tank means a vessel for flammable liquids or combustible liquids having a capacity of more than 230 L, and designed to be installed in a fixed location."
- **4.3.13.4.(1):** storage tanks shall be "located in dedicated storage rooms conforming to Subsection 4.3.14., and located in conformance with Tables 4.3.13.4.-A and 4.3.13.4.-B".
- **Table 4.3.13.4.-B** — *Indoor Tank Storage in Occupancies Using Oil-Burning Equipment, Emergency Generators and Fire Pumps* (diesel is Class II):

| Storage level | Individual tank | Aggregate per protected storage room, L |
|---|---|---|
| First storey | > 2 500 L, or > 20 000 L | 200 000 |
| Basement and storeys above the first storey | > 2 500 L | 20 000 |
| Basement and storeys above the first storey | > 20 000 L | 45 000 |

  - Note 2: for industrial occupancies where the tanks are in a separate storage room from the equipment, Table 4.3.13.4.-A applies (Classes II and IIIA: first storey 200 000 L protected / 100 000 L unprotected; above first storey 20 000 L protected, unprotected not permitted; basement 20 000 L protected, unprotected not permitted).
- **4.3.13.5:** tanks of 2 500–20 000 L must be double-walled (or ≥ 300° secondarily contained) and leak-monitored; tanks over 20 000 L per 4.3.1.2.(1)(l), leak-monitored.
- **4.3.13.6:** piping serving diesel emergency generators shall conform to CSA B139.
- **4.3.13.7 / 4.3.14.1:** storage rooms separated by a fire separation of at least **2 h**; contain 100 % of the largest tank; liquid-tight wall–floor joints; used for nothing else.
- **4.3.14.2:** **550 mm** minimum clear space between room walls and tanks.
- **Open question (UNVERIFIED):** whether a data centre's standby (non-life-safety) generators fall under "Emergency Generators" in Table B's title or are treated otherwise by the authority having jurisdiction. Note 16 already separates CSA C282 life-safety power from IT backup.
- **What this means for the tool:** fuel above the first storey or in a basement is capped at 20 000–45 000 L per room; at the first storey up to 200 000 L. Using the manufacturer figure in note 16 (about 6.3 m³ of fuel per MW per 24 h, MANUFACTURER CLAIM), 20 000 L is roughly 3 MW-days. Larger runtimes push fuel to the first storey or outdoor tanks — a sourced reason generators and fuel sit at grade.

This confirms the 2015-based figures in note 23 for the 2020 edition (status updated there).
