# Calibration of the Beyond Data tool against built cases (13 Oct 2026).
# Inputs are the published figures in sources/13_calibration_cases.md (status in brackets).
# The engine formulas are the same as tool.html (verified identical on 12 Oct); two COP conventions are
# compared: the tool's simplified form (sink supply / source-out, η 0.50–0.60) and the full Lorenz form
# (log-mean temperatures both sides, η as a free parameter, solved from the realised COP).
import math, json

def lm(a, b):  # log-mean of two Kelvin temperatures
    a += 273.15; b += 273.15
    return (a - b) / math.log(a / b) if abs(a - b) > 1e-9 else a

def cop_simple(sink_supply, source_in, eta, drop=10):
    Th = sink_supply + 273.15; Tl = source_in - drop + 273.15
    return eta * Th / (Th - Tl)

def cop_lorenz(sink_supply, sink_return, source_in, source_out, eta):
    TH = lm(sink_supply, sink_return); TL = lm(source_in, source_out)
    return eta * TH / (TH - TL)

def eta_from(cop, sink_supply, sink_return, source_in, source_out):
    TH = lm(sink_supply, sink_return); TL = lm(source_in, source_out)
    return cop * (TH - TL) / TH

cases = [
 # name, sink supply/return, source in/out, realised COP, status, source note
 ('Odense 2020 (Fjernvarme Fyn, Facebook HPs only)', 75, 40, 27, 15, 4.5, 'REPORTED utility, annual settlement: 230 TJ from 14,020 MWh', 'Årsberetning 2020 p.9, 13; temps: Inspirationskatalog 2022 p.10'),
 ('Odense 2021–22 all-in (incl. circulation and distribution pumps)', 75, 40, 27, 15, 4.2, 'REPORTED utility, two-year average', 'Dansk Fjernvarme Inspirationskatalog 2022 p.10'),
 ('Telia Helsinki 29 May 2024 snapshot', 80, 40, 32, 20, 3.9, 'OPERATOR CLAIM, one-day point measurement; DH return assumed 40 (not stated)', 'Telia cooling-options PDF p.5–6'),
 ('ReUseHeat Braunschweig (design)', 70, 40, 25, 18, 3.6, 'MODELLED design', 'GDECA 2019; Bytes2Heat p.11'),
 ('Bahnhof Thule (simulation)', 68, 45, 23, 13, 3.7, 'MODELLED; source-out and return assumed', 'Energiforsk 2020:681 Table 2 p.32'),
 ('Université Laval Colosse (campus loop to 40 °C)', 40, 30, 15, 8, 7.0, 'REPORTED "de l\'ordre de 7"; return and source-out assumed', 'UL étude de cas 2021 p.9'),
]
print('COP: tool simplified form vs full Lorenz vs realised')
print(f"{'case':62s} {'tool η.50–.60':>14s} {'Lorenz η.50':>11s} {'realised':>9s} {'η implied':>10s}")
etas = []
for name, ss, sr, si, so, cop, st, src in cases:
    t = (cop_simple(ss, si, 0.5), cop_simple(ss, si, 0.6))
    L = cop_lorenz(ss, sr, si, so, 0.5)
    e = eta_from(cop, ss, sr, si, so)
    etas.append((name, e, st))
    print(f"{name[:62]:62s} {t[0]:6.2f}–{t[1]:<6.2f} {L:11.2f} {cop:9.2f} {e:10.2f}")
print('\nimplied Lorenz efficiency η across cases:', ', '.join(f'{e:.2f}' for _, e, _ in etas))
built = [e for n, e, s in etas if s.startswith('REPORTED') or s.startswith('OPERATOR')]
print(f'built/operating only: {min(built):.2f}–{max(built):.2f}  (design/simulated: ' + ', '.join(f'{e:.2f}' for n, e, s in etas if s.startswith('MODELLED')) + ')')

