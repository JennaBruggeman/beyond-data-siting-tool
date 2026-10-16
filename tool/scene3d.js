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
  bar.innerHTML='<button id="v3map" style="pointer-events:auto;background:rgba(30,32,35,.92);border:1px solid #3c4148;border-radius:6px;padding:4px 10px;color:#e9e6e1;cursor:pointer;font-size:12px">← Map</button><span id="v3note" style="background:rgba(30,32,35,.92);border:1px solid #30343a;border-radius:6px;padding:4px 10px;font-size:12px;color:#9d9a94;max-width:640px"></span>';
  const key=document.createElement('div'); key.id='v3key'; key.style.cssText='position:absolute;left:12px;bottom:12px;background:rgba(30,32,35,.92);border:1px solid #30343a;border-radius:6px;padding:6px 10px;font:300 11.5px/1.5 "Open Sans",system-ui,sans-serif;color:#9d9a94;z-index:3;max-width:320px';
  wrap.appendChild(labels); wrap.appendChild(bar); wrap.appendChild(key); wrap.appendChild(tip); map.appendChild(wrap);
  const ren=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true}); ren.setPixelRatio(Math.min(window.devicePixelRatio||1,2)); ren.setClearColor(C.bg);
  wrap.insertBefore(ren.domElement,labels); ren.domElement.style.cssText='display:block;width:100%;height:100%';
  const scene=new T.Scene(); const cam=new T.PerspectiveCamera(35,1,1,40000);
  const ctl=new T.OrbitControls(cam,ren.domElement); ctl.enableDamping=true; ctl.maxPolarAngle=Math.PI*0.48; ctl.maxDistance=9000;
  R={ren,scene,cam,ctl};
  document.getElementById('v3map').onclick=()=>hide();
  const fit=()=>{ const b=wrap.getBoundingClientRect(); if(!b.width) return; ren.setSize(b.width,b.height,false); cam.aspect=b.width/b.height; cam.updateProjectionMatrix(); };
  new ResizeObserver(fit).observe(wrap); fit();
  // hover: which building is under the pointer (neighbours, receivers)
  const ray=new T.Raycaster(), mv=new T.Vector2();
  ren.domElement.addEventListener('pointermove',e=>{ if(!R.nbMesh) return; const b=ren.domElement.getBoundingClientRect(); mv.x=(e.clientX-b.left)/b.width*2-1; mv.y=-(e.clientY-b.top)/b.height*2+1; ray.setFromCamera(mv,cam);
    const hit=ray.intersectObject(R.nbMesh)[0]; if(!hit){ tip.style.display='none'; return; } const i=whichB(hit.faceIndex); const nb=R.nbList[i]; if(!nb){ tip.style.display='none'; return; }
    tip.innerHTML=hoverText(nb); tip.style.display=''; tip.style.left=Math.min(b.width-270,e.clientX-b.left+14)+'px'; tip.style.top=(e.clientY-b.top+14)+'px'; });
  ren.domElement.addEventListener('pointerleave',()=>{ tip.style.display='none'; });
  ren.domElement.addEventListener('click',e=>{ if(!R.onPick||!R.nbMesh) return; const b=ren.domElement.getBoundingClientRect(); mv.x=(e.clientX-b.left)/b.width*2-1; mv.y=-(e.clientY-b.top)/b.height*2+1; ray.setFromCamera(mv,cam); const hit=ray.intersectObject(R.nbMesh)[0]; if(hit){ const nb=R.nbList[whichB(hit.faceIndex)]; if(nb) R.onPick(nb); } });
  (function loop(){ requestAnimationFrame(loop); if(wrap.style.display==='none') return; ctl.update();
    if(R.multi){ const b=wrap.getBoundingClientRect(), w=b.width/3; ren.setScissorTest(true); R.multi.forEach((s,i)=>{ ren.setViewport(i*w,0,w,b.height); ren.setScissor(i*w,0,w,b.height); cam.aspect=w/b.height; cam.updateProjectionMatrix(); ren.render(s,cam); }); ren.setScissorTest(false); }
    else { ren.setViewport(0,0,wrap.clientWidth,wrap.clientHeight); cam.aspect=wrap.clientWidth/Math.max(1,wrap.clientHeight); cam.updateProjectionMatrix(); ren.render(scene,cam); placeLabels(); } })();
}
function hoverText(nb){ const b=nb.b; let t=`<b style="font-weight:400">${nb.recv?esc(nb.recv.n||'Receiver'):'Building'}</b><br>${b.h?b.h.toFixed(0)+' m tall':''}${b.f===5?' (measured)':BD.S.city==='edm'&&b.f!==5?' (estimate)':''} · ${Math.round(nb.d)} m from the site`;
  if(nb.recv) t+=`<br><span style="color:#9d9a94">${esc(nb.recvType||'')}${nb.recv.u?' · '+nb.recv.u+' homes':''}</span>`;
  if(nb.noise) t+=`<br><span style="color:#9d9a94">${esc(nb.noise)}</span>`; return t; }
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- labels: leaders are vertical (orthogonal); overlapping labels give way by priority ---------- */
const lab=[];
function label(text,pos,col,o){ o=o||{}; const d=document.createElement('div'); d.textContent=text; d.style.cssText=`position:absolute;white-space:nowrap;transform:translate(-50%,-100%);color:${col||'#9d9a94'};text-shadow:0 0 3px #17181a,0 0 3px #17181a,0 0 2px #17181a;padding:0 2px`;
  labels.appendChild(d); const L={d,pos,prio:o.prio||1,w:text.length*6.1+8}; lab.push(L);
  if(o.from){ R.ov.add(line([o.from,pos.clone().add(new T.Vector3(0,-0.3,0))],o.leaderCol||C.faint,false,0.7)); } return L; }
