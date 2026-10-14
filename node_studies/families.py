# Node families for icons and inspector schematics. Assignment is Claude's proposal for J.B. to check.
FAM = {
 'heat_out': ('Heat out of the data centre', ['heat_rejected','heat_temp','liquid_capture','cop','heat_captured','heat_delivered','hp_electricity','erf','heat_in_water','free_cooling_hours']),
 'heat_use': ('What the heat becomes', ['receivers','receiver_temp','receiver_radius','heat_density','linear_heat_density','receiver_demand','homes_heated','greenhouse_area','aquaculture_tonnes','algae_kg','insect_check','distributed_servers_homes','stored_heat','demand_profile']),
 'sink':     ('Cooling the place offers', ['sewer_flow','sewer_sink','sewage_heat','surface_water_sink']),
 'power':  ('Power', ['it_load_outside','it_load_claim','it_load_actual','pue','spare_capacity','backup_hours','flexible_load','load_factor','grid_headroom','lead_time','electricity_price','self_gen_rules','rooftop_solar','ev_stalls','ev_area','reserved_cost','lrmc_bc','interconnection']),
 'water':  ('Water', ['evaporation','blowdown','wue','water_behind_electricity','rainwater','water_supply','licence_flag','surface_water_sink']),
 'sound':  ('Sound', ['receptors','noise_level','lf_flag','noise_limit','ambient_cover']),
 'seen':   ('Light, shadow and sight', ['lighting_plan','light_at_window','shadow','visibility','watched_area']),
 'carbon': ('Carbon and air', ['grid_co2','generator_co2','generator_nox_pm','refrigerant_co2e','embodied_it','embodied_building']),
 'materials':('Materials', ['copper_tonnes','ewaste','rare_earth']),
 'space':  ('Space', ['parcel','massing','area','plot_ratio','floor_area','server_floor','offerable_area','existing_building','storage_footprint','clean_air_volume']),
 'it':     ('The machines', ['servers','cooling_type','plant_schedule','spare_cooling']),
 'money':  ('Money', ['distribution_cost','price_floor','price_ceiling','window','crf','lcoh','payback','capex_split','affordability','build_cost','row_cost','cfd_score']),
 'rules':  ('Rules and process', ['zoning_status','rezoning_price','consultation','crossing_type','standoff','ev_exemption']),
 'people': ('People', ['people_affected','deprivation','jobs','refuge_people','cooling_centre_people']),
 'time':   ('Time', ['horizons','construction_time','risk_term']),
 'ground': ('Ground and climate', ['ground','weather']),
 'account':('Account', ['ledger','tradeoffs']),
}
ICON = {  # 24×24, stroked, no fill
 'heat_out':'M7 20c-2.5-3 2.5-5 0-8s2.5-5 0-8M12 20c-2.5-3 2.5-5 0-8s2.5-5 0-8M17 20c-2.5-3 2.5-5 0-8s2.5-5 0-8',
 'heat_use':'M4 11.5 12 5l8 6.5V20H4zM10 20v-5h4v5M9.5 9.8c-.9-1 .9-1.6 0-2.6M14.5 9.8c-.9-1 .9-1.6 0-2.6',
 'sink':'M3 14.5c3-2 6 2 9 0s6-2 9 0M3 19c3-2 6 2 9 0s6-2 9 0M12 3v7.5M9 7.5l3 3 3-3',
 'power':'M13 2.5 5.5 13.5h6l-1 8 8-11.5h-6z',
 'water':'M12 3c4.2 5 6.5 8.2 6.5 11.3a6.5 6.5 0 0 1-13 0C5.5 11.2 7.8 8 12 3z',
 'sound':'M3.5 9.5h4l5-4.5v14l-5-4.5h-4zM16 9.5a3.5 3.5 0 0 1 0 5M18.8 6.8a7.5 7.5 0 0 1 0 10.4',
 'seen':'M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
 'carbon':'M7 18.5h10.5a4 4 0 0 0 .3-8 6 6 0 0 0-11.6 1.3A3.4 3.4 0 0 0 7 18.5z',
 'materials':'M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9',
 'space':'M4 4h16v16H4zM4 13h9v7M13 4v9',
 'it':'M5 3.5h14v5.5H5zM5 9h14v5.5H5zM5 14.5h14V20H5zM8 6.2h1.5M8 11.7h1.5M8 17.2h1.5',
 'money':'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15 9.2c-.8-1.4-6-1.6-6 .8 0 2.6 6 1.4 6 4 0 2.4-5.2 2.2-6 .8M12 6.5v11',
 'rules':'M6 3h9l4 4v14H6zM15 3v4h4M9 11.5h7M9 15.5h5',
 'people':'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.2 2.7-5 6-5s6 1.8 6 5M16.5 11a2.5 2.5 0 1 0 0-5M16.5 15c2.8 0 4.5 1.8 4.5 5',
 'time':'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5.2l3.4 2',
 'ground':'M3 8c3-2 6 2 9 0s6-2 9 0M3 13h18M3 18h18M12 3v18',
 'account':'M3.5 5h17v14h-17zM3.5 9.7h17M3.5 14.3h17M9.5 5v14',
}
def family_of(nid):
    for k,(_,ids) in FAM.items():
        if nid in ids: return k
    return None

# Outline colour by family group (proposal). The accent red stays reserved for selection and the user's values.
GROUP = {
 'heat':   ('Heat',            '#d1a35e', ['heat_out','heat_use','sink']),
 'power':  ('Power',           '#a7b4d6', ['power']),
 'water':  ('Water',           '#7fb2c4', ['water']),
 'senses': ('Sound and sight', '#b9a3cf', ['sound','seen']),
 'matter': ('Matter and carbon','#9fb38a', ['carbon','materials','it','ground']),
 'city':   ('City and process','#c8c2b8', ['space','money','rules','people','time','account']),
}
def group_of(fam):
    for g,(_,_,fs) in GROUP.items():
        if fam in fs: return g
