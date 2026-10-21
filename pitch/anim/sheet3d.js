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

// ---- Draft 4 (21 Oct 2026): recognizable receivers, and a camera that visits each opportunity with a large callout.
// The system part plays faster (S.warp: k× speed until 'until' s), then the visits run in real time.
const grp=(...objs)=>{ const g=new THREE.Group(); objs.flat().forEach(o=>{ scene.remove(o); g.add(o); }); scene.add(g); return g; };
const lineSeg=(pts,col,op=.9)=>{ const l=new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:col,transparent:true,opacity:op})); scene.add(l); return l; };
const extr=(shape2d,depth,x,y,z,o)=>{ const s=new THREE.Shape(shape2d.map(([a,b])=>new THREE.Vector2(a,b))); const g=new THREE.ExtrudeGeometry(s,{depth,bevelEnabled:false}); g.translate(0,0,-depth/2); return solid(g,V(x,y,z),o); };
// windows on the two faces the camera sees (+x and +z)
function windows(x,z,w,d,h,col=0x9a968f,y0=.8,dy=1.5,dx=1.3){ const P=[]; const rect=(a,b,c,e,face)=>{ const q=face==='x'?[[x+w/2+.02,b,a],[x+w/2+.02,b,c],[x+w/2+.02,e,c],[x+w/2+.02,e,a]]:[[a,b,z+d/2+.02],[c,b,z+d/2+.02],[c,e,z+d/2+.02],[a,e,z+d/2+.02]];
    for(let i=0;i<4;i++){ P.push(V(...q[i]),V(...q[(i+1)%4])); } };
  for(let y=y0;y+.9<h;y+=dy){ for(let u=-d/2+.5;u+.7<d/2;u+=dx) rect(z+u,y,z+u+.7,y+.9,'x'); for(let u=-w/2+.5;u+.7<w/2;u+=dx) rect(x+u,y,x+u+.7,y+.9,'z'); }
  return lineSeg(P,col,.75); }
