/* Beyond Data — the site in 3D (v19, 16 Oct 2026). One data-centre model shared by every tab (J.B., 16 Oct): the building the site setup
   describes, its floors and halls, the plant sized from the load and placed inside the usable lot, loading, clearances. Neighbours are
   simple massing to 1.5 km (Vancouver: LiDAR 2022 heights; Edmonton: City 3D buildings or estimates, labelled). Each tab adds an overlay.
   Generic equipment only; nothing locates real utility, fuel or security features. */
(function(){
'use strict';
const BD=window.BD;
const TH='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
const OC='https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js';
const C={bg:0x17181a,face:0x1e2023,edge:0xe9e6e1,acc:0xCC746C,heat:0xd1a35e,power:0xa7b4d6,water:0x7fb2c4,mat:0x9fb38a,senses:0xb9a3cf,city:0xc8c2b8,ok:0x8fb996,bad:0xb24f49,faint:0x6b6964,grey:0x9d9a94};
const DARK=Object.assign({},C), LIGHT=Object.assign({},C,{bg:0xf1f0ec,face:0xf7f6f3,edge:0x4a4d52,grey:0x8a8780,faint:0xb5b2ab,city:0x6b6964,acc:0xc0655c,mat:0x6f8a5c,senses:0x8a6fb0,heat:0xb07a2e,power:0x6a7fb0,water:0x3f87b0});
const light3d=()=>!!(BD.S&&BD.S.light3d); // dark by default again (J.B., 30 Oct 2026: "make the background of the interface dark again"); the light ground and white massing stay one click away
function applyTheme(){ Object.assign(C,light3d()?LIGHT:DARK); if(R) R.ren.setClearColor(C.bg); if(wrap) wrap.style.background=hex(C.bg); if(labels) labels.style.color=light3d()?'#55585d':'#9d9a94'; }
const hex=c=>'#'+c.toString(16).padStart(6,'0');
const RAD=1500, NEAR=420;
let T=null, R=null, wrap=null, labels=null, tip=null, state={};
function load(src){ return new Promise((ok,no)=>{ const s=document.createElement('script'); s.src=src; s.onload=ok; s.onerror=()=>no(new Error('could not load '+src)); document.head.appendChild(s); }); }
async function ensure(){ if(T) return T; if(!window.THREE) await load(TH); if(!THREE.OrbitControls) await load(OC); T=THREE; return T; }

function setup(){
  const map=document.getElementById('map');
  wrap=document.createElement('div'); wrap.id='v3d'; wrap.style.cssText='position:absolute;inset:0;background:#17181a;z-index:2';
  labels=document.createElement('div'); labels.style.cssText='position:absolute;inset:0;pointer-events:none;font:300 11px/1.3 "Open Sans",system-ui,sans-serif;color:#9d9a94;overflow:hidden';
  tip=document.createElement('div'); tip.style.cssText='position:absolute;pointer-events:none;background:rgba(30,32,35,.95);border:1px solid #3c4148;border-radius:6px;padding:5px 8px;font:300 12px/1.35 "Open Sans",system-ui,sans-serif;color:#e9e6e1;display:none;max-width:260px;z-index:4';
  const bar=document.createElement('div'); bar.style.cssText='position:absolute;left:12px;top:12px;right:12px;display:flex;gap:6px;z-index:3;flex-wrap:wrap;pointer-events:none';
  bar.innerHTML='<button id="v3map" style="pointer-events:auto;background:rgba(30,32,35,.92);border:1px solid #3c4148;border-radius:6px;padding:4px 10px;color:#e9e6e1;cursor:pointer;font-size:12px">← Map</button><button id="v3light" style="pointer-events:auto;background:rgba(30,32,35,.92);border:1px solid #3c4148;border-radius:6px;padding:4px 10px;color:#e9e6e1;cursor:pointer;font-size:12px">Light ground</button><span id="v3sl" style="pointer-events:auto;display:none;background:rgba(30,32,35,.92);border:1px solid #3c4148;border-radius:6px;padding:2px 4px 2px 10px;font-size:12px;color:#e9e6e1">Secure line <button data-sl="off">Off</button><button data-sl="today">Today</button><button data-sl="proposed">Proposed</button></span><span id="v3note" style="background:rgba(30,32,35,.92);border:1px solid #30343a;border-radius:6px;padding:4px 10px;font-size:12px;color:#9d9a94;max-width:640px"></span>';
  const key=document.createElement('div'); key.id='v3key'; key.addEventListener('click',ev=>{ const t=ev.target.closest&&ev.target.closest('[data-sl]'); if(!t) return; state.secure=t.dataset.sl; secureDraw(); key.innerHTML=modelKey(); }); key.style.cssText='position:absolute;left:12px;bottom:12px;background:rgba(30,32,35,.92);border:1px solid #30343a;border-radius:6px;padding:6px 10px;font:300 11.5px/1.5 "Open Sans",system-ui,sans-serif;color:#9d9a94;z-index:3;max-width:320px';
  wrap.appendChild(labels); wrap.appendChild(bar); wrap.appendChild(key); wrap.appendChild(tip); map.appendChild(wrap); for(const ev of ['pointerdown','wheel']) wrap.addEventListener(ev,e=>e.stopPropagation()); // the 2D map captures the pointer on pointerdown, which swallowed clicks on ← Map; pointerup must reach the document, where the orbit control listens for the release
  const ren=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true}); ren.setPixelRatio(Math.min(window.devicePixelRatio||1,2)); ren.setClearColor(C.bg);
  wrap.insertBefore(ren.domElement,labels); ren.domElement.style.cssText='display:block;width:100%;height:100%';
  const scene=new T.Scene(); const cam=new T.PerspectiveCamera(35,1,1,40000);
  const ctl=new T.OrbitControls(cam,ren.domElement); ctl.enableDamping=true; ctl.dampingFactor=0.15; ctl.maxPolarAngle=Math.PI*0.48; ctl.maxDistance=9000;
  R={ren,scene,cam,ctl}; applyTheme(); ren.shadowMap.enabled=true; ren.shadowMap.type=T.PCFSoftShadowMap;
  // lights for the equipment kit (kit3d.js uses lit materials; the rest of the scene is unlit) — 29 Oct 2026
  R.lights=[new T.HemisphereLight(0xffffff,0x8f8c85,0.5),new T.DirectionalLight(0xffffff,0.6)]; { const d=R.lights[1]; d.position.set(-260,520,320); d.castShadow=true; d.shadow.mapSize.set(4096,4096);
    const c=d.shadow.camera; c.left=-NEAR; c.right=NEAR; c.top=NEAR; c.bottom=-NEAR; c.near=10; c.far=2000; d.shadow.bias=-0.0006; d.shadow.normalBias=0.6; }
  document.getElementById('v3map').onclick=()=>hide();
  document.getElementById('v3sl').addEventListener('click',ev=>{ const t=ev.target.closest&&ev.target.closest('[data-sl]'); if(!t) return; state.secure=t.dataset.sl; secureDraw(); if(state.tab==='model'||!FN[state.tab]) document.getElementById('v3key').innerHTML=modelKey(); slButtons(); });
  document.getElementById('v3light').onclick=()=>{ BD.S.light3d=!BD.S.light3d; document.getElementById('v3light').textContent=BD.S.light3d?'Dark ground':'Light ground'; state.key=null; show(state.tab||'model',{site:state.site}); };
  const fit=()=>{ const b=wrap.getBoundingClientRect(); if(!b.width) return; ren.setSize(b.width,b.height,false); cam.aspect=b.width/b.height; cam.updateProjectionMatrix(); };
  new ResizeObserver(fit).observe(wrap); fit();
  // hover: which building is under the pointer (neighbours, receivers)
  const ray=new T.Raycaster(), mv=new T.Vector2();
  ren.domElement.addEventListener('pointermove',e=>{ if(!R.nbMesh) return; const b=ren.domElement.getBoundingClientRect(); mv.x=(e.clientX-b.left)/b.width*2-1; mv.y=-(e.clientY-b.top)/b.height*2+1; ray.setFromCamera(mv,cam);
    const hit=ray.intersectObject(R.nbMesh)[0]; if(!hit){ tip.style.display='none'; return; } const i=whichB(hit.faceIndex); const nb=R.nbList[i]; if(!nb){ tip.style.display='none'; return; }
    tip.innerHTML=hoverText(nb); tip.style.display=''; tip.style.left=Math.min(b.width-270,e.clientX-b.left+14)+'px'; tip.style.top=(e.clientY-b.top+14)+'px'; });
  ren.domElement.addEventListener('pointerleave',()=>{ tip.style.display='none'; });
  ren.domElement.addEventListener('click',e=>{ if(!R.onPick||!R.nbMesh) return; const b=ren.domElement.getBoundingClientRect(); mv.x=(e.clientX-b.left)/b.width*2-1; mv.y=-(e.clientY-b.top)/b.height*2+1; ray.setFromCamera(mv,cam); const hit=ray.intersectObject(R.nbMesh)[0]; if(hit){ const nb=R.nbList[whichB(hit.faceIndex)]; if(nb) R.onPick(nb); } });
  (function loop(){ requestAnimationFrame(loop); if(wrap.style.display==='none') return; ctl.update(); if(R.ticks&&R.ticks.length){ const now=performance.now(); R.ticks.forEach(f=>{ try{ f(now); }catch(e){} }); }
    if(R.multi){ const b=wrap.getBoundingClientRect(), w=b.width/3; ren.setScissorTest(true); R.multi.forEach((s,i)=>{ ren.setViewport(i*w,0,w,b.height); ren.setScissor(i*w,0,w,b.height); cam.aspect=w/b.height; cam.updateProjectionMatrix(); ren.render(s,cam); }); ren.setScissorTest(false); }
    else { ren.setViewport(0,0,wrap.clientWidth,wrap.clientHeight); cam.aspect=wrap.clientWidth/Math.max(1,wrap.clientHeight); cam.updateProjectionMatrix(); ren.render(scene,cam); placeLabels(); } })();
}
function hoverText(nb){ const b=nb.b; let t=`<b style="font-weight:400">${nb.recv?esc(nb.recv.n||'Receiver'):'Building'}</b><br>${b.f===6?'height not known':b.h?b.h.toFixed(0)+' m tall':''}${b.f===5||b.f===7?' (measured)':BD.S.city==='edm'&&b.f!==6?' (estimate)':''} · ${Math.round(nb.d)} m from the site`;
  if(nb.recv) t+=`<br><span style="color:#9d9a94">${esc(nb.recvType||'')}${nb.recv.u?' · '+nb.recv.u+' homes':''}</span>`;
  if(nb.noise) t+=`<br><span style="color:#9d9a94">${esc(nb.noise)}</span>`; return t; }
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- labels: leaders are vertical (orthogonal); overlapping labels give way by priority ---------- */
const lab=[];
const LMAP={'#9d9a94':'#55585d','#e39a93':'#a8483f','#e9e6e1':'#26282b','#cdb07a':'#8a6a1c','#8fb996':'#3f7a4a'};
function label(text,pos,col,o){ o=o||{}; if(light3d()) col=LMAP[col]||col||'#55585d'; if(!pos||!pos.clone) return {d:document.createElement('div'),pos:null,prio:0,w:0}; /* lot test 20 Oct: a label with no position (no building found) broke the 3D on Over time / Two cities */ const d=document.createElement('div'); d.textContent=text; d.style.cssText=`position:absolute;white-space:nowrap;transform:translate(-50%,-100%);color:${col||'#9d9a94'};text-shadow:${light3d()?'0 0 3px #f1f0ec,0 0 3px #f1f0ec,0 0 2px #f1f0ec':'0 0 3px #17181a,0 0 3px #17181a,0 0 2px #17181a'};padding:0 2px`;
  labels.appendChild(d); const L={d,pos,prio:o.prio||1,w:text.length*6.5+14}; lab.push(L);
  if(o.from){ R.ov.add(line([o.from,pos.clone().add(new T.Vector3(0,-0.3,0))],o.leaderCol||C.faint,false,0.7)); } return L; }
