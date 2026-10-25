"""Like make_batch.py, but bundles each site's files into ONE .tar download (single downloads were being dropped),
and waits 6 s after finishing before the next navigate so the download can finish writing.
Usage: python3 make_batch2.py <tag> <domain> [...]  -> prints actions JSON; writes dl_<tag>.json"""
import json, sys, os, urllib.parse
tag, doms = sys.argv[1], sys.argv[2:]
m = json.load(open('../sweep/sweep_merged.json')); done = set(os.listdir('../../sources/library/public'))
TAR = r"""const E=new TextEncoder(),O=window.__out,P=[];const H=(n,z)=>{const h=new Uint8Array(512),p=(s,o)=>h.set(E.encode(s),o);p(n.slice(0,99),0);p('0000644\0',100);p('0000000\0',108);p('0000000\0',116);p(z.toString(8).padStart(11,'0')+'\0',124);p(Math.floor(Date.now()/1e3).toString(8).padStart(11,'0')+'\0',136);p('        ',148);p('0',156);p('ustar\0'+'00',257);let s=0;for(const b of h)s+=b;p(s.toString(8).padStart(6,'0')+'\0 ',148);return h};
for(const[i,u]of L){try{const c=new AbortController(),t=setTimeout(()=>c.abort(),45e3);const r=await fetch(u,{signal:c.signal});const ct=r.headers.get('content-type')||'';const b=new Uint8Array(await r.arrayBuffer());clearTimeout(t);if(!r.ok){O.push([i+' HTTP '+r.status,0]);continue}const n=i+(ct.includes('pdf')?'/full.pdf':'/page.html');P.push(H(n,b.length),b,new Uint8Array((512-b.length%512)%512));O.push([n,b.length])}catch(e){O.push([i+' ERR '+String(e).slice(0,50),0])}}
P.push(new Uint8Array(1024));if(O.some(o=>o[1]>0)){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(P));a.download='b.tar';document.body.appendChild(a);a.click();O.push(['TAR',P.reduce((s,x)=>s+x.length,0)])}window.__done=true;"""
allL, actions = [], []
for dom in doms:
    L = [[r['id'], r['correct_url']] for r in m if r['verdict'].startswith('Found') and r.get('copyright') == 'public'
         and urllib.parse.urlparse(r.get('correct_url') or '').netloc == dom and r['id'] not in done
         and urllib.parse.urlparse(r['correct_url']).path not in ('', '/')]
    allL += L; U = {}
    for i, u in L: U.setdefault(u, []).append(i)
    uniq = [[v[0], u] for u, v in U.items()]
    if not uniq: continue
    actions.append({'name': 'navigate', 'input': {'url': uniq[0][1]}})
    actions.append({'name': 'javascript_tool', 'input': {'action': 'javascript_exec', 'text': 'window.__out=[];window.__done=false;(async()=>{const L='+json.dumps(uniq,separators=(",",":"))+';'+TAR+'})();1'}})
    actions.append({'name': 'javascript_tool', 'input': {'action': 'javascript_exec', 'text': 'for(let i=0;i<32&&!window.__done;i++)await new Promise(r=>setTimeout(r,1e3));if(window.__done)await new Promise(r=>setTimeout(r,5e3));({d:window.__done,o:window.__out})'}})
json.dump(allL, open(f'dl_{tag}.json', 'w'))
print(json.dumps(actions,separators=(',',':')))
