// Bug sweep, resident slice (3 Nov 2026): localStorage bd-tier 'resident', every step of the guided flow on every lot.
// Checks: assumed answers shown and changeable; nothing above what fits is offered; plant placement legal (setbacks, yards, height); the report builds.
// Usage (from checks/tests/): NODE_PATH=<node_modules with playwright> node sweep_resident.js <outdir> [lotKey ...]
// Needs the tool served at http://localhost:8766. One browser, one page at a time.
const fs = require('fs'), path = require('path');
const NM = (process.env.NODE_PATH || '').split(':')[0];
const { chromium } = require('playwright');

const G = (lab, sub, city, tile, id, ans) => ({ lab, sub, sel: { city, tile, id }, ans: ans || { built: 'new', extent: 'whole', floor: '' } });
const LOTS = {
  // the 8 golden lots
  V09: G('275 1st Ave E', 'I-3 golden', 'van', '1_1', '63819363'),
  E05: G('8803 Stadium Rd NW', 'IM golden', 'edm', '0_0', '51053'),
  CLARK: G('1425 Clark Dr', 'I-2 golden', 'van', '2_1', '23060741'),
  E123: G('12603 123 Street NW', 'IH golden', 'edm', '-1_1', '883345'),
  V339: G('339 1st Ave E', 'I-3 golden thesis', 'van', '1_1', '63819485'),
  E06A: G('74 Airport Rd NW', 'BE golden thesis 1', 'edm', '-1_1', '176767'),
  E06B: G('64 Airport Rd NW', 'BE golden thesis 2', 'edm', '-1_1', '146402'),
  HAST: G('555 W Hastings', 'existing upper floor golden', 'van', '0_2', '59013407', { built: 'existing', extent: 'part', floor: 'upper' }),
  // Vancouver, every zone
  VFC2L: G('1220 Station St', 'FC-2 3,816 m²', 'van', '1_1', '63019307'),
  VFC2S: G('260 Northern St', 'FC-2 713 m²', 'van', '1_1', '63319127'),
  VI1C: G('360 2nd Ave W', 'I-1C 1,648 m²', 'van', '0_1', '64017198'),
  VI1: G('5 4th Ave W', 'I-1 (assumed I-2) 4,207 m²', 'van', '0_1', '64218207'),
  VI2S: G('1239 Odlum Dr', 'I-2 1,291 m² small', 'van', '2_1', '60723093'),
  VI2L: G('250 70th Ave W', 'I-2 112,529 m² large', 'van', '0_-4', '17283096'),
  VI3S: G('370 Prior St', 'I-3 381 m² tiny', 'van', '1_1', '60019276'),
  VI3L: G('320 Industrial Ave', 'I-3 51,077 m² large', 'van', '1_1', '63519324'),
  VM1: G('1250 45th Ave E', 'M-1 (assumed) 6,896 m²', 'van', '1_-2', '75822402'),
  VM2: G('1376 Powell St', 'M-2 (assumed) 624 m²', 'van', '2_2', '58023086'),
  VIC3: G('2050 Scotia St', 'IC-3 (assumed) 4,974 m²', 'van', '1_1', '19464204'),
  // Edmonton, every zone
  EBEM: G('7545 52 Street NW', 'BE 5,479 m²', 'edm', '2_-2', '1046283'),
  EBEL: G('250 Karl Clark Rd NW', 'BE 633,168 m² very large', 'edm', '0_-5', '129583'),
  EIMM: G('3911 78 Avenue NW', 'IM 4,936 m²', 'edm', '2_-2', '129826'),
  EIHM: G('12410 67 Street NW', 'IH 4,152 m²', 'edm', '1_1', '59725'),
  EIHL: G('12225 17 Street NW', 'IH 459,878 m² large', 'edm', '3_1', '488511'),
  EMU: G('13022 82 Street NW', 'MU (assumed IM) 641 m²', 'edm', '0_2', '72713'),
  EDC2: G('708 Wilkin Close NW', 'DC2 (assumed) 1,020 m²', 'edm', '-3_-2', '626510'),
  EAJ: G('11400 University Ave NW', 'AJ (assumed) 5,921 m²', 'edm', '-1_-1', '88509'),
};

