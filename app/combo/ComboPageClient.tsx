'use client'

import Image from 'next/image'
import SectionTitle from '@/components/shared/SectionTitle'
import { MessageCircle, CheckCircle, Gift } from 'lucide-react'
import { formatPeso } from '@/lib/utils'

// Precios calculados: vivienda a $690.000/m² (financiado) + piscina a precio contado.
// Válidos como precio promocional octubre 2026.
const COMBOS = [
  {
    id: 'c1',
    vivienda: 'Vivienda 36 m²',
    piscina: 'Piscina Minimalista 4 m',
    piscinaDetalle: '3,97 × 2,46 × 1,20 m',
    precioPromo: 27840000,
    cuota120: 228197,
    cuota60: 449032,
    ingreso: 456393,
  },
  {
    id: 'c2',
    vivienda: 'Vivienda 45 m²',
    piscina: 'Piscina Playa Húmeda 5,20 m',
    piscinaDetalle: '5,20 × 2,45 × 1,10/1,30 m',
    precioPromo: 34340000,
    cuota120: 281475,
    cuota60: 554032,
    ingreso: 562950,
  },
  {
    id: 'c3',
    vivienda: 'Vivienda 60 m²',
    piscina: 'Piscina Minimalista 6,40 m',
    piscinaDetalle: '6,40 × 3,00 × 1,40 m',
    precioPromo: 45090000,
    cuota120: 369590,
    cuota60: 727258,
    ingreso: 739180,
  },
  {
    id: 'c4',
    vivienda: 'Vivienda 72 m²',
    piscina: 'Piscina Playa y Abanico 9,20 m',
    piscinaDetalle: '9,20 × 3,80 × 1,25/1,80 m',
    precioPromo: 55180000,
    cuota120: 452295,
    cuota60: 889677,
    ingreso: 904590,
  },
]

const BONIFICACIONES = [
  'Instalación eléctrica',
  'Instalación de baños',
  'Bordes atérmicos para la piscina',
  'Flete a todo el país',
]

const WA_BASE = 'https://wa.me/5491126036495?text='

