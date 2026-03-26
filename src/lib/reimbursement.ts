import { dbQuery } from "@/lib/db";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

export type ReimbursementRow = {
  id: number;
  hoscode: string | null;
  hosname: string | null;
  hosname_short: string | null;
  fiscal_year: string | null;
  transfer_date: string | null;
  batch_no: string | null;
  ref_doc_no: string | null;
  fund_group_descr: string | null;
  fund_descr: string | null;
  efund_desc: string | null;
  amount: number;
  wait_amount: number;
  bond_amount: number;
  vat_amount: number;
  deduct_amount: number;
  total_amount: number;
  bank_name: string | null;
  budget_source: string | null;
  moph_id: string | null;
  moph_desc: string | null;
  payment_status: string | null;
};

export type ReimbursementFilters = {
  hoscode?: string;
  fiscalYear?: string;
  efundDesc?: string;
  paymentStatus?: string;
  page?: number;
  limit?: number;
};

type NormalizedFilters = {
  hoscode?: string;
  fiscalYear?: string;
  efundDesc?: string;
  paymentStatus?: string;
  page: number;
  limit: number;
  offset: number;
};

export type EfundSlice = {
  label: string;
  value: number;
};

export type HospitalBar = {
  hoscode: string | null;
  hosname: string | null;
  hosname_short: string | null;
  value: number;
};

export type ReimbursementOverview = {
  efundSlices: EfundSlice[];
  efundTotal: number;
  hospitalBars: HospitalBar[];
  overallTotalAmount: number;
};

export type ReimbursementSummary = {
  totalAllocated: number;
  totalTransfer: number;
  disbursementRate: number;
  numHospitals: number;
  numItems: number;
  numAccountCodes: number;
  deductionsTax: number;
  holdback: number;
  bond: number;
};

export type HospitalBarDetailed = {
  hoscode: string | null;
  hosname: string | null;
  hosname_short: string | null;
  totalAllocated: number;
  totalTransfer: number;
};

const BASE_SELECT = `
  SELECT
    rt.id,
    rt.hoscode,
    ch.hosname,
    ch.hosname_short,
    rt.fiscal_year,
    to_char(rt.transfer_date, 'YYYY-MM-DD') AS transfer_date,
    rt.batch_no,
    rt.ref_doc_no,
    rt.fund_group_descr,
    rt.fund_descr,
    rt.efund_desc,
    COALESCE(rt.amount, 0)::float8        AS amount,
    COALESCE(rt.wait_amount, 0)::float8   AS wait_amount,
    COALESCE(rt.bond_amount, 0)::float8   AS bond_amount,
    COALESCE(rt.vat_amount, 0)::float8    AS vat_amount,
    COALESCE(rt.deduct_amount, 0)::float8 AS deduct_amount,
    COALESCE(rt.total_amount, 0)::float8  AS total_amount,
    rt.bank_name,
    rt.budget_source,
    rt.moph_id,
    rt.moph_desc,
    rt.payment_status
  FROM public.reimbursement_transactions AS rt
  LEFT JOIN public.c_hos AS ch ON ch.hoscode = rt.hoscode
`;

export async function fetchReimbursementTransactions(
  filters: ReimbursementFilters = {},
) {
  const normalized = normalizeFilters(filters);
  const { whereClause, params } = buildWhereClause(normalized);

  const limitIdx = params.length + 1;
  const offsetIdx = params.length + 2;

  const rows = await dbQuery<ReimbursementRow>(
    `${BASE_SELECT}
     ${whereClause}
     ORDER BY rt.transfer_date DESC NULLS LAST, rt.id DESC
     LIMIT $${limitIdx}
     OFFSET $${offsetIdx}`,
    [...params, normalized.limit, normalized.offset],
  );

  const [{ count }] = await dbQuery<{ count: string }>(
    `SELECT COUNT(*)::bigint AS count
     FROM public.reimbursement_transactions AS rt
     ${whereClause}`,
    params,
  );

  return {
    rows,
    totalCount: Number(count ?? 0),
    page: normalized.page,
    limit: normalized.limit,
  };
}

