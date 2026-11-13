/* Beyond Data — F1 Architecture cards, group 'typ' (CODE_JOB_F1 step 2). Registers its cards with BD.f1cards (see f1cards.js, f1arch.js).
   Cards 9 Pick a typology, 10 Variant and add-ons, 11 The governing principle, 12 The numbers, 13 What’s left for neighbours.
   Everything is read from the tool as it stands: tool/data/arch.json (typology library), Arrange's placement (BD.f1cards.arch), BD.archTest, BD.plan.build, BD.eng.
   10 Nov 2026: with the Emergency hub, plans, areas and MW come from the hub's layout (hub.js, rule sheet v1; C.v1, C.budgetsV1), as on the Rooms card. */
(function(){
'use strict';
const BD=window.BD, C=BD.f1cards, K=C.K, esc=C.esc, T='architecture', n0=C.n0, n1=C.n1, q=C.q;
const CHIP='Draft plan · rule sheet v1', FONT='IBM Plex Sans,system-ui,sans-serif';
if(!document.getElementById('f1c-typ')){ const st=document.createElement('style'); st.id='f1c-typ'; st.textContent=`
.f1c-typ-tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;width:100%;max-width:900px}
.f1c-typ-tile{border:1px solid ${K.rule};background:#fff;padding:14px 16px 12px;display:flex;flex-direction:column;gap:6px;min-height:0}
.f1c-typ-tile.on{border:1.8px solid ${K.ink}}
.f1c-typ-tile.off{color:${K.faint};border-style:dashed}
.f1c-typ-tile .h{font-size:15px;color:${K.ink}}
.f1c-typ-tile.off .h{color:${K.mute}}
.f1c-typ-tile .art{height:88px;display:flex;align-items:center;justify-content:center}
.f1c-typ-tile .s{font-size:12.5px;color:${K.ink2};line-height:1.45}
.f1c-typ-tile .n{font-size:11.5px;color:${K.mute};line-height:1.45}
.f1c-typ-tile .n.red,.f1c-typ-tile .s.red{color:${K.red}}
.f1c-typ-sm{grid-template-columns:repeat(4,minmax(0,1fr));max-width:900px}
.f1c-typ-sm .f1c-typ-tile{min-height:0;gap:3px;padding:10px 14px}
.f1c-typ-h{font-size:15px;color:${K.ink};margin:12px 0 8px;width:100%;max-width:900px}
.f1c-typ-wrap{display:flex;flex-direction:column;align-items:center;width:100%}
.f1c-typ-tab{display:inline-block;font-size:12.5px;border:1px solid ${K.rule};border-radius:999px;padding:5px 12px;margin:0 6px 0 0;color:${K.ink2}}
.f1c-typ-tab.on{background:${K.ink};border-color:${K.ink};color:#fff}
.f1c-typ-tab.off{color:${K.faint};border-style:dashed}
.f1c-typ-tbl{display:grid;grid-template-columns:18px 1fr auto auto;gap:0 14px;align-items:center;width:100%;font-size:13px}
.f1c-typ-tbl>*{padding:9px 0;border-bottom:1px solid ${K.hair}}
.f1c-typ-tbl i{display:block;width:12px;height:12px;border-radius:2px}
.f1c-typ-tbl .r{text-align:right;color:${K.ink2}}
.f1c-typ-stats{display:flex;flex-direction:column;gap:20px;min-width:190px}
.f1c-typ-stats .l{font-size:12px;color:${K.mute}}
.f1c-typ-stats .v{font-size:30px;font-weight:300;line-height:1.15;color:${K.ink}}
.f1c-typ-stats .v span{font-size:14px;color:${K.mute};margin-left:5px}
.f1c-typ-pl{display:flex;gap:40px;justify-content:center}.f1c-typ-pl figure{margin:0}.f1c-typ-pl figcaption{font-size:13px;color:${K.ink};margin-bottom:6px}.f1c-typ-pl svg{display:block;width:auto;height:auto;max-width:none}
.f1c-typ-row{display:flex;gap:44px;align-items:flex-start;width:100%;max-width:940px;margin-top:18px}
.f1c-typ-row>.f1c-typ-tbl{flex:1 1 auto}
`; document.head.appendChild(st); }

const short=b=>String((b.p&&b.p.name)||b.id).split(' (')[0];
const colOf=b=>b.id==='clinic'||(b.p&&b.p.group==='health')?K.fillClin:K.fillPub;
const addons=()=>{ const a=BD.data.raw.arch||{}; return (a.typologies&&a.typologies.addons)||[]; };
const typs=()=>{ const a=BD.data.raw.arch||{}; return (a.typologies&&a.typologies.list)||[]; };
const m2of=(t,city)=>t&&t.m2?(t.m2.v&&typeof t.m2.v==='object'?t.m2.v[city]:t.m2.v):null;
const CAT=()=>BD.archTest.CAT;
const unique=a=>[...new Set(a)];
const srcTxt=ids=>unique(ids||[]).join(', ')||'?';

/* plan footprints in the layout's own frame: across the lot (v) by depth from the street edge (|u − uf|); the street is at the bottom.
   What is drawn is what Arrange placed; levels say which storeys each block reaches. */
function planItems(P){ const s=P.s, uf=s.uf, dep=(u0,u1)=>{ const a=Math.abs(u0-uf), b=Math.abs(u1-uf); return [Math.min(a,b),Math.max(a,b)]; };
  /* the Emergency hub (rule sheet v1): every room, corridor, stair and lift footprint, by storey (level = storey index) */
  const V=C.v1(P); if(V){ const out=[]; V.storeys.forEach((S,i)=>[].concat(S.rooms||[],S.corridors||[],S.stairs||[],S.lifts||[]).forEach(r=>{ if(!r.rect) return; const b=r.block, id=String(r.id||'');
      const [nm,col]=b==='data centre'?[id==='hall'?'Data hall':'Data centre',id==='hall'?K.fillHall:K.fillSup]:b==='clinic'?['Clinic',K.fillClin]:b==='spare'?['Unassigned',K.fillSup]:[/^ref/.test(id)?'Refuge':/^shel/.test(id)?'Warming shelter':'Hub',K.fillPub];
      out.push({id:id,name:nm,col,v:[r.rect[2],r.rect[3]],d:dep(r.rect[0],r.rect[1]),levels:[i]}); }));
    return out; }
  const items=[{id:'hall',name:'Data centre',col:K.fillHall,v:P.hall.v.slice(),d:dep(P.hall.u[0],P.hall.u[1]),levels:null}];
  for(const b of P.boxes) items.push({id:b.id,name:short(b),col:colOf(b),v:b.v.slice(),d:dep(b.u[0],b.u[1]),levels:b.levels||[b.level||0],base:b.base});
  return items; }
function planSVG(P,o){ const items=planItems(P), lv=o.level; const shown=items.filter(i=>lv==null||i.levels==null||i.levels.includes(lv));
  const all=o.frame||items, vs=all.flatMap(i=>i.v), ds=all.flatMap(i=>i.d), v0=Math.min(...vs), v1=Math.max(...vs), d0=0, d1=Math.max(...ds)+4, W=o.W, H=o.H, pad=o.pad||10;
  const sc=Math.min((W-2*pad)/(v1-v0),(H-2*pad-(o.street?10:0))/(d1-d0)), ox=pad+((W-2*pad)-(v1-v0)*sc)/2, X=v=>ox+(v-v0)*sc, Y=d=>H-pad-(o.street?10:0)-(d-d0)*sc;
  let g=''; for(const i of shown){ const x=X(i.v[0]), y=Y(i.d[1]), w=(i.v[1]-i.v[0])*sc, h=(i.d[1]-i.d[0])*sc;
    g+=`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="${i.col}"/>`;
    if(o.labels&&w>i.name.length*6.6+8&&h>20) g+=`<text x="${(x+w/2).toFixed(1)}" y="${(y+h/2+4.5).toFixed(1)}" text-anchor="middle" font-size="13.5" font-weight="500" fill="${K.ink}">${esc(i.name)}</text>`; }
  if(o.street){ const yy=H-pad-3; g+=`<line x1="0" y1="${yy}" x2="${W}" y2="${yy}" stroke="${K.faint}" stroke-width="1" stroke-dasharray="6 4"/>`; }
  return {svg:`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="${FONT}" role="img" aria-label="${esc(o.aria||'Plan of the example layout')}">${g}</svg>`,items,sc,frame:items}; }
const legend=P=>`<div class="f1c-key"><span><i style="background:${K.fillHall}"></i>data centre</span>${C.v1(P)?`<span><i style="background:${K.fillSup}"></i>data-centre support</span>`:''}<span><i style="background:${K.fillPub}"></i>public programs</span>${(C.v1(P)?C.v1(P).areas.clinic>0:P.boxes.some(b=>colOf(b)===K.fillClin))?`<span><i style="background:${K.fillClin}"></i>clinic</span>`:''}<span><i class="ln" style="border-color:${K.faint};border-top-style:dashed"></i>street</span></div>`;

/* ---------- 9 Pick a typology ---------- */
C.add(T,'Pick a typology',{chip:CHIP,async build(x){
  const P=await x.arch(); if(!P) return {draw:'<p class="f1v-empty">No lot loaded.</p>'};
  const city=x.city, L=typs(), cover=P.ratio&&P.ratio.cover, ok=C.allowed(city,x.key), cat=CAT();
  const picks=C.EXAMPLE_PICKS.map(id=>cat.byId[id]&&String(cat.byId[id].name).split(' (')[0]).filter(Boolean);
  const tiles=L.map((t,i)=>{ const m=m2of(t,city), isEx=t.id==='emergency_hub', fits=ok&&m!=null&&cover!=null&&m<=cover, why=!ok?`not allowed here: ${x.status.word==='?'?'zone has no data-centre row':'zone '+x.zone}`:(m!=null&&cover!=null&&m>cover?`needs ${n0(m)} m² of ground, the lot's building can cover ${n0(cover)} m²`:'');
    const art=isEx?planSVG(P,{W:210,H:84,level:0,pad:4,aria:'Plan of the Emergency hub on this lot'}).svg:`<span class="n">no layout drawing in the tool</span>`;
    return `<div class="f1c-typ-tile ${isEx&&fits?'on':fits?'':'off'}"><div class="art">${art}</div><div class="h">${esc(t.name)}</div>
      <div class="s">${isEx?esc(picks.join(', ').toLowerCase()):'?'}</div>
      <div class="n">minimum ground ${m==null?'<b class="f1c-q">?</b>':n0(m)+' m²'}${fits?` · fits (${n0(cover)} m² can be covered)`:''}</div>${why?`<div class="n red">${esc(why)}</div>`:''}</div>`; }).join('');
  const more=['Community pool','Heat cascade','Warm bath','Aquaponics','Food hub','Conservatory','Shelter + laundry'].map(n=>`<div class="f1c-typ-tile off"><div class="h">${esc(n)}</div><div class="n">not in the tool yet</div></div>`).join('');
  const draw=`<div class="f1c-typ-wrap"><div class="f1c-typ-tiles">${tiles}${more}</div>
    <div class="f1c-key" style="max-width:900px"><span><i style="background:${K.fillHall}"></i>data centre</span><span><i style="background:${K.fillPub}"></i>public programs</span><span><i style="background:${K.fillClin}"></i>clinic</span><span class="f1c-note">${C.v1(P)?'Plans show the ground storey of the Emergency hub’s layout on this lot (rule sheet v1).':'Plans show the ground storey as Arrange places it on this lot.'} The Emergency hub is the typology the tool lays out today; the pool and the cascade follow.</span></div></div>`;
  const ex=L.find(t=>t.id==='emergency_hub')||L[0], em=m2of(ex,city);
  return {draw,lead:'A typology is a tested set of programs around a data centre. The tool holds one so far, with its minimum ground.',
    hero:[{v:String(L.length),u:'in the tool',l:'typologies in the library'},{v:em==null?q():n0(em),u:'m²',l:'minimum ground, Emergency hub'}],
    rows:[['In the tool now',ex?ex.name:'?'],['Programs',picks.join(', ')||'?'],['Data centre here',x.status.word],['Building can cover',cover==null?q():`${n0(cover)} m²`],['Typology picker','Emergency hub; the pool and the cascade are in development']],
    more:[['What the minimum ground does',`<p>Before any program is picked, Ratios holds back the chosen typology's minimum ground; with none chosen, the smallest in the library (arch.json, “typologies”). Add-ons are never held back.</p>`]],
    src:[`Typology library and minimum ground: tool/data/arch.json “typologies” (${srcTxt(ex&&ex.m2&&ex.m2.src)}; ${esc(ex&&ex._note||'')}).`,'Fit test: minimum ground against the building cover Ratios allows on this lot (BD.archTest, P.ratio.cover); our arithmetic.','Allowed here: tool/data/zones.json.','Programs: the tool’s example pick (tool/arch_programs.json).'],
    missing:['the other seven typologies (named in MASTER_PLAN Phase B order; not in tool/data/arch.json, so no sizes or fit tests)','typology picker (Phase D)']}; }});

/* ---------- 10 Variant and add-ons ---------- */
C.add(T,'Variant and add-ons',{chip:CHIP,async build(x){
  const P=await x.arch(); if(!P) return {draw:'<p class="f1v-empty">No lot loaded.</p>'};
  const cat=CAT(), city=x.city, rf=cat.byId.refuge, picks=BD.arch.picks||[], rq=picks.find(p=>p.id==='refuge'), cur=rq&&rq.opt, opts=((rf&&rf.options)||[]).filter(o=>o.id!=='own_building');
  const V=C.v1(P), items=planItems(P), lv=V?V.storeys.map((S,i)=>i):[...(P.levels||[0])], up=lv.filter(l=>l>0), W=330,H=250;
  const a=planSVG(P,{W,H,level:0,labels:true,street:true,frame:items,aria:'Ground storey of the example layout'});
  const b=up.length?planSVG(P,{W,H,level:up[0],labels:true,street:true,frame:items,aria:'Upper storeys of the example layout'}):null;
  /* the hub (rule sheet v1) has one placement per lot, set by its variant; Arrange's refuge placements do not apply to it */
  const vName=V&&V.variant?[V.variant.main].concat(V.variant.flags||[]).join(', '):null;
  const tabs=V?`<span class="f1c-typ-tab on">${esc('Emergency hub, '+vName)}</span><span class="f1c-note" style="margin-left:8px">one placement per lot (rule sheet v1)</span>`:opts.map(o=>`<span class="f1c-typ-tab${o.id===cur?' on':''}">${esc(o.name)}${o.id===cur?'':''}</span>`).join('');
  const ao=addons(), tile=(name,sub,fit,src)=>`<div class="f1c-typ-tile"><div class="h">${esc(name)}</div><div class="s">${sub}</div><div class="n">${fit}</div><div class="n">${esc(src)}</div></div>`;
  const evp=cat.byId.ev_hub, pv=cat.byId.roof_solar, ET=BD.data.raw.addons||{};
  const tl=[];
  for(const t of ao){ const m=m2of(t,city); tl.push(tile(t.name,m==null?'<b class="f1c-q">?</b>':`${n0(m)} m² of ground`,`fits: <b class="f1c-q">?</b> <span class="f1c-note">fit not checked in the tool yet</span>`,`arch.json: ${srcTxt((t.m2&&t.m2.src||[]).slice(0,2))}`)); }
  if(pv){ const kw=ET.pvKwpM2&&ET.pvKwpM2.v; tl.push(tile(pv.name,kw?`${kw[0]}–${kw[1]} kWp per m² of roof`:'<b class="f1c-q">?</b>',`fits: <b class="f1c-q">?</b> <span class="f1c-note">footprint not tested yet</span>`,`addons.json: ${srcTxt(ET.pvKwpM2&&ET.pvKwpM2.src)}`)); }
  if(evp) tl.push(tile(evp.name,evp.size&&evp.size.typical_m2!=null?`${n0(evp.size.typical_m2)} m² (smallest hub)`:'<b class="f1c-q">?</b>',`fits: <b class="f1c-q">?</b> <span class="f1c-note">needs its own ground; not checked yet</span>`,`arch_programs.json: ${srcTxt((evp.size&&evp.size.src||[]).slice(0,2))}`));
  const draw=`<div class="f1c-typ-wrap"><div style="width:100%;max-width:900px">${tabs?`<div style="margin-bottom:12px"><span class="f1c-note" style="margin-right:10px">${V?'Layout':'Refuge placement'}</span>${tabs}</div>`:''}</div>
    <div class="f1c-typ-pl"><figure><figcaption>Ground storey</figcaption>${a.svg}</figure>${b?`<figure><figcaption>${V?'Storey '+(up[0]+1):'Upper storeys'}</figcaption>${b.svg}</figure>`:''}</div>${legend(P)}
    <div class="f1c-typ-h">Add-ons</div><div class="f1c-typ-tiles f1c-typ-sm" style="grid-template-columns:repeat(${Math.max(1,tl.length)},minmax(0,1fr))">${tl.join('')}</div></div>`;
  const curName=(opts.find(o=>o.id===cur)||{}).name;
  return {draw,lead:'The variant sets where the refuge stands. Add-ons never move the layout: each needs its own ground.',
    hero:[V?{v:vName||q(),l:'hub variant on this lot (rule sheet v1)'}:{v:String(opts.length),u:'placements',l:'offered for the refuge'},{v:m2of(ao[0],city)==null?q():n0(m2of(ao[0],city)),u:'m²',l:'ground the heat hub needs'}],
    rows:[...ao.map(t=>[t.name,m2of(t,city)==null?q():`${n0(m2of(t,city))} m²`]),['Roof solar',q('footprint not tested yet')],['EV charging',q('fit not checked yet')],['Does an add-on fit',q('not computed')]],
    more:[[V?'The refuge placements (older Arrange options)':'The refuge placements',`<p>${V?'The Emergency hub’s layout (rule sheet v1) has one placement per lot, set by its variant; these Arrange options are not used by it.<br>':''}${opts.map(o=>`<b>${esc(o.name)}</b>: ${esc(o.effect||'')}`).join('<br>')||'?'}</p>`]],
    src:['Variants: refuge options in tool/arch_programs.json; the placed variant is the tool’s example pick.',V?'Plans: the Emergency hub’s layout (hub.js, rule sheet v1), the ground storey and the next storey, room footprints across the lot and from the street; a draft, not a design.':'Plans: Arrange’s placement (BD.f1cards.arch), footprints across the lot and from the street; a draft, not a design.',`Add-on sizes: tool/data/arch.json “addons” (${srcTxt(ao[0]&&ao[0].m2&&ao[0].m2.src)}), tool/data/addons.json, tool/arch_programs.json.`],
    missing:['whether each add-on fits on this lot (the tool does not test add-on ground yet)','roof solar footprint','the other variant layouts (only the placed variant is drawn)']}; }});

/* ---------- 11 The governing principle ---------- */
C.add(T,'The governing principle',{async build(x){
  const bands=[['Plant yard',K.plant,70],['Data centre',K.fillHall,150],['Spine',K.fillSup,26],['Hub: refuge, shelter, lobby',K.fillPub,120],['Public front','#fff',26]];
  const W=520, X0=70, BW=300, gap=0; let y=40, g='', ys=[];
  for(const [nm,col,h] of bands){ g+=`<rect x="${X0}" y="${y}" width="${BW}" height="${h}" fill="${col}"${col==='#fff'?` stroke="${K.hair}"`:''}/><text x="${X0+BW+16}" y="${y+h/2+4.5}" font-size="13" fill="${K.ink}">${esc(nm)}</text>`; ys.push(y); y+=h+gap; }
  const yEnd=y; g+=`<line x1="30" y1="${yEnd+14}" x2="${X0+BW+90}" y2="${yEnd+14}" stroke="${K.faint}" stroke-width="1" stroke-dasharray="6 4"/><text x="${X0+BW+16}" y="${yEnd+32}" font-size="13" fill="${K.ink}">Street</text>
    <line x1="${X0+BW/2}" y1="${yEnd+8}" x2="${X0+BW/2}" y2="${ys[0]+8}" stroke="${K.ink}" stroke-width="1.2"/><path d="M${X0+BW/2-5} ${ys[0]+17} L${X0+BW/2} ${ys[0]+6} L${X0+BW/2+5} ${ys[0]+17}" fill="none" stroke="${K.ink}" stroke-width="1.2"/>
    <text x="${X0}" y="26" font-size="12" fill="${K.mute}">private</text><text x="${X0}" y="${yEnd+32}" font-size="12" fill="${K.mute}">public</text>`;
  const svg=`<svg viewBox="0 0 ${W+190} ${yEnd+50}" width="${W+190}" height="${yEnd+50}" font-family="${FONT}" role="img" aria-label="The bands of every layout, from the street back: public front, hub, spine, data centre, plant yard">${g}</svg>`;
  const Z=x.M.Z||{}, gf=(Z.cl||[]).find(c=>/ground floor/i.test(c[0]));
  const draw=`<div class="f1c-typ-wrap">${svg}<div class="f1c-key"><span><i style="background:${K.fillHall}"></i>data centre</span><span><i style="background:${K.fillPub}"></i>public programs</span><span><i style="background:${K.fillSup}"></i>data-centre support (spine)</span><span><i style="background:${K.plant}"></i>plant yard</span>
    <span class="f1c-note">A principle, drawn as a diagram. It is not this lot's layout and has no dimensions.</span></div></div>`;
  return {draw,lead:'Every layout follows the same bands from the street back. On a new lot the bands stretch or stack; the order stays.',
    rows:[['Order','street, public front, hub, spine, data centre, plant yard'],['Direction','public at the street, private at the back'],['Ground floor, this zone',gf?gf[1]:q('no ground-floor rule read for this zone')],['Layout engine',BD.hub?'the Emergency hub’s layout places the bands on each lot (hub.js, rule sheet v1); other typologies not yet':q('not built yet: bands are not placed on this lot')]],
    more:[['Where the order comes from',`<p>The order is the Emergency hub specification’s: the tool lays the bands out on each lot with the hub engine (rule sheet v1); on the 13 test lots it draws the frozen boards. Other typologies get their band layout with their engines.</p>`]],
    src:['Order of the bands: the Emergency hub specification, laid out on this lot by the hub engine (rule sheet v1); the frozen boards on the test lots.',gf?`Ground-floor rule: ${gf[2]} (tool/data/zones.json).`:'Ground-floor rule: tool/data/zones.json, no row for this zone.'],
    missing:BD.hub?['the band layout for typologies other than the Emergency hub']:['the band layout engine (bands on this lot)','lobby and exit rules (code check 8) as a layout rule']}; }});

/* ---------- 12 The numbers ---------- */
C.add(T,'The numbers',{chip:CHIP,async build(x){
  const P=await x.arch(); if(!P) return {draw:'<p class="f1v-empty">No lot loaded.</p>'};
  const V=C.v1(P), B=C.budgetsV1(P), dp=V?null:BD.archTest.dcPieces(P), pl=V?{exitSep:V.exitSep}:BD.plan.build(P), R=P.ratio||{}, t={};
  ((dp&&dp.L&&dp.L.pieces)||[]).forEach(p=>{ t[p.id]=(t[p.id]||0)+p.m2; });
  /* rule sheet v1: the hub's hall, data-centre support (its data-centre count less hall and dock) and dock */
  const hall=V?V.areas.hall:t.hall||0, sup=V?V.areas.support:(t.electrical||0)+(t.battery||0)+(t.rest||0), dock=V?V.areas.dock:t.dock||0;
  const parts=[{n:'Data hall',v:hall,c:K.dc,f:K.fillHall},{n:'Data-centre support',v:sup,c:K.dcSup,f:K.dcSup},{n:'Loading dock',v:dock,c:K.neut,f:K.neut}];
  const prog=P.boxes.map(b=>({n:short(b),v:V?(V.areas[b.id]||0):(b.q&&b.q.m2)||0,c:colOf(b)===K.fillClin?K.clin:K.pub})).filter(p=>p.v>0);
  const tints={[K.clin]:K.clin,[K.pub]:K.pub}; const all=[...parts.filter(p=>p.v>0).map(p=>({n:p.n,v:p.v,c:p.c})),...prog];
  const tot=all.reduce((a,p)=>a+p.v,0), dcAll=hall+sup+dock, share=tot?100*dcAll/tot:null, mwT=V?V.MW:BD.S.answers.mw||R.mwTest, mwR=R.mw;
  const BWd=940, bx=0, scale=Math.max(tot,R.allowed||0)||1, sx=v=>v/scale*(BWd-2); let cx=1, bar='';
  all.forEach(p=>{ const w=Math.max(0,sx(p.v)-2); bar+=`<rect x="${cx.toFixed(1)}" y="28" width="${w.toFixed(1)}" height="64" rx="2" fill="${p.c}"><title>${esc(p.n)}: ${n0(p.v)} m² (${n0(100*p.v/tot)} %)</title></rect>`; cx+=w+2; });
  const grid=[0,0.25,0.5,0.75,1].map(f=>{ const xx=(f*(R.allowed||scale)/scale*(BWd-2)); return `<line x1="${xx.toFixed(1)}" y1="24" x2="${xx.toFixed(1)}" y2="98" stroke="${K.hair}"/><text x="${xx.toFixed(1)}" y="114" text-anchor="${f===0?'start':f===1?'end':'middle'}" font-size="11" fill="${K.mute}">${n0(f*(R.allowed||scale))}</text>`; }).join('');
  const lim=R.allowed!=null?`<line x1="${sx(R.allowed).toFixed(1)}" y1="20" x2="${sx(R.allowed).toFixed(1)}" y2="98" stroke="${K.ink}" stroke-width="1.2"/><text x="${(sx(R.allowed)-4).toFixed(1)}" y="14" text-anchor="end" font-size="11.5" fill="${K.ink2}">envelope ${n0(R.allowed)} m²</text>`:'';
  const svg=`<svg viewBox="0 0 ${BWd} 124" width="${BWd}" height="124" font-family="${FONT}" role="img" aria-label="Floor area by use, one bar, all storeys, against the envelope this lot allows"><text x="0" y="14" font-size="15" fill="${K.ink}">Floor area by use · ${n0(tot)} m²</text>${grid}${bar}${lim}</svg>`;
  const tbl=all.map(p=>`<i style="background:${p.c}"></i><span>${esc(p.n)}</span><span class="r">${n0(p.v)} m²</span><span class="r">${n0(100*p.v/tot)} %</span>`).join('');
  const heatMade=B.heat&&B.heat.avail, need=B.heat&&B.heat.need;
  let heatM=''; if(need&&heatMade){ const hm=heatMade, u=need[1], W2=940, sc=v=>v/hm[1]*(W2-2), uw=Math.max(2,sc(u));
    heatM=`<svg viewBox="0 0 ${W2} 92" width="${W2}" height="92" font-family="${FONT}" role="img" aria-label="Heat used by the programs against heat made, one scale"><text x="0" y="14" font-size="15" fill="${K.ink}">Heat used and heat made · MWh a year</text>
      <rect x="1" y="26" width="${sc(hm[0]).toFixed(1)}" height="16" rx="2" fill="${K.dcSup}"><title>made, low end: ${n0(hm[0])} MWh/yr</title></rect><rect x="${(sc(hm[0])+2).toFixed(1)}" y="26" width="${Math.max(0,sc(hm[1])-sc(hm[0])-2).toFixed(1)}" height="16" rx="2" fill="${K.fillSup}"><title>made, up to the high end: ${n0(hm[1])} MWh/yr</title></rect>
      <rect x="1" y="26" width="${uw.toFixed(1)}" height="16" rx="2" fill="${K.ink}"><title>used by the programs: ${n0(need[0])}–${n0(need[1])} MWh/yr</title></rect>
      <text x="1" y="62" font-size="12" fill="${K.ink2}">used ${n0(need[0])}–${n0(need[1])}</text><text x="${sc(hm[0]).toFixed(1)}" y="62" text-anchor="end" font-size="12" fill="${K.ink2}">made, low end ${n0(hm[0])}</text><text x="${W2-1}" y="62" text-anchor="end" font-size="12" fill="${K.ink2}">made, high end ${n0(hm[1])}</text>
      <g font-size="11.5" fill="${K.mute}"><rect x="1" y="74" width="12" height="12" rx="2" fill="${K.ink}"/><text x="19" y="84">used by the programs</text><rect x="170" y="74" width="12" height="12" rx="2" fill="${K.dcSup}"/><text x="188" y="84">made, low end</text><rect x="300" y="74" width="12" height="12" rx="2" fill="${K.fillSup}"/><text x="318" y="84">made, up to the high end</text></g></svg>`; }
  const stats=`<div class="f1c-typ-stats"><div><div class="l">Data centre</div><div class="v">${share==null?'?':n0(share)}<span>%</span></div></div><div><div class="l">IT load tested</div><div class="v">${mwT==null?'?':mwT.toFixed(2)}<span>MW</span></div></div></div>`;
  const draw=`<div class="f1c-typ-wrap"><div style="width:100%;max-width:940px">${svg}</div><div class="f1c-typ-row"><div class="f1c-typ-tbl">${tbl}</div>${stats}</div><div style="width:100%;max-width:940px;margin-top:14px">${heatM}</div></div>`;
  const ex=pl.exitSep||[], meters=ex.map(e=>({l:`Exit doors apart, ${String(e.block).toLowerCase().replace(/ \(.*/,'')}`,v:e.apart_m,lim:e.need_m,pass:e.ok,unit:'m',cap:`${n1(e.apart_m)} m apart · needed ${n1(e.need_m)} m`,src:'NBC 3.4.2.3'}));
  meters.push(V&&V.travelWorst!=null?{l:'Longest walk to an exit',v:V.travelWorst,lim:45,max:52,pass:V.travelWorst<=45,unit:'m',cap:`${n1(V.travelWorst)} m, worst zone · limit 45 m`,src:'NBC 3.4.2.5 / VBBL 3.4.2.5'}:{l:'Longest walk to an exit',v:null,lim:45,max:52,unit:'m',cap:'limit 45 m',src:'NBC 3.4.2.5'});
  if(false) meters.push({l:'Heat used by the programs, against heat made',v:need[1],lim:heatMade[0],pass:need[1]<=heatMade[0],unit:'MWh/yr',cap:`${n0(need[0])}–${n0(need[1])} used · ${n0(heatMade[0])}–${n0(heatMade[1])} made, MWh/yr`,src:'arch.js budgets'});
  if(false) meters.push({l:'Floor area against the envelope',v:tot,lim:R.allowed,pass:tot<=R.allowed,unit:'m²',cap:`${n0(tot)} m² · envelope ${n0(R.allowed)} m²`,src:'Ratios'});
  const unk=(B.heat&&B.heat.unknown||[]).map(u=>String(u.p&&u.p.name||u.id));
  return {draw,lead:'Areas, load and the two exit checks for the example typology on this lot.',
    hero:[{v:n0(tot),u:'m²',l:'floor area, all storeys'},{v:mwT==null?q():mwT.toFixed(2),u:'MW',l:'IT load tested'}],
    rows:[['IT load this lot allows',mwR?`${n1(mwR[0])}–${n1(mwR[1])} MW`:q()],['Envelope allowed',R.allowed!=null?`${n0(R.allowed)} m²`:q()],['Heat made, after heat pump',heatMade?`${n0(heatMade[0])}–${n0(heatMade[1])} MWh/yr`:q()]],
    meters,
    more:[['How the areas are counted',V?`<p>From the Emergency hub’s layout (rule sheet v1), as the Rooms card: the data hall; data-centre support is the hub’s data-centre floor less the hall and the dock; the refuge, shelter and clinic are their rooms. Floors by use, all storeys. Lobby, washrooms and other hub rooms are not counted as programs.</p>`:`<p>Hall, support rooms (electrical, battery, other) and dock are the data centre's pieces in Arrange; programs use the sizes set for them. Floors by use, all storeys. The ground storey left under the hall for other uses is not counted again.</p>`]],
    src:V?['Floor areas: the Emergency hub’s layout (hub.js, rule sheet v1), as the Rooms card.','IT load: the hub’s MW (rule sheet v1); the size range tested.','Heat made and used: the tool’s heat budget with the hub’s areas and MW (heat after the heat pump, MWh/yr; program kWh per m² per year).','Exit doors apart: the hub’s exits (hub.js), NBC 3.4.2.3 / VBBL 3.4.2.3.','Longest walk: the hub’s travel along the path through the doors, worst zone (hub.js; NBC and VBBL 3.4.2.5, 45 m sprinklered).']:['Floor areas: Arrange’s placement and the data-centre pieces (BD.archTest.dcPieces); program sizes from the picks (tool/arch_programs.json).','IT load: BD.S.answers.mw (test fit) and Ratios’ range (BD.f1cards.arch, P.ratio.mw).','Heat made and used: BD.archTest.budgets(P) (heat after the heat pump, MWh/yr; program kWh per m² per year).','Exit doors apart: BD.plan.build(P).exitSep, NBC 3.4.2.3 (straight line between the nearest door edges, rule sheet v0).','Longest walk: NBC 3.4.2.5, not computed in the tool.'],
    missing:[...(V&&V.travelWorst!=null?[]:['longest walk to an exit ≤ 45 m (NBC 3.4.2.5)']),...(unk.length?[`heat need of ${unk.join(', ')} (no kWh per m² in the program data)`]:[])]}; }});

/* ---------- 13 What’s left for neighbours ---------- */
const RT={housing:'housing',school:'school',campus:'campus',care:'care home',hospital:'hospital',rec:'recreation centre',hall:'community hall',pool:'pool',arena:'arena',apartment:'apartments',office:'office',hotel:'hotel',commercial:'commercial'};
C.add(T,'What’s left for neighbours',{chip:CHIP,async build(x){
  const P=await x.arch(); if(!P) return {draw:'<p class="f1v-empty">No lot loaded.</p>'};
  const V=C.v1(P), B=C.budgetsV1(P), f=BD.eng.siteFacts(), d=await BD.eng.loadRecv(f.city), near=BD.eng.nearby(f,d), nets=BD.eng.netsAt(f,d);
  /* the building: the hub's outline (all storeys' rooms, as a rectangle in the lot's frame) where it draws the layout, else Arrange's hall */
  const hallR=V?(()=>{ let a0=1e9,a1=-1e9,b0=1e9,b1=-1e9; V.storeys.forEach(S=>(S.rooms||[]).forEach(r=>{ if(!r.rect) return; a0=Math.min(a0,r.rect[0]); a1=Math.max(a1,r.rect[1]); b0=Math.min(b0,r.rect[2]); b1=Math.max(b1,r.rect[3]); })); return BD.geo.rectW(P.s.F,a0,a1,b0,b1); })():P.hall.ring; let a=1e18,b=1e18,c=-1e18,e=-1e18; for(let i=0;i<hallR.length;i+=2){ a=Math.min(a,hallR[i]); b=Math.min(b,hallR[i+1]); c=Math.max(c,hallR[i]); e=Math.max(e,hallR[i+1]); }
  const cx=(a+c)/2, cy=(b+e)/2, Rm=640, S=680, bb=[cx-Rm,cy-Rm,cx+Rm,cy+Rm], fr=C.frame(bb,S,S,0), RING=500;
  const st=await BD.streets(f.city); let sd=''; if(st) for(const gg of st.segs){ let px=gg[2],py=gg[3]; if(px<bb[0]-60||px>bb[2]+60||py<bb[1]-60||py>bb[3]+60){ let any=false; for(let i=2;i+1<gg.length;i+=2) if(gg[i]>=bb[0]&&gg[i]<=bb[2]&&gg[i+1]>=bb[1]&&gg[i+1]<=bb[3]){ any=true; break; } if(!any) continue; }
    for(let i=2;i+1<gg.length;i+=2){ const [u,v]=fr.P(gg[i],gg[i+1]); sd+=(i>2?'L':'M')+u.toFixed(1)+' '+v.toFixed(1); } }
  const inMap=near.filter(p=>p.x>=bb[0]&&p.x<=bb[2]&&p.y>=bb[1]&&p.y<=bb[3]), within=near.filter(p=>Math.hypot(p.x-cx,p.y-cy)<=RING);
  const dots=inMap.map(p=>{ const [u,v]=fr.P(p.x,p.y); return `<circle cx="${u.toFixed(1)}" cy="${v.toFixed(1)}" r="2.4" fill="${K.ink}"/>`; }).join('');
  const [hx,hy]=fr.P(cx,cy), hb=[fr.P(a,e),fr.P(c,b)], hx0=hb[0][0], hx1=hb[1][0], hy0=hb[0][1], hy1=hb[1][1];
  /* four leaders at most: the four nearest receivers whose dot heights are 34 px apart and whose line to the right does not cross the building */
  const near4=[], ys=[]; for(const p of near){ if(near4.length>=4) break; const [u,v]=fr.P(p.x,p.y); if(u<0||u>S||v<14||v>S-14) continue; if(ys.some(y=>Math.abs(y-v)<34)) continue; if(u<hx1+2&&v>hy0-3&&v<hy1+3) continue; near4.push({p,u,v}); ys.push(v); }
  const LX=S+14; let lead='', lab=''; for(const o of near4){ const nm=o.p.n?C.titleCase(o.p.n):String(RT[o.p.t]||'receiver'), nmS=nm.length>30?nm.slice(0,29)+'…':nm;
    lead+=`<line x1="${o.u.toFixed(1)}" y1="${o.v.toFixed(1)}" x2="${LX-4}" y2="${o.v.toFixed(1)}" stroke="${K.ink}" stroke-width="0.5"/>`; lab+=`<text x="${LX}" y="${(o.v-2).toFixed(1)}" font-size="13" font-weight="500" fill="${K.ink}">${esc(nmS)}</text><text x="${LX}" y="${(o.v+13).toFixed(1)}" font-size="11.5" fill="${K.mute}">${esc(RT[o.p.t]||o.p.t)} · ${n0(o.p.dist)} m</text>`; }
  const W2=S+250, svg=`<svg viewBox="0 0 ${W2} ${S}" width="${W2}" height="${S}" font-family="${FONT}" role="img" aria-label="The building, the ${RING} m ring and the buildings around it that could take heat"><defs><clipPath id="f1c-typ13"><rect width="${S}" height="${S}"/></clipPath></defs><rect width="${S}" height="${S}" fill="${K.ground}"/>
    <g clip-path="url(#f1c-typ13)"><path d="${sd}" fill="none" stroke="#fff" stroke-width="2.4" stroke-linejoin="round"/><circle cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="${(RING*fr.s).toFixed(1)}" fill="none" stroke="${K.ink2}" stroke-width="0.8" stroke-dasharray="5 4"/>${dots}
    <path d="${C.pathOf([hallR],fr.P)}" fill="${K.dc}" stroke="none"/></g><text x="${(hx+RING*fr.s*0.707+4).toFixed(1)}" y="${(hy-RING*fr.s*0.707-4).toFixed(1)}" font-size="11.5" fill="${K.ink2}">${RING} m</text>${lead}${lab}${C.scaleBar(18,S-34,200,fr.s,'200 m')}</svg>`;
  const draw=`<div class="f1c-typ-wrap">${svg}<div class="f1c-key" style="max-width:930px"><span><i style="background:${K.dc}"></i>the data centre</span><span><i style="background:${K.ink};border-radius:50%;width:6px;height:6px;vertical-align:2px;margin-right:9px"></i>a building that could take heat (${n0(inMap.length)} on the map, ${n0(near.length)} within the tool’s ${n0(BD.eng.R.recvRadius)} m reach)</span><span><i class="ln" style="border-color:${K.ink2};border-top-style:dashed"></i>${RING} m</span><span class="f1c-note">Labelled: the four nearest that can be named in a straight line.</span></div></div>`;
  const av=B.heat&&B.heat.avail, nd=B.heat&&B.heat.need, left=av&&nd?[Math.max(0,av[0]-nd[1]),Math.max(0,av[1]-nd[0])]:null;
  const net=nets[0], netTxt=net?`${net.n}: ${net.inside?'inside its service area':n0(net.edge)+' m outside'}`:'none within 1.2 km';
  const homes=near.filter(p=>p.u).reduce((s,p)=>s+p.u,0), unk=(B.heat&&B.heat.unknown||[]).map(u=>String(u.p&&u.p.name||u.id));
  return {draw,lead:'The programs use a small part of the data centre’s heat. The rest could go to buildings nearby.',
    hero:[{v:left?`${n1(left[0]/1000)}–${n1(left[1]/1000)}`:q(),u:left?'GWh/yr':'',l:'left for neighbours'},{v:n0(within.length),u:'',l:`receivers within ${RING} m`}],
    rows:[['Heat made, after heat pump',av?`${n0(av[0])}–${n0(av[1])} MWh/yr`:q()],['Used by the programs',nd?`${n0(nd[0])}–${n0(nd[1])} MWh/yr`:q()],['Left for neighbours',left?`${n0(left[0])}–${n0(left[1])} MWh/yr`:q()],[`Receivers within ${RING} m`,n0(within.length)],[`Receivers within ${n0(BD.eng.R.recvRadius)} m`,n0(near.length)],['Homes in those receivers',homes?n0(homes):q('not in the data for this city')],['District energy',netTxt],['Their heat demand',q('not in the data')]],
    more:[['How the heat is counted',`<p>Heat made is the data centre's captured heat after a heat pump, at the lowest and highest end of the ranges. The programs' own use is taken off: the low made figure less the high use, and the high made figure less the low use. A range, not a point; burdens are not netted.</p>`]],
    src:[(V?'Heat made and used: the tool’s heat budget with the Emergency hub’s areas and MW (hub.js, rule sheet v1), ':'Heat made and used: BD.archTest.budgets(P), ')+'from the heat calculation at the IT load tested (register: capture, cop) and the programs’ kWh per m² per year (tool/arch_programs.json).','Left for neighbours: our arithmetic (made minus used, low and high ends).','Receivers: BD.eng.nearby, the tool’s receiver list (tool/data), to its register reach; distances are straight lines from the building.','District energy networks: the tool’s data (service-area outlines).'],
    missing:['heat demand of each receiver (the receiver list has type and, for housing, homes only)',...(unk.length?[`heat used by ${unk.join(', ')} (no kWh per m² in the program data)`]:[])]}; }});
})();
