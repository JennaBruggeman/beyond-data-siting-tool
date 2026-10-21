// Shared kit for the exchange-sheet animations (sheets 2–5). Each page sets window.SHEET = {n,title,sub,key,caps,conds,keys,dur} and builds its scene with these helpers.
const W=1920,H=1080;
document.head.insertAdjacentHTML('beforeend',`<style>
@font-face{font-family:Plex;font-weight:400;src:url(plex-400.woff2)}@font-face{font-family:Plex;font-weight:500;src:url(plex-500.woff2)}
html,body{margin:0;background:#1f2023;overflow:hidden;width:1920px;height:1080px;font-family:Plex,sans-serif;color:#f2efea}
canvas{display:block}
#hd{position:fixed;left:120px;top:70px}#hd .n{font:500 64px/1 Plex;color:#e7a39c;display:inline-block;width:56px}#hd .t{font:500 54px/1 Plex;display:inline-block}
#hd .s{font:400 26px/1.3 Plex;color:#e7a39c;margin:14px 0 0 58px;max-width:1250px}
#band{position:fixed;left:0;right:0;bottom:0;height:250px;background:linear-gradient(rgba(31,32,35,0),rgba(31,32,35,.94) 55%)}
.cap{position:fixed;left:120px;top:915px;font:500 72px/1 Plex;opacity:0;white-space:nowrap;letter-spacing:-.01em}
.lab{position:fixed;left:0;top:0;font:400 27px/1.25 Plex;color:#f2efea;white-space:nowrap;opacity:0}
.lab b{font-weight:500}.lab i{font-style:normal;color:#bdb9b2;font-size:22px;display:block}
.lab .dot{position:absolute;left:-14px;top:9px;width:8px;height:8px;border-radius:50%;background:#f2efea}
.tag{display:inline-block;font:500 20px/1 Plex;padding:6px 9px;border-radius:4px;margin-top:6px}
.here{background:#7fbf8f;color:#17181a}.else{background:#c9c2b6;color:#17181a}.pilot{background:#d1a35e;color:#17181a}.nyk{border:1.5px solid #918d86;color:#bdb9b2}.spec{border:1.5px solid #e7a39c;color:#e7a39c}
#key{position:fixed;right:110px;top:76px;font:400 19px/1.9 Plex;color:#bdb9b2;opacity:0}
#key span{display:inline-block;width:34px;height:4px;vertical-align:middle;margin-right:12px;border-radius:2px}
.panel{position:fixed;background:rgba(31,32,35,.92);border:1.5px solid #3b3e43;border-radius:6px;padding:18px 22px;opacity:0;font-family:Plex}
.panel .ph{font:500 21px Plex;color:#bdb9b2;letter-spacing:.02em;margin-bottom:12px}
.note{position:fixed;left:120px;top:300px;opacity:0;font:400 22px/1.35 Plex;color:#bdb9b2}
.note b{display:block;color:#f2efea;font:500 26px Plex;margin-bottom:6px}
</style>`);
document.body.insertAdjacentHTML('afterbegin',`<div id="hd"><span class="n"></span><span class="t"></span><div class="s"></div></div><div id="key"></div><div id="band"></div>`);
const R3=new THREE.WebGLRenderer({antialias:true}); R3.setSize(W,H); R3.setPixelRatio(1); R3.setClearColor(0x1f2023); document.body.prepend(R3.domElement);
const scene=new THREE.Scene(), cam=new THREE.OrthographicCamera(-1,1,1,-1,-500,500), DIR=new THREE.Vector3(1,.92,1.05).normalize();
scene.add(new THREE.AmbientLight(0xffffff,.9)); const _dl=new THREE.DirectionalLight(0xffffff,.5); _dl.position.set(5,10,3); scene.add(_dl);
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)), ease=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;}, seg=(t,a,b)=>ease((t-a)/(b-a)), win=(t,a,b,f=.45)=>Math.min(seg(t,a,a+f),1-seg(t,b-f,b));
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
const grid=new THREE.GridHelper(200,100,0x2b2d31,0x2b2d31); grid.position.set(10,0,20); scene.add(grid);
const EDGE=0xd9d4cc, FILL=0x2a2c30;
function solid(geo,pos,{fill=FILL,edge=EDGE,eo=.9,dashed=false,fo}={}){ const g=new THREE.Group(); const m=new THREE.Mesh(geo,new THREE.MeshLambertMaterial({color:fill,transparent:true,opacity:fo??(dashed?.25:1)}));
  const eg=new THREE.EdgesGeometry(geo,20); const lm=dashed?new THREE.LineDashedMaterial({color:edge,dashSize:.35,gapSize:.25,transparent:true,opacity:eo}):new THREE.LineBasicMaterial({color:edge,transparent:true,opacity:eo});
  const l=new THREE.LineSegments(eg,lm); if(dashed) l.computeLineDistances(); g.add(m,l); g.position.copy(pos); scene.add(g); return g; }
