// The seven Edmonton test fits for the public web version (J.B. 13 Nov 2026): each storey plan of each board (freeze 11i, Claude Link eh/ic45), saved
// as a PNG at report resolution (2x). Images with lot lines may be public; the Altalis data stays private: raster only, no SVG, no coordinates.
// Only the plan drawings are captured (each <svg> whose label ends in "plan"), not the board's notes. Run on J.B.'s computer:
// NODE_PATH=<node_modules with playwright> node publish/render_edm_fits.js "<Claude Link>/eh/ic45"
const path = require('path'), fs = require('fs'); const { chromium } = require('playwright');
const IC = process.argv[2], OUT = path.join(__dirname, 'edm_fits');
const FITS = ['E06B', 'E4103', 'E14715', 'E10003', 'E10004', 'E15231', 'E16075'];
(async () => { fs.mkdirSync(OUT, { recursive: true }); fs.readdirSync(OUT).filter(f => f.endsWith('.png')).forEach(f => fs.unlinkSync(path.join(OUT, f)));
  const b = await chromium.launch(); const made = [];
  for (const k of FITS) {
    const p = await b.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 2 });
    await p.goto('file:///' + path.join(IC, `TestFit_EH_${k}.preview.html`).replace(/\\/g, '/')); await p.waitForTimeout(1200);
    const svgs = await p.$$('svg'); let n = 0;
    for (const s of svgs) { const lab = (await s.getAttribute('aria-label')) || ''; if (!/plan$/i.test(lab)) continue; n++;
      const f = `${k}_${lab.replace(/[^A-Za-z0-9]+/g, '_').replace(/_+$/, '').toLowerCase()}.png`; await s.screenshot({ path: path.join(OUT, f) }); made.push([k, lab, f]); }
    console.log(k, n, 'plan(s)'); await p.close(); }
  fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify(made));   // read by make_pages.py (not published)
  await b.close(); })();