function placeLabels(){ const b=wrap.getBoundingClientRect(); const placed=[];
  const order=lab.slice().sort((a,c)=>c.prio-a.prio);
  for(const l of order){ if(!l.pos) continue; const v=l.pos.clone().project(R.cam); if(!(v.z<1&&Math.abs(v.x)<1.05&&Math.abs(v.y)<1.05)){ l.d.style.display='none'; continue; }
    const x=(v.x+1)/2*b.width, y=(1-v.y)/2*b.height; const box=[x-l.w/2,y-20,x+l.w/2,y+3];
    if(placed.some(p=>!(box[2]<p[0]||box[0]>p[2]||box[3]<p[1]||box[1]>p[3]))){ l.d.style.display='none'; continue; }
    placed.push(box); l.d.style.display=''; l.d.style.left=x+'px'; l.d.style.top=y+'px'; } }

/* ---------- geometry helpers: local metres (x east, y north) → three (x, y up, z south) ---------- */
function V(x,y,z){ return new T.Vector3(x-state.c[0],z||0,-(y-state.c[1])); }
function shapeOf(r){ const s=new T.Shape(); s.moveTo(r[0]-state.c[0],r[1]-state.c[1]); for(let i=2;i<r.length;i+=2) s.lineTo(r[i]-state.c[0],r[i+1]-state.c[1]); return s; }
function prism(r,h,base,faceCol,edgeCol,edgeOp,faceOp){
  const g=new T.ExtrudeGeometry(shapeOf(r),{depth:Math.max(0.1,h),bevelEnabled:false}); g.rotateX(-Math.PI/2); g.translate(0,base||0,0);
  const mat=new T.MeshBasicMaterial({color:faceCol,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1}); if(faceOp!=null){ mat.transparent=true; mat.opacity=faceOp; mat.depthWrite=faceOp>0.6; }
  const m=new T.Mesh(g,mat); const e=new T.LineSegments(new T.EdgesGeometry(g,20),new T.LineBasicMaterial({color:edgeCol,transparent:true,opacity:edgeOp}));
  const grp=new T.Group(); grp.add(m); grp.add(e); grp.userData.edge=e; return grp; }
function line(pts,col,dashed,op){ const g=new T.BufferGeometry().setFromPoints(pts);
  const m=dashed?new T.LineDashedMaterial({color:col,dashSize:dashed===true?4:dashed,gapSize:dashed===true?3:dashed*0.7,transparent:true,opacity:op==null?1:op}):new T.LineBasicMaterial({color:col,transparent:true,opacity:op==null?1:op});
  const l=new T.Line(g,m); if(dashed) l.computeLineDistances(); return l; }
function ringLine(r,z,col,dashed,op){ if(!r||r.length<6) return new T.Group(); /* lot test 20 Oct: a plant yard clipped to nothing broke the 3D on small lots */ const p=[]; for(let i=0;i<r.length;i+=2) p.push(V(r[i],r[i+1],z)); p.push(p[0].clone()); return line(p,col,dashed,op); }
function circlePts(cx,cy,rad,z,n){ const p=[]; for(let i=0;i<=(n||96);i++){ const a=i/(n||96)*Math.PI*2; p.push(V(cx+rad*Math.cos(a),cy+rad*Math.sin(a),z||0.3)); } return p; }
function arc(a,b,h,n){ const p=[]; for(let i=0;i<=(n||32);i++){ const t=i/(n||32); const v=a.clone().lerp(b,t); v.y+=Math.sin(Math.PI*t)*h; p.push(v); } return p; }
function bbox(r){ let a=1e9,b=1e9,c=-1e9,d=-1e9; for(let i=0;i<r.length;i+=2){ a=Math.min(a,r[i]); b=Math.min(b,r[i+1]); c=Math.max(c,r[i]); d=Math.max(d,r[i+1]); } return [a,b,c,d]; }
function offsetRing(r,d){ // miter offset of a simple polygon (outward for d>0)
  const n=r.length/2, out=[]; const sa=(()=>{ let s=0; for(let i=0,j=r.length-2;i<r.length;j=i,i+=2) s+=(r[j]*r[i+1]-r[i]*r[j+1]); return s>0?1:-1; })();
  for(let i=0;i<n;i++){ const p=[r[2*((i-1+n)%n)],r[2*((i-1+n)%n)+1]], q=[r[2*i],r[2*i+1]], s=[r[2*((i+1)%n)],r[2*((i+1)%n)+1]];
    const n1=norm([q[1]-p[1],-(q[0]-p[0])]), n2=norm([s[1]-q[1],-(s[0]-q[0])]); let m=norm([n1[0]+n2[0],n1[1]+n2[1]]); const cos=m[0]*n1[0]+m[1]*n1[1]; const k=-d*-sa/Math.max(0.35,cos); /* sign fixed 18 Oct (sweep M75): it went inward for both windings */
    out.push(q[0]+m[0]*k,q[1]+m[1]*k); }
  return new Float64Array(out); }
function norm(v){ const l=Math.hypot(v[0],v[1])||1; return [v[0]/l,v[1]/l]; }

/* ---------- neighbours: merged massing to 1.5 km, one mesh + one coloured line set, picking by face ---------- */
function whichB(fi){ const s=R.nbFaceStart; let lo=0,hi=s.length-1; while(lo<hi){ const mid=(lo+hi+1)>>1; if(s[mid]<=fi) lo=mid; else hi=mid-1; } return lo; }
function buildNeighbours(site){
  const S=BD.S, siteB=new Set(site.blds||[]); const pos=[], idx=[], lp=[], lc=[]; const list=[], faceStart=[]; let tri=0;
  // a new building replaces whatever stands on the lot: drop every building whose centre, or half its corners, fall inside the lot (J.B., 16 Oct)
  const ring=S.sel&&S.sel.ring, isNew=(S.answers.built||'new')!=='existing';
  // a building is on the lot if its centre is inside, or any of its corners or edges reach 2 m inside the lot line (footprints and parcels do not line up exactly, so a 2 m margin keeps neighbours that only touch the line)
  let inner=null; try{ if(ring&&BD.geo&&BD.geo.offset){ const a=BD.geo.offset(ring,-2), b=BD.geo.offset(ring,2); inner=BD.area(a)<BD.area(b)?a:b; } }catch(e){} if(inner&&inner.length<6) inner=null;
  const X=(ax,ay,bx,by,cx,cy,dx,dy)=>{ const d=(bx-ax)*(dy-cy)-(by-ay)*(dx-cx); if(!d) return false; const t=((cx-ax)*(dy-cy)-(cy-ay)*(dx-cx))/d, u=((cx-ax)*(by-ay)-(cy-ay)*(bx-ax))/d; return t>0&&t<1&&u>0&&u<1; };
  const onLot=b=>{ if(!ring) return false; if(BD.pip(b.c[0],b.c[1],ring)) return true; if(!inner) return false; const r=b.r, n=r.length/2, m=inner.length/2;
    for(let i=0;i<n;i++){ if(BD.pip(r[2*i],r[2*i+1],inner)) return true; const j=(i+1)%n; for(let p=0;p<m;p++){ const q=(p+1)%m; if(X(r[2*i],r[2*i+1],r[2*j],r[2*j+1],inner[2*p],inner[2*p+1],inner[2*q],inner[2*q+1])) return true; } } return false; };
  const cE=new T.Color(C.edge), cB=new T.Color(C.bg);
  for(const id in S.tiles){ if(!id.startsWith(S.city+':')) continue; for(const b of S.tiles[id].bld){ if(b.f===3||siteB.has(b)||(isNew&&onLot(b))) continue;
      const d=Math.hypot(b.c[0]-site.c[0],b.c[1]-site.c[1]); if(d>RAD) continue; const h=Math.max(2,b.h||0), r=b.r, n=r.length/2;
      const base=pos.length/3; faceStart.push(tri); const near=d<=NEAR; const op=light3d()?(near?0.22:d<900?0.12:0.06):(near?0.30:d<900?0.16:0.09);
      for(let i=0;i<n;i++){ const x=r[2*i]-site.c[0], z=-(r[2*i+1]-site.c[1]); pos.push(x,0,z, x,h,z); }
      for(let i=0;i<n;i++){ const j=(i+1)%n; const a0=base+2*i, a1=a0+1, b0=base+2*j, b1=b0+1; idx.push(a0,b0,b1, a0,b1,a1); tri+=2; }
      const contour=[]; for(let i=0;i<n;i++) contour.push(new T.Vector2(r[2*i],r[2*i+1])); let tris=[]; try{ tris=T.ShapeUtils.triangulateShape(contour,[]); }catch(e){}
      for(const t of tris){ idx.push(base+2*t[0]+1,base+2*t[1]+1,base+2*t[2]+1); tri++; }
      const ls=lp.length/3;
      for(let i=0;i<n;i++){ const j=(i+1)%n; const x=r[2*i]-site.c[0], z=-(r[2*i+1]-site.c[1]), x2=r[2*j]-site.c[0], z2=-(r[2*j+1]-site.c[1]); lp.push(x,h,z, x2,h,z2); if(near||i%2===0) lp.push(x,0,z, x,h,z); }
      const le=lp.length/3; for(let k=ls;k<le;k++) lc.push(cB.r+(cE.r-cB.r)*op,cB.g+(cE.g-cB.g)*op,cB.b+(cE.b-cB.b)*op);
      list.push({b,d,ls,le,op,h}); } }
  const g=new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute(pos,3)); g.setIndex(idx);
  const mesh=new T.Mesh(g,light3d()?new T.MeshStandardMaterial({color:0xf6f5f2,roughness:1,metalness:0,flatShading:true,side:T.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1})
                                   :new T.MeshBasicMaterial({color:C.face,side:T.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1}));
  if(light3d()){ mesh.castShadow=true; mesh.receiveShadow=true; }
  const lg=new T.BufferGeometry(); lg.setAttribute('position',new T.Float32BufferAttribute(lp,3)); lg.setAttribute('color',new T.Float32BufferAttribute(lc,3));
  const lines=new T.LineSegments(lg,new T.LineBasicMaterial({vertexColors:true}));
  R.nbMesh=mesh; R.nbLines=lines; R.nbList=list; R.nbFaceStart=faceStart; R.nbBase=Float32Array.from(lc);
  const grp=new T.Group(); grp.add(mesh); grp.add(lines); return grp; }