const BAD = /\bNaN\b|\bundefined\b|\bnull\b|\[object|\bInfinity\b/;

// in-page helpers, installed once per page
const HELPERS = `(()=>{
window.__sw={
  txt(el){ return el?(el.innerText||el.textContent||''):''; },
  bad(t){ const re=${BAD}; const out=[]; const lines=String(t).split(/\\n/); for(const l of lines){ const m=l.match(re); if(m) out.push(l.trim().slice(0,220)); } return out.slice(0,8); },
  _fc:{},
  fit(){ const A=Object.assign({},BD.S.answers); delete A.resNote; delete A.setupDone; const k=JSON.stringify(A)+(BD.S.sel&&BD.S.sel.id); if(k in this._fc) return this._fc[k];
    try{ BD.modelReset&&BD.modelReset(); const v=BD.fitMax?BD.fitMax():null; BD.modelReset&&BD.modelReset(); BD.model(); this._fc[k]=v; return v; }catch(e){ return 'ERR '+e.message; } },
  probs(){ try{ return BD.setupProblems?BD.setupProblems():[]; }catch(e){ return ['ERR '+e.message]; } },
  ans(){ const A=BD.S.answers; return {mw:A.mw,mwPick:A.mwPick,plantAt:A.plantAt,genAt:A.genAt,gens:A.gens,vis:A.vis,inside:A.inside,outside:A.outside,resPlant:A.resPlant,resNote:A.resNote,residentEdit:A.residentEdit,built:A.built}; },
  // plant placement legality, measured from the model's own geometry
  legal(){ const m=BD.model(); if(!m||!m.plant||!m.F) return {none:true}; const F=m.F, Z=m.Z, P=m.plant, out={issues:[],info:{}};
    const lb=r=>{ let a=1e9,b=-1e9,c=1e9,d=-1e9; for(let i=0;i<r.length;i+=2){ const [u,v]=F.toL(r[i],r[i+1]); a=Math.min(a,u); b=Math.max(b,u); c=Math.min(c,v); d=Math.max(d,v); } return [a,b,c,d]; };
    const pts=r=>{ const p=[]; for(let i=0;i<r.length;i+=2) p.push([r[i],r[i+1]]); return p; };
    const shrink=(r,e)=>{ const p=pts(r), cx=p.reduce((s,q)=>s+q[0],0)/p.length, cy=p.reduce((s,q)=>s+q[1],0)/p.length; return p.map(([x,y])=>{ const dx=cx-x, dy=cy-y, L=Math.hypot(dx,dy)||1; return [x+dx/L*e, y+dy/L*e]; }); };
    const segD=(px,py,ax,ay,bx,by)=>{ const dx=bx-ax, dy=by-ay, L2=dx*dx+dy*dy; let t=L2?((px-ax)*dx+(py-ay)*dy)/L2:0; t=Math.max(0,Math.min(1,t)); return Math.hypot(px-ax-t*dx,py-ay-t*dy); };
    const edgeD=(x,y,r)=>{ let d=1e9; for(let i=0;i<r.length;i+=2){ const j=(i+2)%r.length; d=Math.min(d,segD(x,y,r[i],r[i+1],r[j],r[j+1])); } return d; };
    const roofRing=m.sizedTo&&m.serverFoot?m.serverFoot:m.foot; const roofH=m.existing?(m.roofH||m.H):m.H;
    const ins=m.inset?lb(m.inset):null; const lotRings=(BD.S.sel.rings&&BD.S.sel.rings.length?BD.S.sel.rings:[m.ring]);
    out.info={zone:Z.zone,key:Z.key,assumed:Z.assumed,hLim:Z.hOutright,H:m.H,roofH,existing:!!m.existing,yards:Z.yards,nRoof:0,nYard:0,maxTop:0,kinds:{}};
    if(!m.existing&&m.H>Z.hOutright+0.01&&m.hmode!=='conditional') out.issues.push('building '+m.H.toFixed(1)+' m above outright '+Z.hOutright+' m');
    for(const b of (P.boxes||[])){ const c=shrink(b.ring,0.05); out.info.kinds[b.name]=(out.info.kinds[b.name]||0)+1;
      if(!c.every(([x,y])=>lotRings.some(r=>BD.pip(x,y,r)))) out.issues.push(b.kind+' '+b.name+' outside the lot');
      if(b.kind==='yard'){ out.info.nYard++;
        if(ins&&Z.yards){ const [a,bb,cc,d]=lb(b.ring); if(a<ins[0]-0.02||bb>ins[1]+0.02||cc<ins[2]-0.02||d>ins[3]+0.02) out.issues.push('yard '+b.name+' inside a required yard (unit u '+a.toFixed(1)+'..'+bb.toFixed(1)+' v '+cc.toFixed(1)+'..'+d.toFixed(1)+'; allowed u '+ins[0].toFixed(1)+'..'+ins[1].toFixed(1)+' v '+ins[2].toFixed(1)+'..'+ins[3].toFixed(1)+')'); }
        const onB=(m.existing?(m.feet||[]).map(f=>f.r):[roofRing].filter(Boolean)).some(r=>c.some(([x,y])=>BD.pip(x,y,r)));
        if(onB) out.issues.push('yard '+b.name+' overlaps the building');
        if(m.loading&&c.some(([x,y])=>BD.pip(x,y,m.loading))) out.issues.push('yard '+b.name+' overlaps loading');
        if(b.base!==0) out.issues.push('yard unit base '+b.base);
      } else { out.info.nRoof++;
        if(roofRing&&!c.every(([x,y])=>BD.pip(x,y,roofRing))) out.issues.push('roof '+b.name+' off the roof');
        const top=b.base+b.h; out.info.maxTop=Math.max(out.info.maxTop,top); }
      if(/tower|hybrid/.test(b.name)){ const dmin=Math.min(...pts(b.ring).map(([x,y])=>Math.min(...lotRings.map(r=>edgeD(x,y,r))))); if(dmin<3-0.02) out.issues.push(b.name+' '+dmin.toFixed(2)+' m from lot line (<3 m, NBC 6.3.2.15(5))'); }
    }
    // yard units overlapping each other
    const yb=(P.boxes||[]); for(let i=0;i<yb.length;i++) for(let j=i+1;j<yb.length;j++){ if(yb[i].kind!==yb[j].kind) continue; const ci=shrink(yb[i].ring,0.05); if(ci.some(([x,y])=>BD.pip(x,y,yb[j].ring))) { out.issues.push('units overlap: '+yb[i].name+' / '+yb[j].name); i=yb.length; break; } }
    out.info.screenH=m.noise&&m.noise.mit?JSON.stringify(m.noise.mit).slice(0,120):'';
    out.info.roofTopOverLimit=out.info.nRoof?(out.info.maxTop-Z.hOutright):null;
    out.info.miss=P.miss||[]; out.info.indoor=P.indoor||0;
    return out; },
};
})()`;

async function settle(p, ms) { await p.waitForTimeout(ms); }

(async () => {
  const out = process.argv[2] || 'sweep_resident_out'; fs.mkdirSync(out, { recursive: true });
  const shots = process.env.SHOTDIR || out; fs.mkdirSync(shots, { recursive: true });
  const keys = process.argv.slice(3).length ? process.argv.slice(3) : Object.keys(LOTS);
  if (process.env.SWITCH) return switchTest(out);
  if (process.env.PROBE) return probe(out);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell', args: ['--use-gl=swiftshader', '--enable-webgl'] });
  for (const key of keys) {
    const L = LOTS[key]; const R = { key, lab: L.lab, sub: L.sub, steps: [], setup: {}, errors: [], console: [], report: null, best: null };
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    let stepNow = 'load';
    p.on('pageerror', e => R.errors.push({ step: stepNow, msg: e.message, stack: (e.stack || '').split('\n').slice(0, 3).join(' | ') }));
    p.on('console', m => { if (m.type() === 'error') R.console.push({ step: stepNow, msg: m.text().slice(0, 300) }); });
    const local = (re, file, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, file)), contentType: type }));
    await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript');
    await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
    await local(/jspdf\.umd/, 'jspdf/dist/jspdf.umd.min.js', 'application/javascript');
    await local(/autotable/, 'jspdf-autotable/dist/jspdf.plugin.autotable.min.js', 'application/javascript');
    await p.route(/fonts\.(googleapis|gstatic)|d3/, r => r.abort());
    await p.addInitScript(() => { try { localStorage.setItem('bd-tier', 'resident'); } catch (e) {}
      window.__saved = []; window.claude = { use: async n => n === 'downloads' ? { save: async o => { window.__saved.push({ filename: o.filename, size: o.data && o.data.size }); } } : null }; });
    const shot = async (tag) => { const f = path.join(shots, `${key}_${tag}.png`.replace(/[^A-Za-z0-9_.-]/g, '_')); try { await p.screenshot({ path: f }); } catch (e) {} return f; };
    try {
      await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await settle(p, 6000);
      await p.evaluate(HELPERS);
      stepNow = 'select';
      await p.evaluate(async x => { const w = document.getElementById('welcome'); if (w) w.remove(); Object.assign(BD.S.answers, x.ans);
        if (BD.S.city !== x.sel.city) await BD.setCity(x.sel.city, true); await BD.select(Object.assign({}, x.sel)); }, L);
      await settle(p, 3500);
      // ---------- set-up (residents' assumed answers) ----------
      stepNow = 'setup';
      const su = await p.evaluate(() => { const sd = document.getElementById('side'); const rs = sd.querySelector('.rset'); const A = BD.S.answers;
        const rows = [...sd.querySelectorAll('ul.assumed li')].map(li => [li.querySelector('.aq') && li.querySelector('.aq').textContent, li.querySelector('.aa') && li.querySelector('.aa').textContent]);
        const fm = __sw.fit();
        return { k: BD.flow.steps[BD.flow.i].k, rset: !!rs, h2: (sd.querySelector('h2') || {}).textContent, rows, pw: [...sd.querySelectorAll('[data-pw]')].map(b => [b.dataset.pw, b.getAttribute('aria-checked')]),
          szBtns: sd.querySelectorAll('[data-sz]').length, rN: sd.querySelector('#rN') ? [sd.querySelector('#rN').disabled, sd.querySelector('#rN').textContent] : null,
          fNext: sd.querySelector('#fNext') ? [sd.querySelector('#fNext').disabled, sd.querySelector('#fNext').textContent] : null,
          twoNavs: !!(sd.querySelector('.dnav') && sd.querySelector('.flowfoot')), rFit: sd.querySelector('#rFit') ? sd.querySelector('#rFit').textContent : null,
          fstuck: [...sd.querySelectorAll('.fstuck li')].map(x => x.textContent), dwarn: (sd.querySelector('.dwarn') || {}).textContent || null,
          tierSel: !!document.getElementById('tierSel'), ans: __sw.ans(), fitMax: fm, probs: __sw.probs(), legal: __sw.legal(), bad: __sw.bad(__sw.txt(sd)), text: __sw.txt(sd).slice(0, 2500) }; });
      R.setup.first = su;
      if (su.bad.length) await shot('setup_bad');
      // roof / yard toggles
      for (const w of ['roof', 'yard']) {
        const t = await p.evaluate(async w => { const keep = JSON.parse(JSON.stringify(BD.S.answers)); const b = document.querySelector(`#side [data-pw="${w}"]`); if (!b) return { none: true };
          const t0 = performance.now(); b.click(); const ms = Math.round(performance.now() - t0); await new Promise(r => setTimeout(r, 1200)); const sd = document.getElementById('side');
          const res = { ms, pw: [...sd.querySelectorAll('[data-pw]')].map(b => [b.dataset.pw, b.getAttribute('aria-checked')]), ans: __sw.ans(), fitMax: __sw.fit(), probs: __sw.probs(), legal: __sw.legal(),
            rN: sd.querySelector('#rN') ? [sd.querySelector('#rN').disabled, sd.querySelector('#rN').textContent] : null, rFit: sd.querySelector('#rFit') ? sd.querySelector('#rFit').textContent : null,
            note: [...sd.querySelectorAll('.rset p.sub')].map(x => x.textContent).find(t => /Cooling units and backup/.test(t)) || '', dwarn: (sd.querySelector('.dwarn') || {}).textContent || null, bad: __sw.bad(__sw.txt(sd)) };
          window.__keep = keep; return res; }, w);
        R.setup[w] = t;
        if (t.rN && t.rN[0]) await shot('setup_' + w + '_blocked');
      }
      // back to the defaults the tool assumed (as a resident who does not touch roof/yard)
      await p.evaluate(async () => { const A = BD.S.answers; Object.keys(A).forEach(k => delete A[k]); Object.assign(A, window.__keep); delete A.resPlant; delete A.resNote; BD.modelReset(); BD.residentCard(); await new Promise(r => setTimeout(r, 900)); });
      // if blocked, use the largest-size button (the way out residents are offered)
      let blocked = await p.evaluate(() => { const b = document.querySelector('#side #rN'); return !b || b.disabled; });
      if (blocked) { const fx = await p.evaluate(async () => { const f = document.querySelector('#side #rFit'); if (!f) return 'no #rFit'; f.click(); await new Promise(r => setTimeout(r, 1200)); const b = document.querySelector('#side #rN'); return b && !b.disabled ? 'fixed by rFit' : 'still blocked: ' + __sw.probs().join(' | '); });
        R.setup.fix = fx; blocked = !/^fixed/.test(fx);
        if (blocked) { // the flow foot's "Find a set-up that fits" (shown when no size fits)
          const ff = await p.evaluate(async () => { const f = document.querySelector('#side #fFind'); if (!f) return 'no #fFind'; const t0 = performance.now(); f.click(); const ms = Math.round(performance.now() - t0); await new Promise(r => setTimeout(r, 2500));
            const n = document.querySelector('#side #rN'), sd = document.getElementById('side'); return (n && !n.disabled ? 'fixed by fFind' : 'fFind did not fix (' + (f.textContent || '') + ')') + ' in ' + ms + ' ms; now ' + JSON.stringify(__sw.ans()) + '; rset ' + !!sd.querySelector('.rset') + '; fstuck ' + [...sd.querySelectorAll('.fstuck li')].map(x => x.textContent.slice(0, 80)).join(' | '); });
          R.setup.fix += ' -> ' + ff; if (/^fixed/.test(ff)) blocked = false; }
        if (blocked) { // try the yard/roof switches as a resident would
          for (const w of ['yard', 'roof']) { const ok = await p.evaluate(async w => { const b = document.querySelector(`#side [data-pw="${w}"]`); if (!b) return false; b.click(); await new Promise(r => setTimeout(r, 1200)); const f = document.querySelector('#side #rFit'); if (f) { f.click(); await new Promise(r => setTimeout(r, 1200)); } const n = document.querySelector('#side #rN'); return !!(n && !n.disabled); }, w);
            if (ok) { R.setup.fix += ' -> fixed by ' + w; blocked = false; break; } }
        }
        if (blocked) { await shot('setup_stuck'); R.setup.stuckText = await p.evaluate(() => __sw.txt(document.getElementById('side')).slice(0, 1500)); }
      }
      R.setup.used = await p.evaluate(() => { const sd = document.getElementById('side'); return { ans: __sw.ans(), fitMax: __sw.fit(), probs: __sw.probs(), legal: __sw.legal(),
        rows: [...sd.querySelectorAll('ul.assumed li')].map(li => [li.querySelector('.aq') && li.querySelector('.aq').textContent, li.querySelector('.aa') && li.querySelector('.aa').textContent]),
        pw: [...sd.querySelectorAll('[data-pw]')].map(b => [b.dataset.pw, b.getAttribute('aria-checked')]), rset: !!sd.querySelector('.rset'),
        how: ([...sd.querySelectorAll('.rset p.sub')].map(x => x.textContent).find(t => /MW of servers/.test(t)) || '').slice(0, 300), bad: __sw.bad(__sw.txt(sd)) }; });
      if (!blocked) {
        await p.evaluate(() => document.querySelector('#side #rN').click());
        for (let n = 0; n < 45; n++) {
          const k0 = await p.evaluate(() => BD.flow.steps[BD.flow.i].k); stepNow = k0;
          await settle(p, /^(opps-best|fam:|spec|report)/.test(k0) ? 5000 : 2200);
          const s = await p.evaluate(() => { const F = BD.flow, sd = document.getElementById('side'); const st = F.steps[F.i]; const t = __sw.txt(sd);
            const rng = sd.querySelector('#mw'); let slider = null; if (rng && rng.offsetParent !== null) { const ST = BD.eng.R.steps; slider = { max: ST[+rng.max], value: +rng.value, mw: BD.S.answers.mw }; }
            const mwBtns = [...sd.querySelectorAll('button')].map(b => b.textContent).filter(x => /\d\s*MW/.test(x));
            return { k: st.k, t: st.t, h2: (sd.querySelector('h2') || {}).textContent || '', len: t.trim().length, bad: __sw.bad(t), stuck: !!F.stuck, fstuck: [...sd.querySelectorAll('.fstuck li')].map(x => x.textContent),
              next: sd.querySelector('#fNext') ? [sd.querySelector('#fNext').disabled, sd.querySelector('#fNext').textContent] : null, slider, mwBtns, ans: __sw.ans(), fitMax: __sw.fit(),
              secs: sd.querySelectorAll('details.sec').length, hiddenSecs: [...sd.querySelectorAll('details.sec')].filter(d => d.hidden).length, empty: t.replace(/Steps[\s\S]*?of \d+/, '').trim().length < 80,
              sizeTxt: (t.match(/Size to test[^\n]*/) || [''])[0], i: F.i, n: F.steps.length }; });
          R.steps.push(s);
          if (s.bad.length || s.empty || s.stuck) await shot('step_' + s.k + (s.stuck ? '_stuck' : s.empty ? '_empty' : '_bad'));
          if (s.k === 'opps-best') { R.best = await p.evaluate(() => { // read the offered set-ups off the page, then test each one (3 fitMax runs, not the tool's 243)
              const D = BD.deck.DECK, A = BD.S.answers, keep = JSON.parse(JSON.stringify(A)), res = [];
              const vOf = (id, t) => { const d = D.find(x => x.id === id); const o = d && d.opts(BD.model()).find(x => x.t === t); return o ? o.v : null; };
              for (const card of document.querySelectorAll('#side .bestset')) { const kv = {}; const dts = [...card.querySelectorAll('dt')]; dts.forEach(dt => kv[dt.textContent] = dt.nextElementSibling ? dt.nextElementSibling.textContent : '');
                const x = { inside: vOf('inside', kv['Servers cooled by']), outside: vOf('outside', kv['Heat leaves by']), plantAt: vOf('plantAt', kv['Plant']), gensT: kv['Backup power'], mw: parseFloat(kv['Size']) };
                Object.keys(A).forEach(k => delete A[k]); Object.assign(A, JSON.parse(JSON.stringify(keep)));
                for (const id of ['inside', 'outside', 'plantAt']) { const d = D.find(q => q.id === id); if (x[id] && d && (!d.when || d.when(A))) d.set(A, x[id]); }
                if (x.gensT === 'No generators') { const d = D.find(q => q.id === 'gens'); d.set(A, 'none'); } else { const v = vOf('gens', x.gensT); const d = D.find(q => q.id === 'gens'); if (v) d.set(A, v); else x.gensUnmapped = true; }
                A.mw = x.mw; BD.modelReset(); x.probs = __sw.probs(); x.legal = __sw.legal().issues; x.fitMax = __sw.fit(); x.kv = kv; res.push(x); }
              Object.keys(A).forEach(k => delete A[k]); Object.assign(A, keep); BD.modelReset(); BD.model(); return { top: res }; }); }
          if (s.k === 'report') break;
          const adv = await p.evaluate(() => { const b = document.querySelector('#side #fNext'); if (!b) return 'no next'; if (b.disabled) return 'disabled'; b.click(); return 'ok'; });
          if (adv !== 'ok') { R.steps[R.steps.length - 1].advance = adv; await shot('step_' + s.k + '_noadvance'); break; }
        }
        // ---------- the report ----------
        stepNow = 'report';
        const last = R.steps[R.steps.length - 1];
        if (last && last.k === 'report') {
          await settle(p, 6000);
          R.report = await p.evaluate(async () => { const sd = document.getElementById('side'); const pages = [...sd.querySelectorAll('.rpage')]; const t = pages.map(x => x.textContent).join('\n');
            const res = { pages: pages.length, emptyPages: pages.filter(x => (x.textContent || '').trim().length < 60).length, bad: __sw.bad(t.replace(/\s{2,}/g, '\n')), drawing: /Drawing the report/.test(sd.textContent), lead: (sd.querySelector('.lead') || {}).textContent || '',
              plan: (BD.TPL && BD.TPL.reports && BD.TPL.reports.resident || []).map(p => p.id), pdfBtn: !!sd.querySelector('#rPdf') };
            // the "Chosen for you" fact and the facts table
            try { const D = BD.flow.reportData(); res.facts = D.facts; res.left = D.left.length; res.groups = D.groups.map(g => g.g + ':' + g.items.map(i => i.k).join(',')); } catch (e) { res.dataErr = e.message; }
            const pb = sd.querySelector('#rPdf'); if (pb) { pb.click(); for (let i = 0; i < 120; i++) { await new Promise(r => setTimeout(r, 500)); const m = (document.getElementById('rMsg') || {}).textContent || ''; if (/Saved|not saved|Not saved/.test(m)) { res.pdfMsg = m; break; } } res.saved = window.__saved.slice(); }
            return res; });
          if (R.report.bad.length || R.report.emptyPages || !R.report.saved || !R.report.saved.length) await shot('report_issue');
        }
      }
    } catch (e) { R.fatal = e.message; await shot('fatal'); }
    fs.writeFileSync(path.join(out, key + '.json'), JSON.stringify(R, null, 1));
    console.log(key, 'steps', R.steps.length, 'errs', R.errors.length, 'console', R.console.length, R.fatal ? 'FATAL ' + R.fatal : '', R.setup.fix || '', R.report ? 'report pages ' + R.report.pages + ' ' + (R.report.pdfMsg || '') : 'no report');
    await p.close();
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });

