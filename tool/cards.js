/* Beyond Data — the side panel as an index, and connection cards in the drawer (v19, 16 Oct 2026; J.B.: decision A, the drawer over the map
   beside the panel). Each receiver row opens a card: what the exchange is, the numbers with the math, what has to be built (existing pipes),
   construction and who pays, payback and the break-even distance, how hard the receiver is to connect, rules per city, who gains and who
   gives up, conditions, how proven, sources. Receivers that cost more than their heat is worth stay visible, greyed, with what would close the gap (option 2).
   Every figure has its source; nothing is ranked or scored. Wording is Claude's draft for J.B. */
(function(){
'use strict';
const BD=window.BD; const {$,esc,fmt}=BD; const E=()=>BD.eng;
const sm=(n,d=1)=>(n<0?'−$':'$')+(d===0?fmt(Math.abs(n)):Math.abs(n).toFixed(d)); // signed money
const draft=t=>`<span class="draft">${t}</span>`;
let OPPS=null; async function opps(){ if(OPPS) return OPPS; try{ OPPS=await BD.getJSON('opps.json'); }catch(e){ OPPS={opportunities:{},addons:[],sources:{},label_systems:{readiness:{states:[]},rules:{states:[]}},source_kinds:{},source_check:{}}; } return OPPS; }
BD.opps=opps; opps();
const st=(sys,id)=>{ const L=OPPS&&OPPS.label_systems&&OPPS.label_systems[sys]; return (L&&L.states.find(s=>s.id===id))||{name:id,means:''}; };
const RDC={built_here:'#8fb996',built_elsewhere:'#86ada7',pilot:'#cdb07a',speculative:'#CC746C',unknown:'#6b6964'};
const RSC={allowed:'#8fb996',approval:'#cdb07a',not_allowed:'#b24f49',no_rule:'#9d9a94',unknown:'#6b6964',na:'#3c4148'};
const rdPill=id=>{ const x=st('readiness',id); return `<span class="pill" style="border-color:${RDC[id]||'#6b6964'};color:${RDC[id]||'#9d9a94'}" title="${esc(x.means)}">${esc(x.name)}</span>`; };
const rsPill=id=>{ const x=st('rules',id); return `<span class="pill" style="border-color:${RSC[id]||'#6b6964'};color:${RSC[id]||'#9d9a94'}" title="${esc(x.means)}">${esc(x.name)}</span>`; };
function srcList(ids){ if(!ids||!ids.length) return ''; const S=(OPPS&&OPPS.sources)||{}, K=(OPPS&&OPPS.source_kinds)||{}, CK=(OPPS&&OPPS.source_check)||{};
  return '<ul class="csrc">'+[...new Set(ids)].map(i=>{ const t=S[i]; if(!t) return `<li><code>${esc(i)}</code></li>`; const m=t.match(/https?:\/\/\S+/); const txt=esc(t.replace(/\s*—?\s*https?:\/\/\S+$/,''));
    return `<li>${K[i]?`<span class="evb">${esc(K[i])}</span>`:''}${CK[i]==='agent'?'<span class="evb" style="color:var(--accent)">quote to check</span>':''}${txt}${m?` <a href="${m[0]}" target="_blank" rel="noopener">source</a>`:''}</li>`; }).join('')+'</ul>'; }
BD.srcList=srcList; BD.rdPill=rdPill; BD.rsPill=rsPill;
const css=document.createElement('style'); css.textContent=`
.csrc{margin:6px 0 0;padding-left:16px;font-size:12px;color:var(--muted)}.csrc li{margin:5px 0}.csrc .evb{margin-right:4px}
.idx{width:100%;border-collapse:collapse;font-size:12.5px;margin-top:6px}.idx td{border-top:1px solid var(--line);padding:6px 4px;vertical-align:top}.idx tr.grey td{color:var(--faint)}.idx td.r{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}
.idx a.ex{color:var(--accent-2);white-space:nowrap;text-decoration:none}.idx tr:hover td{background:var(--panel-2)}
.hfig{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:10px 0}.hfig div{border:1px solid var(--line-2);border-radius:6px;padding:8px 10px}.hfig b{display:block;font-weight:300;font-size:18px}.hfig span{font-size:11.5px;color:var(--muted)}
.cls{display:inline-block;font-size:11px;border-radius:8px;padding:0 6px;border:1px solid var(--line-2);color:var(--muted);white-space:nowrap}
.tgl{display:flex;align-items:center;gap:8px;font-size:12.5px;margin:8px 0;color:var(--muted)}.tgl input{accent-color:var(--accent)}
.scn{display:flex;gap:4px;flex-wrap:wrap;margin:6px 0}.scn button{background:transparent;border:1px solid var(--line-2);border-radius:999px;padding:3px 10px;font-size:12px;color:var(--muted);cursor:pointer}.scn button[aria-pressed=true]{border-color:var(--accent);color:var(--fg)}
.cchart svg{display:block;width:100%;height:auto}
`; document.head.appendChild(css);

/* ---------- money and distance for heat (sources in ECON.src) ---------- */
const REACH=3000; // m, straight line: how far the heat search looks (J.B., 19 Oct 2026: a routing limit; cost decides, not a borrowed radius)
const ECON={
 eur:1.5782, usd:1.3978, // Bank of Canada annual averages 2025, CAD per unit
 pipe:[1038,2620],       // CAD per metre of trench, DN100 pipe pair: Persson et al. 2019 average (≈€658/m, 2015 €) to npro paved urban (€160 + €1,500); converted at the 2025 rates; no inflation adjustment
 pipeCheck:1541,         // City of Cambridge MA, DN100 US$336/ft (2027 planning prices)
 fixed:123873,           // City of Vancouver NEU connection levy, fixed part per energy transfer station, in force 1 Jan 2026 (By-law 9552 Sch. C Part 1, as amended by By-law 14524; $136,260 from 1 Jan 2027) (+ $146/kW of peak, not included: peak demand is not known)
 gasMonths:{ // commodity part only, $/GJ, Nov 2025 → Oct 2026 (same 12 months both cities; the rest of each tariff stays at the current schedule)
  van:[2.230,2.230,2.230,2.230,2.230,1.660,1.660,1.660,1.660,1.660,1.660,1.660], // FortisBC CCRC, Mainland: $2.230 from 1 Oct 2023 (BCUC L-9-25, L-27-25), $1.660 from 1 Apr 2026 (Order G-50-26); Jul–Sep 2026 per Rate 3 PDF; Oct 2026 unchanged per FortisBC release copy (BCUC letter not read: unverified)
  edm:[2.579,3.390,3.331,2.422,1.784,1.874,0.936,2.076,1.595,1.729,1.124,1.458]}, // Alberta regulated rate, Direct Energy Regulated Services (ATCO Gas), UCA regulated-rates page, read 18 Oct 2026
 gas:null, // set below: $/MWh of gas energy = (fixed per-GJ charges + 12-month mean commodity) × 3.6
 gasFixed:{van:9.305-1.660,edm:1.045}, // $/MWh of gas energy displaced: FortisBC Rate 3, Mainland (delivery 5.165 + Rider 5 0.212 = 5.377; storage and transport 1.171 + Rider 6 0.188 + Rider 8 0.909 = 2.268; cost of gas 1.660 $/GJ; every per-GJ charge on the schedule; delivery eff. 1 Jan 2026, G-287-25; commodity pages eff. 1 Jul 2026, G-131-26; checked against the schedule PDF 18 Oct 2026; basic charge and municipal fee excluded); ATCO Mid Use delivery 1.045 + Alberta regulated rate Oct 2026 1.458 $/GJ (riders excluded)
 elec:{van:67.9,edm:+(43.68+2.53+0.0809*43.68).toFixed(2)}, // $/MWh, energy-type charges only, demand charges excluded in both: BC Hydro LGS energy charge 6.79 ¢/kWh (1 Apr 2026); Alberta pool average 2025 $43.68 + EPCOR SAS-TOU transmission energy $2.53/MWh + operating reserve 8.09% of pool (2026 interim rates, AUC 30298-D01-2025; agent-read, to check)
 boiler:0.85,             // gas boiler efficiency: a MWh of heat displaces 1 ÷ 0.85 MWh of gas (register price_ceiling; verification sweep M1, 18 Oct 2026)
 neu:32.59,               // $/MWh credited for heat returned to the NEU (By-law 9552 Sch. C)
 years:5,                 // RVO 2018 reach distances assume a 5-year payback: no longer used (J.B., 19 Oct: no 5-year line; search to 3 km, cost decides)
 // payback method (J.B., 19 Oct 2026; audit/payback_method_2026-10-19.md): pipe, connection, heat pump and upkeep counted
 hpCapex:[[1,1.13e6],[3,0.95e6]], // € per MW of heat, waste-heat heat pump, total investment (Danish Energy Agency technology data, sheet 40, Aug 2026, 2025 €); below 1 MW held at 1.13 (smaller units likely cost more: ReUseHeat 0.3 MW ≈ 1.53)
 hpFLH:[4400,7100],
 hpFLHfull:{van:[3200,4500],edm:[2900,3900]}, // heat pump covering a building's whole load incl. the coldest hours: annual ÷ peak hour (single coldest to 99th-percentile hour; base 15.5–18 °C; hot water flat), CWEC; logic test 19 Oct 2026       // full-load hours a year, mature years (Odense 2024 ≈ 4,365; Mäntsälä 5,000; STACK Oslo claim 7,143): sizes the heat pump from the heat sold
 hpOMfix:2100, hpOMvar:3.07, // € per MW·yr and € per MWh, excluding electricity (DEA sheet 40)
 life:{pipe:30,hp:25},    // years: pipe design life 30 yr at 120 °C (EN 253:2019, as quoted in Energiforsk 2022:872 s. 8.2; lower temperatures age slower); heat pump 25 yr (DEA)
 rate:0.056,              // real cost of capital: weighted average for a BCUC-regulated private utility, 5.6% real (Squamish NEU feasibility, Compass/FVB 2010, p. 44)
 co2pipe:2*(39.5+1.03+0.205), // kg CO2e per metre of route: supply and return DN100, A1–A5 (isoplus EPD); trench excluded
 src:['vanStreets2026','edmRoads2026','persson2019','nproCosts','cambridgeApp5','vanNEUlevy2025','fortisBC2026','atcoGas2026','bchTariff2026','isoplusEPD','vanQuebecSt2020','vanNEUguide','torontoDER2016','statcanHeat2011']
};
{const m=a=>a.reduce((t,v)=>t+v,0)/a.length; ECON.gasAvg={van:m(ECON.gasMonths.van),edm:m(ECON.gasMonths.edm)}; ECON.gas={van:(ECON.gasFixed.van+ECON.gasAvg.van)*3.6,edm:(ECON.gasFixed.edm+ECON.gasAvg.edm)*3.6};}
/* displaced gas, item 6 (J.B. 18 Oct): marketable natural gas, commercial/institutional, CO2 1,966 (BC) / 1,962 (AB) g/m³, CH4 0.037, N2O 0.035 g/m³
   (ECCC Emission factors and reference values v4.0, Sep 2026, from NIR 1990-2024 Table A6.1-1/-3; AB EPA Carbon Offset Emission Factors Handbook v3.3 Table 5);
   AR5 GWPs 28 / 265 (NIR 2026 Part 1); HHV 38.39 MJ/m³ (ECCC Table 8) → 51.5 kg CO2e/GJ; ÷ 0.85 boiler × 3.6 GJ/MWh ≈ 218 kg per MWh of heat in both provinces */
const CO2H={gas:Math.round((1964+0.037*28+0.035*265)/38.39*3.6/0.85),hp:c=>{ const R=E().R; return [Math.round(R.grid[c]/R.cop[1]),Math.round(R.grid[c]/R.cop[0])]; }};
BD.CO2H=CO2H;
BD.ECON=ECON; ECON.heatVal=city=>ECON.gas[city]/ECON.boiler; // $/MWh of heat the gas boiler would otherwise make
/* routes along streets: Vancouver street centrelines (City open data, 16 Oct 2026); elsewhere an L along the grid, labelled as an estimate */
const ST={};
async function streets(city){ if(ST[city]!==undefined) return ST[city]; try{ const d=await BD.getJSON('streets_'+city+'.json'); const N=new Map(), adj=[], xy=[];
    const node=(x,y)=>{ const k=Math.round(x)+','+Math.round(y); let i=N.get(k); if(i==null){ i=xy.length/2; N.set(k,i); xy.push(x,y); adj.push([]); } return i; };
    for(const g of d.segs){ const c=g[0]+(g[1]?0:100); for(let i=2;i+3<g.length;i+=2){ const a=node(g[i],g[i+1]), b=node(g[i+2],g[i+3]); const L=Math.hypot(g[i+2]-g[i],g[i+3]-g[i+1]); adj[a].push([b,L,c]); adj[b].push([a,L,c]); } }
    ST[city]={adj,xy,classes:d.classes,segs:d.segs}; return ST[city]; }catch(e){ ST[city]=null; return null; } }
BD.streets=streets;
function nearestNode(G,x,y){ let best=-1,bd=1e12; for(let i=0;i<G.xy.length;i+=2){ const d=(G.xy[i]-x)**2+(G.xy[i+1]-y)**2; if(d<bd){ bd=d; best=i/2; } } return [best,Math.sqrt(bd)]; }
function dijkstra(G,src,maxD){ const n=G.adj.length, dist=new Float64Array(n).fill(Infinity), prev=new Int32Array(n).fill(-1), pc=new Int16Array(n).fill(-1); dist[src]=0; const H=[[0,src]];
  const push=(e)=>{ H.push(e); let i=H.length-1; while(i>0){ const p=(i-1)>>1; if(H[p][0]<=H[i][0]) break; [H[p],H[i]]=[H[i],H[p]]; i=p; } };
  const pop=()=>{ const t=H[0], l=H.pop(); if(H.length){ H[0]=l; let i=0; for(;;){ const a=2*i+1,b=a+1; let m=i; if(a<H.length&&H[a][0]<H[m][0]) m=a; if(b<H.length&&H[b][0]<H[m][0]) m=b; if(m===i) break; [H[m],H[i]]=[H[i],H[m]]; i=m; } } return t; };
  while(H.length){ const [d,u]=pop(); if(d>dist[u]||d>maxD) continue; for(const [v,L,c] of G.adj[u]){ const nd=d+L; if(nd<dist[v]){ dist[v]=nd; prev[v]=u; pc[v]=c; push([nd,v]); } } }
  return {dist,prev,pc}; }
let RT=null; // the routing tree from the current site
async function routeTree(f){ const G=await streets(f.city); if(!G) return null; const key=f.city+'|'+f.c.join(','); if(RT&&RT.key===key) return RT; const [s,ds]=nearestNode(G,f.c[0],f.c[1]); RT={key,G,s,ds,T:dijkstra(G,s,4500)}; return RT; }
function routeOf(f,p){ if(RT&&RT.key===f.city+'|'+f.c.join(',')){ const G=RT.G; const [n,dn]=nearestNode(G,p.x,p.y); const d=RT.T.dist[n]; if(isFinite(d)){ p._route={n,len:RT.ds+d+dn}; return RT.ds+d+dn; } }
  return Math.abs(p.x-f.c[0])+Math.abs(p.y-f.c[1]); }
function routePath(p){ if(!RT||!p._route) return null; const G=RT.G, pts=[], cls={}; let n=p._route.n; while(n>=0&&n!==RT.s){ pts.push([G.xy[2*n],G.xy[2*n+1]]); const pr=RT.T.prev[n]; if(pr<0) break; const L=Math.hypot(G.xy[2*n]-G.xy[2*pr],G.xy[2*n+1]-G.xy[2*pr+1]); const pcv=RT.T.pc[n]; const c=(G.classes[pcv%100]||'street')+(pcv>=100?' (unpaved)':''); cls[c]=(cls[c]||0)+L; n=pr; } pts.push([G.xy[2*RT.s],G.xy[2*RT.s+1]]); return {pts:pts.reverse(),cls}; }
BD.routeTree=routeTree; BD.routePath=routePath;
function heatEcon(f,p,offer){ const R=E().R, city=f.city, cop=R.cop; // offer: [low, high] MWh/yr of heat the chosen size could offer
  const route=routeOf(f,p); const ce=(CEUD[city]||{})[p.t]; const use=p.dem?p.dem:p.t==='housing'&&p.u?p.u*R.homeMWh[city]:(p.fa&&ce&&!noDemand(p)?p.fa*ce[0]/3.6:null); // energy BOUGHT for heating (p.dem: big buildings, make_bigrecv.py)
  // logic test 19 Oct (J.B.): every demand source (CEUD, homes, Vancouver HEI) counts fuel bought, not heat delivered; the heat a building takes is that × the gas boiler's 0.85 it replaces
  const demand=use?use*ECON.boiler:null;
  // big buildings estimated from provincial averages carry a low end (p.lo, make_bigrecv.py: estimate ÷ the factor from the Vancouver check); the low case uses it
  const demandLo=demand&&p.lo&&!p.meas?p.lo*ECON.boiler:demand;
  const v=ECON.heatVal(city), pe=ECON.elec[city]; const net=[v-pe/cop[0],v-pe/cop[1]]; // worst (COP 3.0), best (COP 4.5) $/MWh of heat after the heat pump's electricity
  const o={route,demand,demandLo,use,v,pe,net,cost:[ECON.fixed+route*ECON.pipe[0],ECON.fixed+route*ECON.pipe[1]],co2:route*ECON.co2pipe/1000}; o.pipeCost=o.cost.slice();
  if(demand){ const take=offer?[Math.min(demandLo,offer[0]),Math.min(demand,offer[1])]:[demandLo,demand]; o.take=take; o.capped=!!offer&&demand>offer[0]; // sweep M3, J.B. 18 Oct: a building can only buy the heat that is offered
    // heat pump sized from the heat sold: MW = MWh ÷ full-load hours (more hours → smaller, cheaper unit)
    const cpm=mw=>{ const [[m1,c1],[m3,c3]]=ECON.hpCapex; return (mw<=m1?c1:mw>=m3?c3:c1+(c3-c1)*(mw-m1)/(m3-m1))*ECON.eur; };
    const hpMW=[take[1]/ECON.hpFLH[1],take[0]/ECON.hpFLH[0]], hp=[hpMW[0]*cpm(hpMW[0]),hpMW[1]*cpm(hpMW[1])];
    const om=[(ECON.hpOMfix*hpMW[0]+ECON.hpOMvar*take[1])*ECON.eur,(ECON.hpOMfix*hpMW[1]+ECON.hpOMvar*take[0])*ECON.eur];
    const pipe=[ECON.fixed+route*ECON.pipe[0],ECON.fixed+route*ECON.pipe[1]];
    o.hpMW=hpMW; o.hp=hp; o.om=om; o.pipeCost=pipe; o.cost=[pipe[0]+hp[0],pipe[1]+hp[1]];
    const yr=[take[1]*net[1]-om[0],take[0]*net[0]-om[1]]; o.yr=yr; // money left each year: best, worst
    o.payback=[yr[0]>0?o.cost[0]/yr[0]:Infinity,yr[1]>0?o.cost[1]/yr[1]:Infinity];
    // middle case: every range at its midpoint (pipe, heat-pump efficiency, hours run)
    const mCop=(cop[0]+cop[1])/2, mFLH=(ECON.hpFLH[0]+ECON.hpFLH[1])/2, mTake=(take[0]+take[1])/2, mMW=mTake/mFLH;
    const mCost=ECON.fixed+route*(ECON.pipe[0]+ECON.pipe[1])/2+mMW*cpm(mMW), mYr=mTake*(v-pe/mCop)-(ECON.hpOMfix*mMW+ECON.hpOMvar*mTake)*ECON.eur;
    o.payMid=mYr>0?mCost/mYr:Infinity;
    // over the life of the parts at a utility's cost of capital: cost per MWh of heat against what the heat is worth
    const crf=(i,n)=>i*Math.pow(1+i,n)/(Math.pow(1+i,n)-1), cP=crf(ECON.rate,ECON.life.pipe), cH=crf(ECON.rate,ECON.life.hp); o.crf=[cP,cH];
    o.lcoh=[(cP*pipe[0]+cH*hp[0]+om[0])/take[1]+pe/cop[1],(cP*pipe[1]+cH*hp[1]+om[1])/take[0]+pe/cop[0]];
    o.lcohMid=(cP*(ECON.fixed+route*(ECON.pipe[0]+ECON.pipe[1])/2)+cH*mMW*cpm(mMW)+(ECON.hpOMfix*mMW+ECON.hpOMvar*mTake)*ECON.eur)/mTake+pe/mCop;
    // what the rules chosen do to the middle case (J.B., 19 Oct: show them): cost of capital 3% and 8%; heat pump covering the coldest hours too
    const midAt=(rate,flh)=>{ const k1=crf(rate,ECON.life.pipe), k2=crf(rate,ECON.life.hp), mw=mTake/flh; return (k1*(ECON.fixed+route*(ECON.pipe[0]+ECON.pipe[1])/2)+k2*mw*cpm(mw)+(ECON.hpOMfix*mw+ECON.hpOMvar*mTake)*ECON.eur)/mTake+pe/mCop; };
    const ff=ECON.hpFLHfull[city]||ECON.hpFLHfull.van; o.alt={r3:midAt(0.03,mFLH),r8:midAt(0.08,mFLH),full:midAt(ECON.rate,(ff[0]+ff[1])/2),ff};
    // what the heat can carry in pipe and connection over the pipe's life (for the distance chart and break-even route)
    o.val=[(yr[1]-cH*hp[1])/cP,(yr[0]-cH*hp[0])/cP]; // worst, best
    o.be=[(o.val[1]-ECON.fixed)/ECON.pipe[0],(o.val[0]-ECON.fixed)/ECON.pipe[1]]; // best case, worst case break-even route length
    o.status=o.lcoh[1]<=v?'within':o.lcoh[0]<=v?'depends':'beyond';
    if(o.status==='beyond'){ o.close=[]; const need=o.lcoh[0]; o.close.push(`a heat price of about $${need.toFixed(0)}/MWh instead of $${v.toFixed(0)} (gas at about $${(need*ECON.boiler/3.6).toFixed(1)}/GJ instead of $${(ECON.gas[city]/3.6).toFixed(2)}; best case)`);
      if(yr[0]<=0) o.close.push(`electricity below about $${((v-om[0]/take[1])*cop[1]).toFixed(0)}/MWh for the heat pump before any route can start to pay back (now about $${pe.toFixed(0)}, before ${city==='edm'?'wires':'demand'} charges)`);
      o.close.push('a receiver taking more heat, or a pipe already in the street'); } }
  else o.status='unknown';
  return o; }
BD.heatEcon=heatEcon;
const STATUS={within:['costs less than the heat is worth','#8fb996'],depends:['depends on the costs','#cdb07a'],beyond:['costs more than the heat is worth','#6b6964'],unknown:['demand not yet known','#9d9a94']}; // over the parts' life, at a utility's cost of capital (J.B., 19 Oct)
/* receiver list grouped by kind (J.B., 16 Oct: "a lot of repetition"): the kind, the shared connection difficulty and the column labels are said
   once per group; a row shows only what differs — name, size, route, and a status word unless it is the greyed "costs more". */
function groupRows(all,showB){ const by={}; all.forEach(p=>(by[p.t]=by[p.t]||[]).push(p)); const ord=['housing','apartment','office','hotel','commercial','school','campus','hospital','care','rec','hall','pool','arena'];
  // J.B., 16 Oct: "a lot of information that doesn't do anything" — rows only where they say something different; the rest is summed in one line
  return ord.filter(t=>by[t]).map(t=>{ const G=by[t], act=G.filter(p=>!p.beyond), bey=G.filter(p=>p.beyond);
    const nW=G.filter(p=>p.econ.status==='within').length, nD=G.filter(p=>p.econ.status==='depends').length, nU=G.filter(p=>p.econ.status==='unknown').length;
    const cnt={}; G.forEach(p=>cnt[p.diff.t]=(cnt[p.diff.t]||0)+1); const mode=Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0];
    const head=`<h3 class="gh">${esc(TYPE[t])} <span class="src">${G.length} building${G.length>1?'s':''}${nW?` · ${nW} cost less than the heat is worth`:''}${nD?` · ${nD} depend on the costs`:''}${nU?` · ${nU} demand not known`:''}${bey.length?` · ${bey.length} cost more`:''} · connection: ${esc(mode[0].toLowerCase())}${mode[1]<G.length?` (${mode[1]})`:''}</span></h3>`;
    const unit=t==='housing'?'homes':'floor, est.';
    const row=p=>`<tr class="${p.beyond?'grey':''} rowlink" data-rid="${p.id}"><td>${esc(p.n||'(unnamed)')}${p.beyond?'':`<div>${stPill(p.econ.status)}</div>`}${p.diff.t!==mode[0]?`<div class="src" style="color:${DCOL[p.diff.k]}">${esc(p.diff.t)}</div>`:''}</td><td class="r">${p.u?fmt(p.u):p.fa?fmt(p.fa)+' m²':'—'}</td><td class="r">${fmt(p.econ.route)} m</td><td class="r chev">›</td></tr>`;
    const A=act.slice(0,15), B=showB?bey.slice(0,15):[];
    let sum='';
    if(bey.length){ const r=bey.map(p=>p.econ.route), tot=bey.reduce((x,p)=>x+(p.u||0),0), near=bey.slice().sort((a,b)=>a.econ.route-b.econ.route)[0];
      sum=`<p class="sub">${bey.length} cost more than the heat is worth${t==='housing'&&tot?`, ${fmt(tot)} homes in all`:''}, routes ${fmt(Math.min(...r))}–${fmt(Math.max(...r))} m.${near.econ.close&&near.econ.close.length?` For the nearest, what would close the gap: ${esc(near.econ.close[0])}.`:''}${showB?'':' Tick the box above to list them.'}</p>`; }
    const rows=A.concat(B);
    return head+(rows.length?`<table class="idx gr"><thead><tr><th></th><th class="r">${unit}</th><th class="r">route</th><th></th></tr></thead><tbody>${rows.map(row).join('')}${act.length>A.length?`<tr><td colspan="4" class="src">and ${act.length-A.length} more further away</td></tr>`:''}${showB&&bey.length>B.length?`<tr><td colspan="4" class="src">and ${bey.length-B.length} more that cost more, further away</td></tr>`:''}</tbody></table>`:'')+sum; }).join(''); }
const stPill=k=>`<span class="cls" style="border-color:${STATUS[k][1]};color:${STATUS[k][1]}">${STATUS[k][0]}</span>`;
/* how hard to connect (J.B., 16 Oct): Ready / Needs a heat-pump lift / Needs a building retrofit / Not yet known */
function difficulty(f,p,nets){ const nIn=nets.find(n=>BD.pip(p.x,p.y,n.r)), inNet=!!nIn&&nIn.src==='van9552';
  if(nIn&&!inNet&&!p.de&&nIn.kind==='planned') return {k:'unknown',t:'In a planned network area',why:nIn.note||''};
  if(nIn&&!inNet&&!p.de) return {k:'lift',t:'On a network (terms not read)',why:`inside the ${nIn.n} service area (approximate): the building likely has an energy transfer station. ${nIn.note||''}`};
  if(p.de) return {k:'lift',t:'Has its own heating plant',why:p.de+(/steam/.test(p.de)?'. Steam this hot cannot take server heat without a large lift; how the plant could take outside heat is not published':'. How the plant would take outside heat is not published')};
  if(inNet) return {k:'ready',t:'Ready (on a network)',why:'inside a district-energy service area: the building has, or must have, an energy transfer station; the data centre\'s heat still needs lifting to the network\'s supply temperature (the NEU guidelines give 65 °C; not re-read for this tool)'};
  return {k:'unknown',t:'Not yet known',why:`depends on how it is heated now. Hot-water radiators and fan coils run at about 60 °C supply, 45 °C return; radiant floors 45/35 (Toronto District Energy Ready Guideline, 2016) — both need a heat-pump lift from server heat. Forced-air or electric baseboard heat needs a building retrofit. In ${f.city==='van'?'BC 52% of homes heat with forced air, 28% baseboard, 6% boilers':'Alberta 94% of homes heat with forced air'} (Statistics Canada 2011, all homes — not this building).`}; }
const DCOL={ready:'#8fb996',lift:'#cdb07a',retrofit:'#CC746C',unknown:'#9d9a94'};

/* ---------- heat: the index ---------- */
/* energy used for space and water heating per m² of floor, by activity type (NRCan Comprehensive Energy Use Database, Commercial/Institutional,
   2023, Tables 15, 17, 19: (space heating + water heating PJ) ÷ floor space). Delivered fuel and electricity, not useful heat; provincial
   averages over all buildings of the type. Pools and arenas fall under Arts, Entertainment and Recreation; care homes under Health Care and Social Assistance. */
const CEUD={van:{school:[0.497,'Educational Services'],campus:[0.497,'Educational Services'],hospital:[1.096,'Health Care and Social Assistance'],care:[1.096,'Health Care and Social Assistance'],rec:[0.650,'Arts, Entertainment and Recreation'],hall:[0.650,'Arts, Entertainment and Recreation'],pool:[0.650,'Arts, Entertainment and Recreation'],arena:[0.650,'Arts, Entertainment and Recreation']},
            edm:{school:[1.307,'Educational Services'],campus:[1.307,'Educational Services'],hospital:[2.348,'Health Care and Social Assistance'],care:[2.348,'Health Care and Social Assistance'],rec:[1.458,'Arts, Entertainment and Recreation'],hall:[1.458,'Arts, Entertainment and Recreation'],pool:[1.458,'Arts, Entertainment and Recreation'],arena:[1.458,'Arts, Entertainment and Recreation']}};
const ESTAR={school:[0.75,'K-12 schools'],hospital:[2.22,'hospitals'],care:[1.04,'residential care'],arena:[1.15,'ice and curling rinks'],pool:[1.51,'pools, rinks and fitness centres'],rec:[1.51,'pools, rinks and fitness centres'],hall:[1.51,'pools, rinks and fitness centres']};
/* why a receiver's demand is shown as not yet known (sweep M6/M7, J.B. 18 Oct 2026; rules in dedupe_receivers.py) */
function noDemand(p){ return p.t==='campus'?'a campus has several buildings; its heat demand would come from the institution\'s own energy reports, not yet read':p.seas?(p.seas==='summer'?'an outdoor pool, heated in summer only: the year-round average for its sector does not apply':'listed as both an indoor and an outdoor pool in the national database'):p.ten?'it rents space in a building of other uses (a private college, or a school in a tower), so the building\'s heat is not its own; as a tenant it could be a party to a heat contract, but the building owner would need to agree, since the heating plant and pipes are the owner\'s':p.fx?'its building outline joins several connected buildings under one height, so its floor area cannot be estimated from the tiles':p.fs?`it shares a building with ${p.fs}, whose card counts that building`:''; }
BD.noDemand=noDemand;
function ceudLine(city,t,p){ const c=(CEUD[city]||{})[t]; if(!c) return ''; const mwh=c[0]/3.6;
  return `Demand: ${p&&noDemand(p)?'not estimated — '+noDemand(p)+'.':'this building\'s floor area is not known.'} ${city==='van'?'BC':'Alberta'} ${c[1]} buildings use on average ${c[0].toFixed(2)} GJ per m² a year for space and water heating (${mwh.toFixed(2)} MWh/m²; NRCan CEUD 2023) — so every 1,000 m² of floor would take about ${fmt(mwh*1000)} MWh a year.${ESTAR[t]?` For comparison, the Canadian median for ${ESTAR[t][1]} is ${ESTAR[t][0]} GJ/m² of all energy, heating included (ENERGY STAR Canada, 2018).`:''}`; }
const TYPE={housing:'Non-market housing',school:'School',campus:'University or college campus',care:'Care home',hospital:'Hospital',rec:'Recreation centre',hall:'Community league hall',pool:'Pool',arena:'Indoor arena',apartment:'Apartment building',office:'Office building',hotel:'Hotel',commercial:'Commercial building'};
/* other district-energy systems in the city, from the CEEDC Innovative Energy Facilities inventory (SFU; J.B. download 16 Oct 2026).
   Not mapped: the inventory's coordinates do not match the facilities, and it gives no service areas. Figures as reported, year in brackets. */
const OTHERNETS={van:[['Downtown steam (Creative Energy) — on the map, from the City map','steam, 237 MW; 220 buildings','2014'],['SEFC Neighbourhood Energy Utility (City of Vancouver) — on the map as the NEU','hot water 67 °C supply, 50 °C return; 32 MW; 44 buildings; about 8.3 km of pipe','2022'],['River District Energy — on the map, approximate area','hot water 85 °C supply, 65 °C return; 15 MW; 20 buildings; about 2.9 km of pipe','2018'],['Vancouver General Hospital — on the map as a hospital','central plant; no figures published','2017'],["BC Children's and Women's Hospital — on the map as a hospital",'central plant; no figures published','2022'],['Sen̓áḵw (Creative Energy); Oakridge Park; Main Alley','planned; no figures','—']],
 edm:[['University of Alberta — on the map as the campus','steam 205 °C supply, 590 MW; chilled water 5 °C, 145 MW; 80 buildings','2017'],['Boyle Renaissance District Energy','no figures published','2017'],['Blatchford — on the map as its service area','listed, no figures','—'],['Edmonton Institution; Edmonton Institution for Women','steam; no figures published','2018']]};
function otherNets(city){ const L=OTHERNETS[city]||[]; if(!L.length) return '';
  return `<details class="sub"><summary>Other district-energy systems in the city (${L.length}; those not on the map have no location source yet)</summary><table class="idx"><tbody>${L.map(r=>`<tr><td>${esc(r[0])}<div class="src">${esc(r[1])}${r[2]!=='—'?' ('+r[2]+')':''}</div></td></tr>`).join('')}</tbody></table>
  <div class="src">CEEDC Innovative Energy Facilities inventory, district energy (SFU). Its coordinates do not match the facilities and it gives no service areas; systems marked on the map are located from other sources. Figures reported 2014–2023; some figures withheld as confidential. Steam at 205 °C cannot take server heat without a large lift; hot-water networks at 65–85 °C need a heat pump; returns at 50–65 °C set what it must beat.</div></details>`; }
/* ---------- best set-up for heat on this site (J.B., 19 Oct 2026: "show what site set-up and equipment would make the numbers more feasible") ----------
   Searches what the tool can vary for heat and shows the set-up with the lowest cost per MWh (middle case), with its trade-offs. Not a verdict.
   Levers: size (heat offered), which buildings share one pipe (a small branch network along the streets), the buildings' heating temperature.
   Liquid cooling to the chip is assumed (the only cooling with a sourced heat figure). Sources: audit/heat_search_2026-10-19.md */
const HS={src:{t:[37.5,24]}, // °C, liquid-cooled water from the servers and back to them: NREL ESIF, supply 24 °C, return 35–40 °C (Van Geet 2019)
  sinks:[{id:'70',t:[70,50],lab:'baseboards or fan coils (70 °C supply, 50 °C return)'},{id:'60',t:[60,45],lab:'panel radiators (60 °C, 45 °C)'}], // City of Vancouver NE connectivity standards (Dec 2013) s. 4.3
  eta:[0.40,0.50]}; // Lorenz efficiency for a built heat pump (register cop; calibrated at Odense, η 0.50 → 4.56 against 4.5 realised)
function lorenzCOP(src,sink){ const K=273.15, lm=(a,b)=>Math.abs(a-b)<0.01?a+K:((a+K)-(b+K))/Math.log((a+K)/(b+K)); const Tk=lm(sink[0],sink[1]), Ts=lm(src[0],src[1]); return HS.eta.map(e=>e*Tk/(Tk-Ts)); }
BD.lorenzCOP=lorenzCOP;
// one pipe from the site to a group of buildings: shared street segments are dug once; a segment carrying several buildings is sized up
// by continuity (diameter ∝ √flow, from the DN100 the tool assumes for one building) and priced by Persson & Werner (cost per metre = €212 + €4,464 × diameter)
function groupCost(f,G){ if(!RT||RT.key!==f.city+'|'+f.c.join(',')) return null; const T=RT.T, Gr=RT.G; const seg=new Map(); let tail=0;
  for(const p of G){ if(!p._route) return null; tail+=p._route.len-RT.ds-T.dist[p._route.n]; let n=p._route.n; while(n>=0&&n!==RT.s){ const pr=T.prev[n]; if(pr<0) break; const k=n; const e=seg.get(k)||{L:Math.hypot(Gr.xy[2*n]-Gr.xy[2*pr],Gr.xy[2*n+1]-Gr.xy[2*pr+1]),H:0,hmax:0}; e.H+=p.econ.take[1]; e.hmax=Math.max(e.hmax,p.econ.take[1]); seg.set(k,e); n=pr; } }
  const per=d=>(212+4464*d)/(212+4464*0.1); let len=RT.ds+tail, w=RT.ds+tail; // w: metres weighted by size factor
  const Htot=G.reduce((a,p)=>a+p.econ.take[1],0), Hmax=Math.max(...G.map(p=>p.econ.take[1]));
  w=RT.ds*per(0.1*Math.sqrt(Htot/Hmax))+tail; // the stretch from the site to the street carries everything
  for(const e of seg.values()){ len+=e.L; w+=e.L*per(0.1*Math.sqrt(e.H/e.hmax)); }
  return {len,w}; }
function scen(f,G,cop,offer){ const v=ECON.heatVal(f.city), pe=ECON.elec[f.city]; const gc=groupCost(f,G); if(!gc) return null;
  let H=G.reduce((a,p)=>a+p.econ.take[1],0); if(offer) H=Math.min(H,offer); if(H<=0) return null;
  const cpm=mw=>{ const [[m1,c1],[m3,c3]]=ECON.hpCapex; return (mw<=m1?c1:mw>=m3?c3:c1+(c3-c1)*(mw-m1)/(m3-m1))*ECON.eur; };
  const fix=ECON.fixed*G.length, crf=(i,n)=>i*Math.pow(1+i,n)/(Math.pow(1+i,n)-1), cP=crf(ECON.rate,ECON.life.pipe), cH=crf(ECON.rate,ECON.life.hp);
  const one=(pm,c,flh)=>{ const mw=H/flh, hp=mw*cpm(mw), om=(ECON.hpOMfix*mw+ECON.hpOMvar*H)*ECON.eur, pipe=fix+gc.w*pm, cap=pipe+hp, yr=H*(v-pe/c)-om;
    return {lcoh:(cP*pipe+cH*hp+om)/H+pe/c, pay:yr>0?cap/yr:Infinity, cap, pipe, hp, mw}; };
  const mid=one((ECON.pipe[0]+ECON.pipe[1])/2,(cop[0]+cop[1])/2,(ECON.hpFLH[0]+ECON.hpFLH[1])/2), lo=one(ECON.pipe[0],cop[1],ECON.hpFLH[1]), hi=one(ECON.pipe[1],cop[0],ECON.hpFLH[0]);
  return {G,H,len:gc.len,v,mid,lo,hi,offer,elec:H/((cop[0]+cop[1])/2)}; }
function bestHeat(f,all,offer){ const cand=all.filter(p=>p.econ&&p.econ.take&&p._route).sort((a,b)=>(a.econ.lcohMid||1e9)-(b.econ.lcohMid||1e9)).slice(0,60); if(!cand.length) return null; const out=[];
  for(const sk of HS.sinks){ const cop=lorenzCOP(HS.src.t,sk.t);
    // start from the building with the lowest cost per MWh on its own, then add whichever building lowers the group's cost most
    let best=null; for(const p of cand){ const r=scen(f,[p],cop,offer); if(r&&(!best||r.mid.lcoh<best.mid.lcoh)) best=r; }
    if(!best) continue; let G=best.G.slice(), grew=true;
    while(grew&&G.length<40){ grew=false; let nb=null; for(const p of cand){ if(G.includes(p)) continue; const r=scen(f,G.concat([p]),cop,offer); if(r&&r.mid.lcoh<(nb||best).mid.lcoh) nb=r; }
      if(nb&&nb.mid.lcoh<best.mid.lcoh-0.05){ best=nb; G=nb.G.slice(); grew=true; } if(offer&&best.H>=offer) break; }
    out.push(Object.assign(best,{sink:sk,cop})); }
  return out; }
BD.bestHeat=bestHeat;
// for the opportunity gates (J.B., 19 Oct: gates follow the set-up): best group of one kind of receiver at a given size; cached per site, size and kind
const HG={};
function heatGroup(f,kinds,mw){ const k=f.city+'|'+f.c.join(',')+'|'+mw.toFixed(1)+'|'+kinds.join(','); if(k in HG) return HG[k];
  if(!RT||RT.key!==f.city+'|'+f.c.join(',')) return null; const d=BD.recv[f.city]; if(!d) return null; const e=E();
  const all=d.pts.map(p=>Object.assign({},p,{dist:Math.hypot(p.x-f.c[0],p.y-f.c[1])})).filter(p=>p.dist<=REACH), nets=e.netsAt(f,d);
  const r=e.calc({mw,recover:true,to:'near'},f,all,nets); const sub=all.filter(p=>kinds.includes(p.t)); sub.forEach(p=>{ p.econ=heatEcon(f,p,r.avail); });
  const B=bestHeat(f,sub,r.avail[0]); HG[k]=B&&B[0]?B[0]:null; return HG[k]; }
BD.heatGroup=heatGroup;
function bestSec(f,B,base,mw,mwMax,Bmax){ if(!B||!B.length) return '';
  const b=B[0], b60=B[1], sm=x=>'$'+Math.round(x); const names=b.G.map(p=>p.n||TYPE[p.t]); const nm=names.slice(0,3).map(esc).join(', ')+(names.length>3?` and ${names.length-3} more`:'');
  const pays=b.mid.lcoh<=b.v, yrs=x=>!isFinite(x)?'never':x>50?'more than 50':String(Math.round(x));
  const sizeTxt=Bmax&&Bmax[0]&&Bmax[0].mid.lcoh<b.mid.lcoh-0.5?` At the largest size that fits (${mwMax.toFixed(1)} MW) the same search reaches ${sm(Bmax[0].mid.lcoh)} per MWh, with ${Bmax[0].G.length} buildings.`:'';
  const ans=`${sm(b.mid.lcoh)} per MWh against ${sm(b.v)} the heat is worth: liquid cooling, one pipe to ${b.G.length} building${b.G.length>1?'s':''}${base?` (your set-up, one building at a time: ${sm(base)})`:''}`;
  const body=`<p class="sub">The lowest cost per MWh the tool finds for heat on this lot, middle case. A search, not a recommendation.</p>
   <dl><dt>Cooling</dt><dd>liquid to the chip: water leaves the servers at about 35–40 °C and returns at 24 °C (NREL's ESIF data centre, measured design)</dd>
   <dt>Size</dt><dd>${mw.toFixed(1)} MW of servers</dd>
   <dt>Who takes the heat</dt><dd>${nm}: about ${fmt(Math.round(b.H/100)*100)} MWh a year, through ${fmt(Math.round(b.len/10)*10)} m of pipe along the streets, shared where the routes overlap</dd>
   <dt>Their heating</dt><dd>${esc(b.sink.lab)}: heat pump COP ${b.cop[0].toFixed(1)}–${b.cop[1].toFixed(1)}${b60?`. If they ran ${esc(b60.sink.lab)}: <span class="k">${sm(b60.mid.lcoh)} per MWh</span>`:''}</dd>
   <dt>Cost per MWh of heat</dt><dd><span class="k">${sm(b.mid.lcoh)}</span> (${sm(b.lo.lcoh)}–${sm(b.hi.lcoh)}) against ${sm(b.v)} worth; ${pays?'it costs less than the heat is worth in the middle case':`a gap of ${sm(b.mid.lcoh-b.v)}`}</dd>
   <dt>If the rules change</dt><dd>${(()=>{ const keepR=ECON.rate, keepF=ECON.hpFLH; const alt=(r,fl)=>{ ECON.rate=r; if(fl) ECON.hpFLH=fl; const x=scen(f,b.G,b.cop,b.offer); ECON.rate=keepR; ECON.hpFLH=keepF; return x?Math.round(x.mid.lcoh):'—'; }; const ff=ECON.hpFLHfull[f.city]||ECON.hpFLHfull.van;
      return `$${alt(0.03)} at 3% and $${alt(0.08)} at 8% cost of capital; $${alt(keepR,ff)} if the heat pump also covers the coldest hours (the buildings give up their boilers)`; })()}</dd>
   <dt>Years to pay back</dt><dd>${isFinite(b.mid.pay)?`about ${yrs(b.mid.pay)} (${yrs(b.lo.pay)} to ${yrs(b.hi.pay)})`:isFinite(b.lo.pay)?`never in the middle case; ${yrs(b.lo.pay)} at best`:'never: the heat pump\'s electricity and upkeep cost more than the gas the heat replaces'}</dd></dl>${sizeTxt?`<p class="sub">${sizeTxt}</p>`:''}
   <h3>What it costs elsewhere</h3><ul class="lim"><li>Plumbing to every server; the rest of the heat still leaves by air</li><li>A heat pump of about ${b.mid.mw.toFixed(1)} MW in the plant room (about 100 m² per MW at 1 MW, 50 at 3 MW: Danish Energy Agency)</li><li>${fmt(Math.round(b.len/10)*10)} m of trench in the street: months of digging</li><li>About ${fmt(Math.round(b.elec/10)*10)} MWh a year more electricity for the heat pump</li><li>One contract per building; if the data centre leaves, every building falls back on its own heating</li></ul>
   <p class="sub">With radiant floor heating (45 °C supply or lower) liquid-cooled heat could be used with little or no heat pump for much of the year: NREL's ESIF heats its own offices and labs this way (it needs at least 35 °C on the coldest day). Which buildings nearby heat this way is not known.</p>
   <p class="src">Not searched yet: feeding an existing network, air cooling (its heat is not sourced), heat storage. How it works: heat pump COP by the Lorenz method (η 0.40–0.50, calibrated at Odense) from the servers' water to the building's heating; shared trench dug once; a pipe carrying several buildings' heat is sized up (diameter ∝ √heat) and priced by Persson &amp; Werner; one connection per building; one heat pump, cheaper per MW when larger (Danish Energy Agency); ${(ECON.rate*100).toFixed(1)}% real over ${ECON.life.pipe} and ${ECON.life.hp} years. The heat each building is offered is not reduced for the warmer source.</p>`;
  return BD.sec('h-best','Best set-up found for heat',ans,body,{finding:true}); }

async function heatIndex(){
  await opps(); const e=E(), f=e.siteFacts(), A=BD.S.answers, mw=A.mw||(f.M&&f.M.mwSized)||1; BD.S.view2='tab';
  const d=await e.loadRecv(f.city), nets=e.netsAt(f,d); await routeTree(f);
  const all=d.pts.map(p=>Object.assign({},p,{dist:Math.hypot(p.x-f.c[0],p.y-f.c[1])})).filter(p=>p.dist<=REACH).sort((a,b)=>a.dist-b.dist);
  const r=e.calc({mw,recover:true,to:'near'},f,all,nets);
  all.forEach(p=>{ p.econ=heatEcon(f,p,r.avail); p.beyond=p.econ.status==='beyond'; p.diff=difficulty(f,p,nets); });
  const showB=A.showBeyond===true; const inside=nets.find(n=>n.inside);
  const nB=all.filter(p=>p.beyond).length, nW=all.filter(p=>p.econ.status==='within').length;
  // 16 Oct (J.B.): answer first; every part closed but showing its answer
  const R0=e.R, gv=ECON.heatVal(f.city), pe0=ECON.elec[f.city], netB=gv-pe0/R0.cop[1];
  const bl=f.city==='edm'?nets.find(n=>/Blatchford/.test(n.n)):null;
  const nearNet=inside||nets.slice().sort((x,y)=>x.edge-y.edge)[0];
  const nDep=all.filter(p=>p.econ.status==='depends').length;
  // verification sweep 17 Oct (C4): count only buildings with a known heat demand; say how many have none yet
  const unk=all.filter(p=>p.econ.status==='unknown'), nK=all.length-unk.length;
  const PL1={housing:['non-market housing building','non-market housing buildings'],school:['school','schools'],campus:['campus','campuses'],care:['care home','care homes'],hospital:['hospital','hospitals'],rec:['recreation centre','recreation centres'],hall:['community league hall','community league halls'],pool:['pool','pools'],arena:['arena','arenas'],apartment:['apartment building','apartment buildings'],office:['office building','office buildings'],hotel:['hotel','hotels'],commercial:['commercial building','commercial buildings']};
  const unkTxt=unk.length?` ${unk.length} more (${[...new Set(unk.map(p=>p.t))].map(t=>{ const n=unk.filter(p=>p.t===t).length; return n+' '+(PL1[t]||[t,t])[n===1?0:1]; }).join(', ')}) have no demand figure yet.`:'';
  const lead=netB<=0?`At ${f.city==='edm'?'Alberta':'BC'} prices <span class="k">no route pays back at any distance</span>.${bl?` Blatchford's low-temperature loop, ${bl.inside?'around this lot':fmt(bl.edge)+' m away'}, is <span class="k">the exception to look at</span>.`:''}`
    :(()=>{ // J.B., 19 Oct: no 5-year line; say how close it is, what is counted, and what would change it
      const life=`over the pipe's ${ECON.life.pipe}-year life`;
      const kn=all.filter(p=>p.econ.status!=='unknown'&&isFinite(p.econ.payMid)).sort((a,b)=>a.econ.payMid-b.econ.payMid), c=kn[0];
      const yrs=x=>x>50?'more than 50':String(Math.round(x));
      const best=c?`Closest to paying back: <span class="k">a ${esc((PL1[c.t]||[c.t])[0])} ${fmt(Math.round(c.econ.route/10)*10)} m away by street, about ${yrs(c.econ.payMid)} years</span>${c.econ.payMid<=50?` (${yrs(c.econ.payback[0])} to ${isFinite(c.econ.payback[1])?yrs(c.econ.payback[1]):'never'}, by cost and efficiency)`:''}.`:'';
      const head=nW?`<span class="k">${nW} of ${nK} buildings</span> with a known heat demand within 3 km cost less to connect than their heat is worth ${life}.${nDep?` ${nDep} more ${nDep===1?'depends':'depend'} on the costs.`:''}`
        :`None of the ${nK} buildings with a known heat demand within 3 km costs less to connect than its heat is worth ${life}${nDep?`; ${nDep} ${nDep===1?'depends':'depend'} on the costs`:''}.`;
      return `${head} ${best}${nW?'':' What would bring it closer: higher gas prices, a cheaper pipe route, a pipe already in the street, or a cheaper heat pump.'}${unkTxt}${inside?` The lot is inside the ${inside.n.replace(/ \(.*/,'')}.`:''}`; })();
  const counted=netB<=0?'':`<p class="sub">Counted: the pipe, the connection, a heat pump and its upkeep, at today's energy prices. Not counted: inflation, demand charges, and who pays. Buildings searched to 3 km in a straight line, a limit on street routing, not a rule: the cost of each pipe decides (the Dutch 1.5 km reach, RVO 2018, is no longer used; J.B., 19 Oct 2026).</p>`;
  const PL={housing:['non-market housing building','non-market housing buildings'],school:['school','schools'],campus:['campus','campuses'],care:['care home','care homes'],hospital:['hospital','hospitals'],rec:['recreation centre','recreation centres'],hall:['community league hall','community league halls'],pool:['pool','pools'],arena:['arena','arenas'],apartment:['apartment building','apartment buildings'],office:['office building','office buildings'],hotel:['hotel','hotels'],commercial:['commercial building','commercial buildings']};
  const kinds=[...new Set(all.map(p=>p.t))].map(t=>{ const n=all.filter(p=>p.t===t).length; return `${n} ${(PL[t]||[t,t])[n===1?0:1]}`; }).join(', ');
  const recvAns=[kinds||'none found',nW?`${nW} cost less than the heat is worth`:'none costs less than the heat is worth',nDep?`${nDep} depend on the costs`:'',nB?`${nB} cost more`:''].filter(Boolean).join('; ');
  const Bcur=bestHeat(f,all,r.avail[0]); let Bmax=null; const mwMax=f.mw?f.mw[1]:mw; if(mwMax>mw*1.05){ const rM=e.calc({mw:mwMax,recover:true,to:'near'},f,all,nets); const allM=all.map(p=>Object.assign({},p,{econ:heatEcon(f,p,rM.avail)})); Bmax=bestHeat(f,allM,rM.avail[0]); }
  const baseBest=all.filter(p=>p.econ.lcohMid).reduce((m,p)=>Math.min(m,p.econ.lcohMid),Infinity);
  let h=e.tabBar('heat')+`<h2>Who could take the heat</h2><p class="lead">${lead}</p>${counted}`+bestSec(f,Bcur,isFinite(baseBest)?baseBest:null,mw,mwMax,Bmax)
  +BD.sec('h-offer','Heat this size could offer',`${e.rng(r.avail[0]/1000,r.avail[1]/1000,'GWh a year')} with liquid cooling and a heat pump; with air cooling, heat pumps on the chilled-water loop could reuse some of it, but how much is not yet known`,
     `<div class="hfig"><div><b>${e.rng(r.avail[0]/1000,r.avail[1]/1000,'GWh/yr')}</b><span>heat this size could offer (liquid-cooled, heat pump)</span></div><div><b>${e.rng(r.homes[0],r.homes[1],'')}</b><span>homes' heating, as an equal (provincial average)</span></div></div><p class="sub"><a href="#" id="hmath">How the heat figure is worked out ›</a></p>`)
  +BD.sec('h-price','What the heat is worth here',netB<=0?'less than nothing: the heat pump costs more to run than the gas it replaces':(()=>{ const w=gv-pe0/R0.cop[0], b=gv-pe0/R0.cop[1]; return w<0?`−$${(-w).toFixed(1)} (COP 3.0) to $${b.toFixed(1)} (COP 4.5) per MWh after the heat pump`:`$${w.toFixed(1)}–${b.toFixed(1)} per MWh after the heat pump`; })(),
     `\n  ${(()=>{ const R=e.R, g=ECON.gas[f.city], v=ECON.heatVal(f.city), pe=ECON.elec[f.city], nb=v-pe/R.cop[1], nw=v-pe/R.cop[0]; return `<p class="sub">${draft(nb<=0?`At ${f.city==='van'?'BC':'Alberta'} prices (gas $${(g/3.6).toFixed(2)}/GJ, burnt in an 85% boiler, power $${pe.toFixed(2)}/MWh) the heat pump's electricity costs more than the gas the heat would replace ($${nw.toFixed(1)} to $${nb.toFixed(1)} per MWh of heat), so no route pays back at any distance. Each card says what would have to change.`:`At ${f.city==='van'?'BC':'Alberta'} prices (gas $${(g/3.6).toFixed(2)}/GJ, burnt in an 85% boiler, power $${pe.toFixed(2)}/MWh) the heat is worth ${nw<0?`−$${(-nw).toFixed(1)} (COP 3.0: the heat pump\'s electricity costs more than the gas) to $${nb.toFixed(1)} (COP 4.5)`:`$${nw.toFixed(1)}–${nb.toFixed(1)}`} per MWh after the heat pump; each card works out its own break-even distance.`)}</p>`; })()}
  <p class="sub"><a href="#" id="carriers">How far is too far, for each thing it could share ›</a></p>`,{finding:netB<=0})
  +BD.sec('h-cmp','Compared with other data centres','the same servers, conventional here, at two real data centres and on both worked-example lots','<div id="cmpSlot"></div>')
  +BD.sec('h-nets','Heat networks nearby',nearNet?(inside?`inside the ${esc(inside.n.replace(/ \(.*/,''))}`:`nearest: ${esc(nearNet.n.replace(/ \(.*/,''))}, ${fmt(nearNet.edge)} m`):'none within 1.2 km',
     `\n  ${inside?`<p class="sub"><b style="font-weight:400">${esc(inside.n)}</b> — this lot is inside its service area${inside.src==='van9552'?': heat sent back is credited (By-law 9552)':inside.kind==='planned'?' — a planned area, not yet built (approximate)':' (approximate; connection terms not yet read)'}. <a href="#" data-net="1">Explore ›</a></p>`:nets.length?`<p class="sub">${esc(nets[0].n)} is ${Math.round(nets[0].edge)} m from this lot. <a href="#" data-net="1">Explore ›</a></p>`:''}
  ${f.city==='edm'?`<p class="sub">${draft('Downtown District Energy is drawn from the City\'s phases map (May 2025), approximate.')} Downtown District Energy: Phase 1 serves the Winspear Centre, Century Place and Chancery Hall; Phase 1A would add City Hall, the Citadel Theatre and the Stanley A. Milner Library (2025–26 rate filing); later phases are shown only as a building map (business case, Figure 2). Blatchford: connection is compulsory inside its service area (Bylaw C17943 s. 6); the map (Schedule A) is not yet traced.</p>`:''}
  ${otherNets(f.city)}
  ${f.city==='van'?`<p class="sub">City policy: the Energy Centre Guidelines (2012) name waste heat — from commercial and industrial operations and sewage lines — as the generally preferred low-carbon source for neighbourhood energy (RTS 9772, Appendix A, 4.1). A guideline, not a requirement to buy it.</p>`:''}
  `)
  +(bl?BD.sec('h-loop','An ambient loop: Blatchford',`${bl.inside?'around this lot':fmt(bl.edge)+' m away'}; server heat could go in without a heat pump. Size, price and permission are open questions`,`\n  ${(()=>{ const bl=f.city==='edm'&&nets.find(n=>/Blatchford/.test(n.n)); if(!bl) return ''; const R=e.R, itG=mw*8760*R.lf/1000;
    // ambient loop (J.B., 16 Oct: "yes u can model it"): sources blatchfordDG2025, blatchfordSHX2026, blatchfordBP2021; hours from the Edmonton CWEC file (computed)
    return `<p class="sub">${draft(`Blatchford, ${bl.inside?'this lot is inside its service area':fmt(bl.edge)+' m away'}. A City-owned network for the Blatchford neighbourhood (planned for up to 30,000 people). Its pipes carry water at only 8–32 °C; every building has its own heat pump and draws heat from the loop. Today the loop is fed by 570 boreholes 150 m deep; sewer heat is in design.`)}</p>
    <dl><dt>What the data centre could put in</dt><dd>up to ${itG.toFixed(1)} GWh a year of server heat through a heat exchanger, with no heat pump at the data centre: even air-cooled heat (25–35 °C) is warmer than the loop</dd>
    <dt>When it is wanted</dt><dd>Edmonton is below 12–18 °C in 75–89% of the hours of a typical year; June to August carry only 6.5% of the year's heating need, so summer heat still goes to the data centre's own coolers, which keep their full size (CWEC, computed)</dd>
    <dt>Scale</dt><dd>no actual figures have been published for 2024–2026; the latest public numbers are forecasts made in 2021 and 2023. Small so far: 181 customers forecast for 2024 and 292 for 2025 (Utility Advisor, 2023), over 100 homes connected (operator, 2025); the 2021 plan forecast 3,031 MWh delivered in total from 2020 to 2024 (to check against the original), about ${Math.max(1,Math.round(3031/(itG*1000)*100))}% of one year of this data centre's heat. Demand grows as the neighbourhood builds out</dd>
    <dt>Money</dt><dd>customers pay $0.0358 per kWh for loop energy in 2025–26 (frozen by Council), plus fixed charges; no price is published for heat supplied into the loop. The utility ran a forecast revenue shortfall of $1.3 million for 2024. On the data-centre side, no heat pump to buy or run</dd>
    <dt>Summer</dt><dd>the utility says it already sends surplus summer heat into the borefield for winter (operator statement, no measured data); how much more it could take is not known</dd><dt>A built case</dt><dd>FGZ Friesenberg, Zürich (2014): a data centre feeds an 8–28 °C network through a heat exchanger, with boreholes as seasonal storage; the warm pipe reaches about 30 °C in summer after the data centre (Buffa et al. 2019, peer-reviewed; the 27 GWh a year is from a factsheet, not stated as measured)</dd><dt>Not yet known</dt><dd>whether the utility takes heat from an outside source (nothing in the bylaw, plans or the City's 2024 district energy report mentions it); how much the loop can take in winter</dd></dl>
    <p class="src">City of Edmonton DESS design guide v8 (2025); Bylaw 17943 and 2026 rates; Utility Advisor 2023; 2021–2024 business plan; Buffa et al. 2019; Edmonton CWEC typical year. Research-agent reads, to check. The design guide's 8 °C winter supply and 4 °C return do not match its own 5 °C design difference; both are shown as written.</p>`; })()}
  `,{finding:true}):'')
  +BD.sec('h-recv','Buildings that could take it',recvAns,
     `<label class="tgl"><input type="checkbox" id="showB" ${showB?'checked':''}> List buildings that cost more than the heat is worth too (greyed)</label>${groupRows(all,showB)}`);
  $('#side').innerHTML=h; e.wireTabs(); BD.draw();
  $('#showB').onchange=ev=>{ A.showBeyond=ev.target.checked; heatIndex(); };
  document.querySelectorAll('#side [data-rid]').forEach(a=>a.onclick=ev=>{ if(ev.target.closest&&ev.target.closest('a')&&!ev.target.closest('a').dataset.rid) return; ev.preventDefault(); openConnection('heat',+a.dataset.rid); });
  const nb=document.querySelector('#side [data-net]'); if(nb) nb.onclick=ev=>{ ev.preventDefault(); netCard(f,nets); };
  $('#hmath').onclick=ev=>{ ev.preventDefault(); heatMathCard(f,r); };
  $('#carriers').onclick=ev=>{ ev.preventDefault(); carriersCard(f); };
  const shown=all.filter(p=>showB||!p.beyond); BD._heat={f,all:shown,nets};
  e.show3d('heat',{site:f,all:shown,nets,lim:30});
}

// the range on provincial-average estimates for big buildings (J.B. 20 Oct 2026)
function loNote(p){ return p.lo&&!p.meas?`. Shown as a range: checked against 238 Vancouver buildings whose owners report measured heat use, estimates like this were typically ${(p.dem/p.lo).toFixed(1)}× the measured figure (a quarter under 1.0×, a quarter over 3.2×), so the low end is the estimate ÷ ${(p.dem/p.lo).toFixed(1)}${p.fa?'; the check could only be made in Vancouver, as Edmonton publishes no measured building heat':''}`:''; }
/* ---------- a connection card ---------- */
async function openConnection(kind,id){ await opps(); const H=BD._heat; if(!H) return; const p=H.all.find(x=>x.id===id); if(!p) return; const f=H.f, e=E(), R=e.R, x=p.econ, A=BD.S.answers;
  const mw=A.mw||(f.M&&f.M.mwSized)||1, r=e.calc({mw,recover:true,to:'near'},f,[p],H.nets); const city=f.city;
  const L=OPPS.opportunities['New district with the data centre as heat plant']||OPPS.opportunities['District heat to a network']||{};
  const who=A.payer||'operator';
  const share=x.demand?[x.demandLo/r.avail[1],x.demand/r.avail[0]]:null; // share of the heat offered (low offer → higher share); above 100% means it would take all of it
  const shareTxt=share?(share[0]>=1?'more than all the heat offered':share[1]>=1?`${Math.round(share[0]*100)}% to all of what is offered`:`${Math.round(share[0]*100)}–${Math.round(share[1]*100)}% of what is offered`):'';
  const ce=(CEUD[city]||{})[p.t];
  let h=`<div class="kind">Heat · connection</div><h2>${esc(p.n||TYPE[p.t])}</h2><p class="sub">${esc(TYPE[p.t])}${p.u?' · '+p.u+' homes':''}${p.aka?' · also listed as '+esc(p.aka.join('; ')):''} · ${fmt(p.dist)} m away, about ${fmt(x.route)} m ${p._route?(f.city==='van'?'along the streets and lanes (City street and lane centrelines)':'along the streets and alleys (City road network)'):'along the street grid (an estimate: an L, because no street route was found)'}</p>
  <p>${stPill(x.status)} <span class="cls" style="border-color:${DCOL[p.diff.k]};color:${DCOL[p.diff.k]}">${esc(p.diff.t)}</span> ${L.readiness?rdPill(L.readiness):''}</p>
  <h3>What the exchange is</h3><p class="sub">${draft(`Heat the servers give off — about 25–35 °C if air-cooled, warmer if liquid-cooled — lifted by a heat pump at the data centre and piped to this building's heating.`)}</p>
  <h3>The numbers</h3><dl><dt>Heat offered</dt><dd>${e.rng(r.avail[0]/1000,r.avail[1]/1000,'GWh/yr')} at ${mw} MW (liquid-cooled, heat pump)</dd>
  <dt>This building takes</dt><dd>${x.demand?`${x.demandLo<x.demand?`${fmt(x.demandLo)}–${fmt(x.demand)}`:`about ${fmt(x.demand)}`} MWh/yr of heat: ${x.demandLo<x.demand?`${fmt(p.lo)}–${fmt(x.use)}`:fmt(x.use)} MWh of energy bought for heating × 0.85, the gas boiler it replaces (${p.dem?(p.meas?`owner-reported: ${fmt(p.fa)} m² × its reported heat energy intensity, City of Vancouver reporting map, 2025 (${esc(p.use||'')})`:!p.fa?`estimate from BC Assessment 2026 (its homes and floor area, not shown under the data licence) × BC averages: 16.81 MWh a home, CEUD 2023 intensities for other floor area${loNote(p)}`:`estimate: ${fmt(p.fa)} m² of gross area (City of Edmonton assessment 2026, ${p.t==='apartment'?'Other Residential: four or more homes':'Commercial'}) × ${p.t==='apartment'?'0.777':'1.40'} GJ/m² for space and water heating (Alberta average, CEUD 2023)${loNote(p)}`):p.t==='housing'&&p.u?`${p.u} homes × ${R.homeMWh[city]} MWh, provincial average for space and hot water`:`${fmt(p.fa)} m² of floor × ${ce?ce[0]:'?'} GJ/m² (${ce?ce[1]:''}, provincial average) ÷ 3.6`}) — ${shareTxt}`:`${draft('not yet known')} — ${noDemand(p)||'its yearly heat demand is not published'}`}</dd>
  <dt>Value of the gas it replaces</dt><dd>gas at $${(ECON.gas[city]/3.6).toFixed(2)}/GJ (${city==='van'?'FortisBC Rate 3, all per-GJ charges, cost of gas averaged':'ATCO delivery plus Alberta\'s regulated rate averaged'} over Nov 2025 – Oct 2026) burnt in an 85% boiler = $${x.v.toFixed(1)} per MWh of heat</dd>
  <dt>Heat-pump electricity</dt><dd>$${x.pe.toFixed(2)}/MWh ÷ COP 3.0–4.5 = $${(x.pe/4.5).toFixed(1)}–${(x.pe/3).toFixed(1)} per MWh of heat</dd>
  <dt>Left over per MWh</dt><dd>${x.net[0]<0&&x.net[1]<0?draft(`negative: $${x.net[0].toFixed(1)} to $${x.net[1].toFixed(1)} — at these prices the heat pump's electricity costs more than the gas the heat replaces`):`${x.net[0]<0?'−$'+(-x.net[0]).toFixed(1)+' (COP 3.0)':'$'+x.net[0].toFixed(1)} to $${x.net[1].toFixed(1)}`}</dd></dl>
  ${e.mathBox([p._route?`Route: shortest path along the City's ${f.city==='van'?'street centrelines':'road network (streets and alleys)'} from the street nearest the site to the street nearest the building = <b>${fmt(x.route)} m</b>.`:`Route: |Δx| + |Δy| = <b>${fmt(x.route)} m</b> (an L along the street grid; street centrelines not loaded for this city).`,
     x.demand?(p.dem?`Demand: ${p.meas?`reported ${fmt(p.fa)} m² × reported heat intensity ÷ 3.6`:!p.fa?'BC Assessment homes × 16.81 MWh + other floor area × CEUD 2023 BC intensity (worked out on the researcher\'s computer; inputs not shown under the data licence)':`${fmt(p.fa)} m² × ${p.t==='apartment'?'0.777':'1.40'} GJ/m² ÷ 3.6`} = <b>${fmt(x.use)} MWh/yr</b> of energy bought${p.lo&&!p.meas?`; low end ÷ ${(x.use/p.lo).toFixed(1)} = <b>${fmt(p.lo)} MWh/yr</b> (the check against measured buildings)`:''}.`:p.t==='housing'?`Demand: ${p.u} homes × ${R.homeMWh[city]} MWh = <b>${fmt(x.use)} MWh/yr</b> of energy bought.`:`Demand (estimate): about ${fmt(p.fa)} m² of floor on its parcel (${p.fm} building${p.fm>1?'s':''}, footprint × storeys at 4 m, from the tool's building heights, at its tallest point, so an upper estimate where a building steps down) × ${(CEUD[city][p.t][0]/3.6).toFixed(3)} MWh/m² for space and water heating (${city==='van'?'BC':'Alberta'} ${CEUD[city][p.t][1]}, NRCan CEUD 2023) = <b>${fmt(x.use)} MWh/yr</b> of energy bought. A building's real use can be far from the provincial average.`):(ceudLine(city,p.t,p)||'Demand: not published for this building.'),
     `Net value: $${x.v.toFixed(1)}/MWh of gas − $${x.pe}/MWh ÷ COP (4.5 to 3.0) = <b>${sm(x.net[1])} to ${sm(x.net[0])}</b> per MWh.`,
     x.demand?`Heat it takes: ${x.demandLo<x.demand?fmt(p.lo)+'–':''}${fmt(x.use)} MWh × 0.85 (the gas boiler's efficiency; demand figures count energy bought, not heat delivered) = <b>${x.demandLo<x.demand?fmt(x.demandLo)+'–':''}${fmt(x.demand)} MWh/yr</b>.`:'',
     x.demand&&x.capped?`Heat it can buy: the smaller of its demand and the heat offered = ${fmt(x.take[0])}–${fmt(x.take[1])} MWh/yr.`:'',
     `Pipe and connection: $${fmt(ECON.fixed)} + ${fmt(x.route)} m × $${fmt(ECON.pipe[0])}–${fmt(ECON.pipe[1])}/m = <b>$${fmt(x.pipeCost[0])}–${fmt(x.pipeCost[1])}</b>.`,
     x.demand?`Heat pump: sized from the heat sold, ${fmt(x.take[1])} MWh ÷ ${fmt(ECON.hpFLH[1])}–${fmt(ECON.hpFLH[0])} hours a year at full output = ${x.hpMW[0].toFixed(2)}–${x.hpMW[1].toFixed(2)} MW; × about €${(ECON.hpCapex[0][1]/1e6).toFixed(2)}–${(ECON.hpCapex[1][1]/1e6).toFixed(2)} M per MW (smaller units cost more per MW) = <b>$${fmt(x.hp[0])}–${fmt(x.hp[1])}</b>.`:'',
     x.demand?`Upkeep: €${fmt(ECON.hpOMfix)} per MW a year + €${ECON.hpOMvar} per MWh, electricity excluded = <b>$${fmt(x.om[0])}–${fmt(x.om[1])} a year</b>.`:'',
     x.demand?`Money left each year: heat sold × what each MWh is worth after the heat pump's electricity − upkeep = <b>${sm(x.yr[1],0)} to ${sm(x.yr[0],0)}</b>.`:'',
     x.demand?`Years to pay back (simple, no interest): (pipe + connection + heat pump) ÷ money left each year = <b>${isFinite(x.payback[0])?x.payback[0].toFixed(1):'never'} to ${isFinite(x.payback[1])?x.payback[1].toFixed(1):'never'}</b>; middle case ${isFinite(x.payMid)?x.payMid.toFixed(1):'never'}. The range pairs the cheap pipe, efficient heat pump and long running hours against the costly pipe, less efficient heat pump and short running hours.`:'',
     x.demand?`Over the parts' life: pipe ${ECON.life.pipe} years, heat pump ${ECON.life.hp}, at ${(ECON.rate*100).toFixed(1)}% a year real (a BC regulated utility's cost of capital). Cost per MWh of heat = (pipe × ${x.crf[0].toFixed(3)} + heat pump × ${x.crf[1].toFixed(3)} + upkeep) ÷ heat sold + electricity ÷ COP = <b>$${x.lcoh[0].toFixed(0)}–${x.lcoh[1].toFixed(0)}</b> (middle $${x.lcohMid.toFixed(0)}), against <b>$${x.v.toFixed(0)}</b> the heat is worth.`:'',
     x.demand?`Break-even route length over the pipe's life: <b>${x.be[0]>0?fmt(x.be[0])+' m':'none'}</b> best case, <b>${x.be[1]>0?fmt(x.be[1])+' m':'none'}</b> worst case.`:''].filter(Boolean),
     'Heat pump capital and upkeep: Danish Energy Agency technology data, sheet 40 (Aug 2026, 2025 €); running hours: Odense, Mäntsälä and STACK Oslo (claim). Pipe life: EN 253:2019, 30 years at 120 °C (as quoted in Energiforsk 2022:872). Cost of capital: Squamish NEU feasibility study (Compass, FVB, 2010), 5.6% real. Pipe: Persson et al. 2019 (average, 2015 €) and npro (paved urban), DN100, converted at the Bank of Canada 2025 averages (€1 = $1.5782; US$1 = $1.3978), no inflation adjustment. Connection: City of Vancouver NEU connection levy 2026, By-law 9552 Sch. C (fixed part $123,873; $146/kW of peak not included), used as a stand-in for the cost of connecting a building'+(f.city==='edm'?' — no Edmonton connection charge is published, so Vancouver\'s is used for scale':'')+'. Gas: FortisBC Rate 3 (checked 18 Oct 2026) / ATCO 2026 and the Utilities Consumer Advocate. Electricity: BC Hydro tariff 2026 / AESO 2025 pool price plus EPCOR\'s per-kWh transmission and operating-reserve charges (2026 interim rates, to check); demand charges excluded in both cities.')}
  <h3>Payback and distance</h3>${chart(x)}
  ${x.status==='beyond'&&x.close?`<p class="sub">${draft('What would close the gap:')} ${x.close.map(esc).join('; ')}.</p>`:''}
  ${x.payback&&isFinite(x.payMid)?`<p class="sub">Years to pay back, counting the pipe, the connection, a heat pump and its upkeep: about ${x.payMid.toFixed(0)} (${x.payback[0].toFixed(0)} to ${isFinite(x.payback[1])?x.payback[1].toFixed(0):'never'}). Simple payback: no interest, today's prices. The pipe is designed to last ${ECON.life.pipe} years, the heat pump ${ECON.life.hp}.</p>`:''}
  ${x.alt?`<p class="sub">Cost per MWh over the parts' life, middle case: <span class="k">$${x.lcohMid.toFixed(0)}</span> at ${(ECON.rate*100).toFixed(1)}% (one BC utility study); $${x.alt.r3.toFixed(0)} at 3% and $${x.alt.r8.toFixed(0)} at 8%. If the heat pump also covers the coldest hours (the building gives up its boiler; ${fmt(x.alt.ff[0])}–${fmt(x.alt.ff[1])} full-load hours from this city's weather): $${x.alt.full.toFixed(0)}. Worth $${x.v.toFixed(0)}.</p>`:''}
  <h3>What has to be built</h3><dl><dt>Pipe in the street</dt><dd>${H.nets.some(n=>BD.pip(p.x,p.y,n.r))?'this building is inside a district-energy service area: a network exists nearby, a branch is still needed':'no heat pipe known here — a new supply and return pair along the streets'}</dd>
  <dt>At the data centre</dt><dd>heat pump and pumps in the plant room: the unit alone is about 3.4 m² per MW of heat (manufacturer claim); a whole waste-heat heat-pump plant takes about 100 m² per MW at 1 MW, 50 at 3 MW and 30 at 10 MW (Danish Energy Agency technology catalogue, sheet 40)</dd>${p.de?`<dt>Its heating plant</dt><dd>${esc(p.de)}</dd>`:''}<dt>At the building</dt><dd>an energy transfer station: a room about 6 × 3 m in a building under 13,940 m² (City of Vancouver NEU guidelines)</dd>
  <dt>How hard to connect</dt><dd><span class="cls" style="border-color:${DCOL[p.diff.k]};color:${DCOL[p.diff.k]}">${esc(p.diff.t)}</span> ${esc(p.diff.why)}</dd></dl>
  <h3>Building it</h3><dl><dt>Cost</dt><dd>$${fmt(x.cost[0])}–${fmt(x.cost[1])} (pipe in a paved street, DN100 pair, the connection${x.hp?" and the heat pump":""}; a pipe check: Cambridge MA plans $${fmt(ECON.pipeCheck)}/m)</dd>
  <dt>Time</dt><dd>for scale: the NEU's Quebec St extension, about three blocks, ran from 19 May to an expected fall finish in 2020 (City of Vancouver memo)</dd>
  <dt>Disruption</dt><dd>a trench in the street under a street-use permit; lanes closed block by block${(()=>{ const rp=routePath(p); if(!rp) return ''; const c=Object.entries(rp.cls).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${fmt(v)} m ${k.toLowerCase()}`).join(', '); return c?`. Along this route: ${c} (City ${f.city==='van'?'street use':'functional'} classes)`:''; })()}</dd><dt>Embodied carbon</dt><dd>about ${fmt(x.co2)} t CO₂e for the pipe pair (EPD, pipe only; trench excluded)</dd>
  <dt>Who pays</dt><dd><div class="scn" id="payer">${[['operator','The data centre'],['receiver','The receiver'],['utility','The city or a utility']].map(([k,t])=>`<button data-v="${k}" aria-pressed="${who===k}">${t}</button>`).join('')}</div><span class="sub">${{operator:'The operator builds and owns the pipe and recovers it through the heat price; if the tenant leaves, the pipe may sit idle.',receiver:'The receiver pays to connect and owns the branch; it carries the risk if the data centre stops sending heat.',utility:'A city utility builds and owns the pipe as part of a network and can find other sources if the data centre leaves (the NEU model).'}[who]}</span></dd>
  <dt>After the tenant leaves</dt><dd>the pipe and the grid connection stay with the land; the receiver falls back on its own heating at full peak (four futures)</dd></dl>
  <h3>Rules</h3>${ladder(L)}
  <h3>Who gains, who gives up</h3><dl><dt>The receiver</dt><dd>${x.net[1]>0?'heat at a lower energy cost than its gas, if it can take low-temperature heat':'little, at these prices'}; gives up some control over its heat supply</dd><dt>The operator</dt><dd>a heat price or credit; gives up plant room and takes on a heat contract</dd><dt>The grid</dt><dd>${e.rng(r.hp[0]/1000,r.hp[1]/1000,'GWh/yr')} more electricity for the heat pump</dd><dt>The climate</dt><dd>per MWh of heat: about ${CO2H.gas} kg CO₂e from its gas boiler, against ${CO2H.hp(city)[0]}–${CO2H.hp(city)[1]} kg from the heat pump's electricity (${R.grid[city]} g/kWh, provincial average; the data centre's own cooling not counted). For this size: ${e.rng(r.co2[0],r.co2[1],'t CO₂e/yr')} from the heat pump</dd><dt>The street</dt><dd>months of trenching</dd></dl>
  <h3>Conditions</h3><ul class="lim"><li>${draft('The receiver\'s monthly demand: most heat is needed in winter (about '+R.monthRatio[city].toFixed(1)+' : 1 between the busiest and quietest month).')}</li><li>${draft('Its heating system and supply temperature.')}</li><li>${draft('A heat contract longer than the server refresh; heat contracts in Stockholm are reported as 10-year call-off contracts.')}</li><li>${draft('If the receiver leaves, all heat goes back to the dry coolers — they keep their full size.')}</li></ul>
  <h3>How proven</h3><p class="sub">${L.readiness?rdPill(L.readiness)+' ':''}${esc(L.basis||'')}</p>
  <h3>Sources</h3>${srcList(ECON.src.concat(L.sources||[]))}
  <div class="draftnote">Ranges, not a design or a quote.</div>`;
  BD.drawer.open(h,el=>{ el.querySelectorAll('#payer button').forEach(b=>b.onclick=()=>{ A.payer=b.dataset.v; openConnection(kind,id); }); });
  const rp=routePath(p); E().show3d('heat',{site:f,all:H.all,nets:H.nets,lim:30,selected:id,route:rp?rp.pts:null});
}
BD.openConnection=openConnection;
function ladder(L){ const rows=[]; (L.rules||[]).forEach(x=>rows.push(x)); if(!rows.length) return '<p class="sub">Not yet read for this connection.</p>';
  return `<table class="cl">${rows.map(x=>`<tr><td>${esc(x.rung)}</td><td>Vancouver ${rsPill(x.van[0])}<small>${esc(x.van[1]||'')}</small>Edmonton ${rsPill(x.edm[0])}<small>${esc(x.edm[1]||'')}</small></td></tr>`).join('')}</table>`; }
/* the distance chart: cost to connect rises with route length; what the heat can pay for over the pipe's life (after the heat pump) is flat; where they cross is break-even */
function chart(x){ const W=380,Hh=190,ml=48,mr=10,mt=10,mb=30, D=3200; const vmax=Math.max(x.cost[1]*1.1,ECON.fixed+D*ECON.pipe[1]*0.6,x.val?Math.max(...x.val)*1.2:0);
  const X=d=>ml+d/D*(W-ml-mr), Y=v=>Hh-mb-Math.max(0,v)/vmax*(Hh-mt-mb);
  let g=`<svg viewBox="0 0 ${W} ${Hh}" role="img" aria-label="Cost to connect against distance, with what the heat can pay for over the pipe's life">`;
  [0,800,1600,2400,3200].forEach(d=>{ g+=`<line x1="${X(d)}" x2="${X(d)}" y1="${mt}" y2="${Hh-mb}" stroke="var(--line)"/><text x="${X(d)}" y="${Hh-mb+14}" fill="var(--faint)" font-size="10" text-anchor="middle">${d} m</text>`; });
  [0.5,1].forEach(k=>{ const v=vmax*k; g+=`<text x="${ml-4}" y="${Y(v)+3}" fill="var(--faint)" font-size="10" text-anchor="end">$${(v/1e6).toFixed(1)}M</text>`; });
  g+=`<path d="M${X(0)},${Y(ECON.fixed)} L${X(D)},${Y(ECON.fixed+D*ECON.pipe[0])} L${X(D)},${Y(ECON.fixed+D*ECON.pipe[1])} Z" fill="var(--fg)" opacity=".10"/>`;
  g+=`<line x1="${X(0)}" y1="${Y(ECON.fixed)}" x2="${X(D)}" y2="${Y(ECON.fixed+D*ECON.pipe[1])}" stroke="var(--muted)"/><line x1="${X(0)}" y1="${Y(ECON.fixed)}" x2="${X(D)}" y2="${Y(ECON.fixed+D*ECON.pipe[0])}" stroke="var(--muted)" stroke-dasharray="3 3"/>`;
  if(x.val){ const [a,b]=x.val; g+=`<rect x="${X(0)}" y="${Y(Math.max(a,b))}" width="${X(D)-X(0)}" height="${Math.max(1,Y(Math.min(a,b))-Y(Math.max(a,b)))}" fill="#CC746C" opacity=".22"/><text x="${X(D)-4}" y="${Y(Math.max(a,b))-4}" fill="#e39a93" font-size="10" text-anchor="end">what the heat can pay for over ${ECON.life.pipe} years</text>`; }
  g+=`<line x1="${X(Math.min(D,x.route))}" x2="${X(Math.min(D,x.route))}" y1="${mt}" y2="${Hh-mb}" stroke="#e9e6e1" stroke-width="1.5"/><text x="${X(Math.min(D,x.route))+4}" y="${mt+10}" fill="#e9e6e1" font-size="10">this route</text>`;
  g+=`<text x="${X(D)-4}" y="${Y(ECON.fixed+D*ECON.pipe[1])+12}" fill="var(--muted)" font-size="10" text-anchor="end">cost to connect</text></svg>`;
  return `<div class="cchart">${g}</div><p class="src">Where the shaded value meets the cost band is the break-even distance. ${x.val?'':'No value line: this building\'s demand is not known.'}</p>`; }

function netCard(f,nets){ const n=nets[0]; if(!n) return; const L=(OPPS.opportunities||{})['District heat to a network']||{};
  BD.drawer.open(`<div class="kind">Heat · district energy</div><h2>${esc(n.n)}</h2><p class="sub">${esc(n.note||'')}</p><p>${n.inside?'This lot is inside the service area.':`${fmt(n.edge)} m from this lot.`}</p>
  <h3>Rules</h3>${ladder(L)}<h3>How proven</h3><p class="sub">${L.readiness?rdPill(L.readiness)+' ':''}${esc(L.basis||'')}</p><h3>Sources</h3>${srcList((L.sources||[]).concat(['vanNEUlevy2025','vanNEUguide']))}`); }
function heatMathCard(f,r){ const e=E(), R=e.R, mw=BD.S.answers.mw||1, it=r.itMWh;
  BD.drawer.open(`<div class="kind">Heat · how it is worked out</div><h2>Heat this size could offer</h2><dl><dt>Heat after the heat pump</dt><dd>${e.rng(r.avail[0]/1000,r.avail[1]/1000,'GWh/yr')}</dd><dt>Equal to the heating of</dt><dd>${e.rng(r.homes[0],r.homes[1],'homes')}</dd><dt>Heat-pump electricity</dt><dd>${e.rng(r.hp[0]/1000,r.hp[1]/1000,'GWh/yr')} → ${e.rng(r.co2[0],r.co2[1],'t CO₂e/yr')}</dd></dl>
  ${e.mathBox([`Server electricity: ${mw} MW × 8,760 h × ${R.lf} = <b>${e.n0(it)} MWh</b>.`,`Captured into liquid: × ${R.capture[0]}–${R.capture[1]} = ${e.n0(it*R.capture[0])}–<b>${e.n0(it*R.capture[1])} MWh</b>.`,`Heat out = captured × COP ÷ (COP − 1), COP ${R.cop[0]}–${R.cop[1]}: <b>${e.n0(r.avail[0])}–${e.n0(r.avail[1])} MWh</b>.`,`Heat-pump electricity = heat ÷ COP: <b>${e.n0(r.hp[0])}–${e.n0(r.hp[1])} MWh</b>.`,`Homes: ÷ (${R.homeMWh[f.city]} MWh of energy a home buys for heating × 0.85, the boiler's efficiency) a home.`])}
  <h3>Sources</h3>${e.src('lf')}${e.src('cap')}${e.src('cop')}${e.src('homes')}${e.src('grid')}${e.src('reach')}${e.src('recv')}`); }

/* ---------- how far is too far, for each carrier (J.B., 16 Oct: "at what distance does it hurt us") ---------- */
function carriersCard(f){ const city=f.city;
  const rows=[
   ['Heat pipe',`cost grows about $${fmt(ECON.pipe[0])}–${fmt(ECON.pipe[1])} a metre after a fixed $${fmt(ECON.fixed)} to connect; break-even depends on how much heat the receiver takes (see each card)`,'street: a street-use permit and trenching; a district-energy service area: connection may be compulsory inside it',ECON.src.slice(0,4)],
   ['Electric cable',`short runs are cheap; the step is the property line: supplying a neighbour for pay makes the supplier a public utility in BC unless exempted (UCA s. 1), and in Alberta self-supply must be on one property — "the lands must, at a minimum, be contiguous" (AUC 2025)`,'the property line; then the utility\'s service area',['bcUCAs1','aucCoaldale2025','abEUAdef2026']],
   ['Water pipe',`reclaimed-water pipe cost about US$1,870/m in one US project (2018, all items); pumping about 0.18 kWh per m³ (California 2023)`,'the street; Vancouver has no reclaimed-water network; EPCOR supplies Gold Bar reclaimed water to industry by agreement',['irwdCulver2018','cec2023pump','epcorGoldBar']],
   ['Truck','cost and emissions per km not yet sourced','none: trucks use the streets',[]],
   ['Walking (people to a refuge)','walking-distance norms for warming and cooling centres not yet sourced','busy streets and rail lines as barriers',[]],
  ];
  BD.drawer.open(`<div class="kind">Distance</div><h2>How far is too far</h2><p class="sub">${draft('Each thing a data centre could share travels differently. Distance costs money gradually; some lines cost a rule all at once.')}</p>
  <table class="cl">${rows.map(r=>`<tr><td>${esc(r[0])}</td><td>${esc(r[1])}<small>Step changes: ${esc(r[2])}</small></td></tr>`).join('')}</table>
  <h3>Sources</h3>${srcList(rows.flatMap(r=>r[3]))}`); }
BD.carriersCard=carriersCard;

BD.tabOverride=Object.assign(BD.tabOverride||{},{heat:heatIndex});
})();

/* step 5, Report (J.B., 16 Oct: PDF and HTML; baseline, comparisons, gains and losses for each party, trade-offs, what is not known) — placeholder until built */
BD.views=BD.views||{};
BD.views.report=function(){ const e=BD.eng; BD.S.view2='tab'; document.body.classList.remove('wide');
  document.getElementById('side').innerHTML=e.tabBar('report')+`<h2>Report</h2><p class="lead">The report for this site is being built.</p>
  <p class="sub">It will gather, in this order: the site and settings; the baseline (the lot today and a conventional data centre on it); this design against the six references; each exchange with gains and losses for each party in their own units; the three options and four futures; and everything not yet known, with every source and its check status. Nothing is added up or ranked. It will download as a PDF and as an HTML page.</p>`;
  e.wireTabs(); BD.draw(); };
