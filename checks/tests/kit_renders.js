// The Engineering 3-D kit (tool/kit3d.js) rendered one unit at a time, for the Resident "What's inside" card (J.B. 12 Nov 2026, board Res_R3b_Inside):
// writes tool/f1/kit/one_<kind>.png (600 × 420, white ground, the kit's own materials and lights, an iso view). Generic units, not any facility's models.
// Usage (from checks/tests/, tool on :8766): NODE_PATH=<node_modules> node kit_renders.js
const fs = require('fs'), path = require('path'); const NM = (process.env.NODE_PATH || '').split(path.delimiter)[0]; const { chromium } = require('playwright');
const KINDS = ['rack', 'crah', 'dry', 'chill', 'ups', 'battery', 'genset', 'transformer', 'switchgear'];
(async () => { const out = path.join(__dirname, '..', '..', 'tool', 'f1', 'kit'); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] }); const p = await b.newPage({ viewport: { width: 900, height: 700 } });
  await p.route(/three\.min\.js/, r => r.fulfill({ body: fs.readFileSync(path.join(NM, 'three/build/three.min.js')), contentType: 'application/javascript' }));
  await p.goto('http://localhost:8766/index.html?nointro&x=' + Date.now()); await p.waitForTimeout(3000);
  await p.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js' }); await p.waitForTimeout(1000);
  for (const k of KINDS) {
    const data = await p.evaluate(k => { const T = window.THREE, W = 600, H = 420; const r = new T.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true }); r.setSize(W, H); r.setClearColor(0xF6F5F2, 1); r.shadowMap.enabled = true;
      const sc = new T.Scene(); sc.add(new T.HemisphereLight(0xffffff, 0xd8d6d0, 0.75)); const d = new T.DirectionalLight(0xffffff, 0.65); d.position.set(6, 10, 4); d.castShadow = true; sc.add(d);
      let g; try { g = BD.kit.make(k); } catch (e) { return 'ERR ' + e.message; } sc.add(g);
      const bx = new T.Box3().setFromObject(g), c = bx.getCenter(new T.Vector3()), sz = bx.getSize(new T.Vector3()), s = Math.max(sz.x, sz.y, sz.z);
      const gr = new T.Mesh(new T.PlaneGeometry(s * 6, s * 6), new T.MeshLambertMaterial({ color: 0xF6F5F2 })); gr.rotation.x = -Math.PI / 2; gr.position.y = bx.min.y - 0.001; gr.receiveShadow = true; sc.add(gr);
      const cam = new T.OrthographicCamera(-1, 1, 1, -1, -100, 100), a = s * 0.6; cam.left = -a * W / H; cam.right = a * W / H; cam.top = a; cam.bottom = -a; cam.updateProjectionMatrix();
      cam.position.set(c.x + s * 1.2, c.y + s * 0.95, c.z + s * 1.2); cam.lookAt(c); r.render(sc, cam); const u = r.domElement.toDataURL('image/png'); r.dispose(); return u; }, k);
    if (data.startsWith('ERR')) { console.log(k, data); continue; }
    fs.writeFileSync(path.join(out, `one_${k}.png`), Buffer.from(data.split(',')[1], 'base64')); console.log(k, 'ok'); }
  await b.close(); })();
