# Noise mitigation the tool could model (research, 2 Nov 2026)

Brief: BRIEF_noise_mitigation.md. Sources in noise_mitigation_sources.json (new ids `arch_nz_*`). Existing register ids are reused where they already hold the fact. "Our arithmetic" = Claude's own sums, not a source figure.

Kinds: rule · government guide · government-commissioned study (a consultant's report to a government) · standards-body paper · filed study (a consultant's report for a proponent, hosted by a government) · maker claim.

## 1. Barrier (screen) attenuation

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Fresnel number | "N0 = ±2(δ0/λ)"; δ = path difference over the barrier top. No equation for attenuation, only a chart (Fig. 11, 550 Hz) | arch_nz_fhwaNBDH | s. 3.4 | government guide (US) | 90 |
| Barrier that just breaks line of sight | "a 5-dB(A) IL can be expected" | arch_nz_fhwaNBDH | s. 3.5.1 | government guide (US; highway line source) | 85 |
| Each extra metre above line of sight | "about 1.5 dB(A)" | arch_nz_fhwaNBDH | s. 3.5.1 | government guide (US; highway line source) | 80 |
| Maximum | "20 dB(A) for thin walls and 23 dB(A) for berms" | arch_nz_fhwaNBDH | s. 3.4.2 | government guide (US) | 90 |
| Barrier mass | "20 kg/m2 ... transmission loss of at least 20 dB(A)" | arch_nz_fhwaNBDH | s. 3.4.2 | government guide (US) | 90 |
| Upper limit (EU law, method based on ISO 9613-2; benchmark outside Canada) | Δdif bounded at 0 below and "25 dB for a diffraction on a horizontal edge" | arch_nz_cnossosDiff | Dir. 2015/996 Annex, 2.5.6 "Pure diffraction" | rule (EU) | 85 |
| CNOSSOS diffraction equation 2.5.21 itself | ? (printed as an image on legislation.gov.uk; not read as text) | arch_nz_cnossosDiff | Annex 2.5.6 | rule (EU) | — |
| Simple credit for a data-centre barrier | "Acoustic Barrier – 8 dB reduction", if solid, "within 20 m of the source", "at least 4 m from the FFL of the source and breaks line of sight to the nearest receiver"; if it does not surround the source, at least 2 m beyond its length | arch_nz_nswDcNoise | s. 4.3, p. 16 | government-commissioned study (NSW DPIE, 2021; a proposal, not a code) | 80 |
| Typical barrier result | "5 to 10 dB(A)" | arch_nz_hkEpdEM | s. 7.6 | government guide (Hong Kong) | 70 |
| Rooftop barrier mass | minimum 20 kg/m²; "no lower than 10 kg/m2 for: • rooftop barriers" (with technical justification) | arch_nz_ottawaENCG | Intro & Glossary p. 4 | government guide (municipal, ON) | 90 |
| Barrier length; mass | length "not less than five times its height"; at least 10 kg/m² | arch_nz_hkEpdEM | s. 7.6 | government guide (HK) | 70 |
| Barriers last | Ottawa: noise is "addressed at its source"; "Acoustic barriers should only be used when other noise control measures have been considered" (Intro p. 1) | arch_nz_ottawaENCG | Part 1 s. 3.3, p. 11; Intro | government guide | 85 |
| Rooftop screen vs airflow | a 12 ft (3.7 m) solid wall 6 ft (1.8 m) from a chiller: capacity −4.5%+, power +6%+ | arch_yorkClear (existing) | — | maker claim | 70 |
| Vancouver case: rooftop barrier | absorptive, ≥1 m above the tallest unit (3.27 m), ≥10 kg/m², no gaps; night levels R1 57→54, R2 51→49, R3/R4 45→38 dBA (−2 to −7, our arithmetic from Tables 4 and 6) | arch_nz_bklTelusRegent | pp. 7, 11 | filed study (FOI release, City of Vancouver) | 80 |

