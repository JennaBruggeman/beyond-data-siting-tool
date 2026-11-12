# Golden results: notes

Each re-baseline is recorded here: when, what changed, why, and who approved it.

## 12 Nov 2026 (J.B. approved): tool at d9de0f3
- **All eight lots: generator fuel per set about 0.4 % higher** (V339 6,114.75 → 6,138 L a set; E05, E123, HAST shown fuel rounds up 100 L; HAST total 2,445.9 → 2,455.2 L). Fuel rate 0.263 → 0.264 L/kWh from Rehlko KD2000 G5-626 (3fdee99, J.B. 11 Nov 2026).
- **All eight lots: new field genPerRow** (generator sets per row across the lot; 1b6bd7b, J.B. 11 Nov 2026). Saved only; no size changes.
- **No other change.** The hall density by cooling type, the hub's floor cap and the pushBack speed fix leave every golden lot as it was (all eight are air-cooled; the hub is not in golden). Noise counts checked against the old golden; E06B re-run until its count matched (158).

## 11 Nov 2026 (J.B. approved): tool at cd33647
- **V09 (275 1st Ave E): 6.3 → 6.2 MW.** UPS batteries now carry the load 10–15 min (FM 5-32 3.5.2.1; F11 B4, J.B. 11 Nov 2026), so the battery space per MW rose from 1.0–1.8 to 2.1–3.8 m² (equipment only). More plant space lowers the largest size that fits. The rest of V09's differences follow from it: the loading floor (4,830 → 4,753 m²), heat to reject (9.765 → 9.61 MW), the generator load text and the sub-base tank (6,164 → 6,066 L).
- **Seven lots (CLARK, E05, E06A, E06B, E123, V09, V339): text only.** The generator-test note now reads "Kohler enclosure sheet G6-154 for KD2000, Sound Level 2, 78 dB(A) at 7 m" (F11 B5, J.B. 11 Nov 2026); the figures are unchanged.
- **No other change.** Every lot's noise counts were checked against the old golden before copying (KB-1: a run that drops a lot is not used; E06B was re-run until its count matched, 158).
- **Not in golden:** F10 (Materials and embodied carbon), F11 A (water behind the electricity, the floor-space range), the load-factor text and the per-home heat figure change cards, not the saved set-up results.
