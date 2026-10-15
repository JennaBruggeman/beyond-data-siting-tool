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
 ftf:[6.0,4.0],                       // floor-to-floor ground / above, VBBL-zoned I-3 minimums (envelope)
 hallShare:[0.48,0.72],               // hall_area: Burlington calibration, one case
 m2PerRack:[3.7,13.9], kWPerRack:8,   // size_fit: LBNL prototypes; Uptime 2024 survey average (industry)
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
 env:'formula register: envelope (zone schedules; sources 17, 18)', hall:'register: hall_area (one calibration case, confidence 50)',
 size:'register: size_fit (LBNL prototypes 3.7–13.9 m² per rack; Uptime 2024 average 8 kW per rack, industry survey)',
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
  const env=f.env||(city==='van'?R.envVan['I-2']:R.envEdm.IM); f.envAssumed=!f.env; f.envH=env.h;
  const floorsNew=1+Math.max(0,Math.floor((env.h-R.ftf[0])/R.ftf[1]));
  if(A.built==='new'){
    const g=[f.lot*env.fsr[0],f.lot*env.fsr[1]]; f.floors=floorsNew;
    if(A.extent==='part'){ f.gross=[g[0]/floorsNew,g[1]/floorsNew]; f.how=`one floor of a new building: the zone's floor area ÷ ${floorsNew} storeys`; }
    else { f.gross=g; f.how=`lot ${fmt(f.lot)} m² × floor-space ratio ${env.fsr[0]===env.fsr[1]?env.fsr[0]:env.fsr[0]+'–'+env.fsr[1]}`; }
    if(env.ground&&A.extent!=='part'){ f.ground=[g[0]/floorsNew,g[1]/floorsNew]; f.hallGross=[g[0]-f.ground[0],g[1]-f.ground[1]]; } else f.hallGross=f.gross.slice();
  } else {
    if(!blds.length){ f.gross=[0,0]; f.hallGross=[0,0]; f.how='no building recorded on this lot'; }
    else if(city==='edm'&&a[5]){ const g=a[5]; f.gross=A.extent==='part'?[g/Math.max(1,Math.round(f.hmax/4)),g/Math.max(1,Math.round(f.hmax/4))]:[g,g]; f.how=A.extent==='part'?'one floor: assessed floor area ÷ estimated storeys':'assessed floor area (City of Edmonton)'; f.hallGross=f.gross.slice(); }
    else { const st=Math.max(1,Math.floor(f.hmax/4.0)); f.floors=st; f.gross=A.extent==='part'?[f.plate,f.plate]:[f.foot*st,f.foot*st];
      f.how=A.extent==='part'?`one floor ≈ the largest footprint on the lot (${fmt(f.plate)} m²)`:`footprint ${fmt(f.foot)} m² × about ${st} storeys (height ${f.hmax.toFixed(1)} m ÷ 4 m — an assumption)`; f.hallGross=f.gross.slice(); }
  }
  f.hall=[f.hallGross[0]*R.hallShare[0],f.hallGross[1]*R.hallShare[1]];
  const m2MW=[R.m2PerRack[0]/R.kWPerRack*1000,R.m2PerRack[1]/R.kWPerRack*1000];
  f.mw=[Math.min(40,f.hall[0]/m2MW[1]),Math.min(40,f.hall[1]/m2MW[0])]; f.m2MW=m2MW;
  return f;
}
function plantPerMW(recover){ const p=R.plant; let lo=p.ups[0]+p.batt[0]+p.dry[0], hi=p.ups[1]+p.batt[1]+p.dry[1]; if(recover){ lo+=p.hp[0]+p.cdu[0]; hi+=p.hp[1]+p.cdu[1]; } return [lo,hi]; }

