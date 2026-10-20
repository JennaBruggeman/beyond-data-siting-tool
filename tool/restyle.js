/* Restyle pass 1 (20 Oct 2026). Loads the new look (IBM Plex Sans, warm graphite, ruled rows; restyle.css) unless the viewer
   picks "Classic look" in the header, so J.B. can compare the two on the live tool. Also drops decorative arrows and chevrons
   from buttons and links ("Next: Heat →" → "Next: Heat"): the words already say where a button goes. */
(function(){
  let classic=false; try{ classic=localStorage.getItem('bd-look')==='classic'; }catch(e){}
  if(!classic){
    const f=document.createElement('link'); f.rel='stylesheet'; f.href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap'; document.head.appendChild(f);
    const c=document.createElement('link'); c.rel='stylesheet'; c.href='restyle.css'; document.head.appendChild(c);
    const strip=root=>{ root.querySelectorAll('button,a').forEach(el=>{ const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT); const L=[]; while(w.nextNode()) L.push(w.currentNode);
      for(const n of L){ const t=n.nodeValue; const u=t.replace(/\s*[→›]\s*$/,'').replace(/^\s*[←‹]\s*/,''); if(u!==t) n.nodeValue=u; }
      el.querySelectorAll('span').forEach(s=>{ if(/^\s*[›→]\s*$/.test(s.textContent)) s.remove(); }); }); };
    let t=null; new MutationObserver(()=>{ clearTimeout(t); t=setTimeout(()=>strip(document.body),60); }).observe(document.body,{childList:true,subtree:true});
    strip(document.body);
  }
  // the switch, at the right of the header
  const add=()=>{ const h=document.querySelector('header'); if(!h||document.getElementById('lookSw')) return;
    const b=document.createElement('button'); b.id='lookSw'; b.type='button'; b.textContent=classic?'New look':'Classic look';
    b.style.cssText='margin-left:auto;background:transparent;border:1px solid var(--line-2);color:var(--muted);border-radius:4px;padding:4px 10px;font:inherit;font-size:12.5px;cursor:pointer';
    b.onclick=()=>{ try{ localStorage.setItem('bd-look',classic?'new':'classic'); }catch(e){} location.reload(); }; h.appendChild(b); };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',add); else add();
})();
