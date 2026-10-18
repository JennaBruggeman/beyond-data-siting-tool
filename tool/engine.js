/* Beyond Data — rounds 2 and 3: what fits here, who could take the heat, three options with trade-off tables.
   Every figure comes from the formula register (formula_register.json) with its source; ranges, never points; nothing summed or ranked.
   Wording is Claude's draft for J.B. (shown in the draft colour). */
(function(){
'use strict';
const BD=window.BD; const {$,esc,fmt}=BD;
const f1=n=>n==null?'—':(n<10?n.toFixed(1):Math.round(n).toLocaleString('en-CA'));
const rng=(a,b,u)=>a==null?'—':(f1(a)===f1(b)?f1(a):f1(a)+'–'+f1(b))+(u?' '+u:'');
const kmOrM=d=>d>=1000?(d/1000).toFixed(2)+' km':Math.round(d)+' m';

/* ---------- register values used here (id → value, source) ---------- */
const R={
 envVan:{ 'I-2':{fsr:[3,3],h:18.3,hx:'30.5–36.5',ground:true,yards:{front:0,side:0,rear:3.1,note:'I-2 outside sub-area B: no front yard; rear yard 3.1 m; side yards only beside residential zones without a lane (0.9–1.5 m, not applied); no site coverage limit (ss. 3.1.2.2–3); sub-area B has deeper yards and is not yet mapped'}}, 'I-1C':{fsr:[6,6],h:46.5,hx:'50.3',ground:false},
          'I-3':{fsr:[3,3],h:18.3,hx:'30.5',ground:true,w:61,yards:{front:0.6,side:7.6,rear:3.1,max:61,note:'I-3 sub-area A: front yard 0.6 m, side yards 7.6 m, rear yard 3.1 m, building no wider or deeper than 61 m (2022 draft schedule)'}}, 'FC-2':{fsr:[1,5],h:22.9,hx:'51.8',ground:true,yards:{front:0.6,side:0,rear:0.6,note:'FC-2: front and rear yards 0.6 m, no side yards (2022 draft schedule)'}} },
 envEdm:{ IH:{fsr:[2,2],h:30}, IM:{fsr:[2,2],h:18,yards:{front:3.0,side:0,rear:0,note:'IM: 3.0 m from the street; 6.0 m next to non-industrial zones (not applied — neighbours not read)'}}, BE:{fsr:[1.6,1.6],h:16,yards:{front:6.0,side:0,rear:0,note:'BE: 6.0 m from the street (4.5 m on a collector or local road; road class not read); 6.0 m next to a residential zone (not applied — neighbours not read)'}} },
 ftf:{ground:6.0, up:[5.5,6.0]},     // ground: zoning minimum (I-2/I-3) and Burlington; data-hall floors 5.5–6.0 m: Burlington ≈6.0, HK TPB A/KC/510B 5.5, A/KC/480 6.0 (15 Oct check; zoning's 4.0 m is a minimum, not a hall height)
 hallShare:[0.48,0.72],               // hall_area: Burlington plan set (internally inconsistent: 48% or 72%); single-storey and operator cases 51–87% not used for multi-storey
 m2PerMW:[290,630],                   // built Canadian halls, operator claims: eStruxture VAN-1 ≈290, Hut 8 Vault ≈557, Qu EDM1 ≈584, Cologix VAN2 ≈619, VAN5 ≈627 (sources/16 §2.7)
 m2PerMWHigh:[250,290],               // high-density / liquid-cooled option: NEXTDC S3 250 and QScale Q01 255 (operator claims, AI-ready halls); 290 = densest built Canadian hall (VAN-1)
 m2PerMWModel:[186,2325],             // LBNL prototypes (Sun et al. 2021), shown as outer bounds only
 grossPerMW:[505,1109],               // check: whole building per MW IT — min–max of the 11 benchmark buildings in bench/benchmarks.json (6 approved, 2 proposed, 1 refused, 1 under construction, 1 unknown; applicant or filed figures; test_size_chain.py keeps this in sync)
 cases:{van:[{mw:1.6,n:'Cologix VAN5'},{mw:2.4,n:'eStruxture VAN-1'},{mw:40,n:'111 E 5th (proposed)'}], edm:[{mw:2.5,n:'Qu EDM1'}]}, // operator or applicant figures
 steps:[0.1,0.2,0.3,0.5,0.75,1,1.5,2,2.5,3,4,5,6,8,10,12,15,20,25,30,40],
 plant:{ups:[2.0,2.4],batt:[2.2,2.2],dry:[24.5,24.5],hp:[3.4,3.4],cdu:[0.6,0.6]}, // component_space, manufacturer claims, equipment only
 pue:[1.4,1.55], lf:0.6, lwUnit:[98,101], // sound power per ~1 MW air-cooled unit: Trane RTAF size 280 (1,010 kW), low-noise 98 / standard 101 dB(A), brochure RTAF-SLB001-GB p.13 (sweep 17 Oct; checked 18 Oct)
  capture:[0.48,0.75], cop:[3.0,4.5], // COP: DEA 2026 waste-heat HPs to 70 °C 3.0–3.6; observed Meta Odense 27→70 °C: 4.5 (2020), ≈3.9 combined 2022–24 (Fjernvarme Fyn annual reports)
 fuelLkWh:0.263, fuelHours:12, fuelLimit:{low:20000,first:200000},
 homeMWh:{van:14.58,edm:29.19},       // CEUD 2023 space + water heating per household: BC 52.5 GJ, AB 105.1 GJ
 grid:{van:18.1,edm:346.1},           // g CO2e/kWh, NIR 2026, consumption, 2024
 neuCredit:32.59,                     // $/MWh, By-law 9552 Sch. C
 reach:{pool:1000,housing:1200,greenhouse:1500}, reachGuide:1200,
 jobsM2:464.5, kWPerRack:8,            // Uptime 2024 average 8 kW per rack (industry survey; register size_fit)
                        // 5,000 ft² per operating job, JLARC 2024 (transferred)
};
const SRC2={
 env:'formula register: envelope (zone schedules; sources 17, 18)', hall:'register: hall_area (one calibration case, confidence 50); ground-floor rule: I-2 s. 2.2.7; floor heights: Burlington plans, HK TPB A/KC/480, A/KC/510B',
 size:'register: size_fit (built halls: eStruxture VAN-1, Hut 8 Vault, Qu EDM1, Cologix VAN2, VAN5 — operator claims; LBNL prototypes, Sun et al. 2021; whole-building check: 111 E 5th RTS 19744, Ark UP4 committee report, Cologix VAN4 operator)',
 plant:'register: component_space (manufacturer claims, equipment only; clearances and switchgear rooms not sourced)',
 pue:'register: pue (LBNL 2023; Uptime 2025 industry survey)', lf:'register: load_factor (Fan et al. 2007)',
 cap:'register: liquid_capture (LBNL 2014, NREL — direct-to-chip 48–75%; air-cooled: no primary figure)',
 cop:'register: cop (DEA 2026 waste-heat heat pumps to 70 °C, 1–3 MW: 3.0–3.6; observed at Meta Odense, 27 → 70 °C: 4.5 in 2020; from 2021 Fjernvarme Fyn reports Meta\'s heat pumps together with others, about 3.9 combined — Fjernvarme Fyn annual reports)', fuel:'register: fuel_on_site (NFC 2020 Table 4.3.13.4.-B; fuel rate a manufacturer claim; Uptime ≥ 12 h)',
 svc:'register: service_class (BC Hydro primary guide; EPCOR connection guide)', homes:'register: homes_heated (NRCan CEUD 2023)',
 grid:'register: grid_co2 (NIR 2026 Annex 7, consumption intensity 2024)', neu:'By-law 9552 Sch. A, C, s. 2.1 (consolidated 1 Jan 2026); service area traced ±45 m',
 reach:'register: receiver_radius (RVO 2018, 5-year payback)', recv:'Statistics Canada ODSRF v2 (2026), ODHF (2020), ODEF v2.1 (2022); City of Vancouver non-market housing',
 jobs:'register: jobs (Virginia JLARC 2024, transferred; confidence 40)', noise:'Noise Control By-law 6555 ss. 2.1–2.3, Sch. A, B (Vancouver); Bylaw 14600 (Edmonton)',
 grid2:'register: grid_headroom (BC Hydro West End Substation CPCN, 10 Nov 2025)', floor:'register: floor_load_need (NBC 2020 Table 4.1.5.3)',
};
// evidence kind for each source line (shown as a small badge): record = public record or regulator; peer = peer-reviewed or government lab;
// survey = industry survey; claim = operator or manufacturer claim; physics = physical relation; transfer = figure from elsewhere; assume = assumption
const EV={env:'record',hall:'filed',size:'claim',plant:'claim',pue:'survey',lf:'peer',cap:'peer',cop:'peer',fuel:'record',svc:'record',homes:'record',grid:'record',neu:'record',reach:'transfer',recv:'record',jobs:'transfer',noise:'record',grid2:'record',floor:'record',
 elec:'record',pv:'peer',batt:'peer',ups:'claim',dr:'record',ev:'claim',gen:'record',ctl:'peer',evap:'physics',wbe:'peer',rain:'record',reuse:'record',wprice:'record',sewer:'record',srv:'peer',ew:'claim',cu:'claim',eit:'claim',eb:'peer',snd:'claim',lf2:'record',light:'record',so:'transfer',watch:'assume',ppl:'record'};
const EVL={record:'public record',filed:'filed plans or application',peer:'research or government lab',survey:'industry survey',claim:'operator or maker claim',physics:'physics',transfer:'transferred from elsewhere',assume:'assumption or gap'};
const badge=k=>{ const e=EV[k]; return e?`<span class="evb ev-${e}" title="${EVL[e]}">${EVL[e]}</span> `:''; };
const src=k=>`<div class="src">${badge(k)}${esc(SRC2[k])}</div>`;

/* ---------- geometry helpers: lon/lat ↔ local metres (same projection as the tiles) ---------- */
function P(lon,lat){ const m=BD.S.meta[BD.S.city]; const k=Math.cos(m.lat0*Math.PI/180)*111320; return [(lon-m.lon0)*k,(lat-m.lat0)*110540]; }
BD.recv={};
async function loadRecv(city){ if(BD.recv[city]) return BD.recv[city];
  try{ const d=await BD.getJSON(`tiles/${city}/receivers.json`);
    d.pts.forEach((p,i)=>{ [p.x,p.y]=P(p.lon,p.lat); p.id=i; });
    d.nets.forEach(n=>{ n.r=new Float64Array(n.ring.flatMap(([lo,la])=>P(lo,la))); n.path=BD.pathOf([n.r]); });
    BD.recv[city]=d; BD.draw(); return d; }catch(e){ console.warn(e); BD.recv[city]={pts:[],nets:[]}; return BD.recv[city]; } }
BD.loadRecv=loadRecv;
function distToRing(x,y,r){ let best=1e12; for(let i=0,j=r.length-2;i<r.length;j=i,i+=2){ const ax=r[j],ay=r[j+1],bx=r[i],by=r[i+1]; const dx=bx-ax,dy=by-ay; const t=Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy)/(dx*dx+dy*dy||1))); best=Math.min(best,Math.hypot(x-ax-t*dx,y-ay-t*dy)); } return best; }

/* ---------- the site in numbers ---------- */
/* what fits must not depend on what was clicked before (verification sweep 17 Oct, C2). The cooling plant takes floor space, and it used to be
   sized for whatever size was last chosen, so the range moved between visits. Now the range is worked out with the plant sized for the top of the
   range itself (repeated until it settles); the size you pick still sizes the plant shown in the 3D and the equipment counts. */
let stableKey=null, stableF=null, inStable=false;
function stableFacts(){ const A=BD.S.answers, s=BD.S.sel; if(!s) return null;
  const k=JSON.stringify([s.city,s.id,Object.assign({},A,{mw:null,mwSite:null})]); if(k===stableKey&&stableF) return stableF;
  const keep=A.mw; inStable=true; let f=null, mw=null;
  // the top of the range falls as the plant grows, so there is one size where plant and range agree: find it by halving (log scale, 0.1–40 MW)
  try{ const at=m=>{ A.mw=m; BD.modelReset&&BD.modelReset(); return siteFactsRaw(); };
    let lo=0.1, hi=40, fl=at(lo);
    if(fl.mw[1]<=lo) { f=fl; mw=lo; }
    else { const fh=at(hi); if(fh.mw[1]>=hi){ f=fh; mw=hi; }
      else { for(let i=0;i<18;i++){ const m=Math.sqrt(lo*hi), fm=at(m); if(fm.mw[1]>=m){ lo=m; f=fm; mw=m; } else hi=m; if(hi/lo<1.01) break; }
        if(!f){ f=at(lo); mw=lo; } } }
    // plant comes in whole units, so the top can jump past the size it was sized for; above that size the plant no longer fits, so cap it there
    if(f.mw[1]>mw&&mw<40){ f.mw=[Math.min(f.mw[0],mw),mw]; f.mwCapped=true; }
    f.plantFor=mw; }
  finally{ A.mw=keep; inStable=false; BD.modelReset&&BD.modelReset(); }
  stableKey=k; stableF=f; return f; }
function siteFacts(){ if(inStable) return siteFactsRaw(); const st=stableFacts(); if(!st) return siteFactsRaw();
  return Object.assign({},st,{M:BD.model?BD.model():st.M}); }
