"""Hand check of the heat money test for the two thesis sites (E06 Blatchford edge, V09 275 1st Ave E),
plus E05 for comparison. 25 Oct 2026. Every input is listed with its source or marked ASSUMPTION.
Run: python3 -I site_math.py  -> prints results and writes results.json beside this file."""
import json, os, math

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))

# ---------- inputs ----------
EUR = 1.5782            # CAD/EUR, Bank of Canada 2025 average (tool ECON.eur)
RATE = 0.056            # real cost of capital (tool ECON.rate; Squamish NEU feasibility, Compass/FVB 2010 p.44) - ASSUMPTION carried from tool
def crf(r, n): return r / (1 - (1 + r) ** -n)
CRF_PIPE, CRF_HP = crf(RATE, 30), crf(RATE, 25)   # lives: pipe 30 yr (EN 253 via Energiforsk 2022:872), heat pump 25 yr (DEA)

HP_CAPEX_EUR = (0.95e6, 1.13e6)   # EUR per MW heat, >=3 MW to <=1 MW (Danish Energy Agency tech data sheet 40, 2025 EUR)
HP_FLH = (4400, 7100)             # full-load hours/yr (tool ECON.hpFLH: Odense, Mantsala, STACK claim)
HP_OM_FIX, HP_OM_VAR = 2100, 3.07 # EUR/MW-yr, EUR/MWh (DEA sheet 40)
COP_70 = (4.6, 5.7)               # Lorenz COP, source 37.5/24 C to sink 70/50 C (tool best set-up)

# electricity, energy charges, $/MWh
AESO_POOL = {2021: 101.93, 2022: 162.46, 2023: 133.63, 2024: 62.78, 2025: 43.68}  # AESO Annual Market Statistics 2025, Table 1
def edm_elec(pool): return pool + 2.53 + 0.0809 * pool   # + EPCOR transmission energy + operating reserve 8.09% (tool ECON.elec; AUC 30298-D01-2025, agent-read)
EDM_ELEC = (edm_elec(AESO_POOL[2025]), edm_elec(sum(AESO_POOL.values()) / 5), edm_elec(max(AESO_POOL.values())))
VAN_ELEC = (67.9, 67.9)   # BC Hydro LGS 1611 (Apr 2026): energy 6.79 c/kWh
VAN_DEMAND = 13.83 * 12 * 1000   # $/MW-yr demand charge; spread over the heat pump's own run hours (independent check, 25 Oct)

# heat value = gas displaced / 0.85 boiler
EDM_HEATVAL = 13.0        # tool ECON.heatVal('edm') (ATCO regulated, 12-mo mean, riders excluded -> likely understated, register gap 14)
VAN_HEATVAL = 33.50 / 0.85  # FortisBC Rate 3 current per-GJ total $9.305 = $33.50/MWh gas (agent check of G-287-25, G-131-26)
NEU_CREDIT = 65.172 * 0.5   # By-law 9552 Sch. C Part 4, 2026; netted against the building's own bill (s.8.3, 8.4(c)); cap not stated
BLATCH_RATE = 35.80         # Blatchford 2026 energy rate $0.0358/kWh (blatchfordRates2026) = what customers pay; a ceiling, not an offer

PIPE_DN100 = (1038, 2620)   # $/m trench, DN100 pair (tool ECON.pipe: Persson 2019 to npro urban)
PIPE_BIG = (2000, 5000)     # ASSUMPTION: $/m for the larger pipe a 3-4 MW link needs (DN200-250); no source in project
CO2_GAS = 0.218             # t CO2e per MWh of heat from a gas boiler (tool CO2H)
GRID = {'edm': 0.346, 'van': 0.018}   # t/MWh, NIR 2026 Annex 7 consumption intensity 2024 (preliminary)

# data centre (decided design): client-sized
IT_MW = (3.0, 4.0)          # start size (J.B. decision, 25 Oct)
LOAD = 0.6                  # average IT load factor (tool) - ASSUMPTION carried from tool
CAPTURE = (0.48, 0.75)      # share of server heat captured in liquid at 50-60 C (tool; Bitspower/ASHRAE-type claims)

# ---------- monthly heating shape from CWEC (Edmonton, Vancouver) ----------
def hdd_share(epw, base=18.0):
    m = [0.0] * 12; days = {}
    for line in open(epw, encoding='latin-1').read().splitlines()[8:]:
        p = line.split(',')
        if len(p) < 7: continue
        mo, dy, t = int(p[1]), int(p[2]), float(p[6])
        days.setdefault((mo, dy), []).append(t)
    for (mo, dy), ts in days.items():
        m[mo - 1] += max(0.0, base - sum(ts) / len(ts))
    s = sum(m); return [x / s for x in m]
EPW = {'edm': os.path.join(ROOT, 'data', 'effbc917-CAN_AB_EDMONTON-INTL-A_3012216_CWEC.epw'),
       'van': os.path.join(ROOT, 'data', '51376785-CAN_BC_VANCOUVER-INTL-A_1108395_CWEC.epw')}
SHARE = {c: hdd_share(p) for c, p in EPW.items()}

out = {}
# ---------- 1. heat the start-size data centre offers ----------
it_mwh = [mw * 8760 * LOAD for mw in IT_MW]
offer_liquid = (it_mwh[0] * CAPTURE[0], it_mwh[1] * CAPTURE[1])
offer_all = (it_mwh[0] * 0.95, it_mwh[1] * 0.95)   # REASONING: an ambient loop (max 32 C) can also take air-side heat at 25-35 C; ~95% of IT power ends as heat in the building - ASSUMPTION
out['offer'] = dict(it_mwh=it_mwh, liquid=offer_liquid, ambient_all=offer_all)

