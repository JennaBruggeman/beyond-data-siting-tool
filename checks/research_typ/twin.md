# Typology 8: Twin (4 Nov 2026)

An overnight shelter (Group C) in its own building on the data centre's lot. Variant: a refuge in its own building.

Check 1 only. Ids: register ids reused; new ids `typ_twin_*` in twin_sources.json. "?" = not found. "Our arithmetic" / "our reading" labelled. Tool runs = `checks/golden/arch/*_arch.json`, tool results, not sources.

---

## Short answer

- Size: overnight shelter **≈140–161 m²** gross for 16 guests; refuge variant 264–304 m² (our arithmetic).
- Why its own building: sleeping is Group C, and an F-2 building may hold "not more than one suite of residential occupancy" (3.1.3.2.(2)).
- Separation: limiting distance to an imaginary line between the two buildings (NBC Tables 3.2.3.1.-B to -E), or a 4 h masonry/concrete firewall if joined.
- **Vancouver: blocked as of right.** One principal building per site (10.34.1); no listed use for an overnight shelter. New finding: I-3 2.2.13 allows accessory buildings outright, but only if "customarily ancillary", ≤3.7 m high, in the rear yard, ≤10 % of site area. Our reading: a shelter is not ancillary to a data centre, so rezoning.
- **Edmonton BE: fits.** Seasonal and Year-round Shelters are Community Service, permitted ≤500 m². No one-building rule found.
- No precedent of a shelter beside a data centre was found.

---

## 1. Program list and room schedule (overnight, 16 guests)

| part | net m² | source | kind |
|---|---|---|---|
| Sleeping, 16 × 3.7 (VBBL temporary shelter, 900 mm aisles) | 59.2 | arch_ref_vbblPart13 13.4.4.1.(1)(c),(d) | rule (temporary use of existing buildings only) |
| Sleeping benchmark: ≥3.5 m² per client, beds 0.75 m apart | (56) | arch_sup_torTSS2022 9.3.1(c),(e) | gov. standard (ON) |
| Dining / day room, separate from sleeping, 16 × 1.20 | 19.2 | arch_sup_torTSS2022 9.3.1(a); arch_pub_nbc31171 | standard + our arithmetic |
| Washrooms 2 × 4.6 (Toronto 1 WC per 15) | 9.2 | arch_sup_torTSS2022 9.3.2; arch_sup_abGFNARooms Z-7 | standard + analogy |
| Universal dressing and shower room (1 shower per 20) | 6 | arch_sup_nbcWashrooms 3.8.2.8.(13); arch_sup_eastglenRooms p. 47 | rule + analogy |
| Laundry | 6 | arch_sup_eastglenRooms p. 46 | analogy |
| Staff office (2 staff + 1 guard, Van) | 8 | arch_sup_eastglenRooms; arch_pub_vanWarm2021 | analogy |
| Lockers, servery, storage | ? | arch_sup_torTSS2022 9.3(b) (no m²) | — |
| **Net** | **107.6** | sup_care.md §2b | our arithmetic |
| **Gross** × 1.3–1.5 | **140–161** | arch_edmEastglen2017 p. 23 | our arithmetic |

Refuge variant (50 people): 264–304 m² gross (sup_care.md §1).

**Sharing with the data centre:** none on the lot is sourced. The twin needs its own washrooms, office and entrance. Possible shared items (our reading, no source): fire-route access, drop-off, the generator set (§4). Net saving: 0 m² until sourced.

## 2. Adjacency and stacking

**Separation options:**

