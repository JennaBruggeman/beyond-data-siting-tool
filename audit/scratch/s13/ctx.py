import json,re,sys
pat=sys.argv[1]; w=int(sys.argv[2]) if len(sys.argv)>2 else 200
def walk(o,path):
    if isinstance(o,dict):
        for k,v in o.items(): yield from walk(v,path+'/'+str(k))
    elif isinstance(o,list):
        for i,v in enumerate(o): yield from walk(v,path+'/'+str(i))
    elif isinstance(o,str):
        for m in re.finditer(pat,o):
            yield path, o[max(0,m.start()-w):m.end()+w]
for f in ['tool/opps.json','formula_register.json']:
    d=json.load(open(f))
    for p,s in walk(d,''):
        print(f+p,'::',s.replace('\n',' '));print()
