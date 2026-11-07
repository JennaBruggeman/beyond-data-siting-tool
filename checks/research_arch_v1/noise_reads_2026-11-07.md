# Generator noise reads, 7 Nov 2026 (Cowork, for WORKLIST §3 noise flag)

Code: add to the repo as `checks/research_arch_v1/noise_reads_2026-11-07.md`, then register patches. "?" = not settled.

## 1. Rehlko KD2000 sound level — FOUND (maker claim)

Kohler/Rehlko document **G6-154 9/23r** (Aluminum Sound Enclosures and Subbase Fuel Tank), p. 11, sound data table, rows "KD2000/2250/2500 (KD62V12 Engine)" and "(KD62V12A Engine)":
- SL1 Sound Enclosure with Internal Silencers and State Code Subbase Fuel Tank: **90 dB(A)**
- SL2 Sound Enclosure with Internal Silencer and State Code Subbase Fuel Tank: **78 dB(A)**
- Column: "Sound Pressure Level at 60 Hz with Full Load". Note: "Log average sound pressure level of 8 measured positions around the perimeter of the unit at a distance of 7 m (23 ft.)." (refers to TIB-114)
- URL: https://resources.kohler.com/power/kohler/industrial/pdf/KD800-2500_G6154.pdf
- How read: through the web reader twice (same values both times); the PDF itself could not be downloaded here, so the page was not seen as an image. Label: **manufacturer claim**, one value for three ratings (2,000–2,500 kW).
- Not found: the KD2000 spec sheet G5-661 (site error); sound power level (Lw) for ISO 9613 use (?). The tool's `noise_level` screen uses Lw; a pressure at 7 m converts to Lw only with an assumption about the source (our arithmetic, flag it).

Rough reading (our arithmetic, free field, no screening, one set): Lp(r) ≈ 78 − 20·log10(r / 7). At 6.1 m ≈ 79 dB(A); at 20 m ≈ 69; at 50 m ≈ 61. Four sets at once add about 6 dB.

## 2. Vancouver Noise Control By-law 6555 — READ (local copy, consolidated to 14 July 2026)

- **Testing (s. 4.1(c)):** the zone limits (ss. 2.1–2.4) and 3.1(j) "do not apply to noise or sound made … as a consequence of the lawful testing of an emergency generator provided that it is not operated more than once a month during the daytime, and for a maximum of 60 minutes, plus once a year for a maximum of 180 minutes, and its continuous sound level does not exceed a rating of 80 dBA on an approved sound meter when measured at the point of reception or at least 6.1 m from its source, whichever is the greater."
- **Emergencies (s. 4.3(c)):** sound may exceed the by-law's levels where it "is made when performing works of an emergency nature for the preservation or protection of property, life or health, including sound made by any equipment or vehicles used for that purpose." Whether a data centre's generators running in a power cut count as this: **our reading, ?** (not stated for standby power).
- **Check for the tool (Vancouver):** testing level ≤ 80 dB(A) at the point of reception or 6.1 m, whichever is greater. One KD2000 SL2 at 6.1 m ≈ 79 dB(A) (passes, barely); several tested together would not (our arithmetic) → test one set at a time (drawing/operating assumption, flag). Outside testing and emergencies, the zone-pair limits already in the register (`noise_limit`, `bylaw6555`) apply.

## 3. Edmonton Community Standards Bylaw 14600 — READ (consolidated March 17, 2026; PDF supplied by J.B.)

- **No exemption for generators.** Part III's only exceptions (s. 24): "(a) the City, its agents or employees, from managing the accumulation of snow and ice …; or (b) situations where the City Manager has issued a permit allowing the production of certain sounds on whatever conditions the City Manager deems appropriate." Nothing for emergency or standby generators, power failures or testing.
- **Limits at the property line** (dB(A)):
  - Residential: 65 between 7 a.m. and 10 p.m. (s. 19(1)), but s. 19(3) allows up to 70 for ≤ 2 h, 75 for ≤ 1 h, 80 for ≤ 30 min, 85 for ≤ 15 min "in any one day"; 50 overnight (s. 20), no allowance.
  - Non-residential: 75 daytime (s. 21(1)); s. 21(3) allows 80 for ≤ 2 h, 85 for ≤ 1 h a day; 60 overnight (s. 22), no allowance.
- **Disturbance:** s. 14 prohibits noise that "disturbs the peace of another individual", and s. 14(3) applies "whether or not the decibel level … is measured; or … exceeds any limit".
- **Check for the tool (Edmonton):**
  - Testing in the daytime, ≤ 1 h: generator sound at the nearest residential property line ≤ 75 dB(A) (s. 19(3)(b)); at non-residential lines ≤ 85 dB(A) (s. 21(3)(b)). Our arithmetic from 78 dB(A) at 7 m: one KD2000 SL2 meets 75 at about 10 m.
  - Running in a power cut at night: 50 dB(A) at residential lines and 60 at non-residential lines, with no exemption in the bylaw. One set reaches 50 dB(A) only at about 175 m and 60 at about 55 m, free field (our arithmetic, no screening). So most Edmonton lots near homes would exceed it in an overnight outage: flag it, don't block (enforcement in an emergency, and a City Manager permit under s. 24(b), are ?).
- Bylaw 7255 (the old Noise Bylaw) is repealed by s. 55(d) of this bylaw.

## For Code

1. Register: KD2000 SL2 78 dB(A) at 7 m (G6-154, maker claim); Vancouver 6555 s. 4.1(c) testing rule and s. 4.3(c) (reading ?).
2. Replace "noise not checked (?)" on Vancouver lots with: generator test at 6.1 m or the nearest point of reception ≤ 80 dB(A), one set at a time (our arithmetic from 78 dB(A) at 7 m, free field); flag if the nearest reception point is closer than 6.1 m.
3. Edmonton: generator test ≤ 75 dB(A) at the nearest residential property line (≤ 85 at non-residential), daytime, ≤ 1 h; and an overnight-outage flag where one set exceeds 50 dB(A) at a residential line or 60 at a non-residential line (C14600 ss. 19–22, 24; no generator exemption).
4. Normal-operation plant noise (chillers) is unchanged: the existing `noise_level` screen.
