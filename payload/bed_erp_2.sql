-- สร้างตาราง indiv-admit  ด้วย bed_erp_1.sql --

SET @hoscode = (SELECT hospitalcode FROM opdconfig LIMIT 1);

SELECT
  @hoscode AS hoscode,
  DATE('2025-01-01') AS start_date,
  DATE('2025-06-30') AS end_date,
  bb.export_code,
  bb.bed_count,
  COALESCE(SUM(
    CASE
      WHEN LEAST(ia.dchdate, DATE('2025-06-30')) >= GREATEST(ia.regdate, DATE('2025-01-01'))
        THEN DATEDIFF(LEAST(ia.dchdate, DATE('2025-06-30')), GREATEST(ia.regdate, DATE('2025-01-01'))) + 1
      ELSE 0
    END
  ), 0) AS inpatient_days,
  ROUND(
    COALESCE(SUM(
      CASE
        WHEN LEAST(ia.dchdate, DATE('2025-06-30')) >= GREATEST(ia.regdate, DATE('2025-01-01'))
          THEN DATEDIFF(LEAST(ia.dchdate, DATE('2025-06-30')), GREATEST(ia.regdate, DATE('2025-01-01'))) + 1
        ELSE 0
      END
    ), 0) * 100.0 /
    (bb.bed_count * (DATEDIFF(DATE('2025-06-30'), DATE('2025-01-01')) + 1)),
    2
  ) AS bor_pct
FROM (
  SELECT export_code, COUNT(*) AS bed_count
  FROM bedno
  WHERE export_code IS NOT NULL AND TRIM(export_code) <> ''
  GROUP BY export_code
) bb
LEFT JOIN `indiv-admit` ia
  ON ia.export_code = bb.export_code
GROUP BY bb.export_code, bb.bed_count
ORDER BY bb.export_code;