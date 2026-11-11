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
