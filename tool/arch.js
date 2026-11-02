/* Beyond Data — Architecture mode (J.B. with Xun, 30 Oct 2026; build 2 Nov 2026; checks/architecture_mode_notes_2026-10-30.md).
   A fourth template. You pick public programs; the tool places them with the data centre by rules, as simple massing, and tests
   two budgets (space, heat) and the rules each arrangement passes or fails. You resize, lock, delete and choose options; you set the
   secure line from presets. Economics are not used to rank anything; there is no total score.
   Every size, temperature, occupancy, zoning status and distance comes from tool/arch_programs.json, built only from checked register
   sources (checks/research_arch_v1/CATALOGUE_BRIEF.md). A missing value is "?" and never guessed. Where the drawing needs a number no
   source gives (where a box sits, a 3 m gap between separate buildings), it is drawn, labelled "drawn, not a rule". */
(function(){
'use strict';
const BD=window.BD; const {$,esc}=BD;
const CAT={list:null,byId:{},src:{},kind:{}};
const A=BD.arch={picks:[],secure:'suggest',view:'3d',explode:false,heat:null,storey:0,sel:null,saved:[],ready:null};
const n0=v=>v==null||!isFinite(v)?'?':Math.round(v).toLocaleString('en-CA');
const rg=(a,u)=>!a?'?':(a[0]===a[1]?n0(a[0]):n0(a[0])+'–'+n0(a[1]))+(u?' '+u:'');
const mid=a=>a?(a[0]+a[1])/2:null;

/* ---------- data ---------- */
A.ready=Promise.all([fetch('arch_programs.json').then(r=>r.json()),fetch('opps.json').then(r=>r.ok?r.json():{}).catch(()=>({}))]).then(([P,O])=>{
  CAT.list=P.programs; P.programs.forEach(p=>CAT.byId[p.id]=p); CAT.src=O.sources||{}; CAT.kind=O.source_kinds||{}; CAT.meta=P.meta; }).catch(e=>console.warn('arch data',e));
function chips(ids){ if(!ids||!ids.length) return '<span class="asrc q" title="no source">?</span>';
  return ids.map(i=>`<span class="asrc" tabindex="0" title="${esc((CAT.kind[i]?CAT.kind[i].toUpperCase()+': ':'')+(CAT.src[i]||'(source text not in this build)'))}">${esc(i)}</span>`).join(''); }
const GROUP=[['care','Care and refuge'],['wet','Water'],['grow','Growing and drying'],['public','Public and heated'],['energy','Energy'],['system','Systems (feed the budgets; not drawn as blocks)']];

/* ---------- picks ---------- */
function pickOf(id){ return A.picks.find(q=>q.id===id); }
function add(id){ const p=CAT.byId[id]; if(!p||pickOf(id)) return; const s=p.size||{};
  const q={id, m2:s.typical_m2!=null?s.typical_m2:null, lock:false, opt:p.options&&p.options[0]?p.options[0].id:null, storeys:Math.max(1,s.storeys_typ||1), place:'lot'};
  if(id==='refuge') q.opt=null; /* J.B. 1 Nov 2026: three options, no default */
  A.picks.push(q); }
function del(id){ A.picks=A.picks.filter(q=>q.id!==id); if(A.sel===id) A.sel=null; }
function minOf(p){ const s=p.size||{}; if(s.min_m2!=null) return s.min_m2; if(s.step&&s.step.units_min!=null&&s.step.m2_per_unit!=null) return s.step.units_min*s.step.m2_per_unit; return null; }
function stepOf(p){ const s=p.size||{}; return s.step&&s.step.m2_per_unit?s.step.m2_per_unit:null; }

/* ---------- the site, from the model the rest of the tool uses ---------- */
function site(){ const M=BD.model&&BD.model(); const G=BD.siteGeo; if(!M||!M.F||!G||M.existing||!M.uBuild) return null;
  const R=BD.eng.R, ftf=R.ftf, Z=M.Z||{}, F=M.F, dir=M.dir, v0=M.v[0], v1=M.v[1], W=v1-v0;
  let a0=M.uBuild[0]; if(M.plantYardDepth) a0+=dir*M.plantYardDepth; const uf=M.uFront, L=Math.abs(uf-a0);
  const floors=Math.max(1,M.nF[0]), sf=M.serverFoot?BD.area(M.serverFoot):(M.footArea||0);
  const hallM2=M.sizedTo?M.sizedTo.floor:sf*floors;
  return {M,F,G,R,ftf,Z,dir,v0,v1,W,a0,uf,L,floors,hallM2,hallFoot:sf,H:M.H,lot:M.lotArea,fsr:Z.fsr||null,city:M.city}; }

/* ---------- placement by rules (a diagram, not a design) ---------- */
/* Every block keeps its full size. Each program is tried at every spot of a 2 m grid over the buildable area (front to back, side to side), in
   a few proportions; a spot's base is the top of whatever is already under it (the hall, roof plant, other programs), so nothing collides and
   nothing floats. Yard plant, the plant yard and loading are no-go, widened by the largest hard distance a picked program must keep from them.
   Lowest base wins, then nearest the street. At-grade programs only at grade; programs that must not be at grade only above it. If a program
   does not fit on one floor it is drawn over more storeys and the tool says so. Review 2 Nov 2026 (checks/agents/2026-11-02_arch_mode_review.md). */
function zoneCode(){ const s=BD.S.sel||{}, a=s.a||[]; return String(s.city==='van'?(a[1]||''):(a[2]||a[1]||'')).toUpperCase().trim(); }
function place(){ const s=site(); if(!s) return null; const {F,G,dir,v0,v1,W,a0,uf,ftf}=s; const out={s,boxes:[],flags:[],hall:null,levels:[]};
  const refuge=pickOf('refuge'), under=refuge&&refuge.opt==='under_hall';
  const toL=r=>{ const o=[]; for(let k=0;k<r.length;k+=2) o.push(F.toL(r[k],r[k+1])); return o; }, ext=r=>{ const L=toL(r); return [Math.min(...L.map(p=>p[0])),Math.max(...L.map(p=>p[0])),Math.min(...L.map(p=>p[1])),Math.max(...L.map(p=>p[1]))]; };
  // the hall where the set-up's model puts it (centred in the buildable area; its roof plant sits on it)
  const hf=s.M.serverFoot||s.M.foot; let [hu0,hu1,hv0,hv1]=ext(hf); const um=[Math.min(a0,uf),Math.max(a0,uf)];
  if(under){ /* the hall gives up its ground floor: the same floor over one floor fewer (our arithmetic) */ const k=s.floors/Math.max(1,s.floors-1), cu=(hu0+hu1)/2; const wu=Math.min((hu1-hu0)*k,um[1]-um[0]); hu0=Math.max(um[0],cu-wu/2); hu1=Math.min(um[1],hu0+wu); }
  const hallBase=under?ftf.ground:0, hallH=Math.max(ftf.ground,s.H-hallBase), hallTop=hallBase+hallH;
  out.hall={ring:G.rectW(F,hu0,hu1,hv0,hv1),base:hallBase,h:hallH,u:[hu0,hu1],v:[hv0,hv1],kind:'hall'};
  if(under) out.flags.push({t:`The refuge under the hall takes the hall's ground floor; the hall's floor is spread over the ${Math.max(1,s.floors-1)} floor${s.floors-1===1?'':'s'} above (our arithmetic). The rest of that ground floor is drawn empty.`,src:['arch_up_vanZDB10'],sev:'note'});
  const keep=w=>Math.max(0,...A.picks.map(q=>CAT.byId[q.id]).filter(Boolean).flatMap(p=>(p.adj||[]).filter(a=>a.rule==='keep apart'&&a.hard&&a.m!=null&&a.with===w&&!/evaporative/i.test(a.note||'')).map(a=>a.m)));
  const kG=keep('generators'), kC=keep('chillers'), kL=keep('loading');
  // what is already there: [u0,u1,v0,v1,zBase,zTop,noGo]
  const occ=[[hu0,hu1,hv0,hv1,0,hallTop,false]]; // the hall: built from the ground (or the refuge's floor) to its roof
  for(const b of (s.M.plant&&s.M.plant.boxes||[])){ const e=ext(b.clear||b.ring); if(b.kind==='roof'){ occ.push([e[0],e[1],e[2],e[3],0,1e9,true]); continue; } // roof plant: open to the sky, nothing built over it (review 2, N2)
    const k=b.name.indexOf('generator')>=0?kG:kC; occ.push([e[0]-k,e[1]+k,e[2]-k,e[3]+k,0,1e9,true]); }
  if(s.M.plant&&s.M.plant.yard){ const y=BD.geo.clip(s.M.ring,s.M.plant.yard); if(y&&y.length>=6){ const e=ext(y); occ.push([e[0],e[1],e[2],e[3],0,1e9,true]); } }
  if(s.M.loading){ const e=ext(s.M.loading); occ.push([e[0]-kL,e[1]+kL,e[2]-kL,e[3]+kL,0,1e9,true]); }
  const bu0=um[0], bu1=um[1], bw=v1-v0, bl=bu1-bu0, cs=2, nU=Math.max(1,Math.floor(bl/cs)), nV=Math.max(1,Math.floor(bw/cs));
  // a 2 m height grid over the buildable area: the top of what stands on each cell, or no-go (review 2, N1: a block must rest flat on what is under it)
  const HG=()=>{ const g=new Float64Array(nU*nV); for(let i=0;i<nU;i++) for(let j=0;j<nV;j++){ const u=dir<0?bu0+(i+0.5)*cs:bu1-(i+0.5)*cs, v=v0+(j+0.5)*cs; let t=0; for(const o of occ){ if(u>o[0]&&u<o[1]&&v>o[2]&&v<o[3]){ if(o[6]){ t=Infinity; break; } t=Math.max(t,o[5]); } } g[i*nV+j]=t; } return g; };
  const masses=A.picks.map(q=>({q,p:CAT.byId[q.id]})).filter(x=>x.p&&x.p.kind==='mass'&&!(x.q.id==='refuge'&&under));
  const prio=x=>(x.p.place&&x.p.place.street_entrance?0:x.p.place&&x.p.place.grade==='at grade'?1:x.p.place&&x.p.place.public?2:3);
  masses.sort((a,b)=>prio(a)-prio(b));
  if(under&&refuge&&refuge.m2){ const fp=Math.min(refuge.m2,(hu1-hu0)*(hv1-hv0)), d=Math.min(hu1-hu0,fp/Math.max(1,hv1-hv0)); const ua=dir<0?hu0:hu1-d, ub=dir<0?hu0+d:hu1;
    out.boxes.push({id:'refuge',p:CAT.byId.refuge,q:refuge,ring:G.rectW(F,ua,ub,hv0,hv1),base:0,h:ftf.ground,storeys:1,sh:ftf.ground,front:Math.abs((dir<0?ua:ub)-uf)<0.6,underHall:true,u:[ua,ub],v:[hv0,hv1]}); }
  out.notDrawn=[];
  for(const x of masses){ const {q,p}=x, nm=p.name.split(' (')[0];
    if(q.m2==null){ out.flags.push({t:`${nm}: no sourced typical size; type one to place it.`,src:p.size&&p.size.src,sev:'q'}); continue; }
    if(q.id==='refuge'&&!q.opt){ out.flags.push({t:'Refuge: choose a placement (own building, side by side, or under the hall). There is no default (J.B., 1 Nov 2026).',src:[],sev:'q'}); out.notDrawn.push(q.id); continue; }
    const grade=p.place&&p.place.grade, atG=grade==='at grade', notG=grade==='not at grade'&&notAtGradeHere(p), roof=q.place==='roof';
    const sh=(p.size&&p.size.floor_height_m||ftf.ground), own=q.id==='refuge'&&q.opt==='own_building', gc=own?2:0; // own building: one 2 m cell clear all round (drawn, not a rule)
    const g=HG(); let best=null, st0=Math.max(1,q.storeys||1), st=st0;
    for(;st<=8&&!best;st++){ const fp=q.m2/st;
      for(const [wc0,dc0] of [[nV,Math.ceil(fp/(nV*cs*cs))],...[1,0.5,2,0.25,4].map(a=>{ const w=Math.sqrt(fp/a)/cs, d=fp/(w*cs*cs); return [Math.ceil(w),Math.ceil(d)]; })]){ const wc=Math.min(wc0,nV), dc=Math.ceil(fp/(wc*cs*cs)); if(dc>nU||wc<1) continue;
        for(let i=0;i+dc<=nU;i++) for(let j=0;j+wc<=nV;j++){ let base=-1, ok=true;
          for(let a=i-gc;a<i+dc+gc&&ok;a++) for(let b=j-gc;b<j+wc+gc;b++){ if(a<0||b<0||a>=nU||b>=nV){ if(gc) continue; ok=false; break; } const t=g[a*nV+b]; const inF=a>=i&&a<i+dc&&b>=j&&b<j+wc;
            if(t===Infinity){ ok=false; break; } if(!inF){ if(t>0) { ok=false; break; } continue; } if(base<0) base=t; else if(Math.abs(t-base)>0.1){ ok=false; break; } if(own&&t>0){ ok=false; break; } }
          if(!ok) continue; if(roof&&base<hallTop-0.01) continue; if(atG&&base>0) continue; if(notG&&base===0) continue;
          const sc=base*1e4+i*10+j*0.01; if(!best||sc<best.sc) best={sc,base,i,j,dc,wc}; }
      }
      if(best) break; }
    if(!best){ out.flags.push({t:`${nm}: no room that meets its placement rules (${atG?'at grade':notG?'not at grade':roof?'on the hall roof':'flat on the ground or on what is built'}); not drawn.`,src:p.place&&p.place.src,sev:'bad',id:q.id}); out.notDrawn.push(q.id); continue; }
    if(st>st0) out.flags.push({t:`${nm}: ${n0(q.m2)} m² does not fit on one floor here; drawn over ${st} storeys only to show its size. Whether it can be split across floors is a design question.`,src:[],sev:'bad',id:q.id});
    const {base,i,j,dc,wc}=best, hh=sh*st, uA=dir<0?bu0+i*cs:bu1-(i+dc)*cs, uB=uA+dc*cs, vA=v0+j*cs, vB=vA+Math.min(wc*cs,q.m2/st/(dc*cs)), gap=gc*cs; // exact area: full cells along u, the width trimmed to the size
    occ.push([uA,uB,vA,vB,base,base+hh,false]); if(own) occ.push([uA-gap,uB+gap,vA-gap,vB+gap,0,1e9,true]);
    out.boxes.push({id:q.id,p,q,ring:G.rectW(F,uA,uB,vA,vB),base,h:hh,storeys:st,sh,front:base===0&&Math.abs((dir<0?uA:uB)-uf)<cs+0.01,top:base>=hallTop-0.01,roof,u:[uA,uB],v:[vA,vB],gap,own}); }
  const top=Math.max(hallTop,...out.boxes.map(b=>b.base+b.h));
  if(s.H&&top>s.H+0.01) out.flags.push({t:`Stacked to about ${n0(top)} m; this zone allows ${n0(s.H)} m.`,src:s.city==='van'?['van_zdb_i2','van_zdb_i3']:['edm_bl20001'],sev:'bad'});
  out.boxes.forEach(b=>{ const sh=b.sh||ftf.ground; b.level=Math.floor(b.base/ftf.ground+0.01); b.levels=[...new Set(Array.from({length:b.storeys||1},(_,k)=>Math.floor((b.base+k*sh)/ftf.ground+0.01)))]; }); // plan storeys by height, each storey at its own height (review 2, N12)
  out.levels=[...new Set(out.boxes.flatMap(b=>b.levels))].sort((a,b)=>a-b);
  out.hallDepth=hu1-hu0; out.hallTop=hallTop; return out; }
function notAtGradeHere(p){ /* catalogue: Vancouver I-3 and FC-2 bar some uses at the ground floor; elsewhere no such rule */ const z=zoneCode(); return /I-3|FC-2/.test(z)&&BD.S.sel&&BD.S.sel.city==='van'; }

/* ---------- budgets ---------- */
function budgets(P){ const s=P.s, nd=new Set(P.notDrawn||[]); const r=BD.eng.calc({mw:BD.S.answers.mw||(s.M.mwSized)||1,recover:true},BD.eng.siteFacts(),[],[]);
  const use=A.picks.filter(q=>!nd.has(q.id)).map(q=>{ const p=CAT.byId[q.id]; const k=p&&p.heat&&p.heat.kWh_m2_yr; return {id:q.id,p,m2:q.m2,mwh:(k&&q.m2!=null)?[k[0]*q.m2/1000,k[1]*q.m2/1000]:null}; });
  const progM2=use.filter(u=>u.p&&u.p.kind==='mass'&&u.m2!=null).reduce((t,u)=>t+u.m2,0);
  const capF=s.fsr&&s.lot?s.lot*s.fsr[1]:null, capE=s.L*s.W*s.floors, cap=capF!=null?Math.min(capF,capE):capE; const space={hall:s.hallM2,prog:progM2,cap,capF,capE,left:cap!=null?cap-s.hallM2-progM2:null,items:use.filter(u=>u.p&&u.p.kind==='mass'&&u.m2!=null)};
  const heatUse=use.filter(u=>u.mwh), heatQ=use.filter(u=>u.p&&u.p.kind==='mass'&&!u.mwh&&u.p.heat&&u.p.heat.uses==='heat');
  const need=[heatUse.reduce((t,u)=>t+u.mwh[0],0),heatUse.reduce((t,u)=>t+u.mwh[1],0)];
  return {space,heat:{avail:r.avail||null,need,items:heatUse,unknown:heatQ},notDrawn:[...nd]}; }

/* ---------- rules ---------- */
function dist(a,b){ if(inside([a[0],a[1]],b)||inside([b[0],b[1]],a)) return 0; let m=1e9; const seg=(px,py,x1,y1,x2,y2)=>{ const dx=x2-x1, dy=y2-y1, l=dx*dx+dy*dy||1; let t=((px-x1)*dx+(py-y1)*dy)/l; t=Math.max(0,Math.min(1,t)); return Math.hypot(px-x1-t*dx,py-y1-t*dy); };
  const one=(r1,r2)=>{ for(let i=0;i<r1.length;i+=2) for(let j=0;j<r2.length;j+=2){ const k=(j+2)%r2.length; m=Math.min(m,seg(r1[i],r1[i+1],r2[j],r2[j+1],r2[k],r2[k+1])); } };
  one(a,b); one(b,a); return m; }
function insideAny(pt,L){ return (L||[]).some(r=>inside(pt,r)); }
function inside(pt,r){ let c=false; for(let i=0,j=r.length-2;i<r.length;j=i,i+=2){ const xi=r[i],yi=r[i+1],xj=r[j],yj=r[j+1]; if(((yi>pt[1])!==(yj>pt[1]))&&(pt[0]<(xj-xi)*(pt[1]-yi)/(yj-yi)+xi)) c=!c; } return c; }
function plantRings(M){ const P=M.plant||{}, gens=[], cool=[]; (P.boxes||[]).forEach(b=>{ const r=Float64Array.from(b.ring); r.z=[b.base||0,(b.base||0)+(b.h||0)]; (b.name.indexOf('generator')>=0?gens:cool).push(r); }); return {gens,cool,yard:P.yard?BD.geo.clip(M.ring,P.yard):null,loading:M.loading||null}; }
function dist3(b,r){ const d=dist(b.ring,r), z=r.z||[0,0], dz=Math.max(0,b.base-z[1],z[0]-(b.base+b.h)); return Math.hypot(d,dz); } // plan distance with the height between them (our arithmetic)
function secureRing(P){ const s=P.s, M=s.M;
  if(A.secure==='lot') return [M.ring];
  if(A.secure==='hall') return [P.hall.ring];
  if(A.secure==='wall') return [P.hall.ring,...P.boxes.filter(b=>!b.own&&b.base===0&&!b.underHall).map(b=>b.ring)];
  const rs=[P.hall.ring,...(M.plant&&M.plant.boxes||[]).filter(b=>b.kind!=='roof').map(b=>b.clear||b.ring)]; if(M.plant&&M.plant.yard) rs.push(BD.geo.clip(M.ring,M.plant.yard)); if(M.loading) rs.push(M.loading);
  return rs.filter(r=>r&&r.length>=6); } // suggested: a closed line around each required part (hall, yard plant, plant yard, loading); it may be several
function secArea(P){ /* the union of the secure line's parts, sampled on a 1 m grid inside the lot (our arithmetic) */ const r=P.s.M.ring, sec=P.secRing||[]; let a=1e9,b=1e9,c=-1e9,d=-1e9; for(let i=0;i<r.length;i+=2){ a=Math.min(a,r[i]); b=Math.min(b,r[i+1]); c=Math.max(c,r[i]); d=Math.max(d,r[i+1]); }
  let n=0, m=0; for(let x=a+0.5;x<c;x+=1) for(let y=b+0.5;y<d;y+=1){ if(!inside([x,y],r)) continue; n++; if(insideAny([x,y],sec)) m++; } return n?[m,n]:[0,0]; }
function zoneMatch(str,code){ /* "BE only (IM, IH not permitted)", "I-2, I-3 (A), FC-2; I-1C Social Service Centre only", "not listed in I-2, I-3, FC-2" */
  if(!str||!code) return '?'; const re=new RegExp('(^|[^A-Z0-9-])'+code.replace(/[-]/g,'\\-')+'(?![A-Z0-9])'); const segs=String(str).toUpperCase().split(/[;(]/);
  const seg=segs.find(x=>re.test(x)); if(/^\s*NONE\s*$/i.test(str)) return 'rezoning'; if(!seg){ return /\bONLY\b/i.test(str)?'no':'?'; } if(/\bONLY\b/.test(seg)&&seg.replace(re,'').trim().length>4) return 'only'; if(/NOT PERMITTED|\bNP\b/.test(seg)) return 'no'; if(/NOT LISTED/.test(seg)) return 'rezoning'; return 'yes'; }
function rules(P){ const s=P.s, M=s.M, city=s.city, code=zoneCode(), out=[...P.flags]; const PR=plantRings(M), sec=secureRing(P); const evap=(M.plant&&M.plant.boxes||[]).filter(b=>/tower|evapor|adiabatic/i.test(b.name)).map(b=>b.ring); P.secRing=sec;
  const cen=r=>BD.centroid(r);
  const need=[['plant yard',PR.yard],['loading',PR.loading],['generators',PR.gens[0]]].filter(x=>x[1]);
  const inAny=r=>{ for(let i=0;i<r.length;i+=2) if(insideAny([r[i],r[i+1]],sec)) return true; return insideAny(cen(r),sec); }; const outReq=A.secure==='suggest'?[]:need.filter(([n,r])=>!inAny(r)).map(x=>x[0]); // suggested line holds them by construction (review 2, N4) if(outReq.length) out.push({t:`Outside the secure line: ${outReq.join(', ')}. The suggested line keeps the hall, plant and loading inside.`,src:['arch_sec_gcpsg015AppC'],sev:'bad'});
  for(const b of P.boxes){ const p=b.p, nm=p.name.split(' (')[0], q=b.q;
    if(p.place&&p.place.public&&insideAny(cen(b.ring),sec)){
      if(b.underHall&&A.secure!=='lot') out.push({t:`${nm} sits under the hall: outside the line at grade, with a 2 h floor between (a design choice).`,src:['arch_nbc3131'],sev:'note',id:b.id});
      else if(b.top&&A.secure!=='lot') out.push({t:`${nm} sits above the hall roof: treated as outside the line, reached by its own stair (a design choice; J.B. default 2 Nov 2026).`,src:[],sev:'note',id:b.id});
      else { out.push({t:`${nm} is public but inside the secure line.`,src:p.place.src,sev:'bad',id:b.id}); b.bad=true; } }
    const z=p.zoning&&p.zoning[city]; if(z){ const zs=city==='van'?z.districts:z.zones, m=zoneMatch(zs,code);
      const st=m==='no'?'not permitted':m==='rezoning'?'rezoning':z.status||'?', only=m==='only'?' (only part of the use is listed here: '+((zs.toUpperCase().split(/[;(]/).find(x=>x.includes(code))||'').trim())+')':'';
      if(m==='?'&&st!=='?') out.push({t:`${nm}: ${st} in ${city==='van'?'Vancouver':'Edmonton'}${zs?' ('+zs+')':''}; whether that covers ${code||'this zone'} is not confirmed (?).`,src:z.src,sev:'q',id:b.id});
      else if(st!=='permitted') { const sev=st==='conditional'?'note':st==='?'?'q':'bad'; out.push({t:`${nm} in ${code||'this zone'}: ${st==='?'?'zoning not confirmed (?)':st}${z.use?' ('+z.use+')':''}${only}.`,src:z.src,sev,id:b.id}); if(sev==='bad') b.bad=true; }
      if(z.cap_m2&&city==='edm'&&code==='BE'&&q.m2>z.cap_m2){ out.push({t:`${nm}: ${n0(q.m2)} m² is over the ${n0(z.cap_m2)} m² cap for this use in BE.`,src:z.src,sev:'bad',id:b.id}); b.bad=true; } }
    const C=q.id==='warming_shelter'&&q.opt==='overnight'; if(C&&city==='van') out.push({t:`Overnight shelter in Vancouver: no listed use found for overnight stays in this district (?).`,src:z?z.src:[],sev:'q',id:b.id});
    if(!b.own){ if(C) out.push({t:`Overnight shelter is residential (C): it uses the one residential suite an F-2 building may hold; a second residential use would need its own building. Fire separation from F-2 for C ? here.`,src:['arch_nbc3131'],sev:'note',id:b.id});
      else if(p.occ&&p.occ.sep_h_from_F2!=null){ if(p.occ.sep_h_from_F2>0) out.push({t:`${nm}: ${p.occ.group}, ${p.occ.sep_h_from_F2} h fire separation from the data centre (F-2).`,src:p.occ.src,sev:'note',id:b.id}); }
      else out.push({t:`${nm}: fire separation from the data centre (F-2) ? (occupancy ${p.occ&&p.occ.group||'?'}).`,src:p.occ&&p.occ.src,sev:'q',id:b.id}); }
    else out.push({t:`${nm} as its own building: spacing to the data centre is drawn at 3 m, not a rule; the rule (NBC 3.2.3 or a 4 h firewall if joined) is not applied yet (?).`,src:['arch_nbc3131'],sev:'q',id:b.id});
    const nc=[], ncS=[]; for(const a of (p.adj||[])){ if(a.rule!=='keep apart'){ if(!(a.with==='street')){ const t=`${a.rule} ${a.with}`; if(!nc.includes(t)){ nc.push(t); ncS.push(...(a.src||[])); } } continue; } const tg={generators:PR.gens,chillers:/evaporative/i.test(a.note||'')?evap:PR.cool,loading:PR.loading?[PR.loading]:[],fuel:PR.gens}[a.with];
      if(a.m==null||!tg){ const t=`${a.with} (${a.m==null?'no distance in the source':'not modelled'})`; if(!nc.includes(t)){ nc.push(t); ncS.push(...(a.src||[])); } continue; } if(!tg.length) continue;
      const d=Math.min(...tg.map(r=>dist3(b,r))); if(d<a.m){ out.push({t:`${nm} is ${n0(d)} m from the ${a.with}; ${a.note||('keep '+a.m+' m')}.`,src:a.src,sev:a.hard?'bad':'note',id:b.id}); if(a.hard) b.bad=true; } }
    if(nc.length) out.push({t:`${nm}: keep-apart rules not checked here: ${nc.join('; ')}.`,src:[...new Set(ncS)],sev:'q',id:b.id});
    if(p.place&&p.place.street_entrance&&!b.front) out.push({t:`${nm} needs its own street entrance; it is not on the street front here.`,src:p.place.src,sev:'note',id:b.id});
  }
  return out; }

/* ---------- the heat a program needs, against what the hall gives ---------- */
function dcTemp(){ return (BD.S.answers.inside||'air')==='air'?[25,35]:[50,60]; } // register heat_temp by cooling type: air-cooled 25–35 °C; liquid 50–60 °C (unverified, ?)
function lift(p){ const t=p.heat&&p.heat.supply_C; if(!t) return null; const d=dcTemp(); return t[1]<=d[0]?'direct':t[1]<=d[1]?'partly':t[1]<=70?'heat pump':'hotter than 70 °C'; }

/* ---------- panel ---------- */
const CSS=`.arow{border-top:1px solid var(--line);padding:8px 0;display:grid;gap:4px}.arow.sel{border-color:var(--accent)}.arow h4{margin:0;font-weight:400;font-size:13px;display:flex;gap:6px;align-items:center;cursor:pointer}
.arow h4 .nm{flex:1;min-width:0}.arow .ctl{display:flex;gap:6px;align-items:center;flex-wrap:wrap;font-size:12px}.arow input[type=number]{width:76px;font:inherit;background:transparent;color:inherit;border:1px solid var(--line-2);border-radius:4px;padding:1px 4px}
.arow button,.abar button,.aview button{font:inherit;font-size:11.5px;background:transparent;color:inherit;border:1px solid var(--line-2);border-radius:4px;padding:1px 7px;cursor:pointer}.abar button[aria-pressed=true],.aview button[aria-pressed=true]{border-color:var(--accent);color:var(--accent)}
.asrc{display:inline-block;font-size:10px;border:1px solid var(--line-2);border-radius:3px;padding:0 3px;margin:0 2px;color:var(--muted);cursor:help}.asrc.q{border-style:dashed}
.abud{margin:6px 0 10px}.abud .lab{font-size:11.5px;color:var(--muted);display:flex;justify-content:space-between;gap:8px}.abud .bar{display:flex;height:10px;border:1px solid var(--line-2);border-radius:3px;overflow:hidden;margin-top:3px}
.abud .bar i{display:block;height:100%;border-right:1px solid var(--bg);background:var(--line-2)}.abud .bar i.h{background:#6b6964}.abud .bar i.s{background:var(--accent)}.abud .bar i.o{background:#8a8780}
.aflag{font-size:12px;margin:3px 0;padding-left:12px;position:relative}.aflag:before{content:'';position:absolute;left:0;top:7px;width:6px;height:6px;border-radius:50%;background:var(--line-2)}.aflag.bad:before{background:var(--accent)}.aflag.q:before{background:transparent;border:1px dashed var(--line-2)}
.apick{display:flex;justify-content:space-between;gap:8px;padding:3px 0;font-size:12.5px;border-bottom:1px solid var(--line)}.apick small{color:var(--muted)}.agrp{margin-top:12px}
.aview{position:absolute;left:64px;bottom:12px;z-index:5;display:flex;gap:6px;flex-wrap:wrap;background:rgba(23,24,26,.85);padding:6px;border-radius:6px}
#aPlan{position:absolute;left:0;right:0;top:0;bottom:56px;z-index:4;background:var(--bg);display:none;padding:12px 16px}#aPlan svg{width:100%;height:100%}
.acmp{width:100%;border-collapse:collapse;font-size:12px}.acmp td,.acmp th{border-top:1px solid var(--line);padding:4px;text-align:left;vertical-align:top;font-weight:300}.acmp th{color:var(--muted)}`;
function css(){ if(!document.getElementById('archCss')){ const st=document.createElement('style'); st.id='archCss'; st.textContent=CSS; document.head.appendChild(st); } }

function rowHTML(q){ const p=CAT.byId[q.id]; if(!p) return ''; const s=p.size||{}, mn=minOf(p), st=stepOf(p), sel=A.sel===q.id;
  const opt=(p.options||[]).length?`<label>${q.id==='refuge'?'Placement':'Option'} <select data-o="${q.id}">${q.id==='refuge'&&!q.opt?'<option value="">choose…</option>':''}${p.options.map(o=>`<option value="${o.id}"${o.id===q.opt?' selected':''}>${esc(o.name)}</option>`).join('')}</select></label>`:'';
  const roofOK=p.kind==='mass'&&p.place&&p.place.grade==='roof ok';
  const size=p.kind==='mass'?`<label>Size <input type="number" data-m="${q.id}" min="${mn||0}" step="${st||10}" value="${q.m2==null?'':Math.round(q.m2)}" placeholder="?"> m²</label>
     <button data-st="${q.id}" data-d="-1" title="${st?'one '+esc(s.step.unit)+' less':'smaller'}">−</button><button data-st="${q.id}" data-d="1" title="${st?'one '+esc(s.step.unit)+' more':'larger'}">+</button>
     <label><input type="checkbox" data-l="${q.id}"${q.lock?' checked':''}> lock</label><label>Storeys <input type="number" data-sy="${q.id}" min="1" max="6" value="${q.storeys}" style="width:44px"></label>
     ${roofOK?`<label><select data-pl="${q.id}"><option value="lot"${q.place==='lot'?' selected':''}>on the lot</option><option value="roof"${q.place==='roof'?' selected':''}>on the hall roof</option></select></label>`:''}`:'';
  const ch=q.opt&&(p.options||[]).find(o=>o.id===q.opt);
  return `<div class="arow${sel?' sel':''}" data-row="${q.id}"><h4 data-sel="${q.id}"><span class="nm">${esc(p.name)}</span><button data-x="${q.id}" title="delete">✕</button></h4>
   <div class="ctl">${size}${opt}</div>
   <div class="sub" style="font-size:11.5px">${p.kind==='mass'?`Typical ${s.typical_m2!=null?n0(s.typical_m2)+' m²':'?'}${mn!=null?`, minimum ${n0(mn)} m²`:', minimum ?'}${s.step&&s.step.unit?` · steps of one ${esc(s.step.unit)}${s.step.m2_per_unit?' ('+s.step.m2_per_unit+' m²)':''}`:''} ${chips(s.src)}${s.note?'<br>'+esc(s.note):''}`:`${esc(s.note||'')} ${chips(s.src)}`}</div>
   ${ch?`<div class="sub" style="font-size:11.5px">${esc(ch.effect)}</div>`:''}
   ${sel?detail(p):''}</div>`; }
function detail(p){ const h=p.heat||{}, o=p.occ||{}, L=lift(p);
  const z=['van','edm'].map(c=>{ const v=p.zoning&&p.zoning[c]; return v?`<li>${c==='van'?'Vancouver':'Edmonton'}: ${esc(v.status||'?')}${v.use?' ('+esc(v.use)+')':''}${v.cap_m2?', up to '+n0(v.cap_m2)+' m²':''} ${chips(v.src)}</li>`:''; }).join('');
  return `<ul class="sub" style="font-size:11.5px;margin:4px 0 0 14px;padding:0">
   <li>Code: ${esc(o.group||'?')}, ${o.sep_h_from_F2==null?'separation ?':o.sep_h_from_F2+' h from the hall'} ${chips(o.src)}${o.note?' — '+esc(o.note):''}</li>
   <li>Heat: room ${rg(h.setpoint_C,'°C')}, supply ${rg(h.supply_C,'°C')}, ${rg(h.kWh_m2_yr,'kWh/m²·yr')}${L?` · ${L==='direct'?'the hall\'s heat can serve it directly':L==='partly'?'direct only at the warm end of the hall\'s range, else a heat pump':L==='heat pump'?'needs a heat pump (to 70 °C)':'hotter than a heat pump reaches (70 °C)'} (hall ${rg(dcTemp(),'°C')}, register heat_temp; liquid range unverified)`:''} ${chips(h.src)}${h.note?' — '+esc(h.note):''}</li>${z}
   ${(p.adj||[]).map(a=>`<li>${esc(a.rule)} ${esc(a.with)}${a.m!=null?' '+a.m+' m':''}${a.hard?'':' (preference)'}: ${esc(a.note||'')} ${chips(a.src)}</li>`).join('')}
   ${(p.flags||[]).map(f=>`<li>${esc(f.replace(/\s*\[[^\]]+\]\s*$/,''))} ${chips((f.match(/\[([^\]]+)\]\s*$/)||[,''])[1].split(/[,;]\s*/).filter(Boolean))}</li>`).join('')}</ul>`; }
function budHTML(B){ const S=B.space, H=B.heat; const cap=S.cap, tot=S.hall+S.prog;
  const seg=(v,of,c,t)=>of?`<i class="${c}" style="width:${Math.max(0,Math.min(100,v/of*100))}%" title="${esc(t)}"></i>`:'';
  const sp=cap?`<div class="abud"><div class="lab"><span>Space: ${n0(tot)} of ${n0(cap)} m² of floor ${S.capF!=null&&S.capF<S.capE?'the zone allows (floor-space ratio)':'that fits inside the setbacks, below the height limit'} ${chips(BD.S.sel&&BD.S.sel.city==='edm'?['edm_bl20001']:['van_zdb_i2','van_zdb_i3'])}</span><span>${S.left<0?'over by '+n0(-S.left):n0(S.left)+' left'}</span></div><div class="bar">${seg(S.hall,Math.max(cap,tot),'h','data centre '+n0(S.hall)+' m²')}${S.items.map(u=>seg(u.m2,Math.max(cap,tot),A.sel===u.id?'s':'',u.p.name+' '+n0(u.m2)+' m²')).join('')}</div></div>`:`<div class="abud"><div class="lab">Space: floor-area limit for this zone not known (?)</div></div>`;
  const av=H.avail, aM=av?av[0]:null; const ht=av?`<div class="abud"><div class="lab"><span>Heat: ${rg(H.need,'MWh/yr')} of ${rg(av,'MWh/yr')} the hall offers (after the heat pump) ${chips(['dea','dfKatalog2022'])}</span><span>${n0(H.need[1]/av[0]*100)}% at most</span></div><div class="bar">${H.items.map(u=>seg(mid(u.mwh),Math.max(aM,H.need[1]),A.sel===u.id?'s':'o',u.p.name+' '+rg(u.mwh,'MWh/yr'))).join('')}</div>${H.unknown.length?`<div class="lab"><span>Not counted, heat demand ?: ${esc(H.unknown.map(u=>u.p.name.split(' (')[0]).join(', '))}</span></div>`:''}</div>`:'';
  const nd=(B.notDrawn||[]).map(i=>CAT.byId[i]&&CAT.byId[i].name.split(' (')[0]).filter(Boolean); return sp+ht+(nd.length?`<div class="abud"><div class="lab">Not drawn, not counted: ${esc(nd.join(', '))}</div></div>`:''); }

/* ---------- steps ---------- */
async function ready(){ css(); await A.ready; if(!CAT.list) throw new Error('arch_programs.json did not load'); }
async function viewPrograms(){ await ready(); BD.S.view2='tab'; const sd=$('#side');
  const groups=GROUP.map(([g,l])=>{ const L=CAT.list.filter(p=>p.group===g); if(!L.length) return ''; return `<div class="agrp"><h4 class="spf">${esc(l)}</h4>${L.map(p=>{ const on=!!pickOf(p.id); const s=p.size||{};
      return `<div class="apick"><span>${esc(p.name)}<br><small>${p.kind==='mass'?(s.typical_m2!=null?'typical '+n0(s.typical_m2)+' m²':'size ?'):esc(p.kind)} · ${esc((p.occ&&p.occ.group)||'?')}</small></span><button data-add="${p.id}" aria-pressed="${on}">${on?'Added':'Add'}</button></div>`; }).join('')}</div>`; }).join('');
  sd.innerHTML=`<h2>Programs</h2><p class="lead">Pick what the site could hold with the data centre. Each starts at a sourced typical size; you set it in the next step.</p>
   <p class="sub">${A.picks.length?`${A.picks.length} picked.`:'Nothing picked yet.'} Hover a grey tag to read its source; "?" means no source was found.</p>${groups}`;
  sd.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{ const id=b.dataset.add; pickOf(id)?del(id):add(id); viewPrograms(); });
  draw3d(); }
async function viewArrange(){ await ready(); BD.S.view2='tab'; const sd=$('#side'); const P=place();
  if(!P){ sd.innerHTML=`<h2>Arrange</h2><p class="lead">Architecture mode needs a new building on a lot with a known shape. Pick a lot and set it up as a new build.</p>`; return; }
  const B=budgets(P), RL=rules(P); A.last={P,B,RL};
  const presets=[['suggest','Suggested'],['lot','Lot line'],['wall','Building wall'],['hall','Hall wall']];
  sd.innerHTML=`<h2>Arrange</h2><p class="lead">The tool places each program by its rules; you resize, lock, delete and choose options. Nothing is scored.</p>${budHTML(B)}${A.msg?`<div class="aflag bad">${esc(A.msg)}</div>`:''}
   <div class="abar ctl" style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;font-size:12px">Secure line ${presets.map(([k,l])=>`<button data-sec="${k}" aria-pressed="${A.secure===k}">${l}</button>`).join('')} ${chips(['arch_sec_gcpsg015AppC'])}</div>
   <p class="sub" style="font-size:11.5px">Suggested: the tightest line that keeps the hall, its plant and loading inside. A design choice, not a rule (J.B., 1 Nov 2026).</p>
   ${A.picks.length?A.picks.map(rowHTML).join(''):'<p class="sub">No programs yet. Go back to add some.</p>'}
   <h3 style="font-size:13px;margin-top:14px">Rules ${RL.filter(r=>r.sev==='bad').length?`<span class="k">${RL.filter(r=>r.sev==='bad').length}</span> flagged`:''}</h3>
   ${RL.length?RL.map(r=>`<div class="aflag ${r.sev}">${esc(r.t)} ${chips(r.src)}</div>`).join(''):'<p class="sub">No rule flags.</p>'}
   <p class="sub" style="font-size:11.5px">Drawn by the tool, not rules: where each block sits (a 2 m grid, front to back), its proportions, a separate refuge building 3 m away, and storeys at ${n0(P.s.ftf.ground)} m where a program's own height has no source (${P.s.city==='van'?'the I-2/I-3 ground-floor minimum':'Vancouver\'s I-2/I-3 ground-floor minimum, used here only as a drawing height'}).</p>
   <p><button id="aSave" class="btn">Save this arrangement</button> <span class="sub">${A.saved.length} saved</span></p>`;
  wire(sd); draw3d(P); }
function wire(sd){ const re=()=>{ A.msg=null; viewArrange(); }, reK=()=>viewArrange();
  sd.querySelectorAll('[data-sec]').forEach(b=>b.onclick=()=>{ A.secure=b.dataset.sec; re(); });
  sd.querySelectorAll('[data-x]').forEach(b=>b.onclick=e=>{ e.stopPropagation(); del(b.dataset.x); re(); });
  sd.querySelectorAll('[data-sel]').forEach(h=>h.onclick=()=>{ A.sel=A.sel===h.dataset.sel?null:h.dataset.sel; re(); });
  sd.querySelectorAll('[data-l]').forEach(c=>c.onchange=()=>{ pickOf(c.dataset.l).lock=c.checked; });
  sd.querySelectorAll('[data-o]').forEach(s=>s.onchange=()=>{ pickOf(s.dataset.o).opt=s.value||null; re(); });
  sd.querySelectorAll('[data-pl]').forEach(s=>s.onchange=()=>{ pickOf(s.dataset.pl).place=s.value; re(); });
  sd.querySelectorAll('[data-sy]').forEach(i=>i.onchange=()=>{ pickOf(i.dataset.sy).storeys=Math.max(1,Math.min(6,+i.value||1)); re(); });
  sd.querySelectorAll('[data-m]').forEach(i=>i.onchange=()=>{ resize(i.dataset.m,i.value===''?null:+i.value); reK(); });
  sd.querySelectorAll('[data-st]').forEach(b=>b.onclick=()=>{ const q=pickOf(b.dataset.st), p=CAT.byId[q.id]; const st=stepOf(p)||Math.max(10,Math.round((q.m2||100)*0.1)); resize(q.id,(q.m2||0)+(+b.dataset.d)*st); reK(); });
  const sv=$('#aSave'); if(sv) sv.onclick=()=>{ snapshot(); re(); }; }
/* resize: the sourced minimum is a floor; a program with no sourced minimum is never shrunk to make room. Growth beyond the space budget is taken
   from unlocked programs (down to their minimums), repeating until the growth is covered; heat-using programs also stop at the heat the hall offers. */
function resize(id,v){ const q=pickOf(id), p=CAT.byId[id]; if(!q) return; const mn=minOf(p); A.msg=null;
  if(v!=null&&mn!=null&&v<mn){ v=mn; A.msg=`${p.name}: ${n0(mn)} m² is its sourced minimum.`; }
  if(v!=null&&v<0) v=0; const old=q.m2||0; q.m2=v; if(v==null||v<=old) return; let P=place(); if(!P) return; let B=budgets(P);
  { const k=p.heat&&p.heat.kWh_m2_yr; if(k&&B.heat.avail&&B.heat.need[1]>B.heat.avail[0]){ const ex=(B.heat.need[1]-B.heat.avail[0])*1000/k[1]; v=Math.max(old,v-ex); q.m2=v; A.msg=`Held at ${n0(v)} m²: the heat it needs would pass the ${n0(B.heat.avail[0])} MWh/yr the hall offers at the low end.`; if(v<=old) return; P=place(); B=budgets(P); } } // heat ceiling first (review 2, N7)
  let over=Math.min(v-old,B.space.left!=null?-B.space.left:0);
  if(over>0){ const noMin=[]; for(let pass=0;pass<12&&over>0.5;pass++){ const others=A.picks.filter(o=>o!==q&&!o.lock&&o.m2!=null&&CAT.byId[o.id].kind==='mass'&&minOf(CAT.byId[o.id])!=null&&o.m2>minOf(CAT.byId[o.id])+0.5);
      if(!others.length) break; const tot=others.reduce((t,x)=>t+x.m2-minOf(CAT.byId[x.id]),0); for(const o of others){ const can=o.m2-minOf(CAT.byId[o.id]), take=Math.min(can,over*can/tot); o.m2-=take; } over-=Math.min(over,tot); }
    A.picks.forEach(o=>{ if(o!==q&&!o.lock&&o.m2!=null&&CAT.byId[o.id].kind==='mass'&&minOf(CAT.byId[o.id])==null) noMin.push(CAT.byId[o.id].name.split(' (')[0]); });
    if(over>0.5){ q.m2=Math.max(old,v-over); A.msg=`Stopped at ${n0(q.m2)} m²: ${B.space.capF!=null&&B.space.capF<B.space.capE?'the zone\'s floor-space ratio':'the room inside the setbacks and height limit'} is used up. Locked programs, programs at their minimum${noMin.length?', and those with no sourced minimum ('+noMin.join(', ')+')':''} keep the rest.`; } }
 }
function snapshot(){ const L=A.last; if(!L) return; const P=L.P, B=L.B, s=P.s; const [m,n]=secArea(P);
  const front=P.boxes.filter(b=>b.front&&b.p.place&&b.p.place.public&&b.v).reduce((t,b)=>t+Math.abs(b.v[1]-b.v[0]),0);
  A.saved.push({n:A.saved.length+1,secure:A.secure,picks:JSON.parse(JSON.stringify(A.picks)),space:B.space,heat:B.heat,bad:L.RL.filter(r=>r.sev==='bad').length,notes:L.RL.length,front,W:s.W,pubShare:n?(n-m)/n:null}); }
async function viewCompare(){ await ready(); BD.S.view2='tab'; const sd=$('#side'); const S=A.saved;
  const row=(l,f)=>`<tr><th>${l}</th>${S.map(x=>`<td>${f(x)}</td>`).join('')}</tr>`;
  sd.innerHTML=`<h2>Compare</h2><p class="lead">Saved arrangements side by side. No total score: each row is a different kind of good.</p>
   ${S.length?`<div style="overflow-x:auto"><table class="acmp"><tr><th></th>${S.map(x=>`<th>Arrangement ${x.n}</th>`).join('')}</tr>
   ${row('Programs',x=>esc(x.picks.map(q=>CAT.byId[q.id].name.split(' (')[0]+(q.m2!=null?' '+n0(q.m2)+' m²':'')).join(', ')))}
   ${row('Secure line',x=>esc({suggest:'suggested',lot:'lot line',wall:'building wall',hall:'hall wall'}[x.secure]))}
   ${row('Floor used',x=>x.space.cap?`${n0(x.space.hall+x.space.prog)} of ${n0(x.space.cap)} m²`:'?')}
   ${row('Heat used (counted programs)',x=>x.heat.avail?`${rg(x.heat.need,'MWh/yr')} of ${rg(x.heat.avail,'MWh/yr')}`:'?')}
   ${row('Street front to public use',x=>`${n0(x.front)} of ${n0(x.W)} m`)}
   ${row('Share of the lot the public can reach',x=>x.pubShare==null?'?':n0(x.pubShare*100)+'%')}
   ${row('Rules flagged',x=>`${x.bad} (of ${x.notes} notes)`)}
   ${row('Controlled doors from street to servers',x=>'? (not modelled yet)')}</table></div>`:'<p class="sub">Save an arrangement in the Arrange step to compare it here.</p>'}
   <p class="sub" style="font-size:11.5px">Street front and public share are our arithmetic on the drawn massing (public share sampled on a 1 m grid); floor and heat carry their sources in Arrange; heat counts only programs with a sourced demand. No row is a source-backed score.</p>`; draw3d(); }

/* ---------- drawing: 3D, plan per storey, section; heat view ---------- */
function warmCool(t){ if(t==null) return null; const k=Math.max(0,Math.min(1,(t-15)/(60-15))); const a=[93,127,153], b=[209,163,94]; return `rgb(${a.map((x,i)=>Math.round(x+(b[i]-x)*k)).join(',')})`; } // heat view only: warm-to-cool, separate from the red accent (J.B., 2 Nov 2026)
async function draw3d(P){ P=P||place(); if(!P||!BD.scene3d) return; if(!P.secRing) rules(P);
  const nf=Math.max(1,P.s.floors-(P.hall.base>0?1:0)), fh=P.hall.h/nf, lv0=P.hall.base>0?1:0;
  const hallB=A.explode?Array.from({length:nf},(_,k)=>({ring:P.hall.ring,base:P.hall.base+k*fh,h:fh,hall:true,level:k+lv0,label:k===nf-1?'Data hall':null})):[{ring:P.hall.ring,base:P.hall.base,h:P.hall.h,hall:true,label:'Data hall'}];
  const boxes=hallB.concat(P.boxes.map(b=>({ring:b.ring,base:b.base,h:b.h,sel:A.sel===b.id,bad:!!b.bad,label:b.p.name.split(' (')[0],level:b.level})));
  await BD.scene3d.show('arch',{site:BD.eng.siteFacts(),boxes,explode:A.explode,secure:P.secRing}); bar(P); const pl=$('#aPlan'); if(A.view!=='3d') plan(P); else if(pl) pl.style.display='none'; }
function bar(P){ const host=document.getElementById('v3d'); if(!host) return; if(P&&P.levels.length&&!P.levels.includes(A.storey)) A.storey=P.levels[0]; let v=$('#aView'); if(!v||v.parentElement!==host){ if(v) v.remove(); v=document.createElement('div'); v.id='aView'; v.className='aview'; host.appendChild(v); }
  const lv=P?P.levels:[]; v.style.display='';
  v.innerHTML=[['3d','3D'],['plan','Plan'],['section','Section']].map(([k,l])=>`<button data-v="${k}" aria-pressed="${A.view===k}">${l}</button>`).join('')+
   (A.view==='3d'?`<button data-ex aria-pressed="${A.explode}">Explode</button>`:'')+(A.view==='plan'&&lv.length?lv.map(l=>`<button data-sy="${l}" aria-pressed="${A.storey===l}">${l===0?'Ground':'Storey '+(l+1)}</button>`).join(''):'')+
   (A.view!=='3d'?`<button data-h="grad" aria-pressed="${A.heat==='grad'}">Heat gradient</button><button data-h="flow" aria-pressed="${A.heat==='flow'}">Heat flow</button>`:'');
  v.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{ A.view=b.dataset.v; draw3d(); });
  v.querySelectorAll('[data-ex]').forEach(b=>b.onclick=()=>{ A.explode=!A.explode; draw3d(); });
  v.querySelectorAll('[data-sy]').forEach(b=>b.onclick=()=>{ A.storey=+b.dataset.sy; draw3d(); });
  v.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{ A.heat=A.heat===b.dataset.h?null:b.dataset.h; draw3d(); }); }