function siteFactsRaw(){
  const s=BD.S.sel, city=s.city, a=s.a||[], A=BD.S.answers;
  const blds=(s.blds||[]).filter(b=>b.f!==3);
  const f={city, lot:city==='van'?(s.lotArea||a[8]):a[4], zone:null, env:null, envNote:'', blds};
  if(city==='van'){ f.zone=(a[1]||'').trim(); f.env=R.envVan[f.zone]||null; }
  else { const z=String(a[2]||a[1]||'').trim().split(/\s+/)[0].toUpperCase(); f.zone=z; f.env=R.envEdm[z]||null; }
  f.status=BD.statusOf(f.zone);
  // Edmonton IH needs a 1.0 ha site (Bylaw 20001 s. 2.140, 4.1.1; verification sweep M54)
  if(city==='edm'&&f.zone==='IH'&&f.lot&&f.lot<10000) f.status=Object.assign({},f.status,{k:'case',t:'Allowed use, lot under 1.0 ha',d:f.status.d+' This lot is '+fmt(f.lot)+' m², below IH\'s 1.0 ha minimum site area (s. 2.140, 4.1.1): it would need to be consolidated with neighbours or varied.'});
  f.foot=blds.reduce((t,b)=>t+b.a,0); f.hmax=blds.length?Math.max(...blds.map(b=>b.h)):0; f.plate=blds.length?Math.max(...blds.map(b=>b.a)):0;
  f.c=s.ring?BD.centroid(s.ring):s.pt;
  f.downtown=city==='van'&&/^(DD|CWD|DEOD|BCPED|HA-1|HA-1A|HA-2)$/.test(f.zone);
  // gross floor area available to the data centre
  const M=BD.model?BD.model():null; f.M=M;
  const env0=f.env||(city==='van'?R.envVan['I-2']:R.envEdm.IM);
  const env=M&&M.Z?Object.assign({},env0,{fsr:M.Z.fsr,h:M.H||M.Z.hOutright,ground:M.Z.ground}):env0; f.envAssumed=M?M.Z.assumed:!f.env; f.envH=env.h; f.envU=env;
  // storeys within the height limit: 6.0 m ground floor, then 6.0 m (fewer) or 5.5 m (more) data-hall floors (or as set in the site setup)
  const nF=M&&M.nF&&A.built==='new'?M.nF.slice():[1+Math.max(0,Math.floor((env.h-R.ftf.ground)/R.ftf.up[1])), 1+Math.max(0,Math.floor((env.h-R.ftf.ground)/R.ftf.up[0]))];
  f.hallS=null; f.hallL=null;
  if(A.built==='new'){
    const g=[f.lot*env.fsr[0],f.lot*env.fsr[1]]; f.floors=nF[1]; f.floorsR=nF;
    // the zone's floor area is reachable only if that many storeys fit: at most the whole lot on every storey
    // footprint the yards leave: approximate the lot as a rectangle of its area, width w = area ÷ longest span
    let fp=f.lot; f.fpNote='';
    const ring=BD.S.sel&&BD.S.sel.ring, y=env.yards;
    if(M&&M.foot&&M.footArea){ fp=Math.min(f.lot||M.footArea,M.footArea); f.fp=fp; f.fpNote='from the site setup: '+({max:'the most the zone allows, less setbacks'+(M.loading?', loading':'')+(M.plantYardDepth?' and the plant yard':''),existing:'matching the existing building',cover:'coverage '+A.cover+'% of the lot'}[M.footMode]||'set in the setup')+(M.yardNote?' ('+M.yardNote.toLowerCase().replace(/\.$/,'')+')':''); f.fpCalc=null; }
    else if(y&&ring){ let L=0; for(let i=0;i<ring.length;i+=2) for(let j=i+2;j<ring.length;j+=2) L=Math.max(L,Math.hypot(ring[i]-ring[j],ring[i+1]-ring[j+1]));
      const a=BD.area(ring), w=Math.min(a/Math.max(L,1),L), d=a/Math.max(w,1);
      let fw=Math.max(0,w-2*y.side), fd=Math.max(0,d-y.front-y.rear); if(y.max){ fw=Math.min(fw,y.max); fd=Math.min(fd,y.max); }
      fp=Math.min(f.lot,fw*fd); f.fp=fp; f.fpNote=y.note; f.fpCalc={w,d,fw,fd}; }
    const ind=(M&&M.plant&&M.plant.indoor)||0; f.indoorPlant=ind;
    const G=[Math.max(0,Math.min(g[0],fp*nF[0])-ind),Math.max(0,Math.min(g[1],fp*nF[1])-ind)]; f.g=g; f.G=G;
    f.fullCover=(!f.fpNote||(M&&M.yardNote))&&g[1]>fp*nF[0]*0.999; f.heightCut=g[0]>fp*nF[0]*1.001; f.yardCut=!!f.fpNote&&g[1]>fp*nF[0]*1.001;
    if(A.extent==='part'){ f.gross=[G[0]/nF[0],G[1]/nF[1]].sort((a,b)=>a-b); f.how=`one floor of a new building: the zone's floor area ÷ ${nF[0]===nF[1]?nF[0]:nF[0]+'–'+nF[1]} storeys`; f.hallGross=f.gross.slice(); }
    else {
      f.gross=[Math.min(G[0],G[1]),Math.max(G[0],G[1])]; f.how=`lot ${fmt(f.lot)} m² × floor-space ratio ${env.fsr[0]===env.fsr[1]?env.fsr[0]:env.fsr[0]+'–'+env.fsr[1]}`;
      if(env.ground){
        // two readings of "no bulk data storage at grade": strict — the ground floor holds none of the data centre;
        // lenient — support rooms (electrical, generators, loading) may sit there. Which applies is for the City to confirm.
        const sc=[0,1].map(i=>({G:G[i],gr:G[i]/nF[i],up:G[i]-G[i]/nF[i]})); f.sc=sc;
        f.ground=[Math.min(...sc.map(s=>s.gr)),Math.max(...sc.map(s=>s.gr))];
        f.hallS=[Math.min(...sc.map(s=>s.up*R.hallShare[0])),Math.max(...sc.map(s=>s.up*R.hallShare[1]))];
        f.hallL=[Math.min(...sc.map(s=>Math.min(s.up,s.G*R.hallShare[0]))),Math.max(...sc.map(s=>Math.min(s.up,s.G*R.hallShare[1])))];
        f.hallGross=[Math.min(...sc.map(s=>s.up)),Math.max(...sc.map(s=>s.up))];
      } else f.hallGross=f.gross.slice();
    }
  } else {
    if(!blds.length){ f.gross=[0,0]; f.hallGross=[0,0]; f.how='no building recorded on this lot'; }
    else if(city==='edm'&&a[5]){ const g=a[5]; f.gross=A.extent==='part'?[g/Math.max(1,Math.round(f.hmax/4)),g/Math.max(1,Math.round(f.hmax/4))]:[g,g]; f.how=A.extent==='part'?'one floor: assessed floor area ÷ estimated storeys':'assessed floor area (City of Edmonton)'; f.hallGross=f.gross.slice(); }
    else { const st=Math.max(1,Math.floor(f.hmax/4.0)); f.floors=st; f.gross=A.extent==='part'?[f.plate,f.plate]:[f.foot*st,f.foot*st];
      f.how=A.extent==='part'?`one floor ≈ the largest footprint on the lot (${fmt(f.plate)} m²)`:`footprint ${fmt(f.foot)} m² × about ${st} storeys (height ${f.hmax.toFixed(1)} m ÷ 4 m — an assumption)`; f.hallGross=f.gross.slice(); }
  }
  if(!f.hallS){ f.hallS=[f.hallGross[0]*R.hallShare[0],f.hallGross[1]*R.hallShare[1]]; }
  const m2MW=A.density==='high'?R.m2PerMWHigh:R.m2PerMW; f.density=A.density==='high'?'high':'typical'; const toMW=h=>[Math.min(40,h[0]/m2MW[1]),Math.min(40,h[1]/m2MW[0])];
  f.mwS=toMW(f.hallS); f.mwL=f.hallL?toMW(f.hallL):null;
  f.hall=f.hallL?[f.hallS[0],Math.max(f.hallS[1],f.hallL[1])]:f.hallS.slice();
  f.mw=[f.mwS[0],f.mwL?Math.max(f.mwS[1],f.mwL[1]):f.mwS[1]]; f.m2MW=m2MW;
  // check against whole buildings: total floor area ÷ built building-area-per-MW
  f.mwCheck=A.built==='new'&&A.extent!=='part'?[f.gross[0]/R.grossPerMW[1],f.gross[1]/R.grossPerMW[0]]:null;
  return f;
}
function plantPerMW(recover){ const p=R.plant; let lo=p.ups[0]+p.batt[0]+p.dry[0], hi=p.ups[1]+p.batt[1]+p.dry[1]; if(recover){ lo+=p.hp[0]+p.cdu[0]; hi+=p.hp[1]+p.cdu[1]; } return [lo,hi]; }


/* ---------- range bars: a range drawn on a log scale 0.1–100 MW, so wide and narrow ranges look different ---------- */
function rangeBar(rows){ const L=v=>Math.max(0,Math.min(100,(Math.log10(Math.max(0.1,v))+1)/3*100));
  return `<div class="rbar">${rows.map(r=>`<div class="rrow"><span class="rlab">${esc(r.lab)}</span><span class="rtrack"><span class="rfill${r.ghost?' ghost':''}" style="left:${L(r.lo)}%;width:${Math.max(1.2,L(r.hi)-L(r.lo))}%"></span></span><span class="rval">${rng(r.lo,r.hi,'MW')}</span></div>`).join('')}<div class="rrow"><span class="rlab"></span><span class="rscale"><i style="left:0">0.1</i><i style="left:33.3%">1</i><i style="left:66.7%">10</i><i style="left:100%">100 MW</i></span><span class="rval"></span></div></div>`; }

/* ---------- show the math: every step with the site's own numbers, checkable with a calculator ---------- */
const n0=v=>Math.round(v).toLocaleString('en-CA'), n1=v=>v<10?(+v).toFixed(2):v<100?(+v).toFixed(1):n0(v);
const mathBox=(lines,note)=>`<details class="math"><summary>Show the math</summary><ol>${lines.map(l=>`<li>${l}</li>`).join('')}</ol>${note?`<div class="src">${note}</div>`:''}</details>`;
function mathFits(f){
  const A=BD.S.answers, L=[];
  const hs=R.hallShare, m=f.m2MW;
  if(A.built==='new'&&f.G){
    const e=f.envU, fsr=e.fsr[0]===e.fsr[1]?e.fsr[0]:e.fsr[0]+'–'+e.fsr[1];
    L.push(`Lot area: <b>${n0(f.lot)} m²</b> (City parcel data).`);
    L.push(`Zone floor-space ratio ${fsr}${f.envAssumed?' (as if rezoned)':''}: ${n0(f.lot)} × ${fsr} = <b>${n0(f.g[1])} m²</b>.`);
    L.push(`Storeys under the ${e.h} m height limit: first floor 6.0 m, then data-hall floors of 6.0 or 5.5 m. (${e.h} − 6.0) ÷ 6.0 = ${((e.h-6)/6).toFixed(2)}, whole floors ${Math.floor((e.h-6)/6)}, plus the first floor = <b>${f.floorsR[0]}</b>; with 5.5 m floors, ${((e.h-6)/5.5).toFixed(2)} → ${Math.floor((e.h-6)/5.5)} + 1 = <b>${f.floorsR[1]}</b>.`);
    if(f.fpNote&&!f.fpCalc) L.push(`Footprint ${esc(f.fpNote)}: <b>${n0(f.fp)} m²</b> (drawn in 3D).`);
    if(f.fpNote&&f.fpCalc){ const c=f.fpCalc; L.push(`Footprint after yards: lot ${n0(f.lot)} m² treated as ${n1(c.w)} m wide × ${n1(c.d)} m deep (width = area ÷ longest span). Less the yards: ${n1(c.fw)} × ${n1(c.fd)} = <b>${n0(f.fp)} m²</b>.`); }
    const fpv=f.fp||f.lot; L.push(`Most floor area those storeys can hold: ${n0(fpv)} m² × ${f.floorsR[0]} = ${n0(fpv*f.floorsR[0])} m²${f.floorsR[1]!==f.floorsR[0]?` (or × ${f.floorsR[1]} = ${n0(fpv*f.floorsR[1])} m²)`:''}. The smaller of this and step 2: <b>${rng(f.gross[0],f.gross[1],'m²')}</b>.`);
    if(f.sc){ f.sc.forEach((s,i)=>{ if(i===1&&f.floorsR[1]===f.floorsR[0]) return; const tag=f.floorsR[1]!==f.floorsR[0]?` <i>(${f.floorsR[i]} storeys)</i>`:'';
      L.push(`Ground floor (no data storage at grade)${tag}: floor area ÷ storeys = ${n0(s.G)} ÷ ${f.floorsR[i]} = <b>${n0(s.gr)} m²</b>. Floors above: ${n0(s.G)} − ${n0(s.gr)} = <b>${n0(s.up)} m²</b>.`);
      L.push(`Data hall, strict reading${tag} (only the floors above, and only part of them is hall): ${n0(s.up)} × ${hs[0]} = ${n0(s.up*hs[0])} m², up to ${n0(s.up)} × ${hs[1]} = <b>${n0(s.up*hs[1])} m²</b>.`);
      L.push(`Data hall, lenient reading${tag} (support rooms on the ground floor, so the hall share applies to the whole building, but the hall still fits only on the floors above): smaller of ${n0(s.G)} × ${hs[0]} and ${n0(s.up)} = ${n0(Math.min(s.up,s.G*hs[0]))} m², up to smaller of ${n0(s.G)} × ${hs[1]} and ${n0(s.up)} = <b>${n0(Math.min(s.up,s.G*hs[1]))} m²</b>.`); });
    } else L.push(`Data hall: ${n0(f.hallGross[0])} × ${hs[0]} = ${n0(f.hall[0])} m², up to ${n0(f.hallGross[1])} × ${hs[1]} = <b>${n0(f.hall[1])} m²</b>.`);
  } else {
    L.push(`Floor area: ${esc(f.how)} = <b>${rng(f.gross[0],f.gross[1],'m²')}</b>.`);
    L.push(`Data hall: ${n0(f.hallGross[0])} × ${hs[0]} = ${n0(f.hallS[0])} m², up to ${n0(f.hallGross[1])} × ${hs[1]} = <b>${n0(f.hallS[1])} m²</b>.`);
  }
  L.push(`Servers: the smallest hall laid out loosely, ${n0(f.hall[0])} ÷ ${m[1]} m² per MW = <b>${n1(f.mw[0])} MW</b>; the largest hall laid out densely, ${n0(f.hall[1])} ÷ ${m[0]} = <b>${n1(f.mw[1])} MW</b>${f.mw[1]>=40?' (capped at 40 MW, the tool\'s range)':''}.`);
  if(f.mwCheck) L.push(`Check: ${n0(f.gross[1])} ÷ ${n0(R.grossPerMW[1])} = ${n1(f.gross[1]/R.grossPerMW[1])} MW; ${n0(f.gross[1])} ÷ ${n0(R.grossPerMW[0])} = ${n1(f.gross[1]/R.grossPerMW[0])} MW${f.gross[0]!==f.gross[1]?' (shown for the larger floor area)':''}.`);
  return mathBox(L,`Hall share ${hs[0]}–${hs[1]}: Burlington plan set. ${m[0]}–${m[1]} m² of hall per MW: ${f.density==='high'?'high-density halls (NEXTDC S3, QScale; operator claims) to the densest built Canadian hall':'five built Canadian halls (operator claims)'}. ${n0(R.grossPerMW[0])}–${n0(R.grossPerMW[1])} m² of building per MW: benchmark buildings in the precedent catalogue.`);
}
function mathNeeds(mw,fac,f){
  const pl=plantPerMW(false), plR=plantPerMW(true), p=R.plant;
  return mathBox([
    `Power at the meter at full load: ${mw} MW × PUE ${R.pue[0]} = ${n1(fac[0])} MW; × ${R.pue[1]} = <b>${n1(fac[1])} MW</b>. Averaged over a year (× ${R.lf}): <b>${n1(fac[0]*R.lf)}–${n1(fac[1]*R.lf)} MW</b>.`,
    `Plant space, dry coolers: (UPS ${p.ups[0]}–${p.ups[1]} + batteries ${p.batt[0]} + dry coolers ${p.dry[0]}) = ${pl[0].toFixed(1)}–${pl[1].toFixed(1)} m² per MW; × ${mw} = <b>${n0(pl[0]*mw)}–${n0(pl[1]*mw)} m²</b>.`,
    `With heat recovery, add heat pumps ${p.hp[0]} + CDUs ${p.cdu[0]} = ${plR[0].toFixed(1)}–${plR[1].toFixed(1)} m² per MW; × ${mw} = <b>${n0(plR[0]*mw)}–${n0(plR[1]*mw)} m²</b>.`,
    BD.S.answers.gens==='none'?'Standby fuel: none (no generators chosen).':`Standby fuel: ${n1(fac[0])}–${n1(fac[1])} MW × 1,000 (kW) × ${R.fuelHours} h × ${R.fuelLkWh} L per kWh = <b>${n0(fac[0]*1000*R.fuelHours*R.fuelLkWh)}–${n0(fac[1]*1000*R.fuelHours*R.fuelLkWh)} L</b>.`
  ],'PUE: LBNL 2023, Uptime 2025. Plant areas: manufacturer claims, equipment only. Fuel rate: manufacturer claim at full load.');
}

