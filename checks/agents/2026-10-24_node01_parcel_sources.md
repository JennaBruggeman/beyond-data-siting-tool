# Source check, node 1: Parcel (24 Oct 2026)

Independent agent; opened official portal pages. Several licence pages could not be opened (marked unverified).

| Dataset | Official name | Version | Fields used | Verdict |
|---|---|---|---|---|
| Vancouver parcels | Property parcel polygons (opendata.vancouver.ca) | updated weekly | area from polygon | Confirmed; licence wording unverified |
| Vancouver tax report | Property tax report (City + BC Assessment) | updated weekly | zoning, folio, address, year built, values; **no lot area field** | Confirmed |
| Vancouver footprints | Building footprints 2009 | 2009, not updated | heights from 2009 LiDAR | Confirmed (limits); field names unverified |
| Edmonton property info | Property Information (Current Calendar Year), dkk9-cj3x | not shown | zoning, lot_size, Total Gross Area, year_built, lat/long confirmed; lot_size units not stated | Partly confirmed |
| Edmonton assessment | Property Assessment Data (Current Calendar Year), q7d6-ambg | not shown | not shown | Unverified beyond existence |
| Edmonton parcel points | Land Parcels_Assessment Parcels (Point), dm3i-bp8w | not shown | parcel area | Unverified beyond existence |
| Edmonton zoning | Zoning Bylaw Geographical Data, fixa-tstc | not shown | zone | Unverified beyond existence |
| Edmonton lot outlines | EPSB Titled Lots Current (Altalis) | current to 1 Sep 2025 | outlines | Confirmed (currency, credit); licence field empty |

Findings:
1. "BCA extract" is not a source of this part (it reaches it only through the City's tax report; the Abacus extract is used for heat demand).
2. Vancouver lot area is measured from the parcel polygon; the tax report has no area.
3. Missing from the source text: LiDAR 2022 heights; Edmonton's three point datasets + zoning polygons; Altalis outlines via EPSB; Edmonton rooflines/3D heights; storeys are derived, not a field.
4. EPSB layer id: fetch script uses /0, make script cites /262; the service lists only 262. To confirm.
5. Licence pages (Vancouver OGL, Edmonton terms, Altalis terms) need a browser check.
