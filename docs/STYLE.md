# Beyond Data: visual system (STYLE.md)

Status: **draft for J.B.'s approval** (task A2, 7 Nov 2026). Written from the style study boards S1–S3 (`docs/style/S1_system.png`, `S2_numbers.png`, `S3_exits.png`) and their source `style.py`. Code works from this file only.

## Weaknesses and gaps, first
- Colour-blind separation of the three program hues was checked once, on 7 Nov, with the dataviz skill's validator (reported: all pairs pass, CVD score 9.6, normal 16.2). **Not re-run for this document.** The pass/fail table is not kept; re-run before the palette is called final.
- Contrast figures below are our WCAG 2.x arithmetic (relative luminance), not an external tool.
- Two text colours fall under WCAG AA 4.5:1 for small text: red `#CC746C` (3.34:1) and faint `#A9ABAF` (2.30:1). Red at 11.5–13 px is used for verdicts and failing values; faint for card numbers and inactive nav. See "Open questions".
- The chart neutral `#C9CACC` (1.64:1) and the support tint `#A9C0DA` (1.87:1) are below 3:1 on white. They work as segments next to darker ones (2 px gaps), never on their own.
- Only Architecture cards 12 and 16 were redrawn in this system. Maps, sections, 3-D views, the report pages and the landing page have not been tried in it.
- Dark mode, print and screens narrower than 1440 px: not designed.

## 1. Colour

### Neutrals
| Token | Hex | Use | On white |
|---|---|---|---|
| INK | `#16181B` | text, walls, outlines, meter bars that pass, primary button | 17.8:1 |
| INK2 | `#4A4D52` | secondary text, chart value labels, lead paragraph | 8.5:1 |
| MUTE | `#7B7E83` | notes, sources, axis labels, small captions | 4.1:1 |
| FAINT | `#A9ABAF` | card number, inactive nav, stair treads, lift cross, street line | 2.3:1 |
| RULE | `#DDDEDF` | dividers above the hero numbers, chip border, tab borders | — |
| HAIR | `#ECECEC` | hairlines: header, panel edge, meter tracks, axis gridlines, row dividers | — |
| BG | `#FFFFFF` | page, drawing background, corridors, stairs | — |
| PANEL | `#FAFAFA` | right-hand panel | — |
| PLANT | `#E6E4E0` | plant yard fill in plans | — |

### Program hues (charts, keys, 3-D)
| Token | Hex | Program | On white |
|---|---|---|---|
| DC | `#3268A6` | data centre (data hall) | 5.7:1 |
| PUB | `#B0802A` | public programs (refuge, shelter, pool, food hub…) | 3.5:1 |
| CLIN | `#22927A` | clinic, health | 3.9:1 |
| DC-SUP | `#A9C0DA` | data-centre support and dock (DC at 42 % tint) | 1.9:1 |
| NEUT | `#C9CACC` | corridors, stairs, lifts in charts | 1.6:1 |

Hues are made with `tint(hue, t) = 255 − (255 − c) × t` per channel.

### Plan fills (light tints of the same hues)
| Token | Hex | Tint | Use |
|---|---|---|---|
| FILL-HALL | `#B9CCE1` | DC × 0.34 | data hall |
| FILL-SUP | `#E2EAF3` | DC × 0.14 | data-centre support, dock |
| FILL-PUB | `#E7D9BF` | PUB × 0.30 | public programs |
| FILL-CLIN | `#C1E0DA` | CLIN × 0.28 | clinic |
| circulation | `#FFFFFF` | — | corridors, stairs, lifts |
| plant | `#E6E4E0` | — | plant yard |

### Findings
RED `#CC746C` (3.3:1). Exception: in the logic view ("How it works") it is the highlight colour for lit parts and wires (J.B., 7 Nov). Everywhere else: only for a value that fails, a gap or clash in a drawing, a "?" that needs an answer, and the "n to fix" count. Never a program, never emphasis, never draft wording.

