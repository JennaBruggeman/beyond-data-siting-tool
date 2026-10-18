/* Beyond Data — "How it works" cards (J.B., 17 Oct 2026: "everything is a step by step visualization and explanation of its particular
   trade-offs … graphs, charts, pie charts where applicable"). One card per subject, a few steps each: a schematic animation of how the
   system works, then charts of what it means at this site, then the trade-off. Every number comes from the tool's own model and register
   (the same figures the panel shows); animations are schematic, never to scale. Optional: the path never requires opening one.
   Chart colours: validated for the dark panel (dataviz validator, 17 Oct): heat #d0705f, water #3f97c6, power #b8861c, place #3fa57e,
   materials #9184e0; grey for "everything else". Identity is never colour alone: every mark is labelled. */
(function(){
'use strict';
const BD=window.BD; const {$,esc,fmt}=BD;
const C={heat:'#d0705f',water:'#3f97c6',power:'#b8861c',place:'#3fa57e',mat:'#9184e0',other:'#6b6964',ink:'#e9e6e1',muted:'#9d9a94',line:'#3c4148',bg:'#17181a'};
const NS='http://www.w3.org/2000/svg';
const K=t=>`<span class="k">${t}</span>`;
const f1=v=>v>=100?fmt(Math.round(v)):v>=10?v.toFixed(0):v.toFixed(1);
const rg=(a,b,u)=>Math.abs(a-b)<1e-9*Math.max(1,Math.abs(a))?`${f1(a)}${u?' '+u:''}`:`${f1(a)}–${f1(b)}${u?' '+u:''}`;

/* ---------- context: the same figures the panel uses ---------- */
function ctx(){ const e=BD.eng, f=e.siteFacts(), R=e.R, A=BD.S.answers, mw=A.mw||1; const d=BD.recv[f.city]||{pts:[],nets:[]};
  const near=e.nearby(f,d), nets=e.netsAt(f,d), r=e.calc({mw,recover:true,to:'near'},f,near,nets);
  const size=o=>BD.plant.sizeFor(mw,Object.assign({},A,{outside:o}));
  const WETS={van:[1085,0.124],edm:[914,0.104]};
  const water=o=>{ const m=r.facMWh[1]*1.5; return o==='towers'?m:o==='hybrid'?m*WETS[f.city][1]:0; };
  // every receiver within 1.5 km, as on the Heat step (verification sweep M4: e.nearby() cuts at each type's own reach)
  const all15=(d.pts||[]).filter(p=>Math.hypot(p.x-f.c[0],p.y-f.c[1])<=1500);
  return {e,f,R,A,mw,r,near,all15,nets,size,water,WETS,city:f.city==='van'?'Vancouver':'Edmonton'}; }

/* ---------- drawing helpers ---------- */
function el(t,a,p){ const n=document.createElementNS(NS,t); for(const k in a) n.setAttribute(k,a[k]); if(p) p.appendChild(n); return n; }
function txt(p,x,y,s,o){ o=o||{}; const t=el('text',{x,y,fill:o.c||C.ink,'font-size':o.s||12,'text-anchor':o.a||'start','font-weight':o.w||300},p); t.textContent=s; return t; }
function flow(p,d,c,o){ o=o||{}; return el('path',{d,stroke:c,'stroke-width':o.w||2,fill:'none',class:'xflow'+(o.slow?' slow':'')+(o.rev?' rev':''),'stroke-linecap':'round'},p); }
function rect(p,x,y,w,h,o){ o=o||{}; return el('rect',{x,y,width:w,height:h,rx:o.r==null?4:o.r,fill:o.f||'none',stroke:o.s||C.line,'stroke-width':o.sw||1.2},p); }
function svg(host,w,h,label){ host.innerHTML=''; const s=el('svg',{viewBox:`0 0 ${w} ${h}`,role:'img','aria-label':label||''}); host.appendChild(s); return s; }
function tip(node,t){ const tt=el('title',{},node); tt.textContent=t; return node; }

/* horizontal bars, each a value or a range; one unit per chart (one axis) */
function bars(host,rows,unit,label){ const W=560, rh=34, top=26, H=top+rows.length*rh+30, L=170, Rr=W-90; const s=svg(host,W,H,label);
  const mx=Math.max(1e-9,...rows.map(r=>r.hi!=null?r.hi:r.v)); const X=v=>L+(Rr-L)*v/mx;
  [0,0.5,1].forEach(t=>{ const x=X(mx*t); el('line',{x1:x,x2:x,y1:top-4,y2:H-24,stroke:C.line,'stroke-width':1},s); txt(s,x,H-8,t===0?'0':f1(mx*t),{c:C.muted,s:11,a:'middle'}); });
  txt(s,W-6,14,unit,{c:C.muted,s:10.5,a:'end'});
  rows.forEach((r,i)=>{ const y=top+i*rh; const lo=r.lo!=null?r.lo:0, hi=r.hi!=null?r.hi:r.v; txt(s,L-10,y+16,r.label,{a:'end',s:12});
    const g=el('g',{},s); const w=Math.max(r.v===0&&r.hi==null?0:2,X(hi)-X(0));
    if(r.lo!=null){ el('rect',{x:X(0),y:y+6,width:Math.max(2,X(lo)-X(0)),height:14,rx:3,fill:r.c,opacity:0.95},g); el('rect',{x:X(lo),y:y+6,width:Math.max(2,X(hi)-X(lo)),height:14,rx:3,fill:r.c,opacity:0.45},g); }
    else el('rect',{x:X(0),y:y+6,width:w,height:14,rx:3,fill:r.c},g);
    txt(s,X(hi)+6,y+17,r.lo!=null?rg(r.lo,r.hi,''):(hi===0?'none':f1(hi)),{s:11.5,c:C.ink});
    tip(g,`${r.label}: ${r.lo!=null?rg(r.lo,r.hi,unit):(hi===0?'none':f1(hi)+' '+unit)}${r.note?' — '+r.note:''}`); });
  return s; }
/* donut for parts of one whole; labels sit outside, so colour is never the only key */
function donut(host,parts,centre,label){ const W=560,H=280,cx=150,cy=140,R0=100,R1=64; const s=svg(host,W,H,label); const tot=parts.reduce((t,p)=>t+p.v,0)||1; let a=-Math.PI/2;
  parts.forEach((p,i)=>{ const da=2*Math.PI*p.v/tot, a1=a+da, gap=parts.length>1?0.012:0; const A0=a+gap, A1=a1-gap; const lg=da>Math.PI?1:0;
    const P=(r,t)=>[cx+r*Math.cos(t),cy+r*Math.sin(t)];
    const d=`M${P(R0,A0)} A${R0},${R0} 0 ${lg} 1 ${P(R0,A1)} L${P(R1,A1)} A${R1},${R1} 0 ${lg} 0 ${P(R1,A0)} Z`;
    tip(el('path',{d,fill:p.c},s),`${p.label}: ${p.show||Math.round(100*p.v/tot)+'%'}`);
    const ly=60+i*46; el('rect',{x:300,y:ly-9,width:12,height:12,rx:3,fill:p.c},s); txt(s,320,ly+1,p.label,{s:12.5}); txt(s,320,ly+18,p.show||Math.round(100*p.v/tot)+'%',{s:11.5,c:C.muted}); a=a1; });
  if(centre){ txt(s,cx,cy-2,centre[0],{a:'middle',s:20,w:300}); txt(s,cx,cy+18,centre[1],{a:'middle',s:11,c:C.muted}); }
  return s; }
/* a line, with a limit drawn across it */
function lineChart(host,o){ const W=560,H=280,L=48,Rr=W-20,T=14,B=H-34; const s=svg(host,W,H,o.label);
  const X=v=>L+(Rr-L)*(v-o.x0)/(o.x1-o.x0), Y=v=>B-(B-T)*(v-o.y0)/(o.y1-o.y0);
  for(const t of o.xt){ const x=X(t); el('line',{x1:x,x2:x,y1:T,y2:B,stroke:C.line,'stroke-width':.6},s); txt(s,x,B+16,t+(o.xu||''),{a:'middle',s:10.5,c:C.muted}); }
  for(const t of o.yt){ const y=Y(t); el('line',{x1:L,x2:Rr,y1:y,y2:y,stroke:C.line,'stroke-width':.6},s); txt(s,L-6,y+4,t,{a:'end',s:10.5,c:C.muted}); }
  txt(s,L,T-2,o.yu,{s:10.5,c:C.muted});
  if(o.band){ const [lo,hi]=o.band; const top=o.pts.map(([x])=>[X(x),Y(hi(x))]), bot=o.pts.map(([x])=>[X(x),Y(lo(x))]).reverse(); el('path',{d:'M'+top.concat(bot).map(p=>p.join(',')).join(' L')+' Z',fill:o.c,opacity:.28},s); }
  el('path',{d:'M'+o.pts.map(([x,y])=>X(x)+','+Y(y)).join(' L'),stroke:o.c,'stroke-width':2,fill:'none'},s);
  if(o.limit!=null){ const y=Y(o.limit); el('line',{x1:L,x2:Rr,y1:y,y2:y,stroke:C.ink,'stroke-width':1,'stroke-dasharray':'4 4'},s); txt(s,Rr,y-6,o.limitLabel,{a:'end',s:11}); }
  (o.marks||[]).forEach(m=>{ const x=X(m[0]); el('line',{x1:x,x2:x,y1:T,y2:B,stroke:o.c,'stroke-width':1,'stroke-dasharray':'2 3'},s); txt(s,x+4,T+12+(m[2]||0),m[1],{s:11}); });
  return s; }
/* the year as one strip of hours, with a share marked */
function yearStrip(host,share,lab,c,label,centre){ const W=560,H=centre!=null?110:90,L=20,Rr=W-20; const s=svg(host,W,H,label); el('rect',{x:L,y:40,width:Rr-L,height:22,rx:4,fill:'#26292e'},s);
  const w=Math.max(2,(Rr-L)*share), x0=centre!=null?L+(Rr-L)*centre-w/2:L; el('rect',{x:x0,y:40,width:w,height:22,rx:4,fill:c},s); if(centre!=null) txt(s,x0+w/2,100,'mostly in summer (placement schematic)',{s:10.5,c:C.muted,a:'middle'}); ['Jan','Apr','Jul','Oct','Dec'].forEach((m,i)=>txt(s,L+(Rr-L)*i/4,82,m,{s:10.5,c:C.muted,a:i===4?'end':i?'middle':'start'})); txt(s,L,28,lab,{s:12}); return s; }

/* ---------- schematic animations (not to scale) ---------- */
function anim(kind){ return host=>{ const s=svg(host,560,300,'Schematic: '+kind); const b=el('g',{},s);
  // the hall, common to every drawing
  rect(b,30,150,170,110,{s:C.line}); txt(b,40,170,'data hall',{s:11,c:C.muted}); for(let i=0;i<4;i++) rect(b,46+i*38,190,26,58,{s:'#55585d',r:2});
  if(kind==='power'){ rect(b,30,40,90,46,{s:C.power}); txt(b,40,58,'grid',{s:11}); txt(b,40,74,'substation',{s:10.5,c:C.muted}); flow(b,'M75,86 V150',C.power,{w:2.5});
    rect(b,250,150,110,46,{s:'#55585d'}); txt(b,262,170,'UPS, batteries',{s:11}); flow(b,'M200,172 H250',C.power,{rev:true}); rect(b,250,214,110,46,{s:'#55585d'}); txt(b,262,234,'standby',{s:11}); txt(b,262,250,'generators',{s:10.5,c:C.muted});
    flow(b,'M200,232 H250',C.power,{rev:true,slow:true}); flow(b,'M115,150 C160,100 330,90 420,90',C.heat,{}); txt(b,428,94,'→ heat',{s:11}); return; }
  // heat leaving the servers into a loop
  flow(b,'M200,180 C240,180 250,120 300,120',C.heat,{}); flow(b,'M300,140 C250,140 240,230 200,230',C.water,{rev:true});
  if(kind==='dry'){ rect(b,300,90,170,70,{s:C.heat}); txt(b,312,108,'dry cooler',{s:11.5}); txt(b,312,124,'fans pull air over the coil',{s:10.5,c:C.muted});
    for(let i=0;i<3;i++){ el('circle',{cx:340+i*45,cy:142,r:11,fill:'none',stroke:'#8a8781',class:'xfan'},b); flow(b,`M${340+i*45},86 V40`,'#8a8781',{slow:true}); }
    txt(b,300,30,'warm air out; no water',{s:11}); }
  if(kind==='towers'){ rect(b,300,70,150,110,{s:C.water}); txt(b,312,88,'cooling tower',{s:11.5}); for(let i=0;i<5;i++) flow(b,`M${320+i*25},100 V168`,C.water,{w:1.4});
    flow(b,'M375,70 C365,40 395,30 385,10',C.muted,{slow:true}); txt(b,400,30,'vapour: water evaporates',{s:11}); flow(b,'M470,120 H450',C.water,{rev:true}); txt(b,474,124,'make-up',{s:10.5,c:C.muted});
    flow(b,'M375,180 V270 H480',C.water,{slow:true}); txt(b,420,288,'blowdown to the sewer',{s:10.5,c:C.muted}); }
  if(kind==='hybrid'){ rect(b,300,90,170,70,{s:C.heat}); txt(b,312,108,'hybrid cooler',{s:11.5}); txt(b,312,124,'dry most of the year',{s:10.5,c:C.muted});
    for(let i=0;i<3;i++) el('circle',{cx:340+i*45,cy:142,r:11,fill:'none',stroke:'#8a8781',class:'xfan'},b);
    const sp=el('g',{class:'xspray'},b); for(let i=0;i<6;i++) flow(sp,`M${310+i*28},80 v14`,C.water,{w:1.4}); txt(sp,300,66,'hot day: water sprayed on the inlet air',{s:11,c:C.water}); }
  if(kind==='recover'){ rect(b,300,90,110,70,{s:C.heat}); txt(b,310,108,'heat pump',{s:11.5}); txt(b,310,124,'lifts 25–35 °C to ~70 °C',{s:10.5,c:C.muted});
    rect(b,300,20,110,40,{s:C.power}); txt(b,310,44,'electricity in',{s:11}); flow(b,'M355,60 V90',C.power,{});
    flow(b,'M410,125 H520',C.heat,{w:3}); txt(b,440,115,'to the network',{s:11}); rect(b,450,150,80,110,{s:C.place}); txt(b,460,170,'homes,',{s:11}); txt(b,460,186,'schools,',{s:11}); txt(b,460,202,'pools',{s:11}); flow(b,'M490,135 V150',C.heat,{}); }
  if(kind==='water'){ rect(b,300,90,130,70,{s:C.water}); txt(b,312,110,'cooling plant',{s:11.5}); flow(b,'M520,125 H430',C.water,{rev:false}); txt(b,450,116,'city water',{s:10.5,c:C.muted});
    flow(b,'M360,90 C350,60 380,50 370,20',C.muted,{slow:true}); txt(b,384,30,'evaporated',{s:11}); flow(b,'M365,160 V270 H520',C.water,{slow:true}); txt(b,430,288,'to the sewer',{s:10.5,c:C.muted});
    rect(b,30,40,170,60,{s:C.water}); txt(b,40,62,'roof',{s:11}); txt(b,40,78,'rain could top it up',{s:10.5,c:C.muted}); flow(b,'M200,70 C260,70 280,100 300,110',C.water,{slow:true}); }
  if(kind==='sound'){ rect(b,300,120,60,40,{s:C.heat}); txt(b,302,112,'plant',{s:11}); for(let i=1;i<=4;i++) el('circle',{cx:330,cy:140,r:i*34,fill:'none',stroke:C.heat,'stroke-width':1,opacity:(1.1-i*0.22).toFixed(2),class:'xring',style:`animation-delay:${i*0.35}s`},b);
    rect(b,480,190,50,60,{s:C.place}); txt(b,480,270,'neighbour',{s:11}); }
  if(kind==='refresh'){ rect(b,300,150,90,110,{s:C.mat}); txt(b,310,170,'loading',{s:11}); flow(b,'M200,205 H300',C.mat,{}); flow(b,'M390,205 H520',C.mat,{}); txt(b,410,196,'old servers out',{s:11}); txt(b,410,230,'every 5–6 years',{s:10.5,c:C.muted}); flow(b,'M520,250 H390',C.mat,{rev:false}); txt(b,410,268,'new servers in',{s:11}); }
}; }

/* ---------- the subjects ---------- */
const PUEmid=R=>(R.pue[0]+R.pue[1])/2;
const TOPICS={
 cooling:{t:'How the heat leaves the building', steps:x=>{ const {R,mw,size,water,WETS,f,city}=x; const it=1/PUEmid(R);
  const S={dry:size('dry'),towers:size('towers'),hybrid:size('hybrid')}; const area=k=>S[k].n*S[k].k.L*S[k].k.W;
  return [
   {t:'Almost all the power ends as heat',p:`Servers turn electricity into heat. With cooling and losses, a ${mw} MW data centre has about ${K(rg(S.dry.Q*0.9,S.dry.Q,'MW'))} of heat to get rid of at full load, and about ${rg(S.dry.Q*0.9*BD.eng.R.lf,S.dry.Q*BD.eng.R.lf,'MW')} averaged over a year. The cooling is sized for full load.`,
    v:h=>donut(h,[{label:'Servers (IT)',v:it,c:C.heat,show:Math.round(it*100)+'% of the power'},{label:'Cooling, losses, lights',v:1-it,c:C.other,show:Math.round((1-it)*100)+'% (PUE '+R.pue[0]+'–'+R.pue[1]+')'}],[PUEmid(R).toFixed(2),'PUE, middle'],'Share of electricity'),src:['pue']},
   {t:'Dry coolers',p:`A closed loop carries the heat to coils outside; ${K('fans')} blow air across them. ${K('No water')}, but they need the most space: ${S.dry.n} units for this size.`,v:anim('dry'),src:['plant']},
   {t:'Cooling towers',p:`Warm water falls through the tower and part of it ${K('evaporates')}, which carries the heat away. Smaller and fewer, but it ${K('uses water')}, sends blowdown to the sewer and needs Legionella testing.`,v:anim('towers'),src:['evap']},
   {t:'Hybrid (adiabatic) coolers',p:`Dry most of the year. On hot days water is sprayed on the incoming air. In ${city} that is about ${K(Math.round(WETS[f.city][1]*1000)/10+'% of the year')} (${fmt(WETS[f.city][0])} hours above 18 °C).`,
    v:h=>{ anim('hybrid')(h); },extra:h=>yearStrip(h,WETS[f.city][1],`Hours with water on, ${city} (typical year)`,C.water,'Share of the year the spray runs',0.55),src:['evap']},
   {t:'How much room each one takes',p:`Units for ${mw} MW, with ${x.A.spares==='2n'?'double':x.A.spares==='none'?'no':'one'} spare. Area is the units alone; clearances add more.`,
    v:h=>bars(h,[{label:'Dry coolers',v:area('dry'),c:C.heat,note:S.dry.n+' units'},{label:'Hybrid coolers',v:area('hybrid'),c:C.power,note:S.hybrid.n+' units'},{label:'Cooling towers',v:area('towers'),c:C.water,note:S.towers.n+' cells'}],'m² of units','Plant area by system'),src:['plant']},
   {t:'How much water each one uses',p:`Evaporated on site in a year, at most. ${K('Dry coolers use none')}; towers evaporate up to 1.5 L per kWh of heat.`,
    v:h=>bars(h,[{label:'Dry coolers',v:0,c:C.heat},{label:'Hybrid coolers',v:water('hybrid'),c:C.power},{label:'Cooling towers',v:water('towers'),c:C.water}],'m³ a year','Water evaporated by system'),src:['evap']},
  ]; }},
 heat:{t:'Heat for the neighbours', steps:x=>{ const {R,mw,r,all15,f,city}=x; const k={housing:0,school:0,care:0,hospital:0,rec:0,pool:0,arena:0}; all15.forEach(p=>{ k[p.t]=(k[p.t]||0)+1; });
  const parts=[['Non-market housing','housing',C.heat],['Schools','school',C.water],['Care, hospitals','care',C.mat],['Recreation, pools','rec',C.place]].map(([l,t,c])=>({label:l,v:(k[t]||0)+(t==='care'?k.hospital||0:0)+(t==='rec'?(k.pool||0)+(k.arena||0):0),c})).filter(p=>p.v>0);
  return [
   {t:'Catching the heat',p:`Air cooling leaves heat at ${K('25–35 °C')}, too cool for most heating. Liquid cooling to the chip catches ${K(Math.round(R.capture[0]*100)+'–'+Math.round(R.capture[1]*100)+'%')} of it in water.`,
    v:h=>bars(h,[{label:'Caught in liquid',lo:R.capture[0]*100,hi:R.capture[1]*100,c:C.heat},{label:'Left in the air',lo:(1-R.capture[1])*100,hi:(1-R.capture[0])*100,c:C.other}],'% of server heat','Heat captured by liquid cooling'),src:['cap']},
   {t:'Lifting it with a heat pump',p:`A heat pump raises it to about 70 °C for a network. Each unit of electricity gives ${K(R.cop[0]+'–'+R.cop[1])} units of heat.`,v:anim('recover'),
    extra:h=>bars(h,[{label:'Electricity in',v:1,c:C.power},{label:'Heat out',lo:R.cop[0],hi:R.cop[1],c:C.heat}],'MWh','Heat pump output per MWh of electricity'),src:['cop']},
   {t:'What this size could offer',p:`About ${K(rg(r.avail[0]/1000,r.avail[1]/1000,'GWh a year'))}, the space and water heating of ${rg(r.homes[0],r.homes[1],'homes')} in ${city}. Offered is not used: the buildings still have to take it.`,
    v:h=>bars(h,[{label:'Vancouver',lo:r.avail[0]/R.homeMWh.van,hi:r.avail[1]/R.homeMWh.van,c:C.water},{label:'Edmonton',lo:r.avail[0]/R.homeMWh.edm,hi:r.avail[1]/R.homeMWh.edm,c:C.heat}],'homes','Homes heated by the same heat, each city'),src:['homes']},
   {t:'Who is within 1.5 km',p:parts.length?`${K(parts.reduce((t,p)=>t+p.v,0)+' buildings')} that could take heat, by kind. Distance and price decide which are worth a pipe.`:'No listed receivers within 1.5 km.',
    v:h=>parts.length?donut(h,parts,[String(parts.reduce((t,p)=>t+p.v,0)),'buildings'],'Receivers within 1.5 km by kind'):svg(h,560,120,'none'),src:['recv']},
  ]; }},
 energy:{t:'Power in, power offered', steps:x=>{ const {R,mw,r,f}=x; const co2=c=>[r.facMWh[0]*R.grid[c]/1000,r.facMWh[1]*R.grid[c]/1000];
  return [
   {t:'Where the power goes',p:`About ${K(rg(r.fac[0],r.fac[1],'MW'))} at the meter on average, ${rg(r.facMWh[0]/1000,r.facMWh[1]/1000,'GWh a year')}. The grid sees it as a steady load.`,v:anim('power'),src:['pue','lf']},
   {t:'The carbon of that power',p:`The same load carries ${K('about '+Math.round(R.grid.edm/R.grid.van)+' times')} the carbon on Alberta's grid as on BC's.`,
    v:h=>bars(h,[{label:'Vancouver',lo:co2('van')[0],hi:co2('van')[1],c:C.water},{label:'Edmonton',lo:co2('edm')[0],hi:co2('edm')[1],c:C.heat}],'t CO₂e a year','Carbon of the electricity, each city'),src:['grid']},
   {t:'What the grid asks back',p:f.city==='van'?`BC Hydro's 2026 Call asks large loads to cut ${K('at least 10%')} on 24 h notice, for ${K('at least 144 hours')} a year: about 1.6% of the year.`:`Alberta's interim limit of ${K('1,200 MW')} for new large loads is fully allocated; large data centres may bring their own generation.`,
    v:h=>f.city==='van'?yearStrip(h,144/8760,'Hours the grid may call a cut (at least 144 of 8,760)',C.power,'Share of the year'):bars(h,[{label:'Interim limit',v:1200,c:C.power},{label:'Already allocated',v:1200,c:C.other}],'MW','AESO interim limit'),src:['dr']},
  ]; }},
 water:{t:'Water in, water out', steps:x=>{ const {r,f,water,e}=x; const roof=e.roofArea(f), mm=f.city==='van'?1159.5:422.5, rain=roof*mm/1000*0.8;
  return [
   {t:'Where water is used',p:`Only evaporative cooling uses water on site: it evaporates in the tower, and the salts left behind are ${K('flushed to the sewer')} as blowdown.`,v:anim('water'),src:['evap']},
   {t:'Each system, in a year',p:`At this size, at most. ${K('Dry coolers: none.')}`,v:h=>bars(h,[{label:'Dry coolers',v:0,c:C.heat},{label:'Hybrid coolers',v:water('hybrid'),c:C.power},{label:'Cooling towers',v:water('towers'),c:C.water}],'m³ a year','Water evaporated by system'),src:['evap']},
   {t:'Rain on the roof',p:`About ${K(fmt(rain)+' m³')} falls on ${fmt(roof)} m² of roof in a year. Set against a tower's use, it is ${water('towers')?K(Math.round(100*rain/water('towers'))+'%'):'—'}.`,
    v:h=>bars(h,[{label:'Rain on the roof',v:rain,c:C.water},{label:'Tower, evaporated',v:water('towers'),c:C.other}],'m³ a year','Rain against tower use'),src:['rain']},
   {t:'Hard water, more flushing',p:`Edmonton's water is about ${K('178 mg/L')} hard, Vancouver's about 20. Harder water means more blowdown for the same heat.`,
    v:h=>bars(h,[{label:'Vancouver',v:20,c:C.water},{label:'Edmonton',v:178,c:C.heat}],'mg/L as CaCO₃','Water hardness'),src:['reuse']},
  ]; }},
 people:{t:'What neighbours hear', steps:x=>{ const {f,r,mw}=x; const n=Math.max(1,Math.round(r.fac[1])); const lw=[BD.eng.R.lwUnit[0]+10*Math.log10(n),BD.eng.R.lwUnit[1]+10*Math.log10(n)];
  const z=f.zone||'', act=/^(MC-1|MC-2|DD|M-1|M-1A|M-1B|M-2|IC-1|IC-2|IC-3|I-1|I-1A|I-1B|I-1C|I-2|I-3|I-4|CWD|DEOD)$/.test(z), mid=/^(C-|FC-|FCCDD|BCPED|HA-|R3-|R4-|R5-|RR-3)/.test(z);
  const lim=f.city==='edm'?50:act?55:mid?50:45; const Lp=(L,d)=>L-20*Math.log10(d)-8; const dist=lw.map(L=>Math.pow(10,(L-8-lim)/20));
  const pts=[]; for(let d=10;d<=600;d+=10) pts.push([d,Lp((lw[0]+lw[1])/2,d)]);
  return [
   {t:'Sound spreads and fades',p:`Fans and pumps make a steady sound. It drops about ${K('6 dB each time the distance doubles')}, over open ground without walls.`,v:anim('sound'),src:['snd']},
   {t:'How far it carries here',p:`About ${n} unit${n>1?'s':''} together (an assumption). The night limit of ${lim} dBA is reached at ${K(rg(dist[0],dist[1],'m'))}, low-noise to standard units.`,
    v:h=>lineChart(h,{label:'Sound level against distance',x0:10,x1:600,y0:20,y1:90,xt:[100,200,300,400,500,600],xu:' m',yt:[30,40,50,60,70,80],yu:'dBA',pts,band:[d=>Lp(lw[0],d),d=>Lp(lw[1],d)],c:C.heat,limit:lim,limitLabel:`night limit, ${lim} dBA`,marks:[[Math.min(600,dist[0]),'low-noise'],[Math.min(600,dist[1]),'standard',14]]}),src:['snd','noise']},
  ]; }},
 materials:{t:'What it is made of, and how often', steps:x=>{ const {mw}=x; const servers=mw*1000/0.6, t=[servers*21.25/1000,servers*26.3/1000];
  return [
   {t:'The servers turn over',p:`The building lasts decades; ${K('the servers are replaced every five to six years')}. Each refresh is a truckload of equipment out and in.`,v:anim('refresh'),src:['srv','ew']},
   {t:'Each refresh, by weight',p:`About ${fmt(servers)} servers at this size (about 600 W each): ${K(rg(t[0],t[1],'tonnes'))} each time.`,v:h=>bars(h,[{label:'Servers, one refresh',lo:t[0],hi:t[1],c:C.mat},{label:'Copper in the facility',lo:mw*20,hi:mw*40,c:C.power,note:'industry figure'}],'tonnes','Material by weight'),src:['ew','cu']},
  ]; }},
};
/* opportunities: the gates as a strip, then the rules, then what is not known */
function oppTopic(n){ const g=BD.oppGatesFor(n), GS=BD.oppGates; const st=g.order.map(k=>[k,g.G[k][0],g.G[k][1]]); const L=g.L||{};
  const wrap=(t,w)=>{ const o=[]; let l=''; for(const word of String(t).split(' ')){ if((l+' '+word).trim().length>w){ o.push(l.trim()); l=word; } else l+=' '+word; } if(l.trim()) o.push(l.trim()); return o; };
  const steps=[
   {t:'Six gates, at this site',p:`Each gate is tested here, on its own. ${K(({yes:'Possible here',chg:'Possible with a change',nk:'Not ruled out',no:'Not here'})[g.s])}: ${({yes:'every gate the tool can test passes',chg:'no gate fails outright',nk:'some gates are not yet known',no:'at least one gate fails'})[g.s]}. Nothing is added up.`,
    v:h=>{ const lines=st.map(([,,why])=>wrap(why,52).slice(0,3)); let y=12; const H=12+lines.reduce((t,l)=>t+Math.max(1,l.length)*15+16,0); const s=svg(h,560,H,'Gates at this site');
      st.forEach(([k,v],i)=>{ const col=GS[v][1]; el('rect',{x:14,y,width:84,height:22,rx:4,fill:'none',stroke:col,'stroke-width':1.5},s); txt(s,24,y+15,k,{s:12}); txt(s,108,y+15,GS[v][0],{s:11.5,c:col});
        tip(el('g',{},s),`${k}: ${GS[v][0]} — ${st[i][2]}`); lines[i].forEach((ln,j)=>txt(s,250,y+15+j*15,ln,{s:11,c:C.muted})); y+=Math.max(1,lines[i].length)*15+16; }); }},
  ];
  if(Array.isArray(L.rules)&&L.rules.length) steps.push({t:'The rules, rung by rung',p:`Each rung in both cities: whether it is ${K('allowed, allowed with approval, not allowed')}, or not yet read.`,
    v:h=>{ h.innerHTML=`<table class="cl xrules"><tr><th></th><th>Vancouver</th><th>Edmonton</th></tr>${L.rules.map(x=>`<tr><td>${esc(x.rung)}</td><td>${BD.rsPill(x.van[0])}<small>${esc(x.van[1]||'')}</small></td><td>${BD.rsPill(x.edm[0])}<small>${esc(x.edm[1]||'')}</small></td></tr>`).join('')}</table>`; }});
  steps.push({t:'Not yet known, and how proven',p:(L.unknowns&&L.unknowns.length)?`Still open: ${K(esc(L.unknowns.slice(0,3).join('; ')))}.`:'Nothing listed as open.',
    v:h=>{ h.innerHTML=`<p class="sub" style="margin:4px 6px">${L.readiness?BD.rdPill(L.readiness)+' ':''}${esc(L.basis||'No built case recorded yet.')}</p>`; }});
  return {t:n,steps:()=>steps}; }

/* ---------- the card ---------- */
const S2=new Set(['env','hall','size','plant','pue','lf','cap','cop','fuel','svc','homes','grid','neu','reach','recv','jobs','noise','grid2','floor']);
const srcHTML=k=>{ try{ return S2.has(k)?BD.eng.src(k):BD.eng.s3(k); }catch(e){ return ''; } };
let cur=null;
async function open(id){ if(id.startsWith('opp:')&&!BD._O&&BD.oppPrep){ try{ await BD.oppPrep(); }catch(e){} } let T=id.startsWith('opp:')?oppTopic(id.slice(4)):TOPICS[id]; if(!T) return; const x=ctx(); const steps=T.steps(x); cur={id,T,steps,i:0};
  let w=$('#xp'); if(!w){ w=document.createElement('div'); w.id='xp'; w.setAttribute('role','dialog'); w.setAttribute('aria-modal','true'); document.body.appendChild(w); for(const ev of ['pointerdown','wheel']) w.addEventListener(ev,e=>e.stopPropagation()); w.addEventListener('click',e=>{ if(e.target===w) close(); }); }
  w.hidden=false; render(); }
function render(){ const w=$('#xp'), {T,steps,i}=cur, s=steps[i];
  w.innerHTML=`<div class="xcard"><div class="xtop"><div class="kind">How it works · ${esc(T.t)}</div><button class="x" id="xpX" aria-label="Close">×</button></div>
  <div class="xbody"><div class="xvis" id="xpV"></div><div class="xtext"><div class="xn">${i+1} of ${steps.length}</div><h2>${esc(s.t)}</h2><p>${s.p}</p>${s.extra?'<div class="xvis2" id="xpV2"></div>':''}
  <button class="xtable" id="xpT">Show the numbers</button><div id="xpTab" hidden></div>
  ${s.src?`<details class="fp"><summary>Sources (${s.src.length})</summary>${s.src.map(srcHTML).join('')}</details>`:''}</div></div>
  <div class="xfoot"><div class="xdots">${steps.map((_,j)=>`<button data-j="${j}" aria-label="Step ${j+1}" ${j===i?'aria-current="step"':''}></button>`).join('')}</div>
  <div><button class="sec" id="xpB" ${i?'':'disabled'}>← Back</button> <button class="pri" id="xpN">${i<steps.length-1?'Next →':'Done'}</button></div></div><p class="xnote">Drawings are schematic, not to scale. Numbers are this site's, from the tool.</p></div>`;
  try{ s.v($('#xpV')); }catch(e){ $('#xpV').textContent=''; console.warn(e); } if(s.extra) try{ s.extra($('#xpV2')); }catch(e){}
  $('#xpX').onclick=close; $('#xpB').onclick=()=>{ if(cur.i>0){ cur.i--; render(); } }; $('#xpN').onclick=()=>{ if(cur.i<cur.steps.length-1){ cur.i++; render(); } else close(); };
  w.querySelectorAll('.xdots button').forEach(b=>b.onclick=()=>{ cur.i=+b.dataset.j; render(); });
  $('#xpT').onclick=()=>{ const t=$('#xpTab'); t.hidden=!t.hidden; $('#xpT').textContent=t.hidden?'Show the numbers':'Hide the numbers';
    if(!t.hidden){ const titles=[...w.querySelectorAll('.xvis title, .xvis2 title')].map(n=>n.textContent); t.innerHTML=titles.length?`<table class="cl">${titles.map(r=>{ const k=r.indexOf(':'); return `<tr><td>${esc(r.slice(0,k))}</td><td>${esc(r.slice(k+1))}</td></tr>`; }).join('')}</table>`:'<p class="sub">This step is a drawing; its figures are in the text.</p>'; } };
  setTimeout(()=>$('#xpN')&&$('#xpN').focus(),30); }
function close(){ const w=$('#xp'); if(w){ w.hidden=true; w.innerHTML=''; } cur=null; }
document.addEventListener('keydown',e=>{ if(!cur) return; if(e.key==='Escape'){ e.preventDefault(); close(); } if(e.key==='ArrowRight'&&cur.i<cur.steps.length-1){ cur.i++; render(); } if(e.key==='ArrowLeft'&&cur.i>0){ cur.i--; render(); } },true);

/* which card goes with which step of the path */
const FOR={heat:'heat',energy:'energy',water:'water',materials:'materials',social:'people'};
BD.viz={bars,donut,lineChart,yearStrip,C};
BD.explain={open,close,topicFor:k=>k.startsWith('opp:')?k:FOR[k]||null,TOPICS};
})();
