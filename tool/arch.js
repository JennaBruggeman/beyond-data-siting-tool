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
const A=BD.arch={bands:false /* 7 Nov 2026 (J.B.): programs as bands of one building. UNFINISHED and off: plan.js does not draw the lobby, spine and cores yet; paused for the lot-type study (J.B. 7 Nov) */,picks:[],secure:'suggest',view:'3d',explode:false,labels:true /* Labels on/off (white interface, 3 Nov 2026) */,heat:null,storey:0,sel:null,saved:[],ready:null,ratio:null};
const n0=v=>v==null||!isFinite(v)?'?':Math.round(v).toLocaleString('en-CA');
const rg=(a,u)=>!a?'?':(a[0]===a[1]?n0(a[0]):n0(a[0])+'–'+n0(a[1]))+(u?' '+u:'');
const mid=a=>a?(a[0]+a[1])/2:null;
const mwR=a=>!a||!(a[1]>0)?'?':a[0].toFixed(1)+'–'+a[1].toFixed(1)+' MW'; // an MW range to 0.1, ends floored so the share always holds them

/* ---------- data ---------- */
A.ready=Promise.all([fetch('arch_programs.json').then(r=>r.json()),fetch('opps.json').then(r=>r.ok?r.json():{}).catch(()=>({}))]).then(([P,O])=>{
  CAT.list=P.programs.filter(p=>!p.hidden); /* 7 Nov 2026: 'out for now' programs (hidden) stay in the catalogue, not in the list */  P.programs.forEach(p=>CAT.byId[p.id]=p); CAT.src=O.sources||{}; CAT.kind=O.source_kinds||{}; CAT.meta=P.meta; }).catch(e=>console.warn('arch data',e));
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
function industrialUse(q,code){ if(['heat_plant','food_drying','ev_hub'].includes(q.id)) return true; if(/I-2/.test(code)&&(q.id==='community_kitchen'||(q.id==='laundry'&&q.opt==='commercial'))) return true; return false; }
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
    else { An.hallOpt=null; BD.modelReset(); const M0=BD.model(); let opts=(M0&&M0.hallOpts)||[];
      /* 7 Nov 2026 (J.B.: 'programs must never be separate buildings'): in band mode the hall spans the full buildable width at the back, so the hall and the
         program bands in front of it make one rectangle (WORKLIST 5, card 11: street → public programs → shared lobby → spine → data centre → plant yard) */
      if(A.bands&&opts.length){ const wM=Math.max(...opts.map(o=>o.v[1]-o.v[0])); opts=opts.filter(o=>o.v[1]-o.v[0]>=wM-0.01); info.bands=true; }
      info.n=opts.length; let best=null;
      for(const o of opts){ An.hallOpt=o.key; BD.modelReset(); info.tried++; { const pr=BD.setupProblems(true); if(pr.length){ (info.fails=info.fails||[]).push([o.key,pr[0]]); continue; } } const P=placeOnce(); if(!P||!P.s.M.hallOpt) continue; info.passed++;
        const sc=hallScore(P); if(!best||sc[0]>best.sc[0]+0.5||(Math.abs(sc[0]-best.sc[0])<=0.5&&(sc[1]<best.sc[1]||(sc[1]===best.sc[1]&&sc[2]<best.sc[2]-0.01)))) best={o,sc}; }
      An.hallOpt=best?best.o.key:'full'; info.best=best&&{key:best.o.key,k:best.o.k,st:best.o.st,top:best.o.top,along:best.o.along,a:best.o.a,fa:best.o.fa,drawn:best.sc[0]}; }
    BD.modelReset(); hallPick={key,opt:An.hallOpt,info}; }
  else if(An.hallOpt!==hallPick.opt){ An.hallOpt=hallPick.opt; BD.modelReset(); }
  const P=placeOnce(); if(!P) return P; P.hallPick=hallPick.info;
  /* J.B. 7 Nov 2026: the hall floor the dock takes comes out of the MW: feed it back to Ratios once and place again (the footprint stays: dcFloor is unchanged) */
  /* J.B. 7 Nov 2026: loading counts only the programs Arrange draws (site.js progFloor reads A.drawn); the rest are named in the loading note */
  const dk=JSON.stringify([selId(),P.boxes.map(x=>x.id).sort()]), drawnNew=!A.drawn||A.drawn.key!==dk; if(drawnNew) A.drawn={key:dk,site:selId(),ids:P.boxes.map(x=>x.id),not:(P.notDrawn||[]).slice()};
  if(A.ratio&&!place.again){ const DP=dcPieces(P), lost=DP&&DP.L.dock?Math.round(DP.L.dock.hallLost||0):0, had=A.ratio.dockSite===A.ratio.site?(A.ratio.dockLost||0):0, lostNew=Math.abs(lost-had)>0.5;
    if(lostNew||drawnNew){ if(lostNew){ A.ratio.dockLost=lost; A.ratio.dockSite=A.ratio.site; ratioApply(); } else BD.modelReset(); place.again=true; try{ return place(); } finally{ place.again=false; } } }
  if(!under&&An.hallOpt==='full') P.flags.unshift({t:`Data hall: none of its ${hallPick.info.n} footprint options passes the set-up here (plant on its roof, loading, fuel or noise), so it is drawn full width at the back, to the height limit, as before (a drawing choice, not a rule).`,src:['arch_ratios'],sev:'note'});
  return P; }
function hallScore(P){ const drawn=P.boxes.reduce((t,b)=>t+(b.q.m2||0),0), spread=P.boxes.filter(b=>b.spread).length;
  const street=P.boxes.filter(b=>b.p.place&&b.p.place.street_entrance).reduce((t,b)=>t+Math.min(Math.abs(b.u[0]-P.s.uf),Math.abs(b.u[1]-P.s.uf)),0)+(P.notDrawn||[]).filter(id=>{ const p=CAT.byId[id]; return p&&p.place&&p.place.street_entrance; }).length*1e4;
  return [drawn,spread,street]; }
