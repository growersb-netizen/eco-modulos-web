import { prisma } from '@/lib/db'
import SectionTitle from '@/components/shared/SectionTitle'
import ProductCard from '@/components/shared/ProductCard'
import FaqAccordion from '@/components/shared/FaqAccordion'
import StoreWelcomeModal from '@/components/shared/StoreWelcomeModal'
import LocationModal from '@/components/shared/LocationModal'
import PageHeroCarousel from '@/components/shared/PageHeroCarousel'
import type { PageSlide } from '@/components/shared/PageHeroCarousel'
import { MessageCircle, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Módulos Wood Frame | Tienda Virtual | EcoFiver',
  description: 'Reservá tu módulo Wood Frame online. Llave en mano, instalación en el día, pagás en tu domicilio. Stock disponible. Financiación hasta 120 cuotas sin banco.',
  keywords: ['módulos habitacionales', 'viviendas modulares Wood Frame', 'módulos llave en mano', 'módulos financiación sin banco'],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar/modulos' },
  openGraph: {
    title: 'Módulos Wood Frame | Tienda Virtual | EcoFiver',
    description: 'Reservá tu módulo Wood Frame online. Llave en mano, pagás el día de la instalación en tu domicilio.',
    url: 'https://ecomodulosypiscinas.com.ar/modulos',
  },
}

const WA_MODULOS = 'https://wa.me/5491126036495?text=' + encodeURIComponent('Hola, quiero reservar un módulo. ¿Cuál es la disponibilidad para instalación?')

const SLIDES: PageSlide[] = [
  {
    badge: '🏠 TIENDA VIRTUAL · MÓDULOS',
    titulo: 'RESERVÁ TU MÓDULO HOY Y LO INSTALAMOS ESTA SEMANA',
    subtitulo: 'Stock disponible para entrega inmediata. Reservá tu fecha hoy — pagás cero hasta el día que el equipo lo instala en tu domicilio. Sin anticipos, sin riesgos.',
    imagen: '/hero-modulos.jpg',
    acento: 'teal',
    btns: [
      { label: 'Reservar mi módulo ahora', href: '#catalogo',    primary: true, icon: 'cart' },
      { label: 'Consultar por WhatsApp', href: WA_MODULOS,     external: true, icon: 'wa' },
    ],
  },
  {
    badge: '🔨 LLAVE EN MANO · HABITABLE DESDE EL DÍA 1',
    titulo: 'EL EQUIPO LLEGA, INSTALA Y SE VA. TU ESPACIO ESTÁ LISTO.',
    subtitulo: 'Baño, kitchenette, obra blanca terminada. Sin obra civil, sin escombros, sin semanas de espera. Tu nuevo espacio habitable el mismo día que llega el módulo.',
    imagen: '/hero-modulos.jpg',
    acento: 'green',
    btns: [
      { label: 'Reservar mi módulo ahora', href: '#catalogo',    primary: true, icon: 'cart' },
      { label: 'Consultar por WhatsApp', href: WA_MODULOS,     external: true, icon: 'wa' },
    ],
  },
  {
    badge: '💳 FINANCIACIÓN PROPIA · HASTA 120 CUOTAS',
    titulo: '¿NO TENÉS EL TOTAL? FINANCIAMOS NOSOTROS, SIN BANCO.',
    subtitulo: 'Aprobación en el día, sin trámites bancarios, sin garante. Cuotas que se ajustan a tu presupuesto. Más gente puede tener su módulo de lo que imagina.',
    imagen: '/hero-financiacion.jpg',
    acento: 'blue',
    btns: [
      { label: 'Ver planes de financiación', href: '/financiacion', primary: true, icon: 'arrow' },
      { label: 'Consultar por WhatsApp',     href: WA_MODULOS,      external: true, icon: 'wa' },
    ],
  },
]

const TRUST = [
  'Stock disponible — entrega inmediata',
  'Baño incluido desde 12 m²',
  'Módulos hasta 18 m² instalados en el día',
  'Pagás el día de la instalación, en el domicilio',
]

const FAQ = [
  {
    q: '¿Cuánto tarda la instalación?',
    r: 'Módulos de hasta 18 m² se instalan en el día. Módulos de mayor metraje demoran entre 2 y 5 días. Para compras financiadas, el plazo de entrega se pacta según el plan solicitado.',
  },
  {
    q: '¿Cuándo y cómo pago?',
    r: 'El pago total se realiza el día de la instalación, en el domicilio, en efectivo o transferencia bancaria. No se requieren anticipos. La seña de reserva se abona por MercadoPago (un asesor te envía el link por WhatsApp).',
  },
  {
    q: '¿Qué está incluido en el módulo?',
    r: 'Desde 12 m²: baño completo (inodoro, ducha, lavabo) operativo desde el primer día. Desde 18 m²: kitchenette con mesada y muebles. Todos incluyen instalación eléctrica y sanitaria interna.',
  },
  {
    q: '¿Qué base necesita?',
    r: 'Para módulos de hasta 36 m², una losa de baja densidad, blocks de hormigón o plataforma de madera sobre suelo compactado es suficiente. Nuestro equipo te asesora.',
  },
  {
    q: '¿Se puede financiar?',
    r: 'Sí. Financiación directa hasta 120 cuotas ajustadas por índice ICC, sin banco ni garante. Consultá los planes en la sección Financiación.',
  },
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
  const modulos = await prisma.modulo.findMany({ where: { activo: true }, orderBy: { orden: 'asc' } })

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
      <section className="bg-eco-bg-card border-b border-eco-border py-3">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5">
            {TRUST.map(item => (
              <div key={item} className="flex items-center gap-1.5 text-eco-text-muted text-xs py-0.5">
                <CheckCircle className="w-3 h-3 text-eco-green flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section id="catalogo" className="py-16 bg-eco-bg scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            titulo="Catálogo de módulos"
            subtitulo="Seleccioná tu modelo y reservá la fecha de instalación."
            centrado={false}
          />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {modulos.map(m => (
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-eco-bg-surface border-t border-eco-border">
        <div className="max-w-3xl mx-auto px-4">
          <SectionTitle titulo="Preguntas frecuentes" />
          <div className="mt-8">
            <FaqAccordion items={FAQ} />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-eco-green-dark">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white mb-3 uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ¿Querés reservar tu módulo?
          </h2>
          <p className="text-white/60 mb-8">
            Elegí el modelo, pactamos la fecha de instalación y listo. Pagás el día de la instalación, en el domicilio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WA_MODULOS}
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
