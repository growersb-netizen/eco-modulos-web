import React from 'react'
import { prisma } from '@/lib/db'
import SectionTitle from '@/components/shared/SectionTitle'
import ProductCard from '@/components/shared/ProductCard'
import FaqAccordion from '@/components/shared/FaqAccordion'
import StoreWelcomeModal from '@/components/shared/StoreWelcomeModal'
import LocationModal from '@/components/shared/LocationModal'
import PageHeroCarousel from '@/components/shared/PageHeroCarousel'
import type { PageSlide } from '@/components/shared/PageHeroCarousel'
import { MessageCircle, CheckCircle, X } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Piscinas de Fibra de Vidrio | Tienda Virtual | EcoFiver',
  description: 'Reservá tu piscina de fibra online. Instalación en el día, pagás en tu domicilio. 16 modelos. Miniportante sin excavación. Garantía 10 años.',
  keywords: ['piscinas fibra de vidrio', 'piscina autoportante sin obra', 'piscinas sin excavación', 'piscinas precio argentina'],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar/piscinas' },
  openGraph: {
    title: 'Piscinas de Fibra de Vidrio | Tienda Virtual | EcoFiver',
    description: 'Reservá tu piscina online. Instalación en el día, pagás en tu domicilio. 16 modelos.',
    url: 'https://ecomodulosypiscinas.com.ar/piscinas',
  },
}

const WA_PISCINAS = 'https://wa.me/5491126036495?text=' + encodeURIComponent('Hola, quiero reservar una piscina. ¿Cuál es la disponibilidad para instalación?')

const SLIDES: PageSlide[] = [
  {
    badge: '🏊 TIENDA VIRTUAL · PISCINAS',
    titulo: 'COMPRÁ TU PISCINA Y LA INSTALAMOS EN EL DÍA',
    subtitulo: 'El stock se agota en temporada. Reservá tu fecha hoy — pagás cero hasta el día que la instalamos en tu domicilio. Sin anticipos, sin riesgos.',
    imagen: '/hero-piscinas-instalada.jpg',
    acento: 'teal',
    btns: [
      { label: 'Reservar mi fecha ahora', href: '#catalogo',   primary: true, icon: 'cart' },
      { label: 'Consultar por WhatsApp', href: WA_PISCINAS,   external: true, icon: 'wa' },
    ],
  },
  {
    badge: '✅ SIN EXCAVACIÓN · SIN OBRA CIVIL',
    titulo: '¿QUERÉS LA PISCINA ESTA SEMANA? NOSOTROS LA INSTALAMOS.',
    subtitulo: 'Sin excavadora, sin obra, sin escombros. Tu patio queda listo el mismo día. Solo nivelás el suelo — el equipo hace el resto. Miniportante, Autoportante y MiniDeck.',
    imagen: '/piscinas/autoportante-2.jpg',
    acento: 'green',
    btns: [
      { label: 'Ver modelos sin excavación', href: '#catalogo',   primary: true, icon: 'cart' },
      { label: 'Consultar por WhatsApp', href: WA_PISCINAS,   external: true, icon: 'wa' },
    ],
  },
  {
    badge: '🛡️ GARANTÍA 10 AÑOS · FIBRA DE VIDRIO',
    titulo: 'DISFRUTALA EN VERANO. OLVIDATE EN INVIERNO.',
    subtitulo: 'Sin fisuras, sin revoque, sin mantenimiento complejo. Fibra de vidrio que dura décadas. Garantía escrita de 10 años. Reservá tu fecha antes que se agote el stock.',
    imagen: '/piscinas/autoportante-5.jpg',
    acento: 'blue',
    btns: [
      { label: 'Reservar mi fecha ahora', href: '#catalogo',   primary: true, icon: 'cart' },
      { label: 'Consultar por WhatsApp', href: WA_PISCINAS,   external: true, icon: 'wa' },
    ],
  },
]

const TRUST: React.ReactNode[] = [
  <>Instalación <strong>en el día</strong></>,
  <><strong>16 modelos</strong> disponibles en stock</>,
  <>Garantía total <strong>10 años</strong> · certificado de calidad premium</>,
  <>Pagás <strong>el día de la instalación</strong>, en el domicilio</>,
]

const COMPARATIVA = [
  { aspecto: 'Tiempo de instalación', fibra: 'Instalada en el día', hormigon: '60 a 120 días de obra' },
  { aspecto: 'Costo total', fibra: 'Precio cerrado — sin sorpresas', hormigon: 'Presupuesto abierto — imprevistos constantes' },
  { aspecto: 'Impacto en el patio', fibra: 'Sin escombros. Equipo entra y sale en el día', hormigon: 'Excavadora, barro y semanas de desastre' },
  { aspecto: 'Mantenimiento', fibra: 'Mínimo — superficie lisa no porosa', hormigon: 'Alto — fisuras, algas y revoque periódico' },
]