/* ---------- round 2: what fits here ---------- */
function fitsView(){
  const f=siteFacts(), A=BD.S.answers; BD.S.view2='fits';
  const ST=R.steps, snap=v=>ST.reduce((b,s)=>Math.abs(Math.log(s/v))<Math.abs(Math.log(b/v))?s:b,ST[0]);
  // start at the low end of what fits (snapped to a step), not a hidden midpoint
  if(!A.mw||!ST.includes(A.mw)||A.mwSite!==BD.S.sel.id){ A.mw=snap(Math.max(0.1,f.mw[0])); A.mwSite=BD.S.sel.id; }
  const pos01=v=>{ v=Math.max(ST[0],Math.min(ST[ST.length-1],v)); let i=0; while(i<ST.length-2&&ST[i+1]<v) i++; return (i+Math.log(v/ST[i])/Math.log(ST[i+1]/ST[i]))/(ST.length-1)*100; };
  const cases=(R.cases[f.city]||[]);
  const near=v=>{ const c=cases.slice().sort((a,b)=>Math.abs(Math.log(a.mw/v))-Math.abs(Math.log(b.mw/v)))[0]; if(!c) return ''; const r=v/c.mw; return r>0.85&&r<1.18?`about the size of ${c.n} (${c.mw} MW)`:`${r.toFixed(r<10?1:0)} × ${c.n} (${c.mw} MW)`; };
  const over=v=>v>f.mw[1]?' — larger than this floor area holds even at the densest built layout':'';
  const mw=A.mw, fac=[mw*R.pue[0],mw*R.pue[1]], pl=plantPerMW(false), plR=plantPerMW(true);
  const fuel=[fac[0]*1000*R.fuelHours*R.fuelLkWh,fac[1]*1000*R.fuelHours*R.fuelLkWh];
  const pos=A.built==='existing'&&A.extent==='part'?A.floor:'';
  const fuelLim=pos==='ground'?R.fuelLimit.first:R.fuelLimit.low;
  let svc;
  if(f.city==='van') svc=fac[1]>13?'above 13 MVA: a two-feeder supply may be required in 25 kV areas; larger loads move toward transmission rules':fac[1]>6.5?'above 6.5 MVA: a two-feeder supply may be required in 12.5 kV areas':'within a single primary service';
  else svc=fac[1]*1000>2500?'above 2,500 kVA: primary service, with transformer clearances and a 4.6 m access road':'within a secondary or small primary service';
  let h=`<button class="x" id="back">← Site</button><div class="kind">What fits here</div><h2>${esc(f.city==='van'?BD.S.sel.a[0]:BD.S.sel.a[0])}</h2>
  <p class="draft">How much data centre this ${A.built==='new'?'lot':'building'} could hold, as ranges, before anyone decides what to do with its heat.</p>`;
  if(f.envAssumed&&A.built==='new') h+=`<p class="sub"><span class="pill ${f.status.k}">${esc(f.status.t)}</span> No data-centre envelope in zone ${esc(f.zone)}. <span class="draft">Shown as if rezoned to ${f.city==='van'?'I-2 (floor area 3.0 × lot, 18.3 m)':'IM (floor area 2.0 × lot, 18 m)'}, the nearest common data-centre zone — an assumption for comparison, not a prediction.</span></p>`;
  const st=f.floorsR?(f.floorsR[0]===f.floorsR[1]?f.floorsR[0]:f.floorsR[0]+'–'+f.floorsR[1]):f.floors;
  h+=`<h3>Floor area</h3><dl><dt>Available</dt><dd>${f.fullCover?'up to ':''}${rng(f.gross[0],f.gross[1],'m²')}${f.fullCover?` <span class="draft">— only if the building covers the whole lot; yards and setbacks not yet read for this zone</span>`:''}</dd><dt>How</dt><dd>${esc(f.how)}${f.plantFor&&A.built==='new'?` · cooling plant sized for ${n1(f.plantFor)} MW, the top of this range`:''}${f.heightCut?` <span class="draft">(${f.yardCut?'the yards and height limit':'the height limit'} hold less than this floor area, so the figure is cut to what fits)</span>`:''}</dd>
  ${f.fpNote?`<dt>Footprint</dt><dd>about ${fmt(f.fp)} m² <span class="sub">— ${esc(f.fpNote)}${f.fpCalc?`; lot treated as a ${fmt(f.fpCalc.w)} × ${fmt(f.fpCalc.d)} m rectangle`:''}</span></dd>`:''}
  ${f.ground?`<dt>Ground floor</dt><dd>${rng(f.ground[0],f.ground[1],'m²')} — this zone allows no data storage at grade</dd>`:''}
  ${f.floorsR&&A.built==='new'?`<dt>Storeys</dt><dd>about ${st} (6.0 m ground; 5.5–6.0 m for each data-hall floor, as built and proposed halls show; within ${f.envH} m)</dd>`:''}</dl>${src('env')}
  <h3>Room for servers</h3><dl>${f.hallL?`<dt>Data hall</dt><dd>${rng(f.hallS[0],f.hallS[1],'m²')} <span class="draft">if the ground floor holds none of the data centre</span></dd>
  <dt></dt><dd>${rng(f.hallL[0],f.hallL[1],'m²')} <span class="draft">if support rooms (electrical, generators, loading) may sit on the ground floor — for the City to confirm</span></dd>`:`<dt>Data hall</dt><dd>${rng(f.hall[0],f.hall[1],'m²')}</dd>`}
  <dt>Share of floor</dt><dd>48–72% (Burlington plan set; its own figures disagree)</dd></dl>${src('hall')}
  <h3>Largest data centre that fits</h3>${f.mw[1]<0.05?`<p style="font-size:16px;margin:4px 0"><span class="k">Nothing fits</span> <span class="sub">— after setbacks, loading and plant, no floor is left for servers (lot ${BD.fmt(f.lot||0)} m²)</span></p>`:`<p style="font-size:22px;font-weight:300;margin:4px 0">${rng(f.mw[0],f.mw[1],'MW')} <span class="sub">of servers</span></p>`}
  ${rangeBar([{lo:f.mwS[0],hi:f.mwS[1],lab:f.mwL?'strict':'range'}].concat(f.mwL?[{lo:f.mwL[0],hi:f.mwL[1],lab:'lenient'}]:[]).concat(f.mwCheck?[{lo:f.mwCheck[0],hi:f.mwCheck[1],lab:'real buildings',ghost:true}]:[]))}
  ${f.mwL?`<p class="sub">${rng(f.mwS[0],f.mwS[1],'MW')} on the strict reading; ${rng(f.mwL[0],f.mwL[1],'MW')} if support may sit on the ground floor.</p>`:''}
  <div class="q"><div class="lab">Hall layout</div><div class="seg" id="dens" role="group" aria-label="Hall layout"><button data-v="typical" aria-pressed="${f.density==='typical'}">Typical, air-cooled</button><button data-v="high" aria-pressed="${f.density==='high'}">High-density, liquid-cooled</button></div></div>
  <p class="sub">${f.density==='high'?`${fmt(f.m2MW[0])}–${fmt(f.m2MW[1])} m² of hall per MW: two AI-ready halls report about 250 (NEXTDC S3, QScale; operator claims), and the densest built Canadian hall is 290. <span class="draft">Dense racks usually need liquid cooling to the chip, which also changes the heat: it leaves warmer and more of it can be captured (see Heat).</span>`:`${fmt(f.m2MW[0])}–${fmt(f.m2MW[1])} m² of hall per MW, as five built Canadian halls report (operator claims, mostly 5–10 kW per rack). LBNL's models span 186–2,325.`}</p>
  ${f.gross[1]<3000?`<p class="sub draft">Small buildings can hold more than this range. With little room for anything else, most of the floor becomes hall: eStruxture VAN-1 puts about 75% of its 929 m² into hall and holds 2.4 MW (operator claim).</p>`:''}
  <p class="sub"><a href="#" id="toPrec">Compare with real buildings →</a> · <a href="#" id="toSens">What matters most →</a>${BD.dl?' · <a href="#" id="toRep">Download a site report</a>':''}</p>
  ${f.mwCheck?`<p class="sub">Check against whole buildings: the 11 benchmark buildings in the precedent catalogue (mostly approved or proposed, from planning filings and applicant figures; none recorded as built) use ${fmt(R.grossPerMW[0])}–${fmt(R.grossPerMW[1])} m² of building per MW of IT. This floor area at those rates gives ${rng(f.mwCheck[0],f.mwCheck[1],'MW')}.</p>`:''}${src('size')}${mathFits(f)}
  <div class="q"><div class="lab">Size to test: <b id="mwv">${mw}</b> MW of servers · <span id="mwn" class="sub">${esc(near(mw))}${over(mw)}</span></div>
   <div class="mwtrack"><div class="band" style="left:${pos01(f.mw[0])}%;width:${Math.max(1,pos01(f.mw[1])-pos01(f.mw[0]))}%" title="what fits here"></div>
   ${cases.map((c,i)=>`<div class="tick${i%2?' alt':''}" style="left:${pos01(c.mw)}%"><span>${esc(c.n)}</span></div>`).join('')}
   <input id="mw" type="range" min="0" max="${ST.length-1}" step="1" value="${ST.indexOf(mw)}" aria-label="Size to test, MW" aria-valuetext="${mw} MW"></div>
   <div class="mwscale">${[0.1,1,10,40].map(v=>`<span style="left:${pos01(v)}%">${v}${v===40?' MW':''}</span>`).join('')}</div>
   <div class="src">Bar under the track: what fits here. Ticks: built or proposed sites, operator or applicant figures. Steps widen as size grows.</div></div>
  <h3>What that size needs</h3><dl>
  <dt>Power at full load</dt><dd>${rng(fac[0],fac[1],'MW')} at the meter (servers × PUE 1.4–1.55); this sizes the grid connection and the cooling plant</dd><dt>Power on average</dt><dd>${rng(fac[0]*R.lf,fac[1]*R.lf,'MW')} (about ${Math.round(R.lf*100)}% of full load over a year); this sets the yearly energy</dd>
  <dt>Plant space</dt><dd>${rng(pl[0]*mw,pl[1]*mw,'m²')} with dry coolers; ${rng(plR[0]*mw,plR[1]*mw,'m²')} with heat recovery — equipment only, before clearances</dd>
  <dt>Standby fuel</dt><dd>${A.gens==='none'?'none: no generators chosen':`${rng(fuel[0],fuel[1],'L')} for 12 h; ${pos==='ground'?`a first-storey storage room may hold ${fmt(R.fuelLimit.first)} L`:pos?`a basement or upper-storey storage room may hold ${fmt(R.fuelLimit.low)} L (tanks of 2,500–20,000 L) or 45,000 L (tanks over 20,000 L)`:`a protected storage room may hold ${fmt(R.fuelLimit.first)} L on the first storey, or in a basement or upper storey ${fmt(R.fuelLimit.low)} L (tanks of 2,500–20,000 L) or 45,000 L (tanks over 20,000 L)`} (NFC 2020 Table 4.3.13.4.-B)${fuel[1]>(pos==='ground'||!pos?R.fuelLimit.first:45000)?' — <span class="draft">more than one room or an outdoor tank</span>':''}`}</dd>
  <dt>Electrical service</dt><dd>${esc(svc)}</dd>
  ${f.downtown?`<dt>Grid</dt><dd class="draft">Downtown: no new 12 kV feeder positions from fiscal 2027 until the West End substation (expected July 2032; BC Hydro's application is not yet decided); in between, BC Hydro connects new customers by temporary measures.</dd>`:''}
  ${pos==='upper'?`<dt>Floor strength</dt><dd class="draft">Office floors above grade are designed for 2.4 kPa; equipment rooms need at least 3.6 kPa, and data halls their actual load — likely strengthening.</dd>`:''}
  </dl>${src('pue')}${src('plant')}${src('fuel')}${src('svc')}${f.downtown?src('grid2'):''}${pos==='upper'?src('floor'):''}${mathNeeds(mw,fac,f)}
  <div class="next"><button id="toRecv">What it exchanges →</button><span class="sub">Heat, energy, water, materials and people, each in 3D.</span></div>
  <div class="draftnote">Every range carries the register's confidence; nothing here is a design.</div>`;
  $('#side').innerHTML=h;
  $('#back').onclick=()=>{ BD.S.view2=null; BD.scene3d&&BD.scene3d.hide(); BD.card(); BD.draw(); };
  $('#mw').oninput=e=>{ const v=ST[+e.target.value]; $('#mwv').textContent=v; $('#mwn').textContent=near(v)+over(v); e.target.setAttribute('aria-valuetext',v+' MW'); };
  $('#mw').onchange=e=>{ A.mw=ST[+e.target.value]; fitsView(); };
  $('#toRecv').onclick=()=>tabView('heat');
  $('#toPrec').onclick=e=>{ e.preventDefault(); tabView('prec'); };
  $('#toSens').onclick=e=>{ e.preventDefault(); BD.views.sens(); };
  const rp=$('#toRep'); if(rp) rp.onclick=e=>{ e.preventDefault(); BD.siteReport(); };
  document.querySelectorAll('#dens button').forEach(b=>b.onclick=()=>{ A.density=b.dataset.v; A.mw=null; fitsView(); });
  BD.draw(); if(BD.showModel&&!(BD.drawer&&BD.drawer.isOpen())) BD.showModel();
}

