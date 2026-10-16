/* Beyond Data — site setup (v19, 16 Oct 2026): zone limits with their clauses, the footprint the numbers assume, and five setup cards
   shown in a drawer over the map after a parcel is picked (J.B., 16 Oct: "5 cards in sequence"). The 3D view draws the building these
   cards describe; What fits reads the same model. Wording is Claude's draft for J.B. (draft colour). */
(function(){
'use strict';
const BD=window.BD; const {$,esc,fmt}=BD;
const draft=t=>`<span class="draft">${t}</span>`;

/* ---------- zone limits, with the clause each number comes from ---------- */
const ZV={
 'I-2':{fsr:[3,3],h:18.3,hx:[30.5,30.5],ground:true,yards:{front:0,side:0,rear:3.1},known:'yards',
   cl:[['Floor area','up to 3.0 × the lot','I-2 District Schedule'],['Height','18.3 m; the Director of Planning or Development Permit Board may allow up to 30.5 m','I-2 ss. 3.1.2.1, 3.1.2.5 (outside sub-area B)'],['Yards','no front yard; rear yard 3.1 m; side yard 1.5 m beside an RM site, 0.9 m beside an R1, RT or RA site (no lane between), otherwise none; no site coverage limit','I-2 ss. 3.1.2.2–3 (outside sub-area B)'],['Ground floor','"Bulk data storage is not permitted at the ground floor, except for entrances"','I-2 s. 2.2.7']]},
 'I-2B':{fsr:[3,4],h:18.3,hx:[36.5,36.5],ground:true,yards:{front:0.6,side:7.6,rear:3.1,max:61},known:'yards',
   cl:[['Floor area','up to 3.0 × the lot; the Director of Planning or Development Permit Board may allow 4.0','I-2 ss. 3.2.1.1–2 (sub-area B)'],['Height','18.3 m; the Director of Planning or Development Permit Board may allow up to 36.5 m','I-2 ss. 3.2.2.1, 3.2.2.10 (sub-area B)'],['Yards','front 0.6 m, sides 7.6 m, rear 3.1 m (less where the rear abuts a lane); deeper setbacks above 18.3 m (front 3.7 m, sides 10.7 m) and above 30.5 m (front 6.1 m, sides 12.2 m) not drawn; building at most 61.0 m wide and deep','I-2 ss. 3.2.2.2–8, 3.2.2.15 (sub-area B)'],['Floor heights','first floor at least 6.1 m floor to floor, upper floors at least 4.0 m (new buildings)','I-2 s. 3.2.2.9'],['Ground floor','"Bulk data storage is not permitted at the ground floor, except for entrances"','I-2 s. 2.2.7']]},
 'I-1C':{fsr:[6,6],h:46.5,hx:[50.3,50.3],ground:false,yards:null,known:'',
   cl:[['Floor area','up to 6.0 × the lot, at least a third of it industrial-type uses','I-1C District Schedule'],['Height','46.5 m (21.0 m near street edges; up to 50.3 m)','I-1C District Schedule'],['Yards','not yet read — whole lot assumed','—']]},
 'I-3':{fsr:[3,3],h:18.3,hx:[30.5,30.5],ground:true,yards:{front:0.6,side:7.6,rear:3.1,max:61},known:'yards',
   cl:[['Floor area','up to 3.0 × the lot (the extra 2.0 does not apply to storage uses); sub-area A only','I-3 District Schedule (June 2026)'],['Height','18.3 m (the City may allow 30.5 m)','I-3 District Schedule'],['Yards','front 0.6 m, sides 7.6 m, rear 3.1 m; building at most 61 m wide and deep','I-3 District Schedule (2022 draft figures)'],['Ground floor','6.0 m floor-to-floor; no data storage at the ground floor','I-3 District Schedule']]},
 'FC-2':{fsr:[1,5],h:22.9,hx:[51.8,51.8],ground:true,yards:{front:0.6,side:0,rear:0.6},known:'yards',
   cl:[['Floor area','1.0 to 5.0 × the lot by sub-area (6.5 at the City\'s discretion)','FC-2 District Schedule (June 2026)'],['Height','10.7–22.9 m by sub-area (the City may allow up to 51.8 m)','FC-2 District Schedule'],['Yards','front and rear 0.6 m; no side yards','FC-2 District Schedule (2022 draft figures)'],['Ground floor','no data storage at grade','FC-2 District Schedule']]},
};
const ZE={
 IH:{fsr:[2,2],h:30,hx:null,ground:false,yards:{front:3,side:0,rear:0},known:'yards',cl:[['Floor area','up to 2.0 × the lot','Zoning Bylaw 20001, IH'],['Height','30.0 m; the City may vary it for operating features','Bylaw 20001, IH'],['Setbacks','3.0 m from a street; minimum site 1.0 ha','Bylaw 20001, IH']]},
 IM:{fsr:[2,2],h:18,hx:null,ground:false,yards:{front:3,side:0,rear:0},known:'yards',cl:[['Floor area','up to 2.0 × the lot','Bylaw 20001, IM'],['Height','18.0 m','Bylaw 20001, IM'],['Setbacks','3.0 m from a street; 6.0 m next to a non-industrial zone (neighbours not read, not applied); none to other industrial lots','Bylaw 20001, IM']]},
 BE:{fsr:[1.6,1.6],h:16,hx:null,ground:false,yards:null,known:'',cl:[['Floor area','up to 1.6 × the lot','Bylaw 20001, BE'],['Height','16.0 m','Bylaw 20001, BE'],['Setbacks','not yet read — whole lot assumed','—'],['Screening','"All mechanical and electrical equipment … cooling towers … must be screened from view from Abutting Streets and Sites in non-industrial Zones"','Bylaw 20001, BE s. 5.2']]},
};
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
  let base=city==='van'?ZV[key==='I-2'&&A.subB?'I-2B':key]:ZE[key], assumed=false, mods=city==='edm'?edmMods(z):{};
  const out={zone:z,key,city,cl:[],warn:''};
  if(!base){ assumed=true; base=city==='van'?ZV['I-2']:ZE.IM;
    out.warn=`Zone ${esc(z||'(none recorded)')} has no data-centre limits in the tool. The numbers use ${city==='van'?'I-2':'IM'} limits as if the lot were rezoned — an assumption for comparison, not a prediction. Set your own limits below if you know them.`;
    if(mods.h||mods.f) out.warn+=` The zoning map gives this lot ${mods.h?`a ${mods.h} m height`:''}${mods.h&&mods.f?' and ':''}${mods.f?`a floor area ratio of ${mods.f}`:''} (Bylaw 20001 modifiers, s. 8.20); these are shown, not used, because they belong to a zone where a data centre is not an allowed use.`; }
  out.assumed=assumed; out.base=base; out.mods=mods;
  out.cl=base.cl.slice(); out.cl.push(ROOFNOTE[city]);
  // user limits (J.B., 16 Oct: users can set their own height and FSR)
  const fsr=A.userFSR?[+A.userFSR,+A.userFSR]:base.fsr.slice(), hOut=A.userH?+A.userH:base.h;
  const hx=base.hx;
  out.fsr=fsr; out.hOutright=hOut; out.hx=hx; out.ground=base.ground; out.yards=base.yards; out.yardsKnown=!!base.known;
  out.userSet=!!(A.userFSR||A.userH);
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
function inscribe(F,ring,a0,a1,b0,b1){ const ua=Math.min(a0,a1), ub=Math.max(a0,a1), va=Math.min(b0,b1), vb=Math.max(b0,b1), W=ub-ua, H=vb-va; if(W<=0||H<=0) return null;
  const L=[]; for(let i=0;i<ring.length;i+=2) L.push(F.toL(ring[i],ring[i+1]));
  const inLot=(u,v)=>{ const [x,y]=F.toW(u,v); return BD.pip(x,y,ring); };
  const ok=(u0,u1,v0,v1)=>{ for(let k=0;k<=4;k++){ const t=k/4; if(!inLot(u0+(u1-u0)*t,v0)||!inLot(u0+(u1-u0)*t,v1)||!inLot(u0,v0+(v1-v0)*t)||!inLot(u1,v0+(v1-v0)*t)) return false; }
    for(const [u,v] of L) if(u>u0+0.01&&u<u1-0.01&&v>v0+0.01&&v<v1-0.01) return false; return true; };
  if(ok(ua,ub,va,vb)) return [ua,ub,va,vb];
  for(let sc=0.95;sc>=0.2;sc-=0.05){ const w=W*sc, h=H*sc; let best=null;
    for(let i=0;i<=8;i++) for(let j=0;j<=8;j++){ const u0=ua+(W-w)*i/8, v0=va+(H-h)*j/8; if(ok(u0,u0+w,v0,v0+h)){ best=[u0,u0+w,v0,v0+h]; break; } }
    if(best) return best;
    // also try keeping full depth or full width (long thin lots)
    for(const [w2,h2] of [[W,h],[w,H]]) for(let i=0;i<=8;i++) for(let j=0;j<=8;j++){ const u0=ua+(W-w2)*i/8, v0=va+(H-h2)*j/8; if(ok(u0,u0+w2,v0,v0+h2)) return [u0,u0+w2,v0,v0+h2]; } }
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

/* loading spaces: Vancouver Parking By-law 6059 s. 5 (Class B; row 5.2.5 as the "similar use" — the Director of Planning decides, s. 5.1.4);
   Edmonton Bylaw 20001 s. 5.80 subs. 7. Aisle: Vancouver's 6.1 m (s. 5.4.1) used in both cities as an assumption. */
function loadingNeed(city,gfa){
  if(city==='van'){ const n=gfa<100?0:1+(gfa>465?1:0)+Math.max(0,Math.ceil((gfa-2325)/2325)); const nC=gfa<2000?0:gfa<=5000?1:2;
    return {n,len:10.2,wid:3.4,ht:3.8,aisle:6.1,cls:'truck loading bay',nC,
      basis:`${n} truck loading bays for ${fmt(gfa)} m² of floor. The Parking By-law calls this size Class B, its mid-size bay: 10.2 × 3.4 m with 3.8 m clearance (Class C is the 23.1 m bay for the largest trucks). The count uses row 5.2.5 as the similar use: data centres are not listed, so the Director of Planning decides (s. 5.1.4). Each bay is reached by a 6.1 m aisle (s. 5.4.1).${nC?` If the City reads a data centre as a storage warehouse, ${nC} Class C space${nC>1?'s':''} (23.1 × 3.6 m, 14.0 m aisle) would also be needed.`:''}`,src:'vanParking5'}; }
  const n=gfa<2500?0:gfa<=7500?1:2;
  return {n,len:9.0,wid:3.3,ht:4.0,aisle:6.1,cls:'loading space',
    basis:`${n} loading space${n===1?'':'s'} for ${fmt(gfa)} m² of floor area (Table 7.2). Each 9.0 × 3.0–3.3 m, 4.0 m clear, wholly on site, with no backing onto streets or alleys (s. 5.80 subs. 7). Aisle: Vancouver's 6.1 m used as an assumption.`,src:'edmZB580'}; }

/* the model the numbers and the 3D share */
let cache={key:null,m:null};
function model(){
  const S=BD.S, s=S.sel, A=S.answers; if(!s) return null;
  const key=JSON.stringify([s.city,s.id,A.built,A.extent,A.floor,A.foot,A.cover,A.loadIn,A.flip,A.hmode,A.storeys,A.userFSR,A.userH,A.plantAt,A.outside,A.inside,A.spares,A.gens,A.genAt,A.genSpares,A.mw,A.vis,A.subB]);
  if(cache.key===key) return cache.m;
  const a=s.a||[], city=s.city, zraw=city==='van'?(a[1]||''):(a[2]||a[1]||'');
  const Z=zoneLimits(city,zraw);
  const lotArea=city==='van'?(+a[8]||0):(+a[4]||0);
  let ring=s.ring; if(!ring&&s.pt){ const r=Math.sqrt(Math.max(lotArea,900))/2; ring=new Float64Array([s.pt[0]-r,s.pt[1]-r,s.pt[0]+r,s.pt[1]-r,s.pt[0]+r,s.pt[1]+r,s.pt[0]-r,s.pt[1]+r]); }
  const m={Z,city,lotArea,ring,notes:[],warn:[]};
  if(!ring){ cache={key,m}; return m; }
  const F=frameOf(ring); m.F=F;
  const blds=(s.blds||[]).filter(b=>b.f!==3);
  // height and storeys (6.0 m ground floor, 5.5–6.0 m data-hall floors — engine R.ftf)
  const ftf=BD.eng?BD.eng.R.ftf:{ground:6,up:[5.5,6]};
  const nF=h=>[1+Math.max(0,Math.floor((h-ftf.ground)/ftf.up[1])),1+Math.max(0,Math.floor((h-ftf.ground)/ftf.up[0]))];
  if(A.built==='existing'){
    const hmax=blds.length?Math.max(...blds.map(b=>b.h)):0; m.existing=true; m.H=hmax; m.nF=[Math.max(1,Math.floor(hmax/4)),Math.max(1,Math.floor(hmax/4))];
    m.foot=blds.length?blds.reduce((x,b)=>b.a>x.a?b:x).r:null; m.feet=blds.map(b=>({r:b.r,h:b.h})); m.footArea=blds.reduce((t,b)=>t+b.a,0);
  } else {
    let H=Z.hOutright, hn='outright';
    if(A.hmode==='cond'&&Z.hx&&!A.userH){ H=Z.hx[0]; hn='conditional'; }
    if(A.hmode==='storeys'&&A.storeys){ const want=ftf.ground+(A.storeys-1)*ftf.up[1]; H=want; hn='storeys';
      const lim=Z.hx&&!A.userH?Z.hx[1]:Z.hOutright; if(want>lim+0.01) m.warn.push(`${A.storeys} storeys need about ${want.toFixed(1)} m; the most this zone allows is ${lim} m${Z.hx&&!A.userH?' (with the City\'s discretion)':''}.`); }
    m.H=H; m.hmode=hn; m.nF=A.hmode==='storeys'&&A.storeys?[A.storeys,A.storeys]:nF(H);
    // setbacks
    const y=Z.yards||{front:0,side:0,rear:0}; const fl=A.flip?-1:1;
    let u0=-F.L/2+(fl>0?y.front:y.rear), u1=F.L/2-(fl>0?y.rear:y.front), v0=-F.W/2+y.side, v1=F.W/2-y.side;
    if(y.max){ if(u1-u0>y.max){ const c=(u0+u1)/2; u0=c-y.max/2; u1=c+y.max/2; } if(v1-v0>y.max){ const c=(v0+v1)/2; v0=c-y.max/2; v1=c+y.max/2; } }
    m.inset=rectW(F,u0,u1,v0,v1); m.yardNote=Z.yardsKnown?'':'Yards and setbacks for this zone are not yet read, so the building may cover the whole lot.';
    // loading: rear end of the buildable area (the end with the rear yard; which end faces the street is not known in the tool)
    const gfaGuess=lotArea*Z.fsr[1];
    const LN=loadingNeed(city,gfaGuess); m.loadingNeed=LN;
    const rearEnd=fl>0?u1:u0, dir=fl>0?-1:1; let cur=rearEnd;
    if(LN.n&&!A.loadIn&&A.foot!=='existing'){ const dep=LN.len+LN.aisle; const a0=cur, a1=cur+dir*dep; { const q=inscribe(F,ring,a0,a1,v0,v1); m.loading=q?rectW(F,q[0],q[1],q[2],q[3]):clip(ring,rectW(F,Math.min(a0,a1),Math.max(a0,a1),v0,v1)); m.loadV=q?[q[2],q[3]]:[v0,v1]; } m.loadDepth=dep; cur=a1;
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
    const q=inscribe(F,ring,a0,a1,m.v[0],m.v[1]); if(q){ const r=rectW(F,q[0],q[1],q[2],q[3]); m.foot=r; m.footRect=r; m.simpleMass=true; } else { const r=rectW(F,Math.min(a0,a1),Math.max(a0,a1),m.v[0],m.v[1]); m.foot=clip(ring,r); m.footRect=r; } }
  if(m.foot&&!m.footArea) m.footArea=BD.area(m.foot);
  if(m.foot&&!m.existing&&m.footArea<20) m.warn.push('After setbacks, loading and plant there is almost no room left for a building on this lot.');
  if(BD.plant&&BD.plant.roof) BD.plant.roof(m);
  cache={key,m}; return m; }
BD.model=model; BD.modelReset=()=>{ cache.key=null; };

/* ---------- the drawer (decision A, 16 Oct): over the map, beside the panel ---------- */
const css=document.createElement('style'); css.textContent=`
#drawer{position:absolute;top:0;right:0;bottom:0;width:min(440px,92%);background:var(--panel);border-left:1px solid var(--line-2);z-index:8;overflow:auto;padding:16px 18px 28px;box-shadow:-8px 0 24px rgba(0,0,0,.35)}
#drawer[hidden]{display:none}
#drawer .dx{float:right;background:transparent;border:1px solid var(--line-2);border-radius:6px;padding:2px 9px;cursor:pointer;color:var(--muted);font-size:12.5px}
#drawer h2{font-size:18px;font-weight:400;margin:4px 0 6px;line-height:1.3}
#drawer h3{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-weight:600;margin:18px 0 6px;padding-top:12px;border-top:1px solid var(--line)}
.steps{display:flex;gap:4px;margin:10px 0 12px}.steps button{flex:1;height:4px;border:0;border-radius:2px;background:var(--line-2);padding:0;cursor:pointer}.steps button.on{background:var(--accent)}.steps button.done{background:var(--muted)}
.choice{display:grid;gap:6px;margin:8px 0}.choice button{text-align:left;background:var(--bg);border:1px solid var(--line-2);border-radius:6px;padding:8px 10px;cursor:pointer;color:var(--fg);font:inherit;font-size:13px}
.choice button[aria-pressed="true"]{border-color:var(--accent)}.choice button small{display:block;color:var(--muted);font-size:12px;margin-top:2px}.choice button .def{float:right;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.cl{width:100%;border-collapse:collapse;font-size:12.5px;margin-top:6px}.cl td{border-top:1px solid var(--line);padding:5px 6px 5px 0;vertical-align:top}.cl td:first-child{color:var(--muted);width:92px}.cl td small{display:block;color:var(--faint);font-size:11px}
.warnbox{border:1px solid #9a6f6a;border-radius:6px;padding:8px 10px;font-size:12.5px;margin:8px 0;color:var(--accent-2)}
.navb{display:flex;gap:8px;margin-top:18px;align-items:center}.navb button{border-radius:6px;padding:7px 14px;cursor:pointer;font:inherit}.navb .pri{background:var(--accent);color:#1a1212;border:0;font-weight:600}.navb .sec{background:transparent;border:1px solid var(--line-2);color:var(--fg)}
.numin{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px}.numin label{font-size:12.5px;color:var(--muted)}.numin input{width:84px;margin-left:6px;background:var(--bg);border:1px solid var(--line-2);border-radius:4px;padding:3px 6px;color:var(--fg)}
.sumrow{display:grid;grid-template-columns:88px 1fr auto;gap:8px;font-size:12.5px;padding:5px 0;border-top:1px solid var(--line);align-items:baseline}.sumrow span:first-child{color:var(--muted)}.sumrow a{font-size:12px}
.live{border:1px solid var(--line-2);border-radius:6px;padding:8px 10px;margin:10px 0;font-size:12.5px}.live b{font-weight:400;font-size:16px}
`; document.head.appendChild(css);
const dr=document.createElement('div'); dr.id='drawer'; dr.hidden=true; dr.setAttribute('role','dialog'); dr.setAttribute('aria-label','Card');
document.getElementById('map').appendChild(dr); for(const ev of ['pointerdown','pointerup','wheel']) dr.addEventListener(ev,e=>e.stopPropagation());
BD.drawer={ open(html,wire){ dr.innerHTML=`<button class="dx" id="dxc" title="Close (Esc)">×</button>`+html; dr.hidden=false; dr.scrollTop=0; $('#dxc').onclick=()=>BD.drawer.close(); if(wire) wire(dr); },
  close(){ dr.hidden=true; dr.innerHTML=''; if(BD.onDrawerClose){ const f=BD.onDrawerClose; BD.onDrawerClose=null; f(); } }, el:dr, isOpen:()=>!dr.hidden };
document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&!dr.hidden){ e.stopPropagation(); BD.drawer.close(); } },true);

/* ---------- the five setup cards ---------- */
const STEPS=['What is being built','Footprint','Height','Cooling and where its plant goes','Standby power'];
function ch(name,opts,val){ return `<div class="choice" data-q="${name}">${opts.map(o=>`<button data-v="${o.v}" aria-pressed="${String(o.v)===String(val)}">${o.def?'<span class="def">default</span>':''}${esc(o.t)}${o.s?`<small>${o.s}</small>`:''}</button>`).join('')}</div>`; }
function clauses(Z){ return `<table class="cl">${Z.cl.map(c=>`<tr><td>${esc(c[0])}</td><td>${esc(c[1])}<small>${esc(c[2])}</small></td></tr>`).join('')}</table>`; }
function setDefaults(){ const A=BD.S.answers; const d={foot:'max',cover:70,hmode:'out',plantAt:'roof',outside:'dry',inside:'air',spares:'n1',gens:'yes',genAt:'yard',genSpares:'n1'}; for(const k in d) if(A[k]==null) A[k]=d[k]; }
function liveBox(){ const m=model(); if(!m||!BD.eng) return ''; const f=BD.eng.siteFacts(); const P=m.plant;
  return `<div class="live"><div class="kind">Updates as you choose</div>${draft('')}<b>${BD.eng.rng(f.mw[0],f.mw[1],'MW')}</b> of servers fit · ${BD.eng.rng(f.gross[0],f.gross[1],'m²')} floor area${m.footArea?` · footprint ${fmt(m.footArea)} m²`:''}${m.nF?` · ${m.nF[0]===m.nF[1]?m.nF[0]:m.nF[0]+'–'+m.nF[1]} storeys`:''}${P&&P.short?`<div class="draft" style="margin-top:4px">${esc(P.short)}</div>`:''}</div>`; }
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
      <p class="sub" style="margin-top:6px">Which end faces the street is not known in the tool; the rear yard and loading are put at one end. <a href="#" id="flip">Swap the ends</a></p>
      <h3>Loading</h3><p class="sub">${esc(LN.basis)}</p>${ch('loadIn',[{v:'',t:'Outside, at the rear',def:true,s:`a strip ${(LN.len+LN.aisle).toFixed(1)} m deep: space plus aisle`},{v:'1',t:'Inside the building',s:'a loading bay on the ground floor; no strip'}],A.loadIn||'')}`; }
  }
  if(step===3){
    if(A.built==='existing') h+=`<p class="sub">The existing building is ${m.H.toFixed(1)} m tall (${S.city==='van'?'City LiDAR 2022':'City 3D buildings or estimate'}), about ${m.nF[0]} storeys at 4 m.</p>`;
    else {
      h+=`<p class="sub">${draft('Data-hall floors are tall: 5.5–6.0 m floor to floor, with a 6.0 m ground floor.')}</p>
      ${ch('hmode',[{v:'out',t:`Outright: ${Z.hOutright} m`,def:true,s:'what the zone allows without the City\'s discretion'}].concat(Z.hx&&!A.userH?[{v:'cond',t:`With the City's approval: ${Z.hx[0]===Z.hx[1]?Z.hx[0]:Z.hx[0]+'–'+Z.hx[1]} m`,s:'the City may allow this; the tool uses '+Z.hx[0]+' m'}]:[]).concat([{v:'storeys',t:'Set the storeys',s:'height follows from 6.0 m + 6.0 m a storey'}]),A.hmode)}
      ${A.hmode==='storeys'?`<div class="numin"><label>Storeys <input type="number" id="sto" min="1" max="12" value="${A.storeys||2}"></label></div>`:''}
      <p class="sub">Gives about ${m.nF[0]===m.nF[1]?m.nF[0]:m.nF[0]+'–'+m.nF[1]} storeys in ${m.H.toFixed(1)} m.</p>
      <h3>The zone's limits</h3>${Z.warn?`<div class="warnbox">${Z.warn}</div>`:''}${clauses(Z)}
      <h3>Your own limits</h3><p class="sub">If you know this lot's limits differ (a rezoning, a CD-1, a variance), set them here. They replace the zone's figures above.</p>
      <div class="numin"><label>Floor-space ratio <input type="number" id="ufsr" step="0.1" min="0.1" max="12" value="${A.userFSR||''}" placeholder="${Z.base.fsr[1]}"></label><label>Height, m <input type="number" id="uh" step="0.5" min="4" max="200" value="${A.userH||''}" placeholder="${Z.base.h}"></label></div>`; }
  }
  if(step===4){ const P=m.plant||{};
    h+=`<p class="sub">${draft('A data centre must reject almost all the electricity it uses as heat. The default is the simplest: air inside, dry coolers outside, on the roof. Each choice changes heat, water, sound and space; the Cooling card compares them.')}</p>
    <h3>Inside: how servers are cooled</h3>${ch('inside',[{v:'air',t:'Air',def:true,s:'fans and cooling coils; heat leaves at about 25–35 °C'},{v:'plate',t:'Liquid to the chip (cold plate)',s:'48–75% of heat captured into liquid (LBNL, NREL); warmer, easier to reuse'},{v:'immersion',t:'Immersion',s:'servers in a fluid bath; capture share not yet sourced'}],A.inside)}
    <h3>Outside: how heat leaves</h3>${ch('outside',[{v:'dry',t:'Dry coolers',def:true,s:'no water; fans and roof space'},{v:'towers',t:'Cooling towers',s:'evaporate water; smaller; operating permit and Legionella rules'},{v:'hybrid',t:'Hybrid (adiabatic) coolers',s:'dry most of the year, water on hot days; in Vancouver treated as a cooling tower'}],A.outside)}
    <h3>Where the plant goes</h3>${ch('plantAt',[{v:'roof',t:'Roof',def:true},{v:'yard',t:'Yard',s:'the building gets shorter to leave room'},{v:'split',t:'Split',s:'half on the roof, half in the yard'}],A.plantAt)}
    <h3>Spare units</h3>${ch('spares',[{v:'n',t:'None (N)',s:'like Uptime Tier I: no redundant components'},{v:'n1',t:'One spare (N+1)',def:true,s:'like Tier II–III: redundant capacity components'},{v:'2n',t:'Double (2N)',s:'like Tier IV: independent systems'}],A.spares)}<p class="src">Spares: Uptime Institute describes Tier II and above as having "redundant capacity components" for cooling and heat rejection, and Tier IV as "independent and physically isolated systems". It does not use the terms N+1 or 2N; reading one spare as Tier II–III and double as Tier IV is Claude's.</p>
    ${P.lines?`<h3>Sized from the load</h3><ul class="lim">${P.lines.map(l=>`<li>${l}</li>`).join('')}</ul>`:''}`;
  }
  if(step===5){ const P=m.plant||{};
    h+=`<p class="sub">${draft('Standby generators carry the load if the grid fails; batteries (UPS) carry it for the minutes until they start. Shown as generic equipment only.')}</p>
    ${ch('gens',[{v:'yes',t:'Standby generators',def:true,s:'sized to the peak load'},{v:'none',t:'None',s:'relies on the grid and UPS batteries only'}],A.gens)}
    ${A.gens!=='none'?`<h3>Where</h3>${ch('genAt',[{v:'yard',t:'Yard',def:true},{v:'roof',t:'Roof',s:'done on a Paris-region conversion (DRIEE 2010); heavy'}],A.genAt)}<h3>Spares</h3>${ch('genSpares',[{v:'n',t:'None (N)'},{v:'n1',t:'One spare (N+1)',def:true},{v:'2n',t:'Double (2N)'}],A.genSpares)}`:''}
    <p class="sub">UPS batteries sit inside, in the electrical rooms (about 2.0–2.4 m² per MW plus 2.2 m² for batteries; manufacturer claims). A battery for the grid is an add-on, off by default.</p>
    ${P.genLines?`<h3>Sized from the load</h3><ul class="lim">${P.genLines.map(l=>`<li>${l}</li>`).join('')}</ul>`:''}`;
  }
  if(m.warn.length) h+=m.warn.map(w=>`<div class="warnbox">${esc(w)}</div>`).join('');
  h+=liveBox();
  h+=`<div class="navb">${step>1?'<button class="sec" id="sb">← Back</button>':''}<button class="pri" id="sn">${step<5?'Next →':'What fits here →'}</button><span class="sub">or keep the defaults</span></div><div class="draftnote">Draft wording (Claude) for J.B. Decisions: five cards (J.B., 16 Oct).</div>`;
  BD.drawer.open(h,el=>{
    el.querySelectorAll('.choice[data-q] button').forEach(b=>b.onclick=()=>{ A[b.parentNode.dataset.q]=b.dataset.v; changed(step); });
    el.querySelectorAll('.steps button').forEach(b=>b.onclick=()=>card(+b.dataset.step));
    const cov=$('#cov'); if(cov){ cov.oninput=()=>{ $('#covv').textContent=cov.value+'%'; }; cov.onchange=()=>{ A.cover=+cov.value; changed(step); }; }
    const sto=$('#sto'); if(sto) sto.onchange=()=>{ A.storeys=Math.max(1,Math.min(12,+sto.value||1)); changed(step); };
    const uf=$('#ufsr'); if(uf) uf.onchange=()=>{ A.userFSR=uf.value?+uf.value:null; changed(step); };
    const uh=$('#uh'); if(uh) uh.onchange=()=>{ A.userH=uh.value?+uh.value:null; changed(step); };
    const fl=$('#flip'); if(fl) fl.onclick=e=>{ e.preventDefault(); A.flip=!A.flip; changed(step); };
    const sb=$('#sb'); if(sb) sb.onclick=()=>card(step-1);
    $('#sn').onclick=()=>{ if(step<5) card(step+1); else { A.setupDone=true; BD.drawer.close(); BD.fitsView(); } };
  });
  BD.showModel&&BD.showModel();
}
function changed(step){ const A=BD.S.answers; A.mw=null; if(A.built==='existing'&&A.foot==='max') {} BD.modelReset(); card(step); if(BD.S.view2==='fits') BD.fitsView(); else BD.card(); }
BD.setup={card,model,STEPS,start:()=>card(1)};

/* the site card's last section: a summary of the five cards, each with Change › */
BD.setupHTML=function(st){ setDefaults(); const A=BD.S.answers, m=model(); if(!m) return '';
  const lab={built:{new:'New building',existing:'Existing building'},extent:{whole:'whole',part:'part'},foot:{max:'most the zone allows',existing:'matches the existing building',cover:'coverage '+A.cover+'%'},outside:{dry:'dry coolers',towers:'cooling towers',hybrid:'hybrid coolers'},inside:{air:'air',plate:'liquid to the chip',immersion:'immersion'},plantAt:{roof:'on the roof',yard:'in the yard',split:'roof and yard'}};
  const rows=[[1,'Building',`${lab.built[A.built]}, ${lab.extent[A.extent]}${A.extent==='part'&&A.floor?' ('+A.floor+')':''}`],
   [2,'Footprint',A.built==='existing'?`${fmt(m.footArea)} m² (existing)`:`${fmt(m.footArea||0)} m², ${lab.foot[A.foot]}`],
   [3,'Height',A.built==='existing'?`${(m.H||0).toFixed(1)} m (existing)`:`${(m.H||0).toFixed(1)} m, ${m.nF[0]===m.nF[1]?m.nF[0]:m.nF[0]+'–'+m.nF[1]} storeys${A.userH||A.userFSR?' (your limits)':''}`],
   [4,'Cooling',`${lab.inside[A.inside]} inside; ${lab.outside[A.outside]} ${lab.plantAt[A.plantAt]}`],
   [5,'Standby',A.gens==='none'?'no generators':`generators in the ${A.genAt}`]];
  return `<h3>The site as set up</h3>${m.Z.warn?`<div class="warnbox">${m.Z.warn}</div>`:''}${rows.map(r=>`<div class="sumrow"><span>${r[1]}</span><span>${esc(r[2])}</span><a href="#" data-setup="${r[0]}">Change ›</a></div>`).join('')}
  <div class="next"><button id="fits">What fits here →</button><button id="setup1" style="background:transparent;border:1px solid var(--line-2);color:var(--fg)">Set up step by step</button></div>
  <div class="draftnote">Labelled defaults are used until you change them. Draft wording (Claude) for J.B.</div>`; };
BD.setupWire=function(){ document.querySelectorAll('#side [data-setup]').forEach(a=>a.onclick=e=>{ e.preventDefault(); card(+a.dataset.setup); }); const s1=$('#setup1'); if(s1) s1.onclick=()=>card(1); };
})();
