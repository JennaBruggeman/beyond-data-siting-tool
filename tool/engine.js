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
 envVan:{ 'I-2':{fsr:[3,3],h:18.3,hx:'30.5–36.5',ground:true}, 'I-1C':{fsr:[6,6],h:46.5,hx:'50.3',ground:false},
          'I-3':{fsr:[3,3],h:18.3,hx:'30.5',ground:true,w:61}, 'FC-2':{fsr:[1,5],h:22.9,hx:'51.8',ground:true} },
 envEdm:{ IH:{fsr:[2,2],h:30}, IM:{fsr:[2,2],h:18}, BE:{fsr:[1.6,1.6],h:16} },
 ftf:{ground:6.0, up:[5.5,6.0]},     // ground: zoning minimum (I-2/I-3) and Burlington; data-hall floors 5.5–6.0 m: Burlington ≈6.0, HK TPB A/KC/510B 5.5, A/KC/480 6.0 (15 Oct check; zoning's 4.0 m is a minimum, not a hall height)
 hallShare:[0.48,0.72],               // hall_area: Burlington plan set (internally inconsistent: 48% or 72%); single-storey and operator cases 51–87% not used for multi-storey
 m2PerMW:[290,630],                   // built Canadian halls, operator claims: eStruxture VAN-1 ≈290, Hut 8 Vault ≈557, Qu EDM1 ≈584, Cologix VAN2 ≈619, VAN5 ≈627 (sources/16 §2.7)
 m2PerMWModel:[186,2325],             // LBNL prototypes (Sun et al. 2021), shown as outer bounds only
 grossPerMW:[505,1109],               // check: whole building per MW IT — min–max of the 10 benchmark buildings in bench/benchmarks.json (public or filed records; test_size_chain.py keeps this in sync)
 cases:{van:[{mw:1.6,n:'Cologix VAN5'},{mw:2.4,n:'eStruxture VAN-1'},{mw:40,n:'111 E 5th (proposed)'}], edm:[{mw:2.5,n:'Qu EDM1'}]}, // operator or applicant figures
 steps:[0.1,0.2,0.3,0.5,0.75,1,1.5,2,2.5,3,4,5,6,8,10,12,15,20,25,30,40],
 plant:{ups:[2.0,2.4],batt:[2.2,2.2],dry:[24.5,24.5],hp:[3.4,3.4],cdu:[0.6,0.6]}, // component_space, manufacturer claims, equipment only
 pue:[1.4,1.55], lf:0.6, capture:[0.48,0.75], cop:[3.0,3.6],
 fuelLkWh:0.263, fuelHours:12, fuelLimit:{low:20000,first:200000},
 homeMWh:{van:14.58,edm:29.19},       // CEUD 2023 space + water heating per household: BC 52.5 GJ, AB 105.1 GJ
 grid:{van:18.1,edm:346.1},           // g CO2e/kWh, NIR 2026, consumption, 2024
 neuCredit:32.59,                     // $/MWh, By-law 9552 Sch. C
 reach:{pool:1000,housing:1200,greenhouse:1500}, reachGuide:1200,
 jobsM2:464.5,                        // 5,000 ft² per operating job, JLARC 2024 (transferred)
};
const SRC2={
 env:'formula register: envelope (zone schedules; sources 17, 18)', hall:'register: hall_area (one calibration case, confidence 50); ground-floor rule: I-2 s. 2.2.7; floor heights: Burlington plans, HK TPB A/KC/480, A/KC/510B',
 size:'register: size_fit (built halls: eStruxture VAN-1, Hut 8 Vault, Qu EDM1, Cologix VAN2, VAN5 — operator claims; LBNL prototypes, Sun et al. 2021; whole-building check: 111 E 5th RTS 19744, Ark UP4 committee report, Cologix VAN4 operator)',
 plant:'register: component_space (manufacturer claims, equipment only; clearances and switchgear rooms not sourced)',
 pue:'register: pue (LBNL 2023; Uptime 2025 industry survey)', lf:'register: load_factor (Fan et al. 2007)',
 cap:'register: liquid_capture (LBNL 2014, NREL — direct-to-chip 48–75%; air-cooled: no primary figure)',
 cop:'register: cop (DEA 2026 waste-heat heat pumps to 70 °C, 1–3 MW)', fuel:'register: fuel_on_site (NFC 2020 Table 4.3.13.4.-B; fuel rate a manufacturer claim; Uptime ≥ 12 h)',
 svc:'register: service_class (BC Hydro primary guide; EPCOR connection guide)', homes:'register: homes_heated (NRCan CEUD 2023)',
 grid:'register: grid_co2 (NIR 2026 Annex 7, consumption intensity 2024)', neu:'By-law 9552 Sch. A, C, s. 2.1 (consolidated 1 Jan 2026); service area traced ±45 m',
 reach:'register: receiver_radius (RVO 2018, 5-year payback)', recv:'Statistics Canada ODSRF v2 (2026), ODHF (2020), ODEF v2.1 (2022); City of Vancouver non-market housing',
 jobs:'register: jobs (Virginia JLARC 2024, transferred; confidence 40)', noise:'Noise Control By-law 6555 ss. 2.1–2.3, Sch. A, B (Vancouver); Bylaw 14600 (Edmonton)',
 grid2:'register: grid_headroom (BC Hydro West End Substation CPCN, 10 Nov 2025)', floor:'register: floor_load_need (NBC 2020 Table 4.1.5.3)',
};
const src=k=>`<div class="src">${esc(SRC2[k])}</div>`;

/* ---------- geometry helpers: lon/lat ↔ local metres (same projection as the tiles) ---------- */
function P(lon,lat){ const m=BD.S.meta[BD.S.city]; const k=Math.cos(m.lat0*Math.PI/180)*111320; return [(lon-m.lon0)*k,(lat-m.lat0)*110540]; }
BD.recv={};
async function loadRecv(city){ if(BD.recv[city]) return BD.recv[city];
  try{ const d=await BD.getJSON(`tiles/${city}/receivers.json`);
    d.pts.forEach(p=>{ [p.x,p.y]=P(p.lon,p.lat); });
    d.nets.forEach(n=>{ n.r=new Float64Array(n.ring.flatMap(([lo,la])=>P(lo,la))); n.path=BD.pathOf([n.r]); });
    BD.recv[city]=d; BD.draw(); return d; }catch(e){ console.warn(e); BD.recv[city]={pts:[],nets:[]}; return BD.recv[city]; } }
