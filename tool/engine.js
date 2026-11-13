/* Beyond Data — rounds 2 and 3: what fits here, who could take the heat, three options with trade-off tables.
   Every figure comes from the formula register (formula_register.json) with its source; ranges, never points; nothing summed or ranked.
   Wording is Claude's draft for J.B. (shown in the draft colour). */
(function(){
'use strict';
const BD=window.BD; const {$,esc,fmt}=BD;
const f1=n=>n==null?'—':(n<10?n.toFixed(1):Math.round(n).toLocaleString('en-CA'));
const rng=(a,b,u)=>a==null?'—':(f1(a)===f1(b)?f1(a):f1(a)+'–'+f1(b))+(u?' '+u:'');
const kmOrM=d=>d>=1000?(d/1000).toFixed(2)+' km':Math.round(d)+' m';

/* ---------- register values used here (id → value, source) ----------
   Lean refactor 3 Nov 2026: the figures live in tool/data/*.json with their register ids (data.js loads them as BD.data).
   What is still written here has no register id yet and is listed in checks/agents/2026-11-03_refactor_unsourced.md. */
const DE=BD.data.envelope, DS=BD.data.size, DQ=BD.data.equipment, DN=BD.data.noise, DH=BD.data.heat;
const R={
 envVan:DE.envVan, envEdm:DE.envEdm,
 ftf:{ground:DE.ftf.ground, up:[5.5,6.0]},     // data-hall floors 5.5–6.0 m: Burlington ≈6.0 (burlingtonPlans2026); HK TPB A/KC/510B 5.5 has no register id (unsourced list)
 hallShare:DS.hallShare,
 m2PerMW:DS.m2PerMW,
 m2PerMWHigh:DS.m2PerMWHigh,
 m2PerMWModel:DS.m2PerMWModel,
 grossPerMW:[505,1109],               // check: whole building per MW IT — min–max of the 11 benchmark buildings in bench/benchmarks.json (no register id: unsourced list; test_size_chain.py keeps this in sync)
 cases:{van:[{mw:1.6,n:'Cologix VAN5'}].concat(DS.cases.van), edm:DS.cases.edm}, // operator or applicant figures; VAN5's 1.6 MW has no register id (unsourced list)
 steps:[0.1,0.2,0.3,0.5,0.75,1,1.5,2,2.5,3,4,5,6,8,10,12,15,20,25,30,40], // size slider steps: a tool choice, no source (unsourced list)
 plant:DQ.plant, pue:DQ.pue, lf:DQ.lf, lfLo:DQ.lfLo, lfR:[DQ.lfLo,DQ.lf] /* load range 0.4–0.6 (J.B. 11 Nov 2026): low Uptime 2024, high Fan 2007; pairs with the low and high PUE */, lwUnitDry:DN.lwUnitDry, lwUnit:DN.lwUnit,
 capture:DH.capture, cop:DH.cop,
 fuelLkWh:DQ.fuelLkWh, fuelHours:DQ.fuelHours, fuelLimit:DQ.fuelLimit,
 homeMWh:DH.homeMWh, gridYear:DH.gridYear, gridBC:DH.gridBC /* 11 Nov 2026: BC Government factor, second labelled BC figure */, homeHeat:DH.homeHeatMWh /* the heat a home needs (F11 B6) */, monthRatio:DH.monthRatio, grid:DH.grid, neuCredit:DH.neuCredit,
 reach:DH.reach, reachGuide:DH.reachGuide, recvRadius:DH.recvRadius,
 jobsM2:DS.jobsM2, kWPerRack:DS.kWPerRack,
};
const SRC2={
 env:'formula register: envelope (zone schedules; sources 17, 18)', hall:'register: hall_area (one calibration case, confidence 50); ground-floor rule: I-2 s. 2.2.7; floor heights: Burlington plans, HK TPB A/KC/480, A/KC/510B',
 size:'register: size_fit (built halls: eStruxture VAN-1, Hut 8 Vault, Qu EDM1, Cologix VAN5 — operator claims; LBNL prototypes, Sun et al. 2021; whole-building check: 111 E 5th RTS 19744, Ark UP4 committee report, Cologix VAN4 operator)',
 plant:'register: component_space (manufacturer claims); cooling-unit clearances from maker layout guides (evapcoLayout2026, bacLayout2023); UPS and battery rooms equipment only, switchgear rooms not sourced',
 pue:'register: pue (LBNL 2023; Uptime 2025 industry survey)', lf:'register: load_factor, 0.4–0.6 (low: Uptime 2024 survey p. 9, a quarter of sites under 40 % of UPS capacity; high: Fan et al. 2007, 59.5 %)',
 cap:'register: liquid_capture (LBNL 2014 — direct-to-chip 57–75%: 57–59% typical, 67–75% best; air-cooled: no primary figure)',
 cop:'register: cop (DEA 2026 waste-heat heat pumps to 70 °C, 1–3 MW: 3.0–3.6; observed at Meta Odense, 27 → 70 °C: 4.5 in 2020; from 2021 Fjernvarme Fyn reports Meta\'s heat pumps together with others, about 3.9 combined — Fjernvarme Fyn annual reports)', fuel:'register: fuel_on_site (NFC 2020 Table 4.3.13.4.-B; fuel rate a manufacturer claim; Uptime ≥ 12 h)',
 svc:'register: service_class (BC Hydro primary guide; EPCOR connection guide)', homes:'register: homes_heated (NRCan CEUD residential, 2018–22 average)',
 grid:'register: grid_co2 (NIR 2026 Annex 7, consumption intensity 2024)', neu:'By-law 9552 Sch. A, C, s. 2.1 (consolidated 1 Jan 2026); service area traced ±45 m',
 reach:'register: receiver_radius (RVO 2018, 5-year payback)', recv:'Statistics Canada ODSRF v2 (2026), ODHF (2020), ODEF v2.1 (2022); City of Vancouver non-market housing',
 jobs:'register: jobs (Virginia JLARC 2024, transferred; confidence 40)', noise:'Noise Control By-law 6555 ss. 2.1–2.3, Sch. A, B (Vancouver); Bylaw 14600 (Edmonton)',
 grid2:'register: grid_headroom (BC Hydro West End Substation CPCN, 10 Nov 2025)', floor:'register: floor_load_need (NBC 2020 Table 4.1.5.3)',
};
// evidence kind for each source line (shown as a small badge): record = public record or regulator; peer = peer-reviewed or government lab;
// survey = industry survey; claim = operator or manufacturer claim; physics = physical relation; transfer = figure from elsewhere; assume = assumption
const EV={env:'record',hall:'filed',size:'claim',plant:'claim',pue:'survey',lf:'peer',cap:'peer',cop:'peer',fuel:'record',svc:'record',homes:'record',grid:'record',neu:'record',reach:'transfer',recv:'record',jobs:'transfer',noise:'record',grid2:'record',floor:'record',
 elec:'record',pv:'peer',batt:'peer',ups:'claim',dr:'record',ev:'claim',gen:'record',ctl:'peer',evap:'physics',rain:'record',reuse:'record',wprice:'record',sewer:'record',srv:'peer',ew:'claim',cu:'claim',snd:'claim',lf2:'record',light:'record',so:'transfer',watch:'assume',ppl:'record'};
const EVL={record:'public record',filed:'filed plans or application',peer:'research or government lab',survey:'industry survey',claim:'operator or maker claim',physics:'physics',transfer:'transferred from elsewhere',assume:'assumption or gap'};
const badge=k=>{ const e=EV[k]; return e?`<span class="evb ev-${e}" title="${EVL[e]}">${EVL[e]}</span> `:''; };
const src=k=>`<div class="src">${badge(k)}${esc(SRC2[k])}</div>`;

/* ---------- geometry helpers: lon/lat ↔ local metres (same projection as the tiles) ---------- */
/* BC Hydro Downtown Vancouver Electricity Supply Study Area, West End Substation CPCN (10 Nov 2025) p. 2 fn 1: 'Vancouver's downtown peninsula together with the area east of the
   peninsula as far as Nanaimo Street', which 'includes four City of Vancouver neighbourhoods: Downtown, West End, Strathcona, and Grandview-Woodland'. Drawn as the union of those
   four City local areas (City open data, J.B. download 18 Oct 2026; data/networks/van_cpcn_study_area.geojson), simplified to about 3 m. Stanley Park is not a local area and is left out. */
const CPCN_RING=[[-123.14775,49.28891],[-123.14169,49.29292],[-123.1381,49.29351],[-123.13469,49.29581],[-123.12271,49.2915],[-123.11227,49.29016],[-123.10424,49.28817],[-123.0939,49.29052],[-123.06778,49.2901],[-123.06262,49.28954],[-123.06242,49.29087],[-123.05649,49.29349],[-123.05659,49.26218],[-123.07747,49.26234],[-123.07742,49.26514],[-123.08095,49.26516],[-123.08171,49.26522],[-123.08895,49.26662],[-123.08957,49.26671],[-123.09612,49.26677],[-123.09644,49.26682],[-123.09686,49.26697],[-123.10067,49.26913],[-123.1006,49.27089],[-123.10004,49.27192],[-123.1,49.27275],[-123.1017,49.27297],[-123.11108,49.27293],[-123.12116,49.26954],[-123.12928,49.26953],[-123.13768,49.27532],[-123.14126,49.27829],[-123.14268,49.28133],[-123.14554,49.28436],[-123.14541,49.28714],[-123.14775,49.28891]]; let CPCN_R=null;
/* the grid note (milestone 1 section C, J.B. 12 Nov 2026; BC Hydro project pages, East Vancouver Substation and West End Substation, read 12 Nov 2026):
   inside the Downtown Vancouver supply study area (inCPCN): on the downtown peninsula (the City's Downtown and West End local areas, City open data
   local-area-boundary, J.B. download; simplified to about 3 m) the West End substation text; east of it (Strathcona, Grandview-Woodland) the Murrin / East
   Vancouver text (BC Hydro does not publish service areas: our reading). Outside the study area: no published figure. */
const PEN_RING=[[-123.10424,49.28817],[-123.09929,49.28927],[-123.1,49.27275],[-123.1017,49.27297],[-123.11108,49.27293],[-123.12116,49.26954],[-123.12928,49.26953],[-123.13768,49.27532],[-123.14126,49.27829],[-123.14268,49.28133],[-123.14554,49.28436],[-123.14541,49.28714],[-123.14775,49.28891],[-123.14169,49.29292],[-123.1381,49.29351],[-123.13469,49.29581],[-123.12271,49.2915],[-123.11227,49.29016],[-123.10424,49.28817]];
let PEN_R=null; const inPEN=c=>{ if(!c) return false; if(!PEN_R) PEN_R=PEN_RING.flatMap(([lo,la])=>P(lo,la)); return BD.pip(c[0],c[1],PEN_R); };
function gridNote(f){ if(f.city!=='van'||!f.cpcn) return {k:'none',t:'No utility publishes spare capacity; the connection is BC Hydro’s answer to a load application.',src:'register grid_headroom'};
  if(!window.__SUBS){ try{ const q=new XMLHttpRequest(); q.open('GET','substations.json',false); q.send(null); window.__SUBS=JSON.parse(q.responseText); }catch(e){ window.__SUBS={}; } }
  const NS=window.__SUBS; const named=NS&&NS.named&&NS.named.van||[], m=named.find(s=>s.n==='Murrin'), w=named.find(s=>s.n==='West End'), c=f.c||[0,0];
  if(!m||!w) return {k:'cpcn',t:'Downtown supply area: no new 12 kV feeder positions from fiscal 2027 until new substations are built; the connection is BC Hydro’s answer.',src:'register wes'};
  if(!inPEN(f.c)) return {k:'murrin',t:'The nearest substation, Murrin on Main Street (built 1947), is to be replaced by a new East Vancouver substation at 303 Vernon Drive; construction could begin in 2027 at the earliest and take about four years. The West End substation, starting construction in November 2026, replaces Dal Grauer and serves downtown, not this lot as far as we read. No utility publishes spare capacity; the connection is BC Hydro’s answer.',src:'BC Hydro project pages, East Vancouver Substation and West End Substation (read 12 Nov 2026; register bchEastVanSub, bchWestEndSub); east of the downtown peninsula, served from Murrin (our reading: BC Hydro publishes no service areas)'};
  return {k:'westend',t:'Downtown supply area: no new 12 kV feeder positions from fiscal 2027 until the West End substation, which replaces Dal Grauer, starts construction in November 2026 and could be in service as early as 2032; in between, BC Hydro connects new customers by temporary measures. No utility publishes spare capacity; the connection is BC Hydro’s answer.',src:'BC Hydro West End Substation CPCN (10 Nov 2025; register wes) and project page (read 12 Nov 2026; register bchWestEndSub)'}; }
BD.gridNote=f=>gridNote(f);
function inCPCN(c){ if(!c) return false; if(!CPCN_R) CPCN_R=CPCN_RING.flatMap(([lo,la])=>P(lo,la)); return BD.pip(c[0],c[1],CPCN_R); }
function P(lon,lat){ const m=BD.S.meta[BD.S.city]; const k=Math.cos(m.lat0*Math.PI/180)*111320; return [(lon-m.lon0)*k,(lat-m.lat0)*110540]; }
BD.recv={};
/* milestone 1 section D (J.B. 12 Nov 2026): one distance method everywhere, UTM metres from the lot's centroid (as the reports): WGS84 transverse Mercator,
   zone 10 (Vancouver) or 12 (Edmonton); the standard series (accurate to well under a metre at these ranges). */
function utm(lon,lat,zone){ const a=6378137, f=1/298.257223563, k0=0.9996, e2=f*(2-f), ep2=e2/(1-e2), l0=((zone-1)*6-180+3)*Math.PI/180, ph=lat*Math.PI/180, la=lon*Math.PI/180;
  const N=a/Math.sqrt(1-e2*Math.sin(ph)**2), Tt=Math.tan(ph)**2, Cc=ep2*Math.cos(ph)**2, A=Math.cos(ph)*(la-l0);
  const M=a*((1-e2/4-3*e2**2/64-5*e2**3/256)*ph-(3*e2/8+3*e2**2/32+45*e2**3/1024)*Math.sin(2*ph)+(15*e2**2/256+45*e2**3/1024)*Math.sin(4*ph)-(35*e2**3/3072)*Math.sin(6*ph));
  return [k0*N*(A+(1-Tt+Cc)*A**3/6+(5-18*Tt+Tt**2+72*Cc-58*ep2)*A**5/120)+500000, k0*(M+N*Math.tan(ph)*(A**2/2+(5-Tt+9*Cc+4*Cc**2)*A**4/24+(61-58*Tt+Tt**2+600*Cc-330*ep2)*A**6/720))]; }
const ZONE={van:10,edm:12};
function lotUTM(f){ const m=BD.S.meta[f.city||BD.S.city]; const k=Math.cos(m.lat0*Math.PI/180)*111320; const lon=f.c[0]/k+m.lon0, lat=f.c[1]/110540+m.lat0; return utm(lon,lat,ZONE[f.city||BD.S.city]); }
function recvDist(f,p){ if(p.ue==null) [p.ue,p.un]=utm(p.lon,p.lat,ZONE[f.city||BD.S.city]); const c=f.__utm&&f.__utmK===f.c[0]+','+f.c[1]?f.__utm:(f.__utm=lotUTM(f),f.__utmK=f.c[0]+','+f.c[1],f.__utm); return Math.hypot(p.ue-c[0],p.un-c[1]); }
BD.recvDist=recvDist; BD.utm=utm;
/* the receiver points as loaded (section D): the same coordinates from the same source are one place: merged, demand summed, names listed (53 groups in
   Vancouver: vanBCA pairs, vanNMH groups, odef groups); a social-housing row with no name reads "Social housing (name not published)"; BC Assessment rows
   (vanBCA) carry a type only: their "n" is a street address derived from licensed data and is never shown */
const SUMF=['u','fa','dem','lo','cap'];
function tidyRecv(pts){ const G=new Map(), out=[];
  for(const p of pts){ if(p.src==='vanNMH'&&!String(p.n||'').trim()) p.n='Social housing (name not published)';
    if(p.src==='vanBCA') p.aka=null; else if(Array.isArray(p.aka)){ p.aka=p.aka.filter(t=>!/vanBCA/.test(String(t))); if(!p.aka.length) p.aka=null; }   /* no BC Assessment address in any field */
    const k=p.lon+','+p.lat+','+p.src, q=G.get(k); if(!q){ const c=Object.assign({},p,{names:[p.n]}); G.set(k,c); out.push(c); continue; }
    for(const f of SUMF) if(p[f]!=null) q[f]=(q[f]||0)+(+p[f]||0); q.names.push(p.n); q.merged=(q.merged||1)+1; }
  for(const q of out){ if(q.src==='vanBCA'){ q.n=({residential:'Residential building',commercial:'Commercial building',industrial:'Industrial building',institutional:'Institutional building'}[q.t]||'Building')+' (BC Assessment; address not shown)'+(q.merged?` · ${q.merged} records at one place`:''); q.names=null; }
    else if(q.merged){ const u=[...new Set(q.names)]; q.n=u.length>1?`${u[0]} and ${u.length-1} more at this place (${u.slice(1).join(', ')})`:u[0]; } }
  return out; }
async function loadRecv(city){ if(BD.recv[city]) return BD.recv[city];
  try{ const d=await BD.getJSON(`tiles/${city}/receivers.json`); d.raw=d.pts.length; d.pts=tidyRecv(d.pts);
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
    if(f.mw[1]>mw&&mw<40){ f.mwTopRaw=f.mw[1]; f.mw=[Math.min(f.mw[0],mw),mw]; f.mwCapped=true; const cap=r=>r?[Math.min(r[0],mw),Math.min(r[1],mw)]:r; f.mwS=cap(f.mwS); f.mwL=cap(f.mwL); } // finding F-03: every bar capped, not only the top
    f.plantFor=mw; }
  finally{ A.mw=keep; inStable=false; BD.modelReset&&BD.modelReset(); }
  stableKey=k; stableF=f; return f; }
/* lot test 20 Oct 2026: with no answer yet, the set-up screen shows "New building" as the default but the engine read an empty answer as
   "not new" and gave the lot no floor, so every set-up failed on lots where a building fits (e.g. 24 MW on a 16,000 m² CD-1 lot). The labelled defaults now hold. */
function defaults(){ const A=BD.S.answers; if(!A.built) A.built='new'; if(!A.extent) A.extent='whole'; }
function siteFacts(){ defaults(); if(inStable) return siteFactsRaw(); const st=stableFacts(); if(!st) return siteFactsRaw();
  return Object.assign({},st,{M:BD.model?BD.model():st.M}); }
function siteFactsRaw(){
  const s=BD.S.sel, city=s.city, a=s.a||[], A=BD.S.answers;
  const blds=(s.blds||[]).filter(b=>b.f!==3);
  const f={city, lot:s.lotArea||(city==='van'?a[8]:a[4]), zone:null, env:null, envNote:'', blds};
  if(city==='van'){ f.zone=(a[1]||'').trim(); f.env=R.envVan[f.zone]||null; }
  else { const z=String(a[2]||a[1]||'').trim().split(/\s+/)[0].toUpperCase(); f.zone=z; f.env=R.envEdm[z]||null; }
  f.status=BD.statusOf(f.zone);
  // Edmonton IH needs a 1.0 ha site (Bylaw 20001 s. 2.140, 4.1.1; verification sweep M54)
  if(city==='edm'&&f.zone==='IH'&&f.lot&&f.lot<10000) f.status=Object.assign({},f.status,{k:'case',t:'Allowed use, lot under 1.0 ha',d:f.status.d+' This lot is '+fmt(f.lot)+' m², below IH\'s 1.0 ha minimum site area (s. 2.140, 4.1.1): it would need to be consolidated with neighbours or varied.'});
  f.foot=blds.reduce((t,b)=>t+b.a,0); f.hmax=blds.some(b=>b.h>0)?Math.max(...blds.filter(b=>b.h>0).map(b=>b.h)):0; f.hUnknown=blds.some(b=>!(b.h>0)||b.f===6); /* finding I-06: −1 = no height recorded */ f.plate=blds.length?Math.max(...blds.map(b=>b.a)):0;
  f.c=s.ring?BD.centroid(s.ring):s.pt;
  f.downtown=city==='van'&&/^(DD|CWD|DEOD|BCPED|HA-1|HA-1A|HA-2)$/.test(f.zone);
  f.cpcn=city==='van'&&inCPCN(f.c); // BC Hydro's Downtown Vancouver Electricity Supply Study Area (sweep M23): the feeder limit applies here, not only in downtown zones
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
    else { const st=Math.max(1,Math.floor(f.hmax/4.0)); f.floors=st;
      // sweep M66 (J.B. 18 Oct 2026): each building part × its own storeys, not the tallest part × every footprint (555 W Hastings: a 72 m² spire set 40 storeys for all)
      const per=Math.round(blds.reduce((t,b)=>t+b.a*Math.max(1,Math.floor(b.h/4)),0)), rep=city==='van'&&BD.GFA_REP?BD.GFA_REP[s.id]:null;
      if(A.extent==='part'){ f.gross=[f.plate,f.plate]; f.how=`one floor ≈ the largest footprint on the lot (${fmt(f.plate)} m²)`; }
      else if(rep){ f.gross=[rep.gfa,rep.gfa]; f.gfaRep=rep; f.how=`${fmt(rep.gfa)} m² gross floor area reported by the owner to the City (Annual Greenhouse Gas and Energy Limits By-law reporting, disclosed data, reporting year 2025${rep.n>1?`; one building across ${rep.n} parcels with this address`:''})`; }
      else { f.gross=[Math.round(per*0.48),Math.round(per*1.23)]; f.gfaEst=per; f.how=`estimated: each building part's footprint × its own storeys (height ÷ 4 m) = ${fmt(per)} m²; shown as ${fmt(f.gross[0])}–${fmt(f.gross[1])} m², because against the floor areas 255 Vancouver buildings report to the City this method came out between 19% low and 109% high for the middle 80% of them (median 14% high); the band is our arithmetic (estimate ÷ 2.09 to ÷ 0.81)`; /* 2 Nov 2026 fix pass: D-arith */ }
      f.hallGross=f.gross.slice(); }
    /* 2 Nov 2026 hard rules (site audit 14): I-2 s. 2.2.7, I-3 s. 2.2.11, FC-2 s. 2.2.4: no bulk data storage at the ground floor (registers
       van_zdb_i2, van_zdb_i3, van_zdb_fc2). A whole existing building in those zones: the ground floor (the buildings' footprints) is not data hall.
       Both readings, as for a new building: strict (the hall share of the floors above), lenient (support rooms at grade). */
    if(blds.length&&A.extent!=='part'&&f.env&&f.env.ground&&M&&M.Z&&!M.Z.assumed){ const gf=f.foot, hs=R.hallShare, up=f.gross.map(g=>Math.max(0,g-gf));
      f.ground=[Math.min(gf,f.gross[0]),Math.min(gf,f.gross[1])]; f.groundEx=gf; f.hallGross=up;
      f.hallS=[up[0]*hs[0],up[1]*hs[1]]; f.hallL=[Math.min(up[0],f.gross[0]*hs[0]),Math.min(up[1],f.gross[1]*hs[1])];
      f.how+=`; the ground floor (${fmt(gf)} m², the buildings' footprints) is left out of the data hall: zone ${f.zone} allows no bulk data storage at the ground floor`; }
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
/* findings F-01/F-02 (24 Oct): the cooler counted here is the one the plant layout uses (plant.js sizeFor): towers or hybrid when chosen;
   otherwise air-cooled chillers for an air-cooled hall, dry coolers for liquid cooling or heat recovery. m² of unit per MW of heat. */
function coolerFor(recover){ const A=BD.S.answers, p=R.plant, out=A.outside||'dry';
  if(out==='towers') return {name:'cooling tower cells',c:p.towers}; if(out==='hybrid') return {name:'hybrid coolers',c:p.hybrid};
  return !recover&&(A.inside||'air')==='air'?{name:'air-cooled chillers',c:p.chill}:{name:'dry coolers',c:p.dry}; }
function plantPerMW(recover){ const p=R.plant, c=coolerFor(recover).c; // heat per MW of servers = PUE
  let lo=p.ups[0]+p.batt[0]+c[0]*R.pue[0], hi=p.ups[1]+p.batt[1]+c[1]*R.pue[1]; if(recover){ lo+=p.hp[0]+p.cdu[0]; hi+=p.hp[1]+p.cdu[1]; } return [lo,hi]; }
/* 11 Nov 2026 (J.B., scope f): plant space everywhere = indoor rooms (UPS, batteries; heat pumps and CDUs with recovery), equipment only, + the cooling units
   with their clear zones and spacing (plant.js zoneArea, the same units and maker layout clearances as the drawn plant). Recovery with air inside uses dry coolers (as coolerFor). */
function plantIndoor(mw,recover){ const p=R.plant; let lo=p.ups[0]+p.batt[0], hi=p.ups[1]+p.batt[1]; if(recover){ lo+=p.hp[0]+p.cdu[0]; hi+=p.hp[1]+p.cdu[1]; } return [lo*mw,hi*mw]; }
function plantZones(mw,recover){ const A=BD.S.answers, A2=recover&&(A.inside||'air')==='air'&&(A.outside||'dry')==='dry'?Object.assign({},A,{inside:'plate'}):A; return BD.plant&&BD.plant.zoneArea?BD.plant.zoneArea(mw,A2):null; }
function plantArea(mw,recover){ const ind=plantIndoor(mw,recover), z=plantZones(mw,recover); if(!z){ const pp=plantPerMW(recover); return [pp[0]*mw,pp[1]*mw]; } return [ind[0]+z.lo,ind[1]+z.hi]; }
function noiseLw(mw){ const CU=coolUnits(mw), LU=CU.name==='dry coolers'?R.lwUnitDry:R.lwUnit; return {n:CU.n,name:CU.name,lw:[LU[0]+10*Math.log10(CU.n),LU[1]+10*Math.log10(CU.n)]}; }
/* cooling units for the noise count: the same units the plant lays out (sweep M30), spares included */
/* equipment counts (register: rack_count, ups_modules, battery_cabinets, room_cooling_units, cdu_units, cooling_units, generator_sets;
   29 Oct 2026). Each count is [low, high] where its coefficient is a range. */
R.equip={kwRack:[7.1,8], upsKW:1000, cabKW:[186.6,124.4] /* 11 Nov 2026 (J.B., F11 B4): UPS carries the load 10–15 min (FM 5-32 3.5.2.1); Vertiv EnergyCore Li5, 31.1 kWh: 186.6 kW for 10 min, 124.4 kW for 15 min (our arithmetic); was 400–263 kW for about 5 min */, crahKW:[246,172], cduKW:1516, wallKW:500, rowKW:73.7, rowOver:1.2, wfCrah:150, wfWall:400};
/* layout rules (register: hall_layout, electrical_room; 29 Oct 2026) — every distance has its source there */
R.layout={rackFloor:2.32 /* reference only since 11 Nov 2026 (one method: the floor test sets the size, the layout spreads the racks it needs): Schneider WP 46 Fig. 1 'rack floor equivalent of 25 ft2' */, aisle:1.2, corridor:1.1, crahFront:0.864, crahEnd:0.457, cduFront:1.0, upsFront:1.5, battFront:0.914, battWall:0.025, upsAmps:1203, wallClear:1.1, wallGap:0.152};
function equip(mw,A){ A=A||BD.S.answers; const sp=A.spares||'n1', red=n=>sp==='2n'?n*2:sp==='n1'?n+1:n, kw=mw*1000, E=R.equip;
  const air=(A.inside||'air')==='air', liq=air?[0,0]:(A.inside==='immersion'?[1,1]:R.capture); // immersion: all heat in liquid (register liquid_capture, not verified)
  const toAir=[kw*(1-liq[1]),kw*(1-liq[0])], toLiq=[kw*liq[0],kw*liq[1]];
  const out={racks:[Math.ceil(kw/E.kwRack[1]),Math.ceil(kw/E.kwRack[0])], ups:red(Math.ceil(kw/E.upsKW)),
    batt:[Math.ceil(kw/E.cabKW[0])*(sp==='2n'?2:1),Math.ceil(kw/E.cabKW[1])*(sp==='2n'?2:1)],
    crah:[0,0],
    cdu:toLiq[1]>0?[red(Math.ceil(toLiq[0]/E.cduKW)),red(Math.ceil(toLiq[1]/E.cduKW))]:[0,0]};
  // room cooling type from hall density (register: room_cooling_type; Vertiv SL-70713 limits, manufacturer claims)
  let M=null; try{ M=BD.model&&BD.model(); }catch(e){} const fl=M&&M.hallData?M.hallData:M&&M.nF?Math.max(1,M.Z&&M.Z.ground?M.nF[0]-1:M.nF[0]):1, /* hall fix 3 Nov 2026: a ratio-set hall's own data storeys */ fa=M&&(M.serverFoot||M.foot)?BD.area(M.serverFoot||M.foot):0;
  const wft2=fa?toAir[1]/fl*1000/(fa*10.7639):null; const type=wft2==null||wft2<=E.wfCrah?'crah':wft2<=E.wfWall?'wall':'inrow';
  const per={crah:[E.crahKW[0],E.crahKW[1]],wall:[E.wallKW,E.wallKW],inrow:[E.rowKW/E.rowOver,E.rowKW/E.rowOver]}[type];
  const room=toAir[1]>0?[red(Math.ceil(toAir[0]/per[0])),red(Math.ceil(toAir[1]/per[1]))]:[0,0];
  out.room={type,wft2,n:room,name:{crah:'room cooling units',wall:'thermal-wall units',inrow:'in-row coolers'}[type]}; if(type==='crah') out.crah=room;
  if(BD.plant&&BD.plant.sizeFor){ const s=BD.plant.sizeFor(mw,A); out.cool={n:s.n,name:s.k.name}; out.gens={n:s.gN,need:s.gNeed,mw:s.g?s.g.mw:0}; }
  return out; }
function coolUnits(mw){ const A=BD.S.answers; if(BD.plant&&BD.plant.sizeFor){ const s=BD.plant.sizeFor(mw,A); return {n:s.n,name:s.k.name,mw:s.k.mw}; } return {n:Math.max(1,Math.ceil(mw*R.pue[1])),name:'cooling units',mw:1}; }


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
    const fpv=f.fp||f.lot, ip=f.indoorPlant||0; L.push(`Most floor area those storeys can hold: ${n0(fpv)} m² × ${f.floorsR[0]} = ${n0(fpv*f.floorsR[0])} m²${f.floorsR[1]!==f.floorsR[0]?` (or × ${f.floorsR[1]} = ${n0(fpv*f.floorsR[1])} m²)`:''}. The smaller of this and step 2${ip?`, less ${n0(ip)} m² of plant rooms inside the building (finding F-05)`:''}: <b>${rng(f.gross[0],f.gross[1],'m²')}</b>.`);
    if(f.sc){ f.sc.forEach((s,i)=>{ if(i===1&&f.floorsR[1]===f.floorsR[0]) return; const tag=f.floorsR[1]!==f.floorsR[0]?` <i>(${f.floorsR[i]} storeys)</i>`:'';
      L.push(`Ground floor (no data storage at grade)${tag}: floor area ÷ storeys = ${n0(s.G)} ÷ ${f.floorsR[i]} = <b>${n0(s.gr)} m²</b>. Floors above: ${n0(s.G)} − ${n0(s.gr)} = <b>${n0(s.up)} m²</b>.`);
      L.push(`Data hall, strict reading${tag} (only the floors above, and only part of them is hall): ${n0(s.up)} × ${hs[0]} = ${n0(s.up*hs[0])} m², up to ${n0(s.up)} × ${hs[1]} = <b>${n0(s.up*hs[1])} m²</b>.`);
      L.push(`Data hall, lenient reading${tag} (support rooms on the ground floor, so the hall share applies to the whole building, but the hall still fits only on the floors above): smaller of ${n0(s.G)} × ${hs[0]} and ${n0(s.up)} = ${n0(Math.min(s.up,s.G*hs[0]))} m², up to smaller of ${n0(s.G)} × ${hs[1]} and ${n0(s.up)} = <b>${n0(Math.min(s.up,s.G*hs[1]))} m²</b>.`); });
    } else L.push(`Data hall: ${n0(f.hallGross[0])} × ${hs[0]} = ${n0(f.hall[0])} m², up to ${n0(f.hallGross[1])} × ${hs[1]} = <b>${n0(f.hall[1])} m²</b>.`);
  } else {
    L.push(`Floor area: ${esc(f.how)} = <b>${rng(f.gross[0],f.gross[1],'m²')}</b>.`);
    if(f.groundEx!=null) L.push(`Ground floor left out (no bulk data storage at the ground floor; ${({'I-2':'I-2 s. 2.2.7','I-3':'I-3 s. 2.2.11','FC-2':'FC-2 s. 2.2.4'})[f.zone]||'zone schedule'}): ${rng(f.gross[0],f.gross[1],'m²')} − ${n0(f.groundEx)} m² = <b>${rng(f.hallGross[0],f.hallGross[1],'m²')}</b> on the floors above; the lenient reading puts support rooms at grade (smaller of the floors above and the hall share of the whole): <b>${rng(f.hallL[0],f.hallL[1],'m²')}</b>.`);
    L.push(`Data hall: ${n0(f.hallGross[0])} × ${hs[0]} = ${n0(f.hallS[0])} m², up to ${n0(f.hallGross[1])} × ${hs[1]} = <b>${n0(f.hallS[1])} m²</b>.`);
  }
  const top=f.mwCapped?f.mwTopRaw:f.mw[1], lo0=Math.min(40,f.hall[0]/m[1]);
  L.push(`Servers: the smallest hall laid out loosely, ${n0(f.hall[0])} ÷ ${m[1]} m² per MW = <b>${n1(lo0)} MW</b>; the largest hall laid out densely, ${n0(f.hall[1])} ÷ ${m[0]} = <b>${n1(top)} MW</b>${top>=40?' (capped at 40 MW, the tool\'s range)':''}.`);
  if(f.mwCapped) L.push(`Plant cap: the cooling plant for more than ${n1(f.plantFor)} MW no longer fits on this lot alongside the building, so every reading is capped at <b>${n1(f.plantFor)} MW</b>: range ${n1(f.mw[0])}–${n1(f.mw[1])} MW.`);
  if(f.mwCheck) L.push(`Check: ${n0(f.gross[1])} ÷ ${n0(R.grossPerMW[1])} = ${n1(f.gross[1]/R.grossPerMW[1])} MW; ${n0(f.gross[1])} ÷ ${n0(R.grossPerMW[0])} = ${n1(f.gross[1]/R.grossPerMW[0])} MW${f.gross[0]!==f.gross[1]?' (shown for the larger floor area)':''}.`);
  return mathBox(L,`Hall share ${hs[0]}–${hs[1]}: Burlington plan set. ${m[0]}–${m[1]} m² of hall per MW: ${f.density==='high'?'high-density halls (NEXTDC S3, QScale; operator claims) to the densest built Canadian hall':'four built Canadian halls (operator claims)'}. ${n0(R.grossPerMW[0])}–${n0(R.grossPerMW[1])} m² of building per MW: benchmark buildings in the precedent catalogue.`);
}
function mathNeeds(mw,fac,f){
  const pl=plantPerMW(false), plR=plantPerMW(true), p=R.plant, cN=coolerFor(false), cR=coolerFor(true);
  return mathBox([
    `Power at the meter at full load: ${mw} MW × PUE ${R.pue[0]} = ${n1(fac[0])} MW; × ${R.pue[1]} = <b>${n1(fac[1])} MW</b>. Averaged over a year (× ${R.lfR[0]}–${R.lfR[1]}): <b>${n1(fac[0]*R.lfR[0])}–${n1(fac[1]*R.lfR[1])} MW</b>.`,
    (()=>{ const z=plantZones(mw,false), ind=plantIndoor(mw,false); return z?`Plant space, ${z.name}: ${z.nLo}–${z.nHi} units of ${z.L} × ${z.W} m with ${z.wall[0]} m end and ${z.wall[1]} m side to a wall, ${z.gap[0]} m end to end and ${z.gap[1]} m side to side (maker layout guides); low: ${z.nLo} units in a ${z.arr[0]} × ${z.arr[1]} block = ${n0(z.lo)} m²; high: ${z.nHi} in one row = ${n0(z.hi)} m²; + UPS ${p.ups[0]}–${p.ups[1]} and batteries ${p.batt[0]}–${p.batt[1]} m² per MW × ${mw} = ${n0(ind[0])}–${n0(ind[1])} m² (equipment only) = <b>${n0(z.lo+ind[0])}–${n0(z.hi+ind[1])} m²</b>.`:''; })(),
    (()=>{ const z=plantZones(mw,true), ind=plantIndoor(mw,true); return z?`With heat recovery (${z.name}, ${z.nLo}–${z.nHi} units with their clear zones), add heat pumps ${p.hp[0]}–${p.hp[1]} + CDUs ${p.cdu[0]}–${p.cdu[1]} m² per MW indoors: <b>${n0(z.lo+ind[0])}–${n0(z.hi+ind[1])} m²</b>.`:''; })(),
    BD.S.answers.gens==='none'?'Standby fuel: none (no generators chosen).':`Standby fuel: ${n1(fac[0])}–${n1(fac[1])} MW × 1,000 (kW) × ${R.fuelHours} h × ${R.fuelLkWh} L per kWh = <b>${n0(fac[0]*1000*R.fuelHours*R.fuelLkWh)}–${n0(fac[1]*1000*R.fuelHours*R.fuelLkWh)} L</b>.`
  ],'PUE: LBNL 2023, Uptime 2025. Plant areas: cooling units and clearances from maker layout guides (EVAPCO EAEQPTLYT26 Table 1; BAC J74; tower spacing no register id ?), indoor rooms manufacturer claims, equipment only. Fuel rate: Rehlko KD2000 G5-626, full load (manufacturer claim).');
}

/* ---------- round 2: what fits here ---------- */
function fitsView(){
  const f=siteFacts(), A=BD.S.answers; BD.S.view2='fits';
  const ST=R.steps, snap=v=>ST.reduce((b,s)=>Math.abs(Math.log(s/v))<Math.abs(Math.log(b/v))?s:b,ST[0]);
  // start at the low end of what fits (snapped to a step), not a hidden midpoint
  // a size already set for this lot (a worked example's largest that fits, the fix button, the residents' choice) is kept, on a step or not (J.B. 20 Oct)
  if(!A.mw||(A.mwSite&&A.mwSite!==BD.S.sel.id)){ A.mw=snap(Math.max(0.1,f.mw[0])); const p=BD.fitNear?BD.fitNear(A.mw):null; if(p!=null) A.mw=p; /* bugfix 4 Nov 2026: start at a size that passes */ } A.mwSite=BD.S.sel.id;
  const pos01=v=>{ v=Math.max(ST[0],Math.min(ST[ST.length-1],v)); let i=0; while(i<ST.length-2&&ST[i+1]<v) i++; return (i+Math.log(v/ST[i])/Math.log(ST[i+1]/ST[i]))/(ST.length-1)*100; };
  /* bugfix 4 Nov 2026 (retest resident 2): the slider offers only the sizes that pass every hard rule on this lot with this set-up (site.js fitSizes:
     each slider step up to the largest that fits, and that size), from the smallest to the largest that passes. It sits under the same 0.1–40 MW scale,
     spanning only that part, and starts at the size set (or the nearest passing size if that one is blocked). */
  const VAL=((BD.fitSizes&&BD.fitSizes().ok)||[]).slice(); if(VAL.length&&!VAL.includes(A.mw)&&BD.sizePasses&&BD.sizePasses(A.mw)){ VAL.push(A.mw); VAL.sort((a,b)=>a-b); }
  const pu=v=>Math.round(pos01(v)*10), vAt=p=>VAL.reduce((b,v)=>Math.abs(pu(v)-p)<Math.abs(pu(b)-p)?v:b,VAL[0]);
  const thumb=VAL.includes(A.mw)?A.mw:VAL.length?((BD.fitNear&&BD.fitNear(A.mw))||VAL[0]):null;
  const cases=(R.cases[f.city]||[]);
  const near=v=>{ const c=cases.slice().sort((a,b)=>Math.abs(Math.log(a.mw/v))-Math.abs(Math.log(b.mw/v)))[0]; if(!c) return ''; const r=v/c.mw; return r>0.85&&r<1.18?`about the size of ${c.n} (${c.mw} MW)`:`${r.toFixed(r<10?1:0)} × ${c.n} (${c.mw} MW)`; };
  const over=v=>v>f.mw[1]?' — larger than this floor area holds even at the densest built layout':'';
  const mw=A.mw, fac=[mw*R.pue[0],mw*R.pue[1]], plA=plantArea(mw,false), plRA=plantArea(mw,true);
  const fuel=[fac[0]*1000*R.fuelHours*R.fuelLkWh,fac[1]*1000*R.fuelHours*R.fuelLkWh];
  const pos=A.built==='existing'&&A.extent==='part'?A.floor:'';
  /* 2 Nov 2026 hard rules (site audit 4): the limit follows where the fuel is, i.e. where the generators are (NFC 2020 Table 4.3.13.4.-B, register
     nfc2020_4313): on the roof, above the first storey, 20,000 L (rooftop tanks: our reading ?), checked in site.js and blocking above it;
     in the yard the sets stand outdoors at grade, where the table (tanks inside buildings) does not apply. */
  /* Build 2 (3 Nov 2026): on the roof the limit is CSA B139.1.1 6.5.3 (register arch_csa_b139), checked per set in site.js; it replaces the NFC reading above */
  const fuelAt=A.gens==='none'?null:(A.genAt||'yard'), M0=fuelAt==='roof'&&BD.model?BD.model():null, fuelPer=M0&&M0.fuel?M0.fuel.per:null, fuelLim=fuelAt==='roof'?BD.data.equipment.roofTank.line:null, fuelOver=fuelLim&&fuelPer!=null&&fuelPer>fuelLim+0.5;
  let svc;
  const mva=fac[1]/0.90; /* 2 Nov 2026 fix pass: D-pf — MVA = MW ÷ power factor 0.90–1.0 (our band), high end used for the thresholds */
  if(f.city==='van') svc=mva>13?'above 13 MVA: a two-feeder supply may be required in 25 kV areas; larger loads move toward transmission rules':mva>6.5?'above 6.5 MVA: a two-feeder supply may be required in 12.5 kV areas':'within a single primary service';
  else svc=mva*1000>2500?'above 2,500 kVA: primary service, with transformer clearances and a 4.6 m access road':'within a secondary or small primary service';
  svc+=` (${rng(fac[1],fac[1]/0.90,'MVA')} at power factor 1.0–0.90: our band; server supplies ≥ 0.95, ENERGY STAR v4.0; facility value ?)`;
  let h=`<button class="x" id="back">← Site</button><div class="kind">What fits here</div><h2>${esc(f.city==='van'?BD.S.sel.a[0]:BD.S.sel.a[0])}</h2>
  <p class="draft">How much data centre this ${A.built==='new'?'lot':'building'} could hold, as ranges, before anyone decides what to do with its heat.</p>`;
  if(f.envAssumed&&A.built==='new') h+=`<p class="sub"><span class="pill ${f.status.k}">${esc(f.status.t)}</span> No data-centre envelope in zone ${esc(f.zone)}. <span class="draft">Shown as if rezoned to ${f.city==='van'?'I-2 (floor area 3.0 × lot, 18.3 m)':'IM (floor area 2.0 × lot, 18 m)'}, the nearest common data-centre zone — an assumption for comparison, not a prediction.</span></p>`;
  const st=f.floorsR?(f.floorsR[0]===f.floorsR[1]?f.floorsR[0]:f.floorsR[0]+'–'+f.floorsR[1]):f.floors;
  h+=`<h3>Floor area</h3><dl><dt>Available</dt><dd>${f.fullCover?'up to ':''}${rng(f.gross[0],f.gross[1],'m²')}${f.fullCover?` <span class="draft">— only if the building covers the whole lot; yards and setbacks not yet read for this zone</span>`:''}</dd><dt>How</dt><dd>${esc(f.how)}${f.plantFor&&A.built==='new'?` · cooling plant sized for ${n1(f.plantFor)} MW, the top of this range`:''}${f.heightCut?` <span class="draft">(${f.yardCut?'the yards and height limit':'the height limit'} hold less than this floor area, so the figure is cut to what fits)</span>`:''}</dd>
  ${f.fpNote?`<dt>Footprint</dt><dd>about ${fmt(f.fp)} m² <span class="sub">— ${esc(f.fpNote)}${f.fpCalc?`; lot treated as a ${fmt(f.fpCalc.w)} × ${fmt(f.fpCalc.d)} m rectangle`:''}</span></dd>`:''}
  ${f.ground?`<dt>Ground floor</dt><dd>${rng(f.ground[0],f.ground[1],'m²')} — this zone allows no data storage at grade${f.zone==='I-3'?' (I-3: in both City drafts, 2017 and 2022; the enacted schedule not read ?)':''}</dd>`:''}
  ${f.floorsR&&A.built==='new'?`<dt>Storeys</dt><dd>about ${st} (6.0 m ground; 5.5–6.0 m for each data-hall floor, as built and proposed halls show; within ${f.envH} m)</dd>`:''}</dl>${src('env')}
  <h3>Room for servers</h3><dl>${f.hallL?`<dt>Data hall</dt><dd>${rng(f.hallS[0],f.hallS[1],'m²')} <span class="draft">if the ground floor holds none of the data centre</span></dd>
  <dt></dt><dd>${rng(f.hallL[0],f.hallL[1],'m²')} <span class="draft">if support rooms (electrical, generators, loading) may sit on the ground floor — for the City to confirm</span></dd>`:`<dt>Data hall</dt><dd>${rng(f.hall[0],f.hall[1],'m²')}</dd>`}
  <dt>Share of floor</dt><dd>48–72% (Burlington plan set; its own figures disagree)</dd></dl>${src('hall')}
  <h3>Largest data centre that fits</h3>${f.mw[1]<0.05?`<p style="font-size:16px;margin:4px 0"><span class="k">Nothing fits</span> <span class="sub">— after setbacks, loading and plant, no floor is left for servers (lot ${BD.fmt(f.lot||0)} m²)</span></p>`:(()=>{ let fm=null; try{ fm=BD.fitMax?BD.fitMax():null; }catch(e){} /* sweep 20 Oct: the headline is the size that fits with its plant, generators and loading; the floor-only range follows (it read as the answer before) */
    const fp=fm&&BD.fitPlan?BD.fitPlan():null; /* dcshare 4 Nov 2026: name the noise measure the size depends on */
    return fm?`<p style="font-size:22px;font-weight:300;margin:4px 0">${fm.toFixed(1)} MW <span class="sub">of servers, with its plant, generators and loading, within the noise by-law${fp&&fp.measure?' '+esc(fp.measure.t):''}; ${rng(f.mw[0],f.mw[1],'MW')} counting floor space only</span></p>${BD.hallNote?`<p class="sub">Hall density: ${esc(BD.hallNote().t)}. ${esc(BD.denseLine().t)}.</p>`:''}${fp&&fp.measure&&fp.measure.auto?`<p class="sub">With the roof plant as set up: ${fp.asIs!=null?fp.asIs.toFixed(1)+' MW':'no size passes the noise by-law'}.</p>`:''}`:`<p style="font-size:22px;font-weight:300;margin:4px 0">${rng(f.mw[0],f.mw[1],'MW')} <span class="sub">of servers counting floor space only; with the plant, generators, loading and the noise by-law as set up, none fits</span></p>`; })()}
  ${(()=>{ const M=BD.model&&BD.model(); return M&&M.notes&&M.notes.length?M.notes.map(t=>`<p class="nflag" data-tl="1">${esc(t)}</p>`).join(''):''; })()/* noise flag (2 Nov 2026): a note, not a block */}
  ${(()=>{ let lc=null; try{ lc=A.built==='new'&&BD.scene3d&&BD.scene3d.layoutCheck?BD.scene3d.layoutCheck():null; }catch(e){} return lc?`<p class="sub">Rack layout check: at ${lc.mw} MW the hall needs about <b>${BD.fmt(lc.need[0])}–${BD.fmt(lc.need[1])} racks</b> (8–7.1 kW a rack); on the building this size leaves, the layout ${lc.ok?'places them':`places only ${BD.fmt(lc.placed)} (?)`} on ${lc.floors} floor${lc.floors>1?'s':''} (${BD.fmt(lc.floor)} m²), spread evenly, with corridors, room cooling and the UPS room (our arithmetic; register: hall_layout, rack_count). The size itself is set by the floor test, 637 m² per MW for the hall, UPS and battery rooms.</p>`:''; })()}
  ${rangeBar([{lo:f.mwS[0],hi:f.mwS[1],lab:f.mwL?'strict':'range'}].concat(f.mwL?[{lo:f.mwL[0],hi:f.mwL[1],lab:'lenient'}]:[]).concat(f.mwCheck?[{lo:f.mwCheck[0],hi:f.mwCheck[1],lab:'real buildings',ghost:true}]:[]))}
  ${f.mwL?`<p class="sub">${rng(f.mwS[0],f.mwS[1],'MW')} on the strict reading; ${rng(f.mwL[0],f.mwL[1],'MW')} if support may sit on the ground floor.</p>`:''}
  <div class="q"><div class="lab">Hall layout</div><div class="seg" id="dens" role="group" aria-label="Hall layout"><button data-v="typical" aria-pressed="${f.density==='typical'}">Typical, air-cooled</button><button data-v="high" aria-pressed="${f.density==='high'}">High-density, liquid-cooled</button></div></div>
  <p class="sub">${f.density==='high'?`${fmt(f.m2MW[0])}–${fmt(f.m2MW[1])} m² of hall per MW: two AI-ready halls report about 250 (NEXTDC S3, QScale; operator claims), and the densest built Canadian hall is 290. <span class="draft">Dense racks usually need liquid cooling to the chip, which also changes the heat: it leaves warmer and more of it can be captured (see Heat).</span>`:`${fmt(f.m2MW[0])}–${fmt(f.m2MW[1])} m² of hall per MW, as four built Canadian halls report (operator claims, mostly 5–10 kW per rack). LBNL's models span 186–2,325.`}</p>
  ${f.gross[1]<3000?`<p class="sub draft">Small buildings can hold more than this range. With little room for anything else, most of the floor becomes hall: eStruxture VAN-1 puts about 75% of its 929 m² into hall and holds 2.4 MW (operator claim).</p>`:''}
  <p class="sub"><a href="#" id="toPrec">Compare with real buildings →</a> · <a href="#" id="toSens">What matters most →</a>${BD.dl?' · <a href="#" id="toRep">Download a site report</a>':''}</p>
  ${f.mwCheck?`<p class="sub">Check against whole buildings: the 11 benchmark buildings in the precedent catalogue (mostly approved or proposed, from planning filings and applicant figures; none recorded as built) use ${fmt(R.grossPerMW[0])}–${fmt(R.grossPerMW[1])} m² of building per MW of IT. This floor area at those rates gives ${rng(f.mwCheck[0],f.mwCheck[1],'MW')}.</p>`:''}${src('size')}${mathFits(f)}
  <div class="q"><div class="lab">Size to test: <b id="mwv">${mw}</b> MW of servers · <span id="mwn" class="sub">${esc(near(mw))}${over(mw)}</span></div>
   <div class="mwtrack"><div class="band" style="left:${pos01(f.mw[0])}%;width:${Math.max(1,pos01(f.mw[1])-pos01(f.mw[0]))}%" title="what fits here"></div>
   ${cases.map((c,i)=>`<div class="tick${i%2?' alt':''}" style="left:${pos01(c.mw)}%"><span>${esc(c.n)}</span></div>`).join('')}
   ${VAL.length>1?`<input id="mw" type="range" min="${pu(VAL[0])}" max="${pu(VAL[VAL.length-1])}" step="1" value="${pu(thumb)}" style="margin-left:${pos01(VAL[0]).toFixed(2)}%;width:${(pos01(VAL[VAL.length-1])-pos01(VAL[0])).toFixed(2)}%" aria-label="Size to test, MW" aria-valuetext="${thumb} MW">`:''}</div>
   <div class="mwscale">${[0.1,1,10,40].map(v=>`<span style="left:${pos01(v)}%">${v}${v===40?' MW':''}</span>`).join('')}</div>
   <div class="src">${VAL.length>1?`The slider runs from ${VAL[0]} to ${VAL[VAL.length-1]} MW: the sizes that pass every rule on this lot with this set-up.`:VAL.length?`Only ${VAL[0]} MW passes every rule on this lot with this set-up.`:'No size passes every rule on this lot with this set-up.'} Bar under the track: what the floor holds. Ticks: built or proposed sites, operator or applicant figures. Steps widen as size grows.</div></div>
  <h3>What that size needs</h3><dl>
  <dt>Power at full load</dt><dd>${rng(fac[0],fac[1],'MW')} at the meter (servers × PUE 1.4–1.55: industry surveys, not this design); this sizes the grid connection and the cooling plant</dd><dt>Power on average</dt><dd>${rng(fac[0]*R.lfR[0],fac[1]*R.lfR[1],'MW')} (about ${Math.round(R.lfR[0]*100)}–${Math.round(R.lfR[1]*100)} % of full load over a year: low end Uptime 2024 survey, high end Fan et al. 2007); this sets the yearly energy</dd>
  <dt>Plant space</dt><dd>${rng(plA[0],plA[1],'m²')} with ${coolerFor(false).name}; ${rng(plRA[0],plRA[1],'m²')} with heat recovery: cooling units with their clear zones and spacing (maker layout guides); UPS and battery rooms equipment only</dd>
  <dt>Standby fuel</dt><dd>${A.gens==='none'?'none: no generators chosen':`${rng(fuel[0],fuel[1],'L')} for 12 h, Uptime's minimum; ${rng(fuel[0]*2,fuel[1]*4,'L')} at the 24–48 h operators report (claims). Generator tanks over 2,500 L, as here, fall under the fire code's Part 4 (smaller ones under CSA B139, NFC 2020 4.1.1.1.(3)(b)): Part 4 lets a protected storage room hold ${fmt(R.fuelLimit.first)} L on the first storey and ${fmt(R.fuelLimit.low)} L in a basement or upper storey (Table 4.3.13.4.-B). ${fuelAt==='roof'?(fuelOver?`<span class="k">Over the limit:</span> the generators are on the roof, where a tank supplying an engine may hold at most 1,250 L and 2,500 L on one supply line (CSA B139.1.1 6.5.3; register arch_csa_b139); each set's tank would hold about ${fmt(Math.round(fuelPer/100)*100)} L, so this size is blocked with roof generators`:`The generators are on the roof: each set's tank is within the 2,500 L a supply line CSA B139.1.1 6.5.3 allows there (register arch_csa_b139)`):'The generators stand in the yard, outdoors at grade: each set keeps the CSA B139.1.0 Table 2 distances to the property line and the building (register arch_csa_b139)'}}`}</dd>
  <dt>Electrical service</dt><dd>${esc(svc)}</dd>
  ${f.cpcn?`<dt>Grid</dt><dd class="draft">${esc(gridNote(f).t)}</dd>`:''}
  ${pos==='upper'?`<dt>Floor strength</dt><dd class="draft">Office floors above grade are designed for 2.4 kPa; equipment rooms need at least 3.6 kPa, and data halls their actual load — likely strengthening.</dd>`:''}
  </dl>${src('pue')}${src('plant')}${src('fuel')}${src('svc')}${f.cpcn?src('grid2'):''}${pos==='upper'?src('floor'):''}${mathNeeds(mw,fac,f)}
  <div class="next"><button id="toRecv">What it exchanges →</button><span class="sub">Heat, energy, water and people, each in 3D.</span></div>
  <div class="draftnote">Every range carries the register's confidence; nothing here is a design.</div>`;
  $('#side').innerHTML=h;
  $('#back').onclick=()=>{ BD.S.view2=null; BD.scene3d&&BD.scene3d.hide(); BD.card(); BD.draw(); };
  { const sl=$('#mw'); if(sl){ sl.oninput=e=>{ const v=vAt(+e.target.value); $('#mwv').textContent=v; $('#mwn').textContent=near(v)+over(v); e.target.setAttribute('aria-valuetext',v+' MW'); };
    sl.onchange=e=>{ A.mw=vAt(+e.target.value); fitsView(); }; } }
  $('#toRecv').onclick=()=>tabView('heat');
  $('#toPrec').onclick=e=>{ e.preventDefault(); tabView('prec'); };
  $('#toSens').onclick=e=>{ e.preventDefault(); BD.views.sens(); };
  const rp=$('#toRep'); if(rp) rp.onclick=e=>{ e.preventDefault(); BD.siteReport(); };
  document.querySelectorAll('#dens button').forEach(b=>b.onclick=()=>{ A.density=b.dataset.v; A.mw=null; fitsView(); });
  BD.draw(); if(BD.showModel&&!(BD.drawer&&BD.drawer.isOpen())) BD.showModel();
}

/* ---------- who could take the heat ---------- */
const TYPE={housing:'Non-market housing',school:'School',campus:'University or college campus',care:'Care home',hospital:'Hospital',rec:'Recreation centre',hall:'Community league hall',pool:'Pool',arena:'Indoor arena',apartment:'Apartment building',office:'Office building',hotel:'Hotel',commercial:'Commercial building'};
const FIRM={completed:'existing','under construction':'committed',approved:'planned',proposed:'proposed'};
function nearby(f,d){ const out=[]; for(const p of d.pts){ const dist=recvDist(f,p); const reach=R.recvRadius; if(dist<=reach) out.push(Object.assign({dist,reach,guide:false,rvo:R.reach[p.t]||R.reachGuide},p)); } return out.sort((a,b)=>a.dist-b.dist); } /* finding I-03 (30 Oct 2026): search to the register's 3 km (receiver_radius); the RVO reaches are kept only as a reference (rvo) */
function netsAt(f,d){ return d.nets.map(n=>{ const inside=BD.pip(f.c[0],f.c[1],n.r); const e=distToRing(f.c[0],f.c[1],n.r); return Object.assign({inside,edge:e},n); }).filter(n=>n.inside||n.edge<1200).sort((a,b)=>(b.inside-a.inside)||(a.edge-b.edge)); } // inside first, then nearest (verification sweep M16)
async function recvView(){
  const f=siteFacts(); BD.S.view2='recv'; const d=await loadRecv(f.city); const near=nearby(f,d), nets=netsAt(f,d);
  const by={}; near.forEach(p=>(by[p.t]=by[p.t]||[]).push(p));
  let h=tabBar('heat')+`<h2>Who could take the heat</h2>
  <p class="draft">Candidates, not commitments: places whose type of demand could use low-grade heat, within the distance at which a pipe has paid back elsewhere. Each still has to pass its own tests.</p>`;
  if(nets.length) h+=nets.map(n=>`<h3>District energy</h3><p><b>${esc(n.n)}</b> — ${n.edge<50?`<span class="draft">on the edge of its service area (${n.src==='van9552'?'within the ±45 m of the tracing':'its boundary here is approximate'}) — check the schedule for this lot</span>`:n.inside?'<span class="draft">inside its service area</span>':`${kmOrM(n.edge)} outside its ${n.src==='van9552'?'':'approximate '}service area`}</p><p class="sub">${esc(n.note)}</p>${n.src==='van9552'?src('neu'):''}`).join('');
  if(f.city==='edm'){ const nb=String(((BD.S.sel||{}).a||[])[10]||''); h+=`<h3>District energy in Edmonton</h3><p class="sub">${/BLATCHFORD/.test(nb)?'<span class="draft">This lot is in the Blatchford neighbourhood.</span> ':''}Blatchford's district energy sharing system is compulsory inside its service area: owners must connect each building (Bylaw C17943 s. 6), unless the City Manager exempts a net-zero carbon building (s. 8). The service area exists only as a map (Schedule A), not yet traced in the tool. Downtown district energy phases are not yet traced either.</p><div class="src"><span class="evb ev-record">public record</span> City of Edmonton Bylaw C17943 (Blatchford District Energy Sharing System)</div>`; }
  if(f.downtown) h+=`<h3>Downtown steam</h3><p class="sub">Creative Energy's steam network serves more than 200 downtown buildings (BCUC G-310-21A). Its service area is not published as a map, so it is not drawn. Steam needs far hotter heat than a data centre gives off.</p>`;
  const order=['housing','school','campus','care','hospital','pool','rec','hall','arena'];
  h+=`<h3>Buildings within reach</h3>`;
  if(!near.length) h+=`<p class="sub">None of the recorded receiver types within reach.</p>`;
  for(const t of order){ const L=by[t]; if(!L) continue;
    h+=`<div style="margin-top:10px"><b>${esc(TYPE[t])}</b> <span class="sub">${L.length} within ${kmOrM(L[0].reach)}${L[0].guide?' (no published reach for this type — the housing figure is used as a guide)':''}${t==='arena'?' · an ice plant is also a heat source':''}</span>
    <ul style="margin:4px 0 0;padding-left:18px;font-size:13px">${L.slice(0,5).map(p=>`<li>${esc(p.n||'—')} <span class="sub">${kmOrM(p.dist)}${p.u?` · ${p.u} homes`:''}${p.s&&FIRM[p.s]?` · ${FIRM[p.s]}`:''}</span></li>`).join('')}${L.length>5?`<li class="sub">and ${L.length-5} more</li>`:''}</ul></div>`; }
  { const A=BD.S.answers, mw=A.mw||1, r=calc({mw,recover:true,to:'near'},f,near,nets), it=r.itMWh;
    h+=`<h3>Heat this size could offer</h3><p class="sub">${mw} MW of servers, liquid-cooled with a heat pump (option B on the Options tab). Worked at full IT load: an upper bound, since halls rarely run full (no typical share sourced ?).</p>
    <dl><dt>Heat after the heat pump</dt><dd>${rng(r.avail[0]/1000,r.avail[1]/1000,'GWh/yr')}</dd><dt>Equal to the heating of</dt><dd>${rng(r.homes[0],r.homes[1],'homes')} (space and hot water, provincial average; available, not heated)</dd>
    <dt>Heat-pump electricity</dt><dd>${rng(r.hp[0]/1000,r.hp[1]/1000,'GWh/yr')} → ${rng(r.co2[0],r.co2[1],'t CO₂e/yr')}</dd></dl>${src('lf')}${src('cap')}${src('cop')}${src('homes')}${src('grid')}
    ${mathBox([
      `Server electricity in a year: ${mw} MW × 8,760 h × ${R.lfR[0]}–${R.lfR[1]} average load = <b>${n0(r.itMWhR[0])}–${n0(r.itMWhR[1])} MWh</b> (load: low end Uptime 2024 survey, high end Fan et al. 2007).`,
      `Heat captured into liquid: ${n0(it)} × ${R.capture[0]} = ${n0(it*R.capture[0])} MWh, up to × ${R.capture[1]} = <b>${n0(it*R.capture[1])} MWh</b>.`,
      `A heat pump adds its own electricity as heat: heat out = captured × COP ÷ (COP − 1). With COP ${R.cop[1]}: × ${(R.cop[1]/(R.cop[1]-1)).toFixed(3)}; with COP ${R.cop[0]}: × ${(R.cop[0]/(R.cop[0]-1)).toFixed(3)}. Low end ${n0(it*R.capture[0])} × ${(R.cop[1]/(R.cop[1]-1)).toFixed(3)} = ${n0(r.avail[0])} MWh; high end ${n0(it*R.capture[1])} × ${(R.cop[0]/(R.cop[0]-1)).toFixed(3)} = <b>${n0(r.avail[1])} MWh</b>.`,
      `Heat-pump electricity = heat out ÷ COP: ${n0(r.avail[0])} ÷ ${R.cop[1]} = ${n0(r.hp[0])} MWh; ${n0(r.avail[1])} ÷ ${R.cop[0]} = <b>${n0(r.hp[1])} MWh</b>.`,
      `Homes: heat ÷ ${R.homeHeat[f.city]} MWh, the heat a home needs (${R.homeMWh[f.city]} MWh of energy a home buys for heating × 0.85 boiler efficiency: our assumption, within NRCan's rated range, existing 0.55–0.89, new 0.90–0.98) a year = ${n1(r.homes[0])}–<b>${n1(r.homes[1])}</b>.`, /* 2 Nov 2026 fix pass: C-boiler */
      `Carbon: heat-pump electricity × ${R.grid[f.city]} g/kWh = ${n1(r.co2[0])}–<b>${n1(r.co2[1])} t CO₂e</b>.`],
      'Load factor: Fan et al. 2007. Capture: LBNL 2014 (direct-to-chip). COP: DEA 2026 waste-heat heat pumps to 70 °C (3.0–3.6) and observed at Meta Odense (4.5, 2020). Homes: NRCan CEUD residential, 2018–22 average. Grid: NIR 2026.')}`; }
  { const EC=BD.ECON; if(EC){ const v=EC.heatVal(f.city), pe=EC.elec[f.city], nb=v-pe/R.cop[1], nw=v-pe/R.cop[0];
    h+=`<p class="sub"><span class="draft">${esc(`The circle is the heat search's 3 km reach, a limit on street routing; the cost of each pipe decides who could take the heat. `+(nb<=0?`At ${f.city==='edm'?'Alberta':'BC'} prices the heat pump's electricity costs more than the gas the heat would replace ($${nw.toFixed(1)} to $${nb.toFixed(1)} per MWh), so no route pays back at any distance; each card shows what would have to change.`:`At ${f.city==='van'?'BC':'Alberta'} prices the heat is worth ${nw<0?`−$${(-nw).toFixed(1)} (COP 3.0: the heat pump's electricity costs more than the gas) to $${nb.toFixed(1)} (COP 4.5)`:`$${nw.toFixed(1)}–${nb.toFixed(1)}`} per MWh after the heat pump; each receiver's own break-even distance is on its card.`))}</span></p>`; } }
  h+=`${src('reach')}${src('recv')}<p class="sub" style="margin-top:10px">${f.city==='van'?'Vancouver pools and rinks are not separate records in the national database; recreation centres may contain them. Hospital records on one campus are shown as one site. Private housing and offices are not mapped yet.':'Edmonton care homes and most hospitals have no location in the national record; community league halls are shown apart from recreation centres (Vancouver has no such category); outdoor pools are marked summer-only; private housing and offices are not mapped yet.'}</p>
  `;
  $('#side').innerHTML=h; wireTabs(); BD.draw();
  const A=BD.S.answers; show3d('heat',{site:f,near,nets,plantRecover:plantArea(A.mw||1,true)[1]});
}

/* ---------- round 3: three options, trade-off tables by party ---------- */
function optionSet(f,near,nets){
  const fm=BD.fitMax?BD.fitMax():null, top=fm!=null?fm:f.mw[1], A=BD.S.answers, chosen=Math.min(A.mw||top/2,top); /* largest = everything fits (J.B. 20 Oct) */
  /* J.B. 12 Nov 2026: the liquid-cooled options (b with heat, c) size the hall at the liquid density (about 150 m²/MW, Schneider RD99, maker's reference design) */
  const fl=BD.fitMax?BD.fitMax({inside:'liquid'}):null, topL=Math.max(top,fl!=null?fl:top), LQ=' (liquid-cooled hall at about 150 m² per MW: maker’s reference design)';
  const net=nets.find(n=>n.inside&&n.edge>=50&&n.src==='van9552');
  const sizes=[Math.max(0.1,+(chosen/2).toFixed(1)),+chosen.toFixed(1),+Math.max(chosen,topL).toFixed(1)];
  // sweep 20 Oct 2026: when the chosen size is already the largest that fits, B and C came out the same; then B keeps the size air-cooled and C recovers the heat
  if(+Math.max(chosen,top).toFixed(1)-sizes[1]<0.05) return [
   {id:'a',name:'Smaller, air-cooled',gives:'least plant and grid; heat goes to the air',mw:sizes[0],recover:false},
   {id:'b',name:'Largest that fits, air-cooled',gives:'the most servers; heat goes to the air',mw:sizes[1],recover:false},
   {id:'c',name:'Largest that fits, '+(net?'heat to the network':'heat to neighbours'),gives:(net?'the most heat, sent to '+net.n:'liquid-cooled servers and a heat pump; the most heat, more than nearby buildings may take')+LQ,mw:sizes[2],recover:true,to:net?'net':'near'}];
  return [
   {id:'a',name:'Smaller, air-cooled',gives:'least plant and grid; heat goes to the air',mw:sizes[0],recover:false},
   {id:'b',name:'Chosen size, heat to neighbours',gives:'liquid-cooled servers and a heat pump; heat offered to buildings within reach',mw:sizes[1],recover:true,to:'near'},
   {id:'c',name:'Largest that fits, '+(net?'heat to the network':'heat to neighbours'),gives:(net?'the most heat, sent to '+net.n:'the most heat, more than nearby buildings may take')+LQ,mw:sizes[2],recover:true,to:net?'net':'near'},
  ];
}
function calc(o,f,near,nets){
  const r={}; const fac=[o.mw*R.pue[0],o.mw*R.pue[1]];
  r.fac=fac; r.itMWhR=[o.mw*8760*R.lfR[0],o.mw*8760*R.lfR[1]]; r.itMWh=r.itMWhR[1]; /* load range 0.4–0.6: low end with the low capture */ r.facMWh=[fac[0]*8760*R.lfR[0],fac[1]*8760*R.lfR[1]];
  r.plant=plantArea(o.mw,o.recover);   /* scope f: clear zones counted (was plantPerMW × MW, equipment only) */
  if(o.recover){ const cap=[r.itMWhR[0]*R.capture[0],r.itMWhR[1]*R.capture[1]];
    r.avail=[cap[0]*R.cop[1]/(R.cop[1]-1),cap[1]*R.cop[0]/(R.cop[0]-1)];
    r.hp=[r.avail[0]/R.cop[1],r.avail[1]/R.cop[0]];
    r.homes=r.avail.map(v=>v/R.homeHeat[f.city]); /* logic test 19 Oct: a home's 16.81 / 33.14 MWh is energy bought; the heat it needs is that × 0.85 (gas boiler) */ r.co2=r.hp.map(v=>v*R.grid[f.city]/1000);
    const net=nets.find(n=>n.inside&&n.edge>=50&&n.src==='van9552'); if(o.to==='net'&&net) r.credit=r.avail.map(v=>v*R.neuCredit);
  }
  r.fuel=[fac[0]*1000*R.fuelHours*R.fuelLkWh,fac[1]*1000*R.fuelHours*R.fuelLkWh];
  /* jobs dropped 30 Oct 2026 (J.B.: not relevant to the tool) */
  return r;
}
/* M61: Edmonton Bylaw 14600 ss. 19–22 "zoned for use as residential" (not defined there). Read with Zoning Bylaw 20001 s. 1.8.10: a residential Zone"s
   Purpose is primarily Residential Uses — Part 2 residential zones plus Part 3 special-area zones whose Purpose is housing.
   Mixed use (MU, MUN, CMUV) and Direct Control (DC, DC1, DC2) are not settled by the bylaws: the residential limit is assumed and counted apart. */
const EDM_RES=new Set(["RS", "RSF", "RSM", "RM", "RL", "RR", "HDR", "RMU", "BRH", "BLMR", "BMR", "RCES", "RAES", "CCHD", "CCMD", "CCLD", "CCSD", "OLD", "ORH", "ORA", "SLD", "SRH", "SRA", "RTCR", "RTCMR", "RVRH", "PLD", "PRH", "ALA", "GLD", "GRH", "GLRA", "GLDF", "GMRA"]), EDM_MIX=new Set(["MU", "MUN", "CMUV", "DC", "DC1", "DC2"]);
/* M62: Vancouver Noise Control By-law 6555 zones (consolidated to 14 Jul 2026). CD-1 districts by number from Sch. A (activity), B (intermediate), G (event: same limits as activity, s. 2.3).
   70, 125 and 905 are listed in both A and B (sites in both, or a by-law error): read as intermediate. Sch. B.1 outline (intermediate, overrides activity) = City open data 'Noise control areas', Intermediate Zone (2020; shape matches B.1).
   Sch. G.1 (event outline around the stadiums) is a map only: its CD-1s are covered by Sch. G. */
const VZ={A:new Set(["1", "100", "111", "113", "117", "125", "128", "142", "156", "163", "164", "165", "169", "171", "172", "177", "182", "187", "198", "199", "200", "204", "205", "206", "229", "230", "231", "232", "233", "235", "237", "238", "243", "248", "249", "258", "265", "273", "278", "279", "286", "30", "321", "361", "3B", "411", "413", "414", "418", "419", "420", "422", "423", "426", "428", "432", "435", "439", "442", "443", "445", "446", "450", "453", "455", "458", "484", "491", "497", "502", "509", "514", "517", "530", "532", "546", "549", "551", "555", "557", "561", "562", "563", "570", "571", "575", "579", "58", "580", "587", "588", "608", "616", "633", "635", "653", "666", "667", "683", "686", "699", "70", "701", "702", "705", "709", "714", "722", "776", "789", "791", "80", "803", "814", "816", "818", "833", "834", "835", "837", "883", "887", "889", "892", "895", "905", "915", "918", "921"]),B:new Set(["103", "106", "125", "131", "132", "136", "137", "14", "140", "141", "148", "158", "162", "167", "170", "180", "183", "186", "189", "190", "194", "196", "201", "210", "219", "228", "234", "239", "245", "247", "25", "250", "251", "26", "266", "268", "27", "272", "276", "284", "285", "287", "29", "328", "34", "358", "38", "410", "415", "41A", "424", "425", "427", "429", "430", "433", "449", "454", "456", "46", "460", "462", "464", "468", "47", "471", "478", "479", "482", "483", "487", "489", "493", "494", "495", "496", "501", "503", "504", "506", "508", "51", "510", "511", "512", "513", "515", "516", "518", "522", "523", "524", "525", "526", "527", "529", "531", "533", "534", "535", "536", "537", "544", "547", "548", "55", "553", "556", "558", "565", "566", "567", "572", "577", "582", "584", "59", "590", "591", "596", "60", "602", "607", "610", "614", "618", "62", "620", "626", "627", "63", "630", "637", "638", "642", "643", "647", "648", "658", "659", "66", "662", "663", "665", "668", "671", "672", "677", "679", "68", "682", "684", "685", "694", "70", "700", "704", "706", "707", "708", "715", "716", "717", "718", "719", "720", "723", "728", "730", "731", "732", "733", "734", "735", "741", "742", "743", "745", "746", "749", "756", "759", "760", "761", "768", "770", "772", "775", "779", "78", "780", "781", "782", "783", "784", "785", "786", "787", "790", "792", "793", "794", "796", "801", "806", "809", "813", "817", "819", "820", "826", "830", "832", "839", "842", "843", "844", "845", "846", "847", "850", "851", "854", "855", "858", "859", "862", "865", "870", "871", "874", "876", "877", "878", "881", "896", "899", "902", "903", "905", "909", "910", "912", "914", "917", "919", "922", "924"]),G:new Set(["311", "519", "520", "593"]),B1:[[-915.9, 2514.7, -593.4, 2181.2, 601.9, 2434.8, 1104.9, 2688.3, 1100.3, 2504.1, 1311.9, 2500.7, 1315.5, 2570.9, 1311.6, 2686.6, 1287.9, 2839.2, 1292.1, 3231.6, 1136.3, 3229.6, 1000.6, 3259.4, 1037.5, 3387.7, 838.9, 3441.8, 846.8, 3412.0, 795.7, 3345.2, 781.6, 3322.3, 660.0, 3202.7, 630.8, 3232.5, 573.6, 3176.3, 615.4, 3138.5, 468.1, 2996.8, 431.3, 3032.9, 203.7, 2806.0, 125.8, 2883.2, 115.6, 2872.9, 105.3, 2857.2, 77.6, 2802.7, 39.1, 2842.0, -66.5, 2736.0, -148.9, 2703.3, -161.6, 2714.6, -190.5, 2685.1, -322.1, 2632.0, -353.1, 2663.4, -400.6, 2612.2, -410.8, 2593.9, -417.7, 2574.3, -424.6, 2538.3, -436.7, 2540.2, -458.9, 2546.4, -485.6, 2559.0, -514.2, 2579.2, -684.0, 2746.9, -915.9, 2514.7], [-1241.8, 2275.8, -903.4, 2013.1, -750.9, 2020.8, -739.2, 2172.6, -1064.4, 2578.1, -1305.2, 2550.9, -1241.8, 2275.8]]};
const VACT=/^(MC-1|MC-2|DD|M-1|M-1A|M-1B|M-2|IC-1|IC-2|IC-3|I-1|I-1A|I-1B|I-1C|I-2|I-3|I-4|CWD|DEOD)$/, VMID=/^(C-|FC-|FCCDD|BCPED|HA-|R3-|R4-|R5-|RR-3)/;
function vZone(z,x,y){ if(!z) return null; const m=/^CD-1 \((\w+)\)/.exec(z), cd=m&&m[1];
  if(cd&&VZ.G.has(cd)) return 'activity';
  if(x!=null&&VZ.B1.some(r=>BD.pip(x,y,r))) return 'intermediate';
  if(cd) return VZ.B.has(cd)?'intermediate':VZ.A.has(cd)?'activity':'quiet';
  return VACT.test(z)?'activity':VMID.test(z)?'intermediate':'quiet'; }
/* ---------- noise by-law as a hard rule (J.B., 2 Nov 2026; site audit 1, 23; exchanges F12) ----------
   Measured where each by-law measures. Vancouver By-law 6555 s. 1.2 'point of reception': a point in the lane or street next to, but outside,
   the recipient's property, at the shortest distance between that property and the source; where nothing public lies between, any point
   outside the source's property line. Edmonton Bylaw 14600 ss. 20(1), 22(1): 'as measured at the property line of a property zoned for …'.
   Both read here as the point of the receiving lot nearest the plant (register src_fill_van6555s21, van6555zones, bylaw14600, arch_adj_edm14600).
   Where no lot outline holds a neighbouring building, its own outline is used and labelled (building, not property line: reads low ?).
   Night limit governs: the plant runs 24 h (Van ss. 2.1(b)–2.3(b); Edm ss. 20, 22). Level: Lp = Lw − 20 log r − 8 (register noise_level),
   r = horizontal distance from the cooling units' centre to that point, at least 5 m (the tool's existing near-field floor). No credit for
   screens, enclosures or indoor plant (no verified dBA reduction ?). BLOCK: over the limit at any receiver even with the quieter unit rating.
   FLAG: over only with the standard (louder) rating. Receivers: neighbouring lots that hold a building, within 1.5 km (the tiles loaded). */
const NRAD=1500, VSEC={quiet:'2.1',intermediate:'2.2',activity:'2.3'};
let NREC={key:null,list:null};
function aRec(city,id){ for(const k in BD.S.tiles){ if(!k.startsWith(city+':')) continue; const a=BD.S.tiles[k].A[id]; if(a) return a; } return null; }
function ringD(x,y,r){ let d=1e9, px=0, py=0; for(let i=0;i<r.length;i+=2){ const j=(i+2)%r.length, ax=r[i], ay=r[i+1], dx=r[j]-ax, dy=r[j+1]-ay, L2=dx*dx+dy*dy; let t=L2?((x-ax)*dx+(y-ay)*dy)/L2:0; t=Math.max(0,Math.min(1,t)); const qx=ax+t*dx, qy=ay+t*dy, e=Math.hypot(x-qx,y-qy); if(e<d){ d=e; px=qx; py=qy; } } return [d,px,py]; }
function noiseSrc(s){ const city=s.city, a=s.a||[], z=city==='van'?(a[1]||'').trim():String(a[2]||a[1]||'').trim().split(/\s+/)[0].toUpperCase(), c=s.ring?BD.centroid(s.ring):s.pt;
  return {city,zone:z,c,cls:city==='van'?(vZone(z,c&&c[0],c&&c[1])||'quiet'):null}; }
/* the limit at one receiving lot, by source zone and receiving zone, at night (register texts only) */
function noiseLimitAt(src,z,x,y){
  if(src.city==='van'){ const rc=z?vZone(z,x,y):null, q=rc===null||rc==='quiet', sc=src.cls;
    const L=q?{quiet:45,intermediate:50,activity:55}[sc]:{quiet:55,intermediate:65,activity:65}[sc];
    /* Ls: the limit that applies under every reading. A lot with no zoning record could be either: the strict limit is shown and flagged, only the looser one blocks */
    return {L,Ls:rc===null?{quiet:55,intermediate:65,activity:65}[sc]:L,cls:rc===null?'unknown':q?'quiet':'other',zt:z?`${z}, ${rc} zone`:'no parcel record: quiet zone assumed ?',sec:`Noise Control By-law 6555 s. ${VSEC[sc]}(b)(${q?'i':'ii'})`}; }
  const c0=z&&String(z).split(' ')[0], res=z&&EDM_RES.has(c0), mix=z&&EDM_MIX.has(c0), r=z==null||res||mix;
  return {L:r?50:60,Ls:z==null||mix?60:r?50:60,cls:z==null?'unknown':res?'quiet':mix?'assumed':'other',zt:z?`${c0}${mix?', residential limit assumed ?':''}`:'no parcel record: residential limit assumed ?',sec:`Bylaw 14600 s. ${r?20:22}(1)`}; }
function noiseRecv(){ const S=BD.S, s=S.sel; if(!s) return []; const city=s.city, nT=Object.keys(S.tiles).filter(k=>k.startsWith(city+':')).length, key=city+'|'+s.id+'|'+nT;
  if(NREC.key===key) return NREC.list; const src=noiseSrc(s), c=src.c; if(!c) return [];
  const own=new Set((s.rings||[]).concat(s.ring?[s.ring]:[])), mine=p=>own.has(p.r)||(city==='van'?p.id===s.id:(p.ids||[]).includes(s.id));
  const G=new Map(), C=50, cell=(x,y)=>Math.floor(x/C)+'_'+Math.floor(y/C), far=(bb,Rr)=>bb[2]<c[0]-Rr||bb[0]>c[0]+Rr||bb[3]<c[1]-Rr||bb[1]>c[1]+Rr;
  for(const k in S.tiles){ if(!k.startsWith(city+':')) continue; for(const p of S.tiles[k].par){ if(far(p.bb,NRAD+200)||mine(p)) continue;
    for(let i=Math.floor(p.bb[0]/C);i<=Math.floor(p.bb[2]/C);i++) for(let j=Math.floor(p.bb[1]/C);j<=Math.floor(p.bb[3]/C);j++){ const q=i+'_'+j; if(!G.has(q)) G.set(q,[]); G.get(q).push(p); } } }
  const siteB=new Set(s.blds||[]), byP=new Map(), list=[], ownR=[...own];
  for(const k in S.tiles){ if(!k.startsWith(city+':')) continue; for(const b of S.tiles[k].bld){ if(b.f===3||siteB.has(b)||Math.hypot(b.c[0]-c[0],b.c[1]-c[1])>NRAD) continue;
      if(ownR.some(r=>BD.pip(b.c[0],b.c[1],r))) continue; let hit=null, ha=0;
      for(const p of G.get(cell(b.c[0],b.c[1]))||[]){ const bb=p.bb; if(b.c[0]<bb[0]||b.c[0]>bb[2]||b.c[1]<bb[1]||b.c[1]>bb[3]||!BD.pip(b.c[0],b.c[1],p.r)) continue; const ar=BD.area(p.r); if(!hit||ar<ha){ hit=p; ha=ar; } }
      if(hit){ let Rv=byP.get(hit); if(!Rv){ const id=hit.ids?hit.ids[0]:hit.id, a=id!=null?aRec(city,id):null, z=a?(city==='van'?((a[1]||'').trim()||null):(a[2]||a[1]||null)):null;
          Rv=Object.assign({ring:hit.r,bb:hit.bb,lot:true,addr:a&&a[0]?String(a[0]).trim():'',blds:[]},noiseLimitAt(src,z,b.c[0],b.c[1])); byP.set(hit,Rv); list.push(Rv); } Rv.blds.push(b); }
      else { let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9; for(let i=0;i<b.r.length;i+=2){ x0=Math.min(x0,b.r[i]); y0=Math.min(y0,b.r[i+1]); x1=Math.max(x1,b.r[i]); y1=Math.max(y1,b.r[i+1]); }
        list.push(Object.assign({ring:b.r,bb:[x0,y0,x1,y1],lot:false,addr:'',blds:[b]},noiseLimitAt(src,null,b.c[0],b.c[1]))); } } }
  /* 8 Nov 2026 (J.B., Engineering gate): every neighbouring lot is a receiver, with or without a building. By-law 6555 s. 1.2 'point of reception': a point in the
     lane or street 'adjacent to but outside of the property occupied by the recipient', or, with no public property between, 'any point outside the property line'
     of the source; that an empty lot has a point of reception is our reading (register van6555_por). Edmonton Bylaw 14600 measures at 'the property line of a
     property zoned for' a use, building or not. Lots already holding a receiver are skipped; one entry per lot (smallest outline first, a lot whose centre falls in
     one already added is skipped, so Edmonton city parcels and lot outlines are not counted twice). Screens get no credit there (no receiver height). */
  NREC.skipped=0; { const have=[...byP.keys()], cand=[], seen=new Set(), ctr=r=>BD.centroid(r);
    for(const k in S.tiles){ if(!k.startsWith(city+':')) continue; for(const p of S.tiles[k].par){ if(far(p.bb,NRAD)||mine(p)) continue; const key=(p.ids?p.ids[0]:p.id)+':'+p.r[0]; if(seen.has(key)) continue; seen.add(key); cand.push(p); } }
    cand.sort((a,b)=>BD.area(a.r)-BD.area(b.r));
    const taken=have.slice(); const inTaken=(x,y)=>taken.some(q=>x>=q.bb[0]&&x<=q.bb[2]&&y>=q.bb[1]&&y<=q.bb[3]&&BD.pip(x,y,q.r));
    for(const p of cand){ if(byP.has(p)) continue; const c=ctr(p.r); if(inTaken(c[0],c[1])) continue; taken.push(p);
      const id=p.ids?p.ids[0]:p.id, a=id!=null?aRec(city,id):null, z=a?(city==='van'?((a[1]||'').trim()||null):(a[2]||a[1]||null)):null;
      if(!z){ NREC.skipped=(NREC.skipped||0)+1; continue; } /* an empty outline with no zoning record (a road, lane or remnant, most likely): not a premises the tool can name, so not tested; counted (noiseCheck noRec) */
      list.push(Object.assign({ring:p.r,bb:p.bb,lot:true,noBld:true,key:(p.ids?p.ids[0]:p.id)+':'+p.r[0],addr:a&&a[0]?String(a[0]).trim():'',blds:[]},noiseLimitAt(src,z,c[0],c[1]))); } }
  for(const [p,Rv] of byP) Rv.key=(p.ids?p.ids[0]:p.id)+':'+p.r[0];
  NREC={key,list,skipped:NREC.skipped||0}; return list; }
/* the check for one model (one size and set-up): a small summary; the level at each neighbouring building goes to NLEV for the 3D */
const NLEV=new WeakMap(), NLOT=new Map(); /* NLOT: the level at each tested lot, by lot key ('<id>:<first x>'), with or without a building (8 Nov 2026) */
/* ---------- sourced mitigation (3 Nov 2026; research checks/research_arch_v1/noise_mitigation.md, checks 1–3 applied; register noise_level, noise_limit) ----------
   Only reductions a source gives with numbers. Path: (1) a solid screen around outdoor cooling plant: the LOWER of NSW 2021 s. 4.3 (8 dB if solid, within 20 m
   of the source, at least 4 m above the source floor, breaking line of sight to the receiver; register arch_nz_nswDcNoise) and FHWA s. 3.5.1 (5 dB at
   line-of-sight break + 1.5 dB per metre above it, cap 20 dB s. 3.4.2; highway line sources, so used here only to lower the NSW credit, our extension ?;
   arch_nz_fhwaNBDH). (2) cooling plant indoors (Seen or hidden: Bring it indoors): NSW 2021 s. 4.3 plant room, 25 dB (solid walls, roof sheeting RW 47 or
   better, gaps sealed, louvres at least Table 4-5). Source: (3) air-cooled chillers: a low-noise variant, Trane RTAF size 280 low noise, Lw 98 dBA a
   1,010 kW unit (101 standard; maker claim, register traneRTAF), capacity for capacity; (4) dry coolers: night fan speed, ΔLw = 50 log(N2/N1) (AMCA 301 as
   stated, arch_nz_amcaMathson p. 4), only down to 0.6 × full speed (Annex A.2), so at most 11.1 dB; heat rejection at that speed not checked (?).
   Source changes and path reductions add in dB through Lp = Lw − 20 log r − 8 − reduction; plant groups (roof, yard, indoors) are summed logarithmically
   (NSW s. 4.1; FHWA s. 3.1). Order tried: none → source → screen → both (Ottawa ENCG Intro p. 1: barriers only after other measures). No credit: unit
   housings ('enclose'), silencers (case values only), towers (SPX: 50 log is an upper bound), hybrid coolers. */
const NMIT=DN.mit; // tool/data/noise.json (mit), with register ids
function rayExit(px,py,ux,uy,r){ let t=1e9; for(let i=0;i<r.length;i+=2){ const j=(i+2)%r.length, ax=r[i], ay=r[i+1], ex=r[j]-ax, ey=r[j+1]-ay, den=ux*ey-uy*ex; if(Math.abs(den)<1e-12) continue;
    const s=((ax-px)*ey-(ay-py)*ex)/den, q=((ax-px)*uy-(ay-py)*ux)/den; if(s>=0&&q>=-1e-9&&q<=1+1e-9&&s<t) t=s; } return t; }
function noiseCheck(m){ const s=BD.S.sel; if(!m||!m.plant||!m.plant.s||!s) return null; const P=m.plant, k=P.s.k, n=P.s.n; if(!n) return null;
  const LU=k.name==='dry coolers'?R.lwUnitDry:R.lwUnit, lw=[LU[0]+10*Math.log10(n),LU[1]+10*Math.log10(n)];
  const cb=(P.boxes||[]).filter(b=>b.name===k.name), ind=P.coolRoofIndoor>0;
  const src=noiseSrc(s);
  /* plant groups: each placed group of cooling units at its own centre; units indoors at the centre of the building they sit in */
  const G=[]; for(const kind of ['roof','yard']){ const bx=cb.filter(b=>b.kind===kind); if(!bx.length) continue; const u=bx.map(b=>BD.centroid(b.ring));
    let hull=null; try{ const pts=[]; bx.forEach(b=>{ for(let i=0;i<b.clear.length;i++) pts.push(b.clear[i]); }); hull=new Float64Array(BD.geo.hull(new Float64Array(pts)).flat()); if(BD.geo.offset) hull=BD.geo.offset(hull,-0.5); }catch(e){ hull=null; } /* dcshare 4 Nov 2026: BD.geo.offset moves a ring inward for d > 0 on either winding (addons.js geoOffset), so the screen 0.5 m outside the units' clearance is −0.5 (it sat 0.5 m inside it) */
    const H=Math.max(...bx.map(b=>b.h)); G.push({kind,n:bx.length,c:[u.reduce((t,p)=>t+p[0],0)/u.length,u.reduce((t,p)=>t+p[1],0)/u.length],u,base:bx[0].base,H,hull,hs:Math.ceil(Math.max(NMIT.scr.minH,H+2)*10)/10,room:0}); }
  if(ind){ const fr=(m.sizedTo&&m.serverFoot)||m.serverFoot||m.foot, c=fr?BD.centroid(fr):src.c; if(c) G.push({kind:'indoors',n:P.coolRoofIndoor,c,u:[c],room:NMIT.room.dB}); }
  if(!G.length){ const fr=m.serverFoot||m.foot, c=fr?BD.centroid(fr):src.c; if(!c) return null; G.push({kind:'roof',n,c,u:[c],room:0}); }
  { const placed=G.reduce((t,g)=>t+g.n,0); if(placed<n) G[0].n+=n-placed; } /* units that did not fit (that set-up is blocked anyway) counted with the first group */
  const pc=[G.reduce((t,g)=>t+g.c[0]*g.n,0)/n,G.reduce((t,g)=>t+g.c[1]*g.n,0)/n];
  const yd=G.some(g=>g.kind==='yard'), rf=G.some(g=>g.kind==='roof'), where=ind&&!yd&&!rf?'indoors':yd&&(rf||ind)?'roof and yard':yd?'yard':ind?'roof and indoors':'roof';
  const chill=k.name==='air-cooled chillers', dry=k.name==='dry coolers', outG=G.filter(g=>g.kind!=='indoors'&&g.hull);
  const lnN=g=>Math.ceil(g.n*k.mw/NMIT.ln.mw-1e-9);
  const lwG=(g,rho,o)=>o.ln?NMIT.ln.lw+10*Math.log10(lnN(g)):LU[rho]+10*Math.log10(g.n);
  /* the screen's credit at one receiver for one group: 0 where a NSW condition fails or the receiver's height is not recorded (?) */
  const scrAt=(r,i)=>{ r.sc=r.sc||[]; if(r.sc[i]!=null) return r.sc[i]; const g=G[i], p=r.gd[i]; let c=0;
    if(g.hull&&g.kind!=='indoors'&&r.zr!=null){ const zs=g.base+g.H, zb=g.base+g.hs; let e=1e9, ok=true;
      for(const u of g.u){ const dx=p.px-u[0], dy=p.py-u[1], D=Math.hypot(dx,dy); if(D<1e-6){ ok=false; break; } const a=rayExit(u[0],u[1],dx/D,dy/D,g.hull);
        if(!(a<=NMIT.scr.within&&a<D)){ ok=false; break; } e=Math.min(e,zb-(zs+(r.zr-zs)*a/D)); } /* every unit: screen within 20 m of it toward the receiver, and the line of sight from its top */
      if(ok&&e>=0) c=Math.min(NMIT.scr.dB,NMIT.scr.fh0+NMIT.scr.fhM*e,NMIT.scr.cap); }
    return r.sc[i]=c; };
  const lev=(r,rho,o,noRoom)=>{ let e=0; G.forEach((g,i)=>{ e+=Math.pow(10,(lwG(g,rho,o)+r.gd[i].t+(noRoom?g.room:0)-(o.scr?scrAt(r,i):0))/10); }); return 10*Math.log10(e)-(o.fan||0); };
  const list0=noiseRecv(), list=[]; let nIn=0; NLOT.clear();
  for(const r of list0){ const bb=r.bb, lb=Math.max(0,bb[0]-pc[0],pc[0]-bb[2])**2+Math.max(0,bb[1]-pc[1],pc[1]-bb[3])**2; if(lb>NRAD*NRAD) continue; nIn++;
    r.gd=G.map(g=>{ const [d0,px,py]=ringD(g.c[0],g.c[1],r.ring); return {d0,px,py,t:-20*Math.log10(Math.max(5,d0))-8-g.room}; }); r.sc=null;
    const hs=r.blds.map(b=>b.h).filter(h=>h>0); r.zr=hs.length?Math.max(...hs):null; list.push(r); }
  /* options, in the order tried */
  const fanMax=-NMIT.fan.k*Math.log10(NMIT.fan.min);
  const O=[{id:'none'}]; if(chill) O.push({id:'ln',ln:true}); if(dry) O.push({id:'fan',fan:'auto'}); if(outG.length){ O.push({id:'scr',scr:true}); if(chill) O.push({id:'ln+scr',ln:true,scr:true}); if(dry) O.push({id:'fan+scr',fan:'auto',scr:true}); }
  /* worst excess over the limit (Ls: the limit that blocks; L: the strict one) for a rating and option; the screen is only worked out where it matters */
  const worstEx=(rho,o,lim)=>{ const o0=Object.assign({},o,{fan:0}); let ex=-1e9; for(const r of list){ const L=lim==='Ls'?r.Ls:r.L; let x=lev(r,rho,Object.assign({},o0,{scr:false}))-L; if(x>0&&o.scr) x=lev(r,rho,o0)-L; if(x>ex) ex=x; } return ex; };
  const solve=(rho,lim)=>{ for(let i=0;i<O.length;i++){ const o=O[i], ex=worstEx(rho,o,lim); if(o.fan==='auto'){ if(ex<=0) continue; if(ex<=fanMax){ const ratio=Math.floor(Math.pow(10,-ex/NMIT.fan.k)*100)/100; if(ratio>=NMIT.fan.min) return {i,o:Object.assign({},o,{fan:-NMIT.fan.k*Math.log10(ratio),ratio}),ex}; } continue; }
      if(ex<=0) return {i,o:Object.assign({},o,{fan:0}),ex}; } return null; };
  const q=solve(0,'Ls'), sd=solve(1,'L');
  const strongest=Object.assign({},O[O.length-1],O[O.length-1].fan==='auto'?{fan:fanMax,ratio:NMIT.fan.min}:{fan:0});
  const Fo=q?q.o:strongest;
  /* the levels under the option used (the one that passes, or the strongest modelled one when none does) */
  let wQ=null, wS=null, nQ=0, nS=0, strict=null; const bc={quiet:0,other:0,unknown:0,assumed:0}; let nB=0; const rNeed=Math.pow(10,(lw[1]-8-45)/20);
  let w0=null; /* the receiver that sets the mitigation: worst without it, quieter rating */
  for(const r of list){ const lo=lev(r,0,Fo), hi=lev(r,1,Fo), lo0=lev(r,0,{id:'none'},true), hi0=lev(r,1,{id:'none'},true); const d0=Math.min(...r.gd.map(x=>x.d0)), gi=r.gd.findIndex(x=>x.d0===d0), pt=[r.gd[gi].px,r.gd[gi].py];
    const v={lo,hi,lo0,hi0,L:r.L,Ls:r.Ls,sec:r.sec,lot:r.lot,noBld:!!r.noBld,d:d0,mit:Fo.id!=='none'||ind}; r.blds.forEach(b=>NLEV.set(b,v)); if(r.key) NLOT.set(r.key,Object.assign({addr:r.addr,zt:r.zt,cls:r.cls},v));
    if(!strict||r.L<strict.L) strict={L:r.L,sec:r.sec};
    if(!w0||lo0-r.Ls>w0.ex) w0={r,lo:lo0,hi:hi0,d:d0,ex:lo0-r.Ls,pt};
    if(hi>r.L){ bc[r.cls]=(bc[r.cls]||0)+1; if(!r.lot) nB++; }
    if(lo>r.Ls){ nQ++; if(!wQ||lo-r.Ls>wQ.ex) wQ={r,lo,hi,d:d0,ex:lo-r.Ls,pt}; }
    else if(hi>r.L){ nS++; if(!wS||hi-r.L>wS.ex) wS={r,lo,hi,d:d0,ex:hi-r.L,pt}; } }
  const roomNeed=ind&&list.some(r=>lev(r,0,Fo,true)>r.Ls);
  const lab=w=>`${w.r.addr?w.r.addr+' ':''}(${w.r.zt})${w.r.noBld?' (no building on record: point of reception at its lot line, our reading)':w.r.lot?'':' (building, not property line: reads low ?)'}`;
  const at=w=>w.r.lot?(s.city==='van'?'at the point of reception beside':'at the property line of'):'at';
  const lvl=w=>Math.abs(w.hi-w.lo)<0.05?`about ${Math.round(w.lo)} dBA (low-noise units: one rating)`:`about ${Math.round(w.lo)}–${Math.round(w.hi)} dBA (quieter–standard unit rating)`;
  const scrG=o=>o.scr?outG:[];
  const mitTxt=(o,full)=>{ const t=[];
    if(o.ln){ const nT=G.reduce((a,g)=>a+lnN(g),0); t.push(full?`${nT} low-noise chillers: Trane RTAF 280 low-noise, Lw ${NMIT.ln.lw} dBA per ${fmt(NMIT.ln.mw*1000)} kW, ${NMIT.ln.std} standard (maker claim, traneRTAF). Drawn as the basis unit: its size is not in the register (?)`:`low-noise chillers (Trane RTAF 280 LN, maker claim)`); }
    if(o.fan){ t.push(full?`night fan speed ≤ ${Math.round(o.ratio*100)}% of full: −${o.fan.toFixed(1)} dB, fan law 50 log(N2/N1), valid down to 60% (arch_nz_amcaMathson; EC fans: arch_nz_kaltraDC, maker claim). Heat rejection at that speed not checked (?)`:`night fan speed ≤ ${Math.round(o.ratio*100)}% (fan law, −${o.fan.toFixed(1)} dB)`); }
    if(o.scr){ const gs=scrG(o), hs=Math.max(...gs.map(g=>g.hs)), w=gs.map(g=>g.kind).join(' and ');
      t.push(full?`a ${hs.toFixed(1)} m solid screen around the ${w} plant, no gaps, ≥ 20 kg/m²: −${NMIT.scr.dB} dB, NSW 2021 method (arch_nz_nswDcNoise), never more than FHWA's line-of-sight rule gives (arch_nz_fhwaNBDH). Taller than the units, so EVAPCO's wall rule needs more space or the maker's approval (?)`:`a ${hs.toFixed(1)} m solid screen (${w}; NSW 2021, −${NMIT.scr.dB} dB)`); }
    return t; };
  const roomTxt=full=>full?`a plant room: solid walls, roof RW 47 or better, gaps sealed, louvres of at least 6–27 dB by band (NSW 2021 Table 4-5): −${NMIT.room.dB} dB (arch_nz_nswDcNoise)`:`a plant room to the NSW 2021 terms (−${NMIT.room.dB} dB)`;
  const govern=wQ?{L:wQ.r.Ls,sec:wQ.r.sec}:wS?{L:wS.r.L,sec:wS.r.sec}:strict;
  const sum=w=>({addr:w.r.addr,zt:w.r.zt,lot:w.r.lot,d:Math.round(w.d*10)/10,lo:Math.round(w.lo*10)/10,hi:Math.round(w.hi*10)/10,L:w.r.L,Ls:w.r.Ls,sec:w.r.sec});
  const need=q?q.o:null, needT=need?mitTxt(need,true).concat(roomNeed?[roomTxt(true)]:[]):[], needS=need?mitTxt(need,false).concat(roomNeed?[roomTxt(false)]:[]):[];
  const mit={option:need?need.id:null,tried:O.map(o=>o.id),screen:need&&need.scr?{h:Math.max(...outG.map(g=>g.hs)),on:outG.map(g=>g.kind),src:'arch_nz_nswDcNoise'}:null,
    ln:need&&need.ln?{n:G.reduce((a,g)=>a+lnN(g),0),src:'traneRTAF'}:null,fan:need&&need.fan?{ratio:need.ratio,dB:Math.round(need.fan*10)/10,src:'arch_nz_amcaMathson'}:null,room:roomNeed?{dB:NMIT.room.dB,src:'arch_nz_nswDcNoise'}:null,
    short:needS.join(' + ')||null,std:sd?sd.o.id:null};
  const out={noRec:NREC.skipped||0,lw:lw.map(x=>Math.round(x*10)/10),n,src:pc.map(x=>Math.round(x*10)/10),where,groups:G.map(g=>({kind:g.kind,n:g.n})),tested:nIn,overQ:nQ,overS:nS,limit:govern?govern.L:null,sec:govern?govern.sec:null,beyond:rNeed>NRAD,byCls:bc,bldOnly:nB,block:null,flag:null,req:null,worst:null,mit};
  const fixes=['a smaller size (fewer units)',`the cooling plant ${{roof:'in the yard or split',yard:'on the roof or split','roof and yard':'all on the roof or all in the yard',indoors:'in the yard','roof and indoors':'all indoors or in the yard'}[where]}, if that moves it further from this lot`];
  if(chill) fixes.push('liquid cooling inside, which uses dry coolers (rated about 4 dBA quieter a unit; maker claims)');
  if(!ind&&rf) fixes.push(`the roof plant indoors (Seen or hidden: Bring it indoors), credited ${NMIT.room.dB} dB as a plant room to the NSW 2021 terms (register arch_nz_nswDcNoise)`);
  const cav='Unit housings (Enclose it) and silencers get no credit: no sourced figure for them (?).';
  if(wQ){ out.worst=sum(wQ); const best=mitTxt(strongest,false).concat(ind?[roomTxt(false)]:[]);
    out.block=`Noise: the cooling plant (${where}) would give ${lvl(wQ)} ${at(wQ)} ${lab(wQ)}, ${fmt(wQ.d)} m away${best.length?`, even with ${best.join(' + ')}`:''}: over the ${wQ.r.Ls} dBA night limit with the quieter rating (${wQ.r.sec}; the plant runs 24 h, so the night limit governs)${nQ>1?`. ${nQ} neighbouring lots are over`:''}. No modelled option brings it under. To bring it under: ${fixes.join('; ')}. ${cav}`; }
  else { if(needT.length&&w0&&w0.ex>0){ out.worst=sum(w0);
      out.req=`Noise: needs ${needT.join('; and ')}. Without it: ${lvl(w0)} ${at(w0)} ${lab(w0)}, ${fmt(w0.d)} m away; limit ${w0.r.Ls} dBA at night (${w0.r.sec}).`; }
    if(wS){ if(!out.worst) out.worst=sum(wS); const more=sd?mitTxt(sd.o,false).concat(roomNeed?[roomTxt(false)]:[]).join(' + '):null;
      out.flag=wS.lo>wS.r.L?`Noise: the plant would exceed the ${wS.r.L} dBA night limit ${at(wS)} ${lab(wS)} (${lvl(wS)}${need&&need.id!=='none'?` with ${needS.join(' + ')}`:''}, ${wS.r.sec}) if that lot takes the stricter limit; its zoning is not known, so this is a note, not a block${nS>1?` (${nS} lots in all over a limit with the louder rating)`:''}.`
        :`Noise: with the standard (louder) unit rating the plant would exceed the ${wS.r.L} dBA night limit ${at(wS)} ${lab(wS)} (${lvl(wS)}${need&&need.id!=='none'?` with ${needS.join(' + ')}`:''}, ${wS.r.sec})${nS>1?`; ${nS} lots in all`:''}. With the quieter rating it is under, so this is not blocked: ${more&&(sd.o.id!==(need?need.id:'none')||(sd.o.fan||0)>((need&&need.fan)||0)+1e-9)?`standard units would need ${more}`:more?'quieter units would need to be chosen':'no modelled option brings standard units under, so quieter units would need to be chosen'}.`; } }
  return out; }
function noiseRow(f){
  if(f.city==='edm') return ['Night limit at the property line','50 dBA next to homes, 60 dBA next to other uses (Bylaw 14600)','noise'];
  const zc=vZone(f.zone,f.c[0],f.c[1]), act=zc==='activity', mid=zc==='intermediate';
  const t=act?'activity zone: 55 dBA at night at a quiet-zone home, 65 at a mixed or industrial neighbour':mid?'intermediate zone: 50 dBA at night at a quiet-zone home, 65 at a mixed or industrial neighbour':'quiet zone (or not listed): 45 dBA at night at a quiet-zone home, 55 elsewhere';
  return ['Night limit at the neighbour',t,'noise'];
}
function state(k){ return `<span class="st st-${k}" title="${esc({met:'met',chg:'met with a change',not:'not met',cj:'not yet known'}[k])}"></span>`; }
async function optionsView(){
  const f=siteFacts(); BD.S.view2='opts'; const d=await loadRecv(f.city); const near=nearby(f,d), nets=netsAt(f,d);
  const opts=optionSet(f,near,nets).map(o=>Object.assign(o,{r:calc(o,f,near,nets)}));
  /* bugfix 4 Nov 2026 (retest rules 3): each option is checked against every hard rule at its size and cooling (setupProblems, the floor check included;
     the same set-up the report draws), and one that fails is marked blocked, with the rule (E123: option A at 1.9 MW, the chillers do not fit on the roof). */
  { const A=BD.S.answers, keep={mw:A.mw,inside:A.inside}; try{ for(const o of opts){ A.mw=o.mw; A.inside=o.recover?'plate':'air'; BD.modelReset&&BD.modelReset(); o.miss=BD.setupProblems?BD.setupProblems():[]; } }
    finally{ A.mw=keep.mw; if(keep.inside===undefined) delete A.inside; else A.inside=keep.inside; BD.modelReset&&BD.modelReset(); } }
  const zs=f.status.k, zState=zs==='yes'?'met':zs==='case'?'chg':zs==='site'?'cj':'chg';
  const net=nets.find(n=>n.inside);
  const rows=[
   ['The operator',[
     ['Servers',o=>o.mw.toFixed(1)+' MW'],
     ['Plant space',o=>rng(o.r.plant[0],o.r.plant[1],'m²')+' (cooling units with clear zones; UPS and batteries equipment only)'],
     ['Standby fuel, 12 h minimum (24–48 h typical, claims)',o=>BD.S.answers.gens==='none'?'none (no generators chosen)':rng(o.r.fuel[0],o.r.fuel[1],'L')],
     ['Zoning path',()=>`${state(zState)}${esc(f.status.t)}${zs==='no'?(f.city==='van'?' — about 15 months to a Vancouver decision':' — the City targets 160 calendar days for a complex rezoning (about 5.5 months, after a pre-application meeting), then a Council public hearing'):''}`]]],
   ['The utility and the grid',[
     ['Power at full load',o=>rng(o.r.fac[0],o.r.fac[1],'MW')],['Power on average',o=>rng(o.r.fac[0]*R.lfR[0],o.r.fac[1]*R.lfR[1],'MW')],
     ['Electricity a year',o=>rng(o.r.facMWh[0]/1000,o.r.facMWh[1]/1000,'GWh')],
     ['Grid connection',()=>f.cpcn?`${state('chg')}${gridNote(f).t}`:`${state('cj')}needs the utility's answer to a load application`]]],
   ['Receivers',[
     ['Heat offered after the heat pump',o=>o.recover?rng(o.r.avail[0]/1000,o.r.avail[1]/1000,'GWh/yr'):`${state('cj')}not yet known — this option sends its heat to the air; air-cooled heat (25–47 °C) can be reused with heat pumps, but no source gives how much for a whole hall`],
     ['Equal to the heating of',o=>o.recover?rng(o.r.homes[0],o.r.homes[1],'homes')+' (space and hot water, provincial average)':'—'],
     ['Within reach',o=>o.to==='net'&&net?`${state(net.edge<50?'cj':'chg')}${esc(net.n)} — ${net.edge<50?'on the edge of the service area':'compulsory connection; heat sent back is credited'}`:o.recover?`${state('cj')}${near.length} within straight-line reach (Dutch five-year payback distances, used only to say where to look); the Heat step tests break-even at BC or Alberta prices`:'—'],
     ['How much they would take',o=>o.recover?`${state('cj')}needs each receiver's monthly demand — a year of heat is mostly needed in winter (about ${R.monthRatio[f.city].toFixed(1)} : 1 between the busiest and quietest month)`:'—'],
     ['Other source already serving',()=>net&&net.src==='van9552'?`${state('chg')}the NEU runs mostly on sewage heat`:net?`${state('cj')}${esc(net.n.replace(/ \(.*/,''))}: its heat source is not stated in the tool`:`${state('cj')}not known for these buildings`],
     ['Price for the heat',o=>o.r.credit?`$${fmt(o.r.credit[0])}–$${fmt(o.r.credit[1])} a year at the NEU's credit ($32.59/MWh), if the NEU took all the heat offered (what it takes depends on its demand)`:o.recover?`${state('cj')}${f.city==='van'?'no published price outside the NEU':'no published price; Edmonton\'s district energy prices at the gas-equivalent cost plus avoided boiler costs'}`:'—']]],
   ['The climate',[
     ['Heat-pump electricity',o=>o.recover?rng(o.r.hp[0]/1000,o.r.hp[1]/1000,'GWh/yr')+' → '+rng(o.r.co2[0],o.r.co2[1],'t CO₂e/yr'):'—'],
     ['Against what it replaces',o=>o.recover?`${state('cj')}depends on how the receivers heat now (gas, electric, district)`:'—']]],
   ['Neighbours',[[noiseRow(f)[0],()=>noiseRow(f)[1]],['Generator testing',()=>f.city==='van'?'exempt if ≤ 1 h a month in daytime (plus once a year ≤ 3 h), ≤ 80 dBA at the point of reception or 6.1 m, whichever is greater (By-law 6555 s. 4.1(c)). Not checked (?): no rated generator sound level with a source in the register':'not checked (?): no rated generator sound level with a source in the register']]],
  ];
  const fut=o=>[['As planned','the table above'],['Tenant changes cooling',o.recover?'back to air: heat offered drops to none':'to liquid: heat could be offered'],['Tenant leaves',o.recover?'receivers fall back on their own heating at full peak':'nothing depends on it'],['Receiver leaves',o.recover?`all heat goes back to the ${BD.dryName()} — keep their full size`:'—']].map(([a,b])=>`<div><b>${a}</b> <span class="sub">${b}</span></div>`).join('');
  let h=tabBar('opts')+`<h2>Three options, side by side, in no order</h2>
  <p class="draft">Each option gains and gives up something.</p>
  <div class="opts">${opts.map(o=>`<div class="opt"><div class="kind">${o.id.toUpperCase()}${o.miss.length?' · blocked':''}</div><b>${esc(o.name)}</b><div class="sub">${esc(o.gives)}</div>${o.miss.length?`<div class="sub"><span class="k">Blocked here:</span> ${esc(o.miss[0])}${o.miss.length>1?` (and ${o.miss.length-1} more)`:''}</div>`:''}</div>`).join('')}</div>
  <div class="tt"><table><thead><tr><th></th>${opts.map(o=>`<th>${o.id.toUpperCase()}${o.miss.length?' (blocked)':''}</th>`).join('')}</tr></thead><tbody>`;
  for(const [party,rr] of rows){ h+=`<tr class="party"><td colspan="${opts.length+1}">${esc(party)}</td></tr>`;
    for(const [lab,fn] of rr){ const c=opts.map(o=>fn(o)); h+=c.every(x=>x===c[0])?`<tr><td>${esc(lab)}</td><td colspan="${opts.length}">${c[0]}</td></tr>`:`<tr><td>${esc(lab)}</td>${c.map(x=>`<td>${x}</td>`).join('')}</tr>`; } }
  h+=`</tbody></table></div>
  <h3>Four futures</h3><div class="opts">${opts.map(o=>`<div class="opt"><div class="kind">${o.id.toUpperCase()}</div>${fut(o)}</div>`).join('')}</div>
  <div class="legend2">${state('met')}met ${state('chg')}met with a change ${state('not')}not met ${state('cj')}not yet known</div>
  ${src('pue')}${src('lf')}${src('cap')}${src('cop')}${src('homes')}${src('grid')}${net?src('neu'):''}${src('noise')}
  <div class="draftnote">Ranges carry the register's confidence; "not yet known" names what is missing.</div>`;
  $('#side').innerHTML=h; document.body.classList.add('wide'); wireTabs(); BD.draw();
  if(BD.scene3d) BD.scene3d.showOptions(opts.map(o=>({id:o.id,mw:o.mw,name:o.name,recover:o.recover,to:o.to,n:o.id==='c'?14:6,plant:plantArea(o.mw,o.recover)[1],
    caption:o.mw.toFixed(1)+' MW · '+(o.recover?rng(o.r.avail[0]/1000,o.r.avail[1]/1000,'GWh heat offered'):'heat to the air')})),{site:f,near,net:nets.find(n=>n.inside)}).catch(e=>console.warn(e));
}

/* ---------- map layer: receivers, reach, networks ---------- */
const RC={housing:'#B9B8B4',apartment:'#B9B8B4',office:'#A3A29D',hotel:'#A3A29D',commercial:'#A3A29D',school:'#8D8C87',campus:'#8D8C87',care:'#6E6E6B',hospital:'#6E6E6B',rec:'#6E6E6B',hall:'#6E6E6B',pool:'#6E6E6B',arena:'#6E6E6B'};
BD.paintRecv=function(ctx,s,lw){
  const d=BD.recv[BD.S.city]; if(!d) return;
  for(const n of d.nets){ ctx.setLineDash([8/s,5/s]); ctx.strokeStyle='rgba(209,163,94,.85)'; ctx.lineWidth=lw(1.6); ctx.stroke(n.path); ctx.setLineDash([]); ctx.fillStyle='rgba(209,163,94,.06)'; ctx.fill(n.path); }
  if(s<0.35) return;
  const r=lw(4.5);
  for(const p of d.pts){ ctx.fillStyle=RC[p.t]||'#6E6E6B'; ctx.globalAlpha=.9; ctx.beginPath();
    if(p.t==='housing') ctx.rect(p.x-r*.8,p.y-r*.8,r*1.6,r*1.6); else if(p.t==='school') { ctx.moveTo(p.x,p.y+r); ctx.lineTo(p.x+r,p.y-r*.8); ctx.lineTo(p.x-r,p.y-r*.8); ctx.closePath(); } else ctx.arc(p.x,p.y,r,0,7);
    ctx.fill(); ctx.globalAlpha=1; }
  const sel=BD.S.sel; if(sel&&BD.S.view2&&BD.S.view2!=='fits'){ const c=sel.ring?BD.centroid(sel.ring):sel.pt;
    ctx.setLineDash([4/s,4/s]); ctx.lineWidth=lw(1);
    for(const [rad,col] of [[3000,'rgba(159,179,138,.6)']]){ /* the heat search's 3 km reach (J.B. 19 Oct); the Dutch 1–1.5 km circles are retired */ ctx.strokeStyle=col; ctx.beginPath(); ctx.arc(c[0],c[1],rad,0,7); ctx.stroke(); }
    ctx.setLineDash([]); }
};
BD.legendRecv=function(){ return `<div style="margin-top:6px"><i style="border:1px dashed #D1A35E"></i>District energy service area (NEU traced from its by-law; others approximate)</div>
 <div><i style="background:#B9B8B4;width:8px;height:8px"></i>Non-market housing <i style="background:#8D8C87;width:8px;height:8px;margin-left:6px"></i>School</div>
 <div><i style="background:#6E6E6B;width:8px;height:8px;border-radius:50%"></i>Care, hospital <i style="background:#6E6E6B;width:8px;height:8px;border-radius:50%;margin-left:6px"></i>Recreation, pool <i style="background:#6E6E6B;width:8px;height:8px;border-radius:50%;margin-left:6px"></i>Arena</div>`; };

/* ---------- the exchange tabs (J.B., 15 Oct): heat · energy · water · materials · social · options; each with a 3D view ---------- */
const TABS=[['prec','Precedents'],['heat','Heat'],['energy','Energy'],['water','Water'],['social','People'],['opps2','Opportunities'],['opts','Options'],['time','Over time'],['cities','Two cities']];
/* the path through the tool (J.B., 16 Oct: "make the path through the tool clear"): five steps, sub-views only inside a step; context at the end */
const STEPS=[['site','Site'],['fits','What fits'],['ex','Exchanges',[['heat','Heat'],['energy','Electricity'],['water','Water'],['social','People']]],
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
    if(trs.length&&trs.every(r=>r.querySelectorAll('.cls').length===1)){ const ct={}; trs.forEach(r=>{ const k=r.querySelector('.cls').textContent.trim(); ct[k]=(ct[k]||0)+1; }); const GW={'possible here':'pass','possible with a change':'pass with a change','not yet known':'not yet known','not here':'fail','not possible here':'fail'}; /* sweep 20 Oct: these count tests, not opportunities */ return [cut(Object.entries(ct).map(([k,v])=>`${v} ${v===1?'test':'tests'} ${GW[k]?(v===1?GW[k].replace(/^pass/,'passes').replace(/^fail/,'fails'):GW[k]):k}`).join(', ')),false]; }
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
function tabView(k){ document.body.classList.remove('wide'); BD.S.view2='tab'; if(BD.drawer&&BD.drawer.isOpen()) BD.drawer.close(); if(BD.tabOverride&&BD.tabOverride[k]) return BD.tabOverride[k](); ({heat:recvView,energy:energyView,water:waterView,social:socialView,opts:optionsView,prec:precView}[k]||(BD.views&&BD.views[k]))(); }
function show3d(tab,data){ if(!BD.scene3d) return; BD.scene3d.show(tab,data).catch(e=>{ const n=document.getElementById('st'); if(n) n.textContent='3D view could not load: '+e.message; }); }
/* M47: a new building's roof is the footprint drawn from the site setup (else the yard-based footprint); an existing one is every building on the lot */
function roofArea(f){ const A=BD.S.answers; if(A.built==='new') return (f.M&&f.M.footArea)||f.fp||0; return f.foot||0; }
const SRC3={
 elec:'register: electricity_price (BC Hydro large general service rates from 1 Apr 2026; AESO pool 2025)', pv:'register: pv_roof (NRCan municipal PV potential values, kWh per kWp, horizontal to latitude tilt; NREL module density and roof suitability)',
 batt:'register: battery (NREL ATB 2024; Reber 2023 34 ± 15 kWh/m²)', ups:'register: ups_flex (vendor runtimes — operator claims)', dr:'register: peak_relief (BC Hydro Demand Response for Business; AESO reserves)',
 ev:'register: ev_stalls, ev_area (charger ratings; Vancouver and Edmonton parking dimensions)', gen:'register: genset_test (AUC 27938-D01-2023, derived; AP-42 Table 3.4-1 upper bounds)', ctl:'register: workload_control (Crozier & Liska 2025)',
 evap:'register: evaporation, blowdown (physics: heat ÷ latent heat; cycles of concentration 2–6, FEMP/EPA)', rain:'register: rainwater (ECCC Normals 1991–2020; runoff coefficient 0.8 and a one-wet-month tank assumed; CSA B805 not read)',
 reuse:'register: a_reuse_rules, reclaimed_makeup (VBBL 2025; Metro Vancouver UT-019; EPCOR)', wprice:'register: water_supply (City of Vancouver 2026 rates)', sewer:'register: sewer_sink (Bylaw 299 limits; KWL 2014)',
 srv:'LBNL 2024: about 600 W per server (register: servers)', ew:'register: ewaste (server masses 21.2–26.3 kg, 6-year refresh)', cu:'register: copper_tonnes (Copper Development Association 2023 — industry figure)',
 snd:'register: noise_level (screen Lp = Lw − 20 log r − 8; Vertiv Liebert AFC chillers, 1.49 MW each: Lw 102.8–106.1 dB(A), our conversion from Lp at 1 m)', lf:'register: lf_flag (AUC Rule 012 s. 4.5)', light:'register: light_at_window (CIE 150:2017; Edmonton Bylaw 20001 s. 5.120(3); Vancouver: no lux limit)',
 so:'register: standoff (Ontario GO-ITS 25.18, transferred)', watch:'register: watched_area (field observation, labelled as one person\'s)', ppl:'Statistics Canada, Census 2021 Profile by dissemination area (98-401-X2021006) and DA boundaries; counts spread evenly within each area',
};
const s3=k=>`<div class="src">${badge(k==='lf'?'lf2':k)}${esc(SRC3[k])}</div>`;
function energyView(){
  const f=siteFacts(), A=BD.S.answers, mw=A.mw||1, fac=[mw*R.pue[0],mw*R.pue[1]], MWh=[fac[0]*8760*R.lfR[0],fac[1]*8760*R.lfR[1]];
  const roof=roofArea(f), plant=plantArea(mw,false)[1], share=Math.min(0.9,roof?plant/roof:0);
  const kwp=[roof*0.66*(1-share)*0.70*0.16,roof*0.66*(1-share)*0.70*0.20], yld=f.city==='van'?[892,1007]:[944,1244], pvMWh=kwp.map((v,i)=>v*yld[i]/1000);
  const co2=MWh.map(v=>v*R.grid[f.city]/1000);
  const cost=f.city==='van'?[MWh[0]*1000*0.0679+fac[0]*1000*13.83*12,MWh[1]*1000*0.0679+fac[1]*1000*13.83*12]:null;
  const Pg=f.M&&f.M.plant&&f.M.plant.s, gInst=Pg&&Pg.g?Pg.gN*Pg.g.mw:null; // installed sets, spares included (sweep M39)
  const ups=[mw*10/60*0.5,mw*15/60*0.5], gen=gInst?[gInst*1000*4,gInst*1000*4]:[fac[0]*1000*4,fac[1]*1000*4];
  let h=tabBar('energy')+`<h2>Power in, power offered</h2><p class="draft">A customer first. What it can give back is <span class="k">flexibility</span>, and only the operator can give it.</p>
  <h3>What it draws</h3><dl><dt>Power at the meter</dt><dd>${rng(fac[0],fac[1],'MW')} at full load; about ${rng(fac[0]*R.lfR[0],fac[1]*R.lfR[1],'MW')} on average</dd><dt>Electricity a year</dt><dd>${rng(MWh[0]/1000,MWh[1]/1000,'GWh')}, at about ${Math.round(R.lfR[0]*100)}–${Math.round(R.lfR[1]*100)} % of full load on average (Uptime 2024 survey to Fan et al. 2007)</dd>
  ${cost?`<dt>Cost a year</dt><dd>about $${(cost[0]/1e6).toFixed(1)}–${(cost[1]/1e6).toFixed(1)} million if served on BC Hydro's large general service (6.79 ¢/kWh + $13.83/kW a month, Electric Tariff RS 1600–1611, the rate in effect from 1 April 2026; the demand charge taken at full load and billed monthly, which is conservative), for a site connected at distribution voltage, as a 2.5–10 MW data centre usually is; the transmission rate (RS 1830, supply at 60 kV or higher) is not applied, and the size at which BC Hydro would require it is not yet sourced (?)</dd>`:`<dt>Price</dt><dd>Alberta pool averaged $43.68/MWh in 2025; with EPCOR's site charges about $49.67/MWh energy only (register: electricity_price), plus distribution and transmission charges not counted</dd>`}
  <dt>Carbon of that electricity</dt><dd>${rng(co2[0],co2[1],'t CO₂e/yr')} at ${R.grid[f.city]} g/kWh (average, consumption; NIR ${R.gridYear})${f.city==='van'&&R.gridBC?`; ${rng(co2[0]*R.gridBC.v/R.grid.van,co2[1]*R.gridBC.v/R.grid.van,'t CO₂e/yr')} at the BC Government’s ${R.gridBC.year} factor, ${R.gridBC.v} g/kWh (imports included; ${R.gridBC.lo}–${R.gridBC.hi} over ${R.gridBC.years})`:''}</dd>
  <dt>Grid connection</dt><dd>${f.cpcn?`${state('chg')}${gridNote(f).t}`:`${state('cj')}needs the utility's answer to a load application; in Virginia, Dominion Energy reports 12–36 months for this (JLARC 2024; a transferred figure, not BC or Alberta)`}</dd></dl>${s3('elec')}${src('grid')}${f.cpcn?src('grid2'):''}
  <h3>Solar on its own roof</h3><dl><dt>Roof</dt><dd>${fmt(roof)} m², of which plant takes about ${Math.round(share*100)}%</dd><dt>Panels</dt><dd>${rng(kwp[0],kwp[1],'kWp')} → ${rng(pvMWh[0],pvMWh[1],'MWh/yr')}</dd><dt>Share of its own use</dt><dd>${rng(pvMWh[0]/MWh[1]*100,pvMWh[1]/MWh[0]*100,'%')} — a small share at data-centre densities</dd></dl>${s3('pv')}
  <h3>What it could offer the grid</h3><dl>
  <dt>Who decides</dt><dd>${state('cj')}only whoever runs the computing; in a shared (colocation) building that is each tenant. Training runs can pause at checkpoints; live services cannot.</dd>
  <dt>The batteries it already has</dt><dd>${rng(ups[0],ups[1],'MWh')} for minutes (10–15 min of runtime, FM 5-32 3.5.2.1, insurer guidance; J.B. 11 Nov 2026; half kept for outages is our assumption ?) — fast grid support, not a 4-hour peak; BC Hydro's storage incentive excludes an existing UPS</dd>
  <dt>A battery added for the grid</dt><dd>1 MW for 4 h takes ${fmt(4000/49)}–${fmt(4000/19)} m²; BC Hydro pays $50/kW a season for winter peak relief (fossil generators excluded)</dd>
  <dt>EV charging, if 1 MW were set aside</dt><dd>${fmt(1000/19.2)}–${fmt(1000/(0.5*7.4))} Level 2 stalls (7.4 kW table example to 19.2 kW maximum, WSU; from all charging at once to half at once, the share found for fast-charging sites, Silber et al. 2024), about ${fmt(1000/19.2*(f.city==="edm"?23.4:22))}–${fmt(1000/(0.5*7.4)*(f.city==="edm"?23.4:22))} m² of parking</dd></dl>${s3('ctl')}${s3('ups')}${s3('batt')}${s3('dr')}${s3('ev')}
  <h3>Standby generators</h3><dl><dt>Testing</dt><dd>about 4 full-load hours a year: ${rng(gen[0]*0.706/1000,gen[1]*0.706/1000,'t CO₂')} and ${rng(gen[0]*14.6/1000,gen[1]*14.6/1000,'kg NOₓ')} a year, testing every installed set (AP-42 factors for uncontrolled diesel engines)</dd></dl>${s3('gen')}
  ${mathBox([
    `Power at the meter: ${mw} MW × PUE ${R.pue[0]}–${R.pue[1]} = <b>${rng(fac[0],fac[1],'MW')}</b>.`,
    `Electricity a year: ${n1(fac[0])} MW × 8,760 h × ${R.lfR[0]} = ${n0(MWh[0])} MWh; ${n1(fac[1])} MW × 8,760 × ${R.lfR[1]} = <b>${n0(MWh[1])} MWh</b> (load ${R.lfR[0]}: Uptime 2024 survey, a quarter of sites under 40 % of UPS capacity; ${R.lfR[1]}: Fan et al. 2007).`,
    cost?`Cost: energy ${n0(MWh[0])} MWh × 1,000 × $0.0679 + demand ${n1(fac[0])} MW × 1,000 × $13.83 × 12 = $${n0(cost[0])}; high end $${n0(cost[1])}.`:'Cost: Alberta pool price plus EPCOR charges; no single-rate estimate.',
    `Carbon: ${n0(MWh[0])}–${n0(MWh[1])} MWh × ${R.grid[f.city]} g/kWh ÷ 1,000 = <b>${rng(co2[0],co2[1],'t CO₂e')}</b>.`,
    `Solar: roof ${n0(roof)} m² × 0.66 usable × (1 − ${share.toFixed(2)} plant) × 0.70 packing × 0.16–0.20 kW/m² = ${n1(kwp[0])}–${n1(kwp[1])} kWp; × ${fmt(yld[0])}–${fmt(yld[1])} kWh per kWp a year (flat to latitude tilt, NRCan) = <b>${rng(pvMWh[0],pvMWh[1],'MWh')}</b>; ÷ the building's use = ${(pvMWh[0]/MWh[1]*100).toFixed(2)}–${(pvMWh[1]/MWh[0]*100).toFixed(2)}%.`,
    `UPS batteries: ${mw} MW × 10–15 min ÷ 60 × 0.5 kept for outages = <b>${n1(ups[0])}–${n1(ups[1])} MWh</b>.`,
    `Generator testing: ${gInst?`${Pg.gN} sets × ${Pg.g.mw} MW = ${n1(gInst)} MW`:`${n1(fac[0])}–${n1(fac[1])} MW`} × 1,000 × 4 h = ${n0(gen[0])}–${n0(gen[1])} kWh; × 0.706 kg CO₂/kWh = ${n1(gen[0]*0.706/1000)}–${n1(gen[1]*0.706/1000)} t; × 14.6 g NOₓ/kWh = ${n0(gen[0]*14.6/1000)}–${n0(gen[1]*14.6/1000)} kg.`],
    'PUE: LBNL 2023, Uptime 2025. Load factor: Fan et al. 2007. Rates: BC Hydro LGS 2026. Solar: NRCan yields, NREL densities. Generator factors: AP-42 Table 3.4-1 (upper bounds).')}
  <div class="draftnote">Ranges carry the register's confidence.</div>`;
  $('#side').innerHTML=h; wireTabs(); BD.draw();
  show3d('energy',{site:f,gridNote:f.cpcn?gridNote(f).t:''});
}
function waterView(){
  const f=siteFacts(), A=BD.S.answers, mw=A.mw||1, fac=[mw*R.pue[0],mw*R.pue[1]], MWh=[fac[0]*8760*R.lfR[0],fac[1]*8760*R.lfR[1]];
  const towers=A.outside==='towers', hybrid=A.outside==='hybrid';
  // hybrid coolers run wet only when the air is too warm for the loop (30 °C loop, 12 K approach → above 18 °C dry-bulb): CWEC hours per city (J.B. parity audit A2, 16 Oct 2026)
  const DW=BD.data.water, WET=DW.wet, wet=hybrid?WET[f.city][1]:1, CY=DW.cycles; // tool/data/water.json, with register ids
  const evap=MWh.map(v=>v*1000*DW.evapLkWh*wet/1000); // m³: ≤ 1.5 L/kWh of heat, × the wet share for hybrids
  const mk=[evap[0]*(1+1/(CY[1]-1)),evap[1]*(1+1/(CY[0]-1))], bd=[evap[0]/(CY[1]-1),evap[1]/(CY[0]-1)]; /* J.B. 11 Nov 2026: load range 0.4–0.6 here too: low end = low evaporation (PUE low × 0.4) at the most cycles, high end = high evaporation at the fewest */
  const roof=roofArea(f), mm=DW.rainMm[f.city==='van'?'van':'edm'], rain=roof*mm/1000*0.8; // 0.8 runoff: assumed in the register (rainwater), unsourced list
  let h=tabBar('water')+`<h2>Water in, water out</h2><p class="draft">From almost none to a great deal: <span class="k">it depends on the cooling</span>.</p>
  <div class="q"><div class="lab">How it rejects heat</div><div class="seg" data-c="1"><button data-v="dry" aria-pressed="${A.outside!=='towers'&&A.outside!=='hybrid'}">Dry coolers</button><button data-v="towers" aria-pressed="${towers}">Cooling towers</button><button data-v="hybrid" aria-pressed="${A.outside==='hybrid'}">Hybrid</button></div></div>
  <h3>On site</h3><dl>${towers||hybrid?`<dt>Evaporated</dt><dd>${rng(evap[0],evap[1],'m³/yr')} (at most 1.5 L per kWh of heat; load 0.4–0.6${hybrid?`, wet only in the ${fmt(WET[f.city][0])} hours a typical year is above 18 °C in ${f.city==='van'?'Vancouver':'Edmonton'} (${(WET[f.city][1]*100).toFixed(1)}%; CWEC, computed)`:''})</dd><dt>Make-up water</dt><dd>${fmt(mk[0])}–${fmt(mk[1])} m³/yr at 2–6 cycles of concentration</dd><dt>Blowdown to the sewer</dt><dd>${fmt(bd[0])}–${fmt(bd[1])} m³/yr</dd>${f.city==='van'?`<dt>Water bill</dt><dd>about $${fmt(mk[0]*4.256)}–$${fmt(mk[1]*4.622)} a year for the make-up water, water and sewer both billed on metered water (City of Vancouver 2026 rates as proposed; sewer rate ?)</dd>`:''}`:`<dt>Evaporated</dt><dd>none for cooling — ${BD.dryName()} reject heat to the air; their fans are the trade (sound, roof space)</dd>`}
  <dt>Rain on the roof</dt><dd>about ${fmt(rain)} m³/yr from ${fmt(roof)} m² at ${mm} mm a year</dd></dl>${s3('evap')}${f.city==='van'?s3('wprice'):''}${s3('rain')}
  <h3>Other sources and their rules</h3><dl><dt>Reclaimed water</dt><dd>${f.city==='van'?'Metro Vancouver considers supply to industry case by case; no rate':'EPCOR supplied 4,226 ML of reclaimed water to industry in 2024 (Gold Bar)'}</dd>
  <dt>Neighbours' greywater</dt><dd>${f.city==='van'?'not allowed as a cooling source under the Building By-law; residential systems only (2025)':'needs a variance in Alberta'}</dd>
  <dt>The sewer as a heat sink</dt><dd>${f.city==='van'?'warm water must not raise waste entering any sewage facility to 40 °C or more, and a high-volume discharge (over 300 m³ in 30 days) needs a permit (Metro Vancouver Sewer Use Bylaw 299); heat taken from sewage needs a letter of support, first come first served':'non-contact cooling water may go to the sanitary sewer only with EPCOR\'s prior written approval (Drainage Services Bylaw 18100); no EPCOR programme for taking heat from sewage was found'}</dd></dl>${s3('reuse')}${s3('sewer')}
  ${mathBox([
    towers?`Evaporated: ${n0(MWh[0])}–${n0(MWh[1])} MWh of heat (load ${R.lfR[0]}–${R.lfR[1]}) × 1,000 × 1.5 L/kWh ÷ 1,000 = ${n0(evap[0])}–<b>${n0(evap[1])} m³</b> (latent heat sets ≈1.5 L per kWh as the ceiling).`:'Dry coolers: no water evaporated for cooling.',
    towers?`Make-up = evaporated × (1 + 1 ÷ (cycles − 1)): low evaporation at 6 cycles × 1.2 = ${n0(mk[0])} m³; high evaporation at 2 cycles × 2 = <b>${n0(mk[1])} m³</b>. Blowdown = evaporated ÷ (cycles − 1) = ${n0(bd[0])}–<b>${n0(bd[1])} m³</b>.`:'',
    `Rain: roof ${n0(roof)} m² × ${mm} mm ÷ 1,000 × 0.8 runoff = <b>${n0(rain)} m³</b>.`].filter(Boolean),
    'Evaporation: physics (latent heat). Cycles: FEMP/EPA. Rain: ECCC Normals 1991–2020; runoff 0.8 assumed.')}
  `;
  $('#side').innerHTML=h; wireTabs(); document.querySelectorAll('#side .seg[data-c] button').forEach(b=>b.onclick=()=>{ A.outside=b.dataset.v; BD.modelReset&&BD.modelReset(); waterView(); }); BD.draw();
  show3d('water',{site:f,rain,towers:towers||A.outside==='hybrid',evap:towers?fmt(evap[1])+' m³/yr':''});
}
/* Materials tab dropped (J.B. 11 Nov 2026, F10: "all parts of the tool") */
const CENSUS={};
function censusNear(city,c,r){ const d=CENSUS[city]; if(!d||d==='loading') return null; const C=d.cell, t=[0,0,0,0,0,0,0];
  for(const q of d.cells){ const x=(q[0]+0.5)*C-c[0], y=(q[1]+0.5)*C-c[1]; if(x*x+y*y<=r*r) for(let i=0;i<7;i++) t[i]+=q[i+2]; } return t; }
function socialView(){
  if(!CENSUS[BD.S.city]){ const city=BD.S.city; CENSUS[city]='loading'; fetch('census_'+city+'.json').then(r=>r.json()).then(d=>{ CENSUS[city]=d; if(BD.S.tab==='social'&&BD.S.city===city) socialView(); }).catch(()=>{ CENSUS[city]=null; }); }
  const f=siteFacts(), A=BD.S.answers, mw=A.mw||(BD.model&&BD.model()&&BD.model().mwSized)||1, fac=mw*R.pue[1]; const CU=coolUnits(mw), n=CU.n, LU=CU.name==='dry coolers'?R.lwUnitDry:R.lwUnit;
  const lw=[LU[0]+10*Math.log10(n),LU[1]+10*Math.log10(n)];
  const lim=f.city==='van'?({activity:55,intermediate:50}[vZone(f.zone,f.c[0],f.c[1])]||45):50;
  const dist=lw.map(L=>Math.pow(10,(L-8-lim)/20));
  // each neighbour gets the limit for ITS zone (By-law 6555 ss. 2.1–2.3: the limit depends on the source zone and the receiving zone)
  const S=BD.S; const vcls=(z,x,y)=>vZone(z,x,y);
  const srcCls=f.city==='van'?vcls(f.zone,f.c[0],f.c[1])||'quiet':null;
  const limQ={quiet:45,intermediate:50,activity:55}[srcCls]||45, limO={quiet:55,intermediate:65,activity:65}[srcCls]||55;
  /* 2 Nov 2026 (J.B.): counted with the by-law check (noiseCheck): each neighbouring lot at its point nearest the plant, against the night limit for its zone */
  const Mn=BD.model?BD.model():null, nc=(Mn&&Mn.noise)||null; const within=nc?[nc.overQ,nc.overQ+nc.overS]:[0,0], byCls=nc?nc.byCls:{quiet:0,other:0,unknown:0,assumed:0};
  const limitFor=b=>{ const v=NLEV.get(b); return v?v.L:limQ; };
  const d=BD.recv[f.city]||{pts:[]}; const homes=d.pts.filter(p=>p.t==='housing'&&recvDist(f,p)<=200).reduce((t,p)=>t+(p.u||0),0);
  const key='bd-notes-'+S.city+'-'+S.sel.id; let notes=''; try{ notes=localStorage.getItem(key)||''; }catch(e){}
  let h=tabBar('social')+`<h2>What neighbours would hear, see and feel</h2><p class="draft">Described as experienced, not scored. Measured where the data allows; your site observations sit beside it, labelled as yours.</p>
  <h3>Sound</h3><dl><dt>Cooling plant</dt><dd>${n} ${CU.name} (as laid out, spares included), rated ${rng(lw[0],lw[1],'dBA')} together (${CU.name==='dry coolers'?'dry-cooler ratings at full fan speed, manufacturer claims':CU.name==='air-cooled chillers'?'air-cooled chiller ratings for two Vertiv models (FH3135, FIZ135), manufacturer claims; the lower one not yet indexed ?':'air-cooled chiller ratings used as a stand-in: no rating found for this kind'})</dd>
  <dt>Night limit</dt><dd>${f.city==='van'?`from this ${srcCls} zone: ${limQ} dBA at a quiet-zone neighbour, ${limO} dBA at any other`:'50 dBA next to homes, 60 dBA next to other uses'}</dd><dt>Quiet-zone limit reached at</dt><dd>${fmt(dist[0])}–${fmt(dist[1])} m from the plant, before walls, barriers or enclosures</dd>
  <dt>Neighbours over their limit</dt><dd>${within[0]}–${within[1]} neighbouring lots within 1.5 km (quieter to louder unit rating), each at its point nearest the plant (${f.city==='van'?'By-law 6555 s. 1.2, point of reception':'Bylaw 14600 ss. 20(1), 22(1), at the property line'}) and against the night limit for its own zone: ${f.city==='van'?`${limQ} dBA in a quiet zone, ${limO} dBA elsewhere`:'50 dBA next to homes, 60 dBA next to other uses'}${within[1]?` — ${byCls.quiet} in quiet${f.city==='van'?' zones':' (residential) zones'}, ${byCls.other} elsewhere${byCls.assumed?`, ${byCls.assumed} in mixed-use or Direct Control zones (residential limit assumed: the bylaws do not settle these)`:''}${byCls.unknown?`, ${byCls.unknown} with no parcel record (quiet limit used)`:''}${nc&&nc.bldOnly?`; ${nc.bldOnly} measured at the building, not the property line (reads low ?)`:''}`:''}${nc&&nc.beyond?'. Lots beyond 1.5 km are not tested (?)':''}${nc&&nc.mit&&nc.mit.short&&!nc.block?`, counted with the mitigation this set-up needs: ${esc(nc.mit.short)}`:''}${nc&&nc.block?'. <span class="k">Over even with the quieter rating and every modelled mitigation: this set-up is blocked</span>':nc&&nc.flag?'. Over only with the louder rating: a note, not a block':''}. In the 3D view, red: over even with the quieter rating; accent: over only with the louder rating.</dd>${''/* 2 Nov 2026 fix pass: D-radius (600 m: our study radius) */}
  <dt>Low hum</dt><dd>a tonal low-frequency sound adds 5 dBA in Alberta's rule for power plants and substations (AUC Rule 012, used here as a benchmark; no rule covers it for a data centre) — the kind neighbours describe most</dd></dl>${s3('snd')}${s3('lf')}${src('noise')}
  <h3>The edge</h3><dl><dt>Standoff</dt><dd>new facilities keep about 10 m between the building and the public (45 m unless access control is in place; Ontario government standard) — a fence, bollards or a blank setback, as experienced from the street</dd>
  <dt>Ground floor</dt><dd>${f.envAssumed?'not known: this zone\'s rules are not yet read':(f.envU&&f.envU.ground)?'this zone keeps the ground floor free of data storage: it could meet the street':'nothing in the zone requires another use at grade'}</dd>
  <dt>Watched area</dt><dd>${state('cj')}seen only on site: cameras and signs visible from public space, recorded as one person's account</dd>
  <dt>Light at night</dt><dd>${f.city==='van'?'Vancouver sets no lux limit, but bars an outdoor light that shines directly onto a residential window across the street or next door and unreasonably disturbs the neighbour (Untidy Premises By-law 4548 s. 7)':'Edmonton requires light directed downward and away (no number)'}; the international reference is 10 lx before and 2 lx after curfew at a window (CIE 150 via ILP guidance; not yet verified)</dd></dl>${s3('so')}${s3('watch')}${s3('light')}
  <h3>Who is near</h3><dl><dt>Non-market homes within 200 m</dt><dd>${f.city==='van'?`${fmt(homes)} (City list; private housing not counted)`:'not known: no non-market housing list is loaded for Edmonton'}</dd>${peopleRows(f,dist)}</dl>${s3('ppl')}
  ${mathBox([
    `Cooling units: power at the meter ${n1(fac)} MW → <b>${n}</b> unit${n>1?'s':''}, from the plant sizing (${CU.name}, one spare included).`,
    `Together: Lw per unit ${LU[0]}–${LU[1]} dBA, + 10 × log₁₀(${n} units) = <b>${n1(lw[0])}–${n1(lw[1])} dBA</b>.`,
    `Distance where the night limit is reached: r = 10^((Lw − 8 − ${lim}) ÷ 20) = <b>${n0(dist[0])}–${n0(dist[1])} m</b> (free field over hard ground, no walls or barriers).`].concat(nc&&nc.worst?[`By-law check, worst lot: ${esc(nc.worst.addr||'a neighbouring lot')} (${esc(nc.worst.zt)}), ${n1(nc.worst.d)} m from the centre of the cooling units (${nc.where}) to its nearest point${nc.worst.lot?'':' (building outline: reads low ?)'}: Lp = Lw − 20 log₁₀(${n1(Math.max(5,nc.worst.d))}) − 8${nc.groups&&nc.groups.length>1?' for each plant group, summed logarithmically':''}${nc.req?' (before the mitigation)':nc.block&&nc.mit?' − every modelled mitigation':nc.mit&&nc.mit.short?' − '+esc(nc.mit.short):''} = <b>${n1(nc.worst.lo)}–${n1(nc.worst.hi)} dBA</b> against ${nc.worst.block!==false&&nc.block?nc.worst.Ls:nc.worst.L} dBA at night (${esc(nc.worst.sec)}) → <b>${nc.block?'blocked':nc.req?'passes only with '+esc(nc.mit.short):'note only'}</b>.`]:[]),
    'Sound: Lp = Lw − 20 log r − 8 (hemispherical spreading); unit ratings from manufacturer data (Vertiv for chillers, our conversion from Lp at 1 m; Güntner, Thermokey for dry coolers). Limits: Noise Control By-law 6555 / Bylaw 14600.')}
  <h3>Your observations on site</h3><textarea id="notes" rows="5" style="width:100%;background:var(--bg);border:1px solid var(--line-2);border-radius:6px;padding:8px;color:var(--fg)" placeholder="What did you hear, see and feel at the edge? Time of day, where you stood.">${esc(notes)}</textarea><div class="src">Kept in this browser only; shown as your observation, never as a measurement.</div>
  <div class="draftnote">Sound is a screening estimate: manufacturer-rated levels, no barriers, ground or buildings.</div>`;
  $('#side').innerHTML=h; wireTabs(); $('#notes').oninput=e=>{ try{ localStorage.setItem(key,e.target.value); }catch(err){} }; BD.draw();
  const pb=(f.M&&f.M.plant&&f.M.plant.boxes)||[]; const psrc=pb.length?[pb.reduce((t,b)=>t+BD.centroid(b.ring)[0],0)/pb.length,pb.reduce((t,b)=>t+BD.centroid(b.ring)[1],0)/pb.length]:null;
  BD._noise={lw,limit:lim,limLab:`${f.city==='van'?'quiet-zone':'residential'} night limit ${lim} dBA (${f.city==='van'?`By-law 6555 s. ${VSEC[srcCls]||'2.1'}(b)(i)`:'Bylaw 14600 s. 20(1)'})`,limitFor,level:b=>NLEV.get(b)||null,dist,src:nc?nc.src:psrc};
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
/* sweep 20 Oct 2026: air-cooled halls get air-cooled chillers, not dry coolers (plant.js, sweep M31); every 'dry coolers' a user reads says which */
BD.dryName=()=>{ const A=BD.S.answers; return (A.inside||'air')==='air'&&(A.outside||'dry')==='dry'?'air-cooled chillers':'dry coolers'; };
BD.eng={noiseLot:k=>NLOT.get(k)||null,R,NMIT,vZone,noiseLimitAt,noiseZones:{res:EDM_RES,mix:EDM_MIX},siteFacts,plantPerMW,plantArea,plantZones,coolUnits,equip,noiseLw,noiseCheck,noiseLevel:b=>NLEV.get(b)||null,calc,rng,f1,n0,n1,mathBox,tabBar,wireTabs,show3d,nearby,netsAt,loadRecv,badge,src,s3,rangeBar,state,roofArea,optionSet};
BD.fitsView=fitsView; BD.recvView=recvView; BD.optionsView=optionsView; BD.tabView=tabView;
})();
