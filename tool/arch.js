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
const AD=BD.data.arch; // lean refactor 3 Nov 2026: arch.js's own figures with their register ids (tool/data/arch.json)
const DR=BD.data.dc_rooms; // 3 Nov 2026: the data centre's rooms with their register ids (tool/data/dc_rooms.json; register arch_dc_rooms)
const A=BD.arch={picks:[],secure:'suggest',view:'3d',explode:false,labels:true /* Labels on/off (white interface, 3 Nov 2026) */,heat:null,storey:0,sel:null,saved:[],ready:null,ratio:null};
const n0=v=>v==null||!isFinite(v)?'?':Math.round(v).toLocaleString('en-CA');
const rg=(a,u)=>!a?'?':(a[0]===a[1]?n0(a[0]):n0(a[0])+'–'+n0(a[1]))+(u?' '+u:'');
const mid=a=>a?(a[0]+a[1])/2:null;
const mwR=a=>!a||!(a[1]>0)?'?':a[0].toFixed(1)+'–'+a[1].toFixed(1)+' MW'; // an MW range to 0.1, ends floored so the share always holds them

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
  { const c=capOf(p), mn=minOf(p); if(c!=null&&q.m2!=null&&q.m2>c&&(mn==null||mn<=c)){ q.m2=c; q.capped=true; } } // starts legal: at the BE cap, not over it
  A.picks.push(q); }
function del(id){ A.picks=A.picks.filter(q=>q.id!==id); if(A.sel===id) A.sel=null; }
function capOf(p){ const S=BD.S.sel; if(!S||S.city!=='edm'||zoneCode()!=='BE') return null; const z=p.zoning&&p.zoning.edm; return z&&z.cap_m2||null; }
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
/* Vancouver I-2 / I-3 s. 3.1.1.1: 3.00 FSR for industrial-type uses, 1.00 for all other uses combined (van_zdb_i2, van_zdb_i3). Which bucket a program is in
   is our reading of the use it would be: utility (heat plant), manufacturing (drying), parking (EV hub), and in I-2 the listed service uses catering
   (community kitchen) and laundry or cleaning plant (commercial laundry). Everything else counts against the 1.00. */
function industrialUse(q,code){ if(['heat_plant','food_drying','lumber_drying','ev_hub'].includes(q.id)) return true; if(/I-2/.test(code)&&(q.id==='community_kitchen'||(q.id==='laundry'&&q.opt==='commercial'))) return true; return false; }
/* the smallest side lengths a block may have. Pool: the 25 × 8.5 m tank (4 lanes; arch_fina_FR2020, arch_sportEngPoolsDGN) plus the deck all round:
   1.8 m in Alberta (NBC(AE) 7.2.3.15, arch_sup_nbcAE7Pools), 1.2 m in BC (arch_bcPoolDesign2025 s. 3.2). Every other block: 6 m, a drawing rule, not a code rule. */
function minDims(id,city){ if(id==='pool'){ const d=AD.poolDeck[city==='edm'?'edm':'van']; return [AD.poolTank[0]+2*d,AD.poolTank[1]+2*d]; } return [6,6]; } // pool: tool/data/arch.json
function zoneCode(){ const s=BD.S.sel||{}, a=s.a||[]; return String(s.city==='van'?(a[1]||''):(a[2]||a[1]||'')).toUpperCase().trim(); }
/* hall fix (3 Nov 2026, HALLFIX brief): with a ratio set, the hall is drawn at the storeys its floor needs over one of its footprint options (site.js hallOptions).
   Arrange tries every option whose set-up passes (site.js setupProblems: plant on the roof and in the yard, loading, fuel, noise), places the programs on
   each, and keeps the one that draws the most of the programs' floor share. Ties: fewer programs spread over more storeys than their own, then street-entrance
   programs nearest the street, then the option order (smallest footprint first). Deterministic. No ratio: unchanged. The refuge under the hall keeps the
   full-width hall ("full"). If no option passes, the full-width hall is drawn, as before, and said. */
let hallPick={key:null,opt:null,info:null};
function place(){ const An=BD.S.answers; if(!ratioNow()){ hallPick.key=null; return placeOnce(); }
  const refuge=pickOf('refuge'), under=!!(refuge&&refuge.opt==='under_hall');
  const key=JSON.stringify([selId(),A.picks,A.ratio,Object.assign({},An,{hallOpt:null})]);
  if(hallPick.key!==key){ let info={tried:0,passed:0,n:0,under,best:null};
    if(under){ An.hallOpt='full'; }
    else { An.hallOpt=null; BD.modelReset(); const M0=BD.model(), opts=(M0&&M0.hallOpts)||[]; info.n=opts.length; let best=null;
      for(const o of opts){ An.hallOpt=o.key; BD.modelReset(); info.tried++; { const pr=BD.setupProblems(true); if(pr.length){ (info.fails=info.fails||[]).push([o.key,pr[0]]); continue; } } const P=placeOnce(); if(!P||!P.s.M.hallOpt) continue; info.passed++;
        const sc=hallScore(P); if(!best||sc[0]>best.sc[0]+0.5||(Math.abs(sc[0]-best.sc[0])<=0.5&&(sc[1]<best.sc[1]||(sc[1]===best.sc[1]&&sc[2]<best.sc[2]-0.01)))) best={o,sc}; }
      An.hallOpt=best?best.o.key:'full'; info.best=best&&{key:best.o.key,k:best.o.k,st:best.o.st,top:best.o.top,along:best.o.along,a:best.o.a,fa:best.o.fa,drawn:best.sc[0]}; }
    BD.modelReset(); hallPick={key,opt:An.hallOpt,info}; }
  else if(An.hallOpt!==hallPick.opt){ An.hallOpt=hallPick.opt; BD.modelReset(); }
  const P=placeOnce(); if(!P) return P; P.hallPick=hallPick.info;
  if(!under&&An.hallOpt==='full') P.flags.unshift({t:`Data hall: none of its ${hallPick.info.n} footprint options passes the set-up here (plant on its roof, loading, fuel or noise), so it is drawn full width at the back, to the height limit, as before (a drawing choice, not a rule).`,src:['arch_ratios'],sev:'note'});
  return P; }
function hallScore(P){ const drawn=P.boxes.reduce((t,b)=>t+(b.q.m2||0),0), spread=P.boxes.filter(b=>b.spread).length;
  const street=P.boxes.filter(b=>b.p.place&&b.p.place.street_entrance).reduce((t,b)=>t+Math.min(Math.abs(b.u[0]-P.s.uf),Math.abs(b.u[1]-P.s.uf)),0)+(P.notDrawn||[]).filter(id=>{ const p=CAT.byId[id]; return p&&p.place&&p.place.street_entrance; }).length*1e4;
  return [drawn,spread,street]; }
