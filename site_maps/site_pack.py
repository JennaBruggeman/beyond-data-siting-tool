# Site pack for the two chosen sites (J.B., 22 Oct 2026): 275 1st Ave E (Vancouver) and 8803 Stadium Rd NW (Edmonton).
# Everything around each site that the exchanges use, from the tool's own data, with distances. Nothing new is estimated:
# heat demand uses the same rule as the site maps (build_site_maps.demand). Writes chosen/<site>_*.csv and chosen/<site>_pack.json.
import json, csv, math, os
from build_site_maps import demand, REACH, REACH_DEF, CITY, C, proj
H = os.path.dirname(os.path.abspath(__file__)); T = os.path.join(H, '..', 'tool'); D = os.path.join(H, '..', 'data'); OUT = os.path.join(H, 'chosen')
os.makedirs(OUT, exist_ok=True)
SITES = [('V09', 'van', '275 1st Ave E, Vancouver', 49.268811, -123.09697), ('E05', 'edm', '8803 Stadium Rd NW, Edmonton', 53.555110, -113.477327)]
def dist(lat1, lon1, lat2, lon2):
    k = math.pi / 180; x = (lon2 - lon1) * k * math.cos((lat1 + lat2) / 2 * k); y = (lat2 - lat1) * k
    return 6371000 * math.hypot(x, y)
def write(name, rows):
    if not rows: return
    with open(os.path.join(OUT, name), 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, list(rows[0])); w.writeheader(); w.writerows(rows)
for sid, city, addr, lat, lon in SITES:
    pack = {'site': sid, 'address': addr, 'lat': lat, 'lon': lon}
    # the site's cell in the site maps (scores 0-1, compared within the city only)
    fx, _ = proj(CITY[city]); x, y = fx(lon, lat); cid = '%s_%d_%d' % (city, math.floor(x / C), math.floor(y / C))
    for fn in (f'{city}_grid.geojson', f'{city}_weighting.geojson'):
        for ft in json.load(open(os.path.join(H, fn)))['features']:
            if ft['properties']['id'] == cid: pack.setdefault('cell', {}).update(ft['properties'])
    # heat: every receiver whose reach covers the site, with its demand (MWh/yr of heat, site-map rule) and how much counts at this distance
    rec = []
    for p in json.load(open(os.path.join(T, f'receivers_{city}.json'))):
        d = dist(lat, lon, p['lat'], p['lon']); reach = REACH.get(p['t'], REACH_DEF)
        if d <= max(reach, 1500):
            dm = demand(city, p)
            rec.append(dict(type=p['t'], name=p.get('n', ''), distance_m=round(d), reach_m=reach, in_reach='yes' if d <= reach else 'no',
                            heat_demand_MWh_yr=round(dm) if dm else '', counted_at_this_distance_MWh_yr=round(dm * max(0, 1 - d / reach)) if dm else '',
                            homes=p.get('u', ''), floor_area_m2=p.get('fa', ''), measured='yes' if p.get('meas') == 1 else ('no' if 'meas' in p else ''),
                            district_energy_note=p.get('de', ''), source=p.get('src', ''), lat=p['lat'], lon=p['lon']))
    rec.sort(key=lambda r: r['distance_m']); write(f'{sid}_heat_receivers.csv', rec)
    pack['heat'] = {'receivers_within_1500m': len(rec), 'in_reach': sum(r['in_reach'] == 'yes' for r in rec),
                    'demand_counted_MWh_yr': sum(r['counted_at_this_distance_MWh_yr'] or 0 for r in rec)}
    # energy: substations within 3 km (tool data: x, y in the tool's metre frame, capacity field as given), public EV chargers within 1 km
    ss = json.load(open(os.path.join(T, 'substations.json')))
    pack['substations_source'] = ss.get('source')
    sub = []
    for s in ss['cities'][city]:
        d = math.hypot(s[0] - x, s[1] - y)
        if d <= 3000: sub.append(dict(distance_m=round(d), x_m=s[0], y_m=s[1], third_value_as_stored=s[2], source_map_year=s[3] if len(s) > 3 else '', note='CanVec transformer station; third value unlabelled in the tool data (possibly mapped area; unverified)'))
    pack['named_substations_within_5km'] = [dict(n, distance_m=round(math.hypot(n['x'] - x, n['y'] - y))) for n in ss.get('named', {}).get(city, []) if math.hypot(n['x'] - x, n['y'] - y) <= 5000]
    sub.sort(key=lambda r: r['distance_m']); write(f'{sid}_substations.csv', sub)
    ev = json.load(open(os.path.join(T, f'ev_{city}.json')))
    evr = [dict(distance_m=round(dist(lat, lon, p[0], p[1])), ports_level2=p[2], ports_dc_fast=p[3], lat=p[0], lon=p[1]) for p in ev['pts'] if dist(lat, lon, p[0], p[1]) <= 1500]
    evr.sort(key=lambda r: r['distance_m']); write(f'{sid}_ev_chargers.csv', evr); pack['ev_source'] = f"{ev.get('src')} ({ev.get('date')}, {ev.get('filter')})"
    # water (Vancouver): cooling towers and water-treatment systems on the City's permit list within 1 km
    if city == 'van':
        wp = json.load(open(os.path.join(T, 'water_permits_van.json')))
        wr = [dict(distance_m=round(dist(lat, lon, p[0], p[1])), kind=p[2], lat=p[0], lon=p[1]) for p in wp['pts'] if dist(lat, lon, p[0], p[1]) <= 1000]
        wr.sort(key=lambda r: r['distance_m']); write(f'{sid}_water_permits.csv', wr); pack['water_permits_note'] = 'kind codes as in tool/water_permits_van.json (vanWaterPermits)'
    # parcels within 500 m (for the site map): address, zoning, area, year built
    par = []
    if city == 'van':
        from shapely.geometry import shape
        for ft in json.load(open(os.path.join(D, 'vancouver_parcels_2026.geojson')))['features']:
            c = shape(ft['geometry']).centroid; d = dist(lat, lon, c.y, c.x)
            if d <= 500:
                p = ft['properties']; par.append(dict(distance_m=round(d), address=p.get('address'), zoning=p.get('zoning'), area_m2=p.get('area_m2'), year_built=p.get('year_built'), legal_type=p.get('legal_type'), tax_coord=p.get('tax_coord')))
    else:
        for r in csv.DictReader(open(os.path.join(D, 'edmonton_properties_2026.csv'), encoding='utf-8')):
            try: d = dist(lat, lon, float(r['lat']), float(r['lon']))
            except ValueError: continue
            if d <= 500: par.append(dict(distance_m=round(d), address=f"{r['house_number']} {r['street']}".strip(), zoning=r['zoning'], lot_m2=r['lot_size_m2'], gross_area_m2=r['gross_area_m2'], year_built=r['year_built'], neighbourhood=r['neighbourhood'], account=r['account']))
    par.sort(key=lambda r: r['distance_m']); write(f'{sid}_parcels_500m.csv', par)
    json.dump(pack, open(os.path.join(OUT, f'{sid}_pack.json'), 'w'), indent=1, ensure_ascii=False)
    print(sid, 'cell', cid, 'receivers', len(rec), 'substations', len(sub), 'ev', len(evr), 'parcels', len(par))
