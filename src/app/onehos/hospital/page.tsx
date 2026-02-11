import { onehosClient } from "@/lib/onehos-prisma";

export default async function HospitalPage() {
  const hospitals = await onehosClient.hospital.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800">รายการโรงพยาบาล</h1>
      <p className="mt-1 text-sm text-gray-500">
        ทั้งหมด {hospitals.length} แห่ง
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
                ชื่อโรงพยาบาล
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-green-800">
                ประเภท รพ.
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-green-800">
                ประเภทหน่วยงาน
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-green-800">
                ตำบล
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-green-800">
                อำเภอ
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-green-800">
                จังหวัด
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-green-800">
                สถานะ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {hospitals.map((h, i) => (
              <tr
                key={h.id}
                className="transition-colors hover:bg-green-50/50"
              >
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                  {i + 1}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-mono font-medium text-gray-900">
                  {h.hoscode}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-800">
                  {h.hosname}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                  {h.hostype ?? "-"}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                  {h.orgtype ?? "-"}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-mono text-gray-600">
                  {h.tmb ?? "-"}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-mono text-gray-600">
                  {h.amp ?? "-"}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-mono text-gray-600">
                  {h.prov ?? "-"}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-center text-sm">
                  {h.activated ? (
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