function placeOnce(){ const s=site(); if(!s) return null; const {F,G,dir,v0,v1,W,a0,uf,ftf}=s; const out={s,boxes:[],flags:[],hall:null,levels:[]};
  const refuge=pickOf('refuge'), under=refuge&&refuge.opt==='under_hall';
  const toL=r=>{ const o=[]; for(let k=0;k<r.length;k+=2) o.push(F.toL(r[k],r[k+1])); return o; }, ext=r=>{ const L=toL(r); return [Math.min(...L.map(p=>p[0])),Math.max(...L.map(p=>p[0])),Math.min(...L.map(p=>p[1])),Math.max(...L.map(p=>p[1]))]; };
  // the hall where the set-up's model puts it (centred in the buildable area; its roof plant sits on it)
  const hf=s.M.serverFoot||s.M.foot; let [hu0,hu1,hv0,hv1]=ext(hf); const um=[Math.min(a0,uf),Math.max(a0,uf)];
  if(under){ /* the hall gives up its ground floor: the same floor over one floor fewer (our arithmetic) */ const k=s.floors/Math.max(1,s.floors-1), cu=(hu0+hu1)/2; const wu=Math.min((hu1-hu0)*k,um[1]-um[0]); hu0=Math.max(um[0],cu-wu/2); hu1=Math.min(um[1],hu0+wu); }
  const hallOwn=!under&&s.M.hallTop?s.M.hallTop:null; /* hall fix: a ratio-set hall at its own storeys (site.js setHall) */
  const hallBase=under?ftf.ground:0, hallH=hallOwn?hallOwn:Math.max(ftf.ground,s.H-hallBase), hallTop=hallBase+hallH;
  out.hall={ring:G.rectW(F,hu0,hu1,hv0,hv1),base:hallBase,h:hallH,u:[hu0,hu1],v:[hv0,hv1],kind:'hall',storeys:hallOwn?s.M.hallStoreys:s.floors,own:!!hallOwn};
  if(under) out.flags.push({t:`The refuge under the hall takes the hall's ground floor; the hall's floor is spread over the ${Math.max(1,s.floors-1)} floor${s.floors-1===1?'':'s'} above (our arithmetic). The rest of that ground floor is drawn empty.`,src:['arch_up_vanZDB10'],sev:'note'});
  const keep=w=>Math.max(0,...A.picks.map(q=>CAT.byId[q.id]).filter(Boolean).flatMap(p=>(p.adj||[]).filter(a=>a.rule==='keep apart'&&a.hard&&a.m!=null&&a.with===w&&!/evaporative/i.test(a.note||'')).map(a=>a.m)));
  const kG=keep('generators'), kC=keep('chillers'), kL=keep('loading'), kE=Math.max(0,...A.picks.map(q=>CAT.byId[q.id]).filter(Boolean).flatMap(p=>(p.adj||[]).filter(a=>a.rule==='keep apart'&&a.hard&&a.m!=null&&a.with==='chillers'&&/evaporative/i.test(a.note||'')).map(a=>a.m)));
  // what is already there: [u0,u1,v0,v1,zBase,zTop,noGo]
  const occ=[[hu0,hu1,hv0,hv1,0,hallTop,false]]; // the hall: built from the ground (or the refuge's floor) to its roof
  for(const b of (s.M.plant&&s.M.plant.boxes||[])){ const e=ext(b.clear||b.ring); const k0=b.name.indexOf('generator')>=0?kG:/tower|evapor|adiabatic|hybrid/i.test(b.name)?Math.max(kC,kE):kC; if(b.kind==='roof'){ occ.push([e[0],e[1],e[2],e[3],0,1e9,true,k0]); continue; } // roof plant: open to the sky, nothing built over it (review 2, N2)
    occ.push([e[0],e[1],e[2],e[3],0,1e9,true,k0]); } // NBC 6.3.2.9 and 6.3.2.15.(5) distances widen the no-go (code audit F5, F6); [7] = the widening, so a program stopped only by it can be named (hall fix)
  if(s.M.plant&&s.M.plant.yard){ const y=BD.geo.clip(s.M.ring,s.M.plant.yard); if(y&&y.length>=6){ const e=ext(y); occ.push([e[0],e[1],e[2],e[3],0,1e9,true]); } }
  if(s.M.loading){ const e=ext(s.M.loading); occ.push([e[0],e[1],e[2],e[3],0,1e9,true,kL]); }
  const bu0=um[0], bu1=um[1], bw=v1-v0, bl=bu1-bu0, cs=2, nU=Math.max(1,Math.floor(bl/cs)), nV=Math.max(1,Math.floor(bw/cs));
  // a 2 m height grid over the buildable area: the top of what stands on each cell, or no-go (review 2, N1: a block must rest flat on what is under it)
  /* a cell is taken if anything overlaps any part of it (not just its centre), and cells not wholly inside the lot are no-go (review of J.B.'s screenshot, 2 Nov 2026) */
  const lotR=s.M.ring, inLot=(u,v)=>{ const w=F.toW(u,v); return inside(w,lotR); };
  const HG=(noKeep)=>{ const g=new Float64Array(nU*nV); for(let i=0;i<nU;i++) for(let j=0;j<nV;j++){ const ua=dir<0?bu0+i*cs:bu1-(i+1)*cs, ub=ua+cs, va=v0+j*cs, vb=va+cs; let t=0;
      if(!(inLot(ua+0.05,va+0.05)&&inLot(ub-0.05,va+0.05)&&inLot(ua+0.05,vb-0.05)&&inLot(ub-0.05,vb-0.05))){ g[i*nV+j]=Infinity; continue; }
      for(const o of occ){ const k=noKeep?0:(o[7]||0); if(ua<o[1]+k-0.01&&o[0]-k<ub-0.01&&va<o[3]+k-0.01&&o[2]-k<vb-0.01){ if(o[6]){ t=Infinity; break; } t=Math.max(t,o[5]); } } g[i*nV+j]=t; } return g; };
  /* the street front, per column of cells: the first row wholly inside the lot. Hall fix (3 Nov 2026): on CLARK row 0 lies outside the lot along most of the front,
     so no street-entrance program could ever be drawn; with a ratio set a block is on the street front when it reaches that row in at least one of its columns.
     Without a ratio, row 0 as before (unchanged behaviour). */
  const fRow=(()=>{ const r=new Int32Array(nV); for(let j=0;j<nV;j++){ r[j]=ratioNow()?nU:0; if(!ratioNow()) continue; for(let i=0;i<nU;i++){ const ua=dir<0?bu0+i*cs:bu1-(i+1)*cs, ub=ua+cs, va=v0+j*cs, vb=va+cs; if(inLot(ua+0.05,va+0.05)&&inLot(ub-0.05,va+0.05)&&inLot(ua+0.05,vb-0.05)&&inLot(ub-0.05,vb-0.05)){ r[j]=i; break; } } } return r; })();
  const onFront=(i,j,wc)=>{ for(let b=j;b<j+wc;b++) if(fRow[b]===i) return true; return false; };
  const masses=A.picks.map(q=>({q,p:CAT.byId[q.id]})).filter(x=>x.p&&x.p.kind==='mass'&&!(x.q.id==='refuge'&&under));
  const prio=x=>(x.p.place&&x.p.place.street_entrance?0:x.p.place&&x.p.place.grade==='at grade'?1:x.p.place&&x.p.place.public?2:3);
  masses.sort((a,b)=>prio(a)-prio(b));
  if(under&&refuge&&refuge.m2){ const fp=Math.min(refuge.m2,(hu1-hu0)*(hv1-hv0)), d=Math.min(hu1-hu0,fp/Math.max(1,hv1-hv0)); const ua=dir<0?hu0:hu1-d, ub=dir<0?hu0+d:hu1;
    out.boxes.push({id:'refuge',p:CAT.byId.refuge,q:refuge,ring:G.rectW(F,ua,ub,hv0,hv1),base:0,h:ftf.ground,storeys:1,sh:ftf.ground,front:Math.abs((dir<0?ua:ub)-uf)<0.6,underHall:true,u:[ua,ub],v:[hv0,hv1]}); }
  out.notDrawn=[]; const Hmax=s.H||Infinity, capF=s.fsr&&s.lot?s.lot*s.fsr[1]:null, code=zoneCode(); let floorUsed=s.hallM2+out.boxes.reduce((t,b)=>t+(b.q.m2||0),0), nonInd=out.boxes.reduce((t,b)=>t+(industrialUse(b.q,code)?0:(b.q.m2||0)),0);
  /* 3 Nov 2026 (Ratios, J.B.): the programs share the floor the ratios give them; the building covers no more of the lot than the coverage set */
  const RT=ratioNow(); out.ratio=RT; let progUsed=out.boxes.reduce((t,b)=>t+(b.q.m2||0),0), gUsed=(hu1-hu0)*(hv1-hv0);
  if(RT&&s.hallM2<RT.dcM2-1) out.flags.push({t:`Data centre: its share (${n0(RT.dcM2)} m²) does not fit beside loading and the plant yard here; ${n0(s.hallM2)} m² drawn. Edit ratios or the set-up.`,src:['arch_ratios'],sev:'bad'});
  /* code limits block, they never just warn (J.B., 2 Nov 2026: "everything needs to follow the code"): no block above the zone's height limit,
     none past the floor-space ratio, none over an Edmonton BE area cap; setbacks and the hard distances are already no-go above */
  for(const x of masses){ const {q,p}=x, nm=p.name.split(' (')[0];
    if(q.m2==null){ out.flags.push({t:`${nm}: no sourced typical size; type one to place it.`,src:p.size&&p.size.src,sev:'q'}); continue; }
    if(q.id==='refuge'&&!q.opt){ out.flags.push({t:'Refuge: choose a placement (own building, side by side, or under the hall). There is no default (J.B., 1 Nov 2026).',src:[],sev:'q'}); out.notDrawn.push(q.id); continue; }
    { const z=p.zoning&&p.zoning[s.city]; if(z&&z.cap_m2&&s.city==='edm'&&code==='BE'&&q.m2>z.cap_m2){ out.flags.push({t:`${nm}: ${n0(q.m2)} m² is over the ${n0(z.cap_m2)} m² this use may have in BE; not drawn. ${minOf(p)!=null&&minOf(p)>z.cap_m2?'Its sourced minimum ('+n0(minOf(p))+' m²) is over the cap, so it cannot go on a BE lot.':'Make it '+n0(z.cap_m2)+' m² or less.'}`,src:z.src,sev:'bad',id:q.id}); out.notDrawn.push(q.id); continue; } }
    if(s.city==='van'&&/^I-[23]/.test(code)&&!industrialUse(q,code)&&nonInd+q.m2>s.lot*1.0+0.5){ out.flags.push({t:`${nm}: ${n0(q.m2)} m² would pass the 1.00 floor-space ratio ${code} allows for non-industrial uses combined (${n0(s.lot)} m² on this lot, ${n0(Math.max(0,s.lot-nonInd))} m² left); not drawn.`,src:[/I-2/.test(code)?'van_zdb_i2':'van_zdb_i3'],sev:'bad',id:q.id}); out.notDrawn.push(q.id); continue; }
    if(s.city==='van'&&/^I-2/.test(code)&&q.id==='clinic'){ const lim=Math.max(AD.i2Office.m2,AD.i2Office.share*(floorUsed+q.m2)); /* tool/data/arch.json (van_zdb_i2) */ if(q.m2>lim+0.5){ out.flags.push({t:`${nm}: in I-2, general and health care office together may have the greater of 235 m² or 33.3% of all floor area (${n0(lim)} m² here); ${n0(q.m2)} m² is over it; not drawn.`,src:['van_zdb_i2'],sev:'bad',id:q.id}); out.notDrawn.push(q.id); continue; } }
    { const z=p.zoning&&p.zoning[s.city]; if(z&&zoneMatch(s.city==='van'?z.districts:z.zones,code)==='no'){ out.flags.push({t:`${nm}: not permitted in ${code||'this zone'}${z.use?' ('+z.use+')':''}; not drawn. A rezoning would be a separate council decision.`,src:z.src,sev:'bad',id:q.id}); out.notDrawn.push(q.id); continue; } }
    if(RT&&progUsed+q.m2>RT.progM2+0.5){ out.flags.push({t:`${nm}: ${n0(q.m2)} m² would pass the programs' share of the floor (${n0(RT.progM2)} m², ${n0(Math.max(0,RT.progM2-progUsed))} m² left); not drawn. Edit ratios to give programs more.`,src:['arch_ratios'],sev:'bad',id:q.id}); out.notDrawn.push(q.id); continue; }
    if(capF!=null&&floorUsed+q.m2>capF+0.5){ out.flags.push({t:`${nm}: ${n0(q.m2)} m² would pass the floor-space ratio (${n0(capF)} m² on this lot, ${n0(Math.max(0,capF-floorUsed))} m² left); not drawn.`,src:s.city==='van'?['van_zdb_i2','van_zdb_i3']:['edm_bl20001'],sev:'bad',id:q.id}); out.notDrawn.push(q.id); continue; }
    const grade=p.place&&p.place.grade, mustSt=s.city==='van'&&p.place&&p.place.street_entrance&&!(q.id==='refuge'&&q.opt==='side_by_side'&&false), atG=grade==='at grade'||mustSt, notG=grade==='not at grade'&&notAtGradeHere(p), roof=q.place==='roof';
    /* Build 2 (3 Nov 2026): on Vancouver I-3 lots a program's storeys are drawn at the schedule's minimums, 6.0 m on the first floor and 4.0 m above (s. 3.1.2.9; tool/data/arch.json storeyMin, register arch_hb_vanI3), or its own sourced height if taller. Elsewhere the hall's 6.0 m storey (ftf.ground), the hall's figure, not a program's (?). */
    const own0=p.size&&p.size.floor_height_m, SM=s.city==='van'&&AD.storeyMin&&AD.storeyMin[code]||null, sh=(own0||ftf.ground), hOf=(b0,n)=>SM?(b0<0.01?Math.max(own0||0,SM.ground)+Math.max(own0||0,SM.above)*(n-1):Math.max(own0||0,SM.above)*n):sh*n, own=q.id==='refuge'&&q.opt==='own_building', gc=own?2:0; // own building: one 2 m cell clear all round (drawn, not a rule)
    const st0=Math.max(1,q.storeys||1), [mA,mB]=minDims(q.id,s.city); // short and long sides a program needs to work
    /* the search; why records what stopped the spots it tried (hall fix, 3 Nov 2026: a program not drawn names the rule) */
    const search=(g,why)=>{ let best=null, st=st0;
      for(;st<=8&&!best;st++){ const fp=q.m2/st;
        for(const [wc0,dc0] of [[nV,Math.ceil(fp/(nV*cs*cs))],...[1,0.5,2,0.25,4].map(a=>{ const w=Math.sqrt(fp/a)/cs, d=fp/(w*cs*cs); return [Math.ceil(w),Math.ceil(d)]; })]){ const wc=Math.min(wc0,nV), dc=Math.ceil(fp/(wc*cs*cs)); if(dc>nU||wc<1) continue;
          { const a=Math.min(wc,dc)*cs, b=Math.max(wc,dc)*cs; if(a<mA-0.01||b<mB-0.01) continue; } why.shape=true;
          for(let i=0;i+dc<=nU;i++) for(let j=0;j+wc<=nV;j++){ let base=-1, ok=true;
            for(let a=i-gc;a<i+dc+gc&&ok;a++) for(let b=j-gc;b<j+wc+gc;b++){ if(a<0||b<0||a>=nU||b>=nV){ if(gc) continue; ok=false; break; } const t=g[a*nV+b]; const inF=a>=i&&a<i+dc&&b>=j&&b<j+wc;
              if(t===Infinity){ ok=false; break; } if(!inF){ if(t>0) { ok=false; break; } continue; } if(base<0) base=t; else if(Math.abs(t-base)>0.1){ ok=false; break; } if(own&&t>0){ ok=false; break; } }
            if(!ok) continue; why.free=true; if(base===0) why.freeG=true; if(base+hOf(base,st)>Hmax+0.01){ why.tall=true; continue; } if(roof&&base<hallTop-0.01){ why.grade=true; continue; } if(atG&&base>0){ if(mustSt) why.street=true; else why.grade=true; continue; } if(RT&&base===0&&gUsed+fp>RT.cover+0.5){ why.cov=true; continue; } /* coverage set in Ratios */ if(mustSt&&!onFront(i,j,wc)){ why.street=true; continue; } /* Vancouver 10.21.1: its main entrance from a street (arch_up_vanZDB10) */ if(notG&&base===0){ why.grade=true; continue; }
            const sc=base*1e4+i*10+(RT&&mustSt?wc*0.4:0)+j*0.01; if(!best||sc<best.sc) best={sc,base,i,j,dc,wc}; } /* hall fix: with a ratio set, a street-entrance program takes the narrowest street front that holds it, so the next one finds front too (a drawing choice, not a rule) */
        }
        if(best) break; }
      return best?Object.assign(best,{st}):null; };
    const why={}; let best=search(HG(),why), st=best?best.st:st0;
    if(!best){ /* name what stops it, each with its register id */ const R=[], src=[]; const add=(t,ids)=>{ R.push(t); (ids||[]).forEach(x=>{ if(!src.includes(x)) src.push(x); }); };
      const zs=s.M.Z&&s.M.Z.srcId?[s.M.Z.srcId]:(s.city==='van'?['van_zdb_i2','van_zdb_i3']:['edm_bl20001']);
      const sideSrc=q.id==='pool'?['arch_fina_FR2020','arch_sportEngPoolsDGN',s.city==='edm'?'arch_sup_nbcAE7Pools':'arch_bcPoolDesign2025']:null;
      const sides=`${n0(mA)} × ${n0(mB)} m${sideSrc?'':' (a drawing rule, not a code rule: register id ?)'}`;
      if(why.free&&!why.freeG&&!atG) add(`room at grade: no free area of its size with sides of at least ${sides} is left beside the hall, the plant, the plant yard and loading`,sideSrc);
      if(why.tall) add(`height: the ${n0(Hmax)} m limit (register ${zs.join(', ')})`,zs);
      if(why.cov) add(`coverage: the ${n0(RT.cover)} m² footprint set in Ratios, ${n0(Math.max(0,RT.cover-gUsed))} m² left at grade (register arch_ratios)`,['arch_ratios']);
      if(why.street) add('street entrance: it must sit on the street front (Vancouver 10.21.1; register arch_up_vanZDB10)',['arch_up_vanZDB10']);
      if(why.grade){ const ps=p.place&&p.place.src||[]; add(`placement: ${atG&&!mustSt?'at grade':notG?'not at grade ('+code+')':roof?'on the hall roof':'at grade'} (register ${ps.length?ps.join(', '):'?'})`,ps); }
      if(!why.shape) add(`minimum sides: no block of ${n0(q.m2/8)}–${n0(q.m2/st0)} m² with sides of at least ${sides} fits the buildable area`,sideSrc);
      else if(!why.free){ const w2={}; const b2=search(HG(true),w2);
        if(b2||w2.free){ const ka=[...new Set((p.adj||[]).filter(a=>a.rule==='keep apart'&&a.hard&&a.m!=null&&['generators','chillers','loading'].includes(a.with)).map(a=>`${a.m} m from the ${a.with}`))], kaS=[...new Set((p.adj||[]).filter(a=>a.rule==='keep apart'&&a.hard&&a.m!=null&&['generators','chillers','loading'].includes(a.with)).flatMap(a=>a.src||[]))];
          add(`keep-apart: the free room left is within ${ka.join(', ')} (register ${kaS.join(', ')||'?'})`,kaS); }
        else add(`minimum size or sides: no free area of its size with sides of at least ${sides} is left beside the hall, the plant, the plant yard and loading`,sideSrc); }
      out.flags.push({t:`${nm}: not drawn. Stopped by ${R.join('; ')}.`,src,sev:'bad',id:q.id,stop:R}); out.notDrawn.push(q.id); continue; }
    if(st>st0) out.flags.push({t:`${nm}: ${n0(q.m2)} m² does not fit on one floor here${mustSt?' along the street front (it needs its own street entrance)':''}; drawn over ${st} storeys only to show its size. Whether it can be split across floors is a design question.`,src:[],sev:'bad',id:q.id});
    const {base,i,j,dc,wc}=best, hh=hOf(base,st), spread=st>st0, uA=dir<0?bu0+i*cs:bu1-(i+dc)*cs, uB=uA+dc*cs, vA=v0+j*cs, vB=vA+Math.min(wc*cs,q.m2/st/(dc*cs)), gap=gc*cs; // exact area: full cells along u, the width trimmed to the size
    floorUsed+=q.m2; progUsed+=q.m2; if(base===0) gUsed+=q.m2/st; if(!industrialUse(q,code)) nonInd+=q.m2; occ.push([uA,uB,vA,vB,base,base+hh,false]); if(own) occ.push([uA-gap,uB+gap,vA-gap,vB+gap,0,1e9,true]);
    out.boxes.push({id:q.id,p,q,ring:G.rectW(F,uA,uB,vA,vB),base,h:hh,storeys:st,sh:hh/st,shSrc:SM?['arch_hb_vanI3']:own0?(p.size.src||[]):null,front:base===0&&Math.abs((dir<0?uA:uB)-uf)<cs+0.01,top:base>=hallTop-0.01,roof,u:[uA,uB],v:[vA,vB],gap,own,spread}); }
  const top=Math.max(hallTop,...out.boxes.map(b=>b.base+b.h));
  if(s.H&&top>s.H+0.01) out.flags.push({t:`Check: something is drawn to ${n0(top)} m, over this zone's ${n0(s.H)} m limit. This should not happen; please report it.`,src:s.city==='van'?['van_zdb_i2','van_zdb_i3']:['edm_bl20001'],sev:'bad'});
  out.boxes.forEach(b=>{ const sh=b.sh||ftf.ground; b.level=Math.floor(b.base/ftf.ground+0.01); b.levels=[...new Set(Array.from({length:b.storeys||1},(_,k)=>Math.floor((b.base+k*sh)/ftf.ground+0.01)))]; }); // plan storeys by height, each storey at its own height (review 2, N12)
  out.levels=[...new Set(out.boxes.flatMap(b=>b.levels))].sort((a,b)=>a-b);
  out.hallDepth=hu1-hu0; out.hallTop=hallTop; return out; }
