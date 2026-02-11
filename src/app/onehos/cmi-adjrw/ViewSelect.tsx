"use client";

import { useRouter, useSearchParams } from "next/navigation";

const METRIC_OPTIONS = [
  { value: "case", label: "Case" },
  { value: "rw", label: "adjRW" },
  { value: "cmi", label: "CMI" },
] as const;

export type MetricKey = (typeof METRIC_OPTIONS)[number]["value"];

export default function ViewSelect({
  selected,
}: {
  selected: MetricKey[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isAll = selected.length === 0 || selected.length === 3;

  const toggle = (v: MetricKey) => {
    const current = new Set(selected.length === 0 ? ["case", "rw", "cmi"] as MetricKey[] : selected);
    if (current.has(v)) {
      current.delete(v);
    } else {
      current.add(v);
    }
    if (current.size === 0) {
      current.add(v);
    }

    const params = new URLSearchParams(searchParams.toString());
    if (current.size === 3) {
      params.delete("view");
    } else {
      const sorted = [...current];
      params.set("view", sorted.join(","));
    }
    router.push(`/onehos/cmi-adjrw?${params.toString()}`);
  };

  const selectAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("view");
    router.push(`/onehos/cmi-adjrw?${params.toString()}`);
  };

  return (
    <>
      {METRIC_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => toggle(opt.value)}
          className={`cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            isAll || selected.includes(opt.value)
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {opt.label}
        </button>
      ))}
      <button
        type="button"
        onClick={selectAll}
        className={`cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
          isAll
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All
      </button>
    </>
  );
}