print('\n--- Delivered heat per unit of data-centre power (receiver-limited or source-limited?) ---')
rows = [
 # name, DC power basis MW, heat delivered GWh/yr, status
 ('Mäntsälä 2018 (15 MW DC power demand, Nivos; 20 GWh delivered, Sitra)', 15, 20, 'REPORTED'),
 ('Mäntsälä programme figure (30 GWh/yr, NIB)', 15, 30, 'REPORTED'),
 ('Heerlen APG (520 kW DC; 8,900 GJ extracted, RVO 2018)', 0.52, 8900/3600, 'REPORTED'),
 ('Westville/Telehouse (35 MW DC; 2,400 MWh/yr to the quarter)', 35, 2.4, 'PROJECTED'),
 ('TELUS Garden Vancouver (1.4 MW base-load offer; 94 % of 5,194 MWh demand)', None, 0.94*5.194, 'MODELLED (BCUC C-1-13)'),
]
for name, mw, gwh, st in rows:
    if mw:
        rej_lo = mw*0.35*8.76; rej_hi = mw*0.60*8.76   # tool: actual = nameplate × utilisation 0.35–0.60; PUE applied below
        tool_lo = rej_lo*1.4*0.5*1.25; tool_hi = rej_hi*1.6*0.8*1.4  # × PUE × capture × COP/(COP−1) at COP 5→1.25 … 3.5→1.4
        print(f"{name[:78]:78s} published {gwh:6.1f} GWh/yr  tool range {tool_lo:6.1f}–{tool_hi:6.1f}  ratio to nameplate-continuous {gwh/(mw*8.76):.2f}  [{st}]")
    else:
        print(f"{name[:78]:78s} published {gwh:6.1f} GWh/yr of 12.3 available (1.4 MW × 8,760 h) → receiver takes {gwh/12.26:.0%}  [{st}]")

print('\n--- Heat-pump full-load hours and capital cost ---')
flh = [('Odense 2020, 24 MW HP, 63.9 GWh (ramp year)', 63.9e3/24), ('Odense 2024, ~63 MW HPs both plants, 275 GWh', 275e3/63), ('Inspirationskatalog design', '5,000–7,000'), ('Tallaght year 1, 3 MW HP, 3,770 MWh', 3770/3), ('Mäntsälä 2018, 4 MW HP, 20 GWh', 20e3/4), ('STACK Oslo claim, 3.5 MW, 25 GWh', 25e3/3.5), ('ReUseHeat design, 0.3 MW, 1,750 MWh', 1750/0.3)]
for n, h in flh: print(f"{n:52s} {h if isinstance(h,str) else f'{h:,.0f} h'}")
cap = [('Odense TBV 215 M DKK / 43–45 MW (all-in, utility)', 215e6/7.46/44/1e6), ('Equinix PA10 €5.7 M / 6.6 MW (HP + 2.6 km network)', 5.7/6.6), ('ReUseHeat €460k / 0.3 MW excl. network', 0.46/0.3), ('DEA catalogue 2026 (register)', '0.95–1.13'), ('Hiltunen & Syri 2020 (register)', '0.5–0.65')]
print()
for n, c in cap: print(f"{n:52s} {c if isinstance(c,str) else f'{c:.2f}'} M€/MW_heat")

print('\n--- Utilisation implied by Telia snapshot ---')
# ERF 0.75 = E_reuse/E_DC; E_reuse 4.11 MW (waste heat before HP electricity); PUE 1.152 → IT actual
it_actual = 4.11/0.75/1.152
print(f"IT actual = 4.11 MW ÷ 0.75 ÷ 1.152 = {it_actual:.2f} MW against 24 MW IT nameplate → utilisation {it_actual/24:.2f} (one day; hall partly built out)")
print('register band 0.35–0.60 (LBNL server utilisation 0.21→0.35; Fan 0.6)')

print('\n--- Price points ---')
print('Stockholm revenue proxy €190k per MW·yr ÷ 5,000 h = €38/MWh ≈ C$57 at 1.5 (register: 400 SEK ≈ $57) — consistent')
print('TELUS Garden customer rate: BC Hydro residential + 5–10 %, proposed $0.105–0.126/kWh 2014–18 = $105–126/MWh (regulated TES, all-in customer price; DC heat supplied free)')
print('Odense, Tallaght, Equinix PA10, Markham: heat given free to the utility; Mäntsälä and Stockholm: paid, price to the DC not public (Stockholm: hourly avoided cost)')
