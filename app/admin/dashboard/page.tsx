import { prisma } from '@/lib/db'
import MetricCard from '@/components/admin/MetricCard'
import { Boxes, Waves, BookOpen, Star, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 0

export default async function DashboardPage() {
  const [modulosActivos, piscinasActivas, articulosPublicados, testimoniosActivos, obras] =
    await Promise.all([
      prisma.modulo.count({ where: { activo: true } }),
      prisma.piscina.count({ where: { activo: true } }),
      prisma.articuloBlog.count({ where: { publicado: true } }),
      prisma.testimonio.count({ where: { activo: true } }),
      prisma.obra.findMany({ where: { activo: true }, take: 5, orderBy: { creadoEn: 'desc' } }),
    ])

  const CRM_URL = 'https://eco-crm-dawn-fog-5476.fly.dev'

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>
        Dashboard
      </h1>

      {/* Banner CRM */}
      <div className="flex items-center justify-between gap-4 bg-eco-teal/5 border border-eco-teal/30 rounded-xl px-6 py-4">
        <div>
          <p className="text-eco-text font-semibold text-sm">Leads y gestión comercial</p>
          <p className="text-eco-text-muted text-xs mt-0.5">
            Los leads, ventas, videollamadas y cobranzas se gestionan exclusivamente en el CRM.
          </p>
        </div>
        <a
          href={CRM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-eco-teal hover:bg-eco-teal-light text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors whitespace-nowrap flex-shrink-0"
        >
          <ExternalLink className="w-4 h-4" />
          Ir al CRM
        </a>
      </div>

      {/* Métricas de contenido */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard titulo="Módulos activos"    valor={modulosActivos}     icono={<Boxes className="w-4 h-4" />}   color="green" />
        <MetricCard titulo="Piscinas activas"   valor={piscinasActivas}    icono={<Waves className="w-4 h-4" />}   color="teal" />
        <MetricCard titulo="Artículos blog"     valor={articulosPublicados} icono={<BookOpen className="w-4 h-4" />} color="yellow" />
        <MetricCard titulo="Testimonios"        valor={testimoniosActivos} icono={<Star className="w-4 h-4" />}    color="green" />
      </div>

      {/* Accesos rápidos al contenido */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { href: '/admin/productos/modulos',  label: 'Editar módulos',      desc: `${modulosActivos} activos` },
          { href: '/admin/productos/piscinas', label: 'Editar piscinas',     desc: `${piscinasActivas} activas` },
          { href: '/admin/financiacion',       label: 'Coeficientes',        desc: 'Tabla de cuotas' },
          { href: '/admin/blog',               label: 'Blog / SEO',          desc: `${articulosPublicados} publicados` },
          { href: '/admin/testimonios',        label: 'Testimonios',         desc: `${testimoniosActivos} activos` },
          { href: '/admin/config',             label: 'Configuración',       desc: 'Hero, redes, precios' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-eco-bg-card border border-eco-border hover:border-eco-green rounded-xl px-5 py-4 flex flex-col gap-1 transition-colors group"
          >
            <p className="font-semibold text-eco-text text-sm group-hover:text-eco-green transition-colors">
              {item.label} →
            </p>
            <p className="text-eco-text-muted text-xs">{item.desc}</p>
          </Link>
        ))}
      </div>

      {/* Últimas obras */}
      {obras.length > 0 && (
        <div className="bg-eco-bg-card border border-eco-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-eco-border">
            <h3 className="font-semibold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>
              Últimas obras cargadas
            </h3>
            <Link href="/admin/obras" className="text-eco-green text-sm hover:underline">
              Ver todas →
            </Link>
          </div>
          <ul className="divide-y divide-eco-border">
            {obras.map((o) => (
              <li key={o.id} className="px-6 py-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-eco-text text-sm font-medium">{o.titulo}</p>
                  <p className="text-eco-text-muted text-xs">{o.localidad}, {o.provincia} · {o.tipo}</p>
                </div>
                <span className="text-eco-text-muted text-xs whitespace-nowrap">
                  {new Date(o.creadoEn).toLocaleDateString('es-AR')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
