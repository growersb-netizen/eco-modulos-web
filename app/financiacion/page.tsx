import Image from 'next/image'
import SectionTitle from '@/components/shared/SectionTitle'
import LoanSimulator from '@/components/shared/LoanSimulator'
import VideoCallButton from '@/components/shared/VideoCallButton'
import FaqAccordion from '@/components/shared/FaqAccordion'
import { MessageCircle, CheckCircle, Shield, Clock } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Financiación Directa Sin Banco | Solo tu DNI | EcoFiver',
  description: 'Vivienda modular o piscina en cuotas, sin banco ni garante. Solo necesitás tu DNI. Piscinas con cuota fija hasta 36 meses. Viviendas y combos hasta 120 cuotas. Aprobación el mismo día. Todo el país.',
  keywords: [
    'financiación sin banco vivienda modular',
    'piscina en cuotas sin banco argentina',
    'cuotas sin garante DNI',
    'vivienda modular financiada',
    'piscinas a plazo sin banco',
    'financiación directa fábrica cooperativa',
    'módulos en cuotas sin recibo de sueldo',
  ],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar/financiacion' },
  openGraph: {
    title: 'Financiación Directa Sin Banco | EcoFiver',
    description: 'Tu vivienda o piscina en cuotas. Sin banco, sin garante, solo tu DNI. Aprobación el mismo día. Todo el país.',
    url: 'https://ecomodulosypiscinas.com.ar/financiacion',
  },
}

const FAQ = [
  { q: '¿Qué se requiere para acceder a la financiación?', r: 'Solo DNI argentino y teléfono de contacto. No pedimos recibo de sueldo, garante ni historial crediticio. La aprobación es directa con nuestro equipo comercial — sin banco, sin trámites.' },
  { q: '¿Las cuotas son fijas o se ajustan?', r: 'Las piscinas tienen cuota 100% fija en pesos desde el primer día: el valor que firmás es el que pagás durante todo el plan. Las viviendas modulares y los combos módulo + piscina se ajustan por índice ICC (el índice oficial de la construcción), no por dólar ni inflación general — lo que protege el valor de tu inversión.' },
  { q: '¿Hay descuento por pago contado?', r: 'Sí. Cada modelo tiene su precio de contado, que refleja un descuento sobre el precio de lista. Lo ves en el catálogo junto a cada producto.' },
  { q: '¿Puedo adelantar la entrega antes de terminar el plan?', r: 'Sí. Integrando capital podés adelantar la entrega: piscinas desde cuota 3, viviendas y combos desde cuota 6. Seguís pagando el saldo restante mensualmente — solo adelantás la entrega, no necesitás cancelar todo.' },
  { q: '¿Cuándo se fabrica y entrega mi vivienda o piscina?', r: 'Para piscinas con stock disponible, la entrega es en 72 horas desde la confirmación del plan. Para viviendas modulares, los plazos se coordinan al confirmar el pedido — nuestro equipo te da la fecha exacta.' },
  { q: '¿El flete y la instalación están incluidos?', r: 'Se calculan aparte según la distancia desde nuestra fábrica en Zárate y se pueden sumar al plan financiado. Nuestro equipo arma el presupuesto completo antes de confirmar.' },
  { q: '¿Puedo financiar el combo módulo + piscina?', r: 'Sí. Se financia el total de los dos productos juntos hasta 120 cuotas ajustadas por ICC — una sola cuota, un solo plan, llave en mano.' },
]