function tintB(nb,col,op){ const a=R.nbLines.geometry.attributes.color, c=new T.Color(col); for(let k=nb.ls;k<nb.le;k++) a.setXYZ(k,c.r*op,c.g*op,c.b*op); a.needsUpdate=true; }
function resetTint(){ if(!R.nbLines) return; const a=R.nbLines.geometry.attributes.color; a.array.set(R.nbBase); a.needsUpdate=true; R.nbList.forEach(n=>{ n.recv=null; n.noise=null; }); }
/* receivers snap to the footprint that holds them, or the nearest within 25 m; otherwise "location only" */
function snap(x,y){ let best=null; for(const nb of R.nbList){ const b=nb.b; const bb=b.bb||(b.bb=bbox(b.r)); if(x<bb[0]-25||x>bb[2]+25||y<bb[1]-25||y>bb[3]+25) continue;
    if(BD.pip(x,y,b.r)) return nb; const d=Math.hypot(b.c[0]-x,b.c[1]-y); if(d<25&&(!best||d<best.dd)) best=Object.assign(nb,{dd:d}); } return best; }

/* ---------- the data-centre model ---------- */
/* ---------- equipment kit and envelope (29 Oct 2026) ---------- */
const KITOF={'dry coolers':'dry','air-cooled chillers':'chill','hybrid coolers':'hybrid','cooling tower cells':'tower','standby generators':'genset'};
function kitUnit(b){ const k=KITOF[b.name]; if(!k||!BD.kit) return null; const r=b.ring; if(!r||r.length<8) return null;
  const p=i=>[r[2*i],r[2*i+1]], P0=p(0), P1=p(1), P2=p(2), e1=[P1[0]-P0[0],P1[1]-P0[1]], e2=[P2[0]-P1[0],P2[1]-P1[1]], l1=Math.hypot(...e1), l2=Math.hypot(...e2);
  const along=l1>=l2?e1:e2, L=Math.max(l1,l2), W=Math.min(l1,l2); let cx=0,cy=0; const n=Math.min(4,r.length/2); for(let i=0;i<n;i++){ cx+=r[2*i]; cy+=r[2*i+1]; } cx/=n; cy/=n;
  let g; try{ g=BD.kit.make(k); }catch(e){ return null; } const s=g.userData.spec;
  g.scale.set(L/s.L,(b.h||s.H)/s.H,W/s.W); g.rotation.y=Math.atan2(along[1],along[0]); g.position.copy(V(cx,cy,b.base||0)); g.userData.box=b; return g; }
function envelope(r,H,n){ const g=new T.Group(), fh=H/Math.max(1,n);
  const face=prism(r,H,0,0xe9e6e1,C.acc,0.0,0.035); face.children[0].material.depthWrite=false; g.add(face);         // see-through faces
  for(let i=0;i<=n;i++) g.add(ringLine(r,i*fh+0.02,i===n||i===0?C.acc:C.grey,i===n||i===0?2.5:1.6,i===n||i===0?0.85:0.45)); // dashed floor lines, roof and base in the accent
  for(let i=0;i<r.length;i+=2) g.add(line([V(r[i],r[i+1],0),V(r[i],r[i+1],H)],C.acc,2.5,0.6));                               // dashed corners
  return g; }
function buildSite(site,opt){
  const sc=R.scene; while(sc.children.length) sc.remove(sc.children[0]); lab.length=0; labels.innerHTML=''; R.ov=null;
  state={c:site.c, site, opt:opt||null}; const S=BD.S, sel=S.sel, A=S.answers, M=BD.model?BD.model():null; state.M=M;
  applyTheme();
  if(light3d()){ const gr=new T.Mesh(new T.PlaneGeometry(RAD*2.4,RAD*2.4),new T.MeshStandardMaterial({color:0xd9d7d0,roughness:1})); gr.rotation.x=-Math.PI/2; gr.position.y=-0.05; gr.receiveShadow=true; sc.add(gr); R.lights.forEach(l=>sc.add(l)); }
  else sc.add(new T.GridHelper(RAD*2.2,88,0x232629,0x1d1f22));
  sc.add(buildNeighbours(site));
  const dc=new T.Group(); state.dc=dc; sc.add(dc);
  // the lot, the setbacks, loading, plant yard
  if(M&&M.ring) dc.add(ringLine(M.ring,0.35,C.acc,false,1));
  if(M&&M.inset&&!M.existing) dc.add(ringLine(BD.geo.clip(M.ring,M.inset),0.3,C.grey,1.5,0.5));
  if(M&&M.loading){ dc.add(ringLine(M.loading,0.3,C.mat,2,0.8)); (M.loadSpaces||[]).forEach(r=>dc.add(ringLine(r,0.32,C.mat,false,0.7))); }
  if(M&&M.plant&&M.plant.yard) dc.add(ringLine(BD.geo.clip(M.ring,M.plant.yard),0.3,C.grey,2,0.6));
  // the building
  let roof=0, foot=null;
  if(M&&M.existing){ for(const b of (sel.blds||[]).filter(b=>b.f!==3)) dc.add(prism(b.r,Math.max(2,b.h),0,0x221d1e,C.acc,0.9,0.85)); foot=M.foot; roof=M.roofH||M.H;
    if(A.extent==='part'){ const big=M.foot, rh=M.roofH||roof; const lvl={basement:-4,ground:0,upper:Math.max(4,Math.min(rh-8,rh*0.6)),roof:rh-0.5}[A.floor||'ground']; dc.add(prism(big,4,lvl,0x3a2626,C.acc,1)); } }
  else if(M&&M.foot&&M.footArea>5){ foot=M.foot; roof=M.H; const nF=M.nF[0];
    // equipment only (J.B., 16 Oct: "its not a massing tool"): no building; the floor the servers need is a flat outline, any shape
    // the building as a dashed, see-through envelope (J.B., 28 Oct 2026): the form is not prescribed; the equipment is shown
    dc.add(envelope(foot,M.H,nF)); const sf=M.serverFoot||foot; dc.add(ringLine(sf,0.25,C.acc,2,0.9)); foot=sf;
    roof=M.H; state.envelope=true; state.hallZ=0.3; }
  else if(sel.pt){ foot=new Float64Array(circlePts(sel.pt[0],sel.pt[1],25,0,8).flatMap(v=>[v.x+site.c[0],-v.z+site.c[1]])); roof=18; dc.add(prism(foot,roof,0,0x221d1e,C.acc,1)); }
  state.foot=foot; state.roof=roof;
  // plant: generic units at the size and clearance the register gives; dashed outline = clearance
  if(M&&M.plant){ const P=M.plant; const grp={}; let lit=false;
    for(const b of P.boxes){ const col=b.name.indexOf('generator')>=0?C.grey:C.edge; const u=kitUnit(b); if(u){ dc.add(u); lit=true; } else dc.add(prism(b.ring,b.h,b.base,0x26292e,col,0.85)); dc.add(ringLine(b.clear,b.base+0.06,col,1.2,0.45)); (grp[b.name+'|'+b.kind]=grp[b.name+'|'+b.kind]||[]).push(b); }
    if(lit) R.lights.forEach(l=>sc.add(l));
    state.plantGroups=grp;
    // seen or hidden (J.B., 16 Oct): a screen around the roof plant, housings over each unit, or a louvred plant floor
    const roofB=P.boxes.filter(b=>b.kind==='roof'&&b.name.indexOf('generator')<0), vis=A.vis||'reveal';
    if(vis==='screen'&&roofB.length){ const pts=[]; roofB.forEach(b=>{ for(let i=0;i<b.clear.length;i++) pts.push(b.clear[i]); }); const h=BD.geo.hull(new Float64Array(pts)); const ring=new Float64Array(h.flat()); const hh=Math.max(...roofB.map(b=>b.h))+0.9; dc.add(prism(BD.geo.offset?BD.geo.offset(ring,0.5):ring,hh,roofB[0].base,0x2a2d31,C.edge,0.7,0.35)); state.screenRing=ring; }
    if(vis==='enclose') roofB.forEach(b=>dc.add(prism(BD.geo.offset?BD.geo.offset(b.ring,0.6):b.ring,b.h+1.0,b.base,0x2a2d31,C.edge,0.8,0.9)));
    if(vis==='indoors'&&P.coolRoofIndoor&&M.foot){ const z=Math.max(6,M.H-6); for(const dz of [1,2,3,4]) dc.add(ringLine(M.foot,z+dz,C.grey,false,0.5)); state.indoorZ=z; } }
  // racks: the part replaced every five to six years, on the first hall floor (cut-away shell)
  if(M&&M.foot&&!M.existing&&M.footArea>200) state.racks=racksFor(M);
  // camera
  const bb=foot?bbox(foot):[site.c[0]-40,site.c[1]-40,site.c[0]+40,site.c[1]+40]; const span=Math.max(60,Math.hypot(bb[2]-bb[0],bb[3]-bb[1]));
  R.cam.position.set(span*1.9,span*1.6+roof*1.3,span*2.2); R.ctl.target.set(0,roof*0.35,0); R.ctl.update(); state.span=span;
}
/* the first hall floor, laid out to the register's rules (hall_layout, electrical_room; 29 Oct 2026):
   electrical room at one end (UPS against the end wall, working space, battery cabinets), room cooling units along the long walls with
   their service clearance, racks in back-to-back pairs with 1.2 m aisles, 1.1 m corridors at the row ends. Counts: register quantities. */