/* ---------- who could take the heat ---------- */
const TYPE={housing:'Non-market housing',school:'School',care:'Care home',hospital:'Hospital',rec:'Recreation centre',pool:'Pool',arena:'Indoor arena'};
const FIRM={completed:'existing','under construction':'committed',approved:'planned',proposed:'proposed'};
function nearby(f,d){ const out=[]; for(const p of d.pts){ const dist=Math.hypot(p.x-f.c[0],p.y-f.c[1]); const reach=R.reach[p.t]||R.reachGuide; if(dist<=reach) out.push(Object.assign({dist,reach,guide:!R.reach[p.t]},p)); } return out.sort((a,b)=>a.dist-b.dist); }
function netsAt(f,d){ return d.nets.map(n=>{ const inside=BD.pip(f.c[0],f.c[1],n.r); const e=distToRing(f.c[0],f.c[1],n.r); return Object.assign({inside,edge:e},n); }).filter(n=>n.inside||n.edge<1200).sort((a,b)=>(b.inside-a.inside)||(a.edge-b.edge)); } // inside first, then nearest (verification sweep M16)
async function recvView(){
  const f=siteFacts(); BD.S.view2='recv'; const d=await loadRecv(f.city); const near=nearby(f,d), nets=netsAt(f,d);
  const by={}; near.forEach(p=>(by[p.t]=by[p.t]||[]).push(p));
  let h=tabBar('heat')+`<h2>Who could take the heat</h2>
  <p class="draft">Candidates, not commitments: places whose type of demand could use low-grade heat, within the distance at which a pipe has paid back elsewhere. Each still has to pass its own tests.</p>`;
  if(nets.length) h+=nets.map(n=>`<h3>District energy</h3><p><b>${esc(n.n)}</b> — ${n.edge<50?`<span class="draft">on the edge of its service area (${n.src==='van9552'?'within the ±45 m of the tracing':'its boundary here is approximate'}) — check the schedule for this lot</span>`:n.inside?'<span class="draft">inside its service area</span>':`${kmOrM(n.edge)} outside its ${n.src==='van9552'?'':'approximate '}service area`}</p><p class="sub">${esc(n.note)}</p>${n.src==='van9552'?src('neu'):''}`).join('');
  if(f.city==='edm'){ const nb=String(((BD.S.sel||{}).a||[])[10]||''); h+=`<h3>District energy in Edmonton</h3><p class="sub">${/BLATCHFORD/.test(nb)?'<span class="draft">This lot is in the Blatchford neighbourhood.</span> ':''}Blatchford's district energy sharing system is compulsory inside its service area: owners must connect each building (Bylaw C17943 s. 6), unless the City Manager exempts a net-zero carbon building (s. 8). The service area exists only as a map (Schedule A), not yet traced in the tool. Downtown district energy phases are not yet traced either.</p><div class="src"><span class="evb ev-record">public record</span> City of Edmonton Bylaw C17943 (Blatchford District Energy Sharing System)</div>`; }
  if(f.downtown) h+=`<h3>Downtown steam</h3><p class="sub">Creative Energy's steam network serves more than 200 downtown buildings (BCUC G-310-21A). Its service area is not published as a map, so it is not drawn. Steam needs far hotter heat than a data centre gives off.</p>`;
  const order=['housing','school','care','hospital','pool','rec','arena'];
  h+=`<h3>Buildings within reach</h3>`;
  if(!near.length) h+=`<p class="sub">None of the recorded receiver types within reach.</p>`;
  for(const t of order){ const L=by[t]; if(!L) continue;
    h+=`<div style="margin-top:10px"><b>${esc(TYPE[t])}</b> <span class="sub">${L.length} within ${kmOrM(L[0].reach)}${L[0].guide?' (no published reach for this type — the housing figure is used as a guide)':''}${t==='arena'?' · an ice plant is also a heat source':''}</span>
    <ul style="margin:4px 0 0;padding-left:18px;font-size:13px">${L.slice(0,5).map(p=>`<li>${esc(p.n||'—')} <span class="sub">${kmOrM(p.dist)}${p.u?` · ${p.u} homes`:''}${p.s&&FIRM[p.s]?` · ${FIRM[p.s]}`:''}</span></li>`).join('')}${L.length>5?`<li class="sub">and ${L.length-5} more</li>`:''}</ul></div>`; }
  { const A=BD.S.answers, mw=A.mw||1, r=calc({mw,recover:true,to:'near'},f,near,nets), it=r.itMWh;
    h+=`<h3>Heat this size could offer</h3><p class="sub">${mw} MW of servers, liquid-cooled with a heat pump (option B on the Options tab).</p>
    <dl><dt>Heat after the heat pump</dt><dd>${rng(r.avail[0]/1000,r.avail[1]/1000,'GWh/yr')}</dd><dt>Equal to the heating of</dt><dd>${rng(r.homes[0],r.homes[1],'homes')} (space and hot water, provincial average; available, not heated)</dd>
    <dt>Heat-pump electricity</dt><dd>${rng(r.hp[0]/1000,r.hp[1]/1000,'GWh/yr')} → ${rng(r.co2[0],r.co2[1],'t CO₂e/yr')}</dd></dl>${src('lf')}${src('cap')}${src('cop')}${src('homes')}${src('grid')}
    ${mathBox([
      `Server electricity in a year: ${mw} MW × 8,760 h × ${R.lf} average load = <b>${n0(it)} MWh</b>.`,
      `Heat captured into liquid: ${n0(it)} × ${R.capture[0]} = ${n0(it*R.capture[0])} MWh, up to × ${R.capture[1]} = <b>${n0(it*R.capture[1])} MWh</b>.`,
      `A heat pump adds its own electricity as heat: heat out = captured × COP ÷ (COP − 1). With COP ${R.cop[1]}: × ${(R.cop[1]/(R.cop[1]-1)).toFixed(3)}; with COP ${R.cop[0]}: × ${(R.cop[0]/(R.cop[0]-1)).toFixed(3)}. Low end ${n0(it*R.capture[0])} × ${(R.cop[1]/(R.cop[1]-1)).toFixed(3)} = ${n0(r.avail[0])} MWh; high end ${n0(it*R.capture[1])} × ${(R.cop[0]/(R.cop[0]-1)).toFixed(3)} = <b>${n0(r.avail[1])} MWh</b>.`,
      `Heat-pump electricity = heat out ÷ COP: ${n0(r.avail[0])} ÷ ${R.cop[1]} = ${n0(r.hp[0])} MWh; ${n0(r.avail[1])} ÷ ${R.cop[0]} = <b>${n0(r.hp[1])} MWh</b>.`,
      `Homes: heat ÷ ${R.homeMWh[f.city]} MWh per home a year = ${n1(r.homes[0])}–<b>${n1(r.homes[1])}</b>.`,
      `Carbon: heat-pump electricity × ${R.grid[f.city]} g/kWh = ${n1(r.co2[0])}–<b>${n1(r.co2[1])} t CO₂e</b>.`],
      'Load factor: Fan et al. 2007. Capture: LBNL 2014, NREL (direct-to-chip). COP: DEA 2026 waste-heat heat pumps to 70 °C (3.0–3.6) and observed at Meta Odense (4.5, 2020). Homes: NRCan CEUD 2023. Grid: NIR 2026.')}`; }
  { const EC=BD.ECON; if(EC){ const v=EC.heatVal(f.city), pe=EC.elec[f.city], nb=v-pe/R.cop[1], nw=v-pe/R.cop[0];
    h+=`<p class="sub"><span class="draft">${esc(`The search circles are Dutch payback distances (RVO 2018: five years at Dutch prices), used only to say where to look. `+(nb<=0?`At ${f.city==='edm'?'Alberta':'BC'} prices the heat pump's electricity costs more than the gas the heat would replace ($${nw.toFixed(1)} to $${nb.toFixed(1)} per MWh), so no route pays back at any distance; each card shows what would have to change.`:`At ${f.city==='van'?'BC':'Alberta'} prices the heat is worth $${nw.toFixed(1)}–${nb.toFixed(1)} per MWh after the heat pump; each receiver's own break-even distance is on its card.`))}</span></p>`; } }
  h+=`${src('reach')}${src('recv')}<p class="sub" style="margin-top:10px">${f.city==='van'?'Vancouver pools and rinks are not separate records in the national database; recreation centres may contain them. Private housing and offices are not mapped yet.':'Edmonton care homes and most hospitals have no location in the national record; private housing and offices are not mapped yet.'}</p>
  `;
  $('#side').innerHTML=h; wireTabs(); BD.draw();
  const A=BD.S.answers; show3d('heat',{site:f,near,nets,plantRecover:plantPerMW(true)[1]*(A.mw||1)});
}

/* ---------- round 3: three options, trade-off tables by party ---------- */
function optionSet(f,near,nets){
  const top=f.mw[1], A=BD.S.answers, chosen=A.mw||top/2;
  const net=nets.find(n=>n.inside&&n.edge>=50&&n.src==='van9552');
  const sizes=[Math.max(0.1,+(chosen/2).toFixed(1)),+chosen.toFixed(1),+Math.max(chosen,top).toFixed(1)];
  return [
   {id:'a',name:'Smaller, air-cooled',gives:'least plant and grid; heat goes to the air',mw:sizes[0],recover:false},
   {id:'b',name:'Chosen size, heat to neighbours',gives:'liquid-cooled servers and a heat pump; heat offered to buildings within reach',mw:sizes[1],recover:true,to:'near'},
   {id:'c',name:'Largest that fits, '+(net?'heat to the network':'heat to neighbours'),gives:net?'the most heat, sent to '+net.n:'the most heat, more than nearby buildings may take',mw:sizes[2],recover:true,to:net?'net':'near'},
  ];
}
function calc(o,f,near,nets){
  const r={}; const fac=[o.mw*R.pue[0],o.mw*R.pue[1]];
  r.fac=fac; r.itMWh=o.mw*8760*R.lf; r.facMWh=[fac[0]*8760*R.lf,fac[1]*8760*R.lf];
  r.plant=plantPerMW(o.recover).map(v=>v*o.mw);
  if(o.recover){ const cap=[r.itMWh*R.capture[0],r.itMWh*R.capture[1]];
    r.avail=[cap[0]*R.cop[1]/(R.cop[1]-1),cap[1]*R.cop[0]/(R.cop[0]-1)];
    r.hp=[r.avail[0]/R.cop[1],r.avail[1]/R.cop[0]];
    r.homes=r.avail.map(v=>v/R.homeMWh[f.city]); r.co2=r.hp.map(v=>v*R.grid[f.city]/1000);
    const net=nets.find(n=>n.inside&&n.edge>=50&&n.src==='van9552'); if(o.to==='net'&&net) r.credit=r.avail.map(v=>v*R.neuCredit);
  }
  r.fuel=[fac[0]*1000*R.fuelHours*R.fuelLkWh,fac[1]*1000*R.fuelHours*R.fuelLkWh];
  r.jobs=[Math.max(1,o.mw*f.m2MW[0]/R.hallShare[1]/R.jobsM2),Math.max(1,o.mw*f.m2MW[1]/R.hallShare[0]/R.jobsM2)];
  return r;
}
function noiseRow(f){
  if(f.city==='edm') return ['Night limit at the property line','50 dBA next to homes, 60 dBA next to other uses (Bylaw 14600)','noise'];
  const z=f.zone, act=/^(MC-1|MC-2|DD|M-1|M-1A|M-1B|M-2|IC-1|IC-2|IC-3|I-1|I-1A|I-1B|I-1C|I-2|I-3|I-4|CWD|DEOD)$/.test(z), mid=/^(C-|FC-|FCCDD|BCPED|HA-|R3-|R4-|R5-|RR-3)/.test(z);
  const t=act?'activity zone: 55 dBA at night at a quiet-zone home, 65 at a mixed or industrial neighbour':mid?'intermediate zone: 50 dBA at night at a quiet-zone home, 65 at a mixed or industrial neighbour':'quiet zone (or not listed): 45 dBA at night at a quiet-zone home, 55 elsewhere';
  return ['Night limit at the neighbour',t,'noise'];
}
function state(k){ return `<span class="st st-${k}" title="${esc({met:'met',chg:'met with a change',not:'not met',cj:'not yet known'}[k])}"></span>`; }
async function optionsView(){
  const f=siteFacts(); BD.S.view2='opts'; const d=await loadRecv(f.city); const near=nearby(f,d), nets=netsAt(f,d);
  const opts=optionSet(f,near,nets).map(o=>Object.assign(o,{r:calc(o,f,near,nets)}));
  const zs=f.status.k, zState=zs==='yes'?'met':zs==='case'?'chg':zs==='site'?'cj':'chg';
  const net=nets.find(n=>n.inside);
  const rows=[
   ['The operator',[
     ['Servers',o=>o.mw.toFixed(1)+' MW'],
     ['Plant space',o=>rng(o.r.plant[0],o.r.plant[1],'m²')+' (equipment only)'],
     ['Standby fuel, 12 h',o=>BD.S.answers.gens==='none'?'none (no generators chosen)':rng(o.r.fuel[0],o.r.fuel[1],'L')],
     ['Zoning path',()=>`${state(zState)}${esc(f.status.t)}${zs==='no'?(f.city==='van'?' — about 15 months to a Vancouver decision':' — the City targets 160 calendar days for a complex rezoning (about 5.5 months, after a pre-application meeting), then a Council public hearing'):''}`]]],
   ['The utility and the grid',[
     ['Power at full load',o=>rng(o.r.fac[0],o.r.fac[1],'MW')],['Power on average',o=>rng(o.r.fac[0]*R.lf,o.r.fac[1]*R.lf,'MW')],
     ['Electricity a year',o=>rng(o.r.facMWh[0]/1000,o.r.facMWh[1]/1000,'GWh')],
     ['Grid connection',()=>f.downtown?`${state('chg')}downtown: no new 12 kV feeder positions from fiscal 2027 until the West End substation (expected July 2032; BC Hydro's application is not yet decided); in between, BC Hydro connects new customers by temporary measures`:`${state('cj')}needs the utility's answer to a load application`]]],
   ['Receivers',[
     ['Heat offered after the heat pump',o=>o.recover?rng(o.r.avail[0]/1000,o.r.avail[1]/1000,'GWh/yr'):`${state('not')}none — air-cooled heat at 25–35 °C goes to the air`],
     ['Equal to the heating of',o=>o.recover?rng(o.r.homes[0],o.r.homes[1],'homes')+' (space and hot water, provincial average)':'—'],
     ['Within reach',o=>o.to==='net'&&net?`${state(net.edge<50?'cj':'chg')}${esc(net.n)} — ${net.edge<50?'on the edge of the service area':'compulsory connection; heat sent back is credited'}`:o.recover?`${state('cj')}${near.length} within straight-line reach (Dutch five-year payback distances, used only to say where to look); the Heat step tests break-even at BC or Alberta prices`:'—'],
     ['How much they would take',o=>o.recover?`${state('cj')}needs each receiver's monthly demand — a year of heat is mostly needed in winter (about ${f.city==='van'?'3.9':'3.3'} : 1 between the busiest and quietest month)`:'—'],
     ['Other source already serving',()=>net&&net.src==='van9552'?`${state('chg')}the NEU runs mostly on sewage heat`:net?`${state('cj')}${esc(net.n.replace(/ \(.*/,''))}: its heat source is not stated in the tool`:`${state('cj')}not known for these buildings`],
     ['Price for the heat',o=>o.r.credit?`$${fmt(o.r.credit[0])}–$${fmt(o.r.credit[1])} a year at the NEU's credit ($32.59/MWh), if the NEU took all the heat offered (what it takes depends on its demand)`:o.recover?`${state('cj')}${f.city==='van'?'no published price outside the NEU':'no published price; Edmonton\'s district energy prices at the gas-equivalent cost plus avoided boiler costs'}`:'—']]],
   ['The climate',[
     ['Heat-pump electricity',o=>o.recover?rng(o.r.hp[0]/1000,o.r.hp[1]/1000,'GWh/yr')+' → '+rng(o.r.co2[0],o.r.co2[1],'t CO₂e/yr'):'—'],
     ['Against what it replaces',o=>o.recover?`${state('cj')}depends on how the receivers heat now (gas, electric, district)`:'—']]],
   ['Neighbours',[[noiseRow(f)[0],()=>noiseRow(f)[1]],['Generator testing',()=>f.city==='van'?'exempt if ≤ 1 h a month in daytime, ≤ 80 dBA':'—']]],
   ['Workers',[['Operating jobs',o=>rng(o.r.jobs[0],o.r.jobs[1],'')+' (Virginia ratio, transferred)']]],
  ];
  const fut=o=>[['As planned','the table above'],['Tenant changes cooling',o.recover?'back to air: heat offered drops to none':'to liquid: heat could be offered'],['Tenant leaves',o.recover?'receivers fall back on their own heating at full peak':'nothing depends on it'],['Receiver leaves',o.recover?'all heat goes back to the dry coolers — keep their full size':'—']].map(([a,b])=>`<div><b>${a}</b> <span class="sub">${b}</span></div>`).join('');
  let h=tabBar('opts')+`<h2>Three options, side by side, in no order</h2>
  <p class="draft">Each option gains and gives up something. <span class="k">Nothing is added up; nothing wins.</span></p>
  <div class="opts">${opts.map(o=>`<div class="opt"><div class="kind">${o.id.toUpperCase()}</div><b>${esc(o.name)}</b><div class="sub">${esc(o.gives)}</div></div>`).join('')}</div>
  <div class="tt"><table><thead><tr><th></th>${opts.map(o=>`<th>${o.id.toUpperCase()}</th>`).join('')}</tr></thead><tbody>`;
  for(const [party,rr] of rows){ h+=`<tr class="party"><td colspan="${opts.length+1}">${esc(party)}</td></tr>`;
    for(const [lab,fn] of rr){ const c=opts.map(o=>fn(o)); h+=c.every(x=>x===c[0])?`<tr><td>${esc(lab)}</td><td colspan="${opts.length}">${c[0]}</td></tr>`:`<tr><td>${esc(lab)}</td>${c.map(x=>`<td>${x}</td>`).join('')}</tr>`; } }
  h+=`</tbody></table></div>
  <h3>Four futures</h3><div class="opts">${opts.map(o=>`<div class="opt"><div class="kind">${o.id.toUpperCase()}</div>${fut(o)}</div>`).join('')}</div>
  <div class="legend2">${state('met')}met ${state('chg')}met with a change ${state('not')}not met ${state('cj')}not yet known</div>
  ${src('pue')}${src('lf')}${src('cap')}${src('cop')}${src('homes')}${src('grid')}${net?src('neu'):''}${src('noise')}${src('jobs')}
  <div class="draftnote">Ranges carry the register's confidence; "not yet known" names what is missing.</div>`;
  $('#side').innerHTML=h; document.body.classList.add('wide'); wireTabs(); BD.draw();
  if(BD.scene3d) BD.scene3d.showOptions(opts.map(o=>({id:o.id,mw:o.mw,name:o.name,recover:o.recover,to:o.to,n:o.id==='c'?14:6,plant:plantPerMW(o.recover)[1]*o.mw,
    caption:o.mw.toFixed(1)+' MW · '+(o.recover?rng(o.r.avail[0]/1000,o.r.avail[1]/1000,'GWh heat offered'):'heat to the air')})),{site:f,near,net:nets.find(n=>n.inside)}).catch(e=>console.warn(e));
}

