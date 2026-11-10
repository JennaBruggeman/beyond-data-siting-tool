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
/* 10 Nov 2026 (Municipal report, main chat): the area inside the yard line itself (M.yardOff: each lot line moved in by its own yard), not clipped to
   the lot's rectangular frame (which read low on skewed lots, 339 1st Ave E 1,738 m²); and the part within the zone's greatest depth of the front yard line */
const yardAreas=M=>{ const yo=M.yardOff&&!M.yardOffBad?M.yardOff:null; if(!yo) return null; const all=ringArea(yo), mx=M.Z&&M.Z.yards&&M.Z.yards.max; let dIn=null;
  if(mx&&M.F&&M.uFront!=null&&M.dir&&BD.geo){ const F=M.F, u1=M.uFront-M.dir*mx, c=BD.geo.clip(yo,BD.geo.rectW(F,Math.min(M.uFront,u1),Math.max(M.uFront,u1),-F.W,F.W)); dIn=c&&c.length>=6?ringArea(c):null; }
  return {all,dIn,mx}; };
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
  const I2=(sx,sy)=>f.I(sx-PW.X0,sy-PW.Y0), ctx=C.context(x,P,I2,[PW.X0,PW.Y0,PW.S,PW.S],{skip:x.sel.id}), st='', gc=P(cx,cy), yl=M.yardLine&&!M.yardOffBad?M.yardLine:null;
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
  return {M,r,E,edges,f,P,bb,st,ctx,yl,ringS,gc,lead,lotPath:C.pathOf([r],P),ylPath:yl?C.pathOf([yl],P):''}; }
