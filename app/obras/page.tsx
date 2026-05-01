import { prisma } from '@/lib/db'
import SectionTitle from '@/components/shared/SectionTitle'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Galería de Obras | Módulos y Piscinas Instalados | Eco Módulos & Piscinas',
  description: 'Galería de proyectos reales: módulos habitacionales NCE y piscinas de fibra de vidrio instalados en toda Argentina. Viví la experiencia de nuestros clientes.',
  keywords: [
    'galería módulos habitacionales instalados',
    'fotos piscinas fibra vidrio argentina',
    'obras viviendas modulares',
    'proyectos reales módulos NCE',
    'instalaciones piscinas fibra',
  ],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar/obras' },
  openGraph: {
    title: 'Galería de Obras | Eco Módulos & Piscinas',
    description: 'Proyectos reales de módulos habitacionales y piscinas de fibra instalados en todo el país.',
    url: 'https://ecomodulosypiscinas.com.ar/obras',
  },
}

const TIPOS = ['todos', 'modulo', 'piscina', 'combo']

export default async function ObrasPage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string }>
}) {
  const params = await searchParams
  const tipo = params.tipo && TIPOS.includes(params.tipo) ? params.tipo : 'todos'

  const where = tipo !== 'todos' ? { activo: true, tipo } : { activo: true }
  const obras = await prisma.obra.findMany({
    where,
    orderBy: { creadoEn: 'desc' },
  })

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-eco-green-dark to-eco-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-eco-green/10 text-eco-green text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Galería</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white uppercase mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Nuestras obras
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Proyectos reales en todo el país. Cada imagen es un cliente que confió en nosotros.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-6 bg-eco-bg-card border-b border-eco-border">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-3 justify-center">
          {TIPOS.map((t) => (
            <Link
              key={t}
              href={t === 'todos' ? '/obras' : `/obras?tipo=${t}`}
              className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-colors ${tipo === t ? 'bg-eco-green text-white' : 'bg-eco-bg-surface border border-eco-border text-eco-text-muted hover:border-eco-green'}`}
            >
              {t === 'todos' ? 'Todos' : t === 'modulo' ? 'Módulos' : t === 'piscina' ? 'Piscinas' : 'Combos'}
            </Link>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        {obras.length === 0 ? (
          <div className="text-center py-20 text-eco-text-muted">
            <p className="text-lg">No hay obras en esta categoría todavía.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {obras.map((obra) => (
              <div key={obra.id} className="relative aspect-video bg-eco-bg-surface rounded-xl overflow-hidden group">
                {obra.imagen ? (
                  <Image
                    src={obra.imagen}
                    alt={`${obra.titulo} — ${obra.localidad}, ${obra.provincia}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-eco-bg-surface flex items-center justify-center">
                    <span className="text-eco-text-muted text-sm">Sin imagen</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <p className="text-white font-bold text-sm">{obra.titulo}</p>
                    <p className="text-gray-300 text-xs">{obra.localidad}, {obra.provincia}</p>
                    {obra.tipo && (
                      <span className="inline-block mt-1 bg-eco-green/20 text-eco-green text-xs px-2 py-0.5 rounded-full capitalize">{obra.tipo}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-16 bg-eco-bg-card border-t border-eco-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <SectionTitle titulo="¿Querés ver tu proyecto acá?" subtitulo="Más de 2.000 instalaciones en todo el país. El siguiente puede ser el tuyo." />
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/modulos" className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold px-8 py-4 rounded-xl transition-colors">
              Ver módulos
            </Link>
            <Link href="/piscinas" className="flex items-center justify-center gap-2 border-2 border-eco-teal hover:bg-eco-teal text-eco-teal hover:text-white font-bold px-8 py-4 rounded-xl transition-colors">
              Ver piscinas
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
