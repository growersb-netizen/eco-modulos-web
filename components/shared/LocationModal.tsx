'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPin, X, Search } from 'lucide-react'
import { CIUDADES, saveUbicacion, getUbicacion } from '@/lib/flete'

export default function LocationModal() {
  const [open, setOpen]   = useState(false)
  const [query, setQuery] = useState('')
  const inputRef          = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const tryOpen = () => {
      if (!getUbicacion()) setOpen(true)
    }
    const timer = setTimeout(tryOpen, 900)

    const handleForce = () => setOpen(true)
    window.addEventListener('ecofiver-open-location-modal', handleForce)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('ecofiver-open-location-modal', handleForce)
    }
  }, [])

  const filtered = query.length >= 2
    ? CIUDADES.filter(c =>
        c.nombre.toLowerCase().includes(query.toLowerCase()) ||
        c.provincia.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 7)
    : []

  const handleSelect = (c: typeof CIUDADES[0]) => {
    saveUbicacion({ ciudad: `${c.nombre}, ${c.provincia}`, km: c.km })
    window.dispatchEvent(new Event('ecofiver-location-change'))
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-eco-bg-card border border-eco-border rounded-2xl w-full max-w-md shadow-2xl animate-fade-up">
        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-eco-green/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4.5 h-4.5 text-eco-green" />
              </div>
              <div>
                <p className="font-extrabold text-eco-text text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                  ¿Desde qué localidad nos escribís?
                </p>
                <p className="text-eco-text-muted text-xs mt-0.5">
                  Así personalizamos la oferta y disponibilidad para tu zona.
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-eco-text-muted hover:text-eco-text p-1 flex-shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-eco-text-muted pointer-events-none" />
            <input
              ref={inputRef}
              autoFocus
              type="text"
              placeholder="Escribí tu ciudad o localidad..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-8 pr-4 py-3 bg-eco-bg-surface border border-eco-border rounded-xl text-eco-text placeholder:text-eco-text-muted text-sm focus:outline-none focus:border-eco-green transition-colors"
            />
          </div>

          {/* Results */}
          {filtered.length > 0 && (
            <div className="border border-eco-border rounded-xl overflow-hidden mt-2">
              {filtered.map((c, i) => (
                <button
                  key={`${c.nombre}-${c.provincia}`}
                  onClick={() => handleSelect(c)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-eco-bg-surface transition-colors ${i < filtered.length - 1 ? 'border-b border-eco-border' : ''}`}
                >
                  <div>
                    <span className="text-eco-text text-sm font-semibold">{c.nombre}</span>
                    <span className="text-eco-text-muted text-xs ml-2">{c.provincia}</span>
                  </div>
                  <span className="text-eco-text-muted text-xs flex-shrink-0 ml-2">
                    {c.km === 0 ? 'Fábrica' : `~${c.km} km`}
                  </span>
                </button>
              ))}
            </div>
          )}

          {query.length >= 2 && filtered.length === 0 && (
            <p className="text-eco-text-muted text-xs text-center py-3">
              Ciudad no encontrada. Intentá con el nombre del partido o provincia.
            </p>
          )}

          <button
            onClick={() => setOpen(false)}
            className="mt-4 w-full text-eco-text-muted text-xs hover:text-eco-text transition-colors py-1.5"
          >
            Omitir por ahora
          </button>
        </div>
      </div>
    </div>
  )
}
