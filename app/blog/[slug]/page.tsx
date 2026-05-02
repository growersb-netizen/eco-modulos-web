import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { tiempoLectura } from '@/lib/utils'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 0

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const articulo = await prisma.articuloBlog.findFirst({ where: { slug, publicado: true } })
  if (!articulo) return { title: 'Artículo no encontrado' }
  return {
    title: `${articulo.titulo} | Blog Eco Módulos & Piscinas`,
    description: articulo.resumen || articulo.titulo,
    openGraph: {
      title: articulo.titulo,
      description: articulo.resumen || articulo.titulo,
      images: articulo.imagen ? [articulo.imagen] : [],
    },
  }
}

export default async function ArticuloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const articulo = await prisma.articuloBlog.findFirst({ where: { slug, publicado: true } })
  if (!articulo) notFound()

  const waLink = 'https://wa.me/5491168733406?text=' + encodeURIComponent(`Hola, leí el artículo "${articulo.titulo}" y tengo una consulta`)

  return (
    <article className="pt-28 pb-20 max-w-3xl mx-auto px-4">
      {/* Breadcrumb */}
      <Link href="/blog" className="inline-flex items-center gap-2 text-eco-text-muted hover:text-eco-green text-sm mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />Volver al blog
      </Link>

      {/* Header */}
      <header className="mb-8">
        {articulo.categoria && (
          <span className="text-eco-green text-xs font-semibold uppercase tracking-wider capitalize">{articulo.categoria}</span>
        )}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-eco-text mt-2 mb-4 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
          {articulo.titulo}
        </h1>
        <div className="flex items-center gap-3 text-eco-text-muted text-sm">
          <time dateTime={articulo.creadoEn.toISOString()}>
            {new Date(articulo.creadoEn).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
          <span>·</span>
          <span>{tiempoLectura(articulo.contenido)} min de lectura</span>
        </div>
      </header>

      {/* Imagen destacada */}
      {articulo.imagen && (
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-10">
          <Image
            src={articulo.imagen}
            alt={articulo.titulo}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      {/* Resumen destacado */}
      {articulo.resumen && (
        <p className="text-lg text-eco-text-muted leading-relaxed border-l-4 border-eco-green pl-4 mb-8 italic">
          {articulo.resumen}
        </p>
      )}

      {/* Contenido */}
      <div
        className="prose prose-invert prose-green max-w-none text-eco-text-muted prose-headings:text-eco-text prose-headings:font-bold prose-a:text-eco-green prose-strong:text-eco-text prose-li:text-eco-text-muted"
        dangerouslySetInnerHTML={{ __html: articulo.contenido.replace(/\n/g, '<br/>') }}
      />

      {/* CTA final */}
      <div className="mt-16 bg-eco-bg-card border border-eco-border rounded-2xl p-6 text-center">
        <h2 className="text-2xl font-extrabold text-eco-text mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          ¿Te quedaron dudas?
        </h2>
        <p className="text-eco-text-muted text-sm mb-4">Nuestro equipo responde en menos de 2 horas por WhatsApp.</p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          <MessageCircle className="w-5 h-5" />Consultar por WhatsApp
        </a>
      </div>
    </article>
  )
}
