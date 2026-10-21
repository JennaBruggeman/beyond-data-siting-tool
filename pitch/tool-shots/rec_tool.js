// Test shot (J.B. 20 Oct): Clark Dr, What fits → slow orbit → pointer clicks "3 Exchanges" → Heat, slow pull back. Frame by frame, 24 fps.
const {chromium}=require('./node_modules/playwright'); const fs=require('fs');
const FPS=24, W=1920, H=1080, OUT='vid/test2'; fs.rmSync(OUT,{recursive:true,force:true}); fs.mkdirSync(OUT,{recursive:true});
(async()=>{ const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:W,height:H}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.route(/three\.min\.js/,r=>r.fulfill({body:fs.readFileSync('node_modules/three/build/three.min.js'),contentType:'application/javascript'}));
await p.route(/OrbitControls\.js/,r=>r.fulfill({body:fs.readFileSync('node_modules/three/examples/js/controls/OrbitControls.js'),contentType:'application/javascript'}));
await p.route(/d3/,r=>r.abort());
await p.addInitScript(()=>{ try{localStorage.setItem('bd-tier','community');localStorage.setItem('bd-look','new');}catch(e){} });
await p.goto('http://localhost:8766/index.html?x='+Date.now()); await p.waitForTimeout(7000);
await p.click('#wEx'); await p.click('#wList .ex[data-i="0"]'); await p.waitForTimeout(800); await p.click('.tier[data-t="community"]'); await p.waitForTimeout(9000);
await p.evaluate(()=>{ const F=BD.flow; F.go(F.steps.findIndex(s=>s.g==='ex')); }); await p.waitForTimeout(6000);
await p.evaluate(()=>{ BD.flow.to('fits'); }); await p.waitForTimeout(6000);
console.log('ex enabled:',await p.evaluate(()=>!document.querySelector('#side .flowbar [data-fg="ex"]').disabled));
// a pointer drawn on top (pointer-events off)
await p.evaluate(()=>{ const c=document.createElement('div'); c.id='vcur'; c.innerHTML='<svg width="26" height="26" viewBox="0 0 26 26"><path d="M3 2 L3 21 L8 16 L11.5 24 L14.5 22.7 L11 15 L18 15 Z" fill="#f2efea" stroke="#1b1c1f" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  c.style.cssText='position:fixed;left:0;top:0;z-index:99999;pointer-events:none;transform:translate(1500px,700px);transition:none'; document.body.appendChild(c);
  const r=document.createElement('div'); r.id='vring'; r.style.cssText='position:fixed;z-index:99998;pointer-events:none;width:34px;height:34px;margin:-17px 0 0 -17px;border:2px solid #e7a39c;border-radius:50%;opacity:0'; document.body.appendChild(r);
  window.__cur={x:1500,y:700}; window.__setCur=(x,y)=>{ __cur={x,y}; c.style.transform=`translate(${x}px,${y}px)`; };
  window.__ring=(x,y,t)=>{ r.style.left=x+'px'; r.style.top=y+'px'; r.style.opacity=String(Math.max(0,1-t)); r.style.transform=`scale(${0.6+t*0.9})`; };
  // camera: orbit about the controls' target, keeping the start distance and height
  const R=BD.scene3d.rig(); const c0=R.cam.position.clone(), t0=R.ctl.target.clone(); const off=c0.clone().sub(t0); window.__cam0={r:Math.hypot(off.x,off.z),a:Math.atan2(off.z,off.x),y:off.y};
  window.__orbit=(da,zoom)=>{ const R=BD.scene3d.rig(), t=R.ctl.target, k=__cam0; const a=k.a+da, r=k.r*zoom; R.cam.position.set(t.x+r*Math.cos(a), t.y+k.y*zoom, t.z+r*Math.sin(a)); R.cam.lookAt(t); R.ctl.update&&R.ctl.update(); };
});
let n=0; const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const shot=async()=>{ await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))); await p.screenshot({path:`${OUT}/f${String(n++).padStart(5,'0')}.jpg`,type:'jpeg',quality:92}); };
const hold=async s=>{ for(let i=0;i<s*FPS;i++) await shot(); };
// 1. hold on What fits
await hold(1.2);
// 2. slow orbit 35° and ease in 12%
for(let i=0,N=7*FPS;i<N;i++){ const t=ease(i/(N-1)); await p.evaluate(([da,z])=>__orbit(da,z),[t*0.6,1-0.12*t]); await shot(); }
// 3. pointer to the "Exchanges" step and click
const bx=await p.evaluate(()=>{ const b=document.querySelector('#side .flowbar [data-fg="ex"]'); const r=b.getBoundingClientRect(); return [r.left+r.width/2,r.top+r.height/2]; });
const [x0,y0]=await p.evaluate(()=>[__cur.x,__cur.y]);
for(let i=0,N=Math.round(1.3*FPS);i<N;i++){ const t=ease(i/(N-1)); await p.evaluate(([x,y])=>__setCur(x,y),[x0+(bx[0]-x0)*t,y0+(bx[1]-y0)*t]); await shot(); }
for(let i=0;i<8;i++){ await p.evaluate(([x,y,t])=>__ring(x,y,t),[bx[0],bx[1],i/8]); await shot(); }
await p.evaluate(()=>document.querySelector('#side .flowbar [data-fg="ex"]').click());
// 4. heat view settles; pointer drifts off the button; then a slow pull back
for(let i=0;i<Math.round(2.5*FPS);i++){ if(i<20) await p.evaluate(([x,y])=>__setCur(x,y),[bx[0]+i*6,bx[1]+i*9]); await shot(); }
await p.evaluate(()=>{ const R=BD.scene3d.rig(); const off=R.cam.position.clone().sub(R.ctl.target); window.__cam0={r:Math.hypot(off.x,off.z),a:Math.atan2(off.z,off.x),y:off.y}; });
for(let i=0,N=5*FPS;i<N;i++){ const t=ease(i/(N-1)); await p.evaluate(([da,z])=>__orbit(da,z),[-0.35*t,1+0.25*t]); await shot(); }
await hold(1);
console.log('frames',n,'errs',errs.slice(0,3)); await b.close(); })();
