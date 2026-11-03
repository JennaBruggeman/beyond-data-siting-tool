// Sweep, engineering slice (3 Nov 2026): localStorage bd-tier 'full'; every step on every lot.
// Usage (from checks/tests/): NODE_PATH=<node_modules with playwright> node sweep_engineering.js <outjson> <shotdir> [lotKey ...]
// Needs the tool served at http://localhost:8766. Setup copied from golden_run.js. One browser, one page at a time.
const fs = require('fs'), path = require('path');
const NM = (process.env.NODE_PATH || '').split(':')[0];
const { chromium } = require('playwright');
const N = { built: 'new', extent: 'whole', floor: '' }, X = { built: 'existing', extent: 'whole', floor: '' };
const LOTS = {
  // the 8 golden lots
  V09: ['275 1st Ave E', 'I-3', { city: 'van', tile: '1_1', id: '63819363' }, N],
  E05: ['8803 Stadium Rd NW', 'IM', { city: 'edm', tile: '0_0', id: '51053' }, N],
  CLARK: ['1425 Clark Dr', 'I-2', { city: 'van', tile: '2_1', id: '23060741' }, N],
  E123: ['12603 123 Street NW', 'IH', { city: 'edm', tile: '-1_1', id: '883345' }, N],
  V339: ['339 1st Ave E', 'I-3', { city: 'van', tile: '1_1', id: '63819485' }, N],
  E06A: ['74 Airport Rd NW', 'BE', { city: 'edm', tile: '-1_1', id: '176767' }, N],
  E06B: ['64 Airport Rd NW', 'BE', { city: 'edm', tile: '-1_1', id: '146402' }, N],
  HAST: ['555 W Hastings', 'DD existing upper floor', { city: 'van', tile: '0_2', id: '59013407' }, { built: 'existing', extent: 'part', floor: 'upper' }],
  // Vancouver
  VI1S: ['116 8th Ave W', 'I-1 small 233 m2', { city: 'van', tile: '0_1', id: '64817976' }, N],
  VI1L: ['2450 Ontario St', 'I-1 3,066 m2', { city: 'van', tile: '0_0', id: '64818406' }, N],
  VI1C: ['360 2nd Ave W', 'I-1C', { city: 'van', tile: '0_1', id: '64017198' }, N],
  VI2S: ['1250 Frances St', 'I-2 small 310 m2', { city: 'van', tile: '2_2', id: '59422650' }, N],
  VI2L: ['1940 Glen Dr', 'I-2 large 27,240 m2', { city: 'van', tile: '1_1', id: '22263074' }, N],
  VI3S: ['670 Industrial Ave', 'I-3 1,103 m2', { city: 'van', tile: '1_1', id: '63519380' }, N],
  VFC2: ['1220 Station St', 'FC-2 3,816 m2', { city: 'van', tile: '1_1', id: '63019307' }, N],
  VM1: ['1250 45th Ave E', 'M-1 6,896 m2', { city: 'van', tile: '1_-2', id: '75822402' }, N],
  VM2L: ['570 Kent Ave South E', 'M-2 large 45,061 m2', { city: 'van', tile: '1_-4', id: '83920152' }, N],
  VIC2: ['1620 5th Ave W', 'IC-2 6,932 m2', { city: 'van', tile: '-2_1', id: '64212208' }, N],
  VIC3X: ['2050 Scotia St', 'IC-3 existing building', { city: 'van', tile: '1_1', id: '19464204' }, X],
  // Edmonton
  EBEL: ['2010 76 Avenue NW', 'BE large 50,636 m2', { city: 'edm', tile: '3_-2', id: '96523' }, N],
  EIM: ['7282 68 Street NW', 'IM 4,966 m2', { city: 'edm', tile: '1_-2', id: '975343' }, N],
  EIHS: ['9565 60 Avenue NW', 'IH under 1 ha', { city: 'edm', tile: '0_-2', id: '95140' }, N],
  EIHL: ['550 Hayter Road NW', 'IH huge 164,226 m2', { city: 'edm', tile: '3_1', id: '832080' }, N],
  EMU: ['10323 78 Avenue NW', 'MU 9,335 m2', { city: 'edm', tile: '0_-2', id: '838298' }, N],
  EDC2: ['12431 Stony Plain Road NW', 'DC2 small 924 m2', { city: 'edm', tile: '-1_0', id: '94114' }, N],
  EDCX: ['5904 51 Avenue NW', 'DC existing building', { city: 'edm', tile: '1_-3', id: '693380' }, X],
  ECMV: ['10550 102 Street NW', 'CMUV existing building', { city: 'edm', tile: '0_0', id: '822759' }, X],
};

