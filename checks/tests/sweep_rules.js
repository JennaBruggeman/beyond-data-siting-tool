// Sweep, rules slice (3 Nov 2026): try to break the hard rules on every lot, in all four templates.
// Usage (from checks/tests/): NODE_PATH=<node_modules with playwright> node sweep_rules.js <outjson> <shotdir> [lotKey ...]
// Needs the tool served at http://localhost:8766. Setup copied from golden_run.js / sweep_engineering.js. One browser, one page at a time.
// Per lot: open as a worked example (findFit), then
//  A. probes through BD.S.answers (storeys, sizes, plant and generator places, vis, cooling, spares, existing building and floors),
//     each checked against setupProblems() and our own geometry (plant, building and fence against the required yards, height, ground floor,
//     fuel against NFC Table 4.3.13.4.-B, noise levels against the night limits);
//  B. the three options and the report options at their sizes;
//  C. ways past a block in the UI, in each template: Next, the step bar, the deck's last card, the resident card, the tier switch.
const fs = require('fs'), path = require('path');
const NM = (process.env.NODE_PATH || '').split(require('path').delimiter)[0];
const { chromium } = require('playwright');
const N = { built: 'new', extent: 'whole', floor: '' }, X = { built: 'existing', extent: 'whole', floor: '' };
const LOTS = {
  V09: ['275 1st Ave E', 'I-3', { city: 'van', tile: '1_1', id: '63819363' }, N],
  E05: ['8803 Stadium Rd NW', 'IM', { city: 'edm', tile: '0_0', id: '51053' }, N],
  CLARK: ['1425 Clark Dr', 'I-2', { city: 'van', tile: '2_1', id: '23060741' }, N],
  E123: ['12603 123 Street NW', 'IH', { city: 'edm', tile: '-1_1', id: '883345' }, N],
  V339: ['339 1st Ave E', 'I-3', { city: 'van', tile: '1_1', id: '63819485' }, N],
  E06A: ['74 Airport Rd NW', 'BE', { city: 'edm', tile: '-1_1', id: '176767' }, N],
  E06B: ['64 Airport Rd NW', 'BE', { city: 'edm', tile: '-1_1', id: '146402' }, N],
  HAST: ['555 W Hastings', 'DD existing upper floor', { city: 'van', tile: '0_2', id: '59013407' }, { built: 'existing', extent: 'part', floor: 'upper' }],
  VI1S: ['116 8th Ave W', 'I-1 small', { city: 'van', tile: '0_1', id: '64817976' }, N],
  VI1L: ['2450 Ontario St', 'I-1', { city: 'van', tile: '0_0', id: '64818406' }, N],
  VI1C: ['360 2nd Ave W', 'I-1C', { city: 'van', tile: '0_1', id: '64017198' }, N],
  VI2S: ['1250 Frances St', 'I-2 small', { city: 'van', tile: '2_2', id: '59422650' }, N],
  VI2L: ['1940 Glen Dr', 'I-2 large', { city: 'van', tile: '1_1', id: '22263074' }, N],
  VI3S: ['670 Industrial Ave', 'I-3 small', { city: 'van', tile: '1_1', id: '63519380' }, N],
  VFC2: ['1220 Station St', 'FC-2', { city: 'van', tile: '1_1', id: '63019307' }, N],
  VM1: ['1250 45th Ave E', 'M-1', { city: 'van', tile: '1_-2', id: '75822402' }, N],
  VM2L: ['570 Kent Ave South E', 'M-2 large', { city: 'van', tile: '1_-4', id: '83920152' }, N],
  VIC2: ['1620 5th Ave W', 'IC-2', { city: 'van', tile: '-2_1', id: '64212208' }, N],
  VIC3X: ['2050 Scotia St', 'IC-3 existing', { city: 'van', tile: '1_1', id: '19464204' }, X],
  EBEL: ['2010 76 Avenue NW', 'BE large', { city: 'edm', tile: '3_-2', id: '96523' }, N],
  EIM: ['7282 68 Street NW', 'IM', { city: 'edm', tile: '1_-2', id: '975343' }, N],
  EIHS: ['9565 60 Avenue NW', 'IH under 1 ha', { city: 'edm', tile: '0_-2', id: '95140' }, N],
  EIHL: ['550 Hayter Road NW', 'IH huge', { city: 'edm', tile: '3_1', id: '832080' }, N],
  EMU: ['10323 78 Avenue NW', 'MU', { city: 'edm', tile: '0_-2', id: '838298' }, N],
  EDC2: ['12431 Stony Plain Road NW', 'DC2 small', { city: 'edm', tile: '-1_0', id: '94114' }, N],
  EDCX: ['5904 51 Avenue NW', 'DC existing', { city: 'edm', tile: '1_-3', id: '693380' }, X],
  ECMV: ['10550 102 Street NW', 'CMUV existing', { city: 'edm', tile: '0_0', id: '822759' }, X],
};

