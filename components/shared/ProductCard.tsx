'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, ShoppingCart, MapPin, Clock } from 'lucide-react'
import { formatPeso } from '@/lib/utils'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'
import {
  getUbicacion, calcularFlete, clearUbicacion,
  getTipoModulo, getTipoPiscina,
  type UbicacionGuardada,
} from '@/lib/flete'

function getMsUntilMidnight(): number {
  const now = new Date()
  const mid = new Date(now)
  mid.setHours(24, 0, 0, 0)
  return mid.getTime() - now.getTime()
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
  return <span className="font-bold tabular-nums text-white text-sm">
    {[h, m, sec].map(n => String(n).padStart(2, '0')).join(':')}
  </span>
}

interface ProductCardProps {
  id: string
  nombre: string
  medida: string
  descripcion?: string
  usos?: string[]
  precio_contado: number
  precio_lista: number
  imagen?: string | null
  tipo: 'modulo' | 'piscina'
  destacada?: boolean
}

export default function ProductCard({
  id, nombre, medida, descripcion, usos = [],
  precio_contado, imagen, tipo, destacada,
}: ProductCardProps) {
  const [ubicacion, setUbicacion] = useState<UbicacionGuardada | null>(null)

  useEffect(() => {
    setUbicacion(getUbicacion())
    const handler = () => setUbicacion(getUbicacion())
    window.addEventListener('ecofiver-location-change', handler)
    return () => window.removeEventListener('ecofiver-location-change', handler)
  }, [])

  const tipoProducto = tipo === 'modulo' ? getTipoModulo(medida) : getTipoPiscina(nombre, medida)
  const flete        = ubicacion ? calcularFlete(ubicacion.km, tipoProducto) : 0
  const precioTotal  = precio_contado + flete

  const vendedor = tipo === 'piscina' ? 'hernan' : 'daniel'
  const mensaje  = `Hola, me interesa el ${nombre} (${medida}). ¿Me puede dar más información?`

  return (
    <div className={cn('card-premium flex flex-col group overflow-hidden', destacada && 'ring-1 ring-eco-teal/30')}>
      {/* Urgency strip */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 px-3 py-2 flex items-center justify-between gap-2">
        <span className="text-white text-[11px] font-bold uppercase tracking-wide truncate">
          Oferta válida hoy
        </span>
        <div className="flex items-center gap-1 bg-black/25 px-2 py-0.5 rounded-full flex-shrink-0">
          <Clock className="w-3 h-3 text-white" />
          <Countdown />
        </div>
      </div>

      {/* Image — clickeable → detalle del producto */}
      <Link href={`/${tipo === 'piscina' ? 'piscinas' : 'modulos'}/${id}`} className="relative block h-56 bg-eco-bg-surface overflow-hidden">
        {imagen ? (
          <Image
            src={imagen}
            alt={`${nombre} — ${medida}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-eco-bg to-eco-bg-surface relative overflow-hidden">
            <div className="absolute inset-0 hero-grid-pattern opacity-30" />
            {tipo === 'modulo' ? (
              <svg viewBox="0 0 140 90" className="w-28 h-20 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="38" width="110" height="48" rx="3" stroke="#0B2350" strokeWidth="1.5" fill="#0B2350" fillOpacity="0.06"/>
                <polygon points="70,8 10,40 130,40" fill="#0B2350" fillOpacity="0.08" stroke="#0B2350" strokeWidth="1.5" strokeLinejoin="round"/>
                <rect x="55" y="56" width="30" height="30" rx="1.5" stroke="#0B2350" strokeWidth="1.2" fill="#0B2350" fillOpacity="0.08"/>
                <rect x="22" y="52" width="20" height="16" rx="1.5" stroke="#4EC3B5" strokeWidth="1.2" fill="#4EC3B5" fillOpacity="0.08"/>
                <rect x="98" y="52" width="20" height="16" rx="1.5" stroke="#4EC3B5" strokeWidth="1.2" fill="#4EC3B5" fillOpacity="0.08"/>
              </svg>
            ) : (
              <svg viewBox="0 0 140 90" className="w-28 h-20 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="70" cy="62" rx="52" ry="24" stroke="#4EC3B5" strokeWidth="1.5" fill="#4EC3B5" fillOpacity="0.06"/>
                <path d="M18 62 Q26 24 70 20 Q114 24 122 62" stroke="#4EC3B5" strokeWidth="1.5" fill="#4EC3B5" fillOpacity="0.08"/>
                <ellipse cx="70" cy="62" rx="34" ry="15" stroke="#0B2350" strokeWidth="1" fill="#0B2350" fillOpacity="0.06" strokeDasharray="4,3"/>
              </svg>
            )}
            <p className="text-eco-green text-xs font-semibold uppercase tracking-widest opacity-50 mt-2 relative z-10">
              {tipo === 'modulo' ? 'Módulo Wood Frame' : 'Fibra de vidrio'}
            </p>
          </div>
        )}
        {destacada && (
          <span className="absolute top-3 left-3 bg-eco-teal text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg z-10">Más popular</span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <Link href={`/${tipo === 'piscina' ? 'piscinas' : 'modulos'}/${id}`} className="hover:text-eco-teal transition-colors">
            <h3 className="text-lg font-extrabold text-eco-text leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {nombre}
            </h3>
          </Link>
          <p className="text-eco-text-muted text-xs mt-0.5">{medida}</p>
        </div>

        {descripcion && <p className="text-eco-text-muted text-xs leading-relaxed line-clamp-2">{descripcion}</p>}

        {usos.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {usos.slice(0, 3).map(uso => (
              <span key={uso} className="bg-eco-bg-surface text-eco-text-muted text-[10px] font-medium px-2 py-0.5 rounded-full border border-eco-border">{uso}</span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="mt-auto pt-3 border-t border-eco-border">
          {ubicacion ? (
            <>
              <p className="text-[10px] text-eco-green font-bold uppercase tracking-wider mb-1 leading-tight">
                Precio promocional con envío incluido
              </p>
              <p className="text-2xl font-extrabold text-eco-green leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                {formatPeso(precioTotal)}
              </p>
              <button
                onClick={() => { clearUbicacion(); window.dispatchEvent(new Event('ecofiver-location-change')); window.dispatchEvent(new Event('ecofiver-open-location-modal')) }}
                className="flex items-center gap-1 text-eco-text-muted text-[10px] mt-1 hover:text-eco-teal transition-colors"
              >
                <MapPin className="w-2.5 h-2.5" />
                <span className="truncate max-w-[120px]">{ubicacion.ciudad}</span>
                <span className="underline ml-0.5 flex-shrink-0">· cambiar</span>
              </button>
            </>
          ) : (
            <>
              <p className="text-[10px] text-eco-teal font-bold uppercase tracking-wider mb-0.5">Precio contado</p>
              <p className="text-2xl font-extrabold text-eco-green leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                {formatPeso(precio_contado)}
              </p>
              <button
                onClick={() => window.dispatchEvent(new Event('ecofiver-open-location-modal'))}
                className="flex items-center gap-1 text-eco-teal text-[10px] mt-1 hover:text-eco-teal-light transition-colors"
              >
                <MapPin className="w-2.5 h-2.5" />
                <span className="underline">Ver precio para tu zona →</span>
              </button>
            </>
          )}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2">
          <Link
            href={`/${tipo === 'piscina' ? 'piscinas' : 'modulos'}/${id}`}
            className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-200 text-sm shadow-[0_2px_8px_rgba(11,35,80,0.20)] hover:shadow-[0_4px_16px_rgba(11,35,80,0.30)]"
          >
            <ShoppingCart className="w-4 h-4" />
            Reservar instalación
          </Link>
          <a
            href={buildWhatsAppLink(vendedor, mensaje)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-eco-border hover:border-eco-teal/40 text-eco-text-muted hover:text-eco-teal font-medium py-2 px-4 rounded-xl transition-all text-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
