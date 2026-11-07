# Beyond Data: master build plan (7 Nov 2026)

Written by Cowork for J.B. and Claude Code. Replaces the short rule-sheet line in WORKLIST §5 as the plan for all layout work.
WORKLIST.md stays the running checklist; this file says **what each piece must contain and how we know it is done**.

Why this exists: the Emergency hub went to Code as one line ("bands, one spine, fallback ladder…"). Code built the simplest reading, and the result was three separate buildings. From now on nothing goes to Code as a one-liner: every build job comes with a written spec, drawings, and pass/fail tests.

---

## 0. Ground rules (apply to every phase)

1. **Spec before code.** Code builds only from a spec Cowork wrote and J.B. approved. Where the spec doesn't cover a case, Code **stops and reports** the case in `checks/to_cowork.md`; it never invents a layout rule.
2. **One building.** A typology is always one connected building. Programs are parts of one outline, never separate blocks. (Exception only where a code forces it, e.g. Shelter + laundry overnight variant, Group C; the spec says so and why.)
3. **Every rule has a source** (clause, page) or is labelled "drawing choice" or "our reading". Unknowns are "?". Same standards as before: primary sources, Canadian spelling, no circumvented sites.
4. **Pass/fail tests are part of the spec.** A layout is done when every test in its spec passes or is reported as a flagged exception.
5. **Gates.** Each phase ends with J.B.'s review. Nothing merges to main or goes to the live page without her OK.
6. **Job sheets.** Every Code job comes as its own file (`CODE_JOB_<id>_<name>.md`) with: which lots or files, every measure defined, the method, outputs with file names and columns, checks before reporting, what must not change, and what Code may do while waiting. The first is `CODE_JOB_A1_lot_types.md`.
7. **Nothing else moves.** A job never changes sizes, MW or layout results it wasn't asked to change; golden and baselines are re-run and any change is reported. Commit locally; push only with J.B.'s OK.
8. **Data rules.** No Altalis or BC Assessment geometry in the public repo (ids and measures only). Altalis lot lines stay course-only.

---

## Phase A. Foundations

### A1. Lot types (Code) — start now
Full job sheet: `CODE_JOB_A1_lot_types.md` (method, cut-offs, outputs, checks). Summary:
For every lot where a data centre is permitted, conditional or discretionary, in Vancouver and Edmonton, compute:
- frontage (length of the street edge or edges), depth (perpendicular to the front), lot area, buildable area after yards;
- corner lot (two street edges) yes/no; rear lane yes/no; side access only;
- irregularity = lot area ÷ area of its minimum bounding rectangle;
- zone and sub-area; height limit; storey-height rules.

Group the lots into a **small number of lot types** (proposed from the data, e.g. narrow-deep, wide-shallow, square, corner, large, small, irregular). For each type: count per city, range of each measure, and **one representative real lot** (address, key) plus one second example.
Output: `checks/lot_types_<date>.md` and `checks/lot_types_<date>.csv` (ids and measures only).
Done when: every candidate lot has exactly one type; J.B. has seen the table.

### A2. Visual system (Cowork, J.B. approves)
From the style study (S1–S3 on the design board): palette (three program hues + neutrals + red for findings, colour-blind checked), four type sizes, three line weights, chart kit (meter, donut for one whole, stacked bars), status chip, white panel.
Output: `docs/STYLE.md` with every token, size and rule written out (hex values, px, chart specs), plus screenshots of the S1–S3 boards in `docs/style/`. Code works from STYLE.md only: the boards live in Cowork's design, which Code can't open.
Done when: J.B. approves; then every new board and every built card uses it.

### A3. Typology spec format (Cowork)
One template every typology spec follows (section B lists its parts). The Emergency hub spec is written first and proves the format.

---

## Phase B. Typology specs (Cowork writes, J.B. reviews, one at a time)

Order: **1 Emergency hub · 2 Community pool · 3 Heat cascade · 4 Warm bath · 5 Aquaponics · 6 Food hub · 7 Conservatory · 8 Shelter + laundry.** Add-ons after: Heat hub, Public edge, Solar, EV charging.

Each spec: `checks/specs/<typology>.md` + test-fit boards in the design. Each spec has these parts, all required:

