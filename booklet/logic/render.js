// Prints each page to PDF (vector) and a 300 dpi PNG. node render.js [name-filter]
const {chromium}=require('playwright'); const fs=require('fs'), path=require('path');
(async()=>{ const P=JSON.parse(fs.readFileSync(path.join(__dirname,'pages.json'))); const f=process.argv[2]||'';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell'});
fs.mkdirSync(path.join(__dirname,'out'),{recursive:true});
for(const p of P){ if(f&&!p.name.includes(f)) continue;
  const pg=await b.newPage({viewport:{width:Math.round(p.w*96),height:Math.round(p.h*96)},deviceScaleFactor:300/96});
  await pg.goto('file://'+path.join(__dirname,'pages',p.name+'.html')); await pg.evaluate(()=>document.fonts.ready); await pg.waitForTimeout(200);
  await pg.pdf({path:path.join(__dirname,'out',p.name+'.pdf'),width:p.w+'in',height:p.h+'in',printBackground:true,pageRanges:'1'});
  await pg.screenshot({path:path.join(__dirname,'out',p.name+'.png')}); await pg.close(); console.log(p.name); }
await b.close(); })();