/* ---------- page side: helpers, defined once per page ---------- */
const PAGE = `(()=>{ if(window.__RS) return; const W=window.__RS={};
 const segD=(px,py,ax,ay,bx,by)=>{ const dx=bx-ax, dy=by-ay, L2=dx*dx+dy*dy; let t=L2?((px-ax)*dx+(py-ay)*dy)/L2:0; t=Math.max(0,Math.min(1,t)); return Math.hypot(px-ax-t*dx,py-ay-t*dy); };
 const ringD=(x,y,r)=>{ let d=1e9; for(let i=0;i<r.length;i+=2){ const j=(i+2)%r.length; d=Math.min(d,segD(x,y,r[i],r[i+1],r[j],r[j+1])); } return d; };
 W.ringD=ringD;
 /* the lot's edges, each with the required yard the tool's own frame gives it (front at -L/2 unless flipped; side along v) */
 W.edges=(M)=>{ const F=M.F, r=M.ring, y=M.Z&&M.Z.yards; if(!F||!r||!y) return []; const fl=BD.S.answers.flip?-1:1, out=[];
   for(let i=0;i<r.length;i+=2){ const j=(i+2)%r.length, ax=r[i], ay=r[i+1], bx=r[j], by=r[j+1], L=Math.hypot(bx-ax,by-ay); if(L<0.5) continue;
     const mx=(ax+bx)/2, my=(ay+by)/2; let nx=-(by-ay)/L, ny=(bx-ax)/L; if(BD.pip(mx+nx*0.3,my+ny*0.3,r)) { nx=-nx; ny=-ny; } // outward
     const nu=nx*F.ux+ny*F.uy, nv=-nx*F.uy+ny*F.ux; let kind; if(Math.abs(nu)>=Math.abs(nv)) kind=(nu<0)===(fl>0)?'front':'rear'; else kind='side';
     const ua=F.toL(ax,ay), ub=F.toL(bx,by), lim=kind==='side'?F.W/2:F.L/2, ext=kind==='side'?Math.max(Math.abs(ua[1]),Math.abs(ub[1])):Math.max(Math.abs(ua[0]),Math.abs(ub[0]));
     out.push({ax,ay,bx,by,kind,d:y[kind]||0,L,inner:lim-ext>1.0,angled:kind!=='side'?Math.abs(ua[0]-ub[0])>1.0:Math.abs(ua[1]-ub[1])>1.0}); }
   return out; };
 /* the deepest a point sits inside a required yard (m), and which yard; 0 if in none */
 W.inYard=(E,x,y,tol)=>{ let worst=0, k=''; for(const e of E){ if(!(e.d>0)) continue; const d=segD(x,y,e.ax,e.ay,e.bx,e.by); const into=e.d-d; if(into>(tol||0.3)&&into>worst){ worst=into; k=e.kind+(e.inner?' (inner edge: notch or step in the lot)':e.angled?' (angled lot line)':''); } } return worst?{into:worst,kind:k}:null; };
 W.samples=(r,step,closed)=>{ const p=[]; const n=r.length; for(let i=0;i<n;i+=2){ if(!closed&&i+2>=n) break; const j=(i+2)%n, L=Math.hypot(r[j]-r[i],r[j+1]-r[i+1]), k=Math.max(1,Math.ceil(L/step)); for(let q=0;q<k;q++){ const t=q/k; p.push([r[i]+(r[j]-r[i])*t,r[i+1]+(r[j+1]-r[i+1])*t]); } } return p; };
 W.checkRing=(E,r,step,tol)=>{ let w=null; for(const [x,y] of W.samples(r,step,true)){ const h=W.inYard(E,x,y,tol); if(h&&(!w||h.into>w.into)) w={into:+h.into.toFixed(2),kind:h.kind,x,y}; } return w; };
 W.snapshot=()=>JSON.stringify(BD.S.answers);
 W.restore=(s)=>{ const A=BD.S.answers, b=JSON.parse(s); for(const k of Object.keys(A)) delete A[k]; Object.assign(A,b); BD.modelReset(); };
 /* every rule check on the model as it stands */
 W.levels=()=>{ const s=new Set(); for(const k in BD.S.tiles){ if(!k.startsWith(BD.S.sel.city+':')) continue; for(const b of BD.S.tiles[k].bld){ const v=BD.eng.noiseLevel(b); if(v) s.add(v); } } return s; };
 W.check=(label)=>{ const A=BD.S.answers, e=BD.eng, R=e.R; const prior=W.levels(); BD.modelReset(); const M=BD.model(); const out={label,ans:{built:A.built,extent:A.extent,floor:A.floor,hmode:A.hmode,storeys:A.storeys,mw:A.mw,plantAt:A.plantAt,genAt:A.genAt,gens:A.gens,vis:A.vis,outside:A.outside,inside:A.inside,spares:A.spares,genSpares:A.genSpares},issues:[],info:{}};
   const I=(sev,rule,what)=>out.issues.push([sev,rule,what]);
   if(!M||!M.F){ out.info.noModel=true; return out; }
   let P=[]; try{ P=BD.setupProblems(); }catch(err){ I('high','throw','setupProblems threw: '+err.message); }
   out.problems=P.map(x=>x.slice(0,160)); const blocked=P.length>0;
   let f=null; try{ f=e.siteFacts(); }catch(err){ I('high','throw','siteFacts threw: '+err.message); }
   const Z=M.Z, E=W.edges(M); out.info.zone=Z.key+(Z.assumed?' (assumed)':''); out.info.H=M.H; out.info.nF=M.nF; out.info.mwSized=M.mwSized;
   // height
   if(!M.existing){ if(A.hmode!=='cond'&&!A.userH&&M.H>Z.hOutright+0.01) I(blocked?'low':'high','height',\`H \${M.H.toFixed(1)} m over the outright \${Z.hOutright} m (hmode \${A.hmode}) and \${blocked?'blocked':'NOT blocked'}\`);
     if(A.hmode==='cond'&&Z.hx&&M.H>Z.hx[1]+0.01) I('high','height',\`H \${M.H} over the approval height \${Z.hx[1]}\`);
     const ftf=R.ftf, top=ftf.ground+(M.nF[1]-1)*ftf.up[0]; if(A.hmode!=='cond'&&!A.userH&&top>Z.hOutright+0.01&&M.nF[1]>1) I('medium','height',\`\${M.nF[1]} storeys at the low 5.5 m floor-to-floor need \${top.toFixed(1)} m, over \${Z.hOutright} m: the floor count uses the low height\`);
     if(f&&f.gross[1]>M.lotArea*Z.fsr[1]*1.001) I('high','fsr',\`floor \${Math.round(f.gross[1])} m² over FSR \${Z.fsr[1]} × lot \${Math.round(M.lotArea)}\`); }
   // ground floor (I-2 s. 2.2.7, I-3 s. 2.2.11, FC-2 s. 2.2.4)
   if(Z.ground&&!Z.assumed&&f){ if(M.existing&&A.extent==='part'&&(A.floor==='ground')&&!P.some(x=>/ground floor|at grade/i.test(x))) I(blocked?'medium':'high','ground',\`zone \${Z.key}: a leased ground floor of an existing building is the data hall; no problem names the ground-floor rule (\${blocked?'blocked by: '+P[0].slice(0,60):'not blocked'})\`);
     if(M.existing&&A.extent==='part'&&!A.floor&&!blocked) out.info.floorUnset=true;
     if(M.existing&&A.extent!=='part'&&f.groundEx==null&&(BD.S.sel.blds||[]).length) I('high','ground','existing whole building: ground floor not taken out of the hall');
     if(!M.existing&&A.extent!=='part'&&f.ground&&f.hallGross[1]>f.gross[1]-f.ground[0]+1) I('high','ground','new building: hall floor includes the ground floor');
     if(!M.existing&&A.extent==='part') out.info.sharedGround={gross:f.gross,hall:f.hallGross}; }
   // plant: units in a required yard, outside the lot, or evaporative units within 3 m of the lot line
   const PL=M.plant; if(PL){ out.info.placed=PL.placed; out.info.miss=PL.miss;
     for(const b of PL.boxes||[]){ const atGrade=b.base<0.5; let outLot=0; for(const [x,y] of W.samples(b.ring,1,true)) if(!BD.pip(x,y,M.ring)&&ringD(x,y,M.ring)>0.3) outLot++;
       if(outLot) I('high','plant-lot',\`\${b.name} (\${b.kind}) reaches outside the lot\`);
       if(atGrade&&E.length){ const h=W.checkRing(E,b.ring,1,0.3); if(h) I(blocked?'low':'high','plant-yard',\`\${b.name} in the yard sits \${h.into} m into the required \${h.kind} yard (\${Z.key}\${M.existing?', existing building':''})\${blocked?' (set-up blocked anyway)':''}\`); }
       if(/tower|hybrid/.test(b.name)){ let dmin=1e9; for(const [x,y] of W.samples(b.ring,0.5,true)) dmin=Math.min(dmin,BD.pip(x,y,M.ring)?ringD(x,y,M.ring):-ringD(x,y,M.ring)); if(dmin<3-0.05) I(blocked?'low':'high','evap-3m',\`\${b.name} \${dmin.toFixed(2)} m from the lot line (NBC 6.3.2.15.(5): 3 m)\`); } } }
   // the building footprint against the required yards (new building)
   if(!M.existing&&M.foot&&E.length&&!M.existing){ const h=W.checkRing(E,M.serverFoot||M.foot,1,0.3); if(h) I('high','bld-yard',\`the hall outline sits \${h.into} m into the required \${h.kind} yard\`); }
   // fence (scene3d fenceLine: clip(ring, yardRect)); Vancouver 1.9 m cap in a required yard, Edmonton behind the setback
   if(!M.existing&&M.ring){ const FR=M.yardRect?BD.geo.clip(M.ring,M.yardRect):M.ring; out.info.fenceArea=FR.length?Math.round(BD.area(FR)):0;
     if(E.length){ const h=W.checkRing(E,FR,0.5,0.3); if(h) I('high','fence',\`the 2.4 m fence stands \${h.into} m inside the required \${h.kind} yard (\${M.city==='van'?'Van s. 10.10.3 caps fences in yards at 1.9 m':'Edm s. 8.20, our reading'}); lot not a rectangle in the tool frame\`); }
     if(FR.length<6) I('medium','fence','fence line is empty'); }
   // fuel: generators on the roof, NFC Table 4.3.13.4.-B 20,000 L above the first storey
   if(A.gens!=='none'&&(A.genAt||'yard')==='roof'&&PL&&PL.s&&PL.s.g){ const L=M.mwSized*R.pue[1]*1000*R.fuelHours*R.fuelLkWh; out.info.fuelL=Math.round(L); if(L>20000.5&&!blocked) I('high','fuel',\`\${Math.round(L)} L on the roof, over 20,000 L, not blocked\`);
     if(L>20000.5&&!P.some(x=>/fire code|4\\.3\\.13/.test(x))) I('medium','fuel','over the fuel limit but no fuel reason in the problems');
     if(A.genSpares==='2n'||A.genSpares==='n1') out.info.fuelSets=PL.s.gN+' sets for '+PL.s.gNeed+' needed'; }
   if(A.mw&&M.mwSized!==A.mw) I('medium','size','plant sized for '+M.mwSized+' MW, answers say '+A.mw);
   // noise
   const nc=M.noise; if(PL&&PL.s&&PL.s.n&&!nc) I('medium','noise','plant but no noise result (noiseCheck returned null or threw)');
   if(nc){ out.info.noise={block:!!nc.block,req:nc.req?nc.mit.short:null,flag:!!nc.flag,tested:nc.tested,limit:nc.limit,worst:nc.worst&&{lo:nc.worst.lo,hi:nc.worst.hi,Ls:nc.worst.Ls,L:nc.worst.L,d:nc.worst.d}};
     if(nc.block&&!blocked) I('high','noise','noise block but setupProblems empty');
     if(nc.req&&!nc.mit.short) I('high','noise','mitigation required but none named');
     if(nc.req&&!(M.notes||[]).includes(nc.req)) I('high','noise','required mitigation not in m.notes');
     // every receiver level the check left, with its option applied, against the night limit that blocks
     if(!nc.block){ let over=null; const seen=new Set(); for(const k in BD.S.tiles){ if(!k.startsWith(BD.S.sel.city+':')) continue; for(const b of BD.S.tiles[k].bld){ const v=e.noiseLevel(b); if(!v||seen.has(v)||prior.has(v)) continue; seen.add(v); /* only the levels this check wrote (NLEV is never cleared) */ if(v.lo>v.Ls+0.05&&(!over||v.lo-v.Ls>over.ex)) over={ex:+(v.lo-v.Ls).toFixed(1),lo:+v.lo.toFixed(1),Ls:v.Ls,lot:v.lot,d:Math.round(v.d)}; } }
       out.info.noiseRecv=seen.size; if(over) I('high','noise',\`a neighbour is \${over.ex} dB over the \${over.Ls} dBA night limit (\${over.lo} dBA, \${over.d} m) with \${nc.mit.short||'no mitigation'} and not blocked\`); }
     if(nc.tested===0) out.info.noNeighbours=true; }
   out.blocked=blocked; return out; };
})()`;

