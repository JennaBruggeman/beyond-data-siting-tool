import sys, os; here=os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, here)
import diagrams as d
from families import FAM
css='body{background:#17181a;margin:0;padding:16px;font-family:Open Sans,system-ui,sans-serif;color:#e9e6e1}.f{width:640px;margin:0 0 24px;background:#1e2023;padding:12px;border-radius:8px}.ckey{columns:2;font-size:12px;color:#e9e6e1}'
out=[]
for f,fn in d.DIAGRAMS.items():
    F,k,cap=fn(None); s=F.svg(cap); miss=set(FAM[f][1])-{q for _,q in F.calls}
    out.append(f'<div class="f" id="{f}"><b>{f}</b> {k} {"MISSING "+str(miss) if miss else ""}{s}{F.key(None)}</div>')
open(os.path.join(here,'all_diagrams_check.html'),'w').write(f'<style>{css}</style>'+''.join(out))
