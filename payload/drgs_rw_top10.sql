SET @hoscode = (SELECT hospitalcode FROM opdconfig limit 1);

SELECT @hoscode as hoscode,
       YEAR(dchdate) AS y,
       MONTH(dchdate) AS m,
       drg AS drgs_code,
       SUM(adjrw) AS sum_adj_rw
FROM ipt
WHERE YEAR(dchdate) = 2026
  AND MONTH(dchdate) = 1
GROUP BY YEAR(dchdate), MONTH(dchdate), drg
ORDER BY sum_adj_rw DESC
LIMIT 10;