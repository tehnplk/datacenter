SELECT
  (SELECT hospitalcode FROM opdconfig LIMIT 1) AS hoscode
 ,COUNT(ipt.an) AS icu_case
 ,NOW() AS updated_at

FROM ipt
LEFT OUTER JOIN iptadm ON iptadm.an = ipt.an
LEFT OUTER JOIN bedno ON bedno.bedno = iptadm.bedno
WHERE bedno.export_code = '199100'
  AND ipt.dchstts IS NULL