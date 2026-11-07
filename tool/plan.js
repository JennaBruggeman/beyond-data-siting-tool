/* Beyond Data — plan layer, rule sheet v0 (7 Nov 2026, WORKLIST 5; J.B.: "so V339.json gets walls, doors, stairs, exits and corridors").
   Takes Arrange's placed layout (arch.js place(): the hall's rooms from dcrooms.js, the program blocks) and adds, storey by storey, a corridor, stairs, a lift
   where a block has more than one storey, doors, exits and walls. Read-only: it changes no size, MW or placement; what does not fit is reported.
   Every dimension below that is not a code minimum is a DRAWING CHOICE (named in RULES and in the output), to be replaced by the full rule sheet
   (bands, one corridor spine, room minimum / target / rank, fallback ladder) and checked by the path-based checks 8 and 9 (WORKLIST 5).
   Code figures used: doorway ≥ 850 mm, corridor ≥ 1 100 mm, stair ≥ 1 100 mm (NBC Table 3.4.3.2.-A; register arch_nbc3432); a lift to every storey in
   Vancouver (VBBL 3.8.2.3, named in WORKLIST 5; text not in the repo ?). Coordinates: metres in the lot frame (u, v), rectangles [u0, u1, v0, v1]. */
(function(){
'use strict';
const BD=window.BD;
const RULES={ /* drawing */
  corridor:{w:2.0,why:'drawing choice: 2.0 m public corridor (the code minimum is 1.1 m, Table 3.4.3.2.-A, arch_nbc3432)'}, /* drawing */
  stair:{a:3.0,b:6.0,why:'drawing choice: 3.0 × 6.0 m exit stair (two 1.1 m flights and a landing; stair width ≥ 1.1 m, Table 3.4.3.2.-A); stair geometry not checked (left out on purpose, WORKLIST 5)'}, /* drawing */
  lift:{a:2.5,b:2.5,why:'drawing choice: 2.5 × 2.5 m lift shaft; a lift to every storey in Vancouver (VBBL 3.8.2.3, WORKLIST 5; text not in the repo ?)'}, /* drawing */
  door:{w:0.9,why:'0.9 m doors (doorway ≥ 850 mm, Table 3.4.3.2.-A, arch_nbc3432); widths from occupant load are check 10, not done here'}, /* drawing */
  bigRoom:{m2:150,why:'drawing choice: rooms of 150 m² or more get two doors, at a quarter and three quarters of the corridor wall'}, /* drawing */
  front:{w:1.8,why:'drawing choice: a 1.8 m pair of doors on the street front of a public block'}, /* drawing */
  ramp:{slope:12,why:'step-free entrance: a 1:12 ramp inside the entrance where the street is above or below the ground storey; slope not in the repo (BCBC 3.8 not read, ?); street grade at the door not known to the tool (?)'} /* drawing */
}; /* drawing */
const r2=x=>Math.round(x*100)/100, area=r=>(r[1]-r[0])*(r[3]-r[2]), R=r=>r.map(r2);
const over=(a,b)=>!(b[0]>=a[1]-1e-6||b[1]<=a[0]+1e-6||b[2]>=a[3]-1e-6||b[3]<=a[2]+1e-6);
function sub(a,b){ if(!over(a,b)) return [a]; const [a0,a1,b0,b1]=a, [c0,c1,e0,e1]=b, o=[]; if(c0>a0) o.push([a0,c0,b0,b1]); if(c1<a1) o.push([c1,a1,b0,b1]);
  const m0=Math.max(a0,c0), m1=Math.min(a1,c1); if(e0>b0) o.push([m0,m1,b0,e0]); if(e1<b1) o.push([m0,m1,e1,b1]); return o.filter(r=>area(r)>0.05); }
const subAll=(rs,cut)=>cut.reduce((acc,c)=>acc.flatMap(r=>sub(r,c)),rs);
/* the shared stretch of two rectangles' edges: {axis:'u'|'v', at, from, to} or null (touching along a line) */
function shared(a,b){ const e=0.02; /* rooms are stored rounded to 0.01 m */
  if(Math.abs(a[1]-b[0])<e||Math.abs(a[0]-b[1])<e){ const at=Math.abs(a[1]-b[0])<e?a[1]:a[0], f=Math.max(a[2],b[2]), t=Math.min(a[3],b[3]); return t-f>0.5?{axis:'u',at,from:f,to:t}:null; }
  if(Math.abs(a[3]-b[2])<e||Math.abs(a[2]-b[3])<e){ const at=Math.abs(a[3]-b[2])<e?a[3]:a[2], f=Math.max(a[0],b[0]), t=Math.min(a[1],b[1]); return t-f>0.5?{axis:'v',at,from:f,to:t}:null; }
  return null; }
const doorOn=(s,t,w)=>{ const c=s.from+(s.to-s.from)*t; return s.axis==='u'?{u:r2(s.at),v:r2(c),along:'v',w}:{u:r2(c),v:r2(s.at),along:'u',w}; };
/* walls: every room edge on the storey, split where rooms meet; exterior where the edge lies on the block outline */
function walls(rects,outline){ const segs=[]; const key=(a)=>a.map(r2).join(',');
  const add=(ax,at,f,t)=>{ if(t-f<0.05) return; const ext=outline.some(o=>ax==='u'?((Math.abs(at-o[0])<1e-3||Math.abs(at-o[1])<1e-3)&&f>=o[2]-1e-3&&t<=o[3]+1e-3):((Math.abs(at-o[2])<1e-3||Math.abs(at-o[3])<1e-3)&&f>=o[0]-1e-3&&t<=o[1]+1e-3)); segs.push({axis:ax,at:r2(at),from:r2(f),to:r2(t),exterior:ext}); };
  rects.forEach(r=>{ add('u',r[0],r[2],r[3]); add('u',r[1],r[2],r[3]); add('v',r[2],r[0],r[1]); add('v',r[3],r[0],r[1]); });
  const seen=new Set(), out=[]; segs.forEach(s=>{ const k=key([s.axis==='u'?0:1,s.at,s.from,s.to]); if(!seen.has(k)){ seen.add(k); out.push(s); } }); return out; }
function build(P){ if(!P||!P.s) return null; const A=BD.archTest, s=P.s, M=s.M, flags=[], storeys={};
  const st=z=>{ const k=Math.round(z*10)/10; return storeys[k]||(storeys[k]={z:r2(z),rooms:[],corridors:[],stairs:[],lifts:[],doors:[],exits:[],walls:[]}); };
  /* 1. the data-centre block: a corridor along its long side, away from the dock (the dock keeps its truck face), a stair at each end beside it */
  const DP=A.dcPieces?A.dcPieces(P):null, H=[P.hall.u[0],P.hall.u[1],P.hall.v[0],P.hall.v[1]], cw=RULES.corridor.w, sa=RULES.stair.a, sb=RULES.stair.b;
  const dock=DP&&DP.L.dock?DP.L.dock.r:null, alongU=true; /* dcrooms.js lays the rooms in bands along u (hall from u1, support at u0), so a corridor along u touches every band */
  const lowSide=dock?(alongU?(dock[2]-H[2]>H[3]-dock[3]):(dock[0]-H[0]>H[1]-dock[1])):false; /* the corridor goes to the side farther from the dock */
  /* the corridor strip runs the block's length on the side away from the dock; the two stairs sit in line at its ends (3.0 m across, so they also take
     1.0 m beside the strip), and the corridor runs between them, so every room along it opens onto it */
  const strip=alongU?(lowSide?[H[2],H[2]+cw,H[2]+sa]:[H[3]-cw,H[3],H[3]-sa]):(lowSide?[H[0],H[0]+cw,H[0]+sa]:[H[1]-cw,H[1],H[1]-sa]); /* [corridor from, to, stair inner edge] */
  const sLo=Math.min(strip[0],strip[2]), sHi=Math.max(strip[1],strip[2]);
  const cor=alongU?[H[0]+sb,H[1]-sb,strip[0],strip[1]]:[strip[0],strip[1],H[2]+sb,H[3]-sb];
  const sA=alongU?[H[0],H[0]+sb,sLo,sHi]:[sLo,sHi,H[2],H[2]+sb], sB=alongU?[H[1]-sb,H[1],sLo,sHi]:[sLo,sHi,H[3]-sb,H[3]];
  const dcLevels=DP?[...new Set(DP.out.map(q=>Math.round(q.base*10)/10))].sort((a,b)=>a-b):[];
  const dcGround=dcLevels.length?dcLevels[0]:null;
  dcLevels.forEach(z=>{ const S=st(z), pcs=DP.L.pieces.filter(q=>Math.round(q.base*10)/10===z);
    S.corridors.push({id:'dc_corridor',block:'data centre',rect:R(cor),w:cw});
    [sA,sB].forEach((r,i)=>S.stairs.push({id:'dc_stair_'+(i?'B':'A'),block:'data centre',rect:R(r)}));
    pcs.forEach((q,qi)=>{ if(!q.r){ S.rooms.push({id:q.id,name:q.name,block:'data centre',outline:true,m2:r2(q.m2),note:'not a rectangle: not subdivided (?)'}); flags.push(`${q.name} on storey ${z} m is not a rectangle: left whole, no door placed (?)`); return; }
      subAll([q.r],[cor,sA,sB]).forEach((r,k)=>S.rooms.push({id:q.id,name:q.name,block:'data centre',room:q.id,rect:R(r),m2:r2(area(r)),part:k})); });
    /* doors: the parts of one room (a room cut by the corridor or a stair) are one room. A room with a part on the corridor gets its door(s) there; a room
       without one opens into a neighbouring room that is reached (repeated until none is left), flagged; one that still has no way in is flagged */
    const rooms=S.rooms.filter(x=>x.block==='data centre'&&x.rect), keys=[...new Set(rooms.map(x=>x.room))], reached=new Set();
    keys.forEach(k=>{ const parts=rooms.filter(x=>x.room===k), best=parts.map(x=>({x,sh:shared(x.rect,cor)})).filter(o=>o.sh).sort((a,b)=>(b.sh.to-b.sh.from)-(a.sh.to-a.sh.from))[0];
      if(!best) return; const m2=parts.reduce((t,x)=>t+x.m2,0), two=m2>=RULES.bigRoom.m2&&best.sh.to-best.sh.from>4; reached.add(k);
      (two?[0.25,0.75]:[0.5]).forEach(t=>S.doors.push(Object.assign({from:best.x.id,room:k,to:'dc_corridor'},doorOn(best.sh,t,RULES.door.w)))); });
    for(let pass=0;pass<4;pass++) keys.filter(k=>!reached.has(k)).forEach(k=>{ const parts=rooms.filter(x=>x.room===k); let hit=null;
      for(const x of parts){ for(const y of rooms){ if(!reached.has(y.room)||y.room===k) continue; const sh=shared(x.rect,y.rect); if(sh&&sh.to-sh.from>=1.2){ hit={x,y,sh}; break; } } if(hit) break; }
      if(hit){ reached.add(k); S.doors.push(Object.assign({from:hit.x.id,room:k,to:hit.y.id,through:true},doorOn(hit.sh,0.5,RULES.door.w))); flags.push(`${hit.x.name} (storey ${z} m) opens into ${hit.y.name}, not onto the corridor (drawing choice ?)`); } });
    keys.filter(k=>!reached.has(k)).forEach(k=>{ const x=rooms.find(y=>y.room===k); flags.push(`${x.name} (storey ${z} m) has no way in: it touches neither the corridor nor a room that is reached (?)`); });
    [sA,sB].forEach((r,i)=>{ const sh=shared(r,cor); if(sh) S.doors.push(Object.assign({from:'dc_stair_'+(i?'B':'A'),to:'dc_corridor'},doorOn(sh,0.5,RULES.door.w))); });
    if(z===dcGround) [sA,sB].forEach((r,i)=>{ const out=alongU?[r[i?1:0],r[i?1:0],r[2],r[3]]:[r[0],r[1],r[i?3:2],r[i?3:2]], s2=alongU?{axis:'u',at:r[i?1:0],from:r[2],to:r[3]}:{axis:'v',at:r[i?3:2],from:r[0],to:r[1]};
      S.exits.push(Object.assign({id:'dc_exit_'+(i?'B':'A'),block:'data centre',via:'dc_stair_'+(i?'B':'A'),to:'outside'},doorOn(s2,0.5,RULES.door.w))); });
    S.walls.push(...walls(S.rooms.filter(x=>x.rect&&x.block==='data centre').map(x=>x.rect).concat([cor,sA,sB]),[H])); });
  if(dcGround!=null&&dock){ const S=st(dcGround); const sh=alongU?{axis:'u',at:s.dir<0?dock[1]:dock[0],from:dock[2],to:dock[3]}:null; if(sh) S.exits.push(Object.assign({id:'dock_door',block:'data centre',via:'dock',to:'truck route',kind:'loading'},doorOn(sh,0.5,r2(sh.to-sh.from-0.6)))); }
  /* 2. program blocks: one room per storey; a block on more than one storey gets a stair at each end and a lift beside the first (Vancouver: every storey) */
  const prog=[];
  (P.boxes||[]).forEach(b=>{ const B=[b.u[0],b.u[1],b.v[0],b.v[1]], n=b.storeys||1, sh=b.sh||(b.h/n), long=B[1]-B[0]>=B[3]-B[2], cuts=[];
    let pA=null, pB=null, lift=null;
    if(n>1){ pA=long?[B[0],B[0]+sb,B[2],B[2]+sa]:[B[0],B[0]+sa,B[2],B[2]+sb]; pB=long?[B[1]-sb,B[1],B[3]-sa,B[3]]:[B[1]-sa,B[1],B[3]-sb,B[3]];
      lift=long?[B[0]+sb,B[0]+sb+RULES.lift.a,B[2],B[2]+RULES.lift.b]:[B[0],B[0]+RULES.lift.a,B[2]+sb,B[2]+sb+RULES.lift.b]; cuts.push(pA,pB,lift); }
    let net=0; for(let k=0;k<n;k++){ const z=b.base+k*sh, S=st(z), rs=subAll([B],cuts);
      rs.forEach((r,j)=>{ S.rooms.push({id:b.id,name:b.p.name,block:b.id,rect:R(r),m2:r2(area(r)),part:j}); net+=area(r); });
      if(n>1){ S.stairs.push({id:b.id+'_stair_A',block:b.id,rect:R(pA)},{id:b.id+'_stair_B',block:b.id,rect:R(pB)}); S.lifts.push({id:b.id+'_lift',block:b.id,rect:R(lift)});
        [pA,pB,lift].forEach((c,i)=>{ const room=rs.map(r=>({r,s:shared(r,c)})).find(x=>x.s); if(room) S.doors.push(Object.assign({from:[b.id+'_stair_A',b.id+'_stair_B',b.id+'_lift'][i],to:b.id},doorOn(room.s,0.5,i===2?1.0:RULES.door.w))); }); }
      if(k===0&&b.base>0.1){ /* the block sits over another storey: its stairs and lift continue down to the ground through what is below (rooms there are cut), and leave at grade */
        if(n>1){ const below=Object.values(storeys).filter(S2=>S2.z<b.base-0.1); if(!below.some(S2=>S2.z<0.1)) below.push(st(0));
          below.forEach(S2=>{ const cut=[pA,pB,lift]; const keep=[]; S2.rooms.forEach(x=>{ if(!x.rect||!cut.some(c=>over(x.rect,c))){ keep.push(x); return; } subAll([x.rect],cut).forEach((r,j)=>keep.push(Object.assign({},x,{rect:R(r),m2:r2(area(r)),part:'cut'+j}))); flags.push(`${x.name} (storey ${S2.z} m) gives up floor to the ${b.p.name}'s stairs and lift passing down`); });
            S2.rooms=keep; S2.stairs.push({id:b.id+'_stair_A',block:b.id,rect:R(pA)},{id:b.id+'_stair_B',block:b.id,rect:R(pB)}); S2.lifts.push({id:b.id+'_lift',block:b.id,rect:R(lift)}); S2.walls.push(...walls(cut,[B]));
            if(S2.z<0.1) [pA,pB].forEach((r,i)=>{ const at=long?(i?r[1]:r[0]):(i?r[3]:r[2]), s2=long?{axis:'u',at,from:r[2],to:r[3]}:{axis:'v',at,from:r[0],to:r[1]}; S2.exits.push(Object.assign({id:b.id+'_exit_'+(i?'B':'A'),block:b.id,via:b.id+'_stair_'+(i?'B':'A'),to:'outside'},doorOn(s2,0.5,RULES.door.w))); }); }); }
        else flags.push(`${b.p.name} sits on the ${r2(b.base)} m storey over the block below on one storey: its way down to the ground is not drawn (?)`); }
      if(k===0&&b.base<=0.1){ const fu=s.dir<0?B[0]:B[1], bu=s.dir<0?B[1]:B[0];
        if(b.front) S.exits.push(Object.assign({id:b.id+'_front',block:b.id,to:'street',entrance:true},doorOn({axis:'u',at:fu,from:B[2],to:B[3]},0.5,RULES.front.w)));
        S.exits.push(Object.assign({id:b.id+'_back',block:b.id,to:'outside'},doorOn({axis:'u',at:bu,from:B[2],to:B[3]},0.5,RULES.door.w)));
        if(!b.front) flags.push(`${b.p.name}: not on the street front, so its main door is not a street entrance (?)`); }
      S.walls.push(...walls(rs.concat(cuts),[B])); }
    prog.push({id:b.id,name:b.p.name,storeys:n,storeyH:r2(sh),gross:r2(area(B)*n),net:r2(net),asked:Math.round(b.q.m2||0),cores:n>1?['2 stairs','1 lift']:[],short:r2(Math.max(0,(b.q.m2||0)-net))});
    if(n>1&&(b.q.m2||0)-net>0.5) flags.push(`${b.p.name}: on ${n} storeys, ${Math.round(net)} m² net after its stairs and lift, ${Math.round((b.q.m2||0)-net)} m² short of its ${Math.round(b.q.m2||0)} m²`); });
  /* 3. step-free entrances: the ground storey slab against the street at each street door */
  const g=M.grade||{}, fcl=g.fcl, slab=fcl?Math.max(fcl.v,g.min||0):null;
  const entrances=Object.values(storeys).flatMap(S=>S.exits.filter(e=>e.entrance).map(e=>({id:e.id,block:e.block,u:e.u,v:e.v,slab_m:slab!=null?r2(slab):null,slabWhy:fcl?`at least the flood construction level ${fcl.v} m (${fcl.datum}; datum against the LiDAR not confirmed ?)`:'?',
    streetGrade_m:null,stepFree:'?',rule:RULES.ramp.why+(g.min!=null?`. Lot grade ${g.min}–${g.max} m, median ${g.med} m (datum ${g.datum}): if the street at the door differs from the slab by Δh, a 1:12 ramp of 12 × Δh m (plus landings, ?) runs inside the entrance; a lowered entrance floor at street grade is the alternative where the street is below the slab`:'')})));
  const out=Object.values(storeys).sort((a,b)=>a.z-b.z);
  return {rules:RULES,storeys:out,programs:prog,entrances,flags,version:'rule sheet v0 (7 Nov 2026)'}; }
BD.plan={build,RULES};
})();
