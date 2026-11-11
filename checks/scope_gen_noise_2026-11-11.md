# Scope: generator noise in place of the 21.7 m yard cap, 11 Nov 2026 (no change made)

Probe: checks/tests/gen_noise_probe.js (339 1st Ave E, golden answers, read-only; "nocap" lifts the cap in the test browser only).

## Weaknesses first
- **Lifting the cap gains nothing on 339.** With the 21.7 m cap lifted (probe only), the size search still stops at **2.5 MW**. At 2.6 MW the **floor test** binds: "the hall, UPS and battery rooms need about 1,656 m² on the 2 storeys that may hold them; the building gives 1,343 m²". The cap and the floor test both stop it at 2.6 MW.
- **The floor test and the rack layout disagree.** The floor test says 2.6 MW doesn't fit on 1,343 m² (m² per MW for the hall, UPS and batteries). The rack layout on the same floors places 500 racks, 3.6–4.0 MW. One of them is wrong for 339. Worth a look before either is relied on.
- **No sound power is published for the KD2000.** The only figure is a sound pressure level at 7 m. Deriving sound power from it assumes 7 m is far enough to treat the set as a point source. The set is 13.5 m long, so it isn't (?).
- **Hub sizing-to-load rule:** not received yet. If it changes the number of sets, the power-cut figures below change by 10 log n.

## Source held for the KD2000 with its enclosure
- Kohler/Rehlko G6-154 (9/23r), p. 11 (register kohlerG6154sound; manufacturer claim):
  - Sound Level 2 enclosure: **78 dB(A)**, "Sound Pressure Level at 60 Hz with Full Load";
  - "Log average sound pressure level of 8 measured positions around the perimeter of the unit at a distance of 7 m (23 ft.)";
  - one value covers the KD2000–2500. **No sound power level.**
- Sound power for the screening formula, reversed: Lw = 78 + 20 log 7 + 8 = **102.9 dB(A) per set** (our arithmetic, ?).
- Not held: octave bands, exhaust noise separately, sound at part load.

## What the tool already checks (site.js genNoise)
- **Monthly test, one set at a time**, at the nearest lot line:
  - Vancouver: By-law 6555 s. 4.1(c), 80 dB(A) at the point of reception or 6.1 m.
  - Edmonton: C14600 s. 19(3), 21(3), 75 / 85 dB(A) daytime for 1 h.
  - It runs on every lot already, as a note (Vancouver) or a placement rule (Edmonton test distances).
- **Power cut, all running sets:** not checked.
  - Vancouver: s. 4.3(c) "works of an emergency nature" is our reading that it's exempt (?).
  - Edmonton: no exemption. Overnight 50 / 60 dB(A) is only flagged (s. 24).

## 339 at sizes above the cap (Vancouver, sets of 2 MW)
| Size | Yard depth | Sets needed / installed | One-set test at nearest lot line (9.1 m) | All running sets at that line (power cut) | All running sets at 375 1st Ave E (22.3 m, plant check's worst receiver, limit 55) |
|---|---|---|---|---|---|
| 2.5 MW | within cap | 2 / 3 | 75.7 dB(A), **within 80** | 78.7 | 70.6 |
| 2.6–3.5 MW | 23 m | 3 / 4 | 75.7, within | 80.5 | 72.4 |
| 4.0 MW | 28 m | 4 / 5 | 75.7, within | 81.7 | 73.6 |

(Our arithmetic: Lp = 102.9 + 10 log n − 20 log r − 8, all sets taken at the nearest set's distance, no screening.)

- **Monthly test, one set:** passes at every size. The nearest set stays 9.1 m from the lot line, so a deeper yard doesn't move it.
- **Annual 180-minute test:** if the sets are tested together, 3 sets come to 80.5 dB(A), just over 80. Whether the annual test is one set or all is not stated (?).
- **Power cut:** 70–74 dB(A) at the neighbour against a 55 quiet-zone limit, but in Vancouver that's exempt as emergency works (our reading, ?). In Edmonton the same arithmetic would be flagged overnight.

## Estimate
- **Can the noise check replace the cap?** Yes, technically. The one-set test check and the screening formula already exist. A power-cut row with all running sets at the receivers the plant check already tests is about a half-day build.
- But the cap exists because generator noise at the lot lines "is not modelled". The test check now does model it, at screening level. So replacing the cap means accepting:
  - a sound power derived from 7 m data (?);
  - the Vancouver emergency exemption as our reading (?);
  - one set at a time for tests.
- **On 339 it changes nothing:** the floor test stops it at 2.5 MW anyway.
- On other lots it could raise the size where the yard is the only limit.
- **Before building:** the hub's sizing-to-load rule (number of sets), and your call on the floor test vs the rack layout.
