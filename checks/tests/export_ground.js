// Ground heights for one lot, step 1 of 2 (J.B. 7 Nov 2026, for Cowork's Ground and flood card): the lot's outline in the tool's world coordinates and
// its lot frame (the frame export_layout.js uses), written to a scratch file for export_ground.py. Vancouver lots only (City open data).
// Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node export_ground.js <tile> <id> <out.json>
const fs = require('fs');
const { chromium } = require('playwright');
(async () => {
  const [tile, id, out] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage();
  await p.route(/three|OrbitControls|jspdf|autotable|fonts\.(googleapis|gstatic)|d3/, r => r.abort());
  await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForTimeout(5000);
  const r = await p.evaluate(async ([tile, id]) => { const w = document.getElementById('welcome'); if (w) w.remove();
    const A = BD.S.answers; Object.assign(A, { built: 'new', extent: 'whole', floor: '' }); if (BD.S.city !== 'van') await BD.setCity('van', true);
    await BD.select({ city: 'van', tile, id, quiet: true }); BD.modelReset(); const M = BD.model(), F = M.F;
    /* the frame as an affine map world → (u, v): F.toL at three points */
    const o = F.toL(0, 0), ex = F.toL(1, 0), ey = F.toL(0, 1);
    return { id, tile, ring: Array.from(M.ring), lotArea: M.lotArea, frame: { L: F.L, W: F.W, o, ex, ey }, uFront: M.uFront, dir: M.dir, grade: M.grade ? { min: M.grade.min, med: M.grade.med, max: M.grade.max, datum: M.grade.datum } : null }; }, [tile, id]);
  fs.writeFileSync(out, JSON.stringify(r)); await b.close(); console.log('wrote', out);
})().catch(e => { console.error(e); process.exit(1); });