const PLANES = [
  {
    nombre: 'Plan Piscinas',
    cuotas: 'hasta 36',
    desc: 'Cuota 100% fija en pesos desde el día 1. El valor que firmás es el que pagás — sin sorpresas, sin ajustes, sin inflación.',
    icono: '🏊',
    beneficios: ['Cuota fija — sin ajustes', 'Aprobación el mismo día', 'Entrega en 72 horas con stock disponible'],
  },
  {
    nombre: 'Plan Viviendas',
    cuotas: '24 a 120',
    desc: 'El plan más flexible para viviendas modulares y quinchos. Cuotas accesibles con ajuste por índice de la construcción — tu inversión crece con el valor del metro cuadrado.',
    icono: '🏡',
    beneficios: ['Desde 24 hasta 120 cuotas', 'Cuota ajustada por ICC, no por dólar', 'Entrega anticipada desde cuota 6'],
    badge: 'Más elegido',
  },
  {
    nombre: 'Plan Combo',
    cuotas: 'hasta 120',
    desc: 'Cuatro combos cerrados de vivienda + piscina con precio promocional de octubre. Un solo plan de financiación, hasta 120 cuotas. Instalación eléctrica, baños, bordes atérmicos y flete incluidos durante todo el mes.',
    icono: '🔗',
    badge: 'Promo octubre',
    beneficios: ['4 combos cerrados para elegir', 'Hasta 120 cuotas por ICC', 'Instalación eléctrica y baños incluidos'],
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

export default async function FinanciacionPage() {
  const waLink = 'https://wa.me/5491126036495?text=' + encodeURIComponent('Hola, me interesa conocer los planes de financiación')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero — imagen de fondo con overlay */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden border-b border-eco-border">
        {/* Imagen de fondo */}
        <Image
          src="/hero-financiacion.jpg"
          alt="Familia en su vivienda modular financiada — EcoFiver"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Overlay degradado */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
        {/* Patrón de grilla */}
        <div className="absolute inset-0 hero-grid-pattern opacity-25" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-28 pb-16 w-full">
          <span className="inline-flex items-center gap-2 bg-eco-green/20 border border-eco-green/40 text-eco-green text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            Financiación directa de fábrica
          </span>
          <h1
            className="text-5xl sm:text-7xl font-extrabold text-white uppercase leading-[0.9] mb-6 drop-shadow-2xl"
            style={{ fontFamily: 'var(--font-display)', textShadow: '0 2px 30px rgba(0,0,0,0.5)' }}
          >
            Tu piscina o vivienda.<br />Sin banco.<br />
            <span className="text-eco-green drop-shadow-lg">Desde hoy.</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow">
            Financiación propia, directa desde la fábrica. Solo necesitás tu DNI — sin recibo de sueldo, sin garante, sin historial crediticio. Aprobación el mismo día.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            >
              <MessageCircle className="w-5 h-5" />Quiero mi plan ahora
            </a>
            <VideoCallButton variant="outline-white" label="Agendar videollamada" />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-eco-bg-card border-y border-eco-border py-5">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
            {[
              { icon: Shield, text: 'Sin banco ni garante' },
              { icon: CheckCircle, text: 'Solo tu DNI argentino' },
              { icon: Clock, text: 'Aprobación el mismo día' },
              { icon: CheckCircle, text: 'Garantía de fábrica 10 años' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-eco-text-muted text-sm">
                <Icon className="w-4 h-4 text-eco-green flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué podés financiar */}
      <section className="py-14 max-w-5xl mx-auto px-4">
        <SectionTitle titulo="¿Qué se puede financiar?" subtitulo="Vivienda, piscina, quincho o el combo completo — todo con financiación directa, sin banco, en un solo plan." />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icono: '🏡', titulo: 'Viviendas modulares', detalle: 'Desde 24 m². Estructura, instalaciones y terminaciones completas. Financiación hasta 120 cuotas ajustadas por ICC.' },
            { icono: '🔥', titulo: 'Quinchos y espacios sociales', detalle: 'Habitable desde el primer día. Ideal para ampliar tu propiedad. Hasta 120 cuotas.' },
            { icono: '🏊', titulo: 'Piscinas de fibra', detalle: 'Instalada en tu terreno en menos de 72 horas. Cuota 100% fija en pesos, hasta 36 cuotas.' },
            { icono: '🔗', titulo: 'Combo vivienda + piscina', detalle: 'Tu vivienda y tu piscina en una sola cuota. Un solo plan, una sola entrega, todo incluido.' },
          ].map(({ icono, titulo, detalle }) => (
            <div key={titulo} className="card-premium p-5 flex flex-col gap-2">
              <span className="text-2xl">{icono}</span>
              <p className="font-bold text-eco-text text-sm" style={{ fontFamily: 'var(--font-display)' }}>{titulo}</p>
              <p className="text-eco-text-muted text-xs">{detalle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Planes */}
      <section className="py-16 bg-eco-bg-surface border-y border-eco-border">
        <div className="max-w-5xl mx-auto px-4">
          <SectionTitle titulo="Elegís el plan. Nosotros lo hacemos posible." subtitulo="Sin banco ni garante. El plazo que necesitás, la cuota que te cierra." />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANES.map((plan) => (
              <div key={plan.nombre} className="relative card-premium p-6 flex flex-col gap-3">
                {plan.badge && (
                  <span className="absolute top-4 right-4 bg-eco-teal/20 text-eco-teal text-xs font-bold px-2 py-1 rounded-full">{plan.badge}</span>
                )}
                <span className="text-3xl">{plan.icono}</span>
                <p className="text-eco-text-muted text-xs uppercase tracking-widest">{plan.cuotas} cuotas</p>
                <h3 className="text-2xl font-extrabold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>{plan.nombre}</h3>
                <p className="text-eco-text-muted text-sm flex-1">{plan.desc}</p>
                <ul className="space-y-2 pt-2 border-t border-eco-border">
                  {plan.beneficios.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-eco-text-muted">
                      <CheckCircle className="w-4 h-4 text-eco-green flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulador */}
      <section className="py-16 bg-eco-bg-card border-b border-eco-border">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle titulo="Calculá tu cuota" subtitulo="Ingresá el producto y el plazo. Al toque ves cuánto pagás por mes — sin compromiso ni datos personales." />
          <div className="mt-10"><LoanSimulator /></div>
        </div>
      </section>

      {/* Por qué nuestra financiación */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <SectionTitle titulo="Por qué nuestra financiación es diferente" subtitulo="No pasás por banco, no esperás semanas y no dependés de un score crediticio. La aprobación es directa, el mismo día." />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icono: '🏦', titulo: 'Sin banco ni garante', desc: 'La aprobación es directa con nosotros. No necesitás pasar por banco, tarjeta ni análisis de crédito externo.' },
            { icono: '📄', titulo: 'Solo tu DNI', desc: 'Un documento, un contacto telefónico. Sin papelerío, sin turnos, sin demoras. Aprobación el mismo día.' },
            { icono: '🔒', titulo: 'Cuota protegida', desc: 'Las piscinas tienen cuota fija. Las viviendas y combos ajustan por el índice de la construcción — nunca por el dólar ni por inflación general.' },
            { icono: '🚀', titulo: 'Entrega anticipada disponible', desc: 'No hace falta esperar a terminar de pagar. Integrando capital podés adelantar la entrega desde la cuota 3 en piscinas o la cuota 6 en viviendas.' },
            { icono: '🏭', titulo: 'Directo de fábrica', desc: 'Financiamos lo que fabricamos. No hay intermediarios, corredores ni gestores — el trato es directo con la cooperativa.' },
            { icono: '🛡️', titulo: '10 años de garantía', desc: 'Todos los productos llevan garantía de fábrica de 10 años — el respaldo de una cooperativa con más de 15 años de trayectoria.' },
          ].map(({ icono, titulo, desc }) => (
            <div key={titulo} className="card-info p-5 flex gap-4">
              <span className="text-2xl flex-shrink-0">{icono}</span>
              <div>
                <p className="font-bold text-eco-text text-sm mb-1" style={{ fontFamily: 'var(--font-display)' }}>{titulo}</p>
                <p className="text-eco-text-muted text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-eco-bg-surface border-t border-eco-border">
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
            El único requisito<br />es querer empezar.
          </h2>
          <p className="text-white/60 mb-10 text-lg">
            Tu DNI alcanza. El banco no hace falta. Hablá con nuestro equipo y armamos tu plan hoy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-eco-green-dark font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              <MessageCircle className="w-5 h-5" />Empezar por WhatsApp
            </a>
            <VideoCallButton variant="outline-white" />
          </div>
        </div>
      </section>
    </>
  )
}