function placeOnce(){ const s=site(); if(!s) return null; const {F,G,dir,v0,v1,W,a0,uf,ftf}=s; const out={s,boxes:[],flags:[],hall:null,levels:[]};
  { const Y=s.M.yards, U=(s.M.edgeYards||[]).filter(e=>e.kind==='unclear'); if(Y&&Y.unclear&&U.length) out.flags.push({t:`Lot lines: ${U.length>1?U.length+' edges are':'one edge ('+Math.round(U[0].len||0)+' m) is'} neither clearly a side nor a rear line; the deeper yard (${Math.max(...U.map(e=>e.d||0))} m) is applied, the safer reading. Read as a side line it would leave more ground (our reading ?).`,src:[(s.M.Z&&s.M.Z.srcId)||'edm_bl20001'],sev:'note'}); } /* 7 Nov 2026 (J.B.): keep the safer yard, flag it */
  { const z=zoneOK(); if(!z.ok) out.flags.push({t:`Not allowed here; rezoning needed. ${String(z.why).replace(/<[^>]+>/g,'')} Shown as if rezoned: a flagged option, not a prediction.`,src:[(s.M.Z&&s.M.Z.srcId)||'edm_bl20001'],sev:'bad'}); } /* WORKLIST 3 zone rule */
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
  if(s.M.loadInside) out.flags.push({t:`Loading: ${s.M.loadInside.n} bay${s.M.loadInside.n>1?'s':''} inside the building (${n0(s.M.loadInside.m2)} m² of ground storey; Architecture default, as the test fits draw it). Ratios takes this floor out of the ground; Arrange draws it on the ground storey at the rear end of the building (drawing choice)${out.hall.base>0?'; not drawn here, because the refuge takes the ground floor under the hall':''}.`,src:['arch_ratios'],sev:'note'});
  const bu0=um[0], bu1=um[1], bw=v1-v0, bl=bu1-bu0, cs=2, nU=Math.max(1,Math.floor(bl/cs)), nV=Math.max(1,Math.floor(bw/cs));
  // a 2 m height grid over the buildable area: the top of what stands on each cell, or no-go (review 2, N1: a block must rest flat on what is under it)
  /* a cell is taken if anything overlaps any part of it (not just its centre), and cells not wholly inside the lot are no-go (review of J.B.'s screenshot, 2 Nov 2026) */
  const lotR=s.M.yardOff||s.M.ring /* LOTLINES 4 Nov 2026: programs stay out of every lot line's yard */, inLot=(u,v)=>{ const w=F.toW(u,v); return inside(w,lotR); };
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
  if(RT&&RT.b&&RT.r){ const cp=dcCapPct(RT.b,RT.r,null); if(RT.r.dc>cp.geo&&cp.G&&cp.G.pg.items.length) out.flags.push({t:`Data centre: its share (${RT.r.dc}%) leaves too little ground for the picked programs beside the hall. ${groundLine(RT.b,RT,cp).replace(/<[^>]+>/g,'')} Back in Ratios it takes at most ${cp.geo}%.`,src:['arch_ratios'],sev:'bad'}); } /* ratio ground, 4 Nov 2026 */
  if(RT&&s.hallM2<RT.dcM2-1) out.flags.push({t:`Data centre: its share (${n0(RT.dcM2)} m²) does not fit beside loading and the plant yard here; ${n0(s.hallM2)} m² drawn. Edit ratios or the set-up.`,src:['arch_ratios'],sev:'bad'});
  /* code limits block, they never just warn (J.B., 2 Nov 2026: "everything needs to follow the code"): no block above the zone's height limit,
     none past the floor-space ratio, none over an Edmonton BE area cap; setbacks and the hard distances are already no-go above */
  const SPN=2.0 /* drawing: the spine, the 2.0 m public corridor (code minimum 1.1 m, arch_nbc3432) */, hF=dir<0?hu0:hu1, BANDS=!!(A.bands&&RT&&!under&&Math.abs(hv0-v0)<0.05&&Math.abs(hv1-v1)<0.05&&Math.abs(hF-uf)>=SPN+6), bandQ=[];
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
    if(BANDS&&!roof&&!(q.id==='refuge'&&q.opt==='own_building')){ bandQ.push({q,p,nm,atG,mustSt,notG,own0:p.size&&p.size.floor_height_m,md:minDims(q.id,s.city)}); floorUsed+=q.m2; progUsed+=q.m2; if(!industrialUse(q,code)) nonInd+=q.m2; continue; } /* placed below as bands */
    /* Build 2 (3 Nov 2026): on Vancouver I-3 lots a program's storeys are drawn at the schedule's minimums, 6.0 m on the first floor and 4.0 m above (s. 3.1.2.9; tool/data/arch.json storeyMin, register arch_hb_vanI3), or its own sourced height if taller. Elsewhere the hall's 6.0 m storey (ftf.ground), the hall's figure, not a program's (?). */
    /* 7 Nov 2026 (Cowork, V339 boards: clinic storeys 4 m against the data centre's 6 m): above the ground storey a program's storeys are drawn at the hall's
       storey height where that is taller than the minimum, so the floors line up and the blocks share floor levels (a drawing choice; 4.0 m stays the I-3 minimum) */
    let hallSH=out.hall&&out.hall.storeys?out.hall.h/out.hall.storeys:0; const own0=p.size&&p.size.floor_height_m, SM=s.city==='van'&&AD.storeyMin&&AD.storeyMin[code]||null, sh=(own0||ftf.ground), hOf=(b0,n)=>SM?(b0<0.01?Math.max(own0||0,SM.ground)+Math.max(own0||0,SM.above,hallSH)*(n-1):Math.max(own0||0,SM.above,hallSH)*n):sh*n, own=q.id==='refuge'&&q.opt==='own_building', gc=own?2:0; // own building: one 2 m cell clear all round (drawn, not a rule)
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
    const why={}; let best=search(HG(),why), st=best?best.st:st0, unaligned=false;
    /* where storeys at the hall's height leave no spot (the height limit), the program is drawn at the minimums and its floors flagged as not lining up */
    if(!best&&SM&&hallSH>Math.max(own0||0,SM.above)+0.01){ const keep=hallSH; hallSH=0; const w2={}; const b2=search(HG(),w2); if(b2){ best=b2; st=b2.st; unaligned=keep; } else hallSH=keep; }
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
    /* 7 Nov 2026 (J.B.): a block on several storeys is drawn as real storeys: each floor its own room, with two stairs and a lift (plan.js, rule sheet v0).
       The clinic may sit on upper floors in Vancouver (J.B. 4 Nov 2026, Q7): a note. For other programs, splitting across floors stays a design question. */
    if(st>st0) out.flags.push({t:`${nm}: ${n0(q.m2)} m² on ${st} storeys of about ${n0(q.m2/st)} m² each${mustSt?' (it does not fit on one floor along the street front, where it needs its own entrance)':' (it does not fit on one floor here)'}, with two stairs and a lift (plan layer; their floor comes out of the program's, net floor in the plan).${q.id==='clinic'?' A clinic may sit on upper floors (J.B. 4 Nov 2026).':' Whether this program can be split across floors is a design question.'}`,src:q.id==='clinic'?['arch_ratios']:[],sev:q.id==='clinic'?'note':'q',id:q.id});
    if(unaligned&&st>1) out.flags.push({t:`${nm}: its upper floors are drawn ${n0(SM.above*10)/10} m apart (the ${code} minimum), not at the data centre's ${n0(unaligned*10)/10} m storeys, because ${n0(st)} storeys at that height pass the ${n0(Hmax)} m limit; floors that do not line up share no door (drawing choice ?).`,src:['arch_hb_vanI3'],sev:'q',id:q.id});
    const {base,i,j,dc,wc}=best, hh=hOf(base,st), spread=st>st0, uA=dir<0?bu0+i*cs:bu1-(i+dc)*cs, uB=uA+dc*cs, vA=v0+j*cs, vB=vA+Math.min(wc*cs,q.m2/st/(dc*cs)), gap=gc*cs; // exact area: full cells along u, the width trimmed to the size
    floorUsed+=q.m2; progUsed+=q.m2; if(base===0) gUsed+=q.m2/st; if(!industrialUse(q,code)) nonInd+=q.m2; occ.push([uA,uB,vA,vB,base,base+hh,false]); if(own) occ.push([uA-gap,uB+gap,vA-gap,vB+gap,0,1e9,true]);
    out.boxes.push({id:q.id,p,q,ring:G.rectW(F,uA,uB,vA,vB),base,h:hh,storeys:st,sh:hh/st,shSrc:SM?['arch_hb_vanI3']:own0?(p.size.src||[]):null,front:base===0&&Math.abs((dir<0?uA:uB)-uf)<cs+0.01,top:base>=hallTop-0.01,roof,u:[uA,uB],v:[vA,vB],gap,own,spread}); }
  /* 7 Nov 2026 (J.B.: 'programs must never be separate buildings'; WORKLIST 5 card 11): bands inside one building outline. From the street: the public
     programs side by side, each reaching the street, with the shared lobby between the first two; behind them the spine (a 2.0 m public corridor across the full
     width) against the data centre's front face, the 2 h wall (NBC Table 3.1.3.1); then the data centre; then the plant yard. Upper storeys stack on the same
     outline at the data centre's storey height (floors line up); a core (exit stair and lift) rises in the lobby's column and a second exit stair at the
     outline's side. A program on several storeys keeps the same columns on each. Drawing choices: lobby 6.0 m wide, slices at least 6 m wide (minDims), the
     floor left over is drawn as "floor not assigned (?)". What does not fit is not drawn, with the reason (the fallback ladder is still to come). */
  out.band=null; if(BANDS){ const lo=dir<0, inL=r=>inLot(r[0]+0.05,r[2]+0.05)&&inLot(r[1]-0.05,r[2]+0.05)&&inLot(r[0]+0.05,r[3]-0.05)&&inLot(r[1]-0.05,r[3]-0.05);
    const sp=lo?[hF-SPN,hF]:[hF,hF+SPN]; let uF=uf; { const back=lo?sp[0]:sp[1]; for(let k=0;k<200;k++){ const r=lo?[uF,back,hv0,hv1]:[back,uF,hv0,hv1]; if(inL(r)) break; uF+=lo?0.05:-0.05; } } /* the front face: the front yard line, or as near as a slanted line allows */
    const bu=lo?[uF,sp[0]]:[sp[1],uF], d=bu[1]-bu[0], W=hv1-hv0, LW=6.0 /* drawing */, gH=Math.max(ftf.ground,(s.city==='van'&&AD.storeyMin&&AD.storeyMin[code]||{}).ground||0), hallSH0=out.hall.h/Math.max(1,out.hall.storeys||1);
    const SMb=s.city==='van'&&AD.storeyMin&&AD.storeyMin[code]||null, cover=RT&&RT.cover?RT.cover:Infinity;
    const run=uH=>{ const kMax=Math.max(0,Math.floor((Hmax-gH)/uH+1e-6)), boxes=[], miss=[], notes=[];
      /* ground: street programs first (in the masses order), each a full-depth slice; the lobby after the first */
      const gq=bandQ.filter(x=>!x.notG), slices=[]; let vC=hv0, lobby=null, gArea=0; const g0=(hu1-hu0)*(hv1-hv0);
      const place0=x=>{ const w=Math.max(x.q.m2/d,Math.min(x.md[0],W)); if(vC+w>hv1+0.01) return false; if(Math.min(w,d)<Math.min(x.md[0],6)-0.01||Math.max(w,d)<x.md[1]-0.01) return false; if(g0+gArea+w*d>cover+0.5) return false;
        slices.push({x,v:[vC,vC+w]}); vC+=w; gArea+=w*d; return true; };
      for(const x of gq){ if(!x.atG&&!x.mustSt&&slices.length&&lobby) continue; /* programs that may go up wait for the upper storeys once the street ones are down */
        if(place0(x)&&!lobby&&vC+LW<=hv1+0.01){ lobby=[vC,vC+LW]; vC+=LW; } }
      if(!lobby&&vC+LW<=hv1+0.01){ lobby=[vC,vC+LW]; vC+=LW; } if(!lobby) return null;
      /* programs not placed yet: ground if a street/at-grade one still fits, else upper storeys */
      const upQ=[]; for(const x of bandQ){ if(slices.some(s2=>s2.x===x)) continue; if((x.atG||x.mustSt)&&!x.notG){ if(!place0(x)) miss.push([x,'ground: no street-front slice of its size is left in the band']); continue; }
        if(!x.notG&&place0(x)) continue; upQ.push(x); }
      /* upper storeys: an interval per storey around the lobby column (the core's), grown outward */
      const core=[lobby[0],lobby[1]], coreA=3.0*6.0+2.5*2.5, iv=[]; for(let k=1;k<=kMax;k++) iv.push(null);
      const ups=[];
      for(const x of upQ){ let ok=null;
        for(let n=1;n<=kMax&&!ok;n++){ if(x.atG||x.mustSt) break; if(n>1&&x.p.kind==='mass'&&x.q.id==='pool') break;
          for(let k0=1;k0+n-1<=kMax&&!ok;k0++){ const ks=Array.from({length:n},(_,i)=>k0+i), empty=ks.every(k=>!iv[k-1]);
            const w=(x.q.m2/n+(empty?coreA:0))/d; if(w>W+0.01||Math.min(w,d)<Math.min(x.md[0],6)-0.01||Math.max(w,d)<x.md[1]-0.01) continue;
            let r=null; if(empty){ const c=(core[0]+core[1])/2; let a=Math.max(hv0,Math.min(c-w/2,hv1-w)); r=[a,a+w]; if(r[0]>core[0]+0.01||r[1]<core[1]-0.01) r=null; }
            else if(ks.every(k=>iv[k-1])){ const A0=Math.min(...ks.map(k=>iv[k-1][0])), B0=Math.max(...ks.map(k=>iv[k-1][1])); if(A0-w>=hv0-0.01) r=[A0-w,A0]; else if(B0+w<=hv1+0.01) r=[B0,B0+w]; }
            if(r){ ok={ks,r}; } } }
        if(!ok){ miss.push([x,`upper storeys: no ${kMax?'run of storeys':'storey'} at ${uH} m under the ${n0(Hmax)} m limit holds it beside the others`]); continue; }
        ok.ks.forEach(k=>{ const c=iv[k-1]; iv[k-1]=c?[Math.min(c[0],ok.r[0]),Math.max(c[1],ok.r[1])]:ok.r.slice(); }); ups.push({x,...ok}); }
      const mk=(x,v,base,n,sh,front)=>{ const u=bu.slice(); return {id:x.q.id,p:x.p,q:x.q,ring:G.rectW(F,u[0],u[1],v[0],v[1]),base,h:n*sh,storeys:n,sh,shSrc:SMb?['arch_hb_vanI3']:null,front,top:false,roof:false,u,v:v.slice(),gap:0,own:false,spread:n>1,band:true,drawnM2:(v[1]-v[0])*d*n}; };
      slices.forEach(s2=>boxes.push(mk(s2.x,s2.v,0,1,gH,true)));
      ups.forEach(o=>boxes.push(mk(o.x,o.r,gH+(o.ks[0]-1)*uH,o.ks.length,uH,false)));
      /* the floor in the outline no program takes: ground right of the slices; upper storeys outside each interval are open (the outline steps back), gaps inside an interval are not assigned */
      const free=[]; if(vC<hv1-0.05) free.push({base:0,h:gH,v:[vC,hv1]});
      iv.forEach((c,i)=>{ if(!c) return; const base=gH+i*uH; const used=ups.filter(o=>o.ks.includes(i+1)).map(o=>o.r).sort((a,b)=>a[0]-b[0]); let cur=c[0]; for(const r of used){ if(r[0]>cur+0.05) free.push({base,h:uH,v:[cur,r[0]]}); cur=Math.max(cur,r[1]); } if(cur<c[1]-0.05) free.push({base,h:uH,v:[cur,c[1]]}); });
      return {boxes,miss,notes,lobby,core,iv,free,uH,kMax,gArea}; };
    let B=run(hallSH0||gH), split=false; if(B&&B.miss.length&&SMb&&SMb.above<B.uH-0.01){ const B2=run(Math.max(SMb.above,...bandQ.map(x=>x.own0||0))); if(B2&&B2.miss.length<B.miss.length){ B=B2; split=true; } }
    if(B){ B.boxes.forEach(b=>{ out.boxes.push(b); occ.push([b.u[0],b.u[1],b.v[0],b.v[1],b.base,b.base+b.h,false]); if(b.base===0) gUsed+=(b.u[1]-b.u[0])*(b.v[1]-b.v[0]); });
      B.boxes.forEach(b=>{ const ex=b.drawnM2-(b.q.m2||0); if(ex>1) out.flags.push({t:`${b.p.name.split(' (')[0]}: drawn at ${n0(b.drawnM2)} m², ${n0(ex)} m² more than its ${n0(b.q.m2)} m², because a slice of the band is at least ${n0(Math.min(b.v[1]-b.v[0],6))} m wide (drawing choice).`,src:[],sev:'q',id:b.id}); });
      B.miss.forEach(([x,why])=>{ out.flags.push({t:`${x.nm}: not drawn. Stopped by the bands: ${why} (the fallback ladder is still to come).`,src:[],sev:'bad',id:x.q.id,stop:[why]}); out.notDrawn.push(x.q.id); });
      if(split) out.flags.push({t:`Programs above the ground storey: drawn at ${B.uH} m storeys (the ${code} minimum), not at the data centre's ${n0(hallSH0*10)/10} m, so more fit under the ${n0(Hmax)} m limit: a split level. The floors do not line up with the data centre's; they share no door with it (drawing choice ?).`,src:['arch_hb_vanI3'],sev:'q'});
      const upTop=B.iv.reduce((t,c,i)=>c?gH+(i+1)*B.uH:t,gH);
      out.band={u:bu,spine:sp,v:[hv0,hv1],uF,d,lobby:B.lobby,core:B.core,storeys:[{base:0,h:gH,iv:[hv0,hv1]}].concat(B.iv.map((c,i)=>c?{base:gH+i*B.uH,h:B.uH,iv:c}:null).filter(Boolean)),free:B.free,uH:B.uH,gH,split,top:upTop,hallSH:hallSH0,
        why:'bands: street → public programs → shared lobby → spine → data centre → plant yard (WORKLIST 5, card 11); the spine-to-data-centre wall is 2 h (NBC Table 3.1.3.1)'};
      out.flags.push({t:`Bands: one building. ${B.boxes.filter(b=>b.base===0).length} program${B.boxes.filter(b=>b.base===0).length===1?'':'s'} along the street with the shared lobby (${n0(LW)} m wide, drawing choice), a ${SPN} m spine behind them against the data centre (2 h wall, NBC Table 3.1.3.1)${B.boxes.some(b=>b.base>0)?`, ${B.boxes.filter(b=>b.base>0).length} above on the same outline at ${B.uH} m storeys`:''}. Street to back: ${n0(d)} m of programs, ${SPN} m spine, ${n0(Math.abs(hu1-hu0))} m data centre.`,src:['arch_ratios'],sev:'note'}); }
    else bandQ.forEach(x=>{ out.flags.push({t:`${x.nm}: not drawn. Stopped by the bands: the shared lobby does not fit across the front (the fallback ladder is still to come).`,src:[],sev:'bad',id:x.q.id}); out.notDrawn.push(x.q.id); }); }
  /* 7 Nov 2026 (Cowork, V339 boards: 'the refuge, warming shelter and data centre don't touch: 0.82 m between the data centre and the refuge'): the 2 m grid
     leaves slivers between blocks. A block within JOIN (6) m of the hall (or of another block at the same height) is stretched to touch it, its other side
     trimmed so its floor stays the same; the shared face is a fire separation (the rules give its rating). A block that cannot be stretched (minimum
     sides, the lot, plant, loading, a block resting on it, its street front) stays apart and is flagged for the spatial separation check (NBC 3.2.3, not done).
     The street front: a front block is also stretched to the front yard line. JOIN is a drawing choice. */
  { const JOIN=6 /* drawing */, hallR=[hu0,hu1,hv0,hv1,hallBase,hallTop], zOv=(a0,a1,b0,b1)=>Math.min(a1,b1)-Math.max(a0,b0)>0.01, ar=r=>(r[1]-r[0])*(r[3]-r[2]);
    const hit=(r,b)=>{ /* r overlaps a no-go, another block at an overlapping height, or the hall */ const z0=b.base, z1=b.base+b.h;
      for(const o of occ){ if(o===b.occ) continue; if(r[0]<o[1]-0.01&&o[0]<r[1]-0.01&&r[2]<o[3]-0.01&&o[2]<r[3]-0.01&&(o[6]||zOv(z0,z1,o[4],o[5]))) return true; } return false; };
    const inL=r=>inLot(r[0]+0.05,r[2]+0.05)&&inLot(r[1]-0.05,r[2]+0.05)&&inLot(r[0]+0.05,r[3]-0.05)&&inLot(r[1]-0.05,r[3]-0.05);
    const onTop=b=>out.boxes.filter(x=>x!==b&&Math.abs(x.base-(b.base+b.h))<0.01&&x.u[0]<b.u[1]-0.01&&b.u[0]<x.u[1]-0.01&&x.v[0]<b.v[1]-0.01&&b.v[0]<x.v[1]-0.01);
    const restsOn=(r,b)=>{ if(b.base<0.01) return true; const S=[hallR].concat(out.boxes.filter(x=>x!==b).map(x=>[x.u[0],x.u[1],x.v[0],x.v[1],x.base,x.base+x.h])).filter(o=>Math.abs(o[5]-b.base)<0.01||(o[4]<b.base-0.01&&o[5]>b.base+0.01));
      return S.some(o=>r[0]>=o[0]-0.01&&r[1]<=o[1]+0.01&&r[2]>=o[2]-0.01&&r[3]<=o[3]+0.01); };
    out.boxes.forEach(b=>{ b.occ=occ.find(o=>Math.abs(o[0]-b.u[0])<1e-6&&Math.abs(o[2]-b.v[0])<1e-6&&Math.abs(o[4]-b.base)<1e-6); });
    const fFace=dir<0?0:1; /* index of the front face along u */
    out.boxes.forEach(b=>{ if(b.underHall||b.band) return; const z0=b.base, z1=b.base+b.h, area=ar([b.u[0],b.u[1],b.v[0],b.v[1]]), [mA,mB]=minDims(b.id,s.city);
      const tgt=[hallR].concat(out.boxes.filter(x=>x!==b).map(x=>[x.u[0],x.u[1],x.v[0],x.v[1],x.base,x.base+x.h])).filter(o=>zOv(z0,z1,o[4],o[5]));
      const gaps=[]; /* [side 0..3 (u0,u1,v0,v1), gap, to the hall] */
      for(const o of tgt){ const isH=o===hallR; const ovV=Math.min(b.v[1],o[3])-Math.max(b.v[0],o[2]), ovU=Math.min(b.u[1],o[1])-Math.max(b.u[0],o[0]);
        if(ovV>2){ if(o[0]>=b.u[1]-0.01) gaps.push([1,o[0]-b.u[1],isH]); if(o[1]<=b.u[0]+0.01) gaps.push([0,b.u[0]-o[1],isH]); }
        if(ovU>2){ if(o[2]>=b.v[1]-0.01) gaps.push([3,o[2]-b.v[1],isH]); if(o[3]<=b.v[0]+0.01) gaps.push([2,b.v[0]-o[3],isH]); } }
      /* the hall first: a block within JOIN of the data centre joins it even when it already touches another block */
      const touchH=gaps.some(g=>g[2]&&g[1]<0.02), touching=gaps.some(g=>g[1]<0.02), near=gaps.filter(g=>g[1]>=0.02&&g[1]<=JOIN&&!(b.front&&g[0]===fFace)&&(touchH?false:touching?g[2]:true)).sort((a,c)=>(c[2]-a[2])||(a[1]-c[1]));
      const r0=[b.u[0],b.u[1],b.v[0],b.v[1]], tops=onTop(b);
      const short0=Math.min(b.u[1]-b.u[0],b.v[1]-b.v[0]), tryR=r=>r[1]-r[0]>0&&r[3]-r[2]>0&&Math.min(r[1]-r[0],r[3]-r[2])>=Math.min(mA,short0)-0.01&&Math.max(r[1]-r[0],r[3]-r[2])>=mB-0.01&&inL(r)&&!hit(r,b)&&restsOn(r,b)&&tops.every(x=>x.u[0]>=r[0]-0.01&&x.u[1]<=r[1]+0.01&&x.v[0]>=r[2]-0.01&&x.v[1]<=r[3]+0.01);
      const stretch=(r,side,d)=>{ const n=r.slice(); if(side===0) n[0]-=d; else if(side===1) n[1]+=d; else if(side===2) n[2]-=d; else n[3]+=d;
        const out2=[]; if(side<2){ const w=area/(n[1]-n[0]); out2.push([n[0],n[1],n[2],n[2]+w],[n[0],n[1],n[3]-w,n[3]]); } else { const w=area/(n[3]-n[2]); out2.push([n[0],n[0]+w,n[2],n[3]],[n[1]-w,n[1],n[2],n[3]]); } return out2; };
      let r=r0, done=false;
      if(b.front&&b.base<0.01){ const fd=dir<0?r[0]-uf:uf-r[1]; /* as far as the front yard line lets it (a slanted front line stops it short) */ for(let d=fd;d>0.02&&fd<=cs+0.01;d-=0.05){ const c=stretch(r,fFace,d).find(tryR); if(c){ r=c; break; } } }
      const keepF=c=>!(b.front&&b.base<0.01)||Math.abs(c[fFace]-r[fFace])<0.01; /* a street-front block keeps its front face */
      for(const [side,g] of near){ for(const c of stretch(r,side,g)) if(keepF(c)&&tryR(c)){ r=c; done=true; break; } if(done) break; }
      if(r!==r0){ b.u=[r[0],r[1]]; b.v=[r[2],r[3]]; b.ring=G.rectW(F,r[0],r[1],r[2],r[3]); if(b.occ){ b.occ[0]=r[0]; b.occ[1]=r[1]; b.occ[2]=r[2]; b.occ[3]=r[3]; } if(b.front!=null&&b.base<0.01) b.front=Math.abs((dir<0?r[0]:r[1])-uf)<cs+0.01; }
      b.joined=touching||done||(b.base>0.01&&restsOn(r0,b)); /* a block standing on another (or on the hall) is joined to it */ b.joinedHall=touchH||(done&&near.some(g=>g[2])); if(!b.joined){ const g=gaps.length?Math.min(...gaps.map(x=>x[1])):null; b.apart=g; out.flags.push({t:`${b.p.name.split(' (')[0]}: stands ${g!=null?(Math.round(g*10)/10)+' m':'apart'} from the nearest block and could not be joined to it (drawing rule: blocks within ${JOIN} m are stretched to touch, keeping their floor, sides, street front and anything standing on them); spatial separation between them (NBC 3.2.3) is not checked (?).`,src:['nbc2020_v1'],sev:'q',id:b.id}); } });
    out.boxes.forEach(b=>{ delete b.occ; }); }
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
/* 7 Nov 2026 (Clark Dr hand check, item 3): can a truck reach the inside dock once the generators stand in the plant yard? A 6.1 m aisle (Parking By-law
   5.4.1, used in both cities) must be clear in front of the dock face, and from it either the rear lot line abuts a street or lane, or a clear run of the
   aisle's width along the rear reaches a side edge that abuts a street or lane. Plant units and the building block the run. Geometry only (our reading):
   turning paths are not checked (?). Returns null when no dock is drawn. */