export async function fetchReimbursementOverview(
  filters: ReimbursementFilters = {},
): Promise<ReimbursementOverview> {
  const normalized = normalizeFilters(filters);
  const { conditions, params } = buildFilterState(normalized);

  const pieConditions = [...conditions];
  const pieParams = [...params, "P"];
  pieConditions.push(`rt.payment_status = $${pieParams.length}`);
  const pieWhere = composeWhereClause(pieConditions);

  const efundSlices = await dbQuery<EfundSlice>(
    `SELECT
       COALESCE(rt.fund_descr, 'ไม่ระบุ') AS label,
       SUM(COALESCE(rt.total_amount, 0))::float8       AS value
     FROM public.reimbursement_transactions AS rt
     LEFT JOIN public.c_hos AS ch ON ch.hoscode = rt.hoscode
     ${pieWhere}
     GROUP BY label
     ORDER BY value DESC`,
    pieParams,
  );

  const { whereClause, params: baseParams } = buildWhereClause(normalized);

  const hospitalBars = await dbQuery<HospitalBar>(
    `SELECT
       rt.hoscode,
       ch.hosname,
       ch.hosname_short,
       SUM(COALESCE(rt.total_amount, 0))::float8 AS value
     FROM public.reimbursement_transactions AS rt
     LEFT JOIN public.c_hos AS ch ON ch.hoscode = rt.hoscode
     ${whereClause}
     GROUP BY rt.hoscode, ch.hosname, ch.hosname_short
     ORDER BY value DESC NULLS LAST
     LIMIT 8`,
    baseParams,
  );

  const totalRows = await dbQuery<{ total_amount: number | null }>(
    `SELECT SUM(COALESCE(rt.total_amount, 0))::float8 AS total_amount
     FROM public.reimbursement_transactions AS rt
     ${whereClause}`,
    baseParams,
  );

  const efundTotal = efundSlices.reduce((sum, slice) => sum + (slice.value ?? 0), 0);
  const overallTotalAmount = totalRows[0]?.total_amount ?? 0;

  return {
    efundSlices,
    efundTotal,
    hospitalBars,
    overallTotalAmount,
  };
}

export async function listReimbursementFiscalYears() {
  const rows = await dbQuery<{ fiscal_year: string | null }>(
    `SELECT DISTINCT fiscal_year
     FROM public.reimbursement_transactions
     WHERE fiscal_year IS NOT NULL
     ORDER BY fiscal_year DESC`,
  );

  return rows
    .map((row) => row.fiscal_year?.trim())
    .filter((year): year is string => Boolean(year));
}

export async function listReimbursementHospitals(limit = 200) {
  const rows = await dbQuery<{ hoscode: string; hosname: string | null }>(
    `SELECT hoscode, hosname
     FROM public.c_hos
     ORDER BY hoscode ASC
     LIMIT $1`,
    [limit],
  );

  return rows;
}

export async function listReimbursementEfunds() {
  const rows = await dbQuery<{ fund_descr: string | null }>(
    `SELECT DISTINCT fund_descr
     FROM public.reimbursement_transactions
     WHERE fund_descr IS NOT NULL
     ORDER BY fund_descr ASC`,
  );

  return rows
    .map((row) => row.fund_descr?.trim())
    .filter((value): value is string => Boolean(value));
}

export async function listReimbursementPaymentStatuses() {
  const rows = await dbQuery<{ payment_status: string | null }>(
    `SELECT DISTINCT payment_status
     FROM public.reimbursement_transactions
     WHERE payment_status IS NOT NULL
     ORDER BY payment_status ASC`,
  );

  return rows
    .map((row) => row.payment_status?.trim())
    .filter((status): status is string => Boolean(status));
}

