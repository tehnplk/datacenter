import { pm25Client } from "@/lib/pm25-prisma";

export default async function AreaPage() {
  const areas = await pm25Client.area.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800">พื้นที่ตรวจวัด PM 2.5</h1>
      <p className="mt-1 text-sm text-gray-500">
        ทั้งหมด {areas.length} อำเภอ
      </p>

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-green-800">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-green-800">
                รหัสอำเภอ
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-green-800">
                ชื่ออำเภอ
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-green-800">
                สถานะ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {areas.map((a, i) => (
              <tr
                key={a.id}
                className="transition-colors hover:bg-green-50/50"
              >
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                  {i + 1}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-mono font-medium text-gray-900">
                  {a.areaCode}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-800">
                  {a.areaName}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-center text-sm">
                  {a.activated ? (
                    <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      เปิดใช้งาน
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                      ปิดใช้งาน
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
