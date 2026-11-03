// Sweep (3 Nov 2026), community template: every step of the guided flow on every lot; set-up questions answered two ways on a few lots.
// Usage (from checks/tests/): NODE_PATH=<node_modules with playwright> node sweep_community.js <outdir> [lotKey ...]
// Needs the tool at http://localhost:8766. Writes <outdir>/<lot>.json (every step's text, errors, checks); screenshots of failures in $SHOTDIR.
const fs = require('fs'), path = require('path');
const NM = (process.env.NODE_PATH || '').split(':')[0];
const { chromium } = require('playwright');
const L = (city, tile, id, lab, o) => Object.assign({ sel: { city, tile, id }, lab }, o || {});
const LOTS = {
  // the 8 golden lots
  V09: L('van', '1_1', '63819363', '275 1st Ave E (I-3)'),
  E05: L('edm', '0_0', '51053', '8803 Stadium Rd NW (IM)'),
  CLARK: L('van', '2_1', '23060741', '1425 Clark Dr (I-2)', { deep: 1 }),
  E123: L('edm', '-1_1', '883345', '12603 123 Street NW (IH)'),
  V339: L('van', '1_1', '63819485', '339 1st Ave E (I-3)'),
  E06A: L('edm', '-1_1', '176767', '74 Airport Rd NW (BE)', { deep: 1 }),
  E06B: L('edm', '-1_1', '146402', '64 Airport Rd NW (BE)'),
  HAST: L('van', '0_2', '59013407', '555 W Hastings (DD, existing upper floor)', { ans: { built: 'existing', extent: 'part', floor: 'upper' }, deep: 1 }),
  // Vancouver
  VI1S: L('van', '0_1', '64817976', '116 8th Ave W (I-1, small)'),
  VI1C: L('van', '0_1', '64017198', '360 2nd Ave W (I-1C)'),
  VI2S: L('van', '2_2', '59422650', '1250 Frances St (I-2, small)'),
  VI2H: L('van', '0_-4', '17283096', '250 70th Ave W (I-2, huge)'),
  VI3L: L('van', '1_1', '63519324', '320 Industrial Ave (I-3, large)'),
  VFC2: L('van', '1_1', '63019307', '1220 Station St (FC-2)'),
  VFC2S: L('van', '0_1', '19063006', '1500 Main St (FC-2, small)'),
  VM1: L('van', '1_2', '59020569', '769 Hastings St E (M-1, small)'),
  VM2: L('van', '2_2', '58023086', '1376 Powell St (M-2)'),
  VIC2: L('van', '-2_1', '64212208', '1620 5th Ave W (IC-2, retrofit)', { ans: { built: 'existing', extent: 'whole', floor: '' } }),
  VDD: L('van', '0_2', '16059256', '556 Beatty St (DD, retrofit)', { ans: { built: 'existing', extent: 'whole', floor: '' }, deep: 1 }),
  VC2: L('van', '-1_-4', '84013070', '1404 Marine Dr SW (C-2, not industrial)'),
  // Edmonton
  EBE: L('edm', '2_-2', '1046283', '7545 52 Street NW (BE)'),
  EIM: L('edm', '1_1', '59832', '12115 Fort Road NW (IM)'),
  EIH: L('edm', '1_1', '59725', '12410 67 Street NW (IH)', { deep: 1 }),
  EIHS: L('edm', '-3_1', '149655', '15115 117 Avenue NW (IH, small)'),
  EMU: L('edm', '0_0', '84117', '10717 98 Street NW (MU, lease)', { ans: { built: 'existing', extent: 'part', floor: 'upper' } }),
  EDC: L('edm', '0_-2', '102210', '7225 104 Street NW (DC)'),
  ERS: L('edm', '1_-3', '515967', '8404 42 Avenue NW (RS, not industrial)'),
};
const VAR_NEW = { inside: 'plate', outside: 'hybrid', plantAt: 'split', spares: '2n', gens: 'yes', genAt: 'roof', foot: 'cover', cover: 60, hmode: 'storeys', storeys: 2 };
const VAR_EX = { inside: 'immersion', outside: 'towers', plantAt: 'yard', spares: 'n', gens: 'none' };
const BAD = /NaN|undefined|\bnull\b|\[object|Infinity/;
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const out = process.argv[2] || 'sweep_community'; fs.mkdirSync(out, { recursive: true });
  const shot = process.env.SHOTDIR || out; fs.mkdirSync(shot, { recursive: true });
  const keys = process.argv.slice(3).length ? process.argv.slice(3) : Object.keys(LOTS);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell', args: ['--use-gl=swiftshader', '--enable-webgl'] });
  for (const key of keys) {
    const LOT = LOTS[key]; const R = { lot: key, lab: LOT.lab, walks: [], deck: null, built: null, errors: [], console: [] };
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    let errs = []; let nshots = 0;
    p.on('pageerror', e => { errs.push('pageerror: ' + e.message); R.errors.push(e.message + ' | ' + (e.stack || '').split('\n').slice(0, 3).join(' ')); });
    p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|ERR_FAILED/.test(m.text())) { errs.push('console: ' + m.text()); R.console.push(m.text()); } });
    const snap = async tag => { if (nshots++ < 8) try { await p.screenshot({ path: path.join(shot, `${key}_${tag}.png`.replace(/[^\w.-]/g, '_')) }); } catch (e) {} };
    const local = (re, file, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, file)), contentType: type }));
    await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript');
    await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
    await local(/jspdf\.umd/, 'jspdf/dist/jspdf.umd.min.js', 'application/javascript');
    await local(/autotable/, 'jspdf-autotable/dist/jspdf.plugin.autotable.min.js', 'application/javascript');
    await p.route(/flow\.js/, async r => { const res = await r.fetch(); let t = await res.text();
      t = t.replace('const EXAMPLES=[', 'const EXAMPLES=window.__EX=[').replace('async function runExample(i){', 'window.__run=runExample; async function runExample(i){');
      r.fulfill({ response: res, body: t }); });
    await p.route(/fonts\.(googleapis|gstatic)|d3/, r => r.abort());
    await p.addInitScript(() => { try { localStorage.setItem('bd-tier', 'community'); } catch (e) {} });
    try {
      await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await sleep(7000);
      const start = async ans => {
        await p.evaluate(x => { window.__EX.push(x); const w = document.getElementById('welcome'); if (w) w.remove(); window.__run(window.__EX.length - 1); }, { lab: LOT.lab, sub: '', sel: LOT.sel, ans: ans || { built: 'new', extent: 'whole', floor: '' } });
        for (let i = 0; i < 40; i++) { await sleep(500); const ok = await p.evaluate(() => !!(BD.S.sel && BD.flow.i === 1 && document.querySelector('#side .dk'))); if (ok) break; }
        await sleep(1500); };
      await start(LOT.ans);
      if (process.env.DBG) console.log(key,'started',new Date().toISOString().slice(11,19));
      R.tier = await p.evaluate(() => BD.tier());
      R.site = await p.evaluate(() => { const f = BD.eng.siteFacts(), s = BD.S.sel; return { zone: f.zone, status: f.status, lot: f.lot, blds: (s.blds || []).length, hmax: Math.max(0, ...(s.blds || []).map(b => b.h || 0)), city: f.city, ans: JSON.parse(JSON.stringify(BD.S.answers)), fitMax: BD.fitMax ? BD.fitMax() : null }; });
      // zoning status on the "What is being built?" card, for each option
      R.built = await p.evaluate(async () => { const A = BD.S.answers, keep = JSON.stringify(A), o = {};
        for (const v of ['new', 'shared', 'retrofit', 'lease']) { BD.deck.show(0); await new Promise(r => setTimeout(r, 200)); const btn = document.querySelector(`#side .dch button[data-v="${v}"]`); if (!btn) { o[v] = { missing: true }; continue; } btn.click(); await new Promise(r => setTimeout(r, 700));
          const fe = document.querySelector('#side .dfeas, #side .dnope'); o[v] = { feas: fe ? fe.innerText.replace(/\s+/g, ' ') : '', res: (document.querySelector('#side .dres') || {}).innerText || '', checked: (document.querySelector('#side .dch button[aria-checked="true"]') || {}).dataset?.v }; }
        const back = JSON.parse(keep); Object.keys(A).forEach(k => delete A[k]); Object.assign(A, back); BD.modelReset(); BD.deck.show(0); await new Promise(r => setTimeout(r, 500)); return o; });
      // deep lots: every option on every card
      if (LOT.deep) {
        R.deck = await p.evaluate(async () => { const A = BD.S.answers, keep = JSON.stringify(A), out = []; const ids = BD.deck.DECK.map(d => d.id);
          const live = () => BD.deck.DECK.filter(d => !d.when || d.when(A));
          for (const id of ids) { const j = live().findIndex(d => d.id === id); if (j < 0) { out.push({ id, skipped: 'not live' }); continue; }
            BD.deck.show(j); await new Promise(r => setTimeout(r, 300)); const vs = [...document.querySelectorAll('#side .dch button')].map(b => b.dataset.v);
            for (const v of vs) { const j2 = live().findIndex(d => d.id === id); BD.deck.show(j2); await new Promise(r => setTimeout(r, 200));
              const btn = document.querySelector(`#side .dch button[data-v="${v}"]`); if (!btn) { out.push({ id, v, missing: true }); continue; } btn.click(); await new Promise(r => setTimeout(r, 700));
              if (id === 'foot' && v === 'cover') { const c = document.getElementById('dcov'); if (c) { c.value = 40; c.dispatchEvent(new Event('change')); await new Promise(r => setTimeout(r, 500)); } }
              if (id === 'height' && v === 'storeys') { const s = document.getElementById('dsto'); if (s) { s.value = 9; s.dispatchEvent(new Event('change')); await new Promise(r => setTimeout(r, 500)); } }
              const sd = document.getElementById('side'); const fe = sd.querySelector('.dfeas, .dnope'); const t = sd.innerText;
              out.push({ id, v, feas: fe ? fe.innerText.replace(/\s+/g, ' ') : '', res: (sd.querySelector('.dres') || {}).innerText || '', cap: (sd.querySelector('#dcap') || {}).innerText || '', extra: (sd.querySelector('.dnum, .dwarn') || {}).innerText || '', bad: (t.match(/NaN|undefined|\bnull\b|\[object|Infinity/g) || []), len: t.length, ans: JSON.parse(JSON.stringify(A)), mw: BD.eng.siteFacts().mw });
              const back = JSON.parse(keep); Object.keys(A).forEach(k => delete A[k]); Object.assign(A, back); BD.modelReset(); } }
          BD.deck.show(0); await new Promise(r => setTimeout(r, 400)); return out; });
        if (R.deck.some(x => x.bad && x.bad.length)) await snap('deck_bad');
      }
      if (process.env.DBG) console.log(key,'deck done',new Date().toISOString().slice(11,19));
      // the walks: defaults (the worked-example fit), then a second set of answers on the deep lots
      const walk = async (label, opts) => {
        const W = { label, steps: [], fixes: [] };
        if (opts && opts.set) { W.set = await p.evaluate(async s => { const A = BD.S.answers; Object.assign(A, s, { mw: null }); BD.modelReset(); BD.flow.go(1); await new Promise(r => setTimeout(r, 1200)); return JSON.parse(JSON.stringify(A)); }, opts.set); }
        // set-up deck: every card in turn through its own Next button
        const cards = [];
        for (let i = 0; i < 14; i++) { errs = [];
          const c = await p.evaluate(() => { const sd = document.getElementById('side'), t = sd.innerText; return { inDeck: !!sd.querySelector('.dk'), q: (sd.querySelector('.dk h2') || {}).textContent, kind: (sd.querySelector('.dk .kind') || {}).textContent, feas: (sd.querySelector('.dfeas, .dnope') || {}).innerText, res: (sd.querySelector('.dres') || {}).innerText, bad: t.match(/NaN|undefined|\bnull\b|\[object|Infinity/g) || [] }; });
          if (!c.inDeck) break; c.errs = errs.slice(); cards.push(c); if (c.bad.length || c.errs.length) await snap(`${label}_card${i}`);
          await p.evaluate(() => { const n = document.getElementById('dN'); if (n) n.click(); }); await sleep(1200); }
        W.cards = cards;
        for (let guard = 0; guard < 60; guard++) {
          // stuck? use the way out offered
          for (let t = 0; t < 3; t++) { const fx = await p.evaluate(() => { const ff = document.getElementById('fFit'), fd = document.getElementById('fFind'); const st = document.querySelector('#side .fstuck'); if (!st) return null; const why = st.innerText.replace(/\s+/g, ' '); if (ff) { ff.click(); return { k: BD.flow.steps[BD.flow.i].k, why, used: 'fit' }; } if (fd && !fd.disabled) { fd.click(); return { k: BD.flow.steps[BD.flow.i].k, why, used: 'find' }; } return { k: BD.flow.steps[BD.flow.i].k, why, used: 'none' }; });
            if (!fx) break; W.fixes.push(fx); await sleep(1500); if (fx.used === 'none') break; }
          errs = [];
          const st = await p.evaluate(async () => { const F = BD.flow, s = F.steps[F.i]; const sd = document.getElementById('side');
            if (s.k === 'report') { for (let i = 0; i < 120; i++) { if (sd.querySelector('.rpages') || !/Drawing the report/.test(sd.innerText)) break; await new Promise(r => setTimeout(r, 500)); } }
            const t = sd.innerText; const o = { i: F.i, k: s.k, t: s.t, h2: (sd.querySelector('h2') || {}).textContent || '', len: t.length, text: t.slice(0, 30000), bad: t.match(/.{0,40}(?:NaN|undefined|\bnull\b|\[object|Infinity).{0,40}/g) || [], stuck: !!F.stuck, mw: BD.S.answers.mw, fit: BD.fitMax ? BD.fitMax() : null, fmw: BD.eng.siteFacts().mw, nSteps: F.steps.length, ans: JSON.stringify(BD.S.answers), dim: (document.getElementById('wc3d') || { dataset: {} }).dataset.dim || '' };
            const cap = [...document.querySelectorAll('.c3d, #wc3d .cap, #wc3d figcaption, .s3key, .s3note')].map(x => x.innerText).join(' | '); o.cap3d = cap.slice(0, 3000); o.badCap = cap.match(/.{0,40}(?:NaN|undefined|\bnull\b|\[object|Infinity).{0,40}/g) || [];
            if (s.k.startsWith('fam:')) { o.rows = []; const rows = [...sd.querySelectorAll('.famrow')].map(r => r.dataset.n); for (const n of rows) { const r = [...document.querySelectorAll('#side .famrow')].find(x => x.dataset.n === n); if (!r) continue; r.click(); await new Promise(q => setTimeout(q, 600)); const tt = document.getElementById('side').innerText; o.rows.push({ n, len: tt.length, bad: tt.match(/.{0,40}(?:NaN|undefined|\bnull\b|\[object|Infinity).{0,40}/g) || [], gates: [...document.querySelectorAll('#side table.cl tr')].slice(0, 6).map(x => x.innerText.replace(/\s+/g, ' ')) }); } o.notHere = [...sd.querySelectorAll('.famno .addrow')].map(x => x.innerText.replace(/\s+/g, ' ')); }
            if (s.k === 'spec') { for (let q = 0; q < 2; q++) { const bt = [...document.querySelectorAll('#side .alld .spadd:not(.on)')][q === 0 ? 0 : 3]; if (bt) { bt.click(); await new Promise(r => setTimeout(r, 1200)); } } const t2 = document.getElementById('side').innerText; o.text = t2.slice(0, 30000); o.len = t2.length; o.bad = t2.match(/.{0,40}(?:NaN|undefined|\bnull\b|\[object|Infinity).{0,40}/g) || []; o.picks = BD.spec.list().slice(); }
            if (s.k === 'opts') { o.optRows = [...sd.querySelectorAll('.tt table tr')].map(r => [...r.cells].map(c => c.innerText.replace(/\s+/g, ' '))); }
            if (s.k === 'report') { const rp = sd.querySelector('.rpages'); o.rtext = ''; if (rp) { const c = rp.cloneNode(true); c.querySelectorAll('style,script').forEach(x => x.remove()); c.querySelectorAll('text,tspan,p,div,li,td,th,dt,dd,h1,h2,h3,h4').forEach(x => x.append(' ')); o.rtext = c.textContent.replace(/\s+/g, ' ').slice(0, 80000); } o.rbad = o.rtext.match(/.{0,40}(?:NaN|undefined|\bnull\b|\[object|Infinity).{0,40}/g) || []; o.pages = sd.querySelectorAll('.rpage').length; o.lead = (sd.querySelector('.lead') || {}).innerText; }
            return o; });
          st.errs = errs.slice(); W.steps.push(st); if (process.env.DBG) console.log(key, label, st.i, st.k, new Date().toISOString().slice(11,19), st.len, st.errs.length);
          if (st.errs.length || st.bad.length || st.badCap.length || (st.rbad && st.rbad.length) || st.len < 120) await snap(`${label}_${st.k}`);
          if (opts && opts.best && st.k === 'opps-best' && !W.bestClicked) { W.bestClicked = await p.evaluate(async () => { const b = document.querySelector('#side [data-best]'); if (!b) return 'none'; const before = JSON.stringify(BD.S.answers); b.click(); await new Promise(r => setTimeout(r, 1200)); return { before, after: JSON.stringify(BD.S.answers), text: document.getElementById('side').innerText.slice(0, 400) }; }); }
          if (st.k === 'report') break;
          const before = st.i;
          const r = await p.evaluate(() => { const n = document.getElementById('fNext'); if (!n) return 'no next'; if (n.disabled) return 'disabled: ' + n.textContent; n.click(); return 'ok'; });
          if (r !== 'ok') { W.blockedAt = { k: st.k, r }; break; }
          let moved = false; for (let i = 0; i < 60; i++) { await sleep(400); const ii = await p.evaluate(() => BD.flow.i); if (ii !== before) { moved = true; break; } }
          if (!moved) { W.blockedAt = { k: st.k, r: 'did not move' }; await snap(`${label}_nomove_${st.k}`); break; }
          await sleep(900);
        }
        // report PDF
        if (opts && opts.pdf && W.steps.length && W.steps[W.steps.length - 1].k === 'report') {
          errs = [];
          W.pdf = await p.evaluate(async () => { window.__saved = []; BD.dl = { save: async o => { window.__saved.push({ fn: o.filename, size: o.data && o.data.size }); } }; await BD.views.report(); await new Promise(r => setTimeout(r, 500)); const b = document.getElementById('rPdf'); if (!b) return { err: 'no button' }; b.click();
            for (let i = 0; i < 240; i++) { await new Promise(r => setTimeout(r, 500)); const m = (document.getElementById('rMsg') || {}).textContent || ''; if (/Saved|not saved/.test(m)) return { msg: m, saved: window.__saved }; } return { msg: 'timeout', saved: window.__saved }; });
          W.pdf.errs = errs.slice(); if (!/Saved/.test(W.pdf.msg)) await snap(`${label}_pdf`);
        }
        return W; };
      R.walks.push(await walk('A', { pdf: ['CLARK', 'E06A', 'HAST', 'VDD', 'EMU', 'EIH', 'VC2'].includes(key), best: false }));
      if (LOT.deep) {
        const ex = R.site.ans.built === 'existing';
        await start(LOT.ans); R.walks.push(await walk('B', { set: ex ? (key === 'HAST' ? Object.assign({}, VAR_EX, { extent: 'whole' }) : Object.assign({}, VAR_EX, { extent: 'part', floor: 'ground' })) : VAR_NEW, pdf: false, best: ['CLARK', 'EIH'].includes(key) }));
      }
    } catch (e) { R.fatal = String(e && e.stack || e); await snap('fatal'); }
    fs.writeFileSync(path.join(out, key + '.json'), JSON.stringify(R, null, 1));
    console.log(key, R.fatal ? 'FATAL ' + R.fatal.slice(0, 200) : 'ok', 'errors', R.errors.length, 'walks', R.walks.map(w => w.label + ':' + w.steps.length + (w.blockedAt ? ' blocked@' + w.blockedAt.k : '')).join(' '));
    await p.close();
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
