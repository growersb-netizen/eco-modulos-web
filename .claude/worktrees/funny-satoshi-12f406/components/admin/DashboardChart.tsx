'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface DataPoint {
  fecha: string
  modulos: number
  piscinas: number
  combos: number
}

interface DashboardChartProps {
  data: DataPoint[]
}

export default function DashboardChart({ data }: DashboardChartProps) {
  return (
    <div className="bg-eco-bg-card border border-eco-border rounded-xl p-6">
      <h3 className="text-eco-text font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Leads últimos 30 días
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorModulos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2d9e4f" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2d9e4f" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPiscinas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00b8a9" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00b8a9" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCombos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis dataKey="fecha" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8 }}
            labelStyle={{ color: '#f5f5f5' }}
            itemStyle={{ color: '#9ca3af' }}
          />
          <Legend wrapperStyle={{ color: '#9ca3af', fontSize: 12 }} />
          <Area type="monotone" dataKey="modulos" name="Módulos" stroke="#2d9e4f" fill="url(#colorModulos)" strokeWidth={2} />
          <Area type="monotone" dataKey="piscinas" name="Piscinas" stroke="#00b8a9" fill="url(#colorPiscinas)" strokeWidth={2} />
          <Area type="monotone" dataKey="combos" name="Combos" stroke="#f59e0b" fill="url(#colorCombos)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
