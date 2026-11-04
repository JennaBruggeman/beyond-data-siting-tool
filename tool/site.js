/* Beyond Data — site setup (v19, 16 Oct 2026): zone limits with their clauses, the footprint the numbers assume, and five setup cards
   shown in a drawer over the map after a parcel is picked (J.B., 16 Oct: "5 cards in sequence"). The 3D view draws the building these
   cards describe; What fits reads the same model. Wording is Claude's draft for J.B. (draft colour). */
(function(){
'use strict';
const BD=window.BD; const {$,esc,fmt}=BD;
const draft=t=>`<span class="draft">${t}</span>`;

/* ---------- zone limits, with the clause each number comes from ---------- */
/* lean refactor 3 Nov 2026: the zone tables live in tool/data/zones.json, each row with its register ids (envelope; van_zdb_*, edm_bl20001, arch_zon_EdmZones) */
const ZD=BD.data.zones, ZV=ZD.ZV, ZE=ZD.ZE, LD=ZD.loading;
const ROOFNOTE={van:['Roof equipment','the Director of Planning may let mechanical equipment and its screening exceed the height limit','Zoning and Development By-law s. 10.1.1'],
                edm:['Roof equipment','ventilating equipment, plumbing stacks and mechanical penthouses are not counted in height','Bylaw 20001 s. 5.70 cl. 1.9.5']};
// Edmonton map modifiers: "h" = maximum height in metres, "f" = maximum floor area ratio (Bylaw 20001 s. 8.20; e.g. MU s. 4.1.1, 4.1.3)
function edmMods(z){ const m={}; String(z||'').split(/\s+/).slice(1).forEach(t=>{ const a=t.match(/^h(\d+(\.\d+)?)$/), b=t.match(/^f(\d+(\.\d+)?)$/); if(a) m.h=+a[1]; if(b) m.f=+b[1]; if(t==='cf') m.cf=true; }); return m; }
/* low-density homes (J.B., 16 Oct): distinct tint on the map, still selectable */
const LOWD={van:/^(R1-1|RT-\d+[A-Z]?)$/, edm:/^(RS|RSF|RR)$/};
function lowDensity(city,z){ const k=String(z||'').trim().split(/\s+/)[0].toUpperCase(); return LOWD[city].test(k); }
BD.lowDensity=lowDensity;

function zoneLimits(city,zraw){
  const A=BD.S.answers, z=String(zraw||'').trim(), key=city==='edm'?z.split(/\s+/)[0].toUpperCase():z;
  /* Build 2 (3 Nov 2026, part 7): FC-2 by sub-area (A.fcSub; zones.json 'FC-2 A' … 'FC-2 E'), I-2 sub-area B (A.subB) */
  const vkey=key==='I-2'&&A.subB?'I-2B':key==='FC-2'&&A.fcSub&&ZV['FC-2 '+A.fcSub]?'FC-2 '+A.fcSub:key;
  let base=city==='van'?ZV[vkey]:ZE[key], assumed=false, mods=city==='edm'?edmMods(z):{};
  const out={zone:z,key,city,cl:[],warn:''};
  if(!base){ assumed=true; base=city==='van'?ZV['I-2']:ZE.IM;
    out.warn=`Zone ${esc(z||'(none recorded)')} has no data-centre limits in the tool. The numbers use ${city==='van'?'I-2':'IM'} limits as if the lot were rezoned — an assumption for comparison, not a prediction. Set your own limits below if you know them.`;
    if(mods.h||mods.f) out.warn+=` The zoning map gives this lot ${mods.h?`a ${mods.h} m height`:''}${mods.h&&mods.f?' and ':''}${mods.f?`a floor area ratio of ${mods.f}`:''} (Bylaw 20001 modifiers, s. 8.20); these are shown, not used, because they belong to a zone where a data centre is not an allowed use.`; }
  /* Build 2: fields the by-law does not give (base.q, e.g. EETC floor area ratio and height) stay '?': the tool borrows IM's figures only so it can draw, and says so */
  if(base.q&&base.q.length){ const F={fsr:'floor area ratio',h:'height'}, b2=Object.assign({},base); base.q.forEach(f=>{ b2[f]=ZE.IM[f]; }); base=b2;
    out.q=base.q; out.warn=`Zone ${esc(key)}: the by-law gives no ${base.q.map(f=>F[f]||f).join(' or ')} (?). To draw something, the tool borrows IM's ${base.q.map(f=>f==='fsr'?'floor area ratio '+ZE.IM.fsr[1]:f==='h'?'height '+ZE.IM.h+' m':f).join(' and ')}: not this zone's limits.`; }
  out.assumed=assumed; out.base=base; out.mods=mods;
  out.cl=base.cl.slice(); out.cl.push(ROOFNOTE[city]);
  // user limits (J.B., 16 Oct: users can set their own height and FSR)
  const fsr=A.userFSR?[+A.userFSR,+A.userFSR]:base.fsr.slice(), hOut=A.userH?+A.userH:base.h;
  const hx=base.hx;
  out.fsr=fsr; out.hOutright=hOut; out.hx=hx; out.ground=base.ground; out.yards=base.yards; out.yardsKnown=!!base.known;
  out.userSet=!!(A.userFSR||A.userH);
  /* 2 Nov 2026 hard rules (J.B.): the register source of the zone's limits, for every rule text that cites them */
  out.srcId=city==='edm'?(({EETB:1,EETC:1,EETL:1,EETM:1,EETIM:1})[key]&&!assumed?'arch_zns_edmEETP':({EIB:1,EIM:1})[key]&&!assumed?'arch_zns_edmEllerslie':'edm_bl20001'):({'I-2':'van_zdb_i2','I-2B':'van_zdb_i2','I-3':'van_zdb_i3','FC-2':'van_zdb_fc2','I-1C':'van_zdb_i1c'}[key==='I-2'&&A.subB?'I-2B':(assumed?'I-2':key)]||'van_zdb_i2'); out.vkey=vkey;
  /* 2 Nov 2026 hard rules (site audit 8, exchanges F9): where Edmonton's bylaw requires the equipment screened, "leave it seen" is not offered */
  out.screen=null;
  if(city==='edm'&&key==='BE') out.screen={src:'arch_ezbLoad',why:'Edmonton BE s. 5.2: mechanical and electrical equipment, transformers and cooling towers "must be screened from view from Abutting Streets and Sites in non-industrial Zones" (register arch_ezbLoad). The plant is screened by default; "leave it seen" is not offered here.'};
  else if(city==='edm'&&assumed) out.screen={src:'edmZB5120',why:'This lot\'s zone today is not an industrial zone. Edmonton s. 5.120 subs. 1.1.2: for non-industrial development "All mechanical equipment, except for Solar Collectors, must be concealed by screening" (register edmZB5120). The tool applies it until a rezoning settles which rules hold (our reading ?). "Leave it seen" is not offered here.'};
  return out; }
BD.zoneLimits=zoneLimits;

/* ---------- geometry: the lot's long axis, setbacks, loading strip, plant yard, footprint ---------- */
function hull(r){ const p=[]; for(let i=0;i<r.length;i+=2) p.push([r[i],r[i+1]]); p.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
  const cr=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]); const lo=[],up=[];
  for(const q of p){ while(lo.length>=2&&cr(lo[lo.length-2],lo[lo.length-1],q)<=0) lo.pop(); lo.push(q); }
  for(let i=p.length-1;i>=0;i--){ const q=p[i]; while(up.length>=2&&cr(up[up.length-2],up[up.length-1],q)<=0) up.pop(); up.push(q); }
  return lo.slice(0,-1).concat(up.slice(0,-1)); }
function frameOf(r){ const h=hull(r); let best=null;
  for(let i=0;i<h.length;i++){ const a=h[i],b=h[(i+1)%h.length]; const L=Math.hypot(b[0]-a[0],b[1]-a[1]); if(L<1e-6) continue; const ux=(b[0]-a[0])/L, uy=(b[1]-a[1])/L;
    let u0=1e9,u1=-1e9,v0=1e9,v1=-1e9; for(const q of h){ const u=q[0]*ux+q[1]*uy, v=-q[0]*uy+q[1]*ux; u0=Math.min(u0,u); u1=Math.max(u1,u); v0=Math.min(v0,v); v1=Math.max(v1,v); }
    const ar=(u1-u0)*(v1-v0); if(!best||ar<best.ar) best={ar,ux,uy,u0,u1,v0,v1}; }
  let {ux,uy,u0,u1,v0,v1}=best; if(v1-v0>u1-u0){ [ux,uy]=[-uy,ux]; const nu=[v0,v1], nv=[-u1,-u0]; [u0,u1]=nu; [v0,v1]=nv; }
  const cu=(u0+u1)/2, cv=(v0+v1)/2; const cx=cu*ux-cv*uy, cy=cu*uy+cv*ux;
  return {cx,cy,ux,uy,L:u1-u0,W:v1-v0, toW:(a,b)=>[cx+a*ux-b*uy, cy+a*uy+b*ux], toL:(x,y)=>[(x-cx)*ux+(y-cy)*uy, -(x-cx)*uy+(y-cy)*ux]}; }
function rectW(F,a0,a1,b0,b1){ const p=[F.toW(a0,b0),F.toW(a1,b0),F.toW(a1,b1),F.toW(a0,b1)]; return new Float64Array(p.flat()); }
/* the largest simple rectangle (in the lot frame) that sits wholly inside the lot, within a1..a2 × b1..b2 (J.B., 16 Oct: "i just want simple massing") */
function inscribe(F,ring,a0,a1,b0,b1,grid,ye){ const ua=Math.min(a0,a1), ub=Math.max(a0,a1), va=Math.min(b0,b1), vb=Math.max(b0,b1), W=ub-ua, H=vb-va; if(W<=0||H<=0) return null;
  const L=[]; for(let i=0;i<ring.length;i+=2) L.push(F.toL(ring[i],ring[i+1]));
  const inLot=(u,v)=>{ const [x,y]=F.toW(u,v); return BD.pip(x,y,ring); };
  /* LOTLINES 4 Nov 2026: and no nearer any lot line than that line's own required yard (ye: m.edgeYards; 1 mm drawing tolerance) */
  const YE=(ye||[]).filter(e=>e.d>0), clear=(u0,u1,v0,v1)=>{ if(!YE.length) return true; const P=rectW(F,u0,u1,v0,v1); for(const e of YE) if(rectSegDist(P,e)<e.d-1e-3) return false; return true; };
  const ok=(u0,u1,v0,v1)=>{ for(let k=0;k<=4;k++){ const t=k/4; if(!inLot(u0+(u1-u0)*t,v0)||!inLot(u0+(u1-u0)*t,v1)||!inLot(u0,v0+(v1-v0)*t)||!inLot(u1,v0+(v1-v0)*t)) return false; }
    for(const [u,v] of L) if(u>u0+0.01&&u<u1-0.01&&v>v0+0.01&&v<v1-0.01) return false; return clear(u0,u1,v0,v1); };
  if(ok(ua,ub,va,vb)) return [ua,ub,va,vb];
  for(let sc=0.95;sc>=0.2;sc-=0.05){ const w=W*sc, h=H*sc; let best=null;
    for(let i=0;i<=8;i++) for(let j=0;j<=8;j++){ const u0=ua+(W-w)*i/8, v0=va+(H-h)*j/8; if(ok(u0,u0+w,v0,v0+h)){ best=[u0,u0+w,v0,v0+h]; break; } }
    if(best) return best;
    // also try keeping full depth or full width (long thin lots)
    for(const [w2,h2] of [[W,h],[w,H]]) for(let i=0;i<=8;i++) for(let j=0;j<=8;j++){ const u0=ua+(W-w2)*i/8, v0=va+(H-h2)*j/8; if(ok(u0,u0+w2,v0,v0+h2)) return [u0,u0+w2,v0,v0+h2]; } }
  return grid?inscribeGrid(ua,ub,va,vb,inLot,ok):null; }
