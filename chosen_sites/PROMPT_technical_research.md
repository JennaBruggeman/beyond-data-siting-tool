I'm an architecture student (UBC M.Arch, GP1 thesis: data centres as neighbours). I have no engineering background. I need to know, as the architect, every technical requirement that shapes the design of a data centre on my two sites: fire, life safety, structure, acoustics, and the envelope and services that follow from them.

Please research this properly and write it up so I can design from it. Don't design anything yet. This is the research that the program, plans and sections will rest on.

## The two projects (see chosen_sites/ and DESIGN_BRIEF.md)

**Vancouver: 275 1st Ave E**

- **Zoning:** I-3, a conditional use; the ground floor can't hold data storage.
- **Size:** about 10.2 MW of servers, 3 floors, about 5,260 m², height 18.3 m.
- **Plant:** liquid cooling, heat pump to the NEU, dry coolers on the roof, generators in the yard.
- **Public program:** a ground floor with a public refuge or clean-air room.

**Edmonton: 8803 Stadium Rd NW**

- **Zoning:** IM. Develop option B, a smaller data centre argued as Minor Industrial, so noise, emissions and fuel and battery hazards must stay on site.
- **Context:** residential neighbours close by.
- **Public program:** the public refuge is shown as a policy ask.

## Codes that apply (check the current edition and its adoption date)

- **Vancouver:** Vancouver Building By-law (VBBL) and Vancouver Fire By-law (not the BCBC directly); Noise Control By-law No. 6555; Zoning and Development By-law.
- **Edmonton:** National Building Code – 2023 Alberta Edition; National Fire Code – 2023 Alberta Edition; Community Standards Bylaw 14600 (noise); Zoning Bylaw 20001.
- **Referenced standards:** only where the codes reference them. Likely ones:
  - CSA C282 (emergency electrical power supply);
  - CSA B139 (fuel-burning equipment);
  - the NFPA standards the codes cite (sprinklers, clean agents, battery storage);
  - NBC Part 4 for structure.

  Say which edition the code references.

## What to research

For each item, give:

- the requirement;
- the exact code section or source;
- whether it differs between Vancouver and Edmonton;
- **what it means for the drawings:** room sizes, fire separations, wall and floor assemblies, heights, clearances, setbacks, locations.

**1. Classification and construction**

- Occupancy classification of a data centre (and of the plant, battery, fuel and public spaces) under each code.
- Mixed-occupancy separations, especially between the data centre and a public refuge or ground floor.
- Construction type allowed for this height and area (combustible, noncombustible, encapsulated mass timber), and whether mass timber is realistic for a data centre.
- Sprinkler requirements.

**2. Fire protection and suppression**

- Sprinklers: pre-action, double interlock.
- Clean-agent gas systems (inert gas or chemical), with current agent availability in Canada (check phase-outs).
- Room integrity and pressure relief.
- Early smoke detection (aspirating systems, VESDA).
- The acoustic risk to hard drives from gas discharge.
- Firefighter access, standpipes and fire department connections.

**3. Lithium-ion batteries (UPS and any grid battery)**

- Fire code requirements: separation, ventilation and off-gas detection, quantity limits, spacing.
- Thermal runaway.
- Where they may go (floor level, exterior walls).
- Any requirement for emergency responders.

**4. Generators and fuel**

- CSA C282 duration classes.
- Fuel storage limits indoors and outdoors; day tanks and their rooms.
- Secondary containment, and setbacks from property lines and openings.
- Exhaust and air permits (Metro Vancouver; Alberta).
- Generator testing schedules and the noise exemptions for them.

**5. Structure**

- Live loads for data halls, battery rooms and plant: what the code requires against what industry uses (label industry figures as claims).
- Roof loads for dry coolers and generators, with vibration isolation.
- **Seismic in Vancouver:** importance category. Is a data centre, or the refuge room, "post-disaster"? What changes if so? Non-structural anchorage of racks and plant.
- Snow loads in Edmonton.
- Floor-to-floor heights. Here are the claims to verify: 5.5–6.5 m, and the services stack of racks, containment, busway, cable tray, lighting and suppression.

**6. Acoustics**

- The exact noise limits at the property line and at a neighbour's home, day and night, in each city: Vancouver By-law 6555 and Edmonton Bylaw 14600, with zone categories.
- What that means for dry coolers, generators and rooftop plant: sound power of typical equipment (label manufacturer figures as claims), screening, distance, and enclosure assemblies.
- Low-frequency hum.
- Vibration to neighbours.
- Which way the plant should face given where the nearest homes are (use the site packs).

**7. Security and public access**

- What's realistic for a public ground floor or refuge in a secure facility: separate entrances, standoff, compartmentalization. Label industry guidance as such.
- Egress for both.

**8. Envelope and services**

- Walls and roofs for a building with heat inside all year: condensation and dew-point control around liquid cooling, air-tightness, and how the energy codes apply to a mostly windowless process building.
- Louvres and intake and exhaust separation.
- What changes if the building faces a public street.

**9. The refuge or clean-air room**

- Any code or guidance in BC and Alberta for cleaner-air or warming spaces: occupant load, filtration (MERV 13 or better), air changes, backup power, accessibility.
- Our sources say 3.5 m² per person, MERV 13+, and 2–3 air changes an hour. Verify these.

## Claims from a Google Copilot conversation to check

None of these are verified. Confirm or correct each one with a primary source:

- Novec 1230, FM-200 and Inergen.
- Gas discharge "over 130 dB" damaging hard drives, and silenced nozzles bringing it under 110 dB.
- "NFPA 110 requires 24–96 h of fuel."
- The "133 % tank rule".
- "Day tanks over 660 gal (2,500 L) need a 3-hour room under NFPA 30." Our register attributes the 2,500 L limit to NFPA 37 s. 4.1.4.
- Floor loads of 250–500 lb/ft². Our register has about 6.0 kPa as a US design figure (claim) against the code's 2.4–4.8 kPa.
- Mass timber "50 % lighter, 65 % less carbon".
- The floor-to-floor stack above.

## Rules

- **Sources:** primary only. Codes and by-laws, standards, government and utility documents, and peer-reviewed research. No popular sources (news, blogs, Wikipedia, vendor marketing). Manufacturer and operator figures must be labelled as claims.
- **Paywalls:** many standards (CSA, NFPA) are paywalled. Don't circumvent paywalls or blocked sites. Say what's behind the paywall and that I can get it through UBC Library. Use the code's own text where it's free.
- **Accuracy:** mark anything you can't confirm as unverified. Never guess a number.
- **Canadian codes first.** Use US standards only where a Canadian code references them, and say so.
- **Writing:** Canadian spelling. Short, plain language, no long paragraphs. I'm not an engineer, so explain terms the first time.

## Output (save in chosen_sites/research/)

1. **A requirements table**, one row per requirement, with these columns: topic, requirement, Vancouver, Edmonton, source and section, trust (code / standard / government / peer-reviewed / claim / unverified), and what it means for the drawings.
2. **A short "design consequences" summary per site:** the rooms, separations, assemblies, heights, clearances and plant positions I must draw. Link it to the program in DESIGN_BRIEF.md and the site plans you already made, and flag anything in those drawings the research changes.
3. **The Copilot claims list**, each one marked confirmed, corrected or unverified, with its source.
4. **Open questions** that need an engineer, fire consultant or the City.

Tell me your plan first, including which documents you can and can't open, before writing it up.
