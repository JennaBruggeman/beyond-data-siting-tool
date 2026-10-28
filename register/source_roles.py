# Source-to-term mapping for multi-source quantities (drafted 12 Oct 2026 from the verified
# coefficient text in formula_register.json; V=True where the coefficient text ties the source to the
# term explicitly, V=False where the placement is Claude's reading and J.B. should confirm).
# role vocabulary: coefficient · bound · proxy · check · site fact · rule · data · method · gap
# conf follows the register scale (90 regulation/tariff/standard · 80 government data · 70 peer-reviewed
# transferred · 60 derived · 50 operator/industry claim · 40 proxy · 20 judged · 0 gap · 100 arithmetic).

R = {
 'floor_area': [
  ('edmParcel','total_gross_area (Edmonton)','data',80,True),
  ('bcaExtract','Gross Building Area, storeys (Vancouver; licensed extract, requested)','data',80,True),
  ('vanFoot','area_m2 × storeys from height (Vancouver fallback)','proxy',60,True),
  ('vanEnergyReport','measured GFA for four listed buildings','check',80,True)],
 'it_load_outside': [
  ('rvo2018','density 4.38 MWh/m²·yr (≈500 W/m²)','coefficient',70,True),
  ('doeFederal','measured 355–667 W/m² (US federal)','bound',80,True),
  ('sunLuo2021','modelled 1,076–5,382 W/m² (large DCs)','bound',70,True),
  ('lbnl2024','server and utilisation context','check',80,False)],
 'it_load_claim': [
  ('opClaims','nameplate MW per site','data',50,True),
  ('rts19744','40 MW applicant figure, 111 E 5th','data',50,True),
  ('vanPermits','service upgrades as load traces (no MW stated)','site fact',80,True)],
 'it_load_actual': [
  ('lbnl2024','server utilisation 0.21→0.35; capacity utilisation 0.5','coefficient',80,True),
  ('fan2007','average ÷ peak ≈ 0.6','coefficient',70,True),
  ('vanEnergyReport','measured whole-building ceiling (3.7 MW at 555 W Hastings)','bound',80,True),
  ('dlrQ2_2025','leased share 96.4% occupancy (Toronto) — occupancy ≠ utilisation','proxy',40,True),
  ('equinix10k','cabinet utilisation 81% Americas (power-limited)','proxy',50,True)],
 'servers': [
  ('lbnl2024','600 W per 2-socket server','coefficient',80,True),
  ('lbnlBench','1.8–2.5 m² per rack','coefficient',70,True)],
 'heat_rejected': [
  ('heatPhys','heat ≈ electricity drawn','rule',100,True),
  ('lbnl2024','idle floor 36% of max','coefficient',80,True)],
 'heat_temp': [
  ('lorenz','air 25–35 °C; liquid 50–60 °C','coefficient',70,True),
  ('vanPermits','heat-rejection equipment per site','site fact',80,True),
  ('fieldJB','equipment seen on site','site fact',80,True)],
 'cop': [
  ('lorenz','COP = η × T_lm,H ÷ (T_lm,H − T_lm,L); η 0.50–0.60','method',70,True),
  ('dea','annual COP 3.1 / 3.6 / 4.7 at 1 / 3 / 10 MW','check',80,True)],
 'free_cooling_hours': [
  ('ashrae','inlet envelope 18–27 °C','rule',90,True),
  ('cwec','hourly outdoor temperature, typical year','data',80,True)],
 'backup_hours': [
  ('heatPhys','kWh ÷ load; fuel ÷ burn rate','rule',100,True),
  ('opClaims','UPS and fuel durations stated by operators','data',50,True)],
 'rainwater': [
  ('femp','V = A × R × C method (via CSA B805)','method',90,False),
  ('eccc','R: 1,160 mm Vancouver, 423 mm Edmonton','data',80,True)],
 'grid_co2': [
  ('gridBC','BC average factor (superseded by NIR series)','data',80,True),
  ('gridAB','Alberta average factor (superseded by NIR series)','data',80,True),
  ('nir2026','generation and consumption intensity, both provinces, 1990–2024','data',80,True),
  ('abEGDF','Alberta displacement schedule 0.49→0.34 t/MWh','rule',90,True)],
 'embodied_it': [
  ('dellR760','4,177 kg CO2e per server (R760 LCA)','coefficient',50,True),
  ('dell','R740/R540/R650 footprints and weights','coefficient',50,True)],
 'noise_level': [
  ('iso9613','Lp ≈ Lw − 20·log10(r) − 8; full method','method',90,True),
  ('daikinCAT624','scroll chiller Lw 96–100 dBA','coefficient',50,True),
  ('traneRTAF','chiller Lw 94–101 / 91–98 dBA','coefficient',50,True),
  ('climavenetaIFX','screw chiller Lw 99–103 dBA','coefficient',50,True),
  ('kelvionLF','dry cooler Lw (unit total unresolved)','coefficient',40,True),
  ('mtuDS2250','open diesel 98.7 dBA @7 m','coefficient',50,True),
  ('catTM9338','diesel spectra at 7 m','coefficient',50,True),
  ('cumminsS1443','enclosed diesel 73–91 dBA @7 m','coefficient',50,True),
  ('stulz','CRAC 48–62 dBA @2 m','coefficient',50,True),
  ('oldsNIA','filed equipment Lw table (Olds AB)','check',70,True),
  ('burlingtonNIA','filed chiller Lw 92 dBA each (Burlington ON)','check',70,True)],
 'light_at_window': [
  ('cie150','E3 zone limits 10 / 2 lx','rule',90,True),
  ('edmBylaw20001','Edmonton s.5.120(3) qualitative glare rule','rule',90,True)],
 'refuge_people': [
  ('ess','3.5 m² per person; 2 m between beds','coefficient',90,True),
  ('eccc','cold-need days (≤ −20 °C)','data',80,True)],
 'cooling_centre_people': [
  ('ess','room standards','coefficient',90,False),
  ('healthCanada2026','26 °C indoor limit','rule',90,True),
  ('eccc','humidex ≥30 days (5.7 / 10.5)','data',80,True)],
 'receiver_demand': [
  ('energize','disclosed building energy (opt-in; enforcement paused)','data',80,True),
  ('edmBench','Edmonton benchmarking (voluntary; pending)','data',80,True),
  ('vanEnergyReport','measured heat intensity of listed hosts (0.24–0.32 GJ/m²)','data',80,True),
  ('ceud','commercial intensity 1.11 / 2.01 GJ/m²; household 71.7 / 121.8 GJ','coefficient',80,True),
  ('statcanHousehold','household 81.2 / 121.8 GJ (2021, confirms CEUD)','check',80,True),
  ('nrcanTrends','space-heat share 61% (superseded by CEUD provincial)','coefficient',80,True)],
 'homes_heated': [
  ('ceud','space heat 33.1 / 76.9 GJ; DHW 19.4 / 28.2 GJ per household','coefficient',80,True),
  ('statcanHousehold','gas-using share 60% / 90% (displacement target)','coefficient',80,True)],
 'greenhouse_area': [
  ('iesoGH','1.63 GJ/m²·yr (Ontario measured)','coefficient',80,True),
  ('manitobaGH','2.1 GJ/m²·yr (Manitoba)','coefficient',80,True),
  ('rootZone','root-zone supply ~38 °C','check',70,True),
  ('giacomelli','pipe-rail 82 °C','check',70,True)],
 'aquaculture_tonnes': [
  ('ayuso2023','2.9 kWh/kg (make-up water only)','coefficient',70,True),
  ('nistad2020','measured 5.1–12.8 kWh/kg; heat pump 10–15%','bound',70,True),
  ('lukeRAS','4.6 kWh/kg trout','coefficient',50,True),
  ('ion2022','300–600 kWh/m³·yr per tank volume','coefficient',70,True),
  ('faoTrout','trout 9–14 °C','check',80,True),
  ('dfoRAS','BC model at 15 °C','check',80,True)],
 'insect_check': [
  ('dreyer2021','mealworm 2.88 kWh/kg','coefficient',70,True),
  ('oekoBSF','BSF 3,404 kWh/t substrate','coefficient',70,True),
  ('schon2024','rearing 27–35 °C','check',70,True)],
 'ev_stalls': [
  ('wsuEV','Level 2 7.4–19.2 kW','coefficient',80,True),
  ('vanDCFC','DCFC 25–400 kW','coefficient',90,True),
  ('silber2024','simultaneity 0.5','coefficient',70,True)],
 'ev_area': [
  ('vanParking','2.5 × 5.5 m, aisle 6.6 m (Vancouver)','rule',90,True),
  ('edmBylaw20001','5.5 × 2.6 m, aisle 7.0 m (Edmonton, current)','rule',90,True),
  ('edmParking','superseded Bylaw 12800 (kept for record)','check',90,True)],
 'storage_footprint': [
  ('dea','pit footprint 20.15 × V^0.61; heat-pump plant 100/50/30 m²/MW','coefficient',80,True)],
 'sewage_heat': [
  ('wilsonWorrall','Q × 4.18 × ΔT; not below 6 °C; inflow ≥ 11 °C','method',70,True),
  ('kwlSewer','~45 MW City-wide (Metro Vancouver model)','bound',70,True),
  ('rts06419','2.5 MW base, COP ~3, $59/MWh (SEFC NEU)','check',80,True),
  ('neuReport','NEU today: 47 buildings, 71% renewable','check',80,True),
  ('vanSewer','sewer type and material near a parcel (no flow)','data',80,True)],
 'demand_profile': [
  ('stratego','hourly distribution shape; DHW flat','method',70,True),
  ('cwec','hourly temperature → HDD16 shares','data',80,True),
  ('vbblHDD','Vancouver design HDD 2,925','rule',90,True),
  ('necbHDD','Edmonton design HDD18 5,120','rule',90,True),
  ('eccc','normals HDD18 2,781 / 5,126 / 5,697','data',80,True),
  ('ceud','space-heat share 0.46 / 0.63','coefficient',80,True)],
 'price_floor': [
  ('hiltunen2020','capex 0.5–0.65 M€/MW_heat','coefficient',70,True),
  ('dea','capex 1.13 / 0.95 M€/MW; O&M; lifetime 25 yr','coefficient',80,True),
  ('fortum','revealed €11–50/MWh','bound',50,True),
  ('exergi','revealed ~400 SEK/MWh','bound',50,True),
  ('rts19744','implicit $0 + unrecovered capex (111 E 5th)','site fact',80,True),
  ('floor','Canadian operator floor price','gap',0,True)],
 'price_ceiling': [
  ('fortis','Vancouver gas ≈ $38.6/MWh heat','coefficient',90,True),
  ('abgas','Edmonton gas ≈ $11/MWh heat','coefficient',90,True),
  ('neu9552','NEU returned-heat credit $32.59','coefficient',90,True),
  ('neuReport','NEU fuel context','check',80,True),
  ('dkPriceCap','Denmark cap 95 DKK/GJ (comparator)','check',90,True),
  ('edmDDE','Edmonton DDE business-as-usual pricing rule','rule',80,True),
  ('creativeEnergy','Creative Energy tiers $66.6 / $39.6','coefficient',90,False)],
 'lcoh': [
  ('crf','CRF and LCoH method','method',100,True),
  ('hiltunen2020','O&M 2,000 €/MW·yr; capex','coefficient',70,True)],
 'payback': [
  ('crf','NPV / IRR method','method',100,True),
  ('parssinen','payback 1.8–5.1 yr by size','check',70,True)],
 'capex_split': [
  ('energiforsk2020','who owns heat pump, meter, pipes (Exergi)','data',70,True),
  ('exergi','contract terms 10 + 5 yr','data',50,False),
  ('fortum','price by temperature and side','data',50,False),
  ('rts19744','applicant pays all (Vancouver condition)','rule',90,True),
  ('wahlroos2018','heat-pump capex 500 €/kW; 12 MW / 5 M€ / 5-yr example','coefficient',70,True),
  ('wahlroos2017','earlier capex basis','check',70,False),
  ('hiltunen2020','capex 0.5–0.65 M€/MW','coefficient',70,True),
  ('dea','capex split: heat pump / building / other','coefficient',80,True)],
 'affordability': [
  ('cusp','6% threshold','rule',70,True),
  ('statcanSHS','household energy spend $2,535','data',80,True)],
 'build_cost': [
  ('barroso2018','$9–13/W; occupancy scaling','coefficient',70,True),
  ('fan2007','provisioning context','check',70,False),
  ('tt2025','Vancouver 910–1,200 CAD/ft²','coefficient',50,True),
  ('vanPermits','permit values $28.5 M, $18 M','site fact',80,True)],
 'horizons': [
  ('horizons','servers ~6; plant 15–25; building 25–27 (economic life); network 30–50','coefficient',60,True),
  ('vanTax','improvement ÷ land value flags holding sites','proxy',80,True)],
 'lead_time': [
  ('bchTransmission','BC Hydro stage durations','data',90,True),
  ('aesoPerf','AESO stage averages 86 / 134 wk','data',80,True)],
 'grid_headroom': [
  ('wes','downtown Vancouver: no room; feeder positions by FY2027; WES 2032','data',90,True),
  ('bchIRP2025','Bill 31 limits 300 + 100 MW; LRMC','rule',90,True),
  ('cfdPage','Call for Demand status','data',80,True),
  ('queue','BC queue not public','gap',0,True),
  ('altaReg117','≥75 MW, aggregation, tethered/bridged, shed first','rule',90,True),
  ('aesoList','56 data-load projects, 23,549 MW requested','data',80,True),
  ('aesoLargeLoad','AESO process pages','data',80,True),
  ('aeso','1,200 MW interim allocation','data',80,True),
  ('goaGrid','~19,565 MW requested (Jul 2026)','data',80,True),
  ('woodcroft','EPCOR Woodcroft N-1 firm 76 MVA','data',80,True),
  ('woodcroftDDR','same report, deficiency filing','data',80,True),
  ('enmaxMap','headroom map format (not our city)','method',80,True),
  ('oebCCIM','headroom map format (Ontario)','method',80,True),
  ('torontoHydroMap','headroom map format (Toronto)','method',80,True),
  ('hqZones','headroom map format (Québec)','method',80,True)],
 'standoff': [
  ('goits','10 m / 45 m standoff','rule',90,True),
  ('gcpsg015','zone hierarchy','rule',90,True),
  ('tia942','rating as proxy','proxy',40,True)],
 'noise_limit': [
  ('bylaw14600','Edmonton 65 / 50 dBA at the line','rule',90,True),
  ('bylaw6555','Vancouver zone-pair continuous limits','rule',90,True),
  ('rule012','AUC Table 1 40–56 dBA night (+10 day)','rule',90,True)],
 'licence_flag': [
  ('wsa','BC: licence for open loop (Sch. A item 9)','rule',90,True),
  ('abGuide','Alberta: approval vs licence; aquifer test tiers','rule',90,True),
  ('abGSHE','Alberta fact sheet: authorization before construction','rule',90,True),
  ('abDirective','well and installer requirements','rule',90,True)],
 'row_cost': [
  ('bylaw4243','Vancouver $244.97 + $6.53/ft²','rule',90,True),
  ('edmULA','Edmonton ULA permit (fees unstated)','rule',90,True)],
 'ledger': [
  ('horizons','who controls what, by horizon','data',60,True),
  ('rts19744','applicant bears costs (Vancouver condition)','site fact',90,True),
  ('g9425','developer bears costs above $15 M (BCUC G-94-25)','rule',90,True)],
 'visibility': [
  ('fieldJB','seen / closed to view / not checked','site fact',80,True),
  ('vanPermits','documents-only column','site fact',80,True)],
}