**Modelling options:** (a) NSW flat −8 dB when the screen meets the NSW geometry; (b) FHWA rule: −5 dB at line-of-sight break +1.5 dB per metre above it, max 20. FHWA figures are for highway line sources. Applying them to a point source on a roof is our extension (?).

## 2. Enclosures, plant rooms, louvres, silencers

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Enclosed plant room / plant inside the building | "25 dB reduction": solid walls, "Roof sheeting is to be RW 47 at a minimum", gaps sealed | arch_nz_nswDcNoise | s. 4.3, p. 16 | government-commissioned study | 80 |
| Plant-room louvre minimum insertion loss, 63–8k Hz | 6, 12, 16, 22, 27, 27, 24, 23 dB | arch_nz_nswDcNoise | Table 4-5, p. 16 | government-commissioned study | 80 |
| When a complete enclosure is needed | airborne reduction of "more than 20 dB(A)"; 50 mm absorptive lining; silenced vents | arch_nz_hkEpdEM | s. 7.4 | government guide (HK) | 70 |
| Acoustic louvre rating | rated by transmission loss in each frequency band; a "very short silencer", only where the required reduction is low; no dB values in the text | arch_nz_hkEpdEM | s. 7.11 | government guide | 60 |
| Chiller silencer stack (Vancouver case) | minimum IL 63–4k Hz: 1, 2, 2, 5, 7, 7, 8 dB; with the barrier, R1 48 dBA (from 57) | arch_nz_bklTelusRegent | p. 12, Tables 7–8 | filed study | 75 |
| Generator enclosure (Vancouver case) | design intent 65 dBA @ 7 m | arch_nz_bklTelusRegent | pp. 6–7 | filed study | 70 |
| Cooling-tower inlet/discharge attenuators | "5dBA or more" | arch_nz_spxAEJB21A | p. 5 ? ("Attenuation Baffles") | maker claim | 60 |
| Generator sets in enclosures | Cummins QuietSite figures already in the register | sources/08 (existing) | — | maker claim | — |

## 3. Low-noise variants

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Trane RTAF 090–280 (333–1,010 kW; excl. size 245) | Lw 94–101 standard / 91–98 low noise (−3 dB at the range ends, our arithmetic) | traneRTAF (existing) | p. 13 | maker claim | 80 |
| Climaveneta i-FX ≈480–930 kW | Lw 99–103 standard; low-noise version 92–97 (register does not tie 92–97 to this size range ?) | climavenetaIFX (existing) | — | maker claim | 75 |
| Daikin EWAD-TZ XS (179.6–682.3 kW) | Lw 96–101 dB(A) (e.g. 682.3 kW → 101) at ISO 9614 / Eurovent 8/1 standard conditions; not re-verified in Check 2 (table script-rendered) ?; reduced-noise variant values ? | arch_nz_daikinEWADTZXS | spec table | maker claim | 40 |
| Recommended chiller limit (Olds AB NIA) | chillers "≤85 dBA PWL per unit" (from 110 "initially assumed", p. 17; Appendix D reads 111 ?) | arch_nz_oldsNIAmit | Table 5, p. 26 | filed study | 75 |
| Burlington ON data centre | 12 rooftop chillers, Lw 92 dBA each; "no mitigation measures are required" | burlingtonNIA (existing) | s. 6.5.5, 6.5.8 | filed study | 75 |
| Trane AMC 30 t module with "Low Noise Fans and Compressor Wraps" | 70 dBA sound pressure "at 3 ft"; not Lw | arch_nz_bklTelusRegent | Table 3, p. 6 | filed study (maker data) | 70 |
| Low-noise dry coolers with capacity | ? (not found on a maker-hosted sheet) | — | — | — | — |