function notAtGradeHere(p){ /* catalogue: Vancouver I-3 and FC-2 bar some uses at the ground floor; elsewhere no such rule */ const z=zoneCode(); return /I-3|FC-2/.test(z)&&BD.S.sel&&BD.S.sel.city==='van'; }

/* ---------- budgets ---------- */
function budgets(P){ const s=P.s, nd=new Set(P.notDrawn||[]); const r=BD.eng.calc({mw:BD.S.answers.mw||(s.M.mwSized)||1,recover:true},BD.eng.siteFacts(),[],[]);
  const use=A.picks.filter(q=>!nd.has(q.id)).map(q=>{ const p=CAT.byId[q.id]; const k=p&&p.heat&&p.heat.kWh_m2_yr; return {id:q.id,p,m2:q.m2,mwh:(k&&q.m2!=null)?[k[0]*q.m2/1000,k[1]*q.m2/1000]:null}; });
  const progM2=use.filter(u=>u.p&&u.p.kind==='mass'&&u.m2!=null).reduce((t,u)=>t+u.m2,0);
  const capF=s.fsr&&s.lot?s.lot*s.fsr[1]:null, capE=s.L*s.W*s.floors, cap=capF!=null?Math.min(capF,capE):capE; const space={hall:s.hallM2,prog:progM2,cap,capF,capE,left:cap!=null?cap-s.hallM2-progM2:null,items:use.filter(u=>u.p&&u.p.kind==='mass'&&u.m2!=null)};
  const RT=P.ratio; if(RT){ space.ratio=RT; space.cap=RT.allowed; space.progCap=RT.progM2; space.left=RT.progM2-progM2; } // 3 Nov 2026: the programs' share from Ratios (register arch_ratios)
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
    if(city==='van'&&p.place&&p.place.street_entrance&&!b.front&&!b.underHall) out.push({t:`${nm} needs its own street entrance; it is not on the street front here.`,src:p.place.src,sev:'note',id:b.id});
  }
  /* Build 2 (3 Nov 2026): roof plant over the zone's height (tool/data/arch.json roofEquip). Edmonton s. 5.70 1.9: ventilating equipment and mechanical penthouses
     have no Height limit (arch_hb_edm570; coolers as ventilating equipment is our reading). Vancouver s. 10.1.1: only if the Director of Planning permits it (arch_up_vanZDB10). */
  { const rt=Math.max(0,...((M.plant&&M.plant.boxes)||[]).filter(b=>b.kind==='roof').map(b=>(b.base||0)+(b.h||0))); if(s.H&&rt>s.H+0.01){
    if(city==='edm') out.push({t:`Roof plant reaches ${rt.toFixed(1)} m, over the ${s.H.toFixed(1)} m height: in Edmonton ventilating equipment and mechanical penthouses are not counted in height (s. 5.70 cl. 1.9; dry coolers and chillers as ventilating equipment is our reading).`,src:['arch_hb_edm570'],sev:'note'});
    else out.push({t:`Roof plant reaches ${rt.toFixed(1)} m, over the ${s.H.toFixed(1)} m height limit: allowed only if the Director of Planning permits it (s. 10.1.1), which is not known here (?).`,src:['arch_up_vanZDB10'],sev:'q'}); } }
  return out; }

/* ---------- the heat a program needs, against what the hall gives ---------- */
function dcTemp(){ return (BD.S.answers.inside||'air')==='air'?AD.dcTemp.air.slice():AD.dcTemp.liquid.slice(); } // register heat_temp by cooling type: air-cooled 25–35 °C; liquid 50–60 °C (unverified, ?)
function lift(p){ const t=p.heat&&p.heat.supply_C; if(!t) return null; const d=dcTemp(); return t[1]<=d[0]?'direct':t[1]<=d[1]?'partly':t[1]<=AD.hpMaxC?'heat pump':'hotter than '+AD.hpMaxC+' °C'; } // tool/data/arch.json (cop, dea)