// SWITCH=1: one page, lots picked one after another (the residents' state carried between lots), the fits slider, and "Use this set-up"
async function switchTest(out) {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell', args: ['--use-gl=swiftshader', '--enable-webgl'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const R = { errors: [], seq: [] };
  p.on('pageerror', e => R.errors.push(e.message));
  const local = (re, file, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, file)), contentType: type }));
  await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript'); await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
  await p.route(/fonts\.(googleapis|gstatic)|d3/, r => r.abort());
  await p.addInitScript(() => { try { localStorage.setItem('bd-tier', 'resident'); } catch (e) {} });
  await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForTimeout(6000); await p.evaluate(HELPERS);
  const card = (tag) => p.evaluate(tag => { const sd = document.getElementById('side'); return { tag, sel: BD.S.sel && BD.S.sel.id, step: BD.flow.steps[BD.flow.i].k, rset: !!sd.querySelector('.rset'), h2: (sd.querySelector('h2') || {}).textContent,
    how: ([...sd.querySelectorAll('.rset p.sub')].map(x => x.textContent).find(t => /MW of servers|zone allows/.test(t)) || '').slice(0, 200), ans: __sw.ans(), mwSite: BD.S.answers.mwSite, fitMax: __sw.fit(), probs: __sw.probs().map(x => x.slice(0, 120)),
    rN: sd.querySelector('#rN') ? [sd.querySelector('#rN').disabled, sd.querySelector('#rN').textContent] : null }; }, tag);
  const pick = async (L, wait) => { await p.evaluate(async x => { const w = document.getElementById('welcome'); if (w) w.remove(); if (BD.S.city !== x.sel.city) await BD.setCity(x.sel.city, true); await BD.select(Object.assign({}, x.sel)); }, L); await p.waitForTimeout(wait); };
  // 1. V09, then CLARK straight after (as a resident clicking another lot)
  await pick(LOTS.V09, 3000); R.seq.push(await card('V09 set-up'));
  await pick(LOTS.CLARK, 50); R.seq.push(await card('CLARK at once'));
  await p.waitForTimeout(2000); R.seq.push(await card('CLARK after 2 s, no redraw'));
  await p.evaluate(() => { const n = document.querySelector('#side #rN'); if (n && !n.disabled) n.click(); }); await p.waitForTimeout(2500); R.seq.push(await card('CLARK fits'));
  // 2. the fits slider: is a size above what fits offered, and what happens when it is chosen
  R.slider = await p.evaluate(async () => { const r = document.querySelector('#side #mw'); if (!r) return null; const ST = BD.eng.R.steps; const fm = __sw.fit(); const above = ST.filter(v => v > fm + 0.05);
    const before = { value: +r.value, mw: BD.S.answers.mw, thumb: ST[+r.value] }; r.value = r.max; r.dispatchEvent(new Event('change')); await new Promise(z => setTimeout(z, 1500)); const sd = document.getElementById('side');
    return { fitMax: fm, aboveOffered: above.length, maxOffered: ST[ST.length - 1], before, after: { mw: BD.S.answers.mw, stuck: BD.flow.stuck, fstuck: [...sd.querySelectorAll('.fstuck li')].map(x => x.textContent.slice(0, 160)), next: sd.querySelector('#fNext') ? [sd.querySelector('#fNext').disabled, sd.querySelector('#fNext').textContent] : null } }; });
  // 3. back to set-up after the slider
  await p.evaluate(() => BD.flow.back()); await p.waitForTimeout(2000); R.seq.push(await card('CLARK back to set-up after slider'));
  // 4. "Use this set-up" on Set-ups that open the most, then a new lot
  await p.evaluate(() => { BD.flow.max = 99; BD.flow.to('opps'); }); await p.waitForTimeout(1000);
  await p.evaluate(() => { const st = BD.flow.steps; const i = st.findIndex(s => s.k === 'opps-best'); if (i >= 0) BD.flow.go(i); }); await p.waitForTimeout(60000);
  R.useBest = await p.evaluate(async () => { const b = document.querySelector('#side [data-best="1"]') || document.querySelector('#side [data-best="0"]'); if (!b) return 'no button on ' + BD.flow.steps[BD.flow.i].k; b.click(); await new Promise(z => setTimeout(z, 1500)); return { ans: __sw.ans() }; });
  await p.waitForTimeout(30000);
  await pick(LOTS.V339, 50); R.seq.push(await card('V339 at once after Use this set-up'));
  await p.waitForTimeout(2000); R.seq.push(await card('V339 after 2 s'));
  fs.writeFileSync(path.join(out, 'switch.json'), JSON.stringify(R, null, 1)); console.log('switch done', R.errors.length);
  await b.close(); }

