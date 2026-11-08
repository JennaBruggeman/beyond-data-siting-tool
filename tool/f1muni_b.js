/* Beyond Data — F1 Municipal cards, group 'b' (CODE_JOB_F1 step 3): height and floor area, yards, noise, storeys and frontage, loading, rooftop.
   Rule diagrams only: the lot and its regulations (lot lines, yard lines, height lines, dimensions, zones), each labelled with its clause. No massing, no buildings, no equipment,
   no predicted levels. Every figure comes from the tool's model (BD.model: Z, edgeYards, yardLine, loadingNeed) and files (tool/data/zones.json, noise.json, arch.json);
   what the tool does not hold is C.q() and listed in missing. The Architecture design (x.arch) is never called. */
(function(){
'use strict';
const BD=window.BD, C=BD.f1cards, K=C.K, esc=C.esc, n0=C.n0, n1=C.n1, T='municipal';
if(!document.getElementById('f1c-mb')){ const s=document.createElement('style'); s.id='f1c-mb';
  s.textContent=`.f1c-mb-wrap{display:flex;flex-direction:column;align-items:flex-start;width:100%}.f1c-mb-note{margin-top:12px;max-width:860px;border-left:2px solid #CC746C;padding:1px 0 1px 12px;font-size:12.5px;color:#4A4D52}
.f1c-mb-ed{width:100%;max-width:900px;border-collapse:collapse;font-size:12.5px;margin-top:10px}.f1c-mb-ed td{padding:5px 10px 5px 0;border-top:1px solid #ECECEC;vertical-align:top;color:#4A4D52}.f1c-mb-ed td:first-child{width:26px}
.f1c-mb-ed b.l{display:inline-block;width:18px;height:18px;line-height:17px;border-radius:50%;border:1px solid #16181B;color:#16181B;font-weight:400;font-size:11px;text-align:center}.f1c-mb-wrap svg{flex:none;max-width:none}.f1c-mb-ed.two{display:block;column-count:2;column-gap:28px}.f1c-mb-ed.two tbody{display:block}.f1c-mb-ed.two tr{display:flex;break-inside:avoid;width:100%}.f1c-mb-ed.two td:first-child{flex:none}.f1c-mb-ed small{display:block;color:#7B7E83;font-size:11px}`;
  document.head.appendChild(s); }
const FONT='font-family="IBM Plex Sans,system-ui,sans-serif"';
const RED=K.red;
/* ---------- helpers ---------- */
const clause=(Z,re)=>{ const c=((Z&&Z.cl)||[]).find(r=>re.test(r[0])); return c?{k:c[0],t:c[1],s:c[2]}:null; };
const shortS=s=>String(s||'').replace(/\s*\(.*$/,'');
const wrap=(s,n)=>{ const w=String(s||'').split(/\s+/), L=[]; let cur=''; for(const a of w){ if((cur+' '+a).trim().length>n&&cur){ L.push(cur); cur=a; } else cur=(cur+' '+a).trim(); } if(cur) L.push(cur); return L; };
/* text block: lines with the first in weight 500 (title) then notes; anchor 'start' | 'end' */
function tb(x,y,lines,o){ o=o||{}; const a=o.anchor||'start'; let out='', yy=y;
  lines.forEach((l,i)=>{ const t=typeof l==='string'?{t:l}:l, big=i===0&&!o.flat; out+=`<text x="${x}" y="${yy.toFixed(1)}" text-anchor="${a}" font-size="${t.fs||(big?13:11.5)}" font-weight="${t.w||(big?500:400)}" fill="${t.c||(big?K.ink:K.mute)}">${t.html||esc(t.t)}</text>`; yy+=(t.dy||(big?15:14)); });
  return out; }
const redQ='<tspan fill="'+RED+'">?</tspan>';
const hasQ=(Z,f)=>!!Z&&(!!Z.assumed||(Z.q||[]).includes(f)); /* a field the zone row does not give: the tool borrows another zone's figure only to draw */
const zoneName=(x)=>x.sel&&x.sel.a?String(x.city==='van'?(x.sel.a[1]||''):(x.sel.a[2]||x.sel.a[1]||'')).trim():'?';
const ringArea=r=>{ let s=0; for(let i=0,j=r.length-2;i<r.length;j=i,i+=2) s+=r[j]*r[i+1]-r[i]*r[j+1]; return Math.abs(s)/2; };
const streetsD=async(city,f,bb)=>{ const st=await BD.streets(city); if(!st) return ''; let sd=''; for(const g of st.segs){ let ok=false; for(let i=2;i+1<g.length;i+=2) if(g[i]>=bb[0]&&g[i]<=bb[2]&&g[i+1]>=bb[1]&&g[i+1]<=bb[3]){ ok=true; break; } if(!ok) continue;
  for(let i=2;i+1<g.length;i+=2){ const [a,b]=f.P(g[i],g[i+1]); sd+=(i>2?'L':'M')+a.toFixed(1)+' '+b.toFixed(1); } } return sd; };
const KN={front:'Front',side:'Side',rear:'Rear',flank:'Flank',unclear:'Unclear'};
const ourReading=e=>e.kind==='unclear'||/our reading/i.test(e.why||'');
const abutWord=a=>!a?'':/^street/.test(a)?'street':/^alley/.test(a)?(window.__f1mbCity==='van'?'lane':'alley'):/^lot/.test(a)?'neighbouring lot':a;
const srcStreets=city=>`Streets: ${city==='van'?'City of Vancouver':'City of Edmonton'} street centrelines (tool/streets_${city}.json).`;
const srcZone=x=>`Zone limits and clauses: tool/data/zones.json, row ${(x.M.Z&&(x.M.Z.vkey||x.M.Z.key))||'?'} (${((C.dcStatus?C.dcStatus(x.city,(x.M.Z&&(x.M.Z.vkey||x.M.Z.key))||'').src:[])||[]).join(', ')||'envelope'}).`;
/* ---------- the lot plan (Final_C style): lot, yard line, edges, up to four straight leaders to side labels ---------- */
const PW={W:910,H:450,X0:215,Y0:10,S:430};
function segHit(a,b,c,d){ const o=(p,q,r)=>(q[0]-p[0])*(r[1]-p[1])-(q[1]-p[1])*(r[0]-p[0]); const d1=o(a,b,c), d2=o(a,b,d), d3=o(c,d,a), d4=o(c,d,b); return d1*d2<0&&d3*d4<0; }
async function plan(x,opt){ opt=opt||{}; const M=x.M, r=x.sel.ring; if(!r||!M||!M.Z) return null; window.__f1mbCity=x.city; PW.X0=opt.X0||215;
  const E=(M.edgeYards||[]).filter(e=>isFinite(e.ax)), b=C.bbox(r), cx=(b[0]+b[2])/2, cy=(b[1]+b[3])/2, half=Math.max(b[2]-b[0],b[3]-b[1])/2*1.5+4;
  const bb=[cx-half,cy-half,cx+half,cy+half], f=C.frame(bb,PW.S,PW.S,0), P=(px,py)=>{ const p=f.P(px,py); return [p[0]+PW.X0,p[1]+PW.Y0]; };
  const st=await streetsD(x.city,f,bb), gc=P(cx,cy), yl=M.yardLine&&!M.yardOffBad?M.yardLine:null;
  const ringS=[]; for(let i=0;i<r.length;i+=2) ringS.push(P(r[i],r[i+1]));
  const edges=E.map((e,i)=>{ const a=P(e.ax,e.ay), c=P(e.bx,e.by), mx=(a[0]+c[0])/2, my=(a[1]+c[1])/2; let nx=-(c[1]-a[1]), ny=c[0]-a[0]; const L=Math.hypot(nx,ny)||1; nx/=L; ny/=L;
    const ins=BD.pip(e.ax*0.5+e.bx*0.5-0,e.ay*0.5+e.by*0.5,r); /* midpoint is on the ring; test a step inside */
    const tx=(e.ax+e.bx)/2, ty=(e.ay+e.by)/2, wl=Math.hypot(e.bx-e.ax,e.by-e.ay)||1, wnx=-(e.by-e.ay)/wl, wny=(e.bx-e.ax)/wl; /* world normal; make it point out of the lot */
    const inside=BD.pip(tx+wnx*0.5,ty+wny*0.5,r); const sgn=inside?-1:1; /* screen y is flipped: recompute the screen normal from the world one */
    const o1=P(tx,ty), o2=P(tx+wnx*sgn,ty+wny*sgn); let sx=o2[0]-o1[0], sy=o2[1]-o1[1]; const sl=Math.hypot(sx,sy)||1; sx/=sl; sy/=sl;
    return Object.assign({},e,{idx:i,letter:String.fromCharCode(65+i),a,c,mx,my,nx:sx,ny:sy,wnx:wnx*sgn,wny:wny*sgn,wmx:tx,wmy:ty,slen:Math.hypot(c[0]-a[0],c[1]-a[1])}); });
  /* leaders: straight and horizontal, label at the anchor's height; the anchor slides along its own edge until the line crosses nothing (rules 9, 10) */
  const used={L:[],R:[]};
  function lead(items){ const out=[]; for(const it of items){ if(out.length>=4) break; const e=it.e; const tryS=e.nx<-0.15?['L','R']:e.nx>0.15?['R','L']:(e.mx<PW.X0+PW.S/2?['L','R']:['R','L']);
    let done=false; for(const side of tryS){ for(const t of [0.5,0.38,0.62,0.26,0.74,0.15,0.85]){ const ax=e.a[0]+(e.c[0]-e.a[0])*t, ay=e.a[1]+(e.c[1]-e.a[1])*t; if(ay<PW.Y0+22||ay>PW.Y0+PW.S-22) continue; if(used[side].some(y=>Math.abs(y-ay)<(it.gap||44))) continue;
        const dir=side==='L'?-1:1, ex=side==='L'?PW.X0-8:PW.X0+PW.S+8; let ok=true; for(let k=0;k<ringS.length;k++){ const p=ringS[k], q=ringS[(k+1)%ringS.length]; if(Math.abs(p[0]-e.a[0])<1e-6&&Math.abs(p[1]-e.a[1])<1e-6&&Math.abs(q[0]-e.c[0])<1e-6&&Math.abs(q[1]-e.c[1])<1e-6) continue; if(segHit([ax+dir*0.8,ay],[ex,ay],p,q)){ ok=false; break; } }
        if(!ok) continue; used[side].push(ay); out.push({it,side,ax,ay}); done=true; break; } if(done) break; } } return out; }
  return {M,r,E,edges,f,P,bb,st,yl,ringS,gc,lead,lotPath:C.pathOf([r],P),ylPath:yl?C.pathOf([yl],P):''}; }
/* the plan svg body: ground square with streets, lot, yard line, edges, scale bar */
function planBody(pl,id,o){ o=o||{}; const {st,P}=pl, S=PW.S;
  return `<defs><clipPath id="${id}"><rect x="${PW.X0}" y="${PW.Y0}" width="${S}" height="${S}"/></clipPath></defs><rect x="${PW.X0}" y="${PW.Y0}" width="${S}" height="${S}" fill="${K.ground}"/>
   <g clip-path="url(#${id})"><path d="${st}" fill="none" stroke="#fff" stroke-width="1.8"/><path d="${pl.lotPath}" fill="#fff" stroke="none"/>${o.under||''}${pl.yl?`<path d="${pl.ylPath}" fill="${K.fillSup}" stroke="${K.ink2}" stroke-width="1" stroke-dasharray="5 4"/>`:''}${o.over||''}
   ${pl.edges.map(e=>`<line x1="${e.a[0].toFixed(1)}" y1="${e.a[1].toFixed(1)}" x2="${e.c[0].toFixed(1)}" y2="${e.c[1].toFixed(1)}" stroke="${K.ink}" stroke-width="${e.kind==='front'?4:1.8}"/>`).join('')}</g>`; }
const niceM=(f)=>{ for(const m of [5,10,20,25,50,100]) if(m*f>=70) return m; return 100; };
const north=(x,y)=>`<text x="${x}" y="${y}" ${FONT} font-size="11" fill="${K.mute}">N ↑</text>`;
const marker=(e)=>{ if(e.slen<16) return ''; const px=e.mx+e.nx*13, py=e.my+e.ny*13; return `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="8" fill="#fff" stroke="${K.ink}" stroke-width="0.8"/><text x="${px.toFixed(1)}" y="${(py+4).toFixed(1)}" text-anchor="middle" font-size="11" fill="${K.ink}">${e.letter}</text>`; };
function leaderSvg(placed,labels){ let s=''; for(const p of placed){ const L=labels(p.it); const x1=p.side==='L'?PW.X0-8:PW.X0+PW.S+8, tx=p.side==='L'?PW.X0-14:PW.X0+PW.S+14, anc=p.side==='L'?'end':'start';
    s+=`<circle cx="${p.ax.toFixed(1)}" cy="${p.ay.toFixed(1)}" r="2.2" fill="${K.ink}"/><line x1="${p.ax.toFixed(1)}" y1="${p.ay.toFixed(1)}" x2="${x1}" y2="${p.ay.toFixed(1)}" stroke="${K.ink}" stroke-width="0.5"/>`+tb(tx,p.ay-3,L,{anchor:anc}); } return s; }
const keyI=(bg,bd,t,dash)=>`<span><i style="background:${bg};border-color:${bd}"></i>${t}</span>`;
const keyL=(col,t,dash,w)=>`<span><i class="ln" style="border-color:${col};${dash?'border-top-style:dashed;':''}${w?`border-top-width:${w}px;`:''}"></i>${t}</span>`;
const edgeKey=(pl)=>keyL(K.ink,'lot line (front line heavier)',false)+(pl.yl?keyL(K.ink2,'yard line',true)+keyI(K.fillSup,K.ink2,'inside the yards'):'<span>yard line not drawn (no yard figure, or it folds on this lot)</span>');
const noLot=()=>({draw:'<p class="f1v-empty">No lot loaded.</p>'});
/* ---------- the rule section (A07 section lines): ground, limit lines on one metre scale ---------- */
function secFrame(topM,o){ o=o||{}; const SX0=o.SX0||120, SX1=o.SX1||520, GY=o.GY||360, SH=o.SH||290, sc=SH/topM, yOf=h=>GY-h*sc, step=topM>60?10:topM>25?5:2;
  let ax=`<line x1="${SX0}" y1="${GY}" x2="${SX0}" y2="${yOf(topM)}" stroke="${K.ink}" stroke-width="1"/>`; for(let h=0;h<=topM;h+=step) ax+=`<line x1="${SX0-4}" y1="${yOf(h)}" x2="${SX0}" y2="${yOf(h)}" stroke="${K.faint}" stroke-width="0.6"/><text x="${SX0-8}" y="${yOf(h)+4}" text-anchor="end" font-size="11" fill="${K.mute}">${h}</text>`;
  ax+=`<text x="${SX0}" y="${yOf(topM)-12}" text-anchor="middle" font-size="11.5" fill="${K.mute}">metres above ground</text>`;
  const ground=`<rect x="${SX0}" y="${GY}" width="${SX1-SX0}" height="14" fill="${K.plant}"/><line x1="${SX0}" y1="${GY}" x2="${SX1}" y2="${GY}" stroke="${K.ink}" stroke-width="1.8"/>`;
  return {SX0,SX1,GY,SH,sc,yOf,ax,ground,step}; }
const dimV=(x,y0,y1,lab,o)=>{ o=o||{}; const my=(y0+y1)/2, big=Math.abs(y1-y0)>=26; return `<line x1="${x}" y1="${y0}" x2="${x}" y2="${y1}" stroke="${o.c||K.ink}" stroke-width="1"/><path d="M${x-3.5} ${y0-0}h7M${x-3.5} ${y1}h7" stroke="${o.c||K.ink}" stroke-width="1"/>`+(lab?`<text x="${x+(o.side==='L'?-7:7)}" y="${(big?my+4:y1-6).toFixed(1)}" text-anchor="${o.side==='L'?'end':'start'}" font-size="12.5" font-weight="500" fill="${o.lc||K.ink}">${lab}</text>`:''); };
const lineH=(sec,y,o)=>`<line x1="${sec.SX0}" y1="${y}" x2="${sec.SX1}" y2="${y}" stroke="${o.c||K.ink}" stroke-width="${o.w||1.6}" ${o.dash?'stroke-dasharray="6 4"':''}/>`;
const gcite=(Z,x)=>x.city==='van'?'Zoning and Development By-law':'Zoning Bylaw 20001';

/* ===== M5 Height and floor area ===== */
C.add(T,'Height and floor area',{async build(x){
  const M=x.M, Z=M&&M.Z; if(!Z||!x.sel.ring) return noLot();
  const hq=hasQ(Z,'h'), fq=hasQ(Z,'fsr'), H0=hq?null:Z.hOutright, hx=hq||!Z.hx?null:Z.hx, fsr=fq?null:Z.fsr, hc=clause(Z,/^Height/i), fc=clause(Z,/^Floor area/i), area=x.sel.lotArea;
  const topM=Math.ceil(Math.max(H0||0,hx?hx[1]:0,20)*1.12/5)*5, sec=secFrame(topM,{GY:330,SH:260,SX0:110,SX1:470}), y=sec.yOf, W=900, ap=hx&&hx[1]!==hx[0];
  const hxTxt=hx?(hx[0]===hx[1]?n1(hx[0]):n1(hx[0])+' to '+n1(hx[1])):'';
  let s=sec.ax+(hx?`<rect x="${sec.SX0}" y="${y(hx[1])}" width="${sec.SX1-sec.SX0}" height="${(y(hx[0])-y(hx[1])).toFixed(1)}" fill="${K.fillSup}" opacity="0.7"/>`:'')+sec.ground
   +(H0?lineH(sec,y(H0),{w:1.8}):'')+(hx?lineH(sec,y(hx[0]),{dash:1,c:K.ink2,w:1.2})+(ap?lineH(sec,y(hx[1]),{dash:1,c:K.ink2,w:1.2}):''):'');
  const RX=sec.SX1+16;
  s+=tb(RX,sec.GY+4,[{t:'Ground line',fs:13,w:500,c:K.ink},{html:`Heights are measured from grade; which grade the by-law uses is not settled ${redQ}`}]);
  s+=H0?tb(RX,y(H0)-1,[`Height limit ${n1(H0)} m`,{t:hc?shortS(hc.s):''}]):tb(RX,y(topM*0.5),[{html:`Height limit ${redQ}`,c:K.ink,fs:13,w:500},{t:hq&&!Z.assumed?'the by-law gives none for this zone; the tool borrows another zone’s figure to draw':'no data-centre limit in the tool for this zone'}]);
  if(hx) s+=tb(RX,y(hx[0])-(ap?y(hx[0])-y(hx[1])>40?(y(hx[0])-y(hx[1]))/2-12:16:1)+(ap?0:0),[{t:`With approval, up to ${hxTxt} m`,fs:13,w:500,c:K.ink2},{t:hc?shortS(hc.s):''}]);
  else if(H0) s+=tb(RX,y(H0)-(y(H0)-y(topM))/2,[{t:'With approval',fs:13,w:500,c:K.ink2},{t:Z.assumed?'':'no separate figure; see the clause in the panel'}]);
  /* the floor space ratio as a meter (STYLE.md section 5): lot area = 1.0, the allowance as a bar, a tick at the most */
  const MY=y(0)+70, MX0=sec.SX0, MX1=sec.SX1, fmax=fsr?Math.max(fsr[1],1):1, scaleMax=Math.max(Math.ceil(fmax*1.15),2), px=v=>MX0+(MX1-MX0)*v/scaleMax;
  s+=`<text x="${MX0}" y="${MY-16}" font-size="13" font-weight="500" fill="${K.ink}">Floor space ratio</text><text x="${MX0}" y="${MY-2}" font-size="11.5" fill="${K.mute}">floor area as a multiple of the lot’s area (1.0 = the lot)</text>`;
  s+=`<rect x="${MX0}" y="${MY+10}" width="${MX1-MX0}" height="8" rx="2" fill="${K.hair}"/>`;
  if(fsr){ s+=`<rect x="${MX0}" y="${MY+10}" width="${(px(fsr[0])-MX0).toFixed(1)}" height="8" rx="2" fill="${K.fillHall}"/>`+(fsr[1]>fsr[0]?`<rect x="${px(fsr[0]).toFixed(1)}" y="${MY+10}" width="${(px(fsr[1])-px(fsr[0])).toFixed(1)}" height="8" fill="${K.fillSup}"/>`:'')+`<line x1="${px(fsr[1]).toFixed(1)}" y1="${MY+4}" x2="${px(fsr[1]).toFixed(1)}" y2="${MY+24}" stroke="${K.ink}" stroke-width="1.4"/>`; }
  for(let v=0;v<=scaleMax;v++) s+=`<line x1="${px(v).toFixed(1)}" y1="${MY+20}" x2="${px(v).toFixed(1)}" y2="${MY+25}" stroke="${K.faint}" stroke-width="0.6"/><text x="${px(v).toFixed(1)}" y="${MY+38}" text-anchor="middle" font-size="11" fill="${K.mute}">${v}</text>`;
  const fs=fsr?(fsr[0]===fsr[1]?n1(fsr[0]):n1(fsr[0])+' to '+n1(fsr[1])):null, maxFloor=fsr&&area?fsr[1]*area:null, minFloor=fsr&&area&&fsr[0]!==fsr[1]?fsr[0]*area:null;
  s+=fsr?tb(RX,MY+16,[`${fs} × the lot`,{t:`${n0(maxFloor)} m² at most on this ${n0(area)} m² lot`},{t:fc?shortS(fc.s):''}]):tb(RX,MY+16,[{html:`Floor space ratio ${redQ}`,fs:13,w:500,c:K.ink},{t:'not in the tool for this zone'}]);
  const svg=`<svg viewBox="0 0 ${W} ${MY+64}" width="${W}" height="${MY+64}" role="img" aria-label="${esc(x.addr)}: height limits as lines above the ground, and the floor space ratio as a scale">${s}</svg>`;
  const key=`<div class="f1c-key">${keyL(K.ink,'height limit, outright',false,2)}${hx?keyL(K.ink2,'with approval (dashed)',true)+(ap?keyI(K.fillSup,K.ink2,'range the by-law allows'):''):''}${keyI(K.fillHall,K.ink2,'floor area allowed')}${fsr&&fsr[1]>fsr[0]?keyI(K.fillSup,K.ink2,'with approval, up to the tick'):''}</div>`;
  const miss=[]; if(Z.assumed) miss.push('limits for this zone (it has no data-centre row in the tool)'); if(hq&&!Z.assumed) miss.push('height limit (the by-law gives none)'); if(fq&&!Z.assumed) miss.push('floor space ratio (the by-law gives none)'); miss.push('which grade the height is measured from');
  const hxRow=hx?`${hxTxt} m`:(H0?'no figure':C.q());
  return {draw:`<div class="f1c-mb-wrap">${svg}${key}</div>`,lead:`Height and floor area are set by the zone, not by the design. ${zoneName(x)}, ${gcite(Z,x)}.`,
    hero:[{v:H0?n1(H0):C.q(),u:H0?' m':'',l:'height limit'},{v:fs||C.q(),u:fs?' × lot':'',l:'floor space ratio'},{v:maxFloor?n0(maxFloor):C.q(),u:maxFloor?' m²':'',l:'floor area, at most'}],
    rows:[['Height limit, outright',H0?`${n1(H0)} m`:C.q()],['Height with approval',hxRow],['Floor space ratio',fs?`${fs} × lot`:C.q()],['Lot area',area?`${n0(area)} m²`:C.q()],['Floor area, at most',maxFloor?`${n0(maxFloor)} m²`:C.q()].concat([])].concat(minFloor?[['Floor area without approval',`${n0(minFloor)} m²`]]:[]),
    more:[['Each rule and its clause',`<table class="f1c-mb-ed">${(Z.cl||[]).filter(c=>/^(Height|Floor area)/i.test(c[0])).map(c=>`<tr><td style="width:90px">${esc(c[0])}</td><td>${esc(c[1])}<small>${esc(c[2])}</small></td></tr>`).join('')}</table>${Z.warn?`<p>${esc(Z.warn.replace(/<[^>]+>/g,''))}</p>`:''}`],['What approval means here',`<p>${hc?esc(hc.t):'No approval clause read for this zone.'}</p>`]],
    src:[srcZone(x),`Height lines: Z.hOutright and Z.hx from the zone row, drawn on one metre scale from the ground line.`,`Floor area at most: floor space ratio × lot area (${n0(area)} m², the tool's lot), our arithmetic.`,'The height base (what the by-law measures from) is not settled in the tool (?).'],missing:miss}; }});

/* ===== M6 Yards by edge ===== */
C.add(T,'Yards by edge',{async build(x){
  const pl=await plan(x); if(!pl) return noLot(); const {M,edges,yl}=pl, Z=M.Z; if(!edges.length) return {draw:'<p class="f1v-empty">This lot’s edges are not classed.</p>'};
  const order=[...edges].sort((a,b)=>({front:0,rear:1}[a.kind]??2)-({front:0,rear:1}[b.kind]??2)||b.slen-a.slen), pri=[]; const seenK={};
  for(const e of order){ const k=e.kind+':'+e.d; if(!seenK[k]||pri.length<2) { pri.push({e}); seenK[k]=1; } } const rest=order.filter(e=>!pri.some(p=>p.e===e)).map(e=>({e}));
  const placed=pl.lead(pri.concat(rest));
  const nm=e=>e.d>0?`${KN[e.kind]||esc(e.kind)} yard ${n1(e.d)} m`:`${KN[e.kind]||esc(e.kind)}: no yard`;
  const lab=it=>{ const e=it.e, a=abutWord(e.abuts); return [{t:nm(e),fs:13,w:500,c:K.ink},{t:(a?a+' · ':'')+'lot line'},...(ourReading(e)?[{t:'our reading ?',c:RED}]:[])]; };
  const svg=`<svg viewBox="0 0 ${PW.W} ${PW.H}" width="${PW.W}" height="${PW.H}" role="img" aria-label="${esc(x.addr)}: each lot line with its class and yard depth">${planBody(pl,'f1c-mb6')}${pl.edges.map(marker).join('')}${leaderSvg(placed,lab)}${north(PW.X0+10,PW.Y0+PW.S-34)}${C.scaleBar(PW.X0+10,PW.Y0+PW.S-24,niceM(pl.f.s),pl.f.s)}</svg>`;
  const ours=edges.some(ourReading);
  const note=ours?`<div class="f1c-mb-note">Which line is the front, side or rear is our reading of the by-law’s yard diagram; the City has not confirmed it.</div>`:'';
  const tbl=`<table class="f1c-mb-ed two">${edges.map(e=>`<tr><td><b class="l">${e.letter}</b></td><td>${KN[e.kind]||esc(e.kind)} · ${e.d>0?'yard '+n1(e.d)+' m':'no yard'} · ${n0(e.len)} m long${e.abuts?' · faces '+esc(abutWord(e.abuts)):''}${ourReading(e)?' · <span style="color:'+RED+'">our reading ?</span>':''}<small>${esc(e.why||'')}</small></td></tr>`).join('')}</table>`;
  const by=k=>{ const d=edges.filter(e=>e.kind===k).map(e=>e.d); if(!d.length) return null; const lo=Math.min(...d), hi=Math.max(...d); return lo===hi?n1(lo):n1(lo)+' to '+n1(hi); };
  const buildable=yl?ringArea(yl):null, yz=Z.yards||{}, yc=clause(Z,/^(Yards|Setbacks)/i);
  const miss=[]; if(Z.assumed) miss.push('yards for this zone (it has no data-centre row in the tool)'); if(!yl) miss.push('yard line (no yard figure, or it folds on this lot)'); if(edges.some(e=>e.kind==='unclear')) miss.push('class of one or more lot lines (unclear)');
  const rows=[['Front yard',by('front')?`${by('front')} m`:'no front line found'],['Side yard',by('side')?`${by('side')} m`:'none found'],['Rear yard',by('rear')?`${by('rear')} m`:'none found']]
    .concat(yz.max?[['Building width or depth, at most',`${n0(yz.max)} m`]]:[]).concat([['Buildable area inside the yards',buildable?`${n0(buildable)} m²`:C.q()]]);
  return {draw:`<div class="f1c-mb-wrap">${svg}<div class="f1c-key">${edgeKey(pl)}</div>${note}${edges.length<=6?tbl:''}</div>`,lead:`Each lot line is classed as front, side or rear, and each class has its own yard. ${zoneName(x)}, ${gcite(Z,x)}.`,
    hero:[by('front')&&{v:by('front'),u:' m',l:'front yard'},by('side')&&{v:by('side'),u:' m',l:'side yard'},by('rear')&&{v:by('rear'),u:' m',l:'rear yard'}].filter(Boolean),
    rows,more:[['Each lot line',tbl],['Each rule and its clause',`<table class="f1c-mb-ed">${(Z.cl||[]).filter(c=>/^(Yards|Setbacks)/i.test(c[0])).map(c=>`<tr><td style="width:90px">${esc(c[0])}</td><td>${esc(c[1])}<small>${esc(c[2])}</small></td></tr>`).join('')}</table>`],['How each line was classed',`<p>${esc(((M.yards&&M.yards.src)||[]).join(', ')||'')}. Where the by-law gives different yards by what a line faces (street, lane, neighbouring zone), the tool reads that from the City’s street and zone data.</p>`]],
    src:[srcZone(x),`Each lot line’s class and yard: the tool’s lot-line reading (lotside.js, site.js; ${((M.yards&&M.yards.src)||[]).join(', ')||'?'}); lines marked "our reading" are ours, not the City’s.`,'Buildable area: the area of the yard line (M.yardLine), our arithmetic'+(M.yardOffBad?'; the yard line folds on this lot, so no area is given (?)':'')+'.',srcStreets(x.city)],missing:miss}; }});

/* ===== M7 Noise limits by edge ===== */
/* night limits and Edmonton's residential / mixed zone sets are read from the tool (BD.eng.noiseLimitAt, BD.eng.noiseZones in engine.js), not copied */
/* the zone across one lot line: step outward from the line's midpoint until a parcel other than this lot's holds the point */
function across(x,e,r){ const city=x.city, s=x.sel, own=new Set((s.rings||[]).concat(r?[r]:[])), mine=p=>own.has(p.r)||(city==='van'?p.id===s.id:(p.ids||[]).includes(s.id));
  for(const d of [1.5,3,5,8,12,16,22,30,40]){ const px=e.wmx+e.wnx*d, py=e.wmy+e.wny*d; if(BD.pip(px,py,r)) continue;
    for(const k in BD.S.tiles){ if(!k.startsWith(city+':')) continue; const t=BD.S.tiles[k]; for(const p of t.par||[]){ const bb=p.bb||C.bbox(p.r); if(px<bb[0]||px>bb[2]||py<bb[1]||py>bb[3]||mine(p)||!BD.pip(px,py,p.r)) continue;
        const id=p.ids?p.ids[0]:p.id, a=t.A[id]; if(!a) return {z:null,px,py,d}; const z=city==='van'?String(a[1]||'').trim():C.zoneKey('edm',a); return {z:z||null,px,py,d,full:city==='van'?z:String(a[2]||a[1]||'').trim()}; } } }
  return {z:null,px:e.wmx+e.wnx*3,py:e.wmy+e.wny*3,d:null}; }
function noiseLimit(x,nb){ const city=x.city, E=BD.eng;
  if(city==='van'){ const a=x.sel.a||[], c=BD.centroid(x.sel.ring), sc=E.vZone(String(a[1]||'').trim(),c[0],c[1])||'quiet', L=E.noiseLimitAt({city,cls:sc},nb.z,nb.px,nb.py), rc=nb.z?E.vZone(nb.z,nb.px,nb.py):null, q=rc===null||rc==='quiet';
    /* day limits: By-law 6555 ss. 2.1(a)-2.3(a) as the register gives them (noise_limit: quiet to quiet 55, activity to quiet 60, intermediate or activity to other 70); the tool computes the night limit only */
    const day=(q?{quiet:55,activity:60,intermediate:null}:{quiet:null,intermediate:70,activity:70})[sc];
    return {day,night:L.L,cls:rc||'quiet',unknown:rc===null,srcCls:sc,sec:String(L.sec).replace(/\(b\)\((i|ii)\)$/,'(a) day, (b) night'),dayMissing:day==null}; }
  const L=E.noiseLimitAt({city},nb.z), r=L.L===50, c0=nb.z&&String(nb.z).split(' ')[0], res=!!(nb.z&&E.noiseZones.res.has(c0)), mix=!!(nb.z&&E.noiseZones.mix.has(c0));
  /* day limits: Bylaw 14600 s. 19(1) residential 65, s. 21(1) non-residential 75 (register noise_limit); night from the tool */
  return {day:r?65:75,night:L.L,cls:nb.z==null?'unknown':res?'residential':mix?'assumed residential':'non-residential',unknown:nb.z==null||mix,sec:`Bylaw 14600 s. ${r?'19(1) day, 20(1) night':'21(1) day, 22(1) night'}`}; }
const clsWord=(city,n)=>city==='van'?({quiet:'quiet zone',intermediate:'intermediate zone',activity:'activity zone'}[n.cls]||''):n.cls;
C.add(T,'Noise limits by edge',{async build(x){
  const pl=await plan(x); if(!pl) return noLot(); const {M,edges}=pl, Z=M.Z, city=x.city, GN=(BD.data.raw.noise||{}).gen||{}, gv=GN.van, ge=GN.edm;
  for(const e of edges){ e.nb=across(x,e,pl.r); e.nl=noiseLimit(x,e.nb); }
  const order=[...edges].sort((a,b)=>(a.nl.night-b.nl.night)||b.slen-a.slen), seen=new Set(), pri=[]; for(const e of order){ const k=e.nl.day+'/'+e.nl.night+(e.nb.z||''); if(!seen.has(k)){ seen.add(k); pri.push({e}); } }
  const placed=pl.lead(pri.concat(order.filter(e=>!pri.some(p=>p.e===e)).map(e=>({e}))));
  const lim=e=>{ const n=e.nl; return `day ${n.day==null?'?':n.day} · night ${n.night} dBA`; };
  const lab=it=>{ const e=it.e, n=e.nl; return [{html:`Day ${n.day==null?redQ:n.day} · night ${n.night} dBA`,fs:13,w:500,c:K.ink},{t:e.nb.z?`across: ${e.nb.z}${clsWord(city,n)?', '+clsWord(city,n):''}`:'across: no zone on record'},{t:n.sec.replace(/ day.*/,'')}]; };
  let zl=''; const zs=[]; for(const e of pl.edges){ const px=e.mx+e.nx*42, py=e.my+e.ny*42; if(!e.nb.z||px<PW.X0+6||px>PW.X0+PW.S-6||py<PW.Y0+12||py>PW.Y0+PW.S-12) continue; if(zs.some(p=>Math.hypot(p[0]-px,p[1]-py)<44)) continue; zs.push([px,py]);
    zl+=`<text x="${px.toFixed(1)}" y="${(py+3).toFixed(1)}" text-anchor="middle" font-size="10.5" fill="${K.mute}">${esc(e.nb.z)}</text>`; }
  const svg=`<svg viewBox="0 0 ${PW.W} ${PW.H}" width="${PW.W}" height="${PW.H}" role="img" aria-label="${esc(x.addr)}: the by-law noise limit at each lot line, day and night, set by the zone across the line">${planBody(pl,'f1c-mb7')}${zl}${pl.edges.map(marker).join('')}${leaderSvg(placed,lab)}${north(PW.X0+10,PW.Y0+PW.S-34)}${C.scaleBar(PW.X0+10,PW.Y0+PW.S-24,niceM(pl.f.s),pl.f.s)}</svg>`;
  const tbl=`<table class="f1c-mb-ed two">${edges.map(e=>`<tr><td><b class="l">${e.letter}</b></td><td>${KN[e.kind]||esc(e.kind)} line · ${e.nb.z?`across ${e.abuts&&/street|alley/.test(e.abuts)?'the '+esc(abutWord(e.abuts))+', ':''}<b style="font-weight:500">${esc(e.nb.z)}</b>${clsWord(city,e.nl)?' ('+esc(clsWord(city,e.nl))+')':''}`:'no zone on record across it'} · <b style="font-weight:500">${esc(lim(e).replace('?','?'))}</b>${e.nl.dayMissing?' <span class="f1c-q">?</span>':''}${e.nl.unknown?' <span style="color:'+RED+'">(zone not read, '+(city==='van'?'quiet zone':'residential limit')+' assumed ?)</span>':''}<small>${esc(e.nl.sec)}</small></td></tr>`).join('')}</table>`;
  const genRule=city==='van'?(gv?`Generator testing: up to ${gv.test.v} dBA at the point of reception, or 6.1 m from the source if that is farther, once a month for up to 60 minutes in the daytime, plus once a year for up to 180 minutes. By-law 6555 s. 4.1(c).`:null)
    :(ge?`Generator testing, daytime: up to one hour a day at ${ge.resTest1h.v} dB(A) at residential lines and ${ge.nonTest1h.v} at non-residential. At night: ${ge.resNight.v} and ${ge.nonNight.v}, no allowance. Bylaw 14600 ss. 19(3), 21(3), 20, 22; s. 24 has no generator exemption.`:null);
  const gband=genRule?`<div class="f1c-mb-note" style="border-left-color:${K.ink}">${esc(genRule)}</div>`:`<div class="f1c-mb-note"><span class="f1c-q">?</span> generator testing rule not in the tool</div>`;
  const nights=edges.map(e=>e.nl.night), days=edges.map(e=>e.nl.day).filter(v=>v!=null), rg=a=>a.length?(Math.min(...a)===Math.max(...a)?String(a[0]):Math.min(...a)+' to '+Math.max(...a)):null;
  const dm=edges.some(e=>e.nl.dayMissing), unk=edges.filter(e=>e.nl.unknown).length;
  const miss=[]; if(dm) miss.push('Vancouver day limits for some zone pairs (the register gives day limits for quiet to quiet, activity to quiet, intermediate or activity to other only)'); if(unk) miss.push(unk+' lot line(s) with no zone on record across them (limit assumed)'); miss.push('limits across a street or lane: the by-laws measure at the property line or point of reception; the tool reads the zone of the lot beyond');
  const rows=edges.map(e=>[`${e.letter} · ${KN[e.kind]||e.kind}, across ${e.nb.z||'no zone on record'}`,e.nl.dayMissing?{q:true,why:'day limit for this zone pair not in the tool yet'}:`${e.nl.day} / ${e.nl.night} dBA`]);
  return {draw:`<div class="f1c-mb-wrap">${svg}<div class="f1c-key">${edgeKey(pl)}<span>zone codes across each line in grey; limits are the by-law’s, not a prediction</span></div>${gband}</div>`,
    lead:`Each lot line has a limit set by the zone across it, shown as day / night. These are limits, not predicted levels; those need a design. ${zoneName(x)}${city==='van'?' is read as '+(clsWord(city,{cls:edges[0]?edges[0].nl.srcCls:'quiet'}))+' for source noise':''}.`,
    hero:[{v:rg(nights)||C.q(),u:' dBA',l:'night limit at the lot lines'},{v:rg(days)||C.q(),u:days.length?' dBA':'',l:dm?'day limit (some lines ?)':'day limit at the lot lines'},{v:city==='van'?(gv?String(gv.test.v):C.q()):(ge?ge.resTest1h.v+' / '+ge.nonTest1h.v:C.q()),u:' dBA',l:city==='van'?'generator testing, at most':'generator testing, daytime'}],
    rows,more:[['Each lot line and its clause',tbl],['Generator testing',`<p>${esc(genRule||'not in the tool')}</p>${GN._note?'':''}`],['Where the limit is measured',`<p>${city==='van'?'By-law 6555 s. 1.2 measures at a point of reception: in the lane or street next to the lot, or outside the lot line where nothing public lies between.':'Bylaw 14600 ss. 19–22 measure at the property line of the receiving property.'} The tool reads the zone of the lot across each line (across a street or lane, of the lot beyond it).</p>`]],
    src:[city==='van'?'Limits: Vancouver Noise Control By-law 6555 ss. 2.1–2.3 by source and receiving zone class (tool/engine.js noiseLimitAt night limits; day limits from register noise_limit where it gives them: quiet to quiet 55, activity to quiet 60, intermediate or activity to other 70). Zone classes: BD.eng.vZone.':'Limits: Edmonton Bylaw 14600 ss. 19–22 (65 / 50 residential, 75 / 60 non-residential); residential zones as engine.js EDM_RES.',
      'Generator testing: tool/data/noise.json gen (van6555s41c; edm14600s19to24).',`The zone across each line: the neighbouring parcel’s zone from the loaded tiles, found by stepping out from the line (our arithmetic). ${srcZone(x)}`,srcStreets(x.city)],missing:miss}; }});

/* ===== M8 Storey heights, ground floor and street frontage ===== */
const num=(s,re)=>{ const m=re.exec(s||''); return m?+m[1]:null; };
function storeyRule(Z){ const cs=((Z&&Z.cl)||[]).filter(c=>/^(Ground floor|Floor heights)$/i.test(c[0])), txt=cs.map(c=>c[1]).join(' ; '), notApplied=/not applied/i.test(txt);
  const g=notApplied?null:num(txt,/first floor (?:at least )?([\d.]+) m/i), u=notApplied?null:num(txt,/upper floors? (?:at least )?([\d.]+) m/i), s2=notApplied?null:num(txt,/second (?:at least )?([\d.]+) m/i);
  const use=/not permitted at (?:the ground floor|grade)[^"]*/i.exec(txt), useTxt=(()=>{ const m=/"([^"]*not permitted at[^"]*)"/i.exec(txt); return m?m[1]:null; })();
  const gc=clause(Z,/^Ground floor/i), fh=clause(Z,/^Floor heights/i);
  return {g,u,s2,notApplied,useTxt,hasHeights:cs.some(c=>/floor/i.test(c[1])&&/at least/i.test(c[1])),useClause:gc,fh,cs}; }
C.add(T,'Storey heights, ground floor and street frontage',{async build(x){
  const M=x.M, Z=M&&M.Z; if(!Z||!x.sel.ring) return noLot(); const R=storeyRule(Z), hq=hasQ(Z,'h'), H0=hq?null:Z.hOutright, W=900;
  const AD=(BD.data.raw.arch||{}).storeyMin, top=Math.ceil(Math.max(H0||0,(R.g||6)+(R.u||4)*2+4)*1.12/5)*5, sec=secFrame(top,{GY:340,SH:290,SX0:150,SX1:480}), y=sec.yOf, RX=sec.SX1+30;
  let s=sec.ax+sec.ground; const g=R.g, u=R.u;
  if(g!=null){ /* the ground-floor use rule: a labelled band from the ground line to the minimum first-floor height */
    s+=`<rect x="${sec.SX0}" y="${y(g)}" width="${sec.SX1-sec.SX0}" height="${(y(0)-y(g)).toFixed(1)}" fill="${K.plant}" opacity="0.8"/>`; }
  else if(R.useTxt){ s+=`<rect x="${sec.SX0}" y="${y(6)}" width="${sec.SX1-sec.SX0}" height="${(y(0)-y(6)).toFixed(1)}" fill="${K.plant}" opacity="0.5"/>`; }
  if(H0) s+=lineH(sec,y(H0),{w:1.8});
  if(g!=null){ s+=lineH(sec,y(g),{dash:1,c:K.ink2,w:1}); s+=dimV(sec.SX0+70,y(0),y(g),`${n1(g)} m`);
    if(u!=null){ s+=lineH(sec,y(g+u),{dash:1,c:K.ink2,w:1}); s+=dimV(sec.SX0+70,y(g),y(g+u),`${n1(u)} m`); if(g+2*u<=(H0||1e9)){ s+=lineH(sec,y(g+2*u),{dash:1,c:K.ink2,w:0.6}); s+=dimV(sec.SX0+70,y(g+u),y(g+2*u),`${n1(u)} m`,{c:K.ink2,lc:K.ink2}); } }
    else if(R.s2!=null){ s+=lineH(sec,y(g+R.s2),{dash:1,c:K.ink2,w:1}); s+=dimV(sec.SX0+70,y(g),y(g+R.s2),`${n1(R.s2)} m`); } }
  /* right-hand labels, level with what they describe */
  if(H0) s+=tb(RX,y(H0)-1,[`Height limit ${n1(H0)} m`,{t:shortS((clause(Z,/^Height/i)||{}).s)}]); else s+=tb(RX,y(top*0.9),[{html:`Height limit ${redQ}`,fs:13,w:500,c:K.ink},{t:'not in the tool for this zone'}]);
  const gy=g!=null?y(g/2):y(3);
  if(g!=null){ s+=tb(RX,y(g)+16,[`Ground floor: ${n1(g)} m at least`,{t:'floor to floor, new buildings'}]);
    if(u!=null) s+=tb(RX,y(g+u/2)-8,[`Upper floors: ${n1(u)} m at least`,{t:'floor to floor, each'},{t:shortS((R.fh||R.useClause||{}).s)}]);
    else if(R.s2!=null) s+=tb(RX,y(g+R.s2/2)+4,[`Second floor: ${n1(R.s2)} m at least`,{t:shortS((R.fh||R.useClause||{}).s)}]); }
  else if(R.notApplied) s+=tb(RX,y(8),[{html:`Minimum storey heights ${redQ}`,fs:13,w:500,c:K.ink},{t:'apply in sub-area A only; the tool does not map it'},{t:shortS((R.fh||{}).s)}]);
  else s+=tb(RX,y(8),[{t:'Minimum storey heights: no rule here',fs:13,w:500,c:K.ink},{t:`none in ${zoneName(x)} (${gcite(Z,x)})`}]);
  const bandY=g!=null?y(g)+(y(0)-y(g))*0.55:y(3);
  s+=R.useTxt?tb(sec.SX0,y(0)+36,[{t:'Ground-floor use rule (the shaded band)',fs:13,w:500,c:K.ink},...wrap(R.useTxt,70).map(t=>({t,c:K.ink2,fs:12})),{t:shortS((R.useClause||{}).s)}]):tb(sec.SX0,y(0)+36,[{t:'Ground-floor use: no rule here',fs:13,w:500,c:K.ink},{t:`none in ${zoneName(x)}`}]);
  const svg=`<svg viewBox="0 0 ${W} 440" width="${W}" height="440" role="img" aria-label="${esc(x.addr)}: minimum storey heights against the ground line and the height limit, and the ground-floor use rule">${s}</svg>`;
  const key=`<div class="f1c-key">${keyL(K.ink,'height limit',false,2)}${keyL(K.ink2,'storey height minimums (dashed)',true)}${keyI(K.plant,K.rule,R.useTxt?'ground-floor use rule applies':'ground floor (no use rule here)')}</div>`;
  const fy=(M.edgeYards||[]).filter(e=>e.kind==='front'), fd=fy.length?Math.min(...fy.map(e=>e.d)):null, yc=clause(Z,/^(Yards|Setbacks)/i);
  const frontage=R.useTxt?`${R.useTxt}`:'no ground-floor use rule here';
  const miss=[]; if(R.notApplied) miss.push('minimum storey heights for I-2 sub-area A (the tool does not map the sub-area)'); if(Z.assumed) miss.push('rules for this zone (it has no data-centre row in the tool)'); if(!R.hasHeights&&!R.notApplied&&!Z.assumed) {} ;
  const sm=AD&&AD['I-3']&&x.city==='van'&&(Z.vkey||Z.key)==='I-3'?AD['I-3']:null;
  return {draw:`<div class="f1c-mb-wrap">${svg}${key}</div>`,lead:`The zone sets minimum storey heights and a rule for what may sit at street level. Heights run from the ground line up to the height limit; no building is drawn. ${zoneName(x)}, ${gcite(Z,x)}.`,
    hero:[{v:g!=null?n1(g):(R.notApplied?C.q():'none'),u:g!=null?' m':'',l:'ground storey, at least'},{v:u!=null?n1(u):(R.s2!=null?n1(R.s2):(R.notApplied?C.q():'none')),u:(u!=null||R.s2!=null)?' m':'',l:u!=null?'upper storeys, at least':'second storey, at least'},{v:H0?n1(H0):C.q(),u:H0?' m':'',l:'height limit'}],
    rows:[['Ground storey, floor to floor',g!=null?`at least ${n1(g)} m`:R.notApplied?C.q():'no rule here'],['Upper storeys, floor to floor',u!=null?`at least ${n1(u)} m`:R.s2!=null?`second storey at least ${n1(R.s2)} m`:R.notApplied?C.q():'no rule here'],['At street level',frontage],['Front yard',fd!=null?`${n1(fd)} m${yc?'':''}`:'no front line found'],['Height limit',H0?`${n1(H0)} m`:C.q()]],
    more:[['Each rule and its clause',`<table class="f1c-mb-ed">${R.cs.concat(yc?[[yc.k,yc.t,yc.s]]:[]).map(c=>`<tr><td style="width:90px">${esc(c[0])}</td><td>${esc(c[1])}<small>${esc(c[2])}</small></td></tr>`).join('')||'<tr><td>no ground-floor or storey-height rule in this zone’s row</td></tr>'}</table>`],['Floors above the ground storey',`<p>${u!=null?`How many upper storeys fit under the ${n1(H0)} m limit depends on the design; the drawing shows the minimum heights only.`:'No upper-storey minimum applies.'}</p>`]],
    src:[srcZone(x),'Storey heights and the ground-floor use rule: the "Ground floor" and "Floor heights" clauses of the zone row (figures read from the clause text); '+(sm?`Vancouver I-3 minimums also in tool/data/arch.json storeyMin (${sm.ground} m and ${sm.above} m, register arch_hb_vanI3).`:'no figure in tool/data/arch.json storeyMin for this zone.'),'Street frontage: the ground-floor use clause and the front yard from the lot-line reading (M.edgeYards); no further frontage rule is read.','Height limit: Z.hOutright.'],missing:miss}; }});

/* ===== M9 Loading ===== */
C.add(T,'Loading',{async build(x){
  const pl=await plan(x,{X0:170}); if(!pl) return noLot(); const {M,edges}=pl, Z=M.Z, LN=M.loadingNeed, city=x.city, LD=(BD.data.raw.zones||{}).loading||{};
  const eq=clause(Z,/^(Equipment|Screening)$/i), rear=/loading at (?:the )?rear or sides/i.test(eq?eq.t:'');
  /* where the by-law limits it: EETB puts loading at the rear or sides, screened; elsewhere the by-law sets the bay, not where on the lot */
  let under='', nonFront=[]; if(rear){ nonFront=pl.edges.filter(e=>e.kind!=='front'); under=`<g clip-path="url(#f1c-mb9)" ${''}>`+nonFront.map(e=>`<line x1="${e.a[0].toFixed(1)}" y1="${e.a[1].toFixed(1)}" x2="${e.c[0].toFixed(1)}" y2="${e.c[1].toFixed(1)}" stroke="${K.pub}" stroke-opacity="0.32" stroke-width="30"/>`).join('')+'</g>'; }
  const fe=edges.filter(e=>e.kind==='front');
  const pri=[...edges].sort((a,b)=>({front:0,rear:1}[a.kind]??2)-({front:0,rear:1}[b.kind]??2)||b.slen-a.slen).map(e=>({e,gap:40})), placed=pl.lead(pri.filter(p=>p.e.d>0||p.e.kind==='front'||p.e.kind==='rear'));
  const lab=it=>{ const e=it.e; return [{t:e.d>0?`${KN[e.kind]||e.kind} yard ${n1(e.d)} m`:`${KN[e.kind]||e.kind}: no yard`,fs:13,w:500,c:K.ink},{t:rear?(e.kind==='front'?'no loading here':'loading may go here'):'no placement rule'}]; };
  /* the dimensioned key: one bay, drawn larger than the plan's scale, with its aisle */
  const kx=PW.X0+PW.S+215-0, KX=PW.W+10;
  let key='', kw=270, kh=PW.H;
  if(LN){ const sc=Math.min(18,(kw-90)/(LN.len+LN.aisle*0.0001+2)), L=LN.len*sc, Wd=LN.wid*sc, ax0=28, ay0=70;
    key+=`<text x="${ax0}" y="30" font-size="13" font-weight="500" fill="${K.ink}">One ${esc(LN.cls)}, at required size</text><text x="${ax0}" y="46" font-size="11.5" fill="${K.mute}">key only; larger than the lot’s scale</text>`;
    key+=`<rect x="${ax0}" y="${ay0}" width="${L.toFixed(1)}" height="${Wd.toFixed(1)}" fill="${K.fillSup}" stroke="${K.ink2}" stroke-width="1" stroke-dasharray="5 4"/>`;
    key+=`<line x1="${ax0}" y1="${ay0+Wd+16}" x2="${(ax0+L).toFixed(1)}" y2="${ay0+Wd+16}" stroke="${K.ink}" stroke-width="1"/><path d="M${ax0} ${ay0+Wd+12}v8M${(ax0+L).toFixed(1)} ${ay0+Wd+12}v8" stroke="${K.ink}"/><text x="${(ax0+L/2).toFixed(1)}" y="${ay0+Wd+33}" text-anchor="middle" font-size="12.5" font-weight="500" fill="${K.ink}">${n1(LN.len)} m long</text>`;
    key+=`<line x1="${ax0+L+16}" y1="${ay0}" x2="${ax0+L+16}" y2="${(ay0+Wd).toFixed(1)}" stroke="${K.ink}" stroke-width="1"/><path d="M${ax0+L+12} ${ay0}h8M${ax0+L+12} ${(ay0+Wd).toFixed(1)}h8" stroke="${K.ink}"/><text x="${ax0+L+26}" y="${(ay0+Wd/2+4).toFixed(1)}" font-size="12.5" font-weight="500" fill="${K.ink}">${n1(LN.wid)} m wide</text>`;
    const ay=ay0+Wd+60, aw=LN.aisle*sc; key+=`<rect x="${ax0}" y="${ay}" width="${L.toFixed(1)}" height="${aw.toFixed(1)}" fill="none" stroke="${K.ink2}" stroke-width="0.8" stroke-dasharray="2 3"/><line x1="${ax0+L+16}" y1="${ay}" x2="${ax0+L+16}" y2="${(ay+aw).toFixed(1)}" stroke="${K.ink}" stroke-width="1"/><path d="M${ax0+L+12} ${ay}h8M${ax0+L+12} ${(ay+aw).toFixed(1)}h8" stroke="${K.ink}"/><text x="${ax0+L+26}" y="${(ay+aw/2+4).toFixed(1)}" font-size="12.5" font-weight="500" fill="${K.ink}">${n1(LN.aisle)} m aisle</text>`;
    key+=tb(ax0,ay+aw+34,[{t:`Clear height ${n1(LN.ht)} m`,fs:13,w:500,c:K.ink},...(city==='van'?['Parking By-law s. 5.4.1 (aisle);','row 5.2.5 (Class B bay)']:['Bylaw 20001 s. 5.80 subs. 7 (bay);','aisle: Vancouver’s 6.1 m, assumed']).map(t=>({t}))],{flat:false});
  }
  else key+=`<text x="28" y="40" font-size="13" fill="${K.ink}">Loading bay <tspan fill="${RED}">?</tspan> not in the tool for this lot</text>`;
  const W2=790+kw;
  const svg=`<svg style="max-width:100%;height:auto" viewBox="0 0 ${W2} ${PW.H}" width="${W2}" height="${PW.H}" role="img" aria-label="${esc(x.addr)}: the yards, where loading may go, and one loading space at its required size">${planBody(pl,'f1c-mb9',{under})}${pl.edges.map(marker).join('')}${leaderSvg(placed,lab)}${north(PW.X0+10,PW.Y0+PW.S-34)}${C.scaleBar(PW.X0+10,PW.Y0+PW.S-24,niceM(pl.f.s),pl.f.s)}<g transform="translate(790,${PW.Y0+0})">${key}</g></svg>`;
  const keyH=`<div class="f1c-key">${edgeKey(pl)}${rear?keyI('rgba(176,128,42,0.32)',K.pub,'where loading may go (rear or sides)'):'<span>no area shaded: the by-law does not say where on the lot loading goes</span>'}</div>`;
  const loadRule=city==='van'?'Each bay is reached by a 6.1 m aisle (Parking By-law s. 5.4.1). Where on the lot is not limited in the zone row.':'Wholly on site; backing and turning must not interfere with traffic on abutting streets or alleys (Bylaw 20001 s. 5.80 subs. 7.1).';
  const place=rear?eq.t:loadRule, thr=city==='van'?(LD.van?`${LD.van.bayFirst.v} m² for the first bay, then one more per ${LD.van.bayEach.v} m²`:null):(LD.edm?`none under ${LD.edm.spaces.v[0]} m², one to ${LD.edm.spaces.v[1]} m², two above`:null);
  const miss=[]; if(!LN) miss.push('loading count and size'); if(city==='edm') miss.push('aisle width (Vancouver’s 6.1 m is used as an assumption)'); if(Z.assumed) miss.push('placement rule for this zone (no data-centre row)');
  return {draw:`<div class="f1c-mb-wrap">${svg}${keyH}</div>`,lead:`How many loading spaces, how big, and any limit on where they go. The by-law counts them from the building’s floor area. ${zoneName(x)}, ${gcite(Z,x)}.`,
    hero:[{v:LN?String(LN.n):C.q(),l:LN?LN.cls+(LN.n===1?'':'s')+' needed':'loading spaces needed'},{v:LN?`${n1(LN.len)} × ${n1(LN.wid)}`:C.q(),u:LN?' m':'',l:'each'},{v:LN?n1(LN.ht):C.q(),u:LN?' m':'',l:'clear height'}],
    rows:[['Count',LN?`${LN.n}`:C.q()],['Size',LN?`${n1(LN.len)} × ${n1(LN.wid)} m, ${n1(LN.ht)} m clear`:C.q()],['Aisle',LN?`${n1(LN.aisle)} m${city==='edm'?' (assumed)':''}`:C.q()],['Where on the lot',rear?'rear or sides, screened':'no placement rule here'],['Count rule',thr||C.q()]],
    more:[['How the count is worked out',`<p>${LN?esc(LN.basis):'Not in the tool.'}</p><p>The count is for the building size the tool takes as its default (the data centre’s floor area), not a design: a larger or smaller building changes it.</p>`],['Placement rule',`<p>${esc(place)}</p>${eq&&rear?`<p>${esc(eq.s)}</p>`:''}`]],
    src:[srcZone(x),city==='van'?'Count and size: tool/data/zones.json loading.van (Parking By-law s. 5.2 row 5.2.5, s. 5.4.1; register vanParking5), through the tool’s loadingNeed (site.js).':'Count and size: tool/data/zones.json loading.edm (Bylaw 20001 s. 5.80 Table 7.2; register edmZB580), through the tool’s loadingNeed (site.js); aisle is Vancouver’s 6.1 m, an assumption.','Yard lines: the lot-line reading (M.edgeYards, M.yardLine).','Shaded area: the by-law’s "loading at the rear or sides" read as the lot’s non-front lines, our reading.'],missing:miss}; }});

/* ===== M10 Rooftop equipment and screening ===== */
C.add(T,'Rooftop equipment and screening',{async build(x){
  const M=x.M, Z=M&&M.Z; if(!Z||!x.sel.ring) return noLot(); const city=x.city, hq=hasQ(Z,'h'), H0=hq?null:Z.hOutright, AR=(BD.data.raw.arch||{}).roofEquip||{}, mode=AR[city], rn=clause(Z,/^Roof equipment/i), sc=clause(Z,/^(Screening|Equipment)$/i), scr=Z.screen;
  const top=Math.ceil((H0||20)*1.45/5)*5, sec=secFrame(top,{GY:350,SH:300,SX0:130,SX1:500}), y=sec.yOf, RX=sec.SX1+30, W=900, yT=y(top);
  let s=sec.ax+sec.ground; if(H0){ s+=lineH(sec,y(H0),{w:1.8});
    s+=`<rect x="${sec.SX0+40}" y="${yT}" width="${sec.SX1-sec.SX0-80}" height="${(y(H0)-yT).toFixed(1)}" fill="none" stroke="${K.ink2}" stroke-width="1.2" stroke-dasharray="6 4"/>`;
    s+=`<rect x="${sec.SX0+40}" y="${yT}" width="${sec.SX1-sec.SX0-80}" height="${(y(H0)-yT).toFixed(1)}" fill="${K.fillSup}" opacity="0.5"/>`;
    s+=`<text x="${(sec.SX0+sec.SX1)/2}" y="${(y(H0)-(y(H0)-yT)/2+4).toFixed(1)}" text-anchor="middle" font-size="12.5" fill="${K.ink2}">where equipment may project</text>`;
    /* the allowed height and setback, dimensioned: the by-law gives none */
    const dx=sec.SX1-18; s+=`<line x1="${dx}" y1="${y(H0)}" x2="${dx}" y2="${yT}" stroke="${mode==='exempt'?K.ink2:RED}" stroke-width="1" stroke-dasharray="3 3"/><path d="M${dx-4} ${yT}h8M${dx-4} ${y(H0)}h8" stroke="${mode==='exempt'?K.ink2:RED}"/><text x="${dx-8}" y="${((y(H0)+yT)/2+4).toFixed(1)}" text-anchor="end" font-size="12.5" font-weight="500" fill="${mode==='exempt'?K.ink2:RED}">${mode==='exempt'?'no limit':'?'}</text>`;
    const bx0=sec.SX0, bx1=sec.SX0+40, by=y(H0)+26; s+=`<line x1="${bx0}" y1="${by}" x2="${bx1}" y2="${by}" stroke="${RED}" stroke-width="1" stroke-dasharray="3 3"/><path d="M${bx0} ${by-4}v8M${bx1} ${by-4}v8" stroke="${RED}"/><text x="${bx0+20}" y="${by-8}" text-anchor="middle" font-size="12.5" font-weight="500" fill="${RED}">?</text>`; }
  s+=H0?tb(RX,y(H0)+2,[`Height limit ${n1(H0)} m`,{t:shortS((clause(Z,/^Height/i)||{}).s)}]):tb(RX,y(top*0.5),[{html:`Height limit ${redQ}`,fs:13,w:500,c:K.ink},{t:'not in the tool for this zone'}]);
  const ruleLine=mode==='exempt'?'Not counted in height: ventilating equipment and mechanical penthouses':mode==='discretion'?'Above the limit by permission: the Director of Planning may allow equipment and its screening':(rn?rn.t:'no rule read');
  if(H0) s+=tb(RX,y(H0+ (top-H0)*0.75),[...wrap(ruleLine,42).map((t,i)=>({t,fs:13,w:500,c:K.ink})),...wrap(rn?rn.s:'',42).map(t=>({t})),{t:mode==='discretion'?'no allowed height or setback in the by-law ?':mode==='exempt'?'no height or setback figure in the by-law ?':'',c:RED}]);
  const screenTxt=scr?scr.why.replace(/ \(register[^)]*\)\.?/,'.').replace(/The plant is screened by default;[^.]*\./,''):sc?sc.t:null;
  s+=screenTxt?tb(RX,y(0)-40,[{t:'Screening',fs:13,w:500,c:K.ink},...wrap(screenTxt,44).slice(0,4).map(t=>({t})),{t:sc?sc.s:''}]):tb(RX,y(0)-40,[{t:'Screening: no rule here',fs:13,w:500,c:K.ink},{t:`none read in ${zoneName(x)}`}]);
  const svg=`<svg viewBox="0 0 ${W} 440" width="${W}" height="440" role="img" aria-label="${esc(x.addr)}: the height limit and the zone above it where equipment may project, with the screening rule">${s}</svg>`;
  const key=`<div class="f1c-key">${keyL(K.ink,'height limit',false,2)}<span><i style="background:${K.fillSup};border:1px dashed ${K.ink2}"></i>zone above the limit where equipment may project (dashed)</span><span><span class="f1c-q">?</span> dimension the by-law does not give</span></div>`;
  const miss=['allowed height of rooftop equipment above the limit'+(mode==='discretion'?' (Director’s discretion, no figure)':''),'setback of rooftop equipment from the roof edge']; if(Z.assumed) miss.push('rules for this zone (no data-centre row in the tool)');
  return {draw:`<div class="f1c-mb-wrap">${svg}${key}</div>`,lead:`Whether rooftop equipment may rise above the height limit, and what must be screened. No equipment is drawn: this is the rule, not a design. ${zoneName(x)}, ${gcite(Z,x)}.`,
    hero:[{v:H0?n1(H0):C.q(),u:H0?' m':'',l:'height limit'},{v:mode==='exempt'?'not counted':mode==='discretion'?'discretion':C.q(),l:mode==='discretion'?'rooftop equipment above the limit is at the Director’s discretion':'rooftop equipment above the limit'}],
    rows:[['Height limit',H0?`${n1(H0)} m`:C.q()],['Equipment above the limit',mode==='exempt'?'not counted in height':mode==='discretion'?'by permission of the Director of Planning':C.q()],['Allowed height above the limit',C.q()],['Setback from the roof edge',C.q()],['Screening',screenTxt?'required':'no rule here']],
    more:[['Each rule and its clause',`<table class="f1c-mb-ed">${[rn&&[rn.k,rn.t,rn.s],sc&&[sc.k,sc.t,sc.s]].filter(Boolean).map(c=>`<tr><td style="width:90px">${esc(c[0])}</td><td>${esc(c[1])}<small>${esc(c[2])}</small></td></tr>`).join('')||'<tr><td>no roof-equipment or screening clause read</td></tr>'}</table>`],['Our reading',`<p>${esc(AR._note||'')}</p>`]],
    src:[srcZone(x),'Roof equipment: tool/data/arch.json roofEquip (Edmonton Bylaw 20001 s. 5.70 1.9.5, register arch_hb_edm570; Vancouver Zoning and Development By-law s. 10.1.1, register arch_up_vanZDB10); the Edmonton reading for dry coolers and chillers is ours.','Screening: the zone row’s Screening or Equipment clause, or the tool’s screening rule (Z.screen).','The dashed zone is drawn from the height limit up to a drawing height; its top and setback are not in the by-law as figures (?).'],missing:miss}; }});
})();
