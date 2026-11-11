/* Beyond Data — F1 Engineering cards, group 'a' (CODE_JOB_F1 step 3, Engineering): 1 Your city, 2 Your parcel (reused), 3 What fits, 4 Cooling, 5 Backup power, 6 Noise.
   Every card starts from the tool's Engineering tier (C.ctx().eng(): defaults, the lot sized by flow.js findFit) and reads figures from BD.model(), BD.eng and the tool's own
   checks (site.js fitMax / setupProblems, engine.js noiseCheck). A figure the tool does not compute is a red "?". Drawings are plans of the lot on the shared site context
   (a 3-D view is not practical inside a card: the plan carries the plant boxes, M.plant.boxes, in world coordinates). */
(function(){
'use strict';
const BD=window.BD, C=BD.f1cards, K=C.K, esc=C.esc, n0=C.n0, n1=C.n1, T='engineering';
C.add(T,'Your city',C.get('architecture','Your city'));
C.add(T,'Your parcel',C.get('architecture','Your parcel'));

if(!document.getElementById('f1c-eng-a')){ const st=document.createElement('style'); st.id='f1c-eng-a'; st.textContent=`
.f1v-draw:has(.f1c-eng-a-wrap){justify-content:flex-start}
.f1c-eng-a-wrap{width:100%;max-width:980px;flex:0 0 auto}
.f1c-eng-a-wrap svg{max-width:100%;height:auto;display:block}
.f1c-eng-a-mt{margin-top:18px;border-top:1px solid ${K.rule};padding-top:12px;max-width:900px}
.f1c-eng-a-mt h4{margin:0 0 8px;font-size:13px;font-weight:500;color:${K.ink}}
.f1c-eng-a-rm{position:relative;height:46px;margin:6px 0 0}
.f1c-eng-a-rm .trk{position:absolute;left:0;right:0;top:14px;height:12px;background:${K.hair}}
.f1c-eng-a-rm .band{position:absolute;top:14px;height:12px;background:${K.dcSup}}
.f1c-eng-a-rm .fit{position:absolute;top:14px;height:12px;background:${K.ink}}
.f1c-eng-a-rm .no{position:absolute;top:14px;height:12px;background:${K.red}}
.f1c-eng-a-rm .tk{position:absolute;top:8px;width:2px;height:24px;background:${K.ink}}
.f1c-eng-a-rm .lb{position:absolute;top:30px;font-size:11.5px;color:${K.mute};white-space:nowrap}
.f1c-eng-a-rm .lt{position:absolute;top:-2px;font-size:11.5px;color:${K.ink2};white-space:nowrap}
.f1c-eng-a-red{color:${K.red}}
.f1c-eng-a-cmp{display:grid;grid-template-columns:150px 1fr;gap:0 18px;align-items:center;font-size:12.5px;color:${K.ink2}}
.f1c-eng-a-cmp h4{grid-column:1/3;margin:12px 0 2px;font-size:14px;font-weight:500;color:${K.ink};border-bottom:1px solid ${K.ink};padding-bottom:6px}
.f1c-eng-a-cmp h4:first-child{margin-top:0}
.f1c-eng-a-cmp .rl{padding:5px 0;border-bottom:1px solid ${K.hair};color:${K.ink}}
.f1c-eng-a-cmp .rl small{display:block;color:${K.mute};font-size:11px;margin-top:2px}
.f1c-eng-a-cmp .rb{padding:6px 0;border-bottom:1px solid ${K.hair}}
.f1c-eng-a-bar{display:grid;grid-template-columns:130px 1fr 300px;gap:10px;align-items:center;margin:1px 0;font-size:12px;color:${K.mute}}
.f1c-eng-a-bar.pick{color:${K.ink}}
.f1c-eng-a-bar .t{height:11px;background:transparent;position:relative}
.f1c-eng-a-bar .t i{position:absolute;left:0;top:0;height:11px;background:${K.faint}}
.f1c-eng-a-bar .t b{position:absolute;top:0;height:11px;background:${K.faint};opacity:.45}
.f1c-eng-a-bar.pick .t i{background:${K.ink}}
.f1c-eng-a-bar.pick .t b{background:${K.ink};opacity:.35}
.f1c-eng-a-bar .nf{color:${K.red}}
.f1c-eng-a-bar small{display:inline;margin-left:6px;font-size:10.5px;color:${K.mute}}
.f1c-eng-a-tbl{border-collapse:collapse;width:100%;font-size:12px;color:${K.ink2}}
.f1c-eng-a-tbl th{font-weight:400;text-align:left;color:${K.mute};border-bottom:1px solid ${K.ink};padding:4px 8px 4px 0;font-size:11px}
.f1c-eng-a-tbl td{padding:5px 8px 5px 0;border-bottom:1px solid ${K.hair};vertical-align:top}
.f1c-eng-a-tbl td.r{color:${K.red}}
.f1c-eng-a-note{font-size:12px;color:${K.mute};max-width:900px;line-height:1.5;margin-top:10px}
`; document.head.appendChild(st); }

const rng=(a,b,d)=>a==null||b==null?'?':(Math.abs(a-b)<0.05*Math.max(1,Math.abs(b))?(d===0?n0(b):n1(b)):(d===0?n0(a)+'–'+n0(b):n1(a)+'–'+n1(b)));
const fmtL=v=>n0(Math.round(v/100)*100); /* litres to the nearest 100 */
const own=(x)=>{ const s=x.sel; return new Set((s.rings||[]).concat([s.ring])); };
const isMine=(x,p)=>{ const s=x.sel; return own(x).has(p.r)||(x.city==='van'?p.id===s.id:(p.ids||[]).includes(s.id)); };
const cen=r=>{ let a=0,b=0,n=0; for(let i=0;i<r.length;i+=2){ a+=r[i]; b+=r[i+1]; n++; } return [a/n,b/n]; };
const pip=(x,y,r)=>{ let c=false; for(let i=0,j=r.length-2;i<r.length;j=i,i+=2){ const xi=r[i],yi=r[i+1],xj=r[j],yj=r[j+1]; if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi) c=!c; } return c; };
const segD=(px,py,ax,ay,bx,by)=>{ const dx=bx-ax,dy=by-ay,L=dx*dx+dy*dy; let t=L?((px-ax)*dx+(py-ay)*dy)/L:0; t=Math.max(0,Math.min(1,t)); return Math.hypot(px-ax-t*dx,py-ay-t*dy); };
const ringD=(px,py,r)=>{ if(pip(px,py,r)) return 0; let b=1e12; for(let i=0,j=r.length-2;i<r.length;j=i,i+=2) b=Math.min(b,segD(px,py,r[j],r[j+1],r[i],r[i+1])); return b; };
const ringNear=(a,b)=>{ let d=1e12; for(let i=0;i<b.length;i+=2) d=Math.min(d,ringD(b[i],b[i+1],a)); for(let i=0;i<a.length;i+=2) d=Math.min(d,ringD(a[i],a[i+1],b)); return d; };
const arr=r=>Array.from(r||[]);

/* the lot as a plan on the shared site context: lot, building (dashed), plant boxes. o: {half, W, H, box(b)→fill, after(P,f)→svg, leaders:[{pt:[x,y] candidates, lines}]} */
function plan(x,M,o){ o=o||{}; const r=arr(x.sel.ring), b=C.bbox(r), cx=(b[0]+b[2])/2, cy=(b[1]+b[3])/2, W=o.W||600, H=o.H||340, half=o.half||Math.max(45,Math.max(b[2]-b[0],b[3]-b[1])*0.78);
  const hh=half, hw=half*W/H, bb=[cx-hw,cy-hh,cx+hw,cy+hh], f=C.frame(bb,W,H,0), P=f.P, LW=o.LW||210;
  const ctx=C.context(x,P,f.I,[0,0,W,H],{skip:x.sel.id});
  const foot=M.foot?C.pathOf([arr(M.foot)],P):'', sfoot=M.serverFoot&&M.serverFoot!==M.foot?C.pathOf([arr(M.serverFoot)],P):'';
  const boxes=(M.plant&&M.plant.boxes||[]).map(q=>`<path d="${C.pathOf([arr(q.ring)],P)}" fill="${o.box?o.box(q):K.dc}" stroke="none"/>`).join('');
  const id='f1c-eng-a-'+(plan.n=(plan.n||0)+1);
  let lead='', ys=[];
  for(const L of (o.leaders||[])){ for(const c of L.pts){ const [px,py]=P(c[0],c[1]); if(px<6||px>W-6||py<14||py>H-14) continue; if(ys.some(v=>Math.abs(v-py)<L.lines.length*14+8)) continue; ys.push(py);
      lead+=`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="2.4" fill="${K.ink}" stroke="#fff" stroke-width="0.8"/><line x1="${px.toFixed(1)}" y1="${py.toFixed(1)}" x2="${W+10}" y2="${py.toFixed(1)}" stroke="#8E8D88" stroke-width="0.6"/>`+
        L.lines.map((t,i)=>`<text x="${W+16}" y="${(Math.max(py+4-(L.lines.length>1?7:0),16)+i*14).toFixed(1)}" font-size="${i?11.5:13}" font-weight="${i?400:500}" fill="${i?K.ink2:K.ink}">${esc(t)}</text>`).join(''); break; } }
  const svg=`<svg viewBox="0 0 ${W+LW} ${H+8}" width="${W+LW}" height="${H+8}" role="img" aria-label="${esc(o.aria||'Plan of the lot')}"><defs><clipPath id="${id}"><rect x="0" y="0" width="${W}" height="${H}"/></clipPath></defs>${ctx}
    <g clip-path="url(#${id})"><path d="${C.pathOf([r],P)}" fill="${K.dcSup}" fill-opacity="0.22" stroke="none"/>${sfoot?`<path d="${sfoot}" fill="${K.fillSup}" stroke="none"/>`:''}<path d="${foot}" fill="none" stroke="${K.ink2}" stroke-width="1" stroke-dasharray="5 3"/>${boxes}${o.under?o.under(P,f):''}<path d="${C.pathOf([r],P)}" fill="none" stroke="${K.ink}" stroke-width="1.6"/>${o.after?o.after(P,f):''}</g>${lead}${C.scaleBar(10,H-30,Math.max(10,Math.round(half/4/10)*10),f.s)}</svg>`;
  return {svg,P,f,bb}; }
const keyItem=(bg,t,o)=>`<span><i style="background:${bg};${o||''}"></i>${esc(t)}</span>`;

/* ===== 3 What fits ===== */
C.add(T,'What fits',{async build(x){
  const M=await x.eng(); if(!M||!M.ring) return {draw:'<p class="f1v-empty">No lot loaded.</p>'};
  const A=BD.S.answers, f=BD.eng.siteFacts(), fm=BD.fitMax(), fp=BD.fitPlan(), tested=M.mwSized;   /* 11 Nov 2026 (J.B., F11 A2): the 'floor space alone' range is not shown */
  const step=(BD.eng.R.steps||[]).find(s=>s>fm+1e-9), nextMw=step!=null?Math.min(step,Math.round((fm+0.1)*10)/10):Math.round((fm+0.1)*10)/10, nxt=Math.round((fm+0.1)*10)/10;
  /* what stops the next size up: the engine names it (site.js fitMax, BD.fitWhy; J.B. 8 Nov 2026: the engine returns it, the card does not rebuild it) */
  const why=fm==null?null:BD.fitWhy();
  let bind=null, bindSrc='';
  if(fm==null) bind='No size fits with these choices.';
  else if(why&&why.t){ bind=`At ${n1(why.mw)} MW: ${why.t.replace(/\.$/,'')}.`; bindSrc={setup:'the tool’s set-up check (site.js setupProblems)',yard:'plant.js bigYard, site.js fitMax',floor:'floor test, site.js fitMax (dc_rooms.json, arch.json ratioGround)',range:'site.js fitMax, siteFacts'}[why.k]||'site.js fitMax'; }
  else { bind=`Above ${n1(fm)} MW the tool’s checks stop passing; the engine names no rule (?).`; bindSrc='site.js fitMax'; }
  const pl=plan(x,M,{aria:'The lot with its building and plant',box:q=>q.name==='standby generators'?K.dcSup:K.dc,
    leaders:[{pts:[BD.centroid(arr(x.sel.ring))],lines:[x.addr,`${n0(x.sel.lotArea)} m² · ${x.zone}`]},
      ...(M.plant&&M.plant.boxes&&M.plant.boxes.length?[{pts:M.plant.boxes.map(q=>BD.centroid(arr(q.ring))),lines:[`${M.plant.boxes.length} ${M.plant.boxes[0].name}`,'in the yard']}]:[]),
      ...(M.foot?[{pts:[BD.centroid(arr(M.foot))],lines:['Building',`${n0(M.footArea)} m² · ${M.nF[0]===M.nF[1]?M.nF[0]:M.nF[0]+'–'+M.nF[1]} storeys`]}]:[])]});
  const sc=100/Math.max(fm||0,tested||0,0.1)/1.12, pct=v=>Math.max(0,Math.min(100,v*sc));
  const meter=`<div class="f1c-eng-a-mt"><h4>The size this lot allows, in MW of servers</h4><div class="f1c-eng-a-rm"><div class="trk"></div>
    ${fm!=null?`<div class="fit" style="left:0;width:${pct(fm)}%"></div><div class="tk" style="left:calc(${pct(tested)}% - 1px)"></div>`:''}
    <span class="lt" style="left:0">0</span>${fm!=null?`<span class="lb" style="left:${pct(fm)}%;transform:translateX(-100%)">${n1(fm)} MW</span>`:''}
    ${fm!=null?`<span class="lt" style="left:${pct(tested)}%;transform:translateX(-50%)">tested ${n1(tested)} MW</span>`:''}</div>
    <div class="f1c-key" style="margin-top:6px">${fm!=null?keyItem(K.ink,'largest size that passes every check: '+n1(fm)+' MW'):''}</div>
    <p class="f1c-eng-a-note"><b class="f1c-eng-a-red">What limits it.</b> <span class="f1c-eng-a-red">${esc(bind)}</span></p></div>`;
  const key=`<div class="f1c-key">${keyItem(K.dcSup,'lot','opacity:.5')}${keyItem('#fff','building','border:1px dashed '+K.ink2)}${keyItem(K.dcSup,'generators')}${(M.plant&&M.plant.boxes||[]).some(q=>q.name!=='standby generators')?keyItem(K.dc,'cooling plant'):''}${keyItem(K.bld,'neighbouring buildings')}</div>`;
  const cool=M.plant&&M.plant.s&&M.plant.s.k?`${M.plant.s.n} ${M.plant.s.k.name}${M.plant.coolRoofIndoor>0&&!(M.plant.boxes||[]).some(q=>q.name===M.plant.s.k.name)?', indoors in a plant room':''}`:'?';
  const meas=fp&&fp.measure?fp.measure.t:'';
  return {draw:`<div class="f1c-eng-a-wrap">${pl.svg}${key}${meter}</div>`,
    lead:`Servers are only part of what has to fit. The size shown is the largest where the building, the cooling plant, the generators and the loading all fit${meas?' '+meas:''}.`,
    hero:[{v:fm!=null?n1(fm):C.q(),u:fm!=null?' MW':'',l:'largest size that fits'},{v:n1(tested),u:' MW',l:'size tested here'}],
    rows:[['Largest that fits',fm!=null?`${n1(fm)} MW of servers${fp&&fp.asIs!=null&&fp.asIs<fm?`; ${n1(fp.asIs)} MW without the plant room`:''}`:'none with these choices'],['Building',`${n0(M.footArea)} m² footprint, ${M.nF[0]===M.nF[1]?M.nF[0]:M.nF[0]+'–'+M.nF[1]} storeys, ${n1(M.H)} m`],['Cooling plant',cool],['Generators',M.plant&&M.plant.s&&M.plant.s.g?`${M.plant.s.gN} sets of ${n1(M.plant.s.g.mw)} MW, ${A.genAt||'yard'}`:'none']],
    more:[['How the size is found',`<p>The tool tries sizes from 0.1 MW up to the most the floor holds and keeps the largest where its set-up checks pass: building height, loading, plant and generators placed, fuel on site, noise, and a floor test for the hall, UPS and battery rooms (site.js fitMax).</p>`],['Warnings at this size',`<p>${(M.warn||[]).length?esc(M.warn.join(' ')):'none'}</p>`]],
    src:['Largest that fits and the plant-room note: BD.fitMax(), BD.fitPlan() (site.js; 0.1 MW search, conservative floor test; register arch_dc_hall, arch_dc_electrical, arch_dc_battery).',`What stops the next size: ${bindSrc||'the tool’s checks'}, run at ${n1(nxt)} MW with the answers restored after.`,'Building, plant boxes and lot: BD.model() (site.js, plant.js).',C.CONTEXT_SRC(x.city)],
    missing:[]}; }});

/* ===== 4 Cooling ===== */
const INSIDE=[['air','Air','Air through the room'],['plate','Liquid to the chip','Cold plates on the chips'],['immersion','Immersion','Servers in fluid']];
const OUTSIDE=[['dry','Dry coolers','No water, fans'],['towers','Cooling towers','Evaporate water'],['hybrid','Hybrid coolers','Dry most hours, wet when hot']];
function waterOf(outside,mw,city){ if(outside==='dry') return [0,0]; const R=BD.eng.R, DW=BD.data.water, fac=[mw*R.pue[0],mw*R.pue[1]], MWh=[fac[0]*8760*R.lf,fac[1]*8760*R.lf], wet=outside==='hybrid'?DW.wet[city][1]:1, CY=DW.cycles;
  const evap=MWh.map(v=>v*1000*DW.evapLkWh*wet/1000); return [evap[1]*(1+1/(CY[1]-1)),evap[1]*(1+1/(CY[0]-1))]; } /* make-up water, m3 a year: engine.js waterView */
const readCool=(city)=>m=>{ const A=BD.S.answers, probs=BD.setupProblems(true).concat(m.noise&&m.noise.block?[m.noise.block]:[]), rec=(A.inside||'air')!=='air', mw=m.mwSized, pp=BD.eng.plantPerMW(rec), R=BD.eng.R, cap=(A.inside||'air')==='air'?[0,0]:(A.inside==='immersion'?[1,1]:R.capture.slice());
  return {fit:!probs.length, why:probs[0]||'', capture:[cap[0]*100,cap[1]*100], captureMW:[cap[0]*mw,cap[1]*mw], space:[pp[0]*mw,pp[1]*mw], water:waterOf(A.outside||'dry',mw,city), lw:m.noise&&m.noise.lw?m.noise.lw.slice():null, mit:m.noise&&m.noise.mit&&m.noise.mit.short||'', kit:m.plant&&m.plant.s&&m.plant.s.k?m.plant.s.k.name:'', n:m.plant&&m.plant.s?m.plant.s.n:0}; };
C.add(T,'Cooling',{async build(x){
  const M=await x.eng(); if(!M||!M.ring) return {draw:'<p class="f1v-empty">No lot loaded.</p>'};
  /* 8 Nov 2026 (J.B.; register chiller_winter_range): the air-cooled chiller (Vertiv Liebert AFC) against the winter design temperature, January 2.5 % */
  const PUr=BD.data.raw.plant_units||{}, WD=((PUr.winterDesign||{})[x.city]||{}).v, CA=PUr.chillAmbient||{}, cMin=(CA.min||{}).v, cR=(CA.minR1234ze||{}).v;
  const isChill=M.plant&&M.plant.s&&M.plant.s.k&&M.plant.s.k.name==='air-cooled chillers', cold=isChill&&WD!=null&&cMin!=null&&WD<cMin;
  const mn=v=>String(v).replace('-','−');
  const wdSrc=x.city==='edm'?'NBC 2020 App. C, January 2.5 %':'BCBC App. C Table C-2, January 2.5 %';
  const winter=!isChill?null:WD==null?{txt:'design winter temperature not in the tool ?',bad:true}:cold?{txt:`outside the maker’s stated range in design winter (?): design ${mn(WD)} °C (${wdSrc}); the Liebert AFC is stated down to ${mn(cMin)} °C at widest (varies by model), ${mn(cR)} °C with R1234ze`,bad:true}:{txt:`within the maker’s stated range: design ${mn(WD)} °C (${wdSrc}); stated down to ${mn(cMin)} °C at widest, ${mn(cR)} °C with R1234ze`,bad:false};
  const A=BD.S.answers, pi=A.inside||'air', po=A.outside||'dry', city=x.city, rd=readCool(city), I={}, O={};
  for(const [k] of INSIDE) I[k]=await x.withAnswers({inside:k},rd);
  for(const [k] of OUTSIDE) O[k]=await x.withAnswers({outside:k},rd);
  const row=(label,sub,set,keys,pick,get,fmt,o)=>{ o=o||{}; const vals=keys.map(k=>get(set[k])), fits=keys.map(k=>set[k].fit), mx=Math.max(...vals.map((v,i)=>fits[i]&&v?v[1]:0),1e-9), mn=o.min||0;
    const bars=keys.map((k,i)=>{ const v=vals[i], nm=(o.names||{})[k]||k;
      if(!fits[i]) return `<div class="f1c-eng-a-bar${k===pick?' pick':''}"><span>${esc(nm)}</span><span class="t"></span><span class="nf">doesn’t fit here<small>${esc(set[k].why).slice(0,70)}</small></span></div>`;
      const w=x=>Math.max(0,Math.min(100,(x-mn)/(mx-mn||1)*100));
      return `<div class="f1c-eng-a-bar${k===pick?' pick':''}"><span>${esc(nm)}${k===pick?' (pick)':''}</span><span class="t">${v[1]>mn?`<i style="width:${w(v[0]).toFixed(1)}%"></i><b style="left:${w(v[0]).toFixed(1)}%;width:${Math.max(0,w(v[1])-w(v[0])).toFixed(1)}%"></b>`:''}</span><span>${esc(fmt(v))}${o.extra?`<small>${esc(o.extra(set[k]))}</small>`:''}</span></div>`; }).join('');
    return `<div class="rl">${esc(label)}<small>${esc(sub)}</small></div><div class="rb">${bars}</div>`; };
  /* 10 Nov 2026 (J.B.): the dry option is named as placed: with an air-cooled hall it is air-cooled chillers (plant.js; engine.js BD.dryName) */
  const nmI={air:'Air',plate:'Liquid to the chip',immersion:'Immersion'}, nmO={dry:pi==='air'?'Air-cooled chillers':'Dry coolers',towers:'Cooling towers',hybrid:'Hybrid coolers'};
  const rg=(v,u,d)=>v[0]===v[1]||Math.abs(v[0]-v[1])<0.05?`${(d===0?n0:n1)(v[1])} ${u}`:`${(d===0?n0:n1)(v[0])}–${(d===0?n0:n1)(v[1])} ${u}`;
  const draw=`<div class="f1c-eng-a-wrap"><div class="f1c-eng-a-cmp">
    <h4>Inside: how the heat leaves the servers <span style="font-weight:400;color:${K.mute}">· outside held at ${esc(nmO[po].toLowerCase())}</span></h4>
    ${row('Heat captured in liquid','share of the servers’ heat, and MW at this size',I,['air','plate','immersion'],pi,s=>[s.captureMW[0],s.captureMW[1]],v=>v[1]===0?'none: all to the air':rg(v,'MW'),{names:nmI,extra:s=>s.capture[1]===0?'':`${n0(s.capture[0])}–${n0(s.capture[1])}% of the heat`.replace(/^(\d+)–\1%/,'$1%')})}
    ${row('Plant space','m² for UPS, batteries, cooling units (and heat pump, liquid loop); equipment only, no service clearances',I,['air','plate','immersion'],pi,s=>s.space,v=>rg(v,'m²',0),{names:nmI})}
    <h4>Outside: how the heat leaves the building <span style="font-weight:400;color:${K.mute}">· inside held at ${esc(nmI[pi].toLowerCase())}</span></h4>
    ${row('Water used','make-up water, m³ a year',O,['dry','towers','hybrid'],po,s=>s.water,v=>v[1]===0?'none for cooling':rg(v,'m³/yr',0),{names:nmO})}
    ${row('Plant noise','sound power of the cooling units, dBA; the bar starts at 90',O,['dry','towers','hybrid'],po,s=>s.lw,v=>rg(v,'dBA'),{names:nmO,min:90,extra:s=>s.mit?'needs '+s.mit:'needs no measure'})}
    ${row('Plant space','m² for UPS, batteries, cooling units; equipment only, no service clearances',O,['dry','towers','hybrid'],po,s=>s.space,v=>rg(v,'m²',0),{names:nmO})}
    </div>
    <div class="f1c-key" style="margin-top:14px"><span><i style="background:${K.ink}"></i>your pick (the tool’s default, kept here)</span><span><i style="background:${K.faint}"></i>the others</span><span><i style="background:${K.faint};opacity:.45"></i>range, low to high</span></div>
    ${winter?`<p class="f1c-eng-a-note"${winter.bad?' style="border-left:2px solid #CC746C;padding-left:10px"':''}><b>Air-cooled chillers in design winter:</b> ${winter.bad?'<span style="color:#CC746C">':''}${C.esc(winter.txt)}${winter.bad?'</span>':''}.</p>`:''}
    <p class="f1c-eng-a-note"><b>Electricity is not compared.</b> The tool uses one PUE range for every cooling type (R.pue, ${BD.eng.R.pue[0]}–${BD.eng.R.pue[1]}; industry surveys, not this design): per-type figures <b class="f1c-q">?</b> <span class="f1c-qn">not in the tool yet</span></p></div>`;
  const insFail=INSIDE.filter(([k])=>!I[k].fit).map(([k])=>nmI[k]), outFail=OUTSIDE.filter(([k])=>!O[k].fit).map(([k])=>nmO[k]);
  return {draw,lead:'Trade-offs, not a verdict. Each side is compared with the other held at the current pick; the pick drives every later card. Here the tool’s default pick stays.',
    hero:[{v:nmI[pi],l:'inside, now'},{v:nmO[po],l:'outside, now'},{v:`${M.plant.s.n}`,u:` ${M.plant.s.k.name}`,l:'cooling units placed'}],
    rows:[...(winter?[['Chillers in design winter',winter.bad?C.q(cold?'outside the maker’s stated range':'not in the tool yet'):'within the stated range']]:[]),['Picked inside',`${nmI[pi]} (${pi==='air'?'the tool’s default':'chosen'})`],['Picked outside',`${nmO[po]}${po==='dry'&&pi==='air'?' (the dry option: with an air-cooled hall the tool places air-cooled chillers, not dry coolers)':''}`],['Size tested',`${n1(M.mwSized)} MW of servers`],['Fail the fit check here',[...insFail,...outFail].join(', ')||'none']],
    more:[['How each figure is found',`<p>Each option is set, the model rebuilt, the figure read, and the answers put back exactly (the tool’s own functions, nothing stored). Heat captured: R.capture ${BD.eng.R.capture[0]}–${BD.eng.R.capture[1]} of the heat for liquid to the chip; immersion takes all of it (not verified). Plant space: plantPerMW × size. Water: the make-up water of the Water panel. Noise: the Lw of the units the plant layout places. A type that breaks a set-up check at this size shows “doesn’t fit here”.</p>`]],
    src:[...(isChill?[`Chillers in design winter: Vertiv Liebert AFC installer guide SL-70790, s. 1.4.3 and Table 1.1, p. 10 (register vertivAFC_limits, maker claim): ambient −28.9 to 45 °C, varies by model; not below −20 °C with R1234ze. Design temperature: ${x.city==='edm'?'NBC 2020 Div. B App. C, Edmonton, January 2.5 % (register nbc20_climate)':'BCBC App. C Table C-2, Vancouver City Hall, January 2.5 % (register arch_bcbcAppC)'}; tool/data/plant_units.json. A flag, not a block.`]:[]),'Heat captured: R.capture (register liquid_capture, peer figures); immersion = all heat to the liquid (register, not verified).','Plant space: BD.eng.plantPerMW (register component_space, manufacturer claims, equipment only; clearances not sourced).',`Water: engine.js waterView (evaporation ≤ ${BD.data.water.evapLkWh} L per kWh of heat, ${BD.data.water.cycles[0]}–${BD.data.water.cycles[1]} cycles; hybrids wet in the hours above 18 °C; CWEC).`,'Plant noise: Lw per unit (tool/data/noise.json lwUnit, lwUnitDry; maker claims) plus 10 log N, N from plant.js sizeFor; mitigation from engine.js noiseCheck.','Fit check: site.js setupProblems and the noise check at this size.'],
    missing:['electricity per cooling type (the tool uses one PUE range)',...(cold?['whether a cold-climate version of the chiller exists for this design winter (maker range varies by model)']:[])]}; }});

/* ===== 5 Backup power ===== */
C.add(T,'Backup power',{async build(x){
  const M=await x.eng(); if(!M||!M.ring) return {draw:'<p class="f1v-empty">No lot loaded.</p>'};
  const A=BD.S.answers, R=BD.eng.R, P=M.plant, S=P&&P.s, mw=M.mwSized, eq=BD.eng.equip(mw), none=A.gens==='none', g=S&&S.g, gT=P&&P.genTank;
  const fac=[mw*R.pue[0],mw*R.pue[1]], fuel12=[fac[0]*1000*R.fuelHours*R.fuelLkWh,fac[1]*1000*R.fuelHours*R.fuelLkWh], tankTot=g&&gT?S.gN*gT.L:null;
  const gb=(P&&P.boxes||[]).filter(q=>q.name==='standby generators'), at=none?null:(A.genAt||'yard');
  const upsMWh=[mw/60*10,mw/60*15];   /* F11 B4: 10–15 min (FM 5-32) */
  const pl=plan(x,M,{aria:'Where the generators sit on the lot',box:q=>q.name==='standby generators'?K.dc:K.neut,leaders:[
    ...(gb.length?[{pts:gb.map(q=>BD.centroid(arr(q.ring))),lines:[`${gb.length} generator sets`,`${n1(g.mw)} MW each · ${at==='roof'?'on the roof':'in the yard'}`]}]:[]),
    ...(M.foot?[{pts:[BD.centroid(arr(M.foot))],lines:['UPS and batteries','inside the building, not drawn']}]:[]),
    {pts:[BD.centroid(arr(x.sel.ring))],lines:[x.addr]}]});
  const key=`<div class="f1c-key">${keyItem(K.dc,'standby generators')}${keyItem('#fff','building','border:1px dashed '+K.ink2)}${keyItem(K.dcSup,'lot','opacity:.5')}<span class="f1c-note">UPS modules and battery cabinets sit inside the building: the tool counts their floor space, it does not draw them.</span></div>`;
  const loadMW=S&&S.Q, capMW=g?S.gN*g.mw:null, carry=g?S.gNeed*g.mw:null;
  const meters=g?[{l:'Generator capacity against the load it carries',v:loadMW,lim:carry,max:capMW*1.05,unit:'MW',pass:loadMW<=carry+1e-9,cap:`${n1(loadMW)} MW load · ${S.gNeed} sets of ${n1(g.mw)} MW carry ${n1(carry)} MW · ${S.gN-S.gNeed} spare`,src:'plant.js sizeFor'}]:[];
  return {draw:`<div class="f1c-eng-a-wrap">${pl.svg}${key}</div>`,
    lead:none?'No generators are chosen in this set-up, so the batteries carry the load until the utility returns.':'Standby power in three parts: diesel generators outdoors, UPS modules that bridge the first minutes, and batteries behind them.',
    hero:[{v:g?String(S.gN):'0',u:g?` × ${n1(g.mw)} MW`:'',l:'standby generators'},{v:fuel12?fmtL(fuel12[1]):C.q(),u:' L',l:'fuel for 12 h at the high end'},{v:String(eq.ups),u:' × 1 MW',l:'UPS modules'},{v:rng(eq.batt[0],eq.batt[1],0),l:'battery cabinets'}],
    meters,
    rows:[['Generators',g?`${S.gN} sets: ${S.gNeed} carry the load, ${S.gN-S.gNeed} spare · ${n1(g.mw)} MW each, ${n1(g.L)} × ${n1(g.W)} m, ${n1(g.H)} m high (Rehlko KD2000, maker claim)`:'none chosen'],
      ['Where the generators sit',g?`${at==='roof'?'on the roof':'in the yard'}: ${P.placed?P.placed.gy:0} in the yard, ${P.placed?P.placed.gr:0} on the roof (plant.js layout)`:'–'],
      ['Fuel in the set bases',g&&gT?`about ${fmtL(gT.L)} L a set, ${fmtL(tankTot)} L in all (sub-base tanks, maker claim)`:'–'],
      ['Fuel for 12 hours',`${fmtL(fuel12[0])}–${fmtL(fuel12[1])} L (${rng(fac[0],fac[1])} MW × ${R.fuelHours} h × ${R.fuelLkWh} L per kWh; Uptime minimum, maker rate)`],
      ['UPS modules',`${eq.ups} of 1,000 kW (load ÷ 1,000 kW, one spare unless set to none or 2N; vendor figure)`],
      ['Battery cabinets',`${rng(eq.batt[0],eq.batt[1],0)} (${R.equip.cabKW[1]}–${R.equip.cabKW[0]} kW each for 15–10 min: Vertiv EnergyCore Li5, 31.1 kWh, maker claim; the rating at these runtimes is our arithmetic)`],
      ['Battery runtime',`10–15 minutes (FM 5-32 3.5.2.1, insurer guidance; J.B. 11 Nov 2026), about ${rng(upsMWh[0],upsMWh[1])} MWh at full load (our arithmetic)`],
      ['Floor space, UPS and batteries',`${rng((R.plant.ups[0]+R.plant.batt[0])*mw,(R.plant.ups[1]+R.plant.batt[1])*mw,0)} m² (${R.plant.ups[0]}–${R.plant.ups[1]} + ${R.plant.batt[0]}–${R.plant.batt[1]} m² per MW; register component_space)`]],
    more:[['Where the fuel rule applies',`<p>In the yard the sets stand at grade, 3 m from the property line and 1.5 m from the building (CSA B139.1.0 Table 2). On a roof each tank is limited to ${BD.data.equipment&&BD.data.equipment.roofTank?n0(BD.data.equipment.roofTank.each):'?'} L and the supply line to ${BD.data.equipment&&BD.data.equipment.roofTank?n0(BD.data.equipment.roofTank.line):'?'} L (CSA B139.1.1 6.5.3).</p>`],['The generator list the plant layout gives',`<p>${(P&&P.genLines||[]).slice(0,2).map(esc).join('<br>')||'none'}</p>`]],
    src:['Generator count and size: plant.js sizeFor (Rehlko KD2000 2,000 kW standby; manufacturer claim; register genset sizing, chosen 29 Oct 2026).','Fuel: R.fuelHours × R.fuelLkWh (register fuel_on_site; NFC 2020 Table 4.3.13.4.-B; fuel rate a manufacturer claim; Uptime ≥ 12 h). Tank per set: plant.js genTank (maker sub-base tank).','UPS and batteries: BD.eng.equip, R.equip (register ups_modules, battery_cabinets; vendor claims). Runtime: register ups_flex (operator claims).','Placement: BD.model().plant (plant.js), with CSA C282 and B139.1.0 clearances.',C.CONTEXT_SRC(x.city)],
    missing:['where the UPS and battery rooms sit inside the building (not drawn)']}; }});

/* ===== 6 Noise ===== */
const NR=260;
async function noiseData(x,M){ const s=x.sel, nc=M.noise, pc=nc&&nc.src, r=arr(s.ring); if(!nc||!pc) return null;
  const lots=[], seen=new Set(), blds=new Set(), adj=[];
  for(const k in BD.S.tiles){ if(!k.startsWith(x.city+':')) continue; const t=BD.S.tiles[k];
    for(const p of t.par||[]){ if(isMine(x,p)) continue; const key=(p.id||p.ids)+':'+p.r[0]; if(seen.has(key)) continue; seen.add(key); const bb=p.bb||C.bbox(p.r); if(bb[0]>pc[0]+NR||bb[2]<pc[0]-NR||bb[1]>pc[1]+NR||bb[3]<pc[1]-NR) continue;
      const id=p.ids?p.ids[0]:p.id, a=t.A[id]||[]; lots.push({k2:(p.ids?p.ids[0]:p.id)+':'+p.r[0],r:arr(p.r),id,a,addr:a[0]?C.titleCase(a[0]):'',zone:x.city==='van'?String(a[1]||'').trim():String(a[2]||a[1]||'').trim(),v:null,nb:0}); } }
  for(const k in BD.S.tiles){ if(!k.startsWith(x.city+':')) continue; for(const q of BD.S.tiles[k].bld||[]){ if(blds.has(q)) continue; blds.add(q); const v=BD.eng.noiseLevel(q); if(!v) continue; const c=cen(arr(q.r)); if(Math.hypot(c[0]-pc[0],c[1]-pc[1])>NR) continue;
      const lot=lots.find(l=>pip(c[0],c[1],l.r)); if(!lot) continue; lot.nb++; if(!lot.v||v.d<lot.v.d) lot.v=Object.assign({},v); if(v.hi>lot.v.hi) lot.v.hi=v.hi; q.__eng=v; } }
  /* lots with no building on record: the tool tests them at their lot line since 8 Nov 2026 (engine noiseLot; point of reception: our reading) */
  for(const l of lots){ if(l.v) continue; const v=BD.eng.noiseLot&&BD.eng.noiseLot(l.k2); if(v) l.v=Object.assign({},v); }
  /* adjoining lots still without a level (e.g. an outline the engine merged into another lot): shown as not tested */
  for(const l of lots){ if(l.v) continue; if(ringNear(r,l.r)<3) adj.push(l); }
  return {lots:lots.filter(l=>l.v).sort((a,b)=>a.v.d-b.v.d),untested:adj,pc,nc}; }
C.add(T,'Noise',{async build(x){
  const M=await x.eng(); if(!M||!M.ring) return {draw:'<p class="f1v-empty">No lot loaded.</p>'};
  const D=await noiseData(x,M); if(!D) return {draw:'<p class="f1v-empty">The noise check did not run for this set-up.</p>'};
  const nc=D.nc, city=x.city, LOT=D.lots, near=LOT.slice(0,60), R=BD.eng.R;
  const worst=nc.worst, ok=!nc.block;
  const bad=l=>l.v.hi>l.v.L, over=l=>l.v.lo>l.v.Ls;
  const shade=l=>over(l)?K.red:bad(l)?'#E8C3BF':(l.v.hi>l.v.L-10?K.dcSup:K.fillHall);
  const gen=(M.notes||[]).filter(n=>/^Generator test/.test(n))[0]||'';
  const GN=(BD.data.raw.noise||{}).gen||{}, gv=GN.van, ge=GN.edm;
  const genRule=city==='van'?(gv?`Generator testing: up to ${gv.test.v} dBA at the point of reception, or 6.1 m from the source if that is farther, once a month for up to 60 minutes in the daytime, plus once a year for up to 180 minutes. By-law 6555 s. 4.1(c).`:null):(ge?`Generator testing, daytime: up to one hour a day at ${ge.resTest1h.v} dB(A) at residential lines and ${ge.nonTest1h.v} at non-residential. At night: ${ge.resNight.v} and ${ge.nonNight.v}, no allowance. Bylaw 14600 ss. 19(3), 21(3), 20, 22; s. 24 has no generator exemption.`:null);
  const lotsSvg=LOT.map(l=>`<path d="${C.pathOf([l.r],()=>[0,0])}"/>`).length&&'';
  const pl=plan(x,M,{half:Math.max(120,Math.min(NR,(LOT[3]?LOT[3].v.d:80)*1.35+60)),W:620,H:300,aria:'Predicted plant noise at the neighbouring lots against each limit',
    under:(P)=>{ let s=''; for(const l of LOT.slice(0,200)){ s+=`<path d="${C.pathOf([l.r],P)}" fill="${shade(l)}" fill-opacity="0.55" stroke="#fff" stroke-width="0.6"><title>${esc((l.addr||'lot')+' · '+n0(l.v.lo)+'–'+n0(l.v.hi)+' dBA · limit '+l.v.L)}</title></path>`; } return s; },
    after:(P)=>{ const [px,py]=P(D.pc[0],D.pc[1]); let s=`<g stroke="${K.ink}" stroke-width="1.6"><line x1="${px-6}" y1="${py}" x2="${px+6}" y2="${py}"/><line x1="${px}" y1="${py-6}" x2="${px}" y2="${py+6}"/></g>`;
      for(const u of D.untested){ const c=cen(u.r), [ux,uy]=P(c[0],c[1]); s+=`<path d="${C.pathOf([u.r],P)}" fill="none" stroke="${K.red}" stroke-width="1.2" stroke-dasharray="4 3"/>`; if(D.untested.length<4) s+=`<text x="${ux.toFixed(1)}" y="${(uy+9).toFixed(1)}" text-anchor="middle" font-size="26" font-weight="500" fill="${K.red}">?</text>`; }
      return s; },
    leaders:[
      ...(worst?[{pts:(()=>{ const w=LOT.find(l=>(l.addr||'').toUpperCase()===(worst.addr||'').toUpperCase()); return w?[cen(w.r)]:[]; })(),lines:[C.titleCase(worst.addr||'worst case'),`${n0(nc.worst.lo)}–${n0(nc.worst.hi)} dBA without the measure`,`limit ${worst.L} dBA`]}]:[]),
      {pts:[BD.centroid(arr(x.sel.ring))],lines:[x.addr,`plant: ${nc.where}`]}]});
  const key=`<div class="f1c-key">${keyItem(K.fillHall,'lot: level well under its limit')}${keyItem(K.dcSup,'within 10 dBA of the limit')}${keyItem('#E8C3BF','over the limit with standard-rating units')}${keyItem(K.red,'over the limit with the quieter rating')}<span><b style="font-weight:500">+</b> plant centre</span>${D.untested.length?`<span><b class="f1c-q">?</b> not tested</span>`:''}</div>`;
  const tbl=`<div class="f1c-eng-a-mt"><h4>Predicted level at the nearest lots, against each lot’s limit</h4><table class="f1c-eng-a-tbl"><tr><th>Lot (point of reception)</th><th>Zone</th><th>Distance</th><th>Level, with the measure</th><th>Without it</th><th>Night limit</th></tr>
    ${LOT.slice(0,5).map(l=>`<tr><td>${esc(l.addr||'no address on record')}${l.v.noBld?'<small style="display:block;color:#7B7E83">no building on record: tested at its lot line (our reading)</small>':''}</td><td>${esc(l.zone||'?')}</td><td>${n0(l.v.d)} m</td><td class="${bad(l)?'r':''}">${n0(l.v.lo)}–${n0(l.v.hi)} dBA</td><td>${n0(l.v.lo0)}–${n0(l.v.hi0)} dBA</td><td>${l.v.L===l.v.Ls?l.v.L:l.v.L+' / '+l.v.Ls} dBA</td></tr>`).join('')}
    ${D.untested.slice(0,1).map(u=>`<tr><td>${esc(u.addr||'lot')}</td><td>${esc(u.zone||'?')}</td><td>adjoins</td><td class="r" colspan="3"><b class="f1c-q">?</b> not tested</td></tr>`).join('')}</table>
    <p class="f1c-eng-a-note">Levels at a lot are at its point nearest the plant, from the tool’s own check; the limit is that lot’s night limit (${esc(nc.sec||'')}). Where two limits show, the first is for the quieter-rated units, the second for standard units.</p></div>`;
  /* the lot's own lines: the nearest tested lot beyond each */
  const eY=M.edgeYards||[], lineRows=eY.map(e=>{ let b=null; for(const l of LOT){ let d=1e9; for(let i=0,j=l.r.length-2;i<l.r.length;j=i,i+=2) d=Math.min(d,segD(l.r[i],l.r[i+1],e.ax,e.ay,e.bx,e.by),segD(e.ax,e.ay,l.r[j],l.r[j+1],l.r[i],l.r[i+1])); if(!b||d<b.d) b={l,d}; } return {e,b}; });
  const lineTbl=lineRows.length?`<table class="f1c-eng-a-tbl"><tr><th>Lot line</th><th>Faces</th><th>Nearest tested lot beyond it</th><th>Level, with the measure</th><th>Limit</th></tr>${lineRows.map(({e,b},i)=>`<tr><td>${esc(e.kind||'?')} ${i+1}, ${n0(e.len)} m</td><td>${esc(e.abuts||'?')}</td><td>${b?esc((b.l.addr||'lot')+', '+n0(b.d)+' m away'):'?'}</td><td>${b?`${n0(b.l.v.lo)}–${n0(b.l.v.hi)} dBA`:'?'}</td><td>${b?b.l.v.L+' dBA':'?'}</td></tr>`).join('')}</table>`:'<p>no lot lines read</p>';
  const mitTxt=nc.req||nc.block||(nc.mit&&nc.mit.short?`Needs ${nc.mit.short}.`:'No measure needed: the plant is under every limit as drawn.');
  const worstTxt=worst?`${C.titleCase(worst.addr||'a lot')} (${worst.zt}), ${n0(worst.d)} m from the plant: ${n0(worst.lo)}–${n0(worst.hi)} dBA without the measure against ${worst.L} dBA`:'no lot is over a limit';
  const meas=nc.mit&&nc.mit.room?`−${nc.mit.room.dB} dB (plant room)`:nc.mit&&nc.mit.fan?`−${nc.mit.fan.dB} dB (night fan speed)`:nc.mit&&nc.mit.ln?'low-noise chillers':nc.mit&&nc.mit.screen?'screen':null;
  return {draw:`<div class="f1c-eng-a-wrap">${pl.svg}${key}${tbl}</div>`,
    lead:ok?`The plant runs all night, so the night limit governs. ${nc.req?'It passes only with the measure below.':'It passes as drawn.'}`:'The plant would be over a limit that no modelled measure brings under; the tool blocks this set-up.',
    hero:[{v:worst?`${n0(worst.lo)}–${n0(worst.hi)}`:C.q(),u:' dBA',l:'worst case without a measure'},{v:worst?String(worst.L):C.q(),u:' dBA',l:'its night limit'},{v:worst?String(Math.round(worst.d)):C.q(),u:' m',l:'from the plant'},{v:meas?meas.split(' (')[0]:'none',l:'measure the tool requires'+(meas&&meas.includes(' (')?': '+meas.split(' (')[1].replace(')',''):''),red:false}],
    rows:[['Worst case',worstTxt],['What the tool requires',mitTxt.replace(/^Noise: /,'')],['Cooling plant sits',nc.where],['Sound power of the plant',`${n0(nc.lw[0])}–${n0(nc.lw[1])} dBA (${nc.n} units; maker claims)`],['Lots tested',`${n0(nc.tested)} receivers within the check’s radius`],['Generator testing',gen?gen.replace(/^Generator test \(/,'(').split(': ').slice(1).join(': ').slice(0,200):'?']],
    more:[['The lot’s own lines',lineTbl],['Generator test',`<p>${esc(genRule||'not in the tool')}</p>${gen?`<p>${esc(gen)}</p>`:''}`],['Method',`<p>Lp = Lw − 20 log r − 8 (free field over hard ground), r the distance from the plant to the lot’s nearest point, at least 5 m; groups of units are summed in dB. Unit ratings are maker claims (a quieter and a standard rating are both tried). Measures are tried in order: none, low-noise chillers or night fan speed, a screen, then a plant room (−${nc.mit&&nc.mit.room?nc.mit.room.dB:BD.eng.NMIT.room.dB} dB, NSW 2021 terms). Unit housings and silencers get no credit.</p>`]],
    src:['Levels and limits: engine.js noiseCheck and noiseLevel (Lp = Lw − 20 log r − 8; limits from the receiving lot’s zone: '+(city==='van'?'Noise Control By-law 6555 s. 2.3(b)':'Bylaw 14600 ss. 20, 22')+').','Unit Lw: tool/data/noise.json (lwUnit, lwUnitDry; manufacturer claims).','Plant room −25 dB: register arch_nz_nswDcNoise (NSW 2021 Table 4-5).','Generator testing: tool/data/noise.json gen (van6555s41c; edm14600s19to24); the note above is the tool’s own check.','Lots, zones and buildings: loaded tiles as the tool holds them.'+(city==='van'?' Every neighbouring lot is tested, with or without a building (8 Nov 2026): By-law 6555 s. 1.2 puts the point of reception outside “the property occupied by the recipient”; that an empty lot has one is our reading (register van6555_por).':''),C.CONTEXT_SRC(city)],
    missing:[...(D.untested.length?[`${D.untested.length} adjoining lot(s) not tested`]:[]),'level at the own lot lines (the tool tests receiving lots, not the lot’s own lines)']}; }});
})();