function racksFor(M){ const A=BD.S.answers, mw=A.mw||M.mwSized||1, E=BD.eng.equip(mw,A), Lr=BD.eng.R.layout; const floors=Math.max(1,M.Z.ground?M.nF[0]-1:M.nF[0]);
  // hall floors drawn on every data-centre floor (J.B., 30 Oct 2026: "why are the servers only on one floor"); floor height as the envelope draws it (H/n);
  // where the zone keeps the ground floor for other uses (M.Z.ground, e.g. I-3), the first hall floor is the 2nd storey
  const fh=M.H/Math.max(1,M.nF[0]), g0=M.Z.ground?1:0; state.hallZ=g0*fh+0.3;
  const F=M.F, foot=M.serverFoot||M.foot, z0=state.hallZ; const placed=[];
  const [u0,u1,v0,v1]=(()=>{ let a=1e9,b=-1e9,c=1e9,d=-1e9; for(let i=0;i<foot.length;i+=2){ const [u,v]=F.toL(foot[i],foot[i+1]); a=Math.min(a,u); b=Math.max(b,u); c=Math.min(c,v); d=Math.max(d,v); } return [a,b,c,d]; })();
  const ang=(()=>{ const a=F.toW(0,0), b=F.toW(1,0); return Math.atan2(b[1]-a[1],b[0]-a[0]); })();
  const inside=(u,v)=>{ const [x,y]=F.toW(u,v); return BD.pip(x,y,foot); };
  const put=(kind,u,v,rot)=>{ const g=BD.kit.make(kind); const [x,y]=F.toW(u,v); g.position.copy(V(x,y,z0)); g.rotation.y=ang+(rot||0); state.dc.add(g); if(kind==='crah'||kind==='twall') placed.push(g); return g; };
  const S=BD.kit.SPEC, got={ups:0,battery:0,crah:0,cdu:0,racks:0};
  // 1. electrical room at the u0 end: UPS (3.6 m long, 0.9 deep) against the end wall, 1.5 m working space, battery cabinets (0.65 × 0.75) facing them
  const need={ups:E.ups,battery:E.batt[1],racks:Math.ceil(E.racks[1]/floors),crah:Math.ceil(E.crah[1]/floors),cdu:Math.ceil(E.cdu[1]/floors)};
  const band=S.ups.W+Lr.upsFront+S.battery.W+Lr.battWall; let ue=u0, nu=0, nb=0;
  while((nu<need.ups||nb<need.battery)&&ue+band<u1-10){ let v=v0+0.3; while(nu<need.ups&&v+S.ups.L<=v1-0.3){ if(inside(ue+S.ups.W/2,v+S.ups.L/2)){ put('ups',ue+S.ups.W/2,v+S.ups.L/2,Math.PI/2); nu++; } v+=S.ups.L; }
    v=v0+0.3; const ub=ue+S.ups.W+Lr.upsFront+S.battery.W/2; while(nb<need.battery&&v+S.battery.L<=v1-0.3){ if(inside(ub,v+S.battery.L/2)){ put('battery',ub,v+S.battery.L/2,-Math.PI/2); nb++; } v+=S.battery.L; }
    ue+=band; }
  got.ups=nu; got.battery=nb;
  if(ue>u0){ const r=BD.geo.rectW(F,u0,ue,v0,v1); state.dc.add(ringLine(r,z0+0.05,C.power,1.5,0.9)); state.dc.add(line([V(...F.toW(ue,v0),z0),V(...F.toW(ue,v0),z0+3.5)],C.power,1.2,0.7)); state.elecRoom=r; }
  // 2. room cooling by hall density (register: room_cooling_type): room units along both long walls, 0.457 m clear at each end;
  //    or a thermal wall in a side gallery (units side by side, gasketed gap, 1.1 m clear on the hall and gallery sides); or in-row coolers in the rows
  // 1b. heat-recovery plant at the other end (options with heat recovery only; register: heat_pumps, hr_plant_room, 29 Oct 2026):
  //     heat pumps (Sabroe DualPAC 716-W, 1,991 kW) side by side with 1.1 m aisles; network connection room to the NEU table when heat goes to the network.
  //     Pipes, pumps, heat exchangers and tanks are in the register but not drawn (J.B., 29 Oct: one block). Where the room sits: our choice (?)
  let uh=u1; const o=state.opt;
  if(o&&o.recover){ const Rg=BD.eng.R, kw=mw*1000*Rg.capture[1]*Rg.cop[0]/(Rg.cop[0]-1), kwLo=mw*1000*Rg.capture[0]*Rg.cop[1]/(Rg.cop[1]-1), hp=S.heatpump, ai=Lr.corridor;
    const nHi=Math.ceil(kw/1991), nLo=Math.ceil(kwLo/1991); let n=0, col=0;
    while(n<nHi&&col<4){ const uc=u1-ai-hp.W/2-col*(hp.W+ai); let v=v0+ai; while(n<nHi&&v+hp.L<=v1-ai){ if(inside(uc,v+hp.L/2)){ put('heatpump',uc,v+hp.L/2,Math.PI/2); n++; } v+=hp.L+ai; } col++; }
    uh=u1-col*(hp.W+ai)-ai; const r=BD.geo.rectW(F,uh,u1,v0,v1); state.dc.add(ringLine(r,z0+0.05,C.heat,1.5,0.9)); state.dc.add(line([V(...F.toW(uh,v0),z0),V(...F.toW(uh,v0),z0+3.5)],C.heat,1.2,0.7));
    let ets=null; if(o.to==='net'){ const big=(M.footArea||0)*(M.nF?M.nF[0]:1)>13940, ew=big?4:3; ets=BD.geo.rectW(F,uh-ew,uh,v1-6,v1); state.dc.add(ringLine(ets,z0+0.05,C.heat,0.6,0.9)); uh-=ew; }
    state.heatRoom={n,nLo,nHi,area:Math.round((u1-uh)*(v1-v0)),ets:!!ets}; }
  const ua=ue+Lr.corridor, ub=uh-Lr.corridor, RT=E.room?E.room.type:'crah';
  const wallRow=(kind,count,side)=>{ const s=S[kind]; let u=ua+Lr.crahEnd, n=0; while(n<count&&u+s.L<=ub-Lr.crahEnd){ const v=side<0?v0+s.W/2+0.05:v1-s.W/2-0.05; if(inside(u+s.L/2,v)){ put(kind,u+s.L/2,v,side<0?Math.PI:0); n++; } u+=s.L+2*Lr.crahEnd; } return n; };
  need.room=E.room?Math.ceil(E.room.n[1]/floors):0; got.room=0; let gallery=0;
  if(RT==='crah'&&need.room){ const a=wallRow('crah',Math.ceil(need.room/2),-1); got.room=a+wallRow('crah',need.room-a,1); }
  let gallery0=0;
  if(RT==='wall'&&need.room){ const s=S.twall; gallery=s.W+Lr.wallClear; let n=0;
    const side=(vc,flip)=>{ let u=ua; while(n<need.room&&u+s.L<=ub){ if(inside(u+s.L/2,vc)){ put('twall',u+s.L/2,vc,flip?Math.PI:0); n++; } u+=s.L+Lr.wallGap; } };
    side(v1-Lr.wallClear-s.W/2,false); state.dc.add(line([V(...F.toW(ua,v1-gallery),z0),V(...F.toW(ub,v1-gallery),z0)],C.grey,1.2,0.8));
    if(n<need.room){ gallery0=gallery; side(v0+Lr.wallClear+s.W/2,true); state.dc.add(line([V(...F.toW(ua,v0+gallery0),z0),V(...F.toW(ub,v0+gallery0),z0)],C.grey,1.2,0.8)); } // a second gallery on the other long wall
    got.room=n; }
  if(need.cdu){ got.cdu=0; } // CDUs: no maker placement rule found for the Motivair basis; listed, not placed (?)
  const wallZone=gallery0?gallery0+S.twall.W+Lr.wallClear:(RT==='crah'&&need.room?S.crah.W+Lr.crahFront:need.cdu?S.cdu.W+Lr.cduFront:0)+0.05, farZone=RT==='wall'?gallery+S.twall.W+Lr.wallClear:wallZone;
  // 3. racks in back-to-back pairs: cold aisle 1.2 | rack 1.2 | hot aisle 1.2 | rack 1.2
  const pts=[]; const D=S.rack.W, Wd=S.rack.L; let v=v0+wallZone+Lr.aisle; const rowsV=[];
  // Schneider spacing (J.B., 30 Oct 2026): a rack takes rackFloor (2.32 m², WP 46) with its aisles, not just rack + aisle (Wd × (D + aisle) = 1.44 m²);
  // the extra floor is drawn as breaks in each row: runs of RUN racks, then GAP empty places. How the extra floor is arranged is our choice (?)
  const tight=Wd*(D+Lr.aisle), fr=Math.min(1,tight/(Lr.rackFloor||tight)), GAP=3, RUN=fr>=1?1e9:Math.max(1,Math.round(GAP*fr/(1-fr))), gapAt=k=>(k%(RUN+GAP))>=RUN;
  while(v+2*D+Lr.aisle<=v1-farZone-Lr.aisle+1e-6) { rowsV.push(v,v+D+Lr.aisle); v+=2*D+2*Lr.aisle; }
  // in-row coolers: at both ends of each row, then evenly along it (Vertiv CRV catalog E.2)
  let slots1=0; const crvPer=RT==='inrow'&&need.room&&rowsV.length?Math.max(2,Math.ceil(need.room/rowsV.length)):0; const crvAt=[];
  for(const vr of rowsV){ const slots=[]; for(let u=ua;u+Wd<=ub;u+=Wd){ if(inside(u+Wd/2,vr+D/2)) slots.push(u); } if(!slots.length) continue;
    const pick=new Set(); if(crvPer){ for(let k=0;k<crvPer&&k<slots.length;k++) pick.add(Math.round(k*(slots.length-1)/Math.max(1,crvPer-1))); }
    slots.forEach((u,k)=>{ if(!pick.has(k)&&!gapAt(k)) slots1++; if(pick.has(k)&&crvAt.length<need.room) crvAt.push([u+Wd/2,vr+D/2]); else if(!gapAt(k)&&pts.length<need.racks) pts.push([u+Wd/2,vr+D/2]); }); }
  crvAt.forEach(([u,vv])=>put('crv',u,vv,0)); if(RT==='inrow') got.room=crvAt.length;
  // the other hall floors have no UPS and battery room: count their rack places by the same rules (not drawn)
  const slotsFrom=u_a=>{ let n=0; const ub2=u1-Lr.corridor; for(const vr of rowsV){ let k=0; for(let u=u_a;u+Wd<=ub2;u+=Wd){ if(inside(u+Wd/2,vr+D/2)){ if(!gapAt(k)) n++; k++; } } } return n-(RT==='inrow'?Math.min(need.room,rowsV.length*crvPer):0); };
  const otherFloor=floors>1?slotsFrom(u0+Lr.corridor):0;
  got.racks=pts.length;
  // the other hall floors: same rows, from the u0 corridor (no UPS room, no heat plant), same cap per floor; room units cloned up; in-row coolers re-picked per row
  const upper=[], crvUp=[];
  for(let k=1;k<floors;k++){ const dz=k*fh; let nr=0, nc=0;
    for(const vr of rowsV){ const slots=[]; for(let u=u0+Lr.corridor;u+Wd<=u1-Lr.corridor;u+=Wd){ if(inside(u+Wd/2,vr+D/2)) slots.push(u); } if(!slots.length) continue;
      const pick=new Set(); if(crvPer){ for(let j=0;j<crvPer&&j<slots.length;j++) pick.add(Math.round(j*(slots.length-1)/Math.max(1,crvPer-1))); }
      slots.forEach((u,j)=>{ if(pick.has(j)&&nc<need.room){ crvUp.push([u+Wd/2,vr+D/2,dz]); nc++; } else if(!gapAt(j)&&nr<need.racks){ upper.push([u+Wd/2,vr+D/2,dz]); nr++; } }); }
    placed.forEach(g=>{ const c=g.clone(); c.position.y+=dz; state.dc.add(c); }); }
  crvUp.forEach(([u,vv,dz])=>{ const g=put('crv',u,vv,0); g.position.y+=dz; });
  const geo=new T.BoxGeometry(Wd*0.98,S.rack.H,D*0.98); const mat=new T.MeshStandardMaterial({color:0x3a3d42,roughness:.8,flatShading:true,transparent:true,opacity:0.9});
  const all=pts.map(p=>[p[0],p[1],0]).concat(upper);
  const im=new T.InstancedMesh(geo,mat,Math.max(1,all.length)); const m4=new T.Matrix4(), q=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),ang), sc=new T.Vector3(1,1,1);
  all.forEach(([u,vv,dz],k)=>{ const [x,y]=F.toW(u,vv); m4.compose(V(x,y,z0+dz+S.rack.H/2),q,sc); im.setMatrixAt(k,m4); }); im.count=all.length; im.castShadow=true; state.dc.add(im);
  if(R.lights&&!R.lights[0].parent) R.lights.forEach(l=>R.scene.add(l));
  state.rooms={E,need,got,floors,capacity:Math.min(need.racks,pts.length)+(floors-1)*Math.max(0,otherFloor),otherFloor,maxRacks:slots1+(floors-1)*Math.max(0,otherFloor)};
  return {obj:im,n:pts.length,drawn:all.length,per:need.racks,racks:E.racks[1],floors}; }
