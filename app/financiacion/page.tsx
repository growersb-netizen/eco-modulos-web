import Image from 'next/image'
import SectionTitle from '@/components/shared/SectionTitle'
import LoanSimulator from '@/components/shared/LoanSimulator'
import VideoCallButton from '@/components/shared/VideoCallButton'
import FaqAccordion from '@/components/shared/FaqAccordion'
import { MessageCircle, CheckCircle, Shield, Clock } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Financiación Directa Sin Banco | Piscinas Fijas, Módulos por ICC | EcoFiver',
  description: 'Financiación propia sin banco, sin garante y sin VERAZ. Piscinas de fibra en cuotas fijas hasta 36 cuotas. Módulos habitacionales y combos hasta 120 cuotas ajustadas por índice ICC. Aprobación simple. Todo el país.',
  keywords: [
    'financiación sin banco módulos',
    'cuotas sin garante vivienda modular',
    'financiamiento piscinas argentina',
    'módulos hasta 120 cuotas',
    'piscina en cuotas fijas sin banco',
    'crédito vivienda sin VERAZ',
    'financiación directa cooperativa',
  ],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar/financiacion' },
  openGraph: {
    title: 'Financiación Directa Sin Banco | EcoFiver',
    description: 'Piscinas con cuota fija hasta 36 cuotas. Módulos y combos hasta 120 cuotas ajustadas por índice ICC. Sin banco ni garante. Aprobación simple en todo el país.',
    url: 'https://ecomodulosypiscinas.com.ar/financiacion',
  },
}

const FAQ = [
  { q: '¿Qué se requiere para acceder a la financiación?', r: 'Solo se requiere DNI argentino y teléfono de contacto. No se solicitan recibos de sueldo, garantes ni historial crediticio. La aprobación se gestiona directamente con nuestro equipo comercial.' },
  { q: '¿Las cuotas son fijas o variables?', r: 'Depende del producto. Las piscinas tienen cuota fija en pesos desde el inicio del contrato: el valor pactado al firmar se mantiene igual durante toda la vigencia del plan. Los módulos habitacionales y los combos módulo + piscina se ajustan periódicamente según el índice ICC (Índice del Costo de la Construcción) — nunca por dólar ni por inflación general.' },
  { q: '¿Hay descuento por pago contado?', r: 'Sí, cada producto tiene su propio descuento por pago contado respecto al precio de lista; el valor exacto varía según el modelo y se muestra en cada catálogo.' },
  { q: '¿Puedo cancelar anticipadamente?', r: 'Sí, es posible cancelar el saldo anticipadamente en cualquier momento sin penalidad. Si se cancela dentro de los primeros 6 meses, se aplica un descuento adicional sobre el saldo restante.' },
  { q: '¿Cuáles son los plazos de entrega con financiación?', r: 'Para proyectos financiados, los plazos de fabricación e instalación se coordinan al momento de confirmar el pedido y suscribir el plan. Nuestro equipo te informa los tiempos exactos según el modelo y la disponibilidad de stock.' },
  { q: '¿El flete y la instalación están incluidos en el precio?', r: 'El precio de catálogo no incluye flete ni instalación. Estos costos se calculan según la distancia desde nuestra planta en Zárate y se pueden incluir en el plan de financiación.' },
  { q: '¿Puedo financiar el combo módulo + piscina?', r: 'Sí. Sumamos el valor nominal del módulo y la piscina (sin ningún descuento adicional) y financiamos ese total hasta 120 cuotas, ajustadas por índice ICC, con ingreso equivalente a 2 cuotas.' },
]

const PLANES = [
  {
    nombre: 'Plan Corto',
    cuotas: '3 a 12',
    desc: 'Menor costo financiero total. Ideal para proyectos corporativos, compras de reposición o clientes que prefieren cancelar en el menor plazo posible.',
    color: 'eco-green',
    beneficios: ['Menor costo financiero', 'Más apto para empresas', 'Ideal con ingresos estables o capital disponible'],
  },
  {
    nombre: 'Plan Estándar',
    cuotas: '24 a 60',
    desc: 'El plan más elegido para viviendas, quinchos y combos. Balance entre cuota accesible y costo financiero razonable.',
    color: 'eco-teal',
    beneficios: ['Cuota mensual cómoda', 'Plazo equilibrado', 'El más solicitado para vivienda y quincho'],
    badge: 'Más elegido',
  },
  {
    nombre: 'Plan Extendido',
    cuotas: '72 a 120',
    desc: 'Para acceder a más metros cuadrados con la cuota más baja posible. Pensado para vivienda particular y proyectos de mayor inversión.',
    color: 'yellow',
    beneficios: ['Cuota mínima mensual', 'Acceso a módulos de mayor metraje', 'Ideal para vivienda en 120 cuotas'],
  },
]

