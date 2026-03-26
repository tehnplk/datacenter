import {
  fetchReimbursementOverview,
  fetchReimbursementTransactions,
  fetchReimbursementSummary,
  fetchReimbursementHospitalBars,
  listReimbursementEfunds,
  listReimbursementFiscalYears,
  listReimbursementHospitals,
} from "@/lib/reimbursement";
import { OverviewCharts } from "@/components/reimbursement/ReimbursementCharts";
import { AutoSubmitSelect } from "@/components/reimbursement/AutoSubmitSelect";

export const dynamic = "force-dynamic";

const FIXED_LIMIT = 20;

type SearchParams = {
  tab?: string | string[];
  hoscode?: string | string[];
  fiscalYear?: string | string[];
  efundDesc?: string | string[];
  page?: string | string[];
};

export default async function ReimbursementPage({
  searchParams,
}: {
  searchParams?: SearchParams | Promise<SearchParams>;
}) {
  const sp = await Promise.resolve(searchParams ?? {});
  const tab = toStringParam(sp.tab) ?? "overview";
  const rawHoscode = toStringParam(sp.hoscode);
  const rawFiscalYear = toStringParam(sp.fiscalYear);
  const rawEfund = toStringParam(sp.efundDesc);
  const rawPage = toStringParam(sp.page);

  // Fetch filter options first so we can determine the default fiscal year
  const [fiscalYears, hospitals, efunds] = await Promise.all([
    listReimbursementFiscalYears(),
    listReimbursementHospitals(),
    listReimbursementEfunds(),
  ]);

  // Default to most-recent year when none specified; "all" sentinel means user chose ทั้งหมด
  const fiscalYearRaw = rawFiscalYear?.trim();
  const fiscalYear = fiscalYearRaw === "all" ? undefined : (fiscalYearRaw || fiscalYears[0] || undefined);
  const hoscode   = rawHoscode?.trim()   || undefined;
  const efundDesc = rawEfund?.trim()     || undefined;
  const page      = toPositiveInt(rawPage);

  // --- Tab 1: Overview ---
  const [summary, hospitalBars, efundSlicesRaw] = await Promise.all([
    fetchReimbursementSummary({ fiscalYear, hoscode, efundDesc }),
    fetchReimbursementHospitalBars({ fiscalYear, hoscode, efundDesc }),
    fetchReimbursementOverview({ fiscalYear, hoscode, efundDesc }),
  ]);

  const pieSlices = summarizePie(efundSlicesRaw.efundSlices, 9).map((s) => ({
    name: s.label,
    value: s.value,
  }));

  // --- Tab 2: Transactions ---
  const txFilters = { hoscode, fiscalYear, efundDesc, page, limit: FIXED_LIMIT };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, txSummary] = tab === "transactions"
    ? await Promise.all([
        fetchReimbursementTransactions(txFilters),
        fetchReimbursementSummary({ hoscode, fiscalYear, efundDesc }),
      ])
    : [{ rows: [], totalCount: 0, page: 1, limit: FIXED_LIMIT }, null as any];

  const fromRecord  = data.rows.length ? (data.page - 1) * data.limit + 1 : 0;
  const toRecord    = data.rows.length ? fromRecord + data.rows.length - 1 : 0;
  const totalPages  = Math.max(1, Math.ceil(data.totalCount / data.limit));
  const baseQuery   = {
    tab: "transactions",
    hoscode: hoscode ?? "",
    fiscalYear: fiscalYear ?? "",
    efundDesc: efundDesc ?? "",
  };
  const exportUrl = `/api/reimbursement/export?${buildQuery({ hoscode: hoscode ?? "", fiscalYear: fiscalYear ?? "", efundDesc: efundDesc ?? "" }, {})}`;
  const sharedHoscodeParam = hoscode ?? "";
  const sharedFiscalYearParam = fiscalYearRaw === "all" ? "all" : (fiscalYear ?? "");
  const overviewTabHref = `?${buildQuery({
    tab: "overview",
    hoscode: sharedHoscodeParam,
    fiscalYear: sharedFiscalYearParam,
    efundDesc: efundDesc ?? "",
  }, {})}`;
  const transactionsTabHref = `?${buildQuery({
    tab: "transactions",
    hoscode: sharedHoscodeParam,
    fiscalYear: sharedFiscalYearParam,
    efundDesc: efundDesc ?? "",
  }, { page: 1 })}`;

  return (
    <div className="min-h-screen py-6">
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 sm:px-6">


        {/* Tabs */}
        <div className="flex gap-1 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-sm w-fit">
          <TabLink href={overviewTabHref} active={tab === "overview"} label="ภาพรวมทั้งจังหวัด" />
          <TabLink href={transactionsTabHref} active={tab === "transactions"} label="รายการโอน" />
        </div>

        {/* ===== TAB 1: OVERVIEW ===== */}
        {tab === "overview" && (
          <div className="space-y-6">
            {/* Overview filters – auto-submit on change */}
            <form method="get" className="flex flex-wrap items-center gap-3">
              <input type="hidden" name="tab" value="overview" />

              <label className="flex items-center gap-2 text-sm font-medium text-emerald-900 dark:text-emerald-100">
                ปีงบประมาณ
                <AutoSubmitSelect
                  name="fiscalYear"
                  defaultValue={fiscalYear ?? "all"}
                  className="rounded-2xl border border-[var(--border)] bg-white px-3 py-1.5 text-sm text-emerald-900 shadow-sm focus:border-emerald-500 focus:outline-none dark:bg-emerald-950 dark:text-emerald-100"
                >
                  <option value="all">ทั้งหมด</option>
                  {fiscalYears.map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </AutoSubmitSelect>
              </label>

              <label className="flex items-center gap-2 text-sm font-medium text-emerald-900 dark:text-emerald-100">
                โรงพยาบาล
                <AutoSubmitSelect
                  name="hoscode"
                  defaultValue={hoscode ?? ""}
                  className="rounded-2xl border border-[var(--border)] bg-white px-3 py-1.5 text-sm text-emerald-900 shadow-sm focus:border-emerald-500 focus:outline-none dark:bg-emerald-950 dark:text-emerald-100"
                >
                  <option value="">ทั้งหมด</option>
                  {hospitals.map((h) => (
                    <option key={h.hoscode} value={h.hoscode}>{h.hoscode} — {h.hosname ?? "ไม่ทราบชื่อ"}</option>
                  ))}
                </AutoSubmitSelect>
              </label>

              <label className="flex items-center gap-2 text-sm font-medium text-emerald-900 dark:text-emerald-100">
                กองทุน
                <AutoSubmitSelect
                  name="efundDesc"
                  defaultValue={efundDesc ?? ""}
                  className="rounded-2xl border border-[var(--border)] bg-white px-3 py-1.5 text-sm text-emerald-900 shadow-sm focus:border-emerald-500 focus:outline-none dark:bg-emerald-950 dark:text-emerald-100"
                >
                  <option value="">ทั้งหมด</option>
                  {efunds.map((ef) => (
                    <option key={ef} value={ef}>{ef}</option>
                  ))}
                </AutoSubmitSelect>
              </label>
            </form>

            {/* 8 summary cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="ยอดจัดสรรรวม"
                value={`${(summary.totalAllocated / 1_000_000).toFixed(2)} ล้าน`}
                sub=""
              />
              <StatCard
                label="ยอดโอนรวม"
                value={`${(summary.totalTransfer / 1_000_000).toFixed(2)} ล้าน`}
                sub="ยอดเงินที่โอนเข้าบัญชีหน่วยบริการจริง"
              />
              <StatCard
                label="อัตราเบิกจ่าย"
                value={`${summary.disbursementRate.toFixed(1)}%`}
                sub={summary.disbursementRate < 80 ? "ต่ำกว่าเกณฑ์" : "ผ่านเกณฑ์"}
                valueClass={summary.disbursementRate < 80 ? "text-red-500" : "text-emerald-600"}
              />
              <StatCard
                label="จำนวน รพ."
                value={String(summary.numHospitals)}
                sub={`${formatNumber(summary.numItems)} รายการ`}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="รายการหัก+ภาษี"
                value={`${(summary.deductionsTax / 1_000_000).toFixed(2)} ล้าน`}
                sub=""
              />
              <StatCard
                label="จำนวนรายการ"
                value={formatNumber(summary.numItems)}
                sub={`รหัสบัญชี ${summary.numAccountCodes} รายการ`}
              />
              <StatCard
                label="ชะลอโอน (Holdback)"
                value={`${(summary.holdback / 1_000_000).toFixed(2)} ล้าน`}
                sub=""
              />
              <StatCard
                label="หลักประกันสัญญา"
                value={`${(summary.bond / 1_000_000).toFixed(2)}`}
                sub=""
              />
            </div>

            {/* Charts */}
            <OverviewCharts
              pieData={pieSlices}
              pieTotal={efundSlicesRaw.efundTotal}
              hospitalBars={hospitalBars}
              hidePieChart={!!efundDesc}
            />
          </div>
        )}

        {/* ===== TAB 2: TRANSACTIONS ===== */}
        {tab === "transactions" && (
          <section className="space-y-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">

            {/* Filters */}
            <form className="flex flex-wrap items-end gap-3" method="get">
              <input type="hidden" name="tab" value="transactions" />
              <input type="hidden" name="page" value="1" />

              <label className="flex flex-col gap-1 text-sm font-medium text-emerald-800 dark:text-emerald-100">
                โรงพยาบาล
                <select
                  name="hoscode"
                  defaultValue={hoscode ?? ""}
                  className="rounded-2xl border border-[var(--border)] bg-white px-3 py-2 text-sm text-emerald-900 shadow-sm focus:border-emerald-500 focus:outline-none dark:bg-emerald-950 dark:text-emerald-100"
                >
                  <option value="">ทั้งหมด</option>
                  {hospitals.map((hos) => (
                    <option key={hos.hoscode} value={hos.hoscode}>
                      {hos.hoscode} — {hos.hosname ?? "ไม่ทราบชื่อ"}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium text-emerald-800 dark:text-emerald-100">
                ปีงบประมาณ
                <select
                  name="fiscalYear"
                  defaultValue={fiscalYear ?? "all"}
                  className="rounded-2xl border border-[var(--border)] bg-white px-3 py-2 text-sm text-emerald-900 shadow-sm focus:border-emerald-500 focus:outline-none dark:bg-emerald-950 dark:text-emerald-100"
                >
                  <option value="all">ทั้งหมด</option>
                  {fiscalYears.map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium text-emerald-800 dark:text-emerald-100">
                กองทุน
                <select
                  name="efundDesc"
                  defaultValue={efundDesc ?? ""}
                  className="rounded-2xl border border-[var(--border)] bg-white px-3 py-2 text-sm text-emerald-900 shadow-sm focus:border-emerald-500 focus:outline-none dark:bg-emerald-950 dark:text-emerald-100"
                >
                  <option value="">ทั้งหมด</option>
                  {efunds.map((ef) => (
                    <option key={ef} value={ef}>{ef}</option>
                  ))}
                </select>
              </label>

              <div className="flex gap-2 pb-0.5">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  ตกลง
                </button>
                <a
                  href="?tab=transactions"
                  className="inline-flex items-center justify-center rounded-2xl border border-transparent bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-200"
                >
                  ล้าง
                </a>
              </div>
            </form>

            {/* Mini summary */}
            <div className="grid gap-4 md:grid-cols-2">
              <SummaryCard
                label="จำนวนรายการโอน"
                value={formatNumber(data.totalCount)}
                hint="รายการ"
              />
              <SummaryCard
                label="ยอดโอนรวม (ทั้งหมด)"
                value={formatCurrency(txSummary?.totalTransfer ?? 0)}
                hint="บาท"
              />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] bg-slate-50/60 px-4 py-3 text-sm text-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
                <div>รายการทั้งหมด {data.totalCount.toLocaleString()}</div>
                <a
                  href={exportUrl}
                  className="inline-flex items-center gap-1.5 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-100"
                >
                  ⬇ ส่งออก Excel
                </a>
              </div>

              <div className="overflow-auto">
                <table className="min-w-[2200px] w-full border-collapse text-xs">
                  <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-900/60">
                    <tr>
                      <th className="px-3 py-3 text-left">วันที่โอน</th>
                      <th className="px-3 py-3 text-left">ปีงบ</th>
                      <th className="px-3 py-3 text-left">รหัส รพ.</th>
                      <th className="px-3 py-3 text-left">หน่วยบริการ</th>
                      <th className="px-3 py-3 text-left">กองทุน</th>
                      <th className="px-3 py-3 text-right">ยอดจัดสรร</th>
                      <th className="px-3 py-3 text-right">ชะลอโอน</th>
                      <th className="px-3 py-3 text-right">หลักประกัน</th>
                      <th className="px-3 py-3 text-right">ภาษี</th>
                      <th className="px-3 py-3 text-right">หัก</th>
                      <th className="px-3 py-3 text-right">ยอดโอน</th>
                      <th className="px-3 py-3 text-left">แหล่งงบ</th>
                      <th className="px-3 py-3 text-left">รหัสผังบัญชี</th>
                      <th className="px-3 py-3 text-left">MOPH Desc</th>
                      <th className="px-3 py-3 text-center">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.rows.length === 0 ? (
                      <tr>
                        <td colSpan={18} className="px-4 py-10 text-center text-sm text-slate-500">
                          ไม่พบข้อมูลตามตัวกรองที่เลือก
                        </td>
                      </tr>
                    ) : (
                      data.rows.map((row) => (
                        <tr key={row.id} className="border-t border-slate-100 bg-white hover:bg-slate-50 dark:bg-transparent dark:hover:bg-slate-900/20">
                          <td className="px-3 py-2 font-mono whitespace-nowrap">{row.transfer_date ?? "-"}</td>
                          <td className="px-3 py-2 whitespace-nowrap">{row.fiscal_year ?? "-"}</td>
                          <td className="px-3 py-2 font-mono whitespace-nowrap">{row.hoscode ?? "-"}</td>
                          <td className="px-3 py-2 whitespace-nowrap">{row.hosname_short?.trim() || row.hosname || "-"}</td>
                          <td className="px-3 py-2 max-w-[260px]">
                            <div className="truncate text-xs font-medium text-slate-800 dark:text-slate-100">{row.fund_descr ?? "-"}</div>
                            <div className="truncate text-xs text-slate-500">{row.efund_desc ?? "-"}</div>
                          </td>
                          <td className="px-3 py-2 text-right font-mono">{formatCurrency(row.amount ?? 0)}</td>
                          <td className="px-3 py-2 text-right font-mono">{formatCurrency(row.wait_amount ?? 0)}</td>
                          <td className="px-3 py-2 text-right font-mono">{formatCurrency(row.bond_amount ?? 0)}</td>
                          <td className="px-3 py-2 text-right font-mono">{formatCurrency(row.vat_amount ?? 0)}</td>
                          <td className="px-3 py-2 text-right font-mono">{formatCurrency(row.deduct_amount ?? 0)}</td>
                          <td className="px-3 py-2 text-right font-mono font-semibold text-indigo-700 dark:text-indigo-300">{formatCurrency(row.total_amount ?? 0)}</td>
                          <td className="px-3 py-2 whitespace-nowrap">{row.budget_source ?? "-"}</td>
                          <td className="px-3 py-2 font-mono whitespace-nowrap">{row.moph_id ?? "-"}</td>
                          <td className="px-3 py-2 max-w-[200px] truncate">{row.moph_desc ?? "-"}</td>
                          <td className="px-3 py-2 text-center"><StatusPill value={row.payment_status} /></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] bg-slate-50/60 px-4 py-3 text-sm text-slate-700">
                <div>แสดง {fromRecord.toLocaleString()} - {toRecord.toLocaleString()} จาก {data.totalCount.toLocaleString()} รายการ</div>
                <div className="flex items-center gap-3">
                  <PaginationLink
                    disabled={data.page <= 1}
                    label="ก่อนหน้า"
                    href={data.page <= 1 ? undefined : `?${buildQuery(baseQuery, { page: data.page - 1 })}`}
                  />
                  <span className="text-xs text-slate-500">
                    หน้า {data.page.toLocaleString()} / {totalPages.toLocaleString()}
                  </span>
                  <PaginationLink
                    disabled={data.page >= totalPages}
                    label="ถัดไป"
                    href={data.page >= totalPages ? undefined : `?${buildQuery(baseQuery, { page: data.page + 1 })}`}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

function TabLink({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-indigo-600 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
      }`}
    >
      {label}
    </a>
  );
}

function StatCard({
  label,
  value,
  sub,
  valueClass,
}: {
  label: string;
  value: string;
  sub?: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 shadow-sm">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className={`mt-1.5 text-2xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100 ${valueClass ?? ""}`}>
        {value}
      </p>
      {sub ? <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{sub}</p> : null}
    </div>
  );
}

function summarizePie(
  slices: Array<{ label: string; value: number }>,
  maxItems = 6,
) {
  const sorted = [...slices].sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
  if (sorted.length <= maxItems) return sorted;
  const top = sorted.slice(0, maxItems - 1);
  const othersValue = sorted.slice(maxItems - 1).reduce((sum, item) => sum + (item.value ?? 0), 0);
  return [...top, { label: "อื่น ๆ", value: othersValue }];
}

function SummaryCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-emerald-900 dark:text-emerald-100">{value}</p>
      {hint ? <p className="text-xs text-emerald-900/70 dark:text-emerald-100/70">{hint}</p> : null}
    </div>
  );
}

function StatusPill({ value }: { value: string | null }) {
  if (!value) {
    return <span className="mt-1 inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">ไม่ระบุ</span>;
  }
  const color = value === "P" ? "bg-emerald-600" : value === "W" ? "bg-amber-500" : "bg-emerald-800";
  return (
    <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold text-white ${color}`}>
      {value}
    </span>
  );
}

function PaginationLink({
  label,
  href,
  disabled,
}: {
  label: string;
  href?: string;
  disabled?: boolean;
}) {
  if (disabled || !href) {
    return (
      <span className="inline-flex items-center rounded-2xl border border-transparent px-3 py-1.5 text-xs text-emerald-900/40">
        {label}
      </span>
    );
  }
  return (
    <a
      href={href}
      className="inline-flex items-center rounded-2xl border border-emerald-100 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-900"
    >
      {label}
    </a>
  );
}

function toStringParam(value?: string | string[] | null) {
  if (value == null) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

function toPositiveInt(value?: string | null) {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("th-TH").format(value);
}

function buildQuery(
  current: Record<string, string>,
  updates: Record<string, string | number | undefined>,
) {
  const params = new URLSearchParams();
  const merged = { ...current } as Record<string, string>;
  Object.entries(updates).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    merged[key] = String(value);
  });
  Object.entries(merged).forEach(([key, value]) => {
    if (!value) return;
    params.set(key, value);
  });
  return params.toString();
}
