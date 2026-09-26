'use client'

import { useState, useEffect } from 'react'
import { MapPin, Clock, CheckCircle } from 'lucide-react'
import { formatPeso } from '@/lib/utils'
import { getUbicacion, calcularFlete, clearUbicacion, type TipoProducto, type UbicacionGuardada } from '@/lib/flete'

function getMsUntilMidnight(): number {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)
  return midnight.getTime() - now.getTime()
}

function Countdown() {
  const [ms, setMs] = useState(getMsUntilMidnight())
  useEffect(() => {
    const t = setInterval(() => setMs(getMsUntilMidnight()), 1000)
    return () => clearInterval(t)
  }, [])
  const s = Math.floor(ms / 1000)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return <span className="font-bold tabular-nums text-white text-base">{[h, m, sec].map(n => String(n).padStart(2, '0')).join(':')}</span>
}

interface Props {
  precioContado: number
  tipoProducto: TipoProducto
  incluidos: string[]
}

export default function PriceWithFlete({ precioContado, tipoProducto, incluidos }: Props) {
  const [ubicacion, setUbicacion] = useState<UbicacionGuardada | null>(null)

  useEffect(() => {
    setUbicacion(getUbicacion())
    const handler = () => setUbicacion(getUbicacion())
    window.addEventListener('ecofiver-location-change', handler)
    return () => window.removeEventListener('ecofiver-location-change', handler)
  }, [])

  const flete      = ubicacion ? calcularFlete(ubicacion.km, tipoProducto) : 0
  const precioTotal = precioContado + flete

  const handleCambiar = () => {
    clearUbicacion()
    window.dispatchEvent(new Event('ecofiver-location-change'))
    window.dispatchEvent(new Event('ecofiver-open-location-modal'))
  }

  const handleSetCity = () => {
    window.dispatchEvent(new Event('ecofiver-open-location-modal'))
  }

  return (
    <div className="space-y-3">
      {/* Urgency */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
        <span className="text-white text-xs font-bold uppercase tracking-wide leading-tight">
          Oferta válida hoy — reservá antes de las 00:00
        </span>
        <div className="flex items-center gap-1.5 bg-black/25 px-3 py-1 rounded-full flex-shrink-0">
          <Clock className="w-3.5 h-3.5 text-white" />
          <Countdown />
        </div>
      </div>

      {/* Price card */}
      <div className="bg-eco-bg-card border border-eco-border rounded-2xl p-5">
        {ubicacion ? (
          <>
            <p className="text-[11px] font-bold text-eco-green uppercase tracking-wider mb-2 leading-tight">
              Precio promocional con envío incluido a tu domicilio
            </p>
            <p className="text-4xl font-extrabold text-eco-green leading-none" style={{ fontFamily: 'var(--font-display)' }}>
              {formatPeso(precioTotal)}
            </p>
            <button
              onClick={handleCambiar}
              className="flex items-center gap-1 text-eco-text-muted text-xs mt-2 hover:text-eco-teal transition-colors"
            >
              <MapPin className="w-3 h-3" />
              <span>{ubicacion.ciudad}</span>
              <span className="underline ml-1">· cambiar ciudad</span>
            </button>
          </>
        ) : (
          <>
            <p className="text-[11px] font-bold text-eco-teal uppercase tracking-wider mb-1">Precio contado / transferencia</p>
            <p className="text-4xl font-extrabold text-eco-green leading-none" style={{ fontFamily: 'var(--font-display)' }}>
              {formatPeso(precioContado)}
            </p>
            <button
              onClick={handleSetCity}
              className="flex items-center gap-1 text-eco-teal text-xs mt-2 hover:text-eco-teal-light transition-colors"
            >
              <MapPin className="w-3 h-3" />
              <span className="underline">Ingresá tu localidad para ver el precio personalizado →</span>
            </button>
          </>
        )}
        <p className="text-eco-text-muted text-xs mt-3">
          <a href="/financiacion" className="text-eco-teal font-semibold hover:underline">
            También disponible en cuotas →
          </a>
        </p>
      </div>

      {/* Value stack */}
      <div className="border border-eco-border rounded-2xl p-5">
        <p className="text-xs font-bold text-eco-text uppercase tracking-wider mb-3">¿Qué incluye tu compra?</p>
        <div className="space-y-2.5">
          {incluidos.map(item => (
            <div key={item} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-eco-green flex-shrink-0 mt-0.5" />
              <span className="text-eco-text text-sm">{item}</span>
            </div>
          ))}
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-eco-green flex-shrink-0 mt-0.5" />
            <span className="text-eco-text text-sm font-semibold">
              {ubicacion ? `Envío a domicilio incluido (${ubicacion.ciudad})` : 'Envío a domicilio incluido al precio'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
