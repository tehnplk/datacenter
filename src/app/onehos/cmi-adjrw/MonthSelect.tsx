"use client";

import { useRouter, useSearchParams } from "next/navigation";

const THAI_MONTHS = [
  "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
  "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
] as const;

export default function MonthSelect({
  selectedMonths,
}: {
  selectedMonths: number[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggle = (m: number) => {
    const current = new Set(selectedMonths);
    if (current.has(m)) {
      current.delete(m);
    } else {
      current.add(m);
    }

    const params = new URLSearchParams(searchParams.toString());
    if (current.size === 0 || current.size === 12) {
      params.delete("months");
    } else {
      const sorted = [...current].sort((a, b) => a - b);
      params.set("months", sorted.join(","));
    }
    params.delete("month");
    router.push(`/onehos/cmi-adjrw?${params.toString()}`);
  };

  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("months");
    params.delete("month");
    router.push(`/onehos/cmi-adjrw?${params.toString()}`);
  };

  const isAllSelected = selectedMonths.length === 0 || selectedMonths.length === 12;

  return (
    <>
      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => toggle(m)}
          className={`cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            selectedMonths.includes(m)
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {THAI_MONTHS[m - 1]}
        </button>
      ))}
      <button
        type="button"
        onClick={clearAll}
        className={`cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
          isAllSelected
            ? "bg-green-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All
      </button>
    </>
  );
}