export default async function FinanciacionPage() {
  const waLink = 'https://wa.me/5491168733406?text=' + encodeURIComponent('Hola, me interesa conocer los planes de financiación')

  return (
    <>
      {/* Hero — premium light */}
      <section className="pt-28 pb-16 bg-eco-bg border-b border-eco-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="badge-green mb-5 inline-flex">Financiación directa</span>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-eco-text uppercase leading-[0.92] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Financiación directa.<br />Sin banco ni garante.<br />
            <span className="text-eco-green">Hasta 120 cuotas.</span>
          </h1>
          <p className="text-eco-text-muted text-lg max-w-2xl mx-auto mb-8">
            Financiación propia de la cooperativa. Piscinas con cuota fija; módulos y combos ajustados por índice ICC. Aprobación directa, sin trámites complejos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold px-8 py-4 rounded-xl transition-colors">
              <MessageCircle className="w-5 h-5" />Consultar financiación
            </a>
            <VideoCallButton variant="outline" label="Agendar videollamada" />
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-12">
          <div className="relative w-full h-[260px] sm:h-[380px] rounded-2xl overflow-hidden">
            <Image src="/hero-financiacion.jpg" alt="Familia firmando su plan de financiación" fill className="object-cover" sizes="(max-width: 1152px) 100vw, 1152px" />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-eco-bg-card border-y border-eco-border py-5">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
            {[
              { icon: Shield, text: 'Sin banco ni garante' },
              { icon: CheckCircle, text: 'Solo DNI argentino' },
              { icon: Clock, text: 'Aprobación en 24 horas' },
              { icon: CheckCircle, text: 'Piscinas fijas · módulos por ICC' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-eco-text-muted text-sm">
                <Icon className="w-4 h-4 text-eco-green flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué financiamos */}
      <section className="py-14 max-w-5xl mx-auto px-4">
        <SectionTitle titulo="¿Qué financiamos?" subtitulo="La financiación cubre el módulo o la piscina terminados llave en mano. Flete e instalación se pueden incluir en el plan." />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icono: '🏠', titulo: 'Viviendas modulares', detalle: 'De 18 a 72 m². Terminadas, habitables y financiadas hasta 120 cuotas ajustadas por ICC.' },
            { icono: '🔥', titulo: 'Quinchos y recreación', detalle: 'Módulos para esparcimiento. Mismo esquema que las viviendas: financiación hasta 120 cuotas ajustadas por ICC. Llave en mano.' },
            { icono: '🏊', titulo: 'Piscinas de fibra', detalle: '16 modelos instalados en 72 hs. Financiación con cuota fija en pesos, hasta 36 cuotas.' },
            { icono: '🔗', titulo: 'Combo módulo + piscina', detalle: 'Se suma el valor nominal de ambos productos, sin descuento adicional. Financiación única hasta 120 cuotas ajustadas por ICC.' },
          ].map(({ icono, titulo, detalle }) => (
            <div key={titulo} className="card-premium p-5 flex flex-col gap-2">
              <span className="text-2xl">{icono}</span>
              <p className="font-bold text-eco-text text-sm" style={{ fontFamily: 'var(--font-display)' }}>{titulo}</p>
              <p className="text-eco-text-muted text-xs">{detalle}</p>
            </div>
          ))}
        </div>
        <p className="text-eco-text-muted text-xs mt-5 text-center">
          Para proyectos corporativos (obradores, campamentos y similares), consulte las condiciones especiales de financiación.
        </p>
      </section>

      {/* Planes */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <SectionTitle titulo="Nuestros planes" subtitulo="Elija el plazo que mejor se adapta a su situación." />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANES.map((plan) => (
            <div key={plan.nombre} className="relative card-premium p-6 flex flex-col gap-3">
              {plan.badge && (
                <span className="absolute top-4 right-4 bg-eco-teal/20 text-eco-teal text-xs font-bold px-2 py-1 rounded-full">{plan.badge}</span>
              )}
              <p className="text-eco-text-muted text-xs uppercase tracking-widest">{plan.cuotas} cuotas</p>
              <h3 className="text-2xl font-extrabold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>{plan.nombre}</h3>
              <p className="text-eco-text-muted text-sm flex-1">{plan.desc}</p>
              <ul className="space-y-2">
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
      </section>

      {/* Simulador */}
      <section className="py-16 bg-eco-bg-card border-y border-eco-border">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle titulo="Simule su cuota" subtitulo="Sin compromiso. Los valores son orientativos; la cotización definitiva incluye flete e instalación." />
          <div className="mt-10"><LoanSimulator /></div>
        </div>
      </section>

      {/* Cómo se calcula la cuota */}
      <section className="py-16 max-w-3xl mx-auto px-4">
        <SectionTitle titulo="Cómo se calcula su cuota" subtitulo="La misma fórmula real que usamos en todos nuestros canales de venta." />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="card-premium p-6">
            <p className="font-bold text-eco-text mb-2" style={{ fontFamily: 'var(--font-display)' }}>Piscinas</p>
            <p className="text-eco-text-muted text-sm mb-3">Cuota fija en pesos a 12, 18, 24 o 36 meses:</p>
            <p className="bg-eco-bg-surface rounded-lg px-4 py-3 text-eco-text text-sm font-mono">cuota = precio de lista ÷ (cuotas + 2)</p>
            <p className="text-eco-text-muted text-xs mt-3">El ingreso inicial equivale a 2 cuotas del plan elegido.</p>
          </div>
          <div className="card-premium p-6">
            <p className="font-bold text-eco-text mb-2" style={{ fontFamily: 'var(--font-display)' }}>Módulos y combos</p>
            <p className="text-eco-text-muted text-sm mb-3">Cuota en pesos ajustada por índice ICC, hasta 120 meses:</p>
            <p className="bg-eco-bg-surface rounded-lg px-4 py-3 text-eco-text text-sm font-mono">cuota = precio de lista ÷ (cuotas + 2)</p>
            <p className="text-eco-text-muted text-xs mt-3">En el combo, el precio de lista es la suma del módulo y la piscina, sin descuento adicional.</p>
          </div>
        </div>
        <p className="text-eco-text-muted text-xs mt-6 text-center">Valores orientativos — use el simulador de arriba para su modelo y plazo exactos.</p>
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
            ¿Desea consultar su plan?
          </h2>
          <p className="text-white/60 mb-10 text-lg">
            El proceso de aprobación es ágil y directo. Sin banco, sin trámites complejos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-eco-green-dark font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              <MessageCircle className="w-5 h-5" />Consultar por WhatsApp
            </a>
            <VideoCallButton variant="outline" />
          </div>
        </div>
      </section>
    </>
  )
}
