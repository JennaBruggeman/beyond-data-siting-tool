# What stands on the top sites now: per parcel in each top cell, the tax / assessment record (year built, building value or floor area),
# and in Vancouver the 2009 building footprints in the cell. Writes site_character.csv. City records only; no BC Assessment data.
import csv, json, math, os
from build_site_maps import CITY, proj, van_status, edm_status, D, C
from shapely.geometry import shape
H=os.path.dirname(os.path.abspath(__file__))
want={}
for f,key in [('top_sites.csv','aspect'),('weighting_top5.csv','scheme'),('realistic_top5.csv','layer')]:
    for r in csv.DictReader(open(os.path.join(H,f))):
        if r[key] in ('overlap','overlap_zoned','stability','stability_zoned','ov_equal','ov_equal_zoned'): want.setdefault(r['cell'],set()).add(('realistic ' if f.startswith('realistic') else '')+f"{r[key]} #{r['rank']}")
rows=[]
CENT={}
for r in list(csv.DictReader(open(os.path.join(H,'top_sites.csv'))))+list(csv.DictReader(open(os.path.join(H,'weighting_top5.csv'))))+list(csv.DictReader(open(os.path.join(H,'realistic_top5.csv')))):
    if r['cell'] in want: CENT.setdefault(r['city'],[]).append((float(r['lon']),float(r['lat'])))
for city in CITY:
    f,_=proj(CITY[city]); cell=lambda x,y:'%s_%d_%d'%(city,math.floor(x/C),math.floor(y/C))
    mine={k for k in want if k.startswith(city)}
    if city=='van':
        fp={k:[0.0,0.0,0] for k in mine}; FPS=[]
        for ft in json.load(open(os.path.join(D,'vancouver_footprints_2009.geojson')))['features']:
            g=shape(ft['geometry']); c=g.centroid; k=cell(*f(c.x,c.y))
            if k in fp: p=ft['properties']; fp[k][0]+=p.get('area_m2') or 0; fp[k][1]=max(fp[k][1],p.get('max_ht') or 0); fp[k][2]+=1
            if any(abs(c.x-x)<0.004 and abs(c.y-y)<0.003 for x,y in CENT.get(city,[])): FPS.append((g,ft['properties'].get('max_ht') or 0))
        seen=set()
        for ft in json.load(open(os.path.join(D,'vancouver_parcels_2026.geojson')))['features']:
            c=shape(ft['geometry']).centroid; k=cell(*f(c.x,c.y))
            if k not in mine: continue
            p=ft['properties']; key=(k,p.get('tax_coord'))
            if key in seen: continue
            seen.add(key); lv=p.get('land_value') or 0; iv=p.get('improvement_value') or 0
            pg=shape(ft['geometry']); cov=sum(pg.intersection(g).area for g,_ in FPS if g.intersects(pg))/pg.area if pg.area else 0; hmax=max([h for g,h in FPS if g.intersects(pg)] or [0])
            kind=('open: yard, parking or vacant' if cov<.15 else 'building, valued at under 10 % of the property (land-led: redevelopment)' if lv+iv and iv<.1*(lv+iv) else 'building')
            rows.append(dict(city=city,cell=k,lists='; '.join(sorted(want[k])),address=p.get('address'),zoning=p.get('zoning'),status=van_status(p.get('zoning')),lot_m2=round(p.get('area_m2') or 0),
                year_built=int(p['year_built']) if p.get('year_built') else '',land_value=lv,building_value=iv,building_share=round(iv/(lv+iv),2) if lv+iv else '',gross_floor_m2='',footprint_cover_2009=round(cov,2),max_height_m_2009=round(hmax,1),kind=kind,
                cell_max_height_m_2009=round(fp[k][1],1),cell_buildings_2009=fp[k][2]))
    else:
        fp={k:[0.0,0.0,0] for k in mine}
        for ft in json.load(open(os.path.join(D,'edmonton_rooflines_est.geojson')))['features']:
            co=ft['geometry']['coordinates'][0][0][0]; x,y=f(*co); k=cell(x,y)
            if k in fp: p=ft['properties']; fp[k][0]+=p.get('footprint_m2') or 0; fp[k][1]=max(fp[k][1],p.get('height_est_m') or 0); fp[k][2]+=1
        for r in csv.DictReader(open(os.path.join(D,'edmonton_properties_2026.csv'))):
            try: k=cell(*f(float(r['lon']),float(r['lat'])))
            except ValueError: continue
            if k not in mine: continue
            lot=float((r['lot_size_m2'] or '0').replace(',','') or 0); g=float((r['gross_area_m2'] or '0').replace(',','') or 0)
            kind='no building recorded (gross floor area 0)' if g==0 else 'building'
            rows.append(dict(city=city,cell=k,lists='; '.join(sorted(want[k])),address=(r['house_number']+' '+r['street']).strip(),zoning=r['zoning'],status=edm_status(r['zoning'],lot),lot_m2=round(lot),
                year_built=r['year_built'],land_value='',building_value='',building_share='',gross_floor_m2=round(g),kind=kind,cell_footprint_m2_2019=round(fp[k][0]),cell_cover_2019=round(fp[k][0]/10000,2),cell_max_height_est_m_2019=round(fp[k][1],1),cell_buildings_2019=fp[k][2],
                assessed_value=r['assessed_value'],tax_class=r['tax_class']))
keys=list(dict.fromkeys(k for r in rows for k in r))
w=csv.DictWriter(open(os.path.join(H,'site_character.csv'),'w',newline=''),keys); w.writeheader(); w.writerows(rows); print(len(rows))