| option | rule | source |
|---|---|---|
| Spaced apart | "Limiting distance means the distance from an exposing building face to … an imaginary line between 2 buildings or fire compartments on the same property" | NBC Div. A 1.4.1.2 (typ_twin_nbcLimitingDist) |
| | Openings by limiting distance: Table 3.2.3.1.-B/-D for Group C (shelter); -C/-E for F-2 (data centre). At 0 m, 0 % openings. E.g. sprinklered F-2 face of ≥200 m²: 10 % at 3 m, 50 % at 10 m, 100 % at 15 m | NBC 3.2.3.1, Table 3.2.3.1.-E (typ_twin_nbc3231) |
| | Exposing face with ≤10 % openings: F-2 needs 2 h, noncombustible; Group C needs 1 h | NBC Table 3.2.3.7 (typ_twin_nbc3237) |
| | Limiting distance <1.2 m: openings need rated closures; no wired glass | NBC 3.2.3.5 (typ_twin_nbc3231) |
| Joined | firewall **4 h** (F-2 on one side), masonry or concrete, continuous from the ground through all storeys | arch_hsg_nbcFirewall 3.1.10.2–3 |
| Same building | **not allowed** for a dormitory over one suite (F-2: one residential suite max) | arch_hb_nbc3131 3.1.3.2.(2) |

The tool can place the imaginary line anywhere between the two (our reading of the definition). Where to put it is a design trade: a line close to the hall forces a blank 2 h hall wall; close to the shelter, a 1 h blank shelter wall.

**Placement:**
- Own street entrance (arch_up_vanZDB10 10.21.1); drop-off 4.0 m wide, 3.5 m clear (arch_svc_vanPkg7).
- Outside the secure line; can open while the hall is locked (no rule requires it; tool flags).
- Keeps its own seismic category (Note A-4.1.2.1.(3), arch_ref_nbcT4121).
- Generators away and downwind of its intakes (arch_hcCleanerAirSpaces); intake ≥3.0 m from the genset exhaust, ≥7.6 m from the truck dock and evaporative discharge (arch_nbc6329; arch_nbc63215).
- Nothing wet over the hall is automatically met (separate building).

## 3. Heat

| item | value | source |
|---|---|---|
| Set point | 19–22 °C (reception centre) | arch_ahsReceptionCentres p. 4 |
| Supply | radiant 45/35 °C (Van NEU); ≤49 °C design (Blatchford) | arch_tmp_vanNEU2020; arch_tmp_edmDESS2025 |
| Load | ? (no shelter figure). Proxy: 160 kWh/m²·yr (existing library stock) → 140–161 × 160 = **22–26 MWh/yr** (our arithmetic, proxy) | refuge_publicfloor.md |
| Showers, DHW | 60 °C (NEU DHW); volume ? | neuConnect; prog_housing.md |
| Hall heat | liquid-cooled 50–60 °C serves radiant directly; DHW at 60 °C needs a small lift; air-cooled 25–35 °C needs a heat pump for both (our reading) | heat_temp |

A buried pipe between the two buildings is needed (length, losses: ?). Hall offers 14,252–21,878 MWh/yr at E06B (tool run): heat is not a limit.

## 4. Plant layout

