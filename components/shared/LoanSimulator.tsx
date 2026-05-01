'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Calculator } from 'lucide-react'
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

  useEffect(() => {
    Promise.all([
      fetch('/api/modulos').then((r) => r.json()),
      fetch('/api/piscinas').then((r) => r.json()),
    ]).then(([m, p]) => {
      setModulos(m.filter((x: any) => x.activo))
      setPiscinas(p.filter((x: any) => x.activo))
      if (m.length > 0) setProductoId(m[0].id)
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
      setResult(data)
      trackSimulador(productoId, cuotas, data.cuota)
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [productoId, tipo, cuotas])

  useEffect(() => {
    calcular()
  }, [calcular])

  const productos = tipo === 'modulo' ? modulos : piscinas

  const productoSeleccionado = productos.find((p) => p.id === productoId)
  const vendedor = tipo === 'piscina' ? 'hernan' : 'daniel'
  const waLink = result && productoSeleccionado
    ? `https://wa.me/${tipo === 'piscina' ? process.env.NEXT_PUBLIC_WA_HERNAN || '5491125582328' : process.env.NEXT_PUBLIC_WA_DANIEL || '5491171825835'}?text=${encodeURIComponent(
        `Hola, simulé ${productoSeleccionado.nombre} en ${cuotas} cuotas (${result.label}). Me quedan $${result.cuota.toLocaleString('es-AR')}/mes. Quiero asesorarme.`
      )}`
    : '#'

  return (
    <div className="bg-eco-bg-card border border-eco-border rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-eco-green/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-eco-green" />
        </div>
        <div>
          <h3 className="font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>
            Simulá tu cuota
          </h3>
          <p className="text-eco-text-muted text-xs">Valores orientativos — sin banco</p>
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
            className="bg-eco-bg-surface rounded-xl p-6 mb-4"
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
                <p className="text-xs text-eco-text-muted mb-1">Tu cuota mensual</p>
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
          <div className="bg-eco-bg-surface rounded-xl p-6 mb-4 flex items-center justify-center h-24">
            <div className="w-6 h-6 border-2 border-eco-green border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </AnimatePresence>

      {result && (
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-eco-green hover:bg-eco-green-light text-white font-semibold py-3 rounded-lg transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          Consultar esta simulación por WhatsApp
        </a>
      )}
    </div>
  )
}
