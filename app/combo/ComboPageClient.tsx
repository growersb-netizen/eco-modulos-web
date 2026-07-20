'use client'

import { useState, useEffect } from 'react'
import SectionTitle from '@/components/shared/SectionTitle'
import VideoCallButton from '@/components/shared/VideoCallButton'
import { MessageCircle, CheckCircle, Tag } from 'lucide-react'
import { formatPeso } from '@/lib/utils'

interface Modulo { id: string; nombre: string; medida: string; precio_contado: number; precio_lista: number }
interface Piscina { id: string; nombre: string; medida: string; precio_contado: number; precio_lista: number }

const CUOTAS = [12, 24, 36, 48, 60, 72, 84, 96, 108, 120]

export default function ComboPageClient() {
  const [modulos, setModulos] = useState<Modulo[]>([])
  const [piscinas, setPiscinas] = useState<Piscina[]>([])
  const [moduloId, setModuloId] = useState('')
  const [piscinaId, setPiscinaId] = useState('')
  const [cuotas, setCuotas] = useState(120)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/modulos').then((r) => r.json()),
      fetch('/api/piscinas').then((r) => r.json()),
    ]).then(([m, p]) => {
      const modulosArr = Array.isArray(m) ? m : []
      const piscinasArr = Array.isArray(p) ? p : []
      setModulos(modulosArr)
      setPiscinas(piscinasArr)
      if (modulosArr.length) setModuloId(modulosArr[0].id)
      if (piscinasArr.length) setPiscinaId(piscinasArr[0].id)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }, [])

  const modulo = modulos.find((m) => m.id === moduloId)
  const piscina = piscinas.find((p) => p.id === piscinaId)

  // Total a financiar = suma del valor nominal (precio de lista) de ambos productos,
  // sin ningún descuento adicional. Misma fórmula que landing-financiacion:
  // cuota = total / (cuotas + 2), ingreso = 2 * cuota.
  const precioListaTotal = (modulo?.precio_lista ?? 0) + (piscina?.precio_lista ?? 0)
  // Referencia informativa: lo que costaría cada producto pagado de contado por separado.
  const precioContadoTotal = (modulo?.precio_contado ?? 0) + (piscina?.precio_contado ?? 0)
  const FACTOR_INGRESO = 2
  const cuotaMensual = precioListaTotal / (cuotas + FACTOR_INGRESO)
  const ingreso = cuotaMensual * FACTOR_INGRESO

  const waLink = modulo && piscina
    ? 'https://wa.me/5491168733406?text=' + encodeURIComponent(
        `Hola, me interesa el Combo Módulo + Piscina:\n• Módulo: ${modulo.nombre} (${modulo.medida})\n• Piscina: ${piscina.nombre} (${piscina.medida})\n• Plan: ${cuotas} cuotas ajustadas por ICC\nTotal a financiar: ${formatPeso(precioListaTotal)}\n¿Me podés dar más info?`
      )
    : '#'

  return (
    <>
      {/* Hero — premium light */}
      <section className="pt-28 pb-16 bg-eco-bg border-b border-eco-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-1.5 bg-eco-teal/8 border border-eco-teal/20 text-eco-teal text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            Un solo plan de financiación
          </span>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-eco-text uppercase leading-[0.92] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Combo Módulo<br />
            <span className="text-eco-teal">+ Piscina</span>
          </h1>
          <p className="text-eco-text-muted text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Combine su módulo habitacional con una piscina de fibra de vidrio y financie el valor total en un solo plan, hasta 120 cuotas ajustadas por índice ICC.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold px-8 py-4 rounded-xl transition-all shadow-[0_4px_16px_rgba(11,35,80,0.25)] hover:shadow-[0_8px_24px_rgba(11,35,80,0.35)]">
              <MessageCircle className="w-5 h-5" />Consultar combo por WhatsApp
            </a>
            <VideoCallButton productoDefault="combo" variant="outline" label="Agendar videollamada" />
          </div>
        </div>
      </section>

      {/* Configurador */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <SectionTitle titulo="Configure su combo" subtitulo="Seleccione el módulo y la piscina de su preferencia y arme su plan de financiación." />

        {loading ? (
          <div className="mt-10 text-center text-eco-text-muted">Cargando productos…</div>
        ) : (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Selectores */}
            <div className="space-y-6">
              <div>
                <label className="block text-eco-text-muted text-sm mb-2">Módulo habitacional</label>
                <select
                  value={moduloId}
                  onChange={(e) => setModuloId(e.target.value)}
                  className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-4 py-3 focus:outline-none focus:border-eco-green"
                >
                  {modulos.map((m) => (
                    <option key={m.id} value={m.id}>{m.nombre} — {m.medida}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-eco-text-muted text-sm mb-2">Piscina de fibra de vidrio</label>
                <select
                  value={piscinaId}
                  onChange={(e) => setPiscinaId(e.target.value)}
                  className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-4 py-3 focus:outline-none focus:border-eco-teal"
                >
                  {piscinas.map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre} — {p.medida}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-eco-text-muted text-sm mb-2">Plan de financiación</label>
                <div className="flex flex-wrap gap-2">
                  {CUOTAS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCuotas(c)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${cuotas === c ? 'bg-eco-green text-white' : 'bg-eco-bg-surface border border-eco-border text-eco-text-muted hover:border-eco-green'}`}
                    >
                      {c} cuotas
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumen de precio */}
            <div className="bg-eco-bg-card border border-eco-border rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="font-bold text-eco-text text-lg" style={{ fontFamily: 'var(--font-display)' }}>Resumen del combo</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-eco-text-muted">
                  <span>{modulo?.nombre ?? '—'}</span>
                  <span>{modulo ? formatPeso(modulo.precio_lista) : '—'}</span>
                </div>
                <div className="flex justify-between text-eco-text-muted">
                  <span>{piscina?.nombre ?? '—'}</span>
                  <span>{piscina ? formatPeso(piscina.precio_lista) : '—'}</span>
                </div>
                <div className="border-t border-eco-border pt-2 flex justify-between text-eco-text font-semibold">
                  <span className="flex items-center gap-1.5"><Tag className="w-4 h-4 text-eco-teal" />Total a financiar</span>
                  <span>{formatPeso(precioListaTotal)}</span>
                </div>
                <p className="text-eco-text-muted text-xs">
                  Si prefiere pagar cada producto de contado por separado: {formatPeso(precioContadoTotal)}.
                </p>
              </div>

              <div className="bg-eco-bg-surface rounded-xl p-4 text-center">
                <p className="text-eco-text-muted text-xs uppercase tracking-wider mb-1">{cuotas} cuotas de</p>
                <p className="text-3xl font-extrabold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>{formatPeso(Math.round(cuotaMensual))}<span className="text-sm font-normal text-eco-text-muted">/mes</span></p>
                <p className="text-eco-text-muted text-xs mt-1">+ ingreso de {formatPeso(Math.round(ingreso))} (equivalente a 2 cuotas)</p>
                <p className="text-eco-text-muted text-xs mt-1">Cuota en pesos, ajustada por índice ICC.</p>
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" />Consultar por WhatsApp
              </a>
              <p className="text-eco-text-muted text-xs text-center">Precios de referencia. La cotización final incluye flete e instalación.</p>
            </div>
          </div>
        )}
      </section>

      {/* Beneficios */}
      <section className="py-20 bg-eco-bg-surface border-y border-eco-border">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle titulo="¿Por qué el combo?" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Tag, titulo: 'Un solo trámite', desc: 'Se suma el valor nominal de módulo y piscina, sin recargos ni descuentos artificiales: es la suma real de cada producto.' },
              { icon: CheckCircle, titulo: 'Un solo plan de pago', desc: 'Todo en un único plan de financiación directa, sin banco, sin garante. Hasta 120 cuotas con el combo, ajustadas por índice ICC.' },
              { icon: MessageCircle, titulo: 'Instalación coordinada', desc: 'Módulo y piscina se fabrican en paralelo y se instalan en la misma visita. Un solo viaje de logística.' },
            ].map(({ icon: Icon, titulo, desc }) => (
              <div key={titulo} className="card-premium p-6">
                <div className="w-10 h-10 rounded-xl bg-eco-teal/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-eco-teal" />
                </div>
                <h3 className="font-bold text-eco-text mb-2" style={{ fontFamily: 'var(--font-display)' }}>{titulo}</h3>
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
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 uppercase" style={{ fontFamily: 'var(--font-display)' }}>
            ¿Desea saber más?
          </h2>
          <p className="text-white/60 mb-10 text-lg">
            Nuestro equipo comercial arma el combo ideal según su terreno y presupuesto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-eco-green-dark font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              <MessageCircle className="w-5 h-5" />Consultar combo por WhatsApp
            </a>
            <VideoCallButton productoDefault="combo" variant="outline" />
          </div>
        </div>
      </section>
    </>
  )
}
