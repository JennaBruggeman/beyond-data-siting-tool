// Bug sweep, screen slice (3 Nov 2026): all four templates (resident, community, full = Engineering, arch = Architecture) at 1440x900 and 390x844.
// Each step of the guided flow is opened in turn (BD.flow.go) and the visible page is checked:
//   bad text (NaN/undefined/null/[object/Infinity), figures with no source chip/badge/'?' nearby, text cut off or spilling out of its box,
//   horizontal page scroll, overlapping labels (SVG text, 3D labels), buttons covered by other elements, low contrast, non-right-angled leaders,
//   page errors, console errors, empty steps. Screenshots of failures only (first two lots per template/viewport/step/check).
// Usage (from checks/tests/): NODE_PATH=<node_modules with playwright> node sweep_screen.js <outdir>
//   env TPL=resident,community,full,arch  VP=desk,phone  LOTS=V09,E05  SHOTDIR=<dir>
// Needs the tool served at http://localhost:8766. One browser, one page at a time.
const fs = require('fs'), path = require('path');
const NM = (process.env.NODE_PATH || '').split(require('path').delimiter)[0];
const { chromium } = require('playwright');

const G = (lab, sub, city, tile, id, ans) => ({ lab, sub, sel: { city, tile, id }, ans: ans || { built: 'new', extent: 'whole', floor: '' } });
const LOTS = {
  V09: G('275 1st Ave E', 'I-3 golden', 'van', '1_1', '63819363'),
  E05: G('8803 Stadium Rd NW', 'IM golden', 'edm', '0_0', '51053'),
  CLARK: G('1425 Clark Dr', 'I-2 golden', 'van', '2_1', '23060741'),
  E123: G('12603 123 Street NW', 'IH golden', 'edm', '-1_1', '883345'),
  V339: G('339 1st Ave E', 'I-3 golden thesis', 'van', '1_1', '63819485'),
  E06A: G('74 Airport Rd NW', 'BE golden thesis 1', 'edm', '-1_1', '176767'),
  E06B: G('64 Airport Rd NW', 'BE golden thesis 2', 'edm', '-1_1', '146402'),
  HAST: G('555 W Hastings', 'existing upper floor golden', 'van', '0_2', '59013407', { built: 'existing', extent: 'part', floor: 'upper' }),
  VFC2L: G('1220 Station St', 'FC-2 3,816 m²', 'van', '1_1', '63019307'),
  VFC2S: G('260 Northern St', 'FC-2 713 m²', 'van', '1_1', '63319127'),
  VI1C: G('360 2nd Ave W', 'I-1C 1,648 m²', 'van', '0_1', '64017198'),
  VI1: G('5 4th Ave W', 'I-1 4,207 m²', 'van', '0_1', '64218207'),
  VI2S: G('1239 Odlum Dr', 'I-2 1,291 m²', 'van', '2_1', '60723093'),
  VI2L: G('250 70th Ave W', 'I-2 112,529 m²', 'van', '0_-4', '17283096'),
  VI3S: G('370 Prior St', 'I-3 381 m² tiny', 'van', '1_1', '60019276'),
  VI3L: G('320 Industrial Ave', 'I-3 51,077 m²', 'van', '1_1', '63519324'),
  VM1: G('1250 45th Ave E', 'M-1 6,896 m²', 'van', '1_-2', '75822402'),
  VM2: G('1376 Powell St', 'M-2 624 m²', 'van', '2_2', '58023086'),
  VIC3: G('2050 Scotia St', 'IC-3 4,974 m²', 'van', '1_1', '19464204'),
  EBEM: G('7545 52 Street NW', 'BE 5,479 m²', 'edm', '2_-2', '1046283'),
  EBEL: G('250 Karl Clark Rd NW', 'BE 633,168 m²', 'edm', '0_-5', '129583'),
  EIMM: G('3911 78 Avenue NW', 'IM 4,936 m²', 'edm', '2_-2', '129826'),
  EIHM: G('12410 67 Street NW', 'IH 4,152 m²', 'edm', '1_1', '59725'),
  EIHL: G('12225 17 Street NW', 'IH 459,878 m²', 'edm', '3_1', '488511'),
  EMU: G('13022 82 Street NW', 'MU 641 m²', 'edm', '0_2', '72713'),
  EDC2: G('708 Wilkin Close NW', 'DC2 1,020 m²', 'edm', '-3_-2', '626510'),
  EAJ: G('11400 University Ave NW', 'AJ 5,921 m²', 'edm', '-1_-1', '88509'),
};
const GOLD = ['V09', 'E05', 'CLARK', 'E123', 'V339', 'E06A', 'E06B', 'HAST'];
const PHONE_LOTS = GOLD.concat(['VI3S', 'EBEL', 'VM2', 'EIHL']);
const VPS = { desk: { viewport: { width: 1440, height: 900 } }, phone: { viewport: { width: 390, height: 844 }, hasTouch: true }, phone980: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } };

// the in-page checker
const CHECK = String.raw`(()=>{ window.__sc={
 sel(e){ if(!e||!e.tagName) return ''; const p=[]; for(let x=e;x&&x.tagName&&p.length<4;x=x.parentElement){ let s=x.tagName.toLowerCase(); if(x.id){ s+='#'+x.id; p.unshift(s); break; } const c=(typeof x.className==='string'?x.className:(x.className&&x.className.baseVal)||'').trim().split(/\s+/).filter(Boolean).slice(0,2).join('.'); if(c) s+='.'+c; p.unshift(s); } return p.join('>'); },
 vis(e){ if(!e||!e.getClientRects||!e.getClientRects().length) return false; const cs=getComputedStyle(e); if(cs.visibility==='hidden'||+cs.opacity===0) return false; for(let x=e;x;x=x.parentElement){ if(x.hidden) return false; const c=getComputedStyle(x); if(c.display==='none'||+c.opacity===0) return false; const pa=x.parentElement; if(pa&&pa.tagName==='DETAILS'&&!pa.open&&x.tagName!=='SUMMARY') return false; } return true; },
 clipRect(e){ let r={l:0,t:0,r:innerWidth,b:innerHeight}; for(let x=e.parentElement;x&&x!==document.documentElement;x=x.parentElement){ const c=getComputedStyle(x); if(c.overflowX!=='visible'||c.overflowY!=='visible'){ const q=x.getBoundingClientRect(); r={l:Math.max(r.l,q.left),t:Math.max(r.t,q.top),r:Math.min(r.r,q.right),b:Math.min(r.b,q.bottom)}; } } return r; },
 rgb(s){ const m=String(s).match(/rgba?\(([^)]+)\)/); if(!m) return null; const a=m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return [a[0],a[1],a[2],a.length>3?a[3]:1]; },
 lum(c){ const f=v=>{ v/=255; return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4); }; return 0.2126*f(c[0])+0.7152*f(c[1])+0.0722*f(c[2]); },
 bgOf(e){ let stack=[]; for(let x=e;x;x=x.parentElement){ const c=this.rgb(getComputedStyle(x).backgroundColor); if(c&&c[3]>0){ stack.push(c); if(c[3]>=0.99) break; } if(x.tagName==='CANVAS') break; }
   let base=[23,24,26,1]; if(stack.length&&stack[stack.length-1][3]>=0.99) base=stack.pop(); else { const b=this.rgb(getComputedStyle(document.body).backgroundColor); if(b&&b[3]>0) base=b; }
   while(stack.length){ const c=stack.pop(); base=[c[0]*c[3]+base[0]*(1-c[3]),c[1]*c[3]+base[1]*(1-c[3]),c[2]*c[3]+base[2]*(1-c[3]),1]; } return base; },
 run(scope){ const vw=innerWidth, vh=innerHeight, R={};
  const de=document.documentElement; R.hscroll={doc:de.scrollWidth-vw, body:document.body.scrollWidth-vw, side:(()=>{ const s=document.getElementById('side'); return s?s.scrollWidth-s.clientWidth:0; })()};
  R.hscroll.wide=[]; if(R.hscroll.doc>1||R.hscroll.body>1){ for(const e of document.body.querySelectorAll('*')){ if(!this.vis(e)) continue; const q=e.getBoundingClientRect(); if(q.right>vw+1&&q.width>0) R.hscroll.wide.push(this.sel(e)+' right='+Math.round(q.right)); if(R.hscroll.wide.length>6) break; } }
  // bad text
  const BAD=/.{0,50}(?:\bNaN\b|\bundefined\b|\bnull\b|\[object|\bInfinity\b).{0,50}/g; const bt=document.body.innerText||''; R.bad=(bt.match(BAD)||[]).slice(0,10);
  const svgT=[...document.querySelectorAll('svg text')].filter(t=>this.vis(t)).map(t=>t.textContent).join('\n'); R.badSvg=(svgT.match(BAD)||[]).slice(0,10);
  R.badAttr=[...document.querySelectorAll('[title],[aria-label]')].filter(e=>this.vis(e)).map(e=>(e.getAttribute('title')||'')+' '+(e.getAttribute('aria-label')||'')).filter(s=>/\bNaN\b|\bundefined\b|\[object|\bInfinity\b/.test(s)).slice(0,5);
  // walk visible text nodes
  const roots=[document.getElementById('side'),document.getElementById('drawer'),document.getElementById('wc'),document.getElementById('v3d'),document.getElementById('welcome'),document.querySelector('.rpages')].filter(Boolean);
  const seenRoot=new Set(); const tnodes=[]; for(const r of roots){ if(!this.vis(r)) continue; const w=document.createTreeWalker(r,NodeFilter.SHOW_TEXT); let n; while((n=w.nextNode())){ if(!n.nodeValue.trim()) continue; if(seenRoot.has(n)) continue; seenRoot.add(n); tnodes.push(n); } }
  const els=[...new Set(tnodes.map(n=>n.parentElement))].filter(e=>e&&this.vis(e)&&!e.closest('svg,script,style'));
  // figures with no source marker nearby
  const FIG=/(?:\$\s?\d[\d,.]*\s?(?:k|M|B|million|billion)?|\d[\d,.]*\s?(?:–\s?\d[\d,.]*\s?)?(?:MWh|GWh|kWh|TWh|MW|kW|GW|GJ|TJ|m²|m³|km|mm|cm|dBA|dB|°C|%|tCO2e?|kg|t\b|L\b|kL|ML|m\b|yr|years|homes|tonnes|storeys?|ha\b))/;
  const MARK='.src,.evb,.asrc,.nflag,.csrc,.fp,a[href],sup,.q,[title]';
  const hasMark=b=>!!(b&&(b.matches&&b.matches(MARK)||b.querySelector&&b.querySelector(MARK)||/(^|[\s(])\?($|[\s),.])|\(\?\)|Source|source|register|Sources/.test(b.textContent||'')));
  const blockOf=e=>{ for(let x=e;x&&x!==document.body;x=x.parentElement){ const d=getComputedStyle(x).display; if(/^(block|list-item|table-row|flex|grid)$/.test(d)&&!/^(SPAN|B|STRONG|EM|I|A|SMALL|LABEL)$/.test(x.tagName)) return x; } return e; };
  const secOf=e=>{ const c=e.closest('details.sec,.dk,.rpage,.famrow,.bestset,.xcard,.opt,section,.tt,figure,.legend,.legend2'); if(c) return c;
    // a loose block in the panel: the run of siblings from the previous heading to the next one
    let top=e; while(top.parentElement&&!/^(side|drawer|wcTx)$/.test(top.parentElement.id||'')&&top.parentElement!==document.body) top=top.parentElement; const f=document.createElement('div');
    let a=top; while(a.previousElementSibling&&!/^H[1-4]$/.test(a.tagName)) a=a.previousElementSibling; for(let x=a;x;x=x.nextElementSibling){ if(x!==a&&/^H[1-4]$/.test(x.tagName)) break; f.appendChild(x.cloneNode(true)); } return f; };
  R.unsrc=[]; R.unsrcSec=[]; const seenB=new Set();
  for(const e of els){ if(e.closest('button,select,option,input,label,.flowbar,.wsteps,nav,.tabs,.dnav,.flowfoot,#tierSel,.tierchip')) continue; const t=[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.nodeValue).join(' '); if(!FIG.test(t)) continue;
    if(/^\s*(Step|step)\s+\d+\s+of/.test(t)) continue; const b=blockOf(e); if(seenB.has(b)) continue; seenB.add(b);
    if(hasMark(b)||hasMark(b.nextElementSibling)) continue; const s=secOf(e); const h=(s&&s.querySelector&&(s.querySelector('summary,h3,h2,h4,dt,th,.kind')||{}).textContent)||'';
    const item=(h?'['+h.trim().slice(0,50)+'] ':'')+(b.innerText||b.textContent||'').replace(/\s+/g,' ').trim().slice(0,160)+' {'+this.sel(b)+'}';
    if(s&&hasMark(s)) R.unsrc.push(item); else R.unsrcSec.push(item); }
  R.unsrc=R.unsrc.slice(0,25); R.unsrcSec=R.unsrcSec.slice(0,25);
  // text cut off / spilling out
  R.clip=[]; R.spill=[]; R.offscreen=[];
  for(const e of els){ const cs=getComputedStyle(e); if(e.closest('#v3d')&&e.parentElement&&e.parentElement.style&&e.parentElement.style.pointerEvents==='none') continue; const q=e.getBoundingClientRect(); if(q.width===0) continue;
    const hidX=/hidden|clip/.test(cs.overflowX), hidY=/hidden|clip/.test(cs.overflowY);
    if((hidX&&e.scrollWidth>e.clientWidth+2)||cs.textOverflow==='ellipsis'&&e.scrollWidth>e.clientWidth+1||(hidY&&e.scrollHeight>e.clientHeight+3&&cs.webkitLineClamp==='none'&&!/auto|scroll/.test(cs.overflowY))) R.clip.push(this.sel(e)+' "'+(e.innerText||'').replace(/\s+/g,' ').slice(0,70)+'" '+e.scrollWidth+'/'+e.clientWidth+'w '+e.scrollHeight+'/'+e.clientHeight+'h');
    else if(cs.display!=='inline'&&e.clientWidth>0&&e.scrollWidth>e.clientWidth+3&&cs.overflowX==='visible') R.spill.push(this.sel(e)+' "'+(e.innerText||'').replace(/\s+/g,' ').slice(0,70)+'" '+e.scrollWidth+'/'+e.clientWidth);
    // clipped by an ancestor (horizontal only; vertical is the scroll of the side panel)
    const c=this.clipRect(e); if(q.right>c.r+2&&q.left<c.r&&q.top<c.b&&q.bottom>c.t) R.offscreen.push(this.sel(e)+' "'+(e.innerText||'').replace(/\s+/g,' ').slice(0,60)+'" right '+Math.round(q.right)+' > box '+Math.round(c.r));
    else if(q.left<c.l-2&&q.right>c.l&&q.top<c.b&&q.bottom>c.t) R.offscreen.push(this.sel(e)+' "'+(e.innerText||'').replace(/\s+/g,' ').slice(0,60)+'" left '+Math.round(q.left)+' < box '+Math.round(c.l)); }
  R.clip=R.clip.slice(0,15); R.spill=R.spill.slice(0,15); R.offscreen=R.offscreen.slice(0,15);
  // buttons covered by other elements
  R.covered=[]; R.btnOff=[];
  for(const b of document.querySelectorAll('button,[role=button],[role=radio],a.btn,select,input')){ if(!this.vis(b)||b.type==='hidden') continue; const q=b.getBoundingClientRect(); if(q.width<2||q.height<2) continue; const c=this.clipRect(b);
    if(q.right>vw+1||q.left<-1) { R.btnOff.push(this.sel(b)+' "'+(b.innerText||b.value||'').slice(0,40)+'" x '+Math.round(q.left)+'..'+Math.round(q.right)); continue; }
    if(!(q.left>=c.l-1&&q.right<=c.r+1&&q.top>=c.t-1&&q.bottom<=c.b+1)) continue;   // scrolled out of its panel: not a cover
    const pts=[[q.left+q.width/2,q.top+q.height/2],[q.left+4,q.top+q.height/2],[q.right-4,q.top+q.height/2]]; let bad=0, by='';
    for(const [x,y] of pts){ const h=document.elementFromPoint(x,y); if(!h) continue; if(h===b||b.contains(h)||h.contains(b)||(b.labels&&[...b.labels].some(l=>l.contains(h)))) continue; bad++; by=this.sel(h); }
    const fixedBy=(()=>{ const h=document.elementFromPoint(q.left+q.width/2,q.top+q.height/2); for(let x=h;x;x=x.parentElement){ const p=getComputedStyle(x).position; if((p==='sticky'||p==='fixed')&&!x.contains(b)) return this.sel(x); } return ''; })();
    const modal=(()=>{ const h=document.elementFromPoint(q.left+q.width/2,q.top+q.height/2); return !!(h&&h.closest('#welcome,#xp,.modal'))&&!b.closest('#welcome,#xp,.modal'); })();
    const mapUnderWc=!!(b.closest('#map')&&document.getElementById('wc')&&this.vis(document.getElementById('wc')));
    if(bad>=2&&!modal&&!mapUnderWc&&fixedBy){ R.underSticky=R.underSticky||[]; if(R.underSticky.length<6) R.underSticky.push(this.sel(b)+' "'+(b.innerText||'').replace(/\s+/g,' ').slice(0,30)+'" under sticky '+fixedBy); continue; }
    if(bad>=2&&!modal&&!mapUnderWc) R.covered.push(this.sel(b)+' "'+(b.innerText||b.getAttribute('aria-label')||b.value||'').replace(/\s+/g,' ').slice(0,40)+'" under '+by); }
  R.covered=R.covered.slice(0,12); R.btnOff=R.btnOff.slice(0,12);
  // small touch targets on the phone
  R.small=[]; if(vw<500){ for(const b of document.querySelectorAll('button,[role=button],a.btn,select')){ if(!this.vis(b)) continue; const q=b.getBoundingClientRect(); if(q.width>0&&(q.height<24||q.width<24)) R.small.push(this.sel(b)+' "'+(b.innerText||b.getAttribute('aria-label')||'').replace(/\s+/g,' ').slice(0,30)+'" '+Math.round(q.width)+'x'+Math.round(q.height)); } R.small=[...new Set(R.small)].slice(0,12); }
  // contrast
  const cm={}; for(const e of els){ const cs=getComputedStyle(e); const fg=this.rgb(cs.color); if(!fg) continue; const bg=this.bgOf(e); const f=[fg[0]*fg[3]+bg[0]*(1-fg[3]),fg[1]*fg[3]+bg[1]*(1-fg[3]),fg[2]*fg[3]+bg[2]*(1-fg[3])];
    let op=1; for(let x=e;x;x=x.parentElement) op*=+getComputedStyle(x).opacity; const fe=[f[0]*op+bg[0]*(1-op),f[1]*op+bg[1]*(1-op),f[2]*op+bg[2]*(1-op)];
    const L1=this.lum(fe), L2=this.lum(bg), ratio=(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05); const px=parseFloat(cs.fontSize), w=+cs.fontWeight||400; const large=px>=24||(px>=18.66&&w>=700); const need=large?3:4.5;
    if(ratio<need){ const dis=!!e.closest('button[disabled],[aria-disabled=true],input[disabled]'); const k=[fe.map(Math.round).join(','),bg.slice(0,3).map(Math.round).join(','),px,dis?'disabled':''].join('|'); cm[k]=cm[k]||{ratio:Math.round(ratio*100)/100,px,fg:'rgb('+fe.map(Math.round)+')',bg:'rgb('+bg.slice(0,3).map(Math.round)+')',disabled:dis,n:0,ex:[]}; cm[k].n++; if(cm[k].ex.length<3) cm[k].ex.push(this.sel(e)+' "'+(e.innerText||'').replace(/\s+/g,' ').slice(0,40)+'"'); } }
  R.contrast=Object.values(cm).sort((a,b)=>a.ratio-b.ratio).slice(0,15);
  // overlapping labels: SVG text in each visible svg, and the 3D view's HTML labels
  R.overlapSvg=[]; for(const s of document.querySelectorAll('svg')){ if(!this.vis(s)) continue; const sr=s.getBoundingClientRect(); if(sr.width<80) continue; const rot=t=>{ for(let x=t;x&&x!==s;x=x.parentNode){ if(/rotate|matrix/.test((x.getAttribute&&x.getAttribute('transform'))||'')) return true; } return false; }; const T=[...s.querySelectorAll('text')].filter(t=>this.vis(t)&&t.textContent.trim()&&!rot(t)).map(t=>({t,r:t.getBoundingClientRect()})).filter(o=>o.r.width>0);
    let c=0; for(let i=0;i<T.length;i++) for(let j=i+1;j<T.length;j++){ const a=T[i].r, b=T[j].r; const ix=Math.min(a.right,b.right)-Math.max(a.left,b.left), iy=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top); if(ix>1&&iy>1){ const ar=ix*iy, mn=Math.min(a.width*a.height,b.width*b.height); if(ar>0.2*mn&&ar>8){ if(T[i].t.parentNode===T[j].t.parentNode&&T[i].t.textContent===T[j].t.textContent) continue; c++; if(R.overlapSvg.length<12) R.overlapSvg.push((s.getAttribute('aria-label')||this.sel(s)).slice(0,50)+': "'+T[i].t.textContent.slice(0,40)+'" x "'+T[j].t.textContent.slice(0,40)+'" '+Math.round(ar/mn*100)+'%'); } } } }
  R.overlap3d=[]; R.label3dUnder=[]; const v3=document.getElementById('v3d'); if(v3&&this.vis(v3)){ const labs=[...v3.querySelectorAll('div')].filter(d=>d.style&&d.style.position==='absolute'&&d.style.whiteSpace==='nowrap'&&d.style.left&&this.vis(d)&&d.textContent.trim()).map(d=>({d,r:d.getBoundingClientRect()}));
    R.n3dLabels=labs.length; for(let i=0;i<labs.length;i++) for(let j=i+1;j<labs.length;j++){ const a=labs[i].r,b=labs[j].r; const ix=Math.min(a.right,b.right)-Math.max(a.left,b.left), iy=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top); if(ix>1&&iy>1&&R.overlap3d.length<12) R.overlap3d.push('"'+labs[i].d.textContent.slice(0,40)+'" x "'+labs[j].d.textContent.slice(0,40)+'"'); }
    for(const L of labs){ const r=L.r; const h=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2); if(h&&h.tagName!=='CANVAS'&&!L.d.contains(h)&&R.label3dUnder.length<8) R.label3dUnder.push('"'+L.d.textContent.slice(0,40)+'" under '+this.sel(h)); const c=this.clipRect(L.d); if((r.right>c.r+1||r.left<c.l-1)&&R.label3dUnder.length<8) R.label3dUnder.push('"'+L.d.textContent.slice(0,40)+'" cut at the view edge'); } }
  // leaders: thin unfilled polylines/lines in drawings, any segment neither horizontal nor vertical
  R.leaders=[]; for(const s of document.querySelectorAll('svg')){ if(!this.vis(s)) continue; const lab=(s.getAttribute('aria-label')||this.sel(s)).slice(0,60);
    for(const pl of s.querySelectorAll('polyline,line')){ const sw=parseFloat(pl.getAttribute('stroke-width')||getComputedStyle(pl).strokeWidth)||1; if(sw>0.9) continue; if(pl.getAttribute('stroke-dasharray')) continue; let P=[]; if(pl.tagName==='line') P=[[+pl.getAttribute('x1'),+pl.getAttribute('y1')],[+pl.getAttribute('x2'),+pl.getAttribute('y2')]]; else P=(pl.getAttribute('points')||'').trim().split(/\s+/).map(p=>p.split(',').map(Number));
      if(pl.tagName==='line') continue;   // single lines are rules, ticks and grids; leaders are drawn as polylines in this build
      let skew=0; for(let i=1;i<P.length;i++){ const dx=Math.abs(P[i][0]-P[i-1][0]), dy=Math.abs(P[i][1]-P[i-1][1]); if(dx>0.5&&dy>0.5) skew++; }
      const nearText=(()=>{ const r=pl.getBoundingClientRect(); return [...s.querySelectorAll('text')].some(t=>{ const q=t.getBoundingClientRect(); return Math.abs(q.left-r.right)<14||Math.abs(q.right-r.left)<14; }); })();
      if(skew&&R.leaders.length<10) R.leaders.push(lab+': '+P.length+' pts, '+skew+' slanted seg, stroke '+(pl.getAttribute('stroke')||'')+' sw '+sw+(nearText?' (ends at a label)':'')+' pts '+P.slice(0,4).map(p=>p.map(v=>Math.round(v)).join(',')).join(' ')); } }
  R.len=((document.getElementById('side')||{}).innerText||'').trim().length;
  return R; } };
})()`;

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const out = process.argv[2] || 'sweep_screen_out'; fs.mkdirSync(out, { recursive: true });
  const shots = process.env.SHOTDIR || out; fs.mkdirSync(shots, { recursive: true });
  const tpls = (process.env.TPL || 'resident,community,full,arch').split(',');
  const vps = (process.env.VP || 'desk,phone').split(',');
  const b = await chromium.launch({ ...(process.env.PW_EXE?{executablePath:process.env.PW_EXE}:{}), args: ['--use-gl=swiftshader', '--enable-webgl'] });
  for (const vp of vps) for (const tpl of tpls) {
    const keys = process.env.LOTS ? process.env.LOTS.split(',') : (vp === 'phone' ? PHONE_LOTS : Object.keys(LOTS));
    const shotSeen = {};
    for (const key of keys) {
      const ofile = path.join(out, `${vp}_${tpl}_${key}.json`); if (process.env.SKIPDONE && fs.existsSync(ofile)) continue;
      const L = LOTS[key]; const R = { key, tpl, vp, lab: L.lab, sub: L.sub, errors: [], console: [], steps: [] };
      const ctx = await b.newContext(VPS[vp]); const p = await ctx.newPage(); let stepNow = 'load';
      p.on('pageerror', e => R.errors.push({ step: stepNow, msg: e.message, stack: (e.stack || '').split('\n').slice(0, 3).join(' | ') }));
      p.on('console', m => { if (m.type() === 'error' && !/ERR_FAILED|net::|Failed to load resource/.test(m.text())) R.console.push({ step: stepNow, msg: m.text().slice(0, 300) }); });
      const local = (re, file, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, file)), contentType: type }));
      await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript');
      await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
      await local(/jspdf\.umd/, 'jspdf/dist/jspdf.umd.min.js', 'application/javascript');
      await local(/autotable/, 'jspdf-autotable/dist/jspdf.plugin.autotable.min.js', 'application/javascript');
      await p.route(/flow\.js/, async r => { const res = await r.fetch(); let t = await res.text();
        t = t.replace('const EXAMPLES=[', 'const EXAMPLES=window.__EX=[').replace('async function runExample(i){', 'window.__run=runExample; async function runExample(i){');
        r.fulfill({ response: res, body: t }); });
      await p.route(/fonts\.(googleapis|gstatic)|d3/, r => r.abort());
      await p.addInitScript(t => { try { localStorage.setItem('bd-tier', t); } catch (e) {} }, tpl);
      const fails = s => { const f = []; if (s.bad.length || s.badSvg.length || s.badAttr.length) f.push('bad'); if (s.hscroll.doc > 1 || s.hscroll.body > 1) f.push('hscroll'); if (s.clip.length || s.offscreen.length) f.push('clip');
        if (s.covered.length || s.btnOff.length) f.push('covered'); if (s.overlapSvg.length || s.overlap3d.length || s.label3dUnder.length) f.push('overlap'); if (s.leaders.length) f.push('leader'); if (s.unsrcSec.length) f.push('unsrc'); if (s.empty) f.push('empty'); return f; };
      const check = async (tag) => { await p.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 300))))); const s = await p.evaluate(() => __sc.run()); s.tag = tag; s.empty = s.len < 80 && !/^(welcome|aarr|v3d)/.test(tag);
        s.fails = fails(s); R.steps.push(s);
        for (const f of s.fails) { const k = tag.replace(/:.*/, '') + '|' + f; shotSeen[k] = (shotSeen[k] || 0) + 1; if (shotSeen[k] <= 2) { const fn = path.join(shots, `${vp}_${tpl}_${key}_${tag}_${f}.png`.replace(/[^A-Za-z0-9_.-]/g, '_')); try { await p.screenshot({ path: fn }); } catch (e) {} } }
        return s; };
      try {
        await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await sleep(6500);
        await p.evaluate(CHECK);
        stepNow = 'welcome'; await check('welcome');
        stepNow = 'select';
        await p.evaluate(x => { window.__EX.push(x); const w = document.getElementById('welcome'); if (w) w.remove(); window.__run(window.__EX.length - 1); }, L);
        for (let i = 0; i < 40; i++) { await sleep(500); const ok = await p.evaluate(() => !!(BD.S.sel && BD.flow.i === 1)); if (ok) break; }
        await sleep(2000);
        R.tier = await p.evaluate(() => BD.tier());
        R.fit = await p.evaluate(() => { try { return { mw: BD.S.answers.mw, probs: BD.setupProblems ? BD.setupProblems() : [] }; } catch (e) { return { err: e.message }; } });
        await p.evaluate(() => { BD.flow.max = 999; });
        const SLOW = /^(opps-best)$/; const doBest = !!process.env.BEST && GOLD.includes(key) && vp === 'desk';
        let i = 1, guard = 0;
        while (guard++ < 60) {
          const st = await p.evaluate(() => BD.flow.steps.map(s => s.k)); if (i >= st.length) break;
          let k = st[i]; if (SLOW.test(k) && !doBest) { R.steps.push({ tag: k, skipped: 'slow (desk golden lots only)' }); i++; continue; }
          if (k === 'opps' && !doBest) { // open the opportunity steps the way flow.js expandOpps does, without drawing "Set-ups that open the most" (2+ min each)
            await p.evaluate(async () => { const F = BD.flow, j = F.steps.findIndex(s => s.k === 'opps'); await BD.oppPrep(); const L = BD.oppScreen(); F.oppList = L;
              F.steps.splice(j, 1, ...[{ k: 'opps-best', g: 'opps', t: 'Set-ups that open the most' }].concat(BD.oppFams.map(f => ({ k: 'fam:' + f, g: 'opps', t: f + ' opportunities', fam: f })))); });
            continue; }
          stepNow = k;
          const t0 = Date.now();
          const res = await p.evaluate(async ([i, ms]) => { BD.flow.max = 999; const pr = BD.flow.go(i); const to = new Promise(r => setTimeout(() => r('timeout'), ms)); const r = await Promise.race([pr.then(() => 'ok', e => 'throw ' + e.message), to]); return { r, i: BD.flow.i, k: BD.flow.steps[BD.flow.i].k }; }, [i, SLOW.test(k) ? 150000 : 40000]);
          k = res.k; stepNow = k;
          if (k === 'report') { for (let q = 0; q < 120; q++) { const d = await p.evaluate(() => { const sd = document.getElementById('side'); return !!sd.querySelector('.rpages') && !/Drawing the report/.test(sd.innerText); }); if (d) break; await sleep(500); } }
          await sleep(k.startsWith('fam:') || k === 'spec' ? 2000 : 1200);
          const s = await check(k); s.go = res.r; s.ms = Date.now() - t0;
          if (process.env.PROBE_STEP === k && process.env.PROBE_SVG) { const re = new RegExp(process.env.PROBE_SVG); const svgs = await p.$$('svg[aria-label]'); let n = 0;
            for (const h of svgs) { const lab = await h.getAttribute('aria-label'); if (!re.test(lab || '')) continue; try { await h.scrollIntoViewIfNeeded(); await sleep(300); await h.screenshot({ path: path.join(shots, `probe_${vp}_${tpl}_${key}_svg${n++}_${(lab || '').slice(0, 30)}.png`.replace(/[^A-Za-z0-9_.-]/g, '_')) }); } catch (e) {} } }
          if (process.env.PROBE_STEP === k && process.env.PROBE_JS) { fs.writeFileSync(path.join(out, 'probe_' + key + '_' + k.replace(/:/g, '_') + '.json'), JSON.stringify(await p.evaluate(process.env.PROBE_JS), null, 1)); await p.screenshot({ path: path.join(shots, 'probe_' + k.replace(/:/g, '_') + '.png') }); break; }
          if (tpl === 'arch' && k === 'aprog') {
            await p.evaluate(async () => { await BD.arch.ready; ['refuge', 'pool', 'greenhouse', 'clinic', 'spa', 'fish_farm', 'roof_solar', 'warming_shelter', 'ev_hub'].forEach(id => { try { BD.archTest.add(id); } catch (e) {} }); const r = BD.arch.picks.find(q => q.id === 'refuge'); if (r) r.opt = 'side_by_side'; BD.views.aprog(); await new Promise(r => setTimeout(r, 1200)); });
            await check('aprog:picked');
          }
          if (tpl === 'arch' && k === 'aarr') {
            for (const [tag, fn] of [['3d', 'A.view="3d";A.explode=false'], ['explode', 'A.explode=true'], ['plan-grad', 'A.explode=false;A.view="plan";A.heat="grad"'], ['section-flow', 'A.view="section";A.heat="flow"'], ['plan-off', 'A.view="plan";A.heat=""']]) {
              stepNow = 'aarr:' + tag;
              await p.evaluate(async f => { const A = BD.arch; new Function('A', f)(A); await BD.views.aarr(); await new Promise(r => setTimeout(r, 1500)); }, fn);
              await check('aarr:' + tag); }
            await p.evaluate(async () => { BD.arch.view = '3d'; BD.arch.explode = false; BD.arch.heat = ''; await BD.views.aarr(); const s = document.getElementById('aSave'); if (s) { s.click(); BD.arch.secure = 'lot'; await BD.views.aarr(); await new Promise(r => setTimeout(r, 300)); const s2 = document.getElementById('aSave'); if (s2) s2.click(); } });
          }
          if (k === 'report') break;
          i = res.i + 1;
        }
      } catch (e) { R.fatal = String(e && e.stack || e).slice(0, 600); try { await p.screenshot({ path: path.join(shots, `${vp}_${tpl}_${key}_fatal.png`) }); } catch (x) {} }
      fs.writeFileSync(ofile, JSON.stringify(R, null, 1));
      const nf = {}; R.steps.forEach(s => (s.fails || []).forEach(f => nf[f] = (nf[f] || 0) + 1));
      console.log(vp, tpl, key, 'steps', R.steps.length, 'errs', R.errors.length, 'console', R.console.length, R.fatal ? 'FATAL ' + R.fatal.slice(0, 120) : '', JSON.stringify(nf), new Date().toISOString().slice(11, 19));
      await ctx.close();
    }
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