/* ---------- panel ---------- */
const CSS=`.arow{border-top:1px solid var(--line);padding:8px 0;display:grid;gap:4px}.arow.sel{border-color:var(--accent)}.arow h4{margin:0;font-weight:400;font-size:13px;display:flex;gap:6px;align-items:center;cursor:pointer}
.arow h4 .nm{flex:1;min-width:0}.arow .ctl{display:flex;gap:6px;align-items:center;flex-wrap:wrap;font-size:12px}.arow input[type=number]{width:76px;font:inherit;background:transparent;color:inherit;border:1px solid var(--line-2);border-radius:4px;padding:1px 4px}
.arow button,.abar button,.aview button{font:inherit;font-size:11.5px;background:transparent;color:inherit;border:1px solid var(--line-2);border-radius:4px;padding:1px 7px;cursor:pointer}.abar button[aria-pressed=true],.aview button[aria-pressed=true]{border-color:var(--accent);color:var(--accent)}
.asrc{display:inline-block;font-size:10px;border:1px solid var(--line-2);border-radius:3px;padding:0 3px;margin:0 2px;color:var(--muted);cursor:help}.asrc.q{border-style:dashed}
.abud{margin:6px 0 10px}.abud .lab{font-size:11.5px;color:var(--muted);display:flex;justify-content:space-between;gap:8px}.abud .bar{display:flex;height:10px;border:1px solid var(--line-2);border-radius:3px;overflow:hidden;margin-top:3px}
.abud .bar i{display:block;height:100%;border-right:1px solid var(--bg);background:var(--line-2)}.abud .bar i.h{background:var(--muted)}.abud .bar i.s{background:var(--accent)}.abud .bar i.o{background:var(--m-stroke)}
.aflag{font-size:12px;margin:3px 0;padding-left:12px;position:relative}.aflag:before{content:'';position:absolute;left:0;top:7px;width:6px;height:6px;border-radius:50%;background:var(--line-2)}.aflag.bad:before{background:var(--accent)}.aflag.q:before{background:transparent;border:1px dashed var(--line-2)}
.aparts{font-size:11.5px;color:var(--muted);line-height:1.5}.aparts span{white-space:normal}
.apick{display:flex;justify-content:space-between;gap:8px;padding:3px 0;font-size:12.5px;border-bottom:1px solid var(--line)}.apick small{color:var(--muted)}.agrp{margin-top:12px}
.aview{position:absolute;left:64px;bottom:12px;z-index:5;display:flex;gap:6px;flex-wrap:wrap;background:rgba(255,255,255,.92);padding:6px;border-radius:6px}.aview button{padding:4px 12px;font-size:12.5px;border-color:var(--line-2);background:var(--bg)}.aview button[aria-pressed=true]{background:var(--fg);border-color:var(--fg);color:var(--on-ink)}.abar button[aria-pressed=true]{border-color:var(--fg);color:var(--fg)}
#aPlan{position:absolute;left:0;right:0;top:0;bottom:56px;z-index:4;background:var(--bg);display:none;padding:12px 16px}#aPlan svg{width:100%;height:100%}
.atabs{display:flex;gap:16px;font-size:12.5px;margin:2px 0 10px;border-bottom:1px solid var(--line)}.atabs button{font:inherit;background:none;border:0;border-bottom:1px solid transparent;padding:0 0 5px;color:var(--muted);cursor:pointer}.atabs button[aria-selected=true]{color:var(--fg);border-bottom-color:var(--fg)}.atabs button:disabled{cursor:default;opacity:.55}
.arat{border-top:1px solid var(--line);padding:10px 0 12px;display:grid;gap:6px}.arh b{font-size:14px;font-weight:500}.arh{display:flex;justify-content:space-between;align-items:baseline;gap:10px}.arh span{font-size:11.5px;color:var(--muted)}
.arl{display:flex;justify-content:space-between;font-size:12.5px}.arl span+span{color:var(--muted)}.arat input[type=range]{width:100%;accent-color:var(--fg)}.agrid{display:grid;grid-template-columns:1fr auto;gap:5px 14px;font-size:12.5px}.agrid .ar{text-align:right;color:var(--muted)}
.asplit{font-size:12px}.asplit a{color:var(--fg)}
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
   ${p.kind==='mass'&&(s.parts||[]).length?`<div class="aparts">What the ${s.typical_m2!=null?n0(s.typical_m2)+' m² ':''}holds: ${s.parts.map(x=>`<span>${esc(x.part)} ${x.m2?rg(x.m2,'m²'):'?'} ${chips(x.src)}</span>`).join(' · ')}</div>`:''}
   ${q.capped?`<div class="sub" style="font-size:11.5px">Starts at ${n0(capOf(p))} m², the most this use may have in BE (typical ${n0(s.typical_m2)} m²). ${chips(p.zoning.edm.src)}</div>`:''}${ch?`<div class="sub" style="font-size:11.5px">${esc(ch.effect)}</div>`:''}
   ${sel?detail(p):''}</div>`; }
function detail(p){ const h=p.heat||{}, o=p.occ||{}, L=lift(p);
  const z=['van','edm'].map(c=>{ const v=p.zoning&&p.zoning[c]; return v?`<li>${c==='van'?'Vancouver':'Edmonton'}: ${esc(v.status||'?')}${v.use?' ('+esc(v.use)+')':''}${v.cap_m2?', up to '+n0(v.cap_m2)+' m²':''} ${chips(v.src)}</li>`:''; }).join('');
  return `<ul class="sub" style="font-size:11.5px;margin:4px 0 0 14px;padding:0">
   ${(p.size&&p.size.parts||[]).map(x=>`<li>${esc(x.part)}: ${x.m2?rg(x.m2,'m²'):'?'}${x.basis?' — '+esc(x.basis):''} ${chips(x.src)}</li>`).join('')}
   <li>Code: ${esc(o.group||'?')}, ${o.sep_h_from_F2==null?'separation ?':o.sep_h_from_F2+' h from the hall'} ${chips(o.src)}${o.note?' — '+esc(o.note):''}</li>
   <li>Heat: room ${rg(h.setpoint_C,'°C')}, supply ${rg(h.supply_C,'°C')}, ${rg(h.kWh_m2_yr,'kWh/m²·yr')}${L?` · ${L==='direct'?'the hall\'s heat can serve it directly':L==='partly'?'direct only at the warm end of the hall\'s range, else a heat pump':L==='heat pump'?'needs a heat pump (to 70 °C)':'hotter than a heat pump reaches (70 °C)'} (hall ${rg(dcTemp(),'°C')}, register heat_temp; liquid range unverified)`:''} ${chips(h.src)}${h.note?' — '+esc(h.note):''}</li>${z}
   ${(p.adj||[]).map(a=>`<li>${esc(a.rule)} ${esc(a.with)}${a.m!=null?' '+a.m+' m':''}${a.hard?'':' (preference)'}: ${esc(a.note||'')} ${chips(a.src)}</li>`).join('')}
   ${(p.flags||[]).map(f=>`<li>${esc(f.replace(/\s*\[[^\]]+\]\s*$/,''))} ${chips((f.match(/\[([^\]]+)\]\s*$/)||[,''])[1].split(/[,;]\s*/).filter(Boolean))}</li>`).join('')}</ul>`; }
function budHTML(B){ const S=B.space, H=B.heat; const cap=S.cap, tot=S.hall+S.prog;
  const seg=(v,of,c,t)=>of?`<i class="${c}" style="width:${Math.max(0,Math.min(100,v/of*100))}%" title="${esc(t)}"></i>`:'';
  if(S.ratio) return `<div class="abud"><div class="lab"><span>Programs: ${n0(S.prog)} of ${n0(S.progCap)} m², their share of the floor ${chips(['arch_ratios'])}</span><span>${S.left<0?'over by '+n0(-S.left):n0(S.left)+' left'}</span></div><div class="bar">${S.items.map(u=>seg(u.m2,Math.max(S.progCap,S.prog)||1,A.sel===u.id?'s':'',u.p.name+' '+n0(u.m2)+' m²')).join('')}</div></div>`+heatHTML(B)+ndHTML(B);
  const sp=cap?`<div class="abud"><div class="lab"><span>Space: ${n0(tot)} of ${n0(cap)} m² of floor ${S.capF!=null&&S.capF<S.capE?'the zone allows (floor-space ratio)':'that fits inside the setbacks, below the height limit'} ${chips(BD.S.sel&&BD.S.sel.city==='edm'?['edm_bl20001']:['van_zdb_i2','van_zdb_i3'])}</span><span>${S.left<0?'over by '+n0(-S.left):n0(S.left)+' left'}</span></div><div class="bar">${seg(S.hall,Math.max(cap,tot),'h','data centre '+n0(S.hall)+' m²')}${S.items.map(u=>seg(u.m2,Math.max(cap,tot),A.sel===u.id?'s':'',u.p.name+' '+n0(u.m2)+' m²')).join('')}</div></div>`:`<div class="abud"><div class="lab">Space: floor-area limit for this zone not known (?)</div></div>`;
  return sp+heatHTML(B)+ndHTML(B); }
function ndHTML(B){ const nd=(B.notDrawn||[]).map(i=>CAT.byId[i]&&CAT.byId[i].name.split(' (')[0]).filter(Boolean); return nd.length?`<div class="abud"><div class="lab">Not drawn, not counted: ${esc(nd.join(', '))}</div></div>`:''; }
function heatHTML(B){ const H=B.heat; const seg=(v,of,c,t)=>of?`<i class="${c}" style="width:${Math.max(0,Math.min(100,v/of*100))}%" title="${esc(t)}"></i>`:'';
  const av=H.avail, aM=av?av[0]:null; const ht=av?`<div class="abud"><div class="lab"><span>Heat: ${rg(H.need,'MWh/yr')} of ${rg(av,'MWh/yr')} the hall offers (after the heat pump) ${chips(['dea','dfKatalog2022'])}</span><span>${n0(H.need[1]/av[0]*100)}% at most</span></div><div class="bar">${H.items.map(u=>seg(mid(u.mwh),Math.max(aM,H.need[1]),A.sel===u.id?'s':'o',u.p.name+' '+rg(u.mwh,'MWh/yr'))).join('')}</div>${H.unknown.length?`<div class="lab"><span>Not counted, heat demand ?: ${esc(H.unknown.map(u=>u.p.name.split(' (')[0]).join(', '))}</span></div>`:''}</div>`:'';
  return ht; }

/* ---------- ratios (3 Nov 2026, J.B.: "Architecture mode starts by setting site ratios"; register arch_ratios) ----------
   Coverage first, then the floor-area split (all storeys, not footprint). Allowed floor = min(lot × floor-space ratio, footprint × storeys under the
   height limit). The data centre's share is turned into MW through the rooms with a size per MW (tool/data/dc_rooms.json: hall, UPS, Li-ion): a range,
   no midpoint. Arrange tests one end of it (low end by default: the size the share holds even at the roomiest hall). Rooms with no size source are not counted. */