/* ---------- map layer: receivers, reach, networks ---------- */
const RC={housing:'#c8c2b8',school:'#a7b4d6',care:'#b9a3cf',hospital:'#b9a3cf',rec:'#7fb2c4',pool:'#7fb2c4',arena:'#9fb38a'};
BD.paintRecv=function(ctx,s,lw){
  const d=BD.recv[BD.S.city]; if(!d) return;
  for(const n of d.nets){ ctx.setLineDash([8/s,5/s]); ctx.strokeStyle='rgba(209,163,94,.85)'; ctx.lineWidth=lw(1.6); ctx.stroke(n.path); ctx.setLineDash([]); ctx.fillStyle='rgba(209,163,94,.06)'; ctx.fill(n.path); }
  if(s<0.35) return;
  const r=lw(4.5);
  for(const p of d.pts){ ctx.fillStyle=RC[p.t]||'#9d9a94'; ctx.globalAlpha=.9; ctx.beginPath();
    if(p.t==='housing') ctx.rect(p.x-r*.8,p.y-r*.8,r*1.6,r*1.6); else if(p.t==='school') { ctx.moveTo(p.x,p.y+r); ctx.lineTo(p.x+r,p.y-r*.8); ctx.lineTo(p.x-r,p.y-r*.8); ctx.closePath(); } else ctx.arc(p.x,p.y,r,0,7);
    ctx.fill(); ctx.globalAlpha=1; }
  const sel=BD.S.sel; if(sel&&BD.S.view2&&BD.S.view2!=='fits'){ const c=sel.ring?BD.centroid(sel.ring):sel.pt;
    ctx.setLineDash([4/s,4/s]); ctx.lineWidth=lw(1);
    for(const [rad,col] of [[1000,'rgba(127,178,196,.6)'],[1200,'rgba(200,194,184,.6)'],[1500,'rgba(159,179,138,.6)']]){ ctx.strokeStyle=col; ctx.beginPath(); ctx.arc(c[0],c[1],rad,0,7); ctx.stroke(); }
    ctx.setLineDash([]); }
};
BD.legendRecv=function(){ return `<div style="margin-top:6px"><i style="border:1px dashed #d1a35e"></i>District energy service area (NEU traced from its by-law; others approximate)</div>
 <div><i style="background:#c8c2b8;width:8px;height:8px"></i>Non-market housing <i style="background:#a7b4d6;width:8px;height:8px;margin-left:6px"></i>School</div>
 <div><i style="background:#b9a3cf;width:8px;height:8px;border-radius:50%"></i>Care, hospital <i style="background:#7fb2c4;width:8px;height:8px;border-radius:50%;margin-left:6px"></i>Recreation, pool <i style="background:#9fb38a;width:8px;height:8px;border-radius:50%;margin-left:6px"></i>Arena</div>`; };

/* ---------- the exchange tabs (J.B., 15 Oct): heat · energy · water · materials · social · options; each with a 3D view ---------- */
const TABS=[['prec','Precedents'],['heat','Heat'],['energy','Energy'],['water','Water'],['materials','Materials'],['social','People'],['opps2','Opportunities'],['opts','Options'],['time','Over time'],['cities','Two cities']];
/* the path through the tool (J.B., 16 Oct: "make the path through the tool clear"): five steps, sub-views only inside a step; context at the end */
const STEPS=[['site','Site'],['fits','What fits'],['ex','Exchanges',[['heat','Heat'],['energy','Electricity'],['water','Water'],['materials','Materials'],['social','People']]],
  ['become','Could become',[['opps2','Opportunities'],['opts','Three options'],['time','Over time']]],['report','Report']];
const CONTEXT=[['prec','Real buildings'],['cities','Two cities']];
function stepOf(k){ for(const s of STEPS) if(s[2]&&s[2].some(t=>t[0]===k)) return s[0]; return k==='report'?'report':null; }
function stepNav(cur){ const st=stepOf(cur)||cur; return `<nav class="path" aria-label="Steps">${STEPS.map(([k,l],i)=>`<button data-step="${k}" ${k===st?'aria-current="step"':''}><span>${i+1}</span>${l}</button>`).join('')}</nav>`; }
function tabBar(cur){ BD.S.tab=cur; if(BD.flow&&BD.flow.on) return BD.tabExtra?BD.tabExtra(cur):''; const st=stepOf(cur), S=STEPS.find(s=>s[0]===st);
  return stepNav(cur)+(S&&S[2]?`<div class="tabs" role="tablist">${S[2].map(([k,l])=>`<button role="tab" data-tab="${k}" aria-selected="${k===cur}">${l}</button>`).join('')}</div>`:'')
   +(CONTEXT.some(c=>c[0]===cur)?`<div class="tabs" role="tablist">${CONTEXT.map(([k,l])=>`<button role="tab" data-tab="${k}" aria-selected="${k===cur}">${l}</button>`).join('')}</div>`:'')
   +`<p class="ctx">${BD.S.answers.mw?BD.S.answers.mw+' MW of servers · ':''}<a href="#" data-tab="prec">Real buildings</a> · <a href="#" data-tab="cities">Two cities</a></p>`+(BD.tabExtra?BD.tabExtra(cur):''); }
/* a section that starts closed but shows its answer (J.B., 16 Oct: "tabs that open (but present closed)"); the open state is kept for the session */
BD.openSecs=BD.openSecs||new Set();
function sec(id,title,answer,body,o){ o=o||{}; const open=BD.openSecs.has(id)||o.open;
  return `<details class="sec" data-sec="${id}" ${open?'open':''}><summary><span class="t">${title}</span>${answer?`<span class="a${o.finding?' f':''}">${answer}</span>`:''}</summary><div class="b">${body}</div></details>`; }
function wireSecs(root){ (root||document).querySelectorAll('details.sec').forEach(d=>d.addEventListener('toggle',()=>{ if(d.open) BD.openSecs.add(d.dataset.sec); else BD.openSecs.delete(d.dataset.sec); })); }
function goStep(k){ const S=STEPS.find(s=>s[0]===k); document.body.classList.remove('wide');
  if(k==='site'){ BD.S.view2=null; BD.scene3d&&BD.scene3d.hide(); BD.card(); BD.draw(); return; }
  if(k==='fits'){ BD.scene3d&&BD.scene3d.hide(); fitsView(); return; }
  if(k==='report'){ return (BD.views&&BD.views.report)?BD.views.report():tabView('heat'); }
  if(S&&S[2]) tabView(S[2][0][0]); }
/* every other view: turn each h3 and what follows it into a closed section showing its answer (J.B., 16 Oct: the toolbar and sections on every view) */
function nameOf(row){ const d=row.querySelector('div')||row; for(const c of d.childNodes){ if(c.nodeType===3&&c.textContent.trim()) return c.textContent.trim(); } const t=(d.innerText||'').split('\n')[0]; return t.replace(/\s*(Explore|Add|Open)\s*›.*$/,'').trim(); }
function answerOf(nodes){ const tx=el=>{ const c=el.cloneNode(true); c.querySelectorAll&&c.querySelectorAll('td,th,small,li,dd,dt,.cls,.pill,.evb,.rd').forEach(x=>x.append(' ')); c.querySelectorAll('button,.btn').forEach(x=>x.remove()); return (c.innerText||c.textContent||'').replace(/\s*(Explore|Add|Remove|Open)\s*›/g,'').replace(/physics · land · rules · demand · time · money/g,'').replace(/\s+/g,' ').trim(); };
  const rows=[]; nodes.forEach(n=>{ if(n.nodeType!==1) return; if(n.matches('.addrow')) rows.push(n); n.querySelectorAll&&n.querySelectorAll('.addrow').forEach(r=>rows.push(r)); });
  if(rows.length>1){ const names=rows.map(nameOf).filter(Boolean); const t=names.join('; '); return [`${names.length}: `+(t.length>120?t.slice(0,t.lastIndexOf(';',120)>0?t.lastIndexOf(';',120):120)+'…':t),false]; }
  const cut=t=>{ t=t.replace(/\s*Draft wording \(Claude\)[^.]*\.?/g,'').trim(); if(t.length<=130) return t; const i=t.slice(0,130).lastIndexOf(' '); return t.slice(0,i>60?i:130)+'…'; };
  let red=false;
  // a gate or rule table reads as counts or as "row: verdict" pairs, not as its cells run together
  for(const n of nodes){ if(n.nodeType!==1||!n.matches('table.cl')) continue; const trs=[...n.querySelectorAll('tr')];
    if(trs.length&&trs.every(r=>r.querySelectorAll('.cls').length===1)){ const ct={}; trs.forEach(r=>{ const k=r.querySelector('.cls').textContent.trim(); ct[k]=(ct[k]||0)+1; }); return [cut(Object.entries(ct).map(([k,v])=>`${v} ${k}`).join(', ')),false]; }
    const c=n.cloneNode(true); c.querySelectorAll('small').forEach(x=>x.remove()); c.querySelectorAll('.cls,.pill').forEach(x=>x.append(',')); return [cut([...c.querySelectorAll('tr')].map(r=>{ const td=r.querySelectorAll('td'); return td.length>1?td[0].textContent.trim()+': '+tx(td[1]).replace(/,\s*$/,''):tx(r); }).join('; ')),false]; }
  for(const n of nodes){ if(n.nodeType!==1) continue;
    const fig=n.matches('.hfig')?n:n.querySelector&&n.querySelector('.hfig'); if(fig){ const d=fig.querySelector('div'); if(d){ const b=d.querySelector('b'), sp=d.querySelector('span'); return [cut((b?tx(b):'')+' '+(sp?tx(sp):'')),false]; } }
    const dt=n.matches('dl')?n:n.querySelector&&n.querySelector('dl'); if(dt){ const a=dt.querySelector('dt'), b=dt.querySelector('dd'); if(a&&b){ red=!!b.querySelector('.draft'); return [cut(tx(a)+': '+tx(b)),red]; } }
    if(n.matches('p,.sub,table,.addrow,.opt,.row,ul')){ const t=tx(n); if(t&&!/^Sources?:/i.test(t)){ red=n.matches('.draft')||!!(n.querySelector&&n.querySelector('.draft')); return [cut(t),red]; } } }
  return ['',false]; }
// plain-language section names (J.B., 17 Oct). Draft wording (Claude), for J.B. to rewrite.
const TITLES={'Compared with other data centres':'How it compares','Connections':'What could connect','Add-ons':'What could be added','At this site, gate by gate':'Does it work here?','Rules, rung by rung':'What the rules say','How proven':'Where it has been done','The edge':'The street edge','Who is near':'Who is nearby'}; BD.TITLES=TITLES;
function collapseSections(root){ if(!root||root.querySelector('details.sec')) return; const kids=[...root.children]; let i=0;
  const h2=kids.findIndex(k=>k.tagName==='H2'); if(h2>=0){ const nx=kids[h2+1]; if(nx&&nx.tagName==='P'&&nx.classList.contains('draft')){ nx.classList.remove('draft'); nx.classList.add('lead'); } }
  const view=(BD.S.tab||BD.S.view2||'v'); let n=0;
  for(i=0;i<kids.length;i++){ const h=kids[i]; if(h.tagName!=='H3'||h.closest('details')||/^sources?$/i.test(h.textContent.trim())) continue;
    const body=[]; let j=i+1; while(j<kids.length&&kids[j].tagName!=='H3'&&!kids[j].classList.contains('draftnote')&&!(kids[j].tagName==='DIV'&&kids[j].classList.contains('navb'))&&!kids[j].classList.contains('flowfoot')) { body.push(kids[j]); j++; }
    const title=(h.childNodes[0]&&h.childNodes[0].nodeType===3?h.childNodes[0].textContent:h.innerText).trim(); if(!title){ continue; } let t2=title.charAt(0).toUpperCase()+title.slice(1).toLowerCase(); t2=TITLES[t2]||t2;
    const extra=[...h.querySelectorAll('span')].map(s=>s.innerText.trim()).filter(Boolean).join(' ');
    let [ans,red]=answerOf(body); if(extra) ans=extra.replace(/^·\s*/,'')+(ans?' — '+ans:'');
    const id=view+'-'+(n++)+'-'+t2.slice(0,20);
    const d=document.createElement('details'); d.className='sec'; d.dataset.sec=id; if(BD.openSecs.has(id)) d.open=true;
    d.innerHTML=`<summary><span class="t">${esc(t2)}</span>${ans?`<span class="a${red?' f':''}">${esc(ans)}</span>`:''}</summary><div class="b"></div>`;
    const b=d.querySelector('.b'); h.replaceWith(d); body.forEach(x=>b.appendChild(x)); i=j-1; }
  root.querySelectorAll('.draftnote').forEach(x=>{ x.textContent=x.textContent.replace(/Draft wording(?: and [a-z ]+)? \(Claude\)[^.]*\.\s*/,'').trim(); if(!x.textContent) x.remove(); });
  wireSecs(root); }