export async function fetchReimbursementSummary(
  filters: ReimbursementFilters = {},
): Promise<ReimbursementSummary> {
  const normalized = normalizeFilters(filters);
  const { whereClause, params } = buildWhereClause(normalized);

  const rows = await dbQuery<{
    total_allocated: number;
    total_transfer: number;
    num_hospitals: number;
    num_items: number;
    num_account_codes: number;
    holdback: number;
    bond: number;
  }>(
    `SELECT
       COALESCE(SUM(COALESCE(rt.amount, 0)), 0)::float8        AS total_allocated,
       COALESCE(SUM(COALESCE(rt.total_amount, 0)), 0)::float8  AS total_transfer,
       COUNT(DISTINCT rt.hoscode)::int                         AS num_hospitals,
       COUNT(*)::int                                           AS num_items,
       COUNT(DISTINCT rt.moph_id)::int                         AS num_account_codes,
       COALESCE(SUM(COALESCE(rt.wait_amount, 0)), 0)::float8   AS holdback,
       COALESCE(SUM(COALESCE(rt.bond_amount, 0)), 0)::float8   AS bond
     FROM public.reimbursement_transactions AS rt
     ${whereClause}`,
    params,
  );

  const r = rows[0];
  const totalAllocated = r?.total_allocated ?? 0;
  const totalTransfer = r?.total_transfer ?? 0;
  const holdback = r?.holdback ?? 0;

  return {
    totalAllocated,
    totalTransfer,
    disbursementRate: totalAllocated > 0 ? (totalTransfer / totalAllocated) * 100 : 0,
    numHospitals: r?.num_hospitals ?? 0,
    numItems: r?.num_items ?? 0,
    numAccountCodes: r?.num_account_codes ?? 0,
    deductionsTax: totalAllocated - totalTransfer - holdback,
    holdback,
    bond: r?.bond ?? 0,
  };
}

export async function fetchReimbursementHospitalBars(
  filters: ReimbursementFilters = {},
): Promise<HospitalBarDetailed[]> {
  const normalized = normalizeFilters(filters);
  const { whereClause, params } = buildWhereClause(normalized);

  return dbQuery<HospitalBarDetailed>(
    `SELECT
       rt.hoscode,
       ch.hosname,
       ch.hosname_short,
       SUM(COALESCE(rt.amount, 0))::float8       AS "totalAllocated",
       SUM(COALESCE(rt.total_amount, 0))::float8  AS "totalTransfer"
     FROM public.reimbursement_transactions AS rt
     LEFT JOIN public.c_hos AS ch ON ch.hoscode = rt.hoscode
     ${whereClause}
     GROUP BY rt.hoscode, ch.hosname, ch.hosname_short
     ORDER BY "totalAllocated" DESC NULLS LAST`,
    params,
  );
}

function normalizeFilters(filters: ReimbursementFilters): NormalizedFilters {
  const cleanHoscode = filters.hoscode?.trim() || undefined;
  const cleanFiscalYear = filters.fiscalYear?.trim() || undefined;
  const cleanEfundDesc = filters.efundDesc?.trim() || undefined;
  const cleanPaymentStatus =
    filters.paymentStatus?.trim().toUpperCase() || undefined;

  const limitCandidate = Number(filters.limit);
  const pageCandidate = Number(filters.page);

  const limit = clamp(
    Number.isFinite(limitCandidate) && limitCandidate > 0
      ? limitCandidate
      : DEFAULT_LIMIT,
    10,
    MAX_LIMIT,
  );

  const page = Math.max(
    Number.isFinite(pageCandidate) && pageCandidate > 0 ? pageCandidate : 1,
    1,
  );

  const offset = (page - 1) * limit;

  return {
    hoscode: cleanHoscode,
    fiscalYear: cleanFiscalYear,
    efundDesc: cleanEfundDesc,
    paymentStatus: cleanPaymentStatus,
    page,
    limit,
    offset,
  };
}

function buildWhereClause(filters: NormalizedFilters) {
  const { conditions, params } = buildFilterState(filters);
  return { whereClause: composeWhereClause(conditions), params, conditions };
}

function buildFilterState(filters: NormalizedFilters) {
  const conditions: string[] = [];
  const params: Array<string | number> = [];

  if (filters.hoscode) {
    params.push(filters.hoscode);
    conditions.push(`rt.hoscode = $${params.length}`);
  }

  if (filters.fiscalYear) {
    params.push(filters.fiscalYear);
    conditions.push(`rt.fiscal_year = $${params.length}`);
  }

  if (filters.efundDesc) {
    params.push(filters.efundDesc);
    conditions.push(`rt.fund_descr = $${params.length}`);
  }

  if (filters.paymentStatus) {
    params.push(filters.paymentStatus);
    conditions.push(`rt.payment_status = $${params.length}`);
  }

  return { conditions, params };
}

function composeWhereClause(conditions: string[]) {
  return conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
