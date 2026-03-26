import * as React from "react";
import MetricPage from "@/components/dashboard/MetricPage";
import YearSelect from "@/components/dashboard/YearSelect";
import SpLevelBadge from "@/components/dashboard/SpLevelBadge";
import { dbQuery } from "@/lib/db";

export const dynamic = "force-dynamic";

type DentalRow = {
  hoscode: string;
  hosname: string | null;
  hosname_short: string | null;
  size_level: string | null;
  y: number;
  m: number;
  visit: number | null;
};

type HosRow = {
  hoscode: string;
  hosname: string | null;
  hosname_short: string | null;
  size_level: string | null;
  total_visit: number;
};

type MetaRow = {
  last_update: string | null;
};

function toInt(v: string | undefined) {
  if (!v) return undefined;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : undefined;
}

function fmtNum(n: number) {
  return new Intl.NumberFormat("th-TH").format(n);
}

function displayHosName(name?: string | null, shortName?: string | null) {
  const s = shortName?.trim();
  if (s) return s;
  if (!name) return "-";
  const raw = name.trim();
  if (raw.includes("สมเด็จพระยุพราชนครไทย")) return "รพร.นครไทย";
  if (raw.includes("พุทธชินราช")) return "รพศ.พุทธชินราช";
  return raw.replace(/^โรงพยาบาล\s*/u, "รพ.");
}

const THAI_MONTHS_SHORT = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

type TabKey = "overview" | "by-hospital";
const TABS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "ภาพรวม" },
  { key: "by-hospital", label: "รายโรงพยาบาล" },
];