### Rules
1. A key whenever two or more colours appear.
2. Labels in INK or INK2, never in the series colour.
3. Plan fills stay light; the full hues carry charts and keys.
4. One hue per program family across every template; the same program is the same colour on every card.

## 2. Type

IBM Plex Sans (Google Fonts, weights 300, 400, 500). `font-variant-numeric: tabular-nums` on the whole page.

| Role | Size | Weight | Colour |
|---|---|---|---|
| Card title | 28 px | 300 | INK |
| Hero number | 30 px (40 px on S1) | 300 | INK; unit 14 px MUTE after it; RED if it fails |
| Section heading in a drawing | 15 px | 400 | INK |
| Body, labels, panel rows, nav | 13 px | 400 | INK / INK2 |
| Lead paragraph under the title | 14 px, line-height 1.55 | 400 | INK2 |
| Notes, sources, meter captions, axis | 11.5–12 px | 400 | MUTE |
| App name | 14 px | 500 | INK |
| Block name in a plan | 13.5 px | 500 | INK |

Four sizes for content: 28 / 15 / 13 / 11.5. Everything else above is a fixed part of the shell, not a fifth size.

## 3. Lines (every drawing)
| Weight | Use |
|---|---|
| 1.8 px | building or block outline, cut line in section |
| 0.8 px | room walls |
| 0.5 px | stair treads, context, thin connectors |
| 1.5 px dashed `5 3` | longest walk to an exit, arrow head 8 px |
| 1.2 px | meter limit tick |
| 2.0 / 1.6 px RED | gap dimension / failing exit-separation line |
| 3.4 px white | door openings (drawn over the wall) |

Scale bar: 5 m solid INK + 5 m white outlined, 4 px high, "0" and "10 m" labels at 11 px MUTE. Street: FAINT dashed `6 4`.

## 4. Card shell (1440 × 900)
- Header 60 px: app name, template name (MUTE), nav of the five chapters (13 px; current INK with a 1.5 px underline, past INK2, future FAINT), address and zone right-aligned (INK2). Bottom hairline.
- Main: `flex 1 1 1040px`, padding 22 / 40 / 16 px. Status chip row, then the drawing centred, then a collapsed "Sources and assumptions" (12 px MUTE, max-width 880 px).
- Panel: 400 px, PANEL fill, hairline on its left, padding 30 / 36 / 26 px, gap 22 px. Order: chapter label (12 MUTE) → title → lead → hero grid → meters or rows → spacer → Back / Next → card number (12 FAINT, right).
- Status chip: 12 px INK2, 1 px RULE border, radius 999, padding 3 / 10. Beside it, if anything fails: 7 px RED dot + "n to fix" in RED.
- Hero grid: 2 columns, gap 18 / 20 px, 1 px RULE rule above.
- Primary button: INK fill, white 13.5 px text, padding 13 / 22, radius 2. "Back" is plain 13 px INK2 text.
- Tabs (storeys): 12.5 px pills, 1 px RULE border, radius 999, padding 6 / 12; selected = INK fill, white text.

## 5. Chart kit
Pick the form by the job. No 3-D, no dual axes, no pie, no gradients.

**Meter: one value against a limit.** Track 4 px HAIR, radius 2, width 328 px in the panel (250 px in a drawing). Bar = value, INK if it passes, RED if not. Tick = the limit, 1.2 px INK, 14 px tall. Row: label 13 px left, verdict "pass" / "to fix" right (same colour as the bar); under the track, 11.5 px MUTE "value unit · limit x unit" (or "needed x unit" for minimums) and the source clause right-aligned. One scale per meter, set so the limit sits at about 85–90 % of the track. Rows separated by hairlines.

**Donut: one whole, up to five parts.** Outer radius 112, inner 78 (panel version 56 / 38). Parts in program colours, 1.2° gaps, starting at 12 o'clock. Centre: the headline share (30 px light) with a 12 px MUTE label. Key to the right: 12 px swatch (radius 2), name 12.5 INK, value "m² · %" 12.5 INK2 right-aligned. Hover title on each part: "name: value (share)".

