# Heat items 1–7: source check (18 Oct 2026)

## 1. Edmonton gas price — verified
UCA regulated rates, Direct Energy Regulated Services (ATCO Gas), $/GJ, energy only (excl. billing and delivery): Nov 2025 2.579, Dec 3.390, Jan 2026 3.331, Feb 2.422, Mar 1.784, Apr 1.874, May 0.936, Jun 2.076, Jul 1.595, Aug 1.729, Sep 1.124, Oct 1.458. https://ucahelps.alberta.ca/regulated-rates.aspx
- 12-month mean 2.025. Nov–Mar mean 2.701. The sweep's Jan–Oct mean was 1.833.

## 3 / 7. CEUD residential (NRCan, local xls res_bc_e_2 / res_ab_e_2) — verified
| Year | BC MWh/home (space+water) | BC space share | AB MWh/home | AB space share | HDD index BC / AB |
|---|---|---|---|---|---|
| 2018 | 16.71 | 0.678 | 34.85 | 0.763 | 0.886 / 1.001 |
| 2019 | 17.07 | 0.688 | 34.38 | 0.768 | 0.942 / 1.029 |
| 2020 | 16.72 | 0.665 | 33.22 | 0.758 | 0.866 / 0.953 |
| 2021 | 16.79 | 0.678 | 31.13 | 0.759 | 0.940 / 0.934 |
| 2022 | 16.75 | 0.659 | 32.13 | 0.759 | 0.872 / 0.953 |
| 2023 | 14.60 | 0.630 | 29.20 | 0.731 | 0.773 / 0.842 |
- 2018–22 mean: 16.81 (BC), 33.14 (AB). 2023 is the lowest HDD year in both provinces.
- The space share also falls in 2023, so item 3 should use the same window as item 7.

