// F9 (10 Nov 2026): export the Engineering cards for one lot, read-only. Opens the tool headless (as golden_run.js), sets the lot's golden answers
// in place of the Engineering cards' own size search, steps through every Engineering card in the viewer, and writes one JSON: per card its title,
// every figure as the card hands it to the screen (hero figures, rows, tables), every "?" with its gap text, the source lines and the register text
// of every source id they name; plus the answers used and the commit hash. A screenshot of each card goes beside it (for checking, not publishing).
// The tool's code is not changed: the card result is captured in the test browser by wrapping f1cards.js render(), and eng() is told to use the
// golden answers (window.__ENG_ANS) instead of findFit.
// Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node eng_export.js <outdir> <lotKey>
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const NM = (process.env.NODE_PATH || '').split(path.delimiter)[0];
const { chromium } = require('playwright');
const LOTS = { V339: { city: 'van', golden: '../golden/V339.json' } };   /* the viewer's Vancouver example lot is 339 1st Ave E (tool/f1.js LOTS) */
(async () => {
  const out = process.argv[2], key = process.argv[3] || 'V339', L = LOTS[key]; if (!out || !L) { console.error('usage: eng_export.js <outdir> <lotKey>'); process.exit(1); }
  fs.mkdirSync(path.join(out, 'cards'), { recursive: true });
  const G = JSON.parse(fs.readFileSync(path.join(__dirname, L.golden), 'utf8')), ANS = G.answers;
  const commit = execSync('git rev-parse --short HEAD', { cwd: __dirname }).toString().trim(), dirty = execSync('git status --porcelain -- ../../tool', { cwd: __dirname }).toString().trim();
  const R = JSON.parse(fs.readFileSync(path.join(__dirname, '../../register/formula_register.json'), 'utf8'));
  const SRC = Object.assign({}, R.old_sources || {}, R.new_sources || {});
  /* quantity ids the cards name as 'register <id>' (e.g. liquid_capture, component_space): their register entry */
  (R.quantities || []).forEach(q => { if (q && q.id && !(q.id in SRC)) SRC[q.id] = { quantity: q.name, unit: q.unit, formula: q.formula, coef: q.coef, source: q.source || q.src || null }; });
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = [];
  p.on('pageerror', e => errs.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error' && !/status of 404/.test(m.text())) errs.push('console: ' + m.text()); });
  const local = (re, f, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, f)), contentType: type }));
  await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript'); await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
  await p.route(/\/f1cards\.js/, async r => { const rs = await r.fetch(); let t = await rs.text(); const n0 = t.length;
    t = t.replace('function render(res,dr,pb,srcEl,tpl){ ', 'function render(res,dr,pb,srcEl,tpl){ try{ (window.__RES=window.__RES||[]).push({tpl,res:JSON.parse(JSON.stringify(Object.assign({},res,{draw:undefined})))}); }catch(e){ (window.__RES=window.__RES||[]).push({tpl,err:String(e)}); } ');
    t = t.replace('if(BD.flow.findFit) BD.flow.findFit(); BD.modelReset(); GEN++; EG.key=key;', 'if(window.__ENG_ANS) Object.assign(An,window.__ENG_ANS); else if(BD.flow.findFit) BD.flow.findFit(); BD.modelReset(); GEN++; EG.key=key;');
    if (t.length === n0) errs.push('f1cards.js hooks not applied'); r.fulfill({ response: rs, body: t }); });
  await p.addInitScript(a => { window.__ENG_ANS = a; }, ANS);
  await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForSelector('#f1', { timeout: 20000 }); await p.waitForTimeout(2500);
  const titles = await p.evaluate(() => BD.f1.TPL.find(t => t.id === 'engineering').cards.map(c => c.t));
  await p.evaluate(() => BD.f1.viewer('engineering')); await p.waitForTimeout(2500);
  const cards = [];
  for (let k = 0; k < titles.length; k++) {
    await p.evaluate(() => { window.__RES = []; });
    await p.click(`#f1v [data-to="${k}"]`, { timeout: 120000 }); await p.evaluate(() => { document.getElementById('f1v').scrollTop = 0; });
    const ok = await p.waitForFunction(() => { const d = document.querySelector('#f1v .f1v-draw'); return d && !/Drawing…/.test(d.innerText); }, null, { timeout: 180000 }).then(() => true).catch(() => false);
    await p.waitForTimeout(500);
    const shot = `${String(k + 1).padStart(2, '0')}_${titles[k].replace(/[^A-Za-z]+/g, '_').replace(/_$/, '')}.png`;
    await p.screenshot({ path: path.join(out, 'cards', shot) });
    const got = await p.evaluate(() => { const e = (window.__RES || []).filter(x => x.tpl === 'engineering').pop(); const panel = document.querySelector('#f1v'), dr = document.querySelector('#f1v .f1v-draw'); return { e, text: panel ? panel.innerText : '', draw: dr ? dr.innerText : '' }; });
    const res = got.e && got.e.res;
    /* plain text of an HTML value, and its tables as lists */
    const parsed = await p.evaluate(r => {
      const txt = h => { if (h == null) return null; if (typeof h === 'object') return h.q ? '?' : JSON.stringify(h); const d = document.createElement('div'); d.innerHTML = String(h); return d.textContent.replace(/\s+/g, ' ').trim(); };
      const tables = h => { if (typeof h !== 'string' || !/<table/i.test(h)) return []; const d = document.createElement('div'); d.innerHTML = h;
        return [...d.querySelectorAll('table')].map(t => [...t.querySelectorAll('tr')].map(tr => [...tr.querySelectorAll('th,td')].map(c => c.textContent.replace(/\s+/g, ' ').trim()))); };
      if (!r) return null;
      return { lead: r.lead || null,
        hero: (r.hero || []).map(h => ({ label: h.l || null, value: h.v && h.v.q ? '?' : (h.v == null ? null : String(h.v)), unit: h.u || null, key: h.k || null, red: !!h.red })),
        rows: (r.rows || []).map(x => ({ label: txt(x[0]), value: txt(x[1]), key: x[2] || null, tables: tables(x[1]) })),
        meters: (r.meters || []).map(m => JSON.parse(JSON.stringify(m))),
        more: (r.more || []).map(m => ({ title: txt(m[0]), text: txt(m[1]), tables: tables(m[1]) })),
        sources: (r.src || []).map(txt), missing: (r.missing || []).map(txt) }; }, res || null);
    const card = { n: k + 1, title: titles[k], drawn: ok, screenshot: 'cards/' + shot, captured: !!res, error: got.e && got.e.err || null };
    if (parsed) {
      /* figures: hero and rows, each with a range where the value shows one (low–high) */
      const num = s => { const m = String(s).replace(/,/g, '').match(/-?\d+(\.\d+)?/g); return m ? m.map(Number) : []; };
      const range = s => { const m = String(s || '').replace(/,/g, '').match(/(-?\d+(?:\.\d+)?)\s*(?:–|-|to)\s*(-?\d+(?:\.\d+)?)/); return m ? { low: Number(m[1]), high: Number(m[2]) } : null; };
      card.lead = parsed.lead;
      card.figures = parsed.hero.map(h => Object.assign({ kind: 'hero' }, h, { range: range(h.value), numbers: num(h.value) }))
        .concat(parsed.rows.map(r => ({ kind: 'row', label: r.label, value: r.value, key: r.key, range: range(r.value), numbers: num(r.value) })));
      card.lists = parsed.rows.filter(r => r.tables.length).map(r => ({ from: 'row: ' + r.label, tables: r.tables })).concat(parsed.more.filter(m => m.tables.length).map(m => ({ from: 'more: ' + m.title, tables: m.tables })));
      card.more = parsed.more.map(m => ({ title: m.title, text: m.text }));
      card.meters = parsed.meters;
      card.gaps = card.figures.filter(f => f.value === '?' || /(^|\s)\?(\s|$)/.test(f.value || '')).map(f => ({ label: f.label, value: f.value }));
      card.missing = parsed.missing;   /* the card's own "not in the tool yet" list */
      card.sources = parsed.sources;
      /* source ids named in the source lines, with their register text */
      const ids = new Set(); const all = parsed.sources.concat(card.more.map(m => m.text || '')).join(' ');
      const QONLY = new Set((R.quantities || []).map(q => q.id).filter(id => !((R.old_sources || {})[id] || (R.new_sources || {})[id])));
      const esc = id => id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      for (const id of Object.keys(SRC)) { const plainWord = QONLY.has(id) && !/_/.test(id);   /* quantity ids that are plain words (ground, floor, servers): only after 'register' or 'logic:' */
        const re = plainWord ? new RegExp('(register|logic:?)\\s+(?:[A-Za-z0-9_]+,\\s*)*' + esc(id) + '($|[^A-Za-z0-9_])') : new RegExp('(^|[^A-Za-z0-9_])' + esc(id) + '($|[^A-Za-z0-9_])');
        if (re.test(all)) ids.add(id); }
      card.register = [...ids].sort().map(id => ({ id, text: typeof SRC[id] === 'string' ? SRC[id] : JSON.stringify(SRC[id]) }));
    }
    /* the drawing's text (charts, comparisons), and the option comparison as a list where the card has one (Cooling: inside and outside options) */
    card.drawText = got.draw.split(/\r?\n/).map(x => x.trim()).filter(Boolean);
    /* a comparison block: a title line, a subtitle line, then option / value pairs ("Air (pick)", "none: all to the air", ...) */
    const OPT = ['Air', 'Liquid to the chip', 'Immersion', 'Dry coolers', 'Air-cooled chillers', 'Cooling towers', 'Hybrid coolers'], D = card.drawText, comp = [];
    const isOpt = l => OPT.includes(String(l || '').replace(/ \(pick\)$/, ''));
    let g = null;
    for (let i = 0; i < D.length; i++) { if (!isOpt(D[i])) continue;
      if (!g || !isOpt(D[i - 2])) { g = { title: D[i - 2] || null, sub: D[i - 1] || null, options: [] }; comp.push(g); }
      g.options.push({ option: D[i].replace(/ \(pick\)$/, ''), picked: / \(pick\)$/.test(D[i]), value: D[i + 1] || null }); i++; }
    if (comp.length) card.options = comp;
    card.screenText = got.text.slice(0, 6000);   /* the panel as shown, for checking the figures one for one */
    cards.push(card); console.log(`${k + 1} ${titles[k]}: ${res ? (card.figures || []).length + ' figures, ' + (card.gaps || []).length + ' ?' : 'NOT CAPTURED'}${ok ? '' : ' (still drawing after 180 s)'}`);
  }
  const after = await p.evaluate(() => { const A = BD.S.answers; return JSON.parse(JSON.stringify(A)); });
  /* E17 (13 Nov 2026): the heat as the Engineering cards now price it (air cooling: option A, decisions log 11 Nov), and the cost of heat */
  const heat = await p.evaluate(async () => { try { const e = BD.eng, f = e.siteFacts(), A = BD.S.answers, M = BD.model(), mw = A.mw || (M && M.mwSized) || 1, R = e.R;
    const d = await e.loadRecv(f.city), nets = e.netsAt(f, d); await BD.routeTree(f);
    const all = d.pts.map(q => Object.assign({}, q, { dist: BD.recvDist(f, q) })).filter(q => q.dist <= R.recvRadius);
    let r = e.calc({ mw, recover: true, to: 'near' }, f, all, nets), air = (A.inside || 'air') === 'air', cap = [r.itMWhR[0] * R.capture[0], r.itMWhR[1] * R.capture[1]];
    if (air) { cap = [r.itMWhR[0], r.itMWhR[1]]; const av = [cap[0] * R.cop[1] / (R.cop[1] - 1), cap[1] * R.cop[0] / (R.cop[0] - 1)]; r = Object.assign({}, r, { avail: av, hp: [av[0] / R.cop[1], av[1] / R.cop[0]] }); }
    const Bh = BD.bestHeat(f, all, r.avail[0]), b0 = Bh && Bh[0], rd = v => Math.round(v);
    return { cooling: A.inside || 'air', optionA: air, mw, itMWh: r.itMWhR.map(rd), recoveredMWh: cap.map(rd), offeredMWh: r.avail.map(rd), heatPumpElectricityMWh: r.hp.map(rd), cop: R.cop,
      costOfHeatPerMWh: b0 ? { mid: rd(b0.mid.lcoh), low: rd(b0.lo.lcoh), high: rd(b0.hi.lcoh), buildings: b0.G.map(q => q.n) } : null, heatWorthPerMWh: BD.ECON.heatVal ? BD.ECON.heatVal(f.city) : null,
      receiversWithinReach: all.length, reach_m: R.recvRadius,
      basis: air ? 'air-cooled hall, option A (decisions log 11 Nov 2026): all the hall’s heat recovered at its return-air temperature, one heat pump lifts it, COP 3–4.5 (register cop)' : 'liquid capture (register liquid_capture) and the heat pump COP (register cop)' }; } catch (er) { return { error: String(er.message || er) }; } });
  const J = { lot: key, address: '339 1st Ave E', made: new Date().toISOString(), commit, toolDirty: !!dirty, by: 'checks/tests/eng_export.js (F9)',
    answers: ANS, answersInTool: after, note: 'Read-only: the tool as of this commit. Figures as each card hands them to the screen; "?" exported as "?". Re-export after any engine change.',
    heat, cards, errors: errs };
  fs.writeFileSync(path.join(out, `eng_${key}.json`), JSON.stringify(J, null, 1)); console.log('errors:', errs.length ? errs.join(' | ') : 'none'); await b.close();
})();