function placeLabels(){ const b=wrap.getBoundingClientRect(); const placed=[];
  const order=lab.slice().sort((a,c)=>c.prio-a.prio);
  for(const l of order){ const v=l.pos.clone().project(R.cam); if(!(v.z<1&&Math.abs(v.x)<1.05&&Math.abs(v.y)<1.05)){ l.d.style.display='none'; continue; }
    const x=(v.x+1)/2*b.width, y=(1-v.y)/2*b.height; const box=[x-l.w/2,y-16,x+l.w/2,y];
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
function ringLine(r,z,col,dashed,op){ const p=[]; for(let i=0;i<r.length;i+=2) p.push(V(r[i],r[i+1],z)); p.push(p[0].clone()); return line(p,col,dashed,op); }
function circlePts(cx,cy,rad,z,n){ const p=[]; for(let i=0;i<=(n||96);i++){ const a=i/(n||96)*Math.PI*2; p.push(V(cx+rad*Math.cos(a),cy+rad*Math.sin(a),z||0.3)); } return p; }
function arc(a,b,h,n){ const p=[]; for(let i=0;i<=(n||32);i++){ const t=i/(n||32); const v=a.clone().lerp(b,t); v.y+=Math.sin(Math.PI*t)*h; p.push(v); } return p; }
function bbox(r){ let a=1e9,b=1e9,c=-1e9,d=-1e9; for(let i=0;i<r.length;i+=2){ a=Math.min(a,r[i]); b=Math.min(b,r[i+1]); c=Math.max(c,r[i]); d=Math.max(d,r[i+1]); } return [a,b,c,d]; }
function offsetRing(r,d){ // miter offset of a simple polygon (outward for d>0)
  const n=r.length/2, out=[]; const sa=(()=>{ let s=0; for(let i=0,j=r.length-2;i<r.length;j=i,i+=2) s+=(r[j]*r[i+1]-r[i]*r[j+1]); return s>0?1:-1; })();
  for(let i=0;i<n;i++){ const p=[r[2*((i-1+n)%n)],r[2*((i-1+n)%n)+1]], q=[r[2*i],r[2*i+1]], s=[r[2*((i+1)%n)],r[2*((i+1)%n)+1]];
    const n1=norm([q[1]-p[1],-(q[0]-p[0])]), n2=norm([s[1]-q[1],-(s[0]-q[0])]); let m=norm([n1[0]+n2[0],n1[1]+n2[1]]); const cos=m[0]*n1[0]+m[1]*n1[1]; const k=d*-sa/Math.max(0.35,cos);
    out.push(q[0]+m[0]*k,q[1]+m[1]*k); }
  return new Float64Array(out); }
function norm(v){ const l=Math.hypot(v[0],v[1])||1; return [v[0]/l,v[1]/l]; }

/* ---------- neighbours: merged massing to 1.5 km, one mesh + one coloured line set, picking by face ---------- */
function whichB(fi){ const s=R.nbFaceStart; let lo=0,hi=s.length-1; while(lo<hi){ const mid=(lo+hi+1)>>1; if(s[mid]<=fi) lo=mid; else hi=mid-1; } return lo; }
function buildNeighbours(site){
  const S=BD.S, siteB=new Set(site.blds||[]); const pos=[], idx=[], lp=[], lc=[]; const list=[], faceStart=[]; let tri=0;
  const cE=new T.Color(C.edge);
  for(const id in S.tiles){ if(!id.startsWith(S.city+':')) continue; for(const b of S.tiles[id].bld){ if(b.f===3||siteB.has(b)) continue;
      const d=Math.hypot(b.c[0]-site.c[0],b.c[1]-site.c[1]); if(d>RAD) continue; const h=Math.max(2,b.h||0), r=b.r, n=r.length/2;
      const base=pos.length/3; faceStart.push(tri); const near=d<=NEAR; const op=near?0.30:d<900?0.16:0.09;
      for(let i=0;i<n;i++){ const x=r[2*i]-site.c[0], z=-(r[2*i+1]-site.c[1]); pos.push(x,0,z, x,h,z); }
      for(let i=0;i<n;i++){ const j=(i+1)%n; const a0=base+2*i, a1=a0+1, b0=base+2*j, b1=b0+1; idx.push(a0,b0,b1, a0,b1,a1); tri+=2; }
      const contour=[]; for(let i=0;i<n;i++) contour.push(new T.Vector2(r[2*i],r[2*i+1])); let tris=[]; try{ tris=T.ShapeUtils.triangulateShape(contour,[]); }catch(e){}
      for(const t of tris){ idx.push(base+2*t[0]+1,base+2*t[1]+1,base+2*t[2]+1); tri++; }
      const ls=lp.length/3;
      for(let i=0;i<n;i++){ const j=(i+1)%n; const x=r[2*i]-site.c[0], z=-(r[2*i+1]-site.c[1]), x2=r[2*j]-site.c[0], z2=-(r[2*j+1]-site.c[1]); lp.push(x,h,z, x2,h,z2); if(near||i%2===0) lp.push(x,0,z, x,h,z); }
      const le=lp.length/3; for(let k=ls;k<le;k++) lc.push(cE.r*op,cE.g*op,cE.b*op);
      list.push({b,d,ls,le,op,h}); } }
  const g=new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute(pos,3)); g.setIndex(idx);
  const mesh=new T.Mesh(g,new T.MeshBasicMaterial({color:C.face,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1}));
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
function buildSite(site){
  const sc=R.scene; while(sc.children.length) sc.remove(sc.children[0]); lab.length=0; labels.innerHTML=''; R.ov=null;
  state={c:site.c, site}; const S=BD.S, sel=S.sel, A=S.answers, M=BD.model?BD.model():null; state.M=M;
  sc.add(new T.GridHelper(RAD*2.2,88,0x232629,0x1d1f22));
  sc.add(buildNeighbours(site));
  const dc=new T.Group(); state.dc=dc; sc.add(dc);
  // the lot, the setbacks, loading, plant yard
  if(M&&M.ring) dc.add(ringLine(M.ring,0.35,C.acc,false,1));
  if(M&&M.inset&&!M.existing) dc.add(ringLine(BD.geo.clip(M.ring,M.inset),0.3,C.grey,1.5,0.5));
  if(M&&M.loading){ dc.add(ringLine(M.loading,0.3,C.mat,2,0.8)); (M.loadSpaces||[]).forEach(r=>dc.add(ringLine(r,0.32,C.mat,false,0.7))); }
  if(M&&M.plant&&M.plant.yard) dc.add(ringLine(BD.geo.clip(M.ring,M.plant.yard),0.3,C.grey,2,0.6));
  // the building
  let roof=0, foot=null;
  if(M&&M.existing){ for(const b of (sel.blds||[]).filter(b=>b.f!==3)) dc.add(prism(b.r,Math.max(2,b.h),0,0x221d1e,C.acc,0.9,0.85)); foot=M.foot; roof=M.H;
    if(A.extent==='part'){ const big=M.foot; const lvl={basement:-4,ground:0,upper:Math.max(4,Math.min(roof-8,roof*0.6)),roof:roof-0.5}[A.floor||'ground']; dc.add(prism(big,4,lvl,0x3a2626,C.acc,1)); } }
  else if(M&&M.foot&&M.footArea>5){ foot=M.foot; roof=M.H; const nF=M.nF[0];
    const g=prism(foot,roof,0,0x211c1d,C.acc,1,0.55); dc.add(g); state.shell=g;
    const lv=[]; for(let i=1;i<nF;i++) lv.push(6+(i-1)*((roof-6)/Math.max(1,nF-1))); lv.forEach(z=>dc.add(ringLine(foot,z,C.acc,false,0.35)));
    if(M.Z.ground) dc.add(ringLine(offsetRing(foot,-0.4),0.4,C.grey,1.2,0.6));
    state.hallZ=M.Z.ground?6:0.3; }
  else if(sel.pt){ foot=new Float64Array(circlePts(sel.pt[0],sel.pt[1],25,0,8).flatMap(v=>[v.x+site.c[0],-v.z+site.c[1]])); roof=18; dc.add(prism(foot,roof,0,0x221d1e,C.acc,1)); }
  state.foot=foot; state.roof=roof;
  // plant: generic units at the size and clearance the register gives; dashed outline = clearance
  if(M&&M.plant){ const P=M.plant; const grp={};
    for(const b of P.boxes){ const col=b.name.indexOf('generator')>=0?C.grey:C.edge; dc.add(prism(b.ring,b.h,b.base,0x26292e,col,0.85)); dc.add(ringLine(b.clear,b.base+0.06,col,1.2,0.45)); (grp[b.name+'|'+b.kind]=grp[b.name+'|'+b.kind]||[]).push(b); }
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
function racksFor(M){ const A=BD.S.answers, mw=A.mw||M.mwSized||1, racks=Math.round(mw*1000/8); const floors=Math.max(1,M.Z.ground?M.nF[0]-1:M.nF[0]); const per=Math.min(900,Math.ceil(racks/floors));
  const F=M.F, foot=M.foot; const pts=[]; let n=0; const z0=state.hallZ||0.3;
  const [u0,u1,v0,v1]=(()=>{ let a=1e9,b=-1e9,c=1e9,d=-1e9; for(let i=0;i<foot.length;i+=2){ const [u,v]=F.toL(foot[i],foot[i+1]); a=Math.min(a,u); b=Math.max(b,u); c=Math.min(c,v); d=Math.max(d,v); } return [a,b,c,d]; })();
  for(let v=v0+4; v<=v1-4-1.2 && n<per; v+=3.6) for(let u=u0+4; u<=u1-4-0.6 && n<per; u+=0.6){ const [x,y]=F.toW(u+0.3,v+0.6); if(!BD.pip(x,y,foot)) continue; pts.push([u,v]); n++; }
  const lp=[]; const h=2.0; for(const [u,v] of pts){ const c=[[u,v],[u+0.6,v],[u+0.6,v+1.2],[u,v+1.2]].map(([a,b])=>F.toW(a,b));
    for(let i=0;i<4;i++){ const p=c[i], q=c[(i+1)%4]; for(const z of [z0,z0+h]){ const A1=V(p[0],p[1],z), B1=V(q[0],q[1],z); lp.push(A1.x,A1.y,A1.z,B1.x,B1.y,B1.z); } } }
  const g=new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute(lp,3));
  const ls=new T.LineSegments(g,new T.LineBasicMaterial({color:C.mat,transparent:true,opacity:0.35})); state.dc.add(ls);
  return {obj:ls,n:pts.length,per,racks,floors}; }

/* ---------- overlays ---------- */
function clearOverlay(){ if(R.ov) R.scene.remove(R.ov); R.ov=new T.Group(); R.scene.add(R.ov); lab.splice(0); labels.innerHTML=''; resetTint(); R.onPick=null;
  if(state.shell){ state.shell.children[0].material.opacity=0.55; } if(state.racks) state.racks.obj.material.opacity=0.35; }
function roofC(){ return state.foot?BD.centroid(state.foot):state.c; }
function plantLabels(col){ const G=state.plantGroups||{}; for(const k in G){ const L=G[k], [name,where]=k.split('|'); const b=L[Math.floor(L.length/2)], c=BD.centroid(b.ring);
    const top=V(c[0],c[1],b.base+b.h), at=top.clone().add(new T.Vector3(0,9+(where==='roof'?4:0),0)); label(`${name} ×${L.length} · ${where}`,at,col?hex(col):'#e9e6e1',{prio:6,from:top}); } }
function baseLabels(){ const M=state.M; if(!M) return;
  if(state.foot&&!M.existing){ const c=roofC(); label(`data centre · ${M.H.toFixed(1)} m, ${M.nF[0]===M.nF[1]?M.nF[0]:M.nF[0]+'–'+M.nF[1]} storeys`,V(c[0],c[1],state.roof+20),'#e9e6e1',{prio:9,from:V(c[0],c[1],state.roof)}); }
  if(M.loading){ const c=BD.centroid(M.loading); label(`${M.loadingNeed.cls}s ×${M.loadingNeed.n}`,V(c[0],c[1],10),'#9fb38a',{prio:5,from:V(c[0],c[1],0.4)}); }
  if(M.plant&&M.plant.yard){ const c=BD.centroid(M.plant.yard); label('plant yard',V(c[0],c[1],14),'#9d9a94',{prio:4,from:V(c[0],c[1],0.4)}); }
  if(state.indoorZ&&state.foot){ const c=roofC(); label('cooling plant indoors · louvred top floor',V(c[0],c[1],state.indoorZ+12),'#9d9a94',{prio:7,from:V(c[0],c[1],state.indoorZ+3)}); }
  if(state.screenRing){ const c=BD.centroid(state.screenRing); label('roof screen',V(c[0],c[1],state.roof+14),'#9d9a94',{prio:5}); } }
function frame(r){ const k=r*1.15; R.cam.position.set(k*0.55,k*0.95,k*0.95); R.ctl.target.set(0,0,0); R.ctl.update(); }
function frameSite(){ const sp=state.span; R.cam.position.set(sp*1.9,sp*1.6+state.roof*1.3,sp*2.2); R.ctl.target.set(0,state.roof*0.35,0); R.ctl.update(); }
function note(t){ document.getElementById('v3note').textContent=t; }
function key(html){ const k=document.getElementById('v3key'); k.innerHTML=html; k.style.display=html?'':'none'; }
const sw=(c,t,dash)=>`<div><i style="display:inline-block;width:16px;height:0;border-top:1.5px ${dash?'dashed':'solid'} ${hex(c)};vertical-align:3px;margin-right:6px"></i>${t}</div>`;
function heightsNote(){ return BD.S.city==='van'?'Heights: City of Vancouver LiDAR 2022':'Heights: City of Edmonton 3D buildings (measured) or floor area ÷ footprint (estimate)'; }

function model(d){ plantLabels(); baseLabels(); const M=state.M, P=M&&M.plant;
  note((P&&P.miss&&P.miss.length?'Doesn\'t fit: '+P.miss.join('; ')+'. ':'')+heightsNote()+'. Neighbours drawn to 1.5 km.');
  key(sw(C.acc,'the lot; the building the numbers assume')+sw(C.grey,'setbacks (yards) and plant yard',true)+sw(C.edge,'plant, generic: solid = unit, dashed = clearance')+sw(C.mat,'loading spaces; racks inside')); }
const TYPE={housing:'Non-market housing',school:'School',care:'Care home',hospital:'Hospital',rec:'Recreation centre',pool:'Pool',arena:'Indoor arena'};
const TCOL={housing:C.city,school:C.power,care:C.senses,hospital:C.senses,rec:C.water,pool:C.water,arena:C.mat};
function heat(d){
  plantLabels(C.heat); baseLabels();
  const c=roofC(), src=V(c[0],c[1],state.roof+3);
  for(const rad of [1000,1200,1500]){ R.ov.add(line(circlePts(state.c[0],state.c[1],rad,0.5,180),C.heat,true,0.28)); label(`${rad/1000} km`,V(state.c[0],state.c[1]-rad,2),'#6b6964',{prio:1}); }
  (d.nets||[]).forEach(n=>{ const p=[]; for(let i=0;i<n.r.length;i+=2) p.push(V(n.r[i],n.r[i+1],0.6)); R.ov.add(line(p,C.heat,true,0.9)); const cc=BD.centroid(n.r); label(n.n+' (traced)',V(cc[0],cc[1],4),'#d1a35e',{prio:5}); });
  const all=(d.all||d.near||[]); const lim=d.lim||40; let shown=0;
  for(const p of all){ if(shown>=lim) break; const nb=snap(p.x,p.y); const col=TCOL[p.t]||C.heat; const beyond=!!p.beyond; const ccol=beyond?C.faint:col;
    let top; if(nb){ nb.recv=p; nb.recvType=TYPE[p.t]+(beyond?' · beyond break-even':''); tintB(nb,ccol,beyond?0.6:1); top=V(nb.b.c[0],nb.b.c[1],nb.h); }
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
  key(Object.entries(TYPE).map(([k,t])=>sw(TCOL[k],t)).join('')+sw(C.faint,'beyond break-even (shown, greyed)',true)+sw(C.heat,'district energy (traced) · reach rings',true));
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
function materials(d){ baseLabels(); if(state.shell) state.shell.children[0].material.opacity=0.12; if(state.racks){ state.racks.obj.material.opacity=0.9; const c=roofC(); label(`${state.racks.racks} racks · first hall floor shown (${state.racks.n}${state.racks.per>state.racks.n?' of '+state.racks.per:''}) · replaced about every 5–6 years`,V(c[0],c[1],(state.hallZ||0)+3.5),'#9fb38a',{prio:9}); }
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
function siteKey(){ const S=BD.S, M=BD.model?BD.model():null; return S.city+'|'+S.sel.id+'|'+JSON.stringify(S.answers)+'|'+(M?M.footArea:0); }
async function show(tab,data){ await ensure(); if(!R) setup(); R.multi=null; if(R.cap){ R.cap.forEach(c=>c.remove()); R.cap=[]; } wrap.style.display='';
  const site=data.site||(BD.eng?BD.eng.siteFacts():null); if(!site) return; await ensureTiles(site.c);
  const k=siteKey(); if(state.key!==k||!state.site){ buildSite(site); state.key=k; }
  clearOverlay(); const prev=state.tab; state.tab=tab; if(tab!=='heat'&&prev==='heat') frameSite(); (FN[tab]||model)(data||{}); }
/* three options side by side: one camera, three scenes sharing the site model (J.B., 15 Oct) */
async function showOptions(opts,data){
  await show('model',{site:data.site}); clearOverlay(); R.scene.remove(R.ov);
  if(R.cap) R.cap.forEach(c=>c.remove()); R.cap=[];
  // each option gets its own building and plant, sized for its own servers (J.B., 16 Oct: "the geometry looks the same in A, B and C")
  const A=BD.S.answers, mw0=A.mw, site=data.site||(BD.eng?BD.eng.siteFacts():null), built=[];
  for(const o of opts){ A.mw=o.mw; if(BD.modelReset) BD.modelReset(); buildSite(site); clearOverlay(); R.scene.remove(R.ov);
    built.push({kids:R.scene.children.slice(),st:state}); }
  A.mw=mw0; if(BD.modelReset) BD.modelReset();
  R.multi=opts.map((o,i)=>{ const s=new T.Scene(); built[i].kids.forEach(ch=>s.add(ch)); state=built[i].st; R.ov=new T.Group(); s.add(R.ov);
    const c=roofC(), src=V(c[0],c[1],state.roof+3);
    if(!o.recover){ for(const b of Object.values(state.plantGroups||{}).flat().slice(0,8)){ const cc=BD.centroid(b.ring); const a=V(cc[0],cc[1],b.base+b.h); R.ov.add(line(arc(a,a.clone().add(new T.Vector3(0,18,0)),3,8),0x9d9a94,true,0.9)); } }
    else if(o.to==='net'&&data.net){ const n=data.net, p=[]; for(let k=0;k<n.r.length;k+=2) p.push(V(n.r[k],n.r[k+1],0.6)); R.ov.add(line(p,C.heat,true,0.9)); const cc=BD.centroid(n.r); R.ov.add(line(arc(src,V(cc[0],cc[1],2),80),C.heat,false,0.9)); }
    else (data.near||[]).slice(0,o.n||8).forEach(p=>{ const nb=snap(p.x,p.y); const top=nb?V(nb.b.c[0],nb.b.c[1],nb.h):V(p.x,p.y,10); R.ov.add(line(arc(src,top,Math.min(120,p.dist*0.12)),C.heat,true,0.85)); });
    const d=document.createElement('div'); d.style.cssText=`position:absolute;top:44px;left:calc(${i*33.333}% + 12px);width:calc(33.333% - 24px);font:300 12px/1.4 "Open Sans",system-ui,sans-serif;color:#e9e6e1;pointer-events:none`;
    d.innerHTML=`<div style="font-size:11px;letter-spacing:.12em;color:#9d9a94;font-weight:600">${o.id.toUpperCase()}</div><div>${esc(o.name)}</div><div style="color:#9d9a94">${esc(o.caption)}</div>`; wrap.appendChild(d); R.cap.push(d);
    return s; });
  state=built[1].st; state.key=null;
  for(let i=1;i<3;i++){ const d=document.createElement('div'); d.style.cssText=`position:absolute;top:0;bottom:0;left:${i*33.333}%;border-left:1px solid #30343a;pointer-events:none`; wrap.appendChild(d); R.cap.push(d); }
  { const sp=state.span; R.cam.position.set(sp*3.0,sp*2.6+state.roof*1.4,sp*3.4); R.ctl.target.set(0,state.roof*0.4,0); } note('Same site, same view: drag to orbit all three'); key(''); }
function hide(){ if(wrap) wrap.style.display='none'; if(R){ R.multi=null; if(R.cap){ R.cap.forEach(c=>c.remove()); R.cap=[]; } } }
BD.scene3d={show,showOptions,hide,ensure,snap:(x,y)=>R&&R.nbList?snap(x,y):null,state:()=>state,isOpen:()=>!!wrap&&wrap.style.display!=='none'};
BD.showModel=()=>{ if(!BD.S.sel) return; show('model',{}).catch(e=>console.warn(e)); };
})();
