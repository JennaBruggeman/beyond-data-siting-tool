/* Beyond Data — lot-side facts (Build 2, 3 Nov 2026; checks/agents/BUILD2_BRIEF_2026-11-03.md part 3).
   For each edge of a lot: does it face a street (City street centrelines; register vanStreets2026, edmRoads2026), of which class (Edmonton functional
   class; Vancouver street use), or an alley/lane; and does it abut a lot in a residential zone (zone codes in the map tiles; register edmZoningGeo, vanTax).
   The edges are then grouped onto the four sides of the lot's frame (site.js frameOf): the two ends (u0, u1) and the two sides (v0, v1).
   The probe distances below are analysis choices, not rules: a street centreline within 35 m outside an edge, no titled lot with a record in between, and
   a neighbouring lot found 2 m outside an edge (listed in checks/agents/2026-11-03_refactor_unsourced.md). Pure functions: used by index.html (select)
   and by checks/tests/lotside_share.js. */
(function(root){
'use strict';
const PROBE_STREET=35, PROBE_LOT=2, MIN_EDGE=2; // analysis choices (unsourced list)
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
    const nx=ccw?dy/L:-dy/L, ny=ccw?-dx/L:dx/L, mx=(ax+bx)/2, my=(ay+by)/2; const e={x:mx,y:my,nx,ny,len:L,street:null,nbr:[]};
    if(ix){ let best=null; for(const k of nearPieces(ix,mx,my,PROBE_STREET)){ const [x0,y0,x1,y1,c]=ix.P[k], ux=x1-x0, uy=y1-y0, l2=ux*ux+uy*uy||1; let t=((mx-x0)*ux+(my-y0)*uy)/l2; t=Math.max(0,Math.min(1,t));
        const px=x0+ux*t, py=y0+uy*t, vx=px-mx, vy=py-my, d=Math.hypot(vx,vy); if(d>PROBE_STREET||d<1e-6) continue; if((vx*nx+vy*ny)<0.5*d) continue;
        if(!best||d<best.d){ if(inRec(mx+vx*0.5,my+vy*0.5)) continue; best={d,cls:(ctx.classMap||{})[cls[c]]||'unclassified',name:cls[c]}; } }
      e.street=best; }
    for(const t of [0.25,0.5,0.75]){ const qx=ax+dx*t+nx*PROBE_LOT, qy=ay+dy*t+ny*PROBE_LOT, p=inAny(qx,qy); if(p&&p.zone&&!e.nbr.includes(p.zone)) e.nbr.push(p.zone); }
    out.push(e); }
  return out; }
/* group the edges on the frame's four sides. F: {ux,uy} (site.js frameOf). A side's facts: the street of highest class along it, alley, neighbour zones */
function assign(edges,F){ const S={u0:{len:0,street:null,alley:false,nbr:[]},u1:{len:0,street:null,alley:false,nbr:[]},v0:{len:0,street:null,alley:false,nbr:[]},v1:{len:0,street:null,alley:false,nbr:[]}};
  for(const e of edges){ const nu=e.nx*F.ux+e.ny*F.uy, nv=-e.nx*F.uy+e.ny*F.ux, k=Math.abs(nu)>=Math.abs(nv)?(nu<0?'u0':'u1'):(nv<0?'v0':'v1'), s=S[k]; s.len+=e.len;
    if(e.street){ if(e.street.cls==='alley') s.alley=true; else if(!s.street||RANK[e.street.cls]>RANK[s.street.cls]) s.street=e.street; }
    for(const z of e.nbr) if(!s.nbr.includes(z)) s.nbr.push(z); }
  return S; }
const api={lotEdges,assign,RANK,streetIndex,PROBE_STREET,PROBE_LOT};
if(typeof module!=='undefined'&&module.exports) module.exports=api; else { root.BD=root.BD||{}; root.BD.lotSide=api; }
})(typeof window!=='undefined'?window:globalThis);
