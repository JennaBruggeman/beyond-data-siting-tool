/* Beyond Data — site sheets in the exchange-systems style (J.B., 20 Oct 2026: "use graphic diagramming to show how these things work (look at the
   GP-1 drawings…) Those are the quality of graphics we need"). Reference: the GP-1 booklet's exchange sheets (Sheet 1 Heat and cold, draft v15):
   ground #17181a, iso grid #30343a 0.25, buildings in dark greys edged #6b6964, equipment in warm browns edged #e9e6e1, heat amber #d1a35e and
   red #CC746C, cold #7fb2c4, control #585e6f; Open Sans Light; leaders to a conditions column; receivers as cards.
   Unlike the booklet's generic building, this draws THIS site from the tool's model: the lot, the data centre as sized, its roof and yard plant,
   the neighbours at their measured heights, and the tool's own figures. One letter page (612 × 792), as in the booklet. */
(function(){
'use strict';
const BD=window.BD; const {esc,fmt}=BD;
// v6 (19 Oct 2026, J.B.'s most recent booklet): paper, not dark; Barlow; heat in browns, cool in slate blue, notes in soft red
const K={bg:'#f3f0ea',grid:'#e3ded4',ink:'#1d1e20',mute:'#5f5d58',dim:'#9a978f',faint:'#b9b6ae',ctrl:'#768466',heat:'#9b7946',warm:'#c9ab7c',hot:'#c4766c',cold:'#5e8491',
 f1:'#e2ddd3',f2:'#ece8e0',f3:'#f8f6f1',n1:'#ddd8ce',n2:'#e4e0d7',n3:'#ebe7df',e1:'#d2c7b5',e2:'#ddd2c1',e3:'#ece4d4',g1:'#c9c5bc',g2:'#d4d0c8',g3:'#e2dfd8'};
const C=Math.cos(Math.PI/6), S=0.5;
const T=(x,y,t,o)=>{ o=o||{}; const L=Array.isArray(t)?t:[t]; return `<text x="${x.toFixed(2)}" y="${y.toFixed(2)}" font-size="${o.fs||7.5}" font-weight="${o.w||300}" fill="${o.c||K.ink}" ${o.a?`text-anchor="${o.a}"`:''} ${o.ls?`letter-spacing="${o.ls}"`:''} ${o.rot?`transform="rotate(${o.rot} ${x.toFixed(2)} ${y.toFixed(2)})"`:''} ${o.halo?`stroke="${K.bg}" stroke-width="3" stroke-linejoin="round" paint-order="stroke"`:''}>${L.map((l,i)=>`<tspan x="${x.toFixed(2)}" dy="${i?(o.fs||7.5)*1.32:0}">${esc(l)}</tspan>`).join('')}</text>`; };
function wrap(t,n){ const w=String(t||'').split(/\s+/), out=[]; let cur=''; for(const x of w){ if((cur+' '+x).trim().length>n&&cur){ out.push(cur); cur=x; } else cur=(cur+' '+x).trim(); } if(cur) out.push(cur); return out; }
const pts=a=>a.map(p=>p[0].toFixed(2)+','+p[1].toFixed(2)).join(' ');
const ring2=r=>{ const p=[]; for(let i=0;i<r.length;i+=2) p.push([r[i],r[i+1]]); return p; };
const area=p=>{ let s=0; for(let i=0;i<p.length;i++){ const a=p[i],b=p[(i+1)%p.length]; s+=a[0]*b[1]-b[0]*a[1]; } return s/2; };

/* the projection: local metres (u along the lot, v across, z up) to the page */
function proj(F,box,sc,ox,oy){ return (x,y,z)=>{ const [u,v]=F.toL(x,y); return [ox+(u-v)*C*sc, oy+(u+v)*S*sc-(z||0)*sc]; }; }
// an extruded footprint: walls that face the viewer, then the top; faces shaded as in the booklet
function prism(P,ring,z0,z1,st){ let p=ring2(ring); const F=BD.S&&BD.model&&BD.model().F; const loc=p.map(([x,y])=>F.toL(x,y)); if(area(loc)<0){ p=p.slice().reverse(); loc.reverse(); }
  let g=''; const walls=[];
  for(let i=0;i<p.length;i++){ const j=(i+1)%p.length, a=loc[i], b=loc[j]; const nx=b[1]-a[1], ny=-(b[0]-a[0]); const vis=nx+ny; if(vis<=0) continue; // faces +u+v: toward the viewer
    const q=[P(p[i][0],p[i][1],z0),P(p[j][0],p[j][1],z0),P(p[j][0],p[j][1],z1),P(p[i][0],p[i][1],z1)]; walls.push({d:(a[0]+a[1]+b[0]+b[1])/2,s:`<polygon points="${pts(q)}" fill="${nx>ny?st.r:st.l}" stroke="${st.e}" stroke-width="${st.w}" stroke-linejoin="round"/>`}); }
  walls.sort((a,b)=>a.d-b.d).forEach(w=>g+=w.s);
  g+=`<polygon points="${pts(p.map(([x,y])=>P(x,y,z1)))}" fill="${st.t}" stroke="${st.e}" stroke-width="${st.w}" stroke-linejoin="round"/>`; return g; }
const STY={nb:{l:K.n2,r:K.n1,t:K.n3,e:K.faint,w:0.25},dc:{l:K.f2,r:K.f1,t:K.f3,e:K.ink,w:0.55},eq:{l:K.e2,r:K.e1,t:K.e3,e:K.ink,w:0.45},gen:{l:K.g2,r:K.g1,t:K.g3,e:K.mute,w:0.4}};
// an iso circle (fan) on a horizontal plane
const fan=(P,x,y,z,r)=>{ const c=P(x,y,z); return `<ellipse cx="${c[0].toFixed(2)}" cy="${c[1].toFixed(2)}" rx="${(r*1.2247).toFixed(2)}" ry="${(r*0.7071).toFixed(2)}" fill="none" stroke="${K.ink}" stroke-width="0.25"/>`; };
const lead=(pts0,c)=>`<polyline points="${pts(pts0)}" fill="none" stroke="${c||K.dim}" stroke-width="0.35"/>`;
const dia=(x,y,c)=>`<polygon points="${x},${y-2.6} ${x+2.6},${y} ${x},${y+2.6} ${x-2.6},${y}" fill="none" stroke="${c||K.ink}" stroke-width="0.5"/>`;

/* the sheet */
async function heatSheet(){ const e=BD.eng, f=e.siteFacts(), A=BD.S.answers, m=BD.model(); if(!m||!m.F) return '';
  const R=e.R, mw=A.mw||m.mwSized||1, rec=(A.inside||'air')!=='air'; const d=await e.loadRecv(f.city); const near=e.nearby(f,d), nets=e.netsAt(f,d); const r=e.calc({mw,recover:rec,to:'near'},f,near,nets);
  const W=612, Hh=792, X0=36, X1=456, Y0=108, Y1=560; const F=m.F;
  // fit the lot (and a margin of neighbours) into the drawing area
  const lot=ring2(m.ring).map(([x,y])=>F.toL(x,y)); let a=1e9,b=-1e9,c=1e9,dd=-1e9; for(const [u,v] of lot){ const sx=(u-v)*C, sy=(u+v)*S; a=Math.min(a,sx); b=Math.max(b,sx); c=Math.min(c,sy); dd=Math.max(dd,sy); }
  const Hb=m.existing?(m.roofH||m.H):m.H, top=Hb+6; const sc=Math.min((X1-X0-120)/(b-a),(Y1-Y0-80)/((dd-c)+top));
  const ox=X0+60-a*sc, oy=Y0+40+top*sc-c*sc; const P=proj(F,null,sc,ox,oy);
  let g=`<rect width="${W}" height="${Hh}" fill="${K.bg}"/>`;
  // iso grid
  g+=`<clipPath id="sgc"><rect x="${X0}" y="${Y0}" width="${X1-X0}" height="${Y1-Y0}"/></clipPath><g clip-path="url(#sgc)" stroke="${K.grid}" stroke-width="0.4">`;
  for(let k=-60;k<80;k++){ const y=Y0-300+k*14; g+=`<line x1="${X0}" y1="${y}" x2="${X1}" y2="${y+(X1-X0)*Math.tan(Math.PI/6)}"/><line x1="${X0}" y1="${y+(X1-X0)*Math.tan(Math.PI/6)}" x2="${X1}" y2="${y}"/>`; }
  g+=`</g><g clip-path="url(#sgc)">`;
  // neighbours within reach of the drawing, at their measured heights; painter's order by depth
  const objs=[]; const tiles=Object.entries(BD.S.tiles||{}).filter(([k])=>k.startsWith(f.city+':')).map(([,t])=>t);
  for(const t of tiles) for(const bl of t.bld||[]){ const [cx,cy]=bl.c; const q=P(cx,cy,0); if(q[0]<X0-40||q[0]>X1+40||q[1]<Y0-40||q[1]>Y1+60) continue; if(BD.pip(cx,cy,m.ring)) continue; const h=Math.max(3,Math.min(bl.h||4,90)); const [u,v]=F.toL(cx,cy); objs.push({d:u+v,s:prism(P,bl.r,0,h,STY.nb)}); }
  // the lot on the ground: property line
  g+=`<polygon points="${pts(ring2(m.ring).map(([x,y])=>P(x,y,0)))}" fill="${K.bg}" stroke="${K.mute}" stroke-width="0.4" stroke-dasharray="5 1.5 1 1.5"/>`;
  if(m.inset) g+=`<polygon points="${pts(ring2(m.inset).map(([x,y])=>P(x,y,0)))}" fill="none" stroke="${K.faint}" stroke-width="0.3" stroke-dasharray="2 2"/>`;
  // loading bays on the ground
  for(const l of m.loadSpaces||[]) g+=`<polygon points="${pts(ring2(l).map(([x,y])=>P(x,y,0)))}" fill="none" stroke="${K.dim}" stroke-width="0.3"/>`;
  // the data centre, yard plant and generators; roof plant after the building
  const Bd=m.existing?m.foot:(m.sizedTo&&m.serverFoot?m.serverFoot:m.foot); const [bu,bv]=(()=>{ const q=ring2(Bd).map(([x,y])=>F.toL(x,y)); return [q.reduce((s,p)=>s+p[0],0)/q.length,q.reduce((s,p)=>s+p[1],0)/q.length]; })();
  objs.push({d:bu+bv,s:prism(P,Bd,0,Hb,STY.dc),main:true});
  const PL=m.plant||{boxes:[]}; const roof=[], anchors={};
  for(const bx of PL.boxes||[]){ const gen=/generator/.test(bx.name); const z0=bx.base||0, z1=z0+(bx.h||3); const q=ring2(bx.ring).map(([x,y])=>F.toL(x,y)); const du=q.reduce((s,p)=>s+p[0]+p[1],0)/q.length;
    let s=prism(P,bx.ring,z0,z1,gen?STY.gen:STY.eq);
    if(!gen){ // fans on top, as on the booklet's coolers
      const p=ring2(bx.ring); const L1=Math.hypot(p[1][0]-p[0][0],p[1][1]-p[0][1]), L2=Math.hypot(p[3][0]-p[0][0],p[3][1]-p[0][1]); const [A0,A1,Wd]=L1>=L2?[p[0],p[1],L2]:[p[0],p[3],L1]; const B3=L1>=L2?p[3]:p[1]; const L=Math.max(L1,L2), n=Math.max(1,Math.floor(L/(Wd*0.95)));
      for(let i=0;i<n;i++){ const t=(i+0.5)/n; const x=A0[0]+(A1[0]-A0[0])*t+(B3[0]-A0[0])/2, y=A0[1]+(A1[1]-A0[1])*t+(B3[1]-A0[1])/2; s+=fan(P,x,y,z1,Wd*0.36*sc); } }
    if(bx.kind==='roof') roof.push({d:du,s}); else objs.push({d:du,s});
    const c0=P(...(()=>{ const pp=ring2(bx.ring); return [pp.reduce((s,p)=>s+p[0],0)/pp.length,pp.reduce((s,p)=>s+p[1],0)/pp.length]; })(),z1); if(gen){ if(!anchors.gen||c0[1]<anchors.gen[1]) anchors.gen=c0; } else if(bx.kind==='roof'){ if(!anchors.roof||c0[0]>anchors.roof[0]) anchors.roof=c0; } else { if(!anchors.yard||c0[0]>anchors.yard[0]) anchors.yard=c0; } }
  objs.sort((p,q)=>p.d-q.d).forEach(o=>g+=o.s); roof.sort((p,q)=>p.d-q.d).forEach(o=>g+=o.s);
  // heat: with liquid cooling a twin pipe leaves the building toward the street (the front of the lot); with air, heat rises from the coolers
  const bq=ring2(Bd); const front=(()=>{ let best=null; for(const [x,y] of bq){ const [u,v]=F.toL(x,y); const s=u+v; if(!best||s>best.s) best={s,x,y}; } return best; })();
  const lotFront=(()=>{ let best=null; for(const [x,y] of ring2(m.ring)){ const [u,v]=F.toL(x,y); const s=u+v; if(!best||s>best.s) best={s,x,y}; } return best; })();
  let pipeLab=null;
  if(rec){ const p0=P(front.x,front.y,0.6), p1=P(lotFront.x,lotFront.y,0.6); const p2=[p1[0]+60*C,p1[1]+60*S];
    g+=`<polyline points="${pts([p0,p1,p2])}" fill="none" stroke="${K.heat}" stroke-width="1.3"/><polyline points="${pts([[p0[0]+2,p0[1]+1.2],[p1[0]+2,p1[1]+1.2],[p2[0]+2,p2[1]+1.2]])}" fill="none" stroke="${K.warm}" stroke-width="1"/>`;
    pipeLab=p1; anchors.pipe=p1; }
  else if(anchors.roof){ for(let i=0;i<3;i++){ const x=anchors.roof[0]-30+i*22, y=anchors.roof[1]-6; g+=`<path d="M${x},${y} q3,-6 0,-12 q-3,-6 0,-12" fill="none" stroke="${K.warm}" stroke-width="0.7"/>`; } }
  g+=`</g>`;
  // leaders and labels (right of the drawing, as in the booklet)
  const best=(()=>{ const n=BD.flow&&BD.flow.notes&&BD.flow.notes.heat; const s=n&&(n.secs||[]).find(x=>x[0]==='Best set-up found for heat'); return s?s[1]:''; })();
  const P_=PL.s||{}; const items=[];
  const top0=P(bq[0][0],bq[0][1],Hb); items.push({a:[top0[0],top0[1]],t:`Data centre, ${(+mw).toFixed(1)} MW of servers`,sub:`${m.nF?m.nF[0]:1} storey${(m.nF&&m.nF[0]>1)?'s':''}, ${Hb.toFixed(1)} m; ${rec?'liquid to the chip':'air-cooled'}`});
  if(anchors.roof) items.push({a:anchors.roof,t:`Roof plant: ${PL.placed?PL.placed.cr:''} ${P_.k?P_.k.name:''}`,sub:rec?'reject what is not recovered':'carry all the heat out to the air'});
  if(anchors.yard) items.push({a:anchors.yard,t:`Yard plant: ${PL.placed?PL.placed.cy:''} ${P_.k?P_.k.name:''}`});
  if(anchors.gen) items.push({a:anchors.gen,t:`Standby generators: ${P_.gN||0} of about ${P_.g?P_.g.mw:''} MW`,sub:'for outages; tested monthly'});
  if(anchors.pipe) items.push({a:anchors.pipe,t:'Twin pipe to buildings nearby',sub:best?wrap(best.replace(/\(.*$/,''),40).slice(0,2).join(' '):'',c:K.heat});
  if(!rec) items.push({a:[anchors.roof?anchors.roof[0]:X1-80,(anchors.roof?anchors.roof[1]:Y0+60)-34],t:'Heat to the air, about 25–35 °C',sub:'reusable only with heat pumps on the chilled-water loop: how much is not yet known',c:K.hot});
  items.sort((p,q)=>p.a[1]-q.a[1]); let ly=Y0+18; const LX=X1-108;
  for(const it of items){ ly=Math.max(ly,it.a[1]-4); const tl=wrap(it.t,30), sl=it.sub?wrap(it.sub,34).slice(0,3):[];
    g+=lead([[LX-2,ly-2.5],[Math.max(it.a[0]+6,LX-40),ly-2.5],[it.a[0],it.a[1]]],it.c);
    g+=T(LX,ly,tl,{c:it.c||K.ink,halo:true})+(sl.length?T(LX,ly+tl.length*9.9,sl,{fs:6,c:K.mute,halo:true}):''); ly+=tl.length*9.9+sl.length*8+12; }
  // conditions to investigate (right column), the tool's figures for this site
  const note=k=>{ const n=BD.flow&&BD.flow.notes&&BD.flow.notes.heat; const s=n&&(n.secs||[]).find(x=>x[0]===k); return s?s[1]:''; };
  const EC=BD.ECON||{}; const hv=EC.heatVal?EC.heatVal(f.city):null, pe=EC.elec?EC.elec[f.city]:null, cop=e.R.cop||[3,4.5];
  const worth=hv!=null&&pe!=null?`Heat worth $${(hv-pe/cop[0]).toFixed(1)}–${(hv-pe/cop[1]).toFixed(1)} per MWh`:'';
  const nn=(nets||[]).slice().sort((p,q)=>(p.edge||1e9)-(q.edge||1e9))[0]; const netT=nn?`${nn.n.replace(/ \(.*/,'')}, ${fmt(Math.round(nn.edge||0))} m`:'none in reach';
  const grid=e.R.grid?e.R.grid[f.city]:null, ECON=BD.ECON||{};
  const cond=[['TECHNICAL',[[rec?`Heat offered: ${fmt(r.avail[0]/1000)}–${fmt(r.avail[1]/1000)} GWh a year`:'Heat offered: not yet known (air-cooled)',rec?'after a heat pump, COP 3.0–4.5':'air-cooled heat leaves at about 25–35 °C'],[`Nearest heat network: ${netT}`,'']]],
   ['TEMPORAL',[[`Servers replaced every 5–6 years`,`the pipe lasts ${ECON.life?ECON.life.pipe:30} years; what feeds it after the tenant changes?`]]],
   ['ECONOMIC',[[worth||'Heat worth: not yet known','gas it replaces, less the heat pump\'s electricity'],...(best?[[best.split(':')[0],'best set-up found, middle case']]:[])]],
   ['REGULATORY',[[f.city==='van'?'Selling heat may need BCUC approval':'Selling heat: AUC rules for a utility','see the opportunity cards']]],
   ['ENVIRONMENTAL',[[grid!=null?`Grid ${grid} g CO₂e/kWh for the heat pump`:'Grid carbon','against the gas boiler it replaces']]]];
  const CX=X1+10; let cy=Y0+4; g+=T(CX,cy,['CONDITIONS TO','INVESTIGATE'],{fs:4.6,ls:'0.9',c:K.mute}); cy+=22;
  for(const [h,L] of cond){ g+=T(CX,cy,h,{fs:4.6,ls:'0.9',c:K.mute}); cy+=9; for(const [t,s2] of L){ const tl=wrap(t,26); g+=dia(CX+3,cy-2.4)+T(CX+9,cy,tl,{fs:6.3}); cy+=tl.length*8.3; if(s2){ const sl=wrap(s2,30); g+=T(CX+9,cy,sl,{fs:4.8,c:K.mute}); cy+=sl.length*6.4; } cy+=5; } cy+=6; }
  // possible receivers: the heat opportunities as tested here
  const fam=(BD.oppFamList?BD.oppFamList('Heat'):[]).map(n=>{ const q=BD.oppGatesFor?BD.oppGatesFor(n):null; return q?{n,s:q.s,rd:q.L.readiness,u:(q.L.unknowns||[])[0]||''}:null; }).filter(Boolean).filter(x=>x.s!=='no').slice(0,6);
  const RD={built_here:'BUILT HERE',built_elsewhere:'BUILT ELSEWHERE',pilot:'PILOT',speculative:'SPECULATIVE'}; const ST={yes:'possible here',chg:'possible with a change',nk:'not ruled out'};
  let ry=596; g+=T(X0,ry-10,'POSSIBLE RECEIVERS, TESTED ON THIS LOT',{fs:4.6,ls:'0.9',c:K.mute}); const cw=(W-2*X0-5*6)/6;
  fam.forEach((x,i)=>{ const cx=X0+i*(cw+6); g+=`<rect x="${cx}" y="${ry}" width="${cw}" height="62" fill="none" stroke="${K.dim}" stroke-width="0.35"/>`+T(cx+5,ry+11,wrap(x.n,20).slice(0,2),{fs:6.3})+T(cx+5,ry+33,RD[x.rd]||'NOT YET KNOWN',{fs:4.6,ls:'0.6',c:K.mute})+T(cx+5,ry+41,ST[x.s]||'',{fs:5,c:K.ink})+T(cx+5,ry+49,wrap(x.u,26).slice(0,2),{fs:4.6,c:K.mute}); });
  // title, header, key, sources
  g+=T(X0,62,'1',{fs:30,c:K.ink})+T(X0+26,57,'Heat and cold',{fs:17,w:600})+T(X0+26,72,rec?'Liquid-cooled: heat is caught at 35–40 °C, lifted by a heat pump and piped to buildings nearby':'Air-cooled: the heat is rejected to the air; reuse would need heat pumps on the chilled-water loop',{fs:7.5,c:K.hot});
  g+=`<line x1="${X0+26}" y1="80" x2="${X0+46}" y2="80" stroke="${K.heat}" stroke-width="1.6"/>`;
  g+=T(W-X0,44,'BEYOND DATA · SITE SHEETS',{fs:4.6,ls:'0.9',c:K.mute,a:'end'})+T(W-X0,52,`${(BD.S.sel.a&&BD.S.sel.a[0])||''} · ${f.city==='van'?'VANCOUVER':'EDMONTON'} · ${(+mw).toFixed(1)} MW · THIS SITE, TOOL FIGURES`.toUpperCase(),{fs:4.6,ls:'0.9',c:K.mute,a:'end'})+T(W-X0,60,new Date().toISOString().slice(0,10),{fs:4.6,ls:'0.9',c:K.mute,a:'end'});
  g+=`<line x1="${X0}" y1="92" x2="${W-X0}" y2="92" stroke="${K.dim}" stroke-width="0.35"/>`;
  const ky=690; g+=T(X0,ky,'KEY',{fs:4.6,ls:'0.9',c:K.mute});
  const keys=[[K.heat,'','hot, after the heat pump (supply)'],[K.warm,'','warm, return or to the air'],[K.mute,'5 1.5 1 1.5','property line'],[K.dim,'2 2','setbacks'],[K.ink,'','this data centre and its plant'],[K.dim,'','neighbours, measured heights']];
  keys.forEach(([c2,da,t],i)=>{ const x=X0+(i%3)*170, y=ky+10+Math.floor(i/3)*10; g+=`<line x1="${x}" y1="${y-2}" x2="${x+18}" y2="${y-2}" stroke="${c2}" stroke-width="0.8" ${da?`stroke-dasharray="${da}"`:''}/>`+T(x+24,y,t,{fs:5.5,c:K.mute}); });
  g+=T(X0,730,'SOURCES',{fs:4.6,ls:'0.9',c:K.mute})+T(X0,739,wrap('The tool\'s model of this lot (zoning, setbacks, plant sized from the load); neighbours: '+(f.city==='van'?'City of Vancouver building footprints, LiDAR 2022 heights':'City of Edmonton 3D buildings')+'; heat figures: the tool\'s engine and register (every source in the report\'s source list). Generic equipment, not a design.',150),{fs:4.8,c:K.mute});
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${Hh}" width="100%" font-family="Barlow, 'Open Sans', Arial, sans-serif" role="img" aria-label="Site sheet 1: heat and cold at this site">${await fontStyle()}${g}</svg>`; }
// Barlow, embedded in each sheet (Latin subsets), so it renders the same on screen, in the web page and inside the PDF
let FS=null; async function fontStyle(){ if(FS!==null) return FS; try{ const b=async n=>{ const a=new Uint8Array(await (await fetch('fonts/Barlow-'+n+'.sub.woff2')).arrayBuffer()); let s=''; for(let i=0;i<a.length;i+=0x8000) s+=String.fromCharCode.apply(null,a.subarray(i,i+0x8000)); return btoa(s); };
  const [l,r,sb]=await Promise.all([b('Light'),b('Regular'),b('SemiBold')]); FS=`<style>@font-face{font-family:Barlow;font-weight:300;src:url(data:font/woff2;base64,${l}) format('woff2')}@font-face{font-family:Barlow;font-weight:400;src:url(data:font/woff2;base64,${r}) format('woff2')}@font-face{font-family:Barlow;font-weight:600;src:url(data:font/woff2;base64,${sb}) format('woff2')}</style>`; }catch(e){ FS=''; } return FS; }
BD.sheets={heatSheet,K};
})();
