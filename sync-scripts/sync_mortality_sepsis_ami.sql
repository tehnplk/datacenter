-- ============================================================
-- อัตราตาย (Mortality Rate) ของโรค Sepsis และ AMI
-- ============================================================
-- เกณฑ์:
--   Sepsis ICD-10 : A40% (Streptococcal sepsis), A41% (Other sepsis), R652% (Severe sepsis)
--   AMI    ICD-10 : I21% (Acute MI), I22% (Subsequent MI)
--   เสียชีวิต     : dchstts = '09' (Dead)
--   ตาราง         : ipt (ผู้ป่วยใน) JOIN iptdiag (การวินิจฉัย)
-- ============================================================

-- 1. ภาพรวมรวมทุกปี - Sepsis
SELECT 
  (SELECT hospitalcode FROM opdconfig LIMIT 1) AS hoscode,
  'Sepsis' AS disease,
  COUNT(DISTINCT i.an) AS total_admissions,
  SUM(CASE WHEN i.dchstts = '09' THEN 1 ELSE 0 END) AS deaths,
  ROUND(
    SUM(CASE WHEN i.dchstts = '09' THEN 1 ELSE 0 END) * 100.0 
    / COUNT(DISTINCT i.an), 2
  ) AS mortality_rate_pct,
  NOW() AS d_update
FROM ipt i
INNER JOIN iptdiag d ON d.an = i.an
WHERE (d.icd10 LIKE 'A40%' OR d.icd10 LIKE 'A41%' OR d.icd10 LIKE 'R652%')
  AND i.dchdate IS NOT NULL;

-- 2. ภาพรวมรวมทุกปี - AMI
SELECT 
  (SELECT hospitalcode FROM opdconfig LIMIT 1) AS hoscode,
  'AMI' AS disease,
  COUNT(DISTINCT i.an) AS total_admissions,
  SUM(CASE WHEN i.dchstts = '09' THEN 1 ELSE 0 END) AS deaths,
  ROUND(
    SUM(CASE WHEN i.dchstts = '09' THEN 1 ELSE 0 END) * 100.0 
    / COUNT(DISTINCT i.an), 2
  ) AS mortality_rate_pct,
  NOW() AS d_update
FROM ipt i
INNER JOIN iptdiag d ON d.an = i.an
WHERE (d.icd10 LIKE 'I21%' OR d.icd10 LIKE 'I22%')
  AND i.dchdate IS NOT NULL;

-- 3. แยกรายปี (Sepsis + AMI รวมในคิวรี่เดียว)
SELECT 
  (SELECT hospitalcode FROM opdconfig LIMIT 1) AS hoscode,
  YEAR(i.dchdate) AS discharge_year,
  -- Sepsis
  SUM(CASE WHEN d.icd10 LIKE 'A40%' OR d.icd10 LIKE 'A41%' OR d.icd10 LIKE 'R652%' 
      THEN 1 ELSE 0 END) AS sepsis_admissions,
  SUM(CASE WHEN (d.icd10 LIKE 'A40%' OR d.icd10 LIKE 'A41%' OR d.icd10 LIKE 'R652%') 
      AND i.dchstts = '09' THEN 1 ELSE 0 END) AS sepsis_deaths,
  ROUND(
    SUM(CASE WHEN (d.icd10 LIKE 'A40%' OR d.icd10 LIKE 'A41%' OR d.icd10 LIKE 'R652%') 
        AND i.dchstts = '09' THEN 1 ELSE 0 END) * 100.0 
    / NULLIF(SUM(CASE WHEN d.icd10 LIKE 'A40%' OR d.icd10 LIKE 'A41%' OR d.icd10 LIKE 'R652%' 
        THEN 1 ELSE 0 END), 0)
  , 2) AS sepsis_mortality_pct,
  -- AMI
  SUM(CASE WHEN d.icd10 LIKE 'I21%' OR d.icd10 LIKE 'I22%' 
      THEN 1 ELSE 0 END) AS ami_admissions,
  SUM(CASE WHEN (d.icd10 LIKE 'I21%' OR d.icd10 LIKE 'I22%') 
      AND i.dchstts = '09' THEN 1 ELSE 0 END) AS ami_deaths,
  ROUND(
    SUM(CASE WHEN (d.icd10 LIKE 'I21%' OR d.icd10 LIKE 'I22%') 
        AND i.dchstts = '09' THEN 1 ELSE 0 END) * 100.0 
    / NULLIF(SUM(CASE WHEN d.icd10 LIKE 'I21%' OR d.icd10 LIKE 'I22%' 
        THEN 1 ELSE 0 END), 0)
  , 2) AS ami_mortality_pct,
  NOW() AS d_update
FROM ipt i
INNER JOIN iptdiag d ON d.an = i.an
WHERE i.dchdate IS NOT NULL
  AND (d.icd10 LIKE 'A40%' OR d.icd10 LIKE 'A41%' OR d.icd10 LIKE 'R652%' 
       OR d.icd10 LIKE 'I21%' OR d.icd10 LIKE 'I22%')
GROUP BY YEAR(i.dchdate)
ORDER BY discharge_year;
