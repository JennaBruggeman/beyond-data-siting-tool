# Pitch video (Friday 23 Oct 2026)

A 5-minute video: J.B.'s voice with big, short captions. No music. Voice is recorded after the picture is cut; clips are then trimmed to the voice.

## Decided (20 Oct)
- Most of the time goes to the logic, the logic diagram and the exchange system. Tool demo about 45 s (interface, panning, report snippets).
- Opening: dot globe, "It serves the world"; dive in, "But it lives here"; "A building that only takes"; "What if it traded?"; "An exchange, both ways".
- Colours: white = global digital services; red = local exchanges.
- Strongest examples, with how proven each is:
  - waste heat to a network (built here: TELUS, Vancouver, BCUC order 2013; exact wording to check);
  - water reuse (built elsewhere: Quincy, WA);
  - grid batteries and flexible load (built elsewhere);
  - EV charging hub, copper bank (speculative).
- Counts to quote (from diagram_data.json and tool/opps.json):
  - 6 kinds of exchange, 28 flows, 21 opportunities, 22 add-ons;
  - 12 parties, 10 lenses, 8 stages;
  - levels of 45 / 125 / 195 parts.

## Outline v2 (timings before the globe was added)
| Time | Section |
|---|---|
| 0:00–0:45 | Opening (made) |
| 0:45–1:10 | Who and what (12 parties, 10 lenses) |
| 1:10–2:00 | Exchange system and strongest examples |
| 2:00–3:15 | Logic diagram: stages, heat chain, three levels, three labels |
| 3:15–4:00 | Tool demo: 1425 Clark Dr |
| 4:00–4:35 | What it reveals ($50 vs $40/MWh; none of 688 pay back yet; Edmonton differs) |
| 4:35–5:00 | Close: pull back to the globe; "Trade-offs, not verdicts" |

## Files
- `anim/opening.html`: the opening. `R(t)` draws the frame at t seconds.
- `anim/rec.js`: frame capture with Playwright, 24 fps, 1920×1080. Usage: `node rec.js page.html seconds outdir`, then
  `ffmpeg -framerate 24 -i outdir/f%05d.jpg -c:v libx264 -pix_fmt yuv420p -crf 18 out.mp4`.
  Fonts: IBM Plex Sans woff2 (from @fontsource/ibm-plex-sans) beside the HTML, as plex-400.woff2 and plex-500.woff2.
- `tool-shots/rec_tool.js`: scripted tool recording (Clark Dr, orbit, click to Exchanges).
  - It needs the tool served locally and `BD.scene3d.rig()`.
  - Walk the steps ahead first, or later steps stay greyed out.
- Renders so far: `video-test-shot-1.mp4` (tool), `video-opening-test-2.mp4` (opening, approved 20 Oct).

## Open
- The script draft is in the chat of 20 Oct. J.B. to read it aloud and adjust the wording.
- Report pages for the snippets.
- Carbon: a seventh exchange, or a measure across all six?
