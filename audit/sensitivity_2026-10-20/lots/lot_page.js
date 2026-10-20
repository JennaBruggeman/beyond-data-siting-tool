// per-lot check (J.B. 20 Oct: "do 1000 and check for computation and user bugs for each one"): walk every step as a user would, look for broken text,
// stuck steps and errors; then the sensitivity screen on this lot; then plain checks on the numbers.
window.LOTTEST=async function(s,tier,heat){ const wait=ms=>new Promise(r=>setTimeout(r,ms)); const R={sel:s,tier,steps:[],issues:[],t:{}}; const t0=performance.now();
  const bad=/\bNaN\b|\bundefined\b|\bInfinity\b|\[object|\bnull\b(?! island)/;
  try{ BD.setTier(tier); const A=BD.S.answers; Object.keys(A).forEach(k=>delete A[k]); BD.S.sel=null; if(BD.S.city!==s.city){ await BD.setCity(s.city,true); await wait(1500); }
    await BD.select({city:s.city,tile:s.tile,id:s.id}); await wait(1200);
    if(!BD.S.sel){ R.issues.push(['select','the lot did not open: '+(document.getElementById('side').innerText||'').slice(0,160)]); return R; }
    for(let i=0;i<45;i++){ const F=BD.flow, st=F.steps[F.i]; if(!st) break; const side=document.getElementById('side'); const txt=side.innerText||'';
      const m=txt.match(bad); if(m){ const at=txt.indexOf(m[0]); R.issues.push([st.k,'text shows "'+m[0]+'": …'+txt.slice(Math.max(0,at-70),at+40).replace(/\s+/g,' ')+'…']); }
      if(/Error|went wrong|failed/i.test(txt.slice(0,400))) R.issues.push([st.k,'error text near the top: '+txt.slice(0,160).replace(/\s+/g,' ')]);
      { const badAttr=[]; document.querySelectorAll('#side svg *, #wc svg *').forEach(el=>{ for(const at of el.attributes){ if(/NaN|Infinity/.test(at.value)&&badAttr.length<3) badAttr.push(el.tagName+'.'+at.name+' in '+((el.closest('figure,details,.rpage,div[id]')||{}).id||(el.closest('details')&&el.closest('details').querySelector('summary')?el.closest('details').querySelector('summary').innerText.slice(0,40):''))); } }); if(badAttr.length) R.issues.push([st.k,'drawing with NaN/Infinity: '+badAttr.join('; ')]); }
      if(!document.getElementById('fNext')&&st.k!=='report'){ await wait(2500); }
      const stk=side.querySelector('.fstuck'); R.steps.push([st.k,txt.length,!!stk]);
      if(stk){ const why=stk.innerText.replace(/\s+/g,' ').slice(0,220); const fit=document.getElementById('fFit'); if(fit){ R.t.stuck=(R.t.stuck||[]).concat([[st.k,why]]); fit.click(); await wait(1500); continue; } const ff=document.getElementById('fFind'); if(ff&&!R.tried){ R.tried=true; ff.click(); await wait(1500); const fixed=!document.querySelector('#side .fstuck'); R.t.find=[st.k,why,fixed?'found a set-up that fits':'none fits']; if(fixed) continue; }
        R.nofit=true; R.t.nofit=[st.k,why]; if(!/No set-up fits this lot|No size fits/.test(side.innerText)) R.issues.push([st.k,'stuck without saying why']); break; }
      if(st.k==='report'){ R.pages=document.querySelectorAll('#side .rpage').length; if(!R.pages) R.issues.push(['report','no report pages drawn']); break; }
      const nx=document.getElementById('fNext'); if(!nx){ R.issues.push([st.k,'no Next button']); break; } if(nx.disabled){ R.issues.push([st.k,'Next is disabled without a reason shown: '+nx.textContent]); break; }
      nx.click(); await wait(st.k==='energy'||st.k.startsWith('fam')||st.k==='opts'?1600:1100);
      if(st.k==='spec'){ } }
    R.walkMs=Math.round(performance.now()-t0);
    // sensitivity on this lot, from the size the walk ended on
    try{ const S=await window.SENS({heat}); R.sens=S; const b=S.base;
      const fin=v=>v==null||Number.isFinite(v); for(const [k,v] of Object.entries(b)) if(!fin(v)) R.issues.push(['numbers',`${k} is ${v}`]);
      if(b.floorLo>b.floorHi+1e-9) R.issues.push(['numbers',`floor-only size low ${b.floorLo} above high ${b.floorHi}`]);
      if(b.fit!=null&&b.fit>b.floorHi+0.05) R.issues.push(['numbers',`size that fits ${b.fit} above floor-only top ${b.floorHi}`]);
      if(b.noise&&(b.noise<70||b.noise>140)) R.issues.push(['numbers',`sound power ${b.noise.toFixed(1)} dB outside 70–140`]);
      if(b.elec<0||b.plant<0||b.jobs<0) R.issues.push(['numbers','a negative result']);
    }catch(x){ R.issues.push(['sensitivity',String(x).slice(0,200)]); }
  }catch(x){ R.issues.push(['run',String(x&&x.stack||x).slice(0,300)]); }
  R.ms=Math.round(performance.now()-t0); return R; };
