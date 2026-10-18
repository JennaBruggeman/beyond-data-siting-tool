import json,re,sys,glob
num=r'(-?\d[\d,]*(?:\.\d+)?)'
for f in sorted(glob.glob(sys.argv[1]+'/*.json')):
  d=json.load(open(f)); print('=====',f.split('/')[-1],d['facts'].get('addr',[''])[0] if isinstance(d['facts'],dict) else '', 'errs',d['errs'])
  for s in d['steps']:
    t=s['text']
    for ln in t.split('\n'):
      bad=[]
      if re.search(r'NaN|undefined|Infinity|null|\[object|\$\{',ln): bad.append('token')
      for m in re.finditer(num+r'\s*[–-]\s*'+num,ln):
        try:
          a=float(m.group(1).replace(',',''));b=float(m.group(2).replace(',',''))
          if a>b and not re.search(r'\d{4}\s*[–-]\s*\d{2}\b',m.group(0)): bad.append('lo>hi '+m.group(0))
        except: pass
      if re.search(r'(?<![\w–-])-\d',ln) and not re.search(r'−|SW|NW',ln): bad.append('neg?')
      if re.search(r'(?<![\d.,])0(?:\.0+)? (MW|kW|m²|GJ|MWh|t\b|%)',ln): bad.append('zero')
      if bad: print(' ',s['k'],'|',bad,'|',ln[:260])
