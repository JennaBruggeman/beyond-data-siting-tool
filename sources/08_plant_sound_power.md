# Hunt 8 — Plant sound power, public sources (9 Oct 2026)

Read directly unless UNVERIFIED. Manufacturer = datasheet or catalogue; consultant, filed = noise assessment filed with a regulator. No facility-specific details beyond equipment acoustics.

## Starter set (most defensible value per class)
| class | value | basis | source |
|---|---|---|---|
| Air-cooled scroll chiller 450–850 kW, standard fans | Lw 96–100 dBA (use 99; octaves 63–8k: 97 98 96 95 95 91 90 86) | AHRI 370, full load | Daikin Trailblazer AGZ-E catalogue 624, p.18 Table 6 (AGZ161) https://info.hoffman-hoffman.com/hubfs/CAT624.pdf |
| Air-cooled screw chiller 500–1,000 kW | Lw 99–103 dBA standard; 92–96 low-noise; Lp@10 m 67–70 / 60–63 | ISO 9614 | Mitsubishi Electric / Climaveneta i-FX brochure https://library.mitsubishielectric.co.uk/pdf/download_full/4298 |
| Dry cooler ~500 kW, 6 × 800 mm fans at 870 rpm | Lw 94 dBA printed under a 'per fan' heading (unit would be ≈102 if so) but 61 dBA @10 m only fits a unit total — unresolved, do not cite 94 as unit; scale with 50·log(n₂/n₁) (AMCA paper p.3) | EN 13487; AMCA 5252-08 | Kelvion selection printout https://www.resale.de/images/161618957_g_rueckkuehler-lf-pd203t4h-080y06d_2023-04-dn100.pdf (unit vs per-fan reading UNVERIFIED); fan law https://www.amca.org/assets/resources/public/researcharticle/12p_Mathson_paper.pdf p.4 |
| Standby diesel 1.4–2.25 MW, open | 98–99 dBA @7 m mechanical; unsilenced exhaust ~100 dBA @7 m | ISO 8528-10; Cat DM8702 | mtu 16V4000 DS2250 spec p.4 https://www.mtu-solutions.com/content/dam/mtu/products/power-generation/powergeneration-product-list-latest/231210_PG_Spec_16V4000DS2250G04_2250kW_3D_FC_60Hz_50C.pdf ; Cat 3516 TM9338 pp.2–4 https://powergenenterprises.com/wp-content/uploads/2019/10/GS2888-Caterpillar-3516-GeneratorSet-Performance_Sheet.pdf |
| Same, sound-attenuated enclosure | Cummins QuietSite L2 73–76, L1 78–87, weather-protective 89–91 dBA @7 m (corrected); casing Lw ~100 dBA with attenuated exhaust Lw ~92 dBA | manufacturer; supplier submittal | Cummins S-1443 p.3 (500–1,000 kW: 73–90 dBA @7 m by enclosure) https://powersuite.cummins.com/PS5/PS5Content/SiteContent/en/Binary_Asset/pdf/Commercial/Diesel/s-1443.pdf ; WSP Virtus LON12 Table 5-1 https://consult.environment-agency.gov.uk/psc/sl1-4qz-virtus-holdco-limited/supporting_documents/Application%20%20Variation%20V003%20%20Virtus%20LON12%20noise%20report%200.4%20for%20issue%2025102024.pdf |
| CRAC 30–150 kW (indoor) | 48–62 dBA @2 m | manufacturer | Stulz CyberAir 3PRO doc 1100296 pp.9–10 https://repository.stulz.com/DFC83F25 |
| Transformer 2–3 MVA liquid-filled | 62–63 dB average (NEMA TR 1 near-field contour, no-load) | NEMA TR 1 (edition UNVERIFIED) | https://maddox.com/resources/articles/audible-sound-levels-in-liquid-filled-transformers |
| Conversion | Lw ≈ Lp@7 m + 24.9 dB (hemispherical, Q = 2); Daikin: Lp = Lw − 20 log r(ft) + 10 log Q − 0.5 | derived | CAT624 pp.16–17 |

