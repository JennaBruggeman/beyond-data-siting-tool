#!/usr/bin/env python3
"""Tier templates (J.B. and Xun, 19 Oct 2026) → templates.json and tool/templates.json.
Every diagram node gets: the parties it affects, and the lowest tier that SHOWS it (resident < community < full).
All nodes still RUN in every tier (facts are never switched off); a tier changes what is asked and shown.
Judged by Claude from each node's meaning (no user testing yet) — a draft for J.B. to check; a sensitivity test comes later.
Parties: diagram_data.json 'parties'."""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
D = json.load(open(os.path.join(H, 'diagram_data.json')))
# (tier, parties, reason). tier = lowest tier that shows the node.
R = 'resident'; C = 'community'; F = 'full'
T = {
 # inputs
 'parcel': (R, 'host city neighbours', 'where: the one thing a resident always gives'),
 'start_case': (R, 'host operator', 'new, shared, retrofit or leased: assumed for residents, shown and changeable'),
 'receivers': (C, 'receiver', 'who could take the heat'), 'receiver_temp': (F, 'receiver', 'engineering input'),
 'receptors': (C, 'neighbours', 'who is close enough to hear it'), 'zone': (R, 'city neighbours', 'what the land is zoned for'),
 'cooling_type': (C, 'operator neighbours', 'drives heat, water and sound; assumed for residents'),
 'weather': (F, '', 'data the tool reads'), 'plant_schedule': (F, 'operator', 'engineering input'), 'lighting_plan': (F, 'operator', 'engineering input'),
 'massing': (R, 'neighbours', 'how big it looks (moved to residents, 19 Oct)'), 'spare_cooling': (F, 'operator', 'engineering input'), 'area': (F, '', 'data the tool reads'),
 'plot_ratio': (F, 'city', 'zoning detail'), 'host_building': (C, 'host', 'the building it would sit in'), 'flood_area': (F, 'operator', 'site risk to the facility'),
 'sewer_flow': (F, 'utility', 'engineering input'),
 # size
 'floor_area': (C, 'host city', 'how big'), 'server_floor': (F, 'operator', 'engineering'), 'it_load_outside': (F, 'operator', 'engineering'),
 'it_load_claim': (F, 'operator', 'engineering'), 'it_load_actual': (C, 'operator utility ratepayers', 'how much power it draws'), 'servers': (F, 'operator', 'engineering'),
 'envelope': (C, 'city neighbours', 'what the zone lets it be'), 'component_space': (F, 'operator', 'engineering'), 'hall_area': (F, 'operator', 'engineering'),
 'size_fit': (R, 'host city neighbours', 'how big a data centre fits here'),
 # characterise
 'heat_rejected': (C, 'receiver climate', 'the heat it gives off'), 'heat_temp': (F, 'receiver', 'engineering'), 'liquid_capture': (F, 'operator', 'engineering'),
 'cop': (F, 'receiver', 'engineering'), 'heat_captured': (F, 'operator', 'engineering'), 'heat_delivered': (C, 'receiver', 'heat that could be offered'),
 'hp_electricity': (F, 'receiver', 'engineering'), 'erf': (F, 'operator', 'industry metric'), 'heat_in_water': (F, '', 'engineering'),
 'free_cooling_hours': (F, 'operator', 'engineering'), 'pue': (F, 'operator', 'industry metric'), 'spare_capacity': (C, 'utility ratepayers', 'power it could lend the grid'),
 'backup_hours': (F, 'operator', 'engineering'), 'flexible_load': (C, 'utility ratepayers', 'power it could shift off the peak'), 'load_factor': (F, 'operator', 'engineering'),
 'evaporation': (R, 'utility public neighbours', 'drinking water it would use'), 'blowdown': (F, 'utility', 'engineering'), 'wue': (F, 'operator', 'industry metric'),
 'water_behind_electricity': (C, 'climate', 'water used to make its power'), 'rainwater': (C, 'utility', 'rain it could collect'),
 'grid_co2': (R, 'climate public', 'carbon from its electricity'), 'generator_co2': (C, 'climate', 'carbon from backup generators'),
 'generator_nox_pm': (R, 'neighbours', 'air near the site'), 'refrigerant_co2e': (F, 'climate', 'small, technical'), 'embodied_it': (C, 'climate', 'carbon in the servers'),
 'embodied_building': (C, 'climate', 'carbon in the building'), 'noise_level': (R, 'neighbours', 'what neighbours would hear'), 'lf_flag': (R, 'neighbours', 'low hum'),
 'light_at_window': (R, 'neighbours', 'light at night'), 'shadow': (R, 'neighbours', 'shade on neighbours'), 'visibility': (R, 'neighbours public', 'what is seen from the street'),
 'watched_area': (R, 'neighbours public', 'cameras and fences'), 'jobs': (R, 'workers public', 'work created'), 'ground': (F, 'operator', 'engineering'),
 'treatment_energy': (F, 'operator', 'engineering'), 'blowdown_recovery': (F, 'operator', 'engineering'), 'pv_roof': (C, 'climate', 'its own solar'), 'pv_facade': (C, 'climate neighbours', 'solar on the facade'),
 'genset_test': (R, 'neighbours', 'generator tests: noise and exhaust'), 'hvo_swap': (C, 'climate', 'cleaner generator fuel'), 'fuel_on_site': (R, 'neighbours city', 'fuel kept on site: amount and type only, never location'),
 'vibration_rank': (R, 'neighbours', 'vibration'), 'workload_control': (C, 'operator public', 'who controls the computing'),
 # place
 'sewer_sink': (F, 'utility', 'engineering'), 'surface_water_sink': (F, 'utility nations', 'engineering'), 'rooftop_solar': (C, 'neighbours', 'solar on roofs nearby'),
 'self_gen_rules': (F, 'utility', 'rules detail'), 'electricity_price': (F, 'operator', "operator's cost"), 'water_supply': (C, 'utility public', 'water the city can supply'),
 'existing_building': (C, 'host city', 'reusing a building'), 'ambient_cover': (F, 'neighbours', 'engineering'), 'interconnection': (F, 'operator', "operator's choice"),
 'reclaimed_makeup': (C, 'utility', 'reusing treated water'), 'greywater_neighbours': (C, 'neighbours utility', "neighbours' greywater"), 'borefield': (F, 'operator', 'engineering'),
 'ates': (F, 'operator utility', 'engineering'), 'deep_geo': (F, 'operator', 'engineering'), 'flood_exposure': (C, 'city', 'flood risk'), 'service_class': (F, 'utility', 'engineering'),
 # prospect
 'offerable_area': (C, 'host public', 'space it could share'), 'receiver_radius': (F, 'receiver', 'method'), 'heat_density': (F, 'receiver', 'method'),
 'linear_heat_density': (F, 'receiver', 'method'), 'distribution_cost': (F, 'receiver utility', 'pipe cost detail'), 'receiver_demand': (C, 'receiver', 'how much heat the receiver needs'),
 'deprivation': (C, 'neighbours public', 'who lives in the affected area'), 'people_affected': (R, 'neighbours', 'people within reach'),
 'receivers_nearby': (R, 'receiver neighbours', 'buildings nearby that could use the heat'), 'competing_sources': (C, 'receiver utility', 'other heat sources'),
 # opportunity
 'refuge_people': (R, 'public neighbours', 'people a refuge could hold'), 'clean_air_volume': (R, 'public neighbours', 'clean-air room'), 'cooling_centre_people': (R, 'public neighbours', 'cooling room'),
 'homes_heated': (R, 'receiver neighbours ratepayers', 'homes its heat could warm'), 'greenhouse_area': (C, 'receiver public', 'greenhouse'), 'aquaculture_tonnes': (C, 'receiver', 'fish'),
 'algae_kg': (C, 'receiver', 'algae'), 'insect_check': (F, 'receiver', 'check only'), 'distributed_servers_homes': (C, 'neighbours', 'servers as heaters in homes'),
 'ev_stalls': (R, 'neighbours public', 'EV charging nearby'), 'ev_area': (C, 'city', 'space for charging'), 'stored_heat': (C, 'receiver', 'heat stored for winter'),
 'storage_footprint': (F, 'operator', 'engineering'), 'sewage_heat': (C, 'utility', 'a rival heat source'), 'copper_tonnes': (C, 'future', 'materials to recover'),
 'ewaste': (C, 'future public', 'electronic waste'), 'rare_earth': (C, 'future nations', 'rare earths'), 'battery': (C, 'utility ratepayers', 'batteries for the grid'),
 'ups_flex': (C, 'utility ratepayers', 'backup batteries lent to the grid'), 'btes': (C, 'receiver neighbours', 'ground heat store for neighbours'), 'tes_volume': (F, 'receiver', 'engineering'),
 'absorption': (C, 'neighbours receiver', 'cooling for neighbours'),
 # test
 'demand_profile': (F, 'receiver', 'method'), 'price_floor': (C, 'operator receiver', 'lowest price the operator could take'), 'price_ceiling': (C, 'receiver ratepayers', 'most a buyer would pay'),
 'window': (C, 'operator receiver', 'whether a price both accept exists'), 'crf': (F, 'operator', 'finance method'), 'lcoh': (C, 'receiver ratepayers', 'cost of the heat'),
 'payback': (F, 'operator', "investor's return"), 'risk_term': (C, 'receiver operator', 'what if the data centre leaves'), 'capex_split': (C, 'operator receiver utility city', 'who pays which part'),
 'affordability': (R, 'neighbours ratepayers', 'what heat would cost a household'), 'build_cost': (F, 'operator', "operator's cost"), 'horizons': (C, 'future', 'how long each part lasts'),
 'lead_time': (C, 'utility', 'time to connect'), 'grid_headroom': (C, 'utility ratepayers', 'room on the grid'), 'crossing_type': (F, 'utility', 'engineering'),
 'standoff': (R, 'neighbours public', 'fence and setback at the street'), 'noise_limit': (R, 'neighbours city', 'the noise rule that protects neighbours'),
 'licence_flag': (C, 'utility nations', 'water licence'), 'ev_exemption': (F, 'utility', 'rules detail'), 'row_cost': (C, 'city public', 'cost of using the street'),
 'reserved_cost': (C, 'ratepayers utility', 'cost of unused grid capacity'), 'lrmc_bc': (C, 'ratepayers', 'cost of new power to BC'), 'zoning_status': (R, 'city neighbours', 'is it allowed here'),
 'rezoning_price': (C, 'city public', 'what a rezoning takes'), 'consultation': (R, 'neighbours nations public', 'how people get a say'), 'construction_time': (R, 'neighbours', 'how long building takes'),
 'pv_share': (F, 'operator', 'engineering'), 'pv_cost': (F, 'operator', "operator's cost"), 'peak_relief': (C, 'utility ratepayers', 'easing the grid at peak'),
 'ground_warming': (F, 'operator', 'engineering'), 'floor_load_need': (F, 'host', 'engineering'), 'displaced_source': (C, 'receiver climate', 'what the receiver uses now'),
 'hourly_overlap': (F, 'receiver', 'method'),
 # decide
 'cfd_score': (F, '', 'counter-example for professionals'), 'ledger': (C, 'operator host receiver utility city neighbours public', 'who gains and loses'),
 'tradeoffs': (R, 'neighbours public', 'the trade-offs, in each tier\'s words'), 'commitment': (C, 'receiver operator', 'how firm the exchange is'), 'futures': (C, 'future public', 'what it could become'),
 # added 19 Oct 2026 (research deep dives)
 'property_tax': (C, 'city public', 'tax it pays the city'), 'tax_split': (R, 'public city', 'where its tax goes'), 'untaxed_equipment': (F, 'city', 'tax detail'),
 'computing_served': (C, 'public', 'who the computing serves'), 'afterlife': (C, 'future public', 'what happens when it closes'),
 'heat_flux_site': (C, 'neighbours climate', 'heat given off per m²'), 'heat_plume_dT': (R, 'neighbours', 'warmer air near the cooling units'),
 'recirculation_flag': (F, 'operator', 'engineering'), 'uhi_context': (R, 'neighbours', 'urban heat in the area'),
 'genset_emission_rate': (F, 'neighbours', 'engineering'), 'air_screen_1h': (F, 'neighbours', 'method'), 'no2_at_receptor': (F, 'neighbours', 'method'),
 'air_vs_objective': (R, 'neighbours public', 'air at neighbours against the limits'), 'air_permit_trigger': (C, 'city neighbours', 'whether an air permit is needed'),
 'free_cooling_hours_2050s': (F, 'operator', 'engineering'), 'homes_heated_2050s': (R, 'receiver neighbours', 'homes its heat could warm in the 2050s'),
 'water_restriction_rule': (R, 'utility public', 'what a drought would ask of it'), 'restriction_history': (C, 'utility public', 'recent water restrictions'),
 'importance_cat': (F, 'city', 'engineering'), 'seismic_sa02': (F, 'city', 'engineering'), 'refuge_after_quake': (R, 'public neighbours', 'whether it could shelter people after an earthquake'),
 'battery_code_path': (C, 'city neighbours', 'battery safety rules'), 'nations_named': (R, 'nations', 'whose lands these are'), 'city_commitments': (C, 'nations city', 'City commitments to the Nations'),
 'vibration_target': (C, 'neighbours', 'vibration limit (reference)'), 'embodied_rule': (C, 'climate city', 'embodied carbon rule'),
 'heat_value_split': (C, 'operator utility receiver', 'who keeps the value of the heat'), 'power_bill_effect': (R, 'ratepayers neighbours', 'effect on household power bills'),
 'ev_repay': (C, 'neighbours operator', 'how much an EV port must sell to repay itself'), 'pv_lcoe': (C, 'operator', 'what rooftop solar costs per MWh'),
 # added 19 Oct 2026 (ten avenues; tiers proposed by Claude, the ones marked ? to confirm with J.B.)
 'clean_power_price': (C, 'utility ratepayers climate', 'what new clean power costs and who can buy it'), 'chp_heat': (C, 'operator neighbours climate', 'heat from its own gas plant (?)'),
 'condensate': (F, 'operator', 'engineering'), 'stormwater_volume': (C, 'city neighbours', 'rain held back from the sewers'),
 'snowmelt_area': (R, 'neighbours public', 'sidewalks kept clear by its heat'), 'backup_neighbours': (R, 'neighbours public', 'power for neighbours in a blackout (?)'),
 'grid_refund': (C, 'utility ratepayers neighbours', 'first payer refunded when neighbours connect'), 'community_solar': (R, 'neighbours', "bill credits from solar on neighbours' roofs (?)"),
 'fire_water': (R, 'neighbours public city', 'firefighting water after an earthquake'),
}
ids = [n['id'] for n in D['nodes']]
missing = [i for i in ids if i not in T]; extra = [i for i in T if i not in ids]
assert not missing and not extra, (missing, extra)
parties = {p['id'] for p in D['parties']}
for k, (t, p, r) in T.items():
    for q in p.split():
        assert q in parties, (k, q)