/* the plan svg body: ground square with streets, lot, yard line, edges, scale bar */
function planBody(pl,id,o){ o=o||{}; const {st,P}=pl, S=PW.S;
  return `<defs><clipPath id="${id}"><rect x="${PW.X0}" y="${PW.Y0}" width="${S}" height="${S}"/></clipPath></defs><rect x="${PW.X0}" y="${PW.Y0}" width="${S}" height="${S}" fill="none"/>${pl.ctx}
   <g clip-path="url(#${id})"><path d="${pl.lotPath}" fill="#fff" stroke="none"/>${o.under||''}${pl.yl?`<path d="${pl.ylPath}" fill="${K.fillSup}" stroke="${K.ink2}" stroke-width="1" stroke-dasharray="5 4"/>`:''}${o.over||''}
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

/* ===== M5 Height and floor area (job F1b item 1: bullet graph, rooftop equipment arrow, bars on one scale; item 2: holds the old rooftop card's screening row) ===== */
const niceStep=(max,n)=>{ const raw=max/n, p=Math.pow(10,Math.floor(Math.log10(raw))), m=raw/p; return (m<=1?1:m<=2?2:m<=5?5:10)*p; };
/* the height bullet graph (job F1b item 1), shared with Architecture card 6 (J.B. 8 Nov: both templates draw height the same way).
   o.Y0: ground line y; o.PH: plot height; o.dx: shift right; o.wrapN: wrap width of the equipment note. Returns svg text. */
function hBullet(x,Z,o){ o=o||{}; const city=x.city, hq=hasQ(Z,'h'), H0=hq?null:Z.hOutright, hx=hq||!Z.hx?null:Z.hx, hc=clause(Z,/^Height/i);
  const AR=(BD.data.raw.arch||{}).roofEquip||{}, mode=AR[city], rn=clause(Z,/^Roof equipment/i);
  const topV=Math.max(H0||0,hx?hx[1]:0,20), topM=Math.ceil(topV*1.06/5)*5, Y0=o.Y0||470, SC=(o.PH||400)/topM, y=h=>Y0-h*SC, GS=niceStep(topM,5);
  let s=`<text x="60" y="${Y0-(o.PH||400)-30}" font-size="12" fill="${K.mute}">Height, metres above ground</text>`;
  for(let h=0;h<=topM+0.01;h+=GS) s+=`<line x1="70" y1="${y(h)}" x2="190" y2="${y(h)}" stroke="${K.hair}"/><text x="60" y="${y(h)+4}" font-size="11" fill="${K.mute}" text-anchor="end">${h}</text>`;
  const BX=100, BW=60, RX=248;
  const lead=(yy,t,sub)=>`<line x1="160" y1="${yy}" x2="240" y2="${yy}" stroke="#8E8D88" stroke-width="0.6"/>`+tb(RX,yy-1,[t,{t:sub||''}]);
  if(H0){ if(hx&&hx[1]>hx[0]) s+=`<rect x="${BX}" y="${y(hx[1])}" width="${BW}" height="${(y(hx[0])-y(hx[1])).toFixed(1)}" fill="${K.fillHall}" opacity="0.45"/>`;
    if(hx&&hx[0]>H0) s+=`<rect x="${BX}" y="${y(hx[0])}" width="${BW}" height="${(y(H0)-y(hx[0])).toFixed(1)}" fill="${K.fillHall}"/>`;
    s+=`<rect x="${BX}" y="${y(H0)}" width="${BW}" height="${(Y0-y(H0)).toFixed(1)}" fill="${K.dc}"/>`;
    const cs=hClause(x,Z);
    if(hx&&hx[1]>hx[0]) s+=lead(y(hx[1]),{t:`Up to ${n1(hx[1])} m with approval`,fs:13,w:400,c:K.ink},cs);
    if(hx&&hx[0]>H0) s+=lead(y(hx[0]),{t:`Up to ${n1(hx[0])} m with approval`,fs:13,w:400,c:K.ink},cs);
    s+=lead(y(H0),{t:`Height limit ${n1(H0)} m, outright`,fs:13,w:400,c:K.ink},cs);
    /* rooftop equipment: a dashed arrow up from the limit line, never a band; no stated maximum */
    s+=`<line x1="170" y1="${y(H0)}" x2="170" y2="${y(H0)-26}" stroke="${K.ink}" stroke-width="1" stroke-dasharray="3 3"/><polygon points="166,${y(H0)-22} 174,${y(H0)-22} 170,${y(H0)-30}" fill="${K.ink}"/>`;
    const e1=mode==='discretion'?`Rooftop equipment may rise above ${n1(H0)} m`:mode==='exempt'?'Rooftop equipment is not counted in the height limit':'Rooftop equipment: no rule read';
    const e2=mode==='discretion'?`by the Director’s permission, no stated maximum (${rn?rn.s.replace('Zoning and Development By-law','ZDBL'):'?'})`:rn?`${rn.t.replace(/^./,c=>c.toUpperCase())}; no stated maximum (${rn.s})`:'';
    const e2l=wrap(e2,o.wrapN||64); s+=tb(RX,y(H0)+38,[{t:e1,fs:12,w:400,c:K.ink2},...e2l.map(t=>({t}))]); /* under the outright label, clear of the approval labels above */
  } else s+=tb(BX,y(topM*0.5),[{html:`Height limit ${redQ}`,fs:13,w:500,c:K.ink},{t:Z.assumed?'no data-centre limit in the tool for this zone':'the by-law gives none for this zone'}]);
  s+=`<line x1="66" y1="${Y0}" x2="210" y2="${Y0}" stroke="${K.ink}" stroke-width="1.4"/><text x="100" y="${Y0+18}" font-size="11" fill="${K.mute}">ground (which grade the by-law measures from: not settled <tspan fill="${RED}">?</tspan>)</text>`;
  return o.dx?`<g transform="translate(${o.dx},0)">${s}</g>`:s; }
const hKey=(x,Z)=>{ const mode=((BD.data.raw.arch||{}).roofEquip||{})[x.city], hx=hasQ(Z,'h')?null:Z.hx; return {hx:!!hx,eq:mode==='exempt'?'equipment not counted':'equipment by permission'}; };
C.hBullet=hBullet; C.hKey=hKey;
C.add(T,'Height and floor area',{async build(x){
  const M=x.M, Z=M&&M.Z; if(!Z||!x.sel.ring) return noLot(); const city=x.city;
  const hq=hasQ(Z,'h'), fq=hasQ(Z,'fsr'), H0=hq?null:Z.hOutright, hx=hq||!Z.hx?null:Z.hx, fsr=fq?null:Z.fsr, hc=clause(Z,/^Height/i), fc=clause(Z,/^Floor area/i), area=x.sel.lotArea;
  const AR=(BD.data.raw.arch||{}).roofEquip||{}, mode=AR[city], rn=clause(Z,/^Roof equipment/i), sc=clause(Z,/^(Screening|Equipment)$/i), scr=Z.screen;
  const W=980, H=560; let s=hBullet(x,Z,{Y0:470,PH:400});
  /* floor space: two bars on one scale, the lot in FAINT, the floor space in DC split into 1x, 2x, 3x */
  const FX=660, FW=300, fmax=fsr?fsr[1]:0, tot=fsr&&area?fmax*area:null;
  s+=`<text x="${FX}" y="40" font-size="12" fill="${K.mute}">Floor space allowed, m²</text>`;
  if(tot){ const k=FW/tot, lw=area*k; s+=`<text x="${FX}" y="86" font-size="12" fill="${K.ink2}">Lot area</text><rect x="${FX}" y="94" width="${lw.toFixed(1)}" height="26" fill="${K.faint}"/><text x="${(FX+lw+8).toFixed(1)}" y="112" font-size="12" fill="${K.ink}">${n0(area)}</text>`;
    s+=`<text x="${FX}" y="164" font-size="12" fill="${K.ink2}">Floor space allowed (${fsr[0]===fsr[1]?n1(fmax):n1(fsr[0])+' to '+n1(fmax)} × lot)</text>`;
    const cuts=new Set([0,fmax]); for(let i=1;i<fmax;i++) cuts.add(i); if(fsr[0]<fmax) cuts.add(fsr[0]); const cs=[...cuts].sort((a,b)=>a-b);
    for(let i=0;i<cs.length-1;i++){ const a=cs[i], b=cs[i+1], w=(b-a)*lw, x0=FX+a*lw, approvedPart=fsr[0]<fmax&&a>=fsr[0];
      s+=`<rect x="${(x0+(i?1:0)).toFixed(1)}" y="172" width="${Math.max(0,w-(i?1:0)-(i<cs.length-2?1:0)).toFixed(1)}" height="26" fill="${approvedPart?K.fillHall:K.dc}"/>`;
      if(w>=22&&(Number.isInteger(b)||i===cs.length-2)) s+=`<text x="${(x0+w/2).toFixed(1)}" y="189" font-size="11" fill="${approvedPart?K.ink:'#fff'}" text-anchor="middle">${Number.isInteger(b)?b+'×':n1(b)+'×'}</text>`; }
    s+=`<text x="${FX+FW}" y="218" font-size="12" fill="${K.ink}" text-anchor="end">${n0(tot)}</text>`;
    const st=niceStep(tot,3); s+=`<line x1="${FX}" y1="232" x2="${FX+FW}" y2="232" stroke="${K.rule}"/>`; for(let v=0;v<=tot+0.01;v+=st) s+=`<line x1="${(FX+v*k).toFixed(1)}" y1="232" x2="${(FX+v*k).toFixed(1)}" y2="238" stroke="${K.mute}"/><text x="${(FX+v*k).toFixed(1)}" y="252" font-size="10" fill="${K.mute}" text-anchor="middle">${n0(v)}</text>`;
    s+=tb(FX,284,[{t:`floor space ratio ${fsr[0]===fsr[1]?n1(fmax):n1(fsr[0])+' to '+n1(fmax)} · ${shortS(fc&&fc.s)}`,fs:11,w:400,c:K.mute}],{flat:true});
  } else s+=tb(FX,86,[{html:`Floor space ${redQ}`,fs:13,w:500,c:K.ink},{t:Z.assumed?'no data-centre limit in the tool for this zone':'the by-law gives none for this zone'}]);
  s+=`<g transform="translate(60,540)" font-size="11.5" fill="${K.ink2}"><rect x="0" y="-9" width="11" height="11" fill="${K.dc}"/><text x="16" y="1">outright</text>${hx?`<rect x="90" y="-9" width="11" height="11" fill="${K.fillHall}"/><text x="106" y="1">with approval</text>`:''}<line x1="210" y1="-4" x2="234" y2="-4" stroke="${K.ink}" stroke-dasharray="3 3"/><text x="240" y="1">${mode==='exempt'?'equipment not counted':'equipment by permission'}</text></g>`;
  const svg=`<svg style="max-width:100%;height:auto" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(x.addr)}: height limits as a bullet graph and floor space as bars on one scale">${s}</svg>`;
  const scrTxt=sc?sc.t:scr?'required (see sources)':null, eqV=mode==='discretion'?'Director’s permission':mode==='exempt'?'not counted in the height':C.q();
  const miss=['how far rooftop equipment may rise above the limit (the by-law states no maximum)','which grade the height is measured from']; if(Z.assumed) miss.push('limits for this zone (no data-centre row in the tool)'); if(hq&&!Z.assumed) miss.push('height limit (the by-law gives none)'); if(fq&&!Z.assumed) miss.push('floor space ratio (the by-law gives none)');
  return {draw:`<div class="f1c-mb-wrap">${svg}</div>`,lead:'How tall the zone lets a building be, outright and with approval, and how much floor it may hold. Rules, not a design.',
    hero:[{v:H0?n1(H0):C.q(),u:H0?' m':'',l:'height, outright'},{v:fsr?(fsr[0]===fsr[1]?n1(fmax):n1(fsr[0])+'–'+n1(fmax)):C.q(),u:fsr?' × lot':'',l:'floor space ratio'}].concat(hx&&H0&&hx[0]>H0?[{v:n1(hx[0]),u:' m',l:'with approval'+(hx[1]>hx[0]?` (up to ${n1(hx[1])} in some cases)`:'')}]:[]).concat([{v:tot?n0(tot):C.q(),u:tot?' m²':'',l:'floor space, at most'}]),
    rows:[[`Rooftop equipment above ${H0?n1(H0)+' m':'the limit'}`,eqV],['How far above',C.q('not stated')],['Screening',scrTxt||`no rule read in ${zoneName(x)}`]],
    more:[['Each rule and its clause',`<table class="f1c-mb-ed">${[hc&&[hc.k,hc.t,hc.s],fc&&[fc.k,fc.t,fc.s],rn&&[rn.k,rn.t,rn.s],sc&&[sc.k,sc.t,sc.s]].filter(Boolean).map(c=>`<tr><td style="width:90px">${esc(c[0])}</td><td>${esc(c[1])}<small>${esc(c[2])}</small></td></tr>`).join('')}</table>${scr?`<p>${esc(scr.why.replace(/<[^>]+>/g,''))}</p>`:''}${Z.warn?`<p>${esc(Z.warn.replace(/<[^>]+>/g,''))}</p>`:''}`],['Our reading',`<p>${esc(AR._note||'')}</p>`]],
    src:[srcZone(x),'Height: Z.hOutright and Z.hx from the zone row, on one metre scale; each band’s clause is the zone’s Height clause.',`Floor space: floor space ratio × lot area (${n0(area)} m², the tool’s lot), our arithmetic; each segment is one lot area long.`,'Rooftop equipment: tool/data/arch.json roofEquip (Edmonton Bylaw 20001 s. 5.70 cl. 1.9.5, register arch_hb_edm570; Vancouver Zoning and Development By-law s. 10.1.1, register arch_up_vanZDB10); the Edmonton reading for dry coolers and chillers is ours.','Screening: the zone row’s Screening or Equipment clause, or the tool’s screening rule (Z.screen).','The height base (what the by-law measures from) is not settled in the tool (?).'],missing:miss}; }});

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
  const YA=yardAreas(M), buildable=YA?YA.all:(yl?ringArea(yl):null), yz=Z.yards||{}, yc=clause(Z,/^(Yards|Setbacks)/i);
  const miss=[]; if(Z.assumed) miss.push('yards for this zone (it has no data-centre row in the tool)'); if(!yl) miss.push('yard line (no yard figure, or it folds on this lot)'); if(edges.some(e=>e.kind==='unclear')) miss.push('class of one or more lot lines (unclear)');
  const rows=[['Front yard',by('front')?`${by('front')} m`:'no front line found'],['Side yard',by('side')?`${by('side')} m`:'none found'],['Rear yard',by('rear')?`${by('rear')} m`:'none found']]
    .concat(yz.max?[['Building width or depth, at most',`${n0(yz.max)} m`]]:[]).concat([['Buildable area inside the yards',buildable?`${n0(buildable)} m²`:C.q()]]).concat(YA&&YA.dIn?[[`Inside the yards, within ${n0(YA.mx)} m of the front yard line`,`${n0(YA.dIn)} m²`]]:[]).concat((M.frontYard?[['Front public yard',M.frontYard.public?`${n0(M.frontYard.m2)} m², ${n1(M.frontYard.dMin)}${M.frontYard.dMax-M.frontYard.dMin>=0.1?'–'+n1(M.frontYard.dMax):''} m deep${M.frontYard.toStreet===false?'; does not open off a street ?':''}${M.frontYard.beside?'; side drive beside it (fence or kerb)':''}; covered beds and heated paths from data-centre heat ?`:`none: under 6 m (${n1(M.frontYard.dMin)} m at its shallowest)`]]:[]));   /* F8 flag (10 Nov 2026) */
  return {draw:`<div class="f1c-mb-wrap">${svg}<div class="f1c-key">${edgeKey(pl)}</div>${note}${edges.length<=6?tbl:''}</div>`,lead:`Each lot line is classed as front, side or rear, and each class has its own yard. ${zoneName(x)}, ${gcite(Z,x)}.`,
    hero:[by('front')&&{v:by('front'),u:' m',l:'front yard'},by('side')&&{v:by('side'),u:' m',l:'side yard'},by('rear')&&{v:by('rear'),u:' m',l:'rear yard'}].filter(Boolean),
    rows,more:[['Each lot line',tbl],['Each rule and its clause',`<table class="f1c-mb-ed">${(Z.cl||[]).filter(c=>/^(Yards|Setbacks)/i.test(c[0])).map(c=>`<tr><td style="width:90px">${esc(c[0])}</td><td>${esc(c[1])}<small>${esc(c[2])}</small></td></tr>`).join('')}</table>`],['How each line was classed',`<p>${esc(((M.yards&&M.yards.src)||[]).join(', ')||'')}. Where the by-law gives different yards by what a line faces (street, lane, neighbouring zone), the tool reads that from the City’s street and zone data.</p>`]],
    src:[srcZone(x),`Each lot line’s class and yard: the tool’s lot-line reading (lotside.js, site.js; ${((M.yards&&M.yards.src)||[]).join(', ')||'?'}); lines marked "our reading" are ours, not the City’s.`,'Buildable area: the area inside the yard line (each lot line moved in by its own yard, M.yardOff; before 10 Nov 2026 it was clipped to the lot’s rectangular frame and read low on skewed lots), our arithmetic'+(M.yardOffBad?'; the yard line folds on this lot, so no area is given (?)':'')+'.',C.CONTEXT_SRC(x.city)].concat(M.frontYard?[M.frontYard.why]:[]),missing:miss}; }});

