import Image from 'next/image'
import SectionTitle from '@/components/shared/SectionTitle'
import LoanSimulator from '@/components/shared/LoanSimulator'
import VideoCallButton from '@/components/shared/VideoCallButton'
import FaqAccordion from '@/components/shared/FaqAccordion'
import { MessageCircle, CheckCircle, Shield, Clock, AlertCircle } from 'lucide-react'
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
  { q: '¿Puedo adelantar la entrega de mi piscina?', r: 'Sí. La entrega estándar de una piscina financiada es al completar el 50% del plan (cuota 18 en plan de 36). Podés adelantarla desde cuota 3 integrando ese 50% antes. Seguís pagando el saldo restante mensualmente.' },
  { q: '¿Cuándo se entrega mi piscina o vivienda?', r: 'Piscinas financiadas: entrega al completar el 50% del plan (cuota 18 en plan 36); adelanto posible desde cuota 3 integrando ese 50%. Viviendas WoodFrame: fecha fija desde la firma — cuota 12 (PLAN12PASOS, 36–60 cuotas), cuota 18 (PLAN18PASOS, 60–108 cuotas), cuota 24 (PLAN24PASOS, 120 cuotas). Módulos habitacionales ECO y PREMIUM: contado, instalación en el día.' },
  { q: '¿El flete y la instalación están incluidos?', r: 'Se calculan aparte según la distancia desde nuestra fábrica en Zárate y se pueden sumar al plan financiado. Nuestro equipo arma el presupuesto completo antes de confirmar.' },
  { q: '¿Puedo financiar el combo módulo + piscina?', r: 'Sí. Se financia el total de los dos productos juntos hasta 120 cuotas ajustadas por ICC — una sola cuota, un solo plan, llave en mano.' },
]

const PLANES = [
  {
    nombre: 'Plan Piscinas',
    cuotas: 'hasta 36',
    desc: (
      <>
        Cuota <strong>100% fija en pesos</strong> desde el día 1. El valor que firmás es el que pagás hasta el último mes — <strong>sin ajustes, sin sorpresas</strong>, sin inflación. Para los que quieren certeza total.
      </>
    ),
    icono: '🏊',
    beneficios: ['Cuota fija — sin ajustes de ningún tipo', 'Aprobación directa el mismo día', 'Entrega en cuota 18 · adelanto desde cuota 3'],
  },
  {
    nombre: 'Plan Viviendas',
    cuotas: '24 a 120',
    desc: (
      <>
        Para quienes buscan su <strong>espacio propio</strong> sin depender del banco ni de un garante. <strong>Desde 24 hasta 120 cuotas</strong>, ajustadas por ICC — el índice que acompaña el valor real de la construcción.
      </>
    ),
    icono: '🏡',
    beneficios: ['Desde 36 hasta 120 cuotas', 'Cuota ajustada por ICC, no por dólar', 'Entrega en cuota 12, 18 o 24 según el plan'],
    badge: 'Más elegido',
  },
  {
    nombre: 'Plan Combo',
    cuotas: 'hasta 120',
    desc: (
      <>
        <strong>Vivienda y piscina en una sola cuota.</strong> Sin coordinar proveedores, sin presupuestos separados. 4 opciones cerradas para octubre — instalación eléctrica, baños, bordes y flete <strong>incluidos</strong>.
      </>
    ),
    icono: '🔗',
    badge: 'Promo octubre',
    beneficios: ['4 combos cerrados para elegir', 'Hasta 120 cuotas por ICC', 'Instalación eléctrica y baños incluidos'],
  },
]