/* bugfix 4 Nov 2026 (arch sweep 2, VI2L 1940 Glen Dr): on a bent or curved lot no scaled copy of the buildable box fits, so inscribe gave nothing, the set-up
   had no hall footprint (serverFoot) and the hall was drawn as the clipped footprint's bounding box, 438 × 201 m, outside the lot. Fallback: the largest
   rectangle of whole grid cells inside the lot (all four corners of each cell in the lot), checked with the same test as above, shrunk until it passes.
   Used for the building's footprint only (not the loading strip, which keeps its clipped outline); only lots where the search above finds nothing are affected. Cell size and the 6 m least side (as hallOptions) are drawing choices, not rules. */
function inscribeGrid(ua,ub,va,vb,inLot,ok){ const W=ub-ua, H=vb-va, c=Math.max(1,Math.sqrt(W*H/40000)), nu=Math.floor(W/c), nv=Math.floor(H/c), MIN=6; if(nu<1||nv<1) return null; /* drawing */
  const P=[]; for(let j=0;j<=nv;j++){ const row=new Uint8Array(nu+1); for(let i=0;i<=nu;i++) row[i]=inLot(ua+i*c,va+j*c)?1:0; P.push(row); }
  const h=new Int32Array(nu+1); let best=null;
  for(let j=0;j<nv;j++){ for(let i=0;i<nu;i++) h[i]=P[j][i]&&P[j][i+1]&&P[j+1][i]&&P[j+1][i+1]?h[i]+1:0;
    const st=[]; for(let i=0;i<=nu;i++){ while(st.length&&h[st[st.length-1]]>=h[i]){ const t=st.pop(), ht=h[t], left=st.length?st[st.length-1]+1:0, wd=i-left, a=ht*wd;
        if(ht&&Math.min(ht,wd)*c>=MIN&&(!best||a>best.a)) best={a,i0:left,i1:i,j0:j+1-ht,j1:j+1}; } st.push(i); } }
  if(!best) return null; let r=[ua+best.i0*c,ua+best.i1*c,va+best.j0*c,va+best.j1*c];
  for(let k=0;k<8;k++){ if(ok(r[0],r[1],r[2],r[3])) return r; const d=c/2; r=[r[0]+d,r[1]-d,r[2]+d,r[3]-d]; if(Math.min(r[1]-r[0],r[3]-r[2])<MIN) return null; }
  return null; }
function signedArea(r){ let s=0; for(let i=0,j=r.length-2;i<r.length;j=i,i+=2) s+=(r[j]*r[i+1]-r[i]*r[j+1]); return s/2; }
function clip(subj,clipR){ // Sutherland–Hodgman: subject (any simple polygon) clipped by a convex polygon
  let c=clipR; if(signedArea(c)<0){ const t=[]; for(let i=c.length-2;i>=0;i-=2) t.push(c[i],c[i+1]); c=new Float64Array(t); }
  let out=[]; for(let i=0;i<subj.length;i+=2) out.push([subj[i],subj[i+1]]);
  for(let i=0;i<c.length;i+=2){ const ax=c[i],ay=c[i+1],bx=c[(i+2)%c.length],by=c[(i+3)%c.length]; const inside=p=>(bx-ax)*(p[1]-ay)-(by-ay)*(p[0]-ax)>=0;
    const inp=out; out=[]; if(!inp.length) break;
    for(let k=0;k<inp.length;k++){ const P=inp[k], Q=inp[(k+1)%inp.length]; const pi=inside(P), qi=inside(Q);
      const X=()=>{ const dx=Q[0]-P[0], dy=Q[1]-P[1]; const den=(bx-ax)*dy-(by-ay)*dx; const t=den===0?0:((ax-P[0])*(by-ay)-(ay-P[1])*(bx-ax))/(-den); return [P[0]+t*dx,P[1]+t*dy]; };
      if(pi&&qi) out.push(Q); else if(pi&&!qi) out.push(X()); else if(!pi&&qi){ out.push(X()); out.push(Q); } } }
  return new Float64Array(out.flat()); }
BD.geo={frameOf,rectW,clip,hull};
/* LOTLINES 4 Nov 2026: distances between a rectangle and a lot line, and the lot set in by each line's own required yard */
function segSegDist(a,b,c,d){ const cr=(p,q,r)=>(q[0]-p[0])*(r[1]-p[1])-(q[1]-p[1])*(r[0]-p[0]), o1=cr(a,b,c), o2=cr(a,b,d), o3=cr(c,d,a), o4=cr(c,d,b);
  if(((o1>0)!==(o2>0))&&((o3>0)!==(o4>0))&&o1&&o2&&o3&&o4) return 0;
  const pd=(p,q,r)=>{ const dx=r[0]-q[0], dy=r[1]-q[1], l2=dx*dx+dy*dy; let t=l2?((p[0]-q[0])*dx+(p[1]-q[1])*dy)/l2:0; t=Math.max(0,Math.min(1,t)); return Math.hypot(p[0]-q[0]-t*dx,p[1]-q[1]-t*dy); };
  return Math.min(pd(a,c,d),pd(b,c,d),pd(c,a,b),pd(d,a,b)); }
function rectSegDist(P,e){ const A=[e.ax,e.ay], B=[e.bx,e.by]; if(BD.pip(e.ax,e.ay,P)||BD.pip(e.bx,e.by,P)) return 0; let m=Infinity;
  for(let i=0;i<8;i+=2){ const j=(i+2)%8; m=Math.min(m,segSegDist([P[i],P[i+1]],[P[j],P[j+1]],A,B)); } return m; }
/* each ring edge moved in by its own yard depth (D[i] for the edge from vertex i), corners mitred. null when the result folds over itself
   (a yard deeper than a notch is wide): then the yards are still kept by inscribe's test, and the line of the yards is drawn approximately. */
function offsetRing(r0,D0){ const V=[], D=[], m0=r0.length/2; for(let i=0;i<m0;i++){ const x=r0[2*i], y=r0[2*i+1], j=V.length/2; if(j&&Math.hypot(x-V[2*j-2],y-V[2*j-1])<1e-6){ D[j-1]=Math.max(D[j-1],D0[i]||0); continue; } V.push(x,y); D.push(D0[i]||0); }
  if(V.length>4&&Math.hypot(V[0]-V[V.length-2],V[1]-V[V.length-1])<1e-6){ V.length-=2; D.pop(); } /* the ring's closing vertex repeats its first */
  const r=new Float64Array(V), n=r.length/2; if(n<3) return null; const ccw=signedArea(r)>0, P=[];
  for(let i=0;i<n;i++){ const h=(i+n-1)%n, j=(i+1)%n, L=(a,b)=>{ const ax=r[2*a], ay=r[2*a+1], bx=r[2*b], by=r[2*b+1], l=Math.hypot(bx-ax,by-ay)||1, dx=(bx-ax)/l, dy=(by-ay)/l, nx=ccw?-dy:dy, ny=ccw?dx:-dx, d=D[a]||0; return {px:ax+nx*d,py:ay+ny*d,dx,dy,nx,ny,d}; };
    const a=L(h,i), b=L(i,j), den=a.dx*b.dy-a.dy*b.dx;
    if(Math.abs(den)<1e-9){ const d=Math.max(a.d,b.d); P.push(r[2*i]+b.nx*d,r[2*i+1]+b.ny*d); continue; }
    const t=((b.px-a.px)*b.dy-(b.py-a.py)*b.dx)/den, X=a.px+a.dx*t, Y=a.py+a.dy*t;
    if(Math.hypot(X-r[2*i],Y-r[2*i+1])>3*Math.max(a.d,b.d)+1){ P.push(r[2*i]+a.nx*a.d,r[2*i+1]+a.ny*a.d,r[2*i]+b.nx*b.d,r[2*i+1]+b.ny*b.d); continue; } /* drawing: nearly straight on with 2 depths, a step instead of a far mitre */
    P.push(X,Y); }
  const Q=new Float64Array(P), nq=Q.length/2; if((signedArea(Q)>0)!==ccw||Math.abs(signedArea(Q))>Math.abs(signedArea(r))+1e-6) return null;
  for(let i=0;i<nq;i++) for(let k=i+2;k<nq;k++){ if(i===0&&k===nq-1) continue; const a=[Q[2*i],Q[2*i+1]], b=[Q[2*((i+1)%nq)],Q[2*((i+1)%nq)+1]], c=[Q[2*k],Q[2*k+1]], d=[Q[2*((k+1)%nq)],Q[2*((k+1)%nq)+1]]; if(segSegDist(a,b,c,d)===0) return null; }
  for(let i=0;i<nq;i++) if(!BD.pip(Q[2*i],Q[2*i+1],r)&&D.every(x=>x>0)) return null; /* every point inside the lot when no line is at 0 m */
  return Q; }

/* loading spaces: Vancouver Parking By-law 6059 s. 5 (Class B; row 5.2.5 as the "similar use" — the Director of Planning decides, s. 5.1.4);
   Edmonton Bylaw 20001 s. 5.80 subs. 7. Aisle: Vancouver's 6.1 m (s. 5.4.1) used in both cities as an assumption. */
function loadingNeed(city,gfa){
  if(city==='van'){ const L=LD.van, n=gfa<100?0:1+(gfa>L.bayFirst?1:0)+Math.max(0,Math.ceil((gfa-L.bayEach)/L.bayEach)); const nC=gfa<L.classC[0]?0:gfa<=L.classC[1]?1:2; // tool/data/zones.json loading (vanParking5); under 100 m² no bay: unsourced list
    return {n,len:L.len,wid:L.wid,ht:L.ht,aisle:L.aisle,cls:'truck loading bay',nC,
      basis:`${n} truck loading bays for ${fmt(gfa)} m² of floor. The Parking By-law calls this size Class B, its mid-size bay: 10.2 × 3.4 m with 3.8 m clearance (Class C is the 23.1 m bay for the largest trucks). The count uses row 5.2.5: the by-law does not name data centres, but the City classes them as a Transportation and Storage use (RTS 19744), which row 5.2.5 lists. Each bay is reached by a 6.1 m aisle (s. 5.4.1).${nC?` If the City reads a data centre as a storage warehouse, ${nC} Class C space${nC>1?'s':''} (23.1 × 3.6 m, 14.0 m aisle) would also be needed.`:''}`,src:'vanParking5'}; }
  const L=LD.edm, n=gfa<L.spaces[0]?0:gfa<=L.spaces[1]?1:2; // tool/data/zones.json loading (edmZB580; aisle vanParking5)
  return {n,len:L.len,wid:L.wid,ht:L.ht,aisle:L.aisle,cls:'loading space',
    basis:`${n} loading space${n===1?'':'s'} for ${fmt(gfa)} m² of floor area (Table 7.2). Each 9.0 × 3.0–3.3 m, 4.0 m clear, wholly on site, with no backing onto streets or alleys (s. 5.80 subs. 7). Aisle: Vancouver's 6.1 m used as an assumption.`,src:'edmZB580'}; }

