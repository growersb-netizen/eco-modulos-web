import { prisma } from '@/lib/db'
import SectionTitle from '@/components/shared/SectionTitle'
import Link from 'next/link'
import Image from 'next/image'
import { tiempoLectura } from '@/lib/utils'
import type { Metadata } from 'next'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Blog | Módulos Habitacionales y Piscinas de Fibra | Eco Módulos & Piscinas',
  description: 'Artículos y guías sobre viviendas modulares NCE, piscinas de fibra de vidrio, financiación sin banco y construcción eficiente en Argentina. Consejos de expertos.',
  keywords: [
    'blog viviendas modulares argentina',
    'artículos piscinas fibra vidrio',
    'guía financiamiento sin banco',
    'construcción modular tips',
    'módulos NCE información',
  ],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar/blog' },
  openGraph: {
    title: 'Blog | Eco Módulos & Piscinas',
    description: 'Guías y consejos sobre módulos habitacionales, piscinas de fibra y financiación directa en Argentina.',
    url: 'https://ecomodulosypiscinas.com.ar/blog',
  },
}

const CATEGORIAS = ['todos', 'modulos', 'piscinas', 'financiacion', 'construccion']

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>
}) {
  const params = await searchParams
  const cat = params.categoria && CATEGORIAS.includes(params.categoria) ? params.categoria : 'todos'

  const where = cat !== 'todos' ? { publicado: true, categoria: cat } : { publicado: true }
  const articulos = await prisma.articuloBlog.findMany({
    where,
    orderBy: { creadoEn: 'desc' },
  })

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-eco-green-dark to-eco-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-eco-green/10 text-eco-green text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Blog</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white uppercase mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Artículos y guías
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Todo lo que necesitás saber sobre módulos habitacionales, piscinas, financiación y construcción modular en Argentina.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-6 bg-eco-bg-card border-b border-eco-border">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap gap-3 justify-center">
          {CATEGORIAS.map((c) => (
            <Link
              key={c}
              href={c === 'todos' ? '/blog' : `/blog?categoria=${c}`}
              className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-colors ${cat === c ? 'bg-eco-green text-white' : 'bg-eco-bg-surface border border-eco-border text-eco-text-muted hover:border-eco-green'}`}
            >
              {c === 'todos' ? 'Todos' : c === 'modulos' ? 'Módulos' : c === 'piscinas' ? 'Piscinas' : c === 'financiacion' ? 'Financiación' : 'Construcción'}
            </Link>
          ))}
        </div>
      </section>

      {/* Grid de artículos */}
      <section className="py-12 max-w-5xl mx-auto px-4">
        {articulos.length === 0 ? (
          <div className="text-center py-20 text-eco-text-muted">
            <p className="text-lg">No hay artículos en esta categoría todavía.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articulos.map((a) => (
              <Link
                key={a.id}
                href={`/blog/${a.slug}`}
                className="group bg-eco-bg-card border border-eco-border hover:border-eco-green/40 rounded-2xl overflow-hidden flex flex-col transition-all hover:shadow-lg hover:shadow-eco-green/5"
              >
                {a.imagen ? (
                  <div className="relative aspect-video bg-eco-bg-surface overflow-hidden">
                    <Image
                      src={a.imagen}
                      alt={a.titulo}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-eco-bg-surface flex items-center justify-center">
                    <span className="text-eco-text-muted text-sm">Sin imagen</span>
                  </div>
                )}
                <div className="p-5 flex flex-col gap-2 flex-1">
                  {a.categoria && (
                    <span className="text-eco-green text-xs font-semibold uppercase tracking-wider capitalize">{a.categoria}</span>
                  )}
                  <h2 className="text-eco-text font-bold leading-snug group-hover:text-eco-green transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                    {a.titulo}
                  </h2>
                  {a.resumen && (
                    <p className="text-eco-text-muted text-sm flex-1 line-clamp-3">{a.resumen}</p>
                  )}
                  <div className="flex items-center gap-3 text-eco-text-muted text-xs pt-2 border-t border-eco-border">
                    <span>{new Date(a.creadoEn).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span>·</span>
                    <span>{tiempoLectura(a.contenido)} min de lectura</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
