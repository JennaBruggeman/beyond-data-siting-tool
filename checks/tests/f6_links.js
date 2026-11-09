// F6 gate: every figure on every card (labels from f6_figures.js) opens at least one part that exists in logic.json and is shown in that
// logic diagram (on the template's own tab, or the all-parts tab where that tab hides them, f1logic.js open). node f6_links.js <f6_figures out.json>   (tool on :8766). Resident has no figures yet.
const fs = require('fs'); const { chromium } = require('playwright');
(async () => { const inv = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')); const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('http://localhost:8766/index.html?nointro&x=' + Date.now()); await p.waitForSelector('#f1'); await p.waitForTimeout(2500);
  const TAB = { resident: 'resident', municipal: 'municipal', engineering: 'full', architecture: 'arch' };
  const res = await p.evaluate(async ([inv, TAB]) => { const L = await fetch('logic.json').then(r => r.json()); const out = []; const seen = new Set();
    const R = BD.logic.RANK;   // = f1logic.js shown()
    const vis = (k, tab) => { const n = L.nodes[k]; if (!n) return false; if (tab === 'municipal') return !!n.m; if (n.t === 'arch_only') return tab === 'arch'; return R[n.t] <= R[tab]; };
    for (const [tpl, cards] of Object.entries(inv)) for (const c of Object.values(cards)) {
      const tab = TAB[tpl], labels = c.figs.length ? c.figs.map(f => f.f) : [null];
      for (const lab of labels) { const key = tpl + '|' + c.title + '|' + lab; if (seen.has(key)) continue; seen.add(key);
        const ids = lab === null ? BD.f1logic.cardIds(c.title, tab) : BD.f1logic.figIds(c.title, tab, lab);
        const ok = ids.filter(k => L.nodes[k]); out.push({ tpl, card: c.title, label: lab, ids, ok: ok.length > 0, allTab: ok.length > 0 && !ids.some(k => vis(k, tab)), missing: ids.filter(k => !L.nodes[k]), hidden: ids.filter(k => L.nodes[k] && !vis(k, tab)) }); } }
    return out; }, [inv, TAB]);
  let bad = 0; const cards = new Map();
  for (const r of res) { const k = r.tpl + ' · ' + r.card; if (!cards.has(k)) cards.set(k, true); if (!r.ok) { cards.set(k, false); if (r.tpl !== 'resident') { bad++; console.log('NO PART', k, '|', r.label, '|', r.ids.join(','), r.missing.length ? 'missing ' + r.missing : '', r.hidden.length ? 'hidden ' + r.hidden : ''); } } else { if (r.missing.length) console.log('note: ids not in logic.json', k, r.missing); if (r.allTab) console.log('opens on the all-parts tab (parts hidden in this template):', k, '|', r.label, '|', r.ids.join(',')); } }
  const nc = [...cards.values()].filter(Boolean).length;
  console.log(`cards ${cards.size}; with every figure linked ${nc}; figures ${res.length}; unlinked (outside Resident) ${bad}`);
  console.log('Resident (no figures yet):', [...cards.entries()].filter(([k, v]) => k.startsWith('resident') && !v).map(([k]) => k.split(' · ')[1]).join(', '));
  await b.close(); process.exit(bad ? 1 : 0); })();
