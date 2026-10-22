import json,re,sys
pat=re.compile(sys.argv[1])
def walk(o,path):
    if isinstance(o,dict):
        for k,v in o.items(): yield from walk(v,path+'/'+str(k))
    elif isinstance(o,list):
        for i,v in enumerate(o): yield from walk(v,path+'['+str(i)+']')
    elif isinstance(o,str):
        if pat.search(o): yield path,o
for f in ['register/formula_register.json','tool/opps.json']:
    for p,s in walk(json.load(open(f)),''):
        print('##',f,p); print(s[:1500]); print()