- Power to the twin: BC owner or tenant only (bcUCAs1); Alberta self-supply on the same property (euaS2); EPCOR: no wiring beyond the property (epcorTC2025s44). C282 allows a set on the same property or on an adjoining one (paraphrase of a partial quote; full clause ?) (arch_csa_c282 6.1.1.1). Feeding a second building: CSA C22.1 (paywalled, ?).
- Generator yard on the far side of the hall from the twin. Yard tanks 3.0 m from the property line, 1.5 m from a building (arch_csa_b139 Table 2); diked tank 7.5 m from a noncombustible building (arch_up_fm0788, insurer); parked fuel truck 15 m (arch_sep_nfcTankVeh).
- Metro Vancouver: Tier 0/1 engines ≥100 m from a "community care facility" (arch_mv1329 s. 57). Whether an unlicensed shelter counts: ? (our reading: the by-law's term reads like a licensed facility; not confirmed).
- Noise: property-line limits (bylaw6555; arch_adj_edm14600) do not protect a building on the same lot (our reading). Sleeping rooms facing the yard: no sourced indoor limit (?).
- Default layout (E06B): twin on the street edge at one corner; hall behind; generator yard and loading at the opposite side or rear (BE 5.8: loading not between building and street).

## 5. Zoning and approvals

| zone | overnight shelter | own building | source |
|---|---|---|---|
| Van I-3 | no listed use. Social Service Centre "does not include premises used for residential purposes". Possible route: 2.2.15 "any other use not specifically listed and defined … conditional … if the Director of Planning considers the use to be comparable" (?) | "No more than 1 principal building … on any 1 site" (10.34.1). Accessory building outright only if "customarily ancillary", ≤3.7 m (4.6 m max), rear yard, ≥3.1 m from lane centre line, floor area ≤10 % of site area (2.2.13) | arch_ref_vanSec2SSC; typ_twin_vanI3Accessory; arch_up_vanZDB10 |
| Van I-2 | same | 10.34.1; accessory building outright (2.2.11, ≤3.7 m, ≤10 % of site) or **conditional** if not outright | typ_twin_vanI2Accessory |
| Van FC-2 | same | 10.34.1; accessory 2.2.9 (same limits as I-3) | typ_twin_vanFC2Accessory |
| Van, all | Accessory Building = use "ancillary to that of the principal building … on the same site". Our reading: a shelter is a principal use, not ancillary to a data centre → **rezoning (CD-1)** | | typ_twin_vanS2Accessory |
| Edm BE | **P**: Community Service includes "Seasonal Shelters, and Year-round Shelters"; ≤500 m² per establishment (3.12.1). Adopted text: no shelter exception; online text: "except" shelters (conflict, ?) | no one-principal-building rule found in BE or s. 5.10 headings read (?) | typ_twin_edmShelterDefs; arch_zon_EdmZones; arch_edmZB20001_BE |
| Edm IM, IH | NP | — | zoning.md §2 |
| Edm EIB | NP (Community Service D only for recreation, religious assembly) | — | arch_zns_edmEllerslie |

Refuge variant in its own building, Vancouver: refuge is a listed conditional use, but the building is still a second principal building (10.34.1): same block.

## 6. Precedents

| precedent | what it shows | kind |
|---|---|---|
| Shelter in its own building beside a data centre | **none found** | — |
| Fire Hall No. 5 + YWCA housing, Vancouver (2019) | the opposite choice: sleeping use joined to an essential-service building in one six-storey CD-1 building, separate entries (typ_emergency_hub_vanFireHall5Report) | gov. |

## 7. Fit (plant-included tool runs; our arithmetic)

| | V339 (I-3) | E06B (BE) |
|---|---|---|
| Twin share | — | 140–161 m² = 2.0–2.3 % of 6,854 m²; refuge variant 3.9–4.4 % |
| Data centre (tool) | — | 35 %, 2,399 m², 3.7 MW |
| Ground used | — | one storey, ≈140–161 m² footprint (height ?) out of 4,022 m² buildable |
| Limits | **blocked**: 10.34.1 and no shelter use. Even as an accessory building: ≤450 m² (10 % of 4,503, our arithmetic), one storey ≤3.7 m, rear yard only, and must be "customarily ancillary" | street setback 6.0 m (4.5 m if Collector/Local, Airport Rd class ?); limiting distance eats lot depth; the generator yard already limits the hall ("2 of 4 generators do not fit in the yard" on one placement) |
| Fits? | no, rezoning | yes |

Other lots: 1425 Clark Dr (I-2) blocked as V339. E05 (IM), 12603 123 St NW (IH): Community Service NP, blocked.

## 8. Gaps and open questions

- Vancouver: does 2.2.15 admit an overnight shelter as a comparable use? Section 11 (temporary uses) not read.
- Edmonton: any one-building or separation-space rule for non-residential sites (s. 5.10 Accessory not read in full); BE shelter cap exception (adopted vs online).
- Is an unlicensed shelter a "community care facility" under Metro Vancouver s. 57?
- Shelter heat load, storey height (Toronto Shelter Design Guidelines s. 5.3.1 not reached).
- CSA C22.1 on feeding a second building.
- Indoor noise limit for sleeping rooms next to a generator yard: ?
- Where the imaginary line sits is not set by code (AHJ may accept by agreement, refuge_placement.md §2).
