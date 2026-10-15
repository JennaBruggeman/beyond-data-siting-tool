/* Beyond Data — the site in 3D (Study A: dark line drawing). One scene per site; each exchange tab switches an overlay.
   Neighbouring buildings come from the map tiles (Vancouver: LiDAR 2022 heights; Edmonton: estimated heights, labelled).
   Everything drawn is generic equipment at the scale the register gives; nothing locates real utility entries or security features. */
(function(){
'use strict';
const BD=window.BD;
const TH='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
const OC='https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js';
const C={bg:0x17181a,face:0x1e2023,edge:0xe9e6e1,acc:0xCC746C,heat:0xd1a35e,power:0xa7b4d6,water:0x7fb2c4,mat:0x9fb38a,senses:0xb9a3cf,city:0xc8c2b8,ok:0x8fb996,bad:0xb24f49,faint:0x6b6964};
let three=null, R=null, wrap=null, labels=null, state={};
function load(src){ return new Promise((ok,no)=>{ const s=document.createElement('script'); s.src=src; s.onload=ok; s.onerror=()=>no(new Error('could not load '+src)); document.head.appendChild(s); }); }
async function ensure(){ if(three) return three; if(!window.THREE) await load(TH); if(!THREE.OrbitControls) await load(OC); three=THREE; return three; }

function setup(){
  const T=three, map=document.getElementById('map');
  wrap=document.createElement('div'); wrap.id='v3d'; wrap.style.cssText='position:absolute;inset:0;background:#17181a;z-index:2';
  labels=document.createElement('div'); labels.style.cssText='position:absolute;inset:0;pointer-events:none;font:300 11px/1.3 "Open Sans",system-ui,sans-serif;color:#9d9a94';
  const bar=document.createElement('div'); bar.style.cssText='position:absolute;left:12px;top:12px;display:flex;gap:6px;z-index:3';
  bar.innerHTML='<button id="v3map" style="background:rgba(30,32,35,.92);border:1px solid #3c4148;border-radius:6px;padding:4px 10px;color:#e9e6e1;cursor:pointer;font-size:12px">← Map</button><span id="v3note" style="background:rgba(30,32,35,.92);border:1px solid #30343a;border-radius:6px;padding:4px 10px;font-size:12px;color:#9d9a94"></span>';
  wrap.appendChild(labels); wrap.appendChild(bar); map.appendChild(wrap);
  const ren=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true}); ren.setPixelRatio(Math.min(window.devicePixelRatio||1,2)); ren.setClearColor(C.bg);
  wrap.insertBefore(ren.domElement,labels); ren.domElement.style.cssText='display:block;width:100%;height:100%';
  const scene=new T.Scene(); const cam=new T.PerspectiveCamera(35,1,1,20000);
  const ctl=new T.OrbitControls(cam,ren.domElement); ctl.enableDamping=true; ctl.maxPolarAngle=Math.PI*0.48;
  R={ren,scene,cam,ctl,groups:{}};
  document.getElementById('v3map').onclick=()=>hide();
  const fit=()=>{ const b=wrap.getBoundingClientRect(); if(!b.width) return; ren.setSize(b.width,b.height,false); cam.aspect=b.width/b.height; cam.updateProjectionMatrix(); };
  new ResizeObserver(fit).observe(wrap); fit();
  (function loop(){ requestAnimationFrame(loop); if(wrap.style.display==='none') return; ctl.update(); ren.render(scene,cam); placeLabels(); })();
}
const lab=[]; function label(text,pos,col){ const d=document.createElement('div'); d.textContent=text; d.style.cssText=`position:absolute;white-space:nowrap;transform:translate(-50%,-120%);color:${col||'#9d9a94'};text-shadow:0 0 3px #17181a,0 0 3px #17181a`; labels.appendChild(d); lab.push({d,pos}); return d; }
function placeLabels(){ const b=wrap.getBoundingClientRect(); for(const l of lab){ if(l.d.style.display==='none'&&!l.vis) continue; const v=l.pos.clone().project(R.cam); const on=v.z<1&&Math.abs(v.x)<1.1&&Math.abs(v.y)<1.1&&l.vis!==false; l.d.style.display=on?'':'none'; l.d.style.left=((v.x+1)/2*b.width)+'px'; l.d.style.top=((1-v.y)/2*b.height)+'px'; } }

