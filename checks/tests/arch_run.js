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
  V339: { lab: '339 1st Ave E', sub: 'I-3 · new building (Vancouver thesis site from 27 Oct)', sel: { city: 'van', tile: '1_1', id: '63819485' }, ans: { built: 'new', extent: 'whole', floor: '' } },
  E06A: { lab: '74 Airport Rd NW', sub: 'BE · new building (Edmonton thesis site, lot 1 of 2)', sel: { city: 'edm', tile: '-1_1', id: '176767' }, ans: { built: 'new', extent: 'whole', floor: '' } },
  E06B: { lab: '64 Airport Rd NW', sub: 'BE · new building (Edmonton thesis site, lot 2 of 2)', sel: { city: 'edm', tile: '-1_1', id: '146402' }, ans: { built: 'new', extent: 'whole', floor: '' } },
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
    await p.addInitScript(() => { try { localStorage.setItem('bd-tier', 'arch'); } catch (e) {} });
    await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForTimeout(7000);
    await p.evaluate(x => { window.__EX.push(x); const w = document.getElementById('welcome'); if (w) w.remove(); window.__run(window.__EX.length - 1); }, LOTS[key]);
    await p.waitForTimeout(9000);
    const shot=process.env.SHOTDIR||out;
    const r1 = await p.evaluate(async([process_mw,REF])=>{ await BD.arch.ready; BD.flow.to('aprog'); await new Promise(r=>setTimeout(r,800));
      BD.S.answers.mw=+(process_mw)||BD.S.answers.mw; BD.modelReset(); ['refuge','pool','greenhouse','clinic','spa','fish_farm','roof_solar','warming_shelter','ev_hub'].forEach(id=>BD.archTest.add(id));
      BD.arch.picks.find(q=>q.id==='refuge').opt=REF||'side_by_side';
      BD.flow.to('aarr'); await new Promise(r=>setTimeout(r,2500));
      const P=BD.archTest.place(), B=BD.archTest.budgets(P), R=BD.archTest.rules(P);
      const S=P.s; return {dbg:{a0:S.a0,uf:S.uf,uh:P.uh,dir:S.dir,v:[S.v0,S.v1],L:S.L,zoneL:P.zoneL,hd:P.hallDepth,F:[S.F.L,S.F.W],uBuild:S.M.uBuild,pyd:S.M.plantYardDepth,front:S.M.uFront,bu:P.boxes.map(b=>b.u),plant:(S.M.plant.boxes||[]).map(b=>{const L=[];for(let i=0;i<b.ring.length;i+=2)L.push(S.F.toL(b.ring[i],b.ring[i+1]));return [b.name,b.kind,Math.round(Math.min(...L.map(p=>p[0]))),Math.round(Math.max(...L.map(p=>p[0]))),Math.round(Math.min(...L.map(p=>p[1]))),Math.round(Math.max(...L.map(p=>p[1])))]}),yard:S.M.plant.yard?(()=>{const r=S.M.plant.yard,L=[];for(let i=0;i<r.length;i+=2)L.push(S.F.toL(r[i],r[i+1]));return L.map(p=>p.map(Math.round))})():null,load:S.M.loading?(()=>{const r=S.M.loading,L=[];for(let i=0;i<r.length;i+=2)L.push(S.F.toL(r[i],r[i+1]));return L.map(p=>p.map(Math.round))})():null},steps:BD.flow.steps.map(s=>s.k), bar:[...document.querySelectorAll('.flowbar [data-fg]')].map(b=>b.title), boxes:P.boxes.map(b=>[b.id,b.u.map(Math.round),b.front,Math.round(b.q.m2),Math.round(Math.abs((b.u[1]-b.u[0])*(b.v[1]-b.v[0]))*b.storeys),b.level,Math.round(b.base),Math.round(b.h)]), hall:[Math.round(P.hall.base),Math.round(P.hall.h)], space:B.space&&{hall:Math.round(B.space.hall),prog:Math.round(B.space.prog),cap:B.space.cap}, heat:{avail:B.heat.avail,need:B.heat.need,unknown:B.heat.unknown.map(u=>u.id)}, rules:R.map(r=>r.sev+': '+r.t), side:document.querySelector('#side h2').textContent}; }, [process.env.MW||'',process.env.REF||'']);
    await p.screenshot({path:path.join(shot,key+'_arr3d.png')});
    await p.evaluate(async()=>{ BD.arch.explode=true; BD.views.aarr(); await new Promise(r=>setTimeout(r,1500)); }); await p.screenshot({path:path.join(shot,key+'_explode.png')});
    await p.evaluate(async()=>{ BD.arch.view='plan'; BD.arch.heat='grad'; BD.views.aarr(); await new Promise(r=>setTimeout(r,800)); }); await p.screenshot({path:path.join(shot,key+'_plan.png')});
    await p.evaluate(async()=>{ BD.arch.view='section'; BD.arch.heat='flow'; BD.views.aarr(); await new Promise(r=>setTimeout(r,800)); }); await p.screenshot({path:path.join(shot,key+'_section.png')});
    await p.evaluate(async()=>{ document.getElementById('aSave').click(); BD.arch.secure='lot'; BD.views.aarr(); await new Promise(r=>setTimeout(r,300)); document.getElementById('aSave').click(); BD.flow.to('acmp'); await new Promise(r=>setTimeout(r,800)); });
    await p.screenshot({path:path.join(shot,key+'_compare.png')});
    r1.saved=await p.evaluate(()=>BD.arch.saved.map(x=>[x.secure,x.bad,x.notes,Math.round(x.front),x.pubShare])); r1.errors=errs; fs.writeFileSync(path.join(out, key + '_arch.json'), JSON.stringify(r1, null, 1)); console.log(key,'arch', errs.length?'errors: '+errs.join(' | '):'');
    await p.close();
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
