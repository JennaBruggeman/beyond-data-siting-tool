const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell'});const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+require('path').resolve('chap/cap.html')); await p.evaluate(()=>document.fonts.load('500 72px Plex'));
const C=[['cap0','A tool that tests any real lot'],['cap1','In Vancouver and Edmonton']];
for(const [f,t] of C){ await p.evaluate(t=>document.getElementById('t').textContent=t,t); await p.screenshot({path:`chap/${f}.png`,omitBackground:true}); } await b.close();})();
