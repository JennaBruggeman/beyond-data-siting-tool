# Draws a layout export (checks/layouts/<lot>.json) as one SVG plan per storey in an HTML page, for checking by eye (7 Nov 2026).
# Usage: python -I -X utf8 draw_layout.py <layout.json> <out.html>. Rooms grey (data centre) or tan (programs), stairs blue, lifts green, doors blue, exits red.
import json,sys
d=json.load(open(sys.argv[1],encoding='utf-8')); P=d['plan']; out=sys.argv[2]
lot=d['lot']['outline']; us=[p[0] for p in lot]; vs=[p[1] for p in lot]
U0,U1,V0,V1=min(us)-2,max(us)+2,min(vs)-2,max(vs)+2; S=7
X=lambda u:(u-U0)*S; Y=lambda v:(V1-v)*S
col={'data centre':'#d7d7d4'}
html=['<html><body style="font:11px sans-serif;background:#fff">']
for St in P['storeys']:
    w=(U1-U0)*S; h=(V1-V0)*S
    g=[f'<h3>storey at {St["z"]} m</h3><svg width="{w:.0f}" height="{h:.0f}" style="border:1px solid #ccc">']
    g.append('<polygon points="'+' '.join(f'{X(p[0]):.1f},{Y(p[1]):.1f}' for p in lot)+'" fill="none" stroke="#999" stroke-dasharray="4 3"/>')
    def rect(r,fill,stroke='#555',sw=0.8,label=None):
        g.append(f'<rect x="{X(r[0]):.1f}" y="{Y(r[3]):.1f}" width="{(r[1]-r[0])*S:.1f}" height="{(r[3]-r[2])*S:.1f}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>')
        if label: g.append(f'<text x="{X((r[0]+r[1])/2):.1f}" y="{Y((r[2]+r[3])/2):.1f}" text-anchor="middle" font-size="9">{label}</text>')
    if d.get('plantYard'): rect(d['plantYard'],'#f3efe6','#c9b')
    if St['z']==0 and d.get('sideDrive'): rect(d['sideDrive']['rect'],'#eef','#99c')
    for r in St['rooms']:
        if r.get('rect'): rect(r['rect'],'#e2e2df' if r['block']=='data centre' else '#f0dccc',label=r['id'] if r['m2']>20 else None)
    for c in St['corridors']: rect(c['rect'],'#fff','#333',label='corr')
    for c in St['stairs']: rect(c['rect'],'#cfd8e8','#333',label='stair')
    for c in St['lifts']: rect(c['rect'],'#d8e8cf','#333',label='lift')
    for x in St['doors']+St['exits']:
        u,v,wd=x['u'],x['v'],x['w']; col2='#c00' if x in St['exits'] else '#06c'
        if x['along']=='v': g.append(f'<line x1="{X(u):.1f}" y1="{Y(v-wd/2):.1f}" x2="{X(u):.1f}" y2="{Y(v+wd/2):.1f}" stroke="{col2}" stroke-width="4"/>')
        else: g.append(f'<line x1="{X(u-wd/2):.1f}" y1="{Y(v):.1f}" x2="{X(u+wd/2):.1f}" y2="{Y(v):.1f}" stroke="{col2}" stroke-width="4"/>')
    g.append('</svg>'); html+=g
html.append('</body></html>'); open(out,'w',encoding='utf-8').write('\n'.join(html)); print('ok')