function dockAccess(P){ const DP=dcPieces(P), D=DP&&DP.L.dock; if(!D) return null; const s=P.s, M=s.M, F=M.F, aisle=(M.loadingNeed&&M.loadingNeed.aisle)||6.1, hi=s.dir<0;
  const lb=r=>{ let a=1e9,b=-1e9,c=1e9,d=-1e9; for(let i=0;i<r.length;i+=2){ const [u,v]=F.toL(r[i],r[i+1]); a=Math.min(a,u); b=Math.max(b,u); c=Math.min(c,v); d=Math.max(d,v); } return [a,b,c,d]; };
  const blocks=(M.plant&&M.plant.boxes||[]).filter(b=>b.kind==='yard').map(b=>lb(b.ring)).concat([lb(P.hall.ring)]).concat(P.boxes.filter(b=>b.base===0).map(b=>lb(b.ring)));
  const hit=(a,b,c,d)=>blocks.some(q=>q[0]<b-0.01&&q[1]>a+0.01&&q[2]<d-0.01&&q[3]>c+0.01);
  const [d0,d1,e0,e1]=D.r, ua=hi?d1:d0-aisle, ub=hi?d1+aisle:d0; if(hit(ua,ub,e0,e1)) return {ok:false,why:'plant units stand in front of the dock face'};
  const inLot=(u,v)=>{ const [x,y]=F.toW(u,v); return BD.pip(x,y,M.ring); };
  const edgeAt=(u,v)=>{ const [x,y]=F.toW(u,v); let best=null, bd=1e9; for(const e of (M.edgeYards||[])){ const dx=e.bx-e.ax, dy=e.by-e.ay, L2=dx*dx+dy*dy; let t=L2?((x-e.ax)*dx+(y-e.ay)*dy)/L2:0; t=Math.max(0,Math.min(1,t)); const dd=Math.hypot(x-e.ax-t*dx,y-e.ay-t*dy); if(dd<bd){ bd=dd; best=e; } } return best; };
  const open=e=>e&&(e.abuts==='street'||e.abuts==='alley');
  /* straight out at the rear */ { let u=hi?ub:ua; const st=hi?0.5:-0.5; let n=0; while(inLot(u,(e0+e1)/2)&&n<80){ u+=st; n++; } const e=edgeAt(u,(e0+e1)/2); if(open(e)&&!hit(Math.min(u,hi?ub:ua),Math.max(u,hi?ub:ua),e0,e1)) return {ok:true,how:'straight out to the '+e.abuts+' at the rear'}; }
  /* along the rear to a side edge */ for(const dirV of [-1,1]){ let v=dirV<0?e0:e1, n=0; while(inLot((ua+ub)/2,v)&&n<400){ v+=dirV*0.5; n++; } const va=Math.min(v,dirV<0?e0:e1), vb=Math.max(v,dirV<0?e0:e1);
    if(!hit(ua,ub,va,vb)){ const e=edgeAt((ua+ub)/2,v); if(open(e)) return {ok:true,how:'along the rear to the '+e.abuts+' on the '+(e.kind||'side')}; } }
  if(M.sideDrive){ const [s0,s1,t0,t1]=lb(M.sideDrive.ring); if(!hit(ua,ub,Math.min(t1,e0),Math.max(t1,e0))) return {ok:true,how:'by the 6.1 m drive from the front street along the side'}; return {ok:false,why:'the run along the rear from the side drive to the dock is blocked'}; }
  if(!(M.edgeYards||[]).some(e=>open(e)&&e.kind!=='front')) return {ok:false,why:'no street or lane reaches the rear: trucks would need a drive from the front street along a side, which Ratios counts as ground but the layout does not draw'};
  return {ok:false,why:'no clear 6.1 m run from the dock to a street or lane past the plant yard and the building'}; }
