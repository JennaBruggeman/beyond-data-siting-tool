// Sweep, architecture slice (3 Nov 2026): localStorage bd-tier 'arch'. Programs -> Arrange -> Compare on every lot.
// Usage (from checks/tests/): NODE_PATH=<node_modules with playwright> node sweep_arch.js <outjson> <shotdir> [lotKey ...]
// Needs the tool served at http://localhost:8766. Setup copied from golden_run.js / arch_run.js. One browser, one page at a time.
// Drives the panel through its own buttons, selects and inputs (click / change events); the geometry checks are recomputed here,
// independently of arch.js (lot ring, required yards, zone height, floor-space ratio, I-2/I-3 1.00 non-industrial cap, flat bases,
// no overlap with hall / plant / plant yard / loading, drawn area = size, not-permitted uses not drawn, red flags, source chips).
const fs = require('fs'), path = require('path');
const NM = (process.env.NODE_PATH || '').split(require('path').delimiter)[0];
const { chromium } = require('playwright');
const N = { built: 'new', extent: 'whole', floor: '' }, X = { built: 'existing', extent: 'whole', floor: '' };
const LOTS = {
  V09: ['275 1st Ave E', 'I-3', { city: 'van', tile: '1_1', id: '63819363' }, N],
  E05: ['8803 Stadium Rd NW', 'IM', { city: 'edm', tile: '0_0', id: '51053' }, N],
  CLARK: ['1425 Clark Dr', 'I-2', { city: 'van', tile: '2_1', id: '23060741' }, N],
  E123: ['12603 123 Street NW', 'IH', { city: 'edm', tile: '-1_1', id: '883345' }, N],
  V339: ['339 1st Ave E', 'I-3', { city: 'van', tile: '1_1', id: '63819485' }, N],
  E06A: ['74 Airport Rd NW', 'BE', { city: 'edm', tile: '-1_1', id: '176767' }, N],
  E06B: ['64 Airport Rd NW', 'BE', { city: 'edm', tile: '-1_1', id: '146402' }, N],
  HAST: ['555 W Hastings', 'DD existing upper floor', { city: 'van', tile: '0_2', id: '59013407' }, { built: 'existing', extent: 'part', floor: 'upper' }],
  VI1S: ['116 8th Ave W', 'I-1 small', { city: 'van', tile: '0_1', id: '64817976' }, N],
  VI1L: ['2450 Ontario St', 'I-1', { city: 'van', tile: '0_0', id: '64818406' }, N],
  VI1C: ['360 2nd Ave W', 'I-1C', { city: 'van', tile: '0_1', id: '64017198' }, N],
  VI2S: ['1250 Frances St', 'I-2 small', { city: 'van', tile: '2_2', id: '59422650' }, N],
  VI2L: ['1940 Glen Dr', 'I-2 large', { city: 'van', tile: '1_1', id: '22263074' }, N],
  VI3S: ['670 Industrial Ave', 'I-3 small', { city: 'van', tile: '1_1', id: '63519380' }, N],
  VFC2: ['1220 Station St', 'FC-2', { city: 'van', tile: '1_1', id: '63019307' }, N],
  VM1: ['1250 45th Ave E', 'M-1', { city: 'van', tile: '1_-2', id: '75822402' }, N],
  VM2L: ['570 Kent Ave South E', 'M-2 large', { city: 'van', tile: '1_-4', id: '83920152' }, N],
  VIC2: ['1620 5th Ave W', 'IC-2', { city: 'van', tile: '-2_1', id: '64212208' }, N],
  VIC3X: ['2050 Scotia St', 'IC-3 existing building', { city: 'van', tile: '1_1', id: '19464204' }, X],
  EBEL: ['2010 76 Avenue NW', 'BE large', { city: 'edm', tile: '3_-2', id: '96523' }, N],
  EIM: ['7282 68 Street NW', 'IM', { city: 'edm', tile: '1_-2', id: '975343' }, N],
  EIHS: ['9565 60 Avenue NW', 'IH under 1 ha', { city: 'edm', tile: '0_-2', id: '95140' }, N],
  EIHL: ['550 Hayter Road NW', 'IH huge', { city: 'edm', tile: '3_1', id: '832080' }, N],
  EMU: ['10323 78 Avenue NW', 'MU', { city: 'edm', tile: '0_-2', id: '838298' }, N],
  EDC2: ['12431 Stony Plain Road NW', 'DC2 small', { city: 'edm', tile: '-1_0', id: '94114' }, N],
  EDCX: ['5904 51 Avenue NW', 'DC existing building', { city: 'edm', tile: '1_-3', id: '693380' }, X],
  ECMV: ['10550 102 Street NW', 'CMUV existing building', { city: 'edm', tile: '0_0', id: '822759' }, X],
};
// program sets (6-10 each); sizes typed for programs with no sourced typical size
const SETS = [
  ['refuge', 'pool', 'greenhouse', 'clinic', 'ev_hub', 'warming_shelter', 'public_ground', 'gym'],
  ['refuge', 'warming_shelter', 'spa', 'therapy_pool', 'community_kitchen', 'fish_farm', 'conservatory', 'laundry', 'ev_hub'],
  ['refuge', 'pool', 'greenhouse', 'heat_plant', 'ev_hub', 'clinic', 'covered_plaza', 'roof_solar', 'winter_garden', 'food_drying'],
  ['refuge', 'clinic', 'pool', 'warming_shelter', 'greenhouse', 'aquarium'],
];
const TYPE = { laundry: 150, heat_plant: 88, covered_plaza: 300, winter_garden: 250, food_drying: 120, lumber_drying: 200 };