// PROBE=1: V09 walked step by step; when each step's Next button appears, and every mention of the height limit or roof equipment residents see
async function probe(out) {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell', args: ['--use-gl=swiftshader', '--enable-webgl'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const R = { errors: [], steps: [] };
  p.on('pageerror', e => R.errors.push(e.message));
  const local = (re, file, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, file)), contentType: type }));
  await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript'); await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
  await p.route(/fonts\.(googleapis|gstatic)|d3/, r => r.abort());
  await p.addInitScript(() => { try { localStorage.setItem('bd-tier', 'resident'); } catch (e) {} });
  await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForTimeout(6000); await p.evaluate(HELPERS);
  const L = LOTS.V09; await p.evaluate(async x => { const w = document.getElementById('welcome'); if (w) w.remove(); await BD.select(Object.assign({}, x.sel)); }, L); await p.waitForTimeout(3000);
  R.setupHeight = await p.evaluate(() => { const t = document.getElementById('side').innerText; return t.split('\n').filter(l => /height|10\.1\.1|5\.70|roof equipment|mechanical/i.test(l)); });
  await p.evaluate(() => document.querySelector('#side #rN').click());
  for (let n = 0; n < 8; n++) { const k = await p.evaluate(() => BD.flow.steps[BD.flow.i].k); const seen = [];
    for (let t = 0; t < 16; t++) { await p.waitForTimeout(500); seen.push(await p.evaluate(() => (document.querySelector('#side #fNext') ? 'N' : '-') + (document.querySelector('#side > .flowbar') ? 'B' : '-'))); }
    const hl = await p.evaluate(() => document.getElementById('side').innerText.split('\n').filter(l => /height limit|above the height|exceed|10\.1\.1|5\.70|roof equipment|mechanical/i.test(l)).map(l => l.slice(0, 200)));
    R.steps.push({ k, seen: seen.join(' '), heightLines: hl });
    if (k === 'energy') await p.screenshot({ path: path.join(process.env.SHOTDIR || out, 'V09_energy_probe.png') });
    const ok = await p.evaluate(() => { const b = document.querySelector('#side #fNext'); if (b && !b.disabled) { b.click(); return true; } return false; }); if (!ok) break; }
  fs.writeFileSync(path.join(out, 'probe.json'), JSON.stringify(R, null, 1)); console.log('probe done'); await b.close(); }
