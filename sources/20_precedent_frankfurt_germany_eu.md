# 20 — Code precedent: Frankfurt am Main, Germany (EnEfG), EU (EED 2023/1791, DR 2024/1364)

Compiled 2026-10-14 for the "Beyond Data" tool. Purpose: give the tool real "if you moved a limit" rules from a jurisdiction that regulates data-centre heat, efficiency and siting.

**How to read this file**
- German quotes are the original text, as returned by the fetch tool. The tool limits quotes to short fragments, so most quotes are **partial sentences**. They are not full provisions.
- English renderings are labelled **Translation (Claude)**.
- **UNVERIFIED** means I could not confirm the point against an official primary text in this session.
- gesetze-im-internet.de blocked automated fetching (robots). The EnEfG text below was therefore read from the **official Bundesgesetzblatt PDF** (BGBl. 2023 I Nr. 309), retrieved from the University of Bonn legal-deposit copy (source 2). Amendments made after 17 Nov 2023 would not appear in that copy (see Gaps, item 1).

---

## Summary table

| # | Rule | Status (as of 2026-10-14) | Key limits | Families |
|---|---|---|---|---|
| A1 | Frankfurt Rechenzentrenkonzept, part of the Gewerbeflächenentwicklungsprogramm (GEP) update. Magistrat Vortrag M 44 of 21.03.2022, adopted by Stadtverordnetenbeschluss § 1838 of 09.06.2022 | Adopted, municipal planning policy (informal, not binding on its own) | Eignungs-, eingeschränkte Eignungs- and Ausschlussgebiete for operator-independent data centres; about 75 ha needed by 2030; 100 m "Aufmerksamkeitszone" around Dataparks; Abwärme use "anzustreben"; city-wide waste-heat concept and design standards commissioned | space, rules, heat_use, sink |
| A2 | Bebauungsplan NW 43c Nr. 2 Ä (Alt-Hausen), draft Begründung dated 09.01.2024 | Draft; example of how A1 is implemented | Operator-independent data centres excluded from a GE area; only ancillary/company data centres allowed | space, rules |
| B1 | EnEfG § 11 (BGBl. 2023 I Nr. 309, 13.11.2023) | In force | Existing DCs: PUE ≤ 1.5 from 1 Jul 2027, ≤ 1.3 from 1 Jul 2030. New DCs (from 1 Jul 2026): PUE ≤ 1.2; ERF ≥ 10 / 15 / 20 % by commissioning date; met within 2 yrs. Renewable electricity 50 % from 2024, 100 % from 2027 | power, heat_out, heat_use, rules |
| B2 | EnEfG §§ 12–14, 16, 17, Anlage 3 | In force | Data centre = ≥ 300 kW non-redundant connected load; EMS by 1 Jul 2025; validation/certification ≥ 1 MW (≥ 300 kW public); annual reporting incl. waste-heat amount and temperature; waste-heat information on request of heat-network operators | rules, heat_out, sink |
| B3 | Draft amendment, BT-Drs. 21/8027 (16.09.2026) | **Bill only**: 1st reading 24.09.2026, hearing 05.10.2026, not passed | DC threshold 500 kW IT; existing PUE ≤ 1.6 / ≤ 1.4; new-build deadline 4 yrs; ERF may be undershot if connected to a heat network; new exemption by cost-benefit analysis; 100 % RE moved to 2030; CBA for > 1 MW | power, heat_use, rules, money |
| C1 | EED (EU) 2023/1791 Art. 12 | In force | Annual public reporting (Annex VII) for DCs with installed IT ≥ 500 kW, from 15 May 2024 | rules |
| C2 | EED Art. 26(6) | In force | DCs with total rated energy input > 1 MW to use waste heat or recovery applications unless not technically/economically feasible (exact wording **UNVERIFIED**) | heat_use, money |
| C3 | Delegated Reg. (EU) 2024/1364 | In force from 06.06.2024 | Reporting deadlines 15 Sep 2024, then 15 May yearly; KPIs PUE, WUE, ERF, REF; waste heat reused (kWh) and average waste-heat temperature (°C) | rules, heat_out |

---

## A. Frankfurt am Main

### A1. Rechenzentrenkonzept (update of the Gewerbeflächenentwicklungsprogramm)

