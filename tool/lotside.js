/* Beyond Data — lot-side facts (Build 2, 3 Nov 2026; checks/agents/BUILD2_BRIEF_2026-11-03.md part 3).
   For each edge of a lot: does it face a street (City street centrelines; register vanStreets2026, edmRoads2026), of which class (Edmonton functional
   class; Vancouver street use), or an alley/lane; and does it abut a lot in a residential zone (zone codes in the map tiles; register edmZoningGeo, vanTax).
   The edges are then grouped onto the four sides of the lot's frame (site.js frameOf): the two ends (u0, u1) and the two sides (v0, v1).
   The probe distances below are analysis choices, not rules: a street centreline within 35 m outside an edge, no titled lot with a record in between, and
   a neighbouring lot found 2 m outside an edge (listed in checks/agents/2026-11-03_refactor_unsourced.md). Pure functions: used by index.html (select)
   and by checks/tests/lotside_share.js. */
(function(root){
'use strict';
const PROBE_STREET=35, PROBE_LOT=2, MIN_EDGE=0.5; // analysis choices (unsourced list); 4 Nov 2026: edges down to 0.5 m (was 2 m) so every lot line is classed (classify)
const RANK={arterial:4,collector:3,local:2,unclassified:1,alley:0};
function pip(x,y,r){ let c=false; for(let i=0,j=r.length-2;i<r.length;j=i,i+=2){ const xi=r[i],yi=r[i+1],xj=r[j],yj=r[j+1]; if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi)) c=!c; } return c; }
function sarea(r){ let s=0; for(let i=0,j=r.length-2;i<r.length;j=i,i+=2) s+=(r[j]*r[i+1]-r[i]*r[j+1]); return s/2; }
/* a grid index over street pieces, built once per street file */
function streetIndex(ST){ if(ST._ix) return ST._ix; const C=100, cells=new Map(), P=[];
  for(const g of ST.segs){ for(let i=2;i+3<g.length;i+=2){ const k=P.length; P.push([g[i],g[i+1],g[i+2],g[i+3],g[0]]);
      const x0=Math.floor(Math.min(g[i],g[i+2])/C), x1=Math.floor(Math.max(g[i],g[i+2])/C), y0=Math.floor(Math.min(g[i+1],g[i+3])/C), y1=Math.floor(Math.max(g[i+1],g[i+3])/C);
      for(let a=x0;a<=x1;a++) for(let b=y0;b<=y1;b++){ const key=a+','+b; let L=cells.get(key); if(!L){ L=[]; cells.set(key,L); } L.push(k); } } }
  ST._ix={C,cells,P}; return ST._ix; }
function nearPieces(ix,x,y,R){ const out=new Set(), C=ix.C; for(let a=Math.floor((x-R)/C);a<=Math.floor((x+R)/C);a++) for(let b=Math.floor((y-R)/C);b<=Math.floor((y+R)/C);b++){ const L=ix.cells.get(a+','+b); if(L) for(const k of L) out.add(k); } return out; }
/* edges: [{x,y (midpoint), nx,ny (outward unit normal), len, street:{cls,d,name}|null, nbr:[zone codes found outside]}]
   ctx: {city, streets:{classes,segs}, parcels:[{r,bb,zone,rec,own}], classMap:{City class -> arterial|collector|local|alley|unclassified}} */