/* geometry helpers: local metres (x east, y north) → three (x, y up, z south) */
function V(x,y,z){ return new three.Vector3(x-state.c[0],z||0,-(y-state.c[1])); }
function shapeOf(r){ const s=new three.Shape(); s.moveTo(r[0]-state.c[0],r[1]-state.c[1]); for(let i=2;i<r.length;i+=2) s.lineTo(r[i]-state.c[0],r[i+1]-state.c[1]); return s; }
function prism(r,h,base,faceCol,edgeCol,edgeOp){ const T=three;
  const g=new T.ExtrudeGeometry(shapeOf(r),{depth:h,bevelEnabled:false}); g.rotateX(-Math.PI/2); g.translate(0,base||0,0);
  const m=new T.Mesh(g,new T.MeshBasicMaterial({color:faceCol,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1}));
  const e=new T.LineSegments(new T.EdgesGeometry(g,20),new T.LineBasicMaterial({color:edgeCol,transparent:true,opacity:edgeOp}));
  const grp=new T.Group(); grp.add(m); grp.add(e); grp.userData.edge=e; return grp; }
function box(cx,cy,w,d,h,base,col,op,rot){ const T=three; const g=new T.BoxGeometry(w,h,d); g.translate(0,h/2+(base||0),0);
  const grp=new T.Group(); grp.add(new T.Mesh(g,new T.MeshBasicMaterial({color:C.face,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1})));
  grp.add(new T.LineSegments(new T.EdgesGeometry(g),new T.LineBasicMaterial({color:col,transparent:true,opacity:op==null?1:op})));
  const p=V(cx,cy,0); grp.position.copy(p); if(rot) grp.rotation.y=rot; return grp; }
function line(pts,col,dashed,op){ const T=three; const g=new T.BufferGeometry().setFromPoints(pts);
  const m=dashed?new T.LineDashedMaterial({color:col,dashSize:6,gapSize:4,transparent:true,opacity:op==null?1:op}):new T.LineBasicMaterial({color:col,transparent:true,opacity:op==null?1:op});
  const l=new T.Line(g,m); if(dashed) l.computeLineDistances(); return l; }
function ringPts(cx,cy,rad,z,n){ const p=[]; for(let i=0;i<=(n||96);i++){ const a=i/(n||96)*Math.PI*2; p.push(V(cx+rad*Math.cos(a),cy+rad*Math.sin(a),z||0.3)); } return p; }
function arc(a,b,h,n){ const p=[]; for(let i=0;i<=(n||32);i++){ const t=i/(n||32); const v=a.clone().lerp(b,t); v.y+=Math.sin(Math.PI*t)*h; p.push(v); } return p; }
function inset(r,f){ const c=BD.centroid(r); const o=new Float64Array(r.length); for(let i=0;i<r.length;i+=2){ o[i]=c[0]+(r[i]-c[0])*f; o[i+1]=c[1]+(r[i+1]-c[1])*f; } return o; }
function bbox(r){ let a=1e9,b=1e9,c=-1e9,d=-1e9; for(let i=0;i<r.length;i+=2){ a=Math.min(a,r[i]); b=Math.min(b,r[i+1]); c=Math.max(c,r[i]); d=Math.max(d,r[i+1]); } return [a,b,c,d]; }

