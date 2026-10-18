const SP='/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad';
const {chromium}=require(SP+'/node_modules/playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell'});
const p=await b.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
await p.route(/three\.min\.js|OrbitControls|fonts\.(googleapis|gstatic)|jspdf|autotable|d3/,r=>r.abort());
for(const h of process.argv.slice(2)){
await p.goto('http://localhost:8765/index.html?x='+Date.now()+'#'+h);await p.waitForTimeout(9000);
const r=await p.evaluate(()=>{const s=BD.S.sel; if(!s) return 'nosel'; let f={};try{f=BD.eng.siteFacts();}catch(e){f={err:String(e)}}
 return {a:s.a&&s.a.slice(0,5),ringArea:s.ring?BD.area(s.ring):null,lotIds:s.lotIds,lotArea:s.lotArea,foot:f.foot,plate:f.plate,fp:f.fp,roof:BD.eng.roofArea?BD.eng.roofArea(f):'n/a',blds:(s.blds||[]).length};});
console.log(h,JSON.stringify(r));}
await b.close();})();
