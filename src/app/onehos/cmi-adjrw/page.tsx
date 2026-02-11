import React from "react";
import { onehosClient } from "@/lib/onehos-prisma";
import YearSelect from "./YearSelect";
import MonthSelect from "./MonthSelect";

export const revalidate = 0;

type SearchParams = {
  year?: string;
  months?: string;
};

const THAI_MONTHS = [
  "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
  "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
] as const;

const formatMonth = (mon: number) => mon.toString().padStart(2, "0");

const formatMonthThai = (mon: number) => THAI_MONTHS[mon - 1] ?? formatMonth(mon);

const parseFilterNumber = (value?: string) => {
  if (!value) return undefined;
  const num = Number(value);
  return Number.isFinite(num) ? num : undefined;
};

export default async function DrgsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const monthsFilter: number[] = params.months
    ? params.months
        .split(",")
        .map(Number)
        .filter((n) => Number.isFinite(n) && n >= 1 && n <= 12)
    : [];

  const currentThaiYear = new Date().getFullYear() + 543;
  const yearFilter = parseFilterNumber(params.year) ?? currentThaiYear;

  const drgs = await onehosClient.drgs.findMany({
    where: {
      ...(yearFilter ? { year: yearFilter } : {}),
      ...(monthsFilter.length > 0 ? { mon: { in: monthsFilter } } : {}),
    },
    orderBy: [{ hoscode: "asc" }, { mon: "asc" }],
  });

  // Pivot: collect unique months (sorted) and group by hospital
  const monthSet = new Set<number>();
  const hosMap = new Map<
    string,
    { hoscode: string; hosname: string; data: Map<number, typeof drgs[0]> }
  >();

  for (const d of drgs) {
    monthSet.add(d.mon);
    if (!hosMap.has(d.hoscode)) {
      hosMap.set(d.hoscode, {
        hoscode: d.hoscode,
        hosname: d.hosname,
        data: new Map(),
      });
    }
    hosMap.get(d.hoscode)!.data.set(d.mon, d);
  }

  const displayMonths = monthsFilter.length > 0
    ? monthsFilter.sort((a, b) => a - b)
    : Array.from({ length: 12 }, (_, i) => i + 1);
  const hospitals = [...hosMap.values()];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800">DRG / CMI รายหน่วยงาน</h1>
      <p className="mt-1 text-sm text-gray-500">
        {hospitals.length} หน่วยงาน · {drgs.length} รายการ
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <YearSelect
          currentYear={yearFilter}
        />
        <MonthSelect selectedMonths={monthsFilter} />
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-50">
            {displayMonths.length > 1 ? (
              <>
                <tr>
                  <th
                    rowSpan={2}
                    className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-green-800 border-b border-gray-200"
                  >
                    #
                  </th>
                  <th
                    rowSpan={2}
                    className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-green-800 border-b border-gray-200"
                  >
                    รหัส
                  </th>
                  <th
                    rowSpan={2}
                    className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-green-800 border-b border-gray-200"
                  >
                    หน่วยงาน
                  </th>
                  {displayMonths.map((m) => (
                    <th
                      key={m}
                      colSpan={3}
                      className="border-b border-l border-gray-200 px-2 py-2 text-center text-xs font-bold uppercase tracking-wider text-green-900"
                    >
                      {formatMonthThai(m)}
                    </th>
                  ))}
                </tr>
                <tr>
                  {displayMonths.map((m) => (
                    <React.Fragment key={m}>
                      <th className="h-10 px-1 border-l border-gray-200">
                        <span className="inline-block -rotate-45 text-[8px] font-semibold uppercase text-green-700 whitespace-nowrap">
                          case
                        </span>
                      </th>
                      <th className="h-10 px-1">
                        <span className="inline-block -rotate-45 text-[8px] font-semibold uppercase text-green-700 whitespace-nowrap">
                          rw
                        </span>
                      </th>
                      <th className="h-10 px-1">
                        <span className="inline-block -rotate-45 text-[8px] font-semibold uppercase text-green-700 whitespace-nowrap">
                          cmi
                        </span>
                      </th>
                    </React.Fragment>
                  ))}
                </tr>
              </>
            ) : (
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-green-800">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-green-800">
                  รหัส
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-green-800">
                  หน่วยงาน
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-green-800">
                  IP Case
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-green-800">
                  Sum AdjRW
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-green-800">
                  CMI
                </th>
              </tr>
            )}
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {hospitals.map((h, i) => (
              <tr
                key={h.hoscode}
                className="transition-colors hover:bg-green-50/50"
              >
                <td className="whitespace-nowrap px-4 py-2 text-xs text-gray-500">
                  {i + 1}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-xs font-mono font-medium text-gray-900">
                  {h.hoscode}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-xs text-gray-800">
                  {h.hosname}
                </td>
                {displayMonths.map((m) => {
                  const d = h.data.get(m);
                  return (
                    <React.Fragment key={m}>
                      <td className="whitespace-nowrap px-2 py-2 text-right text-xs font-mono text-gray-800 border-l border-gray-100">
                        {d ? d.ipdCase.toLocaleString("th-TH") : "-"}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-right text-xs font-mono text-gray-800">
                        {d
                          ? d.sumAdjrw.toLocaleString("th-TH", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : "-"}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-right text-xs font-mono font-semibold">
                        {d ? (
                          <span
                            className={
                              d.cmi >= 1.0
                                ? "text-green-700"
                                : "text-orange-600"
                            }
                          >
                            {d.cmi.toFixed(2)}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