/* ===== M7 Noise limits around the lot (job F1b item 4): each lot within ~340 m filled by the night limit at that lot, at the point of reception ===== */
const NR=340;
function ptSegD(px,py,ax,ay,bx,by){ const dx=bx-ax,dy=by-ay,L=dx*dx+dy*dy; let t=L?((px-ax)*dx+(py-ay)*dy)/L:0; t=Math.max(0,Math.min(1,t)); return Math.hypot(px-ax-t*dx,py-ay-t*dy); }
function ptRingD(px,py,r){ let b=1e12; for(let i=0,j=r.length-2;i<r.length;j=i,i+=2) b=Math.min(b,ptSegD(px,py,r[j],r[j+1],r[i],r[i+1])); return b; }
/* edge-to-edge distance, and the receiving lot's vertex nearest the picked lot (the point of reception: our reading of "nearest point") */
function ringNear(a,b){ let d=1e12, v=null; for(let i=0;i<b.length;i+=2){ const q=ptRingD(b[i],b[i+1],a); if(q<d){ d=q; v=[b[i],b[i+1]]; } } for(let i=0;i<a.length;i+=2) d=Math.min(d,ptRingD(a[i],a[i+1],b)); return {d,v}; }
const rayFree=(ax,ay,dir,ex,ring)=>{ for(let k=0;k<ring.length;k++){ const p=ring[k], q=ring[(k+1)%ring.length]; if(segHit([ax+dir*0.8,ay],[ex,ay],p,q)) return false; } return true; };
C.add(T,'Noise limits around the lot',{async build(x){
  const M=x.M, Z=M&&M.Z, s=x.sel, r=s.ring; if(!r||!Z) return noLot(); const city=x.city, GN=(BD.data.raw.noise||{}).gen||{}, gv=GN.van, ge=GN.edm;
  const c=BD.centroid(r), za=s.a||[], zone=city==='van'?String(za[1]||'').trim():String(za[2]||za[1]||'').trim().split(/\s+/)[0].toUpperCase();
  const src={city,zone,c,cls:city==='van'?(BD.eng.vZone(zone,c[0],c[1])||'quiet'):null}, lb=C.bbox(r);
  const own=new Set((s.rings||[]).concat([r])), mine=p=>own.has(p.r)||(city==='van'?p.id===s.id:(p.ids||[]).includes(s.id)), seen=new Set(), lots=[];
  for(const k in BD.S.tiles){ if(!k.startsWith(city+':')) continue; const t=BD.S.tiles[k]; for(const p of t.par||[]){ if(mine(p)) continue; const key=(p.id||p.ids)+':'+p.r[0]; if(seen.has(key)) continue; seen.add(key);
    const bb=p.bb||C.bbox(p.r); if(bb[0]>lb[2]+NR||bb[2]<lb[0]-NR||bb[1]>lb[3]+NR||bb[3]<lb[1]-NR) continue; const id=p.ids?p.ids[0]:p.id, a=t.A[id]; const z=a?(city==='van'?((a[1]||'').trim()||null):(a[2]||a[1]||null)):null;
    const nr=ringNear(r,p.r); if(nr.d>NR) continue; const lim=BD.eng.noiseLimitAt(src,z,nr.v[0],nr.v[1]); lots.push({ring:p.r,addr:a&&a[0]?C.titleCase(a[0]):'',z,d:nr.d,L:lim.L,zt:lim.zt,sec:lim.sec,cls:lim.cls,v:nr.v}); } }
  const Ls=lots.map(l=>l.L), lmin=Ls.length?Math.min(...Ls):null, lmax=Ls.length?Math.max(...Ls):null, strict=lmin!=null&&lmin<lmax;
  lots.forEach(l=>{ l.strict=strict&&l.L===lmin; });
  const nearStrict=lots.filter(l=>l.strict).sort((a,b)=>a.d-b.d)[0]||null, nextDoor=[...lots].sort((a,b)=>a.d-b.d)[0]||null;
  /* the drawing: own frame at 0.8 px per metre, label columns left and right */
  const BX=190, BY=10, BW=560, BH=440, SCL=0.8, hw=BW/2/SCL, hh=BH/2/SCL, cx=(lb[0]+lb[2])/2, cy=(lb[1]+lb[3])/2, bb=[cx-hw,cy-hh,cx+hw,cy+hh], f=C.frame(bb,BW,BH,0);
  const P=(px,py)=>{ const q=f.P(px,py); return [q[0]+BX,q[1]+BY]; }, I2=(sx,sy)=>f.I(sx-BX,sy-BY);
  const ctx=C.context(x,P,I2,[BX,BY,BW,BH],{skip:s.id}), ringS=[]; for(let i=0;i<r.length;i+=2) ringS.push(P(r[i],r[i+1]));
  const fillOf=l=>l.strict?'#C9D6E6':'#EFEFEE';
  const lotsSvg=lots.map(l=>`<path d="${C.pathOf([l.ring],P)}" fill="${fillOf(l)}" stroke="#fff" stroke-width="0.6"><title>${esc((l.addr?l.addr+' · ':'')+l.zt+' · night limit '+l.L+' dBA · '+Math.round(l.d)+' m')}</title></path>`).join('');
  let leaders=''; const ys=[];
  const lab=(anchorPts,lines)=>{ for(const side of ['R','L']) for(const a of anchorPts){ if(a[0]<BX+4||a[0]>BX+BW-4||a[1]<BY+14||a[1]>BY+BH-14) continue; const dir=side==='R'?1:-1, ex=side==='R'?BX+BW+8:BX-8; if(ys.some(v=>Math.abs(v-a[1])<46)) continue; if(!rayFree(a[0],a[1],dir,ex,ringS)) continue; ys.push(a[1]);
      return `<circle cx="${a[0].toFixed(1)}" cy="${a[1].toFixed(1)}" r="2.2" fill="${K.ink}"/><line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${ex}" y2="${a[1].toFixed(1)}" stroke="#8E8D88" stroke-width="0.6"/>`+tb(side==='R'?ex+6:ex-6,a[1]-3,lines,{anchor:side==='R'?'start':'end'}); } return ''; };
  leaders+=lab([...ringS].sort((a,b)=>b[0]-a[0]).slice(0,4),[{t:C.titleCase(za[0]||x.addr),fs:13,w:400,c:K.ink},{t:nextDoor?`neighbours: ${nextDoor.L} dBA at night`:'no neighbouring lot found',c:K.mute}]);
  if(nearStrict){ const v0=P(nearStrict.v[0],nearStrict.v[1]), pts=[]; for(let i=0;i<nearStrict.ring.length;i+=2) pts.push(P(nearStrict.ring[i],nearStrict.ring[i+1])); pts.unshift(v0); pts.sort((a,b)=>Math.hypot(a[0]-v0[0],a[1]-v0[1])-Math.hypot(b[0]-v0[0],b[1]-v0[1]));
    leaders+=lab(pts,[{t:`Nearest ${city==='van'?'quiet zone':'residential lot'}`,fs:13,w:400,c:K.ink},{t:nearStrict.addr||nearStrict.z||'no address on record',c:K.ink2,fs:12},{t:`${nearStrict.d<1?'adjoins this lot':Math.round(nearStrict.d)+' m away'} · night limit ${nearStrict.L} dBA`}]); }
  const W=BX+BW+200, H=BH+BY+60, lotPath=`<path d="${C.pathOf([r],P)}" fill="${K.dc}" stroke="${K.ink}" stroke-width="1.4"/>`;
  const svg=`<svg style="max-width:100%;height:auto" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(x.addr)}: the night noise limit at each lot within ${NR} m"><defs><clipPath id="f1c-mb7"><rect x="${BX}" y="${BY}" width="${BW}" height="${BH}"/></clipPath></defs>${ctx}<g clip-path="url(#f1c-mb7)">${lotsSvg}${lotPath}</g>${leaders}<g transform="translate(${BX+10},${BY+BH-26})"><rect x="0" y="0" width="${(50*f.s).toFixed(1)}" height="4" fill="${K.ink}"/><rect x="${(50*f.s).toFixed(1)}" y="0" width="${(50*f.s).toFixed(1)}" height="4" fill="#fff" stroke="${K.ink}" stroke-width="0.8"/><text x="0" y="16" font-size="11" fill="${K.mute}">0</text><text x="${(100*f.s).toFixed(1)}" y="16" font-size="11" fill="${K.mute}" text-anchor="end">100 m</text><text x="0" y="-8" font-size="11" fill="${K.mute}">N ↑</text></g>
   <g transform="translate(${BX},${H-14})" font-size="11.5" fill="${K.ink2}"><rect x="0" y="-9" width="11" height="11" fill="${K.dc}" stroke="${K.ink}"/><text x="16" y="1">the lot</text><rect x="80" y="-9" width="11" height="11" fill="#EFEFEE" stroke="${K.rule}"/><text x="96" y="1">${lmax!=null?`night limit ${lmax} dBA`:'night limit ?'}</text>${strict?`<rect x="250" y="-9" width="11" height="11" fill="#C9D6E6"/><text x="266" y="1">night limit ${lmin} dBA (${city==='van'?'quiet zone':'residential'})</text>`:''}</g></svg>`;
  const genRule=city==='van'?(gv?`Generator testing: up to ${gv.test.v} dBA at the point of reception, or 6.1 m from the source if that is farther, once a month for up to 60 minutes in the daytime, plus once a year for up to 180 minutes. By-law 6555 s. 4.1(c).`:null)
    :(ge?`Generator testing, daytime: up to one hour a day at ${ge.resTest1h.v} dB(A) at residential lines and ${ge.nonTest1h.v} at non-residential. At night: ${ge.resNight.v} and ${ge.nonNight.v}, no allowance. Bylaw 14600 ss. 19(3), 21(3), 20, 22; s. 24 has no generator exemption.`:null);
  const where=city==='van'?'at the point of reception':'at the receiving lot’s line';
  const miss=[]; if(!lots.length) miss.push('receiving lots (no parcels loaded around this lot)'); if(lots.some(l=>l.cls==='unknown'||/assumed|no parcel/.test(l.zt))) miss.push('some receiving lots have no zone on record; the strict limit is assumed'); miss.push('day limits (not drawn: the map shows the night limit, the strictest)');
  return {draw:`<div class="f1c-mb-wrap">${svg}</div>`,lead:'The limit belongs to the neighbour who hears the sound: each lot’s zone sets it. Limits only, not a prediction.',
    hero:[{v:lmin!=null?String(lmin):C.q(),u:lmin!=null?' dBA':'',l:'strictest night limit nearby'},{v:nearStrict?String(Math.round(nearStrict.d)):C.q(),u:nearStrict?' m':'',l:nearStrict?`to the nearest ${city==='van'?'quiet zone':'residential lot'}`:'to a stricter lot (none within '+NR+' m)'},{v:nextDoor?String(nextDoor.L):C.q(),u:nextDoor?' dBA':'',l:'night limit next door'},{v:city==='van'?(gv?String(gv.test.v):C.q()):(ge?ge.resTest1h.v+' / '+ge.nonTest1h.v:C.q()),u:' dBA',l:city==='van'?'generator testing, at most':'generator testing, daytime'}],
    rows:[['Where it applies',where],['Generator testing',city==='van'?'By-law 6555 s. 4.1(c)':'Bylaw 14600 ss. 19(3), 21(3)']],
    more:[['Generator testing',`<p>${esc(genRule||'not in the tool')}</p>`],['How the map is made',`<p>Each lot within ${NR} m of this lot is filled by the night limit that applies at it, from the tool’s own noise rule. Hover a lot for its zone and limit. A lot with no zone on record takes the strict limit.</p>`]],
    src:[city==='van'?'Limits: Vancouver Noise Control By-law 6555 s. 2.3(b) (the tool’s noise rule, BD.eng.noiseLimitAt in tool/engine.js: 55 dBA at a quiet-zone lot, 65 at an intermediate or activity-zone lot, for an activity-zone source), at the receiving lot’s point of reception.':'Limits: Edmonton Bylaw 14600 ss. 20, 22 (50 dBA residential, 60 non-residential at night; the tool’s noise rule, BD.eng.noiseLimitAt), at the receiving lot’s property line.','Generator testing: tool/data/noise.json gen (van6555s41c; edm14600s19to24).',`Receiving lots: parcels within ${NR} m edge to edge of the picked lot, with their zones from the loaded tiles; the point of reception is the receiving lot’s corner nearest the picked lot (our reading). Distances: our arithmetic.`,srcZone(x),C.CONTEXT_SRC(city)],missing:miss}; }});

