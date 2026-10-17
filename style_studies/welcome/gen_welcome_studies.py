import json
data=open('/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/wdata.json').read()
html=r'''<title>Welcome Studies</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap">
<style>
:root{--bg:#0b0c0d;--panel:#1e2023;--line:#2c2f33;--line2:#3c4148;--fg:#e9e6e1;--muted:#9d9a94;--faint:#8a8781;--acc:#CC746C;--acc2:#e39a93;color-scheme:dark}
body{background:var(--bg);color:var(--fg);font:300 14px/1.5 "Open Sans",system-ui,sans-serif;margin:0}
.wrap{max-width:1240px;margin:0 auto;padding-block:28px 60px;padding-inline:16px}
header h1{font-weight:300;font-size:24px;margin:0 0 4px}header p{color:var(--muted);margin:0;max-width:64ch}
.bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:18px 0 6px;font-size:13px;color:var(--muted)}
.bar button{background:transparent;border:1px solid var(--line2);color:var(--fg);border-radius:6px;padding:5px 11px;font:inherit;cursor:pointer}
.bar button[aria-pressed=true]{border-color:var(--acc);color:var(--acc2)}
.study{margin:34px 0 0}.study h2{font-weight:400;font-size:17px;margin:0}.study .from{color:var(--muted);font-size:12.5px;margin:2px 0 10px}
.stage{position:relative;width:100%;aspect-ratio:16/10;background:#0b0c0d;border:1px solid var(--line);border-radius:8px;overflow:hidden}
.stage.light{background:#efeee6}
.stage canvas{position:absolute;inset:0;width:100%;height:100%}
.card{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(var(--s,1));transform-origin:center;width:520px;background:var(--panel);border:1px solid var(--line2);border-radius:10px;padding:22px 24px 18px;box-shadow:0 18px 50px rgba(0,0,0,.45)}
.card .k0{font-size:11px;letter-spacing:.12em;color:var(--muted);font-weight:600}.card h3{font-weight:300;font-size:21px;margin:6px 0 10px;line-height:1.3}
.card p{margin:0 0 14px}.card .k{color:var(--acc2)}.card .b{display:flex;gap:8px}.card .b span{border-radius:6px;padding:8px 14px;font-size:13px;border:1px solid var(--line2)}.card .b span:first-child{background:var(--acc);color:#1a1212;border:0;font-weight:600}
.nocard .card{display:none}
.note{color:var(--muted);font-size:12.5px;margin:8px 0 0;max-width:72ch}
</style>
<div class="wrap">
<header><h1>Welcome studies</h1><p>Backgrounds for the welcome card. F is a made-up city. A to E are drawn from real data: the receivers and district-energy areas within reach of the Vancouver worked example (1425 Clark Dr), and the City's street centrelines.</p></header>
<div class="bar"><span>Card</span><button id="tc" aria-pressed="true">Shown</button><span style="margin-left:12px">Draw</span><button id="rd">Again</button><button id="nc">New city</button></div>
<div id="studies"></div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
<script>
const D=__DATA__;
const COL={housing:'#c8c2b8',school:'#a7b4d6',care:'#b9a3cf',hospital:'#b9a3cf',rec:'#7fb2c4',pool:'#7fb2c4',arena:'#9fb38a'};
const ACC='#CC746C', AMB='#d1a35e', BLU='#7fb2c4', SAGE='#86ada7';
const card=`<div class="card"><div class="k0">BEYOND DATA</div><h3>What could a data centre exchange with the city around it?</h3><p>Pick one lot. The tool walks you through <span class="k">heat, electricity, water, materials and people</span>, then three options and a report.</p><div class="b"><span>See a worked example</span><span>Start with my own site</span></div></div>`;
const S=[
 {id:'persp',t:'G · From the plane window',from:'The same made-up city in perspective, bent like a wide lens: lines bow, the horizon curves.',note:'Equidistant fisheye about 120° across the corners. Far blocks fade into the dark; the window edge is a soft vignette. New city redraws both F and G.',draw:persp},
 {id:'axo',t:'F · Axonometric city',from:'A made-up city drawn like the tool\'s 3D: thin edges on dark blocks.',note:'Two data centres (red) send heat, power and water to buildings around them; some lines run back. Dashed lines run along the streets as pipes would. A random city: press New city for another.',draw:axo},
 {id:'arcs',t:'A · Arcs to real receivers',from:'Your current card, made true: every arc ends at a real receiver.',note:'Colour by kind of building, as on the map. Arcs within 1.5 km are drawn full; beyond, dim. Amber dashes are the traced district-energy areas.',draw:arcs},
 {id:'streams',t:'B · Streams',from:'After the NASA flow poster.',note:'One lot splits into the five exchanges. Heat breaks into one thread per receiver, ordered by distance down the right edge. Band widths are equal: not to scale.',draw:streams},
 {id:'net',t:'C · Network',from:'After the node-and-link drawing.',note:'Every receiver is a small block at its real position, joined to its two nearest neighbours. Red: links from the lot to receivers within 1.5 km.',draw:network},
 {id:'field',t:'D · Heat field',from:'After the contour print: two inks over a field.',note:'Red contours are a field that peaks at the lot and swells around nearby receivers (decorative, not a heat model). Blue ticks are receivers; amber squares are schools.',draw:field,light:false},
 {id:'streets',t:'E · Through the streets',from:'The city grid, with heat routed along it.',note:'Street centrelines in grey. Red dashes run from the lot to receivers within 1.5 km along the grid (an L-shaped route, not a surveyed one).',draw:streets},
];
const root=document.getElementById('studies');
S.forEach(s=>{ const el=document.createElement('section'); el.className='study'; el.innerHTML=`<h2>${s.t}</h2><div class="from">${s.from}</div><div class="stage" id="st-${s.id}"><canvas></canvas>${card}</div><p class="note">${s.note}</p>`; root.appendChild(el); });
let seed=7; const rnd=()=>{ seed=(seed*16807)%2147483647; return (seed-1)/2147483646; };
function setup(s){ const st=document.getElementById('st-'+s.id), cv=st.querySelector('canvas'); const r=st.getBoundingClientRect(), dpr=Math.min(2,window.devicePixelRatio||1);
  cv.width=r.width*dpr; cv.height=r.height*dpr; const c=cv.getContext('2d'); c.setTransform(dpr,0,0,dpr,0,0); const W=r.width,H=r.height;
  st.style.setProperty('--s',Math.min(1,W/1100));
  const sc=W/13800, ox=W*0.74, oy=H*0.3; const P=(x,y)=>[ox+x*sc,oy+y*sc];
  return {c,W,H,sc,P,ox,oy}; }
const dist=p=>Math.hypot(p[0],p[1]);
function lot(c,x,y){ c.strokeStyle=ACC; c.lineWidth=1.6; c.strokeRect(x-6,y-6,12,12); }
function nets(g,dash){ const {c,P}=g; c.setLineDash(dash||[5,4]); c.strokeStyle=AMB; c.globalAlpha=.55; c.lineWidth=1; for(const n of D.nets){ c.beginPath(); n.r.forEach((p,i)=>{ const [x,y]=P(p[0],p[1]); i?c.lineTo(x,y):c.moveTo(x,y); }); c.closePath(); c.stroke(); } c.setLineDash([]); c.globalAlpha=1; }
function arcs(s){ const g=setup(s), {c,P,ox,oy}=g; seed=11;
  for(const p of D.pts){ const [x,y]=P(p[0],p[1]); c.fillStyle='#34373b'; c.fillRect(x-1,y-1,2,2); }
  nets(g);
  const L=D.pts.filter(p=>dist(p)<3800).sort((a,b)=>dist(b)-dist(a));
  for(const p of L){ const [x,y]=P(p[0],p[1]); const d=Math.hypot(x-ox,y-oy), near=dist(p)<=1500; const lift=d*(0.18+0.25*rnd());
    c.beginPath(); c.moveTo(ox,oy); c.quadraticCurveTo((ox+x)/2,Math.min(oy,y)-lift,x,y); c.strokeStyle=COL[p[2]]||'#888'; c.globalAlpha=near?(p[2]==='housing'?.45:.8):.12; c.lineWidth=near?1:.6; c.stroke();
    if(near){ c.globalAlpha=.9; c.fillStyle=COL[p[2]]; c.beginPath(); c.arc(x,y,1.8,0,7); c.fill(); } }
  c.globalAlpha=1; lot(c,ox,oy); }
function streams(s){ const g=setup(s), {c,W,H}=g; const x0=W*0.06, y0=H*0.5;
  const ex=[['Heat',ACC],['Electricity',AMB],['Water',BLU],['Materials','#8a8781'],['People',SAGE]]; const bw=12, gap=22, top=y0-(ex.length*(bw+gap))/2;
  const near=D.pts.filter(p=>dist(p)<=1500).sort((a,b)=>dist(a)-dist(b)); const xr=W*0.94;
  const ends={Electricity:['the grid'],Water:['sewer','rain on the roof'],Materials:['recyclers','reuse'],People:['neighbours','street','workers']};
  c.font='300 10px "Open Sans",sans-serif'; c.textBaseline='middle';
  ex.forEach(([name,col],i)=>{ const yb=top+i*(bw+gap)+bw/2; const xm=W*0.36;
    c.strokeStyle=col; c.globalAlpha=.85; c.lineWidth=bw; c.beginPath(); c.moveTo(x0,y0-((ex.length-1)/2-i)*3); c.bezierCurveTo(x0+W*0.1,y0-((ex.length-1)/2-i)*3,xm-W*0.1,yb,xm,yb); c.stroke();
    c.globalAlpha=1; c.fillStyle='#e9e6e1'; c.textAlign='right'; c.fillText(name,xm-8,yb-bw+2); c.textAlign='left';
    if(name==='Heat'){ const n=near.length; near.forEach((p,j)=>{ const yt=H*0.06+j*(H*0.88/Math.max(1,n-1)); c.strokeStyle=COL[p[2]]; c.globalAlpha=p[2]==='housing'?.22:.55; c.lineWidth=.7; c.beginPath(); c.moveTo(xm,yb+(j/n-.5)*bw); c.bezierCurveTo(xm+W*0.25,yb,xr-W*0.25,yt,xr,yt); c.stroke(); c.globalAlpha=.9; c.fillStyle=COL[p[2]]; c.fillRect(xr,yt-0.6,8,1.2); }); }
    else { const E=ends[name]; E.forEach((lab,j)=>{ const yt=yb+(j-(E.length-1)/2)*26+ (i-2)*H*0.12; const w=bw/E.length; c.strokeStyle=col; c.globalAlpha=.55; c.lineWidth=Math.max(1.5,w); c.beginPath(); c.moveTo(xm,yb+(j-(E.length-1)/2)*w); c.bezierCurveTo(xm+W*0.15,yb,W*0.66-W*0.12,yt,W*0.66,yt); c.stroke(); c.globalAlpha=1; c.fillStyle='#9d9a94'; c.fillText(lab,W*0.66+6,yt); }); }
  });
  c.globalAlpha=1; c.fillStyle='#e9e6e1'; c.fillText('one lot',x0-2,y0+26); lot(c,x0,y0); }
function network(s){ const g=setup(s), {c,P,ox,oy}=g; c.fillStyle='#202224'; c.fillRect(0,0,g.W,g.H);
  const Q=D.pts.map(p=>({p,xy:P(p[0],p[1])}));
  c.strokeStyle='#6b6964'; c.globalAlpha=.55; c.lineWidth=.6;
  for(const a of Q){ const nb=Q.filter(b=>b!==a).map(b=>[b,Math.hypot(b.xy[0]-a.xy[0],b.xy[1]-a.xy[1])]).sort((u,v)=>u[1]-v[1]).slice(0,2);
    for(const [b] of nb){ const mx=(a.xy[0]+b.xy[0])/2+(a.xy[1]-b.xy[1])*.18, my=(a.xy[1]+b.xy[1])/2-(a.xy[0]-b.xy[0])*.18; c.beginPath(); c.moveTo(a.xy[0],a.xy[1]); c.quadraticCurveTo(mx,my,b.xy[0],b.xy[1]); c.stroke(); } }
  c.globalAlpha=.85; c.strokeStyle=ACC; c.lineWidth=.9;
  for(const a of Q.filter(a=>dist(a.p)<=1500)){ c.beginPath(); c.moveTo(ox,oy); c.quadraticCurveTo((ox+a.xy[0])/2+(oy-a.xy[1])*.2,(oy+a.xy[1])/2-(a.xy[0]-ox)*.2,a.xy[0],a.xy[1]); c.stroke(); }
  c.globalAlpha=1; for(const a of Q){ const big=a.p[2]==='hospital'||a.p[2]==='rec'||a.p[2]==='arena', sch=a.p[2]==='school'; const w=big?9:sch?7:5, h=big?6:sch?4:2.5; c.fillStyle='#dcdad5'; c.fillRect(a.xy[0]-w/2,a.xy[1]-h/2,w,h); }
  c.fillStyle=ACC; c.fillRect(ox-8,oy-6,16,12); }
function field(s){ const g=setup(s), {c,P,W,H,sc,ox,oy}=g; const n=Math.round(W/5), m=Math.round(H/5), cell=W/n; const V=new Float64Array(n*m);
  const src=[[0,0,4,1300]].concat(D.pts.map(p=>[p[0],p[1],0.55,340]));
  for(let j=0;j<m;j++) for(let i=0;i<n;i++){ const wx=(i*cell-ox)/sc, wy=(j*cell-oy)/sc; let v=0; for(const [x,y,a,s2] of src){ const d2=(wx-x)**2+(wy-y)**2; if(d2<16*s2*s2) v+=a*Math.exp(-d2/(2*s2*s2)); } V[j*n+i]=Math.log1p(v*3); }
  const mx=d3.max(V); const th=d3.range(1,24).map(i=>mx*i/24); const cs=d3.contours().size([n,m]).thresholds(th)(Array.from(V));
  const path=d3.geoPath(d3.geoIdentity().scale(cell)).context(c);
  c.strokeStyle=ACC; c.lineWidth=1.1; c.globalAlpha=.75; for(const k of cs){ c.beginPath(); path(k); c.stroke(); }
  c.globalAlpha=1; c.font='600 9px "Open Sans",sans-serif'; c.textAlign='center'; c.textBaseline='middle';
  for(const p of D.pts){ const [x,y]=P(p[0],p[1]); if(p[2]==='school'){ c.strokeStyle=AMB; c.lineWidth=1.2; c.strokeRect(x-4,y-4,8,8); } else { c.fillStyle=BLU; c.fillRect(x-.6,y-4,1.4,8); } }
  lot(c,ox,oy); }
function streets(s){ const g=setup(s), {c,P,ox,oy}=g; c.lineCap='round';
  for(const sg of D.segs){ const cl=sg[0]; c.strokeStyle=cl===2||cl===3?'#4a4d52':'#2e3134'; c.lineWidth=cl===2||cl===3?1:.6; c.beginPath(); for(let i=1;i<sg.length;i+=2){ const [x,y]=P(sg[i],sg[i+1]); i>1?c.lineTo(x,y):c.moveTo(x,y); } c.stroke(); }
  nets(g,[2,3]);
  c.setLineDash([4,4]); c.lineWidth=1.1;
  for(const p of D.pts.filter(p=>dist(p)<=1500)){ const [x,y]=P(p[0],p[1]); c.strokeStyle=ACC; c.globalAlpha=.8; c.beginPath(); c.moveTo(ox,oy); c.lineTo(x,oy); c.lineTo(x,y); c.stroke(); }
  c.setLineDash([]); c.globalAlpha=1; for(const p of D.pts){ const [x,y]=P(p[0],p[1]); const near=dist(p)<=1500; c.fillStyle=COL[p[2]]; c.globalAlpha=near?1:.35; c.beginPath(); c.arc(x,y,near?2.2:1.4,0,7); c.fill(); }
  c.globalAlpha=1; lot(c,ox,oy); }
let citySeed=3;
function cityModel(N,keep){ const B=10, ST=3, P=B+ST, boxes=[]; seed=citySeed*7919+1; const I0=keep?-60:0, I1=keep?N+60:N, J1=keep?N*4:N;
  for(let bi=I0;bi<I1;bi++) for(let bj=keep?-4:0;bj<J1;bj++){ const ox=bi*P, oy=bj*P; if(keep&&!keep(ox+B/2,oy+B/2)) continue; const cx=(bi-N*0.5)/N, cy=(bj-N*0.42)/N; const centre=Math.exp(-(cx*cx+cy*cy)*9)+0.25*Math.exp(-(((bi-N*0.5)/N+0.9)**2+((bj-N*1.4)/N)**2)*6)+0.3*Math.exp(-(((bi-N*0.5)/N-1.1)**2+((bj-N*2)/N)**2)*5);
    if(rnd()<0.07){ boxes.push({x:ox,y:oy,w:B,d:B,h:0.2,park:1}); continue; }
    const split=rnd(); const H2=B/2-0.5; const parts=split<0.3?[[0,0,B,B]]:split<0.65?[[0,0,H2,B],[B/2+0.5,0,H2,B]]:[[0,0,H2,H2],[B/2+0.5,0,H2,H2],[0,B/2+0.5,H2,H2],[B/2+0.5,B/2+0.5,H2,H2]];
    for(const [a,b,w,d] of parts){ const h=1.5+rnd()*4+centre*rnd()*30*(rnd()<0.35?1:0.35); boxes.push({x:ox+a,y:oy+b,w,d,h}); } }
  return {boxes,B,ST,P}; }
function persp(s){ const g=setup(s), {c,W,H}=g; const N=34; const C0=[N*13*0.5,-30];
  const M=cityModel(N,(x,y)=>{ const dx=x-C0[0], dy=y-C0[1]; if(dy<-20) return false; const d=Math.hypot(dx,dy); return d<2800&&Math.abs(dx)<dy*2.2+160; }), {boxes,B,ST,P}=M; seed=citySeed*31+5;
  const dcs=[]; for(const [bi,bj] of [[5,2],[29,3],[13,6],[23,8],[-3,9],[38,10],[17,13],[6,17],[30,18],[-12,22],[47,24],[19,26],[9,34],[33,36]]){ const ox=bi*P, oy=bj*P; for(let k=boxes.length-1;k>=0;k--){ const q=boxes[k]; if(q.x>=ox&&q.x<ox+B&&q.y>=oy&&q.y<oy+B) boxes.splice(k,1); } const dc={x:ox,y:oy,w:B,d:B,h:3.2,dc:1}; boxes.push(dc); dcs.push(dc); }
  const C=[N*P*0.5,-30,95], a=0.5; const fy=Math.cos(a), fz=-Math.sin(a), uy=Math.sin(a), uz=Math.cos(a);
  const R=Math.hypot(W,H)/2, fe=R/(1.05); // equidistant: r = fe * theta
  const cxs=W/2, cys=H*0.46;
  const pr=(x,y,z)=>{ const dx=x-C[0], dy=y-C[1], dz=z-C[2]; const zc=dy*fy+dz*fz; const xc=dx, yc=dy*uy+dz*uz; const rr=Math.hypot(xc,yc); const th=Math.atan2(rr,zc); if(th>1.45) return null; const k=rr?fe*th/rr:0; return [cxs+xc*k, cys-yc*k, Math.hypot(dx,dy,dz)]; };
  const seg=(p,q,n)=>{ const o=[]; for(let i=0;i<=n;i++){ const t=i/n; o.push(pr(p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t,p[2]+(q[2]-p[2])*t)); } return o; };
  const fade=dd=>dd>2800?0:Math.max(0.12,Math.min(1,1.2-dd/600));
  const path=pts=>{ c.beginPath(); let st=false; for(const p of pts){ if(!p){ st=false; continue; } if(!st){ c.moveTo(p[0],p[1]); st=true; } else c.lineTo(p[0],p[1]); } };
  // the ground out to the horizon, then streets
  { const X0g=-40000, X1g=40000, Y1g=40000; const ring=[...seg([X0g,-40,0],[X1g,-40,0],200),...seg([X1g,-40,0],[X1g,Y1g,0],200),...seg([X1g,Y1g,0],[X0g,Y1g,0],200),...seg([X0g,Y1g,0],[X0g,-40,0],200)].filter(Boolean); c.beginPath(); ring.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1])); c.closePath(); c.fillStyle='#0f1012'; c.fill(); }
  // haze along the horizon
  const hz=pr(N*P*0.5,N*P*3,0); if(hz){ const gr=c.createLinearGradient(0,hz[1]-H*0.25,0,hz[1]+H*0.08); gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(0.75,'rgba(40,44,50,.35)'); gr.addColorStop(1,'rgba(0,0,0,0)'); c.fillStyle=gr; c.fillRect(0,0,W,H); }
  c.lineWidth=.7; for(let i=-60;i<=N+60;i++){ const t=i*P-ST/2; const pts=seg([t,-40,0],[t,N*4*P,0],60); c.strokeStyle='rgba(60,64,70,.35)'; path(pts); c.stroke(); }
  for(let j=-3;j<=N*4;j++){ const t=j*P-ST/2; const pts=seg([-60*P,t,0],[(N+60)*P,t,0],60); c.strokeStyle='rgba(60,64,70,.35)'; path(pts); c.stroke(); }
  const quad=(pts4,fill,stroke,lw,al)=>{ const ring=[]; for(let i=0;i<4;i++){ const sg=seg(pts4[i],pts4[(i+1)%4],5); if(sg.some(v=>!v)) return; ring.push(...sg.slice(0,-1)); } c.globalAlpha=al; c.beginPath(); ring.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1])); c.closePath(); c.fillStyle=fill; c.fill(); c.strokeStyle=stroke; c.lineWidth=lw; c.stroke(); c.globalAlpha=1; };
  boxes.forEach(q=>q.dd=Math.hypot(q.x+q.w/2-C[0],q.y+q.d/2-C[1])); boxes.sort((p,q)=>q.dd-p.dd);
  for(const q of boxes){ const {x,y,w,d,h}=q; const al=fade(q.dd); if(al<=0.02) continue; const e=q.dc?ACC:q.park?'#24302a':'#43464c';
    if(q.park){ quad([[x,y,h],[x+w,y,h],[x+w,y+d,h],[x,y+d,h]],'#111513','#24302a',.6,al); continue; }
    if(q.dd>1300){ quad([[x,y,h],[x+w,y,h],[x+w,y+d,h],[x,y+d,h]],'#17181b',e,.5,al); continue; }
    // visible side faces: front (y), left/right (x) depending on camera
    if(C[1]<y) quad([[x,y,0],[x+w,y,0],[x+w,y,h],[x,y,h]],'#121316',e,.6,al);
    if(C[0]<x) quad([[x,y,0],[x,y+d,0],[x,y+d,h],[x,y,h]],'#0f1012',e,.6,al);
    if(C[0]>x+w) quad([[x+w,y,0],[x+w,y+d,0],[x+w,y+d,h],[x+w,y,h]],'#0f1012',e,.6,al);
    quad([[x,y,h],[x+w,y,h],[x+w,y+d,h],[x,y+d,h]],'#18191c',e,q.dc?1.3:.6,al); }
  // exchanges
  const KIND=[[ACC,6],[AMB,2],[BLU,2],[SAGE,2],['#a7b4d6',1]]; const kpick=()=>{ let t=rnd()*13; for(const [col,w] of KIND){ if((t-=w)<=0) return col; } return ACC; };
  const tall=boxes.filter(q=>!q.dc&&!q.park);
  for(const dc of dcs){ const S0=[dc.x+dc.w/2,dc.y+dc.d/2,dc.h+0.5];
    const cand=tall.map(q=>[q,Math.hypot(q.x+q.w/2-S0[0],q.y+q.d/2-S0[1])]).filter(v=>v[1]<P*6&&v[1]>P*0.8).sort(()=>rnd()-.5).slice(0,13);
    for(const [q,dd] of cand){ const T=[q.x+q.w/2,q.y+q.d/2,q.h]; const col=kpick(), back=rnd()<0.22, lift=6+dd*0.45; const [A,Bp]=back?[T,S0]:[S0,T];
      const pts=[]; for(let i=0;i<=28;i++){ const t=i/28; pts.push(pr(A[0]+(Bp[0]-A[0])*t,A[1]+(Bp[1]-A[1])*t,A[2]+(Bp[2]-A[2])*t+lift*4*t*(1-t))); }
      const al=fade(Math.hypot(T[0]-C[0],T[1]-C[1])); c.globalAlpha=al*(col===ACC?.9:.75); c.strokeStyle=col; c.lineWidth=col===ACC?1.3:1; if(back) c.setLineDash([1.5,3]); path(pts); c.stroke(); c.setLineDash([]);
      const e=pr(...T); if(e){ c.fillStyle=col; c.beginPath(); c.arc(e[0],e[1],1.9,0,7); c.fill(); } c.globalAlpha=1; } }
  // the window: soft vignette
  const vg=c.createRadialGradient(W/2,H/2,Math.min(W,H)*0.35,W/2,H/2,Math.hypot(W,H)*0.55); vg.addColorStop(0,'rgba(11,12,13,0)'); vg.addColorStop(1,'rgba(11,12,13,.92)'); c.fillStyle=vg; c.fillRect(0,0,W,H);
}
function axo(s){ const g=setup(s), {c,W,H}=g; seed=citySeed*7919+1;
  const u=Math.max(4.2,W/190), cs=Math.cos(Math.PI/6), sn=Math.sin(Math.PI/6);
  const N=18, B=10, ST=3, P=B+ST; const X0=W*0.5, Y0=H*0.55-N*P*sn*u;
  const pr=(x,y,z)=>[X0+(x-y)*cs*u, Y0+(x+y)*sn*u-z*u];
  const boxes=[];
  for(let bi=0;bi<N;bi++) for(let bj=0;bj<N;bj++){ const ox=bi*P, oy=bj*P; const cx=(bi-N/2)/N, cy=(bj-N/2)/N; const centre=Math.exp(-(cx*cx+cy*cy)*7);
    if(rnd()<0.07){ boxes.push({x:ox,y:oy,w:B,d:B,h:0.3,park:1}); continue; }
    const split=rnd(); const parts=split<0.3?[[0,0,B,B]]:split<0.65?[[0,0,B/2-0.5,B],[B/2+0.5,0,B/2-0.5,B]]:[[0,0,B/2-0.5,B/2-0.5],[B/2+0.5,0,B/2-0.5,B/2-0.5],[0,B/2+0.5,B/2-0.5,B/2-0.5],[B/2+0.5,B/2+0.5,B/2-0.5,B/2-0.5]];
    for(const [a,b,w,d] of parts){ const h=1.5+rnd()*4+centre*rnd()*16*(rnd()<0.35?1:0.35); boxes.push({x:ox+a,y:oy+b,w,d,h}); } }
  // data centres: two low, wide blocks
  const dcs=[]; for(const [bi,bj] of [[6,10],[12,7],[13,12]]){ const ox=bi*P, oy=bj*P; for(let k=boxes.length-1;k>=0;k--){ const q=boxes[k]; if(q.x>=ox&&q.x<ox+B&&q.y>=oy&&q.y<oy+B) boxes.splice(k,1); } const dc={x:ox,y:oy,w:B,d:B,h:3.2,dc:1}; boxes.push(dc); dcs.push(dc); }
  boxes.sort((p,q)=>(p.x+p.y+p.w+p.d)-(q.x+q.y+q.w+q.d));
  const poly=(pts,fill,stroke,lw)=>{ c.beginPath(); pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y)); c.closePath(); if(fill){ c.fillStyle=fill; c.fill(); } if(stroke){ c.strokeStyle=stroke; c.lineWidth=lw||.6; c.stroke(); } };
  // streets: faint centrelines
  c.strokeStyle='#1f2124'; c.lineWidth=1; for(let i=0;i<=N;i++){ const t=i*P-ST/2; let a=pr(t,-2,0), b=pr(t,N*P,0); c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); a=pr(-2,t,0); b=pr(N*P,t,0); c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); }
  for(const q of boxes){ const {x,y,w,d,h}=q; const e=q.dc?ACC:q.park?'#24302a':'#3b3e43';
    const top=[pr(x,y,h),pr(x+w,y,h),pr(x+w,y+d,h),pr(x,y+d,h)], R=[pr(x+w,y,0),pr(x+w,y+d,0),pr(x+w,y+d,h),pr(x+w,y,h)], L=[pr(x,y+d,0),pr(x+w,y+d,0),pr(x+w,y+d,h),pr(x,y+d,h)];
    if(q.park){ poly(top,'#121614','#24302a',.6); continue; }
    poly(R,'#0f1012',e,.6); poly(L,'#131416',e,.6); poly(top,'#17181b',e,q.dc?1.3:.6);
    if(q.dc){ for(let i=0;i<4;i++) for(let j=0;j<2;j++){ const ux=x+1.2+i*2.1, uy=y+2+j*4; const T=[pr(ux,uy,h+1),pr(ux+1.4,uy,h+1),pr(ux+1.4,uy+2.6,h+1),pr(ux,uy+2.6,h+1)]; poly([pr(ux+1.4,uy,h),pr(ux+1.4,uy+2.6,h),pr(ux+1.4,uy+2.6,h+1),pr(ux+1.4,uy,h+1)],'#0f1012',ACC,.5); poly(T,'#17181b',ACC,.5); } } }
  // exchanges: from each data centre roof to buildings around it, and a few back
  const KIND=[[ACC,6],[AMB,2],[BLU,2],[SAGE,2],['#a7b4d6',1]]; const kpick=()=>{ let t=rnd()*13; for(const [col,w] of KIND){ if((t-=w)<=0) return col; } return ACC; };
  const tall=boxes.filter(q=>!q.dc&&!q.park);
  for(const dc of dcs){ const sx=dc.x+dc.w/2, sy=dc.y+dc.d/2, sz=dc.h+1.2; const S0=pr(sx,sy,sz);
    const cand=tall.map(q=>[q,Math.hypot(q.x+q.w/2-sx,q.y+q.d/2-sy)]).filter(v=>v[1]<P*5.5&&v[1]>P*0.8).sort(()=>rnd()-.5).slice(0,22);
    for(const [q,dd] of cand){ const tx=q.x+q.w/2, ty=q.y+q.d/2, tz=q.h; const T=pr(tx,ty,tz); const col=kpick(); const back=rnd()<0.22;
      if(rnd()<0.25){ // along the street, like a pipe: an L on the ground then up
        c.setLineDash([3,3]); c.strokeStyle=col; c.globalAlpha=.8; c.lineWidth=1; const gx=Math.round((tx-ST)/P)*P-ST/2; c.beginPath(); c.moveTo(...pr(sx,sy,0)); c.lineTo(...pr(gx,sy,0)); c.lineTo(...pr(gx,ty,0)); c.lineTo(...pr(tx,ty,0)); c.stroke(); c.setLineDash([]); }
      else { const [a,b]=back?[T,S0]:[S0,T]; const lift=12+dd*0.9*u*(0.6+rnd()*0.6); c.beginPath(); c.moveTo(...a); c.quadraticCurveTo((a[0]+b[0])/2,Math.min(a[1],b[1])-lift,b[0],b[1]); c.strokeStyle=col; c.globalAlpha=col===ACC?.85:.7; c.lineWidth=col===ACC?1.2:1; if(back) c.setLineDash([1.5,3]); c.stroke(); c.setLineDash([]); }
      c.globalAlpha=1; c.fillStyle=col; c.beginPath(); c.arc(T[0],T[1],1.9,0,7); c.fill(); } }
}
function drawAll(){ S.forEach(s=>{ try{ s.draw(s); }catch(e){ console.error(s.id,e); } }); }
document.getElementById('tc').onclick=e=>{ const on=e.target.getAttribute('aria-pressed')!=='true'; e.target.setAttribute('aria-pressed',on); e.target.textContent=on?'Shown':'Hidden'; document.body.classList.toggle('nocard',!on); };
document.getElementById('rd').onclick=drawAll; document.getElementById('nc').onclick=()=>{ citySeed++; S[0].draw(S[0]); S[1].draw(S[1]); };
let rt; window.addEventListener('resize',()=>{ clearTimeout(rt); rt=setTimeout(drawAll,200); });
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(drawAll);
</script>'''
open('/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/wstudy/welcome-studies.html','w').write(html.replace('__DATA__',data))
