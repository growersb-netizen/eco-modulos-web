'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin } from 'lucide-react'
import {
  getUbicacion,
  calcularFlete,
  getTipoPiscina,
  getTipoModulo,
  type UbicacionGuardada,
} from '@/lib/flete'

export interface ProductoCarrusel {
  id: string
  nombre: string
  medida: string | null
  precio_contado: number | null
  imagen: string | null
}

interface Props {
  piscinas: ProductoCarrusel[]
  modulos: ProductoCarrusel[]
}

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('es-AR')
}

export default function HomepageCarousel({ piscinas, modulos }: Props) {
  const [ubicacion, setUbicacion] = useState<UbicacionGuardada | null>(null)

  useEffect(() => {
    setUbicacion(getUbicacion())
    const handler = () => setUbicacion(getUbicacion())
    window.addEventListener('ecofiver-location-change', handler)
    return () => window.removeEventListener('ecofiver-location-change', handler)
  }, [])

  const openModal = () => window.dispatchEvent(new Event('ecofiver-open-location-modal'))

  // ── Banner de zona ────────────────────────────────────────────
  const ZonaBanner = () => (
    <div className="px-4 mb-5">
      {ubicacion ? (
        <div className="inline-flex items-center gap-2 bg-eco-teal/8 border border-eco-teal/25 rounded-full px-3 py-1.5">
          <MapPin className="w-3 h-3 text-eco-teal flex-shrink-0" />
          <span className="text-xs text-eco-text">
            Precios con flete a{' '}
            <strong className="font-bold">{ubicacion.ciudad}</strong>
          </span>
          <button
            onClick={openModal}
            className="text-[11px] text-eco-green hover:underline ml-1 font-semibold"
          >
            Cambiar
          </button>
        </div>
      ) : (
        <button
          onClick={openModal}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-eco-green hover:text-eco-green-light transition-colors"
        >
          <MapPin className="w-3.5 h-3.5" />
          ¿De qué zona sos? · Ver precio total con flete incluido →
        </button>
      )}
    </div>
  )

  // ── Precio de un producto ─────────────────────────────────────
  const PrecioCard = ({
    precio,
    flete,
  }: {
    precio: number
    flete: number
  }) => {
    if (ubicacion) {
      const total = precio + flete
      return (
        <div className="mt-1.5">
          <p className="text-eco-teal font-extrabold text-sm leading-none">{fmt(total)}</p>
          <p className="text-eco-text-muted text-[10px] mt-0.5">flete incluido</p>
        </div>
      )
    }
    // Sin zona: no mostramos precio, invitamos a consultar
    return (
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); openModal() }}
        className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-eco-green hover:text-eco-green-light transition-colors"
      >
        Consultar precio →
      </button>
    )
  }

  // ── Tarjeta individual ────────────────────────────────────────
  const CardPiscina = ({ p }: { p: ProductoCarrusel }) => {
    const flete = ubicacion
      ? calcularFlete(ubicacion.km, getTipoPiscina(p.nombre, p.medida ?? ''))
      : 0
    return (
      <Link
        href={`/piscinas/${p.id}`}
        className="flex-shrink-0 w-44 card-premium overflow-hidden group"
      >
        <div className="relative h-32 bg-eco-bg-surface overflow-hidden">
          {p.imagen ? (
            <Image
              src={p.imagen}
              alt={p.nombre}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="176px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-eco-text-muted text-xs">
              Sin imagen
            </div>
          )}
        </div>
        <div className="p-3">
          <p className="font-bold text-eco-text text-xs leading-tight line-clamp-2">{p.nombre}</p>
          {p.medida && <p className="text-eco-text-muted text-[11px] mt-0.5">{p.medida}</p>}
          {p.precio_contado != null && (
            <PrecioCard precio={p.precio_contado} flete={flete} />
          )}
          <span className="mt-2 flex items-center text-[11px] font-semibold text-eco-green gap-1 group-hover:gap-2 transition-all">
            Reservar <ArrowRight className="w-2.5 h-2.5" />
          </span>
        </div>
      </Link>
    )
  }

  const CardModulo = ({ m }: { m: ProductoCarrusel }) => {
    const flete = ubicacion
      ? calcularFlete(ubicacion.km, getTipoModulo(m.medida ?? ''))
      : 0
    return (
      <Link
        href={`/modulos/${m.id}`}
        className="flex-shrink-0 w-44 card-premium overflow-hidden group"
      >
        <div className="relative h-32 bg-eco-bg-surface overflow-hidden">
          {m.imagen ? (
            <Image
              src={m.imagen}
              alt={m.nombre}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="176px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-eco-text-muted text-xs">
              Sin imagen
            </div>
          )}
        </div>
        <div className="p-3">
          <p className="font-bold text-eco-text text-xs leading-tight line-clamp-2">{m.nombre}</p>
          {m.medida && <p className="text-eco-text-muted text-[11px] mt-0.5">{m.medida}</p>}
          {m.precio_contado != null && (
            <PrecioCard precio={m.precio_contado} flete={flete} />
          )}
          <span className="mt-2 flex items-center text-[11px] font-semibold text-eco-green gap-1 group-hover:gap-2 transition-all">
            Reservar <ArrowRight className="w-2.5 h-2.5" />
          </span>
        </div>
      </Link>
    )
  }

  if (piscinas.length === 0 && modulos.length === 0) return null

  return (
    <section className="py-10 bg-eco-bg-card border-b border-eco-border">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="px-4 flex items-baseline justify-between mb-4">
          <div>
            <p className="text-eco-teal text-xs font-bold uppercase tracking-widest mb-1">Tienda virtual</p>
            <h2
              className="text-2xl font-extrabold text-eco-text"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Modelos disponibles ahora
            </h2>
          </div>
        </div>

        {/* Banner zona */}
        <ZonaBanner />

        {/* Piscinas */}
        {piscinas.length > 0 && (
          <div className="mb-8">
            <div className="px-4 flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-widest text-eco-text-muted">🏊 Piscinas de fibra</p>
              <Link href="/piscinas" className="text-xs font-semibold text-eco-green hover:underline">
                Ver todas →
              </Link>
            </div>
            <div className="scroll-no-bar flex gap-4 overflow-x-auto pb-3 px-4">
              {piscinas.map(p => <CardPiscina key={p.id} p={p} />)}
              <Link
                href="/piscinas"
                className="flex-shrink-0 w-32 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-eco-border hover:border-eco-green text-eco-text-muted hover:text-eco-green transition-colors p-4"
              >
                <span className="text-xl font-bold">+</span>
                <span className="text-xs font-semibold text-center leading-tight">Ver todos los modelos</span>
              </Link>
            </div>
          </div>
        )}

        {/* Módulos */}
        {modulos.length > 0 && (
          <div>
            <div className="px-4 flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-widest text-eco-text-muted">🏠 Módulos Wood Frame</p>
              <Link href="/modulos" className="text-xs font-semibold text-eco-green hover:underline">
                Ver todos →
              </Link>
            </div>
            <div className="scroll-no-bar flex gap-4 overflow-x-auto pb-3 px-4">
              {modulos.map(m => <CardModulo key={m.id} m={m} />)}
              <Link
                href="/modulos"
                className="flex-shrink-0 w-32 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-eco-border hover:border-eco-green text-eco-text-muted hover:text-eco-green transition-colors p-4"
              >
                <span className="text-xl font-bold">+</span>
                <span className="text-xs font-semibold text-center leading-tight">Ver todos los modelos</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