const box=(w,h,d,x,y,z,o)=>solid(new THREE.BoxGeometry(w,h,d),V(x,y+h/2,z),o);
const cyl=(r,len,x,y,z,axis='y',o)=>{ const g=new THREE.CylinderGeometry(r,r,len,28,1); if(axis==='x') g.rotateZ(Math.PI/2); if(axis==='z') g.rotateX(Math.PI/2); return solid(g,V(x,y,z),o); };
const setOp=(g,o)=>g.traverse(c=>{ if(c.material){ if(c.userData.base===undefined) c.userData.base=c.material.opacity; c.material.opacity=c.userData.base*o; c.visible=o>.01; } });
const grow=(g,u,y0)=>{ g.scale.y=Math.max(.001,u); setOp(g,u>0?1:0); };
const PIPES=[];
function pipe(pts,col,r,t0,dur,beads=10,speed=.12,opts={}){ const curve=new THREE.CurvePath(); for(let i=1;i<pts.length;i++) curve.add(new THREE.LineCurve3(pts[i-1],pts[i]));
  const geo=new THREE.TubeGeometry(curve,Math.max(40,pts.length*30),r,8,false); const m=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:opts.op??.9})); scene.add(m);
  const B=[...Array(beads)].map(()=>{ const b=new THREE.Mesh(new THREE.SphereGeometry(r*1.25,10,8),new THREE.MeshBasicMaterial({color:new THREE.Color(col).lerp(new THREE.Color(0xffffff),.55),transparent:true,opacity:.85})); scene.add(b); return b; });
  const p={curve,geo,m,B,t0,dur,speed,len:geo.index.count,flow:1,off:0,rev:!!opts.rev}; PIPES.push(p); return p; }
