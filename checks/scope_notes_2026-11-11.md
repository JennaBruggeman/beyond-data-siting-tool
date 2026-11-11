# Scope notes (a)–(h), 11 Nov 2026: no changes made

Estimates are working time in this session, not counting your review.

## Weaknesses first
- (d) uses the tool's 2.32 m² per rack (Schneider WP 46: "rack floor equivalent", aisles included). Built Canadian halls give 290–630 m² per MW, which at 8 kW a rack is 2.3–5.0 m² per rack, so 2.32 sits at the dense end and gives more racks than the halls the tool calibrates against.
- (e) and (g) can't be built from what the register holds: maker input power and the KD2000 fuel rate aren't recorded.
- (h): I haven't read NoiseModelling's documentation; what I say about it is from memory and marked "?".

## (a) Liquid loop temperature: one cooler and one warmer case everywhere
- **Today:** two values. 37.5 °C (servers' supply; NREL ESIF) on the Engineering heat cards; 50–60 °C (heat_temp) in Architecture's direct-heat test and Heat flow.
- **Cooler case, held:** NREL ESIF (Van Geet 2019, government lab): 24 °C supply, 35–40 °C return used to heat offices (nrelESIF2019); LBNL (Coles & Greenberg 2014): capture measured at 30 °C supply (lbnlCapture).
- **Warmer case, held:** 50–60 °C liquid-cooled, Wahlroos et al. 2018 (RSER 82, p. 1753, peer-reviewed, via register lorenz) and Sethuramalingam et al. 2019 (secondary, cites Ebrahimi 2015 and Davies 2016, not read); ASHRAE facility-water classes W32/W40/W45/W+ known only through an industry blog (upsiteASHRAE5) and a trade report (hpacAshraeLC2014, not read).
- **Would need reading:** ASHRAE TC 9.9 Liquid Cooling Guidelines (the W classes and their supply and return; paywalled, UBC Library); Wahlroos p. 1753 itself (to confirm it is loop return, not chip); one or two maker CDU sheets (facility water supply and return, e.g. Vertiv CoolChip). The case pair would be about 35–40 °C (cooler) and 45–50 °C (warmer, W45) pending those reads.
- **Build:** one pair in tool/data (register heat_temp), read by cards.js HS, arch.js dcTemp and Heat flow; every heat card shows both cases. About half a day after the reads.

## (b) One per-home heat figure
- **Held:** homes_heated: CEUD residential 2018–22 average energy for space and water heating per household, BC 60.5 GJ (16.81 MWh), Alberta 119.3 GJ (33.14 MWh) (NRCan CEUD, government dataset, q 80); 0.85 boiler efficiency is our assumption.
- **Today:** homes equivalent uses 16.81 × 0.85 = 14.3 MWh (heat a home needs); housing receivers use 16.81 (energy bought). F11 item 6 proposes 14.3 / 28.2 everywhere.
- **Build:** one constant in tool/data/heat.json used by engine.js calc, cards.js receivers and compare.js. About 1–2 hours, plus re-running Who could take it.

## (c) Heat verdict: break-even pipe cost per metre
- **Method:** for the cheapest receiver, the pipe cost per metre at which its cost of heat equals what the heat is worth: (worth − heat pump and upkeep per MWh) × MWh a year ÷ annualising factor (0.0696) − fixed costs, ÷ route length. The inputs are already in cards.js heatEcon; no new source needed.
- **Canadian pipe-cost sources:** none per metre. Vancouver NEU 2018 and Edmonton DDE 2025–26 are project totals with no length (the register says neither yields $/m); Squamish NEU 2010 gives levelised costs only. The per-metre figure in use is European (Persson 2019, npro.energy) × 1.5782 CAD/€.
- **Build:** a row on Who could take it ("pays its way below $x per metre; the tool assumes $1,038–2,620") and in the connection card. About half a day.

## (d) Hall size from racks × floor per rack
- **339 1st Ave E:** the hall drawn is about 1,150 m² (Engineering, 2.5 MW × 460 m²/MW) or 1,137 m² (the hub, rule sheet v1, 1.8 MW). At 2.32 m² a rack: about 495 or 490 racks.
  - **8 kW a rack:** about 4.0 MW (Engineering) or 3.9 MW (hub).
  - **15 kW a rack:** about 7.4 MW or 7.4 MW.
  - **Today:** 2.5 MW (Engineering) and 1.8 MW (hub).
- **Why higher:** 2.32 m² is rack floor with aisles only; built halls (290–630 m²/MW) also hold cooling units, PDUs and egress. The tool's scene3d rack layout check already places cooling units and aisles in the hall; that layout, not 2.32 m², should give the rack count.
- **Then:** the plant, power, fuel and noise would size to the new MW, and the size search (fitMax) would cap it; on 339 the generator yard already limits it at 2.6 MW.
- **Build:** rack density as a visible choice (8 / 15 kW, register rack_count: Uptime 2024 average 8 kW), racks from the layout check, MW = racks × density. About a day, with the knock-on checks.

## (e) PUE per cooling type and city
- **Held:** capacities and sizes only: Vertiv Liebert AFC (1,489 kW at 35 °C, "preliminary data"), EVAPCO eco-Air, SPX OlympusV, BAC Series 3000, generic dry-cooler ranges; their clearances. No input power, EER, IPLV or fan power in the register text. The hourly weather year (CWEC) is held and already used for hybrid wet hours.
- **Would need reading:** each maker's performance at part load against outdoor temperature (chiller kW input or EER by ambient; fan motor kW for dry, adiabatic and tower units; pump power). The downloaded BAC, EVAPCO and SPX engineering-data PDFs may list fan motor horsepower: a read of those files first; Vertiv AFC efficiency tables may need the selection software (not public).
- **Build:** hourly model (IT load + cooling power from ambient + fixed losses) over the CWEC year, per type and city. About a day after the reads; PUE then replaces the 1.4–1.55 survey range on Electricity and Cooling.

## (f) Plant space with clear zones and spacing
- **Held:** the hub's plant layout already packs units with keep-out zones: Vertiv AFC 1.5 m on the long sides and 2.1 m at the ends (vertivAFC_clear), generators 2.0 m, pads 1.0 m; plus EVAPCO layout clearances (evapcoLayout2026), BAC layout guidelines (bacLayout2023), CEC 2-310 UPS working space, Vertiv battery front clearance.
- **Build:** the Engineering plant space reads the same packing (units + clear zones + spacing) for each cooling type, in place of equipment-only m² per MW. About half a day; the label "equipment only" then goes.

## (g) Fuel rate from the Rehlko KD2000 sheet
- **Held:** no. The KD2000 sheet (G5-626) is registered for size, rating, enclosure and Tier 2 only; the fuel rate in use (0.263 L/kWh, about 6.3 m³ per MW per 24 h) is "one Cat model", whose sheet was unreachable at check 2. G5-626 normally lists fuel consumption at 25–100 % load (L/h): a re-read of G5-626 is needed (download only with your OK: file g5626.pdf from techcomm.kohler.com, a few hundred KB).
- **Build:** after the read, about 1 hour.

## (h) Full ISO 9613-2 where a result is within 5 dB of a limit
- **Today:** the screening method Lp = Lw − 20 log r − 8 (and the one-set generator test), no ground, barrier or air absorption terms.
- **NoiseModelling (?)** (Université Gustave Eiffel, open source): from memory, a Java tool (H2GIS/PostGIS, scripts or a WPS server) built for CNOSSOS-EU propagation; whether it implements ISO 9613-2 itself, and its licence terms, I haven't checked. It would run offline on your computer, not in the browser tool, fed the City building footprints and heights we hold, ground type and terrain.
- **Would need reading:** NoiseModelling's documentation (method, licence); ISO 9613-2:2024 itself (paywalled, UBC Library).
- **Build:** a batch check for the lots within 5 dB of a limit, results stored per lot and shown as "full method" beside the screening figure. Two to three days, including setup, if NoiseModelling fits.

---

# Scope notes (i) and (j), 11 Nov 2026: no changes made

## Weaknesses first
- **(i)** Neither province has a published marginal grid factor for a new load. BC: none exists (register deep dive, 13 Oct). Alberta: the one figure held (EGDF) is an offset-crediting policy number, not a measured marginal.
- **(j)** We hold no building-scale gas-boiler cost. The one boiler cost we hold is district-heating scale (Danish). We hold only 12 months of gas prices, so a gas-price range is a one-year spread, not a forecast.

## (i) Electricity carbon: average vs marginal for a new load
| Province | Average (in use) | Other figure held | What it is |
|---|---|---|---|
| BC | 18.1 g/kWh (NIR 2026 Annex 7, consumption, 2024; q 80) | 22.8 g/kWh (BC Gov electricity emission intensity factor 2025, consumption basis **with imports**, 4-yr rolling 2021–24; register gridBC) | Still an average, not marginal. Includes net imports. |
| BC | none | marginal / incremental: **none published** | Register grid_co2 and meta.gaps: "BC marginal factor still unpublished". |
| Alberta | 346.1 g/kWh (NIR 2026, consumption, 2024) | EGDF v3.3 Table 1 (Aug 2026): 430 g/kWh for 2026 (460 for 2025, 400 for 2027); **459 g/kWh with line loss** for increased grid use (2026) (register abEGDF) | Alberta's offset-crediting schedule: a policy number, not a measured marginal (register says so). Declines to 340 / 363 by 2029. |

- **Today:** register grid_co2's formula says "average and long-run marginal, both reported". Only the average is computed (O-11, 30 Oct: the marginal "is not computed (?)").
- **Could cards show both?**
  - **Alberta: yes**, labelled "Alberta offset displacement factor (policy number), 459 g/kWh with line loss (2026)" beside the 346 average. On Electricity and Heat offered (heat pump carbon), carbon rises by about a third.
  - **BC: only the import-inclusive 22.8** beside 18.1, labelled "BC's own factor, with imports (still an average)". A true marginal would need the intensity of imports (BPA / Pacific NW or Alberta) and BC Hydro's dispatch: **not held**. It would read "marginal: no published figure (?)".
- **Would need reading (BC):** BC Hydro 2025 IRP (held for LRMC, register lrmc_bc) for any marginal-emissions statement; ECCC or CER import-intensity data. I haven't checked either for this.
- **Build:** a second carbon figure in tool/data (grid2 by city: AB 459 with its year, BC 22.8) and one row each on Electricity, Heat offered and Compare, plus a register patch so grid_co2 says what is shown. About 2–3 hours.

## (j) Heat worth: avoided boiler capital and a gas-price range
**Today:** worth = (FortisBC Rate 3 per-GJ charges or ATCO delivery + 12-month mean commodity) × 3.6 ÷ 0.85. BC $40/MWh, Alberta $13/MWh. Carbon tax zero in BC since 1 Apr 2025 (bcCarbonTax2025).

| Input | Held? | Values |
|---|---|---|
| Gas commodity, 12 months (Nov 2025 – Oct 2026) | yes (cards.js gasMonths; bcucG5026, ucaRates2026) | BC $1.66–2.23/GJ; Alberta $0.94–3.39/GJ |
| → heat worth range (our arithmetic) | can compute | **BC $39–42/MWh** (mean $40); **Alberta $8–19/MWh** (mean $13) |
| Longer gas history or forecast | **no** | would need e.g. CER Energy Futures or AUC/BCUC filings |
| Federal fuel charge | **no source** (register says it needs its own) | the tool assumes none |
| Gas boiler capital | partly | DEA sheet 44: 0.064 M€/MW (district-heating scale, 2020 €) ≈ $101,000/MW × 1.5782 (our arithmetic). Life and O&M not yet extracted (?) |
| Building-scale boiler capital (school, care home, apartment) | **no** | RSMeans (paywalled, UBC Library) or a utility program's cost data |
| Does the receiver keep its boiler? | judged | most keep it for peaks and backup (Odense, Markham cases in the register) → avoided capital is **zero in the low case** |

- **Effect on (c):** in BC the gas range moves worth by only ±$1–2/MWh, so the break-even pipe cost barely moves. In Alberta worth more than doubles low to high, but even $19/MWh is below the heat pump's electricity cost per MWh of heat (about $50/MWh: pool $43.68 + transmission and reserve, ÷ COP 3–4.5 ≈ $11–17, plus upkeep), so break-even stays near zero.
- **Avoided boiler capital (DEA scale), rough:** $101,000/MW annualised over 25 yr at 5.6 % (0.0752, life assumed ?) ≈ $7,600/MW·yr. ÷ 4,400–7,100 h ≈ **$1–2 per MWh of heat**. Small at DH scale; building-scale boilers cost more per MW, so this is the floor.
- **Build:** worth as a range (gas low/high) through heatEcon's cases (best case with high gas, worst with low); avoided boiler capital as an optional credit (0 low, DEA high), labelled; break-even pipe cost row shows the spread. About half a day, plus a register patch (price_ceiling) and re-running Who could take it; golden would change.