**Instrument and dates**
- Magistrat report to the Stadtverordnetenversammlung: **Vortrag M 44, dated 21.03.2022**, titled
  „Rechenzentrenkonzept - Aktualisierung des Gewerbeflächenentwicklungsprogramms" (source 4).
  *Translation (Claude):* "Data centre concept: update of the commercial land development programme."
- It builds on the council decision of 04.03.2021 (§ 7283, M 151) to update the GEP (source 4).
- **Adoption:** the Bebauungsplan Begründung (source 6) cites the concept as **Stadtverordnetenbeschluss § 1838 vom 09.06.2022**. The Hessian Landtag answer (source 7) confirms that Frankfurt adopted a "Rechenzentrenkonzept" in 2022. I did not open the PARLIS resolution itself, so the exact adopted wording, and any changes from M 44, are **UNVERIFIED**.
- Legal nature: a council-adopted planning concept. It is implemented through Bebauungspläne (zoning plans). It is not itself a binding zoning instrument. This reading is based on M 44, which states that B-Plan proceedings will follow.

**Zones** (source 5, GEP "Standorttypen" page, Anlage 3; the page shows no date)
- „Eignungsgebiete für unternehmensunabhängige Rechenzentren sind Gewerbegebiete …"
  *Translation (Claude):* "Suitable areas for operator-independent [colocation] data centres are commercial areas …"
- Eignungsgebiete are meant to „den hochgerechneten Flächenbedarf im Mittel von 75 ha bis 2030 aufnehmen können"
  *Translation (Claude):* "be able to absorb the projected land demand of, on average, 75 ha by 2030."