/* ---------- build the site scene ---------- */
function build(site){
  const T=three, S=BD.S, sel=S.sel; const sc=R.scene; while(sc.children.length) sc.remove(sc.children[0]); lab.length=0; labels.innerHTML='';
  state={c:site.c, site}; R.groups={};
  const RAD=420;
  // ground grid (faint)
  const gg=new T.GridHelper(RAD*2.4,48,0x26292e,0x202327); sc.add(gg);
  // neighbours
  const nb=new T.Group(); const siteB=new Set(site.blds);
  for(const id in S.tiles){ if(!id.startsWith(S.city+':')) continue; for(const b of S.tiles[id].bld){ if(b.f===3) continue; if(Math.hypot(b.c[0]-site.c[0],b.c[1]-site.c[1])>RAD) continue; if(siteB.has(b)) continue;
      const g=prism(b.r,Math.max(2,b.h),0,C.face,C.edge,0.28); g.userData.b=b; nb.add(g); } }
  sc.add(nb); R.nb=nb;
  // parcel
  if(sel.ring){ const p=[]; for(let i=0;i<sel.ring.length;i+=2) p.push(V(sel.ring[i],sel.ring[i+1],0.4)); p.push(p[0].clone()); sc.add(line(p,C.acc)); }
  else if(sel.pt){ sc.add(line(ringPts(sel.pt[0],sel.pt[1],18,0.4),C.acc,true)); }
  // the data centre
  const dc=new T.Group(); const A=S.answers;
  let roof=0, foot=null;
  if(A.built==='new'&&sel.ring){
    foot=inset(sel.ring,0.86); const H=site.floors?6+(site.floors-1)*4:18; roof=H;
    if(A.extent==='part'){ const g=prism(foot,H,0,C.face,C.edge,0.5); dc.add(g); const fl=prism(foot,6,0,0x2a2224,C.acc,1); dc.add(fl); roof=6; }
    else { dc.add(prism(foot,H,0,0x221d1e,C.acc,1)); }
  } else if(site.blds.length){
    const big=site.blds.reduce((a,b)=>b.a>a.a?b:a); foot=big.r; roof=Math.max(3,big.h);
    for(const b of site.blds) dc.add(prism(b.r,Math.max(2,b.h),0,0x221d1e,b===big?C.acc:C.edge,b===big?1:0.5));
    if(A.extent==='part'){ const lvl={basement:-4,ground:0,upper:Math.max(4,Math.min(roof-8,roof*0.6)),roof:roof-0.5}[A.floor||'ground']; dc.add(prism(big.r,4,lvl,0x3a2626,C.acc,1)); }
  } else if(sel.pt){ foot=new Float64Array(ringPts(sel.pt[0],sel.pt[1],25,0,8).flatMap(v=>[v.x+site.c[0],-v.z+site.c[1]])); roof=18; dc.add(prism(foot,roof,0,0x221d1e,C.acc,1)); }
  sc.add(dc); state.foot=foot; state.roof=roof;
  // camera
  const span=foot?Math.max(60,Math.hypot(bbox(foot)[2]-bbox(foot)[0],bbox(foot)[3]-bbox(foot)[1])):80;
  R.cam.position.set(span*3.6,span*3.2+roof*1.4,span*4.2); R.ctl.target.set(0,roof*0.4,0); R.ctl.update();
  state.span=span;
  document.getElementById('v3note').textContent=S.city==='van'?'Heights: City of Vancouver LiDAR 2022':'Heights: estimated from floor area (Edmonton) — not measured';
}

