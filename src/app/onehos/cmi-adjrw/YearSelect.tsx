"use client";

import { useRouter, useSearchParams } from "next/navigation";

const START_YEAR = 2565;

function getThaiYear() {
  return new Date().getFullYear() + 543;
}

export default function YearSelect({
  currentYear,
}: {
  currentYear?: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const thaiYear = getThaiYear();
  const years = Array.from(
    { length: thaiYear - START_YEAR + 1 },
    (_, i) => thaiYear - i
  );

  return (
    <select
      className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm"
      value={currentYear?.toString() ?? ""}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams.toString());
        const val = e.target.value;
        if (val) {
          params.set("year", val);
        } else {
          params.delete("year");
        }
        router.push(`/onehos/cmi-adjrw?${params.toString()}`);
      }}
    >
      {years.map((y) => (
        <option key={y} value={y}>
          {y}
        </option>
      ))}
    </select>
  );
}