/* the model the numbers and the 3D share */
let cache={key:null,m:null};
function model(){
  const S=BD.S, s=S.sel, A=S.answers; if(!s) return null; if(!A.built) A.built='new'; if(!A.extent) A.extent='whole'; /* the labelled defaults (lot test 20 Oct) */
  { const a0=s.a||[], Z0=zoneLimits(s.city,s.city==='van'?(a0[1]||''):(a0[2]||a0[1]||'')); if(Z0.screen&&(!A.vis||A.vis==='reveal')) A.vis='screen'; } /* 2 Nov 2026 hard rules: screening required (Z.screen) */
  const key=JSON.stringify([s.city,s.id,A.built,A.extent,A.floor,A.foot,A.cover,A.loadIn,A.flip,A.hmode,A.storeys,A.userFSR,A.userH,A.plantAt,A.outside,A.inside,A.spares,A.gens,A.genAt,A.genSpares,A.mw,A.vis,A.subB,A.fcSub,A.dcFloor,A.dcSite,A.hallOpt]);
  if(cache.key===key) return cache.m;
  const a=s.a||[], city=s.city, zraw=city==='van'?(a[1]||''):(a[2]||a[1]||'');
  const Z=zoneLimits(city,zraw);
  const lotArea=+(BD.S.sel.lotArea||(city==='van'?a[8]:a[4]))||0;
  let ring=s.ring; if(!ring&&s.pt){ const r=Math.sqrt(Math.max(lotArea,900))/2; ring=new Float64Array([s.pt[0]-r,s.pt[1]-r,s.pt[0]+r,s.pt[1]-r,s.pt[0]+r,s.pt[1]+r,s.pt[0]-r,s.pt[1]+r]); }
  const m={Z,city,lotArea,ring,notes:[],warn:[]};
  if(!ring){ cache={key,m}; return m; }
  let F=frameOf(ring);
  /* Build 2 (3 Nov 2026, part 3): lot-side facts (tool/lotside.js; select() in index.html). The end that faces a street becomes the street front (the
     higher class if both do); "Swap the ends" still swaps it. If no end faces a street but a long side does, the frame is turned so that side is an end
     (a drawing choice). Edmonton BE, IM, IH: each side's setback follows what it faces (tool/data/lotside.json edmSetback; register arch_hb_edmBE,
     arch_hb_edmIM, arch_hb_edmIH): BE 6.0 m to a street, 4.5 m to a Collector or Local Road, 6.0 m to a lot in a residential zone, 0 m to other lots and
     alleys; IM 3.0 m to a street, 6.0 m to a lot in a non-industrial zone; IH 3.0 m to a street. With no street found, the zone's own yards stay. */
  const LSD=BD.data.lotside; let side=null;
  /* LOTLINES 4 Nov 2026 (part 2): every lot line classed front, flank, rear, side or unclear by the by-laws' definitions (lotside.js classify; register
     lot_van_s2_lines, lot_van_s10_frontage, lot_edm_820_lines, lot_edm_5130). The frame is turned so the front faces an end (a drawing choice), and that end
     is the front; where the front is not settled, the end facing a street of the highest class, as in Build 2. "Swap the ends" swaps front and rear. */
  if(s.edges&&s.edges.length&&BD.lotSide&&!A.noSide){ const RK=BD.lotSide.RANK, has=(S0,k)=>!!S0[k].street; let S0=BD.lotSide.assign(s.edges,F), rot=false;
    const cls=BD.lotSide.classify?BD.lotSide.classify(s.edges,city,LSD&&LSD.lines):null, f=cls&&cls.f, turn=()=>{ const o=F, ux=-o.uy, uy=o.ux; F={cx:o.cx,cy:o.cy,ux,uy,L:o.W,W:o.L,toW:(a,b)=>[o.cx+a*ux-b*uy,o.cy+a*uy+b*ux],toL:(x,y)=>[(x-o.cx)*ux+(y-o.cy)*uy,-(x-o.cx)*uy+(y-o.cy)*ux]}; S0=BD.lotSide.assign(s.edges,F); rot=true; };
    if(f){ if(Math.abs(-f.nx*F.uy+f.ny*F.ux)>Math.abs(f.nx*F.ux+f.ny*F.uy)) turn(); }
    else if(!has(S0,'u0')&&!has(S0,'u1')&&(has(S0,'v0')||has(S0,'v1'))) turn();
    const r=k=>S0[k].street?1+RK[S0[k].street.cls]:0, any=['u0','u1','v0','v1'].some(k=>S0[k].street);
    side={S:S0,rot,any,autoU1:f?(f.nx*F.ux+f.ny*F.uy)>0:r('u1')>r('u0'),cls,src:s.city==='edm'?['edmRoads2026','edmZoningGeo']:['vanStreets2026','vanTax']}; }
  m.F=F; m.lineCls=side&&side.cls||null; if(side){ const c=f=>({street:f.street?f.street.cls:null,road:f.street?f.street.name:null,d:f.street?Math.round(f.street.d):null,alley:f.alley,nbr:f.nbr.slice()}); m.side={rot:side.rot,autoU1:side.autoU1,any:side.any,u0:c(side.S.u0),u1:c(side.S.u1),v0:c(side.S.v0),v1:c(side.S.v1),src:side.src}; }
  const blds=(s.blds||[]).filter(b=>b.f!==3);
  // height and storeys (6.0 m ground floor, 5.5–6.0 m data-hall floors — engine R.ftf)
  const ftf=BD.eng?BD.eng.R.ftf:{ground:6,up:[5.5,6]};
  const nF=h=>[1+Math.max(0,Math.floor((h-ftf.ground)/ftf.up[1])),1+Math.max(0,Math.floor((h-ftf.ground)/ftf.up[0]))];
  if(A.built==='existing'){
    /* bugfix 4 Nov 2026 (retest rules 2): a leased ground floor in a zone that keeps bulk data storage off the ground floor (I-2 s. 2.2.7, I-3 s. 2.2.11,
       FC-2 s. 2.2.4; registers van_zdb_i2, van_zdb_i3, van_zdb_fc2) is a hard rule and blocks. It was applied only to a whole building, and a ground-floor
       lease picked on another lot carried over unblocked. As for a whole building, not applied where the zone's limits are assumed (Z.assumed). */
    if(A.extent==='part'&&A.floor==='ground'&&Z.ground&&!Z.assumed){ const c=(Z.cl||[]).find(x=>x[0]==='Ground floor'); m.warn.push(`Ground floor: zone ${Z.zone} does not permit bulk data storage at the ground floor, except for entrances (${c?c[2]:'zone schedule'}; register ${Z.srcId}). Lease an upper floor instead.`); }
    const hmax=blds.some(b=>b.h>0)?Math.max(...blds.filter(b=>b.h>0).map(b=>b.h)):4; m.hUnknown=blds.some(b=>!(b.h>0)||b.f===6); /* finding I-06: no recorded height → one storey at 4 m, labelled */ m.existing=true; m.H=hmax; m.nF=[Math.max(1,Math.floor(hmax/4)),Math.max(1,Math.floor(hmax/4))];
    { const big=blds.length?blds.reduce((x,b)=>b.a>x.a?b:x):null; m.foot=big?big.r:null; m.roofH=big?big.h:0; } // the roof the plant sits on is the largest part's own roof, at its own height
    m.feet=blds.map(b=>({r:b.r,h:b.h})); m.footArea=blds.reduce((t,b)=>t+b.a,0); // all parts (sweep M67: these sat inside the comment)
    /* 2 Nov 2026 hard rules (site audit 16): yard plant beside an existing building stays out of the zone's required yards too (zone source: Z.srcId).
       The 61 m building width is not a yard and is not applied to an existing building. */
    if(Z.yards){ const fl=!!(side&&side.autoU1)!==!!A.flip?-1:1, y=yardsOf(m,Z,side,fl); m.yards=y; m.inset=rectW(F,-F.L/2+(fl>0?y.front:y.rear),F.L/2-(fl>0?y.rear:y.front),-F.W/2+y.s0,F.W/2-y.s1); m.yardRect=m.inset; yardLines(m); }
  } else {
    let H=Z.hOutright, hn='outright';
    if(A.hmode==='cond'&&Z.hx&&!A.userH){ H=Z.hx[0]; hn='conditional'; }
    /* 2 Nov 2026 hard rules (J.B.; site audit 2): set storeys never go above the zone's height. They are capped at the most storeys the
       outright limit holds (or your own limit, a rezoning you chose); more height needs the City's approval, which is its own choice ("With approval"). */
    const maxSt=Math.max(1,1+Math.floor((Z.hOutright-ftf.ground)/ftf.up[1]+1e-9)); m.maxStoreys=maxSt; let stU=null;
    if(A.hmode==='storeys'&&A.storeys){ stU=Math.min(A.storeys,maxSt); const want=ftf.ground+(A.storeys-1)*ftf.up[1]; H=ftf.ground+(stU-1)*ftf.up[1]; hn='storeys';
      if(A.storeys>maxSt) m.hClamp={asked:A.storeys,st:maxSt,want,lim:Z.hOutright,src:Z.srcId,text:`${A.storeys} storeys need about ${want.toFixed(1)} m, above the ${Z.hOutright} m ${A.userH?'you set':'this zone allows outright'} (${A.userH?'your limits':`zone ${Z.zone}${Z.assumed?', as if rezoned':''}; register ${Z.srcId}`}). The tool uses ${maxSt} storeys (${H.toFixed(1)} m), the most that height holds.${Z.hx&&!A.userH?` Taller needs the City's approval: choose "With approval" (up to ${Z.hx[1]} m).`:A.userH?'':' Taller needs a rezoning: set your own limits.'}`}; }
    m.H=H; m.hmode=hn; m.nF=stU?[stU,stU]:nF(H);
    // setbacks
    const fl=!!(side&&side.autoU1)!==!!A.flip?-1:1, y=yardsOf(m,Z,side,fl); m.yards=y; /* Build 2: the street end is the front; "Swap the ends" swaps it */
    let u0=-F.L/2+(fl>0?y.front:y.rear), u1=F.L/2-(fl>0?y.rear:y.front), v0=-F.W/2+y.s0, v1=F.W/2-y.s1;
    m.yardRect=Z.yards?rectW(F,u0,u1,v0,v1):null; /* 2 Nov 2026: the line of the required yards, before the 61 m width cap (the fence stands on it) */
    if(y.max){ if(u1-u0>y.max){ const c=(u0+u1)/2; u0=c-y.max/2; u1=c+y.max/2; } if(v1-v0>y.max){ const c=(v0+v1)/2; v0=c-y.max/2; v1=c+y.max/2; } }
    m.inset=rectW(F,u0,u1,v0,v1); m.yardNote=Z.yardsKnown?'':'Yards and setbacks for this zone are not yet read, so the building may cover the whole lot.'; yardLines(m); const YE=m.edgeYards;
    // loading: rear end of the buildable area (the end with the rear yard; Build 2: the end away from the street when a street was found, BE s. 2.120 5.8 keeps loading from between a building and a street)
    // J.B. 20 Oct: once a size is set, loading is counted from the floor that size needs, not the most the zone allows (capped at that)
    const R0=BD.eng&&BD.eng.R, perMW0=R0?(R0.m2PerMW[0]+R0.m2PerMW[1])/2/((R0.hallShare[0]+R0.hallShare[1])/2):0;
    /* 3 Nov 2026 (Architecture Ratios): the data centre's floor-area share, when set for this lot, replaces MW × the per-MW guess (arch.js; register arch_ratios) */
    const dcF=A.dcFloor&&A.dcSite===s.id?A.dcFloor:null;
    const gfaGuess=dcF?Math.min(lotArea*Z.fsr[1],dcF):A.mw&&perMW0?Math.min(lotArea*Z.fsr[1],A.mw*perMW0):lotArea*Z.fsr[1];
    const LN=loadingNeed(city,gfaGuess); m.loadingNeed=LN;
    const rearEnd=fl>0?u1:u0, dir=fl>0?-1:1; let cur=rearEnd;
    if(LN.n&&!A.loadIn&&A.foot!=='existing'){ const dep=LN.len+LN.aisle; const a0=cur, a1=cur+dir*dep; { const q=inscribe(F,ring,a0,a1,v0,v1,false,YE); m.loading=q?rectW(F,q[0],q[1],q[2],q[3]):clipYards(m,rectW(F,Math.min(a0,a1),Math.max(a0,a1),v0,v1)); m.loadV=q?[q[2],q[3]]:[v0,v1]; } m.loadDepth=dep; cur=a1;
      m.loadSpaces=[]; const lv0=m.loadV[0], spanV=m.loadV[1]-m.loadV[0], k=Math.min(LN.n,Math.max(1,Math.floor(spanV/(LN.wid+0.6))));
      for(let i=0;i<k;i++){ const b0=lv0+0.6+i*(LN.wid+0.6); const s0=rearEnd+dir*0, s1=rearEnd+dir*LN.len; m.loadSpaces.push(rectW(F,Math.min(s0,s1),Math.max(s0,s1),b0,b0+LN.wid)); }
      if(k<LN.n) m.warn.push(`Only ${k} of ${LN.n} loading spaces fit across the lot.`); }
    m.plantYardStart=cur; m.dir=dir; m.v=[v0,v1]; m.uFront=fl>0?u0:u1;
    // footprint
    if(A.foot==='existing'&&blds.length){ m.foot=blds.reduce((x,b)=>b.a>x.a?b:x).r; m.footMode='existing'; }
    else { m.footMode=A.foot==='cover'?'cover':'max'; m.uBuild=[cur,m.uFront]; }
    // plant yard reserved later by plant.js (it knows how much room the units need)
  }
  if(BD.plant) BD.plant.place(m); // sizes units, may shorten the footprint to leave a plant yard, places roof and yard units
  if(!m.existing&&!m.foot&&m.uBuild){ let [a0,a1]=m.uBuild; if(m.plantYardDepth) a0=a0+m.dir*m.plantYardDepth;
    if(m.footMode==='cover'&&A.cover){ const want=lotArea*A.cover/100, wv=m.v[1]-m.v[0]; const len=Math.min(Math.abs(a1-a0),want/Math.max(wv,1)); a0=a1+Math.sign(a0-a1||1)*len; }
    const q=inscribe(F,ring,a0,a1,m.v[0],m.v[1],true,m.edgeYards); /* bugfix 4 Nov 2026: grid fallback for the building only */ if(q&&A.dcFloor&&A.dcSite===BD.S.sel.id) m.hallRoom=(q[1]-q[0])*(q[3]-q[2]); /* Architecture Ratios: the footprint the hall can have */ if(q){
      // J.B., 16 Oct: "the server amount changes but the building doesnt shrink" — when a size is set, the building is only as big as that size needs:
      // floor = MW × 460 m² of hall per MW (built Canadian halls 290–630, operator claims) ÷ 0.6 hall share (48–72%), spread over the storeys; centred in the buildable rectangle
      if(A.mw&&m.footMode==='max'&&BD.eng){ const R=BD.eng.R, perMW=(R.m2PerMW[0]+R.m2PerMW[1])/2/((R.hallShare[0]+R.hallShare[1])/2), floors=Math.max(1,m.Z&&m.Z.ground?m.nF[0]-1:m.nF[0]), /* 29 Oct 2026: data floors only where the zone keeps the ground floor for other uses (as the 3D and the hall count already do) */ dcF=A.dcFloor&&A.dcSite===BD.S.sel.id?A.dcFloor:null, need=(dcF||A.mw*perMW)/floors, W=q[1]-q[0], H=q[3]-q[2];
        if(dcF&&need<=W*H+0.01){ /* 3 Nov 2026 (Architecture Ratios): the full width at the back of the buildable area, to the height limit (a drawing choice, not a rule).
            Hall fix (3 Nov 2026, HALLFIX brief): this is now only the fallback ("full"). The hall's footprint options (hallOptions) are tried below, before the roof plant is placed. */
          const du=need/H, frontLo=Math.abs(q[0]-m.uFront)<=Math.abs(q[1]-m.uFront), ua=frontLo?q[1]-du:q[0], ub=frontLo?q[1]:q[0]+du; m.serverFoot=rectW(F,ua,ub,q[2],q[3]); m.sizedTo={mw:A.mw,floor:dcF,perMW:dcF/A.mw,ratio:true};
          m.hallFull=m.serverFoot; m.hallOpts=hallOptions(q,dcF,floors,m,ftf,frontLo); }
        else if(need<W*H*0.98){ const k=Math.sqrt(need/(W*H)), cu=(q[0]+q[1])/2, cv=(q[2]+q[3])/2; let w=W*k, h=H*k; if(h<12){ h=Math.min(H,12); w=need/h; } m.serverFoot=rectW(F,cu-w/2,cu+w/2,cv-h/2,cv+h/2); m.sizedTo=dcF?{mw:A.mw,floor:dcF,perMW:dcF/A.mw,ratio:true}:{mw:A.mw,floor:A.mw*perMW,perMW}; } }
      // capacity is always worked out on the most the lot allows; the drawn floor is only the chosen size (no feedback into "what fits")
      const rr=rectW(F,Math.min(a0,a1),Math.max(a0,a1),m.v[0],m.v[1]); m.foot=clipYards(m,rr); m.footRect=rr; m.simpleMass=true;
      if(!m.serverFoot) m.serverFoot=rectW(F,q[0],q[1],q[2],q[3]); } else { const r=rectW(F,Math.min(a0,a1),Math.max(a0,a1),m.v[0],m.v[1]); m.foot=clipYards(m,r); m.footRect=r; } }
  if(m.foot&&!m.footArea) m.footArea=BD.area(m.foot);
  if(m.foot&&!m.existing&&m.footArea<20) m.warn.push('After setbacks, loading and plant there is almost no room left for a building on this lot.');
  if(BD.plant&&BD.plant.roof){
    /* hall fix (3 Nov 2026): with a ratio set, the hall takes the option Arrange chose (A.hallOpt). With none chosen, the first option, smallest footprint first,
       whose roof holds the roof plant; if none does, the full-width fallback. "full" keeps the fallback (the refuge under the hall). */
    const HO=m.hallOpts&&m.hallOpts.length&&A.hallOpt!=='full'?m.hallOpts:null;
    if(HO){ const P=m.plant, keep=P?{coolRoof:P.coolRoof,short:P.short}:null;
      const tryO=o=>{ if(P) Object.assign(P,keep); setHall(m,o); BD.plant.roof(m); return !(m.plant&&m.plant.miss&&m.plant.miss.length); };
      const pick=HO.find(o=>o.key===A.hallOpt); let ok=false;
      if(pick) tryO(pick); else { for(const o of HO){ if(tryO(o)){ ok=true; break; } } if(!ok){ setHall(m,null); if(P) Object.assign(P,keep); BD.plant.roof(m); } } }
    else BD.plant.roof(m); }
  /* Build 2 (3 Nov 2026; replaces the 2 Nov NFC Table 4.3.13.4.-B reading for rooftop tanks, which was marked ?): CSA B139.1.1:24 6.5.3 (register arch_csa_b139),
     the code the fire code defers to for generator fuel (NFC 4.1.1.1.(3)(b), 4.3.13.6): tanks supplying engines outside above the ground-level storey hold at most
     1,250 L each and 2,500 L on one supply line. The tool keeps each set's share of the fuel in its sub-base tank, one supply line a set (our reading ?), so a set on
     the roof may hold at most 2,500 L. Sets in the yard: B139.1.0 Table 2 distances (plant.js). FM 5-32 2.6.4.3.1 (insurer guidance, not law): not on the roof. */
  if(BD.eng&&m.plant&&m.plant.s&&m.plant.s.g&&(A.genAt||'yard')==='roof'&&A.gens!=='none'){ const R=BD.eng.R, Lf=m.mwSized*R.pue[1]*1000*R.fuelHours*R.fuelLkWh, RT=BD.data.equipment.roofTank, per=Lf/m.plant.s.gNeed;
    m.fuel={L:Lf,per,lim:RT.line,at:'roof'}; if(per>RT.line+0.5){ const mwMax=Math.floor(RT.line/(R.pue[1]*1000*R.fuelHours*R.fuelLkWh)*10)/10; m.warn.push(`Generators on the roof: ${R.fuelHours} h of fuel for ${m.mwSized} MW is about ${fmt(Math.round(per/100)*100)} L in each set's tank; on a roof a tank supplying an engine may hold at most 1,250 L, and 2,500 L on one supply line (CSA B139.1.1 6.5.3; register arch_csa_b139). Put the generators in the yard${mwMax>=0.1?`, or test ${mwMax.toFixed(1)} MW or less`:''}.`); } }
  /* 2 Nov 2026 (J.B.): noise by-law limits are hard rules (engine.js noiseCheck; Van By-law 6555 ss. 1.2, 2.1–2.3; Edm Bylaw 14600 ss. 20, 22).
     Over the night limit at any neighbouring lot even with the quieter unit rating: a set-up problem (blocks fitMax, the flow, the report plans).
     Over only with the standard rating: a note, not a block (m.notes).
     3 Nov 2026: sourced mitigation (engine NMIT): blocked only when no modelled option brings the quieter rating under; an option that does is named as
     required (nc.req, in m.notes, before the flag). */
  m.notes=[]; if(m.yards&&m.yards.unAbut) m.notes.push(`Lot lines: what ${m.yards.unAbut>1?m.yards.unAbut+' of this lot\'s edges abut is':'one of this lot\'s edges abuts is'} not known (no lot or street found, or a parcel with no zone on record), so which setback ${m.yards.unAbut>1?'they have':'it has'} is not known (?); the deepest is applied (see Lot lines).`);
  if(m.yards&&m.yards.unclear) m.notes.push(`Lot lines: which yard ${m.yards.unclear>1?m.yards.unclear+' of this lot\'s edges have':'one of this lot\'s edges has'} is not known (?); the deepest it could have is applied (see Lot lines).`); /* LOTLINES 4 Nov 2026: unclear is flagged, not skipped */
  if(BD.eng&&BD.eng.noiseCheck){ let nc=null; try{ nc=BD.eng.noiseCheck(m); }catch(e){ console.warn(e); } m.noise=nc; if(nc&&nc.block) m.warn.push(nc.block); else { if(nc&&nc.req) m.notes.push(nc.req); if(nc&&nc.flag) m.notes.push(nc.flag); } }
  cache={key,m}; return m; }
/* hall fix (3 Nov 2026, HALLFIX brief): with a ratio set, the hall's footprint options. Its floor (the data centre's share) over k data storeys, k from the most the
   height holds down to 1; storey heights from the register (ground 6.0 m: envelope, van_zdb_i2/i3; hall floors 6.0 m: burlingtonPlans2026 — engine R.ftf).
   Where the zone keeps the ground floor for other uses (Z.ground: I-2, I-3, FC-2) the hall stands on one ground storey that is not data hall, as before.
   Each footprint sits at the back end of the buildable area (inside the yards, behind loading and the plant yard), against one side: along the back
   (long side across the lot) or along the side (long side front to back), from compact (square) to long (1.5, 2, 3, 4 : 1, then full width or length).
   Order: smallest footprint first, then compact before long, back before side. Which one is drawn is chosen in Arrange (arch.js). Where it sits, its
   proportions and the 6 m least side are drawing rules, not code rules. */
function hallOptions(q,D,kMax,m,ftf,frontLo){ const g=m.Z&&m.Z.ground?1:0, Lq=q[1]-q[0], Wq=q[3]-q[2], out=[], seen=new Set(), MIN=6;
  for(let k=Math.max(1,kMax);k>=1;k--){ const fa=D/k; if(fa>Lq*Wq+0.01) break; const top=ftf.ground+(k+g-1)*ftf.up[1]; if(top>m.H+0.01) continue;
    for(const along of ['back','side']) for(const a of [1,1.5,2,3,4,0]){ let du,dv;
      if(along==='back'){ dv=a?Math.min(Wq,Math.sqrt(fa*a)):Wq; du=fa/dv; } else { du=a?Math.min(Lq,Math.sqrt(fa*a)):Lq; dv=fa/du; }
      if(du>Lq+0.01||dv>Wq+0.01||Math.min(du,dv)<MIN-0.01) continue;
      const u=frontLo?[q[1]-du,q[1]]:[q[0],q[0]+du], v=[q[2],q[2]+dv], key=k+':'+u.map(x=>x.toFixed(1)).join(',')+':'+dv.toFixed(1); if(seen.has(key)) continue; seen.add(key);
      out.push({key,k,st:k+g,top,along,a,u,v,fa}); } }
  return out; }
/* Build 2 (3 Nov 2026): the yards on each of the four sides. fl>0: the front is the u0 end. Z.yards gives front, side, rear; Edmonton BE, IM and IH take each
   side's setback from what it faces (lot-side facts), when a street was found. Returns {front,rear,s0,s1,max,by} (by: 'side facts' or 'zone'). */
function yardsOfFrame(m,Z,side,fl){ const y=Z.yards||{front:0,side:0,rear:0}, out={front:y.front,rear:y.rear,s0:y.side,s1:y.side,max:y.max,by:'zone'}; const LSD=BD.data.lotside;
  const SB=m.city==='edm'&&!Z.assumed&&!BD.S.answers.userFSR&&LSD&&LSD.edmSetback[Z.key]; if(!SB||!side||!side.any) return out;
  const res=z=>LSD.edmResidential.part2.includes(z)||LSD.edmResidential.special.includes(z), ind=z=>LSD.edmIndustrial.zones.includes(z);
  const val=f=>{ if(f.street) return Z.key==='BE'&&['collector','local'].includes(f.street.cls)?SB.streetCL:SB.street; if(f.alley) return SB.alley;
    if(f.nbr.some(res)&&SB.res!=null) return SB.res; if(SB.nonInd!=null&&f.nbr.some(z=>!ind(z))) return SB.nonInd; return SB.site; };
  const S0=side.S, fe=fl>0?'u0':'u1', re=fl>0?'u1':'u0'; return {front:val(S0[fe]),rear:val(S0[re]),s0:val(S0.v0),s1:val(S0.v1),max:y.max,by:'side facts',src:((BD.data.raw.lotside||{edmSetback:{}}).edmSetback[Z.key]||{}).src||['?']}; }
/* LOTLINES 4 Nov 2026 (part 2): the yard of every lot line, from its class (lotside.js classify). Vancouver, and Edmonton zones without a by-abutment table:
   front, rear and side from the zone; a flanking line takes the front yard where the schedule says so (I-2 sub-area B, I-3, FC-2; register
   lot_van_exterior_side; tool/data/lotside.json lines.vanFlankAsFront), else the side yard. Edmonton BE, IM, IH, EIB, EIM: by what the line abuts (Table 4.1,
   unchanged from Build 2, now per line); a line abutting nothing found takes the deepest setback of the table (?). An unclear line takes the deepest yard
   it could have (hard rules block). "Swap the ends" swaps front and rear. The frame's four insets are the deepest yard of the lines on that side that
   reach the frame's edge (0.5 m, a drawing tolerance), so a rectangular lot keeps its Build 2 yards exactly; inscribe keeps clear of every line's yard.
   Returns {front,rear,s0,s1,max,by,src,edges:[{i,ax,ay,bx,by,kind,cand,why,d,abuts}]}. */
function yardsOf(m,Z,side,fl){ const E=(BD.S.sel&&BD.S.sel.edges)||[], cls=side&&side.cls; if(!cls||!cls.lines.length||!E.length) return yardsOfFrame(m,Z,side,fl);
  const A=BD.S.answers, LSD=BD.data.lotside, F=m.F, y=Z.yards||{front:0,side:0,rear:0}, FLK=((LSD.lines||{}).vanFlankAsFront||{}).zones||[];
  const SB=m.city==='edm'&&!Z.assumed&&!A.userFSR&&LSD&&LSD.edmSetback[Z.key];
  const dk={front:y.front,rear:y.rear,side:y.side,flank:m.city==='van'&&!Z.assumed&&FLK.includes(Z.vkey)?y.front:y.side};
  const res=z=>LSD.edmResidential.part2.includes(z)||LSD.edmResidential.special.includes(z), ind=z=>LSD.edmIndustrial.zones.includes(z);
  const ab=e=>{ if(e.street) return e.street.cls==='alley'?['alley',SB.alley]:['street',Z.key==='BE'&&['collector','local'].includes(e.street.cls)?SB.streetCL:SB.street];
    if(e.nbr.some(res)&&SB.res!=null) return ['residential lot',SB.res]; if(SB.nonInd!=null&&e.nbr.some(z=>!ind(z))) return ['non-industrial lot',SB.nonInd]; if(e.nbr.length) return ['lot',SB.site];
    /* a parcel with no assessment record may be a road, lane or utility plan, not a titled lot: as with nothing found, every setback of the table is possible */
    const allD=Math.max(...['street','streetCL','alley','site','res','nonInd'].map(k=>SB[k]).filter(v=>typeof v==='number'));
    return [e.lotNoZone?'a parcel with no zone on record (?)':'nothing found (?)',allD,allD!==SB.site]; };
  const sw=k=>A.flip?(k==='front'?'rear':k==='rear'?'front':k):k, out=[], ins={u0:0,u1:0,v0:0,v1:0};
  for(const l of cls.lines) for(const k of l.e){ const e=E[k]; if(!e) continue; const kind=sw(l.kind), cand=l.cand?l.cand.map(sw):null; let d, abuts=null;
    let unA=false; if(SB){ const a=ab(e); abuts=a[0]; d=a[1]; unA=!!a[2]; } else d=kind==='unclear'?Math.max(...cand.map(c=>dk[c]||0)):(dk[kind]||0);
    out.push({i:e.i,ax:e.ax,ay:e.ay,bx:e.bx,by:e.by,kind,cand,why:l.why,d,abuts,unA,len:e.len});
    if(d>0){ const nu=e.nx*F.ux+e.ny*F.uy, nv=-e.nx*F.uy+e.ny*F.ux, side4=Math.abs(nu)>=Math.abs(nv)?(nu<0?'u0':'u1'):(nv<0?'v0':'v1'), p=F.toL(e.ax,e.ay), q=F.toL(e.bx,e.by), T=0.5; /* drawing tolerance */
      const touch={u0:Math.min(p[0],q[0])<=-F.L/2+T,u1:Math.max(p[0],q[0])>=F.L/2-T,v0:Math.min(p[1],q[1])<=-F.W/2+T,v1:Math.max(p[1],q[1])>=F.W/2-T}[side4]; if(touch) ins[side4]=Math.max(ins[side4],d); } }
  const src=SB?(((BD.data.raw.lotside||{edmSetback:{}}).edmSetback[Z.key]||{}).src||['?']).concat(['lot_edm_820_lines']):[Z.srcId].concat(m.city==='van'?['lot_van_s2_lines','lot_van_s10_frontage']:['lot_edm_820_lines','lot_edm_5130']).concat(dk.flank!==y.side||m.city==='van'?['lot_van_exterior_side']:[]);
  return {front:fl>0?ins.u0:ins.u1,rear:fl>0?ins.u1:ins.u0,s0:ins.v0,s1:ins.v1,max:y.max,by:SB?'abutting, per line':'lot lines',src:[...new Set(src.filter(Boolean))],edges:out,unclear:out.filter(e=>e.kind==='unclear').length,unAbut:out.filter(e=>e.unA).length}; }
/* the line of the required yards (each lot line moved in by its own yard; m.yardLine, the fence's line), the buildable area (m.build, inside the 61 m cap too)
   and m.edgeYards for inscribe and the fence check. Where the offset folds (a yard deeper than a notch is wide) the lot clipped to the frame stands in (?). */
function yardLines(m){ const y=m.yards, r=m.ring; m.edgeYards=y&&y.edges?y.edges:null; m.yardOff=null; m.yardLine=null; if(!m.edgeYards||!r) return;
  const n=r.length/2, D=new Array(n).fill(null); for(const e of m.edgeYards) D[e.i]=e.d; for(let i=0;i<n;i++) if(D[i]==null) D[i]=Math.max(D[(i+n-1)%n]||0,D[(i+1)%n]||0);
  const off=offsetRing(r,D); m.yardOffBad=!off; if(!off) return; m.yardOff=off; if(m.yardRect) m.yardLine=clipYards(m,m.yardRect); }
/* a frame rectangle clipped to the lot, and to the line of the yards where a lot line's yard reaches into it (else as before) */
function clipYards(m,rr){ const c=clip(m.ring,rr); if(!m.yardOff||!m.edgeYards) return c; for(const e of m.edgeYards) if(e.d>0&&rectSegDist(rr,e)<e.d-1e-3) return clip(m.yardOff,rr); return c; }
BD.buildArea=M=>M.inset?clipYards(M,M.inset):M.ring; BD.clipYards=clipYards;
function setHall(m,o){ if(!o){ m.serverFoot=m.hallFull; delete m.hallTop; delete m.hallStoreys; delete m.hallData; delete m.hallOpt; m.hallFallback=true; return; }
  m.serverFoot=rectW(m.F,o.u[0],o.u[1],o.v[0],o.v[1]); m.hallTop=o.top; m.hallStoreys=o.st; m.hallData=o.k; m.hallOpt=o.key; m.hallFallback=false; }
BD.siteGeo={rectW,inscribe,clip,frameOf}; BD.model=model; BD.modelReset=()=>{ cache.key=null; fsCache.key=null; };
/* a set-up that does not work (J.B. 20 Oct: "a set up that doesnt work shouldnt ever let you click next"): everything that stops it, in words */
function setupProblems(noFloor){ const m=model(); if(!m||!m.F) return []; const p=(m.warn||[]).slice();
  if(m.plant&&m.plant.miss) p.push(...m.plant.miss.map(x=>x.charAt(0).toUpperCase()+x.slice(1)+'.'));
  if(!noFloor) try{ const A=BD.S.answers; if(A.mw&&BD.eng){ const keep=A.mw; A.mw=null; cache.key=null; const hi=BD.eng.siteFacts().mw[1]; A.mw=keep; cache.key=null; model();
    if(keep>hi+0.05) p.push(`${keep} MW of servers need more floor than this building can hold (up to ${hi.toFixed(1)} MW).`); } }catch(e){}
  return p; }
/* the largest size at which everything fits: servers, cooling plant, generators, loading (J.B. 20 Oct: worked examples open at it; "as large as fits" means it).
   Binary search to 0.1 MW between 0.1 and the most the floor holds; assumes a smaller size never needs more room. Returns null if nothing fits. */
function fitMax(){ const A=BD.S.answers, keep=A.mw; A.mw=null; cache.key=null; let hi=0; try{ hi=BD.eng.siteFacts().mw[1]; }catch(e){}
  const ok=mw=>{ A.mw=mw; cache.key=null; return !setupProblems(true).length; };
  let lo=0, best=null, top=Math.floor((hi||0)*10);
  /* 2 Nov 2026 hard rules: with generators on the roof no size above the fuel limit passes (model(); Build 2: CSA B139.1.1 6.5.3), so the search starts there */
  if(BD.eng&&A.gens!=='none'&&(A.genAt||'yard')==='roof'){ const R=BD.eng.R; top=Math.min(top,Math.floor(BD.data.equipment.roofTank.line/(R.pue[1]*1000*R.fuelHours*R.fuelLkWh)*10)); } /* Build 2: B139.1.1 6.5.3, one set (register arch_csa_b139) */
  if(top>=1&&ok(top/10)) best=top/10; else { let a=1, b=top-1; while(a<=b){ const mid=(a+b)>>1; if(ok(mid/10)){ best=mid/10; a=mid+1; } else b=mid-1; } }
  A.mw=keep; cache.key=null; return best; }
/* bugfix 4 Nov 2026 (retest resident 1–3): fitMax's search assumes a smaller size never needs more room. That does not hold: once a size is set the
   building shrinks to it, so a smaller size has a smaller roof (CLARK: 0.1–0.5 MW fail, 0.75–1.9 MW pass). The sizes that pass: each size-slider step
   below fitMax, and fitMax itself, each checked against every hard rule (setupProblems). {ok, min, max}; ok is empty when nothing fits. No new figure. */
let fsCache={key:null,v:null};
function fitSizes(){ const A=BD.S.answers, keep=A.mw, B=Object.assign({},A); delete B.mw; delete B.mwPick; delete B.mwSite; delete B.resNote;
  const key=JSON.stringify([BD.S.sel&&BD.S.sel.city,BD.S.sel&&BD.S.sel.id,B]); if(fsCache.key===key) return fsCache.v;
  const fm=fitMax(), out={ok:[],min:null,max:null};
  if(fm!=null){ const ST=(BD.eng&&BD.eng.R.steps)||[]; for(const v of ST.filter(s=>s<fm-1e-9).concat([fm])){ A.mw=v; cache.key=null; if(!setupProblems(true).length) out.ok.push(v); }
    A.mw=keep; cache.key=null; }
  if(out.ok.length){ out.min=out.ok[0]; out.max=out.ok[out.ok.length-1]; } fsCache={key,v:out}; return out; }
/* does this size pass every hard rule, with the other answers as they are? */
function sizePasses(v){ const A=BD.S.answers, keep=A.mw; A.mw=v; cache.key=null; let ok=false; try{ ok=!setupProblems().length; }finally{ A.mw=keep; cache.key=null; } return ok; }
/* the passing size for a wanted one: itself if it passes, else the largest passing size below it, else the smallest that passes; null if none passes */
function fitNear(want){ if(want!=null&&sizePasses(want)) return want; const S=fitSizes(); if(!S.ok.length) return null; const below=S.ok.filter(v=>v<=(want||0)+1e-9); return below.length?below[below.length-1]:S.ok[0]; }
BD.setupProblems=setupProblems; BD.fitMax=fitMax; BD.fitSizes=fitSizes; BD.fitNear=fitNear; BD.sizePasses=sizePasses;
/* bugfix 4 Nov 2026 (retest rules 1, V339): the required yards are set in from the lot's bounding rectangle, so along an angled lot line the line of the
   yards (the lot clipped to that rectangle) runs inside a required yard. Each lot edge takes the yard of the side it faces in the tool's own frame (front,
   rear, sides: m.yards, as the 3 Nov rules sweep checked), and a point is in that yard when it is nearer the edge than the yard's depth, less 0.3 m
   (a drawing tolerance). Which edges of a notch are rear or side lot lines is our reading (?). */
function yardEdges(m){ if(m.edgeYards) return m.edgeYards.filter(e=>e.d>0); /* LOTLINES 4 Nov 2026: each lot line's own class and yard */ const A=BD.S.answers, F=m.F, y=m.yards, r=m.ring; if(!F||!y||!r) return []; const fl=(!!(m.side&&m.side.autoU1))!==(!!A.flip)?-1:1, E=[];
  for(let i=0;i<r.length;i+=2){ const j=(i+2)%r.length, ax=r[i], ay=r[i+1], bx=r[j], by=r[j+1], L=Math.hypot(bx-ax,by-ay); if(L<0.5) continue;
    const mx=(ax+bx)/2, my=(ay+by)/2; let nx=-(by-ay)/L, ny=(bx-ax)/L; if(BD.pip(mx+nx*0.3,my+ny*0.3,r)){ nx=-nx; ny=-ny; }
    const nu=nx*F.ux+ny*F.uy, nv=-nx*F.uy+ny*F.ux; let kind, d; if(Math.abs(nu)>=Math.abs(nv)){ kind=(nu<0)===(fl>0)?'front':'rear'; d=y[kind]; } else { kind='side'; d=nv<0?y.s0:y.s1; }
    if(d>0) E.push({ax,ay,bx,by,kind,d}); }
  return E; }
function segDist(px,py,e){ const dx=e.bx-e.ax, dy=e.by-e.ay, L2=dx*dx+dy*dy; let t=L2?((px-e.ax)*dx+(py-e.ay)*dy)/L2:0; t=Math.max(0,Math.min(1,t)); return Math.hypot(px-(e.ax+t*dx),py-(e.ay+t*dy)); }
/* a ring (the fence line) cut into pieces of at most 1 m, each marked with the required yard it stands in, if any */
function yardRuns(m,R){ const out=[]; if(!m||!R) return out; const E=yardEdges(m);
  for(let i=0;i<R.length;i+=2){ const j=(i+2)%R.length, ax=R[i], ay=R[i+1], bx=R[j], by=R[j+1], L=Math.hypot(bx-ax,by-ay), n=Math.max(1,Math.ceil(L));
    for(let k=0;k<n;k++){ const x0=ax+(bx-ax)*k/n, y0=ay+(by-ay)*k/n, x1=ax+(bx-ax)*(k+1)/n, y1=ay+(by-ay)*(k+1)/n, cx=(x0+x1)/2, cy=(y0+y1)/2;
      let e=null; for(const q of E) if(segDist(cx,cy,q)<q.d-0.3){ e=q; break; } out.push({x0,y0,x1,y1,len:L/n,yard:e?e.kind:null}); } }
  return out; }
BD.yardRuns=yardRuns;

/* ---------- the drawer (decision A, 16 Oct): over the map, beside the panel ---------- */
const css=document.createElement('style'); css.textContent=`
#drawer{position:absolute;top:0;left:0;bottom:0;width:min(440px,92%);background:var(--panel);border-right:1px solid var(--line-2);z-index:8;overflow:auto;padding:16px 18px 28px;box-shadow:var(--shadow)}
#drawer[hidden]{display:none}
#drawer .dx{float:right;background:transparent;border:1px solid var(--line-2);border-radius:6px;padding:2px 9px;cursor:pointer;color:var(--muted);font-size:12.5px}
#drawer h2{font-size:18px;font-weight:400;margin:4px 0 6px;line-height:1.3}
#drawer h3{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-weight:600;margin:18px 0 6px;padding-top:12px;border-top:1px solid var(--line)}
.steps{display:flex;gap:4px;margin:10px 0 12px}.steps button{flex:1;height:4px;border:0;border-radius:2px;background:var(--line-2);padding:0;cursor:pointer}.steps button.on{background:var(--accent)}.steps button.done{background:var(--muted)}
.choice{display:grid;gap:6px;margin:8px 0}.choice button{text-align:left;background:var(--bg);border:1px solid var(--line-2);border-radius:6px;padding:8px 10px;cursor:pointer;color:var(--fg);font:inherit;font-size:13px}
.choice button[aria-pressed="true"]{border-color:var(--accent)}.choice button small{display:block;color:var(--muted);font-size:12px;margin-top:2px}.choice button .def{float:right;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.cl{width:100%;border-collapse:collapse;font-size:12.5px;margin-top:6px}.cl td{border-top:1px solid var(--line);padding:5px 6px 5px 0;vertical-align:top}.cl td:first-child{color:var(--muted);width:92px}.cl td small{display:block;color:var(--faint);font-size:11px}
.warnbox{border:1px solid #CC746C;border-radius:6px;padding:8px 10px;font-size:12.5px;margin:8px 0;color:var(--accent-2)}
.navb{display:flex;gap:8px;margin-top:18px;align-items:center}.navb button{border-radius:6px;padding:7px 14px;cursor:pointer;font:inherit}.navb .pri{background:var(--fg);color:var(--on-ink);border:0;font-weight:600}.navb .sec{background:transparent;border:1px solid var(--line-2);color:var(--fg)}
.numin{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px}.numin label{font-size:12.5px;color:var(--muted)}.numin input{width:84px;margin-left:6px;background:var(--bg);border:1px solid var(--line-2);border-radius:4px;padding:3px 6px;color:var(--fg)}
.sumrow{display:grid;grid-template-columns:88px 1fr auto;gap:8px;font-size:12.5px;padding:5px 0;border-top:1px solid var(--line);align-items:baseline}.sumrow span:first-child{color:var(--muted)}.sumrow a{font-size:12px}
.live{border:1px solid var(--line-2);border-radius:6px;padding:8px 10px;margin:10px 0;font-size:12.5px}.live b{font-weight:400;font-size:16px}
`; document.head.appendChild(css);
const dr=document.createElement('div'); dr.id='drawer'; dr.hidden=true; dr.setAttribute('role','dialog'); dr.setAttribute('aria-label','Card');
document.getElementById('map').appendChild(dr); for(const ev of ['pointerdown','wheel']) dr.addEventListener(ev,e=>e.stopPropagation());
BD.drawer={ open(html,wire){ dr.innerHTML=`<button class="dx" id="dxc" title="Close (Esc)">×</button>`+html; dr.hidden=false; dr.scrollTop=0; $('#dxc').onclick=()=>BD.drawer.close(); if(wire) wire(dr); },
  close(){ dr.hidden=true; dr.innerHTML=''; if(BD.onDrawerClose){ const f=BD.onDrawerClose; BD.onDrawerClose=null; f(); } }, el:dr, isOpen:()=>!dr.hidden };
document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&!dr.hidden){ e.stopPropagation(); BD.drawer.close(); } },true);