1. **Program and rooms.** Every room: net m² minimum and target, rank (what drops first), source. Shared support and how sharing reduces area. Total range.
2. **Variants.** Every variant and what decides it (zone, occupancy, lot type). Known so far: Emergency hub stacked / beside; Shelter + laundry day / overnight. For the others the variants are defined in this step (from the research files in `checks/research_typ/`).
3. **Hard layout rules**, numbered, each with dimension and source:
   - the bands in order (street → forecourt → public programs → shared lobby → spine → data centre → plant yard) and how they turn on each lot type;
   - one building outline per storey; every program shares a wall with the next band;
   - shared lobby: position, minimum size (source or drawing choice, labelled);
   - corridor spine: side, width; exit stairs: positions that keep exits ≥ max(9 m, ½ diagonal) apart, measured between the doors into the stairs;
   - storey heights per zone and how programs and data hall line up (or a named split-level);
   - stacking: what may sit over/under the hall (nothing wet over the hall), fire separations (2 h A/B to F-2 etc.);
   - plant yard, loading dock and truck route, entrances, step-free access, flood level;
   - the fallback ladder for this typology (at grade → stack → over/under hall → drop lowest rank → "doesn't fit here", with the reason).
4. **Test fits.** Hand-drawn plan (every storey), section and numbers for **each variant on each lot type from A1**, on its representative real lot. These are the target pictures the tool must reproduce.
5. **Pass/fail tests** the tool runs on every layout: the 18 schematic checks of WORKLIST §5, plus:
   - T-one: one outline per storey, no gap between programs;
   - T-lobby: a shared lobby on the street front reaches every public program;
   - T-stack: storeys align, or the split-level is the named one;
   - T-exits: measured along the plan from the worst door position (0.25 m grid), exits apart measured door to door;
   - T-rooms: every room at or above its minimum, or dropped by rank and reported;
   - T-reach: every room reaches the corridor; through-room access only where the spec allows it.
6. **Doesn't-fit rule.** The smallest frontage, depth and buildable area each variant needs, and which lot types can never take it, with the limiting rule.
7. **Worked example.** One lot, step by step from lot to finished layout, so Code can check its steps against ours.
8. **Open questions** for J.B.

Gate after each spec: J.B. approves drawings and rules before Code builds it.

---

## Phase C. Where each typology works (Code, after each spec)

Run each spec's doesn't-fit rule (and, once built, the full layout) on every candidate lot.
Output per typology and variant: count of lots where it fits, flagged (conditional use, relaxation, rezoning), doesn't fit (with the limiting rule).
Plus one list: **lots where no typology fits**, with the reason.
`checks/fit_sweep/<typology>_<date>.md` + CSV.

---

## Phase D. Build Architecture (Code)

1. Layout engine from the specs: bands, outline, lobby, spine, stairs, stacking, fallback ladder; every test in the spec runs after every layout.
2. Typology picker (typology, variant, add-ons); remove the free Ratios slider.
3. Layout export per lot (`checks/layouts/<lot>.json`) for every representative lot; Cowork redraws the cards from it.
4. The 21 Architecture cards in five chapters, in the A2 style, each card reading only what came before.
One typology at a time, in the B order, gate after each.

---

## Phase E. The other templates

For each: Cowork draws **real-drawing boards in the A2 style** for every card (real lots, real figures, charts where a figure is a comparison) → J.B. approves → Code builds the cards → Cowork checks the built cards against the boards.
- **Resident** (9 cards): city; pick a data centre; what it is; noise; heat; water; power and backup; how it works; report.
- **Municipal** (11 cards): city; parcel; is a data centre allowed; height and floor area; yards by edge; storey heights and ground floor; loading; rooftop equipment and screening; approval process; two cities; report.
- **Engineering** (six steps / 13 cards): city; parcel; size and cooling; backup power; what fits; heat; electricity; water; materials; three options; could become; two cities; report.
Order: Municipal (closest to the layout work), Engineering, Resident. (Inside a data centre dropped by J.B., 7 Nov: no time.) Can run alongside Phases B–D: boards are Cowork's work, building waits for Code.

---

## Phase F. Website and landing page

Cowork boards the landing page (five template rows, what the tool is, the two cities) in the A2 style → J.B. approves → Code builds → full check round → publish after J.B.'s review.

---

## Phase G. Full check round

Golden, Architecture baseline, register wiring, every template's report, layout tests on every representative lot, Excel recalculation of the register, independent check. Then J.B.'s review, then the live page.

---

## Who does what, now

| Now | Cowork | Code |
|---|---|---|
| Step 1 | A2 STYLE.md; A3 spec format; B1 Emergency hub spec (needs A1's lot types for the test fits) | A1 lot types. Pause the rule sheet (tool/plan.js) until the B1 spec arrives |
| Step 2 | B1 test fits on A1's representative lots; then B2 | C on Emergency hub (doesn't-fit rule); then D for Emergency hub |
| Alongside | Phase E boards (Municipal first) | — |

Every Cowork deliverable lands in Claude Link with a paste for Code; every Code report goes back through J.B.