const BARRERAS = [
  {
    icono: <AlertCircle className="w-5 h-5 text-orange-400" />,
    objecion: 'Me rechazaron en el banco',
    respuesta: 'El banco no participa. La aprobación es directamente nuestra — sin análisis crediticio externo, sin score, sin scoring.',
  },
  {
    icono: <AlertCircle className="w-5 h-5 text-orange-400" />,
    objecion: 'No tengo garante ni recibo de sueldo',
    respuesta: 'No los pedimos. Solo DNI argentino y número de contacto. Si trabajás en negro, de manera independiente o informal — igual calificás.',
  },
  {
    icono: <AlertCircle className="w-5 h-5 text-orange-400" />,
    objecion: 'Tenía deudas o historial negativo',
    respuesta: 'No consultamos bases de datos crediticias. Evaluamos tu voluntad de pago directamente con vos — en una conversación, no en un sistema.',
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

      {/* ═══════════════════════════════════════════
          HERO — imagen de fondo con overlay + 3D
      ════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-eco-border">
        <Image
          src="/hero-financiacion.jpg"
          alt="Familia en su vivienda modular financiada — EcoFiver"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Overlay en capas para profundidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/58 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
        <div className="absolute inset-0 hero-grid-pattern opacity-20" />
        {/* Orbes de luz */}
        <div className="light-orb orb-teal absolute" style={{ width: '560px', height: '560px', top: '-120px', left: '-80px', animationDelay: '0s' }} />
        <div className="light-orb orb-gold absolute" style={{ width: '400px', height: '400px', bottom: '-80px', right: '-60px', animationDelay: '1.8s' }} />
        <div className="light-orb orb-white absolute" style={{ width: '300px', height: '300px', top: '30%', right: '12%', animationDelay: '3s' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-28 pb-16 w-full">
          <span className="badge-gold mb-6">
            ✦ Financiación directa de fábrica
          </span>
          <h1
            className="text-5xl sm:text-7xl font-extrabold text-white uppercase leading-[0.9] mb-6 text-3d"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Tu piscina o vivienda.<br />
            <span className="text-white/80">Sin banco.</span><br />
            <span className="text-eco-green" style={{ textShadow: '0 0 40px rgba(78,195,181,0.60), 0 2px 20px rgba(0,0,0,0.50)' }}>Desde hoy.</span>
          </h1>

          {/* Pain/solución — texto con énfasis */}
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-3 leading-relaxed">
            ¿El banco te rechazó? ¿No tenés garante o recibo de sueldo? <strong className="text-white">No importa.</strong>
          </p>
          <p className="text-white/70 text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Financiamos nosotros — directo desde la fábrica. <strong className="text-white">Solo tu DNI.</strong> Aprobación <strong className="text-white">el mismo día</strong>, sin trámites ni esperas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold px-8 py-4 rounded-xl transition-all btn-glow-navy"
            >
              <MessageCircle className="w-5 h-5" />Quiero mi plan ahora
            </a>
            <VideoCallButton variant="outline-white" label="Agendar videollamada" />
          </div>
        </div>
      </section>

      {/* ─── Trust bar ─────────────────────────── */}
      <section className="trust-bar-glass border-y border-eco-border py-5">
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

      {/* ─── Las 3 barreras ────────────────────── */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <SectionTitle
          titulo="Las barreras que creías tener"
          subtitulo="Si alguna de estas frases te suena conocida, este es exactamente el plan que estabas buscando."
        />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {BARRERAS.map(({ icono, objecion, respuesta }) => (
            <div key={objecion} className="card-emboss shadow-3d p-6 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                {icono}
                <p className="text-eco-text-muted text-sm italic leading-relaxed line-through decoration-orange-400/60">"{objecion}"</p>
              </div>
              <div className="border-t border-eco-border pt-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-eco-teal mt-0.5 flex-shrink-0" />
                  <p className="text-eco-text text-sm font-medium leading-relaxed">{respuesta}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="hr-metallic mx-8" />

      {/* ─── Qué se puede financiar ────────────── */}
      <section className="py-14 max-w-5xl mx-auto px-4">
        <SectionTitle titulo="¿Qué se puede financiar?" subtitulo="Vivienda, piscina, quincho o el combo completo — todo con financiación directa, sin banco, en un solo plan." />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icono: '🏡', titulo: 'Viviendas modulares', detalle: 'Desde 24 m². Estructura, instalaciones y terminaciones completas. Hasta 120 cuotas ajustadas por ICC.' },
            { icono: '🔥', titulo: 'Quinchos y espacios sociales', detalle: 'Habitable desde el primer día. Ideal para ampliar tu propiedad. Hasta 120 cuotas.' },
            { icono: '🏊', titulo: 'Piscinas de fibra', detalle: 'Cuota 100% fija en pesos, hasta 36 cuotas. Entrega en cuota 18; adelanto desde cuota 3 completando el 50%.' },
            { icono: '🔗', titulo: 'Combo vivienda + piscina', detalle: 'Todo en una sola cuota. Un solo plan, una sola entrega, llave en mano.' },
          ].map(({ icono, titulo, detalle }) => (
            <div key={titulo} className="card-emboss shadow-3d p-5 flex flex-col gap-3">
              <span className="text-3xl">{icono}</span>
              <p className="font-bold text-eco-text text-sm" style={{ fontFamily: 'var(--font-display)' }}>{titulo}</p>
              <p className="text-eco-text-muted text-xs leading-relaxed">{detalle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Planes — fondo oscuro premium ────── */}
      <section className="py-20 bg-eco-green-dark border-y border-eco-border relative overflow-hidden">
        <div className="absolute inset-0 hero-grid-pattern opacity-15" />
        <div className="light-orb orb-teal absolute" style={{ width: '480px', height: '480px', top: '-100px', right: '-80px', animationDelay: '0.5s' }} />
        <div className="light-orb orb-gold absolute" style={{ width: '360px', height: '360px', bottom: '-80px', left: '-60px', animationDelay: '2.2s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="badge-gold mb-5">Planes disponibles</span>
            <h2
              className="text-4xl sm:text-5xl font-extrabold text-white uppercase leading-tight text-3d mt-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Elegís el plan.<br />
              <span className="text-eco-green">Nosotros lo hacemos posible.</span>
            </h2>
            <p className="text-white/60 mt-4 max-w-xl mx-auto">
              Sin banco ni garante. El plazo que necesitás, la cuota que te cierra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANES.map((plan) => (
              <div key={plan.nombre} className="plan-card p-7 flex flex-col gap-4 relative">
                {plan.badge && (
                  <span className={`absolute top-5 right-5 text-[10px] font-bold uppercase tracking-wider ${plan.badge === 'Promo octubre' ? 'badge-promo-oct badge-promo-oct-sm' : 'badge-gold'}`}>
                    {plan.badge}
                  </span>
                )}
                <span className="text-4xl">{plan.icono}</span>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-widest mb-1">{plan.cuotas} cuotas</p>
                  <h3 className="text-2xl font-extrabold text-white" style={{ fontFamily: 'var(--font-display)' }}>{plan.nombre}</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed flex-1">{plan.desc}</p>
                <ul className="space-y-2.5 pt-3 border-t border-white/10">
                  {plan.beneficios.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-eco-teal flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/18 border border-white/20 hover:border-eco-teal/50 text-white font-bold px-4 py-3 rounded-xl transition-all mt-auto hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4" />Consultar este plan
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hr-metallic mx-8" />

      {/* ─── Simulador ─────────────────────────── */}
      <section className="py-16 bg-eco-bg-card border-b border-eco-border">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle titulo="Calculá tu cuota" subtitulo="Ingresá el producto y el plazo. Al toque ves cuánto pagás por mes — sin compromiso ni datos personales." />
          <div className="mt-10"><LoanSimulator /></div>
        </div>
      </section>

      {/* ─── Por qué diferente ─────────────────── */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <SectionTitle titulo="Por qué nuestra financiación es diferente" subtitulo="No pasás por banco, no esperás semanas y no dependés de un score crediticio." />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icono: '🏦',
              titulo: 'Sin banco ni garante',
              desc: 'No pasamos tu consulta por ningún banco. La aprobación es nuestra — directa, el mismo día que consultás. Sin garante, sin historial crediticio requerido.',
            },
            {
              icono: '📄',
              titulo: 'Solo tu DNI',
              desc: 'Eso es todo lo que pedimos. Un documento. Sin recibo de sueldo, sin estado de cuenta, sin garantía real. Si sos argentino y tenés DNI, ya calificás.',
            },
            {
              icono: '🔒',
              titulo: 'Cuota protegida',
              desc: 'Piscinas: cuota 100% fija desde que firmás hasta el último mes. Viviendas y combos: ajuste por índice de la construcción — nunca por dólar ni inflación general.',
            },
            {
              icono: '🚀',
              titulo: 'Entrega anticipada disponible',
              desc: 'Piscinas: la entrega estándar es en cuota 18 (50% del plan). Podés adelantarla desde cuota 3 completando ese 50% antes. Viviendas WoodFrame: fecha fija en cuota 12, 18 o 24 según el plan elegido.',
            },
            {
              icono: '🏭',
              titulo: 'Directo de fábrica',
              desc: 'Sin intermediarios, sin gestores, sin comisiones. Financiamos lo que fabricamos — el trato es directo con la cooperativa, sin terceros en el medio.',
            },
            {
              icono: '🛡️',
              titulo: '10 años de garantía',
              desc: 'Garantía escrita de fábrica, 10 años. No la de un distribuidor — la nuestra. El respaldo de una cooperativa con más de 15 años de operación continua.',
            },
          ].map(({ icono, titulo, desc }) => (
            <div key={titulo} className="card-emboss shadow-3d p-5 flex gap-4">
              <span className="text-2xl flex-shrink-0">{icono}</span>
              <div>
                <p className="font-bold text-eco-text text-sm mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>{titulo}</p>
                <p className="text-eco-text-muted text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────── */}
      <section className="py-20 bg-eco-bg-surface border-t border-eco-border">
        <div className="max-w-3xl mx-auto px-4">
          <SectionTitle titulo="Preguntas frecuentes" />
          <div className="mt-10">
            <FaqAccordion items={FAQ} />
          </div>
        </div>
      </section>

      {/* ─── CTA final ─────────────────────────── */}
      <section className="py-24 bg-eco-green-dark relative overflow-hidden">
        <div className="absolute inset-0 hero-grid-pattern opacity-60" />
        <div className="light-orb orb-teal absolute" style={{ width: '500px', height: '500px', top: '-100px', left: '-80px', animationDelay: '0s' }} />
        <div className="light-orb orb-gold absolute" style={{ width: '320px', height: '320px', bottom: '-60px', right: '-40px', animationDelay: '2s' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 uppercase text-3d" style={{ fontFamily: 'var(--font-display)' }}>
            El único requisito<br />es querer empezar.
          </h2>
          <p className="text-white/60 mb-3 text-lg">
            Tu DNI alcanza. El banco no hace falta.
          </p>
          <p className="text-white/50 mb-10">
            Hablá con nuestro equipo y armamos tu plan hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-eco-green-dark font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.18)] hover:shadow-[0_8px_36px_rgba(0,0,0,0.28)] hover:-translate-y-0.5"
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
