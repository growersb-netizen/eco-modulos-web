import { prisma } from '@/lib/db'
import SectionTitle from '@/components/shared/SectionTitle'
import ProductCard from '@/components/shared/ProductCard'
import VideoCallButton from '@/components/shared/VideoCallButton'
import { MessageCircle, CheckCircle, X } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Piscinas de Fibra de Vidrio | Catálogo y Precios | Eco Módulos & Piscinas',
  description: 'Catálogo de piscinas de fibra de vidrio: 16 modelos desde 2×3 m hasta 4×8 m. Instalación en 3-5 días. Financiación directa hasta 120 cuotas sin banco. Modelo autoportante sin obra ni excavación.',
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
    title: 'Piscinas de Fibra de Vidrio | Eco Módulos & Piscinas',
    description: '16 modelos de piscinas de fibra de vidrio. Stock disponible — instalación el mismo día. Financiación hasta 120 cuotas sin banco ni garante.',
    url: 'https://ecomodulosypiscinas.com.ar/piscinas',
  },
}

const COMPARATIVA = [
  { aspecto: 'Tiempo de instalación', fibra: '3-5 días', mamposteria: '30-60 días' },
  { aspecto: 'Mantenimiento', fibra: 'Mínimo — superficie lisa', mamposteria: 'Alto — superficie porosa' },
  { aspecto: 'Resistencia UV', fibra: 'Alta — gel coat protector', mamposteria: 'Se degrada con el tiempo' },
  { aspecto: 'Personalización', fibra: 'Colores y modelos variados', mamposteria: 'Alta pero costosa' },
  { aspecto: 'Limpieza', fibra: 'Fácil — no retiene algas', mamposteria: 'Difícil — porosa' },
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
  const [piscinas, coeficientes] = await Promise.all([
    prisma.piscina.findMany({ where: { activo: true }, orderBy: [{ destacada: 'desc' }, { orden: 'asc' }] }),
    prisma.coeficienteCuota.findMany({ where: { activo: true }, orderBy: { cuotas: 'asc' } }),
  ])

  const coef12 = coeficientes.find((c) => c.cuotas === 12)?.coef ?? 1.15
  const waLink = 'https://wa.me/5491125582328?text=' + encodeURIComponent('Hola, me interesa consultar por piscinas de fibra de vidrio')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-[#001a1a] to-eco-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-eco-teal/10 text-eco-teal text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Catálogo de piscinas</span>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white uppercase mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Instalada en el día.<br />Tuya de por vida.
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-4">
            16 modelos de fibra de vidrio. Desde la Miniportante (sin excavación) hasta modelos de 9 m. Stock disponible para entrega e instalación inmediata.
          </p>
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-xs font-semibold px-4 py-2 rounded-full mb-8">
            Stock disponible — instalación el mismo día
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-eco-teal hover:bg-eco-teal-light text-white font-bold px-8 py-4 rounded-xl transition-colors">
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
            <p className="text-eco-text-muted mb-4">El modelo más vendido. Sin excavación, sin obras, instalada en 1 día. Ideal para patios pequeños, quinchos y departamentos con jardín.</p>
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
            <ProductCard key={p.id} id={p.id} nombre={p.nombre} medida={p.medida} descripcion={p.descripcion} usos={JSON.parse(p.usos || '[]')} precio_contado={p.precio_contado} precio_lista={p.precio_lista} imagen={p.imagen} tipo="piscina" destacada={p.destacada} coeficiente12={coef12} />
          ))}
        </div>
      </section>

      {/* Comparativa */}
      <section className="py-16 bg-eco-bg-card border-y border-eco-border">
        <div className="max-w-3xl mx-auto px-4">
          <SectionTitle titulo="Fibra vs. Mampostería" subtitulo="¿Por qué elegir una piscina de fibra?" />
          <div className="mt-10 overflow-hidden rounded-xl border border-eco-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-eco-bg-surface border-b border-eco-border">
                  <th className="text-left px-4 py-3 text-eco-text-muted">Aspecto</th>
                  <th className="text-center px-4 py-3 text-eco-teal font-bold">Fibra de vidrio</th>
                  <th className="text-center px-4 py-3 text-eco-text-muted">Mampostería</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-eco-border">
                {COMPARATIVA.map((row) => (
                  <tr key={row.aspecto} className="hover:bg-eco-bg-surface/50">
                    <td className="px-4 py-3 text-eco-text font-medium">{row.aspecto}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-eco-green">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span className="text-eco-text text-xs">{row.fibra}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-eco-text-muted">
                        <X className="w-4 h-4 flex-shrink-0" />
                        <span className="text-xs">{row.mamposteria}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 max-w-3xl mx-auto px-4">
        <SectionTitle titulo="Preguntas frecuentes" />
        <div className="mt-10 space-y-4">
          {FAQ.map((f) => (
            <details key={f.q} className="group bg-eco-bg-card border border-eco-border rounded-xl">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-eco-text font-medium list-none">
                {f.q}
                <span className="text-eco-teal group-open:rotate-45 transition-transform text-xl leading-none">+</span>
              </summary>
              <p className="px-5 pb-4 text-eco-text-muted text-sm">{f.r}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-eco-bg-card border-t border-eco-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-eco-text mb-4 uppercase" style={{ fontFamily: 'var(--font-display)' }}>¿Querés saber más?</h2>
          <p className="text-eco-text-muted mb-8">Nuestro equipo de piscinas te asesora sin costo y sin compromiso.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-eco-teal hover:bg-eco-teal-light text-white font-bold px-8 py-4 rounded-xl transition-colors">
              <MessageCircle className="w-5 h-5" />WhatsApp — Piscinas
            </a>
            <VideoCallButton variant="outline" productoDefault="piscina" />
          </div>
        </div>
      </section>
    </>
  )
}
