"""9 Nov 2026 (J.B.): job F4, the two City tree inventories for the white-model site views (CODE_JOB_F4_white_model.md).
J.B. downloaded both CSVs in her browser to her Downloads folder (raw files, not in git: Edmonton's is over GitHub's 100 MB limit).
Code counted the rows, clipped them to each city and cut them into tool/tiles/<city>/r_<i>_<j>.json (git-ignored, like every tile).
Licence and attribution read by Code from each portal page on 9 Nov 2026 (City of Vancouver API metadata and licence page; City of
Edmonton dataset metadata eecg-fc54 and its Terms of Use page, Open Government Licence - Edmonton v1.0, July 2022).

The white model is not built yet, so no view uses the trees: they hang on one part, status 'data ready, view not built yet'."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
p = R / 'register/formula_register.json'; d = json.loads(p.read_text(encoding='utf-8')); S = d['new_sources']; m = d['meta']
D = '9 Nov 2026'

S['vanPublicTrees2026'] = (
  "City of Vancouver Open Data, Public trees (dataset public-trees; publisher City of Vancouver, data team Vancouver Board of Parks and Recreation): "
  "'a listing of public trees on boulevards and public trees in parks'; 'Private trees are not included in the inventory'; coordinates from the 2016 "
  "Geospatial Data for City of Vancouver Street Trees project; refreshed daily on weekdays, some attributes 'several years between updates' (portal "
  "description, read 9 Nov 2026). File public-trees-new.csv (38,882,173 bytes, ';'-separated, J.B. download 9 Nov 2026 about 14:22 UTC, before the "
  "portal's 14:49 UTC refresh: the file has 184,152 rows, the portal 184,085 after it). Columns: Asset ID, Address, Common name, Genus, Species, Cultivar, "
  "height_(m), diameter_(cm), Local Area, Geom, geo_point_2d. Heights are classes (mostly 4.6, 7.6, 10.7 m: 15, 25, 35 ft), not measurements (our "
  "reading of the values). Our counts: 1 row with no coordinates, 193 outside the city (191 on UBC/UEL land along NW Marine Drive west of Blanca, 2 "
  "in Mount Pleasant at a gap in the zoning layer), 183,958 kept; 2 with no height, 469 with no diameter; no duplicate ids. Tiles: tool/tiles/van/"
  "r_*.json (73 tiles, git-ignored). Licence: Open Government Licence - Vancouver v1.0 (https://opendata.vancouver.ca/pages/licence/); the City gives "
  "no dataset-specific attribution, so: 'Contains information licensed under the Open Government Licence – Vancouver.' Trust 80. "
  "— https://opendata.vancouver.ca/explore/dataset/public-trees/")
S['edmTrees2026'] = (
  "City of Edmonton Open Data, Trees (dataset eecg-fc54; attribution 'City of Edmonton', link edmonton.ca urban forestry): 'Boulevard and Open Space "
  "Trees owned and maintained by the City of Edmonton - not all City-owned trees are captured'; purpose 'List of all trees owned and maintained by the "
  "City of Edmonton'; updated monthly; rows updated 9 Nov 2026 09:42 UTC (portal metadata, read 9 Nov 2026). File Trees_20261109.csv (142,636,712 "
  "bytes, J.B. download 9 Nov 2026), 489,543 rows. Columns include LOCATION_TYPE, SPECIES, DIAMETER_BREAST_HEIGHT, CONDITION_PERCENT, PLANTED_DATE, "
  "OWNER, LATITUDE, LONGITUDE; no height column. Location types: Park 185,762, Boulevard 163,133, Buffer 41,723, Naturalized Park 36,975, Monowalk "
  "24,013 and smaller groups: park and natural-area trees are included, so 'street trees only' is wrong for Edmonton. Our counts: 0 rows with no "
  "coordinates, 0 outside the city, 489,543 kept; 1,073 with no diameter; no duplicate ids. Tiles: tool/tiles/edm/r_*.json (120 tiles, git-ignored). "
  "Licence: the dataset names 'See Terms of Use': Open Government Licence - Edmonton v1.0, July 2022 (https://data.edmonton.ca/stories/s/"
  "City-of-Edmonton-Open-Data-Terms-of-Use/msh8-if28). Attribution: 'City of Edmonton'; the licence's default statement: 'Contains information "
  "licensed under the Open Government Licence – City of Edmonton.' Trust 80. — https://data.edmonton.ca/d/eecg-fc54")
m['source_kinds']['vanPublicTrees2026'] = 'government dataset (City open data)'
m['source_kinds']['edmTrees2026'] = 'government dataset (City open data)'
for k in ('vanPublicTrees2026', 'edmTrees2026'):
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('date') == D for c in cl):
        cl.append({'check': 1, 'by': 'Code', 'date': D, 'where': 'portal pages and the downloaded CSVs', 'what': 'licence and attribution read from the portal; rows counted'})

PART = {"id": "site_trees", "name": "Trees around the lot (data ready, view not built yet)", "stage": "input", "unit": "trees",
  "formula": "City tree inventory points within the white model's context radius, drawn as simple trees sized from the inventory's height (Vancouver, "
             "classes) or trunk diameter (Edmonton), else one default size (labelled). City-owned trees only; private trees missing. Not computed or "
             "shown by the tool yet (job F4).",
  "inputs": ["parcel"], "coef": "none: positions and sizes as the City records them", "sources": ["vanPublicTrees2026", "edmTrees2026"],
  "conf": 80, "status": f"data ready, view not built yet ({D})"}
if 'site_trees' not in {q['id'] for q in d['quantities']}: d['quantities'].append(PART)
p.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf-8', newline='\n')
print('F4 trees: 2 sources, 1 part (site_trees)')
