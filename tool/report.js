/* Beyond Data — diagrams, the speculative section ("Could become") and the report (J.B., 20 Oct 2026: "the report is horribly unprofessional
   looking and is supposed to have diagrams of the different processes, and the different options"; "I think we need a speculative section";
   picks: the reader chooses which opportunities go in; diagrams: a flow beside a site plan).
   Every diagram is drawn from the tool's own model and engine (the same numbers as the steps), as SVG: on screen, in the HTML download, and as
   images in the PDF. The PDF embeds Open Sans (SIL Open Font Licence, fonts/), so m², ≈ and dashes print as written. */
(function(){
'use strict';
const BD=window.BD; const {$,esc,fmt}=BD; const E=()=>BD.eng;
const PAL={
 screen:{ink:'#e9e6e1',mute:'#a8a49d',faint:'#5d5b57',acc:'#CC746C',fill:'rgba(204,116,108,.20)',plant:'#7d7a74',gen:'#b9b5ae',bg:'none',lot:'rgba(255,255,255,.03)',ctx:'rgba(255,255,255,.07)',lotFill:'rgba(255,255,255,.02)',bfill:'rgba(204,116,108,.10)',equip:'rgba(255,255,255,.08)'},
 w1:{ink:'#1b1b1d',mute:'#616164',faint:'#bababc',acc:'#d4202b',fill:'#f5d1d5',plant:'#a8a8ab',gen:'#616164',bg:'#ffffff',lot:'#f5d1d5',ctx:'#ececec',lotFill:'#ffffff',bfill:'#f8dfe2',equip:'#f3f3f3'},
 v6:{ink:'#1d1e20',mute:'#5f5d58',faint:'#b9b6ae',acc:'#9b7946',fill:'#ebe2d2',plant:'#9a978f',gen:'#5f5d58',bg:'#f3f0ea',lot:'#f3f0ea',ctx:'#e3ded4',lotFill:'#f3f0ea',bfill:'#e9dfcd',equip:'#ebe7df'},
 print:{ink:'#222222',mute:'#6b6b6b',faint:'#c4c4c4',acc:'#CC746C',fill:'#f4dedb',plant:'#9a9a9a',gen:'#555555',bg:'#ffffff',lot:'#fafafa',ctx:'#ececeb',lotFill:'#ffffff',bfill:'#fbefed',equip:'#f2f2f2'}};
const FONT=`font-family="Open Sans, Arial, sans-serif"`;
const r1=v=>Math.round(v*10)/10;
const rngT=(a,b,u)=>Math.abs(a-b)<1e-9*Math.max(1,a)?`${fmt(a)} ${u}`:`${fmt(a)}–${fmt(b)} ${u}`;
function wrap(t,n){ const w=String(t||'').split(/\s+/), out=[]; let cur=''; for(const x of w){ if((cur+' '+x).trim().length>n&&cur){ out.push(cur); cur=x; } else cur=(cur+' '+x).trim(); } if(cur) out.push(cur); return out; }
const txt=(x,y,s,o)=>{ o=o||{}; const L=Array.isArray(s)?s:[s]; return `<text x="${x}" y="${y}" ${FONT} font-size="${o.size||11}" fill="${o.fill}" ${o.anchor?`text-anchor="${o.anchor}"`:''} ${o.bold?'font-weight="600"':''}>${L.map((l,i)=>`<tspan x="${x}" dy="${i?(o.size||11)*1.3:0}">${esc(l)}</tspan>`).join('')}</text>`; };

/* ---------- the site plan, from the model (lot, setbacks, building, plant, generators, loading) ---------- */
function ringPts(r){ const p=[]; for(let i=0;i<r.length;i+=2) p.push([r[i],r[i+1]]); return p; }
function planSVG(m,pal,o){ o=o||{}; const W=o.w||520; if(!m||!m.ring) return ''; const P=m.plant||{boxes:[]}; const small=W<400;
  // drawn to plan conventions (J.B. 20 Oct: "this is beyond ugly"): line weight by meaning, neighbours for context, equipment symbols, labels in the drawing
  const all=ringPts(m.ring); let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9; for(const [x,y] of all){ x0=Math.min(x0,x); x1=Math.max(x1,x); y0=Math.min(y0,y); y1=Math.max(y1,y); }
  const pad=Math.max(14,(x1-x0)*0.18); x0-=pad; x1+=pad; y0-=pad; y1+=pad; const sx=(W-20)/(x1-x0), maxH=o.maxH||480; const s2=Math.min(sx,(maxH-20)/(y1-y0)); const H=Math.round((y1-y0)*s2)+20;
  const X=x=>10+(x-x0)*s2, Y=y=>10+(y1-y)*s2;
  const path=r=>'M'+ringPts(r).map(([x,y])=>`${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join('L')+'Z';
  const lw=v=>(v*(small?0.8:1)).toFixed(2);
  let g=`<rect x="0" y="0" width="${W}" height="${H}" fill="${pal.bg}"/>`;
  g+=`<clipPath id="pc${W}"><rect x="6" y="6" width="${W-12}" height="${H-12}"/></clipPath><g clip-path="url(#pc${W})">`;
  // neighbours: building footprints already loaded for the map, light grey, no outline
  const tiles=Object.entries((BD.S&&BD.S.tiles)||{}).filter(([k])=>k.startsWith((BD.S.sel&&BD.S.sel.city||'')+':')).map(([,t])=>t);
  const lotP=m.ring; for(const t of tiles) for(const b of t.bld||[]){ const [cx,cy]=b.c||[0,0]; if(cx<x0||cx>x1||cy<y0||cy>y1) continue; if(BD.pip(cx,cy,lotP)) continue; g+=`<path d="${path(b.r)}" fill="${pal.ctx}" stroke="none"/>`; }
  // the lot: property line (dash-dot) and the buildable line (fine dashes)
  g+=`<path d="${path(m.ring)}" fill="${pal.lotFill}" stroke="${pal.ink}" stroke-width="${lw(.9)}" stroke-dasharray="10 3 2 3"/>`;
  if(m.inset) g+=`<path d="${path(m.inset)}" fill="none" stroke="${pal.mute}" stroke-width="${lw(.5)}" stroke-dasharray="3 3"/>`;
  // the building
  if(m.existing&&m.feet) for(const f of m.feet) g+=`<path d="${path(f.r)}" fill="${pal.bfill}" stroke="${pal.ink}" stroke-width="${lw(.7)}"/>`;
  const B=m.existing?m.foot:(m.sizedTo&&m.serverFoot?m.serverFoot:m.foot);
  if(B) g+=`<path d="${path(B)}" fill="${pal.bfill}" stroke="${pal.acc}" stroke-width="${lw(1.8)}"/>`;
  // equipment: coolers with their fans; generators with a cross; loading stalls numbered
  const axes=r=>{ const p=ringPts(r); const a=p[0],b=p[1],d=p[3]||p[2]; const L1=Math.hypot(b[0]-a[0],b[1]-a[1]), L2=Math.hypot(d[0]-a[0],d[1]-a[1]); return L1>=L2?{o:a,u:[(b[0]-a[0])/L1,(b[1]-a[1])/L1],L:L1,v:[(d[0]-a[0])/L2,(d[1]-a[1])/L2],Wd:L2}:{o:a,u:[(d[0]-a[0])/L2,(d[1]-a[1])/L2],L:L2,v:[(b[0]-a[0])/L1,(b[1]-a[1])/L1],Wd:L1}; };
  for(const b of P.boxes||[]){ const gen=/generator/.test(b.name), roof=b.kind==='roof';
    if(gen){ const p=ringPts(b.ring); g+=`<path d="${path(b.ring)}" fill="${pal.equip}" stroke="${pal.ink}" stroke-width="${lw(.6)}"/><path d="M${X(p[0][0])},${Y(p[0][1])}L${X(p[2][0])},${Y(p[2][1])}M${X(p[1][0])},${Y(p[1][1])}L${X(p[3][0])},${Y(p[3][1])}" stroke="${pal.ink}" stroke-width="${lw(.35)}"/>`; continue; }
    g+=`<path d="${path(b.ring)}" fill="${roof?'none':pal.equip}" stroke="${pal.ink}" stroke-width="${lw(.55)}"/>`;
    const A=axes(b.ring), rr=A.Wd*0.36, n=Math.max(1,Math.floor(A.L/(A.Wd*0.95))); if(rr*s2>1.4) for(let i=0;i<n;i++){ const t=(i+0.5)*A.L/n; const cx=A.o[0]+A.u[0]*t+A.v[0]*A.Wd/2, cy=A.o[1]+A.u[1]*t+A.v[1]*A.Wd/2; g+=`<circle cx="${X(cx).toFixed(1)}" cy="${Y(cy).toFixed(1)}" r="${(rr*s2).toFixed(1)}" fill="none" stroke="${pal.ink}" stroke-width="${lw(.3)}"/>`; } }
  (m.loadSpaces||[]).forEach((l,i)=>{ g+=`<path d="${path(l)}" fill="none" stroke="${pal.mute}" stroke-width="${lw(.5)}"/>`; if(!small){ const p=ringPts(l), cx=p.reduce((a,q)=>a+q[0],0)/p.length, cy=p.reduce((a,q)=>a+q[1],0)/p.length; g+=txt(X(cx),Y(cy)+3,String(i+1),{fill:pal.mute,size:8,anchor:'middle'}); } });
  for(const e of o.extra||[]) g+=e(X,Y,s2);
  g+=`</g>`;
  // labels in the drawing
  const cen=r=>{ const p=ringPts(r); return [p.reduce((a,q)=>a+q[0],0)/p.length,p.reduce((a,q)=>a+q[1],0)/p.length]; };
  const lab=(r,t,col)=>{ if(!r||small) return ''; const [cx,cy]=cen(r); return `<g>${txt(X(cx),Y(cy)+4,t,{fill:col||pal.ink,size:10.5,anchor:'middle',bold:true})}</g>`; };
  if(B) g+=lab(B,m.existing?'Existing building':`Data centre${m.sizedTo?` · ${r1(m.sizedTo.mw)} MW`:''}`,pal.acc);
  if(P.yard) g+=lab(P.yard,'Plant yard',pal.mute);
  if(m.loading) g+=lab(m.loading,'Loading',pal.mute);
  // north arrow and a graduated scale bar
  g+=`<g transform="translate(${W-30},30)"><circle r="12" fill="${pal.bg==='none'?'none':pal.bg}" stroke="${pal.ink}" stroke-width=".6"/><path d="M0,-10 L4,4 L0,1.5 L-4,4 Z" fill="${pal.ink}"/>${txt(0,-15,'N',{fill:pal.ink,size:9,anchor:'middle'})}</g>`;
  const sb=[5,10,20,25,50,100].find(v=>v*s2>(small?40:70))||100, q=sb/2; const sy=H-16, sx0=16;
  g+=`<rect x="${sx0}" y="${sy}" width="${q*s2}" height="4" fill="${pal.ink}"/><rect x="${sx0+q*s2}" y="${sy}" width="${q*s2}" height="4" fill="${pal.bg==='none'?'none':pal.bg}" stroke="${pal.ink}" stroke-width=".6"/>`+txt(sx0,sy-4,'0',{fill:pal.mute,size:8.5,anchor:'middle'})+txt(sx0+q*s2,sy-4,String(q),{fill:pal.mute,size:8.5,anchor:'middle'})+txt(sx0+sb*s2,sy-4,`${sb} m`,{fill:pal.mute,size:8.5,anchor:'middle'});
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Site plan: the lot, the building, its plant and loading">${g}</svg>`; }

/* ---------- a section through the building: storeys, roof plant, generators at grade, the zone's height limit ---------- */
function sectionSVG(m,pal,o){ o=o||{}; const W=o.w||520, H=230; if(!m||!m.H) return ''; const P=m.plant||{}, s=P.s||{}; const Hb=m.existing?(m.roofH||m.H):m.H;
  const lim=m.Z&&(m.Z.hx?m.Z.hx[1]:m.Z.hOutright); const top=Math.max(Hb+(s.k?s.k.H:0),lim||0,10)*1.12; const sc=(H-40)/top;
  const wB=Math.min(W*0.5,Math.max(80,Math.sqrt(m.footArea||900)*sc*1.6)); const x0=60, gY=H-24, Y=h=>gY-h*sc;
  let g=`<rect x="0" y="0" width="${W}" height="${H}" fill="${pal.bg}"/><line x1="20" y1="${gY}" x2="${W-20}" y2="${gY}" stroke="${pal.ink}" stroke-width="1.2"/>`;
  g+=`<rect x="${x0}" y="${Y(Hb)}" width="${wB}" height="${Hb*sc}" fill="${pal.fill}" stroke="${pal.acc}" stroke-width="1.2"/>`;
  const nF=m.nF?m.nF[0]:1; for(let i=1;i<nF;i++){ const fy=Y(Hb*i/nF); g+=`<line x1="${x0}" y1="${fy}" x2="${x0+wB}" y2="${fy}" stroke="${pal.acc}" stroke-width=".5" opacity=".6"/>`; }
  const nr=(P.placed?P.placed.cr+P.placed.gr:0); if(nr&&s.k){ const uh=s.k.H*sc; const n=Math.min(nr,6); for(let i=0;i<n;i++){ const w=(wB-10)/n-4; g+=`<rect x="${x0+5+i*(w+4)}" y="${Y(Hb)-uh}" width="${w}" height="${uh}" fill="none" stroke="${pal.ink}" stroke-width=".8"/>`; } g+=txt(x0+wB+8,Y(Hb)-uh/2+4,`roof plant, ${s.k.H} m`,{fill:pal.mute,size:10}); }
  const ny=P.placed?P.placed.cy+P.placed.gy:0; if(ny){ const k=P.placed.gy&&s.g?s.g:s.k; const uh=k.H*sc; g+=`<rect x="${x0+wB+30}" y="${gY-uh}" width="${Math.min(90,W-x0-wB-60)}" height="${uh}" fill="${pal.gen}" opacity=".85"/>`+txt(x0+wB+30,gY-uh-6,P.placed.gy?'generators in the yard':'plant in the yard',{fill:pal.mute,size:10}); }
  g+=txt(x0-8,Y(Hb)+4,`${r1(Hb)} m`,{fill:pal.ink,size:10,anchor:'end'})+txt(x0+wB/2,gY+16,m.existing?'the building (existing)':`${nF} storey${nF>1?'s':''}`,{fill:pal.mute,size:10,anchor:'middle'});
  if(lim&&!m.existing){ g+=`<line x1="20" y1="${Y(lim)}" x2="${W-20}" y2="${Y(lim)}" stroke="${pal.mute}" stroke-width=".8" stroke-dasharray="5 4"/>`+txt(W-22,Y(lim)-5,`the zone allows ${lim} m`,{fill:pal.mute,size:10,anchor:'end'}); }
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Section: storeys, roof plant and the zone's height limit">${g}</svg>`; }

/* ---------- flow diagrams: what moves, from where to whom, with the figures on the boxes ---------- */
function flowSVG(cols,edges,pal,o){ o=o||{}; const W=o.w||640, bw=Math.min(150,(W-40)/cols.length-28), gap=(W-20-cols.length*bw)/Math.max(1,cols.length-1); const pos={};
  let maxRows=Math.max(...cols.map(c=>c.length)); const bh=62, vg=18, H=maxRows*(bh+vg)+20;
  let g=`<rect x="0" y="0" width="${W}" height="${H}" fill="${pal.bg}"/><defs><marker id="ah${o.id||''}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${pal.mute}"/></marker></defs>`;
  cols.forEach((c,i)=>{ const top=(H-(c.length*(bh+vg)-vg))/2; c.forEach((n,j)=>{ const x=10+i*(bw+gap), y=top+j*(bh+vg); pos[n.id]={x,y};
    g+=`<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="5" fill="${n.hi?pal.fill:'none'}" stroke="${n.hi?pal.acc:(n.dash?pal.mute:pal.ink)}" stroke-width="${n.hi?1.4:.9}" ${n.dash?'stroke-dasharray="4 3"':''}/>`;
    const tl=wrap(n.t,Math.floor(bw/6.6)).slice(0,2), vl=wrap(n.v||'',Math.floor(bw/6)).slice(0,3-tl.length+1);
    g+=txt(x+8,y+17,tl,{fill:pal.ink,size:11,bold:true})+txt(x+8,y+17+tl.length*14,vl,{fill:pal.mute,size:10}); }); });
  for(const e of edges){ const a=pos[e.a], b=pos[e.b]; if(!a||!b) continue; const ax=a.x+bw, ay=a.y+bh/2, bx=b.x-2, by=b.y+bh/2, mx=(ax+bx)/2;
    g+=`<path d="M${ax},${ay} C${mx},${ay} ${mx},${by} ${bx},${by}" fill="none" stroke="${e.hi?pal.acc:pal.mute}" stroke-width="${e.hi?1.6:1}" ${e.dash?'stroke-dasharray="4 3"':''} marker-end="url(#ah${o.id||''})"/>`;
    if(e.l) g+=txt(mx,(ay+by)/2-5,wrap(e.l,18).slice(0,2),{fill:pal.mute,size:9.5,anchor:'middle'}); }
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${esc(o.label||'Flow diagram')}">${g}</svg>`; }

/* ---------- the numbers the diagrams use (the engine's own) ---------- */
async function ctx(){ const e=E(), f=e.siteFacts(), A=BD.S.answers, m=BD.model(); const d=await e.loadRecv(f.city); const near=e.nearby(f,d), nets=e.netsAt(f,d);
  const mw=A.mw||(m&&m.mwSized)||1, rec=(A.inside||'air')!=='air'; const r=e.calc({mw,recover:rec,to:'near'},f,near,nets);
  return {e,f,A,m,d,near,nets,mw,rec,r,R:e.R}; }
function note(k){ return (BD.flow&&BD.flow.notes&&BD.flow.notes[k])||null; }
function ans(k,title){ const n=note(k); if(!n) return ''; const s=(n.secs||[]).find(x=>x[0]===title); return s?s[1]:''; }
function heatFlow(c,pal){ const {mw,rec,r}=c; const best=ans('heat','Best set-up found for heat');
  if(!rec) return flowSVG([[{id:'s',t:'Servers',v:`${r1(mw)} MW, air-cooled`,hi:true}],[{id:'c',t:'Chillers and coolers',v:'carry all the heat out'},{id:'h',t:'Heat pumps on the chilled-water loop',v:'could reuse some: how much is not yet known',dash:true}],[{id:'a',t:'Outside air',v:'all the heat, about 25–35 °C'},{id:'b',t:'Buildings nearby',v:'not yet costed for air cooling',dash:true}]],
    [{a:'s',b:'c',l:'heat'},{a:'c',b:'a'},{a:'s',b:'h',dash:true},{a:'h',b:'b',dash:true}],pal,{id:'h',label:'Heat: where it goes with air cooling'});
  return flowSVG([[{id:'s',t:'Servers',v:`${r1(mw)} MW, liquid to the chip`,hi:true},{id:'e',t:'Electricity for the heat pump',v:rngT(r.hp[0]/1000,r.hp[1]/1000,'GWh a year')}],[{id:'p',t:'Heat pump',v:'lifts 35–40 °C water to heating temperatures (COP 3.0–4.5)'}],[{id:'o',t:'Heat offered',v:rngT(r.avail[0]/1000,r.avail[1]/1000,'GWh a year'),hi:true},{id:'x',t:'The rest',v:'leaves by the coolers and the air'}],[{id:'b',t:'Buildings nearby',v:best?best.replace(/\(.*$/,'').slice(0,90):'see Who could take the heat'}]],
    [{a:'s',b:'p',l:'warm water',hi:true},{a:'e',b:'p'},{a:'p',b:'o',hi:true},{a:'s',b:'x',dash:true},{a:'o',b:'b',l:'a pipe in the street',hi:true}],pal,{id:'h',label:'Heat: from the servers to buildings nearby'}); }
function powerFlow(c,pal){ const {mw,r,m}=c; const P=m&&m.plant&&m.plant.s; const grid=ans('energy','The grid nearby');
  return flowSVG([[{id:'g',t:'The grid',v:grid?grid.slice(0,70):'the utility\'s feeder'},{id:'gen',t:'Standby generators',v:P&&P.g?`${P.gN} sets of about ${P.g.mw} MW, for outages only`:'none in this set-up',dash:true}],[{id:'m',t:'The meter',v:`${rngT(r.fac[0],r.fac[1],'MW')} at full load; ${rngT(r.facMWh[0]/1000,r.facMWh[1]/1000,'GWh a year')}`,hi:true}],[{id:'s',t:'Servers',v:`${r1(mw)} MW`},{id:'c',t:'Cooling, fans, losses',v:rngT(r.fac[0]-mw,r.fac[1]-mw,'MW')}]],
    [{a:'g',b:'m',hi:true},{a:'gen',b:'m',dash:true,l:'in a blackout'},{a:'m',b:'s'},{a:'m',b:'c'}],pal,{id:'p',label:'Power: from the grid to the servers'}); }
function waterFlow(c,pal){ const {f,A,e}=c; const L=(BD.compareRefs?BD.compareRefs(f):[]).find(x=>x.id==='here'); const ev=L?L.n.evap[1]:0, roof=e.roofArea(f)||0, mm={van:1159.5,edm:422.5}[f.city], rain=roof*mm/1000*0.8;
  return flowSVG([[{id:'w',t:'City water',v:ev?'make-up for evaporation':'little: dry coolers use none'},{id:'r',t:'Rain on the roof',v:rain?`about ${fmt(Math.round(rain/10)*10)} m³ a year (80% caught)`:'roof not known'}],[{id:'c',t:'Cooling',v:ev?`up to ${fmt(ev)} m³ a year evaporated`:'none evaporated (dry coolers)',hi:!!ev},{id:'t',t:'A tank',v:'held for reuse or released slowly',dash:true}],[{id:'a',t:'The air',v:ev?'as vapour':'—'},{id:'s',t:'Sewer and storm drain',v:'blowdown and overflow'}]],
    [{a:'w',b:'c'},{a:'c',b:'a'},{a:'r',b:'t',dash:true},{a:'t',b:'c',dash:true,l:'if it cools'},{a:'t',b:'s'}],pal,{id:'w',label:'Water: in and out'}); }
// the three options, side by side: a plan of each at its size, and what it gains and gives up
async function optionsBlock(c,pal){ const {e,f,near,nets,A}=c; const opts=e.optionSet(f,near,nets).map(o=>Object.assign(o,{r:e.calc(o,f,near,nets)}));
  const keep=JSON.stringify(A); const out=[];
  try{ for(const o of opts){ A.mw=o.mw; A.inside=o.recover?'plate':'air'; BD.modelReset(); const m=BD.model(); out.push({o,svg:planSVG(m,pal,{w:300,maxH:220}),miss:BD.setupProblems?BD.setupProblems(true):[]}); } }
  finally{ Object.keys(A).forEach(k=>delete A[k]); Object.assign(A,JSON.parse(keep)); BD.modelReset(); BD.model(); }
  return out; }

/* ---------- the speculative section: the reader's picks ---------- */
const SPEC={ // what the data centre gives, how it moves, who receives it (for the flow); and what to show on the plan
 'District heat to a network':['heat','a pipe to the network','homes and buildings on the network',['net']],
 'Hospital or campus anchor':['heat','one pipe to one large building','a hospital or campus',['hospital','campus']],
 'New district with the data centre as heat plant':['heat','a new network laid with the district','homes in a future district',['housing','apartment']],
 'Greenhouse':['heat','warm water through the glasshouse','growers',[]],
 'Aquaculture / insects / algae':['heat','warm water to the tanks','a food producer',[]],
 'Seasonal storage in the ground':['summer heat','boreholes under a lot or park','heating in winter',[]],
 'Snowmelt on sidewalks and streets':['heat','pipes under the sidewalk','people walking past',[]],
 'Sewage heat as comparator source':['heat (compared)','beside the sewer\'s own heat','the same receivers',['net']],
 'Distributed servers as heaters':['computing','servers placed in homes','households',['housing']],
 'Reserved capacity and batteries to the grid':['flexibility','batteries and curtailable load','the grid at its peak',[]],
 'EV charging hub':['power','chargers on the lot','drivers nearby',[]],
 'Backup power for neighbours in a blackout':['backup power','a private line behind a transfer switch','a care home or neighbour',['care','hospital']],
 'Grid upgrades shared with neighbours':['grid capacity','a larger feeder or substation','customers who connect later',[]],
 "Solar on neighbours' roofs":['a buyer for solar','credits on the bill','households with roofs',['housing','apartment']],
 'Rainwater, condensate and water reuse':['water','a tank and treatment','cooling make-up and toilets',[]],
 'Stormwater held for the neighbourhood':['storage','a tank under the yard','the sewer in a storm',[]],
 'Emergency water for neighbours':['water','a tank with a street connection','neighbours and firefighters',[]],
 'Meanwhile uses on land held for growth':['land','a lease while the lot waits','a community use',[]],
 'Warming centre, refuge, clean-air room':['shelter','a room with its own street door','people in a heat wave, cold snap or smoke',['care']],
 'Cooling for neighbours':['cooling','a chiller loop','buildings nearby',[]],
 'Material bank: copper':['materials','what leaves at each refresh','recyclers and makers',[]]};
const specKey=()=>BD.S.sel?BD.S.sel.city+':'+BD.S.sel.id:'';
BD.spec={ list(){ const k=specKey(); BD.S.specs=BD.S.specs||{}; return BD.S.specs[k]=BD.S.specs[k]||[]; },
  has(n){ return this.list().includes(n); }, toggle(n){ const L=this.list(), i=L.indexOf(n); if(i<0) L.push(n); else L.splice(i,1); return i<0; } };
// "Add to speculative" on every opportunity's detail (event delegation: the buttons are drawn by opps.js)
document.addEventListener('click',ev=>{ const b=ev.target.closest&&ev.target.closest('.spadd'); if(!b) return; const on=BD.spec.toggle(b.dataset.n); b.textContent=on?'In the speculative section ✓':'Add to speculative'; b.classList.toggle('on',on); });
const specBtn=n=>`<button class="btn spadd${BD.spec.has(n)?' on':''}" data-n="${esc(n)}">${BD.spec.has(n)?'In the speculative section ✓':'Add to speculative'}</button>`;
BD.specBtn=specBtn;
function oppPlanSVG(c,n,pal){ const {m,f,d}=c; const kinds=(SPEC[n]||[])[3]||[]; const R=kinds.includes('net')?3000:1200;
  if(!kinds.length) return planSVG(m,pal,{w:300,maxH:260}); // it sits on or beside the lot: the site plan says more than an empty circle
  // a context plan: the lot at the centre, the receivers of the kinds this opportunity serves, networks, a radius ring
  const W=300, H=300, s=(W/2-14)/R, X=x=>W/2+(x-f.c[0])*s, Y=y=>H/2-(y-f.c[1])*s; let g=`<rect width="${W}" height="${H}" fill="${pal.bg}"/>`;
  g+=`<circle cx="${W/2}" cy="${H/2}" r="${R*s}" fill="none" stroke="${pal.faint}" stroke-dasharray="3 3"/>`+txt(W/2+R*s*0.71+2,H/2-R*s*0.71,`${fmt(R)} m`,{fill:pal.mute,size:9.5});
  for(const nt of d.nets||[]) if(kinds.includes('net')){ let p=''; for(let i=0;i<nt.r.length;i+=2) p+=(i?'L':'M')+X(nt.r[i]).toFixed(1)+','+Y(nt.r[i+1]).toFixed(1); g+=`<path d="${p}Z" fill="${pal.fill}" stroke="${pal.acc}" stroke-width=".8" opacity=".8"/>`; }
  let cnt=0; for(const p of d.pts||[]){ if(!kinds.includes(p.t)) continue; const dd=Math.hypot(p.x-f.c[0],p.y-f.c[1]); if(dd>R) continue; cnt++; g+=`<circle cx="${X(p.x).toFixed(1)}" cy="${Y(p.y).toFixed(1)}" r="2.6" fill="${pal.acc}"/>`; }
  if(m&&m.ring){ let p=''; for(let i=0;i<m.ring.length;i+=2) p+=(i?'L':'M')+X(m.ring[i]).toFixed(1)+','+Y(m.ring[i+1]).toFixed(1); g+=`<path d="${p}Z" fill="${pal.ink}" stroke="${pal.ink}"/>`; }
  g+=`<g transform="translate(${W-18},22)"><path d="M0,-12 L4,3 L0,0 L-4,3 Z" fill="${pal.ink}"/></g>`;
  const what=kinds.filter(k=>k!=='net').map(k=>({housing:'non-market housing',apartment:'apartment buildings',care:'care homes',hospital:'hospitals',campus:'campuses'}[k]||k));
  g+=txt(8,H-10,kinds.length?`${what.length?`${cnt} ${what.join(' or ')}`:''}${kinds.includes('net')?(what.length?' · ':'')+'heat networks shaded':''} within ${fmt(R)} m`:'the lot (black); this opportunity is on or beside it',{fill:pal.mute,size:9.5});
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Plan: the lot and what is around it">${g}</svg>`; }
function specData(c,n){ const g=BD.oppGatesFor?BD.oppGatesFor(n):null; const L=(g&&g.L)||{}, G=(g&&g.G)||{}; const city=c.f.city;
  const offer=[], used=new Set(); for(const k of ['demand','physics']){ const x=G[k]; if(x&&x[0]!=='no'&&x[1]&&x[1]!=='—'){ offer.push(x[1]); used.add(k); } }
  const need=[]; const rungs=Array.isArray(L.rules)&&L.rules.length; for(const k of ['physics','land','rules','demand','time','money']){ const x=G[k]; if(k==='rules'&&rungs) continue; /* the rungs below say it in full */ if(x&&x[0]!=='yes'&&!used.has(k)&&x[1]&&x[1]!=='—') need.push([k,x[1]]); }
  for(const u of L.unknowns||[]) need.push(['not yet known',u]);
  for(const x of Array.isArray(L.rules)?L.rules:[]){ const v=x[city]; if(v&&['approval','unknown','no_rule','not_allowed'].includes(v[0])) need.push([x.rung,`${({approval:'needs approval',unknown:'rule not yet read',no_rule:'no rule covers it',not_allowed:'not allowed'})[v[0]]}${v[1]?': '+v[1]:''}`]); }
  return {L,G,need,offer,sum:g?g.s:'nk'}; }
function specFlow(n,pal,c){ const S=SPEC[n]||['what it gives','how it moves','who receives it',[]]; const sd=specData(c,n);
  return flowSVG([[{id:'d',t:'The data centre',v:`gives ${S[0]}`,hi:true}],[{id:'h',t:'How',v:S[1]}],[{id:'r',t:'Who receives it',v:S[2],dash:sd.sum!=='yes'}]],[{a:'d',b:'h',hi:true},{a:'h',b:'r',dash:sd.sum!=='yes'}],pal,{w:420,id:'s'+n.length,label:`${n}: what moves`}); }
const READ={built_here:'built here',built_elsewhere:'built elsewhere',pilot:'a pilot',speculative:'speculative'};
const GATEW={yes:'possible here',chg:'possible with a change',nk:'not ruled out',no:'not here'};
function specCardHTML(c,n,pal){ const sd=specData(c,n);
  return `<div class="spcard"><div class="sph"><h3>${esc(n)}</h3><span class="src">${esc(GATEW[sd.sum]||'')} · ${esc(READ[sd.L.readiness]||'not yet rated')}</span></div>
   <div class="spdg"><div>${specFlow(n,pal,c)}</div><div>${oppPlanSVG(c,n,pal)}</div></div>
   <div class="spcols"><div><h4>What it could offer</h4>${sd.offer.length?`<ul>${sd.offer.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'<p class="sub">Not yet worked out here.</p>'}</div>
   <div><h4>What would have to be true</h4>${sd.need.length?`<ul>${sd.need.map(([k,v])=>`<li><b>${esc(k)}</b>: ${esc(v)}</li>`).join('')}</ul>`:'<p class="sub">Every gate the tool can test passes.</p>'}</div></div>
   ${sd.L.basis?`<p class="src">How proven: ${esc(sd.L.basis)}</p>`:''}</div>`; }
async function specView(){ const c=await ctx(); BD.S.view2='tab'; const picks=BD.spec.list(); const pal=PAL.screen;
  const all=(BD.oppFams||[]).map(f=>[f,(BD.oppFamList&&BD.oppFamList(f))||[]]);
  $('#side').innerHTML=`<h2>Could become</h2><p class="lead">${picks.length?`<span class="k">${picks.length}</span> opportunit${picks.length>1?'ies':'y'} you chose, each drawn as what would move, where, what it could offer and what would have to be true.`:'Choose the opportunities you want to explore. Each one is drawn here and goes into the report.'}</p>
   <p class="sub">Speculative: these are proposals to test, not findings. Every figure carries its source in the opportunity's own card.</p>
   ${picks.map(n=>specCardHTML(c,n,pal)+`<div class="sprm">${specBtn(n)}</div>`).join('')}
   <details class="alld"${picks.length?'':' open'}><summary>${picks.length?'Add more':'All opportunities'}</summary>${all.map(([f,L])=>`<h4 class="spf">${esc(f)}</h4>${L.map(n=>`<div class="sprow"><span>${esc(n)}</span>${specBtn(n)}</div>`).join('')}`).join('')}</details>`;
  E().wireTabs&&E().wireTabs(); BD.draw();
  document.querySelectorAll('#side .spadd').forEach(b=>b.addEventListener('click',()=>setTimeout(specView,0)));
  if(picks[0]&&BD.opp3d) BD.opp3d(picks[0]); else E().show3d&&E().show3d('model',{site:c.f}); }
BD.views=BD.views||{}; BD.views.spec=specView;

/* ---------- the report ---------- */
const CSS_R=`.rp2 h2.rg{font-size:12px;letter-spacing:.08em;color:var(--accent);margin:28px 0 8px;border-top:1px solid var(--line);padding-top:14px;font-weight:600}
.rp2 .rfig{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin:10px 0 16px}.rp2 .rfig div{border-left:2px solid var(--accent);padding:2px 10px}.rp2 .rfig b{display:block;font-size:17px;font-weight:600}.rp2 .rfig span{font-size:12px;color:var(--muted)}
.rp2 figure{margin:10px 0 16px}.rp2 figure.sheetfig svg{border:1px solid var(--line);border-radius:4px}.rp2 figcaption{font-size:12px;color:var(--muted);margin-top:4px}.rp2 dl{display:grid;grid-template-columns:minmax(120px,30%) 1fr;gap:6px 14px;margin:6px 0 12px}.rp2 dt{color:var(--muted)}.rp2 dd{margin:0}
.rp2 table.ropp{width:100%;border-collapse:collapse;font-size:13px}.rp2 table.ropp td,.rp2 table.ropp th{text-align:left;padding:5px 8px 5px 0;border-bottom:1px solid var(--line);vertical-align:top;font-weight:400}.rp2 table.ropp th{color:var(--muted)}.rp2 tr.party td{color:var(--accent);font-weight:600;padding-top:12px}
.rp2 .ropts{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}.rp2 .ropts>div{border:1px solid var(--line);border-radius:8px;padding:10px}
.spcard{border:1px solid var(--line);border-radius:10px;padding:12px 14px;margin:12px 0}.sph{display:flex;flex-wrap:wrap;gap:6px 12px;align-items:baseline}.sph h3{margin:0;font-size:16px;font-weight:600;text-transform:none;letter-spacing:0;color:var(--fg)}#wc .spdg{grid-template-columns:1fr}#wc .spdg>div:last-child{max-width:320px}
.spdg{display:grid;grid-template-columns:1.4fr 1fr;gap:12px;margin:10px 0}.spcols{display:grid;grid-template-columns:1fr 1fr;gap:16px}.spcols h4{margin:4px 0;font-size:13px;font-weight:600}.spcols ul{margin:4px 0;padding-left:18px;font-size:13px}
@media (max-width:700px){.spdg,.spcols{grid-template-columns:1fr}}.sprow{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid var(--line);font-size:13.5px}.spf{margin:14px 0 4px;font-size:13px}.btn.spadd.on{border-color:var(--accent);color:var(--accent-2)}.sprm{margin:-4px 0 14px}`;
{ const st=document.createElement('style'); st.textContent=CSS_R; document.head.appendChild(st); }
const NOTE_ORDER=[['fits','What fits'],['prec','Real buildings'],['heat','Heat'],['energy','Electricity'],['water','Water'],['materials','Materials'],['social','People'],['opts','Three options'],['time','Over time'],['cities','Two cities']];
async function build(pal){ const c=await ctx(); const D=BD.flow.reportData(); const picks=BD.spec.list();
  const fig={plan:planSVG(c.m,pal),section:sectionSVG(c.m,pal),heat:heatFlow(c,pal),power:powerFlow(c,pal),water:waterFlow(c,pal)};
  // the site sheets in the booklet's style (sheet.js); heat first, the others to follow once J.B. has seen it
  try{ fig.sheetHeat=BD.sheets?await BD.sheets.heatSheet():''; }catch(e){ console.warn(e); fig.sheetHeat=''; }
  const opts=D.tier==='resident'?[]:await optionsBlock(c,pal); const spec=picks.map(n=>({n,html:specCardHTML(c,n,pal),flow:specFlow(n,pal,c),plan:oppPlanSVG(c,n,pal),data:specData(c,n)}));
  const key=[['Servers',`${r1(c.mw)} MW`],['Largest that fits',BD.fitMax?`${(BD.fitMax()||0).toFixed(1)} MW`:''],['Power at the meter',rngT(c.r.fac[0],c.r.fac[1],'MW')],['Heat offered',c.rec?rngT(c.r.avail[0]/1000,c.r.avail[1]/1000,'GWh/yr'):'none recovered (air)']];
  // the step notes, by tier; "worked out from" goes to the appendix
  const items=[]; const appx=[]; for(const G of D.groups) for(const n of G.items){ if(['report','site','setup'].includes(n.k)) continue; items.push(Object.assign({},n,{grp:G.l}));
    for(const s of n.secs) if(s[2]&&s[2].length) appx.push([n.title+' · '+s[0],s[2].join(' · ')]); }
  // every opportunity in one clean table, from the data (not the captured text): family, name, how it stands here, how proven, what is missing
  const oppT=[]; for(const fm of BD.oppFams||[]) for(const n of (BD.oppFamList?BD.oppFamList(fm):[])){ const g=BD.oppGatesFor?BD.oppGatesFor(n):null; if(!g) continue; oppT.push([fm,n,GATEW[g.s]||'',READ[g.L.readiness]||'',((g.L.unknowns||[])[0]||'')]); }
  return {c,D,fig,opts,spec,key,items,appx,oppT}; }
function itemHTML(n){ return `<h3>${esc(n.title)}</h3>${n.lead?`<p>${esc(n.lead)}</p>`:''}${n.secs.length?`<dl>${n.secs.map(([t,a])=>`<dt>${esc(t)}</dt><dd>${esc(a)}</dd>`).join('')}</dl>`:''}${n.rows&&n.rows.length?`<ul>${n.rows.map(r=>`<li>${esc(r)}</li>`).join('')}</ul>`:''}`; }
function bodyHTML(B,forDoc){ const {D,fig,opts,spec,key,items,appx}=B; const byK=k=>items.filter(n=>n.k===k||n.k.startsWith(k+':'));
  const sec=(t,h)=>`<h2 class="rg">${esc(t)}</h2>${h}`;
  let h=`<div class="rfig">${key.map(([k,v])=>`<div><b>${esc(v)}</b><span>${esc(k)}</span></div>`).join('')}</div>`;
  h+=sec('The site',`<figure>${fig.plan}<figcaption>Plan. The lot, the setbacks (dashed), the data centre and its plant as the tool lays them out.</figcaption></figure><figure>${fig.section}<figcaption>Section. Storeys, roof plant and the zone's height limit.</figcaption></figure><dl>${D.facts.map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>${byK('fits').map(itemHTML).join('')}${byK('prec').map(itemHTML).join('')}`);
  h+=sec('Heat',`${fig.sheetHeat?`<figure class="sheetfig">${fig.sheetHeat}<figcaption>Site sheet 1, heat and cold: this lot as the tool models it.</figcaption></figure>`:''}<figure>${fig.heat}<figcaption>Heat: where it goes in this set-up.</figcaption></figure>${byK('heat').map(itemHTML).join('')}`);
  h+=sec('Electricity',`<figure>${fig.power}<figcaption>Power: from the grid to the servers.</figcaption></figure>${byK('energy').map(itemHTML).join('')}`);
  h+=sec('Water',`<figure>${fig.water}<figcaption>Water: in and out.</figcaption></figure>${byK('water').map(itemHTML).join('')}`);
  const rest=['materials','social'].flatMap(byK); if(rest.length) h+=sec('Materials and people',rest.map(itemHTML).join(''));
  if(B.oppT.length) h+=sec('Opportunities',`<p class="sub">Every opportunity the tool knows, tested on this lot. "Possible here" means every gate the tool can test passes; it is not a recommendation.</p><div class="tt"><table class="ropp"><thead><tr><th>Opportunity</th><th>Here</th><th>How proven</th><th>Not yet known</th></tr></thead><tbody>${B.oppT.map((r,i)=>`${i===0||B.oppT[i-1][0]!==r[0]?`<tr class="party"><td colspan="4">${esc(r[0])}</td></tr>`:''}<tr><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td><td class="sub">${esc(r[4])}</td></tr>`).join('')}</tbody></table></div>`);
  h+=sec('Could become (speculative)',spec.length?`<p class="sub">Proposals the reader chose to explore, not findings.</p>${spec.map(s=>s.html).join('')}`:'<p class="sub">No opportunities were chosen. Add them in the Could become step and they appear here, each with a diagram.</p>');
  if(opts.length) h+=sec('Three options',`<div class="ropts">${opts.map(({o,svg,miss})=>`<div><b>${esc(o.id.toUpperCase())}. ${esc(o.name)}</b><div>${svg}</div><p class="sub">${r1(o.mw)} MW · ${rngT(o.r.facMWh[0]/1000,o.r.facMWh[1]/1000,'GWh/yr')}${o.recover?' · heat offered '+rngT(o.r.avail[0]/1000,o.r.avail[1]/1000,'GWh/yr'):' · no heat recovered'}</p><p class="sub">Gains: ${esc(o.gives)}.${miss.length?` Does not fit at this size: ${esc(miss.join(' '))}`:''}</p></div>`).join('')}</div>${byK('opts').map(itemHTML).join('')}`);
  const tail=['time','cities'].flatMap(byK); if(tail.length) h+=sec('Over time and between cities',tail.map(itemHTML).join(''));
  if(D.left.length) h+=sec('Left out at this level',`<p class="sub">${esc(D.left.join(' · '))}. They still count in every result.</p>`);
  h+=sec('Read with',`<p class="sub">Ranges, not designs: screening figures from published sources, not a substitute for an engineer, a utility study or a permit review. Operator figures are claims. Heat offered is not heat used.</p>`);
  if(appx.length&&D.tier==='full') h+=sec('Appendix: what each result is worked out from',`<dl>${appx.map(([k,v])=>`<dt>${esc(k)}</dt><dd class="sub">${esc(v)}</dd>`).join('')}</dl>`);
  if(D.srcs.length) h+=forDoc?sec('Sources',D.srcs.map(s=>`<p class="sub">${esc(s)}</p>`).join('')):`<details class="fp"><summary>Sources (${D.srcs.length})</summary>${D.srcs.map(s=>`<p class="src">${esc(s)}</p>`).join('')}</details>`;
  return h; }
const RHEAD={resident:'What it would mean for you',community:'What it would mean for the neighbourhood',full:'How it is worked out'};
async function reportView(){ BD.flow.capture&&BD.flow.capture(); BD.S.view2='tab'; BD.S.tab='report'; BD.scene3d&&BD.scene3d.hide(); document.body.classList.add('wide');
  $('#side').innerHTML='<h2>Report</h2><p class="sub">Drawing the report…</p>'; const B=await build(PAL.screen); const D=B.D;
  $('#side').innerHTML=`<h2>Report</h2><p class="lead">${esc(RHEAD[D.tier])}: <span class="k">${esc(D.facts[0][1])}</span>.</p><p class="sub">Written for: ${esc(D.level)}. Change “Showing” above for another level.</p>
   <div class="rbtns">${BD.dl?`<button class="pri" id="rPdf">Download PDF</button><button class="sec" id="rHtml">Download web page</button>`:'<p class="sub">Downloads are not available in this view.</p>'}</div><p class="sub" id="rMsg"></p><div class="report rp2">${bodyHTML(B,false)}</div>`;
  BD.draw(); const msg=t=>{ const m=$('#rMsg'); if(m) m.textContent=t; };
  const hb=$('#rHtml'); if(hb) hb.onclick=async()=>{ try{ const P=await build(PAL.print); await BD.dl.save({filename:fname(D,'html'),data:new Blob([docHTML(P)],{type:'text/html'})}); msg('Saved.'); }catch(err){ msg(err&&err.code==='declined'?'Not saved.':'The page was not saved'+(err&&err.code?` (${err.code})`:'')+'.'); } };
  const pb=$('#rPdf'); if(pb) pb.onclick=async()=>{ pb.disabled=true; msg('Building the PDF…'); try{ const P=await build(PAL.print); const blob=await docPDF(P); await BD.dl.save({filename:fname(D,'pdf'),data:blob}); msg('Saved.'); }catch(err){ console.warn(err); msg(err&&err.code==='declined'?'Not saved.':'The PDF was not saved'+(err&&(err.code||err.message)?` (${err.code||err.message})`:'')+'.'); } finally{ pb.disabled=false; } }; }
BD.views.report=reportView;
const fname=(D,ext)=>`beyond-data-report-${D.facts[0][1].replace(/[^A-Za-z0-9]+/g,'-').toLowerCase().replace(/^-|-$/g,'')}.${ext}`;
function docHTML(B){ const D=B.D;
  return `<!doctype html><html lang="en-CA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Beyond Data report: ${esc(D.facts[0][1])}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap">
<style>:root{--fg:#222;--muted:#6b6b6b;--line:#e2e2e2;--accent:#CC746C;--accent-2:#b4554d}body{font-family:'Open Sans',Arial,sans-serif;font-weight:300;color:#222;background:#fff;max-width:860px;margin:40px auto;padding:0 24px;line-height:1.5;font-size:14px}
h1{font-weight:300;font-size:30px;margin:4px 0}h3{font-size:15px;font-weight:600;margin:18px 0 4px}.sub,.src{color:#6b6b6b;font-size:12.5px}.kick{font-size:11px;letter-spacing:.08em;color:#6b6b6b}ul{padding-left:18px}${CSS_R}@media print{h2,h3{break-after:avoid}figure,.spcard{break-inside:avoid}}</style></head><body>
<div class="kick">BEYOND DATA · ${esc(D.level.toUpperCase())} · ${D.date}</div><h1>${esc(D.facts[0][1])}</h1><p>${esc(RHEAD[D.tier])}.</p><div class="rp2">${bodyHTML(B,true)}</div></body></html>`; }

/* ---------- PDF: Open Sans embedded; diagrams drawn to images ---------- */
const LIB=['https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js','https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js'];
const load=src=>new Promise((ok,no)=>{ const s=document.createElement('script'); s.src=src; s.onload=ok; s.onerror=()=>no(new Error('could not load the PDF library')); document.head.appendChild(s); });
async function b64(url){ const b=await (await fetch(url)).arrayBuffer(); let s=''; const u=new Uint8Array(b); for(let i=0;i<u.length;i+=0x8000) s+=String.fromCharCode.apply(null,u.subarray(i,i+0x8000)); return btoa(s); }
function svgPNG(svg,wpx){ return new Promise((ok,no)=>{ const m=/viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg); const vw=+m[1], vh=+m[2]; const sc=wpx/vw;
  const s=svg.replace('width="100%"','').replace('<svg ',`<svg ${/xmlns=/.test(svg.slice(0,300))?'':'xmlns="http://www.w3.org/2000/svg" '}width="${vw*sc}" height="${vh*sc}" `);
  const img=new Image(); img.onload=()=>{ const cv=document.createElement('canvas'); cv.width=Math.round(vw*sc); cv.height=Math.round(vh*sc); const x=cv.getContext('2d'); x.fillStyle='#fff'; x.fillRect(0,0,cv.width,cv.height); x.drawImage(img,0,0,cv.width,cv.height); ok({url:cv.toDataURL('image/jpeg',0.88),ar:vh/vw}); };
  img.onerror=()=>no(new Error('a diagram could not be drawn')); img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s); }); }
const PMAP={'→':'to','←':'from','✓':'yes','✕':'no','›':'>','‹':'<'}; const T=t=>String(t||'').replace(/[→←✓✕›‹]/g,ch=>PMAP[ch]);
async function docPDF(B){ if(!window.jspdf) await load(LIB[0]); if(!window.jspdf.jsPDF.API.autoTable) await load(LIB[1]);
  const {jsPDF}=window.jspdf; const doc=new jsPDF({unit:'pt',format:'letter'});
  try{ const [l,sb]=await Promise.all([b64('fonts/OpenSans-Light.ttf'),b64('fonts/OpenSans-SemiBold.ttf')]); doc.addFileToVFS('OSL.ttf',l); doc.addFont('OSL.ttf','OpenSans','normal'); doc.addFileToVFS('OSB.ttf',sb); doc.addFont('OSB.ttf','OpenSans','bold'); }catch(e){ console.warn('font',e); }
  const FN=doc.getFontList().OpenSans?'OpenSans':'helvetica'; const {D}=B;
  const PW=doc.internal.pageSize.getWidth(), PH=doc.internal.pageSize.getHeight(), M=56, CW=PW-2*M; let y=M;
  const ink=[34,34,34], mute=[110,110,110], acc=[204,116,108], line=[226,226,226];
  const room=h=>{ if(y+h>PH-M){ doc.addPage(); y=M; } };
  const text=(t,o)=>{ o=o||{}; const sz=o.size||10; doc.setFont(FN,o.bold?'bold':'normal'); doc.setFontSize(sz); doc.setTextColor(...(o.color||ink)); const w=o.w||CW-(o.indent||0); const lines=doc.splitTextToSize(T(t),w); const lh=sz*1.42; for(const ln of lines){ room(lh); doc.text(ln,M+(o.indent||0),y+sz); y+=lh; } y+=o.after||0; };
  const head=t=>{ room(150); y+=10; doc.setDrawColor(...line); doc.setLineWidth(.6); doc.line(M,y,PW-M,y); y+=12; text(t,{size:11,bold:true,color:acc,after:6}); };
  const kv=rows=>{ if(!rows.length) return; doc.autoTable({body:rows.map(([k,v])=>[T(k),T(v)]),startY:y,margin:{left:M,right:M},theme:'plain',styles:{font:FN,fontSize:9,cellPadding:{top:3,bottom:3,left:0,right:8},textColor:ink,overflow:'linebreak'},columnStyles:{0:{cellWidth:150,textColor:mute}},didDrawCell:d=>{ if(d.section==='body'&&d.column.index===1){ doc.setDrawColor(...line); doc.setLineWidth(.4); doc.line(M,d.cell.y+d.cell.height,PW-M,d.cell.y+d.cell.height); } }}); y=doc.lastAutoTable.finalY+8; };
  const image=async(svg,cap,w)=>{ if(!svg) return; const im=await svgPNG(svg,1100); const ww=w||CW, hh=ww*im.ar; room(hh+20); doc.addImage(im.url,'JPEG',M,y,ww,hh); y+=hh+4; if(cap) text(cap,{size:8,color:mute,after:8}); };
  const item=n=>{ room(40); text(n.title,{size:11.5,bold:true,after:2}); if(n.lead) text(n.lead,{size:9.5,after:4}); kv(n.secs.map(([a,b])=>[a,b])); for(const r of n.rows||[]) text('–  '+r,{size:9,indent:6,after:1}); };
  const byK=k=>B.items.filter(n=>n.k===k||n.k.startsWith(k+':')); const sheetPages=new Set();
  // cover
  text(`BEYOND DATA  ·  ${D.level.toUpperCase()}  ·  ${D.date}`,{size:8,color:mute,after:8}); text(D.facts[0][1],{size:24,after:2}); text(RHEAD[D.tier],{size:11,color:mute,after:14});
  { const w=(CW-30)/4; B.key.forEach(([k,v],i)=>{ const x=M+i*(w+10); doc.setDrawColor(...acc); doc.setLineWidth(1.6); doc.line(x,y,x,y+34); doc.setFont(FN,'bold'); doc.setFontSize(12); doc.setTextColor(...ink); doc.text(doc.splitTextToSize(T(v),w-10)[0],x+8,y+13); doc.setFont(FN,'normal'); doc.setFontSize(8); doc.setTextColor(...mute); doc.text(T(k),x+8,y+28); }); y+=50; }
  await image(B.fig.plan,'Plan. The lot, the setbacks (dashed), the data centre and its plant as the tool lays them out.');
  head('THE SITE'); await image(B.fig.section,'Section. Storeys, roof plant and the zone\'s height limit.'); kv(D.facts); byK('fits').forEach(item); byK('prec').forEach(item);
  if(B.fig.sheetHeat){ const im=await svgPNG(B.fig.sheetHeat,1836); doc.addPage(); doc.addImage(im.url,'JPEG',0,0,PW,PW*im.ar); sheetPages.add(doc.getNumberOfPages()); doc.addPage(); y=M; }
  head('HEAT'); await image(B.fig.heat,'Heat: where it goes in this set-up.'); byK('heat').forEach(item);
  head('ELECTRICITY'); await image(B.fig.power,'Power: from the grid to the servers.'); byK('energy').forEach(item);
  head('WATER'); await image(B.fig.water,'Water: in and out.'); byK('water').forEach(item);
  const rest=['materials','social'].flatMap(byK); if(rest.length){ head('MATERIALS AND PEOPLE'); rest.forEach(item); }
  if(B.oppT.length){ head('OPPORTUNITIES'); text('Every opportunity the tool knows, tested on this lot. "Possible here" means every gate the tool can test passes; it is not a recommendation.',{size:8.5,color:mute,after:4});
    const body=[]; B.oppT.forEach((r,i)=>{ if(i===0||B.oppT[i-1][0]!==r[0]) body.push([{content:T(r[0]),colSpan:4,styles:{fontStyle:'bold',textColor:acc}}]); body.push([T(r[1]),T(r[2]),T(r[3]),T(r[4])]); });
    doc.autoTable({head:[['Opportunity','Here','How proven','Not yet known']],body,startY:y,margin:{left:M,right:M},theme:'plain',styles:{font:FN,fontSize:8.5,cellPadding:{top:3,bottom:3,left:0,right:6},textColor:ink},headStyles:{fontStyle:'bold',textColor:mute},columnStyles:{0:{cellWidth:150},1:{cellWidth:85},2:{cellWidth:75},3:{textColor:mute}}}); y=doc.lastAutoTable.finalY+10; }
  head('COULD BECOME (SPECULATIVE)');
  if(!B.spec.length) text('No opportunities were chosen. Add them in the Could become step and they appear here, each with a diagram.',{size:9.5,color:mute});
  for(const s of B.spec){ room(200); text(s.n,{size:13,bold:true,after:2}); text(`${GATEW[s.data.sum]||''} · ${READ[s.data.L.readiness]||'not yet rated'}`,{size:8.5,color:mute,after:6});
    const w1=CW*0.6, w2=CW*0.36; const a=await svgPNG(s.flow,1200), b=await svgPNG(s.plan,800); const hh=Math.max(w1*a.ar,w2*b.ar); room(hh+10); doc.addImage(a.url,'JPEG',M,y,w1,w1*a.ar); doc.addImage(b.url,'JPEG',M+CW-w2,y,w2,w2*b.ar); y+=hh+10;
    text('What it could offer',{size:9.5,bold:true,after:2}); if(s.data.offer.length) s.data.offer.forEach(x=>text('–  '+x,{size:9,indent:6,after:1})); else text('Not yet worked out here.',{size:9,color:mute});
    y+=4; text('What would have to be true',{size:9.5,bold:true,after:2}); if(s.data.need.length) s.data.need.forEach(([k,v])=>text(`–  ${k}: ${v}`,{size:9,indent:6,after:1})); else text('Every gate the tool can test passes.',{size:9,color:mute});
    if(s.data.L.basis) text('How proven: '+s.data.L.basis,{size:8.5,color:mute,after:10}); }
  if(B.opts.length){ const w=(CW-20)/3; const ims=await Promise.all(B.opts.map(x=>svgPNG(x.svg,700))); const hh=Math.max(...ims.map(im=>w*im.ar)); room(hh+150); head('THREE OPTIONS'); room(hh+90);
    const y0=y; B.opts.forEach(({o,miss},i)=>{ const x=M+i*(w+10); doc.addImage(ims[i].url,'JPEG',x,y0,w,w*ims[i].ar); let yy=y0+hh+12; const put=(t,o2)=>{ doc.setFont(FN,o2&&o2.bold?'bold':'normal'); doc.setFontSize(o2&&o2.size||8.5); doc.setTextColor(...(o2&&o2.color||ink)); for(const ln of doc.splitTextToSize(T(t),w)){ doc.text(ln,x,yy); yy+=11; } };
      put(`${o.id.toUpperCase()}. ${o.name}`,{bold:true,size:9.5}); put(`${r1(o.mw)} MW · ${rngT(o.r.facMWh[0]/1000,o.r.facMWh[1]/1000,'GWh/yr')}`); put(o.recover?'heat offered '+rngT(o.r.avail[0]/1000,o.r.avail[1]/1000,'GWh/yr'):'no heat recovered'); put('Gains: '+o.gives,{color:mute}); if(miss.length) put('Does not fit at this size: '+miss.join(' '),{color:acc}); y=Math.max(y,yy); });
    y+=8; byK('opts').forEach(item); }
  const tail=['time','cities'].flatMap(byK); if(tail.length){ head('OVER TIME AND BETWEEN CITIES'); tail.forEach(item); }
  if(D.left.length){ head('LEFT OUT AT THIS LEVEL'); text(D.left.join(' · ')+'. They still count in every result.',{size:9,color:mute}); }
  head('READ WITH'); text('Ranges, not designs: screening figures from published sources, not a substitute for an engineer, a utility study or a permit review. Operator figures are claims. Heat offered is not heat used.',{size:9,color:mute});
  if(B.appx.length&&D.tier==='full'){ doc.addPage(); y=M; text('APPENDIX: WHAT EACH RESULT IS WORKED OUT FROM',{size:11,bold:true,color:acc,after:8}); B.appx.forEach(([k,v])=>{ text(k,{size:8.5,bold:true,after:1}); text(v,{size:7.5,color:mute,after:5}); }); }
  if(D.srcs.length){ doc.addPage(); y=M; text('SOURCES',{size:11,bold:true,color:acc,after:8}); D.srcs.forEach(s=>text(s,{size:7.5,color:mute,after:3})); }
  const np=doc.getNumberOfPages(); for(let p=1;p<=np;p++){ if(sheetPages.has(p)) continue; doc.setPage(p); doc.setFont(FN,'normal'); doc.setFontSize(7.5); doc.setTextColor(...mute); doc.text(T(`Beyond Data · ${D.facts[0][1]}`),M,PH-28); doc.text(`${p} / ${np}`,PW-M,PH-28,{align:'right'}); }
  return doc.output('blob'); }
BD.report2={specData,specFlow,oppPlanSVG,planSVG,sectionSVG,flowSVG,heatFlow,powerFlow,waterFlow,build,docPDF,docHTML,PAL,SPEC};
})();
