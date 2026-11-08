# Emergency hub spec: sources against the register (8 Nov 2026)

Claude Link `eh/specs/emergency_hub.md` checked against `register/formula_register.json`, after the register additions of 8 Nov (`register/patches/register_additions_2026_11_08.py`).

## Weaknesses first
- Ids found by pattern (snake_case, camelCase, ids with digits). A source cited only in words was checked by clause, by hand, below.
- "In the register" means the id or clause is there. It does not mean the figure in the spec matches the entry; that was not checked.

## Source ids: all in the register
25 source ids cited, 25 found: arch_acc_gcpsg015RZ, arch_acc_gunneboHiSec, arch_ahsReceptionCentres, arch_edmExtremeWeather, arch_hcCleanerAirSpaces, arch_hsg_abGFNA2021, arch_hsg_vchUpccNV, arch_pub_vanWarm2021, arch_sup_abGFNARooms, arch_sup_eastglenRooms, arch_sup_torRespite, arch_up_fm0523, arch_up_fm0528, burlingtonPlans2026, eatonCA022021, edmZB580, galaxyVX, lbnl2024, nfpa855_2026, rehlkoKD1000, uptime2025, vertivAFC, vertivAFC_clear, vertivAFC_siting, vertivLi5.
6 part ids, all in the register: arch_dc_hall, battery_cabinets, electrical_room, fuel_on_site, it_load_outside, ups_modules.
The other tokens are file names or units (formula_register, dc_rooms, room_minimums_rule_2026, TestFit_EH_V339, kWh …), not sources.

## Clauses cited in words: what is missing
| Spec cites | Register has | Missing |
|---|---|---|
| VBBL 3.3.1.9, 3.3.1.9.(5) | NBC 2020 (nbc2020_v1); VBBL **2019** (vbbl2019_331) | VBBL 2025 text |
| VBBL Table 3.7.2.2.-A, 3.1.17.1 | NBC entries (arch_sup_nbcT3722A, arch_pub_nbc31171) | VBBL 2025 text |
| VBBL Table 3.1.3.1 | NBC (arch_nbc3131, arch_hb_nbc3131) | VBBL 2025 text |
| VBBL 3.8.2.3 | NBC (arch_acc_nbcAccessible) | VBBL 2025 text |
| VBBL Table 6.3.2.9 | NBC (arch_nbc6329) | VBBL 2025 text |
| CSA C282 6.5.1.1 (1 m clear round a generator) | arch_csa_c282 (CSA C282:24, J.B.'s licensed copy, p. 22) | none (corrected 8 Nov: the first search missed it) |
| CSA Z8000, ANSI/TIA-942 | scope and secondary entries (arch_up4_csaZ8000_*, tia942) | the clauses (paywalled, unread, as the spec says) |
| VBBL 3.4.2.3, 3.3.1.5, 3.7.2.2.-B, 3.8.3.5, 3.8.3.12–17, WorkSafeBC first aid, Vertiv AFC | added 8 Nov (vbbl25_*, wsbc_firstAid, vertivAFC_*) | none |
| Parking By-law 5.1.5, 5.2.5, 5.2.9; By-law 6555 s. 4.1(c); Bylaw 14600 s. 21; CSA B139 Table 2; FM 5-32; Zoning Bylaw 20001 s. 2.120 | in the register | none |

**To add (needs a read of J.B.'s VBBL 2025 PDF, Cowork or J.B.):** VBBL 2025 3.3.1.9, Table 3.7.2.2.-A, 3.1.17.1, Table 3.1.3.1, 3.8.2.3, Table 6.3.2.9. The register's NBC entries probably match (VBBL follows the NBC), but no one has checked the Vancouver text.
