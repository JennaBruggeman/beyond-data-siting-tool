# Things for J.B. to look at — 12 October 2026

Written after the diagram v4.1 and the tool's first attempt (three test runs). Each item says where it lives and what deciding it changes. Nothing here blocks the next build; all of it changes what the tool says.

## A. Wording that is mine until you accept it (goes in red on the page later)

1. **Verdict states** — `formula_register.json` → `meta.verdict_states`; shown in the diagram's "how to read" panel and the tool's verdict box.
   works · works with a change · doesn't work · not applicable or declined · cannot judge · not judged.
   Two decisions inside this: (a) is "not applicable" the same state as "the receiver said no"? I merged them because both are valid answers that are not failures; you may want "declined" on its own so a refusal is visible. (b) **Ordering.** I ranked *cannot judge* above *with a change*, so 555 W Hastings comes out "cannot judge" (who pays, pass-through, contract chain, flexibility value are all unrecorded) and the page then says "once those are settled, works with a change". If you'd rather the headline be "works with a change" with the unknowns listed beside it, that is a one-line change.
2. **Building-code condition** (`r_code`) — test line drafted: a public occupancy beside the F2 data-centre occupancy under the code's multiple-occupancy rules. The BCBC/NBC article is not verified and no code source is in the register; the condition cannot be scored until one is. Decide whether this stays a "(proposal)" or becomes a real condition with a source.
3. **"Not judged"** as the label for conditions the first attempt did not reach. On the three test runs 36 of 69 conditions are "not judged" — that number is the honest measure of how far the first attempt is from the full method.

## B. Source placements to confirm (`formula_register.md` → "Sources by term", column "placement")

Eight lines marked *unverified* — my reading of the coefficient text rather than an explicit tie: `it_load_outside`/lbnl2024 (context only), `rainwater`/femp (method via CSA B805), `cooling_centre_people`/ess (room standards), `capex_split`/exergi and /fortum (contract terms, price by temperature), `capex_split`/wahlroos2017 (earlier capex basis), `build_cost`/fan2007 (context), `price_ceiling`/ceG526 (I added the source id; the figures were already in the register from the verification pass).

## C. Own confidence vs the sources behind it (`formula_register.md` → "Own confidence vs sources")

Twenty quantities where the quantity's own confidence differs from the lowest coefficient-role source. I changed none of them. The ones where own confidence sits *above* a source it leans on are the ones to look at first: `backup_hours` 90 on operator-claimed fuel hours (50); `build_cost` 70 with the Turner & Townsend table at 50; `aquaculture_tonnes` 70 with the Luke webinar at 50; `capex_split` 70 with Exergi/Fortum at 50; `horizons` 70 on the handoff rule at 60. The ones *below* their sources (`receiver_demand` 40 on CEUD 80; `floor_area` 70 on BCA 80) read as deliberate — the transfer or the fallback is the weak link — and only need the status line to say so, which it does.

## D. Assumptions the tool makes that are not in the register (each marked ASSUMED on the page)

The tool needed six numbers the register does not hold. Either retrieve a source for each or accept them as stated assumptions at 60:
- Exchange rate 1.5 CAD per € for the DEA capex figures.
- Heat-pump full-load hours 4,000–6,000 per year.
- Delivered electricity price $80–120/MWh (BC and Alberta; the register has gas tariffs but no electricity tariff for a large general-service customer — FortisBC/BC Hydro LGS and an Alberta RRO or contract rate would close this).
- Source stream cooled by 10 K through the heat-pump evaporator (which temperatures enter the Lorenz form is not fixed in the register; the page uses sink supply and source-out).
- Natural-gas higher heating value 0.0378 GJ/m³ (needed to turn 1,962 g CO2/m³ into g per kWh of heat).
- PUE 1.4–1.6 for an in-building colocation (the register's example used it; it has no source).
Also mine: payback thresholds (pass ≤ 5 yr low and ≤ 10 yr high; fail only when the running cost alone exceeds the price) and the noise rule (free-field screen above the limit → "with a change", not "fails").

## E. What the three runs say, and what to check in them

- **555 W Hastings → host + Creative Energy steam.** 1.3–2.2 MW actual; 10–37 GWh/yr delivered after the heat pump; 700–2,500 BC homes; floor $39–76 vs ceiling $39–67 per MWh. Headline "cannot judge" (see A1); with a change once settled. The ranges are wider than the hand-worked example in the register (12–34 GWh; $37–57) because the page carries the full COP, capture and full-load-hour ranges; the hand example narrowed them. Check that you are happy with ranges this wide on the review slide.
- **111 E 5th → False Creek NEU.** Run on the applicant's 40 MW at 35–60 % utilisation, air-class heat: 109–396 GWh/yr delivered against a NEU demand proxy of 44–59 GWh/yr — the data centre would exceed the whole network; only 13–48 % finds a taker. At the NEU returned-heat credit ($32.59) payback is 11 years to never; condition 1.11 makes the applicant pay regardless. Headline "cannot judge": rezoning referred back, grid headroom not public, plant room, lease terms. The NEU supply/return temperatures and the NEU's actual load are not in the register (both assumed/proxied) — the NEU rates report or the NEU annual report would fix both.
- **Kyndryl Acheson → nearest receivers.** 1.2–2.1 MW from a chiller-capacity claim; floor $35–76 vs Alberta gas ≈ $11 per MWh → price window and payback fail; no network; receivers not located (no Parkland County parcel table). Headline "doesn't work". Note the carbon line: on Alberta's average factor (346 g/kWh) the net can go negative at the low COP end, i.e. a heat pump on Alberta grid electricity can emit more than the gas it displaces; on the EGDF schedule it is worse still. That is a finding worth a sentence in the thesis.

## F. Diagram and register housekeeping

- The Opportunities column now groups seventeen sizing quantities under the opportunity they size; `Prospect` keeps search radius, receiver demand, heat density, linear density, distribution cost, offerable area, deprivation. Check the grouping reads right.
- Five sources the coefficient text cited but the source lists had dropped were added (NIR Annex 7 → grid_co2; CWEC → demand_profile; Equinix 10-K → it_load_actual; Fortum, Exergi → capex_split); one new source id `ceG526` (Creative Energy 2026 interim tiers, BCUC G-5-26).
- `old_sources` (41 ids from hunts 1–8) now carry text in the register; the md lists them after the newer ones.
- The retrieval guide has a new section N: the four city-wide exports that make "any parcel" possible.

## G. Added 13 October — calibration (see calibration_report.md)

- The COP formula changed to the full Lorenz form with η 0.40–0.50; the 555 W Hastings run now goes to the host's 45 °C loop only. The downtown steam network needs a steam-raising heat pump, which is outside anything the built cases cover, and the steam temperature is not in the register — decide whether that branch stays "cannot judge" or you want a source for it (Creative Energy's BCUC filings describe the Core steam system).
- Utilisation floor dropped to 0.20 on the strength of one Telia snapshot. If you think one day in one hall is too thin to move the band, say so and it goes back to 0.35 with the Telia figure kept as a check.
- Two ownership models are now stated. The register's "operator floor price" gap matters only under model B; under model A (five of seven cases) the question is the utility's cost. This changes what the economic heading asks — worth a sentence in GP1.
- ERF is now the ISO definition and equals the captured share; the first attempt's ERF (which exceeded 1) is withdrawn.
- The NEU by-law's "heat energy returned" is undefined by any standard; the 50 % credit has no metering rule behind it. That is a finding about Vancouver, not a tool setting.