**Stacked bars: compare parts across storeys (or options).** Horizontal, one row per storey (34 px pitch, bar 16 px, radius 2), top storey first, **one scale for every row**. Segments in program colours with 2 px gaps. Row label left (12 INK2), total right of the bar (12 INK). Gridlines every 200 m² in HAIR with 11 px MUTE axis numbers.

**Not in the kit yet** (needed later, to be designed when a card needs them): line chart over time (heat, electricity), small multiples of plans, map keys.

## 6. Drawing rules (J.B.'s standards)
1. Leader lines are right-angled, never diagonal; notes and findings sit off the drawing (left and right columns, or above / below). Exception: block and room names go inside their block when they fit (rule 7).
2. A leader points at one specific thing. A category (colour, hatch) never gets a leader: it goes in the key.
3. Block names sit just above their block, outside the outline.
4. If a leader's first leg would cross a block, lift the anchor above the blocks first with a 0.6 px connector.
5. Every figure on a card is sourced (clause, file, "our arithmetic") in "Sources and assumptions", or shown as "?" in RED with a note saying what is missing.
6. Say when a drawing is from a draft plan (status chip, e.g. "Draft plan · rule sheet v0").
7. **Massing and program diagrams** (separations, program blocks): flat tint fills, **no outline** around a block (an outline reads as a wall). Each block named inside it in 13.5 px INK; when a block or room is too small to hold its name, the name goes off the drawing with a right-angled leader (J.B., 7 Nov). Only the thing the card is about gets a line (e.g. the 2 h separation, drawn along the shared edge). Rooms and walls appear only on cards that are about rooms.
8. Leaders never cross a block to reach a label (J.B., 7 Nov, card 15). Exception on maps: a leader may cross background buildings, never the lot or another labelled item (J.B., 7 Nov, gate 3).
9. **No jogs** (J.B., 7 Nov, card 10). A leader to a side label is one straight horizontal line: the label sits at the anchor's height. If labels would collide, move the anchor along its object, not the line. One 90° turn only for labels above or below the drawing. Never a staircase.
10. **At most four leaders per drawing** (J.B., 7 Nov). Programs and other categories go in the key, never on leaders. Leaders are for one specific thing, mostly findings. Anything that can't take a straight leader goes in the panel list instead.
11. Automatic check before any board is shown: zero jogs, zero leaders crossing a block, four leaders or fewer. A board that fails is not published.

## 7. Text rules
Canadian spelling. Short lines, no chunky paragraphs. No decorative labels, no "1, 2, 3" numbering on cards. Plain, professional; nothing that reads as generated.

## 8. CSS tokens (for Code)
```css
:root{
  --ink:#16181B; --ink2:#4A4D52; --mute:#7B7E83; --faint:#A9ABAF;
  --rule:#DDDEDF; --hair:#ECECEC; --bg:#FFFFFF; --panel:#FAFAFA; --plant:#E6E4E0;
  --dc:#3268A6; --dc-sup:#A9C0DA; --pub:#B0802A; --clin:#22927A; --neut:#C9CACC; --red:#CC746C;
  --fill-hall:#B9CCE1; --fill-sup:#E2EAF3; --fill-pub:#E7D9BF; --fill-clin:#C1E0DA;
  --font:'IBM Plex Sans',system-ui,sans-serif;
  --t-title:28px; --t-section:15px; --t-body:13px; --t-note:11.5px;
  --w-outline:1.8; --w-wall:0.8; --w-thin:0.5;
}
```

## 9. Open questions for J.B.
1. Red text at 11.5–13 px is 3.3:1 on white. Keep (it is always paired with the word "to fix" or a "?"), or darken the red for text only (e.g. `#B85E56`, 4.5:1) and keep `#CC746C` for marks?
2. FAINT `#A9ABAF` for card numbers and future nav steps is 2.3:1. Fine as de-emphasis, or move to MUTE?
3. Hero number: 30 px on cards, 40 px on S1. Pick one.
4. Hue for a fourth program family (pool / aquaponics / conservatory are all "public" for now). One hue for all public programs, or one per typology? One keeps the palette small and colour-blind safe.
