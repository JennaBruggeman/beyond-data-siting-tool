# Sweep items that need your call (18 Oct 2026)

Everything else from the critical and major lists is fixed (see `tool_logic_decisions.md`, batches 1–5). These are left because each one changes a method, a sourced value, or the data itself. My suggestion is in **bold** for each; say "do it" for any you agree with.

## Heat
- **M2 Edmonton gas price.** The tool uses October's regulated rate ($1.458/GJ). The 12-month average is $2.025/GJ, 39% higher, and heating happens in winter. **Use the 12-month average.**
- **M3 Break-even not capped.** A 0.1 MW site is credited with a whole hospital's demand. **Value = the smaller of the building's demand and the heat offered.**
- **M14 Busiest-to-quietest month.** The 3.9 : 1 (Van) / 3.3 : 1 (Edm) ratios use a national share. With each province's own share, Edmonton becomes the more seasonal city. **Pick "space heating ÷ (space + hot water)" (CEUD 2023) and recompute both.**
- **M15 Heat opportunities ignore the cooling choice.** With air cooling, Greenhouse etc. still size a heated area. **Show heat-based sizes as "if liquid-cooled", and make their physics gate follow the cooling choice.**
- **M41 Cooling for neighbours.** No temperature gate. **Air-cooled: not possible; liquid-cooled: possible with a change; show absorption (≥ 70–90 °C) and adsorption (≈ 65 °C) separately, each with its source.**
- **M89 "Lower-carbon" claim.** Triggered by a money test; the displaced fuel is assumed. **Drop the word until the displaced side is computed.**
- **M96 Homes heated.** 2023 was the warmest year in 2018–23; the 2018–22 average is about 16.8 (BC) and 33.1 (AB) MWh per home, against 14.58 / 29.19. **Use the multi-year average.**

## Receivers and networks
- **M6 Receiver floor areas.** Some records carry a whole campus or parcel (Mazankowski 1,027,454 m²); some hospitals appear several times (all four "hospitals" near 1169 Richards are St Paul's). **De-duplicate and give each record only its own building.** This is a data rebuild.
- **M7 Categories differ by city.** Edmonton "rec" includes 141 community-league halls; 10 of 23 Edmonton pools are outdoor. **Align the categories; flag outdoor pools as seasonal.**
- **M16 (rest) Outside the NEU.** Whether By-law 9552 credits heat from a building outside the NEU area is not settled; the tool now says "not yet known". **Leave as is unless you read it differently.**
- **M23 Downtown grid area.** The CPCN Study Area is wider than the zones the tool checks (east to Nanaimo, south to Broadway). **Trace the CPCN Figure 1 boundary.**
- **M86 Hospital or campus anchor.** Only hospitals are tested, though the precedents are campuses. **Include universities and colleges.**

## Plant, size and model
- **M30 Dry-cooler area basis.** Per IT MW in one place, per heat MW (× spares) in another. **One basis: heat MW × redundancy, for space, drawn units and the noise count.**
- **M31 Dry-cooler area is for warm water.** The 24.5 m²/MW is at 48 → 43 °C (liquid cooling); air cooling needs much more. **State the condition; flag air-cooled sizing as unverified.**
- **M32 Dry-cooler sound.** Uses air-cooled chiller ratings (now 98–101 dBA per ~1 MW unit). **Label as "air-cooled chiller ratings used as a stand-in"**, or give a dry-cooler source.
- **M34 Generator shortfall hidden.** A chart tooltip says 11 of 19 generators don't fit while the card says possible. **Show the shortfall on the card and What fits.**
- **M35 / M72 Provisional size.** Before a size is picked, the plant is sized at a provisional figure that isn't "the low end of what fits", and opportunities use 1 MW. **Use the bottom of the What fits range for both.**
- **M66 Existing towers.** Floor area = tallest part × all footprints (555 W Hastings about 2.4× too high). **Each part × its own height.**
- **M77 Report baseline vs step notes.** They can differ if inputs change. **Drop step notes when inputs change.**
- **M102 Solar register formula** is not what users see. **Change the register to the panel-row layout.**

## Lots and data (done 18 Oct 2026 — see tool_logic_decisions.md Batches 10–11)
- **M47 Rain on the roof** uses the lot outline, not the drawn footprint (0 m³ when there's no outline). **Use the drawn footprint.**
- **M68 Edmonton lot picking** picks the record with the largest lot area, not the one clicked; no measured-outline fallback. **Pick by containment; same fallback as Vancouver.**
- **M69 Vancouver multi-part parcels** and the "tax record" label. **Relabel the source; handle multi-part parcels.**
- **M70 (rest) Edmonton estimated heights** up to 280 m on small sheds. **Cap or drop estimates above the tallest measured building.**
- **M71 Burrard Inlet as a lot** (legal "OTHER"). **Exclude water parcels.**
- **M81 EV stations** include private ones. **Re-download the NRCan file with its access code and keep public stations.** (Needs a website approval.)
- **M61 / M62 Noise zones.** Edmonton residential detected by an "R" prefix; Vancouver CD-1 never matched. **Explicit lists from the bylaws.**
- **M64 Sight lines.** Vancouver excludes lanes; Edmonton includes alleys. **Match the two.**

## Labels and register (done 19 Oct 2026 — see tool_logic_decisions.md Batch 12)
- **M85 Gate vs ladder.** Some cards show two zoning states. **Update the ladders to the clauses now read.**
- **M87 Readiness.** TELUS Garden "built here" (operation not sourced); Westville "built elsewhere" (planned). **Downgrade both until operation is sourced.**
- **M93 CloudHQ Offenbach** area basis. **Mark the basis unspecified.**
- **M95 Register IT-load density** vs the tool's m²/MW. **Align the register to the tool's figures and sources.**
- **M98 (rest)** refrigerant leak 3%/yr and 50–600 kg charge have no source. **Lower the confidence to 20 or find a source.**
- **M104 PUE confidence 100.** **Set 80** (the range is an estimate plus a survey).

## Not settled by a web check yet
- NEU sewage heat: the City page is quoted as "3.2 MW", but an earlier check found 2.5 MW (RTS 06419). Needs the City page re-read.
- LRMC capacity range "150–400" vs "200–400" $/kW-yr (IRP Appendix F s. 1.2.2): the local copy doesn't include that table.
- Edmonton parking stall 23.4 m²: the bylaw clause found may sit in a special area.

## To do (kept open, J.B. 18 Oct 2026)
- **Tower floor areas (M66, remaining):** 596 buildings 40 m or taller (by address) still use the estimate range. 131 now use the City's owner-reported area. Next: BC Assessment Gross Building Area, which needs Jeremy Buhler's written OK (meeting Mon 19 Oct, 1 pm).
