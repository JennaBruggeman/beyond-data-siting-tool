# Booklet update: what changed in the review deck (27 Oct 2026)

Bring the booklet in line with the review deck (Beyond_Data_review_28Oct.pptx). Same rules as always: don't make things up; mark anything unverified with "?"; label operator claims as claims; Canadian spelling; short text; 90° leaders, labels off the drawing; red for key words only.

## 1. The Vancouver site moved: 275 → 339 1st Ave E
- **New site: 339 1st Ave E**, the vacant gravel lot east of Red Truck Beer (275 1st Ave E).
  - About 4,455 m² (City parcel); zoned I-3; no building on record.
  - The site code stays **V09**.
- **Why:** 339 was already in the simulation's #1 Vancouver area. In `site_maps/shortlist_by_area.csv` it's cell `van_17_20` and scores 0.477, higher than 275 (`van_16_20`, 0.44). 275 had been fixed on 22 Oct, before the lot-by-lot shortlist existed.
  - Building on 339 means no demolition, and the brewery and diner aren't displaced.
  - The trade-off is that 339 is about half the area of 275.
- **New figures for 339** (`site_maps/van_grid.geojson`, cell `van_17_20`). Old values for 275 in brackets:

  | | 339 (275) |
  |---|---|
  | Heat | 0.832 (same); 167 buildings in reach (171); on the NEU |
  | Energy | 0.211; substation about 600 m; 126 public chargers within 1 km (132) |
  | Water | 0.364 (0.591); 16 cooling towers and water-treatment systems within 500 m (26) |
  | Materials | 0.784; 36 schools within 2 km (39); truck route 175 m (110) |
  | People | 0.404; 13,994 within 800 m (14,657); **140 within 150 m (321)** |

- **Not checked yet:**
  - Whether 339 is in I-3 sub-area A, the only sub-area where "Bulk Data Storage" is allowed (?).
  - The building fit on 339. It needs a new tool run.
- **Update every booklet sheet that names 275 or uses its numbers:**
  - S12, the shortlist: the red row is now "V09, 339 1st Ave E"; 275 becomes a plain row.
  - The site sheets.
  - The "why two sites" sheet: 13,994 people within 800 m.
  - Any design brief or ledger text.
- The decision ledgers (`chosen_sites/SITE_DECISIONS_22Oct.md`, `SITE_LEDGER_2026-10-25.md`) still say 275. They need a dated note. Don't overwrite the history.

## 2. New site plans (deck slides 31 and 33)
- Each site now has a plan view, replacing the earlier 3D massing renders.
  - Figure-ground, with cast shadows, parcels, street trees, rail and the lot in red dashed outline.
  - Rotated so the lot sits square. North arrow and a 50 m scale bar.
- The generator is in the deck folder: `siteplan/plan.py`, with `van_cfg.json` and `edm_cfg.json`.
- **Sources:**
  - **Vancouver:**
    - City of Vancouver open data: parcels, 2009 footprints and 2022 LiDAR heights, street trees, railways (trees and rail read 27 Oct).
    - From aerial imagery, 2026: the trees on the lot and the excavation at 375 1st Ave E.
  - **Edmonton:**
    - City of Edmonton 3D Buildings and the City's public trees (read 27 Oct).
    - Lot lines from Altalis title mapping: academic use only, never in git.
    - The new Blatchford townhouses north of Airport Rd are in 2026 aerials but not yet in the City 3D model, so the plan shows their parcels only.
- **Labels:**
  - Vancouver: rail corridor (CN and BNSF); Red Truck brewery; the site; the excavation at 375 1st Ave E ("under construction").
  - Edmonton: the site (two lots, 8,837 m², zoned BE, vacant); Blatchford's new townhouses; the Edmonton Inn & Conference Centre (11830 Kingsway NW).
- If the booklet has site sheets, use the same plan style so the two match.

## 3. Water exchange drawing: greywater added
- The water drawing (`pitch/review/water_light.html`) now has a fifth receiver, **"Greywater, in"**.
  - A neighbouring apartment block, with a dashed line from it into the cooling tower.
  - Tag: speculative. Case: "Shared between buildings in San Francisco (not a data centre)".
- **Source:** SFPUC Onsite Water Reuse Program Guidebook. It allows district-scale systems "serving two or more buildings", with cooling as an allowed use.
  - It's been added to the tool's sources as `sfpucReuse`.
  - Patch: `register/patches/add_sfpuc_greywater_2026_10_27.py`.
- Vancouver's VBBL 2025 still limits greywater to the same dwelling.
- If the booklet's water sheet is a separate render, add the same receiver.

## 4. Ideas the exchange drawings still miss (from the tool's opportunity list)
Add them where space allows. In priority order:
1. **Already pictograms in the deck, so the drawings should match:**
   - Fish farm (heat)
   - Snow-melted sidewalks (heat)
   - Copper bank (materials)
   - Land held for later (people and place)
2. **Built here:**
   - Stormwater held for the neighbourhood (water)
   - Grid upgrades shared with neighbours (energy)
3. **Refuge:** a warming centre, refuge or clean-air room in an outage (people and place).

Also possible:
- Hospital or campus anchor (heat)
- A new district with the data centre as its heat plant (heat)
- Seasonal ground storage (heat)
- Cooling for neighbours (heat)
- Backup power in a blackout (energy)
- Solar on neighbours' roofs (energy)
- Emergency water (water)
- Condensate to cooling water (water)

Leave sewage heat out. It's a comparison source, not an exchange.

## 5. Smaller deck changes that may affect the booklet
- **"Why two sites":** the heat row is now "Heat network nearby: Hot water (Vancouver, the NEU) / Ambient (Edmonton, Blatchford)". It was "Steam", which is Creative Energy downtown, not the NEU near the site.
- **"Why Vancouver and Edmonton":** three rows.
  - Winters: mild / cold
  - Power: hydro, rationed / gas, self-supplied
  - Heat network nearby: hot water / ambient
  - The policy behind the power row: BC Bill 31 has data centres compete for up to 400 MW. Alberta's AI data centre strategy favours sites that bring their own power, with a hardware levy from 31 Dec 2026.
- **Data-centre map:** frames widened to take in suburban listings.
  - Vancouver adds Coquitlam: Tech Futures YVR2 and SmartColo.
  - Edmonton adds the Beacon campuses (Acheson, Heartland, Saunders Lake) and the Meta Sturgeon site.
  - UBC's University Data Centre was added, in the Pharmaceutical Sciences Building at 2405 Wesbrook Mall.
  - The suburban campuses may still be planned (?).
- **Harbour Centre:** Vancouver's main carrier hotel. Several data centres sit inside it: Cologix VAN1 and VAN5, eStruxture VAN-2 and others. Built in 1977 over and around the 1928 Spencer's department store; a telecom hub since 1994 (owner's claim).
- **The Internet Centre (E01):** in Strathcona Industrial Park, south Edmonton. Its sign states what it is. A new frontage photo has been added.
- **Site-visit findings:** hide, face and machine split, guard. They now sit on the "Eleven sites, four lenses" sheet. The separate findings slide was dropped.
