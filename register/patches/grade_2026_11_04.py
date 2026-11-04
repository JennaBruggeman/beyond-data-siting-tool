"""4 Nov 2026 (ELEV_REDRAW brief part A; checks/agents/ELEV_REDRAW_BRIEF_2026-11-04.md): ground elevation per lot.
No LiDAR source id was in the register before this patch (searched new_sources, old_sources, archived_sources, quantities), so two are added:
van_lidar2022_ground (City of Vancouver LiDAR 2022, ground class 2) and nrcan_hrdem (NRCan HRDEM, CanElevation Series).
Per-lot figures: tool/make_grade.py (our arithmetic). Check 1 only; report checks/agents/2026-11-04_elev_redraw.md."""
import json, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
D = '4 Nov 2026'
p = R / 'register/formula_register.json'; d = json.loads(p.read_text()); m = d['meta']; S = d['new_sources']
NEW = {
 'van_lidar2022_ground': (
  "City of Vancouver, LiDAR 2022 (open data), ground points (class 2), processed on J.B.'s computer into 2 m cell means "
  "(data/lidar_ground2m/<x>_<y>.npz, decimetres, UTM 10N EPSG:26910; not in git) — https://webtransfer.vancouver.ca/opendata/2022LiDAR/ "
  "‖ Vertical datum of the City LAS: not confirmed (?). The City's LiDAR readme and metadata could not be opened on 4 Nov 2026 "
  "(webtransfer.vancouver.ca and opendata.vancouver.ca refused by this session's network). Until it is read, the tool compares lot grade "
  "to the 4.6 m flood construction level (Greater Vancouver Regional District datum, arch_hb_vbblFlood) with a flag that the two datums are not confirmed the same (?). "
  "How cells with no ground point (under buildings, water) were filled: not recorded in the repo (?). "
  "Per-lot min, p10, median and max: our arithmetic (tool/make_grade.py). "
  "‖ CHECK 1 (4 Nov 2026): row 0 of each raster is the north edge. 339 1st Ave E, part of the lot in tile 492000_5457000: "
  "2 m means 2.3–6.0 m, p10 3.6, median 4.8 m vs the 0.5 m data 2.2–6.3 m, p10 3.5, median 4.8 m (rows read south-first give 3.8–4.6 m, so not that). "
  "Whole lot (both tiles): 2.2–6.2 m, p10 3.6, median 4.9 m."),
 'nrcan_hrdem': (
  "Natural Resources Canada, High Resolution Digital Elevation Model (HRDEM), CanElevation Series, Open Government Licence – Canada; "
  "DTM (bare ground); vertical datum CGVD2013 (as stated in the brief; NRCan metadata not opened ?) — "
  "https://open.canada.ca/data/en/dataset/957782bf-847c-4644-a757-e383c0057995 (not opened ?) "
  "‖ 4 Nov 2026: open.canada.ca, ftp.maps.canada.ca, datacube.services.geo.ca and the CanElevation download bucket were all refused by this "
  "session's network; nothing was downloaded. Edmonton lot grade is '?' for every lot, including 64 Airport Rd NW (E06B) and 74 Airport Rd NW (E06A). "
  "J.B. can download the DTM tiles for those lots from NRCan; tool/make_grade.py reads them from data/raw/edm/hrdem/."),
}
KIND = {'van_lidar2022_ground': 'city open data', 'nrcan_hrdem': 'government dataset'}
def log(k, entry):
    cl = m['check_log'].setdefault(k, [])
    if not any(c.get('date') == D and c.get('check') == entry['check'] and c.get('where') == entry['where'] for c in cl): cl.append(entry)
for k, v in NEW.items():
    S[k] = v; m['source_kinds'][k] = KIND[k]; m['source_check'][k] = 'claude'
log('van_lidar2022_ground', {'check': 1, 'by': 'Claude (build agent)', 'date': D, 'where': 'checks/agents/2026-11-04_elev_redraw.md',
    'what': 'row order checked on 339 1st Ave E against the 0.5 m data; datum page not reachable (?)'})
log('nrcan_hrdem', {'check': 1, 'by': 'Claude (build agent)', 'date': D, 'where': 'checks/agents/2026-11-04_elev_redraw.md',
    'what': 'not done: every NRCan host refused by the network; datum CGVD2013 from the brief, not read (?)'})
p.write_text(json.dumps(d, ensure_ascii=False, indent=1)); print('sources set', len(NEW))
