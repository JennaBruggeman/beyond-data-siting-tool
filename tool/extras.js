/* Beyond Data — extras (15 Oct 2026): worked examples, what this tool can't tell you, data dates and versions,
   glossary on hover, what matters most, over time, two cities, site report download, feedback for user sessions.
   All wording is Claude's draft for J.B. (shown in the draft colour or marked). Uses BD.eng from engine.js. */
(function(){
'use strict';
const BD=window.BD, E=()=>BD.eng; const {$,esc,fmt}=BD;
BD.views=BD.views||{};
const VERSION={n:19,date:'16 Oct 2026'};
const draft=t=>`<span class="draft">${t}</span>`;

/* ---------- worked examples ---------- */
const EXAMPLES=[
 {lab:'Vancouver industrial lot',sub:'1425 Clark Dr · I-2 · new building',sel:{city:'van',tile:'2_1',id:'23060741'},ans:{built:'new',extent:'whole',floor:''}},
 {lab:'Edmonton industrial lot',sub:'12603 123 Street NW · IH · new building',sel:{city:'edm',tile:'-1_1',id:'883345'},ans:{built:'new',extent:'whole',floor:''}},
 {lab:'An existing downtown tower',sub:'555 W Hastings (Harbour Centre) · one upper floor',sel:{city:'van',tile:'0_2',id:'59013407'},ans:{built:'existing',extent:'part',floor:'upper'}},
];
async function runExample(i){ const x=EXAMPLES[i]; Object.assign(BD.S.answers,x.ans,{mw:null}); if(BD.S.city!==x.sel.city) await BD.setCity(x.sel.city,true); await BD.select(Object.assign({quiet:true},x.sel)); if(BD.S.sel) BD.fitsView(); }
BD.afterIntro=function(){
  const box=document.createElement('div'); box.className='examples';
  box.innerHTML=`<h3>Worked examples</h3><p class="sub">${draft('Three sites, one click each: a new building in each city, and a floor of an existing tower.')}</p>
  ${EXAMPLES.map((x,i)=>`<button class="ex" data-i="${i}"><b>${esc(x.lab)}</b><span>${esc(x.sub)}</span></button>`).join('')}
  <p class="sub" style="margin-top:14px"><a href="#" id="toAbout">What this tool can't tell you · data dates · versions</a></p>
  ${BD.fb?`<p class="sub"><a href="#" id="toFb">Leave feedback</a></p>`:''}
  <div class="src">Version ${VERSION.n} · ${VERSION.date}</div>`;
  $('#side').appendChild(box);
  box.querySelectorAll('.ex').forEach(b=>b.onclick=()=>runExample(+b.dataset.i));
  $('#toAbout').onclick=e=>{ e.preventDefault(); aboutView(); };
  const fb=$('#toFb'); if(fb) fb.onclick=e=>{ e.preventDefault(); feedbackView(); };
};

/* ---------- what this tool can't tell you; data dates; versions ---------- */
const LIMITS=[
 'It estimates ranges, not designs. Every number is a screening figure from published sources; none replaces an engineer, a utility study or a permit review.',
 'Zoning: the tool reads zone schedules as written. Whether support rooms may sit on a ground floor where "bulk data storage" is barred (Vancouver I-2, I-3, FC-2) is for the City to confirm; both readings are shown. Yards and setbacks for I-2 are not yet read, so floor area is "up to".',
 'Size: real data centres sit in the lower half of the tool\'s range (precedent catalogue). Small downtown buildings can exceed it. Only 11 buildings worldwide publish both IT load and floor area in a public record.',
 'Grid: no utility publishes substation headroom for these cities. The tool says what is known (downtown Vancouver feeder freeze to 2032; Alberta\'s 1,200 MW interim limit, fully allocated) and otherwise "needs the utility\'s answer".',
 'Heat: receivers are candidates by type, not customers. Their monthly heat demand, current heating and willingness are not known; heat "available" is not heat "used".',
 'Edmonton: heights are measured from the City\'s 3D buildings for about 95% of outlines and estimated (floor area ÷ footprint × 4 m) for the rest; district energy areas are not yet traced; floodplain not yet checked. Lot outlines come from Alberta title mapping (© Altalis) via Edmonton Public Schools GIS, current to 1 Sep 2025, used for academic research.',
 'People: census counts (2021) are spread evenly within each dissemination area, so near a boundary they are estimates; sound is a screening estimate without walls or barriers; the watched edge is recorded only by site visit.',
 'Operator figures (spec sheets, websites) are claims and are labelled as such. Industry surveys are labelled as surveys.',
 'Security: the tool shows generic equipment only and nothing that would help defeat a facility\'s security.',
];
const DATA=[
 ['Vancouver parcels','City of Vancouver Open Data, property parcel polygons','Oct 2026'],
 ['Vancouver zoning and values','City of Vancouver property tax report','2026'],
 ['Vancouver building outlines','City of Vancouver building footprints','2009 (new buildings added from LiDAR 2022)'],
 ['Vancouver heights','City of Vancouver LiDAR','2022'],
 ['Vancouver NEU service area','By-law 9552 Schedule A, traced (±45 m)','consolidated 1 Jan 2026'],
 ['Edmonton property records','City of Edmonton property assessment and information','2026 (downloaded 13 Oct 2026)'],
 ['Edmonton zoning','Zoning Bylaw 20001 geographic data','12 Oct 2026'],
 ['Edmonton building outlines','City of Edmonton rooflines','14 Oct 2026'],
 ['Edmonton heights','City of Edmonton 3D buildings (383,329 parts)','downloaded Oct 2026'],
 ['Edmonton lot outlines','Alberta title mapping (© Altalis) via Edmonton Public Schools GIS','1 Sep 2025'],
 ['Receivers','Statistics Canada ODSRF v2 (2026), ODHF (2020), ODEF v2.1 (2022); Vancouver non-market housing','see each'],
 ['Grid carbon','National Inventory Report 2026 (2024 data)','2024'],
 ['Precedent catalogue','130 sites, gathered 15 Oct 2026','15 Oct 2026'],
];
const CHANGES=[
 ['19','16 Oct 2026','Five site-setup cards in a drawer; zone limits with their clauses, your own height and floor-space ratio, Edmonton h/f modifiers; footprint from setbacks, loading and plant yard; plant sized from the load with spares and placed only inside the usable lot; one 3D data-centre model for every tab; neighbours to 1.5 km; receivers on their buildings; small-scale housing zones tinted; NaN racks fixed.; Opportunities tab: all 15 opportunities by family, each tested gate by gate (physics, land, rules, demand, time, money) with its reason; I-2 sub-area B limits; Blatchford business plan and wastewater plants added as sources; Compared with: every Heat, Energy, Water and Materials tab opens with the same figures for six references (conventional here, Cologix VAN4 claims, Vancouver modelled, Edmonton same design and conventional); receiver floor-area demand; Creative Energy, River District and Edmonton Downtown District Energy mapped; EV chargers and public rooms nearby'],
 ['18','16 Oct 2026','Census people near the site; solar yield range; labels agreed 15 Oct.'],
 ['17','15 Oct 2026','Show the math on every tab; evidence badges; range bars; worked examples; what matters most; over time; two cities; site report; feedback; COP range widened to observed values.'],
 ['16','15 Oct 2026','Edmonton lot outlines.'],
 ['14–15','15 Oct 2026','Edmonton picking by building, nearest point, or same zone.'],
 ['13','15 Oct 2026','Map no longer stretches when the page opens small.'],
 ['12','15 Oct 2026','Precedents tab; high-density hall option; small-site note.'],
 ['10–11','15 Oct 2026','Precedent check line; show the math for the size chain.'],
 ['9','15 Oct 2026','Size chain corrected: built hall area per MW, 5.5–6 m hall floors, two ground-floor readings; log-step size slider.'],
 ['8','15 Oct 2026','Roof equipment fitted and labelled; options as three 3D views.'],
];
function aboutView(){
  $('#side').innerHTML=`<button class="x" id="back">← Back</button><div class="kind">About this tool</div><h2>What this tool can't tell you</h2>
  <ul class="lim">${LIMITS.map(t=>`<li>${draft(esc(t))}</li>`).join('')}</ul>
  <h3>Data and their dates</h3><div class="tt"><table><thead><tr><th>Layer</th><th>Source</th><th>As of</th></tr></thead><tbody>${DATA.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
  <h3>Versions</h3><div class="tt"><table><tbody>${CHANGES.map(r=>`<tr><td>v${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join('')}</tbody></table></div>
  <h3>Evidence badges</h3><p class="sub">Each source line carries a badge: <span class="evb ev-record">public record</span> <span class="evb ev-peer">research or government lab</span> <span class="evb ev-survey">industry survey</span> <span class="evb ev-claim">operator or maker claim</span> <span class="evb ev-physics">physics</span> <span class="evb ev-transfer">transferred from elsewhere</span> <span class="evb ev-assume">assumption or gap</span></p>
  <div class="draftnote">Draft wording (Claude) for J.B. Version ${VERSION.n}, ${VERSION.date}.</div>`;
  $('#back').onclick=()=>BD.intro();
}
BD.views.about=aboutView;

/* ---------- glossary on hover ---------- */
const GL={
 'PUE':'Power usage effectiveness: all the electricity a data centre draws ÷ the electricity its servers use. 1.4 means 40% more for cooling, power losses and lights. A yearly average.',
 'COP':'Coefficient of performance: heat delivered by a heat pump ÷ the electricity it uses.',
 'MW of servers':'The electrical load of the computing equipment itself (IT load), before cooling and other building systems.',
 'data hall':'The room where the server racks stand (also called white space).',
 'dBA':'A-weighted decibels: sound level adjusted to how people hear. +10 dBA sounds about twice as loud.',
 'kWp':'Kilowatts peak: a solar array\'s rated output in full sun.',
 'blowdown':'Water drained from a cooling tower to stop minerals building up; it goes to the sewer.',
 'cycles of concentration':'How many times the minerals in cooling-tower water concentrate before it is drained; more cycles, less water.',
 'Embodied carbon':'Emissions from making and building something, as opposed to running it.',
 'floor-space ratio':'Floor area allowed ÷ lot area (FSR).',
 'curtail':'Reduce electricity use when the utility asks.',
 'heat pump':'A machine that lifts heat to a higher temperature using electricity; here, from server cooling water to a heating loop.',
 'load factor':'Average load ÷ peak load over a year.',
 'UPS':'Uninterruptible power supply: batteries that carry the servers for minutes until generators start.',
};
const GLK=Object.keys(GL).sort((a,b)=>b.length-a.length);
function glossify(root){
  const done=new Set(); const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement&&!n.parentElement.closest('.gl,button,script,style,textarea,svg,.math,.src,h2,h3')?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT});
  const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
  for(const n of nodes){ let t=n.nodeValue; for(const k of GLK){ if(done.has(k)) continue; const i=t.indexOf(k); if(i<0) continue;
      done.add(k); const span=document.createElement('span'); span.className='gl'; span.title=GL[k]+' (draft definition)'; span.textContent=k;
      const after=n.splitText(i); after.nodeValue=after.nodeValue.slice(k.length); n.parentNode.insertBefore(span,after); t=n.nodeValue; break; } }
}
let glTimer=0; const side=$('#side');
new MutationObserver(()=>{ clearTimeout(glTimer); glTimer=setTimeout(()=>{ if(!side.querySelector('.gl')) glossify(side); },60); }).observe(side,{childList:true});

/* ---------- what matters most: vary one assumption at a time ---------- */
function bars(rows,unit){ const mx=Math.max(...rows.flatMap(r=>[r.lo,r.hi]))||1, W=100;
  return `<div class="torn">${rows.map(r=>{ const a=Math.min(r.lo,r.hi)/mx*W, b=Math.max(r.lo,r.hi)/mx*W, base=r.base/mx*W;
    return `<div class="trow"><div class="tlab">${esc(r.lab)}<div class="src">${esc(r.range)}</div></div><div class="ttrack"><span class="tfill" style="left:${a}%;width:${Math.max(0.8,b-a)}%"></span><span class="tbase" style="left:${base}%"></span></div><div class="tval">${E().rng(Math.min(r.lo,r.hi),Math.max(r.lo,r.hi),unit)}</div></div>`; }).join('')}</div>`; }
function sensView(){
  BD.scene3d&&BD.scene3d.hide(); const e=E(), f=e.siteFacts(), R=e.R, A=BD.S.answers, mw=A.mw||1;
  const up=f.hallGross[1], G=f.gross[1], mid=(a,b)=>(a+b)/2;
  const share=R.hallShare, m2=f.m2MW, sM=mid(...share), mM=mid(...m2), strict=!!f.hallL;
  const MWof=(s,m,len)=>(len&&f.hallL?Math.min(up,G*s):up*s)/m;
  const base=MWof(sM,mM,false);
  const sz=[
   {lab:'Hall area per MW',range:`${m2[0]}–${m2[1]} m² per MW`,lo:MWof(sM,m2[1]),hi:MWof(sM,m2[0]),base},
   {lab:'Hall share of floor',range:`${share[0]}–${share[1]}`,lo:MWof(share[0],mM),hi:MWof(share[1],mM),base},
  ];
  if(strict) sz.push({lab:'Ground-floor reading',range:'strict ↔ lenient (City to confirm)',lo:MWof(sM,mM,false),hi:MWof(sM,mM,true),base});
  sz.sort((a,b)=>Math.abs(b.hi-b.lo)-Math.abs(a.hi-a.lo));
  const it=mw*8760*R.lf, capM=mid(...R.capture), copM=mid(...R.cop), heat=(c,p)=>it*c*p/(p-1)/1000;
  const hb=heat(capM,copM);
  const ht=[
   {lab:'Share of heat captured into liquid',range:`${R.capture[0]}–${R.capture[1]}`,lo:heat(R.capture[0],copM),hi:heat(R.capture[1],copM),base:hb},
   {lab:'Heat-pump COP',range:`${R.cop[0]}–${R.cop[1]} (higher COP adds less electricity as heat)`,lo:heat(capM,R.cop[1]),hi:heat(capM,R.cop[0]),base:hb},
  ].sort((a,b)=>Math.abs(b.hi-b.lo)-Math.abs(a.hi-a.lo));
  $('#side').innerHTML=`<button class="x" id="back">← What fits</button><div class="kind">What matters most</div><h2>Which assumption moves the answer</h2>
  <p class="draft">Each bar varies one assumption across its sourced range while the others stay at the middle. The longest bar is where better evidence would narrow the answer most. The tick is the middle case.</p>
  <h3>Largest data centre that fits (this site)</h3>${bars(sz,'MW')}
  <p class="sub">Not varied: the zone's floor-space ratio and height (read from the schedule) and the lot area (City record).</p>
  <h3>Heat offered at ${mw} MW of servers</h3>${bars(ht,'GWh/yr')}
  <p class="sub">Not varied: the 60% average load (one source, no range) — every heat figure scales with it directly.</p>
  <div class="draftnote">Draft wording (Claude) for J.B.</div>`;
  $('#back').onclick=()=>BD.fitsView();
}
BD.views.sens=sensView;

/* ---------- over time ---------- */
function timeView(){
  const e=E(); BD.scene3d&&BD.scene3d.hide(); document.body.classList.add('wide'); const W=620,H=330,ml=190,mr=34,yrs=50, X=y=>ml+y/yrs*(W-ml-mr);
  const rows=[
   ['Servers replaced','every 5–6 years',[[0,50]],'tick',5.5],
   ['Colocation contract','2–5 years, renewed or not',[[0,5]],'span'],
   ['Hyperscale contract','5–10+ years',[[0,10]],'span'],
   ['Heat contract (Stockholm)','10 years + 5',[[0,15]],'span'],
   ['Cooling and heat pumps','15–25 years',[[0,25]],'span',null,[15,25]],
   ['Building shell','up to about 40 years',[[0,40]],'span'],
   ['Pipe network','30–50 years, by water temperature',[[0,50]],'span',null,[30,50]],
   ['Grid connection','stays with the land',[[0,50]],'span'],
  ];
  let g=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Lifespans of the parts of a data-centre heat exchange over 50 years">`;
  [0,10,20,30,40,50].forEach(y=>{ g+=`<line x1="${X(y)}" x2="${X(y)}" y1="10" y2="${H-26}" stroke="var(--line)"/><text x="${X(y)}" y="${H-10}" fill="var(--faint)" font-size="12" text-anchor="middle">${y} yr</text>`; });
  rows.forEach((r,i)=>{ const y=24+i*35;
    g+=`<text x="0" y="${y+4}" fill="var(--fg)" font-size="13">${esc(r[0])}</text><text x="0" y="${y+18}" fill="var(--faint)" font-size="11">${esc(r[1])}</text>`;
    if(r[3]==='tick'){ for(let t=0;t<=yrs;t+=r[4]) g+=`<line x1="${X(t)}" x2="${X(t)}" y1="${y-6}" y2="${y+10}" stroke="var(--accent)" stroke-width="2"/>`; }
    else { const [a,b]=r[2][0]; g+=`<rect x="${X(a)}" y="${y-3}" width="${X(b)-X(a)}" height="8" fill="var(--fg)" opacity=".22"/>`; if(r[5]) g+=`<rect x="${X(r[5][0])}" y="${y-3}" width="${X(r[5][1])-X(r[5][0])}" height="8" fill="var(--fg)" opacity=".12"/>`; }
  });
  g+='</svg>';
  $('#side').innerHTML=e.tabBar('time')+`<h2>What changes, and when</h2>
  <p class="draft">The pipe and the grid connection outlast many generations of servers and several tenants. Each red tick is a moment when the heat could change: new servers may be cooled differently, and a tenant may leave at the end of a contract.</p>
  <div class="chart" style="overflow-x:auto">${g}</div>
  <h3>Four futures</h3><dl><dt>Tenant changes cooling</dt><dd>${draft('liquid to air: heat offered drops to none; air to liquid: heat could be offered')}</dd><dt>Tenant leaves</dt><dd>${draft('receivers fall back on their own heating at full peak; the grid connection and pipe stay')}</dd><dt>Receiver leaves</dt><dd>${draft('all heat goes back to the dry coolers, so they must stay full size')}</dd><dt>Network arrives</dt><dd>${draft('a district network reaching the site could take what neighbours cannot')}</dd></dl>
  <div class="src"><span class="evb ev-peer">research or government lab</span> register: horizons (LBNL 2024 server life; company filings; ASHRAE plant medians; EN 253 pipe life; Digital Realty contracts — operator; Stockholm Exergi heat contracts — operator).</div>
  <div class="draftnote">Draft wording (Claude) for J.B.</div>`;
  e.wireTabs(); document.body.classList.add('wide'); BD.draw();
}
BD.views.time=timeView;

/* ---------- two cities: the same data centre in Vancouver and Edmonton ---------- */
function citiesView(){
  const e=E(), R=e.R, A=BD.S.answers, mw=A.mw||5, rng=e.rng; BD.scene3d&&BD.scene3d.hide();
  const one=c=>{ const fac=[mw*R.pue[0],mw*R.pue[1]], MWh=fac.map(v=>v*8760*R.lf), it=mw*8760*R.lf;
    const avail=[it*R.capture[0]*R.cop[1]/(R.cop[1]-1),it*R.capture[1]*R.cop[0]/(R.cop[0]-1)], hp=[avail[0]/R.cop[1],avail[1]/R.cop[0]];
    return {MWh,co2:MWh.map(v=>v*R.grid[c]/1000),avail,homes:avail.map(v=>v/R.homeMWh[c]),hpco2:hp.map(v=>v*R.grid[c]/1000)}; };
  const v=one('van'), d=one('edm');
  const rows=[
   ['Grid carbon',`${R.grid.van} g/kWh`,`${R.grid.edm} g/kWh`,'NIR 2026, consumption intensity, 2024','record'],
   ['Carbon of its electricity',rng(v.co2[0],v.co2[1],'t CO₂e/yr'),rng(d.co2[0],d.co2[1],'t CO₂e/yr'),'electricity × grid carbon','physics'],
   ['Heat offered (liquid-cooled, heat pump)',rng(v.avail[0]/1000,v.avail[1]/1000,'GWh/yr'),rng(d.avail[0]/1000,d.avail[1]/1000,'GWh/yr'),'same physics in both cities','physics'],
   ['Equal to the heating of',rng(v.homes[0],v.homes[1],'homes'),rng(d.homes[0],d.homes[1],'homes'),`a home uses ${R.homeMWh.van} MWh a year in BC, ${R.homeMWh.edm} in Alberta (NRCan CEUD 2023)`,'record'],
   ['Heat-pump carbon',rng(v.hpco2[0],v.hpco2[1],'t CO₂e/yr'),rng(d.hpco2[0],d.hpco2[1],'t CO₂e/yr'),'heat-pump electricity × grid carbon','physics'],
   ['Busiest to quietest heating month','about 3.9 : 1','about 3.3 : 1','total heat demand (CWEC)','peer'],
   ['Solar yield, roof','892–1,007 kWh per kWp a year','944–1,244 kWh per kWp a year','NRCan municipal values (flat to latitude tilt)','record'],
   ['Solar yield, south wall','716 kWh per kWp a year','989 kWh per kWp a year','NRCan municipal values (vertical)','record'],
   ['Rain','about 1,160 mm a year','about 420 mm a year','ECCC Normals 1991–2020','record'],
   ['Night noise limit next to homes','45–55 dBA by zone (By-law 6555)','50 dBA (Bylaw 14600)','city by-laws','record'],
   ['Getting power','2026 Call: must curtail ≥10% of load on 24 h notice, ≥144 h a year; downtown feeders frozen to 2032','AESO interim limit of 1,200 MW for new large loads, fully allocated; loads ≥75 MW proposed to bring their own gas generation, with bridging load fully interruptible (proposal, Jun 2026)','BC Hydro 2026 RFA; AESO 2025, 2026','record'],
   ['Where heat could go','NEU: compulsory connection inside its area; heat sent back credited at 50%','Blatchford: compulsory connection inside its service area (Bylaw C17943 s. 6); service areas not yet traced in the tool','By-law 9552; Bylaw C17943','record'],
   ['Electricity price','BC Hydro large general service 6.79 ¢/kWh + $13.83/kW a month','Alberta pool averaged $43.68/MWh in 2025, plus wires charges','BC Hydro 2026; AESO 2025','record'],
  ];
  $('#side').innerHTML=e.tabBar('cities')+`<h2>The same data centre in two cities</h2>
  <p class="draft">${mw} MW of servers, built the same way, in Vancouver and in Edmonton. The building does not change; the grid, the climate and the rules do.</p>
  <div class="tt"><table><thead><tr><th></th><th>Vancouver</th><th>Edmonton</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(r[0])}<div class="src">${e.badge?'' :''}<span class="evb ev-${r[4]}">${esc({record:'public record',physics:'physics',peer:'research or government lab'}[r[4]])}</span> ${esc(r[3])}</div></td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody></table></div>
  <p class="sub">${draft(`The same heat is worth about twice as many homes' heating in Vancouver as in Edmonton, because Alberta homes use about twice the heat; but each MWh of heat-pump electricity carries about ${Math.round(R.grid.edm/R.grid.van)} times the carbon in Alberta.`)}</p>
  <div class="draftnote">Draft wording (Claude) for J.B. Size from the slider; set a size on the What fits page.</div>`;
  document.body.classList.add('wide'); e.wireTabs(); BD.draw();
}
BD.views.cities=citiesView;

/* ---------- site report (download) ---------- */
async function siteReport(){
  const e=E(), f=e.siteFacts(), R=e.R, A=BD.S.answers, mw=A.mw||1, rng=e.rng, sel=BD.S.sel, a=sel.a||[];
  const d=await e.loadRecv(f.city), near=e.nearby(f,d), nets=e.netsAt(f,d), r=e.calc({mw,recover:true,to:'near'},f,near,nets);
  const fac=[mw*R.pue[0],mw*R.pue[1]], date=new Date().toISOString().slice(0,10);
  const rows=[
   ['Zone',`${esc(f.zone||'—')} — ${esc(f.status.t)}`],['Floor area available',`${f.fullCover?'up to ':''}${rng(f.gross[0],f.gross[1],'m²')}`],
   ['Largest that fits',rng(f.mw[0],f.mw[1],'MW of servers')+(f.mwL?` (strict ${rng(f.mwS[0],f.mwS[1],'MW')}; lenient ${rng(f.mwL[0],f.mwL[1],'MW')})`:'')],
   ['Size tested',`${mw} MW of servers · ${f.density==='high'?'high-density, liquid-cooled halls':'typical air-cooled halls'}`],
   ['Average power at the meter',rng(fac[0],fac[1],'MW')],['Heat offered (liquid-cooled, heat pump)',rng(r.avail[0]/1000,r.avail[1]/1000,'GWh/yr')],
   ['Equal to the heating of',rng(r.homes[0],r.homes[1],'homes')],['Heat-pump carbon',rng(r.co2[0],r.co2[1],'t CO₂e/yr')],
   ['Receivers within reach',`${near.length}${nets.length?' · '+nets.map(n=>esc(n.n)+(n.inside?' (inside)':' (nearby)')).join(', '):''}`],
  ];
  const html=`<!doctype html><html lang="en-CA"><head><meta charset="utf-8"><title>Site report — ${esc(a[0]||'site')}</title>
<style>body{font-family:'Open Sans',Arial,sans-serif;font-weight:300;color:#222;max-width:760px;margin:32px auto;padding:0 20px;line-height:1.45}h1{font-weight:300;margin:0}h2{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#777;margin-top:26px}.acc{color:#CC746C}table{border-collapse:collapse;width:100%;font-size:13px}td{border-top:1px solid #ddd;padding:6px 8px;vertical-align:top}td:first-child{color:#666;width:38%}.small{font-size:11px;color:#777}</style></head><body>
<div class="small">BEYOND DATA · SITE REPORT · ${date} · tool version ${VERSION.n}</div><h1>${esc(a[0]||'Site')}</h1><div class="acc">${f.city==='van'?'Vancouver':'Edmonton'}</div>
<h2>In numbers</h2><table>${rows.map(([k,v])=>`<tr><td>${k}</td><td>${v}</td></tr>`).join('')}</table>
<h2>Sources</h2><p class="small">Zone schedules (Vancouver Zoning and Development By-law; Edmonton Zoning Bylaw 20001). Hall share: Burlington plan set. Hall area per MW: five built Canadian halls (operator claims). PUE: LBNL 2023, Uptime 2025. Load factor: Fan et al. 2007. Capture: LBNL 2014, NREL. COP: DEA 2026; Fjernvarme Fyn 2020 (observed). Homes: NRCan CEUD 2023. Grid carbon: NIR 2026. Receivers: Statistics Canada ODSRF, ODHF, ODEF; City of Vancouver non-market housing.${f.city==='edm'&&sel.ring?' Lot outline: Alberta title mapping (© Altalis) via Edmonton Public Schools GIS, current to 1 Sep 2025; academic use.':''}</p>
<h2>Read with</h2><p class="small">Ranges, not designs. Operator figures are claims. Heat available is not heat used: receivers' demand, current heating and willingness are not known. Draft wording (Claude) for J.B.</p></body></html>`;
  const dl=BD.dl; if(!dl) return alertBox('Downloads are not available in this view.');
  try{ await dl.save({filename:`site-report-${(a[0]||'site').replace(/[^A-Za-z0-9]+/g,'-').toLowerCase()}.html`,data:new Blob([html],{type:'text/html'})}); }catch(err){ alertBox('The report was not saved'+(err&&err.code?` (${err.code})`:'')+'.'); }
}
function alertBox(t){ const n=document.createElement('p'); n.className='sub draft'; n.textContent=t; $('#side').appendChild(n); }
BD.siteReport=siteReport;

/* ---------- feedback for the user sessions (stored where J.B. and Claude can read it) ---------- */
function feedbackView(){
  const sel=BD.S.sel, where=sel&&sel.a?`${sel.a[0]} (${BD.S.city})`:'';
  $('#side').innerHTML=`<button class="x" id="back">← Back</button><div class="kind">Feedback</div><h2>What did you notice?</h2>
  <p class="draft">For the user sessions. Your note is stored with the tool so J.B. can read every response together. Leave out anything personal.</p>
  <label class="sub">Your name or role (optional)<input id="fbWho" class="fbin"></label>
  <label class="sub">Site or page${where?'':' (optional)'}<input id="fbWhere" class="fbin" value="${esc(where)}"></label>
  <label class="sub">What was clear, what was confusing, what was missing?<textarea id="fbText" rows="6" class="fbin"></textarea></label>
  <button id="fbSend" class="fbbtn">Send</button><p class="sub" id="fbMsg"></p>`;
  $('#back').onclick=()=>{ BD.S.sel?BD.card():BD.intro(); };
  $('#fbSend').onclick=async()=>{ const text=$('#fbText').value.trim(); if(!text){ $('#fbMsg').textContent='Write something first.'; return; }
    $('#fbSend').disabled=true;
    try{ await BD.fb.collection('feedback').add({text,who:$('#fbWho').value.trim().slice(0,80),where:$('#fbWhere').value.trim().slice(0,160),city:BD.S.city,view:BD.S.view2||'map',at:new Date().toISOString(),version:VERSION.n});
      $('#fbMsg').textContent='Thank you, it is saved.'; $('#fbText').value=''; }
    catch(err){ $('#fbMsg').textContent='Not saved'+(err&&err.code?` (${err.code})`:'')+'. You may need to be signed in.'; }
    $('#fbSend').disabled=false; };
}
BD.views.feedback=feedbackView;

/* ---------- capabilities: database for feedback, downloads for the report ---------- */
(async()=>{ try{ const c=window.claude; if(!c||!c.use) return; const [db,dl]=await Promise.all([c.use('db').catch(()=>null),c.use('downloads').catch(()=>null)]);
  BD.fb=db; BD.dl=dl; if(!BD.S.sel&&!BD.S.view2) BD.intro(); }catch(e){} })();
})();

/* ---------- city-wide screening layer: the size that fits on every lot where a data centre is allowed case by case (a quantity, not a score) ---------- */
(function(){
  const BINS=[[0,1],[1,5],[5,10],[10,20],[20,41]], ALPHA=[0.12,0.24,0.38,0.52,0.68];
  BD.screen=false;
  function mwMid(p,T,city){ if(p._mw!==undefined) return p._mw; const R=BD.eng&&BD.eng.R; if(!R){ return null; }
    const id=p.ids?p.ids[0]:p.id, a=T.A[id]; let z=a?(city==='van'?a[1]:String(a[2]||a[1]||'').split(' ')[0].toUpperCase()):null;
    const env=z?(city==='van'?R.envVan[z]:R.envEdm[z]):null; if(!env){ p._mw=null; return null; }
    const lot=BD.area(p.r), n=1+Math.max(0,Math.floor((env.h-6)/5.75)), fsr=(env.fsr[0]+env.fsr[1])/2;
    const G=Math.min(lot*fsr,lot*n), up=env.ground?G-G/n:G; p._mw=Math.min(40,up*0.6/460); return p._mw; }
  const prev=BD.paintRecv;
  BD.paintRecv=function(ctx,s,lw){
    if(BD.screen&&s>=(BD.S.city==='van'?0.12:0.2)){ const city=BD.S.city;
      for(const id in BD.S.tiles){ if(!id.startsWith(city+':')) continue; const T=BD.S.tiles[id]; if(!T||!T.par) continue;
        for(const p of T.par){ const v=mwMid(p,T,city); if(v==null||v<=0) continue; const i=BINS.findIndex(b=>v>=b[0]&&v<b[1]);
          ctx.fillStyle=`rgba(204,116,108,${ALPHA[i<0?4:i]})`; ctx.fill(BD.pathOf([p.r])); } } }
    if(prev) prev(ctx,s,lw); };
  const btn=document.createElement('button'); btn.className='scrbtn'; btn.textContent='Layer: size that fits';
  const leg=document.createElement('div'); leg.className='scrleg'; leg.hidden=true;
  leg.innerHTML=`<b>Size that fits, middle case</b><div class="sub">MW of servers on a new building, where a data centre is allowed case by case. A quantity, not a ranking. Shown when zoomed in.</div>${BINS.map((b,i)=>`<div><i style="background:rgba(204,116,108,${ALPHA[i]})"></i>${b[0]}–${b[1]>40?40:b[1]} MW</div>`).join('')}<div class="src">Middle case: floor-space ratio × lot, hall share 0.6, 460 m² of hall per MW; yards not applied. Click a lot for its full range.</div>`;
  btn.onclick=()=>{ BD.screen=!BD.screen; btn.setAttribute('aria-pressed',BD.screen); leg.hidden=!BD.screen; BD.draw(); };
  for(const el of [btn,leg]) for(const ev of ['pointerdown','pointerup','wheel']) el.addEventListener(ev,e=>e.stopPropagation());
  const map=document.getElementById('map'); if(map){ map.appendChild(btn); map.appendChild(leg); }
})();
