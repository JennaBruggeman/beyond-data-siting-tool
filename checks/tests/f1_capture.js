// F1 step 1 (CODE_JOB_F1_site_build.md): real images for the landing page, taken from the tool's own 3-D view of 339 1st Ave E (Vancouver, key 63819485;
// City of Vancouver open data only, no Edmonton/Altalis lot lines, no BC Assessment geometry), one per template, at the step that template is about.
// Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node f1_capture.js <out dir>
const fs = require('fs'), path = require('path');
const NM = (process.env.NODE_PATH || '').split(path.delimiter)[0];
const { chromium } = require('playwright');
const SHOTS = [ // [file, tier, flow step, labels on]
  ['hero', 'full', 'fits', 'Equipment'], ['resident', 'resident', 'fits', null], ['municipal', 'full', 'setup', null], ['engineering', 'full', 'fits', 'Equipment'], ['architecture', 'arch', 'aarr', null]];
const PAN = { hero: 30, engineering: 30, resident: 30, municipal: 10, architecture: 10 }; // metres, by eye on 339 1st Ave E (drawing)
(async () => {
  const out = process.argv[2] || 'f1img'; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl'] });
  for (const [file, tier, step, btn] of SHOTS) { const lab = false;
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
    const local = (re, f, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, f)), contentType: type }));
    await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript'); await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
    await p.route(/flow\.js/, async r => { const res = await r.fetch(); let t = await res.text(); t = t.replace('const EXAMPLES=[', 'const EXAMPLES=window.__EX=[').replace('async function runExample(i){', 'window.__run=runExample; async function runExample(i){'); r.fulfill({ response: res, body: t }); });
    await p.addInitScript(t => { try { localStorage.setItem('bd-tier', t); localStorage.setItem('bd-f1-skip', '1'); } catch (e) {} }, tier);
    await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForTimeout(6000);
    await p.evaluate(() => { window.__EX.push({ lab: '339 1st Ave E', sub: 'I-3', sel: { city: 'van', tile: '1_1', id: '63819485' }, ans: { built: 'new', extent: 'whole', floor: '' } }); const w = document.getElementById('welcome'); if (w) w.remove(); window.__run(window.__EX.length - 1); });
    await p.waitForTimeout(9000);
    await p.evaluate(async ([step, lab]) => { if (step === 'aarr') { await BD.arch.ready; BD.flow.to('arat'); await new Promise(r => setTimeout(r, 1500)); } BD.flow.to(step); if (BD.arch) BD.arch.labels = lab; }, [step, lab]);
    await p.waitForTimeout(4000);
    if (btn) { const bt = await p.$(`#v3d button:has-text("${btn}")`); if (bt) { await bt.click(); await p.waitForTimeout(3000); } }
    /* the drawing only: the tool's buttons and labels over the 3-D view are hidden for the image */
    await p.addStyleTag({ content: '#v3d > :not(canvas), #v3d .lbl, #v3d [class*="label"], button{visibility:hidden!important}' });
    /* framing: the camera pans sideways so the lot sits in the middle of the 3-D panel (view only; nothing in the model moves) */
    await p.evaluate(k => { const R = BD.scene3d.rig(); if (!R || !R.cam || !R.ctl) return; const T = window.THREE, right = new T.Vector3(); R.cam.getWorldDirection(right); right.cross(R.cam.up).normalize();
      const d = right.multiplyScalar(-k); R.cam.position.add(d); R.ctl.target.add(d); R.ctl.update(); }, PAN[file] || 0);
    await p.waitForTimeout(1500);
    const el = await p.$('#v3d') || await p.$('#map');
    await el.screenshot({ path: path.join(out, file + '.png') }); console.log(file, 'errors', errs.length, errs.slice(0, 2).join(' | '));
    await p.close(); }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