/* ---------- overlays ---------- */
function clearOverlay(){ if(R.ov) R.scene.remove(R.ov); R.ov=new T.Group(); R.scene.add(R.ov); R.ticks=[]; if(R.demoG){ R.scene.remove(R.demoG); R.demoG=null; } lab.splice(0); labels.innerHTML=''; resetTint(); R.onPick=null;
  if(state.shell){ state.shell.children[0].material.opacity=0.55; } if(state.racks) state.racks.obj.material.opacity=0.9; }
function roofC(){ return state.foot?BD.centroid(state.foot):state.c; }
function plantLabels(col){ const G=state.plantGroups||{}; for(const k in G){ const L=G[k], [name,where]=k.split('|'); const b=L[Math.floor(L.length/2)], c=BD.centroid(b.ring);
    const top=V(c[0],c[1],b.base+b.h), at=top.clone().add(new T.Vector3(0,9+(where==='roof'?4:0),0)); label(`${name} ×${L.length} · ${where}${b.atGrade?' (shown at grade)':''}`,at,col?hex(col):'#e9e6e1',{prio:6,from:top}); } }
function baseLabels(){ const M=state.M; if(!M) return;
  if(state.foot&&!M.existing){ const c=roofC(); const fl=M.sizedTo?M.sizedTo.floor:M.footArea*Math.max(1,M.nF[0]-(M.Z&&M.Z.ground?1:0)); /* without a size: what the data-centre floors hold (not the ground floor where the zone keeps it) */ label(`${M.sizedTo?M.sizedTo.mw+' MW needs ':'data-centre floors hold '}≈ ${BD.fmt(Math.round(fl/100)*100)} m² (${BD.fmt(Math.round(fl*10.7639/1000)*1000)} ft²) of floor${M.sizedTo?' · any shape':''}`,V(c[0],c[1],8),'#e9e6e1',{prio:9,from:V(c[0],c[1],0.3)}); }
  if(M.loading){ const c=BD.centroid(M.loading); label(`${M.loadingNeed.cls}s ×${M.loadingNeed.n}`,V(c[0],c[1],10),'#9fb38a',{prio:5,from:V(c[0],c[1],0.4)}); }
  if(M.plant&&M.plant.yard){ const c=BD.centroid(M.plant.yard); label('plant yard',V(c[0],c[1],14),'#9d9a94',{prio:4,from:V(c[0],c[1],0.4)}); }
  if(state.indoorZ&&state.foot){ const c=roofC(); label('cooling plant indoors · louvred top floor',V(c[0],c[1],state.indoorZ+12),'#9d9a94',{prio:7,from:V(c[0],c[1],state.indoorZ+3)}); }
  if(state.screenRing){ const c=BD.centroid(state.screenRing); label('roof screen',V(c[0],c[1],state.roof+14),'#9d9a94',{prio:5}); } }
function frame(r){ const k=r*1.15; R.cam.position.set(k*0.55,k*0.95,k*0.95); R.ctl.target.set(0,0,0); R.ctl.update(); }
function frameSite(){ const sp=state.span; R.cam.position.set(sp*1.9,sp*1.6+state.roof*1.3,sp*2.2); R.ctl.target.set(0,state.roof*0.35,0); R.ctl.update(); }
function note(t){ document.getElementById('v3note').textContent=t; }
function key(html){ const k=document.getElementById('v3key'); k.innerHTML=html; k.style.display=html?'':'none'; slButtons(); }
function slButtons(){ const g=document.getElementById('v3sl'); if(!g) return; const M=state.M, on=!!(M&&M.ring&&!M.existing&&(state.tab==='model'||!FN[state.tab])); g.style.display=on?'':'none'; const m=state.secure||'off';
  g.querySelectorAll('button').forEach(b=>{ const a=b.dataset.sl===m; b.style.cssText=`font:inherit;font-size:12px;padding:2px 9px;margin-left:4px;border-radius:4px;cursor:pointer;color:#e9e6e1;border:1px solid ${a?'#CC746C':'#5a5d62'};background:${a?'rgba(204,116,108,.25)':'transparent'}`; }); }
const sw=(c,t,dash)=>`<div><i style="display:inline-block;width:16px;height:0;border-top:1.5px ${dash?'dashed':'solid'} ${hex(c)};vertical-align:3px;margin-right:6px"></i>${t}</div>`;
function heightsNote(){ return BD.S.city==='van'?'Heights: City of Vancouver LiDAR 2022':'Heights: City of Edmonton 3D buildings (measured) or floor area ÷ footprint (estimate)'; }

function model(d){ plantLabels(); baseLabels(); const M=state.M, P=M&&M.plant;
  note((P&&P.miss&&P.miss.length?'Doesn\'t fit: '+P.miss.join('; ')+'. ':'')+heightsNote()+'. Neighbours drawn to 1.5 km.');
  key(modelKey()); }