# ---------- 2. heat-pump route cost (any hot network: E05 downtown, V09 NEU) ----------
def hp_cost(elec, cop, flh, capex_eur):
    capex = capex_eur * EUR * CRF_HP / flh            # $/MWh heat
    om = (HP_OM_FIX / flh + HP_OM_VAR) * EUR
    el = elec / cop
    return capex + om + el, dict(capex=capex, om=om, elec=el)
best = lambda e: hp_cost(e, COP_70[1], HP_FLH[1], HP_CAPEX_EUR[0])
worst = lambda e: hp_cost(e, COP_70[0], HP_FLH[0], HP_CAPEX_EUR[1])
out['hp_route'] = {
 'edm_2025':  (best(EDM_ELEC[0]), worst(EDM_ELEC[0])),
 'edm_5yr':   (best(EDM_ELEC[1]), worst(EDM_ELEC[1])),
 'edm_2022':  (best(EDM_ELEC[2]), worst(EDM_ELEC[2])),
 'van_energy':(best(VAN_ELEC[0]), worst(VAN_ELEC[0])),
 'van_demand':(best(VAN_ELEC[0] + VAN_DEMAND / HP_FLH[1]), worst(VAN_ELEC[0] + VAN_DEMAND / HP_FLH[0])),
}

# ---------- 3. E06: no heat pump; pipe + exchanger + pumping ----------
def e06_delivery(route_m, pipe_m, heat_mwh, elec):
    pipe = route_m * pipe_m * CRF_PIPE
    hx = 250_000 * crf(RATE, 25)   # ASSUMPTION: plate exchanger + pumps + controls ~$250k installed (no project source)
    pump = 0.015 * elec            # ASSUMPTION: pumping ~1.5% of heat moved
    return (pipe + hx) / heat_mwh + pump
routes = (60, 300, 600)   # m: to the service-area edge across Airport Rd (~50-60 m, C17943 Sch. A read visually) / mid / far; real tie-in point UNKNOWN
e06 = {}
for r in routes:
    lo = e06_delivery(r, PIPE_BIG[0], offer_liquid[1], EDM_ELEC[0])
    hi = e06_delivery(r, PIPE_BIG[1], offer_liquid[0], EDM_ELEC[2])
    e06[r] = (lo, hi)
out['e06_delivery'] = e06
# if the utility only buys winter heat (Nov-Mar, 41% of a flat offer)
out['e06_delivery_winter_only'] = {r: (e06_delivery(r, PIPE_BIG[0], offer_liquid[1]*0.414, EDM_ELEC[0]), e06_delivery(r, PIPE_BIG[1], offer_liquid[0]*0.414, EDM_ELEC[2])) for r in routes}

# ---------- 4. Blatchford balance (full build-out) - REASONING, not utility data ----------
# customers' heat pumps take heating*(1-1/COP) from the loop; cooling puts cooling*(1+1/EER) back.
H, C = 46789, 43747   # MWh/yr at build-out (blatchford2023 p.6)
bal = {}
for cop, eer in ((3.0, 3.5), (3.5, 4.5), (4.0, 5.5)):   # ASSUMPTION: typical water-source heat pump ranges
    take = H * (1 - 1 / cop); put = C * (1 + 1 / eer); bal[f'COP{cop}/EER{eer}'] = round(put - take)
out['blatchford_annual_net'] = bal   # positive = loop gains more heat than it loses over a year

# winter share of heating (Nov-Mar) and of a flat data-centre offer
w = [10, 11, 0, 1, 2]
out['winter_share_heating'] = {c: round(sum(SHARE[c][i] for i in w), 3) for c in SHARE}
out['winter_share_flat_offer'] = round(sum((30, 31, 31, 31, 28)) / 365, 3)
out['blatchford_monthly_heat_MWh'] = [round(H * s) for s in SHARE['edm']]

# ---------- 5. carbon price that closes the gap on the heat-pump routes ----------
def cprice(cost, val, city, cop):
    saved = CO2_GAS - GRID[city] / cop
    return (cost - val) / saved
out['carbon_break_even_edm'] = (cprice(best(EDM_ELEC[0])[0], EDM_HEATVAL, 'edm', COP_70[1]),
                                cprice(worst(EDM_ELEC[0])[0], EDM_HEATVAL, 'edm', COP_70[0]))

# ---------- 6. V09 value cases ----------
out['v09_value'] = dict(neu_credit=NEU_CREDIT, gas_parity=VAN_HEATVAL,
                        credit_cap_note='credit is netted on the building\'s own NEU bill; a data centre buys little NEU heat, so most credit may be unusable (cap not stated in by-law)')
out['inputs'] = dict(EDM_ELEC=EDM_ELEC, VAN_ELEC=VAN_ELEC, EDM_HEATVAL=EDM_HEATVAL, VAN_HEATVAL=VAN_HEATVAL, CRF_PIPE=CRF_PIPE, CRF_HP=CRF_HP)

def r(x):
    if isinstance(x, float): return round(x, 2)
    if isinstance(x, dict): return {str(k): r(v) for k, v in x.items()}
    if isinstance(x, (list, tuple)): return [r(v) for v in x]
    return x
json.dump(r(out), open(os.path.join(HERE, 'results.json'), 'w'), indent=1)
print(json.dumps(r(out), indent=1))