/* ===== M8 Storeys and street frontage (job F1b item 3): a storey stack per height limit, at the minimum heights ===== */
const hClause=(x,Z)=>x.city==='edm'&&(Z.vkey||Z.key)==='BE'?'Zoning Bylaw 20001 s. 2.120, 4.1.1':shortS((clause(Z,/^Height/i)||{}).s)||'?'; /* BE clause as J.B. gave it, 8 Nov 2026 */
const num=(s,re)=>{ const m=re.exec(s||''); return m?+m[1]:null; };
function storeyRule(Z){ const cs=((Z&&Z.cl)||[]).filter(c=>/^(Ground floor|Floor heights)$/i.test(c[0])), txt=cs.map(c=>c[1]).join(' ; '), notApplied=/not applied/i.test(txt);
  const g=notApplied?null:num(txt,/first floor (?:at least )?([\d.]+) m/i), u=notApplied?null:num(txt,/upper floors? (?:at least )?([\d.]+) m/i), s2=notApplied?null:num(txt,/second (?:at least )?([\d.]+) m/i);
  const m=/"([^"]*not permitted at[^"]*)"/i.exec(txt), useTxt=m?m[1]:null;
  return {g,u,s2,notApplied,useTxt,useClause:clause(Z,/^Ground floor/i),fh:clause(Z,/^Floor heights/i),cs}; }