function modelKey(){ return sw(C.acc,'the lot; dashed red: the building envelope (not a design)')+sw(C.grey,'setbacks (yards) and plant yard',true)+sw(C.edge,'plant to makers\' sizes: solid = unit, dashed = clearance')+sw(C.mat,'loading spaces')+roomsKey()+secureKey(); }
/* secure line (prototype, overnight 29 Oct 2026, for J.B. to review): where the security line sits.
   TODAY: at the lot line, as seen at Cologix VAN3 (fence with a gate intercom; register: security_layers, tour = observation, one site).
   PROPOSAL: at the data-hall wall, with the ground floor (where the zone keeps it for other uses) or the yard as space that could face the street.
   The proposal is speculative (a design inference, no source states it); nothing here is sized. */
function secureKey(){ const M=state.M; if(!M||!M.ring||M.existing) return ''; const m=state.secure||'off', b=(v,t)=>`<button data-sl="${v}" style="font:inherit;font-size:11px;padding:1px 7px;margin:0 4px 0 0;border-radius:4px;cursor:pointer;border:1px solid ${m===v?'#CC746C':'#5a5d62'};background:${m===v?'rgba(204,116,108,.18)':'transparent'};color:inherit">${t}</button>`;
  return (m==='today'?'<div style="margin-top:6px">Secure line, today: the whole lot is secured: fence and gate intercom at the lot line (as at VAN3, one tour; fence drawn 1.8 m high, height not sourced ?)</div>':m==='proposed'?'<div style="margin-top:6px">Secure line, proposed: secured only at the data-hall wall (solid red); the shaded ground floor, or where the zone does not keep one, the lot between the dashed lot line and the hall, could face the street (a proposal: speculative, not sized)</div>':''); }
function secureDraw(){ const M=state.M; if(state.slG){ state.dc.remove(state.slG); state.slG=null; } const m=state.secure||'off'; if(!M||!M.ring||M.existing||m==='off') return;
  const g=new T.Group(); state.slG=g; state.dc.add(g); const hall=M.serverFoot||M.foot;
  if(m==='today'){ for(const z of [0.15,0.9,1.8]) g.add(ringLine(M.ring,z,C.acc,false,z<0.5?1:0.55));
    // the fence as a see-through wall on the lot line (J.B., 30 Oct 2026: 'we would need to model the fence'); VAN3 tour: 'K gate fence drilled 9 feet underground';
    // its height above ground is not sourced (?): drawn at 1.8 m, the top line the key already used
    const fH=1.8, r=M.ring, pos=[]; for(let i=0;i<r.length;i+=2){ const j=(i+2)%r.length; const a=V(r[i],r[i+1],0), b=V(r[j],r[j+1],0), a2=V(r[i],r[i+1],fH), b2=V(r[j],r[j+1],fH);
      pos.push(a.x,a.y,a.z,b.x,b.y,b.z,b2.x,b2.y,b2.z, a.x,a.y,a.z,b2.x,b2.y,b2.z,a2.x,a2.y,a2.z); }
    const fg=new T.BufferGeometry(); fg.setAttribute('position',new T.Float32BufferAttribute(pos,3));
    g.add(new T.Mesh(fg,new T.MeshBasicMaterial({color:C.acc,transparent:true,opacity:0.18,side:T.DoubleSide,depthWrite:false})));
    for(let i=0;i<r.length;i+=2){ const j=(i+2)%r.length, L=Math.hypot(r[j]-r[i],r[j+1]-r[i+1]), n=Math.max(1,Math.floor(L/3)); for(let k=0;k<n;k++){ const t=k/n, x=r[i]+(r[j]-r[i])*t, y=r[i+1]+(r[j+1]-r[i+1])*t; g.add(line([V(x,y,0),V(x,y,fH)],C.acc,false,0.5)); } } }
  else { if(hall) for(const z of [0.15,1.8,3.5]) g.add(ringLine(hall,z,C.acc,false,z<0.5?1:0.7));
    const fh=M.H/Math.max(1,M.nF?M.nF[0]:1);
    if(M.Z&&M.Z.ground&&M.foot) g.add(prism(M.foot,fh,0,C.acc,C.acc,0.6,0.16));
    else g.add(ringLine(M.ring,0.2,C.acc,1.5,0.6)); }
  if(R&&R.ren) R.dirty=true; }

function roomsKey(){ const r=state.rooms; if(!r) return ''; const E=r.E, rg=a=>a[0]===a[1]?`${a[0]}`:`${a[0]}–${a[1]}`, gap=(k)=>r.got[k]<r.need[k]?` (${r.got[k]} drawn)`:'';
  const L=[`racks ${rg(E.racks)}: room for ${r.capacity} on ${r.floors} floor${r.floors>1?'s':''} (${r.got.racks} on this one, which holds the UPS room${r.floors>1?`; ${r.otherFloor} on each other floor`:''})${r.capacity<E.racks[1]?' — short of the high end':''}`,`UPS modules ${E.ups}${gap('ups')}`,`battery cabinets ${rg(E.batt)}${gap('battery')}`];
  if(E.room&&E.room.n[1]) L.push(`${E.room.name} ${rg(E.room.n)}${r.floors>1?`, about ${r.need.room} a floor`:''}${gap('room')} (hall about ${Math.round(E.room.wft2)} W/ft²: ${E.room.type==='crah'?'room units, up to about 150':E.room.type==='wall'?'thermal wall in a side gallery, up to about 400':'in-row coolers, above about 400'} by Vertiv's claims, approximate)`); if(E.cdu[1]) L.push(`coolant units ${rg(E.cdu)} (not placed: no placement rule found)`);
  return `<div style="margin-top:4px">Inside, ${r.floors} hall floor${r.floors>1?'s, all drawn':''}${state.hallZ>1?' from the 2nd storey (the zone keeps the ground floor for other uses)':''}; each rack is given 2.32 m² (25 ft²) of floor with its aisles, Schneider's figure (WP 46), shown as breaks in the rows (how that floor is arranged is our choice ?); racks fill each floor's share row by row from the electrical-room end. Built halls leave still more: 290–630 m² of hall per MW in four Canadian halls (operator claims), for tenant enclosures, growth and lower densities (VAN3 guide). Register: hall_layout. First floor: ${L.join(' · ')}. Gold dashed: UPS and battery room. Spacing from the register (hall_layout, electrical_room).</div>`; }
const TYPE={housing:'Non-market housing',school:'School',campus:'University or college campus',care:'Care home',hospital:'Hospital',rec:'Recreation centre',hall:'Community league hall',pool:'Pool',arena:'Indoor arena',apartment:'Apartment building',office:'Office building',hotel:'Hotel',commercial:'Commercial building'};
const TCOL={housing:C.city,apartment:C.city,office:C.heat,hotel:C.heat,commercial:C.heat,school:C.power,campus:C.power,care:C.senses,hospital:C.senses,rec:C.water,hall:C.water,pool:C.water,arena:C.mat};
function heat(d){
  plantLabels(C.heat); baseLabels();
  const c=roofC(), src=V(c[0],c[1],state.roof+3);
  for(const rad of [3000]){ R.ov.add(line(circlePts(state.c[0],state.c[1],rad,0.5,180),C.heat,true,0.28)); label(`${rad/1000} km`,V(state.c[0],state.c[1]-rad,2),'#6b6964',{prio:1}); }
  (d.nets||[]).forEach(n=>{ const p=[]; for(let i=0;i<n.r.length;i+=2) p.push(V(n.r[i],n.r[i+1],0.6)); R.ov.add(line(p,C.heat,true,0.9)); const cc=BD.centroid(n.r); label(n.n+(n.src==='van9552'?' (traced)':' (approximate)'),V(cc[0],cc[1],4),'#d1a35e',{prio:5}); });
  const all=(d.all||d.near||[]); const lim=d.lim||40; let shown=0;
  for(const p of all){ if(shown>=lim) break; const nb=snap(p.x,p.y); const col=TCOL[p.t]||C.heat; const beyond=!!p.beyond; const ccol=beyond?C.faint:col;
    let top; if(nb){ nb.recv=p; nb.recvType=TYPE[p.t]+(beyond?' · costs more than the heat is worth':''); tintB(nb,ccol,beyond?0.6:1); top=V(nb.b.c[0],nb.b.c[1],nb.h); }
    else { top=V(p.x,p.y,8); const s=new T.Mesh(new T.SphereGeometry(1.8,8,6),new T.MeshBasicMaterial({color:ccol})); s.position.copy(top); R.ov.add(s); R.ov.add(line([V(p.x,p.y,0),top],ccol,false,0.6)); }
    if(d.selected!=null&&d.selected!==p.id) { /* dim the others when one connection is open */ }
    const hi=d.selected!=null&&d.selected===p.id; const curve=arc(src,top,Math.min(140,p.dist*0.12));
    R.ov.add(line(curve,hi?C.acc:ccol,beyond?3:true,hi?1:beyond?0.45:0.85));
    label(`${p.n||TYPE[p.t]}${nb?'':' (location only)'}`,top.clone().add(new T.Vector3(0,10,0)),hi?'#e39a93':beyond?'#6b6964':hex(col),{prio:hi?10:beyond?2:4,from:top});
    shown++; }
  if(d.route&&d.route.length>1){ R.ov.add(line(d.route.map(q=>V(q[0],q[1],0.8)),C.acc,false,1)); const mid=d.route[Math.floor(d.route.length/2)]; label('pipe route along the streets',V(mid[0],mid[1],6),'#e39a93',{prio:9}); }
  label('heat out',src.clone().add(new T.Vector3(0,12,0)),'#d1a35e',{prio:8,from:src});
  { const far=Math.min(1500,Math.max(300,...all.slice(0,lim).map(p=>p.dist||0))); frame(far); }
  R.onPick=nb=>{ if(nb.recv&&BD.openConnection) BD.openConnection('heat',nb.recv.id); };
  note('Receivers sit on the building that holds them; hover any building for its height and distance; click a receiver to open its card. '+heightsNote()+'.');
  key(Object.entries(TYPE).map(([k,t])=>sw(TCOL[k],t)).join('')+sw(C.faint,'costs more than the heat is worth (shown, greyed)',true)+sw(C.heat,'district energy (NEU traced, others approximate) · reach rings',true));
}
function energy(d){ plantLabels(C.power); baseLabels(); const M=state.M;
  if(d.pv&&d.pv.slots){ for(const p of d.pv.slots) R.ov.add(prism(p,0.25,state.roof+0.4,0x1f2430,C.power,0.6)); if(d.pv.slots.length){ const c=BD.centroid(d.pv.slots[Math.floor(d.pv.slots.length/2)]); label(`solar ≈ ${Math.round(d.pv.kwp)} kWp on ${Math.round(d.pv.m2)} m² of panels`,V(c[0],c[1],state.roof+12),'#a7b4d6',{prio:7,from:V(c[0],c[1],state.roof+0.6)}); } }
  if(d.batt&&d.batt.boxes) d.batt.boxes.forEach(b=>{ R.ov.add(prism(b.ring,b.h,0,0x26292e,C.power,0.85)); R.ov.add(ringLine(b.clear,0.06,C.power,1.2,0.45)); });
  note((d.gridNote?d.gridNote+' ':'')+'Electrical rooms are inside the building; the grid connection is not drawn. '+heightsNote()+'.');
  key(sw(C.power,'plant and add-ons (generic)')+sw(C.acc,'the building')); }
