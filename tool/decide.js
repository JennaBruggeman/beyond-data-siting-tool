/* Beyond Data — decisions as cards (J.B., 17 Oct 2026: "a card walking you through the downsides, upsides … an animation on the card of a new
   building or a retrofit, or leasing space. Then you would click next, and the card and animation would change to support the next trade-off
   and decision"). One decision per card: an animation of the option picked, its upsides and downsides, the choices as one compact row, and
   what fits as it stands. Replaces the five set-up forms. Answers are the same as before, so every other part of the tool reads them unchanged.
   Upsides and downsides are short and come from the register's notes for each option; where a figure is not sourced, the card says so. */
(function(){
'use strict';
const BD=window.BD; const {$,esc,fmt}=BD;
const K=t=>`<span class="k">${t}</span>`;
const C={acc:'#CC746C',heat:'#d0705f',water:'#3f97c6',power:'#b8861c',place:'#3fa57e',mat:'#9184e0',edge:'#55585d',line:'#3c4148',ink:'#e9e6e1',muted:'#9d9a94'};

/* ---------- small animated drawings (schematic, not to scale) ---------- */
const NS='http://www.w3.org/2000/svg';
function S(inner,label){ return `<svg viewBox="0 0 460 300" role="img" aria-label="${esc(label)}"><line x1="20" y1="260" x2="440" y2="260" stroke="${C.line}"/>${inner}</svg>`; }
const T=(x,y,s,o)=>{ o=o||{}; return `<text x="${x}" y="${y}" fill="${o.c||C.muted}" font-size="${o.s||11.5}" text-anchor="${o.a||'start'}">${esc(s)}</text>`; };
const floors=(x,y0,w,n,h,o)=>{ o=o||{}; let s=''; for(let i=0;i<n;i++){ const y=y0-(i+1)*h; s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${o.hi&&o.hi.includes(i)?'rgba(204,116,108,.18)':'#1b1c1f'}" stroke="${o.hi&&o.hi.includes(i)?C.acc:C.edge}" stroke-width="1.2" class="${o.rise?'drise':''}" style="animation-delay:${(i*0.18).toFixed(2)}s"/>`; } return s; };
const racks=(x,y,n,c)=>{ let s=''; for(let i=0;i<n;i++) s+=`<rect x="${x+i*16}" y="${y}" width="10" height="${c||22}" rx="1.5" fill="none" stroke="${C.ink}" stroke-width="1" class="dfade" style="animation-delay:${(0.6+i*0.08).toFixed(2)}s"/>`; return s; };
const coolers=(x,y,n,o)=>{ o=o||{}; let s=''; for(let i=0;i<n;i++) s+=`<g class="dfade" style="animation-delay:${(0.9+i*0.1).toFixed(2)}s"><rect x="${x+i*30}" y="${y}" width="24" height="10" fill="#1b1c1f" stroke="${o.c||C.ink}" stroke-width="1"/><circle cx="${x+i*30+12}" cy="${y+5}" r="3.5" fill="none" stroke="${o.c||C.ink}" class="dspin"/></g>`; return s; };
const flowP=(d,c,o)=>`<path d="${d}" stroke="${c}" stroke-width="${(o&&o.w)||2}" fill="none" class="xflow${o&&o.slow?' slow':''}${o&&o.rev?' rev':''}" stroke-linecap="round"/>`;
const A_={
 new:()=>S(`<rect x="70" y="252" width="320" height="8" fill="none" stroke="${C.acc}" stroke-dasharray="4 3"/>${floors(110,260,240,3,40,{rise:1})}${racks(130,196,12)}${T(70,280,'the lot: a new building sized to the zone')}`,'A new building rising on the lot'),
 shared:()=>S(`${floors(150,260,160,6,32,{rise:1,hi:[1,2]})}${T(320,215,'data centre floors',{c:C.acc})}${T(320,140,'homes or offices above')}${T(320,250,'street use at grade')}`,'A shared building'),
 retrofit:()=>S(`${floors(110,260,240,3,40)}<rect x="110" y="140" width="240" height="120" fill="none" stroke="${C.muted}" stroke-dasharray="2 3"/>${racks(130,196,12)}${coolers(140,126,6)}${T(110,280,'an existing building, fitted out: racks in, plant on the roof')}`,'An existing building fitted out'),
 lease:()=>S(`${floors(170,260,120,7,30,{hi:[3]})}<rect x="170" y="140" width="120" height="30" fill="rgba(204,116,108,.25)" class="dpulse"/>${racks(178,146,7,18)}${T(300,158,'one leased floor',{c:C.acc})}${T(300,175,'power and cooling')}${T(300,190,'shared with the landlord')}`,'One leased floor in a tower'),
 floor:k=>{ const lv={basement:-1,ground:0,upper:3,roof:6}[k]; return S(`${floors(170,260,120,6,30,{hi:lv>=0&&lv<6?[lv]:[]})}${lv<0?`<rect x="170" y="262" width="120" height="26" fill="rgba(204,116,108,.18)" stroke="${C.acc}"/>`:''}${lv===6?coolers(178,70,3,{c:C.acc})+racks(178,60,0):''}${T(300,lv<0?280:lv===6?80:250-lv*30,{basement:'below grade',ground:'at the street',upper:'an upper floor',roof:'on the roof'}[k],{c:C.acc})}`,'The floor used'); },
 foot:(k,m)=>{ const share=k==='cover'?(BD.S.answers.cover||70)/100:k==='existing'?0.45:0.82; const w=Math.round(300*Math.sqrt(share)), d=Math.round(120*Math.sqrt(share));
   return S(`<polygon points="80,250 380,250 420,200 120,200" fill="none" stroke="${C.acc}" stroke-dasharray="4 3"/><polygon class="dgrow" points="${250-w/2},${245} ${250+w/2},${245} ${250+w/2+d*0.33},${245-d*0.4} ${250-w/2+d*0.33},${245-d*0.4}" fill="rgba(204,116,108,.18)" stroke="${C.acc}"/>${T(80,280,'the lot (dashed) and the floor plate')}${T(330,190,k==='cover'?`${BD.S.answers.cover||70}% of the lot`:k==='existing'?'as the existing building':'most the zone allows',{c:C.acc})}`,'Footprint on the lot'); },
 height:(k,m)=>{ const n=m&&m.nF?m.nF[0]:3, lim=m?m.H:18; return S(`${floors(170,260,120,Math.min(7,n),Math.min(36,200/Math.max(1,n)),{rise:1})}<line x1="140" x2="320" y1="${260-Math.min(220,lim*6)}" y2="${260-Math.min(220,lim*6)}" stroke="${C.acc}" stroke-dasharray="5 4"/>${T(325,264-Math.min(220,lim*6),`${lim.toFixed(1)} m`,{c:C.acc})}${T(20,280,'data-hall floors are tall: 5.5–6.0 m each')}`,'Storeys under the height limit'); },
 air:()=>S(`${racks(80,170,8,60)}${flowP('M70,250 C120,250 120,160 180,160 C240,160 240,250 300,250',C.water,{})}${flowP('M300,150 C340,140 360,100 400,90',C.heat,{})}${T(300,80,'warm air, 25–35 °C')}${T(70,280,'fans move air through the racks and coils')}`,'Air cooling'),
 plate:()=>S(`${racks(80,170,8,60)}${[0,1,2,3,4,5,6,7].map(i=>flowP(`M${85+i*16},180 V150 H230`,C.heat,{w:1.4})).join('')}${flowP('M230,150 C300,150 320,110 400,100',C.heat,{w:3})}${T(260,90,'warm liquid, easier to reuse')}${T(70,280,'pipes carry heat from each chip')}`,'Liquid to the chip'),
 immersion:()=>S(`<rect x="90" y="170" width="200" height="80" rx="4" fill="rgba(63,151,198,.15)" stroke="${C.water}"/>${racks(105,180,10,58)}${[0,1,2,3,4,5].map(i=>`<circle cx="${120+i*30}" cy="230" r="2.5" fill="${C.water}" class="dbub" style="animation-delay:${i*0.3}s"/>`).join('')}${flowP('M290,200 C340,200 360,140 400,130',C.heat,{w:3})}${T(70,280,'servers sit in a fluid bath')}`,'Immersion cooling'),
 dry:()=>S(`${floors(80,260,140,2,40)}${coolers(240,200,6)}${[0,1,2].map(i=>flowP(`M${252+i*60},195 V120`,C.muted,{slow:1})).join('')}${T(240,110,'fans; no water')}${T(70,280,'a closed loop to coils outside')}`,'Dry coolers'),
 towers:()=>S(`${floors(80,260,140,2,40)}<rect x="260" y="150" width="110" height="90" fill="none" stroke="${C.water}"/>${[0,1,2,3].map(i=>flowP(`M${280+i*24},160 V232`,C.water,{w:1.3})).join('')}${flowP('M315,150 C305,120 335,110 325,80',C.muted,{slow:1})}${T(335,95,'vapour')}${flowP('M315,240 V270 H420',C.water,{slow:1})}${T(330,290,'blowdown to the sewer')}`,'Cooling towers'),
 hybrid:()=>S(`${floors(80,260,140,2,40)}${coolers(240,200,6)}<g class="dspray">${[0,1,2,3,4,5].map(i=>flowP(`M${248+i*30},180 v14`,C.water,{w:1.3})).join('')}${T(240,170,'spray on hot days',{c:C.water})}</g>${T(70,280,'dry most of the year')}`,'Hybrid coolers'),
 plantAt:k=>S(`${floors(110,260,160,k==='yard'?2:3,36)}${k!=='yard'?coolers(118,260-3*36-12,k==='split'?3:5):''}${k!=='roof'?coolers(290,248,k==='split'?3:5):''}${T(20,280,k==='roof'?'plant on the roof; the yard stays free':k==='yard'?'plant in the yard; a shorter building':'half on the roof, half in the yard')}`,'Where the plant goes'),
 spares:k=>{ const n=4, extra=k==='n'?0:k==='n1'?1:4; let s=''; for(let i=0;i<n;i++) s+=`<rect x="${70+i*44}" y="150" width="34" height="22" fill="none" stroke="${C.ink}" class="${i===1?'dfail':''}"/>`;
   for(let i=0;i<extra;i++) s+=`<rect x="${70+(n+i)*44-(k==='2n'?n*44:0)}" y="${k==='2n'?190:150}" width="34" height="22" fill="none" stroke="${C.acc}" stroke-dasharray="3 2" class="dtake"/>`;
   return S(s+T(70,130,'one unit fails')+T(70,280,k==='n'?'no spare: the failed unit is lost capacity':k==='n1'?'one spare takes over':'a second, independent system'),'Spare units'); },
 gens:k=>S(`<line x1="40" y1="120" x2="160" y2="120" stroke="${C.power}" stroke-width="2" class="dcut"/>${T(40,110,'grid')}${floors(170,260,120,3,36)}<rect x="300" y="200" width="40" height="22" fill="none" stroke="${C.mat}"/>${T(300,240,'UPS: minutes')}${k!=='none'?`<rect x="${k==='roof'?190:360}" y="${k==='roof'?138:226}" width="60" height="26" fill="none" stroke="${C.power}" class="dstart"/>${flowP(`M${k==='roof'?220:390},${k==='roof'?138:226} c0,-20 10,-30 0,-50`,C.muted,{slow:1})}${T(k==='roof'?190:350,k==='roof'?128:216,'generator starts',{c:C.power})}`:T(300,190,'no generator: grid and UPS only',{c:C.acc})}`,'Standby power'),
};

/* ---------- the decisions, in order ---------- */
const BUILT=[
 {v:'new',set:{built:'new',extent:'whole'},t:'New building',a:'new',up:['Sized to the zone: floor area, height, setbacks','Floors can be built tall and strong for data halls (5.5–6.0 m floors)'],down:['A development permit, and the time it takes','New construction carries embodied carbon (about 461 kg CO₂e per m² as a median for buildings; no data-centre figure)']},
 {v:'shared',set:{built:'new',extent:'part'},t:'Share a new building',a:'shared',up:['Other uses on the same lot, often the street floor','Neighbours in the building who could take the heat'],down:['Data-hall floors are taller than homes or offices','Sound and vibration have to be kept from the other uses (not modelled)']},
 {v:'retrofit',set:{built:'existing',extent:'whole'},t:'Retrofit an existing building',a:'retrofit',up:['Reuses a structure that is already standing','No new building to permit'],down:['Floor heights and floor loads may not suit server racks (checked against NBC 2020 loads)','Plant has to fit what the roof and yard already allow']},
 {v:'lease',set:{built:'existing',extent:'part'},t:'Lease space in a building',a:'lease',up:['The smallest step: one floor, nothing new to build','Can start with a small load'],down:['Limited by that floor\'s load, height and power','Plant and generators go where the landlord allows']},
];
const builtOf=A=>A.built==='existing'?(A.extent==='part'?'lease':'retrofit'):(A.extent==='part'?'shared':'new');
const DECK=[
 {id:'built',q:'What is being built?',k:A=>builtOf(A),opts:()=>BUILT,set:(A,v)=>Object.assign(A,BUILT.find(o=>o.v===v).set),anim:v=>A_[BUILT.find(o=>o.v===v).a]()},
 {id:'floor',when:A=>A.built==='existing'&&A.extent==='part',q:'Which floor?',k:A=>A.floor||'upper',opts:()=>[
   {v:'basement',t:'Basement',up:['Out of sight and sound','Ground keeps the street'],down:['Flood risk below grade (Vancouver flood construction level)','Plant still needs air outside']},
   {v:'ground',t:'Ground floor',up:['Heavy floors are easiest at grade','Easy loading'],down:['Takes the street frontage','Some zones keep the ground floor for other uses']},
   {v:'upper',t:'Upper floor',up:['Leaves the street floor to others'],down:['Floor load and height of an office floor may not suit racks','Fuel limits on upper storeys (NFC 2020)']},
   {v:'roof',t:'Roof',up:['Plant sits right beside the servers'],down:['Structure and space on the roof are tight','Visible, and closest to neighbours\' windows']}],set:(A,v)=>{ A.floor=v; },anim:v=>A_.floor(v)},
 {id:'foot',when:A=>A.built==='new',q:'How much of the lot does it cover?',k:A=>A.foot||'max',opts:m=>[
   {v:'max',t:'Most the zone allows',up:['The most floor area, so the most that fits'],down:['Least open land left for other uses, rain, or a borefield']},
   {v:'existing',t:'Match the existing building',up:['Keeps today\'s footprint and the land around it'],down:['Less floor area'+(m&&m.footArea?'':''),'Only possible where a building is recorded']},
   {v:'cover',t:'Set the coverage',up:['Choose the trade between floor area and open land'],down:['Less floor area, so less fits']}],set:(A,v)=>{ A.foot=v; },anim:(v,m)=>A_.foot(v,m),extra:A=>A.foot==='cover'?`<label class="dnum">Coverage <input type="range" id="dcov" min="20" max="100" step="5" value="${A.cover||70}"> <b id="dcovv">${A.cover||70}%</b></label>`:''},
 {id:'height',when:A=>A.built==='new',q:'How tall?',k:A=>A.hmode||'out',opts:m=>{ const Z=m.Z; return [
   {v:'out',t:`Outright: ${Z.hOutright} m`,up:['No discretion needed from the City'],down:['Fewer storeys of tall data-hall floors']}]
   .concat(Z.hx&&!BD.S.answers.userH?[{v:'cond',t:`With approval: ${Z.hx[0]===Z.hx[1]?Z.hx[0]:Z.hx[0]+'–'+Z.hx[1]} m`,up:['More storeys, more that fits'],down:['Depends on the City\'s discretion and a longer review']}]:[])
   .concat([{v:'storeys',t:'Set the storeys',up:['Test a specific building'],down:['May exceed what the zone allows (the tool warns)']}]); },set:(A,v)=>{ A.hmode=v; },anim:(v,m)=>A_.height(v,m),extra:A=>A.hmode==='storeys'?`<label class="dnum">Storeys <input type="number" id="dsto" min="1" max="12" value="${A.storeys||2}"></label>`:''},
 {id:'inside',q:'How are the servers cooled?',k:A=>A.inside||'air',opts:()=>[
   {v:'air',t:'Air',up:['The most common: 75% of operators use room air cooling (Uptime 2025 survey)','Simple, well known'],down:['Heat leaves at about 25–35 °C, too cool to reuse without a heat pump']},
   {v:'plate',t:'Liquid to the chip',up:['48–75% of the heat caught in liquid (LBNL, NREL)','Warmer heat, easier to reuse'],down:['Plumbing to every server','The rest of the heat still needs air']},
   {v:'immersion',t:'Immersion',up:['Servers sit in fluid; few or no server fans'],down:['How much heat it catches is not yet sourced','Special tanks and fluids; heavy floors']}],set:(A,v)=>{ A.inside=v; },anim:v=>A_[v]()},
 {id:'outside',q:'How does the heat leave?',k:A=>A.outside||'dry',opts:()=>[
   {v:'dry',t:'Dry coolers',up:['No water at all','Simple closed loop'],down:['The most space: about 1.2 MW per 12 m unit','Fan noise, most on hot days']},
   {v:'towers',t:'Cooling towers',up:['Smallest and fewest units'],down:['Evaporates up to 1.5 L of water per kWh of heat','Blowdown to the sewer; operating permit and Legionella testing']},
   {v:'hybrid',t:'Hybrid coolers',up:['Water only on hot days: about 12% of the year in Vancouver, 10% in Edmonton'],down:['Uses water on the hottest days','Vancouver treats them like a cooling tower']}],set:(A,v)=>{ A.outside=v; },anim:v=>A_[v]()},
 {id:'plantAt',q:'Where does the plant go?',k:A=>A.plantAt||'roof',opts:()=>[
   {v:'roof',t:'Roof',up:['Keeps the yard free'],down:['Needs roof space and structure','Seen from above, and heard from upper windows']},
   {v:'yard',t:'Yard',up:['Easy to reach and service'],down:['The building gets shorter to leave room','Seen and heard from the street']},
   {v:'split',t:'Split',up:['Balances roof and yard'],down:['Two plant areas to screen']}],set:(A,v)=>{ A.plantAt=v; },anim:v=>A_.plantAt(v)},
 {id:'spares',q:'How many spare units?',k:A=>A.spares||'n1',opts:()=>[
   {v:'n',t:'None (N)',up:['The least equipment'],down:['Any failure cuts capacity (like Uptime Tier I)']},
   {v:'n1',t:'One spare (N+1)',up:['One unit can fail and the load is still carried (like Tier II–III)'],down:['One more unit on site']},
   {v:'2n',t:'Double (2N)',up:['Two independent systems (like Tier IV)'],down:['Twice the equipment, space and noise sources']}],set:(A,v)=>{ A.spares=v; },anim:v=>A_.spares(v)},
 {id:'gens',q:'What if the grid fails?',k:A=>A.gens==='none'?'none':(A.genAt||'yard'),opts:()=>[
   {v:'yard',t:'Generators in the yard',up:['The usual arrangement; carries the full load'],down:['Fuel stored on site (fire code limits)','Test runs: Vancouver exempts up to 1 h a month in daytime, at most 80 dBA']},
   {v:'roof',t:'Generators on the roof',up:['Frees the yard'],down:['Very heavy; done on a Paris-region conversion (DRIEE 2010)','Fuel on an upper storey']},
   {v:'none',t:'No generators',up:['No fuel and no test noise'],down:['Relies on the grid and minutes of UPS batteries']}],set:(A,v)=>{ if(v==='none') A.gens='none'; else { A.gens='yes'; A.genAt=v; } },anim:v=>A_.gens(v)},
];
const live=()=>DECK.filter(d=>!d.when||d.when(BD.S.answers));

/* ---------- is this option possible on this parcel? (J.B., 17 Oct: "if the parcel is empty, explain that this isn't possible") ----------
   yes = possible here · chg = possible, with a condition · nk = not yet known · no = not possible here, with the reason */
function site(){ const f=BD.eng.siteFacts(), sel=BD.S.sel, bl=(sel.blds||[]).filter(b=>b.f!==3), hmax=bl.length?Math.max(...bl.map(b=>b.h||0)):0;
  return {f,bl,hmax,src:f.city==='van'?'City LiDAR 2022':'City 3D buildings',z:f.zone||'—',st:f.status||{k:'',t:''},env:f.env}; }
const FEAS={
 built:{
  new:x=>x.st.k==='no'||x.st.k==='low'?{s:'chg',why:`Zone ${x.z} does not allow a data centre: a rezoning would come first.`}:x.st.k==='site'?{s:'chg',why:`Zone ${x.z} has site-specific rules; the tool uses I-2 limits as if rezoned, for comparison.`}:{s:'yes',why:`A data centre is ${x.st.t.toLowerCase()} in zone ${x.z}.`},
  shared:x=>x.env&&x.env.ground?{s:'chg',why:`Zone ${x.z} keeps data storage off the ground floor, so a shared building, with another use at the street, is the form the zone points to. Whether homes or offices may go above has not been read.`}:{s:'nk',why:`Whether other uses may share a data-centre building in zone ${x.z} has not been read.`},
  retrofit:x=>x.bl.length?{s:'yes',why:`${x.bl.length} building${x.bl.length>1?'s':''} on the lot, the tallest ${x.hmax.toFixed(0)} m (${x.src}). Whether its floors carry server loads is not checked here.`}:{s:'no',why:`No building is recorded on this lot (${x.src}), so there is nothing to retrofit.`},
  lease:x=>!x.bl.length?{s:'no',why:`No building is recorded on this lot (${x.src}), so there is no space to lease.`}:x.hmax<8?{s:'chg',why:`The building is about ${x.hmax.toFixed(0)} m tall: one or two storeys, so a floor is most of it.`}:{s:'yes',why:`A building of about ${x.hmax.toFixed(0)} m stands here (${x.src}).`}},
 floor:{
  basement:x=>({s:'nk',why:'Whether the building has a basement is not recorded.'}),
  upper:x=>x.hmax<8?{s:'no',why:`The building is about ${x.hmax.toFixed(0)} m tall: there is no upper floor.`}:{s:'yes',why:''},
  ground:x=>x.env&&x.env.ground?{s:'no',why:`Zone ${x.z} keeps data storage off the ground floor.`}:{s:'yes',why:''}},
 foot:{ existing:x=>x.bl.length?{s:'yes',why:''}:{s:'no',why:`No building is recorded on this lot (${x.src}) to match.`} },
 inside:{ immersion:x=>({s:'nk',why:'How much of the heat immersion catches is not yet sourced.'}) },
 outside:{ towers:x=>({s:'chg',why:x.f.city==='van'?'Needs an operating permit and monthly Legionella testing (VBBL).':'Needs water treatment and Legionella control.'}), hybrid:x=>x.f.city==='van'?{s:'chg',why:'Vancouver treats them like a cooling tower: the same permit.'}:{s:'yes',why:''} },
 gens:{ roof:x=>({s:'chg',why:'Fuel on an upper storey is limited by the fire code (NFC 2020); the roof must carry the sets.'}) },
};
const feas=(id,v)=>{ const F=FEAS[id]&&FEAS[id][v]; return F?F(site()):{s:'yes',why:''}; };
const FS={yes:['Possible here','#8fb996','✓'],chg:['Possible, with a condition','#cdb07a','~'],nk:['Not yet known','#9d9a94','?'],no:['Not possible here','#e39a93','✕']};

/* what each option would mean here, worked out with the model itself (answers swapped in, then put back) */
function tryAnswers(set,fn){ const A=BD.S.answers, keep=JSON.stringify(A); Object.assign(A,set,{mw:null}); BD.modelReset(); let r; try{ r=fn(); }catch(e){ r=null; } const back=JSON.parse(keep); for(const k of Object.keys(A)) delete A[k]; Object.assign(A,back); BD.modelReset(); return r; }
const fitOf=set=>tryAnswers(set,()=>{ const f=BD.eng.siteFacts(), m=BD.model(); return {mw:f.mw,gross:f.gross,short:m&&m.plant?m.plant.short:'',warn:m?m.warn:[]}; });
const setOf=(d,v)=>{ const o={}; const A0=BD.S.answers; const tmp=Object.assign({},A0); d.set(tmp,v); for(const k in tmp) if(tmp[k]!==A0[k]) o[k]=tmp[k]; return o; };
const V=()=>BD.viz;
const CH={
 built:(h,d,opts)=>{ const rows=opts.map(o=>{ const fs=feas(d.id,o.v); if(fs.s==='no') return {label:o.t,v:0,c:V().C.other,note:'not possible here'}; const r=fitOf(setOf(d,o.v)); return {label:o.t,lo:r.mw[0],hi:r.mw[1],c:o.v===d.k(BD.S.answers)?V().C.heat:V().C.other}; });
   V().bars(h,rows,'MW of servers','Servers that fit, by option'); return 'Servers that fit here, for each option. Grey bars are the options not picked; "none" means not possible here.'; },
 foot:(h,d,opts)=>{ V().bars(h,opts.filter(o=>feas(d.id,o.v).s!=='no').map(o=>{ const r=fitOf(setOf(d,o.v)); return {label:o.t,lo:r.gross[0],hi:r.gross[1],c:o.v===d.k(BD.S.answers)?V().C.heat:V().C.other}; }),'m² of floor','Floor area, by option'); return 'Floor area for each choice.'; },
 height:(h,d,opts)=>{ V().bars(h,opts.filter(o=>o.v!=='storeys').map(o=>{ const r=fitOf(setOf(d,o.v)); return {label:o.t,lo:r.mw[0],hi:r.mw[1],c:o.v===d.k(BD.S.answers)?V().C.heat:V().C.other}; }),'MW of servers','Servers that fit, by height'); return 'Servers that fit at each height.'; },
 inside:(h)=>{ const R=BD.eng.R; V().bars(h,[{label:'Air',v:0,c:V().C.other,note:'heat leaves in air at 25–35 °C'},{label:'Liquid to the chip',lo:R.capture[0]*100,hi:R.capture[1]*100,c:V().C.heat},{label:'Immersion',v:0,c:V().C.other,note:'not yet sourced'}],'% of heat caught in liquid','Heat caught in liquid'); return 'Share of server heat caught in liquid, where it is easiest to reuse. Immersion: not yet sourced.'; },
 outside:(h,d,opts)=>{ const A=BD.S.answers, mw=A.mw||(BD.model()&&BD.model().mwSized)||1; const rows=opts.map(o=>{ const s=BD.plant.sizeFor(mw,Object.assign({},A,{outside:o.v})); return {label:o.t,v:s.n*s.k.L*s.k.W,c:o.v===A.outside?V().C.heat:V().C.other,note:s.n+' units'}; });
   V().bars(h,rows,'m² of units','Plant area, by system'); return `Area of the units alone for ${(+mw).toFixed(1)} MW (clearances add more). Water: dry none; towers evaporate up to 1.5 L per kWh of heat.`; },
 plantAt:(h,d,opts)=>{ V().bars(h,opts.map(o=>{ const r=fitOf(setOf(d,o.v)); return {label:o.t,lo:r.mw[0],hi:r.mw[1],c:o.v===d.k(BD.S.answers)?V().C.heat:V().C.other,note:r.short||''}; }),'MW of servers','Servers that fit, by plant position'); return 'Plant in the yard takes floor area from the building.'; },
 spares:(h,d,opts)=>{ const A=BD.S.answers, mw=A.mw||(BD.model()&&BD.model().mwSized)||1; V().bars(h,opts.map(o=>{ const s=BD.plant.sizeFor(mw,Object.assign({},A,{spares:o.v})); return {label:o.t,v:s.n,c:o.v===A.spares?V().C.heat:V().C.other}; }),'cooling units','Units, by spares'); return `Cooling units for ${(+mw).toFixed(1)} MW (the size the set-up is drawn at).`; },
 gens:(h)=>{ const e=BD.eng, f=e.siteFacts(), A=BD.S.answers, r=e.calc({mw:A.mw||(BD.model()&&BD.model().mwSized)||1,recover:false},f,[],[]); V().bars(h,[{label:'Fuel for 12 h',lo:r.fuel[0],hi:r.fuel[1],c:V().C.power}],'litres','Fuel stored on site'); return 'Diesel kept on site to run the generators for 12 hours at full load.'; },
};
const DEMO={built:{new:'new',shared:'share',retrofit:'retrofit',lease:'lease'},floor:{basement:'lease',ground:'lease',upper:'lease',roof:'lease'},foot:{max:'new',existing:'new',cover:'new'},height:{out:'new',cond:'new',storeys:'new'}};

/* ---------- the card: in the panel, with the live 3D as its picture ---------- */
const SVGONLY=new Set(['inside','spares']);
let at=0; const pv={};
function show(i){ const A=BD.S.answers; const L=live(); at=Math.max(0,Math.min(L.length-1,i)); const d=L[at]; const m=BD.model(); if(!m) return;
  const opts=d.opts(m), cur=d.k(A), pick=pv[d.id]&&opts.find(x=>x.v===pv[d.id])?pv[d.id]:cur, o=opts.find(x=>x.v===pick)||opts[0]; const fs=feas(d.id,o.v), F=FS[fs.s]; const f=BD.eng.siteFacts();
  if(BD.drawer&&BD.drawer.isOpen()) BD.drawer.close();
  const res=f.mw[1]<0.05?`${K('Nothing fits')} with these choices`:`${K(BD.eng.rng(f.mw[0],f.mw[1],'MW'))} of servers fit · ${BD.eng.rng(f.gross[0],f.gross[1],'m²')} floor`;
  const no=fs.s==='no';
  $('#side').innerHTML=`<div class="dk"><div class="kind">Set up the site · ${at+1} of ${L.length}</div><div class="dbar">${L.map((x,j)=>`<i class="${j<at?'done':j===at?'on':''}"></i>`).join('')}</div>
   <h2>${esc(d.q)}</h2>
   <div class="dch" role="radiogroup">${opts.map(x=>{ const s=feas(d.id,x.v).s; return `<button role="radio" data-v="${x.v}" aria-checked="${x.v===o.v}" class="${s==='no'?'nope':''}" title="${esc(FS[s][0])}">${s==='no'?'✕ ':''}${esc(x.t)}</button>`; }).join('')}</div>
   ${no?`<div class="dnope"><b>${F[2]} ${F[0]}</b><span>${esc(fs.why)}</span></div>`:(SVGONLY.has(d.id)?`<div class="dvis">${d.anim(o.v,m)}</div>`:'<div class="c3d"></div>')}
   ${!no?`<div class="dfeas" style="--fc:${F[1]}"><b>${F[2]} ${F[0]}</b>${fs.why?` <span>${esc(fs.why)}</span>`:''}</div>`:''}${!no&&d.extra?d.extra(A):''}
   <div class="dud"><div><div class="dh up">Upsides</div><ul>${o.up.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div><div><div class="dh dn">Downsides</div><ul>${o.down.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div></div>
   ${CH[d.id]?'<div class="dchart" id="dchart"></div><p class="dcap" id="dcap"></p>':''}
   <p class="dres">${no?'Not picked: the site stays as set up. ':''}${res}${m.warn&&m.warn.length?`<br><span class="dwarn">${esc(m.warn[0])}</span>`:''}</p>
   <div class="dnav"><button class="sec" id="dB">← ${at?'Back':'The site'}</button><button class="pri" id="dN">${at<L.length-1?'Next →':'What fits here →'}</button></div></div>`;
  const el=$('#side');
  el.querySelectorAll('.dch button').forEach(b=>b.onclick=()=>{ const v=b.dataset.v; if(feas(d.id,v).s==='no'){ pv[d.id]=v; show(at); return; } pv[d.id]=null; d.set(A,v); changed(); });
  const cov=$('#dcov'); if(cov){ cov.oninput=()=>{ $('#dcovv').textContent=cov.value+'%'; }; cov.onchange=()=>{ A.cover=+cov.value; changed(); }; }
  const sto=$('#dsto'); if(sto) sto.onchange=()=>{ A.storeys=Math.max(1,Math.min(12,+sto.value||1)); changed(); };
  $('#dB').onclick=()=>{ pv[d.id]=null; if(at) show(at-1); else if(BD.flow&&BD.flow.on) BD.flow.back(); else BD.card(); };
  $('#dN').onclick=()=>{ pv[d.id]=null; if(at<live().length-1) show(at+1); else { A.setupDone=true; if(BD.flow&&BD.flow.on) BD.flow.next(); else BD.fitsView(); } };
  if(CH[d.id]&&BD.viz){ try{ const cap=CH[d.id]($('#dchart'),d,opts); $('#dcap').textContent=cap||''; }catch(e){ console.warn(e); } }
  if(!no){ const p=BD.showModel?BD.showModel():null; const kind=DEMO[d.id]&&DEMO[d.id][o.v]; if(p&&p.then) p.then(()=>{ if(kind&&BD.scene3d&&BD.scene3d.demo) BD.scene3d.demo(kind); }); } }
function changed(){ const A=BD.S.answers; A.mw=null; BD.modelReset(); const id=live()[at]&&live()[at].id; const j=live().findIndex(d=>d.id===id); show(j<0?at:j); }
// the old five steps map onto cards: 1 built, 2 footprint, 3 height, 4 cooling, 5 standby
const OLD={1:'built',2:'foot',3:'height',4:'inside',5:'gens'};
const orig=BD.setup.card;
BD.setup.card=step=>{ const j=live().findIndex(d=>d.id===OLD[step]); show(j<0?0:j); };
BD.setup.start=()=>show(0);
BD.deck={show,DECK};
})();
