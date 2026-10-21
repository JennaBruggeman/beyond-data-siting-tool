const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell'});const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+require('path').resolve('chap/chap.html')); await p.evaluate(()=>document.fonts.ready);
for(let i=0;i<4;i++){ await p.evaluate(i=>[...document.querySelectorAll('#c span')].forEach((s,k)=>s.className=k===i?'on':''),i); await p.screenshot({path:`chap/c${i}.png`,omitBackground:true}); } await b.close();})();
