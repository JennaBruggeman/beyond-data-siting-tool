# What affects the results, and what throws them off

Weighting study of 21 Oct 2026 (`weighting_study.py`). Numbers are from `factor_study.csv`, `factor_correlation.csv`, `weighting_summary.json` and `weighting_top5.csv`. The charts are in `charts/`.

## 1. How the five exchanges are weighed (chart 01)

The first maps average the five exchanges equally, 20 % each. Equal weights are a choice too. Two other schemes are tested:

| Scheme | Rule | Vancouver | Edmonton |
|---|---|---|---|
| **Equal** | 20 % each | | |
| **Priority** | heat 35, energy 20, water / materials / people 15 each | | |
| **Spread** | weight = how much a score varies across the city × the share of the city where it is above 0 | heat 35, materials 19, energy 17, people 15, water 14 | heat 33, materials 22, energy 22, people 21, water 2 |

- **Priority** is an example: heat is the thesis's strongest exchange. J.B. to set the real weights.
- **Spread** lets the data say which exchanges actually separate sites.

Zoning is not one of the five. It multiplies the result ("zoning counted"), or is left out ("zoning ignored", where a rezoning could be tried).

## 2. How much the winners win by (chart 04)

**Vancouver**
- **Zoning counted:** 225–245 E 2nd Ave leads clearly in every scheme: 0.48–0.53, against 0.32–0.37 for #2.
- **Zoning ignored:** 45 E 4th Ave and 700 W Pender lead (0.70–0.79). After them the scores drop, so #3–5 are weaker.

**Edmonton**
- **Zoning ignored:** the top five sit within about 0.03 of each other in every scheme. They are a group of near-equals, not a ranking.
- **Zoning counted:** the top five sit within about 0.07. 8803 Stadium Rd NW is #1 in every scheme.

Scores are only comparable within one scheme, not across schemes.

## 3. Which sites hold up whatever the priorities (chart 05)

Five hundred random weightings were tested, each giving the exchanges any mix that adds up to 100 %. A site's stability is the share of them in which it lands among the city's best 30 cells (about 30 ha).

**Robust, zoning counted**

| City | Site | Zoning | Stability | Rank in all three schemes |
|---|---|---|---|---|
| Vancouver | 225–245 E 2nd Ave | FC-2 | 100 % | #1 |
| Vancouver | 1485 Venables St | I-2 | 38 % | #2 |
| Edmonton | 8803 Stadium Rd NW | IM | 77 % | #1 |

Next in Edmonton: 12503 66 St NW (66 %), 12521 123 St NW (49 %) and 5630 103A St NW (43 %). Their ranks change with the scheme.

**Robust, zoning ignored (rezoning candidates)**

| City | Site | Stability |
|---|---|---|
| Vancouver | 45 E 4th Ave | 59 % |
| Vancouver | 700 W Pender | 42 % |
| Edmonton | 8803 Stadium Rd NW | 46 % |
| Edmonton | 9804 107 St NW | 45 % |
| Edmonton | 11305 83 Ave NW | 42 % |
| Edmonton | 11410 Groat Rd NW | 39 % |

Everything else depends on how the exchanges are prioritized.

## 4. What throws the simulation off

1. **Edmonton water is one source.**
   - The score counts only the distance to Gold Bar, so it is above 0 in only 12 % of the city (chart 02).
   - With equal weights, 88 % of Edmonton loses a fifth of its possible score whatever else is there, and the east side is favoured.
   - The spread scheme cuts water to 2 %.
   - Fix: add more water sources, such as stormwater, other industrial users, or a second plant. Or report water separately rather than in the average.

2. **Three Vancouver exchanges reward the same places** (chart 03).
   - Heat and water correlate at +0.72, heat and materials at +0.67, and water and materials at +0.50.
   - Dense mixed-use cells (False Creek flats, downtown) have heat demand, cooling towers and an industrial edge all at once, so the same blocks are counted two or three times.
   - This is part of why the Vancouver overlap centres on Mount Pleasant and downtown.
   - Edmonton's exchanges are more independent (all below +0.45).

3. **Zoning decides more than any exchange.**
   - The zoning score jumps from 0.1 (rezoning) to 0.7 (case by case), a sevenfold change.
   - 82 % of Vancouver cells and 81 % of Edmonton cells sit at 0.1, so "zoning counted" maps mostly show where zoning allows a data centre.
   - The rezoning maps exist for this reason.

4. **Capped scores tie at the top.**
   - Counts are scaled so the city's 95th percentile = 1, and cells inside a district energy network score heat = 1.
   - 6.4 % of Vancouver cells and 4.9 % of Edmonton cells sit at heat = 1, so heat can't separate them.
   - Ties are broken by heat demand when picking peaks.

5. **Downtown Vancouver energy is halved.**
   - BC Hydro's West End supply area has no new feeders until about 2032, so energy is × 0.5 there.
   - This pushes Vancouver's energy peaks south (the top one is at Cecil St).
   - It is a real constraint, but the × 0.5 is a choice.

6. **Old or missing data.**
   - Substations come from the CanVec map layer (map years 1986 and 1977). Neither city has a grid capacity map.
   - Iona Island, recyclers, refurbishers and greenhouses are not placed. Materials uses industrial zoning as a stand-in.

7. **The census is spread evenly within each dissemination area**, so the people score is smoother than real density.

8. **Receivers without a demand figure count as 0.** That is 88 in Vancouver (mostly campuses and tenants) and 156 in Edmonton.

9. **Assumed distances.** The substation reach (2 km), Gold Bar reach (5 km), people radius (800 m), noise radius (150 m) and others are assumptions. They are listed in `factors.csv`.
