"""edmPermitsDC2026 (28 Oct 2026): the dataset's own column dictionary (data.edmonton.ca/api/views/24uj-dj8v) describes FLOOR_AREA as
'Square footage of floor area', so the permit areas are ft², not m². Same dollar ratios, now per ft². Register text only."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REP = [("(value and floor area as entered on the permit; floor area may be the work area or the building; the export gives no unit and some areas look like ft², so $/m² may be up to 10.76× higher ?; no MW stated)",
        "(value and floor area as entered on the permit; floor area may be the work area or the building; the dataset dictionary defines FLOOR_AREA as 'Square footage of floor area', so areas are ft²; no MW stated)"),
       ("$4,000,000 over 9,519 m² ≈ $420/m²", "$4,000,000 over 9,519 ft² ≈ $420/ft²"),
       ("$2,100,000 over 7,617 m² ≈ $276/m²", "$2,100,000 over 7,617 ft² ≈ $276/ft²"),
       ("$3,399,000 over 3,911 m² ≈ $869/m²", "$3,399,000 over 3,911 ft² ≈ $869/ft²"),
       ("$2,000,000 over 2,200 m² ≈ $909/m²", "$2,000,000 over 2,200 ft² ≈ $909/ft²")]
for p in (R / 'register/formula_register.json', R / 'tool/opps.json'):
    s = p.read_text(); n = 0
    for a, b in REP: n += s.count(a); s = s.replace(a, b)
    p.write_text(s); print(p.name, n)