const selId=()=>BD.S.sel?BD.S.sel.city+':'+BD.S.sel.id:'';
function ratioBase(){ const M=BD.model&&BD.model(); if(!M||!M.F||M.existing||!M.ring) return null; const Z=M.Z||{}, code=zoneCode();
  const yard=M.inset?BD.geo.clip(M.ring,M.inset):null, build=yard&&yard.length>=6?BD.area(yard):M.lotArea;
  const floors=Math.max(1,M.nF[0]), dataFl=Math.max(1,Z.ground?floors-1:floors), fsr=Z.fsr?Z.fsr[1]:null;
  const split=DR.rooms.filter(r=>r.split&&r.perMW), lo=split.reduce((t,r)=>t+r.perMW[0],0), hi=split.reduce((t,r)=>t+r.perMW[1],0);
  return {M,Z,code,lot:M.lotArea,build,yard,floors,dataFl,fsr,coverNone:(DR.coverLimit.none||[]).includes(code),coverZ:(BD.data.raw.dc_rooms.coverLimit.byZone||{})[code]||null,split,perMW:[lo,hi],city:M.city}; }
function ratioCalc(b,r){ const cover=Math.min(r.cover,b.build), capF=b.fsr&&b.lot?b.lot*b.fsr:Infinity, capE=cover*b.floors, allowed=Math.min(capF,capE);
  const dcMax=Math.min(allowed,cover*b.dataFl), dcM2=Math.min(dcMax,r.dc/100*allowed), progM2=Math.min(allowed-dcM2,r.prog/100*allowed);
  const mw=[dcM2/b.perMW[1],dcM2/b.perMW[0]], pick=r.end==='high'?mw[1]:mw[0], mwTest=Math.floor(pick*10+1e-9)/10;
  return {cover,allowed,capF,capE,by:capF<=capE?'fsr':'envelope',dcMax,dcM2,progM2,unused:Math.max(0,allowed-dcM2-progM2),mw,mwTest:mwTest>=0.1?mwTest:null}; }
/* the largest size every hard rule allows with this set-up (site.js fitMax: plant, generators, fuel, noise), worked out without the ratio's floor */
function fitNoRatio(){ const An=BD.S.answers, keep=An.dcFloor; delete An.dcFloor; BD.modelReset&&BD.modelReset(); let fm=null; try{ fm=BD.fitMax?BD.fitMax():null; }finally{ if(keep!=null) An.dcFloor=keep; BD.modelReset&&BD.modelReset(); } return fm; }
/* the most of the floor the data centre may take: the hall off the ground floor where the zone says so, and no more MW than the hard rules allow at the end Arrange tests */
function dcCapPct(b,r,fm){ const c=ratioCalc(b,Object.assign({},r,{dc:100,prog:0})), M=BD.model(), room=M&&M.hallRoom?M.hallRoom*b.dataFl:Infinity; // room: the hall footprint the set-up leaves after loading and the plant yard (site.js), on the floors data may use
  const geo=Math.floor(Math.min(c.dcMax,room)/c.allowed*100+1e-9), byRoom=room<c.dcMax; if(fm==null) return {pct:0,geo,fm,byRoom,room};
  const per=r.end==='high'?b.perMW[0]:b.perMW[1]; return {pct:Math.min(geo,Math.floor(fm*per/c.allowed*100+1e-9)),geo,fm,byRoom,room}; }
function ratioInit(b,fm){ const r={site:selId(),cover:b.build,dc:0,prog:0,end:'low'}, mw=BD.S.answers.mw, c=ratioCalc(b,Object.assign({},r,{dc:100,prog:0})), cap=dcCapPct(b,r,fm).pct;
  r.dc=mw?Math.max(Math.min(1,cap),Math.min(cap,Math.floor(mw*b.perMW[1]/c.allowed*100+1e-9))):cap; r.prog=100-r.dc; return r; } // starts at the set-up's own size (its MW at the low end), the rest to programs
function ratioApply(){ const b=ratioBase(), r=A.ratio; if(!b||!r) return null; const c=ratioCalc(b,r), An=BD.S.answers;
  if(c.mwTest){ An.mw=c.mwTest; An.dcFloor=c.dcM2; An.dcSite=BD.S.sel.id; An.mwPick='ratio'; An.mwSite=BD.S.sel.id; r.mw=c.mwTest; } else { delete An.dcFloor; r.mw=null; }
  BD.modelReset&&BD.modelReset(); return c; }
/* the ratios in force for Arrange: only when set for this lot and the size has not been changed elsewhere since */
function ratioNow(){ const r=A.ratio; if(!r||r.site!==selId()||!r.mw||BD.S.answers.mw!==r.mw) return null; const b=ratioBase(); if(!b) return null; const c=ratioCalc(b,r); return Object.assign(c,{r,b}); }
function tabsHTML(k){ const F=BD.flow, T=[['arat','Ratios',['arat']],['aprog','Arrange',['aprog','aarr']],['aexc','Exchange',[]],['acmp','Compare',['acmp']]];
  return `<div class="atabs" role="tablist" aria-label="Design">${T.map(([to,l,ks])=>{ const i=F?F.steps.findIndex(s=>s.k===to):-1, on=ks.includes(k), ok=i>=0&&i<=F.max;
    return `<button role="tab" data-tab2="${to}" aria-selected="${on}" ${ks.length&&ok?'':'disabled'} ${ks.length?'':'title="Exchange: the on-site exchange step comes next in the build"'}>${l}</button>`; }).join('')}</div>`; }
function wireTabs(sd){ sd.querySelectorAll('[data-tab2]').forEach(b=>b.onclick=()=>{ if(!b.disabled&&BD.flow) BD.flow.to(b.dataset.tab2); }); }
function splitLine(RT){ if(!RT) return `<p class="sub asplit">Ratios not set for this lot: the space budget below is the zone's whole allowance. <a href="#" data-editr>Set ratios</a></p>`;
  const pc=v=>n0(v/RT.allowed*100)+'%';
  return `<p class="sub asplit">Data centre ${pc(RT.dcM2)} · ${n0(RT.dcM2)} m² · ${mwR(RT.mw.map(x=>Math.floor(x*10)/10))} (testing ${RT.mwTest}) · programs ${pc(RT.progM2)} · ${n0(RT.progM2)} m² · unused ${pc(RT.unused)} ${chips(['arch_ratios'])} <a href="#" data-editr>Edit ratios</a></p>`; }
async function viewRatios(){ await ready(); BD.S.view2='tab'; const sd=$('#side'); const b=ratioBase();
  if(!b){ sd.innerHTML=`${tabsHTML('arat')}<h2>Ratios</h2><p class="lead">Ratios need a new building on a lot with a known shape. Pick a lot and set it up as a new build.</p>`; wireTabs(sd); return; }
  const fm=fitNoRatio(), fresh=!A.ratio||A.ratio.site!==selId(); if(fresh) A.ratio=ratioInit(b,fm);
  const r=A.ratio; let cap=null, c=null; for(let k=0;k<4;k++){ c=ratioApply()||ratioCalc(b,r); cap=dcCapPct(b,r,fm); if(r.dc<=cap.pct) break; r.dc=cap.pct; } // the plant yard moves with the MW: settle the cap
  r.prog=fresh?100-r.dc:Math.min(r.prog,100-r.dc); c=ratioApply()||ratioCalc(b,r); const M=BD.model(), S=b.city==='van'?(/I-2/.test(b.code)?['van_zdb_i2']:['van_zdb_i3']):['edm_bl20001'];
  const pctDcMax=cap.pct, mwH=c.mwTest?BD.eng.calc({mw:c.mwTest,recover:true},BD.eng.siteFacts(),[],[]):null;
  const rooms=b.split.map(x=>{ const raw=(BD.data.raw.dc_rooms.rooms.find(y=>y.id===x.id)||{}).perMW||{}; return `<span>${esc(x.name)}</span><span class="ar">${c.mwTest?rg([c.mwTest*x.perMW[0],c.mwTest*x.perMW[1]],'m²'):'?'} ${chips(raw.src)}</span>`; }).join('');
  const qRooms=DR.rooms.filter(x=>!x.split&&/no size source/.test(x.kind||'')).map(x=>x.name.split(' (')[0]);
  const covLim=b.coverNone?`none (${esc(b.code)})`:'limit ?', covSrc=b.coverZ?b.coverZ.src:[]; /* Build 2: by zone, with the clause (tool/data/dc_rooms.json coverLimit.byZone) */
  sd.innerHTML=`${tabsHTML('arat')}<h2>Ratios</h2><p class="lead">Set how much of the lot is built on, then split the floor area. The data centre's share sets its size.</p>
   <div class="arat"><div class="arh"><b>Building coverage</b><span>${covLim} ${chips(covSrc)}</span></div>
    <label class="arl"><span>Footprint</span><span>${n0(c.cover)} of ${n0(b.build)} m² inside the yards</span></label>
    <input type="range" id="rCov" min="${Math.max(1,Math.round(b.build*0.05))}" max="${Math.floor(b.build)}" step="1" value="${Math.round(c.cover)}" aria-label="Building footprint, m²">
    <p class="src">Yards and height limit: ${esc(b.code||'zone')} ${chips(S)}. ${b.coverNone?(b.coverZ?esc(b.coverZ.cl)+': the slider stops at the buildable area inside the yards.':''):'No coverage limit for this zone is in the register, so the slider stops at the buildable area inside the yards.'}</p></div>
   <div class="arat"><div class="arh"><b>Floor area split</b><span>${n0(c.allowed)} m² allowed</span></div>
    <p class="src">${c.by==='fsr'?`Floor-space ratio ${b.fsr} × ${n0(b.lot)} m² lot`:`Footprint × ${b.floors} storeys under the ${n0(M.H)} m height limit`} (the lower of the two) ${chips(S)}</p>
    <label class="arl"><span>Data centre</span><span>${r.dc}% · ${n0(c.dcM2)} m²</span></label>
    <input type="range" id="rDc" min="0" max="${pctDcMax}" step="1" value="${Math.min(r.dc,pctDcMax)}" aria-label="Data centre share, %">
    ${cap.byRoom&&cap.geo<100?`<p class="src">Loading and the plant yard leave room for ${n0(cap.room)} m² of hall${b.dataFl<b.floors?' (not on the ground floor here)':''}, so the data centre takes at most ${cap.geo}% ${chips(S)}.</p>`:b.dataFl<b.floors&&cap.geo<100?`<p class="src">The hall may not use the ground floor here, so the data centre takes at most ${cap.geo}% ${chips(S)}.</p>`:''}
    ${cap.fm==null?`<p class="src k">No size passes the hard rules with this set-up (plant, generators, fuel or noise). Change the set-up.</p>`:cap.pct<cap.geo?`<p class="src">Hard rules stop it at ${cap.fm} MW with this set-up (plant, generators, fuel, noise), so at most ${cap.pct}% at the ${r.end==='high'?'high':'low'} end. Change the set-up for more.</p>`:''}
    <label class="arl"><span>Programs</span><span>${r.prog}% · ${n0(c.progM2)} m²</span></label>
    <input type="range" id="rPg" min="0" max="${100-r.dc}" step="1" value="${Math.min(r.prog,100-r.dc)}" aria-label="Programs share, %">
    <p class="sub">Unused ${n0(c.unused/c.allowed*100)}% · ${n0(c.unused)} m²</p>
    ${b.city==='van'&&/^I-[23]/.test(b.code)?`<p class="src">${esc(b.code)}: non-industrial uses together at most 1.00 × the lot (${n0(b.lot)} m²); Arrange blocks programs past it ${chips(S)}.</p>`:''}</div>
   <div class="arat"><div class="arh"><b>What that gives</b><span></span></div>
    <div class="agrid"><span>Data centre size</span><span class="ar">${c.dcM2>0?mwR(c.mw.map(x=>Math.floor(x*10)/10)):'?'} ${chips(['arch_ratios'])}</span>
     <span>Arrange tests</span><span class="ar"><select id="rEnd" aria-label="Which end of the range Arrange tests"><option value="low"${r.end!=='high'?' selected':''}>low end</option><option value="high"${r.end==='high'?' selected':''}>high end</option></select> ${c.mwTest!=null?c.mwTest+' MW':'?'}</span>
     ${rooms}
     <span>Not counted, no size source</span><span class="ar">? ${chips(['arch_dc_rooms'])}</span>
     <span>Heat the hall offers</span><span class="ar">${mwH&&mwH.avail?rg(mwH.avail,'MWh/yr'):'?'} ${chips(['dea','dfKatalog2022'])}</span></div>
    <p class="src">Below grade: the tool draws no basement. A basement would count toward floor area (Vancouver I-3 s. 4.1.1; Edmonton floor area ratio unless it is only storage or service to the building) but not toward height or storeys ${chips(BD.data.raw.arch.belowGrade.src.slice(0,3))}. Generators and diesel tanks stay out of basements and off the roof (FM 5-32, insurer guidance, not law) ${chips(['arch_up2_fm0532'])}.</p>
    <p class="src">Hall per MW: five built Canadian halls (operator claims); UPS and Li-ion per MW: maker claims, equipment only. Low end: the share at ${n0(b.perMW[1])} m² per MW; high end: at ${n0(b.perMW[0])}. No size source, not counted: ${esc(qRooms.join(', '))}.</p></div>`;
  wireTabs(sd);
  const re=()=>{ ratioApply(); viewRatios(); };
  $('#rCov').onchange=e=>{ r.cover=+e.target.value; re(); };
  $('#rDc').onchange=e=>{ r.dc=+e.target.value; r.prog=Math.min(r.prog,100-r.dc); re(); };
  $('#rPg').onchange=e=>{ r.prog=Math.min(+e.target.value,100-r.dc); re(); };
  $('#rEnd').onchange=e=>{ r.end=e.target.value; re(); };
  ratioPlan(b,c); }