export default async function Page({
  searchParams,
}: {
  searchParams?: { year?: string; tab?: string; hos?: string } | Promise<{ year?: string; tab?: string; hos?: string }>;
}) {
  const sp = await Promise.resolve(searchParams ?? {});
  const selectedTab: TabKey = sp.tab === "by-hospital" ? "by-hospital" : "overview";
  const selectedHos = sp.hos ?? null;

  const years = await dbQuery<{ y: number }>(
    `SELECT DISTINCT y FROM public.transform_sync_dental_monthly ORDER BY y DESC`,
  ).then((r) => r.map((x) => x.y));

  const selectedYear = toInt(sp.year) ?? (years.length ? years[0] : new Date().getFullYear());

  const [rows, meta] = await Promise.all([
    dbQuery<DentalRow>(
      `SELECT d.hoscode, h.hosname, h.hosname_short, h.size_level, d.y, d.m, d.visit
       FROM public.transform_sync_dental_monthly d
       JOIN public.c_hos h ON h.hoscode = d.hoscode
       WHERE d.y = $1
       ORDER BY h.hosname ASC, d.m ASC`,
      [selectedYear],
    ),
    dbQuery<MetaRow>(
      `SELECT max(d_update)::text AS last_update FROM public.transform_sync_dental_monthly`,
    ).then((r) => r[0] ?? { last_update: null }),
  ]);

  const monthTotals = new Map<number, number>();
  for (const r of rows) {
    const v = r.visit ?? 0;
    monthTotals.set(r.m, (monthTotals.get(r.m) ?? 0) + v);
  }
  const totalAll = [...monthTotals.values()].reduce((a, b) => a + b, 0);

  const hosMap = new Map<string, HosRow & { byMonth: Map<number, number> }>();
  for (const r of rows) {
    if (!hosMap.has(r.hoscode)) {
      hosMap.set(r.hoscode, {
        hoscode: r.hoscode,
        hosname: r.hosname,
        hosname_short: r.hosname_short,
        size_level: r.size_level,
        total_visit: 0,
        byMonth: new Map(),
      });
    }
    const h = hosMap.get(r.hoscode)!;
    const v = r.visit ?? 0;
    h.total_visit += v;
    h.byMonth.set(r.m, (h.byMonth.get(r.m) ?? 0) + v);
  }

  const hosList = [...hosMap.values()].sort((a, b) => b.total_visit - a.total_visit);
  const activeHos = selectedHos ?? (hosList.length ? hosList[0].hoscode : null);
  const activeHosData = hosMap.get(activeHos ?? "");

  const thCls =
    "border border-zinc-200 px-2 py-1.5 text-center text-[10px] font-semibold text-zinc-600 dark:border-zinc-800 dark:text-zinc-300 whitespace-nowrap";
  const tdCls = "border border-zinc-200 px-2 py-1.5 text-[11px] dark:border-zinc-800";
  const tdNum = `${tdCls} text-right tabular-nums`;

  return (
    <MetricPage
      title="Dental: ผู้รับบริการทันตกรรมรายเดือน"
      description="จำนวน visit ทันตกรรมรายเดือน (ราย รพ.)"
      showTopCards={false}
      contentWidth="full"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          อัปเดต: {meta.last_update?.slice(0, 19) ?? "-"}
        </div>
        <YearSelect years={years} value={selectedYear} />
      </div>

      {years.length === 0 && (
        <div className="mt-6 rounded-xl bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500 ring-1 ring-zinc-200/70 dark:bg-zinc-900 dark:text-zinc-400 dark:ring-white/10">
          ยังไม่มีข้อมูลในตาราง transform_sync_dental_monthly
        </div>
      )}

      {years.length > 0 && (
        <>
          <div className="mt-4 flex gap-1 border-b border-zinc-200/70 dark:border-white/10">
            {TABS.map((tab) => {
              const active = tab.key === selectedTab;
              const params = new URLSearchParams({ year: String(selectedYear), tab: tab.key });
              return (
                <a
                  key={tab.key}
                  href={`?${params.toString()}`}
                  className={`px-4 py-2 text-xs font-medium rounded-t-lg border border-b-0 transition-colors whitespace-nowrap ${
                    active
                      ? "border-zinc-200/70 bg-white text-zinc-900 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50"
                      : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {tab.label}
                </a>
              );
            })}
          </div>

          {selectedTab === "overview" && (
            <div className="overflow-hidden rounded-b-xl rounded-tr-xl ring-1 ring-zinc-200/70 dark:ring-white/10">
              <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
                <span className="font-semibold text-zinc-700 dark:text-zinc-200">รวมทุกโรงพยาบาล</span>
                <span>ปี {selectedYear} • รวม {fmtNum(totalAll)} visit</span>
              </div>
              <div className="overflow-auto bg-white dark:bg-zinc-950">
                <table className="w-full max-w-3xl text-sm">
                  <colgroup>
                    <col className="w-20" />
                    {Array.from({ length: 12 }, () => null).map((_, idx) => (
                      <col key={idx} className="w-24" />
                    ))}
                    <col className="w-28" />
                  </colgroup>
                  <thead className="bg-zinc-50 dark:bg-zinc-900">
                    <tr>
                      <th className={`${thCls} text-left`}>รายการ</th>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <th key={m} className={thCls}>{THAI_MONTHS_SHORT[m - 1] ?? `M${m}`}</th>
                      ))}
                      <th className={thCls}>รวม</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd:bg-white even:bg-zinc-50/60 dark:odd:bg-zinc-950 dark:even:bg-zinc-900">
                      <td className={`${tdCls} font-medium`}>Visit</td>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <td key={m} className={`${tdNum} font-semibold`}>{fmtNum(monthTotals.get(m) ?? 0)}</td>
                      ))}
                      <td className={`${tdNum} font-bold text-green-700 dark:text-green-400`}>{fmtNum(totalAll)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="border-t border-zinc-200 bg-white px-3 py-1.5 text-right text-[11px] text-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-500">
                ข้อมูลจากตาราง: <span className="font-mono">transform_sync_dental_monthly</span>
              </div>
            </div>
          )}

          {selectedTab === "by-hospital" && (
            <div className="overflow-hidden rounded-b-xl rounded-tr-xl ring-1 ring-zinc-200/70 dark:ring-white/10">
              <div className="overflow-x-auto border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex min-w-max gap-0.5 px-2 pt-2">
                  {hosList.map((h) => {
                    const isActive = h.hoscode === activeHos;
                    const params = new URLSearchParams({ year: String(selectedYear), tab: "by-hospital", hos: h.hoscode });
                    return (
                      <a
                        key={h.hoscode}
                        href={`?${params.toString()}`}
                        className={`flex items-center gap-1 rounded-t-md border border-b-0 px-3 py-1.5 text-[11px] font-medium whitespace-nowrap transition-colors ${
                          isActive
                            ? "border-zinc-200 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                            : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                        }`}
                      >
                        <SpLevelBadge level={h.size_level} />
                        {displayHosName(h.hosname, h.hosname_short)}
                        <span className="ml-1 rounded-full bg-green-100 px-1.5 py-0.5 text-[9px] font-bold text-green-700 dark:bg-green-950/50 dark:text-green-400">
                          {fmtNum(h.total_visit)}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {activeHosData ? (
                <div className="bg-white dark:bg-zinc-950">
                  <div className="border-b border-zinc-200 px-3 py-2 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-200">
                      {displayHosName(activeHosData.hosname, activeHosData.hosname_short)}
                    </span>
                    <span className="ml-3">ปี {selectedYear} • รวม {fmtNum(activeHosData.total_visit)} visit</span>
                  </div>

                  <div className="overflow-auto">
                    <table className="w-full max-w-3xl text-[11px]">
                      <colgroup>
                        <col className="w-24" />
                        {Array.from({ length: 12 }, () => null).map((_, idx) => (
                          <col key={idx} className="w-24" />
                        ))}
                        <col className="w-28" />
                      </colgroup>
                      <thead className="bg-zinc-50 dark:bg-zinc-900">
                        <tr>
                          <th className={`${thCls} text-left`}>รายการ</th>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                            <th key={m} className={thCls}>{THAI_MONTHS_SHORT[m - 1] ?? `M${m}`}</th>
                          ))}
                          <th className={thCls}>รวม</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="odd:bg-white even:bg-zinc-50/60 dark:odd:bg-zinc-950 dark:even:bg-zinc-900">
                          <td className={`${tdCls} font-medium`}>Visit</td>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
                            const v = activeHosData.byMonth.get(m) ?? 0;
                            return (
                              <td key={m} className={`${tdNum} font-semibold`}>{fmtNum(v)}</td>
                            );
                          })}
                          <td className={`${tdNum} font-bold text-green-700 dark:text-green-400`}>{fmtNum(activeHosData.total_visit)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-10 text-center text-sm text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-950">ไม่พบข้อมูล</div>
              )}

              <div className="border-t border-zinc-200 bg-white px-3 py-1.5 text-right text-[11px] text-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-500">
                ข้อมูลจากตาราง: <span className="font-mono">transform_sync_dental_monthly</span>
              </div>
            </div>
          )}
        </>
      )}
    </MetricPage>
  );
}
