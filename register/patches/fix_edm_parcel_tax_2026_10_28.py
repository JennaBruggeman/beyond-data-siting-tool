"""28 Oct 2026, read in the built-in browser and by web fetch:
- edmParcel: dataset 'Property Information (Current Calendar Year)' (rows updated 26 Oct 2026); columns zoning, total_gross_area
  ('typically measured from outside walls'), year_built confirmed. The dictionary gives no unit; read as m² (median RSF house 160,
  lot sizes match parcel areas in m²; our inference).
- edmTaxRates2026: Bylaw 21442, 2026 Property Tax and Supplementary Property Tax Bylaw, passed 28 Apr 2026: non-residential
  0.0252216 and education 0.0039677 (also in the City's Historical Tax Rates table)."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
REP = [("Edmonton Property Information: total_gross_area, zoning, year_built per parcel;",
        "Edmonton Property Information (Current Calendar Year; rows updated 26 Oct 2026): total_gross_area ('typically measured from outside walls'; no unit given, read as m², our inference from typical house sizes), zoning, year_built per parcel;"),
       ("City of Edmonton 2026 property tax bylaw: non-residential", "City of Edmonton Bylaw 21442, 2026 Property Tax and Supplementary Property Tax Bylaw (passed 28 Apr 2026): non-residential"),
       ("— audit/research_2026-10-19/A (?: bylaw not located; the City page below gives no rates or bylaw number) ; https://www.edmonton.ca/city_government/budget_finances/where-taxes-go",
        "— https://www.gov.edmonton.ab.ca/sites/default/files/public-files/documents/bl21442.pdf ; https://www.edmonton.ca/sites/default/files/public-files/COE_Historical_Tax_Rates.pdf")]
for p in (R / 'register/formula_register.json', R / 'tool/opps.json'):
    s = p.read_text(); n = 0
    for a, b in REP: n += s.count(a); s = s.replace(a, b)
    p.write_text(s); print(p.name, n)
