// node anim/rec_warp.js <page.html> <knots.json> <outdir>   knots: [[outT, srcT], ...] piecewise linear
const {chromium}=require('../node_modules/playwright'); const fs=require('fs'), path=require('path');
const [,,page,kf,out]=process.argv; const FPS=30; const K=JSON.parse(fs.readFileSync(kf));
const warp=t=>{ for(let i=1;i<K.length;i++){ if(t<=K[i][0]){ const [a,b]=K[i-1],[c,d]=K[i]; return b+(d-b)*(t-a)/Math.max(1e-6,c-a);} } return K[K.length-1][1]; };
(async()=>{ const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:1920,height:1080}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.resolve(page)); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(300);
fs.mkdirSync(out,{recursive:true}); const N=Math.round(K[K.length-1][0]*FPS); const t0=Date.now();
for(let n=0;n<N;n++){ const fp=`${out}/f${String(n).padStart(5,'0')}.jpg`; if(fs.existsSync(fp)) continue; await p.evaluate(t=>R(t),warp(n/FPS)); await p.screenshot({path:fp,type:'jpeg',quality:93}); }
console.log(page,'frames',N,'s',((Date.now()-t0)/1000).toFixed(0),'errs',errs.slice(0,3)); await b.close(); })();