## 4. Air-cooled heat
- Temperatures: return air 25–35 °C (Sethuramalingam/Asthana/Weston 2019, ICESF conference, Sec. 3.3); air-cooled 15–35 °C (Barth et al. 2026, Geothermal Energy, peer-reviewed); 25–45 °C (Taddeo 2017, UPC master's thesis).
- Capture share, peer-reviewed: Ljungqvist, Risberg, Toffolo, Vesterlund 2023, Energy Conversion and Management: X 20, 100473, doi 10.1016/j.ecmx.2023.100473. One-year simulation of a direct free air-cooled data centre in Luleå, with no heat pump. Annual ERF 0.50 / 0.59 / 0.66 at 30 / 40 / 50 °C exhaust. Reuse temperature 13 / 17 / 18 °C. Read from the DOAJ and RISE summaries only; full text not read.
- FULL TEXT READ 18 Oct (J.B. upload). Key points:
  - "Theoretical upper limit". The paper itself says the results "should not be considered a benchmark of what is achievable" but a guide to thermodynamic limits, like Carnot efficiency (Discussion).
  - Setup: direct free air cooling (outdoor air, no heat exchanger), a 1 MW model of Boden Type DC One, PUE 1.012–1.048, Luleå weather. No heat pump, no transport losses, the whole exhaust stream goes to reuse.
  - Formula, eq. 19: iERF = (T_exhaust − T_reuse) ÷ (T_exhaust − T_ambient). Zero when ambient ≥ reuse temperature.
  - Excess-heat temperature of air-cooled data centres "15 to 45 °C", citing Ebrahimi 2014.
  - The reuse temperature (13–18 °C) is the final temperature of the air after the reuse application. That suits greenhouses and preheating, not building heating without a heat pump.
  - With seasonal reuse temperatures (monthly average + 5 °C), ERF is 0.66 / 0.71 / 0.73.
  - The paper compares this with the authors' earlier greenhouse study, which reused 30% of energy at 18–24 °C. The text cites it as [20], but [20] in the list is Gupta & Puri 2021 (adsorption). The greenhouse study is probably [26], Ljungqvist et al. 2021, Energy 215:119169. Citation slip; not verified.
  - My calculation, not the paper's: eq. 19 on the CWEC hourly weather the tool already uses, optimising one annual reuse temperature. Vancouver 0.54 / 0.64 / 0.71 (at 17 / 19 / 21 °C); Edmonton 0.47 / 0.55 / 0.61 (at 13 / 16 / 16 °C), for exhaust 30 / 40 / 50 °C. Not validated against the paper's Luleå numbers (Luleå weather not in hand).
- Yuan, Liu, Sun, Lin, Fan, Zhao, Kosonen 2025, "Data center waste heat for district heating networks: A review", RSER 219, 115863. Peer-reviewed review; FULL TEXT READ 18 Oct (J.B. upload).
  - Table 2 (from Oró et al. 2019 and others), air-side systems (CRACs/CRAHs): return hot air 25–47 °C; condenser coolant 40–50 °C; return warm water 15–20 °C. Air-to-liquid HEs: 20–30 °C, condenser 40–50 °C. Liquid-side: 50–60 °C.
  - Air-side cooling: "market share exceeding 80 %" (citing [51]).
  - Heat pumps are "essential" for air-side heat at 15–50 °C (Sec. 4 / Discussion).
  - "about 50–70 % of them can be effectively recovered" (Sec. 1). Cited to [27], Singapore energy statistics 2023, Ch. 3 (energy consumption). That source is unlikely to support a recovery share. Not split by cooling type. Treat as UNSUPPORTED.
  - Oró et al. 2019 (as summarised in the review): 1 MW air-cooled, Barcelona. Sources were the hot aisle (water-to-air HX) and the chiller condenser (water-to-refrigerant HX), with a heat pump to 90 °C. Heat recovery was "generally not feasible for most traditional air-cooled DCs" financially; rear-door cooling was more viable. The review says this may apply only to low-heating-demand southern Europe.
  - Built/studied air-side cases in its Table 3: Wahlroos et al. (Finland, CRACs; recovery runs 95–99% of the time); Petrovic et al. (Denmark, CRAHs; covers 4–27% of DH demand); Abdurafikov et al. (Finland, exhaust air); Huang et al. (China, air-side, EER 4.5 at 50 °C).
  - Gives no capture share for air-cooled heat.
- Oró, Taddeo, Salom 2019, Sustainable Cities and Society 45:522–542, doi 10.1016/j.scs.2018.12.012. Peer-reviewed; FULL TEXT READ 18 Oct (J.B. upload).
  - Setup: TRNSYS model of a 1,000 kW air-cooled data centre in Barcelona (TMY2 weather), CRAH + air-cooled chiller (rated COP 3.42) and rear-door + chiller. Heat lifted by an ammonia heat pump to a 90/70 °C DH network.
  - Two recovery points:
    - Return hot aisle (air-to-water HEX). Return air "can reach up to 47 °C".
    - Chiller condenser (water-to-refrigerant HEX in parallel with the condenser/dry cooler). Water "could reach up to 50 °C"; the recovery chiller heats the loop to 35–45 °C.
  - In one scenario the return-air water was too cold to run the heat pump (Table 15, scenario 1).
  - Result: ERF on a PRIMARY-ENERGY basis is "about 55%" with chiller-condenser recovery and "between 25 and 45%" with return-air recovery (Sec. 5 / Conclusions).
    - Weighting factors (RenewIT): electricity 2.29, exported DH heat 1.3 or 1.39 (Table 11). Not a final-energy capture share.
    - My rough conversion to final energy (× 2.29 ÷ 1.3–1.39): ~0.9 (condenser) and ~0.4–0.8 (return air). Delivered heat includes the heat pump's electricity, and heat-pump electricity is in the denominator. UNVERIFIED derivation; don't display.
  - Heat pump: Star Refrigeration datasheet (manufacturer claim), shaft COP 2.83 / 3.05 / 3.29 / 3.58 at source 30 / 35 / 40 / 45 °C → 70/90 °C (Table 7).
  - Economics (Table 15, 16): return-air HEX payback 10–14 years (viable). CRAH + chiller-condenser recovery > 15 years, not viable even at −20% capex. Rear door + chiller viable only at −20% capex. Electricity and heat prices are Spanish.
  - PUE rises with heat reuse (up to 2.2) because heat-pump electricity is inside the boundary.
- Požgaj, Delač, Pavković, Medica-Viola 2025, "Energy Efficiency Through Waste-Heat Recovery: Hybrid Data-Centre Cooling in District Heating Applications", Applied Sciences 16(1):323, doi 10.3390/app16010323. Peer-reviewed (MDPI), open access; FULL TEXT READ 18 Oct (J.B. upload).
  - Case: HPC Bura, Rijeka. 108.5 kW at full load. TRNSYS model checked against measured 2023 data (NMBE 1%).
  - Hybrid cooling: direct liquid cooling at 25–30 °C removes ~70% of IT heat. The other ~30% goes to air and is picked up by in-row chilled-water rack coolers at 10–15 °C (Sec. 2.1.1).
  - For a 65 °C+ network (3G), both chiller sets are replaced by high-temperature water-to-water heat pumps (Climaveneta EW-HT-G05, R513A, up to 78 °C; manufacturer data). This captures the air-side 30% as well (Sec. 2.1.4).
  - ERF, standard definition (heat delivered on the DH side ÷ DC energy; Sec. 2.6–2.7): 0.88 (5G), 0.86 (4G), 0.78 (3G). Payback < 1 yr (5G/4G), 14 yr (3G), Croatian prices.
  - The paper says Oró et al.'s ERF_PE is "not aligned with the standard" (Sec. 3.1). This confirms the caution above.
  - Intro, secondary citations: air streams 25–35 °C, chilled-water loops 10–20 °C; hybrid systems 30–40% to air at 25–35 °C and 60–70% to liquid at 50–60 °C (citing Davies et al. 2016, Appl. Therm. Eng. 94:296–304). Not read in the primary.
  - Limits: one small HPC cluster, not an air-cooled hall. Recovered heat was ~4% of the DH system's annual heat.
- Tofani 2022, "A case study on the integration of excess heat from Data Centres in the Stockholm district heating system", KTH MSc thesis TRITA-ITM-EX 2022:469. Interview/SWOT study with 8 stakeholders; not peer-reviewed. FULL TEXT READ 18 Oct (J.B. upload).
  - Anonymised Stockholm DC operators F and G said they invested in heat pumps to lift excess heat "from 25-28 °C to around 70 °C" (Results). OPERATOR CLAIMS via interview.
  - Air-cooled 25–35 °C, liquid 50–60 °C (citing Wahlroos et al. 2017). Stockholm Exergi supply 68 °C, return 35–55 °C (citing Levihn 2017).
  - Main barriers are business-related rather than technical (Conclusions). No capture share.
- "Up to 50%" from CRAC solutions: Asthana 2019 citing its ref. [9]. Secondary; UNVERIFIED.
- Built systems with heat lifted from 27–28 °C: Meta Odense 27 → 70 °C (register: Fjernvarme Fyn reports); Equinix PA10 28 °C (operator/utility claim). Our sources do not state the cooling type for either.
- Unread: MDPI app16010323 (rate-limited); RSER 2025 review S1364032125005362 (robots); KTH diva2:1723944 (robots); OSTI 2372986 (robots); ScienceDirect S2590174523001290 (robots); Oró et al. 2019 SCS 45:522–542 (abstract not on the UdL page).

## 5. Absorption / adsorption — already sourced (sources/15d §4.1, register)
- Absorption: single-effect LiBr "no lower than 90 °C"; two-stage 70–80 °C (Chen et al. 2026, Energies 19(9) 2147, peer-reviewed).
- Adsorption: driven at ~65 °C, standby below ~55 °C (Meyer et al. 2013, iDataCool, arXiv preprint). CoolMUC-2 ran from 45 °C waste heat (LRZ operator documentation; Wilde et al. 2017, IEEE SEMI-THERM). "Below 100 °C" (Ruch et al. 2014, conference).
- Not re-fetched today.

## 6. Displaced gas carbon — derived
- CO2: marketable natural gas, commercial/institutional, 1,966 g/m³ (BC) and 1,962 g/m³ (AB). CH4 0.037 g/m³, N2O 0.035 g/m³. Sources: ECCC "Emission factors and reference values" v4.0, Sep 2026, from NIR 1990-2024 Table A6.1-1/-3; AB EPA Carbon Offset Emission Factors Handbook v3.3, Aug 2026, Table 5 (local).
- GWPs: AR5, CH4 28 and N2O 265 (NIR 2026 Part 1, local). HHV 38.39 MJ/m³ (ECCC Table 8).
- Result: 51.5 kg CO2e/GJ of gas. At a 0.85 boiler, about 218 kg CO2e per MWh of heat, BC and AB alike.
- Heat-pump electricity per MWh of heat at COP 3.0–4.5, using the tool's grid factors (NIR 2026 Annex 7, consumption intensity 2024): BC 18.1 g/kWh gives 4–6 kg; AB 346.1 g/kWh gives 77–115 kg.
- Not included: marginal vs average grid, the data centre's own cooling electricity, and upstream gas.