/* ---------- the five setup cards ---------- */
const STEPS=['What is being built','Footprint','Height','Cooling and where its plant goes','Standby power'];
function ch(name,opts,val){ return `<div class="choice" data-q="${name}">${opts.map(o=>`<button data-v="${o.v}" aria-pressed="${String(o.v)===String(val)}">${o.def?'<span class="def">default</span>':''}${esc(o.t)}${o.s?`<small>${o.s}</small>`:''}</button>`).join('')}</div>`; }
/* Build 2: what each side of the lot faces, in words (lot-side facts) */
function sideHTML(m){ const S=m.side; if(!S) return ''; const fl=(S.autoU1)!==!!BD.S.answers.flip?-1:1, nm={u0:fl>0?'Front':'Rear',u1:fl>0?'Rear':'Front',v0:'Side',v1:'Other side'};
  const t=f=>f.street?`${esc(f.street==='unclassified'?'a street (class ?)':(/^[aeiou]/.test(f.street)?'an ':'a ')+f.street+' street')} (City class "${esc(f.road||'?')}", centreline about ${f.d} m out)`:f.alley?'an alley or lane':f.nbr.length?(f.nbr.length>1?'lots':'a lot')+' zoned '+esc(f.nbr.join(', ')):'nothing in the street or zoning files (?)';
  const y=m.yards, yv={u0:fl>0?y&&y.front:y&&y.rear,u1:fl>0?y&&y.rear:y&&y.front,v0:y&&y.s0,v1:y&&y.s1};
  return `<table class="cl">${['u0','u1','v0','v1'].map(k=>`<tr><td>${nm[k]}</td><td>faces ${t(S[k])}${y&&y.by==='side facts'?` · setback ${yv[k]} m`:''}</td></tr>`).join('')}</table>${S.rot?'<p class="sub">The lot is turned so the street side is an end (a drawing choice).</p>':''}${y&&y.by==='side facts'?`<p class="src">Setbacks by what each side faces: ${esc(m.Z.key)} Table 4.1 (register ${esc(y.src.join(', '))}). Street class from the City's road file (register ${esc(S.src[0])}); neighbours' zones from the zoning map (register ${esc(S.src[1])}). Which zones count as residential: Bylaw 20001 Part 2 and Special Area zones named residential, row housing or apartment (the latter our reading ?).</p>`:''}`; }