// the checks run in the page after each step has drawn
const CHECK = `async (k)=>{ const out={k,issues:[],info:{}}; const I=(sev,what)=>out.issues.push([sev,what]);
  const sd=document.getElementById('side'); const vis=sd?sd.innerText:''; const all=sd?sd.textContent:''; out.h2=(sd&&sd.querySelector('h2')||{}).textContent||''; out.len=vis.length;
  const bad=/\\bNaN\\b|\\bundefined\\b|\\bnull\\b|\\[object|\\bInfinity\\b/;
  const ctx=(t,re)=>{ const m=re.exec(t); return m?t.slice(Math.max(0,m.index-70),m.index+50).replace(/\\s+/g,' '):''; };
  if(bad.test(vis)) I('high','visible text: '+ctx(vis,bad)); else if(bad.test(all)) I('low','hidden text (closed section): '+ctx(all,bad));
  const body=vis.replace(/^[\\s\\S]*?\\n/,''); if(vis.replace(/\\s+/g,' ').length<400) I('high','step renders empty or nearly empty ('+vis.length+' chars, h2 "'+out.h2+'")'); else if(!out.h2) I('low','step has no h2 heading (report falls back to the step name)');
  // the logic panel
  const lp=document.getElementById('wcLogic'), lb=document.getElementById('wcLogicB');
  out.logic={btn:!!lb,shown:!!(lp&&!lp.hidden&&lp.offsetParent!==null),svg:!!(lp&&lp.querySelector('svg circle')),head:lp?((lp.querySelector('.lgh')||{}).textContent||''):''};
  if(!['report'].includes(k)){ if(!out.logic.btn) I('medium','logic panel: no "The logic" button on this step'); else if(!out.logic.shown||!out.logic.svg) I('medium','logic panel does not open on this step');
    else { const m=/: (\\d+) of the (\\d+) parts/.exec(out.logic.head); if(m&&+m[1]===0) I('low','logic panel: 0 parts lit ('+out.logic.head.trim()+')'); } }
  const e=BD.eng, A=BD.S.answers; if(!e||!BD.S.sel) return out; const f=e.siteFacts(), R=e.R, M=f.M||BD.model(); const mwH=A.mw||(M&&M.mwSized)||1, mwE=A.mw||1;
  out.info.mw=A.mw; out.info.mwSized=M&&M.mwSized; out.info.ans={plantAt:A.plantAt,genAt:A.genAt,gens:A.gens,vis:A.vis,inside:A.inside,outside:A.outside};
  { const notes=(M&&M.notes)||[]; const fn=sd.querySelector('.fnote'); out.info.fnote=fn?(fn.offsetParent!==null?'shown':'folded'):'none';
    if(notes.length&&!BD.flow.stuck&&k!=='report'){ if(!fn) I('medium','set-up note (noise requirement or flag) missing from this step'); else if(fn.offsetParent===null) I('low','set-up note (noise requirement) folded under All the detail'); } }
  const hf=[...sd.querySelectorAll('.hfig b')].map(b=>b.textContent.trim());
  const fin=v=>typeof v==='number'&&isFinite(v);
  if(k==='heat'){ const r=e.calc({mw:mwH,recover:true,to:'near'},f,[],[]); const exp=e.rng(r.avail[0]/1000,r.avail[1]/1000,'GWh/yr');
    out.info.heat={shown:hf[0],exp,it:r.itMWh,avail:r.avail,homes:r.homes};
    if(!r.avail.every(fin)||!r.homes.every(fin)) I('high','heat: offered or homes not finite');
    const lo=r.avail[0]/r.itMWh, hi=r.avail[1]/r.itMWh; if(lo<0.57*4.5/3.5-1e-6||hi>0.75*1.5+1e-6||lo>hi) I('high','heat offered / IT MWh outside 0.733–1.125: '+lo.toFixed(3)+'–'+hi.toFixed(3));
    if(Math.abs(r.itMWh-mwH*8760*R.lf)>1e-6) I('high','heat: IT MWh not mw × 8,760 × LF');
    if(hf[0]!==exp) I('high','heat: shown "'+hf[0]+'" vs register formula "'+exp+'"');
    if(!/GWh/.test(vis)) I('medium','heat: no GWh figure visible'); }
  if(k==='energy'){ const fac=[mwE*R.pue[0],mwE*R.pue[1]], exp=e.rng(fac[0],fac[1],'MW'), gwh=e.rng(fac[0]*8760*R.lf/1000,fac[1]*8760*R.lf/1000,'GWh');
    out.info.energy={shown:hf.slice(0,4),exp,gwh}; if(hf[0]!==exp) I('high','energy: power shown "'+hf[0]+'" vs "'+exp+'"'); if(hf[1]!==gwh) I('high','energy: GWh shown "'+hf[1]+'" vs "'+gwh+'"');
    if(R.pue[0]<1.0||R.pue[1]>2.0||R.pue[0]>R.pue[1]) I('high','PUE range implausible '+R.pue);
    if(mwE!==mwH) I('medium','energy tab works at '+mwE+' MW while heat and people use '+mwH+' MW (A.mw not set; addons.js energyIndex mw=a.mw||1)'); }
  if(k==='water'){ out.info.water={shown:hf.slice(0,4)}; const tw=A.outside==='towers'||A.outside==='hybrid'; if(!tw&&hf[0]!=='none') I('medium','water: dry cooling but evaporation shown "'+hf[0]+'"');
    if(mwE!==mwH) I('medium','water tab works at '+mwE+' MW while heat uses '+mwH+' MW'); }
  if(k==='materials'){ const racks=BD.fmt(mwE*1000/R.kWPerRack), srv=BD.fmt(mwE*1000/0.6); out.info.mat={shown:hf.slice(0,4),racks,srv}; if(hf[0]!==racks) I('high','materials: racks "'+hf[0]+'" vs '+racks); if(hf[1]!==srv) I('high','materials: servers "'+hf[1]+'" vs '+srv);
    if(mwE!==mwH) I('medium','materials tab works at '+mwE+' MW while heat uses '+mwH+' MW'); }
  if(k==='social'){ const nc=M&&M.noise; out.info.noise=nc?{req:nc.req,flag:nc.flag,block:nc.block,short:nc.mit&&nc.mit.short,opt:nc.mit&&nc.mit.option,room:!!(nc.mit&&nc.mit.room),limit:nc.limit,worst:nc.worst,overQ:nc.overQ,overS:nc.overS,tested:nc.tested}:null;
    if(!nc) I('medium','people: no noise check result (model().noise null)');
    else { if(nc.req){ if(!nc.mit.short) I('high','noise required but no mitigation named (mit.short empty)'); else if(!vis.includes(nc.mit.short)&&!all.includes(nc.mit.short)) I('high','noise: mitigation required but not named on the People tab ('+nc.mit.short+')'); }
      if(nc.worst&&(!fin(nc.worst.lo)||!fin(nc.worst.hi))) I('high','noise: worst level not finite');
      if(nc.block&&!BD.flow.stuck) I('high','noise blocks but the walk is not stuck'); }
    }
  if(k==='fits'){ const P=M&&M.plant&&M.plant.s; if(A.gens!=='none'&&M&&M.fuel){ out.info.fuel=M.fuel; if(M.fuel.L>M.fuel.lim+0.5&&!BD.flow.stuck) I('high','roof fuel '+Math.round(M.fuel.L)+' L over '+M.fuel.lim+' L but not blocked'); }
    const expL=mwH*R.pue[1]*1000*R.fuelHours*R.fuelLkWh; out.info.fuelExp=expL; if(A.gens!=='none'&&(A.genAt||'yard')==='roof'&&expL>R.fuelLimit.low+0.5&&!BD.flow.stuck) I('high','roof generators: '+Math.round(expL)+' L of fuel (> 20,000 L NFC) and not stuck');
    if(R.fuelLimit.low!==20000) I('medium','fuel limit not 20,000 L'); }
  if(k==='opts'){ const ths=[...sd.querySelectorAll('table')]; out.info.optTables=ths.length; if(!ths.length) I('medium','three options: no table drawn');
    try{ const d=await e.loadRecv(f.city), O=e.optionSet(f,e.nearby(f,d),e.netsAt(f,d)); out.info.opts=O.map(o=>[o.id,o.mw,o.recover]); if(O.some(o=>!(o.mw>0))) I('high','an option has no size'); if(!(O[0].mw<=O[1].mw&&O[1].mw<=O[2].mw)) I('medium','option sizes not in order: '+O.map(o=>o.mw));
      if(O.some(o=>o.mw>((BD.fitMax&&BD.fitMax())||1e9)+0.05)) I('medium','an option is larger than the largest size that fits ('+O.map(o=>o.mw)+' vs '+(BD.fitMax&&BD.fitMax())+')'); }catch(err){ I('medium','options check threw: '+err.message); } }
  if(k==='time'){ if(!/20[2-9]0s|2050|years/.test(vis)) I('low','over time: no horizon named'); }
  return out; }`;

