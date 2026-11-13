/* Beyond Data — F1 Architecture cards, group 'vis' (CODE_JOB_F1 step 2): 17 Heat flow, 18 Program diagram, 19 Drawing styles, 20 Compare.
   Registers its cards with BD.f1cards (see f1cards.js, f1arch.js). Every figure is read from the tool's functions (BD.archTest.budgets / rules / dcPieces,
   BD.plan.build, BD.eng via budgets) for the example lot; plans, sections and the exploded view are drawn here from the placement P (read-only use).
   10 Nov 2026: with the Emergency hub, areas, MW, plans, sections and the exploded view come from the hub's layout (hub.js, rule sheet v1; C.v1, C.budgetsV1). */
(function(){
'use strict';
const BD=window.BD, C=BD.f1cards, K=C.K, esc=C.esc, T='architecture', n0=C.n0, n1=C.n1, q=C.q;
const CHIP='Draft plan · rule sheet v1', FONT='IBM Plex Sans,system-ui,sans-serif';
if(!document.getElementById('f1c-vis')){ const st=document.createElement('style'); st.id='f1c-vis';
  st.textContent=`.f1c-vis-sty{width:100%;min-height:560px;justify-content:flex-start;display:flex;flex-direction:column;align-items:center;gap:14px}
.f1c-vis-sw{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.f1c-vis-sw button{font:12.5px ${FONT};border:1px solid ${K.rule};border-radius:999px;padding:6px 12px;background:#fff;color:${K.ink2};cursor:pointer}
.f1c-vis-sw button[aria-pressed="true"]{background:${K.ink};color:#fff;border-color:${K.ink}}
.f1c-vis-sty [data-pane][hidden]{display:none!important}
.f1c-vis-sty svg{max-width:100%;height:auto}
.f1c-vis-q{font-size:13px;color:${K.ink2};text-align:center;padding:60px 20px}`; document.head.appendChild(st); }
const rg=(a,u)=>a?`${n0(a[0])===n0(a[1])?n0(a[0]):n0(a[0])+'–'+n0(a[1])}${u?' '+u:''}`:'?';   /* H35: equal ends print once */
const rg1=(a,u)=>a?(a[0]===a[1]?n1(a[0]):`${n1(a[0])}–${n1(a[1])}`)+(u?' '+u:''):'?';
const rgG=a=>a?`${n1(a[0]/1000)}–${n1(a[1]/1000)}`:'?';
const short=n=>String(n).split(' (')[0];
let CID=0; const FAMC={hall:K.fillHall,sup:K.fillSup,pub:K.fillPub,clin:K.fillClin};
const mix=(hex,t)=>{ const c=[1,3,5].map(i=>parseInt(hex.substr(i,2),16)); return '#'+c.map(v=>Math.round(v*(1-t)+22*t).toString(16).padStart(2,'0')).join(''); };
const fits=(t,w,h,fs)=>String(t).length*fs*0.56+8<=w&&h>=fs+5;
const pip=(x,y,p)=>{ let c=false; for(let i=0,j=p.length-1;i<p.length;j=i++){ if(((p[i][1]>y)!==(p[j][1]>y))&&(x<(p[j][0]-p[i][0])*(y-p[i][1])/(p[j][1]-p[i][1])+p[i][0])) c=!c; } return c; };

/* ---- geometry from the placement P: every block as (d depth from the street, x across, street at the bottom of a plan, x as seen from the street) ---- */
function geom(P){ const s=P.s, F=s.F, dir=s.dir<0?-1:1, D=u=>dir<0?u-s.uf:s.uf-u, X=v=>dir<0?-v:v;
  const toDX=ring=>{ const o=[]; for(let i=0;i<ring.length;i+=2){ const [u,v]=F.toL(ring[i],ring[i+1]); o.push([D(u),X(v)]); } return o; };
  const bb=pts=>({d0:Math.min(...pts.map(p=>p[0])),d1:Math.max(...pts.map(p=>p[0])),x0:Math.min(...pts.map(p=>p[1])),x1:Math.max(...pts.map(p=>p[1]))});
  const items=[], DP=BD.archTest.dcPieces?BD.archTest.dcPieces(P):null;
  if(DP&&DP.out) DP.out.forEach(b=>{ const pts=toDX(b.ring); items.push(Object.assign({id:b.id,grp:b.hall?'hall':'dcs',name:b.hall?'Data hall':b.name,fam:b.hall?'hall':'sup',z:b.base,h:b.h,m2:b.m2,pts},bb(pts))); });
  else { const pts=toDX(P.hall.ring); items.push(Object.assign({id:'hall',grp:'hall',name:'Data hall',fam:'hall',z:P.hall.base,h:P.hall.h,pts},bb(pts))); }
  (P.boxes||[]).forEach(b=>{ const pts=toDX(b.ring), n=b.storeys||1, sh=b.sh||(b.h/n), fam=b.id==='clinic'?'clin':'pub';
    for(let k=0;k<n;k++) items.push(Object.assign({id:b.id,grp:b.id,name:short(b.p.name),fam,z:b.base+k*sh,h:sh,k,n,m2:b.q&&b.q.m2,pts},bb(pts))); });
  const lot=toDX(s.M.ring), lotb=bb(lot), ib=bb(items.reduce((a,i)=>a.concat(i.pts),[])), pad=3, lb={d0:ib.d0-pad,d1:ib.d1+pad,x0:ib.x0-pad,x1:ib.x1+pad};
  const plant=((s.M.plant&&s.M.plant.boxes)||[]).filter(b=>b.kind!=='roof'&&b.ring).map(b=>({pts:toDX(b.ring),name:b.name}));
  const yard=s.M.plant&&s.M.plant.yard&&BD.geo&&BD.geo.clip?BD.geo.clip(s.M.ring,s.M.plant.yard):null;
  const levels=[...new Set(items.map(i=>Math.round(i.z*10)/10))].sort((a,b)=>a-b);
  const hMax=Math.max(s.H||0,...items.map(i=>i.z+i.h));
  return {s,items,lot,lb,lotb,plant,yard:yard&&yard.length>=6?toDX(yard):null,levels,hMax,dir}; }
/* ---- the same geometry from the Emergency hub's layout (hub.js, rule sheet v1; 10 Nov 2026): every room, corridor, stair and lift on its storey,
   at the storey's floor level and height; plant from the hub's own plant layout. Groups: data hall, data-centre support (and unassigned floor),
   refuge, warming shelter, clinic, other hub rooms (lobby, washrooms, service) ---- */
function grpOf(r){ const b=r.block, id=String(r.id||'');
  if(b==='data centre') return id==='hall'?['hall','Data hall','hall']:['dcs',short(r.name||'Data-centre support'),'sup'];
  if(b==='clinic') return ['clinic','Clinic','clin']; if(b==='spare') return ['dcs','Unassigned floor','sup'];
  if(/^ref/.test(id)) return ['refuge','Refuge','pub']; if(/^shel/.test(id)) return ['warming_shelter','Warming shelter','pub']; return ['hub','Hub rooms','pub']; }
function geomV1(P,V){ const s=P.s, dir=s.dir<0?-1:1, D=u=>dir<0?u-s.uf:s.uf-u, X=v=>dir<0?-v:v, F=s.F;
  const toDX=ring=>{ const o=[]; for(let i=0;i<ring.length;i+=2){ const [u,v]=F.toL(ring[i],ring[i+1]); o.push([D(u),X(v)]); } return o; };
  const rectDX=r=>[[D(r[0]),X(r[2])],[D(r[1]),X(r[2])],[D(r[1]),X(r[3])],[D(r[0]),X(r[3])]];
  const bb=pts=>({d0:Math.min(...pts.map(p=>p[0])),d1:Math.max(...pts.map(p=>p[0])),x0:Math.min(...pts.map(p=>p[1])),x1:Math.max(...pts.map(p=>p[1]))});
  const L=V.L, items=[];
  V.storeys.forEach((S,i)=>{ const h=L.H[i]; [].concat(S.rooms||[],S.corridors||[],S.stairs||[],S.lifts||[]).forEach(r=>{ if(!r.rect) return; const [grp,name,fam]=grpOf(r), pts=rectDX(r.rect);
    items.push(Object.assign({id:grp,grp,name,fam,z:S.z,h,m2:(r.rect[1]-r.rect[0])*(r.rect[3]-r.rect[2]),pts,room:r.id},bb(pts))); }); });
  const lot=toDX(s.M.ring), lotb=bb(lot), ib=bb(items.reduce((a,i)=>a.concat(i.pts),[])), pad=3, lb={d0:Math.min(ib.d0-pad,-1),d1:ib.d1+pad,x0:ib.x0-pad,x1:ib.x1+pad};   /* from the front yard line (d 0), so a front yard shows as open ground before the building */
  const plant=((L.plant&&L.plant.items)||[]).filter(it=>!it.pseudo&&!it.roof&&it.rect).map(it=>({pts:rectDX(it.rect),name:it.n}));
  const levels=[...new Set(items.map(i=>Math.round(i.z*10)/10))].sort((a,b)=>a-b);
  const hMax=Math.max(s.H||0,...items.map(i=>i.z+i.h));
  return {s,items,lot,lb,lotb,plant,yard:null,levels,hMax,dir,v1:true}; }
/* the cards' geometry: the hub's layout where the typology is the Emergency hub, else Arrange's placement */
const G1=P=>{ const V=C.v1(P); return V?geomV1(P,V):geom(P); };
const atLevel=(G,z)=>G.items.filter(i=>i.z<=z+0.01&&z<i.z+i.h-0.01);
const flagIds=P=>{ const rs=BD.archTest.rules(P), m={}; rs.forEach(r=>{ if(r.sev==='q'&&r.id) m[r.id]=(m[r.id]||0)+1; }); return m; };

/* ---- leaders to a side label: one straight horizontal line, never across another block (STYLE.md 6, rules 8-10); returns null where none fits ---- */
function solveLeaders(polys,wants,xRight,gap,xLeft){ const used=[], out=[]; const hitAt=(list,x,y)=>list.some(o=>pip(x,y,o.pts)||pip(x,y-2,o.pts)||pip(x,y+2,o.pts));
  wants.slice(0,4).forEach(w=>{ const own=polys.filter(p=>p.o===w.o); if(!own.length) return; let done=false;
    for(const side of (xLeft==null?['R']:['R','L'])){ for(const fr of [0.5,0.3,0.7,0.15,0.85,0.4,0.6]){ for(const p of own){ const ys=p.pts.map(a=>a[1]), y=Math.min(...ys)+(Math.max(...ys)-Math.min(...ys))*fr;
        if(used.some(u=>Math.abs(u-y)<(gap||30))) continue; const oth=polys.filter(o=>o!==p); const x0=Math.min(...p.pts.map(a=>a[0])), x1=Math.max(...p.pts.map(a=>a[0])); let ax=null;
        if(side==='R'){ for(let x=x1;x>=x0;x-=0.5) if(pip(x,y,p.pts)){ ax=x; break; } } else { for(let x=x0;x<=x1;x+=0.5) if(pip(x,y,p.pts)){ ax=x; break; } }
        if(ax==null) continue; let clear=true;
        if(side==='R'){ for(let x=ax+1.5;x<xRight;x+=1.5) if(hitAt(oth,x,y)){ clear=false; break; } } else { for(let x=ax-1.5;x>xLeft;x-=1.5) if(hitAt(oth,x,y)){ clear=false; break; } }
        if(clear){ out.push({w,x:ax,y,side}); used.push(y); done=true; break; } } if(done) break; } if(done) break; } });
  return out; }
const leaderSvg=(L,xRight,xLeft)=>L.map(l=>{ const R=l.side!=='L', xe=R?xRight:xLeft, tx=R?xRight+6:xLeft-6, an=R?'start':'end'; return `<circle cx="${l.x.toFixed(1)}" cy="${l.y.toFixed(1)}" r="2" fill="${K.ink}"/><line x1="${l.x.toFixed(1)}" y1="${l.y.toFixed(1)}" x2="${xe}" y2="${l.y.toFixed(1)}" stroke="${K.ink}" stroke-width="0.5"/>
 <text x="${tx}" y="${(l.y-1).toFixed(1)}" text-anchor="${an}" font-size="13" fill="${K.ink}">${esc(l.w.t)}</text>${l.w.d?`<text x="${tx}" y="${(l.y+14).toFixed(1)}" text-anchor="${an}" font-size="11.5" fill="${l.w.red?K.red:K.mute}">${esc(l.w.d)}</text>`:''}`; }).join('');

/* ---- section: the blocks cut by one plane across the lot (the plane that cuts the most blocks), flat tints, no outlines ---- */
function pickCut(G){ const xs=[]; G.items.forEach(i=>{ xs.push(i.x0,i.x1,(i.x0+i.x1)/2); });
  let best=null; xs.forEach(x=>{ const cut=G.items.filter(i=>i.x0-0.5<=x&&x<=i.x1+0.5), g=new Set(cut.map(i=>i.grp)), sc=g.size*1e6+cut.reduce((t,i)=>t+i.h,0); if(!best||sc>best.sc) best={x,sc,cut,g}; });
  return best; }
function section(G,o){ const W=o.W, Hh=o.H, pL=14+(o.labL||0), pR=o.lab||0, pT=20, pB=30, d0=G.lb.d0, d1=G.lb.d1, k=Math.min((W-pL-pR)/(d1-d0),(Hh-pT-pB)/G.hMax), SX=d=>pL+(d-d0)*k, SY=z=>Hh-pB-z*k;
  const cut=pickCut(G), polys=[]; let svg=''; cut.cut.sort((a,b)=>(b.x0+b.x1)-(a.x0+a.x1)); /* far first: the viewer stands on the low-x side */
  const hallBig=cut.cut.filter(i=>i.fam==='hall').sort((a,b)=>(b.d1-b.d0)*b.h-(a.d1-a.d0)*a.h)[0], named=new Set(), names=[], wants=[];
  cut.cut.forEach(i=>{ const x=SX(i.d0)+0.75, y=SY(i.z+i.h)+0.75, w=(i.d1-i.d0)*k-1.5, h=i.h*k-1.5; svg+=`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="${FAMC[i.fam]}"/>`;
    polys.push({o:i.grp,pts:[[x,y],[x+w,y],[x+w,y+h],[x,y+h]]}); i._r=[x,y,w,h]; });
  /* names inside where they fit; where they do not, the name goes off the drawing on a leader (at most four, flags first) */
  const fl=o.flags||{}; const seen=new Set(); const vis=i=>{ let [x,y,w,h]=i._r, iv=[[x,x+w]]; cut.cut.slice(cut.cut.indexOf(i)+1).forEach(j=>{ if(Math.min(i.z+i.h,j.z+j.h)-Math.max(i.z,j.z)<=0.01) return; const a=j._r[0], b=j._r[0]+j._r[2]; iv=iv.flatMap(([p,q2])=>b<=p||a>=q2?[[p,q2]]:[[p,Math.max(p,a)],[Math.min(q2,b),q2]].filter(r=>r[1]-r[0]>0.5)); }); iv.sort((a,b)=>(b[1]-b[0])-(a[1]-a[0])); return iv.length?[iv[0][0],y,iv[0][1]-iv[0][0],h]:[x,y,w,h]; };
  cut.cut.slice().sort((a,b)=>(b.d1-b.d0)*b.h-(a.d1-a.d0)*a.h).forEach(i=>{ const key=i.grp==='dcs'?null:i.grp; if(!key||seen.has(key)) return; seen.add(key);
    if(o.noNames||(o.flagWants||[]).some(f=>f.o===i.grp)) return; const [x,y,w,h]=vis(i); const flagged=fl[i.id]&&i.grp!=='dc'; const want=(o.leaderFor&&o.leaderFor(i))||null;
    if(want){ wants.push(Object.assign({o:i.grp},want)); return; }
    if(fits(i.name,w,h,13)) svg+=`<text x="${(x+w/2).toFixed(1)}" y="${(y+h/2+4.5).toFixed(1)}" text-anchor="middle" font-size="13" fill="${K.ink}">${esc(i.name)}</text>`;
    else wants.push({o:i.grp,t:i.name,d:flagged?'to check (?)':'',red:!!flagged}); });
  if(o.flagWants) o.flagWants.forEach(f=>wants.unshift(f));
  const ground=`<line x1="${SX(d0)}" y1="${SY(0)}" x2="${SX(d1)}" y2="${SY(0)}" stroke="${K.ink}" stroke-width="1.8"/><text x="${SX(d0)}" y="${SY(0)+16}" font-size="11.5" fill="${K.mute}">street</text>`;
  const lim=G.s.H?`<line x1="${SX(d0)}" y1="${SY(G.s.H)}" x2="${SX(d1)}" y2="${SY(G.s.H)}" stroke="${K.faint}" stroke-width="0.8" stroke-dasharray="5 3"/><text x="${SX(d1)}" y="${SY(G.s.H)-5}" text-anchor="end" font-size="11.5" fill="${K.mute}">height limit ${n1(G.s.H)} m</text>`:'';
  const sb=C.scaleBar(SX(d1)-10*k-4,Hh-pB+14,10,k,'10 m');
  const lead=solveLeaders(polys,wants,W-pR+14,o.gap,o.labL?o.labL-6:null); const placed=new Set(lead.map(l=>l.w.o+'|'+l.w.t));
  const off=wants.filter(w=>!placed.has(w.o+'|'+w.t)).map(w=>w.t);
  const gutter=(o.lab?`<g>${leaderSvg(lead,W-pR+14,o.labL?o.labL-6:null)}</g>`:'');
  return {svg:`${svg}${lim}${ground}${gutter}<g transform="translate(0,0)">${''}</g>`,scale:sb,k,cut,off,lead,hMax:G.hMax,SX,SY,polys}; }

/* ---- plan of one storey (or the whole site), street at the bottom ---- */
function plan(G,o){ let lb=G.lb; if(o.plant){ const ps=G.plant.reduce((a,b)=>a.concat(b.pts),[]).concat(G.yard||[]); if(ps.length) lb={d0:Math.min(lb.d0,...ps.map(p=>p[0])),d1:Math.max(lb.d1,...ps.map(p=>p[0])),x0:Math.min(lb.x0,...ps.map(p=>p[1])),x1:Math.max(lb.x1,...ps.map(p=>p[1]))}; }
  const w=o.w, h=o.h, k=Math.min((w-8)/(lb.x1-lb.x0),(h-8)/(lb.d1-lb.d0)), ox=(w-(lb.x1-lb.x0)*k)/2, SXp=x=>ox+(x-lb.x0)*k, SYp=d=>h-4-(d-lb.d0)*k;
  const path=pts=>pts.map((p,i)=>(i?'L':'M')+SXp(p[1]).toFixed(1)+' '+SYp(p[0]).toFixed(1)).join('')+'Z';
  const cid='f1cvp'+(++CID); let s=`<defs><clipPath id="${cid}"><rect x="0" y="0" width="${w}" height="${h}"/></clipPath></defs><rect x="0" y="0" width="${w}" height="${h}" fill="${K.panel}"/><path d="${path(G.lot)}" fill="#fff" stroke="${K.mute}" stroke-width="0.6" clip-path="url(#${cid})"/>`;
  if(o.plant){ if(G.yard) s+=`<path d="${path(G.yard)}" fill="${K.plant}"/>`; G.plant.forEach(b=>{ s+=`<path d="${path(b.pts)}" fill="${K.plant}"/>`; }); }
  const seen=new Set(); o.items.slice().sort((a,b)=>a.z-b.z).forEach(i=>{ s+=`<path d="${path(i.pts)}" fill="${FAMC[i.fam]}"/>`; });
  const hi=o.items.slice().sort((a,b)=>b.z-a.z);
  hi.forEach(i=>{ const key=i.grp==='dcs'?null:i.grp; if(!key||seen.has(key)||o.noNames) return; const cx=(i.x0+i.x1)/2, cd=(i.d0+i.d1)/2; if(hi.some(j=>j.z>i.z+0.01&&j.grp!==i.grp&&j.x0<=cx&&cx<=j.x1&&j.d0<=cd&&cd<=j.d1)) return; const x=SXp(i.x0), y=SYp(i.d1), bw=(i.x1-i.x0)*k, bh=(i.d1-i.d0)*k; if(fits(i.name,bw,bh,o.fs||11.5)){ seen.add(key); s+=`<text x="${(x+bw/2).toFixed(1)}" y="${(y+bh/2+4).toFixed(1)}" text-anchor="middle" font-size="${o.fs||11.5}" fill="${K.ink}">${esc(i.name)}</text>`; } });
  return {svg:s,k,SXp,SYp}; }
const keyHtml=(fams,extra)=>{ const N={hall:'Data hall',sup:'Data-centre support and dock',pub:'Public programs (refuge, shelter)',clin:'Clinic'}; return `<div class="f1c-key">${fams.map(f=>`<span><i style="background:${FAMC[f]};border-color:${FAMC[f]}"></i>${N[f]}</span>`).join('')}${extra||''}</div>`; };
const famsOf=G=>['hall','sup','pub','clin'].filter(f=>G.items.some(i=>i.fam===f));
const noP=()=>({draw:'<p class="f1v-empty">No lot loaded.</p>'});
const isN=a=>a&&isFinite(a[0])&&isFinite(a[1]);

/* ================= 17 Heat flow ================= */
C.add(T,'Heat flow',{chip:CHIP,async build(x){ const P=await x.arch(); if(!P) return noP(); const V=C.v1(P), G=G1(P), B=C.budgetsV1(P), h=B.heat, av=isN(h.avail)?h.avail:null, need=h.need, mwSized=V?V.MW:P.s.M.mwSized;
  /* A section (J.B. 12 Nov 2026): the report's energy-exchange graphic (f1plans.js energy, port of reports/report_arch.py p_energy) for the hub */
  if(V&&V.L&&V.L.G&&BD.f1plans){ const E=BD.f1plans.energy(V.L,x.city); if(E){ const g=BD.f1plans.energySvg(E,x.city), n0x=v=>Math.round(v).toLocaleString('en-CA');
    return {draw:`<div class="f1p-set">${g.svg}<p class="f1c-note" style="font-size:11px">Band widths show shares; the in-building band is drawn wider than its share so it can be seen. ${(BD.S.answers.inside||'air')==='air'?'Air-cooled hall (decisions log, option A).':''}</p>${g.seasons?`<h4 style="font-weight:400;margin:14px 0 4px">When it is needed</h4>${g.seasons}`:'<p class="f1c-note">When it is needed: Vancouver season shares only; Edmonton ?</p>'}</div>`,
      lead:`The data hall makes heat all year; the hub needs it mostly in winter. A heat pump lifts the hall’s warm water to building temperature for the public rooms and the data centre’s own staff rooms: ${E.share[0].toFixed(1)}–${E.share[1].toFixed(1)} % of the hall’s heat. The rest is for neighbours.`,
      hero:[{v:`${E.share[0].toFixed(1)}–${E.share[1].toFixed(1)}`,u:'%',l:'of the hall’s heat used in the building'},{v:n0x(E.dem),u:'MWh/yr',l:'heat the building needs'}],
      rows:[['Hall heat',`${n0x(E.av[0])}–${n0x(E.av[1])} MWh/yr (${E.mw.toFixed(2)} MW of servers × 8,760 h × load 0.4–0.6: their energy is the hall’s heat)`],['Hub rooms and staff rooms',`${n0x(E.dem)} MWh/yr (floor × CEUD 2023 heating intensity; staff rooms ${n0x(E.acc)} m²)`],
        ['Heat pump',`COP ${E.cop[0]}–${E.cop[1]}; electricity ${n0x(E.hp[0])}–${n0x(E.hp[1])} MWh/yr${E.peak?`; about ${n0x(E.peak)} kW peak`:'; peak ? (Vancouver ratio only)'}`],['For neighbours',`${(100-E.share[1]).toFixed(1)}–${(100-E.share[0]).toFixed(1)} % of the hall’s heat (potential external receivers: Engineering)`],
        ['Equipment','heat pump in a heat-recovery room ≥ 17 m², ≥ 3.0 m wide (hub spec D4); plate heat exchanger; buffer tank; pumps and pipes']],
      src:['Graphic: the energy page of the Architecture report (page 5), drawn from this layout.','Heat need: floor area × CEUD 2023 heating intensity, register receiver_demand ('+(x.city==='edm'?'Alberta 1.40, health care 2.348':'BC 0.57, health care 1.096')+' GJ/m²); data-centre staff rooms (dock, vestibule, secure corridor, NOC, offices, break room, WCs, janitor, staging) at the overall intensity (J.B. 12 Nov 2026; our reading).','Hall heat: the servers’ energy, MW × 8,760 h × load 0.4–0.6 (engine.js R.lfR, register load_factor). COP: register cop (3–4.5).','Seasons (47 / 50.5 / 2.5 %) and the 3.16 peak ratio: Vancouver (CWEC weather file (Canadian Weather for Energy Calculations); degree days, our arithmetic).'],missing:x.city==='edm'?['Edmonton season shares and peak ratio']:[]}; } }
  const used=need, left=av?[av[0]-need[1],av[1]-need[0]]:null, inside=(BD.S.answers.inside||'air')==='air', hallT=BD.data.arch&&BD.data.arch.dcTemp?BD.data.arch.dcTemp[inside?'air':'liquid']:null;
  const tmp=p=>{ const t=p&&p.heat; return t&&t.supply_C?{s:`supply ${rg(t.supply_C,'°C')}`,hi:t.supply_C[1]}:t&&t.setpoint_C?{s:`room ${rg(t.setpoint_C,'°C')}`,hi:t.setpoint_C[1]}:{s:null,hi:-1}; };
  /* the drawing: a section with the hall and the programs, then the heat on one scale, then the programs hot to cool */
  const W=960, SH=230, sec=section(G,{W,H:SH,lab:230,labL:200,gap:34,flags:{},noNames:true,
    flagWants:[{o:'hall',t:'Data hall',d:hallT?`${rg(hallT,'°C')} ${inside?'air-cooled':'liquid-cooled'} (heat_temp)`:'heat temperature ?',red:!hallT}].concat(
      (P.boxes||[]).map(b=>{ const t=tmp(b.p); return {o:b.id,t:short(b.p.name),d:t.s||'temperature ?',red:!t.s}; }))});
  const bx=40, bw=560, mx=av?av[1]:1, X=v=>bw*v/mx; let y=SH+36, bars='';
  const row=(lab,total,use,ok)=>{ const wU=Math.max(1.5,X(use)), wT=X(total);
    let r=`<text x="${bx}" y="${y-8}" font-size="11.5" fill="${K.mute}">${lab}</text><rect x="${bx}" y="${y}" width="${wT.toFixed(1)}" height="22" fill="${K.dcSup}"/>`; let cx=bx;
    h.items.forEach(it=>{ const w=Math.max(1.5,X(ok?it.mwh[1]:it.mwh[0])); r+=`<rect x="${cx.toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="22" fill="${it.id==='clinic'?K.clin:K.pub}"/>`; cx+=w; });
    r+=`<text x="${bx+bw+12}" y="${y+15}" font-size="13" fill="${K.ink}">${n0(total)} MWh/yr</text>`; return r; };
  let rowsSvg='';
  if(av){ y=SH+44; rowsSvg+=`<text x="${bx}" y="${SH+18}" font-size="15" fill="${K.ink}">Where the heat goes</text>`;
    rowsSvg+=row('Low end of the range: heat offered, and the most the programs use',av[0],need[1],true); y+=52; rowsSvg+=row('High end of the range: heat offered, and the least the programs use',av[1],need[0],false);
    rowsSvg+=`<text x="${bx}" y="${y+40}" font-size="11.5" fill="${K.mute}">One scale for both bars, 0 to ${n0(mx)} MWh/yr. The programs’ use is drawn at true width (${rg(need,'MWh/yr')}, well under 1 % of the bar), the warming shelter’s heat is not counted.</text>`; y+=62; }
  else rowsSvg+=`<text x="${bx}" y="${SH+30}" font-size="13" fill="${K.red}">Heat offered: ? (not computed for this size)</text>`;
  /* programs, hot to cool, on one scale */
  const progs=(P.boxes||[]).map(b=>({b,t:tmp(b.p),it:h.items.find(i=>i.id===b.id)})).sort((a,b)=>b.t.hi-a.t.hi);
  const mp=Math.max(1,...h.items.map(i=>i.mwh[1])), py0=y+14; let ps=`<text x="${bx}" y="${py0}" font-size="15" fill="${K.ink}">What each program asks for, hot to cool</text>`;
  const rowsP=[{name:'Data hall (the source)',t:hallT?`${rg(hallT,'°C')}`:null,src:true}].concat(progs.map(p=>({name:short(p.b.p.name),t:p.t.s,it:p.it,fam:p.b.id==='clinic'?'clin':'pub',id:p.b.id})));
  rowsP.forEach((r,i)=>{ const yy=py0+22+i*30; ps+=`<text x="${bx}" y="${yy+13}" font-size="13" fill="${K.ink}">${esc(r.name)}</text>`;
    ps+=r.t?`<text x="${bx+210}" y="${yy+13}" font-size="13" fill="${K.ink2}">${esc(r.t)}</text>`:`<text x="${bx+210}" y="${yy+13}" font-size="13" fill="${K.red}">?</text>`;
    if(r.src){ ps+=`<text x="${bx+360}" y="${yy+13}" font-size="11.5" fill="${K.mute}">${inside?'air-cooled':'liquid-cooled'} hall; the heat pump lifts it (COP in the register)</text>`; return; }
    if(r.it){ const w0=Math.max(1.5,r.it.mwh[0]/mp*220), w1=Math.max(1.5,r.it.mwh[1]/mp*220); ps+=`<rect x="${bx+360}" y="${yy+2}" width="${w1.toFixed(1)}" height="16" fill="${FAMC[r.fam]}"/><rect x="${bx+360}" y="${yy+2}" width="${w0.toFixed(1)}" height="16" fill="${K[r.fam==='clin'?'clin':'pub']}"/><text x="${bx+360+w1+8}" y="${yy+14}" font-size="12" fill="${K.ink2}">${rg1(r.it.mwh,'MWh/yr')}</text>`; }
    else ps+=`<text x="${bx+360}" y="${yy+13}" font-size="12" fill="${K.red}">? no heat demand figure in the tool</text>`; });
  const Ht=py0+22+rowsP.length*30+10, svg=`<svg viewBox="0 0 ${W} ${Ht}" width="${W}" height="${Ht}" font-family="${FONT}" role="img" aria-label="Heat from the data hall, how much the programs use and how much is left for the neighbours">${sec.svg}${sec.scale}${rowsSvg}${ps}</svg>`;
  const key=keyHtml(famsOf(G),`<span><i style="background:${K.dcSup};border-color:${K.dcSup}"></i>heat the hall offers, after the heat pump</span><span class="f1c-note">Section across the lot at the plane that meets the most blocks (within 0.5 m of it); where two overlap in view the nearer is on top. Programs not on it: ${esc((P.boxes||[]).filter(b=>!sec.cut.g.has(b.id)).map(b=>short(b.p.name).toLowerCase()).join(', ')||'none')}.</span>`);
  const miss=[]; if(!av) miss.push('heat offered at this size'); if(h.unknown.length) miss.push('heat demand of the '+h.unknown.map(u=>short(u.p.name).toLowerCase()).join(', ')+' (no figure in arch_programs.json)');
  miss.push('supply temperature of the refuge and shelter (the library lists room temperature only)','a heat hub or heat-pump room in the plan (the tool does not place one)');
  const lt=rg(left,'MWh/yr');
  return {draw:svg+key,
    lead:'The data hall’s warmth, lifted by a heat pump, can serve the programs on the lot, hottest need first. What they use is a small share. The rest is left for the neighbours.',
    hero:[{v:av?rgG(av):q(),l:'GWh/yr the hall offers'},{v:rg(used),u:'MWh/yr',l:'used in the programs (shelter not counted)'},{v:left?rgG(left):q(),l:'GWh/yr left for the neighbours'}],
    rows:[['Size tested',mwSized!=null?n1(mwSized)+' MW IT':q()],['Warming shelter heat',q('no figure in the tool')],['Hall heat temperature',hallT?rg(hallT,'°C')+(inside?' (air)':' (liquid)'):q()]],
    more:[['How each temperature is sourced',`<p>${h.items.map(i=>`${esc(short(i.p.name))}: ${esc(i.p.heat.note||'')} (${esc((i.p.heat.src||[]).join(', '))})`).join('</p><p>')}</p>`],
      ['Why the order goes hot to cool',`<p>A program that needs hotter water takes the heat first; cooler uses can take what is left. The order is by the hottest temperature each program asks for in the library (supply temperature where listed, otherwise room temperature).</p>`]],
    src:['Heat offered: BD.archTest.budgets(P).heat.avail = BD.eng.calc(...).avail, heat after the heat pump (engine.js; capture and COP: register parts liquid_capture and cop).','Programs’ use: floor area × kWh/m·yr from tool/arch_programs.json (library ids in the more list); clinic and refuge only; shelter has no figure.','Left for neighbours: our arithmetic, offered minus used (low end: offered low minus used high; high end: offered high minus used low).',`Hall temperature: tool/data/arch.json dcTemp (register heat_temp; ${inside?'air':'liquid'}-cooled).`,V?'Section, IT size and program areas: the Emergency hub’s layout (hub.js, rule sheet v1), the same as the Rooms card; heat by the same rules (BD.archTest.budgets with the hub’s areas and MW).':'Section: drawn from the tool’s placement (Arrange) for the example lot; draft plan, rule sheet v0.'],
    missing:miss}; }});

/* ================= 18 Program diagram ================= */
C.add(T,'Program diagram',{chip:CHIP,async build(x){ const P=await x.arch(); if(!P) return noP(); const V=C.v1(P), G=G1(P), B=C.budgetsV1(P), B0=V?BD.archTest.budgets(P):B, pl=!V&&BD.plan&&BD.plan.build?BD.plan.build(P):null, fl=V?{}:flagIds(P);
  /* the notes: the hub's own flags where it draws the layout (those with ? are to check), else Arrange's rules */
  const rules=V?V.flags.map(t=>({sev:/\?/.test(t)?'q':'i',t:C.pub(t),src:[V.L&&V.L.frozen?'the test fit for '+(V.L.frozen.addr||'this lot'):'the hub’s rule sheet v1']})):BD.archTest.rules(P);   /* F25: the note’s text, in public words */
  const lv=G.levels, W=960, gap=10, pw=Math.min(230,Math.floor((W-gap*(lv.length-1))/lv.length)), ph=Math.round(pw*0.95); let top='';
  lv.forEach((z,i)=>{ const it=atLevel(G,z), p=plan(G,{w:pw,h:ph,items:it,fs:11.5}); top+=`<g transform="translate(${i*(pw+gap)},22)"><text x="0" y="-8" font-size="13" fill="${K.ink}">${z===0?'Ground storey':'Storey at '+n0(z)+' m'}</text>${p.svg}</g>`; });
  const y0=22+ph+34, SH=230;
  const sec=section(G,{W,H:SH,lab:200,labL:200,gap:34,flags:fl,flagWants:Object.keys(fl).map(id=>{ const b=(P.boxes||[]).find(b=>b.id===id); return b?{o:id,t:short(b.p.name),d:'to check (?)',red:true}:null; }).filter(Boolean)});
  const svg=`<svg viewBox="0 0 ${W} ${y0+SH+14}" width="${W}" height="${y0+SH+14}" font-family="${FONT}" role="img" aria-label="Program blocks on each storey, and a section">${top}<text x="0" y="${y0-10}" font-size="15" fill="${K.ink}">Section</text><g transform="translate(0,${y0})">${sec.svg}${sec.scale}</g></svg>`;
  const cap=`<span class="f1c-note">Street at the bottom of each plan. Same scale on every plan. Section across the lot at the plane that meets the most blocks (within 0.5 m of it); where two overlap in view the nearer is on top. Not on it: ${esc((P.boxes||[]).filter(b=>!sec.cut.g.has(b.id)).map(b=>short(b.p.name).toLowerCase()).join(', ')||'none')}.</span>`;
  const hallM2=V?V.areas.hall:G.items.filter(i=>i.fam==='hall').reduce((t,i)=>t+(i.m2||0),0), dcAll=V?V.areas.dcAll:G.items.filter(i=>i.grp==='hall'||i.grp==='dcs').reduce((t,i)=>t+(i.m2||0),0), netProg=V?V.areas.refuge+V.areas.warming_shelter+V.areas.clinic:pl?pl.programs.reduce((t,p)=>t+p.net,0):null, ask=B0.space.prog;
  const nq=rules.filter(r=>r.sev==='q').length;
  return {draw:svg+keyHtml(famsOf(G),cap),
    lead:'Who uses which floor: the public programs at the street, the clinic above, the data centre behind on its own storeys. Colour is the program; the tool’s rules mark what still needs checking.',
    hero:[{v:n0(ask),u:'m²',l:'programs asked for'},{v:netProg!=null?n0(netProg):q(),u:netProg!=null?'m²':'',l:'net in the plan, after stairs and lifts'},{v:n0(hallM2),u:'m²',l:'data hall floor'},{v:String(nq),l:'notes marked "?" in the rules',red:nq>0}],
    rows:[['Storeys drawn',String(lv.length)],['Data-centre floor, all uses',n0(dcAll)+' m²'],['Height limit',n1(P.s.H)+' m']],
    more:[['Notes from the rules',`<p>${rules.map(r=>`${r.sev==='q'?'<b class="f1c-q">?</b> ':''}${esc(r.t)} <span style="color:${K.mute}">(${esc((r.src||[]).join(', '))})</span>`).join('</p><p>')}</p>`],
      ['How programs are placed',V?`<p>The Emergency hub’s rule sheet v1 (hub.js) lays the bands out from the street back: refuge, shelter and lobby at the street, the clinic where it fits, the data centre behind and over the hub. Programs asked for are the picks’ sizes; net in the plan is the hub’s rooms for the refuge, shelter and clinic.</p>`:`<p>Arrange puts each program on the street front where the lot allows and stacks the rest; the data centre keeps the back with its own dock. The blocks here are the tool’s placement as it stands, not a design.</p>`]],
    src:V?['Rooms and storeys: the Emergency hub’s layout (hub.js, rule sheet v1), the same as the Rooms card.','Programs asked for: the picks’ sizes. Net in the plan: the hub’s refuge, shelter and clinic rooms. Data hall and data-centre floor: the hub’s hall and data-centre count (hub.js).','Notes: the hub’s flags (hub.js); those marked ? are to check.','Height limit: the zone (BD.model, P.s.H).']:['Blocks and storeys: the tool’s placement P (BD.archTest.place; data centre by BD.archTest.dcPieces, programs from P.boxes), Emergency hub example: refuge side by side, warming shelter, clinic; draft plan, rule sheet v0.','Programs asked for: BD.archTest.budgets(P).space.prog. Net in the plan: BD.plan.build(P).programs[].net. Floors of pieces: dcPieces m2 (our arithmetic).','Flags: BD.archTest.rules(P); each carries its own sources in the list.','Height limit: the zone (BD.model, P.s.H).'],
    missing:[]}; }});

/* the tool's own 3-D view of Arrange, read-only: the old flow draws it behind the cards, a still is taken from its renderer, accent red drawn in INK for the still only, then restored */
let STILL={key:null,url:null};
async function still3d(P){ const key=BD.S.sel.city+':'+BD.S.sel.id; if(STILL.key===key) return STILL.url; const wait=ms=>new Promise(r=>setTimeout(r,ms)), keepT=BD.tier&&BD.tier();
  try{ if(BD.setTier&&keepT!=='arch') BD.setTier('arch'); await BD.arch.ready; BD.flow.to('arat'); await wait(1200); BD.flow.to('aarr'); await wait(3500);
    const R=BD.scene3d&&BD.scene3d.rig&&BD.scene3d.rig(), T=window.THREE; if(!R||!R.scene||!R.ren||!T) return null;
    const red=new T.Color('#CC746C'), ink=new T.Color('#16181B'), saved=[]; R.scene.traverse(o=>{ const ms=o.material?(Array.isArray(o.material)?o.material:[o.material]):[]; ms.forEach(m=>{ if(m&&m.color&&Math.abs(m.color.r-red.r)+Math.abs(m.color.g-red.g)+Math.abs(m.color.b-red.b)<0.12){ saved.push([m,m.color.clone()]); m.color.copy(ink); m.needsUpdate=true; } }); });
    let url=null; try{ R.ren.render(R.scene,R.cam); url=R.ren.domElement.toDataURL('image/png'); } finally{ saved.forEach(([m,c])=>{ m.color.copy(c); m.needsUpdate=true; }); try{ R.ren.render(R.scene,R.cam); }catch(e){} }
    if(url&&url.length>2000){ STILL={key,url}; return url; } return null; }
  catch(e){ console.warn('3-D still',e); return null; }
  finally{ if(keepT&&BD.setTier&&keepT!=='arch') BD.setTier(keepT); } }

/* ================= 19 Drawing styles ================= */
function axon(G,o){ const k=o.k, zk=k*0.9, c=0.866*k, s5=0.5*k, SXa=(d,xx)=>(xx+d)*c, SYa=(d,xx)=>(xx-d)*s5; const lv=G.levels, gapY=o.gap, polys=[]; let body=''; const boxes=[];
  lv.forEach((z,li)=>{ const dy=-li*gapY; G.items.filter(i=>Math.abs(i.z-z)<0.06).sort((a,b)=>((b.d0+b.d1)-(b.x0+b.x1))-((a.d0+a.d1)-(a.x0+a.x1))).forEach(i=>{ const th=Math.min(i.h,6)*zk, f=FAMC[i.fam], P4=(d,xx)=>[SXa(d,xx),SYa(d,xx)+dy];
    const A=P4(i.d0,i.x0),Bq=P4(i.d0,i.x1),Cc=P4(i.d1,i.x1),Dd=P4(i.d1,i.x0), dn=p=>[p[0],p[1]+th];
    const top=[A,Bq,Cc,Dd], front=[A,Bq,dn(Bq),dn(A)], right=[Bq,Cc,dn(Cc),dn(Bq)], pt=a=>a.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
    /* lift the slab: top face on the level, thickness hangs below (exploded) */
    body+=`<polygon points="${pt(front)}" fill="${mix(f,0.10)}"/><polygon points="${pt(right)}" fill="${mix(f,0.2)}"/><polygon points="${pt(top)}" fill="${f}"/>`; boxes.push({li,pts:[...top,...front,...right]});
    [top,front,right].forEach(a=>polys.push({o:'L'+li,pts:a})); }); });
  return {body,polys,SXa,SYa}; }
C.add(T,'Drawing styles',{chip:CHIP,async build(x){ const P=await x.arch(); if(!P) return noP(); const V=C.v1(P), G=G1(P), fl=V?{}:flagIds(P), W=960, still=await still3d(P);
  /* plan: the whole site, every block at its footprint, plant yard in grey */
  const pp=plan(G,{w:560,h:420,items:G.items,plant:true,fs:13,noNames:false}), planSvg=`<svg viewBox="0 0 560 420" width="560" height="420" font-family="${FONT}" role="img" aria-label="Plan of the site: every block at its footprint">${pp.svg}${C.scaleBar(14,396,10,pp.k,'10 m')}</svg>`;
  const sec=section(G,{W,H:340,lab:200,labL:200,gap:34,flags:fl,flagWants:Object.keys(fl).map(id=>{ const b=(P.boxes||[]).find(b=>b.id===id); return b?{o:id,t:short(b.p.name),d:'to check (?)',red:true}:null; }).filter(Boolean)});
  const secSvg=`<svg viewBox="0 0 ${W} 340" width="${W}" height="340" font-family="${FONT}" role="img" aria-label="Section">${sec.svg}${sec.scale}</svg>`;
  /* exploded: storeys pulled apart */
  const kk=3.2, ax=axon(G,{k:kk,gap:92}); let xs=[],ys=[]; ax.polys.forEach(p=>p.pts.forEach(a=>{ xs.push(a[0]); ys.push(a[1]); })); const mnx=Math.min(...xs), mxx=Math.max(...xs), mny=Math.min(...ys), mxy=Math.max(...ys), pad=20, AW=mxx-mnx+2*pad, AH=mxy-mny+2*pad, labW=420, TW=AW+labW;
  const tr=a=>a.map(p=>[p[0]-mnx+pad,p[1]-mny+pad]);
  const polys=ax.polys.map(p=>({o:p.o,pts:tr(p.pts)})), wants=G.levels.map((z,li)=>{ const its=G.items.filter(i=>Math.abs(i.z-z)<0.06), nm=[...new Set(its.map(i=>i.grp==='hall'?'data hall':i.grp==='dcs'?'DC support':i.name.toLowerCase()))].join(' · ');
      return {o:'L'+li,t:`Storey ${li+1}, ${n0(z)} m`,d:nm}; }).reverse();
  const lead=solveLeaders(polys,wants,TW-labW+10,38);
  const exSvg=`<svg viewBox="0 0 ${TW} ${AH}" width="${TW}" height="${AH}" font-family="${FONT}" role="img" aria-label="Exploded view: the storeys pulled apart"><g transform="translate(${pad-mnx},${pad-mny})">${ax.body}</g>${leaderSvg(lead,TW-labW+10)}</svg>`;
  const nmiss=wants.length-lead.length;
  const pane=(k,html,hid)=>`<div data-pane="${k}"${hid?' hidden':''}>${html}</div>`;
  const btn=(k,t,on)=>`<button type="button" data-k="${k}" aria-pressed="${on?'true':'false'}" onclick="(function(b){var w=b.closest('.f1c-vis-sty');w.querySelectorAll('[data-pane]').forEach(function(e){e.hidden=e.getAttribute('data-pane')!==b.getAttribute('data-k')});w.querySelectorAll('.f1c-vis-sw button').forEach(function(e){e.setAttribute('aria-pressed',e===b?'true':'false')})})(this)">${t}</button>`;
  const draw=`<div class="f1c-vis-sty"><div class="f1c-vis-sw" role="group" aria-label="Drawing style">${btn('plan','Plan',true)}${btn('section','Section')}${btn('exploded','Exploded')}${btn('3d','3-D massing')}</div>
   ${pane('plan',`<div style="display:flex;justify-content:center">${planSvg}</div><p class="f1c-note" style="text-align:center;margin:6px 0 0">Every block at its footprint, street at the bottom; the plant yard in grey. One storey at a time is on the Program diagram card.</p>`)}
   ${pane('section',secSvg,true)}
   ${pane('exploded',`<div style="display:flex;justify-content:center">${exSvg}</div>`,true)}
   ${pane('3d',still?`<div style="display:flex;flex-direction:column;align-items:center;gap:6px"><img src="${still}" alt="The tool's own 3-D view of the arrangement on the lot" style="max-width:100%;max-height:520px;border:1px solid ${K.hair}"><span class="f1c-note">${V?'Arrange’s massing (rule sheet v0): the hub’s layout has no 3-D model yet':'tool’s 3-D view, rule sheet v0'}</span></div>`:`<p class="f1c-vis-q"><b class="f1c-q">?</b> The tool's 3-D view could not be captured this time.</p>`,true)}
   ${keyHtml(famsOf(G),`<span><i style="background:${K.plant};border-color:${K.plant}"></i>plant yard (plan only)</span>`)}</div>`;
  return {draw,lead:'The same scheme in the styles the tool can draw today: plan, section and an exploded view, all from one placement. Use the switch above the drawing. The 3-D pane is a still from the tool’s own renderer.',
    hero:[{v:String(G.levels.length),l:'storeys, by floor level'},{v:n1(P.s.H),u:'m',l:'height limit'}],
    rows:[['Styles drawn','plan · section · exploded'],['3-D massing (the tool’s scene)',still?'still from the tool':q('could not be captured')],['Storeys, with their height',G.levels.map(z=>n0(z)+' m').join(' · ')]],
    more:[['What each style is for',`<p>Plan: where blocks stand on the lot. Section: how they stack against the height limit. Exploded: which program sits on which storey.</p>`],
      ['The exploded view',`<p>Storeys are pulled apart for reading only; blocks keep their footprints and, for a block over 6 m, its slab is drawn 6 m thick.${nmiss>0?` ${nmiss} storey label${nmiss>1?'s':''} could not take a straight leader and ${nmiss>1?'are':'is'} left off; the storeys are listed in the panel.`:''}</p>`]],
    src:['3-D pane: a still from the tool2019s own 3-D renderer (scene3d.js, Arrange step), read-only; lot line and outline accent red redrawn in ink for the still only.',V?'Plan, section and exploded view: the Emergency hub’s layout (hub.js, rule sheet v1), every room on its storey; plant from the hub’s plant layout.':'Plan, section and exploded view: drawn here from the tool’s placement P (BD.archTest.place, dcPieces) for the example lot; draft plan, rule sheet v0.','Height limit: BD.model (zone), P.s.H.',V?'Plant: the hub’s plant layout (hub.js).':'Plant yard: BD.model().plant (the tool’s plant layout).'],
    missing:(still?[]:['3-D still from the tool’s scene (capture failed)']).concat(['heat-flow style (see card 17)'])}; }});

/* ================= 20 Compare ================= */
const LOTS={van:{tile:'1_1',id:'63819485',name:'Vancouver'},edm:{tile:'-1_1',id:'146402',name:'Edmonton'}}, CACHE={};
async function factsFor(x,P){ const V=C.v1(P), B=C.budgetsV1(P), B0=V?BD.archTest.budgets(P):B, h=B.heat, rules=V?V.flags.map(t=>({sev:/\?/.test(t)?'q':'i',t})):BD.archTest.rules(P), s=P.s, sel=x.sel, a=sel.a||[];
  return {city:x.city,addr:x.addr,zone:x.zone,lot:sel.lotArea,mw:V?V.MW:s.M.mwSized,H:s.H,floors:s.floors,hall:V?V.areas.hall:s.hallM2,prog:B0.space.prog,cap:B.space.cap,avail:isN(h.avail)?h.avail.slice():null,need:h.need.slice(),unknown:h.unknown.length,nq:rules.filter(r=>r.sev==='q').length,nr:rules.length,nd:V?['refuge','warming_shelter','clinic'].filter(k=>!(V.areas[k]>0)).length:(P.notDrawn||[]).length,nbox:(P.boxes||[]).length,v1:!!V}; }
async function otherCity(cur){ const o=cur==='van'?'edm':'van'; if(CACHE[o]) return CACHE[o]; const L=LOTS[o], Lc=LOTS[cur], keep=BD.S.sel&&{city:BD.S.sel.city,tile:BD.S.sel.tile,id:BD.S.sel.id};
  try{ if(BD.S.city!==o&&BD.setCity) await BD.setCity(o,true); await BD.select({city:o,tile:L.tile,id:L.id,quiet:true}); BD.modelReset();
    const x2=C.ctx(o), P2=await x2.arch(); if(!P2) return null; CACHE[o]=await factsFor(x2,P2); return CACHE[o]; }
  finally{ try{ if(BD.S.city!==cur&&BD.setCity) await BD.setCity(cur,true); await BD.select({city:cur,tile:keep&&keep.tile||Lc.tile,id:keep&&keep.id||Lc.id,quiet:true}); BD.modelReset(); }catch(e){ console.warn('compare: restore',e); } } }
C.add(T,'Compare',{chip:CHIP,async build(x){ const P=await x.arch(); if(!P) return noP(); const cur=x.city, mine=await factsFor(x,P); CACHE[cur]=mine; const oth=await otherCity(cur); if(!oth) return {draw:'<p class="f1v-empty">The other city’s example lot could not be loaded.</p>'};
  const V=cur==='van'?mine:oth, E=cur==='van'?oth:mine, W=960, lx=40, bx=250, bw=420;
  const rowsDef=[['Lot area','m²',f=>[f.lot,f.lot],0],['IT size tested','MW',f=>[f.mw,f.mw],1],['Height limit','m',f=>[f.H,f.H],1],['Data hall floor','m²',f=>[f.hall,f.hall],0],['Programs asked for','m²',f=>[f.prog,f.prog],0],
    ['Heat the hall offers','MWh/yr',f=>f.avail,0],['Heat the programs use','MWh/yr',f=>f.need,1],['Notes marked "?" in the rules','',f=>[f.nq,f.nq],0]];
  let y=34, s='', mS=[]; const C2={van:K.ink2,edm:K.faint};
  
  rowsDef.forEach(([lab,u,fn,dec])=>{ const vv=fn(V), ee=fn(E), mx=Math.max(vv?vv[1]:0,ee?ee[1]:0)||1, fmt=a=>a?(a[0]===a[1]?(dec?n1(a[0]):n0(a[0])):rg(a)):null;
    s+=`<text x="${lx}" y="${y+17}" font-size="13" fill="${K.ink2}">${lab}</text><line x1="${lx}" y1="${y-12}" x2="${W-20}" y2="${y-12}" stroke="${K.hair}"/>`;
    [[vv,'van'],[ee,'edm']].forEach(([a,c],i)=>{ const yy=y+i*20, t=fmt(a);
      if(!a||a[0]==null){ s+=`<text x="${bx}" y="${yy+13}" font-size="12.5" fill="${K.red}">? not computed</text>`; return; }
      s+=`<rect x="${bx}" y="${yy+2}" width="${Math.max(1.5,bw*a[1]/mx).toFixed(1)}" height="13" fill="${C2[c]}"/>`+(a[0]!==a[1]?`<rect x="${bx}" y="${yy+2}" width="${Math.max(1.5,bw*a[0]/mx).toFixed(1)}" height="13" fill="${mix(C2[c],0.35)}"/>`:'')+`<text x="${bx+bw+12}" y="${yy+13}" font-size="12.5" fill="${K.ink}">${t}${u?' '+u:''}</text>`; });
    y+=62; });
  const H=y; const svg=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="${FONT}" role="img" aria-label="Vancouver and Edmonton example lots, row by row on one scale per row">${s}</svg>`;
  const key=`<div class="f1c-key"><span><i style="background:${C2.van};border-color:${C2.van}"></i>Vancouver, ${esc(V.addr)}</span><span><i style="background:${C2.edm};border-color:${C2.edm}"></i>Edmonton, ${esc(E.addr)}</span><span class="f1c-note">One scale per row. A range shows its low end darker. Heat figures are the tool’s ranges.</span></div>`;
  const hi=a=>a&&a[1]; const leftV=V.avail?[V.avail[0]-V.need[1],V.avail[1]-V.need[0]]:null, leftE=E.avail?[E.avail[0]-E.need[1],E.avail[1]-E.need[0]]:null;
  return {draw:svg+key,lead:'The same set-up on each city’s example lot: the Emergency hub programs, Ratios at the tool’s defaults. Only what the tool computes is shown. The lots and the rules differ, so this is a comparison of cases, not of cities.',
    hero:[{v:V.avail?rgG(V.avail):q(),l:'GWh/yr offered, Vancouver'},{v:E.avail?rgG(E.avail):q(),l:'GWh/yr offered, Edmonton'}],
    rows:[['Vancouver, left for neighbours',leftV?rg(leftV,'MWh/yr'):q()],['Edmonton, left for neighbours',leftE?rg(leftE,'MWh/yr'):q()],['Programs not placed',`${V.nd} · ${E.nd}`],['Warming shelter heat',q('no figure in the tool')]],
    more:[['What each number means',`<p>Lot area: the picked lot. IT size tested: the size the tool tests on the lot (BD.model mwSized). Data hall floor: the hall’s floor in the placement. Programs asked for: the three programs’ floor area. Heat offered: after the heat pump. Heat used: the programs’ own demand, shelter not counted. Notes marked "?": rules the tool could not settle.</p>`]],
    src:['Both columns: the tool’s own functions for each example lot (Vancouver 339 1st Ave E, 63819485; Edmonton 64 Airport Rd NW, 146402): lot, size and height limit; hall floor; programs and heat; notes.','Heat offered: engine.js calc, after the heat pump (register capture and COP); programs’ use: tool/arch_programs.json kWh/m²·yr × floor area (our arithmetic).',(V.v1&&E.v1?'IT size, data hall floor, heat and notes: the Emergency hub’s layout on each lot (hub.js, rule sheet v1), heat by the same rules (budgets with the hub’s areas and MW). Programs not placed: programs with no rooms in the hub (the clinic is dropped from ladder step 2 on).':'Draft plan, rule sheet v0.')+' Edmonton lot outlines are not drawn on this card.'],
    missing:['plant noise at the lot lines for each city (not in the tool for this placement)','checks passed and to fix per city (the Rooms, Separations and Plant cards hold them)','warming shelter heat demand']}; }});
})();