/* ---------- round 2: what fits here ---------- */
function fitsView(){
  const f=siteFacts(), A=BD.S.answers; BD.S.view2='fits';
  if(!A.mw||A.mw>f.mw[1]||A.mw<Math.min(0.1,f.mw[0])) A.mw=+Math.max(0.1,Math.sqrt(Math.max(0.01,f.mw[0]*f.mw[1]))).toFixed(1);
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
  h+=`<h3>Floor area</h3><dl><dt>Available</dt><dd>${rng(f.gross[0],f.gross[1],'m²')}</dd><dt>How</dt><dd>${esc(f.how)}</dd>
  ${f.ground?`<dt>Ground floor</dt><dd>${rng(f.ground[0],f.ground[1],'m²')} kept for other uses — this zone allows no data storage at grade</dd>`:''}
  ${f.floors&&A.built==='new'?`<dt>Storeys</dt><dd>about ${f.floors} (6.0 m ground, 4.0 m above, within ${f.envH} m)</dd>`:''}</dl>${src('env')}
  <h3>Room for servers</h3><dl><dt>Data hall</dt><dd>${rng(f.hall[0],f.hall[1],'m²')}</dd><dt>Share of floor</dt><dd>48–72% (one built case)</dd></dl>${src('hall')}
  <h3>Largest data centre that fits</h3><p style="font-size:22px;font-weight:300;margin:4px 0">${rng(f.mw[0],f.mw[1],'MW')} <span class="sub">of servers</span></p>
  <p class="sub">${fmt(f.m2MW[0])}–${fmt(f.m2MW[1])} m² of hall per MW at about 8 kW per rack. Denser liquid-cooled racks would fit more.</p>${src('size')}
  <div class="q"><div class="lab">Size to test: <b id="mwv">${mw}</b> MW of servers</div><input id="mw" type="range" min="0.1" max="${Math.max(0.2,f.mw[1]).toFixed(1)}" step="0.1" value="${mw}" style="width:100%" aria-label="Size to test, MW"></div>
  <h3>What that size needs</h3><dl>
  <dt>Power drawn</dt><dd>${rng(fac[0],fac[1],'MW')} at the meter (servers × PUE 1.4–1.55)</dd>
  <dt>Plant space</dt><dd>${rng(pl[0]*mw,pl[1]*mw,'m²')} with dry coolers; ${rng(plR[0]*mw,plR[1]*mw,'m²')} with heat recovery — equipment only, before clearances</dd>
  <dt>Standby fuel</dt><dd>${rng(fuel[0],fuel[1],'L')} for 12 h; a ${pos==='ground'?'first-storey':'basement or upper-storey'} room may hold ${fmt(fuelLim)} L${fuel[1]>fuelLim?' — <span class="draft">more than one room or an outdoor tank</span>':''}</dd>
  <dt>Electrical service</dt><dd>${esc(svc)}</dd>
  ${f.downtown?`<dt>Grid</dt><dd class="draft">Downtown: no new feeder positions from fiscal 2027 until the new West End substation (expected July 2032).</dd>`:''}
  ${pos==='upper'?`<dt>Floor strength</dt><dd class="draft">Office floors above grade are designed for 2.4 kPa; equipment rooms need at least 3.6 kPa, and data halls their actual load — likely strengthening.</dd>`:''}
  </dl>${src('pue')}${src('plant')}${src('fuel')}${src('svc')}${f.downtown?src('grid2'):''}${pos==='upper'?src('floor'):''}
  <div class="next"><button id="toRecv">Who could take the heat →</button></div>
  <div class="draftnote">Draft wording (Claude) for J.B. Every range carries the register's confidence; nothing here is a design.</div>`;
  $('#side').innerHTML=h;
  $('#back').onclick=()=>{ BD.S.view2=null; BD.card(); BD.draw(); };
  $('#mw').oninput=e=>{ $('#mwv').textContent=e.target.value; };
  $('#mw').onchange=e=>{ A.mw=+e.target.value; fitsView(); };
  $('#toRecv').onclick=()=>recvView();
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
  let h=`<button class="x" id="back">← What fits</button><div class="kind">Who could take the heat</div><h2>Within reach of the site</h2>
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
  <div class="next"><button id="toOpts">Three options →</button></div><div class="draftnote">Draft wording (Claude) for J.B.</div>`;
  $('#side').innerHTML=h; $('#back').onclick=()=>fitsView(); $('#toOpts').onclick=()=>optionsView(); BD.draw();
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
  let h=`<button class="x" id="back">← Receivers</button><div class="kind">Three options</div><h2>Side by side, in no order</h2>
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
  $('#side').innerHTML=h; document.body.classList.add('wide'); $('#back').onclick=()=>{ document.body.classList.remove('wide'); recvView(); }; BD.draw();
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
BD.fitsView=fitsView; BD.recvView=recvView; BD.optionsView=optionsView;
})();
