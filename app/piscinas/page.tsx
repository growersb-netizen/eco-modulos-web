import { prisma } from '@/lib/db'
import SectionTitle from '@/components/shared/SectionTitle'
import ProductCard from '@/components/shared/ProductCard'
import VideoCallButton from '@/components/shared/VideoCallButton'
import FaqAccordion from '@/components/shared/FaqAccordion'
import { MessageCircle, CheckCircle, X } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Piscinas de Fibra de Vidrio | Catálogo y Precios | EcoFiver',
  description: 'Catálogo de piscinas de fibra de vidrio: 16 modelos desde 2×3 m hasta 4×8 m. Instalación en 3-5 días. Financiación directa con cuota fija en pesos, hasta 36 cuotas, sin banco. Modelo autoportante sin obra ni excavación.',
  keywords: [
    'piscinas fibra de vidrio argentina',
    'piscinas prefabricadas precio',
    'piscina autoportante sin obra',
    'piscinas financiación sin banco',
    'piscinas fibra vidrio buenos aires',
    'Miniportante piscina',
    'piscinas para casas',
    'instalar piscina fibra vidrio',
  ],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar/piscinas' },
  openGraph: {
    title: 'Piscinas de Fibra de Vidrio | EcoFiver',
    description: '16 modelos de piscinas de fibra de vidrio. Stock disponible — instalación el mismo día. Financiación con cuota fija en pesos, hasta 36 cuotas, sin banco ni garante.',
    url: 'https://ecomodulosypiscinas.com.ar/piscinas',
  },
}

const COMPARATIVA = [
  { aspecto: 'Tiempo de instalación', fibra: 'Instalada en el día', hormigon: '60 a 120 días de obra civil' },
  { aspecto: 'Costo total', fibra: 'Precio cerrado — sin sorpresas', hormigon: 'Presupuesto abierto — imprevistos constantes' },
  { aspecto: 'Impacto en el patio', fibra: 'Sin escombros. Equipo entra y sale en el día', hormigon: 'Excavadora, barro, escombros y semanas de desastre' },
  { aspecto: 'Mantenimiento', fibra: 'Mínimo — superficie lisa no porosa', hormigon: 'Alto — fisuras, algas y revoque periódico' },
  { aspecto: 'Resistencia UV', fibra: 'Alta — gel coat protector de larga duración', hormigon: 'Se degrada — requiere revestimiento cada pocos años' },
  { aspecto: 'Limpieza', fibra: 'Fácil — no retiene algas ni sarro', hormigon: 'Difícil — superficie rugosa y porosa' },
]

const FAQ = [
  { q: '¿La Miniportante necesita excavación?', r: 'No. La Miniportante es autoportante: se apoya sobre el suelo nivelado sin necesidad de excavación. Es la opción más rápida y económica.' },
  { q: '¿Qué garantía tienen las piscinas?', r: 'Las piscinas de fibra de vidrio tienen garantía de 10 años sobre el casco. El gel coat (color/terminación) tiene garantía de 3 años.' },
  { q: '¿Puedo instalar una piscina en un departamento o piso alto?', r: 'Los modelos autoportantes y Minideck están diseñados para esos espacios, siempre que la losa soporte el peso del agua. Consultar con nuestros asesores.' },
  { q: '¿Incluyen sistema de filtrado?', r: 'Las piscinas se entregan con el casco terminado. El sistema de filtrado (bomba, filtro) se cotiza y puede incluirse en el plan de financiación.' },
  { q: '¿Cuánto tarda la instalación?', r: 'La instalación de una piscina de fibra se realiza en el día. Disponemos de stock para coordinar entrega e instalación inmediata. Para compras financiadas, el plazo de fabricación se coordina al confirmar el pedido.' },
  { q: '¿Hacen instalación en todo el país?', r: 'Sí. Contamos con logística propia para llegar a todo el territorio argentino. El costo de flete se calcula según la distancia desde nuestra planta en Zárate, Buenos Aires.' },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ q, r }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: r },
  })),
}