function water(d){ plantLabels(C.water); baseLabels(); const bb=state.foot?bbox(state.foot):null; if(!bb) return; const cx=(bb[0]+bb[2])/2;
  for(let i=0;i<5;i++){ const x=bb[0]+(bb[2]-bb[0])*(0.15+0.17*i); R.ov.add(line([V(x,bb[1],state.roof+12),V(x,bb[1],state.roof+1)],C.water,true,0.6)); }
  label(`rain on the roof ≈ ${Math.round(d.rain)} m³/yr`,V(cx,bb[1],state.roof+16),'#7fb2c4',{prio:6});
  if(d.towers){ const G=state.plantGroups||{}; Object.values(G).flat().filter(b=>/tower|hybrid/.test(b.name)).slice(0,8).forEach(b=>{ const c=BD.centroid(b.ring); const a=V(c[0],c[1],b.base+b.h); R.ov.add(line(arc(a,a.clone().add(new T.Vector3(5,20,0)),3,10),C.water,true,0.5)); }); if(d.evap) label(`evaporation ≈ ${d.evap}`,V(cx,bb[3],state.roof+28),'#7fb2c4',{prio:6}); }
  if(d.cistern) d.cistern.forEach(b=>{ R.ov.add(prism(b.ring,b.h,b.base,0x1f2a2e,C.water,0.85)); });
  note('Water service and sewer connections are not drawn (they follow the City\'s mains). '+heightsNote()+'.');
  key(sw(C.water,'water: rain, evaporation, add-ons')+sw(C.edge,'plant')); }
function materials(d){ baseLabels(); if(state.shell) state.shell.children[0].material.opacity=0.12; if(state.racks){ state.racks.obj.material.opacity=0.9; const c=roofC(); label(`${state.racks.racks} racks · ${state.racks.drawn} drawn on ${state.racks.floors} floor${state.racks.floors>1?'s':''} · replaced about every 5–6 years`,V(c[0],c[1],(state.hallZ||0)+3.5),'#9fb38a',{prio:9}); }
  const M=state.M; if(M&&M.loading){ const c=BD.centroid(M.loading); label('loading · servers in and out',V(c[0],c[1],16),'#9fb38a',{prio:7,from:V(c[0],c[1],0.4)}); }
  (d.trucks||[]).forEach(t=>R.ov.add(prism(t.ring,t.h,0,0x26292e,C.mat,0.8)));
  note('Shell drawn see-through to show the halls. Trucks and processors: see the Materials cards. '+heightsNote()+'.');
  key(sw(C.mat,'racks; loading')+sw(C.acc,'the shell (cut away)')); }
function social(d){ plantLabels(C.senses); baseLabels();
  if(state.foot){ const r10=offsetRing(state.foot,10); R.ov.add(ringLine(r10,0.4,C.senses,2,0.75)); const p=[r10[0],r10[1]]; label('10 m standoff (Ontario standard, transferred) — follows the walls',V(p[0],p[1],3),'#b9a3cf',{prio:6}); }
  if(d.noise&&R.nbList){ const pc=d.noise.src||roofC(); let nOver=[0,0];
    for(const nb of R.nbList){ const b=nb.b; if(nb.d>650) continue; const r=Math.max(5,Math.hypot(b.c[0]-pc[0],b.c[1]-pc[1])); const lo=d.noise.lw[0]-20*Math.log10(r)-8, hi=d.noise.lw[1]-20*Math.log10(r)-8;
      const lim=d.noise.limitFor?d.noise.limitFor(b):d.noise.limit; if(lo>lim){ tintB(nb,C.bad,0.95); nb.noise=`over its ${lim} dBA night limit even with low-noise units (≈${Math.round(lo)}–${Math.round(hi)} dBA)`; nOver[0]++; } else if(hi>lim){ tintB(nb,C.acc,0.85); nb.noise=`over its ${lim} dBA limit only with standard units (≈${Math.round(lo)}–${Math.round(hi)} dBA)`; nOver[1]++; } else nb.noise=`under its ${lim} dBA night limit (≈${Math.round(Math.max(0,lo))}–${Math.round(hi)} dBA)`; }
    if(d.noise.dist){ const rr=d.noise.dist[1]; if(rr<1500){ R.ov.add(line(circlePts(pc[0],pc[1],rr,0.5,160),C.senses,true,0.5)); label(`quiet-zone night limit reached ≈ ${Math.round(rr)} m (standard units, no barriers)`,V(pc[0],pc[1]+rr,3),'#b9a3cf',{prio:5}); } } }
  (d.sight||[]).forEach(s=>R.ov.add(line([V(s.from[0],s.from[1],s.from[2]),V(s.to[0],s.to[1],s.to[2])],s.seen?C.senses:C.faint,s.seen?false:2,s.seen?0.7:0.3)));
  (d.people||[]).forEach(p=>{ const nb=snap(p.x,p.y); const top=nb?V(nb.b.c[0],nb.b.c[1],nb.h):V(p.x,p.y,8); if(nb){ nb.recv=p; nb.recvType=p.kind; tintB(nb,p.col||C.senses,1); } label(p.n,top.clone().add(new T.Vector3(0,8,0)),p.col?hex(p.col):'#b9a3cf',{prio:3,from:top}); });
  note('Sound is a screening estimate: rated levels, spreading only; hover a building for its estimate. Security shown only as experienced from the street. '+heightsNote()+'.');
  key(sw(C.bad,'over its night limit even with low-noise units')+sw(C.acc,'over only with standard units')+sw(C.senses,'standoff; sound distance',true)+(d.sight&&d.sight.length?sw(C.senses,'sight line: cooling plant seen from a home or the street')+sw(C.faint,'sight line blocked',true):'')); }
function opp(d){ baseLabels(); (d.boxes||[]).forEach(b=>{ R.ov.add(prism(b.ring,Math.max(0.1,b.h),b.base||0,0x26292e,C.acc,0.85,b.h>1?0.25:0.6)); if(b.label){ const c=BD.centroid(b.ring); label(b.label,V(c[0],c[1],(b.base||0)+b.h+10),'#e39a93',{prio:9,from:V(c[0],c[1],(b.base||0)+b.h)}); } });
  note((d.note?d.note+' ':'What this opportunity would occupy on this site, drawn generically. ')+heightsNote()+'.'); key(sw(C.acc,'the opportunity, generic')+sw(C.edge,'plant')); }
const FN={model,heat,energy,water,materials,social,opp};

async function ensureTiles(c){ if(!BD.loadTile) return; const S=BD.S, m=S.meta[S.city]; if(!m) return; const T0=m.T, keys=[];
  for(let i=Math.floor((c[0]-RAD)/T0);i<=Math.floor((c[0]+RAD)/T0);i++) for(let j=Math.floor((c[1]-RAD)/T0);j<=Math.floor((c[1]+RAD)/T0);j++){ const k=i+'_'+j; if(m.tileset.has(k)&&!S.tiles[S.city+':'+k]) keys.push(k); }
  if(keys.length){ note('Loading neighbours to 1.5 km…'); await Promise.all(keys.map(k=>BD.loadTile(S.city,k))); } }
function siteKey(){ const S=BD.S, M=BD.model?BD.model():null; return S.city+'|'+S.sel.id+'|'+JSON.stringify(S.answers)+'|'+(M?M.footArea:0)+'|'+(light3d()?'L':'D'); }
async function show(tab,data){ await ensure(); if(!R) setup(); R.multi=null; if(R.cap){ R.cap.forEach(c=>c.remove()); R.cap=[]; } wrap.style.display='';
  const site=data.site||(BD.eng?BD.eng.siteFacts():null); if(!site) return; await ensureTiles(site.c);
  const k=siteKey(); if(state.key!==k||!state.site){ buildSite(site); state.key=k; }
  clearOverlay(); const prev=state.tab; state.tab=tab; if(tab!=='heat'&&prev==='heat') frameSite(); (FN[tab]||model)(data||{}); if(R.card) applyCard(); }