/* ---------- overlays per tab ---------- */
function clearOverlay(){ if(R.ov){ R.scene.remove(R.ov); } R.ov=new three.Group(); R.scene.add(R.ov); for(const l of lab) l.vis=false; lab.splice(0); labels.innerHTML=''; if(R.nb) R.nb.children.forEach(g=>{ g.userData.edge.material.color.setHex(C.edge); g.userData.edge.material.opacity=0.28; }); }
function plantOnRoof(m2,col){ // generic roof units 12 × 2.4 m, rows along the footprint's long side
  if(!state.foot||m2<=0) return; const T=three, bb=bbox(state.foot); const w=12, d=2.4, gap=1.6; const n=Math.max(1,Math.ceil(m2/(w*d)));
  const cx=(bb[0]+bb[2])/2, cy=(bb[1]+bb[3])/2, cols=Math.max(1,Math.floor((bb[2]-bb[0])*0.7/(w+gap)));
  for(let i=0;i<n&&i<60;i++){ const r=Math.floor(i/cols), c=i%cols; const x=cx-(cols-1)*(w+gap)/2+c*(w+gap), y=cy+((bb[3]-bb[1])*0.25)-r*(d+gap*2); R.ov.add(box(x,y,w,d,2.2,state.roof,col,0.9)); }
}
function marker(x,y,col,h){ R.ov.add(line([V(x,y,0),V(x,y,h||14)],col)); const s=new three.Mesh(new three.SphereGeometry(1.6,8,6),new three.MeshBasicMaterial({color:col})); s.position.copy(V(x,y,h||14)); R.ov.add(s); }
function heat(d){
  const roofC=state.foot?BD.centroid(state.foot):state.c, src=V(roofC[0],roofC[1],state.roof+3);
  plantOnRoof(d.plantRecover||0,C.heat);
  for(const [rad] of [[1000],[1200],[1500]]) R.ov.add(line(ringPts(state.c[0],state.c[1],rad,0.5,160),C.heat,true,0.35));
  (d.nets||[]).forEach(n=>{ const p=[]; for(let i=0;i<n.r.length;i+=2) p.push(V(n.r[i],n.r[i+1],0.6)); R.ov.add(line(p,C.heat,true,0.9)); const c=BD.centroid(n.r); label(n.n+' (traced)',V(c[0],c[1],2),'#d1a35e'); });
  const COL={housing:C.city,school:C.power,care:C.senses,hospital:C.senses,rec:C.water,pool:C.water,arena:C.mat};
  (d.near||[]).slice(0,14).forEach(p=>{ const to=V(p.x,p.y,12); R.ov.add(line(arc(src,to,Math.min(120,p.dist*0.12)),COL[p.t]||C.heat,true,0.85)); marker(p.x,p.y,COL[p.t]||C.heat,12); });
  label('heat out',src.clone().add(new three.Vector3(0,6,0)),'#d1a35e');
}
function energy(d){
  plantOnRoof(d.plant||0,C.power);
  // solar on the rest of the roof (flat panels, faint)
  if(state.foot&&d.pvKwp){ const bb=bbox(state.foot); const w=(bb[2]-bb[0])*0.6, h=(bb[3]-bb[1])*0.3; const cx=(bb[0]+bb[2])/2, cy=bb[1]+(bb[3]-bb[1])*0.25;
    for(let i=0;i<6;i++) R.ov.add(box(cx,cy-h/2+i*h/6,w,h/8,0.3,state.roof+0.6,C.power,0.7)); label(`solar ≈ ${Math.round(d.pvKwp)} kWp`,V(cx,cy,state.roof+4),'#a7b4d6'); }
  // service drop (generic, not a real entry point) and battery container at grade
  if(state.foot){ const bb=bbox(state.foot); const x=bb[0]-6, y=(bb[1]+bb[3])/2;
    R.ov.add(line([V(x,y,0),V(x,y,30)],C.power)); label('utility service (generic)',V(x,y,32),'#a7b4d6');
    if(d.battM2) { R.ov.add(box(bb[2]+8,bb[1]+8,12,2.6,2.9,0,C.power,0.9)); label(`battery ≈ ${Math.round(d.battM2)} m²`,V(bb[2]+8,bb[1]+8,5),'#a7b4d6'); } }
  label(d.grid||'',V(state.c[0],state.c[1],state.roof+22),'#e9e6e1');
}
function water(d){
  plantOnRoof(d.plant||0,C.water);
  if(!state.foot) return; const bb=bbox(state.foot), cx=(bb[0]+bb[2])/2, cy=(bb[1]+bb[3])/2;
  for(let i=0;i<5;i++){ const x=bb[0]+(bb[2]-bb[0])*(0.15+0.17*i); R.ov.add(line([V(x,bb[1]-1,state.roof+12),V(x,bb[1]-1,state.roof+1)],C.water,true,0.7)); }
  label(`rain on the roof ≈ ${Math.round(d.rain)} m³/yr`,V(cx,bb[1],state.roof+16),'#7fb2c4');
  R.ov.add(box(bb[2]+7,cy,5,5,3,-3,C.water,0.9)); label('cistern',V(bb[2]+7,cy,4),'#7fb2c4');
  R.ov.add(line([V(bb[0]-30,cy,-1.5),V(bb[0],cy,-1.5)],C.water)); label('city water in',V(bb[0]-30,cy,2),'#7fb2c4');
  R.ov.add(line([V(cx,bb[1],-2.5),V(cx,bb[1]-30,-2.5)],C.faint,true)); label('to sewer',V(cx,bb[1]-30,1),'#9d9a94');
  if(d.towers){ for(let i=0;i<4;i++){ const a=V(cx+(i-1.5)*6,cy,state.roof+4); R.ov.add(line(arc(a,a.clone().add(new three.Vector3(6,22,0)),4,10),C.water,true,0.5)); } label(`evaporation ≈ ${d.evap}`,V(cx,cy,state.roof+28),'#7fb2c4'); }
}
function materials(d){
  if(!state.foot) return; const bb=bbox(state.foot), cx=(bb[0]+bb[2])/2, cy=(bb[1]+bb[3])/2;
  // racks floating above the roof: the part replaced every ~6 years, lifted out of the long-lived shell
  const rows=Math.min(8,Math.max(2,Math.round(d.racks/40))), per=Math.min(24,Math.ceil(d.racks/rows)); const lift=state.roof+14;
  for(let r=0;r<rows;r++) for(let i=0;i<per;i++) R.ov.add(box(cx-(per-1)*0.75+i*1.5,cy-(rows-1)*2.2+r*4.4,0.6,1.2,2.0,lift,C.mat,0.8));
  label(`${Math.round(d.racks)} racks — replaced about every 6 years`,V(cx,cy,lift+5),'#9fb38a');
  label('shell: decades',V(bb[0],bb[1],state.roof*0.5),'#c8c2b8');
  R.ov.add(box(bb[2]+10,bb[1]-6,10,2.5,3,0,C.mat,0.9)); label('loading, e-waste out',V(bb[2]+10,bb[1]-6,5),'#9fb38a');
}
function social(d){
  plantOnRoof(d.plant||0,C.senses);
  if(state.foot){ const bb=bbox(state.foot); const c=BD.centroid(state.foot);
    // standoff band as experienced at the edge (generic distance from the register, not a security plan)
    const r10=Math.hypot(bb[2]-bb[0],bb[3]-bb[1])/2+10; R.ov.add(line(ringPts(c[0],c[1],r10,0.4,96),C.senses,true,0.6)); label('10 m standoff (Ontario standard, transferred)',V(c[0]+r10*0.7,c[1]+r10*0.7,2),'#b9a3cf'); }
  // neighbours coloured by screened night level against the limit
  // red: over the night limit even with low-noise units; accent: over only with standard units (the choice of equipment decides)
  if(R.nb&&d.noise){ const pc=state.foot?BD.centroid(state.foot):state.c; for(const g of R.nb.children){ const b=g.userData.b; const r=Math.max(5,Math.hypot(b.c[0]-pc[0],b.c[1]-pc[1])); const m=g.userData.edge.material;
      const lo=d.noise.lw[0]-20*Math.log10(r)-8, hi=d.noise.lw[1]-20*Math.log10(r)-8;
      if(lo>d.noise.limit){ m.color.setHex(C.bad); m.opacity=0.95; } else if(hi>d.noise.limit){ m.color.setHex(C.acc); m.opacity=0.85; } } }
  for(const [rad] of [[50],[100],[200]]) R.ov.add(line(ringPts(state.c[0],state.c[1],rad,0.5,120),C.senses,true,0.3));
}
const FN={heat,energy,water,materials,social};
async function show(tab,data){
  await ensure(); if(!R) setup(); wrap.style.display='';
  const site=data.site; if(!state.site||state.key!==BD.S.sel.id+'|'+JSON.stringify(BD.S.answers)){ build(site); state.key=BD.S.sel.id+'|'+JSON.stringify(BD.S.answers); }
  clearOverlay(); (FN[tab]||(()=>{}))(data);
}
function hide(){ if(wrap) wrap.style.display='none'; }
BD.scene3d={show,hide,ensure};
})();