/* the Ratios drawing: the lot, the line of the yards, the data centre as the set-up now draws it, and two bars (coverage; floor split) */
function ratioPlan(b,c){ const host=document.getElementById('v3d'); if(!host) return; BD.archHide&&BD.archHide(); let d=$('#aPlan'); if(!d||d.parentElement!==host){ if(d) d.remove(); d=document.createElement('div'); d.id='aPlan'; host.appendChild(d); } d.style.display='block';
  const M=BD.model()||b.M, F=M.F, toUV=r=>{ const o=[]; for(let i=0;i<r.length;i+=2) o.push(F.toL(r[i],r[i+1])); return o; }; // the model after the ratios were applied
  const lot=toUV(M.ring), us=lot.map(p=>p[0]), vs=lot.map(p=>p[1]), u0=Math.min(...us), u1=Math.max(...us), v0=Math.min(...vs), v1=Math.max(...vs);
  const pad=24, Wd=560, Hd=330, k=Math.min((Wd-2*pad)/Math.max(1,u1-u0),(Hd-2*pad)/Math.max(1,v1-v0)), X=u=>pad+(u-u0)*k, Y=v=>pad+(v-v0)*k, pts=a=>a.map(p=>X(p[0])+','+Y(p[1])).join(' '); /* drawing */
  let svg=`<polygon points="${pts(lot)}" fill="none" stroke="var(--line-2)" stroke-width="1"/>`;
  if(b.yard) svg+=`<polygon points="${pts(toUV(b.yard))}" fill="none" stroke="var(--muted)" stroke-dasharray="4 3" stroke-width=".8"/>`;
  const hf=M.serverFoot||M.foot; if(hf) svg+=`<polygon points="${pts(toUV(hf))}" fill="none" stroke="var(--fg)" stroke-width="1.3"/>`;
  const labs=[[lot,'Lot, '+n0(b.lot)+' m²'],[b.yard?toUV(b.yard):null,'Inside the yards, '+n0(b.build)+' m²'],[hf?toUV(hf):null,'Data centre as drawn now']].filter(x=>x[0]);
  const right=X(u1)+30; labs.forEach(([uv,t],i)=>{ const ly=pad+14+i*22, cx=Math.max(...uv.map(p=>X(p[0]))), cy=Math.min(Y(Math.min(...uv.map(p=>p[1])))+14+i*18,Y(Math.max(...uv.map(p=>p[1])))-4); const kx=right-8-6*i; /* drawing */
    svg+=`<polyline points="${cx},${cy} ${kx},${cy} ${kx},${ly} ${right-3},${ly}" fill="none" stroke="var(--line-2)" stroke-width=".8"/><text x="${right}" y="${ly+4}" font-size="13" fill="var(--fg)">${esc(t)}</text>`; }); /* drawing */
  const bar=(y,title,parts)=>{ let x=pad, s=`<text x="${pad}" y="${y-8}" font-size="12" fill="var(--muted)">${esc(title)}</text>`; const W=Wd+180-2*pad; /* drawing */
    parts.forEach(([v,of,lab,fill])=>{ const w=Math.max(0,W*v/of); s+=`<rect x="${x}" y="${y}" width="${w}" height="16" fill="${fill}" stroke="var(--bg)"/>`+(w>40?`<text x="${x}" y="${y+32}" font-size="12" fill="var(--fg)">${esc(lab)}</text><text x="${x}" y="${y+47}" font-size="12" fill="var(--muted)">${n0(v/of*100)}%</text>`:''); x+=w; }); return s; }; /* drawing */
  svg+=bar(Hd+34,`Building coverage: ${n0(c.cover)} of ${n0(b.build)} m² inside the yards`,[[c.cover,b.build,'Footprint','#8D8C87'],[b.build-c.cover,b.build,'Not built on','var(--line)']]); /* drawing */
  svg+=bar(Hd+118,`Floor area: ${n0(c.allowed)} m² allowed`,[[c.dcM2,c.allowed,'Data centre','#6F6E69'],[c.progM2,c.allowed,'Programs','#B9B8B4'],[c.unused,c.allowed,'Not used','var(--line)']]); /* drawing */
  d.innerHTML=`<svg viewBox="0 0 ${Wd+200} ${Hd+190}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Lot plan with the line of the yards, the data centre as drawn now, and the coverage and floor-area split">${svg}</svg><div class="sub" style="position:absolute;left:16px;right:16px;bottom:4px;font-size:11px">Plan · the split is by floor area, not lot area</div>`; } /* drawing */

/* ---------- steps ---------- */
async function ready(){ css(); await A.ready; if(!CAT.list) throw new Error('arch_programs.json did not load'); }
async function viewPrograms(){ await ready(); BD.S.view2='tab'; const sd=$('#side');
  const groups=GROUP.map(([g,l])=>{ const L=CAT.list.filter(p=>p.group===g); if(!L.length) return ''; return `<div class="agrp"><h4 class="spf">${esc(l)}</h4>${L.map(p=>{ const on=!!pickOf(p.id); const s=p.size||{};
      return `<div class="apick"><span>${esc(p.name)}<br><small>${p.kind==='mass'?(s.typical_m2!=null?'typical '+n0(s.typical_m2)+' m²':'size ?'):esc(p.kind)} · ${esc((p.occ&&p.occ.group)||'?')}</small></span><button data-add="${p.id}" aria-pressed="${on}">${on?'Added':'Add'}</button></div>`; }).join('')}</div>`; }).join('');
  sd.innerHTML=`${tabsHTML('aprog')}<h2>Programs</h2><p class="lead">Pick what the site could hold with the data centre. Each starts at a sourced typical size; you set it in the next step.</p>
   <p class="sub">${A.picks.length?`${A.picks.length} picked.`:'Nothing picked yet.'} Hover a grey tag to read its source; "?" means no source was found.</p>${groups}`;
  sd.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{ const id=b.dataset.add; pickOf(id)?del(id):add(id); viewPrograms(); });
  wireTabs(sd);
  draw3d(); }
