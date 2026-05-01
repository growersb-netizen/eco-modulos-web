import { prisma } from '@/lib/db'
import SectionTitle from '@/components/shared/SectionTitle'
import LoanSimulator from '@/components/shared/LoanSimulator'
import VideoCallButton from '@/components/shared/VideoCallButton'
import { MessageCircle, CheckCircle, Shield, Clock } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Financiación Directa Hasta 120 Cuotas Sin Banco | Eco Módulos & Piscinas',
  description: 'Financiación propia sin banco, sin garante y sin VERAZ. Módulos habitacionales y piscinas de fibra en hasta 120 cuotas fijas. Aprobación simple, cuota accesible. Todo el país.',
  keywords: [
    'financiación sin banco módulos',
    'cuotas sin garante vivienda modular',
    'financiamiento piscinas argentina',
    'módulos hasta 120 cuotas',
    'piscina en cuotas sin banco',
    'crédito vivienda sin VERAZ',
    'financiación directa cooperativa',
  ],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar/financiacion' },
  openGraph: {
    title: 'Financiación Hasta 120 Cuotas Sin Banco | Eco Módulos & Piscinas',
    description: 'Módulos y piscinas en cuotas fijas sin banco ni garante. Aprobación simple en todo el país.',
    url: 'https://ecomodulosypiscinas.com.ar/financiacion',
  },
}

const FAQ = [
  { q: '¿Qué se requiere para acceder a la financiación?', r: 'Solo necesitás DNI argentino y teléfono de contacto. No pedimos recibos de sueldo, garantes ni historial crediticio. La aprobación es directa con nuestro equipo de ventas.' },
  { q: '¿Las cuotas son fijas o variables?', r: 'Las cuotas son fijas en pesos desde el inicio del contrato. No se ajustan por inflación ni por ningún índice. Lo que firmás, pagás.' },
  { q: '¿Hay descuento por pago contado?', r: 'Sí. El precio de lista tiene un descuento del 30% para pago contado. Este es el precio que se muestra en el catálogo.' },
  { q: '¿Puedo cancelar anticipadamente?', r: 'Sí, podés cancelar el saldo en cualquier momento sin penalidad. Si cancelás dentro de los primeros 6 meses, te hacemos un descuento adicional sobre el saldo restante.' },
  { q: '¿La financiación tiene entrega inmediata?', r: 'No. La entrega e instalación inmediata desde stock es exclusiva para compras al contado. Para compras financiadas, los plazos de fabricación se coordinan al momento de confirmar el pedido y suscribir el plan.' },
  { q: '¿El flete y la instalación están incluidos en el precio?', r: 'El precio de catálogo no incluye flete ni instalación. Estos costos se calculan según la distancia desde nuestra planta en Zárate y se pueden incluir en el plan de financiación.' },
  { q: '¿Puedo financiar el combo módulo + piscina?', r: 'Sí. El combo tiene financiación hasta 60 cuotas y un descuento del 25% sobre el precio total de ambos productos.' },
]

