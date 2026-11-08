/* Beyond Data — F1 Municipal cards, group 'a' (CODE_JOB_F1 step 3): city, parcel, allowed, industrial land and jobs, approval process, report.
   Municipal is about rules, not buildings: no massing, no design; limits and clauses only. Every figure is from the tool's zone rows (tool/data/zones.json), the city overview
   (tiles/<city>/meta.json) or the research files named in each card's sources; a figure the tool lacks is a red "?". */
(function(){
'use strict';
const BD=window.BD, C=BD.f1cards, K=C.K, esc=C.esc, T='municipal';
/* M1, M2: the same city and parcel maps as Architecture (job sheet §3b: as A01, A02); both are rule maps (zones, lots), no massing */
C.add(T,'Your city',C.get('architecture','Your city'));
C.add(T,'Your parcel',C.get('architecture','Your parcel'));

/* styles for these cards, injected once */
if(!document.getElementById('f1c-mua')){ const st=document.createElement('style'); st.id='f1c-mua'; st.textContent=`
.f1c-mua-tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;width:100%}
.f1c-mua-tile{border:1px solid var(--f-hair);padding:22px 22px 20px;display:flex;flex-direction:column;gap:10px;min-height:290px;color:var(--f-faint);background:#fff}
.f1c-mua-tile h4{margin:0;font-size:17px;font-weight:400}
.f1c-mua-tile .k{font-size:11.5px;letter-spacing:.02em}
.f1c-mua-tile p{margin:0;font-size:13px;line-height:1.5}
.f1c-mua-tile .at{margin-top:auto;font-size:12px;border-top:1px solid var(--f-hair);padding-top:10px}
.f1c-mua-tile.on{border:1.5px solid var(--f-ink);color:var(--f-ink2)}
.f1c-mua-tile.on h4,.f1c-mua-tile.on .k{color:var(--f-ink)}
.f1c-mua-tile.on .at{border-top-color:var(--f-rule)}
.f1c-mua-clause{margin-top:20px;border-top:1px solid var(--f-ink);padding-top:12px;font-size:13px;color:var(--f-ink2);line-height:1.55;max-width:900px}
.f1c-mua-clause b{font-weight:500;color:var(--f-ink)}
.f1c-mua-clause span{color:var(--f-mute)}
.f1c-mua-maps{display:grid;grid-template-columns:1.1fr 1.25fr .8fr;gap:20px;width:100%;align-items:start}
.f1c-mua-maps figure{margin:0;min-width:0}
.f1c-mua-maps figcaption{font-size:13px;color:var(--f-ink);margin-bottom:6px}
.f1c-mua-maps svg{width:100%;height:auto;display:block}
.f1c-mua-reg{border:1px dashed var(--f-rule);height:228px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;padding:18px;font-size:12.5px;color:var(--f-mute)}
.f1c-mua-reg b{color:var(--f-red);font-size:26px;font-weight:400}
.f1c-mua-steps{display:flex;width:100%;gap:0;align-items:stretch}
.f1c-mua-step{flex:1 1 0;min-width:0;position:relative;padding:34px 12px 0 0}
.f1c-mua-step:before{content:'';position:absolute;left:0;right:0;top:11px;border-top:1px solid var(--f-ink)}
.f1c-mua-step:after{content:'';position:absolute;left:0;top:6px;width:11px;height:11px;border-radius:50%;background:var(--f-ink)}
.f1c-mua-step .n{font-size:11.5px;color:var(--f-mute);margin-bottom:4px}
.f1c-mua-step h4{margin:0 0 6px;font-size:14.5px;font-weight:500;line-height:1.25}
.f1c-mua-step .w{font-size:12.5px;color:var(--f-ink);margin-bottom:6px}
.f1c-mua-step p{margin:0;font-size:12px;line-height:1.5;color:var(--f-ink2)}
.f1c-mua-step .c{display:block;margin-top:6px;font-size:11.5px;color:var(--f-mute)}
.f1c-mua-pages{display:flex;gap:20px;align-items:flex-start;width:100%}
.f1c-mua-pg{flex:0 0 auto;width:300px}
.f1c-mua-pg .cap{font-size:12px;color:var(--f-ink2);margin-bottom:6px}
.f1c-mua-sheet{width:300px;height:424px;border:1px solid var(--f-rule);background:#fff;padding:16px 18px;overflow:hidden;font-size:6.6px;line-height:1.4;color:var(--f-ink)}
.f1c-mua-sheet .hd{font-size:5.4px;letter-spacing:.06em;text-transform:uppercase;color:var(--f-mute);border-bottom:1px solid var(--f-hair);padding-bottom:5px;margin-bottom:10px;display:flex;justify-content:space-between}
.f1c-mua-sheet h5{margin:0 0 3px;font-size:13px;font-weight:300}
.f1c-mua-sheet .ld{color:var(--f-ink2);font-size:7px;margin-bottom:8px}
.f1c-mua-sheet .top{display:grid;grid-template-columns:110px 1fr;gap:10px;margin-bottom:9px}
.f1c-mua-sheet .lb{font-size:5.2px;letter-spacing:.06em;text-transform:uppercase;color:var(--f-mute);margin-top:4px}
.f1c-mua-sheet .big{font-size:8.5px}
.f1c-mua-sheet table{width:100%;border-collapse:collapse}
.f1c-mua-sheet th{font-size:5.2px;letter-spacing:.06em;text-transform:uppercase;color:var(--f-mute);text-align:left;font-weight:400;border-bottom:1px solid var(--f-ink);padding:2px 0}
.f1c-mua-sheet td{border-bottom:1px solid var(--f-hair);padding:3px 4px 3px 0;vertical-align:top;font-size:6px}
.f1c-mua-sheet td:last-child{color:var(--f-mute);width:25%}
.f1c-mua-off{background:#fff;border:1px dashed var(--f-rule);display:flex;align-items:center;justify-content:center;text-align:center;color:var(--f-mute);font-size:12.5px;padding:20px}
.f1c-mua-print{margin-top:14px;font-size:12.5px;padding:7px 14px;background:#fff;border:1px solid var(--f-ink);color:var(--f-ink);border-radius:2px}
.f1c-mua-print:hover{background:var(--f-ink);color:#fff}
@media print{body *{visibility:hidden!important}.f1c-mua-sheet:not(.f1c-mua-off),.f1c-mua-sheet:not(.f1c-mua-off) *{visibility:visible!important}.f1c-mua-sheet:not(.f1c-mua-off){position:absolute;left:0;top:0;width:190mm;height:auto;font-size:9px;border:0}}
`; document.head.appendChild(st); }

/* city overview (zone polygons, City open data) as the map uses it: tiles/<city>/meta.json, rings decoded as index.html decodeRing */
const META={};
async function meta(city){ if(META[city]) return META[city]; const m=await BD.getJSON(`tiles/${city}/meta.json`), Q=m.Q||1;
  const dec=a=>{ const r=new Float64Array(a.length); let x=0,y=0; for(let i=0;i<a.length;i+=2){ x+=a[i]; y+=a[i+1]; r[i]=x/Q; r[i+1]=y/Q; } return r; };
  m.ovd=m.overview.map(([zi,a])=>({z:m.zones[zi],r:dec(a)})); delete m.overview; return META[city]=m; }
const zkey=(city,z)=>city==='van'?String(z||'').trim():String(z||'').trim().split(/\s+/)[0].toUpperCase();
const ringArea=r=>{ let a=0; for(let i=0;i<r.length;i+=2){ const j=(i+2)%r.length; a+=r[i]*r[j+1]-r[j]*r[i+1]; } return Math.abs(a)/2; };
const CITYN={van:'Vancouver',edm:'Edmonton'};

/* what the research files say about approval, per city (checks/research_arch_v1/municipal.md and rezoning.md; ids are theirs). Wording is short; clauses are the file's. */
const SRC_M='checks/research_arch_v1/municipal.md', SRC_R='checks/research_arch_v1/rezoning.md';
const PROC={
 van:{
  decides:'Director of Planning, or the Development Permit Board',
  notice:'The Director or Board “may notify” owners and tenants it deems necessary (ZDB s. 4.3.8). Not required.', appeal:'Board of Variance', appealWin:'30 days', appealCl:'By-law 10200 s. 3.2',
  steps:[
   {n:'Pre-application',w:'You and City planners',t:'Before applying. Order is our reading of the sources.',c:'municipal.md §1a'},
   {n:'Development permit application',w:'Director of Planning',t:'Refers it to the Development Permit Board if public response warrants it.',c:'ZDB s. 4.3.7(h)'},
   {n:'Notice to neighbours',w:'Director or Board',t:'May notify the owners and tenants it deems necessary.',c:'ZDB s. 4.3.8'},
   {n:'Decision',w:'Director of Planning or Development Permit Board',t:'Grants it with or without conditions, or refuses.',c:'ZDB s. 4.3.1'},
   {n:'Appeal',w:'Board of Variance',t:'30 days from the decision.',c:'By-law 10200 s. 3.2'},
   {n:'Building permit',w:'City of Vancouver',t:'Applied for once the development permit is issued.',c:'City permit page (municipal.md §1a)'}],
  rezone:[
   {n:'Apply to rezone',w:'You and the City',t:'Council may not allow development contrary to the Official Development Plan.',c:'Vancouver Charter s. 563(2)'},
   {n:'Public hearing',w:'Council',t:'Required, unless the by-law is consistent with the Official Development Plan.',c:'Charter s. 559.02(1), (3)'},
   {n:'Council decides',w:'Council',t:'May adopt the by-law after the hearing.',c:'Charter s. 559.07(1)'},
   {n:'Regional vote',w:'Metro Vancouver Board',t:'Only if the Industrial or Employment land designation changes: a Type 3 amendment, 50% + 1 weighted vote.',c:'Metro 2050 amendment guide s. 1.0'},
   {n:'Development permit',w:'As the main path',t:'Then the development permit steps.',c:'rezoning.md §1'}]},
 edm:{
  decides:'Development Planner',
  notice:'Mailed within 7 days of approval to owners within 60.0 m of the site, the community league and the BIA (s. 7.160). Not on a site sign by default in industrial zones.', appeal:'Subdivision and Development Appeal Board (SDAB)', appealWin:'21 days', appealCl:'Bylaw 20001 s. 7.170',
  steps:[
   {n:'Pre-application',w:'You and City planners',t:'Before applying. Order is our reading of the sources.',c:'municipal.md §1b'},
   {n:'Development permit application',w:'Development Planner',t:'A data centre is a deemed use, so it is always discretionary.',c:'Bylaw 20001 s. 7.20 3.3.2'},
   {n:'Decision',w:'Development Planner',t:'May approve with or without conditions, or refuse even if the rules are met.',c:'s. 7.100 1.1.9, 1.1.10'},
   {n:'Notice',w:'City of Edmonton',t:'Mailed within 7 days of approval to owners within 60.0 m, the community league and the BIA.',c:'s. 7.160 1.2–1.4'},
   {n:'Appeal',w:'SDAB',t:'21 days from the decision; “any person affected” 21 days after notice.',c:'s. 7.170 1–2'},
   {n:'Building permit',w:'City of Edmonton',t:'After the development permit and its appeal period.',c:'municipal.md §1b'}],
  rezone:[
   {n:'Pre-application',w:'You and the City',t:'A Direct Control zone needs 21 days of pre-application notice.',c:'rezoning.md §3'},
   {n:'Public hearing',w:'City Council',t:'Council makes the final decision on rezonings and plan amendments at a public hearing.',c:'rezoning.md §3'},
   {n:'Regional referral',w:'EMRB',t:'A rezoning is not referred. A plan amendment is, if it converts over 32 ha of a major employment area outside Downtown.',c:'REF 4.3(d)'},
   {n:'Development permit',w:'As the main path',t:'Then the development permit steps.',c:'rezoning.md §3'}]}};
const PATHS=[
 {id:'permitted',name:'Permitted',k:'As of right',what:'The zone lists a data centre as a permitted use. The use itself needs no decision.',who:'No decision on the use; a development permit is still needed.'},
 {id:'conditional',name:'Conditional or discretionary',k:'The City decides',what:'The zone lists it with conditions. Vancouver calls this a conditional use; Edmonton, a discretionary use.',who:null},
 {id:'rezoning',name:'Rezoning',k:'Council decides',what:'The zone does not list a data centre. Council changes the zoning at a public hearing, within its plans and the regional plan.',who:null}];
const pathOf=x=>{ const w=x.status.word; return /permitted/.test(w)?'permitted':/conditional|discretionary/.test(w)?'conditional':'rezoning'; };
const zonesOf=city=>(city==='van'?BD.data.raw.zones.ZV:BD.data.raw.zones.ZE)||{};
const zoneCount=city=>{ const R=zonesOf(city), c={permitted:0,conditional:0};
  for(const k in R){ const t=((R[k].cl||[]).find(y=>/data centre/i.test(y[0]))||[0,''])[1]; if(/discretionary/i.test(t)||/conditional/i.test(t)) c.conditional++; else if(/permitted/i.test(t)) c.permitted++; } c.n=Object.keys(R).length; return c; };

/* M3 Is a data centre allowed? Three paths as tiles (the A09 grid style): this lot's path in ink, the others faint; the answer and its clause beneath */
C.add(T,'Is a data centre allowed?',{async build(x){
  const city=x.city, P=PROC[city], path=pathOf(x), st=x.status, cnt=zoneCount(city), zr=zonesOf(city)[x.key]||{}, sub=x.key==='I-3'&&zr.subB;
  const tile=p=>{ const on=p.id===path; const nz=p.id==='permitted'?`${cnt.permitted} of ${cnt.n} zones`:p.id==='conditional'?`${cnt.conditional} of ${cnt.n} zones`:'every other zone';
    const who=p.who||(p.id==='conditional'?`${CITYN[city]}: ${P.decides}.`:`${CITYN[city]}: ${city==='van'?'Council, after a public hearing (Charter s. 559.07)':'City Council, at a public hearing'}.`);
    return `<div class="f1c-mua-tile${on?' on':''}"><span class="k">${on?'This lot':'&nbsp;'}</span><h4>${esc(p.name)}</h4><span class="k">${esc(p.k)}</span><p>${esc(p.what)}</p><p>${esc(who)}</p><div class="at">${esc(CITYN[city])}: ${esc(nz)}${p.id==='rezoning'?'':' list a data centre this way'}</div></div>`; };
  const draw=`<div class="f1c-mua-tiles">${PATHS.map(tile).join('')}</div>
   <div class="f1c-mua-clause"><b>${esc(x.addr)}, zone ${esc(x.zone)}: ${esc(st.word)}.</b> ${esc(st.text||'')} <span>${esc(st.clause)}</span></div>
   <div class="f1c-key"><span><i style="border-color:${K.ink};border-width:1.5px"></i>this lot’s path</span><span><i style="border-color:${K.hair}"></i>other paths</span></div>`;
  const wd=st.word.replace(' use','');
  return {draw,
   lead:path==='conditional'?`A data centre here is a ${wd} use, so ${city==='van'?'the City':'the Development Planner'} decides. No rezoning is needed.`:path==='rezoning'?'The zone does not list a data centre, so the land would need rezoning.':'The zone lists a data centre as permitted.',
   hero:[{v:wd,l:'path for this lot'},{v:`${cnt.conditional} of ${cnt.n}`,l:`${CITYN[city]} zones list it this way`}],
   rows:[['Zone',x.zone],['Use',st.word],['Clause',st.clause||'?'],['Decided by',P.decides],['Rezoning needed','no: the zone lists it'],...(sub?[['Sub-area','A only; the tool does not map sub-areas']]:[])],
   more:[['What conditional means',`<p>${city==='van'?'A conditional use needs a permit decision: the Director of Planning or the Development Permit Board may grant it “either unconditionally or subject to conditions” or refuse it (ZDB s. 4.3.1).':'A discretionary use needs a permit decision: the Development Planner may approve it with or without conditions, or refuse it even if it meets the by-law (s. 7.100 1.1.9–1.1.10).'}</p>`],
         ['Why no lot shows “permitted”',`<p>${cnt.permitted?'':`None of the ${cnt.n} zones the tool lists for ${esc(CITYN[city])} gives a data centre a plain permitted use. `}${city==='edm'?'In Edmonton a data centre is a deemed use and always discretionary (s. 7.20 3.3.2).':'In Vancouver “Bulk Data Storage” is conditional in every zone that lists it.'} Only lots in listed zones can be picked, so rezoning shows here only as the other path.</p>`]],
   src:[`Zone row and clause: tool/data/zones.json, ${x.zone} (${(st.src||[]).join(', ')||'?'}); ${st.clause||'?'}.`,`Who decides: ${SRC_M}, ${city==='van'?'ZDB s. 4.3.1 (arch_mun_vanZDB4)':'Bylaw 20001 s. 7.100 (arch_mun_edm7100)'}; rezoning: ${SRC_R}.`,'Zone counts: our arithmetic over the rows of tool/data/zones.json.']}; }});

/* M4 Industrial land and jobs: the lot on the city's industrial land (zones where a data centre is allowed, City open data) at city scale and close up.
   Waits for Cowork's policy read (Metro 2050; Vancouver Industrial Lands Policy; Edmonton): the policy lines are "?" until then. Jobs are not in the tool. */
function mapSvg(m,st,sel,city,bb,W,H,lab){ const f=C.frame(bb,W,H,0), lb=sel.ring?C.bbox(sel.ring):[0,0,0,0], cx=(lb[0]+lb[2])/2, cy=(lb[1]+lb[3])/2;
  const vis=m.ovd.filter(o=>C.hit(bb,C.bbox(o.r))), ind=vis.filter(o=>C.allowed(city,zkey(city,o.z))), oth=vis.filter(o=>!C.allowed(city,zkey(city,o.z)));
  let sd=''; if(st) for(const g of st.segs){ let d=''; for(let i=2;i+1<g.length;i+=2){ const [a,b]=f.P(g[i],g[i+1]); d+=(i>2?'L':'M')+a.toFixed(1)+' '+b.toFixed(1); } sd+=d; }
  const [lx,ly]=f.P(cx,cy), id='f1c-mua-'+Math.random().toString(36).slice(2,7);
  let mark=`<circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="${lab?4:3.5}" fill="#fff" stroke="${K.ink}" stroke-width="1.6"/>`;
  if(lab){ const tx=W-150; mark+=`<line x1="${(lx+5).toFixed(1)}" y1="${ly.toFixed(1)}" x2="${tx-4}" y2="${ly.toFixed(1)}" stroke="${K.ink}" stroke-width="0.5"/><text x="${tx}" y="${(ly-3).toFixed(1)}" font-size="12.5" font-weight="500" fill="${K.ink}" stroke="#fff" stroke-width="3" paint-order="stroke">${esc(lab[0])}</text><text x="${tx}" y="${(ly+12).toFixed(1)}" font-size="11" fill="${K.mute}" stroke="#fff" stroke-width="3" paint-order="stroke">${esc(lab[1])}</text>`; }
  return {svg:`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Zones where a data centre is allowed, and the lot"><defs><clipPath id="${id}"><rect width="${W}" height="${H}"/></clipPath></defs><rect width="${W}" height="${H}" fill="${K.ground}"/><g clip-path="url(#${id})"><path d="${C.pathOf(oth.map(o=>o.r),f.P)}" fill="#fff" stroke="${K.hair}" stroke-width="${lab?0.4:0}"/><path d="${sd}" fill="none" stroke="${K.rule}" stroke-width="${lab?0.5:0.3}"/><path d="${C.pathOf(ind.map(o=>o.r),f.P)}" fill="${K.dc}" fill-opacity="0.85" stroke="none"/></g>${mark}</svg>`,s:f.s}; }
C.add(T,'Industrial land and jobs',{async build(x){
  const city=x.city, sel=x.sel, m=await meta(city), st=await BD.streets(city); if(!sel.ring) return {draw:'<p class="f1v-empty">No lot loaded.</p>'};
  const b=C.bbox(sel.ring), cx=(b[0]+b[2])/2, cy=(b[1]+b[3])/2, ext=m.ext, bb=[ext[0],ext[1],ext[2],ext[3]], R=2500, close=[cx-R,cy-R,cx+R,cy+R];
  const A=m.ovd.reduce((s,o)=>(C.allowed(city,zkey(city,o.z))?s+ringArea(o.r):s),0)/1e6, TOT=m.ovd.reduce((s,o)=>s+ringArea(o.r),0)/1e6, nz=m.ovd.filter(o=>C.allowed(city,zkey(city,o.z))).length, lotKm=sel.lotArea/1e6;
  const a=mapSvg(m,st,sel,city,bb,420,300,null), c=mapSvg(m,st,sel,city,close,520,300,[x.addr.length>22?x.addr.slice(0,22)+'…':x.addr,x.zone+' · '+C.n0(sel.lotArea)+' m²']);
  const reg=`<div class="f1c-mua-reg"><b>?</b>Regional industrial-land map<br>(${city==='van'?'Metro 2050 Industrial and Employment land':'Edmonton Metropolitan Region Growth Plan'})<br>not in the tool yet</div>`;
  const qj=C.q('not in the tool yet'), qd=C.q('needs the map layers (layer, date, licence)');
  const D='draft: J.B. to confirm', MVG='Metro 2050 Implementation Guideline (Nov 2023)', RTS='Council report RTS 15772, 31 Oct 2023', DP='Edmonton District Policy (Apr 2026 consolidation)';
  const POL=city==='van'?[
   ['Industrial land is for','“Land uses and activities in Industrial areas should be predominantly industrial.” Residential “not intended”; “limited industrial-serving commercial uses” are appropriate.',MVG+', s. 2.0 p. 4; guidance to 2.2.9 c) iii) p. 8'],
   ['Employment land is for','“intended for light industrial, commercial” and other employment uses.',MVG+', s. 2.0 p. 4'],
   ['Intensity and jobs','“Industrial land intensity is the amount of activity on a given amount of land”, measured among other ways as jobs per area. No minimum jobs figure is set.',MVG+', s. 2.0 p. 5'],
   ['The City’s framework','Protect industrial lands for employment uses; rezone industrial land to non-industrial uses only where a Council-approved area plan or policy enables it. Adopted by Council: ?',RTS+', pp. 1, 5, 6']]:[
   ['Employment areas are for','Commercial/Industrial Employment areas “preserve dedicated space for employment uses”.',DP+', policy 2.5.3 p. 28'],
   ['Medium and heavy industry','“Preserve opportunities for medium and heavy industrial development throughout Commercial/Industrial Employment areas.” Conversion to other non-residential uses is discouraged unless industry is impractical or incompatible with surroundings.',DP+', policy 2.5.3.4'],
   ['Neighbours','Mitigate impacts on adjacent residential and Natural Areas (buffers, berms, noise walls).',DP+', policy 2.5.3.1'],
   ['Jobs','No minimum jobs figure found in the policies read.',DP]];
  POL.push(['Data centres','These policies do not say whether a data centre counts as an industrial or employment use. The zoning allows it (card 3); the land policy is silent.','no source mentions data centres']);
  if(city==='edm') POL.push(['Our reading','A data centre on this land may count as “conversion” away from medium and heavy industry under 2.5.3.4. Our reading; not stated in the policy.',DP+', policy 2.5.3.4']);
  const pol=`<div style="width:100%;margin-top:12px"><div style="display:flex;justify-content:space-between;font-size:12px;color:var(--f-mute);border-bottom:1px solid var(--f-ink);padding-bottom:5px"><span>WHAT THE POLICIES SAY ABOUT THIS LAND</span><span>${D}</span></div>${POL.map(r=>`<div style="display:grid;grid-template-columns:150px 1fr 280px;gap:16px;padding:5px 0;border-bottom:1px solid var(--f-hair);font-size:12px;line-height:1.45"><span style="color:var(--f-mute)">${esc(r[0])}</span><span style="color:var(--f-ink2)">${esc(r[1])}</span><span style="color:var(--f-mute)">${esc(r[2])}</span></div>`).join('')}</div>`;
  const draw=`<div class="f1c-mua-maps"><figure><figcaption>${CITYN[city]}</figcaption>${a.svg}</figure><figure><figcaption>The lot, ${C.n1(2*R/1000)} km across</figcaption>${c.svg}</figure><figure><figcaption>The region</figcaption>${reg}</figure></div>
   <div class="f1c-key"><span><i style="background:${K.dc};border-color:${K.dc}"></i>industrial zones where a data centre is allowed</span><span><i style="background:#fff;border-color:${K.hair}"></i>other zones</span><span><i class="ln" style="border-color:${K.rule}"></i>streets</span><span><i style="background:#fff;border-color:${K.ink};border-radius:50%"></i>this lot</span></div>${pol}`;
  return {draw,lead:`This lot is in zone ${x.zone}, industrial land where a data centre is allowed. The policies protect this kind of land for industry and jobs but are silent on data centres. Policy lines are drafts for J.B. to confirm.`,
   hero:[{v:C.n1(A),u:'km²',l:`${CITYN[city]} zones where a data centre is allowed`},{v:C.n1(100*A/TOT),u:'%',l:'of the city’s zoned area'},{v:qj,l:'jobs on this land'},{v:(100*lotKm/A)<0.1?'<0.1':C.n1(100*lotKm/A),u:'%',l:'of that land is this lot'}],
   rows:[['Lot zone',x.zone],['Lot area',C.n0(sel.lotArea)+' m²'],[city==='van'?'Regional designation':'District designation',qd],['Policy lines','draft: J.B. to confirm'],['Jobs figure',qj],['Minimum jobs in policy','none set (region measures jobs per area)']],
   more:[['What “industrial land” means here',`<p>The map shades the ${nz} mapped zone areas where the tool lists a data centre as permitted, conditional or discretionary. Other industrial zones and the designation layers are not mapped yet. Areas are the City’s zone polygons, summed (our arithmetic).</p>`],
         ['Weaknesses of the policy read','<p>Cowork’s self-check only; not independently checked. Metro 2050 itself was not read: quotes are from the Implementation Guideline, which says it does not replace the strategy. Vancouver’s 2023 framework is a staff report; Council adoption is ?. Edmonton’s data-centre page could not be read (blocked to automated reading). Edmonton’s Industrial Investment Action Plan was not used. The designation of this lot needs the map layers, not yet read.</p>']],
   src:['Zone polygons: City open data, tiles/'+city+'/meta.json; shaded = zones in tool/data/zones.json. Area and share: our arithmetic.',...(city==='van'?['Metro Vancouver, Metro 2050 Implementation Guideline: Industrial and Employment Lands (Nov 2023): https://metrovancouver.org/services/regional-planning/Documents/metro-2050-implementation-guideline-industrial-and-employment-lands.pdf (s. 2.0 pp. 4–5; 2.2.9 c) iii) p. 8).','City of Vancouver, Industrial Modernization and Intensification Framework, RTS 15772, 31 Oct 2023: https://council.vancouver.ca/20231114/documents/r4.pdf (pp. 1, 5, 6). Adoption: ?']:['City of Edmonton, District Plan | District Policy, office consolidation April 2026: https://webdocs.edmonton.ca/infraplan/plans_in_effect/District-Policy-Consolidation.pdf (2.5.3 p. 28; 2.5.3.1; 2.5.3.4).']),'Policy read: Claude Link/policy_read_industrial_land_2026-11-07.md (Cowork, 7 Nov 2026). Draft: J.B. to confirm.'],
   missing:['designation of this lot (map layer, date, licence)','regional industrial-land map','jobs figure','Vancouver 2023 framework: Council adoption']}; }});

/* M11 Approval process: the steps for this lot's path as a horizontal sequence, real names; who decides, notice. No timeline (dropped, J.B. 7 Nov: unsourced) */
C.add(T,'Approval process',{async build(x){
  const city=x.city, P=PROC[city], path=pathOf(x), steps=path==='rezoning'?P.rezone:P.steps, cn=CITYN[city];
  const list=a=>`<div class="f1c-mua-steps">${a.map((s,i)=>`<div class="f1c-mua-step"><div class="n">${i+1}</div><h4>${esc(s.n)}</h4><div class="w">${esc(s.w)}</div><p>${esc(s.t)}</p><span class="c">${esc(s.c)}</span></div>`).join('')}</div>`;
  const draw=`<div style="width:100%"><div style="font-size:12px;color:var(--f-mute);margin-bottom:6px">${esc(cn)} · ${esc(x.zone)} · ${esc(x.status.word)} · ${path==='rezoning'?'rezoning path':'development permit path'}</div>${list(steps)}
   <p class="f1c-note" style="margin-top:26px;max-width:760px">No timeline is shown: the sources give no single sourced duration for the whole process. The order of steps is our reading of the sources; who decides and the notice and appeal rules are the clauses named.</p></div>`;
  return {draw,lead:path==='rezoning'?`${cn}: Council decides after a public hearing.`:city==='van'?'The Director of Planning decides, or the Development Permit Board if public response warrants it. Neighbours may be notified.':'The Development Planner decides. Neighbours are notified by mail after approval, and anyone affected can appeal.',
   hero:[{v:String(steps.length),l:'steps on this lot’s path'},{v:path==='rezoning'?'Council':city==='van'?'Director':'Planner',l:'decides'},{v:P.appealWin,l:'appeal window'}],
   rows:[['Decides',P.decides],['Notice',P.notice],['Appeal to',P.appeal],['Appeal window',`${P.appealWin} (${P.appealCl})`],['Time to decision',C.q('no sourced figure; not shown')]],
   more:[['If the use were not listed: rezoning',list(P.rezone)],['Other approvals that run alongside','<p>Electrical service (utility), emissions or air permit for generators, and sewer and water connections. Who decides and the order are in the research file (municipal.md, later sections) and are not drawn here.</p>']],
   src:[`Steps, deciders, notice and appeal: ${SRC_M}, ${city==='van'?'§1a (ZDB s. 4, By-law 10200)':'§1b (Bylaw 20001 ss. 7.20, 7.100, 7.160, 7.170)'}.`,`Rezoning path: ${SRC_R}, ${city==='van'?'§1 and §2 (Charter, Metro 2050 guide)':'§3 (City page, EMRB REF)'}.`,'Path: tool/data/zones.json, '+x.zone+'. Processing times are left out (J.B., 7 Nov).'],
   missing:['time to decision (dropped: unsourced)']}; }});

/* M12 Report: the Municipal report pages (Municipal1 board is page 1; tool/templates.json has no Municipal report). Page 1 is drawn from this lot's rows; pages 2 and 3 are not built */
C.add(T,'Report',{async build(x){
  const city=x.city, st=x.status, sel=x.sel, zr=zonesOf(city)[x.key]||{}, m=await meta(city), sts=await BD.streets(city);
  let mp=''; if(sel.ring){ const b=C.bbox(sel.ring), cx=(b[0]+b[2])/2, cy=(b[1]+b[3])/2, R=420; mp=mapSvg(m,sts,sel,city,[cx-R,cy-R,cx+R,cy+R],110,110,null).svg; }
  const rules=(zr.cl||[]).map(c=>`<tr><td>${esc(c[0])}</td><td>${esc(c[1])}</td><td>${esc(c[2])}</td></tr>`).join('');
  const sheet=`<div class="f1c-mua-sheet"><div class="hd"><span>Beyond Data · Municipal report · ${esc(CITYN[city])} · ${esc(x.zone)}</span><span>1</span></div>
   <h5>${esc(x.addr)}: what the rules allow</h5><div class="ld">A data centre is a ${esc(st.word)} here: ${city==='van'?'the City decides':'the Development Planner decides'}.</div>
   <div class="top"><div>${mp}</div><div><div class="lb">Zone</div><div class="big">${esc(x.zone)}</div><div class="lb">Lot</div><div class="big">${esc(C.n0(sel.lotArea))} m²</div><div class="lb">Data centre</div><div class="big">${esc(st.word)}</div></div></div>
   <table><tr><th>Rule</th><th>What it says</th><th>Source</th></tr>${rules}</table></div>`;
  const off=(n,t)=>`<div class="f1c-mua-pg"><div class="cap">Page ${n}</div><div class="f1c-mua-sheet f1c-mua-off"><div>${esc(t)}<br><b class="f1c-q" style="font-size:20px;font-weight:400">?</b><br>not built yet</div></div></div>`;
  const draw=`<div class="f1c-mua-pages"><div class="f1c-mua-pg"><div class="cap">Page 1 · Parcel and rules (preview, drawn from this lot)</div>${sheet}</div>${off(2,'Lot edges: yards, noise limits and loading by edge')}${off(3,'Two cities: Vancouver and Edmonton side by side')}</div>
   <button class="f1c-mua-print" type="button" onclick="window.print()">Print page 1</button>`;
  return {draw,lead:'The report is three pages and a sources list. Page 1 is built from this lot’s rule rows; pages 2 and 3 wait for the edge and two-city cards.',
   hero:[{v:'1 of 3',l:'pages built'}],
   rows:[['Page 1 · Parcel and rules','built (board Municipal1)'],['Page 2 · Lot edges','not built'],['Page 3 · Two cities',C.q('not built')],['Sources','the clauses named on each row']],
   more:[['What is missing from page 1','<p>Rows for noise, building code and generators are on the Municipal1 board but are not in the zone rows; they come from the by-law cards that group b builds.</p>'],['Print','<p>The print button uses the browser’s print dialog (window.print) and prints page 1 only. Choose “Save as PDF” there.</p>']],
   src:['Page 1: tool/data/zones.json, '+x.zone+' rows and clauses; city overview tiles/'+city+'/meta.json. Layout: board Municipal1.png.','tool/templates.json has no Municipal report; the three pages are from Story_Municipal (M11 Report preview: “3 pages + sources”).'],
   missing:['Municipal report definition in tool/templates.json','page 2 Lot edges','page 3 Two cities','noise, building code and generator rows for page 1']}; }});
})();
