#!/usr/bin/env python3
"""Sun bins for roof shading (J.B., 19 Oct 2026): from each city's CWEC year, hour-by-month bins (as NREL SAM's 3D shade calculator
tabulates beam shade loss) of sun altitude and azimuth and the beam and diffuse irradiance on a horizontal surface. Derived statistics only;
the weather files stay in data/. Solar position: NOAA general solar position equations."""
import math, json, os, sys
H = os.path.dirname(os.path.abspath(__file__)); D = os.path.join(H, '..', 'data')
F = {'van': '51376785-CAN_BC_VANCOUVER-INTL-A_1108395_CWEC.epw', 'edm': 'effbc917-CAN_AB_EDMONTON-INTL-A_3012216_CWEC.epw'}
def sunpos(doy, hour_mid_lst, lat, lon, tz):
    g = 2 * math.pi / 365 * (doy - 1 + (hour_mid_lst - 12) / 24)
    eq = 229.18 * (0.000075 + 0.001868 * math.cos(g) - 0.032077 * math.sin(g) - 0.014615 * math.cos(2 * g) - 0.040849 * math.sin(2 * g))
    dec = 0.006918 - 0.399912 * math.cos(g) + 0.070257 * math.sin(g) - 0.006758 * math.cos(2 * g) + 0.000907 * math.sin(2 * g) - 0.002697 * math.cos(3 * g) + 0.00148 * math.sin(3 * g)
    tst = hour_mid_lst * 60 + eq + 4 * lon - 60 * tz
    ha = math.radians(tst / 4 - 180); la = math.radians(lat)
    cz = math.sin(la) * math.sin(dec) + math.cos(la) * math.cos(dec) * math.cos(ha); cz = max(-1, min(1, cz)); z = math.acos(cz)
    az = math.degrees(math.atan2(math.sin(ha), math.cos(ha) * math.sin(la) - math.tan(dec) * math.cos(la))) + 180  # from north, clockwise
    return 90 - math.degrees(z), az % 360
out = {}
for c, fn in F.items():
    L = open(os.path.join(D, fn), encoding='latin-1').read().splitlines()
    loc = L[0].split(','); lat, lon, tz = float(loc[6]), float(loc[7]), float(loc[8])
    bins = {}; tot = {'bh': 0, 'dh': 0}
    import datetime
    for row in L[8:]:
        r = row.split(',')
        if len(r) < 16: continue
        mo, dy, hr = int(r[1]), int(r[2]), int(r[3]); dni, dhi = float(r[14]), float(r[15])
        doy = datetime.date(2001, mo, min(dy, 28 if mo == 2 else dy)).timetuple().tm_yday
        alt, az = sunpos(doy, hr - 0.5, lat, lon, tz)
        bh = dni * max(0, math.sin(math.radians(alt))) if alt > 0 else 0.0
        k = (mo, hr); b = bins.setdefault(k, {'n': 0, 'alt': 0, 'sx': 0, 'sy': 0, 'bh': 0, 'dh': 0})
        b['n'] += 1; b['alt'] += alt; b['sx'] += math.sin(math.radians(az)); b['sy'] += math.cos(math.radians(az)); b['bh'] += bh; b['dh'] += dhi
        tot['bh'] += bh; tot['dh'] += dhi
    rows = []
    for (mo, hr), b in sorted(bins.items()):
        alt = b['alt'] / b['n']; az = math.degrees(math.atan2(b['sx'], b['sy'])) % 360
        rows.append([mo, hr, round(alt, 2), round(az, 1), round(b['bh'] / 1000, 2), round(b['dh'] / 1000, 2)])  # kWh/m² summed over the month's days at that hour
    out[c] = {'lat': lat, 'lon': lon, 'tz': tz, 'beam_kwh': round(tot['bh'] / 1000, 1), 'diffuse_kwh': round(tot['dh'] / 1000, 1), 'bins': rows,
              'note': 'CWEC typical year; [month, hour (EPW hour ending, local standard time), mean sun altitude °, mean azimuth ° from north, beam on horizontal kWh/m², diffuse on horizontal kWh/m²]'}
    print(c, lat, lon, tz, 'beam', out[c]['beam_kwh'], 'diffuse', out[c]['diffuse_kwh'], 'GHI', round((tot['bh'] + tot['dh']) / 1000, 1))
json.dump(out, open(os.path.join(H, 'sun.json'), 'w'), separators=(',', ':'))
