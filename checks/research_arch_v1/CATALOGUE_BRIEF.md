# Brief: Architecture-mode program catalogue (2 Nov 2026)

Build `tool/arch_programs.json`, the data the Architecture template reads. Every number or rule comes ONLY from the checked research in `checks/research_arch_v1/` (the .md tables and `*_sources.json`; all texts are in `register/formula_register.json` → `new_sources`). Never invent. A value with no source is `null` with `"?"` in its note. Our arithmetic is allowed only from sourced inputs and is labelled `"our arithmetic: …"`. Operator/maker claims keep that label. Canadian spelling, short notes (one line).

Read first: architecture_mode_notes_2026-10-30.md (decisions, what was dropped), then pool_laundry.md, greenhouse_solar.md, refuge_publicfloor.md, refuge_placement.md, adj_programs.md, adj_occupancy.md, adj_service.md, spatial_rules.md (lines on D/F-2 3 h are superseded: register `arch_nbc3131` is right: F-2 vs D and E none, F-2 vs A and B 2 h), servicing_social.md, prog_wet.md, prog_grow.md, prog_public.md, prog_housing.md, sys.md, fish_species.md, temps_public.md.

## Programs (ids fixed)
Masses: refuge, pool, laundry, spa, therapy_pool, aquarium, fish_farm (tilapia/barramundi only), greenhouse, conservatory, food_drying, lumber_drying, public_ground (public ground floor), winter_garden (incl. atrium), covered_plaza, warming_shelter (option day | overnight), gym (incl. climbing), ev_hub, clinic (outpatient), community_kitchen, heat_plant (neighbourhood heat plant room).
Surfaces: roof_solar, facade_solar.
Systems (no mass; feed budgets): river_cooling, borefield, rain_tank.
Dropped (do not include): hospital, housing, seniors' care, sludge drying, cold-water fish, winter market.

## Schema (one object per program, in an array under "programs"; plus "meta": {date, built_from, note})
```
{ "id", "name", "group": "wet|grow|public|care|energy|system", "kind": "mass|surface|system",
  "size": { "typical_m2", "min_m2", "max_m2" (or null), "step": null | {"unit":"lane|stall|bed|tank|…","m2_per_unit","units_typ","units_min"},
            "storeys_typ", "floor_height_m", "src": [ids], "note" },
  "occ": { "group": "A-2|A-3|B-2|D|E|F-2|F-3|…|?", "sep_h_from_F2": number|null, "src": [ids], "note" },
  "heat": { "setpoint_C": [lo,hi]|null, "supply_C": [lo,hi]|null, "kWh_m2_yr": [lo,hi]|null, "W_m2_peak": [lo,hi]|null,
            "uses": "heat|cooling|electricity|none", "lift_needed": true|false|null, "src": [ids], "note" },
  "zoning": { "van": {"status":"permitted|conditional|rezoning|not permitted|?","use":"use name","districts":"…","src":[ids]},
              "edm": {"status":…,"use":…,"zones":"…","cap_m2":number|null,"src":[ids]} },
  "place": { "grade": "at grade|any|roof ok|not at grade|?", "street_entrance": true|false|null, "outside_wall": true|false|null,
             "public": true|false, "inside_secure": false, "src":[ids], "note" },
  "adj": [ {"rule":"must near|prefer near|keep apart", "with":"generators|fuel|chillers|transformer|loading|intakes|hall|street|<program id>",
            "m": number|null, "hard": true|false, "src":[ids], "note"} ],
  "options": [ {"id","name","effect"} ],   // e.g. refuge placement (own building | side by side | under hall), shelter day|overnight, fish species
  "social": { "serves": "…", "catchment": "…"|null, "src":[ids] },
  "flags": [ "short consequence lines, each with its source id in brackets" ] }
```
Systems: put capacity in "size" (e.g. kW per bore, m³ per m² roof) with a note, and permits in "flags".

## Output
Write ONLY `tool/arch_programs.json` (valid JSON, indent 1) and `checks/research_arch_v1/catalogue_build.md` (per program: fields left null and why). Every src id must exist in register new_sources (check with python). No commits. Reply under 120 words: counts of programs, fields filled vs null, any source id problems.
