I'm making booklet graphics of the logic diagram behind my GP1 tool (Beyond Data). Another chat redrew the diagram for print and made a set of draft pages. I'd like you to develop them into finished booklet pages, with the math built into the drawings: lines of code around the nodes, so each page is both a graphic and an explanation. We won't use them all; I want options.

FILES (folder booklet/logic)
- out/: draft pages L1–L18, each as a vector PDF and a 300 dpi PNG, white (booklet) and dark (_dark). The earlier warm-paper drafts are replaced.
- ALL_PARTS_MATH.md: every one of the 195 parts, verbatim from the tool's register. For each part: formula, coefficients, inputs, links, trust and sources. This is the only source for the math. Use its words and symbols exactly; don't simplify numbers or invent steps.
- gen.py: the generator. Layout, colours and the exact rule behind each page are in the code; the rules are also written out below.
- pages/: the HTML/SVG of each page, if you want to edit the vector directly.

HOW THE DIAGRAM IS DRAWN (all pages)
- 195 parts and 261 links from diagram_data.json, in 8 stages, left to right:
  1. What we start with
  2. How big it can be
  3. What the site offers
  4. What it gives off
  5. Who is nearby
  6. What it could become
  7. What it would take
  8. Who gains, who pays
- Big stages are split into sub-columns by their internal order: stage 4 in three, stage 6 in two, stage 7 in three. A part that feeds another part in its own stage sits to its left.
- Rows are ordered to reduce crossings, by the mean position of each part's inputs. Links are curves from a part's right edge to the next part's left edge. Links that run backwards loop around on the right.
- Under each box, in code: the part's inputs as f(a, b, …), then its formula from the register, split at ";" and " — ".

TRUST RINGS (pages 03, 05, 06)
- The arc is the part's "conf" (0–100): full = arithmetic, three-quarters = a regulation or government data, half = an operator's claim.
- "upstream" is the trust of the weakest input in its chain.
- Example: Homes heated is 80 on its own and 50 through its chain.

THE PAGES AND THE EXACT RULE BEHIND EACH
- **01 spread_whole (17 × 11, two facing pages):** all 195 parts and 261 links, each part with its code lines. The fold line is dashed at the centre; keep important parts off it.
- **02 whole_letter (8.5 × 11):** the same, without code, as a single-page map.
- **03 follow_the_heat:** twelve parts as code cards, in this order:
  - parcel → floor_area → server_floor → it_load_outside → it_load_actual → heat_rejected
  - → heat_captured → heat_delivered → homes_heated → price_floor → window → ledger
  - Each card: name, id, unit, own trust and chain trust, inputs, formula. Their formulas are in ALL_PARTS_MATH.md. For example, heat_delivered: "Q_out = E_reuse × COP ÷ (COP − 1)"; homes_heated: "homes = Q_available ÷ (space + water heating GJ per household)", BC 60.5 GJ, AB 119.3 GJ.
- **04 heat_chain_on_whole:** the same twelve parts lit on the whole diagram, the rest faint.
- **05 anatomy_homes_heated:** one part in full:
  - fed by heat_delivered; feeds homes_heated_2050s;
  - formula and coefficients verbatim;
  - sources: NRCan Comprehensive Energy Use Database 2023, and Statistics Canada Table 25-10-0060-01;
  - trust 80 own, 50 chain.
  - This page is the least finished; please compose it properly. The node sits in the centre with the code orbiting it.
- **06 trust_field:** every part as a ring, grouped by stage and sorted by its own trust. The outer arc is own trust; the small inner arc is chain trust.
- **07 three_levels:** the diagram three times.
  - Each copy lights the parts that level shows: Everyday = tier "resident" (45 parts); Civic = resident + community (125); Technical = all (195).
  - Tiers come from templates.json, via graph.json.
- **08 what_feeds_the_ledger:** every part with a path of links into "ledger" (Party ledger), found by walking the links backwards from ledger. That gives 27 parts.
- **14–18 exchange_<heat|energy|water|materials|people>:** parts whose id or name matches a keyword list, and the links between them, in the exchange's colour. The lists (regular expressions, case-insensitive):
  - heat: `heat|cool|cop|borefield|boreh|thermal|sewer`
  - energy: `electric|grid|battery|solar|ups|generat|peak|power|tariff|curtail|connection`
  - water: `water|evaporat|blowdown|rain|reclaim|storm`
  - materials: `copper|waste|embodied|rare|refurb|recycl|material`
  - people: `noise|sound|job|work|refuge|people|shadow|light|vibration|shelter|public|neighbour`
  - These are a visual selection, not the tool's own grouping. Say so in a small note.
- **09–13 codex pages:** every part of a stage group as a code card, with name, id, unit, trust, inputs and formula (wrapped). Groups:
  - 09: stages 1–2
  - 10: stage 3
  - 11a/b: stage 4
  - 12a/b: stages 5–6
  - 13a/b/c: stages 7–8

STYLE (matches the current booklet, Beyond_Data_booklet_white6_spreads_22Oct)
- White page. Ink #1c1c1e; greys #626264 (subtitles), #8b8b8d (code), #a9a9ab (meta), thin lines #b4b4b7–#d6d6d8.
- Barlow: Light for text and numbers, SemiBold for titles and part names, Regular for the tracked meta. IBM Plex Mono only for code.
- Header as on S1–S21: page code in Light 30 pt (L1, L2 … for "logic"), title SemiBold 18 pt, grey subtitle Light 9 pt, a short black bar under it; tracked 6 pt meta top right; page code bottom right. Renumber if they sit elsewhere in the booklet.
- Highlights in black. The heat chain (L3–L5) in heat red.
- Exchange colours as in the booklet maps: heat #d4202b, energy #f1b604 (lines #d9a000 for contrast on white), water #1f78c7, materials #2e9d4e, people #7b3fb4.
- Thin lines (0.45–1.3 pt). Plain and professional, nothing that looks AI-generated. Canadian spelling. No long paragraphs. Leave room for a "TEXT · J.B." box where a page needs words.
- A dark version (_dark) exists for each page; the booklet is white, so treat dark as optional.

WHAT I'D LIKE FROM YOU
- Pick the strongest 6–8 pages and finish them. Make the code around the nodes an artistic layer:
  - full code where a reader zooms in;
  - texture where they don't;
  - formulas aligned to their node.
- You may re-lay out parts if it reads better, but keep every link and every formula true to ALL_PARTS_MATH.md. If a formula is too long, show its first statement and mark "…"; never paraphrase it into new math.
- Keep a dark version where it looks good.
- Output: PDF (vector) and PNG at 300 dpi, letter (8.5 × 11) or spread (17 × 11), same file names.