/* three options side by side: one camera, three scenes sharing the site model (J.B., 15 Oct) */
async function showOptions(opts,data){
  await show('model',{site:data.site}); clearOverlay(); R.scene.remove(R.ov);
  if(R.cap) R.cap.forEach(c=>c.remove()); R.cap=[];
  // each option gets its own building and plant, sized for its own servers (J.B., 16 Oct: "the geometry looks the same in A, B and C")
  const A=BD.S.answers, mw0=A.mw, site=data.site||(BD.eng?BD.eng.siteFacts():null), built=[];
  for(const o of opts){ A.mw=o.mw; if(BD.modelReset) BD.modelReset(); buildSite(site,o); clearOverlay(); R.scene.remove(R.ov);
    built.push({kids:R.scene.children.slice(),st:state}); }
  A.mw=mw0; if(BD.modelReset) BD.modelReset();
  R.multi=opts.map((o,i)=>{ const s=new T.Scene(); built[i].kids.forEach(ch=>s.add(ch)); if(light3d()){ built[i].kids.filter(ch=>ch.isLight).forEach(ch=>s.remove(ch)); R.lights.forEach(l=>{ const c=l.clone(); if(c.isDirectionalLight){ c.target=l.target.clone(); s.add(c.target); } s.add(c); }); } /* shared lights belong to one scene only: each option gets its own copy */ state=built[i].st; R.ov=new T.Group(); s.add(R.ov);
    const c=roofC(), src=V(c[0],c[1],state.roof+3);
    if(!o.recover){ for(const b of Object.values(state.plantGroups||{}).flat().slice(0,8)){ const cc=BD.centroid(b.ring); const a=V(cc[0],cc[1],b.base+b.h); R.ov.add(line(arc(a,a.clone().add(new T.Vector3(0,18,0)),3,8),0x9d9a94,true,0.9)); } }
    else if(o.to==='net'&&data.net){ const n=data.net, p=[]; for(let k=0;k<n.r.length;k+=2) p.push(V(n.r[k],n.r[k+1],0.6)); R.ov.add(line(p,C.heat,true,0.9)); const cc=BD.centroid(n.r); R.ov.add(line(arc(src,V(cc[0],cc[1],2),80),C.heat,false,0.9)); }
    else (data.near||[]).slice(0,o.n||8).forEach(p=>{ const nb=snap(p.x,p.y); const top=nb?V(nb.b.c[0],nb.b.c[1],nb.h):V(p.x,p.y,10); R.ov.add(line(arc(src,top,Math.min(120,p.dist*0.12)),C.heat,true,0.85)); });
    const d=document.createElement('div'); d.style.cssText=`position:absolute;top:44px;left:calc(${i*33.333}% + 12px);width:calc(33.333% - 24px);font:300 12px/1.4 "IBM Plex Sans",system-ui,sans-serif;color:${light3d()?"#26282b":"#e9e6e1"};pointer-events:none`;
    d.innerHTML=`<div style="font-size:11px;letter-spacing:.12em;color:${light3d()?"#6d6a65":"#9d9a94"};font-weight:600">${o.id.toUpperCase()}</div><div>${esc(o.name)}</div><div style="color:${light3d()?"#6d6a65":"#9d9a94"}">${esc(o.caption)}</div>${state.heatRoom?`<div style="color:${light3d()?"#6d6a65":"#9d9a94"}">heat plant: ${state.heatRoom.nLo===state.heatRoom.nHi?state.heatRoom.nHi:state.heatRoom.nLo+'–'+state.heatRoom.nHi} heat pumps${state.heatRoom.ets?' + network connection room':''}</div>`:''}`; wrap.appendChild(d); R.cap.push(d);
    return s; });
  state=built[1].st; state.key=null;
  for(let i=1;i<3;i++){ const d=document.createElement('div'); d.style.cssText=`position:absolute;top:0;bottom:0;left:${i*33.333}%;border-left:1px solid ${light3d()?'#cfcbc4':'#30343a'};pointer-events:none`; wrap.appendChild(d); R.cap.push(d); }
  { const sp=state.span; R.cam.position.set(sp*3.0,sp*2.6+state.roof*1.4,sp*3.4); R.ctl.target.set(0,state.roof*0.4,0); } note('Same site, same view: drag to orbit all three'+(state.heatRoom||built.some(b=>b.st.heatRoom)?'. Heat plant (amber dashes) at the far end of the first hall floor: where it sits is our choice (?); the network connection room follows the NEU table (6 × 3 m; the NEU asks for it one level below ground)':'')); key(''); }
function hide(){ if(wrap) wrap.style.display='none'; if(R){ R.multi=null; if(R.cap){ R.cap.forEach(c=>c.remove()); R.cap=[]; } } }
/* demos for the decision cards (J.B., 17 Oct): the option picked, animated on this site. Schematic massing, not a design. */
function demo(kind){ if(!R||!state.M) return; const M=state.M, sel=BD.S.sel; if(R.demoG){ R.scene.remove(R.demoG); } const g=new T.Group(); R.demoG=g; R.scene.add(g); R.ticks=[]; /* one demo at a time: earlier loops stop (21 Oct) */
  const t0=performance.now(), loopMs=5200;
  const ease=x=>x<0?0:x>1?1:1-Math.pow(1-x,3);
  if((kind==='new'||kind==='share')&&M.foot){ const n=Math.max(1,M.nF?M.nF[0]:3), H=M.H||n*6, fh=H/n, data=kind==='share'?Math.max(1,Math.ceil((n-1)/2)):n, ground=kind==='share';
    const fl=[]; for(let i=0;i<n;i++){ const isData=kind==='new'||(i>=(ground?1:0)&&i<(ground?1:0)+data); const p=prism(M.foot,fh*0.96,i*fh,isData?0x2a2224:0x23262a,isData?C.acc:C.grey,0.95,isData?0.12:0.06); p.visible=false; g.add(p); fl.push(p); }
    if(kind==='share'){ const c=BD.centroid(M.foot); label('data-centre floors',V(c[0],c[1],fh*(ground?1:0)+fh*data*0.5),'#e39a93',{prio:9}); label(ground?'street use at grade · other uses above':'other uses above',V(c[0],c[1],H+6),'#9d9a94',{prio:8}); }
    else { const c=BD.centroid(M.foot); label(`a new building · ${n} storeys · ${H.toFixed(1)} m`,V(c[0],c[1],H+6),'#e39a93',{prio:9}); }
    R.ticks.push(now=>{ const t=((now-t0)%loopMs)/loopMs*1.6; fl.forEach((p,i)=>{ const k=ease((t*n-i)/1.1); p.visible=k>0.01; p.scale.set(1,Math.max(0.01,k),1); p.position.y=i*fh*(1-k)*0; }); }); }
  if(kind==='retrofit'||kind==='lease'){ const bl=(sel.blds||[]).filter(b=>b.f!==3); const c=M.foot?BD.centroid(M.foot):state.c;
    if(kind==='retrofit'){ const shells=bl.map(b=>{ const p=prism(b.r,Math.max(2,b.h)+0.4,0,0x3a2626,C.acc,1,0.0); g.add(p); return p; }); label('the building that stands here, fitted out',V(c[0],c[1],(M.roofH||M.H)+8),'#e39a93',{prio:9});
      R.ticks.push(now=>{ const t=((now-t0)%2600)/2600; shells.forEach(p=>{ p.userData.edge.material.opacity=0.35+0.65*Math.abs(Math.sin(t*Math.PI)); }); }); }
    else { const rh=M.roofH||M.H, A=BD.S.answers; const lvl={basement:-4,ground:0,upper:Math.max(4,Math.min(rh-8,rh*0.6)),roof:rh-0.5}[A.floor||'upper']; const p=prism(M.foot,4,lvl,0xCC746C,C.acc,1,0.35); g.add(p); label('one leased floor',V(c[0],c[1],lvl+12),'#e39a93',{prio:9});
      R.ticks.push(now=>{ const t=((now-t0)%2400)/2400; p.children[0].material.opacity=0.15+0.4*Math.abs(Math.sin(t*Math.PI)); }); } }
}
/* card mode (J.B., 17 Oct): the 3D sits in the centred card; it turns slowly, seen from higher up, and nearby buildings go see-through
   so they no longer hide the site. Any drag stops the turning; it resumes after a few seconds untouched. */
let idleT=null;
function applyCard(){ if(!R) return; const on=!!R.card; R.ctl.autoRotate=on; R.ctl.autoRotateSpeed=0.55;
  if(R.nbMesh){ const m=R.nbMesh.material; const see=on&&!light3d(); m.transparent=see; m.opacity=see?0.22:1; m.depthWrite=!see; m.needsUpdate=true; /* light: solid white massing, as in the spreads */ }
  const fk=state.key+'|'+state.tab; if(on&&state.span&&!R.multi&&R.framed!==fk&&state.tab!=='heat'){ R.framed=fk; const sp=state.span*0.95, rf=state.roof||0; R.cam.position.set(sp*1.45,sp*0.95+rf*1.25,sp*1.65); R.ctl.target.set(0,rf*0.45,0); R.ctl.update(); } }
function cardMode(on){ if(!R) return; R.card=!!on; if(!R.cardWired){ R.cardWired=true; R.ctl.addEventListener('start',()=>{ R.ctl.autoRotate=false; clearTimeout(idleT); }); R.ctl.addEventListener('end',()=>{ clearTimeout(idleT); idleT=setTimeout(()=>{ if(R.card) R.ctl.autoRotate=true; },6000); }); } applyCard(); }
function layoutCheck(){ const M=BD.model&&BD.model(); if(!T||!M||!M.foot||M.existing||!(M.footArea>200)||!BD.eng) return null;
  const A=BD.S.answers, keep={mw:A.mw,dc:state.dc,rooms:state.rooms,hallZ:state.hallZ,elec:state.elecRoom,heat:state.heatRoom,opt:state.opt};
  const Mf=Object.assign({},M,{serverFoot:M.foot}), kw=BD.eng.R.equip.kwRack; let mw=Math.max(0.5,(BD.fitMax&&BD.fitMax())||2), cap=0, floors=1;
  try{ for(let i=0;i<3;i++){ A.mw=mw; state.dc=new T.Group(); state.opt=null; racksFor(Mf); cap=state.rooms.maxRacks; floors=state.rooms.floors; mw=Math.max(0.5,cap*kw[0]/1000); } }
  catch(e){ cap=0; }
  finally{ A.mw=keep.mw; state.dc=keep.dc; state.rooms=keep.rooms; state.hallZ=keep.hallZ; state.elecRoom=keep.elec; state.heatRoom=keep.heat; state.opt=keep.opt; }
  return cap?{racks:cap,floors,mw:[cap*kw[0]/1000,cap*kw[1]/1000]}:null; }
BD.scene3d={layoutCheck,show,showOptions,hide,ensure,demo,cardMode,rig:()=>R /* camera access for scripted recordings (video, 20 Oct 2026) */,snap:(x,y)=>R&&R.nbList?snap(x,y):null,state:()=>state,isOpen:()=>!!wrap&&wrap.style.display!=='none'};
BD.showModel=()=>{ if(!BD.S.sel) return Promise.resolve(); return show('model',{}).catch(e=>console.warn(e)); };
})();
