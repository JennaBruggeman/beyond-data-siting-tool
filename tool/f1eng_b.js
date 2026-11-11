/* Beyond Data — F1 Engineering cards, group 'b' (CODE_JOB_F1 step 3, Engineering): 7 Heat offered, 8 Who could take it, 9 Electricity, 10 Water, 11 Materials, 12 Report.
   Every card reads the Engineering state (x.eng(): the tool's 'full' tier, lot sized by findFit). The figures follow the tool's own panels (engine.js energyView, waterView,
   materialsView; cards.js heat index); where the tool keeps a function private the arithmetic is repeated here with the same constants and the panel named in the source line.
   Drawings are plans of the lot (the tool's frame, tiles and plant boxes), not 3-D: the 3-D scene is not drawn into a card. */
(function(){
'use strict';
const BD=window.BD, C=BD.f1cards, K=C.K, esc=C.esc, T='engineering', NS='f1c-eng-b-';
if(!document.getElementById('f1c-eng-b')){ const st=document.createElement('style'); st.id='f1c-eng-b'; st.textContent=`
.${NS}wrap{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%}
.${NS}wrap svg{max-width:100%;height:auto}
.${NS}two{display:flex;gap:26px;width:100%;align-items:flex-start}
.${NS}two>*{min-width:0}
.${NS}tab{border-collapse:collapse;width:100%;font-size:12.5px}
.${NS}tab th{font-weight:400;color:var(--f-mute);text-align:left;font-size:11.5px;padding:0 8px 6px 0;border-bottom:1px solid var(--f-rule)}
.${NS}tab td{padding:4px 8px 4px 0;white-space:nowrap;border-bottom:1px solid var(--f-hair);color:var(--f-ink2);vertical-align:top}
.${NS}tab td.r,.${NS}tab th.r{text-align:right}
.${NS}tab td.n{color:var(--f-mute);width:22px}
.${NS}tab button{all:unset;cursor:pointer;color:var(--f-ink);border-bottom:1px solid var(--f-rule)}
.${NS}tab button:hover,.${NS}tab button:focus-visible{border-bottom-color:var(--f-ink)}
.${NS}st{font-size:11.5px;color:var(--f-ink2)}
.${NS}st.bey{color:var(--f-mute)}
.${NS}pop{position:absolute;top:60px;right:0;bottom:0;width:min(580px,92vw);background:#fff;border-left:1px solid var(--f-rule);box-shadow:-6px 0 24px rgba(22,24,27,.08);z-index:20;overflow:auto;padding:18px 26px 28px;font-size:13px;line-height:1.55;color:var(--f-ink2)}
.${NS}pop h2{font-size:19px;font-weight:400;margin:6px 0 10px;color:var(--f-ink)}
.${NS}pop h3{font-size:13.5px;font-weight:500;margin:16px 0 6px;color:var(--f-ink)}
.${NS}pop dl{display:grid;grid-template-columns:150px 1fr;gap:0 14px;margin:0}
.${NS}pop dt{color:var(--f-mute);padding:5px 0;border-bottom:1px solid var(--f-hair)}
.${NS}pop dd{margin:0;padding:5px 0;border-bottom:1px solid var(--f-hair)}
.${NS}pop .sub,.${NS}pop .src{font-size:12px;color:var(--f-mute)}
.${NS}pop #payer,.${NS}pop .dx,.${NS}pop .dback{display:none}
.${NS}pop .x{float:right;all:unset;cursor:pointer;font-size:13px;color:var(--f-ink2);border:1px solid var(--f-rule);border-radius:999px;padding:3px 12px;position:sticky;top:0;background:#fff}
.${NS}pages{display:flex;gap:16px;overflow-x:auto;padding:4px 2px 14px;width:100%}
.${NS}pg{flex:0 0 190px}
.${NS}pg .sh{border:1px solid var(--f-rule);background:#fff;line-height:0}
.${NS}pg .sh svg{width:100%;height:auto;display:block}
.${NS}pg .no{font-size:11.5px;color:var(--f-mute);margin-top:6px;line-height:1.4}
.${NS}pg .no b{font-weight:400;color:var(--f-ink);display:block}
.${NS}btn{all:unset;cursor:pointer;background:var(--f-ink);color:#fff;font-size:13.5px;padding:11px 20px;border-radius:2px;margin-top:6px}
@media print{#f1v>*:not(.f1v-body){display:none!important}#f1v .f1v-panel,#f1v .f1v-chips,#f1v .f1v-how,#f1v .f1v-src,.${NS}btn{display:none!important}}
`; document.head.appendChild(st); }

/* ---------------- helpers ---------------- */
const CITYN={van:'Vancouver',edm:'Edmonton'};
const fm=v=>v==null||!isFinite(v)?'?':Math.round(v).toLocaleString('en-CA');
const f1=v=>v==null||!isFinite(v)?'?':(Math.round(v*10)/10).toLocaleString('en-CA');
const rg=(a,b,fn)=>{ fn=fn||fm; const A=fn(a), B=fn(b); return A===B?A:A+'–'+B; };
const srcTxt=(fn,k)=>{ try{ const d=document.createElement('div'); d.innerHTML=fn(k); return d.textContent.replace(/\s+/g,' ').trim(); }catch(e){ return ''; } };
const reg=k=>srcTxt(BD.eng.src,k), reg3=k=>srcTxt(BD.eng.s3,k);
const TXT=(x,y,s,o)=>{ o=o||{}; return `<text x="${x}" y="${y}" font-size="${o.fs||12}" fill="${o.c||K.ink2}"${o.w?` font-weight="${o.w}"`:''}${o.a?` text-anchor="${o.a}"`:''}>${esc(s)}</text>`; };
const niceMax=v=>{ if(!(v>0)) return 1; const p=Math.pow(10,Math.floor(Math.log10(v))), m=v/p; return (m<=1?1:m<=2?2:m<=2.5?2.5:m<=5?5:10)*p; };
/* range bars on one scale (STYLE.md §5): dark to the low end, light to the high end. rows [{l, lo, hi, col, col2, val}] */
function rbars(rows,o){ o=o||{}; const W=o.W||300, x0=o.x0||0, y0=o.y0||0, pitch=o.pitch||44, bw=W-(o.pad==null?96:o.pad), mx=niceMax(o.max||Math.max(...rows.map(r=>r.hi!=null?r.hi:r.lo)));
  const X=v=>x0+bw*Math.min(1,v/mx); let s='';
  const ticks=[0,.25,.5,.75,1]; const H=rows.length*pitch;
  ticks.forEach(t=>{ s+=`<line x1="${(x0+bw*t).toFixed(1)}" y1="${y0}" x2="${(x0+bw*t).toFixed(1)}" y2="${y0+H}" stroke="${K.hair}" stroke-width="1"/>`+TXT((x0+bw*t).toFixed(1),y0+H+14,(o.tf||fm)(mx*t),{fs:11,c:K.mute,a:t===0?'start':t===1?'end':'middle'}); });
  rows.forEach((r,i)=>{ const y=y0+i*pitch, hi=r.hi!=null?r.hi:r.lo, c1=r.col||K.dc, c2=r.col2||K.dcSup; s+=TXT(x0,y+14,r.l,{fs:12,c:K.ink2});
    if(r.fail){ s+=TXT(x0,y+33,'doesn’t fit here',{fs:12,c:K.red}); return; }
    s+=`<rect x="${x0}" y="${y+20}" width="${Math.max(0,X(r.lo)-x0).toFixed(1)}" height="14" fill="${c1}"/>`; if(hi>r.lo) s+=`<rect x="${X(r.lo).toFixed(1)}" y="${y+20}" width="${(X(hi)-X(r.lo)).toFixed(1)}" height="14" fill="${c2}"/>`;
    s+=TXT((X(hi)+6).toFixed(1),y+31,r.val||rg(r.lo,hi,o.vf),{fs:12,c:K.ink}); });
  return {s,h:H+22}; }
/* the lot plan: tool's frame, tiles (neighbours and buildings), lot outline, footprint, plant boxes. Returns {svg(inner), f(P,I,s), box} drawn into a nested <svg> at (ox,oy) */
function planInner(x,M,o){ const sel=x.sel, r=sel.ring, b=C.bbox(r), cx=(b[0]+b[2])/2, cy=(b[1]+b[3])/2, half=Math.max(b[2]-b[0],b[3]-b[1])/2, R=o.R||Math.max(55,half*1.7), asp=o.W/o.H, bb=[cx-R*asp,cy-R,cx+R*asp,cy+R], f=C.frame(bb,o.W,o.H,0);
  let s=C.context(x,f.P,f.I,[0,0,o.W,o.H],{skip:sel.id});
  s+=`<path d="${C.pathOf([r],f.P)}" fill="#fff" fill-opacity="0.8" stroke="${K.ink}" stroke-width="1.8"/>`;
  if(M&&M.foot&&M.foot.length) s+=`<path d="${C.pathOf([M.foot],f.P)}" fill="${K.fillHall}" stroke="${K.ink}" stroke-width="1" stroke-dasharray="5 3"/>`;
  const boxes=(M&&M.plant&&M.plant.boxes)||[]; for(const bx of boxes){ if(bx.ring) s+=`<path d="${C.pathOf([bx.ring],f.P)}" fill="${bx.kind==='roof'?K.fillSup:K.neut}" stroke="none"/>`; }
  return {s,f,b,cx,cy,R,boxes}; }
function nestSvg(ox,oy,W,H,inner){ return `<svg x="${ox}" y="${oy}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" overflow="hidden">${inner}</svg>`; }
const ctr=ring=>{ let sx=0,sy=0,n=0; for(let i=0;i<ring.length;i+=2){ sx+=ring[i]; sy+=ring[i+1]; n++; } return [sx/n,sy/n]; };
const rightmost=(P,ring)=>{ let best=null; for(let i=0;i<ring.length;i+=2){ const p=P(ring[i],ring[i+1]); if(!best||p[0]>best[0]) best=p; } return best; };
/* a straight horizontal leader to a label at the right of the drawing (STYLE.md §6 rule 9) */
const leader=(ax,ay,lx,t1,t2,red)=>`<circle cx="${ax.toFixed(1)}" cy="${ay.toFixed(1)}" r="2" fill="${red?K.red:K.ink}"/><line x1="${ax.toFixed(1)}" y1="${ay.toFixed(1)}" x2="${lx-6}" y2="${ay.toFixed(1)}" stroke="${red?K.red:K.ink}" stroke-width="0.5"/>`+TXT(lx,(ay-1).toFixed(1),t1,{fs:13,c:red?K.red:K.ink,w:500})+(t2?TXT(lx,(ay+14).toFixed(1),t2,{fs:11.5,c:K.mute}):'');
const stateKey=()=>{ const A=BD.S.answers, s=BD.S.sel; return [s&&s.city,s&&s.id,A.mw,A.inside||'',A.outside||'',A.built,A.gens||'',A.genAt||'',A.spares||''].join('|'); };
const modelNow=async x=>{ const M=await x.eng(); return M; };

/* ---------------- heat data (the pieces of cards.js heatIndex that compute; nothing is drawn into the old tool) ---------------- */
let HD=null;
async function heatData(x){ await modelNow(x); const e=BD.eng, key=stateKey(); if(HD&&HD.key===key) return HD;
  const f=e.siteFacts(), A=BD.S.answers, M=BD.model(), mw=A.mw||(M&&M.mwSized)||1; await BD.opps(); const d=await e.loadRecv(f.city), nets=e.netsAt(f,d); await BD.routeTree(f);
  const all=d.pts.map(p=>Object.assign({},p,{dist:Math.hypot(p.x-f.c[0],p.y-f.c[1])})).filter(p=>p.dist<=e.R.recvRadius).sort((a,b)=>a.dist-b.dist);
  const r=e.calc({mw,recover:true,to:'near'},f,all,nets); all.forEach(p=>{ p.econ=BD.heatEcon(f,p,r.avail); });
  const B=BD.bestHeat(f,all,r.avail[0]); const cnt={within:0,depends:0,beyond:0,unknown:0}; all.forEach(p=>{ cnt[p.econ.status]=(cnt[p.econ.status]||0)+1; });
  return HD={key,f,A,M,mw,all,nets,r,B:B&&B[0]?B[0]:null,cnt,e}; }

/* ======================= 7 Heat offered ======================= */
C.add(T,'Heat offered',{async build(x){
  const M=await modelNow(x), H=await heatData(x), {f,r,B,mw,e,all}=H, R=e.R, E=BD.ECON, A=H.A, city=x.city, ink=(A.inside||'air')!=='air';
  const itMWh=r.itMWh, itR=r.itMWhR, cap=[itR[0]*R.capture[0],itR[1]*R.capture[1]], hpMW=[r.avail[0]/E.hpFLH[1],r.avail[1]/E.hpFLH[0]];
  const worth=E.heatVal(city), flh=E.hpFLH, share=[flh[0]/8760,flh[1]/8760];
  const supply=[60,70]; /* sink supply temperatures the tool tests: cards.js HS.sinks (60 °C panel radiators, 70 °C baseboards and fan coils); the servers' liquid loop leaves at 37.5 °C (HS.src) */
  const nearest=(B&&B.G[0])||all.find(p=>p.econ.take)||all[0];
  const W=1000, H0=540, PW=500, PHt=480, ox=250, oy=20;
  const pl=planInner(x,M,{W:PW,H:PHt}), f0=pl.f; let inner=pl.s;
  const bld=M.foot&&M.foot.length?M.foot:null, rr=x.sel.ring;
  let lead='', arrow='';
  const [lx0,ly0]=f0.P(pl.cx,pl.cy);
  if(nearest){ const dx=nearest.x-pl.cx, dy=nearest.y-pl.cy, L=Math.hypot(dx,dy)||1, ux=dx/L, uy=-dy/L, lotHalf=Math.max(pl.b[2]-pl.b[0],pl.b[3]-pl.b[1])/2*f0.s, a0=[lx0+ux*(lotHalf+8),ly0+uy*(lotHalf+8)], a1=[lx0+ux*Math.min(PW,PHt)*0.43,ly0+uy*Math.min(PW,PHt)*0.43];
    arrow=`<defs><marker id="${NS}ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" fill="${K.ink}"/></marker></defs><line x1="${a0[0].toFixed(1)}" y1="${a0[1].toFixed(1)}" x2="${a1[0].toFixed(1)}" y2="${a1[1].toFixed(1)}" stroke="${K.ink}" stroke-width="1.5" stroke-dasharray="5 3" marker-end="url(#${NS}ah)"/>`;
    const right=ux>=0; arrow+=`<text x="${(a1[0]+(right?-4:4)).toFixed(1)}" y="${(a1[1]+(uy>0?16:-8)).toFixed(1)}" font-size="12" fill="${K.ink}" text-anchor="${right?'end':'start'}">to ${esc(nearest.n)}, ${fm(nearest.dist)} m (could)</text>`; }
  inner+=arrow;
  /* scale: rough, from the frame */
  inner+=C.scaleBar(14,PHt-30,Math.max(10,Math.round(pl.R/4/10)*10),f0.s);
  let svg=`<svg viewBox="0 0 ${W} ${H0}" width="${W}" height="${H0}" role="img" aria-label="The lot's plan with the building and plant, and the receivers within 1 km as dots">`;
  svg+=nestSvg(ox,oy,PW,PHt,inner);
  /* leaders (three) at the plan's right edge */
  const lx=ox+PW+14; const anchors=[];
  if(bld){ const p=rightmost(f0.P,bld); anchors.push([p[0]+ox,p[1]+oy,'Data hall building',`${[...new Set([].concat(M.nF).map(f1))].join('–')} storeys, ${f1([].concat(M.H)[0])} m · where the heat is made`,false]); }
  const gb=pl.boxes.filter(b=>b.ring); if(gb.length){ const p=rightmost(f0.P,gb[0].ring); anchors.push([p[0]+ox,p[1]+oy,`${gb.length} standby generators`,'in the yard · not part of the heat',false]); }
  const rrp=rightmost(f0.P,rr); anchors.push([rrp[0]+ox,rrp[1]+oy,'Heat pump and heat loop','where they go is not modelled (?)',true]);
  anchors.sort((a,b)=>a[1]-b[1]); for(let i=1;i<anchors.length;i++) if(anchors[i][1]-anchors[i-1][1]<36) anchors[i][1]=anchors[i-1][1]+36; /* labels move along; anchors stay on their objects (rule 9): shift the anchor along its object */
  anchors.forEach(a=>{ svg+=leader(a[0],a[1],lx,a[2],a[3],a[4]); });
  /* receivers within 1 km (the board's small map) */
  const mm=220, fr=C.frame([pl.cx-1100,pl.cy-1100,pl.cx+1100,pl.cy+1100],mm,mm,0); const near1=all.filter(p=>p.dist<=1000);
  let mini=`<rect width="${mm}" height="${mm}" fill="${K.ground}"/><circle cx="${mm/2}" cy="${mm/2}" r="${(1000*fr.s).toFixed(1)}" fill="none" stroke="${K.faint}" stroke-width="1" stroke-dasharray="4 3"/>`;
  near1.forEach(p=>{ const q=fr.P(p.x,p.y); mini+=`<circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="2.2" fill="${K.ink}"/>`; });
  mini+=`<rect x="${mm/2-4}" y="${mm/2-4}" width="8" height="8" fill="${K.dc}"/>`;
  svg+=nestSvg(0,oy,mm,mm,mini)+TXT(0,oy+mm+16,`Receivers within 1 km: ${near1.length} (tool list)`,{fs:11.5,c:K.mute});
  /* heat as range bars, one scale */
  const air=!ink; const bt=air?'If liquid-cooled (comparison, not the pick)':'Liquid cooling, as picked'; const by0=oy+mm+(air?72:46);
  svg+=TXT(0,oy+mm+38,bt,{fs:12,c:K.ink})+(air?TXT(0,oy+mm+53,'with air picked, the tool has no figure',{fs:11.5,c:K.red}):'');
  const bars=rbars([{l:'Heat captured from the servers',lo:cap[0],hi:cap[1],col:K.neut,col2:K.hair},{l:'Heat offered, after the heat pump',lo:r.avail[0],hi:r.avail[1]},{l:'Heat pump electricity',lo:r.hp[0],hi:r.hp[1],col:K.ink2,col2:K.faint}],{W:230,x0:0,y0:by0,pitch:44,pad:70,max:r.avail[1],tf:v=>fm(v/1000)});
  svg+=bars.s+TXT(0,by0+bars.h+16,'GWh a year, one scale',{fs:11,c:K.mute});
  svg+='</svg>';
  const key=`<div class="f1c-key"><span><i style="background:${K.fillHall}"></i>building (dashed: footprint)</span><span><i style="background:${K.neut}"></i>yard plant</span><span><i style="background:${K.dc}"></i>the lot, on the small map</span><span class="f1c-note">Plan view; the tool’s 3-D scene is not drawn into the card.</span></div>`;
  const costOk=!!B, mid=B&&B.mid;
  const liqR=rg(r.avail[0],r.avail[1],v=>fm(Math.round(v/100)*100));
  const hero=air?[{v:'none',l:'heat captured in liquid (air cooling is picked)'},{v:C.q('the tool has no figure for reusing heat from air cooling'),l:'heat offered with air cooling'},{v:liqR,u:'MWh/yr',l:'if liquid-cooled: heat offered (comparison)'},{v:costOk?'$'+fm(mid.lcoh):C.q('no route could be measured'),u:costOk?'/MWh':'',l:costOk?`if liquid-cooled: cost of heat (worth $${fm(worth)})`:'if liquid-cooled: cost of heat',red:costOk&&mid.lcoh>worth}]:[{v:liqR,u:'MWh/yr',l:'heat offered, after the heat pump'},{v:rg(supply[0],supply[1]),u:'°C',l:'supply temperature to the receiver'},{v:rg(share[0]*100,share[1]*100,fm),u:'%',l:'of the year the heat pump runs'},{v:costOk?'$'+fm(mid.lcoh):C.q('no route could be measured'),u:costOk?'/MWh':'',l:costOk?`cost of heat, middle case (worth $${fm(worth)})`:'cost of the heat',red:costOk&&mid.lcoh>worth}];
  const P0=air?'If liquid: ':'';
  const rows=[...(air?[['Heat captured in liquid, as picked','none: air cooling'],['Heat offered with air cooling',C.q('the tool has no figure for reusing heat from air cooling')]]:[]),[P0+'Heat captured from the servers',rg(cap[0],cap[1])+' MWh/yr'],[P0+'Heat pump electricity',rg(r.hp[0],r.hp[1])+' MWh/yr'],['Heat pump COP',`${f1(R.cop[0])}–${f1(R.cop[1])} (the tool’s range)`],[P0+'Equal to homes’ heating',`${rg(r.homes[0],r.homes[1])} homes`],[P0+'Heat pump size',`${rg(hpMW[0],hpMW[1],f1)} MW`],
    [P0+'Carbon of the heat pump power',`${rg(r.co2[0],r.co2[1])} t CO₂e/yr at ${R.grid[city]} g/kWh (NIR, ${R.gridYear})${city==='van'&&R.gridBC?`; ${rg(r.co2[0]*R.gridBC.v/R.grid[city],r.co2[1]*R.gridBC.v/R.grid[city])} at the BC Government’s ${R.gridBC.v} g/kWh (imports included)`:''}`]];
  const costRows=costOk?[['Best set-up the tool finds',`liquid cooling, one pipe to ${B.G.length} building${B.G.length>1?'s':''}: ${B.G.map(p=>esc(p.n)).join(', ')}`],['Cost per MWh of heat',`$${fm(mid.lcoh)} ($${fm(B.lo.lcoh)}–${fm(B.hi.lcoh)})`],['What the heat is worth',`$${fm(worth)}/MWh (the gas it replaces)`],['Pipe',`${fm(B.len)} m`],['Capital (pipe and heat pump)',mid.cap!=null?`$${f1(mid.cap/1e6)} million`:C.q()]]:[['Cost per MWh of heat',C.q('no receiver route could be measured')]];
  const more=[[(air?'If liquid-cooled: what this costs, as the tool states it':'What this costs, as the tool states it'),`<dl class="f1c-rows">${costRows.map(q=>`<dt>${esc(q[0])}</dt><dd>${typeof q[1]==='object'?'':q[1]}</dd>`).join('')}</dl><p style="margin-top:8px">Counted: the pipe, the connection, a heat pump and its upkeep, at today’s energy prices over the parts’ life (${E.life.pipe} and ${E.life.hp} years, ${(E.rate*100).toFixed(1)}% a year). Not counted: inflation, demand charges, and who pays.</p>`],
    ['How the heat figure is worked out',`<p>Heat captured = ${fm(itR[0])}–${fm(itR[1])} MWh of IT energy × ${R.capture[0]}–${R.capture[1]} (liquid capture). Heat out = captured × COP ÷ (COP − 1), COP ${R.cop[1]} for the low end and ${R.cop[0]} for the high end. IT energy is the size × 8,760 h × ${R.lfR[0]}–${R.lfR[1]} load factor (register load_factor; J.B. 11 Nov 2026): low end Uptime Global Data Center Survey 2024, p. 9, one in four sites typically under 40 % of available UPS capacity (self-reported, no average given); high end Fan et al. 2007, one operator’s clusters averaged about 60 % of their machines’ combined maximum.</p>`]];
  return {draw:`<div class="${NS}wrap">${svg}${key}</div>`,lead:air?`Air cooling is picked. The tool captures no heat in liquid and has no figure for reusing heat from air cooling. For comparison, a ${f1(mw)} MW hall with liquid cooling and a heat pump could offer ${liqR} MWh a year.${costOk&&mid.lcoh>worth?' At today’s prices that heat costs more to deliver than it is worth.':''}`:`A ${f1(mw)} MW hall with liquid cooling and a heat pump could offer ${liqR} MWh a year. ${costOk&&mid.lcoh>worth?'At today’s prices that heat costs more to deliver than it is worth.':''}`.trim(),
    hero,rows,more,
    src:[`Heat offered, homes, carbon, plant: tool/engine.js calc() with recover on (the Heat tab’s "Heat this size could offer"); capture and COP ranges from R.capture and R.cop (${reg('cap').slice(0,170)}…).`,`Supply temperature: the sink supply temperatures the tool tests, cards.js HS.sinks (City of Vancouver NE connectivity standards 2013 s. 4.3: 60 °C panel radiators, 70 °C baseboards); the servers’ liquid loop leaves at 37.5 °C (NREL ESIF, Van Geet 2019). Copied from cards.js; the tool does not export them.`,`Share of the year: ECON.hpFLH ${flh[0]}–${flh[1]} full-load hours of 8,760 (tool/cards.js).`,`Cost: cards.js heatEcon and bestHeat (pipe, heat pump, upkeep, cost of capital ${(E.rate*100).toFixed(1)}%); worth = gas price ÷ boiler efficiency (ECON.gas, ECON.boiler). Receivers: ${city==='van'?'BC Assessment-based building list and City data':'City of Edmonton data'} as the tool holds them.`,`Plan: ${C.CONTEXT_SRC(city)}`],
    missing:['where the heat pump and heat loop would sit on the lot (not modelled)','heat reusable from air cooling (no figure in the tool)',...(costOk?[]:['cost per MWh (no route measured)'])]}; }});

/* ======================= 8 Who could take it ======================= */
const STW={within:'within',depends:'depends',beyond:'beyond',unknown:'unknown'};
const PL1={housing:'Non-market housing',school:'School',campus:'Campus',care:'Care home',hospital:'Hospital',rec:'Recreation centre',hall:'Community hall',pool:'Pool',arena:'Arena',apartment:'Apartment',office:'Office',hotel:'Hotel',commercial:'Commercial'};
/* the connection card of cards.js (BD.openConnection), shown inside this card: the tool's drawer is behind the card shell, so its html is taken as the tool writes it and nothing in the old tool is changed */
async function openConn(id){ const H=HD; if(!H) return; const keepH=BD._heat, drw=BD.drawer, eng=BD.eng, keepOpen=drw.open, keep3=eng.show3d; let html=null;
  try{ BD._heat={f:H.f,all:H.all,nets:H.nets}; drw.open=h=>{ html=h; }; eng.show3d=()=>{}; await BD.openConnection('heat',id); }
  finally{ drw.open=keepOpen; eng.show3d=keep3; BD._heat=keepH; }
  if(html==null) return; const W=document.getElementById('f1v'); if(!W) return; let pop=W.querySelector('.'+NS+'pop'); if(!pop){ pop=document.createElement('div'); pop.className=NS+'pop'; pop.setAttribute('role','dialog'); pop.setAttribute('aria-label','Connection card'); W.appendChild(pop); }
  pop.innerHTML=`<button type="button" class="x" data-pop-x>Close</button>`+html; pop.scrollTop=0; pop.querySelector('[data-pop-x]').onclick=()=>pop.remove(); }
C.engB={open:openConn};
C.add(T,'Who could take it',{async build(x){
  const M=await modelNow(x), H=await heatData(x), {f,all,nets,cnt,e}=H, city=x.city, E=BD.ECON;
  const air=(H.A.inside||'air')==='air', LQ=air?' (liquid)':'', known=all.filter(p=>p.econ.demand), unk=all.filter(p=>!p.econ.demand);
  const rows12=known.slice(0,9), W=1000, PW=380, PHt=420;
  const R=1500, asp=1, ctx0=planInner(x,M,{W:PW,H:PHt,R}), fr=ctx0.f; let inner=ctx0.s;
  /* district energy areas the tool holds */
  for(const n of nets){ if(n.r) inner+=`<path d="${C.pathOf([n.r],fr.P)}" fill="${K.fillSup}" fill-opacity="0.7" stroke="${K.dc}" stroke-width="1" stroke-dasharray="5 3"/>`; }
  inner+=`<circle cx="${fr.P(ctx0.cx,ctx0.cy)[0].toFixed(1)}" cy="${fr.P(ctx0.cx,ctx0.cy)[1].toFixed(1)}" r="${(1000*fr.s).toFixed(1)}" fill="none" stroke="${K.faint}" stroke-width="1" stroke-dasharray="4 3"/>`;
  const st={within:[K.dc,K.dc,3.6],depends:[K.dcSup,K.dc,3.6],beyond:['#fff',K.faint,2.6],unknown:['#fff',K.ink,2.6]};
  const inMap=all.filter(p=>p.dist<=R*0.97); inMap.forEach(p=>{ const q=fr.P(p.x,p.y), s=st[p.econ.status]||st.unknown; inner+=`<circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="${s[2]}" fill="${s[0]}" stroke="${s[1]}" stroke-width="1"/>`; });
  rows12.forEach((p,i)=>{ const q=fr.P(p.x,p.y); if(q[0]<8||q[0]>PW-8||q[1]<8||q[1]>PHt-8) return; inner+=`<circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="8" fill="#fff" stroke="${K.ink}" stroke-width="1"/><text x="${q[0].toFixed(1)}" y="${(q[1]+3.6).toFixed(1)}" font-size="10" text-anchor="middle" fill="${K.ink}">${i+1}</text>`; });
  const lp=fr.P(ctx0.cx,ctx0.cy); inner+=`<rect x="${(lp[0]-5).toFixed(1)}" y="${(lp[1]-5).toFixed(1)}" width="10" height="10" fill="${K.ink}"/>`+C.scaleBar(14,PHt-30,300,fr.s,'300 m');
  const map=`<svg viewBox="0 0 ${PW} ${PHt}" width="${PW}" height="${PHt}" role="img" aria-label="Buildings that could take the heat, within 1.5 km of the lot, coloured by the tool's status words">${inner}</svg>`;
  const wordTxt=s=>({within:'costs less than the heat is worth',depends:'depends on the costs',beyond:'costs more than the heat is worth',unknown:'no demand figure yet'}[s]);
  const tab=`<table class="${NS}tab"><thead><tr><th></th><th>Building</th><th class="r">Distance</th><th class="r">Heat taken</th><th class="r">$/MWh${LQ}</th><th>Status${LQ}</th></tr></thead><tbody>${rows12.map((p,i)=>`<tr><td class="n">${i+1}</td><td><button type="button" onclick="BD.f1cards.engB.open(${p.id})" title="${esc(PL1[p.t]||p.t)}: open its connection card">${esc(C.titleCase(p.n))}</button></td><td class="r">${fm(p.dist)} m</td><td class="r">${fm(p.econ.take?p.econ.take[1]:p.econ.demand)} MWh/yr</td><td class="r">${p.econ.lcohMid?'$'+fm(p.econ.lcohMid):'?'}</td><td><span class="${NS}st${p.econ.status==='beyond'?' bey':''}" title="${esc(wordTxt(p.econ.status))}">${STW[p.econ.status]}</span></td></tr>`).join('')}</tbody></table>`;
  const nl=nets.length?nets.map(n=>`<p style="margin:6px 0 0;font-size:12.5px;color:${K.ink2}"><b style="font-weight:500;color:${K.ink}">${esc(n.n.replace(/ \(.*/,''))}</b> · ${n.inside?'the lot is inside its service area':fm(n.edge)+' m from the lot'}${n.kind?' · '+esc(n.kind):''}</p>`).join(''):`<p class="f1c-note" style="margin-top:6px">No district energy network within the tool’s search of this lot.</p>`;
  const right=`<div style="flex:1 1 0;min-width:0"><div style="font-size:13px;color:${K.ink};margin-bottom:6px">The ${rows12.length} nearest buildings with a known heat demand <span class="f1c-note">(click one for its connection card)</span></div>${air?`<div class="f1c-note" style="margin-bottom:6px">Air cooling is picked: the tool prices no connection for it. Cost and status below are for a liquid-cooled hall (comparison, not the pick).</div>`:''}${tab}<div style="margin-top:14px;font-size:13px;color:${K.ink}">District energy networks nearby</div>${nl}</div>`;
  const key=`<div class="f1c-key"><span><svg width="12" height="12" style="vertical-align:-2px;margin-right:6px"><circle cx="6" cy="6" r="4.5" fill="${K.dc}" stroke="${K.dc}"/></svg>within</span><span><svg width="12" height="12" style="vertical-align:-2px;margin-right:6px"><circle cx="6" cy="6" r="4.5" fill="${K.dcSup}" stroke="${K.dc}"/></svg>depends</span><span><svg width="12" height="12" style="vertical-align:-2px;margin-right:6px"><circle cx="6" cy="6" r="4" fill="#fff" stroke="${K.faint}"/></svg>beyond</span><span><svg width="12" height="12" style="vertical-align:-2px;margin-right:6px"><circle cx="6" cy="6" r="4" fill="#fff" stroke="${K.ink}"/></svg>unknown</span><span><i style="background:${K.fillSup};border-color:${K.dc}"></i>district energy area</span><span><i style="background:${K.ink}"></i>the lot</span><span class="f1c-note">Dashed circle: 1 km. Map to 1.5 km; the tool searches to ${fm(e.R.recvRadius)} m.</span></div>`;
  const draw=`<div class="${NS}wrap"><div class="${NS}two">${map}${right}</div>${key}</div>`;
  const best=H.B;
  return {draw,lead:`${all.length} buildings lie within ${fm(e.R.recvRadius)} m. ${air?'With air cooling the tool prices no connection (?). If liquid-cooled: ':''}${cnt.within?`${cnt.within} cost less to connect than their heat is worth.`:'None costs less to connect than its heat is worth at today’s prices.'} ${cnt.depends?`${cnt.depends} depend on the costs.`:''}`.trim(),
    hero:[{v:String(all.length),l:`buildings within ${fm(e.R.recvRadius/1000)} km`},{v:air?C.q('the tool has no figure for reusing heat from air cooling'):String(cnt.within+cnt.depends),l:air?'connections priced with air cooling':'within the heat’s worth, or depend',red:false},{v:String(nets.length),l:'district energy networks nearby'},{v:best?'$'+fm(best.mid.lcoh):C.q(),u:best?'/MWh':'',l:air?'if liquid-cooled: cheapest group, middle case':'cheapest group, middle case'}],
    rows:[...(air?[['Priced with air cooling',C.q('the tool prices no connection for air cooling')]]:[]),[air?'If liquid: within':'within',String(cnt.within)],[air?'If liquid: depends':'depends',String(cnt.depends)],[air?'If liquid: beyond':'beyond',String(cnt.beyond)],['unknown (no demand figure)',String(cnt.unknown)],[air?'If liquid: heat the lot could offer':'Heat the lot could offer',`${rg(H.r.avail[0],H.r.avail[1])} MWh/yr`],['What the heat is worth',`$${fm(E.heatVal(city))}/MWh`],
      ...(()=>{ const c=known.filter(p=>p.econ.bePM&&isFinite(p.econ.lcohMid)).sort((a,b)=>a.econ.lcohMid-b.econ.lcohMid)[0]; /* scope (c): the cheapest receiver */
        return c?[[(air?'If liquid: ':'')+'Break-even pipe cost',`${BD.bePMtxt(c.econ)}, for the cheapest receiver (${esc(C.titleCase(c.n))}, ${fm(c.econ.route)} m by street); the tool assumes $${fm(E.pipe[0])}–${fm(E.pipe[1])} per metre (European figures × CAD/€; no Canadian per-metre cost found ?)`]]:[]; })()],
    more:[['What the words mean',`<p><b style="font-weight:500">within</b>: even the high cost case is under what the heat is worth. <b style="font-weight:500">depends</b>: the low case is, the high case is not. <b style="font-weight:500">beyond</b>: costs more than the heat is worth. <b style="font-weight:500">unknown</b>: the tool has no heat-demand figure for the building yet${unk.length?` (${unk.length} here)`:''}.</p>`],['Counted and not counted',`<p>Counted: the pipe along the street route, a heat pump at the receiver and its upkeep, over the parts’ life. Not counted: inflation, demand charges, who pays. A building can take only the heat that is offered.</p>`]],
    src:[`Receivers and demand: ${city==='van'?'City of Vancouver and BC Assessment-based building list':'City of Edmonton building list'} through tool/engine.js loadRecv; status words from cards.js heatEcon (status), cost per MWh = lcohMid.`,'Connection cards: cards.js openConnection, read-only; the "who pays" switch is hidden here because it would change the tool’s answers.','District energy networks: tool data through engine.js netsAt (service-area outlines; Edmonton Downtown is approximate).',`Street routes: BD.routeTree on the City street centrelines (tool/streets_${city}.json).`,C.CONTEXT_SRC(city)],
    missing:unk.length?[`heat demand for ${unk.length} buildings (no figure in the tool yet)`]:[]}; }});

/* ======================= 9 Electricity ======================= */
let SUBS=null; async function subs(){ if(SUBS) return SUBS; try{ SUBS=await BD.getJSON('substations.json'); }catch(e){ SUBS={cities:{},named:{}}; } return SUBS; }
C.add(T,'Electricity',{async build(x){
  const M=await modelNow(x), e=BD.eng, R=e.R, f=e.siteFacts(), A=BD.S.answers, city=x.city, mw=A.mw||M.mwSized||1;
  const fac=[mw*R.pue[0],mw*R.pue[1]], avg=[fac[0]*R.lfR[0],fac[1]*R.lfR[1]], MWh=[fac[0]*8760*R.lfR[0],fac[1]*8760*R.lfR[1]], co2=MWh.map(v=>v*R.grid[city]/1000);
  const cost=city==='van'?[MWh[0]*1000*0.0679+fac[0]*1000*13.83*12,MWh[1]*1000*0.0679+fac[1]*1000*13.83*12]:null;
  const Pg=M.plant&&M.plant.s, gInst=Pg&&Pg.g?Pg.gN*Pg.g.mw:null, ups=[mw*10/60,mw*15/60];   /* 11 Nov 2026 (J.B.): the energy the UPS batteries hold, 10–15 min at full load (FM 5-32), as the Backup power card */
  const mva=fac[1]/0.90; let svc;
  if(city==='van') svc=mva>13?'above 13 MVA: a two-feeder supply may be required in 25 kV areas':mva>6.5?'above 6.5 MVA: a two-feeder supply may be required in 12.5 kV areas':'within a single primary service';
  else svc=mva*1000>2500?'above 2,500 kVA: primary service, with transformer clearances and a 4.6 m access road':'within a secondary or small primary service';
  const SB=await subs(), nm=((SB.named||{})[city]||[]).map(p=>({n:p.n,d:Math.hypot(p.x-f.c[0],p.y-f.c[1]),status:p.status,addr:p.addr})).sort((a,b)=>a.d-b.d);
  const named=(SB.named||{})[city]||[]; const old=((SB.cities||{})[city]||[]).filter(p=>!named.some(q=>Math.hypot(p[0]-q.x,p[1]-q.y)<300)).map(p=>({d:Math.hypot(p[0]-f.c[0],p[1]-f.c[1]),y:p[3]})).sort((a,b)=>a.d-b.d);
  const live=nm.filter(p=>!/planned|project/i.test(p.status||'')), nearOld=old[0];
  const W=1000, H0=470;
  let svg=`<svg viewBox="0 0 ${W} ${H0}" width="${W}" height="${H0}" role="img" aria-label="Power at the meter, the PUE range, and distance to the nearest substations">`;
  svg+=TXT(0,16,'What the hall draws',{fs:15,c:K.ink});
  const b1=rbars([{l:'Servers (IT load)',lo:mw,hi:mw,col:K.neut,val:`${f1(mw)} MW`},{l:'At the meter, full load',lo:fac[0],hi:fac[1],val:`${f1(fac[0])}–${f1(fac[1])} MW`},{l:'At the meter, on average',lo:avg[0],hi:avg[1],val:`${f1(avg[0])}–${f1(avg[1])} MW`}],{W:470,x0:0,y0:34,pitch:46,pad:110,max:fac[1]*1.0,tf:f1});
  svg+=b1.s+TXT(0,34+b1.h+16,'MW, one scale',{fs:11,c:K.mute});
  /* PUE: one range for every cooling type */
  const py=34+b1.h+74, pw=360, X=v=>(v-1)/1*pw;
  svg+=TXT(0,py-14,'PUE: one range for every cooling type (industry surveys, not this design)',{fs:15,c:K.ink})+`<line x1="0" y1="${py+12}" x2="${pw}" y2="${py+12}" stroke="${K.hair}" stroke-width="4"/><rect x="${X(R.pue[0]).toFixed(1)}" y="${py+7}" width="${(X(R.pue[1])-X(R.pue[0])).toFixed(1)}" height="10" fill="${K.dc}"/>`;
  [1,1.25,1.5,1.75,2].forEach(v=>{ svg+=TXT(X(v).toFixed(1),py+36,String(v),{fs:11,c:K.mute,a:v===1?'start':v===2?'end':'middle'}); });
  svg+=TXT(X(R.pue[0]),py-1,`${R.pue[0]}–${R.pue[1]}`,{fs:12,c:K.ink});
  svg+=TXT(0,py+58,'Per-type figures (air, liquid to the chip, immersion):',{fs:12,c:K.ink2})+TXT(326,py+58,'?',{fs:13,c:K.red,w:500})+TXT(342,py+58,'not in the tool yet',{fs:11.5,c:K.red});
  /* substations: distance bars */
  const sx=560, sw=430, rowsS=nm.map(p=>({l:`${p.n}${p.status&&/planned/i.test(p.status)?', planned':p.status&&/project/i.test(p.status)?', utility project':''}`,lo:p.d/1000,hi:p.d/1000,val:`${f1(p.d/1000)} km`,col:/planned|project/i.test(p.status||'')?K.dcSup:K.dc}));
  if(nearOld) rowsS.push({l:`Nearest other mapped transformer station (map year ${nearOld.y})`,lo:nearOld.d/1000,hi:nearOld.d/1000,val:`${f1(nearOld.d/1000)} km`,col:K.neut});
  svg+=TXT(sx,16,'Substations nearby, straight-line distance',{fs:15,c:K.ink});
  if(rowsS.length){ const b3=rbars(rowsS,{W:sw,x0:sx,y0:34,pitch:50,pad:110,tf:f1,max:Math.max(2,...rowsS.map(r=>r.lo))}); svg+=b3.s+TXT(sx,34+b3.h+16,'km from the lot, one scale',{fs:11,c:K.mute});
    const hy=34+b3.h+44; svg+=TXT(sx,hy,'Spare capacity at each substation',{fs:12.5,c:K.ink2})+TXT(sx+198,hy,'?',{fs:13,c:K.red,w:500})+TXT(sx+214,hy,'no utility publishes it',{fs:11.5,c:K.red}); }
  else svg+=TXT(sx,40,'No substation on file for this city.',{fs:12.5,c:K.red});
  svg+='</svg>';
  const gridTxt=f.cpcn?'downtown supply area: no new 12 kV feeder positions from fiscal 2027 until the West End substation (expected July 2032; not yet decided)':'needs the utility’s answer to a load application';
  const key=`<div class="f1c-key"><span><i style="background:${K.dc}"></i>range, low end to high end (dark to light)</span><span><i style="background:${K.dc}"></i>substation in service</span><span><i style="background:${K.dcSup}"></i>planned or project</span><span><i style="background:${K.neut}"></i>other mapped station</span></div>`;
  return {draw:`<div class="${NS}wrap">${svg}${key}</div>`,lead:`A ${f1(mw)} MW hall draws ${f1(fac[0])}–${f1(fac[1])} MW at the meter. The grid connection is the utility’s answer, and no utility publishes how much room each substation has.`,
    hero:[{v:`${f1(fac[0])}–${f1(fac[1])}`,u:'MW',l:'at the meter, full load'},{v:rg(MWh[0]/1000,MWh[1]/1000,fm),u:'GWh/yr',l:'electricity a year'},{v:nm[0]?f1(nm[0].d/1000):C.q(),u:nm[0]?'km':'',l:nm[0]?`to ${nm[0].n}`:'to the nearest substation'},{v:`${R.pue[0]}–${R.pue[1]}`,l:'PUE, every cooling type (industry surveys, not this design)'}],
    rows:[['Power on average',`${f1(avg[0])}–${f1(avg[1])} MW (${Math.round(R.lfR[0]*100)}–${Math.round(R.lfR[1]*100)} % of full load: low end Uptime 2024 survey p. 9, a quarter of sites under 40 % of UPS capacity, operator claims; high end Fan et al. 2007, one operator’s clusters, 59.5 %)`],['Electrical service',svc],['Cost a year',cost?`$${f1(cost[0]/1e6)}–${f1(cost[1]/1e6)} million (BC Hydro large general service)`:`energy only: Alberta pool $43.68/MWh in 2025, about $49.67 with EPCOR charges; wires not counted`],['Carbon of that power',`${rg(co2[0],co2[1])} t CO₂e/yr at ${R.grid[city]} g/kWh (NIR, consumption, ${R.gridYear})`],
      ...(city==='van'&&R.gridBC?[['Carbon, BC Government factor',`${rg(MWh[0]*R.gridBC.v/1000,MWh[1]*R.gridBC.v/1000)} t CO₂e/yr at ${R.gridBC.v} g/kWh (BC’s ${R.gridBC.year} factor, imports included; ${R.gridBC.lo}–${R.gridBC.hi} g/kWh over ${R.gridBC.years}, same method; a second figure, not added)`]]:[]),['Grid connection',gridTxt],['Generators installed',gInst?`${Pg.gN} sets × ${Pg.g.mw} MW`:'none'],['UPS batteries held',`${f1(ups[0])}–${f1(ups[1])} MWh (10–15 min at full load, FM 5-32; our arithmetic)`],['Substation spare capacity',C.q('no utility publishes it')],['PUE by cooling type',C.q('one range is used for all types')]],
    more:[['Power factor and service size',`<p>MVA = MW ÷ power factor 0.90–1.0 (our band; server supplies ≥ 0.95, ENERGY STAR v4.0). At the high end ${f1(mva)} MVA.</p>`],['Substations, as the tool holds them',`<p>${nm.map(p=>`${esc(p.n)} (${esc(p.addr||'')}): ${esc(p.status)}`).join('; ')||'none named'}. Other points are NRCan CanVec 50K transformer stations as mapped in 2019 (map years up to 1986); positions only, no capacity.</p>`]],
    src:['Power, electricity a year, carbon, cost, UPS: tool/engine.js energyView ("What it draws", "The batteries it already has"): servers × PUE (R.pue) × load factor 0.4–0.6 (R.lfR; register load_factor: low end Uptime Global Data Center Survey 2024 p. 9, self-reported; high end Fan et al. 2007, one operator), '+reg('pue').replace(/^.*?register: /,'register: ').slice(0,120)+'.','Cost: BC Hydro large general service, 6.79 ¢/kWh + $13.83/kW a month, demand taken at full load (energyView). Carbon: R.grid.',`Electrical service thresholds and grid text: engine.js fitsView ("Electrical service", "Grid"); ${f.cpcn?'BC Hydro downtown supply area (CPCN) note':'no downtown-supply flag for this lot'}.`,'Substations: tool/substations.json: named stations from utility and government sources (audit I_substations.md), others NRCan CanVec 50K Res_MGT 2019 (Open Government Licence – Canada); straight-line distance from the lot (our arithmetic).'],
    missing:['spare capacity at each substation (no utility publishes it)','PUE for each cooling type (one range is used)']}; }});

/* ======================= 10 Water ======================= */
C.add(T,'Water',{async build(x){
  const M=await modelNow(x), e=BD.eng, R=e.R, f=e.siteFacts(), A=BD.S.answers, city=x.city, mw=A.mw||M.mwSized||1, picked=A.outside==='towers'||A.outside==='hybrid'?A.outside:'dry';
  const fac=[mw*R.pue[0],mw*R.pue[1]], MWh=[fac[0]*8760*R.lfR[0],fac[1]*8760*R.lfR[1]], DW=BD.data.water, WET=DW.wet, CY=DW.cycles;
  const evapFor=wet=>MWh.map(v=>v*1000*DW.evapLkWh*wet/1000);
  const ev={dry:[0,0],towers:evapFor(1),hybrid:evapFor(WET[city][1])};
  const mkAt=ep=>[ep[1]*(1+1/(CY[1]-1)),ep[1]*(1+1/(CY[0]-1))], bdAt=ep=>[ep[1]/(CY[1]-1),ep[1]/(CY[0]-1)];
  const roof=e.roofArea(f), mm=DW.rainMm[city==='van'?'van':'edm'], rain=roof*mm/1000*0.8;   /* 11 Nov 2026 (J.B., F11 A1): water behind the electricity not shown */
  const nm={dry:BD.dryName(),towers:'Cooling towers',hybrid:'Hybrid coolers'}; const lab={dry:nm.dry.charAt(0).toUpperCase()+nm.dry.slice(1),towers:nm.towers,hybrid:nm.hybrid};
  const mk=mkAt(ev[picked==='dry'?'towers':picked]);
  const W=1000, H0=430; let svg=`<svg viewBox="0 0 ${W} ${H0}" width="${W}" height="${H0}" role="img" aria-label="Water evaporated for cooling by type of outside cooling, and rain on the roof">`;
  svg+=TXT(0,16,'Evaporated for cooling, by how the heat leaves the building',{fs:15,c:K.ink});
  const evMax=Math.max(ev.towers[1],1), rowsE=['dry','towers','hybrid'].map(k=>({l:lab[k]+(k===picked?' (the pick)':''),lo:ev[k][1],hi:ev[k][1],val:k==='dry'?'none':`up to ${fm(ev[k][1])} m³/yr`,col:k===picked?K.ink:K.dcSup}));
  const b1=rbars(rowsE,{W:560,x0:0,y0:34,pitch:50,pad:170,max:evMax,tf:v=>fm(v/1000)+'k'}); svg+=b1.s+TXT(0,34+b1.h+16,'m³ a year, at most, one scale',{fs:11,c:K.mute});
  const y2=34+b1.h+52; svg+=TXT(0,y2-8,'If towers: make-up water against rain on the roof',{fs:15,c:K.ink});
  const mkT=mkAt(ev.towers); const b2=rbars([{l:'Make-up water, cooling towers',lo:mkT[0],hi:mkT[1],col:K.ink2,col2:K.faint},{l:'Rain on the roof (0.8 runoff)',lo:rain,hi:rain,val:`${fm(rain)} m³/yr`,col:K.dc}],{W:560,x0:0,y0:y2+10,pitch:50,pad:170,max:Math.max(mkT[1],rain),tf:v=>fm(v/1000)+'k'}); svg+=b2.s+TXT(0,y2+10+b2.h+16,'m³ a year, one scale',{fs:11,c:K.mute});
  /* right column: the lot's roof and what the tool does not hold */
  const sx=640; svg+=TXT(sx,16,'Roof and rain',{fs:15,c:K.ink});
  const pl=planInner(x,M,{W:340,H:220}); svg+=nestSvg(sx,30,340,220,pl.s+`<path d="${C.pathOf([x.sel.ring],pl.f.P)}" fill="${K.dc}" fill-opacity="0.18" stroke="${K.ink}" stroke-width="1.8"/>`);
  svg+=TXT(sx,270,`Roof ${fm(roof)} m² · ${mm} mm of rain a year`,{fs:12,c:K.ink2});
  svg+=TXT(sx,306,'Fire-fighting water volume',{fs:12.5,c:K.ink2})+TXT(sx+176,306,'?',{fs:13,c:K.red,w:500})+TXT(sx+192,306,'not sized in the tool',{fs:11.5,c:K.red});
  svg+='</svg>';
  const key=`<div class="f1c-key"><span><i style="background:${K.ink}"></i>the picked cooling</span><span><i style="background:${K.dcSup}"></i>the other types</span><span><i style="background:${K.dc}"></i>rain</span><span class="f1c-note">Lot plan: roof and context; the roof is the footprint the tool uses for rain.</span></div>`;
  const evP=ev[picked];
  return {draw:`<div class="${NS}wrap">${svg}${key}</div>`,
    lead:picked==='dry'?`With ${BD.dryName()} the heat leaves to the air: no water is evaporated for cooling. The pick drives the figures; towers or hybrid coolers would use water.`:`${lab[picked]} evaporate up to ${fm(evP[1])} m³ a year at this size.`,
    hero:[{v:picked==='dry'?'none':rg(evP[0],evP[1]),u:picked==='dry'?'':'m³/yr',l:'evaporated for cooling'},{v:fm(rain),u:'m³/yr',l:'rain on the roof'},{v:picked==='dry'?fm(mk[1]):rg(mk[0],mk[1]),u:'m³/yr',l:picked==='dry'?'make-up water if towers':'make-up water'},{v:C.q(),l:'fire-fighting water'}],
    rows:[['The pick',lab[picked]],['Evaporated, at most',picked==='dry'?'none':`${fm(evP[1])} m³/yr`],picked==='dry'?['Make-up water if towers',`${rg(mkT[0],mkT[1])} m³/yr at ${CY[0]}–${CY[1]} cycles`]:['Make-up water',`${rg(mk[0],mk[1])} m³/yr at ${CY[0]}–${CY[1]} cycles`],['Blowdown to the sewer',picked==='dry'?'none':`${rg(bdAt(evP)[0],bdAt(evP)[1])} m³/yr`],['Rain on the roof',`${fm(rain)} m³/yr from ${fm(roof)} m² at ${mm} mm`],...(city==='van'&&picked!=='dry'?[['Water bill',`about $${fm(mk[0]*4.256)}–$${fm(mk[1]*4.622)} a year (City of Vancouver 2026 rates as proposed; sewer rate ?)`]]:[]),['Fire-fighting water',C.q('the volume is not sized in the tool')]],
    more:[['Other sources and their rules',`<p>${city==='van'?'Reclaimed water: Metro Vancouver considers supply to industry case by case; no rate. Neighbours’ greywater is not allowed as a cooling source under the Building By-law. Sewer as a heat sink: waste may not reach 40 °C entering any sewage facility; a discharge over 300 m³ in 30 days needs a permit (Metro Vancouver Sewer Use Bylaw 299).':'Reclaimed water: EPCOR supplied 4,226 ML to industry in 2024 (Gold Bar). Neighbours’ greywater needs a variance in Alberta. Cooling water to the sanitary sewer needs EPCOR’s prior written approval (Drainage Services Bylaw 18100).'}</p>`],['Hybrid coolers',`<p>Wet only in the ${fm(WET[city][0])} hours a typical year is above 18 °C (${(WET[city][1]*100).toFixed(1)}%; CWEC, computed).</p>`]],
    src:['Evaporation, make-up, blowdown, rain: tool/engine.js waterView with tool/data/water.json. '+reg3('evap'),reg3('rain'),...(city==='van'?[reg3('wprice')]:[]),'Fire-fighting water: the tool names the code basis in its opportunity text (opps.js) but sizes no volume.'],
    missing:['fire-fighting water volume','sewer rate for the water bill (Vancouver)']}; }});

/* 11 Materials: dropped (J.B. 11 Nov 2026, F10 widened): embodied carbon not accurate enough to show, and the card goes with it */

/* ======================= 12 Report ======================= */
C.add(T,'Report',{async build(x){
  const M=await modelNow(x); let TP=BD.TPL; if(!TP||!TP.reports){ try{ TP=await BD.getJSON('templates.json'); }catch(e){} }
  const plan=((TP&&TP.reports&&TP.reports.full)||[]).filter(q=>q.id!=='spec'&&!/could become/i.test(q.title)); let pages=[], err='';
  try{ await BD.opps(); if(BD.oppPrep) await BD.oppPrep(); const D=await BD.report3.collect(); pages=await BD.report3.pages(D); pages=pages.filter(p=>!/aria-label="Could become/i.test(p.slice(0,1500))); }catch(e){ err=String(e&&e.message||e).slice(0,120); }
  const titleOf=s=>{ const m=/aria-label="([^"]*)"/.exec(s.slice(0,1500)); return m?m[1]:''; };
  const norm=t=>String(t).toLowerCase().replace(/[^a-z]/g,'');
  const info=p=>{ const t=titleOf(p), hit=plan.find(q=>norm(q.title)===norm(t)||norm(q.id)===norm(t)); return {t:t||'Page',w:hit?hit.what:'a page for one option you chose'}; };
  const list=pages.map((p,i)=>{ const I=info(p); return `<div class="${NS}pg"><div class="sh">${p}</div><div class="no"><b>${String(i+1).padStart(2,'0')} · ${esc(I.t)}</b>${esc(I.w)}</div></div>`; }).join('');
  const draw=`<div class="${NS}wrap"><div class="${NS}pages" tabindex="0" aria-label="The report's pages">${list||`<p class="f1v-empty">The report pages could not be drawn${err?': '+esc(err):''}.</p>`}</div>
    <p class="f1c-note">${pages.length} letter pages, drawn by the tool from this lot and the picks above. Scroll sideways for the rest.</p><button type="button" class="${NS}btn" onclick="window.print()">Print the report</button></div>`;
  const notBuilt=plan.filter(q=>!pages.some(p=>norm(info(p).t)===norm(q.title))&&q.id!=='sources'&&q.id!=='spec');
  return {noZoneFlag:false,draw,lead:`The Engineering report has ${plan.length} sections in tool/templates.json; the tool draws ${pages.length} pages for this lot.`,
    hero:[{v:String(pages.length),l:'pages drawn for this lot'},{v:String(plan.length),l:'sections in the report plan'}],
    rows:[...plan.map((q,i)=>[`${String(i+1).padStart(2,'0')} ${q.title}`,q.what]),['Export','Print or save as PDF (window.print)']],
    more:[['Print',`<p>The print button opens the browser’s print dialog; choose “Save as PDF” there. The tool’s own report view also saves a PDF with selectable sources (report3.js, jsPDF); it is not wired to these cards.</p>`],...(notBuilt.length?[['Sections without a page here',`<p>${notBuilt.map(q=>esc(q.title)).join(', ')}.</p>`]]:[]),['Could become',`<p>One page for each option picked in the Opportunities step; none is picked on this example lot, so none is drawn.</p>`]],
    src:['Report plan: tool/templates.json, reports.full (sections and what each holds).','Pages: BD.report3.collect() and pages() (tool/report3.js), drawn from the Engineering state of this lot; sources and the appendix are text in the saved PDF.','Print: window.print, as the Municipal report card.'],
    missing:err?['the report pages (could not be drawn: '+err+')']:[]}; }});
})();
