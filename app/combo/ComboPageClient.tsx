'use client'

import { useState, useEffect } from 'react'
import SectionTitle from '@/components/shared/SectionTitle'
import VideoCallButton from '@/components/shared/VideoCallButton'
import { MessageCircle, CheckCircle, Tag } from 'lucide-react'
import { formatPeso } from '@/lib/utils'

interface Modulo { id: string; nombre: string; medida: string; precio_contado: number }
interface Piscina { id: string; nombre: string; medida: string; precio_contado: number }

const DESCUENTO = 0.25
const CUOTAS = [12, 24, 36, 48, 60]

export default function ComboPageClient() {
  const [modulos, setModulos] = useState<Modulo[]>([])
  const [piscinas, setPiscinas] = useState<Piscina[]>([])
  const [moduloId, setModuloId] = useState('')
  const [piscinaId, setPiscinaId] = useState('')
  const [cuotas, setCuotas] = useState(60)
  const [coeficientes, setCoeficientes] = useState<Record<number, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/modulos').then((r) => r.json()),
      fetch('/api/piscinas').then((r) => r.json()),
      fetch('/api/admin/coeficientes').then((r) => r.json()),
    ]).then(([m, p, c]) => {
      setModulos(m)
      setPiscinas(p)
      if (m.length) setModuloId(m[0].id)
      if (p.length) setPiscinaId(p[0].id)
      const map: Record<number, number> = {}
      if (Array.isArray(c)) c.forEach((x: { cuotas: number; coef: number }) => { map[x.cuotas] = x.coef })
      setCoeficientes(map)
      setLoading(false)
    })
  }, [])

  const modulo = modulos.find((m) => m.id === moduloId)
  const piscina = piscinas.find((p) => p.id === piscinaId)

  const precioSinDescuento = (modulo?.precio_contado ?? 0) + (piscina?.precio_contado ?? 0)
  const ahorro = precioSinDescuento * DESCUENTO
  const precioCombo = precioSinDescuento - ahorro
  const coef = coeficientes[cuotas] ?? 1.5
  const cuotaMensual = precioCombo * coef / cuotas

  const waLink = modulo && piscina
    ? 'https://wa.me/5491168733406?text=' + encodeURIComponent(
        `Hola, me interesa el Combo Especial:\n• Módulo: ${modulo.nombre} (${modulo.medida})\n• Piscina: ${piscina.nombre} (${piscina.medida})\n• Plan: ${cuotas} cuotas\nTotal combo: ${formatPeso(precioCombo)}\n¿Me podés dar más info?`
      )
    : '#'

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-[#1a1200] to-eco-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-yellow-400/10 text-yellow-400 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            Oferta exclusiva
          </span>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white uppercase mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Combo<br />25% OFF
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Combiná tu módulo habitacional con una piscina de fibra de vidrio y ahorrás 25% sobre el precio total. Un solo plan de financiación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-xl transition-colors">
              <MessageCircle className="w-5 h-5" />Consultar combo
            </a>
            <VideoCallButton productoDefault="combo" variant="outline" label="Agendar videollamada" />
          </div>
        </div>
      </section>

      {/* Configurador */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <SectionTitle titulo="Armá tu combo" subtitulo="Elegí el módulo y la piscina que más te gustan. El descuento se aplica automáticamente." />

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
                  <span>{modulo ? formatPeso(modulo.precio_contado) : '—'}</span>
                </div>
                <div className="flex justify-between text-eco-text-muted">
                  <span>{piscina?.nombre ?? '—'}</span>
                  <span>{piscina ? formatPeso(piscina.precio_contado) : '—'}</span>
                </div>
                <div className="border-t border-eco-border pt-2 flex justify-between text-eco-text">
                  <span>Subtotal</span>
                  <span className="line-through text-eco-text-muted">{formatPeso(precioSinDescuento)}</span>
                </div>
                <div className="flex justify-between text-yellow-400 font-semibold">
                  <span className="flex items-center gap-1.5"><Tag className="w-4 h-4" />Descuento 25%</span>
                  <span>— {formatPeso(ahorro)}</span>
                </div>
              </div>

              <div className="bg-eco-bg-surface rounded-xl p-4 text-center">
                <p className="text-eco-text-muted text-xs uppercase tracking-wider mb-1">Precio combo contado</p>
                <p className="text-4xl font-extrabold text-eco-green" style={{ fontFamily: 'var(--font-display)' }}>{formatPeso(precioCombo)}</p>
              </div>

              <div className="bg-eco-bg-surface rounded-xl p-4 text-center">
                <p className="text-eco-text-muted text-xs uppercase tracking-wider mb-1">{cuotas} cuotas de</p>
                <p className="text-3xl font-extrabold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>{formatPeso(Math.round(cuotaMensual))}<span className="text-sm font-normal text-eco-text-muted">/mes</span></p>
                <p className="text-eco-text-muted text-xs mt-1">Total financiado: {formatPeso(Math.round(cuotaMensual * cuotas))}</p>
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
      <section className="py-16 bg-eco-bg-card border-y border-eco-border">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle titulo="¿Por qué el combo?" />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Tag, titulo: '25% de ahorro real', desc: 'El descuento se aplica sobre el precio total de ambos productos. No es un descuento de lista: son los precios reales de contado con 25% off.' },
              { icon: CheckCircle, titulo: 'Un solo plan de pago', desc: 'Todo en un único plan de financiación directa, sin banco, sin garante. Hasta 60 cuotas fijas con el combo.' },
              { icon: MessageCircle, titulo: 'Instalación coordinada', desc: 'Módulo y piscina se fabrican en paralelo y se instalan en la misma visita. Un solo viaje de logística.' },
            ].map(({ icon: Icon, titulo, desc }) => (
              <div key={titulo} className="bg-eco-bg-surface rounded-xl p-6">
                <Icon className="w-6 h-6 text-yellow-400 mb-3" />
                <h3 className="font-bold text-eco-text mb-2" style={{ fontFamily: 'var(--font-display)' }}>{titulo}</h3>
                <p className="text-eco-text-muted text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-eco-text mb-4 uppercase" style={{ fontFamily: 'var(--font-display)' }}>¿Querés saber más?</h2>
        <p className="text-eco-text-muted mb-8">Nuestro equipo comercial te arma el combo ideal según tu terreno y presupuesto.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold px-8 py-4 rounded-xl transition-colors">
            <MessageCircle className="w-5 h-5" />WhatsApp — Combos
          </a>
          <VideoCallButton productoDefault="combo" variant="outline" />
        </div>
      </section>
    </>
  )
}