- Named Datapark areas with a planning requirement („Planerfordernis"): Gallus, Ostend, Griesheim, Sossenheim, Rödelheim, Seckbach, Fechenheim. Table total: **125.9 ha, of which 73.7 ha is potential**. (These figures come from the tool's reading of the table; I did not check them against Anlage 2/3 PDFs.)
- „Die Aufmerksamkeitszone wird bei Dataparks auf 100m definiert."
  *Translation (Claude):* "For Dataparks the attention zone is defined as 100 m."
  What the zone triggers is not stated in the text retrieved: **UNVERIFIED**.
- Restricted areas: data centres only „als nachrangige ergänzende Gewerbenutzung".
  *Translation (Claude):* "as a subordinate, supplementary commercial use."
- Exclusion areas: „Urbane Gebiete sind als Ausschlussgebiete für unternehmensunabhängige Rechenzentren zu behandeln."
  *Translation (Claude):* "Urban areas [MU zoning] are to be treated as exclusion areas for operator-independent data centres."
- Exception to be examined: „ausnahmsweise kleine Rechenzentren z.B. in Kellergeschossen von Gebäuden integriert"
  *Translation (Claude):* "by exception, small data centres, e.g. integrated in building basements."

**Waste heat** (source 4, M 44)
- „Grundsätzlich ist die Nutzung der Abwärme aus Rechenzentren anzustreben, …"
  *Translation (Claude):* "In principle, the use of waste heat from data centres is to be pursued, …"
- „Diese Abwärmemengen übersteigen bei weitem die in unmittelbarer Umgebung der Rechenzentrums-Cluster …" (sentence truncated).
  *Translation (Claude):* "These amounts of waste heat far exceed [the demand] in the immediate surroundings of the data-centre clusters …"
- „Dezentral angesiedelte, kleinere Rechenzentren können besser für eine lokale Abwärmenutzung genutzt werden."
  *Translation (Claude):* "Smaller, decentrally located data centres can be used better for local waste-heat use."
- M 44 also names low temperature level and technical, economic and organisational barriers. It names new-build areas with surface (low-temperature) heating as suitable sinks (paraphrase from fetch).
- Antrag item III: „Der Magistrat wird beauftragt, ein gesamtstädtisches Konzept zur Nutzung der Abwärme aus [Rechenzentren zu erarbeiten]" (bracketed completion is mine).
  *Translation (Claude):* "The Magistrat is instructed to prepare a city-wide concept for using waste heat from data centres."
- Antrag item IV: „Der Magistrat wird beauftragt, Standards für die städtebauliche Qualität von Rechenzentren [zu erarbeiten]". These are to be binding in future developments (paraphrase).
  *Translation (Claude):* "… to prepare standards for the urban-design quality of data centres."
- Costs in M 44: about **€500,000 one-off** for the waste-heat concept and feasibility studies, plus **€93,000 per year** for staff.
- **No numeric heat-reuse quota, PUE or temperature requirement appears in the Frankfurt texts retrieved.** Frankfurt's heat expectation is a planning goal („anzustreben"), not a quota.
- Whether the city-wide waste-heat concept or the design standards were completed, and what they contain: **UNVERIFIED** (not found).

**Related Frankfurt material**
- Klimaquartier Sossenheim measure sheet „Nutzung Abwärme Rechenzentren und Wärmenetzaufbau" (frankfurt.de, Klimareferat; source 8). It covers a study of waste heat from data centres east of Sossenheim with route planning (Universität Kassel), building a heat network, and finding anchor customers. It gives no temperatures, MW, GWh or costs. "40-50%" appears beside "Fördermittel" (subsidies), but the meaning is unclear. The sheet carries no date.
- Kommunale Wärmeplanung: the council adopted a municipal heat plan that names „Abwärme aus Rechenzentren" as a potential. This comes only from an IHK press release dated 02.10.2026 (source 9). **UNVERIFIED** against a city document.
- Hesse (source 7, Landtag Drs. 21/1061, answer of 30.11.2024): Hessian law (§ 13 HEG) requires municipal heat planning for municipalities over 20,000 inhabitants. Regional planning „kann" designate priority areas for data centres. Offenbach adopted a similar concept in Feb 2024. Borderstep IT-load figures for Hesse (~900 MW in 2024 to ~1,150 MW in 2027) are a third-party study cited by the government, so treat them as a **claim**.

### A2. Implementation example: Bebauungsplan NW 43c Nr. 2 Ä "Alt-Hausen", 1st simplified amendment (source 6)
- Draft Begründung dated 09.01.2024. It cites Aufstellungsbeschluss § 4864 of 13.06.2024, which is later than the draft date. The discrepancy is unresolved, so the date is **UNVERIFIED**.
- „Ebenfalls sind in den festgesetzten Gewerbegebieten (GE) zukünftig nur noch Rechenzentren zulässig, …" The sentence continues with the condition that they serve a company, as an „untergeordnete Nebenanlage" or „untergeordneter Bestandteil der Hauptanlage".
  *Translation (Claude):* "Likewise, in the designated commercial areas, only data centres [that are a subordinate ancillary facility or subordinate part of the main use] will be permitted in future."
- Reasons given: data centres are „bodenpreiswirksam" (they push up land prices), create large building masses, and run diesel standby generators whose test runs affect nearby housing.
- No Abwärme or Fernwärme requirement appears in this plan.

---

## B. Germany: Energieeffizienzgesetz (EnEfG)

Primary text: Art. 1 of the „Gesetz zur Steigerung der Energieeffizienz und zur Änderung des Energiedienstleistungsgesetzes" of 13.11.2023, **BGBl. 2023 I Nr. 309**, published 17.11.2023 (source 2).

### B1. Definitions (§ 3)
- **Rechenzentrum (§ 3 Nr. 24):** a structure or group of structures for housing, connecting and operating IT and telecom equipment, with a **non-redundant rated electrical connected load of at least 300 kW**, including supporting infrastructure. Pure network nodes are excluded. (Paraphrase from fetch; verbatim not retrieved.)
- **Energieverbrauchseffektivität (§ 3 Nr. 15)** = PUE: the ratio of the data centre's total annual energy demand to the IT energy demand, per **DIN EN 50600-4-2 (August 2019)** (paraphrase).

### B2. § 11 „Klimaneutrale Rechenzentren" (climate-neutral data centres)

**Abs. 1, existing data centres:** „Rechenzentren, die vor dem 1. Juli 2026 den Betrieb aufnehmen oder aufgenommen haben" must reach:
- Nr. 1: „ab dem 1. Juli 2027 eine Energieverbrauchseffektivität von kleiner oder gleich 1,5"
- Nr. 2: „ab dem 1. Juli 2030 eine Energieverbrauchseffektivität von kleiner oder gleich 1,3 im Jahresdurchschnitt"

*Translation (Claude):* "Data centres that start or have started operation before 1 July 2026 [must] from 1 July 2027 [achieve] a PUE ≤ 1.5 … from 1 July 2030 a PUE ≤ 1.3 as an annual average."

**Abs. 2, new data centres:** data centres starting operation from 1 July 2026 must:
- Nr. 1: „eine Energieverbrauchseffektivität von kleiner oder gleich 1,2 erreichen"
- Nr. 2: have a share of reused energy „nach DIN EN 50600-4-6, Ausgabe November 2020" (= ERF):
  - commissioning from 1 July 2026: „von mindestens 10 Prozent aufweisen"
  - commissioning from 1 July 2027: „müssen einen geplanten Anteil an wiederverwendeter Energie von mindestens 15 Prozent aufweisen"
  - commissioning from 1 July 2028: „müssen einen geplanten Anteil an wiederverwendeter Energie von mindestens 20 Prozent aufweisen"
- Abs. 2 Satz 2, timing: „spätestens zwei Jahre nach Inbetriebnahme im Jahresdurchschnitt dauerhaft zu erreichen"

*Translation (Claude):* "… achieve a PUE ≤ 1.2; … a share of reused energy of at least 10 per cent / must have a planned share of reused energy of at least 15 / 20 per cent; … to be achieved permanently as an annual average no later than two years after commissioning."

**Abs. 3, exemptions from the ERF quota** (not from PUE):
- Nr. 1: the quota cannot be met „durch nachträgliche Ereignisse, ohne Verschulden des Betreibers des Rechenzentrums"
  *Translation (Claude):* "owing to subsequent events, through no fault of the data-centre operator."
- Nr. 2: an agreement exists „eine zwischen einer in räumlicher Nähe befindlichen Gemeinde [oder einem Wärmenetzbetreiber …] … zur Abwärmenutzung vorliegt" (ellipses in the source fragment; bracket is my reading of the paraphrase)
  *Translation (Claude):* "an agreement on waste-heat use exists between [the operator and] a nearby municipality [or heat-network operator]."
- Nr. 3: a heat-network operator „ein Angebot zur Nutzung wiederverwendeter Energie zu Gestehungskosten nicht innerhalb von sechs Monaten annimmt"
  *Translation (Claude):* "does not accept, within six months, an offer to use reused energy at production cost."
- Abs. 3 Satz 2: the heat-network operator is „verpflichtet, den Betreiber des Rechenzentrums über die Kapazität des Wärmenetzes zu informieren"
  *Translation (Claude):* "obliged to inform the data-centre operator about the capacity of the heat network."

**Abs. 4:** „Die Anforderungen nach § 16 sind für Rechenzentren entsprechend anzuwenden"
*Translation (Claude):* "The requirements of § 16 [waste heat] apply correspondingly to data centres."

**Abs. 5, renewable electricity (balance-sheet basis):** „zu 50 Prozent durch Strom aus erneuerbaren Energien" from 1 Jan 2024; „zu 100 Prozent durch Strom aus erneuerbaren Energien" from 1 Jan 2027.
*Translation (Claude):* "50 per cent / 100 per cent from electricity from renewable sources."

**About the "duty to supply heat to district-heating operators on request at reasonable prices":** the enacted 2023 text, as retrieved, **does not contain such a duty**. What it does contain:
1. The "offer at production cost" route in § 11(3) Nr. 3. Here the operator offers heat at Gestehungskosten (production cost). If the network operator does not accept within 6 months, the ERF quota is waived.
2. A duty to give **information** on request under § 17(1): „Unternehmen sind auf Anfrage von Betreibern von Wärmenetzen …" (companies must, at the request of heat-network operators, [provide information on their waste heat]).
A supply duty at reasonable prices appeared in earlier drafts, according to secondary sources. That is **UNVERIFIED**, and I did not check the drafts.

### B3. §§ 12–17 and Anlage 3 (paraphrase from source 2 unless quoted)
- **§ 12:** energy or environmental management system by 1 Jul 2025. Continuous metering of electrical power and energy of key components. Validation or certification from 1 Jan 2026 for non-redundant connected load **≥ 1 MW**, or **≥ 300 kW** if publicly owned or operated. Exemption for sites closing before 1 Jul 2027.
- **§ 13:** publish and submit Anlage 3 data for the previous year by 31 March each year.
- **§ 14:** federal Energieeffizienzregister für Rechenzentren. Data are passed to the European database.
- **§ 16(1):** companies must „die in ihrem Unternehmen entstehende Abwärme nach dem Stand der Technik zu vermeiden" and reduce it to the unavoidable share, where possible and reasonable. § 16(2) requires waste heat to be reused (on site and by third parties, ideally cascaded). § 16(4) exempts companies with ≤ 2.5 GWh/yr average final energy consumption.
  *Translation (Claude):* "avoid the waste heat arising in their company according to the state of the art."
- **§ 17 „Plattform für Abwärme":** information on waste heat goes to the Bundesstelle für Energieeffizienz „bis zum 31. März eines jeden Jahres" (by 31 March every year). The ≤ 2.5 GWh exemption applies (§ 17(4)).
- **Anlage 3 „Informationen von Betreibern von Rechenzentren":** item 2c „Menge und durchschnittliche Temperatur der mess- oder schätzbaren Abwärme"; item 2d „Menge der Abwärme, die durch das Rechenzentrum an Wärmeabnehmer geliefert wurde" plus its average temperature in °C.
  *Translation (Claude):* "quantity and average temperature of measurable or estimable waste heat"; "quantity of waste heat delivered by the data centre to heat customers."

### B4. Pending amendment: BT-Drucksache 21/8027 (source 10). **A bill, not law.**
"Entwurf eines Gesetzes zur Beschleunigung der Umsetzung der Energieeffizienzrichtlinie", federal government, 16.09.2026. Status per Bundestag (source 11): 1st reading 24.09.2026, referred to the Ausschuss für Wirtschaft und Energie, public hearing 05.10.2026, no final vote as of the page update of 14.10.2026. The bill renumbers definitions to § 2. Proposed changes:
- § 2 Nr. 18: data centre threshold becomes „mit einer elektrischen Leistung der installierten Informationstechnik ab 500 Kilowatt" (p. 9), i.e. installed IT ≥ 500 kW, aligned with EED Art. 12.
- § 11(1): existing DCs „eine Energieverbrauchseffektivität von kleiner oder gleich 1,6" from 1 Jul 2027 and „von kleiner oder gleich 1,4 im Jahresdurchschnitt dauerhaft erreichen" from 1 Jul 2030 (p. 15).
- § 11(2): new DCs keep PUE ≤ 1.2 and ERF 10/15/20 %, but „spätestens vier Jahre nach Inbetriebnahme …" (four years, not two; p. 16). New sentence: „Der Anteil an wiederverwendeter Energie nach Satz 1 Nummer 2 kann unterschritten werden, sofern ein Anschluss an ein Wärmenetz besteht." (p. 16)
  *Translation (Claude):* "The share of reused energy … may be undershot if a connection to a heat network exists."
- Also (paraphrase): waste-heat upgrading equipment (e.g. heat pumps) is excluded from the PUE electricity count, and internal heat use counts toward ERF.
- § 11(3): Nr. 2 agreement now covers heat networks buildable „innerhalb von zehn Jahren" (within ten years). New Nr. 4: no technically and economically feasible connection, „der Nachweis erfolgt durch eine Kosten-Nutzen-Analyse nach § 16 Absatz 3 und 4" (proof by cost-benefit analysis).
- § 11(5): 100 % renewable electricity moved to „ab dem 1. Januar 2030".
- § 12: validation for IT ≥ 1 MW and for public DCs; IT operators ≥ 50 kW inside DCs also covered (§ 12(5)).
- § 16(3): data centres „mit einem nominalen Gesamtenergieinput von mehr als 1 Megawatt" must do a cost-benefit analysis when planning or substantially refurbishing. No CBA is needed where heat goes to a district-heating network or is used directly (paraphrase). This mirrors EED Art. 26(6).
- § 17(1): waste-heat reporting duty for DCs > 1 MW total energy input.
- § 19: fines up to €100,000 for breaches of § 11(1)/(2) and § 16 (paraphrase).
- Bundestag summary (source 11): „Abwärme muss nur dann genutzt werden, wenn ein passendes Wärmenetz in der Nähe vorhanden ist."
  *Translation (Claude):* "Waste heat only has to be used if a suitable heat network is nearby." (This is the Bundestag's own summary, not bill text.)

---

## C. European Union

### C1. EED (EU) 2023/1791, Art. 12 (source 12; EUR-Lex body text did not load, so this was read from a full-text mirror, see Gaps)
- Directive of 13.09.2023, OJ 20.09.2023, in force 10.10.2023 (EUR-Lex metadata, source 13).
- Art. 2(49): "data centre" is defined by reference to "Annex A, point 2.6.3.1.16, of Regulation (EC) No 1099/2008."
- Art. 12(1): owners and operators of data centres with "a power demand of the installed information technology (IT) of at least 500kW" must make Annex VII information public "By 15 May 2024 and every year thereafter."
- Art. 12(3): "The Commission shall establish a European database on data centres", public "on an aggregated level."
- Art. 12(4): Member States encourage DCs with installed IT ≥ 1 MW to follow the European Code of Conduct on Data Centre Energy Efficiency.
- Art. 12(5): Commission assessment "By 15 May 2025", possibly with minimum performance standards.
- Annex VII contents (waste-heat items): **UNVERIFIED** (not retrieved). The delegated regulation in C3 does specify waste-heat KPIs.

### C2. EED Art. 26(6), waste heat for data centres > 1 MW
- Exact text **UNVERIFIED**: the EUR-Lex body and the mirror page cut off before Art. 26.
- Corroboration from an official member-state ministry (Spain, MITECO; source 14), as a paraphrase of Art. 26: „los centros de datos con una entrada de energía nominal total superior a 1 MW utilicen el calor residual"
  *Translation (Claude):* "data centres with a total rated energy input above 1 MW use the waste heat."
- Germany's draft § 16(3) (B4) implements a matching > 1 MW cost-benefit duty.
- The usual "unless technically or economically not feasible" qualifier is **UNVERIFIED**.

### C3. Commission Delegated Regulation (EU) 2024/1364 (sources 15, 16)
- "Commission Delegated Regulation (EU) 2024/1364 of 14 March 2024 on the first phase of the establishment of a common Union rating scheme for data centres". In force 06.06.2024 (EUR-Lex metadata).
- Art. 3(1): "By 15 September 2024, then by 15 May 2025, and every year thereafter" [report to the European database].
- Annex II 1(j): "Waste heat reused ('EREUSE', in kWh)", measured per "the CEN/CENELEC EN 50600-4-6 standard or equivalent".
- Annex II 1(k): "Average waste heat temperature ('TWH', in degree Celsius) shall be measured as the temperature of the fluid …"
- Annex III KPIs: "PUE = EDC/EIT"; "WUE = WIN/EIT"; "ERF = EREUSE/EDC"; "REF = ERES-TOT/EDC."
- Note: the EU ERF denominator is total DC energy (EDC). This matches DIN EN 50600-4-6, which EnEfG § 11(2) uses.
- A draft second-phase delegated act (labelling scheme, Ares(2026)3247482) exists per a non-official host. **UNVERIFIED**, not used.
- Article text above came from a mirror (lagen.nu), because the EUR-Lex body did not load. Re-check on EUR-Lex.

---

## Candidate "if you moved a limit" options (Claude's draft)

All values are taken from the texts above. "Favours / costs" describes neutral trade-offs, not judgements. B4 options are a **bill** and should be labelled that way in the tool.

| ID | Option (tool label) | Parameter values | Families | Tends to favour | Tends to cost / shift burden to |
|---|---|---|---|---|---|
| O1 | DE new-build PUE cap | PUE ≤ 1.2 (annual avg., within 2 yrs of commissioning; bill: 4 yrs) | power, heat_out | Utility (less grid draw per IT kW); residents (less total load) | Operator (cooling capex, may favour liquid/free cooling); a lower PUE also means less low-grade heat per IT kW |
| O2 | DE existing-site PUE cap | ≤ 1.5 from 2027, ≤ 1.3 from 2030 (bill: 1.6 / 1.4) | power | Utility, city climate targets | Operators of older sites (retrofit) |
| O3 | DE heat-reuse quota by commissioning year | ERF ≥ 10 % (from Jul 2026), 15 % (from Jul 2027), 20 % (from Jul 2028); ERF = reused energy / total DC energy (EN 50600-4-6) | heat_out, heat_use, sink | Residents and heat customers (low-carbon heat); city (heat-plan supply) | Operator (heat-recovery and heat-pump capex, siting constraints); utility (must take low-temperature heat) |
| O4 | DE quota escape: offer at cost | Heat offered at production cost (Gestehungskosten); if no acceptance in 6 months, quota waived | money, heat_use, rules | Operator (cap on obligation); utility (cheap heat if accepted) | Residents/city if no taker exists: heat goes unused |
| O5 | DE quota escape: heat-network link (bill) | ERF may be undershot if connected to a heat network; network buildable within 10 yrs; CBA exemption | heat_use, sink, rules | Operator; utility (gets a source to plan around) | Residents/city if delivered heat stays below the quota |
| O6 | DE renewable electricity share | 50 % from 2024; 100 % from 2027 (bill: 2030); balance-sheet basis | power, money | City climate accounting | Operator (PPA/certificate cost); balance-sheet basis means no physical local-grid effect |
| O7 | EU/DE waste-heat cost-benefit trigger | Total rated energy input > 1 MW → CBA on heat use (EED Art. 26(6); DE bill § 16(3)) | heat_use, money, rules | City/utility (information); operator (exit if not feasible) | Operator (study cost); outcome depends on CBA assumptions |
| O8 | Size thresholds: what counts as a data centre | DE 2023: ≥ 300 kW non-redundant connected load; EU/DE bill: ≥ 500 kW installed IT; validation ≥ 1 MW (public ≥ 300 kW) | rules | Small operators above/below line | Small edge sites slip outside rules if the line rises |
| O9 | Transparency / reporting | Annual reporting: PUE, WUE, ERF, REF, waste heat reused (kWh), average waste-heat temperature (°C); EU deadline 15 May; DE 31 Mar | rules, heat_out | Residents, city, utility (can see heat available and its temperature) | Operator (metering, disclosure) |
| O10 | Frankfurt: designated zones only | Colocation data centres only in Eignungsgebiete (commercial); subordinate use in restricted zones; excluded from urban/mixed (MU), retail, district-centre, port/logistics zones | space, rules | Residents in mixed areas (noise, generators, land prices); city (keeps employment land) | Operator (fewer sites, higher land cost); zones may sit far from heat sinks |
| O11 | Frankfurt: small data centres in basements by exception | Small integrated DCs allowed by exception in buildings (no size stated) | space, sink, heat_use | Heat use (the sink is on site); residents (local heat) | Operator (small scale); building owner (risk, noise) |
| O12 | Frankfurt: 100 m attention zone around Dataparks | 100 m buffer (its effect is not specified in the retrieved text) | space | Neighbours | Operator (less buildable land); unclear legal effect |
| O13 | Frankfurt: heat use "to be pursued" + city-wide heat concept | Goal only, no numeric quota; city funds ~€500k concept/studies + €93k/yr staff | heat_use, money, sink | City/utility (planning lead); operator (flexibility) | Public budget; weaker certainty for residents |
| O14 | Combined "German package" preset | O1 + O3 + O4 + O6 + O9 (2023 law) | all | — | — |
| O15 | Combined "German package (2026 bill)" preset | PUE 1.2 within 4 yrs; existing 1.6/1.4; ERF 10/15/20 % but waived with heat-network link or CBA; RE 100 % 2030; 500 kW IT threshold | all | — | — |

**Modelling notes (Claude's draft)**
- ERF depends on two things in the tool: sink demand and temperature (`sink`) and a heat pump (`heat_out`). The DE bill excludes heat-pump electricity from PUE, which removes one PUE penalty for upgrading heat.
- ERF ≥ 20 % with PUE 1.2 means reused heat ≥ 0.20 × 1.2 = 0.24 × IT energy. This is simple arithmetic from the definitions, not a source claim.

---

## Sources (accessed 2026-10-14)

1. gesetze-im-internet.de, EnEfG § 11 and full text — https://www.gesetze-im-internet.de/enefg/__11.html ; https://www.gesetze-im-internet.de/enefg/BJNR1350B0023.html — **blocked (robots), not read.**
2. Bundesgesetzblatt 2023 Teil I Nr. 309 (17.11.2023), Gesetz zur Steigerung der Energieeffizienz … (EnEfG), legal-deposit copy, ULB Bonn — https://epflicht.ulb.uni-bonn.de/download/pdf/775453
3. (not used) Bundesrat Drs. 478/23; BMWK draft — listed in searches only.
4. Stadtplanungsamt Frankfurt, Vortrag des Magistrats M 44, 21.03.2022, "Rechenzentrenkonzept - Aktualisierung des Gewerbeflächenentwicklungsprogramms" — https://www.stadtplanungsamt-frankfurt.de/show.php?ID=22067
5. Stadtplanungsamt Frankfurt, "Standorttypen des Gewerbeflächenentwicklungsprogramms" (Anlage 3; undated) — https://www.stadtplanungsamt-frankfurt.de/show.php?ID=22074&psid=5f34ce
6. Stadtplanungsamt Frankfurt, Begründung (Entwurf) Bebauungsplan NW 43c Nr. 2 Ä Alt-Hausen, 09.01.2024 — https://stadtplanungsamt-frankfurt.de/show.php?ID=24987&psid=6nb2j6lrkji70avgpbsjfl4ul2
7. Hessischer Landtag Drs. 21/1061, Kleine Anfrage "Regionalplanung und Rechenzentren", answer 30.11.2024 — https://starweb.hessen.de/cache/DRS/21/1/01061.pdf
8. Stadt Frankfurt, Klimareferat, Maßnahmensteckbrief Klimaquartier Sossenheim "Nutzung Abwärme Rechenzentren und Wärmenetzaufbau" (undated) — https://frankfurt.de/-/media/frankfurtde/frankfurt-themen/klima-und-energie/pdf/klimareferat/massnahmensteckbriefe-klimaquartier-sossenheim/abwaerme-rechenzentren.pdf?dmc=1
9. IHK Frankfurt press release, 02.10.2026 (locator only, not a source of truth) — https://www.frankfurt-main.ihk.de/presse/pressemeldungen2026/ihk-begruesst-waermeplanung-7190298
10. Deutscher Bundestag Drs. 21/8027, 16.09.2026, Gesetzentwurf zur Beschleunigung der Umsetzung der Energieeffizienzrichtlinie — https://dserver.bundestag.de/btd/21/080/2108027.pdf
11. Deutscher Bundestag, Textarchiv 2026 KW 39, "Beschleunigte Umsetzung der Energieeffizienzrichtlinie beraten" (updated 14.10.2026) — https://www.bundestag.de/dokumente/textarchiv/2026/kw39-de-energieeffizienzrichtlinie-1211306
12. Directive (EU) 2023/1791 full text, mirror (lawplayer.com; read up to Art. 25) — https://lawplayer.com/eu/act/32023L1791
13. EUR-Lex, Directive (EU) 2023/1791 (metadata only loaded) — https://eur-lex.europa.eu/eli/dir/2023/1791/oj
14. MITECO (Spain), "Centros de datos" (undated) — https://www.miteco.gob.es/en/energia/eficiencia/centros-de-datos.html
15. EUR-Lex, Delegated Regulation (EU) 2024/1364 (metadata only loaded) — https://eur-lex.europa.eu/eli/reg_del/2024/1364/oj/eng
16. Delegated Regulation (EU) 2024/1364 full text, mirror (lagen.nu) — https://lagen.nu/celex/32024R1364

## Gaps / blocked

1. **gesetze-im-internet.de blocked** (robots). I did not work around it. The EnEfG was read from the original BGBl 2023 I Nr. 309. Any amendment in force since Nov 2023 is **UNVERIFIED**. A direct download of the BGBl PDF via curl was also refused by the egress proxy (policy), and I did not retry it.
2. **EUR-Lex body text did not load** (metadata only). EED Art. 12 and DR 2024/1364 were read from mirrors (lawplayer, lagen.nu). They need re-checking on EUR-Lex. **EED Art. 26(6) exact wording and Annex VII contents: UNVERIFIED.**
3. **Frankfurt Stadtverordnetenbeschluss § 1838 (09.06.2022):** not opened in PARLIS. The adopted text and any amendments to M 44 are **UNVERIFIED**. The Anlage 2 maps (zone boundaries) were not retrieved.
4. **Frankfurt "städtebauliche Qualität" standards and city-wide waste-heat concept:** completion and content **UNVERIFIED**.
5. **Frankfurt Wärmeplan** adoption and its data-centre content: known only via the IHK press release, so **UNVERIFIED**.
6. **"Duty to supply heat on request at reasonable prices":** not found in the enacted EnEfG. Only information-on-request (§ 17) and the offer-at-cost exemption (§ 11(3) Nr. 3) exist. Whether drafts contained a supply duty is **UNVERIFIED**.
7. **Drs. 21/8027** is a bill under committee review. The final text may differ. Fetch excerpt ended in § 13, so the Begründung (and any Art. 12/26 references) was not read.
8. Most quotes are partial sentences, because of tool quote limits. Verify the full sentences before citing them in the thesis.
9. Secondary sources seen in search but **not used**: DLA Piper, Pinsent Masons, CMS, Bird & Bird, Covington, Danfoss, cleanthinking, it-daily, datacenter-insider, Handelsblatt, frankfurt-live.