BD.loadRecv=loadRecv;
function distToRing(x,y,r){ let best=1e12; for(let i=0,j=r.length-2;i<r.length;j=i,i+=2){ const ax=r[j],ay=r[j+1],bx=r[i],by=r[i+1]; const dx=bx-ax,dy=by-ay; const t=Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy)/(dx*dx+dy*dy||1))); best=Math.min(best,Math.hypot(x-ax-t*dx,y-ay-t*dy)); } return best; }

/* ---------- the site in numbers ---------- */
function siteFacts(){
  const s=BD.S.sel, city=s.city, a=s.a||[], A=BD.S.answers;
  const blds=(s.blds||[]).filter(b=>b.f!==3);
  const f={city, lot:city==='van'?a[8]:a[4], zone:null, env:null, envNote:'', blds};
  if(city==='van'){ f.zone=(a[1]||'').trim(); f.env=R.envVan[f.zone]||null; }
  else { const z=String(a[2]||a[1]||'').trim().split(/\s+/)[0].toUpperCase(); f.zone=z; f.env=R.envEdm[z]||null; }
  f.status=BD.statusOf(f.zone);
  f.foot=blds.reduce((t,b)=>t+b.a,0); f.hmax=blds.length?Math.max(...blds.map(b=>b.h)):0; f.plate=blds.length?Math.max(...blds.map(b=>b.a)):0;
  f.c=s.ring?BD.centroid(s.ring):s.pt;
  f.downtown=city==='van'&&/^(DD|CWD|DEOD|BCPED|HA-1|HA-1A|HA-2)$/.test(f.zone);
  // gross floor area available to the data centre
  const env=f.env||(city==='van'?R.envVan['I-2']:R.envEdm.IM); f.envAssumed=!f.env; f.envH=env.h; f.envU=env;
  // storeys within the height limit: 6.0 m ground floor, then 6.0 m (fewer) or 5.5 m (more) data-hall floors
  const nF=[1+Math.max(0,Math.floor((env.h-R.ftf.ground)/R.ftf.up[1])), 1+Math.max(0,Math.floor((env.h-R.ftf.ground)/R.ftf.up[0]))];
  f.hallS=null; f.hallL=null;
  if(A.built==='new'){
    const g=[f.lot*env.fsr[0],f.lot*env.fsr[1]]; f.floors=nF[1]; f.floorsR=nF;
    // the zone's floor area is reachable only if that many storeys fit: at most the whole lot on every storey
    const G=[Math.min(g[0],f.lot*nF[0]),Math.min(g[1],f.lot*nF[1])]; f.g=g; f.G=G;
    f.fullCover=g[1]>f.lot*nF[0]*0.999; f.heightCut=g[0]>f.lot*nF[0]*1.001;
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
  const m2MW=R.m2PerMW, toMW=h=>[Math.min(40,h[0]/m2MW[1]),Math.min(40,h[1]/m2MW[0])];
  f.mwS=toMW(f.hallS); f.mwL=f.hallL?toMW(f.hallL):null;
  f.hall=f.hallL?[f.hallS[0],Math.max(f.hallS[1],f.hallL[1])]:f.hallS.slice();
  f.mw=[f.mwS[0],f.mwL?Math.max(f.mwS[1],f.mwL[1]):f.mwS[1]]; f.m2MW=m2MW;
  // check against whole buildings: total floor area ÷ built building-area-per-MW
  f.mwCheck=A.built==='new'&&A.extent!=='part'?[f.gross[0]/R.grossPerMW[1],f.gross[1]/R.grossPerMW[0]]:null;
  return f;
}
function plantPerMW(recover){ const p=R.plant; let lo=p.ups[0]+p.batt[0]+p.dry[0], hi=p.ups[1]+p.batt[1]+p.dry[1]; if(recover){ lo+=p.hp[0]+p.cdu[0]; hi+=p.hp[1]+p.cdu[1]; } return [lo,hi]; }


/* ---------- show the math: every step with the site's own numbers, checkable with a calculator ---------- */
const n0=v=>Math.round(v).toLocaleString('en-CA'), n1=v=>v<10?(+v).toFixed(2):v<100?(+v).toFixed(1):n0(v);
const mathBox=(lines,note)=>`<details class="math"><summary>Show the math</summary><ol>${lines.map(l=>`<li>${l}</li>`).join('')}</ol>${note?`<div class="src">${note}</div>`:''}</details>`;
function mathFits(f){
  const A=BD.S.answers, L=[];
  const hs=R.hallShare, m=R.m2PerMW;
  if(A.built==='new'&&f.G){
    const e=f.envU, fsr=e.fsr[0]===e.fsr[1]?e.fsr[0]:e.fsr[0]+'–'+e.fsr[1];
    L.push(`Lot area: <b>${n0(f.lot)} m²</b> (City parcel data).`);
    L.push(`Zone floor-space ratio ${fsr}${f.envAssumed?' (as if rezoned)':''}: ${n0(f.lot)} × ${fsr} = <b>${n0(f.g[1])} m²</b>.`);
    L.push(`Storeys under the ${e.h} m height limit: first floor 6.0 m, then data-hall floors of 6.0 or 5.5 m. (${e.h} − 6.0) ÷ 6.0 = ${((e.h-6)/6).toFixed(2)}, whole floors ${Math.floor((e.h-6)/6)}, plus the first floor = <b>${f.floorsR[0]}</b>; with 5.5 m floors, ${((e.h-6)/5.5).toFixed(2)} → ${Math.floor((e.h-6)/5.5)} + 1 = <b>${f.floorsR[1]}</b>.`);
    L.push(`Most floor area those storeys can hold, if each covers the whole lot: ${n0(f.lot)} × ${f.floorsR[0]} = ${n0(f.lot*f.floorsR[0])} m²${f.floorsR[1]!==f.floorsR[0]?` (or × ${f.floorsR[1]} = ${n0(f.lot*f.floorsR[1])} m²)`:''}. The smaller of this and step 2: <b>${rng(f.gross[0],f.gross[1],'m²')}</b>.`);
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
  return mathBox(L,`Hall share ${hs[0]}–${hs[1]}: Burlington plan set. ${m[0]}–${m[1]} m² of hall per MW: five built Canadian halls (operator claims). ${n0(R.grossPerMW[0])}–${n0(R.grossPerMW[1])} m² of building per MW: ten benchmark buildings in the precedent catalogue.`);
}
function mathNeeds(mw,fac,f){
  const pl=plantPerMW(false), plR=plantPerMW(true), p=R.plant;
  return mathBox([
    `Average power at the meter: ${mw} MW × PUE ${R.pue[0]} = ${n1(fac[0])} MW; × ${R.pue[1]} = <b>${n1(fac[1])} MW</b>.`,
    `Plant space, dry coolers: (UPS ${p.ups[0]}–${p.ups[1]} + batteries ${p.batt[0]} + dry coolers ${p.dry[0]}) = ${pl[0].toFixed(1)}–${pl[1].toFixed(1)} m² per MW; × ${mw} = <b>${n0(pl[0]*mw)}–${n0(pl[1]*mw)} m²</b>.`,
    `With heat recovery, add heat pumps ${p.hp[0]} + CDUs ${p.cdu[0]} = ${plR[0].toFixed(1)}–${plR[1].toFixed(1)} m² per MW; × ${mw} = <b>${n0(plR[0]*mw)}–${n0(plR[1]*mw)} m²</b>.`,
    `Standby fuel: ${n1(fac[0])}–${n1(fac[1])} MW × 1,000 (kW) × ${R.fuelHours} h × ${R.fuelLkWh} L per kWh = <b>${n0(fac[0]*1000*R.fuelHours*R.fuelLkWh)}–${n0(fac[1]*1000*R.fuelHours*R.fuelLkWh)} L</b>.`
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
  h+=`<h3>Floor area</h3><dl><dt>Available</dt><dd>${f.fullCover?'up to ':''}${rng(f.gross[0],f.gross[1],'m²')}${f.fullCover?` <span class="draft">— only if the building covers the whole lot; yards and setbacks not yet read for this zone</span>`:''}</dd><dt>How</dt><dd>${esc(f.how)}${f.heightCut?' <span class="draft">(the height limit holds fewer storeys than this floor area needs, so the figure is cut to what fits)</span>':''}</dd>
  ${f.ground?`<dt>Ground floor</dt><dd>${rng(f.ground[0],f.ground[1],'m²')} — this zone allows no data storage at grade</dd>`:''}
  ${f.floorsR&&A.built==='new'?`<dt>Storeys</dt><dd>about ${st} (6.0 m ground; 5.5–6.0 m for each data-hall floor, as built and proposed halls show; within ${f.envH} m)</dd>`:''}</dl>${src('env')}
  <h3>Room for servers</h3><dl>${f.hallL?`<dt>Data hall</dt><dd>${rng(f.hallS[0],f.hallS[1],'m²')} <span class="draft">if the ground floor holds none of the data centre</span></dd>
  <dt></dt><dd>${rng(f.hallL[0],f.hallL[1],'m²')} <span class="draft">if support rooms (electrical, generators, loading) may sit on the ground floor — for the City to confirm</span></dd>`:`<dt>Data hall</dt><dd>${rng(f.hall[0],f.hall[1],'m²')}</dd>`}
  <dt>Share of floor</dt><dd>48–72% (Burlington plan set; its own figures disagree)</dd></dl>${src('hall')}
  <h3>Largest data centre that fits</h3><p style="font-size:22px;font-weight:300;margin:4px 0">${rng(f.mw[0],f.mw[1],'MW')} <span class="sub">of servers</span></p>
  ${f.mwL?`<p class="sub">${rng(f.mwS[0],f.mwS[1],'MW')} on the strict reading; ${rng(f.mwL[0],f.mwL[1],'MW')} if support may sit on the ground floor.</p>`:''}
  <p class="sub">${fmt(f.m2MW[0])}–${fmt(f.m2MW[1])} m² of hall per MW, as five built Canadian halls report (operator claims, mostly 5–10 kW per rack). Denser liquid-cooled halls fit more; LBNL's models span 186–2,325.</p>
  ${f.mwCheck?`<p class="sub">Check against whole buildings: ten built or approved data centres with public records use ${fmt(R.grossPerMW[0])}–${fmt(R.grossPerMW[1])} m² of building per MW of IT. This floor area at those rates gives ${rng(f.mwCheck[0],f.mwCheck[1],'MW')}.</p>`:''}${src('size')}${mathFits(f)}
  <div class="q"><div class="lab">Size to test: <b id="mwv">${mw}</b> MW of servers · <span id="mwn" class="sub">${esc(near(mw))}${over(mw)}</span></div>
   <div class="mwtrack"><div class="band" style="left:${pos01(f.mw[0])}%;width:${Math.max(1,pos01(f.mw[1])-pos01(f.mw[0]))}%" title="what fits here"></div>
   ${cases.map((c,i)=>`<div class="tick${i%2?' alt':''}" style="left:${pos01(c.mw)}%"><span>${esc(c.n)}</span></div>`).join('')}
   <input id="mw" type="range" min="0" max="${ST.length-1}" step="1" value="${ST.indexOf(mw)}" aria-label="Size to test, MW" aria-valuetext="${mw} MW"></div>
   <div class="mwscale">${[0.1,1,10,40].map(v=>`<span style="left:${pos01(v)}%">${v}${v===40?' MW':''}</span>`).join('')}</div>
   <div class="src">Bar under the track: what fits here. Ticks: built or proposed sites, operator or applicant figures. Steps widen as size grows.</div></div>
  <h3>What that size needs</h3><dl>
  <dt>Average power drawn</dt><dd>${rng(fac[0],fac[1],'MW')} at the meter (servers × PUE 1.4–1.55; PUE is a yearly average, so peak demand is higher)</dd>
  <dt>Plant space</dt><dd>${rng(pl[0]*mw,pl[1]*mw,'m²')} with dry coolers; ${rng(plR[0]*mw,plR[1]*mw,'m²')} with heat recovery — equipment only, before clearances</dd>
  <dt>Standby fuel</dt><dd>${rng(fuel[0],fuel[1],'L')} for 12 h; a ${pos==='ground'?'first-storey':'basement or upper-storey'} room may hold ${fmt(fuelLim)} L${fuel[1]>fuelLim?' — <span class="draft">more than one room or an outdoor tank</span>':''}</dd>
  <dt>Electrical service</dt><dd>${esc(svc)}</dd>
  ${f.downtown?`<dt>Grid</dt><dd class="draft">Downtown: no new feeder positions from fiscal 2027 until the new West End substation (expected July 2032).</dd>`:''}
  ${pos==='upper'?`<dt>Floor strength</dt><dd class="draft">Office floors above grade are designed for 2.4 kPa; equipment rooms need at least 3.6 kPa, and data halls their actual load — likely strengthening.</dd>`:''}
  </dl>${src('pue')}${src('plant')}${src('fuel')}${src('svc')}${f.downtown?src('grid2'):''}${pos==='upper'?src('floor'):''}${mathNeeds(mw,fac,f)}
  <div class="next"><button id="toRecv">What it exchanges →</button><span class="sub">Heat, energy, water, materials and people, each in 3D.</span></div>
  <div class="draftnote">Draft wording (Claude) for J.B. Every range carries the register's confidence; nothing here is a design.</div>`;
  $('#side').innerHTML=h;
  $('#back').onclick=()=>{ BD.S.view2=null; BD.scene3d&&BD.scene3d.hide(); BD.card(); BD.draw(); };
  $('#mw').oninput=e=>{ const v=ST[+e.target.value]; $('#mwv').textContent=v; $('#mwn').textContent=near(v)+over(v); e.target.setAttribute('aria-valuetext',v+' MW'); };
  $('#mw').onchange=e=>{ A.mw=ST[+e.target.value]; fitsView(); };
  $('#toRecv').onclick=()=>tabView('heat');
  BD.draw();
}

/* ---------- who could take the heat ---------- */
const TYPE={housing:'Non-market housing',school:'School',care:'Care home',hospital:'Hospital',rec:'Recreation centre',pool:'Pool',arena:'Indoor arena'};
const FIRM={completed:'existing','under construction':'committed',approved:'planned',proposed:'proposed'};
function nearby(f,d){ const out=[]; for(const p of d.pts){ const dist=Math.hypot(p.x-f.c[0],p.y-f.c[1]); const reach=R.reach[p.t]||R.reachGuide; if(dist<=reach) out.push(Object.assign({dist,reach,guide:!R.reach[p.t]},p)); } return out.sort((a,b)=>a.dist-b.dist); }
function netsAt(f,d){ return d.nets.map(n=>{ const inside=BD.pip(f.c[0],f.c[1],n.r); const e=distToRing(f.c[0],f.c[1],n.r); return Object.assign({inside,edge:e},n); }).filter(n=>n.inside||n.edge<1200); }
async function recvView(){
  const f=siteFacts(); BD.S.view2='recv'; const d=await loadRecv(f.city); const near=nearby(f,d), nets=netsAt(f,d);
  const by={}; near.forEach(p=>(by[p.t]=by[p.t]||[]).push(p));
  let h=tabBar('heat')+`<h2>Who could take the heat</h2>
  <p class="draft">Candidates, not commitments: places whose type of demand could use low-grade heat, within the distance at which a pipe has paid back elsewhere. Each still has to pass its own tests.</p>`;
  if(nets.length) h+=nets.map(n=>`<h3>District energy</h3><p><b>${esc(n.n)}</b> — ${n.edge<50?'<span class="draft">on the edge of its service area (within the ±45 m of the tracing) — check the schedule for this lot</span>':n.inside?'<span class="draft">inside its service area</span>':`${kmOrM(n.edge)} outside its service area`}</p><p class="sub">${esc(n.note)}</p>${src('neu')}`).join('');
  if(f.downtown) h+=`<h3>Downtown steam</h3><p class="sub">Creative Energy's steam network serves more than 200 downtown buildings (BCUC G-310-21A). Its service area is not published as a map, so it is not drawn. Steam needs far hotter heat than a data centre gives off.</p>`;
  const order=['housing','school','care','hospital','pool','rec','arena'];
  h+=`<h3>Buildings within reach</h3>`;
  if(!near.length) h+=`<p class="sub">None of the recorded receiver types within reach.</p>`;
  for(const t of order){ const L=by[t]; if(!L) continue;
    h+=`<div style="margin-top:10px"><b>${esc(TYPE[t])}</b> <span class="sub">${L.length} within ${kmOrM(L[0].reach)}${L[0].guide?' (no published reach for this type — the housing figure is used as a guide)':''}${t==='arena'?' · an ice plant is also a heat source':''}</span>
    <ul style="margin:4px 0 0;padding-left:18px;font-size:13px">${L.slice(0,5).map(p=>`<li>${esc(p.n||'—')} <span class="sub">${kmOrM(p.dist)}${p.u?` · ${p.u} homes`:''}${p.s&&FIRM[p.s]?` · ${FIRM[p.s]}`:''}</span></li>`).join('')}${L.length>5?`<li class="sub">and ${L.length-5} more</li>`:''}</ul></div>`; }
  h+=`${src('reach')}${src('recv')}<p class="sub" style="margin-top:10px">${f.city==='van'?'Vancouver pools and rinks are not separate records in the national database; recreation centres may contain them. Private housing and offices are not mapped yet.':'Edmonton care homes and most hospitals have no location in the national record; private housing and offices are not mapped yet.'}</p>
  <div class="draftnote">Draft wording (Claude) for J.B.</div>`;
  $('#side').innerHTML=h; wireTabs(); BD.draw();
  const A=BD.S.answers; show3d('heat',{site:f,near,nets,plantRecover:plantPerMW(true)[1]*(A.mw||1)});
}

/* ---------- round 3: three options, trade-off tables by party ---------- */
function optionSet(f,near,nets){
  const top=f.mw[1], A=BD.S.answers, chosen=A.mw||top/2;
  const net=nets.find(n=>n.inside&&n.edge>=50);
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
    const net=nets.find(n=>n.inside&&n.edge>=50); if(o.to==='net'&&net) r.credit=r.avail.map(v=>v*R.neuCredit);
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
function state(k){ return `<span class="st st-${k}" title="${esc({met:'met',chg:'met with a change',not:'not met',cj:'cannot judge'}[k])}"></span>`; }
async function optionsView(){
  const f=siteFacts(); BD.S.view2='opts'; const d=await loadRecv(f.city); const near=nearby(f,d), nets=netsAt(f,d);
  const opts=optionSet(f,near,nets).map(o=>Object.assign(o,{r:calc(o,f,near,nets)}));
  const zs=f.status.k, zState=zs==='yes'?'met':zs==='case'?'chg':zs==='site'?'cj':'chg';
  const net=nets.find(n=>n.inside);
  const rows=[
   ['The operator',[
     ['Servers',o=>o.mw.toFixed(1)+' MW'],
     ['Plant space',o=>rng(o.r.plant[0],o.r.plant[1],'m²')+' (equipment only)'],
     ['Standby fuel, 12 h',o=>rng(o.r.fuel[0],o.r.fuel[1],'L')],
     ['Zoning path',()=>`${state(zState)}${esc(f.status.t)}${zs==='no'?' — about 15 months to a Vancouver decision':''}`]]],
   ['The utility and the grid',[
     ['Power drawn',o=>rng(o.r.fac[0],o.r.fac[1],'MW')],
     ['Electricity a year',o=>rng(o.r.facMWh[0]/1000,o.r.facMWh[1]/1000,'GWh')],
     ['Grid connection',()=>f.downtown?`${state('not')}no new downtown feeders before 2032 — moved by city-scale infrastructure or time`:`${state('cj')}needs the utility's answer to a load application`]]],
   ['Receivers',[
     ['Heat offered after the heat pump',o=>o.recover?rng(o.r.avail[0]/1000,o.r.avail[1]/1000,'GWh/yr'):`${state('not')}none — air-cooled heat at 25–35 °C goes to the air`],
     ['Equal to the heating of',o=>o.recover?rng(o.r.homes[0],o.r.homes[1],'homes')+' (space and hot water, provincial average)':'—'],
     ['Within reach',o=>o.to==='net'&&net?`${state(net.edge<50?'cj':'chg')}${esc(net.n)} — ${net.edge<50?'on the edge of the service area':'compulsory connection; heat sent back is credited'}`:o.recover?`${state(near.length?'met':'not')}${near.length} candidate${near.length===1?'':'s'}`:'—'],
     ['How much they would take',o=>o.recover?`${state('cj')}needs each receiver's monthly demand — a year of heat is mostly needed in winter (about ${f.city==='van'?'3.9':'3.3'} : 1 between the busiest and quietest month)`:'—'],
     ['Other source already serving',()=>net?`${state('chg')}the NEU runs mostly on sewage heat`:`${state('cj')}not known for these buildings`],
     ['Price for the heat',o=>o.r.credit?`$${fmt(o.r.credit[0])}–$${fmt(o.r.credit[1])} a year at the NEU's credit ($32.59/MWh)`:o.recover?`${state('cj')}${f.city==='van'?'no published price outside the NEU':'no published price; Edmonton\'s district energy prices at the gas-equivalent cost plus avoided boiler costs'}`:'—']]],
   ['The climate',[
     ['Heat-pump electricity',o=>o.recover?rng(o.r.hp[0]/1000,o.r.hp[1]/1000,'GWh/yr')+' → '+rng(o.r.co2[0],o.r.co2[1],'t CO₂e/yr'):'—'],
     ['Against what it replaces',o=>o.recover?`${state('cj')}depends on how the receivers heat now (gas, electric, district)`:'—']]],
   ['Neighbours',[[noiseRow(f)[0],()=>noiseRow(f)[1]],['Generator testing',()=>f.city==='van'?'exempt if ≤ 1 h a month in daytime, ≤ 80 dBA':'—']]],
   ['Workers',[['Operating jobs',o=>rng(o.r.jobs[0],o.r.jobs[1],'')+' (Virginia ratio, transferred)']]],
  ];
  const fut=o=>[['As planned','the table above'],['Tenant changes cooling',o.recover?'back to air: heat offered drops to none':'to liquid: heat could be offered'],['Tenant leaves',o.recover?'receivers fall back on their own heating at full peak':'nothing depends on it'],['Receiver leaves',o.recover?'all heat goes back to the dry coolers — keep their full size':'—']].map(([a,b])=>`<div><b>${a}</b> <span class="sub">${b}</span></div>`).join('');
  let h=tabBar('opts')+`<h2>Three options, side by side, in no order</h2>
  <p class="draft">Each option gains something and gives something up. Read across a row to compare; nothing is added up and nothing wins.</p>
  <div class="opts">${opts.map(o=>`<div class="opt"><div class="kind">${o.id.toUpperCase()}</div><b>${esc(o.name)}</b><div class="sub">${esc(o.gives)}</div></div>`).join('')}</div>
  <div class="tt"><table><thead><tr><th></th>${opts.map(o=>`<th>${o.id.toUpperCase()}</th>`).join('')}</tr></thead><tbody>`;
  for(const [party,rr] of rows){ h+=`<tr class="party"><td colspan="${opts.length+1}">${esc(party)}</td></tr>`;
    for(const [lab,fn] of rr){ const c=opts.map(o=>fn(o)); h+=c.every(x=>x===c[0])?`<tr><td>${esc(lab)}</td><td colspan="${opts.length}">${c[0]}</td></tr>`:`<tr><td>${esc(lab)}</td>${c.map(x=>`<td>${x}</td>`).join('')}</tr>`; } }
  h+=`</tbody></table></div>
  <h3>Four futures</h3><div class="opts">${opts.map(o=>`<div class="opt"><div class="kind">${o.id.toUpperCase()}</div>${fut(o)}</div>`).join('')}</div>
  <div class="legend2">${state('met')}met ${state('chg')}met with a change ${state('not')}not met ${state('cj')}cannot judge yet</div>
  ${src('pue')}${src('lf')}${src('cap')}${src('cop')}${src('homes')}${src('grid')}${net?src('neu'):''}${src('noise')}${src('jobs')}
  <div class="draftnote">Draft wording and option names (Claude) for J.B. Ranges carry the register's confidence; "cannot judge" names what is missing.</div>`;
  $('#side').innerHTML=h; document.body.classList.add('wide'); wireTabs(); BD.draw();
  if(BD.scene3d) BD.scene3d.showOptions(opts.map(o=>({id:o.id,name:o.name,recover:o.recover,to:o.to,n:o.id==='c'?14:6,plant:plantPerMW(o.recover)[1]*o.mw,
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
BD.legendRecv=function(){ return `<div style="margin-top:6px"><i style="border:1px dashed #d1a35e"></i>District energy service area (traced)</div>
 <div><i style="background:#c8c2b8;width:8px;height:8px"></i>Non-market housing <i style="background:#a7b4d6;width:8px;height:8px;margin-left:6px"></i>School</div>
 <div><i style="background:#b9a3cf;width:8px;height:8px;border-radius:50%"></i>Care, hospital <i style="background:#7fb2c4;width:8px;height:8px;border-radius:50%;margin-left:6px"></i>Recreation, pool <i style="background:#9fb38a;width:8px;height:8px;border-radius:50%;margin-left:6px"></i>Arena</div>`; };

/* ---------- the exchange tabs (J.B., 15 Oct): heat · energy · water · materials · social · options; each with a 3D view ---------- */
const TABS=[['heat','Heat'],['energy','Energy'],['water','Water'],['materials','Materials'],['social','People'],['opts','Options']];
function tabBar(cur){ BD.S.tab=cur; return `<button class="x" id="back">← What fits</button><div class="kind">What it exchanges · ${BD.S.answers.mw||''} MW of servers</div><div class="tabs" role="tablist">${TABS.map(([k,l])=>`<button role="tab" data-tab="${k}" aria-selected="${k===cur}">${l}</button>`).join('')}</div>`; }
function wireTabs(){ document.querySelectorAll('#side .tabs button').forEach(b=>b.onclick=()=>tabView(b.dataset.tab)); $('#back').onclick=()=>{ document.body.classList.remove('wide'); BD.scene3d&&BD.scene3d.hide(); fitsView(); }; }
function tabView(k){ document.body.classList.remove('wide'); BD.S.view2='tab'; ({heat:recvView,energy:energyView,water:waterView,materials:materialsView,social:socialView,opts:optionsView}[k])(); }
function show3d(tab,data){ if(!BD.scene3d) return; BD.scene3d.show(tab,data).catch(e=>{ const n=document.getElementById('st'); if(n) n.textContent='3D view could not load: '+e.message; }); }
function roofArea(f){ const A=BD.S.answers; if(A.built==='new'&&BD.S.sel.ring) return BD.area(BD.S.sel.ring)*0.86*0.86; return f.plate||f.foot||0; }
const SRC3={
 elec:'register: electricity_price (BC Hydro LGS rates from 1 Jul 2026; AESO pool 2025)', pv:'register: pv_roof (NRCan 2006 yield, upper bound for flat arrays; NREL module density and roof suitability)',
 batt:'register: battery (NREL ATB 2024; Reber 2023 34 ± 15 kWh/m²)', ups:'register: ups_flex (vendor runtimes — operator claims)', dr:'register: peak_relief (BC Hydro Demand Response for Business; AESO reserves)',
 ev:'register: ev_stalls, ev_area (charger ratings; Vancouver and Edmonton parking dimensions)', gen:'register: genset_test (AUC 27938-D01-2023, derived; AP-42 Table 3.4-1 upper bounds)', ctl:'register: workload_control (Crozier & Liska 2025)',
 evap:'register: evaporation, blowdown (physics: heat ÷ latent heat; cycles of concentration 2–6, FEMP/EPA)', wbe:'register: water_behind_electricity (US thermoelectric ~1.25 L/kWh; hydro ~16.8 L/kWh)', rain:'register: rainwater (ECCC Normals 1991–2020; CSA B805 method; runoff coefficient 0.8 assumed)',
 reuse:'register: a_reuse_rules, reclaimed_makeup (VBBL 2025; Metro Vancouver UT-019; EPCOR)', wprice:'register: water_supply (City of Vancouver 2026 rates)', sewer:'register: sewer_sink (Bylaw 299 limits; KWL 2014)',
 srv:'LBNL 2024: about 600 W per server (register: servers)', ew:'register: ewaste (server masses 21.25–26.3 kg, 6-year refresh)', cu:'register: copper_tonnes (Copper Development Association 2023 — industry figure)',
 eit:'register: embodied_it (Dell R760 life-cycle assessment 2025 — manufacturer)', eb:'register: embodied_building (461 kg CO₂e/m² median; no data-centre benchmark)',
 snd:'register: noise_level (screen Lp = Lw − 20 log r − 8; Trane RTAF 333–1,010 kW, Eurovent: Lw 91–101 dBA per unit)', lf:'register: lf_flag (AUC Rule 012 s. 4.5)', light:'register: light_at_window (CIE 150:2017; Edmonton Bylaw 20001 s. 5.120(3); Vancouver: no lux limit)',
 so:'register: standoff (Ontario GO-ITS 25.18, transferred)', watch:'register: watched_area (field observation, labelled as one person\'s)', ppl:'register: people_affected (census download pending — a gap)',
};
const s3=k=>`<div class="src">${esc(SRC3[k])}</div>`;
function energyView(){
  const f=siteFacts(), A=BD.S.answers, mw=A.mw||1, fac=[mw*R.pue[0],mw*R.pue[1]], MWh=[fac[0]*8760*R.lf,fac[1]*8760*R.lf];
  const roof=roofArea(f), plant=plantPerMW(false)[1]*mw, share=Math.min(0.9,roof?plant/roof:0);
  const kwp=[roof*0.66*(1-share)*0.70*0.16,roof*0.66*(1-share)*0.70*0.20], yld=f.city==='van'?1009:1245, pvMWh=kwp.map(v=>v*yld/1000);
  const co2=MWh.map(v=>v*R.grid[f.city]/1000);
  const cost=f.city==='van'?[MWh[0]*1000*0.0679+fac[0]*1000*13.83*12,MWh[1]*1000*0.0679+fac[1]*1000*13.83*12]:null;
  const ups=[mw*1/60*0.5,mw*5/60*0.5], gen=[fac[0]*1000*4,fac[1]*1000*4];
  let h=tabBar('energy')+`<h2>Power in, power offered</h2><p class="draft">The data centre is the grid's customer first. What it could offer back is flexibility — and only whoever runs the computing can give that.</p>
  <h3>What it draws</h3><dl><dt>Power at the meter</dt><dd>${rng(fac[0],fac[1],'MW')}</dd><dt>Electricity a year</dt><dd>${rng(MWh[0]/1000,MWh[1]/1000,'GWh')} at an average load of 60% of peak</dd>
  ${cost?`<dt>Cost a year</dt><dd>about $${(cost[0]/1e6).toFixed(1)}–${(cost[1]/1e6).toFixed(1)} million if served on BC Hydro's large general service (6.79 ¢/kWh + $13.83/kW a month); very large loads move to transmission rates</dd>`:`<dt>Price</dt><dd>Alberta pool averaged $43.68/MWh in 2025, plus EPCOR distribution and transmission charges</dd>`}
  <dt>Carbon of that electricity</dt><dd>${rng(co2[0],co2[1],'t CO₂e/yr')} at ${R.grid[f.city]} g/kWh (average, consumption)</dd>
  <dt>Grid connection</dt><dd>${f.downtown?`${state('not')}no new downtown feeder positions before the West End substation (expected July 2032)`:`${state('cj')}needs the utility's answer to a load application; the grid can add 12–36 months`}</dd></dl>${s3('elec')}${src('grid')}${f.downtown?src('grid2'):''}
  <h3>Solar on its own roof</h3><dl><dt>Roof</dt><dd>${fmt(roof)} m², of which plant takes about ${Math.round(share*100)}%</dd><dt>Panels</dt><dd>${rng(kwp[0],kwp[1],'kWp')} → ${rng(pvMWh[0],pvMWh[1],'MWh/yr')}</dd><dt>Share of its own use</dt><dd>${rng(pvMWh[0]/MWh[1]*100,pvMWh[1]/MWh[0]*100,'%')} — a small share at data-centre densities</dd></dl>${s3('pv')}
  <h3>What it could offer the grid</h3><dl>
  <dt>Who decides</dt><dd>${state('cj')}only whoever runs the computing; in a shared (colocation) building that is each tenant. Training runs can pause at checkpoints; live services cannot.</dd>
  <dt>The batteries it already has</dt><dd>${rng(ups[0],ups[1],'MWh')} for minutes (1–5 min of runtime, half kept for outages) — fast grid support, not a 4-hour peak; BC Hydro's storage incentive excludes an existing UPS</dd>
  <dt>A battery added for the grid</dt><dd>1 MW for 4 h takes ${fmt(4000/49)}–${fmt(4000/19)} m²; BC Hydro pays $50/kW a season for winter peak relief (fossil generators excluded)</dd>
  <dt>EV charging, if 1 MW were set aside</dt><dd>${fmt(500/19.2)}–${fmt(500/7.4)} Level 2 stalls (7.4–19.2 kW at a 0.5 diversity), about ${fmt(500/19.2*22)}–${fmt(500/7.4*22)} m² of parking</dd></dl>${s3('ctl')}${s3('ups')}${s3('batt')}${s3('dr')}${s3('ev')}
  <h3>Standby generators</h3><dl><dt>Testing</dt><dd>about 4 full-load hours a year: ${rng(gen[0]*0.706/1000,gen[1]*0.706/1000,'t CO₂')} and ${rng(gen[0]*14.6/1000,gen[1]*14.6/1000,'kg NOₓ')} a year (uncontrolled-engine upper bound)</dd></dl>${s3('gen')}
  <div class="draftnote">Draft wording (Claude) for J.B. Ranges carry the register's confidence.</div>`;
  $('#side').innerHTML=h; wireTabs(); BD.draw();
  show3d('energy',{site:f,plant,pvKwp:kwp[1],battM2:4000/34,grid:f.downtown?'downtown grid: no new feeders before 2032':''});
}
function waterView(){
  const f=siteFacts(), A=BD.S.answers, mw=A.mw||1, fac=[mw*R.pue[0],mw*R.pue[1]], MWh=[fac[0]*8760*R.lf,fac[1]*8760*R.lf];
  const towers=A.cooling==='towers'; const evap=MWh.map(v=>v*1000*1.5/1000); // m³: ≤ 1.5 L/kWh of heat
  const mk=[evap[1]*(1+1/(6-1)),evap[1]*(1+1/(2-1))], bd=[evap[1]/(6-1),evap[1]/(2-1)];
  const roof=roofArea(f), mm=f.city==='van'?1159.5:422.5, rain=roof*mm/1000*0.8;
  const wbe=[MWh[0]*1000*1.25/1000,MWh[1]*1000*16.8/1000];
  let h=tabBar('water')+`<h2>Water in, water out</h2><p class="draft">A data centre can use almost no water on site, or a great deal — it depends on how it rejects heat. The water behind its electricity is a separate question.</p>
  <div class="q"><div class="lab">How it rejects heat</div><div class="seg" data-c="1"><button data-v="dry" aria-pressed="${!towers}">Dry coolers</button><button data-v="towers" aria-pressed="${towers}">Cooling towers</button></div></div>
  <h3>On site</h3><dl>${towers?`<dt>Evaporated</dt><dd>up to ${fmt(evap[1])} m³/yr (at most 1.5 L per kWh of heat)</dd><dt>Make-up water</dt><dd>${fmt(mk[0])}–${fmt(mk[1])} m³/yr at 2–6 cycles of concentration</dd><dt>Blowdown to the sewer</dt><dd>${fmt(bd[0])}–${fmt(bd[1])} m³/yr</dd>${f.city==='van'?`<dt>Water bill</dt><dd>about $${fmt(mk[0]/2.832*4.091)}–$${fmt(mk[1]/2.832*5.128)} a year for the make-up water alone (2026 rates, per 2.832 m³ unit)</dd>`:''}`:`<dt>Evaporated</dt><dd>none for cooling — dry coolers reject heat to the air; their fans are the trade (sound, roof space)</dd>`}
  <dt>Rain on the roof</dt><dd>about ${fmt(rain)} m³/yr from ${fmt(roof)} m² at ${mm} mm a year</dd></dl>${s3('evap')}${f.city==='van'?s3('wprice'):''}${s3('rain')}
  <h3>Behind its electricity</h3><dl><dt>Water used to make its power</dt><dd>${fmt(wbe[0])}–${fmt(wbe[1])} m³/yr (thermal plants ~1.25 L/kWh; hydro reservoirs ~16.8 L/kWh — mostly evaporation from reservoirs)</dd></dl>${s3('wbe')}
  <h3>Other sources and their rules</h3><dl><dt>Reclaimed water</dt><dd>${f.city==='van'?'Metro Vancouver considers supply to industry case by case; no rate':'EPCOR supplied 4,226 ML of reclaimed water to industry in 2024 (Gold Bar)'}</dd>
  <dt>Neighbours' greywater</dt><dd>${f.city==='van'?'not allowed as a cooling source under the Building By-law; residential systems only (2025)':'needs a variance in Alberta'}</dd>
  <dt>The sewer as a heat sink</dt><dd>warm water to the sewer must stay below 40 °C at the plant; heat taken from sewage needs a letter of support, first come first served</dd></dl>${s3('reuse')}${s3('sewer')}
  <div class="draftnote">Draft wording (Claude) for J.B.</div>`;
  $('#side').innerHTML=h; wireTabs(); document.querySelectorAll('#side .seg[data-c] button').forEach(b=>b.onclick=()=>{ A.cooling=b.dataset.v; waterView(); }); BD.draw();
  show3d('water',{site:f,plant:plantPerMW(false)[1]*mw,rain,towers,evap:towers?fmt(evap[1])+' m³/yr':''});
}
function materialsView(){
  const f=siteFacts(), A=BD.S.answers, mw=A.mw||1, racks=mw*1000/R.kWPerRack, servers=mw*1000/0.6;
  const ew=[servers*21.25/6/1000,servers*26.3/6/1000], cu=[mw*20,mw*40], eit=[servers*4.177*0.10/6,servers*4.177*0.15/6], eb=f.gross[1]*0.461;
  let h=tabBar('materials')+`<h2>What it is made of, and how often</h2><p class="draft">The building can last decades; the servers inside are replaced about every six years. That rhythm is where its materials go.</p>
  <h3>The equipment</h3><dl><dt>Racks</dt><dd>about ${fmt(racks)} at 8 kW each</dd><dt>Servers</dt><dd>about ${fmt(servers)} at 600 W each</dd>
  <dt>Electronic waste</dt><dd>${rng(ew[0],ew[1],'t/yr')} of servers alone, on a six-year refresh</dd><dt>Copper</dt><dd>${fmt(cu[0])}–${fmt(cu[1])} t in the facility (industry figure)</dd>
  <dt>Embodied carbon, servers</dt><dd>${rng(eit[0],eit[1],'t CO₂e/yr')} — the manufacturing share (10–15%) of one manufacturer's server assessment, spread over six years; uncertainty is large</dd></dl>${s3('srv')}${s3('ew')}${s3('cu')}${s3('eit')}
  <h3>The building</h3><dl>${A.built==='existing'?`<dt>Reuse</dt><dd>an existing building keeps its structure; precedents: 515 W Hastings offices (2023), Edmonton office and warehouse conversions</dd><dt>Watch for</dt><dd>floor strength, floor-to-floor height and room for plant</dd>`:`<dt>Embodied carbon, building</dt><dd>about ${fmt(eb)} t CO₂e for ${fmt(f.gross[1])} m² at 461 kg/m² — a general building median; no data-centre benchmark exists</dd>`}
  <dt>Lifespans</dt><dd>servers ~6 years · cooling and heat pumps 15–25 · shell up to 40 · pipe network 40–50</dd></dl>${A.built==='existing'?'':s3('eb')}
  <div class="draftnote">Draft wording (Claude) for J.B.</div>`;
  $('#side').innerHTML=h; wireTabs(); BD.draw();
  show3d('materials',{site:f,racks});
}
function socialView(){
  const f=siteFacts(), A=BD.S.answers, mw=A.mw||1, fac=mw*R.pue[1]; const n=Math.max(1,Math.ceil(fac));
  const lw=[91+10*Math.log10(n),101+10*Math.log10(n)];
  const lim=f.city==='van'?(/^(MC-1|MC-2|DD|M-1|M-1A|M-1B|M-2|IC-1|IC-2|IC-3|I-1|I-1A|I-1B|I-1C|I-2|I-3|I-4|CWD|DEOD)$/.test(f.zone)?55:/^(C-|FC-|FCCDD|BCPED|HA-|R3-|R4-|R5-|RR-3)/.test(f.zone)?50:45):50;
  const dist=lw.map(L=>Math.pow(10,(L-8-lim)/20));
  // neighbours within that distance (buildings from the loaded tiles)
  const S=BD.S; let within=[0,0];
  for(const id in S.tiles){ if(!id.startsWith(S.city+':')) continue; for(const b of S.tiles[id].bld){ if(b.f===3||(f.blds||[]).includes(b)) continue; const r=Math.hypot(b.c[0]-f.c[0],b.c[1]-f.c[1]); if(r<=dist[0]) within[0]++; if(r<=dist[1]) within[1]++; } }
  const d=BD.recv[f.city]||{pts:[]}; const homes=d.pts.filter(p=>p.t==='housing'&&Math.hypot(p.x-f.c[0],p.y-f.c[1])<=200).reduce((t,p)=>t+(p.u||0),0);
  const key='bd-notes-'+S.city+'-'+S.sel.id; let notes=''; try{ notes=localStorage.getItem(key)||''; }catch(e){}
  let h=tabBar('social')+`<h2>What neighbours would hear, see and feel</h2><p class="draft">Described as experienced, not scored. Measured where the data allows; your site observations sit beside it, labelled as yours.</p>
  <h3>Sound</h3><dl><dt>Cooling plant</dt><dd>about ${n} unit${n>1?'s':''} rated ${rng(lw[0],lw[1],'dBA')} together (low-noise to standard)</dd>
  <dt>Night limit</dt><dd>${lim} dBA at a ${f.city==='van'?'quiet-zone home':'home'}</dd><dt>Reached at</dt><dd>${fmt(dist[0])}–${fmt(dist[1])} m from the plant, before walls, barriers or enclosures</dd>
  <dt>Buildings inside that distance</dt><dd>${within[0]}–${within[1]} — in the 3D view, red: over the limit even with low-noise units; accent: over only with standard units</dd>
  <dt>Low hum</dt><dd>a tonal low-frequency sound adds 5 dBA in Alberta's rule — the kind neighbours describe most</dd></dl>${s3('snd')}${s3('lf')}${src('noise')}
  <h3>The edge</h3><dl><dt>Standoff</dt><dd>new facilities keep about 10 m between the building and the public (45 m enhanced) — a fence, bollards or a blank setback, as experienced from the street</dd>
  <dt>Ground floor</dt><dd>${f.ground?'this zone keeps the ground floor for other uses: it could meet the street':'nothing in the zone requires another use at grade'}</dd>
  <dt>Watched area</dt><dd>${state('cj')}seen only on site: cameras and signs visible from public space, recorded as one person's account</dd>
  <dt>Light at night</dt><dd>${f.city==='van'?'Vancouver sets no lux limit':'Edmonton requires light directed downward and away (no number)'}; the international reference is 10 lx before and 2 lx after curfew at a window</dd></dl>${s3('so')}${s3('watch')}${s3('light')}
  <h3>Who is near</h3><dl><dt>Non-market homes within 200 m</dt><dd>${fmt(homes)} (City list; private housing not counted)</dd><dt>People within reach</dt><dd>${state('cj')}census population not yet loaded</dd><dt>Work</dt><dd>${rng(Math.max(1,mw*f.m2MW[0]/R.hallShare[1]/R.jobsM2),mw*f.m2MW[1]/R.hallShare[0]/R.jobsM2,'')} operating jobs (Virginia ratio, transferred)</dd></dl>${s3('ppl')}${src('jobs')}
  <h3>Your observations on site</h3><textarea id="notes" rows="5" style="width:100%;background:var(--bg);border:1px solid var(--line-2);border-radius:6px;padding:8px;color:var(--fg)" placeholder="What did you hear, see and feel at the edge? Time of day, where you stood.">${esc(notes)}</textarea><div class="src">Kept in this browser only; shown as your observation, never as a measurement.</div>
  <div class="draftnote">Draft wording (Claude) for J.B. Sound is a screening estimate: manufacturer-rated levels, no barriers, ground or buildings.</div>`;
  $('#side').innerHTML=h; wireTabs(); $('#notes').oninput=e=>{ try{ localStorage.setItem(key,e.target.value); }catch(err){} }; BD.draw();
  show3d('social',{site:f,plant:plantPerMW(false)[1]*mw,noise:{lw,limit:lim}});
}
BD.fitsView=fitsView; BD.recvView=recvView; BD.optionsView=optionsView; BD.tabView=tabView;
})();
