# The data centre that makes the exchanges possible: design brief for the two sites

Sources are the Beyond Data tool run on each lot (22 Oct 2026, `report_full.pdf` and `tool_data.json` in each site folder), the tool's constants (`tool/engine.js`) and the booklet's exchange sheets 0–5. Ranges are as the tool gives them. Operator and manufacturer figures are claims.

## 1. What makes the exchanges possible

A conventional data centre (air cooling, air-cooled chillers, no heat recovery) offers its neighbours almost nothing. Each exchange depends on a design choice:

| Exchange | The design choice that makes it possible | Key numbers |
|---|---|---|
| **Heat** | **Liquid cooling** (cold plates on the chips), then a **heat exchanger at the boundary** (the metered hand-off), then a **heat pump** to lift the heat, then a **buffer tank**, then a **twin pipe** to receivers or a district network. Keep a **dry cooler** to reject heat when no one needs it (summer). | Liquid captures 48–75 % of server heat at 50–60 °C; air gives 25–35 °C. Heat pump COP 3.0–4.5 (tool range). Receivers need about 65–70 °C supply. Tool: "heat offered needs liquid cooling and a heat pump." |
| **Energy** | **Batteries and UPS sized to answer the grid**, not only to bridge to generators. A **controllable (curtailable) load**. Space for **rooftop solar**. **EV chargers** at the street edge. Switchgear and a site substation. | Battery bridge 10–15 s to generator start. BC Hydro curtailment: at least 10 % on 24 h notice, at least 144 h a year, $50/kW-yr. |
| **Water** | **Dry coolers** use almost no water. If evaporative towers are used: a **rain tank**, **blowdown recovery** (treat and return), and a connection for **reclaimed water**. | Tower make-up 1.8–3.0 L/kWh of heat; blowdown 0.3–1.5. Rain on 1,000 m² of roof: 1,160 mm/yr Vancouver, 420 mm/yr Edmonton. |
| **Materials** | A **loading dock and truck route** sized for refreshes. A **room to wipe drives on site**. Staging space for refurbishers. | Servers refreshed every 5–6 years (4–5 refreshes in 25 years); pipes last 30–50 years, the building decades. |
| **People and place** | An **active ground floor**: a public door, a **refuge or clean-air room** on the data centre's backup power. **Acoustic screening** of the roof plant. A security standoff designed as public realm, not a blank wall. | Refuge: 3.5 m² a person, MERV 13+ filters, 2–3 air changes an hour. Night limits at a home: 45, 50 or 55 dBA by zone. Standoff about 10 m (45 m enhanced). |

**The design principle:** the parts that outlast the servers (pipe, grid connection, heat exchanger room, ground floor) are the exchange infrastructure. Design them for the next tenant too. The tool's "four futures" step warns that if a later tenant switches from liquid to air cooling, the heat offered drops to none.

**Plant space per MW** (tool constants, `engine.js`; manufacturer claims, equipment only, spares added when laid out):

| Item | m² per MW |
|---|---|
| UPS | 2.0–2.4 per MW of servers |
| Batteries | 2.2 per MW of servers |
| Heat pump | 3.4 per MW of servers |
| Coolant distribution units (CDU) | 0.6 per MW of servers |
| Dry coolers (liquid cooling) | 19.5–30.5 per MW of heat (servers × PUE) |
| Air-cooled chillers (air cooling) | 17–26 per MW of heat |

PUE is 1.4–1.55. Sound power is about 98–101 dBA per ~1 MW air-cooled unit, and 98.5–102 dBA per dry-cooler unit.

## 2. The two sites as the tool sees them

