// F2b (9 Nov 2026): the Emergency hub (tool/hub.js) on the spec's test lots, one line each: variant, flags, ladder step, MW, data-centre floor,
// the T-checks, and what the spec's Part 4 fit gives for comparison. Writes a summary only (no geometry), so the output holds no lot lines.
// Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node hub_lots.js <out.json> [key ...]
const fs = require('fs'), path = require('path');
const NM = (process.env.NODE_PATH || '').split(path.delimiter)[0];
const { chromium } = require('playwright');
const new_ = { built: 'new', extent: 'whole', floor: '' };
/* spec Part 4 (Claude Link eh/specs/emergency_hub.md, 10 Nov): the hand fit's variant and result, for comparison only */
const LOTS = {
  V339: { lab: '339 1st Ave E', sel: { city: 'van', tile: '1_1', id: '63819485' }, spec: 'stacked, side drive, raised; 1.80 MW; fits' },
  V1330: { lab: '1330 Glen Dr', sel: { city: 'van', tile: '1_1', id: '22260652' }, spec: 'stacked, small, side drive; clinic dropped; fits' },
  V8238: { lab: '8238 Fraser St', sel: { city: 'van', tile: '1_-3', id: '21083038' }, spec: 'stacked, through, height-capped; 0.94 MW; clinic dropped; fits' },
  V1353: { lab: '1353 Pender St E', sel: { city: 'van', tile: '2_2', id: '59223039' }, spec: 'turned, stacked; 1.64 MW; 6 exams; fits' },
  V8980: { lab: '8980 Oak St', sel: { city: 'van', tile: '-1_-4', id: '14984188' }, spec: 'stacked, irregular corner, raised; 0.94 MW (plant); fits' },
  V1360: { lab: '1360 Frances St', sel: { city: 'van', tile: '2_2', id: '59423054' }, spec: 'small (484 m²): at-grade does not fit; generators-upstairs variant fits (not FM 5-32)' },
  E06B: { lab: '64 Airport Rd NW', sel: { city: 'edm', tile: '-1_1', id: '146402' }, spec: 'beside; 1.68 MW; needs rezoning' },
  E4103: { lab: '4103 97 St NW', sel: { city: 'edm', tile: '0_-3', id: '904935' }, spec: 'beside, corner; 1.68 MW; needs rezoning' },
  E14715: { lab: '14715 Yellowhead Trail NW', sel: { city: 'edm', tile: '-2_1', id: '150388' }, spec: 'beside, large, hub cap; 1.68 MW; needs rezoning' },
};
(async () => {
  const out = process.argv[2] || 'hub_lots.json';
  const keys = process.argv.slice(3).length ? process.argv.slice(3) : Object.keys(LOTS);
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl'] }); const res = {};
  for (const key of keys) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
    const local = (re, file, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, file)), contentType: type }));
    await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript');
    await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
    await p.route(/flow\.js/, async r => { const rs = await r.fetch(); let t = await rs.text();
      t = t.replace('const EXAMPLES=[', 'const EXAMPLES=window.__EX=[').replace('async function runExample(i){', 'window.__run=runExample; async function runExample(i){');
      r.fulfill({ response: rs, body: t }); });
    await p.route(/fonts\.(googleapis|gstatic)|d3/, r => r.abort());
    await p.addInitScript(() => { try { localStorage.setItem('bd-tier', 'arch'); } catch (e) {} });
    await p.goto('http://localhost:8766/index.html?nointro&x=' + Date.now()); await p.waitForTimeout(6000);
    const L = LOTS[key];
    await p.evaluate(x => { window.__EX.push(x); const w = document.getElementById('welcome'); if (w) w.remove(); window.__run(window.__EX.length - 1); }, { lab: L.lab, sub: '', sel: L.sel, ans: new_ });
    await p.waitForTimeout(9000);
    const r = await p.evaluate(async () => { try { if (BD.arch) BD.arch.typology = 'emergency_hub'; const P = await BD.f1cards.arch(); const H = BD.hub.build(P), h = H.hub || {};
      const T = h.treach || {}, rd = x => x == null ? null : Math.round(x * 100) / 100;
      return { sel: BD.S.sel && BD.S.sel.a && BD.S.sel.a[0], variant: h.variant, ladder: h.ladder && { step: h.ladder.step, what: h.ladder.what }, doesntFit: h.doesntFit || null,
        MW: rd(h.MW), dcArea: rd(h.dcArea), clin: rd(h.clin), W: rd(h.W), Da: rd(h.Da), site: h.site, nb: h.nb, kind: h.kind,
        reach: T.reach ? (T.reach.length ? T.reach.length + ' findings: ' + T.reach.slice(0, 3).map(o => o.rule + ' ' + o.room).join('; ') : 'PASS') : '?', deadWorst: T.dead ? Math.max(0, ...T.dead.map(c => c.deadEnd_m || 0)) : null,
        widthFails: T.width ? (T.width.rows || []).filter(x => x.sev === 'fail').length : null, height: h.grades && h.grades.height, flags: H.flags };
      } catch (e) { return { err: String(e.stack || e) }; } });
    r.spec = L.spec; r.errors = errs; res[key] = r;
    console.log(key, r.err ? 'ERROR ' + r.err.split('\n')[0] : `${r.kind || '-'} · ${(r.variant && [r.variant.main].concat(r.variant.flags || []).join(', ')) || ''} · step ${r.ladder ? r.ladder.step : '-'} · ${r.MW} MW${r.doesntFit ? ' · DOESN’T FIT' : ''} · reach ${r.reach}`);
    await p.close();
  }
  fs.writeFileSync(out, JSON.stringify(res, null, 1)); await b.close();
})().catch(e => { console.error(e); process.exit(1); });
