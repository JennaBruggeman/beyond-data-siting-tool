# Part A: paste to the booklet / map chat (after the booklet update is approved)

For Wednesday's review I'm making an **8.5-minute video** of all the work so far. It animates the updated booklet graphics, so finish and approve the booklet spreads first. Then export them as below, so the graphics carry over into the video unchanged. The storyboard is `pitch/STORYBOARD_review_28Oct.md` in the Claude Link folder.

**Spreads used in the video, in order**
1. The exchange sheets 0–5 (overview, heat, energy, water, materials, people and place) and the matrix.
2. The precedents grid and "by type".
3. **S2, S3, S6, S7, S8, S9, S10, S11, S12, S15** (S15 is the before/after).
4. **J0**.
5. **E1, E2, E3, E7, E8**.
6. **V1, V2, V4, V7, V8**.

**For each of those, export into `Claude Link/video_assets/<spread code>/`:**
1. **The spread** as PDF and 300 dpi PNG (as the booklet).
2. **A layered SVG** with named groups, so each layer can be animated on its own. Use these names where they apply:
   - `base` (streets, water, outlines);
   - `cells` (the coloured grid);
   - `network` (district energy outlines);
   - `site` (site marker or lot);
   - `peaks` (top-five markers and circles);
   - `links` (adjacency lines and distances);
   - `labels`;
   - `legend`;
   - `table`;
   - `title`;
   - `notes`.
3. **One 16:9 frame (1920 × 1080)** of the main figure on its own (the map, the table or the diagram, without the page frame):
   - 5 % safe margin;
   - type no smaller than about 28 px;
   - white background; same colours and fonts (GP2 frame, Lato).
4. **The data behind each chart or table** as CSV or JSON: bar values, table rows, ranks, distances. Then animated bars and tables can be drawn to the same scale as on the page.
   - This matters most for **E7 and V7** (the money), **S12** (the shortlist) and **S15** (before and after).
5. **For E1 and V1:**
   - the 3D context model (OBJ or GLB) with the site left empty;
   - the camera position and target used for the booklet view (in the model's local frame);
   - the origin.

**Naming:** `<code>_<what>.<ext>`, e.g. `S12_table.csv`, `E7_money.svg`, `E1_model.obj`.

**Rules:** nothing new is drawn for the video. These are the booklet graphics, separated into layers. Same accuracy rules as the booklet.

Reply with the list of files exported and anything you couldn't separate into layers.

---

# Part B: paste to the main thesis chat

I'm making an 8.5-minute video for Wednesday's Progress Review #1 (ARCH 548 Assignment 3). It must include:
- a title;
- my thesis statement (no more than one 35-word sentence);
- my methodology and tactics from Assignment 2, and where I am in the tactical sequence now;
- my literature review findings (the main thinkers, texts, studies and concepts) and how my work is positioned against them;
- the latest results.

Please give me, short and in plain words:
1. **Two or three options for the 35-word thesis statement**, updated for the current direction: join vs grow, Vancouver (275 1st Ave E) and Edmonton (74/64 Airport Rd NW, the Blatchford edge). Include the finding that the network decided the site.
2. **The methodology and tactics** from A2, as a numbered sequence, with the step I'm on now marked.
3. **The literature review in about 8–10 items**: each a name or text, one line on what it says, and one line on how my work relates (builds on, differs from, tests). Group them under 3–4 headings, and give each a placement on two axes for a literature map (suggest the two axes).
4. **A title** for the project at this point (keep "Beyond Data" as an option).

Keep every source real and cited as in A2. Mark anything you're unsure of.
