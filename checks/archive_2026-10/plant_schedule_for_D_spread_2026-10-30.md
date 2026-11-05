# The plant: what the power chain takes up. Starting data from the Beyond Data tool (30 Oct 2026)

For the other chat. The tool already sizes and places most of this plant on each site. The figures below are the tool's own, from its source register, worked out at **2.5 MW and 5 MW of servers**. They assume air-cooled halls, air-cooled chillers, generators in the yard and one spare unit (N+1).

How to read the labels:

- **"maker claim"** is a manufacturer's data sheet.
- **"?"** means the item isn't sourced or isn't verified yet.
- **"Checked twice"** means two independent readers checked the source; "once" means one did.

**How the plant is sized:** heat to reject is about the server load × PUE 1.55, which is 3.9 MW at 2.5 MW and 7.75 MW at 5 MW. 1.55 is the high end of the tool's 1.4–1.55 range: 1.4 is the US average (LBNL 2023) and 1.54 the global average (Uptime 2025, an industry survey). The plant is sized at the high end on purpose. The generators carry the cooling as well as the servers, which comes from one site (LBNL 2007).

## Equipment, count and size

| Item | 2.5 MW | 5 MW | Each unit (L × W × H) | Clearances used | Source |
|---|---|---|---|---|---|
| Standby generators, 2 MW, in sound enclosures with sub-base fuel tanks | 3 (2 + 1 spare) | 5 (4 + 1) | 13.49 × 3.49 × 4.78 m | 1.5 m to walls and openings (NFPA 37, US); 2 m between sets (derived from a 1 m service clearance, not verified ?) | Rehlko KD2000 G5-626 (maker claim); checked twice |
| Air-cooled chillers with free-cooling coils, 1.49 MW | 4 (3 + 1) | 7 (6 + 1) | 12.14 × 2.36 × 2.90 m | 0.9 m end to wall, 2.1 m side to wall; 1.8 m end to end, 4.3 m side to side (EVAPCO dry-cooler layout; the chiller sheet gives none) | Vertiv Liebert AFC FIZ135, "preliminary data" (maker claim) |
| Transformers, 2,500 kVA, oil-filled | 3 (2 + 1) | 5 (4 + 1) | 2.26 × 2.39 × 2.08 m (5/15 kV); 2.63 × 2.49 m footprint at 25/35 kV, which BC Hydro may require (?) | the utility's pad clearances are not in the register (?); EPCOR's construction guide has a padmount section, not yet extracted | Eaton CA022021EN, Table 14.1-20 (a design guide) |
| UPS frames, 1 MW | 4 | 6 | 3.60 × 0.90 × 1.97 m | 1.5 m working space in front | Schneider Galaxy VX (maker claim) |
| Lithium battery cabinets (5 min) | 7–10 | 13–20 | 0.60 × 0.75 × 2.00 m | 0.914 m in front | Vertiv EnergyCore Li5 (maker claim); cabinets per MW are our arithmetic |
| Low-voltage switchgear | sections not sized (?) | (?) | 0.81 W × at least 1.78 D × 2.44 H m per section | working space: the only source read is an Ontario bulletin, so a benchmark (?) | Siemens WL catalogue |
| Room cooling (thermal-wall units, 500 kW) | 6 | 11 | 3.96 × 1.52 × 3.67 m | 1.1 m clear on both sides | Vertiv CoolLoop (maker claim) |

**Area, as the tool counts it:**

- The generator units alone cover about 141 m² at 2.5 MW and 236 m² at 5 MW. The chillers cover about 115 and 201 m².
- With each unit's own clearance box, it's roughly 320 / 535 m² for the generators and 365 / 640 m² for the chillers.
- Neighbouring units share their gaps, so a packed yard is somewhat smaller than these clearance-box totals. They're my arithmetic from the table above.
- Our site check: at **339 1st Ave E**, the generator yard was 20–23 m deep, which squeezed the building to about 670 m² a floor. And the roof could not hold both the chillers and the generators.

## Rooms and separations

- **Electrical (UPS and battery) room:**
  - The national code and VBBL 3.6.2.1(7) require a 1 h service room in a storey that isn't fully sprinklered.
  - Check 2 found that code-required electrical rooms need 1 h even when sprinklered. Correcting this is waiting on J.B.'s decision.
  - Reading UPS and batteries as "service equipment" is our own interpretation (?).
- **Generator room (if indoors):** Vancouver Building By-law bulletin 2000-015 asks for a 2 h separated, generator-only room. It covers emergency (life-safety) generators and points to CSA C282 (paywalled, not read). Whether it covers a data centre's IT generators is not stated (?).
- **Battery rules:** the BC electrical code's battery-storage definition leaves out UPS batteries, so Section 64 may not govern them (?). NFPA 855 (US) is used as a benchmark.

## Fuel, testing, noise

- **Fuel:** the 2 MW set the tool sizes (Rehlko KD2000) has tanks of 8,577–16,383 L, depending on the tank chosen. At full standby load (528 L/h) that's about **16–31 h** (our arithmetic). The "12 h" figure was from the smaller KD1000 sheet. One Edmonton operator (Qu EDM1) claims 24 h. Fire-code limits on fuel storage are not yet in the register (?).
- **Testing:** monthly, at least 60 min at 30% or more of rated load, plus a yearly 2 h full-load test (CSA C282, read from a fire department's summary). Whether a data centre's IT generators fall under C282 is not stated (?).
- **Vancouver's noise by-law:** exempts a test that runs at most once a month, by day, up to 60 min and no louder than 80 dBA.
- **Noise levels:** each chiller is about 103–106 dBA sound power (Vertiv; converted by us).
- **Metro Vancouver:** no Tier 0/1 engines within 100 m of hospitals, schools or day cares. The tool doesn't check this yet; it's waiting on J.B.'s decision.

## Not in the register yet: research needed before drawing these

- **Weight and point loads:** generators, chillers and transformers. Their data sheets usually list weight, but none has been read. This decides roof vs grade and lifting vs sinking, so it's the most important gap.
- **Combustion air, radiator airflow and exhaust height** for the generators.
- **The utilities' pad-mount transformer clearances** to doors, windows and openings (BC Hydro; EPCOR's section 6.4).
- **Fire-code fuel storage limits** (NFC / BC Fire Code).
- **Working space** from the Canadian Electrical Code (paywalled), and the BC/Alberta adopted rules for it.