const labs=[]; function lab(html,p,t0,t1,dx=0,dy=0){ const e=document.createElement('div'); e.className='lab'; e.innerHTML='<span class="dot"></span>'+html; document.body.appendChild(e); labs.push({e,p,t0,t1,dx,dy}); return e; }
const tagHTML=(k,where)=>`<span class="tag ${k}">${{here:'Built here',else:'Built elsewhere',pilot:'Pilot',nyk:'Not yet known',spec:'Speculative'}[k]}${where?': '+where:''}</span>`;
function recv(n,name,k,where,p,t0,t1,dx,dy){ return lab(`<b>${n}  ${name}</b><br>${tagHTML(k,where)}`,p,t0,t1,dx,dy); }
const fixed=[]; function note(html,t0,t1,css=''){ const e=document.createElement('div'); e.className='note'; e.style.cssText+=css; e.innerHTML=html; document.body.appendChild(e); fixed.push({e,t0,t1}); return e; }
function panel(html,t0,t1,css){ const e=document.createElement('div'); e.className='panel'; e.style.cssText+=css; e.innerHTML=html; document.body.appendChild(e); fixed.push({e,t0,t1}); return e; }
let CAPS=[], CI=[], CP=null, KEYS=[], UPD=()=>{}, HUD=null;
function setup(S){
  document.querySelector('#hd .n').textContent=S.n; document.querySelector('#hd .t').textContent=S.title; document.querySelector('#hd .s').textContent=S.sub;
  document.getElementById('key').innerHTML=S.key.map(([c,x,dash])=>`<div><span style="background:${dash?'repeating-linear-gradient(90deg,'+c+' 0 6px,transparent 6px 10px)':c}"></span>${x}</div>`).join('');
  CAPS=S.caps.map(([a,b,x])=>{const e=document.createElement('div'); e.className='cap'; e.textContent=x; document.body.appendChild(e); return {a,b,e};});
  CP=document.createElement('div'); CP.style.cssText='position:fixed;left:120px;top:250px;font-family:Plex,sans-serif;color:#f2efea;opacity:0';
  CP.innerHTML='<div style="font:500 22px Plex;color:#bdb9b2;letter-spacing:.02em;margin-bottom:14px">Conditions to investigate</div>'+S.conds.map(([h,x,sub])=>`<div class="ci" style="opacity:0;display:flex;align-items:baseline;gap:14px;margin:0 0 12px"><span style="display:inline-block;width:12px;height:12px;border:2px solid #e7a39c;transform:rotate(45deg);flex:none;position:relative;top:1px"></span><span style="font:400 18px Plex;color:#918d86;width:118px;flex:none">${h}</span><span style="font:500 25px Plex">${x}${sub?`<span style="font:400 19px Plex;color:#bdb9b2;margin-left:10px">${sub}</span>`:''}</span></div>`).join('');
  document.body.appendChild(CP); CI=[...CP.querySelectorAll('.ci')]; KEYS=S.keys; window.DUR=S.dur; HUD=S;
}
function camAt(t){ let i=KEYS.findIndex(k=>k[0]>t); if(i<0) i=KEYS.length; if(i===0) i=1; const a=KEYS[i-1], b=KEYS[Math.min(i,KEYS.length-1)]; const u=b===a?1:ease((t-a[0])/(b[0]-a[0]));
  const tg=a[1].clone().lerp(b[1],u), hh=a[2]+(b[2]-a[2])*u, ox=(a[3]??150)+((b[3]??150)-(a[3]??150))*u; const oxu=ox/W*2*hh*W/H, oy=20/H*2*hh;
  cam.left=-hh*W/H-oxu; cam.right=hh*W/H-oxu; cam.top=hh+oy; cam.bottom=-hh+oy; cam.position.copy(tg).addScaledVector(DIR,100); cam.lookAt(tg); cam.updateProjectionMatrix(); }
window.R=t=>{
  camAt(t); UPD(t);
  PIPES.forEach(p=>{ const d=p.dur?seg(t,p.t0,p.t0+p.dur):(t>=p.t0?1:0); p.geo.setDrawRange(0,Math.floor(p.len*d)/3*3); p.m.visible=d>0;
    if(!p.custom) p.off=t*p.speed*3; p.B.forEach((b,i)=>{ let q=(((p.off%1)+1)%1+i/p.B.length)%1; if(p.rev) q=1-q; b.position.copy(p.curve.getPointAt(q)); b.visible=d>=1&&p.flow>.02; b.material.opacity=.85*p.flow; }); p.off+=0; });
  labs.forEach(l=>{ const v=l.p.clone().project(cam); let x=(v.x+1)/2*W+l.dx; const y=(1-v.y)/2*H+l.dy; const ew=l.e.offsetWidth; if(x+ew>W-30) x=W-30-ew; if(x<30) x=30; l.e.style.transform=`translate(${x}px,${y}px)`; l.e.style.opacity=win(t,l.t0,l.t1); });
  fixed.forEach(f=>f.e.style.opacity=win(t,f.t0,f.t1));
  CAPS.forEach(c=>c.e.style.opacity=win(t,c.a,c.b));
  document.getElementById('hd').style.opacity=seg(t,.2,.9); document.getElementById('key').style.opacity=win(t,HUD.keyIn??3,HUD.condAt-.2);
  const ca=HUD.condAt; CP.style.opacity=win(t,ca,HUD.dur-.2); CI.forEach((e,i)=>{ const a=ca+.3+i*.5; e.style.opacity=seg(t,a,a+.5); e.style.transform=`translateX(${(1-seg(t,a,a+.5))*-16}px)`; });
  R3.render(scene,cam);
};
// flow position: beads advance with a speed that can change over time (integrated per frame from t)
function flowAt(p,t,speedFn){ p.off=speedFn(t)%1; }
