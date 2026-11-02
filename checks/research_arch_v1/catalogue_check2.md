# Catalogue check 2: tool/arch_programs.json (2 Nov 2026)

Independent check against register `new_sources` text and the research .md tables. Detail: `catalogue_check2.json`.

## Counts (621 values checked, 25 programs)
- CONFIRMED 561 (28 of them need a small fix: missing src id or missing label)
- ARITHMETIC 32 (all re-done; 2 have errors, see below)
- UNSUPPORTED 22
- WRONG 6

## Fix first (WRONG)
- **roof_solar max_m2 2,116**: FM 1-15 caps each array, not the roof. Set null.
- **clinic place.grade "not at grade"**: only I-3 and FC-2 bar the ground floor. Set "?".
- **pool adj hall, hard: true**: BC guide says "should". Set hard: false.
- **lumber_drying conventional option "82–116 °C"**: hardwood kilns run below 82 °C; 116 °C is high-temp pine only.
- **therapy_pool Van districts**: I-1C left out.
- **facade_solar storeys_typ 3**: that is the no-sprinkler limit, not a typical value.

## Main UNSUPPORTED
- **lift_needed: false** (fish_farm, winter_garden, gym, covered_plaza): air-cooled heat (~25 °C) needs a lift. The greenhouse entry says so.
- **Wrong source ids**: clinic 45–70 °C (it is arch_tmp_vanNEU2020); kitchen "DHW 60 °C" (neuConnect is space heating); heat_plant NEU bill credit (it is neuConnect); CSA B52 flag (no id); laundry Group D (it is arch_nbcDefF).
- **rain_tank min 7.5 m²**: a small-site detention tank (arch_sys_vanRain2024, not cited), not a minimum.
- **Not in the register text, only in the .md**: Edmonton Custom Manufacturing (kitchen); atrium 3.2.8 (".md" marks it "?").
- **refuge place.grade "at grade"**: no rule. True for the under-hall option only.

## Arithmetic slips
- greenhouse AB mean: 5,955 m², not ≈5,900.
- heat_plant 48–58 W/m²: 58 rests on an assumption (".md" marks "?"); possible double count of the 5 MW boiler.

## Labels missing (benchmark outside Canada)
Pool 416 kWh (France), Kew set points (UK), ATACP sizes (UK), laundry CMS (US) and Bobák/Fiaschi, vertical-farm LED (US DOE), borefield MCS/ORNL, river ΔT 5 K (unsourced).

## Other
- Pool step model gives 1,395 m² for 6 lanes, against the 2,131 m² typical.
- van_zdb_* register entries are titles only. Vancouver zoning was checked against zoning.md and the prog .md tables. All match.
- Decisions all reflected: dropped programs absent; fish warm only, with ITC flag; shelter day/overnight; refuge three options, no default; climbing in gym; gym 16 °C benchmark; F-2 separations per arch_nbc3131.