function rules(P){ const s=P.s, M=s.M, city=s.city, code=zoneCode(), out=[...P.flags];
  { const N=M.genNoise; if(N){ const r1=x=>Math.round(x*10)/10; /* 7 Nov 2026: generator noise (site.js; noise_reads_2026-11-07.md) */
      if(N.city==='van') out.push({t:`Generator test: one set about ${r1(N.L)} dB(A) at ${r1(N.at)} m, ${N.ok?'within':'over'} the 80 dB(A) limit (By-law 6555 s. 4.1(c); 78 dB(A) at 7 m, maker claim; our arithmetic)${N.near?'; the nearest lot line is closer than 6.1 m':''}.`,src:['van6555s41c','kohlerG6154sound'],sev:N.ok?'note':'bad'});
      else { out.push({t:`Generator test (daytime, up to 1 h): ${N.test?'within':'over'} 75 dB(A) at residential and 85 at non-residential lines (C14600 s. 19(3), 21(3); 78 dB(A) at 7 m, maker claim; our arithmetic).`,src:['edm14600s19to24','kohlerG6154sound'],sev:N.test?'note':'bad'});
        if(N.night) out.push({t:`Generators in an overnight power cut: over the night limit (50 dB(A) residential, 60 non-residential; C14600 ss. 20, 22); the bylaw has no generator exemption (s. 24). Flagged, not blocked.`,src:['edm14600s19to24'],sev:'q'}); } } }
  if(M.sideDrive){ const D=M.sideDrive; out.push({t:`Loading: no street or lane at the rear or sides, so a ${D.w} m drive runs from the front street along the side to the dock${D.narrow>0.05?`; the building is ${D.narrow.toFixed(1)} m narrower for it`:''}${D.inYard>0.05?`; ${D.inYard.toFixed(1)} m of it lies in the required side yard: a flagged option, the Director may allow a reduced side yard for loading and vehicular access (I-3 3.1.2.16)`:''} (drawing choice; Edmonton gives no aisle width, 6.1 m used ?).`,src:[city==='van'?'vanParking5':'edmZB580'],sev:D.inYard>0.05?'q':'note'}); }
  { const da=dockAccess(P); P.dockAccess=da; if(da&&!da.ok) out.push({t:`Loading dock: trucks cannot reach it here (${da.why}). Route it another way (a gap in the plant yard, a dock on the side street) or test a smaller size; geometry only, turning not checked (?).`,src:['vanParking5'],sev:'bad'}); else if(da&&da.ok) out.push({t:`Loading dock: trucks reach it ${da.how} (6.1 m aisle; geometry only, turning not checked ?).`,src:['vanParking5'],sev:'note'}); } const PR=plantRings(M), sec=secureRing(P); const evap=(M.plant&&M.plant.boxes||[]).filter(b=>/tower|evapor|adiabatic/i.test(b.name)).map(b=>b.ring); P.secRing=sec;
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
  const yard=M.inset?(BD.buildArea?BD.buildArea(M):BD.geo.clip(M.ring,M.inset)):null, /* LOTLINES 4 Nov 2026 */ build=yard&&yard.length>=6?BD.area(yard):M.lotArea;
  const floors=Math.max(1,M.nF[0]), dataFl=Math.max(1,Z.ground?floors-1:floors), fsr=Z.fsr?Z.fsr[1]:null;
  const split=DR.rooms.filter(r=>r.split&&r.perMW), lo=split.reduce((t,r)=>t+r.perMW[0],0), hi=split.reduce((t,r)=>t+r.perMW[1],0);
  return {M,Z,code,lot:M.lotArea,build,yard,floors,dataFl,fsr,coverNone:(DR.coverLimit.none||[]).includes(code),coverZ:(BD.data.raw.dc_rooms.coverLimit.byZone||{})[code]||null,split,perMW:[lo,hi],city:M.city}; }