Any of these can be added to the register first, so the D spread and the tool use the same numbers.

---

## Add-on: weights and floor loads (30 Oct 2026, first check)

| Item | Weight per unit | Spread over its footprint (our arithmetic) | Source |
|---|---|---|---|
| 2 MW generator, Sound Level 2 enclosure with sub-base tank | 40,394 kg (maximum) | ≈ 8.4 kPa | Rehlko KD2000 G5-626, p. 5 (maker claim) |
| 1.49 MW air-cooled chiller | 13,110 kg dry, not counting the glycol inside (?) | ≈ 4.5 kPa + fluid | Vertiv AFC SL-71060, FIZ table (maker claim) |
| 2,500 kVA oil-filled transformer | 7,031 kg (5/15 kV) to 8,528 kg (25/35 kV), with 2,120–2,763 L of oil | ≈ 12.7 kPa | Eaton CA022021EN, Table 14.1-20 |
| Lithium battery cabinet | 590 kg | ≈ 12.9 kPa | Vertiv EnergyCore SL-71271 (maker claim) |
| UPS frame, thermal-wall unit, server rack | not found yet (?) | | |

**What the code asks of the floor:** the National Building Code 2020 (Table 4.1.5.3) sets a minimum of **3.6 kPa** for generator rooms and transformer vaults, and **2.4 kPa** for upper-floor offices. Where the equipment's actual load is greater, the actual load governs (4.1.5.1.(1)). So the plant is about **1.25–3.6 times** the code minimum for an equipment room (the chiller is lowest, before its fluid; transformers and batteries are highest), and **2–5.4 times** an office floor. Plant above people means a floor designed for it. The loads above are spread evenly; point loads at the mounts and vibration aren't sourced (?).

**Generator air (KD2000, p. 3):**

- radiator cooling air: 2,809 m³/min;
- combustion air: 189 m³/min;
- exhaust: 443 m³/min at 415 °C.

The exhaust outlet height is on a drawing we haven't read (?).

**Fuel:** the tank holds 8,577–16,383 L, depending on the tank chosen. At full standby load the set burns 528 L/h, so a tank runs it for about 16–31 h (our arithmetic).

---

## Add-on 2: floors, clearances, fuel and exhaust (30 Oct 2026, first check)

**Data-hall floors** (Linwood, STRUCTURE magazine, Jan 2023, which cites US codes). One correction to the D6 notes: these are not operator requests.

| psf | ≈ kPa | What it is |
|---|---|---|
| 100 | 4.8 | US code minimum (ASCE 7-22) for computer access floors |
| 150 | 7.2 | US military standard (UFC 3-301-01) for IT server spaces |
| about 240 | 11.5 | the author's own worked example: racks, containment, raised floor, cables |
| 350 | 16.8 | Intel's recommendation (2012), already in the register |

- A certification firm reads TIA-942 as asking **12 kPa** for a Rated-3 hall. That's a certifier's reading, not TIA's text, which is paywalled.
- The Canadian code has no data-hall line, and its office load leaves out computer rooms.
- So a data-hall floor is as heavy as the plant, or heavier.

**Transformer clearances.** These are set by the utility, not the codes:

- **BC Hydro** (ES54 Section F): pad at least **1 m** from any building, **3 m clear in front**, 1 m at the sides and between units. This covers BC Hydro-owned transformers. A customer-owned substation at primary service follows the Canadian Electrical Code, which is paywalled (?).
- **EPCOR** (Customer Connection Guide s. 6.4, 2025):
  - "clearances between transformers and buildings can be as high as **6.0 m**, depending on the type of transformer";
  - set in a registered utility right-of-way, with truck access;
  - on piles if within 4 m of a foundation;
  - 1.0 m from gas lines and 1.8 m from water lines (s. 3.10.2.2).

**Fuel.** The fire code points away from itself:

- The National Fire Code says diesel tanks feeding emergency generators fall under **CSA B139**, and "Part 4 of the NFC does not apply to such tanks". B139 is paywalled (UBC Library).
- For comparison, the NFC's own limit for other indoor diesel tanks in a protected room is **200,000 L on the first storey** and **20,000 L in basements and upper floors**. Tanks over 2,500 L must be double-walled.
- So one KD2000's tank (8,577–16,383 L) already sits in the range where storey and room type matter.

**Exhaust:**

- No code we read sets an exhaust height.
- The BC Building Code (3.2.7.5) installs code-required emergency power to **CSA C282** (paywalled).
- Metro Vancouver's engine by-law says to keep exhaust away from building openings and air intakes.
- The exact outlet height is on Rehlko's drawing (ADV) for the KD2000, not yet read (?).

**For UBC Library:**

- CSA B139: generator fuel tanks.
- CSA C282: generator rooms and exhaust.
- The Canadian Electrical Code: working space and customer substations.
- TIA-942: hall floor loads.