export default function ComboPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-eco-bg border-b border-eco-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="badge-promo-oct mb-5">
            Promo Octubre 2026
          </span>
          <h1
            className="text-5xl sm:text-7xl font-extrabold text-eco-text uppercase leading-[0.92] mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Combo Vivienda<br />
            <span className="text-eco-teal">+ Piscina</span>
          </h1>
          <p className="text-eco-text-muted text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Tu vivienda y tu piscina juntas, a precio promocional de octubre. Elegís el combo que más te cierra — nosotros lo financiamos hasta 120 cuotas, con instalación, baños, bordes y flete incluidos.
          </p>
          <a
            href={WA_BASE + encodeURIComponent('Hola! Quiero info sobre los combos vivienda + piscina de octubre.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold px-8 py-4 rounded-xl transition-all btn-glow-navy"
          >
            <MessageCircle className="w-5 h-5" />Consultar combos por WhatsApp
          </a>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-12">
          <div className="relative w-full h-[260px] sm:h-[380px] rounded-2xl overflow-hidden">
            <Image
              src="/hero-combo.jpg"
              alt="Vivienda modular con piscina — combo octubre EcoFiver"
              fill
              className="object-cover"
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
          </div>
        </div>
      </section>

      {/* Bonificaciones del mes — barra */}
      <section className="bg-eco-bg-card border-b border-eco-border py-5">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <span className="text-orange-400 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
              <Gift className="w-4 h-4" />Todo octubre incluye:
            </span>
            {BONIFICACIONES.map((b) => (
              <div key={b} className="flex items-center gap-2 text-eco-text-muted text-sm">
                <CheckCircle className="w-3.5 h-3.5 text-eco-green flex-shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Los 4 combos */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <SectionTitle
          titulo="Los 4 combos de octubre"
          subtitulo="Elegís el que más te cierra, y lo financiamos. Precio fijo todo el mes — lo que ves es lo que pagás."
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {COMBOS.map((combo) => {
            const msg = `Hola! Me interesa el combo ${combo.vivienda} + ${combo.piscina}. Precio promocional octubre ${formatPeso(combo.precioPromo)}. Quiero armar mi plan.`
            return (
              <div key={combo.id} className="card-premium card-accent-gold p-6 flex flex-col gap-4 relative">
                <div className="absolute top-4 right-4">
                  <span className="badge-promo-oct badge-promo-oct-sm">
                    Promo oct.
                  </span>
                </div>

                {/* Descripción */}
                <div>
                  <p className="text-eco-text-muted text-xs uppercase tracking-widest mb-1">Combo</p>
                  <h3
                    className="text-xl font-extrabold text-eco-text leading-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {combo.vivienda}
                  </h3>
                  <p className="text-eco-teal font-semibold mt-0.5">{combo.piscina}</p>
                  <p className="text-eco-text-muted text-xs mt-0.5">{combo.piscinaDetalle}</p>
                </div>

                {/* Precio promo */}
                <div className="border-t border-eco-border pt-4">
                  <p className="text-eco-text-muted text-xs mb-1">Precio promocional octubre</p>
                  <p
                    className="text-2xl font-extrabold text-eco-text"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {formatPeso(combo.precioPromo)}
                  </p>
                </div>

                {/* Cuotas */}
                <div className="bg-eco-bg-surface rounded-xl p-4 text-center">
                  <p className="text-eco-text-muted text-xs mb-1">120 cuotas ICC desde</p>
                  <p
                    className="text-2xl font-extrabold text-eco-teal"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {formatPeso(combo.cuota120)}
                    <span className="text-sm font-normal text-eco-text-muted">/mes</span>
                  </p>
                  <p className="text-eco-text-muted text-xs mt-1">
                    60 cuotas: {formatPeso(combo.cuota60)}/mes
                  </p>
                  <p className="text-eco-text-muted text-xs mt-1">
                    Ingreso inicial: equivalente a 2 cuotas del plan elegido
                  </p>
                </div>

                {/* Bonificaciones */}
                <div className="space-y-1.5 pt-1">
                  {BONIFICACIONES.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-xs text-eco-text-muted">
                      <CheckCircle className="w-3 h-3 text-eco-green flex-shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={WA_BASE + encodeURIComponent(msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold px-4 py-3 rounded-xl transition-all btn-glow-navy mt-auto"
                >
                  <MessageCircle className="w-4 h-4" />Consultar este combo
                </a>
              </div>
            )
          })}
        </div>
        <p className="text-eco-text-muted text-xs text-center mt-6">
          Precios promocionales de octubre. Cuotas en pesos, ajustadas por índice ICC. Incluyen instalación eléctrica, baños, bordes atérmicos y flete. La cotización final se confirma con el asesor.
        </p>
      </section>

      {/* Por qué el combo */}
      <section className="py-20 bg-eco-bg-surface border-y border-eco-border">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle titulo="Todo resuelto. Un solo plan." subtitulo="No hay que coordinar proveedores, pedir presupuestos ni armar combos — viene todo junto, calculado y listo." />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icono: '🏠',
                titulo: 'Precio cerrado, sin sorpresas',
                desc: 'El valor del combo es el precio promocional de octubre. No hay extras ocultos ni actualizaciones de último momento — lo que ves es lo que firmás.',
              },
              {
                icono: '📋',
                titulo: 'Un solo plan hasta 120 cuotas',
                desc: 'Vivienda y piscina juntas en una sola cuota mensual. Sin banco, sin garante. Ajuste por ICC — no por dólar, no por inflación general.',
              },
              {
                icono: '🚚',
                titulo: 'Cuatro extras sin cargo en octubre',
                desc: 'Instalación eléctrica, baños, bordes atérmicos para la piscina y flete a todo el país — incluidos en el precio, sin negociar ni cotizar aparte.',
              },
            ].map(({ icono, titulo, desc }) => (
              <div key={titulo} className="card-premium p-6">
                <span className="text-3xl mb-4 block">{icono}</span>
                <h3 className="font-bold text-eco-text mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {titulo}
                </h3>
                <p className="text-eco-text-muted text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-24 bg-eco-green-dark relative overflow-hidden">
        <div className="absolute inset-0 hero-grid-pattern opacity-60" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-white mb-4 uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Octubre es el mes<br />para arrancar.
          </h2>
          <p className="text-white/60 mb-10 text-lg">
            Precio promocional con instalación eléctrica, baños, bordes atérmicos y flete incluidos.
            Solo durante octubre, solo en financiación.
          </p>
          <a
            href={WA_BASE + encodeURIComponent('Hola! Quiero info sobre los combos vivienda + piscina de octubre con todo incluido.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-eco-green-dark font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.18)] hover:shadow-[0_8px_36px_rgba(0,0,0,0.28)] hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5" />Consultar mi combo por WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