function ratioCalc(b,r){ const cover=Math.min(r.cover,b.build), capF=b.fsr&&b.lot?b.lot*b.fsr:Infinity, capE=cover*b.floors, allowed=Math.min(capF,capE);
  const dcMax=Math.min(allowed,cover*b.dataFl), dcM2=Math.min(dcMax,r.dc/100*allowed), progM2=Math.min(allowed-dcM2,r.prog/100*allowed);
  /* J.B. 7 Nov 2026: hall floor the inside dock takes on a hall storey (with any strip under 3 m beside it; dcrooms.js) comes out of the MW, not the footprint */
  const lost=r.dockLost&&r.dockSite===r.site?Math.min(dcM2,r.dockLost):0, hallM2=dcM2-lost;
  const mw=[hallM2/b.perMW[1],hallM2/b.perMW[0]], pick=r.end==='high'?mw[1]:mw[0], mwTest=Math.floor(pick*10+1e-9)/10;
  return {cover,allowed,capF,capE,by:capF<=capE?'fsr':'envelope',dcMax,dcM2,dockLost:lost,progM2,unused:Math.max(0,allowed-dcM2-progM2),mw,mwTest:mwTest>=0.1?mwTest:null}; }
/* the largest size every hard rule allows with this set-up (site.js fitMax: plant, generators, fuel, noise), worked out without the ratio's floor */
function fitNoRatio(){ const An=BD.S.answers, keep=An.dcFloor; delete An.dcFloor; BD.modelReset&&BD.modelReset(); let fm=null; try{ fm=BD.fitMax?BD.fitMax():null; if(BD.fitPlan) fitNoRatio.plan=BD.fitPlan(); }finally{ if(keep!=null) An.dcFloor=keep; BD.modelReset&&BD.modelReset(); } return fm; }
/* dcshare 4 Nov 2026: the fit search runs the noise ladder (low-noise units, screen, then an enclosed plant room: site.js model) before it caps a size; Ratios names the measure */
/* the most of the floor the data centre may take: the hall off the ground floor where the zone says so, and no more MW than the hard rules allow at the end Arrange tests */
/* ratio ground (4 Nov 2026, testfit_lots.md Edmonton): the share was checked against floor area and the hall's ground after loading and the plant yard,
   but not against the ground the picked programs need beside the hall. A program can sit over the hall only if the hall's top plus one program storey
   stays under the height limit; where the zone keeps the ground storey for other uses (I-2, I-3, FC-2) programs go under the hall. Otherwise each picked
   block program needs its ground: its smallest size (sourced minimum, else the size set in Arrange) over its storeys. Our reading of the tool's own placement rules. */
