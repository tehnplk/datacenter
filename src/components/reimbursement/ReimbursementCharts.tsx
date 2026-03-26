'use client';

import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import type { HospitalBarDetailed } from '@/lib/reimbursement';

const PIE_COLORS = [
  "#065f46",
  "#047857", 
  "#10b981",
  "#34d399",
  "#6ee7b7",
  "#a7f3d0",
];

interface PieData {
  name: string;
  value: number;
}

interface BarData {
  name: string;
  value: number;
}

interface ReimbursementChartsProps {
  pieData: PieData[];
  barData: BarData[];
  pieTotal: number;
}

interface OverviewChartsProps {
  pieData: PieData[];
  pieTotal: number;
  hospitalBars: HospitalBarDetailed[];
  hidePieChart?: boolean;
}

export function ReimbursementCharts({ pieData, barData, pieTotal }: ReimbursementChartsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('th-TH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-emerald-200 bg-white p-2 shadow-lg dark:border-emerald-700 dark:bg-emerald-900">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
            {label}
          </p>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            ฿{formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // Don't show label for small slices

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-[var(--border)] bg-white/70 p-5 shadow-sm dark:bg-emerald-950/60">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-600">กองทุนย่อย (P เท่านั้น)</p>
            <p className="text-lg font-semibold text-emerald-900 dark:text-emerald-50">
              ฿{formatCurrency(pieTotal)}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 lg:flex-row">
          <ResponsiveContainer width={224} height={224}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomPieLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <ul className="w-full space-y-3 text-sm">
            {pieData.length === 0 ? (
              <li className="text-emerald-900/60">ไม่มีข้อมูลสถานะ P</li>
            ) : (
              pieData.map((slice, idx) => (
                <li key={slice.name} className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                    />
                    {slice.name}
                  </span>
                  <span className="font-mono text-sm text-emerald-900 dark:text-emerald-50">
                    ฿{formatCurrency(slice.value)}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="rounded-3xl border border-[var(--border)] bg-white/70 p-5 shadow-sm dark:bg-emerald-950/60">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-600">รายรับรวมตามหน่วยบริการ</p>
            <p className="text-lg font-semibold text-emerald-900 dark:text-emerald-50">
              Top {barData.length} Hospitals
            </p>
          </div>
        </div>
        {barData.length === 0 ? (
          <div className="py-8 text-sm text-emerald-900/70">ไม่มีข้อมูลตามตัวกรอง</div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={barData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fill: '#065f46', fontSize: 12 }}
                tickLine={{ stroke: '#065f46' }}
              />
              <YAxis
                tick={{ fill: '#065f46', fontSize: 12 }}
                tickLine={{ stroke: '#065f46' }}
                tickFormatter={(value) => `฿${(value / 100_000).toFixed(1)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill="url(#colorGradient)"
                animationBegin={0}
                animationDuration={800}
                radius={[8, 8, 0, 0]}
              >
                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={(v: any) => typeof v === 'number' && v > 0 ? `${(v / 100_000).toFixed(1)}K` : ''}
                  fill="#065f46"
                  fontSize={11}
                  fontWeight={500}
                />
              </Bar>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                  <stop offset="100%" stopColor="#047857" stopOpacity={1} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

const BAR_SERIES = [
  { key: "ยอดจัดสรร", color: "#fef08a" }, // สีเหลืองอ่อน (yellow-200)
  { key: "ยอดโอน",    color: "#22c55e" }, // สีเขียว (green-500)
];

export function OverviewCharts({ pieData, pieTotal, hospitalBars, hidePieChart }: OverviewChartsProps) {
  const [hiddenSlices, setHiddenSlices] = useState<Set<string>>(new Set());
  const [hiddenBars,   setHiddenBars]   = useState<Set<string>>(new Set(["ยอดจัดสรร"]));

  const fmtM  = (v: number) => `${(v / 1_000_000).toFixed(2)} ล้าน`;
  const fmt   = (v: number) => new Intl.NumberFormat('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);

  const toggleSlice = (name: string) =>
    setHiddenSlices((p) => { const s = new Set(p); s.has(name) ? s.delete(name) : s.add(name); return s; });
  const toggleBar = (key: string) =>
    setHiddenBars((p) => { const s = new Set(p); s.has(key) ? s.delete(key) : s.add(key); return s; });

  const visiblePie = pieData.filter((d) => !hiddenSlices.has(d.name));

  const barData = hospitalBars.map((h) => ({
    name: h.hosname_short?.trim() || h.hosname || h.hoscode || 'ไม่ทราบ',
    ยอดจัดสรร: h.totalAllocated,
    ยอดโอน: h.totalTransfer,
  }));

  const BarTip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-lg text-sm">
        <p className="font-semibold text-slate-800 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.fill }}>{p.name}: {fmt(p.value)}</p>
        ))}
      </div>
    );
  };

  const PieTip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-lg text-sm">
        <p className="font-semibold text-slate-800 mb-1">{payload[0].name}</p>
        <p className="text-slate-600">{fmt(payload[0].value)}</p>
      </div>
    );
  };

  const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.06) return null;
    const r = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + r * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + r * Math.sin((-midAngle * Math.PI) / 180);
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className={`grid gap-6 ${hidePieChart ? 'grid-cols-1' : 'lg:grid-cols-2'}`}>
      {/* ── Donut: สัดส่วนกองทุน ── */}
      {!hidePieChart && (
        <div className="rounded-3xl border border-[var(--border)] bg-white/70 p-5 shadow-sm dark:bg-emerald-950/60">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-600">สัดส่วนกองทุน</p>
        <p className="mb-3 text-sm text-emerald-900/70 dark:text-emerald-100/60">คลิกรายการเพื่อซ่อน/แสดง</p>

        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={visiblePie}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={85}
              labelLine={false}
              label={CustomPieLabel}
              dataKey="value"
              animationBegin={0}
              animationDuration={500}
            >
              {visiblePie.map((entry) => {
                const origIdx = pieData.findIndex((d) => d.name === entry.name);
                return <Cell key={entry.name} fill={PIE_COLORS[origIdx % PIE_COLORS.length]} />;
              })}
            </Pie>
            <Tooltip content={<PieTip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Clickable legend below – left-aligned with amounts */}
        <ul className="mt-3 space-y-1.5">
          {pieData.map((slice, idx) => {
            const hidden = hiddenSlices.has(slice.name);
            const color  = PIE_COLORS[idx % PIE_COLORS.length];
            return (
              <li
                key={slice.name}
                onClick={() => toggleSlice(slice.name)}
                className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:opacity-80 transition"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-3 w-3 shrink-0 rounded-full transition-opacity"
                    style={{ backgroundColor: hidden ? '#d1d5db' : color }}
                  />
                  <span className={`truncate text-xs ${hidden ? 'text-slate-400 line-through' : 'text-emerald-900 dark:text-emerald-100'}`}>
                    {slice.name}
                  </span>
                </span>
                <span className={`shrink-0 font-mono text-xs ${hidden ? 'text-slate-400' : 'text-emerald-900/70 dark:text-emerald-100/60'}`}>
                  {fmtM(slice.value)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      )}

      {/* ── Horizontal Grouped Bar ── */}
      <div className="rounded-3xl border border-[var(--border)] bg-white/70 p-5 shadow-sm dark:bg-emerald-950/60">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-600">งบประมาณตามหน่วยบริการ</p>

        {/* Clickable bar legend */}
        <div className="mb-3 flex gap-4">
          {BAR_SERIES.map(({ key, color }) => {
            const hidden = hiddenBars.has(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleBar(key)}
                className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition hover:opacity-80 ${
                  hidden ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500' : 'bg-slate-50 text-slate-700 dark:bg-slate-800/60 dark:text-slate-200'
                }`}
              >
                <span className="h-3 w-3 rounded-sm shrink-0 transition-opacity" style={{ backgroundColor: hidden ? '#d1d5db' : color }} />
                {key}
              </button>
            );
          })}
        </div>

        {barData.length === 0 ? (
          <div className="py-8 text-sm text-emerald-900/70">ไม่มีข้อมูล</div>
        ) : (
          <ResponsiveContainer width="100%" height={Math.max(220, barData.length * 52)}>
            <BarChart layout="vertical" data={barData} margin={{ top: 0, right: 16, left: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fill: '#065f46', fontSize: 11 }} tickFormatter={(v) => `${(v / 100_000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="name" width={110} tick={{ fill: '#065f46', fontSize: 11 }} />
              <Tooltip content={<BarTip />} />
              {BAR_SERIES.map(({ key, color }) => (
                <Bar key={key} dataKey={key} fill={color} hide={hiddenBars.has(key)} radius={[0, 4, 4, 0]} animationDuration={400}>
                  <LabelList
                    dataKey={key}
                    position="right"
                    formatter={(v: any) => typeof v === 'number' && v > 0 ? `${(v / 100_000).toFixed(1)}K` : ''}
                    fill="#065f46"
                    fontSize={10}
                    fontWeight={500}
                  />
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