export default async function PiscinasPage() {
  const piscinas = await prisma.piscina.findMany({ where: { activo: true }, orderBy: [{ destacada: 'desc' }, { orden: 'asc' }] })

  const waLink = 'https://wa.me/5491168733406?text=' + encodeURIComponent('Hola, me interesa consultar por piscinas de fibra de vidrio')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero — premium light */}
      <section className="pt-28 pb-16 bg-eco-bg border-b border-eco-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="badge-green mb-5 inline-flex" style={{ color: '#0B2350', background: 'rgba(78,195,181,0.12)', borderColor: 'rgba(78,195,181,0.30)' }}>
            Catálogo de piscinas
          </span>
          <h1
            className="text-5xl sm:text-7xl font-extrabold text-eco-text uppercase leading-[0.92] mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Instalada en el día.<br />
            <span className="text-eco-teal">Durabilidad garantizada.</span>
          </h1>
          <p className="text-eco-text-muted text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
            16 modelos de fibra de vidrio. Desde la Miniportante (sin excavación) hasta modelos de 9 m. Stock disponible para entrega e instalación inmediata.
          </p>
          <div className="inline-flex items-center gap-2 bg-eco-teal/8 border border-eco-teal/20 text-eco-teal text-xs font-semibold px-4 py-2 rounded-full mb-8">
            <CheckCircle className="w-3.5 h-3.5" />
            Stock disponible — instalación el mismo día
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-eco-teal hover:bg-eco-teal-light text-white font-bold px-8 py-4 rounded-xl transition-all shadow-[0_4px_16px_rgba(26,110,101,0.25)] hover:shadow-[0_8px_24px_rgba(26,110,101,0.35)]"
            >
              <MessageCircle className="w-5 h-5" />Consultar al equipo de piscinas
            </a>
            <VideoCallButton variant="outline" label="Agendar videollamada" productoDefault="piscina" />
          </div>
        </div>
      </section>

      {/* Destacada Miniportante */}
      <section className="py-10 max-w-7xl mx-auto px-4">
        <div className="bg-eco-teal/5 border border-eco-teal/30 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1">
            <span className="inline-block bg-eco-teal/10 text-eco-teal text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              Sin excavación — Entrega Express
            </span>
            <h2 className="text-3xl font-extrabold text-eco-text mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Piscina Miniportante
            </h2>
            <p className="text-eco-text-muted mb-4">El modelo de mayor demanda. Sin excavación, sin obra civil, instalada en 1 día. Ideal para patios pequeños, quinchos y departamentos con jardín.</p>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-eco-teal hover:bg-eco-teal-light text-white font-bold px-6 py-3 rounded-xl transition-colors">
              <MessageCircle className="w-4 h-4" />Consultar precio y disponibilidad
            </a>
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <section className="py-10 max-w-7xl mx-auto px-4">
        <SectionTitle titulo="Catálogo completo" centrado={false} />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {piscinas.map((p) => (
            <ProductCard key={p.id} id={p.id} nombre={p.nombre} medida={p.medida} descripcion={p.descripcion} usos={JSON.parse(p.usos || '[]')} precio_contado={p.precio_contado} precio_lista={p.precio_lista} imagen={p.imagen} tipo="piscina" destacada={p.destacada} />
          ))}
        </div>
      </section>

      {/* Comparativa */}
      <section className="py-16 bg-eco-bg-card border-y border-eco-border">
        <div className="max-w-3xl mx-auto px-4">
          <SectionTitle titulo="Fibra vs. Hormigón" subtitulo="La diferencia que nadie te cuenta antes de construir" />
          <p className="mt-4 text-eco-text-muted text-sm text-center max-w-2xl mx-auto mb-10">
            Una piscina de hormigón implica excavadora, semanas de obra, presupuesto abierto y tu patio convertido en un desastre. La fibra de vidrio es lo opuesto: llega en camión, se instala en el día y el equipo se va sin dejar rastro.
          </p>
          <div className="overflow-hidden rounded-xl border border-eco-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-eco-bg-surface border-b border-eco-border">
                  <th className="text-left px-4 py-3 text-eco-text-muted">Aspecto</th>
                  <th className="text-center px-4 py-3 text-eco-teal font-bold">Fibra de vidrio</th>
                  <th className="text-center px-4 py-3 text-eco-text-muted">Hormigón</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-eco-border">
                {COMPARATIVA.map((row) => (
                  <tr key={row.aspecto} className="hover:bg-eco-bg-surface/50">
                    <td className="px-4 py-3 text-eco-text font-medium">{row.aspecto}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 text-eco-teal" />
                        <span className="text-eco-text text-xs font-medium">{row.fibra}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-eco-text-muted">
                        <X className="w-4 h-4 flex-shrink-0 text-red-500/70" />
                        <span className="text-xs">{row.hormigon}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-center text-eco-text-muted text-xs">
            Con la <strong className="text-eco-text">Miniportante</strong> ni siquiera hace falta excavar. Se apoya sobre el suelo nivelado — sin obra, sin permisos de demolición, sin sorpresas.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-eco-bg">
        <div className="max-w-3xl mx-auto px-4">
          <SectionTitle titulo="Preguntas frecuentes" />
          <div className="mt-10">
            <FaqAccordion items={FAQ} />
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-24 bg-eco-green-dark relative overflow-hidden">
        <div className="absolute inset-0 hero-grid-pattern opacity-60" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 uppercase" style={{ fontFamily: 'var(--font-display)' }}>
            ¿Desea más información?
          </h2>
          <p className="text-white/60 mb-10 text-lg">Nuestro equipo de piscinas lo asesora sin costo ni compromiso.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-eco-green-dark font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              <MessageCircle className="w-5 h-5" />WhatsApp — Piscinas
            </a>
            <VideoCallButton variant="outline" productoDefault="piscina" />
          </div>
        </div>
      </section>
    </>
  )
}