/* LOTLINES 4 Nov 2026: each lot line's class, why, and its yard; unclear lines flagged */
const KN={front:'Front',flank:'Flanking side',rear:'Rear',side:'Side',unclear:'Unclear'};
function linesHTML(m){ const E=m.edgeYards; if(!E||!E.length) return ''; const L=[]; let cur=null;
  for(const e of E){ if(cur&&cur.why===e.why&&cur.kind===e.kind&&cur.unA===!!e.unA){ cur.len+=e.len; cur.d=Math.max(cur.d,e.d); if(e.abuts&&!cur.ab.includes(e.abuts)) cur.ab.push(e.abuts); } else { cur={kind:e.kind,cand:e.cand,why:e.why,len:e.len,d:e.d,ab:e.abuts?[e.abuts]:[],unA:!!e.unA}; L.push(cur); } }
  const un=L.filter(l=>l.kind==='unclear'), y=m.yards;
  return `<h3>Lot lines</h3><table class="cl">${L.map(l=>`<tr><td>${KN[l.kind]||esc(l.kind)}</td><td>${fmt(Math.round(l.len))} m · yard ${l.d} m${l.ab.length?' (abuts '+esc(l.ab.join(', '))+')':''}<small>${esc(l.why)}${l.kind==='unclear'?` · <span class="k">which yard this edge has is not known (?)</span>: could be ${esc((l.cand||[]).map(c=>(KN[c]||c).toLowerCase()).join(' or '))}; the deepest is applied`:''}${l.unA?` · <span class="k">which setback this edge has is not known (?)</span>: what it abuts is not known; the deepest is applied`:''}</small></td></tr>`).join('')}</table>
    <p class="src">Classes by the by-laws' definitions (register ${esc((y&&y.src||[]).join(', '))}); tests in checks/research_arch_v1/lotlines.md.${m.yardOffBad?' The line of the yards folds on this lot (a yard deeper than a notch is wide), so it is drawn approximately; the building is still kept out of every yard (?).':''}${un.length?` ${un.length} line${un.length>1?'s':''} unclear.`:''}</p>`; }
