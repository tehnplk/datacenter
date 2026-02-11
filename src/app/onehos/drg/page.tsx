import { onehosClient } from "@/lib/onehos-prisma";

export default async function DrgPage() {
  const drgs = await onehosClient.drg.findMany({
    orderBy: [{ year: "desc" }, { mon: "desc" }, { hoscode: "asc" }],
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800">DRG / CMI รายสถานพยาบาล</h1>
      <p className="mt-1 text-sm text-gray-500">
        ทั้งหมด {drgs.length} รายการ
      </p>

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-green-800">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-green-800">
                รหัส
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-green-800">
                สถานพยาบาล
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-green-800">
                ปี
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-green-800">
                เดือน
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-green-800">
                IPD Case
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-green-800">
                Sum adjRW
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-green-800">
                CMI
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {drgs.map((d, i) => (
              <tr
                key={d.id}
                className="transition-colors hover:bg-green-50/50"
              >
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                  {i + 1}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-mono font-medium text-gray-900">
                  {d.hoscode}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-800">
                  {d.hosname}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-600">
                  {d.year}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-600">
                  {d.mon}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right text-sm font-mono text-gray-800">
                  {d.ipdCase.toLocaleString("th-TH")}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right text-sm font-mono text-gray-800">
                  {d.sumAdjrw.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right text-sm font-mono font-semibold">
                  <span
                    className={
                      d.cmi >= 1.0
                        ? "text-green-700"
                        : "text-orange-600"
                    }
                  >
                    {d.cmi.toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
