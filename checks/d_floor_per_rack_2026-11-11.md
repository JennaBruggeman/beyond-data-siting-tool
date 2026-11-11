# (d) 2.32 m² per rack against built halls, 11 Nov 2026: report only, no changes

## Weaknesses first
- **None of the built halls we hold states a rack count.** Area per rack is derived: floor area ÷ capacity × kW per rack (our arithmetic, trust 40 at most: operator claims combined).
- **"Site capacity" may not be IT load.** Spec sheets don't say whether MW is IT or facility power. If it's facility power, the real IT density is lower and m² per rack higher.
- **Floor may not be all hall.** "DC space" (Cologix) may include support rooms. Qu's "raised floor" is closer to hall only.
- Qu EDM1 lists 248 tons of cooling (about 0.87 MW) against 2.5 MW capacity, so the hall may not be built out to 2.5 MW (?).

## The tool's figure
2.32 m² per rack (25 ft²): Schneider WP 46, "rack floor equivalent", aisles included; what else it covers (cooling units, PDUs) not stated. Same family: Schneider WP 144 gives 2.6 m² (28 ft²); WP 46's own design table uses 2.79 m² (30 ft²). Intel 2012 (rooms with cooling units and PDUs inside): about 5.6 m² per rack (our arithmetic from its table).

## Two built halls
| Hall | Floor | Capacity | kW per rack (claim) | kW per m² | m² per rack (our arithmetic) |
|---|---|---|---|---|---|
| Qu EDM1, Edmonton (quEDM1_2026) | 1,460 m² raised floor | 2.5 MW | ~5–10 | 1.71 | **2.9–5.8** |
| Cologix VAN4, 175 W Cordova (cologixVAN4_2026) | 3,716 m² DC space | 6.5 MW (spec sheet) | 6–8 | 1.75 | **3.4–4.6** |
| Cologix VAN4, web page figure | 3,716 m² | 4 MW (cologixVAN4web; conflict open) | 6–8 | 1.08 | **5.6–7.4** |

Not used: Cologix VAN3 (3 MW over 42K ft², "up to 20 kW per cabinet": a ceiling, not a design density) and VAN2 (office-tower suites).

## Finding
- 2.32 m² per rack is **below every built-hall figure** (2.9–7.4 m²). Only Qu EDM1 at its 5 kW end comes close.
- At 2.32 m², the tool would place about **1.3–3× more racks** in a hall of a given size than these halls hold.
- This matches the scope note: 2.32 is rack and aisle only. Built halls also hold cooling units, PDUs and egress. Intel's 5.6 m² (cooling and PDUs in the room) sits inside the built range.

## What it means for building (d)
- Using 2.32 m² as-is would raise 339 from 2.5 MW to about 4.0 MW (8 kW racks): an overstatement.
- Two options for when (d) is built:
  1. **Racks from the tool's own rack-layout check** (scene3d places cooling units and aisles), not from a per-rack figure. Recommended: it follows the drawn hall.
  2. **A per-rack figure from built halls**, about 3–6 m² (range above, trust 40), labelled derived.
- The current method (hall m² per MW, 290–630, from four built Canadian halls) already sits close to these halls: at 8 kW a rack it equals 2.3–5.0 m² per rack.
