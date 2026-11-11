"""11 Nov 2026 (J.B., scope a): the liquid loop temperature becomes a case pair from the ASHRAE liquid-cooling classes. ASHRAE Thermal Guidelines for
Data Processing Environments, 5th ed. (2021), ch. 3, Table 3.1 (p. 47): facility supply water maximums W17 17, W27 27, W32 32, W40 40, W45 45,
W+ > 45 °C; minimum 2 °C for all classes; p. 48: classes W32, W40, W45 and W+ are candidates for district heating. No return temperature or rise is
given: return = supply + 11-16 K from NREL ESIF (24 °C supply, 35-40 °C return; Van Geet 2019). Cooler case W32, warmer case W45, W40 between.
The text also expects future chips to push equipment from W40/W45 down to W32 (J.B.'s reading, p. 48). Licensed text: J.B.'s copy via UBC Library,
Claude Link beyond-data-sources/public/ashraeLiquidClasses/ (never in the repo); only the class numbers and citation are carried here."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8'))
d['new_sources']['ashraeTG5liquid'] = ('STANDARD GUIDELINE (licensed; J.B. via UBC Library, 11 Nov 2026; never in the repo): ASHRAE TC 9.9, Thermal Guidelines for Data Processing '
  'Environments, 5th ed. (2021), ch. 3, Table 3.1 "2021 Thermal Guidelines for Liquid Cooling", p. 47: facility supply water temperature by class, W17 17 °C, W27 27, '
  'W32 32, W40 40, W45 45, W+ >45; "Minimum water temperature for all classes is 2°C"; typical facilities: W32 cooling tower with chiller or district heating system, '
  'W45 cooling tower with district heating system. p. 48: "The liquid cooling classes with supply temperatures of 32°C ... and higher (shown in Table 3.1) are candidates '
  'for district heating." Supply temperatures are requirements met by the ITE; the facility owner must allow for the CDU approach (p. 48). No return temperature or rise given.')
Q = {q['id']: q for q in d['quantities']}
h = Q['heat_temp']
h['formula'] = 'air-cooled 25–35 °C; liquid-cooled: the loop as a case pair, return = class supply maximum + 11–16 K: W32 (cooler) 43–48 °C, W40 51–56 °C, W45 (warmer) 56–61 °C'
h['coef'] = ('11 Nov 2026 (J.B., scope a): supply maximums ASHRAE TG5 Table 3.1 p. 47 (ashraeTG5liquid); rise 11–16 K NREL ESIF (nrelESIF2019); the heat pump cost of heat uses the '
  'cooler case W32; the warmer case W45 is shown as temperatures (Lorenz COP not reliable within a few K of the sink, ?); Architecture direct-heat test 43–61 °C. Was liquid 50–60 °C (unverified). ‖ ' + h['coef'])
for s in ('ashraeTG5liquid', 'nrelESIF2019'):
    if s not in h.get('sources', []): h.setdefault('sources', []).append(s)
h.setdefault('source_roles', []).append({'id': 'ashraeTG5liquid', 'term': 'liquid loop supply maximums by class', 'role': 'coefficient (standard guideline)', 'conf': 90, 'verified': True})
h['revised'] = '2026-11-11'
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('heat_temp case pair; ashraeTG5liquid added')
# check record (rebuild guard): read by Claude 11 Nov 2026 from J.B.'s licensed copy (Table 3.1 p. 47 and p. 48 text confirmed)
d = json.loads(p.read_text(encoding='utf-8'))
d['meta'].setdefault('source_check', {})['ashraeTG5liquid'] = 'claude'
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('check record added')