/* ---------- the probes, per lot (in page; each restores the answers it started from) ---------- */
const PROBES = `async ()=>{ const W=window.__RS, A=BD.S.answers, base=W.snapshot(), res=[]; const fm0=BD.fitMax(); const f0=BD.eng.siteFacts();
  const run=(label,set)=>{ W.restore(base); Object.assign(BD.S.answers,set); let r; try{ r=W.check(label); }catch(err){ r={label,issues:[['high','throw',err.message.slice(0,200)]]}; } res.push(r); return r; };
  const mwAt=set=>{ W.restore(base); Object.assign(BD.S.answers,set,{mw:null}); BD.modelReset(); const v=BD.fitMax(); return v; };
  run('as opened',{});
  const isNew=A.built==='new';
  // sizes above what fits
  if(fm0){ run('fitMax + 0.5 MW',{mw:+(fm0+0.5).toFixed(1)}); run('fitMax × 2',{mw:+(fm0*2).toFixed(1)}); }
  run('40 MW',{mw:40});
  // height
  if(isNew){ for(const st of [3,6,12,40]) run('storeys '+st,{hmode:'storeys',storeys:st,mw:null}); run('with approval',{hmode:'cond',mw:null}); }
  // plant and generators, each at its own largest fit
  const places=[['roof','yard'],['roof','roof'],['yard','yard'],['yard','roof'],['split','yard'],['split','roof']];
  for(const [pa,ga] of places){ for(const gens of ['yes','none']){ if(gens==='none'&&ga==='roof') continue; const set={plantAt:pa,genAt:ga,gens}; const v=mwAt(set); const lab=\`plant \${pa}, gens \${gens==='none'?'none':ga}\`;
      if(v) { run(lab+' @fitMax '+v,Object.assign({},set,{mw:v})); run(lab+' @fitMax+0.3',Object.assign({},set,{mw:+(v+0.3).toFixed(1)})); } else run(lab+' (nothing fits) @'+(A.mw||'-'),set); } }
  // fuel: roof generators at and above the NFC cap, with spares
  { const R=BD.eng.R, cap=Math.floor(R.fuelLimit.low/(R.pue[1]*1000*R.fuelHours*R.fuelLkWh)*10)/10; for(const mw of [cap,+(cap+0.1).toFixed(1),8]) for(const gs of ['n1','2n']) run(\`roof gens \${mw} MW \${gs}\`,{gens:'yes',genAt:'roof',genSpares:gs,mw}); }
  // vis and cooling, each at its own largest fit
  for(const vis of ['reveal','screen','enclose','indoors']) for(const [inside,outside] of [['air','dry'],['plate','dry'],['air','towers'],['air','hybrid']]){ const set={vis,inside,outside}; const v=mwAt(set); run(\`vis \${vis}, \${inside}/\${outside} @\${v||'-'}\`,Object.assign({},set,{mw:v||A.mw})); }
  // existing building and floors (lots with a building)
  if((BD.S.sel.blds||[]).filter(b=>b.f!==3).length){ for(const [ext,fl] of [['whole',''],['part','ground'],['part','basement'],['part','upper'],['part','roof'],['part','']]){ let set={built:'existing',extent:ext,floor:fl||undefined}, v=null; for(const t of [{},{vis:'indoors'},{plantAt:'yard'},{gens:'none'},{gens:'none',vis:'indoors'},{gens:'none',plantAt:'yard'}]){ const s2=Object.assign({},set,t); v=mwAt(s2); if(v){ set=s2; break; } } run(\`existing \${ext}\${fl?' '+fl:''}\${set.vis?' indoors':''}\${set.gens==='none'?' no gens':''}\${set.plantAt?' plant '+set.plantAt:''} @\${v||'-'}\`,Object.assign({},set,{mw:v||0.5})); } }
  if(isNew){ const v=mwAt({built:'new',extent:'part'}); run('shared new building @'+(v||'-'),{built:'new',extent:'part',mw:v||0.5}); }
  // swap the ends (which end is the front)
  if(isNew){ const v=mwAt({flip:true}); run('ends swapped @'+(v||'-'),{flip:true,mw:v||A.mw}); }
  W.restore(base); return {res,fm0,mwRange:f0.mw}; }`;