rank = {R: 0, C: 1, F: 2}
out = {'date': '2026-10-19', 'status': 'draft: judged by Claude from each node\'s meaning; no user testing yet; sensitivity test to follow',
       'tiers': [{'id': 'resident', 'name': 'What it means for me', 'who': 'residents and other laypeople', 'asks': 'where, and maybe how big; other answers assumed, shown and changeable'},
                 {'id': 'community', 'name': 'What it means for the neighbourhood', 'who': 'councillors, community groups, receivers, policy planners', 'asks': 'every setup question'},
                 {'id': 'full', 'name': 'How it is worked out', 'who': 'engineers, architects, bylaw professionals', 'asks': 'every setup question'}],
       'rule': 'every node runs in every tier; a tier sets what is asked and shown; facts are never switched off',
       'nodes': {k: {'tier': t, 'parties': p.split(), 'why': r} for k, (t, p, r) in T.items()}}
# graph for the tool's diagram thumbnail: stage columns and wires, from the same diagram data
_D = json.load(open(os.path.join(H, 'diagram_data.json')))
out['graph'] = {'stages': [[s['id'], s['name']] for s in _D['stages']],
                'nodes': [[n['id'], n['stage']] for n in _D['nodes']],
                'edges': [[e['from'], e['to']] for e in _D['edges']]}
for tid in ('resident', 'community', 'full'):
    out[tid + '_count'] = sum(1 for v in T.values() if rank[v[0]] <= rank[tid])
for path in (os.path.join(H, 'templates.json'), os.path.join(H, 'tool', 'templates.json')):
    json.dump(out, open(path, 'w'), ensure_ascii=False, indent=1)
print({k: out[k + '_count'] for k in ('resident', 'community', 'full')})