| | 275 1st Ave E, Vancouver | 8803 Stadium Rd NW, Edmonton |
|---|---|---|
| Zoning | I-3. "Bulk Data Storage" is a **conditional use**: the City decides on a development permit, sub-area A only | IM. **Smaller only.** Minor Industrial is permitted. A large data centre is treated as Major Industrial and **needs a rezoning to IH**. A smaller one whose noise, emissions and fuel or battery hazards stay on site could be argued as Minor Industrial; the Development Planner decides. |
| Envelope | Floor area up to 3.0 × the lot (the extra 2.0 doesn't apply to storage). Height 18.3 m; the City may allow 30.5 m, and up to 45.7 m in sub-area A. Yards: front 0.6 m, sides 7.6 m, rear 3.1 m. At most 61 m wide and deep. Ground floor 6.0 m floor-to-floor, **no data storage at the ground floor** | Height 18.0 m. Floor area up to 2.0 × the lot. Setbacks 3.0 m from a street, 6.0 m next to a non-industrial zone, none to other industrial lots. |
| Lot (tool) | 7,803 m² | 8,811 m² |
| Floor area available | 5,260 m² (3 floors of about 1,753 m²) | 14,501 m² |
| Data hall | 1,683–2,525 m², with none on the ground floor | 6,961–10,441 m² |
| Largest that fits | **10.2 MW** of servers with plant, generators and loading (2.7–10 MW counting floor space only) | **34.7 MW** (11–35 MW counting floor space only). The zoning favours the small end. |
| Power at the meter | 14–16 MW | 49–54 MW |
| Energy a year | Servers 53,600 MWh; whole site 75,000–83,000 MWh | Servers 182,400 MWh; whole site 255,000–283,000 MWh |
| Plant area | 286–458 m² | 972–1,558 m² |
| Jobs | 9–29 | 30–98 |
| Heat it could offer | 33–60 GWh a year, with liquid cooling and a heat pump | 113–205 GWh a year |
| Heat value here | $40/MWh (the gas it replaces) | $13/MWh |
| Best heat set-up found | Liquid cooling, one pipe to one building, $48/MWh against $40; heat pump about 3.5 MW, COP 4.6–5.7 to a 70/50 °C system | Liquid cooling, one pipe to one building, $37/MWh against $13 |
| Heat network | **Inside the Neighbourhood Energy Utility** service area (tool data) | Downtown District Energy, planned Phases 2–4, about 915 m away |
| Grid | Nearest substation about 600 m; 3 within 2 km. Named: Murrin, 721 Main St (about 1.1 km, in service); East Vancouver, 303 Vernon Dr (about 1.9 km, BC Hydro project) | Nearest about 2.0 km; none within 2 km |
| Water | Dry or air-cooled: almost none. Rain about 1,626 m³ a year off the roof. Reclaimed water: no price set (Metro Vancouver UT-019) | Rain about 1,634 m³ a year. Gold Bar reclaimed water supplies one industrial customer by a 5.5 km pipe; price not published |
| Sound (tool's default layout) | 8 air-cooled chillers, 107–110 dBA together | 25 air-cooled chillers, 112–115 dBA together |
| Opportunities ruled out | Rainwater, condensate and reuse (with the default air-cooled set-up) | Backup power for neighbours, refuge room (Community Service isn't listed in IM), and rainwater reuse |
| Others (19 of 21) | Not ruled out; most "not yet known" because the rule wasn't read for this zone | Not ruled out; most "not yet known" |

The tool's default run used air cooling, dry coolers, plant on the roof, N+1 spares and generators in the yard. That's the conventional baseline, and it's why water reuse is ruled out. **The exchange design should switch to liquid cooling and a heat pump.**

## 3. What the design should decide (for J.B.)

- **Edmonton size:** the zoning points to a smaller data centre argued as Minor Industrial, unless you propose a rezoning to IH. One approach is to size it to the heat that can be used nearby. The tool counts 35 buildings in reach of the site, about 54,700 MWh a year counted at their distances (`E05_heat_receivers.csv`). The tool gives the range; the size is your call.
- **Vancouver ground floor:** I-3 allows no data storage at the ground floor. That frees it for the public program, the heat-exchange room, loading and the refuge.
- **Where the plant goes:** on the roof (screened; roof equipment can exceed the height limit at the Director's discretion, Vancouver s. 10.1.1) or in the yard (the side yards are 7.6 m in Vancouver).
- **Heat route:**
  - Vancouver: into the NEU (feeding an existing network is "not searched yet" in the tool) or a direct pipe.
  - Edmonton: wait for, or connect to, the Downtown District Energy phases.

## 4. Not in the tool or the sources (mark as open)

- Generator count, size and fuel tank sizes.
- Copper tonnes per MW.
- Truck trips per refresh.
- Source sound levels for a liquid-cooled plant.
- How much heat air cooling could give with chilled-water heat pumps.
- Costs of the public ground floor and refuge.
- Structural floor loading (the tool checks floor strength only for existing buildings).
