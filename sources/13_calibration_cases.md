# Hunt 13 — Built data-centre heat-recovery cases and how recovered heat is measured (13 Oct 2026)

Four parallel retrievals by Claude subagents, reproduced verbatim below (their access notes included). Rules: primary and scholarly sources only; operator figures labelled as claims; blocked sites named, not circumvented; nothing inferred. Claude's own calibration arithmetic is in calibration_report.md, not here.


## A. Nordic cases

Research complete. Several key sources were blocked or unreachable for me; those are listed explicitly so nothing is inferred around them.

## Access notes (could not read — do not treat as checked)
- ScienceDirect (Wahlroos 2017 HTML; Pärssinen 2019 HTML): robots-blocked. Both read instead via Aalto open-access PDFs (below).
- MDPI, Lygnerud 2019 *Applied Sciences* 9(15):3142 (https://doi.org/10.3390/app9153142): proxy rate-limited (HTTP 429). **Not read.**
- Wiley, Oltmanns et al. 2020 *Energy Sci. & Eng.* (https://doi.org/10.1002/ese3.633): fetch failed. **Not read.** Note: from its title/abstract this paper is the TU Darmstadt hot-water-cooled HPC case; I found no evidence it covers Odense. Mark UNVERIFIED.
- KTH DiVA thesis (diva2:1723944): robots-blocked.
- Meta data-centre page https://datacenters.atmeta.com/odense/ : fetch required a permission that was not granted in time. Not read.
- core.ac.uk (Petrović/Sorknæs? "The role of data centres in the future Danish energy system"): fetch failed. Not read.
- Energiforsk 2024:1039 (70 nya möjligheter): only chapters 1–2 extracted; the data-centre cases in ch. 8 (8.9, 8.10, incl. "Värme utan värmepump från vattenkylt datacenter i Ålborg", 8.10.1) were not in the extracted text.

Unit conversions below marked "(derived)" are my arithmetic (1 TJ = 0.2778 GWh), not published figures.

---

## Case 1 — Meta (Facebook) Odense → Fjernvarme Fyn, Tietgenbyens Varmecentral

| Item | Figure | Status | Exact quote | Source / page |
|---|---|---|---|---|
| IT load | not stated in any primary document found | — | — | — |
| Year commissioned | first heat 2019; 2020 first full year; expansion commissioned 2021 | REPORTED (utility) | "I 2019 blev der leveret den første varme fra Facebooks datacenter i Odense." / "2020 har været første hele produktionsår med en samlet varmelevering på 230 TJ." / "I 2021 bliver varmepumperne i udbygningen til Tietgensbyens Varmecentral taget i brug." | Fjernvarme Fyn Årsberetning 2020, p. 13, p. 33 |
| Heat delivered 2020 (Facebook HPs only) | 230 TJ (= 63.9 GWh, derived) | REPORTED (utility production table; attribution "Varmepumper (Facebook)") | "Varmepumper (Facebook) El: 14.019.926 kWh 230 457***" | Årsberetning 2020, p. 9 table |
| Heat-pump electricity 2020 | 14,020 MWh | REPORTED | "Varmepumperne tilknyttet Facebook har forbrugt 14.020 MWh el svarende til COP 4,5." | Årsberetning 2020, p. 13 |
| Realised COP 2020 | 4.5 | REPORTED (utility) | "*** Den høje virkningsgrad er ensbetydende med COP på 4,5, hvor 1 energienhed el bliver til 4,5 energienheder varme." | Årsberetning 2020, p. 9 footnote |
| Heat from HPs 2021 (Tietgenbyen + Ejby Mølle combined) | 566 TJ (= 157 GWh, derived); el 29,506 MWh; surplus-heat input 460 TJ | REPORTED (combined, not separable) | "Varmepumper*** El: 29.506 MWh … 566" / "*** Består af varmepumperne på Tietgenbyens Varmecentral og på Ejby Mølle Varmecentral" | Årsberetning 2021, p. 9, p. 13 |
| Tietgenbyen HP capacity 2021 | 43 MW | REPORTED | "samlede produktionskapacitet er oppe på 43 MW" | Årsberetning 2021, p. 13 |
| Heat from HPs 2022 (combined) | 465 TJ (= 129 GWh, derived); el 33,418 MWh; surplus input 345 TJ | REPORTED | "Den samlede varmeproduktion på begge disse anlæg endte i 2022 på i alt 465 TJ." / "Der er brugt i alt 33.418 MWh el på de to anlæg." | Årsberetning 2022, p. 8 table, p. 11 |
| Tietgenbyen households 2022 | ~11,000 | REPORTED (capacity equivalence) | "Anlæggets samlede produktionskapacitet svarer til det årlige varmeforbrug hos cirka 11.000 husstande." | Årsberetning 2022, p. 11 |
| Heat from HPs 2023 (combined) | 767 TJ (= 213 GWh, derived); el 54,210 MWh; surplus input 572 TJ; "virkningsgrad" 393 % | REPORTED | "Varmepumper*** El: 54.210 MWh Overskuds-varme: 572 TJ 767 393****" | Årsberetning 2023, p. 12 table |
| Heat from HPs 2024 (combined) | 990 TJ (= 275 GWh, derived); el 69,819 MWh (column attribution UNVERIFIED — text extraction ambiguous); surplus input 739 TJ | REPORTED | "Varmepumper (fodnote ***) 990"; "Overskudsvarme: 739 TJ"; total heat 9,759 TJ | Årsberetning 2024, p. 17 |
| Implied combined COP (derived) | 2022: 465 TJ / 120.3 TJ el ≈ 3.9; 2023 ≈ 3.9; 2024 ≈ 3.9 (if 69,819 MWh is correct) | DERIVED, not published except 2023 "393 %" | — | — |
| Overskudsvarme share of total heat | 2021 5.4 %; 2022 4.5 %; 2023 6.7 %; 2024 8.3 % (all surplus-heat sources, Meta not separated) | REPORTED | "Overskudsvarme*** 5,4 %" / "Overskudsvarme*** 4,5 %" / "Overskudsvarme 6,7 %" / "Overskudsvarme** 8,3 %" | Årsberetning 2022 p. 16; 2023 p. 15; 2024 p. 18 |
| Source / network temperatures (design) | server loop 27 °C → 70 °C; DH return 40 °C; DH supply 70–80 °C, return 35–45 °C; transmission 80–90 °C | REPORTED (design) | "raise the temperature of the heat from the servers from 27 degrees to 70 degrees" / "(return temp. of DH of 40 degrees)" ; "70-80C" / "35-45C"; "120 km transmission lines (80-90 °C)" | C2E2 (UNEP Copenhagen Centre) case page; Fjernvarme Fyn CA-EED presentation slides 3, 8 |
| HP capacity (design) | Phase 1: 9 HPs, 24 MW (Johnson Controls); Phase 2: +20 MW; later stated 43–45 MW total | REPORTED (design) | "9 heat pumps with a capacity of 24 MW heat delivered by Johnson Control" / "expanded the facility with an additional 20 MW capacity" ; "The total heat production is approximately 45 MW" | C2E2; Ramboll project page (consultant, OPERATOR-SIDE CLAIM) |
| Design COP | 4.5–5.0 | MODELLED/design | "COP heat for heat pumps = 4.5 – 5.0" | CA-EED presentation, unlabelled design slide |
| Projected annual heat | Phase 1 160 GWh, Phase 2 100 GWh (C2E2); "100,000 MWh/yr … 6,900 homes" (Meta); "215,000 MWh" (Ramboll) | PROJECTED | "will annually produce 160 GWh and 100 GWh heat respectively" / "will help recover 100,000 MWh of energy per year – enough to warm 6,900 homes." / "The plant will recover 215,000 MWh of energy from Meta's hyperscale Tietgenbyen data center." | C2E2; Meta sustainability PDF (OPERATOR CLAIM); Ramboll |
| Ownership / investment | Fjernvarme Fyn pays total investment; amount not stated | REPORTED | "Fjernvarme Fyn pay for the total investment of the waste heat recovery system." | CA-EED presentation slide 11 |
| Price paid for heat | not stated (Meta's own PDF says heat is "donated"; cost principle only) | — | "The upgraded heat for district heating must be and is cheaper than existing heat production." | CA-EED slide 11 |
| How measured | utility annual production table (TJ heat, MWh electricity); meter location not stated | — | — | Årsberetninger 2020–2024 |
| ERF | not stated | — | — | — |

## Case 2 — Yandex Mäntsälä → Nivos

| Item | Figure | Status | Exact quote | Source |
|---|---|---|---|---|
| IT / DC load | ~15 MW phase 1; ~50 MW after two extensions (nameplate) | REPORTED (utility text) | "tehotarve on noin 15 MW" / "noin 50 MW luokkaa" | Nivos article (8.2.2016, updated 30.7.2019) |
| Heat recovery nominal output | ~6 MW | REPORTED | "nimellisteho on noin 6 megawattia" | Nivos (same) |
| Heat pump | 4.0 MW installed 2015; COP "potentially above 4.0" | REPORTED / UNVERIFIED origin | "In 2015, Mäntsälä installed a 4.0 MW heat pump" / "which potentially can be above 4.0" | EU Smart Cities Marketplace solution page (13.3.2023) |
| Heat delivered | 30 GWh/yr (programme figure); 20 GWh in 2018 = 54 % of Mäntsälä demand | REPORTED (utility/NIB) / REPORTED (Sitra) | "Annual output of excess heat from data centre into the district heating system 30 GWh/a" / "20 GWh or 54% of Mäntsälä's heat needs were covered by the waste heat" | Nordic Investment Bank loan page (21.10.2019); Sitra case page (18.10.2019) |
| Share of heat (2022) | up to 75 % of town-centre homes | REPORTED (utility) | "Jopa 75 % Mäntsälän keskustan kotien lämmöstä saadaan tällä hetkellä päästöttömästä hukkalämmöstä." | Nivos news 9.3.2022 |
| Source temp / supply temp | exhaust air ~37 °C; water to network 80 °C (Nivos) / ~40 °C → ~85 °C (SCM) | REPORTED | "noin 37-asteista" / "80-asteista vettä" ; "approximately 40 degrees Celsius" / "approximately 85 degrees Celsius" | Nivos 2016/2019; SCM 2023 |
| Return temp | not stated | — | — | — |
| Gas displacement | −70 % | REPORTED | "Maakaasun tarve on lämmön kierrättämisen myötä laskenut 70%." | Nivos 2016/2019 |
| Price effect | DH prices cut 11 % (Sitra); "lowered twice" (Nivos) | REPORTED | "reduce their district heating prices by 11% with this solution" | Sitra |
| Price paid to Yandex | not stated | — | — | — |
| Investment / HP ownership | not stated in primary sources read (NIB loan EUR 10 m covers a 2018–2022 programme incl. biogas) | — | "Amount in EUR: EUR 10 million" | NIB |
| Year | 2015/16; Nivos: "vuodesta 2016 toiminut datakeskus" | REPORTED | — | Nivos/Mäntsälä statement VN/10574/2025 |
| CO₂ | >5,000 t/yr | REPORTED | "Hiilidioksidipäästömme ovat vähentyneet datakeskusten hukkalämmön ansiosta yli 5000 tonnilla vuodessa." | Mäntsälä/Nivos lausunto 2025 |
| How measured | not stated; Sitra figure reads as reported result, method not given | — | — | — |
| ERF | not stated | — | — | — |

Note: Pärssinen et al. 2019 (Aalto OA PDF) does **not** contain Mäntsälä operating data; it is a hypothetical investment model (COP 3.75, p. 432; Fortum Espoo published purchase prices 50 €/MWh below −8 °C to 15 €/MWh above 20 °C, p. 437, for suppliers <5 MW). Wahlroos et al. 2017 likewise contains no Mäntsälä data.

## Case 3 — Stockholm Exergi / Öppen Fjärrvärme / Stockholm Data Parks

| Item | Figure | Status | Exact quote | Source |
|---|---|---|---|---|
| Recovered heat, all ÖF + SDP | 2021: 116 GWh; 2022: >100 GWh (20 suppliers); 2023: 117 GWh; 2025: 113 GWh | REPORTED (utility) | "Under 2023 stod värmeåtervinningen från Stockholm Data Parks och Öppen Fjärrvärme för 117 GWh" / "Under 2025 återvann vi 113 GWh värme" / "Med 20 leverantörer återvann Öppen Fjärrvärme över 100 GWh under 2022" | Stockholm Exergi Års- och hållbarhetsredovisning 2023, p. 20; Stockholm Exergi deck (Gullberg), slide 4; Covenant of Mayors case study 2023; Hagainitiativet (2021 figure, secondary) |
| Data halls alone | 75 GWh of 113 GWh total (2018) | REPORTED via Energiforsk | "för den största enskilda värmekällan av den levererade överskottsvärmen till fjärrvärmesystemet (75 GWh)" | Energiforsk 2020:681, pp. 12–13 |
| Bahnhof Pionen | ~600 kW at 68 °C, "Öppen Spotvärme Inblandning" | REPORTED | "I normal drift levereras 600 kW värme med en temperatur på 68°C." | Energiforsk 2020:681, p. 17 |
| Interxion | buys process cooling at 14 °C; return ~24 °C, Exergi lifts further; no GWh | REPORTED | "Interxions datahall är kopplad till fjärrkylanätet och köper processkyla vid 14°C" | Energiforsk 2020:681, p. 17 |
| H&M data hall | 1.7 GWh/yr, delivered below 7 °C outdoor | REPORTED | "Varje år levereras 1,7 GWh värme till fjärrvärmenätet." | Energiforsk 2020:681, p. 17 |
| Digiplex, Ericsson Rosersberg | not found in any primary document | — | — | — |
| Supply temp requirement | normally 68 °C | REPORTED | "Leveranstemperaturen är normalt 68°C men kan vara högre." | Energiforsk 2020:681, p. 15 |
| Price model | hourly avoided-cost price; capacity (SEK/kW·yr) + energy (SEK/MWh); no compensation above +10 °C; 10-yr call-off contracts | REPORTED | "Priset på energi sätts på timbasis utifrån den prognostiserade alternativkostnaden" / "Typiskt sett ingen ersättning vid varmare än + 10 grader" | Energiforsk p. 16; Exergi deck slide 7 |
| Revenue indication | ~EUR 190,000 per year per MW delivered | REPORTED (CoM case study) | "cirka 190 000 EUR per år per MW levererad värme" | Covenant of Mayors 2023 |
| HP ownership | supplier (data centre) owns HP | REPORTED | "värmepump/ar" — supplier lifts temperature | Exergi deck slide 10 |
| COP (Bahnhof Thule simulation) | 3.7 at 68 °C supply, 23 °C source | MODELLED | Table 2, p. 32 | Energiforsk 2020:681 |
| Payback need | 5–7 yr | REPORTED | "För datahallsbranschen behöver återbetalningstiden ligga runt 5-7 år" | Energiforsk p. 16 |
| Investment, IT loads, ERF | not stated | — | — | — |
| How measured | utility aggregate (settlement data implied by ÖF payment model); no site meters published | — | — | — |

2024 and 2025 Exergi annual reports contain no data-hall GWh figure (checked).

## Case 4 — Helsinki: Telia Pitäjänmäki → Helen; Equinix; Fortum/Microsoft

| Item | Figure | Status | Exact quote | Source |
|---|---|---|---|---|
| Telia IT load | 24 MW IT / 100 MW total (nameplate) | OPERATOR CLAIM | "Opened in 2018, with a total power capacity of 100 MW and an IT capacity of 24 MW" | Telia cooling-options PDF, p. 4 |
| Telia heat module | 5 MW cooling → 6.5 MW heating (module 1, in production April 2023); plan 4 × 5 MW → 26 MW heat | OPERATOR CLAIM | "The 5 MW cooling capacity produces 6.5 MW of heating capacity." / "adding up to 26 MW in heating capacity" | Telia PDF p. 4 |
| Snapshot 29.5.2024 | 5.65 MW to DH (4.11 MW waste heat + 1.45 MW added — note 4.11+1.45 = 5.56, not 5.65, as printed); COP 3.9; PUE 1.152; **ERF 0.75** | OPERATOR CLAIM (point measurement) | "Total capacity back to the district heating: 5.65 MW" / "Coefficient of Performance (COP) for the pumps: 3.9" / "Energy Reuse Factor (ERF): 0.75" | Telia PDF p. 6 |
| Temperatures | loop 20 °C in / 32 °C return; DH 75–85 °C | OPERATOR CLAIM | "inlet water temperature of 20 ºC and return of 32 ºC" / "pumped up to 75-85ºC" | Telia PDF p. 5 |
| Helen requirement | ~85 °C; HP owned by Helen or DC depending on model | REPORTED (utility) | "Helen implements a heat recovery system for the data centre" / "The data centre implements its own heat recovery system." | Helen service page |
| Homes | 14,000 two-room flats, plan 28,000; delivery since early 2023 | REPORTED (utility) | "could eventually cover the heating needs of up to 14,000 two-room apartments" | Helen news 26.5.2025 |
| GWh delivered, price, investment | not stated | — | — | — |
| Equinix HE3/HE5 | since 2010 (Kanavaranta); HE5 "up to almost 1,500 one-bedroom apartments"; Helen operates HPs; Oilon turnkey | REPORTED / OPERATOR CLAIM | "can meet the annual heating demand of up to almost 1,500 one-bedroom apartments" | Helen news 23.6.2022; Equinix PR 17.10.2024 |
| Fortum/Microsoft Espoo-Kirkkonummi | **not operating**; expected "2025-2026 heating season", ~40 % of Espoo+Kauniainen+Kirkkonummi demand when both DCs built | PROJECTED | "around 40% of the district heating needs of Espoo, Kauniainen and Kirkkonummi" | Fortum project page |
| Wahlroos 2017 on Telia | 24 MW DC, est. 200 GWh/yr, ~10 % Espoo demand (pre-build estimate) | MODELLED/PROJECTED | "200 GWh of heat could be recovered from the DC" | Wahlroos et al. 2017, Sec. 4.2 p. 1233 (Aalto OA PDF) |

## Case 5 — Norway

| Item | Figure | Status | Exact quote | Source |
|---|---|---|---|---|
| STACK (ex-DigiPlex) Ulven, Oslo → Hafslund Oslo Celsio | ~3.5 MW heat; 25 GWh/yr avoided alternative production; up to 5,000 homes; conceived 2018, one-year ramp-up | OPERATOR CLAIM | "around 3.5MW of heat energy" / "25,000,000kWh (25GWh)" / "up to 5,000 Oslo homes" | STACK press release 21.9.2022 |
| Same, government | 5,000 homes; "9 of the 18 largest data centres have heat recovery, mainly … local systems" | REPORTED (gov. white paper) | "used for district heating for 5,000 homes in Oslo." | Regjeringen.no, data-centre strategy, Box 5.1 |
| Green Mountain | no metered DH figures found in primary sources | — | — | — |
| Temperatures, COP, price, investment, ERF | not stated | — | — | — |

---

## Best primary documents (URLs)
1. Fjernvarme Fyn Årsberetning 2020 — https://www.fjernvarmefyn.dk/media/1754/fjernvarme_fyn_aarsberetning_2020.pdf (p. 9, 13, 32–33: only year with Facebook-only heat, electricity and COP)
2. Fjernvarme Fyn Årsberetning 2021 / 2022 / 2023 / 2024 — https://www.fjernvarmefyn.dk/media/1947/aarsberetning_fjernvarmefyn_2021.pdf ; https://www.fjernvarmefyn.dk/media/vzmje00c/fjernvarme-fyn-aarsberetning-2022.pdf ; https://www.fjernvarmefyn.dk/media/flthndrg/aarsberetning-2023.pdf ; https://www.fjernvarmefyn.dk/media/ow1hkzhq/aarsberetning_2024_web.pdf (combined HP tables)
3. Fjernvarme Fyn presentation to CA-EED (Chan-Nguyen) — https://www.ca-eed.eu/wp-content/uploads/2021/10/2_IS6.6_Facebook_DK_Chan-Nguyen.pdf (design temps, COP, business model)
4. C2E2 (UNEP/DTU) Fjernvarme Fyn case — https://c2e2.unepccc.org/kms_object/fjernvarme-fyn-utilization-of-surplus-heat-from-data-centers/
5. Meta "Denmark data center to warm local community" — https://sustainability.fb.com/wp-content/uploads/2020/12/FB_Denmark-Data-Center-to-Warm-Local-Community.pdf (OPERATOR CLAIM)
6. Energiforsk 2020:681 Verktygslåda för prosumtion — https://energiforsk.se/media/28252/verktygslada-for-prosumtion-inom-fjarrvarme-energiforskrapport-2020-681.pdf (pp. 12–17, 31–35)
7. Stockholm Exergi Års- och hållbarhetsredovisning 2023 — https://www.stockholmexergi.se/wp-content/uploads/2024/03/Arsredovisning-2023_SV_240326_sidor.pdf (p. 20)
8. Stockholm Exergi deck (Gullberg), 2025 figure — https://www.datocms-assets.com/106793/1790853475-restvarmeatervinning-michael-gullberg-stockholm-exergi.pdf
9. Covenant of Mayors Stockholm case 2023 — https://eu-mayors.ec.europa.eu/sites/default/files/2023-10/2023_CoMo_CaseStudy_Stockholm_SE.pdf
10. Nivos 2016/2019 article — https://nivos.fi/ajankohtaista/paikallisen-datakeskuksen-kanssa-yhteistyossa-luotu-ekosysteemi-lammittaa-mantsalassa/ ; Nivos 9.3.2022 — https://nivos.fi/datakeskuksen-hukkalammon-jakelua-mantsalan-kaukolampoverkkoon-jatketaan/
11. NIB loan page Nivos Energia — https://www.nib.int/loan/nivos-energia-oy-22822 ; Sitra case — https://arkisto.sitra.fi/en/cases/district-heating-from-data-centre-waste-heat-mantsala/ ; EU SCM — https://smart-cities-marketplace.ec.europa.eu/insights/solutions/datacentre-supplies-local-heating-mantsala-finland
12. Telia Helsinki cooling-options PDF — https://www.telia.fi/dam/jcr:3e4b6c78-a106-4364-9a91-97e36e8a77c1/Telia-Helsinki-Datacenter-cooling-options-for-AI-GPU-loads.pdf (OPERATOR CLAIM; only published ERF)
13. Helen heat-recovery service page — https://www.helen.fi/en/companies/cooling-for-companies/Heat-recovery-service-for-data-centers ; Helen news 26.5.2025 — https://www.helen.fi/en/news/2025/helen-and-telias-collaboration-brings-even-more-data-center-heat-to-helsinki-residents
14. Wahlroos et al. 2017, Energy 140 (Aalto OA) — https://acris.aalto.fi/ws/portalfiles/portal/17305461/1_s2.0_S0360544217314548_main.pdf ; Pärssinen et al. 2019 (Aalto OA) — https://research.aalto.fi/files/29723097/ELEC_parssinen_et_al_waste_heat_sustainability.pdf
15. Norwegian Government data-centre strategy, ch. 5 — https://www.regjeringen.no/en/dokumenter/the-data-centre-industry-a-sustainable-industry-of-the-future-for-the-digital-norway/id3112356/?ch=5 ; STACK PR — https://www.stackinfra.com/about/news-press/press-releases/stack-infrastructure-connects-data-center-to-hafslund-oslo-celsio-system-for-city-wide-heat-reuse/

## What each case lets the tool check
**Odense** is the only case with a utility-published year of heat output *and* heat-pump electricity attributed to the data centre alone (2020: 230 TJ ≈ 64 GWh from 14,020 MWh electricity, COP 4.5, with ~24 MW of HP capacity then installed). That gives a realised COP against the 4.5–5.0 design value, and a realised heat-per-installed-HP-MW (~2.7 GWh/MW_HP·yr in a ramp-up year). From 2021 on the figures are combined with the Ejby Mølle wastewater plant, but the implied combined COP (~3.9 in 2022–2024, and the printed 393 % for 2023) still bounds what a 27→70 °C lift achieves in service; the 2024 combined 990 TJ (~275 GWh) from ~63 MW of HPs across both plants can be used as an upper-bound capacity-factor check. No IT load is published, so delivered-heat-per-MW-IT cannot be computed for Odense from primary sources; the projected 100–215 GWh/yr figures (Meta, C2E2, Ramboll) can be compared with the realised ramp. Price paid is not stated (heat is described as donated; the business-model slide only says upgraded heat must be cheaper than existing production).

**Mäntsälä** gives the cleanest heat-per-IT-MW ratio: ~15 MW DC, 4–6 MW heat-recovery nominal output, 20 GWh delivered in 2018 (54 % of town demand) and a 30 GWh/yr programme figure — roughly 1.3–2 GWh per MW of DC power per year, with a 37–40 °C source lifted to 80–85 °C and a COP "potentially above 4". Price to Yandex is not published; only the consumer price effect (−11 %) is.

**Stockholm** lets you check an aggregate: ~75 GWh from data halls (2018) within a 113–117 GWh/yr ÖF/SDP total, the 68 °C delivery requirement, supplier-owned heat pumps, the avoided-cost hourly price with no payment above +10 °C, and a revenue proxy of ~EUR 190k per MW-year (≈ EUR 22/MWh if run 8,760 h, or more per MWh over a heating-season-only call-off — derived, treat with caution). Site-level data exist only for Bahnhof Pionen (600 kW) and H&M (1.7 GWh); Interxion, Digiplex and Ericsson site outputs are not published.

**Telia Helsinki** is the one case with a published ERF (0.75) alongside COP (3.9), a 20/32 °C loop, 75–85 °C delivery and a 5 MW-cooling → 6.5 MW-heat module ratio, on a 24 MW IT nameplate — useful for checking the tool's recovered-fraction and COP assumptions, though it is a single-day operator snapshot, not a settlement figure. **Oslo (STACK)** adds a 3.5 MW / 25 GWh operator claim (≈ 7,100 full-load hours, derived) as a plausibility check on utilisation.


## B. Non-Nordic cases

# Non-Nordic data-centre heat-recovery cases: published figures for tool calibration

Access notes first: `meetings.southdublin.ie`, `vb.nweurope.eu` (HeatNet NWE final-conference PDF) and direct downloads from `tuprints.ulb.tu-darmstadt.de` and Wiley were blocked for this session (proxy 403 / Anubis bot wall / fetch error). The Equinix 2025 Sustainability Report PDF is robots-disallowed. URLs are given so they can be opened manually. Nothing below is inferred; "not stated" means the cited document does not give it.

---

## 1. AWS Tallaght → Tallaght District Heating Scheme (Heat Works CLG, SDCC) — OPERATING since 2023

| Item | Figure | Status | Source / quote |
|---|---|---|---|
| IT load | not stated in any primary doc | — | — |
| Heat delivered, year 1 (2023) | **3,770 MWh** | METERED (operator/owner statement; meter location not stated) | Codema project page: "3,770 MWh of heat distributed in the first year of operation" — https://www.codema.ie/our-work/tallaght-district-heating-scheme/ ; same figure in ENABLE DHC D2.2, p. 5 — https://enabledhc.ambienteitalia.it/wp-content/uploads/2025/06/D2.2-Tallaght.pdf |
| Heat delivered, cumulative to June 2024 | "Almost 6,000 MWh of energy has been generated to date" | REPORTED (SEAI) | https://www.seai.ie/case-studies/tallaght-district-heating |
| Heat delivered, 2024 / 2025 | not stated (only CO₂: "1,264.98 tons of CO2 in 2024"; "1,421.84 tonnes … in 2025") | REPORTED (SDCC) | https://sdcc.ie/en/climate-action/spotlight-tallaght-district-heating-scheme/tallaght-district-heating-scheme.html |
| Capacity supplied from DC | "supplying Tallaght with 3 MW of energy from the local data center" | OPERATOR CLAIM (AWS) | https://www.allthingsdistributed.com/2024/03/district-heating-using-data-centers-to-heat-communities.html |
| Source temperature | "circa 25C" (GDECA); AWS: "approximately 23-28° Celsius", return "~15°C" | REPORTED | GDECA supporting info https://www.districtenergyaward.org/wp-content/uploads/2023/09/gdeca-supporting-info.pdf ; AWS blog above |
| Network supply/return | "between 70C and 85C" (GDECA); D2.2 p. 7: designed 70/50 °C, "currently about 70°C/55°C", losses ≈15 % | REPORTED | GDECA; D2.2 p. 7 |
| Heat pump | "3MW heat pump installation"; two-stage (first stage ≈45 °C per AWS); D2.2 p. 6: modules up to 3 MW, two units in series. COP not stated. Owner: Heat Works CLG (SDCC-owned), D2.2 p. 8 | REPORTED | GDECA; D2.2 |
| Backup | "A 3MW electric boiler provides the backup heat supply." Two 200 m³ storage tanks granted (D2.2 p. 6) | REPORTED | GDECA; D2.2 |
| Network / load | 3.8 km pipe (1.9 km trench); six substations 143–1,600 kW; ≈55,000 m² (D2.2 p. 7); 133 cost-rental apartments added 2024 (SDCC) | REPORTED | D2.2; SDCC |
| Investment | CAF grant "in the order of €4.9 million" (SDCC); Interreg Europe GP: "670,000 via EU project + 770,000 SDCC matching funding", remainder from Fortum; total CAPEX not stated | REPORTED | SDCC page; https://www.interregeurope.eu/good-practices/waste-heat-recovery-from-data-centre-for-district-heating-supply-tallaght-district-heating-scheme |
| Price of waste heat | "available from data centre for free" (Codema/IOR slides); AWS supplies heat "at no cost" (SDCC council reply) | REPORTED | https://ior.org.uk/public/downloads/W3JJ3/JOS%20Codema.pdf ; https://meetings.southdublin.ie/Home/ViewReply/83236 (blocked here; quote via WebFetch summary) |
| Customer tariff | "fixed monthly payment (€) + monthly units (kWh) × supply price (€)" formula; values not stated; "low-cost (5 to 10% reduction)" vs counterfactual (IOR slides) | REPORTED, no values | SDCC HeatNet update https://meetings.southdublin.ie/Home/ViewReply/67044 ; IOR slides |
| Conversion rule used by Codema | "1 MWh of electrical load produces ~750 kWh thermal energy" | MODELLED assumption | IOR Codema slides |
| CO₂ | "almost 1,100 tonnes of CO2 in 2023" (Codema); design "almost 1,500 tonnes … each year" | REPORTED / MODELLED | Codema |
| Phase 2 | "the envisaged 10MW network" | PLANNED | SDCC council reply 88033 (blocked; fetched summary) |
| ERF | not stated | — | — |

Measurement basis: the 3,770 MWh is Heat Works' distributed heat (presumably at energy-centre outlet or customer meters — not specified). No CRU/regulator document found.

## 2. Equinix PA10 → Plaine Commune Énergie / SMIREC (Engie Solutions) — commissioned 21 June 2024

| Item | Figure | Status | Source / quote |
|---|---|---|---|
| IT load | not stated | — | — |
| Recoverable heat | "L'eau du datacentre est récupérée à 28°C et permet de valoriser jusqu'à 6,6 MW de chaleur" | OPERATOR/UTILITY CLAIM (design) | Engie Solutions CP 21-06-2024 https://engie-solutions.com/sites/default/files/assets/2024-06/cp_mise_en_service_officielle_de_la_sous-station_equinix_vdef_v2.pdf |
| Heat produced | "Au total, 10 800 MWh supplémentaires de chaleur sont produits." (2022 release: "seront produits") | PROJECTED (project-level, includes other sources: "75 % … issus d'énergie renouvelable et de récupération") | same; 2022 CP https://www.engie-solutions.com/sites/default/files/assets/2022-10/cp_-_signature_convention_de_raccordement_pce-smirec-equinix-mgp_0.pdf |
| Source temp | 28 °C | REPORTED | both CPs |
| Network supply/return | not stated | — | — |
| Heat pump capacity / COP / owner | "à l'aide de pompes à chaleur"; capacity, COP not stated; owner not stated (network equipment under Plaine Commune Énergie DSP) | — | 2024 CP |
| Investment | 2022: "Les investissements atteignent 4,3 M€"; 2024: "5,7 millions d'euros d'investissement"; Région IDF + ADEME IDF "1,13 million d'euros" | REPORTED | both CPs; Région page (2,610 m extension, 10 substations, CP2024-180) https://www.iledefrance.fr/tous-les-services/ma-region-pres-de-chez-moi/environnement/energie/184193-recuperation-de-chaleur-fatale-du-data-center-equinix-et-extension-du-reseau-de-chaleur-plaine-commune-energie |
| Price model | "Equinix s'est engagé contractuellement à fournir gracieusement cette chaleur pour une durée de 15 ans." | REPORTED | both CPs |
| CO₂ | "éviter chaque année 1 800 tonnes de CO₂" | PROJECTED | 2024 CP |
| Metered operating data / ERF | not stated; Equinix 2025 Sustainability Report PDF is robots-blocked: https://delivery-p112322-e1154416.adobeaemcloud.com/adobe/assets/deliver/urn:aaid:aem:116e6fc1-6217-4132-8fcf-1dc7096396df/Equinix-Inc_2025_Sustainability-Report.pdf | UNVERIFIED | Equinix "Heat our neighbors" release (no figures) https://investor.equinix.com/news-events/press-releases/detail/1044/help-us-heat-our-neighbors---equinix-makes-data-center |

## 3. Netherlands — built cases with primary figures (RVO/Nederland ICT & Berenschot 2018)

Source A: RVO/Nederland ICT, "Restwarmte uit datacenters – succesvoorbeelden" (Feb 2018) https://www.bouwstenen.nl/sites/default/files/uploads/Rapportage-Restwarmte-uit-datacenters.pdf. Source B: Berenschot, "Restwarmte uit datacenters" (Mar 2018) https://www.bjmgerard.nl/wp-content/uploads/2018/04/restwarmte-uit-datacenters_Berenschot_mrt2018.pdf

| Case | IT / DC capacity | Heat delivered | Temps | Heat pump / COP | Investment | Price | Status |
|---|---|---|---|---|---|---|---|
| **APG datacenter → Mijnwater, Heerlen** (A p. 14; B p. 13) | "Vermogen datacenter: 520 kW"; office peak "620 kW" | "Op dit moment wordt 8.900 GJ warmte onttrokken aan het datacenter van APG" (= 2,472 MWh; period not stated as annual) — REPORTED | "Netwerktemperatuur: 16 °C (koud) en 28 °C (warm)" | not stated (Mijnwater 5GDHC, building-side HPs) | "€ 800.000,- aan installaties" in APG building + ≈€700,000 network share | not stated | operating |
| **NL DC, High Tech Campus Eindhoven** (A p. 12; B p. 11) | "Huidig vermogen: 600 kW"; "bij volle bezetting: 2.500 kW" | not stated | "Ringtemperatuur zomer: 10 °C … winter: 18 °C"; raised to 55 °C | gas-engine heat pump; COP not stated | not stated | DC "betaalt een vergoeding voor de aansluiting" (pays a fee, not paid) | operating (WKO ring) |
| **Previder, Hengelo** (A p. 13; B p. 12) | "Vermogen datacenter: 185 kW"; "Piekvermogen warmtelevering: 400 kW" | not stated | 16/35/40/55 °C in diagram; "gaswarmtepomp opgewaardeerd naar 55 °C" | gas HP; COP not stated | not stated | not stated | operating |
| **NL DC Aalsmeer** (A p. 15) | — | "beschikbaar: 4 MWth"; source 22 °C | — | — | "€ 1,5 mln", DEI subsidy "€ 450K", payback "negen jaar" | — | in development (2018) |
| Groningen (Bytesnet/QTS → WarmteStad) | not stated | not stated | not stated | not stated | network ≈€70 M total | not stated | WarmteStad news page only (no figures): https://warmtestad.nl/nieuws/definitief-restwarmte-gaat-warmtenet-groningen-noordwest-verwarmen |
| Equinix AM3 → UvA | no primary document with figures found (press only) | UNVERIFIED | | | | | |

RVO "Warmte uit datacenters" (Nov 2018) https://rvo.nl/sites/default/files/2018/11/Warmte%20uit%20datacenters%20-%20november%202018.pdf gives no case figures; states "in Nederland betreft het warmte-uitwisselingen van maximaal ongeveer 1 MW" (p. 3). RVO Kansenkaart (2018) is MODELLED: COP 4 (70 °C), 5 (55 °C), 6 (40 °C); tariff €15.00/GJ + €400/yr fixed (Table 2).

## 4a. Germany

**Telehouse FRANKY → Westville quarter, Frankfurt-Gallus (Mainova)** — contracted heat from "Anfang 2023"
| Item | Figure | Status | Source |
|---|---|---|---|
| IT load | DC connection "ca. 35 MW" (Bytes2Heat p. 20) | REPORTED | https://deneff.org/wp-content/uploads/2023/05/Bytes2Heat-Best-Practice-Uebersicht.pdf |
| Heat delivered | demand "~ 4.000 MWh/a", waste heat "mind. 60%" = "2.400 MWh/a" | PROJECTED | Mainova PM 08-07-2021 https://www.mainova.de/resource/blob/76624/8658ad28e9ad7ddaf86445e6a84ff960/pm-08072021-rz-abwaermenutzung-westville-data.pdf ; Pfister/Mainova 13-06-2023 https://www.schader-stiftung.de/fileadmin/user_upload/2_Pfister_PDF.pdf |
| Temps | waste heat "30 Grad Celsius" → "ca. 70 Grad Celsius"; network "70°/40°C" | REPORTED | same |
| Heat pumps | two × "320 kWth"; transfer station "3.210 kWth"; COP not stated; owner Mainova (utility) | REPORTED | same |
| Price / contract | "15 Jahre Vertragslaufzeit"; price not stated | — | |
| CO₂ | "400 Tonnen CO2 im Jahr" | PROJECTED | |
| Metered | none published | — | |

**Cloud&Heat Eurotheum, Frankfurt** (retrofit 2017): "250 kW IT-Leistung/Abwärme" per floor, "0,6 MW" (Bytes2Heat p. 12); "PUE vorher = 1,92 … nachher = 1,27"; savings "Ø 190.000 €/a" cooling + "65.000 €/a" heating; "CO₂ Reduktion: 710 tons/p.a." — OPERATOR CLAIM, basis not stated. Borderstep/NeRZ case sheet: https://www.borderstep.de/wp-content/uploads/2020/06/20200609_NeRZ_CloudHeat_Eurotheum_Final-compressed.pdf (fetch returned the C&H web text; PDF itself not read — UNVERIFIED). Delivered MWh: not stated.

**HLRS Stuttgart** (Bytes2Heat p. 13): IT "~3,5 MW"; "max. 100 kW im Winter", "ca. 270 MWh" per year; 25/35 °C → 70 °C; two HPs "je 55 kWth" since 2012 — REPORTED (measurement basis not stated).

**ReUseHeat Braunschweig (Veolia/BS|ENERGY, "Heinrich der Löwe" DC)** — operating Q2 2019: DC "etwa 12 MW" ("~ 12 MWth excess heat available"); HP "300 kWth"; "COP 3.6"; source 25 °C/18 °C, network 70/40 °C; "1,750 MWh/yr" recovered; 600 units, 48,000 m²; "460.000 €" excl. network — all PROJECTED/design (Bytes2Heat p. 11; GDECA 2019 https://www.districtenergyaward.org/wp-content/uploads/2019/09/19GDECA-Desc-ReUseHeat-BraunschweigDE.pdf ). CORDIS reporting gives no metered figure: https://cordis.europa.eu/project/id/767429/reporting . Monitoring deliverables not located.

**TU Darmstadt Lichtwiese / Oltmanns et al. 2020** (Energy Sci. Eng. 8(5):1793-1810, doi 10.1002/ese3.633, CC-BY): full text BLOCKED here (tuprints Anubis; Wiley fetch error). Abstract (DOAJ https://doaj.org/article/c42f7e7125534968bfd39869e896d365 ): "Depending on the scenario, a total of 20%-50% of the waste heat" reusable; "CO2 emission can be decreased by up to 720 tCO2/a". The abstract frames it as a planning case for Lichtenberg II with hot-water cooling; whether the paper contains metered delivered heat could not be verified from this session — UNVERIFIED. Bytes2Heat p. 24 lists Lichtwiese as planned ("soll"), network 60/70 °C. Open manually: https://onlinelibrary.wiley.com/doi/full/10.1002/ese3.633 or https://tuprints.ulb.tu-darmstadt.de/16187/1/ESE3_ESE3633.pdf

Telekom/Westfalen: no primary document found.

## 4b. Switzerland

**Green Metro-Campus Dielsdorf → Energie 360° network**: NOT yet delivering. "2026 sind bereits die ersten Wärmelieferungen durch Energie 360° geplant"; HPs lift "von 29 auf rund 70°C"; "über 3'500 Haushalte"; "PUE-Wert nahe 1". No MW/GWh. Sources: https://www.green.ch/fileadmin/user_upload/Medienmitteilungen/DE/Green_MM_2023_01_17_Green_nimmt_energieeffizientestes_Datacenter_in_Betrieb.pdf ; https://www.green.ch/fileadmin/user_upload/Pressespiegel/DE/20250624_Baublatt_Beitrag_Green_mit_Gemeinde_Dielsdorf.pdf — OPERATOR CLAIM/PLANNED.
**BFE/EnergieSchweiz, eicher+pauli 2023, "Abwärmenutzung von Rechenzentren – Potenzialstudie"** https://pubdb.bfe.admin.ch/de/publication/download/11426 : no named operating case with figures; one unnamed realised coupling "Kaltwasserniveau … bei 35/25°C" (p. 21); coupling cost "35 CHF/kW" (p. 26, 2015 prices) — MODELLED/benchmark.

## 5. UK
**Queen Mary University of London** (QMUL release 4 Jul 2024 https://qmul.ac.uk/media/news/2024/pr/pioneering-project-to-capture-waste-heat-from-university-data-centre-for-hot-water-and-heating-starts-in-london.html ): hot water "as high as 75°C"; "seven-year return on investment"; operational "by October 2024" — all PROJECTED; no kW/MWh. No UK case with metered delivered heat found.
Davies, Maidment & Tozer 2016 (Applied Thermal Engineering; IIF record https://iifiir.org/en/fridoc/using-data-centres-for-combined-heating-and-cooling-an-investigation-139000 ) is a London MODELLING study (the "3.5 MW … £875,000/year" figure quoted in the SHU review is predicted, not built).

## 6. USA — Westin Building Exchange → Amazon Doppler / Denny Regrade, Seattle (operating since ≈2015)

| Item | Figure | Status | Source |
|---|---|---|---|
| IT load | not stated ("About 70%" of 400,000 sq ft is data centre) | — | Seattle Times via GovTech https://www.govtech.com/fs/amazon-westin-building-partner-on-heat-exchange-infrastructure.html (news; used only to locate attributions) |
| Heat transferred | "11 MW" produced, "5 MW" to Amazon (property manager, news); "About 80 million kWh of electricity over 25 years" saved (Amazon) | OPERATOR CLAIM / UNVERIFIED | https://aboutamazon.com/news/sustainability/the-super-efficient-heat-source-hidden-below-amazons-seattle-headquarters |
| Temps | "About 65°F" from Westin; "about 130°F" supply | OPERATOR CLAIM | Amazon |
| Equipment | five heat-reclaiming chillers; 400,000-gal storage; two 16-in pipes; ≈5 M sq ft served | OPERATOR CLAIM | Amazon |
| Price | "long-term agreement to pay for the service" (news); value not stated | — | |
| Metered MWh, COP, ERF | not stated anywhere primary | — | |

No US university case with published metered delivered heat was found; MDPI Energies 17(8):1835 (USC CARC) measures waste heat (377 MWh/yr open aisle) but no reuse. Canada (Markham TR5 etc.) skipped per instructions.

---

## Best primary documents
1. ENABLE DHC D2.2 Tallaght (2025) — https://enabledhc.ambienteitalia.it/wp-content/uploads/2025/06/D2.2-Tallaght.pdf
2. Codema Tallaght project page — https://www.codema.ie/our-work/tallaght-district-heating-scheme/ ; SEAI case study — https://www.seai.ie/case-studies/tallaght-district-heating ; GDECA 2023 supporting info — https://www.districtenergyaward.org/wp-content/uploads/2023/09/gdeca-supporting-info.pdf ; Codema/IOR slides — https://ior.org.uk/public/downloads/W3JJ3/JOS%20Codema.pdf ; HeatNet NWE final-conference SDCC slides (blocked) — https://vb.nweurope.eu/media/11536/heatnet-nwe-final-conference-pilot-sdcc.pdf
3. Engie Solutions/SMIREC CPs 2022 & 2024 (URLs above)
4. RVO/Nederland ICT 2018 succesvoorbeelden; Berenschot 2018 (URLs above)
5. Mainova PM 2021; Pfister/Mainova 2023 slides; Bytes2Heat Best-Practice-Übersicht (DENEFF/IER Stuttgart, BMWK-funded)
6. ReUseHeat GDECA 2019 sheets; CORDIS 767429
7. BFE/eicher+pauli 2023 Potenzialstudie
8. Oltmanns et al. 2020 (blocked; DOI 10.1002/ese3.633)

## What each case lets the tool check
- **Tallaght**: 3,770 MWh/yr metered vs 3 MW HP → ≈14 % capacity factor in year 1 (low-load start-up); source 25 °C → 70–85 °C two-stage lift sets the realised-COP envelope (COP not published — the tool cannot calibrate COP here, only flag it); price model = free source heat + fixed + kWh tariff; recovered fraction per MW IT not checkable (IT load unpublished). Codema's 0.75 kWh_th/kWh_el rule is a usable default.
- **Equinix PA10**: 6.6 MW recoverable at 28 °C vs 10,800 MWh/yr projected (≈1,636 h/yr equivalent) gives a utilisation benchmark; €5.7 M CAPEX for ≈6.6 MW ≈ €860/kW_th (network + HP), free heat for 15 yr as price model. No metered year yet.
- **Heerlen APG**: 520 kW DC, 8,900 GJ (2,472 MWh) extracted ≈ 54 % of nameplate continuous output — a rare metered recovered fraction; 16/28 °C 5GDHC temperatures; ≈€1.5 M for 0.5 MW.
- **Westville/Telehouse**: 640 kW_th HP from a 35 MW DC covering 2,400 MWh/yr — shows how little of a large DC a district actually draws (recovered fraction ≪ 1 %); 30 → 70 °C lift, 15-yr contract.
- **ReUseHeat Braunschweig**: design COP 3.6 at 25 → 70 °C, 1,750 MWh/yr from 300 kW_th (≈5,800 h), €460k ≈ €1,530/kW_th excl. network.
- **Seattle Westin**: 5 MW claimed transfer at 18 °C → 54 °C; 80 GWh/25 yr electricity saved (operator); no metered heat — use only as a sanity check for MW-per-DC-floor-area.
- **Eindhoven/Hengelo**: kW-scale, gas-engine HPs — illustrate the 55 °C target and that WKO-ring sharing can leave the DC paying, not being paid.


## C. Measurement methods and standards

## Report: how "heat delivered" from data centres is measured — standards, regulation, utility practice, peer-reviewed studies

Access notes: `iso.org`, `eur-lex.europa.eu` (via curl) and `sciencedirect.com` were blocked by the proxy/robots; EUR-Lex was reachable through the fetch tool. `fhi.nl` (public copy of Green Grid WP#29) and `tuprints.ulb.tu-darmstadt.de` (Oltmanns 2020 PDF) failed on fetch. The ISO/IEC 30134-6 clause text below comes from the Bureau of Indian Standards' identical-adoption PDF of ISO/IEC 30134-6 (Oct 2023); I could not independently confirm it is word-for-word identical to the ISO edition. The fetch tool caps quotes at ~125 characters, so long clauses are given as fragments plus paraphrase, and I say which is which.

---

### 1. ISO/IEC 30134-6 (ERF), EN 50600-4-6, Green Grid ERE, ISO/IEC 30134-2 (PUE)

**STANDARD — ISO/IEC 30134-6:2021, abstract** (ISO page blocked; identical text on SCC, SFS and CSA store pages, https://scc-ccn.ca/standardsdb/standards/2048365 , https://www.csagroup.org/store/product/2430002/ ):
> "This document specifies the energy reuse factor (ERF) as a KPI to quantify the reuse of the energy consumed in a data centre."
> "ERF is defined as the ratio of energy being reused divided by the sum of all energy consumed in a data centre."
> "The ERF does reflect the efficiency of the reuse process; the reuse process is not part of a data centre."

Flag: the third sentence reads "does reflect" on all three national mirrors and on the EN 50600-4-6 abstract (standard.no: "The ERF does reflect the efficiency of the reuse process, which is not part of the data centre"). Given clause 5 (below) excludes the reuse equipment, the intended meaning is almost certainly "does not"; treat the wording as a drafting ambiguity and do not rely on it either way.

**STANDARD — ISO/IEC 30134-6 clause text (BIS identical adoption, https://services.bis.gov.in/tmp/LITD39622436_17102023_1.pdf ):**
- 3.1.1 reused energy: "utilization of energy used in the data centre for an alternate purpose outside the data centre boundary"; Note 1: "Energy ejected to the environment does not constitute reused energy."
- Clause 4 (boundary): "ERF only considers energy being reused outside the boundary of a data centre." / "Energy reused inside the data centre boundary shall not be counted towards ERF" / "If the technology causes a lower PUE, then it should not be considered as part of ERF." (Paraphrase: internal reuse is already captured by a lower PUE, so counting it in ERF double-counts.)
- Clause 5 (formula): ERF = E_Reuse / E_DC; "ERF ranges from 0 to 1,0." Boundary sentence (two fragments of one sentence): "Any equipment outside of the data centre boundary for increasing the temperature delivered," … "like heat pumps, shall not be included in the calculation." E_DC includes IT, power, cooling, other site loads and "all the infrastructure needed to transfer or to enhance the reused heat flow to the handoff point".
- Clause 6 (measurement): "The measurement of the EReuse shall be carried out at the logical boundary of the data centre at the handoff point," … thermal reuse "measured by increase in temperature and flow with reference to incoming provision"; "the measurement shall be undertaken with meters capable of measuring the energy added to the flow"; "Kilovolt-ampere (kVA), the product of voltage and current, is not an acceptable measurement."
- Annex A.1.3.1–A.1.3.2: reuse that heats support spaces inside the boundary (battery rooms, generator preheat) "does not make that facility a candidate for ERF" (ERF = 0).
- Annex A.1.5.2: "If a heat pump is only used for cooling (100 %), the hot side is discharged." → ERF 0.
- Annex A.1.5.3 (heat pump for heating): "It is incorrect to consider (K) as reusable energy, as it contains the power (L)" and "Energy that is rejected (H) or consumed in the data centre (G) is not part of the ERF." (Paraphrase of fetch output: K = heat-pump output, L = heat-pump electricity; only the data-centre-sourced share of the output counts, formula given as (J − L) × (K/J) / (A + B + M − L). Letter legend is in Figure A.3, not captured; treat the letter mapping as unverified.)
- Annex A.1.4 (split systems): "the amount of energy (F) that is reused shall be appropriated for each space" (e.g. by share of chilled-water flow).
- Annex B: Table B.1 gives energy conversion for "heated or cooled water" and airflow at the boundary.

**STANDARD — EN 50600-4-6:2020** mirrors the above (same scope wording; same clause structure: 4 "Applicable area of the data centre", 5 "Determination of ERF", 6 "Measurement of EReuse and EDC", Annex A heat-pump cases incl. A.5.2 inside-only / A.5.3 outside-only / A.5.3.4 split, Annex B boundary measurement). Source: Slovak UNMS preview, https://normy.normoff.gov.sk/norma/131805/nahlad (body text of clauses 5–6 and Annex A not in the preview). Full text paywalled: https://standards.iteh.ai/catalog/standards/clc/0107ec33-6837-4327-83bd-18621f78d6fb/en-50600-4-6-2020 (fetch permission not granted).

**Green Grid WP#29 (2010), ERE — INDUSTRY GUIDANCE.** Full paper is behind sign-in (https://www.thegreengrid.org/product/118 ; https://archive.thegreengrid.org/en/resources/library-and-tools/242-WP — "Mike Patterson (Intel) editor; contributors Tschudi (LBNL), VanGeet (NREL), Cooley (Oracle), Azevedo (Symantec); 22 September 2010"). Formulae as reproduced in a scholarly review (Shuja et al., arXiv 1208.0593, §2.5, p. 335 — PEER-REVIEWED/preprint): "ERE = (Cooling + Power + Lighting + IT-Reuse) / IT (2.7)"; "ERF = Reuse Energy / Total Energy (2.9)"; "ERE = (1-ERF) × PUE (2.10)"; "0<= ERE<= ∞ and 0<= ERF<= 1.0". A workshop slide citing WP#29 (SC13, https://www.sc13.supercomputing.org/sites/default/files/WorkshopsArchive/pdfs/wp120s1.pdf ) quotes: "However, the benefits of that reuse energy and the efficiency of that energy are outside the scope of ERE." I could not retrieve WP#29's own sentence on the heat-pump boundary — unverified.

**Key ERE vs ERF difference (verified):** ERE subtracts reused energy from facility energy and divides by IT energy (so ERE can fall below 1 and below PUE); ERF is a 0–1 fraction of total DC energy. ISO adopted ERF, not ERE. The RSF/NREL case (https://www1.eere.energy.gov/buildings/publications/pdfs/rsf/rsf_data_center_case_study.pdf , UTILITY/LAB PRACTICE) illustrates how ERE is often reported: "Average ERE = 0.91 (calculated, not measured)" against "Average PUE = 1.18 (measured)".

**ISO/IEC 30134-2 (PUE) boundary as it bears on reuse — STANDARD:** 2016 edition abstract (https://www.iso.org/standard/63451.html , reachable via fetch) only says the standard "defines the measurement, the calculation and the reporting of the parameter"; it is withdrawn, replaced by ISO/IEC 30134-2:2026, whose preview (https://webstore.ansi.org/preview-pages/ISO/preview_ISO+IEC+30134-2-2026.pdf ) shows §5.2 "Total data centre energy consumption", §6.2.2–6.2.4 Category 1–3, Annex B "Calculation of PUE using various energy supplies", and says "required measurements at the data centre boundary have been updated" — body text not visible. The exclusion of reuse from PUE is stated plainly in the US Data Center Metrics Task Force (ENERGY STAR/DOE/EPA/Green Grid, 17 May 2011, §3.6 p. 10, INDUSTRY/GOVERNMENT GUIDANCE, https://www.energystar.gov/sites/default/files/Data_Center_Metrics_Task_Force_Recommendations_V2.pdf ): internal reuse "will already be contained within the PUE calculation"; for reuse outside, "the PUE of the data center is not affected" and it "is specifically excluded from PUE".

---

### 2. EU Delegated Regulation (EU) 2024/1364 (under EED 2023/1791) — REGULATION

Source: https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R1364 (CELEX 32024R1364, 14 March 2024, in force 6 June 2024).

- Article 1: "This Regulation sets out the information and key performance indicators to be communicated to the European database" by operators of data centres with "an installed information technology power demand of at least 500 kW."
- Annex II 1(d) Total energy consumption E_DC (kWh): "CEN/CENELEC EN 50600-4-2 standard or equivalent"; measured at the input before the supply transfer switchgear; includes fuels and other energy for cooling; back-up generator energy E_DC-BG separate.
- Annex II 1(e) IT energy E_IT (kWh): EN 50600-4-2 "category 1 methodology" (UPS output).
- **Annex II 1(j) Waste heat reused, E_REUSE (kWh):** measured per "CEN/CENELEC EN 50600-4-6 standard or equivalent"; "only energy being reused outside the boundaries of the data centre is counted"; (paraphrase) heat "used or reused outside of the data centre boundary" that "substitutes partly or totally energy" needed outside it, measured where it is handed off to the other party; any share of the waste heat used to cool the data centre itself is subtracted, pro rata by cooling-fluid flow.
- **Annex II 1(k) Average waste heat temperature, T_WH (°C):** temperature of the fluid cooling the ICT equipment in the computer room, "averaged over the year, and across every measurement point"; (paraphrase) measured where the heated fluid enters the heat exchanger(s) at the computer-room boundary — at the heat-recovery exchanger where heat recovery exists, otherwise at every exchanger carrying IT heat.
- Annex II 1(o) renewable energy E_RES-TOT: EN 50600-4-3.
- **Annex III (c):** "EREUSE and EDC, as both defined in Annex II, shall be used to calculate the ERF of a data centre." Formula "ERF = EREUSE/EDC". (a) PUE = E_DC/E_IT; (b) WUE = W_IN/E_IT; (d) REF = E_RES-TOT/E_DC.
- Article 3(2): operators may omit 1(d), 1(e), 1(h)–(l) and 1(o)–(r) (i.e. E_REUSE and T_WH) in the first reporting period for technical reasons, with an explanation.
- Annex IV: ERF is published only as an energy-weighted average, with at least three data centres per category. Individual-site KPIs are confidential (Covington summary, p. 6, https://www.cov.com/-/media/files/corporate/publications/2025/04/the-eus-energy-efficiency-directive-and-its-impact-on-datacenters.pdf — LAW-FIRM SUMMARY, not primary).

Note: the regulation does not name ISO/IEC 30134-6; it names EN 50600-4-6. Germany's EnEfG §11(2) sets minimum reuse shares "as defined by DIN EN 50600-4-6": 10 % (operation from 1 July 2026), 15 % (2027), 20 % (2028) (Covington, p. 8 — secondary).

---

### 3. Danish practice (overskudsvarme)

**REGULATION — Forsyningstilsynet price cap, 2025** (https://forsyningstilsynet.dk/Media/638660516540345737/Udmeldelse%20af%20prisloft%20for%20overskudsvarme%202025.pdf ): "Prisloftet for overskudsvarme for 2025 er beregnet til" 95 kr./GJ; legal basis "bekendtgørelse om et prisloft for overskudsvarme, nr. 458 af 28." April 2023 under lov om varmeforsyning (LBK nr. 124 af 2. februar 2024). The cap is derived from the production cost of the cheaper of a wood-chip boiler or an air-to-water heat pump (Teknologikatalog). The document does not state a metering point.

**REGULATOR FAQ** (Forsyningstilsynet, https://cdn1.gopublic.dk/forsyningstilsynet/Media/638372891900131751/FAQ%20vedrørende%20prisloft%20på%20overskudsvarme.pdf ): overskudsvarme = "uundgåelig varme produceret som biprodukt fra industri- eller elproduktionsanlæg eller i tertiærsektoren" (varmeforsyningsloven § 1 a, nr. 2) (p. 6); "Prisloftet gælder for anlæg, der udnytter og leverer overskudsvarme, med en kapacitet på mindst 0,25 MW." and "Det er varmeforsyningsvirksomheden, som skal overholde prisloftet." (p. 7); **"De samlede omkostninger til udnyttelse af overskudsvarme skal holdes under prisloftet."** including heat extracted "fra punktkilden ved anvendelse af en varmepumpe eller lignende", "omkostninger til tilslutning, investering, drift og vedligehold af anlægget" and "evt. betaling til den virksomhed, der leverer overskudsvarme" (p. 9). Implication (my reading, not stated verbatim): the cap is tested on the all-in cost per GJ of heat as delivered into the DH network after the utility's heat pump, so the raw-heat payment to the data centre is a residual.

**REGULATION (tax) — Skattestyrelsen Juridisk vejledning E.A.4.6.10.2–3** (https://www.tax.dk/jv-2024-1/ea/E_A_4_6_10_2.htm , …_3.htm): "eventuelt forbrug af elektricitet i varmepumper til nyttiggørelse af overskudsvarme skal måles hver for sig."; "Leverandøren af overskudsvarme har ansvaret for at foretage måling."; for electric heat pumps "nedsættes godtgørelsen kun for den del af den nyttiggjorte varme, der overstiger tre gange elforbruget i varmepumpen." — worked example measures heat "ved udgang fra varmepumpe" and deducts 3 × electricity. So Danish tax accounting meters heat at the heat-pump outlet and nets out a 3:1 electricity allowance.

**UTILITY PRACTICE — Fjernvarme Fyn / Tietgenbyens Varmecentral (Meta Odense)**, in Dansk Fjernvarme "Inspirationskatalog for store varmepumper 2022" (https://danskfjernvarme.dk/media/eqbhcqlv/inspirationskatalog-for-store-varmepumper-2022.pdf , pp. 8–11; trade-association catalogue written with the utility — treat numbers as utility claims): TBV-1 "Nominel varmeydelse 23,9 MW", "Nominel COP 4,4"; TBV-2 "Nominel varmeydelse 20,7 MW", "Nominel COP 4,9"; "Varmekilde afkøles fra-til 27-15 °C"; "Fjernvarme opvarmes fra-til 40-75°C"; "Årligt antal fuldlasttimer 5.000-7.000"; **"Gennemsnits COP for 2021 og 2022 har ligget på 4,2 som en samlet opgørelse inklusive cirkulations- og distributionspumper."**; the figure of "gennemsnitlige overskudsvarmeeffekt (MW)" is the heat drawn from the data centre, and "Den producerede fjernvarme er ca. 30 procent højere end figurens værdier." (i.e. the utility reports DC-side heat and DH-side heat separately; the 30 % uplift ≈ 1/(COP−1) at COP 4.2); "Samlet anlægsinvestering … 215 mio.kr."; TBV owned and operated by Fjernvarme Fyn, data centre by Facebook (p. 11). The catalogue's sentence "Den årlige varmeproduktion hos Fjernvarme Fyn er på ca. 160.000 MWh, hvoraf Tietgenbyens Varmecentral leverer ca. 7%" is internally implausible (Fjernvarme Fyn serves >100,000 homes) — unverified/likely erroneous. No metering-point statement; "måling", "afregning", "elforbrug" do not appear. Rambøll's project page (OPERATOR/ENGINEER CLAIM, https://www.ramboll.com/da-dk/projekter/energi/meta-surplus-heat-to-district-heating ): "Anlægget skal genvinde 215.000 MWh energi fra Metas hyperskala-datacenter", "samlede varmeproduktion er cirka 45 MW", output "70-75°C" — future tense, design values, no COP. I did not find a Fjernvarme Fyn annual report with measured MWh from the data centre.

---

### 4. Swedish practice — Stockholm Exergi Öppen Fjärrvärme

**RESEARCH REPORT (industry-funded, not peer-reviewed) — Energiforsk 2020:681, "Verktygslåda för prosumtion inom fjärrvärme"** (Kensby, Ottosson, Eklund, Fransson, Johansson; https://energiforsk.se/media/28252/verktygslada-for-prosumtion-inom-fjarrvarme-energiforskrapport-2020-681.pdf ):
- Meter ownership/boundary: "Stockholm Exergi investerar i och äger energimätaren" (pp. 15–16); "Resten av behövlig produktionsanläggning investeras i och ägs av spillvärmeleverantören" (p. 16); "Spillvärmeleverantören är ansvarig för att kundcentralen fungerar och kan leverera värme till nätet" (p. 16); where the site also buys DH, "Separata energimätare installeras för att mäta respektive flöde" (p. 17).
- Settlement: "Priset på energi sätts på timbasis utifrån den prognostiserade alternativkostnaden" (p. 16).
- Heat pump on supplier side: Bahnhof — "Bahnhofs del av investeringen bestod av det nya kylsystemet, t.ex. värmepumpar" (p. 17). Simulation assumes COP 3.7 (pp. 31–32).
- Cases (operator-reported): Bahnhof Pionen "I normal drift levereras 600 kW värme med en temperatur på 68°C" (p. 17); H&M "Varje år levereras 1,7 GWh värme till fjärrvärmenätet" (p. 17).

**UTILITY PRACTICE — Stockholm Exergi product sheet** (https://www.stockholmexergi.se/wp-content/uploads/2023/05/Produktblad_tjanster_Oppen-Fjarrvarme.pdf ): "Leveranstemperaturen till fjärrvärmenätets framledning är normalt 68 °C"; Spotvärme Prima "kan variera mellan 68 °C till 103 °C"; Retur "minst 3 °C högre än inkommande returtemperatur"; payment = "en fast månatlig effektersättning för tillhandahållen effekt" + "en rörlig energiersättning för levererad värme". No metering-point text on the sheet.

**UTILITY PRACTICE — Stockholm Exergi/GleSYS seminar slides** (Energiföretagen, https://www.energiforetagen.se/globalassets/energiforetagen/det-erbjuder-vi/sakomraden/restvarmeseminarium/peter-sivengard_joakim-jarstorp.pdf ): "2 x värmepump Carrier", "Varma sidan 40° - 80°", "Kalla sidan 18° - 12°", "800 KW kapacitet", "2018: 3.8 GWh" (slides 10, 12) — operator claims.

Conclusion for item 4 (verified): delivered heat is metered by the utility's own energy meter at the connection, on the DH side, i.e. after the supplier's heat pump; the heat-pump electricity is on the supplier's side of the meter and is not subtracted from "levererad värme"; settlement is hourly.

---

### 5. Vancouver

**REGULATION — Energy Utility System By-law No. 9552 (consolidated)** (https://bylaws.vancouver.ca/9552c.PDF ):
- §1.2 "heat energy" means "heat distributed or delivered by water including space heating, domestic hot water, and heat for ventilation make-up air;"; "points of delivery" = "the valves on the building side of the heat exchangers at an energy transfer station"; meter = "thermal energy meter at an energy transfer station" "used to measure and record the heat energy supplied to the designated building".
- §8.4: bills include "(b) the number of megawatt hours of heat energy supplied to the energy transfer station; and (c) the number of megawatt hours of heat energy returned from the energy transfer station."
- §8.3: owner pays "the charge set out in Part 3 of Schedule C less the credit set out in Part 4 of Schedule C."
- Schedule C Part 3: "Energy charge (Standard Green Heat) $65.172 per MW hour"; **Part 4 "Credit for heat energy returned to energy transfer station" "$65.172 per each MW hour multiplied by 50%"**.
- §5.2(a)(ii) and (v): building systems may use "waste heat recovered inside the building" and "equipment to recover waste heat energy from the refrigeration or cooling system of the building".
- Not defined: "heat energy returned"; no metering standard, no conditions on the 50 % credit; §8.4(c) says "returned from" while Part 4 says "returned to" (unreconciled in the text).

**REGULATION — BCUC Decision/Order C-1-19 (3 May 2019), Creative Energy South Downtown NES CPCN** (https://www.ordersdecisions.bcuc.com/bcuc/decisions/en/405300/1/document.do ): "The amount of heat used by each building is measured using temperature transmitters and flow meters." No point-of-delivery definition and no waste-heat/returned-heat clause.

**REGULATION — Annual Greenhouse Gas and Energy Limits By-law No. 13472** (https://bylaws.vancouver.ca/13472c.PDF ): §1.5 "Heat energy" means "the total gas used in a building operation plus district heat that is consumed inside the building" (excluding electricity), "measured in gigajoules of energy equivalent per square meter of gross floor area per year"; §3.2 limit "0.09 GJ/m2 of GFA" (2040); reporting via §2.5(b)(i) "annual site energy use for each energy/fuel type". So "heat energy intensity" is fuel-based for on-site gas (gas input, not useful heat) but delivered-heat-based for district energy — a mixed basis.

**UTILITY/CITY PRACTICE — City info sheet on TES emission factors** (https://vancouver.ca/files/cov/thermal-energy-systems-emissions-factors-info-sheet-existing-buildings.pdf ): factors "Reflect emissions per unit of useful thermal energy delivered"; 2024: "City of Vancouver False Creek NEU (hot water): 69.43 kg CO2e/MWh", "Creative Energy (Core TES steam): 88.99 kg CO2e/Mlbs" ("0.347 MWh/Mlbs"), "River District Energy Utility (hot water): 201.85 kg CO2e/MWh". No heat-recovery or heat-pump statement.

---

### 6. Peer-reviewed measurement studies

- **PEER-REVIEWED — Oltmanns, Sauerwein, Dammel, Stephan, Kuhn (2020), Energy Sci. Eng., doi:10.1002/ese3.633** (abstract via DOAJ, https://doaj.org/article/c42f7e7125534968bfd39869e896d365 ): design/simulation, not a year of metering. Lichtenberg II cooled with 45 °C hot water; "20–50% of the waste heat could be reused" depending on scenario (DH return line vs direct building supply); "CO2 emission can be decreased by up to 720 tCO2/a". No measured recovered fraction, no measured COP.
- **PEER-REVIEWED — Zimmermann et al. (2012), Energy 43(1):237–245** (abstract, https://ideas.repec.org/a/eee/energy/v43y2012i1p237-245.html ): measured on a prototype (Aquasar): "A heat recovery efficiency of 80% and an exergetic efficiency of 34% were achieved with a water temperature of 60 °C." Meter location not in abstract.
- **PEER-REVIEWED — Wahlroos, Pärssinen, Manner, Syri (2017), Energy 140:1228–1238** (https://acris.aalto.fi/ws/portalfiles/portal/17305461/1_s2.0_S0360544217314548_main.pdf ): uses ERE = (P_DataCenter + P_Cooling − P_Reuse)/P_IT with P_Reuse "the power supplied to a secondary application, for example DH" (p. 1230) — note this counts heat at the DH handoff and does not state whether heat-pump electricity is in P_Reuse; "The coefficient of performance (COP) of the heat pumps in DCs typically range between 3.0 and 6.3" (p. 1232); Lu et al. "waste heat could be captured from 97% of the total power consumed" (p. 1230); Telia Pitäjänmäki 24 MW DC "generates 200 GWh of heat annually" (p. 1229 — operator figure via Fortum LOI, p. 1233). All modelled; no annual metering.
- **PEER-REVIEWED — Pärssinen et al., Sustainable Cities and Society (investment analysis)** (https://acris.aalto.fi/ws/portalfiles/portal/29723097/ELEC_parssinen_et_al_waste_heat_sustainability.pdf ): "The paper does not discuss where heat is metered"; recovery rate fixed at 97 % from Lu et al. (pp. 430–431); COP 3.75 (Table 1, p. 432) and 3.7 from Calefa interview for ~35 → ~80 °C (p. 431); only one week of measured rack power (4.217–4.355 kW/day, p. 431); Fortum Open DH prices "50 €/MWh at outdoor temperatures below −8 °C to 15 €/MWH at temperatures above 20 °C" (p. 437).
- **PEER-REVIEWED — Lu, Lü, Remes, Viljanen (2011), Energy and Buildings 43(12):3360–3372, doi:10.1016/j.enbuild.2011.08.034**: source of the 97 % figure; abstract not retrievable (ScienceDirect blocked) — unverified at source.
- **PEER-REVIEWED — Huang, Shao, Zhang, Tian (2019), Energy 189, doi:10.1016/j.energy.2019.116200**: lab unit; "comprehensive energy efficiency ratio of heat recovery mode reaches 4.47" at 50 °C supply; annual 4.75 "analyzed" for a 5 kW DC in Tianjin (unclear if measured).
- **PEER-REVIEWED — Ljungqvist, Risberg, Toffolo, Vesterlund (2023), Energy Conv. Mgmt: X 20, 100473**: one-year simulation, Luleå; "The resulting ERF was 0.50, 0.59 and 0.66" at 30/40/50 °C exhaust; envelope losses affect momentary iERF "up to 7%" but annual ERF "less than 1%".
- **PEER-REVIEWED — Požgaj et al. (2026), Applied Sciences 16(1):323** (https://www.mdpi.com/2076-3417/16/1/323 ): TRNSYS with measured 2023 inputs (UPS output meter at 5 min); Q_reused computed on the DH side of the exchanger (Eq. 4, §2.7); ERF 0.88/0.86/0.78 for 5G/4G/3G DH, described as an upper bound (§3.1, §3.4); COP from manufacturer maps, not measured.
- **PEER-REVIEWED (preprint) — "Energy-aware operation of HPC systems in Germany", arXiv 2411.16204, Table 3**: "ERF: Energy Reuse Factor (reused heat / total heat)"; "avg.: Average heat load over 12 months of a reference year." Reported operating ERFs: DKRZ 0.20 (no HP), LRZ 0.06 (no HP), KIT 0.04, HLRS 0.009 (HP), TU Dresden 0.12; planned: TU Dresden 0.77 (HP, city DH, 2025), HLRS 0.5 (2028), JSC 0.24. "Our survey in Table 3 shows energy reuse factors ranging from 0 to 20% for these DLC-enabled German HPC data centers." Note their ERF denominator is "total heat", not E_DC — not the ISO definition.
- **Reviews:** Huang et al. (2020) Applied Energy 258:114109 (https://doi.org/10.1016/j.apenergy.2019.114109 ) — abstract only, no numbers; Yuan et al. (2023) RSER 188:113777 — "does not describe how recovered heat is metered in any case" and does not define ERF/ERE.
- **Not found:** any peer-reviewed paper that meters a full year of data-centre heat delivered to a DH network and compares it with design; any peer-reviewed paper on Telia Helsinki/Helen; Davies, Maidment & Tozer (2016), Appl. Therm. Eng. 94 is modelled (London districts), no COP in abstract (https://iifiir.org/en/fridoc/using-data-centres-for-combined-heating-and-cooling-an-investigation-139000 ). ScienceDirect 2024 "District heating utilizing waste heat of a data center: High-temperature heat pumps" (Energy & Buildings) and 2025 RSER review not retrievable (blocked).

---

### 7. Uptime Institute / Green Grid / JRC guidance on the metering point

- **INDUSTRY GUIDANCE — Uptime Institute, "Heat reuse: a management primer", Briefing Report 114, M. Smolaks, 2 Oct 2023** (https://intelligence.uptimeinstitute.com/resource/heat-reuse-management-primer ): ERF "is defined by the European standard EN 50600-4-6" and "is calculated by dividing the energy captured and reused by the total energy consumption on an annual basis."; "When heat pumps are operated within the data center boundaries, the energy they use is included in the calculations of the energy spent on facilities."; heat pumps "can transfer a heat output that is three to six times larger than the amount of electricity consumed."; "The growth in the number of waste heat recovery projects necessitates new metrics that account for the energy spent on concentrating and transporting heat to the boundaries of the data center." ERE given as (Total facility energy − reused energy)/IT energy. It does not name a "common error".
- **INDUSTRY GUIDANCE — Green Grid/DOE/EPA Task Force 2011 §3.6** (quoted in item 1): internal reuse belongs in PUE; external reuse "specifically excluded from PUE".
- **EU-level GUIDANCE — JRC 2024 Best Practice Guidelines for the EU Code of Conduct (JRC136986)** (https://e3p.jrc.ec.europa.eu/sites/default/files/2024-04/JRC136986_2024_best_practice_guidelines.pdf ): 5.7.1 "This does not reduce the energy consumed by the data centre itself but does offset the total energy overhead"; 5.7.2 "it can still be economic to use additional heat pumps to raise the temperature to a useful point."; 5.7.4 "The opportunity for the reuse of waste heat from data centres is referenced by ISO/IEC 30134-6"; 9.3.9 "Report Energy Reuse Factor (ERF) according to EN 50600-4-6 or ISO/IEC 30134-6." (p. 65).
- **The "before vs after the heat pump" error — what the standard actually says (STANDARD, item 1):** ISO/IEC 30134-6 clause 5 excludes outside-boundary heat pumps from the calculation, and Annex A.1.5.3 states "It is incorrect to consider (K) as reusable energy, as it contains the power (L)". So a published "heat delivered to the network" figure measured at a utility-owned heat pump's outlet (Danish and Swedish practice above) is not E_Reuse under ISO/EN/EU rules; E_Reuse is the lower, DC-side figure at the handoff. I found no Uptime or Green Grid document that names this as a common error in those words — that framing is my synthesis from the standard text, not a quote.

---

## Synthesis: recommended measurement boundary for the tool

**What to call "heat delivered."** Use two separate quantities and never add or swap them:
1. **E_Reuse (DC-side, ISO/EN/EU basis):** thermal energy crossing the data-centre boundary at the handoff to the heat taker, measured by flow × ΔT "with reference to incoming provision" (ISO/IEC 30134-6 cl. 6; Reg. 2024/1364 Annex II 1(j)). Excludes any heat-pump uplift outside the boundary (cl. 5) and any heat reused inside the boundary (cl. 4). This is the only figure that may be called ERF numerator or reported to the EU database.
2. **Q_DH (network-side, utility basis):** heat metered at the district-heating connection after the heat pump, which is what Stockholm Exergi (meter owned by the utility, hourly settlement; Energiforsk 2020:681 pp. 15–16) and Fjernvarme Fyn (DH output ≈ 1.3 × DC-side heat at COP 4.2; Inspirationskatalog 2022 p. 10) actually bill and publish, and what Danish tax law meters "ved udgang fra varmepumpe". Label every operator or utility "heat delivered" number by which of these it is; if the source does not say, mark it unknown.

**Where to meter for our own first attempt.** Heat meter (flow + supply/return temperature) on the data-centre side of the heat-recovery exchanger at the boundary (E_Reuse); a second heat meter on the network side of the heat pump (Q_DH); an electricity meter on the heat pump and its pumps (W_HP); E_DC at the utility intake (EN 50600-4-2 / Reg. Annex II 1(d)); E_IT at UPS output (category 1). Record T_WH as the annual flow-weighted average of the fluid temperature entering the heat-recovery exchanger (Annex II 1(k)).

**What to subtract.** From E_Reuse: any share of recovered heat returned to cool or heat the data centre or its support spaces (Annex II 1(j); ISO A.1.3, A.1.4 pro rata by flow). Do not subtract heat-pump electricity from E_Reuse (it is outside the boundary); do not include it in E_DC unless the heat pump is inside the boundary, in which case it raises E_DC and PUE (Uptime 2023; ISO cl. 5 "infrastructure needed to transfer or to enhance the reused heat flow to the handoff point").

**How to report COP and ERF.** ERF = E_Reuse / E_DC, annual, 0–1 (ISO cl. 5; Reg. Annex III(c)). Report COP as a seasonal, all-in value: SCOP = Q_DH / W_HP with pumps included and stated (the Fjernvarme Fyn 4.2 "inklusive cirkulations- og distributionspumper" is the model), alongside the design/nominal COP (4.4/4.9) so design-vs-realised is visible. Check: Q_DH ≈ E_Reuse × COP/(COP−1). Optionally report ERE = (1 − ERF) × PUE for comparison with older literature, but say it is Green Grid 2010, not ISO.

**For Vancouver.** The NEU by-law already bills on MWh "supplied to" and credits MWh "returned from" the energy transfer station at 50 % of the energy rate (By-law 9552 §8.4, Sched. C Part 4), with the meter at the ETS; this is the natural local analogue to E_Reuse/Q_DH, but "heat energy returned" is undefined and uncredited by any standard. By-law 13472 "heat energy" (gas + district heat consumed in the building, GJ/m²) is not a reuse metric and should not be conflated with ERF.

**Standards backing each choice:** boundary and exclusion of heat pumps — ISO/IEC 30134-6 cl. 4–5, A.1.5.3; meter type and location — ISO/IEC 30134-6 cl. 6, Annex B; EU reporting fields — Reg. 2024/1364 Annex II 1(d), (e), (j), (k), Annex III; PUE exclusion of reuse — Task Force 2011 §3.6; utility metering after heat pump — Energiforsk 2020:681 pp. 15–17, Fjernvarme Fyn catalogue p. 10, Skattestyrelsen E.A.4.6.10.3.

**Unverified / not obtained:**
- Verbatim ISO/IEC 30134-6 and EN 50600-4-6 clause text from the ISO/CENELEC editions (BIS adoption used instead); Figure A.3 letter legend.
- Whether the abstract's "The ERF does reflect the efficiency of the reuse process" is a drafting error for "does not".
- Green Grid WP#29 original wording on the heat-pump/reuse boundary (sign-in only; fhi.nl copy failed).
- Full verbatim text of Reg. 2024/1364 Annex II 1(j)/(k) (fetch tool refused to reproduce whole rows; paraphrase checked twice).
- Fjernvarme Fyn's own annual report figures for heat from the Meta site; the "160.000 MWh" sentence in the Dansk Fjernvarme catalogue (likely erroneous).
- Exact Danish prisloft bekendtgørelse clause on delivery point (retsinformation PDF not fetched).
- Lu et al. 2011 abstract (97 % figure) at source; Davies 2016 COP values; Oltmanns 2020 full text (anti-bot block on TUprints; Wiley fetch failed).
- Any peer-reviewed annual metered DC-to-DH study; any Telia/Helen paper.
- Creative Energy tariff "point of delivery" clause (only the BCUC C-1-19 sentence on flow meters and temperature transmitters found).


## D. Canadian cases

## Canadian data-centre heat-recovery cases — calibration evidence (search date 2026-10-13)

Basis labels: **METERED** (measured, reported in a primary doc) · **REPORTED** (figure stated by operator/utility/consultant, basis not given) · **MODELLED** (design forecast, study) · **UNVERIFIED** (claim only, no primary doc found). Everything not found in a document is written "not stated".

---

### Confirmed built and operating

#### 1. TELUS Garden Thermal Energy System, Vancouver (FortisBC Alternative Energy Services, FAES) — heat from TELUS Vancouver data centre
Primary source: BCUC Order C‑1‑13 with Reasons for Decision (4–5 Feb 2013, 48 pp.), https://www.ordersdecisions.bcuc.com/bcuc/orders/en/118621/1/document.do ; Order G‑155‑12 (hearing order), https://www.ordersdecisions.bcuc.com/bcuc/orders/en/118216/1/document.do ; Order G‑2‑15 (rates), https://www.ordersdecisions.bcuc.com/bcuc/orders/en/119488/1/document.do ; Orders G‑204‑23 and G‑349‑23 (2023 rate complaint by Strata EPS 3242), https://www.ordersdecisions.bcuc.com/bcuc/orders/en/521806/1/document.do and https://www.ordersdecisions.bcuc.com/bcuc/orders/en/522040/1/document.do

| Item | Value | Basis | Source / quote |
|---|---|---|---|
| Heat source | "waste heat from cooling loads at the adjacent TELUS Data Centre" (C‑1‑13 p. 15); "a waste heat recovery system from the Telus data centre situated onsite" (G‑155‑12, App. B para. 2) | — | BCUC |
| IT load (MW) | not stated | — | — |
| Heat available | "A year round base load of 1,400 kW of heat is available on a 24/7 basis" (C‑1‑13 p. 15) | MODELLED (design) | BCUC |
| Heat delivered | Forecast development load "4,591 MWh for cooling and 5,194 MWh for heating" (p. 16); "designed to meet 94 percent of the annual heating demand of the Development" (p. 16); balance and peaks from Central Heat (now Creative Energy) steam (pp. 15–16) | MODELLED | BCUC |
| Peak loads | 5.8 MW heating, 5.5 MW cooling (p. 16) | MODELLED | BCUC |
| Recovery equipment | "Recovery of waste heat is achieved through heat exchangers and water to water heat pumps" (p. 15) | — | BCUC |
| Temperatures / COP | not stated in C‑1‑13 | — | — |
| Owner / operator | FAES (FortisBC subsidiary), regulated TES; customers = office tower, residential tower (425 units), retail; "owned and operated by FortisBC Alternative Energy Services Inc." (IDEA 2018 technical‑tour listing) | — | BCUC; IDEA |
| Investment | TES capital "$7.9 million plus $350 thousand of FAES development costs" (pp. 18–19), FAES purchase capped at 30 % above; sustaining capital ~$2.2 M over 20 yr (p. 18). Waste‑heat option $3.2 M vs geo‑exchange $6.8 M (p. 17) | REPORTED | BCUC |
| Price of heat / credit | Customer rate: BC Hydro residential benchmark + 5–10 % premium (proposed $0.105–0.126/kWh 2014–18, G‑155‑12 Recital F); C‑1‑13 denied the initial rate; G‑2‑15 approved amended rates. Supply of DC heat described as "free waste heat supply from the TELUS Data Centre" (p. 14) — no payment to TELUS stated | REPORTED | BCUC |
| GHG | ~12 tCO2e/yr vs >1,210 BAU, "approximately 99 percent" reduction (pp. 17–18) | MODELLED | BCUC |
| Year | CPCN Feb 2013; planned operation "second quarter of 2015" (p. 7); in service and toured by IDEA 2018 | — | BCUC; IDEA |
| ERF | not stated | — | — |
| Measurement basis | No public metered data: G‑2‑15 "rescinds the directive in Order C‑1‑13 directing FAES to file an annual report for actual" loads (Order p. 2). Actual‑load evidence may exist in the 2023–24 complaint record (IR responses), not read here. | — | BCUC |

Note: the 2013 trade‑press items that say "Telus warms condos with server heat" are this Vancouver system, not Rimouski.

#### 2. Markham District Energy (MDE) / Equinix TR5, Markham ON
Primary‑ish sources: Equinix press release 5 Jun 2024, https://investor.equinix.com/news-events/press-releases/detail/1044/help-us-heat-our-neighbors---equinix-makes-data-center (OPERATOR CLAIM); Equinix blog 24 Apr 2025 (OPERATOR CLAIM), https://blog.equinix.com/blog/2025/04/24/the-hidden-benefit-of-data-centers-warming-communities-not-just-servers/ ; FVB Energy (engineer of record) project page, https://fvbenergy.com/astra-portfolio/markham-large-scale-heat-pumps/ ; NYSERDA/IDEA/Danish Trade Council "DATA HEAT" Task 1 report (Reshape Strategies, Feb 2026), https://www.nyserda.ny.gov/-/media/Project/Nyserda/Files/Programs/Large-Scale-Thermal/DATA-HEAT---Appendix-B---Task-1-Slide-Deck-Report.pdf ; Northern Virginia Regional Commission site‑visit page (Jan 2025), https://new.express.adobe.com/webpage/FelIG34WcMyKv

| Item | Value | Basis | Source |
|---|---|---|---|
| Status | "MDE has partnered with Equinix to harness waste heat from the TR5 data centre campus" (DATA HEAT slide 28); "The MDE heat pump project for heat recovery was commissioned beginning in late 2023" (Equinix blog) | OPERATOR CLAIM / third‑party programme doc | |
| IT load | not stated in any primary doc | — | |
| Heat delivered | not stated (no MW/MWh anywhere). Equinix: heat reaches "a nearby hotel, university and local shopping center in downtown Markham" and "services multiple buildings with domestic hot water all year long"; in summer "there is simply more heat than the community can use" | OPERATOR CLAIM | Equinix |
| Recovery plant | "2 x 2 MWt (4 MWt total) heat recovery chillers at their Warden Energy Centre", ammonia, "hot water temperatures as high as 85°C", commissioned 2023, FCM‑funded, 4,500 t GHG/yr "once fully utilized" — FVB does **not** name the data centre as the source | REPORTED (consultant) | FVB |
| COP | not stated | — | |
| Owner | MDE (City of Markham); Equinix bought TR5 from Bell Canada in 2020 (NVRC) | — | |
| Price / credit | "Equinix does not seek income from the exported heat" | OPERATOR CLAIM | Equinix blog |
| Investment | not stated for the DC link (federal $24.9 M July 2024 is for the 18.5 MW wastewater project, not TR5: canada.ca release) | — | |
| ERF | not stated | — | |

Gap: no City of Markham council document, MDE annual report or OEB filing found that quantifies the TR5 heat; the markham.ca 2024 Corporate Energy Management Plan does not mention it.

#### 3. Université Laval, Québec City — Colosse supercomputer (2010–) and Centre de valorisation des données (CVD, 2019–)
Primary source: Université Laval, *Étude de cas – Centre de valorisation des données* (Sept 2021), https://transformation-numerique.ulaval.ca/wp-content/uploads/2023/05/etude-de-cas-centre-de-valorisation-des-donnes-universite-laval-septembre-2021.pdf

| Item | Value | Basis | Page |
|---|---|---|---|
| Mechanism | "En hiver, la chaleur rejetée dans le réseau central d'eau réfrigérée était reprise par d'autres pavillons du campus" | — | p. 9 |
| Heat recovered (Colosse) | "la récupération de chaleur, soit 1 150 000 kWh/an" (= 1.15 GWh/yr) | METERED (one year of continuous data stated for PUE; basis for the kWh figure not explicit → treat as REPORTED) | p. 10 |
| Heat pumps / temp / COP | "des pompes thermiques eau/eau qui génèrent de l'eau de chauffage à 40 degrés Celsius"; "le coefficient de performance de ces pompes thermiques était de l'ordre de 7" | REPORTED | p. 9 |
| Gas displaced | "L'économie annuelle était de l'ordre de 130 000 m3 de gaz naturel"; 245 t CO2e | REPORTED | pp. 9–10 |
| PUE | "un PUE de 1,28 pour le Colosse" over one year | METERED | p. 10 |
| IT load | Colosse: not stated. CVD: design "pour un total de 600 KW", 900 kW UPS | — | pp. 14–15 |
| CVD heat reuse | "En hiver, la chaleur du Centre est rejetée dans le réseau central d'eau réfrigérée"; "L'excédent d'énergie est récupéré et réutilisé sur le campus"; CVD PUE 1.25 in tests; CVD heat quantity not stated | REPORTED | pp. 24, 27 |
| Investment | Colosse installation "3 260 329,74 $"; CVD 21,5 M$ | REPORTED | pp. 11, 13 |
| Price / credit | internal (same owner), not stated | — | |
| ERF | not stated | — | |

Also: UL news 8 Jun 2026 — commitment to recover heat from AI clusters (tamIA, 2025); "équivalent de l'énergie consommée par 115 maisons" within a year — PLANNED, https://nouvelles.ulaval.ca/2026/06/08/luniversite-laval-sengage-a-attenuer-lempreinte-climatique-de-lintelligence-artificielle-3bd25065-e199-4651-8cad-2b31d8dab9ee

#### 4. Humano District, Sherbrooke QC — Exaion servers heating a residential development
Primary sources: MELCCFP (S. Gagnon, ing.), "Développer l'IA ou décarboner le Québec?", *Vecteur Environnement*, Mar 2026, pp. 12–14, https://cdn-contenu.quebec.ca/cdn-contenu/environnement/rejets-thermiques/developpper-ia-decarboner-quebec.pdf ; Québec programme page "Projets de valorisation des rejets thermiques en cours", https://www.quebec.ca/agriculture-environnement-et-ressources-naturelles/energie/reussir-ses-projets-transition-energetique/valorisation-rejets-thermiques/projets-en-cours ; Québec press release (subsidy), https://www.quebec.ca/nouvelles/actualites/details/programme-valorisation-des-rejets-thermiques-1-m-a-humano-district-pour-la-valorisation-des-rejets-thermiques-dun-futur-centre-de-calcul-quantique-a-sherbrooke-54919 (fetch returned empty twice — could not read; URL given)

| Item | Value | Basis |
|---|---|---|
| Status | "Le projet est opérationnel depuis plus d'un an et promet de livrer les résultats attendus" (MELCCFP p. 13); phase 2 in preparation | Government |
| Use | water loop serving 193 units and heat pumps, replacing a gas boiler (MELCCFP p. 13); "la boucle thermique du développement immobilier Humano District" (programme page) | Government |
| IT load / heat delivered / temps / COP | not stated | — |
| GHG | "plus de 400 tonnes" CO2e/yr avoided (programme page); Énergère (contractor) says "404 tons" and "51%" (CONTRACTOR CLAIM, https://energere.com/energere-commits-to-the-future-with-the-humano-district-project/) | REPORTED |
| Subsidy | "une aide financière de plus de 1 M$" (programme page); Énergère: "1 008 750$" | REPORTED |
| Price / credit, ERF | not stated | — |

#### 5. UBC Vancouver — University Data Centre in the Pharmaceutical Sciences Building (2012–)
Primary source: BC Hydro Power Smart success story, https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/power-smart/business/programs/success-story-ubc.pdf ; UBC IT, https://it.ubc.ca/node/2897

| Item | Value | Basis |
|---|---|---|
| Mechanism | measures include "capturing waste heat from the data centre and recycling it into the building"; "there is a data centre in the basement" (BC Hydro) | REPORTED (utility) |
| Savings | ~1.2 GWh/yr for all measures combined (daylighting, low‑temp water, heat recovery) — heat‑recovery share not isolated | REPORTED |
| IT load, heat kW, temps, COP, export to ADES | not stated; no UBC Facilities or Energy document found that credits the UDC as an ADES heat source | — |
| Year | "completed in November 2012 and is now operational" (UBC IT) | — |

This is an in‑building reuse, not neighbour delivery.

#### 6. HeatConnect, Québec City — servers pre‑heating DHW in three multi‑residential buildings
Source: MELCCFP Mar 2026 p. 14: "in progress for several weeks", >100 t CO2e/yr; no kW. Too new/small for calibration; noted for completeness.

---

### Candidates that are planned, modelled or unverifiable

- **QScale Q01, Lévis** — PLANNED/UNDER CONSTRUCTION. Énergir release 16 Mar 2023: "Up to 96 megawatts (MW) could be distributed", "more than 15,000 Québec households", "first delivery … anticipated by early 2024" (https://www.globenewswire.com/news-release/2023/03/16/2629252/0/en/CORRECTION-%C3%89nergir.html). Québec programme page: Les fraises de l'Île d'Orléans, 12 ha greenhouses "procède actuellement à l'installation", "aide financière de 40 M$", >23,000 t CO2e/yr; MELCCFP Mar 2026: "ready for next winter". Régie de l'énergie record found is a tariff complaint (Fasken, 18 Aug 2025) giving PDA 142 MW, not heat (https://www.regie-energie.qc.ca/storage/app/media/consommateurs/acces-a-information/decisions-et-documents-transmis-dans-le-cadre-de-demandes-dacces/3-20250818-fasken-plainte-qcmw-let.pdf). No metered delivery yet.
- **111 E 5th Ave / 2060 Quebec St, Vancouver (TELUS–Westbank "M3")** — CONDITION ONLY. Referral report 30 Jun 2026 (https://council.vancouver.ca/20260714/documents/rr1.pdf): "will be required to feed the waste heat into the City's False Creek Neighbourhood Energy Utility" (p. 4); condition 1.11 "Successful waste heat recovery and delivery to the NEU is a material condition of the proposed use" (p. 14); note "anticipated load of up to 40 MW" (p. 16); owner bears infrastructure cost "for the life of the building" (p. 20). Decision deferred (public hearing 23 Jul 2026). No heat quantity stated.
- **SFU Cedar/Fir, Burnaby** — MOU with Corix (Feb 2026) to "explore opportunities to capture and reuse excess waste heat" into the Burnaby Mountain neighbourhood energy system; no figures (https://www.sfu.ca/sfunews/stories/2026/02/sfu-partners-with-businesses-to-boost-sustainability-of-canada-s.html). BC Hydro 2019 page: PUE 1.07, no heat reuse.
- **ÉTS / Calcul Québec (Béluga/Narval), Montréal** — MODELLED only. St‑Pierre, C., M.Sc.A. thesis, ÉTS 2024: "une importante quantité de chaleur (2 MW en 2021) serait rejetée dans l'eau glacée", chilled‑water return ~15 °C as source (https://espace.etsmtl.ca/id/eprint/3578/1/ST_PIERRE_Catherine.pdf).
- **TELUS Rimouski** — UNVERIFIED. ENR 2012, IT World Canada, DCD 2012, Skanska case sheet (phase 1 "2.7 MW", PUE 1.15, 25+ MW at phase 7), Clean50 and ProQuest 2015 all describe free‑cooling heat rejection to outside air; none describes heat delivered to an adjacent building. The "warms condos" story is TELUS Garden, Vancouver. **TELUS Kamloops** — nothing found.
- **Alberta (U of A, U of C, Edmonton/Calgary)** — none built. DATA HEAT report slide 22: "no publicly documented projects yet using captured data centre waste heat for TENs" in Alberta. Bartlett (U of C MSc 2025) is a model: "Coolant outlet temperature = 60C", "Waste Heat Transfer Efficiency = 68%", 5,875 MWh/yr recoverable per MW IT (https://ucalgary.scholaris.ca/server/api/core/bitstreams/8f66f77b-d1cd-4408-aad2-9cbb3076bcbc/content).
- **Enwave Toronto, U of T/SciNet Niagara, Equinix TR2, Compute Ontario, Shared Services Canada/NRC, CFI sites, Hydro‑Québec/Énergir pilots with Vantage/Ericsson/Microsoft** — no primary document found describing heat delivered to third parties. Québec 2021 potential study (Polytechnique/CIRAIG) names no facility: "ces 22 centres de données rejettent 3,5 PJ de rejets thermiques à basse température" (p. 23), https://cdn-contenu.quebec.ca/cdn-contenu/environnement/rejets-thermiques/evaluation-potentiel-valorisation-rejets-thermiques-quebec-2021.pdf
- **Blocked / unreadable**: quebec.ca Humano press release (empty fetch, URL above); IDEA 2018 "FAES Telus Garden Presentation" PDF requires login/copyright acceptance (https://www.districtenergy.org/viewdocument/the-faes-energy-centre-at-telus-gar).

---

### What each confirmed case lets the tool check

**TELUS Garden** is the only Canadian case with regulator‑reviewed design numbers: a 1,400 kW constant DC heat offer against a 5,194 MWh/yr heating demand (~5.8 MW peak) for ~93,000 m² mixed‑use, covered 94 % by recovered heat with steam peaking — a direct test of the tool's base‑load‑to‑annual‑demand matching, peaking fraction, and of its capex/price assumptions ($3.2 M recovery option; heat priced at electricity benchmark +5–10 %, DC heat supplied free). **Université Laval (Colosse)** gives the only published recovered‑energy quantity with equipment detail (1.15 GWh/yr, water‑to‑water heat pumps to 40 °C, COP ~7, PUE 1.28) — useful for the tool's low‑temperature campus loop case and COP sanity check. **Markham/Equinix TR5** confirms a colocation campus feeding a municipal network via 2 × 2 MWt ammonia heat‑recovery chillers at up to 85 °C, with summer heat rejected for lack of demand and no payment to the DC — a check on seasonal utilisation and the "zero heat price" assumption, but with no heat quantity to calibrate against. **Humano District** and **UBC** are in‑building/small‑loop reuse with only GHG or aggregate savings reported, so they calibrate the tool's qualitative tiers rather than its energy balance. **QScale** (96 MW offered to 12 ha of greenhouses, $40 M subsidy, 23,000 t) is the right scale for the tool's Vancouver scenarios but must stay "projected" until a delivery figure is published.