function progGround(b,opt){ const M=b.M||BD.model(), Z=(M&&M.Z)||{}, ftf=BD.eng.R.ftf, code=b.code, under=!!(opt&&opt.under);
  const SM=b.city==='van'&&AD.storeyMin&&AD.storeyMin[code]||null, k=b.dataFl, top=(Z.ground?ftf.ground+k*ftf.up[1]:ftf.ground+(k-1)*ftf.up[1]);
  const out={m2:0,items:[],why:null,top};
  if(Z.ground&&!under){ out.why='under'; return out; }
  if(!under&&top+(SM?SM.above:ftf.ground)<=(M.H||0)+0.01){ out.why='over'; return out; }
  A.picks.forEach(q=>{ const p=CAT.byId[q.id]; if(!p||p.kind!=='mass'||q.place==='roof'||q.m2==null) return; if(q.id==='refuge'&&(!q.opt||q.opt==='under_hall')) return; // Arrange does not draw these beside the hall
    { const cp=capOf(p); if(cp!=null&&q.m2>cp) return; } // over the BE area cap: Arrange blocks it, so it keeps no ground
    const mn=minOf(p), m2=mn!=null?Math.min(mn,q.m2):q.m2; if(!(m2>0)) return;
    const g=m2/Math.max(1,q.storeys||1); out.m2+=g; out.items.push({id:q.id,name:p.name,g,min:mn!=null}); });
  if(!out.items.length){ /* dcshare follow-up (4 Nov 2026; coordinator recommendation, J.B. to confirm; a default): before any programs are picked, hold back the
     chosen typology's minimum ground; with none chosen, the smallest typology in the library (tool/data/arch.json typologies.list; add-ons such as Heat hub are kept apart and never held back, J.B. 7 Nov 2026). The tool has no typology picker yet. */
    const L=(AD.typologies&&AD.typologies.list)||[], m2=t=>t.m2&&typeof t.m2==='object'?t.m2[b.city]:t.m2, ch=L.find(t=>t.id===A.typology);
    const t=ch||L.slice().sort((x,y)=>m2(x)-m2(y))[0]; if(t&&m2(t)>0){ out.m2=m2(t); out.typ={name:t.name,m2:m2(t),chosen:!!ch}; out.why='typology'; return out; } }
  out.why=out.items.length?'beside':'none'; return out; }
/* dcshare follow-up (4 Nov 2026): the building's ground item by item, checked against the Edmonton test fits (testfit_lots.md). The hall's ground is the
   footprint after loading and the plant yard (polygon, site.js), less: yard units the packer put over it, the transformer pads with their building
   clearance, a drive to the rear where no street reaches it, and the programs. The data centre's floor on its storeys is then hall plus support rooms. */
function groundItems(b,M,r){ const RG=AD.ratioGround, F=M.F, P=M.plant||{}, out={G0:M.footArea||0,intr:0,tx:{n:0,m2:0},drive:{m2:0,w:0,len:0},s:RG?RG.support[r&&r.end==='high'?0:1]:0};
  const lb=R=>{ let a=1e9,b2=-1e9,c=1e9,d=-1e9; for(let i=0;i<R.length;i+=2){ const [u,v]=F.toL(R[i],R[i+1]); a=Math.min(a,u); b2=Math.max(b2,u); c=Math.min(c,v); d=Math.max(d,v); } return [a,b2,c,d]; };
  if(M.foot){ const f=lb(M.foot); (P.boxes||[]).filter(x=>x.kind==='yard'&&x.clear).forEach(x=>{ const q=lb(x.clear), du=Math.min(f[1],q[1])-Math.max(f[0],q[0]), dv=Math.min(f[3],q[3])-Math.max(f[2],q[2]); if(du>0&&dv>0) out.intr+=du*dv; }); }
  if(RG&&P.s&&P.s.Q){ const n=Math.ceil(P.s.Q*1000/RG.txKVA-1e-9)+1, row=n*(RG.txPad[0]+RG.txGap), cl=RG.txBld[b.city]||0; out.tx={n,m2:row*(RG.txPad[1]+cl),cl}; }
  /* a flank or rear street, or a lane, reaches the rear yard; otherwise a drive runs to it (7 Nov 2026: lanes count; Vancouver edges now carry abuts) */
  const street=(M.edgeYards||[]).some(e=>(e.abuts==='street'||e.abuts==='alley')&&e.kind!=='front'); out.reach=street?(M.edgeYards||[]).filter(e=>(e.abuts==='street'||e.abuts==='alley')&&e.kind!=='front').map(e=>e.abuts+' ('+e.kind+')'):null;
  if(M.sideDrive) out.drive={m2:0,w:0,len:0,side:true}; /* the side drive's ground is already out of the footprint (building narrowed) or in the side yard */
  else if(!street&&M.uBuild&&M.loadingNeed){ const a0=M.uBuild[0]+(M.plantYardDepth?M.dir*M.plantYardDepth:0), len=Math.abs(M.uFront-a0), w=M.loadingNeed.aisle||0; out.drive={m2:w*len,w,len}; }
  out.dock=M.loadInside?M.loadInside.m2:0; out.dockN=M.loadInside?M.loadInside.n:0; /* 5 Nov 2026: loading bays inside take ground-storey floor */
  out.G=Math.max(0,out.G0-out.intr-out.tx.m2-out.drive.m2-out.dock); return out; }