// ---------- in-page helpers (installed once per page) ----------
const HELP = `(()=>{ const H=window.__H={};
H.inP=(pt,r)=>{ let c=false; for(let i=0,j=r.length-2;i<r.length;j=i,i+=2){ const xi=r[i],yi=r[i+1],xj=r[j],yj=r[j+1]; if(((yi>pt[1])!==(yj>pt[1]))&&(pt[0]<(xj-xi)*(pt[1]-yi)/(yj-yi)+xi)) c=!c; } return c; };
H.zoneCode=()=>{ const s=BD.S.sel||{}, a=s.a||[]; return String(s.city==='van'?(a[1]||''):(a[2]||a[1]||'')).toUpperCase().trim(); };
H.zoneMatch=(str,code)=>{ if(!str||!code) return '?'; const re=new RegExp('(^|[^A-Z0-9-])'+code.replace(/[-]/g,'\\\\-')+'(?![A-Z0-9])'); const segs=String(str).toUpperCase().split(/[;(]/);
  const seg=segs.find(x=>re.test(x)); if(/^\\s*NONE\\s*$/i.test(str)) return 'rezoning'; if(!seg){ return /\\bONLY\\b/i.test(str)?'no':'?'; } if(/\\bONLY\\b/.test(seg)&&seg.replace(re,'').trim().length>4) return 'only'; if(/NOT PERMITTED|\\bNP\\b/.test(seg)) return 'no'; if(/NOT LISTED/.test(seg)) return 'rezoning'; return 'yes'; };
H.bad=/\\bNaN\\b|\\bundefined\\b|\\bnull\\b|\\[object|\\bInfinity\\b/;
H.ctx=(t,re)=>{ const m=re.exec(t); return m?t.slice(Math.max(0,m.index-70),m.index+50).replace(/\\s+/g,' '):''; };
H.sleep=ms=>new Promise(r=>setTimeout(r,ms));
// the independent checks on the current arrangement
H.check=(tag)=>{ const I=[]; const iss=(sev,what)=>I.push([sev,tag+': '+what]);
  const T=BD.archTest; const t0=performance.now(); const P=T.place(); const ms=performance.now()-t0; if(!P) return {I,none:true};
  const B=T.budgets(P), R=T.rules(P); const s=P.s, M=s.M, F=s.F, Z=M.Z||{}, code=H.zoneCode(), city=s.city, eps=0.05;
  if(ms>4000) iss('low','place() took '+Math.round(ms)+' ms');
  const toL=r=>{ const o=[]; for(let k=0;k<r.length;k+=2) o.push(F.toL(r[k],r[k+1])); return o; };
  const extL=r=>{ const L=toL(r); return [Math.min(...L.map(p=>p[0])),Math.max(...L.map(p=>p[0])),Math.min(...L.map(p=>p[1])),Math.max(...L.map(p=>p[1]))]; };
  const yr=M.yardRect?extL(M.yardRect):null;
  const samp=(u,v,f)=>{ const nu=Math.max(2,Math.ceil((u[1]-u[0])/1)), nv=Math.max(2,Math.ceil((v[1]-v[0])/1)); for(let a=0;a<=nu;a++) for(let b=0;b<=nv;b++){ const uu=u[0]+0.15+(u[1]-u[0]-0.3)*a/nu, vv=v[0]+0.15+(v[1]-v[0]-0.3)*b/nv; if(f(uu,vv)) return [uu,vv]; } return null; };
  const ovR=(a,b)=>a.u[0]<b.u[1]-eps&&b.u[0]<a.u[1]-eps&&a.v[0]<b.v[1]-eps&&b.v[0]<a.v[1]-eps;
  const ovZ=(a,b)=>a.base<b.base+b.h-0.01&&b.base<a.base+a.h-0.01;
  const hall={u:P.hall.u,v:P.hall.v,base:P.hall.base,h:P.hall.h};
  const others=[]; for(const b of (M.plant&&M.plant.boxes||[])) others.push([b.kind==='roof'?'roof plant '+b.name:'yard plant '+b.name,b.ring]);
  if(M.plant&&M.plant.yard){ const y=BD.geo.clip(M.ring,M.plant.yard); if(y&&y.length>=6) others.push(['plant yard',y]); }
  if(M.loading) others.push(['loading',M.loading]);
  const zoneH=Z.hOutright!=null?Math.max(Z.hOutright,M.hmode==='conditional'&&Z.hx?Z.hx[0]:0):null;
  const hallTop=P.hall.base+P.hall.h; if(zoneH!=null&&hallTop>zoneH+0.01) iss('high','hall drawn to '+hallTop.toFixed(1)+' m, over the zone height '+zoneH+' m');
  if(M.H&&hallTop>M.H+0.01) iss('high','hall drawn to '+hallTop.toFixed(1)+' m, over the set-up height '+M.H.toFixed(1)+' m');
  let floor=s.hallM2, nonInd=0; const ind=(q)=>['heat_plant','food_drying','lumber_drying','ev_hub'].includes(q.id)||(/I-2/.test(code)&&(q.id==='community_kitchen'||(q.id==='laundry'&&q.opt==='commercial')));
  const drawn=new Set();
  for(const b of P.boxes){ const nm=b.id+(b.underHall?' (under hall)':''); drawn.add(b.id);
    // in the lot, outside the required yards
    const cs=[[b.u[0],b.v[0]],[b.u[1],b.v[0]],[b.u[0],b.v[1]],[b.u[1],b.v[1]]].map(([u,v])=>[u+(u===b.u[0]?eps:-eps),v+(v===b.v[0]?eps:-eps)]);
    if(cs.some(([u,v])=>!H.inP(F.toW(u,v),M.ring))) iss('high',nm+' has a corner outside the lot ring');
    if(yr&&(b.u[0]<yr[0]-eps||b.u[1]>yr[1]+eps||b.v[0]<yr[2]-eps||b.v[1]>yr[3]+eps)) iss('high',nm+' crosses a required yard (box u '+b.u.map(x=>x.toFixed(1))+' v '+b.v.map(x=>x.toFixed(1))+', yards u '+yr.slice(0,2).map(x=>x.toFixed(1))+' v '+yr.slice(2).map(x=>x.toFixed(1))+')');
    const top=b.base+b.h; if(zoneH!=null&&top>zoneH+0.01) iss('high',nm+' top '+top.toFixed(1)+' m over the zone height '+zoneH+' m'); else if(M.H&&top>M.H+0.01) iss('medium',nm+' top '+top.toFixed(1)+' m over the set-up height '+M.H.toFixed(1));
    // overlaps
    if(ovR(b,hall)&&ovZ(b,hall)) iss('high',nm+' overlaps the data hall');
    for(const o of P.boxes) if(o!==b&&o.id<b.id&&ovR(b,o)&&ovZ(b,o)) iss('high',nm+' overlaps '+o.id);
    for(const [on,r] of others){ const hit=samp(b.u,b.v,(u,v)=>H.inP(F.toW(u,v),r)); if(hit){ const z=on.startsWith('roof plant')?[hallTop,1e9]:[0,1e9]; if(b.base+b.h>z[0]-0.01) iss('high',nm+' overlaps the '+on); } }
    // rests flat
    if(b.base>0.01){ const sup=[hall,...P.boxes.filter(o=>o!==b)]; const gap=samp(b.u,b.v,(u,v)=>{ let t=0; for(const o of sup){ if(u>o.u[0]&&u<o.u[1]&&v>o.v[0]&&v<o.v[1]&&o.base+o.h<=b.base+0.01) t=Math.max(t,o.base+o.h); } return Math.abs(t-b.base)>0.05; }); if(gap) iss('high',nm+' at base '+b.base.toFixed(1)+' m does not rest flat (a point has support at a different height)'); }
    // drawn area
    const area=Math.abs((b.u[1]-b.u[0])*(b.v[1]-b.v[0]))*(b.storeys||1); if(b.q.m2&&Math.abs(area-b.q.m2)>Math.max(1,0.01*b.q.m2)) iss(b.underHall?'medium':'high',nm+' drawn '+Math.round(area)+' m² for a size of '+Math.round(b.q.m2)+' m²');
    const sh=Math.min(b.u[1]-b.u[0],b.v[1]-b.v[0]); const mn=b.id==='pool'?(city==='edm'?12.1:10.9):6; if(sh<mn-0.05) iss('low',nm+' short side '+sh.toFixed(2)+' m, under the '+mn+' m drawing minimum');
    // permitted
    const z=b.p.zoning&&b.p.zoning[city]; if(z){ const m=H.zoneMatch(city==='van'?z.districts:z.zones,code); if(m==='no') iss('high',nm+' drawn although not permitted in '+code+' ('+(city==='van'?z.districts:z.zones)+')'); if(city==='edm'&&code==='BE'&&z.cap_m2&&b.q.m2>z.cap_m2+0.5) iss('high',nm+' '+Math.round(b.q.m2)+' m² drawn over the BE cap '+z.cap_m2); }
    floor+=b.q.m2||0; if(!ind(b.q)) nonInd+=b.q.m2||0; }
  const fsr=Z.fsr&&Z.fsr[1]; if(fsr&&floor>s.lot*fsr+0.5) iss('high','total floor '+Math.round(floor)+' m² over FSR '+fsr+' x lot '+Math.round(s.lot)+' = '+Math.round(s.lot*fsr));
  if(city==='van'&&/^I-[23]/.test(code)&&nonInd>s.lot*1.0+0.5) iss('high','non-industrial floor '+Math.round(nonInd)+' m² over the 1.00 cap ('+Math.round(s.lot)+' m²)');
  // every picked mass is drawn, or not drawn with a flag
  const nd=new Set(P.notDrawn||[]);
  for(const q of BD.arch.picks){ const p=T.CAT.byId[q.id]; if(!p||p.kind!=='mass') continue; const fl=R.filter(r=>r.id===q.id||(r.t||'').startsWith(p.name.split(' (')[0]));
    if(!drawn.has(q.id)&&!nd.has(q.id)&&q.m2!=null&&!(q.id==='refuge'&&!q.opt)) iss('high',q.id+' picked with a size, not drawn, and not in the not-drawn list');
    if(nd.has(q.id)&&!fl.length) iss('medium',q.id+' not drawn with no flag saying why');
    if(drawn.has(q.id)&&nd.has(q.id)) iss('medium',q.id+' both drawn and listed as not drawn'); }
  // red flags
  const reds=R.filter(r=>r.sev==='bad');
  for(const r of reds){ if(/drawn over \\d+ storeys only to show its size/.test(r.t)) iss('low','red flag for a design question, not a failed rule: "'+r.t.slice(0,90)+'"'); if(/This should not happen/.test(r.t)) iss('high','tool self-check fired: "'+r.t.slice(0,120)+'"'); }
  for(const b of P.boxes){ if(b.bad&&!R.some(r=>r.sev==='bad'&&r.id===b.id)) iss('medium',b.id+' drawn red with no red rule naming it'); }
  for(const r of R){ if(!r.t) iss('medium','rule with no text'); else if(H.bad.test(r.t)) iss('high','rule text: '+H.ctx(r.t,H.bad)); }
  // the secure line: required parts outside it must be flagged
  const sec=P.secRing||[]; const inSec=r=>{ for(let i=0;i<r.length;i+=2) if(sec.some(x=>H.inP([r[i],r[i+1]],x))) return true; return sec.some(x=>H.inP(BD.centroid(r),x)); };
  const req=[['plant yard',M.plant&&M.plant.yard?BD.geo.clip(M.ring,M.plant.yard):null],['loading',M.loading],['generators',((M.plant&&M.plant.boxes)||[]).find(b=>b.name.indexOf('generator')>=0)]].filter(x=>x[1]).map(x=>[x[0],x[1].ring||x[1]]);
  const outReq=req.filter(([n,r])=>r&&r.length>=6&&!inSec(r)).map(x=>x[0]);
  if(outReq.length&&!R.some(r=>/outside the secure line/i.test(r.t))) iss('medium','secure line "'+BD.arch.secure+'" leaves '+outReq.join(', ')+' outside it, with no flag');
  return {I,ms:Math.round(ms),boxes:P.boxes.map(b=>[b.id,Math.round(b.q.m2||0),b.storeys,Math.round(b.base),Math.round(b.h),b.underHall?'U':b.own?'O':b.top?'T':'',!!b.bad]),notDrawn:P.notDrawn,reds:reds.map(r=>r.t.slice(0,140)),space:B.space&&[Math.round(B.space.hall),Math.round(B.space.prog),Math.round(B.space.cap||0)],levels:P.levels,secure:BD.arch.secure,outReq,zone:code,H:M.H,zoneH,fsr,lot:Math.round(s.lot)}; };
// the side panel text and chips
H.panel=(tag)=>{ const I=[]; const iss=(sev,w)=>I.push([sev,tag+': '+w]); const sd=document.getElementById('side'); const vis=sd.innerText;
  if(H.bad.test(vis)) iss('high','visible text: '+H.ctx(vis,H.bad)); else if(H.bad.test(sd.textContent)) iss('low','hidden text: '+H.ctx(sd.textContent,H.bad));
  if(vis.replace(/\\s+/g,' ').length<120) iss('high','panel nearly empty ('+vis.length+' chars)');
  sd.querySelectorAll('.aflag').forEach(f=>{ if(!f.querySelector('.asrc')&&/\\d/.test(f.textContent)) iss('low','flag with a figure and no source chip or "?": "'+f.textContent.trim().slice(0,110)+'"'); });
  sd.querySelectorAll('.abud .lab').forEach(f=>{ if(/\\d/.test(f.textContent)&&!f.querySelector('.asrc')) iss('low','budget line with a figure and no chip: "'+f.textContent.trim().slice(0,90)+'"'); });
  sd.querySelectorAll('.arow .sub').forEach(f=>{ if(/\\d/.test(f.textContent)&&!f.querySelector('.asrc')) iss('low','program note with a figure and no chip: "'+f.textContent.trim().slice(0,110)+'"'); });
  const av=document.getElementById('aView'); if(av&&H.bad.test(av.textContent)) iss('high','view bar text: '+H.ctx(av.textContent,H.bad));
  const pl=document.getElementById('aPlan'); if(pl&&pl.style.display!=='none'&&H.bad.test(pl.textContent)) iss('high','plan/section text: '+H.ctx(pl.textContent,H.bad));
  if(pl&&pl.style.display!=='none'&&/NaN/.test(pl.innerHTML)) iss('high','plan/section SVG has NaN in its geometry');
  return I; };
// panel actions, through the panel's own controls
H.setOpt=async(id,val)=>{ const s=document.querySelector('#side select[data-o="'+id+'"]'); if(!s) return false; s.value=val; s.dispatchEvent(new Event('change')); await H.sleep(250); return true; };
H.setPl=async(id,val)=>{ const s=document.querySelector('#side select[data-pl="'+id+'"]'); if(!s) return false; s.value=val; s.dispatchEvent(new Event('change')); await H.sleep(250); return true; };
H.type=async(id,val)=>{ const i=document.querySelector('#side input[data-m="'+id+'"]'); if(!i) return false; i.value=String(val); i.dispatchEvent(new Event('change')); await H.sleep(250); return true; };
H.step=async(id,d)=>{ const b=document.querySelector('#side button[data-st="'+id+'"][data-d="'+d+'"]'); if(!b) return false; b.click(); await H.sleep(250); return true; };
H.lock=async(id,on)=>{ const c=document.querySelector('#side input[data-l="'+id+'"]'); if(!c) return false; c.checked=on; c.dispatchEvent(new Event('change')); await H.sleep(50); return true; };
H.storeys=async(id,n)=>{ const i=document.querySelector('#side input[data-sy="'+id+'"]'); if(!i) return false; i.value=String(n); i.dispatchEvent(new Event('change')); await H.sleep(250); return true; };
H.sec=async(k)=>{ const b=document.querySelector('#side [data-sec="'+k+'"]'); if(!b) return false; b.click(); await H.sleep(300); return true; };
H.vbtn=async(sel)=>{ const b=document.querySelector('#aView '+sel); if(!b) return false; b.click(); await H.sleep(700); return true; };
H.pick=id=>BD.arch.picks.find(q=>q.id===id);
})()`;

