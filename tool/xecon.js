/* Beyond Data — electricity and water exchanges to the same standard as heat (J.B., 19 Oct 2026: "they should be equals").
   Each exchange answers the same rows: how much · who is nearby · what it is worth · what it costs · cost per unit over its life against
   worth, and years to pay back · best set-up found · rules. Sources: audit/research_2026-10-19/G_electricity_exchange.md, H_water_exchange.md;
   register pv_cost, pv_roof, battery, peak_relief, water_supply, rainwater, evaporation, blowdown. Cost of capital and method as heat
   (5.6% real, Squamish NEU 2010; audit/payback_method_2026-10-19.md). */
(function(){
'use strict';
const BD=window.BD; const {$,esc,fmt}=BD; const E=()=>BD.eng, A=()=>BD.S.answers;
const crf=(i,n)=>i*Math.pow(1+i,n)/(Math.pow(1+i,n)-1);
const usd=1.3978; // Bank of Canada 2025 annual average (as ECON)
const X={
 pv:{cost:k=>k<100?[2.0,3.2]:k<250?[1.9,2.4]:[1.68,2.22], om:21*usd, life:30, // CAD/W (NRCan/IEA PVPS Canada 2024, register pv_cost); O&M US$21/kW·yr, 30 yr (NREL ATB 2024)
     export:{van:'exports above the site\'s own use earn 10 ¢/kWh, up to 100 kW per phase (RS 2289 from 1 Jul 2026, BCUC G-64-26)',edm:'under 5 MW is micro-generation: exports credited at the retail energy rate under 150 kW, at the hourly pool price above (AESO 2025)'}},
 batt:{capex:[334*usd,448.34*usd], omShare:[0.025,0.04], life:15, rte:0.85, // CAD/kWh: NREL 2025 utility-scale 4 h (US$334, 2024$) to PNNL 2022 1 MW 4 h (US$448, 2021$); no inflation adjustment; O&M 2.5% (NREL ATB commercial) to 4% (NREL 2025) of capex a year; 15 yr; 85%
   van:{dr:50, esi:0.80}, // BC Hydro Demand Response for Business $50 per average kW reduced a season (Nov–Mar, ≤ 20 events, ≤ 4 h); Energy Storage Incentive pays up to 80% of eligible cost (≥ 25 kW, behind the meter, non-exporting, 10-yr contract; LGS eligible, transmission customers not)
   edm:{active:[34.75,43.71], standby:[11.28,14.03]}}, // AESO operating reserves, $/MW per hour procured, 2025 and 2024 (Annual Market Statistics 2025, Table 13, cost ÷ volume); not by product
 ev:{l2:28.28, port:15000, kw:7.4}, // BC Hydro public Level 2 28.28 ¢/kWh (BCUC G-30-26); $15,000 a port (NRCan, Dunsky & ICCT 2024, 2022 $)
 water:{van:[4.256,4.622], edm:null, // $/m³ water + sewer, Vancouver 2026 (both billed on metered water; low and high season); Edmonton 2026 commercial rates not read
   edmOld:{w:[0.9472,1.6122], ww:[0.4636,1.1486], san:1.1212}}, // EPCOR commercial water 2022–23 (Bylaw 19626), wastewater treatment proposed 2025, sanitary proposed: placeholders, labelled
 tank:{cost:[667,2114*usd], life:[15,30]} // CAD per m³ of storage: City of Vancouver ISMP toolkit 2014 (15 m³ below grade, ±30%) to US EPA 2013 cistern + pumps and controls (US$924–2,114, upper end); life: warranties (US DOE FEMP)
};
BD.XECON=X;
const ECON=()=>BD.ECON, rate=()=>ECON().rate, money=x=>'$'+fmt(Math.round(x)), per=(x,u)=>`$${x>=100?fmt(Math.round(x)):x.toFixed(x<10?2:1)} ${u}`;
const yrs=x=>!isFinite(x)||x<=0?'never':x>50?'more than 50':String(Math.round(x));

/* roof shading from the buildings around the lot (J.B., 19 Oct 2026: solar payback depends on the exact lot).
   Method as NREL SAM's 3D shade calculator: an hour-by-month table of beam shading from the sun's position and the 3D scene, plus one sky-diffuse
   loss. Beam: a sample point is shaded in a bin when a neighbour taller than the roof stands in the sun's direction, high enough at that distance.
   Diffuse: isotropic sky × sky view factor, SVF = 1 − mean sin² of the horizon angle over 36 directions (Antonanzas-Torres et al. 2018, after
   Ruiz-Arias et al. 2010). Sun bins from each city's CWEC year (sun.json, make_sun.py). The loss is worked out on a flat surface and applied to
   NRCan's yield per kWp (an approximation for tilted panels). Heights: Vancouver LiDAR 2022; Edmonton 3D model or estimates. */
let SUN=null; fetch('sun.json').then(r=>r.ok?r.json():null).then(d=>{ SUN=d; }).catch(()=>{});
const SH={};
function rayEnter(px,py,dx,dy,r){ let t=Infinity; const n=r.length/2; for(let i=0;i<n;i++){ const j=(i+1)%n, ax=r[2*i],ay=r[2*i+1],bx=r[2*j],by=r[2*j+1]; const ex=bx-ax, ey=by-ay, den=dx*ey-dy*ex; if(Math.abs(den)<1e-9) continue; const u=((ax-px)*ey-(ay-py)*ex)/den, v=((ax-px)*dy-(ay-py)*dx)/den; if(u>0&&v>=0&&v<=1&&u<t) t=u; } return t; }
function roofShade(f,pts,z0){ if(!SUN||!SUN[f.city]||!pts||!pts.length) return null; const key=f.city+'|'+f.c.join(',')+'|'+z0.toFixed(1)+'|'+pts.length; if(SH[key]) return SH[key];
  const S=BD.S, lot=f.M&&f.M.ring, obs=[];
  for(const id in S.tiles){ if(!id.startsWith(f.city+':')) continue; for(const b of S.tiles[id].bld){ if(b.f===3||!b.h||b.h<=z0) continue; const d=Math.hypot(b.c[0]-f.c[0],b.c[1]-f.c[1]); if(d>500) continue; if(lot&&BD.pip(b.c[0],b.c[1],lot)) continue; obs.push(b); } }
  const sun=SUN[f.city], bins=sun.bins.filter(x=>x[2]>0); let beamLost=0, svfSum=0;
  const P=pts.length>30?pts.filter((_,i)=>i%Math.ceil(pts.length/30)===0):pts;
  for(const [px,py] of P){ // beam
    for(const [mo,hr,alt,az,bh] of bins){ const dx=Math.sin(az*Math.PI/180), dy=Math.cos(az*Math.PI/180), ta=Math.tan(alt*Math.PI/180); let hit=false;
      for(const b of obs){ const t=rayEnter(px,py,dx,dy,b.r); if(t<Infinity&&z0+t*ta<b.h){ hit=true; break; } } if(hit) beamLost+=bh; }
    let s2=0; for(let k=0;k<36;k++){ const a=k*10*Math.PI/180, dx=Math.sin(a), dy=Math.cos(a); let g=0; for(const b of obs){ const t=rayEnter(px,py,dx,dy,b.r); if(t<Infinity&&t>0.5){ const e=Math.atan((b.h-z0)/t); if(e>g) g=e; } } s2+=Math.sin(g)**2; } svfSum+=1-s2/36; }
  const n=P.length, bl=beamLost/n, svf=svfSum/n, tot=sun.beam_kwh+sun.diffuse_kwh, loss=(bl+sun.diffuse_kwh*(1-svf))/tot;
  return SH[key]={loss,beam:bl/sun.beam_kwh,svf,obs:obs.length,n}; }
BD.roofShade=roofShade;
let SUB=null; fetch('substations.json').then(r=>r.ok?r.json():null).then(d=>{ SUB=d; }).catch(()=>{});
function nearSub(f){ if(!SUB) return null; const named=(SUB.named&&SUB.named[f.city]||[]).map(p=>({d:Math.hypot(p.x-f.c[0],p.y-f.c[1]),n:p.n,addr:p.addr,status:p.status,src:p.src,named:true}));
  const old=(SUB.cities[f.city]||[]).filter(p=>!(SUB.named&&SUB.named[f.city]||[]).some(q=>Math.hypot(p[0]-q.x,p[1]-q.y)<300)).map(p=>({d:Math.hypot(p[0]-f.c[0],p[1]-f.c[1]),y:p[3]}));
  const live=named.filter(x=>!/planned/.test(x.status)).concat(old).sort((a,b)=>a.d-b.d), plan=named.filter(x=>/planned/.test(x.status)).sort((a,b)=>a.d-b.d);
  return {n:live[0],within2:live.filter(x=>x.d<=2000).length,plan:plan[0]||null,years:[...new Set((SUB.cities[f.city]||[]).map(p=>p[3]))].join(', ')}; }
BD.nearSub=nearSub;
/* ---------- electricity ---------- */
function solar(f){ const lay=BD.pvLayout&&BD.pvLayout(f); if(!lay||!lay.kwp[1]) return null; const pv=BD._pv, c=f.city;
  const yl=pv?[pv[c].horizontal.reduce((s,v)=>s+v,0),pv[c].latitude.reduce((s,v)=>s+v,0)]:(c==='van'?[892,1007]:[944,1244]);
  const M=f.M, z0=((M&&(M.roofH||M.H))||4)+0.5, pts=lay.slots.map(r=>BD.centroid(r)), sh=roofShade(f,pts,z0), keepF=sh?1-sh.loss:1;
  const kwp=lay.kwp, mwh=[kwp[0]*yl[0]/1000*keepF,kwp[1]*yl[1]/1000*keepF], cw=X.pv.cost(kwp[1]), capex=[kwp[0]*1000*cw[0],kwp[1]*1000*cw[1]], om=[kwp[0]*X.pv.om,kwp[1]*X.pv.om];
  const v=ECON().elec[c], k=crf(rate(),X.pv.life);
  const lc=[(k*kwp[1]*1000*cw[0]+om[1])/mwh[1],(k*kwp[0]*1000*cw[1]+om[0])/mwh[0]]; // best: cheap and high yield; worst
  const pay=[kwp[1]*1000*cw[0]/(mwh[1]*v-om[1]),kwp[0]*1000*cw[1]/(mwh[0]*v-om[0])];
  return {kwp,mwh,capex,lc,v,pay,yl,m2:lay.m2,sh}; }
function solarBest(f){ // the plant's position decides how much roof is free (plant on the roof takes roof)
  const a=A(), keep=a.plantAt; const out=[]; for(const p of ['roof','yard','split']){ a.plantAt=p; BD.modelReset&&BD.modelReset(); const s=solar(E().siteFacts()); if(s) out.push({p,s}); }
  a.plantAt=keep; BD.modelReset&&BD.modelReset(); E().siteFacts(); out.sort((x,y)=>y.s.kwp[1]-x.s.kwp[1]); return out; }
function battery(f){ const a=A(), mw=a.battMW||1, h=a.battH||4, kwh=mw*h*1000, kw=mw*1000, cap=[kwh*X.batt.capex[0],kwh*X.batt.capex[1]], om=[cap[0]*X.batt.omShare[0],cap[1]*X.batt.omShare[1]];
  const k=crf(rate(),X.batt.life), cost=[(k*cap[0]+om[0])/kw,(k*cap[1]+om[1])/kw]; // $ per kW a year
  let worth,worthTxt,net=null;
  if(f.city==='van'){ worth=[X.batt.van.dr,X.batt.van.dr]; worthTxt=`$${X.batt.van.dr} per kW a winter season (BC Hydro Demand Response for Business; whether a battery is paid under it as well as the incentive is not stated)`;
    net=[(k*cap[0]*(1-X.batt.van.esi)+om[0])/kw,(k*cap[1]*(1-X.batt.van.esi)+om[1])/kw]; }
  else { const s=X.batt.edm.standby, ac=X.batt.edm.active; worth=[s[0]*8760/1000*1000,ac[1]*8760]; worthTxt=`up to $${fmt(Math.round(s[0]*8.76))}–${fmt(Math.round(ac[1]*8.76))} per kW a year if held as reserve every hour (AESO 2024–25 averages, $${s[0]}–${ac[1]} per MW an hour; an upper bound: the hours a battery can hold reserve, and the 5 MW minimum or an aggregator, are not modelled)`; worth=[s[0]*8.76,ac[1]*8.76]; }
  return {mw,h,kwh,cap,cost,worth,worthTxt,net}; }
function evHub(f){ if(f.city!=='van') return {known:false}; const margin=(X.ev.l2-ECON().elec.van/10)/100; const kwh=X.ev.port/margin; return {known:true,margin,kwh,hours:kwh/X.ev.kw}; }

function elecSecs(f){ const s=solar(f), b=battery(f), ev=evHub(f), Bst=solarBest(f); const sec=BD.sec; let h='<h3>What it is worth here</h3><p class="sub">The same rows as heat: how much, what it is worth, what it costs over its life, years to pay back, the best set-up found, the rules. Middle and range; '+(rate()*100).toFixed(1)+'% real cost of capital, as heat.</p>';
  { const ns=nearSub(f), nm=x=>x.named?`${esc(x.n)} (${esc(x.addr)}; ${esc(x.status)}; ${esc(x.src)})`:`an unnamed station from NRCan CanVec (source map ${esc(x.y)})`;
    h+=sec('x-grid','The grid nearby',ns&&ns.n?`nearest substation about ${fmt(Math.round(ns.n.d/10)*10)} m away${ns.n.named?': '+esc(ns.n.n):''}; ${ns.within2} within 2 km`:'substations not loaded',
    ns&&ns.n?`<dl><dt>Nearest</dt><dd>${nm(ns.n)}, about ${fmt(Math.round(ns.n.d/10)*10)} m in a straight line</dd><dt>Within 2 km</dt><dd>${ns.within2}</dd>${ns.plan?`<dt>Planned</dt><dd>${nm(ns.plan)}, about ${fmt(Math.round(ns.plan.d/10)*10)} m away</dd>`:''}
     <dt>How current</dt><dd>named stations from utility and government pages (2023–2026), placed at the City-listed address; the rest from NRCan CanVec 50K (Open Government Licence; source maps of ${esc(ns.years)}), so stations built since may be missing. Neither utility publishes a full public map: BC Hydro's is paid (ICIS), AESO's 2026 system map names Edmonton's stations but gives no positions</dd><dt>What it means</dt><dd>spare capacity per station is not published by either utility; distance alone does not say a connection is easy (see Getting connected)</dd></dl>`:''); }
  if(s){ const b0=Bst[0], cur=Bst.find(x=>x.p===(A().plantAt||'roof'));
    h+=sec('x-pv','Solar on the roof',`${per(s.lc[0],'')}–${per(s.lc[1],'per MWh')} over its life, against $${s.v.toFixed(0)} the power it replaces costs`,
    `<dl><dt>How much</dt><dd>${E().rng(s.kwp[0],s.kwp[1],'kWp')} on ${fmt(s.m2)} m² of free roof: ${E().rng(s.mwh[0],s.mwh[1],'MWh a year')} (${fmt(s.yl[0])}–${fmt(s.yl[1])} kWh per kWp, NRCan)</dd>
     <dt>Shade from neighbours</dt><dd>${s.sh?`<span class="k">about ${Math.round(s.sh.loss*100)}% of the sun lost</span> to ${s.sh.obs} building${s.sh.obs===1?'':'s'} taller than the roof within 500 m (direct sun ${Math.round(s.sh.beam*100)}% blocked; ${Math.round(s.sh.svf*100)}% of the sky visible); taken off the yield above. Method: NREL SAM's hour-by-month shading, with sky view for diffuse light (CWEC typical year)`:'not worked out (sun data or neighbours not loaded): the yield assumes open sky'}</dd>
     <dt>Who takes it</dt><dd>the data centre itself, every hour: its own use is far larger. ${esc(X.pv.export[f.city])}</dd>
     <dt>What it is worth</dt><dd>$${s.v.toFixed(2)} per MWh it does not buy (${f.city==='van'?'BC Hydro Large General Service energy charge':'Alberta pool average 2025 plus EPCOR\'s per-kWh charges'}; demand charges not reduced: the panels do not lower the highest 15 minutes)</dd>
     <dt>What it costs</dt><dd>${money(s.capex[0])}–${money(s.capex[1])} to build (NRCan/IEA PVPS Canada 2024 by size), $${fmt(Math.round(X.pv.om))} per kW a year to run (NREL), ${X.pv.life} years</dd>
     <dt>Cost against worth</dt><dd><span class="k">$${s.lc[0].toFixed(0)}–${s.lc[1].toFixed(0)} per MWh</span> against $${s.v.toFixed(0)}; ${s.lc[0]<=s.v?(s.lc[1]<=s.v?'costs less than the power it replaces':'depends on the cost and the tilt'):'costs more than the power it replaces'}</dd>
     <dt>Years to pay back</dt><dd>${yrs(s.pay[0])} to ${yrs(s.pay[1])}</dd>
     <dt>Best set-up found</dt><dd>${b0?`plant ${b0.p==='roof'?'on the roof':b0.p==='yard'?'in the yard':'split'}: ${E().rng(b0.s.kwp[0],b0.s.kwp[1],'kWp')}${cur&&cur!==b0?` (yours: ${E().rng(cur.s.kwp[0],cur.s.kwp[1],'kWp')})`:''}; cost per MWh changes little with size, so it adds MWh more than it changes the price`:'—'}</dd></dl>`);
  }
  h+=sec('x-batt','A battery for the grid',f.city==='van'?`$${b.cost[0].toFixed(0)}–${b.cost[1].toFixed(0)} per kW a year (with BC Hydro's incentive $${b.net[0].toFixed(0)}–${b.net[1].toFixed(0)}), against $${X.batt.van.dr}`:`$${b.cost[0].toFixed(0)}–${b.cost[1].toFixed(0)} per kW a year, against up to $${fmt(Math.round(b.worth[0]))}–${fmt(Math.round(b.worth[1]))} as reserve`,
    `<dl><dt>How much</dt><dd>${b.mw} MW for ${b.h} hours, ${fmt(b.kwh)} kWh (set in the battery add-on)</dd><dt>Who takes it</dt><dd>${f.city==='van'?'BC Hydro, on winter weekday peaks':'AESO, as operating reserve'}</dd>
     <dt>What it is worth</dt><dd>${esc(b.worthTxt)}</dd>
     <dt>What it costs</dt><dd>${money(b.cap[0])}–${money(b.cap[1])} to build ($${fmt(Math.round(X.batt.capex[0]))}–${fmt(Math.round(X.batt.capex[1]))} per kWh: NREL 2025 utility-scale to PNNL 2022 at 1 MW, US$ converted, no inflation adjustment); upkeep 2.5–4% of that a year; ${X.batt.life} years; ${X.batt.rte*100}% round trip${f.city==='van'?`. BC Hydro's Energy Storage Incentive pays up to 80% of eligible cost for a battery of 25 kW or more behind the meter that does not export, on a 10-year contract; Large General Service qualifies, transmission customers do not`:''}</dd>
     <dt>Cost against worth</dt><dd><span class="k">$${b.cost[0].toFixed(0)}–${b.cost[1].toFixed(0)} per kW a year</span>${b.net?`, or $${b.net[0].toFixed(0)}–${b.net[1].toFixed(0)} after the incentive,`:''} against ${f.city==='van'?'$'+X.batt.van.dr:'up to $'+fmt(Math.round(b.worth[0]))+'–'+fmt(Math.round(b.worth[1]))}</dd>
     <dt>Peak shaving</dt><dd>${f.city==='van'?'the demand charge ($13.83 per kW a month) is set by the highest 15 minutes; a data centre runs flat, so a 4-hour battery cannot lower it':'—'}</dd></dl>`);
  h+=sec('x-ev','EV charging for the public',ev.known?`each Level 2 port repays its $${fmt(X.ev.port)} after about ${fmt(Math.round(ev.kwh/1000)*1000)} kWh sold`:'not yet known: no Alberta public charging rate found',
    ev.known?`<dl><dt>Who is nearby</dt><dd>${nearEV(f)}</dd><dt>What it is worth</dt><dd>BC Hydro's public Level 2 price, 28.28 ¢/kWh (BCUC G-30-26), less the 6.79 ¢ it costs at the data centre's rate: about ${(ev.margin*100).toFixed(1)} ¢ a kWh</dd><dt>What it costs</dt><dd>about $${fmt(X.ev.port)} a port (NRCan, Dunsky & ICCT 2024, 2022 $)</dd><dt>To repay a port</dt><dd><span class="k">about ${fmt(Math.round(ev.kwh/1000)*1000)} kWh</span>, or ${fmt(Math.round(ev.hours/100)*100)} hours of charging at 7.4 kW; how many hours a port is used is not published (no Level 2 figure found)</dd><dt>Rules</dt><dd>selling charging is exempt from being a public utility in BC (MO M104, 2019)</dd></dl>`:`<p class="sub">${nearEV(f)}. Alberta: EV charging's regulatory status is "unclear" (AUC 2021); no utility or city charging price found.</p>`);
  return h; }

function nearEV(f){ const ev=BD.evNear&&BD.evNear(f); return ev?`${ev.n} public charging station${ev.n===1?'':'s'} within 1 km (${ev.l2} Level 2 ports, ${ev.dc} DC fast; NRCan locator, 16 Oct 2026)`:'charging stations nearby: not loaded'; }
function nearCT(f){ const w=BD.wpNear&&BD.wpNear(f,'ct',500); return f.city!=='van'?'no cooling-tower permit list for Edmonton':w?`${w.n} cooling tower${w.n===1?'':'s'} with active City operating permits within 500 m, nearest ${fmt(Math.round(w.d))} m: buildings that already buy water for cooling (counts and distances only)`:'cooling-tower permits: not loaded'; }
/* ---------- water ---------- */
function waterRate(c){ if(c==='van') return {r:X.water.van,known:true,txt:'City of Vancouver 2026: water $1.445–1.811 per m³ (winter, summer) + sewer $2.811 per m³, both billed on metered water'};
  const o=X.water.edmOld; return {r:[o.w[0]+o.ww[0]+o.san,o.w[1]+o.ww[1]+o.san],known:false,txt:'EPCOR 2026 commercial rates not read: placeholder from the 2022–23 commercial water tiers ($0.95–1.61), the proposed 2025 wastewater treatment ($0.46–1.15) and the proposed sanitary rate ($1.12)'}; }
function towerUse(f,outside){ const R=E().R, mw=A().mw||1, MWh=mw*R.pue[1]*8760*R.lf; const hyb=outside==='hybrid', share={van:0.124,edm:0.104}[f.city]; if(outside==='dry') return null;
  const evap=MWh*1.5*(hyb?share:1); return {evap,mk:[evap*1.2,evap*2]}; }
function rain(f,outside){ const roof=E().roofArea(f), mm=f.city==='van'?1159.5:422.5, wet=f.city==='van'?124:80, v=roof*mm/1000*0.8, tank=roof*wet/1000*0.8; const t=towerUse(f,outside);
  const used=t?Math.min(v,t.mk[0]):0; const wr=waterRate(f.city); if(!used) return {v,tank,used:0,wr};
  const cap=[tank*X.tank.cost[0],tank*X.tank.cost[1]], lc=[crf(rate(),X.tank.life[1])*cap[0]/used,crf(rate(),X.tank.life[0])*cap[1]/used];
  return {v,tank,used,cap,lc,wr,pay:[cap[0]/(used*wr.r[1]),cap[1]/(used*wr.r[0])]}; }
function waterSecs(f){ const sec=BD.sec, out=A().outside||'dry', wr=waterRate(f.city), t=towerUse(f,out), r=rain(f,out);
  const all=['dry','hybrid','towers'].map(o=>({o,t:towerUse(f,o),r:rain(f,o)}));
  let h='<h3>What it is worth here</h3><p class="sub">The same rows as heat: how much, what it is worth, what it costs over its life, years to pay back, the best set-up found, the rules.</p>';
  h+=sec('x-wbill','Water the cooling buys',t?`about ${money(t.mk[0]*wr.r[0])}–${money(t.mk[1]*wr.r[1])} a year at ${f.city==='van'?'Vancouver':'Edmonton'} rates${wr.known?'':' (placeholder rates)'}`:'none with dry coolers',
    `<dl><dt>Who is nearby</dt><dd>${nearCT(f)}</dd><dt>How much</dt><dd>${t?`${fmt(t.mk[0])}–${fmt(t.mk[1])} m³ of make-up a year (evaporation × 1.2–2, at 2–6 cycles; FEMP)`:'dry coolers use no water'}</dd><dt>Price</dt><dd>${esc(wr.txt)}</dd>
     <dt>Each cooling choice</dt><dd>${all.map(x=>`${x.o==='dry'?'dry coolers':x.o==='hybrid'?'hybrid coolers':'cooling towers'}: ${x.t?`${fmt(x.t.mk[0])}–${fmt(x.t.mk[1])} m³, ${money(x.t.mk[0]*wr.r[0])}–${money(x.t.mk[1]*wr.r[1])} a year`:'none'}`).join('; ')}. Dry coolers trade water for electricity and space (see the set-up cards)</dd></dl>`);
  h+=sec('x-rain','Rainwater for cooling',!r.used?`${fmt(r.v)} m³ of rain a year; ${out==='dry'?'dry coolers have no use for it':'—'}`:`$${r.lc[0].toFixed(2)}–${r.lc[1].toFixed(2)} per m³ over its life, against $${wr.r[0].toFixed(2)}–${wr.r[1].toFixed(2)} for city water${wr.known?'':' (placeholder)'}`,
    `<dl><dt>How much</dt><dd>${fmt(r.v)} m³ of rain on the roof a year (ECCC Normals × 0.8 runoff, assumed); tank about ${fmt(r.tank)} m³, one wet month (assumed)</dd><dt>Who takes it</dt><dd>${r.used?`the cooling: up to ${fmt(r.used)} m³ a year`:'dry coolers use none; toilets and irrigation only (demand not known)'}</dd>
     <dt>What it is worth</dt><dd>${esc(wr.txt)}</dd>${r.used?`<dt>What it costs</dt><dd>${money(r.cap[0])}–${money(r.cap[1])} for the tank and pumps: $${X.tank.cost[0]}–${fmt(Math.round(X.tank.cost[1]))} per m³ of storage (City of Vancouver toolkit 2014, ±30%, to US EPA 2013 with pumps and controls, US$ converted, no inflation adjustment); tanks warranted 15–30 years (US DOE FEMP)</dd>
     <dt>Cost against worth</dt><dd><span class="k">$${r.lc[0].toFixed(2)}–${r.lc[1].toFixed(2)} per m³</span> against $${wr.r[0].toFixed(2)}–${wr.r[1].toFixed(2)}</dd><dt>Years to pay back</dt><dd>${yrs(r.pay[0])} to ${yrs(r.pay[1])}</dd>`:''}
     <dt>Best set-up found</dt><dd>${(()=>{ const ok=all.filter(x=>x.r.used).sort((a,b)=>a.r.lc[0]-b.r.lc[0]); return ok.length?`${ok[0].o==='towers'?'cooling towers':'hybrid coolers'} use the most rain (${fmt(ok[0].r.used)} m³ a year, $${ok[0].r.lc[0].toFixed(2)}–${ok[0].r.lc[1].toFixed(2)} per m³); they also buy the most water`:'none: with no tower water to replace, rain has no use here'; })()}</dd></dl>`);
  h+=sec('x-recl','Reclaimed water',f.city==='van'?'no price set: Metro Vancouver commits to one (UT-019, 2023)':'Gold Bar supplies one industrial customer by a 5.5 km pipe; price not published',
    `<dl><dt>What it is worth</dt><dd>${f.city==='van'?'Metro Vancouver\'s interim policy (UT-019, 29 Sep 2023) lists industrial uses and commits to setting a price; none is published':'EPCOR\'s Gold Bar plant supplies reclaimed water to industry (EPCOR wastewater PBR 2025–27); the price is not published'}. US utilities price reclaimed water at 20–100% of drinking water (2007 US survey, in a UBC Sustainability Scholars report for Metro Vancouver, 2022; not peer-reviewed)</dd>
     <dt>A precedent</dt><dd>Quincy, Washington: a city-owned reuse plant, $31 M paid by the operator, 30-year agreement, saving about 522 ML of drinking water a year (US EPA case study)</dd><dt>Cost against worth</dt><dd>not yet known: no price, no pipe cost</dd></dl>`);
  return h; }

BD.xecon={elecSecs,waterSecs,solar,battery,rain,towerUse,waterRate};
})();