function dcCapPct(b,r,fm){ const c=ratioCalc(b,Object.assign({},r,{dc:100,prog:0})), M=BD.model(), pg=progGround(b), it=M&&M.foot?groundItems(b,M,r):null;
  const gr=it?Math.max(0,it.G-pg.m2):(M&&M.hallRoom?Math.max(0,M.hallRoom-pg.m2):null), s=it?it.s:0;
  /* I-2, I-3, FC-2 keep the ground storey for other uses: support rooms may sit there (the bylaws bar data storage at grade, not support; our reading), beside the programs that go under the hall */
  const pgU=b.dataFl<b.floors&&it?progGround(b,{under:true}):null, gs=pgU?Math.max(0,it.G-pgU.m2):0; if(pgU) pg.under=pgU;
  const room=gr!=null?Math.min(M.hallRoom?M.hallRoom*b.dataFl:Infinity,pgU?Math.min(gr*b.dataFl,(gr*b.dataFl+gs)*(1-s)):gr*b.dataFl*(1-s)):Infinity; // room: the hall floor the ground holds on the floors data may use, its support rooms taken out; never more than the rectangle Arrange draws in
  const geo=Math.floor(Math.min(c.dcMax,room)/c.allowed*100+1e-9), byRoom=room<c.dcMax, G={hallRoom:M&&M.hallRoom||null,pg,ground:gr,it}; if(fm==null) return {pct:0,geo,fm,byRoom,room,G};
  const per=r.end==='high'?b.perMW[0]:b.perMW[1]; return {pct:Math.min(geo,Math.floor(fm*per/c.allowed*100+1e-9)),geo,fm,byRoom,room,G}; }
function ratioInit(b,fm){ const r={site:selId(),cover:b.build,dc:0,prog:0,end:'low'}, mw=BD.S.answers.mw, c=ratioCalc(b,Object.assign({},r,{dc:100,prog:0})), cap=dcCapPct(b,r,fm).pct;
  const want=mw?Math.floor(mw*b.perMW[1]/c.allowed*100+1e-9):Infinity; r.dc=mw?Math.max(Math.min(1,cap),Math.min(cap,want)):cap; r.capped=want>cap; r.prog=100-r.dc; return r; } // starts at the set-up's own size (its MW at the low end), the rest to programs
function ratioApply(){ const b=ratioBase(), r=A.ratio; if(!b||!r) return null; const c=ratioCalc(b,r), An=BD.S.answers;
  if(c.mwTest){ An.mw=c.mwTest; An.dcFloor=c.dcM2; An.progFloor=c.progM2; /* 7 Nov 2026: programs share the building's loading count (site.js loadingNeed) */ An.dcSite=BD.S.sel.id; An.mwPick='ratio'; An.mwSite=BD.S.sel.id; r.mw=c.mwTest; } else { delete An.dcFloor; delete An.progFloor; r.mw=null; }
  BD.modelReset&&BD.modelReset(); return c; }
/* the ratios in force for Arrange: only when set for this lot and the size has not been changed elsewhere since */
function ratioNow(){ const r=A.ratio; if(!r||r.site!==selId()||!r.mw||BD.S.answers.mw!==r.mw) return null; const b=ratioBase(); if(!b) return null; const c=ratioCalc(b,r); return Object.assign(c,{r,b}); }
function tabsHTML(k){ const F=BD.flow, T=[['arat','Ratios',['arat']],['aprog','Arrange',['aprog','aarr']],['aexc','Exchange',[]],['acmp','Compare',['acmp']]];
  return `<div class="atabs" role="tablist" aria-label="Design">${T.map(([to,l,ks])=>{ const i=F?F.steps.findIndex(s=>s.k===to):-1, on=ks.includes(k), ok=i>=0&&i<=F.max;
    return `<button role="tab" data-tab2="${to}" aria-selected="${on}" ${ks.length&&ok?'':'disabled'} ${ks.length?'':'title="Exchange: the on-site exchange step comes next in the build"'}>${l}</button>`; }).join('')}</div>${A.rezone&&A.rezone[selId()]&&!zoneOK().ok?zoneGate(k,'').html:''}`; }
function wireTabs(sd){ sd.querySelectorAll('[data-tab2]').forEach(b=>b.onclick=()=>{ if(!b.disabled&&BD.flow) BD.flow.to(b.dataset.tab2); }); }
function splitLine(RT){ if(!RT) return `<p class="sub asplit">Ratios not set for this lot: the space budget below is the zone's whole allowance. <a href="#" data-editr>Set ratios</a></p>`;
  const pc=v=>n0(v/RT.allowed*100)+'%';
  return `<p class="sub asplit">Data centre ${pc(RT.dcM2)} · ${n0(RT.dcM2)} m² · ${mwR(RT.mw.map(x=>Math.floor(x*10)/10))} (testing ${RT.mwTest}) · programs ${pc(RT.progM2)} · ${n0(RT.progM2)} m² · unused ${pc(RT.unused)} ${chips(['arch_ratios'])} <a href="#" data-editr>Edit ratios</a></p>`; }