function clauses(Z){ return `<table class="cl">${Z.cl.map(c=>`<tr><td>${esc(c[0])}</td><td>${esc(c[1])}<small>${esc(c[2])}</small></td></tr>`).join('')}</table>`; }
function setDefaults(){ const A=BD.S.answers; const d={foot:'max',cover:70,hmode:'out',plantAt:'roof',outside:'dry',inside:'air',spares:'n1',gens:'yes',genAt:'yard',genSpares:'n1'}; for(const k in d) if(A[k]==null) A[k]=d[k]; }
function liveBox(){ const m=model(); if(!m||!BD.eng) return ''; const f=BD.eng.siteFacts(); const P=m.plant;
  return `<div class="live"><div class="kind">Updates as you choose</div>${draft('')}<b>${BD.eng.rng(f.mw[0],f.mw[1],'MW')}</b> of servers on floor space alone · ${BD.eng.rng(f.gross[0],f.gross[1],'m²')} floor area${m.footArea?` · footprint ${fmt(m.footArea)} m²`:''}${m.nF?` · ${m.nF[0]===m.nF[1]?m.nF[0]:m.nF[0]+'–'+m.nF[1]} storeys`:''}${P&&P.short?`<div class="draft" style="margin-top:4px">${esc(P.short)}</div>`:''}</div>`; }
