# Noise mitigation in the by-law check (3 Nov 2026)

Builds on the 2 Nov noise block (checks/agents/2026-11-02_noise_block.md). Research: checks/research_arch_v1/noise_mitigation.md (checks 1–3 applied). No commits.

## Rule

- **Block** only when no modelled option, alone or combined, brings the quieter rating under the night limit at every receiver.
- **Pass with a named requirement** when an option does: "Noise: needs …", grey note in m.notes (setup drawer, flow foot, What fits, deck).
- **Flag** when the standard rating needs more than the quieter one, or when no option is enough for it.
- **Order tried:** none → source (low-noise units or night fan speed) → screen → both. Source: Ottawa ENCG Intro p. 1, barriers only after other measures.
- **Plant room:** comes with "Bring it indoors". When no outdoor placement fits, findFit tries it before it drops the generators.

## Modelled options (only those with numbers)

| Option | Credit | Conditions in the tool | Source id |
|---|---|---|---|
| Solid screen around outdoor plant (roof, yard) | 8 dB, lowered to FHWA's 5 + 1.5 dB per m above the line of sight where that is less (the conservative choice; FHWA is for highway line sources, our extension ?) | Height max(4 m, unit + 2 m) = 4.9 m for chillers and dry coolers. Every unit within 20 m of the screen toward the receiver. Breaks the line of sight from each unit top to the receiver; receiver height = tallest recorded building on that lot, none recorded → no credit (?). At least 20 kg/m². EVAPCO wall-rule conflict stated (?) | arch_nz_nswDcNoise s. 4.3; arch_nz_fhwaNBDH ss. 3.4.2, 3.5.1 |
| Plant room (indoors) | 25 dB | Solid walls, roof RW 47 or better, gaps sealed, louvres at least the Table 4-5 insertion loss | arch_nz_nswDcNoise s. 4.3, Table 4-5 |
| Low-noise chillers | Trane RTAF 280 LN: 98 dBA per 1,010 kW (101 standard), capacity for capacity | Maker claim. Drawn as the basis unit (size not in the register ?) | traneRTAF |
| Night fan speed (dry coolers) | 50 log(N2/N1), down to 0.6 × full (−11.1 dB at most) | Heat rejection at that speed not checked (?) | arch_nz_amcaMathson; arch_nz_kaltraDC (claim) |

Not credited (no sourced figure, or only an upper bound): unit housings, silencers, towers (SPX "no greater than"), hybrid coolers. Generator testing stays "Not checked (?)": the only figure is one enclosure's design intent (TELUS Regent, 65 dBA at 7 m).

Plant groups (roof, yard, indoors) now each sit at their own centre and are summed logarithmically (NSW s. 4.1; FHWA s. 3.1). Before, all units sat at one centroid.

## Changes

| File | Change |
|---|---|
| engine.js | `NMIT`, `rayExit`, `noiseCheck` rewritten (groups, options, solve). New output: `req`, `mit`, `groups`. NLEV levels carry the unmitigated levels too. The block names the strongest option tried and adds "indoors" as a fix. People tab text and math line updated. `BD.eng.NMIT` exported. |
| site.js | `nc.req` goes to m.notes before the flag. |
| flow.js | findFit tries `{vis:'indoors', plantAt:'roof'}` (with yard or roof generators) after the outdoor placements and before dropping the generators. It never replaces an outdoor fit. |
| scene3d.js | A required screen is drawn at its height around roof and/or yard plant, labelled "solid screen 4.9 m · noise: NSW 2021, −8 dB". The indoor label names the plant room. Neighbour hover text mentions the mitigation. |
| addons.js | Seen or hidden: the Sound row states the credits the check uses (screen, indoors) and that housings get none. Sources list adds the NSW, FHWA and Ottawa ids. |
| register/patches/noise_mitigation_2026_11_03.py | 15 new sources, check log 1–3, kinds. Rules added to the noise_level and noise_limit formula, coef, sources and source_roles. Rebuild run. |

## Golden run vs checks/golden (errors ignored; 0 page errors on all 8 lots)

| Lot | Golden mw | 2 Nov block | Now | Mitigation needed |
|---|---|---|---|---|
| V09 275 1st Ave E | 9.6 | none | 1.9 | 5 low-noise chillers + 4.9 m roof screen. Worst lot without: 74–77 dBA at 320 Industrial Ave, 19 m; limit 65 |
| CLARK 1425 Clark Dr | 7.7 | none | 2.6 | 6 low-noise chillers + 4.9 m roof screen. 73–76 at 1345 Clark Dr; 65 |
| V339 339 1st Ave E | 3.8 | none | 1.9 | 4.9 m roof screen. Flag: standard units would also need low-noise chillers (64–67 at 336 1st Ave E) |
| E123 12603 123 St | 21.9 | 0.9 | 3.2 (plantAt roof → split) | 8 low-noise chillers + 4.9 m screen on roof and yard. Flag: a no-record lot at 52 vs a possible 50 |
| E05 8803 Stadium Rd | 33.1 | none | 28.8 (vis → indoors) | Plant room, −25. Flag: standard units 47–50 vs 50 at 8720 106A Ave |
| E06A 74 Airport Rd | 10.2 | none | 8.6 (indoors) | Plant room. Without: 76–79 at 11830 Kingsway; 60 |
| E06B 64 Airport Rd | 10.2 | none | 8.0 (indoors) | Plant room. Without: 65–68 at 8065 Cedric Mah Rd; 50 |
| HAST 555 W Hastings | 1.9 | none | 2.5 (indoors; plantAt split → roof) | Plant room. Without: 64–67 at 550 W Hastings; 55 |

Every other changed value follows from these:

- **The new size:** `mwSized`, plant counts (`s.n`, `need`, `Q`, `gN`, `gNeed`, generator kind), `placed`, `coolRoof`, `boxes`, plant lines, `loadingNeed`, yard depth and `sizedTo`.
- **Indoors** (E05, E06A, E06B): `plant.indoor`, `coolRoofIndoor`, `indoorPlant`, the floor-space range `facts.mw` and the hall areas. The plant floor takes floor area: E05 floor-space range 10.2–33.2 → 8.9–28.8 MW; E06A 3.4–10.3 → 2.7–8.6; E06B 3.2–10.3 → 2.5–8.1.
- **E123** only: `fp` (12,192 → 10,910 m²), loading removed, `mwPick` set by findFit.
- **HAST** only: `fuel` (12,230 L on the roof, under the 20,000 L limit).
- **New keys:** `noise.req`, `noise.mit`, `noise.groups`, and the notes.
- **Not repeated here:** the earlier expected diffs (Z.screen, srcId, maxStoreys, yardRect).

Full diff: /tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/gdiff_mit_vs_golden.txt

The fan-speed path is not reached by the golden lots (all air-cooled). A probe with liquid cooling ran with 0 errors:
- V09: 6.4 MW with fans ≤ 61% (−10.7 dB).
- E05: 3.7 MW with fans ≤ 60%.

## For J.B. (?)

- The 4.9 m screen is taller than the units. EVAPCO's layout rule asks unit tops to be level with or above any wall at these clearances. Stated on screen; not resolved.
- The low-noise variant is another maker's unit (Trane) replacing the Vertiv basis unit by capacity. Its footprint is not in the register.
- No sourced Edmonton or Vancouver rule on yard-screen height was applied.
