'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Calculator, Phone, User, CheckCircle } from 'lucide-react'
import { trackSimulador } from '@/lib/analytics'
import { formatPeso as fmt } from '@/lib/utils'

const CUOTAS = [3, 6, 12, 18, 24, 36, 48, 60, 72, 84, 96, 108, 120]

interface Producto {
  id: string
  nombre: string
  medida: string
  precio_contado: number
}

interface SimuladorResult {
  precioContado: number
  precioLista: number
  coef: number
  total: number
  cuota: number
  label: string
}

export default function LoanSimulator() {
  const [modulos, setModulos] = useState<Producto[]>([])
  const [piscinas, setPiscinas] = useState<Producto[]>([])
  const [productoId, setProductoId] = useState('')
  const [tipo, setTipo] = useState<'modulo' | 'piscina'>('modulo')
  const [cuotas, setCuotas] = useState(12)
  const [result, setResult] = useState<SimuladorResult | null>(null)
  const [loading, setLoading] = useState(false)

  // Lead capture
  const [leadNombre, setLeadNombre] = useState('')
  const [leadTelefono, setLeadTelefono] = useState('')
  const [leadSending, setLeadSending] = useState(false)
  const [leadSent, setLeadSent] = useState(false)
  const [leadError, setLeadError] = useState('')

  useEffect(() => {
    Promise.all([
      fetch('/api/modulos').then((r) => r.json()),
      fetch('/api/piscinas').then((r) => r.json()),
    ]).then(([m, p]) => {
      const modulosArr = Array.isArray(m) ? m : []
      const piscinasArr = Array.isArray(p) ? p : []
      setModulos(modulosArr.filter((x: any) => x.activo))
      setPiscinas(piscinasArr.filter((x: any) => x.activo))
      if (modulosArr.length > 0) setProductoId(modulosArr[0].id)
    }).catch(() => {
      // DB not available — simulator stays in empty state
    })
  }, [])

  const calcular = useCallback(async () => {
    if (!productoId) return
    setLoading(true)
    try {
      const res = await fetch('/api/simulador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productoId, tipo, cuotas }),
      })
      const data = await res.json()
      // Only set result if the response is valid (has cuota field)
      if (res.ok && typeof data.cuota === 'number') {
        setResult(data)
        trackSimulador(productoId, cuotas, data.cuota)
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [productoId, tipo, cuotas])

  useEffect(() => {
    calcular()
  }, [calcular])

  // Derivados de estado
  const productos = tipo === 'modulo' ? modulos : piscinas
  const productoSeleccionado = productos.find((p) => p.id === productoId)
  const vendedor = tipo === 'piscina' ? 'hernan' : 'daniel'

  async function enviarLead() {
    if (!leadTelefono.trim()) {
      setLeadError('El teléfono es obligatorio.')
      return
    }
    if (!result || !productoSeleccionado) return

    setLeadSending(true)
    setLeadError('')

    const notas = `Simulación: ${productoSeleccionado.nombre} — ${cuotas} cuotas de ${fmt(result.cuota)}/mes. Total: ${fmt(result.total)}. Precio contado: ${fmt(result.precioContado)}.`

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: leadNombre.trim() || undefined,
          telefono: leadTelefono.trim(),
          producto_interes: productoSeleccionado.nombre,
          plan_pago: result.label,
          cuotas_simuladas: cuotas,
          mensaje: notas,
          fuente: 'simulador',
        }),
      })
      if (res.ok) {
        setLeadSent(true)
      } else {
        const d = await res.json()
        setLeadError(d.error || 'Hubo un error. Intentá de nuevo.')
      }
    } catch {
      setLeadError('No se pudo enviar. Intentá de nuevo.')
    } finally {
      setLeadSending(false)
    }
  }
  const waLink = result && productoSeleccionado && typeof result.cuota === 'number'
    ? `https://wa.me/${tipo === 'piscina' ? process.env.NEXT_PUBLIC_WA_HERNAN || '5491168733406' : process.env.NEXT_PUBLIC_WA_DANIEL || '5491168733406'}?text=${encodeURIComponent(
        `Hola, simulé ${productoSeleccionado.nombre} en ${cuotas} cuotas (${result.label ?? cuotas + ' cuotas'}). Me quedan $${result.cuota.toLocaleString('es-AR')}/mes. Quiero asesorarme.`
      )}`
    : '#'

  return (
    <div className="bg-eco-bg-card border border-eco-border rounded-2xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-eco-green/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-eco-green" />
        </div>
        <div>
          <h3 className="font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>
            Simule su cuota
          </h3>
          <p className="text-eco-text-muted text-xs">Valores orientativos — sin banco ni garante</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Tipo */}
        <div>
          <label className="block text-xs text-eco-text-muted mb-1">Tipo de producto</label>
          <select
            value={tipo}
            onChange={(e) => {
              setTipo(e.target.value as 'modulo' | 'piscina')
              const lista = e.target.value === 'modulo' ? modulos : piscinas
              if (lista.length > 0) setProductoId(lista[0].id)
            }}
            className="w-full bg-eco-bg-surface border border-eco-border rounded-lg px-3 py-2.5 text-eco-text text-sm focus:outline-none focus:border-eco-green"
          >
            <option value="modulo">Módulo habitacional</option>
            <option value="piscina">Piscina de fibra</option>
          </select>
        </div>

        {/* Producto */}
        <div>
          <label className="block text-xs text-eco-text-muted mb-1">Modelo</label>
          <select
            value={productoId}
            onChange={(e) => setProductoId(e.target.value)}
            className="w-full bg-eco-bg-surface border border-eco-border rounded-lg px-3 py-2.5 text-eco-text text-sm focus:outline-none focus:border-eco-green"
          >
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} — {p.medida}
              </option>
            ))}
          </select>
        </div>

        {/* Cuotas */}
        <div>
          <label className="block text-xs text-eco-text-muted mb-1">Cantidad de cuotas</label>
          <select
            value={cuotas}
            onChange={(e) => setCuotas(Number(e.target.value))}
            className="w-full bg-eco-bg-surface border border-eco-border rounded-lg px-3 py-2.5 text-eco-text text-sm focus:outline-none focus:border-eco-green"
          >
            {CUOTAS.map((c) => (
              <option key={c} value={c}>
                {c} cuotas{c <= 6 ? ' sin interés' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resultado */}
      <AnimatePresence mode="wait">
        {result && !loading && (
          <motion.div
            key={`${productoId}-${cuotas}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-eco-bg-surface border border-eco-border rounded-xl p-6 mb-4"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-eco-text-muted mb-1">Precio contado</p>
                <p className="text-lg font-bold text-eco-text">{fmt(result.precioContado)}</p>
              </div>
              <div>
                <p className="text-xs text-eco-text-muted mb-1">Precio lista</p>
                <p className="text-lg font-bold text-eco-text-muted line-through">{fmt(result.precioLista)}</p>
              </div>
              <div>
                <p className="text-xs text-eco-text-muted mb-1">Total a pagar</p>
                <p className="text-lg font-bold text-eco-text">{fmt(result.total)}</p>
              </div>
              <div>
                <p className="text-xs text-eco-text-muted mb-1">Su cuota mensual</p>
                <motion.p
                  key={result.cuota}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-3xl font-extrabold text-eco-green"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {fmt(result.cuota)}
                </motion.p>
              </div>
            </div>
            <p className="text-eco-text-muted text-xs mt-3">
              * Valor orientativo. El plan exacto se define en videollamada gratuita con nuestro equipo.
            </p>
          </motion.div>
        )}
        {loading && (
          <div className="bg-eco-bg-surface border border-eco-border rounded-xl p-6 mb-4 flex items-center justify-center h-24">
            <div className="w-6 h-6 border-2 border-eco-green border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </AnimatePresence>

      {/* Mini-formulario de captura de lead */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 border border-eco-border rounded-xl overflow-hidden"
          >
            {leadSent ? (
              <div className="bg-eco-green/10 px-5 py-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-eco-green flex-shrink-0" />
                <div>
                  <p className="text-eco-green font-semibold text-sm">¡Listo! Lo contactamos a la brevedad.</p>
                  <p className="text-eco-text-muted text-xs">También puede escribirnos directamente por WhatsApp.</p>
                </div>
              </div>
            ) : (
              <div className="bg-eco-bg-surface px-5 py-4">
                <p className="text-eco-text text-sm font-semibold mb-3">
                  ¿Desea que lo contactemos con esta simulación?
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-eco-text-muted" />
                    <input
                      type="text"
                      placeholder="Su nombre (opcional)"
                      value={leadNombre}
                      onChange={(e) => setLeadNombre(e.target.value)}
                      className="w-full bg-eco-bg-card border border-eco-border rounded-lg pl-8 pr-3 py-2 text-sm text-eco-text placeholder-eco-text-muted focus:outline-none focus:border-eco-green"
                    />
                  </div>
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-eco-text-muted" />
                    <input
                      type="tel"
                      placeholder="WhatsApp / Teléfono *"
                      value={leadTelefono}
                      onChange={(e) => { setLeadTelefono(e.target.value); setLeadError('') }}
                      className="w-full bg-eco-bg-card border border-eco-border rounded-lg pl-8 pr-3 py-2 text-sm text-eco-text placeholder-eco-text-muted focus:outline-none focus:border-eco-green"
                    />
                  </div>
                  <button
                    onClick={enviarLead}
                    disabled={leadSending}
                    className="flex-shrink-0 bg-eco-green hover:bg-eco-green-light disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                  >
                    {leadSending ? 'Enviando…' : 'Solicitar contacto'}
                  </button>
                </div>
                {leadError && <p className="text-red-400 text-xs mt-2">{leadError}</p>}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {result && (
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-eco-bg-surface hover:bg-eco-bg-card border border-eco-border hover:border-eco-green text-eco-text font-semibold py-3 rounded-lg transition-colors mt-3"
        >
          <MessageCircle className="w-5 h-5 text-eco-green" />
          O consulte por WhatsApp
        </a>
      )}
    </div>
  )
}