async function viewArrange(){ await ready(); BD.S.view2='tab'; const sd=$('#side'); const P=place();
  if(!P){ sd.innerHTML=`${tabsHTML('aarr')}<h2>Arrange</h2><p class="lead">Architecture mode needs a new building on a lot with a known shape. Pick a lot and set it up as a new build.</p>`; return; }
  const B=budgets(P), RL=rules(P); A.last={P,B,RL};
  const presets=[['suggest','Suggested'],['lot','Lot line'],['wall','Building wall'],['hall','Hall wall']];
  sd.innerHTML=`${tabsHTML('aarr')}<h2>Arrange</h2><p class="lead">The tool places each program by its rules; you resize, lock, delete and choose options. Nothing is scored.</p>${splitLine(P.ratio)}${hallLine(P)}${budHTML(B)}${A.msg?`<div class="aflag bad">${esc(A.msg)}</div>`:''}
   <div class="abar ctl" style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;font-size:12px">Secure line ${presets.map(([k,l])=>`<button data-sec="${k}" aria-pressed="${A.secure===k}">${l}</button>`).join('')} ${chips(['arch_sec_gcpsg015AppC'])}</div>
   <p class="sub" style="font-size:11.5px">Suggested: the tightest line that keeps the hall, its plant and loading inside. A design choice, not a rule (J.B., 1 Nov 2026).</p>
   ${A.picks.length?A.picks.map(rowHTML).join(''):'<p class="sub">No programs yet. Go back to add some.</p>'}
   <h3 style="font-size:13px;margin-top:14px">Rules ${RL.filter(r=>r.sev==='bad').length?`<span class="k">${RL.filter(r=>r.sev==='bad').length}</span> flagged`:''}</h3>
   ${RL.length?RL.map(r=>`<div class="aflag ${r.sev}">${esc(r.t)} ${chips(r.src)}</div>`).join(''):'<p class="sub">No rule flags.</p>'}
   <p class="sub" style="font-size:11.5px">Drawn by the tool, not rules: where each block sits (a 2 m grid, front to back), its proportions (no side under 6 m; a pool block at least its tank and deck), a separate refuge building 3 m away, and ${P.s.city==='van'&&AD.storeyMin[zoneCode()]?`program storeys at the ${esc(zoneCode())} minimums, 6.0 m on the first floor and 4.0 m above (s. 3.1.2.9) ${chips(['arch_hb_vanI3'])}`:`program storeys at ${n0(P.s.ftf.ground)} m: the hall's storey height, not a program's; a program's own storey height has no source here (?) ${chips(['envelope','burlingtonPlans2026'])}`}.</p>
   <p><button id="aSave" class="btn">Save this arrangement</button> <span class="sub">${A.saved.length} saved</span></p>`;
  wire(sd); draw3d(P); }
/* hall fix (3 Nov 2026): the hall Arrange chose, in one line */
function hallLine(P){ const h=P.hallPick; if(!h||!P.hall.own||!h.best) return ''; const b=h.best, ftf=P.s.ftf, g=b.st-b.k;
  return `<p class="sub asplit">Data hall: ${b.k} hall storey${b.k>1?'s':''}${g?' on a ground storey kept for other uses':''}, ${n0(b.top)} m tall (ground ${ftf.ground.toFixed(1)} m, hall floors ${ftf.up[1].toFixed(1)} m) ${chips(['envelope','burlingtonPlans2026'])}, ${n0(b.fa)} m² a floor, along the ${b.along==='back'?'back':'side'}. Of ${h.passed} footprint option${h.passed===1?'':'s'} that pass the set-up, the one that draws the most of the programs' share (a drawing choice, not a rule) ${chips(['arch_ratios'])}.</p>`; }
function wire(sd){ const re=()=>{ A.msg=null; viewArrange(); }, reK=()=>viewArrange(); wireTabs(sd);
  sd.querySelectorAll('[data-editr]').forEach(a=>a.onclick=e=>{ e.preventDefault(); BD.flow&&BD.flow.to('arat'); });
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
  { const c=capOf(p); if(v!=null&&c!=null&&v>c){ v=c; A.msg=`${p.name}: ${n0(c)} m² is the most this use may have in BE.`; } }
  if(v!=null&&v<0) v=0; const old=q.m2||0; q.m2=v; if(v==null||v<=old) return; let P=place(); if(!P) return; let B=budgets(P);
  { const k=p.heat&&p.heat.kWh_m2_yr; if(k&&B.heat.avail&&B.heat.need[1]>B.heat.avail[0]){ const ex=(B.heat.need[1]-B.heat.avail[0])*1000/k[1]; v=Math.max(old,v-ex); q.m2=v; A.msg=`Held at ${n0(v)} m²: the heat it needs would pass the ${n0(B.heat.avail[0])} MWh/yr the hall offers at the low end.`; if(v<=old) return; P=place(); B=budgets(P); } } // heat ceiling first (review 2, N7)
  let over=Math.min(v-old,B.space.left!=null?-B.space.left:0);
  if(over>0){ const noMin=[]; for(let pass=0;pass<12&&over>0.5;pass++){ const others=A.picks.filter(o=>o!==q&&!o.lock&&o.m2!=null&&CAT.byId[o.id].kind==='mass'&&minOf(CAT.byId[o.id])!=null&&o.m2>minOf(CAT.byId[o.id])+0.5);
      if(!others.length) break; const tot=others.reduce((t,x)=>t+x.m2-minOf(CAT.byId[x.id]),0); for(const o of others){ const can=o.m2-minOf(CAT.byId[o.id]), take=Math.min(can,over*can/tot); o.m2-=take; } over-=Math.min(over,tot); }
    A.picks.forEach(o=>{ if(o!==q&&!o.lock&&o.m2!=null&&CAT.byId[o.id].kind==='mass'&&minOf(CAT.byId[o.id])==null) noMin.push(CAT.byId[o.id].name.split(' (')[0]); });
    if(over>0.5){ q.m2=Math.max(old,v-over); A.msg=`Stopped at ${n0(q.m2)} m²: ${B.space.ratio?'the programs\' share of the floor (set in Ratios)':B.space.capF!=null&&B.space.capF<B.space.capE?'the zone\'s floor-space ratio':'the room inside the setbacks and height limit'} is used up. Locked programs, programs at their minimum${noMin.length?', and those with no sourced minimum ('+noMin.join(', ')+')':''} keep the rest.`; } }
 }
function snapshot(){ const L=A.last; if(!L) return; const P=L.P, B=L.B, s=P.s; const [m,n]=secArea(P);
  const front=P.boxes.filter(b=>b.front&&b.p.place&&b.p.place.public&&b.v).reduce((t,b)=>t+Math.abs(b.v[1]-b.v[0]),0);
  A.saved.push({n:A.saved.length+1,secure:A.secure,picks:JSON.parse(JSON.stringify(A.picks)),space:B.space,heat:B.heat,bad:L.RL.filter(r=>r.sev==='bad').length,notes:L.RL.length,front,W:s.W,pubShare:n?(n-m)/n:null}); }
async function viewCompare(){ await ready(); BD.S.view2='tab'; const sd=$('#side'); const S=A.saved;
  const row=(l,f)=>`<tr><th>${l}</th>${S.map(x=>`<td>${f(x)}</td>`).join('')}</tr>`;
  sd.innerHTML=`${tabsHTML('acmp')}<h2>Compare</h2><p class="lead">Saved arrangements side by side. No total score: each row is a different kind of good.</p>
   ${S.length?`<div style="overflow-x:auto"><table class="acmp"><tr><th></th>${S.map(x=>`<th>Arrangement ${x.n}</th>`).join('')}</tr>
   ${row('Programs',x=>esc(x.picks.map(q=>CAT.byId[q.id].name.split(' (')[0]+(q.m2!=null?' '+n0(q.m2)+' m²':'')).join(', ')))}
   ${row('Secure line',x=>esc({suggest:'suggested',lot:'lot line',wall:'building wall',hall:'hall wall'}[x.secure]))}
   ${row('Floor used',x=>x.space.cap?`${n0(x.space.hall+x.space.prog)} of ${n0(x.space.cap)} m²`:'?')}
   ${row('Heat used (counted programs)',x=>x.heat.avail?`${rg(x.heat.need,'MWh/yr')} of ${rg(x.heat.avail,'MWh/yr')}`:'?')}
   ${row('Street front to public use',x=>`${n0(x.front)} of ${n0(x.W)} m`)}
   ${row('Share of the lot the public can reach',x=>x.pubShare==null?'?':n0(x.pubShare*100)+'%')}
   ${row('Rules flagged',x=>`${x.bad} (of ${x.notes} notes)`)}
   ${row('Controlled doors from street to servers',x=>'? (not modelled yet)')}</table></div>`:'<p class="sub">Save an arrangement in the Arrange step to compare it here.</p>'}
   <p class="sub" style="font-size:11.5px">Street front and public share are our arithmetic on the drawn massing (public share sampled on a 1 m grid); floor and heat carry their sources in Arrange; heat counts only programs with a sourced demand. No row is a source-backed score.</p>`; wireTabs(sd); draw3d(); }

/* ---------- drawing: 3D, plan per storey, section; heat view ---------- */
function warmCool(t){ if(t==null) return null; const k=Math.max(0,Math.min(1,(t-15)/(60-15))); const a=[93,127,153], b=[209,163,94]; return `rgb(${a.map((x,i)=>Math.round(x+(b[i]-x)*k)).join(',')})`; } // heat view only: warm-to-cool, separate from the red accent (J.B., 2 Nov 2026) /* drawing */
/* night build 4 Nov 2026 (part 3; J.B. 2 Nov: the data centre as its own massing items): the hall's box split into the data hall and its electrical (UPS)
   and Li-ion battery rooms on its first floor (dcrooms.js; sizes tool/data/dc_rooms.json). MW and the end of each m²-per-MW range follow Ratios: the low end of
   the MW range is the high m² per MW, so the rooms fill the data centre's share. Without ratios: the set-up's MW at the high m² per MW. Where the zone keeps
   the ground floor for other uses (I-2, I-3, FC-2), that storey of the box is drawn on its own. Drawing only: placement, budgets and rules are unchanged. */
function dcPieces(P){ if(!BD.dcRooms) return null; const s=P.s, RT=P.ratio, An=BD.S.answers, mw=RT&&RT.mwTest?RT.mwTest:(An.mw||s.M.mwSized), end=RT&&RT.r&&RT.r.end==='high'?'lo':'hi';
  const nf=Math.max(1,(P.hall.storeys||s.floors)-(P.hall.base>0?1:0)), fh=P.hall.h/nf, lv0=P.hall.base>0?1:0, g=s.Z&&s.Z.ground&&P.hall.base===0&&nf>1?1:0;
  const L=BD.dcRooms.layout({F:s.F,u:P.hall.u,v:P.hall.v,z0:P.hall.base+g*fh,fh:Array(nf-g).fill(fh),mw,end,ground:g*fh}); if(!L) return null;
  const out=L.pieces.map(p=>({ring:p.ring,base:p.base,h:p.h,hall:p.id==='hall',room:p.id==='electrical'||p.id==='battery',rest:p.id==='rest'||p.id==='gst',level:lv0+g+p.level,name:p.name,id:p.id,m2:p.m2}));
  return {L,out,nf,fh,lv0,g}; }
async function draw3d(P){ P=P||place(); if(!P||!BD.scene3d) return; if(!P.secRing) rules(P);
  const nf=Math.max(1,(P.hall.storeys||P.s.floors)-(P.hall.base>0?1:0)), fh=P.hall.h/nf /* hall fix: the hall's own storeys */, lv0=P.hall.base>0?1:0;
  const DP=dcPieces(P), lastOf=id=>DP.out.filter(b=>b.id===id).slice(-1)[0];
  const hallB=DP?DP.out.map(b=>Object.assign({},b,{label:b===lastOf(b.id)&&!(b.id==='rest'&&b.m2<20)?b.name+((DP.L.rooms.find(r=>r.id===b.id)||{}).m2!=null?' '+n0(DP.L.rooms.find(r=>r.id===b.id).m2)+' m²':''):null})):A.explode?Array.from({length:nf},(_,k)=>({ring:P.hall.ring,base:P.hall.base+k*fh,h:fh,hall:true,level:k+lv0,label:k===nf-1?'Data hall':null})):[{ring:P.hall.ring,base:P.hall.base,h:P.hall.h,hall:true,label:'Data hall'}]; /* drawing */
  const boxes=hallB.concat(P.boxes.map(b=>({ring:b.ring,base:b.base,h:b.h,sel:A.sel===b.id,bad:!!b.bad,label:b.p.name.split(' (')[0],level:b.level})));
  await BD.scene3d.show('arch',{site:BD.eng.siteFacts(),boxes,explode:A.explode,secure:P.secRing,roomNote:DP?BD.dcRooms.note(DP.L):''}); bar(P); const pl=$('#aPlan'); if(A.view!=='3d') plan(P); else if(pl) pl.style.display='none'; }
function bar(P){ const host=document.getElementById('v3d'); if(!host) return; if(P&&P.levels.length&&!P.levels.includes(A.storey)) A.storey=P.levels[0]; let v=$('#aView'); if(!v||v.parentElement!==host){ if(v) v.remove(); v=document.createElement('div'); v.id='aView'; v.className='aview'; host.appendChild(v); }
  const lv=P?P.levels:[]; v.style.display='';
  v.innerHTML=[['3d','3D'],['plan','Plan'],['section','Section']].map(([k,l])=>`<button data-v="${k}" aria-pressed="${A.view===k}">${l}</button>`).join('')+
   (A.view==='3d'?`<button data-ex aria-pressed="${A.explode}">Explode</button>`:'')+(A.view==='plan'&&lv.length?lv.map(l=>`<button data-sy="${l}" aria-pressed="${A.storey===l}">${l===0?'Ground':'Storey '+(l+1)}</button>`).join(''):'')+
   (A.view!=='3d'?`<button data-h="grad" aria-pressed="${A.heat==='grad'}">Heat gradient</button><button data-h="flow" aria-pressed="${A.heat==='flow'}">Heat flow</button>`:'')+`<button data-lb aria-pressed="${A.labels}" style="margin-left:12px">Labels ${A.labels?'on':'off'}</button>`;
  v.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{ A.view=b.dataset.v; draw3d(); });
  v.querySelectorAll('[data-ex]').forEach(b=>b.onclick=()=>{ A.explode=!A.explode; draw3d(); });
  v.querySelectorAll('[data-sy]').forEach(b=>b.onclick=()=>{ A.storey=+b.dataset.sy; draw3d(); });
  v.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{ A.heat=A.heat===b.dataset.h?null:b.dataset.h; draw3d(); }); v.querySelectorAll('[data-lb]').forEach(b=>b.onclick=()=>{ A.labels=!A.labels; draw3d(); }); }