function lotEdges(ring,ctx){ const out=[], n=ring.length/2, ccw=sarea(ring)>0, ix=ctx.streets?streetIndex(ctx.streets):null, cls=ctx.streets?ctx.streets.classes:[];
  const inRec=(x,y)=>{ for(const p of ctx.parcels){ if(p.own||!p.rec) continue; const b=p.bb; if(x<b[0]||x>b[2]||y<b[1]||y>b[3]) continue; if(pip(x,y,p.r)) return p; } return null; };
  const inAny=(x,y)=>{ for(const p of ctx.parcels){ if(p.own) continue; const b=p.bb; if(x<b[0]||x>b[2]||y<b[1]||y>b[3]) continue; if(pip(x,y,p.r)) return p; } return null; };
  for(let i=0;i<n;i++){ const j=(i+1)%n, ax=ring[2*i], ay=ring[2*i+1], bx=ring[2*j], by=ring[2*j+1], dx=bx-ax, dy=by-ay, L=Math.hypot(dx,dy); if(L<MIN_EDGE) continue;
    const nx=ccw?dy/L:-dy/L, ny=ccw?-dx/L:dx/L, mx=(ax+bx)/2, my=(ay+by)/2; const e={i,x:mx,y:my,ax,ay,bx,by,nx,ny,len:L,street:null,nbr:[]};
    if(ix){ let best=null; for(const k of nearPieces(ix,mx,my,PROBE_STREET)){ const [x0,y0,x1,y1,c]=ix.P[k], ux=x1-x0, uy=y1-y0, l2=ux*ux+uy*uy||1; let t=((mx-x0)*ux+(my-y0)*uy)/l2; t=Math.max(0,Math.min(1,t));
        const px=x0+ux*t, py=y0+uy*t, vx=px-mx, vy=py-my, d=Math.hypot(vx,vy); if(d>PROBE_STREET||d<1e-6) continue; if((vx*nx+vy*ny)<0.5*d) continue;
        if(!best||d<best.d){ if(inRec(mx+vx*0.5,my+vy*0.5)) continue; best={d,cls:(ctx.classMap||{})[cls[c]]||'unclassified',name:cls[c]}; } }
      e.street=best; }
    for(const t of [0.25,0.5,0.75]){ const qx=ax+dx*t+nx*PROBE_LOT, qy=ay+dy*t+ny*PROBE_LOT, p=inAny(qx,qy); if(p&&p.zone&&!e.nbr.includes(p.zone)) e.nbr.push(p.zone); if(p&&!p.zone){ /* 4 Nov 2026: a parcel with no zone on record. J.B. 4 Nov: read its zone from the City zoning map (ctx.zoneAt; Edmonton: register edmZoningGeo) */ const z=ctx.zoneAt?ctx.zoneAt(qx,qy):null; if(z){ if(!e.nbr.includes(z)) e.nbr.push(z); e.zoneFromMap=true; } else e.lotNoZone=true; } }
    out.push(e); }
  return out; }
/* group the edges on the frame's four sides. F: {ux,uy} (site.js frameOf). A side's facts: the street of highest class along it, alley, neighbour zones */
function assign(edges,F){ const S={u0:{len:0,street:null,alley:false,nbr:[]},u1:{len:0,street:null,alley:false,nbr:[]},v0:{len:0,street:null,alley:false,nbr:[]},v1:{len:0,street:null,alley:false,nbr:[]}};
  for(const e of edges){ const nu=e.nx*F.ux+e.ny*F.uy, nv=-e.nx*F.uy+e.ny*F.ux, k=Math.abs(nu)>=Math.abs(nv)?(nu<0?'u0':'u1'):(nv<0?'v0':'v1'), s=S[k]; s.len+=e.len;
    if(e.street){ if(e.street.cls==='alley') s.alley=true; else if(!s.street||RANK[e.street.cls]>RANK[s.street.cls]) s.street=e.street; }
    for(const z of e.nbr) if(!s.nbr.includes(z)) s.nbr.push(z); }
  return S; }
/* 4 Nov 2026 (LOTLINES brief part 2; research checks/research_arch_v1/lotlines.md): each lot line classed front, flank, rear or side from what it faces,
   by the by-laws' definitions (register lot_van_s2_lines, lot_van_s10_frontage, lot_edm_820_lines, lot_edm_5130), or 'unclear' where they do not settle it.
   edges: lotEdges() output, in ring order; city 'van'|'edm'; L: tool/data/lotside.json lines (cornerDeg 135, Edmonton s. 8.20 Corner Lot).
   A street line: an edge with a street centreline outside it that is not an alley or lane (never a front: Van s. 2 Lane; Edm s. 8.20 Street).
   Tests (stated in lotlines.md): a run of street lines turning more than 180-cornerDeg in all is a corner, split at the vertex nearest where its end tangents
   meet (Edm s. 5.130.5-6); the front is the only street line, or the shorter on a corner (Van s. 10.26.1(b), Edm s. 8.20 Front Lot Line (b)); street
   lines within 180-cornerDeg of parallel that do not meet at the lot: double fronting (Edm: both front, s. 5.130.4; Van: unclear); rear: the line facing
   within 180-cornerDeg of straight away from the front and furthest from it (Edm s. 8.20 Rear Lot Line; Van our reading of the s. 2 yard diagram ?);
   a nearer line facing away (a notch) and a line facing the front's way off the street: Edm interior side (s. 8.20: every other line), Van unclear;
   lines facing sideways: side. Returns {lines:[{e:[edge indexes],kind,cand,why,len,nx,ny}], f, corner, dbl, unclear}; cand: what an unclear line could be. */
