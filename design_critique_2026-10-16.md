# Design critique: Beyond Data (v19, 16 Oct 2026)

Run with the Design plugin's design-critique framework.

**Views reviewed:** start map; What fits (Vancouver example); Heat (Edmonton example); Opportunities (Edmonton example).

**Screens:** 1500 × 900 headless captures of the published build.

**Audience:** thesis reviewers and city staff.

**Goal:** someone understands what a lot could exchange with its neighbourhood, as trade-offs, with no verdicts.

**Stage:** refinement.

## Overall impression

The tool has a coherent, quiet look, and it tells the truth about uncertainty. Its biggest problem is order. Each view opens with method and context (comparison tables, assumptions, legends) before the answer. The answer for the site sits below the fold, and the most prominent text on most screens is draft wording rather than findings.

## Usability

| Finding | Severity | Recommendation |
|---|---|---|
| **Heat opens with seven rows of "none to reuse".** With the default cooling (air), the Compared-with table fills the first screen with the same answer seven times. The receivers, the price note and Blatchford are all below the fold. | 🔴 Critical | Put the site's own answer first: one sentence and two or three figures. Fold the comparison into a closed section under it ("Compared with 6 references ›"). When every row has the same value, show it once: "No reference reuses heat with air cooling." |
| **Ten tabs in two rows, in no evident order.** Precedents, Heat, Energy, Water, Materials, People / Opportunities, Options, Over time, Two cities. The wrap splits related views, and a reader can't tell where to start. | 🔴 Critical | Group them into three groups: **What it exchanges** (Heat, Energy, Water, Materials, People); **What it could become** (Opportunities, Options, Over time); **Context** (Precedents, Two cities). Or use a numbered sequence with a "Start here". |
| **The default size makes Edmonton look strange.** The Edmonton example opens at a provisional 20 MW. Twelve of 17 generators don't fit, and 28 coolers cover the roof. The first thing a reviewer reads is an overflow warning. | 🟡 Moderate | Open the worked examples at the size you want to discuss (for example 1 MW), and show provisional sizes as provisional in the header ("20 MW, provisional · change"). |
| **Two colour systems share the same colours on Opportunities.** The legend chips (possible here / with a change / not here / not yet known) and the row pills (built here / built elsewhere / pilot) both use green, yellow and red for different meanings. The gate words (physics · land · rules…) carry state by colour alone. | 🟡 Moderate | Give the evidence pills a neutral outline style and keep colour for gate states only. Add a symbol or weight to gate states (✓ / ~ / ✕ / ?) so the colour isn't the only signal. |
| **The cooling bar wraps.** "Change ›" breaks across lines and "Seen or hidden ›" drops to its own line. It reads as a broken control. | 🟢 Minor | Shorten it to "Cooling: air inside, dry coolers on roof (assumed) · Change · Seen or hidden", or let it stack cleanly as two lines. |
| **3D labels overlap at larger sizes.** "data centre 30.0 m, 5 storeys" sits under the cooler label on the Edmonton lot. | 🟢 Minor | Offset labels by priority, or show only the building label until hover. |

## Visual hierarchy

- **What draws the eye first:** the accent-red draft paragraphs and the red-orange selected tab. Red marks wording for J.B. to accept (your rule), but to a reviewer it reads as the most important text on the screen. That isn't correct for review.
- **Reading flow:** title → draft explanation → legend chips → comparison table or list → the site's answer (often below the fold). The answer should come second, right after the title.
- **Emphasis:** findings that change the argument are plain grey sub-text. Examples: "At Alberta prices no route pays back at any distance" and "122 beyond break-even". Meanwhile method notes and source lines are long and equally present. Findings need a stronger level than method.

## Consistency

| Element | Issue | Recommendation |
|---|---|---|
| Status vocabularies | Gate states, evidence readiness, break-even status and connection difficulty are four separate pill systems with overlapping colours. | One legend for the whole tool, shown once. Each system gets one shape (pill, dot, text) and only one of them uses colour. |
| Section headers | Uppercase small labels ("COMPARED WITH", "HEAT", "NON-MARKET HOUSING") are used for structure, data groups and table captions alike. | Keep uppercase for structural section labels only. Use sentence-case headings for groups. |
| Numbers | Some ranges are given as "3.2–5.9 GWh/yr", others as "up to 105.1 GWh a year", and figures carry different precision. | Fix one format: range with an en dash, one unit style ("GWh a year"), two significant figures in summaries. |
| Sources | Some views put source lines inline after each item, others in a block at the end. | Inline "src" only on figures that change the argument; everything else goes in one Sources fold per view. |

## Accessibility

- **Colour contrast** on the panel (#1e2023), computed:
  - body text #e9e6e1: 13.5:1 ✓
  - muted #9d9a94: 6.0:1 ✓
  - accent #CC746C: 5.0:1 ✓ (passes for text)
  - **faint #6b6964: 3.1:1 ✗**. It fails AA for small text and is used for source lines, map credits, the version line and "Draft wording". Raise it to about #8a8781 (around 4.6:1).
- **Touch targets:** tabs and "Explore ›" buttons are about 28–32 px tall, below the 44 px guidance for touch. That's fine for desktop review; enlarge them if the tool will be shown on tablets.
- **Text readability:** source and legend text at about 11 px over long lines is hard to read. Keep 11 px for labels only and set notes at 12.5–13 px.
- **Colour-only meaning:** the gate words and break-even status rely on colour. Add a symbol or text.

## What works well

- The restraint: dark, quiet, one accent. It reads as a research instrument, not a product pitch.
- Uncertainty is visible everywhere ("not yet known", "claim", "to check"), which matches the thesis.
- The comparison idea (this design against references) is strong. It's only placed too early.
- The condensed receiver list now leads with the finding ("122 beyond break-even… gas at $41/GJ"). That's the pattern every view should follow.

## Priority recommendations

1. **Answer first, method second, on every view.** One finding sentence and two or three figures at the top. Comparison tables, assumptions and long source notes go into closed sections underneath. This alone fixes the Heat screen and most of the "lots of information that doesn't do anything" problem.
2. **Re-group the ten tabs into three named groups** (What it exchanges / What it could become / Context), so a reviewer knows the order and nothing wraps.
3. **One status language.** Colour only for one system (the gate states), symbols alongside it, neutral styling for evidence pills, and a single legend. Raise --faint to pass contrast.
4. **A "review" switch that shows draft wording in normal text colour.** Your red-for-draft rule stays in edit mode, but reviewers see findings, not drafts, as the loudest element. *(Your call: it touches your writing workflow.)*
5. **Open the worked examples at a discussion size (1 MW)** so the first screen isn't an overflow warning.
