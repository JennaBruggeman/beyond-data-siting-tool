# F11 part B: proposed fixes (for J.B. before building), 11 Nov 2026

Nothing in part B is built yet. Figures for 339 1st Ave E at the golden set-up (2.5 MW, air, dry/air-cooled chillers, N+1).

## Weaknesses first
- Item 3: the register contradicts itself. `load_factor` (Fan et al. 2007, trust 80, "confirmed") gives the 0.6, and `tool/data/equipment.json` cites it; `it_load_share` (trust 40) says the share in use is "not set" and heat "stays at capacity". The main chat saw only the second.
- Item 4: cabinet counts at 10–15 min are my arithmetic from the Vertiv cabinet's stored energy (31.1 kWh); the Delta LZH's rating at longer runtimes is not in the register (?).
- Item 6: the 0.85 boiler efficiency is our assumption (register homes_heated), and about 40 % of a BC home's heating energy is electricity, where "efficiency" is about 1.

## 3. The 60 % load factor (R.lf)
- **What it is:** `load_factor`: Fan et al. 2007 (Google, one operator's clusters): the average was 59.5 % of the sum of each machine's measured maximum. It is about servers below their own peak, not about a hall that is part-filled.
- **The catch:** the tool's IT load is servers × 600 W (LBNL 2024 average server power), so applying 0.6 again may count "below peak" twice. And `it_load_share` says no sourced share exists for one colocation building.
- **Proposal: option (b).** Show every yearly figure at full load and label it "an upper bound: running at full IT load all year; the share in use is not set (?)". Keep Fan et al. 2007 as a one-line note ("one operator ran at about 60 % of its machines' peak; not used"). Register: `load_factor` marked "not used for yearly figures (J.B. ...)", `it_load_share` text unchanged (it already says this).
- **339 at full load (×1/0.6):** electricity 18–20 → about 31–34 GWh/yr; heat offered (liquid case) 9,630–14,783 → about 16,050–24,640 MWh/yr; grid carbon and cooling-tower make-up rise by the same 1.67; cost of heat per MWh falls (same pipe, more heat). Power at full load (3.5–3.9 MW) is unchanged.
- Alternatives: (a) keep 0.6 with Fan 2007 as its source (it is sourced, but answers a different question); (c) keep 0.6 marked "?".

## 4. UPS battery runtime
- **Today:** cabinets sized for about 5 min (backup_hours: "about 5 min (colocation)", vendor claims). `arch_dc_electrical` cites FM 5-32 3.5.2.1 (insurer guidance): 10–15 min.
- **Proposal:** follow FM 5-32 (10–15 min), as the hub already follows FM 5-32 for plant; show 5 min (colocation practice) as a note.
- **339 (2.5 MW, N):** battery cabinets 7–10 today → about **14–21** (Vertiv EnergyCore Li5, 31.1 kWh each: 186 kW for 10 min, 124 kW for 15 min; Delta LZH at these runtimes ?). Battery room area (1.0–1.8 m²/MW at 5 min, equipment only) → about 2–3.6 m²/MW, so the hub's battery room roughly doubles (to be re-run; the hall may shrink a little on tight lots).
- Alternative: keep 5 min as the tool's rule and label FM's 10–15 min as the insurer case.

## 5. Generator-test noise
- **Finding:** the 78 dB(A) **is** for the set placed. "Kohler G6-154" is not a set model: it is Rehlko's enclosure and sub-base sheet (9/23r), whose p. 11 sound table covers the KD2000/2250/2500 (KD62V12 engines): Sound Level 2 enclosure 78 dB(A), log average of 8 positions at 7 m, full load (register kohlerG6154sound, manufacturer claim). 75.7 dB(A) at 9.1 m = 78 − 20 log(9.1/7), free field.
- **Proposal:** no method change; fix the label everywhere it reads "Kohler G6-154" to "Rehlko KD2000, Sound Level 2 enclosure: 78 dB(A) at 7 m, full load (maker sheet G6-154 p. 11)". Gaps that stay: no sound power level, one value for 2.0–2.5 MW sets (?).

## 6. Homes equivalent
- **Today:** Heat offered: homes = heat ÷ (16.81 MWh × 0.85) = heat ÷ **14.3** MWh (Edmonton ÷ 28.2). Receivers: housing demand = homes × **16.81** MWh (energy bought, not heat needed). Same source (CEUD 2018–22, register homes_heated); one step (× 0.85) applied in one place only.
- **Proposal:** one figure everywhere: the heat a home needs = CEUD space + water heating energy × 0.85 = **14.3 MWh (BC), 28.2 MWh (AB)**; used for "homes equivalent" and for housing receivers' demand. Label the 0.85 as our assumption.
- **Effect:** homes equivalent unchanged; housing receivers' demand falls 15 %, so some connections take less heat and their cost per MWh rises (re-run Who could take it).
- Alternative: 16.81 everywhere (energy bought), which overstates the heat a home needs.
