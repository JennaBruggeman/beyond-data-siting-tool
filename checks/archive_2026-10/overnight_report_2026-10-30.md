# Overnight report: 29 Oct 2026 (evening)

*Date corrected: the work ran on 29 Oct (Pacific); entries first said 30 Oct and have been fixed.*

All work is on the review branch **overnight-2026-10-30**, pushed to GitHub. The live tool (`main`) is untouched. Merge only what you approve.

**Check status:** every source below was read once tonight, by me (**check 1**, logged in the register under `meta.check_log` with where and what). **Check 2 is open for all of them.** Tour material is your observations or the guide's claims, never verified fact.

---

## Corrections to things I told you in chat

1. **Alberta micro-generation does not let you power a neighbour.** It may supply only sites the customer owns or leases. The panels may sit on *adjacent* property the customer owns or leases (AUC guideline 2026, s. 1(1)(h)). I said "serve adjacent sites", which was wrong. The tool already had this right.
2. **Alberta gas share is 76.8 % for 2025** (AESO 2025 Annual Market Statistics), not the 74.7 % I quoted, which was 2024.
3. **BC's power call has a 10 MW floor.** Your Vancouver site (3.8 MW) and VAN3 (5 MW) are both under it. As I read B.C. Reg. 8/2026, its rules are written for requests of 10 MW or more (our reading, marked "?"; worth confirming with BC Hydro).

## New facts that help your argument

- **Curtailment is mandatory in BC's 2026 Call**, not optional: at least 10 % of the load, 4 h at a time, 144 h a year, uncompensated (BC Hydro RFA, Feb 2026). Flexibility is now a condition of getting power.
- **"Heat recovery ready" is scored** under environmental benefits, 10 % (RFA; info session slide 16). It isn't defined (?).
- **The Call is oversubscribed:** 15 applications, about 800 MW requested against 400 MW. Results are delayed by the provincial election (BC Hydro page as printed 15 Oct).
- **Selling heat to others makes you a public utility in BC.** The UCA's definition names "light, heat, cold or power". BCUC exempts small "Micro TES" providers, but the threshold isn't in the order (?).
- **Blatchford's utility is City-owned and connection is compulsory.** Its bylaw has no route for a customer to feed heat in (?). The utility does plan to "supply and draw thermal energy" with LRT utility complexes.
- **Drake Landing was decommissioned in 2024** (ATCO). The tool's seasonal-storage card now says so.
- **The nearest public rooms to 339 1st Ave E:** Mount Pleasant community centre and library, 539 m straight-line. Both are on the City's 2025 cooling-centre list.

## What changed in the tool

**Register (all in the logic diagram and templates):**

- New quantities:
  - `power_allocation`
  - `heat_sale_rules`
  - `refuge_services` (toilets, showers, water per person)
  - `refuge_code` (sleeping makes that part Group C residential)
  - `crisis_events` (per city)
  - `fire_protection` (VAN1 and VAN4 pre-action, VAN4 nitrogen + VESDA; operator claims)
  - `transformers` (count rule drafted, power factor "?")
  - `security_layers` (5 controlled doors at VAN3, from your tour)
- Updated:
  - `copper_tonnes`: only ~3 t/MW at rack level
  - `flexible_load`: Microsoft Dublin UPS; AESO 13 Jan 2024
  - `hall_layout`: VAN3 raised floor
  - `jobs`: staff seen on the tour
  - `clean_air_volume`: Health Canada re-read
- The VAN3 tour is entered as one source, `tourVAN3`, with observations and the guide's claims kept separate.

**Opportunities:**

- **Refuge card:** clean air needs the room's own MERV 13+ system that can recirculate. It also gains washroom, shower and water ratios, and the heat-dome reach point (98 % of those who died were indoors, 56 % lived alone).
- **New card, "Batteries at end of life":** large UPS batteries fall outside BC's and Alberta's consumer recycling programs as read.
- **Copper card:** now says "leaves at refits and closure", not "at each refresh".
- **Grid-flexibility card:** the under-10 MW note, marked as our reading.

**3D, prototype: a "Secure line" switch in the model key** (off / today / proposed):

- **Today:** the whole lot is fenced, as at VAN3.
- **Proposed:** the line sits at the data-hall wall, and the ground floor or yard could face the street. Labelled speculative, not sized.

**Checks:** reference runs on all 8 test lots are identical to the saved results, with no errors.

## Not done, and why

- **Transformers and fire suppression are not drawn.** No source gives where they sit or how big the room is.
- **Refuge cooling load is not computed.** No primary source was found for heat per person (ASHRAE is paywalled).
- **Walking reach is not computed.** No source gives a walking radius.
- **Table 3.1.3.1 not read yet:** the separations between a Group C refuge and the data centre's own occupancy, which itself isn't stated (?).

