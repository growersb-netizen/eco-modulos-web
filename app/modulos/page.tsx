import { prisma } from '@/lib/db'
import SectionTitle from '@/components/shared/SectionTitle'
import ProductCard from '@/components/shared/ProductCard'
import VideoCallButton from '@/components/shared/VideoCallButton'
import { MessageCircle, Home, Plus, Building2, Coffee, Trees, TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Módulos Habitacionales | Viviendas Modulares NCE | Eco Módulos & Piscinas',
  description: 'Catálogo de módulos habitacionales con tecnología NCE: desde 6 hasta 72 m². Financiación directa hasta 120 cuotas sin banco ni garante. Fabricante directo, planta en Zárate. Instalación en todo el país.',
  keywords: [
    'módulos habitacionales',
    'viviendas modulares NCE',
    'casas modulares argentina precio',
    'módulos prefabricados',
    'viviendas prefabricadas argentina',
    'ampliaciones modulares',
    'oficinas modulares',
    'módulos para glamping',
  ],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar/modulos' },
  openGraph: {
    title: 'Módulos Habitacionales NCE | Eco Módulos & Piscinas',
    description: 'Fabricante directo de módulos habitacionales. De 6 a 72 m², financiación hasta 120 cuotas sin banco.',
    url: 'https://ecomodulosypiscinas.com.ar/modulos',
  },
}

const USOS = [
  { icon: Home, label: 'Vivienda' },
  { icon: Plus, label: 'Ampliación' },
  { icon: Building2, label: 'Oficina' },
  { icon: Coffee, label: 'Quincho' },
  { icon: Trees, label: 'Glamping' },
  { icon: TrendingUp, label: 'Inversión' },
]

const FAQ = [
  { q: '¿Cuánto tarda la instalación?', r: 'El armado en sitio demora entre 3 y 10 días hábiles según el tamaño. Antes de eso, la fabricación en nuestra planta de Zárate toma entre 15 y 45 días según la demanda.' },
  { q: '¿Necesito cimientos o base especial?', r: 'Para módulos de hasta 30 m², una losa de hormigón de baja densidad o block de hormigón sobre suelo nivelado es suficiente. Nuestro equipo te asesora según la topografía de tu terreno.' },
  { q: '¿Los módulos tienen instalación eléctrica y sanitaria?', r: 'Sí. Los módulos se entregan con pre-instalación eléctrica y sanitaria. Las conexiones externas (medidor, pozo séptico) son responsabilidad del cliente.' },
  { q: '¿Puedo unir varios módulos para hacer una casa más grande?', r: 'Absolutamente. Los módulos están diseñados para vincularse entre sí. Podés combinar varios módulos para armar la distribución que necesitás.' },
  { q: '¿Qué garantía tienen los módulos?', r: 'Otorgamos garantía de 5 años sobre la estructura metálica y 2 años sobre terminaciones. Al ser fabricantes directos, cualquier problema se resuelve con nosotros directamente.' },
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

export default async function ModulosPage() {
  const [modulos, coeficientes] = await Promise.all([
    prisma.modulo.findMany({ where: { activo: true }, orderBy: { orden: 'asc' } }),
    prisma.coeficienteCuota.findMany({ where: { activo: true }, orderBy: { cuotas: 'asc' } }),
  ])

  const coef12 = coeficientes.find((c) => c.cuotas === 12)?.coef ?? 1.15
  const waLink = 'https://wa.me/5491171825835?text=' + encodeURIComponent('Hola, me interesa consultar por módulos habitacionales')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-eco-green-dark to-eco-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-eco-green/10 text-eco-green text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Catálogo de módulos</span>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white uppercase mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Tu primera casa.<br />En semanas, no años.
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Módulos habitacionales de tecnología NCE. De 6 a 72 m². Fabricación propia en Zárate. Financiación directa hasta 120 cuotas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold px-8 py-4 rounded-xl transition-colors">
              <MessageCircle className="w-5 h-5" />Consultar a Daniel
            </a>
            <VideoCallButton variant="outline" label="Agendar videollamada" productoDefault="modulo" />
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <SectionTitle titulo="Catálogo completo" subtitulo="Todos los precios son de contado. Consultá planes de financiación." centrado={false} />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modulos.map((m) => (
            <ProductCard
              key={m.id}
              id={m.id}
              nombre={m.nombre}
              medida={m.medida}
              descripcion={m.descripcion}
              usos={JSON.parse(m.usos || '[]')}
              precio_contado={m.precio_contado}
              precio_lista={m.precio_lista}
              imagen={m.imagen}
              tipo="modulo"
              coeficiente12={coef12}
            />
          ))}
        </div>
      </section>

      {/* Usos */}
      <section className="py-16 bg-eco-bg-card border-y border-eco-border">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle titulo="¿Para qué se usa un módulo?" />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {USOS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-3 p-4 bg-eco-bg-surface rounded-xl">
                <Icon className="w-6 h-6 text-eco-green" />
                <span className="text-eco-text text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tecnología NCE */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <SectionTitle titulo="Tecnología NCE" subtitulo="No Convencional de Eficiencia energética — 5 capas de calidad" />
        <div className="mt-10 space-y-4">
          {[
            { n: '01', titulo: 'Estructura metálica galvanizada', desc: 'Esqueleto de acero galvanizado de alta resistencia. No se oxida, no requiere mantenimiento. Vida útil mínima 50 años.' },
            { n: '02', titulo: 'Panel SIP aislante', desc: 'Dos láminas de OSB estructural con núcleo de poliestireno expandido. Aislación térmica y acústica superior al ladrillo.' },
            { n: '03', titulo: 'Membrana hidrófuga', desc: 'Protección perimetral que impide el ingreso de humedad del exterior. Fundamental en climas húmedos.' },
            { n: '04', titulo: 'Revestimiento exterior', desc: 'Chapa prepintada, símil piedra, madera compuesta u otros materiales según el modelo. Resistente al clima argentino.' },
            { n: '05', titulo: 'Terminaciones interiores', desc: 'Durlock o revestimiento de madera según modelo. Listo para pintar y decorar a gusto.' },
          ].map((capa) => (
            <div key={capa.n} className="flex gap-4 bg-eco-bg-card border border-eco-border rounded-xl p-5">
              <span className="text-2xl font-extrabold text-eco-green/30 flex-shrink-0" style={{ fontFamily: 'var(--font-display)' }}>{capa.n}</span>
              <div>
                <h3 className="font-bold text-eco-text mb-1" style={{ fontFamily: 'var(--font-display)' }}>{capa.titulo}</h3>
                <p className="text-eco-text-muted text-sm">{capa.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-eco-bg-card border-y border-eco-border">
        <div className="max-w-3xl mx-auto px-4">
          <SectionTitle titulo="Preguntas frecuentes" />
          <div className="mt-10 space-y-4">
            {FAQ.map((f) => (
              <details key={f.q} className="group bg-eco-bg-surface border border-eco-border rounded-xl">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-eco-text font-medium list-none">
                  {f.q}
                  <span className="text-eco-green group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="px-5 pb-4 text-eco-text-muted text-sm">{f.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-eco-text mb-4 uppercase" style={{ fontFamily: 'var(--font-display)' }}>¿Querés saber más?</h2>
        <p className="text-eco-text-muted mb-8">Consultá con Daniel, nuestro especialista en módulos habitacionales.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold px-8 py-4 rounded-xl transition-colors">
            <MessageCircle className="w-5 h-5" />WhatsApp — Daniel
          </a>
          <VideoCallButton variant="outline" productoDefault="modulo" />
        </div>
      </section>
    </>
  )
}
