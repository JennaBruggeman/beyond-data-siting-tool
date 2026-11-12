// Landing images (12 Nov 2026, J.B.: plain massing on the landing; the 3-D kit only on the Engineering template): 339 1st Ave E in the tool's 3-D view,
// massing mode, lot line in ink, rendered at 768 x 750. Used: land_hero_b.png -> tool/f1/img/hero.png, land_engineering.png -> tool/f1/img/engineering.png.
// Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node landing_capture.js <out dir>
const fs = require('fs'), path = require('path'); const NM = (process.env.NODE_PATH || '').split(path.delimiter)[0];
const { chromium } = require('playwright');
(async () => { const out = process.argv[2]; const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
  const local = (re, file, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, file)), contentType: type }));
  await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript'); await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
  await p.route(/flow\.js/, async r => { const rs = await r.fetch(); let t = await rs.text(); t = t.replace('const EXAMPLES=[', 'const EXAMPLES=window.__EX=[').replace('async function runExample(i){', 'window.__run=runExample; async function runExample(i){'); r.fulfill({ response: rs, body: t }); });
  await p.addInitScript(() => { try { localStorage.setItem('bd-tier', 'full'); } catch (e) {} });
  await p.goto('http://localhost:8766/index.html?nointro&x=' + Date.now()); await p.waitForTimeout(6000);
  await p.evaluate(x => { window.__EX.push(x); const w = document.getElementById('welcome'); if (w) w.remove(); const f = document.getElementById('f1'); if (f) f.remove(); window.__run(window.__EX.length - 1); }, { lab: '339 1st Ave E', sub: '', sel: { city: 'van', tile: '1_1', id: '63819485' }, ans: { built: 'new', extent: 'whole', floor: '' } });
  await p.waitForTimeout(10000);
  const tabs = await p.evaluate(() => [...document.querySelectorAll('[data-tab]')].map(x => x.dataset.tab).join(','));
  console.log('tabs', tabs);
  await p.evaluate(() => { const x = document.querySelector('[data-tab="fits"]'); if (x) x.click(); }); await p.waitForTimeout(8000);
  const st = await p.evaluate(() => ({ open: BD.scene3d && BD.scene3d.isOpen(), dv: BD.S.dcView, dvBtns: [...document.querySelectorAll('[data-dv]')].map(x => x.dataset.dv) }));
  console.log(JSON.stringify(st));
  await p.evaluate(() => { const x = document.querySelector('[data-dv="massing"]'); if (x) x.click(); }); await p.waitForTimeout(2500);
  for (const [nm, rot, k] of [['hero', 0, 2.4], ['engineering', -0.6, 2.2], ['hero_b', 0.5, 2.5]]) { const url = await p.evaluate(([rot, k]) => { const T = THREE, R = BD.scene3d.rig(), c = R.cam, st = BD.scene3d.state();
      const box = new T.Box3().setFromObject(st.massG || R.scene), ctr = box.getCenter(new T.Vector3()), sz = box.getSize(new T.Vector3()).length();
      const d = c.position.clone().sub(R.ctl.target).normalize().applyAxisAngle(new T.Vector3(0, 1, 0), rot);
      const keep = [c.position.clone(), R.ctl.target.clone()]; const lc = st.lotL && st.lotL.material ? st.lotL.material.color.getHex() : null; if (lc != null) st.lotL.material.color.setHex(0x1F2022);
      c.position.copy(ctr.clone().add(d.multiplyScalar(sz * k))); c.lookAt(ctr); R.ren.setSize(768, 750, false); c.aspect = 768 / 750; c.updateProjectionMatrix(); R.ren.render(R.scene, c);
      const u = R.ren.domElement.toDataURL('image/png'); c.position.copy(keep[0]); R.ctl.target.copy(keep[1]); if (lc != null) st.lotL.material.color.setHex(lc); return u; }, [rot, k]);
    fs.writeFileSync(path.join(out, 'land_' + nm + '.png'), Buffer.from(url.split(',')[1], 'base64')); }
  for (const dv of []) { await p.evaluate(dv => { const x = document.querySelector(`[data-dv="${dv}"]`); if (x) x.click(); }, dv); await p.waitForTimeout(3000);
    await p.screenshot({ path: path.join(out, `cap_${dv}.png`) }); }
  console.log('errs', errs.slice(0, 3)); await b.close(); })();
