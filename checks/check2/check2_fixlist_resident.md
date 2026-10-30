# Check 2, resident-level sources: results and fix list (29 Oct 2026)

Six independent runs re-read the **190 sources** behind what residents see in the tool.

- **95 confirmed.** Both reads agree.
- **74 differ from the source** on at least one point. Each has a visible "CHECK 2" note on its register entry.
- **21 couldn't be read.** These are still single-checked.

By claim: 579 confirmed, 71 corrected, 26 not found, 59 unreachable.

The register now logs check 2 for all 190. **No values the tool shows have been changed yet.** The fixes that change what users see are listed below for you to approve.

## A. Fixes that change what the tool says

**Wrong in a card today:**

1. **Emergency water card, Vancouver.**
   - The City's saltwater fire-protection system is never called "seismic" in the City's memo.
   - The "about 80 years" refers to a separate network of quake-hardened mains.
   - The drinking-water rule (DWPR s. 3.1(b)) only exempts a system from the duty to supply drinking water. It does not say "no permit".
2. **Emergency water card, Edmonton.** "Same clause as BC" is wrong. Alberta's code sets a firefighting flow of 3,800 L/min at 140 kPa, or a volume formula, for buildings over 3 storeys or 600 m².
3. **Generator rules, Metro Vancouver.** Emergency engines are still under the air bylaw's Parts 10–12: 20 % opacity, and no Tier 0/1 engines within 100 m of hospitals, schools and day cares. The tool leaves this out.
4. **Generator testing, Vancouver noise by-law.** s. 4.1(c) exempts testing only up to once a month in daytime for up to 60 min, plus once a year for up to 180 min, at no more than 80 dBA. This should be in the tool.
5. **Low-frequency (dBC) sound flag.** The by-law's dBC limits cover amplified sound and music only, not mechanical plant, so the flag's legal basis doesn't hold.
6. **"Background noise" in the Vancouver noise check.** It isn't a credit. It's a limit of 3 dBA above background, for amplified sound in commercial premises only.
7. **Shadow check.** Vancouver's solar-access guideline (approved 17 Sep 2025) protects parks, plazas and sidewalks in the Downtown Peninsula only, not neighbouring buildings.
8. **Light trespass.** VBBL 10.2.2.10 (4 / 2 lux) covers residential buildings only.
9. **Parking, Vancouver.** Data centres are listed after all, under "Transportation and Storage Uses" (RTS 19744), so the Class B formula applies directly. The by-law copy is dated May 2026.
10. **Equipment sound ranges:**
    - Cummins: 72–91 dBA, not 73–91.
    - Daikin: 88–100 across the full range.
    - Climaveneta: 99–106.
    - Kelvion: 94 dB(A) is per fan; 6 fans make about 101.8 total (our arithmetic).
    - Trane: the figures are on p. 13, not p. 14.
11. **Community solar.** Credits can also be paid directly, not only as bill credits.

**Labels to fix** (the value stays, its status changes):

12. **JLARC (Virginia):** the jobs per floor area and 1,500 construction workers are "data center representatives indicated", so they're operator claims. The $14–37 covers only generation and transmission charges.
13. **Hillingdon:** 28 MW IT is the applicant's figure.
14. **Evaporation (~1.5 L/kWh) and blowdown = E/(C−1):** our own derivations, not FEMP's figures.
15. **Snowmelt (Holland, MI):** "95 degrees" has no unit, so the °F and 35 °C are our assumption.
16. **Heat-receiver demand from BCUC decisions:** these are the utilities' forecasts, not the Commission's findings.
17. **Ontario IT standard and federal guidance:** benchmarks, not rules.
18. **Edmonton data-centre zoning change:** a proposal, not current zoning.
19. **Vancouver screening, s. 10.1.1:** discretionary ("may").
20. **Irish planning orders:** the parapet conditions cover only *additional* roof plant.
21. **Blatchford:** the source doesn't say the heat pumps are in buildings.
22. **Vancouver tax shares:** the 24 % utilities share overstates what property tax pays for.
23. **Heat plume:** don't scale with Sailor's "1 °C per 100 W/m²". The paper itself says it over-predicts.
24. **Edmonton hot-water temperatures (60 / 49 °C):** Vancouver's insert only; Edmonton's wording isn't sourced.
25. **Edmonton cold days:** the "≤ −20 °C" days are daily *maximums* (6.5 a year), which the tool already says. A bug in the climate extract swaps Edmonton's humidex rows; the values the tool uses aren't affected.

## B. Couldn't be read (21): still single-checked

- **Blocked because a permission request went unanswered:**
  - edmonton.ca bylaw and form pages
  - KIT (Silber 2024)
  - NRCan (Dunsky)
  - NRC (CBD-160)
  - EPCOR guide
  - BC Hydro TCIP workshop
  - Tower Hamlets report
  - bclaws (Declaration Act)
  - Vancouver energy map
  - Musqueam and Squamish referral pages
  
  **If you're at your computer, you can approve these and I'll rerun them.**
- **Documents not identified in the entry:** "munda", "cinelli2014", "rowley2012" (likely Rowley et al. 2012, *J. Environ. Management* 111:24–33, though "non-compensatory" isn't in the abstract).
- **Paywalled:** ISO 9613-2 (the simplification stays labelled as ours), Uptime 2014 article, Cat TM9338.

## C. Settled by check 2 (examples)

- **NFC(AE) 2023 storage tables** match NFC 2020.
- **Edmonton's RM zone** is about 4–8 storeys.
- **Group-lodging sources:** all three primary sources found.
- **Alberta emission-factor guidance:** v3.3 is current.
- **Vancouver noise by-law** is consolidated to 14 Jul 2026.

Full per-claim results: `check2/result_res_1.json` to `result_res_6.json` in the session scratchpad.