BD.collapseSections=collapseSections;
/* fine print behind a button, across the whole tool (J.B., 16 Oct: "a source button that opens the fine print") */
function finePrint(c){ if(!c) return; const L=[];
  c.querySelectorAll(':scope > .src, :scope > p.src, :scope > .cmp > p.src, :scope > div > p.src').forEach(e=>{ if(!e.closest('details.fp')&&!e.closest('td,tr,summary')) L.push(e); });
  [...c.querySelectorAll(':scope > h3')].filter(h=>/^sources?$/i.test(h.textContent.trim())).forEach(h=>{ let n=h.nextElementSibling; h.remove(); while(n&&n.tagName!=='H3'&&!n.classList.contains('draftnote')&&!n.classList.contains('navb')&&!n.classList.contains('flowfoot')&&!n.classList.contains('flowbar')){ const nx=n.nextElementSibling; L.push(n); n=nx; } });
  if(!L.length) return; const d=document.createElement('details'); d.className='fp'; d.innerHTML=`<summary>Sources${L.length>1?' ('+L.length+')':''}</summary><div></div>`; const b=d.lastChild; L.forEach(e=>b.appendChild(e)); c.appendChild(d); }
function finePrintAll(root){ if(!root) return; root.querySelectorAll('details.sec > .b').forEach(finePrint); finePrint(root); trimLong(root); }
/* long paragraphs (J.B., 16 Oct: "nobody wants to read them"): show the first sentence; the rest behind "more" */
function trimLong(root){ root.querySelectorAll('p,li,dd').forEach(el=>{
  if(el.dataset.tl||el.closest('details.fp,summary,.math,dl.lim,.lead,.dk')||el.querySelector('button,input,select,p,li')) return; el.dataset.tl=1;
  if(el.textContent.trim().split(/\s+/).length<=24) return;
  // candidate cut points in top-level text: sentence end first, then a dash, colon or bracket, then a middle dot or comma
  let host=el; while(host.firstElementChild&&host.firstElementChild.tagName==='SPAN'&&host.firstElementChild.textContent.length>0.8*host.textContent.length) host=host.firstElementChild;
  const C=[]; let seen=0; const wc=t=>t.trim().split(/\s+/).filter(Boolean).length;
  for(const nd of [...host.childNodes]){ const t=nd.textContent||'';
    if(nd.nodeType===3){ const re=/([.;])(?=\s+\S)|(\s[—–:](?=\s))|(\s\()|(\s·)|(,)(?=\s)/g; let m; while((m=re.exec(t))){ const w=seen+wc(t.slice(0,m.index)); const r=m[1]?0:m[2]?1:m[3]?1:m[4]?2:3; const at=m[1]?m.index+1:m[3]||m[4]?m.index:m[2]?m.index:m.index+1; C.push({nd,at,w,r}); } }
    seen+=wc(t); }
  let cut=null; for(const [r,lo,hi] of [[0,5,30],[1,8,26],[2,8,26],[3,10,24]]){ const c=C.find(c=>c.r===r&&c.w>=lo&&c.w<=hi); if(c){ cut=[c.nd,c.at]; break; } }
  if(!cut) return; const [nd,i]=cut; const rest=nd.splitText(i); const sp=document.createElement('span'); sp.className='more'; sp.hidden=true;
  let x=rest; while(x){ const nx=x.nextSibling; sp.appendChild(x); x=nx; } host.appendChild(sp);
  const b=document.createElement('button'); b.type='button'; b.className='mo'; b.textContent='more'; b.onclick=ev=>{ ev.stopPropagation(); sp.hidden=!sp.hidden; b.textContent=sp.hidden?'more':'less'; };
  el.append(' ',b); }); }
BD.finePrintAll=finePrintAll;
(function watchDrawer(){ const dr=document.getElementById('drawer'); if(!dr) return setTimeout(watchDrawer,300); let busy=false;
  new MutationObserver(()=>{ if(busy) return; busy=true; try{ const inner=dr.querySelector('.dc')||dr; finePrintAll(inner); } finally{ busy=false; } }).observe(dr,{childList:true,subtree:false}); })();
BD.stepNav=stepNav; BD.goStep=goStep; BD.sec=sec; BD.wireSecs=wireSecs;
// the path on every site view: the site card and What fits get the same bar (clicks handled once, by delegation)
document.addEventListener('click',ev=>{ const b=ev.target.closest&&ev.target.closest('#side .path button'); if(!b) return; ev.preventDefault(); goStep(b.dataset.step); });
(function watchSide(){ const side=document.getElementById('side'); if(!side){ return setTimeout(watchSide,200); }
  new MutationObserver(()=>{ if(!BD.S||!BD.S.sel||side.querySelector('.path')) return; const st=BD.S.view2==='fits'?'fits':BD.S.view2?null:'site'; if(st){ if(!(BD.flow&&BD.flow.on)) side.insertAdjacentHTML('afterbegin',stepNav(st)); collapseSections(side); finePrintAll(side); } }).observe(side,{childList:true}); })();
function wireTabs(){ const sd=document.getElementById('side'); if(sd&&BD.S.tab!=='heat') collapseSections(sd); setTimeout(()=>finePrintAll(sd),0); document.querySelectorAll('#side .tabs button, #side .ctx a[data-tab]').forEach(b=>b.onclick=ev=>{ ev.preventDefault(); tabView(b.dataset.tab); }); wireSecs(document.getElementById('side')); if(BD.tabExtraWire) BD.tabExtraWire(); const bk=$('#back'); if(bk) bk.onclick=()=>{ document.body.classList.remove('wide'); BD.scene3d&&BD.scene3d.hide(); fitsView(); }; }
function tabView(k){ document.body.classList.remove('wide'); BD.S.view2='tab'; if(BD.drawer&&BD.drawer.isOpen()) BD.drawer.close(); if(BD.tabOverride&&BD.tabOverride[k]) return BD.tabOverride[k](); ({heat:recvView,energy:energyView,water:waterView,materials:materialsView,social:socialView,opts:optionsView,prec:precView}[k]||(BD.views&&BD.views[k]))(); }
function show3d(tab,data){ if(!BD.scene3d) return; BD.scene3d.show(tab,data).catch(e=>{ const n=document.getElementById('st'); if(n) n.textContent='3D view could not load: '+e.message; }); }
function roofArea(f){ const A=BD.S.answers; if(A.built==='new'&&BD.S.sel.ring) return BD.area(BD.S.sel.ring)*0.86*0.86; return f.plate||f.foot||0; }
const SRC3={
 elec:'register: electricity_price (BC Hydro large general service rates from 1 Apr 2026; AESO pool 2025)', pv:'register: pv_roof (NRCan municipal PV potential values, kWh per kWp, horizontal to latitude tilt; NREL module density and roof suitability)',
 batt:'register: battery (NREL ATB 2024; Reber 2023 34 ± 15 kWh/m²)', ups:'register: ups_flex (vendor runtimes — operator claims)', dr:'register: peak_relief (BC Hydro Demand Response for Business; AESO reserves)',
 ev:'register: ev_stalls, ev_area (charger ratings; Vancouver and Edmonton parking dimensions)', gen:'register: genset_test (AUC 27938-D01-2023, derived; AP-42 Table 3.4-1 upper bounds)', ctl:'register: workload_control (Crozier & Liska 2025)',
 evap:'register: evaporation, blowdown (physics: heat ÷ latent heat; cycles of concentration 2–6, FEMP/EPA)', wbe:'register: water_behind_electricity (US thermoelectric ~1.25 L/kWh; hydro ~16.8 L/kWh)', rain:'register: rainwater (ECCC Normals 1991–2020; runoff coefficient 0.8 and a one-wet-month tank assumed; CSA B805 not read)',
 reuse:'register: a_reuse_rules, reclaimed_makeup (VBBL 2025; Metro Vancouver UT-019; EPCOR)', wprice:'register: water_supply (City of Vancouver 2026 rates)', sewer:'register: sewer_sink (Bylaw 299 limits; KWL 2014)',
 srv:'LBNL 2024: about 600 W per server (register: servers)', ew:'register: ewaste (server masses 21.25–26.3 kg, 6-year refresh)', cu:'register: copper_tonnes (Copper Development Association 2023 — industry figure)',
 eit:'register: embodied_it (Dell R760 life-cycle assessment 2025 — manufacturer)', eb:'register: embodied_building (461 kg CO₂e/m² median; no data-centre benchmark)',
 snd:'register: noise_level (screen Lp = Lw − 20 log r − 8; Trane RTAF size 280, 1,010 kW: Lw 98 low-noise, 101 standard, one unit per MW)', lf:'register: lf_flag (AUC Rule 012 s. 4.5)', light:'register: light_at_window (CIE 150:2017; Edmonton Bylaw 20001 s. 5.120(3); Vancouver: no lux limit)',
 so:'register: standoff (Ontario GO-ITS 25.18, transferred)', watch:'register: watched_area (field observation, labelled as one person\'s)', ppl:'Statistics Canada, Census 2021 Profile by dissemination area (98-401-X2021006) and DA boundaries; counts spread evenly within each area',
};
const s3=k=>`<div class="src">${badge(k==='lf'?'lf2':k)}${esc(SRC3[k])}</div>`;
function energyView(){
  const f=siteFacts(), A=BD.S.answers, mw=A.mw||1, fac=[mw*R.pue[0],mw*R.pue[1]], MWh=[fac[0]*8760*R.lf,fac[1]*8760*R.lf];
  const roof=roofArea(f), plant=plantPerMW(false)[1]*mw, share=Math.min(0.9,roof?plant/roof:0);
  const kwp=[roof*0.66*(1-share)*0.70*0.16,roof*0.66*(1-share)*0.70*0.20], yld=f.city==='van'?[892,1007]:[944,1244], pvMWh=kwp.map((v,i)=>v*yld[i]/1000);
  const co2=MWh.map(v=>v*R.grid[f.city]/1000);
  const cost=f.city==='van'?[MWh[0]*1000*0.0679+fac[0]*1000*13.83*12,MWh[1]*1000*0.0679+fac[1]*1000*13.83*12]:null;
  const Pg=f.M&&f.M.plant&&f.M.plant.s, gInst=Pg&&Pg.g?Pg.gN*Pg.g.mw:null; // installed sets, spares included (sweep M39)
  const ups=[mw*1/60*0.5,mw*5/60*0.5], gen=gInst?[gInst*1000*4,gInst*1000*4]:[fac[0]*1000*4,fac[1]*1000*4];
  let h=tabBar('energy')+`<h2>Power in, power offered</h2><p class="draft">A customer first. What it can give back is <span class="k">flexibility</span>, and only the operator can give it.</p>
  <h3>What it draws</h3><dl><dt>Power at the meter</dt><dd>${rng(fac[0],fac[1],'MW')} at full load; about ${rng(fac[0]*R.lf,fac[1]*R.lf,'MW')} on average</dd><dt>Electricity a year</dt><dd>${rng(MWh[0]/1000,MWh[1]/1000,'GWh')}, at about ${Math.round(R.lf*100)}% of full load on average</dd>
  ${cost?`<dt>Cost a year</dt><dd>about $${(cost[0]/1e6).toFixed(1)}–${(cost[1]/1e6).toFixed(1)} million if served on BC Hydro's large general service (6.79 ¢/kWh + $13.83/kW a month, the demand charge taken at full load, which is conservative); very large loads move to transmission rates</dd>`:`<dt>Price</dt><dd>Alberta pool averaged $43.68/MWh in 2025, plus EPCOR distribution and transmission charges</dd>`}
  <dt>Carbon of that electricity</dt><dd>${rng(co2[0],co2[1],'t CO₂e/yr')} at ${R.grid[f.city]} g/kWh (average, consumption)</dd>
  <dt>Grid connection</dt><dd>${f.downtown?`${state('chg')}downtown: no new 12 kV feeder positions from fiscal 2027 until the West End substation (expected July 2032; BC Hydro's application is not yet decided); in between, BC Hydro connects new customers by temporary measures`:`${state('cj')}needs the utility's answer to a load application; in Virginia, Dominion Energy reports 12–36 months for this (JLARC 2024; a transferred figure, not BC or Alberta)`}</dd></dl>${s3('elec')}${src('grid')}${f.downtown?src('grid2'):''}
  <h3>Solar on its own roof</h3><dl><dt>Roof</dt><dd>${fmt(roof)} m², of which plant takes about ${Math.round(share*100)}%</dd><dt>Panels</dt><dd>${rng(kwp[0],kwp[1],'kWp')} → ${rng(pvMWh[0],pvMWh[1],'MWh/yr')}</dd><dt>Share of its own use</dt><dd>${rng(pvMWh[0]/MWh[1]*100,pvMWh[1]/MWh[0]*100,'%')} — a small share at data-centre densities</dd></dl>${s3('pv')}
  <h3>What it could offer the grid</h3><dl>
  <dt>Who decides</dt><dd>${state('cj')}only whoever runs the computing; in a shared (colocation) building that is each tenant. Training runs can pause at checkpoints; live services cannot.</dd>
  <dt>The batteries it already has</dt><dd>${rng(ups[0],ups[1],'MWh')} for minutes (1–5 min of runtime, half kept for outages) — fast grid support, not a 4-hour peak; BC Hydro's storage incentive excludes an existing UPS</dd>
  <dt>A battery added for the grid</dt><dd>1 MW for 4 h takes ${fmt(4000/49)}–${fmt(4000/19)} m²; BC Hydro pays $50/kW a season for winter peak relief (fossil generators excluded)</dd>
  <dt>EV charging, if 1 MW were set aside</dt><dd>${fmt(1000/19.2)}–${fmt(1000/(0.5*7.4))} Level 2 stalls (7.4–19.2 kW; from all charging at once to half at once, the share found for fast-charging sites, Silber et al. 2024), about ${fmt(1000/19.2*22)}–${fmt(1000/(0.5*7.4)*22)} m² of parking</dd></dl>${s3('ctl')}${s3('ups')}${s3('batt')}${s3('dr')}${s3('ev')}
  <h3>Standby generators</h3><dl><dt>Testing</dt><dd>about 4 full-load hours a year: ${rng(gen[0]*0.706/1000,gen[1]*0.706/1000,'t CO₂')} and ${rng(gen[0]*14.6/1000,gen[1]*14.6/1000,'kg NOₓ')} a year, testing every installed set (AP-42 factors for uncontrolled diesel engines)</dd></dl>${s3('gen')}
  ${mathBox([
    `Power at the meter: ${mw} MW × PUE ${R.pue[0]}–${R.pue[1]} = <b>${rng(fac[0],fac[1],'MW')}</b>.`,
    `Electricity a year: ${n1(fac[0])} MW × 8,760 h × ${R.lf} = ${n0(MWh[0])} MWh; ${n1(fac[1])} MW × 8,760 × ${R.lf} = <b>${n0(MWh[1])} MWh</b>.`,
    cost?`Cost: energy ${n0(MWh[0])} MWh × 1,000 × $0.0679 + demand ${n1(fac[0])} MW × 1,000 × $13.83 × 12 = $${n0(cost[0])}; high end $${n0(cost[1])}.`:'Cost: Alberta pool price plus EPCOR charges; no single-rate estimate.',
    `Carbon: ${n0(MWh[0])}–${n0(MWh[1])} MWh × ${R.grid[f.city]} g/kWh ÷ 1,000 = <b>${rng(co2[0],co2[1],'t CO₂e')}</b>.`,
    `Solar: roof ${n0(roof)} m² × 0.66 usable × (1 − ${share.toFixed(2)} plant) × 0.70 packing × 0.16–0.20 kW/m² = ${n1(kwp[0])}–${n1(kwp[1])} kWp; × ${fmt(yld[0])}–${fmt(yld[1])} kWh per kWp a year (flat to latitude tilt, NRCan) = <b>${rng(pvMWh[0],pvMWh[1],'MWh')}</b>; ÷ the building's use = ${(pvMWh[0]/MWh[1]*100).toFixed(2)}–${(pvMWh[1]/MWh[0]*100).toFixed(2)}%.`,
    `UPS batteries: ${mw} MW × 1–5 min ÷ 60 × 0.5 kept for outages = <b>${n1(ups[0])}–${n1(ups[1])} MWh</b>.`,
    `Generator testing: ${gInst?`${Pg.gN} sets × ${Pg.g.mw} MW = ${n1(gInst)} MW`:`${n1(fac[0])}–${n1(fac[1])} MW`} × 1,000 × 4 h = ${n0(gen[0])}–${n0(gen[1])} kWh; × 0.706 kg CO₂/kWh = ${n1(gen[0]*0.706/1000)}–${n1(gen[1]*0.706/1000)} t; × 14.6 g NOₓ/kWh = ${n0(gen[0]*14.6/1000)}–${n0(gen[1]*14.6/1000)} kg.`],
    'PUE: LBNL 2023, Uptime 2025. Load factor: Fan et al. 2007. Rates: BC Hydro LGS 2026. Solar: NRCan yields, NREL densities. Generator factors: AP-42 Table 3.4-1 (upper bounds).')}
  <div class="draftnote">Ranges carry the register's confidence.</div>`;
  $('#side').innerHTML=h; wireTabs(); BD.draw();
  show3d('energy',{site:f,gridNote:f.downtown?'Downtown: no new feeder positions before the West End substation (expected July 2032).':''});
}
function waterView(){
  const f=siteFacts(), A=BD.S.answers, mw=A.mw||1, fac=[mw*R.pue[0],mw*R.pue[1]], MWh=[fac[0]*8760*R.lf,fac[1]*8760*R.lf];
  const towers=A.outside==='towers', hybrid=A.outside==='hybrid';
  // hybrid coolers run wet only when the air is too warm for the loop (30 °C loop, 12 K approach → above 18 °C dry-bulb): CWEC hours per city (J.B. parity audit A2, 16 Oct 2026)
  const WET={van:[1085,0.124],edm:[914,0.104]}, wet=hybrid?WET[f.city][1]:1;
  const evap=MWh.map(v=>v*1000*1.5*wet/1000); // m³: ≤ 1.5 L/kWh of heat, × the wet share for hybrids
  const mk=[evap[1]*(1+1/(6-1)),evap[1]*(1+1/(2-1))], bd=[evap[1]/(6-1),evap[1]/(2-1)];
  const roof=roofArea(f), mm=f.city==='van'?1159.5:422.5, rain=roof*mm/1000*0.8;
  const wbe=[MWh[0]*1000*1.25/1000,MWh[1]*1000*16.8/1000];
  let h=tabBar('water')+`<h2>Water in, water out</h2><p class="draft">From almost none to a great deal: <span class="k">it depends on the cooling</span>.</p>
  <div class="q"><div class="lab">How it rejects heat</div><div class="seg" data-c="1"><button data-v="dry" aria-pressed="${A.outside!=='towers'&&A.outside!=='hybrid'}">Dry coolers</button><button data-v="towers" aria-pressed="${towers}">Cooling towers</button><button data-v="hybrid" aria-pressed="${A.outside==='hybrid'}">Hybrid</button></div></div>
  <h3>On site</h3><dl>${towers||hybrid?`<dt>Evaporated</dt><dd>up to ${fmt(evap[1])} m³/yr (at most 1.5 L per kWh of heat${hybrid?`, wet only in the ${fmt(WET[f.city][0])} hours a typical year is above 18 °C in ${f.city==='van'?'Vancouver':'Edmonton'} (${(WET[f.city][1]*100).toFixed(1)}%; CWEC, computed)`:''})</dd><dt>Make-up water</dt><dd>${fmt(mk[0])}–${fmt(mk[1])} m³/yr at 2–6 cycles of concentration</dd><dt>Blowdown to the sewer</dt><dd>${fmt(bd[0])}–${fmt(bd[1])} m³/yr</dd>${f.city==='van'?`<dt>Water bill</dt><dd>about $${fmt(mk[0]/2.832*4.091)}–$${fmt(mk[1]/2.832*5.128)} a year for the make-up water alone (2026 rates, per 2.832 m³ unit)</dd>`:''}`:`<dt>Evaporated</dt><dd>none for cooling — dry coolers reject heat to the air; their fans are the trade (sound, roof space)</dd>`}
  <dt>Rain on the roof</dt><dd>about ${fmt(rain)} m³/yr from ${fmt(roof)} m² at ${mm} mm a year</dd></dl>${s3('evap')}${f.city==='van'?s3('wprice'):''}${s3('rain')}
  <h3>Behind its electricity</h3><dl><dt>Water used to make its power</dt><dd>${fmt(wbe[0])}–${fmt(wbe[1])} m³/yr (thermal plants ~1.25 L/kWh; hydro reservoirs ~16.8 L/kWh — mostly evaporation from reservoirs)</dd></dl>${s3('wbe')}
  <h3>Other sources and their rules</h3><dl><dt>Reclaimed water</dt><dd>${f.city==='van'?'Metro Vancouver considers supply to industry case by case; no rate':'EPCOR supplied 4,226 ML of reclaimed water to industry in 2024 (Gold Bar)'}</dd>
  <dt>Neighbours' greywater</dt><dd>${f.city==='van'?'not allowed as a cooling source under the Building By-law; residential systems only (2025)':'needs a variance in Alberta'}</dd>
  <dt>The sewer as a heat sink</dt><dd>${f.city==='van'?'warm water must not raise waste entering any sewage facility to 40 °C or more, and a high-volume discharge (over 300 m³ in 30 days) needs a permit (Metro Vancouver Sewer Use Bylaw 299); heat taken from sewage needs a letter of support, first come first served':'non-contact cooling water may go to the sanitary sewer only with EPCOR\'s prior written approval (Drainage Services Bylaw 18100); no EPCOR programme for taking heat from sewage was found'}</dd></dl>${s3('reuse')}${s3('sewer')}
  ${mathBox([
    towers?`Evaporated, at most: ${n0(MWh[1])} MWh of heat × 1,000 × 1.5 L/kWh ÷ 1,000 = <b>${n0(evap[1])} m³</b> (latent heat sets ≈1.5 L per kWh as the ceiling).`:'Dry coolers: no water evaporated for cooling.',
    towers?`Make-up = evaporated × (1 + 1 ÷ (cycles − 1)): at 6 cycles × 1.2 = ${n0(mk[0])} m³; at 2 cycles × 2 = <b>${n0(mk[1])} m³</b>. Blowdown = evaporated ÷ (cycles − 1) = ${n0(bd[0])}–<b>${n0(bd[1])} m³</b>.`:'',
    `Rain: roof ${n0(roof)} m² × ${mm} mm ÷ 1,000 × 0.8 runoff = <b>${n0(rain)} m³</b>.`,
    `Water behind the electricity: ${n0(MWh[0])} MWh × 1.25 L/kWh = ${n0(wbe[0])} m³; ${n0(MWh[1])} MWh × 16.8 L/kWh = <b>${n0(wbe[1])} m³</b>.`].filter(Boolean),
    'Evaporation: physics (latent heat). Cycles: FEMP/EPA. Rain: ECCC Normals 1991–2020; runoff 0.8 assumed. Water behind electricity: US thermoelectric and hydro averages.')}
  `;
  $('#side').innerHTML=h; wireTabs(); document.querySelectorAll('#side .seg[data-c] button').forEach(b=>b.onclick=()=>{ A.outside=b.dataset.v; BD.modelReset&&BD.modelReset(); waterView(); }); BD.draw();
  show3d('water',{site:f,rain,towers:towers||A.outside==='hybrid',evap:towers?fmt(evap[1])+' m³/yr':''});
}
function materialsView(){
  const f=siteFacts(), A=BD.S.answers, mw=A.mw||1, racks=mw*1000/R.kWPerRack, servers=mw*1000/0.6;
  const ew=[servers*21.25/6/1000,servers*26.3/6/1000], cu=[mw*20,mw*40], eit=[servers*4.177*0.10/6,servers*4.177*0.15/6], eb=f.gross[1]*0.461;
  let h=tabBar('materials')+`<h2>What it is made of, and how often</h2><p class="draft">The building lasts decades; <span class="k">the servers are replaced every five to six years</span>.</p>
  <h3>The equipment</h3><dl><dt>Racks</dt><dd>about ${fmt(racks)} at 8 kW each</dd><dt>Servers</dt><dd>about ${fmt(servers)} at 600 W each</dd>
  <dt>Electronic waste</dt><dd>${rng(ew[0],ew[1],'t/yr')} of servers alone, on a six-year refresh</dd><dt>Copper</dt><dd>${fmt(cu[0])}–${fmt(cu[1])} t in the facility (industry figure)</dd>
  <dt>Embodied carbon, servers</dt><dd>${rng(eit[0],eit[1],'t CO₂e/yr')} — the manufacturing share (10–15%) of one manufacturer's server assessment, spread over six years; uncertainty is large</dd></dl>${s3('srv')}${s3('ew')}${s3('cu')}${s3('eit')}
  <h3>The building</h3><dl>${A.built==='existing'?`<dt>Reuse</dt><dd>an existing building keeps its structure; precedents: 515 W Hastings offices (2023), Edmonton office and warehouse conversions</dd><dt>Watch for</dt><dd>floor strength, floor-to-floor height and room for plant</dd>`:`<dt>Embodied carbon, building</dt><dd>about ${fmt(eb)} t CO₂e for ${fmt(f.gross[1])} m² at 461 kg/m² — a general building median; no data-centre benchmark exists</dd>`}
  <dt>Lifespans</dt><dd>servers about 5–6 years · cooling and heat pumps 15–25 · shell up to 40 · pipe network 30–50, depending on water temperature</dd></dl>${A.built==='existing'?'':s3('eb')}
  ${mathBox([
    `Racks: ${mw} MW × 1,000 ÷ ${R.kWPerRack} kW per rack = <b>${n0(racks)}</b>.`,
    `Servers: ${mw} MW × 1,000 ÷ 0.6 kW each = <b>${n0(servers)}</b>.`,
    `Electronic waste: ${n0(servers)} servers × 21.25–26.3 kg ÷ 6 years ÷ 1,000 = <b>${rng(ew[0],ew[1],'t/yr')}</b>.`,
    `Copper: ${mw} MW × 20–40 t per MW = <b>${n0(cu[0])}–${n0(cu[1])} t</b>.`,
    `Embodied carbon, servers: ${n0(servers)} × 4.177 t × 10–15% manufacturing ÷ 6 years = <b>${rng(eit[0],eit[1],'t CO₂e/yr')}</b>.`,
    A.built==='existing'?'':`Embodied carbon, building: ${n0(f.gross[1])} m² × 0.461 t/m² = <b>${n0(eb)} t CO₂e</b>.`].filter(Boolean),
    'Servers: LBNL 2024. Waste: server masses, 6-year refresh. Copper: Copper Development Association (industry). Embodied: Dell R760 LCA (manufacturer); building median 461 kg/m².')}
  `;
  $('#side').innerHTML=h; wireTabs(); BD.draw();
  show3d('materials',{site:f});
}
const CENSUS={};
function censusNear(city,c,r){ const d=CENSUS[city]; if(!d||d==='loading') return null; const C=d.cell, t=[0,0,0,0,0,0,0];
  for(const q of d.cells){ const x=(q[0]+0.5)*C-c[0], y=(q[1]+0.5)*C-c[1]; if(x*x+y*y<=r*r) for(let i=0;i<7;i++) t[i]+=q[i+2]; } return t; }
function socialView(){
  if(!CENSUS[BD.S.city]){ const city=BD.S.city; CENSUS[city]='loading'; fetch('census_'+city+'.json').then(r=>r.json()).then(d=>{ CENSUS[city]=d; if(BD.S.tab==='social'&&BD.S.city===city) socialView(); }).catch(()=>{ CENSUS[city]=null; }); }
  const f=siteFacts(), A=BD.S.answers, mw=A.mw||1, fac=mw*R.pue[1]; const n=Math.max(1,Math.ceil(fac));
  const lw=[R.lwUnit[0]+10*Math.log10(n),R.lwUnit[1]+10*Math.log10(n)];
  const lim=f.city==='van'?(/^(MC-1|MC-2|DD|M-1|M-1A|M-1B|M-2|IC-1|IC-2|IC-3|I-1|I-1A|I-1B|I-1C|I-2|I-3|I-4|CWD|DEOD)$/.test(f.zone)?55:/^(C-|FC-|FCCDD|BCPED|HA-|R3-|R4-|R5-|RR-3)/.test(f.zone)?50:45):50;
  const dist=lw.map(L=>Math.pow(10,(L-8-lim)/20));
  // each neighbour gets the limit for ITS zone (By-law 6555 ss. 2.1–2.3: the limit depends on the source zone and the receiving zone)
  const S=BD.S; let within=[0,0], over=[0,0], byCls={quiet:0,other:0,unknown:0};
  const vcls=z=>!z?null:/^(MC-1|MC-2|DD|M-1|M-1A|M-1B|M-2|IC-1|IC-2|IC-3|I-1|I-1A|I-1B|I-1C|I-2|I-3|I-4|CWD|DEOD)$/.test(z)?'activity':/^(C-|FC-|FCCDD|BCPED|HA-|R3-|R4-|R5-|RR-3)/.test(z)?'intermediate':'quiet';
  const srcCls=f.city==='van'?vcls(f.zone)||'quiet':null;
  const limQ={quiet:45,intermediate:50,activity:55}[srcCls]||45, limO={quiet:55,intermediate:65,activity:65}[srcCls]||55;
  const zoneOf=(T,x,y)=>{ let best=null; for(const p of T.par){ const bb=p.bb; if(x<bb[0]||x>bb[2]||y<bb[1]||y>bb[3]) continue; if(BD.pip(x,y,p.r)){ const id=p.ids?p.ids[0]:p.id; const a=T.A[id]; if(a){ best=f.city==='van'?a[1]:(a[2]||a[1]); break; } } } return best; };
  const limitFor=b=>{ if(b._lim!=null) return b._lim; let z=null; for(const id in S.tiles){ if(!id.startsWith(S.city+':')) continue; const T=S.tiles[id]; const bb=T.par.length?null:null; z=zoneOf(T,b.c[0],b.c[1]); if(z) break; }
    let L; if(f.city==='van'){ const c=vcls(z); L=c===null?limQ:c==='quiet'?limQ:limO; b._cls=c===null?'unknown':c==='quiet'?'quiet':'other'; }
    else { const res=z&&/^R/.test(String(z).split(" ")[0]); L=z==null?50:res?50:60; b._cls=z==null?'unknown':res?'quiet':'other'; }
    b._lim=L; return L; };
  for(const id in S.tiles){ if(!id.startsWith(S.city+':')) continue; for(const b of S.tiles[id].bld){ if(b.f===3||(f.blds||[]).includes(b)) continue; const r=Math.max(5,Math.hypot(b.c[0]-f.c[0],b.c[1]-f.c[1])); if(r>600) continue;
      b._lim=null; const L=limitFor(b); const lo=lw[0]-20*Math.log10(r)-8, hi=lw[1]-20*Math.log10(r)-8;
      if(hi>L){ within[1]++; byCls[b._cls]++; } if(lo>L) within[0]++; } }
  const d=BD.recv[f.city]||{pts:[]}; const homes=d.pts.filter(p=>p.t==='housing'&&Math.hypot(p.x-f.c[0],p.y-f.c[1])<=200).reduce((t,p)=>t+(p.u||0),0);
  const key='bd-notes-'+S.city+'-'+S.sel.id; let notes=''; try{ notes=localStorage.getItem(key)||''; }catch(e){}
  let h=tabBar('social')+`<h2>What neighbours would hear, see and feel</h2><p class="draft">Described as experienced, not scored. Measured where the data allows; your site observations sit beside it, labelled as yours.</p>
  <h3>Sound</h3><dl><dt>Cooling plant</dt><dd>about ${n} unit${n>1?'s':''} rated ${rng(lw[0],lw[1],'dBA')} together (low-noise to standard)</dd>
  <dt>Night limit</dt><dd>${f.city==='van'?`from this ${srcCls} zone: ${limQ} dBA at a quiet-zone neighbour, ${limO} dBA at any other`:'50 dBA next to homes, 60 dBA next to other uses'}</dd><dt>Quiet-zone limit reached at</dt><dd>${fmt(dist[0])}–${fmt(dist[1])} m from the plant, before walls, barriers or enclosures</dd>
  <dt>Neighbours over their limit</dt><dd>${within[0]}–${within[1]} buildings within 600 m (low-noise to standard units), each judged against the limit for its own zone: ${f.city==='van'?`${limQ} dBA in a quiet zone, ${limO} dBA elsewhere`:'50 dBA next to homes, 60 dBA next to other uses'}${within[1]?` — ${byCls.quiet} in quiet${f.city==='van'?' zones':' (residential) zones'}, ${byCls.other} elsewhere${byCls.unknown?`, ${byCls.unknown} with no parcel record (quiet limit used)`:''}`:''}. In the 3D view, red: over even with low-noise units; accent: over only with standard units.</dd>
  <dt>Low hum</dt><dd>a tonal low-frequency sound adds 5 dBA in Alberta's rule — the kind neighbours describe most</dd></dl>${s3('snd')}${s3('lf')}${src('noise')}
  <h3>The edge</h3><dl><dt>Standoff</dt><dd>new facilities keep about 10 m between the building and the public (45 m enhanced) — a fence, bollards or a blank setback, as experienced from the street</dd>
  <dt>Ground floor</dt><dd>${f.envAssumed?'not known: this zone\'s rules are not yet read':(f.envU&&f.envU.ground)?'this zone keeps the ground floor free of data storage: it could meet the street':'nothing in the zone requires another use at grade'}</dd>
  <dt>Watched area</dt><dd>${state('cj')}seen only on site: cameras and signs visible from public space, recorded as one person's account</dd>
  <dt>Light at night</dt><dd>${f.city==='van'?'Vancouver sets no lux limit, but bars an outdoor light that shines directly onto a residential window across the street or next door and unreasonably disturbs the neighbour (Untidy Premises By-law 4548 s. 7)':'Edmonton requires light directed downward and away (no number)'}; the international reference is 10 lx before and 2 lx after curfew at a window</dd></dl>${s3('so')}${s3('watch')}${s3('light')}
  <h3>Who is near</h3><dl><dt>Non-market homes within 200 m</dt><dd>${f.city==='van'?`${fmt(homes)} (City list; private housing not counted)`:'not known: no non-market housing list is loaded for Edmonton'}</dd>${peopleRows(f,dist)}<dt>Work</dt><dd>${(()=>{ const lo=mw*f.m2MW[0]/R.hallShare[1]/R.jobsM2, hi=mw*f.m2MW[1]/R.hallShare[0]/R.jobsM2; return hi<1?'fewer than 1':rng(Math.max(1,lo),hi,''); })()} operating jobs (Virginia ratio, transferred)</dd></dl>${s3('ppl')}${src('jobs')}
  ${mathBox([
    `Cooling units: power at the meter ${n1(fac)} MW, about one unit per MW → <b>${n}</b> unit${n>1?'s':''} (an assumption).`,
    `Together: Lw per unit of about 1 MW, ${R.lwUnit[0]} (low-noise) to ${R.lwUnit[1]} dBA (standard), + 10 × log₁₀(${n}) = <b>${n1(lw[0])}–${n1(lw[1])} dBA</b>.`,
    `Distance where the night limit is reached: r = 10^((Lw − 8 − ${lim}) ÷ 20) = <b>${n0(dist[0])}–${n0(dist[1])} m</b> (free field over hard ground, no walls or barriers).`,
    `Jobs: ${mw} MW × ${n0(f.m2MW[0])}–${n0(f.m2MW[1])} m² hall per MW ÷ hall share ${R.hallShare[1]}–${R.hallShare[0]} ÷ ${R.jobsM2} m² per job = ${n1(mw*f.m2MW[0]/R.hallShare[1]/R.jobsM2)}–<b>${n1(mw*f.m2MW[1]/R.hallShare[0]/R.jobsM2)}</b>.`],
    'Sound: Lp = Lw − 20 log r − 8 (hemispherical spreading); unit ratings from manufacturer data (Trane, Eurovent). Limits: Noise Control By-law 6555 / Bylaw 14600. Jobs: Virginia JLARC 2024, transferred.')}
  <h3>Your observations on site</h3><textarea id="notes" rows="5" style="width:100%;background:var(--bg);border:1px solid var(--line-2);border-radius:6px;padding:8px;color:var(--fg)" placeholder="What did you hear, see and feel at the edge? Time of day, where you stood.">${esc(notes)}</textarea><div class="src">Kept in this browser only; shown as your observation, never as a measurement.</div>
  <div class="draftnote">Sound is a screening estimate: manufacturer-rated levels, no barriers, ground or buildings.</div>`;
  $('#side').innerHTML=h; wireTabs(); $('#notes').oninput=e=>{ try{ localStorage.setItem(key,e.target.value); }catch(err){} }; BD.draw();
  const pb=(f.M&&f.M.plant&&f.M.plant.boxes)||[]; const psrc=pb.length?[pb.reduce((t,b)=>t+BD.centroid(b.ring)[0],0)/pb.length,pb.reduce((t,b)=>t+BD.centroid(b.ring)[1],0)/pb.length]:null;
  BD._noise={lw,limit:lim,limitFor,dist,src:psrc};
  if(BD.afterSocial) BD.afterSocial(); else show3d('social',{site:f,noise:BD._noise});
}

function peopleRows(f,dist){
  const c=CENSUS[f.city]; if(c==='loading'||c===undefined) return `<dt>People within reach</dt><dd>loading the census…</dd>`; if(!c) return `<dt>People within reach</dt><dd>${state('cj')}census could not load</dd>`;
  const rs=[[200,'within 200 m'],[500,'within 500 m'],[Math.min(600,Math.round(dist[1])),'inside the sound distance ('+fmt(Math.min(600,dist[1]))+' m)']];
  const rows=rs.map(([r,l])=>{ const t=censusNear(f.city,f.c,r); const p=t[0]; const pc=(a,b)=>b>0?Math.round(100*a/b)+'%':'—';
    return `<dt>${l}</dt><dd>about ${fmt(Math.round(p/10)*10)} people in ${fmt(Math.round(t[3]/5)*5)} households · ${pc(t[1],p)} aged 65+ · ${pc(t[2],p)} under 15 · ${pc(t[4],t[3])} of households rent · ${pc(t[5],t[3])} spend 30%+ of income on shelter · ${pc(t[6],p)} in low income</dd>`; }).join('');
  return rows+`<dt>How counted</dt><dd>2021 census, spread evenly over each dissemination area and summed by 100 m cell — an estimate, rounded</dd>`;
}

/* ---------- precedents: real buildings against this site's range ---------- */
let PREC=null;
async function precView(){
  const f=siteFacts(), A=BD.S.answers;
  BD.scene3d&&BD.scene3d.hide(); document.body.classList.add('wide');
  $('#side').innerHTML=tabBar('prec')+'<p class="sub">Loading real buildings…</p>'; wireTabs();
  if(!PREC){ try{ PREC=await BD.getJSON('precedents.json'); }catch(e){ $('#side').innerHTML=tabBar('prec')+'<p class="sub">Could not load the precedents.</p>'; wireTabs(); return; } }
  const P=PREC, S=P.summary, gpm=S.gross_per_it_mw_benchmark, G=f.gross[1]||f.gross[0]||0;
  const pts=P.sites.filter(s=>s.mw&&s.area&&s.tier!=='context'&&s.mw_basis!=='total');
  const W=640,H=380,ml=50,mr=12,mt=12,mb=42, x0=Math.log10(300),x1=Math.log10(250000),y0=Math.log10(0.2),y1=Math.log10(400);
  const X=v=>ml+(Math.log10(v)-x0)/(x1-x0)*(W-ml-mr), Y=v=>H-mb-(Math.log10(v)-y0)/(y1-y0)*(H-mt-mb);
  const cy=v=>Math.max(mt,Math.min(H-mb,v));
  const m=f.m2MW, hs=R.hallShare, chain=[m[0]/hs[1],m[1]/hs[0]];
  const band=(lo,hi)=>`M${X(300)},${cy(Y(300/lo))} L${X(250000)},${cy(Y(250000/lo))} L${X(250000)},${cy(Y(250000/hi))} L${X(300)},${cy(Y(300/hi))} Z`;
  const ln=k=>`M${X(300)},${cy(Y(300/k))} L${X(250000)},${cy(Y(250000/k))}`;
  let g=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Floor area against IT load for real data centres, with this site's range"><defs><clipPath id="pc"><rect x="${ml}" y="${mt}" width="${W-ml-mr}" height="${H-mt-mb}"/></clipPath></defs>`;
  [1000,10000,100000].forEach(v=>{ g+=`<line x1="${X(v)}" x2="${X(v)}" y1="${mt}" y2="${H-mb}" stroke="var(--line)"/><text x="${X(v)}" y="${H-mb+15}" fill="var(--faint)" font-size="11" text-anchor="middle">${v.toLocaleString('en-CA')}</text>`; });
  [1,10,100].forEach(v=>{ g+=`<line x1="${ml}" x2="${W-mr}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)"/><text x="${ml-6}" y="${Y(v)+4}" fill="var(--faint)" font-size="11" text-anchor="end">${v}</text>`; });
  g+=`<text x="${(ml+W-mr)/2}" y="${H-6}" fill="var(--muted)" font-size="11" text-anchor="middle">building floor area, m² (log)</text><text x="12" y="${(mt+H-mb)/2}" fill="var(--muted)" font-size="11" text-anchor="middle" transform="rotate(-90 12 ${(mt+H-mb)/2})">MW of servers (log)</text>`;
  g+=`<g clip-path="url(#pc)"><path d="${band(chain[0],chain[1])}" fill="var(--fg)" opacity=".07"/><path d="${ln(gpm.min)}" stroke="var(--muted)" stroke-dasharray="4 4" fill="none"/><path d="${ln(gpm.max)}" stroke="var(--muted)" stroke-dasharray="4 4" fill="none"/>`;
  pts.forEach(p=>{ const b=p.tier==='benchmark'; g+=`<circle cx="${X(p.area)}" cy="${Y(p.mw)}" r="${b?4.5:4}" fill="${b?'var(--accent)':'none'}" stroke="${b?'var(--accent)':'var(--muted)'}" stroke-width="1.2"><title>${esc(p.name)}: ${f1(p.mw)} MW${p.mw_basis==='IT'?' IT':' (not stated as IT)'}, ${fmt(p.area)} m²</title></circle>`; });
  if(G>0&&f.mw[1]>0){ const x=X(Math.max(300,G)); g+=`<line x1="${x}" x2="${x}" y1="${Y(Math.max(0.2,f.mw[0]))}" y2="${Y(Math.max(0.2,f.mw[1]))}" stroke="var(--fg)" stroke-width="5" stroke-linecap="round" opacity=".9"/><text x="${x+8}" y="${Y(Math.max(0.2,f.mw[1]))+4}" fill="var(--fg)" font-size="11">this site</text>`; }
  g+='</g></svg>';
  const near=P.sites.filter(s=>s.mw&&s.area&&s.tier!=='context').map(s=>({s,d:Math.abs(Math.log(s.area/Math.max(G,1)))})).sort((a,b)=>a.d-b.d).slice(0,8).map(x=>x.s);
  const row=s=>`<tr><td>${esc(s.name)}<div class="src">${esc(s.city)}, ${esc(s.country)}${s.conversion?' · conversion':''} · ${s.tier}</div></td><td class="r">${f1(s.mw)}${s.mw_basis==='IT'?'':'<div class="src">not stated as IT</div>'}</td><td class="r">${fmt(s.area)}</td><td class="r">${fmt(Math.round(s.area/s.mw))}</td><td>${s.url?`<a href="${esc(s.url)}" target="_blank" rel="noopener">source</a>`:''}<div class="src">${esc(s.evidence||'')}</div></td></tr>`;
  let h=tabBar('prec')+`<h3>Real buildings against this site</h3>
  <p class="sub draft">Dots: real data centres (filled: benchmark tier; open: reference tier; each dot's evidence is on its card). Band: the tool's range. Bar: <span class="k">this site, ${rng(f.mw[0],f.mw[1],'MW')} on ${rng(f.gross[0],f.gross[1],'m²')}</span>.</p>
  <div class="chart" style="overflow-x:auto">${g}</div>
  <div class="legend2"><span><i style="background:var(--accent);border-radius:50%"></i>Benchmark</span><span><i style="border:1px solid var(--muted);border-radius:50%"></i>Reference</span><span><i style="background:var(--fg);opacity:.15"></i>Tool's range</span><span><i style="border-top:1px dashed var(--muted);height:0"></i>${gpm.min}–${fmt(gpm.max)} m² of building per MW (benchmarks)</span></div>
  <h3>Closest in size</h3><div class="tt"><table><thead><tr><th>Building</th><th class="r">MW</th><th class="r">Floor m²</th><th class="r">m² per MW</th><th></th></tr></thead><tbody>${near.map(row).join('')}</tbody></table></div>
  <dl><dt>Benchmarks</dt><dd>${gpm.n} buildings, ${gpm.min}–${fmt(gpm.max)} m² of building per MW of IT (typical ${gpm.median})</dd>
  <dt>Built halls</dt><dd>${S.white_per_it_mw.min}–${S.white_per_it_mw.max} m² of hall per MW (n=${S.white_per_it_mw.n}, operator figures)</dd>
  <dt>Hall share</dt><dd>${Math.round(S.white_share.min*100)}–${Math.round(S.white_share.max*100)}% of floor; middle half ${Math.round(S.white_share.p25*100)}–${Math.round(S.white_share.p75*100)}% (n=${S.white_share.n})</dd></dl>
  <div class="src">Precedent catalogue, ${P.sites.length} sites, gathered 15 Oct 2026; every figure with its quote and source in the full catalogue: <a href="https://claude.ai/artifact/FiJybvptz72wxZ6GPQjdC7" target="_blank" rel="noopener">open</a>. Operator figures are claims.</div>
  `;
  $('#side').innerHTML=h; wireTabs();
}
BD.eng={R,siteFacts,plantPerMW,calc,rng,f1,n0,n1,mathBox,tabBar,wireTabs,show3d,nearby,netsAt,loadRecv,badge,src,s3,rangeBar,state,roofArea,optionSet};
BD.fitsView=fitsView; BD.recvView=recvView; BD.optionsView=optionsView; BD.tabView=tabView;
})();