/* ratio ground: the reason line in Ratios ("hall needs X m² of ground per storey, Y available") */
/* ratio ground: the reason in Ratios ("hall needs X m² of ground per storey, Y available"), with the items it took */
function groundLine(b,c,cap){ const G=cap.G, k=b.dataFl, it=G.it, pg=G.pg, s=it?it.s:0, need=c.dcM2/k/(1-s), st=`${k} hall storey${k>1?'s':''}${b.dataFl<b.floors?' over a ground storey kept for other uses':''} under the ${n0(b.M.H)} m height limit`;
  const ps=pg.why==='under'?'programs go on the ground storey under the hall':pg.why==='over'?`programs can sit over the hall (its top ${n0(pg.top)} m)`:pg.why==='typology'?`${n0(pg.m2)} m² held back for ${pg.typ.chosen?'the chosen typology':'programs: no programs or typology chosen, so the smallest library typology'} (${esc(pg.typ.name)}; a default, J.B. to confirm)`:pg.why==='none'?'no ground held for programs':
    `programs ${n0(pg.m2)} m² (${pg.items.map(x=>esc(x.name.split(' (')[0])+' '+n0(x.g)+(x.min?' at its minimum':' as set')).join('; ')})`;
  const items=it?[`footprint after ${it.dock>0?'':'loading and '}the plant yard ${n0(it.G0)} m²`].concat(it.intr>0.5?[`yard units over it ${n0(it.intr)}`]:[]).concat(it.tx.n?[`${it.tx.n} transformer pads, ${it.tx.cl} m from the building, ${n0(it.tx.m2)}`]:[]).concat(it.dock>0?[`${it.dockN} loading bay${it.dockN>1?'s':''} inside ${n0(it.dock)}`]:[]).concat(it.drive.m2>0?[`a ${it.drive.w} m drive to the rear yard ${n0(it.drive.m2)} (no other street reaches it)`]:[]).concat([ps]):[ps];
  if(pg.under){ const gs=Math.max(0,G.ground-pg.under.m2); return `Hall needs ${n0(c.dcM2/k)} m² a storey (${st}); ${n0(G.ground)} m² available. Its support rooms (${n0(s*100)} % of the data centre, ${n0(c.dcM2*s/(1-s))} m²) take the ground storey first: ${n0(gs)} m² there after ${pg.under.why==='typology'?`${n0(pg.under.m2)} m² held back for programs (no programs or typology chosen: the smallest library typology, ${esc(pg.under.typ.name)}; a default, J.B. to confirm)`:`the programs' ${n0(pg.under.m2)} m²`}. Ground: ${items.slice(0,-1).join(' − ')}.`; }
  return `Hall and its support rooms need ${n0(need)} m² of ground per storey (${st}; support ${n0(s*100)} % of the data centre); ${n0(G.ground)} m² available. Ground: ${items.join(' − ')}.`; }
/* WORKLIST 3 (zone rule, 7 Nov 2026): typologies only where a data centre is permitted, conditional or discretionary (zones.json has a row for the zone,
   and the lot is not in I-3 sub-area B). Elsewhere: "Not allowed here; rezoning needed." A rezoning is a flagged option, not a block (START_HERE standards):
   the user may look on as if rezoned, and every screen and the rules then carry the flag. */
function zoneOK(){ const M=BD.model&&BD.model(), Z=M&&M.Z; if(!Z) return {ok:true}; if(Z.notAllowed) return {ok:false,why:Z.warn}; if(Z.assumed) return {ok:false,why:`Zone ${esc(Z.zone||'(none recorded)')} does not list a data centre (no row in the tool's zone table).`}; return {ok:true}; }
A.rezone=A.rezone||{};
function zoneGate(k,title){ const z=zoneOK(); if(z.ok) return null; const on=!!A.rezone[selId()];
  const box=`<div class="warnbox"><b>Not allowed here; rezoning needed.</b> ${z.why} ${on?'Shown as if rezoned: a flagged option, not a prediction.':'The typologies are not laid out here unless you choose to look as if the lot were rezoned.'}</div>`;
  if(on) return {html:box,on:true}; return {html:`${tabsHTML(k)}<h2>${title}</h2>${box}<button class="sec" id="aRezone">Show it as if rezoned (flagged)</button>`,on:false}; }
function wireGate(sd,view){ const b=sd.querySelector('#aRezone'); if(b) b.onclick=()=>{ A.rezone[selId()]=true; view(); }; wireTabs(sd); }
async function viewRatios(){ await ready(); BD.S.view2='tab'; const sd=$('#side'); { const zg=zoneGate('arat','Ratios'); if(zg&&!zg.on){ sd.innerHTML=zg.html; wireGate(sd,viewRatios); return; } } const b=ratioBase();
  if(!b){ sd.innerHTML=`${tabsHTML('arat')}<h2>Ratios</h2><p class="lead">Ratios need a new building on a lot with a known shape. Pick a lot and set it up as a new build.</p>`; wireTabs(sd); return; }
  const fm=fitNoRatio(), fresh=!A.ratio||A.ratio.site!==selId(); if(fresh) A.ratio=ratioInit(b,fm);
  /* the plant yard moves with the MW, so the cap depends on the share tested. 7 Nov 2026: bisect for the largest share that passes at its own size, between
     0 and the share asked for (replaces jump-to-the-cap then step back up, which stuck at 0 % when a large trial share made a deep plant yard; 339 1st Ave E) */
  const r=A.ratio; let cap=null, c=null, cut=fresh&&!!r.capped; c=ratioApply()||ratioCalc(b,r); cap=dcCapPct(b,r,fm);
  if(r.dc>cap.pct){ cut=true; let lo=0, hi=r.dc-1; for(let k=0;k<9&&hi>lo;k++){ const t=Math.ceil((lo+hi)/2); r.dc=t; ratioApply(); const ct=dcCapPct(b,r,fm); if(t<=ct.pct) lo=t; else hi=t-1; } r.dc=lo; c=ratioApply()||ratioCalc(b,r); cap=dcCapPct(b,r,fm); }
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
    ${cap.G&&cap.G.ground!=null?`<p class="src">${groundLine(b,c,cap)} ${chips(S.concat(['arch_ratios']))}</p>`:''}
    ${cap.byRoom&&cap.geo<100?`<p class="src">The ground leaves room for ${n0(cap.room)} m² of data centre (hall, UPS and battery rooms)${b.dataFl<b.floors?' (not on the ground floor here)':''}, so the data centre takes at most ${cap.geo}% ${chips(S)}.</p>`:b.dataFl<b.floors&&cap.geo<100?`<p class="src">The hall may not use the ground floor here, so the data centre takes at most ${cap.geo}% ${chips(S)}.</p>`:''}
    ${cap.fm==null?`<p class="src k">No size passes the hard rules with this set-up (plant, generators, fuel or noise). Change the set-up.</p>`:cap.pct<cap.geo?`<p class="src">Hard rules stop it at ${cap.fm} MW with this set-up (plant, generators, fuel, noise), so at most ${cap.pct}% at the ${r.end==='high'?'high':'low'} end. Change the set-up for more.</p>`:''}
    ${cap.fm!=null&&fitNoRatio.plan&&fitNoRatio.plan.mw!=null?`<p class="src">Data centre: ${esc(BD.planText(fitNoRatio.plan))}. ${chips(['noise_limit','arch_nz_nswDcNoise'])}</p>`:''}
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
async function viewPrograms(){ await ready(); BD.S.view2='tab'; const sd=$('#side'); { const zg=zoneGate('aprog','Programs'); if(zg&&!zg.on){ sd.innerHTML=zg.html; wireGate(sd,viewPrograms); return; } }
  const groups=GROUP.map(([g,l])=>{ const L=CAT.list.filter(p=>p.group===g); if(!L.length) return ''; return `<div class="agrp"><h4 class="spf">${esc(l)}</h4>${L.map(p=>{ const on=!!pickOf(p.id); const s=p.size||{};
      return `<div class="apick"><span>${esc(p.name)}<br><small>${p.kind==='mass'?(s.typical_m2!=null?'typical '+n0(s.typical_m2)+' m²':'size ?'):esc(p.kind)} · ${esc((p.occ&&p.occ.group)||'?')}</small></span><button data-add="${p.id}" aria-pressed="${on}">${on?'Added':'Add'}</button></div>`; }).join('')}</div>`; }).join('');
  sd.innerHTML=`${tabsHTML('aprog')}<h2>Programs</h2><p class="lead">Pick what the site could hold with the data centre. Each starts at a sourced typical size; you set it in the next step.</p>
   <p class="sub">${A.picks.length?`${A.picks.length} picked.`:'Nothing picked yet.'} Hover a grey tag to read its source; "?" means no source was found.</p>${groups}`;
  sd.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{ const id=b.dataset.add; pickOf(id)?del(id):add(id); viewPrograms(); });
  wireTabs(sd);
  draw3d(); }
async function viewArrange(){ await ready(); BD.S.view2='tab'; const sd=$('#side'); { const zg=zoneGate('aarr','Arrange'); if(zg&&!zg.on){ sd.innerHTML=zg.html; wireGate(sd,viewArrange); return; } } const P=place();
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
async function viewCompare(){ await ready(); BD.S.view2='tab'; const sd=$('#side'); { const zg=zoneGate('acmp','Compare'); if(zg&&!zg.on){ sd.innerHTML=zg.html; wireGate(sd,viewCompare); return; } } const S=A.saved;
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
  const LI=s.M.loadInside, TK=s.M.plant&&s.M.plant.truck, dock=LI&&P.hall.base===0?{n:LI.n,len:LI.len,wid:LI.wid,rearHi:s.dir<0,v:TK&&TK.type==='straight'?TK.v:null}:null; /* 7 Nov 2026: the inside loading dock is drawn (rear end; site.js dir<0: rear at the high-u end) */
  const L=BD.dcRooms.layout({F:s.F,u:P.hall.u,v:P.hall.v,z0:P.hall.base+g*fh,fh:Array(nf-g).fill(fh),mw,end,ground:g*fh,dock}); if(!L) return null;
  const out=L.pieces.map(p=>({ring:p.ring,base:p.base,h:p.h,hall:p.id==='hall',room:p.id==='electrical'||p.id==='battery'||p.id==='dock',rest:p.id==='rest'||p.id==='gst',level:lv0+g+p.level,name:p.name,id:p.id,m2:p.m2}));
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
BD.archTest={place,budgets,rules,add,del,resize,CAT,ratioBase,ratioCalc,ratioNow,dcCapPct,progGround,ratioApply,groundItems,dcPieces};
})();