function plan(P){ const host=document.getElementById('v3d'); if(!host||!P) return; let d=$('#aPlan'); if(!d||d.parentElement!==host){ if(d) d.remove(); d=document.createElement('div'); d.id='aPlan'; host.appendChild(d); } d.style.display='block';
  const s=P.s, F=s.F, sec=A.view==='section'; const toUV=r=>{ const o=[]; for(let i=0;i<r.length;i+=2) o.push(F.toL(r[i],r[i+1])); return o; };
  const lotUV=toUV(s.M.ring); const us=lotUV.map(p=>p[0]), vs=lotUV.map(p=>p[1]); const u0=Math.min(...us), u1=Math.max(...us), v0=Math.min(...vs), v1=Math.max(...vs);
  const pad=24, Wd=620, Hd=460; const hMax=Math.max(s.H||20,...P.boxes.map(b=>b.base+b.h),P.hall.base+P.hall.h);
  const sx=(Wd-2*pad)/Math.max(1,u1-u0), sy=sec?(Hd-2*pad)/Math.max(1,hMax*1.15):(Hd-2*pad)/Math.max(1,v1-v0), k=Math.min(sx,sy);
  const X=u=>pad+(u-u0)*k, Y=v=>sec?Hd-pad-v*k:pad+(v-v0)*k;
  const all=[{ring:P.hall.ring,base:P.hall.base,h:P.hall.h,t:mid(dcTemp()),name:'Data hall',hall:true,lvl:'all',lvls:null}].concat(P.boxes.map(b=>({ring:b.ring,base:b.base,h:b.h,t:b.p.heat&&b.p.heat.supply_C?mid(b.p.heat.supply_C):null,name:b.p.name.split(' (')[0],sel:A.sel===b.id,bad:b.bad,lvl:b.level,lvls:b.levels,src:b.p.heat&&b.p.heat.src,mwh:b.p.heat&&b.p.heat.kWh_m2_yr&&b.q.m2?mid(b.p.heat.kWh_m2_yr)*b.q.m2/1000:null})));
  const vis=sec?all:all.filter(b=>b.hall?A.storey*P.s.ftf.ground<b.base+b.h:(b.lvls||[]).includes(A.storey));
  let svg=`<defs><pattern id="aq" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="var(--line-2)" stroke-width="1"/></pattern></defs>`;
  if(!sec){ svg+=`<polygon points="${lotUV.map(p=>X(p[0])+','+Y(p[1])).join(' ')}" fill="none" stroke="var(--line-2)" stroke-width="1"/>`; (s.M.plant&&s.M.plant.boxes||[]).filter(b=>b.kind!=='roof').forEach(b=>{ svg+=`<polygon points="${toUV(b.ring).map(p=>X(p[0])+','+Y(p[1])).join(' ')}" fill="none" stroke="#8a8780" stroke-width=".7"/>`; }); (P.secRing||[]).forEach(r=>{ svg+=`<polygon points="${toUV(r).map(p=>X(p[0])+','+Y(p[1])).join(' ')}" fill="none" stroke="#9d9a94" stroke-dasharray="5 3" stroke-width="1"/>`; }); } else svg+=`<line x1="${X(u0)}" y1="${Y(0)}" x2="${X(u1)}" y2="${Y(0)}" stroke="var(--fg)" stroke-width="1"/>`+(s.H?`<line x1="${X(u0)}" y1="${Y(s.H)}" x2="${X(u1)}" y2="${Y(s.H)}" stroke="var(--line-2)" stroke-dasharray="4 3"/><text x="${X(u0)}" y="${Y(s.H)-5}" font-size="12" fill="var(--muted)">height limit ${n0(s.H)} m</text>`:'');
  const labs=[]; vis.forEach(b=>{ const uv=toUV(b.ring), bu=uv.map(p=>p[0]), bv=uv.map(p=>p[1]); const ua=Math.min(...bu), ub=Math.max(...bu);
    const fill=A.heat==='grad'?(b.t==null?'url(#aq)':warmCool(b.t)):'transparent'; const st=b.bad?'var(--accent)':b.sel?'var(--accent)':'var(--fg)';
    if(sec) svg+=`<rect x="${X(ua)}" y="${Y(b.base+b.h)}" width="${(ub-ua)*k}" height="${b.h*k}" fill="${fill}" fill-opacity="${A.heat==='grad'?.85:0}" stroke="${st}" stroke-width="${b.sel||b.bad?1.6:.8}"/>`;
    else svg+=`<polygon points="${uv.map(p=>X(p[0])+','+Y(p[1])).join(' ')}" fill="${fill}" fill-opacity="${A.heat==='grad'?.85:0}" stroke="${st}" stroke-width="${b.sel||b.bad?1.6:.8}"/>`;
    const cx=(X(ua)+X(ub))/2, cy=sec?Y(b.base+b.h/2):(Y(Math.min(...bv))+Y(Math.max(...bv)))/2; labs.push({cx,cy,t:b.name+(A.heat==='grad'?(b.t==null?' (?)':b.hall?' '+rg(dcTemp(),'°C')+' (heat_temp)':' '+n0(b.t)+' °C'):''),hall:b.hall,mwh:b.mwh,b}); });
  // labels off the drawing on right-angled leaders (J.B.: 90° leaders; labels beside, never on)
  const right=Math.max(...[X(u1)])+28; let last=-1e9; labs.sort((a,b)=>a.cy-b.cy).forEach((L,i,arr)=>{ const ly=Math.max(L.cy,last+17); last=ly; const kx=right-6-4*(arr.length-1-i);
    svg+=`<polyline points="${L.cx},${L.cy} ${kx},${L.cy} ${kx},${ly} ${right-3},${ly}" fill="none" stroke="var(--line-2)" stroke-width=".8"/><circle cx="${L.cx}" cy="${L.cy}" r="1.6" fill="var(--line-2)"/><text x="${right}" y="${ly+4}" font-size="13" fill="var(--fg)">${esc(L.t)}</text>`; });
  if(A.heat==='flow'){ const hall=labs.find(l=>l.hall); const mx=Math.max(1,...labs.map(l=>l.mwh||0)); labs.filter(l=>!l.hall&&l.mwh).forEach(l=>{ svg+=`<polyline points="${hall.cx},${hall.cy} ${hall.cx},${l.cy} ${l.cx},${l.cy}" fill="none" stroke="${warmCool(45)}" stroke-opacity=".8" stroke-width="${1+7*l.mwh/mx}"/>`; }); }
  if(A.heat) svg+=`<g transform="translate(${pad},${Hd+12})">${A.heat==='grad'?[15,30,45,60].map((t,i)=>`<rect x="${i*46}" y="-10" width="44" height="8" fill="${warmCool(t)}"/><text x="${i*46}" y="10" font-size="11" fill="var(--muted)">${t} °C</text>`).join('')+`<text x="196" y="-2" font-size="12" fill="var(--muted)">supply temperature each program needs (sourced); hatched = ? · a diagram, not a thermal simulation</text>`:`<text x="0" y="0" font-size="12" fill="var(--muted)">routes from the hall; width = yearly heat (MWh, sourced demand × size); programs with no demand source not drawn</text>`}</g>`;
  const srcIds=[...new Set(vis.filter(b=>!b.hall).flatMap(b=>(b.src||[])))];
  d.innerHTML=`<svg viewBox="0 0 ${Wd+250} ${Hd+30}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${sec?'Section':'Plan'} of the arrangement">${svg}</svg><div class="sub" style="position:absolute;left:16px;right:16px;bottom:4px;font-size:11px">${A.heat==='grad'?'Temperatures: '+chips(srcIds)+' · hall: register heat_temp '+chips(['yuan2025','nrelESIF2019'])+' · ':''}${sec&&s.H?'Height limit: '+chips(s.city==='van'?['van_zdb_i2','van_zdb_i3']:['edm_bl20001']):''}</div>`; }

BD.views=BD.views||{}; BD.views.aprog=viewPrograms; BD.views.aarr=viewArrange; BD.views.acmp=viewCompare;
BD.archHide=()=>{ const v=$('#aView'); if(v) v.style.display='none'; const p=$('#aPlan'); if(p) p.style.display='none'; };
BD.archTest={place,budgets,rules,add,del,resize,CAT};
})();