## 4. Night fan-speed reduction

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Fan law (AMCA 301 as stated) | AMCA 301 form Lw2 = Lw1 + 40 log(N2/N1) + 70 log(D2/D1) + bandwidth term, simplified to + 50 log(N2/N1) + 70 log(D2/D1); valid range 0.6–1.6 × base test speed (≈ −11 to +10 dB, our arithmetic); needs geometric similarity | arch_nz_amcaMathson | pp. 3–4, 9 (Annex A.2) | standards-body conference paper (AMCA; Greenheck author) | 75 |
| Cooling towers on VFD | "no greater than 50log10(new speed/old speed)"; half speed "up to 15dBA"; floor = fans-off level | arch_nz_spxAEJB21A | p. 5 ? ("Fans and Their Effect on Sound") | maker claim | 70 |
| Our arithmetic, 50 log | 0.9 → −2.3; 0.8 → −4.8; 0.7 → −7.7; 0.6 → −11.1 dB (0.5 → −15.1 is outside AMCA's 0.6 floor) | — | — | our arithmetic | — |
| Data-centre night modes | NSW wants Lw for each operating mode (high/medium/low); no rule of thumb | arch_nz_nswDcNoise | s. 4.3, p. 15 | government-commissioned study | 75 |
| EC-fan night limiting | "reduce noise output, e.g., at night time, by limiting fan rotation speed"; no dB for EC fans | arch_nz_kaltraDC | web page 2021 | maker claim | 50 |

Caveat: reduced speed also reduces heat rejection, so this credit is only valid when night load or ambient allows (?).

## 5. Distance and summing (Lp = Lw − 20 log r − 8)

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Free-field point source | "Adiv = 20 × lg(d) + 11" | arch_nz_cnossosDiv | Annex 2.5.6, eq. 2.5.12 | rule (EU) | 90 |
| Plant level conversion | "Lw = Lp + 20 log(R) + 8"; the text gives no hemispherical basis | arch_nz_nswDcNoise | s. 4.3, p. 15 | government-commissioned study | 80 |
| −8 vs −11 | −8 = −11 + 3 dB for a hemisphere (unit on a hard roof or ground). This reasoning is ours; no government text states it (?) | — | — | our arithmetic | 60 |
| 6 dB per doubling | point source; "6 dB(A) per doubling of distance" | arch_nz_fhwaNBDH | s. 3.3.1 | government guide | 90 |
| Adding units | energy addition; two identical 60 dB events "produce an SPL of 63 dB". For n equal units this is 10 log n (6 → +7.8, 12 → +10.8, our arithmetic) | arch_nz_fhwaNBDH | s. 3.1, Table 1 | government guide | 85 |
| Site total | plant Lw "summed logarithmically" | arch_nz_nswDcNoise | s. 4.1, p. 11 | government-commissioned study | 80 |
| ISO 9613-2 accuracy | ±3 dB (0–100 m, 0–5 m height, downwind) | arch_nz_piercyISO | Table 1, pp. 123–124 | journal item, review status not shown (Canadian Acoustics, NRC author) | 60 |

## 6. How the by-laws treat mitigation

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| Vancouver: only the received level counts | ss. 2.1–2.3 limits apply "when received at a point of reception". No equipment standard and no credit or ban for screens | src_fill_van6555s21, bylaw6555 | ss. 1.2, 2.1–2.3 (saved copy 6555.txt) | rule | 90 |
| Vancouver: acoustic report | only for construction or special-event exceptions: may require "a report from a registered professional acoustical engineer" | arch_nz_van6555s44 | s. 4.4(a) | rule | 90 |
| Vancouver: practice at permit stage | field-review permits note that mechanical equipment must meet By-law 6555, with AC units ≤55 dB day / 45 dB night | vanPermits (existing; sources/11) | — | government record | 75 |
| Edmonton: only the received level counts | ss. 19–22 "as measured at the property line"; no equipment or mitigation clause | bylaw14600, arch_adj_edm14600 | ss. 19–22, pp. 14–15 | rule | 90 |
| Edmonton: nuisance applies regardless of dB | s. 14(3): guilty "whether or not the decibel level ... is measured; or ... exceeds any limit"; s. 15 criteria | arch_nz_edm14600s14 | ss. 14–15, p. 12 | rule | 90 |
| Edmonton: exception | s. 24(b) a City Manager permit "on whatever conditions the City Manager deems appropriate" | arch_nz_edm14600s14 | s. 24, p. 15 | rule | 85 |
| Edmonton: acoustic report | ? (none in Bylaw 14600; Zoning Bylaw 20001 not checked here) | — | — | — | — |

**Reading:** neither by-law limits how the level is achieved. A modelled reduction is legal if the received level meets the limit. The bylaws do not require or accept a calculation; they are enforced by measurement.

## 7. Case evidence

| what | value | source id | where | kind | conf. |
|---|---|---|---|---|---|
| TELUS Regent CO, 2212 W 10th Ave, Vancouver (C-7, intermediate) | Cadna/A model. Design target 50 dBA night vs a 65 by-law limit. 6 of 7 chiller modules running; rooftop barrier plus silencer stacks; generator penthouse for night testing; daytime testing advised | arch_nz_bklTelusRegent | pp. 3–13 | filed study (BKL, 21 Aug 2025; City FOI 2026-098) | 80 |
| Synapse, Olds AB (AUC Rule 012, not Bylaw 14600) | ≤85 dBA chillers + ≤80 transformers + ≤85 silenced inlets + 7.5 m barrier (α 0.84) → −23.6 to −26.1 dBA; R01 facility 72.4 → 47.3 (−25.1); cumulative with ambient 48.0 → 50.7 vs PSL 53. Each measure's share is not stated | arch_nz_oldsNIAmit | Tables 5–6, pp. 26–27 | filed study (proponent; AUC outcome ?, not in this source) | 75 |
| Burlington ON data centre | met NPC-300 with no mitigation (Lw 92 chillers); limit = greater of Class 1 exclusion limit (50 day/evening, 45 night) or measured background (s. 3.3.1) | burlingtonNIA | s. 6.5 | filed study | 70 |
| Edmonton data-centre acoustic report | ? not found | — | — | — | — |

## Our arithmetic, for the tool (Lp = Lw − 20 log r − 8 − reduction)

Lw 102.8 dBA (one unit), smallest distance that meets the limit:

| reduction | 65 dBA | 60 dBA |
|---|---|---|
| 0 | 30.9 m | 55.0 m |
| 5 (FHWA line-of-sight break) | 17.4 m | 30.9 m |
| 8 (NSW barrier) | 12.3 m | 21.9 m |
| 25 (NSW plant room) | 1.7 m | 3.1 m (tool floor 5 m) |

## Gaps and paywalled

- ISO 9613-2:1996/2024, AMCA 301, ASHRAE Handbook, ISO 3744: paywalled. No government text giving the ISO Dz equation was read (WA EPA copy: fetch error; RIVM 2019-0023: blocked by robots; JRC CNOSSOS 2011 draft: text cut off before ch. VI).
- CNOSSOS eq. 2.5.21: printed as an image; EUR-Lex HTML not reachable from here.
- Ontario NPC-300 itself: not found on ontario.ca (copies only on Scribd or law firms, not used). Rooftop-screen limits come from Ottawa's text only.
- Health Canada noise guidance (2023): publications.gc.ca refused by the proxy.
- UFC 3-450-01 / TM 5-805-4 (barrier tables, fan laws): only the cancelled 1995 TM was read, and only in part; no values.
- Hong Kong EPD tables 9, 10, 15: printed as images; English PDF fetch error.
- Low-noise variants of Daikin and other dry coolers: maker pages are JS-rendered.
- Olds NIA: insertion loss per measure is not stated.
- Edmonton and Vancouver data-centre acoustic reports beyond TELUS Regent: ?

Check 2 applied (2 Nov 2026)
Check 3 applied (2 Nov 2026)
