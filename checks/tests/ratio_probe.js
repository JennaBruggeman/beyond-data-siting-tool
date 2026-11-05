// Ratios probe (5 Nov 2026): loads the tool headless in Architecture mode, opens Ratios on each lot and evaluates EXPR there.
// Usage (from checks/tests/, tool served on :8766): EXPR="<async js>" NODE_PATH=<node_modules> node ratio_probe.js [lotKey ...]
// Writes ex_<lot>.json in the current folder. Lots: E14715, E4103, E06B, V339, E05.
const fs=require('fs'),path=require('path');
const NM=(process.env.NODE_PATH||'').split(':')[0]; // node_modules with three, jspdf
const {chromium}=require('playwright');
const LOTS={E14715:{lab:'14715 Yellowhead Trail NW',sub:'BE · new building',sel:{city:'edm',tile:'-2_1',id:'150388'},ans:{built:'new',extent:'whole',floor:''}},E4103:{lab:'4103 97 Street NW',sub:'BE · new building',sel:{city:'edm',tile:'0_-3',id:'904935'},ans:{built:'new',extent:'whole',floor:''}},
E06B: { lab: '64 Airport Rd NW', sub: 'BE', sel: { city: 'edm', tile: '-1_1', id: '146402' }, ans: { built: 'new', extent: 'whole', floor: '' } },V339:{lab:'339 1st Ave E',sub:'I-3',sel:{city:'van',tile:'1_1',id:'63819485'},ans:{built:'new',extent:'whole',floor:''}},E05:{lab:'8803 Stadium Rd NW',sub:'IM',sel:{city:'edm',tile:'0_0',id:'51053'},ans:{built:'new',extent:'whole',floor:''}}};
const EXPR=process.env.EXPR||'';
(async()=>{
 const b=await chromium.launch({...(process.env.PW_EXE?{executablePath:process.env.PW_EXE}:{}),args:['--use-gl=swiftshader','--enable-webgl']});
 const keys=process.argv.slice(2).length?process.argv.slice(2):Object.keys(LOTS);
 for(const key of keys){
  const p=await b.newPage({viewport:{width:1440,height:900}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  const local=(re,file,type)=>p.route(re,r=>r.fulfill({body:fs.readFileSync(path.join(NM,file)),contentType:type}));
  await local(/three\.min\.js/,'three/build/three.min.js','application/javascript');
  await local(/OrbitControls\.js/,'three/examples/js/controls/OrbitControls.js','application/javascript');
  await local(/jspdf\.umd/,'jspdf/dist/jspdf.umd.min.js','application/javascript');
  await local(/autotable/,'jspdf-autotable/dist/jspdf.plugin.autotable.min.js','application/javascript');
  await p.route(/flow\.js/,async r=>{const res=await r.fetch();let t=await res.text();t=t.replace('const EXAMPLES=[','const EXAMPLES=window.__EX=[').replace('async function runExample(i){','window.__run=runExample; async function runExample(i){');r.fulfill({response:res,body:t});});
  await p.route(/fonts\.(googleapis|gstatic)|d3/,r=>r.abort());
  await p.addInitScript(()=>{try{localStorage.setItem('bd-tier','arch');}catch(e){}});
  await p.goto('http://localhost:8766/index.html?x='+Date.now()); await p.waitForTimeout(7000);
  await p.evaluate(x=>{window.__EX.push(x);const w=document.getElementById('welcome');if(w)w.remove();window.__run(window.__EX.length-1);},LOTS[key]);
  await p.waitForTimeout(9000);
  const pre=await p.evaluate(()=>({mw:BD.S.answers.mw,mwPick:BD.S.answers.mwPick,ans:JSON.parse(JSON.stringify(BD.S.answers))}));
  const r=await p.evaluate(async(EXPR)=>{ await BD.arch.ready; BD.flow.to('arat'); await new Promise(r=>setTimeout(r,1500));
    const b=BD.archTest.ratioBase(), RT=BD.archTest.ratioNow(), M=BD.model();
    let ex=null; if(EXPR){ try{ ex=await eval(EXPR); }catch(e){ ex='ERR '+e.message; } }
    return {ratio:BD.arch.ratio, base:b&&{lot:b.lot,build:b.build,floors:b.floors,dataFl:b.dataFl,fsr:b.fsr,perMW:b.perMW}, calc:RT&&{allowed:RT.allowed,dcM2:RT.dcM2,mw:RT.mw,mwTest:RT.mwTest}, hallRoom:M.hallRoom, mw:BD.S.answers.mw, fitMax:BD.fitMax&&BD.fitMax(), ex};},EXPR);
  fs.writeFileSync('ex_'+key+'.json',JSON.stringify(r.ex,null,1)); console.log(key,JSON.stringify({pre:{mw:pre.mw,mwPick:pre.mwPick},r}),errs.join('|'));
  await p.close();}
 await b.close();})();
