# Architecture mode, first-version research: summary (30 Oct 2026)

Check 1 only (four research agents; sources in the register with check records). Check 2 open. "?" = not found or not confirmed.

| Program | Size and steps | Heat | Key rules | Gaps |
|---|---|---|---|---|
| Refuge | 3.5 m² per person (AHS reception centres), up to 9 m² for extra needs; cold-climate benchmark 4.5–5.5 (UNHCR); 1 toilet per 20–25 people | 19–22 °C warming; ≤26 °C cooling (VCH; check 2: that 26 °C is a long-term-care trigger, used here outside its scope ?); clean air: MERV 13+ (recommended, not required), emergency power, vestibule, generators downwind of intakes (Health Canada) | Assembly occupancy (code densities 0.75–1.85 m² per person) | Cooling/clean-air capacities; peak W/m² |
| Public ground floor | VPL branches 10,000–25,000 ft²; EPL policy | Vancouver new-building limit 20 (30 with low-carbon system) kWh/m²·yr; existing libraries ≈160 (our arithmetic) | Edmonton BE: community uses ≤500 m² each; IM: none. Vancouver I-3 ground-floor clause confirmed in the 2022 draft only | Adopted I-3 text; minimum sizes |
| Pool | 25 m lanes; smallest community pool 25 × 8.5 m = 212.5 m² (Sport England, UK); Edmonton Eastglen 25 × 13 m; gross ≈5.8 m² per m² of water (our arithmetic); plant room ⅓–½ of water area | 27–30 °C by use (Carbon Trust); BC limit ≤37 °C; 4,300–5,200 kWh/m²·yr (basis unclear ?); evaporation ⅔ of water heat loss | BC Pool Regulation 296/2010; deck ≥1.2 m | Peak per m² of water; Swimming Canada standard; therapy pool temperatures |
| Laundry | ? (throughput and area not found) | 5–6 L water per kg; ≤2.0 kWh/kg small, ≤0.9 large (EU); healthcare wash 71 °C, 25 min (US CMS) | Metro Vancouver: no discharge at ≥65 °C | Floor area; minimum size; data-centre precedent; Edmonton drainage clause |
| Greenhouse | ? (minimum and community sizes not found) | Peak ≈92 W/m² of cover in Vancouver (our arithmetic from EP406); 1.5–2.1 GJ/m²·yr on the Prairies; supply 35–55 °C, so a heat pump; no CO2 from a data centre | Sun: south exposure | Vancouver annual; cover-to-floor ratio |
| Roof and facade solar | yields already in the tool | — | Vancouver: 2 ft from roof perimeter; flat-roof and wall panels need a full permit. Alberta Infrastructure: 3 m perimeter, 1.2 m between rows | BCBC facade PV clause |

## Spatial rules found
- Combustion exhaust 3 m from air intakes, doors, operable windows and outdoor spaces people use (NBC/BCBC/NBC(AE) 6.3.3.1.(2)); that it covers generator exhaust is our reading (?).
- Air intakes 7.6 m from a truck loading dock (Table 6.3.2.9).
- Metro Vancouver Bylaw 1329: exhaust away from openings and intakes (s. 13, no distance); no Tier 0/1 engines within 100 m of a hospital, elementary school, day care or community care facility (s. 57).
- Fire separations (Table 3.1.3.1): industrial F-2 to assembly, pools, housing 2 h; F-3 to assembly and housing 1 h; F-2 or F-3 next to shops (E): none required (corrected in check 2). An F-2 building may hold only one dwelling suite. Assembly may sit above industrial floors (3.2.2.7).
- Which group a data centre falls in (F-2 or F-3) has no Canadian guidance found (?): it turns on fire load (50 kg/m²).
- Childcare: Edmonton s. 6.40 (no site next to a Major Utility; play space 2 m from mechanical equipment and exhaust); Vancouver guideline (no exhaust beside play areas; 3 h of winter-solstice sun).
- Loading: Edmonton puts loading at the rear or sides, never between building and street.
- Noise by-laws measure at the property line; nothing found for windows on the same lot (one Vancouver CD-1 sets 35/40/45 dBA inside dwellings).

## Paywalled (UBC Library)
ASHRAE 62.1 Table 5-1; CSA C282; CSA B139; NFPA 37 full text.

## Round 2 (31 Oct 2026): zoning.md, separations.md, gaps_round2.md

- **Zoning:** data centres are conditional in Vancouver I-2, I-3 (sub-area A), I-1C, FC-2; I-3 s. 2.2.11 (adopted June 2026): no bulk data storage at the ground floor except entrances. Edmonton has no data-centre use: deemed Minor or heavy industrial, always discretionary (BE, IM, IH). Other uses in Vancouver I-2/I-3 share ≤1.00 FSR. Programs by zone: see zoning.md (e.g. Edmonton BE allows community, recreation, laundromat ≤500 m² each; IM and IH allow almost none; Vancouver allows urban farms in all four, no pool use listed, housing only in FC-2 sub-areas and not at grade).
- **Separations:** fuel correction (tanks over 2,500 L follow NFC Part 4); tanks 3 m from property lines and buildings (1.5 m up to 50,000 L, Alberta 80,000 L); batteries 3 m from exits, 1.5 m from openings (electrical code via Alberta STANDATA); fuel truck left over 1 h: 15 m from buildings; cooling towers need a Vancouver operating permit, no distance rule; no BC/AB distance rule for generators beyond Bylaw 1329's 100 m (US benchmarks: Washington 120–400 m to housing by run hours; California notice within 1,000 ft of a school); no Canadian EMF distance.
- **Gaps filled:** greenhouse ≈99 W/m² of floor peak (Lower Mainland, Chau 2009), cover-to-floor ≈1.55; Swimming Canada lanes 2.5 m (1.8 club), 25–28 °C; therapy pools 32–36 °C; institutional laundry ≈386 m² net for 1–100 beds (US VA); laundromats 1,000–5,000 ft² (trade association claim).
- **Still ?:** pool peak W/m² of water and supply temperature; Canadian laundry sizes; Edmonton consolidation clause; cooling/clean-air capacities.

## Check 2 (31 Oct 2026): first independent agent check
136 sources re-read: 624 claims confirmed, 26 wrong (corrected), 16 not found in the source, 6 unreachable; 51 source texts corrected, 16 kind labels changed. Key corrections: fire separations to shops (none), Alberta tank distance 80,000 L, ASHRAE 62.1 generator dilution factor is 2000 × e (400 with an 80 % odour filter), Bylaw 1329 definitions in s. 4, NBC dining 1.20 m² per person, VCH 26 °C scope. Results: check2_result_0..3.json.

## Check 3 (31 Oct 2026): second agent round
88 sources check 2 had changed or flagged, re-read by a third agent: 191 items agree with check 2, 14 disagree (all minor: pages, titles, citation details; e.g. Li 2021 and Weidner 2021 citations were right after all), 6 still unreachable (Vancouver PV permit criteria S009_b; Graamans journal record). 23 texts updated, 6 kind labels. Results: check3_result_0..1.json.