(async () => {
  const outFile = process.argv[2] || 'sweep_engineering.json', shotDir = process.argv[3] || 'shots'; fs.mkdirSync(shotDir, { recursive: true });
  const keys = process.argv.slice(4).length ? process.argv.slice(4) : Object.keys(LOTS);
  const res = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell', args: ['--use-gl=swiftshader', '--enable-webgl'] });
  for (const key of keys) {
    const [lab, sub, sel, ans] = LOTS[key]; const R = { key, lab, sub, steps: [], pageErrors: [], console: [], t0: Date.now() };
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); let cur = 'load';
    p.on('pageerror', e => R.pageErrors.push([cur, e.message.slice(0, 300)]));
    p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') { const t = m.text(); if (!/Failed to load resource|fonts\.g|ERR_FAILED|d3/.test(t)) R.console.push([cur, m.type(), t.slice(0, 300)]); } });
    const local = (re, file, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, file)), contentType: type }));
    await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript');
    await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
    await local(/jspdf\.umd/, 'jspdf/dist/jspdf.umd.min.js', 'application/javascript');
    await local(/autotable/, 'jspdf-autotable/dist/jspdf.plugin.autotable.min.js', 'application/javascript');
    await p.route(/flow\.js/, async r => { const res = await r.fetch(); let t = await res.text();
      t = t.replace('const EXAMPLES=[', 'const EXAMPLES=window.__EX=[').replace('async function runExample(i){', 'window.__run=runExample; async function runExample(i){');
      r.fulfill({ response: res, body: t }); });
    await p.route(/fonts\.(googleapis|gstatic)|d3/, r => r.abort());
    await p.addInitScript(() => { try { localStorage.setItem('bd-tier', 'full'); localStorage.setItem('bd-logic', '1'); } catch (e) {} });
    try {
      await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForTimeout(6000);
      cur = 'select';
      await p.evaluate(x => { window.__EX.push(x); const w = document.getElementById('welcome'); if (w) w.remove(); return window.__run(window.__EX.length - 1); }, { lab, sub, sel, ans });
      await p.waitForTimeout(5000);
      R.selected = await p.evaluate(() => !!BD.S.sel && { id: BD.S.sel.id, lot: BD.S.sel.lotArea, zone: BD.eng.siteFacts().zone, mw: BD.S.answers.mw, fitMax: BD.fitMax ? BD.fitMax() : null, problems: BD.setupProblems ? BD.setupProblems() : [], ans: Object.assign({}, BD.S.answers) });
      if (!R.selected) { R.fatal = 'lot did not select'; throw new Error('noselect'); }
      // walk every step the full template walks; the list grows at Opportunities
      let i = 1, guard = 0;
      while (guard++ < 80) {
        const st = await p.evaluate(() => { const F = BD.flow; return { n: F.steps.length, i: F.i, k: F.steps[F.i] && F.steps[F.i].k, t: F.steps[F.i] && F.steps[F.i].t }; });
        if (st.i >= st.n - 1 && st.k === 'report') break;
        cur = 'go ' + i;
        const t0 = Date.now();
        await p.evaluate(async i => { await BD.flow.go(i); }, i).catch(e => R.pageErrors.push([cur, 'go threw: ' + e.message.slice(0, 200)]));
        await p.waitForTimeout(1200);
        // wait until the panel is stable (heat and report draw asynchronously)
        let last = '', same = 0; for (let w = 0; w < 30 && same < 2; w++) { const tx = await p.evaluate(() => { const s = document.getElementById('side'); return s ? s.innerText.length + '|' + ((s.querySelector('h2') || {}).textContent || '') : ''; }); if (tx === last && !/Drawing|Working out/.test(tx)) same++; else same = 0; last = tx; await p.waitForTimeout(500); }
        const now = await p.evaluate(() => { const F = BD.flow; return { i: F.i, k: F.steps[F.i].k, t: F.steps[F.i].t, stuck: !!F.stuck, n: F.steps.length }; });
        cur = now.k;
        if (now.k === 'report') break;
        const c = await p.evaluate(`(${CHECK})(${JSON.stringify(now.k.startsWith('fam:') ? 'fam' : now.k)})`).catch(e => ({ k: now.k, issues: [['high', 'check threw: ' + e.message.slice(0, 200)]] }));
        c.k = now.k; c.t = now.t; c.stuck = now.stuck; c.ms = Date.now() - t0;
        if (c.ms > 30000) c.issues.push(['low', 'step took ' + Math.round(c.ms / 1000) + ' s to draw']);
        // the water make-up range, with towers and hybrids (restored after)
        if (now.k === 'water') {
          c.towers = await p.evaluate(async () => { const A = BD.S.answers, e = BD.eng, R = e.R, keep = A.outside, F = BD.flow, sig = F.sig, out = []; const mw = A.mw || 1;
            for (const o of ['towers', 'hybrid']) { A.outside = o; BD.modelReset && BD.modelReset(); BD.tabView('water'); await new Promise(r => setTimeout(r, 400));
              const hf = [...document.querySelectorAll('#side .hfig b')].map(b => b.textContent.trim()); const f = e.siteFacts(); const MWh = [mw * R.pue[0] * 8760 * R.lf, mw * R.pue[1] * 8760 * R.lf], w = o === 'hybrid' ? ({ van: 0.124, edm: 0.104 })[f.city] : 1;
              const ev = MWh[1] * 1.5 * w, mk = [MWh[0] * 1.5 * w * 1.2, ev * 2]; const vis = document.getElementById('side').innerText;
              out.push({ o, hf, expEvap: BD.fmt(ev), expMk: BD.fmt(mk[0]) + '–' + BD.fmt(mk[1]) + ' m³', bad: /\bNaN\b|undefined|\[object/.test(vis), mkRatio: [mk[0] / ev, mk[1] / ev] }); }
            A.outside = keep; BD.modelReset && BD.modelReset(); BD.tabView('water'); await new Promise(r => setTimeout(r, 300)); F.sig = sig; return out; });
          for (const t of c.towers) { if (t.hf[0] !== t.expEvap + ' m³') c.issues.push(['high', `water ${t.o}: evaporated "${t.hf[0]}" vs ${t.expEvap} m³`]); if (t.hf[1] !== t.expMk) c.issues.push(['high', `water ${t.o}: make-up "${t.hf[1]}" vs ${t.expMk}`]); if (t.bad) c.issues.push(['high', `water ${t.o}: NaN/undefined in text`]); }
        }
        if (c.issues.some(x => x[0] === 'high' || x[0] === 'medium')) { const fn = path.join(shotDir, `${key}_${String(now.i).padStart(2, '0')}_${now.k.replace(/[^a-z0-9]+/gi, '_')}.png`); await p.screenshot({ path: fn }); c.shot = fn; }
        R.steps.push(c);
        i = now.i + 1; if (i >= now.n) break;
      }
      // the report and its PDF
      cur = 'report';
      const t0 = Date.now();
      await p.evaluate(async () => { const k = BD.flow.steps.findIndex(s => s.k === 'report'); await BD.flow.go(k); });
      let ok = false; for (let w = 0; w < 60; w++) { ok = await p.evaluate(() => document.querySelectorAll('#side .rpage').length > 0); if (ok) break; await p.waitForTimeout(1000); }
      const rep = await p.evaluate(() => { const sd = document.getElementById('side'); const pg = [...sd.querySelectorAll('.rpage')]; const tx = pg.map(x => x.textContent).join(' '); const m = /\bNaN\b|\bundefined\b|\[object|\bInfinity\b/.exec(tx);
        return { pages: pg.length, lead: (sd.querySelector('.lead') || {}).textContent, bad: m ? tx.slice(Math.max(0, m.index - 80), m.index + 40) : null, nul: /\bnull\b/.test(tx) ? tx.slice(Math.max(0, tx.search(/\bnull\b/) - 80), tx.search(/\bnull\b/) + 40) : null, btn: !!document.getElementById('rPdf') }; });
      rep.ms = Date.now() - t0; rep.issues = [];
      if (!ok) rep.issues.push(['high', 'report pages did not draw in 60 s']);
      if (rep.bad) rep.issues.push(['high', 'report page text: ' + rep.bad]); if (rep.nul) rep.issues.push(['medium', 'report page text has "null": ' + rep.nul]);
      cur = 'pdf';
      const pdf = await p.evaluate(async () => { const t = Date.now(); try { const D = await BD.report3.collect(); const P = await BD.report3.pages(D); const blob = await BD.report3.pdf(D, P); const head = new Uint8Array(await blob.slice(0, 5).arrayBuffer()); return { ok: true, size: blob.size, pages: P.length, head: String.fromCharCode(...head), ms: Date.now() - t, tier: D.tier }; } catch (e) { return { ok: false, err: String(e && e.message || e), ms: Date.now() - t }; } });
      rep.pdf = pdf; if (!pdf.ok) rep.issues.push(['high', 'PDF build threw: ' + pdf.err]); else if (pdf.head !== '%PDF-' || pdf.size < 20000) rep.issues.push(['high', 'PDF looks wrong: ' + pdf.size + ' bytes, head ' + pdf.head]);
      if (pdf.ok && pdf.tier !== 'full') rep.issues.push(['medium', 'report tier is ' + pdf.tier + ', not full']);
      if (rep.issues.length) { const fn = path.join(shotDir, `${key}_report.png`); await p.screenshot({ path: fn }); rep.shot = fn; }
      R.report = rep;
    } catch (e) { if (e.message !== 'noselect') R.fatal = (R.fatal || '') + e.message.slice(0, 300); }
    R.ms = Date.now() - R.t0; res[key] = R; fs.writeFileSync(outFile, JSON.stringify(res, null, 1));
    const n = R.steps.reduce((t, s) => t + s.issues.length, 0) + ((R.report && R.report.issues.length) || 0);
    console.log(key, R.fatal ? 'FATAL ' + R.fatal : '', 'steps', R.steps.length, 'issues', n, 'pageErrors', R.pageErrors.length, 'console', R.console.length, Math.round(R.ms / 1000) + 's');
    await p.close();
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