function card(step){
  setDefaults(); const S=BD.S, A=S.answers, m=model(); if(!m) return; const Z=m.Z, hb=(S.sel.blds||[]).filter(b=>b.f!==3).length>0;
  A.step=step;
  let h=`<div class="kind">Set up the site · step ${step} of 5</div><div class="steps">${STEPS.map((t,i)=>`<button data-step="${i+1}" class="${i+1===step?'on':i+1<step?'done':''}" title="${esc(t)}" aria-label="Step ${i+1}: ${esc(t)}"></button>`).join('')}</div><h2>${esc(STEPS[step-1])}</h2>`;
  if(step===1){
    h+=`<p class="sub">${draft('A new building can be sized to the zone; an existing one is what it is.')}</p>${ch('built',[{v:'new',t:'New building',def:true,s:'sized to the zone\'s floor area, height and setbacks'},{v:'existing',t:'Existing building',s:hb?'the building on the lot now, as measured':'no building recorded on this lot'}],A.built)}
    <h3>Whole building or part</h3>${ch('extent',[{v:'whole',t:'Whole building',def:true},{v:'part',t:'Part of one',s:A.built==='new'?'the options compare basement, ground, upper floor and roof':'choose the floor below'}],A.extent)}
    ${A.built==='existing'&&A.extent==='part'?`<h3>Which floor</h3>${ch('floor',[{v:'basement',t:'Basement'},{v:'ground',t:'Ground'},{v:'upper',t:'Upper floor'},{v:'roof',t:'Roof'}],A.floor)}`:''}`;
  }
  if(step===2){
    if(A.built==='existing'){ h+=`<p class="sub">The existing building: ${fmt(m.footArea)} m² in plan.</p><p class="sub">${draft('Plant that does not fit inside or on the roof goes in the yard (step 4).')}</p>`; }
    else { const LN=m.loadingNeed;
      h+=`<p class="sub">${draft('How much of the lot the building covers. The default takes the most the zone allows, less its setbacks and a loading strip.')}</p>
      ${ch('foot',[{v:'max',t:'Most the zone allows',def:true,s:'lot less setbacks, less loading'+(A.plantAt!=='roof'?', less the plant yard':'')},{v:'existing',t:'Match the existing building',s:hb?'same footprint as what stands there':'no building recorded'},{v:'cover',t:'Set the coverage',s:'a share of the lot'}],A.foot)}
      ${A.foot==='cover'?`<div class="numin"><label>Coverage <input type="range" id="cov" min="20" max="100" step="5" value="${A.cover}"> <b id="covv">${A.cover}%</b></label></div>`:''}
      ${Z.key==='I-2'&&!Z.assumed?`<h3>Sub-area</h3><p class="sub">Part of the False Creek Flats (bounded by Prior St, Clark Dr, Great Northern Way and Main St) is split into sub-areas A and B, with different limits (I-2 s. 1.1, Map 1). The tool does not map them; check Map 1 of the I-2 District Schedule.</p>${ch('subB',[{v:'',t:'Not in sub-area B',def:true,s:'rear yard 3.1 m, no front yard, 30.5 m with approval'},{v:'1',t:'In sub-area B',s:'yards 0.6 / 7.6 / 3.1 m, building at most 61 m wide and deep, 36.5 m and FSR 4.0 with approval'}],A.subB||'')}`:''}
      <h3>Setbacks</h3>${m.yardNote?`<div class="warnbox">${esc(m.yardNote)}</div>`:''}${clauses({cl:Z.cl.filter(c=>/Yards|Setbacks/.test(c[0]))})}
      ${sideHTML(m)}${linesHTML(m)}<p class="sub" style="margin-top:6px">${m.side&&m.side.any?'The street end is the front; the rear yard and loading go to the other end.':'No street was found beside this lot in the City\'s street file, so which end faces the street is not known; the rear yard and loading are put at one end.'} <a href="#" id="flip">Swap the ends</a>${A.flip?' (swapped)':''}</p>
      <h3>Loading</h3><p class="sub">${esc(LN.basis)}</p>${ch('loadIn',[{v:'',t:'Outside, at the rear',def:true,s:`a strip ${(LN.len+LN.aisle).toFixed(1)} m deep: space plus aisle`},{v:'1',t:'Inside the building',s:'a loading bay on the ground floor; no strip'}],A.loadIn||'')}`; }
  }
  if(step===3){
    if(A.built==='existing') h+=`<p class="sub">The existing building is ${m.H.toFixed(1)} m tall (${S.city==='van'?'City LiDAR 2022':'City 3D buildings or estimate'}), about ${m.nF[0]} storey${m.nF[0]>1?'s':''} at 4 m.${m.hUnknown?' <span class="draft">Some parts have no measured height; those are taken as one storey at 4 m (an assumption ?).</span>':''}</p>`;
    else {
      h+=`<p class="sub">${draft('Data-hall floors are tall: 5.5–6.0 m floor to floor, with a 6.0 m ground floor.')}</p>
      ${ch('hmode',[{v:'out',t:`Outright: ${Z.hOutright} m`,def:true,s:'what the zone allows without the City\'s discretion'}].concat(Z.hx&&!A.userH?[{v:'cond',t:`With the City's approval: ${Z.hx[0]===Z.hx[1]?Z.hx[0]:Z.hx[0]+'–'+Z.hx[1]} m`,s:'the City may allow this; the tool uses '+Z.hx[0]+' m'}]:[]).concat([{v:'storeys',t:'Set the storeys',s:'height follows from 6.0 m + 6.0 m a storey'}]),A.hmode)}
      ${A.hmode==='storeys'?`<div class="numin"><label>Storeys <input type="number" id="sto" min="1" max="${m.maxStoreys||12}" value="${A.storeys||2}"></label></div>${m.hClamp?`<div class="warnbox">${esc(m.hClamp.text)}</div>`:''}`:''}
      <p class="sub">Gives about ${m.nF[0]===m.nF[1]?m.nF[0]:m.nF[0]+'–'+m.nF[1]} storeys in ${m.H.toFixed(1)} m.</p>
      <h3>The zone's limits</h3>${Z.warn?`<div class="warnbox">${Z.warn}</div>`:''}${clauses(Z)}
      <h3>Your own limits</h3><p class="sub">If you know this lot's limits differ (a rezoning, a CD-1, a variance), set them here. They replace the zone's figures above.</p>
      <div class="numin"><label>Floor-space ratio <input type="number" id="ufsr" step="0.1" min="0.1" max="12" value="${A.userFSR||''}" placeholder="${Z.base.fsr[1]}"></label><label>Height, m <input type="number" id="uh" step="0.5" min="4" max="200" value="${A.userH||''}" placeholder="${Z.base.h}"></label></div>`; }
  }
  if(step===4){ const P=m.plant||{};
    h+=`<p class="sub">${draft('A data centre must reject almost all the electricity it uses as heat. The default is the simplest: air inside, dry coolers outside, on the roof. Each choice changes heat, water, sound and space; the Cooling card compares them.')}</p>
    <h3>Inside: how servers are cooled</h3>${ch('inside',[{v:'air',t:'Air',def:true,s:'fans and cooling coils; heat leaves at about 25–35 °C'},{v:'plate',t:'Liquid to the chip (cold plate)',s:'57–75% of heat captured into liquid (LBNL); warmer, easier to reuse'},{v:'immersion',t:'Immersion',s:'servers in a fluid bath; capture share not yet verified'}],A.inside)}
    <h3>Outside: how heat leaves</h3>${ch('outside',[{v:'dry',t:'Dry coolers',def:true,s:'no water; fans and roof space; with air cooling, air-cooled chillers with free-cooling coils instead, since dry coolers cannot make water cold enough in summer'},{v:'towers',t:'Cooling towers',s:'evaporate water; smaller; operating permit and Legionella rules'},{v:'hybrid',t:'Hybrid (adiabatic) coolers',s:'dry most of the year, water on hot days; in Vancouver treated as a cooling tower'}],A.outside)}
    <h3>Where the plant goes</h3>${ch('plantAt',[{v:'roof',t:'Roof',def:true},{v:'yard',t:'Yard',s:'the building gets shorter to leave room'},{v:'split',t:'Split',s:'half on the roof, half in the yard'}],A.plantAt)}
    <h3>Spare units</h3>${ch('spares',[{v:'n',t:'None (N)',s:'like Uptime Tier I: basic capacity; shuts down for maintenance'},{v:'n1',t:'One spare (N+1)',def:true,s:'like Tier II–III: redundant capacity components'},{v:'2n',t:'Double (2N)',s:'like Tier IV: independent systems'}],A.spares)}<p class="src">Spares: Uptime Institute describes Tier II and above as having "redundant capacity components" for cooling and heat rejection, and Tier IV as "independent and physically isolated systems". It does not use the terms N+1 or 2N; reading one spare as Tier II–III and double as Tier IV is Claude's.</p>
    ${P.lines?`<h3>Sized from the load</h3><ul class="lim">${P.lines.map(l=>`<li>${l}</li>`).join('')}</ul>`:''}`;
  }
  if(step===5){ const P=m.plant||{};
    h+=`<p class="sub">${draft('Standby generators carry the load if the grid fails; batteries (UPS) carry it for the minutes until they start. Shown as generic equipment only.')}</p>
    ${ch('gens',[{v:'yes',t:'Standby generators',def:true,s:'sized to the peak load'},{v:'none',t:'None',s:'relies on the grid and UPS batteries only'}],A.gens)}
    ${A.gens!=='none'?`<h3>Where</h3>${ch('genAt',[{v:'yard',t:'Yard',def:true},{v:'roof',t:'Roof',s:'done on a Paris-region conversion (DRIEE 2010); heavy'}],A.genAt)}<h3>Spares</h3>${ch('genSpares',[{v:'n',t:'None (N)'},{v:'n1',t:'One spare (N+1)',def:true},{v:'2n',t:'Double (2N)'}],A.genSpares)}`:''}
    <p class="sub">UPS batteries sit inside, in the electrical rooms (about 2.4–3.3 m² per MW for the UPS plus 1.0–1.8 m² for lithium-ion batteries; manufacturer claims, register component_space).</p>${''/* 2 Nov 2026 fix pass: D-ups (register figures of 29 Oct; grid battery struck) */}
    ${P.genLines?`<h3>Sized from the load</h3><ul class="lim">${P.genLines.map(l=>`<li>${l}</li>`).join('')}</ul>`:''}`;
  }
  if(m.warn.length) h+=m.warn.map(w=>`<div class="warnbox">${esc(w)}</div>`).join('');
  if(m.notes&&m.notes.length) h+=m.notes.map(w=>`<p class="nflag" data-tl="1">${esc(w)}</p>`).join(''); /* noise flag (2 Nov 2026): a note, not a block */
  h+=liveBox();
  h+=`<div class="navb">${step>1?'<button class="sec" id="sb">← Back</button>':''}<button class="pri" id="sn">${step<5?'Next →':'What fits here →'}</button><span class="sub">or keep the defaults</span></div>`;
  BD.drawer.open(h,el=>{
    el.querySelectorAll('.choice[data-q] button').forEach(b=>b.onclick=()=>{ A[b.parentNode.dataset.q]=b.dataset.v; changed(step); });
    el.querySelectorAll('.steps button').forEach(b=>b.onclick=()=>card(+b.dataset.step));
    const cov=$('#cov'); if(cov){ cov.oninput=()=>{ $('#covv').textContent=cov.value+'%'; }; cov.onchange=()=>{ A.cover=+cov.value; changed(step); }; }
    const sto=$('#sto'); if(sto) sto.onchange=()=>{ A.storeys=Math.max(1,Math.min(12,+sto.value||1)); changed(step); };
    const uf=$('#ufsr'); if(uf) uf.onchange=()=>{ A.userFSR=uf.value?+uf.value:null; changed(step); };
    const uh=$('#uh'); if(uh) uh.onchange=()=>{ A.userH=uh.value?+uh.value:null; changed(step); };
    const fl=$('#flip'); if(fl) fl.onclick=e=>{ e.preventDefault(); A.flip=!A.flip; changed(step); };
    const sb=$('#sb'); if(sb) sb.onclick=()=>card(step-1);
    $('#sn').onclick=()=>{ if(step<5) card(step+1); else { A.setupDone=true; BD.drawer.close(); if(BD.flow&&BD.flow.on) BD.flow.next(); else BD.fitsView(); } };
  });
  BD.showModel&&BD.showModel();
}
function changed(step){ const A=BD.S.answers; A.mw=null; if(A.built==='existing'&&A.foot==='max') {} BD.modelReset(); card(step); if(BD.S.view2==='fits') BD.fitsView(); else BD.card(); }
/* Build 2: the lot-side facts and "Swap the ends" for the decision card (decide.js, footprint) */
function sideBox(){ const m=model(); if(!m||!m.F) return ''; const A=BD.S.answers;
  return `<div class="dside"><h3>What each side faces</h3>${sideHTML(m)}${linesHTML(m)}<p class="sub">${m.side&&m.side.any?'The street end is the front; the rear yard and loading go to the other end.':'No street was found beside this lot in the City\'s street file, so which end faces the street is not known; the rear yard and loading are put at one end.'} <a href="#" id="flip">Swap the ends</a>${A.flip?' (swapped)':''}</p>${A.flip&&m.side&&m.side.any?`<div class="warnbox">Swapped: the rear yard and loading now face the street.${m.city==='edm'&&m.Z&&m.Z.key==='BE'?' BE s. 2.120 5.8 keeps loading from between a building and a street (register arch_hb_edmBE).':''}</div>`:''}</div>`; }
/* Build 2 (part 7): the zone's sub-area, where the limits differ by sub-area and the tool does not map them (I-2 B; FC-2 A–E; I-3 note) */
function subBox(){ const m=model(); if(!m||!m.Z||m.Z.assumed||m.city!=='van') return ''; const A=BD.S.answers, k=m.Z.key;
  if(k==='FC-2'){ const o=[['','Not chosen'],['A','A'],['B','B'],['C1','C1'],['C2','C2'],['D','D'],['E','E']];
    return `<div class="dside"><h3>FC-2 sub-area</h3><p class="sub">Floor area and height differ by sub-area (FC-2 ss. 3.1–3.4; register van_zdb_fc2). The tool does not map them: check the FC-2 map.</p><label class="dnum">Sub-area <select data-zsub="fcSub">${o.map(([v,t])=>`<option value="${v}"${(A.fcSub||'')===v?' selected':''}>${t}</option>`).join('')}</select></label></div>`; }
  if(k==='I-2') return `<div class="dside"><h3>I-2 sub-area</h3><p class="sub">Sub-area B has its own yards and limits (I-2 s. 3.2; register van_zdb_i2). The tool does not map it: check Map 1.</p><label class="dnum">Sub-area <select data-zsub="subB"><option value=""${A.subB?'':' selected'}>Not in sub-area B</option><option value="1"${A.subB?' selected':''}>In sub-area B</option></select></label></div>`;
  if(k==='I-3') return `<div class="dside"><p class="sub">I-3: a data centre is allowed only in sub-area A (I-3 s. 2.1; register van_zdb_i3). The tool does not map the sub-areas: check the I-3 map.</p></div>`;
  return ''; }
BD.setup={card,model,STEPS,start:()=>card(1),sideBox,subBox};

/* the site card's last section: a summary of the five cards, each with Change › */
BD.setupHTML=function(st){ setDefaults(); const A=BD.S.answers, m=model(); if(!m) return '';
  const lab={built:{new:'New building',existing:'Existing building'},extent:{whole:'whole',part:'part'},foot:{max:'most the zone allows',existing:'matches the existing building',cover:'coverage '+A.cover+'%'},outside:{dry:'dry coolers',towers:'cooling towers',hybrid:'hybrid coolers'},inside:{air:'air',plate:'liquid to the chip',immersion:'immersion'},plantAt:{roof:'on the roof',yard:'in the yard',split:'roof and yard'}};
  const rows=[[1,'Building',`${lab.built[A.built]}, ${lab.extent[A.extent]}${A.extent==='part'&&A.floor?' ('+A.floor+')':''}`],
   [2,'Footprint',A.built==='existing'?`${fmt(m.footArea)} m² (existing)`:`${fmt(m.footArea||0)} m², ${lab.foot[A.foot]}`],
   [3,'Height',A.built==='existing'?`${(m.H||0).toFixed(1)} m (existing)`:`${(m.H||0).toFixed(1)} m, ${m.nF[0]===m.nF[1]?m.nF[0]:m.nF[0]+'–'+m.nF[1]} storeys${A.userH||A.userFSR?' (your limits)':''}`],
   [4,'Cooling',`${lab.inside[A.inside]} inside; ${A.outside==='dry'&&BD.dryName?BD.dryName():lab.outside[A.outside]} ${lab.plantAt[A.plantAt]}`],
   [5,'Standby',A.gens==='none'?'no generators':`generators in the ${A.genAt}`]];
  return `<h3>The site as set up</h3>${m.Z.warn?`<div class="warnbox">${m.Z.warn}</div>`:''}${rows.map(r=>`<div class="sumrow"><span>${r[1]}</span><span>${esc(r[2])}</span><a href="#" data-setup="${r[0]}">Change ›</a></div>`).join('')}
  <div class="next"><button id="fits">What fits here →</button><button id="setup1" style="background:transparent;border:1px solid var(--line-2);color:var(--fg)">Set up step by step</button></div>
  <div class="draftnote">Labelled defaults are used until you change them. </div>`; };
BD.setupWire=function(){ document.querySelectorAll('#side [data-setup]').forEach(a=>a.onclick=e=>{ e.preventDefault(); BD.setup.card(+a.dataset.setup); }); const s1=$('#setup1'); if(s1) s1.onclick=()=>BD.setup.start(); };
})();
