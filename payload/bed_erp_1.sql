SET @hoscode = (SELECT hospitalcode FROM opdconfig LIMIT 1);

SELECT
  @hoscode AS hoscode,
  CONCAT(LEFT(i.an, 3), REPEAT('X', GREATEST(CHAR_LENGTH(i.an) - 5, 0)), RIGHT(i.an, 2)) AS an_censored,
  lm.last_bedno AS bedno,
  b.export_code,
  i.regdate,
  i.dchdate,
  GREATEST(i.regdate, DATE('2025-01-01')) AS calc_start,
  LEAST(i.dchdate, CURDATE()) AS calc_end,
  CASE
    WHEN LEAST(i.dchdate, CURDATE()) >= GREATEST(i.regdate, DATE('2025-01-01'))
      THEN DATEDIFF(LEAST(i.dchdate, CURDATE()), GREATEST(i.regdate, DATE('2025-01-01'))) + 1
    ELSE 0
  END AS overlap_days
FROM ipt i
JOIN (
  SELECT
    i2.an,
    (
      SELECT bm.nbedno
      FROM iptbedmove bm
      WHERE bm.an = i2.an
        AND bm.nbedno IS NOT NULL
      ORDER BY bm.movedate DESC, bm.movetime DESC, bm.iptbedmove_id DESC
      LIMIT 1
    ) AS last_bedno
  FROM ipt i2
  WHERE i2.regdate IS NOT NULL
    AND i2.dchdate IS NOT NULL
    AND i2.regdate <= CURDATE()
    AND i2.dchdate >= DATE('2025-01-01')
) lm ON lm.an = i.an
JOIN bedno b ON b.bedno = lm.last_bedno
WHERE i.regdate IS NOT NULL
  AND i.dchdate IS NOT NULL
  AND i.regdate <= CURDATE()
  AND i.dchdate >= DATE('2025-01-01')
  AND b.export_code IS NOT NULL
  AND TRIM(b.export_code) <> ''
ORDER BY i.regdate, i.an;