// node anim/rec.js <page.html> <seconds> <outdir> [still times...]
const {chromium}=require('playwright'); const fs=require('fs'), path=require('path');
const [,,page,dur,out,...stills]=process.argv; const FPS=24;
(async()=>{ const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell'});
const p=await b.newPage({viewport:{width:1920,height:1080}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.resolve(page)); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(300);
fs.mkdirSync(out,{recursive:true});
const ts=stills.length?stills.map(Number):[...Array(Math.round(dur*FPS)).keys()].map(i=>i/FPS);
let n=0; for(const t of ts){ await p.evaluate(t=>R(t),t); await p.screenshot({path:`${out}/f${String(n++).padStart(5,'0')}.jpg`,type:'jpeg',quality:93}); }
console.log('frames',n,'errs',errs); await b.close(); })();
