"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dailyEnergy, productionData } from "@/lib/data";

const tooltipStyle = {
  borderRadius: 8,
  border: "1px solid #dbe4ee",
  boxShadow: "0 10px 30px rgba(7,20,38,0.12)",
};

export function ProductionConsumptionChart({ compact = false }: { compact?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const heightClass = compact ? "h-[250px]" : "h-[340px]";

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return <div className={heightClass} />;
  }

  return (
    <div className={heightClass}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={productionData} margin={{ top: 12, right: 12, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="production" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#12d66b" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#12d66b" stopOpacity={0.03} />
            </linearGradient>
            <linearGradient id="consumption" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#071426" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#071426" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5edf5" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
          <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value} kWh`, ""]} />
          <Legend iconType="circle" />
          <Area
            type="monotone"
            dataKey="productie"
            name="Producție"
            stroke="#12d66b"
            strokeWidth={3}
            fill="url(#production)"
          />
          <Area
            type="monotone"
            dataKey="consum"
            name="Consum"
            stroke="#071426"
            strokeWidth={3}
            fill="url(#consumption)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DailyEnergyChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return <div className="h-[310px]" />;
  }

  return (
    <div className="h-[310px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dailyEnergy} margin={{ top: 10, right: 12, left: -18, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5edf5" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value} kWh`, ""]} />
          <Legend iconType="circle" />
          <Bar dataKey="productie" name="Producție" radius={[6, 6, 0, 0]} fill="#12d66b" />
          <Bar dataKey="consum" name="Consum" radius={[6, 6, 0, 0]} fill="#071426" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
