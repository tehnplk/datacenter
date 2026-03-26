'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface OverviewFiscalYearFilterProps {
  fiscalYears: string[];
  currentFiscalYear?: string;
  otherFilters: {
    hoscode?: string;
    efundDesc?: string;
    limit?: number;
  };
}

export function OverviewFiscalYearFilter({
  fiscalYears,
  currentFiscalYear,
  otherFilters,
}: OverviewFiscalYearFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    
    // Update fiscal year
    if (e.target.value) {
      params.set('fiscalYear', e.target.value);
    } else {
      params.delete('fiscalYear');
    }
    
    // Keep other filters for data grid
    if (otherFilters.hoscode) params.set('hoscode', otherFilters.hoscode);
    if (otherFilters.efundDesc) params.set('efundDesc', otherFilters.efundDesc);
    if (otherFilters.limit) params.set('limit', String(otherFilters.limit));
    
    router.push(`?${params.toString()}`);
  };

  return (
    <form className="flex items-center gap-2">
      <label htmlFor="overview-fiscal-year" className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
        ปีงบ:
      </label>
      <select
        id="overview-fiscal-year"
        name="fiscalYear"
        value={currentFiscalYear ?? ''}
        onChange={handleChange}
        className="rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-sm text-emerald-900 shadow-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-700 dark:bg-emerald-900 dark:text-emerald-100"
      >
        <option value="">ทุกปีงบ</option>
        {fiscalYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
}
