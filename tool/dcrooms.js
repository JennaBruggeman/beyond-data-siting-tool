/* Beyond Data — the data centre's own rooms drawn as separate masses (night build 4 Nov 2026, part 3; J.B. 2 Nov 2026: "in every template the data
   centre becomes its own massing items"). Sizes: tool/data/dc_rooms.json (register arch_dc_hall, arch_dc_electrical, arch_dc_battery and the sources
   on each row). Only the rooms with a size per MW are drawn: the data hall, the electrical (UPS) room and the lithium-ion battery room. Every other room
   has no size rule here and is listed, not drawn, with "?" (or "only with a heat exchange", or "drawn by the set-up").
   The register gives a range per MW, not one figure. The tool draws one end of it, never a midpoint: in Architecture, the end that matches the MW the
   Ratios step tests (low end of the MW range = the high m² per MW); elsewhere the high m² per MW (the larger rooms). Which end is stated with the drawing.
   Drawing choices (not rules): what is left of the footprint is drawn pale as "Other rooms, size ?"; the hall keeps the footprint and position the set-up already gives it, filled from its far end (u1); the electrical and
   battery rooms sit next to it on its first floor, side by side, about square; where the hall's first floor has no room left, they take its near corner
   and the hall's first floor goes round them. */
(function(){
'use strict';
const BD=window.BD;
const RAW=()=>(BD.data&&BD.data.raw&&BD.data.raw.dc_rooms)||{rooms:[]};
const DRAWN=['hall','electrical','battery'];
const SHORT={hall:'Data hall',electrical:'Electrical room (UPS)',battery:'Battery room (Li-ion)',rest:'Other rooms, size ?',gst:'Ground storey, other uses (zone)',dock:'Loading dock'};
/* the rooms not drawn, in words: no size rule ("?"), only with a heat exchange, or drawn by the set-up as plant */
function notDrawn(){ const out={q:[],ex:[],tool:[]};
  for(const r of RAW().rooms){ if(DRAWN.includes(r.id)) continue; const n=r.name.split(' (')[0];
    if(r.byTool) out.tool.push(n); else if(r.id==='ets'||r.id==='heat_recovery') out.ex.push(n); else out.q.push(n); }
  return out; }
/* o: {F, u:[u0,u1], v:[v0,v1] (the hall's footprint in the lot frame), z0 (base of its first floor), fh: [storey heights of the hall floors], mw, end:'hi'|'lo', ground: height of a storey under it kept for other uses (0 if none),
      dock: {n, len, wid, rearHi} loading bays inside (7 Nov 2026, WORKLIST 2): drawn on the ground storey at the rear end, in the v0 corner; the floor above sits over it}
   returns {pieces:[{id,name,ring,base,h,m2,level}], rooms:[{id,name,m2,perMW,src,kind}], end, mw} or null */
function layout(o){ const R=RAW(), F=o.F; if(!F||!o.mw||!(o.mw>0)||!o.fh||!o.fh.length) return null; const i=o.end==='lo'?0:1;
  const row=id=>R.rooms.find(r=>r.id===id), per=id=>{ const p=(row(id)||{}).perMW; return p&&p.v?p.v[i]:null; };
  const rooms=DRAWN.map(id=>{ const r=row(id)||{}; const pv=per(id); return {id,name:SHORT[id],m2:pv!=null?o.mw*pv:null,perMW:r.perMW?r.perMW.v:null,src:r.perMW?r.perMW.src:[],kind:r.kind||''}; });
  const [u0,u1]=o.u, [v0,v1]=o.v, L=u1-u0, W=v1-v0, k=o.fh.length, fp=L*W; if(!(L>0&&W>0)) return null;
  const ring=pts=>{ const a=new Float64Array(pts.length*2); pts.forEach(([u,v],j)=>{ const [x,y]=F.toW(u,v); a[2*j]=x; a[2*j+1]=y; }); return a; };
  const rect=(a,b,c,d)=>ring([[a,c],[b,c],[b,d],[a,d]]), rr=(a,b,c,d)=>({ring:rect(a,b,c,d),r:[a,b,c,d]});
  const Hh=rooms[0].m2||0, Ae=rooms[1].m2||0, Ab=rooms[2].m2||0, Rm=Ae+Ab;
  const h=Math.min(fp,Hh/k); // hall floor on each storey
  let d=Math.sqrt(Math.max(Ae,Ab)); if(d>0&&Rm/d>W) d=Rm/W; d=Math.min(d,L); /* drawing */ /* rooms about square, side by side */
  const we=d>0?Ae/d:0, wb=d>0?Ab/d:0, pieces=[]; let z=o.z0;
  for(let j=0;j<k;j++){ const hz=o.fh[j];
    if(j===0&&Rm>0){ const hf=Math.max(0,Math.min(h,fp-Rm)), dh=hf/W;
      if(dh+d<=L+1e-6){ const ur=u1-dh; if(hf>0.5) pieces.push({id:'hall',...rr(ur,u1,v0,v1),base:z,h:hz,m2:hf,level:j});
        pieces.push({id:'electrical',...rr(ur-d,ur,v0,v0+we),base:z,h:hz,m2:Ae,level:j},{id:'battery',...rr(ur-d,ur,v0+we,v0+we+wb),base:z,h:hz,m2:Ab,level:j});
        if((W-we-wb)*d>0.5) pieces.push({id:'rest',...rr(ur-d,ur,v0+we+wb,v1),base:z,h:hz,m2:(W-we-wb)*d,level:j});
        if((ur-d-u0)*W>0.5) pieces.push({id:'rest',...rr(u0,ur-d,v0,v1),base:z,h:hz,m2:(ur-d-u0)*W,level:j}); }
      else { const ws=W-we-wb, extra=hf-(L-d)*W, ux=ws>0.01&&extra>0?Math.max(u0,u0+d-extra/ws):u0+d;
        if(ux<u0+d-1e-6&&o.dock){ const a1=(u1-u0-d)*(we+wb); pieces.push({id:'hall',...rr(u0+d,u1,v0,v0+we+wb),base:z,h:hz,m2:a1,level:j},{id:'hall',...rr(ux,u1,v0+we+wb,v1),base:z,h:hz,m2:hf-a1,level:j}); }
        else pieces.push({id:'hall',...(ux<u0+d-1e-6?{ring:ring([[u0+d,v0],[u1,v0],[u1,v1],[ux,v1],[ux,v0+we+wb],[u0+d,v0+we+wb]])}:rr(u0+d,u1,v0,v1)),base:z,h:hz,m2:hf,level:j});
        pieces.push({id:'electrical',...rr(u0,u0+d,v0,v0+we),base:z,h:hz,m2:Ae,level:j},{id:'battery',...rr(u0,u0+d,v0+we,v0+we+wb),base:z,h:hz,m2:Ab,level:j});
        if(ux>u0+1e-6&&(ux-u0)*(W-we-wb)>0.5) pieces.push({id:'rest',...rr(u0,ux,v0+we+wb,v1),base:z,h:hz,m2:(ux-u0)*(W-we-wb),level:j}); } }
    else { if(h>0.5) pieces.push({id:'hall',...rr(u1-h/W,u1,v0,v1),base:z,h:hz,m2:h,level:j}); if(fp-h>0.5) pieces.push({id:'rest',...rr(u0,u1-h/W,v0,v1),base:z,h:hz,m2:fp-h,level:j}); }
    z+=hz; }
  if(o.ground>0) pieces.unshift({id:'gst',...rr(u0,u1,v0,v1),base:o.z0-o.ground,h:o.ground,m2:fp,level:-1}); /* the storey under the hall the zone keeps for other uses, so the hall stands on it */
  /* loading dock inside (7 Nov 2026): cut out of the ground storey (the zone's ground storey where there is one, else the hall's first floor) at the rear end,
     v0 corner (drawing choice); bays side by side, 0.6 m apart, as site.js counts them. What it takes from the hall on that storey is reported, not hidden. */
  let dock=null; if(o.dock&&o.dock.n>0){ const dd=Math.min(o.dock.len,L), dw=Math.min(o.dock.n*(o.dock.wid+0.6)+0.6,W), D=o.dock.rearHi?[u1-dd,u1,v0,v0+dw]:[u0,u0+dd,v0,v0+dw], lv=o.ground>0?-1:0;
    const sub=(a,b)=>{ const [a0,a1,b0,b1]=a, [c0,c1,e0,e1]=b; if(c0>=a1||c1<=a0||e0>=b1||e1<=b0) return [a]; const o2=[]; if(c0>a0) o2.push([a0,c0,b0,b1]); if(c1<a1) o2.push([c1,a1,b0,b1]);
      const m0=Math.max(a0,c0), m1=Math.min(a1,c1); if(e0>b0) o2.push([m0,m1,b0,e0]); if(e1<b1) o2.push([m0,m1,e1,b1]); return o2.filter(r=>(r[1]-r[0])*(r[3]-r[2])>0.01); };
    const ar=r=>(r[1]-r[0])*(r[3]-r[2]); const cut={}; let at=null; const keep=[];
    for(const p of pieces){ if(p.level!==lv||!p.r){ keep.push(p); continue; } at=at||p; const parts=sub(p.r,D), lost=ar(p.r)-parts.reduce((t,r)=>t+ar(r),0); if(lost<0.01){ keep.push(p); continue; }
      cut[p.id]=(cut[p.id]||0)+lost*(p.m2/ar(p.r)); parts.forEach(r=>keep.push(Object.assign({},p,{ring:rect(...r),r,m2:p.m2*ar(r)/ar(p.r)}))); }
    if(at){ pieces.length=0; pieces.push(...keep); dock={id:'dock',...rr(...D),base:at.base,h:at.h,m2:ar(D),level:lv,n:o.dock.n,cut}; pieces.push(dock); } }
  pieces.forEach(p=>p.name=SHORT[p.id]);
  return {pieces,rooms,end:o.end==='lo'?'lo':'hi',mw:o.mw,full:rect(u0,u1,v0,v1),fp,k,dock}; }
const fmt0=v=>v==null||!isFinite(v)?'?':Math.round(v).toLocaleString('en-CA');
/* one line for the drawing's note: what is drawn, at which end, and what is not drawn */
function note(Lr){ if(!Lr) return ''; const N=notDrawn(), e=Lr.end==='lo'?'low':'high';
  const rs=Lr.rooms.map(r=>`${r.name.split(' (')[0].toLowerCase()} ${fmt0(r.m2)} m²`).join(', ');
  return `Rooms drawn at the ${e} end of their m² per MW, ${Lr.mw} MW: ${rs} (${Lr.rooms.map(r=>r.src[0]).join(', ')}). Placement is a drawing choice. Not drawn, no size rule (?): ${N.q.join(', ')}. Only with a heat exchange: ${N.ex.join(', ')}.${Lr.dock?` Loading dock: ${Lr.dock.n} bay${Lr.dock.n>1?'s':''}, ${fmt0(Lr.dock.m2)} m², on the ground storey at the rear end (drawing choice; the floor above sits over it)${(Lr.dock.cut.hall||0)>0.5?`; it takes ${fmt0(Lr.dock.cut.hall)} m² of the hall's floor on that storey, so that much hall is not drawn (Ratios counts the dock's floor; the room layout does not yet move it)`:''}.`:''}`; }
BD.dcRooms={layout,notDrawn,note,SHORT};
})();