(async () => {
  const outFile = process.argv[2] || 'sweep_arch.json', shotDir = process.argv[3] || 'shots'; fs.mkdirSync(shotDir, { recursive: true });
  const keys = process.argv.slice(4).length ? process.argv.slice(4) : Object.keys(LOTS);
  const res = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};
  const b = await chromium.launch({ ...(process.env.PW_EXE?{executablePath:process.env.PW_EXE}:{}), args: ['--use-gl=swiftshader', '--enable-webgl'] });
  let li = 0;
  for (const key of keys) {
    const [lab, sub, sel, ans] = LOTS[key]; const R = { key, lab, sub, configs: [], issues: [], pageErrors: [], console: [], t0: Date.now() };
    const set = SETS[(Object.keys(LOTS).indexOf(key)) % SETS.length]; R.set = set; li++;
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); let cur = 'load';
    p.on('pageerror', e => R.pageErrors.push([cur, e.message.slice(0, 300)]));
    p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') { const t = m.text(); if (!/Failed to load resource|fonts\.g|ERR_FAILED|d3|WebGL|GPU stall|swiftshader|GL Driver/i.test(t)) R.console.push([cur, m.type(), t.slice(0, 300)]); } });
    const local = (re, file, type) => p.route(re, r => r.fulfill({ body: fs.readFileSync(path.join(NM, file)), contentType: type }));
    await local(/three\.min\.js/, 'three/build/three.min.js', 'application/javascript');
    await local(/OrbitControls\.js/, 'three/examples/js/controls/OrbitControls.js', 'application/javascript');
    await local(/jspdf\.umd/, 'jspdf/dist/jspdf.umd.min.js', 'application/javascript');
    await local(/autotable/, 'jspdf-autotable/dist/jspdf.plugin.autotable.min.js', 'application/javascript');
    await p.route(/flow\.js/, async r => { const res = await r.fetch(); let t = await res.text();
      t = t.replace('const EXAMPLES=[', 'const EXAMPLES=window.__EX=[').replace('async function runExample(i){', 'window.__run=runExample; async function runExample(i){');
      r.fulfill({ response: res, body: t }); });
    await p.route(/fonts\.(googleapis|gstatic)|d3/, r => r.abort());
    await p.addInitScript(() => { try { localStorage.setItem('bd-tier', 'arch'); } catch (e) {} });
    const shot = async (nm) => { const fn = path.join(shotDir, `${key}_${nm}.png`); await p.screenshot({ path: fn }); return fn; };
    const addI = (list, cfg) => { for (const x of list) R.issues.push(x.concat(cfg ? [cfg] : [])); };
    try {
      await p.goto('http://localhost:8766/index.html?x=' + Date.now()); await p.waitForTimeout(6000);
      cur = 'select';
      await p.evaluate(x => { window.__EX.push(x); const w = document.getElementById('welcome'); if (w) w.remove(); return window.__run(window.__EX.length - 1); }, { lab, sub, sel, ans });
      await p.waitForTimeout(5000);
      await p.evaluate(HELP);
      R.selected = await p.evaluate(() => !!BD.S.sel && { id: BD.S.sel.id, lot: Math.round(BD.S.sel.lotArea || 0), zone: __H.zoneCode(), mw: BD.S.answers.mw, steps: BD.flow.steps.map(s => s.k).join(',') });
      if (!R.selected) { R.fatal = 'lot did not select'; throw new Error('noselect'); }
      // Programs: add each through its button
      cur = 'aprog';
      await p.evaluate(async () => { await BD.arch.ready; BD.flow.to('aprog'); await __H.sleep(900); });
      const prog = await p.evaluate(async (set) => { const out = { missing: [], h2: (document.querySelector('#side h2') || {}).textContent };
        for (const id of set) { const b = document.querySelector('#side [data-add="' + id + '"]'); if (!b) { out.missing.push(id); continue; } b.click(); await __H.sleep(120); }
        out.picked = BD.arch.picks.map(q => q.id); out.pressed = [...document.querySelectorAll('#side [data-add][aria-pressed=true]')].map(b => b.dataset.add); out.I = __H.panel('Programs'); return out; }, set);
      R.programs = prog; addI(prog.I); if (prog.missing.length) R.issues.push(['high', 'Programs: no Add button for ' + prog.missing.join(', ')]);
      if (prog.pressed.length !== set.length) R.issues.push(['medium', 'Programs: ' + prog.pressed.length + ' buttons show Added for ' + set.length + ' picks']);
      // Arrange
      cur = 'aarr';
      await p.evaluate(async () => { BD.flow.to('aarr'); await __H.sleep(2500); });
      const arr0 = await p.evaluate(() => ({ h2: (document.querySelector('#side h2') || {}).textContent, lead: (document.querySelector('#side .lead') || {}).textContent, hasP: !!BD.archTest.place() }));
      R.arrange0 = arr0;
      if (!arr0.hasP) { // existing building etc.: the panel must say why
        const I = await p.evaluate(() => { const t = document.getElementById('side').innerText; const I = []; if (!/new building/.test(t)) I.push(['medium', 'Arrange: no arrangement and no explanation']); if (__H.bad.test(t)) I.push(['high', 'Arrange: ' + __H.ctx(t, __H.bad)]); return I; });
        addI(I); cur = 'acmp'; await p.evaluate(async () => { BD.flow.to('acmp'); await __H.sleep(800); });
        addI(await p.evaluate(() => __H.panel('Compare (no arrangement)')));
        throw new Error('noarr'); }
      // at the size the worked example opens at (the largest that fits): how much can be drawn at all
      const fit = await p.evaluate(async () => { await __H.setOpt('refuge', 'side_by_side'); const c = __H.check('fit size'); const r = { mw: BD.S.answers.mw, drawn: (c.boxes || []).length, notDrawn: (c.notDrawn || []).length, space: c.space, I: c.I };
        const q = __H.pick('refuge'); if (q) q.opt = null; BD.views.aarr(); await __H.sleep(300); return r; });
      R.fitSize = fit; addI(fit.I || [], 'fit size');
      // then the arrangement tests at 1 MW (the review's size), or the fit if smaller
      R.mwTest = await p.evaluate(async () => { const m = Math.min(1, BD.S.answers.mw || 1); BD.S.answers.mw = m; BD.modelReset(); BD.views.aarr(); await __H.sleep(1500); return m; });
      // typed sizes for programs with no typical size
      for (const id of set) if (TYPE[id]) { const ok = await p.evaluate(async ([id, v]) => { const q = __H.pick(id); if (!q || q.m2 != null) return 'skip'; return await __H.type(id, v); }, [id, TYPE[id]]); if (ok === false) R.issues.push(['medium', 'Arrange: no size input for ' + id]); }
      const cfgs = [];
      const run = async (tag, act) => { cur = tag; const r = await p.evaluate(async ([tag, act]) => { if (act) await (new Function('H', 'return (async()=>{' + act + '})()'))(__H); await __H.sleep(300);
          const c = __H.check(tag); c.panel = __H.panel(tag); c.msg = BD.arch.msg || null; return c; }, [tag, act || '']).catch(e => ({ I: [['high', tag + ': check threw ' + e.message.slice(0, 200)]], panel: [] }));
        r.tag = tag; cfgs.push(r); addI(r.I || [], tag); addI(r.panel || [], tag);
        if ((r.I || []).concat(r.panel || []).some(x => x[0] === 'high')) r.shot = await shot(tag.replace(/[^a-z0-9]+/gi, '_')); return r; };
      // the refuge's three placements, with no placement first
      await run('refuge none');
      for (const o of ['own_building', 'side_by_side', 'under_hall']) await run('refuge ' + o, `await H.setOpt('refuge','${o}');`);
      // warming shelter day / overnight; greenhouse on the roof / on the lot
      if (set.includes('warming_shelter')) { await run('shelter overnight', `await H.setOpt('warming_shelter','overnight');`); await run('shelter day', `await H.setOpt('warming_shelter','day');`); }
      if (set.includes('greenhouse')) { await run('greenhouse roof', `await H.setPl('greenhouse','roof');`); await run('greenhouse lot', `await H.setPl('greenhouse','lot');`); }
      if (set.includes('laundry')) await run('laundry commercial', `await H.setOpt('laundry','commercial');`);
      await run('refuge side_by_side 2', `await H.setOpt('refuge','side_by_side');`);
      // secure presets
      for (const k of ['lot', 'wall', 'hall', 'suggest']) await run('secure ' + k, `await H.sec('${k}');`);
      // views: explode, plan per storey, section, heat gradient and flow
      cur = 'views';
      const views = await p.evaluate(async () => { const out = { I: [] }; const iss = (s, w) => out.I.push([s, 'views: ' + w]);
        const av = () => document.getElementById('aView'); if (!av()) { iss('high', 'no view bar (#aView)'); return out; }
        out.btns = [...av().querySelectorAll('button')].map(b => b.textContent);
        if (!await __H.vbtn('[data-ex]')) iss('medium', 'no Explode button in 3D'); else { out.explode = BD.arch.explode; if (!BD.arch.explode) iss('medium', 'Explode did not toggle'); out.I.push(...__H.panel('explode')); await __H.vbtn('[data-ex]'); }
        if (!await __H.vbtn('[data-v="plan"]')) { iss('high', 'no Plan button'); return out; }
        const P = BD.archTest.place(); out.levels = P.levels; out.plan = [];
        const pl = () => document.getElementById('aPlan');
        const lvls = [...av().querySelectorAll('[data-sy]')].map(b => +b.dataset.sy); out.storeyBtns = lvls;
        if (P.levels.length && lvls.join() !== P.levels.join()) iss('medium', 'storey buttons ' + lvls.join() + ' vs levels ' + P.levels.join());
        for (const l of (lvls.length ? lvls : [0])) { if (lvls.length) await __H.vbtn('[data-sy="' + l + '"]');
          for (const h of [null, 'grad', 'flow']) { if (h && BD.arch.heat !== h) await __H.vbtn('[data-h="' + h + '"]'); if (!h && BD.arch.heat) await __H.vbtn('[data-h="' + BD.arch.heat + '"]');
            const d = pl(); if (!d || d.style.display === 'none') { iss('high', 'plan not shown (storey ' + l + ', heat ' + h + ')'); continue; }
            const texts = [...d.querySelectorAll('svg text')].map(t => t.textContent); const polys = d.querySelectorAll('svg polygon').length;
            const want = P.boxes.filter(b => (b.levels || []).includes(l)).map(b => b.p.name.split(' (')[0]);
            const hallShown = texts.some(t => /^Data hall/.test(t)); const hallThere = P.hall.base <= l * P.s.ftf.ground + 0.01 && l * P.s.ftf.ground < P.hall.base + P.hall.h;
            if (hallShown && !hallThere) iss('medium', 'plan storey ' + l + ' draws the Data hall, which starts at ' + P.hall.base + ' m (refuge under the hall)');
            for (const w of want) if (!texts.some(t => t.startsWith(w))) iss('medium', 'plan storey ' + l + ': ' + w + ' not labelled');
            if (h === 'flow') { const lines = d.querySelectorAll('svg polyline[stroke-opacity]').length; out.flowLines = lines; }
            if (h === 'grad' && !d.querySelector('.asrc')) iss('low', 'heat gradient: no source chip under the plan');
            out.plan.push([l, h, polys, texts.length]); out.I.push(...__H.panel('plan s' + l + ' ' + (h || 'none')));
            // leader lines right-angled
            for (const pl2 of d.querySelectorAll('svg polyline:not([stroke-opacity])')) { const pts = pl2.getAttribute('points').trim().split(/\s+/).map(x => x.split(',').map(Number)); for (let i = 1; i < pts.length; i++) { const dx = Math.abs(pts[i][0] - pts[i - 1][0]), dy = Math.abs(pts[i][1] - pts[i - 1][1]); if (dx > 0.5 && dy > 0.5) { iss('low', 'a leader segment is diagonal'); break; } } }
          } }
        if (BD.arch.heat) await __H.vbtn('[data-h="' + BD.arch.heat + '"]');
        if (!await __H.vbtn('[data-v="section"]')) iss('high', 'no Section button');
        else { for (const h of [null, 'grad', 'flow']) { if (h && BD.arch.heat !== h) await __H.vbtn('[data-h="' + h + '"]'); const d = pl(); if (!d || d.style.display === 'none') { iss('high', 'section not shown'); continue; } const texts = [...d.querySelectorAll('svg text')].map(t => t.textContent);
            for (const b of P.boxes) if (!texts.some(t => t.startsWith(b.p.name.split(' (')[0]))) iss('medium', 'section: ' + b.id + ' not labelled');
            if (P.s.H && !texts.some(t => /height limit/.test(t))) iss('low', 'section: no height-limit line'); out.I.push(...__H.panel('section ' + (h || 'none'))); } }
        if (BD.arch.heat) await __H.vbtn('[data-h="' + BD.arch.heat + '"]');
        await __H.vbtn('[data-v="3d"]'); if (pl() && pl().style.display !== 'none') iss('medium', 'plan overlay still shown in 3D');
        return out; }).catch(e => ({ I: [['high', 'views threw: ' + e.message.slice(0, 200)]] }));
      // the plan's ground storey with the refuge under the hall
      views.under = await p.evaluate(async () => { const out = []; await __H.setOpt('refuge', 'under_hall'); await __H.vbtn('[data-v="plan"]'); const b0 = document.querySelector('#aView [data-sy="0"]'); if (b0) await __H.vbtn('[data-sy="0"]');
        const P = BD.archTest.place(); const d = document.getElementById('aPlan'); const texts = d ? [...d.querySelectorAll('svg text')].map(t => t.textContent) : [];
        if (P.hall.base > 0 && texts.some(t => /^Data hall/.test(t)) && P.boxes.some(b => b.underHall)) out.push(['medium', 'views: plan, ground storey, refuge under the hall: the Data hall is drawn and labelled on the ground floor, where only the refuge is (hall starts at ' + P.hall.base + ' m); arch.js:312 filters the hall by its top only']);
        out.push(...__H.panel('plan under_hall'));
        await __H.vbtn('[data-v="3d"]'); await __H.setOpt('refuge', 'side_by_side'); return { I: out, texts }; }).catch(e => ({ I: [['high', 'under-hall plan threw ' + e.message.slice(0, 200)]] }));
      views.I.push(...views.under.I);
      R.views = views; addI(views.I);
      if (views.I.some(x => x[0] === 'high' || x[0] === 'medium')) R.viewShot = await shot('views');
      // resizing: +/-, typed sizes, locks
      cur = 'resize';
      const sized = set.filter(id => !['roof_solar'].includes(id));
      const rz = await p.evaluate(async (ids) => { const out = { I: [], log: [] }; const iss = (s, w) => out.I.push([s, 'resize: ' + w]); const C = BD.archTest.CAT;
        const st = () => BD.arch.picks.map(q => [q.id, q.m2 == null ? null : Math.round(q.m2 * 10) / 10, q.lock]);
        const minOf = p => { const s = p.size || {}; if (s.min_m2 != null) return s.min_m2; if (s.step && s.step.units_min != null && s.step.m2_per_unit != null) return s.step.units_min * s.step.m2_per_unit; return null; };
        const chk = (tag) => { const c = __H.check('resize ' + tag); out.I.push(...c.I, ...__H.panel('resize ' + tag)); for (const q of BD.arch.picks) { const p = C.byId[q.id], mn = minOf(p); if (mn != null && q.m2 != null && q.m2 < mn - 0.5) iss('high', tag + ': ' + q.id + ' at ' + Math.round(q.m2) + ' m², under its minimum ' + mn); if (q.m2 != null && q.m2 < 0) iss('high', tag + ': ' + q.id + ' negative size'); } return c; };
        const mass = ids.filter(id => { const p = C.byId[id]; return p && p.kind === 'mass' && __H.pick(id) && __H.pick(id).m2 != null; });
        for (const id of mass) { const q = __H.pick(id), p = C.byId[id], mn = minOf(p), s0 = q.m2; const stp = p.size && p.size.step && p.size.step.m2_per_unit;
          // + then -
          await __H.step(id, 1); const a1 = __H.pick(id).m2; await __H.step(id, -1); const a2 = __H.pick(id).m2;
          if (a1 < s0 - 0.5) iss('medium', id + ': + made it smaller (' + Math.round(s0) + ' -> ' + Math.round(a1) + ')');
          if (stp && a1 > s0 + 0.5 && Math.abs(a1 - s0 - stp) > 0.5 && !BD.arch.msg) iss('low', id + ': + moved ' + Math.round(a1 - s0) + ' m², not one step of ' + stp);
          // typed below the minimum
          await __H.type(id, 1); const a3 = __H.pick(id).m2; if (mn != null && a3 < mn - 0.5) iss('high', id + ': typed 1 m² accepted (' + a3 + '), minimum ' + mn); out.log.push([id, 'typed 1 ->', a3, BD.arch.msg]);
          const inp = document.querySelector('#side input[data-m="' + id + '"]'); if (inp && Math.round(+inp.value) !== Math.round(a3)) iss('medium', id + ': size box shows ' + inp.value + ' but size is ' + Math.round(a3));
          await __H.type(id, Math.round(s0)); chk(id + ' back to ' + Math.round(s0)); }
        // lock one, grow another past the limit
        if (mass.length >= 2) { const lk = mass[1], gr = mass[0]; await __H.lock(lk, true); const before = st(); const lkm = __H.pick(lk).m2;
          await __H.type(gr, 99999); const after = st(); const P = BD.archTest.place(); const drawn = P.boxes.some(b => b.id === gr);
          out.log.push(['grow ' + gr + ' to 99999 with ' + lk + ' locked', before, after, BD.arch.msg, 'drawn=' + drawn]);
          if (Math.abs(__H.pick(lk).m2 - lkm) > 0.5) iss('high', 'locked ' + lk + ' changed ' + Math.round(lkm) + ' -> ' + Math.round(__H.pick(lk).m2));
          if (!drawn) iss('medium', 'typing 99,999 m² for ' + gr + ' keeps that size and removes it from the drawing ("' + (BD.arch.msg || 'no message') + '"), instead of stopping at the limit');
          if (__H.pick(gr).m2 > 50000) iss('medium', gr + ' kept at ' + Math.round(__H.pick(gr).m2) + ' m² after typing 99,999 (no stop at the space/zoning limit)');
          chk('grow ' + gr); await __H.lock(lk, false);
          // restore
          for (const [id, m2] of before) if (m2 != null) { const q = __H.pick(id); if (q) q.m2 = m2; } BD.views.aarr(); await __H.sleep(400);
          // shrink-to-fit: grow by a moderate amount and check others shrink but not below minimums
          const c0 = __H.check('pre'); const left = c0.space ? c0.space[2] - c0.space[0] - c0.space[1] : 0; const g2 = __H.pick(gr).m2 + Math.max(50, left + 200);
          await __H.type(gr, Math.round(g2)); out.log.push(['grow ' + gr + ' to ' + Math.round(g2) + ' (space left ' + Math.round(left) + ')', st(), BD.arch.msg]); chk('grow2 ' + gr);
          for (const [id, m2] of before) if (m2 != null) { const q = __H.pick(id); if (q) q.m2 = m2; } BD.views.aarr(); await __H.sleep(400); }
        // storeys input
        if (mass.length) { const id = mass[mass.length - 1]; await __H.storeys(id, 2); const c = chk('storeys 2 ' + id); out.log.push(['storeys 2', id, c.boxes && c.boxes.find(b => b[0] === id)]); await __H.storeys(id, 1); }
        // delete and re-add one
        const dl = mass[mass.length - 1]; if (dl) { const b = document.querySelector('#side [data-x="' + dl + '"]'); if (b) { b.click(); await __H.sleep(300); if (__H.pick(dl)) iss('medium', 'delete did not remove ' + dl); chk('after delete ' + dl); } }
        return out; }, sized).catch(e => ({ I: [['high', 'resize threw: ' + e.message.slice(0, 200)]] }));
      R.resize = rz; addI(rz.I);
      // save and compare
      cur = 'compare';
      const cmp = await p.evaluate(async () => { const out = { I: [] }; const iss = (s, w) => out.I.push([s, 'compare: ' + w]);
        for (const k of ['suggest', 'lot', 'hall']) { await __H.sec(k); const sv = document.getElementById('aSave'); if (!sv) { iss('high', 'no Save button'); break; } sv.click(); await __H.sleep(300); }
        out.saved = BD.arch.saved.length; if (out.saved !== 3) iss('medium', out.saved + ' saved after 3 saves');
        BD.flow.to('acmp'); await __H.sleep(900); const t = document.querySelector('#side table.acmp'); if (!t) { iss('high', 'no compare table'); return out; }
        const ths = [...t.querySelectorAll('tr:first-child th')].length - 1; if (ths !== out.saved) iss('medium', ths + ' columns for ' + out.saved + ' saved');
        out.rows = [...t.querySelectorAll('tr')].map(r => [...r.children].map(c => c.textContent.trim().slice(0, 80)));
        out.I.push(...__H.panel('Compare'));
        const sec = out.rows.find(r => r[0] === 'Secure line'); if (sec && sec.slice(1).join() !== 'suggested,lot line,hall wall') iss('medium', 'secure line row reads ' + sec.slice(1).join(' / '));
        return out; }).catch(e => ({ I: [['high', 'compare threw: ' + e.message.slice(0, 200)]] }));
      R.compare = cmp; addI(cmp.I); if (cmp.I.some(x => x[0] === 'high')) R.cmpShot = await shot('compare');
      R.configs = cfgs.map(c => ({ tag: c.tag, ms: c.ms, boxes: c.boxes, notDrawn: c.notDrawn, reds: c.reds, space: c.space, levels: c.levels, outReq: c.outReq, zone: c.zone, H: c.H, zoneH: c.zoneH, fsr: c.fsr, lot: c.lot, msg: c.msg, shot: c.shot }));
    } catch (e) { if (!['noselect', 'noarr'].includes(e.message)) R.fatal = (R.fatal || '') + e.message.slice(0, 300); }
    R.ms = Date.now() - R.t0; res[key] = R; fs.writeFileSync(outFile, JSON.stringify(res, null, 1));
    console.log(key, R.fatal ? 'FATAL ' + R.fatal : '', 'configs', R.configs.length, 'issues', R.issues.length, 'pageErrors', R.pageErrors.length, 'console', R.console.length, Math.round(R.ms / 1000) + 's');
    await p.close();
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