/* the three options and the report options (B): each at its size, with its cooling */
const OPTS = `async ()=>{ const W=window.__RS, base=W.snapshot(), e=BD.eng, out=[]; try{ const f=e.siteFacts(), d=await e.loadRecv(f.city), O=e.optionSet(f,e.nearby(f,d),e.netsAt(f,d));
  for(const o of O){ W.restore(base); BD.S.answers.mw=o.mw; BD.S.answers.inside=o.recover?'plate':'air'; BD.modelReset(); const p=BD.setupProblems(); out.push({id:o.id,name:o.name,mw:o.mw,recover:o.recover,problems:p.map(x=>x.slice(0,160))}); } }catch(err){ out.push({err:err.message}); } W.restore(base); return out; }`;

(async () => {
  const outFile = process.argv[2] || 'sweep_rules.json', shotDir = process.argv[3] || 'shots'; fs.mkdirSync(shotDir, { recursive: true });
  const keys = process.argv.slice(4).length ? process.argv.slice(4) : Object.keys(LOTS);
  const res = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};
  const b = await chromium.launch({ ...(process.env.PW_EXE?{executablePath:process.env.PW_EXE}:{}), args: ['--use-gl=swiftshader', '--enable-webgl'] });
  for (const key of keys) {
    const [lab, sub, sel, ans] = LOTS[key]; const R = { key, lab, sub, pageErrors: [], console: [], t0: Date.now(), ui: [] };
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); let cur = 'load';
    p.on('pageerror', e => R.pageErrors.push([cur, e.message.slice(0, 300)]));
    p.on('console', m => { if (m.type() === 'error') { const t = m.text(); if (!/Failed to load resource|fonts\.g|ERR_FAILED|d3/.test(t)) R.console.push([cur, t.slice(0, 300)]); } });
    const local = (re, file, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, file)), contentType: type }));
    await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript');
    await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
    await local(/jspdf\.umd/, 'jspdf/dist/jspdf.umd.min.js', 'application/javascript');
    await local(/autotable/, 'jspdf-autotable/dist/jspdf.plugin.autotable.min.js', 'application/javascript');
    await p.route(/flow\.js/, async r => { const res = await r.fetch(); let t = await res.text();
      t = t.replace('const EXAMPLES=[', 'const EXAMPLES=window.__EX=[').replace('async function runExample(i){', 'window.__run=runExample; async function runExample(i){');
      r.fulfill({ response: res, body: t }); });
    await p.route(/fonts\.(googleapis|gstatic)|d3/, r => r.abort());
    await p.addInitScript(() => { try { localStorage.setItem('bd-tier', 'full'); } catch (e) {} });
    const shot = async (n) => { const fn = path.join(shotDir, `${key}_${n}.png`); await p.screenshot({ path: fn }); return fn; };
    const side = () => p.evaluate(() => { const F = BD.flow, sd = document.getElementById('side'); return { i: F.i, k: F.steps[F.i] && F.steps[F.i].k, max: F.max, stuck: !!F.stuck, tier: BD.tier(), fstuck: !!sd.querySelector('.fstuck'), next: (() => { const n = document.getElementById('fNext') || document.getElementById('dN') || document.getElementById('rN'); return n ? { id: n.id, dis: n.disabled, t: n.textContent.trim().slice(0, 40) } : null; })(), h2: ((sd.querySelector('h2') || {}).textContent || '').slice(0, 50), mw: BD.S.answers.mw, nprob: BD.setupProblems().length }; });
    try {
      await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForTimeout(6000);
      cur = 'select';
      await p.evaluate(x => { window.__EX.push(x); const w = document.getElementById('welcome'); if (w) w.remove(); return window.__run(window.__EX.length - 1); }, { lab, sub, sel, ans });
      await p.waitForTimeout(4000);
      await p.evaluate(PAGE);
      R.selected = await p.evaluate(() => !!BD.S.sel && { id: BD.S.sel.id, lot: Math.round(BD.S.sel.lotArea || 0), zone: BD.eng.siteFacts().zone, blds: (BD.S.sel.blds || []).length, fitMax: BD.fitMax(), ans: JSON.parse(JSON.stringify(BD.S.answers)) });
      if (!R.selected) { R.fatal = 'lot did not select'; throw new Error('noselect'); }
      if (process.env.DEV_JS) { const out = await p.evaluate(fs.readFileSync(process.env.DEV_JS, 'utf8')); console.log(JSON.stringify(out, null, 1)); if (process.env.DEV_SHOT) await shot(process.env.DEV_SHOT); throw new Error('dev'); }
      cur = 'probes'; const t1 = Date.now();
      R.probes = await p.evaluate(`(${PROBES})()`).catch(e => ({ err: e.message.slice(0, 300) })); R.probeMs = Date.now() - t1;
      cur = 'options'; R.opts = await p.evaluate(`(${OPTS})()`).catch(e => [{ err: e.message.slice(0, 200) }]);

      /* C. ways past a block, in each template. A set-up that breaks a rule: the size well above what fits */
      const BREAK = `(()=>{ const A=BD.S.answers; A.mw=+(((BD.fitMax()||0.5))*2+1).toFixed(1); BD.modelReset(); return BD.setupProblems().length; })()`;
      const snap0 = await p.evaluate(() => window.__RS.snapshot());
      const UIK = new Set((process.env.UI_LOTS || 'V09,E05,CLARK,E123,HAST,VI2S,VFC2,EBEL').split(','));
      if (UIK.has(key)) {
      for (const tier of ['full', 'community', 'resident', 'arch']) {
        cur = 'ui-' + tier; const U = { tier, steps: [] };
        await p.evaluate(async t => { window.__RS.restore(window.__RSbase || (window.__RSbase = window.__RS.snapshot())); BD.setTier(t); delete BD.S.answers.residentEdit; await BD.flow.go(1); }, tier);
        await p.waitForTimeout(1500);
        // walk forward with the good set-up as far as 'fits' and one further step, to reach later groups
        await p.evaluate(async () => { const F = BD.flow; const k = F.steps.findIndex(s => s.k === 'fits'); await F.go(k); }); await p.waitForTimeout(1200);
        await p.evaluate(async () => { const F = BD.flow; F.next(); }); await p.waitForTimeout(1500);
        U.reached = await side();
        // 1) back to the set-up, break it there through the card UI path (answers + the card's own redraw)
        await p.evaluate(async () => { const F = BD.flow; await F.go(F.steps.findIndex(s => s.k === 'setup')); }); await p.waitForTimeout(1200);
        U.nprob = await p.evaluate(BREAK);
        await p.evaluate(() => { const t = BD.tier(); if (t === 'resident' && BD.residentCard) BD.residentCard(); else if (BD.deck) BD.deck.show(0); }); await p.waitForTimeout(800);
        U.atSetup = await side();
        // the last card's "What fits here" button, or the resident card's button
        await p.evaluate(async () => { if (BD.tier() === 'resident') { const b = document.getElementById('rN'); if (b && !b.disabled) b.click(); return; } const L = BD.deck.DECK.filter(d => !d.when || d.when(BD.S.answers)); BD.deck.show(L.length - 1); await new Promise(r => setTimeout(r, 400)); const b = document.getElementById('dN'); if (b) b.click(); });
        await p.waitForTimeout(1500); U.afterCardNext = await side();
        // the flow's Next button
        await p.evaluate(() => { const b = document.getElementById('fNext'); if (b) b.click(); }); await p.waitForTimeout(1200); U.afterFNext = await side();
        // the step bar: every enabled group button after the current one
        U.bar = await p.evaluate(async () => { const out = []; const bs = [...document.querySelectorAll('#side .flowbar [data-fg]')]; for (const b of bs) { out.push({ g: b.dataset.fg, dis: b.disabled }); } const later = bs.filter(b => !b.disabled).slice(-1)[0]; if (later) later.click(); await new Promise(r => setTimeout(r, 1500)); return out; });
        U.afterBar = await side();
        // the tier switch while stuck, from the setup step and from a later step
        U.tierSwitch = [];
        for (const to of ['arch', 'resident', 'community', 'full']) { if (to === tier) continue;
          await p.evaluate(async t => { const s = document.getElementById('tierSel'); if (s) { s.value = t; s.dispatchEvent(new Event('change')); } }, to); await p.waitForTimeout(1500);
          const s1 = await side(); U.tierSwitch.push({ to, ...s1 });
          await p.evaluate(t => { BD.setTier(t); }, tier); }
        await p.evaluate(async t => { BD.setTier(t); await BD.flow.go(BD.flow.steps.findIndex(s => s.k === 'setup')); }, tier); await p.waitForTimeout(800);
        R.ui.push(U);
      }
      /* D. stuck on a later step, then the tier switch: does go(F.i) skip forward past the block? (full template, at Heat) */
      cur = 'skip';
      R.skip = await p.evaluate(async (s0) => { const W = window.__RS; W.restore(s0); BD.setTier('full'); const F = BD.flow; const out = {};
        await F.go(F.steps.findIndex(s => s.k === 'fits')); F.next(); await new Promise(r => setTimeout(r, 1200)); await F.go(F.steps.findIndex(s => s.k === 'heat')); await new Promise(r => setTimeout(r, 1500));
        out.before = { k: F.steps[F.i].k, max: F.max };
        const A = BD.S.answers; A.mw = +(((BD.fitMax() || 0.5)) * 2 + 1).toFixed(1); BD.modelReset(); BD.tabView('heat'); await new Promise(r => setTimeout(r, 1500)); out.stuckAtHeat = !!F.stuck;
        const s = document.getElementById('tierSel'); if (s) { s.value = 'arch'; s.dispatchEvent(new Event('change')); } await new Promise(r => setTimeout(r, 2500));
        out.after = { k: F.steps[F.i].k, stuck: !!F.stuck, max: F.max, h2: ((document.querySelector('#side h2') || {}).textContent || '').slice(0, 40), problems: BD.setupProblems().length, archBoxes: !!(BD.arch && BD.arch.last) };
        // from there, the step bar's later groups
        const bs = [...document.querySelectorAll('#side .flowbar [data-fg]')].filter(b => !b.disabled).map(b => b.dataset.fg); out.barEnabled = bs;
        BD.setTier('full'); W.restore(s0); return out; }, snap0).catch(e => ({ err: e.message.slice(0, 200) }));
      if (R.skip && R.skip.after && R.skip.after.problems && !['setup', 'fits', 'heat'].includes(R.skip.after.k)) R.skipShot = await shot('tierskip');
      /* D2. the same with the other skips: stuck on Real buildings, switch to residents (skips Real buildings); stuck on Programs (arch), switch to full (skips the Design steps) */
      cur = 'skip2';
      R.skip2 = await p.evaluate(async (s0) => { const W = window.__RS, F = BD.flow, out = []; const brk = () => { const A = BD.S.answers; A.mw = +(((BD.fitMax() || 0.5)) * 2 + 1).toFixed(1); BD.modelReset(); };
        const sw = async t => { const s = document.getElementById('tierSel'); if (s) { s.value = t; s.dispatchEvent(new Event('change')); } await new Promise(r => setTimeout(r, 2500)); };
        for (const [t0, at, t1] of [['full', 'prec', 'resident'], ['arch', 'aprog', 'full'], ['arch', 'aprog', 'community']]) { W.restore(s0); BD.setTier(t0); await F.go(1); await new Promise(r => setTimeout(r, 800));
          await F.go(F.steps.findIndex(s => s.k === 'fits')); F.next(); await new Promise(r => setTimeout(r, 1200)); const k = F.steps.findIndex(s => s.k === at); await F.go(k); await new Promise(r => setTimeout(r, 1500));
          const was = F.steps[F.i].k; brk(); if (at === 'aprog') await BD.views.aprog(); else BD.tabView ? (at === 'prec' ? null : null) : null; await F.go(F.i); await new Promise(r => setTimeout(r, 1200)); const st = !!F.stuck;
          await sw(t1); out.push({ from: t0 + '@' + was, stuckThere: st, to: t1, landed: F.steps[F.i].k, stuck: !!F.stuck, problems: BD.setupProblems().length, mw: BD.S.answers.mw }); }
        BD.setTier('full'); W.restore(s0); return out; }, snap0).catch(e => ({ err: e.message.slice(0, 200) }));
      }
      /* E. the report built from a set-up that breaks a rule (reached through the skip, if it worked) */
    } catch (e) { if (e.message !== 'noselect') R.fatal = (R.fatal || '') + e.message.slice(0, 300); }
    R.ms = Date.now() - R.t0; res[key] = R; fs.writeFileSync(outFile, JSON.stringify(res, null, 1));
    const n = R.probes && R.probes.res ? R.probes.res.reduce((t, s) => t + (s.issues || []).length, 0) : -1;
    console.log(key, R.fatal ? 'FATAL ' + R.fatal : '', 'probe issues', n, 'pageErrors', R.pageErrors.length, 'console', R.console.length, Math.round(R.ms / 1000) + 's');
    await p.close();
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