C.add(T,'Storeys and street frontage',{async build(x){
  const M=x.M, Z=M&&M.Z; if(!Z||!x.sel.ring) return noLot(); const R=storeyRule(Z), hq=hasQ(Z,'h'), H0=hq?null:Z.hOutright, hx=hq||!Z.hx?null:Z.hx, AD=(BD.data.raw.arch||{}).storeyMin;
  const g=R.g, uRule=R.u, u=uRule!=null?uRule:(R.s2!=null?R.s2:null), have=g!=null&&u!=null&&H0;
  const cols=[]; if(H0) cols.push({h:H0,l:`under ${n1(H0)} m, outright`}); if(hx&&H0&&hx[0]>H0) cols.push({h:hx[0],l:`under ${n1(hx[0])} m, with approval`});
  const topH=Math.max(...cols.map(c=>c.h),20), Y0=480, SC=Math.min(11,340/topH), y=h=>Y0-h*SC, W=980, H=580, CW=120, XS=[120,340];
  let s='', GS=topH>40?10:5; for(let h=0;h<=topH+0.01;h+=GS) s+=`<text x="96" y="${y(h)+4}" text-anchor="end" font-size="11" fill="${K.mute}">${h}</text>`; s+=`<text x="80" y="${y(Math.ceil(topH/GS)*GS)-24}" font-size="12" fill="${K.mute}">metres above ground</text>`;
  cols.forEach((c,i)=>{ const X=XS[i]; c.x=X;
    if(have){ const nAbove=Math.floor((c.h-g)/u+1e-9), n=1+nAbove, spare=c.h-g-nAbove*u; c.n=n; c.spare=spare;
      s+=`<rect x="${X}" y="${(y(g)+1).toFixed(1)}" width="${CW}" height="${(g*SC-2).toFixed(1)}" rx="2" fill="${K.dc}"/><text x="${X+CW/2}" y="${(y(g/2)+4).toFixed(1)}" font-size="11" fill="#fff" text-anchor="middle">${n1(g)} m</text>`;
      for(let k=0;k<nAbove;k++){ const b0=g+k*u, yy=y(b0+u); s+=`<rect x="${X}" y="${(yy+1).toFixed(1)}" width="${CW}" height="${(u*SC-2).toFixed(1)}" rx="2" fill="${K.fillHall}"/><text x="${X+CW/2}" y="${(y(b0+u/2)+4).toFixed(1)}" font-size="11" fill="${K.ink}" text-anchor="middle">${n1(u)} m</text>`; }
      s+=`<line x1="${X-14}" y1="${y(c.h)}" x2="${X+CW+14}" y2="${y(c.h)}" stroke="${K.ink}" stroke-width="1.2"/><text x="${X+CW/2}" y="${y(c.h)-10}" font-size="13" fill="${K.ink}" text-anchor="middle">${n} storeys</text>`;
      s+=`<text x="${X+CW/2}" y="${Y0+22}" font-size="12" fill="${K.ink2}" text-anchor="middle">${c.l}</text><text x="${X+CW/2}" y="${Y0+37}" font-size="11" fill="${K.mute}" text-anchor="middle">${n1(spare)} m spare</text>`; }
    else if(!R.notApplied){ /* no storey rule in this zone (J.B. 8 Nov: keep "no rule here"; the height limit is the one line) */
      s+=`<rect x="${X}" y="${y(c.h)}" width="${CW}" height="${(c.h*SC).toFixed(1)}" rx="2" fill="none" stroke="${K.rule}" stroke-dasharray="4 3"/><line x1="${X-14}" y1="${y(c.h)}" x2="${X+CW+14}" y2="${y(c.h)}" stroke="${K.ink}" stroke-width="1.2"/><text x="${X+CW/2}" y="${y(c.h)-10}" font-size="13" fill="${K.ink}" text-anchor="middle">height limit ${c.h.toFixed(1)} m</text><text x="${X+CW/2}" y="${Y0+22}" font-size="12" fill="${K.ink2}" text-anchor="middle">${c.l}</text>`; }
    else { s+=`<rect x="${X}" y="${y(c.h)}" width="${CW}" height="${(c.h*SC).toFixed(1)}" rx="2" fill="none" stroke="${K.rule}" stroke-dasharray="4 3"/><line x1="${X-14}" y1="${y(c.h)}" x2="${X+CW+14}" y2="${y(c.h)}" stroke="${K.ink}" stroke-width="1.2"/><text x="${X+CW/2}" y="${y(c.h)-10}" font-size="13" fill="${RED}" text-anchor="middle">? storeys</text><text x="${X+CW/2}" y="${Y0+22}" font-size="12" fill="${K.ink2}" text-anchor="middle">${c.l}</text>`; } });
  const GX=cols.length?XS[0]-14:100, GE=cols.length?XS[cols.length-1]+CW:500; s+=`<line x1="${XS[0]-20}" y1="${Y0}" x2="${GE+20}" y2="${Y0}" stroke="${K.ink}" stroke-width="1.4"/>`;
  /* notes on the right: the ground-floor rule on a straight leader from the right-most column's edge, level with the ground storey */
  const NX=GE+138, lastX=GE; let note='';
  const gy=have||g!=null?y((g||6)/2):y(3);
  if(R.useTxt){ note+=`<line x1="${lastX}" y1="${gy}" x2="${NX-8}" y2="${gy}" stroke="#8E8D88" stroke-width="0.6"/><circle cx="${lastX-1}" cy="${gy}" r="2.2" fill="${K.ink}"/>`+tb(NX,gy-8,[...wrap('Ground storey: '+R.useTxt.replace(/^./,c=>c.toLowerCase()).replace(/^bulk data storage/i,'data storage').replace(/^"/,''),46).map((t,i)=>({t,fs:13,w:400,c:K.ink})),{t:`${shortS((R.useClause||{}).s)}`}]); }
  else note+=tb(NX,gy-8,[{t:'Ground storey: no use rule here',fs:13,w:400,c:K.ink},{t:`none in ${zoneName(x)}`}]);
  if(have) note+=tb(NX,y(g+u*2.5)-6,[{t:'Minimum floor to floor',fs:13,w:400,c:K.ink},{t:`ground storey ${n1(g)} m · each storey above ${n1(u)} m`,fs:12,c:K.ink2},{t:`${shortS((R.fh||R.useClause||{}).s)}, new buildings`}]);
  else if(R.notApplied) note+=tb(NX,y(14),[{html:`Minimum storey heights ${redQ}`,fs:13,w:400,c:K.ink},{t:'apply in sub-area A only; the tool does not map it'},{t:shortS((R.fh||{}).s)}]);
  else note+=tb(NX,y(Math.min(14,(H0||14)*0.9)),[{t:'Minimum storey heights · no rule here',fs:13,w:400,c:K.ink},{t:`none in ${zoneName(x)}`},...(H0?[{t:`Height limit ${H0.toFixed(1)} m (${hClause(x,Z)})`,fs:12,c:K.ink2}]:[])]);
  const key=`g transform="translate(100,${H-30})"`;
  s+=note+`<g transform="translate(100,${H-20})" font-size="11.5" fill="${K.ink2}"><rect x="0" y="-9" width="11" height="11" fill="${K.dc}"/><text x="16" y="1">ground storey</text><rect x="120" y="-9" width="11" height="11" fill="${K.fillHall}"/><text x="136" y="1">storeys above, at the minimum height</text><line x1="380" y1="-4" x2="404" y2="-4" stroke="${K.ink}" stroke-width="1.2"/><text x="410" y="1">height limit</text></g>`;
  const svg=`<svg style="max-width:100%;height:auto" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(x.addr)}: how many storeys fit under each height limit at the minimum storey heights">${s}</svg>`;
  const fy=(M.edgeYards||[]).filter(e=>e.kind==='front'), fd=fy.length?Math.min(...fy.map(e=>e.d)):null, yc=clause(Z,/^(Yards|Setbacks)/i);
  const miss=['which grade the height is measured from']; if(R.notApplied) miss.push('minimum storey heights for I-2 sub-area A (the tool does not map the sub-area)'); if(Z.assumed) miss.push('rules for this zone (no data-centre row in the tool)');
  const sm=AD&&AD['I-3']&&x.city==='van'&&(Z.vkey||Z.key)==='I-3'?AD['I-3']:null;
  const frontText=R.useTxt?R.useTxt.replace(/^./,c=>c.toUpperCase()):'no ground-floor use rule here';
  return {draw:`<div class="f1c-mb-wrap">${svg}</div>`,lead:'How many storeys the minimum heights leave room for, and what may sit at street level.',
    hero:!have&&!R.notApplied?[{v:H0?H0.toFixed(1):C.q(),u:H0?' m':'',l:'height limit; no storey rule here'}]:cols.map(c=>({v:c.n!=null?String(c.n):C.q(),l:`storeys ${c.l.replace(', outright','').replace(', with approval',' (with approval)')}`})).concat(have?[{v:n1(g),u:' m',l:'ground storey, at least'},{v:n1(u),u:' m',l:uRule!=null?'storeys above, at least':'second storey minimum, used for each storey above (?)'}]:[]),
    rows:[...(!have&&!R.notApplied&&H0?[['Height limit',`${H0.toFixed(1)} m (${hClause(x,Z)})`]]:[]),['At street level',R.useTxt?'entrances only for data storage':'no rule here'],['Front yard',fd!=null?`${n1(fd)} m`:'no front line found'],['Ground storey, floor to floor',g!=null?`at least ${n1(g)} m`:R.notApplied?C.q():'no rule here'],['Storeys above, floor to floor',uRule!=null?`at least ${n1(uRule)} m`:R.s2!=null?`second storey at least ${n1(R.s2)} m`:R.notApplied?C.q():'no rule here']],
    more:[['Each rule and its clause',`<table class="f1c-mb-ed">${R.cs.concat(yc?[[yc.k,yc.t,yc.s]]:[]).map(c=>`<tr><td style="width:90px">${esc(c[0])}</td><td>${esc(c[1])}<small>${esc(c[2])}</small></td></tr>`).join('')||'<tr><td>no ground-floor or storey-height rule in this zone’s row</td></tr>'}</table>`],['How the storeys are counted',`<p>The ground storey at its minimum, then as many storeys above it at their minimum as fit under the limit. This is our arithmetic at the minimum heights; real storeys may be taller, so fewer fit.</p>`]],
    src:[srcZone(x),'Storey heights and the ground-floor use rule: the "Ground floor" and "Floor heights" clauses of the zone row (figures read from the clause text); '+(sm?`Vancouver I-3 minimums also in tool/data/arch.json storeyMin (${sm.ground} m and ${sm.above} m, register arch_hb_vanI3).`:'no figure in tool/data/arch.json storeyMin for this zone.'),'Storey counts: our arithmetic at the minimum heights: floor((limit − ground storey) ÷ upper storey) + 1; spare = what is left.','Street frontage: the ground-floor use clause and the front yard from the lot-line reading (M.edgeYards).','Height limits: Z.hOutright and Z.hx.'],missing:miss}; }});

/* ===== M9 Loading (job F1b items 5 and 7): the lot plan on its site context, one bay as a dimensioned key, the by-law's steps from floor area to bays ===== */
C.add(T,'Loading',{async build(x){
  const pl=await plan(x,{X0:170}); if(!pl) return noLot(); const {M,edges}=pl, Z=M.Z, LN=M.loadingNeed, city=x.city, LD=(BD.data.raw.zones||{}).loading||{};
  const eq=clause(Z,/^(Equipment|Screening)$/i), rear=/loading at (?:the )?rear or sides/i.test(eq?eq.t:'');
  /* where the by-law limits it: EETB puts loading at the rear or sides, screened; elsewhere the by-law sets the bay, not where on the lot */
  let under=''; if(rear){ const nonFront=pl.edges.filter(e=>e.kind!=='front'); under=`<g clip-path="url(#f1c-mb9)">`+nonFront.map(e=>`<line x1="${e.a[0].toFixed(1)}" y1="${e.a[1].toFixed(1)}" x2="${e.c[0].toFixed(1)}" y2="${e.c[1].toFixed(1)}" stroke="${K.pub}" stroke-opacity="0.32" stroke-width="30"/>`).join('')+'</g>'; }
  const pri=[...edges].sort((a,b)=>({front:0,rear:1}[a.kind]??2)-({front:0,rear:1}[b.kind]??2)||b.slen-a.slen).map(e=>({e,gap:40})), placed=pl.lead(pri.filter(p=>p.e.d>0||p.e.kind==='front'||p.e.kind==='rear'));
  const lab=it=>{ const e=it.e; return [{t:e.d>0?`${KN[e.kind]||e.kind} yard ${n1(e.d)} m`:`${KN[e.kind]||e.kind}: no yard`,fs:13,w:500,c:K.ink},{t:rear?(e.kind==='front'?'no loading here':'loading may go here'):'no placement rule'}]; };
  /* the floor area the count assumes: the tool's own figure (loadingNeed basis), which is the most floor space the zone allows */
  const fsr=Z.fsr, area=x.sel.lotArea, bm=LN&&/([\d,]+) m² of (?:floor|non-residential)/.exec(LN.basis||''), gfa=bm?+bm[1].replace(/,/g,''):(fsr&&area?fsr[1]*area:null);
  const bays=g=>{ if(city==='van'){ const L=LD.van; if(!L) return null; const rh=v=>Math.floor(v+0.5); return g<100?0:1+(g>L.bayFirst.v?1:0)+Math.max(0,rh((g-L.bayEach.v)/L.bayEach.v)); } const L=LD.edm; if(!L) return null; return g<L.spaces.v[0]?0:g<=L.spaces.v[1]?1:2; };
  const H2=PW.H+70; let key='', kw=270;
  if(LN){ const sc=Math.min(11,(kw-100)/(LN.len+2)), L=LN.len*sc, Wd=LN.wid*sc, ax0=28, ay0=60;
    key+=`<text x="${ax0}" y="22" font-size="13" font-weight="500" fill="${K.ink}">One ${esc(LN.cls)}, at required size</text><text x="${ax0}" y="37" font-size="11.5" fill="${K.mute}">key only; larger than the lot’s scale</text>`;
    key+=`<rect x="${ax0}" y="${ay0}" width="${L.toFixed(1)}" height="${Wd.toFixed(1)}" fill="${K.fillSup}" stroke="${K.ink2}" stroke-width="1" stroke-dasharray="5 4"/>`;
    key+=`<line x1="${ax0}" y1="${ay0+Wd+12}" x2="${(ax0+L).toFixed(1)}" y2="${ay0+Wd+12}" stroke="${K.ink}" stroke-width="1"/><path d="M${ax0} ${ay0+Wd+8}v8M${(ax0+L).toFixed(1)} ${ay0+Wd+8}v8" stroke="${K.ink}"/><text x="${(ax0+L/2).toFixed(1)}" y="${ay0+Wd+28}" text-anchor="middle" font-size="12" font-weight="500" fill="${K.ink}">${n1(LN.len)} m long</text>`;
    key+=`<line x1="${ax0+L+14}" y1="${ay0}" x2="${ax0+L+14}" y2="${(ay0+Wd).toFixed(1)}" stroke="${K.ink}" stroke-width="1"/><path d="M${ax0+L+10} ${ay0}h8M${ax0+L+10} ${(ay0+Wd).toFixed(1)}h8" stroke="${K.ink}"/><text x="${ax0+L+24}" y="${(ay0+Wd/2+4).toFixed(1)}" font-size="12" font-weight="500" fill="${K.ink}">${n1(LN.wid)} m wide</text>`;
    const ay=ay0+Wd+40, aw=LN.aisle*sc*0.6; key+=`<rect x="${ax0}" y="${ay}" width="${L.toFixed(1)}" height="${aw.toFixed(1)}" fill="none" stroke="${K.ink2}" stroke-width="0.8" stroke-dasharray="2 3"/><line x1="${ax0+L+14}" y1="${ay}" x2="${ax0+L+14}" y2="${(ay+aw).toFixed(1)}" stroke="${K.ink}" stroke-width="1"/><path d="M${ax0+L+10} ${ay}h8M${ax0+L+10} ${(ay+aw).toFixed(1)}h8" stroke="${K.ink}"/><text x="${ax0+L+24}" y="${(ay+aw/2+4).toFixed(1)}" font-size="12" font-weight="500" fill="${K.ink}">${n1(LN.aisle)} m aisle</text>`;
    key+=tb(ax0,ay+aw+22,[{t:`Clear height ${n1(LN.ht)} m`,fs:13,w:500,c:K.ink},...(city==='van'?['Parking By-law s. 5.4.1 (aisle); row 5.2.5']:['Bylaw 20001 s. 5.80 subs. 7 (bay);','aisle: Vancouver’s 6.1 m, assumed']).map(t=>({t}))]); }
  else key+=`<text x="28" y="40" font-size="13" fill="${K.ink}">Loading bay <tspan fill="${RED}">?</tspan> not in the tool for this lot</text>`;
  /* the step chart: floor area to bays, from the by-law's steps, this lot's floor area marked */
  let chart=''; const CX=28, CY=292, CW=222, CH=110;
  if(gfa&&bays(gfa)!=null){ const xmax=Math.max(niceStep(gfa*1.2,1)*Math.ceil(gfa*1.2/niceStep(gfa*1.2,1)),gfa*1.1), N=360, pts=[]; let last=null, ymax=1;
    for(let i=0;i<=N;i++){ const g=xmax*i/N, n=bays(g); ymax=Math.max(ymax,n); pts.push([g,n]); } const px=g=>CX+CW*g/xmax, py=n=>CY+CH-CH*n/(ymax+0.5);
    chart+=`<text x="${CX}" y="${CY-24}" font-size="12.5" font-weight="500" fill="${K.ink}">Bays by floor area</text><text x="${CX}" y="${CY-10}" font-size="11" fill="${K.mute}">the by-law’s steps</text>`;
    for(let n=0;n<=ymax;n++) chart+=`<line x1="${CX}" y1="${py(n).toFixed(1)}" x2="${CX+CW}" y2="${py(n).toFixed(1)}" stroke="${K.hair}"/><text x="${CX-6}" y="${(py(n)+4).toFixed(1)}" font-size="10" fill="${K.mute}" text-anchor="end">${n}</text>`;
    let d=''; pts.forEach((p,i)=>{ const X=px(p[0]).toFixed(1), Y=py(p[1]).toFixed(1); d+=(i?(p[1]!==pts[i-1][1]?`L${X} ${py(pts[i-1][1]).toFixed(1)}L${X} ${Y}`:`L${X} ${Y}`):`M${X} ${Y}`); });
    chart+=`<path d="${d}" fill="none" stroke="${K.dc}" stroke-width="1.8"/>`;
    const st=niceStep(xmax,3); chart+=`<line x1="${CX}" y1="${CY+CH}" x2="${CX+CW}" y2="${CY+CH}" stroke="${K.rule}"/>`; for(let v=0;v<=xmax+0.01;v+=st) chart+=`<text x="${px(v).toFixed(1)}" y="${CY+CH+14}" font-size="10" fill="${K.mute}" text-anchor="middle">${n0(v)}</text>`;
    const nb=bays(gfa); chart+=`<line x1="${px(gfa).toFixed(1)}" y1="${(py(nb)).toFixed(1)}" x2="${px(gfa).toFixed(1)}" y2="${CY+CH}" stroke="${K.ink}" stroke-width="1" stroke-dasharray="3 3"/><circle cx="${px(gfa).toFixed(1)}" cy="${py(nb).toFixed(1)}" r="3.4" fill="${K.ink}"/>`;
    chart+=tb(CX,CY+CH+34,[{t:`This lot: ${n0(gfa)} m² → ${nb} ${nb===1?'bay':'bays'}`,fs:12,w:500,c:K.ink},...wrap(`The count assumes the most floor space the zone allows${fsr?` (${n1(fsr[1])} × lot)`:''}, not a design. m² of floor area.`,40).map(t=>({t}))]); }
  const W2=790+kw, svg=`<svg style="max-width:100%;height:auto" viewBox="0 0 ${W2} ${H2}" width="${W2}" height="${H2}" role="img" aria-label="${esc(x.addr)}: the yards, where loading may go, one loading space at its required size, and the by-law's steps from floor area to bays">${planBody(pl,'f1c-mb9',{under})}${pl.edges.map(marker).join('')}${leaderSvg(placed,lab)}${C.scaleBar(PW.X0+10,PW.Y0+PW.S-24,niceM(pl.f.s),pl.f.s)}<g transform="translate(790,${PW.Y0})">${key}${chart}</g></svg>`;
  const keyH=`<div class="f1c-key">${edgeKey(pl)}${rear?keyI('rgba(176,128,42,0.32)',K.pub,'where loading may go (rear or sides)'):'<span>no area shaded: the by-law does not say where on the lot loading goes</span>'}</div>`;
  const loadRule=city==='van'?'Each bay is reached by a 6.1 m aisle (Parking By-law s. 5.4.1). Where on the lot is not limited in the zone row.':'Wholly on site; backing and turning must not interfere with traffic on abutting streets or alleys (Bylaw 20001 s. 5.80 subs. 7.1).';
  const place=rear?eq.t:loadRule, thr=city==='van'?(LD.van?`${LD.van.bayFirst.v} m² for the first bay, then one more per ${LD.van.bayEach.v} m²`:null):(LD.edm?`none under ${LD.edm.spaces.v[0]} m², one to ${LD.edm.spaces.v[1]} m², two above`:null);
  const miss=[]; if(!LN) miss.push('loading count and size'); if(city==='edm') miss.push('aisle width (Vancouver’s 6.1 m is used as an assumption)'); if(Z.assumed) miss.push('placement rule for this zone (no data-centre row)');
  return {draw:`<div class="f1c-mb-wrap">${svg}${keyH}</div>`,lead:`How many loading spaces, how big, and any limit on where they go. The by-law counts them from the building’s floor area. ${zoneName(x)}, ${gcite(Z,x)}.`,
    hero:[{v:LN?String(LN.n):C.q(),l:LN?LN.cls+(LN.n===1?'':'s')+' needed':'loading spaces needed'},{v:LN?`${n1(LN.len)} × ${n1(LN.wid)}`:C.q(),u:LN?' m':'',l:'each'},{v:LN?n1(LN.ht):C.q(),u:LN?' m':'',l:'clear height'}],
    rows:[['Count',LN?`${LN.n}${gfa?` at ${n0(gfa)} m²`:''}`:C.q()],['Floor area the count assumes',gfa?`${n0(gfa)} m², the most the zone allows`:C.q()],['Size',LN?`${n1(LN.len)} × ${n1(LN.wid)} m, ${n1(LN.ht)} m clear`:C.q()],['Aisle',LN?`${n1(LN.aisle)} m${city==='edm'?' (assumed)':''}`:C.q()],['Where on the lot',rear?'rear or sides, screened':'no placement rule here'],['Count rule',thr||C.q()]],
    more:[['How the count is worked out',`<p>${LN?esc(LN.basis):'Not in the tool.'}</p><p>The count is for the most floor space the zone allows, not a design: a smaller building needs fewer bays (see the step chart).</p>`],['Placement rule',`<p>${esc(place)}</p>${eq&&rear?`<p>${esc(eq.s)}</p>`:''}`]],
    src:[srcZone(x),city==='van'?'Count and size: tool/data/zones.json loading.van (Parking By-law s. 5.2 row 5.2.5, s. 5.4.1; register vanParking5), through the tool’s loadingNeed (site.js); the step chart applies the same steps to each floor area (our arithmetic).':'Count and size: tool/data/zones.json loading.edm (Bylaw 20001 s. 5.80 Table 7.2; register edmZB580), through the tool’s loadingNeed (site.js); the step chart applies the same steps; aisle is Vancouver’s 6.1 m, an assumption.','Floor area behind the count: the figure in the tool’s loadingNeed basis (floor space ratio × lot area), our arithmetic.','Yard lines: the lot-line reading (M.edgeYards, M.yardLine).','Shaded area: the by-law’s "loading at the rear or sides" read as the lot’s non-front lines, our reading.',C.CONTEXT_SRC(city)],missing:miss}; }});
})();
