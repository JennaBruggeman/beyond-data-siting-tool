/* Beyond Data — the site report as infographic pages (J.B., 20 Oct 2026: "the report should be professional, but diagrammatic, and balance
   text, with infographic charts to help with legibility"; precedents: an isometric process walk-through with numbered callouts, a flow/network
   diagram, an editorial chart grid; graphic language from her GP-1 booklet v6: paper, Barlow, fine linework, browns and slate blue, soft red).
   The booklet is a research document; this is a report on one lot for one reader, so its structure is the tool's own: what fits, what moves,
   who gains and gives up, what could become, how it compares. Every figure comes from the tool's model and engine. Letter pages, 612 × 792. */
(function(){
'use strict';
const BD=window.BD; const {esc,fmt}=BD; const E=()=>BD.eng;
const PW=612, PH=792, M=36;
/* J.B.'s booklet, white1 (20 Oct 2026): white paper, black linework, greys, red #d4202b, the site on pink, green landscape, blue water, ochre */
const K={bg:'#ffffff',grid:'#efefef',ink:'#1b1b1d',mute:'#616164',dim:'#a8a8ab',faint:'#bababc',line:'#dedede',red:'#d4202b',heat:'#bf8a00',warm:'#dbbe73',cold:'#1f78c7',green:'#2e9d4e',panel:'#f3f3f3',pink:'#f5d1d5'};
const STYW={nb:{l:'#f6f6f6',r:'#e9e9e9',t:'#ffffff',e:'#a8a8ab',w:0.3},dc:{l:'#ec9aa1',r:'#e0707a',t:'#f2f2f2',e:'#1b1b1d',w:0.6},eq:{l:'#ffffff',r:'#e8e8e8',t:'#f7f7f7',e:'#1b1b1d',w:0.45},gen:{l:'#c6c6c7',r:'#a3a3a5',t:'#dedede',e:'#1b1b1d',w:0.4}};
const TYPEC={housing:'#bf8a00',apartment:'#dbbe73',office:'#1f78c7',hotel:'#bcd5ed',commercial:'#a8a8ab',school:'#2e9d4e',campus:'#7dc291',hospital:'#d4202b',care:'#ec9aa1',rec:'#7b3fb4',hall:'#c6c6c7',pool:'#7fb3e0',arena:'#616164'};
const TYPEN={housing:'non-market housing',apartment:'apartment',office:'office',hotel:'hotel',commercial:'commercial',school:'school',campus:'campus',hospital:'hospital',care:'care home',rec:'recreation centre',hall:'community hall',pool:'pool',arena:'arena'};
const r1=v=>Math.round(v*10)/10, n0=v=>fmt(Math.round(v));
const rng=(a,b,u,d)=>{ const f=v=>d?(+v).toFixed(d):fmt(Math.round(v)); return Math.abs(a-b)<1e-9?`${f(a)}${u?' '+u:''}`:`${f(a)}–${f(b)}${u?' '+u:''}`; };
function wrap(t,n){ const w=String(t||'').split(/\s+/), out=[]; let cur=''; for(const x of w){ if((cur+' '+x).trim().length>n&&cur){ out.push(cur); cur=x; } else cur=(cur+' '+x).trim(); } if(cur) out.push(cur); return out; }
const T=(x,y,t,o)=>{ o=o||{}; const L=Array.isArray(t)?t:[t]; const fs=o.fs||7.5, lh=o.lh||fs*1.34; return `<text x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" font-size="${fs}" font-weight="${o.w||300}" fill="${o.c||K.ink}" ${o.a?`text-anchor="${o.a}"`:''} ${o.ls?`letter-spacing="${o.ls}"`:''} ${o.halo?`stroke="${K.bg}" stroke-width="3" stroke-linejoin="round" paint-order="stroke"`:''}>${L.map((l,i)=>`<tspan x="${(+x).toFixed(1)}" dy="${i?lh:0}">${esc(l)}</tspan>`).join('')}</text>`; };
const caps=(x,y,t,o)=>T(x,y,String(t).toUpperCase(),Object.assign({fs:5.4,ls:'1',c:K.mute,w:400},o||{}));
const para=(x,y,t,n,o)=>{ const L=wrap(t,n||60); return {s:T(x,y,L,Object.assign({fs:7.6,c:K.ink},o||{})),h:L.length*((o&&o.fs)||7.6)*1.34}; };
const rule=(x1,y,x2,c,w)=>`<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${c||K.line}" stroke-width="${w||0.5}"/>`;
const big=(x,y,v,l,o)=>{ o=o||{}; return T(x,y,v,{fs:o.fs||21,w:300,c:o.c||K.ink})+caps(x,y+11,l)+(o.sub?T(x,y+20,wrap(o.sub,o.n||32),{fs:6.2,c:K.mute}):''); };
const dot=(x,y,r,c)=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${c}"/>`;
const num=(x,y,n)=>`<circle cx="${x}" cy="${y}" r="6" fill="#fff" stroke="${K.ink}" stroke-width=".7"/>`+T(x,y+2.3,String(n),{fs:6.6,w:400,c:K.ink,a:'middle'});
// a small SVG (from report.js) placed inside a page at x, y, width w, its height from its own viewBox
function nest(svg,x,y,w){ if(!svg) return {s:'',h:0}; const m=/viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg); if(!m) return {s:'',h:0}; const h=w*(+m[2])/(+m[1]);
  const s=svg.replace('width="100%"','').replace(/font-family="Open Sans, Arial, sans-serif"/g,'font-family="Barlow, Arial, sans-serif"').replace('<svg ',`<svg x="${x}" y="${y}" width="${w}" height="${h.toFixed(1)}" `); return {s,h}; }

/* ---------- the page frame ---------- */
function page(D,no,title,finding,body){ const a=D.site; return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${PW} ${PH}" width="100%" font-family="Barlow, Arial, sans-serif" role="img" aria-label="${esc(title)}">${D.font}
 <rect width="${PW}" height="${PH}" fill="${K.bg}"/>
 ${caps(M,34,'Beyond Data · site report')}${caps(PW-M,34,`${a.addr} · ${a.city}`,{a:'end'})}
 ${T(M,74,no,{fs:26,w:300})}${T(M+38,64,title,{fs:16.5,w:600})}${T(M+38,78,wrap(finding,96).slice(0,2),{fs:8,c:K.red})}
 ${rule(M,96,PW-M,K.ink,0.5)}
 ${body}
 ${rule(M,PH-34,PW-M)}${T(M,PH-24,`${a.addr}, ${a.city} · ${D.level} · ${D.date}`,{fs:6,c:K.mute})}${T(PW-M,PH-24,no,{fs:6,c:K.mute,a:'end'})}</svg>`; }

/* ---------- the site in isometric, fitted to a box (the same drawing kit as the site sheet) ---------- */
function siteIso(box,o){ o=o||{}; const S=BD.sheets, m=BD.model(); if(!S||!m||!m.F) return {s:'',a:{}}; const F=m.F, {ring2,pts,prism,fan}=S, STY=STYW;
  const lot=ring2(m.ring).map(([x,y])=>F.toL(x,y)); const C=Math.cos(Math.PI/6), Sn=0.5; let a=1e9,b=-1e9,c=1e9,d=-1e9; for(const [u,v] of lot){ const sx=(u-v)*C, sy=(u+v)*Sn; a=Math.min(a,sx); b=Math.max(b,sx); c=Math.min(c,sy); d=Math.max(d,sy); }
  const Hb=m.existing?(m.roofH||m.H):m.H, top=Hb+8, padX=o.pad||0.18; const bw=box.x1-box.x0, bh=box.y1-box.y0;
  const sc=Math.min(bw*(1-2*padX)/(b-a),(bh*0.82)/((d-c)+top)); const ox=(box.x0+box.x1)/2-((a+b)/2)*sc, oy=box.y0+bh*0.08+top*sc-c*sc+((bh*0.82)-((d-c)+top)*sc)/2;
  const P=(x,y,z)=>{ const [u,v]=F.toL(x,y); return [ox+(u-v)*C*sc, oy+(u+v)*Sn*sc-(z||0)*sc]; };
  const id='ic'+Math.round(box.x0)+'_'+Math.round(box.y0); let g=`<clipPath id="${id}"><rect x="${box.x0}" y="${box.y0}" width="${bw}" height="${bh}"/></clipPath><g clip-path="url(#${id})">`;
  if(o.grid!==false){ g+=`<g stroke="${K.grid}" stroke-width="0.4">`; for(let k=-80;k<120;k++){ const y=box.y0-400+k*12; g+=`<line x1="${box.x0}" y1="${y}" x2="${box.x1}" y2="${y+bw*Math.tan(Math.PI/6)}"/><line x1="${box.x0}" y1="${y+bw*Math.tan(Math.PI/6)}" x2="${box.x1}" y2="${y}"/>`; } g+=`</g>`; }
  const objs=[]; const city=BD.S.sel.city; const tiles=Object.entries(BD.S.tiles||{}).filter(([k])=>k.startsWith(city+':')).map(([,t])=>t);
  if(o.nb!==false) for(const t of tiles) for(const bl of t.bld||[]){ const [cx,cy]=bl.c; const q=P(cx,cy,0); if(q[0]<box.x0-30||q[0]>box.x1+30||q[1]<box.y0-30||q[1]>box.y1+60) continue; if(BD.pip(cx,cy,m.ring)) continue; const [u,v]=F.toL(cx,cy); objs.push({d:u+v,s:prism(P,bl.r,0,Math.max(3,Math.min(bl.h||4,90)),STY.nb)}); }
  g+=`<polygon points="${pts(ring2(m.ring).map(([x,y])=>P(x,y,0)))}" fill="${K.pink}" stroke="${K.ink}" stroke-width="0.4" stroke-dasharray="5 1.5 1 1.5"/>`;
  for(const l of m.loadSpaces||[]) g+=`<polygon points="${pts(ring2(l).map(([x,y])=>P(x,y,0)))}" fill="none" stroke="${K.dim}" stroke-width="0.3"/>`;
  const Bd=m.existing?m.foot:(m.sizedTo&&m.serverFoot?m.serverFoot:m.foot); const bq=ring2(Bd); const cen=q=>[q.reduce((s,p)=>s+p[0],0)/q.length,q.reduce((s,p)=>s+p[1],0)/q.length];
  { const [x,y]=cen(bq), [u,v]=F.toL(x,y); objs.push({d:u+v,s:prism(P,Bd,0,Hb,STY.dc)}); }
  const PL=m.plant||{boxes:[]}, roof=[], A={};
  for(const bx of PL.boxes||[]){ const gen=/generator/.test(bx.name); const z0=bx.base||0, z1=z0+(bx.h||3); const [x,y]=cen(ring2(bx.ring)), [u,v]=F.toL(x,y); let s=prism(P,bx.ring,z0,z1,gen?STY.gen:STY.eq);
    if(!gen&&sc>1.4){ const p=ring2(bx.ring); const L1=Math.hypot(p[1][0]-p[0][0],p[1][1]-p[0][1]), L2=Math.hypot(p[3][0]-p[0][0],p[3][1]-p[0][1]); const [A0,A1,Wd]=L1>=L2?[p[0],p[1],L2]:[p[0],p[3],L1]; const B3=L1>=L2?p[3]:p[1]; const n=Math.max(1,Math.floor(Math.max(L1,L2)/(Wd*0.95)));
      for(let i=0;i<n;i++){ const t=(i+0.5)/n; s+=fan(P,A0[0]+(A1[0]-A0[0])*t+(B3[0]-A0[0])/2,A0[1]+(A1[1]-A0[1])*t+(B3[1]-A0[1])/2,z1,Wd*0.36*sc); } }
    if(bx.kind==='roof') roof.push({d:u+v,s}); else objs.push({d:u+v,s});
    const c0=P(x,y,z1); if(gen){ if(!A.gen||c0[0]>A.gen[0]) A.gen=c0; } else if(bx.kind==='roof'){ if(!A.roof||c0[1]<A.roof[1]) A.roof=c0; } else if(!A.yard||c0[0]>A.yard[0]) A.yard=c0; }
  objs.sort((p,q)=>p.d-q.d).forEach(x=>g+=x.s); roof.sort((p,q)=>p.d-q.d).forEach(x=>g+=x.s);
  const far=pts0=>{ let best=null; for(const [x,y] of pts0){ const [u,v]=F.toL(x,y); if(!best||u+v>best.s) best={s:u+v,x,y}; } return best; };
  const fr=far(bq), lf=far(ring2(m.ring)); A.top=P(...cen(bq),Hb); A.front=P(fr.x,fr.y,0.5); A.lotFront=P(lf.x,lf.y,0.5); A.side=P(fr.x,fr.y,Hb*0.5);
  if(o.pipe){ const p0=A.front, p1=A.lotFront, p2=[p1[0]+50*C,p1[1]+50*Sn]; g+=`<polyline points="${pts([p0,p1,p2])}" fill="none" stroke="${K.heat}" stroke-width="1.4"/><polyline points="${pts([[p0[0]+2,p0[1]+1.2],[p1[0]+2,p1[1]+1.2],[p2[0]+2,p2[1]+1.2]])}" fill="none" stroke="${K.warm}" stroke-width="1"/>`; A.pipe=p1; A.pipeEnd=p2; }
  if(o.air&&A.roof) for(let i=0;i<3;i++){ const x=A.roof[0]-24+i*20, y=A.roof[1]-6; g+=`<path d="M${x},${y} q3,-6 0,-12 q-3,-6 0,-12" fill="none" stroke="${K.warm}" stroke-width="0.8"/>`; }
  if(o.rain){ for(let i=0;i<9;i++){ const q=bq[0], r2=bq[2]; const t=(i+0.5)/9; const x=q[0]+(r2[0]-q[0])*t, y=q[1]+(r2[1]-q[1])*((i*0.37)%1); const p0=P(x,y,Hb+14), p1=P(x,y,Hb+4); g+=`<line x1="${p0[0].toFixed(1)}" y1="${p0[1].toFixed(1)}" x2="${p1[0].toFixed(1)}" y2="${p1[1].toFixed(1)}" stroke="${K.cold}" stroke-width=".7" stroke-dasharray="2 1.5"/>`; }
    const tk=P(fr.x,fr.y,0); g+=`<ellipse cx="${tk[0]+18}" cy="${tk[1]+8}" rx="10" ry="4" fill="none" stroke="${K.cold}" stroke-width=".8"/>`; A.tank=[tk[0]+18,tk[1]+8]; }
  if(o.grid2&&A.gen){ g+=`<polyline points="${pts([A.gen,[A.gen[0]+40,A.gen[1]+23]])}" fill="none" stroke="${K.cold}" stroke-width="1" stroke-dasharray="4 2"/>`; }
  g+='</g>'; return {s:g,a:A,P,sc}; }

/* ---------- charts ---------- */
function hbars(x,y,w,rows,o){ o=o||{}; const lw=o.lw||110, bw=w-lw-(o.rw||95), max=o.max||Math.max(...rows.map(r=>r.hi!=null?r.hi:r.v),1e-9); let s='', yy=y;
  for(const r of rows){ const a=Math.max(0,(r.v/max)*bw), b=Math.max(a,r.hi!=null?(r.hi/max)*bw:a); s+=T(x,yy+6,wrap(r.l,26).slice(0,2),{fs:6.6,c:r.me?K.ink:K.mute,w:r.me?400:300});
    s+=`<rect x="${x+lw}" y="${yy}" width="${Math.max(0.5,a).toFixed(1)}" height="8" fill="${r.c||K.dim}"/>`+(b>a?`<rect x="${(x+lw+a).toFixed(1)}" y="${yy}" width="${(b-a).toFixed(1)}" height="8" fill="${r.c||K.dim}" opacity=".35"/>`:'');
    s+=T(x+lw+Math.max(a,b)+5,yy+6.5,r.t||'',{fs:6.6,c:K.ink}); yy+=o.step||17; }
  return {s,h:yy-y}; }
function nice(max){ const p=Math.pow(10,Math.floor(Math.log10(max||1))); for(const m of [1,2,2.5,5,10]) if(m*p>=max) return m*p; return 10*p; }
const tidy=t=>String(t||'').replace(/\s+\d+ more\b/g,'').replace(/\s+([.,;:)])/g,'$1').trim();
function axisTicks(x0,x1,y,vals,fmtv){ return vals.map(v=>{ const x=x0+(x1-x0)*v.p; return `<line x1="${x}" y1="${y}" x2="${x}" y2="${y+3}" stroke="${K.dim}" stroke-width="0.4"/>`+T(x,y+10,fmtv(v.v),{fs:5.6,c:K.mute,a:'middle'}); }).join(''); }

/* ---------- the data, once ---------- */
async function collect(){ const e=E(), f=e.siteFacts(), A=BD.S.answers, m=BD.model(); const mw=A.mw||(m&&m.mwSized)||1, rec=(A.inside||'air')!=='air';
  const d=await e.loadRecv(f.city), near=e.nearby(f,d), nets=e.netsAt(f,d); const r=e.calc({mw,recover:rec,to:'near'},f,near,nets), rL=e.calc({mw,recover:true,to:'near'},f,near,nets);
  // every building within 3 km, costed for heat as if liquid-cooled (the heat step's own method)
  let heat=[]; try{ if(BD.routeTree) await BD.routeTree(f); heat=d.pts.map(p=>Object.assign({},p,{dist:Math.hypot(p.x-f.c[0],p.y-f.c[1])})).filter(p=>p.dist<=3000); heat.forEach(p=>{ p.econ=BD.heatEcon(f,p,rL.avail); }); }catch(err){ console.warn(err); }
  let best=null; try{ const B=BD.bestHeat?BD.bestHeat(f,heat.filter(p=>p.econ&&p.econ.take),rL.avail[0]):null; best=B&&B[0]; }catch(err){}
  const EC=BD.ECON, cop=e.R.cop; const worth=c=>EC.heatVal(c)-EC.elec[c]/((cop[0]+cop[1])/2);
  const refs=BD.compareRefs?BD.compareRefs(f):[]; let prec=null; try{ prec=await (await fetch('precedents.json')).json(); }catch(err){}
  const D=BD.flow.reportData(); const fitMax=BD.fitMax?BD.fitMax():null;
  const opps=[]; for(const fm of BD.oppFams||[]) for(const n of BD.oppFamList(fm)){ const q=BD.oppGatesFor(n); if(q) opps.push({fam:fm,n,s:q.s,rd:q.L.readiness,L:q.L,G:q.G}); }
  const a=BD.S.sel.a||[]; const site={addr:(a[0]||'No civic address').replace(/\b\w+/g,w=>/^(NW|NE|SW|SE|N|S|E|W)$/.test(w)?w:w[0]+w.slice(1).toLowerCase()),city:f.city==='van'?'Vancouver':'Edmonton'};
  const font=BD.sheets&&BD.sheets.fontStyle?await BD.sheets.fontStyle():'';
  const note=(k,t)=>{ const n=BD.flow.notes&&BD.flow.notes[k]; const s=n&&(n.secs||[]).find(x=>x[0]===t); return s?tidy(s[1]):''; };
  const secs=k=>{ const n=BD.flow.notes&&BD.flow.notes[k]; return n?(n.secs||[]).filter(x=>x[3]!==false).map(x=>[x[0],tidy(x[1])]):[]; };
  const lead=k=>{ const n=BD.flow.notes&&BD.flow.notes[k]; return n?tidy(n.lead):''; };
  return {secs,e,f,A,m,mw,rec,d,near,nets,r,rL,heat,best,EC,worth,refs,prec,D,fitMax,opps,site,font,note,lead,level:D.level,date:D.date,tier:D.tier,picks:BD.spec?BD.spec.list():[]}; }

/* ---------- pages ---------- */
function pCover(D){ const {f,mw,r,rL,rec,heat,site}=D; const iso=siteIso({x0:M,y0:136,x1:PW-M,y1:500},{pipe:rec,air:!rec});
  const within=heat.length, fac=[r.facMWh[0]/1000,r.facMWh[1]/1000];
  let s=`<rect width="${PW}" height="${PH}" fill="${K.bg}"/>${caps(M,34,'Beyond Data · site report')}${caps(PW-M,34,D.date,{a:'end'})}`;
  s+=T(M,82,site.addr,{fs:30,w:600})+T(M,102,`${site.city} · ${f.zone||''} · ${fmt(f.lot||0)} m² lot`,{fs:10,c:K.mute})+T(M,120,`Report level: ${D.level}`,{fs:8.5,c:K.red});
  s+=iso.s;
  // the lot's numbers
  const y=540; s+=rule(M,y-24,PW-M,K.ink,0.5);
  s+=big(M,y,`${r1(mw)} MW`,'servers',{sub:D.fitMax?`the most that fits here with its plant: ${D.fitMax.toFixed(1)} MW`:''})+big(M+138,y,rng(fac[0],fac[1],''),'GWh of electricity a year',{sub:`${rng(r.fac[0],r.fac[1],'MW',1)} at the meter at full load`});
  s+=big(M+276,y,rec?rng(r.avail[0]/1000,r.avail[1]/1000,''):'none',rec?'GWh of heat offered a year':'heat recovered',{sub:rec?'after a heat pump':`liquid cooling would offer ${rng(rL.avail[0]/1000,rL.avail[1]/1000,'GWh')} a year`})+big(M+414,y,fmt(within),'buildings within 3 km',{sub:'that could take heat; by type, on the heat page'});
  const p=para(M,598,'This report reads one lot for one data centre. It shows what fits, what moves in and out, who gains and who gives up, and what the lot could become. Every figure is a range from published sources, not a design or a quote; operators\' figures are their claims.',110,{fs:8.2});
  s+=p.s+T(M,598+p.h+6,'In the drawings: the data centre in red, its lot in pink with a dash-dot line; ochre, heat; blue, power and water; dashed, possible. Neighbours at their measured heights.',{fs:6.4,c:K.mute});
  { const st=templatesStrip(D,M,668,PW-2*M); s+=st.s; }
  s+=rule(M,PH-34,PW-M)+T(M,PH-24,`Generated by the Beyond Data tool · ${D.site.city} · figures as of ${D.date}`,{fs:6,c:K.mute});
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${PW} ${PH}" width="100%" font-family="Barlow, Arial, sans-serif" role="img" aria-label="Cover">${D.font}${s}</svg>`; }

function pSite(D,no){ const {f,m,mw,prec,fitMax}=D, R2=BD.report2, pal=R2.PAL.w1; let s='';
  const plan=nest(R2.planSVG(m,pal,{w:300,maxH:300}),M,112,262); s+=caps(M,108,'Plan')+plan.s;
  const sec=nest(R2.sectionSVG(m,pal,{w:440}),M,112+plan.h+18,262); s+=caps(M,112+plan.h+14,'Section')+sec.s;
  // how much fits: floor-only range, everything fits, the size chosen
  const X0=330, X1=PW-M, top=nice(Math.max(f.mw[1],mw,fitMax||0)*1.05); const px=v=>X0+(X1-X0)*v/top; let y=118;
  s+=caps(X0,y,'How much fits on this lot, MW of servers'); y+=16;
  s+=`<rect x="${px(f.mw[0])}" y="${y}" width="${px(f.mw[1])-px(f.mw[0])}" height="10" fill="${K.panel}" stroke="${K.faint}" stroke-width=".4"/>`+T(px(f.mw[0])-4,y+8,`floor space only, ${r1(f.mw[0])}–${r1(f.mw[1])}`,{fs:6,c:K.mute,a:'end'});
  if(fitMax!=null) s+=`<rect x="${X0}" y="${y+16}" width="${px(fitMax)-X0}" height="10" fill="${K.heat}"/>`+T(px(fitMax)+4,y+24,`${fitMax.toFixed(1)} with its plant and yard`,{fs:6,c:K.ink});
  s+=`<line x1="${px(mw)}" y1="${y-4}" x2="${px(mw)}" y2="${y+32}" stroke="${K.red}" stroke-width="1"/>`+T(px(mw),y-7,`this report: ${r1(mw)} MW`,{fs:6.2,c:K.red,a:'middle'});
  s+=`<line x1="${X0}" y1="${y+32}" x2="${X1}" y2="${y+32}" stroke="${K.dim}" stroke-width=".4"/>`+axisTicks(X0,X1,y+32,[0,0.25,0.5,0.75,1].map(p=>({p,v:p*top})),v=>fmt(v)); y+=62;
  // m² per MW against built data centres
  const pr=prec&&prec.summary&&prec.summary.gross_per_it_mw_benchmark; const here=f.gross?((f.gross[0]+f.gross[1])/2)/Math.max(mw,0.1):null;
  if(pr){ s+=caps(X0,y,'Building area per MW, against built data centres'); y+=14; const lo=0, hi=nice(Math.max(pr.max,here||0)*1.05), q=v=>X0+(X1-X0)*(v-lo)/(hi-lo);
    s+=`<line x1="${q(pr.min)}" y1="${y+6}" x2="${q(pr.max)}" y2="${y+6}" stroke="${K.dim}" stroke-width=".6"/><rect x="${q(pr.p25)}" y="${y}" width="${q(pr.p75)-q(pr.p25)}" height="12" fill="${K.panel}" stroke="${K.dim}" stroke-width=".5"/><line x1="${q(pr.median)}" y1="${y}" x2="${q(pr.median)}" y2="${y+12}" stroke="${K.ink}" stroke-width="1"/>`;
    if(here){ s+=dot(q(Math.min(here,hi)),y+6,3.4,K.red)+T(q(Math.min(here,hi)),y-4,`this lot, about ${n0(here)} m²/MW`,{fs:6,c:K.red,a:'middle'}); }
    s+=`<line x1="${X0}" y1="${y+20}" x2="${X1}" y2="${y+20}" stroke="${K.dim}" stroke-width=".4"/>`+axisTicks(X0,X1,y+20,[0,0.25,0.5,0.75,1].map(p=>({p,v:lo+p*(hi-lo)})),v=>n0(v));
    s+=T(X0,y+40,wrap(`${pr.n} benchmark buildings: median ${n0(pr.median)} m² of building per MW of IT, middle half ${n0(pr.p25)}–${n0(pr.p75)} (public records and operator claims).`,62),{fs:6.2,c:K.mute}); y+=66; }
  // the facts
  s+=caps(X0,y,'The lot'); y+=12; const facts=D.D.facts.filter(([k])=>!/^Site$/.test(k)).slice(0,7);
  for(const [k,v] of facts){ s+=T(X0,y,k,{fs:6.4,c:K.mute}); const L=wrap(v,44).slice(0,3); s+=T(X0+80,y,L,{fs:6.6}); y+=L.length*9+5; }
  y+=6; const ld=D.lead('fits'); if(ld){ const p=para(X0,y,ld,52,{fs:7.2}); s+=p.s; y+=p.h+14; }
  const pl=D.lead('prec'); if(pl){ s+=caps(X0,y,'Real buildings'); y+=12; const p=para(X0,y,pl,52,{fs:7.2}); s+=p.s; y+=p.h+6; }
  for(const k of ['Closest in size']){ const v=D.note('prec',k); if(!v) continue; const L=wrap(v,52).slice(0,4); s+=T(X0,y,k,{fs:6.4,c:K.mute})+T(X0,y+9,L,{fs:6.6}); y+=9+L.length*9+6; }
  { const yb=PH-130, Hb=m.existing?(m.roofH||m.H):m.H, fp=m.existing?(f.foot||0):((m.sizedTo&&m.footArea)||f.fp||0); s+=rule(M,yb-24,PW-M,K.ink,0.5);
    const cells=[[`${fmt(f.lot||0)} m²`,'lot'],[fp?`${fmt(Math.round(fp/10)*10)} m²`:'—','building footprint'],[Hb?`${r1(Hb)} m`:'—','building height'],[`${rng(D.r.plant[0],D.r.plant[1],'m²')}`,'plant space']];
    cells.forEach(([v,l],i)=>{ s+=big(M+i*138,yb,v,l,{fs:17}); }); }
  return page(D,no,'What fits','A data centre sized for this lot, with the room its plant, generators and loading need.',s); }

function pFlows(D,no){ const {r,rec,mw,refs,f,e}=D; let s='';
  // energy to scale: electricity in (and the heat pump's), heat out to buildings and to the air
  const fac=(r.facMWh[0]+r.facMWh[1])/2/1000, hp=rec?(r.hp[0]+r.hp[1])/2/1000:0, off=rec?(r.avail[0]+r.avail[1])/2/1000:0, air=fac+hp-off;
  const scale=150/Math.max(fac+hp,1e-6), X0=M+120, XC=PW/2-24, X2=PW-M-150, yC=150;
  const band=(x1,y1,h1,x2,y2,h2,c,op)=>`<path d="M${x1},${y1} C${(x1+x2)/2},${y1} ${(x1+x2)/2},${y2} ${x2},${y2} L${x2},${y2+h2} C${(x1+x2)/2},${y2+h2} ${(x1+x2)/2},${y1+h1} ${x1},${y1+h1} Z" fill="${c}" opacity="${op||0.55}"/>`;
  const hE=fac*scale, hH=hp*scale; s+=caps(M,110,'Energy, to scale (GWh a year)');
  s+=band(X0,yC,hE,XC,yC,hE,K.cold)+(hH?band(X0,yC+hE+14,hH,XC,yC+hE,hH,K.cold,0.35):'');
  s+=T(X0-6,yC+hE/2+3,['Electricity in',`${rng(r.facMWh[0]/1000,r.facMWh[1]/1000,'GWh')}`],{fs:7,a:'end'})+(hH?T(X0-6,yC+hE+14+hH/2+3,['Heat pump',`${rng(r.hp[0]/1000,r.hp[1]/1000,'GWh')}`],{fs:6.4,a:'end',c:K.mute}):'');
  s+=`<rect x="${XC}" y="${yC-6}" width="48" height="${hE+hH+12}" fill="${K.ink}"/>`+T(XC+24,yC-12,'Data centre',{fs:7,a:'middle',w:600})+T(XC+24,yC+hE+hH+18,`${r1(mw)} MW of servers`,{fs:6.2,a:'middle',c:K.mute});
  const hO=off*scale, hA=air*scale; let yo=yC-10;
  if(hO){ s+=band(XC+48,yC,hO,X2,yo,hO,K.heat)+T(X2+6,yo+hO/2+3,['Heat to buildings',`${rng(r.avail[0]/1000,r.avail[1]/1000,'GWh')}`],{fs:7}); yo+=hO+18; }
  s+=band(XC+48,yC+hO,hA,X2,yo,hA,K.warm)+T(X2+6,yo+hA/2+3,['Heat to the air',`about ${fmt(Math.round(air))} GWh`],{fs:7}); yo+=hA;
  const yN=Math.max(yC+hE+hH+40,yo+26);
  s+=T(M,yN,wrap('All the electricity a data centre uses ends as heat. '+(rec?'With liquid cooling, part of it is caught warm enough for a heat pump to lift and pipe to buildings; the rest leaves by the coolers.':'Air-cooled, it all leaves by the chillers to the air; a liquid-cooled set-up could offer some of it to buildings.'),120),{fs:7.4});
  // everything else it takes in and gives off (not to scale)
  const here=refs.find(x=>x.id==='here'); const roof=e.roofArea(f)||0, mm={van:1159.5,edm:422.5}[f.city];
  const ins=[['Water',here&&here.n.evap[1]?`up to ${fmt(here.n.evap[1])} m³ a year evaporated`:'little: dry coolers evaporate none'],['Rain on the roof',`about ${fmt(Math.round(roof*mm/1000*0.8/10)*10)} m³ a year could be caught`],['Land',`${fmt(f.lot||0)} m² lot`],['Equipment','servers replaced every 5–6 years']];
  const outs=[['Sound','roof plant and generators; see page 6'],['Flexibility','load it could shift for the grid; see page 4'],['Materials','racks, drives and copper at each refresh'],['People','jobs, and a street edge']];
  let y=yN+30; s+=caps(M,y,'It also takes in')+caps(PW/2+10,y,'It also gives off or could give'); y+=14;
  for(let i=0;i<4;i++){ s+=dot(M+3,y-2.5,2.5,K.dim)+T(M+10,y,ins[i][0],{fs:7.2,w:400})+T(M+10,y+9,ins[i][1],{fs:6.4,c:K.mute}); s+=dot(PW/2+13,y-2.5,2.5,K.red)+T(PW/2+20,y,outs[i][0],{fs:7.2,w:400})+T(PW/2+20,y+9,outs[i][1],{fs:6.4,c:K.mute}); y+=26; }
  // grid carbon of that electricity, both cities, the same design
  y+=12; s+=caps(M,y,'The carbon in that electricity, same servers'); y+=10;
  const rows=refs.filter(x=>['here','conv','edmd','edmc'].includes(x.id)&&!x.noPue).map(x=>({l:x.lab,v:x.n.co2[0],hi:x.n.co2[1],t:rng(x.n.co2[0],x.n.co2[1],'t CO₂e a year'),c:x.city==='edm'?K.mute:K.cold,me:x.id==='here'}));
  const hb=hbars(M,y,PW-2*M,rows,{lw:150}); s+=hb.s; s+=T(M,y+hb.h+8,'Grid carbon: NIR 2026, 2024 consumption intensity in each province. Alberta\'s grid carries about 20 times BC\'s carbon per kWh.',{fs:6,c:K.mute});
  return page(D,no,'What moves in and out',`${rng(r.facMWh[0]/1000,r.facMWh[1]/1000,'GWh')} of electricity a year in; all of it leaves as heat${rec?', part of it to buildings':', to the air'}.`,s); }

function pHeat(D,no){ const {heat,best,worth,f,rec,r,rL,m,note}=D; let s=''; const iso=siteIso({x0:M,y0:104,x1:PW-M-150,y1:380},{pipe:true,air:!rec}); s+=iso.s; const a=iso.a, PL=m.plant||{}, P_=PL.s||{};
  // numbered walk-through
  const steps=[[a.top,'Servers',`${r1(D.mw)} MW; ${rec?'liquid to the chip catches 48–75% of the heat in water at 35–40 °C':'air-cooled: heat leaves at 25–35 °C'}`],
   [a.roof,'Roof plant',`${PL.placed?PL.placed.cr:''} ${P_.k?P_.k.name:'coolers'}: ${rec?'reject what is not recovered':'carry all the heat to the air'}`],
   [a.side,'Heat pump',`lifts the warm water to heating temperatures, COP 3.0–4.5${rec?'':'; drawn as if liquid-cooled'}`],
   [a.pipe,'Twin pipe',best?`to ${best.G.length} building${best.G.length>1?'s':''}, ${fmt(Math.round(best.len/10)*10)} m along the streets`:'to buildings within reach'],
   [a.pipeEnd,'Buildings',`${heat.length} within 3 km could take heat`]];
  let ly=112; const LX=PW-M-140; steps.forEach(([pt,t,sub],i)=>{ if(!pt) return; const L=wrap(sub,32).slice(0,6); s+=num(pt[0],pt[1],i+1); s+=num(LX,ly-2.5,i+1)+T(LX+10,ly,t,{fs:7.6,w:600})+T(LX+10,ly+9,L,{fs:6.3,c:K.mute}); ly+=16+L.length*8.4; });
  // every building: distance by street against cost per MWh, with what heat is worth
  const pts0=heat.filter(p=>p.econ&&isFinite(p.econ.lcohMid)&&p.econ.route); const X0=M+26, X1=PW-M-120, Y0=420, Y1=640; const wv=worth(f.city); const wvT=Math.abs(wv)<0.5?'about $0':`$${wv.toFixed(0)}`;
  const vals=pts0.map(p=>p.econ.lcohMid).filter(v=>v>0); const ylo=Math.pow(10,Math.floor(Math.log10(Math.max(1,Math.min(wv>0?wv:10,...vals)*0.8)))), yhi=Math.pow(10,Math.ceil(Math.log10(Math.max(wv*2,...vals)))); const ymax=yhi, xmax=nice(Math.max(1000,...pts0.map(p=>p.econ.route)));
  const px=v=>X0+(X1-X0)*Math.min(v,xmax)/xmax, py=v=>{ const t=(Math.log10(Math.max(ylo,Math.min(v,yhi)))-Math.log10(ylo))/(Math.log10(yhi)-Math.log10(ylo)); return Y1-(Y1-Y0)*t; };
  s+=caps(M,Y0-14,'Every building within 3 km, as if liquid-cooled: cost per MWh of heat against distance by street');
  s+=`<rect x="${X0}" y="${Y0}" width="${X1-X0}" height="${Y1-Y0}" fill="none" stroke="${K.line}" stroke-width=".5"/>`;
  s+=`<rect x="${X0}" y="${py(wv)}" width="${X1-X0}" height="${Y1-py(wv)}" fill="${K.heat}" opacity=".07"/>`;
  for(const p of pts0) s+=dot(px(p.econ.route),py(p.econ.lcohMid),p.t==='housing'||p.t==='apartment'?1.6:2.1,TYPEC[p.t]||K.dim);
  s+=`<line x1="${X0}" y1="${py(wv)}" x2="${X1}" y2="${py(wv)}" stroke="${K.heat}" stroke-width="1"/>`+T(X1-4,py(wv)-4,`what the heat is worth: ${wvT}/MWh`,{fs:6.2,c:K.heat,a:'end',halo:true});
  if(best){ const bx=px(best.len), by=py(best.mid.lcoh); s+=`<circle cx="${bx}" cy="${by}" r="5" fill="none" stroke="${K.red}" stroke-width="1"/>`+T(bx+8,by+3,`best set-up found: $${best.mid.lcoh.toFixed(0)}/MWh`,{fs:6.4,c:K.red,halo:true}); }
  s+=axisTicks(X0,X1,Y1,[0,0.25,0.5,0.75,1].map(p=>({p,v:p*xmax})),v=>fmt(v)+(v===xmax?' m':''));
  for(let v=ylo;v<=yhi*1.001;v*=10) for(const m of [1,3]){ const u=v*m; if(u>yhi*1.001) continue; s+=`<line x1="${X0}" y1="${py(u)}" x2="${X1}" y2="${py(u)}" stroke="${K.grid}" stroke-width=".4"/>`+T(X0-4,py(u)+2,`$${fmt(u)}`,{fs:5.6,c:K.mute,a:'end'}); }
  s+=T(X0-4,Y0-6,'$ per MWh (log scale)',{fs:5.6,c:K.mute,a:'start'});
  s+=T(X0,Y1+22,'Each dot is one building, by type. Below the line, a building\'s heat would pay for its pipe, connection and heat pump over their life. Middle case; each dot\'s range is on its card in the tool.',{fs:6.2,c:K.mute});
  // by type
  const by={}; heat.forEach(p=>{ by[p.t]=(by[p.t]||0)+1; }); const types=Object.entries(by).sort((p,q)=>q[1]-p[1]).slice(0,8); let ty=Y0+4; const TX=PW-M-110;
  s+=caps(TX,Y0-4,'By type'); for(const [t,n] of types){ s+=dot(TX+3,ty+3,2.6,TYPEC[t]||K.dim)+T(TX+10,ty+5.5,`${TYPEN[t]||t}`,{fs:6.4})+T(PW-M,ty+5.5,fmt(n),{fs:6.4,a:'end'}); ty+=13; }
  const ld=D.lead('heat'); if(ld) s+=T(M,Y1+42,wrap(ld,120).slice(0,3),{fs:7.2});
  const fnd=best?`Best set-up found: $${best.mid.lcoh.toFixed(0)} per MWh of heat against ${wvT} it is worth.`:`${heat.length} buildings within 3 km could take heat.`;
  return page(D,no,'Heat',fnd,s); }

function pPower(D,no){ const {r,refs,m,mw,f,note,opps}=D; let s=''; const iso=siteIso({x0:M,y0:104,x1:PW/2+30,y1:400},{grid2:true}); s+=iso.s; const a=iso.a, P_=(m.plant&&m.plant.s)||{};
  const grid=note('energy','The grid nearby'); const steps=[[a.top,'The meter',`${rng(r.fac[0],r.fac[1],'MW',1)} at full load; ${rng(r.facMWh[0]/1000,r.facMWh[1]/1000,'GWh')} a year`],[a.gen,'Standby generators',P_.g?`${P_.gN} sets of about ${P_.g.mw} MW, for outages; tested monthly`:'none in this set-up'],[a.lotFront,'The grid',grid||'the utility\'s feeder']];
  let ly=116; const LX=PW/2+44; steps.forEach(([pt,t,sub],i)=>{ if(pt) s+=num(pt[0],pt[1],i+1); s+=num(LX,ly-2.5,i+1)+T(LX+10,ly,t,{fs:7.6,w:600})+T(LX+10,ly+9,wrap(sub,40).slice(0,3),{fs:6.3,c:K.mute}); ly+=18+Math.min(3,wrap(sub,40).length)*8.4; });
  // electricity a year, the same servers in four places
  let y=430; s+=caps(M,y,'Electricity a year, the same servers'); y+=10;
  const rows=refs.filter(x=>!x.noPue).map(x=>({l:x.lab+(x.k==='claim'?', claim':''),v:x.n.MWh[0]/1000,hi:x.n.MWh[1]/1000,t:rng(x.n.MWh[0]/1000,x.n.MWh[1]/1000,'GWh'),c:x.id==='here'?K.cold:K.faint,me:x.id==='here'}));
  const hb=hbars(M,y,PW-2*M,rows,{lw:170,step:15}); s+=hb.s; y+=hb.h+20;
  // what it could give the grid: the electricity opportunities as tested here
  s+=caps(M,y,'What it could give the grid and neighbours, tested on this lot'); y+=12; const el=opps.filter(o=>o.fam==='Electricity');
  const ST={yes:['possible here',K.green],chg:['possible with a change',K.heat],nk:['not ruled out',K.dim],no:['not here',K.red]};
  for(const o of el){ const st=ST[o.s]||ST.nk; s+=`<rect x="${M}" y="${y-6}" width="8" height="8" fill="${st[1]}"/>`+T(M+14,y+1,o.n,{fs:7.2})+T(M+230,y+1,st[0],{fs:6.6,c:K.mute}); const U=wrap((o.L.unknowns||[])[0]?'not yet known: '+(o.L.unknowns||[])[0]:'',48).slice(0,2); s+=T(M+330,y+1,U,{fs:6.2,c:K.mute}); y+=Math.max(15,U.length*8.3+6); }
  y+=8; const ld=D.lead('energy'); if(ld) s+=T(M,y+6,wrap(ld,120).slice(0,3),{fs:7.2});
  return page(D,no,'Power',`A customer first: ${rng(r.fac[0],r.fac[1],'MW',1)} at the meter. What it gives back is flexibility, and only the operator can give it.`,s); }

function pWater(D,no){ const {refs,f,e,A}=D; let s=''; const mm={van:1159.5,edm:422.5};
  const rows=refs.filter(x=>x.id!=='qu2').map(x=>{ const roof=x.site&&x.site.roof; return {lab:x.lab,ev:x.id==='van4'?null:x.n.evap[1],rain:roof?roof*mm[x.city]/1000*0.8:null,me:x.id==='here'}; });
  const hereR=refs.find(x=>x.id==='here'); if(hereR&&!hereR.n.evap[1]) rows.splice(1,0,{lab:'Cooling towers instead, this site (at most)',ev:D.r.facMWh[1]*1.5,rain:null});
  const max=Math.max(1,...rows.map(r=>Math.max(r.ev||0,r.rain||0))); let y=120; const X0=M+170, X1=PW-M-80, px=v=>(X1-X0)*v/max;
  s+=caps(M,y-8,'Water a year: what the cooling evaporates against the rain on the roof'); y+=8;
  for(const r of rows){ s+=T(M,y+8,wrap(r.lab,34).slice(0,2),{fs:6.8,c:r.me?K.ink:K.mute,w:r.me?400:300});
    s+=r.ev?`<rect x="${X0}" y="${y}" width="${px(r.ev)}" height="7" fill="${K.cold}"/>`+T(X0+px(r.ev)+4,y+6,`${fmt(r.ev)} m³ evaporated`,{fs:6.2}):T(X0,y+6,'none evaporated',{fs:6.2,c:K.mute});
    s+=r.rain?`<rect x="${X0}" y="${y+9}" width="${px(r.rain)}" height="7" fill="none" stroke="${K.cold}" stroke-width=".7" stroke-dasharray="2 1.2"/>`+T(X0+px(r.rain)+4,y+15,`${fmt(Math.round(r.rain/10)*10)} m³ of rain`,{fs:6.2,c:K.mute}):'';
    y+=28; }
  s+=T(M,y+4,'Solid: water evaporated, cooling towers at most 1.5 L per kWh of heat; hybrids wet only above 18 °C. Dashed: rain on the roof, 80% caught (ECCC normals 1991–2020).',{fs:6.2,c:K.mute}); y+=30;
  const ld=D.lead('water'); if(ld){ s+=T(M,y,wrap(ld,110).slice(0,3),{fs:7.6}); y+=34; }
  { const y0=y; const iso=siteIso({x0:PW-M-230,y0:y0-10,x1:PW-M,y1:y0+200},{grid:false,nb:false,pad:0.08,rain:true}); s+=iso.s; }
  for(const k of ['Water the cooling buys','Rainwater for cooling','Reclaimed water']){ const v=D.note('water',k); if(!v) continue; s+=T(M,y,k,{fs:7.4,w:600})+T(M,y+10,wrap(v,58).slice(0,3),{fs:7}); y+=18+Math.min(3,wrap(v,58).length)*9; }
  y=Math.max(y,0)+10; s+=caps(M,y,'Water opportunities, tested on this lot'); y+=12; const ST={yes:['possible here',K.green],chg:['possible with a change',K.heat],nk:['not ruled out',K.dim],no:['not here',K.red]};
  for(const o of D.opps.filter(o=>o.fam==='Water')){ const st=ST[o.s]||ST.nk; s+=`<rect x="${M}" y="${y-6}" width="8" height="8" fill="${st[1]}"/>`+T(M+14,y+1,o.n,{fs:7.2})+T(M+260,y+1,st[0],{fs:6.6,c:K.mute}); y+=15; }
  const here=refs.find(x=>x.id==='here'); return page(D,no,'Water',here&&here.n.evap[1]?`Up to ${fmt(here.n.evap[1])} m³ a year evaporated by the cooling.`:'Dry coolers evaporate no water; the roof could catch rain for other uses.',s); }

function pTime(D,no){ const {rec,EC}=D; let s=''; const X0=M+90, X1=PW-M, Y=130, yrs=50, px=v=>X0+(X1-X0)*v/yrs; const life=(EC&&EC.life)||{pipe:30,hp:20};
  s+=caps(M,Y-12,'Fifty years on one lot');
  const rows=[['The building',[[0,50]],K.faint],['The grid connection',[[0,50]],K.cold],[rec?'The heat pipe':'A heat pipe, if added',[[0,life.pipe]],K.heat],['The heat pump',[[0,life.hp]],K.warm]];
  let y=Y; for(const [l,spans,c] of rows){ s+=T(M,y+6,l,{fs:7}); for(const [a,b] of spans) s+=`<rect x="${px(a)}" y="${y}" width="${px(b)-px(a)}" height="8" fill="${c}" opacity="${c===K.faint?1:0.8}"/>`; y+=18; }
  s+=T(M,y+6,'Servers',{fs:7}); for(let t=0;t<50;t+=5.5) s+=`<rect x="${px(t)}" y="${y}" width="${Math.max(1,px(Math.min(50,t+5.5))-px(t)-2)}" height="8" fill="none" stroke="${K.ink}" stroke-width=".6"/>`; s+=T(X1,y+18,'replaced every 5–6 years: 8–9 sets over the building\'s life',{fs:6.2,c:K.mute,a:'end'}); y+=34;
  s+=`<line x1="${X0}" y1="${y}" x2="${X1}" y2="${y}" stroke="${K.dim}" stroke-width=".4"/>`+axisTicks(X0,X1,y,[0,0.2,0.4,0.6,0.8,1].map(p=>({p,v:p*yrs})),v=>`${v} yr`); y+=30;
  s+=T(M,y,wrap('Each refresh is a decision: what leaves the building, and in what state. The pipe and the grid connection outlast the servers and the tenant; what feeds them when the tenant changes is not settled here.',118),{fs:7.6}); y+=40;
  s+=caps(M,y,'What it is made of'); y+=12; for(const k of ['Over 25 years','Where retired equipment can go']){ const v=D.note('materials',k); if(!v) continue; s+=T(M,y,k,{fs:7.4,w:600})+T(M+150,y,wrap(v,82).slice(0,3),{fs:7}); y+=12+Math.min(3,wrap(v,82).length)*9; }
  y+=12; s+=caps(M,y,'What neighbours would hear, see and feel'); y+=12; let i=0;
  for(const k of ['Sound','The street edge','Who is nearby']){ const v=D.note('social',k); if(!v) continue; i++; s+=num(M+6,y-2.5,i)+T(M+18,y,k,{fs:7.4,w:600})+T(M+150,y,wrap(v,82).slice(0,3),{fs:7}); y+=14+Math.min(3,wrap(v,82).length)*9; }
  y+=10; s+=nearMap(D,M,y,PW-2*M,Math.min(250,PH-60-y));
  return page(D,no,'Over time, and next door','The building stays for decades; the servers leave in batches; the street lives with the plant.',s); }

function nearMap(D,x0,y0,w,h){ const {f,d}=D; if(h<120) return ''; const R=1000, cx=x0+h/2, cy=y0+h/2, sc=(h/2-8)/R; let s=caps(x0,y0-4,'Who lives and works within 1 km');
  for(const r of [200,500,1000]) s+=`<circle cx="${cx}" cy="${cy}" r="${r*sc}" fill="none" stroke="${K.faint}" stroke-width=".5" stroke-dasharray="3 2"/>`+T(cx+r*sc*0.71+2,cy-r*sc*0.71,`${fmt(r)} m`,{fs:5.6,c:K.mute});
  const by={}; for(const p of d.pts||[]){ const dd=Math.hypot(p.x-f.c[0],p.y-f.c[1]); if(dd>R) continue; by[p.t]=by[p.t]||[0,0,0]; by[p.t][dd<=200?0:dd<=500?1:2]++; s+=dot(cx+(p.x-f.c[0])*sc,cy-(p.y-f.c[1])*sc,1.8,TYPEC[p.t]||K.dim); }
  s+=`<rect x="${cx-3}" y="${cy-3}" width="6" height="6" fill="${K.ink}"/>`;
  const X=x0+h+30; let y=y0+10; s+=T(X,y,'Type',{fs:6,c:K.mute})+T(X+150,y,'200 m',{fs:6,c:K.mute,a:'end'})+T(X+190,y,'500 m',{fs:6,c:K.mute,a:'end'})+T(X+230,y,'1 km',{fs:6,c:K.mute,a:'end'}); y+=12;
  for(const [t,c] of Object.entries(by).sort((a,b)=>(b[1][0]+b[1][1]+b[1][2])-(a[1][0]+a[1][1]+a[1][2]))){ s+=dot(X+3,y-2.5,2.4,TYPEC[t]||K.dim)+T(X+10,y,TYPEN[t]||t,{fs:6.6}); [c[0],c[0]+c[1],c[0]+c[1]+c[2]].forEach((v,i)=>{ s+=T(X+150+i*40,y,fmt(v),{fs:6.6,a:'end'}); }); y+=12; }
  s+=T(X,y+8,wrap('Buildings in the tool\'s heat lists (measured, licensed or assessed), counted within each distance. Homes in private houses are not listed.',56),{fs:6,c:K.mute});
  return s; }
function gateMark(x,y,v){ const r=4.4;
  if(v==='yes') return `<circle cx="${x}" cy="${y}" r="${r}" fill="${K.green}"/><path d="M${x-2},${y} l1.5,1.6 l2.8,-3.2" fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>`;
  if(v==='chg') return `<circle cx="${x}" cy="${y}" r="${r}" fill="${K.bg}" stroke="${K.heat}" stroke-width="1.2"/><circle cx="${x}" cy="${y}" r="1.8" fill="${K.heat}"/>`;
  if(v==='no') return `<circle cx="${x}" cy="${y}" r="${r}" fill="${K.red}"/><path d="M${x-1.8},${y-1.8} l3.6,3.6 M${x+1.8},${y-1.8} l-3.6,3.6" stroke="#fff" stroke-width="1.1" stroke-linecap="round"/>`;
  if(v==='nk') return `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${K.dim}" stroke-width=".7" stroke-dasharray="1.6 1.2"/>`+T(x,y+2.2,'?',{fs:6,c:K.mute,a:'middle',w:600});
  return `<line x1="${x-2.5}" y1="${y}" x2="${x+2.5}" y2="${y}" stroke="${K.faint}" stroke-width=".8"/>`; }
function pOpps(D,no){ const {opps,picks}=D; let s=''; const fams=[...new Set(opps.map(o=>o.fam))]; const FC={Heat:K.heat,Electricity:K.cold,Water:'#7fa0ad','Land and time':K.green,People:K.red,Materials:K.mute};
  const GK=['physics','land','rules','demand','time','money']; const ST={yes:['Possible here',K.green],chg:['Possible with a change',K.heat],nk:['Not ruled out',K.mute],no:['Not here',K.red]};
  // the key, first
  let ky=112; s+=caps(M,ky,'How to read the dots: six tests on this lot'); ky+=14; const KEY=[['yes','passes'],['chg','passes with a change'],['nk','not yet known'],['no','fails'],['na','does not apply']];
  let kx=M; for(const [v,l] of KEY){ s+=gateMark(kx+5,ky-2.5,v)+T(kx+14,ky,l,{fs:7}); kx+=14+l.length*3.6+18; }
  // counts by outcome
  let cx=M; ky+=22; for(const k of ['yes','chg','nk','no']){ const n=opps.filter(o=>o.s===k).length; s+=T(cx,ky+4,String(n),{fs:18,w:300,c:n?ST[k][1]:K.faint})+T(cx+(n>9?22:13),ky+4,ST[k][0].toLowerCase(),{fs:6.8,c:K.mute}); cx+=128; }
  const X0=M+64, XM=M+92, XG=M+262, XS=XG+6*13+12, Y0=ky+44, Y1=PH-96; const oy=i=>Y0+(Y1-Y0)*(i+0.5)/opps.length; const famY={};
  fams.forEach(fm=>{ const idx=opps.map((o,k)=>o.fam===fm?k:-1).filter(k=>k>=0); famY[fm]=(oy(idx[0])+oy(idx[idx.length-1]))/2; });
  GK.forEach((g,j)=>{ s+=`<text transform="translate(${XG+j*13+2},${Y0-12}) rotate(-50)" font-size="5.8" fill="${K.mute}">${g}</text>`; });
  s+=caps(XS,Y0-12,'On this lot');
  opps.forEach((o,i)=>{ const y=oy(i), pk=picks.includes(o.n), st=ST[o.s]||ST.nk;
    if(i%2===0) s+=`<rect x="${XM-4}" y="${y-(Y1-Y0)/opps.length/2}" width="${PW-M-XM+4}" height="${(Y1-Y0)/opps.length}" fill="${K.panel}" opacity=".55"/>`;
    s+=`<path d="M${X0+6},${famY[o.fam]} C${(X0+XM)/2},${famY[o.fam]} ${(X0+XM)/2},${y} ${XM-6},${y}" fill="none" stroke="${FC[o.fam]||K.dim}" stroke-width="1" opacity=".6"/>`;
    { const L=wrap(o.n,44).slice(0,2); s+=T(XM,y+2.4-(L.length-1)*4,L,{fs:6.6,lh:8,w:pk?600:300,c:pk?K.red:K.ink}); }
    GK.forEach((g,j)=>{ s+=gateMark(XG+j*13,y,(o.G[g]||[])[0]); });
    const by=v=>GK.filter(g=>(o.G[g]||[])[0]===v); const why=o.s==='no'?`fails: ${by('no').join(', ')}`:o.s==='nk'?`not yet known: ${by('nk').join(', ')}`:o.s==='chg'?`needs a change: ${by('chg').join(', ')}`:'every test passes';
    s+=T(XS,y-0.6,st[0],{fs:6.8,w:600,c:st[1]})+T(XS,y+7.4,why,{fs:6,c:K.mute}); });
  fams.forEach(fm=>{ s+=`<circle cx="${X0}" cy="${famY[fm]}" r="5" fill="${FC[fm]||K.dim}"/>`+T(X0-9,famY[fm]+2.5,fm,{fs:7.4,w:600,a:'end'}); });
  s+=T(M,Y1+22,wrap(`Possible here means every test the tool can run passes; it is not a recommendation. An unknown is a question the tool cannot answer yet, not a failure.${picks.length?' In red: the opportunities chosen for the speculative pages that follow.':''}`,120),{fs:6.4,c:K.mute});
  const n=opps.filter(o=>o.s!=='no').length; return page(D,no,'Opportunities',`${n} of ${opps.length} opportunities are not ruled out on this lot; ${opps.filter(o=>o.s==='yes').length} pass every test.`,s); }
function pSpec(D,no,n){ const R2=BD.report2, pal=R2.PAL.w1, c={m:D.m,f:D.f,d:D.d}; const sd=R2.specData(c,n); let s='';
  const fl=nest(R2.specFlow(n,pal,c),(PW-380)/2,112,380); s+=fl.s; let y=112+fl.h+16;
  const pl=nest(R2.oppPlanSVG(c,n,pal),M,y,230); s+=caps(M,y-4,'Where')+pl.s;
  const X=M+250; let yy=y+4; s+=caps(X,yy,'What it could offer'); yy+=12;
  for(const t of sd.offer.length?sd.offer:['Not yet worked out here.']){ const L=wrap(t,62).slice(0,5); s+=dot(X+3,yy-2.5,2.2,K.green)+T(X+10,yy,L,{fs:6.8}); yy+=L.length*9.2+5; }
  yy+=8; s+=caps(X,yy,'What would have to be true'); yy+=12;
  for(const [k,t] of sd.need.slice(0,9)){ const L=wrap(`${k}: ${t}`,62).slice(0,4); s+=`<polygon points="${X+3},${yy-5.2} ${X+5.6},${yy-2.6} ${X+3},${yy} ${X+0.4},${yy-2.6}" fill="none" stroke="${K.ink}" stroke-width=".5"/>`+T(X+10,yy,L,{fs:6.6}); yy+=L.length*9+4; }
  if(sd.L.basis){ const L=wrap('How proven: '+sd.L.basis,120).slice(0,3); s+=T(M,Math.max(yy,y+pl.h)+18,L,{fs:6.4,c:K.mute}); }
  const RD={built_here:'built here',built_elsewhere:'built elsewhere',pilot:'a pilot',speculative:'speculative'}, GW={yes:'possible here',chg:'possible with a change',nk:'not ruled out',no:'not here'};
  return page(D,no,n,`Speculative. On this lot: ${GW[sd.sum]||'not tested'}. How proven elsewhere: ${RD[sd.L.readiness]||'not yet rated'}.`,s); }

async function pOptions(D,no){ const {e,f,near,nets,A}=D; const opts=e.optionSet(f,near,nets).map(o=>Object.assign(o,{r:e.calc(o,f,near,nets)})); let s=''; const cw=(PW-2*M-20)/3; const keep=JSON.stringify(A);
  try{ opts.forEach((o,i)=>{ A.mw=o.mw; A.inside=o.recover?'plate':'air'; BD.modelReset(); BD.model(); const x=M+i*(cw+10); const iso=siteIso({x0:x,y0:110,x1:x+cw,y1:300},{pipe:o.recover,air:!o.recover,grid:false,pad:0.06}); s+=iso.s;
    s+=T(x,318,`${o.id.toUpperCase()}. ${o.name}`,{fs:8,w:600})+T(x,330,wrap(o.gives,40).slice(0,3),{fs:6.4,c:K.mute}); const miss=BD.setupProblems?BD.setupProblems(true):[]; if(miss.length) s+=T(x,358,wrap('Does not fit at this size: '+miss[0],40).slice(0,2),{fs:6.2,c:K.red}); }); }
  finally{ Object.keys(A).forEach(k=>delete A[k]); Object.assign(A,JSON.parse(keep)); BD.modelReset(); BD.model(); }
  const groups=[['Servers','MW',o=>[o.mw,o.mw]],['Electricity a year','GWh',o=>[o.r.facMWh[0]/1000,o.r.facMWh[1]/1000]],['Heat offered a year','GWh',o=>o.recover?[o.r.avail[0]/1000,o.r.avail[1]/1000]:[0,0]],['Plant space','m²',o=>[o.r.plant[0],o.r.plant[1]]]];
  let y=390; const OC=[K.faint,K.heat,K.ink];
  for(const [l,u,fn] of groups){ s+=caps(M,y,`${l}, ${u}`); y+=8; const rows=opts.map((o,i)=>{ const [a,b]=fn(o); return {l:`${o.id.toUpperCase()}`,v:a,hi:b,t:a||b?rng(a,b,'',u==='MW'?1:0):'none',c:OC[i]}; }); const hb=hbars(M,y,PW-2*M,rows,{lw:20,step:11}); s+=hb.s; y+=hb.h+12; }
  s+=T(M,y+4,wrap('A is half the chosen size, air-cooled; B is the chosen size with heat to neighbours; C is the largest that fits. Each gains and gives up something: more heat offered means more plant, more electricity and more pipe in the street.',120),{fs:7});
  return page(D,no,'Three options','Three ways to build on this lot: what each gains and what each gives up.',s); }

function pCities(D,no){ const {refs,EC,worth,f}=D; let s=''; const here=refs.find(x=>x.id==='here'), ed=refs.find(x=>x.id==='edmd'), vm=refs.find(x=>x.id==='vanm');
  const van=f.city==='van'?here:vm, edm=f.city==='edm'?here:ed; if(!van||!edm) return '';
  const pairs=[['Grid carbon of the electricity','t CO₂e a year',van.n.co2,edm.n.co2],['What a MWh of heat is worth','$ after the heat pump',[worth('van'),worth('van')],[worth('edm'),worth('edm')]],['Gas the heat replaces','$ per GJ',[EC.gas.van/3.6,EC.gas.van/3.6],[EC.gas.edm/3.6,EC.gas.edm/3.6]],['Electricity, energy charges','$ per MWh, demand charges left out',[EC.elec.van,EC.elec.van],[EC.elec.edm,EC.elec.edm]],['Hours at or below about 8 °C','a year, dry coolers alone (CWEC typical year)',[3300,3300],[5500,5500]],['Rain on the worked-example roof','m³ a year',[van.site&&van.site.roof?van.site.roof*1.1595*0.8:0,0],[edm.site&&edm.site.roof?edm.site.roof*0.4225*0.8:0,0]]];
  let y=128; const X0=M+200, X1=PW-M-90; const lab=(c,a)=>`${c} ${a[0]<0.5&&a[0]>-0.5&&a[1]===a[0]?'about 0':a[1]!==a[0]&&a[1]?rng(a[0],a[1],''):n0(a[0])}`;
  for(const [l,u,a,b] of pairs){ const mx=Math.max(a[1]||a[0],b[1]||b[0],1e-9); s+=T(M,y+6,l,{fs:7.4,w:400})+T(M,y+15,u,{fs:6,c:K.mute});
    const w1=Math.max(0,(X1-X0)*(a[1]||a[0])/mx), w2=Math.max(0,(X1-X0)*(b[1]||b[0])/mx); s+=`<rect x="${X0}" y="${y}" width="${w1}" height="8" fill="${K.cold}"/>`+T(X0+w1+4,y+7,lab('Vancouver',a),{fs:6.4});
    s+=`<rect x="${X0}" y="${y+11}" width="${w2}" height="8" fill="${K.heat}"/>`+T(X0+w2+4,y+18,lab('Edmonton',b),{fs:6.4}); y+=46; }
  s+=T(M,y+6,wrap('The same servers and the same design in both cities. What changes is the grid that powers them, the climate that cools them, the price of the gas their heat would replace, and the rules. Rain is for each worked-example lot\'s roof.',118),{fs:7.4});
  y+=40; const ld=D.lead('cities'); if(ld){ s+=caps(M,y,'In the tool'); y+=12; s+=T(M,y,wrap(ld,110).slice(0,3),{fs:7.4}); y+=34; }
  for(const [k,v] of D.secs('cities').slice(0,8)){ const L=wrap(v,80).slice(0,3); s+=T(M,y,k,{fs:7.2,w:600})+T(M+170,y,L,{fs:7}); y+=Math.max(14,L.length*9.2+6); if(y>PH-70) break; }
  return page(D,no,'Two cities','The same data centre in Vancouver and Edmonton: the grid, the climate and the price of gas change what it gives.',s); }

/* ---------- the report ---------- */
const FALLBACK={resident:['cover','fits','flows','time','opps','spec','sources'],community:['cover','fits','flows','heat','power','water','time','opps','spec','options','cities','sources'],full:['cover','fits','flows','heat','power','water','time','opps','spec','options','cities','logic','sources']};
const PAGES_T={cover:'The lot',fits:'What fits',flows:'What moves in and out',heat:'Heat',power:'Power',water:'Water',time:'Over time, and next door',opps:'Opportunities',spec:'Could become',options:'Three options',cities:'Two cities',logic:'How it is worked out',sources:'Sources'};
function plan(t){ const R=BD.TPL&&BD.TPL.reports; return R&&R[t]?R[t].map(p=>p.id):FALLBACK[t]||FALLBACK.full; }
async function pages(D){ const out=[]; let k=1; const nn=()=>String(k++).padStart(2,'0'); D.plan=plan(D.tier);
  for(const id of D.plan){ if(id==='cover') out.push(pCover(D)); else if(id==='fits') out.push(pSite(D,nn())); else if(id==='flows') out.push(pFlows(D,nn())); else if(id==='heat') out.push(pHeat(D,nn()));
    else if(id==='power') out.push(pPower(D,nn())); else if(id==='water') out.push(pWater(D,nn())); else if(id==='time') out.push(pTime(D,nn())); else if(id==='opps') out.push(pOpps(D,nn()));
    else if(id==='spec'){ for(const n of D.picks) out.push(pSpec(D,nn(),n)); } else if(id==='options') out.push(await pOptions(D,nn())); else if(id==='cities'){ const c=pCities(D,nn()); if(c) out.push(c); } else if(id==='logic') out.push(pLogic(D,nn())); }
  return out.filter(Boolean); }
// the three templates and their reports, drawn small: this one lit (cover and the logic page)
function templatesStrip(D,x,y,w){ const T0=[['resident','What it means for me'],['community','What it means for the neighbourhood'],['full','How it is worked out']]; let s=caps(x,y,'Three reports, one for each template; this one in ink'); y+=12; const TT=T0;
  const ids=Object.keys(PAGES_T); const cw=Math.min(28,(w-150)/ids.length);
  ids.forEach((id,i)=>{ s+=`<text transform="translate(${x+150+i*cw+3},${y+4}) rotate(-40)" font-size="5.2" fill="${K.mute}">${esc(PAGES_T[id])}</text>`; }); y+=10;
  for(const [t,nm] of TT){ const me=t===D.tier, L=plan(t); s+=T(x,y+6,nm,{fs:6.6,w:me?600:300,c:me?K.ink:K.mute});
    ids.forEach((id,i)=>{ const on=L.includes(id), px=x+150+i*cw; s+=on?`<rect x="${px}" y="${y}" width="${cw*0.62}" height="8" fill="${me?K.ink:K.faint}"/>`:`<rect x="${px}" y="${y}" width="${cw*0.62}" height="8" fill="none" stroke="${K.line}" stroke-width=".5"/>`; });
    s+=T(x+150+ids.length*cw+4,y+6.5,`${L.filter(i=>i!=='sources').length} sections`,{fs:6,c:me?K.ink:K.mute}); y+=13; }
  return {s,h:y}; }
function pLogic(D,no){ const G=BD.TPL&&BD.TPL.graph, N=BD.TPL&&BD.TPL.nodes; if(!G||!N) return ''; let s='';
  const st=G.stages, col={}; st.forEach(([c])=>col[c]=[]); G.nodes.forEach(([id,sg])=>(col[sg]||(col[sg]=[])).push(id)); const ins={}; G.edges.forEach(([a,b])=>(ins[b]=ins[b]||[]).push(a));
  const X0=M+4, X1=PW-M-4, Y0=150, Y1=560, cwid=(X1-X0)/st.length, pos={};
  st.forEach(([c,name],j)=>{ const L=col[c]||[]; const key=id=>{ const f=(ins[id]||[]).map(k=>pos[k]).filter(Boolean); return f.length?f.reduce((a,q)=>a+q[1],0)/f.length:1e4+L.indexOf(id); }; const nc=Math.ceil(L.length/34), rows=Math.ceil(L.length/nc), gy=(Y1-Y0)/34;
    L.sort((a,b)=>key(a)-key(b)).forEach((id,i)=>{ pos[id]=[X0+j*cwid+10+(i%nc)*12, Y0+Math.floor(i/nc)*gy+(34-rows)*gy/2]; });
    s+=T(X0+j*cwid+6,Y0-22,wrap(name,16).slice(0,2),{fs:6.4,w:600}); s+=`<line x1="${X0+j*cwid}" y1="${Y0-30}" x2="${X0+j*cwid}" y2="${Y1+6}" stroke="${K.line}" stroke-width=".4"/>`; });
  const TC={resident:K.ink,community:K.heat,full:K.faint}; const rank={resident:0,community:1,full:2};
  for(const [a,b] of G.edges){ const p=pos[a], q=pos[b]; if(!p||!q) continue; s+=`<path d="M${p[0]},${p[1]} C${(p[0]+q[0])/2},${p[1]} ${(p[0]+q[0])/2},${q[1]} ${q[0]},${q[1]}" fill="none" stroke="${K.dim}" stroke-width=".35" opacity=".5"/>`; }
  for(const [id,[x,y]] of Object.entries(pos)){ const t=(N[id]||{}).tier||'full'; s+=dot(x,y,2.2,TC[t]); }
  let y=Y1+30; s+=caps(M,y,'Each dot is one part of the tool; colour is the first report that shows it'); y+=14; let x=M;
  for(const [t,l] of [['resident','in all three reports'],['community','neighbourhood and full reports'],['full','full report only']]){ const n=Object.values(N).filter(v=>v.tier===t).length; s+=dot(x+3,y-2.5,3,TC[t])+T(x+10,y,`${l} (${n})`,{fs:7}); x+=170; }
  y+=24; s+=T(M,y,wrap('Every part runs in every report; a report only changes what is shown. The full report lists, for each result, the parts it is worked out from (see the appendix). Lines are what feeds what.',120),{fs:7.2});
  y+=40; const st2=templatesStrip(D,M,y,PW-2*M); s+=st2.s;
  return page(D,no,'How it is worked out',`${Object.keys(N).length} parts in ${st.length} stages, from the lot to what could become.`,s); }
async function view(){ BD.flow.capture&&BD.flow.capture(); BD.S.view2='tab'; BD.S.tab='report'; BD.scene3d&&BD.scene3d.hide(); document.body.classList.add('wide');
  const sd=document.getElementById('side'); sd.innerHTML='<h2>Report</h2><p class="sub">Drawing the report…</p>'; await BD.oppPrep(); const D=await collect(); const P=await pages(D);
  sd.innerHTML=`<h2>Report</h2><p class="lead">${esc(D.level)}: <span class="k">${esc(D.site.addr)}</span>, ${esc(D.site.city)}. ${P.length} pages.</p><p class="sub">Change “Showing” above for the report at another level.</p>
   <div class="rbtns">${BD.dl?`<button class="pri" id="rPdf">Download PDF</button>`:'<p class="sub">Downloads are not available in this view.</p>'}</div><p class="sub" id="rMsg"></p>
   <div class="rpages">${P.map(p=>`<div class="rpage">${p}</div>`).join('')}</div>${D.D.srcs.length?`<details class="fp"><summary>Sources (${D.D.srcs.length})</summary>${D.D.srcs.map(x=>`<p class="src">${esc(x)}</p>`).join('')}</details>`:''}`;
  BD.draw(); const msg=t=>{ const m=document.getElementById('rMsg'); if(m) m.textContent=t; };
  const pb=document.getElementById('rPdf'); if(pb) pb.onclick=async()=>{ pb.disabled=true; msg('Building the PDF…'); try{ const blob=await pdf(D,P); await BD.dl.save({filename:`beyond-data-report-${D.site.addr.replace(/[^A-Za-z0-9]+/g,'-').toLowerCase()}.pdf`,data:blob}); msg('Saved.'); }catch(err){ console.warn(err); msg(err&&err.code==='declined'?'Not saved.':'The PDF was not saved'+(err&&(err.code||err.message)?` (${err.code||err.message})`:'')+'.'); } finally{ pb.disabled=false; } }; }
const LIB='https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
const load=src=>new Promise((ok,no)=>{ const s=document.createElement('script'); s.src=src; s.onload=ok; s.onerror=()=>no(new Error('could not load the PDF library')); document.head.appendChild(s); });
async function b64(url){ const b=new Uint8Array(await (await fetch(url)).arrayBuffer()); let s=''; for(let i=0;i<b.length;i+=0x8000) s+=String.fromCharCode.apply(null,b.subarray(i,i+0x8000)); return btoa(s); }
function img(svg,wpx){ return new Promise((ok,no)=>{ const s=svg.replace('width="100%"',`width="${wpx}" height="${wpx*PH/PW}"`); const im=new Image(); im.onload=()=>{ const cv=document.createElement('canvas'); cv.width=wpx; cv.height=Math.round(wpx*PH/PW); const x=cv.getContext('2d'); x.fillStyle='#ffffff'; x.fillRect(0,0,cv.width,cv.height); x.drawImage(im,0,0,cv.width,cv.height); ok(cv.toDataURL('image/jpeg',0.9)); }; im.onerror=()=>no(new Error('a page could not be drawn')); im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s); }); }
async function pdf(D,P){ if(!window.jspdf) await load(LIB); const {jsPDF}=window.jspdf; const doc=new jsPDF({unit:'pt',format:'letter'});
  try{ const [l,sb]=await Promise.all([b64('fonts/Barlow-Light.ttf'),b64('fonts/Barlow-SemiBold.ttf')]); doc.addFileToVFS('BL.ttf',l); doc.addFont('BL.ttf','Barlow','normal'); doc.addFileToVFS('BS.ttf',sb); doc.addFont('BS.ttf','Barlow','bold'); }catch(e){}
  const FN=doc.getFontList().Barlow?'Barlow':'helvetica';
  for(let i=0;i<P.length;i++){ if(i) doc.addPage(); doc.addImage(await img(P[i],1836),'JPEG',0,0,PW,PH); }
  // the sources and the appendix as text (selectable)
  const tx=(t,o)=>{ o=o||{}; doc.setFont(FN,o.bold?'bold':'normal'); doc.setFontSize(o.size||7.5); doc.setTextColor(...(o.color||[95,93,88])); for(const ln of doc.splitTextToSize(String(t).replace(/[₂]/g,'2').replace(/[→]/g,'to'),PW-2*M)){ if(y>PH-50){ doc.addPage(); bgp(); y=60; } doc.text(ln,M,y); y+=(o.size||7.5)*1.4; } y+=o.after||0; };
  const bgp=()=>{ doc.setFillColor(255,255,255); doc.rect(0,0,PW,PH,'F'); }; let y=60;
  doc.addPage(); bgp(); tx('Read with',{size:13,bold:true,color:[29,30,32],after:6}); tx('Ranges, not designs: screening figures from published sources, not a substitute for an engineer, a utility study or a permit review. Operator figures are claims. Heat offered is not heat used.',{size:8.5,after:14});
  if(D.D.left.length){ tx('Left out at this level',{size:10,bold:true,color:[29,30,32],after:4}); tx(D.D.left.join(' · ')+'. They still count in every result.',{after:12}); }
  if(D.tier==='full'){ tx('What each result is worked out from',{size:10,bold:true,color:[29,30,32],after:4}); for(const G of D.D.groups) for(const n of G.items) for(const sct of n.secs) if(sct[2]&&sct[2].length) tx(`${n.title} · ${sct[0]}: ${sct[2].join(' · ')}`,{size:6.8,after:2}); y+=10; }
  tx('Sources',{size:10,bold:true,color:[29,30,32],after:4}); for(const s of D.D.srcs) tx(s,{size:6.6,after:2});
  return doc.output('blob'); }
BD.report3={collect,pages,pdf,view};
BD.views=BD.views||{}; BD.views.report=view;
{ const st=document.createElement('style'); st.textContent='.rpages{display:flex;flex-direction:column;gap:14px;margin:12px 0}.rpage{box-shadow:0 1px 6px rgba(0,0,0,.35);border-radius:2px;overflow:hidden;background:#fff}.rpage svg{display:block}'; document.head.appendChild(st); }
})();
