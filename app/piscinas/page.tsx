import { prisma } from '@/lib/db'
import SectionTitle from '@/components/shared/SectionTitle'
import ProductCard from '@/components/shared/ProductCard'
import FaqAccordion from '@/components/shared/FaqAccordion'
import StoreWelcomeModal from '@/components/shared/StoreWelcomeModal'
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
    subtitulo: 'Sin anticipos. El equipo instala y cobra en tu domicilio. Efectivo o transferencia. Stock disponible. Garantía 10 años.',
    imagen: '/hero-piscinas.jpg',
    acento: 'teal',
    btns: [
      { label: 'Ver catálogo',           href: '#catalogo',   primary: true, icon: 'cart' },
      { label: 'Consultar por WhatsApp', href: WA_PISCINAS,   external: true, icon: 'wa' },
    ],
  },
  {
    badge: '✅ MINIPORTANTE · SIN EXCAVACIÓN',
    titulo: 'LA PISCINA QUE SE INSTALA SIN OBRA CIVIL',
    subtitulo: 'La Miniportante se apoya sobre el suelo nivelado. Sin excavadora, sin escombros, sin semanas de espera. Lista en el día.',
    imagen: '/hero-piscinas.jpg',
    acento: 'green',
    btns: [
      { label: 'Ver Miniportante',       href: '#catalogo',   primary: true, icon: 'cart' },
      { label: 'Consultar por WhatsApp', href: WA_PISCINAS,   external: true, icon: 'wa' },
    ],
  },
  {
    badge: '🛡️ GARANTÍA 10 AÑOS · FIBRA DE VIDRIO',
    titulo: '16 MODELOS DE FIBRA DE VIDRIO. DESDE 2×3 HASTA 4×8 M.',
    subtitulo: 'Superficie lisa, no porosa, fácil de limpiar. Alta resistencia UV. Gel coat de larga duración. Sin mantenimiento complejo.',
    imagen: '/hero-piscinas.jpg',
    acento: 'blue',
    btns: [
      { label: 'Elegir mi piscina',      href: '#catalogo',   primary: true, icon: 'cart' },
      { label: 'Consultar por WhatsApp', href: WA_PISCINAS,   external: true, icon: 'wa' },
    ],
  },
]

const TRUST = [
  'Instalación en el día',
  '16 modelos disponibles en stock',
  'Garantía 10 años',
  'Pagás en tu domicilio al momento de la instalación',
]

const COMPARATIVA = [
  { aspecto: 'Tiempo de instalación', fibra: 'Instalada en el día', hormigon: '60 a 120 días de obra' },
  { aspecto: 'Costo total', fibra: 'Precio cerrado — sin sorpresas', hormigon: 'Presupuesto abierto — imprevistos constantes' },
  { aspecto: 'Impacto en el patio', fibra: 'Sin escombros. Equipo entra y sale en el día', hormigon: 'Excavadora, barro y semanas de desastre' },
  { aspecto: 'Mantenimiento', fibra: 'Mínimo — superficie lisa no porosa', hormigon: 'Alto — fisuras, algas y revoque periódico' },
]

const FAQ = [
  { q: '¿Cuánto tarda la instalación?', r: 'La instalación de una piscina de fibra se realiza en el día. Stock disponible para coordinar fecha inmediata.' },
  { q: '¿Cuándo y cómo pago?', r: 'El pago total se realiza en tu domicilio el día de la instalación, en efectivo o transferencia. La seña de reserva se abona por MercadoPago (un asesor te envía el link por WhatsApp).' },
  { q: '¿La Miniportante necesita excavación?', r: 'No. La Miniportante es autoportante: se apoya sobre el suelo nivelado. Sin excavación ni obra civil.' },
  { q: '¿Qué garantía tienen?', r: '10 años sobre el casco de fibra de vidrio. El gel coat (color/terminación) tiene 3 años de garantía.' },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* CARRUSEL HERO */}
      <div className="pt-16">
        <PageHeroCarousel slides={SLIDES} />
      </div>

      {/* TRUST BAR */}
      <section className="bg-eco-bg-card border-b border-eco-border py-3">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5">
            {TRUST.map(item => (
              <div key={item} className="flex items-center gap-1.5 text-eco-text-muted text-xs py-0.5">
                <CheckCircle className="w-3 h-3 text-eco-teal flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MINIPORTANTE HIGHLIGHT */}
      <section className="py-6 max-w-7xl mx-auto px-4">
        <div className="bg-eco-teal/5 border border-eco-teal/30 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1">
            <span className="inline-block bg-eco-teal/10 text-eco-teal text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              Sin excavación — Instalación Express
            </span>
            <h2 className="text-2xl font-extrabold text-eco-text mb-1" style={{ fontFamily: 'var(--font-display)' }}>
              Piscina Miniportante
            </h2>
            <p className="text-eco-text-muted text-sm">
              Sin excavación, sin obra civil, instalada en 1 día. El modelo de mayor demanda. Ideal para patios pequeños y quinchos.
            </p>
          </div>
          <a
            href={WA_PISCINAS}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-eco-teal hover:bg-eco-teal-light text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            <MessageCircle className="w-4 h-4" />Reservar Miniportante
          </a>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section id="catalogo" className="py-10 max-w-7xl mx-auto px-4 scroll-mt-20">
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
      <section className="py-12 bg-eco-bg-card border-y border-eco-border">
        <div className="max-w-3xl mx-auto px-4">
          <SectionTitle titulo="Fibra vs. Hormigón" subtitulo="La diferencia que nadie te cuenta antes de construir" />
          <div className="mt-8 overflow-hidden rounded-xl border border-eco-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-eco-bg-surface border-b border-eco-border">
                  <th className="text-left px-4 py-3 text-eco-text-muted">Aspecto</th>
                  <th className="text-center px-4 py-3 text-eco-teal font-bold">Fibra de vidrio</th>
                  <th className="text-center px-4 py-3 text-eco-text-muted">Hormigón</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-eco-border">
                {COMPARATIVA.map(row => (
                  <tr key={row.aspecto} className="hover:bg-eco-bg-surface/50">
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
        <div className="absolute inset-0 hero-grid-pattern opacity-60" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white mb-3 uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ¿Querés reservar tu piscina?
          </h2>
          <p className="text-white/60 mb-8">
            Elegí el modelo, pactamos la fecha de instalación y listo. Pagás en tu domicilio el día que te instalamos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WA_PISCINAS}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-eco-green-dark font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              <MessageCircle className="w-5 h-5" />Reservar por WhatsApp
            </a>
            <a
              href="/financiacion"
              className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/18 text-white font-bold px-8 py-4 rounded-xl transition-all backdrop-blur-sm"
            >
              Ver financiación
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
