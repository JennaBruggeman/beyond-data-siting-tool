// Golden run: loads the tool headless, runs each test lot, saves the engine's results.
// Usage (from checks/tests/): NODE_PATH=<node_modules with playwright> node golden_run.js <outdir> [lotKey ...]
// Needs the tool served at http://localhost:8766 (python3 -m http.server 8766 -d tool).
// Libraries the page loads from CDNs are served locally from NODE_PATH (three, jspdf).
const fs = require('fs'), path = require('path');
const NM = (process.env.NODE_PATH || '').split(':')[0];
const { chromium } = require('playwright');

const LOTS = {
  V09: { lab: '275 1st Ave E', sub: 'I-3 · new building', sel: { city: 'van', tile: '1_1', id: '63819363' }, ans: { built: 'new', extent: 'whole', floor: '' } },
  E05: { lab: '8803 Stadium Rd NW', sub: 'IM · new building', sel: { city: 'edm', tile: '0_0', id: '51053' }, ans: { built: 'new', extent: 'whole', floor: '' } },
  CLARK: { lab: '1425 Clark Dr', sub: 'I-2 · new building', sel: { city: 'van', tile: '2_1', id: '23060741' }, ans: { built: 'new', extent: 'whole', floor: '' } },
  E123: { lab: '12603 123 Street NW', sub: 'IH · new building', sel: { city: 'edm', tile: '-1_1', id: '883345' }, ans: { built: 'new', extent: 'whole', floor: '' } },
  HAST: { lab: '555 W Hastings', sub: 'existing · one upper floor', sel: { city: 'van', tile: '0_2', id: '59013407' }, ans: { built: 'existing', extent: 'part', floor: 'upper' } },
};

// Strip DOM-ish and huge values so the snapshot is stable and diffable.
const CLEAN = `(o)=>{ const seen=new WeakSet(); return JSON.parse(JSON.stringify(o,(k,v)=>{
  if(v&&typeof v==='object'){ if(seen.has(v)) return '[cycle]'; seen.add(v); if(v.nodeType) return '[node]'; }
  if(typeof v==='function') return undefined;
  if(v instanceof Float64Array||v instanceof Float32Array) return '[ring '+v.length+']';
  if(typeof v==='number') return Math.round(v*1e6)/1e6;
  if(typeof v==='string'&&v.length>600) return v.slice(0,600)+'…';
  return v; })); }`;

(async () => {
  const out = process.argv[2] || 'golden'; fs.mkdirSync(out, { recursive: true });
  const keys = process.argv.slice(3).length ? process.argv.slice(3) : Object.keys(LOTS);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell', args: ['--use-gl=swiftshader', '--enable-webgl'] });
  for (const key of keys) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    const errs = []; p.on('pageerror', e => errs.push(e.message));
    const local = (re, file, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, file)), contentType: type }));
    await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript');
    await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
    await local(/jspdf\.umd/, 'jspdf/dist/jspdf.umd.min.js', 'application/javascript');
    await local(/autotable/, 'jspdf-autotable/dist/jspdf.plugin.autotable.min.js', 'application/javascript');
    await p.route(/flow\.js/, async r => { const res = await r.fetch(); let t = await res.text();
      t = t.replace('const EXAMPLES=[', 'const EXAMPLES=window.__EX=[').replace('async function runExample(i){', 'window.__run=runExample; async function runExample(i){');
      r.fulfill({ response: res, body: t }); });
    await p.route(/fonts\.(googleapis|gstatic)|d3/, r => r.abort());
    await p.addInitScript(() => { try { localStorage.setItem('bd-tier', 'full'); } catch (e) {} });
    await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForTimeout(7000);
    await p.evaluate(x => { window.__EX.push(x); const w = document.getElementById('welcome'); if (w) w.remove(); window.__run(window.__EX.length - 1); }, LOTS[key]);
    await p.waitForTimeout(9000);
    const snap = await p.evaluate(`(()=>{ const clean=${CLEAN}; const e=BD.eng||BD.engine||{}; const f=(e.siteFacts||BD.siteFacts)(); const m=BD.model?BD.model():null;
      return clean({lot:${JSON.stringify(key)}, answers:BD.S.answers, sel:{city:BD.S.sel.city,id:BD.S.sel.id,lotArea:BD.S.sel.lotArea,a:BD.S.sel.a}, facts:f, model:m}); })()`);
    snap.errors = errs;
    fs.writeFileSync(path.join(out, key + '.json'), JSON.stringify(snap, null, 1));
    console.log(key, 'ok', errs.length ? 'errors: ' + errs.length : '');
    await p.close();
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