const R_ = {
  greenhouse(x,z,w=7,d=5,col=0x9fd3c7){ const n=Math.max(3,Math.round(w/1.6)), bw=w/n, hb=1.5, out=[box(w,hb,d,x,0,z,{edge:col,fill:0x26302e,fo:.35})];
    for(let i=0;i<n;i++){ const cx=x-w/2+bw*(i+.5); out.push(extr([[-bw/2,0],[bw/2,0],[0,bw*.55]],d,cx,hb,z,{edge:col,fill:0x26302e,fo:.3})); }
    const rows=[]; for(let k=-1;k<=1;k++) rows.push(V(x-w/2+.6,.35,z+k*1.2),V(x+w/2-.6,.35,z+k*1.2)); out.push(lineSeg(rows,0x7fbf8f,.9)); return grp(out); },
  pylons(x,z0,z1,n=3,col=0xa9b4e0,H=8){ const P=[]; const lg=[[-1,-1],[1,-1],[1,1],[-1,1]]; const tops=[]; for(let j=0;j<n;j++){ const z=z0+(z1-z0)*j/(n-1);
      lg.forEach(([a,b])=>P.push(V(x+a*1,0,z+b*1),V(x+a*.22,H,z+b*.22))); for(let k=1;k<5;k++){ const y=k*H/5, s=1-(.78*k/5); for(let i=0;i<4;i++){ const [a,b]=lg[i],[c,e]=lg[(i+1)%4]; P.push(V(x+a*s,y,z+b*s),V(x+c*s,y,z+e*s)); } }
      P.push(V(x-2,H*.82,z),V(x+2,H*.82,z)); tops.push(z); }
    for(let j=1;j<n;j++) [-1.9,1.9].forEach(dx=>P.push(V(x+dx,H*.8,tops[j-1]),V(x+dx,H*.8,tops[j]))); return grp(lineSeg(P,col,.85)); },
  pool(x,z,w=8,d=5.5,col=0x8fc3dc){ const hall=box(w,2.8,d,x,0,z,{dashed:true,edge:0xd9d4cc,eo:.8}); const wa=new THREE.Mesh(new THREE.PlaneGeometry(w-1.6,d-1.8),new THREE.MeshBasicMaterial({color:0x4f86ad,transparent:true,opacity:.7})); wa.rotation.x=-Math.PI/2; wa.position.set(x,.32,z); scene.add(wa);
    const L=[]; for(let k=1;k<4;k++){ const zz=z-(d-1.8)/2+k*(d-1.8)/4; L.push(V(x-(w-1.6)/2,.34,zz),V(x+(w-1.6)/2,.34,zz)); } const rim=box(w-1.2,.3,d-1.4,x,0,z,{edge:col,fill:0x2a2c30,fo:.0});
    return grp(hall,wa,lineSeg(L,0xe8f3f8,.8),rim); },
  housing(x,z,w=5,d=5,h=9,col=0xd9d4cc){ return grp(box(w,h,d,x,0,z,{edge:col}),windows(x,z,w,d,h),extr([[-w/2,0],[w/2,0],[w/2,.6],[-w/2,.6]],d,x,h,z,{edge:col})); },
  tower(x,z,w=4,d=4,h=14,col=0xd9d4cc){ return grp(box(w+3,3,d+3,x,0,z,{edge:col}),box(w,h,d,x,3,z,{edge:col}),windows(x,z,w,d,h+3,0x9a968f,3.8,1.4)); },
  school(x,z,col=0xd9d4cc){ const b=box(7,4.2,3.4,x,0,z-2.6,{edge:col}); const ro=extr([[-3.7,0],[3.7,0],[0,1.3]],3.6,x,4.2,z-2.6,{edge:col});
    const P=[]; const tr=(rx,rz,cx,cz)=>{ const pts=[]; for(let k=0;k<=64;k++){ const a=k/64*Math.PI*2; const c=Math.cos(a), s=Math.sin(a); const sx=Math.sign(c)*Math.min(1,Math.abs(c)*1.6); pts.push(V(cx+rx*sx*(Math.abs(c)>.6?1:Math.abs(c)/.6)+ (c>0?1:-1)*0, .06, cz+rz*s)); } for(let k=0;k<64;k++) P.push(pts[k],pts[k+1]); };
    tr(3.6,1.6,x,z+2.6); tr(3.0,1.1,x,z+2.6);
    return grp(b,ro,windows(x,z-2.6,7,3.4,4.2),lineSeg(P,0xe7a39c,.9),cyl(.05,3.4,x+3.9,1.7,z-.6,'y',{edge:col})); },
  tanks(x,z,n=3,r=1.5,col=0x8fc3dc){ const out=[]; for(let i=0;i<n;i++){ const cx=x+(i-(n-1)/2)*(2*r+.6); out.push(cyl(r,.9,cx,.45,z,'y',{edge:col,fill:0x28323a})); const wa=new THREE.Mesh(new THREE.CircleGeometry(r*.92,32),new THREE.MeshBasicMaterial({color:0x4f86ad,transparent:true,opacity:.6})); wa.rotation.x=-Math.PI/2; wa.position.set(cx,.92,z); scene.add(wa); out.push(wa, lineSeg([V(cx-r,.95,z),V(cx+r,.95,z)],0xd9d4cc,.8)); }
    out.push(box(2.4,1.8,2,x,0,z+r+1.8,{edge:col})); return grp(out); },
  substation(x,z,col=0xa9b4e0){ const f=box(6,1.3,5,x,0,z,{dashed:true,edge:col,eo:.8}); const tf=[-1.4,1.4].map(dx=>box(1.6,1.4,1.4,x+dx,0,z,{edge:col}));
    const ins=[-1.4,1.4].flatMap(dx=>[-.4,0,.4].map(k=>cyl(.08,.7,x+dx+k,1.75,z,'y',{edge:col})));
    const px=x+4.6, H=9, P=[]; const lg=[[-1,-1],[1,-1],[1,1],[-1,1]]; lg.forEach(([a,b])=>P.push(V(px+a*1.1,0,z+b*1.1),V(px+a*.25,H,z+b*.25)));
    for(let k=1;k<5;k++){ const y=k*H/5, s=1.1-(.85*k/5); for(let i=0;i<4;i++){ const [a,b]=lg[i],[c,e]=lg[(i+1)%4]; P.push(V(px+a*s,y,z+b*s),V(px+c*s,y,z+e*s)); } }
    P.push(V(px-2.2,H*.8,z),V(px+2.2,H*.8,z), V(px-1.6,H*.95,z),V(px+1.6,H*.95,z)); return grp(f,tf,ins,lineSeg(P,col,.85)); },
  batteries(x,z,col=0x7fbf8f){ const out=[]; for(let i=0;i<3;i++){ const cz=z+(i-1)*3.1; out.push(box(6,2.6,2.4,x,0,cz,{edge:col})); const L=[]; for(let k=1;k<6;k++) L.push(V(x-3+k,0,cz+1.21),V(x-3+k,2.6,cz+1.21)); out.push(lineSeg(L,col,.5)); } return grp(out); },
  evlot(x,z,col=0xa9b4e0){ const out=[]; const S=[]; for(let i=0;i<=5;i++){ S.push(V(x-5+i*2,.05,z-2.6),V(x-5+i*2,.05,z+.4)); } S.push(V(x-5,.05,z+.4),V(x+5,.05,z+.4)); out.push(lineSeg(S,0x9a968f,.8));
    for(let i=0;i<5;i++){ const cx=x-4+i*2; if(i!==2){ out.push(box(1.5,.7,2.4,cx,.25,z-1.3,{edge:0xd9d4cc}), box(1.2,.5,1.2,cx,.95,z-1.4,{edge:0xd9d4cc})); [[-.6,-2.1],[.6,-2.1],[-.6,-.5],[.6,-.5]].forEach(([a,b])=>out.push(cyl(.25,.2,cx+a,.25,z+b+.0,'x',{edge:0x9a968f}))); }
      out.push(box(.35,1.5,.3,cx,0,z+1.1,{edge:col,fill:0x2f3a4a})); out.push(lineSeg([V(cx,1.2,z+.95),V(cx,.8,z+.2),V(cx,.7,z-.2)],col,.9)); }
    out.push(box(10.6,.1,1.4,x,3.0,z+1.6,{edge:col,fill:0x2f3a4a,fo:.15})); [-5,5].forEach(dx=>out.push(cyl(.08,3,x+dx*.98,1.5,z+1.2,'y',{edge:col}))); return grp(out); },
  recycler(x,z,col=0x7f9a73){ const sh=box(5,3,4,x,0,z,{edge:col}); const ro=extr([[-2.6,0],[2.6,0],[0,.45]],4.2,x,3,z,{edge:col}); const bay=lineSeg([V(x+2.52,0,z-1.2),V(x+2.52,2.2,z-1.2),V(x+2.52,2.2,z-1.2),V(x+2.52,2.2,z+1.2),V(x+2.52,2.2,z+1.2),V(x+2.52,0,z+1.2)],col,.9); const conv=lineSeg([V(x+2.6,.9,z+1),V(x+4.2,2.4,z+1),V(x+2.6,.6,z+1.4),V(x+4.2,2.1,z+1.4)],0x9a968f,.9); const pile=solid(new THREE.ConeGeometry(1.4,1.4,10),V(x+4,.7,z+1),{edge:0xc9a35a,fill:0x3a3428});
    const bales=[]; for(let i=0;i<3;i++) for(let j=0;j<2-(i>1?1:0);j++) bales.push(box(.9,.8,.9,x+3.3+i*.95,j*.8,z-1.4,{edge:0xc9a35a,fill:0x3a3428})); return grp(sh,ro,bay,conv,pile,bales); },
  workshop(x,z,col=0xa9c49a){ const b=box(6,2.6,4,x,0,z,{edge:col}); const st=[0,1,2].map(i=>extr([[-1,0],[1,0],[1,1.1]],4,x-2+i*2,2.6,z,{edge:col}));
    const bn=[box(3.6,.9,.8,x,0,z+2.8,{edge:0x9a968f}),...[0,1,2].map(i=>box(.6,.5,.6,x-1.2+i*1.2,.9,z+2.8,{edge:col,fill:0x34382f}))]; return grp(b,st,bn); },
  houses(x,z,n=3,col=0x9a968f){ const out=[]; for(let i=0;i<n;i++){ const cx=x+(i-(n-1)/2)*4.2; out.push(box(3.2,3,3.6,cx,0,z,{edge:col}), extr([[-1.8,0],[1.8,0],[0,1.6]],3.8,cx,3,z,{edge:col}), windows(cx,z,3.2,3.6,3,0x6a6d73,.9,1.4,1.4)); } return grp(out); },
  people(x,z,n=5,col=0xdcd7cf){ const out=[]; for(let i=0;i<n;i++){ const a=i*2.4, r=.6+i*.25; const px=x+Math.cos(a)*r, pz=z+Math.sin(a)*r; out.push(cyl(.17,.9,px,.45,pz,'y',{edge:col,fill:0x3a3c41})); const hd=new THREE.Mesh(new THREE.SphereGeometry(.17,10,8),new THREE.MeshBasicMaterial({color:col,transparent:true})); hd.position.set(px,1.1,pz); scene.add(hd); out.push(hd); } return grp(out); },
  trees(pts,col=0x7fbf8f){ const out=[]; pts.forEach(([x,z])=>{ out.push(cyl(.08,1,x,.5,z,'y',{edge:0x9a968f})); out.push(solid(new THREE.ConeGeometry(.7,1.8,8),V(x,1.9,z),{edge:col,fill:0x26302a})); }); return grp(out); },
};
// callouts: one large card, left; a leader line to the receiver
document.head.insertAdjacentHTML('beforeend',`<style>
#co{position:fixed;left:120px;top:300px;width:720px;opacity:0;font-family:Plex}
#co .cn{font:500 50px/1.1 Plex;letter-spacing:-.01em}#co .cn span{color:#e7a39c;margin-right:18px}
#co .cg{font:400 28px/1.3 Plex;color:#bdb9b2;margin:14px 0 14px}#co .tag{font-size:22px;padding:7px 10px}
#lead{position:fixed;left:0;top:0;pointer-events:none}
.uc{background:#d1a35e;color:#17181a}
</style>`);
document.body.insertAdjacentHTML('beforeend','<div id="co"><div class="cn"></div><div class="cg"></div><div class="ct"></div></div><svg id="lead" width="1920" height="1080"><line id="ll" stroke="#e7a39c" stroke-width="2" opacity="0"/><circle id="lc" r="7" fill="#e7a39c" opacity="0"/></svg>');
const TAGW={here:'Built here',else:'Built elsewhere',pilot:'Pilot',uc:'Under construction',nyk:'Not yet known',spec:'Speculative'};
let VIS=null;
function visits(S){ // S: {start, slot, list:[{n,name,gets,k,where,obj,at,tg,hh,ox,cap}], outro}
  VIS=S; S.list.forEach((v,i)=>{ v.t0=S.start+i*S.slot; v.t1=v.t0+S.slot; if(v.obj) setOp(v.obj,0); });
  S.end=S.start+S.list.length*S.slot; }