const FAQ = [
  { q: '¿Cuánto tarda la instalación?', r: 'La instalación de una piscina de fibra se realiza en el día. Stock disponible para coordinar fecha inmediata.' },
  { q: '¿Cuándo y cómo pago?', r: 'El pago total se realiza el día de la instalación, en el domicilio, en efectivo o transferencia. La seña de reserva se abona por MercadoPago (un asesor te envía el link por WhatsApp).' },
  { q: '¿La Miniportante necesita excavación?', r: 'No. La Miniportante es autoportante: se apoya sobre el suelo nivelado. Sin excavación ni obra civil.' },
  { q: '¿Qué garantía tienen?', r: 'Garantía total de 10 años. Cada piscina incluye certificado de calidad premium.' },
  { q: '¿Hacen instalación en todo el país?', r: 'Sí. Logística propia a todo el territorio argentino. El flete se calcula según distancia desde nuestra planta en Zárate, Buenos Aires.' },
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
  const piscinas = await prisma.piscina.findMany({
    where: { activo: true },
    orderBy: [{ destacada: 'desc' }, { orden: 'asc' }],
  })

  return (
    <>
      <StoreWelcomeModal />
      <LocationModal />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* CARRUSEL HERO */}
      <div className="pt-16">
        <PageHeroCarousel slides={SLIDES} />
      </div>

      {/* TRUST BAR */}
      <section className="trust-bar-glass border-b border-eco-border py-3">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5">
            {TRUST.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-eco-text-muted text-xs py-0.5">
                <div className="trust-dot-gold flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CATÁLOGO */}
      <section id="catalogo" className="py-12 max-w-7xl mx-auto px-4 scroll-mt-20">
        <SectionTitle
          titulo="Catálogo completo"
          subtitulo="Seleccioná tu modelo y reservá la fecha de instalación."
          centrado={false}
        />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {piscinas.map(p => (
            <ProductCard
              key={p.id}
              id={p.id}
              nombre={p.nombre}
              medida={p.medida}
              descripcion={p.descripcion}
              usos={JSON.parse(p.usos || '[]')}
              precio_contado={p.precio_contado}
              precio_lista={p.precio_lista}
              imagen={p.imagen}
              tipo="piscina"
              destacada={p.destacada}
            />
          ))}
        </div>
      </section>

      {/* COMPARATIVA FIBRA VS HORMIGÓN */}
      <section className="py-12 bg-eco-bg-surface border-y border-eco-border">
        <div className="max-w-3xl mx-auto px-4">
          <SectionTitle
            titulo="Fibra vs. Hormigón"
            subtitulo="Por qué elegir fibra de vidrio — la diferencia que pocos te explican antes de decidir"
          />
          <div className="mt-8 overflow-hidden rounded-xl border border-eco-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-eco-bg-card border-b border-eco-border">
                  <th className="text-left px-4 py-3 text-eco-text-muted">Aspecto</th>
                  <th className="text-center px-4 py-3 text-eco-teal font-bold">Fibra de vidrio</th>
                  <th className="text-center px-4 py-3 text-eco-text-muted">Hormigón</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-eco-border">
                {COMPARATIVA.map(row => (
                  <tr key={row.aspecto} className="hover:bg-eco-bg-card/80">
                    <td className="px-4 py-3 text-eco-text font-medium text-xs">{row.aspecto}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-eco-teal" />
                        <span className="text-eco-text text-xs">{row.fibra}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-eco-text-muted">
                        <X className="w-3.5 h-3.5 flex-shrink-0 text-red-500/70" />
                        <span className="text-xs">{row.hormigon}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-center">
            <a
              href="#catalogo"
              className="inline-flex items-center gap-2 bg-eco-teal text-white font-bold px-8 py-3.5 rounded-xl hover:bg-eco-teal-light transition-all btn-glow-teal"
            >
              ↑ Volver al catálogo
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-eco-bg">
        <div className="max-w-3xl mx-auto px-4">
          <SectionTitle titulo="Preguntas frecuentes" />
          <div className="mt-8">
            <FaqAccordion items={FAQ} />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-eco-green-dark relative overflow-hidden">
        <div className="absolute inset-0 hero-grid-pattern opacity-50" />
        <div className="light-orb orb-teal absolute" style={{ width: '420px', height: '420px', top: '-80px', left: '-60px', animationDelay: '0.5s' }} />
        <div className="light-orb orb-gold absolute" style={{ width: '280px', height: '280px', bottom: '-50px', right: '-30px', animationDelay: '2.5s' }} />
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white mb-3 uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ¿Querés reservar tu piscina?
          </h2>
          <p className="text-white/60 mb-8">
            Elegí el modelo, pactamos la fecha y listo. Pagás <strong className="text-white">el día de la instalación</strong>, en el domicilio. <strong className="text-white">Sin anticipos.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WA_PISCINAS}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-eco-green-dark font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.18)] hover:shadow-[0_8px_36px_rgba(0,0,0,0.28)] hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />Reservar por WhatsApp
            </a>
            <a
              href="/financiacion"
              className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/18 text-white font-bold px-8 py-4 rounded-xl transition-all backdrop-blur-sm hover:-translate-y-0.5"
            >
              Ver financiación
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