## Your call

1. **Tiers for the new nodes are my drafts.** `crisis_events` is set for residents; `power_allocation`, `refuge_services` and `security_layers` for community. Please check.
2. **The secure-line view:** keep, change or drop?
3. **Tour questions:**
   - What puts a fire out at VAN3?
   - What voltage are the 400 A panels?
   - Were the washrooms and the technicians' room before or after the portal?
   - Your plan sketch.
4. **Should I ask BC Hydro** to confirm the under-10 MW reading? You might prefer your committee member.

## Found on the way

- The register and the tool's copy disagree on one source for the rainwater card (`sfpucReuse`). This was already there before tonight and is left as is for you to decide.

## Check-2 list (all open)

`cologixVAN3web`, `bcReg8_2026`, `bchCfDRfA`, `bchCfDInfo2026`, `cfdPage`, `bccsHeat2022`, `covHeat2025`, `atcoDrake2024`, `aesoAlert2024`, `msDublinUPS2022`, `hcCleanAir2020`, `bcucG46_25`, `bcUCAs1`, `edmBylaw17943`, `edmBlatchfordBP`, `bcbcGroupC`, `nbcImportance`, `jibcESSqrg2012`, `cologixVAN1_2026`, `cologixVAN4_2026`, `bchTariff2026`, `bchCustGen`, `aucMicro2026`, `aesoAMS2025`, `tourVAN3` (transcription only)

---

## Check 2 results (independent re-read, 29 Oct evening)

A separate run, with no part in check 1, re-read every source and your tour notes.

- **Confirmed, both reads agree (16):** BC Hydro RFA, BC Hydro page print, UCA s. 1, Coroners release, Health Canada, BC ESS guide, BCBC Group C, importance categories, Blatchford business plan, ATCO Drake, Cologix VAN4, AESO alert, Phoenix paper, Basefarm, Telia Helsinki, Ireland CRU.
- **Corrected to the source's own wording (16).** These have been read twice, but the new wording only once, so they're the place for any third look:
  - **Regulation and rates:**
    - BC Reg. 8/2026: enabling section; the third-year caps added.
    - BC Hydro tariff: the 25 kV rule is s. 3.7; corrected order number and EV rates.
    - BCUC: the Micro TES threshold is a capital-cost threshold.
    - Community generation: 2 MW is the limit on net injection, not facility size.
  - **Vancouver and Alberta:**
    - Cologix VAN3: "2N" came from the guide, not their page.
    - City heat memo: correct title; check-ins are only for City-owned non-market housing.
    - Cologix VAN1: the sheet is dated April 2026.
    - AUC micro-generation: page numbers.
    - AESO 2025: pool-price wording; the carbon cost is already in the marginal cost.
    - Blatchford bylaw: confirmed it has no supply-in route.
  - **Flexibility precedents:**
    - Google: "first" refers to the ML agreements, not Belgium and Taiwan.
    - DCFlex UK: the demo partners were corrected.
    - Microsoft Dublin: signals come via aggregators; it *reduces* the need for spinning reserve rather than replacing it.
    - Texas SB 6: the threshold can be set lower than 75 MW; curtailment works through an ERCOT protocol for loads connected after 2025.
    - Eaton transformer: it's a design guide, and at the 25 kV that BC Hydro asks for, the footprint is larger (2.63 × 2.49 m).
- **Your tour entry was rewritten:**
  - The tenant enclosures and the second-floor hall moved to the guide's claims.
  - Your own words are kept where my reading could change the meaning ("K gate fence", "server box", "biometrics AND a scanner", "electrical boxes", "come over night").
  - Missing items were added: the guide's reasons against exporting power, the bullet-proof glass, fibre from the street, and not seeing any servers.
  - The VAN3 security count is now 4 doors you passed, plus tenant enclosures by the guide's account.

**Corrections to what I told you in chat today:**

- Microsoft's Dublin batteries *reduce* the need for spinning reserve. I said they replace it.
- Texas's 75 MW threshold can be set lower, and curtailment applies to loads connected after 2025.

**Questions for you from the tour check:**

- Did you measure, estimate, or get told the 18 in raised floor?
- How did you know the portal weighed and measured you?
- Did he *show* you the electrical boxes, VESDA and humidifier?
- Whose "company biometrics" were they: Cologix's or the tenants'?
- What did "about the with" mean?
- Where did your site description come from (5 MW, maglev chillers, Tier III)?
