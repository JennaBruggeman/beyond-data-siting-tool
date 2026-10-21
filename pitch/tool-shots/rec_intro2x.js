// "What it is" beat: the welcome screen, a worked example in Vancouver, then one in Edmonton. Frames only while something is on screen worth seeing.
const {chromium}=require('./node_modules/playwright'); const fs=require('fs');
const FPS=24; const [,,OUT,SEGI]=process.argv;
(async()=>{ const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:2}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.route(/three\.min\.js/,r=>r.fulfill({body:fs.readFileSync('node_modules/three/build/three.min.js'),contentType:'application/javascript'}));
await p.route(/OrbitControls\.js/,r=>r.fulfill({body:fs.readFileSync('node_modules/three/examples/js/controls/OrbitControls.js'),contentType:'application/javascript'}));
await p.route(/d3/,r=>r.abort());
await p.addInitScript(()=>{ const rn=performance.now.bind(performance); window.__vc=null; performance.now=()=>window.__vc==null?rn():window.__vc; window.__vcOn=()=>{ window.__vc=rn(); }; window.__vcStep=()=>{ if(window.__vc!=null) window.__vc+=1000/24; }; try{localStorage.setItem('bd-tier','community');localStorage.setItem('bd-look','new');}catch(e){} });
await p.goto('http://localhost:8766/index.html?x='+Date.now()); await p.waitForTimeout(7000);
const ex=+SEGI, capTxt=ex===0?'A tool that tests any real lot':'In Vancouver and Edmonton', ORBIT_ONLY=ex===1; let ORB=false;
await p.addStyleTag({content:`@font-face{font-family:Plex;font-weight:500;src:url(plex-500.woff2)}`});
await p.evaluate(()=>document.fonts.load('500 72px Plex')); await p.evaluate(([capTxt])=>{ const c=document.createElement('div'); c.id='vcur'; c.innerHTML='<svg width="26" height="26" viewBox="0 0 26 26"><path d="M3 2 L3 21 L8 16 L11.5 24 L14.5 22.7 L11 15 L18 15 Z" fill="#f2efea" stroke="#1b1c1f" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  c.style.cssText='position:fixed;left:0;top:0;z-index:99999;pointer-events:none;transform:translate(1300px,800px)'; document.body.appendChild(c);
  const r=document.createElement('div'); r.id='vring'; r.style.cssText='position:fixed;z-index:99998;pointer-events:none;width:34px;height:34px;margin:-17px 0 0 -17px;border:2px solid #e7a39c;border-radius:50%;opacity:0'; document.body.appendChild(r);
  const band=document.createElement('div'); band.style.cssText='display:none;position:fixed;left:0;right:0;bottom:0;height:250px;background:linear-gradient(rgba(31,32,35,0),rgba(31,32,35,.94) 55%);z-index:99990;pointer-events:none'; document.body.appendChild(band);
  const cap=document.createElement('div'); cap.id='vcap'; cap.textContent=capTxt; cap.style.cssText='display:none;position:fixed;left:120px;top:915px;font:500 72px/1 Plex,sans-serif;color:#f2efea;z-index:99991;opacity:0;white-space:nowrap;letter-spacing:-.01em;pointer-events:none'; document.body.appendChild(cap);
  window.__cur={x:1300,y:800}; window.__setCur=(x,y)=>{ __cur={x,y}; c.style.transform=`translate(${x}px,${y}px)`; };
  window.__ring=(x,y,t)=>{ r.style.left=x+'px'; r.style.top=y+'px'; r.style.opacity=String(Math.max(0,1-t)); r.style.transform=`scale(${.6+t*.9})`; };
},[capTxt]);
fs.mkdirSync(OUT,{recursive:true}); let n=0; const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const shot=async()=>{ if(ORBIT_ONLY&&!ORB) return; await p.evaluate(()=>__vcStep()); await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))); await p.screenshot({path:`${OUT}/f${String(n++).padStart(5,'0')}.jpg`,type:'jpeg',quality:92}); };
let capO=0; const capTo=async v=>{ capO=v; await p.evaluate(v=>document.getElementById('vcap').style.opacity=v,v); };
const hold=async s=>{ for(let i=0;i<s*FPS;i++){ if(capO<1) await capTo(Math.min(1,capO+.08)); await shot(); } };
const moveClick=async sel=>{ const bx=await p.evaluate(s=>{ const e=document.querySelector(s); const r=e.getBoundingClientRect(); return [r.left+Math.min(80,r.width/2),r.top+r.height/2]; },sel);
  const [x0,y0]=await p.evaluate(()=>[__cur.x,__cur.y]);
  for(let i=0,N=Math.round(.9*FPS);i<N;i++){ const t=ease(i/(N-1)); await p.evaluate(([x,y])=>__setCur(x,y),[x0+(bx[0]-x0)*t,y0+(bx[1]-y0)*t]); if(capO<1) await capTo(Math.min(1,capO+.08)); await shot(); }
  for(let i=0;i<7;i++){ await p.evaluate(([x,y,t])=>__ring(x,y,t),[bx[0],bx[1],i/7]); await shot(); }
  await p.click(sel); };
await p.evaluate(()=>__vcOn()); if(ex===0) await hold(.5);
await moveClick('#wEx'); await p.waitForTimeout(500); await hold(.4);
await moveClick(`#wList .ex[data-i="${ex}"]`);
await p.evaluate(()=>{ document.getElementById('vcur').style.opacity=0; });
await p.waitForTimeout(800); await p.click('.tier[data-t="community"]').catch(()=>{}); await p.waitForTimeout(9000);
ORB=true; await capTo(1);
// a slow orbit on the lot
await p.evaluate(()=>{ const R=BD.scene3d.rig(); const off=R.cam.position.clone().sub(R.ctl.target); window.__cam0={r:Math.hypot(off.x,off.z),a:Math.atan2(off.z,off.x),y:off.y};
  window.__orbit=(da,z)=>{ const R=BD.scene3d.rig(), t=R.ctl.target, k=__cam0; const a=k.a+da, r=k.r*z; R.cam.position.set(t.x+r*Math.cos(a), t.y+k.y*z, t.z+r*Math.sin(a)); R.cam.lookAt(t); R.ctl.update&&R.ctl.update(); }; });
for(let i=0,N=(ORBIT_ONLY?2.6:3.0)*FPS;i<N;i++){ const t=ease(i/(N-1)); await p.evaluate(t=>__orbit(.35*t,1-.08*t),t); await shot(); }
console.log('frames',n,'errs',errs.slice(0,3)); await b.close(); })();
