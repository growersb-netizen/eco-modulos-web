import { prisma } from '@/lib/db'
import MetricCard from '@/components/admin/MetricCard'
import DashboardChart from '@/components/admin/DashboardChart'
import { LayoutDashboard, Users, Clock, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 0

function startOfDay(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}
function startOfWeek() {
  const d = new Date()
  d.setDate(d.getDate() - d.getDay())
  return startOfDay(d)
}
function startOfMonth() {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

const ESTADO_COLOR: Record<string, string> = {
  nuevo:          'bg-eco-green/20 text-eco-green',
  contactado:     'bg-blue-900/30 text-blue-400',
  en_seguimiento: 'bg-yellow-900/30 text-yellow-400',
  cerrado:        'bg-eco-teal/20 text-eco-teal',
  perdido:        'bg-red-900/30 text-red-400',
}

export default async function DashboardPage() {
  const hoy = startOfDay()
  const semana = startOfWeek()
  const mes = startOfMonth()

  const [leadsHoy, leadsSemana, leadsMes, leadsPendientes, ultimosLeads, leadsChart] = await Promise.all([
    prisma.lead.count({ where: { creadoEn: { gte: hoy } } }),
    prisma.lead.count({ where: { creadoEn: { gte: semana } } }),
    prisma.lead.count({ where: { creadoEn: { gte: mes } } }),
    prisma.lead.count({ where: { estado: 'nuevo' } }),
    prisma.lead.findMany({
      orderBy: { creadoEn: 'desc' },
      take: 10,
      select: {
        id: true, nombre: true, telefono: true, producto_interes: true,
        localidad: true, vendedor_asignado: true, estado: true, creadoEn: true,
      },
    }),
    prisma.lead.findMany({
      where: { creadoEn: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
      select: { creadoEn: true, producto_interes: true },
    }),
  ])

  // Agrupar leads por día para el gráfico
  const chartMap: Record<string, { modulos: number; piscinas: number; combos: number }> = {}
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`
    chartMap[key] = { modulos: 0, piscinas: 0, combos: 0 }
  }

  for (const lead of leadsChart) {
    const d = lead.creadoEn
    const key = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`
    if (!chartMap[key]) continue
    const p = lead.producto_interes.toLowerCase()
    if (p.includes('combo')) chartMap[key].combos++
    else if (p.includes('piscin')) chartMap[key].piscinas++
    else chartMap[key].modulos++
  }

  const chartData = Object.entries(chartMap).map(([fecha, vals]) => ({ fecha, ...vals }))

  function tiempoRelativo(d: Date) {
    const seg = Math.floor((Date.now() - d.getTime()) / 1000)
    if (seg < 60) return 'hace un momento'
    if (seg < 3600) return `hace ${Math.floor(seg / 60)}m`
    if (seg < 86400) return `hace ${Math.floor(seg / 3600)}h`
    return `hace ${Math.floor(seg / 86400)}d`
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>
        Dashboard
      </h1>

      {/* Métricas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard titulo="Leads hoy" valor={leadsHoy} icono={<LayoutDashboard className="w-4 h-4" />} color="green" />
        <MetricCard titulo="Esta semana" valor={leadsSemana} icono={<Users className="w-4 h-4" />} color="teal" />
        <MetricCard titulo="Este mes" valor={leadsMes} icono={<Clock className="w-4 h-4" />} color="yellow" />
        <MetricCard titulo="Sin contactar" valor={leadsPendientes} icono={<AlertCircle className="w-4 h-4" />} color="red" />
      </div>

      {/* Gráfico */}
      <DashboardChart data={chartData} />

      {/* Últimos leads */}
      <div className="bg-eco-bg-card border border-eco-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-eco-border">
          <h3 className="font-semibold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>
            Últimos 10 leads
          </h3>
          <Link href="/admin/leads" className="text-eco-green text-sm hover:underline">
            Ver todos →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-eco-border">
                {['Nombre/Tel', 'Producto', 'Localidad', 'Vendedor', 'Estado', 'Cuándo'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-eco-text-muted text-xs uppercase tracking-wider font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-eco-border">
              {ultimosLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-eco-bg-surface transition-colors">
                  <td className="px-4 py-3 text-eco-text">
                    <p>{lead.nombre || '—'}</p>
                    <p className="text-eco-text-muted text-xs">{lead.telefono}</p>
                  </td>
                  <td className="px-4 py-3 text-eco-text-muted capitalize">{lead.producto_interes}</td>
                  <td className="px-4 py-3 text-eco-text-muted">{lead.localidad || '—'}</td>
                  <td className="px-4 py-3 text-eco-text-muted capitalize">{lead.vendedor_asignado}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${ESTADO_COLOR[lead.estado] || 'bg-gray-800 text-gray-400'}`}>
                      {lead.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-eco-text-muted text-xs">{tiempoRelativo(lead.creadoEn)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