const PLANES = [
  {
    nombre: 'Plan Corto',
    cuotas: '3 a 12',
    desc: 'Menor costo financiero total. Ideal para proyectos corporativos, compras de reposición o quienes prefieren liquidar rápido.',
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
  const coeficientes = await prisma.coeficienteCuota.findMany({
    where: { activo: true },
    orderBy: { cuotas: 'asc' },
  })

  const waLink = 'https://wa.me/5491144498854?text=' + encodeURIComponent('Hola, me interesa conocer los planes de financiación')

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-eco-green-dark to-eco-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-eco-green/10 text-eco-green text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Financiación directa</span>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white uppercase mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Sin banco.<br />Sin garante.<br />Hasta 120 cuotas.
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Financiación propia de la cooperativa. Aprobación directa, cuotas fijas, sin trámites imposibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold px-8 py-4 rounded-xl transition-colors">
              <MessageCircle className="w-5 h-5" />Consultar financiación
            </a>
            <VideoCallButton variant="outline" label="Agendar videollamada" />
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
              { icon: Clock, text: 'Aprobación en 24 hs' },
              { icon: CheckCircle, text: 'Cuotas fijas en pesos' },
              { icon: Clock, text: 'Entrega inmediata: solo al contado' },
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
            { icono: '🏠', titulo: 'Viviendas modulares', detalle: 'De 18 a 72 m². Terminadas, habitables y financiadas hasta 120 cuotas.' },
            { icono: '🔥', titulo: 'Quinchos y recreación', detalle: 'Módulos para esparcimiento. Financiación hasta 60 cuotas. Llave en mano.' },
            { icono: '🏊', titulo: 'Piscinas de fibra', detalle: '16 modelos instalados en 72 hs. Financiación hasta 120 cuotas sin banco.' },
            { icono: '🔗', titulo: 'Combo módulo + piscina', detalle: '25% de descuento sobre el total. Financiación única hasta 60 cuotas.' },
          ].map(({ icono, titulo, detalle }) => (
            <div key={titulo} className="bg-eco-bg-card border border-eco-border rounded-xl p-5 flex flex-col gap-2">
              <span className="text-2xl">{icono}</span>
              <p className="font-bold text-eco-text text-sm" style={{ fontFamily: 'var(--font-display)' }}>{titulo}</p>
              <p className="text-eco-text-muted text-xs">{detalle}</p>
            </div>
          ))}
        </div>
        <p className="text-eco-text-muted text-xs mt-5 text-center">
          Para proyectos corporativos (obradores, campamentos, etc.), consultá condiciones especiales de pago.
        </p>
      </section>

      {/* Planes */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <SectionTitle titulo="Nuestros planes" subtitulo="Elegí el plazo que más se adapta a tu situación." />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANES.map((plan) => (
            <div key={plan.nombre} className="relative bg-eco-bg-card border border-eco-border rounded-2xl p-6 flex flex-col gap-3">
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
          <SectionTitle titulo="Simulá tu cuota" subtitulo="Sin compromiso. Los valores son orientativos; la cotización final incluye flete e instalación." />
          <div className="mt-10"><LoanSimulator /></div>
        </div>
      </section>

      {/* Tabla de coeficientes */}
      {coeficientes.length > 0 && (
        <section className="py-16 max-w-3xl mx-auto px-4">
          <SectionTitle titulo="Tabla de coeficientes" subtitulo="El coeficiente se multiplica por el precio de contado para obtener el total financiado." />
          <div className="mt-8 overflow-hidden rounded-xl border border-eco-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-eco-bg-surface border-b border-eco-border">
                  <th className="text-left px-4 py-3 text-eco-text-muted">Cuotas</th>
                  <th className="text-center px-4 py-3 text-eco-text-muted">Coeficiente</th>
                  <th className="text-center px-4 py-3 text-eco-text-muted">Ejemplo $1.000.000</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-eco-border">
                {coeficientes.map((c) => (
                  <tr key={c.id} className="hover:bg-eco-bg-surface/50">
                    <td className="px-4 py-3 text-eco-text font-medium">{c.cuotas} cuotas</td>
                    <td className="px-4 py-3 text-center text-eco-text-muted">×{c.coef.toFixed(2)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-eco-green font-semibold">
                        {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(Math.round(1000000 * c.coef / c.cuotas))}/mes
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-eco-text-muted text-xs mt-4 text-center">Coeficientes vigentes. Pueden actualizarse. La cotización final es la que prevalece.</p>
        </section>
      )}

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
        <h2 className="text-4xl font-extrabold text-eco-text mb-4 uppercase" style={{ fontFamily: 'var(--font-display)' }}>¿Querés saber si calificás?</h2>
        <p className="text-eco-text-muted mb-8">Hablá con nuestro equipo. La aprobación es rápida y sin vueltas.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold px-8 py-4 rounded-xl transition-colors">
            <MessageCircle className="w-5 h-5" />Consultar por WhatsApp
          </a>
          <VideoCallButton variant="outline" />
        </div>
      </section>
    </>
  )
}