## Rating method
ANSI/AHRI 370-2025 (https://ahrinet.org/system/files/2025-04/ANSI_AHRI%20Standard%20370-2025%20SI_I-P.pdf): outdoor air-cooled equipment ≥10.5 kW; methods AHRI 220 reverberation, ISO 3745 hemi-anechoic, ISO 3744 free field (App. D), AHRI 230 intensity; rating = unweighted octave-band Lw 63–8,000 Hz plus overall A-weighted Lw at standard thermal condition; reproducibility ~0.5 dB.

## Filed noise assessments with equipment tables
| filing | equipment and levels | source |
|---|---|---|
| Synapse, Olds AB (OpenCycle Rev 1, 24 Mar 2026) | chiller Lw 107–110 dBA (31.5–8k: 90 92 105 100 108 101 98 89 82); genset building wall Lw 108, intake 98, exhaust 96–97, cooler 93–97; GSU transformer Lw 92–103; "manufacturer data obtained by the client" | https://www.olds.ca/media/egilzm3p/30732_x0011_tp-31-noise-impact-assessment_000011.pdf Table 1 pp.18–19; App. D |
| Englobe peer review for Town of Olds (20 Mar 2026) | chiller model unverified (comment 9); recommends chillers ≤85 dBA Lw and transformers ≤80 dBA (comment 20); load-bank noise flagged (12) | https://www.olds.ca/media/icwazfyz/20260320-olds-data-center-nia-peer-review-comments-02602899000.pdf |
| Burlington ON data centre (SS Wilson, NPC-300, May 2026) | 12 air-cooled chillers Lw 92 dBA each; generator Lw 108; transformers Lw 80 | https://www.burlington.ca/en/news/resources/Current-Development-Projects/Ward-4/3110-South-Service/Supporting-Documents/Noise%20and%20Vibration%20Study%20-%202026-05-05.pdf Table 6.5.5-1 p.15; §6.6 p.17 |
| KAO Harlow (Sweco, Feb 2025) | MTU 1.8–3.2 MW containers: canopy 78–80, louvres 75–80, flue 78–80 dBA @1 m with spectra | https://consult.environment-agency.gov.uk/psc/cmr-we4588ab-v017-9na-harlow-operations-limited/supporting_documents/Application%20%20Variation%20V002%20%20Environmental%20Noise%20Impact%20Assessment%2031032025.pdf App. D |
| Amazon Hayes (auricl, Oct 2024) | MTU 20V4000 DS4000: outlet 65 / casing 73 / inlet 68.8 dBA @1 m | https://consult.environment-agency.gov.uk/psc/ub3-4dg-amazon-data-services-uk-ltd-dp3442qv-v002/supporting_documents/Application%20%20Variation%20V002%20%20Noise%20Report%2020122024.pdf Table 6.2 |
| Colt L4 Hayes (RF Environmental, Mar 2024) | 2.4–2.6 MW containers: 79.4 dBA @1 m; face Lw 93–99; flue Lw 86.5, with top-face spectrum | https://consult.environment-agency.gov.uk/psc/ub4-0sl-colt-data-centre-services-uk-limited-a001/supporting_documents/Application%20Bespoke%20%20Noise%20Report%20Colt%20L4%20Hayes%2028032024.pdf Tables 6.2–6.4 |
| HK EPD Good Practices Table 7a (via EIA appendix) | 400-ton air-cooled chiller Lw 109 dBA, "for reference purpose only" | https://epd.gov.hk/eia/register/report/eiareport/eia_2782022/EIA%20Report/Appendices/Appendix%204.6.pdf |

## No public data (on request or blocked)
Trane Ascend / CGAM ("available on request"); York YVAA (no numbers; archiexpo copy blocked); Carrier 30XV (robots); Alfa Laval, Evapco, Güntner dry coolers (selection software only); Kohler KD2000 (field blank); Vertiv Liebert CW, Schneider fan walls; NEMA TR 1 primary; Grange Castle EIAR noise chapter; Colt LON6 planning NIA; HK EPD primary pages.