const COL=2, EQ=0.5, FAR=0.5; // analysis choices (unsourced list): edges turning under 2 degrees are one lot line; street lines within 0.5 m are equal; rear lines within 0.5 m of the furthest count as furthest
function classify(edges,city,L){ const CD=(L&&L.cornerDeg)||null, out={lines:[],f:null,corner:false,dbl:false,unclear:0}; if(!edges||!edges.length) return out;
  const B=CD!=null?180-CD:null, deg=(a,b)=>Math.acos(Math.max(-1,Math.min(1,a.nx*b.nx+a.ny*b.ny)))*180/Math.PI, isSt=e=>!!(e.street&&e.street.cls!=='alley');
  const unit=(x,y)=>{ const l=Math.hypot(x,y)||1; return {nx:x/l,ny:y/l}; }, V=city==='van';
  /* 1. lot lines: consecutive edges turning less than COL degrees */
  const LN=[]; for(let k=0;k<edges.length;k++){ const e=edges[k], last=LN[LN.length-1]; if(last&&deg(edges[last.e[last.e.length-1]],e)<COL) last.e.push(k); else LN.push({e:[k]}); }
  if(LN.length>1&&deg(edges[LN[0].e[0]],edges[LN[LN.length-1].e[LN[LN.length-1].e.length-1]])<COL){ const z=LN.pop(); LN[0].e=z.e.concat(LN[0].e); }
  for(const l of LN){ let sx=0,sy=0,len=0,st=0,al=0; for(const k of l.e){ const e=edges[k]; sx+=e.nx*e.len; sy+=e.ny*e.len; len+=e.len; if(isSt(e)) st+=e.len; else if(e.street) al+=e.len; }
    Object.assign(l,unit(sx,sy),{len,street:st>=len/2,alley:!(st>=len/2)&&al>=len/2,kind:null,cand:null,why:''}); }
  const n=LN.length, nxt=i=>(i+1)%n;
  if(B==null){ for(const l of LN){ l.kind='unclear'; l.cand=['front','flank','rear','side']; l.why='the corner angle is not loaded (?)'; } out.lines=LN; out.unclear=n; return out; }
  /* 2. street runs (cyclic); 3. split at corners */
  const runs=[]; if(LN.every(l=>l.street)) runs.push(LN.map((l,i)=>i));
  else { const s=LN.findIndex(l=>!l.street); let cur=null; for(let c=0,i=nxt(s);c<n;c++,i=nxt(i)){ if(LN[i].street){ if(!cur){ cur=[]; runs.push(cur); } cur.push(i); } else cur=null; } }
  const pt=k=>{ const e=edges[k]; return [e.ax,e.ay,e.bx,e.by]; };
  /* the corner: the point on the run nearest where the tangents at its 2 ends meet (Edm s. 5.130.6); the 2 parts' lengths are measured from that point
     (Front Lot Line (c)); the run is cut at the line end nearest it. A part is tested again with COL degrees of slack, so a corner cut is not a corner of its own. */
  const split=(r,deep)=>{ if(r.length<2) return [{r,len:r.reduce((t,i)=>t+LN[i].len,0)}]; const a=LN[r[0]], b=LN[r[r.length-1]]; if(deg(a,b)<=B+(deep?COL:0)) return [{r,len:r.reduce((t,i)=>t+LN[i].len,0)}];
    const [ax,ay,a2x,a2y]=pt(a.e[0]), [bx,by,b2x,b2y]=pt(b.e[b.e.length-1]), dax=a2x-ax, day=a2y-ay, dbx=b2x-bx, dby=b2y-by, den=dax*dby-day*dbx; let cut=1, lenA=null;
    if(Math.abs(den)>1e-9){ const t=((bx-ax)*dby-(by-ay)*dbx)/den, X=[ax+dax*t,ay+day*t]; let best=Infinity, run=0;
      for(let j=0;j<r.length;j++) for(const k of LN[r[j]].e){ const [p0,p1,q0,q1]=pt(k), ux=q0-p0, uy=q1-p1, l2=ux*ux+uy*uy||1, tt=Math.max(0,Math.min(1,((X[0]-p0)*ux+(X[1]-p1)*uy)/l2)), d=Math.hypot(p0+ux*tt-X[0],p1+uy*tt-X[1]);
        if(d<best-1e-9){ best=d; lenA=run+tt*Math.sqrt(l2); const at=run+tt*Math.sqrt(l2), s0=r.slice(0,j).reduce((t2,i)=>t2+LN[i].len,0); cut=Math.max(1,Math.min(r.length-1,at-s0>LN[r[j]].len/2?j+1:j)); } run+=Math.sqrt(l2); } }
    else { let big=-1; for(let j=1;j<r.length;j++){ const t=deg(LN[r[j-1]],LN[r[j]]); if(t>big){ big=t; cut=j; } } }
    const A=split(r.slice(0,cut),true), Bp=split(r.slice(cut),true);
    if(lenA!=null&&A.length===1&&Bp.length===1){ const tot=r.reduce((t,i)=>t+LN[i].len,0); A[0].len=lenA; Bp[0].len=tot-lenA; }
    return A.concat(Bp); };
  const SB=[]; runs.forEach((r,ri)=>split(r,false).forEach((q,si)=>{ let sx=0,sy=0; for(const i of q.r){ sx+=LN[i].nx*LN[i].len; sy+=LN[i].ny*LN[i].len; } SB.push(Object.assign({ix:q.r,len:q.len,run:ri,part:si},unit(sx,sy))); }));
  const adj=(a,b)=>a.run===b.run&&Math.abs(a.part-b.part)===1, rel=(a,b)=>adj(a,b)?'corner':deg(a,b)>=CD?'parallel':deg(a,b)<=B?'same':'corner';
  const set=(b,kind,why,cand)=>{ for(const i of b.ix){ LN[i].kind=kind; LN[i].why=why; LN[i].cand=cand||null; } };
  /* 4. fronts */
  let fronts=[], tie=false;
  if(SB.length===1){ fronts=[SB[0]]; set(SB[0],'front',V?'the only street line (s. 2 Front Yard; s. 10.26.1)':'the only street line (s. 8.20 Front Lot Line (a))'); }
  else if(SB.length>1){ const cor=SB.filter(a=>SB.some(b=>b!==a&&rel(a,b)==='corner')); out.corner=cor.length>0;
    if(!cor.length){ const par=SB.some(b=>rel(SB[0],b)==='parallel'); out.dbl=par;
      if(par&&V) SB.forEach(b=>set(b,'unclear','double fronting: s. 10.26.1 sets no front for unequal parallel street lines on one lot (?)',['front','rear']));
      else { fronts=SB.slice(); SB.forEach(b=>set(b,'front',par?'double fronting: 2 Front Lot Lines (s. 5.130.4)':'a second line on the same street (Front Lot Line (a); Van s. 2 Front Yard)')); } }
    else { const mn=Math.min(...cor.map(b=>b.len)), sh=cor.filter(b=>b.len<=mn+EQ);
      if(sh.length>1){ tie=true; sh.forEach(b=>set(b,'unclear',V?'corner with equal street lines: the Director of Planning decides (s. 10.26.1(a))':'corner with equal street lines: the Development Planner decides (s. 5.130.2)',['front','flank'])); }
      else { fronts=[sh[0]]; set(sh[0],'front',V?'corner: the shortest boundary abutting a street (s. 10.26.1(b))':'corner: the shorter street line (s. 8.20 Front Lot Line (b), (c))'); }
      for(const b of SB){ if(sh.includes(b)) continue; const r=(tie?sh:fronts).map(a=>rel(a,b));
        if(r.includes('parallel')){ out.dbl=true; if(V||tie) set(b,'unclear','corner and double fronting: front or rear not settled'+(V?' (s. 10.26.1 ?)':' (s. 5.130.2)'),['front','rear']); else { fronts.push(b); set(b,'front','corner and double fronting: 2 Front Lot Lines (s. 5.130.4)'); } }
        else if(!tie&&r.every(x=>x==='same')){ fronts.push(b); set(b,'front','a second line on the same street as the front'); }
        else set(b,'flank',V?'corner: the side property line on the flanking street (s. 2 Exterior Side Yard)':'corner: Flanking Side Lot Line (s. 8.20)'); } } }
  /* 5. the front's direction; 6. the other lines */
  let f=null; if(fronts.length&&!tie){ let sx=0,sy=0,t=0; for(const b of fronts){ sx+=b.nx*b.len; sy+=b.ny*b.len; t+=b.len; } if(Math.hypot(sx,sy)>t/2) f=unit(sx,sy); }
  out.f=f; const rest=LN.filter(l=>!l.kind);
  if(!SB.length){ for(const l of rest){ l.kind='unclear'; l.cand=['front','rear','side']; l.why=V?'no street found beside the lot: not a site (s. 10.25.1), or the street file misses it (?)':'no street found beside the lot, so no Front Lot Line (?)'; } }
  else if(!f){ const cf=SB.filter(b=>b.ix.some(i=>LN[i].kind==='front'||(LN[i].kind==='unclear'&&LN[i].cand.includes('front'))));
    for(const l of rest){ if(cf.length&&cf.every(b=>{ const t=deg(l,b); return t>B&&t<CD; })){ l.kind='side'; l.why=V?'faces sideways to every street line that could be the front (s. 2 Side Yard; our reading ?)':'Interior Side Lot Line (s. 8.20)'; continue; }
      if(fronts.length>1&&!V){ l.kind='side'; l.why='Interior Side Lot Line: 2 Front Lot Lines, so no line is opposite one front (s. 8.20)'; } else { l.kind='unclear'; l.cand=['rear','side']; l.why='the front is not settled, so the rear is not either'; } } }
  else { const ref=Math.max(...fronts.flatMap(b=>b.ix.flatMap(i=>LN[i].e.map(k=>-(edges[k].x*f.nx+edges[k].y*f.ny)))));
    const far=l=>Math.max(...l.e.flatMap(k=>{ const e=edges[k]; return [-(e.ax*f.nx+e.ay*f.ny),-(e.bx*f.nx+e.by*f.ny)]; }))-ref;
    const opp=rest.filter(l=>deg(l,f)>=CD), mx=opp.length?Math.max(...opp.map(far)):null;
    for(const l of rest){ const th=deg(l,f);
      if(th>=CD){ if(far(l)>=mx-FAR){ l.kind='rear'; l.why=V?'opposite the front and furthest from it (s. 2 yard diagram; our reading ?)':'furthest from and opposite the Front Lot Line (s. 8.20 Rear Lot Line)'; }
        else if(!V){ l.kind='side'; l.why='faces away from the front but is not the furthest: an Interior Side Lot Line (s. 8.20)'; }
        else { l.kind='unclear'; l.cand=['rear','side']; l.why='faces away from the front but is not the furthest (a notch): s. 2 defines no rear or side property line (?)'; } }
      else if(th>B){ l.kind='side'; l.why=V?'faces sideways (s. 2 Side Yard; our reading ?)':'Interior Side Lot Line (s. 8.20)'; }
      else if(!V){ l.kind='side'; l.why='faces the front\'s way but is not on a street: an Interior Side Lot Line (s. 8.20)'; }
      else { l.kind='unclear'; l.cand=['side','rear']; l.why='faces the front\'s way but is not on a street (a notch): not settled by s. 2 (?)'; } } }
  for(const l of LN) if(l.kind==='unclear') out.unclear++;
  out.lines=LN; return out; }
const api={lotEdges,assign,classify,RANK,streetIndex,PROBE_STREET,PROBE_LOT};
if(typeof module!=='undefined'&&module.exports) module.exports=api; else { root.BD=root.BD||{}; root.BD.lotSide=api; }
})(typeof window!=='undefined'?window:globalThis);