function camState(keys,t){ let i=keys.findIndex(k=>k[0]>t); if(i<0) i=keys.length; if(i===0) i=1; const a=keys[i-1], b=keys[Math.min(i,keys.length-1)]; const u=b===a?1:ease((t-a[0])/(b[0]-a[0]));
  return [a[1].clone().lerp(b[1],u), a[2]+(b[2]-a[2])*u, (a[3]??150)+((b[3]??150)-(a[3]??150))*u]; }
function camSet([tg,hh,ox]){ const oxu=ox/W*2*hh*W/H, oy=20/H*2*hh; cam.left=-hh*W/H-oxu; cam.right=hh*W/H-oxu; cam.top=hh+oy; cam.bottom=-hh+oy; cam.position.copy(tg).addScaledVector(DIR,100); cam.lookAt(tg); cam.updateProjectionMatrix(); }
const R0=window.R;
window.R=t=>{
  if(!VIS){ R0(t); return; }
  const WK=VIS.k, WU=VIS.start, ts=t<WU?t*WK:WU*WK+(t-WU)*.6;
  // run the system at its own time, but with the visit camera and HUD in real time
  const keep=KEYS; if(t>=WU){ const s0=camState(keep,WU*WK); const VK=[[WU,...s0]]; VIS.list.forEach(v=>{ VK.push([v.t0+.6,v.tg,v.hh,v.ox??260],[v.t1,v.tg,v.hh,v.ox??260]); }); if(VIS.outro) VK.push([VIS.end+.7,...VIS.outro],[VIS.end+9,...VIS.outro]); KEYS=VK; }
  const capsSave=CAPS; CAPS=[]; R0(ts); CAPS=capsSave; KEYS=keep;
  if(t>=WU){ const VK=[[WU,...camState(keep,WU*WK)]]; VIS.list.forEach(v=>{ VK.push([v.t0+.6,v.tg,v.hh,v.ox??260],[v.t1,v.tg,v.hh,v.ox??260]); }); if(VIS.outro) VK.push([VIS.end+.7,...VIS.outro],[VIS.end+9,...VIS.outro]); camSet(camState(VK,t)); }
  const sysOff=1-seg(t,WU-.3,WU+.3);
  labs.forEach(l=>{ if(!l.vis) l.e.style.opacity=(+l.e.style.opacity)*sysOff; }); fixed.forEach(f=>f.e.style.opacity=(+f.e.style.opacity)*sysOff);
  document.getElementById('key').style.opacity=(+document.getElementById('key').style.opacity)*sysOff;
  // receivers appear as the camera arrives, and stay
  VIS.list.forEach(v=>{ if(v.obj) setOp(v.obj,seg(t,v.t0+.05,v.t0+.6)); });
  const cur=VIS.list.find(v=>t>=v.t0&&t<v.t1), co=document.getElementById('co'), ll=document.getElementById('ll'), lc=document.getElementById('lc');
  if(cur){ co.querySelector('.cn').innerHTML=`<span>${cur.n}</span>${cur.name}`; co.querySelector('.cg').textContent=cur.gets; co.querySelector('.ct').innerHTML=`<span class="tag ${cur.k}">${TAGW[cur.k]}${cur.where?': '+cur.where:''}</span>`;
    const o=win(t,cur.t0+.45,cur.t1-.05,.3); co.style.opacity=o; co.style.transform=`translateY(${(1-seg(t,cur.t0+.45,cur.t0+.75))*12}px)`;
    const v=cur.at.clone().project(cam), ax=(v.x+1)/2*W, ay=(1-v.y)/2*H, r=co.getBoundingClientRect(); const lx=Math.min(r.right+22,ax-30), ly=r.top+38;
    ll.setAttribute('x1',lx); ll.setAttribute('y1',ly); ll.setAttribute('x2',ax); ll.setAttribute('y2',ay); ll.setAttribute('opacity',o); lc.setAttribute('cx',ax); lc.setAttribute('cy',ay); lc.setAttribute('opacity',o); }
  else { co.style.opacity=0; ll.setAttribute('opacity',0); lc.setAttribute('opacity',0); }
  CAPS.forEach(c=>c.e.style.opacity=win(t,c.a,c.b));
  VIS.list.forEach(v=>{ if(v.capE) v.capE.style.opacity=win(t,v.t0+.3,v.t1+(v===VIS.list[VIS.list.length-1]?.9:0)); });
  if(VIS.condAt){ CP.style.opacity=win(t,VIS.condAt,window.DUR-.1); CI.forEach((e,i)=>{ const a=VIS.condAt+.2+i*.32; e.style.opacity=seg(t,a,a+.4); e.style.transform=`translateX(${(1-seg(t,a,a+.4))*-16}px)`; }); }
  document.getElementById('hd').style.opacity=seg(t,.2,.9);
  R3.render(scene,cam);
};
function visitCaps(){ VIS.list.forEach(v=>{ if(!v.cap) return; const e=document.createElement('div'); e.className='cap'; e.textContent=v.cap; document.body.appendChild(e); v.capE=e; }); }