function plan(P){ const host=document.getElementById('v3d'); if(!host||!P) return; let d=$('#aPlan'); if(!d||d.parentElement!==host){ if(d) d.remove(); d=document.createElement('div'); d.id='aPlan'; host.appendChild(d); } d.style.display='block';
  const s=P.s, F=s.F, sec=A.view==='section'; const toUV=r=>{ const o=[]; for(let i=0;i<r.length;i+=2) o.push(F.toL(r[i],r[i+1])); return o; };
  const lotUV=toUV(s.M.ring); const us=lotUV.map(p=>p[0]), vs=lotUV.map(p=>p[1]); const u0=Math.min(...us), u1=Math.max(...us), v0=Math.min(...vs), v1=Math.max(...vs);
  const pad=24, Wd=620, Hd=460; const hMax=Math.max(s.H||20,...P.boxes.map(b=>b.base+b.h),P.hall.base+P.hall.h); /* drawing */
  const sx=(Wd-2*pad)/Math.max(1,u1-u0), sy=sec?(Hd-2*pad)/Math.max(1,hMax*1.15):(Hd-2*pad)/Math.max(1,v1-v0), k=Math.min(sx,sy);
  const X=u=>pad+(u-u0)*k, Y=v=>sec?Hd-pad-v*k:pad+(v-v0)*k;
  const DP=dcPieces(P), lastOf=id=>DP.out.filter(b=>b.id===id).slice(-1)[0]; /* part 3: the hall and its rooms, one piece per storey */
  const hallE=DP?DP.out.map(b=>({ring:b.ring,base:b.base,h:b.h,t:b.hall?mid(dcTemp()):null,name:b.name,hall:b.hall,room:b.room||b.rest,lvl:Math.floor(b.base/P.s.ftf.ground+0.01),nolab:(sec&&b!==lastOf(b.id))||(b.id==='rest'&&b.m2<20)})):[{ring:P.hall.ring,base:P.hall.base,h:P.hall.h,t:mid(dcTemp()),name:'Data hall',hall:true,lvl:'all',lvls:null}]; /* drawing */
  const all=hallE.concat(P.boxes.map(b=>({ring:b.ring,base:b.base,h:b.h,t:b.p.heat&&b.p.heat.supply_C?mid(b.p.heat.supply_C):null,name:b.p.name.split(' (')[0],sel:A.sel===b.id,bad:b.bad,lvl:b.level,lvls:b.levels,src:b.p.heat&&b.p.heat.src,mwh:b.p.heat&&b.p.heat.kWh_m2_yr&&b.q.m2?mid(b.p.heat.kWh_m2_yr)*b.q.m2/1000:null})));
  const vis=sec?all:all.filter(b=>b.lvl==='all'?A.storey*P.s.ftf.ground<b.base+b.h:typeof b.lvl==='number'&&!b.lvls?b.lvl===A.storey:(b.lvls||[]).includes(A.storey));
  let svg=`<defs><pattern id="aq" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="var(--line-2)" stroke-width="1"/></pattern></defs>`;
  if(!sec){ svg+=`<polygon points="${lotUV.map(p=>X(p[0])+','+Y(p[1])).join(' ')}" fill="none" stroke="var(--line-2)" stroke-width="1"/>`; (s.M.plant&&s.M.plant.boxes||[]).filter(b=>b.kind!=='roof').forEach(b=>{ svg+=`<polygon points="${toUV(b.ring).map(p=>X(p[0])+','+Y(p[1])).join(' ')}" fill="none" stroke="#8D8C87" stroke-width=".7"/>`; }); (P.secRing||[]).forEach(r=>{ svg+=`<polygon points="${toUV(r).map(p=>X(p[0])+','+Y(p[1])).join(' ')}" fill="none" stroke="#6E6E6B" stroke-dasharray="5 3" stroke-width="1"/>`; }); } else svg+=`<line x1="${X(u0)}" y1="${Y(0)}" x2="${X(u1)}" y2="${Y(0)}" stroke="var(--cut)" stroke-width="1.6"/>`+(s.H?`<line x1="${X(u0)}" y1="${Y(s.H)}" x2="${X(u1)}" y2="${Y(s.H)}" stroke="var(--line-2)" stroke-dasharray="4 3"/><text x="${X(u0)}" y="${Y(s.H)-5}" font-size="12" fill="var(--muted)">height limit ${n0(s.H)} m</text>`:''); /* drawing */
  const labs=[]; vis.forEach(b=>{ const uv=toUV(b.ring), bu=uv.map(p=>p[0]), bv=uv.map(p=>p[1]); const ua=Math.min(...bu), ub=Math.max(...bu);
    const fill=A.heat==='grad'?(b.t==null?'url(#aq)':warmCool(b.t)):'transparent'; const st=b.bad?'var(--accent)':b.sel?'var(--accent)':sec?'var(--cut)':'var(--fg)'; /* section cut black (white interface) */
    if(sec) svg+=`<rect x="${X(ua)}" y="${Y(b.base+b.h)}" width="${(ub-ua)*k}" height="${b.h*k}" fill="${fill}" fill-opacity="${A.heat==='grad'?.85:0}" stroke="${st}" stroke-width="${b.sel||b.bad?1.6:1.3}"/>`;
    else svg+=`<polygon points="${uv.map(p=>X(p[0])+','+Y(p[1])).join(' ')}" fill="${fill}" fill-opacity="${A.heat==='grad'?.85:0}" stroke="${st}" stroke-width="${b.sel||b.bad?1.6:.8}"/>`;
    const cx=(X(ua)+X(ub))/2, cy=sec?Y(b.base+b.h/2):(Y(Math.min(...bv))+Y(Math.max(...bv)))/2; if(!b.nolab) labs.push({cx,cy,t:b.name+(A.heat==='grad'?(b.t==null?' (?)':b.hall?' '+rg(dcTemp(),'°C')+' (heat_temp)':' '+n0(b.t)+' °C'):''),hall:b.hall,mwh:b.mwh,b}); });
  // labels off the drawing on right-angled leaders (J.B.: 90° leaders; labels beside, never on)
  const right=Math.max(...[X(u1)])+28; let last=-1e9; (A.labels?labs:[]).slice().sort((a,b)=>a.cy-b.cy).forEach((L,i,arr)=>{ const ly=Math.max(L.cy,last+17); last=ly; const kx=right-6-4*(arr.length-1-i); /* drawing */
    svg+=`<polyline points="${L.cx},${L.cy} ${kx},${L.cy} ${kx},${ly} ${right-3},${ly}" fill="none" stroke="var(--line-2)" stroke-width=".8"/><circle cx="${L.cx}" cy="${L.cy}" r="1.6" fill="var(--line-2)"/><text x="${right}" y="${ly+4}" font-size="13" fill="var(--fg)">${esc(L.t)}</text>`; }); /* drawing */
  if(A.heat==='flow'&&labs.some(l=>l.hall)){ const hall=labs.find(l=>l.hall); const mx=Math.max(1,...labs.map(l=>l.mwh||0)); labs.filter(l=>!l.hall&&l.mwh).forEach(l=>{ svg+=`<polyline points="${hall.cx},${hall.cy} ${hall.cx},${l.cy} ${l.cx},${l.cy}" fill="none" stroke="${warmCool(45)}" stroke-opacity=".8" stroke-width="${1+7*l.mwh/mx}"/>`; }); } /* drawing */
  if(A.heat) svg+=`<g transform="translate(${pad},${Hd+12})">${A.heat==='grad'?[15,30,45,60].map((t,i)=>`<rect x="${i*46}" y="-10" width="44" height="8" fill="${warmCool(t)}"/><text x="${i*46}" y="10" font-size="11" fill="var(--muted)">${t} °C</text>`).join('')+`<text x="196" y="-2" font-size="12" fill="var(--muted)">supply temperature each program needs (sourced); hatched = ? · a diagram, not a thermal simulation</text>`:`<text x="0" y="0" font-size="12" fill="var(--muted)">routes from the hall; width = yearly heat (MWh, sourced demand × size); programs with no demand source not drawn</text>`}</g>`; /* drawing */
  const srcIds=[...new Set(vis.filter(b=>!b.hall&&!b.room).flatMap(b=>(b.src||[])))];
  d.innerHTML=`<svg viewBox="0 0 ${Wd+250} ${Hd+30}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${sec?'Section':'Plan'} of the arrangement">${svg}</svg><div class="sub" style="position:absolute;left:16px;right:16px;bottom:4px;font-size:11px">${A.heat==='grad'?'Temperatures: '+chips(srcIds)+' · hall: register heat_temp '+chips(['yuan2025','nrelESIF2019'])+' · ':''}${sec&&s.H?'Height limit: '+chips(s.city==='van'?['van_zdb_i2','van_zdb_i3']:['edm_bl20001']):''}</div>`; } /* drawing */

BD.views=BD.views||{}; BD.views.arat=viewRatios; BD.views.aprog=viewPrograms; BD.views.aarr=viewArrange; BD.views.acmp=viewCompare;
BD.archHide=()=>{ const v=$('#aView'); if(v) v.style.display='none'; const p=$('#aPlan'); if(p) p.style.display='none'; };
BD.archTest={place,budgets,rules,add,del,resize,CAT,ratioBase,ratioCalc,ratioNow};
})();
