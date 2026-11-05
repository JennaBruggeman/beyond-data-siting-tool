# Zones where a data centre is permitted, conditional or discretionary (3 Nov 2026)

Check 1 only (finding agent's read). "?" = not confirmed. "Our reading" = our interpretation, not a clause. All rows are kind **rule** (by-law text) unless marked. New ids are `arch_zns_*` (zones_sources.json); existing register ids reused.
Method: local copies only. Vancouver: I-2, I-3 (June 2026), FC-2 (June 2026), I-1C (Nov 2025) from beyond-data-sources; C-2 and Section 10 (both Oct 2026) from J.B.'s uploads; Section 2 (van3575s2). Edmonton: Bylaw 20001 as adopted (local text data/raw/edm/bylaw/b.txt, PDF 3 Jan 2024; amendments since not checked ?) and the Oct 2026 Land Use & Zoning Matrix (edm_matrix). bylaws.vancouver.ca refused by the session proxy (403) for every other schedule; not circumvented.

## 0. Key findings

- **Vancouver, Bulk Data Storage (C) confirmed in:** I-2 (all of it, incl. sub-area B), I-3 sub-area A only, I-1C, FC-2 (all six sub-areas). Plus one **proposed** CD-1 (111 E 5th Ave / 2060 Quebec St, RTS 19744; enacted ?).
- **Confirmed not listed:** C-2 (Oct 2026 schedule: no Bulk Data Storage row; "any other use not specifically listed and defined" route does not apply, because Section 2 defines it; arch_zns_vanC2, 2.1). I-1A: City says "the site's existing I-1A zoning does not allow data centres" (van_rts19744 p. 4).
- **"Information Communication Technology" is not a data-centre route (our reading).** Section 2 defines "Digital Entertainment and Information Communication Technology" (an Office use inside General Office) to include "data storage, management and processing" and "hosting, storing and processing digital media" (van3575s2). But the City classes data centres as "Transportation and Storage use" (Bulk Data Storage) and still needed a CD-1 rezoning to add it in I-1A (van_rts19744 p. 4). "Information Communication Technology Manufacturing" (I-1C, O) is manufacturing, not storage.
- **Edmonton: 10 zones** list the use class a data centre is deemed into (Minor or Major Industrial, edmLDA26; always Discretionary under 7.20 3.3.2, arch_zon_Edm720): standard **BE, IM, IH**; Energy and Technology Park **EETB, EETC, EETL, EETM, EETIM**; Ellerslie **EIB, EIM**. Not in ECB (Minor Industrial limited to "Special Industrial Uses" = advanced manufacture or R&D, our reading), UI ("Minor Industrial, limited to indoor and outdoor storage", 10.5; whether server storage counts: ?, our reading no), FD (temporary outdoor storage), RTCC (recycling depot).
- **Edmonton size catch:** in **IH**, Minor Industrial is "limited to those existing as of January 1, 2024", so a small (Minor) data centre fits IH only if deemed Major Industrial; in **IM**, Major is limited to existing, so a large AI data centre does not fit IM (our reading of edmLDA26 + 2.130/2.140). EETC allows Minor Industrial only inside the 1.5 km Risk Buffer (3.52 s. 4.1).
- **Alternative reading ?:** Edmonton South zones (IBES, ILES, UC3ES) use old use names; "Information Service" (P in all three) "includes data processing" (3.60 s. 4.1.82–4.1.84). Not how the City frames data centres; flagged, not adopted.
- **Corrections to tool/data/zones.json:** (1) I-3 and FC-2 yards are adopted June 2026 text, not "2022 draft figures"; (2) I-1C yards are now read (below); (3) FC-2 height "with approval" differs by sub-area: A/B 51.8 m, C1 18.3 m, C2/D 51.8 m, E 42.7 m (not 51.8 m everywhere); (4) FC-2 data-centre FSR by sub-area: A 3.00 (of 7.00 total), B 5.00 (6.50), C1 1.00 (1.50), C2 1.00 non-dwelling (1.50), D 3.00 (7.50), E 3.00; (5) I-2 sub-area A floor-to-floor minimums (6.1 m / 4.0 m, 3.1.2.4) are missing; (6) BE street setback 6.0 m / 4.5 m on Collector or Local Road; IH height variable (4.2) and is the only standard zone where FAR and height can move by variance rules (7.100 s. 6.1).
- **Drafting gap (Vancouver):** I-2 s. 3.1.2.6 (36.5 m, outside sub-area B) applies "if the permitted floor space ratio is increased pursuant to section 3.1.1.2", but outside sub-area B there is no s. 3.1.1.2 in the June 2026 text. So 30.5 m is the usable cap there (our reading).

## 1. Vancouver

Common to all Vancouver zones below:

| what | value | clause | source id | conf. |
|---|---|---|---|---|
| Use name | "Bulk Data Storage: The use of a wholly enclosed building for the storage of information on operating data servers" (Transportation and Storage) | Sec. 2 | van3575s2 | 95 |
| Rooftop equipment | Director of Planning "may permit … mechanical equipment, including elevator machine rooms, and any related screening materials" and "roof mounted energy technologies, zero-emission mechanical equipment" to exceed max. height, considering "building placement, massing, views, overlook, shadowing and noise" (discretion, no metre cap) | s. 10.1.1(b), (d) | arch_zns_vanS10Oct2026 (same words as vanZDBs10, May 2026) | 90 |
| Mechanical floor area | floors for "heating and mechanical equipment" excluded from floor area only "at or below base surface" | I-2, I-3, I-1C 4.1.2(c); FC-2 4.1.2(c) | van_zdb_* | 90 |
| Loading | Class B: 1 space for first 465 m², +1 for next 1,860 m², +1 per further 2,325 m²; 10.2 × 3.4 × 3.8 m; 6.1 m aisle | Parking By-law 6059 s. 5 | vanParking5 | 80 |
| Site coverage | no site-coverage clause in I-2, I-3, I-1C, FC-2 ("coverage" not in any of the four texts) | — | van_zdb_* | 85 |

### 1a. I-2 outside sub-area B (June 2026)

| what | value | clause | source id | conf. |
|---|---|---|---|---|
| Status | Bulk Data Storage **Conditional** | 2.1 | van_zdb_i2 | 95 |
| FSR outright | 3.00 for transportation and storage uses (max total 3.00) | 3.1.1.1(a)(iv) | van_zdb_i2 | 95 |
| FSR with approval | none for data (no 3.1.1.2 outside B) | 3.1.1 | van_zdb_i2 | 85 |
| Height outright / approval | 18.3 m / up to 30.5 m (Director or DP Board); 36.5 m clause unusable, see §0 | 3.1.2.1, 3.1.2.5, 3.1.2.6 | van_zdb_i2 | 90 |
| Flood relaxation | +3.5 m in the Still Creek flood plain (Map 2) | 5.1 | van_zdb_i2 | 90 |
| Front yard | none required | 3.1.2 | van_zdb_i2 | 90 |
| Side yard | 1.5 m beside RM, 0.9 m beside R1/RT/RA (no lane between); otherwise none; if provided, ≥ 0.9 m | 3.1.2.2, 3.1.2.7 | van_zdb_i2 | 95 |
| Rear yard | 3.1 m, less the distance to lane centre line; may be waived | 3.1.2.3, 3.1.2.8–9 | van_zdb_i2 | 95 |
| Max width / depth | none | — | van_zdb_i2 | 90 |
| Ground floor | "Bulk data storage is not permitted at the ground floor, except for entrances." | 2.2.7 | van_zdb_i2 | 95 |
| Non-industrial caps | 1.00 FSR for all other uses combined; retail ≤ 1,000 m² (accessory retail ≤ 500 m² in sub-area A); office + health care office ≤ greater of 235 m² or 33.3 %; Restaurant 1 ≤ 300 m² | 3.1.1.1(b) | van_zdb_i2 | 95 |
| Amenity exclusion | public-serving fitness, recreation, child day care: lesser of 20 % or 100 m² | 4.1.2(d) | van_zdb_i2 | 90 |
| Storey heights | **sub-area A only**: first floor ≥ 6.1 m, upper ≥ 4.0 m (new buildings) | 3.1.2.4 | van_zdb_i2 | 95 |
| Daylight test (for 30.5 m) | no shadow at 10 a.m., noon, 2 p.m. on 21 Sep and 21 Mar; facades 24.4 m apart | 4.4.1 | van_zdb_i2 | 90 |

### 1b. I-2 sub-area B (June 2026)

| what | value | clause | source id | conf. |
|---|---|---|---|---|
| Status | Bulk Data Storage **Conditional** | 2.1 | van_zdb_i2 | 95 |
| FSR outright / approval | 3.00 for transportation and storage / total 4.00 only with ≥ 1.00 of the uses in 3.2.1.1(c), so the data centre stays at 3.00 | 3.2.1.1(a)(iv), 3.2.1.2 | van_zdb_i2 | 90 |
| Height outright / approval | 18.3 m / 36.5 m (needs ≥ 1.00 FSR of 3.2.1.1(c) uses) | 3.2.2.1, 3.2.2.10 | van_zdb_i2 | 90 |
| Front | 0.6 m; above 18.3 m: 3.7 m; above 30.5 m: 6.1 m; parking 1.2 m | 3.2.2.2–3, 3.2.2.11 | van_zdb_i2 | 95 |
| Side | 7.6 m; above 18.3 m: 10.7 m; above 30.5 m: 12.2 m; corner: exterior side as front | 3.2.2.4–5, 3.2.2.13 | van_zdb_i2 | 95 |
| Rear | 3.1 m, less distance to lane centre line; may be waived | 3.2.2.6, 3.2.2.15–16 | van_zdb_i2 | 95 |
| Max width / depth | 61.0 m each; Director may increase "where a functional need is demonstrated" | 3.2.2.7–8, 3.2.2.17 | van_zdb_i2 | 95 |
| Ground floor | as 2.2.7 (above) | 2.2.7 | van_zdb_i2 | 95 |
| Non-industrial caps | 1.00 FSR other uses; same retail/office/restaurant caps as 1a | 3.2.1.1(d) | van_zdb_i2 | 95 |
| Storey heights | first ≥ 6.1 m, upper ≥ 4.0 m (new buildings) | 3.2.2.9 | van_zdb_i2 | 95 |

### 1c. I-3 sub-area A (June 2026; data not allowed in sub-area B)

| what | value | clause | source id | conf. |
|---|---|---|---|---|
| Status | "Bulk Data Storage, only in sub-area A" **Conditional** | 2.1 | van_zdb_i3 | 95 |
| FSR outright / approval | 3.00 for transportation and storage / the extra 2.00 (3.1.1.2) excludes transportation and storage, so 3.00 | 3.1.1.1(a), 3.1.1.2 | van_zdb_i3 | 95 |
| Height outright / approval | 18.3 m / 30.5 m; up to 45.7 m (3.1.2.11) | 3.1.2.1, 3.1.2.10–11 | van_zdb_i3 | 95 |
| Front | 0.6 m; above 18.3 m: 3.7 m; above 30.5 m: 6.1 m; parking 1.2 m; may be reduced | 3.1.2.2–3, 3.1.2.12–14 | van_zdb_i3 | 95 |
| Side | 7.6 m; above 18.3 m: 10.7 m; above 30.5 m: 12.2 m; corner as front; may be decreased (street network, loading, open space) | 3.1.2.4–5, 3.1.2.15–16 | van_zdb_i3 | 95 |
| Rear | 3.1 m, less distance to lane centre line; may be waived | 3.1.2.6, 3.1.2.17–18 | van_zdb_i3 | 95 |
| Max width / depth | 61.0 m each; may increase for functional need | 3.1.2.7–8, 3.1.2.19 | van_zdb_i3 | 95 |
| Ground floor | "Bulk data storage is not permitted at the ground floor, except for entrances." | 2.2.11 | van_zdb_i3 | 95 |
| Non-industrial caps | 1.00 FSR all other uses; retail ≤ 1,000 m²; conditional office ≤ 33 % | 3.1.1.1(b) | van_zdb_i3 | 95 |
| Storey heights | first ≥ 6.0 m, upper ≥ 4.0 m (new buildings) | 3.1.2.9 | van_zdb_i3 | 95 |
| Next to residential | no residential-specific yard in sub-area A; daylight/privacy considered for 30.5 m | 3.1.2.10 | van_zdb_i3 | 85 |
| Garbage | containers screened from the centre line of an abutting street | 4.5.2 | van_zdb_i3 | 90 |

### 1d. I-1C (Nov 2025; current ?)

| what | value | clause | source id | conf. |
|---|---|---|---|---|
| Status | Bulk Data Storage **Conditional** | 2.1 | van_zdb_i1c | 95 |
| FSR outright / approval | 6.00 for transportation and storage etc.; no increase clause | 3.1.1.1(a) | van_zdb_i1c | 95 |
| Industrial minimum | uses in 3.1.1.1(a) "must not be less than 33.3% of the net floor area" | 3.1.1.1(b) | van_zdb_i1c | 95 |
| Non-industrial cap | 4.00 FSR all other uses combined | 3.1.1.1(c) | van_zdb_i1c | 95 |
| Height outright / approval | 46.5 m; but ≤ 21.0 m within 6.1 m of a north–south street and within 4.5 m of 2nd, 3rd or 4th Ave (Director may let 33.3 % of width project); up to 50.3 m (+1 storey) only "for the provision of rooftop access and amenity spaces" | 3.1.2.1, 3.1.2.4–6 | van_zdb_i1c | 95 |
| Setbacks | 1.50 m from a north–south street; 0.65 m from 3rd Ave and 4th Ave; 0.60 m from a lane; no side yard clause | 3.1.2.2 | van_zdb_i1c | 95 |
| Max width / depth | none | — | van_zdb_i1c | 90 |
| Ground floor | no Bulk Data Storage limit; only creative products manufacturing barred from the first storey | 2.2.4 | van_zdb_i1c | 90 |
| Storey heights | first ≥ 6.1 m; second ≥ 5.35 m | 3.1.2.3 | van_zdb_i1c | 95 |
| Enclosure | conditional uses "wholly within a completely enclosed building unless appropriate measures are taken" | 2.2.1(a) | van_zdb_i1c | 90 |
| Amenity exclusion | Director may vary exclusions for amenity incl. child day care and recreation to 10 % | 4.1.3 | van_zdb_i1c | 85 |

### 1e. FC-2 (June 2026; Bulk Data Storage Conditional in all sub-areas)

| what | A | B | C1 | C2 | D | E | clause | conf. |
|---|---|---|---|---|---|---|---|---|
| FSR for data, outright | 3.00 ("all other uses combined"; total 7.00) | 5.00 non-dwelling | 1.00 non-dwelling | 1.00 non-dwelling | 3.00 | 3.00 (transportation and storage) | 3.1.1.1–2, 3.2.1.2, 3.3.1.3, 3.3.1.5, 3.4.1.2 | 90 |
| FSR with approval | ? none for data | 6.50 total | 1.50 | 6.50 total, non-dwelling ≤ 1.50 | 7.50 if ≥ 1.00 of listed industrial uses | none for data | 3.1.1.3, 3.2.1.3, 3.3.1.4, 3.3.1.6 | 85 |
| Height outright | 22.9 m | 22.9 m | 10.7 m | 10.7 m | 10.7 m | 18.3 m | 3.1.2.1, 3.2.2.1, 3.3.2.1, 3.4.2.1 | 95 |
| Height with approval | 51.8 m | 51.8 m | 18.3 m | 51.8 m | 51.8 m | 42.7 m | 3.1.2.7, 3.2.2.7, 3.3.2.7, 3.4.2.7 | 95 |
| Front / rear yard | 0.6 / 0.6 m (all); parking 1.2 m; may be decreased | | | | | | 3.x.2.2, 3.x.2.4, 3.x.2.8–9, 3.x.2.12 | 95 |
| Side yard | "Side yard not permitted" (all); corner: exterior side as front | | | | | | 3.x.2.3, 3.x.2.10 | 95 |
| Ground floor | "Dwelling uses, office uses and bulk data storage are not permitted at grade, except for entrances." | | | | | | 2.2.4 | 95 |
| Storey height | first floor ≥ 6.0 m (all; may be decreased) | | | | | | 3.x.2.5–6 | 95 |
| Non-industrial caps | A: office 6.75, hotel 4.00, retail/service 1.00; E: other uses 1.00, office ≤ 33 % (2.00 with 0.50 of listed uses), retail ≤ 1,000 m²; Restaurant 1 and 2 each ≤ 300 m² (all) | | | | | | 3.1.1.1, 3.4.1.2 | 90 |
| Amenity exclusion | child day care and non-profit recreation: lesser of 20 % or 1,000 m²; interior public space lesser of 10 % or 600 m² | | | | | | 4.1.3 | 90 |
| Max width / depth | none | | | | | | — | 90 |

Source id for all FC-2 rows: van_zdb_fc2. "3.x" = the same clause number in each sub-area's section (3.1 A–B, 3.2 C1, 3.3 C2–D, 3.4 E). The tool does not yet know the sub-area of a lot (zones.json note).

### 1f. CD-1, 111 E 5th Ave and 2060 Quebec St (proposed; enacted ?)

Kind: government report (proposed by-law provisions, "subject to change and refinement prior to posting").

| what | value | where | source id | conf. |
|---|---|---|---|---|
| Uses | incl. Transportation and Storage Uses; "Energy Utility Use" (waste heat infrastructure to the NEU) | RTS 19744 pp. 7–8, provisions 3–4 | van_rts19744 | 80 |
| FSR | 3.0 all uses; industrial ≥ 2.0; restaurant ≤ 500 m²; above-grade ≤ 8,305 m²; staff would support 4.2 by text amendment | provisions 6.2–6.5; p. 5 | van_rts19744 | 80 |
| Mechanical floor area | heating/mechanical exclusion does **not** apply to "heating or mechanical equipment related to bulk data storage use"; energy utility use excludable to 279 m² | 6.8(c)(iii), 6.9(b) | van_rts19744 | 80 |
| Height | 20 m; mechanical appurtenances may exceed it (Director) | 7.1–7.2 | van_rts19744 | 80 |
| Status | Council meeting 14 Jul 2026 (referral to public hearing); enactment ? | p. 1 | van_rts19744 | 60 |

## 2. Edmonton (Bylaw 20001 as adopted; amendments since 1 Jan 2024 not checked ?)

Common to all Edmonton zones below:

| what | value | clause | source id | conf. |
|---|---|---|---|---|
| Use | data centre not a defined use; small = Minor Industrial, AI = Major Industrial (City); deemed use "always considered a Discretionary Use" | 7.20 3.3.2 | edmLDA26; arch_zon_Edm720 | 85 |
| Variance limit | Development Planner "must not vary … maximum Height, maximum Floor Area Ratio or maximum Density regulations, except as otherwise stated in this Bylaw" | 7.100 6.1.1 (p. 972) | arch_mun_edm7100 (add s. 6) | 90 |
| Rooftop equipment | no Height limit for "ventilating equipment, plumbing stacks, and mechanical penthouse", "water or other tanks", chimney stacks, elevator housing; flat-roof parapet top ≤ 0.4 m over max. Height | 5.70 1.8, 1.9 (p. 825) | arch_zns_edm570 | 90 |
| Rooftop chillers / dry coolers | not named; fit "ventilating equipment" or "other similar architectural features" ? (our reading) | 5.70 1.9.5, 1.9.10 | arch_zns_edm570 | 50 |
| Loading | 0 spaces under 2,500 m², 1 for 2,500–7,500 m², 2 above 7,500 m²; 9.0 × 3.0 m, 4.0 m clearance | 5.80 | edmZB580 | 80 |
| Storey heights | none found in any zone below | — | edm_bl20001 | 80 |
| Site coverage | none in standard and EETP/Ellerslie zones ("coverage" not in their text); IBES/ILES 80 % | — | edm_bl20001 | 85 |
| Max width / depth | none found | — | edm_bl20001 | 80 |

### 2a. BE Business Employment (s. 2.120, pp. 103–108)

| what | value | clause | source id | conf. |
|---|---|---|---|---|
| Use | Minor Industrial P (2.3), "within an enclosed building" except loading, waste, storage (3.2.1) → data centre D | 2.3, 3.2.1 | arch_zon_EdmZones | 90 |
| FAR / approval | 1.6 / no variance (7.100 6.1.1) | Table 4.1.2 | arch_zon_EdmZones | 90 |
| Height / approval | 16.0 m / no variance | 4.1.1 | arch_zon_EdmZones | 90 |
| Street setback | 6.0 m; 4.5 m on a Collector or Local Road | 4.1.3–4 | arch_zon_EdmZones | 95 |
| Side / rear | 0 m to Sites and Alleys; 6.0 m to a Site in a residential Zone | 4.1.5–7 | arch_zon_EdmZones | 95 |
| Ground floor | ≤ 10 % of Ground Floor street windows non-transparent; main entrances visible from Street | 5.3.1–2 | arch_zon_EdmZones | 90 |
| Non-industrial caps | 500 m² per establishment for Bars, Food and Drink, Health Service, Major Indoor Entertainment, Indoor Sales and Service, Community Service; variance with mitigation (3.18) | 3.3.1, 3.7.1, 3.12.1, 3.18 | arch_zon_EdmZones | 90 |
| Equipment | "All mechanical and electrical equipment, transformers, ducts, cooling towers … must be screened from view from Abutting Streets and Sites in non-industrial Zones" | 5.2 | arch_zon_EdmZones | 95 |
| Facade | wall > 25.0 m facing a Street or non-industrial Site: 2+ articulation techniques | 5.1 | arch_zon_EdmZones | 90 |
| Loading | not in a Setback; not between building and Street; screened | 5.4, 5.8 | arch_zon_EdmZones | 90 |

### 2b. IM Medium Industrial (s. 2.130, pp. 109–113)

| what | value | clause | source id | conf. |
|---|---|---|---|---|
| Use | Minor Industrial P; Major Industrial only "existing as of January 1, 2024" → small data centre D; AI data centre no (our reading) | 2.3–2.4 | arch_zon_EdmZones; edmLDA26 | 85 |
| FAR / approval | 2.0 / no variance | 4.1.2 | arch_zon_EdmZones | 90 |
| Height / approval | 18.0 m / no variance | 4.1.1 | arch_zon_EdmZones | 90 |
| Setbacks | Street 3.0 m; Alley 0 m; Site in a non-industrial Zone 6.0 m; industrial Site 0 m | 4.1.3–6 | arch_zon_EdmZones | 95 |
| Non-industrial caps | display, office, technical, admin, retail ≤ 33 % of Minor Industrial floor area (not if > 50 % of Site is outdoor industrial); Office ≤ 300 m² per establishment | 3.2.1, 3.5.1 | arch_edmZB20001_IM | 90 |
| Ground floor | none | — | arch_zon_EdmZones | 85 |
| Storage / loading | not in Setback; storage and service not between building and Street, screened (≤ 3.7 m) unless Local Road or abutting Site is IH/IM | 5.1–5.3 | arch_zon_EdmZones | 90 |
| Other | Risk Assessment, EIA or Environmental Assessment Information may be required | 5.5 | arch_zon_EdmZones | 90 |

### 2c. IH Heavy Industrial (s. 2.140, pp. 114–116)

| what | value | clause | source id | conf. |
|---|---|---|---|---|
| Use | Major Industrial P; Minor Industrial only existing at 1 Jan 2024 → AI data centre D; small one only if deemed Major ? | 2.1–2.2 | arch_zon_EdmZones; edmLDA26 | 80 |
| Minimum site | 1.0 ha | 4.1.1 | arch_zon_EdmZones | 95 |
| FAR / approval | 2.0 / no variance | 4.1.3 | arch_zon_EdmZones | 90 |
| Height / approval | 30.0 m / Development Planner "may vary the maximum Height to accommodate building features that are necessary to the operation" (no cap stated) | 4.1.2, 4.2 | arch_zon_EdmZones | 90 |
| Setbacks | Street 3.0 m; Alley or abutting Site 0 m | 4.1.4–5 | arch_zon_EdmZones | 95 |
| Non-industrial caps | display, office, technical, admin, retail ≤ 33 % of industrial floor area (unless > 50 % outdoor) | 3.1.1 | arch_zon_EdmZones | 90 |
| Storage / loading | as IM 5.1–5.2 | 5.1–5.2 | arch_zon_EdmZones | 90 |

### 2d. EETP zones (s. 3.50–3.56, pp. 451–475)

Plan context: City engagement on an EETP plan amendment to allow data centres (proposal, not current zoning; edm_dcpage, edmLDA26). Commercial uses "must only be located" on a highway/Arterial/service/Collector Site, a Corner Site or beside an existing Commercial Use (EETB 4.5, EETL 4.1, EETM 4.1).

| what | EETB | EETC | EETL | EETM | EETIM | source id | conf. |
|---|---|---|---|---|---|---|---|
| Minor Industrial | P (2.7) | P only in 1.5 km Risk Buffer (2.2, 4.1) | P (2.4) | P (2.2) | P (2.1) | arch_zns_edmEETP | 90 |
| Major Industrial | — | P; no significant nuisance in Risk Buffer (2.1, 4.2) | — | — | — (City: large AI data centre not allowed now, edmLDA26) | arch_zns_edmEETP | 90 |
| FAR | 1.2 | ? not in Table 5.1 | 1.5 | 2.0 | 2.0 | arch_zns_edmEETP | 90 |
| Height / approval | 14.0 m / none | ? none in table | 14.0 m / 18.0 m (5.2) | 18.0 m / 22.0 m (5.2) | 18.0 m / 22.0 m (5.2) | arch_zns_edmEETP | 90 |
| Minimum site | — | 1.0 ha | — | frontage 30.0 m on major Collector+ | — | arch_zns_edmEETP | 90 |
| Street / front | 6.0 m any Street | 3.0 m; Planner may require more (5.2) | front 6.0 m; 3.0 m on non-Arterial/Collector | same as EETL | same as EETL | arch_zns_edmEETP | 90 |
| Side / rear | ? not stated | ? | 0 m | 0 m | 0 m | arch_zns_edmEETP | 85 |
| Next to residential | Nuisance mitigation next to Religious Assembly (7.3) | — | 6.0 m landscaped berm (7.3) | 6.0 m landscaped berm (7.3) | berm sized by Planner, also across a Street or waterway (7.4) | arch_zns_edmEETP | 90 |
| Rooftop equipment | "All mechanical equipment, including roof mechanical units, must be concealed" (6.2.4) | — | concealed (6.2.4); exposed cooling towers etc. screened if Planner requires (7.2) | concealed (6.2.4) | cooling towers etc. screened from Street and adjacent Sites (7.6) | arch_zns_edmEETP | 90 |
| Loading | rear or sides, screened; no outdoor storage (7.1–7.2) | rear or side; front allowed for indoor goods handling (6.1) | rear or sides, screened (7.1) | rear or sides (7.2) | rear or sides (7.1) | arch_zns_edmEETP | 90 |
| Enclosed | — | — | "where possible" (7.5) | — | all uses enclosed except outdoor storage (7.5) | arch_zns_edmEETP | 90 |
| Non-industrial caps | Food and Drink ≤ 240 m² public space, 200 occupants (4.6) | — | — | — | Specialty Food ≤ 120 m², 100 occupants; nodes: ≤ 275 m² per business except Minor Industrial, node FAR 1.0, 10.0 m, site ≤ 2.0 ha (6.4–6.6) | arch_zns_edmEETP | 90 |
| Blank walls | "not permitted" facing Streets (6.2.7) | — | same | same | — | arch_zns_edmEETP | 90 |

### 2e. Ellerslie zones (s. 3.180–3.182, pp. 785–793)

| what | EIB | EIM | source id | conf. |
|---|---|---|---|---|
| Minor Industrial | P, "not including Fleet Services and Recycling Depots" (2.6); purpose names "high technology developments" | P, same (2.3) | arch_zns_edmEllerslie | 90 |
| FAR | 1.2 | 2.0 | arch_zns_edmEllerslie | 90 |
| Height / approval | 12.0 m / up to 14.0 m "to accommodate building features that are necessary to the operation of a proposed Minor Industrial Use" (5.3) | 18.0 m / none | arch_zns_edmEllerslie | 90 |
| Setbacks | 6.0 m to a Street, commercial or residential Zone, stormwater facility or private open space corridor; 0 m otherwise | Street 3.0 m; Alley or Site 0 m | arch_zns_edmEllerslie | 90 |
| Frontage | 30.0 m on a major Collector or Arterial (no service road) | — | arch_zns_edmEllerslie | 90 |
| Equipment | mechanical, electrical, transformers, cooling towers screened from Streets and non-industrial Sites (6.2) | — | arch_zns_edmEllerslie | 90 |
| Facade | wall > 25.0 m facing Collector/Arterial articulated (6.1) | — | arch_zns_edmEllerslie | 90 |
| Loading / storage | not in Setback; screened 1.8 m from adjoining Site (6.3, 6.5) | not in Setback; rear or sides, screened 1.8–3.7 m unless IH/IM (6.1–6.4) | arch_zns_edmEllerslie | 90 |
| Non-industrial caps | Bars/Food and Drink beside residential: 200 occupants, 240 m²; must serve the industrial or office project (4.1–4.2) | — | arch_zns_edmEllerslie | 90 |

### 2f. Alternative reading only: Edmonton South IBES, ILES (s. 3.65–3.66, pp. 526–534)

| what | IBES | ILES | source id | conf. |
|---|---|---|---|---|
| Use | Information Service P (2.13): "producing and distributing information in a digital or printed format and includes data processing" | Information Service P (2.19); also "Industrial, Light" P | arch_zns_edmSouth | 50 (fit ?) |
| Height | 6 storeys; near an airport, federal airport zoning governs | same | arch_zns_edmSouth | 85 |
| Setbacks | 7.5 m to any Road; side next to residential 15.0 m (single storey) or 30.0 m (multi-storey); rear 1.2 m | 7.5 m to any Road; side 0 m; rear 1.2 m | arch_zns_edmSouth | 85 |
| Site coverage | ≤ 80 % | ≤ 80 % | arch_zns_edmSouth | 90 |
| FAR | ? none stated | ? | arch_zns_edmSouth | 60 |
| Rooftop | "Roof-top mechanical equipment and mechanical penthouses Shall be screened from view" (IBES 7.25) | same (ILES 7.16) | arch_zns_edmSouth | 85 |
| Loading | side or rear only, screened from public roadways | same | arch_zns_edmSouth | 85 |

UC3ES also lists Information Service (P, 2.7); rules not read. DC/IND Edmonton South: uses set by plan or Council resolution (3.68 s. 2.1); site-specific DC1/DC2 provisions: not read.

## 3. Programs in the new zones (catalogue ids, tool/arch_programs.json)

Existing zoning entries cover I-2, I-3, I-1C, FC-2, BE, IM, IH (zoning.md). New zones only. P = permitted, D = discretionary, — = not listed (needs rezoning/DC). Use names as each zone lists them; mapping a program to a use is our reading where marked "r".

| program | EETB | EETC | EETL | EETM | EETIM | EIB | EIM |
|---|---|---|---|---|---|---|---|
| refuge, warming_shelter, winter_garden (Community Service) | — | — | — | — | — | — (Community Service D only for indoor participant recreation, religious assembly, 3.14) | — |
| pool (Community Service, recreation r) | — | — | — | — | — | D r (indoor participant recreation, 3.14.1) | — |
| gym (Minor Indoor Entertainment) | — | — | — | — | — | D (3.8) | — |
| clinic, therapy_pool (Health Service) | — | — | — | — | — | D, on major Collector+ (3.6, 4.3) | — |
| aquarium, conservatory (Major Indoor Entertainment) | — | — | — | — | — | — (nightclubs only, 3.7) | — |
| greenhouse, fish_farm (Urban Agriculture) | D (3.11) | — | D (3.7) | D (3.10) | ? (rules 4.4 but not in use lists) | D (3.17) | P (2.6) |
| food_drying, lumber_drying, laundry (commercial) (Minor Industrial r) | P | P in Risk Buffer only | P | P | P | P | P |
| laundry (laundromat: Personal Service Shop r) | D (3.8) | — | — | — | node only ? (Indoor Sales and Service, 6.3.2) | D (3.1.7) | — |
| public_ground café (Food and Drink / Specialty Food Service) | Specialty P (2.6); Food and Drink D (3.9) | — | Specialty P; Food and Drink D | Food and Drink D | Specialty D (≤ 120 m²); node P | D (3.5) | — |
| community_kitchen (Custom Manufacturing ? r) | — | — | — | — | — | P (2.2) | P (2.1) |
| heat_plant (Minor Utility) | P (2.9) | P (2.5) | P (2.6) | P (2.4) | P (2.2) | — (not listed) | — (not listed) |
| ev_hub (Vehicle Support Service ? r) | D (3.10) | — | D (3.5) | D (3.2) | node P | P (repair excluded, 2.5) | D (3.2) |
| covered_plaza (Special Event only) | P temp. | P temp. | P temp. | P temp. | node | P temp. | P temp. |
| childcare (Child Care Service) | — | — | — | — | — | D, must serve the industrial or office project (3.13, 4.8) | — |
| housing | — | — | — | — | — | — | — |

Source ids: arch_zns_edmEETP (EET columns), arch_zns_edmEllerslie (EIB, EIM). Vancouver I-2 sub-area B: program uses are the same rows as I-2 (zoning.md), checked against the I-2 use table; only Dwelling Unit, Gasoline Station, Mini-Storage and Artist Studio carry sub-area limits.

## 4. Gaps ("?")

- **Vancouver schedules not read** (proxy 403, not circumvented): I-1, I-1B, I-4, IC-1–3, M-1, M-1A, M-1B, M-2, MC-1/2, FC-1, DD (Downtown ODP), HA. Their "not listed" status rests on vanDistricts (?).
- **CD-1 by-laws:** only RTS 19744 found. Other CD-1s naming Bulk Data Storage: ? (cd1-bylaws.vancouver.ca index saved as van_cd1, by-law texts not reachable). 111 E 5th enactment: ?
- **I-1C currency:** Nov 2025 copy; June 2026 version ?
- **Edmonton amendments** since 1 Jan 2024 to BE/IM/IH and the special areas (esp. EETP data-centre amendment, file LDA26-0225 ?): not checked. The Oct 2026 matrix matches the adopted text for Minor/Major Industrial in standard zones.
- EETC FAR and height: none in Table 5.1 (?); EETB/EETC side and rear setbacks not stated (?).
- EETIM Urban Agriculture: regulated in 4.4 but absent from the use lists (?).
- Whether Edmonton treats rooftop chillers/dry coolers as height-exempt "ventilating equipment" (?).
- Vancouver: whether Section 10.1.1(b) has a practical metre cap for mechanical equipment (no cap in text).
- Edmonton DC1/DC2 provisions naming data centres: not searched.
